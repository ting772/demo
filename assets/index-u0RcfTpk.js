var ae=Object.defineProperty;var ie=(l,e,i)=>e in l?ae(l,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):l[e]=i;var C=(l,e,i)=>ie(l,typeof e!="symbol"?e+"":e,i);import{r as oe,c as kn,o as O,d as P,a as S,b as Bn,e as A,P as re,f as T,g as V,t as vn,n as hn,u as Y,h as G,i as le,w as q,E as ce,F as U,j as cn,k as ue,l as de,m as xn,p as bn,q as he,s as X,v as fe,x as pe,y as W,z as N,A as Sn,B as H,C as me,D as yn,G as un,H as nn,I as qn,J as K,K as tn,L as fn,M as Z,N as k,O as ge,Q as En,R as sn,S as zn,T as ve,U as wn,V as $n,W as jn,X as Fn,Y as _n,Z as xe,_ as ye,$ as In,a0 as be,a1 as we,a2 as Xn,a3 as Dn,a4 as _e,a5 as Rn,a6 as An,a7 as Nn,a8 as Ce,a9 as Re,aa as Se,ab as ke,ac as Be,ad as Ee,ae as je,af as Fe,ag as Ie,ah as Oe,ai as Me,aj as Yn,ak as Wn,al as Te,am as Pe,an as ze,ao as $e,ap as De,aq as Ae,ar as Ne,as as We,at as Le,au as He}from"./vendor-B-EgUSSZ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function i(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(n){if(n.ep)return;n.ep=!0;const s=i(n);fetch(n.href,s)}})();const L=(l,e)=>{const i=l.__vccOpts||l;for(const[t,n]of e)i[t]=n;return i},Ge={};function Ve(l,e){const i=oe("RouterView");return O(),kn(i)}const qe=L(Ge,[["render",Ve]]),Xe={class:"pre"},Ye=P({__name:"hilight",props:{code:{},lang:{}},setup(l){const e=l,i=S(),t=Bn(()=>e.lang?`lang-${e.lang}`:"auto");return A(()=>{re.highlightElement(i.value)}),(n,s)=>(O(),T("pre",Xe,[V("code",{class:hn(Y(t)),ref_key:"codeRef",ref:i},vn(n.code),3)]))}}),Ke={class:"container"},Ue={class:"dialog-footer"},Qe=P({__name:"codeDemo",props:{codes:{}},setup(l){const e=S(!1);function i(){e.value=!0}return(t,n)=>{const s=ue,r=ce,u=de,a=he;return O(),T(U,null,[V("div",Ke,[le(t.$slots,"default",{checkSource:i},void 0,!0)]),G(a,{modelValue:Y(e),"onUpdate:modelValue":n[1]||(n[1]=h=>bn(e)?e.value=h:null),title:"",width:"50vw",top:"50px"},{footer:q(()=>[V("span",Ue,[G(u,{type:"primary",onClick:n[0]||(n[0]=h=>e.value=!1)},{default:q(()=>n[2]||(n[2]=[xn("关闭")])),_:1})])]),default:q(()=>[G(r,{type:"border-card"},{default:q(()=>[(O(!0),T(U,null,cn(t.codes,h=>(O(),kn(s,{label:h.name,key:h.name,lazy:""},{default:q(()=>[G(Ye,{code:h.code,lang:h.lang},null,8,["code","lang"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"])],64)}}}),Ze=L(Qe,[["__scopeId","data-v-65455990"]]),Je=`<template>
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
`,nt=`import { rafLoop } from '@thing772/utils'

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
`;function et(l,e){const i=new AudioContext,t=i.createMediaElementSource(l),n=i.createAnalyser();t.connect(n),n.connect(i.destination),n.fftSize=512;const s=n.frequencyBinCount,r=new Uint8Array(s),u=e.getContext("2d");let a=e.width,h=e.height;function p(){n.getByteTimeDomainData(r),u.save(),Object.assign(u,{fillStyle:"red"});const d=a/s;for(let c=0;c<s;c+=4){const f=r[c]/255*h;u.fillRect(d*c,h-f,d,f)}u.fill(),u.restore()}function o(d,c){a=e.width=d,h=e.height=c}function v(){return X(()=>{u.clearRect(0,0,a,h),p()})}return{setSize:o,start:v}}const tt="/demo/assets/media/%E5%8C%96%E5%87%A1-DF7X08YA.ogg";function z(l){if(!l.title){const i=fe().meta.title;i&&(l.title=i)}const e=pe(l);return W(()=>{e.gui.destroy()}),e}const st=["src"],at=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;z({查看源码(){i("check-source")}});const t=S(),n=S();return A(()=>{let s;n.value.onplay=()=>{const{start:r,setSize:u}=et(n.value,t.value);s=N(window,"resize",()=>{u(innerWidth,innerHeight)},{immediate:!0}),r()},W(()=>{s&&s()})}),(s,r)=>(O(),T(U,null,[V("audio",{ref_key:"audioRef",ref:n,src:Y(tt),id:"audio",controls:""},null,8,st),V("canvas",{ref_key:"canvasRef",ref:t},null,512)],64))}}),it=L(at,[["__scopeId","data-v-91a379c6"]]),ot="/demo/assets/imgs/display-_9yby0tz.png",rt={codes:[{name:"index.vue",code:Je,lang:"js"},{name:"audio-wave",code:nt,lang:"ts"}],component:it,display:ot,title:"音频波形",descriptions:""},lt=`<template>
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
`;function Kn(l){return Math.floor(Math.random()*l.length)}function Un(l){return l[Kn(l)]}function ct(l,e=1e3){const i=[];for(let t=0;t<l;t++)i.push(en(e));return i}function en(l=1e3){return Math.ceil(Math.random()*l)}function ut(l,e){return l.reduce((i,t,n)=>(n%e==0&&i.push(l.slice(n,n+e)),i),[])}function dn(l,e,i){const t=l[e];l[e]=l[i],l[i]=t}function gn(l){return l!=null}function pn(l){return typeof l=="function"}function Cn(l){return l}function On(l){let e=[];function i(t){const n=t-e.length;return n>0?e.push(...Sn(l,n)):n<0&&(e=e.slice(0,n)),e}return i.update=function(t){e.forEach(n=>t(n))},i}function an(l,e){return~~(l/e)*e}function rn(l,e,i){const{dx:t,dy:n}=e,s=Math.sqrt(t**2+n**2);return{x:l.x+t*i/s,y:l.y+n*i/s}}function Ln(l,e,i){return l<e||l>i}function*Hn(l,e,i,t){const n=[{...l}],s=[],r={...e},u={};let a;const h=(o,v)=>{if(!(o>i||v>t||o<0||v<0))return{x:o,y:v}},p=o=>`${o.x}-${o.y}`;for(;n.length>0;){if(a&&(u[p(a)]=!0,s.push({...a})),a=n.shift(),delete u[p(a)],a.x==r.x&&a.y==r.y)return{current:a,visited:[...s],pending:[...n]};const o=h(a.x,a.y-1),v=h(a.x+1,a.y),d=h(a.x,a.y+1),c=h(a.x-1,a.y);let f=[o,v,d,c].filter(Boolean);f=f.filter(x=>!u[p(x)]),f.length!=0&&(f.forEach(x=>{x.parent=a,u[p(x)]=!0}),n.push(...f),yield{current:a,visited:[...s],pending:[...n]})}}function dt(l,e,i,t){const n=[{...l}],s=[],r={...e},u={};let a;const h=(o,v)=>{if(!(o>i||v>t||o<0||v<0))return{x:o,y:v}},p=o=>`${o.x}-${o.y}`;for(;n.length>0;){if(a&&(u[p(a)]=!0,s.push({...a})),a=n.shift(),delete u[p(a)],a.x==r.x&&a.y==r.y)return{current:a,visited:[...s],pending:[...n]};const o=h(a.x,a.y-1),v=h(a.x+1,a.y),d=h(a.x,a.y+1),c=h(a.x-1,a.y);let f=[o,v,d,c].filter(Boolean);f=f.filter(x=>!u[p(x)]),f.length!=0&&(f.forEach(x=>{x.parent=a,u[p(x)]=!0}),n.push(...f))}}function Qn(){const l=S(0);return H(l,(e,i)=>{e==0&&i>0&&clearInterval(i)},{flush:"sync"}),me(()=>{l.value=0}),l}const ht=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t,n,s,r,u,a,h;const p=S("#c5afbb"),o=S(30),v=S(),d=yn({x:20,y:10}),c=yn({x:0,y:0}),f=b=>{const R=v.value;s=an(innerWidth,o.value),r=an(innerHeight,o.value),R.width=s,R.height=r,t=s/o.value-1,n=r/o.value-1,b==null||b();const M=h.helpers.getControllerByKey,F={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:n,setValue:d.y},设置终点X:{max:t,setValue:c.x},设置终点Y:{max:n,setValue:c.y}};for(const j in F){const $=M(j),D=F[j];for(const J in D)$[J](D[J])}};H([v,p],([b,R])=>{nn(b,{"background-color":R})}),H(o,()=>{y.value=0,f(),w()});const x=(b,R,M)=>{a.save(),Object.assign(a,M),a.fillRect(b*o.value,R*o.value,o.value,o.value),a.restore()},g=(b,R)=>{x(b,R,{fillStyle:"red"})},m=(b,R)=>{x(b,R,{fillStyle:"green"})},w=b=>{const R=v.value;a.clearRect(0,0,s,r),qn({width:s,height:r,gridSize:o.value,canvas:R,ctx:a,lineWidth:1,gridLineColor:"#fff"}),typeof b=="function"&&b(),g(d.x,d.y),m(c.x,c.y)};H([d,c],()=>{w(),y.value=0,u=Hn(d,c,t,n)});const y=Qn(),_=un();function B(b){const{current:R,pending:M,visited:F}=b;w(()=>{x(R.x,R.y,{fillStyle:"gold"}),M.forEach(j=>{const{x:$,y:D}=j;x($,D,{fillStyle:"pink"})}),F.forEach(j=>{const{x:$,y:D}=j;x($,D,{fillStyle:"black"})})})}function I(b){for(;b;)x(b.x,b.y,{fillStyle:"blue"}),b=b.parent;g(d.x,d.y),m(c.x,c.y)}H(_,b=>{const{value:R,done:M}=b;M&&!R||(B(R),M&&I(R.current))});const E=()=>{h=z({设置背景色:{value:[p.value],isColor:!0,onFinishChange(b){p.value=b}},网格大小设置:{value:[o.value,5,50,1],onFinishChange(b){o.value=b}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(b){d.x=b}},设置起始点Y:{value:[d.y,0,n,1],onFinishChange(b){d.y=b}},设置终点X:{value:[c.x,0,t,1],onFinishChange(b){c.x=b}},设置终点Y:{value:[c.y,0,n,1],onFinishChange(b){c.y=b}},自动bfs迭代(){u&&(y.value=0,y.value=setInterval(()=>{const b=u.next();_.value=b,b.done&&(y.value=0)},100))},bfs巡路(){console.time("bfs寻路耗时"),y.value=0;const b=dt(d,c,t,n);if(!b)throw Error("没有找到终点");console.timeEnd("bfs寻路耗时"),w(()=>{I(b.current)})},查看源码(){i("check-source")}})};return A(()=>{a=v.value.getContext("2d"),E(),f(()=>{Object.assign(c,{x:~~(t/2),y:~~(n/2)})}),u=Hn(d,c,t,n)}),(b,R)=>(O(),T("canvas",{ref_key:"canvasRef",ref:v},null,512))}}),ft="/demo/assets/imgs/display-BFxeQr0P.png",pt=`export type Index = { x: number; y: number }
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
`,mt={codes:[{name:"index.vue",code:lt,lang:"js"},{name:"bfs.ts",code:pt,lang:"ts"}],component:ht,display:ft,title:"canvas网格——广度优先搜索",descriptions:""},gt=`<template>
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
`,on=`type BallOptions = {
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
`;class Q{constructor(e){C(this,"x",0);C(this,"y",0);C(this,"r",0);C(this,"vx",0);C(this,"vy",0);C(this,"ax",0);C(this,"ay",0);C(this,"styleOptions",{});e&&this.set(e)}reset(e){return Object.assign(this,{x:0,y:0,r:0,vx:0,vy:0,ax:0,ay:0,...e?{styleOptions:{}}:null})}set(e){return Object.assign(this,e)}update(){return this.vy+=this.ay,this.y+=this.vy,this.vx+=this.ax,this.x+=this.vx,this}render(e){e.save();const{x:i,y:t,r:n,styleOptions:s}=this;Object.assign(e,s),e.beginPath(),e.arc(i,t,n,0,Math.PI*2),s.fillStyle&&e.fill(),s.strokeStyle&&e.stroke(),e.restore()}}const vt=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;z({查看源码(){i("check-source")}});const t=S();return A(()=>{const n=t.value;let s,r,u;const a=n.getContext("2d"),h=N(window,"resize",()=>{Object.assign(n,{width:s=innerWidth,height:r=innerHeight})},{immediate:!0}),p=N(n,"mousemove",function(d){u={x:d.offsetX,y:d.offsetY}}),o=new Q({r:100,x:s/2,y:r/2,styleOptions:{fillStyle:K()}}),v=X(()=>{a.clearRect(0,0,s,r),u&&(o.x=tn(o.x,u.x,.05),o.y=tn(o.y,u.y,.05)),o.render(a)});W(()=>{h(),p(),v()})}),(n,s)=>(O(),T("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),xt="/demo/assets/imgs/display-IdleEMXt.png",yt={codes:[{name:"index.vue",code:gt,lang:"js"},{name:"ball.ts",code:on,lang:"ts"}],component:vt,display:xt,title:"缓动追逐",descriptions:""},bt=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, rafLoop, setElement, drawCycle, randomHexColor, randomBetween, looseEqual, distance } from '@thing772/utils'
import { debounce } from 'lodash-es'
import { Comet, type CometOptions } from '@/utils/class/comet'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ctx: CanvasRenderingContext2D
let w = window.innerWidth, h = window.innerHeight

useGui({
  查看源码() {
    emit("check-source")
  },
})

let stopRafLoop: (() => void) | undefined;

const canvasRef = ref()

function setCanvasSize() {
  w = window.innerWidth
  h = window.innerHeight
  Object.assign(canvasRef.value, {
    width: w,
    height: h
  })
}

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  const uninstallResize = registEvent(window, 'resize', debounce(setCanvasSize, 100))
  setCanvasSize()

  setElement(canvas, { 'background-color': '#0d0d0d' })

  onUnmounted(() => {
    uninstallResize()
    if (stopRafLoop) stopRafLoop()
  })

  type Node = {
    x: number;
    y: number;
    r: number;
    opacity: number;
    color: string;
  }

  type WidgetComet = Comet<CometOptions, Node> & { flag?: boolean; }
  let comets = [] as WidgetComet[]

  function start() {
    if (stopRafLoop) stopRafLoop()
    stopRafLoop = rafLoop(() => {
      ctx.clearRect(0, 0, w, h)
      console.debug("comets个数", comets.length)
      if (comets.length == 0) {
        stopRafLoop = void 0
        return false
      }
      comets.forEach(comet => {
        comet.render(ctx)
        comet.update()
      })
    })
  }

  registEvent(canvas, "mouseup", (e) => {
    const { offsetX, offsetY } = e as MouseEvent

    let count = 10
    let deg = 0
    for (let index = 0; index < count; index++, deg += 360 / count) {
      let v = randomBetween(5, 10)
      let a = randomBetween(0.01, 0.1, false)
      let r = randomBetween(v / 2, v)
      let decayR = r / 10
      let decayOpacity = randomBetween(0.1, 0.2, false)
      let R = Math.min(w / 2, h / 2)

      let options = {
        x: offsetX,
        y: offsetY,
        vy: v * Math.cos(deg),
        vx: v * Math.sin(deg),
        ay: a * Math.cos(deg) + randomBetween(0.5, 1),
        ax: a * Math.sin(deg),
      }
      let comet = new Comet<CometOptions, Node>(options) as WidgetComet
      comet.children = [{
        x: options.x,
        y: options.y,
        r,
        opacity: randomBetween(0.5, 1, false),
        color: randomHexColor()
      }]

      comet.draw = (ctx, node) => {
        const { x, y, opacity, r, color } = node
        drawCycle(ctx, x, y, r, {
          fillStyle: color,
          globalAphoa: opacity
        })
      }

      comet.updateNode = (node) => {
        node.r -= decayR
        node.opacity -= decayOpacity
        if (node.r < 0 || node.opacity < 0) return false
      }

      comet.continue = function () {
        if (this.flag === false) return false
        if (distance({ x: offsetX, y: offsetY }, this.children[0]) > R) {
          return this.flag = false
        }
        let yFlag = looseEqual(this.vy, 0, 0.2)
        let xFlag = looseEqual(this.vx, 0, 0.2)
        this.flag = !(yFlag && xFlag)
        return this.flag
      }

      comet.onAllDone = function () {
        let index = comets.findIndex(item => item == comet)
        if (index != -1) {
          comets.splice(index, 1)
        }
      }
      comets.push(comet)
    }



    start()
  })

  start()
})

