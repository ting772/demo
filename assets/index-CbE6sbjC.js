var Wn=Object.defineProperty;var Ln=(l,n,s)=>n in l?Wn(l,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):l[n]=s;var _=(l,n,s)=>Ln(l,typeof n!="symbol"?n+"":n,s);import{r as Gn,c as vn,o as j,d as z,a as C,b as xn,e as D,P as Hn,f as F,g as G,t as un,n as ln,u as K,h as W,i as qn,w as A,E as Vn,F as X,j as tn,k as Kn,l as Un,m as dn,p as yn,q as Xn,s as Y,v as Yn,x as Qn,y as P,z as H,A as Zn,B as hn,C as L,D as an,G as En,H as Fn,I as V,J,K as Sn,L as Jn,M as k,N as On,O as ne,Q as Cn,R as Tn,S as Mn,T as pn,U as ee,V as te,W as ae,X as fn,Y as Bn,Z as ie,_ as se,$ as le,a0 as re,a1 as oe,a2 as ce,a3 as ue,a4 as de,a5 as he,a6 as fe,a7 as me,a8 as pe,a9 as ge,aa as zn,ab as In,ac as ve,ad as xe,ae as ye,af as be,ag as _e,ah as we,ai as Re,aj as Se,ak as Ce,al as Be}from"./vendor-DHM6-wHl.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();const q=(l,n)=>{const s=l.__vccOpts||l;for(const[t,e]of n)s[t]=e;return s},Ie={};function ke(l,n){const s=Gn("RouterView");return j(),vn(s)}const je=q(Ie,[["render",ke]]),Ee={class:"pre"},Fe=z({__name:"hilight",props:{code:{},lang:{}},setup(l){const n=l,s=C(),t=xn(()=>n.lang?`lang-${n.lang}`:"auto");return D(()=>{Hn.highlightElement(s.value)}),(e,a)=>(j(),F("pre",Ee,[G("code",{class:ln(K(t)),ref_key:"codeRef",ref:s},un(e.code),3)]))}}),Oe={class:"container"},Te={class:"dialog-footer"},Me=z({__name:"codeDemo",props:{codes:{}},setup(l){const n=C(!1);function s(){n.value=!0}return(t,e)=>{const a=Kn,o=Vn,r=Un,i=Xn;return j(),F(X,null,[G("div",Oe,[qn(t.$slots,"default",{checkSource:s},void 0,!0)]),W(i,{modelValue:K(n),"onUpdate:modelValue":e[1]||(e[1]=c=>yn(n)?n.value=c:null),title:"",width:"50vw",top:"50px"},{footer:A(()=>[G("span",Te,[W(r,{type:"primary",onClick:e[0]||(e[0]=c=>n.value=!1)},{default:A(()=>e[2]||(e[2]=[dn("关闭")])),_:1})])]),default:A(()=>[W(o,{type:"border-card"},{default:A(()=>[(j(!0),F(X,null,tn(t.codes,c=>(j(),vn(a,{label:c.name,key:c.name,lazy:""},{default:A(()=>[W(Fe,{code:c.code,lang:c.lang},null,8,["code","lang"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"])],64)}}}),ze=q(Me,[["__scopeId","data-v-65455990"]]),$e=`<template>
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
`,Ne=`import { rafLoop } from '@thing772/utils'

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
`;function De(l,n){const s=new AudioContext;let t=s.createMediaElementSource(l);const e=s.createAnalyser();t.connect(e),e.connect(s.destination),e.fftSize=512;const a=e.frequencyBinCount,o=new Uint8Array(a),r=n.getContext("2d");let i=n.width,c=n.height;function g(){e.getByteTimeDomainData(o),r.save(),Object.assign(r,{fillStyle:"red"});const u=i/a;for(let m=0;m<a;m+=4){let f=o[m]/255*c;r.fillRect(u*m,c-f,u,f)}r.fill(),r.restore()}function d(u,m){i=n.width=u,c=n.height=m}function p(){return Y(()=>{r.clearRect(0,0,i,c),g()})}return{setSize:d,start:p}}const Pe="/demo/assets/media/%E5%8C%96%E5%87%A1-DF7X08YA.ogg";function $(l){if(!l.title){let s=Yn().meta.title;s&&(l.title=s)}let n=Qn(l);return P(()=>{n.gui.destroy()}),n}const Ae=["src"],We=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;$({查看源码(){s("check-source")}});const t=C(),e=C();return D(()=>{let a;e.value.onplay=()=>{const{start:o,setSize:r}=De(e.value,t.value);a=H(window,"resize",()=>{r(innerWidth,innerHeight)},{immediate:!0}),o()},P(()=>{a&&a()})}),(a,o)=>(j(),F(X,null,[G("audio",{ref_key:"audioRef",ref:e,src:K(Pe),id:"audio",controls:""},null,8,Ae),G("canvas",{ref_key:"canvasRef",ref:t},null,512)],64))}}),Le=q(We,[["__scopeId","data-v-24237bd0"]]),Ge="/demo/assets/imgs/display-_9yby0tz.png",He={codes:[{name:"index.vue",code:$e,lang:"js"},{name:"audio-wave",code:Ne,lang:"ts"}],component:Le,display:Ge,title:"音频波形",descriptions:""},qe=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { alignBy } from '@/utils/utils'
import { setupGrid, setElement } from '@thing772/utils'
import { bfsGenerator, type Index, bfs } from './bfs'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()


let xMax: number, yMax: number, w: number, h: number, it: any
const bgRef = ref('#c5afbb')
const gridSize = ref(30)
const canvasRef = ref()
const ctxRef = ref()

const start = reactive({ x: 20, y: 10 })
const end = reactive({ x: 0, y: 0 })

const updateView = () => {
  let canvas = canvasRef.value
  if (!canvas!) return
  w = alignBy(innerWidth, gridSize.value)
  h = alignBy(innerHeight, gridSize.value)
  canvas.width = w
  canvas.height = h
  xMax = w / gridSize.value - 1
  yMax = h / gridSize.value - 1
}

watch([canvasRef, bgRef], ([canvas, bg]) => {
  if (!canvas) return
  setElement(canvas, {
    'background-color': bg
  })
})

watch([canvasRef, ctxRef], ([canvas, ctx]) => {
  if (!canvas! || !ctx!) return
  updateView()
  reDraw()
})

watch(gridSize, () => {
  updateView()
  reDraw()
})

const fillPos = (x: number, y: number, options: object) => {
  let ctx = ctxRef.value
  if (!ctx) return
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
  let ctx = ctxRef.value
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
  it = bfsGenerator(start, end, xMax, yMax)
})

const itv = shallowRef()

let timer: number

