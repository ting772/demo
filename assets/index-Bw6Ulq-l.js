var Xn=Object.defineProperty;var Yn=(l,n,s)=>n in l?Xn(l,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):l[n]=s;var C=(l,n,s)=>Yn(l,typeof n!="symbol"?n+"":n,s);import{r as Kn,c as xn,o as O,d as P,a as I,b as yn,e as N,P as Un,f as M,g as H,t as hn,n as on,u as Y,h as G,i as Qn,w as L,E as Zn,F as U,j as sn,k as Jn,l as ne,m as fn,p as bn,q as ee,s as Q,v as te,x as ae,y as A,z as W,A as ie,B as V,C as se,D as mn,G as ln,H as _n,I as On,J as X,K as J,L as Bn,M as le,N as j,O as Mn,Q as Tn,R as kn,S as Pn,T as zn,U as gn,V as pn,W as re,X as oe,Y as $n,Z as ce,_ as ue,$ as de,a0 as In,a1 as he,a2 as fe,a3 as me,a4 as pe,a5 as ge,a6 as ve,a7 as xe,a8 as ye,a9 as be,aa as _e,ab as we,ac as Ce,ad as Dn,ae as Fn,af as Re,ag as Se,ah as Be,ai as ke,aj as Ie,ak as Fe,al as je,am as Ee,an as Oe,ao as Me}from"./vendor-CYBaa4pk.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&t(u)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const q=(l,n)=>{const s=l.__vccOpts||l;for(const[t,e]of n)s[t]=e;return s},Te={};function Pe(l,n){const s=Kn("RouterView");return O(),xn(s)}const ze=q(Te,[["render",Pe]]),$e={class:"pre"},De=P({__name:"hilight",props:{code:{},lang:{}},setup(l){const n=l,s=I(),t=yn(()=>n.lang?`lang-${n.lang}`:"auto");return N(()=>{Un.highlightElement(s.value)}),(e,i)=>(O(),M("pre",$e,[H("code",{class:on(Y(t)),ref_key:"codeRef",ref:s},hn(e.code),3)]))}}),Ne={class:"container"},Ae={class:"dialog-footer"},We=P({__name:"codeDemo",props:{codes:{}},setup(l){const n=I(!1);function s(){n.value=!0}return(t,e)=>{const i=Jn,u=Zn,r=ne,a=ee;return O(),M(U,null,[H("div",Ne,[Qn(t.$slots,"default",{checkSource:s},void 0,!0)]),G(a,{modelValue:Y(n),"onUpdate:modelValue":e[1]||(e[1]=h=>bn(n)?n.value=h:null),title:"",width:"50vw",top:"50px"},{footer:L(()=>[H("span",Ae,[G(r,{type:"primary",onClick:e[0]||(e[0]=h=>n.value=!1)},{default:L(()=>e[2]||(e[2]=[fn("关闭")])),_:1})])]),default:L(()=>[G(u,{type:"border-card"},{default:L(()=>[(O(!0),M(U,null,sn(t.codes,h=>(O(),xn(i,{label:h.name,key:h.name,lazy:""},{default:L(()=>[G(De,{code:h.code,lang:h.lang},null,8,["code","lang"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"])],64)}}}),Le=q(We,[["__scopeId","data-v-65455990"]]),Ge=`<template>
  <audio ref="audioRef" :src="src" id="audio" controls></audio>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import { visualize } from '@/lib/canvas/audio-wave'
import { registEvent } from '@thing772/utils'
import src from './化凡.ogg'
import useGui from '@/hooks/useLilGui'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

useGui({
  查看源码() {
    emit('check-source')
  }
})

const canvasRef = ref()
const audioRef = ref()

onMounted(() => {
  let clear: () => void
  audioRef.value.onplay = () => {
    const { start, setSize } = visualize(audioRef.value, canvasRef.value)
    clear = registEvent(window, 'resize', () => {
      setSize(innerWidth, innerHeight)
    }, { immediate: true })

    start()
  }

  onUnmounted(() => {
    !!clear && clear()
  })
})
<\/script>

<style scoped>
audio {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
}
</style>
`,He=`import { rafLoop } from '@thing772/utils'

/**
 * 画音频波形
 * 浏览器策略，得用户手动播放后执行
 * @param audioSource
 * @param canvas
 * @returns
 */
export function visualize(audioSource: HTMLMediaElement, canvas: HTMLCanvasElement) {
  const audioContext = new AudioContext();
  let source = audioContext.createMediaElementSource(audioSource);

  const analyser = audioContext.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 512;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const ctx = canvas.getContext("2d")!;

  let w = canvas.width, h = canvas.height

  function draw() {
    analyser.getByteTimeDomainData(dataArray);
    ctx.save();

    Object.assign(ctx, {
      fillStyle: "red",
    });

    const sliceW = w / bufferLength;

    for (let i = 0; i < bufferLength; i += 4) {
      let sliceH = (dataArray[i] / 255) * h;
      ctx.fillRect(sliceW * i, h - sliceH, sliceW, sliceH);
    }
    ctx.fill();
    ctx.restore();
  }

  function setSize(width: number, height: number) {
    w = canvas.width = width
    h = canvas.height = height
  }

  function start() {
    return rafLoop(() => {
      ctx.clearRect(0, 0, w, h);
      draw();
    });
  }

  return {
    setSize,
    start
  }
}
`;function Ve(l,n){const s=new AudioContext;let t=s.createMediaElementSource(l);const e=s.createAnalyser();t.connect(e),e.connect(s.destination),e.fftSize=512;const i=e.frequencyBinCount,u=new Uint8Array(i),r=n.getContext("2d");let a=n.width,h=n.height;function p(){e.getByteTimeDomainData(u),r.save(),Object.assign(r,{fillStyle:"red"});const d=a/i;for(let c=0;c<i;c+=4){let f=u[c]/255*h;r.fillRect(d*c,h-f,d,f)}r.fill(),r.restore()}function o(d,c){a=n.width=d,h=n.height=c}function m(){return Q(()=>{r.clearRect(0,0,a,h),p()})}return{setSize:o,start:m}}const qe="/demo/assets/media/%E5%8C%96%E5%87%A1-DF7X08YA.ogg";function D(l){if(!l.title){let s=te().meta.title;s&&(l.title=s)}let n=ae(l);return A(()=>{n.gui.destroy()}),n}const Xe=["src"],Ye=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;D({查看源码(){s("check-source")}});const t=I(),e=I();return N(()=>{let i;e.value.onplay=()=>{const{start:u,setSize:r}=Ve(e.value,t.value);i=W(window,"resize",()=>{r(innerWidth,innerHeight)},{immediate:!0}),u()},A(()=>{i&&i()})}),(i,u)=>(O(),M(U,null,[H("audio",{ref_key:"audioRef",ref:e,src:Y(qe),id:"audio",controls:""},null,8,Xe),H("canvas",{ref_key:"canvasRef",ref:t},null,512)],64))}}),Ke=q(Ye,[["__scopeId","data-v-24237bd0"]]),Ue="/demo/assets/imgs/display-_9yby0tz.png",Qe={codes:[{name:"index.vue",code:Ge,lang:"js"},{name:"audio-wave",code:He,lang:"ts"}],component:Ke,display:Ue,title:"音频波形",descriptions:""},Ze=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { alignBy } from '@/utils/utils'
import { setupGrid, setElement } from '@thing772/utils'
import { bfsGenerator, type Index, bfs } from './bfs'
import useTimer from '@/hooks/useTimer'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let xMax: number, yMax: number, w: number, h: number, it: any
let ctx: any
let guiHandler: any

const bgRef = ref('#c5afbb')
const gridSize = ref(30)
const canvasRef = ref()

const start = reactive({ x: 20, y: 10 })
const end = reactive({ x: 0, y: 0 })

const updateView = (initiate?: () => void) => {
  let canvas = canvasRef.value
  w = alignBy(innerWidth, gridSize.value)
  h = alignBy(innerHeight, gridSize.value)
  canvas.width = w
  canvas.height = h
  xMax = w / gridSize.value - 1
  yMax = h / gridSize.value - 1

  initiate?.()

  let getControllerByKey = guiHandler.helpers.getControllerByKey

  let options = {
    '设置起始点X': {
      max: xMax,
      setValue: start.x
    },
    '设置起始点Y': {
      max: yMax,
      setValue: start.y
    },
    '设置终点X': {
      max: xMax,
      setValue: end.x
    },
    '设置终点Y': {
      max: yMax,
      setValue: end.y
    }
  } as any

  for (let key in options) {
    let ctl = getControllerByKey(key)
    let v = options[key]
    for (let attr in v) {
      ctl[attr](v[attr])
    }
  }
}

watch([canvasRef, bgRef], ([canvas, bg]) => {
  setElement(canvas, {
    'background-color': bg
  })
})

watch(gridSize, () => {
  timer.value = 0
  updateView()
  reDraw()
})

const fillPos = (x: number, y: number, options: object) => {
  ctx.save()
  Object.assign(ctx, options)
  ctx.fillRect(x * gridSize.value, y * gridSize.value, gridSize.value, gridSize.value)
  ctx.restore()
}

const fillStartPoint = (x: number, y: number) => {
  fillPos(x, y, { fillStyle: 'red' })
}

const fillEndPoint = (x: number, y: number) => {
  fillPos(x, y, { fillStyle: 'green' })
}

const reDraw = (draw?: () => void) => {
  let canvas = canvasRef.value
  ctx.clearRect(0, 0, w, h)
  setupGrid({
    width: w,
    height: h,
    gridSize: gridSize.value,
    canvas,
    ctx,
    lineWidth: 1,
    gridLineColor: '#fff'
  })
  if (typeof draw == 'function') draw()
  fillStartPoint(start.x, start.y)
  fillEndPoint(end.x, end.y)
}

watch([start, end], () => {
  reDraw()
  timer.value = 0
  it = bfsGenerator(start, end, xMax, yMax)
})

let timer = useTimer()

const itv = shallowRef()

function drawNode(v: any) {
  let {
    current,
    pending,
    visited
  } = v
  reDraw(() => {
    fillPos(current.x, current.y, { fillStyle: "gold" })
    pending.forEach((node: Index) => {
      const { x, y } = node
      fillPos(x, y, { fillStyle: "pink" })
    })
    visited.forEach((node: Index) => {
      const { x, y } = node
      fillPos(x, y, { fillStyle: "black" })
    })
  })
}

function drawPath(current: any) {
  while (current) {
    fillPos(current.x, current.y, { fillStyle: "blue" })
    current = current.parent
  }
  fillStartPoint(start.x, start.y)
  fillEndPoint(end.x, end.y)
}

watch(itv, (v) => {
  let {
    value, done
  } = v
  if (done && !value) return

  drawNode(value)
  if (done) {
    drawPath(value.current)
  }
})

const setupGui = () => {
  guiHandler = useGui({
    设置背景色: {
      value: [bgRef.value],
      isColor: true,
      onFinishChange(n: string) {
        bgRef.value = n
      }
    },
    网格大小设置: {
      value: [gridSize.value, 5, 50, 1],
      onFinishChange(n: number) {
        gridSize.value = n

      }
    },
    设置起始点X: {
      value: [start.x, 0, xMax, 1],
      onFinishChange(n: number) {
        start.x = n
      }
    },
    设置起始点Y: {
      value: [start.y, 0, yMax, 1],
      onFinishChange(n: number) {
        start.y = n
      }
    },
    设置终点X: {
      value: [end.x, 0, xMax, 1],
      onFinishChange(n: number) {
        end.x = n
      }
    },
    设置终点Y: {
      value: [end.y, 0, yMax, 1],
      onFinishChange(n: number) {
        end.y = n
      }
    },
    自动bfs迭代() {
      if (!it!) return
      timer.value = 0
      timer.value = setInterval(() => {
        const v = it.next()
        itv.value = v
        if (v.done) {
          timer.value = 0
        }
      }, 100)
    },
    bfs巡路() {
      console.time('bfs寻路耗时')
      timer.value = 0
      let v = bfs(start, end, xMax, yMax)
      if (!v) {
        throw Error("没有找到终点")
      }
      console.timeEnd('bfs寻路耗时')
      reDraw(() => {
        drawPath(v.current)
      })
    },
    查看源码() {
      emit("check-source")
    }
  })
}

onMounted(() => {
  let canvas = canvasRef.value
  ctx = canvas.getContext('2d')!
  setupGui()
  updateView(() => {
    //调整终点位置
    Object.assign(end, { x: ~~(xMax! / 2), y: ~~(yMax! / 2) })
  })
  it = bfsGenerator(start, end, xMax, yMax)
})
<\/script>
`;function Nn(l){return Math.floor(Math.random()*l.length)}function An(l){return l[Nn(l)]}function Je(l,n=1e3){let s=[];for(let t=0;t<l;t++)s.push(Z(n));return s}function Z(l=1e3){return Math.ceil(Math.random()*l)}function nt(l,n){return l.reduce((s,t,e)=>(e%n==0&&s.push(l.slice(e,e+n)),s),[])}function rn(l,n,s){let t=l[n];l[n]=l[s],l[s]=t}function dn(l){return l!=null}function cn(l){return typeof l=="function"}function vn(l){return l}function wn(l){let n=[];function s(t){let e=t-n.length;return e>0?n.push(...ie(l,e)):e<0&&(n=n.slice(0,e)),n}return s.update=function(t){n.forEach(e=>t(e))},s}function nn(l,n){return~~(l/n)*n}function et(l,n,s){let{dx:t,dy:e}=n,i=Math.sqrt(t**2+e**2);return{x:l.x+t*s/i,y:l.y+e*s/i}}function*jn(l,n,s,t){let e=[{...l}],i=[],u={...n},r={},a;const h=(o,m)=>{if(!(o>s||m>t||o<0||m<0))return{x:o,y:m}},p=o=>`${o.x}-${o.y}`;for(;e.length>0;){if(a&&(r[p(a)]=!0,i.push({...a})),a=e.shift(),delete r[p(a)],a.x==u.x&&a.y==u.y)return{current:a,visited:[...i],pending:[...e]};let o=h(a.x,a.y-1),m=h(a.x+1,a.y),d=h(a.x,a.y+1),c=h(a.x-1,a.y),f=[o,m,d,c].filter(Boolean);f=f.filter(x=>!r[p(x)]),f.length!=0&&(f.forEach(x=>{x.parent=a,r[p(x)]=!0}),e.push(...f),yield{current:a,visited:[...i],pending:[...e]})}}function tt(l,n,s,t){let e=[{...l}],i=[],u={...n},r={},a;const h=(o,m)=>{if(!(o>s||m>t||o<0||m<0))return{x:o,y:m}},p=o=>`${o.x}-${o.y}`;for(;e.length>0;){if(a&&(r[p(a)]=!0,i.push({...a})),a=e.shift(),delete r[p(a)],a.x==u.x&&a.y==u.y)return{current:a,visited:[...i],pending:[...e]};let o=h(a.x,a.y-1),m=h(a.x+1,a.y),d=h(a.x,a.y+1),c=h(a.x-1,a.y),f=[o,m,d,c].filter(Boolean);f=f.filter(x=>!r[p(x)]),f.length!=0&&(f.forEach(x=>{x.parent=a,r[p(x)]=!0}),e.push(...f))}}function Wn(){let l=I(0);return V(l,(n,s)=>{n==0&&s>0&&clearInterval(s)},{flush:"sync"}),se(()=>{l.value=0}),l}const at=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t,e,i,u,r,a,h;const p=I("#c5afbb"),o=I(30),m=I(),d=mn({x:20,y:10}),c=mn({x:0,y:0}),f=g=>{let R=m.value;i=nn(innerWidth,o.value),u=nn(innerHeight,o.value),R.width=i,R.height=u,t=i/o.value-1,e=u/o.value-1,g==null||g();let T=h.helpers.getControllerByKey,F={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:e,setValue:d.y},设置终点X:{max:t,setValue:c.x},设置终点Y:{max:e,setValue:c.y}};for(let k in F){let z=T(k),$=F[k];for(let tn in $)z[tn]($[tn])}};V([m,p],([g,R])=>{_n(g,{"background-color":R})}),V(o,()=>{y.value=0,f(),_()});const x=(g,R,T)=>{a.save(),Object.assign(a,T),a.fillRect(g*o.value,R*o.value,o.value,o.value),a.restore()},w=(g,R)=>{x(g,R,{fillStyle:"red"})},v=(g,R)=>{x(g,R,{fillStyle:"green"})},_=g=>{let R=m.value;a.clearRect(0,0,i,u),On({width:i,height:u,gridSize:o.value,canvas:R,ctx:a,lineWidth:1,gridLineColor:"#fff"}),typeof g=="function"&&g(),w(d.x,d.y),v(c.x,c.y)};V([d,c],()=>{_(),y.value=0,r=jn(d,c,t,e)});let y=Wn();const b=ln();function S(g){let{current:R,pending:T,visited:F}=g;_(()=>{x(R.x,R.y,{fillStyle:"gold"}),T.forEach(k=>{const{x:z,y:$}=k;x(z,$,{fillStyle:"pink"})}),F.forEach(k=>{const{x:z,y:$}=k;x(z,$,{fillStyle:"black"})})})}function E(g){for(;g;)x(g.x,g.y,{fillStyle:"blue"}),g=g.parent;w(d.x,d.y),v(c.x,c.y)}V(b,g=>{let{value:R,done:T}=g;T&&!R||(S(R),T&&E(R.current))});const B=()=>{h=D({设置背景色:{value:[p.value],isColor:!0,onFinishChange(g){p.value=g}},网格大小设置:{value:[o.value,5,50,1],onFinishChange(g){o.value=g}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(g){d.x=g}},设置起始点Y:{value:[d.y,0,e,1],onFinishChange(g){d.y=g}},设置终点X:{value:[c.x,0,t,1],onFinishChange(g){c.x=g}},设置终点Y:{value:[c.y,0,e,1],onFinishChange(g){c.y=g}},自动bfs迭代(){r&&(y.value=0,y.value=setInterval(()=>{const g=r.next();b.value=g,g.done&&(y.value=0)},100))},bfs巡路(){console.time("bfs寻路耗时"),y.value=0;let g=tt(d,c,t,e);if(!g)throw Error("没有找到终点");console.timeEnd("bfs寻路耗时"),_(()=>{E(g.current)})},查看源码(){s("check-source")}})};return N(()=>{a=m.value.getContext("2d"),B(),f(()=>{Object.assign(c,{x:~~(t/2),y:~~(e/2)})}),r=jn(d,c,t,e)}),(g,R)=>(O(),M("canvas",{ref_key:"canvasRef",ref:m},null,512))}}),it="/demo/assets/imgs/display-BFxeQr0P.png",st=`export type Index = { x: number; y: number }
type IndexWithParent = Index & { parent?: IndexWithParent }

/**
 * bfs生成器版本，bfs迭代网格化后的地图
 * @param start Index 起始点
 * @param end Index 终点
 * @param xMax number 网格地图最大x坐标
 * @param yMax number 网格地图最大y坐标
 * @returns
 */