<\/script>

<style scoped>
canvas {
  cursor: pointer;
}
</style>
`;class wt{constructor(e){C(this,"x",0);C(this,"y",0);C(this,"vx",0);C(this,"vy",0);C(this,"ax",0);C(this,"ay",0);C(this,"maxLength",100);C(this,"children",[]);Object.assign(this,e)}draw(e,i){throw Error("需要重写draw方法")}updateNode(e){throw Error("需要重写updateNode方法")}continue(){return!0}update(){let e=[];if(this.maxLength>this.children.length&&this.continue()){let i={...this.children[0]};i.x+=this.vx,i.y+=this.vy,this.vx+=this.ax,this.vy+=this.ay,e.push(i)}if(this.children.length!=0){for(let i of this.children){if(this.updateNode(i)===!1)break;e.push(i)}this.children=e,e.length==0&&this.onAllDone()}}onAllDone(){console.debug("彗星节点全部消失")}render(e){if(this.children.length!=0)for(let i of this.children)this.draw(e,i)}}const _t=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t,n=window.innerWidth,s=window.innerHeight;z({查看源码(){i("check-source")}});let r;const u=S();function a(){n=window.innerWidth,s=window.innerHeight,Object.assign(u.value,{width:n,height:s})}return A(()=>{const h=u.value;t=h.getContext("2d");const p=N(window,"resize",fn(a,100));a(),nn(h,{"background-color":"#0d0d0d"}),W(()=>{p(),r&&r()});let o=[];function v(){r&&r(),r=X(()=>{if(t.clearRect(0,0,n,s),console.debug("comets个数",o.length),o.length==0)return r=void 0,!1;o.forEach(d=>{d.render(t),d.update()})})}N(h,"mouseup",d=>{const{offsetX:c,offsetY:f}=d;let x=10,g=0;for(let m=0;m<x;m++,g+=360/x){let w=k(5,10),y=k(.01,.1,!1),_=k(w/2,w),B=_/10,I=k(.1,.2,!1),E=Math.min(n/2,s/2),b={x:c,y:f,vy:w*Math.cos(g),vx:w*Math.sin(g),ay:y*Math.cos(g)+k(.5,1),ax:y*Math.sin(g)},R=new wt(b);R.children=[{x:b.x,y:b.y,r:_,opacity:k(.5,1,!1),color:Z()}],R.draw=(M,F)=>{const{x:j,y:$,opacity:D,r:J,color:se}=F;ge(M,j,$,J,{fillStyle:se,globalAphoa:D})},R.updateNode=M=>{if(M.r-=B,M.opacity-=I,M.r<0||M.opacity<0)return!1},R.continue=function(){if(this.flag===!1)return!1;if(En({x:c,y:f},this.children[0])>E)return this.flag=!1;let M=sn(this.vy,0,.2),F=sn(this.vx,0,.2);return this.flag=!(M&&F),this.flag},R.onAllDone=function(){let M=o.findIndex(F=>F==R);M!=-1&&o.splice(M,1)},o.push(R)}v()}),v()}),(h,p)=>(O(),T("canvas",{ref_key:"canvasRef",ref:u},null,512))}}),Ct=L(_t,[["__scopeId","data-v-7122bfc3"]]),Rt=`export type CometOptions = {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  ax?: number;
  ay?: number;
}

export type Pos = { x: number; y: number; }

/**
 * 彗星对象，
 * 需要重写draw方法
 */
export class Comet<T extends CometOptions = CometOptions, N extends Pos = Pos> {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  ax = 0;
  ay = 0;
  maxLength = 100

  children = [] as N[]

