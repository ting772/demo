var te=Object.defineProperty;var se=(r,e,o)=>e in r?te(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o;var C=(r,e,o)=>se(r,typeof e!="symbol"?e+"":e,o);import{r as ae,c as Rn,o as O,d as P,a as k,b as Sn,e as A,P as ie,f as F,g as H,t as pn,n as cn,u as X,h as G,i as oe,w as V,E as re,F as K,j as on,k as le,l as ce,m as mn,p as xn,q as ue,s as U,v as de,x as he,y as N,z as W,A as _n,B as q,C as fe,D as gn,G as rn,H as un,I as Hn,J as Y,K as J,L as Mn,M as pe,N as S,O as yn,Q as Vn,R as zn,S as kn,T as Bn,U as bn,V as vn,W as En,X as me,Y as In,Z as ge,_ as ve,$ as jn,a0 as Cn,a1 as qn,a2 as $n,a3 as xe,a4 as ye,a5 as be,a6 as we,a7 as _e,a8 as Ce,a9 as Re,aa as Se,ab as ke,ac as Be,ad as Ee,ae as Xn,af as Dn,ag as Ie,ah as je,ai as Te,aj as Oe,ak as Fe,al as Pe,am as Me,an as ze,ao as $e,ap as De}from"./vendor-jPCfGOvj.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const L=(r,e)=>{const o=r.__vccOpts||r;for(const[t,n]of e)o[t]=n;return o},Ae={};function Ne(r,e){const o=ae("RouterView");return O(),Rn(o)}const We=L(Ae,[["render",Ne]]),Le={class:"pre"},Ge=P({__name:"hilight",props:{code:{},lang:{}},setup(r){const e=r,o=k(),t=Sn(()=>e.lang?`lang-${e.lang}`:"auto");return A(()=>{ie.highlightElement(o.value)}),(n,a)=>(O(),F("pre",Le,[H("code",{class:cn(X(t)),ref_key:"codeRef",ref:o},pn(n.code),3)]))}}),He={class:"container"},Ve={class:"dialog-footer"},qe=P({__name:"codeDemo",props:{codes:{}},setup(r){const e=k(!1);function o(){e.value=!0}return(t,n)=>{const a=le,l=re,c=ce,s=ue;return O(),F(K,null,[H("div",He,[oe(t.$slots,"default",{checkSource:o},void 0,!0)]),G(s,{modelValue:X(e),"onUpdate:modelValue":n[1]||(n[1]=h=>xn(e)?e.value=h:null),title:"",width:"50vw",top:"50px"},{footer:V(()=>[H("span",Ve,[G(c,{type:"primary",onClick:n[0]||(n[0]=h=>e.value=!1)},{default:V(()=>n[2]||(n[2]=[mn("关闭")])),_:1})])]),default:V(()=>[G(l,{type:"border-card"},{default:V(()=>[(O(!0),F(K,null,on(t.codes,h=>(O(),Rn(a,{label:h.name,key:h.name,lazy:""},{default:V(()=>[G(Ge,{code:h.code,lang:h.lang},null,8,["code","lang"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"])],64)}}}),Xe=L(qe,[["__scopeId","data-v-65455990"]]),Ye=`<template>
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
`,Ke=`import { rafLoop } from '@thing772/utils'

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
`;function Ue(r,e){const o=new AudioContext,t=o.createMediaElementSource(r),n=o.createAnalyser();t.connect(n),n.connect(o.destination),n.fftSize=512;const a=n.frequencyBinCount,l=new Uint8Array(a),c=e.getContext("2d");let s=e.width,h=e.height;function f(){n.getByteTimeDomainData(l),c.save(),Object.assign(c,{fillStyle:"red"});const d=s/a;for(let u=0;u<a;u+=4){const p=l[u]/255*h;c.fillRect(d*u,h-p,d,p)}c.fill(),c.restore()}function i(d,u){s=e.width=d,h=e.height=u}function m(){return U(()=>{c.clearRect(0,0,s,h),f()})}return{setSize:i,start:m}}const Qe="/demo/assets/media/%E5%8C%96%E5%87%A1-DF7X08YA.ogg";function z(r){if(!r.title){const o=de().meta.title;o&&(r.title=o)}const e=he(r);return N(()=>{e.gui.destroy()}),e}const Ze=["src"],Je=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;z({查看源码(){o("check-source")}});const t=k(),n=k();return A(()=>{let a;n.value.onplay=()=>{const{start:l,setSize:c}=Ue(n.value,t.value);a=W(window,"resize",()=>{c(innerWidth,innerHeight)},{immediate:!0}),l()},N(()=>{a&&a()})}),(a,l)=>(O(),F(K,null,[H("audio",{ref_key:"audioRef",ref:n,src:X(Qe),id:"audio",controls:""},null,8,Ze),H("canvas",{ref_key:"canvasRef",ref:t},null,512)],64))}}),nt=L(Je,[["__scopeId","data-v-91a379c6"]]),et="/demo/assets/imgs/display-_9yby0tz.png",tt={codes:[{name:"index.vue",code:Ye,lang:"js"},{name:"audio-wave",code:Ke,lang:"ts"}],component:nt,display:et,title:"音频波形",descriptions:""},st=`<template>
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
`;function Yn(r){return Math.floor(Math.random()*r.length)}function Kn(r){return r[Yn(r)]}function at(r,e=1e3){const o=[];for(let t=0;t<r;t++)o.push(Z(e));return o}function Z(r=1e3){return Math.ceil(Math.random()*r)}function it(r,e){return r.reduce((o,t,n)=>(n%e==0&&o.push(r.slice(n,n+e)),o),[])}function ln(r,e,o){const t=r[e];r[e]=r[o],r[o]=t}function fn(r){return r!=null}function dn(r){return typeof r=="function"}function wn(r){return r}function Tn(r){let e=[];function o(t){const n=t-e.length;return n>0?e.push(..._n(r,n)):n<0&&(e=e.slice(0,n)),e}return o.update=function(t){e.forEach(n=>t(n))},o}function nn(r,e){return~~(r/e)*e}function sn(r,e,o){const{dx:t,dy:n}=e,a=Math.sqrt(t**2+n**2);return{x:r.x+t*o/a,y:r.y+n*o/a}}function An(r,e,o){return r<e||r>o}function ot(r,e){if(!OffscreenCanvas){console.warn("不支持OffscreenCanvas");return}const t=new OffscreenCanvas(101,1).getContext("2d"),n=t.createLinearGradient(0,0,100,0);n.addColorStop(0,r),n.addColorStop(1,e),t.fillStyle=n,t.fillRect(0,0,101,1);let a=t.getImageData(0,0,101,1).data;function l(c,s){return{r:c[s*4+0],g:c[s*4+1],b:c[s*4+2],a:c[s*4+3]}}return c=>{let s=Math.max(0,Math.min(100,~~(c*100)));return l(a,s)}}function rt(r,e,o){r.save(),typeof o=="object"&&Object.assign(r,o);let t=typeof o=="function"?o:void 0,[n,...a]=e;if(r.beginPath(),r.moveTo(n.x,n.y),t){let l=0,c=a.length;for(let s of a){if(Object.assign(r,t(l,c)),r.lineTo(s.x,s.y),r.stroke(),l++,l>=c)break;r.beginPath(),r.moveTo(s.x,s.y)}}else{for(let l of a)r.lineTo(l.x,l.y);r.stroke()}r.restore()}function*Nn(r,e,o,t){const n=[{...r}],a=[],l={...e},c={};let s;const h=(i,m)=>{if(!(i>o||m>t||i<0||m<0))return{x:i,y:m}},f=i=>`${i.x}-${i.y}`;for(;n.length>0;){if(s&&(c[f(s)]=!0,a.push({...s})),s=n.shift(),delete c[f(s)],s.x==l.x&&s.y==l.y)return{current:s,visited:[...a],pending:[...n]};const i=h(s.x,s.y-1),m=h(s.x+1,s.y),d=h(s.x,s.y+1),u=h(s.x-1,s.y);let p=[i,m,d,u].filter(Boolean);p=p.filter(y=>!c[f(y)]),p.length!=0&&(p.forEach(y=>{y.parent=s,c[f(y)]=!0}),n.push(...p),yield{current:s,visited:[...a],pending:[...n]})}}function lt(r,e,o,t){const n=[{...r}],a=[],l={...e},c={};let s;const h=(i,m)=>{if(!(i>o||m>t||i<0||m<0))return{x:i,y:m}},f=i=>`${i.x}-${i.y}`;for(;n.length>0;){if(s&&(c[f(s)]=!0,a.push({...s})),s=n.shift(),delete c[f(s)],s.x==l.x&&s.y==l.y)return{current:s,visited:[...a],pending:[...n]};const i=h(s.x,s.y-1),m=h(s.x+1,s.y),d=h(s.x,s.y+1),u=h(s.x-1,s.y);let p=[i,m,d,u].filter(Boolean);p=p.filter(y=>!c[f(y)]),p.length!=0&&(p.forEach(y=>{y.parent=s,c[f(y)]=!0}),n.push(...p))}}function Un(){const r=k(0);return q(r,(e,o)=>{e==0&&o>0&&clearInterval(o)},{flush:"sync"}),fe(()=>{r.value=0}),r}const ct=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t,n,a,l,c,s,h;const f=k("#c5afbb"),i=k(30),m=k(),d=gn({x:20,y:10}),u=gn({x:0,y:0}),p=x=>{const R=m.value;a=nn(innerWidth,i.value),l=nn(innerHeight,i.value),R.width=a,R.height=l,t=a/i.value-1,n=l/i.value-1,x==null||x();const M=h.helpers.getControllerByKey,T={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:n,setValue:d.y},设置终点X:{max:t,setValue:u.x},设置终点Y:{max:n,setValue:u.y}};for(const I in T){const $=M(I),D=T[I];for(const tn in D)$[tn](D[tn])}};q([m,f],([x,R])=>{un(x,{"background-color":R})}),q(i,()=>{v.value=0,p(),w()});const y=(x,R,M)=>{s.save(),Object.assign(s,M),s.fillRect(x*i.value,R*i.value,i.value,i.value),s.restore()},b=(x,R)=>{y(x,R,{fillStyle:"red"})},g=(x,R)=>{y(x,R,{fillStyle:"green"})},w=x=>{const R=m.value;s.clearRect(0,0,a,l),Hn({width:a,height:l,gridSize:i.value,canvas:R,ctx:s,lineWidth:1,gridLineColor:"#fff"}),typeof x=="function"&&x(),b(d.x,d.y),g(u.x,u.y)};q([d,u],()=>{w(),v.value=0,c=Nn(d,u,t,n)});const v=Un(),_=rn();function B(x){const{current:R,pending:M,visited:T}=x;w(()=>{y(R.x,R.y,{fillStyle:"gold"}),M.forEach(I=>{const{x:$,y:D}=I;y($,D,{fillStyle:"pink"})}),T.forEach(I=>{const{x:$,y:D}=I;y($,D,{fillStyle:"black"})})})}function j(x){for(;x;)y(x.x,x.y,{fillStyle:"blue"}),x=x.parent;b(d.x,d.y),g(u.x,u.y)}q(_,x=>{const{value:R,done:M}=x;M&&!R||(B(R),M&&j(R.current))});const E=()=>{h=z({设置背景色:{value:[f.value],isColor:!0,onFinishChange(x){f.value=x}},网格大小设置:{value:[i.value,5,50,1],onFinishChange(x){i.value=x}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(x){d.x=x}},设置起始点Y:{value:[d.y,0,n,1],onFinishChange(x){d.y=x}},设置终点X:{value:[u.x,0,t,1],onFinishChange(x){u.x=x}},设置终点Y:{value:[u.y,0,n,1],onFinishChange(x){u.y=x}},自动bfs迭代(){c&&(v.value=0,v.value=setInterval(()=>{const x=c.next();_.value=x,x.done&&(v.value=0)},100))},bfs巡路(){console.time("bfs寻路耗时"),v.value=0;const x=lt(d,u,t,n);if(!x)throw Error("没有找到终点");console.timeEnd("bfs寻路耗时"),w(()=>{j(x.current)})},查看源码(){o("check-source")}})};return A(()=>{s=m.value.getContext("2d"),E(),p(()=>{Object.assign(u,{x:~~(t/2),y:~~(n/2)})}),c=Nn(d,u,t,n)}),(x,R)=>(O(),F("canvas",{ref_key:"canvasRef",ref:m},null,512))}}),ut="/demo/assets/imgs/display-BFxeQr0P.png",dt=`export type Index = { x: number; y: number }
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
`,ht={codes:[{name:"index.vue",code:st,lang:"js"},{name:"bfs.ts",code:dt,lang:"ts"}],component:ct,display:ut,title:"canvas网格——广度优先搜索",descriptions:""},ft=`<template>
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
`;class Q{constructor(e){C(this,"x",0);C(this,"y",0);C(this,"r",0);C(this,"vx",0);C(this,"vy",0);C(this,"ax",0);C(this,"ay",0);C(this,"styleOptions",{});e&&this.set(e)}reset(e){return Object.assign(this,{x:0,y:0,r:0,vx:0,vy:0,ax:0,ay:0,...e?{styleOptions:{}}:null})}set(e){return Object.assign(this,e)}update(){return this.vy+=this.ay,this.y+=this.vy,this.vx+=this.ax,this.x+=this.vx,this}render(e){e.save();const{x:o,y:t,r:n,styleOptions:a}=this;Object.assign(e,a),e.beginPath(),e.arc(o,t,n,0,Math.PI*2),a.fillStyle&&e.fill(),a.strokeStyle&&e.stroke(),e.restore()}}const pt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;z({查看源码(){o("check-source")}});const t=k();return A(()=>{const n=t.value;let a,l,c;const s=n.getContext("2d"),h=W(window,"resize",()=>{Object.assign(n,{width:a=innerWidth,height:l=innerHeight})},{immediate:!0}),f=W(n,"mousemove",function(d){c={x:d.offsetX,y:d.offsetY}}),i=new Q({r:100,x:a/2,y:l/2,styleOptions:{fillStyle:Y()}}),m=U(()=>{s.clearRect(0,0,a,l),c&&(i.x=J(i.x,c.x,.05),i.y=J(i.y,c.y,.05)),i.render(s)});N(()=>{h(),f(),m()})}),(n,a)=>(O(),F("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),mt="/demo/assets/imgs/display-IdleEMXt.png",gt={codes:[{name:"index.vue",code:ft,lang:"js"},{name:"ball.ts",code:en,lang:"ts"}],component:pt,display:mt,title:"缓动追逐",descriptions:""},vt=`<template>
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
`,On=`import { rafLoop, updateBallVelocityInRect, isFunc } from '@thing772/utils'
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
`;function Fn(r){const{canvas:e,ballsNum:o,createBallFac:t,onBallUpdate:n,speedDecay:a,preRender:l,postRender:c}=r;let s=e.width,h=e.height;const f=e.getContext("2d");let i=[];const m=Tn(t);function d(v){i=m(v),p()}function u(v){Object.assign(e,v),s=v.width,h=v.height,p()}function p(v){i.forEach(_=>{Mn(v)&&v(_),_.render(f)})}function y(){f.clearRect(0,0,s,h);for(const v of i)Mn(n)?n(v):(v.update(),pe(v,{wBox:[0,s],hBox:[0,h],speedDecay:a}));l==null||l(i,f),i.forEach(v=>v.render(f)),c==null||c(i,f)}function b(v){f.clearRect(0,0,s,h),p(v)}d(o);let g;function w(){return g&&g(),g=U(()=>{y()})}return{start:w,setBallNum:d,setSize:u,render:y,updateBalls:b}}const xt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=80,n=1,a=3,l=3,c=100,s;z({小球个数:{value:[t,1,1e3,10],onFinishChange(d){t=d,i.setBallNum(d)}},小球半径上限:{value:[n,1,100,1],onFinishChange(d){n=d,i.updateBalls(u=>{u.r=S(1,d)})}},小球x方向移动速度上限:{value:[a,1,15,.5],onFinishChange(d){a=d,i.updateBalls(u=>{u.vx=S(1,d)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(d){l=d,i.updateBalls(u=>{u.vy=S(1,d)})}},小球连接范围阈值:{value:[c,50,300,1],onFinishChange(d){c=d}},查看源码(){o("check-source")}});let h;const f=k();let i,m;return A(()=>{const d=f.value;let u=innerWidth,p=innerHeight;Object.assign(d,{width:u,height:p}),i=Fn({canvas:d,ballsNum:t,createBallFac:()=>new Q({x:S(10,u-10),y:S(10,p-10),r:S(1,n),vx:S(1,a),vy:S(1,l),styleOptions:{fillStyle:Y()}}),preRender(g,w){s||(s=yn(w,{strokeStyle:Y(),lineWidth:1})),m&&(g=g.concat(m));for(let v=0;v<g.length;v++)for(let _=v+1;_<g.length;_++){const B=g[v],j=g[_];Vn(B,j)<c&&s(B,j)}m&&g.pop()}});const y=W(window,"resize",()=>{u=innerWidth,p=innerHeight,i.setSize({width:u,height:p})},{immediate:!0}),b=W(d,"mousemove",g=>{m={x:g.offsetX,y:g.offsetY}},{needLog:!0});h=i.start(),N(()=>{y(),b(),h&&h()})}),(d,u)=>(O(),F("canvas",{ref_key:"canvasRef",ref:f},null,512))}}),yt="/demo/assets/imgs/display-y86Fu395.png",bt={codes:[{name:"index.vue",code:vt,lang:"js"},{name:"wander-balls.ts",code:On,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:xt,display:yt,title:"粒子小球连线",descriptions:""},wt=`<template>
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
`,_t=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,t=k();let n=innerWidth,a=innerHeight,l;const c=(u,p)=>Math.sin(5*u+.001*p)+Math.cos(10*u+.005*p);let s=k(""),h=c,f=300,i=1,m=Y();function d(){h=new Function("x","t",`return ${s.value}`);try{h(0,0)}catch(u){bn({showClose:!0,message:u.message,type:"error",grouping:!0})}}return A(()=>{const u=t.value,p=u.getContext("2d");z({采样率设置:{value:[f,10,1e3,10],onFinishChange(g){f=g}},曲线粗细设置:{value:[i,1,10,1],onFinishChange(g){i=g}},曲线颜色设置:{value:[m],isColor:!0,onFinishChange(g){m=g}},查看源码(){o("check-source")}}),l=zn({canvas:u,ctx:p,width:n,height:a});const y=U(g=>{p.clearRect(0,0,n,a),l.setup(),l.draw(w=>{let v=0;try{v=h(w,g)}catch{}return v},{rate:f,style:{strokeStyle:m,lineWidth:i},label:{name:h.toString().replace(/ anonymous/,""),pos:{x:100,y:100}}})}),b=W(window,"resize",()=>{n=innerWidth,a=innerHeight,l=zn({canvas:u,ctx:p,width:n,height:a})});N(()=>{b(),y()})}),(u,p)=>{const y=Bn;return O(),F(K,null,[H("canvas",{ref_key:"canvasRef",ref:t},null,512),G(y,{class:"input",modelValue:X(s),"onUpdate:modelValue":p[0]||(p[0]=b=>xn(s)?s.value=b:s=b),placeholder:"参数:（x:x坐标，t：时间参数），输入x和t的表达式",size:"large",onKeyup:kn(d,["enter"])},null,8,["modelValue"])],64)}}}),Ct=L(_t,[["__scopeId","data-v-926767a5"]]),Rt="/demo/assets/imgs/display-BsbAITaj.png",St={codes:[{name:"index.vue",code:wt,lang:"js"}],component:Ct,display:Rt,title:"笛卡尔坐标系函数绘制",descriptions:""},kt=`<template>
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
`;function*Wn(r,e,o,t){const n=[{...r}],a=[],l={...e},c={};let s;const h=u=>{c[d(u)]=!0,a.push({...u})},f=()=>{const u=n.shift();return delete c[d(u)],u},i=u=>{u.forEach(p=>{c[d(p)]=!0}),n.unshift(...u)},m=(u,p)=>{if(!(u>o||p>t||u<0||p<0))return{x:u,y:p}},d=u=>`${u.x}-${u.y}`;for(;n.length>0;){if(s&&h(s),s=f(),s.x==l.x&&s.y==l.y)return{current:s,visited:[...a],pending:[...n]};const u=m(s.x,s.y-1),p=m(s.x+1,s.y),y=m(s.x,s.y+1),b=m(s.x-1,s.y);let g=[u,p,y,b].filter(Boolean);g=g.filter(w=>!c[d(w)]),g.forEach(w=>{w.parent=s}),g.length!=0&&(i(g),yield{current:s,visited:[...a],pending:[...n]})}}function Bt(r,e,o,t){const n=[{...r}],a=[],l={...e},c={};let s;const h=u=>{c[d(u)]=!0,a.push({...u})},f=()=>{const u=n.shift();return delete c[d(u)],u},i=u=>{u.forEach(p=>{c[d(p)]=!0}),n.unshift(...u)},m=(u,p)=>{if(!(u>o||p>t||u<0||p<0))return{x:u,y:p}},d=u=>`${u.x}-${u.y}`;for(;n.length>0;){if(s&&h(s),s=f(),s.x==l.x&&s.y==l.y)return{current:s,visited:[...a],pending:[...n]};const u=m(s.x,s.y-1),p=m(s.x+1,s.y),y=m(s.x,s.y+1),b=m(s.x-1,s.y);let g=[u,p,y,b].filter(Boolean);g=g.filter(w=>!c[d(w)]),g.forEach(w=>{w.parent=s}),g.length!=0&&i(g)}}const Et=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t,n,a,l,c,s,h;const f=k("#c5afbb"),i=k(30),m=k(),d=gn({x:20,y:10}),u=gn({x:0,y:0}),p=x=>{const R=m.value;a=nn(innerWidth,i.value),l=nn(innerHeight,i.value),R.width=a,R.height=l,t=a/i.value-1,n=l/i.value-1,x==null||x();const M=h.helpers.getControllerByKey,T={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:n,setValue:d.y},设置终点X:{max:t,setValue:u.x},设置终点Y:{max:n,setValue:u.y}};for(const I in T){const $=M(I),D=T[I];for(const tn in D)$[tn](D[tn])}};q([m,f],([x,R])=>{un(x,{"background-color":R})}),q(i,()=>{v.value=0,p(),w()});const y=(x,R,M)=>{s.save(),Object.assign(s,M),s.fillRect(x*i.value,R*i.value,i.value,i.value),s.restore()},b=(x,R)=>{y(x,R,{fillStyle:"red"})},g=(x,R)=>{y(x,R,{fillStyle:"green"})},w=x=>{const R=m.value;s.clearRect(0,0,a,l),Hn({width:a,height:l,gridSize:i.value,canvas:R,ctx:s,lineWidth:1,gridLineColor:"#fff"}),typeof x=="function"&&x(),b(d.x,d.y),g(u.x,u.y)};q([d,u],()=>{w(),v.value=0,c=Wn(d,u,t,n)});const v=Un(),_=rn();function B(x){const{current:R,pending:M,visited:T}=x;w(()=>{y(R.x,R.y,{fillStyle:"gold"}),M.forEach(I=>{const{x:$,y:D}=I;y($,D,{fillStyle:"pink"})}),T.forEach(I=>{const{x:$,y:D}=I;y($,D,{fillStyle:"black"})})})}function j(x){for(;x;)y(x.x,x.y,{fillStyle:"blue"}),x=x.parent;b(d.x,d.y),g(u.x,u.y)}q(_,x=>{const{value:R,done:M}=x;M&&!R||(B(R),M&&j(R.current))});const E=()=>{h=z({设置背景色:{value:[f.value],isColor:!0,onFinishChange(x){f.value=x}},网格大小设置:{value:[i.value,5,50,1],onFinishChange(x){i.value=x}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(x){d.x=x}},设置起始点Y:{value:[d.y,0,n,1],onFinishChange(x){d.y=x}},设置终点X:{value:[u.x,0,t,1],onFinishChange(x){u.x=x}},设置终点Y:{value:[u.y,0,n,1],onFinishChange(x){u.y=x}},自动dfs迭代(){c&&(v.value=0,v.value=setInterval(()=>{const x=c.next();_.value=x,x.done&&(v.value=0)},100))},dfs巡路(){console.time("dfs寻路耗时"),v.value=0;const x=Bt(d,u,t,n);if(!x)throw Error("没有找到终点");console.timeEnd("dfs寻路耗时"),w(()=>{j(x.current)})},查看源码(){o("check-source")}})};return A(()=>{s=m.value.getContext("2d"),E(),p(()=>{Object.assign(u,{x:~~(t/2),y:~~(n/2)})}),c=Wn(d,u,t,n)}),(x,R)=>(O(),F("canvas",{ref_key:"canvasRef",ref:m},null,512))}}),It="/demo/assets/imgs/display-BRS54xHs.png",jt=`export type Index = { x: number; y: number }
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
`,Tt={codes:[{name:"index.vue",code:kt,lang:"js"},{name:"dfs.ts",code:jt,lang:"ts"}],component:Et,display:It,title:"canvas网格——深度优先搜索",descriptions:""},Ot=`<template>
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
`;class Qn{constructor(e){C(this,"x",0);C(this,"y",0);C(this,"tx",0);C(this,"ty",0);C(this,"color","pink");C(this,"name","");C(this,"fx",.01);C(this,"fy",.01);C(this,"onDone");C(this,"r",0);C(this,"size",0);C(this,"done",!1);Object.assign(this,e)}update(){var t;const{tx:e,ty:o}=this;if(!this.done)return this.x=J(this.x,e,this.fx),this.y=J(this.y,o,this.fy),vn(this.x,this.tx)&&vn(this.y,this.ty)&&(this.done=!0,(t=this.onDone)==null||t.call(this)),this}render(e){const{color:o,x:t,y:n,size:a,r:l}=this;e.save(),Object.assign(e,{fillStyle:o}),e.beginPath(),a>0?e.fillRect(t,n,a,a):l>0?e.arc(t,n,l,0,Math.PI*2):e.arc(t,n,2,0,Math.PI*2),e.fill(),e.restore()}}const Ln=20,Ft=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=20,n=30,a=10,l=0,c=0,s=25,h=25,f="#53e953",i=[],m,d=50;function u(){i=[];for(let v=0;v<t;v++)for(let _=0;_<n;_++){const B=-1*(n-1-_)*h+l/2+(n-1)*h/2,j=-1*(t-1-v)*s+c/2+(t-1)*s/2,E=new Qn({x:B,y:j,tx:B,ty:j,r:a,fx:S(.01,.5,!1),fy:S(.01,.5,!1),color:f});E.originPos={x:B,y:j},i.push(E)}}function p(v){i.forEach(_=>{Object.assign(_,v)})}z({球阵列行数:{value:[t,1,50,1],onFinishChange(v){t=v,u()}},球阵列列数:{value:[n,1,50,1],onFinishChange(v){n=v,u()}},球阵列列间距:{value:[h,6,50,2],onFinishChange(v){h=v,u()}},球阵列行间距:{value:[s,6,50,2],onFinishChange(v){s=v,u()}},影响半径:{value:[d,10,500,1],onFinishChange(v){d=v,u()}},小球半径:{value:[a,4,100,1],onFinishChange(v){a=v,p({r:a}),w()}},球颜色:{value:[f],isColor:!0,onFinishChange(v){f=v,p({color:v})}},查看源码(){o("check-source")}});const y=k(),b=()=>{l=nn(innerWidth,Ln),c=nn(innerHeight,Ln),Object.assign(y.value,{width:l,height:c})};let g;const w=()=>{if(g)for(const v of i){const{originPos:_}=v;if(me(g,d,_)){const B=d-Vn(g,_),j=sn(_,In(g,_),B*(B/d));Object.assign(v,{tx:j.x,ty:j.y,done:!1})}else Object.assign(v,{tx:_.x,ty:_.y,done:!1})}};return A(()=>{const v=y.value;m=v.getContext("2d");const _=W(window,"resize",En(()=>{b(),u()},100),{immediate:!0}),B=W(v,"mousemove",E=>{const{offsetX:x,offsetY:R}=E;g?(g.x=x,g.y=R):g={x,y:R},w()});un(v,{"background-color":"#0d0d0d"}),u();const j=U(()=>{m.clearRect(0,0,l,c);for(const E of i)E.update(),E.render(m)});N(()=>{_(),j(),B()})}),(v,_)=>(O(),F("canvas",{ref_key:"canvasRef",ref:y},null,512))}}),Pt=L(Ft,[["__scopeId","data-v-04ab409b"]]),Zn=`import { iterateEaseFromTo, looseEqual } from '@thing772/utils'

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
`,Mt="/demo/assets/imgs/display-D8ZXnX54.png",zt={codes:[{name:"index.vue",code:Ot,lang:"js"},{name:"particle.ts",code:Zn,lang:"js"}],component:Pt,display:Mt,title:"鼠标滑过小球堆的效果",descriptions:""},$t=`<template>
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
`,Dt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;z({查看源码(){o("check-source")}});const t=k();return A(()=>{const n=t.value;let a,l,c;const s=n.getContext("2d"),h=W(window,"resize",()=>{Object.assign(n,{width:a=innerWidth,height:l=innerHeight})},{immediate:!0}),f=W(n,"mousemove",function(b){c={x:b.offsetX,y:b.offsetY}}),i=[new Q({r:50,x:a/2-80,y:l/2,styleOptions:{fillStyle:Y()}}),new Q({r:50,x:a/2+80,y:l/2,styleOptions:{fillStyle:Y()}})],m=i.map(b=>new Q({r:b.r/4,x:b.x,y:b.y,styleOptions:{fillStyle:Y()}})),d=new Q({r:200,x:a/2,y:l/2,styleOptions:{fillStyle:"#E6A23C"}}),u=yn(s,{strokeStyle:"#fff",lineWidth:"10",lineCap:"round"}),p=.05,y=U(()=>{s.clearRect(0,0,a,l),d.render(s),i.forEach(b=>{b.render(s)}),m.forEach((b,g)=>{if(c){const w=b.x=J(b.x,c.x,p),v=b.y=J(b.y,c.y,p),_=i[g],B={x:_.x,y:_.y,r:_.r-10};if(!ge(B,b)){b.x=w,b.y=v;const j=ve(B,c);Object.assign(b,jn(B,j,B.r-b.r))}}b.render(s)}),u({x:a/2-50,y:l/2+100},{x:a/2+50,y:l/2+100})});N(()=>{h(),f(),y()})}),(n,a)=>(O(),F("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),At="/demo/assets/imgs/display-BcjSOcDf.png",Nt={codes:[{name:"index.vue",code:$t,lang:"js"},{name:"ball.ts",code:en,lang:"ts"}],component:Dt,display:At,title:"会动的眼球",descriptions:""},Wt=`<template>
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
`,Lt=`import { Ball } from '@/utils/class/ball'
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
`;function Gt(r){const{canvas:e,num:o,onAllStopped:t}=r,n=e.getContext("2d");let a=e.width,l=e.height,c=[],s=!1,h=!1;const f=Tn(()=>new Q(i()));function i(){return{x:S(10,a-10),y:S(10,l-10),r:4,ax:0,ay:S(.1,2,!1),vx:0,vy:S(1,3),styleOptions:{fillStyle:Y()},stopped:!1}}function m(g){c=f(g)}function d(){for(const g of c)g.reset().set(i());if(h=!1,!s)return b()}function u(g){Object.assign(e,g),a=g.width,l=g.height}function p(g){return g.stopped||vn(g.vy,0,1)&&vn(g.y+g.r,l,1)}function y(){if(c.length!=0){n.clearRect(0,0,a,l);for(const g of c)if(g.update(),g.y+g.r>l&&(g.y=l-g.r,g.vy*=-.7),g.render(n),p(g)&&(g.stopped=!0,c.every(p))){s=!1,h=!0;try{t==null||t()}catch(w){console.error(w)}return!1}}}m(o);function b(){if(s)return;s=!0,h&&d();const g=U(y);return()=>{s&&(s=!1,g())}}return{start:b,reset:d,setBallsNum:m,setSize:u,render:y}}const Ht=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=100;const n=k(),{helpers:{getControllerByKey:a}}=z({小球个数:{value:[t,1,1e3,10],onFinishChange(h){t=h,c.setBallsNum(h)}},开始(){const h=c.start();h&&(n.value=h)},暂停:{value:[function(){n.value()}],disable:!n.value},重置(){const h=c.reset();h&&(n.value=h)},查看源码(){o("check-source")}});q(n,h=>{a("暂停").enable(!!h)});const l=k();let c;function s(){bn({showClose:!0,message:"所有小球都停止运动了",type:"success",grouping:!0})}return A(()=>{const h=l.value;Object.assign(h,{width:innerWidth,height:innerHeight}),c=Gt({num:t,canvas:h,onAllStopped:s});const f=W(window,"resize",()=>{c.setSize({width:innerWidth,height:innerHeight})},{immediate:!0});c.render(),N(()=>{f(),n.value&&n.value()})}),(h,f)=>(O(),F("canvas",{ref_key:"canvasRef",ref:l},null,512))}}),Vt="/demo/assets/imgs/display-DOU4TeMC.png",qt={codes:[{name:"index.vue",code:Wt,lang:"js"},{name:"falling-balls.ts",code:Lt,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:Ht,display:Vt,title:"下落的小球",descriptions:""},Xt=`<template>
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
`,Yt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=100,n=20,a=20,l=17,c=.01;z({小球个数:{value:[t,1,1e3,10],onFinishChange(i){t=i,f.setBallNum(i)}},小球半径上限:{value:[n,4,100,1],onFinishChange(i){n=i,f.updateBalls(m=>{m.r=S(4,i)})}},小球x方向移动速度上限:{value:[a,1,15,.5],onFinishChange(i){a=i,f.updateBalls(m=>{m.vx=S(1,i)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(i){l=i,f.updateBalls(m=>{m.vy=S(1,i)})}},小球摩擦力因子:{value:[c,0,3,.1],onFinishChange(i){c=i,f.updateBalls(m=>{m.friction=S(0,i)})}},开始(){s&&s(),s=f.start()},查看源码(){o("check-source")}});let s;const h=k();let f;return A(()=>{const i=h.value;let m,d;Object.assign(i,{width:m=innerWidth,height:d=innerHeight}),f=Fn({canvas:i,ballsNum:t,createBallFac:()=>{const p={x:S(10,m-10),y:S(10,d-10),r:S(1,n),vx:S(1,a),vy:S(1,l),styleOptions:{fillStyle:Y()},friction:S(0,c)};return new Q(p)},onBallUpdate(p){p.vx>=.01&&(p.vx-=p.friction,p.x+=p.vx),p.vy>=.01&&(p.vy-=p.friction,p.y+=p.vy),p.x>m+p.r&&(p.x=-p.r),p.y>d+p.r&&(p.y=-p.r)}});const u=W(window,"resize",()=>{f.setSize({width:m=innerWidth,height:d=innerHeight})},{immediate:!0});N(()=>{u(),s&&s()})}),(i,m)=>(O(),F("canvas",{ref_key:"canvasRef",ref:h},null,512))}}),Kt="/demo/assets/imgs/display-BaZn1eIe.png",Ut={codes:[{name:"index.vue",code:Xt,lang:"js"},{name:"wander-balls.ts",code:On,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:Yt,display:Kt,title:"运动减速",descriptions:""},Qt=`<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { getHelixPoints } from '@/utils/curve';
import { drawCurve, interpolateColor } from '@/utils/utils';
import { registEvent, rafLoop, setElement, drawLine, rgb, randomHexColor } from '@thing772/utils'
import { throttle } from 'lodash-es'

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

/**
 * 画普通螺旋线
 * @param ctx
 */
function drawHelix(ctx: CanvasRenderingContext2D) {
  const line = drawLine(ctx, { strokeStyle: "pink" })
  line(...getHelixPoints({ count: 1000, rStart: 100, rEnd: Math.min(w / 2, h / 2), degStart: 90, degEnd: 360 }, { x: w / 2, y: h / 2 }))
}

/**
 * 画颜色渐变的螺旋线
 * @param ctx
 * @param interpolate - 颜色渐变插值器
 */
function drawHelix2(ctx: CanvasRenderingContext2D, interpolate: (ratio: number) => { r: number; g: number; b: number; a: number }) {
  let pts = getHelixPoints({ count: 500, rStart: 100, rEnd: Math.min(w / 2, h / 2), degStart: 0, degEnd: 360 * 5.5 }, { x: w / 2, y: h / 2 })

  drawCurve(ctx, pts, (index: number, total: number) => {
    let v = interpolate(index / (total - 1))
    return {
      strokeStyle: rgb(v.r, v.g, v.b, v.a,),
      lineWidth: Math.max(1, 10 * (index / (total - 1)))
    }
  })
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

  const interpolate = interpolateColor(randomHexColor(), randomHexColor())
  setElement(canvas, { 'background-color': '#0d0d0d' })

  if (interpolate) {
    drawHelix2(ctx, interpolate)
  } else {
    drawHelix(ctx)
  }

  const stopAni = rafLoop(() => {
    // ctx.clearRect(0, 0, w, h)

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
`;function Gn(r,e){let{count:o=100,degStart:t=0,degEnd:n=360,rStart:a,rEnd:l}=r,c=(l-a)/o,s=(n-t)/o,h=[],f=a,i=t;for(let m=0;m<o;m++)h.push(jn(e,i,f)),f+=c,i+=s;return h}const Zt=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t,n=window.innerWidth,a=window.innerHeight;z({查看源码(){o("check-source")}});function l(h){yn(h,{strokeStyle:"pink"})(...Gn({count:1e3,rStart:100,rEnd:Math.min(n/2,a/2),degStart:90,degEnd:360},{x:n/2,y:a/2}))}function c(h,f){let i=Gn({count:500,rStart:100,rEnd:Math.min(n/2,a/2),degStart:0,degEnd:1980},{x:n/2,y:a/2});rt(h,i,(m,d)=>{let u=f(m/(d-1));return{strokeStyle:qn(u.r,u.g,u.b,u.a),lineWidth:Math.max(1,10*(m/(d-1)))}})}const s=k();return A(()=>{const h=s.value;t=h.getContext("2d");const f=W(window,"resize",En(()=>{n=window.innerWidth,a=window.innerHeight,Object.assign(h,{width:n,height:a})},100),{immediate:!0}),i=ot(Cn(),Cn());un(h,{"background-color":"#0d0d0d"}),i?c(t,i):l(t);const m=U(()=>{});N(()=>{f(),m()})}),(h,f)=>(O(),F("canvas",{ref_key:"canvasRef",ref:s},null,512))}}),Jt=L(Zt,[["__scopeId","data-v-60f9368d"]]),ns="/demo/assets/imgs/display-BBE8hmEl.png",es={codes:[{name:"index.vue",code:Qt,lang:"js"}],component:Jt,display:ns,title:"螺旋线",descriptions:""},ts=`<template>
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
`,ss=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t,n=window.innerWidth,a=window.innerHeight;z({查看源码(){o("check-source")}});let l=100;function c(){return{x:S(0,n,!0),y:S(0,a,!0)}}function s(i,{length:m,step1:d,step2:u}){let p=Cn();const y={x:n/2,y:a/2};let b=In(y,i),g=sn(i,b,m);return{draw(w){if(An(i.x,0,n)||An(i.y,0,a)){i={...y},g=sn(y,b,.1);return}yn(w,{strokeStyle:p,lineWidth:1,lineCap:"round"})(i,g),i=sn(i,b,d),g=sn(g,b,u)}}}function h(i,m,d,u=1e3){return _n(p=>{let y=jn(i,p*360/u,m);const b=S(...d.lengthArgs),g=S(...d.step1Args),w=g*+S(.8,1,!1).toFixed(2);return s(y,{length:b,step1:g,step2:w})},u)}const f=k();return A(()=>{const i=f.value;t=i.getContext("2d");const m=W(window,"resize",En(()=>{n=window.innerWidth,a=window.innerHeight,Object.assign(i,{width:n,height:a})},100),{immediate:!0});un(i,{"background-color":"#0d0d0d"});let d=_n(()=>{const g=S(1,5),w=S(1,5),v=+S(.8,1,!1).toFixed(2),_=w*v;return s(c(),{length:g,step1:w,step2:_})},l),u=h({x:n/2,y:a/2},Math.min(n,a)/2-100,{step1Args:[.1,2,!1],lengthArgs:[1,20,!1]},100),p=h({x:n/2,y:a/2},Math.min(n,a)/2-200,{step1Args:[.1,2,!1],lengthArgs:[1,20,!1]},100),y=d.concat(u,u,p);const b=U(()=>{t.clearRect(0,0,n,a),y.forEach(g=>{g.draw(t)})});N(()=>{m(),b()})}),(i,m)=>(O(),F("canvas",{ref_key:"canvasRef",ref:f},null,512))}}),as=L(ss,[["__scopeId","data-v-ee7d2122"]]),is="/demo/assets/imgs/display-CmfO_pXK.png",os={codes:[{name:"index.vue",code:ts,lang:"js"}],component:as,display:is,title:"射线效果",descriptions:""},rs=`<template>
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
`,ls=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=innerWidth,n=innerHeight,a;const l=k(.01),c=k(.01),s=k(1),h=rn(new $n.Noise(Math.random())),f=k("simplex2"),i=()=>{const d=a.getImageData(0,0,t,n);for(let u=0;u<t;u++)for(let p=0;p<n;p++){const y=~~Math.min(255,Math.abs(h.value[f.value](u*l.value,p*c.value))*s.value*256);d.data[(p*t+u)*4+0]=y,d.data[(p*t+u)*4+1]=y,d.data[(p*t+u)*4+2]=y,d.data[(p*t+u)*4+3]=255}a.putImageData(d,0,0)};z({噪声生成算法:{value:[f.value,["simplex2","perlin2"]],onFinishChange(d){f.value=d}},x方向缩放因子:{value:[l.value,.001,.5,.001],onFinishChange(d){l.value=d}},y方向缩放因子:{value:[c.value,.001,.5,.001],onFinishChange(d){c.value=d}},值放缩因子:{value:[s.value,.01,255,.1],onFinishChange(d){s.value=d}},重新生成随机种子(){h.value=new $n.Noise(Math.random())},查看源码(){o("check-source")}});const m=k();return A(()=>{const d=m.value;d.width=t,d.height=n,a=d.getContext("2d",{willReadFrequently:!0});const u=W(window,"resize",xe(()=>{t=~~(innerWidth/1),n=~~(innerHeight/1),d.width=t,d.height=n,i()},100)),p=ye(i);N(()=>{u(),p()})}),(d,u)=>(O(),F("canvas",{ref_key:"canvasRef",ref:m},null,512))}}),cs="/demo/assets/imgs/display-CsCBxHWH.png",us={codes:[{name:"index.vue",code:rs,lang:"js"}],component:ls,display:cs,title:"随机噪声",descriptions:""},ds=`<template>
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
`,hs=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t="#cbc262",n="#fff",a=26,l=10,c=64,s=64;const h=k();let f,i;const m=k("");function d(){p()}z({设置背景色:{value:[t],isColor:!0,onChange(y){t=y,p()}},设置文字颜色:{value:[n],isColor:!0,onChange(y){n=y,p()}},设置文字大小:{value:[a,14,30,1],onChange(y){a=y,p()}},设置尺寸:{value:[c,32,64,1],onChange(y){c=y,s=y,f.width=c,f.height=s,p()}},设置圆角:{value:[l,0,100,1],onChange(y){l=y,p()}},图标下载(){f&&u(f)},查看源码(){o("check-source")}});function u(y){const b=y.toDataURL(),g=document.createElement("a");g.download="icon.png",document.body.appendChild(g),g.href=b,g.click(),document.body.removeChild(g)}function p(){i.clearRect(0,0,c,s),i.save(),i.beginPath(),i.moveTo(l,0),i.lineTo(f.width-l,0),i.quadraticCurveTo(f.width,0,f.width,l),i.lineTo(f.width,f.height-l),i.quadraticCurveTo(f.width,f.height,f.width-l,f.height),i.lineTo(l,f.height),i.quadraticCurveTo(0,f.height,0,f.height-l),i.lineTo(0,l),i.quadraticCurveTo(0,0,l,0),i.closePath(),i.clip(),Object.assign(i,{fillStyle:t}),i.fillRect(0,0,c,s),Object.assign(i,{fillStyle:n,textAlign:"center",textBaseline:"middle",font:`bold ${a}px aria`}),i.fillText(m.value,c/2,s/2+2),i.restore()}return A(()=>{f=h.value,f.width=c,f.height=s,i=f.getContext("2d"),p()}),(y,b)=>{const g=Bn;return O(),F(K,null,[G(g,{class:"input",modelValue:X(m),"onUpdate:modelValue":b[0]||(b[0]=w=>xn(m)?m.value=w:null),placeholder:"输入ICON中显示的字",size:"large",onKeyup:kn(d,["enter"])},null,8,["modelValue"]),H("canvas",{ref_key:"canvasRef",ref:h},null,512)],64)}}}),fs=L(hs,[["__scopeId","data-v-894f0b5c"]]),ps="/demo/assets/imgs/display-C0bS9oOy.png",ms={codes:[{name:"index.vue",code:ds,lang:"js"}],component:fs,display:ps,title:"简单文字图标生成",descriptions:""},gs=`<template>
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
`;class vs{constructor(e){C(this,"canvas");C(this,"ctx");C(this,"fontSize",200);C(this,"fontFamily","微软雅黑");C(this,"color","pink");C(this,"gap",3);C(this,"alphaThreshold",30);C(this,"w",0);C(this,"h",0);const{canvas:o,ctx:t,fontSize:n,fontFamily:a,color:l,gap:c,alphaThreshold:s}=e;this.canvas=o,this.ctx=t??o.getContext("2d"),n&&(this.fontSize=n),a&&(this.fontFamily=a),l&&(this.color=l),c!=null&&(this.gap=c),s!=null&&(this.alphaThreshold=s),this.w=o.width,this.h=o.height}setSize(e){this.w=e.width,this.h=e.height}_measureText(e){const{ctx:o,fontSize:t,fontFamily:n,color:a,w:l,h:c}=this;o.save(),Object.assign(o,{font:`${t}px ${n}`,fillStyle:a,textBaseline:"bottom"});const s=o.measureText(e);let{width:h}=s;const{actualBoundingBoxAscent:f,actualBoundingBoxDescent:i}=s,m=~~(Math.abs(f)+Math.abs(i));h=~~h,o.fillText(e,0,m);const d=o.getImageData(0,0,h,m).data;return o.clearRect(0,0,l,c),o.restore(),{data:d,width:h,height:m}}getParticles(e){const{data:o,width:t,height:n}=this._measureText(e),{gap:a,alphaThreshold:l,w:c,h:s}=this,h=[],f=[];for(let i=0;i<t;i+=a)for(let m=0;m<n;m+=a){const d=m*t+i,u=o[d*4+0],p=o[d*4+1],y=o[d*4+2],b=o[d*4+3];if(b<=l)continue;const{signal:g,resolve:w}=be();h.push(g);const v=we({x:i,y:m},In({x:t/2,y:n/2},{x:c/2,y:s/2}));f.push({tx:v.x,ty:v.y,color:qn(u,p,y,b),onDone:w})}return{particles:f,done:Promise.all(h)}}}const xs=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,t=k(),n=k("");let a,l=[],c=3,s="#f00",h=30,f=100,i=1,m=.1,d=.1,u=innerWidth,p=innerHeight;const y=Tn(()=>new Qn({r:i,x:S(0,u),y:S(0,p),fx:.1,fy:.1}));let b="hello world";function g(v,_){const B=a.getParticles(v);return l=y(B.particles.length).map(j=>(j.done=!1,_&&(j.x=S(0,u),j.y=S(0,p)),j)),l.forEach((j,E)=>Object.assign(j,B.particles[E])),B.done}function w(){n.value&&(b=n.value,g(b,!0))}return A(()=>{const v=t.value,_=v.getContext("2d",{willReadFrequently:!0});Object.assign(v,{width:u,height:p}),a=new vs({canvas:v,ctx:_,gap:c,alphaThreshold:h,color:s}),z({调整文字颜色:{value:[s],isColor:!0,onFinishChange(E){a.color=E,g(b,!0)}},采样alpha过滤阈值:{value:[h,0,100,1],onFinishChange(E){a.alphaThreshold=E,g(b,!0)}},采样间隔调整:{value:[c,1,20,1],onFinishChange(E){a.gap=E,g(b,!0)}},点大小调整:{value:[i,1,20,1],onFinishChange(E){i=E,y.update(x=>x.r=E),g(b,!0)}},x方向缓动因子调整:{value:[m,.01,1,.01],onFinishChange(E){m=E,y.update(x=>x.fx=E),g(b,!0)}},y方向缓动因子调整:{value:[d,.01,1,.01],onFinishChange(E){d=E,y.update(x=>x.fy=E),g(b,!0)}},字体大小调整:{value:[f,50,340,10],onFinishChange(E){f=E,a.fontSize=E,g(b,!0)}},查看源码(){o("check-source")}}),g(b);const B=U(()=>{_.clearRect(0,0,u,p),l.forEach(E=>{E.render(_),E.update()})}),j=W(window,"resize",()=>{u=innerWidth,p=innerHeight,v.width=u,v.height=p,a.setSize({width:u,height:p})});N(()=>{j(),B()})}),(v,_)=>{const B=Bn;return O(),F(K,null,[H("canvas",{ref_key:"canvasRef",ref:t},null,512),G(B,{class:"input",modelValue:X(n),"onUpdate:modelValue":_[0]||(_[0]=j=>xn(n)?n.value=j:null),placeholder:"请输入内容",size:"large",onKeyup:kn(w,["enter"])},null,8,["modelValue"])],64)}}}),ys=L(xs,[["__scopeId","data-v-8c68ef59"]]),bs=`import { getSignal, ptOffset, getMovePt, rgb } from '@thing772/utils'
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
`,ws="/demo/assets/imgs/display-DOJbIvru.png",_s={codes:[{name:"index.vue",code:gs,lang:"js"},{name:"textParticle.ts",code:bs,lang:"ts"},{name:"particle.ts",code:Zn,lang:"ts"}],component:ys,display:ws,title:"文字粒子化",descriptions:""},Cs=`<template>
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
`,Rs=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=100,n=20,a=10,l=7;z({小球个数:{value:[t,1,1e3,10],onFinishChange(f){t=f,h.setBallNum(f)}},小球半径上限:{value:[n,4,100,1],onFinishChange(f){n=f,h.updateBalls(i=>{i.r=S(4,f)})}},小球x方向移动速度上限:{value:[a,1,15,.5],onFinishChange(f){a=f,h.updateBalls(i=>{i.vx=S(1,f)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(f){l=f,h.updateBalls(i=>{i.vy=S(1,f)})}},开始(){c&&c(),c=h.start()},查看源码(){o("check-source")}});let c;const s=k();let h;return A(()=>{const f=s.value;let i=innerWidth,m=innerHeight;Object.assign(f,{width:i,height:m}),h=Fn({canvas:f,ballsNum:t,createBallFac:()=>new Q({x:S(10,i-10),y:S(10,m-10),r:S(1,n),vx:S(1,a),vy:S(1,l),styleOptions:{fillStyle:Y()}})});const d=W(window,"resize",()=>{i=innerWidth,m=innerHeight,h.setSize({width:i,height:m})},{immediate:!0});h.render(),N(()=>{d(),c&&c()})}),(f,i)=>(O(),F("canvas",{ref_key:"canvasRef",ref:s},null,512))}}),Ss="/demo/assets/imgs/display-BpUGJlnU.png",ks={codes:[{name:"index.vue",code:Cs,lang:"js"},{name:"wander-balls.ts",code:On,lang:"ts"},{name:"ball.ts",code:en,lang:"ts"}],component:Rs,display:Ss,title:"矩形区域内飘荡的小球",descriptions:""},Bs=`<template>
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
`,Es={class:"container"},Is=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,{obj:t}=z({模糊自身:{value:[!1],onChange(c){n.value=c}},模糊背景:{value:[!1],onChange(c){a.value=c}},查看源码(){o("check-source")}}),n=k(t.模糊自身),a=k(t.模糊背景),l=Sn(()=>["el2",{"blur-self":n.value,"blur-backdrop":a.value}]);return(c,s)=>(O(),F("div",Es,[s[0]||(s[0]=H("div",{class:"el1"}," 财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人， 较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻） ",-1)),H("div",{class:cn(X(l))}," 财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。 ",2)]))}}),js=L(Is,[["__scopeId","data-v-bce03b61"]]),Ts="/demo/assets/imgs/display-C7z4HTpE.png",Os={codes:[{name:"index.vue",code:Bs,lang:"js"}],component:js,display:Ts,title:"css模糊效果",descriptions:""},Fs=`<template>
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
`,Ps=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,{obj:t}=z({"添加box-shadow":{value:[!1],onChange(s){n.value=s}},添加圆角:{value:[!1],onChange(s){a.value=s}},"添加filter:drop-shadow":{value:[!1],onChange(s){l.value=s}},查看源码(){o("check-source")}}),n=k(t["添加box-shadow"]),a=k(t.添加圆角),l=k(t["添加filter:drop-shadow"]),c=Sn(()=>["container",{"has-shadow-box":n.value,"round-border":a.value,filter:l.value}]);return(s,h)=>(O(),F("div",{class:cn(X(c))},h[0]||(h[0]=[mn(" 测试文本 "),H("div",{class:"circle"}," 测试文本2 ",-1)]),2))}}),Ms=L(Ps,[["__scopeId","data-v-4ee4a0c8"]]),zs="/demo/assets/imgs/display-CvX0ByRG.png",$s={codes:[{name:"index.vue",code:Fs,lang:"js"}],component:Ms,display:zs,title:"css box阴影效果",descriptions:""},Ds=`<template>
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
`;function As(r){const{data:e=[],getX:o,getY:t,width:n=200,height:a=200,margin:l=[],color:c={},sortY:s=0,xAxis:h={},yAxis:f={},yLegend:i={},hideXTicks:m}=r,[d=60,u=0,p=30,y=30]=l;let b,g;const w=_e("svg").attr("width",n).attr("height",a).attr("viewBox",[0,0,n,a]).style("background-color",c.bg||""),v=w.append("g"),_=w.append("g").attr("transform",`translate(0,${a-p})`),B=w.append("g").attr("transform",`translate(${y},0)`),j=E=>{const x=T=>{if(b=Se().range([y,n-u]),fn(r.xScale))for(const[I,$]of Object.entries(r.xScale))b[I]($);else b.padding(.2);s>0?b.domain(ke(T,([I])=>(s==1?1:-1)*t(I),o)):b.domain(T.map(o)),g=Be().domain([0,Ee(T,t)]).range([a-p,d])},R=T=>{T.attr("x",0).attr("y",0).attr("width",b.bandwidth()).attr("height",I=>g(0)-g(t(I))).attr("fill",c.bar||"#409eff")},M=T=>{T.text(I=>I.value).attr("text-anchor","middle").attr("x",b.bandwidth()/2).attr("y",-4)};x(E),v.selectAll("g").data(E).join(T=>T.append("g").attr("transform",I=>`translate(${b(o(I))},${g(t(I))})`).call(I=>{R(I.append("rect")),M(I.append("text"))}),T=>(R(T.select("rect")),M(T.select("text")),T)).attr("transform",T=>`translate(${b(o(T))},${g(t(T))})`),_.call(T=>{const I=Ce(b);I.tickSizeOuter(0);for(const[$,D]of Object.entries(h))I[$](D);I(T)}).call(T=>{m&&T.selectAll(".tick").remove()}),B.call(T=>{const I=Re(g);for(const[$,D]of Object.entries(f))I[$](D);I(T)}).call(T=>T.select(".domain").remove()).call(T=>{if(i.text){const I=T.append("text").attr("text-anchor","middle").attr("x",0).attr("y",20);for(const[$,D]of Object.entries(i))$=="text"?I[$](D):I.attr($,D)}})};return j(e),{svg:w.node(),update:j}}function*Ns(r,e){dn(e)||(e=wn),e=e;for(let o=1;o<r.length;o++)for(let t=0;t<r.length-o;t++)e(r[t])>e(r[t+1])&&(ln(r,t,t+1),yield[...r])}function*Ws(r,e){dn(e)||(e=wn),e=e,r=[...r];for(let o=0;o<r.length-1;o++){let t=0;for(let n=0;n<r.length-o;n++)e(r[n])>e(r[t])&&(t=n);ln(r,t,r.length-o-1),yield[...r]}}function*Ls(r,e){dn(e)||(e=wn),r=[...r],e=e;for(let o=0;o<r.length-1;o++)if(e(r[o])>e(r[o+1])){ln(r,o,o+1),yield[...r];let t=o;for(;t>0&&!(e(r[t])>=e(r[t-1]));)ln(r,t,t-1),yield[...r],t--}}function*Gs(r,e){dn(e)||(e=wn);function*o(t,n){if(e=e,t==n)return;const a=Math.floor((t+n)/2);yield*o(t,a),yield*o(a+1,n);const l=c=>r=[...r.slice(0,t),...c,...r.slice(n+1)];if(!(e(r[a])<=e(r[a+1]))){if(e(r[n])<=e(r[t])){yield l([...r.slice(a+1,n+1),...r.slice(t,a+1)]);return}for(let c=1;a+c<=n;c++){let s=a+c;for(;s>t&&!(e(r[s])>=e(r[s-1]));)ln(r,s,s-1),s--,yield[...r]}}}yield*o(0,r.length-1)}const Hs={class:"box"},Vs=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,t=k(),n=[{label:"冒泡排序",value:Ns},{label:"选择排序",value:Ws},{label:"插入排序",value:Ls},{label:"归并排序",value:Gs}],a=n[0],l=k(a.value);let c;const s=innerWidth-100,h=innerHeight-100;let f=!1,i=20;const m=rn([]),d=rn();function u(){m.value=at(i).map((w,v)=>({id:v,value:w})),f=!1,d.value=l.value(m.value,w=>w.value)}q(l,()=>{d.value=l.value(m.value,w=>w.value)});function p(){const{value:w,done:v}=d.value.next();if(f=v,v){bn({showClose:!0,message:"已经排序完毕",type:"success",grouping:!0});return}else m.value=w}const y=k(0);function b(){y.value==0&&((!d.value||f)&&u(),y.value=setInterval(()=>{if(f){clearInterval(y.value),y.value=0;return}p()},g))}q(()=>m.value,w=>{w.length>0?(c||(c=As({width:s,height:h,getX:v=>v.id,getY:v=>v.value}),t.value.appendChild(c.svg)),c.update(w)):c&&(t.value.removeChild(c.svg),c=null)});let g=50;return A(()=>{u();const{helpers:{getAllControllers:w}}=z({选择算法:{value:[a.label,n.map(_=>_.label)],onChange(_){const B=n.find(j=>j.label==_);l.value=B.value}},随机数个数:{value:[i,10,100,1],onFinishChange(_){i=_}},自动开始时间间隔:{value:[g,16,100,5],onFinishChange(_){g=_}},生成随机数:{value:[function(){u()}],disable:y.value!=0},排序下一步:{value:[function(){p()}],disable:!d.value||y.value!=0},自动开始(){b()},查看源码(){o("check-source")}}),v=q(y,_=>{w().forEach(B=>{B.property!="查看源码"&&B.disable(_>0)})});N(()=>{v(),clearInterval(y.value)})}),(w,v)=>(O(),F("div",Hs,[H("div",{ref_key:"node",ref:t},null,512)]))}}),qs=L(Vs,[["__scopeId","data-v-9858c415"]]),Xs=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,Ys=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,Ks=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,Us=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,Qs="/demo/assets/imgs/display-B3luB7Uf.png",Zs={codes:[{name:"index.vue",code:Ds,lang:"js"},{name:"bubble.ts",code:Xs,lang:"ts"},{name:"selection.ts",code:Ys,lang:"ts"},{name:"insertion.ts",code:Ks,lang:"ts"},{name:"merge.ts",code:Us,lang:"ts"}],component:qs,display:Qs,title:"排序算法可视化",descriptions:""},Js=`<template>
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
`,na=`import { easeOutCubic } from './ease'
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
`;function ea(r){return 1-Math.pow(1-r,3)}var an=(r=>(r[r.NORMAL=0]="NORMAL",r[r.REVERSE=1]="REVERSE",r))(an||{});function ta(r,e){const{startIndex:o=0,speed:t=1,onDone:n,onProcessing:a}=e;let l=o,c,s;const h=u=>{fn(u)&&(s=Math.ceil(800/u))},f=()=>{c&&(cancelAnimationFrame(c),c=0)};h(t);function i(u){f();let p;const{direction:y,speed:b,startIndex:g}=u;h(b),fn(g)&&(l=g);const w=v=>{p||(p=v),v-p>=s&&(y==0?l=(l+1)%r.length:l=l-1>=0?l-1:r.length-1,a(l),p=v),c=requestAnimationFrame(w)};c||(c=requestAnimationFrame(w))}function m(){f()}function d(u){f();let{loopTimes:p=5,targetIndex:y=r.length-1}=u||{};const{direction:b,speed:g,startIndex:w}=u||{};p=Math.max(Math.ceil(Number(p)),1),y=Math.max(0,Math.min(Number(y),r.length-1)),h(g),fn(w)&&(l=w);const v=l;let _;const B=y-v;b==0?_=v+p*r.length+(B>=0?B:r.length+B):_=v-p*r.length+(B<=0?B:-r.length+B);const j=Math.abs(_-v)*s;let E;const x=R=>{E||(E=R);const M=Math.min(1,(R-E)/j);let I=(Math.ceil(ea(M)*(_-v))+v)%r.length;if(I<0&&(I+=r.length),l!=I&&(l=I,a(l)),M==1){n(l),c=0;return}c=requestAnimationFrame(x)};c=requestAnimationFrame(x)}return{wander:i,stop:m,draw:d}}const sa={class:"box"},aa={style:{display:"flex"}},ia=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e,t=k(1),n=[...Array(10)],a={targetIndex:2,loopTimes:2,direction:an.NORMAL,speed:5},{wander:l,stop:c,draw:s}=ta(n,{speed:a.speed,startIndex:t.value,onProcessing:d=>{t.value=d},onDone(d){bn({showClose:!0,message:"已经抽奖完毕",type:"success",grouping:!0}),t.value=d}});function h(){l({...a})}function f(){s({...a})}N(()=>{c(),i&&clearTimeout(i)});let i;function m(){h(),i=setTimeout(()=>{a.targetIndex=Yn(n),f(),i=0},2500)}return z({设定巡航速度:{value:[a.speed,1,10,1],onFinishChange(d){a.speed=d}},设定最终选中项索引:{value:[a.targetIndex,0,n.length-1,1],onFinishChange(d){a.targetIndex=d}},轮转次数:{value:[a.loopTimes,2,20,1],onFinishChange(d){a.loopTimes=d}},轮转方向:{value:[a.direction==an.NORMAL?"正向":"负向",["正向","负向"]],onChange(d){a.direction=d=="正向"?an.NORMAL:an.REVERSE}},开始抽奖:f,开始巡航:h,停止:c,模拟接口返回预制数据:m,查看源码(){o("check-source")}}),(d,u)=>{const p=Xn;return O(),F("div",sa,[G(p,{class:"demo-card",shadow:"always"},{default:V(()=>[H("div",aa,[(O(),F(K,null,on(n,(y,b)=>H("div",{class:cn(["block",X(t)==b?"selected":""]),key:b},pn(b),3)),64))])]),_:1})])}}}),oa=L(ia,[["__scopeId","data-v-3b4448e6"]]),ra="/demo/assets/imgs/display-DiF1Sfat.png",la={codes:[{name:"index.vue",code:Js,lang:"js"},{name:"draw-price.ts",code:na,lang:"ts"}],component:oa,display:ra,title:"抽奖",descriptions:""},ca=`<template>
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
`,ua="/demo/assets/imgs/018194d9aac11f975e17b274fe4a78af1463731957-BlWzWTpc.png",da="/demo/assets/imgs/10251358673700483-Bf69morh.jpg",ha="/demo/assets/imgs/10251358673922612-wa-5hia3.jpg",fa="/demo/assets/imgs/10251381214893821-DZ0tyfKl.jpg",pa="/demo/assets/imgs/10251381215028477-DT0oxPDL.jpg",ma="/demo/assets/imgs/10251381215091916-34MSuKPK.jpg",ga="/demo/assets/imgs/10251381215152314-ZOViud5b.jpg",va="/demo/assets/imgs/10251381215208971-BnTSlzDn.jpg",xa="/demo/assets/imgs/10251381215487222-CyoYfFWR.jpg",ya="/demo/assets/imgs/10251381215991717-jivRh7vw.jpg",ba="/demo/assets/imgs/10251381216212847-C6d5iI8I.jpg",wa="/demo/assets/imgs/3a5950fc2408a7f8136de8704e1819c21463732075-DT6cAkAt.png",_a="/demo/assets/imgs/48d780d33eaf46a5646376b814b8efa71463731556-CGACL27Z.png",Ca="/demo/assets/imgs/554e21161de34506e9cb1ecbcd85716d1463732343-LZH7KjnQ.png",Ra="/demo/assets/imgs/884f9b653e317cc514890954b2e35be81463731323-DvATjqjX.png",Sa="/demo/assets/imgs/8a116da0668edebd82af16ecf7e75ace1590566316-Cl-PTpZA.jpg",ka="/demo/assets/imgs/928d6ec50975da022bda97a1ab8f04c81463731839-d_LHiOEG.png",Ba="/demo/assets/imgs/a748932756b48bd46a8fd17df4579dea1463732104-DlsyWN-A.png",Ea="/demo/assets/imgs/b5978ead603dcdc66704e721960debe31590565987-4RsIwXgW.jpg",Ia="/demo/assets/imgs/c06f07de280d4edebf801eef4b142c721463731804-DD1ps6p3.png",ja="/demo/assets/imgs/ceb8c078cf6b410d7def183870fe584d1590566557-9BfKn2sf.jpg",Ta="/demo/assets/imgs/ea5871bc33e131b497b9bb273890e8ae1463731875-WWF6WmyZ.png",Oa="/demo/assets/imgs/f29af13446f1feed47dcfd299ccaa23c1463732001-DrhlCMaO.png",Fa="/demo/assets/imgs/fef4eadd191c3461054ca60cde8576db1590566398-Bn18syhQ.jpg",Pa={class:"container"},Ma=["src"],za=5,$a=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=e;let t=[...Object.values([ua,da,ha,fa,pa,ma,ga,va,xa,ya,ba,wa,_a,Ca,Ra,Sa,ka,Ba,Ea,Ia,ja,Ta,Oa,Fa])];t=k(it(t,Math.ceil(t.length/za))),z({查看源码(){o("check-source")}});function n(l){l.target.classList.add("level-up")}function a(l){l.target.classList.remove("level-up")}return(l,c)=>(O(),F("div",Pa,[(O(!0),F(K,null,on(X(t),(s,h)=>(O(),F("div",{class:cn(["hive-row",h%2==1?"odd":""]),onMouseenter:n,onMouseleave:a,key:h},[(O(!0),F(K,null,on(s,f=>(O(),F("img",{class:"hive-item",src:f,alt:"",key:f},null,8,Ma))),128))],34))),128))]))}}),Da=L($a,[["__scopeId","data-v-5a2d0a77"]]),Aa="/demo/assets/imgs/display-BVEemRNY.png",Na={codes:[{name:"index.vue",code:ca,lang:"js"}],component:Da,display:Aa,title:"蜂巢图片",descriptions:""},Wa=`<template>
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
`,La=`import { isFunc } from '@/utils/utils'

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
`,Ga=`import type { SceneInstance, SceneObj } from "./scene"
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
`;class Ha{constructor(e){C(this,"canvas");C(this,"ctx");C(this,"width",0);C(this,"height",0);C(this,"background");C(this,"_t0",0);C(this,"_t1",0);C(this,"_dt",0);C(this,"_objects",[]);C(this,"_raf",0);const{width:o,height:t,canvas:n,background:a}=e;this.canvas=n,this.ctx=n.getContext("2d"),this.background=a??"#000",this.setSize(o,t)}setSize(e,o){this.canvas.width=e,this.canvas.height=o,this.width=e,this.height=o}_render(){const{width:e,height:o,ctx:t,background:n}=this;t.fillStyle=n,t.fillRect(0,0,e,o);for(const a of[...this._objects])a.render(this._dt)}_updateTime(e){this._t0==0&&(this._t0=e),this._dt=e-this._t0}run(e){const o=t=>{this._updateTime(t),dn(e)&&e(this._dt),this._render(),this._raf=requestAnimationFrame(o)};this._raf=requestAnimationFrame(o)}addObj(...e){return e.forEach(o=>{this._objects.find(t=>t==o)||(this._objects.push(o),o.scene=this)}),this}removeObj(e){const o=this._objects.findIndex(t=>t==e);return o!=-1&&(this._objects.splice(o,1),e.scene==this&&(e.scene=null)),this}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._t0=0,this._t1=0,this._dt=0)}}const Va=[...Array(26)].map((r,e)=>["a","A"].map(o=>String.fromCharCode(o.charCodeAt(0)+e))).flat();function qa(){return[...Array(Z(8)+2)].map(()=>Kn(Va)).join("")}class Xa{constructor(e){C(this,"_x");C(this,"_y");C(this,"_text");C(this,"_opacity");C(this,"_onDismiss");C(this,"scene");C(this,"_opacityDecay");C(this,"_rawOptions");C(this,"_yStep");C(this,"_font","20px serif");C(this,"_fillStyle","red");const{x:o,y:t,text:n,opacity:a,opacityDecay:l,onDismiss:c,yStep:s}=e;this._x=o,this._y=t,this._text=n,this._opacity=a,this._onDismiss=c,this._opacityDecay=l??.01,this._rawOptions={...e},this._yStep=s??4}setFont(e,o){return this._font=e,this._fillStyle=o,this}render(e){const{_text:o,_x:t,_y:n,_opacityDecay:a,_yStep:l,_fillStyle:c,_font:s}=this,{ctx:h,height:f}=this.scene,i={font:h.font,fillStyle:h.fillStyle,globalAlpha:h.globalAlpha};this._opacity-=typeof a=="number"?a:a(e),this._opacity<0&&(this._opacity=0),h.font=s,h.fillStyle=c,h.globalAlpha=this._opacity;let m=0;const d=n+(typeof l=="number"?l:l(e));for(const u of o){const p=h.measureText(u),{actualBoundingBoxAscent:y,actualBoundingBoxDescent:b}=p,g=b+y;h.fillText(u,t,d-m),m+=g+10}this._y=d,Object.assign(h,i),(this._opacity==0||d-m>f)&&this._onDismiss(this)}}class Ya{constructor(e){C(this,"scene");C(this,"num",0);C(this,"maxNum",100);C(this,"colors",["brown","red","green","yellow","chocolate","pink","burlywood","chartreuse","cyan"]);const{scene:o,maxNum:t}=e;this.scene=o,t&&(this.maxNum=t)}addText(){if(this.num<this.maxNum){this.num++;const{width:e,height:o}=this.scene,t=new Xa({text:qa(),x:Z(e),y:Z(o),yStep:Z(10)+2,opacity:+Math.min(1,Math.random()+.2).toPrecision(2),opacityDecay:.01,onDismiss:n=>{this.scene.removeObj(n),this.num--}}).setFont(`${Z(15)+14}px serif`,Kn(this.colors));this.scene.addObj(t)}}start(){this.scene.run(()=>{this.addText()})}stop(){this.scene.stop()}}function Ka(r,e,o){r.addEventListener("resize",e),N(()=>{r.removeEventListener("resize",e)})}const Ua={class:"box"},Qa=P({__name:"index",emits:["check-source"],setup(r,{emit:e}){const o=k(),t=e;return A(()=>{const n=new Ha({width:innerWidth,height:innerHeight,canvas:o.value}),{obj:a}=z({文字串数量:{value:[10,10,200,10],onChange(c){l.maxNum=c}},查看代码:function(){t("check-source")}}),l=new Ya({scene:n,maxNum:a.文字串数量});l.start(),Ka(window,()=>{n.setSize(innerWidth,innerHeight)}),N(()=>{l.stop()})}),(n,a)=>(O(),F("div",Ua,[H("canvas",{ref_key:"canvas",ref:o},null,512)]))}}),Za=L(Qa,[["__scopeId","data-v-2318ea81"]]),Ja="/demo/assets/imgs/display-DwV-CRAI.png",ni={codes:[{name:"index.vue",code:Wa,lang:"js"},{name:"scene.ts",code:La,lang:"ts"},{name:"textRain.ts",code:Ga,lang:"ts"}],component:Za,display:Ja,title:"文字雨",descriptions:""};let hn;function Jn(){return hn||(hn=Object.assign({"./demo/canvas/audio-wave/config.ts":tt,"./demo/canvas/bfs/config.ts":ht,"./demo/canvas/chasing/config.ts":gt,"./demo/canvas/connect-balls/config.ts":bt,"./demo/canvas/coord/config.ts":St,"./demo/canvas/dfs/config.ts":Tt,"./demo/canvas/effect-1/config.ts":zt,"./demo/canvas/eyeballs/config.ts":Nt,"./demo/canvas/faliling-balls/config.ts":qt,"./demo/canvas/friction/config.ts":Ut,"./demo/canvas/helix/config.ts":es,"./demo/canvas/line/config.ts":os,"./demo/canvas/noise/config.ts":us,"./demo/canvas/simple-icon/config.ts":ms,"./demo/canvas/text-particle/config.ts":_s,"./demo/canvas/wander-balls/config.ts":ks,"./demo/css/blur/config.ts":Os,"./demo/css/shadow/config.ts":$s,"./demo/d3/sort/config.ts":Zs,"./demo/draw-price/config.ts":la,"./demo/hive/config.ts":Na,"./demo/text-rain/config.ts":ni}),hn)}const ne=[];function ei(){const r=Jn();for(const e in r){const{codes:o,component:t,title:n}=r[e],a=function(){return Dn(Xe,{codes:o},({checkSource:s})=>Dn(t,{onCheckSource:()=>{s()}}))};a.displayName=`Demo(${e})`;const l=e.replace(/.*\/demo\//,"").replace("/config.ts","").split("/").join("-");r[e].routeName=l,ne.push({path:l,name:l,component:a,meta:{title:n}})}}ei();const ti={path:"/demo",children:ne},si={class:"common-layout"},ai=P({__name:"index",setup(r){const e=Object.values(Jn());return(o,t)=>{const n=Oe,a=Fe,l=Xn,c=Te,s=je,h=Ie,f=Pe;return O(),F("div",si,[G(f,{class:"container"},{default:V(()=>[G(h,{class:"main"},{default:V(()=>[G(s,{class:"row",gutter:20},{default:V(()=>[(O(!0),F(K,null,on(X(e),i=>(O(),Rn(c,{key:i.routeName,span:4},{default:V(()=>[G(l,{class:"demo-card","body-style":{padding:"0px"},shadow:"always",onClick:m=>o.$router.push({name:i.routeName})},{footer:V(()=>[G(a,{tag:"p"},{default:V(()=>[mn(pn(i.title),1)]),_:2},1024),G(a,{tag:"p","line-clamp":2},{default:V(()=>[mn(pn(i.descriptions||"暂无描述"),1)]),_:2},1024)]),default:V(()=>[G(n,{class:"image",src:i.display,fit:"cover"},null,8,["src"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}}}),ii=L(ai,[["__scopeId","data-v-9c137ebc"]]),ee=Me({history:ze("/demo/"),routes:[{path:"/",component:ii},ti]});ee.beforeEach((r,e,o)=>{document.title=r.meta.title??"my demos",o()});const Pn=$e(We);Pn.use(De());Pn.use(ee);Pn.mount("#app");