export function* bfsGenerator(start: Index, end: Index, xMax: number, yMax: number) {
  let queue = [{ ...start }]
  let visited = [] as Index[]
  let dest = { ...end }
  let temp = {} as { [key: string]: boolean }
  let current: any

  const getNode = (x: number, y: number) => {
    if (x > xMax || y > yMax || x < 0 || y < 0) {
      return undefined
    }
    return { x, y }
  }

  const getNodeKey = (node: Index) => \`\${node.x}-\${node.y}\`

  while (queue.length > 0) {
    if (current) {
      temp[getNodeKey(current)] = true
      visited.push({
        ...current
      })
    }

    current = queue.shift()!
    delete temp[getNodeKey(current)]

    if (current.x == dest.x && current.y == dest.y) {
      return {
        current,
        visited: [...visited],
        pending: [...queue]
      }
    }

    let up = getNode(current.x, current.y - 1)
    let right = getNode(current.x + 1, current.y)
    let down = getNode(current.x, current.y + 1)
    let left = getNode(current.x - 1, current.y)

    //过滤无效周围节点
    let available = [up, right, down, left].filter(Boolean) as IndexWithParent[]

    //过滤已经访问或者待访问的节点
    available = available.filter(item => !temp[getNodeKey(item)])

    if (available.length == 0) continue

    available.forEach(item => {
      item.parent = current
      temp[getNodeKey(item)] = true
    })

    queue.push(...available)
    yield {
      current,
      visited: [...visited],
      pending: [...queue]
    }
  }
}

/**
 * bfs普通版本，bfs算法求得起点到终点的搜索路径
 * @param start Index 起始点
 * @param end Index 终点
 * @param xMax number 网格地图最大x坐标
 * @param yMax number 网格地图最大y坐标
 * @returns 完成时返回{current:IndexWithParent,visited:IndexWithParent[],pending:IndexWithParent[]},通过current迭代获得完整bfs路径
 */
export function bfs(start: Index, end: Index, xMax: number, yMax: number) {
  let queue = [{ ...start }]
  let visited = [] as Index[]
  let dest = { ...end }
  let temp = {} as { [key: string]: boolean }
  let current: any

  const getNode = (x: number, y: number) => {
    if (x > xMax || y > yMax || x < 0 || y < 0) {
      return undefined
    }
    return { x, y }
  }

  const getNodeKey = (node: Index) => \`\${node.x}-\${node.y}\`

  while (queue.length > 0) {
    if (current) {
      temp[getNodeKey(current)] = true
      visited.push({
        ...current
      })
    }

    current = queue.shift()!
    delete temp[getNodeKey(current)]

    if (current.x == dest.x && current.y == dest.y) {
      return {
        current,
        visited: [...visited],
        pending: [...queue]
      }
    }

    let up = getNode(current.x, current.y - 1)
    let right = getNode(current.x + 1, current.y)
    let down = getNode(current.x, current.y + 1)
    let left = getNode(current.x - 1, current.y)

    //过滤无效周围节点
    let available = [up, right, down, left].filter(Boolean) as IndexWithParent[]

    //过滤已经访问或者待访问的节点
    available = available.filter(item => !temp[getNodeKey(item)])

    if (available.length == 0) continue

    available.forEach(item => {
      item.parent = current
      temp[getNodeKey(item)] = true
    })
    queue.push(...available)
  }
}
`,lt={codes:[{name:"index.vue",code:Ze,lang:"js"},{name:"bfs.ts",code:st,lang:"ts"}],component:at,display:it,title:"canvas网格——广度优先搜索",descriptions:""},rt=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, rafLoop, iterateEaseFromTo, randomRgb } from '@thing772/utils'
import { Ball } from '@/utils/class/ball'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

useGui({
  查看源码() {
    emit("check-source")
  }
})

const canvasRef = ref()

onMounted(() => {
  let canvas = canvasRef.value
  let w: number, h: number, pt: { x: number; y: number }
  let ctx = canvas.getContext('2d')!

  const uninstallResize = registEvent(window, 'resize', () => {
    Object.assign(canvas, {
      width: w = innerWidth,
      height: h = innerHeight
    })
  }, { immediate: true })

  const uninstallMove = registEvent(canvas, 'mousemove',
    function (e: MouseEvent) {
      pt = { x: e.offsetX, y: e.offsetY }
    } as any
  )

  let ball = new Ball({
    r: 100,
    x: w! / 2,
    y: h! / 2,
    styleOptions: {
      fillStyle: randomRgb(),
    }
  })

  const stopAnim = rafLoop(() => {
    ctx.clearRect(0, 0, w, h)
    if (pt) {
      ball.x = iterateEaseFromTo(ball.x, pt.x, 0.05)
      ball.y = iterateEaseFromTo(ball.y, pt.y, 0.05)
    }
    ball.render(ctx)
  })

  onUnmounted(() => {
    uninstallResize()
    uninstallMove()
    stopAnim
  })
})
<\/script>
`,en=`type BallOptions = {
  x?: number;
  y?: number;
  r: number;
  vx?: number;
  vy?: number;
  ax?: number;
  ay?: number;
  styleOptions?: {
    [key: string]: any
  }
}

export class Ball {
  x = 0;
  y = 0;
  r = 0;
  vx = 0;
  vy = 0;
  ax = 0;
  ay = 0;
  styleOptions = {} as BallOptions['styleOptions']

  constructor(options?: BallOptions) {
    if (options) this.set(options)
  }

  reset(includeStyle?: boolean) {
    return Object.assign(this, {
      x: 0,
      y: 0,
      r: 0,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      ...(includeStyle ? { styleOptions: {} } : null)
    })
  }

  set(options: BallOptions) { return Object.assign(this, options) }

  update() {
    this.vy += this.ay;
    this.y += this.vy;
    this.vx += this.ax
    this.x += this.vx
    return this
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    let { x, y, r, styleOptions } = this;
    Object.assign(ctx, styleOptions);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    if (styleOptions!.fillStyle) ctx.fill();
    if (styleOptions!.strokeStyle) ctx.stroke();
    ctx.restore();
  }
}
`;class K{constructor(n){C(this,"x",0);C(this,"y",0);C(this,"r",0);C(this,"vx",0);C(this,"vy",0);C(this,"ax",0);C(this,"ay",0);C(this,"styleOptions",{});n&&this.set(n)}reset(n){return Object.assign(this,{x:0,y:0,r:0,vx:0,vy:0,ax:0,ay:0,...n?{styleOptions:{}}:null})}set(n){return Object.assign(this,n)}update(){return this.vy+=this.ay,this.y+=this.vy,this.vx+=this.ax,this.x+=this.vx,this}render(n){n.save();let{x:s,y:t,r:e,styleOptions:i}=this;Object.assign(n,i),n.beginPath(),n.arc(s,t,e,0,Math.PI*2),i.fillStyle&&n.fill(),i.strokeStyle&&n.stroke(),n.restore()}}const ot=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;D({查看源码(){s("check-source")}});const t=I();return N(()=>{let e=t.value,i,u,r,a=e.getContext("2d");const h=W(window,"resize",()=>{Object.assign(e,{width:i=innerWidth,height:u=innerHeight})},{immediate:!0}),p=W(e,"mousemove",function(m){r={x:m.offsetX,y:m.offsetY}});let o=new K({r:100,x:i/2,y:u/2,styleOptions:{fillStyle:X()}});Q(()=>{a.clearRect(0,0,i,u),r&&(o.x=J(o.x,r.x,.05),o.y=J(o.y,r.y,.05)),o.render(a)}),A(()=>{h(),p()})}),(e,i)=>(O(),M("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),ct="/demo/assets/imgs/display-IdleEMXt.png",ut={codes:[{name:"index.vue",code:rt,lang:"js"},{name:"ball.ts",code:en,lang:"ts"}],component:ot,display:ct,title:"缓动追逐",descriptions:""},dt=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { randomRgb, registEvent, distance, drawLine, randomBetween } from '@thing772/utils'
import { ballsWanderInRect } from '@/lib/canvas/wander-balls'
import { Ball } from '@/utils/class/ball'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ballsNum = 80, r = 1, vx = 3, vy = 3, threshold = 100, connect: ReturnType<typeof drawLine>

useGui({
  小球个数: {
    value: [ballsNum, 1, 1000, 10],
    onFinishChange(n: number) {
      ballsNum = n
      handle.setBallNum(n)
    }
  },
  小球半径上限: {
    value: [r, 1, 100, 1],
    onFinishChange(n: number) {
      r = n
      handle.updateBalls(ball => {
        ball.r = randomBetween(1, n)
      })
    }
  },
  小球x方向移动速度上限: {
    value: [vx, 1, 15, 0.5],
    onFinishChange(n: number) {
      vx = n
      handle.updateBalls(ball => {
        ball.vx = randomBetween(1, n)
      })
    }
  },
  小球y方向移动速度上限: {
    value: [vy, 1, 15, 0.5],
    onFinishChange(n: number) {
      vy = n
      handle.updateBalls(ball => {
        ball.vy = randomBetween(1, n)
      })
    }
  },
  小球连接范围阈值: {
    value: [threshold, 50, 300, 1],
    onFinishChange(n: number) {
      threshold = n
    }
  },
  查看源码() {
    emit("check-source")
  }
})

let stopAni: ReturnType<typeof handle.start>

const canvasRef = ref()
let handle: ReturnType<typeof ballsWanderInRect>
let pt: { x: number; y: number }

onMounted(() => {
  let canvas = canvasRef.value
  let w = innerWidth
  let h = innerHeight

  Object.assign(canvas, {
    width: w,
    height: h
  })
  handle = ballsWanderInRect({
    canvas,
    ballsNum,
    createBallFac: () => new Ball({
      x: randomBetween(10, w - 10),
      y: randomBetween(10, h - 10),
      r: randomBetween(1, r),
      vx: randomBetween(1, vx),
      vy: randomBetween(1, vy),
      styleOptions: {
        fillStyle: randomRgb(),
      },
    }),
    preRender(balls, ctx) {
      if (!connect) {
        connect = drawLine(ctx, {
          strokeStyle: randomRgb(),
          lineWidth: 1,
        })
      }

      if (pt) {
        balls = balls.concat(pt as unknown as Ball);
      }
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          let pt1 = balls[i],
            pt2 = balls[j];
          let d = distance(pt1, pt2);
          if (d < threshold) {
            connect!(pt1, pt2);
          }
        }
      }
      if (pt) balls.pop()
    }
  })

  const uninstallResize = registEvent(window, 'resize', () => {
    w = innerWidth
    h = innerHeight

    handle.setSize({
      width: w,
      height: h
    })
  }, { immediate: true })

  const uninstallMove = registEvent(canvas, 'mousemove', (e: any) => {
    pt = { x: e.offsetX, y: e.offsetY }
  }, { needLog: true })

  stopAni = handle.start()

  onUnmounted(() => {
    uninstallResize()
    uninstallMove()
    stopAni && stopAni()
  })
})
<\/script>
`,Cn=`import { rafLoop, updateBallVelocityInRect, isFunc } from '@thing772/utils'
import { type UpdateBallVelocityInRectOptions } from '@thing772/utils'
import { reusableArray } from '@/utils/utils'
import { Ball } from '@/utils/class/ball';

type BallsWanderInRectOptions<T extends Ball> = {
  canvas: HTMLCanvasElement;
  ballsNum: number;
  createBallFac: () => T;//创建ball实例的工厂方法
  speedDecay?: UpdateBallVelocityInRectOptions<T>['speedDecay'];//减速配置
  onBallUpdate?: (ball: T) => void;//自定义更新ball属性更新
  preRender?: (balls: T[], ctx: CanvasRenderingContext2D) => void;
  postRender?: (balls: T[], ctx: CanvasRenderingContext2D) => void;
}

export function ballsWanderInRect<T extends Ball>(options: BallsWanderInRectOptions<T>) {
  let { canvas, ballsNum, createBallFac, onBallUpdate, speedDecay, preRender, postRender } = options
  let w = canvas.width, h = canvas.height
  const ctx = canvas.getContext('2d')!
  let balls = [] as T[]

  const geBalls = reusableArray(createBallFac)

  function setBallNum(n: number) {
    balls = geBalls(n)
    staticRender()
  }

  function setSize(options: { width: number; height: number }) {
    //改变宽高时会清除画布上内容
    Object.assign(canvas, options)
    w = options.width
    h = options.height
    staticRender()
  }

  function staticRender(update?: (ball: T) => void) {
    balls.forEach(ball => {
      if (isFunc(update)) update!(ball)
      ball.render(ctx)
    })
  }

  function render() {
    ctx.clearRect(0, 0, w, h)
    for (let ball of balls) {
      //如果定义运动方式

      if (isFunc(onBallUpdate)) {
        onBallUpdate!(ball)
      } else {
        ball.update()
        //限制小球在矩形区域内运动
        updateBallVelocityInRect(ball, {
          wBox: [0, w],
          hBox: [0, h],
          speedDecay
        })
      }
    }
    preRender?.(balls, ctx)
    balls.forEach(ball => ball.render(ctx))
    postRender?.(balls, ctx)
  }

  function updateBalls(update: (ball: T) => void) {
    ctx.clearRect(0, 0, w, h)
    staticRender(update)
  }

  setBallNum(ballsNum)

  let stopAnim: () => void
  function start() {
    if (stopAnim) {
      stopAnim()
    }

    return stopAnim = rafLoop(() => {
      render()
    })
  }
  return {
    start,
    setBallNum,
    setSize,
    render,
    updateBalls,
  }
}
`;function Rn(l){let{canvas:n,ballsNum:s,createBallFac:t,onBallUpdate:e,speedDecay:i,preRender:u,postRender:r}=l,a=n.width,h=n.height;const p=n.getContext("2d");let o=[];const m=wn(t);function d(y){o=m(y),f()}function c(y){Object.assign(n,y),a=y.width,h=y.height,f()}function f(y){o.forEach(b=>{Bn(y)&&y(b),b.render(p)})}function x(){p.clearRect(0,0,a,h);for(let y of o)Bn(e)?e(y):(y.update(),le(y,{wBox:[0,a],hBox:[0,h],speedDecay:i}));u==null||u(o,p),o.forEach(y=>y.render(p)),r==null||r(o,p)}function w(y){p.clearRect(0,0,a,h),f(y)}d(s);let v;function _(){return v&&v(),v=Q(()=>{x()})}return{start:_,setBallNum:d,setSize:c,render:x,updateBalls:w}}const ht=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=80,e=1,i=3,u=3,r=100,a;D({小球个数:{value:[t,1,1e3,10],onFinishChange(d){t=d,o.setBallNum(d)}},小球半径上限:{value:[e,1,100,1],onFinishChange(d){e=d,o.updateBalls(c=>{c.r=j(1,d)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(d){i=d,o.updateBalls(c=>{c.vx=j(1,d)})}},小球y方向移动速度上限:{value:[u,1,15,.5],onFinishChange(d){u=d,o.updateBalls(c=>{c.vy=j(1,d)})}},小球连接范围阈值:{value:[r,50,300,1],onFinishChange(d){r=d}},查看源码(){s("check-source")}});let h;const p=I();let o,m;return N(()=>{let d=p.value,c=innerWidth,f=innerHeight;Object.assign(d,{width:c,height:f}),o=Rn({canvas:d,ballsNum:t,createBallFac:()=>new K({x:j(10,c-10),y:j(10,f-10),r:j(1,e),vx:j(1,i),vy:j(1,u),styleOptions:{fillStyle:X()}}),preRender(v,_){a||(a=Mn(_,{strokeStyle:X(),lineWidth:1})),m&&(v=v.concat(m));for(let y=0;y<v.length;y++)for(let b=y+1;b<v.length;b++){let S=v[y],E=v[b];Tn(S,E)<r&&a(S,E)}m&&v.pop()}});const x=W(window,"resize",()=>{c=innerWidth,f=innerHeight,o.setSize({width:c,height:f})},{immediate:!0}),w=W(d,"mousemove",v=>{m={x:v.offsetX,y:v.offsetY}},{needLog:!0});h=o.start(),A(()=>{x(),w(),h&&h()})}),(d,c)=>(O(),M("canvas",{ref_key:"canvasRef",ref:p},null,512))}}),ft="/demo/assets/imgs/display-y86Fu395.png",mt={codes:[{name:"index.vue",code:dt,lang:"js"},{name:"wander-balls.ts",code:Cn,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:ht,display:ft,title:"粒子小球连线",descriptions:""},pt=`<template>
  <canvas ref="canvasRef"></canvas>
  <el-input class="input" v-model="fnStr" placeholder="参数:（x:x坐标，t：时间参数），输入x和t的表达式" size="large"
    @keyup.enter="onEnter"></el-input>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { rafLoop, randomRgb, registEvent, setupCoord } from '@thing772/utils'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

const canvasRef = ref()
let w = innerWidth, h = innerHeight, coord: ReturnType<typeof setupCoord>
let defaultFn = (x: number, t: number) => Math.sin(5 * x + 0.001 * t) + Math.cos(10 * x + 0.005 * t)
let fnStr = ref(''), fn: typeof defaultFn | undefined = defaultFn
let rate = 300, lineWidth = 1, strokeStyle = randomRgb()

function onEnter() {
  fn = new Function("x", "t", \`return \${fnStr.value}\`) as (x: number, t: number) => number

  try {
    fn(0, 0)
  } catch (err: any) {
    ElMessage({
      showClose: true,
      message: err.message,
      type: 'error',
      grouping: true,
    })
  }
}

onMounted(() => {
  let canvas = canvasRef.value
  const ctx = canvas.getContext('2d')!

  useGui({
    采样率设置: {
      value: [rate, 10, 1000, 10],
      onFinishChange(n: number) {
        rate = n
      }
    },
    曲线粗细设置: {
      value: [lineWidth, 1, 10, 1],
      onFinishChange(n: number) {
        lineWidth = n
      }
    },
    曲线颜色设置: {
      value: [strokeStyle],
      isColor: true,
      onFinishChange(str: string) {
        strokeStyle = str
      }
    },
    查看源码() {
      emit("check-source")
    }
  })

  coord = setupCoord({
    canvas,
    ctx,
    width: w,
    height: h,
  })

  const stop = rafLoop((t) => {
    ctx.clearRect(0, 0, w, h)
    coord.setup()
    coord.draw((x: number) => {
      let ret = 0
      try {
        ret = fn!(x, t)
      } catch { }
      return ret
    }, {
      rate,
      style: {
        strokeStyle,
        lineWidth,
      },
      label: {
        name: fn!.toString().replace(/ anonymous/, ''),
        pos: {
          x: 100,
          y: 100
        }
      },
    })
  })

  const uninstall = registEvent(window, 'resize', () => {
    w = innerWidth
    h = innerHeight
    coord = setupCoord({
      canvas,
      ctx,
      width: w,
      height: h,
    })
  })

  onUnmounted(() => {
    uninstall()
    stop()
  })
})


<\/script>

<style scoped>
.input {
  position: fixed;
  left: 50%;
  top: 20%;
  width: 500px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 5px #409EFF;
}
</style>
`,gt=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=I();let e=innerWidth,i=innerHeight,u,r=(c,f)=>Math.sin(5*c+.001*f)+Math.cos(10*c+.005*f),a=I(""),h=r,p=300,o=1,m=X();function d(){h=new Function("x","t",`return ${a.value}`);try{h(0,0)}catch(c){gn({showClose:!0,message:c.message,type:"error",grouping:!0})}}return N(()=>{let c=t.value;const f=c.getContext("2d");D({采样率设置:{value:[p,10,1e3,10],onFinishChange(v){p=v}},曲线粗细设置:{value:[o,1,10,1],onFinishChange(v){o=v}},曲线颜色设置:{value:[m],isColor:!0,onFinishChange(v){m=v}},查看源码(){s("check-source")}}),u=kn({canvas:c,ctx:f,width:e,height:i});const x=Q(v=>{f.clearRect(0,0,e,i),u.setup(),u.draw(_=>{let y=0;try{y=h(_,v)}catch{}return y},{rate:p,style:{strokeStyle:m,lineWidth:o},label:{name:h.toString().replace(/ anonymous/,""),pos:{x:100,y:100}}})}),w=W(window,"resize",()=>{e=innerWidth,i=innerHeight,u=kn({canvas:c,ctx:f,width:e,height:i})});A(()=>{w(),x()})}),(c,f)=>{const x=zn;return O(),M(U,null,[H("canvas",{ref_key:"canvasRef",ref:t},null,512),G(x,{class:"input",modelValue:Y(a),"onUpdate:modelValue":f[0]||(f[0]=w=>bn(a)?a.value=w:a=w),placeholder:"参数:（x:x坐标，t：时间参数），输入x和t的表达式",size:"large",onKeyup:Pn(d,["enter"])},null,8,["modelValue"])],64)}}}),vt=q(gt,[["__scopeId","data-v-6125c1c8"]]),xt="/demo/assets/imgs/display-BsbAITaj.png",yt={codes:[{name:"index.vue",code:pt,lang:"js"}],component:vt,display:xt,title:"笛卡尔坐标系函数绘制",descriptions:""},bt=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { alignBy } from '@/utils/utils'
import { setupGrid, setElement } from '@thing772/utils'
import { dfsGenerator, type Index, dfs } from './dfs'
import useTimer from '@/hooks/useTimer'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let xMax: number, yMax: number, w: number, h: number, it: any
let ctx: any
let guiHandler: any