  constructor(options: T) {
    Object.assign(this, options)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  draw(ctx: CanvasRenderingContext2D, node: N) {
    throw Error("需要重写draw方法")
  }

  /**
   * 计算更新节点属性
   * @param node 节点
   * @returns {false|void} 返回false，表示节点以及后续节点无需更新可以舍弃
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateNode(node: N): false | void {
    throw Error('需要重写updateNode方法')
  }

  /**
   * 计算是否还可以添加新的头节点
   * @returns {boolean} 返回true表示可以继续增加（当子节点长度在maxLength内时），false表示不能增加了
   */
  continue() {
    return true
  }

  update() {
    let arr = [] as typeof this.children
    if (this.maxLength > this.children.length && this.continue()) {
      let clone = { ...this.children[0] }
      clone.x += this.vx
      clone.y += this.vy
      this.vx += this.ax
      this.vy += this.ay
      arr.push(clone)
    }

    if (this.children.length == 0) return
    for (let item of this.children) {
      let ret = this.updateNode(item)
      if (ret === false) {
        break
      }
      arr.push(item)
    }

    this.children = arr
    if (arr.length == 0) {
      this.onAllDone()
    }
  }

  onAllDone() {
    console.debug("彗星节点全部消失")
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.children.length == 0) return
    for (let item of this.children) {
      this.draw(ctx, item)
    }
  }
}
`,St="/demo/assets/imgs/display-pbycchxW.png",kt={codes:[{name:"index.vue",code:bt,lang:"js"},{name:"comet.ts",code:Rt,lang:"js"}],component:Ct,display:St,title:"点击烟花效果",descriptions:""},Bt=`<template>
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
`,Mn=`import { rafLoop, updateBallVelocityInRect, isFunc } from '@thing772/utils'
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
`;function Tn(l){const{canvas:e,ballsNum:i,createBallFac:t,onBallUpdate:n,speedDecay:s,preRender:r,postRender:u}=l;let a=e.width,h=e.height;const p=e.getContext("2d");let o=[];const v=On(t);function d(y){o=v(y),f()}function c(y){Object.assign(e,y),a=y.width,h=y.height,f()}function f(y){o.forEach(_=>{zn(y)&&y(_),_.render(p)})}function x(){p.clearRect(0,0,a,h);for(const y of o)zn(n)?n(y):(y.update(),ve(y,{wBox:[0,a],hBox:[0,h],speedDecay:s}));r==null||r(o,p),o.forEach(y=>y.render(p)),u==null||u(o,p)}function g(y){p.clearRect(0,0,a,h),f(y)}d(i);let m;function w(){return m&&m(),m=X(()=>{x()})}return{start:w,setBallNum:d,setSize:c,render:x,updateBalls:g}}const Et=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t=80,n=1,s=3,r=3,u=100,a;z({小球个数:{value:[t,1,1e3,10],onFinishChange(d){t=d,o.setBallNum(d)}},小球半径上限:{value:[n,1,100,1],onFinishChange(d){n=d,o.updateBalls(c=>{c.r=k(1,d)})}},小球x方向移动速度上限:{value:[s,1,15,.5],onFinishChange(d){s=d,o.updateBalls(c=>{c.vx=k(1,d)})}},小球y方向移动速度上限:{value:[r,1,15,.5],onFinishChange(d){r=d,o.updateBalls(c=>{c.vy=k(1,d)})}},小球连接范围阈值:{value:[u,50,300,1],onFinishChange(d){u=d}},查看源码(){i("check-source")}});let h;const p=S();let o,v;return A(()=>{const d=p.value;let c=innerWidth,f=innerHeight;Object.assign(d,{width:c,height:f}),o=Tn({canvas:d,ballsNum:t,createBallFac:()=>new Q({x:k(10,c-10),y:k(10,f-10),r:k(1,n),vx:k(1,s),vy:k(1,r),styleOptions:{fillStyle:K()}}),preRender(m,w){a||(a=wn(w,{strokeStyle:K(),lineWidth:1})),v&&(m=m.concat(v));for(let y=0;y<m.length;y++)for(let _=y+1;_<m.length;_++){const B=m[y],I=m[_];En(B,I)<u&&a(B,I)}v&&m.pop()}});const x=N(window,"resize",()=>{c=innerWidth,f=innerHeight,o.setSize({width:c,height:f})},{immediate:!0}),g=N(d,"mousemove",m=>{v={x:m.offsetX,y:m.offsetY}},{needLog:!0});h=o.start(),W(()=>{x(),g(),h&&h()})}),(d,c)=>(O(),T("canvas",{ref_key:"canvasRef",ref:p},null,512))}}),jt="/demo/assets/imgs/display-y86Fu395.png",Ft={codes:[{name:"index.vue",code:Bt,lang:"js"},{name:"wander-balls.ts",code:Mn,lang:"ts"},{name:"ball.ts",code:on,lang:"ts"}],component:Et,display:jt,title:"粒子小球连线",descriptions:""},It=`<template>
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
`,Ot=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e,t=S();let n=innerWidth,s=innerHeight,r;const u=(c,f)=>Math.sin(5*c+.001*f)+Math.cos(10*c+.005*f);let a=S(""),h=u,p=300,o=1,v=K();function d(){h=new Function("x","t",`return ${a.value}`);try{h(0,0)}catch(c){_n({showClose:!0,message:c.message,type:"error",grouping:!0})}}return A(()=>{const c=t.value,f=c.getContext("2d");z({采样率设置:{value:[p,10,1e3,10],onFinishChange(m){p=m}},曲线粗细设置:{value:[o,1,10,1],onFinishChange(m){o=m}},曲线颜色设置:{value:[v],isColor:!0,onFinishChange(m){v=m}},查看源码(){i("check-source")}}),r=$n({canvas:c,ctx:f,width:n,height:s});const x=X(m=>{f.clearRect(0,0,n,s),r.setup(),r.draw(w=>{let y=0;try{y=h(w,m)}catch{}return y},{rate:p,style:{strokeStyle:v,lineWidth:o},label:{name:h.toString().replace(/ anonymous/,""),pos:{x:100,y:100}}})}),g=N(window,"resize",()=>{n=innerWidth,s=innerHeight,r=$n({canvas:c,ctx:f,width:n,height:s})});W(()=>{g(),x()})}),(c,f)=>{const x=Fn;return O(),T(U,null,[V("canvas",{ref_key:"canvasRef",ref:t},null,512),G(x,{class:"input",modelValue:Y(a),"onUpdate:modelValue":f[0]||(f[0]=g=>bn(a)?a.value=g:a=g),placeholder:"参数:（x:x坐标，t：时间参数），输入x和t的表达式",size:"large",onKeyup:jn(d,["enter"])},null,8,["modelValue"])],64)}}}),Mt=L(Ot,[["__scopeId","data-v-926767a5"]]),Tt="/demo/assets/imgs/display-BsbAITaj.png",Pt={codes:[{name:"index.vue",code:It,lang:"js"}],component:Mt,display:Tt,title:"笛卡尔坐标系函数绘制",descriptions:""},zt=`<template>
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
`;function*Gn(l,e,i,t){const n=[{...l}],s=[],r={...e},u={};let a;const h=c=>{u[d(c)]=!0,s.push({...c})},p=()=>{const c=n.shift();return delete u[d(c)],c},o=c=>{c.forEach(f=>{u[d(f)]=!0}),n.unshift(...c)},v=(c,f)=>{if(!(c>i||f>t||c<0||f<0))return{x:c,y:f}},d=c=>`${c.x}-${c.y}`;for(;n.length>0;){if(a&&h(a),a=p(),a.x==r.x&&a.y==r.y)return{current:a,visited:[...s],pending:[...n]};const c=v(a.x,a.y-1),f=v(a.x+1,a.y),x=v(a.x,a.y+1),g=v(a.x-1,a.y);let m=[c,f,x,g].filter(Boolean);m=m.filter(w=>!u[d(w)]),m.forEach(w=>{w.parent=a}),m.length!=0&&(o(m),yield{current:a,visited:[...s],pending:[...n]})}}function $t(l,e,i,t){const n=[{...l}],s=[],r={...e},u={};let a;const h=c=>{u[d(c)]=!0,s.push({...c})},p=()=>{const c=n.shift();return delete u[d(c)],c},o=c=>{c.forEach(f=>{u[d(f)]=!0}),n.unshift(...c)},v=(c,f)=>{if(!(c>i||f>t||c<0||f<0))return{x:c,y:f}},d=c=>`${c.x}-${c.y}`;for(;n.length>0;){if(a&&h(a),a=p(),a.x==r.x&&a.y==r.y)return{current:a,visited:[...s],pending:[...n]};const c=v(a.x,a.y-1),f=v(a.x+1,a.y),x=v(a.x,a.y+1),g=v(a.x-1,a.y);let m=[c,f,x,g].filter(Boolean);m=m.filter(w=>!u[d(w)]),m.forEach(w=>{w.parent=a}),m.length!=0&&o(m)}}const Dt=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t,n,s,r,u,a,h;const p=S("#c5afbb"),o=S(30),v=S(),d=yn({x:20,y:10}),c=yn({x:0,y:0}),f=b=>{const R=v.value;s=an(innerWidth,o.value),r=an(innerHeight,o.value),R.width=s,R.height=r,t=s/o.value-1,n=r/o.value-1,b==null||b();const M=h.helpers.getControllerByKey,F={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:n,setValue:d.y},设置终点X:{max:t,setValue:c.x},设置终点Y:{max:n,setValue:c.y}};for(const j in F){const $=M(j),D=F[j];for(const J in D)$[J](D[J])}};H([v,p],([b,R])=>{nn(b,{"background-color":R})}),H(o,()=>{y.value=0,f(),w()});const x=(b,R,M)=>{a.save(),Object.assign(a,M),a.fillRect(b*o.value,R*o.value,o.value,o.value),a.restore()},g=(b,R)=>{x(b,R,{fillStyle:"red"})},m=(b,R)=>{x(b,R,{fillStyle:"green"})},w=b=>{const R=v.value;a.clearRect(0,0,s,r),qn({width:s,height:r,gridSize:o.value,canvas:R,ctx:a,lineWidth:1,gridLineColor:"#fff"}),typeof b=="function"&&b(),g(d.x,d.y),m(c.x,c.y)};H([d,c],()=>{w(),y.value=0,u=Gn(d,c,t,n)});const y=Qn(),_=un();function B(b){const{current:R,pending:M,visited:F}=b;w(()=>{x(R.x,R.y,{fillStyle:"gold"}),M.forEach(j=>{const{x:$,y:D}=j;x($,D,{fillStyle:"pink"})}),F.forEach(j=>{const{x:$,y:D}=j;x($,D,{fillStyle:"black"})})})}function I(b){for(;b;)x(b.x,b.y,{fillStyle:"blue"}),b=b.parent;g(d.x,d.y),m(c.x,c.y)}H(_,b=>{const{value:R,done:M}=b;M&&!R||(B(R),M&&I(R.current))});const E=()=>{h=z({设置背景色:{value:[p.value],isColor:!0,onFinishChange(b){p.value=b}},网格大小设置:{value:[o.value,5,50,1],onFinishChange(b){o.value=b}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(b){d.x=b}},设置起始点Y:{value:[d.y,0,n,1],onFinishChange(b){d.y=b}},设置终点X:{value:[c.x,0,t,1],onFinishChange(b){c.x=b}},设置终点Y:{value:[c.y,0,n,1],onFinishChange(b){c.y=b}},自动dfs迭代(){u&&(y.value=0,y.value=setInterval(()=>{const b=u.next();_.value=b,b.done&&(y.value=0)},100))},dfs巡路(){console.time("dfs寻路耗时"),y.value=0;const b=$t(d,c,t,n);if(!b)throw Error("没有找到终点");console.timeEnd("dfs寻路耗时"),w(()=>{I(b.current)})},查看源码(){i("check-source")}})};return A(()=>{a=v.value.getContext("2d"),E(),f(()=>{Object.assign(c,{x:~~(t/2),y:~~(n/2)})}),u=Gn(d,c,t,n)}),(b,R)=>(O(),T("canvas",{ref_key:"canvasRef",ref:v},null,512))}}),At="/demo/assets/imgs/display-BRS54xHs.png",Nt=`export type Index = { x: number; y: number }
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
`,Wt={codes:[{name:"index.vue",code:zt,lang:"js"},{name:"dfs.ts",code:Nt,lang:"ts"}],component:Dt,display:At,title:"canvas网格——深度优先搜索",descriptions:""},Lt=`<template>
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
`;class Zn{constructor(e){C(this,"x",0);C(this,"y",0);C(this,"tx",0);C(this,"ty",0);C(this,"color","pink");C(this,"name","");C(this,"fx",.01);C(this,"fy",.01);C(this,"onDone");C(this,"r",0);C(this,"size",0);C(this,"done",!1);Object.assign(this,e)}update(){var t;const{tx:e,ty:i}=this;if(!this.done)return this.x=tn(this.x,e,this.fx),this.y=tn(this.y,i,this.fy),sn(this.x,this.tx)&&sn(this.y,this.ty)&&(this.done=!0,(t=this.onDone)==null||t.call(this)),this}render(e){const{color:i,x:t,y:n,size:s,r}=this;e.save(),Object.assign(e,{fillStyle:i}),e.beginPath(),s>0?e.fillRect(t,n,s,s):r>0?e.arc(t,n,r,0,Math.PI*2):e.arc(t,n,2,0,Math.PI*2),e.fill(),e.restore()}}const Vn=20,Ht=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t=20,n=30,s=10,r=0,u=0,a=25,h=25,p="#53e953",o=[],v,d=50;function c(){o=[];for(let y=0;y<t;y++)for(let _=0;_<n;_++){const B=-1*(n-1-_)*h+r/2+(n-1)*h/2,I=-1*(t-1-y)*a+u/2+(t-1)*a/2,E=new Zn({x:B,y:I,tx:B,ty:I,r:s,fx:k(.01,.5,!1),fy:k(.01,.5,!1),color:p});E.originPos={x:B,y:I},o.push(E)}}function f(y){o.forEach(_=>{Object.assign(_,y)})}z({球阵列行数:{value:[t,1,50,1],onFinishChange(y){t=y,c()}},球阵列列数:{value:[n,1,50,1],onFinishChange(y){n=y,c()}},球阵列列间距:{value:[h,6,50,2],onFinishChange(y){h=y,c()}},球阵列行间距:{value:[a,6,50,2],onFinishChange(y){a=y,c()}},影响半径:{value:[d,10,500,1],onFinishChange(y){d=y,c()}},小球半径:{value:[s,4,100,1],onFinishChange(y){s=y,f({r:s}),w()}},球颜色:{value:[p],isColor:!0,onFinishChange(y){p=y,f({color:y})}},查看源码(){i("check-source")}});const x=S(),g=()=>{r=an(innerWidth,Vn),u=an(innerHeight,Vn),Object.assign(x.value,{width:r,height:u})};let m;const w=()=>{if(m)for(const y of o){const{originPos:_}=y;if(ye(m,d,_)){const B=d-En(m,_),I=rn(_,In(m,_),B*(B/d));Object.assign(y,{tx:I.x,ty:I.y,done:!1})}else Object.assign(y,{tx:_.x,ty:_.y,done:!1})}};return A(()=>{const y=x.value;v=y.getContext("2d");const _=N(window,"resize",xe(()=>{g(),c()},100),{immediate:!0}),B=N(y,"mousemove",E=>{const{offsetX:b,offsetY:R}=E;m?(m.x=b,m.y=R):m={x:b,y:R},w()});nn(y,{"background-color":"#0d0d0d"}),c();const I=X(()=>{v.clearRect(0,0,r,u);for(const E of o)E.update(),E.render(v)});W(()=>{_(),I(),B()})}),(y,_)=>(O(),T("canvas",{ref_key:"canvasRef",ref:x},null,512))}}),Gt=L(Ht,[["__scopeId","data-v-04ab409b"]]),Jn=`import { iterateEaseFromTo, looseEqual } from '@thing772/utils'

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
`,Vt="/demo/assets/imgs/display-D8ZXnX54.png",qt={codes:[{name:"index.vue",code:Lt,lang:"js"},{name:"particle.ts",code:Jn,lang:"js"}],component:Gt,display:Vt,title:"鼠标滑过小球堆的效果",descriptions:""},Xt=`<template>
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
`,Yt=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;z({查看源码(){i("check-source")}});const t=S();return A(()=>{const n=t.value;let s,r,u;const a=n.getContext("2d"),h=N(window,"resize",()=>{Object.assign(n,{width:s=innerWidth,height:r=innerHeight})},{immediate:!0}),p=N(n,"mousemove",function(g){u={x:g.offsetX,y:g.offsetY}}),o=[new Q({r:50,x:s/2-80,y:r/2,styleOptions:{fillStyle:K()}}),new Q({r:50,x:s/2+80,y:r/2,styleOptions:{fillStyle:K()}})],v=o.map(g=>new Q({r:g.r/4,x:g.x,y:g.y,styleOptions:{fillStyle:K()}})),d=new Q({r:200,x:s/2,y:r/2,styleOptions:{fillStyle:"#E6A23C"}}),c=wn(a,{strokeStyle:"#fff",lineWidth:"10",lineCap:"round"}),f=.05,x=X(()=>{a.clearRect(0,0,s,r),d.render(a),o.forEach(g=>{g.render(a)}),v.forEach((g,m)=>{if(u){const w=g.x=tn(g.x,u.x,f),y=g.y=tn(g.y,u.y,f),_=o[m],B={x:_.x,y:_.y,r:_.r-10};if(!be(B,g)){g.x=w,g.y=y;const I=we(B,u);Object.assign(g,Xn(B,I,B.r-g.r))}}g.render(a)}),c({x:s/2-50,y:r/2+100},{x:s/2+50,y:r/2+100})});W(()=>{h(),p(),x()})}),(n,s)=>(O(),T("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),Kt="/demo/assets/imgs/display-BcjSOcDf.png",Ut={codes:[{name:"index.vue",code:Xt,lang:"js"},{name:"ball.ts",code:on,lang:"ts"}],component:Yt,display:Kt,title:"会动的眼球",descriptions:""},Qt=`<template>
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
`,Zt=`import { Ball } from '@/utils/class/ball'
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
`;function Jt(l){const{canvas:e,num:i,onAllStopped:t}=l,n=e.getContext("2d");let s=e.width,r=e.height,u=[],a=!1,h=!1;const p=On(()=>new Q(o()));function o(){return{x:k(10,s-10),y:k(10,r-10),r:4,ax:0,ay:k(.1,2,!1),vx:0,vy:k(1,3),styleOptions:{fillStyle:K()},stopped:!1}}function v(m){u=p(m)}function d(){for(const m of u)m.reset().set(o());if(h=!1,!a)return g()}function c(m){Object.assign(e,m),s=m.width,r=m.height}function f(m){return m.stopped||sn(m.vy,0,1)&&sn(m.y+m.r,r,1)}function x(){if(u.length!=0){n.clearRect(0,0,s,r);for(const m of u)if(m.update(),m.y+m.r>r&&(m.y=r-m.r,m.vy*=-.7),m.render(n),f(m)&&(m.stopped=!0,u.every(f))){a=!1,h=!0;try{t==null||t()}catch(w){console.error(w)}return!1}}}v(i);function g(){if(a)return;a=!0,h&&d();const m=X(x);return()=>{a&&(a=!1,m())}}return{start:g,reset:d,setBallsNum:v,setSize:c,render:x}}const ns=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t=100;const n=S(),{helpers:{getControllerByKey:s}}=z({小球个数:{value:[t,1,1e3,10],onFinishChange(h){t=h,u.setBallsNum(h)}},开始(){const h=u.start();h&&(n.value=h)},暂停:{value:[function(){n.value()}],disable:!n.value},重置(){const h=u.reset();h&&(n.value=h)},查看源码(){i("check-source")}});H(n,h=>{s("暂停").enable(!!h)});const r=S();let u;function a(){_n({showClose:!0,message:"所有小球都停止运动了",type:"success",grouping:!0})}return A(()=>{const h=r.value;Object.assign(h,{width:innerWidth,height:innerHeight}),u=Jt({num:t,canvas:h,onAllStopped:a});const p=N(window,"resize",()=>{u.setSize({width:innerWidth,height:innerHeight})},{immediate:!0});u.render(),W(()=>{p(),n.value&&n.value()})}),(h,p)=>(O(),T("canvas",{ref_key:"canvasRef",ref:r},null,512))}}),es="/demo/assets/imgs/display-DOU4TeMC.png",ts={codes:[{name:"index.vue",code:Qt,lang:"js"},{name:"falling-balls.ts",code:Zt,lang:"ts"},{name:"ball.ts",code:on,lang:"ts"}],component:ns,display:es,title:"下落的小球",descriptions:""},ss=`<template>
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
`,as=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t=100,n=20,s=20,r=17,u=.01;z({小球个数:{value:[t,1,1e3,10],onFinishChange(o){t=o,p.setBallNum(o)}},小球半径上限:{value:[n,4,100,1],onFinishChange(o){n=o,p.updateBalls(v=>{v.r=k(4,o)})}},小球x方向移动速度上限:{value:[s,1,15,.5],onFinishChange(o){s=o,p.updateBalls(v=>{v.vx=k(1,o)})}},小球y方向移动速度上限:{value:[r,1,15,.5],onFinishChange(o){r=o,p.updateBalls(v=>{v.vy=k(1,o)})}},小球摩擦力因子:{value:[u,0,3,.1],onFinishChange(o){u=o,p.updateBalls(v=>{v.friction=k(0,o)})}},开始(){a&&a(),a=p.start()},查看源码(){i("check-source")}});let a;const h=S();let p;return A(()=>{const o=h.value;let v,d;Object.assign(o,{width:v=innerWidth,height:d=innerHeight}),p=Tn({canvas:o,ballsNum:t,createBallFac:()=>{const f={x:k(10,v-10),y:k(10,d-10),r:k(1,n),vx:k(1,s),vy:k(1,r),styleOptions:{fillStyle:K()},friction:k(0,u)};return new Q(f)},onBallUpdate(f){f.vx>=.01&&(f.vx-=f.friction,f.x+=f.vx),f.vy>=.01&&(f.vy-=f.friction,f.y+=f.vy),f.x>v+f.r&&(f.x=-f.r),f.y>d+f.r&&(f.y=-f.r)}});const c=N(window,"resize",()=>{p.setSize({width:v=innerWidth,height:d=innerHeight})},{immediate:!0});W(()=>{c(),a&&a()})}),(o,v)=>(O(),T("canvas",{ref_key:"canvasRef",ref:h},null,512))}}),is="/demo/assets/imgs/display-BaZn1eIe.png",os={codes:[{name:"index.vue",code:ss,lang:"js"},{name:"wander-balls.ts",code:Mn,lang:"ts"},{name:"ball.ts",code:on,lang:"ts"}],component:as,display:is,title:"运动减速",descriptions:""},rs=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, rafLoop, setElement, randomHexColor, } from '@thing772/utils'
import { debounce } from 'lodash-es'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ctx: CanvasRenderingContext2D
let w = window.innerWidth, h = window.innerHeight

let times = ref(2)
let color = ref(randomHexColor())
let blur = ref(8)
let animation = ref(false)

useGui({
  查看源码() {
    emit("check-source")
  },
  发光程度: {
    value: [times.value, 1, 20, 1],
    onFinishChange(v: number) {
      times.value = v
    }
  },
  发光颜色: {
    isColor: true,
    value: [color.value],
    onFinishChange(n: string) {
      color.value = n
    }
  },
  扩散: {
    value: [blur.value, 4, 100, 1],
    onFinishChange(n: number) {
      blur.value = n
    }
  },
  光晕动画: {
    value: [animation.value],
    onFinishChange(n: boolean) {
      animation.value = n
    }
  }
})

watch([times, color, blur], () => {
  if (animation.value) return
  draw()
})

watch(animation, (newV) => {
  if (newV) {
    stopRafLoop = rafLoop(() => {
      // console.log("动画中")
      animate(50)
    })
  } else if (stopRafLoop) {
    stopRafLoop()
    stopRafLoop = undefined
  }
})

let stopRafLoop: (() => void) | undefined;

const canvasRef = ref()

function setCanvasSize() {
  w = window.innerWidth
  h = window.innerHeight
  Object.assign(canvasRef.value, {
    width: w,
    height: h
  })

  draw()
}

function glow(draw: () => void, options?: { color?: string, blur?: number, times?: number }) {
  let { color = randomHexColor(), blur = 8, times = 2 } = options ?? {}
  /**
   * shadowBlur 表示阴影半径。当阴影半径增加，阴影的扩散程度扩大，阴影的强烈度下降。
   * 而半径减小时，扩散程度也减小，强度增加。
   * 使用多重阴影，可以使扩散和强度都保持在较理想状态
   */

  for (let i = 0; i < times; i++) {
    ctx.shadowColor = color
    ctx.shadowBlur = blur;
    draw()
  }
  ctx.shadowColor = ""
  ctx.shadowBlur = 0
}

function draw(options?: { blur?: number }) {
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = "white"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.font = "100px Consolas"
  glow(() => {
    ctx.fillText("hello world", w / 2, h / 2)
  }, { color: color.value, times: times.value, blur: options?.blur ?? blur.value })
}

const animate = (function () {
  let blur = 1
  let flag = false
  let stepBlur = 0.2
  return (maxBlur = 20) => {
    if (blur < maxBlur && !flag) blur += stepBlur
    if (blur >= maxBlur && !flag) { flag = true }
    if (blur > 0 && flag) blur -= stepBlur
    if (blur <= 0 && flag) flag = false
    draw({ blur })
  }
})()


onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  const uninstallResize = registEvent(window, 'resize', debounce(setCanvasSize, 100))
  setCanvasSize()
  draw()

  setElement(canvas, { 'background-color': '#0d0d0d' })

  onUnmounted(() => {
    uninstallResize()
    if (stopRafLoop) stopRafLoop()
  })
})

<\/script>

<style scoped>
canvas {
  cursor: pointer;
}
</style>
`,ls=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t,n=window.innerWidth,s=window.innerHeight,r=S(2),u=S(Z()),a=S(8),h=S(!1);z({查看源码(){i("check-source")},发光程度:{value:[r.value,1,20,1],onFinishChange(x){r.value=x}},发光颜色:{isColor:!0,value:[u.value],onFinishChange(x){u.value=x}},扩散:{value:[a.value,4,100,1],onFinishChange(x){a.value=x}},光晕动画:{value:[h.value],onFinishChange(x){h.value=x}}}),H([r,u,a],()=>{h.value||c()}),H(h,x=>{x?p=X(()=>{f(50)}):p&&(p(),p=void 0)});let p;const o=S();function v(){n=window.innerWidth,s=window.innerHeight,Object.assign(o.value,{width:n,height:s}),c()}function d(x,g){let{color:m=Z(),blur:w=8,times:y=2}=g??{};for(let _=0;_<y;_++)t.shadowColor=m,t.shadowBlur=w,x();t.shadowColor="",t.shadowBlur=0}function c(x){t.clearRect(0,0,n,s),t.fillStyle="white",t.textAlign="center",t.textBaseline="middle",t.font="100px Consolas",d(()=>{t.fillText("hello world",n/2,s/2)},{color:u.value,times:r.value,blur:(x==null?void 0:x.blur)??a.value})}const f=function(){let x=1,g=!1,m=.2;return(w=20)=>{x<w&&!g&&(x+=m),x>=w&&!g&&(g=!0),x>0&&g&&(x-=m),x<=0&&g&&(g=!1),c({blur:x})}}();return A(()=>{const x=o.value;t=x.getContext("2d");const g=N(window,"resize",fn(v,100));v(),c(),nn(x,{"background-color":"#0d0d0d"}),W(()=>{g(),p&&p()})}),(x,g)=>(O(),T("canvas",{ref_key:"canvasRef",ref:o},null,512))}}),cs=L(ls,[["__scopeId","data-v-96628a68"]]),us="/demo/assets/imgs/display-CR96GjKV.png",ds={codes:[{name:"index.vue",code:rs,lang:"js"}],component:cs,display:us,title:"发光效果",descriptions:""},hs=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, rafLoop, setElement, drawLine, randomHexColor, interpolateColor, getHelixPoints, helixPointsGenerator, drawHelixCurve } from '@thing772/utils'
import { debounce } from 'lodash-es'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ctx: CanvasRenderingContext2D
let w = window.innerWidth, h = window.innerHeight
let type = ref("颜色渐变螺旋线")
const options = ["普通螺旋线", "颜色渐变螺旋线", "逐渐生成螺旋线"] as const

