var Dn=Object.defineProperty;var $n=(i,n,s)=>n in i?Dn(i,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[n]=s;var y=(i,n,s)=>$n(i,typeof n!="symbol"?n+"":n,s);import{r as zn,c as fn,o as B,d as I,a as C,b as gn,e as N,P as Mn,f as T,g as z,t as cn,n as sn,u as G,h as $,i as Nn,w as D,E as Pn,F as U,j as en,k as Wn,l as Ln,m as un,p as vn,q as Gn,s as q,v as Hn,x as Vn,y as A,z as M,A as L,B as K,C as Un,D as wn,G as qn,H as R,I as Bn,J as Xn,K as Rn,L as kn,M as jn,N as hn,O as Yn,Q as Kn,R as Zn,S as dn,T as on,U as pn,V as Cn,W as Jn,X as Qn,Y as ne,Z as ee,_ as te,$ as se,a0 as ae,a1 as ie,a2 as le,a3 as oe,a4 as re,a5 as ce,a6 as ue,a7 as On,a8 as Sn,a9 as de,aa as he,ab as me,ac as pe,ad as fe,ae as ge,af as ve,ag as xe,ah as ye,ai as be}from"./vendor-jwNrB2tL.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();const P=(i,n)=>{const s=i.__vccOpts||i;for(const[t,e]of n)s[t]=e;return s},_e={};function we(i,n){const s=zn("RouterView");return B(),fn(s)}const Re=P(_e,[["render",we]]),Ce={class:"pre"},Se=I({__name:"hilight",props:{code:{},lang:{}},setup(i){const n=i,s=C(),t=gn(()=>n.lang?`lang-${n.lang}`:"auto");return N(()=>{Mn.highlightElement(s.value)}),(e,a)=>(B(),T("pre",Ce,[z("code",{class:sn(G(t)),ref_key:"codeRef",ref:s},cn(e.code),3)]))}}),Be={class:"container"},ke={class:"dialog-footer"},je=I({__name:"codeDemo",props:{codes:{}},setup(i){const n=C(!1);function s(){n.value=!0}return(t,e)=>{const a=Wn,l=Pn,o=Ln,u=Gn;return B(),T(U,null,[z("div",Be,[Nn(t.$slots,"default",{checkSource:s},void 0,!0)]),$(u,{modelValue:G(n),"onUpdate:modelValue":e[1]||(e[1]=r=>vn(n)?n.value=r:null),title:"",width:"50vw",top:"50px"},{footer:D(()=>[z("span",ke,[$(o,{type:"primary",onClick:e[0]||(e[0]=r=>n.value=!1)},{default:D(()=>e[2]||(e[2]=[un("关闭")])),_:1})])]),default:D(()=>[$(l,{type:"border-card"},{default:D(()=>[(B(!0),T(U,null,en(t.codes,r=>(B(),fn(a,{label:r.name,key:r.name,lazy:""},{default:D(()=>[$(Se,{code:r.code,lang:r.lang},null,8,["code","lang"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"])],64)}}}),Oe=P(je,[["__scopeId","data-v-65455990"]]),Te=`<template>
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
`,Fe=`import { rafLoop } from '@thing772/utils'

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
`;function Ie(i,n){const s=new AudioContext;let t=s.createMediaElementSource(i);const e=s.createAnalyser();t.connect(e),e.connect(s.destination),e.fftSize=512;const a=e.frequencyBinCount,l=new Uint8Array(a),o=n.getContext("2d");let u=n.width,r=n.height;function m(){e.getByteTimeDomainData(l),o.save(),Object.assign(o,{fillStyle:"red"});const d=u/a;for(let f=0;f<a;f+=4){let h=l[f]/255*r;o.fillRect(d*f,r-h,d,h)}o.fill(),o.restore()}function c(d,f){u=n.width=d,r=n.height=f}function g(){return q(()=>{o.clearRect(0,0,u,r),m()})}return{setSize:c,start:g}}const Ee="/demo/assets/media/%E5%8C%96%E5%87%A1-DF7X08YA.ogg";function E(i){if(!i.title){let s=Hn().meta.title;s&&(i.title=s)}let n=Vn(i);return A(()=>{n.gui.destroy()}),n}const Ae=["src"],De=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n;E({查看源码(){s("check-source")}});const t=C(),e=C();return N(()=>{let a;e.value.onplay=()=>{const{start:l,setSize:o}=Ie(e.value,t.value);a=M(window,"resize",()=>{o(innerWidth,innerHeight)},{immediate:!0}),l()},A(()=>{a&&a()})}),(a,l)=>(B(),T(U,null,[z("audio",{ref_key:"audioRef",ref:e,src:G(Ee),id:"audio",controls:""},null,8,Ae),z("canvas",{ref_key:"canvasRef",ref:t},null,512)],64))}}),$e=P(De,[["__scopeId","data-v-24237bd0"]]),ze="/demo/assets/imgs/display-_9yby0tz.png",Me={codes:[{name:"index.vue",code:Te,lang:"js"},{name:"audio-wave",code:Fe,lang:"ts"}],component:$e,display:ze,title:"音频波形",descriptions:""},Ne=`<template>
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
`;class V{constructor(n){y(this,"x",0);y(this,"y",0);y(this,"r",0);y(this,"vx",0);y(this,"vy",0);y(this,"ax",0);y(this,"ay",0);y(this,"styleOptions",{});n&&this.set(n)}reset(n){return Object.assign(this,{x:0,y:0,r:0,vx:0,vy:0,ax:0,ay:0,...n?{styleOptions:{}}:null})}set(n){return Object.assign(this,n)}update(){return this.vy+=this.ay,this.y+=this.vy,this.vx+=this.ax,this.x+=this.vx,this}render(n){n.save();let{x:s,y:t,r:e,styleOptions:a}=this;Object.assign(n,a),n.beginPath(),n.arc(s,t,e,0,Math.PI*2),a.fillStyle&&n.fill(),a.strokeStyle&&n.stroke(),n.restore()}}const Pe=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n;E({查看源码(){s("check-source")}});const t=C();return N(()=>{let e=t.value,a,l,o,u=e.getContext("2d");const r=M(window,"resize",()=>{Object.assign(e,{width:a=innerWidth,height:l=innerHeight})},{immediate:!0}),m=M(e,"mousemove",function(g){o={x:g.offsetX,y:g.offsetY}});let c=new V({r:100,x:a/2,y:l/2,styleOptions:{fillStyle:L()}});q(()=>{u.clearRect(0,0,a,l),o&&(c.x=K(c.x,o.x,.05),c.y=K(c.y,o.y,.05)),c.render(u)}),A(()=>{r(),m()})}),(e,a)=>(B(),T("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),We="/demo/assets/imgs/display-IdleEMXt.png",Le={codes:[{name:"index.vue",code:Ne,lang:"js"},{name:"ball.ts",code:Z,lang:"ts"}],component:Pe,display:We,title:"缓动追逐",descriptions:""},Ge=`<template>
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
`,xn=`import { rafLoop, updateBallVelocityInRect, isFunc } from '@thing772/utils'
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
`;function Tn(i){return Math.floor(Math.random()*i.length)}function Fn(i){return i[Tn(i)]}function He(i,n=1e3){let s=[];for(let t=0;t<i;t++)s.push(Y(n));return s}function Y(i=1e3){return Math.ceil(Math.random()*i)}function Ve(i,n){return i.reduce((s,t,e)=>(e%n==0&&s.push(i.slice(e,e+n)),s),[])}function tn(i,n,s){let t=i[n];i[n]=i[s],i[s]=t}function rn(i){return i!=null}function an(i){return typeof i=="function"}function mn(i){return i}function yn(i){let n=[];function s(t){let e=t-n.length;return e>0?n.push(...Un(i,e)):e<0&&(n=n.slice(0,e)),n}return s.update=function(t){n.forEach(e=>t(e))},s}function bn(i){let{canvas:n,ballsNum:s,createBallFac:t,onBallUpdate:e,speedDecay:a,preRender:l,postRender:o}=i,u=n.width,r=n.height;const m=n.getContext("2d");let c=[];const g=yn(t);function d(v){c=g(v),h()}function f(v){Object.assign(n,v),u=v.width,r=v.height,h()}function h(v){c.forEach(w=>{wn(v)&&v(w),w.render(m)})}function x(){m.clearRect(0,0,u,r);for(let v of c)wn(e)?e(v):(v.update(),qn(v,{wBox:[0,u],hBox:[0,r],speedDecay:a}));l==null||l(c,m),c.forEach(v=>v.render(m)),o==null||o(c,m)}function b(v){m.clearRect(0,0,u,r),h(v)}d(s);let p;function _(){return p&&p(),p=q(()=>{x()})}return{start:_,setBallNum:d,setSize:f,render:x,updateBalls:b}}const Ue=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n;let t=80,e=1,a=3,l=3,o=100,u;E({小球个数:{value:[t,1,1e3,10],onFinishChange(d){t=d,c.setBallNum(d)}},小球半径上限:{value:[e,1,100,1],onFinishChange(d){e=d,c.updateBalls(f=>{f.r=R(1,d)})}},小球x方向移动速度上限:{value:[a,1,15,.5],onFinishChange(d){a=d,c.updateBalls(f=>{f.vx=R(1,d)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(d){l=d,c.updateBalls(f=>{f.vy=R(1,d)})}},小球连接范围阈值:{value:[o,50,300,1],onFinishChange(d){o=d}},查看源码(){s("check-source")}});let r;const m=C();let c,g;return N(()=>{let d=m.value,f=innerWidth,h=innerHeight;Object.assign(d,{width:f,height:h}),c=bn({canvas:d,ballsNum:t,createBallFac:()=>new V({x:R(10,f-10),y:R(10,h-10),r:R(1,e),vx:R(1,a),vy:R(1,l),styleOptions:{fillStyle:L()}}),preRender(p,_){u||(u=Bn(_,{strokeStyle:L(),lineWidth:1})),g&&(p=p.concat(g));for(let v=0;v<p.length;v++)for(let w=v+1;w<p.length;w++){let O=p[v],F=p[w];Xn(O,F)<o&&u(O,F)}g&&p.pop()}});const x=M(window,"resize",()=>{f=innerWidth,h=innerHeight,c.setSize({width:f,height:h})},{immediate:!0}),b=M(d,"mousemove",p=>{g={x:p.offsetX,y:p.offsetY}},{needLog:!0});r=c.start(),A(()=>{x(),b(),r&&r()})}),(d,f)=>(B(),T("canvas",{ref_key:"canvasRef",ref:m},null,512))}}),qe="/demo/assets/imgs/display-y86Fu395.png",Xe={codes:[{name:"index.vue",code:Ge,lang:"js"},{name:"wander-balls.ts",code:xn,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:Ue,display:qe,title:"粒子小球连线",descriptions:""},Ye=`<template>
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
`,Ke=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n,t=C();let e=innerWidth,a=innerHeight,l,o=(f,h)=>Math.sin(5*f+.001*h)+Math.cos(10*f+.005*h),u=C(""),r=o,m=300,c=1,g=L();function d(){r=new Function("x","t",`return ${u.value}`);try{r(0,0)}catch(f){hn({showClose:!0,message:f.message,type:"error",grouping:!0})}}return N(()=>{let f=t.value;const h=f.getContext("2d");E({采样率设置:{value:[m,10,1e3,10],onFinishChange(p){m=p}},曲线粗细设置:{value:[c,1,10,1],onFinishChange(p){c=p}},曲线颜色设置:{value:[g],isColor:!0,onFinishChange(p){g=p}},查看源码(){s("check-source")}}),l=Rn({canvas:f,ctx:h,width:e,height:a});const x=q(p=>{h.clearRect(0,0,e,a),l.setup(),l.draw(_=>{let v=0;try{v=r(_,p)}catch{}return v},{rate:m,style:{strokeStyle:g,lineWidth:c},label:{name:r.toString().replace(/ anonymous/,""),pos:{x:100,y:100}}})}),b=M(window,"resize",()=>{e=innerWidth,a=innerHeight,l=Rn({canvas:f,ctx:h,width:e,height:a})});A(()=>{b(),x()})}),(f,h)=>{const x=jn;return B(),T(U,null,[z("canvas",{ref_key:"canvasRef",ref:t},null,512),$(x,{class:"input",modelValue:G(u),"onUpdate:modelValue":h[0]||(h[0]=b=>vn(u)?u.value=b:u=b),placeholder:"参数:（x:x坐标，t：时间参数），输入x和t的表达式",size:"large",onKeyup:kn(d,["enter"])},null,8,["modelValue"])],64)}}}),Ze=P(Ke,[["__scopeId","data-v-6125c1c8"]]),Je="/demo/assets/imgs/display-BsbAITaj.png",Qe={codes:[{name:"index.vue",code:Ye,lang:"js"}],component:Ze,display:Je,title:"笛卡尔坐标系函数绘制",descriptions:""},nt=`<template>
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
`,et=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n;E({查看源码(){s("check-source")}});const t=C();return N(()=>{let e=t.value,a,l,o,u=e.getContext("2d");const r=M(window,"resize",()=>{Object.assign(e,{width:a=innerWidth,height:l=innerHeight})},{immediate:!0}),m=M(e,"mousemove",function(x){o={x:x.offsetX,y:x.offsetY}});let c=[new V({r:50,x:a/2-80,y:l/2,styleOptions:{fillStyle:L()}}),new V({r:50,x:a/2+80,y:l/2,styleOptions:{fillStyle:L()}})],g=c.map(x=>new V({r:x.r/4,x:x.x,y:x.y,styleOptions:{fillStyle:L()}})),d=new V({r:200,x:a/2,y:l/2,styleOptions:{fillStyle:"#E6A23C"}}),f=Bn(u,{strokeStyle:"#fff",lineWidth:"10",lineCap:"round"}),h=.05;q(()=>{u.clearRect(0,0,a,l),d.render(u),c.forEach(x=>{x.render(u)}),g.forEach((x,b)=>{if(o){let p=x.x=K(x.x,o.x,h),_=x.y=K(x.y,o.y,h),v=c[b],w={x:v.x,y:v.y,r:v.r-10};if(!Yn(w,x)){x.x=p,x.y=_;let O=Kn(w,o);Object.assign(x,Zn(w,O,w.r-x.r))}}x.render(u)}),f({x:a/2-50,y:l/2+100},{x:a/2+50,y:l/2+100})}),A(()=>{r(),m()})}),(e,a)=>(B(),T("canvas",{ref_key:"canvasRef",ref:t},null,512))}}),tt="/demo/assets/imgs/display-BcjSOcDf.png",st={codes:[{name:"index.vue",code:nt,lang:"js"},{name:"ball.ts",code:Z,lang:"ts"}],component:et,display:tt,title:"会动的眼球",descriptions:""},at=`<template>
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
`,it=`import { Ball } from '@/utils/class/ball'
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
`;function lt(i){let{canvas:n,num:s,onAllStopped:t}=i;const e=n.getContext("2d");let a=n.width,l=n.height,o=[],u=!1,r=!1;const m=yn(()=>new V(c()));function c(){return{x:R(10,a-10),y:R(10,l-10),r:4,ax:0,ay:R(.1,2,!1),vx:0,vy:R(1,3),styleOptions:{fillStyle:L()},stopped:!1}}function g(p){o=m(p)}function d(){for(let p of o)p.reset().set(c());if(r=!1,!u)return b()}function f(p){Object.assign(n,p),a=p.width,l=p.height}function h(p){return p.stopped||dn(p.vy,0,1)&&dn(p.y+p.r,l,1)}function x(){if(o.length!=0){e.clearRect(0,0,a,l);for(let p of o)if(p.update(),p.y+p.r>l&&(p.y=l-p.r,p.vy*=-.7),p.render(e),h(p)&&(p.stopped=!0,o.every(h))){u=!1,r=!0;try{t==null||t()}catch(_){console.error(_)}return!1}}}g(s);function b(){if(u)return;u=!0,r&&d();let p=q(x);return()=>{u&&(u=!1,p())}}return{start:b,reset:d,setBallsNum:g,setSize:f,render:x}}const ot=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n;let t=100;const e=C(),{helpers:{getControllerByKey:a}}=E({小球个数:{value:[t,1,1e3,10],onFinishChange(r){t=r,o.setBallsNum(r)}},开始(){let r=o.start();r&&(e.value=r)},暂停:{value:[function(){e.value()}],disable:!e.value},重置(){let r=o.reset();r&&(e.value=r)},查看源码(){s("check-source")}});on(e,r=>{a("暂停").enable(!!r)});const l=C();let o;function u(){hn({showClose:!0,message:"所有小球都停止运动了",type:"success",grouping:!0})}return N(()=>{let r=l.value;Object.assign(r,{width:innerWidth,height:innerHeight}),o=lt({num:t,canvas:r,onAllStopped:u});const m=M(window,"resize",()=>{o.setSize({width:innerWidth,height:innerHeight})},{immediate:!0});o.render(),A(()=>{m(),e.value&&e.value()})}),(r,m)=>(B(),T("canvas",{ref_key:"canvasRef",ref:l},null,512))}}),rt="/demo/assets/imgs/display-DOU4TeMC.png",ct={codes:[{name:"index.vue",code:at,lang:"js"},{name:"falling-balls.ts",code:it,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:ot,display:rt,title:"下落的小球",descriptions:""},ut=`<template>
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
`,dt=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n;let t=100,e=20,a=20,l=17,o=.01;E({小球个数:{value:[t,1,1e3,10],onFinishChange(c){t=c,m.setBallNum(c)}},小球半径上限:{value:[e,4,100,1],onFinishChange(c){e=c,m.updateBalls(g=>{g.r=R(4,c)})}},小球x方向移动速度上限:{value:[a,1,15,.5],onFinishChange(c){a=c,m.updateBalls(g=>{g.vx=R(1,c)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(c){l=c,m.updateBalls(g=>{g.vy=R(1,c)})}},小球摩擦力因子:{value:[o,0,3,.1],onFinishChange(c){o=c,m.updateBalls(g=>{g.friction=R(0,c)})}},开始(){u&&u(),u=m.start()},查看源码(){s("check-source")}});let u;const r=C();let m;return N(()=>{let c=r.value,g,d;Object.assign(c,{width:g=innerWidth,height:d=innerHeight}),m=bn({canvas:c,ballsNum:t,createBallFac:()=>{let h={x:R(10,g-10),y:R(10,d-10),r:R(1,e),vx:R(1,a),vy:R(1,l),styleOptions:{fillStyle:L()},friction:R(0,o)};return new V(h)},onBallUpdate(h){h.vx>=.01&&(h.vx-=h.friction,h.x+=h.vx),h.vy>=.01&&(h.vy-=h.friction,h.y+=h.vy),h.x>g+h.r&&(h.x=-h.r),h.y>d+h.r&&(h.y=-h.r)}});const f=M(window,"resize",()=>{m.setSize({width:g=innerWidth,height:d=innerHeight})},{immediate:!0});A(()=>{f(),u&&u()})}),(c,g)=>(B(),T("canvas",{ref_key:"canvasRef",ref:r},null,512))}}),ht="/demo/assets/imgs/display-BaZn1eIe.png",mt={codes:[{name:"index.vue",code:ut,lang:"js"},{name:"wander-balls.ts",code:xn,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:dt,display:ht,title:"运动减速",descriptions:""},pt=`<template>
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
`,ft=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n;let t=innerWidth,e=innerHeight,a,l=C(.01),o=C(.01),u=C(1),r=pn(new Cn.Noise(Math.random())),m=C("simplex2"),c=()=>{let d=a.getImageData(0,0,t,e);for(let f=0;f<t;f++)for(let h=0;h<e;h++){let x=~~Math.min(255,Math.abs(r.value[m.value](f*l.value,h*o.value))*u.value*256);d.data[(h*t+f)*4+0]=x,d.data[(h*t+f)*4+1]=x,d.data[(h*t+f)*4+2]=x,d.data[(h*t+f)*4+3]=255}a.putImageData(d,0,0)};E({噪声生成算法:{value:[m.value,["simplex2","perlin2"]],onFinishChange(d){m.value=d}},x方向缩放因子:{value:[l.value,.001,.5,.001],onFinishChange(d){l.value=d}},y方向缩放因子:{value:[o.value,.001,.5,.001],onFinishChange(d){o.value=d}},值放缩因子:{value:[u.value,.01,255,.1],onFinishChange(d){u.value=d}},重新生成随机种子(){r.value=new Cn.Noise(Math.random())},查看源码(){s("check-source")}});const g=C();return N(()=>{const d=g.value;d.width=t,d.height=e,a=d.getContext("2d",{willReadFrequently:!0});const f=M(window,"resize",Jn(()=>{t=~~(innerWidth/1),e=~~(innerHeight/1),d.width=t,d.height=e,c()},100));let h=Qn(c);A(()=>{f(),h()})}),(d,f)=>(B(),T("canvas",{ref_key:"canvasRef",ref:g},null,512))}}),gt="/demo/assets/imgs/display-CsCBxHWH.png",vt={codes:[{name:"index.vue",code:pt,lang:"js"}],component:ft,display:gt,title:"随机噪声",descriptions:""},xt=`<template>
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
`;class yt{constructor(n){y(this,"x",0);y(this,"y",0);y(this,"tx",0);y(this,"ty",0);y(this,"color","pink");y(this,"name","");y(this,"fx",.01);y(this,"fy",.01);y(this,"onDone");y(this,"r",0);y(this,"size",0);y(this,"done",!1);Object.assign(this,n)}update(){var t;let{tx:n,ty:s}=this;if(!this.done)return this.x=K(this.x,n,this.fx),this.y=K(this.y,s,this.fy),dn(this.x,this.tx)&&dn(this.y,this.ty)&&(this.done=!0,(t=this.onDone)==null||t.call(this)),this}render(n){let{color:s,x:t,y:e,size:a,r:l}=this;n.save(),Object.assign(n,{fillStyle:s}),n.beginPath(),a>0?n.fillRect(t,e,a,a):l>0?n.arc(t,e,l,0,Math.PI*2):n.arc(t,e,2,0,Math.PI*2),n.fill(),n.restore()}}class bt{constructor(n){y(this,"canvas");y(this,"ctx");y(this,"fontSize",200);y(this,"fontFamily","微软雅黑");y(this,"color","pink");y(this,"gap",3);y(this,"alphaThreshold",30);y(this,"w",0);y(this,"h",0);let{canvas:s,ctx:t,fontSize:e,fontFamily:a,color:l,gap:o,alphaThreshold:u}=n;this.canvas=s,this.ctx=t??s.getContext("2d"),e&&(this.fontSize=e),a&&(this.fontFamily=a),l&&(this.color=l),o!=null&&(this.gap=o),u!=null&&(this.alphaThreshold=u),this.w=s.width,this.h=s.height}setSize(n){this.w=n.width,this.h=n.height}_measureText(n){let{ctx:s,fontSize:t,fontFamily:e,color:a,w:l,h:o}=this;s.save(),Object.assign(s,{font:`${t}px ${e}`,fillStyle:a,textBaseline:"bottom"});let u=s.measureText(n),{width:r,actualBoundingBoxAscent:m,actualBoundingBoxDescent:c}=u,g=~~(Math.abs(m)+Math.abs(c));r=~~r,s.fillText(n,0,g);let d=s.getImageData(0,0,r,g).data;return s.clearRect(0,0,l,o),s.restore(),{data:d,width:r,height:g}}getParticles(n){let{data:s,width:t,height:e}=this._measureText(n),{gap:a,alphaThreshold:l,w:o,h:u}=this,r=[],m=[];for(let c=0;c<t;c+=a)for(let g=0;g<e;g+=a){let d=g*t+c,f=s[d*4+0],h=s[d*4+1],x=s[d*4+2],b=s[d*4+3];if(b<=l)continue;let{signal:p,resolve:_}=ne();r.push(p);let v=ee({x:c,y:g},se({x:t/2,y:e/2},{x:o/2,y:u/2}));m.push({tx:v.x,ty:v.y,color:te(f,h,x,b),onDone:_})}return{particles:m,done:Promise.all(r)}}}const _t=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n,t=C(),e=C("");let a,l=[],o=3,u="#f00",r=30,m=100,c=1,g=.1,d=.1,f=innerWidth,h=innerHeight,x=yn(()=>new yt({r:c,x:R(0,f),y:R(0,h),fx:.1,fy:.1})),b="hello world";function p(v,w){let O=a.getParticles(v);return l=x(O.particles.length).map(F=>(F.done=!1,w&&(F.x=R(0,f),F.y=R(0,h)),F)),l.forEach((F,S)=>Object.assign(F,O.particles[S])),O.done}function _(){e.value&&(b=e.value,p(b,!0))}return N(()=>{let v=t.value;const w=v.getContext("2d",{willReadFrequently:!0});Object.assign(v,{width:f,height:h}),a=new bt({canvas:v,ctx:w,gap:o,alphaThreshold:r,color:u}),E({调整文字颜色:{value:[u],isColor:!0,onFinishChange(S){a.color=S,p(b,!0)}},采样alpha过滤阈值:{value:[r,0,100,1],onFinishChange(S){a.alphaThreshold=S,p(b,!0)}},采样间隔调整:{value:[o,1,20,1],onFinishChange(S){a.gap=S,p(b,!0)}},点大小调整:{value:[c,1,20,1],onFinishChange(S){c=S,x.update(W=>W.r=S),p(b,!0)}},x方向缓动因子调整:{value:[g,.01,1,.01],onFinishChange(S){g=S,x.update(W=>W.fx=S),p(b,!0)}},y方向缓动因子调整:{value:[d,.01,1,.01],onFinishChange(S){d=S,x.update(W=>W.fy=S),p(b,!0)}},字体大小调整:{value:[m,50,340,10],onFinishChange(S){m=S,a.fontSize=S,p(b,!0)}},查看源码(){s("check-source")}}),p(b);const O=q(()=>{w.clearRect(0,0,f,h),l.forEach(S=>{S.render(w),S.update()})}),F=M(window,"resize",()=>{f=innerWidth,h=innerHeight,v.width=f,v.height=h,a.setSize({width:f,height:h})});A(()=>{F(),O()})}),(v,w)=>{const O=jn;return B(),T(U,null,[z("canvas",{ref_key:"canvasRef",ref:t},null,512),$(O,{class:"input",modelValue:G(e),"onUpdate:modelValue":w[0]||(w[0]=F=>vn(e)?e.value=F:null),placeholder:"请输入内容",size:"large",onKeyup:kn(_,["enter"])},null,8,["modelValue"])],64)}}}),wt=P(_t,[["__scopeId","data-v-0ead9cf7"]]),Rt=`import { iterateEaseFromTo, looseEqual } from '@thing772/utils'

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
`,Ct=`import { getSignal, ptOffset, getMovePt, rgb } from '@thing772/utils'
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
`,St="/demo/assets/imgs/display-DOJbIvru.png",Bt={codes:[{name:"index.vue",code:xt,lang:"js"},{name:"textParticle.ts",code:Ct,lang:"ts"},{name:"particle.ts",code:Rt,lang:"ts"}],component:wt,display:St,title:"文字粒子化",descriptions:""},kt=`<template>
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
`,jt=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n;let t=100,e=20,a=10,l=7;E({小球个数:{value:[t,1,1e3,10],onFinishChange(m){t=m,r.setBallNum(m)}},小球半径上限:{value:[e,4,100,1],onFinishChange(m){e=m,r.updateBalls(c=>{c.r=R(4,m)})}},小球x方向移动速度上限:{value:[a,1,15,.5],onFinishChange(m){a=m,r.updateBalls(c=>{c.vx=R(1,m)})}},小球y方向移动速度上限:{value:[l,1,15,.5],onFinishChange(m){l=m,r.updateBalls(c=>{c.vy=R(1,m)})}},开始(){o&&o(),o=r.start()},查看源码(){s("check-source")}});let o;const u=C();let r;return N(()=>{let m=u.value,c=innerWidth,g=innerHeight;Object.assign(m,{width:c,height:g}),r=bn({canvas:m,ballsNum:t,createBallFac:()=>new V({x:R(10,c-10),y:R(10,g-10),r:R(1,e),vx:R(1,a),vy:R(1,l),styleOptions:{fillStyle:L()}})});const d=M(window,"resize",()=>{c=innerWidth,g=innerHeight,r.setSize({width:c,height:g})},{immediate:!0});r.render(),A(()=>{d(),o&&o()})}),(m,c)=>(B(),T("canvas",{ref_key:"canvasRef",ref:u},null,512))}}),Ot="/demo/assets/imgs/display-BpUGJlnU.png",Tt={codes:[{name:"index.vue",code:kt,lang:"js"},{name:"wander-balls.ts",code:xn,lang:"ts"},{name:"ball.ts",code:Z,lang:"ts"}],component:jt,display:Ot,title:"矩形区域内飘荡的小球",descriptions:""},Ft=`<template>
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
`,It={class:"container"},Et=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n,{obj:t}=E({模糊自身:{value:[!1],onChange(o){e.value=o}},模糊背景:{value:[!1],onChange(o){a.value=o}},查看源码(){s("check-source")}}),e=C(t.模糊自身),a=C(t.模糊背景),l=gn(()=>["el2",{"blur-self":e.value,"blur-backdrop":a.value}]);return(o,u)=>(B(),T("div",It,[u[0]||(u[0]=z("div",{class:"el1"}," 财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人， 较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻） ",-1)),z("div",{class:sn(G(l))}," 财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。 ",2)]))}}),At=P(Et,[["__scopeId","data-v-bce03b61"]]),Dt="/demo/assets/imgs/display-C7z4HTpE.png",$t={codes:[{name:"index.vue",code:Ft,lang:"js"}],component:At,display:Dt,title:"css模糊效果",descriptions:""},zt=`<template>
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
`,Mt=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n;let{obj:t}=E({"添加box-shadow":{value:[!1],onChange(u){e.value=u}},添加圆角:{value:[!1],onChange(u){a.value=u}},"添加filter:drop-shadow":{value:[!1],onChange(u){l.value=u}},查看源码(){s("check-source")}});const e=C(t["添加box-shadow"]),a=C(t.添加圆角),l=C(t["添加filter:drop-shadow"]),o=gn(()=>["container",{"has-shadow-box":e.value,"round-border":a.value,filter:l.value}]);return(u,r)=>(B(),T("div",{class:sn(G(o))},r[0]||(r[0]=[un(" 测试文本 "),z("div",{class:"circle"}," 测试文本2 ",-1)]),2))}}),Nt=P(Mt,[["__scopeId","data-v-8a62668d"]]),Pt="/demo/assets/imgs/display-CvX0ByRG.png",Wt={codes:[{name:"index.vue",code:zt,lang:"js"}],component:Nt,display:Pt,title:"css box阴影效果",descriptions:""},Lt=`<template>
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
`;function Gt(i){const{data:n=[],getX:s,getY:t,width:e=200,height:a=200,margin:l=[],color:o={},sortY:u=0,xAxis:r={},yAxis:m={},yLegend:c={},hideXTicks:g}=i,[d=60,f=0,h=30,x=30]=l;let b,p;const _=ae("svg").attr("width",e).attr("height",a).attr("viewBox",[0,0,e,a]).style("background-color",o.bg||""),v=_.append("g"),w=_.append("g").attr("transform",`translate(0,${a-h})`),O=_.append("g").attr("transform",`translate(${x},0)`),F=S=>{const W=j=>{if(b=oe().range([x,e-f]),rn(i.xScale))for(let[k,H]of Object.entries(i.xScale))b[k](H);else b.padding(.2);u>0?b.domain(re(j,([k])=>(u==1?1:-1)*t(k),s)):b.domain(j.map(s)),p=ce().domain([0,ue(j,t)]).range([a-h,d])},J=j=>{j.attr("x",0).attr("y",0).attr("width",b.bandwidth()).attr("height",k=>p(0)-p(t(k))).attr("fill",o.bar||"#409eff")},Q=j=>{j.text(k=>k.value).attr("text-anchor","middle").attr("x",b.bandwidth()/2).attr("y",-4)};W(S),v.selectAll("g").data(S).join(j=>j.append("g").attr("transform",k=>`translate(${b(s(k))},${p(t(k))})`).call(k=>{J(k.append("rect")),Q(k.append("text"))}),j=>(J(j.select("rect")),Q(j.select("text")),j)).attr("transform",j=>`translate(${b(s(j))},${p(t(j))})`),w.call(j=>{let k=ie(b);k.tickSizeOuter(0);for(const[H,X]of Object.entries(r))k[H](X);k(j)}).call(j=>{g&&j.selectAll(".tick").remove()}),O.call(j=>{let k=le(p);for(const[H,X]of Object.entries(m))k[H](X);k(j)}).call(j=>j.select(".domain").remove()).call(j=>{if(c.text){let k=j.append("text").attr("text-anchor","middle").attr("x",0).attr("y",20);for(const[H,X]of Object.entries(c))H=="text"?k[H](X):k.attr(H,X)}})};return F(n),{svg:_.node(),update:F}}function*Ht(i,n){an(n)||(n=mn),n=n;for(let s=1;s<i.length;s++)for(let t=0;t<i.length-s;t++)n(i[t])>n(i[t+1])&&(tn(i,t,t+1),yield[...i])}function*Vt(i,n){an(n)||(n=mn),n=n,i=[...i];for(let s=0;s<i.length-1;s++){let t=0;for(let e=0;e<i.length-s;e++)n(i[e])>n(i[t])&&(t=e);tn(i,t,i.length-s-1),yield[...i]}}function*Ut(i,n){an(n)||(n=mn),i=[...i],n=n;for(let s=0;s<i.length-1;s++)if(n(i[s])>n(i[s+1])){tn(i,s,s+1),yield[...i];let t=s;for(;t>0&&!(n(i[t])>=n(i[t-1]));)tn(i,t,t-1),yield[...i],t--}}function*qt(i,n){an(n)||(n=mn);function*s(t,e){if(n=n,t==e)return;let a=Math.floor((t+e)/2);yield*s(t,a),yield*s(a+1,e);const l=o=>i=[...i.slice(0,t),...o,...i.slice(e+1)];if(!(n(i[a])<=n(i[a+1]))){if(n(i[e])<=n(i[t])){yield l([...i.slice(a+1,e+1),...i.slice(t,a+1)]);return}for(let o=1;a+o<=e;o++){let u=a+o;for(;u>t&&!(n(i[u])>=n(i[u-1]));)tn(i,u,u-1),u--,yield[...i]}}}yield*s(0,i.length-1)}const Xt={class:"box"},Yt=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n,t=C(),e=[{label:"冒泡排序",value:Ht},{label:"选择排序",value:Vt},{label:"插入排序",value:Ut},{label:"归并排序",value:qt}],a=e[0],l=C(a.value);let o,u=innerWidth-100,r=innerHeight-100,m=!1,c=20,g=pn([]),d=pn();function f(){g.value=He(c).map((_,v)=>({id:v,value:_})),m=!1,d.value=l.value(g.value,_=>_.value)}on(l,()=>{d.value=l.value(g.value,_=>_.value)});function h(){let{value:_,done:v}=d.value.next();if(m=v,v){hn({showClose:!0,message:"已经排序完毕",type:"success",grouping:!0});return}else g.value=_}let x=C(0);function b(){x.value==0&&((!d.value||m)&&f(),x.value=setInterval(()=>{if(m){clearInterval(x.value),x.value=0;return}h()},p))}on(()=>g.value,_=>{_.length>0?(o||(o=Gt({width:u,height:r,getX:v=>v.id,getY:v=>v.value}),t.value.appendChild(o.svg)),o.update(_)):o&&(t.value.removeChild(o.svg),o=null)});let p=50;return N(()=>{f();let{helpers:{getAllControllers:_}}=E({选择算法:{value:[a.label,e.map(w=>w.label)],onChange(w){let O=e.find(F=>F.label==w);l.value=O.value}},随机数个数:{value:[c,10,100,1],onFinishChange(w){c=w}},自动开始时间间隔:{value:[p,16,100,5],onFinishChange(w){p=w}},生成随机数:{value:[function(){f()}],disable:x.value!=0},排序下一步:{value:[function(){h()}],disable:!d.value||x.value!=0},自动开始(){b()},查看源码(){s("check-source")}}),v=on(x,w=>{_().forEach(O=>{O.property!="查看源码"&&O.disable(w>0)})});A(()=>{v(),clearInterval(x.value)})}),(_,v)=>(B(),T("div",Xt,[z("div",{ref_key:"node",ref:t},null,512)]))}}),Kt=P(Yt,[["__scopeId","data-v-698136a6"]]),Zt=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,Jt=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,Qt=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,ns=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,es="/demo/assets/imgs/display-B3luB7Uf.png",ts={codes:[{name:"index.vue",code:Lt,lang:"js"},{name:"bubble.ts",code:Zt,lang:"ts"},{name:"selection.ts",code:Jt,lang:"ts"},{name:"insertion.ts",code:Qt,lang:"ts"},{name:"merge.ts",code:ns,lang:"ts"}],component:Kt,display:es,title:"排序算法可视化",descriptions:""},ss=`<template>
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
`,as=`import { easeOutCubic } from './ease'
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
`;function is(i){return 1-Math.pow(1-i,3)}var nn=(i=>(i[i.NORMAL=0]="NORMAL",i[i.REVERSE=1]="REVERSE",i))(nn||{});function ls(i,n){let{startIndex:s=0,speed:t=1,onDone:e,onProcessing:a}=n,l=s,o,u;const r=f=>{rn(f)&&(u=Math.ceil(800/f))},m=()=>{o&&(cancelAnimationFrame(o),o=0)};r(t);function c(f){m();let{direction:h,speed:x,startIndex:b}=f,p;r(x),rn(b)&&(l=b);const _=v=>{p||(p=v),v-p>=u&&(h==0?l=(l+1)%i.length:l=l-1>=0?l-1:i.length-1,a(l),p=v),o=requestAnimationFrame(_)};o||(o=requestAnimationFrame(_))}function g(){m()}function d(f){m();let{loopTimes:h=5,targetIndex:x=i.length-1,direction:b,speed:p,startIndex:_}=f||{};h=Math.max(Math.ceil(Number(h)),1),x=Math.max(0,Math.min(Number(x),i.length-1)),r(p),rn(_)&&(l=_);let v=l,w,O=x-v;b==0?w=v+h*i.length+(O>=0?O:i.length+O):w=v-h*i.length+(O<=0?O:-i.length+O);let F=Math.abs(w-v)*u,S;const W=J=>{S||(S=J);let Q=Math.min(1,(J-S)/F),k=(Math.ceil(is(Q)*(w-v))+v)%i.length;if(k<0&&(k+=i.length),l!=k&&(l=k,a(l)),Q==1){e(l),o=0;return}o=requestAnimationFrame(W)};o=requestAnimationFrame(W)}return{wander:c,stop:g,draw:d}}const os={class:"box"},rs={style:{display:"flex"}},cs=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n,t=C(1),e=[...Array(10)],a={targetIndex:2,loopTimes:2,direction:nn.NORMAL,speed:5},{wander:l,stop:o,draw:u}=ls(e,{speed:a.speed,startIndex:t.value,onProcessing:d=>{t.value=d},onDone(d){hn({showClose:!0,message:"已经抽奖完毕",type:"success",grouping:!0}),t.value=d}});function r(){l({...a})}function m(){u({...a})}A(()=>{o(),c&&clearTimeout(c)});let c;function g(){r(),c=setTimeout(()=>{a.targetIndex=Tn(e),m(),c=0},2500)}return E({设定巡航速度:{value:[a.speed,1,10,1],onFinishChange(d){a.speed=d}},设定最终选中项索引:{value:[a.targetIndex,0,e.length-1,1],onFinishChange(d){a.targetIndex=d}},轮转次数:{value:[a.loopTimes,2,20,1],onFinishChange(d){a.loopTimes=d}},轮转方向:{value:[a.direction==nn.NORMAL?"正向":"负向",["正向","负向"]],onChange(d){a.direction=d=="正向"?nn.NORMAL:nn.REVERSE}},开始抽奖:m,开始巡航:r,停止:o,模拟接口返回预制数据:g,查看源码(){s("check-source")}}),(d,f)=>{const h=On;return B(),T("div",os,[$(h,{class:"demo-card",shadow:"always"},{default:D(()=>[z("div",rs,[(B(),T(U,null,en(e,(x,b)=>z("div",{class:sn(["block",G(t)==b?"selected":""])},cn(b),3)),64))])]),_:1})])}}}),us=P(cs,[["__scopeId","data-v-2fa66777"]]),ds="/demo/assets/imgs/display-DiF1Sfat.png",hs={codes:[{name:"index.vue",code:ss,lang:"js"},{name:"draw-price.ts",code:as,lang:"ts"}],component:us,display:ds,title:"抽奖",descriptions:""},ms=`<template>
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
`,ps="/demo/assets/imgs/018194d9aac11f975e17b274fe4a78af1463731957-BlWzWTpc.png",fs="/demo/assets/imgs/10251358673700483-Bf69morh.jpg",gs="/demo/assets/imgs/10251358673922612-wa-5hia3.jpg",vs="/demo/assets/imgs/10251381214893821-DZ0tyfKl.jpg",xs="/demo/assets/imgs/10251381215028477-DT0oxPDL.jpg",ys="/demo/assets/imgs/10251381215091916-34MSuKPK.jpg",bs="/demo/assets/imgs/10251381215152314-ZOViud5b.jpg",_s="/demo/assets/imgs/10251381215208971-BnTSlzDn.jpg",ws="/demo/assets/imgs/10251381215487222-CyoYfFWR.jpg",Rs="/demo/assets/imgs/10251381215991717-jivRh7vw.jpg",Cs="/demo/assets/imgs/10251381216212847-C6d5iI8I.jpg",Ss="/demo/assets/imgs/3a5950fc2408a7f8136de8704e1819c21463732075-DT6cAkAt.png",Bs="/demo/assets/imgs/48d780d33eaf46a5646376b814b8efa71463731556-CGACL27Z.png",ks="/demo/assets/imgs/554e21161de34506e9cb1ecbcd85716d1463732343-LZH7KjnQ.png",js="/demo/assets/imgs/884f9b653e317cc514890954b2e35be81463731323-DvATjqjX.png",Os="/demo/assets/imgs/8a116da0668edebd82af16ecf7e75ace1590566316-Cl-PTpZA.jpg",Ts="/demo/assets/imgs/928d6ec50975da022bda97a1ab8f04c81463731839-d_LHiOEG.png",Fs="/demo/assets/imgs/a748932756b48bd46a8fd17df4579dea1463732104-DlsyWN-A.png",Is="/demo/assets/imgs/b5978ead603dcdc66704e721960debe31590565987-4RsIwXgW.jpg",Es="/demo/assets/imgs/c06f07de280d4edebf801eef4b142c721463731804-DD1ps6p3.png",As="/demo/assets/imgs/ceb8c078cf6b410d7def183870fe584d1590566557-9BfKn2sf.jpg",Ds="/demo/assets/imgs/ea5871bc33e131b497b9bb273890e8ae1463731875-WWF6WmyZ.png",$s="/demo/assets/imgs/f29af13446f1feed47dcfd299ccaa23c1463732001-DrhlCMaO.png",zs="/demo/assets/imgs/fef4eadd191c3461054ca60cde8576db1590566398-Bn18syhQ.jpg",Ms={class:"container"},Ns=["src"],Ps=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=n;let t=[...Object.values([ps,fs,gs,vs,xs,ys,bs,_s,ws,Rs,Cs,Ss,Bs,ks,js,Os,Ts,Fs,Is,Es,As,Ds,$s,zs])];t=C(Ve(t,Math.ceil(t.length/5))),E({查看源码(){s("check-source")}});function a(o){o.target.classList.add("level-up")}function l(o){o.target.classList.remove("level-up")}return(o,u)=>(B(),T("div",Ms,[(B(!0),T(U,null,en(G(t),(r,m)=>(B(),T("div",{class:sn(["hive-row",m%2==1?"odd":""]),onMouseenter:a,onMouseleave:l},[(B(!0),T(U,null,en(r,c=>(B(),T("img",{class:"hive-item",src:c,alt:""},null,8,Ns))),256))],34))),256))]))}}),Ws=P(Ps,[["__scopeId","data-v-93867a89"]]),Ls="/demo/assets/imgs/display-BVEemRNY.png",Gs={codes:[{name:"index.vue",code:ms,lang:"js"}],component:Ws,display:Ls,title:"蜂巢图片",descriptions:""},Hs=`<template>
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
`,Vs=`import { isFunc } from '@/utils/utils'

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
`,Us=`import type { SceneInstance, SceneObj } from "./scene"
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
`;class qs{constructor(n){y(this,"canvas");y(this,"ctx");y(this,"width",0);y(this,"height",0);y(this,"background");y(this,"_t0",0);y(this,"_t1",0);y(this,"_dt",0);y(this,"_objects",[]);y(this,"_raf",0);let{width:s,height:t,canvas:e,background:a}=n;this.canvas=e,this.ctx=e.getContext("2d"),this.background=a??"#000",this.setSize(s,t)}setSize(n,s){this.canvas.width=n,this.canvas.height=s,this.width=n,this.height=s}_render(){let{width:n,height:s,ctx:t,background:e}=this;t.fillStyle=e,t.fillRect(0,0,n,s);for(let a of[...this._objects])a.render(this._dt)}_updateTime(n){this._t0==0&&(this._t0=n),this._dt=n-this._t0}run(n){const s=t=>{this._updateTime(t),an(n)&&n(this._dt),this._render(),this._raf=requestAnimationFrame(s)};this._raf=requestAnimationFrame(s)}addObj(...n){return n.forEach(s=>{this._objects.find(t=>t==s)||(this._objects.push(s),s.scene=this)}),this}removeObj(n){let s=this._objects.findIndex(t=>t==n);return s!=-1&&(this._objects.splice(s,1),n.scene==this&&(n.scene=null)),this}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._t0=0,this._t1=0,this._dt=0)}}const Xs=[...Array(26)].map((i,n)=>["a","A"].map(s=>String.fromCharCode(s.charCodeAt(0)+n))).flat();function Ys(){return[...Array(Y(8)+2)].map(()=>Fn(Xs)).join("")}class Ks{constructor(n){y(this,"_x");y(this,"_y");y(this,"_text");y(this,"_opacity");y(this,"_onDismiss");y(this,"scene");y(this,"_opacityDecay");y(this,"_rawOptions");y(this,"_yStep");y(this,"_font","20px serif");y(this,"_fillStyle","red");let{x:s,y:t,text:e,opacity:a,opacityDecay:l,onDismiss:o,yStep:u}=n;this._x=s,this._y=t,this._text=e,this._opacity=a,this._onDismiss=o,this._opacityDecay=l??.01,this._rawOptions={...n},this._yStep=u??4}setFont(n,s){return this._font=n,this._fillStyle=s,this}render(n){let{_text:s,_x:t,_y:e,_opacityDecay:a,_yStep:l,_fillStyle:o,_font:u}=this,{ctx:r,height:m}=this.scene,c={font:r.font,fillStyle:r.fillStyle,globalAlpha:r.globalAlpha};this._opacity-=typeof a=="number"?a:a(n),this._opacity<0&&(this._opacity=0),r.font=u,r.fillStyle=o,r.globalAlpha=this._opacity;let g=0,d=e+(typeof l=="number"?l:l(n));for(let f of s){let h=r.measureText(f);const{actualBoundingBoxAscent:x,actualBoundingBoxDescent:b}=h;let p=b+x;r.fillText(f,t,d-g),g+=p+10}this._y=d,Object.assign(r,c),(this._opacity==0||d-g>m)&&this._onDismiss(this)}}class Zs{constructor(n){y(this,"scene");y(this,"num",0);y(this,"maxNum",100);y(this,"colors",["brown","red","green","yellow","chocolate","pink","burlywood","chartreuse","cyan"]);let{scene:s,maxNum:t}=n;this.scene=s,t&&(this.maxNum=t)}addText(){if(this.num<this.maxNum){this.num++;let{width:n,height:s}=this.scene,t=new Ks({text:Ys(),x:Y(n),y:Y(s),yStep:Y(10)+2,opacity:+Math.min(1,Math.random()+.2).toPrecision(2),opacityDecay:.01,onDismiss:e=>{this.scene.removeObj(e),this.num--}}).setFont(`${Y(15)+14}px serif`,Fn(this.colors));this.scene.addObj(t)}}start(){this.scene.run(n=>{this.addText()})}stop(){this.scene.stop()}}function Js(i,n,s){i.addEventListener("resize",n),A(()=>{i.removeEventListener("resize",n)})}const Qs={class:"box"},na=I({__name:"index",emits:["check-source"],setup(i,{emit:n}){const s=C(),t=n;return N(()=>{let e=new qs({width:innerWidth,height:innerHeight,canvas:s.value}),{obj:a}=E({文字串数量:{value:[10,10,200,10],onChange(o){l.maxNum=o}},查看代码:function(){t("check-source")}}),l=new Zs({scene:e,maxNum:a.文字串数量});l.start(),Js(window,()=>{e.setSize(innerWidth,innerHeight)}),A(()=>{l.stop()})}),(e,a)=>(B(),T("div",Qs,[z("canvas",{ref_key:"canvas",ref:s},null,512)]))}}),ea=P(na,[["__scopeId","data-v-4010e3a7"]]),ta="/demo/assets/imgs/display-DwV-CRAI.png",sa={codes:[{name:"index.vue",code:Hs,lang:"js"},{name:"scene.ts",code:Vs,lang:"ts"},{name:"textRain.ts",code:Us,lang:"ts"}],component:ea,display:ta,title:"文字雨",descriptions:""};let ln;function In(){return ln||(ln=Object.assign({"./demo/canvas/audio-wave/config.ts":Me,"./demo/canvas/chasing/config.ts":Le,"./demo/canvas/connect-balls/config.ts":Xe,"./demo/canvas/coord/config.ts":Qe,"./demo/canvas/eyeballs/config.ts":st,"./demo/canvas/faliling-balls/config.ts":ct,"./demo/canvas/friction/config.ts":mt,"./demo/canvas/noise/config.ts":vt,"./demo/canvas/text-particle/config.ts":Bt,"./demo/canvas/wander-balls/config.ts":Tt,"./demo/css/blur/config.ts":$t,"./demo/css/shadow/config.ts":Wt,"./demo/d3/sort/config.ts":ts,"./demo/draw-price/config.ts":hs,"./demo/hive/config.ts":Gs,"./demo/text-rain/config.ts":sa}),ln)}let En=[];function aa(){const i=In();for(let n in i){let{codes:s,component:t,title:e}=i[n],a=function(){return Sn(Oe,{codes:s},({checkSource:u})=>Sn(t,{onCheckSource:()=>{u()}}))};a.displayName=`Demo(${n})`;let l=n.replace(/.*\/demo\//,"").replace("/config.ts","").split("/").join("-");i[n].routeName=l,En.push({path:l,name:l,component:a,meta:{title:e}})}}aa();const ia={path:"/demo",children:En},la={class:"common-layout"},oa=I({__name:"index",setup(i){let n=Object.values(In());return(s,t)=>{const e=pe,a=fe,l=On,o=me,u=he,r=de,m=ge;return B(),T("div",la,[$(m,{class:"container"},{default:D(()=>[$(r,{class:"main"},{default:D(()=>[$(u,{class:"row",gutter:20},{default:D(()=>[(B(!0),T(U,null,en(G(n),c=>(B(),fn(o,{key:c.routeName,span:4},{default:D(()=>[$(l,{class:"demo-card","body-style":{padding:"0px"},shadow:"always",onClick:g=>s.$router.push({name:c.routeName})},{footer:D(()=>[$(a,{tag:"p"},{default:D(()=>[un(cn(c.title),1)]),_:2},1024),$(a,{tag:"p","line-clamp":2},{default:D(()=>[un(cn(c.descriptions||"暂无描述"),1)]),_:2},1024)]),default:D(()=>[$(e,{class:"image",src:c.display,fit:"cover"},null,8,["src"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}}}),ra=P(oa,[["__scopeId","data-v-fe2c6a64"]]),An=ve({history:xe("/demo/"),routes:[{path:"/",component:ra},ia]});An.beforeEach((i,n,s)=>{document.title=i.meta.title??"my demos",s()});const _n=ye(Re);_n.use(be());_n.use(An);_n.mount("#app");
