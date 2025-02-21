var An=Object.defineProperty;var Dn=(a,n,t)=>n in a?An(a,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[n]=t;var y=(a,n,t)=>Dn(a,typeof n!="symbol"?n+"":n,t);import{r as $n,c as pn,o as C,d as F,a as O,b as mn,e as N,P as zn,f as T,g as $,t as cn,n as sn,u as W,h as D,i as Mn,w as A,E as Nn,F as V,j as en,k as Pn,l as Ln,m as un,p as fn,q as Wn,s as q,v as Gn,x as Hn,y as z,z as M,A as U,B as K,C as Un,D as _n,G as Vn,H as R,I as Sn,J as qn,K as wn,L as Cn,M as kn,N as Xn,O as Yn,Q as Kn,R as dn,S as on,T as gn,U as Zn,V as Jn,W as Qn,X as ne,Y as ee,Z as te,_ as se,$ as ae,a0 as ie,a1 as le,a2 as oe,a3 as Rn,a4 as jn,a5 as Bn,a6 as re,a7 as ce,a8 as ue,a9 as de,aa as he,ab as pe,ac as me,ad as fe,ae as ge,af as ve}from"./vendor-DQSMCGTJ.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=t(e);fetch(e.href,i)}})();const P=(a,n)=>{const t=a.__vccOpts||a;for(const[s,e]of n)t[s]=e;return t},xe={};function ye(a,n){const t=$n("RouterView");return C(),pn(t)}const be=P(xe,[["render",ye]]),_e={class:"pre"},we=F({__name:"hilight",props:{code:{},lang:{}},setup(a){const n=a,t=O(),s=mn(()=>n.lang?`lang-${n.lang}`:"auto");return N(()=>{zn.highlightElement(t.value)}),(e,i)=>(C(),T("pre",_e,[$("code",{class:sn(W(s)),ref_key:"codeRef",ref:t},cn(e.code),3)]))}}),Re={class:"container"},Be={class:"dialog-footer"},Se=F({__name:"codeDemo",props:{codes:{}},setup(a){const n=O(!1);function t(){n.value=!0}return(s,e)=>{const i=Pn,o=Nn,l=Ln,u=Wn;return C(),T(V,null,[$("div",Re,[Mn(s.$slots,"default",{checkSource:t},void 0,!0)]),D(u,{modelValue:W(n),"onUpdate:modelValue":e[1]||(e[1]=c=>fn(n)?n.value=c:null),title:"",width:"50vw",top:"50px"},{footer:A(()=>[$("span",Be,[D(l,{type:"primary",onClick:e[0]||(e[0]=c=>n.value=!1)},{default:A(()=>e[2]||(e[2]=[un("关闭")])),_:1})])]),default:A(()=>[D(o,{type:"border-card"},{default:A(()=>[(C(!0),T(V,null,en(s.codes,c=>(C(),pn(i,{label:c.name,key:c.name,lazy:""},{default:A(()=>[D(we,{code:c.code,lang:c.lang},null,8,["code","lang"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"])],64)}}}),Ce=P(Se,[["__scopeId","data-v-65455990"]]),ke=`<template>
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
`;function Oe(a,n){const t=new AudioContext;let s=t.createMediaElementSource(a);const e=t.createAnalyser();s.connect(e),e.connect(t.destination),e.fftSize=512;const i=e.frequencyBinCount,o=new Uint8Array(i),l=n.getContext("2d");let u=n.width,c=n.height;function d(){e.getByteTimeDomainData(o),l.save(),Object.assign(l,{fillStyle:"red"});const h=u/i;for(let v=0;v<i;v+=4){let f=o[v]/255*c;l.fillRect(h*v,c-f,h,f)}l.fill(),l.restore()}function r(h,v){u=n.width=h,c=n.height=v}function m(){return q(()=>{l.clearRect(0,0,u,c),d()})}return{setSize:r,start:m}}const Te="/demo/assets/media/%E5%8C%96%E5%87%A1-DF7X08YA.ogg";function E(a){if(!a.title){let t=Gn().meta.title;t&&(a.title=t)}let n=Hn(a);return z(()=>{n.gui.destroy()}),n}const Ie=["src"],Fe=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;E({查看源码(){t("check-source")}});const s=O(),e=O();return N(()=>{let i;e.value.onplay=()=>{const{start:o,setSize:l}=Oe(e.value,s.value);i=M(window,"resize",()=>{l(innerWidth,innerHeight)},{immediate:!0}),o()},z(()=>{i&&i()})}),(i,o)=>(C(),T(V,null,[$("audio",{ref_key:"audioRef",ref:e,src:W(Te),id:"audio",controls:""},null,8,Ie),$("canvas",{ref_key:"canvasRef",ref:s},null,512)],64))}}),Ee=P(Fe,[["__scopeId","data-v-24237bd0"]]),Ae="/demo/assets/imgs/display-_9yby0tz.png",De={codes:[{name:"index.vue",code:ke,lang:"js"},{name:"audio-wave",code:je,lang:"ts"}],component:Ee,display:Ae,title:"音频波形",descriptions:""},$e=`<template>
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
`;class H{constructor(n){y(this,"x",0);y(this,"y",0);y(this,"r",0);y(this,"vx",0);y(this,"vy",0);y(this,"ax",0);y(this,"ay",0);y(this,"styleOptions",{});n&&this.set(n)}reset(n){return Object.assign(this,{x:0,y:0,r:0,vx:0,vy:0,ax:0,ay:0,...n?{styleOptions:{}}:null})}set(n){return Object.assign(this,n)}update(){return this.vy+=this.ay,this.y+=this.vy,this.vx+=this.ax,this.x+=this.vx,this}render(n){n.save();let{x:t,y:s,r:e,styleOptions:i}=this;Object.assign(n,i),n.beginPath(),n.arc(t,s,e,0,Math.PI*2),i.fillStyle&&n.fill(),i.strokeStyle&&n.stroke(),n.restore()}}const ze=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;E({查看源码(){t("check-source")}});const s=O();return N(()=>{let e=s.value,i,o,l,u=e.getContext("2d");const c=M(window,"resize",()=>{Object.assign(e,{width:i=innerWidth,height:o=innerHeight})},{immediate:!0}),d=M(e,"mousemove",function(m){l={x:m.offsetX,y:m.offsetY}});let r=new H({r:100,x:i/2,y:o/2,styleOptions:{fillStyle:U()}});q(()=>{u.clearRect(0,0,i,o),l&&(r.x=K(r.x,l.x,.05),r.y=K(r.y,l.y,.05)),r.render(u)}),z(()=>{c(),d()})}),(e,i)=>(C(),T("canvas",{ref_key:"canvasRef",ref:s},null,512))}}),Me="/demo/assets/imgs/display-IdleEMXt.png",Ne={codes:[{name:"index.vue",code:$e,lang:"js"},{name:"ball.ts",code:Z,lang:"ts"}],component:ze,display:Me,title:"缓动追逐",descriptions:""},Pe=`<template>
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
`;function On(a){return Math.floor(Math.random()*a.length)}function Tn(a){return a[On(a)]}function Le(a,n=1e3){let t=[];for(let s=0;s<a;s++)t.push(Y(n));return t}function Y(a=1e3){return Math.ceil(Math.random()*a)}function We(a,n){return a.reduce((t,s,e)=>(e%n==0&&t.push(a.slice(e,e+n)),t),[])}function tn(a,n,t){let s=a[n];a[n]=a[t],a[t]=s}function rn(a){return a!=null}function an(a){return typeof a=="function"}function hn(a){return a}function xn(a){let n=[];function t(s){let e=s-n.length;return e>0?n.push(...Un(a,e)):e<0&&(n=n.slice(0,e)),n}return t.update=function(s){n.forEach(e=>s(e))},t}function yn(a){let{canvas:n,ballsNum:t,createBallFac:s,onBallUpdate:e,speedDecay:i,preRender:o,postRender:l}=a,u=n.width,c=n.height;const d=n.getContext("2d");let r=[];const m=xn(s);function h(g){r=m(g),f()}function v(g){Object.assign(n,g),u=g.width,c=g.height,f()}function f(g){r.forEach(_=>{_n(g)&&g(_),_.render(d)})}function x(){d.clearRect(0,0,u,c);for(let g of r)_n(e)?e(g):(g.update(),Vn(g,{wBox:[0,u],hBox:[0,c],speedDecay:i}));o==null||o(r,d),r.forEach(g=>g.render(d)),l==null||l(r,d)}function b(g){d.clearRect(0,0,u,c),f(g)}h(t);let p;function w(){return p&&p(),p=q(()=>{x()})}return{start:w,setBallNum:h,setSize:v,render:x,updateBalls:b}}const Ge=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let s=80,e=1,i=3,o=3,l=100,u;E({小球个数:{value:[s,1,1e3,10],onFinishChange(h){s=h,r.setBallNum(h)}},小球半径上限:{value:[e,1,100,1],onFinishChange(h){e=h,r.updateBalls(v=>{v.r=R(1,h)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(h){i=h,r.updateBalls(v=>{v.vx=R(1,h)})}},小球y方向移动速度上限:{value:[o,1,15,.5],onFinishChange(h){o=h,r.updateBalls(v=>{v.vy=R(1,h)})}},小球连接范围阈值:{value:[l,50,300,1],onFinishChange(h){l=h}},查看源码(){t("check-source")}});let c;const d=O();let r,m;return N(()=>{let h=d.value,v=innerWidth,f=innerHeight;Object.assign(h,{width:v,height:f}),r=yn({canvas:h,ballsNum:s,createBallFac:()=>new H({x:R(10,v-10),y:R(10,f-10),r:R(1,e),vx:R(1,i),vy:R(1,o),styleOptions:{fillStyle:U()}}),preRender(p,w){u||(u=Sn(w,{strokeStyle:U(),lineWidth:1})),m&&(p=p.concat(m));for(let g=0;g<p.length;g++)for(let _=g+1;_<p.length;_++){let j=p[g],I=p[_];qn(j,I)<l&&u(j,I)}m&&p.pop()}});const x=M(window,"resize",()=>{v=innerWidth,f=innerHeight,r.setSize({width:v,height:f})},{immediate:!0}),b=M(h,"mousemove",p=>{m={x:p.offsetX,y:p.offsetY}},{needLog:!0});c=r.start(),z(()=>{x(),b(),c&&c()})}),(h,v)=>(C(),T("canvas",{ref_key:"canvasRef",ref:d},null,512))}}),He="/demo/assets/imgs/display-y86Fu395.png",Ue={codes:[{name:"index.vue",code:Pe,lang:"js"},{name:"wander-balls.ts",code:vn,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:Ge,display:He,title:"粒子小球连线",descriptions:""},Ve=`<template>
  <canvas ref="canvasRef"></canvas>
  <el-input class="input" v-model="fnStr" placeholder="参数:（x:x坐标，t：时间参数），输入x和t的表达式" size="large"
    @keyup.enter="onEnter"></el-input>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { rafLoop, registEvent, setupCoord } from '@thing772/utils'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

const canvasRef = ref()
let w = innerWidth, h = innerHeight, coord: ReturnType<typeof setupCoord>
let fnStr = ref(''), fn = (x: number, t: number) => Math.sin(5 * x + 0.001 * t) + Math.cos(10 * x + 0.005 * t)

function onEnter() {
  fn = new Function("x", "t", \`return \${fnStr.value}\`) as (x: number, t: number) => number
}

onMounted(() => {
  let canvas = canvasRef.value
  const ctx = canvas.getContext('2d')!

  useGui({
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
    if (typeof fn == 'function') {
      coord.draw((x: number) => fn(x, t), {
        rate: 300,
        style: {
          strokeStyle: 'red'
        },
        // label: fn.toString().replace(/ anonymous/, ''),//!todo 加上时间变动时，label会移动
      })
    }
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
`,qe=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n,s=O();let e=innerWidth,i=innerHeight,o,l=O(""),u=(d,r)=>Math.sin(5*d+.001*r)+Math.cos(10*d+.005*r);function c(){u=new Function("x","t",`return ${l.value}`)}return N(()=>{let d=s.value;const r=d.getContext("2d");E({查看源码(){t("check-source")}}),o=wn({canvas:d,ctx:r,width:e,height:i});const m=q(v=>{r.clearRect(0,0,e,i),o.setup(),typeof u=="function"&&o.draw(f=>u(f,v),{rate:300,style:{strokeStyle:"red"}})}),h=M(window,"resize",()=>{e=innerWidth,i=innerHeight,o=wn({canvas:d,ctx:r,width:e,height:i})});z(()=>{h(),m()})}),(d,r)=>{const m=kn;return C(),T(V,null,[$("canvas",{ref_key:"canvasRef",ref:s},null,512),D(m,{class:"input",modelValue:W(l),"onUpdate:modelValue":r[0]||(r[0]=h=>fn(l)?l.value=h:l=h),placeholder:"参数:（x:x坐标，t：时间参数），输入x和t的表达式",size:"large",onKeyup:Cn(c,["enter"])},null,8,["modelValue"])],64)}}}),Xe=P(qe,[["__scopeId","data-v-71e708ed"]]),Ye="/demo/assets/imgs/display-BsbAITaj.png",Ke={codes:[{name:"index.vue",code:Ve,lang:"js"}],component:Xe,display:Ye,title:"笛卡尔坐标系函数绘制",descriptions:""},Ze=`<template>
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
`,Je=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;E({查看源码(){t("check-source")}});const s=O();return N(()=>{let e=s.value,i,o,l,u=e.getContext("2d");const c=M(window,"resize",()=>{Object.assign(e,{width:i=innerWidth,height:o=innerHeight})},{immediate:!0}),d=M(e,"mousemove",function(x){l={x:x.offsetX,y:x.offsetY}});let r=[new H({r:50,x:i/2-80,y:o/2,styleOptions:{fillStyle:U()}}),new H({r:50,x:i/2+80,y:o/2,styleOptions:{fillStyle:U()}})],m=r.map(x=>new H({r:x.r/4,x:x.x,y:x.y,styleOptions:{fillStyle:U()}})),h=new H({r:200,x:i/2,y:o/2,styleOptions:{fillStyle:"#E6A23C"}}),v=Sn(u,{strokeStyle:"#fff",lineWidth:"10",lineCap:"round"}),f=.05;q(()=>{u.clearRect(0,0,i,o),h.render(u),r.forEach(x=>{x.render(u)}),m.forEach((x,b)=>{if(l){let p=x.x=K(x.x,l.x,f),w=x.y=K(x.y,l.y,f),g=r[b],_={x:g.x,y:g.y,r:g.r-10};if(!Xn(_,x)){x.x=p,x.y=w;let j=Yn(_,l);Object.assign(x,Kn(_,j,_.r-x.r))}}x.render(u)}),v({x:i/2-50,y:o/2+100},{x:i/2+50,y:o/2+100})}),z(()=>{c(),d()})}),(e,i)=>(C(),T("canvas",{ref_key:"canvasRef",ref:s},null,512))}}),Qe="/demo/assets/imgs/display-BcjSOcDf.png",nt={codes:[{name:"index.vue",code:Ze,lang:"js"},{name:"ball.ts",code:Z,lang:"ts"}],component:Je,display:Qe,title:"会动的眼球",descriptions:""},et=`<template>
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
`;function st(a){let{canvas:n,num:t,onAllStopped:s}=a;const e=n.getContext("2d");let i=n.width,o=n.height,l=[],u=!1,c=!1;const d=xn(()=>new H(r()));function r(){return{x:R(10,i-10),y:R(10,o-10),r:4,ax:0,ay:R(.1,2,!1),vx:0,vy:R(1,3),styleOptions:{fillStyle:U()},stopped:!1}}function m(p){l=d(p)}function h(){for(let p of l)p.reset().set(r());if(c=!1,!u)return b()}function v(p){Object.assign(n,p),i=p.width,o=p.height}function f(p){return p.stopped||dn(p.vy,0,1)&&dn(p.y+p.r,o,1)}function x(){if(l.length!=0){e.clearRect(0,0,i,o);for(let p of l)if(p.update(),p.y+p.r>o&&(p.y=o-p.r,p.vy*=-.7),p.render(e),f(p)&&(p.stopped=!0,l.every(f))){u=!1,c=!0;try{s==null||s()}catch(w){console.error(w)}return!1}}}m(t);function b(){if(u)return;u=!0,c&&h();let p=q(x);return()=>{u&&(u=!1,p())}}return{start:b,reset:h,setBallsNum:m,setSize:v,render:x}}const at=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let s=100;const e=O(),{helpers:{getControllerByKey:i}}=E({小球个数:{value:[s,1,1e3,10],onFinishChange(c){s=c,l.setBallsNum(c)}},开始(){let c=l.start();c&&(e.value=c)},暂停:{value:[function(){e.value()}],disable:!e.value},重置(){let c=l.reset();c&&(e.value=c)},查看源码(){t("check-source")}});on(e,c=>{i("暂停").enable(!!c)});const o=O();let l;function u(){gn({showClose:!0,message:"所有小球都停止运动了",type:"success",grouping:!0})}return N(()=>{let c=o.value;Object.assign(c,{width:innerWidth,height:innerHeight}),l=st({num:s,canvas:c,onAllStopped:u});const d=M(window,"resize",()=>{l.setSize({width:innerWidth,height:innerHeight})},{immediate:!0});l.render(),z(()=>{d(),e.value&&e.value()})}),(c,d)=>(C(),T("canvas",{ref_key:"canvasRef",ref:o},null,512))}}),it="/demo/assets/imgs/display-DOU4TeMC.png",lt={codes:[{name:"index.vue",code:et,lang:"js"},{name:"falling-balls.ts",code:tt,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:at,display:it,title:"下落的小球",descriptions:""},ot=`<template>
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
`,rt=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let s=100,e=20,i=20,o=17,l=.01;E({小球个数:{value:[s,1,1e3,10],onFinishChange(r){s=r,d.setBallNum(r)}},小球半径上限:{value:[e,4,100,1],onFinishChange(r){e=r,d.updateBalls(m=>{m.r=R(4,r)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(r){i=r,d.updateBalls(m=>{m.vx=R(1,r)})}},小球y方向移动速度上限:{value:[o,1,15,.5],onFinishChange(r){o=r,d.updateBalls(m=>{m.vy=R(1,r)})}},小球摩擦力因子:{value:[l,0,3,.1],onFinishChange(r){l=r,d.updateBalls(m=>{m.friction=R(0,r)})}},开始(){u&&u(),u=d.start()},查看源码(){t("check-source")}});let u;const c=O();let d;return N(()=>{let r=c.value,m,h;Object.assign(r,{width:m=innerWidth,height:h=innerHeight}),d=yn({canvas:r,ballsNum:s,createBallFac:()=>{let f={x:R(10,m-10),y:R(10,h-10),r:R(1,e),vx:R(1,i),vy:R(1,o),styleOptions:{fillStyle:U()},friction:R(0,l)};return new H(f)},onBallUpdate(f){f.vx>=.01&&(f.vx-=f.friction,f.x+=f.vx),f.vy>=.01&&(f.vy-=f.friction,f.y+=f.vy),f.x>m+f.r&&(f.x=-f.r),f.y>h+f.r&&(f.y=-f.r)}});const v=M(window,"resize",()=>{d.setSize({width:m=innerWidth,height:h=innerHeight})},{immediate:!0});z(()=>{v(),u&&u()})}),(r,m)=>(C(),T("canvas",{ref_key:"canvasRef",ref:c},null,512))}}),ct="/demo/assets/imgs/display-BaZn1eIe.png",ut={codes:[{name:"index.vue",code:ot,lang:"js"},{name:"wander-balls.ts",code:vn,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:rt,display:ct,title:"运动减速",descriptions:""},dt=`<template>
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
`;class ht{constructor(n){y(this,"x",0);y(this,"y",0);y(this,"tx",0);y(this,"ty",0);y(this,"color","pink");y(this,"name","");y(this,"fx",.01);y(this,"fy",.01);y(this,"onDone");y(this,"r",0);y(this,"size",0);y(this,"done",!1);Object.assign(this,n)}update(){var s;let{tx:n,ty:t}=this;if(!this.done)return this.x=K(this.x,n,this.fx),this.y=K(this.y,t,this.fy),dn(this.x,this.tx)&&dn(this.y,this.ty)&&(this.done=!0,(s=this.onDone)==null||s.call(this)),this}render(n){let{color:t,x:s,y:e,size:i,r:o}=this;n.save(),Object.assign(n,{fillStyle:t}),n.beginPath(),i>0?n.fillRect(s,e,i,i):o>0?n.arc(s,e,o,0,Math.PI*2):n.arc(s,e,2,0,Math.PI*2),n.fill(),n.restore()}}class pt{constructor(n){y(this,"canvas");y(this,"ctx");y(this,"fontSize",200);y(this,"fontFamily","微软雅黑");y(this,"color","pink");y(this,"gap",3);y(this,"alphaThreshold",30);y(this,"w",0);y(this,"h",0);let{canvas:t,ctx:s,fontSize:e,fontFamily:i,color:o,gap:l,alphaThreshold:u}=n;this.canvas=t,this.ctx=s??t.getContext("2d"),e&&(this.fontSize=e),i&&(this.fontFamily=i),o&&(this.color=o),l!=null&&(this.gap=l),u!=null&&(this.alphaThreshold=u),this.w=t.width,this.h=t.height}setSize(n){this.w=n.width,this.h=n.height}_measureText(n){let{ctx:t,fontSize:s,fontFamily:e,color:i,w:o,h:l}=this;t.save(),Object.assign(t,{font:`${s}px ${e}`,fillStyle:i,textBaseline:"bottom"});let u=t.measureText(n),{width:c,actualBoundingBoxAscent:d,actualBoundingBoxDescent:r}=u,m=~~(Math.abs(d)+Math.abs(r));c=~~c,t.fillText(n,0,m);let h=t.getImageData(0,0,c,m).data;return t.clearRect(0,0,o,l),t.restore(),{data:h,width:c,height:m}}getParticles(n){let{data:t,width:s,height:e}=this._measureText(n),{gap:i,alphaThreshold:o,w:l,h:u}=this,c=[],d=[];for(let r=0;r<s;r+=i)for(let m=0;m<e;m+=i){let h=m*s+r,v=t[h*4+0],f=t[h*4+1],x=t[h*4+2],b=t[h*4+3];if(b<=o)continue;let{signal:p,resolve:w}=Zn();c.push(p);let g=Jn({x:r,y:m},ne({x:s/2,y:e/2},{x:l/2,y:u/2}));d.push({tx:g.x,ty:g.y,color:Qn(v,f,x,b),onDone:w})}return{particles:d,done:Promise.all(c)}}}const mt=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n,s=O(),e=O("");let i,o=[],l=3,u="#f00",c=30,d=100,r=1,m=.1,h=.1,v=innerWidth,f=innerHeight,x=xn(()=>new ht({r,x:R(0,v),y:R(0,f),fx:.1,fy:.1})),b="hello world";function p(g,_){let j=i.getParticles(g);return o=x(j.particles.length).map(I=>(I.done=!1,_&&(I.x=R(0,v),I.y=R(0,f)),I)),o.forEach((I,B)=>Object.assign(I,j.particles[B])),j.done}function w(){e.value&&(b=e.value,p(b,!0))}return N(()=>{let g=s.value;const _=g.getContext("2d");Object.assign(g,{width:v,height:f}),i=new pt({canvas:g,ctx:_,gap:l,alphaThreshold:c,color:u}),E({调整文字颜色:{value:[u],isColor:!0,onFinishChange(B){i.color=B,p(b,!0)}},采样alpha过滤阈值:{value:[c,0,100,1],onFinishChange(B){i.alphaThreshold=B,p(b,!0)}},采样间隔调整:{value:[l,0,20,1],onFinishChange(B){i.gap=B,p(b,!0)}},点大小调整:{value:[r,1,20,1],onFinishChange(B){r=B,x.update(L=>L.r=B),p(b,!0)}},x方向缓动因子调整:{value:[m,.01,1,.01],onFinishChange(B){m=B,x.update(L=>L.fx=B),p(b,!0)}},y方向缓动因子调整:{value:[h,.01,1,.01],onFinishChange(B){h=B,x.update(L=>L.fy=B),p(b,!0)}},字体大小调整:{value:[d,50,340,10],onFinishChange(B){d=B,i.fontSize=B,p(b,!0)}},查看源码(){t("check-source")}}),p(b);const j=q(()=>{_.clearRect(0,0,v,f),o.forEach(B=>{B.render(_),B.update()})}),I=M(window,"resize",()=>{v=innerWidth,f=innerHeight,g.width=v,g.height=f,i.setSize({width:v,height:f})});z(()=>{I(),j()})}),(g,_)=>{const j=kn;return C(),T(V,null,[$("canvas",{ref_key:"canvasRef",ref:s},null,512),D(j,{class:"input",modelValue:W(e),"onUpdate:modelValue":_[0]||(_[0]=I=>fn(e)?e.value=I:null),placeholder:"请输入内容",size:"large",onKeyup:Cn(w,["enter"])},null,8,["modelValue"])],64)}}}),ft=P(mt,[["__scopeId","data-v-ab05e1fd"]]),gt=`import { iterateEaseFromTo, looseEqual } from '@thing772/utils'

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
`,xt="/demo/assets/imgs/display-DOJbIvru.png",yt={codes:[{name:"index.vue",code:dt,lang:"js"},{name:"textParticle.ts",code:vt,lang:"ts"},{name:"particle.ts",code:gt,lang:"ts"}],component:ft,display:xt,title:"文字粒子化",descriptions:""},bt=`<template>
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
`,_t=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let s=100,e=20,i=10,o=7;E({小球个数:{value:[s,1,1e3,10],onFinishChange(d){s=d,c.setBallNum(d)}},小球半径上限:{value:[e,4,100,1],onFinishChange(d){e=d,c.updateBalls(r=>{r.r=R(4,d)})}},小球x方向移动速度上限:{value:[i,1,15,.5],onFinishChange(d){i=d,c.updateBalls(r=>{r.vx=R(1,d)})}},小球y方向移动速度上限:{value:[o,1,15,.5],onFinishChange(d){o=d,c.updateBalls(r=>{r.vy=R(1,d)})}},开始(){l&&l(),l=c.start()},查看源码(){t("check-source")}});let l;const u=O();let c;return N(()=>{let d=u.value,r=innerWidth,m=innerHeight;Object.assign(d,{width:r,height:m}),c=yn({canvas:d,ballsNum:s,createBallFac:()=>new H({x:R(10,r-10),y:R(10,m-10),r:R(1,e),vx:R(1,i),vy:R(1,o),styleOptions:{fillStyle:U()}})});const h=M(window,"resize",()=>{r=innerWidth,m=innerHeight,c.setSize({width:r,height:m})},{immediate:!0});c.render(),z(()=>{h(),l&&l()})}),(d,r)=>(C(),T("canvas",{ref_key:"canvasRef",ref:u},null,512))}}),wt="/demo/assets/imgs/display-BpUGJlnU.png",Rt={codes:[{name:"index.vue",code:bt,lang:"js"},{name:"wander-balls.ts",code:vn,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:_t,display:wt,title:"矩形区域内飘荡的小球",descriptions:""},Bt=`<template>
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
`,St={class:"container"},Ct=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n,{obj:s}=E({模糊自身:{value:[!1],onChange(l){e.value=l}},模糊背景:{value:[!1],onChange(l){i.value=l}},查看源码(){t("check-source")}}),e=O(s.模糊自身),i=O(s.模糊背景),o=mn(()=>["el2",{"blur-self":e.value,"blur-backdrop":i.value}]);return(l,u)=>(C(),T("div",St,[u[0]||(u[0]=$("div",{class:"el1"}," 财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人， 较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻） ",-1)),$("div",{class:sn(W(o))}," 财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。 ",2)]))}}),kt=P(Ct,[["__scopeId","data-v-bce03b61"]]),jt="/demo/assets/imgs/display-C7z4HTpE.png",Ot={codes:[{name:"index.vue",code:Bt,lang:"js"}],component:kt,display:jt,title:"css模糊效果",descriptions:""},Tt=`<template>
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
`,It=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let{obj:s}=E({"添加box-shadow":{value:[!1],onChange(u){e.value=u}},添加圆角:{value:[!1],onChange(u){i.value=u}},"添加filter:drop-shadow":{value:[!1],onChange(u){o.value=u}},查看源码(){t("check-source")}});const e=O(s["添加box-shadow"]),i=O(s.添加圆角),o=O(s["添加filter:drop-shadow"]),l=mn(()=>["container",{"has-shadow-box":e.value,"round-border":i.value,filter:o.value}]);return(u,c)=>(C(),T("div",{class:sn(W(l))},c[0]||(c[0]=[un(" 测试文本 "),$("div",{class:"circle"}," 测试文本2 ",-1)]),2))}}),Ft=P(It,[["__scopeId","data-v-8a62668d"]]),Et="/demo/assets/imgs/display-CvX0ByRG.png",At={codes:[{name:"index.vue",code:Tt,lang:"js"}],component:Ft,display:Et,title:"css box阴影效果",descriptions:""},Dt=`<template>
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
`;function $t(a){const{data:n=[],getX:t,getY:s,width:e=200,height:i=200,margin:o=[],color:l={},sortY:u=0,xAxis:c={},yAxis:d={},yLegend:r={},hideXTicks:m}=a,[h=60,v=0,f=30,x=30]=o;let b,p;const w=ee("svg").attr("width",e).attr("height",i).attr("viewBox",[0,0,e,i]).style("background-color",l.bg||""),g=w.append("g"),_=w.append("g").attr("transform",`translate(0,${i-f})`),j=w.append("g").attr("transform",`translate(${x},0)`),I=B=>{const L=k=>{if(b=ae().range([x,e-v]),rn(a.xScale))for(let[S,G]of Object.entries(a.xScale))b[S](G);else b.padding(.2);u>0?b.domain(ie(k,([S])=>(u==1?1:-1)*s(S),t)):b.domain(k.map(t)),p=le().domain([0,oe(k,s)]).range([i-f,h])},J=k=>{k.attr("x",0).attr("y",0).attr("width",b.bandwidth()).attr("height",S=>p(0)-p(s(S))).attr("fill",l.bar||"#409eff")},Q=k=>{k.text(S=>S.value).attr("text-anchor","middle").attr("x",b.bandwidth()/2).attr("y",-4)};L(B),g.selectAll("g").data(B).join(k=>k.append("g").attr("transform",S=>`translate(${b(t(S))},${p(s(S))})`).call(S=>{J(S.append("rect")),Q(S.append("text"))}),k=>(J(k.select("rect")),Q(k.select("text")),k)).attr("transform",k=>`translate(${b(t(k))},${p(s(k))})`),_.call(k=>{let S=te(b);S.tickSizeOuter(0);for(const[G,X]of Object.entries(c))S[G](X);S(k)}).call(k=>{m&&k.selectAll(".tick").remove()}),j.call(k=>{let S=se(p);for(const[G,X]of Object.entries(d))S[G](X);S(k)}).call(k=>k.select(".domain").remove()).call(k=>{if(r.text){let S=k.append("text").attr("text-anchor","middle").attr("x",0).attr("y",20);for(const[G,X]of Object.entries(r))G=="text"?S[G](X):S.attr(G,X)}})};return I(n),{svg:w.node(),update:I}}function*zt(a,n){an(n)||(n=hn),n=n;for(let t=1;t<a.length;t++)for(let s=0;s<a.length-t;s++)n(a[s])>n(a[s+1])&&(tn(a,s,s+1),yield[...a])}function*Mt(a,n){an(n)||(n=hn),n=n,a=[...a];for(let t=0;t<a.length-1;t++){let s=0;for(let e=0;e<a.length-t;e++)n(a[e])>n(a[s])&&(s=e);tn(a,s,a.length-t-1),yield[...a]}}function*Nt(a,n){an(n)||(n=hn),a=[...a],n=n;for(let t=0;t<a.length-1;t++)if(n(a[t])>n(a[t+1])){tn(a,t,t+1),yield[...a];let s=t;for(;s>0&&!(n(a[s])>=n(a[s-1]));)tn(a,s,s-1),yield[...a],s--}}function*Pt(a,n){an(n)||(n=hn);function*t(s,e){if(n=n,s==e)return;let i=Math.floor((s+e)/2);yield*t(s,i),yield*t(i+1,e);const o=l=>a=[...a.slice(0,s),...l,...a.slice(e+1)];if(!(n(a[i])<=n(a[i+1]))){if(n(a[e])<=n(a[s])){yield o([...a.slice(i+1,e+1),...a.slice(s,i+1)]);return}for(let l=1;i+l<=e;l++){let u=i+l;for(;u>s&&!(n(a[u])>=n(a[u-1]));)tn(a,u,u-1),u--,yield[...a]}}}yield*t(0,a.length-1)}const Lt={class:"box"},Wt=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n,s=O(),e=[{label:"冒泡排序",value:zt},{label:"选择排序",value:Mt},{label:"插入排序",value:Nt},{label:"归并排序",value:Pt}],i=e[0],o=O(i.value);let l,u=innerWidth-100,c=innerHeight-100,d=!1,r=20,m=Rn([]),h=Rn();function v(){m.value=Le(r).map((w,g)=>({id:g,value:w})),d=!1,h.value=o.value(m.value,w=>w.value)}on(o,()=>{h.value=o.value(m.value,w=>w.value)});function f(){let{value:w,done:g}=h.value.next();if(d=g,g){gn({showClose:!0,message:"已经排序完毕",type:"success",grouping:!0});return}else m.value=w}let x=O(0);function b(){x.value==0&&((!h.value||d)&&v(),x.value=setInterval(()=>{if(d){clearInterval(x.value),x.value=0;return}f()},p))}on(()=>m.value,w=>{w.length>0?(l||(l=$t({width:u,height:c,getX:g=>g.id,getY:g=>g.value}),s.value.appendChild(l.svg)),l.update(w)):l&&(s.value.removeChild(l.svg),l=null)});let p=50;return N(()=>{v();let{helpers:{getAllControllers:w}}=E({选择算法:{value:[i.label,e.map(_=>_.label)],onChange(_){let j=e.find(I=>I.label==_);o.value=j.value}},随机数个数:{value:[r,10,100,1],onFinishChange(_){r=_}},自动开始时间间隔:{value:[p,16,100,5],onFinishChange(_){p=_}},生成随机数:{value:[function(){v()}],disable:x.value!=0},排序下一步:{value:[function(){f()}],disable:!h.value||x.value!=0},自动开始(){b()},查看源码(){t("check-source")}}),g=on(x,_=>{w().forEach(j=>{j.property!="查看源码"&&j.disable(_>0)})});z(()=>{g(),clearInterval(x.value)})}),(w,g)=>(C(),T("div",Lt,[$("div",{ref_key:"node",ref:s},null,512)]))}}),Gt=P(Wt,[["__scopeId","data-v-698136a6"]]),Ht=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`;function Jt(a){return 1-Math.pow(1-a,3)}var nn=(a=>(a[a.NORMAL=0]="NORMAL",a[a.REVERSE=1]="REVERSE",a))(nn||{});function Qt(a,n){let{startIndex:t=0,speed:s=1,onDone:e,onProcessing:i}=n,o=t,l,u;const c=v=>{rn(v)&&(u=Math.ceil(800/v))},d=()=>{l&&(cancelAnimationFrame(l),l=0)};c(s);function r(v){d();let{direction:f,speed:x,startIndex:b}=v,p;c(x),rn(b)&&(o=b);const w=g=>{p||(p=g),g-p>=u&&(f==0?o=(o+1)%a.length:o=o-1>=0?o-1:a.length-1,i(o),p=g),l=requestAnimationFrame(w)};l||(l=requestAnimationFrame(w))}function m(){d()}function h(v){d();let{loopTimes:f=5,targetIndex:x=a.length-1,direction:b,speed:p,startIndex:w}=v||{};f=Math.max(Math.ceil(Number(f)),1),x=Math.max(0,Math.min(Number(x),a.length-1)),c(p),rn(w)&&(o=w);let g=o,_,j=x-g;b==0?_=g+f*a.length+(j>=0?j:a.length+j):_=g-f*a.length+(j<=0?j:-a.length+j);let I=Math.abs(_-g)*u,B;const L=J=>{B||(B=J);let Q=Math.min(1,(J-B)/I),S=(Math.ceil(Jt(Q)*(_-g))+g)%a.length;if(S<0&&(S+=a.length),o!=S&&(o=S,i(o)),Q==1){e(o),l=0;return}l=requestAnimationFrame(L)};l=requestAnimationFrame(L)}return{wander:r,stop:m,draw:h}}const ns={class:"box"},es={style:{display:"flex"}},ts=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n,s=O(1),e=[...Array(10)],i={targetIndex:2,loopTimes:2,direction:nn.NORMAL,speed:5},{wander:o,stop:l,draw:u}=Qt(e,{speed:i.speed,startIndex:s.value,onProcessing:h=>{s.value=h},onDone(h){gn({showClose:!0,message:"已经抽奖完毕",type:"success",grouping:!0}),s.value=h}});function c(){o({...i})}function d(){u({...i})}z(()=>{l(),r&&clearTimeout(r)});let r;function m(){c(),r=setTimeout(()=>{i.targetIndex=On(e),d(),r=0},2500)}return E({设定巡航速度:{value:[i.speed,1,10,1],onFinishChange(h){i.speed=h}},设定最终选中项索引:{value:[i.targetIndex,0,e.length-1,1],onFinishChange(h){i.targetIndex=h}},轮转次数:{value:[i.loopTimes,2,20,1],onFinishChange(h){i.loopTimes=h}},轮转方向:{value:[i.direction==nn.NORMAL?"正向":"负向",["正向","负向"]],onChange(h){i.direction=h=="正向"?nn.NORMAL:nn.REVERSE}},开始抽奖:d,开始巡航:c,停止:l,模拟接口返回预制数据:m,查看源码(){t("check-source")}}),(h,v)=>{const f=jn;return C(),T("div",ns,[D(f,{class:"demo-card",shadow:"always"},{default:A(()=>[$("div",es,[(C(),T(V,null,en(e,(x,b)=>$("div",{class:sn(["block",W(s)==b?"selected":""])},cn(b),3)),64))])]),_:1})])}}}),ss=P(ts,[["__scopeId","data-v-2fa66777"]]),as="/demo/assets/imgs/display-DiF1Sfat.png",is={codes:[{name:"index.vue",code:Kt,lang:"js"},{name:"draw-price.ts",code:Zt,lang:"ts"}],component:ss,display:as,title:"抽奖",descriptions:""},ls=`<template>
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
`,os="/demo/assets/imgs/018194d9aac11f975e17b274fe4a78af1463731957-BlWzWTpc.png",rs="/demo/assets/imgs/10251358673700483-Bf69morh.jpg",cs="/demo/assets/imgs/10251358673922612-wa-5hia3.jpg",us="/demo/assets/imgs/10251381214893821-DZ0tyfKl.jpg",ds="/demo/assets/imgs/10251381215028477-DT0oxPDL.jpg",hs="/demo/assets/imgs/10251381215091916-34MSuKPK.jpg",ps="/demo/assets/imgs/10251381215152314-ZOViud5b.jpg",ms="/demo/assets/imgs/10251381215208971-BnTSlzDn.jpg",fs="/demo/assets/imgs/10251381215487222-CyoYfFWR.jpg",gs="/demo/assets/imgs/10251381215991717-jivRh7vw.jpg",vs="/demo/assets/imgs/10251381216212847-C6d5iI8I.jpg",xs="/demo/assets/imgs/3a5950fc2408a7f8136de8704e1819c21463732075-DT6cAkAt.png",ys="/demo/assets/imgs/48d780d33eaf46a5646376b814b8efa71463731556-CGACL27Z.png",bs="/demo/assets/imgs/554e21161de34506e9cb1ecbcd85716d1463732343-LZH7KjnQ.png",_s="/demo/assets/imgs/884f9b653e317cc514890954b2e35be81463731323-DvATjqjX.png",ws="/demo/assets/imgs/8a116da0668edebd82af16ecf7e75ace1590566316-Cl-PTpZA.jpg",Rs="/demo/assets/imgs/928d6ec50975da022bda97a1ab8f04c81463731839-d_LHiOEG.png",Bs="/demo/assets/imgs/a748932756b48bd46a8fd17df4579dea1463732104-DlsyWN-A.png",Ss="/demo/assets/imgs/b5978ead603dcdc66704e721960debe31590565987-4RsIwXgW.jpg",Cs="/demo/assets/imgs/c06f07de280d4edebf801eef4b142c721463731804-DD1ps6p3.png",ks="/demo/assets/imgs/ceb8c078cf6b410d7def183870fe584d1590566557-9BfKn2sf.jpg",js="/demo/assets/imgs/ea5871bc33e131b497b9bb273890e8ae1463731875-WWF6WmyZ.png",Os="/demo/assets/imgs/f29af13446f1feed47dcfd299ccaa23c1463732001-DrhlCMaO.png",Ts="/demo/assets/imgs/fef4eadd191c3461054ca60cde8576db1590566398-Bn18syhQ.jpg",Is={class:"container"},Fs=["src"],Es=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=n;let s=[...Object.values([os,rs,cs,us,ds,hs,ps,ms,fs,gs,vs,xs,ys,bs,_s,ws,Rs,Bs,Ss,Cs,ks,js,Os,Ts])];s=O(We(s,Math.ceil(s.length/5))),E({查看源码(){t("check-source")}});function i(l){l.target.classList.add("level-up")}function o(l){l.target.classList.remove("level-up")}return(l,u)=>(C(),T("div",Is,[(C(!0),T(V,null,en(W(s),(c,d)=>(C(),T("div",{class:sn(["hive-row",d%2==1?"odd":""]),onMouseenter:i,onMouseleave:o},[(C(!0),T(V,null,en(c,r=>(C(),T("img",{class:"hive-item",src:r,alt:""},null,8,Fs))),256))],34))),256))]))}}),As=P(Es,[["__scopeId","data-v-93867a89"]]),Ds="/demo/assets/imgs/display-BVEemRNY.png",$s={codes:[{name:"index.vue",code:ls,lang:"js"}],component:As,display:Ds,title:"蜂巢图片",descriptions:""},zs=`<template>
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
`;class Ps{constructor(n){y(this,"canvas");y(this,"ctx");y(this,"width",0);y(this,"height",0);y(this,"background");y(this,"_t0",0);y(this,"_t1",0);y(this,"_dt",0);y(this,"_objects",[]);y(this,"_raf",0);let{width:t,height:s,canvas:e,background:i}=n;this.canvas=e,this.ctx=e.getContext("2d"),this.background=i??"#000",this.setSize(t,s)}setSize(n,t){this.canvas.width=n,this.canvas.height=t,this.width=n,this.height=t}_render(){let{width:n,height:t,ctx:s,background:e}=this;s.fillStyle=e,s.fillRect(0,0,n,t);for(let i of[...this._objects])i.render(this._dt)}_updateTime(n){this._t0==0&&(this._t0=n),this._dt=n-this._t0}run(n){const t=s=>{this._updateTime(s),an(n)&&n(this._dt),this._render(),this._raf=requestAnimationFrame(t)};this._raf=requestAnimationFrame(t)}addObj(...n){return n.forEach(t=>{this._objects.find(s=>s==t)||(this._objects.push(t),t.scene=this)}),this}removeObj(n){let t=this._objects.findIndex(s=>s==n);return t!=-1&&(this._objects.splice(t,1),n.scene==this&&(n.scene=null)),this}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._t0=0,this._t1=0,this._dt=0)}}const Ls=[...Array(26)].map((a,n)=>["a","A"].map(t=>String.fromCharCode(t.charCodeAt(0)+n))).flat();function Ws(){return[...Array(Y(8)+2)].map(()=>Tn(Ls)).join("")}class Gs{constructor(n){y(this,"_x");y(this,"_y");y(this,"_text");y(this,"_opacity");y(this,"_onDismiss");y(this,"scene");y(this,"_opacityDecay");y(this,"_rawOptions");y(this,"_yStep");y(this,"_font","20px serif");y(this,"_fillStyle","red");let{x:t,y:s,text:e,opacity:i,opacityDecay:o,onDismiss:l,yStep:u}=n;this._x=t,this._y=s,this._text=e,this._opacity=i,this._onDismiss=l,this._opacityDecay=o??.01,this._rawOptions={...n},this._yStep=u??4}setFont(n,t){return this._font=n,this._fillStyle=t,this}render(n){let{_text:t,_x:s,_y:e,_opacityDecay:i,_yStep:o,_fillStyle:l,_font:u}=this,{ctx:c,height:d}=this.scene,r={font:c.font,fillStyle:c.fillStyle,globalAlpha:c.globalAlpha};this._opacity-=typeof i=="number"?i:i(n),this._opacity<0&&(this._opacity=0),c.font=u,c.fillStyle=l,c.globalAlpha=this._opacity;let m=0,h=e+(typeof o=="number"?o:o(n));for(let v of t){let f=c.measureText(v);const{actualBoundingBoxAscent:x,actualBoundingBoxDescent:b}=f;let p=b+x;c.fillText(v,s,h-m),m+=p+10}this._y=h,Object.assign(c,r),(this._opacity==0||h-m>d)&&this._onDismiss(this)}}class Hs{constructor(n){y(this,"scene");y(this,"num",0);y(this,"maxNum",100);y(this,"colors",["brown","red","green","yellow","chocolate","pink","burlywood","chartreuse","cyan"]);let{scene:t,maxNum:s}=n;this.scene=t,s&&(this.maxNum=s)}addText(){if(this.num<this.maxNum){this.num++;let{width:n,height:t}=this.scene,s=new Gs({text:Ws(),x:Y(n),y:Y(t),yStep:Y(10)+2,opacity:+Math.min(1,Math.random()+.2).toPrecision(2),opacityDecay:.01,onDismiss:e=>{this.scene.removeObj(e),this.num--}}).setFont(`${Y(15)+14}px serif`,Tn(this.colors));this.scene.addObj(s)}}start(){this.scene.run(n=>{this.addText()})}stop(){this.scene.stop()}}function Us(a,n,t){a.addEventListener("resize",n),z(()=>{a.removeEventListener("resize",n)})}const Vs={class:"box"},qs=F({__name:"index",emits:["check-source"],setup(a,{emit:n}){const t=O(),s=n;return N(()=>{let e=new Ps({width:innerWidth,height:innerHeight,canvas:t.value}),{obj:i}=E({文字串数量:{value:[10,10,200,10],onChange(l){o.maxNum=l}},查看代码:function(){s("check-source")}}),o=new Hs({scene:e,maxNum:i.文字串数量});o.start(),Us(window,()=>{e.setSize(innerWidth,innerHeight)}),z(()=>{o.stop()})}),(e,i)=>(C(),T("div",Vs,[$("canvas",{ref_key:"canvas",ref:t},null,512)]))}}),Xs=P(qs,[["__scopeId","data-v-4010e3a7"]]),Ys="/demo/assets/imgs/display-DwV-CRAI.png",Ks={codes:[{name:"index.vue",code:zs,lang:"js"},{name:"scene.ts",code:Ms,lang:"ts"},{name:"textRain.ts",code:Ns,lang:"ts"}],component:Xs,display:Ys,title:"文字雨",descriptions:""};let ln;function In(){return ln||(ln=Object.assign({"./demo/canvas/audio-wave/config.ts":De,"./demo/canvas/chasing/config.ts":Ne,"./demo/canvas/connect-balls/config.ts":Ue,"./demo/canvas/coord/config.ts":Ke,"./demo/canvas/eyeballs/config.ts":nt,"./demo/canvas/faliling-balls/config.ts":lt,"./demo/canvas/friction/config.ts":ut,"./demo/canvas/text-particle/config.ts":yt,"./demo/canvas/wander-balls/config.ts":Rt,"./demo/css/blur/config.ts":Ot,"./demo/css/shadow/config.ts":At,"./demo/d3/sort/config.ts":Yt,"./demo/draw-price/config.ts":is,"./demo/hive/config.ts":$s,"./demo/text-rain/config.ts":Ks}),ln)}let Fn=[];function Zs(){const a=In();for(let n in a){let{codes:t,component:s,title:e}=a[n],i=function(){return Bn(Ce,{codes:t},({checkSource:u})=>Bn(s,{onCheckSource:()=>{u()}}))};i.displayName=`Demo(${n})`;let o=n.replace(/.*\/demo\//,"").replace("/config.ts","").split("/").join("-");a[n].routeName=o,Fn.push({path:o,name:o,component:i,meta:{title:e}})}}Zs();const Js={path:"/demo",children:Fn},Qs={class:"common-layout"},na=F({__name:"index",setup(a){let n=Object.values(In());return(t,s)=>{const e=de,i=he,o=jn,l=ue,u=ce,c=re,d=pe;return C(),T("div",Qs,[D(d,{class:"container"},{default:A(()=>[D(c,{class:"main"},{default:A(()=>[D(u,{class:"row",gutter:20},{default:A(()=>[(C(!0),T(V,null,en(W(n),r=>(C(),pn(l,{key:r.routeName,span:4},{default:A(()=>[D(o,{class:"demo-card","body-style":{padding:"0px"},shadow:"always",onClick:m=>t.$router.push({name:r.routeName})},{footer:A(()=>[D(i,{tag:"p"},{default:A(()=>[un(cn(r.title),1)]),_:2},1024),D(i,{tag:"p","line-clamp":2},{default:A(()=>[un(cn(r.descriptions||"暂无描述"),1)]),_:2},1024)]),default:A(()=>[D(e,{class:"image",src:r.display,fit:"cover"},null,8,["src"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}}}),ea=P(na,[["__scopeId","data-v-fe2c6a64"]]),En=me({history:fe("/demo/"),routes:[{path:"/",component:ea},Js]});En.beforeEach((a,n,t)=>{document.title=a.meta.title??"my demos",t()});const bn=ge(be);bn.use(ve());bn.use(En);bn.mount("#app");