const bgRef = ref('#c5afbb')
const gridSize = ref(30)
const canvasRef = ref()

const start = reactive({ x: 20, y: 10 })
const end = reactive({ x: 0, y: 0 })

const updateView = (initiate?: () => void) => {
  let canvas = canvasRef.value
  w = alignBy(innerWidth, gridSize.value)
  h = alignBy(innerHeight, gridSize.value)
  canvas.width = w
  canvas.height = h
  xMax = w / gridSize.value - 1
  yMax = h / gridSize.value - 1

  initiate?.()

  let getControllerByKey = guiHandler.helpers.getControllerByKey

  let options = {
    '设置起始点X': {
      max: xMax,
      setValue: start.x
    },
    '设置起始点Y': {
      max: yMax,
      setValue: start.y
    },
    '设置终点X': {
      max: xMax,
      setValue: end.x
    },
    '设置终点Y': {
      max: yMax,
      setValue: end.y
    }
  } as any

  for (let key in options) {
    let ctl = getControllerByKey(key)
    let v = options[key]
    for (let attr in v) {
      ctl[attr](v[attr])
    }
  }
}

watch([canvasRef, bgRef], ([canvas, bg]) => {
  setElement(canvas, {
    'background-color': bg
  })
})

watch(gridSize, () => {
  timer.value = 0
  updateView()
  reDraw()
})

const fillPos = (x: number, y: number, options: object) => {
  ctx.save()
  Object.assign(ctx, options)
  ctx.fillRect(x * gridSize.value, y * gridSize.value, gridSize.value, gridSize.value)
  ctx.restore()
}

const fillStartPoint = (x: number, y: number) => {
  fillPos(x, y, { fillStyle: 'red' })
}

const fillEndPoint = (x: number, y: number) => {
  fillPos(x, y, { fillStyle: 'green' })
}

const reDraw = (draw?: () => void) => {
  let canvas = canvasRef.value
  ctx.clearRect(0, 0, w, h)
  setupGrid({
    width: w,
    height: h,
    gridSize: gridSize.value,
    canvas,
    ctx,
    lineWidth: 1,
    gridLineColor: '#fff'
  })
  if (typeof draw == 'function') draw()
  fillStartPoint(start.x, start.y)
  fillEndPoint(end.x, end.y)
}

watch([start, end], () => {
  reDraw()
  timer.value = 0
  it = dfsGenerator(start, end, xMax, yMax)
})

let timer = useTimer()
const itv = shallowRef()

function drawNode(v: any) {
  let {
    current,
    pending,
    visited
  } = v
  reDraw(() => {
    fillPos(current.x, current.y, { fillStyle: "gold" })
    pending.forEach((node: Index) => {
      const { x, y } = node
      fillPos(x, y, { fillStyle: "pink" })
    })
    visited.forEach((node: Index) => {
      const { x, y } = node
      fillPos(x, y, { fillStyle: "black" })
    })
  })
}

function drawPath(current: any) {
  while (current) {
    fillPos(current.x, current.y, { fillStyle: "blue" })
    current = current.parent
  }
  fillStartPoint(start.x, start.y)
  fillEndPoint(end.x, end.y)
}

watch(itv, (v) => {
  let {
    value, done
  } = v
  if (done && !value) return

  drawNode(value)
  if (done) {
    drawPath(value.current)
  }
})

const setupGui = () => {
  guiHandler = useGui({
    设置背景色: {
      value: [bgRef.value],
      isColor: true,
      onFinishChange(n: string) {
        bgRef.value = n
      }
    },
    网格大小设置: {
      value: [gridSize.value, 5, 50, 1],
      onFinishChange(n: number) {
        gridSize.value = n

      }
    },
    设置起始点X: {
      value: [start.x, 0, xMax, 1],
      onFinishChange(n: number) {
        start.x = n
      }
    },
    设置起始点Y: {
      value: [start.y, 0, yMax, 1],
      onFinishChange(n: number) {
        start.y = n
      }
    },
    设置终点X: {
      value: [end.x, 0, xMax, 1],
      onFinishChange(n: number) {
        end.x = n
      }
    },
    设置终点Y: {
      value: [end.y, 0, yMax, 1],
      onFinishChange(n: number) {
        end.y = n
      }
    },
    自动dfs迭代() {
      if (!it!) return
      timer.value = 0

      timer.value = setInterval(() => {
        const v = it.next()
        itv.value = v
        if (v.done) {
          timer.value = 0
        }
      }, 100)
    },
    dfs巡路() {
      console.time('dfs寻路耗时')
      timer.value = 0
      let v = dfs(start, end, xMax, yMax)
      if (!v) {
        throw Error("没有找到终点")
      }
      console.timeEnd('dfs寻路耗时')
      reDraw(() => {
        drawPath(v.current)
      })
    },
    查看源码() {
      emit("check-source")
    }
  })
}

onMounted(() => {
  let canvas = canvasRef.value
  ctx = canvas.getContext('2d')!
  setupGui()
  updateView(() => {
    //调整终点位置
    Object.assign(end, { x: ~~(xMax! / 2), y: ~~(yMax! / 2) })
  })
  it = dfsGenerator(start, end, xMax, yMax)
})
<\/script>
`;function*En(l,n,s,t){let e=[{...l}],i=[],u={...n},r={},a;const h=c=>{r[d(c)]=!0,i.push({...c})},p=()=>{let c=e.shift();return delete r[d(c)],c},o=c=>{c.forEach(f=>{r[d(f)]=!0}),e.unshift(...c)},m=(c,f)=>{if(!(c>s||f>t||c<0||f<0))return{x:c,y:f}},d=c=>`${c.x}-${c.y}`;for(;e.length>0;){if(a&&h(a),a=p(),a.x==u.x&&a.y==u.y)return{current:a,visited:[...i],pending:[...e]};let c=m(a.x,a.y-1),f=m(a.x+1,a.y),x=m(a.x,a.y+1),w=m(a.x-1,a.y),v=[c,f,x,w].filter(Boolean);v=v.filter(_=>!r[d(_)]),v.forEach(_=>{_.parent=a}),v.length!=0&&(o(v),yield{current:a,visited:[...i],pending:[...e]})}}function _t(l,n,s,t){let e=[{...l}],i=[],u={...n},r={},a;const h=c=>{r[d(c)]=!0,i.push({...c})},p=()=>{let c=e.shift();return delete r[d(c)],c},o=c=>{c.forEach(f=>{r[d(f)]=!0}),e.unshift(...c)},m=(c,f)=>{if(!(c>s||f>t||c<0||f<0))return{x:c,y:f}},d=c=>`${c.x}-${c.y}`;for(;e.length>0;){if(a&&h(a),a=p(),a.x==u.x&&a.y==u.y)return{current:a,visited:[...i],pending:[...e]};let c=m(a.x,a.y-1),f=m(a.x+1,a.y),x=m(a.x,a.y+1),w=m(a.x-1,a.y),v=[c,f,x,w].filter(Boolean);v=v.filter(_=>!r[d(_)]),v.forEach(_=>{_.parent=a}),v.length!=0&&o(v)}}const wt=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t,e,i,u,r,a,h;const p=I("#c5afbb"),o=I(30),m=I(),d=mn({x:20,y:10}),c=mn({x:0,y:0}),f=g=>{let R=m.value;i=nn(innerWidth,o.value),u=nn(innerHeight,o.value),R.width=i,R.height=u,t=i/o.value-1,e=u/o.value-1,g==null||g();let T=h.helpers.getControllerByKey,F={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:e,setValue:d.y},设置终点X:{max:t,setValue:c.x},设置终点Y:{max:e,setValue:c.y}};for(let k in F){let z=T(k),$=F[k];for(let tn in $)z[tn]($[tn])}};V([m,p],([g,R])=>{_n(g,{"background-color":R})}),V(o,()=>{y.value=0,f(),_()});const x=(g,R,T)=>{a.save(),Object.assign(a,T),a.fillRect(g*o.value,R*o.value,o.value,o.value),a.restore()},w=(g,R)=>{x(g,R,{fillStyle:"red"})},v=(g,R)=>{x(g,R,{fillStyle:"green"})},_=g=>{let R=m.value;a.clearRect(0,0,i,u),On({width:i,height:u,gridSize:o.value,canvas:R,ctx:a,lineWidth:1,gridLineColor:"#fff"}),typeof g=="function"&&g(),w(d.x,d.y),v(c.x,c.y)};V([d,c],()=>{_(),y.value=0,r=En(d,c,t,e)});let y=Wn();const b=ln();function S(g){let{current:R,pending:T,visited:F}=g;_(()=>{x(R.x,R.y,{fillStyle:"gold"}),T.forEach(k=>{const{x:z,y:$}=k;x(z,$,{fillStyle:"pink"})}),F.forEach(k=>{const{x:z,y:$}=k;x(z,$,{fillStyle:"black"})})})}function E(g){for(;g;)x(g.x,g.y,{fillStyle:"blue"}),g=g.parent;w(d.x,d.y),v(c.x,c.y)}V(b,g=>{let{value:R,done:T}=g;T&&!R||(S(R),T&&E(R.current))});const B=()=>{h=D({设置背景色:{value:[p.value],isColor:!0,onFinishChange(g){p.value=g}},网格大小设置:{value:[o.value,5,50,1],onFinishChange(g){o.value=g}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(g){d.x=g}},设置起始点Y:{value:[d.y,0,e,1],onFinishChange(g){d.y=g}},设置终点X:{value:[c.x,0,t,1],onFinishChange(g){c.x=g}},设置终点Y:{value:[c.y,0,e,1],onFinishChange(g){c.y=g}},自动dfs迭代(){r&&(y.value=0,y.value=setInterval(()=>{const g=r.next();b.value=g,g.done&&(y.value=0)},100))},dfs巡路(){console.time("dfs寻路耗时"),y.value=0;let g=_t(d,c,t,e);if(!g)throw Error("没有找到终点");console.timeEnd("dfs寻路耗时"),_(()=>{E(g.current)})},查看源码(){s("check-source")}})};return N(()=>{a=m.value.getContext("2d"),B(),f(()=>{Object.assign(c,{x:~~(t/2),y:~~(e/2)})}),r=En(d,c,t,e)}),(g,R)=>(O(),M("canvas",{ref_key:"canvasRef",ref:m},null,512))}}),Ct="/demo/assets/imgs/display-BRS54xHs.png",Rt=`export type Index = { x: number; y: number }
type IndexWithParent = Index & { parent?: IndexWithParent }

/**
 * dfs生成器版本，dfs迭代网格化后的地图
 * @param start Index 起始点
 * @param end Index 终点
 * @param xMax number 网格地图最大x坐标
 * @param yMax number 网格地图最大y坐标
 * @returns
 */
export function* dfsGenerator(start: Index, end: Index, xMax: number, yMax: number) {
  let queue = [{ ...start }]
  let visited = [] as Index[]
  let dest = { ...end }
  let temp = {} as { [key: string]: boolean }
  let current: any

  const addToVisited = (node: Index) => {
    temp[getNodeKey(node)] = true
    visited.push({
      ...node
    })
  }

  const getQueue = () => {
    let node = queue.shift()!
    delete temp[getNodeKey(node)]
    return node
  }

  const addToQueue = (nodes: IndexWithParent[]) => {
    nodes.forEach(item => {
      temp[getNodeKey(item)] = true
    })
    queue.unshift(...nodes)
  }

  const getNode = (x: number, y: number) => {
    if (x > xMax || y > yMax || x < 0 || y < 0) {
      return undefined
    }
    return { x, y }
  }

  const getNodeKey = (node: Index) => \`\${node.x}-\${node.y}\`

  while (queue.length > 0) {
    if (current) {
      addToVisited(current)
    }

    current = getQueue()

    if (current.x == dest.x && current.y == dest.y) {
      return {
        current,
        visited: [...visited],
        pending: [...queue]
      }
    }

    let up = getNode(current.x, current.y - 1)
    let right = getNode(current.x + 1, current.y)
    let down = getNode(current.x, current.y + 1)
    let left = getNode(current.x - 1, current.y)

    //过滤无效周围节点
    let available = [up, right, down, left].filter(Boolean) as IndexWithParent[]

    //过滤已经访问或者待访问的节点
    available = available.filter(item => !temp[getNodeKey(item)])
    available.forEach(item => {
      item.parent = current
    })

    if (available.length == 0) continue

    addToQueue(available)

    yield {
      current,
      visited: [...visited],
      pending: [...queue]
    }
  }
}

/**
 * dfs普通版本，dfs算法求得起点到终点的搜索路径
 * @param start Index 起始点
 * @param end Index 终点
 * @param xMax number 网格地图最大x坐标
 * @param yMax number 网格地图最大y坐标
 * @returns 完成时返回{current:IndexWithParent,visited:IndexWithParent[],pending:IndexWithParent[]},通过current迭代获得完整dfs路径
 */
export function dfs(start: Index, end: Index, xMax: number, yMax: number) {
  let queue = [{ ...start }]
  let visited = [] as Index[]
  let dest = { ...end }
  let temp = {} as { [key: string]: boolean }
  let current: any

  const addToVisited = (node: Index) => {
    temp[getNodeKey(node)] = true
    visited.push({
      ...node
    })
  }

  const getQueue = () => {
    let node = queue.shift()!
    delete temp[getNodeKey(node)]
    return node
  }

  const addToQueue = (nodes: IndexWithParent[]) => {
    nodes.forEach(item => {
      temp[getNodeKey(item)] = true
    })
    queue.unshift(...nodes)
  }

  const getNode = (x: number, y: number) => {
    if (x > xMax || y > yMax || x < 0 || y < 0) {
      return undefined
    }
    return { x, y }
  }

  const getNodeKey = (node: Index) => \`\${node.x}-\${node.y}\`

  while (queue.length > 0) {
    if (current) {
      addToVisited(current)
    }

    current = getQueue()

    if (current.x == dest.x && current.y == dest.y) {
      return {
        current,
        visited: [...visited],
        pending: [...queue]
      }
    }

    let up = getNode(current.x, current.y - 1)
    let right = getNode(current.x + 1, current.y)
    let down = getNode(current.x, current.y + 1)
    let left = getNode(current.x - 1, current.y)

    //过滤无效周围节点
    let available = [up, right, down, left].filter(Boolean) as IndexWithParent[]

    //过滤已经访问或者待访问的节点
    available = available.filter(item => !temp[getNodeKey(item)])
    available.forEach(item => {
      item.parent = current
    })

    if (available.length == 0) continue
    addToQueue(available)
  }
}
`,St={codes:[{name:"index.vue",code:bt,lang:"js"},{name:"dfs.ts",code:Rt,lang:"ts"}],component:wt,display:Ct,title:"canvas网格——深度优先搜索",descriptions:""},Bt=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, isPointInCycle, rafLoop, setElement, ptOffset, distance, randomBetween } from '@thing772/utils'
import { alignBy, movePtWithDirection } from '@/utils/utils'
import { Particle } from '@/utils/class/particle'
import { throttle } from 'lodash-es'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

type ExtendParticle = Particle & { originPos: { x: number; y: number; } }
let nRow = 20, nCol = 30, r = 10, gridSize = 20, w = 0, h = 0
let gapX = 25, gapY = 25, ballColor = '#53e953'
let particles: ExtendParticle[] = [], ctx: CanvasRenderingContext2D
let scopeR = 50

function createParticles() {
  particles = []

  for (let y = 0; y < nRow; y++) {
    for (let x = 0; x < nCol; x++) {
      let posX = -1 * (nCol - 1 - x) * gapY + w / 2 + (nCol - 1) * gapY / 2
      let posY = -1 * (nRow - 1 - y) * gapX + h / 2 + (nRow - 1) * gapX / 2
      let p = new Particle({
        x: posX,
        y: posY,
        tx: posX,
        ty: posY,
        r,
        fx: randomBetween(0.01, 0.5, false),
        fy: randomBetween(0.01, 0.5, false),
        color: ballColor
      }) as ExtendParticle
      p.originPos = {
        x: posX,
        y: posY
      }
      particles.push(p)
    }
  }
}

function updateParticles(props: object) {
  particles.forEach(particle => {
    Object.assign(particle, props)
  })
}

useGui({
  球阵列行数: {
    value: [nRow, 1, 50, 1],
    onFinishChange(n: number) {
      nRow = n
      createParticles()
    }
  },
  球阵列列数: {
    value: [nCol, 1, 50, 1],
    onFinishChange(n: number) {
      nCol = n
      createParticles()
    }
  },
  球阵列列间距: {
    value: [gapY, 6, 50, 2],
    onFinishChange(n: number) {
      gapY = n
      createParticles()
    }
  },
  球阵列行间距: {
    value: [gapX, 6, 50, 2],
    onFinishChange(n: number) {
      gapX = n
      createParticles()
    }
  },
  影响半径: {
    value: [scopeR, 10, 500, 1],
    onFinishChange(n: number) {
      scopeR = n
      createParticles()
    }
  },
  小球半径: {
    value: [r, 4, 100, 1],
    onFinishChange(n: number) {
      r = n
      updateParticles({ r })
      calc()
    }
  },
  球颜色: {
    value: [ballColor],
    isColor: true,
    onFinishChange(color: string) {
      ballColor = color
      updateParticles({ color })
    }
  },
  查看源码() {
    emit("check-source")
  }
})