let times = ref(1)
let degEnd = ref(360 * 5.6)
let degStart = ref(0)

useGui({
  螺旋线: {
    value: [type.value, options],
    onChange(name: typeof options[number]) {
      type.value = name
    }
  },
  "逐渐生成动画参数": [
    {
      "逐渐生成动画速度倍数": {
        value: [times.value, 1, 20, 1],
        onFinishChange(v: number) {
          times.value = v
        }
      },
      "逐渐生成动画的起始角度": {
        value: [degStart.value, 0, 360, 1],
        onFinishChange(v: number) {
          degStart.value = v
        }
      },
      "逐渐生成动画的终止角度": {
        value: [degEnd.value, 0, 360 * 10, 1],
        onFinishChange(v: number) {
          degEnd.value = v
        }
      }
    },
  ],
  查看源码() {
    emit("check-source")
  },
})

let stopRafLoop: (() => void) | undefined;

watch(type, () => {
  draw(ctx)
})

watch([times, degStart, degEnd], () => {
  if (type.value != '逐渐生成螺旋线') return
  draw(ctx)
})

function draw(ctx: CanvasRenderingContext2D) {
  console.log('开始画')
  ctx.clearRect(0, 0, w, h)
  if (stopRafLoop) {
    stopRafLoop()
    stopRafLoop = undefined
  }
  switch (type.value) {
    case '普通螺旋线':
      drawHelix(ctx)
      break

    case '颜色渐变螺旋线':
      const interpolate = interpolateColor(randomHexColor(), randomHexColor())
      if (interpolate) {
        drawHelix2(ctx, interpolate)
      } else {
        drawHelix(ctx)
      }
      break

    case '逐渐生成螺旋线': {
      const interpolate = interpolateColor(randomHexColor(), randomHexColor())
      let pts = helixPointsGenerator({ count: 1000, rStart: 100, rEnd: Math.min(w / 2, h / 2), degStart: degStart.value, degEnd: degEnd.value }, { x: w / 2, y: h / 2 })
      let arr = [] as { x: number; y: number }[]

      stopRafLoop = rafLoop(() => {
        for (let i = 0; i < times.value; i++) {
          const { value, done } = pts.next()
          if (done) {
            stopRafLoop = undefined
            ctx.clearRect(0, 0, w, h)
            drawHelix3(ctx, arr, interpolate)
            return false
          }
          arr.push(value)
        }
        ctx.clearRect(0, 0, w, h)
        drawHelix3(ctx, arr, interpolate)
      })
    }

      break
  }
}

