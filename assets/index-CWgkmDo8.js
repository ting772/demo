var An=Object.defineProperty;var Dn=(a,n,t)=>n in a?An(a,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[n]=t;var x=(a,n,t)=>Dn(a,typeof n!="symbol"?n+"":n,t);import{r as $n,c as pn,o as C,d as F,a as O,b as fn,e as N,P as zn,f as T,g as $,t as cn,n as sn,u as G,h as D,i as Mn,w as A,E as Nn,F as V,j as en,k as Pn,l as Ln,m as un,p as gn,q as Wn,s as q,v as Gn,x as Hn,y as z,z as M,A as W,B as K,C as Un,D as _n,G as Vn,H as R,I as Bn,J as qn,K as wn,L as Cn,M as kn,N as hn,O as Xn,Q as Yn,R as Kn,S as dn,T as on,U as Zn,V as Jn,W as Qn,X as ne,Y as ee,Z as te,_ as se,$ as ae,a0 as ie,a1 as le,a2 as oe,a3 as Rn,a4 as jn,a5 as Sn,a6 as re,a7 as ce,a8 as ue,a9 as de,aa as he,ab as me,ac as pe,ad as fe,ae as ge,af as ve}from"./vendor-Dx7zSnr0.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=t(e);fetch(e.href,i)}})();const P=(a,n)=>{const t=a.__vccOpts||a;for(const[s,e]of n)t[s]=e;return t},ye={};function xe(a,n){const t=$n("RouterView");return C(),pn(t)}const be=P(ye,[["render",xe]]),_e={class:"pre"},we=F({__name:"hilight",props:{code:{},lang:{}},setup(a){const n=a,t=O(),s=fn(()=>n.lang?`lang-${n.lang}`:"auto");return N(()=>{zn.highlightElement(t.value)}),(e,i)=>(C(),T("pre",_e,[$("code",{class:sn(G(s)),ref_key:"codeRef",ref:t},cn(e.code),3)]))}}),Re={class:"container"},Se={class:"dialog-footer"},Be=F({__name:"codeDemo",props:{codes:{}},setup(a){const n=O(!1);function t(){n.value=!0}return(s,e)=>{const i=Pn,l=Nn,o=Ln,u=Wn;return C(),T(V,null,[$("div",Re,[Mn(s.$slots,"default",{checkSource:t},void 0,!0)]),D(u,{modelValue:G(n),"onUpdate:modelValue":e[1]||(e[1]=r=>gn(n)?n.value=r:null),title:"",width:"50vw",top:"50px"},{footer:A(()=>[$("span",Se,[D(o,{type:"primary",onClick:e[0]||(e[0]=r=>n.value=!1)},{default:A(()=>e[2]||(e[2]=[un("关闭")])),_:1})])]),default:A(()=>[D(l,{type:"border-card"},{default:A(()=>[(C(!0),T(V,null,en(s.codes,r=>(C(),pn(i,{label:r.name,key:r.name,lazy:""},{default:A(()=>[D(we,{code:r.code,lang:r.lang},null,8,["code","lang"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"])],64)}}}),Ce=P(Be,[["__scopeId","data-v-65455990"]]),ke=`<template>
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
`,je=`import { rafLoop } from '@thing772/utils'

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
`;function Oe(a,n){const t=new AudioContext;let s=t.createMediaElementSource(a);const e=t.createAnalyser();s.connect(e),e.connect(t.destination),e.fftSize=512;const i=e.frequencyBinCount,l=new Uint8Array(i),o=n.getContext("2d");let u=n.width,r=n.height;function h(){e.getByteTimeDomainData(l),o.save(),Object.assign(o,{fillStyle:"red"});const m=u/i;for(let v=0;v<i;v+=4){let p=l[v]/255*r;o.fillRect(m*v,r-p,m,p)}o.fill(),o.restore()}function c(m,v){u=n.width=m,r=n.height=v}function f(){return q(()=>{o.clearRect(0,0,u,r),h()})}return{setSize:c,start:f}}const Te="/demo/assets/media/%E5%8C%96%E5%87%A1-DF7X08YA.ogg";function E(a){if(!a.title){let t=Gn().meta.title;t&&(a.title=t)}let n=Hn(a);return z(()=>{n.gui.destroy()}),n}const Ie=["src"],Fe=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;E({查看源码(){t("check-source")}});const s=O(),e=O();return N(()=>{let i;e.value.onplay=()=>{const{start:l,setSize:o}=Oe(e.value,s.value);i=M(window,"resize",()=>{o(innerWidth,innerHeight)},{immediate:!0}),l()},z(()=>{i&&i()})}),(i,l)=>(C(),T(V,null,[$("audio",{ref_key:"audioRef",ref:e,src:G(Te),id:"audio",controls:""},null,8,Ie),$("canvas",{ref_key:"canvasRef",ref:s},null,512)],64))}}),Ee=P(Fe,[["__scopeId","data-v-24237bd0"]]),Ae="/demo/assets/imgs/display-_9yby0tz.png",De={codes:[{name:"index.vue",code:ke,lang:"js"},{name:"audio-wave",code:je,lang:"ts"}],component:Ee,display:Ae,title:"音频波形",descriptions:""},$e=`<template>
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
`,Z=`type BallOptions = {
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
`;class U{constructor(n){x(this,"x",0);x(this,"y",0);x(this,"r",0);x(this,"vx",0);x(this,"vy",0);x(this,"ax",0);x(this,"ay",0);x(this,"styleOptions",{});n&&this.set(n)}reset(n){return Object.assign(this,{x:0,y:0,r:0,vx:0,vy:0,ax:0,ay:0,...n?{styleOptions:{}}:null})}set(n){return Object.assign(this,n)}update(){return this.vy+=this.ay,this.y+=this.vy,this.vx+=this.ax,this.x+=this.vx,this}render(n){n.save();let{x:t,y:s,r:e,styleOptions:i}=this;Object.assign(n,i),n.beginPath(),n.arc(t,s,e,0,Math.PI*2),i.fillStyle&&n.fill(),i.strokeStyle&&n.stroke(),n.restore()}}const ze=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;E({查看源码(){t("check-source")}});const s=O();return N(()=>{let e=s.value,i,l,o,u=e.getContext("2d");const r=M(window,"resize",()=>{Object.assign(e,{width:i=innerWidth,height:l=innerHeight})},{immediate:!0}),h=M(e,"mousemove",function(f){o={x:f.offsetX,y:f.offsetY}});let c=new U({r:100,x:i/2,y:l/2,styleOptions:{fillStyle:W()}});q(()=>{u.clearRect(0,0,i,l),o&&(c.x=K(c.x,o.x,.05),c.y=K(c.y,o.y,.05)),c.render(u)}),z(()=>{r(),h()})}),(e,i)=>(C(),T("canvas",{ref_key:"canvasRef",ref:s},null,512))}}),Me="/demo/assets/imgs/display-IdleEMXt.png",Ne={codes:[{name:"index.vue",code:$e,lang:"js"},{name:"ball.ts",code:Z,lang:"ts"}],component:ze,display:Me,title:"缓动追逐",descriptions:""},Pe=`<template>
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
`,vn=`import { rafLoop, updateBallVelocityInRect, isFunc } from '@thing772/utils'
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
`;function On(a){return Math.floor(Math.random()*a.length)}function Tn(a){return a[On(a)]}function Le(a,n=1e3){let t=[];for(let s=0;s<a;s++)t.push(Y(n));return t}function Y(a=1e3){return Math.ceil(Math.random()*a)}function We(a,n){return a.reduce((t,s,e)=>(e%n==0&&t.push(a.slice(e,e+n)),t),[])}function tn(a,n,t){let s=a[n];a[n]=a[t],a[t]=s}function rn(a){return a!=null}function an(a){return typeof a=="function"}function mn(a){return a}function yn(a){let n=[];function t(s){let e=s-n.length;return e>0?n.push(...Un(a,e)):e<0&&(n=n.slice(0,e)),n}return t.update=function(s){n.forEach(e=>s(e))},t}function xn(a){let{canvas:n,ballsNum:t,createBallFac:s,onBallUpdate:e,speedDecay:i,preRender:l,postRender:o}=a,u=n.width,r=n.height;const h=n.getContext("2d");let c=[];const f=yn(s);function m(g){c=f(g),p()}function v(g){Object.assign(n,g),u=g.width,r=g.height,p()}function p(g){c.forEach(w=>{_n(g)&&g(w),w.render(h)})}function y(){h.clearRect(0,0,u,r);for(let g of c)_n(e)?e(g):(g.update(),Vn(g,{wBox:[0,u],hBox:[0,r],speedDecay:i}));l==null||l(c,h),c.forEach(g=>g.render(h)),o==null||o(c,h)}function b(g){h.clearRect(0,0,u,r),p(g)}m(t);let d;function _(){return d&&d(),d=q(()=>{y()})}return{start:_,setBallNum:m,setSize:v,render:y,updateBalls:b}}const Ge=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let s=80,e=1,i=3,l=3,o=100,u;E({小球个数:{value:[s,1,1e3,10],onFinishChange(m){s=m,c.setBallNum(m)}},小球半径上限:{value:[e,1,100,1],onFinishChange(m){e=m,c.updateBalls(v=>{v.r=R(1,m)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(m){i=m,c.updateBalls(v=>{v.vx=R(1,m)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(m){l=m,c.updateBalls(v=>{v.vy=R(1,m)})}},小球连接范围阈值:{value:[o,50,300,1],onFinishChange(m){o=m}},查看源码(){t("check-source")}});let r;const h=O();let c,f;return N(()=>{let m=h.value,v=innerWidth,p=innerHeight;Object.assign(m,{width:v,height:p}),c=xn({canvas:m,ballsNum:s,createBallFac:()=>new U({x:R(10,v-10),y:R(10,p-10),r:R(1,e),vx:R(1,i),vy:R(1,l),styleOptions:{fillStyle:W()}}),preRender(d,_){u||(u=Bn(_,{strokeStyle:W(),lineWidth:1})),f&&(d=d.concat(f));for(let g=0;g<d.length;g++)for(let w=g+1;w<d.length;w++){let j=d[g],I=d[w];qn(j,I)<o&&u(j,I)}f&&d.pop()}});const y=M(window,"resize",()=>{v=innerWidth,p=innerHeight,c.setSize({width:v,height:p})},{immediate:!0}),b=M(m,"mousemove",d=>{f={x:d.offsetX,y:d.offsetY}},{needLog:!0});r=c.start(),z(()=>{y(),b(),r&&r()})}),(m,v)=>(C(),T("canvas",{ref_key:"canvasRef",ref:h},null,512))}}),He="/demo/assets/imgs/display-y86Fu395.png",Ue={codes:[{name:"index.vue",code:Pe,lang:"js"},{name:"wander-balls.ts",code:vn,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:Ge,display:He,title:"粒子小球连线",descriptions:""},Ve=`<template>
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
`,qe=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n,s=O();let e=innerWidth,i=innerHeight,l,o=(v,p)=>Math.sin(5*v+.001*p)+Math.cos(10*v+.005*p),u=O(""),r=o,h=300,c=1,f=W();function m(){r=new Function("x","t",`return ${u.value}`);try{r(0,0)}catch(v){hn({showClose:!0,message:v.message,type:"error",grouping:!0})}}return N(()=>{let v=s.value;const p=v.getContext("2d");E({采样率设置:{value:[h,10,1e3,10],onFinishChange(d){h=d}},曲线粗细设置:{value:[c,1,10,1],onFinishChange(d){c=d}},曲线颜色设置:{value:[f],isColor:!0,onFinishChange(d){f=d}},查看源码(){t("check-source")}}),l=wn({canvas:v,ctx:p,width:e,height:i});const y=q(d=>{p.clearRect(0,0,e,i),l.setup(),l.draw(_=>{let g=0;try{g=r(_,d)}catch{}return g},{rate:h,style:{strokeStyle:f,lineWidth:c},label:{name:r.toString().replace(/ anonymous/,""),pos:{x:100,y:100}}})}),b=M(window,"resize",()=>{e=innerWidth,i=innerHeight,l=wn({canvas:v,ctx:p,width:e,height:i})});z(()=>{b(),y()})}),(v,p)=>{const y=kn;return C(),T(V,null,[$("canvas",{ref_key:"canvasRef",ref:s},null,512),D(y,{class:"input",modelValue:G(u),"onUpdate:modelValue":p[0]||(p[0]=b=>gn(u)?u.value=b:u=b),placeholder:"参数:（x:x坐标，t：时间参数），输入x和t的表达式",size:"large",onKeyup:Cn(m,["enter"])},null,8,["modelValue"])],64)}}}),Xe=P(qe,[["__scopeId","data-v-6125c1c8"]]),Ye="/demo/assets/imgs/display-BsbAITaj.png",Ke={codes:[{name:"index.vue",code:Ve,lang:"js"}],component:Xe,display:Ye,title:"笛卡尔坐标系函数绘制",descriptions:""},Ze=`<template>
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
`,Je=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;E({查看源码(){t("check-source")}});const s=O();return N(()=>{let e=s.value,i,l,o,u=e.getContext("2d");const r=M(window,"resize",()=>{Object.assign(e,{width:i=innerWidth,height:l=innerHeight})},{immediate:!0}),h=M(e,"mousemove",function(y){o={x:y.offsetX,y:y.offsetY}});let c=[new U({r:50,x:i/2-80,y:l/2,styleOptions:{fillStyle:W()}}),new U({r:50,x:i/2+80,y:l/2,styleOptions:{fillStyle:W()}})],f=c.map(y=>new U({r:y.r/4,x:y.x,y:y.y,styleOptions:{fillStyle:W()}})),m=new U({r:200,x:i/2,y:l/2,styleOptions:{fillStyle:"#E6A23C"}}),v=Bn(u,{strokeStyle:"#fff",lineWidth:"10",lineCap:"round"}),p=.05;q(()=>{u.clearRect(0,0,i,l),m.render(u),c.forEach(y=>{y.render(u)}),f.forEach((y,b)=>{if(o){let d=y.x=K(y.x,o.x,p),_=y.y=K(y.y,o.y,p),g=c[b],w={x:g.x,y:g.y,r:g.r-10};if(!Xn(w,y)){y.x=d,y.y=_;let j=Yn(w,o);Object.assign(y,Kn(w,j,w.r-y.r))}}y.render(u)}),v({x:i/2-50,y:l/2+100},{x:i/2+50,y:l/2+100})}),z(()=>{r(),h()})}),(e,i)=>(C(),T("canvas",{ref_key:"canvasRef",ref:s},null,512))}}),Qe="/demo/assets/imgs/display-BcjSOcDf.png",nt={codes:[{name:"index.vue",code:Ze,lang:"js"},{name:"ball.ts",code:Z,lang:"ts"}],component:Je,display:Qe,title:"会动的眼球",descriptions:""},et=`<template>
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
`,tt=`import { Ball } from '@/utils/class/ball'
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
`;function st(a){let{canvas:n,num:t,onAllStopped:s}=a;const e=n.getContext("2d");let i=n.width,l=n.height,o=[],u=!1,r=!1;const h=yn(()=>new U(c()));function c(){return{x:R(10,i-10),y:R(10,l-10),r:4,ax:0,ay:R(.1,2,!1),vx:0,vy:R(1,3),styleOptions:{fillStyle:W()},stopped:!1}}function f(d){o=h(d)}function m(){for(let d of o)d.reset().set(c());if(r=!1,!u)return b()}function v(d){Object.assign(n,d),i=d.width,l=d.height}function p(d){return d.stopped||dn(d.vy,0,1)&&dn(d.y+d.r,l,1)}function y(){if(o.length!=0){e.clearRect(0,0,i,l);for(let d of o)if(d.update(),d.y+d.r>l&&(d.y=l-d.r,d.vy*=-.7),d.render(e),p(d)&&(d.stopped=!0,o.every(p))){u=!1,r=!0;try{s==null||s()}catch(_){console.error(_)}return!1}}}f(t);function b(){if(u)return;u=!0,r&&m();let d=q(y);return()=>{u&&(u=!1,d())}}return{start:b,reset:m,setBallsNum:f,setSize:v,render:y}}const at=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let s=100;const e=O(),{helpers:{getControllerByKey:i}}=E({小球个数:{value:[s,1,1e3,10],onFinishChange(r){s=r,o.setBallsNum(r)}},开始(){let r=o.start();r&&(e.value=r)},暂停:{value:[function(){e.value()}],disable:!e.value},重置(){let r=o.reset();r&&(e.value=r)},查看源码(){t("check-source")}});on(e,r=>{i("暂停").enable(!!r)});const l=O();let o;function u(){hn({showClose:!0,message:"所有小球都停止运动了",type:"success",grouping:!0})}return N(()=>{let r=l.value;Object.assign(r,{width:innerWidth,height:innerHeight}),o=st({num:s,canvas:r,onAllStopped:u});const h=M(window,"resize",()=>{o.setSize({width:innerWidth,height:innerHeight})},{immediate:!0});o.render(),z(()=>{h(),e.value&&e.value()})}),(r,h)=>(C(),T("canvas",{ref_key:"canvasRef",ref:l},null,512))}}),it="/demo/assets/imgs/display-DOU4TeMC.png",lt={codes:[{name:"index.vue",code:et,lang:"js"},{name:"falling-balls.ts",code:tt,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:at,display:it,title:"下落的小球",descriptions:""},ot=`<template>
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
`,rt=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let s=100,e=20,i=20,l=17,o=.01;E({小球个数:{value:[s,1,1e3,10],onFinishChange(c){s=c,h.setBallNum(c)}},小球半径上限:{value:[e,4,100,1],onFinishChange(c){e=c,h.updateBalls(f=>{f.r=R(4,c)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(c){i=c,h.updateBalls(f=>{f.vx=R(1,c)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(c){l=c,h.updateBalls(f=>{f.vy=R(1,c)})}},小球摩擦力因子:{value:[o,0,3,.1],onFinishChange(c){o=c,h.updateBalls(f=>{f.friction=R(0,c)})}},开始(){u&&u(),u=h.start()},查看源码(){t("check-source")}});let u;const r=O();let h;return N(()=>{let c=r.value,f,m;Object.assign(c,{width:f=innerWidth,height:m=innerHeight}),h=xn({canvas:c,ballsNum:s,createBallFac:()=>{let p={x:R(10,f-10),y:R(10,m-10),r:R(1,e),vx:R(1,i),vy:R(1,l),styleOptions:{fillStyle:W()},friction:R(0,o)};return new U(p)},onBallUpdate(p){p.vx>=.01&&(p.vx-=p.friction,p.x+=p.vx),p.vy>=.01&&(p.vy-=p.friction,p.y+=p.vy),p.x>f+p.r&&(p.x=-p.r),p.y>m+p.r&&(p.y=-p.r)}});const v=M(window,"resize",()=>{h.setSize({width:f=innerWidth,height:m=innerHeight})},{immediate:!0});z(()=>{v(),u&&u()})}),(c,f)=>(C(),T("canvas",{ref_key:"canvasRef",ref:r},null,512))}}),ct="/demo/assets/imgs/display-BaZn1eIe.png",ut={codes:[{name:"index.vue",code:ot,lang:"js"},{name:"wander-balls.ts",code:vn,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:rt,display:ct,title:"运动减速",descriptions:""},dt=`<template>
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
  const ctx = canvas.getContext('2d')!

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
      value: [gap, 0, 20, 1],
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
`;class ht{constructor(n){x(this,"x",0);x(this,"y",0);x(this,"tx",0);x(this,"ty",0);x(this,"color","pink");x(this,"name","");x(this,"fx",.01);x(this,"fy",.01);x(this,"onDone");x(this,"r",0);x(this,"size",0);x(this,"done",!1);Object.assign(this,n)}update(){var s;let{tx:n,ty:t}=this;if(!this.done)return this.x=K(this.x,n,this.fx),this.y=K(this.y,t,this.fy),dn(this.x,this.tx)&&dn(this.y,this.ty)&&(this.done=!0,(s=this.onDone)==null||s.call(this)),this}render(n){let{color:t,x:s,y:e,size:i,r:l}=this;n.save(),Object.assign(n,{fillStyle:t}),n.beginPath(),i>0?n.fillRect(s,e,i,i):l>0?n.arc(s,e,l,0,Math.PI*2):n.arc(s,e,2,0,Math.PI*2),n.fill(),n.restore()}}class mt{constructor(n){x(this,"canvas");x(this,"ctx");x(this,"fontSize",200);x(this,"fontFamily","微软雅黑");x(this,"color","pink");x(this,"gap",3);x(this,"alphaThreshold",30);x(this,"w",0);x(this,"h",0);let{canvas:t,ctx:s,fontSize:e,fontFamily:i,color:l,gap:o,alphaThreshold:u}=n;this.canvas=t,this.ctx=s??t.getContext("2d"),e&&(this.fontSize=e),i&&(this.fontFamily=i),l&&(this.color=l),o!=null&&(this.gap=o),u!=null&&(this.alphaThreshold=u),this.w=t.width,this.h=t.height}setSize(n){this.w=n.width,this.h=n.height}_measureText(n){let{ctx:t,fontSize:s,fontFamily:e,color:i,w:l,h:o}=this;t.save(),Object.assign(t,{font:`${s}px ${e}`,fillStyle:i,textBaseline:"bottom"});let u=t.measureText(n),{width:r,actualBoundingBoxAscent:h,actualBoundingBoxDescent:c}=u,f=~~(Math.abs(h)+Math.abs(c));r=~~r,t.fillText(n,0,f);let m=t.getImageData(0,0,r,f).data;return t.clearRect(0,0,l,o),t.restore(),{data:m,width:r,height:f}}getParticles(n){let{data:t,width:s,height:e}=this._measureText(n),{gap:i,alphaThreshold:l,w:o,h:u}=this,r=[],h=[];for(let c=0;c<s;c+=i)for(let f=0;f<e;f+=i){let m=f*s+c,v=t[m*4+0],p=t[m*4+1],y=t[m*4+2],b=t[m*4+3];if(b<=l)continue;let{signal:d,resolve:_}=Zn();r.push(d);let g=Jn({x:c,y:f},ne({x:s/2,y:e/2},{x:o/2,y:u/2}));h.push({tx:g.x,ty:g.y,color:Qn(v,p,y,b),onDone:_})}return{particles:h,done:Promise.all(r)}}}const pt=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n,s=O(),e=O("");let i,l=[],o=3,u="#f00",r=30,h=100,c=1,f=.1,m=.1,v=innerWidth,p=innerHeight,y=yn(()=>new ht({r:c,x:R(0,v),y:R(0,p),fx:.1,fy:.1})),b="hello world";function d(g,w){let j=i.getParticles(g);return l=y(j.particles.length).map(I=>(I.done=!1,w&&(I.x=R(0,v),I.y=R(0,p)),I)),l.forEach((I,S)=>Object.assign(I,j.particles[S])),j.done}function _(){e.value&&(b=e.value,d(b,!0))}return N(()=>{let g=s.value;const w=g.getContext("2d");Object.assign(g,{width:v,height:p}),i=new mt({canvas:g,ctx:w,gap:o,alphaThreshold:r,color:u}),E({调整文字颜色:{value:[u],isColor:!0,onFinishChange(S){i.color=S,d(b,!0)}},采样alpha过滤阈值:{value:[r,0,100,1],onFinishChange(S){i.alphaThreshold=S,d(b,!0)}},采样间隔调整:{value:[o,0,20,1],onFinishChange(S){i.gap=S,d(b,!0)}},点大小调整:{value:[c,1,20,1],onFinishChange(S){c=S,y.update(L=>L.r=S),d(b,!0)}},x方向缓动因子调整:{value:[f,.01,1,.01],onFinishChange(S){f=S,y.update(L=>L.fx=S),d(b,!0)}},y方向缓动因子调整:{value:[m,.01,1,.01],onFinishChange(S){m=S,y.update(L=>L.fy=S),d(b,!0)}},字体大小调整:{value:[h,50,340,10],onFinishChange(S){h=S,i.fontSize=S,d(b,!0)}},查看源码(){t("check-source")}}),d(b);const j=q(()=>{w.clearRect(0,0,v,p),l.forEach(S=>{S.render(w),S.update()})}),I=M(window,"resize",()=>{v=innerWidth,p=innerHeight,g.width=v,g.height=p,i.setSize({width:v,height:p})});z(()=>{I(),j()})}),(g,w)=>{const j=kn;return C(),T(V,null,[$("canvas",{ref_key:"canvasRef",ref:s},null,512),D(j,{class:"input",modelValue:G(e),"onUpdate:modelValue":w[0]||(w[0]=I=>gn(e)?e.value=I:null),placeholder:"请输入内容",size:"large",onKeyup:Cn(_,["enter"])},null,8,["modelValue"])],64)}}}),ft=P(pt,[["__scopeId","data-v-ab05e1fd"]]),gt=`import { iterateEaseFromTo, looseEqual } from '@thing772/utils'

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
`,vt=`import { getSignal, ptOffset, getMovePt, rgb } from '@thing772/utils'
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
`,yt="/demo/assets/imgs/display-DOJbIvru.png",xt={codes:[{name:"index.vue",code:dt,lang:"js"},{name:"textParticle.ts",code:vt,lang:"ts"},{name:"particle.ts",code:gt,lang:"ts"}],component:ft,display:yt,title:"文字粒子化",descriptions:""},bt=`<template>
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
`,_t=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let s=100,e=20,i=10,l=7;E({小球个数:{value:[s,1,1e3,10],onFinishChange(h){s=h,r.setBallNum(h)}},小球半径上限:{value:[e,4,100,1],onFinishChange(h){e=h,r.updateBalls(c=>{c.r=R(4,h)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(h){i=h,r.updateBalls(c=>{c.vx=R(1,h)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(h){l=h,r.updateBalls(c=>{c.vy=R(1,h)})}},开始(){o&&o(),o=r.start()},查看源码(){t("check-source")}});let o;const u=O();let r;return N(()=>{let h=u.value,c=innerWidth,f=innerHeight;Object.assign(h,{width:c,height:f}),r=xn({canvas:h,ballsNum:s,createBallFac:()=>new U({x:R(10,c-10),y:R(10,f-10),r:R(1,e),vx:R(1,i),vy:R(1,l),styleOptions:{fillStyle:W()}})});const m=M(window,"resize",()=>{c=innerWidth,f=innerHeight,r.setSize({width:c,height:f})},{immediate:!0});r.render(),z(()=>{m(),o&&o()})}),(h,c)=>(C(),T("canvas",{ref_key:"canvasRef",ref:u},null,512))}}),wt="/demo/assets/imgs/display-BpUGJlnU.png",Rt={codes:[{name:"index.vue",code:bt,lang:"js"},{name:"wander-balls.ts",code:vn,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:_t,display:wt,title:"矩形区域内飘荡的小球",descriptions:""},St=`<template>
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
`,Bt={class:"container"},Ct=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n,{obj:s}=E({模糊自身:{value:[!1],onChange(o){e.value=o}},模糊背景:{value:[!1],onChange(o){i.value=o}},查看源码(){t("check-source")}}),e=O(s.模糊自身),i=O(s.模糊背景),l=fn(()=>["el2",{"blur-self":e.value,"blur-backdrop":i.value}]);return(o,u)=>(C(),T("div",Bt,[u[0]||(u[0]=$("div",{class:"el1"}," 财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人， 较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻） ",-1)),$("div",{class:sn(G(l))}," 财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。 ",2)]))}}),kt=P(Ct,[["__scopeId","data-v-bce03b61"]]),jt="/demo/assets/imgs/display-C7z4HTpE.png",Ot={codes:[{name:"index.vue",code:St,lang:"js"}],component:kt,display:jt,title:"css模糊效果",descriptions:""},Tt=`<template>
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
`,It=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let{obj:s}=E({"添加box-shadow":{value:[!1],onChange(u){e.value=u}},添加圆角:{value:[!1],onChange(u){i.value=u}},"添加filter:drop-shadow":{value:[!1],onChange(u){l.value=u}},查看源码(){t("check-source")}});const e=O(s["添加box-shadow"]),i=O(s.添加圆角),l=O(s["添加filter:drop-shadow"]),o=fn(()=>["container",{"has-shadow-box":e.value,"round-border":i.value,filter:l.value}]);return(u,r)=>(C(),T("div",{class:sn(G(o))},r[0]||(r[0]=[un(" 测试文本 "),$("div",{class:"circle"}," 测试文本2 ",-1)]),2))}}),Ft=P(It,[["__scopeId","data-v-8a62668d"]]),Et="/demo/assets/imgs/display-CvX0ByRG.png",At={codes:[{name:"index.vue",code:Tt,lang:"js"}],component:Ft,display:Et,title:"css box阴影效果",descriptions:""},Dt=`<template>
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
`;function $t(a){const{data:n=[],getX:t,getY:s,width:e=200,height:i=200,margin:l=[],color:o={},sortY:u=0,xAxis:r={},yAxis:h={},yLegend:c={},hideXTicks:f}=a,[m=60,v=0,p=30,y=30]=l;let b,d;const _=ee("svg").attr("width",e).attr("height",i).attr("viewBox",[0,0,e,i]).style("background-color",o.bg||""),g=_.append("g"),w=_.append("g").attr("transform",`translate(0,${i-p})`),j=_.append("g").attr("transform",`translate(${y},0)`),I=S=>{const L=k=>{if(b=ae().range([y,e-v]),rn(a.xScale))for(let[B,H]of Object.entries(a.xScale))b[B](H);else b.padding(.2);u>0?b.domain(ie(k,([B])=>(u==1?1:-1)*s(B),t)):b.domain(k.map(t)),d=le().domain([0,oe(k,s)]).range([i-p,m])},J=k=>{k.attr("x",0).attr("y",0).attr("width",b.bandwidth()).attr("height",B=>d(0)-d(s(B))).attr("fill",o.bar||"#409eff")},Q=k=>{k.text(B=>B.value).attr("text-anchor","middle").attr("x",b.bandwidth()/2).attr("y",-4)};L(S),g.selectAll("g").data(S).join(k=>k.append("g").attr("transform",B=>`translate(${b(t(B))},${d(s(B))})`).call(B=>{J(B.append("rect")),Q(B.append("text"))}),k=>(J(k.select("rect")),Q(k.select("text")),k)).attr("transform",k=>`translate(${b(t(k))},${d(s(k))})`),w.call(k=>{let B=te(b);B.tickSizeOuter(0);for(const[H,X]of Object.entries(r))B[H](X);B(k)}).call(k=>{f&&k.selectAll(".tick").remove()}),j.call(k=>{let B=se(d);for(const[H,X]of Object.entries(h))B[H](X);B(k)}).call(k=>k.select(".domain").remove()).call(k=>{if(c.text){let B=k.append("text").attr("text-anchor","middle").attr("x",0).attr("y",20);for(const[H,X]of Object.entries(c))H=="text"?B[H](X):B.attr(H,X)}})};return I(n),{svg:_.node(),update:I}}function*zt(a,n){an(n)||(n=mn),n=n;for(let t=1;t<a.length;t++)for(let s=0;s<a.length-t;s++)n(a[s])>n(a[s+1])&&(tn(a,s,s+1),yield[...a])}function*Mt(a,n){an(n)||(n=mn),n=n,a=[...a];for(let t=0;t<a.length-1;t++){let s=0;for(let e=0;e<a.length-t;e++)n(a[e])>n(a[s])&&(s=e);tn(a,s,a.length-t-1),yield[...a]}}function*Nt(a,n){an(n)||(n=mn),a=[...a],n=n;for(let t=0;t<a.length-1;t++)if(n(a[t])>n(a[t+1])){tn(a,t,t+1),yield[...a];let s=t;for(;s>0&&!(n(a[s])>=n(a[s-1]));)tn(a,s,s-1),yield[...a],s--}}function*Pt(a,n){an(n)||(n=mn);function*t(s,e){if(n=n,s==e)return;let i=Math.floor((s+e)/2);yield*t(s,i),yield*t(i+1,e);const l=o=>a=[...a.slice(0,s),...o,...a.slice(e+1)];if(!(n(a[i])<=n(a[i+1]))){if(n(a[e])<=n(a[s])){yield l([...a.slice(i+1,e+1),...a.slice(s,i+1)]);return}for(let o=1;i+o<=e;o++){let u=i+o;for(;u>s&&!(n(a[u])>=n(a[u-1]));)tn(a,u,u-1),u--,yield[...a]}}}yield*t(0,a.length-1)}const Lt={class:"box"},Wt=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n,s=O(),e=[{label:"冒泡排序",value:zt},{label:"选择排序",value:Mt},{label:"插入排序",value:Nt},{label:"归并排序",value:Pt}],i=e[0],l=O(i.value);let o,u=innerWidth-100,r=innerHeight-100,h=!1,c=20,f=Rn([]),m=Rn();function v(){f.value=Le(c).map((_,g)=>({id:g,value:_})),h=!1,m.value=l.value(f.value,_=>_.value)}on(l,()=>{m.value=l.value(f.value,_=>_.value)});function p(){let{value:_,done:g}=m.value.next();if(h=g,g){hn({showClose:!0,message:"已经排序完毕",type:"success",grouping:!0});return}else f.value=_}let y=O(0);function b(){y.value==0&&((!m.value||h)&&v(),y.value=setInterval(()=>{if(h){clearInterval(y.value),y.value=0;return}p()},d))}on(()=>f.value,_=>{_.length>0?(o||(o=$t({width:u,height:r,getX:g=>g.id,getY:g=>g.value}),s.value.appendChild(o.svg)),o.update(_)):o&&(s.value.removeChild(o.svg),o=null)});let d=50;return N(()=>{v();let{helpers:{getAllControllers:_}}=E({选择算法:{value:[i.label,e.map(w=>w.label)],onChange(w){let j=e.find(I=>I.label==w);l.value=j.value}},随机数个数:{value:[c,10,100,1],onFinishChange(w){c=w}},自动开始时间间隔:{value:[d,16,100,5],onFinishChange(w){d=w}},生成随机数:{value:[function(){v()}],disable:y.value!=0},排序下一步:{value:[function(){p()}],disable:!m.value||y.value!=0},自动开始(){b()},查看源码(){t("check-source")}}),g=on(y,w=>{_().forEach(j=>{j.property!="查看源码"&&j.disable(w>0)})});z(()=>{g(),clearInterval(y.value)})}),(_,g)=>(C(),T("div",Lt,[$("div",{ref_key:"node",ref:s},null,512)]))}}),Gt=P(Wt,[["__scopeId","data-v-698136a6"]]),Ht=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,Ut=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,Vt=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,qt=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,Xt="/demo/assets/imgs/display-B3luB7Uf.png",Yt={codes:[{name:"index.vue",code:Dt,lang:"js"},{name:"bubble.ts",code:Ht,lang:"ts"},{name:"selection.ts",code:Ut,lang:"ts"},{name:"insertion.ts",code:Vt,lang:"ts"},{name:"merge.ts",code:qt,lang:"ts"}],component:Gt,display:Xt,title:"排序算法可视化",descriptions:""},Kt=`<template>
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
`,Zt=`import { easeOutCubic } from './ease'
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
`;function Jt(a){return 1-Math.pow(1-a,3)}var nn=(a=>(a[a.NORMAL=0]="NORMAL",a[a.REVERSE=1]="REVERSE",a))(nn||{});function Qt(a,n){let{startIndex:t=0,speed:s=1,onDone:e,onProcessing:i}=n,l=t,o,u;const r=v=>{rn(v)&&(u=Math.ceil(800/v))},h=()=>{o&&(cancelAnimationFrame(o),o=0)};r(s);function c(v){h();let{direction:p,speed:y,startIndex:b}=v,d;r(y),rn(b)&&(l=b);const _=g=>{d||(d=g),g-d>=u&&(p==0?l=(l+1)%a.length:l=l-1>=0?l-1:a.length-1,i(l),d=g),o=requestAnimationFrame(_)};o||(o=requestAnimationFrame(_))}function f(){h()}function m(v){h();let{loopTimes:p=5,targetIndex:y=a.length-1,direction:b,speed:d,startIndex:_}=v||{};p=Math.max(Math.ceil(Number(p)),1),y=Math.max(0,Math.min(Number(y),a.length-1)),r(d),rn(_)&&(l=_);let g=l,w,j=y-g;b==0?w=g+p*a.length+(j>=0?j:a.length+j):w=g-p*a.length+(j<=0?j:-a.length+j);let I=Math.abs(w-g)*u,S;const L=J=>{S||(S=J);let Q=Math.min(1,(J-S)/I),B=(Math.ceil(Jt(Q)*(w-g))+g)%a.length;if(B<0&&(B+=a.length),l!=B&&(l=B,i(l)),Q==1){e(l),o=0;return}o=requestAnimationFrame(L)};o=requestAnimationFrame(L)}return{wander:c,stop:f,draw:m}}const ns={class:"box"},es={style:{display:"flex"}},ts=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n,s=O(1),e=[...Array(10)],i={targetIndex:2,loopTimes:2,direction:nn.NORMAL,speed:5},{wander:l,stop:o,draw:u}=Qt(e,{speed:i.speed,startIndex:s.value,onProcessing:m=>{s.value=m},onDone(m){hn({showClose:!0,message:"已经抽奖完毕",type:"success",grouping:!0}),s.value=m}});function r(){l({...i})}function h(){u({...i})}z(()=>{o(),c&&clearTimeout(c)});let c;function f(){r(),c=setTimeout(()=>{i.targetIndex=On(e),h(),c=0},2500)}return E({设定巡航速度:{value:[i.speed,1,10,1],onFinishChange(m){i.speed=m}},设定最终选中项索引:{value:[i.targetIndex,0,e.length-1,1],onFinishChange(m){i.targetIndex=m}},轮转次数:{value:[i.loopTimes,2,20,1],onFinishChange(m){i.loopTimes=m}},轮转方向:{value:[i.direction==nn.NORMAL?"正向":"负向",["正向","负向"]],onChange(m){i.direction=m=="正向"?nn.NORMAL:nn.REVERSE}},开始抽奖:h,开始巡航:r,停止:o,模拟接口返回预制数据:f,查看源码(){t("check-source")}}),(m,v)=>{const p=jn;return C(),T("div",ns,[D(p,{class:"demo-card",shadow:"always"},{default:A(()=>[$("div",es,[(C(),T(V,null,en(e,(y,b)=>$("div",{class:sn(["block",G(s)==b?"selected":""])},cn(b),3)),64))])]),_:1})])}}}),ss=P(ts,[["__scopeId","data-v-2fa66777"]]),as="/demo/assets/imgs/display-DiF1Sfat.png",is={codes:[{name:"index.vue",code:Kt,lang:"js"},{name:"draw-price.ts",code:Zt,lang:"ts"}],component:ss,display:as,title:"抽奖",descriptions:""},ls=`<template>
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
`,os="/demo/assets/imgs/018194d9aac11f975e17b274fe4a78af1463731957-BlWzWTpc.png",rs="/demo/assets/imgs/10251358673700483-Bf69morh.jpg",cs="/demo/assets/imgs/10251358673922612-wa-5hia3.jpg",us="/demo/assets/imgs/10251381214893821-DZ0tyfKl.jpg",ds="/demo/assets/imgs/10251381215028477-DT0oxPDL.jpg",hs="/demo/assets/imgs/10251381215091916-34MSuKPK.jpg",ms="/demo/assets/imgs/10251381215152314-ZOViud5b.jpg",ps="/demo/assets/imgs/10251381215208971-BnTSlzDn.jpg",fs="/demo/assets/imgs/10251381215487222-CyoYfFWR.jpg",gs="/demo/assets/imgs/10251381215991717-jivRh7vw.jpg",vs="/demo/assets/imgs/10251381216212847-C6d5iI8I.jpg",ys="/demo/assets/imgs/3a5950fc2408a7f8136de8704e1819c21463732075-DT6cAkAt.png",xs="/demo/assets/imgs/48d780d33eaf46a5646376b814b8efa71463731556-CGACL27Z.png",bs="/demo/assets/imgs/554e21161de34506e9cb1ecbcd85716d1463732343-LZH7KjnQ.png",_s="/demo/assets/imgs/884f9b653e317cc514890954b2e35be81463731323-DvATjqjX.png",ws="/demo/assets/imgs/8a116da0668edebd82af16ecf7e75ace1590566316-Cl-PTpZA.jpg",Rs="/demo/assets/imgs/928d6ec50975da022bda97a1ab8f04c81463731839-d_LHiOEG.png",Ss="/demo/assets/imgs/a748932756b48bd46a8fd17df4579dea1463732104-DlsyWN-A.png",Bs="/demo/assets/imgs/b5978ead603dcdc66704e721960debe31590565987-4RsIwXgW.jpg",Cs="/demo/assets/imgs/c06f07de280d4edebf801eef4b142c721463731804-DD1ps6p3.png",ks="/demo/assets/imgs/ceb8c078cf6b410d7def183870fe584d1590566557-9BfKn2sf.jpg",js="/demo/assets/imgs/ea5871bc33e131b497b9bb273890e8ae1463731875-WWF6WmyZ.png",Os="/demo/assets/imgs/f29af13446f1feed47dcfd299ccaa23c1463732001-DrhlCMaO.png",Ts="/demo/assets/imgs/fef4eadd191c3461054ca60cde8576db1590566398-Bn18syhQ.jpg",Is={class:"container"},Fs=["src"],Es=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let s=[...Object.values([os,rs,cs,us,ds,hs,ms,ps,fs,gs,vs,ys,xs,bs,_s,ws,Rs,Ss,Bs,Cs,ks,js,Os,Ts])];s=O(We(s,Math.ceil(s.length/5))),E({查看源码(){t("check-source")}});function i(o){o.target.classList.add("level-up")}function l(o){o.target.classList.remove("level-up")}return(o,u)=>(C(),T("div",Is,[(C(!0),T(V,null,en(G(s),(r,h)=>(C(),T("div",{class:sn(["hive-row",h%2==1?"odd":""]),onMouseenter:i,onMouseleave:l},[(C(!0),T(V,null,en(r,c=>(C(),T("img",{class:"hive-item",src:c,alt:""},null,8,Fs))),256))],34))),256))]))}}),As=P(Es,[["__scopeId","data-v-93867a89"]]),Ds="/demo/assets/imgs/display-BVEemRNY.png",$s={codes:[{name:"index.vue",code:ls,lang:"js"}],component:As,display:Ds,title:"蜂巢图片",descriptions:""},zs=`<template>
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
`,Ms=`import { isFunc } from '@/utils/utils'

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
`,Ns=`import type { SceneInstance, SceneObj } from "./scene"
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
`;class Ps{constructor(n){x(this,"canvas");x(this,"ctx");x(this,"width",0);x(this,"height",0);x(this,"background");x(this,"_t0",0);x(this,"_t1",0);x(this,"_dt",0);x(this,"_objects",[]);x(this,"_raf",0);let{width:t,height:s,canvas:e,background:i}=n;this.canvas=e,this.ctx=e.getContext("2d"),this.background=i??"#000",this.setSize(t,s)}setSize(n,t){this.canvas.width=n,this.canvas.height=t,this.width=n,this.height=t}_render(){let{width:n,height:t,ctx:s,background:e}=this;s.fillStyle=e,s.fillRect(0,0,n,t);for(let i of[...this._objects])i.render(this._dt)}_updateTime(n){this._t0==0&&(this._t0=n),this._dt=n-this._t0}run(n){const t=s=>{this._updateTime(s),an(n)&&n(this._dt),this._render(),this._raf=requestAnimationFrame(t)};this._raf=requestAnimationFrame(t)}addObj(...n){return n.forEach(t=>{this._objects.find(s=>s==t)||(this._objects.push(t),t.scene=this)}),this}removeObj(n){let t=this._objects.findIndex(s=>s==n);return t!=-1&&(this._objects.splice(t,1),n.scene==this&&(n.scene=null)),this}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._t0=0,this._t1=0,this._dt=0)}}const Ls=[...Array(26)].map((a,n)=>["a","A"].map(t=>String.fromCharCode(t.charCodeAt(0)+n))).flat();function Ws(){return[...Array(Y(8)+2)].map(()=>Tn(Ls)).join("")}class Gs{constructor(n){x(this,"_x");x(this,"_y");x(this,"_text");x(this,"_opacity");x(this,"_onDismiss");x(this,"scene");x(this,"_opacityDecay");x(this,"_rawOptions");x(this,"_yStep");x(this,"_font","20px serif");x(this,"_fillStyle","red");let{x:t,y:s,text:e,opacity:i,opacityDecay:l,onDismiss:o,yStep:u}=n;this._x=t,this._y=s,this._text=e,this._opacity=i,this._onDismiss=o,this._opacityDecay=l??.01,this._rawOptions={...n},this._yStep=u??4}setFont(n,t){return this._font=n,this._fillStyle=t,this}render(n){let{_text:t,_x:s,_y:e,_opacityDecay:i,_yStep:l,_fillStyle:o,_font:u}=this,{ctx:r,height:h}=this.scene,c={font:r.font,fillStyle:r.fillStyle,globalAlpha:r.globalAlpha};this._opacity-=typeof i=="number"?i:i(n),this._opacity<0&&(this._opacity=0),r.font=u,r.fillStyle=o,r.globalAlpha=this._opacity;let f=0,m=e+(typeof l=="number"?l:l(n));for(let v of t){let p=r.measureText(v);const{actualBoundingBoxAscent:y,actualBoundingBoxDescent:b}=p;let d=b+y;r.fillText(v,s,m-f),f+=d+10}this._y=m,Object.assign(r,c),(this._opacity==0||m-f>h)&&this._onDismiss(this)}}class Hs{constructor(n){x(this,"scene");x(this,"num",0);x(this,"maxNum",100);x(this,"colors",["brown","red","green","yellow","chocolate","pink","burlywood","chartreuse","cyan"]);let{scene:t,maxNum:s}=n;this.scene=t,s&&(this.maxNum=s)}addText(){if(this.num<this.maxNum){this.num++;let{width:n,height:t}=this.scene,s=new Gs({text:Ws(),x:Y(n),y:Y(t),yStep:Y(10)+2,opacity:+Math.min(1,Math.random()+.2).toPrecision(2),opacityDecay:.01,onDismiss:e=>{this.scene.removeObj(e),this.num--}}).setFont(`${Y(15)+14}px serif`,Tn(this.colors));this.scene.addObj(s)}}start(){this.scene.run(n=>{this.addText()})}stop(){this.scene.stop()}}function Us(a,n,t){a.addEventListener("resize",n),z(()=>{a.removeEventListener("resize",n)})}const Vs={class:"box"},qs=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=O(),s=n;return N(()=>{let e=new Ps({width:innerWidth,height:innerHeight,canvas:t.value}),{obj:i}=E({文字串数量:{value:[10,10,200,10],onChange(o){l.maxNum=o}},查看代码:function(){s("check-source")}}),l=new Hs({scene:e,maxNum:i.文字串数量});l.start(),Us(window,()=>{e.setSize(innerWidth,innerHeight)}),z(()=>{l.stop()})}),(e,i)=>(C(),T("div",Vs,[$("canvas",{ref_key:"canvas",ref:t},null,512)]))}}),Xs=P(qs,[["__scopeId","data-v-4010e3a7"]]),Ys="/demo/assets/imgs/display-DwV-CRAI.png",Ks={codes:[{name:"index.vue",code:zs,lang:"js"},{name:"scene.ts",code:Ms,lang:"ts"},{name:"textRain.ts",code:Ns,lang:"ts"}],component:Xs,display:Ys,title:"文字雨",descriptions:""};let ln;function In(){return ln||(ln=Object.assign({"./demo/canvas/audio-wave/config.ts":De,"./demo/canvas/chasing/config.ts":Ne,"./demo/canvas/connect-balls/config.ts":Ue,"./demo/canvas/coord/config.ts":Ke,"./demo/canvas/eyeballs/config.ts":nt,"./demo/canvas/faliling-balls/config.ts":lt,"./demo/canvas/friction/config.ts":ut,"./demo/canvas/text-particle/config.ts":xt,"./demo/canvas/wander-balls/config.ts":Rt,"./demo/css/blur/config.ts":Ot,"./demo/css/shadow/config.ts":At,"./demo/d3/sort/config.ts":Yt,"./demo/draw-price/config.ts":is,"./demo/hive/config.ts":$s,"./demo/text-rain/config.ts":Ks}),ln)}let Fn=[];function Zs(){const a=In();for(let n in a){let{codes:t,component:s,title:e}=a[n],i=function(){return Sn(Ce,{codes:t},({checkSource:u})=>Sn(s,{onCheckSource:()=>{u()}}))};i.displayName=`Demo(${n})`;let l=n.replace(/.*\/demo\//,"").replace("/config.ts","").split("/").join("-");a[n].routeName=l,Fn.push({path:l,name:l,component:i,meta:{title:e}})}}Zs();const Js={path:"/demo",children:Fn},Qs={class:"common-layout"},na=F({__name:"index",setup(a){let n=Object.values(In());return(t,s)=>{const e=de,i=he,l=jn,o=ue,u=ce,r=re,h=me;return C(),T("div",Qs,[D(h,{class:"container"},{default:A(()=>[D(r,{class:"main"},{default:A(()=>[D(u,{class:"row",gutter:20},{default:A(()=>[(C(!0),T(V,null,en(G(n),c=>(C(),pn(o,{key:c.routeName,span:4},{default:A(()=>[D(l,{class:"demo-card","body-style":{padding:"0px"},shadow:"always",onClick:f=>t.$router.push({name:c.routeName})},{footer:A(()=>[D(i,{tag:"p"},{default:A(()=>[un(cn(c.title),1)]),_:2},1024),D(i,{tag:"p","line-clamp":2},{default:A(()=>[un(cn(c.descriptions||"暂无描述"),1)]),_:2},1024)]),default:A(()=>[D(e,{class:"image",src:c.display,fit:"cover"},null,8,["src"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}}}),ea=P(na,[["__scopeId","data-v-fe2c6a64"]]),En=pe({history:fe("/demo/"),routes:[{path:"/",component:ea},Js]});En.beforeEach((a,n,t)=>{document.title=a.meta.title??"my demos",t()});const bn=ge(be);bn.use(ve());bn.use(En);bn.mount("#app");