const updateGui = () => {
  useGui({
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
      if (timer) clearInterval(timer)
      timer = setInterval(() => {
        const v = it.next()
        itv.value = v
        if (v.done) {
          clearInterval(timer)
          timer = 0
        }
      }, 100)
    },
    bfs巡路() {
      console.time('bfs寻路耗时')
      if (timer) {
        clearInterval(timer)
        timer = 0
      }
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


onMounted(() => {
  let canvas = canvasRef.value
  ctxRef.value = canvas.getContext('2d')!

  updateView()
  Object.assign(end, { x: ~~(xMax! / 2), y: ~~(yMax! / 2) })
  it = bfsGenerator(start, end, xMax, yMax)

  updateGui()
})
<\/script>
`;function $n(l){return Math.floor(Math.random()*l.length)}function Nn(l){return l[$n(l)]}function Ve(l,n=1e3){let s=[];for(let t=0;t<l;t++)s.push(Z(n));return s}function Z(l=1e3){return Math.ceil(Math.random()*l)}function Ke(l,n){return l.reduce((s,t,e)=>(e%n==0&&s.push(l.slice(e,e+n)),s),[])}function sn(l,n,s){let t=l[n];l[n]=l[s],l[s]=t}function cn(l){return l!=null}function rn(l){return typeof l=="function"}function gn(l){return l}function bn(l){let n=[];function s(t){let e=t-n.length;return e>0?n.push(...Zn(l,e)):e<0&&(n=n.slice(0,e)),n}return s.update=function(t){n.forEach(e=>t(e))},s}function mn(l,n){return~~(l/n)*n}function*kn(l,n,s,t){let e=[{...l}],a=[],o={...n},r={},i;const c=(d,p)=>{if(!(d>s||p>t||d<0||p<0))return{x:d,y:p}},g=d=>`${d.x}-${d.y}`;for(;e.length>0;){if(i&&(r[g(i)]=!0,a.push({...i})),i=e.shift(),delete r[g(i)],i.x==o.x&&i.y==o.y)return{current:i,visited:[...a],pending:[...e]};let d=c(i.x,i.y-1),p=c(i.x+1,i.y),u=c(i.x,i.y+1),m=c(i.x-1,i.y),f=[d,p,u,m].filter(Boolean);f=f.filter(x=>!r[g(x)]),f.length!=0&&(f.forEach(x=>{x.parent=i,r[g(x)]=!0}),e.push(...f),yield{current:i,visited:[...a],pending:[...e]})}}function Ue(l,n,s,t){let e=[{...l}],a=[],o={...n},r={},i;const c=(d,p)=>{if(!(d>s||p>t||d<0||p<0))return{x:d,y:p}},g=d=>`${d.x}-${d.y}`;for(;e.length>0;){if(i&&(r[g(i)]=!0,a.push({...i})),i=e.shift(),delete r[g(i)],i.x==o.x&&i.y==o.y)return{current:i,visited:[...a],pending:[...e]};let d=c(i.x,i.y-1),p=c(i.x+1,i.y),u=c(i.x,i.y+1),m=c(i.x-1,i.y),f=[d,p,u,m].filter(Boolean);f=f.filter(x=>!r[g(x)]),f.length!=0&&(f.forEach(x=>{x.parent=i,r[g(x)]=!0}),e.push(...f))}}const Xe=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t,e,a,o,r;const i=C("#c5afbb"),c=C(30),g=C(),d=C(),p=hn({x:20,y:10}),u=hn({x:0,y:0}),m=()=>{let h=g.value;h&&(a=mn(innerWidth,c.value),o=mn(innerHeight,c.value),h.width=a,h.height=o,t=a/c.value-1,e=o/c.value-1)};L([g,i],([h,R])=>{h&&En(h,{"background-color":R})}),L([g,d],([h,R])=>{!h||!R||(m(),v())}),L(c,()=>{m(),v()});const f=(h,R,T)=>{let M=d.value;M&&(M.save(),Object.assign(M,T),M.fillRect(h*c.value,R*c.value,c.value,c.value),M.restore())},x=(h,R)=>{f(h,R,{fillStyle:"red"})},b=(h,R)=>{f(h,R,{fillStyle:"green"})},v=h=>{let R=d.value,T=g.value;R.clearRect(0,0,a,o),Fn({width:a,height:o,gridSize:c.value,canvas:T,ctx:R,lineWidth:1,gridLineColor:"#fff"}),typeof h=="function"&&h(),x(p.x,p.y),b(u.x,u.y)};L([p,u],()=>{v(),r=kn(p,u,t,e)});const w=an();let y;const S=()=>{$({设置背景色:{value:[i.value],isColor:!0,onFinishChange(h){i.value=h}},网格大小设置:{value:[c.value,5,50,1],onFinishChange(h){c.value=h}},设置起始点X:{value:[p.x,0,t,1],onFinishChange(h){p.x=h}},设置起始点Y:{value:[p.y,0,e,1],onFinishChange(h){p.y=h}},设置终点X:{value:[u.x,0,t,1],onFinishChange(h){u.x=h}},设置终点Y:{value:[u.y,0,e,1],onFinishChange(h){u.y=h}},自动bfs迭代(){r&&(y&&clearInterval(y),y=setInterval(()=>{const h=r.next();w.value=h,h.done&&(clearInterval(y),y=0)},100))},bfs巡路(){console.time("bfs寻路耗时"),y&&(clearInterval(y),y=0);let h=Ue(p,u,t,e);if(!h)throw Error("没有找到终点");console.timeEnd("bfs寻路耗时"),v(()=>{O(h.current)})},查看源码(){s("check-source")}})};function E(h){let{current:R,pending:T,visited:M}=h;v(()=>{f(R.x,R.y,{fillStyle:"gold"}),T.forEach(I=>{const{x:B,y:N}=I;f(B,N,{fillStyle:"pink"})}),M.forEach(I=>{const{x:B,y:N}=I;f(B,N,{fillStyle:"black"})})})}function O(h){for(;h;)f(h.x,h.y,{fillStyle:"blue"}),h=h.parent;x(p.x,p.y),b(u.x,u.y)}return L(w,h=>{let{value:R,done:T}=h;T&&!R||(E(R),T&&O(R.current))}),D(()=>{let h=g.value;d.value=h.getContext("2d"),m(),Object.assign(u,{x:~~(t/2),y:~~(e/2)}),r=kn(p,u,t,e),S()}),(h,R)=>(j(),F("canvas",{ref_key:"canvasRef",ref:g},null,512))}}),Ye="/demo/assets/imgs/display-BFxeQr0P.png",Qe=`export type Index = { x: number; y: number }
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
`,Ze={codes:[{name:"index.vue",code:qe,lang:"js"},{name:"bfs.ts",code:Qe,lang:"ts"}],component:Xe,display:Ye,title:"canvas网格——广度优先搜索",descriptions:""},Je=`<template>
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
`,nn=`type BallOptions = {
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
`;class U{constructor(n){_(this,"x",0);_(this,"y",0);_(this,"r",0);_(this,"vx",0);_(this,"vy",0);_(this,"ax",0);_(this,"ay",0);_(this,"styleOptions",{});n&&this.set(n)}reset(n){return Object.assign(this,{x:0,y:0,r:0,vx:0,vy:0,ax:0,ay:0,...n?{styleOptions:{}}:null})}set(n){return Object.assign(this,n)}update(){return this.vy+=this.ay,this.y+=this.vy,this.vx+=this.ax,this.x+=this.vx,this}render(n){n.save();let{x:s,y:t,r:e,styleOptions:a}=this;Object.assign(n,a),n.beginPath(),n.arc(s,t,e,0,Math.PI*2),a.fillStyle&&n.fill(),a.strokeStyle&&n.stroke(),n.restore()}}const nt=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;$({查看源码(){s("check-source")}});const t=C();return D(()=>{let e=t.value,a,o,r,i=e.getContext("2d");const c=H(window,"resize",()=>{Object.assign(e,{width:a=innerWidth,height:o=innerHeight})},{immediate:!0}),g=H(e,"mousemove",function(p){r={x:p.offsetX,y:p.offsetY}});let d=new U({r:100,x:a/2,y:o/2,styleOptions:{fillStyle:V()}});Y(()=>{i.clearRect(0,0,a,o),r&&(d.x=J(d.x,r.x,.05),d.y=J(d.y,r.y,.05)),d.render(i)}),P(()=>{c(),g()})}),(e,a)=>(j(),F("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),et="/demo/assets/imgs/display-IdleEMXt.png",tt={codes:[{name:"index.vue",code:Je,lang:"js"},{name:"ball.ts",code:nn,lang:"ts"}],component:nt,display:et,title:"缓动追逐",descriptions:""},at=`<template>
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
`,_n=`import { rafLoop, updateBallVelocityInRect, isFunc } from '@thing772/utils'
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
`;function wn(l){let{canvas:n,ballsNum:s,createBallFac:t,onBallUpdate:e,speedDecay:a,preRender:o,postRender:r}=l,i=n.width,c=n.height;const g=n.getContext("2d");let d=[];const p=bn(t);function u(y){d=p(y),f()}function m(y){Object.assign(n,y),i=y.width,c=y.height,f()}function f(y){d.forEach(S=>{Sn(y)&&y(S),S.render(g)})}function x(){g.clearRect(0,0,i,c);for(let y of d)Sn(e)?e(y):(y.update(),Jn(y,{wBox:[0,i],hBox:[0,c],speedDecay:a}));o==null||o(d,g),d.forEach(y=>y.render(g)),r==null||r(d,g)}function b(y){g.clearRect(0,0,i,c),f(y)}u(s);let v;function w(){return v&&v(),v=Y(()=>{x()})}return{start:w,setBallNum:u,setSize:m,render:x,updateBalls:b}}const it=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=80,e=1,a=3,o=3,r=100,i;$({小球个数:{value:[t,1,1e3,10],onFinishChange(u){t=u,d.setBallNum(u)}},小球半径上限:{value:[e,1,100,1],onFinishChange(u){e=u,d.updateBalls(m=>{m.r=k(1,u)})}},小球x方向移动速度上限:{value:[a,1,15,.5],onFinishChange(u){a=u,d.updateBalls(m=>{m.vx=k(1,u)})}},小球y方向移动速度上限:{value:[o,1,15,.5],onFinishChange(u){o=u,d.updateBalls(m=>{m.vy=k(1,u)})}},小球连接范围阈值:{value:[r,50,300,1],onFinishChange(u){r=u}},查看源码(){s("check-source")}});let c;const g=C();let d,p;return D(()=>{let u=g.value,m=innerWidth,f=innerHeight;Object.assign(u,{width:m,height:f}),d=wn({canvas:u,ballsNum:t,createBallFac:()=>new U({x:k(10,m-10),y:k(10,f-10),r:k(1,e),vx:k(1,a),vy:k(1,o),styleOptions:{fillStyle:V()}}),preRender(v,w){i||(i=On(w,{strokeStyle:V(),lineWidth:1})),p&&(v=v.concat(p));for(let y=0;y<v.length;y++)for(let S=y+1;S<v.length;S++){let E=v[y],O=v[S];ne(E,O)<r&&i(E,O)}p&&v.pop()}});const x=H(window,"resize",()=>{m=innerWidth,f=innerHeight,d.setSize({width:m,height:f})},{immediate:!0}),b=H(u,"mousemove",v=>{p={x:v.offsetX,y:v.offsetY}},{needLog:!0});c=d.start(),P(()=>{x(),b(),c&&c()})}),(u,m)=>(j(),F("canvas",{ref_key:"canvasRef",ref:g},null,512))}}),st="/demo/assets/imgs/display-y86Fu395.png",lt={codes:[{name:"index.vue",code:at,lang:"js"},{name:"wander-balls.ts",code:_n,lang:"ts"},{name:"ball.ts",code:nn,lang:"ts"}],component:it,display:st,title:"粒子小球连线",descriptions:""},rt=`<template>
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
`,ot=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=C();let e=innerWidth,a=innerHeight,o,r=(m,f)=>Math.sin(5*m+.001*f)+Math.cos(10*m+.005*f),i=C(""),c=r,g=300,d=1,p=V();function u(){c=new Function("x","t",`return ${i.value}`);try{c(0,0)}catch(m){pn({showClose:!0,message:m.message,type:"error",grouping:!0})}}return D(()=>{let m=t.value;const f=m.getContext("2d");$({采样率设置:{value:[g,10,1e3,10],onFinishChange(v){g=v}},曲线粗细设置:{value:[d,1,10,1],onFinishChange(v){d=v}},曲线颜色设置:{value:[p],isColor:!0,onFinishChange(v){p=v}},查看源码(){s("check-source")}}),o=Cn({canvas:m,ctx:f,width:e,height:a});const x=Y(v=>{f.clearRect(0,0,e,a),o.setup(),o.draw(w=>{let y=0;try{y=c(w,v)}catch{}return y},{rate:g,style:{strokeStyle:p,lineWidth:d},label:{name:c.toString().replace(/ anonymous/,""),pos:{x:100,y:100}}})}),b=H(window,"resize",()=>{e=innerWidth,a=innerHeight,o=Cn({canvas:m,ctx:f,width:e,height:a})});P(()=>{b(),x()})}),(m,f)=>{const x=Mn;return j(),F(X,null,[G("canvas",{ref_key:"canvasRef",ref:t},null,512),W(x,{class:"input",modelValue:K(i),"onUpdate:modelValue":f[0]||(f[0]=b=>yn(i)?i.value=b:i=b),placeholder:"参数:（x:x坐标，t：时间参数），输入x和t的表达式",size:"large",onKeyup:Tn(u,["enter"])},null,8,["modelValue"])],64)}}}),ct=q(ot,[["__scopeId","data-v-6125c1c8"]]),ut="/demo/assets/imgs/display-BsbAITaj.png",dt={codes:[{name:"index.vue",code:rt,lang:"js"}],component:ct,display:ut,title:"笛卡尔坐标系函数绘制",descriptions:""},ht=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { alignBy } from '@/utils/utils'
import { setupGrid, setElement } from '@thing772/utils'
import { dfsGenerator, type Index, dfs } from './dfs'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let xMax: number, yMax: number, w: number, h: number, it: any
const bgRef = ref('#c5afbb')
const gridSize = ref(30)
const canvasRef = ref()
const ctxRef = ref()

const start = reactive({ x: 20, y: 10 })
const end = reactive({ x: 0, y: 0 })

const updateView = () => {
  let canvas = canvasRef.value
  if (!canvas!) return
  w = alignBy(innerWidth, gridSize.value)
  h = alignBy(innerHeight, gridSize.value)
  canvas.width = w
  canvas.height = h
  xMax = w / gridSize.value - 1
  yMax = h / gridSize.value - 1
}

watch([canvasRef, bgRef], ([canvas, bg]) => {
  if (!canvas) return
  setElement(canvas, {
    'background-color': bg
  })
})

watch([canvasRef, ctxRef], ([canvas, ctx]) => {
  if (!canvas! || !ctx!) return
  updateView()
  reDraw()
})

watch(gridSize, () => {
  updateView()
  reDraw()
})

const fillPos = (x: number, y: number, options: object) => {
  let ctx = ctxRef.value
  if (!ctx) return
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
  let ctx = ctxRef.value
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
  it = dfsGenerator(start, end, xMax, yMax)
})

const itv = shallowRef()

let timer: number

const updateGui = () => {
  useGui({
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
      if (timer) clearInterval(timer)
      timer = setInterval(() => {
        const v = it.next()
        itv.value = v
        if (v.done) {
          clearInterval(timer)
          timer = 0
        }
      }, 100)
    },
    dfs巡路() {
      console.time('dfs寻路耗时')
      if (timer) {
        clearInterval(timer)
        timer = 0
      }
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


onMounted(() => {
  let canvas = canvasRef.value
  ctxRef.value = canvas.getContext('2d')!

  updateView()
  Object.assign(end, { x: ~~(xMax! / 2), y: ~~(yMax! / 2) })
  it = dfsGenerator(start, end, xMax, yMax)

  updateGui()
})
<\/script>
`;function*jn(l,n,s,t){let e=[{...l}],a=[],o={...n},r={},i;const c=m=>{r[u(m)]=!0,a.push({...m})},g=()=>{let m=e.shift();return delete r[u(m)],m},d=m=>{m.forEach(f=>{r[u(f)]=!0}),e.unshift(...m)},p=(m,f)=>{if(!(m>s||f>t||m<0||f<0))return{x:m,y:f}},u=m=>`${m.x}-${m.y}`;for(;e.length>0;){if(i&&c(i),i=g(),i.x==o.x&&i.y==o.y)return{current:i,visited:[...a],pending:[...e]};let m=p(i.x,i.y-1),f=p(i.x+1,i.y),x=p(i.x,i.y+1),b=p(i.x-1,i.y),v=[m,f,x,b].filter(Boolean);v=v.filter(w=>!r[u(w)]),v.forEach(w=>{w.parent=i}),v.length!=0&&(d(v),yield{current:i,visited:[...a],pending:[...e]})}}function ft(l,n,s,t){let e=[{...l}],a=[],o={...n},r={},i;const c=m=>{r[u(m)]=!0,a.push({...m})},g=()=>{let m=e.shift();return delete r[u(m)],m},d=m=>{m.forEach(f=>{r[u(f)]=!0}),e.unshift(...m)},p=(m,f)=>{if(!(m>s||f>t||m<0||f<0))return{x:m,y:f}},u=m=>`${m.x}-${m.y}`;for(;e.length>0;){if(i&&c(i),i=g(),i.x==o.x&&i.y==o.y)return{current:i,visited:[...a],pending:[...e]};let m=p(i.x,i.y-1),f=p(i.x+1,i.y),x=p(i.x,i.y+1),b=p(i.x-1,i.y),v=[m,f,x,b].filter(Boolean);v=v.filter(w=>!r[u(w)]),v.forEach(w=>{w.parent=i}),v.length!=0&&d(v)}}const mt=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t,e,a,o,r;const i=C("#c5afbb"),c=C(30),g=C(),d=C(),p=hn({x:20,y:10}),u=hn({x:0,y:0}),m=()=>{let h=g.value;h&&(a=mn(innerWidth,c.value),o=mn(innerHeight,c.value),h.width=a,h.height=o,t=a/c.value-1,e=o/c.value-1)};L([g,i],([h,R])=>{h&&En(h,{"background-color":R})}),L([g,d],([h,R])=>{!h||!R||(m(),v())}),L(c,()=>{m(),v()});const f=(h,R,T)=>{let M=d.value;M&&(M.save(),Object.assign(M,T),M.fillRect(h*c.value,R*c.value,c.value,c.value),M.restore())},x=(h,R)=>{f(h,R,{fillStyle:"red"})},b=(h,R)=>{f(h,R,{fillStyle:"green"})},v=h=>{let R=d.value,T=g.value;R.clearRect(0,0,a,o),Fn({width:a,height:o,gridSize:c.value,canvas:T,ctx:R,lineWidth:1,gridLineColor:"#fff"}),typeof h=="function"&&h(),x(p.x,p.y),b(u.x,u.y)};L([p,u],()=>{v(),r=jn(p,u,t,e)});const w=an();let y;const S=()=>{$({设置背景色:{value:[i.value],isColor:!0,onFinishChange(h){i.value=h}},网格大小设置:{value:[c.value,5,50,1],onFinishChange(h){c.value=h}},设置起始点X:{value:[p.x,0,t,1],onFinishChange(h){p.x=h}},设置起始点Y:{value:[p.y,0,e,1],onFinishChange(h){p.y=h}},设置终点X:{value:[u.x,0,t,1],onFinishChange(h){u.x=h}},设置终点Y:{value:[u.y,0,e,1],onFinishChange(h){u.y=h}},自动dfs迭代(){r&&(y&&clearInterval(y),y=setInterval(()=>{const h=r.next();w.value=h,h.done&&(clearInterval(y),y=0)},100))},dfs巡路(){console.time("dfs寻路耗时"),y&&(clearInterval(y),y=0);let h=ft(p,u,t,e);if(!h)throw Error("没有找到终点");console.timeEnd("dfs寻路耗时"),v(()=>{O(h.current)})},查看源码(){s("check-source")}})};function E(h){let{current:R,pending:T,visited:M}=h;v(()=>{f(R.x,R.y,{fillStyle:"gold"}),T.forEach(I=>{const{x:B,y:N}=I;f(B,N,{fillStyle:"pink"})}),M.forEach(I=>{const{x:B,y:N}=I;f(B,N,{fillStyle:"black"})})})}function O(h){for(;h;)f(h.x,h.y,{fillStyle:"blue"}),h=h.parent;x(p.x,p.y),b(u.x,u.y)}return L(w,h=>{let{value:R,done:T}=h;T&&!R||(E(R),T&&O(R.current))}),D(()=>{let h=g.value;d.value=h.getContext("2d"),m(),Object.assign(u,{x:~~(t/2),y:~~(e/2)}),r=jn(p,u,t,e),S()}),(h,R)=>(j(),F("canvas",{ref_key:"canvasRef",ref:g},null,512))}}),pt="/demo/assets/imgs/display-BRS54xHs.png",gt=`export type Index = { x: number; y: number }
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
`,vt={codes:[{name:"index.vue",code:ht,lang:"js"},{name:"dfs.ts",code:gt,lang:"ts"}],component:mt,display:pt,title:"canvas网格——深度优先搜索",descriptions:""},xt=`<template>
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
`,yt=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;$({查看源码(){s("check-source")}});const t=C();return D(()=>{let e=t.value,a,o,r,i=e.getContext("2d");const c=H(window,"resize",()=>{Object.assign(e,{width:a=innerWidth,height:o=innerHeight})},{immediate:!0}),g=H(e,"mousemove",function(x){r={x:x.offsetX,y:x.offsetY}});let d=[new U({r:50,x:a/2-80,y:o/2,styleOptions:{fillStyle:V()}}),new U({r:50,x:a/2+80,y:o/2,styleOptions:{fillStyle:V()}})],p=d.map(x=>new U({r:x.r/4,x:x.x,y:x.y,styleOptions:{fillStyle:V()}})),u=new U({r:200,x:a/2,y:o/2,styleOptions:{fillStyle:"#E6A23C"}}),m=On(i,{strokeStyle:"#fff",lineWidth:"10",lineCap:"round"}),f=.05;Y(()=>{i.clearRect(0,0,a,o),u.render(i),d.forEach(x=>{x.render(i)}),p.forEach((x,b)=>{if(r){let v=x.x=J(x.x,r.x,f),w=x.y=J(x.y,r.y,f),y=d[b],S={x:y.x,y:y.y,r:y.r-10};if(!ee(S,x)){x.x=v,x.y=w;let E=te(S,r);Object.assign(x,ae(S,E,S.r-x.r))}}x.render(i)}),m({x:a/2-50,y:o/2+100},{x:a/2+50,y:o/2+100})}),P(()=>{c(),g()})}),(e,a)=>(j(),F("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),bt="/demo/assets/imgs/display-BcjSOcDf.png",_t={codes:[{name:"index.vue",code:xt,lang:"js"},{name:"ball.ts",code:nn,lang:"ts"}],component:yt,display:bt,title:"会动的眼球",descriptions:""},wt=`<template>
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
`,Rt=`import { Ball } from '@/utils/class/ball'
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
`;function St(l){let{canvas:n,num:s,onAllStopped:t}=l;const e=n.getContext("2d");let a=n.width,o=n.height,r=[],i=!1,c=!1;const g=bn(()=>new U(d()));function d(){return{x:k(10,a-10),y:k(10,o-10),r:4,ax:0,ay:k(.1,2,!1),vx:0,vy:k(1,3),styleOptions:{fillStyle:V()},stopped:!1}}function p(v){r=g(v)}function u(){for(let v of r)v.reset().set(d());if(c=!1,!i)return b()}function m(v){Object.assign(n,v),a=v.width,o=v.height}function f(v){return v.stopped||fn(v.vy,0,1)&&fn(v.y+v.r,o,1)}function x(){if(r.length!=0){e.clearRect(0,0,a,o);for(let v of r)if(v.update(),v.y+v.r>o&&(v.y=o-v.r,v.vy*=-.7),v.render(e),f(v)&&(v.stopped=!0,r.every(f))){i=!1,c=!0;try{t==null||t()}catch(w){console.error(w)}return!1}}}p(s);function b(){if(i)return;i=!0,c&&u();let v=Y(x);return()=>{i&&(i=!1,v())}}return{start:b,reset:u,setBallsNum:p,setSize:m,render:x}}const Ct=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=100;const e=C(),{helpers:{getControllerByKey:a}}=$({小球个数:{value:[t,1,1e3,10],onFinishChange(c){t=c,r.setBallsNum(c)}},开始(){let c=r.start();c&&(e.value=c)},暂停:{value:[function(){e.value()}],disable:!e.value},重置(){let c=r.reset();c&&(e.value=c)},查看源码(){s("check-source")}});L(e,c=>{a("暂停").enable(!!c)});const o=C();let r;function i(){pn({showClose:!0,message:"所有小球都停止运动了",type:"success",grouping:!0})}return D(()=>{let c=o.value;Object.assign(c,{width:innerWidth,height:innerHeight}),r=St({num:t,canvas:c,onAllStopped:i});const g=H(window,"resize",()=>{r.setSize({width:innerWidth,height:innerHeight})},{immediate:!0});r.render(),P(()=>{g(),e.value&&e.value()})}),(c,g)=>(j(),F("canvas",{ref_key:"canvasRef",ref:o},null,512))}}),Bt="/demo/assets/imgs/display-DOU4TeMC.png",It={codes:[{name:"index.vue",code:wt,lang:"js"},{name:"falling-balls.ts",code:Rt,lang:"ts"},{name:"ball.ts",code:nn,lang:"ts"}],component:Ct,display:Bt,title:"下落的小球",descriptions:""},kt=`<template>
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
`,jt=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=100,e=20,a=20,o=17,r=.01;$({小球个数:{value:[t,1,1e3,10],onFinishChange(d){t=d,g.setBallNum(d)}},小球半径上限:{value:[e,4,100,1],onFinishChange(d){e=d,g.updateBalls(p=>{p.r=k(4,d)})}},小球x方向移动速度上限:{value:[a,1,15,.5],onFinishChange(d){a=d,g.updateBalls(p=>{p.vx=k(1,d)})}},小球y方向移动速度上限:{value:[o,1,15,.5],onFinishChange(d){o=d,g.updateBalls(p=>{p.vy=k(1,d)})}},小球摩擦力因子:{value:[r,0,3,.1],onFinishChange(d){r=d,g.updateBalls(p=>{p.friction=k(0,d)})}},开始(){i&&i(),i=g.start()},查看源码(){s("check-source")}});let i;const c=C();let g;return D(()=>{let d=c.value,p,u;Object.assign(d,{width:p=innerWidth,height:u=innerHeight}),g=wn({canvas:d,ballsNum:t,createBallFac:()=>{let f={x:k(10,p-10),y:k(10,u-10),r:k(1,e),vx:k(1,a),vy:k(1,o),styleOptions:{fillStyle:V()},friction:k(0,r)};return new U(f)},onBallUpdate(f){f.vx>=.01&&(f.vx-=f.friction,f.x+=f.vx),f.vy>=.01&&(f.vy-=f.friction,f.y+=f.vy),f.x>p+f.r&&(f.x=-f.r),f.y>u+f.r&&(f.y=-f.r)}});const m=H(window,"resize",()=>{g.setSize({width:p=innerWidth,height:u=innerHeight})},{immediate:!0});P(()=>{m(),i&&i()})}),(d,p)=>(j(),F("canvas",{ref_key:"canvasRef",ref:c},null,512))}}),Et="/demo/assets/imgs/display-BaZn1eIe.png",Ft={codes:[{name:"index.vue",code:kt,lang:"js"},{name:"wander-balls.ts",code:_n,lang:"ts"},{name:"ball.ts",code:nn,lang:"ts"}],component:jt,display:Et,title:"运动减速",descriptions:""},Ot=`<template>
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
`,Tt=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=innerWidth,e=innerHeight,a,o=C(.01),r=C(.01),i=C(1),c=an(new Bn.Noise(Math.random())),g=C("simplex2"),d=()=>{let u=a.getImageData(0,0,t,e);for(let m=0;m<t;m++)for(let f=0;f<e;f++){let x=~~Math.min(255,Math.abs(c.value[g.value](m*o.value,f*r.value))*i.value*256);u.data[(f*t+m)*4+0]=x,u.data[(f*t+m)*4+1]=x,u.data[(f*t+m)*4+2]=x,u.data[(f*t+m)*4+3]=255}a.putImageData(u,0,0)};$({噪声生成算法:{value:[g.value,["simplex2","perlin2"]],onFinishChange(u){g.value=u}},x方向缩放因子:{value:[o.value,.001,.5,.001],onFinishChange(u){o.value=u}},y方向缩放因子:{value:[r.value,.001,.5,.001],onFinishChange(u){r.value=u}},值放缩因子:{value:[i.value,.01,255,.1],onFinishChange(u){i.value=u}},重新生成随机种子(){c.value=new Bn.Noise(Math.random())},查看源码(){s("check-source")}});const p=C();return D(()=>{const u=p.value;u.width=t,u.height=e,a=u.getContext("2d",{willReadFrequently:!0});const m=H(window,"resize",ie(()=>{t=~~(innerWidth/1),e=~~(innerHeight/1),u.width=t,u.height=e,d()},100));let f=se(d);P(()=>{m(),f()})}),(u,m)=>(j(),F("canvas",{ref_key:"canvasRef",ref:p},null,512))}}),Mt="/demo/assets/imgs/display-CsCBxHWH.png",zt={codes:[{name:"index.vue",code:Ot,lang:"js"}],component:Tt,display:Mt,title:"随机噪声",descriptions:""},$t=`<template>
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
`;class Nt{constructor(n){_(this,"x",0);_(this,"y",0);_(this,"tx",0);_(this,"ty",0);_(this,"color","pink");_(this,"name","");_(this,"fx",.01);_(this,"fy",.01);_(this,"onDone");_(this,"r",0);_(this,"size",0);_(this,"done",!1);Object.assign(this,n)}update(){var t;let{tx:n,ty:s}=this;if(!this.done)return this.x=J(this.x,n,this.fx),this.y=J(this.y,s,this.fy),fn(this.x,this.tx)&&fn(this.y,this.ty)&&(this.done=!0,(t=this.onDone)==null||t.call(this)),this}render(n){let{color:s,x:t,y:e,size:a,r:o}=this;n.save(),Object.assign(n,{fillStyle:s}),n.beginPath(),a>0?n.fillRect(t,e,a,a):o>0?n.arc(t,e,o,0,Math.PI*2):n.arc(t,e,2,0,Math.PI*2),n.fill(),n.restore()}}class Dt{constructor(n){_(this,"canvas");_(this,"ctx");_(this,"fontSize",200);_(this,"fontFamily","微软雅黑");_(this,"color","pink");_(this,"gap",3);_(this,"alphaThreshold",30);_(this,"w",0);_(this,"h",0);let{canvas:s,ctx:t,fontSize:e,fontFamily:a,color:o,gap:r,alphaThreshold:i}=n;this.canvas=s,this.ctx=t??s.getContext("2d"),e&&(this.fontSize=e),a&&(this.fontFamily=a),o&&(this.color=o),r!=null&&(this.gap=r),i!=null&&(this.alphaThreshold=i),this.w=s.width,this.h=s.height}setSize(n){this.w=n.width,this.h=n.height}_measureText(n){let{ctx:s,fontSize:t,fontFamily:e,color:a,w:o,h:r}=this;s.save(),Object.assign(s,{font:`${t}px ${e}`,fillStyle:a,textBaseline:"bottom"});let i=s.measureText(n),{width:c,actualBoundingBoxAscent:g,actualBoundingBoxDescent:d}=i,p=~~(Math.abs(g)+Math.abs(d));c=~~c,s.fillText(n,0,p);let u=s.getImageData(0,0,c,p).data;return s.clearRect(0,0,o,r),s.restore(),{data:u,width:c,height:p}}getParticles(n){let{data:s,width:t,height:e}=this._measureText(n),{gap:a,alphaThreshold:o,w:r,h:i}=this,c=[],g=[];for(let d=0;d<t;d+=a)for(let p=0;p<e;p+=a){let u=p*t+d,m=s[u*4+0],f=s[u*4+1],x=s[u*4+2],b=s[u*4+3];if(b<=o)continue;let{signal:v,resolve:w}=le();c.push(v);let y=re({x:d,y:p},ce({x:t/2,y:e/2},{x:r/2,y:i/2}));g.push({tx:y.x,ty:y.y,color:oe(m,f,x,b),onDone:w})}return{particles:g,done:Promise.all(c)}}}const Pt=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=C(),e=C("");let a,o=[],r=3,i="#f00",c=30,g=100,d=1,p=.1,u=.1,m=innerWidth,f=innerHeight,x=bn(()=>new Nt({r:d,x:k(0,m),y:k(0,f),fx:.1,fy:.1})),b="hello world";function v(y,S){let E=a.getParticles(y);return o=x(E.particles.length).map(O=>(O.done=!1,S&&(O.x=k(0,m),O.y=k(0,f)),O)),o.forEach((O,h)=>Object.assign(O,E.particles[h])),E.done}function w(){e.value&&(b=e.value,v(b,!0))}return D(()=>{let y=t.value;const S=y.getContext("2d",{willReadFrequently:!0});Object.assign(y,{width:m,height:f}),a=new Dt({canvas:y,ctx:S,gap:r,alphaThreshold:c,color:i}),$({调整文字颜色:{value:[i],isColor:!0,onFinishChange(h){a.color=h,v(b,!0)}},采样alpha过滤阈值:{value:[c,0,100,1],onFinishChange(h){a.alphaThreshold=h,v(b,!0)}},采样间隔调整:{value:[r,1,20,1],onFinishChange(h){a.gap=h,v(b,!0)}},点大小调整:{value:[d,1,20,1],onFinishChange(h){d=h,x.update(R=>R.r=h),v(b,!0)}},x方向缓动因子调整:{value:[p,.01,1,.01],onFinishChange(h){p=h,x.update(R=>R.fx=h),v(b,!0)}},y方向缓动因子调整:{value:[u,.01,1,.01],onFinishChange(h){u=h,x.update(R=>R.fy=h),v(b,!0)}},字体大小调整:{value:[g,50,340,10],onFinishChange(h){g=h,a.fontSize=h,v(b,!0)}},查看源码(){s("check-source")}}),v(b);const E=Y(()=>{S.clearRect(0,0,m,f),o.forEach(h=>{h.render(S),h.update()})}),O=H(window,"resize",()=>{m=innerWidth,f=innerHeight,y.width=m,y.height=f,a.setSize({width:m,height:f})});P(()=>{O(),E()})}),(y,S)=>{const E=Mn;return j(),F(X,null,[G("canvas",{ref_key:"canvasRef",ref:t},null,512),W(E,{class:"input",modelValue:K(e),"onUpdate:modelValue":S[0]||(S[0]=O=>yn(e)?e.value=O:null),placeholder:"请输入内容",size:"large",onKeyup:Tn(w,["enter"])},null,8,["modelValue"])],64)}}}),At=q(Pt,[["__scopeId","data-v-0ead9cf7"]]),Wt=`import { iterateEaseFromTo, looseEqual } from '@thing772/utils'

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
`,Lt=`import { getSignal, ptOffset, getMovePt, rgb } from '@thing772/utils'
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
`,Gt="/demo/assets/imgs/display-DOJbIvru.png",Ht={codes:[{name:"index.vue",code:$t,lang:"js"},{name:"textParticle.ts",code:Lt,lang:"ts"},{name:"particle.ts",code:Wt,lang:"ts"}],component:At,display:Gt,title:"文字粒子化",descriptions:""},qt=`<template>
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
`,Vt=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=100,e=20,a=10,o=7;$({小球个数:{value:[t,1,1e3,10],onFinishChange(g){t=g,c.setBallNum(g)}},小球半径上限:{value:[e,4,100,1],onFinishChange(g){e=g,c.updateBalls(d=>{d.r=k(4,g)})}},小球x方向移动速度上限:{value:[a,1,15,.5],onFinishChange(g){a=g,c.updateBalls(d=>{d.vx=k(1,g)})}},小球y方向移动速度上限:{value:[o,1,15,.5],onFinishChange(g){o=g,c.updateBalls(d=>{d.vy=k(1,g)})}},开始(){r&&r(),r=c.start()},查看源码(){s("check-source")}});let r;const i=C();let c;return D(()=>{let g=i.value,d=innerWidth,p=innerHeight;Object.assign(g,{width:d,height:p}),c=wn({canvas:g,ballsNum:t,createBallFac:()=>new U({x:k(10,d-10),y:k(10,p-10),r:k(1,e),vx:k(1,a),vy:k(1,o),styleOptions:{fillStyle:V()}})});const u=H(window,"resize",()=>{d=innerWidth,p=innerHeight,c.setSize({width:d,height:p})},{immediate:!0});c.render(),P(()=>{u(),r&&r()})}),(g,d)=>(j(),F("canvas",{ref_key:"canvasRef",ref:i},null,512))}}),Kt="/demo/assets/imgs/display-BpUGJlnU.png",Ut={codes:[{name:"index.vue",code:qt,lang:"js"},{name:"wander-balls.ts",code:_n,lang:"ts"},{name:"ball.ts",code:nn,lang:"ts"}],component:Vt,display:Kt,title:"矩形区域内飘荡的小球",descriptions:""},Xt=`<template>
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
`,Yt={class:"container"},Qt=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,{obj:t}=$({模糊自身:{value:[!1],onChange(r){e.value=r}},模糊背景:{value:[!1],onChange(r){a.value=r}},查看源码(){s("check-source")}}),e=C(t.模糊自身),a=C(t.模糊背景),o=xn(()=>["el2",{"blur-self":e.value,"blur-backdrop":a.value}]);return(r,i)=>(j(),F("div",Yt,[i[0]||(i[0]=G("div",{class:"el1"}," 财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人， 较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻） ",-1)),G("div",{class:ln(K(o))}," 财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。 ",2)]))}}),Zt=q(Qt,[["__scopeId","data-v-bce03b61"]]),Jt="/demo/assets/imgs/display-C7z4HTpE.png",na={codes:[{name:"index.vue",code:Xt,lang:"js"}],component:Zt,display:Jt,title:"css模糊效果",descriptions:""},ea=`<template>
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
`,ta=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let{obj:t}=$({"添加box-shadow":{value:[!1],onChange(i){e.value=i}},添加圆角:{value:[!1],onChange(i){a.value=i}},"添加filter:drop-shadow":{value:[!1],onChange(i){o.value=i}},查看源码(){s("check-source")}});const e=C(t["添加box-shadow"]),a=C(t.添加圆角),o=C(t["添加filter:drop-shadow"]),r=xn(()=>["container",{"has-shadow-box":e.value,"round-border":a.value,filter:o.value}]);return(i,c)=>(j(),F("div",{class:ln(K(r))},c[0]||(c[0]=[dn(" 测试文本 "),G("div",{class:"circle"}," 测试文本2 ",-1)]),2))}}),aa=q(ta,[["__scopeId","data-v-8a62668d"]]),ia="/demo/assets/imgs/display-CvX0ByRG.png",sa={codes:[{name:"index.vue",code:ea,lang:"js"}],component:aa,display:ia,title:"css box阴影效果",descriptions:""},la=`<template>
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
`;function ra(l){const{data:n=[],getX:s,getY:t,width:e=200,height:a=200,margin:o=[],color:r={},sortY:i=0,xAxis:c={},yAxis:g={},yLegend:d={},hideXTicks:p}=l,[u=60,m=0,f=30,x=30]=o;let b,v;const w=ue("svg").attr("width",e).attr("height",a).attr("viewBox",[0,0,e,a]).style("background-color",r.bg||""),y=w.append("g"),S=w.append("g").attr("transform",`translate(0,${a-f})`),E=w.append("g").attr("transform",`translate(${x},0)`),O=h=>{const R=I=>{if(b=fe().range([x,e-m]),cn(l.xScale))for(let[B,N]of Object.entries(l.xScale))b[B](N);else b.padding(.2);i>0?b.domain(me(I,([B])=>(i==1?1:-1)*t(B),s)):b.domain(I.map(s)),v=pe().domain([0,ge(I,t)]).range([a-f,u])},T=I=>{I.attr("x",0).attr("y",0).attr("width",b.bandwidth()).attr("height",B=>v(0)-v(t(B))).attr("fill",r.bar||"#409eff")},M=I=>{I.text(B=>B.value).attr("text-anchor","middle").attr("x",b.bandwidth()/2).attr("y",-4)};R(h),y.selectAll("g").data(h).join(I=>I.append("g").attr("transform",B=>`translate(${b(s(B))},${v(t(B))})`).call(B=>{T(B.append("rect")),M(B.append("text"))}),I=>(T(I.select("rect")),M(I.select("text")),I)).attr("transform",I=>`translate(${b(s(I))},${v(t(I))})`),S.call(I=>{let B=de(b);B.tickSizeOuter(0);for(const[N,Q]of Object.entries(c))B[N](Q);B(I)}).call(I=>{p&&I.selectAll(".tick").remove()}),E.call(I=>{let B=he(v);for(const[N,Q]of Object.entries(g))B[N](Q);B(I)}).call(I=>I.select(".domain").remove()).call(I=>{if(d.text){let B=I.append("text").attr("text-anchor","middle").attr("x",0).attr("y",20);for(const[N,Q]of Object.entries(d))N=="text"?B[N](Q):B.attr(N,Q)}})};return O(n),{svg:w.node(),update:O}}function*oa(l,n){rn(n)||(n=gn),n=n;for(let s=1;s<l.length;s++)for(let t=0;t<l.length-s;t++)n(l[t])>n(l[t+1])&&(sn(l,t,t+1),yield[...l])}function*ca(l,n){rn(n)||(n=gn),n=n,l=[...l];for(let s=0;s<l.length-1;s++){let t=0;for(let e=0;e<l.length-s;e++)n(l[e])>n(l[t])&&(t=e);sn(l,t,l.length-s-1),yield[...l]}}function*ua(l,n){rn(n)||(n=gn),l=[...l],n=n;for(let s=0;s<l.length-1;s++)if(n(l[s])>n(l[s+1])){sn(l,s,s+1),yield[...l];let t=s;for(;t>0&&!(n(l[t])>=n(l[t-1]));)sn(l,t,t-1),yield[...l],t--}}function*da(l,n){rn(n)||(n=gn);function*s(t,e){if(n=n,t==e)return;let a=Math.floor((t+e)/2);yield*s(t,a),yield*s(a+1,e);const o=r=>l=[...l.slice(0,t),...r,...l.slice(e+1)];if(!(n(l[a])<=n(l[a+1]))){if(n(l[e])<=n(l[t])){yield o([...l.slice(a+1,e+1),...l.slice(t,a+1)]);return}for(let r=1;a+r<=e;r++){let i=a+r;for(;i>t&&!(n(l[i])>=n(l[i-1]));)sn(l,i,i-1),i--,yield[...l]}}}yield*s(0,l.length-1)}const ha={class:"box"},fa=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=C(),e=[{label:"冒泡排序",value:oa},{label:"选择排序",value:ca},{label:"插入排序",value:ua},{label:"归并排序",value:da}],a=e[0],o=C(a.value);let r,i=innerWidth-100,c=innerHeight-100,g=!1,d=20,p=an([]),u=an();function m(){p.value=Ve(d).map((w,y)=>({id:y,value:w})),g=!1,u.value=o.value(p.value,w=>w.value)}L(o,()=>{u.value=o.value(p.value,w=>w.value)});function f(){let{value:w,done:y}=u.value.next();if(g=y,y){pn({showClose:!0,message:"已经排序完毕",type:"success",grouping:!0});return}else p.value=w}let x=C(0);function b(){x.value==0&&((!u.value||g)&&m(),x.value=setInterval(()=>{if(g){clearInterval(x.value),x.value=0;return}f()},v))}L(()=>p.value,w=>{w.length>0?(r||(r=ra({width:i,height:c,getX:y=>y.id,getY:y=>y.value}),t.value.appendChild(r.svg)),r.update(w)):r&&(t.value.removeChild(r.svg),r=null)});let v=50;return D(()=>{m();let{helpers:{getAllControllers:w}}=$({选择算法:{value:[a.label,e.map(S=>S.label)],onChange(S){let E=e.find(O=>O.label==S);o.value=E.value}},随机数个数:{value:[d,10,100,1],onFinishChange(S){d=S}},自动开始时间间隔:{value:[v,16,100,5],onFinishChange(S){v=S}},生成随机数:{value:[function(){m()}],disable:x.value!=0},排序下一步:{value:[function(){f()}],disable:!u.value||x.value!=0},自动开始(){b()},查看源码(){s("check-source")}}),y=L(x,S=>{w().forEach(E=>{E.property!="查看源码"&&E.disable(S>0)})});P(()=>{y(),clearInterval(x.value)})}),(w,y)=>(j(),F("div",ha,[G("div",{ref_key:"node",ref:t},null,512)]))}}),ma=q(fa,[["__scopeId","data-v-698136a6"]]),pa=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,ga=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,va=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,xa=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,ya="/demo/assets/imgs/display-B3luB7Uf.png",ba={codes:[{name:"index.vue",code:la,lang:"js"},{name:"bubble.ts",code:pa,lang:"ts"},{name:"selection.ts",code:ga,lang:"ts"},{name:"insertion.ts",code:va,lang:"ts"},{name:"merge.ts",code:xa,lang:"ts"}],component:ma,display:ya,title:"排序算法可视化",descriptions:""},_a=`<template>
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
`,wa=`import { easeOutCubic } from './ease'
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
`;function Ra(l){return 1-Math.pow(1-l,3)}var en=(l=>(l[l.NORMAL=0]="NORMAL",l[l.REVERSE=1]="REVERSE",l))(en||{});function Sa(l,n){let{startIndex:s=0,speed:t=1,onDone:e,onProcessing:a}=n,o=s,r,i;const c=m=>{cn(m)&&(i=Math.ceil(800/m))},g=()=>{r&&(cancelAnimationFrame(r),r=0)};c(t);function d(m){g();let{direction:f,speed:x,startIndex:b}=m,v;c(x),cn(b)&&(o=b);const w=y=>{v||(v=y),y-v>=i&&(f==0?o=(o+1)%l.length:o=o-1>=0?o-1:l.length-1,a(o),v=y),r=requestAnimationFrame(w)};r||(r=requestAnimationFrame(w))}function p(){g()}function u(m){g();let{loopTimes:f=5,targetIndex:x=l.length-1,direction:b,speed:v,startIndex:w}=m||{};f=Math.max(Math.ceil(Number(f)),1),x=Math.max(0,Math.min(Number(x),l.length-1)),c(v),cn(w)&&(o=w);let y=o,S,E=x-y;b==0?S=y+f*l.length+(E>=0?E:l.length+E):S=y-f*l.length+(E<=0?E:-l.length+E);let O=Math.abs(S-y)*i,h;const R=T=>{h||(h=T);let M=Math.min(1,(T-h)/O),B=(Math.ceil(Ra(M)*(S-y))+y)%l.length;if(B<0&&(B+=l.length),o!=B&&(o=B,a(o)),M==1){e(o),r=0;return}r=requestAnimationFrame(R)};r=requestAnimationFrame(R)}return{wander:d,stop:p,draw:u}}const Ca={class:"box"},Ba={style:{display:"flex"}},Ia=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=C(1),e=[...Array(10)],a={targetIndex:2,loopTimes:2,direction:en.NORMAL,speed:5},{wander:o,stop:r,draw:i}=Sa(e,{speed:a.speed,startIndex:t.value,onProcessing:u=>{t.value=u},onDone(u){pn({showClose:!0,message:"已经抽奖完毕",type:"success",grouping:!0}),t.value=u}});function c(){o({...a})}function g(){i({...a})}P(()=>{r(),d&&clearTimeout(d)});let d;function p(){c(),d=setTimeout(()=>{a.targetIndex=$n(e),g(),d=0},2500)}return $({设定巡航速度:{value:[a.speed,1,10,1],onFinishChange(u){a.speed=u}},设定最终选中项索引:{value:[a.targetIndex,0,e.length-1,1],onFinishChange(u){a.targetIndex=u}},轮转次数:{value:[a.loopTimes,2,20,1],onFinishChange(u){a.loopTimes=u}},轮转方向:{value:[a.direction==en.NORMAL?"正向":"负向",["正向","负向"]],onChange(u){a.direction=u=="正向"?en.NORMAL:en.REVERSE}},开始抽奖:g,开始巡航:c,停止:r,模拟接口返回预制数据:p,查看源码(){s("check-source")}}),(u,m)=>{const f=zn;return j(),F("div",Ca,[W(f,{class:"demo-card",shadow:"always"},{default:A(()=>[G("div",Ba,[(j(),F(X,null,tn(e,(x,b)=>G("div",{class:ln(["block",K(t)==b?"selected":""])},un(b),3)),64))])]),_:1})])}}}),ka=q(Ia,[["__scopeId","data-v-2fa66777"]]),ja="/demo/assets/imgs/display-DiF1Sfat.png",Ea={codes:[{name:"index.vue",code:_a,lang:"js"},{name:"draw-price.ts",code:wa,lang:"ts"}],component:ka,display:ja,title:"抽奖",descriptions:""},Fa=`<template>
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
`,Oa="/demo/assets/imgs/018194d9aac11f975e17b274fe4a78af1463731957-BlWzWTpc.png",Ta="/demo/assets/imgs/10251358673700483-Bf69morh.jpg",Ma="/demo/assets/imgs/10251358673922612-wa-5hia3.jpg",za="/demo/assets/imgs/10251381214893821-DZ0tyfKl.jpg",$a="/demo/assets/imgs/10251381215028477-DT0oxPDL.jpg",Na="/demo/assets/imgs/10251381215091916-34MSuKPK.jpg",Da="/demo/assets/imgs/10251381215152314-ZOViud5b.jpg",Pa="/demo/assets/imgs/10251381215208971-BnTSlzDn.jpg",Aa="/demo/assets/imgs/10251381215487222-CyoYfFWR.jpg",Wa="/demo/assets/imgs/10251381215991717-jivRh7vw.jpg",La="/demo/assets/imgs/10251381216212847-C6d5iI8I.jpg",Ga="/demo/assets/imgs/3a5950fc2408a7f8136de8704e1819c21463732075-DT6cAkAt.png",Ha="/demo/assets/imgs/48d780d33eaf46a5646376b814b8efa71463731556-CGACL27Z.png",qa="/demo/assets/imgs/554e21161de34506e9cb1ecbcd85716d1463732343-LZH7KjnQ.png",Va="/demo/assets/imgs/884f9b653e317cc514890954b2e35be81463731323-DvATjqjX.png",Ka="/demo/assets/imgs/8a116da0668edebd82af16ecf7e75ace1590566316-Cl-PTpZA.jpg",Ua="/demo/assets/imgs/928d6ec50975da022bda97a1ab8f04c81463731839-d_LHiOEG.png",Xa="/demo/assets/imgs/a748932756b48bd46a8fd17df4579dea1463732104-DlsyWN-A.png",Ya="/demo/assets/imgs/b5978ead603dcdc66704e721960debe31590565987-4RsIwXgW.jpg",Qa="/demo/assets/imgs/c06f07de280d4edebf801eef4b142c721463731804-DD1ps6p3.png",Za="/demo/assets/imgs/ceb8c078cf6b410d7def183870fe584d1590566557-9BfKn2sf.jpg",Ja="/demo/assets/imgs/ea5871bc33e131b497b9bb273890e8ae1463731875-WWF6WmyZ.png",ni="/demo/assets/imgs/f29af13446f1feed47dcfd299ccaa23c1463732001-DrhlCMaO.png",ei="/demo/assets/imgs/fef4eadd191c3461054ca60cde8576db1590566398-Bn18syhQ.jpg",ti={class:"container"},ai=["src"],ii=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=[...Object.values([Oa,Ta,Ma,za,$a,Na,Da,Pa,Aa,Wa,La,Ga,Ha,qa,Va,Ka,Ua,Xa,Ya,Qa,Za,Ja,ni,ei])];t=C(Ke(t,Math.ceil(t.length/5))),$({查看源码(){s("check-source")}});function a(r){r.target.classList.add("level-up")}function o(r){r.target.classList.remove("level-up")}return(r,i)=>(j(),F("div",ti,[(j(!0),F(X,null,tn(K(t),(c,g)=>(j(),F("div",{class:ln(["hive-row",g%2==1?"odd":""]),onMouseenter:a,onMouseleave:o},[(j(!0),F(X,null,tn(c,d=>(j(),F("img",{class:"hive-item",src:d,alt:""},null,8,ai))),256))],34))),256))]))}}),si=q(ii,[["__scopeId","data-v-93867a89"]]),li="/demo/assets/imgs/display-BVEemRNY.png",ri={codes:[{name:"index.vue",code:Fa,lang:"js"}],component:si,display:li,title:"蜂巢图片",descriptions:""},oi=`<template>
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
`,ci=`import { isFunc } from '@/utils/utils'

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
`,ui=`import type { SceneInstance, SceneObj } from "./scene"
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
`;class di{constructor(n){_(this,"canvas");_(this,"ctx");_(this,"width",0);_(this,"height",0);_(this,"background");_(this,"_t0",0);_(this,"_t1",0);_(this,"_dt",0);_(this,"_objects",[]);_(this,"_raf",0);let{width:s,height:t,canvas:e,background:a}=n;this.canvas=e,this.ctx=e.getContext("2d"),this.background=a??"#000",this.setSize(s,t)}setSize(n,s){this.canvas.width=n,this.canvas.height=s,this.width=n,this.height=s}_render(){let{width:n,height:s,ctx:t,background:e}=this;t.fillStyle=e,t.fillRect(0,0,n,s);for(let a of[...this._objects])a.render(this._dt)}_updateTime(n){this._t0==0&&(this._t0=n),this._dt=n-this._t0}run(n){const s=t=>{this._updateTime(t),rn(n)&&n(this._dt),this._render(),this._raf=requestAnimationFrame(s)};this._raf=requestAnimationFrame(s)}addObj(...n){return n.forEach(s=>{this._objects.find(t=>t==s)||(this._objects.push(s),s.scene=this)}),this}removeObj(n){let s=this._objects.findIndex(t=>t==n);return s!=-1&&(this._objects.splice(s,1),n.scene==this&&(n.scene=null)),this}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._t0=0,this._t1=0,this._dt=0)}}const hi=[...Array(26)].map((l,n)=>["a","A"].map(s=>String.fromCharCode(s.charCodeAt(0)+n))).flat();function fi(){return[...Array(Z(8)+2)].map(()=>Nn(hi)).join("")}class mi{constructor(n){_(this,"_x");_(this,"_y");_(this,"_text");_(this,"_opacity");_(this,"_onDismiss");_(this,"scene");_(this,"_opacityDecay");_(this,"_rawOptions");_(this,"_yStep");_(this,"_font","20px serif");_(this,"_fillStyle","red");let{x:s,y:t,text:e,opacity:a,opacityDecay:o,onDismiss:r,yStep:i}=n;this._x=s,this._y=t,this._text=e,this._opacity=a,this._onDismiss=r,this._opacityDecay=o??.01,this._rawOptions={...n},this._yStep=i??4}setFont(n,s){return this._font=n,this._fillStyle=s,this}render(n){let{_text:s,_x:t,_y:e,_opacityDecay:a,_yStep:o,_fillStyle:r,_font:i}=this,{ctx:c,height:g}=this.scene,d={font:c.font,fillStyle:c.fillStyle,globalAlpha:c.globalAlpha};this._opacity-=typeof a=="number"?a:a(n),this._opacity<0&&(this._opacity=0),c.font=i,c.fillStyle=r,c.globalAlpha=this._opacity;let p=0,u=e+(typeof o=="number"?o:o(n));for(let m of s){let f=c.measureText(m);const{actualBoundingBoxAscent:x,actualBoundingBoxDescent:b}=f;let v=b+x;c.fillText(m,t,u-p),p+=v+10}this._y=u,Object.assign(c,d),(this._opacity==0||u-p>g)&&this._onDismiss(this)}}class pi{constructor(n){_(this,"scene");_(this,"num",0);_(this,"maxNum",100);_(this,"colors",["brown","red","green","yellow","chocolate","pink","burlywood","chartreuse","cyan"]);let{scene:s,maxNum:t}=n;this.scene=s,t&&(this.maxNum=t)}addText(){if(this.num<this.maxNum){this.num++;let{width:n,height:s}=this.scene,t=new mi({text:fi(),x:Z(n),y:Z(s),yStep:Z(10)+2,opacity:+Math.min(1,Math.random()+.2).toPrecision(2),opacityDecay:.01,onDismiss:e=>{this.scene.removeObj(e),this.num--}}).setFont(`${Z(15)+14}px serif`,Nn(this.colors));this.scene.addObj(t)}}start(){this.scene.run(n=>{this.addText()})}stop(){this.scene.stop()}}function gi(l,n,s){l.addEventListener("resize",n),P(()=>{l.removeEventListener("resize",n)})}const vi={class:"box"},xi=z({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=C(),t=n;return D(()=>{let e=new di({width:innerWidth,height:innerHeight,canvas:s.value}),{obj:a}=$({文字串数量:{value:[10,10,200,10],onChange(r){o.maxNum=r}},查看代码:function(){t("check-source")}}),o=new pi({scene:e,maxNum:a.文字串数量});o.start(),gi(window,()=>{e.setSize(innerWidth,innerHeight)}),P(()=>{o.stop()})}),(e,a)=>(j(),F("div",vi,[G("canvas",{ref_key:"canvas",ref:s},null,512)]))}}),yi=q(xi,[["__scopeId","data-v-4010e3a7"]]),bi="/demo/assets/imgs/display-DwV-CRAI.png",_i={codes:[{name:"index.vue",code:oi,lang:"js"},{name:"scene.ts",code:ci,lang:"ts"},{name:"textRain.ts",code:ui,lang:"ts"}],component:yi,display:bi,title:"文字雨",descriptions:""};let on;function Dn(){return on||(on=Object.assign({"./demo/canvas/audio-wave/config.ts":He,"./demo/canvas/bfs/config.ts":Ze,"./demo/canvas/chasing/config.ts":tt,"./demo/canvas/connect-balls/config.ts":lt,"./demo/canvas/coord/config.ts":dt,"./demo/canvas/dfs/config.ts":vt,"./demo/canvas/eyeballs/config.ts":_t,"./demo/canvas/faliling-balls/config.ts":It,"./demo/canvas/friction/config.ts":Ft,"./demo/canvas/noise/config.ts":zt,"./demo/canvas/text-particle/config.ts":Ht,"./demo/canvas/wander-balls/config.ts":Ut,"./demo/css/blur/config.ts":na,"./demo/css/shadow/config.ts":sa,"./demo/d3/sort/config.ts":ba,"./demo/draw-price/config.ts":Ea,"./demo/hive/config.ts":ri,"./demo/text-rain/config.ts":_i}),on)}let Pn=[];function wi(){const l=Dn();for(let n in l){let{codes:s,component:t,title:e}=l[n],a=function(){return In(ze,{codes:s},({checkSource:i})=>In(t,{onCheckSource:()=>{i()}}))};a.displayName=`Demo(${n})`;let o=n.replace(/.*\/demo\//,"").replace("/config.ts","").split("/").join("-");l[n].routeName=o,Pn.push({path:o,name:o,component:a,meta:{title:e}})}}wi();const Ri={path:"/demo",children:Pn},Si={class:"common-layout"},Ci=z({__name:"index",setup(l){let n=Object.values(Dn());return(s,t)=>{const e=be,a=_e,o=zn,r=ye,i=xe,c=ve,g=we;return j(),F("div",Si,[W(g,{class:"container"},{default:A(()=>[W(c,{class:"main"},{default:A(()=>[W(i,{class:"row",gutter:20},{default:A(()=>[(j(!0),F(X,null,tn(K(n),d=>(j(),vn(r,{key:d.routeName,span:4},{default:A(()=>[W(o,{class:"demo-card","body-style":{padding:"0px"},shadow:"always",onClick:p=>s.$router.push({name:d.routeName})},{footer:A(()=>[W(a,{tag:"p"},{default:A(()=>[dn(un(d.title),1)]),_:2},1024),W(a,{tag:"p","line-clamp":2},{default:A(()=>[dn(un(d.descriptions||"暂无描述"),1)]),_:2},1024)]),default:A(()=>[W(e,{class:"image",src:d.display,fit:"cover"},null,8,["src"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}}}),Bi=q(Ci,[["__scopeId","data-v-fe2c6a64"]]),An=Re({history:Se("/demo/"),routes:[{path:"/",component:Bi},Ri]});An.beforeEach((l,n,s)=>{document.title=l.meta.title??"my demos",s()});const Rn=Ce(je);Rn.use(Be());Rn.use(An);Rn.mount("#app");