/**
 * 画普通螺旋线
 * @param ctx
 */
function drawHelix(ctx: CanvasRenderingContext2D) {
  const line = drawLine(ctx, { strokeStyle: "pink", lineCap: 'round' })
  line(...getHelixPoints({ count: 1000, rStart: 100, rEnd: Math.min(w / 2, h / 2), degStart: 90, degEnd: 360 }, { x: w / 2, y: h / 2 }))
}

/**
 * 画颜色渐变的螺旋线
 * @param ctx
 * @param interpolate - 颜色渐变插值器
 */
function drawHelix2(ctx: CanvasRenderingContext2D, interpolate: (ratio: number) => string) {
  let pts = getHelixPoints({ count: 1000, rStart: 100, rEnd: Math.min(w / 2, h / 2), degStart: 0, degEnd: 360 * 5.6 }, { x: w / 2, y: h / 2 })
  drawHelixCurve(ctx, pts, {
    onSegmentStyle: (index: number, total: number) => {
      return {
        strokeStyle: interpolate(index / (total - 1)),
        lineWidth: Math.max(1, 10 * (index / (total - 1))),
        lineCap: 'round'
      }
    }
  })
}

function drawHelix3(ctx: CanvasRenderingContext2D, pts: any[], interpolate?: (ratio: number) => string) {
  if (pts.length < 2) return
  if (!interpolate) {
    Object.assign(ctx, { strokeStyle: "pink" })
    drawHelixCurve(ctx, pts)
  } else {
    drawHelixCurve(ctx, pts, {
      onSegmentStyle: (index: number, total: number) => {
        return {
          strokeStyle: interpolate(index / (total - 1)),
          lineWidth: Math.max(1, 10 * (index / (total - 1))),
          lineCap: 'round'
        }
      }
    })
  }

}

const canvasRef = ref()

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')

  const uninstallResize = registEvent(window, 'resize', debounce(() => {
    w = window.innerWidth
    h = window.innerHeight
    Object.assign(canvas, {
      width: w,
      height: h
    })
    draw(ctx)
  }, 100), { immediate: true })

  setElement(canvas, { 'background-color': '#0d0d0d' })

  onUnmounted(() => {
    uninstallResize()
  })
})

<\/script>