const canvasRef = ref()

const updateView = () => {
  w = alignBy(innerWidth, gridSize)
  h = alignBy(innerHeight, gridSize)
  Object.assign(canvasRef.value, {
    width: w,
    height: h
  })
}

let pt: { x: number; y: number }
const calc = () => {
  if (pt) {
    for (let particle of particles) {
      let { originPos } = particle
      if (isPointInCycle(pt, scopeR, originPos)) {
        let ri = scopeR - distance(pt, originPos)
        let targetPos = movePtWithDirection(originPos, ptOffset(pt, originPos), ri * (ri / scopeR))
        Object.assign(particle, {
          tx: targetPos.x,
          ty: targetPos.y,
          done: false
        })
      } else {
        Object.assign(particle, {
          tx: originPos.x,
          ty: originPos.y,
          done: false
        })
      }
    }
  }
}

onMounted(() => {
  let canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  const uninstallResize = registEvent(window, 'resize', throttle(() => {
    updateView()
    createParticles()
  }, 100), { immediate: true })

  const uninstallMove = registEvent(canvas, 'mousemove', (e: unknown) => {
    let { offsetX, offsetY } = e as MouseEvent
    if (!pt) pt = { x: offsetX, y: offsetY }
    else {
      pt.x = offsetX
      pt.y = offsetY
    }
    calc()
  })

  setElement(canvas, { 'background-color': '#0d0d0d' })
  createParticles()

  const stopAni = rafLoop(() => {
    ctx.clearRect(0, 0, w, h)
    for (let particle of particles) {
      particle.update()
      particle.render(ctx)
    }
  })

  onUnmounted(() => {
    uninstallResize()
    stopAni()
    uninstallMove()
  })
})
<\/script>

<style scoped>
canvas {
  cursor: pointer;
}
</style>
`;class Ln{constructor(n){C(this,"x",0);C(this,"y",0);C(this,"tx",0);C(this,"ty",0);C(this,"color","pink");C(this,"name","");C(this,"fx",.01);C(this,"fy",.01);C(this,"onDone");C(this,"r",0);C(this,"size",0);C(this,"done",!1);Object.assign(this,n)}update(){var t;let{tx:n,ty:s}=this;if(!this.done)return this.x=J(this.x,n,this.fx),this.y=J(this.y,s,this.fy),pn(this.x,this.tx)&&pn(this.y,this.ty)&&(this.done=!0,(t=this.onDone)==null||t.call(this)),this}render(n){let{color:s,x:t,y:e,size:i,r:u}=this;n.save(),Object.assign(n,{fillStyle:s}),n.beginPath(),i>0?n.fillRect(t,e,i,i):u>0?n.arc(t,e,u,0,Math.PI*2):n.arc(t,e,2,0,Math.PI*2),n.fill(),n.restore()}}const kt=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=20,e=30,i=10,u=20,r=0,a=0,h=25,p=25,o="#53e953",m=[],d,c=50;function f(){m=[];for(let b=0;b<t;b++)for(let S=0;S<e;S++){let E=-1*(e-1-S)*p+r/2+(e-1)*p/2,B=-1*(t-1-b)*h+a/2+(t-1)*h/2,g=new Ln({x:E,y:B,tx:E,ty:B,r:i,fx:j(.01,.5,!1),fy:j(.01,.5,!1),color:o});g.originPos={x:E,y:B},m.push(g)}}function x(b){m.forEach(S=>{Object.assign(S,b)})}D({球阵列行数:{value:[t,1,50,1],onFinishChange(b){t=b,f()}},球阵列列数:{value:[e,1,50,1],onFinishChange(b){e=b,f()}},球阵列列间距:{value:[p,6,50,2],onFinishChange(b){p=b,f()}},球阵列行间距:{value:[h,6,50,2],onFinishChange(b){h=b,f()}},影响半径:{value:[c,10,500,1],onFinishChange(b){c=b,f()}},小球半径:{value:[i,4,100,1],onFinishChange(b){i=b,x({r:i}),y()}},球颜色:{value:[o],isColor:!0,onFinishChange(b){o=b,x({color:b})}},查看源码(){s("check-source")}});const w=I(),v=()=>{r=nn(innerWidth,u),a=nn(innerHeight,u),Object.assign(w.value,{width:r,height:a})};let _;const y=()=>{if(_)for(let b of m){let{originPos:S}=b;if(oe(_,c,S)){let E=c-Tn(_,S),B=et(S,$n(_,S),E*(E/c));Object.assign(b,{tx:B.x,ty:B.y,done:!1})}else Object.assign(b,{tx:S.x,ty:S.y,done:!1})}};return N(()=>{let b=w.value;d=b.getContext("2d");const S=W(window,"resize",re(()=>{v(),f()},100),{immediate:!0}),E=W(b,"mousemove",g=>{let{offsetX:R,offsetY:T}=g;_?(_.x=R,_.y=T):_={x:R,y:T},y()});_n(b,{"background-color":"#0d0d0d"}),f();const B=Q(()=>{d.clearRect(0,0,r,a);for(let g of m)g.update(),g.render(d)});A(()=>{S(),B(),E()})}),(b,S)=>(O(),M("canvas",{ref_key:"canvasRef",ref:w},null,512))}}),It=q(kt,[["__scopeId","data-v-872cfa4e"]]),Gn=`import { iterateEaseFromTo, looseEqual } from '@thing772/utils'

type ParticleOptionsBase = {
  x?: number;//当前x
  y?: number;//当前y
  tx?: number;//目标x
  ty?: number;//目标y
  fx?: number;//x方向迭代因子
  fy?: number;//y方向迭代因子
  color?: string;//样色
  name?: string;//名称
  onDone?: () => void;//粒子到达目标位置后回调
}
type ParticleOptions = ({ r: number } | { size: number }) & ParticleOptionsBase

export class Particle {
  x = 0
  y = 0
  tx = 0
  ty = 0
  color = "pink"
  name = ""
  fx = 0.01
  fy = 0.01
  onDone?: () => void
  r = 0;
  size = 0;
  done = false
  constructor(options: ParticleOptions) {
    Object.assign(this, options)
  }

  update() {
    let { tx, ty } = this;
    if (this.done) return;
    this.x = iterateEaseFromTo(this.x, tx, this.fx);
    this.y = iterateEaseFromTo(this.y, ty, this.fy);
    if (looseEqual(this.x, this.tx) && looseEqual(this.y, this.ty)) {
      this.done = true;
      this.onDone?.();
    }
    return this
  }

