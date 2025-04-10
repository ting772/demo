var Xn=Object.defineProperty;var Yn=(o,n,s)=>n in o?Xn(o,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[n]=s;var C=(o,n,s)=>Yn(o,typeof n!="symbol"?n+"":n,s);import{r as Kn,c as yn,o as F,d as P,a as I,b as bn,e as N,P as Un,f as O,g as L,t as hn,n as rn,u as X,h as W,i as Qn,w as H,E as Zn,F as K,j as sn,k as Jn,l as ne,m as fn,p as gn,q as ee,s as Q,v as te,x as ae,y as A,z as G,A as ie,B as q,C as se,D as mn,G as ln,H as _n,I as Mn,J as Y,K as J,L as In,M as le,N as j,O as Pn,Q as zn,R as En,S as wn,T as Cn,U as vn,V as pn,W as oe,X as re,Y as $n,Z as ce,_ as ue,$ as de,a0 as jn,a1 as he,a2 as fe,a3 as me,a4 as pe,a5 as ge,a6 as ve,a7 as xe,a8 as ye,a9 as be,aa as _e,ab as we,ac as Ce,ad as Dn,ae as Tn,af as Re,ag as Se,ah as Be,ai as ke,aj as Ie,ak as Ee,al as je,am as Te,an as Fe,ao as Oe}from"./vendor-zplGuzII.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const V=(o,n)=>{const s=o.__vccOpts||o;for(const[t,e]of n)s[t]=e;return s},Me={};function Pe(o,n){const s=Kn("RouterView");return F(),yn(s)}const ze=V(Me,[["render",Pe]]),$e={class:"pre"},De=P({__name:"hilight",props:{code:{},lang:{}},setup(o){const n=o,s=I(),t=bn(()=>n.lang?`lang-${n.lang}`:"auto");return N(()=>{Un.highlightElement(s.value)}),(e,i)=>(F(),O("pre",$e,[L("code",{class:rn(X(t)),ref_key:"codeRef",ref:s},hn(e.code),3)]))}}),Ne={class:"container"},Ae={class:"dialog-footer"},We=P({__name:"codeDemo",props:{codes:{}},setup(o){const n=I(!1);function s(){n.value=!0}return(t,e)=>{const i=Jn,c=Zn,r=ne,a=ee;return F(),O(K,null,[L("div",Ne,[Qn(t.$slots,"default",{checkSource:s},void 0,!0)]),W(a,{modelValue:X(n),"onUpdate:modelValue":e[1]||(e[1]=f=>gn(n)?n.value=f:null),title:"",width:"50vw",top:"50px"},{footer:H(()=>[L("span",Ae,[W(r,{type:"primary",onClick:e[0]||(e[0]=f=>n.value=!1)},{default:H(()=>e[2]||(e[2]=[fn("关闭")])),_:1})])]),default:H(()=>[W(c,{type:"border-card"},{default:H(()=>[(F(!0),O(K,null,sn(t.codes,f=>(F(),yn(i,{label:f.name,key:f.name,lazy:""},{default:H(()=>[W(De,{code:f.code,lang:f.lang},null,8,["code","lang"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"])],64)}}}),Le=V(We,[["__scopeId","data-v-65455990"]]),Ge=`<template>
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
`;function Ve(o,n){const s=new AudioContext;let t=s.createMediaElementSource(o);const e=s.createAnalyser();t.connect(e),e.connect(s.destination),e.fftSize=512;const i=e.frequencyBinCount,c=new Uint8Array(i),r=n.getContext("2d");let a=n.width,f=n.height;function m(){e.getByteTimeDomainData(c),r.save(),Object.assign(r,{fillStyle:"red"});const d=a/i;for(let u=0;u<i;u+=4){let h=c[u]/255*f;r.fillRect(d*u,f-h,d,h)}r.fill(),r.restore()}function l(d,u){a=n.width=d,f=n.height=u}function p(){return Q(()=>{r.clearRect(0,0,a,f),m()})}return{setSize:l,start:p}}const qe="/demo/assets/media/%E5%8C%96%E5%87%A1-DF7X08YA.ogg";function D(o){if(!o.title){let s=te().meta.title;s&&(o.title=s)}let n=ae(o);return A(()=>{n.gui.destroy()}),n}const Xe=["src"],Ye=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;D({查看源码(){s("check-source")}});const t=I(),e=I();return N(()=>{let i;e.value.onplay=()=>{const{start:c,setSize:r}=Ve(e.value,t.value);i=G(window,"resize",()=>{r(innerWidth,innerHeight)},{immediate:!0}),c()},A(()=>{i&&i()})}),(i,c)=>(F(),O(K,null,[L("audio",{ref_key:"audioRef",ref:e,src:X(qe),id:"audio",controls:""},null,8,Xe),L("canvas",{ref_key:"canvasRef",ref:t},null,512)],64))}}),Ke=V(Ye,[["__scopeId","data-v-24237bd0"]]),Ue="/demo/assets/imgs/display-_9yby0tz.png",Qe={codes:[{name:"index.vue",code:Ge,lang:"js"},{name:"audio-wave",code:He,lang:"ts"}],component:Ke,display:Ue,title:"音频波形",descriptions:""},Ze=`<template>
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
`;function Nn(o){return Math.floor(Math.random()*o.length)}function An(o){return o[Nn(o)]}function Je(o,n=1e3){let s=[];for(let t=0;t<o;t++)s.push(Z(n));return s}function Z(o=1e3){return Math.ceil(Math.random()*o)}function nt(o,n){return o.reduce((s,t,e)=>(e%n==0&&s.push(o.slice(e,e+n)),s),[])}function on(o,n,s){let t=o[n];o[n]=o[s],o[s]=t}function dn(o){return o!=null}function cn(o){return typeof o=="function"}function xn(o){return o}function Rn(o){let n=[];function s(t){let e=t-n.length;return e>0?n.push(...ie(o,e)):e<0&&(n=n.slice(0,e)),n}return s.update=function(t){n.forEach(e=>t(e))},s}function nn(o,n){return~~(o/n)*n}function et(o,n,s){let{dx:t,dy:e}=n,i=Math.sqrt(t**2+e**2);return{x:o.x+t*s/i,y:o.y+e*s/i}}function*Fn(o,n,s,t){let e=[{...o}],i=[],c={...n},r={},a;const f=(l,p)=>{if(!(l>s||p>t||l<0||p<0))return{x:l,y:p}},m=l=>`${l.x}-${l.y}`;for(;e.length>0;){if(a&&(r[m(a)]=!0,i.push({...a})),a=e.shift(),delete r[m(a)],a.x==c.x&&a.y==c.y)return{current:a,visited:[...i],pending:[...e]};let l=f(a.x,a.y-1),p=f(a.x+1,a.y),d=f(a.x,a.y+1),u=f(a.x-1,a.y),h=[l,p,d,u].filter(Boolean);h=h.filter(v=>!r[m(v)]),h.length!=0&&(h.forEach(v=>{v.parent=a,r[m(v)]=!0}),e.push(...h),yield{current:a,visited:[...i],pending:[...e]})}}function tt(o,n,s,t){let e=[{...o}],i=[],c={...n},r={},a;const f=(l,p)=>{if(!(l>s||p>t||l<0||p<0))return{x:l,y:p}},m=l=>`${l.x}-${l.y}`;for(;e.length>0;){if(a&&(r[m(a)]=!0,i.push({...a})),a=e.shift(),delete r[m(a)],a.x==c.x&&a.y==c.y)return{current:a,visited:[...i],pending:[...e]};let l=f(a.x,a.y-1),p=f(a.x+1,a.y),d=f(a.x,a.y+1),u=f(a.x-1,a.y),h=[l,p,d,u].filter(Boolean);h=h.filter(v=>!r[m(v)]),h.length!=0&&(h.forEach(v=>{v.parent=a,r[m(v)]=!0}),e.push(...h))}}function Wn(){let o=I(0);return q(o,(n,s)=>{n==0&&s>0&&clearInterval(s)},{flush:"sync"}),se(()=>{o.value=0}),o}const at=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;let t,e,i,c,r,a,f;const m=I("#c5afbb"),l=I(30),p=I(),d=mn({x:20,y:10}),u=mn({x:0,y:0}),h=x=>{let R=p.value;i=nn(innerWidth,l.value),c=nn(innerHeight,l.value),R.width=i,R.height=c,t=i/l.value-1,e=c/l.value-1,x==null||x();let M=f.helpers.getControllerByKey,E={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:e,setValue:d.y},设置终点X:{max:t,setValue:u.x},设置终点Y:{max:e,setValue:u.y}};for(let k in E){let z=M(k),$=E[k];for(let tn in $)z[tn]($[tn])}};q([p,m],([x,R])=>{_n(x,{"background-color":R})}),q(l,()=>{y.value=0,h(),w()});const v=(x,R,M)=>{a.save(),Object.assign(a,M),a.fillRect(x*l.value,R*l.value,l.value,l.value),a.restore()},_=(x,R)=>{v(x,R,{fillStyle:"red"})},g=(x,R)=>{v(x,R,{fillStyle:"green"})},w=x=>{let R=p.value;a.clearRect(0,0,i,c),Mn({width:i,height:c,gridSize:l.value,canvas:R,ctx:a,lineWidth:1,gridLineColor:"#fff"}),typeof x=="function"&&x(),_(d.x,d.y),g(u.x,u.y)};q([d,u],()=>{w(),y.value=0,r=Fn(d,u,t,e)});let y=Wn();const b=ln();function S(x){let{current:R,pending:M,visited:E}=x;w(()=>{v(R.x,R.y,{fillStyle:"gold"}),M.forEach(k=>{const{x:z,y:$}=k;v(z,$,{fillStyle:"pink"})}),E.forEach(k=>{const{x:z,y:$}=k;v(z,$,{fillStyle:"black"})})})}function T(x){for(;x;)v(x.x,x.y,{fillStyle:"blue"}),x=x.parent;_(d.x,d.y),g(u.x,u.y)}q(b,x=>{let{value:R,done:M}=x;M&&!R||(S(R),M&&T(R.current))});const B=()=>{f=D({设置背景色:{value:[m.value],isColor:!0,onFinishChange(x){m.value=x}},网格大小设置:{value:[l.value,5,50,1],onFinishChange(x){l.value=x}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(x){d.x=x}},设置起始点Y:{value:[d.y,0,e,1],onFinishChange(x){d.y=x}},设置终点X:{value:[u.x,0,t,1],onFinishChange(x){u.x=x}},设置终点Y:{value:[u.y,0,e,1],onFinishChange(x){u.y=x}},自动bfs迭代(){r&&(y.value=0,y.value=setInterval(()=>{const x=r.next();b.value=x,x.done&&(y.value=0)},100))},bfs巡路(){console.time("bfs寻路耗时"),y.value=0;let x=tt(d,u,t,e);if(!x)throw Error("没有找到终点");console.timeEnd("bfs寻路耗时"),w(()=>{T(x.current)})},查看源码(){s("check-source")}})};return N(()=>{a=p.value.getContext("2d"),B(),h(()=>{Object.assign(u,{x:~~(t/2),y:~~(e/2)})}),r=Fn(d,u,t,e)}),(x,R)=>(F(),O("canvas",{ref_key:"canvasRef",ref:p},null,512))}}),it="/demo/assets/imgs/display-BFxeQr0P.png",st=`export type Index = { x: number; y: number }
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
`,lt={codes:[{name:"index.vue",code:Ze,lang:"js"},{name:"bfs.ts",code:st,lang:"ts"}],component:at,display:it,title:"canvas网格——广度优先搜索",descriptions:""},ot=`<template>
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
`;class U{constructor(n){C(this,"x",0);C(this,"y",0);C(this,"r",0);C(this,"vx",0);C(this,"vy",0);C(this,"ax",0);C(this,"ay",0);C(this,"styleOptions",{});n&&this.set(n)}reset(n){return Object.assign(this,{x:0,y:0,r:0,vx:0,vy:0,ax:0,ay:0,...n?{styleOptions:{}}:null})}set(n){return Object.assign(this,n)}update(){return this.vy+=this.ay,this.y+=this.vy,this.vx+=this.ax,this.x+=this.vx,this}render(n){n.save();let{x:s,y:t,r:e,styleOptions:i}=this;Object.assign(n,i),n.beginPath(),n.arc(s,t,e,0,Math.PI*2),i.fillStyle&&n.fill(),i.strokeStyle&&n.stroke(),n.restore()}}const rt=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;D({查看源码(){s("check-source")}});const t=I();return N(()=>{let e=t.value,i,c,r,a=e.getContext("2d");const f=G(window,"resize",()=>{Object.assign(e,{width:i=innerWidth,height:c=innerHeight})},{immediate:!0}),m=G(e,"mousemove",function(p){r={x:p.offsetX,y:p.offsetY}});let l=new U({r:100,x:i/2,y:c/2,styleOptions:{fillStyle:Y()}});Q(()=>{a.clearRect(0,0,i,c),r&&(l.x=J(l.x,r.x,.05),l.y=J(l.y,r.y,.05)),l.render(a)}),A(()=>{f(),m()})}),(e,i)=>(F(),O("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),ct="/demo/assets/imgs/display-IdleEMXt.png",ut={codes:[{name:"index.vue",code:ot,lang:"js"},{name:"ball.ts",code:en,lang:"ts"}],component:rt,display:ct,title:"缓动追逐",descriptions:""},dt=`<template>
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
`,Sn=`import { rafLoop, updateBallVelocityInRect, isFunc } from '@thing772/utils'
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
`;function Bn(o){let{canvas:n,ballsNum:s,createBallFac:t,onBallUpdate:e,speedDecay:i,preRender:c,postRender:r}=o,a=n.width,f=n.height;const m=n.getContext("2d");let l=[];const p=Rn(t);function d(y){l=p(y),h()}function u(y){Object.assign(n,y),a=y.width,f=y.height,h()}function h(y){l.forEach(b=>{In(y)&&y(b),b.render(m)})}function v(){m.clearRect(0,0,a,f);for(let y of l)In(e)?e(y):(y.update(),le(y,{wBox:[0,a],hBox:[0,f],speedDecay:i}));c==null||c(l,m),l.forEach(y=>y.render(m)),r==null||r(l,m)}function _(y){m.clearRect(0,0,a,f),h(y)}d(s);let g;function w(){return g&&g(),g=Q(()=>{v()})}return{start:w,setBallNum:d,setSize:u,render:v,updateBalls:_}}const ht=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;let t=80,e=1,i=3,c=3,r=100,a;D({小球个数:{value:[t,1,1e3,10],onFinishChange(d){t=d,l.setBallNum(d)}},小球半径上限:{value:[e,1,100,1],onFinishChange(d){e=d,l.updateBalls(u=>{u.r=j(1,d)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(d){i=d,l.updateBalls(u=>{u.vx=j(1,d)})}},小球y方向移动速度上限:{value:[c,1,15,.5],onFinishChange(d){c=d,l.updateBalls(u=>{u.vy=j(1,d)})}},小球连接范围阈值:{value:[r,50,300,1],onFinishChange(d){r=d}},查看源码(){s("check-source")}});let f;const m=I();let l,p;return N(()=>{let d=m.value,u=innerWidth,h=innerHeight;Object.assign(d,{width:u,height:h}),l=Bn({canvas:d,ballsNum:t,createBallFac:()=>new U({x:j(10,u-10),y:j(10,h-10),r:j(1,e),vx:j(1,i),vy:j(1,c),styleOptions:{fillStyle:Y()}}),preRender(g,w){a||(a=Pn(w,{strokeStyle:Y(),lineWidth:1})),p&&(g=g.concat(p));for(let y=0;y<g.length;y++)for(let b=y+1;b<g.length;b++){let S=g[y],T=g[b];zn(S,T)<r&&a(S,T)}p&&g.pop()}});const v=G(window,"resize",()=>{u=innerWidth,h=innerHeight,l.setSize({width:u,height:h})},{immediate:!0}),_=G(d,"mousemove",g=>{p={x:g.offsetX,y:g.offsetY}},{needLog:!0});f=l.start(),A(()=>{v(),_(),f&&f()})}),(d,u)=>(F(),O("canvas",{ref_key:"canvasRef",ref:m},null,512))}}),ft="/demo/assets/imgs/display-y86Fu395.png",mt={codes:[{name:"index.vue",code:dt,lang:"js"},{name:"wander-balls.ts",code:Sn,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:ht,display:ft,title:"粒子小球连线",descriptions:""},pt=`<template>
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
`,gt=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n,t=I();let e=innerWidth,i=innerHeight,c,r=(u,h)=>Math.sin(5*u+.001*h)+Math.cos(10*u+.005*h),a=I(""),f=r,m=300,l=1,p=Y();function d(){f=new Function("x","t",`return ${a.value}`);try{f(0,0)}catch(u){vn({showClose:!0,message:u.message,type:"error",grouping:!0})}}return N(()=>{let u=t.value;const h=u.getContext("2d");D({采样率设置:{value:[m,10,1e3,10],onFinishChange(g){m=g}},曲线粗细设置:{value:[l,1,10,1],onFinishChange(g){l=g}},曲线颜色设置:{value:[p],isColor:!0,onFinishChange(g){p=g}},查看源码(){s("check-source")}}),c=En({canvas:u,ctx:h,width:e,height:i});const v=Q(g=>{h.clearRect(0,0,e,i),c.setup(),c.draw(w=>{let y=0;try{y=f(w,g)}catch{}return y},{rate:m,style:{strokeStyle:p,lineWidth:l},label:{name:f.toString().replace(/ anonymous/,""),pos:{x:100,y:100}}})}),_=G(window,"resize",()=>{e=innerWidth,i=innerHeight,c=En({canvas:u,ctx:h,width:e,height:i})});A(()=>{_(),v()})}),(u,h)=>{const v=Cn;return F(),O(K,null,[L("canvas",{ref_key:"canvasRef",ref:t},null,512),W(v,{class:"input",modelValue:X(a),"onUpdate:modelValue":h[0]||(h[0]=_=>gn(a)?a.value=_:a=_),placeholder:"参数:（x:x坐标，t：时间参数），输入x和t的表达式",size:"large",onKeyup:wn(d,["enter"])},null,8,["modelValue"])],64)}}}),vt=V(gt,[["__scopeId","data-v-6125c1c8"]]),xt="/demo/assets/imgs/display-BsbAITaj.png",yt={codes:[{name:"index.vue",code:pt,lang:"js"}],component:vt,display:xt,title:"笛卡尔坐标系函数绘制",descriptions:""},bt=`<template>
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
`;function*On(o,n,s,t){let e=[{...o}],i=[],c={...n},r={},a;const f=u=>{r[d(u)]=!0,i.push({...u})},m=()=>{let u=e.shift();return delete r[d(u)],u},l=u=>{u.forEach(h=>{r[d(h)]=!0}),e.unshift(...u)},p=(u,h)=>{if(!(u>s||h>t||u<0||h<0))return{x:u,y:h}},d=u=>`${u.x}-${u.y}`;for(;e.length>0;){if(a&&f(a),a=m(),a.x==c.x&&a.y==c.y)return{current:a,visited:[...i],pending:[...e]};let u=p(a.x,a.y-1),h=p(a.x+1,a.y),v=p(a.x,a.y+1),_=p(a.x-1,a.y),g=[u,h,v,_].filter(Boolean);g=g.filter(w=>!r[d(w)]),g.forEach(w=>{w.parent=a}),g.length!=0&&(l(g),yield{current:a,visited:[...i],pending:[...e]})}}function _t(o,n,s,t){let e=[{...o}],i=[],c={...n},r={},a;const f=u=>{r[d(u)]=!0,i.push({...u})},m=()=>{let u=e.shift();return delete r[d(u)],u},l=u=>{u.forEach(h=>{r[d(h)]=!0}),e.unshift(...u)},p=(u,h)=>{if(!(u>s||h>t||u<0||h<0))return{x:u,y:h}},d=u=>`${u.x}-${u.y}`;for(;e.length>0;){if(a&&f(a),a=m(),a.x==c.x&&a.y==c.y)return{current:a,visited:[...i],pending:[...e]};let u=p(a.x,a.y-1),h=p(a.x+1,a.y),v=p(a.x,a.y+1),_=p(a.x-1,a.y),g=[u,h,v,_].filter(Boolean);g=g.filter(w=>!r[d(w)]),g.forEach(w=>{w.parent=a}),g.length!=0&&l(g)}}const wt=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;let t,e,i,c,r,a,f;const m=I("#c5afbb"),l=I(30),p=I(),d=mn({x:20,y:10}),u=mn({x:0,y:0}),h=x=>{let R=p.value;i=nn(innerWidth,l.value),c=nn(innerHeight,l.value),R.width=i,R.height=c,t=i/l.value-1,e=c/l.value-1,x==null||x();let M=f.helpers.getControllerByKey,E={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:e,setValue:d.y},设置终点X:{max:t,setValue:u.x},设置终点Y:{max:e,setValue:u.y}};for(let k in E){let z=M(k),$=E[k];for(let tn in $)z[tn]($[tn])}};q([p,m],([x,R])=>{_n(x,{"background-color":R})}),q(l,()=>{y.value=0,h(),w()});const v=(x,R,M)=>{a.save(),Object.assign(a,M),a.fillRect(x*l.value,R*l.value,l.value,l.value),a.restore()},_=(x,R)=>{v(x,R,{fillStyle:"red"})},g=(x,R)=>{v(x,R,{fillStyle:"green"})},w=x=>{let R=p.value;a.clearRect(0,0,i,c),Mn({width:i,height:c,gridSize:l.value,canvas:R,ctx:a,lineWidth:1,gridLineColor:"#fff"}),typeof x=="function"&&x(),_(d.x,d.y),g(u.x,u.y)};q([d,u],()=>{w(),y.value=0,r=On(d,u,t,e)});let y=Wn();const b=ln();function S(x){let{current:R,pending:M,visited:E}=x;w(()=>{v(R.x,R.y,{fillStyle:"gold"}),M.forEach(k=>{const{x:z,y:$}=k;v(z,$,{fillStyle:"pink"})}),E.forEach(k=>{const{x:z,y:$}=k;v(z,$,{fillStyle:"black"})})})}function T(x){for(;x;)v(x.x,x.y,{fillStyle:"blue"}),x=x.parent;_(d.x,d.y),g(u.x,u.y)}q(b,x=>{let{value:R,done:M}=x;M&&!R||(S(R),M&&T(R.current))});const B=()=>{f=D({设置背景色:{value:[m.value],isColor:!0,onFinishChange(x){m.value=x}},网格大小设置:{value:[l.value,5,50,1],onFinishChange(x){l.value=x}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(x){d.x=x}},设置起始点Y:{value:[d.y,0,e,1],onFinishChange(x){d.y=x}},设置终点X:{value:[u.x,0,t,1],onFinishChange(x){u.x=x}},设置终点Y:{value:[u.y,0,e,1],onFinishChange(x){u.y=x}},自动dfs迭代(){r&&(y.value=0,y.value=setInterval(()=>{const x=r.next();b.value=x,x.done&&(y.value=0)},100))},dfs巡路(){console.time("dfs寻路耗时"),y.value=0;let x=_t(d,u,t,e);if(!x)throw Error("没有找到终点");console.timeEnd("dfs寻路耗时"),w(()=>{T(x.current)})},查看源码(){s("check-source")}})};return N(()=>{a=p.value.getContext("2d"),B(),h(()=>{Object.assign(u,{x:~~(t/2),y:~~(e/2)})}),r=On(d,u,t,e)}),(x,R)=>(F(),O("canvas",{ref_key:"canvasRef",ref:p},null,512))}}),Ct="/demo/assets/imgs/display-BRS54xHs.png",Rt=`export type Index = { x: number; y: number }
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
`;class Ln{constructor(n){C(this,"x",0);C(this,"y",0);C(this,"tx",0);C(this,"ty",0);C(this,"color","pink");C(this,"name","");C(this,"fx",.01);C(this,"fy",.01);C(this,"onDone");C(this,"r",0);C(this,"size",0);C(this,"done",!1);Object.assign(this,n)}update(){var t;let{tx:n,ty:s}=this;if(!this.done)return this.x=J(this.x,n,this.fx),this.y=J(this.y,s,this.fy),pn(this.x,this.tx)&&pn(this.y,this.ty)&&(this.done=!0,(t=this.onDone)==null||t.call(this)),this}render(n){let{color:s,x:t,y:e,size:i,r:c}=this;n.save(),Object.assign(n,{fillStyle:s}),n.beginPath(),i>0?n.fillRect(t,e,i,i):c>0?n.arc(t,e,c,0,Math.PI*2):n.arc(t,e,2,0,Math.PI*2),n.fill(),n.restore()}}const kt=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;let t=20,e=30,i=10,c=20,r=0,a=0,f=25,m=25,l="#53e953",p=[],d,u=50;function h(){p=[];for(let b=0;b<t;b++)for(let S=0;S<e;S++){let T=-1*(e-1-S)*m+r/2+(e-1)*m/2,B=-1*(t-1-b)*f+a/2+(t-1)*f/2,x=new Ln({x:T,y:B,tx:T,ty:B,r:i,fx:j(.01,.5,!1),fy:j(.01,.5,!1),color:l});x.originPos={x:T,y:B},p.push(x)}}function v(b){p.forEach(S=>{Object.assign(S,b)})}D({球阵列行数:{value:[t,1,50,1],onFinishChange(b){t=b,h()}},球阵列列数:{value:[e,1,50,1],onFinishChange(b){e=b,h()}},球阵列列间距:{value:[m,6,50,2],onFinishChange(b){m=b,h()}},球阵列行间距:{value:[f,6,50,2],onFinishChange(b){f=b,h()}},影响半径:{value:[u,10,500,1],onFinishChange(b){u=b,h()}},小球半径:{value:[i,4,100,1],onFinishChange(b){i=b,v({r:i}),y()}},球颜色:{value:[l],isColor:!0,onFinishChange(b){l=b,v({color:b})}},查看源码(){s("check-source")}});const _=I(),g=()=>{r=nn(innerWidth,c),a=nn(innerHeight,c),Object.assign(_.value,{width:r,height:a})};let w;const y=()=>{if(w)for(let b of p){let{originPos:S}=b;if(re(w,u,S)){let T=u-zn(w,S),B=et(S,$n(w,S),T*(T/u));Object.assign(b,{tx:B.x,ty:B.y,done:!1})}else Object.assign(b,{tx:S.x,ty:S.y,done:!1})}};return N(()=>{let b=_.value;d=b.getContext("2d");const S=G(window,"resize",oe(()=>{g(),h()},100),{immediate:!0}),T=G(b,"mousemove",x=>{let{offsetX:R,offsetY:M}=x;w?(w.x=R,w.y=M):w={x:R,y:M},y()});_n(b,{"background-color":"#0d0d0d"}),h();const B=Q(()=>{d.clearRect(0,0,r,a);for(let x of p)x.update(),x.render(d)});A(()=>{S(),B(),T()})}),(b,S)=>(F(),O("canvas",{ref_key:"canvasRef",ref:_},null,512))}}),It=V(kt,[["__scopeId","data-v-872cfa4e"]]),Gn=`import { iterateEaseFromTo, looseEqual } from '@thing772/utils'

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
`,Et="/demo/assets/imgs/display-D8ZXnX54.png",jt={codes:[{name:"index.vue",code:Bt,lang:"js"},{name:"particle.ts",code:Gn,lang:"js"}],component:It,display:Et,title:"鼠标滑过小球堆的效果",descriptions:""},Tt=`<template>
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
`,Ft=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;D({查看源码(){s("check-source")}});const t=I();return N(()=>{let e=t.value,i,c,r,a=e.getContext("2d");const f=G(window,"resize",()=>{Object.assign(e,{width:i=innerWidth,height:c=innerHeight})},{immediate:!0}),m=G(e,"mousemove",function(v){r={x:v.offsetX,y:v.offsetY}});let l=[new U({r:50,x:i/2-80,y:c/2,styleOptions:{fillStyle:Y()}}),new U({r:50,x:i/2+80,y:c/2,styleOptions:{fillStyle:Y()}})],p=l.map(v=>new U({r:v.r/4,x:v.x,y:v.y,styleOptions:{fillStyle:Y()}})),d=new U({r:200,x:i/2,y:c/2,styleOptions:{fillStyle:"#E6A23C"}}),u=Pn(a,{strokeStyle:"#fff",lineWidth:"10",lineCap:"round"}),h=.05;Q(()=>{a.clearRect(0,0,i,c),d.render(a),l.forEach(v=>{v.render(a)}),p.forEach((v,_)=>{if(r){let g=v.x=J(v.x,r.x,h),w=v.y=J(v.y,r.y,h),y=l[_],b={x:y.x,y:y.y,r:y.r-10};if(!ce(b,v)){v.x=g,v.y=w;let S=ue(b,r);Object.assign(v,de(b,S,b.r-v.r))}}v.render(a)}),u({x:i/2-50,y:c/2+100},{x:i/2+50,y:c/2+100})}),A(()=>{f(),m()})}),(e,i)=>(F(),O("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),Ot="/demo/assets/imgs/display-BcjSOcDf.png",Mt={codes:[{name:"index.vue",code:Tt,lang:"js"},{name:"ball.ts",code:en,lang:"ts"}],component:Ft,display:Ot,title:"会动的眼球",descriptions:""},Pt=`<template>
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
`;function $t(o){let{canvas:n,num:s,onAllStopped:t}=o;const e=n.getContext("2d");let i=n.width,c=n.height,r=[],a=!1,f=!1;const m=Rn(()=>new U(l()));function l(){return{x:j(10,i-10),y:j(10,c-10),r:4,ax:0,ay:j(.1,2,!1),vx:0,vy:j(1,3),styleOptions:{fillStyle:Y()},stopped:!1}}function p(g){r=m(g)}function d(){for(let g of r)g.reset().set(l());if(f=!1,!a)return _()}function u(g){Object.assign(n,g),i=g.width,c=g.height}function h(g){return g.stopped||pn(g.vy,0,1)&&pn(g.y+g.r,c,1)}function v(){if(r.length!=0){e.clearRect(0,0,i,c);for(let g of r)if(g.update(),g.y+g.r>c&&(g.y=c-g.r,g.vy*=-.7),g.render(e),h(g)&&(g.stopped=!0,r.every(h))){a=!1,f=!0;try{t==null||t()}catch(w){console.error(w)}return!1}}}p(s);function _(){if(a)return;a=!0,f&&d();let g=Q(v);return()=>{a&&(a=!1,g())}}return{start:_,reset:d,setBallsNum:p,setSize:u,render:v}}const Dt=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;let t=100;const e=I(),{helpers:{getControllerByKey:i}}=D({小球个数:{value:[t,1,1e3,10],onFinishChange(f){t=f,r.setBallsNum(f)}},开始(){let f=r.start();f&&(e.value=f)},暂停:{value:[function(){e.value()}],disable:!e.value},重置(){let f=r.reset();f&&(e.value=f)},查看源码(){s("check-source")}});q(e,f=>{i("暂停").enable(!!f)});const c=I();let r;function a(){vn({showClose:!0,message:"所有小球都停止运动了",type:"success",grouping:!0})}return N(()=>{let f=c.value;Object.assign(f,{width:innerWidth,height:innerHeight}),r=$t({num:t,canvas:f,onAllStopped:a});const m=G(window,"resize",()=>{r.setSize({width:innerWidth,height:innerHeight})},{immediate:!0});r.render(),A(()=>{m(),e.value&&e.value()})}),(f,m)=>(F(),O("canvas",{ref_key:"canvasRef",ref:c},null,512))}}),Nt="/demo/assets/imgs/display-DOU4TeMC.png",At={codes:[{name:"index.vue",code:Pt,lang:"js"},{name:"falling-balls.ts",code:zt,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:Dt,display:Nt,title:"下落的小球",descriptions:""},Wt=`<template>
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
`,Lt=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;let t=100,e=20,i=20,c=17,r=.01;D({小球个数:{value:[t,1,1e3,10],onFinishChange(l){t=l,m.setBallNum(l)}},小球半径上限:{value:[e,4,100,1],onFinishChange(l){e=l,m.updateBalls(p=>{p.r=j(4,l)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(l){i=l,m.updateBalls(p=>{p.vx=j(1,l)})}},小球y方向移动速度上限:{value:[c,1,15,.5],onFinishChange(l){c=l,m.updateBalls(p=>{p.vy=j(1,l)})}},小球摩擦力因子:{value:[r,0,3,.1],onFinishChange(l){r=l,m.updateBalls(p=>{p.friction=j(0,l)})}},开始(){a&&a(),a=m.start()},查看源码(){s("check-source")}});let a;const f=I();let m;return N(()=>{let l=f.value,p,d;Object.assign(l,{width:p=innerWidth,height:d=innerHeight}),m=Bn({canvas:l,ballsNum:t,createBallFac:()=>{let h={x:j(10,p-10),y:j(10,d-10),r:j(1,e),vx:j(1,i),vy:j(1,c),styleOptions:{fillStyle:Y()},friction:j(0,r)};return new U(h)},onBallUpdate(h){h.vx>=.01&&(h.vx-=h.friction,h.x+=h.vx),h.vy>=.01&&(h.vy-=h.friction,h.y+=h.vy),h.x>p+h.r&&(h.x=-h.r),h.y>d+h.r&&(h.y=-h.r)}});const u=G(window,"resize",()=>{m.setSize({width:p=innerWidth,height:d=innerHeight})},{immediate:!0});A(()=>{u(),a&&a()})}),(l,p)=>(F(),O("canvas",{ref_key:"canvasRef",ref:f},null,512))}}),Gt="/demo/assets/imgs/display-BaZn1eIe.png",Ht={codes:[{name:"index.vue",code:Wt,lang:"js"},{name:"wander-balls.ts",code:Sn,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:Lt,display:Gt,title:"运动减速",descriptions:""},Vt=`<template>
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
`,qt=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;let t=innerWidth,e=innerHeight,i,c=I(.01),r=I(.01),a=I(1),f=ln(new jn.Noise(Math.random())),m=I("simplex2"),l=()=>{let d=i.getImageData(0,0,t,e);for(let u=0;u<t;u++)for(let h=0;h<e;h++){let v=~~Math.min(255,Math.abs(f.value[m.value](u*c.value,h*r.value))*a.value*256);d.data[(h*t+u)*4+0]=v,d.data[(h*t+u)*4+1]=v,d.data[(h*t+u)*4+2]=v,d.data[(h*t+u)*4+3]=255}i.putImageData(d,0,0)};D({噪声生成算法:{value:[m.value,["simplex2","perlin2"]],onFinishChange(d){m.value=d}},x方向缩放因子:{value:[c.value,.001,.5,.001],onFinishChange(d){c.value=d}},y方向缩放因子:{value:[r.value,.001,.5,.001],onFinishChange(d){r.value=d}},值放缩因子:{value:[a.value,.01,255,.1],onFinishChange(d){a.value=d}},重新生成随机种子(){f.value=new jn.Noise(Math.random())},查看源码(){s("check-source")}});const p=I();return N(()=>{const d=p.value;d.width=t,d.height=e,i=d.getContext("2d",{willReadFrequently:!0});const u=G(window,"resize",he(()=>{t=~~(innerWidth/1),e=~~(innerHeight/1),d.width=t,d.height=e,l()},100));let h=fe(l);A(()=>{u(),h()})}),(d,u)=>(F(),O("canvas",{ref_key:"canvasRef",ref:p},null,512))}}),Xt="/demo/assets/imgs/display-CsCBxHWH.png",Yt={codes:[{name:"index.vue",code:Vt,lang:"js"}],component:qt,display:Xt,title:"随机噪声",descriptions:""},Kt=`<template>
  <el-input class="input" v-model="text" placeholder="输入ICON中显示的字" size="large" @keyup.enter="onEnter"></el-input>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let bg = '#cbc262', color = '#fff', fontSize = 26
let radius = 10
let w = 64, h = 64
const canvasRef = ref()
let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D
let text = ref('')

function onEnter() {
  draw()
}

useGui({
  设置背景色: {
    value: [bg],
    isColor: true,
    onChange(n: string) {
      bg = n
      draw()
    }
  },
  设置文字颜色: {
    value: [color],
    isColor: true,
    onChange(n: string) {
      color = n
      draw()
    }
  },
  设置文字大小: {
    value: [fontSize, 14, 30, 1],
    onChange(n: number) {
      fontSize = n
      draw()
    }
  },
  设置尺寸: {
    value: [w, 32, 64, 1],
    onChange(n: number) {
      w = n
      h = n
      canvas.width = w
      canvas.height = h
      draw()
    }
  },
  设置圆角: {
    value: [radius, 0, 100, 1],
    onChange(n: number) {
      radius = n
      draw()
    }
  },
  图标下载() {
    if (canvas) download(canvas)
  },
  查看源码() {
    emit("check-source")
  }
})

function download(canvas: HTMLCanvasElement) {
  let url = canvas.toDataURL()
  let a = document.createElement('a')
  a.download = 'icon.png'
  document.body.appendChild(a)
  a.href = url
  a.click()
  document.body.removeChild(a)
}

function draw() {
  ctx.clearRect(0, 0, w, h)
  ctx.save()

  //换border-radius
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(canvas.width - radius, 0);
  ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
  ctx.lineTo(canvas.width, canvas.height - radius);
  ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
  ctx.lineTo(radius, canvas.height);
  ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();

  // 裁剪路径（这样之后的绘制只在这个路径内可见）
  ctx.clip();


  Object.assign(ctx, {
    fillStyle: bg,
  })
  ctx.fillRect(0, 0, w, h)

  Object.assign(ctx, {
    fillStyle: color,
    textAlign: 'center',
    textBaseline: 'middle',
    font: \`bold \${fontSize}px aria\`
  })
  ctx.fillText(text.value, w / 2, h / 2 + 2)
  ctx.restore()
}

onMounted(() => {
  canvas = canvasRef.value
  canvas.width = w
  canvas.height = h
  ctx = canvas.getContext('2d')!
  draw()
})

<\/script>
<style scoped>
canvas {
  position: absolute;
  top: 50%;
  left: 50%;
}

.input {
  position: fixed;
  left: 50%;
  top: 20%;
  width: 500px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 5px #409EFF;
}
</style>
`,Ut=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;let t="#cbc262",e="#fff",i=26,c=10,r=64,a=64;const f=I();let m,l,p=I("");function d(){h()}D({设置背景色:{value:[t],isColor:!0,onChange(v){t=v,h()}},设置文字颜色:{value:[e],isColor:!0,onChange(v){e=v,h()}},设置文字大小:{value:[i,14,30,1],onChange(v){i=v,h()}},设置尺寸:{value:[r,32,64,1],onChange(v){r=v,a=v,m.width=r,m.height=a,h()}},设置圆角:{value:[c,0,100,1],onChange(v){c=v,h()}},图标下载(){m&&u(m)},查看源码(){s("check-source")}});function u(v){let _=v.toDataURL(),g=document.createElement("a");g.download="icon.png",document.body.appendChild(g),g.href=_,g.click(),document.body.removeChild(g)}function h(){l.clearRect(0,0,r,a),l.save(),l.beginPath(),l.moveTo(c,0),l.lineTo(m.width-c,0),l.quadraticCurveTo(m.width,0,m.width,c),l.lineTo(m.width,m.height-c),l.quadraticCurveTo(m.width,m.height,m.width-c,m.height),l.lineTo(c,m.height),l.quadraticCurveTo(0,m.height,0,m.height-c),l.lineTo(0,c),l.quadraticCurveTo(0,0,c,0),l.closePath(),l.clip(),Object.assign(l,{fillStyle:t}),l.fillRect(0,0,r,a),Object.assign(l,{fillStyle:e,textAlign:"center",textBaseline:"middle",font:`bold ${i}px aria`}),l.fillText(p.value,r/2,a/2+2),l.restore()}return N(()=>{m=f.value,m.width=r,m.height=a,l=m.getContext("2d"),h()}),(v,_)=>{const g=Cn;return F(),O(K,null,[W(g,{class:"input",modelValue:X(p),"onUpdate:modelValue":_[0]||(_[0]=w=>gn(p)?p.value=w:p=w),placeholder:"输入ICON中显示的字",size:"large",onKeyup:wn(d,["enter"])},null,8,["modelValue"]),L("canvas",{ref_key:"canvasRef",ref:f},null,512)],64)}}}),Qt=V(Ut,[["__scopeId","data-v-0cc8cd8f"]]),Zt="/demo/assets/imgs/display-BFxeQr0P.png",Jt={codes:[{name:"index.vue",code:Kt,lang:"js"}],component:Qt,display:Zt,title:"简单文字图标生成",descriptions:""},na=`<template>
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
`;class ea{constructor(n){C(this,"canvas");C(this,"ctx");C(this,"fontSize",200);C(this,"fontFamily","微软雅黑");C(this,"color","pink");C(this,"gap",3);C(this,"alphaThreshold",30);C(this,"w",0);C(this,"h",0);let{canvas:s,ctx:t,fontSize:e,fontFamily:i,color:c,gap:r,alphaThreshold:a}=n;this.canvas=s,this.ctx=t??s.getContext("2d"),e&&(this.fontSize=e),i&&(this.fontFamily=i),c&&(this.color=c),r!=null&&(this.gap=r),a!=null&&(this.alphaThreshold=a),this.w=s.width,this.h=s.height}setSize(n){this.w=n.width,this.h=n.height}_measureText(n){let{ctx:s,fontSize:t,fontFamily:e,color:i,w:c,h:r}=this;s.save(),Object.assign(s,{font:`${t}px ${e}`,fillStyle:i,textBaseline:"bottom"});let a=s.measureText(n),{width:f,actualBoundingBoxAscent:m,actualBoundingBoxDescent:l}=a,p=~~(Math.abs(m)+Math.abs(l));f=~~f,s.fillText(n,0,p);let d=s.getImageData(0,0,f,p).data;return s.clearRect(0,0,c,r),s.restore(),{data:d,width:f,height:p}}getParticles(n){let{data:s,width:t,height:e}=this._measureText(n),{gap:i,alphaThreshold:c,w:r,h:a}=this,f=[],m=[];for(let l=0;l<t;l+=i)for(let p=0;p<e;p+=i){let d=p*t+l,u=s[d*4+0],h=s[d*4+1],v=s[d*4+2],_=s[d*4+3];if(_<=c)continue;let{signal:g,resolve:w}=me();f.push(g);let y=pe({x:l,y:p},$n({x:t/2,y:e/2},{x:r/2,y:a/2}));m.push({tx:y.x,ty:y.y,color:ge(u,h,v,_),onDone:w})}return{particles:m,done:Promise.all(f)}}}const ta=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n,t=I(),e=I("");let i,c=[],r=3,a="#f00",f=30,m=100,l=1,p=.1,d=.1,u=innerWidth,h=innerHeight,v=Rn(()=>new Ln({r:l,x:j(0,u),y:j(0,h),fx:.1,fy:.1})),_="hello world";function g(y,b){let S=i.getParticles(y);return c=v(S.particles.length).map(T=>(T.done=!1,b&&(T.x=j(0,u),T.y=j(0,h)),T)),c.forEach((T,B)=>Object.assign(T,S.particles[B])),S.done}function w(){e.value&&(_=e.value,g(_,!0))}return N(()=>{let y=t.value;const b=y.getContext("2d",{willReadFrequently:!0});Object.assign(y,{width:u,height:h}),i=new ea({canvas:y,ctx:b,gap:r,alphaThreshold:f,color:a}),D({调整文字颜色:{value:[a],isColor:!0,onFinishChange(B){i.color=B,g(_,!0)}},采样alpha过滤阈值:{value:[f,0,100,1],onFinishChange(B){i.alphaThreshold=B,g(_,!0)}},采样间隔调整:{value:[r,1,20,1],onFinishChange(B){i.gap=B,g(_,!0)}},点大小调整:{value:[l,1,20,1],onFinishChange(B){l=B,v.update(x=>x.r=B),g(_,!0)}},x方向缓动因子调整:{value:[p,.01,1,.01],onFinishChange(B){p=B,v.update(x=>x.fx=B),g(_,!0)}},y方向缓动因子调整:{value:[d,.01,1,.01],onFinishChange(B){d=B,v.update(x=>x.fy=B),g(_,!0)}},字体大小调整:{value:[m,50,340,10],onFinishChange(B){m=B,i.fontSize=B,g(_,!0)}},查看源码(){s("check-source")}}),g(_);const S=Q(()=>{b.clearRect(0,0,u,h),c.forEach(B=>{B.render(b),B.update()})}),T=G(window,"resize",()=>{u=innerWidth,h=innerHeight,y.width=u,y.height=h,i.setSize({width:u,height:h})});A(()=>{T(),S()})}),(y,b)=>{const S=Cn;return F(),O(K,null,[L("canvas",{ref_key:"canvasRef",ref:t},null,512),W(S,{class:"input",modelValue:X(e),"onUpdate:modelValue":b[0]||(b[0]=T=>gn(e)?e.value=T:null),placeholder:"请输入内容",size:"large",onKeyup:wn(w,["enter"])},null,8,["modelValue"])],64)}}}),aa=V(ta,[["__scopeId","data-v-0ead9cf7"]]),ia=`import { getSignal, ptOffset, getMovePt, rgb } from '@thing772/utils'
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
`,sa="/demo/assets/imgs/display-DOJbIvru.png",la={codes:[{name:"index.vue",code:na,lang:"js"},{name:"textParticle.ts",code:ia,lang:"ts"},{name:"particle.ts",code:Gn,lang:"ts"}],component:aa,display:sa,title:"文字粒子化",descriptions:""},oa=`<template>
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
`,ra=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;let t=100,e=20,i=10,c=7;D({小球个数:{value:[t,1,1e3,10],onFinishChange(m){t=m,f.setBallNum(m)}},小球半径上限:{value:[e,4,100,1],onFinishChange(m){e=m,f.updateBalls(l=>{l.r=j(4,m)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(m){i=m,f.updateBalls(l=>{l.vx=j(1,m)})}},小球y方向移动速度上限:{value:[c,1,15,.5],onFinishChange(m){c=m,f.updateBalls(l=>{l.vy=j(1,m)})}},开始(){r&&r(),r=f.start()},查看源码(){s("check-source")}});let r;const a=I();let f;return N(()=>{let m=a.value,l=innerWidth,p=innerHeight;Object.assign(m,{width:l,height:p}),f=Bn({canvas:m,ballsNum:t,createBallFac:()=>new U({x:j(10,l-10),y:j(10,p-10),r:j(1,e),vx:j(1,i),vy:j(1,c),styleOptions:{fillStyle:Y()}})});const d=G(window,"resize",()=>{l=innerWidth,p=innerHeight,f.setSize({width:l,height:p})},{immediate:!0});f.render(),A(()=>{d(),r&&r()})}),(m,l)=>(F(),O("canvas",{ref_key:"canvasRef",ref:a},null,512))}}),ca="/demo/assets/imgs/display-BpUGJlnU.png",ua={codes:[{name:"index.vue",code:oa,lang:"js"},{name:"wander-balls.ts",code:Sn,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:ra,display:ca,title:"矩形区域内飘荡的小球",descriptions:""},da=`<template>
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
`,ha={class:"container"},fa=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n,{obj:t}=D({模糊自身:{value:[!1],onChange(r){e.value=r}},模糊背景:{value:[!1],onChange(r){i.value=r}},查看源码(){s("check-source")}}),e=I(t.模糊自身),i=I(t.模糊背景),c=bn(()=>["el2",{"blur-self":e.value,"blur-backdrop":i.value}]);return(r,a)=>(F(),O("div",ha,[a[0]||(a[0]=L("div",{class:"el1"}," 财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人， 较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻） ",-1)),L("div",{class:rn(X(c))}," 财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。 ",2)]))}}),ma=V(fa,[["__scopeId","data-v-bce03b61"]]),pa="/demo/assets/imgs/display-C7z4HTpE.png",ga={codes:[{name:"index.vue",code:da,lang:"js"}],component:ma,display:pa,title:"css模糊效果",descriptions:""},va=`<template>
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
`,xa=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;let{obj:t}=D({"添加box-shadow":{value:[!1],onChange(a){e.value=a}},添加圆角:{value:[!1],onChange(a){i.value=a}},"添加filter:drop-shadow":{value:[!1],onChange(a){c.value=a}},查看源码(){s("check-source")}});const e=I(t["添加box-shadow"]),i=I(t.添加圆角),c=I(t["添加filter:drop-shadow"]),r=bn(()=>["container",{"has-shadow-box":e.value,"round-border":i.value,filter:c.value}]);return(a,f)=>(F(),O("div",{class:rn(X(r))},f[0]||(f[0]=[fn(" 测试文本 "),L("div",{class:"circle"}," 测试文本2 ",-1)]),2))}}),ya=V(xa,[["__scopeId","data-v-8a62668d"]]),ba="/demo/assets/imgs/display-CvX0ByRG.png",_a={codes:[{name:"index.vue",code:va,lang:"js"}],component:ya,display:ba,title:"css box阴影效果",descriptions:""},wa=`<template>
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
`;function Ca(o){const{data:n=[],getX:s,getY:t,width:e=200,height:i=200,margin:c=[],color:r={},sortY:a=0,xAxis:f={},yAxis:m={},yLegend:l={},hideXTicks:p}=o,[d=60,u=0,h=30,v=30]=c;let _,g;const w=ve("svg").attr("width",e).attr("height",i).attr("viewBox",[0,0,e,i]).style("background-color",r.bg||""),y=w.append("g"),b=w.append("g").attr("transform",`translate(0,${i-h})`),S=w.append("g").attr("transform",`translate(${v},0)`),T=B=>{const x=E=>{if(_=be().range([v,e-u]),dn(o.xScale))for(let[k,z]of Object.entries(o.xScale))_[k](z);else _.padding(.2);a>0?_.domain(_e(E,([k])=>(a==1?1:-1)*t(k),s)):_.domain(E.map(s)),g=we().domain([0,Ce(E,t)]).range([i-h,d])},R=E=>{E.attr("x",0).attr("y",0).attr("width",_.bandwidth()).attr("height",k=>g(0)-g(t(k))).attr("fill",r.bar||"#409eff")},M=E=>{E.text(k=>k.value).attr("text-anchor","middle").attr("x",_.bandwidth()/2).attr("y",-4)};x(B),y.selectAll("g").data(B).join(E=>E.append("g").attr("transform",k=>`translate(${_(s(k))},${g(t(k))})`).call(k=>{R(k.append("rect")),M(k.append("text"))}),E=>(R(E.select("rect")),M(E.select("text")),E)).attr("transform",E=>`translate(${_(s(E))},${g(t(E))})`),b.call(E=>{let k=xe(_);k.tickSizeOuter(0);for(const[z,$]of Object.entries(f))k[z]($);k(E)}).call(E=>{p&&E.selectAll(".tick").remove()}),S.call(E=>{let k=ye(g);for(const[z,$]of Object.entries(m))k[z]($);k(E)}).call(E=>E.select(".domain").remove()).call(E=>{if(l.text){let k=E.append("text").attr("text-anchor","middle").attr("x",0).attr("y",20);for(const[z,$]of Object.entries(l))z=="text"?k[z]($):k.attr(z,$)}})};return T(n),{svg:w.node(),update:T}}function*Ra(o,n){cn(n)||(n=xn),n=n;for(let s=1;s<o.length;s++)for(let t=0;t<o.length-s;t++)n(o[t])>n(o[t+1])&&(on(o,t,t+1),yield[...o])}function*Sa(o,n){cn(n)||(n=xn),n=n,o=[...o];for(let s=0;s<o.length-1;s++){let t=0;for(let e=0;e<o.length-s;e++)n(o[e])>n(o[t])&&(t=e);on(o,t,o.length-s-1),yield[...o]}}function*Ba(o,n){cn(n)||(n=xn),o=[...o],n=n;for(let s=0;s<o.length-1;s++)if(n(o[s])>n(o[s+1])){on(o,s,s+1),yield[...o];let t=s;for(;t>0&&!(n(o[t])>=n(o[t-1]));)on(o,t,t-1),yield[...o],t--}}function*ka(o,n){cn(n)||(n=xn);function*s(t,e){if(n=n,t==e)return;let i=Math.floor((t+e)/2);yield*s(t,i),yield*s(i+1,e);const c=r=>o=[...o.slice(0,t),...r,...o.slice(e+1)];if(!(n(o[i])<=n(o[i+1]))){if(n(o[e])<=n(o[t])){yield c([...o.slice(i+1,e+1),...o.slice(t,i+1)]);return}for(let r=1;i+r<=e;r++){let a=i+r;for(;a>t&&!(n(o[a])>=n(o[a-1]));)on(o,a,a-1),a--,yield[...o]}}}yield*s(0,o.length-1)}const Ia={class:"box"},Ea=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n,t=I(),e=[{label:"冒泡排序",value:Ra},{label:"选择排序",value:Sa},{label:"插入排序",value:Ba},{label:"归并排序",value:ka}],i=e[0],c=I(i.value);let r,a=innerWidth-100,f=innerHeight-100,m=!1,l=20,p=ln([]),d=ln();function u(){p.value=Je(l).map((w,y)=>({id:y,value:w})),m=!1,d.value=c.value(p.value,w=>w.value)}q(c,()=>{d.value=c.value(p.value,w=>w.value)});function h(){let{value:w,done:y}=d.value.next();if(m=y,y){vn({showClose:!0,message:"已经排序完毕",type:"success",grouping:!0});return}else p.value=w}let v=I(0);function _(){v.value==0&&((!d.value||m)&&u(),v.value=setInterval(()=>{if(m){clearInterval(v.value),v.value=0;return}h()},g))}q(()=>p.value,w=>{w.length>0?(r||(r=Ca({width:a,height:f,getX:y=>y.id,getY:y=>y.value}),t.value.appendChild(r.svg)),r.update(w)):r&&(t.value.removeChild(r.svg),r=null)});let g=50;return N(()=>{u();let{helpers:{getAllControllers:w}}=D({选择算法:{value:[i.label,e.map(b=>b.label)],onChange(b){let S=e.find(T=>T.label==b);c.value=S.value}},随机数个数:{value:[l,10,100,1],onFinishChange(b){l=b}},自动开始时间间隔:{value:[g,16,100,5],onFinishChange(b){g=b}},生成随机数:{value:[function(){u()}],disable:v.value!=0},排序下一步:{value:[function(){h()}],disable:!d.value||v.value!=0},自动开始(){_()},查看源码(){s("check-source")}}),y=q(v,b=>{w().forEach(S=>{S.property!="查看源码"&&S.disable(b>0)})});A(()=>{y(),clearInterval(v.value)})}),(w,y)=>(F(),O("div",Ia,[L("div",{ref_key:"node",ref:t},null,512)]))}}),ja=V(Ea,[["__scopeId","data-v-698136a6"]]),Ta=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,Fa=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,Oa=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,Ma=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,Pa="/demo/assets/imgs/display-B3luB7Uf.png",za={codes:[{name:"index.vue",code:wa,lang:"js"},{name:"bubble.ts",code:Ta,lang:"ts"},{name:"selection.ts",code:Fa,lang:"ts"},{name:"insertion.ts",code:Oa,lang:"ts"},{name:"merge.ts",code:Ma,lang:"ts"}],component:ja,display:Pa,title:"排序算法可视化",descriptions:""},$a=`<template>
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
`,Da=`import { easeOutCubic } from './ease'
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
`;function Na(o){return 1-Math.pow(1-o,3)}var an=(o=>(o[o.NORMAL=0]="NORMAL",o[o.REVERSE=1]="REVERSE",o))(an||{});function Aa(o,n){let{startIndex:s=0,speed:t=1,onDone:e,onProcessing:i}=n,c=s,r,a;const f=u=>{dn(u)&&(a=Math.ceil(800/u))},m=()=>{r&&(cancelAnimationFrame(r),r=0)};f(t);function l(u){m();let{direction:h,speed:v,startIndex:_}=u,g;f(v),dn(_)&&(c=_);const w=y=>{g||(g=y),y-g>=a&&(h==0?c=(c+1)%o.length:c=c-1>=0?c-1:o.length-1,i(c),g=y),r=requestAnimationFrame(w)};r||(r=requestAnimationFrame(w))}function p(){m()}function d(u){m();let{loopTimes:h=5,targetIndex:v=o.length-1,direction:_,speed:g,startIndex:w}=u||{};h=Math.max(Math.ceil(Number(h)),1),v=Math.max(0,Math.min(Number(v),o.length-1)),f(g),dn(w)&&(c=w);let y=c,b,S=v-y;_==0?b=y+h*o.length+(S>=0?S:o.length+S):b=y-h*o.length+(S<=0?S:-o.length+S);let T=Math.abs(b-y)*a,B;const x=R=>{B||(B=R);let M=Math.min(1,(R-B)/T),k=(Math.ceil(Na(M)*(b-y))+y)%o.length;if(k<0&&(k+=o.length),c!=k&&(c=k,i(c)),M==1){e(c),r=0;return}r=requestAnimationFrame(x)};r=requestAnimationFrame(x)}return{wander:l,stop:p,draw:d}}const Wa={class:"box"},La={style:{display:"flex"}},Ga=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n,t=I(1),e=[...Array(10)],i={targetIndex:2,loopTimes:2,direction:an.NORMAL,speed:5},{wander:c,stop:r,draw:a}=Aa(e,{speed:i.speed,startIndex:t.value,onProcessing:d=>{t.value=d},onDone(d){vn({showClose:!0,message:"已经抽奖完毕",type:"success",grouping:!0}),t.value=d}});function f(){c({...i})}function m(){a({...i})}A(()=>{r(),l&&clearTimeout(l)});let l;function p(){f(),l=setTimeout(()=>{i.targetIndex=Nn(e),m(),l=0},2500)}return D({设定巡航速度:{value:[i.speed,1,10,1],onFinishChange(d){i.speed=d}},设定最终选中项索引:{value:[i.targetIndex,0,e.length-1,1],onFinishChange(d){i.targetIndex=d}},轮转次数:{value:[i.loopTimes,2,20,1],onFinishChange(d){i.loopTimes=d}},轮转方向:{value:[i.direction==an.NORMAL?"正向":"负向",["正向","负向"]],onChange(d){i.direction=d=="正向"?an.NORMAL:an.REVERSE}},开始抽奖:m,开始巡航:f,停止:r,模拟接口返回预制数据:p,查看源码(){s("check-source")}}),(d,u)=>{const h=Dn;return F(),O("div",Wa,[W(h,{class:"demo-card",shadow:"always"},{default:H(()=>[L("div",La,[(F(),O(K,null,sn(e,(v,_)=>L("div",{class:rn(["block",X(t)==_?"selected":""])},hn(_),3)),64))])]),_:1})])}}}),Ha=V(Ga,[["__scopeId","data-v-2fa66777"]]),Va="/demo/assets/imgs/display-DiF1Sfat.png",qa={codes:[{name:"index.vue",code:$a,lang:"js"},{name:"draw-price.ts",code:Da,lang:"ts"}],component:Ha,display:Va,title:"抽奖",descriptions:""},Xa=`<template>
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
`,Ya="/demo/assets/imgs/018194d9aac11f975e17b274fe4a78af1463731957-BlWzWTpc.png",Ka="/demo/assets/imgs/10251358673700483-Bf69morh.jpg",Ua="/demo/assets/imgs/10251358673922612-wa-5hia3.jpg",Qa="/demo/assets/imgs/10251381214893821-DZ0tyfKl.jpg",Za="/demo/assets/imgs/10251381215028477-DT0oxPDL.jpg",Ja="/demo/assets/imgs/10251381215091916-34MSuKPK.jpg",ni="/demo/assets/imgs/10251381215152314-ZOViud5b.jpg",ei="/demo/assets/imgs/10251381215208971-BnTSlzDn.jpg",ti="/demo/assets/imgs/10251381215487222-CyoYfFWR.jpg",ai="/demo/assets/imgs/10251381215991717-jivRh7vw.jpg",ii="/demo/assets/imgs/10251381216212847-C6d5iI8I.jpg",si="/demo/assets/imgs/3a5950fc2408a7f8136de8704e1819c21463732075-DT6cAkAt.png",li="/demo/assets/imgs/48d780d33eaf46a5646376b814b8efa71463731556-CGACL27Z.png",oi="/demo/assets/imgs/554e21161de34506e9cb1ecbcd85716d1463732343-LZH7KjnQ.png",ri="/demo/assets/imgs/884f9b653e317cc514890954b2e35be81463731323-DvATjqjX.png",ci="/demo/assets/imgs/8a116da0668edebd82af16ecf7e75ace1590566316-Cl-PTpZA.jpg",ui="/demo/assets/imgs/928d6ec50975da022bda97a1ab8f04c81463731839-d_LHiOEG.png",di="/demo/assets/imgs/a748932756b48bd46a8fd17df4579dea1463732104-DlsyWN-A.png",hi="/demo/assets/imgs/b5978ead603dcdc66704e721960debe31590565987-4RsIwXgW.jpg",fi="/demo/assets/imgs/c06f07de280d4edebf801eef4b142c721463731804-DD1ps6p3.png",mi="/demo/assets/imgs/ceb8c078cf6b410d7def183870fe584d1590566557-9BfKn2sf.jpg",pi="/demo/assets/imgs/ea5871bc33e131b497b9bb273890e8ae1463731875-WWF6WmyZ.png",gi="/demo/assets/imgs/f29af13446f1feed47dcfd299ccaa23c1463732001-DrhlCMaO.png",vi="/demo/assets/imgs/fef4eadd191c3461054ca60cde8576db1590566398-Bn18syhQ.jpg",xi={class:"container"},yi=["src"],bi=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=n;let t=[...Object.values([Ya,Ka,Ua,Qa,Za,Ja,ni,ei,ti,ai,ii,si,li,oi,ri,ci,ui,di,hi,fi,mi,pi,gi,vi])];t=I(nt(t,Math.ceil(t.length/5))),D({查看源码(){s("check-source")}});function i(r){r.target.classList.add("level-up")}function c(r){r.target.classList.remove("level-up")}return(r,a)=>(F(),O("div",xi,[(F(!0),O(K,null,sn(X(t),(f,m)=>(F(),O("div",{class:rn(["hive-row",m%2==1?"odd":""]),onMouseenter:i,onMouseleave:c},[(F(!0),O(K,null,sn(f,l=>(F(),O("img",{class:"hive-item",src:l,alt:""},null,8,yi))),256))],34))),256))]))}}),_i=V(bi,[["__scopeId","data-v-93867a89"]]),wi="/demo/assets/imgs/display-BVEemRNY.png",Ci={codes:[{name:"index.vue",code:Xa,lang:"js"}],component:_i,display:wi,title:"蜂巢图片",descriptions:""},Ri=`<template>
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
`,Si=`import { isFunc } from '@/utils/utils'

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
`,Bi=`import type { SceneInstance, SceneObj } from "./scene"
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
`;class ki{constructor(n){C(this,"canvas");C(this,"ctx");C(this,"width",0);C(this,"height",0);C(this,"background");C(this,"_t0",0);C(this,"_t1",0);C(this,"_dt",0);C(this,"_objects",[]);C(this,"_raf",0);let{width:s,height:t,canvas:e,background:i}=n;this.canvas=e,this.ctx=e.getContext("2d"),this.background=i??"#000",this.setSize(s,t)}setSize(n,s){this.canvas.width=n,this.canvas.height=s,this.width=n,this.height=s}_render(){let{width:n,height:s,ctx:t,background:e}=this;t.fillStyle=e,t.fillRect(0,0,n,s);for(let i of[...this._objects])i.render(this._dt)}_updateTime(n){this._t0==0&&(this._t0=n),this._dt=n-this._t0}run(n){const s=t=>{this._updateTime(t),cn(n)&&n(this._dt),this._render(),this._raf=requestAnimationFrame(s)};this._raf=requestAnimationFrame(s)}addObj(...n){return n.forEach(s=>{this._objects.find(t=>t==s)||(this._objects.push(s),s.scene=this)}),this}removeObj(n){let s=this._objects.findIndex(t=>t==n);return s!=-1&&(this._objects.splice(s,1),n.scene==this&&(n.scene=null)),this}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._t0=0,this._t1=0,this._dt=0)}}const Ii=[...Array(26)].map((o,n)=>["a","A"].map(s=>String.fromCharCode(s.charCodeAt(0)+n))).flat();function Ei(){return[...Array(Z(8)+2)].map(()=>An(Ii)).join("")}class ji{constructor(n){C(this,"_x");C(this,"_y");C(this,"_text");C(this,"_opacity");C(this,"_onDismiss");C(this,"scene");C(this,"_opacityDecay");C(this,"_rawOptions");C(this,"_yStep");C(this,"_font","20px serif");C(this,"_fillStyle","red");let{x:s,y:t,text:e,opacity:i,opacityDecay:c,onDismiss:r,yStep:a}=n;this._x=s,this._y=t,this._text=e,this._opacity=i,this._onDismiss=r,this._opacityDecay=c??.01,this._rawOptions={...n},this._yStep=a??4}setFont(n,s){return this._font=n,this._fillStyle=s,this}render(n){let{_text:s,_x:t,_y:e,_opacityDecay:i,_yStep:c,_fillStyle:r,_font:a}=this,{ctx:f,height:m}=this.scene,l={font:f.font,fillStyle:f.fillStyle,globalAlpha:f.globalAlpha};this._opacity-=typeof i=="number"?i:i(n),this._opacity<0&&(this._opacity=0),f.font=a,f.fillStyle=r,f.globalAlpha=this._opacity;let p=0,d=e+(typeof c=="number"?c:c(n));for(let u of s){let h=f.measureText(u);const{actualBoundingBoxAscent:v,actualBoundingBoxDescent:_}=h;let g=_+v;f.fillText(u,t,d-p),p+=g+10}this._y=d,Object.assign(f,l),(this._opacity==0||d-p>m)&&this._onDismiss(this)}}class Ti{constructor(n){C(this,"scene");C(this,"num",0);C(this,"maxNum",100);C(this,"colors",["brown","red","green","yellow","chocolate","pink","burlywood","chartreuse","cyan"]);let{scene:s,maxNum:t}=n;this.scene=s,t&&(this.maxNum=t)}addText(){if(this.num<this.maxNum){this.num++;let{width:n,height:s}=this.scene,t=new ji({text:Ei(),x:Z(n),y:Z(s),yStep:Z(10)+2,opacity:+Math.min(1,Math.random()+.2).toPrecision(2),opacityDecay:.01,onDismiss:e=>{this.scene.removeObj(e),this.num--}}).setFont(`${Z(15)+14}px serif`,An(this.colors));this.scene.addObj(t)}}start(){this.scene.run(n=>{this.addText()})}stop(){this.scene.stop()}}function Fi(o,n,s){o.addEventListener("resize",n),A(()=>{o.removeEventListener("resize",n)})}const Oi={class:"box"},Mi=P({__name:"index",emits:["check-source"],setup(o,{emit:n}){const s=I(),t=n;return N(()=>{let e=new ki({width:innerWidth,height:innerHeight,canvas:s.value}),{obj:i}=D({文字串数量:{value:[10,10,200,10],onChange(r){c.maxNum=r}},查看代码:function(){t("check-source")}}),c=new Ti({scene:e,maxNum:i.文字串数量});c.start(),Fi(window,()=>{e.setSize(innerWidth,innerHeight)}),A(()=>{c.stop()})}),(e,i)=>(F(),O("div",Oi,[L("canvas",{ref_key:"canvas",ref:s},null,512)]))}}),Pi=V(Mi,[["__scopeId","data-v-4010e3a7"]]),zi="/demo/assets/imgs/display-DwV-CRAI.png",$i={codes:[{name:"index.vue",code:Ri,lang:"js"},{name:"scene.ts",code:Si,lang:"ts"},{name:"textRain.ts",code:Bi,lang:"ts"}],component:Pi,display:zi,title:"文字雨",descriptions:""};let un;function Hn(){return un||(un=Object.assign({"./demo/canvas/audio-wave/config.ts":Qe,"./demo/canvas/bfs/config.ts":lt,"./demo/canvas/chasing/config.ts":ut,"./demo/canvas/connect-balls/config.ts":mt,"./demo/canvas/coord/config.ts":yt,"./demo/canvas/dfs/config.ts":St,"./demo/canvas/effect-1/config.ts":jt,"./demo/canvas/eyeballs/config.ts":Mt,"./demo/canvas/faliling-balls/config.ts":At,"./demo/canvas/friction/config.ts":Ht,"./demo/canvas/noise/config.ts":Yt,"./demo/canvas/simple-icon/config.ts":Jt,"./demo/canvas/text-particle/config.ts":la,"./demo/canvas/wander-balls/config.ts":ua,"./demo/css/blur/config.ts":ga,"./demo/css/shadow/config.ts":_a,"./demo/d3/sort/config.ts":za,"./demo/draw-price/config.ts":qa,"./demo/hive/config.ts":Ci,"./demo/text-rain/config.ts":$i}),un)}let Vn=[];function Di(){const o=Hn();for(let n in o){let{codes:s,component:t,title:e}=o[n],i=function(){return Tn(Le,{codes:s},({checkSource:a})=>Tn(t,{onCheckSource:()=>{a()}}))};i.displayName=`Demo(${n})`;let c=n.replace(/.*\/demo\//,"").replace("/config.ts","").split("/").join("-");o[n].routeName=c,Vn.push({path:c,name:c,component:i,meta:{title:e}})}}Di();const Ni={path:"/demo",children:Vn},Ai={class:"common-layout"},Wi=P({__name:"index",setup(o){let n=Object.values(Hn());return(s,t)=>{const e=ke,i=Ie,c=Dn,r=Be,a=Se,f=Re,m=Ee;return F(),O("div",Ai,[W(m,{class:"container"},{default:H(()=>[W(f,{class:"main"},{default:H(()=>[W(a,{class:"row",gutter:20},{default:H(()=>[(F(!0),O(K,null,sn(X(n),l=>(F(),yn(r,{key:l.routeName,span:4},{default:H(()=>[W(c,{class:"demo-card","body-style":{padding:"0px"},shadow:"always",onClick:p=>s.$router.push({name:l.routeName})},{footer:H(()=>[W(i,{tag:"p"},{default:H(()=>[fn(hn(l.title),1)]),_:2},1024),W(i,{tag:"p","line-clamp":2},{default:H(()=>[fn(hn(l.descriptions||"暂无描述"),1)]),_:2},1024)]),default:H(()=>[W(e,{class:"image",src:l.display,fit:"cover"},null,8,["src"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}}}),Li=V(Wi,[["__scopeId","data-v-fe2c6a64"]]),qn=je({history:Te("/demo/"),routes:[{path:"/",component:Li},Ni]});qn.beforeEach((o,n,s)=>{document.title=o.meta.title??"my demos",s()});const kn=Fe(ze);kn.use(Oe());kn.use(qn);kn.mount("#app");