<style scoped>
canvas {
  cursor: pointer;
}
</style>
`,fs=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t,n=window.innerWidth,s=window.innerHeight,r=S("颜色渐变螺旋线");const u=["普通螺旋线","颜色渐变螺旋线","逐渐生成螺旋线"];let a=S(1),h=S(360*5.6),p=S(0);z({螺旋线:{value:[r.value,u],onChange(g){r.value=g}},逐渐生成动画参数:[{逐渐生成动画速度倍数:{value:[a.value,1,20,1],onFinishChange(g){a.value=g}},逐渐生成动画的起始角度:{value:[p.value,0,360,1],onFinishChange(g){p.value=g}},逐渐生成动画的终止角度:{value:[h.value,0,360*10,1],onFinishChange(g){h.value=g}}}],查看源码(){i("check-source")}});let o;H(r,()=>{v(t)}),H([a,p,h],()=>{r.value=="逐渐生成螺旋线"&&v(t)});function v(g){switch(console.log("开始画"),g.clearRect(0,0,n,s),o&&(o(),o=void 0),r.value){case"普通螺旋线":d(g);break;case"颜色渐变螺旋线":const m=Dn(Z(),Z());m?c(g,m):d(g);break;case"逐渐生成螺旋线":{const w=Dn(Z(),Z());let y=_e({count:1e3,rStart:100,rEnd:Math.min(n/2,s/2),degStart:p.value,degEnd:h.value},{x:n/2,y:s/2}),_=[];o=X(()=>{for(let B=0;B<a.value;B++){const{value:I,done:E}=y.next();if(E)return o=void 0,g.clearRect(0,0,n,s),f(g,_,w),!1;_.push(I)}g.clearRect(0,0,n,s),f(g,_,w)})}break}}function d(g){wn(g,{strokeStyle:"pink",lineCap:"round"})(...An({count:1e3,rStart:100,rEnd:Math.min(n/2,s/2),degStart:90,degEnd:360},{x:n/2,y:s/2}))}function c(g,m){let w=An({count:1e3,rStart:100,rEnd:Math.min(n/2,s/2),degStart:0,degEnd:2015.9999999999998},{x:n/2,y:s/2});Rn(g,w,{onSegmentStyle:(y,_)=>({strokeStyle:m(y/(_-1)),lineWidth:Math.max(1,10*(y/(_-1))),lineCap:"round"})})}function f(g,m,w){m.length<2||(w?Rn(g,m,{onSegmentStyle:(y,_)=>({strokeStyle:w(y/(_-1)),lineWidth:Math.max(1,10*(y/(_-1))),lineCap:"round"})}):(Object.assign(g,{strokeStyle:"pink"}),Rn(g,m)))}const x=S();return A(()=>{const g=x.value;t=g.getContext("2d");const m=N(window,"resize",fn(()=>{n=window.innerWidth,s=window.innerHeight,Object.assign(g,{width:n,height:s}),v(t)},100),{immediate:!0});nn(g,{"background-color":"#0d0d0d"}),W(()=>{m()})}),(g,m)=>(O(),T("canvas",{ref_key:"canvasRef",ref:x},null,512))}}),ps=L(fs,[["__scopeId","data-v-04ed0a96"]]),ms="/demo/assets/imgs/display-BBE8hmEl.png",gs={codes:[{name:"index.vue",code:hs,lang:"js"}],component:ps,display:ms,title:"螺旋线",descriptions:""},vs=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, rafLoop, setElement, drawLine, randomBetween, ptOffset, loopNGetResult, randomHexColor, angleToPos } from '@thing772/utils'
import { debounce } from 'lodash-es'
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

function setCanvasSize() {
  w = window.innerWidth
  h = window.innerHeight
  Object.assign(canvasRef.value, {
    width: w,
    height: h
  })
}

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  const uninstallResize = registEvent(window, 'resize', debounce(setCanvasSize, 100))

  setCanvasSize()

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
`,xs=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t,n=window.innerWidth,s=window.innerHeight;z({查看源码(){i("check-source")}});let r=100;function u(){return{x:k(0,n,!0),y:k(0,s,!0)}}function a(v,{length:d,step1:c,step2:f}){let x=Z();const g={x:n/2,y:s/2};let m=In(g,v),w=rn(v,m,d);return{draw(y){if(Ln(v.x,0,n)||Ln(v.y,0,s)){v={...g},w=rn(g,m,.1);return}wn(y,{strokeStyle:x,lineWidth:1,lineCap:"round"})(v,w),v=rn(v,m,c),w=rn(w,m,f)}}}function h(v,d,c,f=1e3){return Sn(x=>{let g=Xn(v,x*360/f,d);const m=k(...c.lengthArgs),w=k(...c.step1Args),y=w*+k(.8,1,!1).toFixed(2);return a(g,{length:m,step1:w,step2:y})},f)}const p=S();function o(){n=window.innerWidth,s=window.innerHeight,Object.assign(p.value,{width:n,height:s})}return A(()=>{const v=p.value;t=v.getContext("2d");const d=N(window,"resize",fn(o,100));o(),nn(v,{"background-color":"#0d0d0d"});let c=Sn(()=>{const w=k(1,5),y=k(1,5),_=+k(.8,1,!1).toFixed(2),B=y*_;return a(u(),{length:w,step1:y,step2:B})},r),f=h({x:n/2,y:s/2},Math.min(n,s)/2-100,{step1Args:[.1,2,!1],lengthArgs:[1,20,!1]},100),x=h({x:n/2,y:s/2},Math.min(n,s)/2-200,{step1Args:[.1,2,!1],lengthArgs:[1,20,!1]},100),g=c.concat(f,f,x);const m=X(()=>{t.clearRect(0,0,n,s),g.forEach(w=>{w.draw(t)})});W(()=>{d(),m()})}),(v,d)=>(O(),T("canvas",{ref_key:"canvasRef",ref:p},null,512))}}),ys=L(xs,[["__scopeId","data-v-a8b8d34a"]]),bs="/demo/assets/imgs/display-CmfO_pXK.png",ws={codes:[{name:"index.vue",code:vs,lang:"js"}],component:ys,display:bs,title:"射线效果",descriptions:""},_s=`<template>
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
`,Cs=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t=innerWidth,n=innerHeight,s;const r=S(.01),u=S(.01),a=S(1),h=un(new Nn.Noise(Math.random())),p=S("simplex2"),o=()=>{const d=s.getImageData(0,0,t,n);for(let c=0;c<t;c++)for(let f=0;f<n;f++){const x=~~Math.min(255,Math.abs(h.value[p.value](c*r.value,f*u.value))*a.value*256);d.data[(f*t+c)*4+0]=x,d.data[(f*t+c)*4+1]=x,d.data[(f*t+c)*4+2]=x,d.data[(f*t+c)*4+3]=255}s.putImageData(d,0,0)};z({噪声生成算法:{value:[p.value,["simplex2","perlin2"]],onFinishChange(d){p.value=d}},x方向缩放因子:{value:[r.value,.001,.5,.001],onFinishChange(d){r.value=d}},y方向缩放因子:{value:[u.value,.001,.5,.001],onFinishChange(d){u.value=d}},值放缩因子:{value:[a.value,.01,255,.1],onFinishChange(d){a.value=d}},重新生成随机种子(){h.value=new Nn.Noise(Math.random())},查看源码(){i("check-source")}});const v=S();return A(()=>{const d=v.value;d.width=t,d.height=n,s=d.getContext("2d",{willReadFrequently:!0});const c=N(window,"resize",fn(()=>{t=~~(innerWidth/1),n=~~(innerHeight/1),d.width=t,d.height=n,o()},100)),f=Ce(o);W(()=>{c(),f()})}),(d,c)=>(O(),T("canvas",{ref_key:"canvasRef",ref:v},null,512))}}),Rs="/demo/assets/imgs/display-CsCBxHWH.png",Ss={codes:[{name:"index.vue",code:_s,lang:"js"}],component:Cs,display:Rs,title:"随机噪声",descriptions:""},ks=`<template>
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
`,Bs=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t="#cbc262",n="#fff",s=26,r=10,u=64,a=64;const h=S();let p,o;const v=S("");function d(){f()}z({设置背景色:{value:[t],isColor:!0,onChange(x){t=x,f()}},设置文字颜色:{value:[n],isColor:!0,onChange(x){n=x,f()}},设置文字大小:{value:[s,14,30,1],onChange(x){s=x,f()}},设置尺寸:{value:[u,32,64,1],onChange(x){u=x,a=x,p.width=u,p.height=a,f()}},设置圆角:{value:[r,0,100,1],onChange(x){r=x,f()}},图标下载(){p&&c(p)},查看源码(){i("check-source")}});function c(x){const g=x.toDataURL(),m=document.createElement("a");m.download="icon.png",document.body.appendChild(m),m.href=g,m.click(),document.body.removeChild(m)}function f(){o.clearRect(0,0,u,a),o.save(),o.beginPath(),o.moveTo(r,0),o.lineTo(p.width-r,0),o.quadraticCurveTo(p.width,0,p.width,r),o.lineTo(p.width,p.height-r),o.quadraticCurveTo(p.width,p.height,p.width-r,p.height),o.lineTo(r,p.height),o.quadraticCurveTo(0,p.height,0,p.height-r),o.lineTo(0,r),o.quadraticCurveTo(0,0,r,0),o.closePath(),o.clip(),Object.assign(o,{fillStyle:t}),o.fillRect(0,0,u,a),Object.assign(o,{fillStyle:n,textAlign:"center",textBaseline:"middle",font:`bold ${s}px aria`}),o.fillText(v.value,u/2,a/2+2),o.restore()}return A(()=>{p=h.value,p.width=u,p.height=a,o=p.getContext("2d"),f()}),(x,g)=>{const m=Fn;return O(),T(U,null,[G(m,{class:"input",modelValue:Y(v),"onUpdate:modelValue":g[0]||(g[0]=w=>bn(v)?v.value=w:null),placeholder:"输入ICON中显示的字",size:"large",onKeyup:jn(d,["enter"])},null,8,["modelValue"]),V("canvas",{ref_key:"canvasRef",ref:h},null,512)],64)}}}),Es=L(Bs,[["__scopeId","data-v-894f0b5c"]]),js="/demo/assets/imgs/display-C0bS9oOy.png",Fs={codes:[{name:"index.vue",code:ks,lang:"js"}],component:Es,display:js,title:"简单文字图标生成",descriptions:""},Is=`<template>
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
`;class Os{constructor(e){C(this,"canvas");C(this,"ctx");C(this,"fontSize",200);C(this,"fontFamily","微软雅黑");C(this,"color","pink");C(this,"gap",3);C(this,"alphaThreshold",30);C(this,"w",0);C(this,"h",0);const{canvas:i,ctx:t,fontSize:n,fontFamily:s,color:r,gap:u,alphaThreshold:a}=e;this.canvas=i,this.ctx=t??i.getContext("2d"),n&&(this.fontSize=n),s&&(this.fontFamily=s),r&&(this.color=r),u!=null&&(this.gap=u),a!=null&&(this.alphaThreshold=a),this.w=i.width,this.h=i.height}setSize(e){this.w=e.width,this.h=e.height}_measureText(e){const{ctx:i,fontSize:t,fontFamily:n,color:s,w:r,h:u}=this;i.save(),Object.assign(i,{font:`${t}px ${n}`,fillStyle:s,textBaseline:"bottom"});const a=i.measureText(e);let{width:h}=a;const{actualBoundingBoxAscent:p,actualBoundingBoxDescent:o}=a,v=~~(Math.abs(p)+Math.abs(o));h=~~h,i.fillText(e,0,v);const d=i.getImageData(0,0,h,v).data;return i.clearRect(0,0,r,u),i.restore(),{data:d,width:h,height:v}}getParticles(e){const{data:i,width:t,height:n}=this._measureText(e),{gap:s,alphaThreshold:r,w:u,h:a}=this,h=[],p=[];for(let o=0;o<t;o+=s)for(let v=0;v<n;v+=s){const d=v*t+o,c=i[d*4+0],f=i[d*4+1],x=i[d*4+2],g=i[d*4+3];if(g<=r)continue;const{signal:m,resolve:w}=Re();h.push(m);const y=Se({x:o,y:v},In({x:t/2,y:n/2},{x:u/2,y:a/2}));p.push({tx:y.x,ty:y.y,color:ke(c,f,x,g),onDone:w})}return{particles:p,done:Promise.all(h)}}}const Ms=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e,t=S(),n=S("");let s,r=[],u=3,a="#f00",h=30,p=100,o=1,v=.1,d=.1,c=innerWidth,f=innerHeight;const x=On(()=>new Zn({r:o,x:k(0,c),y:k(0,f),fx:.1,fy:.1}));let g="hello world";function m(y,_){const B=s.getParticles(y);return r=x(B.particles.length).map(I=>(I.done=!1,_&&(I.x=k(0,c),I.y=k(0,f)),I)),r.forEach((I,E)=>Object.assign(I,B.particles[E])),B.done}function w(){n.value&&(g=n.value,m(g,!0))}return A(()=>{const y=t.value,_=y.getContext("2d",{willReadFrequently:!0});Object.assign(y,{width:c,height:f}),s=new Os({canvas:y,ctx:_,gap:u,alphaThreshold:h,color:a}),z({调整文字颜色:{value:[a],isColor:!0,onFinishChange(E){s.color=E,m(g,!0)}},采样alpha过滤阈值:{value:[h,0,100,1],onFinishChange(E){s.alphaThreshold=E,m(g,!0)}},采样间隔调整:{value:[u,1,20,1],onFinishChange(E){s.gap=E,m(g,!0)}},点大小调整:{value:[o,1,20,1],onFinishChange(E){o=E,x.update(b=>b.r=E),m(g,!0)}},x方向缓动因子调整:{value:[v,.01,1,.01],onFinishChange(E){v=E,x.update(b=>b.fx=E),m(g,!0)}},y方向缓动因子调整:{value:[d,.01,1,.01],onFinishChange(E){d=E,x.update(b=>b.fy=E),m(g,!0)}},字体大小调整:{value:[p,50,340,10],onFinishChange(E){p=E,s.fontSize=E,m(g,!0)}},查看源码(){i("check-source")}}),m(g);const B=X(()=>{_.clearRect(0,0,c,f),r.forEach(E=>{E.render(_),E.update()})}),I=N(window,"resize",()=>{c=innerWidth,f=innerHeight,y.width=c,y.height=f,s.setSize({width:c,height:f})});W(()=>{I(),B()})}),(y,_)=>{const B=Fn;return O(),T(U,null,[V("canvas",{ref_key:"canvasRef",ref:t},null,512),G(B,{class:"input",modelValue:Y(n),"onUpdate:modelValue":_[0]||(_[0]=I=>bn(n)?n.value=I:null),placeholder:"请输入内容",size:"large",onKeyup:jn(w,["enter"])},null,8,["modelValue"])],64)}}}),Ts=L(Ms,[["__scopeId","data-v-8c68ef59"]]),Ps=`import { getSignal, ptOffset, getMovePt, rgb } from '@thing772/utils'
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
`,zs="/demo/assets/imgs/display-DOJbIvru.png",$s={codes:[{name:"index.vue",code:Is,lang:"js"},{name:"textParticle.ts",code:Ps,lang:"ts"},{name:"particle.ts",code:Jn,lang:"ts"}],component:Ts,display:zs,title:"文字粒子化",descriptions:""},Ds=`<template>
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
`,As=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t=100,n=20,s=10,r=7;z({小球个数:{value:[t,1,1e3,10],onFinishChange(p){t=p,h.setBallNum(p)}},小球半径上限:{value:[n,4,100,1],onFinishChange(p){n=p,h.updateBalls(o=>{o.r=k(4,p)})}},小球x方向移动速度上限:{value:[s,1,15,.5],onFinishChange(p){s=p,h.updateBalls(o=>{o.vx=k(1,p)})}},小球y方向移动速度上限:{value:[r,1,15,.5],onFinishChange(p){r=p,h.updateBalls(o=>{o.vy=k(1,p)})}},开始(){u&&u(),u=h.start()},查看源码(){i("check-source")}});let u;const a=S();let h;return A(()=>{const p=a.value;let o=innerWidth,v=innerHeight;Object.assign(p,{width:o,height:v}),h=Tn({canvas:p,ballsNum:t,createBallFac:()=>new Q({x:k(10,o-10),y:k(10,v-10),r:k(1,n),vx:k(1,s),vy:k(1,r),styleOptions:{fillStyle:K()}})});const d=N(window,"resize",()=>{o=innerWidth,v=innerHeight,h.setSize({width:o,height:v})},{immediate:!0});h.render(),W(()=>{d(),u&&u()})}),(p,o)=>(O(),T("canvas",{ref_key:"canvasRef",ref:a},null,512))}}),Ns="/demo/assets/imgs/display-BpUGJlnU.png",Ws={codes:[{name:"index.vue",code:Ds,lang:"js"},{name:"wander-balls.ts",code:Mn,lang:"ts"},{name:"ball.ts",code:on,lang:"ts"}],component:As,display:Ns,title:"矩形区域内飘荡的小球",descriptions:""},Ls=`<template>
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
`,Hs={class:"container"},Gs=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e,{obj:t}=z({模糊自身:{value:[!1],onChange(u){n.value=u}},模糊背景:{value:[!1],onChange(u){s.value=u}},查看源码(){i("check-source")}}),n=S(t.模糊自身),s=S(t.模糊背景),r=Bn(()=>["el2",{"blur-self":n.value,"blur-backdrop":s.value}]);return(u,a)=>(O(),T("div",Hs,[a[0]||(a[0]=V("div",{class:"el1"}," 财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人， 较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻） ",-1)),V("div",{class:hn(Y(r))}," 财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。 ",2)]))}}),Vs=L(Gs,[["__scopeId","data-v-bce03b61"]]),qs="/demo/assets/imgs/display-C7z4HTpE.png",Xs={codes:[{name:"index.vue",code:Ls,lang:"js"}],component:Vs,display:qs,title:"css模糊效果",descriptions:""},Ys=`<template>
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
`,Ks=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e,{obj:t}=z({"添加box-shadow":{value:[!1],onChange(a){n.value=a}},添加圆角:{value:[!1],onChange(a){s.value=a}},"添加filter:drop-shadow":{value:[!1],onChange(a){r.value=a}},查看源码(){i("check-source")}}),n=S(t["添加box-shadow"]),s=S(t.添加圆角),r=S(t["添加filter:drop-shadow"]),u=Bn(()=>["container",{"has-shadow-box":n.value,"round-border":s.value,filter:r.value}]);return(a,h)=>(O(),T("div",{class:hn(Y(u))},h[0]||(h[0]=[xn(" 测试文本 "),V("div",{class:"circle"}," 测试文本2 ",-1)]),2))}}),Us=L(Ks,[["__scopeId","data-v-4ee4a0c8"]]),Qs="/demo/assets/imgs/display-CvX0ByRG.png",Zs={codes:[{name:"index.vue",code:Ys,lang:"js"}],component:Us,display:Qs,title:"css box阴影效果",descriptions:""},Js=`<template>
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
`;function na(l){const{data:e=[],getX:i,getY:t,width:n=200,height:s=200,margin:r=[],color:u={},sortY:a=0,xAxis:h={},yAxis:p={},yLegend:o={},hideXTicks:v}=l,[d=60,c=0,f=30,x=30]=r;let g,m;const w=Be("svg").attr("width",n).attr("height",s).attr("viewBox",[0,0,n,s]).style("background-color",u.bg||""),y=w.append("g"),_=w.append("g").attr("transform",`translate(0,${s-f})`),B=w.append("g").attr("transform",`translate(${x},0)`),I=E=>{const b=F=>{if(g=Fe().range([x,n-c]),gn(l.xScale))for(const[j,$]of Object.entries(l.xScale))g[j]($);else g.padding(.2);a>0?g.domain(Ie(F,([j])=>(a==1?1:-1)*t(j),i)):g.domain(F.map(i)),m=Oe().domain([0,Me(F,t)]).range([s-f,d])},R=F=>{F.attr("x",0).attr("y",0).attr("width",g.bandwidth()).attr("height",j=>m(0)-m(t(j))).attr("fill",u.bar||"#409eff")},M=F=>{F.text(j=>j.value).attr("text-anchor","middle").attr("x",g.bandwidth()/2).attr("y",-4)};b(E),y.selectAll("g").data(E).join(F=>F.append("g").attr("transform",j=>`translate(${g(i(j))},${m(t(j))})`).call(j=>{R(j.append("rect")),M(j.append("text"))}),F=>(R(F.select("rect")),M(F.select("text")),F)).attr("transform",F=>`translate(${g(i(F))},${m(t(F))})`),_.call(F=>{const j=Ee(g);j.tickSizeOuter(0);for(const[$,D]of Object.entries(h))j[$](D);j(F)}).call(F=>{v&&F.selectAll(".tick").remove()}),B.call(F=>{const j=je(m);for(const[$,D]of Object.entries(p))j[$](D);j(F)}).call(F=>F.select(".domain").remove()).call(F=>{if(o.text){const j=F.append("text").attr("text-anchor","middle").attr("x",0).attr("y",20);for(const[$,D]of Object.entries(o))$=="text"?j[$](D):j.attr($,D)}})};return I(e),{svg:w.node(),update:I}}function*ea(l,e){pn(e)||(e=Cn),e=e;for(let i=1;i<l.length;i++)for(let t=0;t<l.length-i;t++)e(l[t])>e(l[t+1])&&(dn(l,t,t+1),yield[...l])}function*ta(l,e){pn(e)||(e=Cn),e=e,l=[...l];for(let i=0;i<l.length-1;i++){let t=0;for(let n=0;n<l.length-i;n++)e(l[n])>e(l[t])&&(t=n);dn(l,t,l.length-i-1),yield[...l]}}function*sa(l,e){pn(e)||(e=Cn),l=[...l],e=e;for(let i=0;i<l.length-1;i++)if(e(l[i])>e(l[i+1])){dn(l,i,i+1),yield[...l];let t=i;for(;t>0&&!(e(l[t])>=e(l[t-1]));)dn(l,t,t-1),yield[...l],t--}}function*aa(l,e){pn(e)||(e=Cn);function*i(t,n){if(e=e,t==n)return;const s=Math.floor((t+n)/2);yield*i(t,s),yield*i(s+1,n);const r=u=>l=[...l.slice(0,t),...u,...l.slice(n+1)];if(!(e(l[s])<=e(l[s+1]))){if(e(l[n])<=e(l[t])){yield r([...l.slice(s+1,n+1),...l.slice(t,s+1)]);return}for(let u=1;s+u<=n;u++){let a=s+u;for(;a>t&&!(e(l[a])>=e(l[a-1]));)dn(l,a,a-1),a--,yield[...l]}}}yield*i(0,l.length-1)}const ia={class:"box"},oa=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e,t=S(),n=[{label:"冒泡排序",value:ea},{label:"选择排序",value:ta},{label:"插入排序",value:sa},{label:"归并排序",value:aa}],s=n[0],r=S(s.value);let u;const a=innerWidth-100,h=innerHeight-100;let p=!1,o=20;const v=un([]),d=un();function c(){v.value=ct(o).map((w,y)=>({id:y,value:w})),p=!1,d.value=r.value(v.value,w=>w.value)}H(r,()=>{d.value=r.value(v.value,w=>w.value)});function f(){const{value:w,done:y}=d.value.next();if(p=y,y){_n({showClose:!0,message:"已经排序完毕",type:"success",grouping:!0});return}else v.value=w}const x=S(0);function g(){x.value==0&&((!d.value||p)&&c(),x.value=setInterval(()=>{if(p){clearInterval(x.value),x.value=0;return}f()},m))}H(()=>v.value,w=>{w.length>0?(u||(u=na({width:a,height:h,getX:y=>y.id,getY:y=>y.value}),t.value.appendChild(u.svg)),u.update(w)):u&&(t.value.removeChild(u.svg),u=null)});let m=50;return A(()=>{c();const{helpers:{getAllControllers:w}}=z({选择算法:{value:[s.label,n.map(_=>_.label)],onChange(_){const B=n.find(I=>I.label==_);r.value=B.value}},随机数个数:{value:[o,10,100,1],onFinishChange(_){o=_}},自动开始时间间隔:{value:[m,16,100,5],onFinishChange(_){m=_}},生成随机数:{value:[function(){c()}],disable:x.value!=0},排序下一步:{value:[function(){f()}],disable:!d.value||x.value!=0},自动开始(){g()},查看源码(){i("check-source")}}),y=H(x,_=>{w().forEach(B=>{B.property!="查看源码"&&B.disable(_>0)})});W(()=>{y(),clearInterval(x.value)})}),(w,y)=>(O(),T("div",ia,[V("div",{ref_key:"node",ref:t},null,512)]))}}),ra=L(oa,[["__scopeId","data-v-9858c415"]]),la=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,ca=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,ua=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,da=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,ha="/demo/assets/imgs/display-B3luB7Uf.png",fa={codes:[{name:"index.vue",code:Js,lang:"js"},{name:"bubble.ts",code:la,lang:"ts"},{name:"selection.ts",code:ca,lang:"ts"},{name:"insertion.ts",code:ua,lang:"ts"},{name:"merge.ts",code:da,lang:"ts"}],component:ra,display:ha,title:"排序算法可视化",descriptions:""},pa=`<template>
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
`,ma=`import { easeOutCubic } from './ease'
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
`;function ga(l){return 1-Math.pow(1-l,3)}var ln=(l=>(l[l.NORMAL=0]="NORMAL",l[l.REVERSE=1]="REVERSE",l))(ln||{});function va(l,e){const{startIndex:i=0,speed:t=1,onDone:n,onProcessing:s}=e;let r=i,u,a;const h=c=>{gn(c)&&(a=Math.ceil(800/c))},p=()=>{u&&(cancelAnimationFrame(u),u=0)};h(t);function o(c){p();let f;const{direction:x,speed:g,startIndex:m}=c;h(g),gn(m)&&(r=m);const w=y=>{f||(f=y),y-f>=a&&(x==0?r=(r+1)%l.length:r=r-1>=0?r-1:l.length-1,s(r),f=y),u=requestAnimationFrame(w)};u||(u=requestAnimationFrame(w))}function v(){p()}function d(c){p();let{loopTimes:f=5,targetIndex:x=l.length-1}=c||{};const{direction:g,speed:m,startIndex:w}=c||{};f=Math.max(Math.ceil(Number(f)),1),x=Math.max(0,Math.min(Number(x),l.length-1)),h(m),gn(w)&&(r=w);const y=r;let _;const B=x-y;g==0?_=y+f*l.length+(B>=0?B:l.length+B):_=y-f*l.length+(B<=0?B:-l.length+B);const I=Math.abs(_-y)*a;let E;const b=R=>{E||(E=R);const M=Math.min(1,(R-E)/I);let j=(Math.ceil(ga(M)*(_-y))+y)%l.length;if(j<0&&(j+=l.length),r!=j&&(r=j,s(r)),M==1){n(r),u=0;return}u=requestAnimationFrame(b)};u=requestAnimationFrame(b)}return{wander:o,stop:v,draw:d}}const xa={class:"box"},ya={style:{display:"flex"}},ba=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e,t=S(1),n=[...Array(10)],s={targetIndex:2,loopTimes:2,direction:ln.NORMAL,speed:5},{wander:r,stop:u,draw:a}=va(n,{speed:s.speed,startIndex:t.value,onProcessing:d=>{t.value=d},onDone(d){_n({showClose:!0,message:"已经抽奖完毕",type:"success",grouping:!0}),t.value=d}});function h(){r({...s})}function p(){a({...s})}W(()=>{u(),o&&clearTimeout(o)});let o;function v(){h(),o=setTimeout(()=>{s.targetIndex=Kn(n),p(),o=0},2500)}return z({设定巡航速度:{value:[s.speed,1,10,1],onFinishChange(d){s.speed=d}},设定最终选中项索引:{value:[s.targetIndex,0,n.length-1,1],onFinishChange(d){s.targetIndex=d}},轮转次数:{value:[s.loopTimes,2,20,1],onFinishChange(d){s.loopTimes=d}},轮转方向:{value:[s.direction==ln.NORMAL?"正向":"负向",["正向","负向"]],onChange(d){s.direction=d=="正向"?ln.NORMAL:ln.REVERSE}},开始抽奖:p,开始巡航:h,停止:u,模拟接口返回预制数据:v,查看源码(){i("check-source")}}),(d,c)=>{const f=Yn;return O(),T("div",xa,[G(f,{class:"demo-card",shadow:"always"},{default:q(()=>[V("div",ya,[(O(),T(U,null,cn(n,(x,g)=>V("div",{class:hn(["block",Y(t)==g?"selected":""]),key:g},vn(g),3)),64))])]),_:1})])}}}),wa=L(ba,[["__scopeId","data-v-3b4448e6"]]),_a="/demo/assets/imgs/display-DiF1Sfat.png",Ca={codes:[{name:"index.vue",code:pa,lang:"js"},{name:"draw-price.ts",code:ma,lang:"ts"}],component:wa,display:_a,title:"抽奖",descriptions:""},Ra=`<template>
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
`,Sa="/demo/assets/imgs/018194d9aac11f975e17b274fe4a78af1463731957-BlWzWTpc.png",ka="/demo/assets/imgs/10251358673700483-Bf69morh.jpg",Ba="/demo/assets/imgs/10251358673922612-wa-5hia3.jpg",Ea="/demo/assets/imgs/10251381214893821-DZ0tyfKl.jpg",ja="/demo/assets/imgs/10251381215028477-DT0oxPDL.jpg",Fa="/demo/assets/imgs/10251381215091916-34MSuKPK.jpg",Ia="/demo/assets/imgs/10251381215152314-ZOViud5b.jpg",Oa="/demo/assets/imgs/10251381215208971-BnTSlzDn.jpg",Ma="/demo/assets/imgs/10251381215487222-CyoYfFWR.jpg",Ta="/demo/assets/imgs/10251381215991717-jivRh7vw.jpg",Pa="/demo/assets/imgs/10251381216212847-C6d5iI8I.jpg",za="/demo/assets/imgs/3a5950fc2408a7f8136de8704e1819c21463732075-DT6cAkAt.png",$a="/demo/assets/imgs/48d780d33eaf46a5646376b814b8efa71463731556-CGACL27Z.png",Da="/demo/assets/imgs/554e21161de34506e9cb1ecbcd85716d1463732343-LZH7KjnQ.png",Aa="/demo/assets/imgs/884f9b653e317cc514890954b2e35be81463731323-DvATjqjX.png",Na="/demo/assets/imgs/8a116da0668edebd82af16ecf7e75ace1590566316-Cl-PTpZA.jpg",Wa="/demo/assets/imgs/928d6ec50975da022bda97a1ab8f04c81463731839-d_LHiOEG.png",La="/demo/assets/imgs/a748932756b48bd46a8fd17df4579dea1463732104-DlsyWN-A.png",Ha="/demo/assets/imgs/b5978ead603dcdc66704e721960debe31590565987-4RsIwXgW.jpg",Ga="/demo/assets/imgs/c06f07de280d4edebf801eef4b142c721463731804-DD1ps6p3.png",Va="/demo/assets/imgs/ceb8c078cf6b410d7def183870fe584d1590566557-9BfKn2sf.jpg",qa="/demo/assets/imgs/ea5871bc33e131b497b9bb273890e8ae1463731875-WWF6WmyZ.png",Xa="/demo/assets/imgs/f29af13446f1feed47dcfd299ccaa23c1463732001-DrhlCMaO.png",Ya="/demo/assets/imgs/fef4eadd191c3461054ca60cde8576db1590566398-Bn18syhQ.jpg",Ka={class:"container"},Ua=["src"],Qa=5,Za=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=e;let t=[...Object.values([Sa,ka,Ba,Ea,ja,Fa,Ia,Oa,Ma,Ta,Pa,za,$a,Da,Aa,Na,Wa,La,Ha,Ga,Va,qa,Xa,Ya])];t=S(ut(t,Math.ceil(t.length/Qa))),z({查看源码(){i("check-source")}});function n(r){r.target.classList.add("level-up")}function s(r){r.target.classList.remove("level-up")}return(r,u)=>(O(),T("div",Ka,[(O(!0),T(U,null,cn(Y(t),(a,h)=>(O(),T("div",{class:hn(["hive-row",h%2==1?"odd":""]),onMouseenter:n,onMouseleave:s,key:h},[(O(!0),T(U,null,cn(a,p=>(O(),T("img",{class:"hive-item",src:p,alt:"",key:p},null,8,Ua))),128))],34))),128))]))}}),Ja=L(Za,[["__scopeId","data-v-5a2d0a77"]]),ni="/demo/assets/imgs/display-BVEemRNY.png",ei={codes:[{name:"index.vue",code:Ra,lang:"js"}],component:Ja,display:ni,title:"蜂巢图片",descriptions:""},ti=`<template>
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
`,si=`import { isFunc } from '@/utils/utils'

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
`,ai=`import type { SceneInstance, SceneObj } from "./scene"
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
`;class ii{constructor(e){C(this,"canvas");C(this,"ctx");C(this,"width",0);C(this,"height",0);C(this,"background");C(this,"_t0",0);C(this,"_t1",0);C(this,"_dt",0);C(this,"_objects",[]);C(this,"_raf",0);const{width:i,height:t,canvas:n,background:s}=e;this.canvas=n,this.ctx=n.getContext("2d"),this.background=s??"#000",this.setSize(i,t)}setSize(e,i){this.canvas.width=e,this.canvas.height=i,this.width=e,this.height=i}_render(){const{width:e,height:i,ctx:t,background:n}=this;t.fillStyle=n,t.fillRect(0,0,e,i);for(const s of[...this._objects])s.render(this._dt)}_updateTime(e){this._t0==0&&(this._t0=e),this._dt=e-this._t0}run(e){const i=t=>{this._updateTime(t),pn(e)&&e(this._dt),this._render(),this._raf=requestAnimationFrame(i)};this._raf=requestAnimationFrame(i)}addObj(...e){return e.forEach(i=>{this._objects.find(t=>t==i)||(this._objects.push(i),i.scene=this)}),this}removeObj(e){const i=this._objects.findIndex(t=>t==e);return i!=-1&&(this._objects.splice(i,1),e.scene==this&&(e.scene=null)),this}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._t0=0,this._t1=0,this._dt=0)}}const oi=[...Array(26)].map((l,e)=>["a","A"].map(i=>String.fromCharCode(i.charCodeAt(0)+e))).flat();function ri(){return[...Array(en(8)+2)].map(()=>Un(oi)).join("")}class li{constructor(e){C(this,"_x");C(this,"_y");C(this,"_text");C(this,"_opacity");C(this,"_onDismiss");C(this,"scene");C(this,"_opacityDecay");C(this,"_rawOptions");C(this,"_yStep");C(this,"_font","20px serif");C(this,"_fillStyle","red");const{x:i,y:t,text:n,opacity:s,opacityDecay:r,onDismiss:u,yStep:a}=e;this._x=i,this._y=t,this._text=n,this._opacity=s,this._onDismiss=u,this._opacityDecay=r??.01,this._rawOptions={...e},this._yStep=a??4}setFont(e,i){return this._font=e,this._fillStyle=i,this}render(e){const{_text:i,_x:t,_y:n,_opacityDecay:s,_yStep:r,_fillStyle:u,_font:a}=this,{ctx:h,height:p}=this.scene,o={font:h.font,fillStyle:h.fillStyle,globalAlpha:h.globalAlpha};this._opacity-=typeof s=="number"?s:s(e),this._opacity<0&&(this._opacity=0),h.font=a,h.fillStyle=u,h.globalAlpha=this._opacity;let v=0;const d=n+(typeof r=="number"?r:r(e));for(const c of i){const f=h.measureText(c),{actualBoundingBoxAscent:x,actualBoundingBoxDescent:g}=f,m=g+x;h.fillText(c,t,d-v),v+=m+10}this._y=d,Object.assign(h,o),(this._opacity==0||d-v>p)&&this._onDismiss(this)}}class ci{constructor(e){C(this,"scene");C(this,"num",0);C(this,"maxNum",100);C(this,"colors",["brown","red","green","yellow","chocolate","pink","burlywood","chartreuse","cyan"]);const{scene:i,maxNum:t}=e;this.scene=i,t&&(this.maxNum=t)}addText(){if(this.num<this.maxNum){this.num++;const{width:e,height:i}=this.scene,t=new li({text:ri(),x:en(e),y:en(i),yStep:en(10)+2,opacity:+Math.min(1,Math.random()+.2).toPrecision(2),opacityDecay:.01,onDismiss:n=>{this.scene.removeObj(n),this.num--}}).setFont(`${en(15)+14}px serif`,Un(this.colors));this.scene.addObj(t)}}start(){this.scene.run(()=>{this.addText()})}stop(){this.scene.stop()}}function ui(l,e,i){l.addEventListener("resize",e),W(()=>{l.removeEventListener("resize",e)})}const di={class:"box"},hi=P({__name:"index",emits:["check-source"],setup(l,{emit:e}){const i=S(),t=e;return A(()=>{const n=new ii({width:innerWidth,height:innerHeight,canvas:i.value}),{obj:s}=z({文字串数量:{value:[10,10,200,10],onChange(u){r.maxNum=u}},查看代码:function(){t("check-source")}}),r=new ci({scene:n,maxNum:s.文字串数量});r.start(),ui(window,()=>{n.setSize(innerWidth,innerHeight)}),W(()=>{r.stop()})}),(n,s)=>(O(),T("div",di,[V("canvas",{ref_key:"canvas",ref:i},null,512)]))}}),fi=L(hi,[["__scopeId","data-v-2318ea81"]]),pi="/demo/assets/imgs/display-DwV-CRAI.png",mi={codes:[{name:"index.vue",code:ti,lang:"js"},{name:"scene.ts",code:si,lang:"ts"},{name:"textRain.ts",code:ai,lang:"ts"}],component:fi,display:pi,title:"文字雨",descriptions:""};let mn;function ne(){return mn||(mn=Object.assign({"./demo/canvas/audio-wave/config.ts":rt,"./demo/canvas/bfs/config.ts":mt,"./demo/canvas/chasing/config.ts":yt,"./demo/canvas/comet/config.ts":kt,"./demo/canvas/connect-balls/config.ts":Ft,"./demo/canvas/coord/config.ts":Pt,"./demo/canvas/dfs/config.ts":Wt,"./demo/canvas/effect-1/config.ts":qt,"./demo/canvas/eyeballs/config.ts":Ut,"./demo/canvas/faliling-balls/config.ts":ts,"./demo/canvas/friction/config.ts":os,"./demo/canvas/glow/config.ts":ds,"./demo/canvas/helix/config.ts":gs,"./demo/canvas/line/config.ts":ws,"./demo/canvas/noise/config.ts":Ss,"./demo/canvas/simple-icon/config.ts":Fs,"./demo/canvas/text-particle/config.ts":$s,"./demo/canvas/wander-balls/config.ts":Ws,"./demo/css/blur/config.ts":Xs,"./demo/css/shadow/config.ts":Zs,"./demo/d3/sort/config.ts":fa,"./demo/draw-price/config.ts":Ca,"./demo/hive/config.ts":ei,"./demo/text-rain/config.ts":mi}),mn)}const ee=[];function gi(){const l=ne();for(const e in l){const{codes:i,component:t,title:n}=l[e],s=function(){return Wn(Ze,{codes:i},({checkSource:a})=>Wn(t,{onCheckSource:()=>{a()}}))};s.displayName=`Demo(${e})`;const r=e.replace(/.*\/demo\//,"").replace("/config.ts","").split("/").join("-");l[e].routeName=r,ee.push({path:r,name:r,component:s,meta:{title:n}})}}gi();const vi={path:"/demo",children:ee},xi={class:"common-layout"},yi=P({__name:"index",setup(l){const e=Object.values(ne());return(i,t)=>{const n=$e,s=De,r=Yn,u=ze,a=Pe,h=Te,p=Ae;return O(),T("div",xi,[G(p,{class:"container"},{default:q(()=>[G(h,{class:"main"},{default:q(()=>[G(a,{class:"row",gutter:20},{default:q(()=>[(O(!0),T(U,null,cn(Y(e),o=>(O(),kn(u,{key:o.routeName,span:4},{default:q(()=>[G(r,{class:"demo-card","body-style":{padding:"0px"},shadow:"always",onClick:v=>i.$router.push({name:o.routeName})},{footer:q(()=>[G(s,{tag:"p"},{default:q(()=>[xn(vn(o.title),1)]),_:2},1024),G(s,{tag:"p","line-clamp":2},{default:q(()=>[xn(vn(o.descriptions||"暂无描述"),1)]),_:2},1024)]),default:q(()=>[G(n,{class:"image",src:o.display,fit:"cover"},null,8,["src"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}}}),bi=L(yi,[["__scopeId","data-v-9c137ebc"]]),te=Ne({history:We("/demo/"),routes:[{path:"/",component:bi},vi]});te.beforeEach((l,e,i)=>{document.title=l.meta.title??"my demos",i()});const Pn=Le(qe);Pn.use(He());Pn.use(te);Pn.mount("#app");