  render(ctx: CanvasRenderingContext2D) {
    let { color, x, y, size, r } = this;
    ctx.save();
    Object.assign(ctx, {
      fillStyle: color,
    });
    ctx.beginPath();
    if (size > 0) {
      ctx.fillRect(x, y, size, size);
    } else if (r > 0) {
      ctx.arc(x, y, r, 0, Math.PI * 2);
    } else {
      ctx.arc(x, y, 2, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
  }
}
`,Ft="/demo/assets/imgs/display-D8ZXnX54.png",jt={codes:[{name:"index.vue",code:Bt,lang:"js"},{name:"particle.ts",code:Gn,lang:"js"}],component:It,display:Ft,title:"鼠标滑过小球堆的效果",descriptions:""},Et=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, rafLoop, iterateEaseFromTo, randomRgb, isCycleInclude, getAngle, angleToPos, drawLine } from '@thing772/utils'
import { Ball } from '@/utils/class/ball'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

useGui({
  查看源码() {
    emit("check-source")
  }
})

const canvasRef = ref()

onMounted(() => {
  let canvas = canvasRef.value
  let w: number, h: number, pt: { x: number; y: number }
  let ctx = canvas.getContext('2d')!

  const uninstallResize = registEvent(window, 'resize', () => {
    Object.assign(canvas, {
      width: w = innerWidth,
      height: h = innerHeight
    })
  }, { immediate: true })

  const uninstallMove = registEvent(canvas, 'mousemove',
    function (e: MouseEvent) {
      pt = { x: e.offsetX, y: e.offsetY }
    } as any
  )

  let eyes = [
    new Ball({
      r: 50,
      x: w! / 2 - 80,
      y: h! / 2,
      styleOptions: {
        fillStyle: randomRgb(),
      }
    }), new Ball({
      r: 50,
      x: w! / 2 + 80,
      y: h! / 2,
      styleOptions: {
        fillStyle: randomRgb(),
      }
    })
  ]

  let eyeBalls = eyes.map(item => new Ball({
    r: item.r / 4,
    x: item.x,
    y: item.y,
    styleOptions: {
      fillStyle: randomRgb(),
    }
  }))

  let face = new Ball({
    r: 200,
    x: w! / 2,
    y: h! / 2,
    styleOptions: {
      fillStyle: "#E6A23C",
    }
  })

  let drawMouth = drawLine(ctx, {
    strokeStyle: "#fff",
    lineWidth: "10",
    lineCap: "round",
  })

  let f = 0.05
  const stopAnim = rafLoop(() => {
    ctx.clearRect(0, 0, w, h)
    face.render(ctx)
    eyes.forEach(eye => {
      eye.render(ctx)
    })
    eyeBalls.forEach((ball, index) => {
      if (pt) {
        let x = ball.x = iterateEaseFromTo(ball.x, pt.x, f);
        let y = ball.y = iterateEaseFromTo(ball.y, pt.y, f);
        let eye = eyes[index]
        //限制在眼框半径-10内
        let temp = { x: eye.x, y: eye.y, r: eye.r - 10 }
        //超出重新计算x，y并赋值给眼球
        if (!isCycleInclude(temp, ball)) {
          ball.x = x;
          ball.y = y;
          let angle1 = getAngle(temp, pt);
          Object.assign(ball, angleToPos(temp, angle1, temp.r - ball.r));
        }
      }
      ball.render(ctx)
    })

    drawMouth({ x: w / 2 - 50, y: h / 2 + 100 }, { x: w / 2 + 50, y: h / 2 + 100 })
  })

  onUnmounted(() => {
    uninstallResize()
    uninstallMove()
    stopAnim
  })
})
<\/script>
`,Ot=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;D({查看源码(){s("check-source")}});const t=I();return N(()=>{let e=t.value,i,u,r,a=e.getContext("2d");const h=W(window,"resize",()=>{Object.assign(e,{width:i=innerWidth,height:u=innerHeight})},{immediate:!0}),p=W(e,"mousemove",function(x){r={x:x.offsetX,y:x.offsetY}});let o=[new K({r:50,x:i/2-80,y:u/2,styleOptions:{fillStyle:X()}}),new K({r:50,x:i/2+80,y:u/2,styleOptions:{fillStyle:X()}})],m=o.map(x=>new K({r:x.r/4,x:x.x,y:x.y,styleOptions:{fillStyle:X()}})),d=new K({r:200,x:i/2,y:u/2,styleOptions:{fillStyle:"#E6A23C"}}),c=Mn(a,{strokeStyle:"#fff",lineWidth:"10",lineCap:"round"}),f=.05;Q(()=>{a.clearRect(0,0,i,u),d.render(a),o.forEach(x=>{x.render(a)}),m.forEach((x,w)=>{if(r){let v=x.x=J(x.x,r.x,f),_=x.y=J(x.y,r.y,f),y=o[w],b={x:y.x,y:y.y,r:y.r-10};if(!ce(b,x)){x.x=v,x.y=_;let S=ue(b,r);Object.assign(x,de(b,S,b.r-x.r))}}x.render(a)}),c({x:i/2-50,y:u/2+100},{x:i/2+50,y:u/2+100})}),A(()=>{h(),p()})}),(e,i)=>(O(),M("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),Mt="/demo/assets/imgs/display-BcjSOcDf.png",Tt={codes:[{name:"index.vue",code:Et,lang:"js"},{name:"ball.ts",code:en,lang:"ts"}],component:Ot,display:Mt,title:"会动的眼球",descriptions:""},Pt=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent } from '@thing772/utils'
import { fallingBalls } from '@/lib/canvas/falling-balls'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ballNum = 100
const pauseRef = ref()

const { helpers: { getControllerByKey } } = useGui({
  小球个数: {
    value: [ballNum, 1, 1000, 10],
    onFinishChange(n: number) {
      ballNum = n
      handle.setBallsNum(n)
    }
  },
  开始() {
    let pause = handle.start()
    if (pause)
      pauseRef.value = pause
  },
  暂停: {
    value: [function () {
      pauseRef.value()
    }],
    disable: !pauseRef.value
  },
  重置() {
    let pause = handle.reset()
    if (pause)
      pauseRef.value = pause
  },
  查看源码() {
    emit('check-source')
  },
})

watch(pauseRef, (v) => {
  getControllerByKey('暂停')!.enable(!!v)
})

const canvasRef = ref()
let handle: ReturnType<typeof fallingBalls>

function onAllStopped() {
  ElMessage({
    showClose: true,
    message: '所有小球都停止运动了',
    type: 'success',
    grouping: true,
  })
}

onMounted(() => {
  let canvas = canvasRef.value
  Object.assign(canvas, {
    width: innerWidth,
    height: innerHeight
  })

  handle = fallingBalls({
    num: ballNum, canvas, onAllStopped
  })

  const uninstallResize = registEvent(window, 'resize', () => {
    handle.setSize({
      width: innerWidth,
      height: innerHeight
    })
  }, { immediate: true })

  handle.render()

  onUnmounted(() => {
    uninstallResize()
    if (pauseRef.value) {
      pauseRef.value()
    }
  })
})
<\/script>
`,zt=`import { Ball } from '@/utils/class/ball'
import { randomBetween, randomRgb, rafLoop, looseEqual } from '@thing772/utils'
import { reusableArray } from '@/utils/utils'

type fallingBallsOptions = {
  num: number;//小球数量
  canvas: HTMLCanvasElement;
  onAllStopped?: () => void//停止运动回调
}

export function fallingBalls(options: fallingBallsOptions) {
  let { canvas, num, onAllStopped } = options
  const ctx = canvas.getContext("2d")!;
  let w = canvas.width;
  let h = canvas.height;

  type BallType = Ball & { stopped?: boolean }
  let balls = [] as BallType[]
  let running = false
  let allDone = false

  const getBall = reusableArray(() => new Ball(getOptions()))

  function getOptions() {
    return {
      x: randomBetween(10, w - 10),
      y: randomBetween(10, h - 10),
      r: 4,
      ax: 0,
      ay: randomBetween(0.1, 2, false),
      vx: 0,
      vy: randomBetween(1, 3),
      styleOptions: {
        fillStyle: randomRgb(),
      },
      stopped: false
    }
  }

  function setBallsNum(n: number) {
    balls = getBall(n)
  }

  function reset() {
    for (let ball of balls) {
      ball.reset().set(getOptions())
    }
    allDone = false
    if (!running) {
      return start()
    }
  }

  function setSize(options: { width: number; height: number }) {
    //改变宽高时会清除画布上内容
    Object.assign(canvas, options)
    w = options.width
    h = options.height
  }

  //判断小球是否停下了
  function ballStopTest(ball: BallType) {
    return ball.stopped || (looseEqual(ball.vy, 0, 1) && looseEqual(ball.y + ball.r, h, 1))
  }

  function render() {
    if (balls.length == 0) return
    ctx.clearRect(0, 0, w, h)
    for (let ball of balls) {
      ball.update()
      if (ball.y + ball.r > h) {
        ball.y = h - ball.r;
        ball.vy *= -0.7;
      }
      ball.render(ctx)
      if (ballStopTest(ball)) {
        ball.stopped = true
        if (balls.every(ballStopTest)) {
          running = false
          allDone = true
          try { onAllStopped?.(); } catch (err) { console.error(err) }
          return false
        }
      }
    }
  }

  setBallsNum(num)

  function start() {
    if (running) return
    running = true
    if (allDone) {
      reset()
    }
    let pause = rafLoop(render)
    return () => {
      if (running) {
        running = false
        pause()
      }
    }
  }

  return {
    start,
    reset,
    setBallsNum,
    setSize,
    render
  }
}
`;function $t(l){let{canvas:n,num:s,onAllStopped:t}=l;const e=n.getContext("2d");let i=n.width,u=n.height,r=[],a=!1,h=!1;const p=wn(()=>new K(o()));function o(){return{x:j(10,i-10),y:j(10,u-10),r:4,ax:0,ay:j(.1,2,!1),vx:0,vy:j(1,3),styleOptions:{fillStyle:X()},stopped:!1}}function m(v){r=p(v)}function d(){for(let v of r)v.reset().set(o());if(h=!1,!a)return w()}function c(v){Object.assign(n,v),i=v.width,u=v.height}function f(v){return v.stopped||pn(v.vy,0,1)&&pn(v.y+v.r,u,1)}function x(){if(r.length!=0){e.clearRect(0,0,i,u);for(let v of r)if(v.update(),v.y+v.r>u&&(v.y=u-v.r,v.vy*=-.7),v.render(e),f(v)&&(v.stopped=!0,r.every(f))){a=!1,h=!0;try{t==null||t()}catch(_){console.error(_)}return!1}}}m(s);function w(){if(a)return;a=!0,h&&d();let v=Q(x);return()=>{a&&(a=!1,v())}}return{start:w,reset:d,setBallsNum:m,setSize:c,render:x}}const Dt=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=100;const e=I(),{helpers:{getControllerByKey:i}}=D({小球个数:{value:[t,1,1e3,10],onFinishChange(h){t=h,r.setBallsNum(h)}},开始(){let h=r.start();h&&(e.value=h)},暂停:{value:[function(){e.value()}],disable:!e.value},重置(){let h=r.reset();h&&(e.value=h)},查看源码(){s("check-source")}});V(e,h=>{i("暂停").enable(!!h)});const u=I();let r;function a(){gn({showClose:!0,message:"所有小球都停止运动了",type:"success",grouping:!0})}return N(()=>{let h=u.value;Object.assign(h,{width:innerWidth,height:innerHeight}),r=$t({num:t,canvas:h,onAllStopped:a});const p=W(window,"resize",()=>{r.setSize({width:innerWidth,height:innerHeight})},{immediate:!0});r.render(),A(()=>{p(),e.value&&e.value()})}),(h,p)=>(O(),M("canvas",{ref_key:"canvasRef",ref:u},null,512))}}),Nt="/demo/assets/imgs/display-DOU4TeMC.png",At={codes:[{name:"index.vue",code:Pt,lang:"js"},{name:"falling-balls.ts",code:zt,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:Dt,display:Nt,title:"下落的小球",descriptions:""},Wt=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { randomBetween, registEvent, randomRgb } from '@thing772/utils'
import { ballsWanderInRect } from '@/lib/canvas/wander-balls'
import { Ball } from '@/utils/class/ball'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ballsNum = 100, r = 20, vx = 20, vy = 17, f = 0.01

useGui({
  小球个数: {
    value: [ballsNum, 1, 1000, 10],
    onFinishChange(n: number) {
      ballsNum = n
      handle.setBallNum(n)
    }
  },
  小球半径上限: {
    value: [r, 4, 100, 1],
    onFinishChange(n: number) {
      r = n
      handle.updateBalls(ball => {
        ball.r = randomBetween(4, n)
      })
    }
  },
  小球x方向移动速度上限: {
    value: [vx, 1, 15, 0.5],
    onFinishChange(n: number) {
      vx = n
      handle.updateBalls(ball => {
        ball.vx = randomBetween(1, n)
      })
    }
  },
  小球y方向移动速度上限: {
    value: [vy, 1, 15, 0.5],
    onFinishChange(n: number) {
      vy = n
      handle.updateBalls(ball => {
        ball.vy = randomBetween(1, n)
      })
    }
  },
  小球摩擦力因子: {
    value: [f, 0, 3, 0.1],
    onFinishChange(n: number) {
      f = n
      handle.updateBalls(ball => {
        ball.friction = randomBetween(0, n)
      })
    }
  },
  开始() {
    if (stopAni) stopAni()
    stopAni = handle.start()
  },
  查看源码() {
    emit("check-source")
  }
})

let stopAni: ReturnType<typeof handle.start>
type BallWithFriction = Ball & { friction: number }

const canvasRef = ref()
let handle: ReturnType<typeof ballsWanderInRect<BallWithFriction>>

onMounted(() => {
  let canvas = canvasRef.value
  let w: number, h: number
  Object.assign(canvas, {
    width: w = innerWidth,
    height: h = innerHeight
  })

  handle = ballsWanderInRect<BallWithFriction>({
    canvas,
    ballsNum,
    createBallFac: () => {
      let options = {
        x: randomBetween(10, w - 10),
        y: randomBetween(10, h - 10),
        r: randomBetween(1, r),
        vx: randomBetween(1, vx),
        vy: randomBetween(1, vy),
        styleOptions: {
          fillStyle: randomRgb(),
        },
        friction: randomBetween(0, f)
      }
      return new Ball(options) as unknown as BallWithFriction
    },
    onBallUpdate(ball) {
      if (ball.vx >= 0.01) {
        ball.vx -= ball.friction;
        ball.x += ball.vx;
      }
      if (ball.vy >= 0.01) {
        ball.vy -= ball.friction;
        ball.y += ball.vy;
      }

      if (ball.x > w + ball.r) {
        ball.x = -ball.r;
      }
      if (ball.y > h + ball.r) {
        ball.y = -ball.r;
      }
    }
  })

  const uninstall = registEvent(window, 'resize', () => {
    handle.setSize({
      width: w = innerWidth,
      height: h = innerHeight
    })
  }, { immediate: true })

  onUnmounted(() => {
    uninstall()
    stopAni && stopAni()
  })
})
<\/script>
`,Lt=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=100,e=20,i=20,u=17,r=.01;D({小球个数:{value:[t,1,1e3,10],onFinishChange(o){t=o,p.setBallNum(o)}},小球半径上限:{value:[e,4,100,1],onFinishChange(o){e=o,p.updateBalls(m=>{m.r=j(4,o)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(o){i=o,p.updateBalls(m=>{m.vx=j(1,o)})}},小球y方向移动速度上限:{value:[u,1,15,.5],onFinishChange(o){u=o,p.updateBalls(m=>{m.vy=j(1,o)})}},小球摩擦力因子:{value:[r,0,3,.1],onFinishChange(o){r=o,p.updateBalls(m=>{m.friction=j(0,o)})}},开始(){a&&a(),a=p.start()},查看源码(){s("check-source")}});let a;const h=I();let p;return N(()=>{let o=h.value,m,d;Object.assign(o,{width:m=innerWidth,height:d=innerHeight}),p=Rn({canvas:o,ballsNum:t,createBallFac:()=>{let f={x:j(10,m-10),y:j(10,d-10),r:j(1,e),vx:j(1,i),vy:j(1,u),styleOptions:{fillStyle:X()},friction:j(0,r)};return new K(f)},onBallUpdate(f){f.vx>=.01&&(f.vx-=f.friction,f.x+=f.vx),f.vy>=.01&&(f.vy-=f.friction,f.y+=f.vy),f.x>m+f.r&&(f.x=-f.r),f.y>d+f.r&&(f.y=-f.r)}});const c=W(window,"resize",()=>{p.setSize({width:m=innerWidth,height:d=innerHeight})},{immediate:!0});A(()=>{c(),a&&a()})}),(o,m)=>(O(),M("canvas",{ref_key:"canvasRef",ref:h},null,512))}}),Gt="/demo/assets/imgs/display-BaZn1eIe.png",Ht={codes:[{name:"index.vue",code:Wt,lang:"js"},{name:"wander-balls.ts",code:Cn,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:Lt,display:Gt,title:"运动减速",descriptions:""},Vt=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent } from '@thing772/utils'
import { Noise, type NoiseType } from 'noisejs'
import { debounce } from 'lodash-es'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let w = innerWidth, h = innerHeight
let ctx: CanvasRenderingContext2D
let scaleX = ref(0.01), scaleY = ref(0.01), scaleV = ref(1)
let noise = shallowRef(new Noise(Math.random()))


let algorithm = ref<NoiseType>('simplex2')

let renderNoise = () => {
  let image = ctx.getImageData(0, 0, w, h)

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let v = ~~Math.min(255, (Math.abs(noise.value[algorithm.value](x * scaleX.value, y * scaleY.value)) * scaleV.value * 256))
      image.data[(y * w + x) * 4 + 0] = v
      image.data[(y * w + x) * 4 + 1] = v
      image.data[(y * w + x) * 4 + 2] = v
      image.data[(y * w + x) * 4 + 3] = 255
    }
  }

  ctx.putImageData(image, 0, 0)
}

useGui({
  噪声生成算法: {
    value: [algorithm.value, ['simplex2', 'perlin2'] as const],
    onFinishChange(name: NoiseType) {
      algorithm.value = name
    }
  },
  x方向缩放因子: {
    value: [scaleX.value, 0.001, 0.5, 0.001],
    onFinishChange(n: number) {
      scaleX.value = n
    }
  },
  y方向缩放因子: {
    value: [scaleY.value, 0.001, 0.5, 0.001],
    onFinishChange(n: number) {
      scaleY.value = n
    }
  },
  值放缩因子: {
    value: [scaleV.value, 0.01, 255, 0.1],
    onFinishChange(n: number) {
      scaleV.value = n
    }
  },
  重新生成随机种子() {
    noise.value = new Noise(Math.random())
  },
  查看源码() {
    emit("check-source")
  }
})

const canvasRef = ref()

onMounted(() => {
  const canvas = canvasRef.value
  canvas.width = w
  canvas.height = h
  ctx = canvas.getContext('2d', { willReadFrequently: true })!

  const unistall = registEvent(window, 'resize', debounce(() => {
    w = ~~(innerWidth / 1)
    h = ~~(innerHeight / 1)
    canvas.width = w
    canvas.height = h
    renderNoise()
  }, 100))

  let stopWatch = watchEffect(renderNoise)

  onUnmounted(() => {
    unistall()
    stopWatch()
  })
})
<\/script>
`,qt=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=innerWidth,e=innerHeight,i,u=I(.01),r=I(.01),a=I(1),h=ln(new In.Noise(Math.random())),p=I("simplex2"),o=()=>{let d=i.getImageData(0,0,t,e);for(let c=0;c<t;c++)for(let f=0;f<e;f++){let x=~~Math.min(255,Math.abs(h.value[p.value](c*u.value,f*r.value))*a.value*256);d.data[(f*t+c)*4+0]=x,d.data[(f*t+c)*4+1]=x,d.data[(f*t+c)*4+2]=x,d.data[(f*t+c)*4+3]=255}i.putImageData(d,0,0)};D({噪声生成算法:{value:[p.value,["simplex2","perlin2"]],onFinishChange(d){p.value=d}},x方向缩放因子:{value:[u.value,.001,.5,.001],onFinishChange(d){u.value=d}},y方向缩放因子:{value:[r.value,.001,.5,.001],onFinishChange(d){r.value=d}},值放缩因子:{value:[a.value,.01,255,.1],onFinishChange(d){a.value=d}},重新生成随机种子(){h.value=new In.Noise(Math.random())},查看源码(){s("check-source")}});const m=I();return N(()=>{const d=m.value;d.width=t,d.height=e,i=d.getContext("2d",{willReadFrequently:!0});const c=W(window,"resize",he(()=>{t=~~(innerWidth/1),e=~~(innerHeight/1),d.width=t,d.height=e,o()},100));let f=fe(o);A(()=>{c(),f()})}),(d,c)=>(O(),M("canvas",{ref_key:"canvasRef",ref:m},null,512))}}),Xt="/demo/assets/imgs/display-CsCBxHWH.png",Yt={codes:[{name:"index.vue",code:Vt,lang:"js"}],component:qt,display:Xt,title:"随机噪声",descriptions:""},Kt=`<template>
  <canvas ref="canvasRef"></canvas>
  <el-input class="input" v-model="input" placeholder="请输入内容" size="large" @keyup.enter="onEnter"></el-input>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { rafLoop, randomBetween, registEvent } from '@thing772/utils'
import { TextParticle } from '@/lib/canvas/text-particle'
import { Particle } from '@/utils/class/particle'
import { reusableArray } from '@/utils/utils'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

const canvasRef = ref()
const input = ref('')

let textParticles: TextParticle
let particles = [] as Particle[]

let gap = 3, color = '#f00', alphaThreshold = 30, fontSize = 100
let r = 1, fx = 0.1, fy = 0.1, w = innerWidth, h = innerHeight
let getParticles = reusableArray(() => new Particle({
  r,
  x: randomBetween(0, w),
  y: randomBetween(0, h),
  fx: 0.1,
  fy: 0.1
}))

let text = "hello world"
//画粒子文字
function resolveText(text: string, setPos?: boolean) {
  //获取文字粒子的位置信息
  let config = textParticles.getParticles(text)

  //复用已有的粒子，调整粒子信息
  particles = getParticles(config.particles.length).map(particle => {
    particle.done = false
    if (setPos) {
      particle.x = randomBetween(0, w)
      particle.y = randomBetween(0, h)
    }
    return particle
  })
  particles.forEach((particle, index) => Object.assign(particle, config.particles[index]))

  return config.done
}

function onEnter() {
  if (!input.value) return
  text = input.value
  resolveText(text, true)
}

onMounted(() => {
  let canvas = canvasRef.value
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!

  Object.assign(canvas, {
    width: w,
    height: h
  })

  textParticles = new TextParticle({
    canvas,
    ctx,
    gap,
    alphaThreshold,
    color
  })

  useGui({
    调整文字颜色: {
      value: [color],
      isColor: true,
      onFinishChange(color: string) {
        textParticles.color = color
        resolveText(text, true)
      }
    },
    采样alpha过滤阈值: {
      value: [alphaThreshold, 0, 100, 1],
      onFinishChange(n: number) {
        textParticles.alphaThreshold = n
        resolveText(text, true)
      }
    },
    采样间隔调整: {
      value: [gap, 1, 20, 1],
      onFinishChange(n: number) {
        textParticles.gap = n
        resolveText(text, true)
      }
    },
    点大小调整: {
      value: [r, 1, 20, 1],
      onFinishChange(n: number) {
        r = n
        getParticles.update(particle => particle.r = n)
        resolveText(text, true)
      }
    },
    x方向缓动因子调整: {
      value: [fx, 0.01, 1, 0.01],
      onFinishChange(n: number) {
        fx = n
        getParticles.update(particle => particle.fx = n)
        resolveText(text, true)
      }
    },
    y方向缓动因子调整: {
      value: [fy, 0.01, 1, 0.01],
      onFinishChange(n: number) {
        fy = n
        getParticles.update(particle => particle.fy = n)
        resolveText(text, true)
      }
    },
    字体大小调整: {
      value: [fontSize, 50, 340, 10],
      onFinishChange(n: number) {
        fontSize = n
        textParticles.fontSize = n
        resolveText(text, true)
      }
    },
    查看源码() {
      emit("check-source")
    }
  })

  resolveText(text)

  const stop = rafLoop(() => {
    ctx.clearRect(0, 0, w, h)
    particles.forEach((particle) => {
      particle.render(ctx)
      particle.update()
    })
  })

  const uninstall = registEvent(window, 'resize', () => {
    w = innerWidth
    h = innerHeight
    canvas.width = w
    canvas.height = h
    textParticles.setSize({ width: w, height: h })
  })

  onUnmounted(() => {
    uninstall()
    stop()
  })
})


<\/script>

<style scoped>
.input {
  position: fixed;
  left: 50%;
  top: 20%;
  width: 500px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 5px #409EFF;
}
</style>
`;class Ut{constructor(n){C(this,"canvas");C(this,"ctx");C(this,"fontSize",200);C(this,"fontFamily","微软雅黑");C(this,"color","pink");C(this,"gap",3);C(this,"alphaThreshold",30);C(this,"w",0);C(this,"h",0);let{canvas:s,ctx:t,fontSize:e,fontFamily:i,color:u,gap:r,alphaThreshold:a}=n;this.canvas=s,this.ctx=t??s.getContext("2d"),e&&(this.fontSize=e),i&&(this.fontFamily=i),u&&(this.color=u),r!=null&&(this.gap=r),a!=null&&(this.alphaThreshold=a),this.w=s.width,this.h=s.height}setSize(n){this.w=n.width,this.h=n.height}_measureText(n){let{ctx:s,fontSize:t,fontFamily:e,color:i,w:u,h:r}=this;s.save(),Object.assign(s,{font:`${t}px ${e}`,fillStyle:i,textBaseline:"bottom"});let a=s.measureText(n),{width:h,actualBoundingBoxAscent:p,actualBoundingBoxDescent:o}=a,m=~~(Math.abs(p)+Math.abs(o));h=~~h,s.fillText(n,0,m);let d=s.getImageData(0,0,h,m).data;return s.clearRect(0,0,u,r),s.restore(),{data:d,width:h,height:m}}getParticles(n){let{data:s,width:t,height:e}=this._measureText(n),{gap:i,alphaThreshold:u,w:r,h:a}=this,h=[],p=[];for(let o=0;o<t;o+=i)for(let m=0;m<e;m+=i){let d=m*t+o,c=s[d*4+0],f=s[d*4+1],x=s[d*4+2],w=s[d*4+3];if(w<=u)continue;let{signal:v,resolve:_}=me();h.push(v);let y=pe({x:o,y:m},$n({x:t/2,y:e/2},{x:r/2,y:a/2}));p.push({tx:y.x,ty:y.y,color:ge(c,f,x,w),onDone:_})}return{particles:p,done:Promise.all(h)}}}const Qt=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=I(),e=I("");let i,u=[],r=3,a="#f00",h=30,p=100,o=1,m=.1,d=.1,c=innerWidth,f=innerHeight,x=wn(()=>new Ln({r:o,x:j(0,c),y:j(0,f),fx:.1,fy:.1})),w="hello world";function v(y,b){let S=i.getParticles(y);return u=x(S.particles.length).map(E=>(E.done=!1,b&&(E.x=j(0,c),E.y=j(0,f)),E)),u.forEach((E,B)=>Object.assign(E,S.particles[B])),S.done}function _(){e.value&&(w=e.value,v(w,!0))}return N(()=>{let y=t.value;const b=y.getContext("2d",{willReadFrequently:!0});Object.assign(y,{width:c,height:f}),i=new Ut({canvas:y,ctx:b,gap:r,alphaThreshold:h,color:a}),D({调整文字颜色:{value:[a],isColor:!0,onFinishChange(B){i.color=B,v(w,!0)}},采样alpha过滤阈值:{value:[h,0,100,1],onFinishChange(B){i.alphaThreshold=B,v(w,!0)}},采样间隔调整:{value:[r,1,20,1],onFinishChange(B){i.gap=B,v(w,!0)}},点大小调整:{value:[o,1,20,1],onFinishChange(B){o=B,x.update(g=>g.r=B),v(w,!0)}},x方向缓动因子调整:{value:[m,.01,1,.01],onFinishChange(B){m=B,x.update(g=>g.fx=B),v(w,!0)}},y方向缓动因子调整:{value:[d,.01,1,.01],onFinishChange(B){d=B,x.update(g=>g.fy=B),v(w,!0)}},字体大小调整:{value:[p,50,340,10],onFinishChange(B){p=B,i.fontSize=B,v(w,!0)}},查看源码(){s("check-source")}}),v(w);const S=Q(()=>{b.clearRect(0,0,c,f),u.forEach(B=>{B.render(b),B.update()})}),E=W(window,"resize",()=>{c=innerWidth,f=innerHeight,y.width=c,y.height=f,i.setSize({width:c,height:f})});A(()=>{E(),S()})}),(y,b)=>{const S=zn;return O(),M(U,null,[H("canvas",{ref_key:"canvasRef",ref:t},null,512),G(S,{class:"input",modelValue:Y(e),"onUpdate:modelValue":b[0]||(b[0]=E=>bn(e)?e.value=E:null),placeholder:"请输入内容",size:"large",onKeyup:Pn(_,["enter"])},null,8,["modelValue"])],64)}}}),Zt=q(Qt,[["__scopeId","data-v-0ead9cf7"]]),Jt=`import { getSignal, ptOffset, getMovePt, rgb } from '@thing772/utils'
import { Particle } from '@/utils/class/particle'

type CreateTextParticlesOptionis = {
  canvas: HTMLCanvasElement;
  ctx?: CanvasRenderingContext2D;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  gap?: number;
  alphaThreshold?: number;
}

export class TextParticle {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  fontSize = 200;
  fontFamily = "微软雅黑"
  color = "pink"
  gap = 3
  alphaThreshold = 30
  w = 0;//canvas宽度
  h = 0;//canvas高度

  constructor(options: CreateTextParticlesOptionis) {
    let {
      canvas,
      ctx,
      fontSize,
      fontFamily,
      color,
      gap,
      alphaThreshold,
    } = options

    this.canvas = canvas
    this.ctx = ctx ?? canvas.getContext('2d')!
    if (fontSize) this.fontSize = fontSize
    if (fontFamily) this.fontFamily = fontFamily
    if (color) this.color = color
    if (gap != undefined) this.gap = gap
    if (alphaThreshold != undefined) this.alphaThreshold = alphaThreshold
    this.w = canvas.width
    this.h = canvas.height
  }

  setSize(options: { width: number; height: number; }) {
    this.w = options.width
    this.h = options.height
  }

  _measureText(text: string) {
    let { ctx, fontSize, fontFamily, color, w, h } = this
    ctx.save();
    Object.assign(ctx, {
      font: \`\${fontSize}px \${fontFamily}\`,
      fillStyle: color,
      textBaseline: "bottom",//避免汉子底部部分被系统自动截了
    })

    let res = ctx.measureText(text);
    let { width, actualBoundingBoxAscent, actualBoundingBoxDescent } = res
    let height = ~~(
      Math.abs(actualBoundingBoxAscent) + Math.abs(actualBoundingBoxDescent)
    );
    width = ~~width;
    ctx.fillText(text, 0, height);
    let data = ctx.getImageData(0, 0, width, height).data;
    ctx.clearRect(0, 0, w, h)
    ctx.restore();
    return {
      data,
      width,
      height
    }
  }

  getParticles(text: string) {
    let { data, width, height } = this._measureText(text)
    let { gap, alphaThreshold, w, h } = this

    let signals = [] as Promise<any>[]
    let particles = [] as Partial<Particle>[]
    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        let index = y * width + x
        let r = data[index * 4 + 0]
        let g = data[index * 4 + 1]
        let b = data[index * 4 + 2]
        let a = data[index * 4 + 3]

        //过滤掉透明点
        if (a <= alphaThreshold) continue;

        let { signal, resolve, } = getSignal()
        signals.push(signal);

        //集体向canvas中心平移
        let t = getMovePt(
          { x, y },
          ptOffset({ x: width / 2, y: height / 2 }, { x: w / 2, y: h / 2 })
        )
        particles.push({ tx: t.x, ty: t.y, color: rgb(r, g, b, a), onDone: resolve })
      }
    }

    return {
      particles,
      done: Promise.all(signals)
    }
  }
}
`,na="/demo/assets/imgs/display-DOJbIvru.png",ea={codes:[{name:"index.vue",code:Kt,lang:"js"},{name:"textParticle.ts",code:Jt,lang:"ts"},{name:"particle.ts",code:Gn,lang:"ts"}],component:Zt,display:na,title:"文字粒子化",descriptions:""},ta=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, randomBetween, randomRgb } from '@thing772/utils'
import { ballsWanderInRect } from '@/lib/canvas/wander-balls'
import { Ball } from '@/utils/class/ball'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ballsNum = 100, r = 20, vx = 10, vy = 7

useGui({
  小球个数: {
    value: [ballsNum, 1, 1000, 10],
    onFinishChange(n: number) {
      ballsNum = n
      handle.setBallNum(n)
    }
  },
  小球半径上限: {
    value: [r, 4, 100, 1],
    onFinishChange(n: number) {
      r = n
      handle.updateBalls(ball => {
        ball.r = randomBetween(4, n)
      })
    }
  },
  小球x方向移动速度上限: {
    value: [vx, 1, 15, 0.5],
    onFinishChange(n: number) {
      vx = n
      handle.updateBalls(ball => {
        ball.vx = randomBetween(1, n)
      })
    }
  },
  小球y方向移动速度上限: {
    value: [vy, 1, 15, 0.5],
    onFinishChange(n: number) {
      vy = n
      handle.updateBalls(ball => {
        ball.vy = randomBetween(1, n)
      })
    }
  },
  开始() {
    if (stopAni) stopAni()
    stopAni = handle.start()
  },
  查看源码() {
    emit("check-source")
  }
})

let stopAni: ReturnType<typeof handle.start>

const canvasRef = ref()
let handle: ReturnType<typeof ballsWanderInRect>
onMounted(() => {
  let canvas = canvasRef.value
  let w = innerWidth
  let h = innerHeight

  Object.assign(canvas, {
    width: w,
    height: h
  })
  handle = ballsWanderInRect({
    canvas,
    ballsNum,
    createBallFac: () => new Ball({
      x: randomBetween(10, w - 10),
      y: randomBetween(10, h - 10),
      r: randomBetween(1, r),
      vx: randomBetween(1, vx),
      vy: randomBetween(1, vy),
      styleOptions: {
        fillStyle: randomRgb(),
      },
    })
  })

  const uninstall = registEvent(window, 'resize', () => {
    w = innerWidth
    h = innerHeight
    handle.setSize({
      width: w,
      height: h
    })
  }, { immediate: true })

  handle.render()

  onUnmounted(() => {
    uninstall()
    stopAni && stopAni()
  })
})
<\/script>
`,aa=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=100,e=20,i=10,u=7;D({小球个数:{value:[t,1,1e3,10],onFinishChange(p){t=p,h.setBallNum(p)}},小球半径上限:{value:[e,4,100,1],onFinishChange(p){e=p,h.updateBalls(o=>{o.r=j(4,p)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(p){i=p,h.updateBalls(o=>{o.vx=j(1,p)})}},小球y方向移动速度上限:{value:[u,1,15,.5],onFinishChange(p){u=p,h.updateBalls(o=>{o.vy=j(1,p)})}},开始(){r&&r(),r=h.start()},查看源码(){s("check-source")}});let r;const a=I();let h;return N(()=>{let p=a.value,o=innerWidth,m=innerHeight;Object.assign(p,{width:o,height:m}),h=Rn({canvas:p,ballsNum:t,createBallFac:()=>new K({x:j(10,o-10),y:j(10,m-10),r:j(1,e),vx:j(1,i),vy:j(1,u),styleOptions:{fillStyle:X()}})});const d=W(window,"resize",()=>{o=innerWidth,m=innerHeight,h.setSize({width:o,height:m})},{immediate:!0});h.render(),A(()=>{d(),r&&r()})}),(p,o)=>(O(),M("canvas",{ref_key:"canvasRef",ref:a},null,512))}}),ia="/demo/assets/imgs/display-BpUGJlnU.png",sa={codes:[{name:"index.vue",code:ta,lang:"js"},{name:"wander-balls.ts",code:Cn,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:aa,display:ia,title:"矩形区域内飘荡的小球",descriptions:""},la=`<template>
  <div class="container">
    <div class="el1">
      财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人，
      较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻）
    </div>
    <div :class="el2Class">
      财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。
    </div>
  </div>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
const emit = defineEmits<{
  (e: 'check-source'): void
}>()

const { obj } = useGui({
  "模糊自身": {
    value: [false],
    onChange(v: boolean) {
      blurSelf.value = v
    }
  },
  "模糊背景": {
    value: [false],
    onChange(v: boolean) {
      blurBackdrop.value = v
    }
  },
  查看源码() {
    emit('check-source')
  }
})

const blurSelf = ref(obj['模糊自身'])
const blurBackdrop = ref(obj['模糊背景'])
const el2Class = computed(() => ([
  "el2",
  {
    'blur-self': blurSelf.value,
    'blur-backdrop': blurBackdrop.value
  }
]))
<\/script>

<style scoped>
.el1,
.el2 {
  width: 300px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 22px;
}

.el1 {
  transform: translate(-50%, -50%);
  background-color: pink;
}

.el2 {
  transform: translate(-25%, -25%);
  background-color: #fff;

  &.blur-self {
    filter: blur(2px);
  }

  &.blur-backdrop {
    backdrop-filter: blur(2px);
    background-color: transparent;
    border: 1px solid #67C23A;
  }
}
</style>
`,ra={class:"container"},oa=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,{obj:t}=D({模糊自身:{value:[!1],onChange(r){e.value=r}},模糊背景:{value:[!1],onChange(r){i.value=r}},查看源码(){s("check-source")}}),e=I(t.模糊自身),i=I(t.模糊背景),u=yn(()=>["el2",{"blur-self":e.value,"blur-backdrop":i.value}]);return(r,a)=>(O(),M("div",ra,[a[0]||(a[0]=H("div",{class:"el1"}," 财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人， 较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻） ",-1)),H("div",{class:on(Y(u))}," 财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。 ",2)]))}}),ca=q(oa,[["__scopeId","data-v-bce03b61"]]),ua="/demo/assets/imgs/display-C7z4HTpE.png",da={codes:[{name:"index.vue",code:la,lang:"js"}],component:ca,display:ua,title:"css模糊效果",descriptions:""},ha=`<template>
  <div :class="ctClass">
    测试文本
    <div class="circle">
      测试文本2
    </div>
  </div>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let { obj } = useGui({
  "添加box-shadow": {
    value: [false],
    onChange(v: boolean) { boxShadowFlag.value = v }
  },
  "添加圆角": {
    value: [false],
    onChange(v: boolean) { roundFlag.value = v }
  },
  "添加filter:drop-shadow": {
    value: [false],
    onChange(v: boolean) { filterFlag.value = v }
  },
  "查看源码"() {
    emit("check-source")
  }
})

const boxShadowFlag = ref(obj['添加box-shadow'])
const roundFlag = ref(obj['添加圆角'])
const filterFlag = ref(obj['添加filter:drop-shadow'])
const ctClass = computed(() => ([
  'container',
  {
    'has-shadow-box': boxShadowFlag.value,
    'round-border': roundFlag.value,
    'filter': filterFlag.value
  }
]))
<\/script>
<style lang="scss" scoped>
.container {
  width: 500px;
  height: 300px;
  margin: 20px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(242.5, 208.5, 157.5);

  &.has-shadow-box {
    box-shadow: 10px 0 5px 10px #67C23A;
  }

  &.round-border {
    border-radius: 20px 120px;
  }

  &.filter {
    filter: drop-shadow(10px 0 5px #000000);
  }
}

.circle {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: circle(100px);
  background-color: pink;
}
</style>
`,fa=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let{obj:t}=D({"添加box-shadow":{value:[!1],onChange(a){e.value=a}},添加圆角:{value:[!1],onChange(a){i.value=a}},"添加filter:drop-shadow":{value:[!1],onChange(a){u.value=a}},查看源码(){s("check-source")}});const e=I(t["添加box-shadow"]),i=I(t.添加圆角),u=I(t["添加filter:drop-shadow"]),r=yn(()=>["container",{"has-shadow-box":e.value,"round-border":i.value,filter:u.value}]);return(a,h)=>(O(),M("div",{class:on(Y(r))},h[0]||(h[0]=[fn(" 测试文本 "),H("div",{class:"circle"}," 测试文本2 ",-1)]),2))}}),ma=q(fa,[["__scopeId","data-v-8a62668d"]]),pa="/demo/assets/imgs/display-CvX0ByRG.png",ga={codes:[{name:"index.vue",code:ha,lang:"js"}],component:ma,display:pa,title:"css box阴影效果",descriptions:""},va=`<template>
  <div class="box">
    <div ref="node"></div>
  </div>
</template>

<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
const emit = defineEmits<{
  (e: 'check-source'): void
}>()


import { vertBarChart } from '@/lib/d3/vertBarChar'
import { generateRandomIntArray } from '@/utils/utils'
import bubble from '@/lib/algorithm/sort/bubble'
import selection from '@/lib/algorithm/sort/selection'
import insertion from '@/lib/algorithm/sort/insertion'
import merge from '@/lib/algorithm/sort/merge'

const node = ref()
const algorithms = [
  {
    label: "冒泡排序",
    value: bubble
  },
  {
    label: "选择排序",
    value: selection
  },
  {
    label: "插入排序",
    value: insertion
  },
  {
    label: "归并排序",
    value: merge
  },
]

const initItem = algorithms[0]
const algorithm = ref(initItem.value)

let handle: ReturnType<typeof vertBarChart<Obj>> | null

interface Obj {
  id: number;
  value: number;
}

//排序算法生成器
type Generator = (arr: Obj[], selector: (obj: Obj) => number) => { next: Function }

let width = innerWidth - 100, height = innerHeight - 100
let sortDone = false
let count = 20

let arr = shallowRef<Obj[]>([]);//待排序数组
let it = shallowRef<ReturnType<Generator>>()//算法步骤迭代器

function getNumbers() {
  //生成30个，0-1000的正整数
  arr.value = generateRandomIntArray(count).map((n, index: number) => ({
    id: index,
    value: n
  }))

  sortDone = false
  it.value = algorithm.value(arr.value, (obj: Obj) => obj.value)
}

watch(algorithm, () => {
  it.value = algorithm.value(arr.value, (obj: Obj) => obj.value)
})

//下一步迭代
function next() {
  let { value, done } = it.value!.next()
  sortDone = done
  if (done) {
    ElMessage({
      showClose: true,
      message: '已经排序完毕',
      type: 'success',
      grouping: true,
    })
    return
  } else {
    arr.value = value
  }
}

let timer = ref(0)

//生成随机整数数组并开始迭代
function autoStart() {
  if (timer.value == 0) {
    //没有开始或者已经结束排序
    if (!it.value || sortDone) {
      getNumbers()
    }
    timer.value = setInterval(() => {
      if (sortDone) {
        clearInterval(timer.value)
        timer.value = 0
        return
      }
      next()
    }, interval)
  }
}

//数组更新，更新视图|或者清空画布
watch(() => arr.value, (arr) => {
  if (arr.length > 0) {
    //初始图表
    if (!handle) {
      handle = vertBarChart<Obj>({
        width,
        height,
        getX: (obj: Obj) => obj.id,
        getY: (obj: Obj) => obj.value
      })
      node.value.appendChild(handle!.svg)
    }

    //更新图表数据
    handle.update(arr)
  } else if (handle) {
    node.value.removeChild(handle.svg)
    handle = null
  }
})

let interval = 50

onMounted(() => {
  getNumbers()
  let { helpers: { getAllControllers } } = useGui({
    选择算法: {
      value: [initItem.label, algorithms.map(item => item.label)],
      onChange(name: string) {
        let item = algorithms.find(item => item.label == name)
        algorithm.value = item!.value
      }
    },
    "随机数个数": {
      value: [count, 10, 100, 1],
      onFinishChange(n: number) {
        count = n
      }
    },
    "自动开始时间间隔": {
      value: [interval, 16, 100, 5],
      onFinishChange(n: number) {
        interval = n
      }
    },
    生成随机数: {
      value: [function () {
        getNumbers()
      }],
      disable: timer.value != 0
    },

    排序下一步: {
      value: [function () {
        next()
      }],
      disable: !it.value || timer.value != 0
    },
    自动开始() {
      autoStart()
    },
    查看源码() {
      emit('check-source')
    }
  })

  let unwatch = watch(timer, (n) => {
    getAllControllers()!.forEach((ctl) => {
      if (ctl.property != '查看源码')
        ctl.disable(n > 0)
    })
  })

  onUnmounted(() => {
    unwatch()
    clearInterval(timer.value)
  })
})
<\/script>

<style scoped lang="scss">
.box {
  padding: 20px;
}
</style>
`;function xa(l){const{data:n=[],getX:s,getY:t,width:e=200,height:i=200,margin:u=[],color:r={},sortY:a=0,xAxis:h={},yAxis:p={},yLegend:o={},hideXTicks:m}=l,[d=60,c=0,f=30,x=30]=u;let w,v;const _=ve("svg").attr("width",e).attr("height",i).attr("viewBox",[0,0,e,i]).style("background-color",r.bg||""),y=_.append("g"),b=_.append("g").attr("transform",`translate(0,${i-f})`),S=_.append("g").attr("transform",`translate(${x},0)`),E=B=>{const g=F=>{if(w=be().range([x,e-c]),dn(l.xScale))for(let[k,z]of Object.entries(l.xScale))w[k](z);else w.padding(.2);a>0?w.domain(_e(F,([k])=>(a==1?1:-1)*t(k),s)):w.domain(F.map(s)),v=we().domain([0,Ce(F,t)]).range([i-f,d])},R=F=>{F.attr("x",0).attr("y",0).attr("width",w.bandwidth()).attr("height",k=>v(0)-v(t(k))).attr("fill",r.bar||"#409eff")},T=F=>{F.text(k=>k.value).attr("text-anchor","middle").attr("x",w.bandwidth()/2).attr("y",-4)};g(B),y.selectAll("g").data(B).join(F=>F.append("g").attr("transform",k=>`translate(${w(s(k))},${v(t(k))})`).call(k=>{R(k.append("rect")),T(k.append("text"))}),F=>(R(F.select("rect")),T(F.select("text")),F)).attr("transform",F=>`translate(${w(s(F))},${v(t(F))})`),b.call(F=>{let k=xe(w);k.tickSizeOuter(0);for(const[z,$]of Object.entries(h))k[z]($);k(F)}).call(F=>{m&&F.selectAll(".tick").remove()}),S.call(F=>{let k=ye(v);for(const[z,$]of Object.entries(p))k[z]($);k(F)}).call(F=>F.select(".domain").remove()).call(F=>{if(o.text){let k=F.append("text").attr("text-anchor","middle").attr("x",0).attr("y",20);for(const[z,$]of Object.entries(o))z=="text"?k[z]($):k.attr(z,$)}})};return E(n),{svg:_.node(),update:E}}function*ya(l,n){cn(n)||(n=vn),n=n;for(let s=1;s<l.length;s++)for(let t=0;t<l.length-s;t++)n(l[t])>n(l[t+1])&&(rn(l,t,t+1),yield[...l])}function*ba(l,n){cn(n)||(n=vn),n=n,l=[...l];for(let s=0;s<l.length-1;s++){let t=0;for(let e=0;e<l.length-s;e++)n(l[e])>n(l[t])&&(t=e);rn(l,t,l.length-s-1),yield[...l]}}function*_a(l,n){cn(n)||(n=vn),l=[...l],n=n;for(let s=0;s<l.length-1;s++)if(n(l[s])>n(l[s+1])){rn(l,s,s+1),yield[...l];let t=s;for(;t>0&&!(n(l[t])>=n(l[t-1]));)rn(l,t,t-1),yield[...l],t--}}function*wa(l,n){cn(n)||(n=vn);function*s(t,e){if(n=n,t==e)return;let i=Math.floor((t+e)/2);yield*s(t,i),yield*s(i+1,e);const u=r=>l=[...l.slice(0,t),...r,...l.slice(e+1)];if(!(n(l[i])<=n(l[i+1]))){if(n(l[e])<=n(l[t])){yield u([...l.slice(i+1,e+1),...l.slice(t,i+1)]);return}for(let r=1;i+r<=e;r++){let a=i+r;for(;a>t&&!(n(l[a])>=n(l[a-1]));)rn(l,a,a-1),a--,yield[...l]}}}yield*s(0,l.length-1)}const Ca={class:"box"},Ra=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=I(),e=[{label:"冒泡排序",value:ya},{label:"选择排序",value:ba},{label:"插入排序",value:_a},{label:"归并排序",value:wa}],i=e[0],u=I(i.value);let r,a=innerWidth-100,h=innerHeight-100,p=!1,o=20,m=ln([]),d=ln();function c(){m.value=Je(o).map((_,y)=>({id:y,value:_})),p=!1,d.value=u.value(m.value,_=>_.value)}V(u,()=>{d.value=u.value(m.value,_=>_.value)});function f(){let{value:_,done:y}=d.value.next();if(p=y,y){gn({showClose:!0,message:"已经排序完毕",type:"success",grouping:!0});return}else m.value=_}let x=I(0);function w(){x.value==0&&((!d.value||p)&&c(),x.value=setInterval(()=>{if(p){clearInterval(x.value),x.value=0;return}f()},v))}V(()=>m.value,_=>{_.length>0?(r||(r=xa({width:a,height:h,getX:y=>y.id,getY:y=>y.value}),t.value.appendChild(r.svg)),r.update(_)):r&&(t.value.removeChild(r.svg),r=null)});let v=50;return N(()=>{c();let{helpers:{getAllControllers:_}}=D({选择算法:{value:[i.label,e.map(b=>b.label)],onChange(b){let S=e.find(E=>E.label==b);u.value=S.value}},随机数个数:{value:[o,10,100,1],onFinishChange(b){o=b}},自动开始时间间隔:{value:[v,16,100,5],onFinishChange(b){v=b}},生成随机数:{value:[function(){c()}],disable:x.value!=0},排序下一步:{value:[function(){f()}],disable:!d.value||x.value!=0},自动开始(){w()},查看源码(){s("check-source")}}),y=V(x,b=>{_().forEach(S=>{S.property!="查看源码"&&S.disable(b>0)})});A(()=>{y(),clearInterval(x.value)})}),(_,y)=>(O(),M("div",Ca,[H("div",{ref_key:"node",ref:t},null,512)]))}}),Sa=q(Ra,[["__scopeId","data-v-698136a6"]]),Ba=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

/**
 * 根据传入数组，经过冒泡排序每个步骤后,
 * 传出最新数组直到排序完毕
 */
export default function* bubbleSort<D>(arr: D[], selector?: (item: D) => any) {
  if (!isFunc(selector)) {
    selector = identity
  }
  selector = selector!
  for (let k = 1; k < arr.length; k++) {
    for (let i = 0; i < arr.length - k; i++) {
      if (selector(arr[i]) > selector(arr[i + 1])) {
        swapArrayItem(arr, i, i + 1)
        yield [...arr]
      }
    }
  }
}
`,ka=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

/**
 * 根据传入数组，经过选择排序每个步骤后,
 * 传出最新数组直到排序完毕
 */
export default function* selectionSort<D>(arr: D[], selector?: (item: D) => any) {
  if (!isFunc(selector)) {
    selector = identity
  }
  selector = selector!
  arr = [...arr]
  for (let k = 0; k < arr.length - 1; k++) {
    let max = 0
    for (let i = 0; i < arr.length - k; i++) {
      if (selector(arr[i]) > selector(arr[max])) {
        max = i
      }
    }
    swapArrayItem(arr, max, arr.length - k - 1)
    yield [...arr]
  }
}
`,Ia=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


/**
 * 根据传入数组，经过插入排序每个步骤后,
 * 传出最新数组直到排序完毕
 */
export default function* insertSort<D>(arr: D[], selector?: (item: D) => any) {
  if (!isFunc(selector)) {
    selector = identity
  }
  arr = [...arr]
  selector = selector!
  for (let i = 0; i < arr.length - 1; i++) {
    if (
      selector(arr[i]) > selector(arr[i + 1])
    ) {
      swapArrayItem(arr, i, i + 1)
      yield [...arr]
      let k = i
      while (k > 0) {
        if (selector(arr[k]) >= selector(arr[k - 1])) {
          break
        }
        swapArrayItem(arr, k, k - 1)
        yield [...arr]
        k--
      }
    }
  }
}
`,Fa=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


// function mergeSort<D>(arr: D[], selector?: (item: D) => any) {
//   if (!isFunc(selector)) {
//     selector = identity
//   }
//   function merge(left, right) {
//     let len1 = left.length, len2 = right.length, ret = []
//     if (selector(left[left.length - 1]) <= selector(right[0])) {
//       ret = [...left, ...right]
//     } else if (selector(left[0]) >= selector(right[right.length - 1])) {
//       ret = [...right, ...left]
//     } else {
//       let i = 0, j = 0
//       while (i < len1 && j < len2) {
//         if (selector(left[i]) <= selector(right[j])) {
//           ret.push(left[i])
//           i++
//         } else {
//           ret.push(right[j])
//           j++
//         }
//       }
//       if (i < len1) {
//         ret.push(...left.slice(i))
//       } else if (j < len2) {
//         ret.push(...right.slice(j))
//       }
//     }
//     return ret
//   }
//   function split(arr) {
//     if (arr.length == 1) return arr
//     let len = arr.length, mid = Math.ceil(len / 2)
//     let left = arr.slice(0, mid), right = arr.slice(mid)
//     left = split(left)
//     right = split(right)
//     return merge(left, right)
//   }
//   return split([...arr])
// }

/**
 * 根据传入数组，经过归并排序每个步骤后,
 * 传出最新数组直到排序完毕
 */
export default function* mergeSort<D>(arr: D[], selector?: (item: D) => any) {
  if (!isFunc(selector)) {
    selector = identity
  }

  //完成区间的排序
  function* split(startIndex: number, endIndex: number): any {
    selector = selector!
    //1个元素时无需排序
    if (startIndex == endIndex) {
      return
    }

    let mid = Math.floor((startIndex + endIndex) / 2)
    yield* split(startIndex, mid) //排序好startIndex到mid区间
    yield* split(mid + 1, endIndex)//排序好mid+1到endIndex区间

    const updateInterval = (sub: D[]) => {
      return arr = [
        ...arr.slice(0, startIndex),
        ...sub,
        ...arr.slice(endIndex + 1)
      ]
    }

    //排序两个子区间

    //特殊情况
    if (selector(arr[mid]) <= selector(arr[mid + 1])) {
      return
    }

    if (selector(arr[endIndex]) <= selector(arr[startIndex])) {
      yield updateInterval([
        ...arr.slice(mid + 1, endIndex + 1),
        ...arr.slice(startIndex, mid + 1),
      ])
      return
    }

    //一般情况

    //method 1
    // {
    //   let left = arr.slice(startIndex, mid + 1),
    //     right = arr.slice(mid + 1, endIndex + 1),
    //     i = 0, j = 0, sub = []
    //   while (i < left.length && j < right.length) {
    //     if (selector(left[i]) <= selector(right[j])) {
    //       sub.push(left[i])
    //       i++
    //     } else {
    //       sub.push(right[j])
    //       j++
    //     }
    //   }

    //   if (i < left.length) {
    //     sub.push(...left.slice(i))
    //   } else if (j < right.length) {
    //     sub.push(...right.slice(j))
    //   }
    //   yield updateInterval(sub)
    // }

    //method2
    {
      for (let i = 1; mid + i <= endIndex; i++) {
        let k = mid + i
        while (k > startIndex) {
          if (selector(arr[k]) >= selector(arr[k - 1])) {
            break;
          }
          swapArrayItem(arr, k, k - 1)
          k--
          yield [...arr]
        }
      }
    }
  }
  yield* split(0, arr.length - 1)
}
`,ja="/demo/assets/imgs/display-B3luB7Uf.png",Ea={codes:[{name:"index.vue",code:va,lang:"js"},{name:"bubble.ts",code:Ba,lang:"ts"},{name:"selection.ts",code:ka,lang:"ts"},{name:"insertion.ts",code:Ia,lang:"ts"},{name:"merge.ts",code:Fa,lang:"ts"}],component:Sa,display:ja,title:"排序算法可视化",descriptions:""},Oa=`<template>
  <div class="box">
    <el-card class="demo-card" shadow="always">
      <div style="display:flex;">
        <div :class="['block', selectedIndex == index ? 'selected' : '']" v-for="(,index) in arr">{{ index }}</div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { drawPrice, DIRECTION } from '@/lib/draw-price.ts'
import { randIndex } from '@/utils/utils'
import useGui from '@/hooks/useLilGui'
const emit = defineEmits<{
  (e: 'check-source'): void
}>()

const selectedIndex = ref(1)
const arr = [...Array(10)]
const form = {
  targetIndex: 2,
  loopTimes: 2,
  direction: DIRECTION.NORMAL,
  speed: 5,
}

const { wander, stop, draw } = drawPrice(arr, {
  speed: form.speed,
  startIndex: selectedIndex.value,
  onProcessing: (index: number) => {
    selectedIndex.value = index
  },
  onDone(index: number) {
    ElMessage({
      showClose: true,
      message: '已经抽奖完毕',
      type: 'success',
      grouping: true,
    })
    selectedIndex.value = index
  }
})

function startWander() {
  wander({ ...form })
}

function startDraw() {
  draw({ ...form })
}

onUnmounted(() => {
  stop()
  if (timer) {
    clearTimeout(timer)
  }
})

let timer: number
function mock() {
  startWander()
  timer = setTimeout(() => {
    form.targetIndex = randIndex(arr)
    startDraw()
    timer = 0
  }, 2500)
}

useGui({
  设定巡航速度: {
    value: [form.speed, 1, 10, 1],
    onFinishChange(n: number) {
      form.speed = n
    }
  },
  设定最终选中项索引: {
    value: [form.targetIndex, 0, arr.length - 1, 1],
    onFinishChange(n: number) {
      form.targetIndex = n
    }
  },
  轮转次数: {
    value: [form.loopTimes, 2, 20, 1],
    onFinishChange(n: number) {
      form.loopTimes = n
    }
  },
  轮转方向: {
    value: [form.direction == DIRECTION.NORMAL ? '正向' : '负向', ["正向", "负向"]],
    onChange(n: string) {
      form.direction = n == '正向' ? DIRECTION.NORMAL : DIRECTION.REVERSE
    }
  },
  开始抽奖: startDraw,
  开始巡航: startWander,
  停止: stop,
  模拟接口返回预制数据: mock,
  查看源码() {
    emit('check-source')
  }
})

<\/script>
<style scoped lang="scss">
.box {
  padding: 20px;
}

.card {
  width: 480px;
  margin: 20px 0;
}

.block {
  width: 50px;
  height: 50px;
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E6E8EB;

  &.selected {
    color: #fff;
    background-color: #F56C6C;
  }
}
</style>
`,Ma=`import { easeOutCubic } from './ease'
import { isDef } from '@/utils/utils'

enum State {
  IDLE,
  WANDERING,
  DRAWING
}

export enum DIRECTION {
  NORMAL,
  REVERSE
}

type DrawPriceOptions = {
  startIndex?: number;
  speed: Speed;
  onDone: (current: number) => void;
  onProcessing: (current: number) => void;
}

export type Speed = number
/**
 * 抽奖函数
 */
export function drawPrice(arr: any[], options: DrawPriceOptions) {
  let {
    startIndex = 0,
    speed = 1,
    onDone,
    onProcessing,
  } = options

  let current = startIndex,
    raf: number,
    dt: number

  //计算更新间隔
  const updateDt = (speed: Speed) => {
    if (isDef(speed)) {
      dt = Math.ceil(800 / speed)
    }
  }

  const clearRaf = () => {
    if (raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  updateDt(speed)

  type WanderOptions = { direction: DIRECTION, speed: Speed, startIndex?: number }
  //巡游
  function wander(options: WanderOptions) {
    clearRaf()
    let { direction, speed, startIndex } = options, last: number
    updateDt(speed)
    if (isDef(startIndex)) { current = startIndex! }

    const loop = (time: number) => {
      if (!last) {
        last = time
      }
      let diff = time - last
      if (diff >= dt) {
        if (direction == DIRECTION.NORMAL) {
          current = (current + 1) % arr.length
        } else {
          current = current - 1 >= 0 ? current - 1 : arr.length - 1
        }
        onProcessing(current)
        last = time
      }
      raf = requestAnimationFrame(loop)
    }
    if (!raf) {
      raf = requestAnimationFrame(loop)
    }
  }

  function stop() {
    clearRaf()
  }

  type DrawOptions = { loopTimes: number, targetIndex: number, direction: DIRECTION, speed: Speed, startIndex?: number }
  //开始抽
  function draw(options: DrawOptions) {
    clearRaf()
    let {
      loopTimes = 5,
      targetIndex = arr.length - 1,
      direction,
      speed,
      startIndex
    } = options || {}
    loopTimes = Math.max(Math.ceil(Number(loopTimes)), 1) //循环次数 [1,]
    targetIndex = Math.max(0, Math.min(Number(targetIndex), arr.length - 1)) //最终抽奖落地项索引 [0,arr.length-1]

    updateDt(speed)

    if (isDef(startIndex)) { current = startIndex! }

    let from = current, to
    let diff = targetIndex - from
    if (direction == DIRECTION.NORMAL) {
      to = from + loopTimes * arr.length + (diff >= 0 ? diff : arr.length + diff)
    } else {
      to = from - loopTimes * arr.length + (diff <= 0 ? diff : (-arr.length + diff))
    }
    let duration = Math.abs(to - from) * dt
    let startTime: number
    const loop = (time: number) => {
      if (!startTime) {
        startTime = time
      }
      let rate = Math.min(1, (time - startTime) / duration)
      let v = Math.ceil(easeOutCubic(rate) * (to - from)) + from
      let i = v % arr.length

      //i<0表示反方向运动
      if (i < 0) {
        i += arr.length
      }

      if (current != i) {
        current = i
        onProcessing(current)
      }

      if (rate == 1) {
        onDone(current)
        raf = 0
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
  }

  return {
    wander,
    stop,
    draw
  }
}
`;function Ta(l){return 1-Math.pow(1-l,3)}var an=(l=>(l[l.NORMAL=0]="NORMAL",l[l.REVERSE=1]="REVERSE",l))(an||{});function Pa(l,n){let{startIndex:s=0,speed:t=1,onDone:e,onProcessing:i}=n,u=s,r,a;const h=c=>{dn(c)&&(a=Math.ceil(800/c))},p=()=>{r&&(cancelAnimationFrame(r),r=0)};h(t);function o(c){p();let{direction:f,speed:x,startIndex:w}=c,v;h(x),dn(w)&&(u=w);const _=y=>{v||(v=y),y-v>=a&&(f==0?u=(u+1)%l.length:u=u-1>=0?u-1:l.length-1,i(u),v=y),r=requestAnimationFrame(_)};r||(r=requestAnimationFrame(_))}function m(){p()}function d(c){p();let{loopTimes:f=5,targetIndex:x=l.length-1,direction:w,speed:v,startIndex:_}=c||{};f=Math.max(Math.ceil(Number(f)),1),x=Math.max(0,Math.min(Number(x),l.length-1)),h(v),dn(_)&&(u=_);let y=u,b,S=x-y;w==0?b=y+f*l.length+(S>=0?S:l.length+S):b=y-f*l.length+(S<=0?S:-l.length+S);let E=Math.abs(b-y)*a,B;const g=R=>{B||(B=R);let T=Math.min(1,(R-B)/E),k=(Math.ceil(Ta(T)*(b-y))+y)%l.length;if(k<0&&(k+=l.length),u!=k&&(u=k,i(u)),T==1){e(u),r=0;return}r=requestAnimationFrame(g)};r=requestAnimationFrame(g)}return{wander:o,stop:m,draw:d}}const za={class:"box"},$a={style:{display:"flex"}},Da=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=I(1),e=[...Array(10)],i={targetIndex:2,loopTimes:2,direction:an.NORMAL,speed:5},{wander:u,stop:r,draw:a}=Pa(e,{speed:i.speed,startIndex:t.value,onProcessing:d=>{t.value=d},onDone(d){gn({showClose:!0,message:"已经抽奖完毕",type:"success",grouping:!0}),t.value=d}});function h(){u({...i})}function p(){a({...i})}A(()=>{r(),o&&clearTimeout(o)});let o;function m(){h(),o=setTimeout(()=>{i.targetIndex=Nn(e),p(),o=0},2500)}return D({设定巡航速度:{value:[i.speed,1,10,1],onFinishChange(d){i.speed=d}},设定最终选中项索引:{value:[i.targetIndex,0,e.length-1,1],onFinishChange(d){i.targetIndex=d}},轮转次数:{value:[i.loopTimes,2,20,1],onFinishChange(d){i.loopTimes=d}},轮转方向:{value:[i.direction==an.NORMAL?"正向":"负向",["正向","负向"]],onChange(d){i.direction=d=="正向"?an.NORMAL:an.REVERSE}},开始抽奖:p,开始巡航:h,停止:r,模拟接口返回预制数据:m,查看源码(){s("check-source")}}),(d,c)=>{const f=Dn;return O(),M("div",za,[G(f,{class:"demo-card",shadow:"always"},{default:L(()=>[H("div",$a,[(O(),M(U,null,sn(e,(x,w)=>H("div",{class:on(["block",Y(t)==w?"selected":""])},hn(w),3)),64))])]),_:1})])}}}),Na=q(Da,[["__scopeId","data-v-2fa66777"]]),Aa="/demo/assets/imgs/display-DiF1Sfat.png",Wa={codes:[{name:"index.vue",code:Oa,lang:"js"},{name:"draw-price.ts",code:Ma,lang:"ts"}],component:Na,display:Aa,title:"抽奖",descriptions:""},La=`<template>
  <div class="container">
    <div class="hive-row" :class="index % 2 == 1 ? 'odd' : ''" v-for="(sub, index) in imgs" @mouseenter="enter"
      @mouseleave="leave">
      <img class="hive-item" :src="src" alt="" v-for="src in sub">
    </div>
  </div>
</template>
<script setup lang="ts">
import { arrayChunk } from '@/utils/utils'
import useGui from '@/hooks/useLilGui'
const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let imgs = [
  ...Object.values(
    import.meta.glob('@imgs/hive-effect/*', {
      eager: true,
      import: 'default',
    }))
] as any

let row = 5
imgs = ref(arrayChunk(imgs, Math.ceil(imgs.length / row)))

useGui({
  查看源码() {
    emit("check-source")
  }
})

//计算正六边形clip-path
// function calcClipPath(cellSize, sideSize) {
//   function percent(n) {
//     return \`\${Math.floor(100 * n)}%\`
//   }
//   let arr = []
//   for (let i = 0; i < 6; i++) {
//     let deg = Math.PI / 2 - (Math.PI / 3) * i
//     arr.push([
//       percent((sideSize * Math.cos(deg) + cellSize / 2) / cellSize),
//       percent((sideSize * Math.sin(deg) + cellSize / 2) / cellSize)
//     ])
//   }
//   return arr
// }

function enter(e: any) {
  e.target.classList.add('level-up')
}

function leave(e: any) {
  e.target.classList.remove('level-up')
}

<\/script>
<style lang="scss" scoped>
@use 'sass:math';

.container {
  width: 100%;
  padding-left: 200px;
  box-sizing: border-box;
}

$rotate: rotateY(0deg);

.hive-row {
  display: flex;
  $size: 160px;
  $sideSize: calc($size/2);
  $poly: "polygon(";

  @for $i from 0 to 6 {
    $deg: calc(math.$pi/2 - $i*math.$pi/3);
    $x: math.ceil(math.percentage(calc((math.cos($deg) * $sideSize + $size/2)/$size)));
    $y: math.ceil(math.percentage(calc((math.sin($deg) * $sideSize + $size/2)/$size)));
    $poly: $poly + "#{$x} #{$y}";

    @if $i==5 {
      $poly: $poly + ")";
    }

    @else {
      $poly: $poly + ",";
    }
  }

  &:not(:first-child) {
    margin-top: -$size*0.255;
  }

  &.odd {
    transform: translate(-0.432*$size, 0);
  }

  &.level-up {
    position: relative;
    z-index: 1;
  }

  position: relative;

  .hive-item {
    object-fit: cover;
    width: $size;
    height: $size;
    clip-path: #{$poly};
    background: transparent;
    transition: transform 0.1s;
    cursor: pointer;
    margin-left: - 2 * calc($size / 15);
    position: relative;

    &:hover {
      transform: scale(1.2);
      z-index: 1;
    }
  }
}
</style>
`,Ga="/demo/assets/imgs/018194d9aac11f975e17b274fe4a78af1463731957-BlWzWTpc.png",Ha="/demo/assets/imgs/10251358673700483-Bf69morh.jpg",Va="/demo/assets/imgs/10251358673922612-wa-5hia3.jpg",qa="/demo/assets/imgs/10251381214893821-DZ0tyfKl.jpg",Xa="/demo/assets/imgs/10251381215028477-DT0oxPDL.jpg",Ya="/demo/assets/imgs/10251381215091916-34MSuKPK.jpg",Ka="/demo/assets/imgs/10251381215152314-ZOViud5b.jpg",Ua="/demo/assets/imgs/10251381215208971-BnTSlzDn.jpg",Qa="/demo/assets/imgs/10251381215487222-CyoYfFWR.jpg",Za="/demo/assets/imgs/10251381215991717-jivRh7vw.jpg",Ja="/demo/assets/imgs/10251381216212847-C6d5iI8I.jpg",ni="/demo/assets/imgs/3a5950fc2408a7f8136de8704e1819c21463732075-DT6cAkAt.png",ei="/demo/assets/imgs/48d780d33eaf46a5646376b814b8efa71463731556-CGACL27Z.png",ti="/demo/assets/imgs/554e21161de34506e9cb1ecbcd85716d1463732343-LZH7KjnQ.png",ai="/demo/assets/imgs/884f9b653e317cc514890954b2e35be81463731323-DvATjqjX.png",ii="/demo/assets/imgs/8a116da0668edebd82af16ecf7e75ace1590566316-Cl-PTpZA.jpg",si="/demo/assets/imgs/928d6ec50975da022bda97a1ab8f04c81463731839-d_LHiOEG.png",li="/demo/assets/imgs/a748932756b48bd46a8fd17df4579dea1463732104-DlsyWN-A.png",ri="/demo/assets/imgs/b5978ead603dcdc66704e721960debe31590565987-4RsIwXgW.jpg",oi="/demo/assets/imgs/c06f07de280d4edebf801eef4b142c721463731804-DD1ps6p3.png",ci="/demo/assets/imgs/ceb8c078cf6b410d7def183870fe584d1590566557-9BfKn2sf.jpg",ui="/demo/assets/imgs/ea5871bc33e131b497b9bb273890e8ae1463731875-WWF6WmyZ.png",di="/demo/assets/imgs/f29af13446f1feed47dcfd299ccaa23c1463732001-DrhlCMaO.png",hi="/demo/assets/imgs/fef4eadd191c3461054ca60cde8576db1590566398-Bn18syhQ.jpg",fi={class:"container"},mi=["src"],pi=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=[...Object.values([Ga,Ha,Va,qa,Xa,Ya,Ka,Ua,Qa,Za,Ja,ni,ei,ti,ai,ii,si,li,ri,oi,ci,ui,di,hi])];t=I(nt(t,Math.ceil(t.length/5))),D({查看源码(){s("check-source")}});function i(r){r.target.classList.add("level-up")}function u(r){r.target.classList.remove("level-up")}return(r,a)=>(O(),M("div",fi,[(O(!0),M(U,null,sn(Y(t),(h,p)=>(O(),M("div",{class:on(["hive-row",p%2==1?"odd":""]),onMouseenter:i,onMouseleave:u},[(O(!0),M(U,null,sn(h,o=>(O(),M("img",{class:"hive-item",src:o,alt:""},null,8,mi))),256))],34))),256))]))}}),gi=q(pi,[["__scopeId","data-v-93867a89"]]),vi="/demo/assets/imgs/display-BVEemRNY.png",xi={codes:[{name:"index.vue",code:La,lang:"js"}],component:gi,display:vi,title:"蜂巢图片",descriptions:""},yi=`<template>
  <div class="box">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script setup lang="ts">
import { Scene } from '@/lib/canvas/scene'
import { TextRain } from '@/lib/canvas/textRain'
import useGui from '@/hooks/useLilGui'
import useResize from '@/hooks/useResize'

const canvas = ref()

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

onMounted(() => {
  let scene = new Scene({
    width: innerWidth,
    height: innerHeight,
    canvas: canvas.value
  })

  let { obj } = useGui({
    文字串数量: {
      value: [10, 10, 200, 10],
      onChange(v: number) {
        rain.maxNum = v
      }
    },
    查看代码: function () {
      emit('check-source')
    }
  })

  let rain = new TextRain({ scene, maxNum: obj['文字串数量'] })
  rain.start()

  useResize(window, () => {
    scene.setSize(innerWidth, innerHeight)
  })

  onUnmounted(() => {
    rain.stop()
  })
})
<\/script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
}

canvas {
  display: block;
}
</style>
`,bi=`import { isFunc } from '@/utils/utils'

type SceneOptions = {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  background?: string;
}

export type SceneInstance = InstanceType<typeof Scene>

export interface SceneObj {
  render: (delta: number) => void;
  scene?: SceneInstance | null
}


export class Scene {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number = 0
  height: number = 0
  background: string

  _t0: number = 0;//起始时间
  _t1: number = 0;//上次暂停时间
  _dt: number = 0;//一共运行多少时间（除去暂停）
  _objects: SceneObj[] = []

  _raf = 0

  setSize(width: number, height: number) {
    this.canvas.width = width
    this.canvas.height = height
    this.width = width
    this.height = height
  }

  constructor(options: SceneOptions) {
    let { width, height, canvas, background } = options
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.background = background ?? '#000'
    this.setSize(width, height)
  }

  _render() {
    let { width, height, ctx, background } = this
    ctx.fillStyle = background
    ctx.fillRect(0, 0, width, height)
    // let label = \`\${this._objects.length}个物体待渲染\`
    // console.time(label)

    //内部可能有剔除溢出物体的操作，for of循环+splice会导致删除时闪烁
    for (let obj of [...this._objects]) {
      obj.render(this._dt)
    }
    // console.timeEnd(label)
  }

  _updateTime(time: number) {
    if (this._t0 == 0) this._t0 = time
    this._dt = time - this._t0
  }

  run(cb?: (time: number) => void) {
    //过去的时间（ms）
    const loop = (time: number) => {
      this._updateTime(time)
      if (isFunc(cb)) cb!(this._dt)
      this._render()
      this._raf = requestAnimationFrame(loop)
    }
    this._raf = requestAnimationFrame(loop)
  }

  addObj(...objs: SceneObj[]) {
    objs.forEach(obj => {
      if (!this._objects.find(item => item == obj)) {
        this._objects.push(obj)
        obj.scene = this
      }
    })
    return this
  }

  removeObj(obj: SceneObj) {
    let index = this._objects.findIndex(item => item == obj)
    if (index != -1) {
      this._objects.splice(index, 1)
      if (obj.scene == this) { obj.scene = null }
    }
    return this
  }

  stop() {
    if (this._raf) {
      cancelAnimationFrame(this._raf)
      this._t0 = 0
      this._t1 = 0
      this._dt = 0
    }
  }
}
`,_i=`import type { SceneInstance, SceneObj } from "./scene"
import { randArr, randomInt } from "@/utils/utils"

const textPool = [...Array(26)].map((item, index) => {
  return ['a', 'A'].map(item => String.fromCharCode(item.charCodeAt(0) + index))
}).flat()

export function getText() {
  return [...Array(randomInt(8) + 2)].map(() => randArr(textPool)).join('')
}

export type TextOption = {
  text: string;
  x: number;
  y: number;
  opacity: number;
  /**
   * 不透明度衰减 [0-1], 0代表未衰减，1代表衰减完
   * number 表示每帧衰减数
   * (time: number)=>number 表示根据当前持续时间计算并返回衰减数
   */
  opacityDecay?: number | ((time: number) => number);
  yStep?: number | ((time: number) => number);
  onDismiss: (obj: SceneObj) => void
}

export class TextObj implements SceneObj {
  _x: number
  _y: number
  _text: string
  _opacity: number;
  _onDismiss: (self: TextObj) => void
  scene?: SceneInstance | null;
  _opacityDecay: TextOption['opacityDecay']
  _rawOptions: TextOption
  _yStep: TextOption['yStep']

  _font: string = "20px serif"
  _fillStyle: string = 'red'

  constructor(options: TextOption) {
    let { x, y, text, opacity, opacityDecay, onDismiss, yStep } = options
    this._x = x
    this._y = y
    this._text = text
    this._opacity = opacity
    this._onDismiss = onDismiss
    this._opacityDecay = opacityDecay ?? 0.01
    this._rawOptions = { ...options }
    this._yStep = yStep ?? 4
  }

  setFont(font: string, fillStyle: string) {
    this._font = font
    this._fillStyle = fillStyle
    return this
  }

  render(delta: number) {
    let { _text, _x, _y, _opacityDecay, _yStep, _fillStyle, _font } = this
    let { ctx, height } = this.scene!

    let old = {
      font: ctx.font,
      fillStyle: ctx.fillStyle,
      globalAlpha: ctx.globalAlpha
    }

    //绘制透明度
    this._opacity -= typeof _opacityDecay == 'number' ? _opacityDecay : _opacityDecay!(delta)
    if (this._opacity < 0) {
      this._opacity = 0
    }

    ctx.font = _font
    ctx.fillStyle = _fillStyle
    ctx.globalAlpha = this._opacity

    let offset = 0
    let y = _y + (typeof _yStep == 'number' ? _yStep : _yStep!(delta))

    for (let w of _text) {
      let metrix = ctx.measureText(w)
      const { actualBoundingBoxAscent, actualBoundingBoxDescent } = metrix
      //canvas字高度
      let height = actualBoundingBoxDescent + actualBoundingBoxAscent
      ctx.fillText(w, _x, y - offset)
      offset += height + 10
    }
    this._y = y

    Object.assign(ctx, old)

    //透明或者溢出
    if (this._opacity == 0 || y - offset > height) {
      this._onDismiss(this)
    }
  }
}

type TextRainOptions = {
  scene: SceneInstance;//scene实例
  maxNum?: number;//最大文字串数量
}
export class TextRain {
  scene: SceneInstance
  num = 0
  maxNum = 100
  colors = ['brown', 'red', 'green', 'yellow', "chocolate", 'pink', 'burlywood', 'chartreuse', 'cyan']

  constructor(options: TextRainOptions) {
    let { scene, maxNum } = options
    this.scene = scene
    if (maxNum)
      this.maxNum = maxNum
  }

  addText() {
    if (this.num < this.maxNum) {
      this.num++
      let { width, height } = this.scene
      let str = new TextObj({
        text: getText(),
        x: randomInt(width),
        y: randomInt(height),
        yStep: randomInt(10) + 2,
        opacity: +Math.min(1, Math.random() + 0.2).toPrecision(2),
        opacityDecay: 0.01,
        onDismiss: (obj) => {
          this.scene.removeObj(obj)
          this.num--
        }
      }).setFont(\`\${randomInt(15) + 14}px serif\`, randArr(this.colors))

      this.scene.addObj(str)
    }

  }

  start() {
    this.scene.run((delta: number) => {
      this.addText()
    })
  }

  stop() {
    this.scene.stop()
  }
}
`;class wi{constructor(n){C(this,"canvas");C(this,"ctx");C(this,"width",0);C(this,"height",0);C(this,"background");C(this,"_t0",0);C(this,"_t1",0);C(this,"_dt",0);C(this,"_objects",[]);C(this,"_raf",0);let{width:s,height:t,canvas:e,background:i}=n;this.canvas=e,this.ctx=e.getContext("2d"),this.background=i??"#000",this.setSize(s,t)}setSize(n,s){this.canvas.width=n,this.canvas.height=s,this.width=n,this.height=s}_render(){let{width:n,height:s,ctx:t,background:e}=this;t.fillStyle=e,t.fillRect(0,0,n,s);for(let i of[...this._objects])i.render(this._dt)}_updateTime(n){this._t0==0&&(this._t0=n),this._dt=n-this._t0}run(n){const s=t=>{this._updateTime(t),cn(n)&&n(this._dt),this._render(),this._raf=requestAnimationFrame(s)};this._raf=requestAnimationFrame(s)}addObj(...n){return n.forEach(s=>{this._objects.find(t=>t==s)||(this._objects.push(s),s.scene=this)}),this}removeObj(n){let s=this._objects.findIndex(t=>t==n);return s!=-1&&(this._objects.splice(s,1),n.scene==this&&(n.scene=null)),this}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._t0=0,this._t1=0,this._dt=0)}}const Ci=[...Array(26)].map((l,n)=>["a","A"].map(s=>String.fromCharCode(s.charCodeAt(0)+n))).flat();function Ri(){return[...Array(Z(8)+2)].map(()=>An(Ci)).join("")}class Si{constructor(n){C(this,"_x");C(this,"_y");C(this,"_text");C(this,"_opacity");C(this,"_onDismiss");C(this,"scene");C(this,"_opacityDecay");C(this,"_rawOptions");C(this,"_yStep");C(this,"_font","20px serif");C(this,"_fillStyle","red");let{x:s,y:t,text:e,opacity:i,opacityDecay:u,onDismiss:r,yStep:a}=n;this._x=s,this._y=t,this._text=e,this._opacity=i,this._onDismiss=r,this._opacityDecay=u??.01,this._rawOptions={...n},this._yStep=a??4}setFont(n,s){return this._font=n,this._fillStyle=s,this}render(n){let{_text:s,_x:t,_y:e,_opacityDecay:i,_yStep:u,_fillStyle:r,_font:a}=this,{ctx:h,height:p}=this.scene,o={font:h.font,fillStyle:h.fillStyle,globalAlpha:h.globalAlpha};this._opacity-=typeof i=="number"?i:i(n),this._opacity<0&&(this._opacity=0),h.font=a,h.fillStyle=r,h.globalAlpha=this._opacity;let m=0,d=e+(typeof u=="number"?u:u(n));for(let c of s){let f=h.measureText(c);const{actualBoundingBoxAscent:x,actualBoundingBoxDescent:w}=f;let v=w+x;h.fillText(c,t,d-m),m+=v+10}this._y=d,Object.assign(h,o),(this._opacity==0||d-m>p)&&this._onDismiss(this)}}class Bi{constructor(n){C(this,"scene");C(this,"num",0);C(this,"maxNum",100);C(this,"colors",["brown","red","green","yellow","chocolate","pink","burlywood","chartreuse","cyan"]);let{scene:s,maxNum:t}=n;this.scene=s,t&&(this.maxNum=t)}addText(){if(this.num<this.maxNum){this.num++;let{width:n,height:s}=this.scene,t=new Si({text:Ri(),x:Z(n),y:Z(s),yStep:Z(10)+2,opacity:+Math.min(1,Math.random()+.2).toPrecision(2),opacityDecay:.01,onDismiss:e=>{this.scene.removeObj(e),this.num--}}).setFont(`${Z(15)+14}px serif`,An(this.colors));this.scene.addObj(t)}}start(){this.scene.run(n=>{this.addText()})}stop(){this.scene.stop()}}function ki(l,n,s){l.addEventListener("resize",n),A(()=>{l.removeEventListener("resize",n)})}const Ii={class:"box"},Fi=P({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=I(),t=n;return N(()=>{let e=new wi({width:innerWidth,height:innerHeight,canvas:s.value}),{obj:i}=D({文字串数量:{value:[10,10,200,10],onChange(r){u.maxNum=r}},查看代码:function(){t("check-source")}}),u=new Bi({scene:e,maxNum:i.文字串数量});u.start(),ki(window,()=>{e.setSize(innerWidth,innerHeight)}),A(()=>{u.stop()})}),(e,i)=>(O(),M("div",Ii,[H("canvas",{ref_key:"canvas",ref:s},null,512)]))}}),ji=q(Fi,[["__scopeId","data-v-4010e3a7"]]),Ei="/demo/assets/imgs/display-DwV-CRAI.png",Oi={codes:[{name:"index.vue",code:yi,lang:"js"},{name:"scene.ts",code:bi,lang:"ts"},{name:"textRain.ts",code:_i,lang:"ts"}],component:ji,display:Ei,title:"文字雨",descriptions:""};let un;function Hn(){return un||(un=Object.assign({"./demo/canvas/audio-wave/config.ts":Qe,"./demo/canvas/bfs/config.ts":lt,"./demo/canvas/chasing/config.ts":ut,"./demo/canvas/connect-balls/config.ts":mt,"./demo/canvas/coord/config.ts":yt,"./demo/canvas/dfs/config.ts":St,"./demo/canvas/effect-1/config.ts":jt,"./demo/canvas/eyeballs/config.ts":Tt,"./demo/canvas/faliling-balls/config.ts":At,"./demo/canvas/friction/config.ts":Ht,"./demo/canvas/noise/config.ts":Yt,"./demo/canvas/text-particle/config.ts":ea,"./demo/canvas/wander-balls/config.ts":sa,"./demo/css/blur/config.ts":da,"./demo/css/shadow/config.ts":ga,"./demo/d3/sort/config.ts":Ea,"./demo/draw-price/config.ts":Wa,"./demo/hive/config.ts":xi,"./demo/text-rain/config.ts":Oi}),un)}let Vn=[];function Mi(){const l=Hn();for(let n in l){let{codes:s,component:t,title:e}=l[n],i=function(){return Fn(Le,{codes:s},({checkSource:a})=>Fn(t,{onCheckSource:()=>{a()}}))};i.displayName=`Demo(${n})`;let u=n.replace(/.*\/demo\//,"").replace("/config.ts","").split("/").join("-");l[n].routeName=u,Vn.push({path:u,name:u,component:i,meta:{title:e}})}}Mi();const Ti={path:"/demo",children:Vn},Pi={class:"common-layout"},zi=P({__name:"index",setup(l){let n=Object.values(Hn());return(s,t)=>{const e=ke,i=Ie,u=Dn,r=Be,a=Se,h=Re,p=Fe;return O(),M("div",Pi,[G(p,{class:"container"},{default:L(()=>[G(h,{class:"main"},{default:L(()=>[G(a,{class:"row",gutter:20},{default:L(()=>[(O(!0),M(U,null,sn(Y(n),o=>(O(),xn(r,{key:o.routeName,span:4},{default:L(()=>[G(u,{class:"demo-card","body-style":{padding:"0px"},shadow:"always",onClick:m=>s.$router.push({name:o.routeName})},{footer:L(()=>[G(i,{tag:"p"},{default:L(()=>[fn(hn(o.title),1)]),_:2},1024),G(i,{tag:"p","line-clamp":2},{default:L(()=>[fn(hn(o.descriptions||"暂无描述"),1)]),_:2},1024)]),default:L(()=>[G(e,{class:"image",src:o.display,fit:"cover"},null,8,["src"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}}}),$i=q(zi,[["__scopeId","data-v-fe2c6a64"]]),qn=je({history:Ee("/demo/"),routes:[{path:"/",component:$i},Ti]});qn.beforeEach((l,n,s)=>{document.title=l.meta.title??"my demos",s()});const Sn=Oe(ze);Sn.use(Me());Sn.use(qn);Sn.mount("#app");
