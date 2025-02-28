var Gn=Object.defineProperty;var Hn=(l,n,s)=>n in l?Gn(l,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):l[n]=s;var w=(l,n,s)=>Hn(l,typeof n!="symbol"?n+"":n,s);import{r as Vn,c as xn,o as E,d as $,a as B,b as yn,e as P,P as qn,f as M,g as H,t as dn,n as rn,u as X,h as L,i as Kn,w as W,E as Xn,F as Y,j as an,k as Un,l as Yn,m as hn,p as bn,q as Qn,s as Q,v as Zn,x as Jn,y as A,z as V,A as ne,B as fn,C as G,D as sn,G as Fn,H as Mn,I as On,J as K,K as J,L as Rn,M as ee,N as j,O as Tn,Q as te,R as Bn,S as zn,T as $n,U as gn,V as ae,W as ie,X as se,Y as mn,Z as kn,_ as le,$ as re,a0 as oe,a1 as ce,a2 as ue,a3 as de,a4 as he,a5 as fe,a6 as me,a7 as pe,a8 as ge,a9 as ve,aa as xe,ab as Nn,ac as In,ad as ye,ae as be,af as _e,ag as we,ah as Se,ai as Ce,aj as Re,ak as Be,al as ke,am as Ie}from"./vendor-BNoPmV9c.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&t(u)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const q=(l,n)=>{const s=l.__vccOpts||l;for(const[t,e]of n)s[t]=e;return s},je={};function Ee(l,n){const s=Vn("RouterView");return E(),xn(s)}const Fe=q(je,[["render",Ee]]),Me={class:"pre"},Oe=$({__name:"hilight",props:{code:{},lang:{}},setup(l){const n=l,s=B(),t=yn(()=>n.lang?`lang-${n.lang}`:"auto");return P(()=>{qn.highlightElement(s.value)}),(e,i)=>(E(),M("pre",Me,[H("code",{class:rn(X(t)),ref_key:"codeRef",ref:s},dn(e.code),3)]))}}),Te={class:"container"},ze={class:"dialog-footer"},$e=$({__name:"codeDemo",props:{codes:{}},setup(l){const n=B(!1);function s(){n.value=!0}return(t,e)=>{const i=Un,u=Xn,o=Yn,a=Qn;return E(),M(Y,null,[H("div",Te,[Kn(t.$slots,"default",{checkSource:s},void 0,!0)]),L(a,{modelValue:X(n),"onUpdate:modelValue":e[1]||(e[1]=h=>bn(n)?n.value=h:null),title:"",width:"50vw",top:"50px"},{footer:W(()=>[H("span",ze,[L(o,{type:"primary",onClick:e[0]||(e[0]=h=>n.value=!1)},{default:W(()=>e[2]||(e[2]=[hn("关闭")])),_:1})])]),default:W(()=>[L(u,{type:"border-card"},{default:W(()=>[(E(!0),M(Y,null,an(t.codes,h=>(E(),xn(i,{label:h.name,key:h.name,lazy:""},{default:W(()=>[L(Oe,{code:h.code,lang:h.lang},null,8,["code","lang"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"])],64)}}}),Ne=q($e,[["__scopeId","data-v-65455990"]]),De=`<template>
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
`,Pe=`import { rafLoop } from '@thing772/utils'

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
`;function Ae(l,n){const s=new AudioContext;let t=s.createMediaElementSource(l);const e=s.createAnalyser();t.connect(e),e.connect(s.destination),e.fftSize=512;const i=e.frequencyBinCount,u=new Uint8Array(i),o=n.getContext("2d");let a=n.width,h=n.height;function g(){e.getByteTimeDomainData(u),o.save(),Object.assign(o,{fillStyle:"red"});const d=a/i;for(let c=0;c<i;c+=4){let f=u[c]/255*h;o.fillRect(d*c,h-f,d,f)}o.fill(),o.restore()}function r(d,c){a=n.width=d,h=n.height=c}function m(){return Q(()=>{o.clearRect(0,0,a,h),g()})}return{setSize:r,start:m}}const We="/demo/assets/media/%E5%8C%96%E5%87%A1-DF7X08YA.ogg";function D(l){if(!l.title){let s=Zn().meta.title;s&&(l.title=s)}let n=Jn(l);return A(()=>{n.gui.destroy()}),n}const Le=["src"],Ge=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;D({查看源码(){s("check-source")}});const t=B(),e=B();return P(()=>{let i;e.value.onplay=()=>{const{start:u,setSize:o}=Ae(e.value,t.value);i=V(window,"resize",()=>{o(innerWidth,innerHeight)},{immediate:!0}),u()},A(()=>{i&&i()})}),(i,u)=>(E(),M(Y,null,[H("audio",{ref_key:"audioRef",ref:e,src:X(We),id:"audio",controls:""},null,8,Le),H("canvas",{ref_key:"canvasRef",ref:t},null,512)],64))}}),He=q(Ge,[["__scopeId","data-v-24237bd0"]]),Ve="/demo/assets/imgs/display-_9yby0tz.png",qe={codes:[{name:"index.vue",code:De,lang:"js"},{name:"audio-wave",code:Pe,lang:"ts"}],component:He,display:Ve,title:"音频波形",descriptions:""},Ke=`<template>
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

let timer = ref(0)

watch(timer, (newV, oldV) => {
  if (newV == 0 && oldV > 0) {
    clearInterval(oldV)
  }
}, { flush: 'sync' })

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

  onBeforeUnmount(() => {
    timer.value = 0
  })
})
<\/script>
`;function Dn(l){return Math.floor(Math.random()*l.length)}function Pn(l){return l[Dn(l)]}function Xe(l,n=1e3){let s=[];for(let t=0;t<l;t++)s.push(Z(n));return s}function Z(l=1e3){return Math.ceil(Math.random()*l)}function Ue(l,n){return l.reduce((s,t,e)=>(e%n==0&&s.push(l.slice(e,e+n)),s),[])}function ln(l,n,s){let t=l[n];l[n]=l[s],l[s]=t}function un(l){return l!=null}function on(l){return typeof l=="function"}function vn(l){return l}function _n(l){let n=[];function s(t){let e=t-n.length;return e>0?n.push(...ne(l,e)):e<0&&(n=n.slice(0,e)),n}return s.update=function(t){n.forEach(e=>t(e))},s}function pn(l,n){return~~(l/n)*n}function*jn(l,n,s,t){let e=[{...l}],i=[],u={...n},o={},a;const h=(r,m)=>{if(!(r>s||m>t||r<0||m<0))return{x:r,y:m}},g=r=>`${r.x}-${r.y}`;for(;e.length>0;){if(a&&(o[g(a)]=!0,i.push({...a})),a=e.shift(),delete o[g(a)],a.x==u.x&&a.y==u.y)return{current:a,visited:[...i],pending:[...e]};let r=h(a.x,a.y-1),m=h(a.x+1,a.y),d=h(a.x,a.y+1),c=h(a.x-1,a.y),f=[r,m,d,c].filter(Boolean);f=f.filter(x=>!o[g(x)]),f.length!=0&&(f.forEach(x=>{x.parent=a,o[g(x)]=!0}),e.push(...f),yield{current:a,visited:[...i],pending:[...e]})}}function Ye(l,n,s,t){let e=[{...l}],i=[],u={...n},o={},a;const h=(r,m)=>{if(!(r>s||m>t||r<0||m<0))return{x:r,y:m}},g=r=>`${r.x}-${r.y}`;for(;e.length>0;){if(a&&(o[g(a)]=!0,i.push({...a})),a=e.shift(),delete o[g(a)],a.x==u.x&&a.y==u.y)return{current:a,visited:[...i],pending:[...e]};let r=h(a.x,a.y-1),m=h(a.x+1,a.y),d=h(a.x,a.y+1),c=h(a.x-1,a.y),f=[r,m,d,c].filter(Boolean);f=f.filter(x=>!o[g(x)]),f.length!=0&&(f.forEach(x=>{x.parent=a,o[g(x)]=!0}),e.push(...f))}}const Qe=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t,e,i,u,o,a,h;const g=B("#c5afbb"),r=B(30),m=B(),d=fn({x:20,y:10}),c=fn({x:0,y:0}),f=p=>{let S=m.value;i=pn(innerWidth,r.value),u=pn(innerHeight,r.value),S.width=i,S.height=u,t=i/r.value-1,e=u/r.value-1,p==null||p();let T=h.helpers.getControllerByKey,k={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:e,setValue:d.y},设置终点X:{max:t,setValue:c.x},设置终点Y:{max:e,setValue:c.y}};for(let R in k){let z=T(R),N=k[R];for(let en in N)z[en](N[en])}};G([m,g],([p,S])=>{Mn(p,{"background-color":S})}),G(r,()=>{y.value=0,f(),_()});const x=(p,S,T)=>{a.save(),Object.assign(a,T),a.fillRect(p*r.value,S*r.value,r.value,r.value),a.restore()},b=(p,S)=>{x(p,S,{fillStyle:"red"})},v=(p,S)=>{x(p,S,{fillStyle:"green"})},_=p=>{let S=m.value;a.clearRect(0,0,i,u),On({width:i,height:u,gridSize:r.value,canvas:S,ctx:a,lineWidth:1,gridLineColor:"#fff"}),typeof p=="function"&&p(),b(d.x,d.y),v(c.x,c.y)};G([d,c],()=>{_(),y.value=0,o=jn(d,c,t,e)});let y=B(0);G(y,(p,S)=>{p==0&&S>0&&clearInterval(S)},{flush:"sync"});const C=sn();function F(p){let{current:S,pending:T,visited:k}=p;_(()=>{x(S.x,S.y,{fillStyle:"gold"}),T.forEach(R=>{const{x:z,y:N}=R;x(z,N,{fillStyle:"pink"})}),k.forEach(R=>{const{x:z,y:N}=R;x(z,N,{fillStyle:"black"})})})}function O(p){for(;p;)x(p.x,p.y,{fillStyle:"blue"}),p=p.parent;b(d.x,d.y),v(c.x,c.y)}G(C,p=>{let{value:S,done:T}=p;T&&!S||(F(S),T&&O(S.current))});const I=()=>{h=D({设置背景色:{value:[g.value],isColor:!0,onFinishChange(p){g.value=p}},网格大小设置:{value:[r.value,5,50,1],onFinishChange(p){r.value=p}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(p){d.x=p}},设置起始点Y:{value:[d.y,0,e,1],onFinishChange(p){d.y=p}},设置终点X:{value:[c.x,0,t,1],onFinishChange(p){c.x=p}},设置终点Y:{value:[c.y,0,e,1],onFinishChange(p){c.y=p}},自动bfs迭代(){o&&(y.value=0,y.value=setInterval(()=>{const p=o.next();C.value=p,p.done&&(y.value=0)},100))},bfs巡路(){console.time("bfs寻路耗时"),y.value=0;let p=Ye(d,c,t,e);if(!p)throw Error("没有找到终点");console.timeEnd("bfs寻路耗时"),_(()=>{O(p.current)})},查看源码(){s("check-source")}})};return P(()=>{a=m.value.getContext("2d"),I(),f(()=>{Object.assign(c,{x:~~(t/2),y:~~(e/2)})}),o=jn(d,c,t,e),Fn(()=>{y.value=0})}),(p,S)=>(E(),M("canvas",{ref_key:"canvasRef",ref:m},null,512))}}),Ze="/demo/assets/imgs/display-BFxeQr0P.png",Je=`export type Index = { x: number; y: number }
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
`,nt={codes:[{name:"index.vue",code:Ke,lang:"js"},{name:"bfs.ts",code:Je,lang:"ts"}],component:Qe,display:Ze,title:"canvas网格——广度优先搜索",descriptions:""},et=`<template>
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
`;class U{constructor(n){w(this,"x",0);w(this,"y",0);w(this,"r",0);w(this,"vx",0);w(this,"vy",0);w(this,"ax",0);w(this,"ay",0);w(this,"styleOptions",{});n&&this.set(n)}reset(n){return Object.assign(this,{x:0,y:0,r:0,vx:0,vy:0,ax:0,ay:0,...n?{styleOptions:{}}:null})}set(n){return Object.assign(this,n)}update(){return this.vy+=this.ay,this.y+=this.vy,this.vx+=this.ax,this.x+=this.vx,this}render(n){n.save();let{x:s,y:t,r:e,styleOptions:i}=this;Object.assign(n,i),n.beginPath(),n.arc(s,t,e,0,Math.PI*2),i.fillStyle&&n.fill(),i.strokeStyle&&n.stroke(),n.restore()}}const tt=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;D({查看源码(){s("check-source")}});const t=B();return P(()=>{let e=t.value,i,u,o,a=e.getContext("2d");const h=V(window,"resize",()=>{Object.assign(e,{width:i=innerWidth,height:u=innerHeight})},{immediate:!0}),g=V(e,"mousemove",function(m){o={x:m.offsetX,y:m.offsetY}});let r=new U({r:100,x:i/2,y:u/2,styleOptions:{fillStyle:K()}});Q(()=>{a.clearRect(0,0,i,u),o&&(r.x=J(r.x,o.x,.05),r.y=J(r.y,o.y,.05)),r.render(a)}),A(()=>{h(),g()})}),(e,i)=>(E(),M("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),at="/demo/assets/imgs/display-IdleEMXt.png",it={codes:[{name:"index.vue",code:et,lang:"js"},{name:"ball.ts",code:nn,lang:"ts"}],component:tt,display:at,title:"缓动追逐",descriptions:""},st=`<template>
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
`,wn=`import { rafLoop, updateBallVelocityInRect, isFunc } from '@thing772/utils'
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
`;function Sn(l){let{canvas:n,ballsNum:s,createBallFac:t,onBallUpdate:e,speedDecay:i,preRender:u,postRender:o}=l,a=n.width,h=n.height;const g=n.getContext("2d");let r=[];const m=_n(t);function d(y){r=m(y),f()}function c(y){Object.assign(n,y),a=y.width,h=y.height,f()}function f(y){r.forEach(C=>{Rn(y)&&y(C),C.render(g)})}function x(){g.clearRect(0,0,a,h);for(let y of r)Rn(e)?e(y):(y.update(),ee(y,{wBox:[0,a],hBox:[0,h],speedDecay:i}));u==null||u(r,g),r.forEach(y=>y.render(g)),o==null||o(r,g)}function b(y){g.clearRect(0,0,a,h),f(y)}d(s);let v;function _(){return v&&v(),v=Q(()=>{x()})}return{start:_,setBallNum:d,setSize:c,render:x,updateBalls:b}}const lt=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=80,e=1,i=3,u=3,o=100,a;D({小球个数:{value:[t,1,1e3,10],onFinishChange(d){t=d,r.setBallNum(d)}},小球半径上限:{value:[e,1,100,1],onFinishChange(d){e=d,r.updateBalls(c=>{c.r=j(1,d)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(d){i=d,r.updateBalls(c=>{c.vx=j(1,d)})}},小球y方向移动速度上限:{value:[u,1,15,.5],onFinishChange(d){u=d,r.updateBalls(c=>{c.vy=j(1,d)})}},小球连接范围阈值:{value:[o,50,300,1],onFinishChange(d){o=d}},查看源码(){s("check-source")}});let h;const g=B();let r,m;return P(()=>{let d=g.value,c=innerWidth,f=innerHeight;Object.assign(d,{width:c,height:f}),r=Sn({canvas:d,ballsNum:t,createBallFac:()=>new U({x:j(10,c-10),y:j(10,f-10),r:j(1,e),vx:j(1,i),vy:j(1,u),styleOptions:{fillStyle:K()}}),preRender(v,_){a||(a=Tn(_,{strokeStyle:K(),lineWidth:1})),m&&(v=v.concat(m));for(let y=0;y<v.length;y++)for(let C=y+1;C<v.length;C++){let F=v[y],O=v[C];te(F,O)<o&&a(F,O)}m&&v.pop()}});const x=V(window,"resize",()=>{c=innerWidth,f=innerHeight,r.setSize({width:c,height:f})},{immediate:!0}),b=V(d,"mousemove",v=>{m={x:v.offsetX,y:v.offsetY}},{needLog:!0});h=r.start(),A(()=>{x(),b(),h&&h()})}),(d,c)=>(E(),M("canvas",{ref_key:"canvasRef",ref:g},null,512))}}),rt="/demo/assets/imgs/display-y86Fu395.png",ot={codes:[{name:"index.vue",code:st,lang:"js"},{name:"wander-balls.ts",code:wn,lang:"ts"},{name:"ball.ts",code:nn,lang:"ts"}],component:lt,display:rt,title:"粒子小球连线",descriptions:""},ct=`<template>
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
`,ut=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=B();let e=innerWidth,i=innerHeight,u,o=(c,f)=>Math.sin(5*c+.001*f)+Math.cos(10*c+.005*f),a=B(""),h=o,g=300,r=1,m=K();function d(){h=new Function("x","t",`return ${a.value}`);try{h(0,0)}catch(c){gn({showClose:!0,message:c.message,type:"error",grouping:!0})}}return P(()=>{let c=t.value;const f=c.getContext("2d");D({采样率设置:{value:[g,10,1e3,10],onFinishChange(v){g=v}},曲线粗细设置:{value:[r,1,10,1],onFinishChange(v){r=v}},曲线颜色设置:{value:[m],isColor:!0,onFinishChange(v){m=v}},查看源码(){s("check-source")}}),u=Bn({canvas:c,ctx:f,width:e,height:i});const x=Q(v=>{f.clearRect(0,0,e,i),u.setup(),u.draw(_=>{let y=0;try{y=h(_,v)}catch{}return y},{rate:g,style:{strokeStyle:m,lineWidth:r},label:{name:h.toString().replace(/ anonymous/,""),pos:{x:100,y:100}}})}),b=V(window,"resize",()=>{e=innerWidth,i=innerHeight,u=Bn({canvas:c,ctx:f,width:e,height:i})});A(()=>{b(),x()})}),(c,f)=>{const x=$n;return E(),M(Y,null,[H("canvas",{ref_key:"canvasRef",ref:t},null,512),L(x,{class:"input",modelValue:X(a),"onUpdate:modelValue":f[0]||(f[0]=b=>bn(a)?a.value=b:a=b),placeholder:"参数:（x:x坐标，t：时间参数），输入x和t的表达式",size:"large",onKeyup:zn(d,["enter"])},null,8,["modelValue"])],64)}}}),dt=q(ut,[["__scopeId","data-v-6125c1c8"]]),ht="/demo/assets/imgs/display-BsbAITaj.png",ft={codes:[{name:"index.vue",code:ct,lang:"js"}],component:dt,display:ht,title:"笛卡尔坐标系函数绘制",descriptions:""},mt=`<template>
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

let timer = ref(0)

watch(timer, (newV, oldV) => {
  if (newV == 0 && oldV > 0) {
    clearInterval(oldV)
  }
}, { flush: 'sync' })

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

  onBeforeUnmount(() => {
    timer.value = 0
  })
})
<\/script>
`;function*En(l,n,s,t){let e=[{...l}],i=[],u={...n},o={},a;const h=c=>{o[d(c)]=!0,i.push({...c})},g=()=>{let c=e.shift();return delete o[d(c)],c},r=c=>{c.forEach(f=>{o[d(f)]=!0}),e.unshift(...c)},m=(c,f)=>{if(!(c>s||f>t||c<0||f<0))return{x:c,y:f}},d=c=>`${c.x}-${c.y}`;for(;e.length>0;){if(a&&h(a),a=g(),a.x==u.x&&a.y==u.y)return{current:a,visited:[...i],pending:[...e]};let c=m(a.x,a.y-1),f=m(a.x+1,a.y),x=m(a.x,a.y+1),b=m(a.x-1,a.y),v=[c,f,x,b].filter(Boolean);v=v.filter(_=>!o[d(_)]),v.forEach(_=>{_.parent=a}),v.length!=0&&(r(v),yield{current:a,visited:[...i],pending:[...e]})}}function pt(l,n,s,t){let e=[{...l}],i=[],u={...n},o={},a;const h=c=>{o[d(c)]=!0,i.push({...c})},g=()=>{let c=e.shift();return delete o[d(c)],c},r=c=>{c.forEach(f=>{o[d(f)]=!0}),e.unshift(...c)},m=(c,f)=>{if(!(c>s||f>t||c<0||f<0))return{x:c,y:f}},d=c=>`${c.x}-${c.y}`;for(;e.length>0;){if(a&&h(a),a=g(),a.x==u.x&&a.y==u.y)return{current:a,visited:[...i],pending:[...e]};let c=m(a.x,a.y-1),f=m(a.x+1,a.y),x=m(a.x,a.y+1),b=m(a.x-1,a.y),v=[c,f,x,b].filter(Boolean);v=v.filter(_=>!o[d(_)]),v.forEach(_=>{_.parent=a}),v.length!=0&&r(v)}}const gt=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t,e,i,u,o,a,h;const g=B("#c5afbb"),r=B(30),m=B(),d=fn({x:20,y:10}),c=fn({x:0,y:0}),f=p=>{let S=m.value;i=pn(innerWidth,r.value),u=pn(innerHeight,r.value),S.width=i,S.height=u,t=i/r.value-1,e=u/r.value-1,p==null||p();let T=h.helpers.getControllerByKey,k={设置起始点X:{max:t,setValue:d.x},设置起始点Y:{max:e,setValue:d.y},设置终点X:{max:t,setValue:c.x},设置终点Y:{max:e,setValue:c.y}};for(let R in k){let z=T(R),N=k[R];for(let en in N)z[en](N[en])}};G([m,g],([p,S])=>{Mn(p,{"background-color":S})}),G(r,()=>{y.value=0,f(),_()});const x=(p,S,T)=>{a.save(),Object.assign(a,T),a.fillRect(p*r.value,S*r.value,r.value,r.value),a.restore()},b=(p,S)=>{x(p,S,{fillStyle:"red"})},v=(p,S)=>{x(p,S,{fillStyle:"green"})},_=p=>{let S=m.value;a.clearRect(0,0,i,u),On({width:i,height:u,gridSize:r.value,canvas:S,ctx:a,lineWidth:1,gridLineColor:"#fff"}),typeof p=="function"&&p(),b(d.x,d.y),v(c.x,c.y)};G([d,c],()=>{_(),y.value=0,o=En(d,c,t,e)});let y=B(0);G(y,(p,S)=>{p==0&&S>0&&clearInterval(S)},{flush:"sync"});const C=sn();function F(p){let{current:S,pending:T,visited:k}=p;_(()=>{x(S.x,S.y,{fillStyle:"gold"}),T.forEach(R=>{const{x:z,y:N}=R;x(z,N,{fillStyle:"pink"})}),k.forEach(R=>{const{x:z,y:N}=R;x(z,N,{fillStyle:"black"})})})}function O(p){for(;p;)x(p.x,p.y,{fillStyle:"blue"}),p=p.parent;b(d.x,d.y),v(c.x,c.y)}G(C,p=>{let{value:S,done:T}=p;T&&!S||(F(S),T&&O(S.current))});const I=()=>{h=D({设置背景色:{value:[g.value],isColor:!0,onFinishChange(p){g.value=p}},网格大小设置:{value:[r.value,5,50,1],onFinishChange(p){r.value=p}},设置起始点X:{value:[d.x,0,t,1],onFinishChange(p){d.x=p}},设置起始点Y:{value:[d.y,0,e,1],onFinishChange(p){d.y=p}},设置终点X:{value:[c.x,0,t,1],onFinishChange(p){c.x=p}},设置终点Y:{value:[c.y,0,e,1],onFinishChange(p){c.y=p}},自动dfs迭代(){o&&(y.value=0,y.value=setInterval(()=>{const p=o.next();C.value=p,p.done&&(y.value=0)},100))},dfs巡路(){console.time("dfs寻路耗时"),y.value=0;let p=pt(d,c,t,e);if(!p)throw Error("没有找到终点");console.timeEnd("dfs寻路耗时"),_(()=>{O(p.current)})},查看源码(){s("check-source")}})};return P(()=>{a=m.value.getContext("2d"),I(),f(()=>{Object.assign(c,{x:~~(t/2),y:~~(e/2)})}),o=En(d,c,t,e),Fn(()=>{y.value=0})}),(p,S)=>(E(),M("canvas",{ref_key:"canvasRef",ref:m},null,512))}}),vt="/demo/assets/imgs/display-BRS54xHs.png",xt=`export type Index = { x: number; y: number }
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
`,yt={codes:[{name:"index.vue",code:mt,lang:"js"},{name:"dfs.ts",code:xt,lang:"ts"}],component:gt,display:vt,title:"canvas网格——深度优先搜索",descriptions:""},bt=`<template>
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
`,_t=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;D({查看源码(){s("check-source")}});const t=B();return P(()=>{let e=t.value,i,u,o,a=e.getContext("2d");const h=V(window,"resize",()=>{Object.assign(e,{width:i=innerWidth,height:u=innerHeight})},{immediate:!0}),g=V(e,"mousemove",function(x){o={x:x.offsetX,y:x.offsetY}});let r=[new U({r:50,x:i/2-80,y:u/2,styleOptions:{fillStyle:K()}}),new U({r:50,x:i/2+80,y:u/2,styleOptions:{fillStyle:K()}})],m=r.map(x=>new U({r:x.r/4,x:x.x,y:x.y,styleOptions:{fillStyle:K()}})),d=new U({r:200,x:i/2,y:u/2,styleOptions:{fillStyle:"#E6A23C"}}),c=Tn(a,{strokeStyle:"#fff",lineWidth:"10",lineCap:"round"}),f=.05;Q(()=>{a.clearRect(0,0,i,u),d.render(a),r.forEach(x=>{x.render(a)}),m.forEach((x,b)=>{if(o){let v=x.x=J(x.x,o.x,f),_=x.y=J(x.y,o.y,f),y=r[b],C={x:y.x,y:y.y,r:y.r-10};if(!ae(C,x)){x.x=v,x.y=_;let F=ie(C,o);Object.assign(x,se(C,F,C.r-x.r))}}x.render(a)}),c({x:i/2-50,y:u/2+100},{x:i/2+50,y:u/2+100})}),A(()=>{h(),g()})}),(e,i)=>(E(),M("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),wt="/demo/assets/imgs/display-BcjSOcDf.png",St={codes:[{name:"index.vue",code:bt,lang:"js"},{name:"ball.ts",code:nn,lang:"ts"}],component:_t,display:wt,title:"会动的眼球",descriptions:""},Ct=`<template>
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
`;function Bt(l){let{canvas:n,num:s,onAllStopped:t}=l;const e=n.getContext("2d");let i=n.width,u=n.height,o=[],a=!1,h=!1;const g=_n(()=>new U(r()));function r(){return{x:j(10,i-10),y:j(10,u-10),r:4,ax:0,ay:j(.1,2,!1),vx:0,vy:j(1,3),styleOptions:{fillStyle:K()},stopped:!1}}function m(v){o=g(v)}function d(){for(let v of o)v.reset().set(r());if(h=!1,!a)return b()}function c(v){Object.assign(n,v),i=v.width,u=v.height}function f(v){return v.stopped||mn(v.vy,0,1)&&mn(v.y+v.r,u,1)}function x(){if(o.length!=0){e.clearRect(0,0,i,u);for(let v of o)if(v.update(),v.y+v.r>u&&(v.y=u-v.r,v.vy*=-.7),v.render(e),f(v)&&(v.stopped=!0,o.every(f))){a=!1,h=!0;try{t==null||t()}catch(_){console.error(_)}return!1}}}m(s);function b(){if(a)return;a=!0,h&&d();let v=Q(x);return()=>{a&&(a=!1,v())}}return{start:b,reset:d,setBallsNum:m,setSize:c,render:x}}const kt=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=100;const e=B(),{helpers:{getControllerByKey:i}}=D({小球个数:{value:[t,1,1e3,10],onFinishChange(h){t=h,o.setBallsNum(h)}},开始(){let h=o.start();h&&(e.value=h)},暂停:{value:[function(){e.value()}],disable:!e.value},重置(){let h=o.reset();h&&(e.value=h)},查看源码(){s("check-source")}});G(e,h=>{i("暂停").enable(!!h)});const u=B();let o;function a(){gn({showClose:!0,message:"所有小球都停止运动了",type:"success",grouping:!0})}return P(()=>{let h=u.value;Object.assign(h,{width:innerWidth,height:innerHeight}),o=Bt({num:t,canvas:h,onAllStopped:a});const g=V(window,"resize",()=>{o.setSize({width:innerWidth,height:innerHeight})},{immediate:!0});o.render(),A(()=>{g(),e.value&&e.value()})}),(h,g)=>(E(),M("canvas",{ref_key:"canvasRef",ref:u},null,512))}}),It="/demo/assets/imgs/display-DOU4TeMC.png",jt={codes:[{name:"index.vue",code:Ct,lang:"js"},{name:"falling-balls.ts",code:Rt,lang:"ts"},{name:"ball.ts",code:nn,lang:"ts"}],component:kt,display:It,title:"下落的小球",descriptions:""},Et=`<template>
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
`,Ft=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=100,e=20,i=20,u=17,o=.01;D({小球个数:{value:[t,1,1e3,10],onFinishChange(r){t=r,g.setBallNum(r)}},小球半径上限:{value:[e,4,100,1],onFinishChange(r){e=r,g.updateBalls(m=>{m.r=j(4,r)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(r){i=r,g.updateBalls(m=>{m.vx=j(1,r)})}},小球y方向移动速度上限:{value:[u,1,15,.5],onFinishChange(r){u=r,g.updateBalls(m=>{m.vy=j(1,r)})}},小球摩擦力因子:{value:[o,0,3,.1],onFinishChange(r){o=r,g.updateBalls(m=>{m.friction=j(0,r)})}},开始(){a&&a(),a=g.start()},查看源码(){s("check-source")}});let a;const h=B();let g;return P(()=>{let r=h.value,m,d;Object.assign(r,{width:m=innerWidth,height:d=innerHeight}),g=Sn({canvas:r,ballsNum:t,createBallFac:()=>{let f={x:j(10,m-10),y:j(10,d-10),r:j(1,e),vx:j(1,i),vy:j(1,u),styleOptions:{fillStyle:K()},friction:j(0,o)};return new U(f)},onBallUpdate(f){f.vx>=.01&&(f.vx-=f.friction,f.x+=f.vx),f.vy>=.01&&(f.vy-=f.friction,f.y+=f.vy),f.x>m+f.r&&(f.x=-f.r),f.y>d+f.r&&(f.y=-f.r)}});const c=V(window,"resize",()=>{g.setSize({width:m=innerWidth,height:d=innerHeight})},{immediate:!0});A(()=>{c(),a&&a()})}),(r,m)=>(E(),M("canvas",{ref_key:"canvasRef",ref:h},null,512))}}),Mt="/demo/assets/imgs/display-BaZn1eIe.png",Ot={codes:[{name:"index.vue",code:Et,lang:"js"},{name:"wander-balls.ts",code:wn,lang:"ts"},{name:"ball.ts",code:nn,lang:"ts"}],component:Ft,display:Mt,title:"运动减速",descriptions:""},Tt=`<template>
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
`,zt=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=innerWidth,e=innerHeight,i,u=B(.01),o=B(.01),a=B(1),h=sn(new kn.Noise(Math.random())),g=B("simplex2"),r=()=>{let d=i.getImageData(0,0,t,e);for(let c=0;c<t;c++)for(let f=0;f<e;f++){let x=~~Math.min(255,Math.abs(h.value[g.value](c*u.value,f*o.value))*a.value*256);d.data[(f*t+c)*4+0]=x,d.data[(f*t+c)*4+1]=x,d.data[(f*t+c)*4+2]=x,d.data[(f*t+c)*4+3]=255}i.putImageData(d,0,0)};D({噪声生成算法:{value:[g.value,["simplex2","perlin2"]],onFinishChange(d){g.value=d}},x方向缩放因子:{value:[u.value,.001,.5,.001],onFinishChange(d){u.value=d}},y方向缩放因子:{value:[o.value,.001,.5,.001],onFinishChange(d){o.value=d}},值放缩因子:{value:[a.value,.01,255,.1],onFinishChange(d){a.value=d}},重新生成随机种子(){h.value=new kn.Noise(Math.random())},查看源码(){s("check-source")}});const m=B();return P(()=>{const d=m.value;d.width=t,d.height=e,i=d.getContext("2d",{willReadFrequently:!0});const c=V(window,"resize",le(()=>{t=~~(innerWidth/1),e=~~(innerHeight/1),d.width=t,d.height=e,r()},100));let f=re(r);A(()=>{c(),f()})}),(d,c)=>(E(),M("canvas",{ref_key:"canvasRef",ref:m},null,512))}}),$t="/demo/assets/imgs/display-CsCBxHWH.png",Nt={codes:[{name:"index.vue",code:Tt,lang:"js"}],component:zt,display:$t,title:"随机噪声",descriptions:""},Dt=`<template>
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
`;class Pt{constructor(n){w(this,"x",0);w(this,"y",0);w(this,"tx",0);w(this,"ty",0);w(this,"color","pink");w(this,"name","");w(this,"fx",.01);w(this,"fy",.01);w(this,"onDone");w(this,"r",0);w(this,"size",0);w(this,"done",!1);Object.assign(this,n)}update(){var t;let{tx:n,ty:s}=this;if(!this.done)return this.x=J(this.x,n,this.fx),this.y=J(this.y,s,this.fy),mn(this.x,this.tx)&&mn(this.y,this.ty)&&(this.done=!0,(t=this.onDone)==null||t.call(this)),this}render(n){let{color:s,x:t,y:e,size:i,r:u}=this;n.save(),Object.assign(n,{fillStyle:s}),n.beginPath(),i>0?n.fillRect(t,e,i,i):u>0?n.arc(t,e,u,0,Math.PI*2):n.arc(t,e,2,0,Math.PI*2),n.fill(),n.restore()}}class At{constructor(n){w(this,"canvas");w(this,"ctx");w(this,"fontSize",200);w(this,"fontFamily","微软雅黑");w(this,"color","pink");w(this,"gap",3);w(this,"alphaThreshold",30);w(this,"w",0);w(this,"h",0);let{canvas:s,ctx:t,fontSize:e,fontFamily:i,color:u,gap:o,alphaThreshold:a}=n;this.canvas=s,this.ctx=t??s.getContext("2d"),e&&(this.fontSize=e),i&&(this.fontFamily=i),u&&(this.color=u),o!=null&&(this.gap=o),a!=null&&(this.alphaThreshold=a),this.w=s.width,this.h=s.height}setSize(n){this.w=n.width,this.h=n.height}_measureText(n){let{ctx:s,fontSize:t,fontFamily:e,color:i,w:u,h:o}=this;s.save(),Object.assign(s,{font:`${t}px ${e}`,fillStyle:i,textBaseline:"bottom"});let a=s.measureText(n),{width:h,actualBoundingBoxAscent:g,actualBoundingBoxDescent:r}=a,m=~~(Math.abs(g)+Math.abs(r));h=~~h,s.fillText(n,0,m);let d=s.getImageData(0,0,h,m).data;return s.clearRect(0,0,u,o),s.restore(),{data:d,width:h,height:m}}getParticles(n){let{data:s,width:t,height:e}=this._measureText(n),{gap:i,alphaThreshold:u,w:o,h:a}=this,h=[],g=[];for(let r=0;r<t;r+=i)for(let m=0;m<e;m+=i){let d=m*t+r,c=s[d*4+0],f=s[d*4+1],x=s[d*4+2],b=s[d*4+3];if(b<=u)continue;let{signal:v,resolve:_}=oe();h.push(v);let y=ce({x:r,y:m},de({x:t/2,y:e/2},{x:o/2,y:a/2}));g.push({tx:y.x,ty:y.y,color:ue(c,f,x,b),onDone:_})}return{particles:g,done:Promise.all(h)}}}const Wt=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=B(),e=B("");let i,u=[],o=3,a="#f00",h=30,g=100,r=1,m=.1,d=.1,c=innerWidth,f=innerHeight,x=_n(()=>new Pt({r,x:j(0,c),y:j(0,f),fx:.1,fy:.1})),b="hello world";function v(y,C){let F=i.getParticles(y);return u=x(F.particles.length).map(O=>(O.done=!1,C&&(O.x=j(0,c),O.y=j(0,f)),O)),u.forEach((O,I)=>Object.assign(O,F.particles[I])),F.done}function _(){e.value&&(b=e.value,v(b,!0))}return P(()=>{let y=t.value;const C=y.getContext("2d",{willReadFrequently:!0});Object.assign(y,{width:c,height:f}),i=new At({canvas:y,ctx:C,gap:o,alphaThreshold:h,color:a}),D({调整文字颜色:{value:[a],isColor:!0,onFinishChange(I){i.color=I,v(b,!0)}},采样alpha过滤阈值:{value:[h,0,100,1],onFinishChange(I){i.alphaThreshold=I,v(b,!0)}},采样间隔调整:{value:[o,1,20,1],onFinishChange(I){i.gap=I,v(b,!0)}},点大小调整:{value:[r,1,20,1],onFinishChange(I){r=I,x.update(p=>p.r=I),v(b,!0)}},x方向缓动因子调整:{value:[m,.01,1,.01],onFinishChange(I){m=I,x.update(p=>p.fx=I),v(b,!0)}},y方向缓动因子调整:{value:[d,.01,1,.01],onFinishChange(I){d=I,x.update(p=>p.fy=I),v(b,!0)}},字体大小调整:{value:[g,50,340,10],onFinishChange(I){g=I,i.fontSize=I,v(b,!0)}},查看源码(){s("check-source")}}),v(b);const F=Q(()=>{C.clearRect(0,0,c,f),u.forEach(I=>{I.render(C),I.update()})}),O=V(window,"resize",()=>{c=innerWidth,f=innerHeight,y.width=c,y.height=f,i.setSize({width:c,height:f})});A(()=>{O(),F()})}),(y,C)=>{const F=$n;return E(),M(Y,null,[H("canvas",{ref_key:"canvasRef",ref:t},null,512),L(F,{class:"input",modelValue:X(e),"onUpdate:modelValue":C[0]||(C[0]=O=>bn(e)?e.value=O:null),placeholder:"请输入内容",size:"large",onKeyup:zn(_,["enter"])},null,8,["modelValue"])],64)}}}),Lt=q(Wt,[["__scopeId","data-v-0ead9cf7"]]),Gt=`import { iterateEaseFromTo, looseEqual } from '@thing772/utils'

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
`,Ht=`import { getSignal, ptOffset, getMovePt, rgb } from '@thing772/utils'
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
`,Vt="/demo/assets/imgs/display-DOJbIvru.png",qt={codes:[{name:"index.vue",code:Dt,lang:"js"},{name:"textParticle.ts",code:Ht,lang:"ts"},{name:"particle.ts",code:Gt,lang:"ts"}],component:Lt,display:Vt,title:"文字粒子化",descriptions:""},Kt=`<template>
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
`,Xt=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=100,e=20,i=10,u=7;D({小球个数:{value:[t,1,1e3,10],onFinishChange(g){t=g,h.setBallNum(g)}},小球半径上限:{value:[e,4,100,1],onFinishChange(g){e=g,h.updateBalls(r=>{r.r=j(4,g)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(g){i=g,h.updateBalls(r=>{r.vx=j(1,g)})}},小球y方向移动速度上限:{value:[u,1,15,.5],onFinishChange(g){u=g,h.updateBalls(r=>{r.vy=j(1,g)})}},开始(){o&&o(),o=h.start()},查看源码(){s("check-source")}});let o;const a=B();let h;return P(()=>{let g=a.value,r=innerWidth,m=innerHeight;Object.assign(g,{width:r,height:m}),h=Sn({canvas:g,ballsNum:t,createBallFac:()=>new U({x:j(10,r-10),y:j(10,m-10),r:j(1,e),vx:j(1,i),vy:j(1,u),styleOptions:{fillStyle:K()}})});const d=V(window,"resize",()=>{r=innerWidth,m=innerHeight,h.setSize({width:r,height:m})},{immediate:!0});h.render(),A(()=>{d(),o&&o()})}),(g,r)=>(E(),M("canvas",{ref_key:"canvasRef",ref:a},null,512))}}),Ut="/demo/assets/imgs/display-BpUGJlnU.png",Yt={codes:[{name:"index.vue",code:Kt,lang:"js"},{name:"wander-balls.ts",code:wn,lang:"ts"},{name:"ball.ts",code:nn,lang:"ts"}],component:Xt,display:Ut,title:"矩形区域内飘荡的小球",descriptions:""},Qt=`<template>
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
`,Zt={class:"container"},Jt=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,{obj:t}=D({模糊自身:{value:[!1],onChange(o){e.value=o}},模糊背景:{value:[!1],onChange(o){i.value=o}},查看源码(){s("check-source")}}),e=B(t.模糊自身),i=B(t.模糊背景),u=yn(()=>["el2",{"blur-self":e.value,"blur-backdrop":i.value}]);return(o,a)=>(E(),M("div",Zt,[a[0]||(a[0]=H("div",{class:"el1"}," 财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人， 较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻） ",-1)),H("div",{class:rn(X(u))}," 财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。 ",2)]))}}),na=q(Jt,[["__scopeId","data-v-bce03b61"]]),ea="/demo/assets/imgs/display-C7z4HTpE.png",ta={codes:[{name:"index.vue",code:Qt,lang:"js"}],component:na,display:ea,title:"css模糊效果",descriptions:""},aa=`<template>
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
`,ia=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let{obj:t}=D({"添加box-shadow":{value:[!1],onChange(a){e.value=a}},添加圆角:{value:[!1],onChange(a){i.value=a}},"添加filter:drop-shadow":{value:[!1],onChange(a){u.value=a}},查看源码(){s("check-source")}});const e=B(t["添加box-shadow"]),i=B(t.添加圆角),u=B(t["添加filter:drop-shadow"]),o=yn(()=>["container",{"has-shadow-box":e.value,"round-border":i.value,filter:u.value}]);return(a,h)=>(E(),M("div",{class:rn(X(o))},h[0]||(h[0]=[hn(" 测试文本 "),H("div",{class:"circle"}," 测试文本2 ",-1)]),2))}}),sa=q(ia,[["__scopeId","data-v-8a62668d"]]),la="/demo/assets/imgs/display-CvX0ByRG.png",ra={codes:[{name:"index.vue",code:aa,lang:"js"}],component:sa,display:la,title:"css box阴影效果",descriptions:""},oa=`<template>
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
`;function ca(l){const{data:n=[],getX:s,getY:t,width:e=200,height:i=200,margin:u=[],color:o={},sortY:a=0,xAxis:h={},yAxis:g={},yLegend:r={},hideXTicks:m}=l,[d=60,c=0,f=30,x=30]=u;let b,v;const _=he("svg").attr("width",e).attr("height",i).attr("viewBox",[0,0,e,i]).style("background-color",o.bg||""),y=_.append("g"),C=_.append("g").attr("transform",`translate(0,${i-f})`),F=_.append("g").attr("transform",`translate(${x},0)`),O=I=>{const p=k=>{if(b=pe().range([x,e-c]),un(l.xScale))for(let[R,z]of Object.entries(l.xScale))b[R](z);else b.padding(.2);a>0?b.domain(ge(k,([R])=>(a==1?1:-1)*t(R),s)):b.domain(k.map(s)),v=ve().domain([0,xe(k,t)]).range([i-f,d])},S=k=>{k.attr("x",0).attr("y",0).attr("width",b.bandwidth()).attr("height",R=>v(0)-v(t(R))).attr("fill",o.bar||"#409eff")},T=k=>{k.text(R=>R.value).attr("text-anchor","middle").attr("x",b.bandwidth()/2).attr("y",-4)};p(I),y.selectAll("g").data(I).join(k=>k.append("g").attr("transform",R=>`translate(${b(s(R))},${v(t(R))})`).call(R=>{S(R.append("rect")),T(R.append("text"))}),k=>(S(k.select("rect")),T(k.select("text")),k)).attr("transform",k=>`translate(${b(s(k))},${v(t(k))})`),C.call(k=>{let R=fe(b);R.tickSizeOuter(0);for(const[z,N]of Object.entries(h))R[z](N);R(k)}).call(k=>{m&&k.selectAll(".tick").remove()}),F.call(k=>{let R=me(v);for(const[z,N]of Object.entries(g))R[z](N);R(k)}).call(k=>k.select(".domain").remove()).call(k=>{if(r.text){let R=k.append("text").attr("text-anchor","middle").attr("x",0).attr("y",20);for(const[z,N]of Object.entries(r))z=="text"?R[z](N):R.attr(z,N)}})};return O(n),{svg:_.node(),update:O}}function*ua(l,n){on(n)||(n=vn),n=n;for(let s=1;s<l.length;s++)for(let t=0;t<l.length-s;t++)n(l[t])>n(l[t+1])&&(ln(l,t,t+1),yield[...l])}function*da(l,n){on(n)||(n=vn),n=n,l=[...l];for(let s=0;s<l.length-1;s++){let t=0;for(let e=0;e<l.length-s;e++)n(l[e])>n(l[t])&&(t=e);ln(l,t,l.length-s-1),yield[...l]}}function*ha(l,n){on(n)||(n=vn),l=[...l],n=n;for(let s=0;s<l.length-1;s++)if(n(l[s])>n(l[s+1])){ln(l,s,s+1),yield[...l];let t=s;for(;t>0&&!(n(l[t])>=n(l[t-1]));)ln(l,t,t-1),yield[...l],t--}}function*fa(l,n){on(n)||(n=vn);function*s(t,e){if(n=n,t==e)return;let i=Math.floor((t+e)/2);yield*s(t,i),yield*s(i+1,e);const u=o=>l=[...l.slice(0,t),...o,...l.slice(e+1)];if(!(n(l[i])<=n(l[i+1]))){if(n(l[e])<=n(l[t])){yield u([...l.slice(i+1,e+1),...l.slice(t,i+1)]);return}for(let o=1;i+o<=e;o++){let a=i+o;for(;a>t&&!(n(l[a])>=n(l[a-1]));)ln(l,a,a-1),a--,yield[...l]}}}yield*s(0,l.length-1)}const ma={class:"box"},pa=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=B(),e=[{label:"冒泡排序",value:ua},{label:"选择排序",value:da},{label:"插入排序",value:ha},{label:"归并排序",value:fa}],i=e[0],u=B(i.value);let o,a=innerWidth-100,h=innerHeight-100,g=!1,r=20,m=sn([]),d=sn();function c(){m.value=Xe(r).map((_,y)=>({id:y,value:_})),g=!1,d.value=u.value(m.value,_=>_.value)}G(u,()=>{d.value=u.value(m.value,_=>_.value)});function f(){let{value:_,done:y}=d.value.next();if(g=y,y){gn({showClose:!0,message:"已经排序完毕",type:"success",grouping:!0});return}else m.value=_}let x=B(0);function b(){x.value==0&&((!d.value||g)&&c(),x.value=setInterval(()=>{if(g){clearInterval(x.value),x.value=0;return}f()},v))}G(()=>m.value,_=>{_.length>0?(o||(o=ca({width:a,height:h,getX:y=>y.id,getY:y=>y.value}),t.value.appendChild(o.svg)),o.update(_)):o&&(t.value.removeChild(o.svg),o=null)});let v=50;return P(()=>{c();let{helpers:{getAllControllers:_}}=D({选择算法:{value:[i.label,e.map(C=>C.label)],onChange(C){let F=e.find(O=>O.label==C);u.value=F.value}},随机数个数:{value:[r,10,100,1],onFinishChange(C){r=C}},自动开始时间间隔:{value:[v,16,100,5],onFinishChange(C){v=C}},生成随机数:{value:[function(){c()}],disable:x.value!=0},排序下一步:{value:[function(){f()}],disable:!d.value||x.value!=0},自动开始(){b()},查看源码(){s("check-source")}}),y=G(x,C=>{_().forEach(F=>{F.property!="查看源码"&&F.disable(C>0)})});A(()=>{y(),clearInterval(x.value)})}),(_,y)=>(E(),M("div",ma,[H("div",{ref_key:"node",ref:t},null,512)]))}}),ga=q(pa,[["__scopeId","data-v-698136a6"]]),va=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,xa=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,ya=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,ba=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,_a="/demo/assets/imgs/display-B3luB7Uf.png",wa={codes:[{name:"index.vue",code:oa,lang:"js"},{name:"bubble.ts",code:va,lang:"ts"},{name:"selection.ts",code:xa,lang:"ts"},{name:"insertion.ts",code:ya,lang:"ts"},{name:"merge.ts",code:ba,lang:"ts"}],component:ga,display:_a,title:"排序算法可视化",descriptions:""},Sa=`<template>
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
`,Ca=`import { easeOutCubic } from './ease'
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
`;function Ra(l){return 1-Math.pow(1-l,3)}var tn=(l=>(l[l.NORMAL=0]="NORMAL",l[l.REVERSE=1]="REVERSE",l))(tn||{});function Ba(l,n){let{startIndex:s=0,speed:t=1,onDone:e,onProcessing:i}=n,u=s,o,a;const h=c=>{un(c)&&(a=Math.ceil(800/c))},g=()=>{o&&(cancelAnimationFrame(o),o=0)};h(t);function r(c){g();let{direction:f,speed:x,startIndex:b}=c,v;h(x),un(b)&&(u=b);const _=y=>{v||(v=y),y-v>=a&&(f==0?u=(u+1)%l.length:u=u-1>=0?u-1:l.length-1,i(u),v=y),o=requestAnimationFrame(_)};o||(o=requestAnimationFrame(_))}function m(){g()}function d(c){g();let{loopTimes:f=5,targetIndex:x=l.length-1,direction:b,speed:v,startIndex:_}=c||{};f=Math.max(Math.ceil(Number(f)),1),x=Math.max(0,Math.min(Number(x),l.length-1)),h(v),un(_)&&(u=_);let y=u,C,F=x-y;b==0?C=y+f*l.length+(F>=0?F:l.length+F):C=y-f*l.length+(F<=0?F:-l.length+F);let O=Math.abs(C-y)*a,I;const p=S=>{I||(I=S);let T=Math.min(1,(S-I)/O),R=(Math.ceil(Ra(T)*(C-y))+y)%l.length;if(R<0&&(R+=l.length),u!=R&&(u=R,i(u)),T==1){e(u),o=0;return}o=requestAnimationFrame(p)};o=requestAnimationFrame(p)}return{wander:r,stop:m,draw:d}}const ka={class:"box"},Ia={style:{display:"flex"}},ja=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n,t=B(1),e=[...Array(10)],i={targetIndex:2,loopTimes:2,direction:tn.NORMAL,speed:5},{wander:u,stop:o,draw:a}=Ba(e,{speed:i.speed,startIndex:t.value,onProcessing:d=>{t.value=d},onDone(d){gn({showClose:!0,message:"已经抽奖完毕",type:"success",grouping:!0}),t.value=d}});function h(){u({...i})}function g(){a({...i})}A(()=>{o(),r&&clearTimeout(r)});let r;function m(){h(),r=setTimeout(()=>{i.targetIndex=Dn(e),g(),r=0},2500)}return D({设定巡航速度:{value:[i.speed,1,10,1],onFinishChange(d){i.speed=d}},设定最终选中项索引:{value:[i.targetIndex,0,e.length-1,1],onFinishChange(d){i.targetIndex=d}},轮转次数:{value:[i.loopTimes,2,20,1],onFinishChange(d){i.loopTimes=d}},轮转方向:{value:[i.direction==tn.NORMAL?"正向":"负向",["正向","负向"]],onChange(d){i.direction=d=="正向"?tn.NORMAL:tn.REVERSE}},开始抽奖:g,开始巡航:h,停止:o,模拟接口返回预制数据:m,查看源码(){s("check-source")}}),(d,c)=>{const f=Nn;return E(),M("div",ka,[L(f,{class:"demo-card",shadow:"always"},{default:W(()=>[H("div",Ia,[(E(),M(Y,null,an(e,(x,b)=>H("div",{class:rn(["block",X(t)==b?"selected":""])},dn(b),3)),64))])]),_:1})])}}}),Ea=q(ja,[["__scopeId","data-v-2fa66777"]]),Fa="/demo/assets/imgs/display-DiF1Sfat.png",Ma={codes:[{name:"index.vue",code:Sa,lang:"js"},{name:"draw-price.ts",code:Ca,lang:"ts"}],component:Ea,display:Fa,title:"抽奖",descriptions:""},Oa=`<template>
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
`,Ta="/demo/assets/imgs/018194d9aac11f975e17b274fe4a78af1463731957-BlWzWTpc.png",za="/demo/assets/imgs/10251358673700483-Bf69morh.jpg",$a="/demo/assets/imgs/10251358673922612-wa-5hia3.jpg",Na="/demo/assets/imgs/10251381214893821-DZ0tyfKl.jpg",Da="/demo/assets/imgs/10251381215028477-DT0oxPDL.jpg",Pa="/demo/assets/imgs/10251381215091916-34MSuKPK.jpg",Aa="/demo/assets/imgs/10251381215152314-ZOViud5b.jpg",Wa="/demo/assets/imgs/10251381215208971-BnTSlzDn.jpg",La="/demo/assets/imgs/10251381215487222-CyoYfFWR.jpg",Ga="/demo/assets/imgs/10251381215991717-jivRh7vw.jpg",Ha="/demo/assets/imgs/10251381216212847-C6d5iI8I.jpg",Va="/demo/assets/imgs/3a5950fc2408a7f8136de8704e1819c21463732075-DT6cAkAt.png",qa="/demo/assets/imgs/48d780d33eaf46a5646376b814b8efa71463731556-CGACL27Z.png",Ka="/demo/assets/imgs/554e21161de34506e9cb1ecbcd85716d1463732343-LZH7KjnQ.png",Xa="/demo/assets/imgs/884f9b653e317cc514890954b2e35be81463731323-DvATjqjX.png",Ua="/demo/assets/imgs/8a116da0668edebd82af16ecf7e75ace1590566316-Cl-PTpZA.jpg",Ya="/demo/assets/imgs/928d6ec50975da022bda97a1ab8f04c81463731839-d_LHiOEG.png",Qa="/demo/assets/imgs/a748932756b48bd46a8fd17df4579dea1463732104-DlsyWN-A.png",Za="/demo/assets/imgs/b5978ead603dcdc66704e721960debe31590565987-4RsIwXgW.jpg",Ja="/demo/assets/imgs/c06f07de280d4edebf801eef4b142c721463731804-DD1ps6p3.png",ni="/demo/assets/imgs/ceb8c078cf6b410d7def183870fe584d1590566557-9BfKn2sf.jpg",ei="/demo/assets/imgs/ea5871bc33e131b497b9bb273890e8ae1463731875-WWF6WmyZ.png",ti="/demo/assets/imgs/f29af13446f1feed47dcfd299ccaa23c1463732001-DrhlCMaO.png",ai="/demo/assets/imgs/fef4eadd191c3461054ca60cde8576db1590566398-Bn18syhQ.jpg",ii={class:"container"},si=["src"],li=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=n;let t=[...Object.values([Ta,za,$a,Na,Da,Pa,Aa,Wa,La,Ga,Ha,Va,qa,Ka,Xa,Ua,Ya,Qa,Za,Ja,ni,ei,ti,ai])];t=B(Ue(t,Math.ceil(t.length/5))),D({查看源码(){s("check-source")}});function i(o){o.target.classList.add("level-up")}function u(o){o.target.classList.remove("level-up")}return(o,a)=>(E(),M("div",ii,[(E(!0),M(Y,null,an(X(t),(h,g)=>(E(),M("div",{class:rn(["hive-row",g%2==1?"odd":""]),onMouseenter:i,onMouseleave:u},[(E(!0),M(Y,null,an(h,r=>(E(),M("img",{class:"hive-item",src:r,alt:""},null,8,si))),256))],34))),256))]))}}),ri=q(li,[["__scopeId","data-v-93867a89"]]),oi="/demo/assets/imgs/display-BVEemRNY.png",ci={codes:[{name:"index.vue",code:Oa,lang:"js"}],component:ri,display:oi,title:"蜂巢图片",descriptions:""},ui=`<template>
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
`,di=`import { isFunc } from '@/utils/utils'

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
`,hi=`import type { SceneInstance, SceneObj } from "./scene"
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
`;class fi{constructor(n){w(this,"canvas");w(this,"ctx");w(this,"width",0);w(this,"height",0);w(this,"background");w(this,"_t0",0);w(this,"_t1",0);w(this,"_dt",0);w(this,"_objects",[]);w(this,"_raf",0);let{width:s,height:t,canvas:e,background:i}=n;this.canvas=e,this.ctx=e.getContext("2d"),this.background=i??"#000",this.setSize(s,t)}setSize(n,s){this.canvas.width=n,this.canvas.height=s,this.width=n,this.height=s}_render(){let{width:n,height:s,ctx:t,background:e}=this;t.fillStyle=e,t.fillRect(0,0,n,s);for(let i of[...this._objects])i.render(this._dt)}_updateTime(n){this._t0==0&&(this._t0=n),this._dt=n-this._t0}run(n){const s=t=>{this._updateTime(t),on(n)&&n(this._dt),this._render(),this._raf=requestAnimationFrame(s)};this._raf=requestAnimationFrame(s)}addObj(...n){return n.forEach(s=>{this._objects.find(t=>t==s)||(this._objects.push(s),s.scene=this)}),this}removeObj(n){let s=this._objects.findIndex(t=>t==n);return s!=-1&&(this._objects.splice(s,1),n.scene==this&&(n.scene=null)),this}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._t0=0,this._t1=0,this._dt=0)}}const mi=[...Array(26)].map((l,n)=>["a","A"].map(s=>String.fromCharCode(s.charCodeAt(0)+n))).flat();function pi(){return[...Array(Z(8)+2)].map(()=>Pn(mi)).join("")}class gi{constructor(n){w(this,"_x");w(this,"_y");w(this,"_text");w(this,"_opacity");w(this,"_onDismiss");w(this,"scene");w(this,"_opacityDecay");w(this,"_rawOptions");w(this,"_yStep");w(this,"_font","20px serif");w(this,"_fillStyle","red");let{x:s,y:t,text:e,opacity:i,opacityDecay:u,onDismiss:o,yStep:a}=n;this._x=s,this._y=t,this._text=e,this._opacity=i,this._onDismiss=o,this._opacityDecay=u??.01,this._rawOptions={...n},this._yStep=a??4}setFont(n,s){return this._font=n,this._fillStyle=s,this}render(n){let{_text:s,_x:t,_y:e,_opacityDecay:i,_yStep:u,_fillStyle:o,_font:a}=this,{ctx:h,height:g}=this.scene,r={font:h.font,fillStyle:h.fillStyle,globalAlpha:h.globalAlpha};this._opacity-=typeof i=="number"?i:i(n),this._opacity<0&&(this._opacity=0),h.font=a,h.fillStyle=o,h.globalAlpha=this._opacity;let m=0,d=e+(typeof u=="number"?u:u(n));for(let c of s){let f=h.measureText(c);const{actualBoundingBoxAscent:x,actualBoundingBoxDescent:b}=f;let v=b+x;h.fillText(c,t,d-m),m+=v+10}this._y=d,Object.assign(h,r),(this._opacity==0||d-m>g)&&this._onDismiss(this)}}class vi{constructor(n){w(this,"scene");w(this,"num",0);w(this,"maxNum",100);w(this,"colors",["brown","red","green","yellow","chocolate","pink","burlywood","chartreuse","cyan"]);let{scene:s,maxNum:t}=n;this.scene=s,t&&(this.maxNum=t)}addText(){if(this.num<this.maxNum){this.num++;let{width:n,height:s}=this.scene,t=new gi({text:pi(),x:Z(n),y:Z(s),yStep:Z(10)+2,opacity:+Math.min(1,Math.random()+.2).toPrecision(2),opacityDecay:.01,onDismiss:e=>{this.scene.removeObj(e),this.num--}}).setFont(`${Z(15)+14}px serif`,Pn(this.colors));this.scene.addObj(t)}}start(){this.scene.run(n=>{this.addText()})}stop(){this.scene.stop()}}function xi(l,n,s){l.addEventListener("resize",n),A(()=>{l.removeEventListener("resize",n)})}const yi={class:"box"},bi=$({__name:"index",emits:["check-source"],setup(l,{emit:n}){const s=B(),t=n;return P(()=>{let e=new fi({width:innerWidth,height:innerHeight,canvas:s.value}),{obj:i}=D({文字串数量:{value:[10,10,200,10],onChange(o){u.maxNum=o}},查看代码:function(){t("check-source")}}),u=new vi({scene:e,maxNum:i.文字串数量});u.start(),xi(window,()=>{e.setSize(innerWidth,innerHeight)}),A(()=>{u.stop()})}),(e,i)=>(E(),M("div",yi,[H("canvas",{ref_key:"canvas",ref:s},null,512)]))}}),_i=q(bi,[["__scopeId","data-v-4010e3a7"]]),wi="/demo/assets/imgs/display-DwV-CRAI.png",Si={codes:[{name:"index.vue",code:ui,lang:"js"},{name:"scene.ts",code:di,lang:"ts"},{name:"textRain.ts",code:hi,lang:"ts"}],component:_i,display:wi,title:"文字雨",descriptions:""};let cn;function An(){return cn||(cn=Object.assign({"./demo/canvas/audio-wave/config.ts":qe,"./demo/canvas/bfs/config.ts":nt,"./demo/canvas/chasing/config.ts":it,"./demo/canvas/connect-balls/config.ts":ot,"./demo/canvas/coord/config.ts":ft,"./demo/canvas/dfs/config.ts":yt,"./demo/canvas/eyeballs/config.ts":St,"./demo/canvas/faliling-balls/config.ts":jt,"./demo/canvas/friction/config.ts":Ot,"./demo/canvas/noise/config.ts":Nt,"./demo/canvas/text-particle/config.ts":qt,"./demo/canvas/wander-balls/config.ts":Yt,"./demo/css/blur/config.ts":ta,"./demo/css/shadow/config.ts":ra,"./demo/d3/sort/config.ts":wa,"./demo/draw-price/config.ts":Ma,"./demo/hive/config.ts":ci,"./demo/text-rain/config.ts":Si}),cn)}let Wn=[];function Ci(){const l=An();for(let n in l){let{codes:s,component:t,title:e}=l[n],i=function(){return In(Ne,{codes:s},({checkSource:a})=>In(t,{onCheckSource:()=>{a()}}))};i.displayName=`Demo(${n})`;let u=n.replace(/.*\/demo\//,"").replace("/config.ts","").split("/").join("-");l[n].routeName=u,Wn.push({path:u,name:u,component:i,meta:{title:e}})}}Ci();const Ri={path:"/demo",children:Wn},Bi={class:"common-layout"},ki=$({__name:"index",setup(l){let n=Object.values(An());return(s,t)=>{const e=we,i=Se,u=Nn,o=_e,a=be,h=ye,g=Ce;return E(),M("div",Bi,[L(g,{class:"container"},{default:W(()=>[L(h,{class:"main"},{default:W(()=>[L(a,{class:"row",gutter:20},{default:W(()=>[(E(!0),M(Y,null,an(X(n),r=>(E(),xn(o,{key:r.routeName,span:4},{default:W(()=>[L(u,{class:"demo-card","body-style":{padding:"0px"},shadow:"always",onClick:m=>s.$router.push({name:r.routeName})},{footer:W(()=>[L(i,{tag:"p"},{default:W(()=>[hn(dn(r.title),1)]),_:2},1024),L(i,{tag:"p","line-clamp":2},{default:W(()=>[hn(dn(r.descriptions||"暂无描述"),1)]),_:2},1024)]),default:W(()=>[L(e,{class:"image",src:r.display,fit:"cover"},null,8,["src"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}}}),Ii=q(ki,[["__scopeId","data-v-fe2c6a64"]]),Ln=Re({history:Be("/demo/"),routes:[{path:"/",component:Ii},Ri]});Ln.beforeEach((l,n,s)=>{document.title=l.meta.title??"my demos",s()});const Cn=ke(Fe);Cn.use(Ie());Cn.use(Ln);Cn.mount("#app");
