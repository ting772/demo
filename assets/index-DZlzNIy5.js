var Jn=Object.defineProperty;var ne=(r,e,o)=>e in r?Jn(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o;var C=(r,e,o)=>ne(r,typeof e!="symbol"?e+"":e,o);import{r as ee,c as _n,o as F,d as P,a as E,b as Cn,e as D,P as te,f as O,g as G,t as fn,n as cn,u as X,h as L,i as se,w as V,E as ae,F as K,j as on,k as ie,l as oe,m as pn,p as vn,q as re,s as Q,v as le,x as ce,y as N,z as W,A as wn,B as q,C as ue,D as mn,G as rn,H as xn,I as Nn,J as Y,K as J,L as Fn,M as de,N as S,O as Rn,Q as Wn,R as On,S as Sn,T as kn,U as yn,V as gn,W as Ln,X as he,Y as Bn,Z as fe,_ as pe,$ as Gn,a0 as me,a1 as Pn,a2 as ge,a3 as ve,a4 as xe,a5 as ye,a6 as be,a7 as we,a8 as _e,a9 as Ce,aa as Re,ab as Se,ac as ke,ad as Be,ae as Hn,af as Mn,ag as Ie,ah as Ee,ai as je,aj as Te,ak as Fe,al as Oe,am as Pe,an as Me,ao as ze,ap as $e}from"./vendor-YFq3xh4u.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const H=(r,e)=>{const o=r.__vccOpts||r;for(const[t,n]of e)o[t]=n;return o},Ae={};function De(r,e){const o=ee("RouterView");return F(),_n(o)}const Ne=H(Ae,[["render",De]]),We={class:"pre"},Le=P({__name:"hilight",props:{code:{},lang:{}},setup(r){const e=r,o=E(),t=Cn(()=>e.lang?`lang-${e.lang}`:"auto");return D(()=>{te.highlightElement(o.value)}),(n,s)=>(F(),O("pre",We,[G("code",{class:cn(X(t)),ref_key:"codeRef",ref:o},fn(n.code),3)]))}}),Ge={class:"container"},He={class:"dialog-footer"},Ve=P({__name:"codeDemo",props:{codes:{}},setup(r){const e=E(!1);function o(){e.value=!0}return(t,n)=>{const s=ie,l=ae,u=oe,a=re;return F(),O(K,null,[G("div",Ge,[se(t.$slots,"default",{checkSource:o},void 0,!0)]),L(a,{modelValue:X(e),"onUpdate:modelValue":n[1]||(n[1]=f=>vn(e)?e.value=f:null),title:"",width:"50vw",top:"50px"},{footer:V(()=>[G("span",He,[L(u,{type:"primary",onClick:n[0]||(n[0]=f=>e.value=!1)},{default:V(()=>n[2]||(n[2]=[pn("关闭")])),_:1})])]),default:V(()=>[L(l,{type:"border-card"},{default:V(()=>[(F(!0),O(K,null,on(t.codes,f=>(F(),_n(s,{label:f.name,key:f.name,lazy:""},{default:V(()=>[L(Le,{code:f.code,lang:f.lang},null,8,["code","lang"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"])],64)}}}),qe=H(Ve,[["__scopeId","data-v-65455990"]]),Xe=`<template>
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
    if (clear) {
      clear()
    }
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
`,Ye=`import { rafLoop } from '@thing772/utils'

/**
 * 画音频波形
 * 浏览器策略，得用户手动播放后执行
 * @param audioSource
 * @param canvas
 * @returns
 */
export function visualize(audioSource: HTMLMediaElement, canvas: HTMLCanvasElement) {
  const audioContext = new AudioContext();
  const source = audioContext.createMediaElementSource(audioSource);

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
      const sliceH = (dataArray[i] / 255) * h;
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
`;function Ke(r,e){const o=new AudioContext,t=o.createMediaElementSource(r),n=o.createAnalyser();t.connect(n),n.connect(o.destination),n.fftSize=512;const s=n.frequencyBinCount,l=new Uint8Array(s),u=e.getContext("2d");let a=e.width,f=e.height;function p(){n.getByteTimeDomainData(l),u.save(),Object.assign(u,{fillStyle:"red"});const d=a/s;for(let c=0;c<s;c+=4){const h=l[c]/255*f;u.fillRect(d*c,f-h,d,h)}u.fill(),u.restore()}function i(d,c){a=e.width=d,f=e.height=c}function g(){return Q(()=>{u.clearRect(0,0,a,f),p()})}return{setSize:i,start:g}}const Ue="/demo/assets/media/%E5%8C%96%E5%87%A1-DF7X08YA.ogg";function $(r){if(!r.title){const o=le().meta.title;o&&(r.title=o)}const e=ce(r);return N(()=>{e.gui.destroy()}),e}const Qe=["src"],Ze=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;$({查看源码(){o("check-source")}});const t=E(),n=E();return D(()=>{let s;n.value.onplay=()=>{const{start:l,setSize:u}=Ke(n.value,t.value);s=W(window,"resize",()=>{u(innerWidth,innerHeight)},{immediate:!0}),l()},N(()=>{s&&s()})}),(s,l)=>(F(),O(K,null,[G("audio",{ref_key:"audioRef",ref:n,src:X(Ue),id:"audio",controls:""},null,8,Qe),G("canvas",{ref_key:"canvasRef",ref:t},null,512)],64))}}),Je=H(Ze,[["__scopeId","data-v-91a379c6"]]),nt="/demo/assets/imgs/display-_9yby0tz.png",et={codes:[{name:"index.vue",code:Xe,lang:"js"},{name:"audio-wave",code:Ye,lang:"ts"}],component:Je,display:nt,title:"音频波形",descriptions:""},tt=`<template>
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
let ctx: CanvasRenderingContext2D
let guiHandler: any

const bgRef = ref('#c5afbb')
const gridSize = ref(30)
const canvasRef = ref()

const start = reactive({ x: 20, y: 10 })
const end = reactive({ x: 0, y: 0 })

const updateView = (initiate?: () => void) => {
  const canvas = canvasRef.value
  w = alignBy(innerWidth, gridSize.value)
  h = alignBy(innerHeight, gridSize.value)
  canvas.width = w
  canvas.height = h
  xMax = w / gridSize.value - 1
  yMax = h / gridSize.value - 1

  initiate?.()

  const getControllerByKey = guiHandler.helpers.getControllerByKey

  const options = {
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

  for (const key in options) {
    const ctl = getControllerByKey(key)
    const v = options[key]
    for (const attr in v) {
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
  const canvas = canvasRef.value
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

const timer = useTimer()

const itv = shallowRef()

function drawNode(v: any) {
  const {
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
  const {
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
      const v = bfs(start, end, xMax, yMax)
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
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')!
  setupGui()
  updateView(() => {
    //调整终点位置
    Object.assign(end, { x: ~~(xMax! / 2), y: ~~(yMax! / 2) })
  })
  it = bfsGenerator(start, end, xMax, yMax)
})
<\/script>
`;function Vn(r){return Math.floor(Math.random()*r.length)}function qn(r){return r[Vn(r)]}function st(r,e=1e3){const o=[];for(let t=0;t<r;t++)o.push(Z(e));return o}function Z(r=1e3){return Math.ceil(Math.random()*r)}function at(r,e){return r.reduce((o,t,n)=>(n%e==0&&o.push(r.slice(n,n+e)),o),[])}function ln(r,e,o){const t=r[e];r[e]=r[o],r[o]=t}function hn(r){return r!=null}function un(r){return typeof r=="function"}function bn(r){return r}function In(r){let e=[];function o(t){const n=t-e.length;return n>0?e.push(...wn(r,n)):n<0&&(e=e.slice(0,n)),e}return o.update=function(t){e.forEach(n=>t(n))},o}function nn(r,e){return~~(r/e)*e}function sn(r,e,o){const{dx:t,dy:n}=e,s=Math.sqrt(t**2+n**2);return{x:r.x+t*o/s,y:r.y+n*o/s}}function zn(r,e,o){return r<e||r>o}function*$n(r,e,o,t){const n=[{...r}],s=[],l={...e},u={};let a;const f=(i,g)=>{if(!(i>o||g>t||i<0||g<0))return{x:i,y:g}},p=i=>`${i.x}-${i.y}`;for(;n.length>0;){if(a&&(u[p(a)]=!0,s.push({...a})),a=n.shift(),delete u[p(a)],a.x==l.x&&a.y==l.y)return{current:a,visited:[...s],pending:[...n]};const i=f(a.x,a.y-1),g=f(a.x+1,a.y),d=f(a.x,a.y+1),c=f(a.x-1,a.y);let h=[i,g,d,c].filter(Boolean);h=h.filter(y=>!u[p(y)]),h.length!=0&&(h.forEach(y=>{y.parent=a,u[p(y)]=!0}),n.push(...h),yield{current:a,visited:[...s],pending:[...n]})}}function it(r,e,o,t){const n=[{...r}],s=[],l={...e},u={};let a;const f=(i,g)=>{if(!(i>o||g>t||i<0||g<0))return{x:i,y:g}},p=i=>`${i.x}-${i.y}`;for(;n.length>0;){if(a&&(u[p(a)]=!0,s.push({...a})),a=n.shift(),delete u[p(a)],a.x==l.x&&a.y==l.y)return{current:a,visited:[...s],pending:[...n]};const i=f(a.x,a.y-1),g=f(a.x+1,a.y),d=f(a.x,a.y+1),c=f(a.x-1,a.y);let h=[i,g,d,c].filter(Boolean);h=h.filter(y=>!u[p(y)]),h.length!=0&&(h.forEach(y=>{y.parent=a,u[p(y)]=!0}),n.push(...h))}}function Xn(){const r=E(0);return q(r,(e,o)=>{e==0&&o>0&&clearInterval(o)},{flush:"sync"}),ue(()=>{r.value=0}),r}const ot=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t,n,s,l,u,a,f;const p=E("#c5afbb"),i=E(30),g=E(),d=mn({x:20,y:10}),c=mn({x:0,y:0}),h=x=>{const R=g.value;s=nn(innerWidth,i.value),l=nn(innerHeight,i.value),R.width=s,R.height=l,t=s/i.value-1,n=l/i.value-1,x==null||x();const M=f.helpers.getControllerByKey,T={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:n,setValue:d.y},设置终点X:{max:t,setValue:c.x},设置终点Y:{max:n,setValue:c.y}};for(const I in T){const z=M(I),A=T[I];for(const tn in A)z[tn](A[tn])}};q([g,p],([x,R])=>{xn(x,{"background-color":R})}),q(i,()=>{v.value=0,h(),w()});const y=(x,R,M)=>{a.save(),Object.assign(a,M),a.fillRect(x*i.value,R*i.value,i.value,i.value),a.restore()},b=(x,R)=>{y(x,R,{fillStyle:"red"})},m=(x,R)=>{y(x,R,{fillStyle:"green"})},w=x=>{const R=g.value;a.clearRect(0,0,s,l),Nn({width:s,height:l,gridSize:i.value,canvas:R,ctx:a,lineWidth:1,gridLineColor:"#fff"}),typeof x=="function"&&x(),b(d.x,d.y),m(c.x,c.y)};q([d,c],()=>{w(),v.value=0,u=$n(d,c,t,n)});const v=Xn(),_=rn();function k(x){const{current:R,pending:M,visited:T}=x;w(()=>{y(R.x,R.y,{fillStyle:"gold"}),M.forEach(I=>{const{x:z,y:A}=I;y(z,A,{fillStyle:"pink"})}),T.forEach(I=>{const{x:z,y:A}=I;y(z,A,{fillStyle:"black"})})})}function j(x){for(;x;)y(x.x,x.y,{fillStyle:"blue"}),x=x.parent;b(d.x,d.y),m(c.x,c.y)}q(_,x=>{const{value:R,done:M}=x;M&&!R||(k(R),M&&j(R.current))});const B=()=>{f=$({设置背景色:{value:[p.value],isColor:!0,onFinishChange(x){p.value=x}},网格大小设置:{value:[i.value,5,50,1],onFinishChange(x){i.value=x}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(x){d.x=x}},设置起始点Y:{value:[d.y,0,n,1],onFinishChange(x){d.y=x}},设置终点X:{value:[c.x,0,t,1],onFinishChange(x){c.x=x}},设置终点Y:{value:[c.y,0,n,1],onFinishChange(x){c.y=x}},自动bfs迭代(){u&&(v.value=0,v.value=setInterval(()=>{const x=u.next();_.value=x,x.done&&(v.value=0)},100))},bfs巡路(){console.time("bfs寻路耗时"),v.value=0;const x=it(d,c,t,n);if(!x)throw Error("没有找到终点");console.timeEnd("bfs寻路耗时"),w(()=>{j(x.current)})},查看源码(){o("check-source")}})};return D(()=>{a=g.value.getContext("2d"),B(),h(()=>{Object.assign(c,{x:~~(t/2),y:~~(n/2)})}),u=$n(d,c,t,n)}),(x,R)=>(F(),O("canvas",{ref_key:"canvasRef",ref:g},null,512))}}),rt="/demo/assets/imgs/display-BFxeQr0P.png",lt=`export type Index = { x: number; y: number }
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
  const queue = [{ ...start }]
  const visited = [] as Index[]
  const dest = { ...end }
  const temp = {} as { [key: string]: boolean }
  let current: Index | undefined

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

    const up = getNode(current.x, current.y - 1)
    const right = getNode(current.x + 1, current.y)
    const down = getNode(current.x, current.y + 1)
    const left = getNode(current.x - 1, current.y)

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
  const queue = [{ ...start }]
  const visited = [] as Index[]
  const dest = { ...end }
  const temp = {} as { [key: string]: boolean }
  let current: Index | undefined

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

    const up = getNode(current.x, current.y - 1)
    const right = getNode(current.x + 1, current.y)
    const down = getNode(current.x, current.y + 1)
    const left = getNode(current.x - 1, current.y)

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
`,ct={codes:[{name:"index.vue",code:tt,lang:"js"},{name:"bfs.ts",code:lt,lang:"ts"}],component:ot,display:rt,title:"canvas网格——广度优先搜索",descriptions:""},ut=`<template>
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
  const canvas = canvasRef.value
  let w: number, h: number, pt: { x: number; y: number }
  const ctx = canvas.getContext('2d')!

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

  const ball = new Ball({
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
    stopAnim()
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
    const { x, y, r, styleOptions } = this;
    Object.assign(ctx, styleOptions);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    if (styleOptions!.fillStyle) ctx.fill();
    if (styleOptions!.strokeStyle) ctx.stroke();
    ctx.restore();
  }
}
`;class U{constructor(e){C(this,"x",0);C(this,"y",0);C(this,"r",0);C(this,"vx",0);C(this,"vy",0);C(this,"ax",0);C(this,"ay",0);C(this,"styleOptions",{});e&&this.set(e)}reset(e){return Object.assign(this,{x:0,y:0,r:0,vx:0,vy:0,ax:0,ay:0,...e?{styleOptions:{}}:null})}set(e){return Object.assign(this,e)}update(){return this.vy+=this.ay,this.y+=this.vy,this.vx+=this.ax,this.x+=this.vx,this}render(e){e.save();const{x:o,y:t,r:n,styleOptions:s}=this;Object.assign(e,s),e.beginPath(),e.arc(o,t,n,0,Math.PI*2),s.fillStyle&&e.fill(),s.strokeStyle&&e.stroke(),e.restore()}}const dt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;$({查看源码(){o("check-source")}});const t=E();return D(()=>{const n=t.value;let s,l,u;const a=n.getContext("2d"),f=W(window,"resize",()=>{Object.assign(n,{width:s=innerWidth,height:l=innerHeight})},{immediate:!0}),p=W(n,"mousemove",function(d){u={x:d.offsetX,y:d.offsetY}}),i=new U({r:100,x:s/2,y:l/2,styleOptions:{fillStyle:Y()}}),g=Q(()=>{a.clearRect(0,0,s,l),u&&(i.x=J(i.x,u.x,.05),i.y=J(i.y,u.y,.05)),i.render(a)});N(()=>{f(),p(),g()})}),(n,s)=>(F(),O("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),ht="/demo/assets/imgs/display-IdleEMXt.png",ft={codes:[{name:"index.vue",code:ut,lang:"js"},{name:"ball.ts",code:en,lang:"ts"}],component:dt,display:ht,title:"缓动追逐",descriptions:""},pt=`<template>
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
  const canvas = canvasRef.value
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
          const pt1 = balls[i],
            pt2 = balls[j];
          const d = distance(pt1, pt2);
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
    if (stopAni)
      stopAni()
  })
})
<\/script>
`,En=`import { rafLoop, updateBallVelocityInRect, isFunc } from '@thing772/utils'
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
  const { canvas, ballsNum, createBallFac, onBallUpdate, speedDecay, preRender, postRender } = options
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
    for (const ball of balls) {
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
`;function jn(r){const{canvas:e,ballsNum:o,createBallFac:t,onBallUpdate:n,speedDecay:s,preRender:l,postRender:u}=r;let a=e.width,f=e.height;const p=e.getContext("2d");let i=[];const g=In(t);function d(v){i=g(v),h()}function c(v){Object.assign(e,v),a=v.width,f=v.height,h()}function h(v){i.forEach(_=>{Fn(v)&&v(_),_.render(p)})}function y(){p.clearRect(0,0,a,f);for(const v of i)Fn(n)?n(v):(v.update(),de(v,{wBox:[0,a],hBox:[0,f],speedDecay:s}));l==null||l(i,p),i.forEach(v=>v.render(p)),u==null||u(i,p)}function b(v){p.clearRect(0,0,a,f),h(v)}d(o);let m;function w(){return m&&m(),m=Q(()=>{y()})}return{start:w,setBallNum:d,setSize:c,render:y,updateBalls:b}}const mt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=80,n=1,s=3,l=3,u=100,a;$({小球个数:{value:[t,1,1e3,10],onFinishChange(d){t=d,i.setBallNum(d)}},小球半径上限:{value:[n,1,100,1],onFinishChange(d){n=d,i.updateBalls(c=>{c.r=S(1,d)})}},小球x方向移动速度上限:{value:[s,1,15,.5],onFinishChange(d){s=d,i.updateBalls(c=>{c.vx=S(1,d)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(d){l=d,i.updateBalls(c=>{c.vy=S(1,d)})}},小球连接范围阈值:{value:[u,50,300,1],onFinishChange(d){u=d}},查看源码(){o("check-source")}});let f;const p=E();let i,g;return D(()=>{const d=p.value;let c=innerWidth,h=innerHeight;Object.assign(d,{width:c,height:h}),i=jn({canvas:d,ballsNum:t,createBallFac:()=>new U({x:S(10,c-10),y:S(10,h-10),r:S(1,n),vx:S(1,s),vy:S(1,l),styleOptions:{fillStyle:Y()}}),preRender(m,w){a||(a=Rn(w,{strokeStyle:Y(),lineWidth:1})),g&&(m=m.concat(g));for(let v=0;v<m.length;v++)for(let _=v+1;_<m.length;_++){const k=m[v],j=m[_];Wn(k,j)<u&&a(k,j)}g&&m.pop()}});const y=W(window,"resize",()=>{c=innerWidth,h=innerHeight,i.setSize({width:c,height:h})},{immediate:!0}),b=W(d,"mousemove",m=>{g={x:m.offsetX,y:m.offsetY}},{needLog:!0});f=i.start(),N(()=>{y(),b(),f&&f()})}),(d,c)=>(F(),O("canvas",{ref_key:"canvasRef",ref:p},null,512))}}),gt="/demo/assets/imgs/display-y86Fu395.png",vt={codes:[{name:"index.vue",code:pt,lang:"js"},{name:"wander-balls.ts",code:En,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:mt,display:gt,title:"粒子小球连线",descriptions:""},xt=`<template>
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
const defaultFn = (x: number, t: number) => Math.sin(5 * x + 0.001 * t) + Math.cos(10 * x + 0.005 * t)
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
  const canvas = canvasRef.value
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
`,yt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,t=E();let n=innerWidth,s=innerHeight,l;const u=(c,h)=>Math.sin(5*c+.001*h)+Math.cos(10*c+.005*h);let a=E(""),f=u,p=300,i=1,g=Y();function d(){f=new Function("x","t",`return ${a.value}`);try{f(0,0)}catch(c){yn({showClose:!0,message:c.message,type:"error",grouping:!0})}}return D(()=>{const c=t.value,h=c.getContext("2d");$({采样率设置:{value:[p,10,1e3,10],onFinishChange(m){p=m}},曲线粗细设置:{value:[i,1,10,1],onFinishChange(m){i=m}},曲线颜色设置:{value:[g],isColor:!0,onFinishChange(m){g=m}},查看源码(){o("check-source")}}),l=On({canvas:c,ctx:h,width:n,height:s});const y=Q(m=>{h.clearRect(0,0,n,s),l.setup(),l.draw(w=>{let v=0;try{v=f(w,m)}catch{}return v},{rate:p,style:{strokeStyle:g,lineWidth:i},label:{name:f.toString().replace(/ anonymous/,""),pos:{x:100,y:100}}})}),b=W(window,"resize",()=>{n=innerWidth,s=innerHeight,l=On({canvas:c,ctx:h,width:n,height:s})});N(()=>{b(),y()})}),(c,h)=>{const y=kn;return F(),O(K,null,[G("canvas",{ref_key:"canvasRef",ref:t},null,512),L(y,{class:"input",modelValue:X(a),"onUpdate:modelValue":h[0]||(h[0]=b=>vn(a)?a.value=b:a=b),placeholder:"参数:（x:x坐标，t：时间参数），输入x和t的表达式",size:"large",onKeyup:Sn(d,["enter"])},null,8,["modelValue"])],64)}}}),bt=H(yt,[["__scopeId","data-v-926767a5"]]),wt="/demo/assets/imgs/display-BsbAITaj.png",_t={codes:[{name:"index.vue",code:xt,lang:"js"}],component:bt,display:wt,title:"笛卡尔坐标系函数绘制",descriptions:""},Ct=`<template>
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
  const canvas = canvasRef.value
  w = alignBy(innerWidth, gridSize.value)
  h = alignBy(innerHeight, gridSize.value)
  canvas.width = w
  canvas.height = h
  xMax = w / gridSize.value - 1
  yMax = h / gridSize.value - 1

  initiate?.()

  const getControllerByKey = guiHandler.helpers.getControllerByKey

  const options = {
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

  for (const key in options) {
    const ctl = getControllerByKey(key)
    const v = options[key]
    for (const attr in v) {
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
  const canvas = canvasRef.value
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

const timer = useTimer()
const itv = shallowRef()

function drawNode(v: any) {
  const {
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
  const {
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
      const v = dfs(start, end, xMax, yMax)
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
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')!
  setupGui()
  updateView(() => {
    //调整终点位置
    Object.assign(end, { x: ~~(xMax! / 2), y: ~~(yMax! / 2) })
  })
  it = dfsGenerator(start, end, xMax, yMax)
})
<\/script>
`;function*An(r,e,o,t){const n=[{...r}],s=[],l={...e},u={};let a;const f=c=>{u[d(c)]=!0,s.push({...c})},p=()=>{const c=n.shift();return delete u[d(c)],c},i=c=>{c.forEach(h=>{u[d(h)]=!0}),n.unshift(...c)},g=(c,h)=>{if(!(c>o||h>t||c<0||h<0))return{x:c,y:h}},d=c=>`${c.x}-${c.y}`;for(;n.length>0;){if(a&&f(a),a=p(),a.x==l.x&&a.y==l.y)return{current:a,visited:[...s],pending:[...n]};const c=g(a.x,a.y-1),h=g(a.x+1,a.y),y=g(a.x,a.y+1),b=g(a.x-1,a.y);let m=[c,h,y,b].filter(Boolean);m=m.filter(w=>!u[d(w)]),m.forEach(w=>{w.parent=a}),m.length!=0&&(i(m),yield{current:a,visited:[...s],pending:[...n]})}}function Rt(r,e,o,t){const n=[{...r}],s=[],l={...e},u={};let a;const f=c=>{u[d(c)]=!0,s.push({...c})},p=()=>{const c=n.shift();return delete u[d(c)],c},i=c=>{c.forEach(h=>{u[d(h)]=!0}),n.unshift(...c)},g=(c,h)=>{if(!(c>o||h>t||c<0||h<0))return{x:c,y:h}},d=c=>`${c.x}-${c.y}`;for(;n.length>0;){if(a&&f(a),a=p(),a.x==l.x&&a.y==l.y)return{current:a,visited:[...s],pending:[...n]};const c=g(a.x,a.y-1),h=g(a.x+1,a.y),y=g(a.x,a.y+1),b=g(a.x-1,a.y);let m=[c,h,y,b].filter(Boolean);m=m.filter(w=>!u[d(w)]),m.forEach(w=>{w.parent=a}),m.length!=0&&i(m)}}const St=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t,n,s,l,u,a,f;const p=E("#c5afbb"),i=E(30),g=E(),d=mn({x:20,y:10}),c=mn({x:0,y:0}),h=x=>{const R=g.value;s=nn(innerWidth,i.value),l=nn(innerHeight,i.value),R.width=s,R.height=l,t=s/i.value-1,n=l/i.value-1,x==null||x();const M=f.helpers.getControllerByKey,T={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:n,setValue:d.y},设置终点X:{max:t,setValue:c.x},设置终点Y:{max:n,setValue:c.y}};for(const I in T){const z=M(I),A=T[I];for(const tn in A)z[tn](A[tn])}};q([g,p],([x,R])=>{xn(x,{"background-color":R})}),q(i,()=>{v.value=0,h(),w()});const y=(x,R,M)=>{a.save(),Object.assign(a,M),a.fillRect(x*i.value,R*i.value,i.value,i.value),a.restore()},b=(x,R)=>{y(x,R,{fillStyle:"red"})},m=(x,R)=>{y(x,R,{fillStyle:"green"})},w=x=>{const R=g.value;a.clearRect(0,0,s,l),Nn({width:s,height:l,gridSize:i.value,canvas:R,ctx:a,lineWidth:1,gridLineColor:"#fff"}),typeof x=="function"&&x(),b(d.x,d.y),m(c.x,c.y)};q([d,c],()=>{w(),v.value=0,u=An(d,c,t,n)});const v=Xn(),_=rn();function k(x){const{current:R,pending:M,visited:T}=x;w(()=>{y(R.x,R.y,{fillStyle:"gold"}),M.forEach(I=>{const{x:z,y:A}=I;y(z,A,{fillStyle:"pink"})}),T.forEach(I=>{const{x:z,y:A}=I;y(z,A,{fillStyle:"black"})})})}function j(x){for(;x;)y(x.x,x.y,{fillStyle:"blue"}),x=x.parent;b(d.x,d.y),m(c.x,c.y)}q(_,x=>{const{value:R,done:M}=x;M&&!R||(k(R),M&&j(R.current))});const B=()=>{f=$({设置背景色:{value:[p.value],isColor:!0,onFinishChange(x){p.value=x}},网格大小设置:{value:[i.value,5,50,1],onFinishChange(x){i.value=x}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(x){d.x=x}},设置起始点Y:{value:[d.y,0,n,1],onFinishChange(x){d.y=x}},设置终点X:{value:[c.x,0,t,1],onFinishChange(x){c.x=x}},设置终点Y:{value:[c.y,0,n,1],onFinishChange(x){c.y=x}},自动dfs迭代(){u&&(v.value=0,v.value=setInterval(()=>{const x=u.next();_.value=x,x.done&&(v.value=0)},100))},dfs巡路(){console.time("dfs寻路耗时"),v.value=0;const x=Rt(d,c,t,n);if(!x)throw Error("没有找到终点");console.timeEnd("dfs寻路耗时"),w(()=>{j(x.current)})},查看源码(){o("check-source")}})};return D(()=>{a=g.value.getContext("2d"),B(),h(()=>{Object.assign(c,{x:~~(t/2),y:~~(n/2)})}),u=An(d,c,t,n)}),(x,R)=>(F(),O("canvas",{ref_key:"canvasRef",ref:g},null,512))}}),kt="/demo/assets/imgs/display-BRS54xHs.png",Bt=`export type Index = { x: number; y: number }
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
  const queue = [{ ...start }]
  const visited = [] as Index[]
  const dest = { ...end }
  const temp = {} as { [key: string]: boolean }
  let current: any

  const addToVisited = (node: Index) => {
    temp[getNodeKey(node)] = true
    visited.push({
      ...node
    })
  }

  const getQueue = () => {
    const node = queue.shift()!
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

    const up = getNode(current.x, current.y - 1)
    const right = getNode(current.x + 1, current.y)
    const down = getNode(current.x, current.y + 1)
    const left = getNode(current.x - 1, current.y)

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
  const queue = [{ ...start }]
  const visited = [] as Index[]
  const dest = { ...end }
  const temp = {} as { [key: string]: boolean }
  let current: any

  const addToVisited = (node: Index) => {
    temp[getNodeKey(node)] = true
    visited.push({
      ...node
    })
  }

  const getQueue = () => {
    const node = queue.shift()!
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

    const up = getNode(current.x, current.y - 1)
    const right = getNode(current.x + 1, current.y)
    const down = getNode(current.x, current.y + 1)
    const left = getNode(current.x - 1, current.y)

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
`,It={codes:[{name:"index.vue",code:Ct,lang:"js"},{name:"dfs.ts",code:Bt,lang:"ts"}],component:St,display:kt,title:"canvas网格——深度优先搜索",descriptions:""},Et=`<template>
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
let nRow = 20, nCol = 30, r = 10, w = 0, h = 0
const gridSize = 20
let gapX = 25, gapY = 25, ballColor = '#53e953'
let particles: ExtendParticle[] = [], ctx: CanvasRenderingContext2D
let scopeR = 50

function createParticles() {
  particles = []

  for (let y = 0; y < nRow; y++) {
    for (let x = 0; x < nCol; x++) {
      const posX = -1 * (nCol - 1 - x) * gapY + w / 2 + (nCol - 1) * gapY / 2
      const posY = -1 * (nRow - 1 - y) * gapX + h / 2 + (nRow - 1) * gapX / 2
      const p = new Particle({
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
    for (const particle of particles) {
      const { originPos } = particle
      if (isPointInCycle(pt, scopeR, originPos)) {
        const ri = scopeR - distance(pt, originPos)
        const targetPos = movePtWithDirection(originPos, ptOffset(pt, originPos), ri * (ri / scopeR))
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
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  const uninstallResize = registEvent(window, 'resize', throttle(() => {
    updateView()
    createParticles()
  }, 100), { immediate: true })

  const uninstallMove = registEvent(canvas, 'mousemove', (e: unknown) => {
    const { offsetX, offsetY } = e as MouseEvent
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
    for (const particle of particles) {
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
`;class Yn{constructor(e){C(this,"x",0);C(this,"y",0);C(this,"tx",0);C(this,"ty",0);C(this,"color","pink");C(this,"name","");C(this,"fx",.01);C(this,"fy",.01);C(this,"onDone");C(this,"r",0);C(this,"size",0);C(this,"done",!1);Object.assign(this,e)}update(){var t;const{tx:e,ty:o}=this;if(!this.done)return this.x=J(this.x,e,this.fx),this.y=J(this.y,o,this.fy),gn(this.x,this.tx)&&gn(this.y,this.ty)&&(this.done=!0,(t=this.onDone)==null||t.call(this)),this}render(e){const{color:o,x:t,y:n,size:s,r:l}=this;e.save(),Object.assign(e,{fillStyle:o}),e.beginPath(),s>0?e.fillRect(t,n,s,s):l>0?e.arc(t,n,l,0,Math.PI*2):e.arc(t,n,2,0,Math.PI*2),e.fill(),e.restore()}}const Dn=20,jt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=20,n=30,s=10,l=0,u=0,a=25,f=25,p="#53e953",i=[],g,d=50;function c(){i=[];for(let v=0;v<t;v++)for(let _=0;_<n;_++){const k=-1*(n-1-_)*f+l/2+(n-1)*f/2,j=-1*(t-1-v)*a+u/2+(t-1)*a/2,B=new Yn({x:k,y:j,tx:k,ty:j,r:s,fx:S(.01,.5,!1),fy:S(.01,.5,!1),color:p});B.originPos={x:k,y:j},i.push(B)}}function h(v){i.forEach(_=>{Object.assign(_,v)})}$({球阵列行数:{value:[t,1,50,1],onFinishChange(v){t=v,c()}},球阵列列数:{value:[n,1,50,1],onFinishChange(v){n=v,c()}},球阵列列间距:{value:[f,6,50,2],onFinishChange(v){f=v,c()}},球阵列行间距:{value:[a,6,50,2],onFinishChange(v){a=v,c()}},影响半径:{value:[d,10,500,1],onFinishChange(v){d=v,c()}},小球半径:{value:[s,4,100,1],onFinishChange(v){s=v,h({r:s}),w()}},球颜色:{value:[p],isColor:!0,onFinishChange(v){p=v,h({color:v})}},查看源码(){o("check-source")}});const y=E(),b=()=>{l=nn(innerWidth,Dn),u=nn(innerHeight,Dn),Object.assign(y.value,{width:l,height:u})};let m;const w=()=>{if(m)for(const v of i){const{originPos:_}=v;if(he(m,d,_)){const k=d-Wn(m,_),j=sn(_,Bn(m,_),k*(k/d));Object.assign(v,{tx:j.x,ty:j.y,done:!1})}else Object.assign(v,{tx:_.x,ty:_.y,done:!1})}};return D(()=>{const v=y.value;g=v.getContext("2d");const _=W(window,"resize",Ln(()=>{b(),c()},100),{immediate:!0}),k=W(v,"mousemove",B=>{const{offsetX:x,offsetY:R}=B;m?(m.x=x,m.y=R):m={x,y:R},w()});xn(v,{"background-color":"#0d0d0d"}),c();const j=Q(()=>{g.clearRect(0,0,l,u);for(const B of i)B.update(),B.render(g)});N(()=>{_(),j(),k()})}),(v,_)=>(F(),O("canvas",{ref_key:"canvasRef",ref:y},null,512))}}),Tt=H(jt,[["__scopeId","data-v-04ab409b"]]),Kn=`import { iterateEaseFromTo, looseEqual } from '@thing772/utils'

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
    const { tx, ty } = this;
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
    const { color, x, y, size, r } = this;
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
`,Ft="/demo/assets/imgs/display-D8ZXnX54.png",Ot={codes:[{name:"index.vue",code:Et,lang:"js"},{name:"particle.ts",code:Kn,lang:"js"}],component:Tt,display:Ft,title:"鼠标滑过小球堆的效果",descriptions:""},Pt=`<template>
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
  const canvas = canvasRef.value
  let w: number, h: number, pt: { x: number; y: number }
  const ctx = canvas.getContext('2d')!

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

  const eyes = [
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

  const eyeBalls = eyes.map(item => new Ball({
    r: item.r / 4,
    x: item.x,
    y: item.y,
    styleOptions: {
      fillStyle: randomRgb(),
    }
  }))

  const face = new Ball({
    r: 200,
    x: w! / 2,
    y: h! / 2,
    styleOptions: {
      fillStyle: "#E6A23C",
    }
  })

  const drawMouth = drawLine(ctx, {
    strokeStyle: "#fff",
    lineWidth: "10",
    lineCap: "round",
  })

  const f = 0.05
  const stopAnim = rafLoop(() => {
    ctx.clearRect(0, 0, w, h)
    face.render(ctx)
    eyes.forEach(eye => {
      eye.render(ctx)
    })
    eyeBalls.forEach((ball, index) => {
      if (pt) {
        const x = ball.x = iterateEaseFromTo(ball.x, pt.x, f);
        const y = ball.y = iterateEaseFromTo(ball.y, pt.y, f);
        const eye = eyes[index]
        //限制在眼框半径-10内
        const temp = { x: eye.x, y: eye.y, r: eye.r - 10 }
        //超出重新计算x，y并赋值给眼球
        if (!isCycleInclude(temp, ball)) {
          ball.x = x;
          ball.y = y;
          const angle1 = getAngle(temp, pt);
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
    stopAnim()
  })
})
<\/script>
`,Mt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;$({查看源码(){o("check-source")}});const t=E();return D(()=>{const n=t.value;let s,l,u;const a=n.getContext("2d"),f=W(window,"resize",()=>{Object.assign(n,{width:s=innerWidth,height:l=innerHeight})},{immediate:!0}),p=W(n,"mousemove",function(b){u={x:b.offsetX,y:b.offsetY}}),i=[new U({r:50,x:s/2-80,y:l/2,styleOptions:{fillStyle:Y()}}),new U({r:50,x:s/2+80,y:l/2,styleOptions:{fillStyle:Y()}})],g=i.map(b=>new U({r:b.r/4,x:b.x,y:b.y,styleOptions:{fillStyle:Y()}})),d=new U({r:200,x:s/2,y:l/2,styleOptions:{fillStyle:"#E6A23C"}}),c=Rn(a,{strokeStyle:"#fff",lineWidth:"10",lineCap:"round"}),h=.05,y=Q(()=>{a.clearRect(0,0,s,l),d.render(a),i.forEach(b=>{b.render(a)}),g.forEach((b,m)=>{if(u){const w=b.x=J(b.x,u.x,h),v=b.y=J(b.y,u.y,h),_=i[m],k={x:_.x,y:_.y,r:_.r-10};if(!fe(k,b)){b.x=w,b.y=v;const j=pe(k,u);Object.assign(b,Gn(k,j,k.r-b.r))}}b.render(a)}),c({x:s/2-50,y:l/2+100},{x:s/2+50,y:l/2+100})});N(()=>{f(),p(),y()})}),(n,s)=>(F(),O("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),zt="/demo/assets/imgs/display-BcjSOcDf.png",$t={codes:[{name:"index.vue",code:Pt,lang:"js"},{name:"ball.ts",code:en,lang:"ts"}],component:Mt,display:zt,title:"会动的眼球",descriptions:""},At=`<template>
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
    const pause = handle.start()
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
    const pause = handle.reset()
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
  const canvas = canvasRef.value
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
`,Dt=`import { Ball } from '@/utils/class/ball'
import { randomBetween, randomRgb, rafLoop, looseEqual } from '@thing772/utils'
import { reusableArray } from '@/utils/utils'

type fallingBallsOptions = {
  num: number;//小球数量
  canvas: HTMLCanvasElement;
  onAllStopped?: () => void//停止运动回调
}

export function fallingBalls(options: fallingBallsOptions) {
  const { canvas, num, onAllStopped } = options
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
    for (const ball of balls) {
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
    for (const ball of balls) {
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
    const pause = rafLoop(render)
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
`;function Nt(r){const{canvas:e,num:o,onAllStopped:t}=r,n=e.getContext("2d");let s=e.width,l=e.height,u=[],a=!1,f=!1;const p=In(()=>new U(i()));function i(){return{x:S(10,s-10),y:S(10,l-10),r:4,ax:0,ay:S(.1,2,!1),vx:0,vy:S(1,3),styleOptions:{fillStyle:Y()},stopped:!1}}function g(m){u=p(m)}function d(){for(const m of u)m.reset().set(i());if(f=!1,!a)return b()}function c(m){Object.assign(e,m),s=m.width,l=m.height}function h(m){return m.stopped||gn(m.vy,0,1)&&gn(m.y+m.r,l,1)}function y(){if(u.length!=0){n.clearRect(0,0,s,l);for(const m of u)if(m.update(),m.y+m.r>l&&(m.y=l-m.r,m.vy*=-.7),m.render(n),h(m)&&(m.stopped=!0,u.every(h))){a=!1,f=!0;try{t==null||t()}catch(w){console.error(w)}return!1}}}g(o);function b(){if(a)return;a=!0,f&&d();const m=Q(y);return()=>{a&&(a=!1,m())}}return{start:b,reset:d,setBallsNum:g,setSize:c,render:y}}const Wt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=100;const n=E(),{helpers:{getControllerByKey:s}}=$({小球个数:{value:[t,1,1e3,10],onFinishChange(f){t=f,u.setBallsNum(f)}},开始(){const f=u.start();f&&(n.value=f)},暂停:{value:[function(){n.value()}],disable:!n.value},重置(){const f=u.reset();f&&(n.value=f)},查看源码(){o("check-source")}});q(n,f=>{s("暂停").enable(!!f)});const l=E();let u;function a(){yn({showClose:!0,message:"所有小球都停止运动了",type:"success",grouping:!0})}return D(()=>{const f=l.value;Object.assign(f,{width:innerWidth,height:innerHeight}),u=Nt({num:t,canvas:f,onAllStopped:a});const p=W(window,"resize",()=>{u.setSize({width:innerWidth,height:innerHeight})},{immediate:!0});u.render(),N(()=>{p(),n.value&&n.value()})}),(f,p)=>(F(),O("canvas",{ref_key:"canvasRef",ref:l},null,512))}}),Lt="/demo/assets/imgs/display-DOU4TeMC.png",Gt={codes:[{name:"index.vue",code:At,lang:"js"},{name:"falling-balls.ts",code:Dt,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:Wt,display:Lt,title:"下落的小球",descriptions:""},Ht=`<template>
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
  const canvas = canvasRef.value
  let w: number, h: number
  Object.assign(canvas, {
    width: w = innerWidth,
    height: h = innerHeight
  })

  handle = ballsWanderInRect<BallWithFriction>({
    canvas,
    ballsNum,
    createBallFac: () => {
      const options = {
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
    if (stopAni) stopAni()
  })
})
<\/script>
`,Vt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=100,n=20,s=20,l=17,u=.01;$({小球个数:{value:[t,1,1e3,10],onFinishChange(i){t=i,p.setBallNum(i)}},小球半径上限:{value:[n,4,100,1],onFinishChange(i){n=i,p.updateBalls(g=>{g.r=S(4,i)})}},小球x方向移动速度上限:{value:[s,1,15,.5],onFinishChange(i){s=i,p.updateBalls(g=>{g.vx=S(1,i)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(i){l=i,p.updateBalls(g=>{g.vy=S(1,i)})}},小球摩擦力因子:{value:[u,0,3,.1],onFinishChange(i){u=i,p.updateBalls(g=>{g.friction=S(0,i)})}},开始(){a&&a(),a=p.start()},查看源码(){o("check-source")}});let a;const f=E();let p;return D(()=>{const i=f.value;let g,d;Object.assign(i,{width:g=innerWidth,height:d=innerHeight}),p=jn({canvas:i,ballsNum:t,createBallFac:()=>{const h={x:S(10,g-10),y:S(10,d-10),r:S(1,n),vx:S(1,s),vy:S(1,l),styleOptions:{fillStyle:Y()},friction:S(0,u)};return new U(h)},onBallUpdate(h){h.vx>=.01&&(h.vx-=h.friction,h.x+=h.vx),h.vy>=.01&&(h.vy-=h.friction,h.y+=h.vy),h.x>g+h.r&&(h.x=-h.r),h.y>d+h.r&&(h.y=-h.r)}});const c=W(window,"resize",()=>{p.setSize({width:g=innerWidth,height:d=innerHeight})},{immediate:!0});N(()=>{c(),a&&a()})}),(i,g)=>(F(),O("canvas",{ref_key:"canvasRef",ref:f},null,512))}}),qt="/demo/assets/imgs/display-BaZn1eIe.png",Xt={codes:[{name:"index.vue",code:Ht,lang:"js"},{name:"wander-balls.ts",code:En,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:Vt,display:qt,title:"运动减速",descriptions:""},Yt=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, rafLoop, setElement, drawLine, randomBetween, ptOffset, loopNGetResult, randomHexColor, angleToPos } from '@thing772/utils'
import { throttle } from 'lodash-es'
import { movePtWithDirection, outBounds } from '@/utils/utils'
import type { Pos } from '@thing772/utils/dist/typings/main';

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ctx: CanvasRenderingContext2D
let w = window.innerWidth, h = window.innerHeight


useGui({
  查看源码() {
    emit("check-source")
  }
})

type LineOptions = {
  length: number;
  step1: number;
  step2: number
}

let lineCount = 100

function generateP1Random() {
  let p1 = { x: randomBetween(0, w, true), y: randomBetween(0, h, true) }
  return p1
}

/**
 * 给定起始点
 * @param {{x:number;y:number}} p1 - 起始点
 * @param {object} param1
 * @param {number} param1.length - 用于计算沿屏幕中心-起点方向length长度的终点坐标
 * @param {number} param1.step1 - 起点沿屏幕中心-起点方向的移动速度
 * @param {number} param1.step2 - 终点沿屏幕中心-起点方向的移动速度
 */
function line(p1: Pos, {
  length,
  step1,
  step2
}: LineOptions) {

  let color = randomHexColor()
  const center = { x: w / 2, y: h / 2 }
  let dire = ptOffset(center, p1)
  let p2 = movePtWithDirection(p1, dire, length)
  return {
    draw(ctx: CanvasRenderingContext2D) {

      //出了视口，重置为中点
      if (outBounds(p1.x, 0, w) || outBounds(p1.y, 0, h)) {
        p1 = { ...center }
        p2 = movePtWithDirection(center, dire, 0.1)
        return
      }
      drawLine(ctx, {
        strokeStyle: color,
        lineWidth: 1,
        lineCap: 'round'
      })(p1, p2)

      p1 = movePtWithDirection(p1, dire, step1)
      p2 = movePtWithDirection(p2, dire, step2)
    }
  }
}
/**
 * 生成环状射线
 * @param {{x:number;y:number}} center - 环的中点
 * @param {number} r - 环的半径
 * @param {object} args
 * @param {[number,number,boolean]} args.lengthArgs - 随机生成长度的参数（randomBetween的入参)
 * @param {[number,number,boolean]} args.step1Args - 随机生成速度的参数（randomBetween的入参)
 * @param {number} [count=1000]
 */
function generateRoundPointLines(center: Pos, r: number, args: { lengthArgs: [number, number, boolean], step1Args: [number, number, boolean] }, count = 1000) {
  return loopNGetResult((index) => {
    let p1 = angleToPos(center, index * 360 / count, r)
    const length = randomBetween(...args.lengthArgs)
    const step1 = randomBetween(...args.step1Args)
    const step2 = step1 * (+randomBetween(0.8, 1, false).toFixed(2))
    return line(p1, { length, step1, step2 })
  }, count)
}

const canvasRef = ref()

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')

  const uninstallResize = registEvent(window, 'resize', throttle(() => {
    w = window.innerWidth
    h = window.innerHeight
    Object.assign(canvas, {
      width: w,
      height: h
    })
  }, 100), { immediate: true })

  setElement(canvas, { 'background-color': '#0d0d0d' })

  let group1 = loopNGetResult(() => {
    const length = randomBetween(1, 5)
    const step1 = randomBetween(1, 5)
    const n = + randomBetween(0.8, 1, false).toFixed(2)
    const step2 = step1 * n

    return line(generateP1Random(), {
      length,
      step1,
      step2
    })
  }, lineCount)

  let group2 = generateRoundPointLines({ x: w / 2, y: h / 2 }, Math.min(w, h) / 2 - 100, {
    step1Args: [0.1, 2, false],
    lengthArgs: [1, 20, false]
  }, 100)

  let group3 = generateRoundPointLines({ x: w / 2, y: h / 2 }, Math.min(w, h) / 2 - 200, {
    step1Args: [0.1, 2, false],
    lengthArgs: [1, 20, false]
  }, 100)

  let group4 = generateRoundPointLines({ x: w / 2, y: h / 2 }, Math.min(w, h) / 2 - 300, {
    step1Args: [0.1, 2, false],
    lengthArgs: [1, 20, false]
  }, 100)

  let lines = group1.concat(group2, group2, group3)

  const stopAni = rafLoop(() => {
    ctx.clearRect(0, 0, w, h)
    lines.forEach(line => {
      line.draw(ctx)
    })
  })

  onUnmounted(() => {
    uninstallResize()
    stopAni()
  })
})
<\/script>

<style scoped>
canvas {
  cursor: pointer;
}
</style>
`,Kt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t,n=window.innerWidth,s=window.innerHeight;$({查看源码(){o("check-source")}});let l=100;function u(){return{x:S(0,n,!0),y:S(0,s,!0)}}function a(i,{length:g,step1:d,step2:c}){let h=me();const y={x:n/2,y:s/2};let b=Bn(y,i),m=sn(i,b,g);return{draw(w){if(zn(i.x,0,n)||zn(i.y,0,s)){i={...y},m=sn(y,b,.1);return}Rn(w,{strokeStyle:h,lineWidth:1,lineCap:"round"})(i,m),i=sn(i,b,d),m=sn(m,b,c)}}}function f(i,g,d,c=1e3){return wn(h=>{let y=Gn(i,h*360/c,g);const b=S(...d.lengthArgs),m=S(...d.step1Args),w=m*+S(.8,1,!1).toFixed(2);return a(y,{length:b,step1:m,step2:w})},c)}const p=E();return D(()=>{const i=p.value;t=i.getContext("2d");const g=W(window,"resize",Ln(()=>{n=window.innerWidth,s=window.innerHeight,Object.assign(i,{width:n,height:s})},100),{immediate:!0});xn(i,{"background-color":"#0d0d0d"});let d=wn(()=>{const m=S(1,5),w=S(1,5),v=+S(.8,1,!1).toFixed(2),_=w*v;return a(u(),{length:m,step1:w,step2:_})},l),c=f({x:n/2,y:s/2},Math.min(n,s)/2-100,{step1Args:[.1,2,!1],lengthArgs:[1,20,!1]},100),h=f({x:n/2,y:s/2},Math.min(n,s)/2-200,{step1Args:[.1,2,!1],lengthArgs:[1,20,!1]},100);f({x:n/2,y:s/2},Math.min(n,s)/2-300,{step1Args:[.1,2,!1],lengthArgs:[1,20,!1]},100);let y=d.concat(c,c,h);const b=Q(()=>{t.clearRect(0,0,n,s),y.forEach(m=>{m.draw(t)})});N(()=>{g(),b()})}),(i,g)=>(F(),O("canvas",{ref_key:"canvasRef",ref:p},null,512))}}),Ut=H(Kt,[["__scopeId","data-v-a6925569"]]),Qt="/demo/assets/imgs/display-CmfO_pXK.png",Zt={codes:[{name:"index.vue",code:Yt,lang:"js"}],component:Ut,display:Qt,title:"射线效果",descriptions:""},Jt=`<template>
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
const scaleX = ref(0.01), scaleY = ref(0.01), scaleV = ref(1)
const noise = shallowRef(new Noise(Math.random()))


const algorithm = ref<NoiseType>('simplex2')

const renderNoise = () => {
  const image = ctx.getImageData(0, 0, w, h)

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const v = ~~Math.min(255, (Math.abs(noise.value[algorithm.value](x * scaleX.value, y * scaleY.value)) * scaleV.value * 256))
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

  const stopWatch = watchEffect(renderNoise)

  onUnmounted(() => {
    unistall()
    stopWatch()
  })
})
<\/script>
`,ns=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=innerWidth,n=innerHeight,s;const l=E(.01),u=E(.01),a=E(1),f=rn(new Pn.Noise(Math.random())),p=E("simplex2"),i=()=>{const d=s.getImageData(0,0,t,n);for(let c=0;c<t;c++)for(let h=0;h<n;h++){const y=~~Math.min(255,Math.abs(f.value[p.value](c*l.value,h*u.value))*a.value*256);d.data[(h*t+c)*4+0]=y,d.data[(h*t+c)*4+1]=y,d.data[(h*t+c)*4+2]=y,d.data[(h*t+c)*4+3]=255}s.putImageData(d,0,0)};$({噪声生成算法:{value:[p.value,["simplex2","perlin2"]],onFinishChange(d){p.value=d}},x方向缩放因子:{value:[l.value,.001,.5,.001],onFinishChange(d){l.value=d}},y方向缩放因子:{value:[u.value,.001,.5,.001],onFinishChange(d){u.value=d}},值放缩因子:{value:[a.value,.01,255,.1],onFinishChange(d){a.value=d}},重新生成随机种子(){f.value=new Pn.Noise(Math.random())},查看源码(){o("check-source")}});const g=E();return D(()=>{const d=g.value;d.width=t,d.height=n,s=d.getContext("2d",{willReadFrequently:!0});const c=W(window,"resize",ge(()=>{t=~~(innerWidth/1),n=~~(innerHeight/1),d.width=t,d.height=n,i()},100)),h=ve(i);N(()=>{c(),h()})}),(d,c)=>(F(),O("canvas",{ref_key:"canvasRef",ref:g},null,512))}}),es="/demo/assets/imgs/display-CsCBxHWH.png",ts={codes:[{name:"index.vue",code:Jt,lang:"js"}],component:ns,display:es,title:"随机噪声",descriptions:""},ss=`<template>
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
const text = ref('')

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
  const url = canvas.toDataURL()
  const a = document.createElement('a')
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
`,as=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t="#cbc262",n="#fff",s=26,l=10,u=64,a=64;const f=E();let p,i;const g=E("");function d(){h()}$({设置背景色:{value:[t],isColor:!0,onChange(y){t=y,h()}},设置文字颜色:{value:[n],isColor:!0,onChange(y){n=y,h()}},设置文字大小:{value:[s,14,30,1],onChange(y){s=y,h()}},设置尺寸:{value:[u,32,64,1],onChange(y){u=y,a=y,p.width=u,p.height=a,h()}},设置圆角:{value:[l,0,100,1],onChange(y){l=y,h()}},图标下载(){p&&c(p)},查看源码(){o("check-source")}});function c(y){const b=y.toDataURL(),m=document.createElement("a");m.download="icon.png",document.body.appendChild(m),m.href=b,m.click(),document.body.removeChild(m)}function h(){i.clearRect(0,0,u,a),i.save(),i.beginPath(),i.moveTo(l,0),i.lineTo(p.width-l,0),i.quadraticCurveTo(p.width,0,p.width,l),i.lineTo(p.width,p.height-l),i.quadraticCurveTo(p.width,p.height,p.width-l,p.height),i.lineTo(l,p.height),i.quadraticCurveTo(0,p.height,0,p.height-l),i.lineTo(0,l),i.quadraticCurveTo(0,0,l,0),i.closePath(),i.clip(),Object.assign(i,{fillStyle:t}),i.fillRect(0,0,u,a),Object.assign(i,{fillStyle:n,textAlign:"center",textBaseline:"middle",font:`bold ${s}px aria`}),i.fillText(g.value,u/2,a/2+2),i.restore()}return D(()=>{p=f.value,p.width=u,p.height=a,i=p.getContext("2d"),h()}),(y,b)=>{const m=kn;return F(),O(K,null,[L(m,{class:"input",modelValue:X(g),"onUpdate:modelValue":b[0]||(b[0]=w=>vn(g)?g.value=w:null),placeholder:"输入ICON中显示的字",size:"large",onKeyup:Sn(d,["enter"])},null,8,["modelValue"]),G("canvas",{ref_key:"canvasRef",ref:f},null,512)],64)}}}),is=H(as,[["__scopeId","data-v-894f0b5c"]]),os="/demo/assets/imgs/display-C0bS9oOy.png",rs={codes:[{name:"index.vue",code:ss,lang:"js"}],component:is,display:os,title:"简单文字图标生成",descriptions:""},ls=`<template>
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
const getParticles = reusableArray(() => new Particle({
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
  const config = textParticles.getParticles(text)

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
  const canvas = canvasRef.value
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
`;class cs{constructor(e){C(this,"canvas");C(this,"ctx");C(this,"fontSize",200);C(this,"fontFamily","微软雅黑");C(this,"color","pink");C(this,"gap",3);C(this,"alphaThreshold",30);C(this,"w",0);C(this,"h",0);const{canvas:o,ctx:t,fontSize:n,fontFamily:s,color:l,gap:u,alphaThreshold:a}=e;this.canvas=o,this.ctx=t??o.getContext("2d"),n&&(this.fontSize=n),s&&(this.fontFamily=s),l&&(this.color=l),u!=null&&(this.gap=u),a!=null&&(this.alphaThreshold=a),this.w=o.width,this.h=o.height}setSize(e){this.w=e.width,this.h=e.height}_measureText(e){const{ctx:o,fontSize:t,fontFamily:n,color:s,w:l,h:u}=this;o.save(),Object.assign(o,{font:`${t}px ${n}`,fillStyle:s,textBaseline:"bottom"});const a=o.measureText(e);let{width:f}=a;const{actualBoundingBoxAscent:p,actualBoundingBoxDescent:i}=a,g=~~(Math.abs(p)+Math.abs(i));f=~~f,o.fillText(e,0,g);const d=o.getImageData(0,0,f,g).data;return o.clearRect(0,0,l,u),o.restore(),{data:d,width:f,height:g}}getParticles(e){const{data:o,width:t,height:n}=this._measureText(e),{gap:s,alphaThreshold:l,w:u,h:a}=this,f=[],p=[];for(let i=0;i<t;i+=s)for(let g=0;g<n;g+=s){const d=g*t+i,c=o[d*4+0],h=o[d*4+1],y=o[d*4+2],b=o[d*4+3];if(b<=l)continue;const{signal:m,resolve:w}=xe();f.push(m);const v=ye({x:i,y:g},Bn({x:t/2,y:n/2},{x:u/2,y:a/2}));p.push({tx:v.x,ty:v.y,color:be(c,h,y,b),onDone:w})}return{particles:p,done:Promise.all(f)}}}const us=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,t=E(),n=E("");let s,l=[],u=3,a="#f00",f=30,p=100,i=1,g=.1,d=.1,c=innerWidth,h=innerHeight;const y=In(()=>new Yn({r:i,x:S(0,c),y:S(0,h),fx:.1,fy:.1}));let b="hello world";function m(v,_){const k=s.getParticles(v);return l=y(k.particles.length).map(j=>(j.done=!1,_&&(j.x=S(0,c),j.y=S(0,h)),j)),l.forEach((j,B)=>Object.assign(j,k.particles[B])),k.done}function w(){n.value&&(b=n.value,m(b,!0))}return D(()=>{const v=t.value,_=v.getContext("2d",{willReadFrequently:!0});Object.assign(v,{width:c,height:h}),s=new cs({canvas:v,ctx:_,gap:u,alphaThreshold:f,color:a}),$({调整文字颜色:{value:[a],isColor:!0,onFinishChange(B){s.color=B,m(b,!0)}},采样alpha过滤阈值:{value:[f,0,100,1],onFinishChange(B){s.alphaThreshold=B,m(b,!0)}},采样间隔调整:{value:[u,1,20,1],onFinishChange(B){s.gap=B,m(b,!0)}},点大小调整:{value:[i,1,20,1],onFinishChange(B){i=B,y.update(x=>x.r=B),m(b,!0)}},x方向缓动因子调整:{value:[g,.01,1,.01],onFinishChange(B){g=B,y.update(x=>x.fx=B),m(b,!0)}},y方向缓动因子调整:{value:[d,.01,1,.01],onFinishChange(B){d=B,y.update(x=>x.fy=B),m(b,!0)}},字体大小调整:{value:[p,50,340,10],onFinishChange(B){p=B,s.fontSize=B,m(b,!0)}},查看源码(){o("check-source")}}),m(b);const k=Q(()=>{_.clearRect(0,0,c,h),l.forEach(B=>{B.render(_),B.update()})}),j=W(window,"resize",()=>{c=innerWidth,h=innerHeight,v.width=c,v.height=h,s.setSize({width:c,height:h})});N(()=>{j(),k()})}),(v,_)=>{const k=kn;return F(),O(K,null,[G("canvas",{ref_key:"canvasRef",ref:t},null,512),L(k,{class:"input",modelValue:X(n),"onUpdate:modelValue":_[0]||(_[0]=j=>vn(n)?n.value=j:null),placeholder:"请输入内容",size:"large",onKeyup:Sn(w,["enter"])},null,8,["modelValue"])],64)}}}),ds=H(us,[["__scopeId","data-v-8c68ef59"]]),hs=`import { getSignal, ptOffset, getMovePt, rgb } from '@thing772/utils'
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
    const {
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
    const { ctx, fontSize, fontFamily, color, w, h } = this
    ctx.save();
    Object.assign(ctx, {
      font: \`\${fontSize}px \${fontFamily}\`,
      fillStyle: color,
      textBaseline: "bottom",//避免汉子底部部分被系统自动截了
    })

    const res = ctx.measureText(text);
    let { width } = res
    const { actualBoundingBoxAscent, actualBoundingBoxDescent } = res
    const height = ~~(
      Math.abs(actualBoundingBoxAscent) + Math.abs(actualBoundingBoxDescent)
    );
    width = ~~width;
    ctx.fillText(text, 0, height);
    const data = ctx.getImageData(0, 0, width, height).data;
    ctx.clearRect(0, 0, w, h)
    ctx.restore();
    return {
      data,
      width,
      height
    }
  }

  getParticles(text: string) {
    const { data, width, height } = this._measureText(text)
    const { gap, alphaThreshold, w, h } = this

    const signals = [] as Promise<any>[]
    const particles = [] as Partial<Particle>[]
    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        const index = y * width + x
        const r = data[index * 4 + 0]
        const g = data[index * 4 + 1]
        const b = data[index * 4 + 2]
        const a = data[index * 4 + 3]

        //过滤掉透明点
        if (a <= alphaThreshold) continue;

        const { signal, resolve, } = getSignal()
        signals.push(signal);

        //集体向canvas中心平移
        const t = getMovePt(
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
`,fs="/demo/assets/imgs/display-DOJbIvru.png",ps={codes:[{name:"index.vue",code:ls,lang:"js"},{name:"textParticle.ts",code:hs,lang:"ts"},{name:"particle.ts",code:Kn,lang:"ts"}],component:ds,display:fs,title:"文字粒子化",descriptions:""},ms=`<template>
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
  const canvas = canvasRef.value
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
    if (stopAni) stopAni()
  })
})
<\/script>
`,gs=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=100,n=20,s=10,l=7;$({小球个数:{value:[t,1,1e3,10],onFinishChange(p){t=p,f.setBallNum(p)}},小球半径上限:{value:[n,4,100,1],onFinishChange(p){n=p,f.updateBalls(i=>{i.r=S(4,p)})}},小球x方向移动速度上限:{value:[s,1,15,.5],onFinishChange(p){s=p,f.updateBalls(i=>{i.vx=S(1,p)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(p){l=p,f.updateBalls(i=>{i.vy=S(1,p)})}},开始(){u&&u(),u=f.start()},查看源码(){o("check-source")}});let u;const a=E();let f;return D(()=>{const p=a.value;let i=innerWidth,g=innerHeight;Object.assign(p,{width:i,height:g}),f=jn({canvas:p,ballsNum:t,createBallFac:()=>new U({x:S(10,i-10),y:S(10,g-10),r:S(1,n),vx:S(1,s),vy:S(1,l),styleOptions:{fillStyle:Y()}})});const d=W(window,"resize",()=>{i=innerWidth,g=innerHeight,f.setSize({width:i,height:g})},{immediate:!0});f.render(),N(()=>{d(),u&&u()})}),(p,i)=>(F(),O("canvas",{ref_key:"canvasRef",ref:a},null,512))}}),vs="/demo/assets/imgs/display-BpUGJlnU.png",xs={codes:[{name:"index.vue",code:ms,lang:"js"},{name:"wander-balls.ts",code:En,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:gs,display:vs,title:"矩形区域内飘荡的小球",descriptions:""},ys=`<template>
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
`,bs={class:"container"},ws=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,{obj:t}=$({模糊自身:{value:[!1],onChange(u){n.value=u}},模糊背景:{value:[!1],onChange(u){s.value=u}},查看源码(){o("check-source")}}),n=E(t.模糊自身),s=E(t.模糊背景),l=Cn(()=>["el2",{"blur-self":n.value,"blur-backdrop":s.value}]);return(u,a)=>(F(),O("div",bs,[a[0]||(a[0]=G("div",{class:"el1"}," 财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人， 较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻） ",-1)),G("div",{class:cn(X(l))}," 财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。 ",2)]))}}),_s=H(ws,[["__scopeId","data-v-bce03b61"]]),Cs="/demo/assets/imgs/display-C7z4HTpE.png",Rs={codes:[{name:"index.vue",code:ys,lang:"js"}],component:_s,display:Cs,title:"css模糊效果",descriptions:""},Ss=`<template>
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

const { obj } = useGui({
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
`,ks=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,{obj:t}=$({"添加box-shadow":{value:[!1],onChange(a){n.value=a}},添加圆角:{value:[!1],onChange(a){s.value=a}},"添加filter:drop-shadow":{value:[!1],onChange(a){l.value=a}},查看源码(){o("check-source")}}),n=E(t["添加box-shadow"]),s=E(t.添加圆角),l=E(t["添加filter:drop-shadow"]),u=Cn(()=>["container",{"has-shadow-box":n.value,"round-border":s.value,filter:l.value}]);return(a,f)=>(F(),O("div",{class:cn(X(u))},f[0]||(f[0]=[pn(" 测试文本 "),G("div",{class:"circle"}," 测试文本2 ",-1)]),2))}}),Bs=H(ks,[["__scopeId","data-v-4ee4a0c8"]]),Is="/demo/assets/imgs/display-CvX0ByRG.png",Es={codes:[{name:"index.vue",code:Ss,lang:"js"}],component:Bs,display:Is,title:"css box阴影效果",descriptions:""},js=`<template>
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
type Generator = (arr: Obj[], selector: (obj: Obj) => number) => { next: any }

const width = innerWidth - 100, height = innerHeight - 100
let sortDone = false
let count = 20

const arr = shallowRef<Obj[]>([]);//待排序数组
const it = shallowRef<ReturnType<Generator>>()//算法步骤迭代器

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
  const { value, done } = it.value!.next()
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

const timer = ref(0)

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
  const { helpers: { getAllControllers } } = useGui({
    选择算法: {
      value: [initItem.label, algorithms.map(item => item.label)],
      onChange(name: string) {
        const item = algorithms.find(item => item.label == name)
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

  const unwatch = watch(timer, (n) => {
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
`;function Ts(r){const{data:e=[],getX:o,getY:t,width:n=200,height:s=200,margin:l=[],color:u={},sortY:a=0,xAxis:f={},yAxis:p={},yLegend:i={},hideXTicks:g}=r,[d=60,c=0,h=30,y=30]=l;let b,m;const w=we("svg").attr("width",n).attr("height",s).attr("viewBox",[0,0,n,s]).style("background-color",u.bg||""),v=w.append("g"),_=w.append("g").attr("transform",`translate(0,${s-h})`),k=w.append("g").attr("transform",`translate(${y},0)`),j=B=>{const x=T=>{if(b=Re().range([y,n-c]),hn(r.xScale))for(const[I,z]of Object.entries(r.xScale))b[I](z);else b.padding(.2);a>0?b.domain(Se(T,([I])=>(a==1?1:-1)*t(I),o)):b.domain(T.map(o)),m=ke().domain([0,Be(T,t)]).range([s-h,d])},R=T=>{T.attr("x",0).attr("y",0).attr("width",b.bandwidth()).attr("height",I=>m(0)-m(t(I))).attr("fill",u.bar||"#409eff")},M=T=>{T.text(I=>I.value).attr("text-anchor","middle").attr("x",b.bandwidth()/2).attr("y",-4)};x(B),v.selectAll("g").data(B).join(T=>T.append("g").attr("transform",I=>`translate(${b(o(I))},${m(t(I))})`).call(I=>{R(I.append("rect")),M(I.append("text"))}),T=>(R(T.select("rect")),M(T.select("text")),T)).attr("transform",T=>`translate(${b(o(T))},${m(t(T))})`),_.call(T=>{const I=_e(b);I.tickSizeOuter(0);for(const[z,A]of Object.entries(f))I[z](A);I(T)}).call(T=>{g&&T.selectAll(".tick").remove()}),k.call(T=>{const I=Ce(m);for(const[z,A]of Object.entries(p))I[z](A);I(T)}).call(T=>T.select(".domain").remove()).call(T=>{if(i.text){const I=T.append("text").attr("text-anchor","middle").attr("x",0).attr("y",20);for(const[z,A]of Object.entries(i))z=="text"?I[z](A):I.attr(z,A)}})};return j(e),{svg:w.node(),update:j}}function*Fs(r,e){un(e)||(e=bn),e=e;for(let o=1;o<r.length;o++)for(let t=0;t<r.length-o;t++)e(r[t])>e(r[t+1])&&(ln(r,t,t+1),yield[...r])}function*Os(r,e){un(e)||(e=bn),e=e,r=[...r];for(let o=0;o<r.length-1;o++){let t=0;for(let n=0;n<r.length-o;n++)e(r[n])>e(r[t])&&(t=n);ln(r,t,r.length-o-1),yield[...r]}}function*Ps(r,e){un(e)||(e=bn),r=[...r],e=e;for(let o=0;o<r.length-1;o++)if(e(r[o])>e(r[o+1])){ln(r,o,o+1),yield[...r];let t=o;for(;t>0&&!(e(r[t])>=e(r[t-1]));)ln(r,t,t-1),yield[...r],t--}}function*Ms(r,e){un(e)||(e=bn);function*o(t,n){if(e=e,t==n)return;const s=Math.floor((t+n)/2);yield*o(t,s),yield*o(s+1,n);const l=u=>r=[...r.slice(0,t),...u,...r.slice(n+1)];if(!(e(r[s])<=e(r[s+1]))){if(e(r[n])<=e(r[t])){yield l([...r.slice(s+1,n+1),...r.slice(t,s+1)]);return}for(let u=1;s+u<=n;u++){let a=s+u;for(;a>t&&!(e(r[a])>=e(r[a-1]));)ln(r,a,a-1),a--,yield[...r]}}}yield*o(0,r.length-1)}const zs={class:"box"},$s=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,t=E(),n=[{label:"冒泡排序",value:Fs},{label:"选择排序",value:Os},{label:"插入排序",value:Ps},{label:"归并排序",value:Ms}],s=n[0],l=E(s.value);let u;const a=innerWidth-100,f=innerHeight-100;let p=!1,i=20;const g=rn([]),d=rn();function c(){g.value=st(i).map((w,v)=>({id:v,value:w})),p=!1,d.value=l.value(g.value,w=>w.value)}q(l,()=>{d.value=l.value(g.value,w=>w.value)});function h(){const{value:w,done:v}=d.value.next();if(p=v,v){yn({showClose:!0,message:"已经排序完毕",type:"success",grouping:!0});return}else g.value=w}const y=E(0);function b(){y.value==0&&((!d.value||p)&&c(),y.value=setInterval(()=>{if(p){clearInterval(y.value),y.value=0;return}h()},m))}q(()=>g.value,w=>{w.length>0?(u||(u=Ts({width:a,height:f,getX:v=>v.id,getY:v=>v.value}),t.value.appendChild(u.svg)),u.update(w)):u&&(t.value.removeChild(u.svg),u=null)});let m=50;return D(()=>{c();const{helpers:{getAllControllers:w}}=$({选择算法:{value:[s.label,n.map(_=>_.label)],onChange(_){const k=n.find(j=>j.label==_);l.value=k.value}},随机数个数:{value:[i,10,100,1],onFinishChange(_){i=_}},自动开始时间间隔:{value:[m,16,100,5],onFinishChange(_){m=_}},生成随机数:{value:[function(){c()}],disable:y.value!=0},排序下一步:{value:[function(){h()}],disable:!d.value||y.value!=0},自动开始(){b()},查看源码(){o("check-source")}}),v=q(y,_=>{w().forEach(k=>{k.property!="查看源码"&&k.disable(_>0)})});N(()=>{v(),clearInterval(y.value)})}),(w,v)=>(F(),O("div",zs,[G("div",{ref_key:"node",ref:t},null,512)]))}}),As=H($s,[["__scopeId","data-v-9858c415"]]),Ds=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,Ns=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,Ws=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,Ls=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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

    const mid = Math.floor((startIndex + endIndex) / 2)
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
`,Gs="/demo/assets/imgs/display-B3luB7Uf.png",Hs={codes:[{name:"index.vue",code:js,lang:"js"},{name:"bubble.ts",code:Ds,lang:"ts"},{name:"selection.ts",code:Ns,lang:"ts"},{name:"insertion.ts",code:Ws,lang:"ts"},{name:"merge.ts",code:Ls,lang:"ts"}],component:As,display:Gs,title:"排序算法可视化",descriptions:""},Vs=`<template>
  <div class="box">
    <el-card class="demo-card" shadow="always">
      <div style="display:flex;">
        <div :class="['block', selectedIndex == index ? 'selected' : '']" v-for="(item, index) in arr" :key="index">{{
          index
          }}</div>
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
`,qs=`import { easeOutCubic } from './ease'
import { isDef } from '@/utils/utils'

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
  const {
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
    let last: number
    const { direction, speed, startIndex } = options
    updateDt(speed)
    if (isDef(startIndex)) { current = startIndex! }

    const loop = (time: number) => {
      if (!last) {
        last = time
      }
      const diff = time - last
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
    } = options || {}
    const {
      direction,
      speed,
      startIndex
    } = options || {}
    loopTimes = Math.max(Math.ceil(Number(loopTimes)), 1) //循环次数 [1,]
    targetIndex = Math.max(0, Math.min(Number(targetIndex), arr.length - 1)) //最终抽奖落地项索引 [0,arr.length-1]

    updateDt(speed)

    if (isDef(startIndex)) { current = startIndex! }

    const from = current
    let to
    const diff = targetIndex - from
    if (direction == DIRECTION.NORMAL) {
      to = from + loopTimes * arr.length + (diff >= 0 ? diff : arr.length + diff)
    } else {
      to = from - loopTimes * arr.length + (diff <= 0 ? diff : (-arr.length + diff))
    }
    const duration = Math.abs(to - from) * dt
    let startTime: number
    const loop = (time: number) => {
      if (!startTime) {
        startTime = time
      }
      const rate = Math.min(1, (time - startTime) / duration)
      const v = Math.ceil(easeOutCubic(rate) * (to - from)) + from
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
`;function Xs(r){return 1-Math.pow(1-r,3)}var an=(r=>(r[r.NORMAL=0]="NORMAL",r[r.REVERSE=1]="REVERSE",r))(an||{});function Ys(r,e){const{startIndex:o=0,speed:t=1,onDone:n,onProcessing:s}=e;let l=o,u,a;const f=c=>{hn(c)&&(a=Math.ceil(800/c))},p=()=>{u&&(cancelAnimationFrame(u),u=0)};f(t);function i(c){p();let h;const{direction:y,speed:b,startIndex:m}=c;f(b),hn(m)&&(l=m);const w=v=>{h||(h=v),v-h>=a&&(y==0?l=(l+1)%r.length:l=l-1>=0?l-1:r.length-1,s(l),h=v),u=requestAnimationFrame(w)};u||(u=requestAnimationFrame(w))}function g(){p()}function d(c){p();let{loopTimes:h=5,targetIndex:y=r.length-1}=c||{};const{direction:b,speed:m,startIndex:w}=c||{};h=Math.max(Math.ceil(Number(h)),1),y=Math.max(0,Math.min(Number(y),r.length-1)),f(m),hn(w)&&(l=w);const v=l;let _;const k=y-v;b==0?_=v+h*r.length+(k>=0?k:r.length+k):_=v-h*r.length+(k<=0?k:-r.length+k);const j=Math.abs(_-v)*a;let B;const x=R=>{B||(B=R);const M=Math.min(1,(R-B)/j);let I=(Math.ceil(Xs(M)*(_-v))+v)%r.length;if(I<0&&(I+=r.length),l!=I&&(l=I,s(l)),M==1){n(l),u=0;return}u=requestAnimationFrame(x)};u=requestAnimationFrame(x)}return{wander:i,stop:g,draw:d}}const Ks={class:"box"},Us={style:{display:"flex"}},Qs=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,t=E(1),n=[...Array(10)],s={targetIndex:2,loopTimes:2,direction:an.NORMAL,speed:5},{wander:l,stop:u,draw:a}=Ys(n,{speed:s.speed,startIndex:t.value,onProcessing:d=>{t.value=d},onDone(d){yn({showClose:!0,message:"已经抽奖完毕",type:"success",grouping:!0}),t.value=d}});function f(){l({...s})}function p(){a({...s})}N(()=>{u(),i&&clearTimeout(i)});let i;function g(){f(),i=setTimeout(()=>{s.targetIndex=Vn(n),p(),i=0},2500)}return $({设定巡航速度:{value:[s.speed,1,10,1],onFinishChange(d){s.speed=d}},设定最终选中项索引:{value:[s.targetIndex,0,n.length-1,1],onFinishChange(d){s.targetIndex=d}},轮转次数:{value:[s.loopTimes,2,20,1],onFinishChange(d){s.loopTimes=d}},轮转方向:{value:[s.direction==an.NORMAL?"正向":"负向",["正向","负向"]],onChange(d){s.direction=d=="正向"?an.NORMAL:an.REVERSE}},开始抽奖:p,开始巡航:f,停止:u,模拟接口返回预制数据:g,查看源码(){o("check-source")}}),(d,c)=>{const h=Hn;return F(),O("div",Ks,[L(h,{class:"demo-card",shadow:"always"},{default:V(()=>[G("div",Us,[(F(),O(K,null,on(n,(y,b)=>G("div",{class:cn(["block",X(t)==b?"selected":""]),key:b},fn(b),3)),64))])]),_:1})])}}}),Zs=H(Qs,[["__scopeId","data-v-3b4448e6"]]),Js="/demo/assets/imgs/display-DiF1Sfat.png",na={codes:[{name:"index.vue",code:Vs,lang:"js"},{name:"draw-price.ts",code:qs,lang:"ts"}],component:Zs,display:Js,title:"抽奖",descriptions:""},ea=`<template>
  <div class="container">
    <div class="hive-row" :class="index % 2 == 1 ? 'odd' : ''" v-for="(sub, index) in imgs" @mouseenter="enter"
      @mouseleave="leave" :key="index">
      <img class="hive-item" :src="src" alt="" v-for="src in sub" :key="src">
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

const row = 5
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
`,ta="/demo/assets/imgs/018194d9aac11f975e17b274fe4a78af1463731957-BlWzWTpc.png",sa="/demo/assets/imgs/10251358673700483-Bf69morh.jpg",aa="/demo/assets/imgs/10251358673922612-wa-5hia3.jpg",ia="/demo/assets/imgs/10251381214893821-DZ0tyfKl.jpg",oa="/demo/assets/imgs/10251381215028477-DT0oxPDL.jpg",ra="/demo/assets/imgs/10251381215091916-34MSuKPK.jpg",la="/demo/assets/imgs/10251381215152314-ZOViud5b.jpg",ca="/demo/assets/imgs/10251381215208971-BnTSlzDn.jpg",ua="/demo/assets/imgs/10251381215487222-CyoYfFWR.jpg",da="/demo/assets/imgs/10251381215991717-jivRh7vw.jpg",ha="/demo/assets/imgs/10251381216212847-C6d5iI8I.jpg",fa="/demo/assets/imgs/3a5950fc2408a7f8136de8704e1819c21463732075-DT6cAkAt.png",pa="/demo/assets/imgs/48d780d33eaf46a5646376b814b8efa71463731556-CGACL27Z.png",ma="/demo/assets/imgs/554e21161de34506e9cb1ecbcd85716d1463732343-LZH7KjnQ.png",ga="/demo/assets/imgs/884f9b653e317cc514890954b2e35be81463731323-DvATjqjX.png",va="/demo/assets/imgs/8a116da0668edebd82af16ecf7e75ace1590566316-Cl-PTpZA.jpg",xa="/demo/assets/imgs/928d6ec50975da022bda97a1ab8f04c81463731839-d_LHiOEG.png",ya="/demo/assets/imgs/a748932756b48bd46a8fd17df4579dea1463732104-DlsyWN-A.png",ba="/demo/assets/imgs/b5978ead603dcdc66704e721960debe31590565987-4RsIwXgW.jpg",wa="/demo/assets/imgs/c06f07de280d4edebf801eef4b142c721463731804-DD1ps6p3.png",_a="/demo/assets/imgs/ceb8c078cf6b410d7def183870fe584d1590566557-9BfKn2sf.jpg",Ca="/demo/assets/imgs/ea5871bc33e131b497b9bb273890e8ae1463731875-WWF6WmyZ.png",Ra="/demo/assets/imgs/f29af13446f1feed47dcfd299ccaa23c1463732001-DrhlCMaO.png",Sa="/demo/assets/imgs/fef4eadd191c3461054ca60cde8576db1590566398-Bn18syhQ.jpg",ka={class:"container"},Ba=["src"],Ia=5,Ea=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=[...Object.values([ta,sa,aa,ia,oa,ra,la,ca,ua,da,ha,fa,pa,ma,ga,va,xa,ya,ba,wa,_a,Ca,Ra,Sa])];t=E(at(t,Math.ceil(t.length/Ia))),$({查看源码(){o("check-source")}});function n(l){l.target.classList.add("level-up")}function s(l){l.target.classList.remove("level-up")}return(l,u)=>(F(),O("div",ka,[(F(!0),O(K,null,on(X(t),(a,f)=>(F(),O("div",{class:cn(["hive-row",f%2==1?"odd":""]),onMouseenter:n,onMouseleave:s,key:f},[(F(!0),O(K,null,on(a,p=>(F(),O("img",{class:"hive-item",src:p,alt:"",key:p},null,8,Ba))),128))],34))),128))]))}}),ja=H(Ea,[["__scopeId","data-v-5a2d0a77"]]),Ta="/demo/assets/imgs/display-BVEemRNY.png",Fa={codes:[{name:"index.vue",code:ea,lang:"js"}],component:ja,display:Ta,title:"蜂巢图片",descriptions:""},Oa=`<template>
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
  const scene = new Scene({
    width: innerWidth,
    height: innerHeight,
    canvas: canvas.value
  })

  const { obj } = useGui({
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

  const rain = new TextRain({ scene, maxNum: obj['文字串数量'] })
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
`,Pa=`import { isFunc } from '@/utils/utils'

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
    const { width, height, canvas, background } = options
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.background = background ?? '#000'
    this.setSize(width, height)
  }

  _render() {
    const { width, height, ctx, background } = this
    ctx.fillStyle = background
    ctx.fillRect(0, 0, width, height)
    // let label = \`\${this._objects.length}个物体待渲染\`
    // console.time(label)

    //内部可能有剔除溢出物体的操作，for of循环+splice会导致删除时闪烁
    for (const obj of [...this._objects]) {
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
    const index = this._objects.findIndex(item => item == obj)
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
`,Ma=`import type { SceneInstance, SceneObj } from "./scene"
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
    const { x, y, text, opacity, opacityDecay, onDismiss, yStep } = options
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
    const { _text, _x, _y, _opacityDecay, _yStep, _fillStyle, _font } = this
    const { ctx, height } = this.scene!

    const old = {
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
    const y = _y + (typeof _yStep == 'number' ? _yStep : _yStep!(delta))

    for (const w of _text) {
      const metrix = ctx.measureText(w)
      const { actualBoundingBoxAscent, actualBoundingBoxDescent } = metrix
      //canvas字高度
      const height = actualBoundingBoxDescent + actualBoundingBoxAscent
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
    const { scene, maxNum } = options
    this.scene = scene
    if (maxNum)
      this.maxNum = maxNum
  }

  addText() {
    if (this.num < this.maxNum) {
      this.num++
      const { width, height } = this.scene
      const str = new TextObj({
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
    this.scene.run(() => {
      this.addText()
    })
  }

  stop() {
    this.scene.stop()
  }
}
`;class za{constructor(e){C(this,"canvas");C(this,"ctx");C(this,"width",0);C(this,"height",0);C(this,"background");C(this,"_t0",0);C(this,"_t1",0);C(this,"_dt",0);C(this,"_objects",[]);C(this,"_raf",0);const{width:o,height:t,canvas:n,background:s}=e;this.canvas=n,this.ctx=n.getContext("2d"),this.background=s??"#000",this.setSize(o,t)}setSize(e,o){this.canvas.width=e,this.canvas.height=o,this.width=e,this.height=o}_render(){const{width:e,height:o,ctx:t,background:n}=this;t.fillStyle=n,t.fillRect(0,0,e,o);for(const s of[...this._objects])s.render(this._dt)}_updateTime(e){this._t0==0&&(this._t0=e),this._dt=e-this._t0}run(e){const o=t=>{this._updateTime(t),un(e)&&e(this._dt),this._render(),this._raf=requestAnimationFrame(o)};this._raf=requestAnimationFrame(o)}addObj(...e){return e.forEach(o=>{this._objects.find(t=>t==o)||(this._objects.push(o),o.scene=this)}),this}removeObj(e){const o=this._objects.findIndex(t=>t==e);return o!=-1&&(this._objects.splice(o,1),e.scene==this&&(e.scene=null)),this}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._t0=0,this._t1=0,this._dt=0)}}const $a=[...Array(26)].map((r,e)=>["a","A"].map(o=>String.fromCharCode(o.charCodeAt(0)+e))).flat();function Aa(){return[...Array(Z(8)+2)].map(()=>qn($a)).join("")}class Da{constructor(e){C(this,"_x");C(this,"_y");C(this,"_text");C(this,"_opacity");C(this,"_onDismiss");C(this,"scene");C(this,"_opacityDecay");C(this,"_rawOptions");C(this,"_yStep");C(this,"_font","20px serif");C(this,"_fillStyle","red");const{x:o,y:t,text:n,opacity:s,opacityDecay:l,onDismiss:u,yStep:a}=e;this._x=o,this._y=t,this._text=n,this._opacity=s,this._onDismiss=u,this._opacityDecay=l??.01,this._rawOptions={...e},this._yStep=a??4}setFont(e,o){return this._font=e,this._fillStyle=o,this}render(e){const{_text:o,_x:t,_y:n,_opacityDecay:s,_yStep:l,_fillStyle:u,_font:a}=this,{ctx:f,height:p}=this.scene,i={font:f.font,fillStyle:f.fillStyle,globalAlpha:f.globalAlpha};this._opacity-=typeof s=="number"?s:s(e),this._opacity<0&&(this._opacity=0),f.font=a,f.fillStyle=u,f.globalAlpha=this._opacity;let g=0;const d=n+(typeof l=="number"?l:l(e));for(const c of o){const h=f.measureText(c),{actualBoundingBoxAscent:y,actualBoundingBoxDescent:b}=h,m=b+y;f.fillText(c,t,d-g),g+=m+10}this._y=d,Object.assign(f,i),(this._opacity==0||d-g>p)&&this._onDismiss(this)}}class Na{constructor(e){C(this,"scene");C(this,"num",0);C(this,"maxNum",100);C(this,"colors",["brown","red","green","yellow","chocolate","pink","burlywood","chartreuse","cyan"]);const{scene:o,maxNum:t}=e;this.scene=o,t&&(this.maxNum=t)}addText(){if(this.num<this.maxNum){this.num++;const{width:e,height:o}=this.scene,t=new Da({text:Aa(),x:Z(e),y:Z(o),yStep:Z(10)+2,opacity:+Math.min(1,Math.random()+.2).toPrecision(2),opacityDecay:.01,onDismiss:n=>{this.scene.removeObj(n),this.num--}}).setFont(`${Z(15)+14}px serif`,qn(this.colors));this.scene.addObj(t)}}start(){this.scene.run(()=>{this.addText()})}stop(){this.scene.stop()}}function Wa(r,e,o){r.addEventListener("resize",e),N(()=>{r.removeEventListener("resize",e)})}const La={class:"box"},Ga=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=E(),t=e;return D(()=>{const n=new za({width:innerWidth,height:innerHeight,canvas:o.value}),{obj:s}=$({文字串数量:{value:[10,10,200,10],onChange(u){l.maxNum=u}},查看代码:function(){t("check-source")}}),l=new Na({scene:n,maxNum:s.文字串数量});l.start(),Wa(window,()=>{n.setSize(innerWidth,innerHeight)}),N(()=>{l.stop()})}),(n,s)=>(F(),O("div",La,[G("canvas",{ref_key:"canvas",ref:o},null,512)]))}}),Ha=H(Ga,[["__scopeId","data-v-2318ea81"]]),Va="/demo/assets/imgs/display-DwV-CRAI.png",qa={codes:[{name:"index.vue",code:Oa,lang:"js"},{name:"scene.ts",code:Pa,lang:"ts"},{name:"textRain.ts",code:Ma,lang:"ts"}],component:Ha,display:Va,title:"文字雨",descriptions:""};let dn;function Un(){return dn||(dn=Object.assign({"./demo/canvas/audio-wave/config.ts":et,"./demo/canvas/bfs/config.ts":ct,"./demo/canvas/chasing/config.ts":ft,"./demo/canvas/connect-balls/config.ts":vt,"./demo/canvas/coord/config.ts":_t,"./demo/canvas/dfs/config.ts":It,"./demo/canvas/effect-1/config.ts":Ot,"./demo/canvas/eyeballs/config.ts":$t,"./demo/canvas/faliling-balls/config.ts":Gt,"./demo/canvas/friction/config.ts":Xt,"./demo/canvas/line/config.ts":Zt,"./demo/canvas/noise/config.ts":ts,"./demo/canvas/simple-icon/config.ts":rs,"./demo/canvas/text-particle/config.ts":ps,"./demo/canvas/wander-balls/config.ts":xs,"./demo/css/blur/config.ts":Rs,"./demo/css/shadow/config.ts":Es,"./demo/d3/sort/config.ts":Hs,"./demo/draw-price/config.ts":na,"./demo/hive/config.ts":Fa,"./demo/text-rain/config.ts":qa}),dn)}const Qn=[];function Xa(){const r=Un();for(const e in r){const{codes:o,component:t,title:n}=r[e],s=function(){return Mn(qe,{codes:o},({checkSource:a})=>Mn(t,{onCheckSource:()=>{a()}}))};s.displayName=`Demo(${e})`;const l=e.replace(/.*\/demo\//,"").replace("/config.ts","").split("/").join("-");r[e].routeName=l,Qn.push({path:l,name:l,component:s,meta:{title:n}})}}Xa();const Ya={path:"/demo",children:Qn},Ka={class:"common-layout"},Ua=P({__name:"index",setup(r){const e=Object.values(Un());return(o,t)=>{const n=Te,s=Fe,l=Hn,u=je,a=Ee,f=Ie,p=Oe;return F(),O("div",Ka,[L(p,{class:"container"},{default:V(()=>[L(f,{class:"main"},{default:V(()=>[L(a,{class:"row",gutter:20},{default:V(()=>[(F(!0),O(K,null,on(X(e),i=>(F(),_n(u,{key:i.routeName,span:4},{default:V(()=>[L(l,{class:"demo-card","body-style":{padding:"0px"},shadow:"always",onClick:g=>o.$router.push({name:i.routeName})},{footer:V(()=>[L(s,{tag:"p"},{default:V(()=>[pn(fn(i.title),1)]),_:2},1024),L(s,{tag:"p","line-clamp":2},{default:V(()=>[pn(fn(i.descriptions||"暂无描述"),1)]),_:2},1024)]),default:V(()=>[L(n,{class:"image",src:i.display,fit:"cover"},null,8,["src"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}}}),Qa=H(Ua,[["__scopeId","data-v-9c137ebc"]]),Zn=Pe({history:Me("/demo/"),routes:[{path:"/",component:Qa},Ya]});Zn.beforeEach((r,e,o)=>{document.title=r.meta.title??"my demos",o()});const Tn=ze(Ne);Tn.use($e());Tn.use(Zn);Tn.mount("#app");
