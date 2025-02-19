var Xh=Object.defineProperty;var Zh=(e,t,n)=>t in e?Xh(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ae=(e,t,n)=>Zh(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function ca(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const Be={},ir=[],it=()=>{},Jh=()=>!1,ys=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),ua=e=>e.startsWith("onUpdate:"),Ye=Object.assign,fa=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Qh=Object.prototype.hasOwnProperty,Te=(e,t)=>Qh.call(e,t),de=Array.isArray,sr=e=>bs(e)==="[object Map]",ku=e=>bs(e)==="[object Set]",fe=e=>typeof e=="function",Ce=e=>typeof e=="string",fn=e=>typeof e=="symbol",Oe=e=>e!==null&&typeof e=="object",Ou=e=>(Oe(e)||fe(e))&&fe(e.then)&&fe(e.catch),Ru=Object.prototype.toString,bs=e=>Ru.call(e),ep=e=>bs(e).slice(8,-1),Iu=e=>bs(e)==="[object Object]",da=e=>Ce(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,zr=ca(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),_s=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},tp=/-(\w)/g,St=_s(e=>e.replace(tp,(t,n)=>n?n.toUpperCase():"")),np=/\B([A-Z])/g,On=_s(e=>e.replace(np,"-$1").toLowerCase()),di=_s(e=>e.charAt(0).toUpperCase()+e.slice(1)),Gs=_s(e=>e?`on${di(e)}`:""),An=(e,t)=>!Object.is(e,t),Ys=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},Fu=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},rp=e=>{const t=parseFloat(e);return isNaN(t)?e:t},ip=e=>{const t=Ce(e)?Number(e):NaN;return isNaN(t)?e:t};let fl;const xs=()=>fl||(fl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ke(e){if(de(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],i=Ce(r)?lp(r):Ke(r);if(i)for(const s in i)t[s]=i[s]}return t}else if(Ce(e)||Oe(e))return e}const sp=/;(?![^(]*\))/g,op=/:([^]+)/,ap=/\/\*[^]*?\*\//g;function lp(e){const t={};return e.replace(ap,"").split(sp).forEach(n=>{if(n){const r=n.split(op);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function J(e){let t="";if(Ce(e))t=e;else if(de(e))for(let n=0;n<e.length;n++){const r=J(e[n]);r&&(t+=r+" ")}else if(Oe(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function dl(e){if(!e)return null;let{class:t,style:n}=e;return t&&!Ce(t)&&(e.class=J(t)),n&&(e.style=Ke(n)),e}const cp="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",up=ca(cp);function Mu(e){return!!e||e===""}const Pu=e=>!!(e&&e.__v_isRef===!0),rt=e=>Ce(e)?e:e==null?"":de(e)||Oe(e)&&(e.toString===Ru||!fe(e.toString))?Pu(e)?rt(e.value):JSON.stringify(e,Nu,2):String(e),Nu=(e,t)=>Pu(t)?Nu(e,t.value):sr(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,i],s)=>(n[qs(r,s)+" =>"]=i,n),{})}:ku(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>qs(n))}:fn(t)?qs(t):Oe(t)&&!de(t)&&!Iu(t)?String(t):t,qs=(e,t="")=>{var n;return fn(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let lt;class Bu{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=lt,!t&&lt&&(this.index=(lt.scopes||(lt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=lt;try{return lt=this,t()}finally{lt=n}}}on(){lt=this}off(){lt=this.parent}stop(t){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function Lu(e){return new Bu(e)}function Du(){return lt}function zu(e,t=!1){lt&&lt.cleanups.push(e)}let De;const Xs=new WeakSet;class ju{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,lt&&lt.active&&lt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Xs.has(this)&&(Xs.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Vu(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,hl(this),Wu(this);const t=De,n=It;De=this,It=!0;try{return this.fn()}finally{Uu(this),De=t,It=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)ga(t);this.deps=this.depsTail=void 0,hl(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Xs.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ao(this)&&this.run()}get dirty(){return Ao(this)}}let Hu=0,jr,Hr;function Vu(e,t=!1){if(e.flags|=8,t){e.next=Hr,Hr=e;return}e.next=jr,jr=e}function ha(){Hu++}function pa(){if(--Hu>0)return;if(Hr){let t=Hr;for(Hr=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;jr;){let t=jr;for(jr=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(r){e||(e=r)}t=n}}if(e)throw e}function Wu(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Uu(e){let t,n=e.depsTail,r=n;for(;r;){const i=r.prevDep;r.version===-1?(r===n&&(n=i),ga(r),fp(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=i}e.deps=t,e.depsTail=n}function Ao(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Ku(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Ku(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===qr))return;e.globalVersion=qr;const t=e.dep;if(e.flags|=2,t.version>0&&!e.isSSR&&e.deps&&!Ao(e)){e.flags&=-3;return}const n=De,r=It;De=e,It=!0;try{Wu(e);const i=e.fn(e._value);(t.version===0||An(i,e._value))&&(e._value=i,t.version++)}catch(i){throw t.version++,i}finally{De=n,It=r,Uu(e),e.flags&=-3}}function ga(e,t=!1){const{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)ga(s,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function fp(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let It=!0;const Gu=[];function Rn(){Gu.push(It),It=!1}function In(){const e=Gu.pop();It=e===void 0?!0:e}function hl(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=De;De=void 0;try{t()}finally{De=n}}}let qr=0;class dp{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ma{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(t){if(!De||!It||De===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==De)n=this.activeLink=new dp(De,this),De.deps?(n.prevDep=De.depsTail,De.depsTail.nextDep=n,De.depsTail=n):De.deps=De.depsTail=n,Yu(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=De.depsTail,n.nextDep=void 0,De.depsTail.nextDep=n,De.depsTail=n,De.deps===n&&(De.deps=r)}return n}trigger(t){this.version++,qr++,this.notify(t)}notify(t){ha();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{pa()}}}function Yu(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let r=t.deps;r;r=r.nextDep)Yu(r)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const Yi=new WeakMap,Hn=Symbol(""),Eo=Symbol(""),Xr=Symbol("");function tt(e,t,n){if(It&&De){let r=Yi.get(e);r||Yi.set(e,r=new Map);let i=r.get(n);i||(r.set(n,i=new ma),i.map=r,i.key=n),i.track()}}function rn(e,t,n,r,i,s){const o=Yi.get(e);if(!o){qr++;return}const a=l=>{l&&l.trigger()};if(ha(),t==="clear")o.forEach(a);else{const l=de(e),c=l&&da(n);if(l&&n==="length"){const u=Number(r);o.forEach((f,d)=>{(d==="length"||d===Xr||!fn(d)&&d>=u)&&a(f)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),c&&a(o.get(Xr)),t){case"add":l?c&&a(o.get("length")):(a(o.get(Hn)),sr(e)&&a(o.get(Eo)));break;case"delete":l||(a(o.get(Hn)),sr(e)&&a(o.get(Eo)));break;case"set":sr(e)&&a(o.get(Hn));break}}pa()}function hp(e,t){const n=Yi.get(e);return n&&n.get(t)}function Zn(e){const t=$e(e);return t===e?t:(tt(t,"iterate",Xr),Et(e)?t:t.map(nt))}function ws(e){return tt(e=$e(e),"iterate",Xr),e}const pp={__proto__:null,[Symbol.iterator](){return Zs(this,Symbol.iterator,nt)},concat(...e){return Zn(this).concat(...e.map(t=>de(t)?Zn(t):t))},entries(){return Zs(this,"entries",e=>(e[1]=nt(e[1]),e))},every(e,t){return Zt(this,"every",e,t,void 0,arguments)},filter(e,t){return Zt(this,"filter",e,t,n=>n.map(nt),arguments)},find(e,t){return Zt(this,"find",e,t,nt,arguments)},findIndex(e,t){return Zt(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Zt(this,"findLast",e,t,nt,arguments)},findLastIndex(e,t){return Zt(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Zt(this,"forEach",e,t,void 0,arguments)},includes(...e){return Js(this,"includes",e)},indexOf(...e){return Js(this,"indexOf",e)},join(e){return Zn(this).join(e)},lastIndexOf(...e){return Js(this,"lastIndexOf",e)},map(e,t){return Zt(this,"map",e,t,void 0,arguments)},pop(){return Tr(this,"pop")},push(...e){return Tr(this,"push",e)},reduce(e,...t){return pl(this,"reduce",e,t)},reduceRight(e,...t){return pl(this,"reduceRight",e,t)},shift(){return Tr(this,"shift")},some(e,t){return Zt(this,"some",e,t,void 0,arguments)},splice(...e){return Tr(this,"splice",e)},toReversed(){return Zn(this).toReversed()},toSorted(e){return Zn(this).toSorted(e)},toSpliced(...e){return Zn(this).toSpliced(...e)},unshift(...e){return Tr(this,"unshift",e)},values(){return Zs(this,"values",nt)}};function Zs(e,t,n){const r=ws(e),i=r[t]();return r!==e&&!Et(e)&&(i._next=i.next,i.next=()=>{const s=i._next();return s.value&&(s.value=n(s.value)),s}),i}const gp=Array.prototype;function Zt(e,t,n,r,i,s){const o=ws(e),a=o!==e&&!Et(e),l=o[t];if(l!==gp[t]){const f=l.apply(e,s);return a?nt(f):f}let c=n;o!==e&&(a?c=function(f,d){return n.call(this,nt(f),d,e)}:n.length>2&&(c=function(f,d){return n.call(this,f,d,e)}));const u=l.call(o,c,r);return a&&i?i(u):u}function pl(e,t,n,r){const i=ws(e);let s=n;return i!==e&&(Et(e)?n.length>3&&(s=function(o,a,l){return n.call(this,o,a,l,e)}):s=function(o,a,l){return n.call(this,o,nt(a),l,e)}),i[t](s,...r)}function Js(e,t,n){const r=$e(e);tt(r,"iterate",Xr);const i=r[t](...n);return(i===-1||i===!1)&&_a(n[0])?(n[0]=$e(n[0]),r[t](...n)):i}function Tr(e,t,n=[]){Rn(),ha();const r=$e(e)[t].apply(e,n);return pa(),In(),r}const mp=ca("__proto__,__v_isRef,__isVue"),qu=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(fn));function vp(e){fn(e)||(e=String(e));const t=$e(this);return tt(t,"has",e),t.hasOwnProperty(e)}class Xu{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,r){if(n==="__v_skip")return t.__v_skip;const i=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!i;if(n==="__v_isReadonly")return i;if(n==="__v_isShallow")return s;if(n==="__v_raw")return r===(i?s?$p:ef:s?Qu:Ju).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const o=de(t);if(!i){let l;if(o&&(l=pp[n]))return l;if(n==="hasOwnProperty")return vp}const a=Reflect.get(t,n,We(t)?t:r);return(fn(n)?qu.has(n):mp(n))||(i||tt(t,"get",n),s)?a:We(a)?o&&da(n)?a:a.value:Oe(a)?i?Ss(a):wr(a):a}}class Zu extends Xu{constructor(t=!1){super(!1,t)}set(t,n,r,i){let s=t[n];if(!this._isShallow){const l=Wn(s);if(!Et(r)&&!Wn(r)&&(s=$e(s),r=$e(r)),!de(t)&&We(s)&&!We(r))return l?!1:(s.value=r,!0)}const o=de(t)&&da(n)?Number(n)<t.length:Te(t,n),a=Reflect.set(t,n,r,We(t)?t:i);return t===$e(i)&&(o?An(r,s)&&rn(t,"set",n,r):rn(t,"add",n,r)),a}deleteProperty(t,n){const r=Te(t,n);t[n];const i=Reflect.deleteProperty(t,n);return i&&r&&rn(t,"delete",n,void 0),i}has(t,n){const r=Reflect.has(t,n);return(!fn(n)||!qu.has(n))&&tt(t,"has",n),r}ownKeys(t){return tt(t,"iterate",de(t)?"length":Hn),Reflect.ownKeys(t)}}class yp extends Xu{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const bp=new Zu,_p=new yp,xp=new Zu(!0);const $o=e=>e,Si=e=>Reflect.getPrototypeOf(e);function wp(e,t,n){return function(...r){const i=this.__v_raw,s=$e(i),o=sr(s),a=e==="entries"||e===Symbol.iterator&&o,l=e==="keys"&&o,c=i[e](...r),u=n?$o:t?To:nt;return!t&&tt(s,"iterate",l?Eo:Hn),{next(){const{value:f,done:d}=c.next();return d?{value:f,done:d}:{value:a?[u(f[0]),u(f[1])]:u(f),done:d}},[Symbol.iterator](){return this}}}}function Ci(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Sp(e,t){const n={get(i){const s=this.__v_raw,o=$e(s),a=$e(i);e||(An(i,a)&&tt(o,"get",i),tt(o,"get",a));const{has:l}=Si(o),c=t?$o:e?To:nt;if(l.call(o,i))return c(s.get(i));if(l.call(o,a))return c(s.get(a));s!==o&&s.get(i)},get size(){const i=this.__v_raw;return!e&&tt($e(i),"iterate",Hn),Reflect.get(i,"size",i)},has(i){const s=this.__v_raw,o=$e(s),a=$e(i);return e||(An(i,a)&&tt(o,"has",i),tt(o,"has",a)),i===a?s.has(i):s.has(i)||s.has(a)},forEach(i,s){const o=this,a=o.__v_raw,l=$e(a),c=t?$o:e?To:nt;return!e&&tt(l,"iterate",Hn),a.forEach((u,f)=>i.call(s,c(u),c(f),o))}};return Ye(n,e?{add:Ci("add"),set:Ci("set"),delete:Ci("delete"),clear:Ci("clear")}:{add(i){!t&&!Et(i)&&!Wn(i)&&(i=$e(i));const s=$e(this);return Si(s).has.call(s,i)||(s.add(i),rn(s,"add",i,i)),this},set(i,s){!t&&!Et(s)&&!Wn(s)&&(s=$e(s));const o=$e(this),{has:a,get:l}=Si(o);let c=a.call(o,i);c||(i=$e(i),c=a.call(o,i));const u=l.call(o,i);return o.set(i,s),c?An(s,u)&&rn(o,"set",i,s):rn(o,"add",i,s),this},delete(i){const s=$e(this),{has:o,get:a}=Si(s);let l=o.call(s,i);l||(i=$e(i),l=o.call(s,i)),a&&a.call(s,i);const c=s.delete(i);return l&&rn(s,"delete",i,void 0),c},clear(){const i=$e(this),s=i.size!==0,o=i.clear();return s&&rn(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{n[i]=wp(i,e,t)}),n}function va(e,t){const n=Sp(e,t);return(r,i,s)=>i==="__v_isReactive"?!e:i==="__v_isReadonly"?e:i==="__v_raw"?r:Reflect.get(Te(n,i)&&i in r?n:r,i,s)}const Cp={get:va(!1,!1)},Ap={get:va(!1,!0)},Ep={get:va(!0,!1)};const Ju=new WeakMap,Qu=new WeakMap,ef=new WeakMap,$p=new WeakMap;function Tp(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function kp(e){return e.__v_skip||!Object.isExtensible(e)?0:Tp(ep(e))}function wr(e){return Wn(e)?e:ba(e,!1,bp,Cp,Ju)}function ya(e){return ba(e,!1,xp,Ap,Qu)}function Ss(e){return ba(e,!0,_p,Ep,ef)}function ba(e,t,n,r,i){if(!Oe(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const s=i.get(e);if(s)return s;const o=kp(e);if(o===0)return e;const a=new Proxy(e,o===2?r:n);return i.set(e,a),a}function or(e){return Wn(e)?or(e.__v_raw):!!(e&&e.__v_isReactive)}function Wn(e){return!!(e&&e.__v_isReadonly)}function Et(e){return!!(e&&e.__v_isShallow)}function _a(e){return e?!!e.__v_raw:!1}function $e(e){const t=e&&e.__v_raw;return t?$e(t):e}function qi(e){return!Te(e,"__v_skip")&&Object.isExtensible(e)&&Fu(e,"__v_skip",!0),e}const nt=e=>Oe(e)?wr(e):e,To=e=>Oe(e)?Ss(e):e;function We(e){return e?e.__v_isRef===!0:!1}function V(e){return tf(e,!1)}function Ut(e){return tf(e,!0)}function tf(e,t){return We(e)?e:new Op(e,t)}class Op{constructor(t,n){this.dep=new ma,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:$e(t),this._value=n?t:nt(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,r=this.__v_isShallow||Et(t)||Wn(t);t=r?t:$e(t),An(t,n)&&(this._rawValue=t,this._value=r?t:nt(t),this.dep.trigger())}}function b(e){return We(e)?e.value:e}const Rp={get:(e,t,n)=>t==="__v_raw"?e:b(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const i=e[t];return We(i)&&!We(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function nf(e){return or(e)?e:new Proxy(e,Rp)}class Ip{constructor(t,n,r){this._object=t,this._key=n,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0}get value(){const t=this._object[this._key];return this._value=t===void 0?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return hp($e(this._object),this._key)}}class Fp{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function Xi(e,t,n){return We(e)?e:fe(e)?new Fp(e):Oe(e)&&arguments.length>1?Mp(e,t,n):V(e)}function Mp(e,t,n){const r=e[t];return We(r)?r:new Ip(e,t,n)}class Pp{constructor(t,n,r){this.fn=t,this.setter=n,this._value=void 0,this.dep=new ma(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=qr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&De!==this)return Vu(this,!0),!0}get value(){const t=this.dep.track();return Ku(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Np(e,t,n=!1){let r,i;return fe(e)?r=e:(r=e.get,i=e.set),new Pp(r,i,n)}const Ai={},Zi=new WeakMap;let Ln;function Bp(e,t=!1,n=Ln){if(n){let r=Zi.get(n);r||Zi.set(n,r=[]),r.push(e)}}function Lp(e,t,n=Be){const{immediate:r,deep:i,once:s,scheduler:o,augmentJob:a,call:l}=n,c=_=>i?_:Et(_)||i===!1||i===0?sn(_,1):sn(_);let u,f,d,h,p=!1,m=!1;if(We(e)?(f=()=>e.value,p=Et(e)):or(e)?(f=()=>c(e),p=!0):de(e)?(m=!0,p=e.some(_=>or(_)||Et(_)),f=()=>e.map(_=>{if(We(_))return _.value;if(or(_))return c(_);if(fe(_))return l?l(_,2):_()})):fe(e)?t?f=l?()=>l(e,2):e:f=()=>{if(d){Rn();try{d()}finally{In()}}const _=Ln;Ln=u;try{return l?l(e,3,[h]):e(h)}finally{Ln=_}}:f=it,t&&i){const _=f,C=i===!0?1/0:i;f=()=>sn(_(),C)}const x=Du(),y=()=>{u.stop(),x&&x.active&&fa(x.effects,u)};if(s&&t){const _=t;t=(...C)=>{_(...C),y()}}let g=m?new Array(e.length).fill(Ai):Ai;const v=_=>{if(!(!(u.flags&1)||!u.dirty&&!_))if(t){const C=u.run();if(i||p||(m?C.some((A,E)=>An(A,g[E])):An(C,g))){d&&d();const A=Ln;Ln=u;try{const E=[C,g===Ai?void 0:m&&g[0]===Ai?[]:g,h];l?l(t,3,E):t(...E),g=C}finally{Ln=A}}}else u.run()};return a&&a(v),u=new ju(f),u.scheduler=o?()=>o(v,!1):v,h=_=>Bp(_,!1,u),d=u.onStop=()=>{const _=Zi.get(u);if(_){if(l)l(_,4);else for(const C of _)C();Zi.delete(u)}},t?r?v(!0):g=u.run():o?o(v.bind(null,!0),!0):u.run(),y.pause=u.pause.bind(u),y.resume=u.resume.bind(u),y.stop=y,y}function sn(e,t=1/0,n){if(t<=0||!Oe(e)||e.__v_skip||(n=n||new Set,n.has(e)))return e;if(n.add(e),t--,We(e))sn(e.value,t,n);else if(de(e))for(let r=0;r<e.length;r++)sn(e[r],t,n);else if(ku(e)||sr(e))e.forEach(r=>{sn(r,t,n)});else if(Iu(e)){for(const r in e)sn(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&sn(e[r],t,n)}return e}/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function hi(e,t,n,r){try{return r?e(...r):e()}catch(i){Cs(i,t,n)}}function Ft(e,t,n,r){if(fe(e)){const i=hi(e,t,n,r);return i&&Ou(i)&&i.catch(s=>{Cs(s,t,n)}),i}if(de(e)){const i=[];for(let s=0;s<e.length;s++)i.push(Ft(e[s],t,n,r));return i}}function Cs(e,t,n,r=!0){const i=t?t.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||Be;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](e,l,c)===!1)return}a=a.parent}if(s){Rn(),hi(s,null,10,[e,l,c]),In();return}}Dp(e,n,i,r,o)}function Dp(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}const ct=[];let Ht=-1;const ar=[];let vn=null,Jn=0;const rf=Promise.resolve();let Ji=null;function Xe(e){const t=Ji||rf;return e?t.then(this?e.bind(this):e):t}function zp(e){let t=Ht+1,n=ct.length;for(;t<n;){const r=t+n>>>1,i=ct[r],s=Zr(i);s<e||s===e&&i.flags&2?t=r+1:n=r}return t}function xa(e){if(!(e.flags&1)){const t=Zr(e),n=ct[ct.length-1];!n||!(e.flags&2)&&t>=Zr(n)?ct.push(e):ct.splice(zp(t),0,e),e.flags|=1,sf()}}function sf(){Ji||(Ji=rf.then(af))}function jp(e){de(e)?ar.push(...e):vn&&e.id===-1?vn.splice(Jn+1,0,e):e.flags&1||(ar.push(e),e.flags|=1),sf()}function gl(e,t,n=Ht+1){for(;n<ct.length;n++){const r=ct[n];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;ct.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function of(e){if(ar.length){const t=[...new Set(ar)].sort((n,r)=>Zr(n)-Zr(r));if(ar.length=0,vn){vn.push(...t);return}for(vn=t,Jn=0;Jn<vn.length;Jn++){const n=vn[Jn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}vn=null,Jn=0}}const Zr=e=>e.id==null?e.flags&2?-1:1/0:e.id;function af(e){try{for(Ht=0;Ht<ct.length;Ht++){const t=ct[Ht];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),hi(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Ht<ct.length;Ht++){const t=ct[Ht];t&&(t.flags&=-2)}Ht=-1,ct.length=0,of(),Ji=null,(ct.length||ar.length)&&af()}}let Ge=null,lf=null;function Qi(e){const t=Ge;return Ge=e,lf=e&&e.type.__scopeId||null,t}function ue(e,t=Ge,n){if(!t||e._n)return e;const r=(...i)=>{r._d&&kl(-1);const s=Qi(t);let o;try{o=e(...i)}finally{Qi(s),r._d&&kl(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function pi(e,t){if(Ge===null)return e;const n=Ts(Ge),r=e.dirs||(e.dirs=[]);for(let i=0;i<t.length;i++){let[s,o,a,l=Be]=t[i];s&&(fe(s)&&(s={mounted:s,updated:s}),s.deep&&sn(o),r.push({dir:s,instance:n,value:o,oldValue:void 0,arg:a,modifiers:l}))}return e}function Fn(e,t,n,r){const i=e.dirs,s=t&&t.dirs;for(let o=0;o<i.length;o++){const a=i[o];s&&(a.oldValue=s[o].value);let l=a.dir[r];l&&(Rn(),Ft(l,n,8,[e.el,a,e,t]),In())}}const cf=Symbol("_vte"),uf=e=>e.__isTeleport,Vr=e=>e&&(e.disabled||e.disabled===""),ml=e=>e&&(e.defer||e.defer===""),vl=e=>typeof SVGElement<"u"&&e instanceof SVGElement,yl=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,ko=(e,t)=>{const n=e&&e.to;return Ce(n)?t?t(n):null:n},ff={name:"Teleport",__isTeleport:!0,process(e,t,n,r,i,s,o,a,l,c){const{mc:u,pc:f,pbc:d,o:{insert:h,querySelector:p,createText:m,createComment:x}}=c,y=Vr(t.props);let{shapeFlag:g,children:v,dynamicChildren:_}=t;if(e==null){const C=t.el=m(""),A=t.anchor=m("");h(C,n,r),h(A,n,r);const E=($,M)=>{g&16&&(i&&i.isCE&&(i.ce._teleportTarget=$),u(v,$,M,i,s,o,a,l))},O=()=>{const $=t.target=ko(t.props,p),M=df($,t,m,h);$&&(o!=="svg"&&vl($)?o="svg":o!=="mathml"&&yl($)&&(o="mathml"),y||(E($,M),Di(t,!1)))};y&&(E(n,A),Di(t,!0)),ml(t.props)?at(()=>{O(),t.el.__isMounted=!0},s):O()}else{if(ml(t.props)&&!e.el.__isMounted){at(()=>{ff.process(e,t,n,r,i,s,o,a,l,c),delete e.el.__isMounted},s);return}t.el=e.el,t.targetStart=e.targetStart;const C=t.anchor=e.anchor,A=t.target=e.target,E=t.targetAnchor=e.targetAnchor,O=Vr(e.props),$=O?n:A,M=O?C:E;if(o==="svg"||vl(A)?o="svg":(o==="mathml"||yl(A))&&(o="mathml"),_?(d(e.dynamicChildren,_,$,i,s,o,a),Aa(e,t,!0)):l||f(e,t,$,M,i,s,o,a,!1),y)O?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Ei(t,n,C,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const R=t.target=ko(t.props,p);R&&Ei(t,R,null,c,0)}else O&&Ei(t,A,E,c,1);Di(t,y)}},remove(e,t,n,{um:r,o:{remove:i}},s){const{shapeFlag:o,children:a,anchor:l,targetStart:c,targetAnchor:u,target:f,props:d}=e;if(f&&(i(c),i(u)),s&&i(l),o&16){const h=s||!Vr(d);for(let p=0;p<a.length;p++){const m=a[p];r(m,t,n,h,!!m.dynamicChildren)}}},move:Ei,hydrate:Hp};function Ei(e,t,n,{o:{insert:r},m:i},s=2){s===0&&r(e.targetAnchor,t,n);const{el:o,anchor:a,shapeFlag:l,children:c,props:u}=e,f=s===2;if(f&&r(o,t,n),(!f||Vr(u))&&l&16)for(let d=0;d<c.length;d++)i(c[d],t,n,2);f&&r(a,t,n)}function Hp(e,t,n,r,i,s,{o:{nextSibling:o,parentNode:a,querySelector:l,insert:c,createText:u}},f){const d=t.target=ko(t.props,l);if(d){const h=Vr(t.props),p=d._lpa||d.firstChild;if(t.shapeFlag&16)if(h)t.anchor=f(o(e),t,a(e),n,r,i,s),t.targetStart=p,t.targetAnchor=p&&o(p);else{t.anchor=o(e);let m=p;for(;m;){if(m&&m.nodeType===8){if(m.data==="teleport start anchor")t.targetStart=m;else if(m.data==="teleport anchor"){t.targetAnchor=m,d._lpa=t.targetAnchor&&o(t.targetAnchor);break}}m=o(m)}t.targetAnchor||df(d,t,u,c),f(p&&o(p),t,d,n,r,i,s)}Di(t,h)}return t.anchor&&o(t.anchor)}const Vp=ff;function Di(e,t){const n=e.ctx;if(n&&n.ut){let r,i;for(t?(r=e.el,i=e.anchor):(r=e.targetStart,i=e.targetAnchor);r&&r!==i;)r.nodeType===1&&r.setAttribute("data-v-owner",n.uid),r=r.nextSibling;n.ut()}}function df(e,t,n,r){const i=t.targetStart=n(""),s=t.targetAnchor=n("");return i[cf]=s,e&&(r(i,e),r(s,e)),s}const yn=Symbol("_leaveCb"),$i=Symbol("_enterCb");function Wp(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Le(()=>{e.isMounted=!0}),qn(()=>{e.isUnmounting=!0}),e}const At=[Function,Array],hf={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:At,onEnter:At,onAfterEnter:At,onEnterCancelled:At,onBeforeLeave:At,onLeave:At,onAfterLeave:At,onLeaveCancelled:At,onBeforeAppear:At,onAppear:At,onAfterAppear:At,onAppearCancelled:At},pf=e=>{const t=e.subTree;return t.component?pf(t.component):t},Up={name:"BaseTransition",props:hf,setup(e,{slots:t}){const n=st(),r=Wp();return()=>{const i=t.default&&vf(t.default(),!0);if(!i||!i.length)return;const s=gf(i),o=$e(e),{mode:a}=o;if(r.isLeaving)return Qs(s);const l=bl(s);if(!l)return Qs(s);let c=Oo(l,o,r,n,f=>c=f);l.type!==ut&&Jr(l,c);let u=n.subTree&&bl(n.subTree);if(u&&u.type!==ut&&!Dn(l,u)&&pf(n).type!==ut){let f=Oo(u,o,r,n);if(Jr(u,f),a==="out-in"&&l.type!==ut)return r.isLeaving=!0,f.afterLeave=()=>{r.isLeaving=!1,n.job.flags&8||n.update(),delete f.afterLeave,u=void 0},Qs(s);a==="in-out"&&l.type!==ut?f.delayLeave=(d,h,p)=>{const m=mf(r,u);m[String(u.key)]=u,d[yn]=()=>{h(),d[yn]=void 0,delete c.delayedLeave,u=void 0},c.delayedLeave=()=>{p(),delete c.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return s}}};function gf(e){let t=e[0];if(e.length>1){for(const n of e)if(n.type!==ut){t=n;break}}return t}const Kp=Up;function mf(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function Oo(e,t,n,r,i){const{appear:s,mode:o,persisted:a=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:d,onLeave:h,onAfterLeave:p,onLeaveCancelled:m,onBeforeAppear:x,onAppear:y,onAfterAppear:g,onAppearCancelled:v}=t,_=String(e.key),C=mf(n,e),A=($,M)=>{$&&Ft($,r,9,M)},E=($,M)=>{const R=M[1];A($,M),de($)?$.every(k=>k.length<=1)&&R():$.length<=1&&R()},O={mode:o,persisted:a,beforeEnter($){let M=l;if(!n.isMounted)if(s)M=x||l;else return;$[yn]&&$[yn](!0);const R=C[_];R&&Dn(e,R)&&R.el[yn]&&R.el[yn](),A(M,[$])},enter($){let M=c,R=u,k=f;if(!n.isMounted)if(s)M=y||c,R=g||u,k=v||f;else return;let D=!1;const ce=$[$i]=le=>{D||(D=!0,le?A(k,[$]):A(R,[$]),O.delayedLeave&&O.delayedLeave(),$[$i]=void 0)};M?E(M,[$,ce]):ce()},leave($,M){const R=String(e.key);if($[$i]&&$[$i](!0),n.isUnmounting)return M();A(d,[$]);let k=!1;const D=$[yn]=ce=>{k||(k=!0,M(),ce?A(m,[$]):A(p,[$]),$[yn]=void 0,C[R]===e&&delete C[R])};C[R]=e,h?E(h,[$,D]):D()},clone($){const M=Oo($,t,n,r,i);return i&&i(M),M}};return O}function Qs(e){if(As(e))return e=En(e),e.children=null,e}function bl(e){if(!As(e))return uf(e.type)&&e.children?gf(e.children):e;const{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&fe(n.default))return n.default()}}function Jr(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Jr(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function vf(e,t=!1,n){let r=[],i=0;for(let s=0;s<e.length;s++){let o=e[s];const a=n==null?o.key:String(n)+String(o.key!=null?o.key:s);o.type===Fe?(o.patchFlag&128&&i++,r=r.concat(vf(o.children,t,a))):(t||o.type!==ut)&&r.push(a!=null?En(o,{key:a}):o)}if(i>1)for(let s=0;s<r.length;s++)r[s].patchFlag=-2;return r}/*! #__NO_SIDE_EFFECTS__ */function U(e,t){return fe(e)?Ye({name:e.name},t,{setup:e}):e}function yf(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function es(e,t,n,r,i=!1){if(de(e)){e.forEach((p,m)=>es(p,t&&(de(t)?t[m]:t),n,r,i));return}if(lr(r)&&!i){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&es(e,t,n,r.component.subTree);return}const s=r.shapeFlag&4?Ts(r.component):r.el,o=i?null:s,{i:a,r:l}=e,c=t&&t.r,u=a.refs===Be?a.refs={}:a.refs,f=a.setupState,d=$e(f),h=f===Be?()=>!1:p=>Te(d,p);if(c!=null&&c!==l&&(Ce(c)?(u[c]=null,h(c)&&(f[c]=null)):We(c)&&(c.value=null)),fe(l))hi(l,a,12,[o,u]);else{const p=Ce(l),m=We(l);if(p||m){const x=()=>{if(e.f){const y=p?h(l)?f[l]:u[l]:l.value;i?de(y)&&fa(y,s):de(y)?y.includes(s)||y.push(s):p?(u[l]=[s],h(l)&&(f[l]=u[l])):(l.value=[s],e.k&&(u[e.k]=l.value))}else p?(u[l]=o,h(l)&&(f[l]=o)):m&&(l.value=o,e.k&&(u[e.k]=o))};o?(x.id=-1,at(x,n)):x()}}}xs().requestIdleCallback;xs().cancelIdleCallback;const lr=e=>!!e.type.__asyncLoader,As=e=>e.type.__isKeepAlive;function Gp(e,t){bf(e,"a",t)}function Yp(e,t){bf(e,"da",t)}function bf(e,t,n=Ze){const r=e.__wdc||(e.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return e()});if(Es(t,r,n),n){let i=n.parent;for(;i&&i.parent;)As(i.parent.vnode)&&qp(r,t,n,i),i=i.parent}}function qp(e,t,n,r){const i=Es(t,e,r,!0);Qe(()=>{fa(r[t],i)},n)}function Es(e,t,n=Ze,r=!1){if(n){const i=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...o)=>{Rn();const a=vi(n),l=Ft(t,n,e,o);return a(),In(),l});return r?i.unshift(s):i.push(s),s}}const dn=e=>(t,n=Ze)=>{(!ei||e==="sp")&&Es(e,(...r)=>t(...r),n)},Xp=dn("bm"),Le=dn("m"),Zp=dn("bu"),wa=dn("u"),qn=dn("bum"),Qe=dn("um"),Jp=dn("sp"),Qp=dn("rtg"),eg=dn("rtc");function tg(e,t=Ze){Es("ec",e,t)}const _f="components";function ng(e,t){return wf(_f,e,!0,t)||e}const xf=Symbol.for("v-ndc");function _t(e){return Ce(e)?wf(_f,e,!1)||e:e||xf}function wf(e,t,n=!0,r=!1){const i=Ge||Ze;if(i){const s=i.type;{const a=zg(s,!1);if(a&&(a===t||a===St(t)||a===di(St(t))))return s}const o=_l(i[e]||s[e],t)||_l(i.appContext[e],t);return!o&&r?s:o}}function _l(e,t){return e&&(e[t]||e[St(t)]||e[di(St(t))])}function fr(e,t,n,r){let i;const s=n,o=de(e);if(o||Ce(e)){const a=o&&or(e);let l=!1;a&&(l=!Et(e),e=ws(e)),i=new Array(e.length);for(let c=0,u=e.length;c<u;c++)i[c]=t(l?nt(e[c]):e[c],c,void 0,s)}else if(typeof e=="number"){i=new Array(e);for(let a=0;a<e;a++)i[a]=t(a+1,a,void 0,s)}else if(Oe(e))if(e[Symbol.iterator])i=Array.from(e,(a,l)=>t(a,l,void 0,s));else{const a=Object.keys(e);i=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];i[l]=t(e[u],u,l,s)}}else i=[];return i}function rg(e,t){for(let n=0;n<t.length;n++){const r=t[n];if(de(r))for(let i=0;i<r.length;i++)e[r[i].name]=r[i].fn;else r&&(e[r.name]=r.key?(...i)=>{const s=r.fn(...i);return s&&(s.key=r.key),s}:r.fn)}return e}function pe(e,t,n={},r,i){if(Ge.ce||Ge.parent&&lr(Ge.parent)&&Ge.parent.ce)return t!=="default"&&(n.name=t),P(),Se(Fe,null,[Z("slot",n,r&&r())],64);let s=e[t];s&&s._c&&(s._d=!1),P();const o=s&&Sf(s(n)),a=n.key||o&&o.key,l=Se(Fe,{key:(a&&!fn(a)?a:`_${t}`)+(!o&&r?"_fb":"")},o||(r?r():[]),o&&e._===1?64:-2);return!i&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),s&&s._c&&(s._d=!0),l}function Sf(e){return e.some(t=>qt(t)?!(t.type===ut||t.type===Fe&&!Sf(t.children)):!0)?e:null}const Ro=e=>e?Wf(e)?Ts(e):Ro(e.parent):null,Wr=Ye(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ro(e.parent),$root:e=>Ro(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Ef(e),$forceUpdate:e=>e.f||(e.f=()=>{xa(e.update)}),$nextTick:e=>e.n||(e.n=Xe.bind(e.proxy)),$watch:e=>Cg.bind(e)}),eo=(e,t)=>e!==Be&&!e.__isScriptSetup&&Te(e,t),ig={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:r,data:i,props:s,accessCache:o,type:a,appContext:l}=e;let c;if(t[0]!=="$"){const h=o[t];if(h!==void 0)switch(h){case 1:return r[t];case 2:return i[t];case 4:return n[t];case 3:return s[t]}else{if(eo(r,t))return o[t]=1,r[t];if(i!==Be&&Te(i,t))return o[t]=2,i[t];if((c=e.propsOptions[0])&&Te(c,t))return o[t]=3,s[t];if(n!==Be&&Te(n,t))return o[t]=4,n[t];Io&&(o[t]=0)}}const u=Wr[t];let f,d;if(u)return t==="$attrs"&&tt(e.attrs,"get",""),u(e);if((f=a.__cssModules)&&(f=f[t]))return f;if(n!==Be&&Te(n,t))return o[t]=4,n[t];if(d=l.config.globalProperties,Te(d,t))return d[t]},set({_:e},t,n){const{data:r,setupState:i,ctx:s}=e;return eo(i,t)?(i[t]=n,!0):r!==Be&&Te(r,t)?(r[t]=n,!0):Te(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:i,propsOptions:s}},o){let a;return!!n[o]||e!==Be&&Te(e,o)||eo(t,o)||(a=s[0])&&Te(a,o)||Te(r,o)||Te(Wr,o)||Te(i.config.globalProperties,o)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:Te(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function gi(){return Cf().slots}function Sa(){return Cf().attrs}function Cf(){const e=st();return e.setupContext||(e.setupContext=Kf(e))}function xl(e){return de(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Io=!0;function sg(e){const t=Ef(e),n=e.proxy,r=e.ctx;Io=!1,t.beforeCreate&&wl(t.beforeCreate,e,"bc");const{data:i,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:d,beforeUpdate:h,updated:p,activated:m,deactivated:x,beforeDestroy:y,beforeUnmount:g,destroyed:v,unmounted:_,render:C,renderTracked:A,renderTriggered:E,errorCaptured:O,serverPrefetch:$,expose:M,inheritAttrs:R,components:k,directives:D,filters:ce}=t;if(c&&og(c,r,null),o)for(const oe in o){const ne=o[oe];fe(ne)&&(r[oe]=ne.bind(n))}if(i){const oe=i.call(n,n);Oe(oe)&&(e.data=wr(oe))}if(Io=!0,s)for(const oe in s){const ne=s[oe],W=fe(ne)?ne.bind(n,n):fe(ne.get)?ne.get.bind(n,n):it,ge=!fe(ne)&&fe(ne.set)?ne.set.bind(n):it,Re=B({get:W,set:ge});Object.defineProperty(r,oe,{enumerable:!0,configurable:!0,get:()=>Re.value,set:Ae=>Re.value=Ae})}if(a)for(const oe in a)Af(a[oe],r,n,oe);if(l){const oe=fe(l)?l.call(n):l;Reflect.ownKeys(oe).forEach(ne=>{Kt(ne,oe[ne])})}u&&wl(u,e,"c");function se(oe,ne){de(ne)?ne.forEach(W=>oe(W.bind(n))):ne&&oe(ne.bind(n))}if(se(Xp,f),se(Le,d),se(Zp,h),se(wa,p),se(Gp,m),se(Yp,x),se(tg,O),se(eg,A),se(Qp,E),se(qn,g),se(Qe,_),se(Jp,$),de(M))if(M.length){const oe=e.exposed||(e.exposed={});M.forEach(ne=>{Object.defineProperty(oe,ne,{get:()=>n[ne],set:W=>n[ne]=W})})}else e.exposed||(e.exposed={});C&&e.render===it&&(e.render=C),R!=null&&(e.inheritAttrs=R),k&&(e.components=k),D&&(e.directives=D),$&&yf(e)}function og(e,t,n=it){de(e)&&(e=Fo(e));for(const r in e){const i=e[r];let s;Oe(i)?"default"in i?s=Me(i.from||r,i.default,!0):s=Me(i.from||r):s=Me(i),We(s)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):t[r]=s}}function wl(e,t,n){Ft(de(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function Af(e,t,n,r){let i=r.includes(".")?Df(n,r):()=>n[r];if(Ce(e)){const s=t[e];fe(s)&&ke(i,s)}else if(fe(e))ke(i,e.bind(n));else if(Oe(e))if(de(e))e.forEach(s=>Af(s,t,n,r));else{const s=fe(e.handler)?e.handler.bind(n):t[e.handler];fe(s)&&ke(i,s,e)}}function Ef(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:s,config:{optionMergeStrategies:o}}=e.appContext,a=s.get(t);let l;return a?l=a:!i.length&&!n&&!r?l=t:(l={},i.length&&i.forEach(c=>ts(l,c,o,!0)),ts(l,t,o)),Oe(t)&&s.set(t,l),l}function ts(e,t,n,r=!1){const{mixins:i,extends:s}=t;s&&ts(e,s,n,!0),i&&i.forEach(o=>ts(e,o,n,!0));for(const o in t)if(!(r&&o==="expose")){const a=ag[o]||n&&n[o];e[o]=a?a(e[o],t[o]):t[o]}return e}const ag={data:Sl,props:Cl,emits:Cl,methods:Mr,computed:Mr,beforeCreate:ot,created:ot,beforeMount:ot,mounted:ot,beforeUpdate:ot,updated:ot,beforeDestroy:ot,beforeUnmount:ot,destroyed:ot,unmounted:ot,activated:ot,deactivated:ot,errorCaptured:ot,serverPrefetch:ot,components:Mr,directives:Mr,watch:cg,provide:Sl,inject:lg};function Sl(e,t){return t?e?function(){return Ye(fe(e)?e.call(this,this):e,fe(t)?t.call(this,this):t)}:t:e}function lg(e,t){return Mr(Fo(e),Fo(t))}function Fo(e){if(de(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function ot(e,t){return e?[...new Set([].concat(e,t))]:t}function Mr(e,t){return e?Ye(Object.create(null),e,t):t}function Cl(e,t){return e?de(e)&&de(t)?[...new Set([...e,...t])]:Ye(Object.create(null),xl(e),xl(t??{})):t}function cg(e,t){if(!e)return t;if(!t)return e;const n=Ye(Object.create(null),e);for(const r in t)n[r]=ot(e[r],t[r]);return n}function $f(){return{app:null,config:{isNativeTag:Jh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ug=0;function fg(e,t){return function(r,i=null){fe(r)||(r=Ye({},r)),i!=null&&!Oe(i)&&(i=null);const s=$f(),o=new WeakSet,a=[];let l=!1;const c=s.app={_uid:ug++,_component:r,_props:i,_container:null,_context:s,_instance:null,version:Hg,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&fe(u.install)?(o.add(u),u.install(c,...f)):fe(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,d){if(!l){const h=c._ceVNode||Z(r,i);return h.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),e(h,u,d),l=!0,c._container=u,u.__vue_app__=c,Ts(h.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Ft(a,c._instance,16),e(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=cr;cr=c;try{return u()}finally{cr=f}}};return c}}let cr=null;function Kt(e,t){if(Ze){let n=Ze.provides;const r=Ze.parent&&Ze.parent.provides;r===n&&(n=Ze.provides=Object.create(r)),n[e]=t}}function Me(e,t,n=!1){const r=Ze||Ge;if(r||cr){const i=cr?cr._context.provides:r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&fe(t)?t.call(r&&r.proxy):t}}const Tf={},kf=()=>Object.create(Tf),Of=e=>Object.getPrototypeOf(e)===Tf;function dg(e,t,n,r=!1){const i={},s=kf();e.propsDefaults=Object.create(null),Rf(e,t,i,s);for(const o in e.propsOptions[0])o in i||(i[o]=void 0);n?e.props=r?i:ya(i):e.type.props?e.props=i:e.props=s,e.attrs=s}function hg(e,t,n,r){const{props:i,attrs:s,vnode:{patchFlag:o}}=e,a=$e(i),[l]=e.propsOptions;let c=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=e.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if($s(e.emitsOptions,d))continue;const h=t[d];if(l)if(Te(s,d))h!==s[d]&&(s[d]=h,c=!0);else{const p=St(d);i[p]=Mo(l,a,p,h,e,!1)}else h!==s[d]&&(s[d]=h,c=!0)}}}else{Rf(e,t,i,s)&&(c=!0);let u;for(const f in a)(!t||!Te(t,f)&&((u=On(f))===f||!Te(t,u)))&&(l?n&&(n[f]!==void 0||n[u]!==void 0)&&(i[f]=Mo(l,a,f,void 0,e,!0)):delete i[f]);if(s!==a)for(const f in s)(!t||!Te(t,f))&&(delete s[f],c=!0)}c&&rn(e.attrs,"set","")}function Rf(e,t,n,r){const[i,s]=e.propsOptions;let o=!1,a;if(t)for(let l in t){if(zr(l))continue;const c=t[l];let u;i&&Te(i,u=St(l))?!s||!s.includes(u)?n[u]=c:(a||(a={}))[u]=c:$s(e.emitsOptions,l)||(!(l in r)||c!==r[l])&&(r[l]=c,o=!0)}if(s){const l=$e(n),c=a||Be;for(let u=0;u<s.length;u++){const f=s[u];n[f]=Mo(i,l,f,c[f],e,!Te(c,f))}}return o}function Mo(e,t,n,r,i,s){const o=e[n];if(o!=null){const a=Te(o,"default");if(a&&r===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&fe(l)){const{propsDefaults:c}=i;if(n in c)r=c[n];else{const u=vi(i);r=c[n]=l.call(null,t),u()}}else r=l;i.ce&&i.ce._setProp(n,r)}o[0]&&(s&&!a?r=!1:o[1]&&(r===""||r===On(n))&&(r=!0))}return r}const pg=new WeakMap;function If(e,t,n=!1){const r=n?pg:t.propsCache,i=r.get(e);if(i)return i;const s=e.props,o={},a=[];let l=!1;if(!fe(e)){const u=f=>{l=!0;const[d,h]=If(f,t,!0);Ye(o,d),h&&a.push(...h)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!s&&!l)return Oe(e)&&r.set(e,ir),ir;if(de(s))for(let u=0;u<s.length;u++){const f=St(s[u]);Al(f)&&(o[f]=Be)}else if(s)for(const u in s){const f=St(u);if(Al(f)){const d=s[u],h=o[f]=de(d)||fe(d)?{type:d}:Ye({},d),p=h.type;let m=!1,x=!0;if(de(p))for(let y=0;y<p.length;++y){const g=p[y],v=fe(g)&&g.name;if(v==="Boolean"){m=!0;break}else v==="String"&&(x=!1)}else m=fe(p)&&p.name==="Boolean";h[0]=m,h[1]=x,(m||Te(h,"default"))&&a.push(f)}}const c=[o,a];return Oe(e)&&r.set(e,c),c}function Al(e){return e[0]!=="$"&&!zr(e)}const Ff=e=>e[0]==="_"||e==="$stable",Ca=e=>de(e)?e.map(Wt):[Wt(e)],gg=(e,t,n)=>{if(t._n)return t;const r=ue((...i)=>Ca(t(...i)),n);return r._c=!1,r},Mf=(e,t,n)=>{const r=e._ctx;for(const i in e){if(Ff(i))continue;const s=e[i];if(fe(s))t[i]=gg(i,s,r);else if(s!=null){const o=Ca(s);t[i]=()=>o}}},Pf=(e,t)=>{const n=Ca(t);e.slots.default=()=>n},Nf=(e,t,n)=>{for(const r in t)(n||r!=="_")&&(e[r]=t[r])},mg=(e,t,n)=>{const r=e.slots=kf();if(e.vnode.shapeFlag&32){const i=t._;i?(Nf(r,t,n),n&&Fu(r,"_",i,!0)):Mf(t,r)}else t&&Pf(e,t)},vg=(e,t,n)=>{const{vnode:r,slots:i}=e;let s=!0,o=Be;if(r.shapeFlag&32){const a=t._;a?n&&a===1?s=!1:Nf(i,t,n):(s=!t.$stable,Mf(t,i)),o=t}else t&&(Pf(e,t),o={default:1});if(s)for(const a in i)!Ff(a)&&o[a]==null&&delete i[a]},at=Rg;function yg(e){return bg(e)}function bg(e,t){const n=xs();n.__VUE__=!0;const{insert:r,remove:i,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:d,setScopeId:h=it,insertStaticContent:p}=e,m=(w,S,T,N=null,z=null,L=null,X=void 0,q=null,Y=!!S.dynamicChildren)=>{if(w===S)return;w&&!Dn(w,S)&&(N=F(w),Ae(w,z,L,!0),w=null),S.patchFlag===-2&&(Y=!1,S.dynamicChildren=null);const{type:j,ref:he,shapeFlag:Q}=S;switch(j){case mi:x(w,S,T,N);break;case ut:y(w,S,T,N);break;case no:w==null&&g(S,T,N,X);break;case Fe:k(w,S,T,N,z,L,X,q,Y);break;default:Q&1?C(w,S,T,N,z,L,X,q,Y):Q&6?D(w,S,T,N,z,L,X,q,Y):(Q&64||Q&128)&&j.process(w,S,T,N,z,L,X,q,Y,ee)}he!=null&&z&&es(he,w&&w.ref,L,S||w,!S)},x=(w,S,T,N)=>{if(w==null)r(S.el=a(S.children),T,N);else{const z=S.el=w.el;S.children!==w.children&&c(z,S.children)}},y=(w,S,T,N)=>{w==null?r(S.el=l(S.children||""),T,N):S.el=w.el},g=(w,S,T,N)=>{[w.el,w.anchor]=p(w.children,S,T,N,w.el,w.anchor)},v=({el:w,anchor:S},T,N)=>{let z;for(;w&&w!==S;)z=d(w),r(w,T,N),w=z;r(S,T,N)},_=({el:w,anchor:S})=>{let T;for(;w&&w!==S;)T=d(w),i(w),w=T;i(S)},C=(w,S,T,N,z,L,X,q,Y)=>{S.type==="svg"?X="svg":S.type==="math"&&(X="mathml"),w==null?A(S,T,N,z,L,X,q,Y):$(w,S,z,L,X,q,Y)},A=(w,S,T,N,z,L,X,q)=>{let Y,j;const{props:he,shapeFlag:Q,transition:I,dirs:te}=w;if(Y=w.el=o(w.type,L,he&&he.is,he),Q&8?u(Y,w.children):Q&16&&O(w.children,Y,null,N,z,to(w,L),X,q),te&&Fn(w,null,N,"created"),E(Y,w,w.scopeId,X,N),he){for(const Pe in he)Pe!=="value"&&!zr(Pe)&&s(Y,Pe,null,he[Pe],L,N);"value"in he&&s(Y,"value",null,he.value,L),(j=he.onVnodeBeforeMount)&&jt(j,N,w)}te&&Fn(w,null,N,"beforeMount");const me=_g(z,I);me&&I.beforeEnter(Y),r(Y,S,T),((j=he&&he.onVnodeMounted)||me||te)&&at(()=>{j&&jt(j,N,w),me&&I.enter(Y),te&&Fn(w,null,N,"mounted")},z)},E=(w,S,T,N,z)=>{if(T&&h(w,T),N)for(let L=0;L<N.length;L++)h(w,N[L]);if(z){let L=z.subTree;if(S===L||jf(L.type)&&(L.ssContent===S||L.ssFallback===S)){const X=z.vnode;E(w,X,X.scopeId,X.slotScopeIds,z.parent)}}},O=(w,S,T,N,z,L,X,q,Y=0)=>{for(let j=Y;j<w.length;j++){const he=w[j]=q?bn(w[j]):Wt(w[j]);m(null,he,S,T,N,z,L,X,q)}},$=(w,S,T,N,z,L,X)=>{const q=S.el=w.el;let{patchFlag:Y,dynamicChildren:j,dirs:he}=S;Y|=w.patchFlag&16;const Q=w.props||Be,I=S.props||Be;let te;if(T&&Mn(T,!1),(te=I.onVnodeBeforeUpdate)&&jt(te,T,S,w),he&&Fn(S,w,T,"beforeUpdate"),T&&Mn(T,!0),(Q.innerHTML&&I.innerHTML==null||Q.textContent&&I.textContent==null)&&u(q,""),j?M(w.dynamicChildren,j,q,T,N,to(S,z),L):X||ne(w,S,q,null,T,N,to(S,z),L,!1),Y>0){if(Y&16)R(q,Q,I,T,z);else if(Y&2&&Q.class!==I.class&&s(q,"class",null,I.class,z),Y&4&&s(q,"style",Q.style,I.style,z),Y&8){const me=S.dynamicProps;for(let Pe=0;Pe<me.length;Pe++){const Ee=me[Pe],vt=Q[Ee],dt=I[Ee];(dt!==vt||Ee==="value")&&s(q,Ee,vt,dt,z,T)}}Y&1&&w.children!==S.children&&u(q,S.children)}else!X&&j==null&&R(q,Q,I,T,z);((te=I.onVnodeUpdated)||he)&&at(()=>{te&&jt(te,T,S,w),he&&Fn(S,w,T,"updated")},N)},M=(w,S,T,N,z,L,X)=>{for(let q=0;q<S.length;q++){const Y=w[q],j=S[q],he=Y.el&&(Y.type===Fe||!Dn(Y,j)||Y.shapeFlag&70)?f(Y.el):T;m(Y,j,he,null,N,z,L,X,!0)}},R=(w,S,T,N,z)=>{if(S!==T){if(S!==Be)for(const L in S)!zr(L)&&!(L in T)&&s(w,L,S[L],null,z,N);for(const L in T){if(zr(L))continue;const X=T[L],q=S[L];X!==q&&L!=="value"&&s(w,L,q,X,z,N)}"value"in T&&s(w,"value",S.value,T.value,z)}},k=(w,S,T,N,z,L,X,q,Y)=>{const j=S.el=w?w.el:a(""),he=S.anchor=w?w.anchor:a("");let{patchFlag:Q,dynamicChildren:I,slotScopeIds:te}=S;te&&(q=q?q.concat(te):te),w==null?(r(j,T,N),r(he,T,N),O(S.children||[],T,he,z,L,X,q,Y)):Q>0&&Q&64&&I&&w.dynamicChildren?(M(w.dynamicChildren,I,T,z,L,X,q),(S.key!=null||z&&S===z.subTree)&&Aa(w,S,!0)):ne(w,S,T,he,z,L,X,q,Y)},D=(w,S,T,N,z,L,X,q,Y)=>{S.slotScopeIds=q,w==null?S.shapeFlag&512?z.ctx.activate(S,T,N,X,Y):ce(S,T,N,z,L,X,Y):le(w,S,Y)},ce=(w,S,T,N,z,L,X)=>{const q=w.component=Ng(w,N,z);if(As(w)&&(q.ctx.renderer=ee),Bg(q,!1,X),q.asyncDep){if(z&&z.registerDep(q,se,X),!w.el){const Y=q.subTree=Z(ut);y(null,Y,S,T)}}else se(q,w,S,T,z,L,X)},le=(w,S,T)=>{const N=S.component=w.component;if(kg(w,S,T))if(N.asyncDep&&!N.asyncResolved){oe(N,S,T);return}else N.next=S,N.update();else S.el=w.el,N.vnode=S},se=(w,S,T,N,z,L,X)=>{const q=()=>{if(w.isMounted){let{next:Q,bu:I,u:te,parent:me,vnode:Pe}=w;{const Dt=Bf(w);if(Dt){Q&&(Q.el=Pe.el,oe(w,Q,X)),Dt.asyncDep.then(()=>{w.isUnmounted||q()});return}}let Ee=Q,vt;Mn(w,!1),Q?(Q.el=Pe.el,oe(w,Q,X)):Q=Pe,I&&Ys(I),(vt=Q.props&&Q.props.onVnodeBeforeUpdate)&&jt(vt,me,Q,Pe),Mn(w,!0);const dt=$l(w),Lt=w.subTree;w.subTree=dt,m(Lt,dt,f(Lt.el),F(Lt),w,z,L),Q.el=dt.el,Ee===null&&Og(w,dt.el),te&&at(te,z),(vt=Q.props&&Q.props.onVnodeUpdated)&&at(()=>jt(vt,me,Q,Pe),z)}else{let Q;const{el:I,props:te}=S,{bm:me,m:Pe,parent:Ee,root:vt,type:dt}=w,Lt=lr(S);Mn(w,!1),me&&Ys(me),!Lt&&(Q=te&&te.onVnodeBeforeMount)&&jt(Q,Ee,S),Mn(w,!0);{vt.ce&&vt.ce._injectChildStyle(dt);const Dt=w.subTree=$l(w);m(null,Dt,T,N,w,z,L),S.el=Dt.el}if(Pe&&at(Pe,z),!Lt&&(Q=te&&te.onVnodeMounted)){const Dt=S;at(()=>jt(Q,Ee,Dt),z)}(S.shapeFlag&256||Ee&&lr(Ee.vnode)&&Ee.vnode.shapeFlag&256)&&w.a&&at(w.a,z),w.isMounted=!0,S=T=N=null}};w.scope.on();const Y=w.effect=new ju(q);w.scope.off();const j=w.update=Y.run.bind(Y),he=w.job=Y.runIfDirty.bind(Y);he.i=w,he.id=w.uid,Y.scheduler=()=>xa(he),Mn(w,!0),j()},oe=(w,S,T)=>{S.component=w;const N=w.vnode.props;w.vnode=S,w.next=null,hg(w,S.props,N,T),vg(w,S.children,T),Rn(),gl(w),In()},ne=(w,S,T,N,z,L,X,q,Y=!1)=>{const j=w&&w.children,he=w?w.shapeFlag:0,Q=S.children,{patchFlag:I,shapeFlag:te}=S;if(I>0){if(I&128){ge(j,Q,T,N,z,L,X,q,Y);return}else if(I&256){W(j,Q,T,N,z,L,X,q,Y);return}}te&8?(he&16&&we(j,z,L),Q!==j&&u(T,Q)):he&16?te&16?ge(j,Q,T,N,z,L,X,q,Y):we(j,z,L,!0):(he&8&&u(T,""),te&16&&O(Q,T,N,z,L,X,q,Y))},W=(w,S,T,N,z,L,X,q,Y)=>{w=w||ir,S=S||ir;const j=w.length,he=S.length,Q=Math.min(j,he);let I;for(I=0;I<Q;I++){const te=S[I]=Y?bn(S[I]):Wt(S[I]);m(w[I],te,T,null,z,L,X,q,Y)}j>he?we(w,z,L,!0,!1,Q):O(S,T,N,z,L,X,q,Y,Q)},ge=(w,S,T,N,z,L,X,q,Y)=>{let j=0;const he=S.length;let Q=w.length-1,I=he-1;for(;j<=Q&&j<=I;){const te=w[j],me=S[j]=Y?bn(S[j]):Wt(S[j]);if(Dn(te,me))m(te,me,T,null,z,L,X,q,Y);else break;j++}for(;j<=Q&&j<=I;){const te=w[Q],me=S[I]=Y?bn(S[I]):Wt(S[I]);if(Dn(te,me))m(te,me,T,null,z,L,X,q,Y);else break;Q--,I--}if(j>Q){if(j<=I){const te=I+1,me=te<he?S[te].el:N;for(;j<=I;)m(null,S[j]=Y?bn(S[j]):Wt(S[j]),T,me,z,L,X,q,Y),j++}}else if(j>I)for(;j<=Q;)Ae(w[j],z,L,!0),j++;else{const te=j,me=j,Pe=new Map;for(j=me;j<=I;j++){const yt=S[j]=Y?bn(S[j]):Wt(S[j]);yt.key!=null&&Pe.set(yt.key,j)}let Ee,vt=0;const dt=I-me+1;let Lt=!1,Dt=0;const $r=new Array(dt);for(j=0;j<dt;j++)$r[j]=0;for(j=te;j<=Q;j++){const yt=w[j];if(vt>=dt){Ae(yt,z,L,!0);continue}let zt;if(yt.key!=null)zt=Pe.get(yt.key);else for(Ee=me;Ee<=I;Ee++)if($r[Ee-me]===0&&Dn(yt,S[Ee])){zt=Ee;break}zt===void 0?Ae(yt,z,L,!0):($r[zt-me]=j+1,zt>=Dt?Dt=zt:Lt=!0,m(yt,S[zt],T,null,z,L,X,q,Y),vt++)}const cl=Lt?xg($r):ir;for(Ee=cl.length-1,j=dt-1;j>=0;j--){const yt=me+j,zt=S[yt],ul=yt+1<he?S[yt+1].el:N;$r[j]===0?m(null,zt,T,ul,z,L,X,q,Y):Lt&&(Ee<0||j!==cl[Ee]?Re(zt,T,ul,2):Ee--)}}},Re=(w,S,T,N,z=null)=>{const{el:L,type:X,transition:q,children:Y,shapeFlag:j}=w;if(j&6){Re(w.component.subTree,S,T,N);return}if(j&128){w.suspense.move(S,T,N);return}if(j&64){X.move(w,S,T,ee);return}if(X===Fe){r(L,S,T);for(let Q=0;Q<Y.length;Q++)Re(Y[Q],S,T,N);r(w.anchor,S,T);return}if(X===no){v(w,S,T);return}if(N!==2&&j&1&&q)if(N===0)q.beforeEnter(L),r(L,S,T),at(()=>q.enter(L),z);else{const{leave:Q,delayLeave:I,afterLeave:te}=q,me=()=>r(L,S,T),Pe=()=>{Q(L,()=>{me(),te&&te()})};I?I(L,me,Pe):Pe()}else r(L,S,T)},Ae=(w,S,T,N=!1,z=!1)=>{const{type:L,props:X,ref:q,children:Y,dynamicChildren:j,shapeFlag:he,patchFlag:Q,dirs:I,cacheIndex:te}=w;if(Q===-2&&(z=!1),q!=null&&es(q,null,T,w,!0),te!=null&&(S.renderCache[te]=void 0),he&256){S.ctx.deactivate(w);return}const me=he&1&&I,Pe=!lr(w);let Ee;if(Pe&&(Ee=X&&X.onVnodeBeforeUnmount)&&jt(Ee,S,w),he&6)xe(w.component,T,N);else{if(he&128){w.suspense.unmount(T,N);return}me&&Fn(w,null,S,"beforeUnmount"),he&64?w.type.remove(w,S,T,ee,N):j&&!j.hasOnce&&(L!==Fe||Q>0&&Q&64)?we(j,S,T,!1,!0):(L===Fe&&Q&384||!z&&he&16)&&we(Y,S,T),N&&ie(w)}(Pe&&(Ee=X&&X.onVnodeUnmounted)||me)&&at(()=>{Ee&&jt(Ee,S,w),me&&Fn(w,null,S,"unmounted")},T)},ie=w=>{const{type:S,el:T,anchor:N,transition:z}=w;if(S===Fe){_e(T,N);return}if(S===no){_(w);return}const L=()=>{i(T),z&&!z.persisted&&z.afterLeave&&z.afterLeave()};if(w.shapeFlag&1&&z&&!z.persisted){const{leave:X,delayLeave:q}=z,Y=()=>X(T,L);q?q(w.el,L,Y):Y()}else L()},_e=(w,S)=>{let T;for(;w!==S;)T=d(w),i(w),w=T;i(S)},xe=(w,S,T)=>{const{bum:N,scope:z,job:L,subTree:X,um:q,m:Y,a:j}=w;El(Y),El(j),N&&Ys(N),z.stop(),L&&(L.flags|=8,Ae(X,w,S,T)),q&&at(q,S),at(()=>{w.isUnmounted=!0},S),S&&S.pendingBranch&&!S.isUnmounted&&w.asyncDep&&!w.asyncResolved&&w.suspenseId===S.pendingId&&(S.deps--,S.deps===0&&S.resolve())},we=(w,S,T,N=!1,z=!1,L=0)=>{for(let X=L;X<w.length;X++)Ae(w[X],S,T,N,z)},F=w=>{if(w.shapeFlag&6)return F(w.component.subTree);if(w.shapeFlag&128)return w.suspense.next();const S=d(w.anchor||w.el),T=S&&S[cf];return T?d(T):S};let K=!1;const H=(w,S,T)=>{w==null?S._vnode&&Ae(S._vnode,null,null,!0):m(S._vnode||null,w,S,null,null,null,T),S._vnode=w,K||(K=!0,gl(),of(),K=!1)},ee={p:m,um:Ae,m:Re,r:ie,mt:ce,mc:O,pc:ne,pbc:M,n:F,o:e};return{render:H,hydrate:void 0,createApp:fg(H)}}function to({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Mn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function _g(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Aa(e,t,n=!1){const r=e.children,i=t.children;if(de(r)&&de(i))for(let s=0;s<r.length;s++){const o=r[s];let a=i[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[s]=bn(i[s]),a.el=o.el),!n&&a.patchFlag!==-2&&Aa(o,a)),a.type===mi&&(a.el=o.el)}}function xg(e){const t=e.slice(),n=[0];let r,i,s,o,a;const l=e.length;for(r=0;r<l;r++){const c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(s=0,o=n.length-1;s<o;)a=s+o>>1,e[n[a]]<c?s=a+1:o=a;c<e[n[s]]&&(s>0&&(t[r]=n[s-1]),n[s]=r)}}for(s=n.length,o=n[s-1];s-- >0;)n[s]=o,o=t[o];return n}function Bf(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Bf(t)}function El(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}const wg=Symbol.for("v-scx"),Sg=()=>Me(wg);function Lf(e,t){return Ea(e,null,t)}function ke(e,t,n){return Ea(e,t,n)}function Ea(e,t,n=Be){const{immediate:r,deep:i,flush:s,once:o}=n,a=Ye({},n),l=t&&r||!t&&s!=="post";let c;if(ei){if(s==="sync"){const h=Sg();c=h.__watcherHandles||(h.__watcherHandles=[])}else if(!l){const h=()=>{};return h.stop=it,h.resume=it,h.pause=it,h}}const u=Ze;a.call=(h,p,m)=>Ft(h,u,p,m);let f=!1;s==="post"?a.scheduler=h=>{at(h,u&&u.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(h,p)=>{p?h():xa(h)}),a.augmentJob=h=>{t&&(h.flags|=4),f&&(h.flags|=2,u&&(h.id=u.uid,h.i=u))};const d=Lp(e,t,a);return ei&&(c?c.push(d):l&&d()),d}function Cg(e,t,n){const r=this.proxy,i=Ce(e)?e.includes(".")?Df(r,e):()=>r[e]:e.bind(r,r);let s;fe(t)?s=t:(s=t.handler,n=t);const o=vi(this),a=Ea(i,s.bind(r),n);return o(),a}function Df(e,t){const n=t.split(".");return()=>{let r=e;for(let i=0;i<n.length&&r;i++)r=r[n[i]];return r}}const Ag=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${St(t)}Modifiers`]||e[`${On(t)}Modifiers`];function Eg(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||Be;let i=n;const s=t.startsWith("update:"),o=s&&Ag(r,t.slice(7));o&&(o.trim&&(i=n.map(u=>Ce(u)?u.trim():u)),o.number&&(i=n.map(rp)));let a,l=r[a=Gs(t)]||r[a=Gs(St(t))];!l&&s&&(l=r[a=Gs(On(t))]),l&&Ft(l,e,6,i);const c=r[a+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,Ft(c,e,6,i)}}function zf(e,t,n=!1){const r=t.emitsCache,i=r.get(e);if(i!==void 0)return i;const s=e.emits;let o={},a=!1;if(!fe(e)){const l=c=>{const u=zf(c,t,!0);u&&(a=!0,Ye(o,u))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!s&&!a?(Oe(e)&&r.set(e,null),null):(de(s)?s.forEach(l=>o[l]=null):Ye(o,s),Oe(e)&&r.set(e,o),o)}function $s(e,t){return!e||!ys(t)?!1:(t=t.slice(2).replace(/Once$/,""),Te(e,t[0].toLowerCase()+t.slice(1))||Te(e,On(t))||Te(e,t))}function $l(e){const{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[s],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:d,setupState:h,ctx:p,inheritAttrs:m}=e,x=Qi(e);let y,g;try{if(n.shapeFlag&4){const _=i||r,C=_;y=Wt(c.call(C,_,u,f,h,d,p)),g=a}else{const _=t;y=Wt(_.length>1?_(f,{attrs:a,slots:o,emit:l}):_(f,null)),g=t.props?a:$g(a)}}catch(_){Ur.length=0,Cs(_,e,1),y=Z(ut)}let v=y;if(g&&m!==!1){const _=Object.keys(g),{shapeFlag:C}=v;_.length&&C&7&&(s&&_.some(ua)&&(g=Tg(g,s)),v=En(v,g,!1,!0))}return n.dirs&&(v=En(v,null,!1,!0),v.dirs=v.dirs?v.dirs.concat(n.dirs):n.dirs),n.transition&&Jr(v,n.transition),y=v,Qi(x),y}const $g=e=>{let t;for(const n in e)(n==="class"||n==="style"||ys(n))&&((t||(t={}))[n]=e[n]);return t},Tg=(e,t)=>{const n={};for(const r in e)(!ua(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function kg(e,t,n){const{props:r,children:i,component:s}=e,{props:o,children:a,patchFlag:l}=t,c=s.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?Tl(r,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(o[d]!==r[d]&&!$s(c,d))return!0}}}else return(i||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?Tl(r,o,c):!0:!!o;return!1}function Tl(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(t[s]!==e[s]&&!$s(n,s))return!0}return!1}function Og({vnode:e,parent:t},n){for(;t;){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=t.vnode).el=n,t=t.parent;else break}}const jf=e=>e.__isSuspense;function Rg(e,t){t&&t.pendingBranch?de(e)?t.effects.push(...e):t.effects.push(e):jp(e)}const Fe=Symbol.for("v-fgt"),mi=Symbol.for("v-txt"),ut=Symbol.for("v-cmt"),no=Symbol.for("v-stc"),Ur=[];let xt=null;function P(e=!1){Ur.push(xt=e?null:[])}function Ig(){Ur.pop(),xt=Ur[Ur.length-1]||null}let Qr=1;function kl(e,t=!1){Qr+=e,e<0&&xt&&t&&(xt.hasOnce=!0)}function Hf(e){return e.dynamicChildren=Qr>0?xt||ir:null,Ig(),Qr>0&&xt&&xt.push(e),e}function G(e,t,n,r,i,s){return Hf(re(e,t,n,r,i,s,!0))}function Se(e,t,n,r,i){return Hf(Z(e,t,n,r,i,!0))}function qt(e){return e?e.__v_isVNode===!0:!1}function Dn(e,t){return e.type===t.type&&e.key===t.key}const Vf=({key:e})=>e??null,zi=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?Ce(e)||We(e)||fe(e)?{i:Ge,r:e,k:t,f:!!n}:e:null);function re(e,t=null,n=null,r=0,i=null,s=e===Fe?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Vf(t),ref:t&&zi(t),scopeId:lf,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Ge};return a?($a(l,n),s&128&&e.normalize(l)):n&&(l.shapeFlag|=Ce(n)?8:16),Qr>0&&!o&&xt&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&xt.push(l),l}const Z=Fg;function Fg(e,t=null,n=null,r=0,i=null,s=!1){if((!e||e===xf)&&(e=ut),qt(e)){const a=En(e,t,!0);return n&&$a(a,n),Qr>0&&!s&&xt&&(a.shapeFlag&6?xt[xt.indexOf(e)]=a:xt.push(a)),a.patchFlag=-2,a}if(jg(e)&&(e=e.__vccOpts),t){t=Po(t);let{class:a,style:l}=t;a&&!Ce(a)&&(t.class=J(a)),Oe(l)&&(_a(l)&&!de(l)&&(l=Ye({},l)),t.style=Ke(l))}const o=Ce(e)?1:jf(e)?128:uf(e)?64:Oe(e)?4:fe(e)?2:0;return re(e,t,n,r,i,o,s,!0)}function Po(e){return e?_a(e)||Of(e)?Ye({},e):e:null}function En(e,t,n=!1,r=!1){const{props:i,ref:s,patchFlag:o,children:a,transition:l}=e,c=t?$n(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&Vf(c),ref:t&&t.ref?n&&s?de(s)?s.concat(zi(t)):[s,zi(t)]:zi(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Fe?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&En(e.ssContent),ssFallback:e.ssFallback&&En(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&r&&Jr(u,l.clone(u)),u}function cn(e=" ",t=0){return Z(mi,null,e,t)}function ve(e="",t=!1){return t?(P(),Se(ut,null,e)):Z(ut,null,e)}function Wt(e){return e==null||typeof e=="boolean"?Z(ut):de(e)?Z(Fe,null,e.slice()):qt(e)?bn(e):Z(mi,null,String(e))}function bn(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:En(e)}function $a(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(de(t))n=16;else if(typeof t=="object")if(r&65){const i=t.default;i&&(i._c&&(i._d=!1),$a(e,i()),i._c&&(i._d=!0));return}else{n=32;const i=t._;!i&&!Of(t)?t._ctx=Ge:i===3&&Ge&&(Ge.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else fe(t)?(t={default:t,_ctx:Ge},n=32):(t=String(t),r&64?(n=16,t=[cn(t)]):n=8);e.children=t,e.shapeFlag|=n}function $n(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const i in r)if(i==="class")t.class!==r.class&&(t.class=J([t.class,r.class]));else if(i==="style")t.style=Ke([t.style,r.style]);else if(ys(i)){const s=t[i],o=r[i];o&&s!==o&&!(de(s)&&s.includes(o))&&(t[i]=s?[].concat(s,o):o)}else i!==""&&(t[i]=r[i])}return t}function jt(e,t,n,r=null){Ft(e,t,7,[n,r])}const Mg=$f();let Pg=0;function Ng(e,t,n){const r=e.type,i=(t?t.appContext:e.appContext)||Mg,s={uid:Pg++,vnode:e,type:r,parent:t,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Bu(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(i.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:If(r,i),emitsOptions:zf(r,i),emit:null,emitted:null,propsDefaults:Be,inheritAttrs:r.inheritAttrs,ctx:Be,data:Be,props:Be,attrs:Be,slots:Be,refs:Be,setupState:Be,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=Eg.bind(null,s),e.ce&&e.ce(s),s}let Ze=null;const st=()=>Ze||Ge;let ns,No;{const e=xs(),t=(n,r)=>{let i;return(i=e[n])||(i=e[n]=[]),i.push(r),s=>{i.length>1?i.forEach(o=>o(s)):i[0](s)}};ns=t("__VUE_INSTANCE_SETTERS__",n=>Ze=n),No=t("__VUE_SSR_SETTERS__",n=>ei=n)}const vi=e=>{const t=Ze;return ns(e),e.scope.on(),()=>{e.scope.off(),ns(t)}},Ol=()=>{Ze&&Ze.scope.off(),ns(null)};function Wf(e){return e.vnode.shapeFlag&4}let ei=!1;function Bg(e,t=!1,n=!1){t&&No(t);const{props:r,children:i}=e.vnode,s=Wf(e);dg(e,r,s,t),mg(e,i,n);const o=s?Lg(e,t):void 0;return t&&No(!1),o}function Lg(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,ig);const{setup:r}=n;if(r){Rn();const i=e.setupContext=r.length>1?Kf(e):null,s=vi(e),o=hi(r,e,0,[e.props,i]),a=Ou(o);if(In(),s(),(a||e.sp)&&!lr(e)&&yf(e),a){if(o.then(Ol,Ol),t)return o.then(l=>{Rl(e,l)}).catch(l=>{Cs(l,e,0)});e.asyncDep=o}else Rl(e,o)}else Uf(e)}function Rl(e,t,n){fe(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Oe(t)&&(e.setupState=nf(t)),Uf(e)}function Uf(e,t,n){const r=e.type;e.render||(e.render=r.render||it);{const i=vi(e);Rn();try{sg(e)}finally{In(),i()}}}const Dg={get(e,t){return tt(e,"get",""),e[t]}};function Kf(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,Dg),slots:e.slots,emit:e.emit,expose:t}}function Ts(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(nf(qi(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Wr)return Wr[n](e)},has(t,n){return n in t||n in Wr}})):e.proxy}function zg(e,t=!0){return fe(e)?e.displayName||e.name:e.name||t&&e.__name}function jg(e){return fe(e)&&"__vccOpts"in e}const B=(e,t)=>Np(e,t,ei);function dr(e,t,n){const r=arguments.length;return r===2?Oe(t)&&!de(t)?qt(t)?Z(e,null,[t]):Z(e,t):Z(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&qt(n)&&(n=[n]),Z(e,t,n))}const Hg="3.5.13",Vg=it;/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Bo;const Il=typeof window<"u"&&window.trustedTypes;if(Il)try{Bo=Il.createPolicy("vue",{createHTML:e=>e})}catch{}const Gf=Bo?e=>Bo.createHTML(e):e=>e,Wg="http://www.w3.org/2000/svg",Ug="http://www.w3.org/1998/Math/MathML",nn=typeof document<"u"?document:null,Fl=nn&&nn.createElement("template"),Kg={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const i=t==="svg"?nn.createElementNS(Wg,e):t==="mathml"?nn.createElementNS(Ug,e):n?nn.createElement(e,{is:n}):nn.createElement(e);return e==="select"&&r&&r.multiple!=null&&i.setAttribute("multiple",r.multiple),i},createText:e=>nn.createTextNode(e),createComment:e=>nn.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>nn.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,i,s){const o=n?n.previousSibling:t.lastChild;if(i&&(i===s||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===s||!(i=i.nextSibling)););else{Fl.innerHTML=Gf(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const a=Fl.content;if(r==="svg"||r==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},hn="transition",kr="animation",ti=Symbol("_vtc"),Yf={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Gg=Ye({},hf,Yf),Yg=e=>(e.displayName="Transition",e.props=Gg,e),ks=Yg((e,{slots:t})=>dr(Kp,qg(e),t)),Pn=(e,t=[])=>{de(e)?e.forEach(n=>n(...t)):e&&e(...t)},Ml=e=>e?de(e)?e.some(t=>t.length>1):e.length>1:!1;function qg(e){const t={};for(const k in e)k in Yf||(t[k]=e[k]);if(e.css===!1)return t;const{name:n="v",type:r,duration:i,enterFromClass:s=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=s,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:d=`${n}-leave-active`,leaveToClass:h=`${n}-leave-to`}=e,p=Xg(i),m=p&&p[0],x=p&&p[1],{onBeforeEnter:y,onEnter:g,onEnterCancelled:v,onLeave:_,onLeaveCancelled:C,onBeforeAppear:A=y,onAppear:E=g,onAppearCancelled:O=v}=t,$=(k,D,ce,le)=>{k._enterCancelled=le,Nn(k,D?u:a),Nn(k,D?c:o),ce&&ce()},M=(k,D)=>{k._isLeaving=!1,Nn(k,f),Nn(k,h),Nn(k,d),D&&D()},R=k=>(D,ce)=>{const le=k?E:g,se=()=>$(D,k,ce);Pn(le,[D,se]),Pl(()=>{Nn(D,k?l:s),Jt(D,k?u:a),Ml(le)||Nl(D,r,m,se)})};return Ye(t,{onBeforeEnter(k){Pn(y,[k]),Jt(k,s),Jt(k,o)},onBeforeAppear(k){Pn(A,[k]),Jt(k,l),Jt(k,c)},onEnter:R(!1),onAppear:R(!0),onLeave(k,D){k._isLeaving=!0;const ce=()=>M(k,D);Jt(k,f),k._enterCancelled?(Jt(k,d),Dl()):(Dl(),Jt(k,d)),Pl(()=>{k._isLeaving&&(Nn(k,f),Jt(k,h),Ml(_)||Nl(k,r,x,ce))}),Pn(_,[k,ce])},onEnterCancelled(k){$(k,!1,void 0,!0),Pn(v,[k])},onAppearCancelled(k){$(k,!0,void 0,!0),Pn(O,[k])},onLeaveCancelled(k){M(k),Pn(C,[k])}})}function Xg(e){if(e==null)return null;if(Oe(e))return[ro(e.enter),ro(e.leave)];{const t=ro(e);return[t,t]}}function ro(e){return ip(e)}function Jt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[ti]||(e[ti]=new Set)).add(t)}function Nn(e,t){t.split(/\s+/).forEach(r=>r&&e.classList.remove(r));const n=e[ti];n&&(n.delete(t),n.size||(e[ti]=void 0))}function Pl(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let Zg=0;function Nl(e,t,n,r){const i=e._endId=++Zg,s=()=>{i===e._endId&&r()};if(n!=null)return setTimeout(s,n);const{type:o,timeout:a,propCount:l}=Jg(e,t);if(!o)return r();const c=o+"end";let u=0;const f=()=>{e.removeEventListener(c,d),s()},d=h=>{h.target===e&&++u>=l&&f()};setTimeout(()=>{u<l&&f()},a+1),e.addEventListener(c,d)}function Jg(e,t){const n=window.getComputedStyle(e),r=p=>(n[p]||"").split(", "),i=r(`${hn}Delay`),s=r(`${hn}Duration`),o=Bl(i,s),a=r(`${kr}Delay`),l=r(`${kr}Duration`),c=Bl(a,l);let u=null,f=0,d=0;t===hn?o>0&&(u=hn,f=o,d=s.length):t===kr?c>0&&(u=kr,f=c,d=l.length):(f=Math.max(o,c),u=f>0?o>c?hn:kr:null,d=u?u===hn?s.length:l.length:0);const h=u===hn&&/\b(transform|all)(,|$)/.test(r(`${hn}Property`).toString());return{type:u,timeout:f,propCount:d,hasTransform:h}}function Bl(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,r)=>Ll(n)+Ll(e[r])))}function Ll(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function Dl(){return document.body.offsetHeight}function Qg(e,t,n){const r=e[ti];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const rs=Symbol("_vod"),qf=Symbol("_vsh"),yi={beforeMount(e,{value:t},{transition:n}){e[rs]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Or(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),Or(e,!0),r.enter(e)):r.leave(e,()=>{Or(e,!1)}):Or(e,t))},beforeUnmount(e,{value:t}){Or(e,t)}};function Or(e,t){e.style.display=t?e[rs]:"none",e[qf]=!t}const em=Symbol(""),tm=/(^|;)\s*display\s*:/;function nm(e,t,n){const r=e.style,i=Ce(n);let s=!1;if(n&&!i){if(t)if(Ce(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&ji(r,a,"")}else for(const o in t)n[o]==null&&ji(r,o,"");for(const o in n)o==="display"&&(s=!0),ji(r,o,n[o])}else if(i){if(t!==n){const o=r[em];o&&(n+=";"+o),r.cssText=n,s=tm.test(n)}}else t&&e.removeAttribute("style");rs in e&&(e[rs]=s?r.display:"",e[qf]&&(r.display="none"))}const zl=/\s*!important$/;function ji(e,t,n){if(de(n))n.forEach(r=>ji(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=rm(e,t);zl.test(n)?e.setProperty(On(r),n.replace(zl,""),"important"):e[r]=n}}const jl=["Webkit","Moz","ms"],io={};function rm(e,t){const n=io[t];if(n)return n;let r=St(t);if(r!=="filter"&&r in e)return io[t]=r;r=di(r);for(let i=0;i<jl.length;i++){const s=jl[i]+r;if(s in e)return io[t]=s}return t}const Hl="http://www.w3.org/1999/xlink";function Vl(e,t,n,r,i,s=up(t)){r&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Hl,t.slice(6,t.length)):e.setAttributeNS(Hl,t,n):n==null||s&&!Mu(n)?e.removeAttribute(t):e.setAttribute(t,s?"":fn(n)?String(n):n)}function Wl(e,t,n,r,i){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Gf(n):n);return}const s=e.tagName;if(t==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let o=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=Mu(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function im(e,t,n,r){e.addEventListener(t,n,r)}function sm(e,t,n,r){e.removeEventListener(t,n,r)}const Ul=Symbol("_vei");function om(e,t,n,r,i=null){const s=e[Ul]||(e[Ul]={}),o=s[t];if(r&&o)o.value=r;else{const[a,l]=am(t);if(r){const c=s[t]=um(r,i);im(e,a,c,l)}else o&&(sm(e,a,o,l),s[t]=void 0)}}const Kl=/(?:Once|Passive|Capture)$/;function am(e){let t;if(Kl.test(e)){t={};let r;for(;r=e.match(Kl);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):On(e.slice(2)),t]}let so=0;const lm=Promise.resolve(),cm=()=>so||(lm.then(()=>so=0),so=Date.now());function um(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Ft(fm(r,n.value),t,5,[r])};return n.value=e,n.attached=cm(),n}function fm(e,t){if(de(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>i=>!i._stopped&&r&&r(i))}else return t}const Gl=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,dm=(e,t,n,r,i,s)=>{const o=i==="svg";t==="class"?Qg(e,r,o):t==="style"?nm(e,n,r):ys(t)?ua(t)||om(e,t,n,r,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):hm(e,t,r,o))?(Wl(e,t,r),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Vl(e,t,r,o,s,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!Ce(r))?Wl(e,St(t),r,s,t):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),Vl(e,t,r,o))};function hm(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&Gl(t)&&fe(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const i=e.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Gl(t)&&Ce(n)?!1:t in e}const pm=["ctrl","shift","alt","meta"],gm={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>pm.some(n=>e[`${n}Key`]&&!t.includes(n))},Ta=(e,t)=>{const n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=(i,...s)=>{for(let o=0;o<t.length;o++){const a=gm[t[o]];if(a&&a(i,t))return}return e(i,...s)})},mm={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},vm=(e,t)=>{const n=e._withKeys||(e._withKeys={}),r=t.join(".");return n[r]||(n[r]=i=>{if(!("key"in i))return;const s=On(i.key);if(t.some(o=>o===s||mm[o]===s))return e(i)})},ym=Ye({patchProp:dm},Kg);let Yl;function Xf(){return Yl||(Yl=yg(ym))}const ql=(...e)=>{Xf().render(...e)},bm=(...e)=>{const t=Xf().createApp(...e),{mount:n}=t;return t.mount=r=>{const i=xm(r);if(!i)return;const s=t._component;!fe(s)&&!s.render&&!s.template&&(s.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=n(i,!1,_m(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},t};function _m(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function xm(e){return Ce(e)?document.querySelector(e):e}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const wm=Symbol();var Xl;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(Xl||(Xl={}));function Sm(){const e=Lu(!0),t=e.run(()=>V({}));let n=[],r=[];const i=qi({install(s){i._a=s,s.provide(wm,i),s.config.globalProperties.$pinia=i,r.forEach(o=>n.push(o)),r=[]},use(s){return this._a?n.push(s):r.push(s),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return i}const Nt=(e,t)=>{const n=e.__vccOpts||e;for(const[r,i]of t)n[r]=i;return n},Cm={};function Am(e,t){const n=ng("RouterView");return P(),Se(n)}const Em=Nt(Cm,[["render",Am]]);/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const Qn=typeof document<"u";function Zf(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function $m(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&Zf(e.default)}const Ie=Object.assign;function oo(e,t){const n={};for(const r in t){const i=t[r];n[r]=Mt(i)?i.map(e):e(i)}return n}const Kr=()=>{},Mt=Array.isArray,Jf=/#/g,Tm=/&/g,km=/\//g,Om=/=/g,Rm=/\?/g,Qf=/\+/g,Im=/%5B/g,Fm=/%5D/g,ed=/%5E/g,Mm=/%60/g,td=/%7B/g,Pm=/%7C/g,nd=/%7D/g,Nm=/%20/g;function ka(e){return encodeURI(""+e).replace(Pm,"|").replace(Im,"[").replace(Fm,"]")}function Bm(e){return ka(e).replace(td,"{").replace(nd,"}").replace(ed,"^")}function Lo(e){return ka(e).replace(Qf,"%2B").replace(Nm,"+").replace(Jf,"%23").replace(Tm,"%26").replace(Mm,"`").replace(td,"{").replace(nd,"}").replace(ed,"^")}function Lm(e){return Lo(e).replace(Om,"%3D")}function Dm(e){return ka(e).replace(Jf,"%23").replace(Rm,"%3F")}function zm(e){return e==null?"":Dm(e).replace(km,"%2F")}function ni(e){try{return decodeURIComponent(""+e)}catch{}return""+e}const jm=/\/$/,Hm=e=>e.replace(jm,"");function ao(e,t,n="/"){let r,i={},s="",o="";const a=t.indexOf("#");let l=t.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(r=t.slice(0,l),s=t.slice(l+1,a>-1?a:t.length),i=e(s)),a>-1&&(r=r||t.slice(0,a),o=t.slice(a,t.length)),r=Km(r??t,n),{fullPath:r+(s&&"?")+s+o,path:r,query:i,hash:ni(o)}}function Vm(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function Zl(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function Wm(e,t,n){const r=t.matched.length-1,i=n.matched.length-1;return r>-1&&r===i&&hr(t.matched[r],n.matched[i])&&rd(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function hr(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function rd(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Um(e[n],t[n]))return!1;return!0}function Um(e,t){return Mt(e)?Jl(e,t):Mt(t)?Jl(t,e):e===t}function Jl(e,t){return Mt(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function Km(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),i=r[r.length-1];(i===".."||i===".")&&r.push("");let s=n.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")s>1&&s--;else break;return n.slice(0,s).join("/")+"/"+r.slice(o).join("/")}const pn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var ri;(function(e){e.pop="pop",e.push="push"})(ri||(ri={}));var Gr;(function(e){e.back="back",e.forward="forward",e.unknown=""})(Gr||(Gr={}));function Gm(e){if(!e)if(Qn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),Hm(e)}const Ym=/^[^#]+#/;function qm(e,t){return e.replace(Ym,"#")+t}function Xm(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const Os=()=>({left:window.scrollX,top:window.scrollY});function Zm(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),i=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;t=Xm(i,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function Ql(e,t){return(history.state?history.state.position-t:-1)+e}const Do=new Map;function Jm(e,t){Do.set(e,t)}function Qm(e){const t=Do.get(e);return Do.delete(e),t}let e0=()=>location.protocol+"//"+location.host;function id(e,t){const{pathname:n,search:r,hash:i}=t,s=e.indexOf("#");if(s>-1){let a=i.includes(e.slice(s))?e.slice(s).length:1,l=i.slice(a);return l[0]!=="/"&&(l="/"+l),Zl(l,"")}return Zl(n,e)+r+i}function t0(e,t,n,r){let i=[],s=[],o=null;const a=({state:d})=>{const h=id(e,location),p=n.value,m=t.value;let x=0;if(d){if(n.value=h,t.value=d,o&&o===p){o=null;return}x=m?d.position-m.position:0}else r(h);i.forEach(y=>{y(n.value,p,{delta:x,type:ri.pop,direction:x?x>0?Gr.forward:Gr.back:Gr.unknown})})};function l(){o=n.value}function c(d){i.push(d);const h=()=>{const p=i.indexOf(d);p>-1&&i.splice(p,1)};return s.push(h),h}function u(){const{history:d}=window;d.state&&d.replaceState(Ie({},d.state,{scroll:Os()}),"")}function f(){for(const d of s)d();s=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:c,destroy:f}}function ec(e,t,n,r=!1,i=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:i?Os():null}}function n0(e){const{history:t,location:n}=window,r={value:id(e,n)},i={value:t.state};i.value||s(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function s(l,c,u){const f=e.indexOf("#"),d=f>-1?(n.host&&document.querySelector("base")?e:e.slice(f))+l:e0()+e+l;try{t[u?"replaceState":"pushState"](c,"",d),i.value=c}catch(h){console.error(h),n[u?"replace":"assign"](d)}}function o(l,c){const u=Ie({},t.state,ec(i.value.back,l,i.value.forward,!0),c,{position:i.value.position});s(l,u,!0),r.value=l}function a(l,c){const u=Ie({},i.value,t.state,{forward:l,scroll:Os()});s(u.current,u,!0);const f=Ie({},ec(r.value,l,null),{position:u.position+1},c);s(l,f,!1),r.value=l}return{location:r,state:i,push:a,replace:o}}function r0(e){e=Gm(e);const t=n0(e),n=t0(e,t.state,t.location,t.replace);function r(s,o=!0){o||n.pauseListeners(),history.go(s)}const i=Ie({location:"",base:e,go:r,createHref:qm.bind(null,e)},t,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>t.state.value}),i}function i0(e){return typeof e=="string"||e&&typeof e=="object"}function sd(e){return typeof e=="string"||typeof e=="symbol"}const od=Symbol("");var tc;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(tc||(tc={}));function pr(e,t){return Ie(new Error,{type:e,[od]:!0},t)}function Qt(e,t){return e instanceof Error&&od in e&&(t==null||!!(e.type&t))}const nc="[^/]+?",s0={sensitive:!1,strict:!1,start:!0,end:!0},o0=/[.+*?^${}()[\]/\\]/g;function a0(e,t){const n=Ie({},s0,t),r=[];let i=n.start?"^":"";const s=[];for(const c of e){const u=c.length?[]:[90];n.strict&&!c.length&&(i+="/");for(let f=0;f<c.length;f++){const d=c[f];let h=40+(n.sensitive?.25:0);if(d.type===0)f||(i+="/"),i+=d.value.replace(o0,"\\$&"),h+=40;else if(d.type===1){const{value:p,repeatable:m,optional:x,regexp:y}=d;s.push({name:p,repeatable:m,optional:x});const g=y||nc;if(g!==nc){h+=10;try{new RegExp(`(${g})`)}catch(_){throw new Error(`Invalid custom RegExp for param "${p}" (${g}): `+_.message)}}let v=m?`((?:${g})(?:/(?:${g}))*)`:`(${g})`;f||(v=x&&c.length<2?`(?:/${v})`:"/"+v),x&&(v+="?"),i+=v,h+=20,x&&(h+=-8),m&&(h+=-20),g===".*"&&(h+=-50)}u.push(h)}r.push(u)}if(n.strict&&n.end){const c=r.length-1;r[c][r[c].length-1]+=.7000000000000001}n.strict||(i+="/?"),n.end?i+="$":n.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,n.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let d=1;d<u.length;d++){const h=u[d]||"",p=s[d-1];f[p.name]=h&&p.repeatable?h.split("/"):h}return f}function l(c){let u="",f=!1;for(const d of e){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const h of d)if(h.type===0)u+=h.value;else if(h.type===1){const{value:p,repeatable:m,optional:x}=h,y=p in c?c[p]:"";if(Mt(y)&&!m)throw new Error(`Provided param "${p}" is an array but it is not repeatable (* or + modifiers)`);const g=Mt(y)?y.join("/"):y;if(!g)if(x)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${p}"`);u+=g}}return u||"/"}return{re:o,score:r,keys:s,parse:a,stringify:l}}function l0(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function ad(e,t){let n=0;const r=e.score,i=t.score;for(;n<r.length&&n<i.length;){const s=l0(r[n],i[n]);if(s)return s;n++}if(Math.abs(i.length-r.length)===1){if(rc(r))return 1;if(rc(i))return-1}return i.length-r.length}function rc(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const c0={type:0,value:""},u0=/[a-zA-Z0-9_]/;function f0(e){if(!e)return[[]];if(e==="/")return[[c0]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(h){throw new Error(`ERR (${n})/"${c}": ${h}`)}let n=0,r=n;const i=[];let s;function o(){s&&i.push(s),s=[]}let a=0,l,c="",u="";function f(){c&&(n===0?s.push({type:0,value:c}):n===1||n===2||n===3?(s.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function d(){c+=l}for(;a<e.length;){if(l=e[a++],l==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:l==="/"?(c&&f(),o()):l===":"?(f(),n=1):d();break;case 4:d(),n=r;break;case 1:l==="("?n=2:u0.test(l)?d():(f(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:n=3:u+=l;break;case 3:f(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${c}"`),f(),o(),i}function d0(e,t,n){const r=a0(f0(e.path),n),i=Ie(r,{record:e,parent:t,children:[],alias:[]});return t&&!i.record.aliasOf==!t.record.aliasOf&&t.children.push(i),i}function h0(e,t){const n=[],r=new Map;t=ac({strict:!1,end:!0,sensitive:!1},t);function i(f){return r.get(f)}function s(f,d,h){const p=!h,m=sc(f);m.aliasOf=h&&h.record;const x=ac(t,f),y=[m];if("alias"in f){const _=typeof f.alias=="string"?[f.alias]:f.alias;for(const C of _)y.push(sc(Ie({},m,{components:h?h.record.components:m.components,path:C,aliasOf:h?h.record:m})))}let g,v;for(const _ of y){const{path:C}=_;if(d&&C[0]!=="/"){const A=d.record.path,E=A[A.length-1]==="/"?"":"/";_.path=d.record.path+(C&&E+C)}if(g=d0(_,d,x),h?h.alias.push(g):(v=v||g,v!==g&&v.alias.push(g),p&&f.name&&!oc(g)&&o(f.name)),ld(g)&&l(g),m.children){const A=m.children;for(let E=0;E<A.length;E++)s(A[E],g,h&&h.children[E])}h=h||g}return v?()=>{o(v)}:Kr}function o(f){if(sd(f)){const d=r.get(f);d&&(r.delete(f),n.splice(n.indexOf(d),1),d.children.forEach(o),d.alias.forEach(o))}else{const d=n.indexOf(f);d>-1&&(n.splice(d,1),f.record.name&&r.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return n}function l(f){const d=m0(f,n);n.splice(d,0,f),f.record.name&&!oc(f)&&r.set(f.record.name,f)}function c(f,d){let h,p={},m,x;if("name"in f&&f.name){if(h=r.get(f.name),!h)throw pr(1,{location:f});x=h.record.name,p=Ie(ic(d.params,h.keys.filter(v=>!v.optional).concat(h.parent?h.parent.keys.filter(v=>v.optional):[]).map(v=>v.name)),f.params&&ic(f.params,h.keys.map(v=>v.name))),m=h.stringify(p)}else if(f.path!=null)m=f.path,h=n.find(v=>v.re.test(m)),h&&(p=h.parse(m),x=h.record.name);else{if(h=d.name?r.get(d.name):n.find(v=>v.re.test(d.path)),!h)throw pr(1,{location:f,currentLocation:d});x=h.record.name,p=Ie({},d.params,f.params),m=h.stringify(p)}const y=[];let g=h;for(;g;)y.unshift(g.record),g=g.parent;return{name:x,path:m,params:p,matched:y,meta:g0(y)}}e.forEach(f=>s(f));function u(){n.length=0,r.clear()}return{addRoute:s,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:i}}function ic(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function sc(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:p0(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function p0(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function oc(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function g0(e){return e.reduce((t,n)=>Ie(t,n.meta),{})}function ac(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function m0(e,t){let n=0,r=t.length;for(;n!==r;){const s=n+r>>1;ad(e,t[s])<0?r=s:n=s+1}const i=v0(e);return i&&(r=t.lastIndexOf(i,r-1)),r}function v0(e){let t=e;for(;t=t.parent;)if(ld(t)&&ad(e,t)===0)return t}function ld({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function y0(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let i=0;i<r.length;++i){const s=r[i].replace(Qf," "),o=s.indexOf("="),a=ni(o<0?s:s.slice(0,o)),l=o<0?null:ni(s.slice(o+1));if(a in t){let c=t[a];Mt(c)||(c=t[a]=[c]),c.push(l)}else t[a]=l}return t}function lc(e){let t="";for(let n in e){const r=e[n];if(n=Lm(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(Mt(r)?r.map(s=>s&&Lo(s)):[r&&Lo(r)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+n,s!=null&&(t+="="+s))})}return t}function b0(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=Mt(r)?r.map(i=>i==null?null:""+i):r==null?r:""+r)}return t}const _0=Symbol(""),cc=Symbol(""),Oa=Symbol(""),Ra=Symbol(""),zo=Symbol("");function Rr(){let e=[];function t(r){return e.push(r),()=>{const i=e.indexOf(r);i>-1&&e.splice(i,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function _n(e,t,n,r,i,s=o=>o()){const o=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((a,l)=>{const c=d=>{d===!1?l(pr(4,{from:n,to:t})):d instanceof Error?l(d):i0(d)?l(pr(2,{from:t,to:d})):(o&&r.enterCallbacks[i]===o&&typeof d=="function"&&o.push(d),a())},u=s(()=>e.call(r&&r.instances[i],t,n,c));let f=Promise.resolve(u);e.length<3&&(f=f.then(c)),f.catch(d=>l(d))})}function lo(e,t,n,r,i=s=>s()){const s=[];for(const o of e)for(const a in o.components){let l=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(Zf(l)){const u=(l.__vccOpts||l)[t];u&&s.push(_n(u,n,r,o,a,i))}else{let c=l();s.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=$m(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const h=(f.__vccOpts||f)[t];return h&&_n(h,n,r,o,a,i)()}))}}return s}function uc(e){const t=Me(Oa),n=Me(Ra),r=B(()=>{const l=b(e.to);return t.resolve(l)}),i=B(()=>{const{matched:l}=r.value,{length:c}=l,u=l[c-1],f=n.matched;if(!u||!f.length)return-1;const d=f.findIndex(hr.bind(null,u));if(d>-1)return d;const h=fc(l[c-2]);return c>1&&fc(u)===h&&f[f.length-1].path!==h?f.findIndex(hr.bind(null,l[c-2])):d}),s=B(()=>i.value>-1&&A0(n.params,r.value.params)),o=B(()=>i.value>-1&&i.value===n.matched.length-1&&rd(n.params,r.value.params));function a(l={}){if(C0(l)){const c=t[b(e.replace)?"replace":"push"](b(e.to)).catch(Kr);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:r,href:B(()=>r.value.href),isActive:s,isExactActive:o,navigate:a}}function x0(e){return e.length===1?e[0]:e}const w0=U({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:uc,setup(e,{slots:t}){const n=wr(uc(e)),{options:r}=Me(Oa),i=B(()=>({[dc(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[dc(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const s=t.default&&x0(t.default(n));return e.custom?s:dr("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},s)}}}),S0=w0;function C0(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function A0(e,t){for(const n in t){const r=t[n],i=e[n];if(typeof r=="string"){if(r!==i)return!1}else if(!Mt(i)||i.length!==r.length||r.some((s,o)=>s!==i[o]))return!1}return!0}function fc(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const dc=(e,t,n)=>e??t??n,E0=U({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=Me(zo),i=B(()=>e.route||r.value),s=Me(cc,0),o=B(()=>{let c=b(s);const{matched:u}=i.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=B(()=>i.value.matched[o.value]);Kt(cc,B(()=>o.value+1)),Kt(_0,a),Kt(zo,i);const l=V();return ke(()=>[l.value,a.value,e.name],([c,u,f],[d,h,p])=>{u&&(u.instances[f]=c,h&&h!==u&&c&&c===d&&(u.leaveGuards.size||(u.leaveGuards=h.leaveGuards),u.updateGuards.size||(u.updateGuards=h.updateGuards))),c&&u&&(!h||!hr(u,h)||!d)&&(u.enterCallbacks[f]||[]).forEach(m=>m(c))},{flush:"post"}),()=>{const c=i.value,u=e.name,f=a.value,d=f&&f.components[u];if(!d)return hc(n.default,{Component:d,route:c});const h=f.props[u],p=h?h===!0?c.params:typeof h=="function"?h(c):h:null,x=dr(d,Ie({},p,t,{onVnodeUnmounted:y=>{y.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return hc(n.default,{Component:x,route:c})||x}}});function hc(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const $0=E0;function T0(e){const t=h0(e.routes,e),n=e.parseQuery||y0,r=e.stringifyQuery||lc,i=e.history,s=Rr(),o=Rr(),a=Rr(),l=Ut(pn);let c=pn;Qn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=oo.bind(null,F=>""+F),f=oo.bind(null,zm),d=oo.bind(null,ni);function h(F,K){let H,ee;return sd(F)?(H=t.getRecordMatcher(F),ee=K):ee=F,t.addRoute(ee,H)}function p(F){const K=t.getRecordMatcher(F);K&&t.removeRoute(K)}function m(){return t.getRoutes().map(F=>F.record)}function x(F){return!!t.getRecordMatcher(F)}function y(F,K){if(K=Ie({},K||l.value),typeof F=="string"){const T=ao(n,F,K.path),N=t.resolve({path:T.path},K),z=i.createHref(T.fullPath);return Ie(T,N,{params:d(N.params),hash:ni(T.hash),redirectedFrom:void 0,href:z})}let H;if(F.path!=null)H=Ie({},F,{path:ao(n,F.path,K.path).path});else{const T=Ie({},F.params);for(const N in T)T[N]==null&&delete T[N];H=Ie({},F,{params:f(T)}),K.params=f(K.params)}const ee=t.resolve(H,K),ye=F.hash||"";ee.params=u(d(ee.params));const w=Vm(r,Ie({},F,{hash:Bm(ye),path:ee.path})),S=i.createHref(w);return Ie({fullPath:w,hash:ye,query:r===lc?b0(F.query):F.query||{}},ee,{redirectedFrom:void 0,href:S})}function g(F){return typeof F=="string"?ao(n,F,l.value.path):Ie({},F)}function v(F,K){if(c!==F)return pr(8,{from:K,to:F})}function _(F){return E(F)}function C(F){return _(Ie(g(F),{replace:!0}))}function A(F){const K=F.matched[F.matched.length-1];if(K&&K.redirect){const{redirect:H}=K;let ee=typeof H=="function"?H(F):H;return typeof ee=="string"&&(ee=ee.includes("?")||ee.includes("#")?ee=g(ee):{path:ee},ee.params={}),Ie({query:F.query,hash:F.hash,params:ee.path!=null?{}:F.params},ee)}}function E(F,K){const H=c=y(F),ee=l.value,ye=F.state,w=F.force,S=F.replace===!0,T=A(H);if(T)return E(Ie(g(T),{state:typeof T=="object"?Ie({},ye,T.state):ye,force:w,replace:S}),K||H);const N=H;N.redirectedFrom=K;let z;return!w&&Wm(r,ee,H)&&(z=pr(16,{to:N,from:ee}),Re(ee,ee,!0,!1)),(z?Promise.resolve(z):M(N,ee)).catch(L=>Qt(L)?Qt(L,2)?L:ge(L):ne(L,N,ee)).then(L=>{if(L){if(Qt(L,2))return E(Ie({replace:S},g(L.to),{state:typeof L.to=="object"?Ie({},ye,L.to.state):ye,force:w}),K||N)}else L=k(N,ee,!0,S,ye);return R(N,ee,L),L})}function O(F,K){const H=v(F,K);return H?Promise.reject(H):Promise.resolve()}function $(F){const K=_e.values().next().value;return K&&typeof K.runWithContext=="function"?K.runWithContext(F):F()}function M(F,K){let H;const[ee,ye,w]=k0(F,K);H=lo(ee.reverse(),"beforeRouteLeave",F,K);for(const T of ee)T.leaveGuards.forEach(N=>{H.push(_n(N,F,K))});const S=O.bind(null,F,K);return H.push(S),we(H).then(()=>{H=[];for(const T of s.list())H.push(_n(T,F,K));return H.push(S),we(H)}).then(()=>{H=lo(ye,"beforeRouteUpdate",F,K);for(const T of ye)T.updateGuards.forEach(N=>{H.push(_n(N,F,K))});return H.push(S),we(H)}).then(()=>{H=[];for(const T of w)if(T.beforeEnter)if(Mt(T.beforeEnter))for(const N of T.beforeEnter)H.push(_n(N,F,K));else H.push(_n(T.beforeEnter,F,K));return H.push(S),we(H)}).then(()=>(F.matched.forEach(T=>T.enterCallbacks={}),H=lo(w,"beforeRouteEnter",F,K,$),H.push(S),we(H))).then(()=>{H=[];for(const T of o.list())H.push(_n(T,F,K));return H.push(S),we(H)}).catch(T=>Qt(T,8)?T:Promise.reject(T))}function R(F,K,H){a.list().forEach(ee=>$(()=>ee(F,K,H)))}function k(F,K,H,ee,ye){const w=v(F,K);if(w)return w;const S=K===pn,T=Qn?history.state:{};H&&(ee||S?i.replace(F.fullPath,Ie({scroll:S&&T&&T.scroll},ye)):i.push(F.fullPath,ye)),l.value=F,Re(F,K,H,S),ge()}let D;function ce(){D||(D=i.listen((F,K,H)=>{if(!xe.listening)return;const ee=y(F),ye=A(ee);if(ye){E(Ie(ye,{replace:!0,force:!0}),ee).catch(Kr);return}c=ee;const w=l.value;Qn&&Jm(Ql(w.fullPath,H.delta),Os()),M(ee,w).catch(S=>Qt(S,12)?S:Qt(S,2)?(E(Ie(g(S.to),{force:!0}),ee).then(T=>{Qt(T,20)&&!H.delta&&H.type===ri.pop&&i.go(-1,!1)}).catch(Kr),Promise.reject()):(H.delta&&i.go(-H.delta,!1),ne(S,ee,w))).then(S=>{S=S||k(ee,w,!1),S&&(H.delta&&!Qt(S,8)?i.go(-H.delta,!1):H.type===ri.pop&&Qt(S,20)&&i.go(-1,!1)),R(ee,w,S)}).catch(Kr)}))}let le=Rr(),se=Rr(),oe;function ne(F,K,H){ge(F);const ee=se.list();return ee.length?ee.forEach(ye=>ye(F,K,H)):console.error(F),Promise.reject(F)}function W(){return oe&&l.value!==pn?Promise.resolve():new Promise((F,K)=>{le.add([F,K])})}function ge(F){return oe||(oe=!F,ce(),le.list().forEach(([K,H])=>F?H(F):K()),le.reset()),F}function Re(F,K,H,ee){const{scrollBehavior:ye}=e;if(!Qn||!ye)return Promise.resolve();const w=!H&&Qm(Ql(F.fullPath,0))||(ee||!H)&&history.state&&history.state.scroll||null;return Xe().then(()=>ye(F,K,w)).then(S=>S&&Zm(S)).catch(S=>ne(S,F,K))}const Ae=F=>i.go(F);let ie;const _e=new Set,xe={currentRoute:l,listening:!0,addRoute:h,removeRoute:p,clearRoutes:t.clearRoutes,hasRoute:x,getRoutes:m,resolve:y,options:e,push:_,replace:C,go:Ae,back:()=>Ae(-1),forward:()=>Ae(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:se.add,isReady:W,install(F){const K=this;F.component("RouterLink",S0),F.component("RouterView",$0),F.config.globalProperties.$router=K,Object.defineProperty(F.config.globalProperties,"$route",{enumerable:!0,get:()=>b(l)}),Qn&&!ie&&l.value===pn&&(ie=!0,_(i.location).catch(ye=>{}));const H={};for(const ye in pn)Object.defineProperty(H,ye,{get:()=>l.value[ye],enumerable:!0});F.provide(Oa,K),F.provide(Ra,ya(H)),F.provide(zo,l);const ee=F.unmount;_e.add(F),F.unmount=function(){_e.delete(F),_e.size<1&&(c=pn,D&&D(),D=null,l.value=pn,ie=!1,oe=!1),ee()}}};function we(F){return F.reduce((K,H)=>K.then(()=>$(H)),Promise.resolve())}return xe}function k0(e,t){const n=[],r=[],i=[],s=Math.max(t.matched.length,e.matched.length);for(let o=0;o<s;o++){const a=t.matched[o];a&&(e.matched.find(c=>hr(c,a))?r.push(a):n.push(a));const l=e.matched[o];l&&(t.matched.find(c=>hr(c,l))||i.push(l))}return[n,r,i]}function O0(e){return Me(Ra)}const cd=Symbol(),Yr="el",R0="is-",Bn=(e,t,n,r,i)=>{let s=`${e}-${t}`;return n&&(s+=`-${n}`),r&&(s+=`__${r}`),i&&(s+=`--${i}`),s},ud=Symbol("namespaceContextKey"),fd=e=>{const t=e||(st()?Me(ud,V(Yr)):V(Yr));return B(()=>b(t)||Yr)},ze=(e,t)=>{const n=fd(t);return{namespace:n,b:(m="")=>Bn(n.value,e,m,"",""),e:m=>m?Bn(n.value,e,"",m,""):"",m:m=>m?Bn(n.value,e,"","",m):"",be:(m,x)=>m&&x?Bn(n.value,e,m,x,""):"",em:(m,x)=>m&&x?Bn(n.value,e,"",m,x):"",bm:(m,x)=>m&&x?Bn(n.value,e,m,"",x):"",bem:(m,x,y)=>m&&x&&y?Bn(n.value,e,m,x,y):"",is:(m,...x)=>{const y=x.length>=1?x[0]:!0;return m&&y?`${R0}${m}`:""},cssVar:m=>{const x={};for(const y in m)m[y]&&(x[`--${n.value}-${y}`]=m[y]);return x},cssVarName:m=>`--${n.value}-${m}`,cssVarBlock:m=>{const x={};for(const y in m)m[y]&&(x[`--${n.value}-${e}-${y}`]=m[y]);return x},cssVarBlockName:m=>`--${n.value}-${e}-${m}`}};var I0=typeof global=="object"&&global&&global.Object===Object&&global,F0=typeof self=="object"&&self&&self.Object===Object&&self,Rs=I0||F0||Function("return this")(),Tn=Rs.Symbol,dd=Object.prototype,M0=dd.hasOwnProperty,P0=dd.toString,Ir=Tn?Tn.toStringTag:void 0;function N0(e){var t=M0.call(e,Ir),n=e[Ir];try{e[Ir]=void 0;var r=!0}catch{}var i=P0.call(e);return r&&(t?e[Ir]=n:delete e[Ir]),i}var B0=Object.prototype,L0=B0.toString;function D0(e){return L0.call(e)}var z0="[object Null]",j0="[object Undefined]",pc=Tn?Tn.toStringTag:void 0;function Ia(e){return e==null?e===void 0?j0:z0:pc&&pc in Object(e)?N0(e):D0(e)}function Fa(e){return e!=null&&typeof e=="object"}var H0="[object Symbol]";function Is(e){return typeof e=="symbol"||Fa(e)&&Ia(e)==H0}function V0(e,t){for(var n=-1,r=e==null?0:e.length,i=Array(r);++n<r;)i[n]=t(e[n],n,e);return i}var bi=Array.isArray,gc=Tn?Tn.prototype:void 0,mc=gc?gc.toString:void 0;function hd(e){if(typeof e=="string")return e;if(bi(e))return V0(e,hd)+"";if(Is(e))return mc?mc.call(e):"";var t=e+"";return t=="0"&&1/e==-1/0?"-0":t}var W0=/\s/;function U0(e){for(var t=e.length;t--&&W0.test(e.charAt(t)););return t}var K0=/^\s+/;function G0(e){return e&&e.slice(0,U0(e)+1).replace(K0,"")}function kn(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var vc=NaN,Y0=/^[-+]0x[0-9a-f]+$/i,q0=/^0b[01]+$/i,X0=/^0o[0-7]+$/i,Z0=parseInt;function yc(e){if(typeof e=="number")return e;if(Is(e))return vc;if(kn(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=kn(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=G0(e);var n=q0.test(e);return n||X0.test(e)?Z0(e.slice(2),n?2:8):Y0.test(e)?vc:+e}function J0(e){return e}var Q0="[object AsyncFunction]",ev="[object Function]",tv="[object GeneratorFunction]",nv="[object Proxy]";function rv(e){if(!kn(e))return!1;var t=Ia(e);return t==ev||t==tv||t==Q0||t==nv}var co=Rs["__core-js_shared__"],bc=function(){var e=/[^.]+$/.exec(co&&co.keys&&co.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function iv(e){return!!bc&&bc in e}var sv=Function.prototype,ov=sv.toString;function av(e){if(e!=null){try{return ov.call(e)}catch{}try{return e+""}catch{}}return""}var lv=/[\\^$.*+?()[\]{}|]/g,cv=/^\[object .+?Constructor\]$/,uv=Function.prototype,fv=Object.prototype,dv=uv.toString,hv=fv.hasOwnProperty,pv=RegExp("^"+dv.call(hv).replace(lv,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function gv(e){if(!kn(e)||iv(e))return!1;var t=rv(e)?pv:cv;return t.test(av(e))}function mv(e,t){return e==null?void 0:e[t]}function Ma(e,t){var n=mv(e,t);return gv(n)?n:void 0}function vv(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}var yv=800,bv=16,_v=Date.now;function xv(e){var t=0,n=0;return function(){var r=_v(),i=bv-(r-n);if(n=r,i>0){if(++t>=yv)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}function wv(e){return function(){return e}}var is=function(){try{var e=Ma(Object,"defineProperty");return e({},"",{}),e}catch{}}(),Sv=is?function(e,t){return is(e,"toString",{configurable:!0,enumerable:!1,value:wv(t),writable:!0})}:J0,Cv=xv(Sv),Av=9007199254740991,Ev=/^(?:0|[1-9]\d*)$/;function pd(e,t){var n=typeof e;return t=t??Av,!!t&&(n=="number"||n!="symbol"&&Ev.test(e))&&e>-1&&e%1==0&&e<t}function $v(e,t,n){t=="__proto__"&&is?is(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}function gd(e,t){return e===t||e!==e&&t!==t}var Tv=Object.prototype,kv=Tv.hasOwnProperty;function Ov(e,t,n){var r=e[t];(!(kv.call(e,t)&&gd(r,n))||n===void 0&&!(t in e))&&$v(e,t,n)}var _c=Math.max;function Rv(e,t,n){return t=_c(t===void 0?e.length-1:t,0),function(){for(var r=arguments,i=-1,s=_c(r.length-t,0),o=Array(s);++i<s;)o[i]=r[t+i];i=-1;for(var a=Array(t+1);++i<t;)a[i]=r[i];return a[t]=n(o),vv(e,this,a)}}var Iv=9007199254740991;function Fv(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=Iv}var Mv="[object Arguments]";function xc(e){return Fa(e)&&Ia(e)==Mv}var md=Object.prototype,Pv=md.hasOwnProperty,Nv=md.propertyIsEnumerable,vd=xc(function(){return arguments}())?xc:function(e){return Fa(e)&&Pv.call(e,"callee")&&!Nv.call(e,"callee")},Bv=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Lv=/^\w*$/;function Dv(e,t){if(bi(e))return!1;var n=typeof e;return n=="number"||n=="symbol"||n=="boolean"||e==null||Is(e)?!0:Lv.test(e)||!Bv.test(e)||t!=null&&e in Object(t)}var ii=Ma(Object,"create");function zv(){this.__data__=ii?ii(null):{},this.size=0}function jv(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}var Hv="__lodash_hash_undefined__",Vv=Object.prototype,Wv=Vv.hasOwnProperty;function Uv(e){var t=this.__data__;if(ii){var n=t[e];return n===Hv?void 0:n}return Wv.call(t,e)?t[e]:void 0}var Kv=Object.prototype,Gv=Kv.hasOwnProperty;function Yv(e){var t=this.__data__;return ii?t[e]!==void 0:Gv.call(t,e)}var qv="__lodash_hash_undefined__";function Xv(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=ii&&t===void 0?qv:t,this}function Un(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}Un.prototype.clear=zv;Un.prototype.delete=jv;Un.prototype.get=Uv;Un.prototype.has=Yv;Un.prototype.set=Xv;function Zv(){this.__data__=[],this.size=0}function Fs(e,t){for(var n=e.length;n--;)if(gd(e[n][0],t))return n;return-1}var Jv=Array.prototype,Qv=Jv.splice;function ey(e){var t=this.__data__,n=Fs(t,e);if(n<0)return!1;var r=t.length-1;return n==r?t.pop():Qv.call(t,n,1),--this.size,!0}function ty(e){var t=this.__data__,n=Fs(t,e);return n<0?void 0:t[n][1]}function ny(e){return Fs(this.__data__,e)>-1}function ry(e,t){var n=this.__data__,r=Fs(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this}function Sr(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}Sr.prototype.clear=Zv;Sr.prototype.delete=ey;Sr.prototype.get=ty;Sr.prototype.has=ny;Sr.prototype.set=ry;var iy=Ma(Rs,"Map");function sy(){this.size=0,this.__data__={hash:new Un,map:new(iy||Sr),string:new Un}}function oy(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}function Ms(e,t){var n=e.__data__;return oy(t)?n[typeof t=="string"?"string":"hash"]:n.map}function ay(e){var t=Ms(this,e).delete(e);return this.size-=t?1:0,t}function ly(e){return Ms(this,e).get(e)}function cy(e){return Ms(this,e).has(e)}function uy(e,t){var n=Ms(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this}function Xn(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}Xn.prototype.clear=sy;Xn.prototype.delete=ay;Xn.prototype.get=ly;Xn.prototype.has=cy;Xn.prototype.set=uy;var fy="Expected a function";function Pa(e,t){if(typeof e!="function"||t!=null&&typeof t!="function")throw new TypeError(fy);var n=function(){var r=arguments,i=t?t.apply(this,r):r[0],s=n.cache;if(s.has(i))return s.get(i);var o=e.apply(this,r);return n.cache=s.set(i,o)||s,o};return n.cache=new(Pa.Cache||Xn),n}Pa.Cache=Xn;var dy=500;function hy(e){var t=Pa(e,function(r){return n.size===dy&&n.clear(),r}),n=t.cache;return t}var py=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,gy=/\\(\\)?/g,my=hy(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(""),e.replace(py,function(n,r,i,s){t.push(i?s.replace(gy,"$1"):r||n)}),t});function vy(e){return e==null?"":hd(e)}function Ps(e,t){return bi(e)?e:Dv(e,t)?[e]:my(vy(e))}function Na(e){if(typeof e=="string"||Is(e))return e;var t=e+"";return t=="0"&&1/e==-1/0?"-0":t}function yd(e,t){t=Ps(t,e);for(var n=0,r=t.length;e!=null&&n<r;)e=e[Na(t[n++])];return n&&n==r?e:void 0}function yy(e,t,n){var r=e==null?void 0:yd(e,t);return r===void 0?n:r}function by(e,t){for(var n=-1,r=t.length,i=e.length;++n<r;)e[i+n]=t[n];return e}var wc=Tn?Tn.isConcatSpreadable:void 0;function _y(e){return bi(e)||vd(e)||!!(wc&&e&&e[wc])}function xy(e,t,n,r,i){var s=-1,o=e.length;for(n||(n=_y),i||(i=[]);++s<o;){var a=e[s];n(a)?by(i,a):i[i.length]=a}return i}function wy(e){var t=e==null?0:e.length;return t?xy(e):[]}function Sy(e){return Cv(Rv(e,void 0,wy),e+"")}function Cy(e,t){return e!=null&&t in Object(e)}function Ay(e,t,n){t=Ps(t,e);for(var r=-1,i=t.length,s=!1;++r<i;){var o=Na(t[r]);if(!(s=e!=null&&n(e,o)))break;e=e[o]}return s||++r!=i?s:(i=e==null?0:e.length,!!i&&Fv(i)&&pd(o,i)&&(bi(e)||vd(e)))}function Ey(e,t){return e!=null&&Ay(e,t,Cy)}var uo=function(){return Rs.Date.now()},$y="Expected a function",Ty=Math.max,ky=Math.min;function Oy(e,t,n){var r,i,s,o,a,l,c=0,u=!1,f=!1,d=!0;if(typeof e!="function")throw new TypeError($y);t=yc(t)||0,kn(n)&&(u=!!n.leading,f="maxWait"in n,s=f?Ty(yc(n.maxWait)||0,t):s,d="trailing"in n?!!n.trailing:d);function h(A){var E=r,O=i;return r=i=void 0,c=A,o=e.apply(O,E),o}function p(A){return c=A,a=setTimeout(y,t),u?h(A):o}function m(A){var E=A-l,O=A-c,$=t-E;return f?ky($,s-O):$}function x(A){var E=A-l,O=A-c;return l===void 0||E>=t||E<0||f&&O>=s}function y(){var A=uo();if(x(A))return g(A);a=setTimeout(y,m(A))}function g(A){return a=void 0,d&&r?h(A):(r=i=void 0,o)}function v(){a!==void 0&&clearTimeout(a),c=0,r=l=i=a=void 0}function _(){return a===void 0?o:g(uo())}function C(){var A=uo(),E=x(A);if(r=arguments,i=this,l=A,E){if(a===void 0)return p(l);if(f)return clearTimeout(a),a=setTimeout(y,t),h(l)}return a===void 0&&(a=setTimeout(y,t)),o}return C.cancel=v,C.flush=_,C}function Ba(e){for(var t=-1,n=e==null?0:e.length,r={};++t<n;){var i=e[t];r[i[0]]=i[1]}return r}function bd(e){return e==null}function Ry(e){return e===void 0}function Iy(e,t,n,r){if(!kn(e))return e;t=Ps(t,e);for(var i=-1,s=t.length,o=s-1,a=e;a!=null&&++i<s;){var l=Na(t[i]),c=n;if(l==="__proto__"||l==="constructor"||l==="prototype")return e;if(i!=o){var u=a[l];c=void 0,c===void 0&&(c=kn(u)?u:pd(t[i+1])?[]:{})}Ov(a,l,c),a=a[l]}return e}function Fy(e,t,n){for(var r=-1,i=t.length,s={};++r<i;){var o=t[r],a=yd(e,o);n(a,o)&&Iy(s,Ps(o,e),a)}return s}function My(e,t){return Fy(e,t,function(n,r){return Ey(e,r)})}var Py=Sy(function(e,t){return e==null?{}:My(e,t)}),Ny="Expected a function";function fo(e,t,n){var r=!0,i=!0;if(typeof e!="function")throw new TypeError(Ny);return kn(n)&&(r="leading"in n?!!n.leading:r,i="trailing"in n?!!n.trailing:i),Oy(e,t,{leading:r,maxWait:t,trailing:i})}const si=e=>e===void 0,jo=e=>typeof e=="boolean",ft=e=>typeof e=="number",ss=e=>typeof Element>"u"?!1:e instanceof Element,By=e=>Ce(e)?!Number.isNaN(Number(e)):!1;var Ly=Object.defineProperty,Dy=Object.defineProperties,zy=Object.getOwnPropertyDescriptors,Sc=Object.getOwnPropertySymbols,jy=Object.prototype.hasOwnProperty,Hy=Object.prototype.propertyIsEnumerable,Cc=(e,t,n)=>t in e?Ly(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Vy=(e,t)=>{for(var n in t||(t={}))jy.call(t,n)&&Cc(e,n,t[n]);if(Sc)for(var n of Sc(t))Hy.call(t,n)&&Cc(e,n,t[n]);return e},Wy=(e,t)=>Dy(e,zy(t));function Ho(e,t){var n;const r=Ut();return Lf(()=>{r.value=e()},Wy(Vy({},t),{flush:(n=void 0)!=null?n:"sync"})),Ss(r)}var Ac;const je=typeof window<"u",Uy=e=>typeof e=="string",Vo=()=>{};je&&((Ac=window==null?void 0:window.navigator)!=null&&Ac.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function Ns(e){return typeof e=="function"?e():b(e)}function Ky(e,t){function n(...r){return new Promise((i,s)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(i).catch(s)})}return n}function Gy(e,t=!0,n=!0,r=!1){let i=0,s,o=!0,a=Vo,l;const c=()=>{s&&(clearTimeout(s),s=void 0,a(),a=Vo)};return f=>{const d=Ns(e),h=Date.now()-i,p=()=>l=f();return c(),d<=0?(i=Date.now(),p()):(h>d&&(n||!o)?(i=Date.now(),p()):t&&(l=new Promise((m,x)=>{a=r?x:m,s=setTimeout(()=>{i=Date.now(),o=!0,m(p()),c()},Math.max(0,d-h))})),!n&&!s&&(s=setTimeout(()=>o=!0,d)),o=!1,l)}}function Yy(e){return e}function La(e){return Du()?(zu(e),!0):!1}function qy(e,t=200,n=!1,r=!0,i=!1){return Ky(Gy(t,n,r,i),e)}function Xy(e,t=!0){st()?Le(e):t?e():Xe(e)}function Wo(e,t,n={}){const{immediate:r=!0}=n,i=V(!1);let s=null;function o(){s&&(clearTimeout(s),s=null)}function a(){i.value=!1,o()}function l(...c){o(),i.value=!0,s=setTimeout(()=>{i.value=!1,s=null,e(...c)},Ns(t))}return r&&(i.value=!0,je&&l()),La(a),{isPending:Ss(i),start:l,stop:a}}function _d(e){var t;const n=Ns(e);return(t=n==null?void 0:n.$el)!=null?t:n}const Da=je?window:void 0,Zy=je?window.document:void 0;function wt(...e){let t,n,r,i;if(Uy(e[0])||Array.isArray(e[0])?([n,r,i]=e,t=Da):[t,n,r,i]=e,!t)return Vo;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const s=[],o=()=>{s.forEach(u=>u()),s.length=0},a=(u,f,d,h)=>(u.addEventListener(f,d,h),()=>u.removeEventListener(f,d,h)),l=ke(()=>[_d(t),Ns(i)],([u,f])=>{o(),u&&s.push(...n.flatMap(d=>r.map(h=>a(u,d,h,f))))},{immediate:!0,flush:"post"}),c=()=>{l(),o()};return La(c),c}function Jy(e,t=!1){const n=V(),r=()=>n.value=!!e();return r(),Xy(r,t),n}const Ec=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},$c="__vueuse_ssr_handlers__";Ec[$c]=Ec[$c]||{};function Qy({document:e=Zy}={}){if(!e)return V("visible");const t=V(e.visibilityState);return wt(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var Tc=Object.getOwnPropertySymbols,eb=Object.prototype.hasOwnProperty,tb=Object.prototype.propertyIsEnumerable,nb=(e,t)=>{var n={};for(var r in e)eb.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&Tc)for(var r of Tc(e))t.indexOf(r)<0&&tb.call(e,r)&&(n[r]=e[r]);return n};function oi(e,t,n={}){const r=n,{window:i=Da}=r,s=nb(r,["window"]);let o;const a=Jy(()=>i&&"ResizeObserver"in i),l=()=>{o&&(o.disconnect(),o=void 0)},c=ke(()=>_d(e),f=>{l(),a.value&&i&&f&&(o=new ResizeObserver(t),o.observe(f,s))},{immediate:!0,flush:"post"}),u=()=>{l(),c()};return La(u),{isSupported:a,stop:u}}var kc;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(kc||(kc={}));var rb=Object.defineProperty,Oc=Object.getOwnPropertySymbols,ib=Object.prototype.hasOwnProperty,sb=Object.prototype.propertyIsEnumerable,Rc=(e,t,n)=>t in e?rb(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ob=(e,t)=>{for(var n in t||(t={}))ib.call(t,n)&&Rc(e,n,t[n]);if(Oc)for(var n of Oc(t))sb.call(t,n)&&Rc(e,n,t[n]);return e};const ab={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};ob({linear:Yy},ab);function lb({window:e=Da}={}){if(!e)return V(!1);const t=V(e.document.hasFocus());return wt(e,"blur",()=>{t.value=!1}),wt(e,"focus",()=>{t.value=!0}),t}class cb extends Error{constructor(t){super(t),this.name="ElementPlusError"}}function Bs(e,t){throw new cb(`[${e}] ${t}`)}const Ic={current:0},Fc=V(0),xd=2e3,Mc=Symbol("elZIndexContextKey"),wd=Symbol("zIndexContextKey"),za=e=>{const t=st()?Me(Mc,Ic):Ic,n=e||(st()?Me(wd,void 0):void 0),r=B(()=>{const o=b(n);return ft(o)?o:xd}),i=B(()=>r.value+Fc.value),s=()=>(t.current++,Fc.value=t.current,i.value);return!je&&Me(Mc),{initialZIndex:r,currentZIndex:i,nextZIndex:s}};var ub={name:"en",el:{breadcrumb:{label:"Breadcrumb"},colorpicker:{confirm:"OK",clear:"Clear",defaultLabel:"color picker",description:"current color is {color}. press enter to select a new color.",alphaLabel:"pick alpha value"},datepicker:{now:"Now",today:"Today",cancel:"Cancel",clear:"Clear",confirm:"OK",dateTablePrompt:"Use the arrow keys and enter to select the day of the month",monthTablePrompt:"Use the arrow keys and enter to select the month",yearTablePrompt:"Use the arrow keys and enter to select the year",selectedDate:"Selected date",selectDate:"Select date",selectTime:"Select time",startDate:"Start Date",startTime:"Start Time",endDate:"End Date",endTime:"End Time",prevYear:"Previous Year",nextYear:"Next Year",prevMonth:"Previous Month",nextMonth:"Next Month",year:"",month1:"January",month2:"February",month3:"March",month4:"April",month5:"May",month6:"June",month7:"July",month8:"August",month9:"September",month10:"October",month11:"November",month12:"December",week:"week",weeks:{sun:"Sun",mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat"},weeksFull:{sun:"Sunday",mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday"},months:{jan:"Jan",feb:"Feb",mar:"Mar",apr:"Apr",may:"May",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Oct",nov:"Nov",dec:"Dec"}},inputNumber:{decrease:"decrease number",increase:"increase number"},select:{loading:"Loading",noMatch:"No matching data",noData:"No data",placeholder:"Select"},mention:{loading:"Loading"},dropdown:{toggleDropdown:"Toggle Dropdown"},cascader:{noMatch:"No matching data",loading:"Loading",placeholder:"Select",noData:"No data"},pagination:{goto:"Go to",pagesize:"/page",total:"Total {total}",pageClassifier:"",page:"Page",prev:"Go to previous page",next:"Go to next page",currentPage:"page {pager}",prevPages:"Previous {pager} pages",nextPages:"Next {pager} pages",deprecationWarning:"Deprecated usages detected, please refer to the el-pagination documentation for more details"},dialog:{close:"Close this dialog"},drawer:{close:"Close this dialog"},messagebox:{title:"Message",confirm:"OK",cancel:"Cancel",error:"Illegal input",close:"Close this dialog"},upload:{deleteTip:"press delete to remove",delete:"Delete",preview:"Preview",continue:"Continue"},slider:{defaultLabel:"slider between {min} and {max}",defaultRangeStartLabel:"pick start value",defaultRangeEndLabel:"pick end value"},table:{emptyText:"No Data",confirmFilter:"Confirm",resetFilter:"Reset",clearFilter:"All",sumText:"Sum"},tour:{next:"Next",previous:"Previous",finish:"Finish"},tree:{emptyText:"No Data"},transfer:{noMatch:"No matching data",noData:"No data",titles:["List 1","List 2"],filterPlaceholder:"Enter keyword",noCheckedFormat:"{total} items",hasCheckedFormat:"{checked}/{total} checked"},image:{error:"FAILED"},pageHeader:{title:"Back"},popconfirm:{confirmButtonText:"Yes",cancelButtonText:"No"},carousel:{leftArrow:"Carousel arrow left",rightArrow:"Carousel arrow right",indicator:"Carousel switch to index {index}"}}};const fb=e=>(t,n)=>db(t,n,b(e)),db=(e,t,n)=>yy(n,e,e).replace(/\{(\w+)\}/g,(r,i)=>{var s;return`${(s=t==null?void 0:t[i])!=null?s:`{${i}}`}`}),hb=e=>{const t=B(()=>b(e).name),n=We(e)?e:V(e);return{lang:t,locale:n,t:fb(e)}},Sd=Symbol("localeContextKey"),Ls=e=>{const t=e||Me(Sd,V());return hb(B(()=>t.value||ub))},Cd="__epPropKey",Ne=e=>e,pb=e=>Oe(e)&&!!e[Cd],Ad=(e,t)=>{if(!Oe(e)||pb(e))return e;const{values:n,required:r,default:i,type:s,validator:o}=e,l={type:s,required:!!r,validator:n||o?c=>{let u=!1,f=[];if(n&&(f=Array.from(n),Te(e,"default")&&f.push(i),u||(u=f.includes(c))),o&&(u||(u=o(c))),!u&&f.length>0){const d=[...new Set(f)].map(h=>JSON.stringify(h)).join(", ");Vg(`Invalid prop: validation failed${t?` for prop "${t}"`:""}. Expected one of [${d}], got value ${JSON.stringify(c)}.`)}return u}:void 0,[Cd]:!0};return Te(e,"default")&&(l.default=i),l},Ue=e=>Ba(Object.entries(e).map(([t,n])=>[t,Ad(n,t)])),Ed=["","default","small","large"],$d=Ad({type:String,values:Ed,required:!1}),Td=Symbol("size"),gb=()=>{const e=Me(Td,{});return B(()=>b(e.size)||"")},mb=Symbol("emptyValuesContextKey"),L3=Ue({emptyValues:Array,valueOnClear:{type:[String,Number,Boolean,Function],default:void 0,validator:e=>fe(e)?!e():!e}}),Uo=e=>Object.keys(e),os=V();function Ds(e,t=void 0){const n=st()?Me(cd,os):os;return e?B(()=>{var r,i;return(i=(r=n.value)==null?void 0:r[e])!=null?i:t}):n}function vb(e,t){const n=Ds(),r=ze(e,B(()=>{var a;return((a=n.value)==null?void 0:a.namespace)||Yr})),i=Ls(B(()=>{var a;return(a=n.value)==null?void 0:a.locale})),s=za(B(()=>{var a;return((a=n.value)==null?void 0:a.zIndex)||xd})),o=B(()=>{var a;return b(t)||((a=n.value)==null?void 0:a.size)||""});return yb(B(()=>b(n)||{})),{ns:r,locale:i,zIndex:s,size:o}}const yb=(e,t,n=!1)=>{var r;const i=!!st(),s=i?Ds():void 0,o=(r=void 0)!=null?r:i?Kt:void 0;if(!o)return;const a=B(()=>{const l=b(e);return s!=null&&s.value?bb(s.value,l):l});return o(cd,a),o(Sd,B(()=>a.value.locale)),o(ud,B(()=>a.value.namespace)),o(wd,B(()=>a.value.zIndex)),o(Td,{size:B(()=>a.value.size||"")}),o(mb,B(()=>({emptyValues:a.value.emptyValues,valueOnClear:a.value.valueOnClear}))),(n||!os.value)&&(os.value=a.value),a},bb=(e,t)=>{const n=[...new Set([...Uo(e),...Uo(t)])],r={};for(const i of n)r[i]=t[i]!==void 0?t[i]:e[i];return r},Kn="update:modelValue";var He=(e,t)=>{const n=e.__vccOpts||e;for(const[r,i]of t)n[r]=i;return n};const kd=(e="")=>e.split(" ").filter(t=>!!t.trim()),Pc=(e,t)=>{if(!e||!t)return!1;if(t.includes(" "))throw new Error("className should not contain space.");return e.classList.contains(t)},_b=(e,t)=>{!e||!t.trim()||e.classList.add(...kd(t))},xb=(e,t)=>{!e||!t.trim()||e.classList.remove(...kd(t))},Od=(e,t)=>{var n;if(!je||!e||!t)return"";let r=St(t);r==="float"&&(r="cssFloat");try{const i=e.style[r];if(i)return i;const s=(n=document.defaultView)==null?void 0:n.getComputedStyle(e,"");return s?s[r]:""}catch{return e.style[r]}};function gr(e,t="px"){if(!e)return"";if(ft(e)||By(e))return`${e}${t}`;if(Ce(e))return e}const wb=(e,t)=>{if(!je)return!1;const n={undefined:"overflow",true:"overflow-y",false:"overflow-x"}[String(t)],r=Od(e,n);return["scroll","auto","overlay"].some(i=>r.includes(i))},Sb=(e,t)=>{if(!je)return;let n=e;for(;n;){if([window,document,document.documentElement].includes(n))return window;if(wb(n,t))return n;n=n.parentNode}return n};let Ti;const Cb=e=>{var t;if(!je)return 0;if(Ti!==void 0)return Ti;const n=document.createElement("div");n.className=`${e}-scrollbar__wrap`,n.style.visibility="hidden",n.style.width="100px",n.style.position="absolute",n.style.top="-9999px",document.body.appendChild(n);const r=n.offsetWidth;n.style.overflow="scroll";const i=document.createElement("div");i.style.width="100%",n.appendChild(i);const s=i.offsetWidth;return(t=n.parentNode)==null||t.removeChild(n),Ti=r-s,Ti},gt=(e,t)=>{if(e.install=n=>{for(const r of[e,...Object.values(t??{})])n.component(r.name,r)},t)for(const[n,r]of Object.entries(t))e[n]=r;return e},Ab=(e,t)=>(e.install=n=>{e._context=n._context,n.config.globalProperties[t]=e},e),Cr=e=>(e.install=it,e),Eb=Ue({size:{type:Ne([Number,String])},color:{type:String}}),$b=U({name:"ElIcon",inheritAttrs:!1}),Tb=U({...$b,props:Eb,setup(e){const t=e,n=ze("icon"),r=B(()=>{const{size:i,color:s}=t;return!i&&!s?{}:{fontSize:si(i)?void 0:gr(i),"--color":s}});return(i,s)=>(P(),G("i",$n({class:b(n).b(),style:b(r)},i.$attrs),[pe(i.$slots,"default")],16))}});var kb=He(Tb,[["__file","icon.vue"]]);const Ve=gt(kb);/*! Element Plus Icons Vue v2.3.1 */var Ob=U({name:"ArrowLeft",__name:"arrow-left",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"})]))}}),Rd=Ob,Rb=U({name:"ArrowRight",__name:"arrow-right",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"})]))}}),Id=Rb,Ib=U({name:"CircleCheck",__name:"circle-check",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"}),re("path",{fill:"currentColor",d:"M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"})]))}}),Fb=Ib,Mb=U({name:"CircleCloseFilled",__name:"circle-close-filled",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"})]))}}),Pb=Mb,Nb=U({name:"CircleClose",__name:"circle-close",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"}),re("path",{fill:"currentColor",d:"M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"})]))}}),Fd=Nb,Bb=U({name:"Close",__name:"close",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"})]))}}),zs=Bb,Lb=U({name:"FullScreen",__name:"full-screen",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64z"})]))}}),Db=Lb,zb=U({name:"Hide",__name:"hide",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"}),re("path",{fill:"currentColor",d:"M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"})]))}}),jb=zb,Hb=U({name:"InfoFilled",__name:"info-filled",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"})]))}}),Vb=Hb,Wb=U({name:"Loading",__name:"loading",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"})]))}}),Md=Wb,Ub=U({name:"Plus",__name:"plus",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"})]))}}),Kb=Ub,Gb=U({name:"RefreshLeft",__name:"refresh-left",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"})]))}}),Yb=Gb,qb=U({name:"RefreshRight",__name:"refresh-right",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"})]))}}),Xb=qb,Zb=U({name:"ScaleToOriginal",__name:"scale-to-original",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M813.176 180.706a60.235 60.235 0 0 1 60.236 60.235v481.883a60.235 60.235 0 0 1-60.236 60.235H210.824a60.235 60.235 0 0 1-60.236-60.235V240.94a60.235 60.235 0 0 1 60.236-60.235h602.352zm0-60.235H210.824A120.47 120.47 0 0 0 90.353 240.94v481.883a120.47 120.47 0 0 0 120.47 120.47h602.353a120.47 120.47 0 0 0 120.471-120.47V240.94a120.47 120.47 0 0 0-120.47-120.47zm-120.47 180.705a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 0 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118zm-361.412 0a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 1 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118M512 361.412a30.118 30.118 0 0 0-30.118 30.117v30.118a30.118 30.118 0 0 0 60.236 0V391.53A30.118 30.118 0 0 0 512 361.412M512 512a30.118 30.118 0 0 0-30.118 30.118v30.117a30.118 30.118 0 0 0 60.236 0v-30.117A30.118 30.118 0 0 0 512 512"})]))}}),Jb=Zb,Qb=U({name:"SuccessFilled",__name:"success-filled",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"})]))}}),e_=Qb,t_=U({name:"View",__name:"view",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"})]))}}),n_=t_,r_=U({name:"WarningFilled",__name:"warning-filled",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"})]))}}),i_=r_,s_=U({name:"ZoomIn",__name:"zoom-in",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704m-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64z"})]))}}),o_=s_,a_=U({name:"ZoomOut",__name:"zoom-out",setup(e){return(t,n)=>(P(),G("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[re("path",{fill:"currentColor",d:"m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704M352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64"})]))}}),l_=a_;const mr=Ne([String,Object,Function]),c_={Close:zs},u_={Close:zs},Nc={success:e_,warning:i_,error:Pb,info:Vb},f_={validating:Md,success:Fb,error:Fd},d_=()=>je&&/firefox/i.test(window.navigator.userAgent);let ht;const h_={height:"0",visibility:"hidden",overflow:d_()?"":"hidden",position:"absolute","z-index":"-1000",top:"0",right:"0"},p_=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"];function g_(e){const t=window.getComputedStyle(e),n=t.getPropertyValue("box-sizing"),r=Number.parseFloat(t.getPropertyValue("padding-bottom"))+Number.parseFloat(t.getPropertyValue("padding-top")),i=Number.parseFloat(t.getPropertyValue("border-bottom-width"))+Number.parseFloat(t.getPropertyValue("border-top-width"));return{contextStyle:p_.map(o=>[o,t.getPropertyValue(o)]),paddingSize:r,borderSize:i,boxSizing:n}}function Bc(e,t=1,n){var r;ht||(ht=document.createElement("textarea"),document.body.appendChild(ht));const{paddingSize:i,borderSize:s,boxSizing:o,contextStyle:a}=g_(e);a.forEach(([f,d])=>ht==null?void 0:ht.style.setProperty(f,d)),Object.entries(h_).forEach(([f,d])=>ht==null?void 0:ht.style.setProperty(f,d,"important")),ht.value=e.value||e.placeholder||"";let l=ht.scrollHeight;const c={};o==="border-box"?l=l+s:o==="content-box"&&(l=l-i),ht.value="";const u=ht.scrollHeight-i;if(ft(t)){let f=u*t;o==="border-box"&&(f=f+i+s),l=Math.max(f,l),c.minHeight=`${f}px`}if(ft(n)){let f=u*n;o==="border-box"&&(f=f+i+s),l=Math.min(f,l)}return c.height=`${l}px`,(r=ht.parentNode)==null||r.removeChild(ht),ht=void 0,c}const kt=e=>e,m_=Ue({ariaLabel:String,ariaOrientation:{type:String,values:["horizontal","vertical","undefined"]},ariaControls:String}),v_=e=>Py(m_,e),y_=Ue({id:{type:String,default:void 0},size:$d,disabled:Boolean,modelValue:{type:Ne([String,Number,Object]),default:""},maxlength:{type:[String,Number]},minlength:{type:[String,Number]},type:{type:String,default:"text"},resize:{type:String,values:["none","both","horizontal","vertical"]},autosize:{type:Ne([Boolean,Object]),default:!1},autocomplete:{type:String,default:"off"},formatter:{type:Function},parser:{type:Function},placeholder:{type:String},form:{type:String},readonly:Boolean,clearable:Boolean,showPassword:Boolean,showWordLimit:Boolean,suffixIcon:{type:mr},prefixIcon:{type:mr},containerRole:{type:String,default:void 0},tabindex:{type:[String,Number],default:0},validateEvent:{type:Boolean,default:!0},inputStyle:{type:Ne([Object,Array,String]),default:()=>kt({})},autofocus:Boolean,rows:{type:Number,default:2},...v_(["ariaLabel"])}),b_={[Kn]:e=>Ce(e),input:e=>Ce(e),change:e=>Ce(e),focus:e=>e instanceof FocusEvent,blur:e=>e instanceof FocusEvent,clear:()=>!0,mouseleave:e=>e instanceof MouseEvent,mouseenter:e=>e instanceof MouseEvent,keydown:e=>e instanceof Event,compositionstart:e=>e instanceof CompositionEvent,compositionupdate:e=>e instanceof CompositionEvent,compositionend:e=>e instanceof CompositionEvent},__=["class","style"],x_=/^on[A-Z]/,Pd=(e={})=>{const{excludeListeners:t=!1,excludeKeys:n}=e,r=B(()=>((n==null?void 0:n.value)||[]).concat(__)),i=st();return B(i?()=>{var s;return Ba(Object.entries((s=i.proxy)==null?void 0:s.$attrs).filter(([o])=>!r.value.includes(o)&&!(t&&x_.test(o))))}:()=>({}))},ja=Symbol("formContextKey"),Nd=Symbol("formItemContextKey"),Lc={prefix:Math.floor(Math.random()*1e4),current:0},w_=Symbol("elIdInjection"),S_=()=>st()?Me(w_,Lc):Lc,Ko=e=>{const t=S_(),n=fd();return Ho(()=>b(e)||`${n.value}-id-${t.prefix}-${t.current++}`)},Bd=()=>{const e=Me(ja,void 0),t=Me(Nd,void 0);return{form:e,formItem:t}},C_=(e,{formItemContext:t,disableIdGeneration:n,disableIdManagement:r})=>{n||(n=V(!1)),r||(r=V(!1));const i=V();let s;const o=B(()=>{var a;return!!(!(e.label||e.ariaLabel)&&t&&t.inputIds&&((a=t.inputIds)==null?void 0:a.length)<=1)});return Le(()=>{s=ke([Xi(e,"id"),n],([a,l])=>{const c=a??(l?void 0:Ko().value);c!==i.value&&(t!=null&&t.removeInputId&&(i.value&&t.removeInputId(i.value),!(r!=null&&r.value)&&!l&&c&&t.addInputId(c)),i.value=c)},{immediate:!0})}),Qe(()=>{s&&s(),t!=null&&t.removeInputId&&i.value&&t.removeInputId(i.value)}),{isLabeledByFormItem:o,inputId:i}},Ld=e=>{const t=st();return B(()=>{var n,r;return(r=(n=t==null?void 0:t.proxy)==null?void 0:n.$props)==null?void 0:r[e]})},Ha=(e,t={})=>{const n=V(void 0),r=t.prop?n:Ld("size"),i=t.global?n:gb(),s=t.form?{size:void 0}:Me(ja,void 0),o=t.formItem?{size:void 0}:Me(Nd,void 0);return B(()=>r.value||b(e)||(o==null?void 0:o.size)||(s==null?void 0:s.size)||i.value||"")},Va=e=>{const t=Ld("disabled"),n=Me(ja,void 0);return B(()=>t.value||b(e)||(n==null?void 0:n.disabled)||!1)};function A_(e,{beforeFocus:t,afterFocus:n,beforeBlur:r,afterBlur:i}={}){const s=st(),{emit:o}=s,a=Ut(),l=V(!1),c=d=>{fe(t)&&t(d)||l.value||(l.value=!0,o("focus",d),n==null||n())},u=d=>{var h;fe(r)&&r(d)||d.relatedTarget&&((h=a.value)!=null&&h.contains(d.relatedTarget))||(l.value=!1,o("blur",d),i==null||i())},f=()=>{var d,h;(d=a.value)!=null&&d.contains(document.activeElement)&&a.value!==document.activeElement||(h=e.value)==null||h.focus()};return ke(a,d=>{d&&d.setAttribute("tabindex","-1")}),wt(a,"focus",c,!0),wt(a,"blur",u,!0),wt(a,"click",f,!0),{isFocused:l,wrapperRef:a,handleFocus:c,handleBlur:u}}const E_=e=>/([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(e);function $_({afterComposition:e,emit:t}){const n=V(!1),r=a=>{t==null||t("compositionstart",a),n.value=!0},i=a=>{var l;t==null||t("compositionupdate",a);const c=(l=a.target)==null?void 0:l.value,u=c[c.length-1]||"";n.value=!E_(u)},s=a=>{t==null||t("compositionend",a),n.value&&(n.value=!1,Xe(()=>e(a)))};return{isComposing:n,handleComposition:a=>{a.type==="compositionend"?s(a):i(a)},handleCompositionStart:r,handleCompositionUpdate:i,handleCompositionEnd:s}}function T_(e){let t;function n(){if(e.value==null)return;const{selectionStart:i,selectionEnd:s,value:o}=e.value;if(i==null||s==null)return;const a=o.slice(0,Math.max(0,i)),l=o.slice(Math.max(0,s));t={selectionStart:i,selectionEnd:s,value:o,beforeTxt:a,afterTxt:l}}function r(){if(e.value==null||t==null)return;const{value:i}=e.value,{beforeTxt:s,afterTxt:o,selectionStart:a}=t;if(s==null||o==null||a==null)return;let l=i.length;if(i.endsWith(o))l=i.length-o.length;else if(i.startsWith(s))l=s.length;else{const c=s[a-1],u=i.indexOf(c,a-1);u!==-1&&(l=u+1)}e.value.setSelectionRange(l,l)}return[n,r]}const k_=U({name:"ElInput",inheritAttrs:!1}),O_=U({...k_,props:y_,emits:b_,setup(e,{expose:t,emit:n}){const r=e,i=Sa(),s=Pd(),o=gi(),a=B(()=>[r.type==="textarea"?m.b():p.b(),p.m(d.value),p.is("disabled",h.value),p.is("exceed",Ae.value),{[p.b("group")]:o.prepend||o.append,[p.m("prefix")]:o.prefix||r.prefixIcon,[p.m("suffix")]:o.suffix||r.suffixIcon||r.clearable||r.showPassword,[p.bm("suffix","password-clear")]:ne.value&&W.value,[p.b("hidden")]:r.type==="hidden"},i.class]),l=B(()=>[p.e("wrapper"),p.is("focus",O.value)]),{form:c,formItem:u}=Bd(),{inputId:f}=C_(r,{formItemContext:u}),d=Ha(),h=Va(),p=ze("input"),m=ze("textarea"),x=Ut(),y=Ut(),g=V(!1),v=V(!1),_=V(),C=Ut(r.inputStyle),A=B(()=>x.value||y.value),{wrapperRef:E,isFocused:O,handleFocus:$,handleBlur:M}=A_(A,{beforeFocus(){return h.value},afterBlur(){var I;r.validateEvent&&((I=u==null?void 0:u.validate)==null||I.call(u,"blur").catch(te=>void 0))}}),R=B(()=>{var I;return(I=c==null?void 0:c.statusIcon)!=null?I:!1}),k=B(()=>(u==null?void 0:u.validateState)||""),D=B(()=>k.value&&f_[k.value]),ce=B(()=>v.value?n_:jb),le=B(()=>[i.style]),se=B(()=>[r.inputStyle,C.value,{resize:r.resize}]),oe=B(()=>bd(r.modelValue)?"":String(r.modelValue)),ne=B(()=>r.clearable&&!h.value&&!r.readonly&&!!oe.value&&(O.value||g.value)),W=B(()=>r.showPassword&&!h.value&&!!oe.value&&(!!oe.value||O.value)),ge=B(()=>r.showWordLimit&&!!r.maxlength&&(r.type==="text"||r.type==="textarea")&&!h.value&&!r.readonly&&!r.showPassword),Re=B(()=>oe.value.length),Ae=B(()=>!!ge.value&&Re.value>Number(r.maxlength)),ie=B(()=>!!o.suffix||!!r.suffixIcon||ne.value||r.showPassword||ge.value||!!k.value&&R.value),[_e,xe]=T_(x);oi(y,I=>{if(K(),!ge.value||r.resize!=="both")return;const te=I[0],{width:me}=te.contentRect;_.value={right:`calc(100% - ${me+15+6}px)`}});const we=()=>{const{type:I,autosize:te}=r;if(!(!je||I!=="textarea"||!y.value))if(te){const me=Oe(te)?te.minRows:void 0,Pe=Oe(te)?te.maxRows:void 0,Ee=Bc(y.value,me,Pe);C.value={overflowY:"hidden",...Ee},Xe(()=>{y.value.offsetHeight,C.value=Ee})}else C.value={minHeight:Bc(y.value).minHeight}},K=(I=>{let te=!1;return()=>{var me;if(te||!r.autosize)return;((me=y.value)==null?void 0:me.offsetParent)===null||(I(),te=!0)}})(we),H=()=>{const I=A.value,te=r.formatter?r.formatter(oe.value):oe.value;!I||I.value===te||(I.value=te)},ee=async I=>{_e();let{value:te}=I.target;if(r.formatter&&(te=r.parser?r.parser(te):te),!w.value){if(te===oe.value){H();return}n(Kn,te),n("input",te),await Xe(),H(),xe()}},ye=I=>{n("change",I.target.value)},{isComposing:w,handleCompositionStart:S,handleCompositionUpdate:T,handleCompositionEnd:N}=$_({emit:n,afterComposition:ee}),z=()=>{_e(),v.value=!v.value,setTimeout(xe)},L=()=>{var I;return(I=A.value)==null?void 0:I.focus()},X=()=>{var I;return(I=A.value)==null?void 0:I.blur()},q=I=>{g.value=!1,n("mouseleave",I)},Y=I=>{g.value=!0,n("mouseenter",I)},j=I=>{n("keydown",I)},he=()=>{var I;(I=A.value)==null||I.select()},Q=()=>{n(Kn,""),n("change",""),n("clear"),n("input","")};return ke(()=>r.modelValue,()=>{var I;Xe(()=>we()),r.validateEvent&&((I=u==null?void 0:u.validate)==null||I.call(u,"change").catch(te=>void 0))}),ke(oe,()=>H()),ke(()=>r.type,async()=>{await Xe(),H(),we()}),Le(()=>{!r.formatter&&r.parser,H(),Xe(we)}),t({input:x,textarea:y,ref:A,textareaStyle:se,autosize:Xi(r,"autosize"),isComposing:w,focus:L,blur:X,select:he,clear:Q,resizeTextarea:we}),(I,te)=>(P(),G("div",{class:J([b(a),{[b(p).bm("group","append")]:I.$slots.append,[b(p).bm("group","prepend")]:I.$slots.prepend}]),style:Ke(b(le)),onMouseenter:Y,onMouseleave:q},[ve(" input "),I.type!=="textarea"?(P(),G(Fe,{key:0},[ve(" prepend slot "),I.$slots.prepend?(P(),G("div",{key:0,class:J(b(p).be("group","prepend"))},[pe(I.$slots,"prepend")],2)):ve("v-if",!0),re("div",{ref_key:"wrapperRef",ref:E,class:J(b(l))},[ve(" prefix slot "),I.$slots.prefix||I.prefixIcon?(P(),G("span",{key:0,class:J(b(p).e("prefix"))},[re("span",{class:J(b(p).e("prefix-inner"))},[pe(I.$slots,"prefix"),I.prefixIcon?(P(),Se(b(Ve),{key:0,class:J(b(p).e("icon"))},{default:ue(()=>[(P(),Se(_t(I.prefixIcon)))]),_:1},8,["class"])):ve("v-if",!0)],2)],2)):ve("v-if",!0),re("input",$n({id:b(f),ref_key:"input",ref:x,class:b(p).e("inner")},b(s),{minlength:I.minlength,maxlength:I.maxlength,type:I.showPassword?v.value?"text":"password":I.type,disabled:b(h),readonly:I.readonly,autocomplete:I.autocomplete,tabindex:I.tabindex,"aria-label":I.ariaLabel,placeholder:I.placeholder,style:I.inputStyle,form:I.form,autofocus:I.autofocus,role:I.containerRole,onCompositionstart:b(S),onCompositionupdate:b(T),onCompositionend:b(N),onInput:ee,onChange:ye,onKeydown:j}),null,16,["id","minlength","maxlength","type","disabled","readonly","autocomplete","tabindex","aria-label","placeholder","form","autofocus","role","onCompositionstart","onCompositionupdate","onCompositionend"]),ve(" suffix slot "),b(ie)?(P(),G("span",{key:1,class:J(b(p).e("suffix"))},[re("span",{class:J(b(p).e("suffix-inner"))},[!b(ne)||!b(W)||!b(ge)?(P(),G(Fe,{key:0},[pe(I.$slots,"suffix"),I.suffixIcon?(P(),Se(b(Ve),{key:0,class:J(b(p).e("icon"))},{default:ue(()=>[(P(),Se(_t(I.suffixIcon)))]),_:1},8,["class"])):ve("v-if",!0)],64)):ve("v-if",!0),b(ne)?(P(),Se(b(Ve),{key:1,class:J([b(p).e("icon"),b(p).e("clear")]),onMousedown:Ta(b(it),["prevent"]),onClick:Q},{default:ue(()=>[Z(b(Fd))]),_:1},8,["class","onMousedown"])):ve("v-if",!0),b(W)?(P(),Se(b(Ve),{key:2,class:J([b(p).e("icon"),b(p).e("password")]),onClick:z},{default:ue(()=>[(P(),Se(_t(b(ce))))]),_:1},8,["class"])):ve("v-if",!0),b(ge)?(P(),G("span",{key:3,class:J(b(p).e("count"))},[re("span",{class:J(b(p).e("count-inner"))},rt(b(Re))+" / "+rt(I.maxlength),3)],2)):ve("v-if",!0),b(k)&&b(D)&&b(R)?(P(),Se(b(Ve),{key:4,class:J([b(p).e("icon"),b(p).e("validateIcon"),b(p).is("loading",b(k)==="validating")])},{default:ue(()=>[(P(),Se(_t(b(D))))]),_:1},8,["class"])):ve("v-if",!0)],2)],2)):ve("v-if",!0)],2),ve(" append slot "),I.$slots.append?(P(),G("div",{key:1,class:J(b(p).be("group","append"))},[pe(I.$slots,"append")],2)):ve("v-if",!0)],64)):(P(),G(Fe,{key:1},[ve(" textarea "),re("textarea",$n({id:b(f),ref_key:"textarea",ref:y,class:[b(m).e("inner"),b(p).is("focus",b(O))]},b(s),{minlength:I.minlength,maxlength:I.maxlength,tabindex:I.tabindex,disabled:b(h),readonly:I.readonly,autocomplete:I.autocomplete,style:b(se),"aria-label":I.ariaLabel,placeholder:I.placeholder,form:I.form,autofocus:I.autofocus,rows:I.rows,role:I.containerRole,onCompositionstart:b(S),onCompositionupdate:b(T),onCompositionend:b(N),onInput:ee,onFocus:b($),onBlur:b(M),onChange:ye,onKeydown:j}),null,16,["id","minlength","maxlength","tabindex","disabled","readonly","autocomplete","aria-label","placeholder","form","autofocus","rows","role","onCompositionstart","onCompositionupdate","onCompositionend","onFocus","onBlur"]),b(ge)?(P(),G("span",{key:0,style:Ke(_.value),class:J(b(p).e("count"))},rt(b(Re))+" / "+rt(I.maxlength),7)):ve("v-if",!0)],64))],38))}});var R_=He(O_,[["__file","input.vue"]]);const I_=gt(R_),F_=e=>{if(e.tabIndex>0||e.tabIndex===0&&e.getAttribute("tabIndex")!==null)return!0;if(e.tabIndex<0||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true")return!1;switch(e.nodeName){case"A":return!!e.href&&e.rel!=="ignore";case"INPUT":return!(e.type==="hidden"||e.type==="file");case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}},ho="focus-trap.focus-after-trapped",po="focus-trap.focus-after-released",M_="focus-trap.focusout-prevented",Dc={cancelable:!0,bubbles:!1},P_={cancelable:!0,bubbles:!1},zc="focusAfterTrapped",jc="focusAfterReleased",Dd=Symbol("elFocusTrap"),Wa=V(),js=V(0),Ua=V(0);let ki=0;const zd=e=>{const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const i=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||i?NodeFilter.FILTER_SKIP:r.tabIndex>=0||r===document.activeElement?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t},Hc=(e,t)=>{for(const n of e)if(!N_(n,t))return n},N_=(e,t)=>{if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1},B_=e=>{const t=zd(e),n=Hc(t,e),r=Hc(t.reverse(),e);return[n,r]},L_=e=>e instanceof HTMLInputElement&&"select"in e,mn=(e,t)=>{if(e&&e.focus){const n=document.activeElement;let r=!1;ss(e)&&!F_(e)&&!e.getAttribute("tabindex")&&(e.setAttribute("tabindex","-1"),r=!0),e.focus({preventScroll:!0}),Ua.value=window.performance.now(),e!==n&&L_(e)&&t&&e.select(),ss(e)&&r&&e.removeAttribute("tabindex")}};function Vc(e,t){const n=[...e],r=e.indexOf(t);return r!==-1&&n.splice(r,1),n}const D_=()=>{let e=[];return{push:r=>{const i=e[0];i&&r!==i&&i.pause(),e=Vc(e,r),e.unshift(r)},remove:r=>{var i,s;e=Vc(e,r),(s=(i=e[0])==null?void 0:i.resume)==null||s.call(i)}}},z_=(e,t=!1)=>{const n=document.activeElement;for(const r of e)if(mn(r,t),document.activeElement!==n)return},Wc=D_(),j_=()=>js.value>Ua.value,Oi=()=>{Wa.value="pointer",js.value=window.performance.now()},Uc=()=>{Wa.value="keyboard",js.value=window.performance.now()},H_=()=>(Le(()=>{ki===0&&(document.addEventListener("mousedown",Oi),document.addEventListener("touchstart",Oi),document.addEventListener("keydown",Uc)),ki++}),qn(()=>{ki--,ki<=0&&(document.removeEventListener("mousedown",Oi),document.removeEventListener("touchstart",Oi),document.removeEventListener("keydown",Uc))}),{focusReason:Wa,lastUserFocusTimestamp:js,lastAutomatedFocusTimestamp:Ua}),Ri=e=>new CustomEvent(M_,{...P_,detail:e}),qe={tab:"Tab",enter:"Enter",space:"Space",left:"ArrowLeft",up:"ArrowUp",right:"ArrowRight",down:"ArrowDown",esc:"Escape",delete:"Delete",backspace:"Backspace",numpadEnter:"NumpadEnter"};let er=[];const Kc=e=>{e.code===qe.esc&&er.forEach(t=>t(e))},V_=e=>{Le(()=>{er.length===0&&document.addEventListener("keydown",Kc),je&&er.push(e)}),qn(()=>{er=er.filter(t=>t!==e),er.length===0&&je&&document.removeEventListener("keydown",Kc)})},W_=U({name:"ElFocusTrap",inheritAttrs:!1,props:{loop:Boolean,trapped:Boolean,focusTrapEl:Object,focusStartEl:{type:[Object,String],default:"first"}},emits:[zc,jc,"focusin","focusout","focusout-prevented","release-requested"],setup(e,{emit:t}){const n=V();let r,i;const{focusReason:s}=H_();V_(p=>{e.trapped&&!o.paused&&t("release-requested",p)});const o={paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}},a=p=>{if(!e.loop&&!e.trapped||o.paused)return;const{code:m,altKey:x,ctrlKey:y,metaKey:g,currentTarget:v,shiftKey:_}=p,{loop:C}=e,A=m===qe.tab&&!x&&!y&&!g,E=document.activeElement;if(A&&E){const O=v,[$,M]=B_(O);if($&&M){if(!_&&E===M){const k=Ri({focusReason:s.value});t("focusout-prevented",k),k.defaultPrevented||(p.preventDefault(),C&&mn($,!0))}else if(_&&[$,O].includes(E)){const k=Ri({focusReason:s.value});t("focusout-prevented",k),k.defaultPrevented||(p.preventDefault(),C&&mn(M,!0))}}else if(E===O){const k=Ri({focusReason:s.value});t("focusout-prevented",k),k.defaultPrevented||p.preventDefault()}}};Kt(Dd,{focusTrapRef:n,onKeydown:a}),ke(()=>e.focusTrapEl,p=>{p&&(n.value=p)},{immediate:!0}),ke([n],([p],[m])=>{p&&(p.addEventListener("keydown",a),p.addEventListener("focusin",u),p.addEventListener("focusout",f)),m&&(m.removeEventListener("keydown",a),m.removeEventListener("focusin",u),m.removeEventListener("focusout",f))});const l=p=>{t(zc,p)},c=p=>t(jc,p),u=p=>{const m=b(n);if(!m)return;const x=p.target,y=p.relatedTarget,g=x&&m.contains(x);e.trapped||y&&m.contains(y)||(r=y),g&&t("focusin",p),!o.paused&&e.trapped&&(g?i=x:mn(i,!0))},f=p=>{const m=b(n);if(!(o.paused||!m))if(e.trapped){const x=p.relatedTarget;!bd(x)&&!m.contains(x)&&setTimeout(()=>{if(!o.paused&&e.trapped){const y=Ri({focusReason:s.value});t("focusout-prevented",y),y.defaultPrevented||mn(i,!0)}},0)}else{const x=p.target;x&&m.contains(x)||t("focusout",p)}};async function d(){await Xe();const p=b(n);if(p){Wc.push(o);const m=p.contains(document.activeElement)?r:document.activeElement;if(r=m,!p.contains(m)){const y=new Event(ho,Dc);p.addEventListener(ho,l),p.dispatchEvent(y),y.defaultPrevented||Xe(()=>{let g=e.focusStartEl;Ce(g)||(mn(g),document.activeElement!==g&&(g="first")),g==="first"&&z_(zd(p),!0),(document.activeElement===m||g==="container")&&mn(p)})}}}function h(){const p=b(n);if(p){p.removeEventListener(ho,l);const m=new CustomEvent(po,{...Dc,detail:{focusReason:s.value}});p.addEventListener(po,c),p.dispatchEvent(m),!m.defaultPrevented&&(s.value=="keyboard"||!j_()||p.contains(document.activeElement))&&mn(r??document.body),p.removeEventListener(po,c),Wc.remove(o)}}return Le(()=>{e.trapped&&d(),ke(()=>e.trapped,p=>{p?d():h()})}),qn(()=>{e.trapped&&h(),n.value&&(n.value.removeEventListener("keydown",a),n.value.removeEventListener("focusin",u),n.value.removeEventListener("focusout",f),n.value=void 0)}),{onKeydown:a}}});function U_(e,t,n,r,i,s){return pe(e.$slots,"default",{handleKeydown:e.onKeydown})}var jd=He(W_,[["render",U_],["__file","focus-trap.vue"]]);const K_=Ue({to:{type:Ne([String,Object]),required:!0},disabled:Boolean}),G_=U({__name:"teleport",props:K_,setup(e){return(t,n)=>t.disabled?pe(t.$slots,"default",{key:0}):(P(),Se(Vp,{key:1,to:t.to},[pe(t.$slots,"default")],8,["to"]))}});var Y_=He(G_,[["__file","teleport.vue"]]);const Hd=gt(Y_),q_=Ue({value:{type:[String,Number],default:""},max:{type:Number,default:99},isDot:Boolean,hidden:Boolean,type:{type:String,values:["primary","success","warning","info","danger"],default:"danger"},showZero:{type:Boolean,default:!0},color:String,badgeStyle:{type:Ne([String,Object,Array])},offset:{type:Ne(Array),default:[0,0]},badgeClass:{type:String}}),X_=U({name:"ElBadge"}),Z_=U({...X_,props:q_,setup(e,{expose:t}){const n=e,r=ze("badge"),i=B(()=>n.isDot?"":ft(n.value)&&ft(n.max)?n.max<n.value?`${n.max}+`:`${n.value}`:`${n.value}`),s=B(()=>{var o,a,l,c,u;return[{backgroundColor:n.color,marginRight:gr(-((a=(o=n.offset)==null?void 0:o[0])!=null?a:0)),marginTop:gr((c=(l=n.offset)==null?void 0:l[1])!=null?c:0)},(u=n.badgeStyle)!=null?u:{}]});return t({content:i}),(o,a)=>(P(),G("div",{class:J(b(r).b())},[pe(o.$slots,"default"),Z(ks,{name:`${b(r).namespace.value}-zoom-in-center`,persisted:""},{default:ue(()=>[pi(re("sup",{class:J([b(r).e("content"),b(r).em("content",o.type),b(r).is("fixed",!!o.$slots.default),b(r).is("dot",o.isDot),b(r).is("hide-zero",!o.showZero&&n.value===0),o.badgeClass]),style:Ke(b(s))},[pe(o.$slots,"content",{value:b(i)},()=>[cn(rt(b(i)),1)])],6),[[yi,!o.hidden&&(b(i)||o.isDot||o.$slots.content)]])]),_:3},8,["name"])],2))}});var J_=He(Z_,[["__file","badge.vue"]]);const Q_=gt(J_),Vd=Symbol("buttonGroupContextKey"),Wd=({from:e,replacement:t,scope:n,version:r,ref:i,type:s="API"},o)=>{ke(()=>b(o),a=>{},{immediate:!0})},e1=(e,t)=>{Wd({from:"type.text",replacement:"link",version:"3.0.0",scope:"props",ref:"https://element-plus.org/en-US/component/button.html#button-attributes"},B(()=>e.type==="text"));const n=Me(Vd,void 0),r=Ds("button"),{form:i}=Bd(),s=Ha(B(()=>n==null?void 0:n.size)),o=Va(),a=V(),l=gi(),c=B(()=>e.type||(n==null?void 0:n.type)||""),u=B(()=>{var p,m,x;return(x=(m=e.autoInsertSpace)!=null?m:(p=r.value)==null?void 0:p.autoInsertSpace)!=null?x:!1}),f=B(()=>e.tag==="button"?{ariaDisabled:o.value||e.loading,disabled:o.value||e.loading,autofocus:e.autofocus,type:e.nativeType}:{}),d=B(()=>{var p;const m=(p=l.default)==null?void 0:p.call(l);if(u.value&&(m==null?void 0:m.length)===1){const x=m[0];if((x==null?void 0:x.type)===mi){const y=x.children;return new RegExp("^\\p{Unified_Ideograph}{2}$","u").test(y.trim())}}return!1});return{_disabled:o,_size:s,_type:c,_ref:a,_props:f,shouldAddSpace:d,handleClick:p=>{if(o.value||e.loading){p.stopPropagation();return}e.nativeType==="reset"&&(i==null||i.resetFields()),t("click",p)}}},t1=["default","primary","success","warning","info","danger","text",""],n1=["button","submit","reset"],Go=Ue({size:$d,disabled:Boolean,type:{type:String,values:t1,default:""},icon:{type:mr},nativeType:{type:String,values:n1,default:"button"},loading:Boolean,loadingIcon:{type:mr,default:()=>Md},plain:Boolean,text:Boolean,link:Boolean,bg:Boolean,autofocus:Boolean,round:Boolean,circle:Boolean,color:String,dark:Boolean,autoInsertSpace:{type:Boolean,default:void 0},tag:{type:Ne([String,Object]),default:"button"}}),r1={click:e=>e instanceof MouseEvent};function Je(e,t){i1(e)&&(e="100%");var n=s1(e);return e=t===360?e:Math.min(t,Math.max(0,parseFloat(e))),n&&(e=parseInt(String(e*t),10)/100),Math.abs(e-t)<1e-6?1:(t===360?e=(e<0?e%t+t:e%t)/parseFloat(String(t)):e=e%t/parseFloat(String(t)),e)}function Ii(e){return Math.min(1,Math.max(0,e))}function i1(e){return typeof e=="string"&&e.indexOf(".")!==-1&&parseFloat(e)===1}function s1(e){return typeof e=="string"&&e.indexOf("%")!==-1}function Ud(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function Fi(e){return e<=1?"".concat(Number(e)*100,"%"):e}function zn(e){return e.length===1?"0"+e:String(e)}function o1(e,t,n){return{r:Je(e,255)*255,g:Je(t,255)*255,b:Je(n,255)*255}}function Gc(e,t,n){e=Je(e,255),t=Je(t,255),n=Je(n,255);var r=Math.max(e,t,n),i=Math.min(e,t,n),s=0,o=0,a=(r+i)/2;if(r===i)o=0,s=0;else{var l=r-i;switch(o=a>.5?l/(2-r-i):l/(r+i),r){case e:s=(t-n)/l+(t<n?6:0);break;case t:s=(n-e)/l+2;break;case n:s=(e-t)/l+4;break}s/=6}return{h:s,s:o,l:a}}function go(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*(6*n):n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function a1(e,t,n){var r,i,s;if(e=Je(e,360),t=Je(t,100),n=Je(n,100),t===0)i=n,s=n,r=n;else{var o=n<.5?n*(1+t):n+t-n*t,a=2*n-o;r=go(a,o,e+1/3),i=go(a,o,e),s=go(a,o,e-1/3)}return{r:r*255,g:i*255,b:s*255}}function Yc(e,t,n){e=Je(e,255),t=Je(t,255),n=Je(n,255);var r=Math.max(e,t,n),i=Math.min(e,t,n),s=0,o=r,a=r-i,l=r===0?0:a/r;if(r===i)s=0;else{switch(r){case e:s=(t-n)/a+(t<n?6:0);break;case t:s=(n-e)/a+2;break;case n:s=(e-t)/a+4;break}s/=6}return{h:s,s:l,v:o}}function l1(e,t,n){e=Je(e,360)*6,t=Je(t,100),n=Je(n,100);var r=Math.floor(e),i=e-r,s=n*(1-t),o=n*(1-i*t),a=n*(1-(1-i)*t),l=r%6,c=[n,o,s,s,a,n][l],u=[a,n,n,o,s,s][l],f=[s,s,a,n,n,o][l];return{r:c*255,g:u*255,b:f*255}}function qc(e,t,n,r){var i=[zn(Math.round(e).toString(16)),zn(Math.round(t).toString(16)),zn(Math.round(n).toString(16))];return r&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function c1(e,t,n,r,i){var s=[zn(Math.round(e).toString(16)),zn(Math.round(t).toString(16)),zn(Math.round(n).toString(16)),zn(u1(r))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function u1(e){return Math.round(parseFloat(e)*255).toString(16)}function Xc(e){return bt(e)/255}function bt(e){return parseInt(e,16)}function f1(e){return{r:e>>16,g:(e&65280)>>8,b:e&255}}var Yo={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function d1(e){var t={r:0,g:0,b:0},n=1,r=null,i=null,s=null,o=!1,a=!1;return typeof e=="string"&&(e=g1(e)),typeof e=="object"&&(en(e.r)&&en(e.g)&&en(e.b)?(t=o1(e.r,e.g,e.b),o=!0,a=String(e.r).substr(-1)==="%"?"prgb":"rgb"):en(e.h)&&en(e.s)&&en(e.v)?(r=Fi(e.s),i=Fi(e.v),t=l1(e.h,r,i),o=!0,a="hsv"):en(e.h)&&en(e.s)&&en(e.l)&&(r=Fi(e.s),s=Fi(e.l),t=a1(e.h,r,s),o=!0,a="hsl"),Object.prototype.hasOwnProperty.call(e,"a")&&(n=e.a)),n=Ud(n),{ok:o,format:e.format||a,r:Math.min(255,Math.max(t.r,0)),g:Math.min(255,Math.max(t.g,0)),b:Math.min(255,Math.max(t.b,0)),a:n}}var h1="[-\\+]?\\d+%?",p1="[-\\+]?\\d*\\.\\d+%?",Cn="(?:".concat(p1,")|(?:").concat(h1,")"),mo="[\\s|\\(]+(".concat(Cn,")[,|\\s]+(").concat(Cn,")[,|\\s]+(").concat(Cn,")\\s*\\)?"),vo="[\\s|\\(]+(".concat(Cn,")[,|\\s]+(").concat(Cn,")[,|\\s]+(").concat(Cn,")[,|\\s]+(").concat(Cn,")\\s*\\)?"),$t={CSS_UNIT:new RegExp(Cn),rgb:new RegExp("rgb"+mo),rgba:new RegExp("rgba"+vo),hsl:new RegExp("hsl"+mo),hsla:new RegExp("hsla"+vo),hsv:new RegExp("hsv"+mo),hsva:new RegExp("hsva"+vo),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function g1(e){if(e=e.trim().toLowerCase(),e.length===0)return!1;var t=!1;if(Yo[e])e=Yo[e],t=!0;else if(e==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};var n=$t.rgb.exec(e);return n?{r:n[1],g:n[2],b:n[3]}:(n=$t.rgba.exec(e),n?{r:n[1],g:n[2],b:n[3],a:n[4]}:(n=$t.hsl.exec(e),n?{h:n[1],s:n[2],l:n[3]}:(n=$t.hsla.exec(e),n?{h:n[1],s:n[2],l:n[3],a:n[4]}:(n=$t.hsv.exec(e),n?{h:n[1],s:n[2],v:n[3]}:(n=$t.hsva.exec(e),n?{h:n[1],s:n[2],v:n[3],a:n[4]}:(n=$t.hex8.exec(e),n?{r:bt(n[1]),g:bt(n[2]),b:bt(n[3]),a:Xc(n[4]),format:t?"name":"hex8"}:(n=$t.hex6.exec(e),n?{r:bt(n[1]),g:bt(n[2]),b:bt(n[3]),format:t?"name":"hex"}:(n=$t.hex4.exec(e),n?{r:bt(n[1]+n[1]),g:bt(n[2]+n[2]),b:bt(n[3]+n[3]),a:Xc(n[4]+n[4]),format:t?"name":"hex8"}:(n=$t.hex3.exec(e),n?{r:bt(n[1]+n[1]),g:bt(n[2]+n[2]),b:bt(n[3]+n[3]),format:t?"name":"hex"}:!1)))))))))}function en(e){return!!$t.CSS_UNIT.exec(String(e))}var m1=function(){function e(t,n){t===void 0&&(t=""),n===void 0&&(n={});var r;if(t instanceof e)return t;typeof t=="number"&&(t=f1(t)),this.originalInput=t;var i=d1(t);this.originalInput=t,this.r=i.r,this.g=i.g,this.b=i.b,this.a=i.a,this.roundA=Math.round(100*this.a)/100,this.format=(r=n.format)!==null&&r!==void 0?r:i.format,this.gradientType=n.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=i.ok}return e.prototype.isDark=function(){return this.getBrightness()<128},e.prototype.isLight=function(){return!this.isDark()},e.prototype.getBrightness=function(){var t=this.toRgb();return(t.r*299+t.g*587+t.b*114)/1e3},e.prototype.getLuminance=function(){var t=this.toRgb(),n,r,i,s=t.r/255,o=t.g/255,a=t.b/255;return s<=.03928?n=s/12.92:n=Math.pow((s+.055)/1.055,2.4),o<=.03928?r=o/12.92:r=Math.pow((o+.055)/1.055,2.4),a<=.03928?i=a/12.92:i=Math.pow((a+.055)/1.055,2.4),.2126*n+.7152*r+.0722*i},e.prototype.getAlpha=function(){return this.a},e.prototype.setAlpha=function(t){return this.a=Ud(t),this.roundA=Math.round(100*this.a)/100,this},e.prototype.isMonochrome=function(){var t=this.toHsl().s;return t===0},e.prototype.toHsv=function(){var t=Yc(this.r,this.g,this.b);return{h:t.h*360,s:t.s,v:t.v,a:this.a}},e.prototype.toHsvString=function(){var t=Yc(this.r,this.g,this.b),n=Math.round(t.h*360),r=Math.round(t.s*100),i=Math.round(t.v*100);return this.a===1?"hsv(".concat(n,", ").concat(r,"%, ").concat(i,"%)"):"hsva(".concat(n,", ").concat(r,"%, ").concat(i,"%, ").concat(this.roundA,")")},e.prototype.toHsl=function(){var t=Gc(this.r,this.g,this.b);return{h:t.h*360,s:t.s,l:t.l,a:this.a}},e.prototype.toHslString=function(){var t=Gc(this.r,this.g,this.b),n=Math.round(t.h*360),r=Math.round(t.s*100),i=Math.round(t.l*100);return this.a===1?"hsl(".concat(n,", ").concat(r,"%, ").concat(i,"%)"):"hsla(".concat(n,", ").concat(r,"%, ").concat(i,"%, ").concat(this.roundA,")")},e.prototype.toHex=function(t){return t===void 0&&(t=!1),qc(this.r,this.g,this.b,t)},e.prototype.toHexString=function(t){return t===void 0&&(t=!1),"#"+this.toHex(t)},e.prototype.toHex8=function(t){return t===void 0&&(t=!1),c1(this.r,this.g,this.b,this.a,t)},e.prototype.toHex8String=function(t){return t===void 0&&(t=!1),"#"+this.toHex8(t)},e.prototype.toHexShortString=function(t){return t===void 0&&(t=!1),this.a===1?this.toHexString(t):this.toHex8String(t)},e.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},e.prototype.toRgbString=function(){var t=Math.round(this.r),n=Math.round(this.g),r=Math.round(this.b);return this.a===1?"rgb(".concat(t,", ").concat(n,", ").concat(r,")"):"rgba(".concat(t,", ").concat(n,", ").concat(r,", ").concat(this.roundA,")")},e.prototype.toPercentageRgb=function(){var t=function(n){return"".concat(Math.round(Je(n,255)*100),"%")};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}},e.prototype.toPercentageRgbString=function(){var t=function(n){return Math.round(Je(n,255)*100)};return this.a===1?"rgb(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%)"):"rgba(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%, ").concat(this.roundA,")")},e.prototype.toName=function(){if(this.a===0)return"transparent";if(this.a<1)return!1;for(var t="#"+qc(this.r,this.g,this.b,!1),n=0,r=Object.entries(Yo);n<r.length;n++){var i=r[n],s=i[0],o=i[1];if(t===o)return s}return!1},e.prototype.toString=function(t){var n=!!t;t=t??this.format;var r=!1,i=this.a<1&&this.a>=0,s=!n&&i&&(t.startsWith("hex")||t==="name");return s?t==="name"&&this.a===0?this.toName():this.toRgbString():(t==="rgb"&&(r=this.toRgbString()),t==="prgb"&&(r=this.toPercentageRgbString()),(t==="hex"||t==="hex6")&&(r=this.toHexString()),t==="hex3"&&(r=this.toHexString(!0)),t==="hex4"&&(r=this.toHex8String(!0)),t==="hex8"&&(r=this.toHex8String()),t==="name"&&(r=this.toName()),t==="hsl"&&(r=this.toHslString()),t==="hsv"&&(r=this.toHsvString()),r||this.toHexString())},e.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},e.prototype.clone=function(){return new e(this.toString())},e.prototype.lighten=function(t){t===void 0&&(t=10);var n=this.toHsl();return n.l+=t/100,n.l=Ii(n.l),new e(n)},e.prototype.brighten=function(t){t===void 0&&(t=10);var n=this.toRgb();return n.r=Math.max(0,Math.min(255,n.r-Math.round(255*-(t/100)))),n.g=Math.max(0,Math.min(255,n.g-Math.round(255*-(t/100)))),n.b=Math.max(0,Math.min(255,n.b-Math.round(255*-(t/100)))),new e(n)},e.prototype.darken=function(t){t===void 0&&(t=10);var n=this.toHsl();return n.l-=t/100,n.l=Ii(n.l),new e(n)},e.prototype.tint=function(t){return t===void 0&&(t=10),this.mix("white",t)},e.prototype.shade=function(t){return t===void 0&&(t=10),this.mix("black",t)},e.prototype.desaturate=function(t){t===void 0&&(t=10);var n=this.toHsl();return n.s-=t/100,n.s=Ii(n.s),new e(n)},e.prototype.saturate=function(t){t===void 0&&(t=10);var n=this.toHsl();return n.s+=t/100,n.s=Ii(n.s),new e(n)},e.prototype.greyscale=function(){return this.desaturate(100)},e.prototype.spin=function(t){var n=this.toHsl(),r=(n.h+t)%360;return n.h=r<0?360+r:r,new e(n)},e.prototype.mix=function(t,n){n===void 0&&(n=50);var r=this.toRgb(),i=new e(t).toRgb(),s=n/100,o={r:(i.r-r.r)*s+r.r,g:(i.g-r.g)*s+r.g,b:(i.b-r.b)*s+r.b,a:(i.a-r.a)*s+r.a};return new e(o)},e.prototype.analogous=function(t,n){t===void 0&&(t=6),n===void 0&&(n=30);var r=this.toHsl(),i=360/n,s=[this];for(r.h=(r.h-(i*t>>1)+720)%360;--t;)r.h=(r.h+i)%360,s.push(new e(r));return s},e.prototype.complement=function(){var t=this.toHsl();return t.h=(t.h+180)%360,new e(t)},e.prototype.monochromatic=function(t){t===void 0&&(t=6);for(var n=this.toHsv(),r=n.h,i=n.s,s=n.v,o=[],a=1/t;t--;)o.push(new e({h:r,s:i,v:s})),s=(s+a)%1;return o},e.prototype.splitcomplement=function(){var t=this.toHsl(),n=t.h;return[this,new e({h:(n+72)%360,s:t.s,l:t.l}),new e({h:(n+216)%360,s:t.s,l:t.l})]},e.prototype.onBackground=function(t){var n=this.toRgb(),r=new e(t).toRgb(),i=n.a+r.a*(1-n.a);return new e({r:(n.r*n.a+r.r*r.a*(1-n.a))/i,g:(n.g*n.a+r.g*r.a*(1-n.a))/i,b:(n.b*n.a+r.b*r.a*(1-n.a))/i,a:i})},e.prototype.triad=function(){return this.polyad(3)},e.prototype.tetrad=function(){return this.polyad(4)},e.prototype.polyad=function(t){for(var n=this.toHsl(),r=n.h,i=[this],s=360/t,o=1;o<t;o++)i.push(new e({h:(r+o*s)%360,s:n.s,l:n.l}));return i},e.prototype.equals=function(t){return this.toRgbString()===new e(t).toRgbString()},e}();function gn(e,t=20){return e.mix("#141414",t).toString()}function v1(e){const t=Va(),n=ze("button");return B(()=>{let r={},i=e.color;if(i){const s=i.match(/var\((.*?)\)/);s&&(i=window.getComputedStyle(window.document.documentElement).getPropertyValue(s[1]));const o=new m1(i),a=e.dark?o.tint(20).toString():gn(o,20);if(e.plain)r=n.cssVarBlock({"bg-color":e.dark?gn(o,90):o.tint(90).toString(),"text-color":i,"border-color":e.dark?gn(o,50):o.tint(50).toString(),"hover-text-color":`var(${n.cssVarName("color-white")})`,"hover-bg-color":i,"hover-border-color":i,"active-bg-color":a,"active-text-color":`var(${n.cssVarName("color-white")})`,"active-border-color":a}),t.value&&(r[n.cssVarBlockName("disabled-bg-color")]=e.dark?gn(o,90):o.tint(90).toString(),r[n.cssVarBlockName("disabled-text-color")]=e.dark?gn(o,50):o.tint(50).toString(),r[n.cssVarBlockName("disabled-border-color")]=e.dark?gn(o,80):o.tint(80).toString());else{const l=e.dark?gn(o,30):o.tint(30).toString(),c=o.isDark()?`var(${n.cssVarName("color-white")})`:`var(${n.cssVarName("color-black")})`;if(r=n.cssVarBlock({"bg-color":i,"text-color":c,"border-color":i,"hover-bg-color":l,"hover-text-color":c,"hover-border-color":l,"active-bg-color":a,"active-border-color":a}),t.value){const u=e.dark?gn(o,50):o.tint(50).toString();r[n.cssVarBlockName("disabled-bg-color")]=u,r[n.cssVarBlockName("disabled-text-color")]=e.dark?"rgba(255, 255, 255, 0.5)":`var(${n.cssVarName("color-white")})`,r[n.cssVarBlockName("disabled-border-color")]=u}}}return r})}const y1=U({name:"ElButton"}),b1=U({...y1,props:Go,emits:r1,setup(e,{expose:t,emit:n}){const r=e,i=v1(r),s=ze("button"),{_ref:o,_size:a,_type:l,_disabled:c,_props:u,shouldAddSpace:f,handleClick:d}=e1(r,n),h=B(()=>[s.b(),s.m(l.value),s.m(a.value),s.is("disabled",c.value),s.is("loading",r.loading),s.is("plain",r.plain),s.is("round",r.round),s.is("circle",r.circle),s.is("text",r.text),s.is("link",r.link),s.is("has-bg",r.bg)]);return t({ref:o,size:a,type:l,disabled:c,shouldAddSpace:f}),(p,m)=>(P(),Se(_t(p.tag),$n({ref_key:"_ref",ref:o},b(u),{class:b(h),style:b(i),onClick:b(d)}),{default:ue(()=>[p.loading?(P(),G(Fe,{key:0},[p.$slots.loading?pe(p.$slots,"loading",{key:0}):(P(),Se(b(Ve),{key:1,class:J(b(s).is("loading"))},{default:ue(()=>[(P(),Se(_t(p.loadingIcon)))]),_:1},8,["class"]))],64)):p.icon||p.$slots.icon?(P(),Se(b(Ve),{key:1},{default:ue(()=>[p.icon?(P(),Se(_t(p.icon),{key:0})):pe(p.$slots,"icon",{key:1})]),_:3})):ve("v-if",!0),p.$slots.default?(P(),G("span",{key:2,class:J({[b(s).em("text","expand")]:b(f)})},[pe(p.$slots,"default")],2)):ve("v-if",!0)]),_:3},16,["class","style","onClick"]))}});var _1=He(b1,[["__file","button.vue"]]);const x1={size:Go.size,type:Go.type},w1=U({name:"ElButtonGroup"}),S1=U({...w1,props:x1,setup(e){const t=e;Kt(Vd,wr({size:Xi(t,"size"),type:Xi(t,"type")}));const n=ze("button");return(r,i)=>(P(),G("div",{class:J(b(n).b("group"))},[pe(r.$slots,"default")],2))}});var Kd=He(S1,[["__file","button-group.vue"]]);const C1=gt(_1,{ButtonGroup:Kd});Cr(Kd);var Zc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function A1(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}const E1=Ue({header:{type:String,default:""},footer:{type:String,default:""},bodyStyle:{type:Ne([String,Object,Array]),default:""},bodyClass:String,shadow:{type:String,values:["always","hover","never"],default:"always"}}),$1=U({name:"ElCard"}),T1=U({...$1,props:E1,setup(e){const t=ze("card");return(n,r)=>(P(),G("div",{class:J([b(t).b(),b(t).is(`${n.shadow}-shadow`)])},[n.$slots.header||n.header?(P(),G("div",{key:0,class:J(b(t).e("header"))},[pe(n.$slots,"header",{},()=>[cn(rt(n.header),1)])],2)):ve("v-if",!0),re("div",{class:J([b(t).e("body"),n.bodyClass]),style:Ke(n.bodyStyle)},[pe(n.$slots,"default")],6),n.$slots.footer||n.footer?(P(),G("div",{key:1,class:J(b(t).e("footer"))},[pe(n.$slots,"footer",{},()=>[cn(rt(n.footer),1)])],2)):ve("v-if",!0)],2))}});var k1=He(T1,[["__file","card.vue"]]);const Gd=gt(k1);var Hi=(e=>(e[e.TEXT=1]="TEXT",e[e.CLASS=2]="CLASS",e[e.STYLE=4]="STYLE",e[e.PROPS=8]="PROPS",e[e.FULL_PROPS=16]="FULL_PROPS",e[e.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",e[e.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",e[e.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",e[e.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",e[e.NEED_PATCH=512]="NEED_PATCH",e[e.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",e[e.HOISTED=-1]="HOISTED",e[e.BAIL=-2]="BAIL",e))(Hi||{});const Vi=e=>{const t=de(e)?e:[e],n=[];return t.forEach(r=>{var i;de(r)?n.push(...Vi(r)):qt(r)&&((i=r.component)!=null&&i.subTree)?n.push(r,...Vi(r.component.subTree)):qt(r)&&de(r.children)?n.push(...Vi(r.children)):n.push(r)}),n},O1=(e,t,n)=>Vi(e.subTree).filter(s=>{var o;return qt(s)&&((o=s.type)==null?void 0:o.name)===t&&!!s.component}).map(s=>s.component.uid).map(s=>n[s]).filter(s=>!!s),R1=(e,t)=>{const n={},r=Ut([]);return{children:r,addChild:o=>{n[o.uid]=o,r.value=O1(e,t,n)},removeChild:o=>{delete n[o],r.value=r.value.filter(a=>a.uid!==o)}}},Sn=e=>di(e),I1=Ue({tag:{type:String,default:"div"},span:{type:Number,default:24},offset:{type:Number,default:0},pull:{type:Number,default:0},push:{type:Number,default:0},xs:{type:Ne([Number,Object]),default:()=>kt({})},sm:{type:Ne([Number,Object]),default:()=>kt({})},md:{type:Ne([Number,Object]),default:()=>kt({})},lg:{type:Ne([Number,Object]),default:()=>kt({})},xl:{type:Ne([Number,Object]),default:()=>kt({})}}),Yd=Symbol("rowContextKey"),F1=U({name:"ElCol"}),M1=U({...F1,props:I1,setup(e){const t=e,{gutter:n}=Me(Yd,{gutter:B(()=>0)}),r=ze("col"),i=B(()=>{const o={};return n.value&&(o.paddingLeft=o.paddingRight=`${n.value/2}px`),o}),s=B(()=>{const o=[];return["span","offset","pull","push"].forEach(c=>{const u=t[c];ft(u)&&(c==="span"?o.push(r.b(`${t[c]}`)):u>0&&o.push(r.b(`${c}-${t[c]}`)))}),["xs","sm","md","lg","xl"].forEach(c=>{ft(t[c])?o.push(r.b(`${c}-${t[c]}`)):Oe(t[c])&&Object.entries(t[c]).forEach(([u,f])=>{o.push(u!=="span"?r.b(`${c}-${u}-${f}`):r.b(`${c}-${f}`))})}),n.value&&o.push(r.is("guttered")),[r.b(),o]});return(o,a)=>(P(),Se(_t(o.tag),{class:J(b(s)),style:Ke(b(i))},{default:ue(()=>[pe(o.$slots,"default")]),_:3},8,["class","style"]))}});var P1=He(M1,[["__file","col.vue"]]);const N1=gt(P1),B1=(e,t)=>{if(!je||!e||!t)return!1;const n=e.getBoundingClientRect();let r;return t instanceof Element?r=t.getBoundingClientRect():r={top:0,right:window.innerWidth,bottom:window.innerHeight,left:0},n.top<r.bottom&&n.bottom>r.top&&n.right>r.left&&n.left<r.right},Vt={},L1=U({name:"ElContainer"}),D1=U({...L1,props:{direction:{type:String}},setup(e){const t=e,n=gi(),r=ze("container"),i=B(()=>t.direction==="vertical"?!0:t.direction==="horizontal"?!1:n&&n.default?n.default().some(o=>{const a=o.type.name;return a==="ElHeader"||a==="ElFooter"}):!1);return(s,o)=>(P(),G("section",{class:J([b(r).b(),b(r).is("vertical",b(i))])},[pe(s.$slots,"default")],2))}});var z1=He(D1,[["__file","container.vue"]]);const j1=U({name:"ElAside"}),H1=U({...j1,props:{width:{type:String,default:null}},setup(e){const t=e,n=ze("aside"),r=B(()=>t.width?n.cssVarBlock({width:t.width}):{});return(i,s)=>(P(),G("aside",{class:J(b(n).b()),style:Ke(b(r))},[pe(i.$slots,"default")],6))}});var qd=He(H1,[["__file","aside.vue"]]);const V1=U({name:"ElFooter"}),W1=U({...V1,props:{height:{type:String,default:null}},setup(e){const t=e,n=ze("footer"),r=B(()=>t.height?n.cssVarBlock({height:t.height}):{});return(i,s)=>(P(),G("footer",{class:J(b(n).b()),style:Ke(b(r))},[pe(i.$slots,"default")],6))}});var Xd=He(W1,[["__file","footer.vue"]]);const U1=U({name:"ElHeader"}),K1=U({...U1,props:{height:{type:String,default:null}},setup(e){const t=e,n=ze("header"),r=B(()=>t.height?n.cssVarBlock({height:t.height}):{});return(i,s)=>(P(),G("header",{class:J(b(n).b()),style:Ke(b(r))},[pe(i.$slots,"default")],6))}});var Zd=He(K1,[["__file","header.vue"]]);const G1=U({name:"ElMain"}),Y1=U({...G1,setup(e){const t=ze("main");return(n,r)=>(P(),G("main",{class:J(b(t).b())},[pe(n.$slots,"default")],2))}});var Jd=He(Y1,[["__file","main.vue"]]);const q1=gt(z1,{Aside:qd,Footer:Xd,Header:Zd,Main:Jd});Cr(qd);Cr(Xd);Cr(Zd);const X1=Cr(Jd),Qd=e=>{if(!e)return{onClick:it,onMousedown:it,onMouseup:it};let t=!1,n=!1;return{onClick:o=>{t&&n&&e(o),t=n=!1},onMousedown:o=>{t=o.target===o.currentTarget},onMouseup:o=>{n=o.target===o.currentTarget}}},Z1=Ue({mask:{type:Boolean,default:!0},customMaskEvent:Boolean,overlayClass:{type:Ne([String,Array,Object])},zIndex:{type:Ne([String,Number])}}),J1={click:e=>e instanceof MouseEvent},Q1="overlay";var ex=U({name:"ElOverlay",props:Z1,emits:J1,setup(e,{slots:t,emit:n}){const r=ze(Q1),i=l=>{n("click",l)},{onClick:s,onMousedown:o,onMouseup:a}=Qd(e.customMaskEvent?void 0:i);return()=>e.mask?Z("div",{class:[r.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:s,onMousedown:o,onMouseup:a},[pe(t,"default")],Hi.STYLE|Hi.CLASS|Hi.PROPS,["onClick","onMouseup","onMousedown"]):dr("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[pe(t,"default")])}});const tx=ex,eh=Symbol("dialogInjectionKey"),th=Ue({center:Boolean,alignCenter:Boolean,closeIcon:{type:mr},draggable:Boolean,overflow:Boolean,fullscreen:Boolean,headerClass:String,bodyClass:String,footerClass:String,showClose:{type:Boolean,default:!0},title:{type:String,default:""},ariaLevel:{type:String,default:"2"}}),nx={close:()=>!0},rx=(e,t,n,r)=>{let i={offsetX:0,offsetY:0};const s=c=>{const u=c.clientX,f=c.clientY,{offsetX:d,offsetY:h}=i,p=e.value.getBoundingClientRect(),m=p.left,x=p.top,y=p.width,g=p.height,v=document.documentElement.clientWidth,_=document.documentElement.clientHeight,C=-m+d,A=-x+h,E=v-m-y+d,O=_-x-g+h,$=R=>{let k=d+R.clientX-u,D=h+R.clientY-f;r!=null&&r.value||(k=Math.min(Math.max(k,C),E),D=Math.min(Math.max(D,A),O)),i={offsetX:k,offsetY:D},e.value&&(e.value.style.transform=`translate(${gr(k)}, ${gr(D)})`)},M=()=>{document.removeEventListener("mousemove",$),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",$),document.addEventListener("mouseup",M)},o=()=>{t.value&&e.value&&t.value.addEventListener("mousedown",s)},a=()=>{t.value&&e.value&&t.value.removeEventListener("mousedown",s)},l=()=>{i={offsetX:0,offsetY:0},e.value&&(e.value.style.transform="none")};return Le(()=>{Lf(()=>{n.value?o():a()})}),qn(()=>{a()}),{resetPosition:l}},ix=(...e)=>t=>{e.forEach(n=>{fe(n)?n(t):n.value=t})},sx=U({name:"ElDialogContent"}),ox=U({...sx,props:th,emits:nx,setup(e,{expose:t}){const n=e,{t:r}=Ls(),{Close:i}=c_,{dialogRef:s,headerRef:o,bodyId:a,ns:l,style:c}=Me(eh),{focusTrapRef:u}=Me(Dd),f=B(()=>[l.b(),l.is("fullscreen",n.fullscreen),l.is("draggable",n.draggable),l.is("align-center",n.alignCenter),{[l.m("center")]:n.center}]),d=ix(u,s),h=B(()=>n.draggable),p=B(()=>n.overflow),{resetPosition:m}=rx(s,o,h,p);return t({resetPosition:m}),(x,y)=>(P(),G("div",{ref:b(d),class:J(b(f)),style:Ke(b(c)),tabindex:"-1"},[re("header",{ref_key:"headerRef",ref:o,class:J([b(l).e("header"),x.headerClass,{"show-close":x.showClose}])},[pe(x.$slots,"header",{},()=>[re("span",{role:"heading","aria-level":x.ariaLevel,class:J(b(l).e("title"))},rt(x.title),11,["aria-level"])]),x.showClose?(P(),G("button",{key:0,"aria-label":b(r)("el.dialog.close"),class:J(b(l).e("headerbtn")),type:"button",onClick:g=>x.$emit("close")},[Z(b(Ve),{class:J(b(l).e("close"))},{default:ue(()=>[(P(),Se(_t(x.closeIcon||b(i))))]),_:1},8,["class"])],10,["aria-label","onClick"])):ve("v-if",!0)],2),re("div",{id:b(a),class:J([b(l).e("body"),x.bodyClass])},[pe(x.$slots,"default")],10,["id"]),x.$slots.footer?(P(),G("footer",{key:0,class:J([b(l).e("footer"),x.footerClass])},[pe(x.$slots,"footer")],2)):ve("v-if",!0)],6))}});var ax=He(ox,[["__file","dialog-content.vue"]]);const lx=Ue({...th,appendToBody:Boolean,appendTo:{type:Ne([String,Object]),default:"body"},beforeClose:{type:Ne(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,headerClass:String,bodyClass:String,footerClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:Boolean,headerAriaLevel:{type:String,default:"2"}}),cx={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[Kn]:e=>jo(e),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},ux=(e,t={})=>{We(e)||Bs("[useLockscreen]","You need to pass a ref param to this function");const n=t.ns||ze("popup"),r=B(()=>n.bm("parent","hidden"));if(!je||Pc(document.body,r.value))return;let i=0,s=!1,o="0";const a=()=>{setTimeout(()=>{typeof document>"u"||s&&document&&(document.body.style.width=o,xb(document.body,r.value))},200)};ke(e,l=>{if(!l){a();return}s=!Pc(document.body,r.value),s&&(o=document.body.style.width,_b(document.body,r.value)),i=Cb(n.namespace.value);const c=document.documentElement.clientHeight<document.body.scrollHeight,u=Od(document.body,"overflowY");i>0&&(c||u==="scroll")&&s&&(document.body.style.width=`calc(100% - ${i}px)`)}),zu(()=>a())},fx=(e,t)=>{var n;const i=st().emit,{nextZIndex:s}=za();let o="";const a=Ko(),l=Ko(),c=V(!1),u=V(!1),f=V(!1),d=V((n=e.zIndex)!=null?n:s());let h,p;const m=Ds("namespace",Yr),x=B(()=>{const le={},se=`--${m.value}-dialog`;return e.fullscreen||(e.top&&(le[`${se}-margin-top`]=e.top),e.width&&(le[`${se}-width`]=gr(e.width))),le}),y=B(()=>e.alignCenter?{display:"flex"}:{});function g(){i("opened")}function v(){i("closed"),i(Kn,!1),e.destroyOnClose&&(f.value=!1)}function _(){i("close")}function C(){p==null||p(),h==null||h(),e.openDelay&&e.openDelay>0?{stop:h}=Wo(()=>$(),e.openDelay):$()}function A(){h==null||h(),p==null||p(),e.closeDelay&&e.closeDelay>0?{stop:p}=Wo(()=>M(),e.closeDelay):M()}function E(){function le(se){se||(u.value=!0,c.value=!1)}e.beforeClose?e.beforeClose(le):A()}function O(){e.closeOnClickModal&&E()}function $(){je&&(c.value=!0)}function M(){c.value=!1}function R(){i("openAutoFocus")}function k(){i("closeAutoFocus")}function D(le){var se;((se=le.detail)==null?void 0:se.focusReason)==="pointer"&&le.preventDefault()}e.lockScroll&&ux(c);function ce(){e.closeOnPressEscape&&E()}return ke(()=>e.modelValue,le=>{le?(u.value=!1,C(),f.value=!0,d.value=Ry(e.zIndex)?s():d.value++,Xe(()=>{i("open"),t.value&&(t.value.parentElement.scrollTop=0,t.value.parentElement.scrollLeft=0,t.value.scrollTop=0)})):c.value&&A()}),ke(()=>e.fullscreen,le=>{t.value&&(le?(o=t.value.style.transform,t.value.style.transform=""):t.value.style.transform=o)}),Le(()=>{e.modelValue&&(c.value=!0,f.value=!0,C())}),{afterEnter:g,afterLeave:v,beforeLeave:_,handleClose:E,onModalClick:O,close:A,doClose:M,onOpenAutoFocus:R,onCloseAutoFocus:k,onCloseRequested:ce,onFocusoutPrevented:D,titleId:a,bodyId:l,closed:u,style:x,overlayDialogStyle:y,rendered:f,visible:c,zIndex:d}},dx=U({name:"ElDialog",inheritAttrs:!1}),hx=U({...dx,props:lx,emits:cx,setup(e,{expose:t}){const n=e,r=gi();Wd({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},B(()=>!!r.title));const i=ze("dialog"),s=V(),o=V(),a=V(),{visible:l,titleId:c,bodyId:u,style:f,overlayDialogStyle:d,rendered:h,zIndex:p,afterEnter:m,afterLeave:x,beforeLeave:y,handleClose:g,onModalClick:v,onOpenAutoFocus:_,onCloseAutoFocus:C,onCloseRequested:A,onFocusoutPrevented:E}=fx(n,s);Kt(eh,{dialogRef:s,headerRef:o,bodyId:u,ns:i,rendered:h,style:f});const O=Qd(v),$=B(()=>n.draggable&&!n.fullscreen);return t({visible:l,dialogContentRef:a,resetPosition:()=>{var R;(R=a.value)==null||R.resetPosition()}}),(R,k)=>(P(),Se(b(Hd),{to:R.appendTo,disabled:R.appendTo!=="body"?!1:!R.appendToBody},{default:ue(()=>[Z(ks,{name:"dialog-fade",onAfterEnter:b(m),onAfterLeave:b(x),onBeforeLeave:b(y),persisted:""},{default:ue(()=>[pi(Z(b(tx),{"custom-mask-event":"",mask:R.modal,"overlay-class":R.modalClass,"z-index":b(p)},{default:ue(()=>[re("div",{role:"dialog","aria-modal":"true","aria-label":R.title||void 0,"aria-labelledby":R.title?void 0:b(c),"aria-describedby":b(u),class:J(`${b(i).namespace.value}-overlay-dialog`),style:Ke(b(d)),onClick:b(O).onClick,onMousedown:b(O).onMousedown,onMouseup:b(O).onMouseup},[Z(b(jd),{loop:"",trapped:b(l),"focus-start-el":"container",onFocusAfterTrapped:b(_),onFocusAfterReleased:b(C),onFocusoutPrevented:b(E),onReleaseRequested:b(A)},{default:ue(()=>[b(h)?(P(),Se(ax,$n({key:0,ref_key:"dialogContentRef",ref:a},R.$attrs,{center:R.center,"align-center":R.alignCenter,"close-icon":R.closeIcon,draggable:b($),overflow:R.overflow,fullscreen:R.fullscreen,"header-class":R.headerClass,"body-class":R.bodyClass,"footer-class":R.footerClass,"show-close":R.showClose,title:R.title,"aria-level":R.headerAriaLevel,onClose:b(g)}),rg({header:ue(()=>[R.$slots.title?pe(R.$slots,"title",{key:1}):pe(R.$slots,"header",{key:0,close:b(g),titleId:b(c),titleClass:b(i).e("title")})]),default:ue(()=>[pe(R.$slots,"default")]),_:2},[R.$slots.footer?{name:"footer",fn:ue(()=>[pe(R.$slots,"footer")])}:void 0]),1040,["center","align-center","close-icon","draggable","overflow","fullscreen","header-class","body-class","footer-class","show-close","title","aria-level","onClose"])):ve("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,["aria-label","aria-labelledby","aria-describedby","onClick","onMousedown","onMouseup"])]),_:3},8,["mask","overlay-class","z-index"]),[[yi,b(l)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])]),_:3},8,["to","disabled"]))}});var px=He(hx,[["__file","dialog.vue"]]);const gx=gt(px),mx=Ue({urlList:{type:Ne(Array),default:()=>kt([])},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},hideOnClickModal:Boolean,teleported:Boolean,closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2},minScale:{type:Number,default:.2},maxScale:{type:Number,default:7},showProgress:{type:Boolean,default:!1},crossorigin:{type:Ne(String)}}),vx={close:()=>!0,switch:e=>ft(e),rotate:e=>ft(e)},yx=U({name:"ElImageViewer"}),bx=U({...yx,props:mx,emits:vx,setup(e,{expose:t,emit:n}){var r;const i=e,s={CONTAIN:{name:"contain",icon:qi(Db)},ORIGINAL:{name:"original",icon:qi(Jb)}},{t:o}=Ls(),a=ze("image-viewer"),{nextZIndex:l}=za(),c=V(),u=V([]),f=Lu(),d=V(!0),h=V(i.initialIndex),p=Ut(s.CONTAIN),m=V({scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}),x=V((r=i.zIndex)!=null?r:l()),y=B(()=>{const{urlList:ie}=i;return ie.length<=1}),g=B(()=>h.value===0),v=B(()=>h.value===i.urlList.length-1),_=B(()=>i.urlList[h.value]),C=B(()=>[a.e("btn"),a.e("prev"),a.is("disabled",!i.infinite&&g.value)]),A=B(()=>[a.e("btn"),a.e("next"),a.is("disabled",!i.infinite&&v.value)]),E=B(()=>{const{scale:ie,deg:_e,offsetX:xe,offsetY:we,enableTransition:F}=m.value;let K=xe/ie,H=we/ie;const ee=_e*Math.PI/180,ye=Math.cos(ee),w=Math.sin(ee);K=K*ye+H*w,H=H*ye-xe/ie*w;const S={transform:`scale(${ie}) rotate(${_e}deg) translate(${K}px, ${H}px)`,transition:F?"transform .3s":""};return p.value.name===s.CONTAIN.name&&(S.maxWidth=S.maxHeight="100%"),S}),O=B(()=>`${h.value+1} / ${i.urlList.length}`);function $(){R(),n("close")}function M(){const ie=fo(xe=>{switch(xe.code){case qe.esc:i.closeOnPressEscape&&$();break;case qe.space:se();break;case qe.left:ne();break;case qe.up:ge("zoomIn");break;case qe.right:W();break;case qe.down:ge("zoomOut");break}}),_e=fo(xe=>{const we=xe.deltaY||xe.deltaX;ge(we<0?"zoomIn":"zoomOut",{zoomRate:i.zoomRate,enableTransition:!1})});f.run(()=>{wt(document,"keydown",ie),wt(document,"wheel",_e)})}function R(){f.stop()}function k(){d.value=!1}function D(ie){d.value=!1,ie.target.alt=o("el.image.error")}function ce(ie){if(d.value||ie.button!==0||!c.value)return;m.value.enableTransition=!1;const{offsetX:_e,offsetY:xe}=m.value,we=ie.pageX,F=ie.pageY,K=fo(ee=>{m.value={...m.value,offsetX:_e+ee.pageX-we,offsetY:xe+ee.pageY-F}}),H=wt(document,"mousemove",K);wt(document,"mouseup",()=>{H()}),ie.preventDefault()}function le(){m.value={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}function se(){if(d.value)return;const ie=Uo(s),_e=Object.values(s),xe=p.value.name,F=(_e.findIndex(K=>K.name===xe)+1)%ie.length;p.value=s[ie[F]],le()}function oe(ie){const _e=i.urlList.length;h.value=(ie+_e)%_e}function ne(){g.value&&!i.infinite||oe(h.value-1)}function W(){v.value&&!i.infinite||oe(h.value+1)}function ge(ie,_e={}){if(d.value)return;const{minScale:xe,maxScale:we}=i,{zoomRate:F,rotateDeg:K,enableTransition:H}={zoomRate:i.zoomRate,rotateDeg:90,enableTransition:!0,..._e};switch(ie){case"zoomOut":m.value.scale>xe&&(m.value.scale=Number.parseFloat((m.value.scale/F).toFixed(3)));break;case"zoomIn":m.value.scale<we&&(m.value.scale=Number.parseFloat((m.value.scale*F).toFixed(3)));break;case"clockwise":m.value.deg+=K,n("rotate",m.value.deg);break;case"anticlockwise":m.value.deg-=K,n("rotate",m.value.deg);break}m.value.enableTransition=H}function Re(ie){var _e;((_e=ie.detail)==null?void 0:_e.focusReason)==="pointer"&&ie.preventDefault()}function Ae(){i.closeOnPressEscape&&$()}return ke(_,()=>{Xe(()=>{const ie=u.value[0];ie!=null&&ie.complete||(d.value=!0)})}),ke(h,ie=>{le(),n("switch",ie)}),Le(()=>{M()}),t({setActiveItem:oe}),(ie,_e)=>(P(),Se(b(Hd),{to:"body",disabled:!ie.teleported},{default:ue(()=>[Z(ks,{name:"viewer-fade",appear:""},{default:ue(()=>[re("div",{ref_key:"wrapper",ref:c,tabindex:-1,class:J(b(a).e("wrapper")),style:Ke({zIndex:x.value})},[Z(b(jd),{loop:"",trapped:"","focus-trap-el":c.value,"focus-start-el":"container",onFocusoutPrevented:Re,onReleaseRequested:Ae},{default:ue(()=>[re("div",{class:J(b(a).e("mask")),onClick:Ta(xe=>ie.hideOnClickModal&&$(),["self"])},null,10,["onClick"]),ve(" CLOSE "),re("span",{class:J([b(a).e("btn"),b(a).e("close")]),onClick:$},[Z(b(Ve),null,{default:ue(()=>[Z(b(zs))]),_:1})],2),ve(" ARROW "),b(y)?ve("v-if",!0):(P(),G(Fe,{key:0},[re("span",{class:J(b(C)),onClick:ne},[Z(b(Ve),null,{default:ue(()=>[Z(b(Rd))]),_:1})],2),re("span",{class:J(b(A)),onClick:W},[Z(b(Ve),null,{default:ue(()=>[Z(b(Id))]),_:1})],2)],64)),ie.showProgress?(P(),G("div",{key:1,class:J([b(a).e("btn"),b(a).e("progress")])},[pe(ie.$slots,"progress",{activeIndex:h.value,total:ie.urlList.length},()=>[cn(rt(b(O)),1)])],2)):ve("v-if",!0),ve(" ACTIONS "),re("div",{class:J([b(a).e("btn"),b(a).e("actions")])},[re("div",{class:J(b(a).e("actions__inner"))},[pe(ie.$slots,"toolbar",{actions:ge,prev:ne,next:W,reset:se,activeIndex:h.value},()=>[Z(b(Ve),{onClick:xe=>ge("zoomOut")},{default:ue(()=>[Z(b(l_))]),_:1},8,["onClick"]),Z(b(Ve),{onClick:xe=>ge("zoomIn")},{default:ue(()=>[Z(b(o_))]),_:1},8,["onClick"]),re("i",{class:J(b(a).e("actions__divider"))},null,2),Z(b(Ve),{onClick:se},{default:ue(()=>[(P(),Se(_t(b(p).icon)))]),_:1}),re("i",{class:J(b(a).e("actions__divider"))},null,2),Z(b(Ve),{onClick:xe=>ge("anticlockwise")},{default:ue(()=>[Z(b(Yb))]),_:1},8,["onClick"]),Z(b(Ve),{onClick:xe=>ge("clockwise")},{default:ue(()=>[Z(b(Xb))]),_:1},8,["onClick"])])],2)],2),ve(" CANVAS "),re("div",{class:J(b(a).e("canvas"))},[(P(!0),G(Fe,null,fr(ie.urlList,(xe,we)=>pi((P(),G("img",{ref_for:!0,ref:F=>u.value[we]=F,key:xe,src:xe,style:Ke(b(E)),class:J(b(a).e("img")),crossorigin:ie.crossorigin,onLoad:k,onError:D,onMousedown:ce},null,46,["src","crossorigin"])),[[yi,we===h.value]])),128))],2),pe(ie.$slots,"default")]),_:3},8,["focus-trap-el"])],6)]),_:3})]),_:3},8,["disabled"]))}});var _x=He(bx,[["__file","image-viewer.vue"]]);const xx=gt(_x),wx=Ue({hideOnClickModal:Boolean,src:{type:String,default:""},fit:{type:String,values:["","contain","cover","fill","none","scale-down"],default:""},loading:{type:String,values:["eager","lazy"]},lazy:Boolean,scrollContainer:{type:Ne([String,Object])},previewSrcList:{type:Ne(Array),default:()=>kt([])},previewTeleported:Boolean,zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2},minScale:{type:Number,default:.2},maxScale:{type:Number,default:7},showProgress:{type:Boolean,default:!1},crossorigin:{type:Ne(String)}}),Sx={load:e=>e instanceof Event,error:e=>e instanceof Event,switch:e=>ft(e),close:()=>!0,show:()=>!0},Cx=U({name:"ElImage",inheritAttrs:!1}),Ax=U({...Cx,props:wx,emits:Sx,setup(e,{expose:t,emit:n}){const r=e;let i="";const{t:s}=Ls(),o=ze("image"),a=Sa(),l=B(()=>Ba(Object.entries(a).filter(([W])=>/^(data-|on[A-Z])/i.test(W)||["id","style"].includes(W)))),c=Pd({excludeListeners:!0,excludeKeys:B(()=>Object.keys(l.value))}),u=V(),f=V(!1),d=V(!0),h=V(!1),p=V(),m=V(),x=je&&"loading"in HTMLImageElement.prototype;let y,g;const v=B(()=>[o.e("inner"),C.value&&o.e("preview"),d.value&&o.is("loading")]),_=B(()=>{const{fit:W}=r;return je&&W?{objectFit:W}:{}}),C=B(()=>{const{previewSrcList:W}=r;return de(W)&&W.length>0}),A=B(()=>{const{previewSrcList:W,initialIndex:ge}=r;let Re=ge;return ge>W.length-1&&(Re=0),Re}),E=B(()=>r.loading==="eager"?!1:!x&&r.loading==="lazy"||r.lazy),O=()=>{je&&(d.value=!0,f.value=!1,u.value=r.src)};function $(W){d.value=!1,f.value=!1,n("load",W)}function M(W){d.value=!1,f.value=!0,n("error",W)}function R(){B1(p.value,m.value)&&(O(),ce())}const k=qy(R,200,!0);async function D(){var W;if(!je)return;await Xe();const{scrollContainer:ge}=r;ss(ge)?m.value=ge:Ce(ge)&&ge!==""?m.value=(W=document.querySelector(ge))!=null?W:void 0:p.value&&(m.value=Sb(p.value)),m.value&&(y=wt(m,"scroll",k),setTimeout(()=>R(),100))}function ce(){!je||!m.value||!k||(y==null||y(),m.value=void 0)}function le(W){if(W.ctrlKey){if(W.deltaY<0)return W.preventDefault(),!1;if(W.deltaY>0)return W.preventDefault(),!1}}function se(){C.value&&(g=wt("wheel",le,{passive:!1}),i=document.body.style.overflow,document.body.style.overflow="hidden",h.value=!0,n("show"))}function oe(){g==null||g(),document.body.style.overflow=i,h.value=!1,n("close")}function ne(W){n("switch",W)}return ke(()=>r.src,()=>{E.value?(d.value=!0,f.value=!1,ce(),D()):O()}),Le(()=>{E.value?D():O()}),t({showPreview:se}),(W,ge)=>(P(),G("div",$n({ref_key:"container",ref:p},b(l),{class:[b(o).b(),W.$attrs.class]}),[f.value?pe(W.$slots,"error",{key:0},()=>[re("div",{class:J(b(o).e("error"))},rt(b(s)("el.image.error")),3)]):(P(),G(Fe,{key:1},[u.value!==void 0?(P(),G("img",$n({key:0},b(c),{src:u.value,loading:W.loading,style:b(_),class:b(v),crossorigin:W.crossorigin,onClick:se,onLoad:$,onError:M}),null,16,["src","loading","crossorigin"])):ve("v-if",!0),d.value?(P(),G("div",{key:1,class:J(b(o).e("wrapper"))},[pe(W.$slots,"placeholder",{},()=>[re("div",{class:J(b(o).e("placeholder"))},null,2)])],2)):ve("v-if",!0)],64)),b(C)?(P(),G(Fe,{key:2},[h.value?(P(),Se(b(xx),{key:0,"z-index":W.zIndex,"initial-index":b(A),infinite:W.infinite,"zoom-rate":W.zoomRate,"min-scale":W.minScale,"max-scale":W.maxScale,"show-progress":W.showProgress,"url-list":W.previewSrcList,crossorigin:W.crossorigin,"hide-on-click-modal":W.hideOnClickModal,teleported:W.previewTeleported,"close-on-press-escape":W.closeOnPressEscape,onClose:oe,onSwitch:ne},{progress:ue(Re=>[pe(W.$slots,"progress",dl(Po(Re)))]),toolbar:ue(Re=>[pe(W.$slots,"toolbar",dl(Po(Re)))]),default:ue(()=>[W.$slots.viewer?(P(),G("div",{key:0},[pe(W.$slots,"viewer")])):ve("v-if",!0)]),_:3},8,["z-index","initial-index","infinite","zoom-rate","min-scale","max-scale","show-progress","url-list","crossorigin","hide-on-click-modal","teleported","close-on-press-escape"])):ve("v-if",!0)],64)):ve("v-if",!0)],16))}});var Ex=He(Ax,[["__file","image.vue"]]);const $x=gt(Ex),Tx=["start","center","end","space-around","space-between","space-evenly"],kx=["top","middle","bottom"],Ox=Ue({tag:{type:String,default:"div"},gutter:{type:Number,default:0},justify:{type:String,values:Tx,default:"start"},align:{type:String,values:kx}}),Rx=U({name:"ElRow"}),Ix=U({...Rx,props:Ox,setup(e){const t=e,n=ze("row"),r=B(()=>t.gutter);Kt(Yd,{gutter:r});const i=B(()=>{const o={};return t.gutter&&(o.marginRight=o.marginLeft=`-${t.gutter/2}px`),o}),s=B(()=>[n.b(),n.is(`justify-${t.justify}`,t.justify!=="start"),n.is(`align-${t.align}`,!!t.align)]);return(o,a)=>(P(),Se(_t(o.tag),{class:J(b(s)),style:Ke(b(i))},{default:ue(()=>[pe(o.$slots,"default")]),_:3},8,["class","style"]))}});var Fx=He(Ix,[["__file","row.vue"]]);const Mx=gt(Fx),Hs=Symbol("tabsRootContextKey"),Px=Ue({tabs:{type:Ne(Array),default:()=>kt([])}}),nh="ElTabBar",Nx=U({name:nh}),Bx=U({...Nx,props:Px,setup(e,{expose:t}){const n=e,r=st(),i=Me(Hs);i||Bs(nh,"<el-tabs><el-tab-bar /></el-tabs>");const s=ze("tabs"),o=V(),a=V(),l=()=>{let h=0,p=0;const m=["top","bottom"].includes(i.props.tabPosition)?"width":"height",x=m==="width"?"x":"y",y=x==="x"?"left":"top";return n.tabs.every(g=>{var v,_;const C=(_=(v=r.parent)==null?void 0:v.refs)==null?void 0:_[`tab-${g.uid}`];if(!C)return!1;if(!g.active)return!0;h=C[`offset${Sn(y)}`],p=C[`client${Sn(m)}`];const A=window.getComputedStyle(C);return m==="width"&&(p-=Number.parseFloat(A.paddingLeft)+Number.parseFloat(A.paddingRight),h+=Number.parseFloat(A.paddingLeft)),!1}),{[m]:`${p}px`,transform:`translate${Sn(x)}(${h}px)`}},c=()=>a.value=l(),u=[],f=()=>{var h;u.forEach(m=>m.stop()),u.length=0;const p=(h=r.parent)==null?void 0:h.refs;if(p){for(const m in p)if(m.startsWith("tab-")){const x=p[m];x&&u.push(oi(x,c))}}};ke(()=>n.tabs,async()=>{await Xe(),c(),f()},{immediate:!0});const d=oi(o,()=>c());return qn(()=>{u.forEach(h=>h.stop()),u.length=0,d.stop()}),t({ref:o,update:c}),(h,p)=>(P(),G("div",{ref_key:"barRef",ref:o,class:J([b(s).e("active-bar"),b(s).is(b(i).props.tabPosition)]),style:Ke(a.value)},null,6))}});var Lx=He(Bx,[["__file","tab-bar.vue"]]);const Dx=Ue({panes:{type:Ne(Array),default:()=>kt([])},currentName:{type:[String,Number],default:""},editable:Boolean,type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),zx={tabClick:(e,t,n)=>n instanceof Event,tabRemove:(e,t)=>t instanceof Event},Jc="ElTabNav",jx=U({name:Jc,props:Dx,emits:zx,setup(e,{expose:t,emit:n}){const r=Me(Hs);r||Bs(Jc,"<el-tabs><tab-nav /></el-tabs>");const i=ze("tabs"),s=Qy(),o=lb(),a=V(),l=V(),c=V(),u=V(),f=V(!1),d=V(0),h=V(!1),p=V(!0),m=B(()=>["top","bottom"].includes(r.props.tabPosition)?"width":"height"),x=B(()=>({transform:`translate${m.value==="width"?"X":"Y"}(-${d.value}px)`})),y=()=>{if(!a.value)return;const O=a.value[`offset${Sn(m.value)}`],$=d.value;if(!$)return;const M=$>O?$-O:0;d.value=M},g=()=>{if(!a.value||!l.value)return;const O=l.value[`offset${Sn(m.value)}`],$=a.value[`offset${Sn(m.value)}`],M=d.value;if(O-M<=$)return;const R=O-M>$*2?M+$:O-$;d.value=R},v=async()=>{const O=l.value;if(!f.value||!c.value||!a.value||!O)return;await Xe();const $=c.value.querySelector(".is-active");if(!$)return;const M=a.value,R=["top","bottom"].includes(r.props.tabPosition),k=$.getBoundingClientRect(),D=M.getBoundingClientRect(),ce=R?O.offsetWidth-D.width:O.offsetHeight-D.height,le=d.value;let se=le;R?(k.left<D.left&&(se=le-(D.left-k.left)),k.right>D.right&&(se=le+k.right-D.right)):(k.top<D.top&&(se=le-(D.top-k.top)),k.bottom>D.bottom&&(se=le+(k.bottom-D.bottom))),se=Math.max(se,0),d.value=Math.min(se,ce)},_=()=>{var O;if(!l.value||!a.value)return;e.stretch&&((O=u.value)==null||O.update());const $=l.value[`offset${Sn(m.value)}`],M=a.value[`offset${Sn(m.value)}`],R=d.value;M<$?(f.value=f.value||{},f.value.prev=R,f.value.next=R+M<$,$-R<M&&(d.value=$-M)):(f.value=!1,R>0&&(d.value=0))},C=O=>{let $=0;switch(O.code){case qe.left:case qe.up:$=-1;break;case qe.right:case qe.down:$=1;break;default:return}const M=Array.from(O.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)"));let k=M.indexOf(O.target)+$;k<0?k=M.length-1:k>=M.length&&(k=0),M[k].focus({preventScroll:!0}),M[k].click(),A()},A=()=>{p.value&&(h.value=!0)},E=()=>h.value=!1;return ke(s,O=>{O==="hidden"?p.value=!1:O==="visible"&&setTimeout(()=>p.value=!0,50)}),ke(o,O=>{O?setTimeout(()=>p.value=!0,50):p.value=!1}),oi(c,_),Le(()=>setTimeout(()=>v(),0)),wa(()=>_()),t({scrollToActiveTab:v,removeFocus:E}),()=>{const O=f.value?[Z("span",{class:[i.e("nav-prev"),i.is("disabled",!f.value.prev)],onClick:y},[Z(Ve,null,{default:()=>[Z(Rd,null,null)]})]),Z("span",{class:[i.e("nav-next"),i.is("disabled",!f.value.next)],onClick:g},[Z(Ve,null,{default:()=>[Z(Id,null,null)]})])]:null,$=e.panes.map((M,R)=>{var k,D,ce,le;const se=M.uid,oe=M.props.disabled,ne=(D=(k=M.props.name)!=null?k:M.index)!=null?D:`${R}`,W=!oe&&(M.isClosable||e.editable);M.index=`${R}`;const ge=W?Z(Ve,{class:"is-icon-close",onClick:ie=>n("tabRemove",M,ie)},{default:()=>[Z(zs,null,null)]}):null,Re=((le=(ce=M.slots).label)==null?void 0:le.call(ce))||M.props.label,Ae=!oe&&M.active?0:-1;return Z("div",{ref:`tab-${se}`,class:[i.e("item"),i.is(r.props.tabPosition),i.is("active",M.active),i.is("disabled",oe),i.is("closable",W),i.is("focus",h.value)],id:`tab-${ne}`,key:`tab-${se}`,"aria-controls":`pane-${ne}`,role:"tab","aria-selected":M.active,tabindex:Ae,onFocus:()=>A(),onBlur:()=>E(),onClick:ie=>{E(),n("tabClick",M,ne,ie)},onKeydown:ie=>{W&&(ie.code===qe.delete||ie.code===qe.backspace)&&n("tabRemove",M,ie)}},[Re,ge])});return Z("div",{ref:c,class:[i.e("nav-wrap"),i.is("scrollable",!!f.value),i.is(r.props.tabPosition)]},[O,Z("div",{class:i.e("nav-scroll"),ref:a},[Z("div",{class:[i.e("nav"),i.is(r.props.tabPosition),i.is("stretch",e.stretch&&["top","bottom"].includes(r.props.tabPosition))],ref:l,style:x.value,role:"tablist",onKeydown:C},[e.type?null:Z(Lx,{ref:u,tabs:[...e.panes]},null),$])])])}}}),Hx=Ue({type:{type:String,values:["card","border-card",""],default:""},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:Ne(Function),default:()=>!0},stretch:Boolean}),yo=e=>Ce(e)||ft(e),Vx={[Kn]:e=>yo(e),tabClick:(e,t)=>t instanceof Event,tabChange:e=>yo(e),edit:(e,t)=>["remove","add"].includes(t),tabRemove:e=>yo(e),tabAdd:()=>!0},Wx=U({name:"ElTabs",props:Hx,emits:Vx,setup(e,{emit:t,slots:n,expose:r}){var i;const s=ze("tabs"),o=B(()=>["left","right"].includes(e.tabPosition)),{children:a,addChild:l,removeChild:c}=R1(st(),"ElTabPane"),u=V(),f=V((i=e.modelValue)!=null?i:"0"),d=async(y,g=!1)=>{var v,_;if(!(f.value===y||si(y)))try{let C;if(e.beforeLeave){const A=e.beforeLeave(y,f.value);C=A instanceof Promise?await A:A}else C=!0;C!==!1&&(f.value=y,g&&(t(Kn,y),t("tabChange",y)),(_=(v=u.value)==null?void 0:v.removeFocus)==null||_.call(v))}catch{}},h=(y,g,v)=>{y.props.disabled||(d(g,!0),t("tabClick",y,v))},p=(y,g)=>{y.props.disabled||si(y.props.name)||(g.stopPropagation(),t("edit",y.props.name,"remove"),t("tabRemove",y.props.name))},m=()=>{t("edit",void 0,"add"),t("tabAdd")};ke(()=>e.modelValue,y=>d(y)),ke(f,async()=>{var y;await Xe(),(y=u.value)==null||y.scrollToActiveTab()}),Kt(Hs,{props:e,currentName:f,registerPane:y=>{a.value.push(y)},sortPane:l,unregisterPane:c}),r({currentName:f});const x=({render:y})=>y();return()=>{const y=n["add-icon"],g=e.editable||e.addable?Z("div",{class:[s.e("new-tab"),o.value&&s.e("new-tab-vertical")],tabindex:"0",onClick:m,onKeydown:C=>{[qe.enter,qe.numpadEnter].includes(C.code)&&m()}},[y?pe(n,"add-icon"):Z(Ve,{class:s.is("icon-plus")},{default:()=>[Z(Kb,null,null)]})]):null,v=Z("div",{class:[s.e("header"),o.value&&s.e("header-vertical"),s.is(e.tabPosition)]},[Z(x,{render:()=>{const C=a.value.some(A=>A.slots.label);return Z(jx,{ref:u,currentName:f.value,editable:e.editable,type:e.type,panes:a.value,stretch:e.stretch,onTabClick:h,onTabRemove:p},{$stable:!C})}},null),g]),_=Z("div",{class:s.e("content")},[pe(n,"default")]);return Z("div",{class:[s.b(),s.m(e.tabPosition),{[s.m("card")]:e.type==="card",[s.m("border-card")]:e.type==="border-card"}]},[_,v])}}});var Ux=Wx;const Kx=Ue({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),rh="ElTabPane",Gx=U({name:rh}),Yx=U({...Gx,props:Kx,setup(e){const t=e,n=st(),r=gi(),i=Me(Hs);i||Bs(rh,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const s=ze("tab-pane"),o=V(),a=B(()=>t.closable||i.props.closable),l=Ho(()=>{var h;return i.currentName.value===((h=t.name)!=null?h:o.value)}),c=V(l.value),u=B(()=>{var h;return(h=t.name)!=null?h:o.value}),f=Ho(()=>!t.lazy||c.value||l.value);ke(l,h=>{h&&(c.value=!0)});const d=wr({uid:n.uid,slots:r,props:t,paneName:u,active:l,index:o,isClosable:a});return i.registerPane(d),Le(()=>{i.sortPane(d)}),Qe(()=>{i.unregisterPane(d.uid)}),(h,p)=>b(f)?pi((P(),G("div",{key:0,id:`pane-${b(u)}`,class:J(b(s).b()),role:"tabpanel","aria-hidden":!b(l),"aria-labelledby":`tab-${b(u)}`},[pe(h.$slots,"default")],10,["id","aria-hidden","aria-labelledby"])),[[yi,b(l)]]):ve("v-if",!0)}});var ih=He(Yx,[["__file","tab-pane.vue"]]);const qx=gt(Ux,{TabPane:ih}),Xx=Cr(ih),Zx=Ue({type:{type:String,values:["primary","success","info","warning","danger",""],default:""},size:{type:String,values:Ed,default:""},truncated:Boolean,lineClamp:{type:[String,Number]},tag:{type:String,default:"span"}}),Jx=U({name:"ElText"}),Qx=U({...Jx,props:Zx,setup(e){const t=e,n=V(),r=Ha(),i=ze("text"),s=B(()=>[i.b(),i.m(t.type),i.m(r.value),i.is("truncated",t.truncated),i.is("line-clamp",!si(t.lineClamp))]),o=Sa().title,a=()=>{var l,c,u,f,d;if(o)return;let h=!1;const p=((l=n.value)==null?void 0:l.textContent)||"";if(t.truncated){const m=(c=n.value)==null?void 0:c.offsetWidth,x=(u=n.value)==null?void 0:u.scrollWidth;m&&x&&x>m&&(h=!0)}else if(!si(t.lineClamp)){const m=(f=n.value)==null?void 0:f.offsetHeight,x=(d=n.value)==null?void 0:d.scrollHeight;m&&x&&x>m&&(h=!0)}h?n.value.setAttribute("title",p):n.value.removeAttribute("title")};return Le(a),wa(a),(l,c)=>(P(),Se(_t(l.tag),{ref_key:"textRef",ref:n,class:J(b(s)),style:Ke({"-webkit-line-clamp":l.lineClamp})},{default:ue(()=>[pe(l.$slots,"default")]),_:3},8,["class","style"]))}});var ew=He(Qx,[["__file","text.vue"]]);const tw=gt(ew),sh=["success","info","warning","error"],et=kt({customClass:"",center:!1,dangerouslyUseHTMLString:!1,duration:3e3,icon:void 0,id:"",message:"",onClose:void 0,showClose:!1,type:"info",plain:!1,offset:16,zIndex:0,grouping:!1,repeatNum:1,appendTo:je?document.body:void 0}),nw=Ue({customClass:{type:String,default:et.customClass},center:{type:Boolean,default:et.center},dangerouslyUseHTMLString:{type:Boolean,default:et.dangerouslyUseHTMLString},duration:{type:Number,default:et.duration},icon:{type:mr,default:et.icon},id:{type:String,default:et.id},message:{type:Ne([String,Object,Function]),default:et.message},onClose:{type:Ne(Function),default:et.onClose},showClose:{type:Boolean,default:et.showClose},type:{type:String,values:sh,default:et.type},plain:{type:Boolean,default:et.plain},offset:{type:Number,default:et.offset},zIndex:{type:Number,default:et.zIndex},grouping:{type:Boolean,default:et.grouping},repeatNum:{type:Number,default:et.repeatNum}}),rw={destroy:()=>!0},Rt=ya([]),iw=e=>{const t=Rt.findIndex(i=>i.id===e),n=Rt[t];let r;return t>0&&(r=Rt[t-1]),{current:n,prev:r}},sw=e=>{const{prev:t}=iw(e);return t?t.vm.exposed.bottom.value:0},ow=(e,t)=>Rt.findIndex(r=>r.id===e)>0?16:t,aw=U({name:"ElMessage"}),lw=U({...aw,props:nw,emits:rw,setup(e,{expose:t}){const n=e,{Close:r}=u_,{ns:i,zIndex:s}=vb("message"),{currentZIndex:o,nextZIndex:a}=s,l=V(),c=V(!1),u=V(0);let f;const d=B(()=>n.type?n.type==="error"?"danger":n.type:"info"),h=B(()=>{const E=n.type;return{[i.bm("icon",E)]:E&&Nc[E]}}),p=B(()=>n.icon||Nc[n.type]||""),m=B(()=>sw(n.id)),x=B(()=>ow(n.id,n.offset)+m.value),y=B(()=>u.value+x.value),g=B(()=>({top:`${x.value}px`,zIndex:o.value}));function v(){n.duration!==0&&({stop:f}=Wo(()=>{C()},n.duration))}function _(){f==null||f()}function C(){c.value=!1}function A({code:E}){E===qe.esc&&C()}return Le(()=>{v(),a(),c.value=!0}),ke(()=>n.repeatNum,()=>{_(),v()}),wt(document,"keydown",A),oi(l,()=>{u.value=l.value.getBoundingClientRect().height}),t({visible:c,bottom:y,close:C}),(E,O)=>(P(),Se(ks,{name:b(i).b("fade"),onBeforeLeave:E.onClose,onAfterLeave:$=>E.$emit("destroy"),persisted:""},{default:ue(()=>[pi(re("div",{id:E.id,ref_key:"messageRef",ref:l,class:J([b(i).b(),{[b(i).m(E.type)]:E.type},b(i).is("center",E.center),b(i).is("closable",E.showClose),b(i).is("plain",E.plain),E.customClass]),style:Ke(b(g)),role:"alert",onMouseenter:_,onMouseleave:v},[E.repeatNum>1?(P(),Se(b(Q_),{key:0,value:E.repeatNum,type:b(d),class:J(b(i).e("badge"))},null,8,["value","type","class"])):ve("v-if",!0),b(p)?(P(),Se(b(Ve),{key:1,class:J([b(i).e("icon"),b(h)])},{default:ue(()=>[(P(),Se(_t(b(p))))]),_:1},8,["class"])):ve("v-if",!0),pe(E.$slots,"default",{},()=>[E.dangerouslyUseHTMLString?(P(),G(Fe,{key:1},[ve(" Caution here, message could've been compromised, never use user's input as message "),re("p",{class:J(b(i).e("content")),innerHTML:E.message},null,10,["innerHTML"])],2112)):(P(),G("p",{key:0,class:J(b(i).e("content"))},rt(E.message),3))]),E.showClose?(P(),Se(b(Ve),{key:2,class:J(b(i).e("closeBtn")),onClick:Ta(C,["stop"])},{default:ue(()=>[Z(b(r))]),_:1},8,["class","onClick"])):ve("v-if",!0)],46,["id"]),[[yi,c.value]])]),_:3},8,["name","onBeforeLeave","onAfterLeave"]))}});var cw=He(lw,[["__file","message.vue"]]);let uw=1;const oh=e=>{const t=!e||Ce(e)||qt(e)||fe(e)?{message:e}:e,n={...et,...t};if(!n.appendTo)n.appendTo=document.body;else if(Ce(n.appendTo)){let r=document.querySelector(n.appendTo);ss(r)||(r=document.body),n.appendTo=r}return jo(Vt.grouping)&&!n.grouping&&(n.grouping=Vt.grouping),ft(Vt.duration)&&n.duration===3e3&&(n.duration=Vt.duration),ft(Vt.offset)&&n.offset===16&&(n.offset=Vt.offset),jo(Vt.showClose)&&!n.showClose&&(n.showClose=Vt.showClose),n},fw=e=>{const t=Rt.indexOf(e);if(t===-1)return;Rt.splice(t,1);const{handler:n}=e;n.close()},dw=({appendTo:e,...t},n)=>{const r=`message_${uw++}`,i=t.onClose,s=document.createElement("div"),o={...t,id:r,onClose:()=>{i==null||i(),fw(u)},onDestroy:()=>{ql(null,s)}},a=Z(cw,o,fe(o.message)||qt(o.message)?{default:fe(o.message)?o.message:()=>o.message}:null);a.appContext=n||vr._context,ql(a,s),e.appendChild(s.firstElementChild);const l=a.component,u={id:r,vnode:a,vm:l,handler:{close:()=>{l.exposed.visible.value=!1}},props:a.component.props};return u},vr=(e={},t)=>{if(!je)return{close:()=>{}};const n=oh(e);if(n.grouping&&Rt.length){const i=Rt.find(({vnode:s})=>{var o;return((o=s.props)==null?void 0:o.message)===n.message});if(i)return i.props.repeatNum+=1,i.props.type=n.type,i.handler}if(ft(Vt.max)&&Rt.length>=Vt.max)return{close:()=>{}};const r=dw(n,t);return Rt.push(r),r.handler};sh.forEach(e=>{vr[e]=(t={},n)=>{const r=oh(t);return vr({...r,type:e},n)}});function hw(e){for(const t of Rt)(!e||e===t.props.type)&&t.handler.close()}vr.closeAll=hw;vr._context=null;const Ka=Ab(vr,"$message");var bo={exports:{}},Qc;function pw(){return Qc||(Qc=1,function(e){var t=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var n=function(r){var i=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,s=0,o={},a={manual:r.Prism&&r.Prism.manual,disableWorkerMessageHandler:r.Prism&&r.Prism.disableWorkerMessageHandler,util:{encode:function g(v){return v instanceof l?new l(v.type,g(v.content),v.alias):Array.isArray(v)?v.map(g):v.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(g){return Object.prototype.toString.call(g).slice(8,-1)},objId:function(g){return g.__id||Object.defineProperty(g,"__id",{value:++s}),g.__id},clone:function g(v,_){_=_||{};var C,A;switch(a.util.type(v)){case"Object":if(A=a.util.objId(v),_[A])return _[A];C={},_[A]=C;for(var E in v)v.hasOwnProperty(E)&&(C[E]=g(v[E],_));return C;case"Array":return A=a.util.objId(v),_[A]?_[A]:(C=[],_[A]=C,v.forEach(function(O,$){C[$]=g(O,_)}),C);default:return v}},getLanguage:function(g){for(;g;){var v=i.exec(g.className);if(v)return v[1].toLowerCase();g=g.parentElement}return"none"},setLanguage:function(g,v){g.className=g.className.replace(RegExp(i,"gi"),""),g.classList.add("language-"+v)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(C){var g=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(C.stack)||[])[1];if(g){var v=document.getElementsByTagName("script");for(var _ in v)if(v[_].src==g)return v[_]}return null}},isActive:function(g,v,_){for(var C="no-"+v;g;){var A=g.classList;if(A.contains(v))return!0;if(A.contains(C))return!1;g=g.parentElement}return!!_}},languages:{plain:o,plaintext:o,text:o,txt:o,extend:function(g,v){var _=a.util.clone(a.languages[g]);for(var C in v)_[C]=v[C];return _},insertBefore:function(g,v,_,C){C=C||a.languages;var A=C[g],E={};for(var O in A)if(A.hasOwnProperty(O)){if(O==v)for(var $ in _)_.hasOwnProperty($)&&(E[$]=_[$]);_.hasOwnProperty(O)||(E[O]=A[O])}var M=C[g];return C[g]=E,a.languages.DFS(a.languages,function(R,k){k===M&&R!=g&&(this[R]=E)}),E},DFS:function g(v,_,C,A){A=A||{};var E=a.util.objId;for(var O in v)if(v.hasOwnProperty(O)){_.call(v,O,v[O],C||O);var $=v[O],M=a.util.type($);M==="Object"&&!A[E($)]?(A[E($)]=!0,g($,_,null,A)):M==="Array"&&!A[E($)]&&(A[E($)]=!0,g($,_,O,A))}}},plugins:{},highlightAll:function(g,v){a.highlightAllUnder(document,g,v)},highlightAllUnder:function(g,v,_){var C={callback:_,container:g,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",C),C.elements=Array.prototype.slice.apply(C.container.querySelectorAll(C.selector)),a.hooks.run("before-all-elements-highlight",C);for(var A=0,E;E=C.elements[A++];)a.highlightElement(E,v===!0,C.callback)},highlightElement:function(g,v,_){var C=a.util.getLanguage(g),A=a.languages[C];a.util.setLanguage(g,C);var E=g.parentElement;E&&E.nodeName.toLowerCase()==="pre"&&a.util.setLanguage(E,C);var O=g.textContent,$={element:g,language:C,grammar:A,code:O};function M(k){$.highlightedCode=k,a.hooks.run("before-insert",$),$.element.innerHTML=$.highlightedCode,a.hooks.run("after-highlight",$),a.hooks.run("complete",$),_&&_.call($.element)}if(a.hooks.run("before-sanity-check",$),E=$.element.parentElement,E&&E.nodeName.toLowerCase()==="pre"&&!E.hasAttribute("tabindex")&&E.setAttribute("tabindex","0"),!$.code){a.hooks.run("complete",$),_&&_.call($.element);return}if(a.hooks.run("before-highlight",$),!$.grammar){M(a.util.encode($.code));return}if(v&&r.Worker){var R=new Worker(a.filename);R.onmessage=function(k){M(k.data)},R.postMessage(JSON.stringify({language:$.language,code:$.code,immediateClose:!0}))}else M(a.highlight($.code,$.grammar,$.language))},highlight:function(g,v,_){var C={code:g,grammar:v,language:_};if(a.hooks.run("before-tokenize",C),!C.grammar)throw new Error('The language "'+C.language+'" has no grammar.');return C.tokens=a.tokenize(C.code,C.grammar),a.hooks.run("after-tokenize",C),l.stringify(a.util.encode(C.tokens),C.language)},tokenize:function(g,v){var _=v.rest;if(_){for(var C in _)v[C]=_[C];delete v.rest}var A=new f;return d(A,A.head,g),u(g,A,v,A.head,0),p(A)},hooks:{all:{},add:function(g,v){var _=a.hooks.all;_[g]=_[g]||[],_[g].push(v)},run:function(g,v){var _=a.hooks.all[g];if(!(!_||!_.length))for(var C=0,A;A=_[C++];)A(v)}},Token:l};r.Prism=a;function l(g,v,_,C){this.type=g,this.content=v,this.alias=_,this.length=(C||"").length|0}l.stringify=function g(v,_){if(typeof v=="string")return v;if(Array.isArray(v)){var C="";return v.forEach(function(M){C+=g(M,_)}),C}var A={type:v.type,content:g(v.content,_),tag:"span",classes:["token",v.type],attributes:{},language:_},E=v.alias;E&&(Array.isArray(E)?Array.prototype.push.apply(A.classes,E):A.classes.push(E)),a.hooks.run("wrap",A);var O="";for(var $ in A.attributes)O+=" "+$+'="'+(A.attributes[$]||"").replace(/"/g,"&quot;")+'"';return"<"+A.tag+' class="'+A.classes.join(" ")+'"'+O+">"+A.content+"</"+A.tag+">"};function c(g,v,_,C){g.lastIndex=v;var A=g.exec(_);if(A&&C&&A[1]){var E=A[1].length;A.index+=E,A[0]=A[0].slice(E)}return A}function u(g,v,_,C,A,E){for(var O in _)if(!(!_.hasOwnProperty(O)||!_[O])){var $=_[O];$=Array.isArray($)?$:[$];for(var M=0;M<$.length;++M){if(E&&E.cause==O+","+M)return;var R=$[M],k=R.inside,D=!!R.lookbehind,ce=!!R.greedy,le=R.alias;if(ce&&!R.pattern.global){var se=R.pattern.toString().match(/[imsuy]*$/)[0];R.pattern=RegExp(R.pattern.source,se+"g")}for(var oe=R.pattern||R,ne=C.next,W=A;ne!==v.tail&&!(E&&W>=E.reach);W+=ne.value.length,ne=ne.next){var ge=ne.value;if(v.length>g.length)return;if(!(ge instanceof l)){var Re=1,Ae;if(ce){if(Ae=c(oe,W,g,D),!Ae||Ae.index>=g.length)break;var we=Ae.index,ie=Ae.index+Ae[0].length,_e=W;for(_e+=ne.value.length;we>=_e;)ne=ne.next,_e+=ne.value.length;if(_e-=ne.value.length,W=_e,ne.value instanceof l)continue;for(var xe=ne;xe!==v.tail&&(_e<ie||typeof xe.value=="string");xe=xe.next)Re++,_e+=xe.value.length;Re--,ge=g.slice(W,_e),Ae.index-=W}else if(Ae=c(oe,0,ge,D),!Ae)continue;var we=Ae.index,F=Ae[0],K=ge.slice(0,we),H=ge.slice(we+F.length),ee=W+ge.length;E&&ee>E.reach&&(E.reach=ee);var ye=ne.prev;K&&(ye=d(v,ye,K),W+=K.length),h(v,ye,Re);var w=new l(O,k?a.tokenize(F,k):F,le,F);if(ne=d(v,ye,w),H&&d(v,ne,H),Re>1){var S={cause:O+","+M,reach:ee};u(g,v,_,ne.prev,W,S),E&&S.reach>E.reach&&(E.reach=S.reach)}}}}}}function f(){var g={value:null,prev:null,next:null},v={value:null,prev:g,next:null};g.next=v,this.head=g,this.tail=v,this.length=0}function d(g,v,_){var C=v.next,A={value:_,prev:v,next:C};return v.next=A,C.prev=A,g.length++,A}function h(g,v,_){for(var C=v.next,A=0;A<_&&C!==g.tail;A++)C=C.next;v.next=C,C.prev=v,g.length-=A}function p(g){for(var v=[],_=g.head.next;_!==g.tail;)v.push(_.value),_=_.next;return v}if(!r.document)return r.addEventListener&&(a.disableWorkerMessageHandler||r.addEventListener("message",function(g){var v=JSON.parse(g.data),_=v.language,C=v.code,A=v.immediateClose;r.postMessage(a.highlight(C,a.languages[_],_)),A&&r.close()},!1)),a;var m=a.util.currentScript();m&&(a.filename=m.src,m.hasAttribute("data-manual")&&(a.manual=!0));function x(){a.manual||a.highlightAll()}if(!a.manual){var y=document.readyState;y==="loading"||y==="interactive"&&m&&m.defer?document.addEventListener("DOMContentLoaded",x):window.requestAnimationFrame?window.requestAnimationFrame(x):window.setTimeout(x,16)}return a}(t);e.exports&&(e.exports=n),typeof Zc<"u"&&(Zc.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside["attr-value"].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside["internal-subset"].inside=n.languages.markup,n.hooks.add("wrap",function(r){r.type==="entity"&&(r.attributes.title=r.content.replace(/&amp;/,"&"))}),Object.defineProperty(n.languages.markup.tag,"addInlined",{value:function(i,s){var o={};o["language-"+s]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[s]},o.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:o}};a["language-"+s]={pattern:/[\s\S]+/,inside:n.languages[s]};var l={};l[i]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return i}),"i"),lookbehind:!0,greedy:!0,inside:a},n.languages.insertBefore("markup","cdata",l)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{value:function(r,i){n.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+r+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[i,"language-"+i],inside:n.languages[i]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend("markup",{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,function(r){var i=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;r.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+i.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+i.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+i.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+i.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:i,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},r.languages.css.atrule.inside.rest=r.languages.css;var s=r.languages.markup;s&&(s.tag.addInlined("style","css"),s.tag.addAttribute("style","css"))}(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend("clike",{"class-name":[n.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),n.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),n.languages.markup&&(n.languages.markup.tag.addInlined("script","javascript"),n.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),n.languages.js=n.languages.javascript,function(){if(typeof n>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var r="Loading…",i=function(m,x){return"✖ Error "+m+" while fetching file: "+x},s="✖ Error: File does not exist or is empty",o={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},a="data-src-status",l="loading",c="loaded",u="failed",f="pre[data-src]:not(["+a+'="'+c+'"]):not(['+a+'="'+l+'"])';function d(m,x,y){var g=new XMLHttpRequest;g.open("GET",m,!0),g.onreadystatechange=function(){g.readyState==4&&(g.status<400&&g.responseText?x(g.responseText):g.status>=400?y(i(g.status,g.statusText)):y(s))},g.send(null)}function h(m){var x=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(m||"");if(x){var y=Number(x[1]),g=x[2],v=x[3];return g?v?[y,Number(v)]:[y,void 0]:[y,y]}}n.hooks.add("before-highlightall",function(m){m.selector+=", "+f}),n.hooks.add("before-sanity-check",function(m){var x=m.element;if(x.matches(f)){m.code="",x.setAttribute(a,l);var y=x.appendChild(document.createElement("CODE"));y.textContent=r;var g=x.getAttribute("data-src"),v=m.language;if(v==="none"){var _=(/\.(\w+)$/.exec(g)||[,"none"])[1];v=o[_]||_}n.util.setLanguage(y,v),n.util.setLanguage(x,v);var C=n.plugins.autoloader;C&&C.loadLanguages(v),d(g,function(A){x.setAttribute(a,c);var E=h(x.getAttribute("data-range"));if(E){var O=A.split(/\r\n?|\n/g),$=E[0],M=E[1]==null?O.length:E[1];$<0&&($+=O.length),$=Math.max(0,Math.min($-1,O.length)),M<0&&(M+=O.length),M=Math.max(0,Math.min(M,O.length)),A=O.slice($,M).join(`
`),x.hasAttribute("data-start")||x.setAttribute("data-start",String($+1))}y.textContent=A,n.highlightElement(y)},function(A){x.setAttribute(a,u),y.textContent=A})}}),n.plugins.fileHighlight={highlight:function(x){for(var y=(x||document).querySelectorAll(f),g=0,v;v=y[g++];)n.highlightElement(v)}};var p=!1;n.fileHighlight=function(){p||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),p=!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}}()}(bo)),bo.exports}var gw=pw();const mw=A1(gw);var eu={},tu;function vw(){return tu||(tu=1,function(e){e.languages.typescript=e.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),e.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete e.languages.typescript.parameter,delete e.languages.typescript["literal-property"];var t=e.languages.extend("typescript",{});delete t["class-name"],e.languages.typescript["class-name"].inside=t,e.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:t}}}}),e.languages.ts=e.languages.typescript}(Prism)),eu}vw();const yw={class:"pre"},bw=U({__name:"hilight",props:{code:{},lang:{}},setup(e){const t=e,n=V(),r=B(()=>t.lang?`lang-${t.lang}`:"auto");return Le(()=>{mw.highlightElement(n.value)}),(i,s)=>(P(),G("pre",yw,[re("code",{class:J(b(r)),ref_key:"codeRef",ref:n},rt(i.code),3)]))}}),_w={class:"container"},xw={class:"dialog-footer"},ww=U({__name:"codeDemo",props:{codes:{}},setup(e){const t=V(!1);function n(){t.value=!0}return(r,i)=>{const s=Xx,o=qx,a=C1,l=gx;return P(),G(Fe,null,[re("div",_w,[pe(r.$slots,"default",{checkSource:n},void 0,!0)]),Z(l,{modelValue:b(t),"onUpdate:modelValue":i[1]||(i[1]=c=>We(t)?t.value=c:null),title:"",width:"50vw",top:"50px"},{footer:ue(()=>[re("span",xw,[Z(a,{type:"primary",onClick:i[0]||(i[0]=c=>t.value=!1)},{default:ue(()=>i[2]||(i[2]=[cn("关闭")])),_:1})])]),default:ue(()=>[Z(o,{type:"border-card"},{default:ue(()=>[(P(!0),G(Fe,null,fr(r.codes,c=>(P(),Se(s,{label:c.name,key:c.name,lazy:""},{default:ue(()=>[Z(bw,{code:c.code,lang:c.lang},null,8,["code","lang"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"])],64)}}}),Sw=Nt(ww,[["__scopeId","data-v-65455990"]]),Cw=`<template>
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
`,Aw=`import { rafLoop } from '@thing772/utils'

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
`;function as(e,t,n=.01){return Math.abs(e-t)<=n}function ah(e,t){return Math.sqrt((t.x-e.x)**2+(t.y-e.y)**2)}function Ew(e){return Math.PI*2*e/360}function $w(e){return e/Math.PI*180}function Tw(e,t){let n=t.y-e.y,r=t.x-e.x;return $w(Math.atan2(n,r))}function kw(e,t,n){let r=Ew(t),i=Math.cos(r)*n,s=Math.sin(r)*n;return{x:e.x+i,y:e.y+s}}function Ow(e,t){return ah(e,t)<=e.r-t.r}function Rw(e,t){return{dx:t.x-e.x,dy:t.y-e.y}}function Iw(e,t){e.x+=t.dx,e.y+=t.dy}function Fw(e,t){let n={x:e.x,y:e.y};return Iw(n,t),n}function Mw(e){return e==null||e==null}function Pw(e){return!Mw(e)}function nu(e){return typeof e=="function"}function Nw(){let e,t;return{signal:new Promise((r,i)=>{e=r,t=i}),resolve:e,reject:t}}function Bw(e,t,n){let r=[];for(let i=0;i<t;i++)r.push(e.call(n,i));return r}function Pt(e,t,n,r){let{needLog:i,immediate:s}=r??{};return i&&console.log(`注册${t}事件`),e.addEventListener(t,n),s&&n.call(e),()=>{i&&console.log(`清除${t}事件`),e.removeEventListener(t,n)}}function lh(e,t,n){return function(...r){e.save(),e.beginPath(),Object.assign(e,t);let[i,...s]=r;e.moveTo(i.x,i.y);for(let o of s)e.lineTo(o.x,o.y);e.stroke(),e.restore()}}function be(e,t,n=!0){let r=Math.min(e,t),i=Math.max(e,t),s=Math.random()*(i-r)+r;return n?Math.round(s):s}function ch(e,t,n,r){return Pw(r)?`rgba(${e},${t},${n},${r})`:`rgb(${e},${t},${n})`}function an(e=[0,255],t=[0,255],n=[0,255]){return ch(be(...e),be(...t),be(...n))}[...Array(26)].map((e,t)=>["a","A"].map(n=>String.fromCharCode(n.charCodeAt(0)+t))).flat();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class Gt{constructor(t,n,r,i,s="div"){this.parent=t,this.object=n,this.property=r,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),Gt.nextNameID=Gt.nextNameID||0,this.$name.id=`lil-gui-name-${++Gt.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(r)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const n=this.parent.add(this.object,this.property,t);return n.name(this._name),this.destroy(),n}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Lw extends Gt{constructor(t,n,r){super(t,n,r,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function qo(e){let t,n;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?n=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),n?"#"+n:!1}const Dw={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:qo,toHexString:qo},ai={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},zw={isPrimitive:!1,match:e=>Array.isArray(e),fromHexString(e,t,n=1){const r=ai.fromHexString(e);t[0]=(r>>16&255)/255*n,t[1]=(r>>8&255)/255*n,t[2]=(r&255)/255*n},toHexString([e,t,n],r=1){r=255/r;const i=e*r<<16^t*r<<8^n*r<<0;return ai.toHexString(i)}},jw={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,n=1){const r=ai.fromHexString(e);t.r=(r>>16&255)/255*n,t.g=(r>>8&255)/255*n,t.b=(r&255)/255*n},toHexString({r:e,g:t,b:n},r=1){r=255/r;const i=e*r<<16^t*r<<8^n*r<<0;return ai.toHexString(i)}},Hw=[Dw,ai,zw,jw];function Vw(e){return Hw.find(t=>t.match(e))}class Ww extends Gt{constructor(t,n,r,i){super(t,n,r,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Vw(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=qo(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const n=this._format.fromHexString(t);this.setValue(n)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class _o extends Gt{constructor(t,n,r){super(t,n,r,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Uw extends Gt{constructor(t,n,r,i,s,o){super(t,n,r,"number"),this._initInput(),this.min(i),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,n=!0){return this._step=t,this._stepExplicit=n,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let n=(t-this._min)/(this._max-this._min);n=Math.max(0,Math.min(n,1)),this.$fill.style.width=n*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const n=()=>{let g=parseFloat(this.$input.value);isNaN(g)||(this._stepExplicit&&(g=this._snap(g)),this.setValue(this._clamp(g)))},r=g=>{const v=parseFloat(this.$input.value);isNaN(v)||(this._snapClampSetValue(v+g),this.$input.value=this.getValue())},i=g=>{g.key==="Enter"&&this.$input.blur(),g.code==="ArrowUp"&&(g.preventDefault(),r(this._step*this._arrowKeyMultiplier(g))),g.code==="ArrowDown"&&(g.preventDefault(),r(this._step*this._arrowKeyMultiplier(g)*-1))},s=g=>{this._inputFocused&&(g.preventDefault(),r(this._step*this._normalizeMouseWheel(g)))};let o=!1,a,l,c,u,f;const d=5,h=g=>{a=g.clientX,l=c=g.clientY,o=!0,u=this.getValue(),f=0,window.addEventListener("mousemove",p),window.addEventListener("mouseup",m)},p=g=>{if(o){const v=g.clientX-a,_=g.clientY-l;Math.abs(_)>d?(g.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(v)>d&&m()}if(!o){const v=g.clientY-c;f-=v*this._step*this._arrowKeyMultiplier(g),u+f>this._max?f=this._max-u:u+f<this._min&&(f=this._min-u),this._snapClampSetValue(u+f)}c=g.clientY},m=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",m)},x=()=>{this._inputFocused=!0},y=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",n),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",h),this.$input.addEventListener("focus",x),this.$input.addEventListener("blur",y)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(y,g,v,_,C)=>(y-g)/(v-g)*(C-_)+_,n=y=>{const g=this.$slider.getBoundingClientRect();let v=t(y,g.left,g.right,this._min,this._max);this._snapClampSetValue(v)},r=y=>{this._setDraggingStyle(!0),n(y.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=y=>{n(y.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};let o=!1,a,l;const c=y=>{y.preventDefault(),this._setDraggingStyle(!0),n(y.touches[0].clientX),o=!1},u=y=>{y.touches.length>1||(this._hasScrollBar?(a=y.touches[0].clientX,l=y.touches[0].clientY,o=!0):c(y),window.addEventListener("touchmove",f,{passive:!1}),window.addEventListener("touchend",d))},f=y=>{if(o){const g=y.touches[0].clientX-a,v=y.touches[0].clientY-l;Math.abs(g)>Math.abs(v)?c(y):(window.removeEventListener("touchmove",f),window.removeEventListener("touchend",d))}else y.preventDefault(),n(y.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",f),window.removeEventListener("touchend",d)},h=this._callOnFinishChange.bind(this),p=400;let m;const x=y=>{if(Math.abs(y.deltaX)<Math.abs(y.deltaY)&&this._hasScrollBar)return;y.preventDefault();const v=this._normalizeMouseWheel(y)*this._step;this._snapClampSetValue(this.getValue()+v),this.$input.value=this.getValue(),clearTimeout(m),m=setTimeout(h,p)};this.$slider.addEventListener("mousedown",r),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",x,{passive:!1})}_setDraggingStyle(t,n="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${n}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:n,deltaY:r}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(n=0,r=-t.wheelDelta/120,r*=this._stepExplicit?1:10),n+-r}_arrowKeyMultiplier(t){let n=this._stepExplicit?1:10;return t.shiftKey?n*=10:t.altKey&&(n/=10),n}_snap(t){let n=0;return this._hasMin?n=this._min:this._hasMax&&(n=this._max),t-=n,t=Math.round(t/this._step)*this._step,t+=n,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Kw extends Gt{constructor(t,n,r,i){super(t,n,r,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(n=>{const r=document.createElement("option");r.textContent=n,this.$select.appendChild(r)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),n=this._values.indexOf(t);return this.$select.selectedIndex=n,this.$display.textContent=n===-1?t:this._names[n],this}}class Gw extends Gt{constructor(t,n,r){super(t,n,r,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Yw=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function qw(e){const t=document.createElement("style");t.innerHTML=e;const n=document.querySelector("head link[rel=stylesheet], head style");n?document.head.insertBefore(t,n):document.head.appendChild(t)}let ru=!1;class Ga{constructor({parent:t,autoPlace:n=t===void 0,container:r,width:i,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!ru&&a&&(qw(Yw),ru=!0),r?r.appendChild(this.domElement):n&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=o}add(t,n,r,i,s){if(Object(r)===r)return new Kw(this,t,n,r);const o=t[n];switch(typeof o){case"number":return new Uw(this,t,n,r,i,s);case"boolean":return new Lw(this,t,n);case"string":return new Gw(this,t,n);case"function":return new _o(this,t,n)}console.error(`gui.add failed
	property:`,n,`
	object:`,t,`
	value:`,o)}addColor(t,n,r=1){return new Ww(this,t,n,r)}addFolder(t){const n=new Ga({parent:this,title:t});return this.root._closeFolders&&n.close(),n}load(t,n=!0){return t.controllers&&this.controllers.forEach(r=>{r instanceof _o||r._name in t.controllers&&r.load(t.controllers[r._name])}),n&&t.folders&&this.folders.forEach(r=>{r._title in t.folders&&r.load(t.folders[r._title])}),this}save(t=!0){const n={controllers:{},folders:{}};return this.controllers.forEach(r=>{if(!(r instanceof _o)){if(r._name in n.controllers)throw new Error(`Cannot save GUI with duplicate property "${r._name}"`);n.controllers[r._name]=r.save()}}),t&&this.folders.forEach(r=>{if(r._title in n.folders)throw new Error(`Cannot save GUI with duplicate folder "${r._title}"`);n.folders[r._title]=r.save()}),n}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const n=this.$children.clientHeight;this.$children.style.height=n+"px",this.domElement.classList.add("transition");const r=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",r))};this.$children.addEventListener("transitionend",r);const i=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(r=>r.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(n=>{t=t.concat(n.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(n=>{t=t.concat(n.foldersRecursive())}),t}}function uh(e,t,n={},r=0){for(let i in t){if(r==0&&i=="title"&&t.title){e.title(t.title);continue}let s=t[i];if(Array.isArray(s)){if(r==0){const o=e.addFolder(i);s.forEach(a=>{uh(o,a,n,r+1)})}else console.warn("only top level can add folder");continue}else if(typeof s=="function")n[i]=s,e.add(n,i);else{n[i]=s.value[0];const{isColor:o,value:a,disable:l,...c}=s;let u=e[o?"addColor":"add"](n,i,...s.value.slice(1));l&&u.disable(l);let f;for(f in c)u[f](c[f])}}}function Xw(e){let t={},n=new Ga;return uh(n,e,t),{gui:n,obj:t,helpers:{getAllControllers(){return n.controllersRecursive()},getControllerByKey(r){return n.controllersRecursive().find(i=>i.property==r)}}}}function Ar(e){let t;function n(r){e(r)!==!1&&(t=requestAnimationFrame(n))}return t=requestAnimationFrame(n),()=>{cancelAnimationFrame(t)}}function yr(e,t,n){return(t-e)*n+e}var xn;(function(e){e[e.COLLISION=0]="COLLISION",e[e.FRICTION=1]="FRICTION"})(xn||(xn={}));var tr;(function(e){e[e.TOP=0]="TOP",e[e.LEFT=1]="LEFT",e[e.BOTTOM=2]="BOTTOM",e[e.RIGHT=3]="RIGHT"})(tr||(tr={}));var wn;(function(e){e[e.X=0]="X",e[e.Y=1]="Y"})(wn||(wn={}));function Zw(e,t){let{wBox:n,hBox:r,speedDecay:i}=t,[s,o]=n,[a,l]=r;e.x+e.r>o?(e.x=o-e.r,e.vx*=-1,i&&(e.vx=i(e,wn.X,xn.COLLISION,tr.RIGHT))):e.x-e.r<s?(e.x=e.r+s,e.vx*=-1,i&&(e.vx=i(e,wn.X,xn.COLLISION,tr.LEFT))):i&&(e.vx=i(e,wn.X,xn.FRICTION)),e.y+e.r>l?(e.y=l-e.r,e.vy*=-1,i&&(e.vy=i(e,wn.Y,xn.COLLISION,tr.BOTTOM))):e.y-e.r<0?(e.y=e.r+a,e.vy*=-1,i&&(e.vy=i(e,wn.Y,xn.COLLISION,tr.TOP))):i&&(e.vy=i(e,wn.Y,xn.FRICTION))}function Jw(e,t){const n=new AudioContext;let r=n.createMediaElementSource(e);const i=n.createAnalyser();r.connect(i),i.connect(n.destination),i.fftSize=512;const s=i.frequencyBinCount,o=new Uint8Array(s),a=t.getContext("2d");let l=t.width,c=t.height;function u(){i.getByteTimeDomainData(o),a.save(),Object.assign(a,{fillStyle:"red"});const h=l/s;for(let p=0;p<s;p+=4){let m=o[p]/255*c;a.fillRect(h*p,c-m,h,m)}a.fill(),a.restore()}function f(h,p){l=t.width=h,c=t.height=p}function d(){return Ar(()=>{a.clearRect(0,0,l,c),u()})}return{setSize:f,start:d}}const Qw="/demo/assets/%E5%8C%96%E5%87%A1-DF7X08YA.ogg";function mt(e){if(!e.title){let n=O0().meta.title;n&&(e.title=n)}let t=Xw(e);return Qe(()=>{t.gui.destroy()}),t}const e2=["src"],t2=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t;mt({查看源码(){n("check-source")}});const r=V(),i=V();return Le(()=>{let s;i.value.onplay=()=>{const{start:o,setSize:a}=Jw(i.value,r.value);s=Pt(window,"resize",()=>{a(innerWidth,innerHeight)},{immediate:!0}),o()},Qe(()=>{s&&s()})}),(s,o)=>(P(),G(Fe,null,[re("audio",{ref_key:"audioRef",ref:i,src:b(Qw),id:"audio",controls:""},null,8,e2),re("canvas",{ref_key:"canvasRef",ref:r},null,512)],64))}}),n2=Nt(t2,[["__scopeId","data-v-24237bd0"]]),r2="/demo/assets/display-_9yby0tz.png",i2={codes:[{name:"index.vue",code:Cw,lang:"js"},{name:"audio-wave",code:Aw,lang:"ts"}],component:n2,display:r2,title:"音频波形",descriptions:""},s2=`<template>
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
`,Er=`type BallOptions = {
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
`;class on{constructor(t){ae(this,"x",0);ae(this,"y",0);ae(this,"r",0);ae(this,"vx",0);ae(this,"vy",0);ae(this,"ax",0);ae(this,"ay",0);ae(this,"styleOptions",{});t&&this.set(t)}reset(t){return Object.assign(this,{x:0,y:0,r:0,vx:0,vy:0,ax:0,ay:0,...t?{styleOptions:{}}:null})}set(t){return Object.assign(this,t)}update(){return this.vy+=this.ay,this.y+=this.vy,this.vx+=this.ax,this.x+=this.vx,this}render(t){t.save();let{x:n,y:r,r:i,styleOptions:s}=this;Object.assign(t,s),t.beginPath(),t.arc(n,r,i,0,Math.PI*2),s.fillStyle&&t.fill(),s.strokeStyle&&t.stroke(),t.restore()}}const o2=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t;mt({查看源码(){n("check-source")}});const r=V();return Le(()=>{let i=r.value,s,o,a,l=i.getContext("2d");const c=Pt(window,"resize",()=>{Object.assign(i,{width:s=innerWidth,height:o=innerHeight})},{immediate:!0}),u=Pt(i,"mousemove",function(d){a={x:d.offsetX,y:d.offsetY}});let f=new on({r:100,x:s/2,y:o/2,styleOptions:{fillStyle:an()}});Ar(()=>{l.clearRect(0,0,s,o),a&&(f.x=yr(f.x,a.x,.05),f.y=yr(f.y,a.y,.05)),f.render(l)}),Qe(()=>{c(),u()})}),(i,s)=>(P(),G("canvas",{ref_key:"canvasRef",ref:r},null,512))}}),a2="/demo/assets/display-IdleEMXt.png",l2={codes:[{name:"index.vue",code:s2,lang:"js"},{name:"ball.ts",code:Er,lang:"ts"}],component:o2,display:a2,title:"缓动追逐",descriptions:""},c2=`<template>
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
`,Ya=`import { rafLoop, updateBallVelocityInRect, isFunc } from '@thing772/utils'
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
`;function fh(e){return Math.floor(Math.random()*e.length)}function dh(e){return e[fh(e)]}function u2(e,t=1e3){let n=[];for(let r=0;r<e;r++)n.push(nr(t));return n}function nr(e=1e3){return Math.ceil(Math.random()*e)}function f2(e,t){return e.reduce((n,r,i)=>(i%t==0&&n.push(e.slice(i,i+t)),n),[])}function li(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function Wi(e){return e!=null}function _i(e){return typeof e=="function"}function Vs(e){return e}function qa(e){let t=[];function n(r){let i=r-t.length;return i>0?t.push(...Bw(e,i)):i<0&&(t=t.slice(0,i)),t}return n.update=function(r){t.forEach(i=>r(i))},n}function Xa(e){let{canvas:t,ballsNum:n,createBallFac:r,onBallUpdate:i,speedDecay:s,preRender:o,postRender:a}=e,l=t.width,c=t.height;const u=t.getContext("2d");let f=[];const d=qa(r);function h(_){f=d(_),m()}function p(_){Object.assign(t,_),l=_.width,c=_.height,m()}function m(_){f.forEach(C=>{nu(_)&&_(C),C.render(u)})}function x(){u.clearRect(0,0,l,c);for(let _ of f)nu(i)?i(_):(_.update(),Zw(_,{wBox:[0,l],hBox:[0,c],speedDecay:s}));o==null||o(f,u),f.forEach(_=>_.render(u)),a==null||a(f,u)}function y(_){u.clearRect(0,0,l,c),m(_)}h(n);let g;function v(){return g&&g(),g=Ar(()=>{x()})}return{start:v,setBallNum:h,setSize:p,render:x,updateBalls:y}}const d2=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t;let r=80,i=1,s=3,o=3,a=100,l;mt({小球个数:{value:[r,1,1e3,10],onFinishChange(h){r=h,f.setBallNum(h)}},小球半径上限:{value:[i,1,100,1],onFinishChange(h){i=h,f.updateBalls(p=>{p.r=be(1,h)})}},小球x方向移动速度上限:{value:[s,1,15,.5],onFinishChange(h){s=h,f.updateBalls(p=>{p.vx=be(1,h)})}},小球y方向移动速度上限:{value:[o,1,15,.5],onFinishChange(h){o=h,f.updateBalls(p=>{p.vy=be(1,h)})}},小球连接范围阈值:{value:[a,50,300,1],onFinishChange(h){a=h}},查看源码(){n("check-source")}});let c;const u=V();let f,d;return Le(()=>{let h=u.value,p=innerWidth,m=innerHeight;Object.assign(h,{width:p,height:m}),f=Xa({canvas:h,ballsNum:r,createBallFac:()=>new on({x:be(10,p-10),y:be(10,m-10),r:be(1,i),vx:be(1,s),vy:be(1,o),styleOptions:{fillStyle:an()}}),preRender(g,v){l||(l=lh(v,{strokeStyle:an(),lineWidth:1})),d&&(g=g.concat(d));for(let _=0;_<g.length;_++)for(let C=_+1;C<g.length;C++){let A=g[_],E=g[C];ah(A,E)<a&&l(A,E)}d&&g.pop()}});const x=Pt(window,"resize",()=>{p=innerWidth,m=innerHeight,f.setSize({width:p,height:m})},{immediate:!0}),y=Pt(h,"mousemove",g=>{d={x:g.offsetX,y:g.offsetY}},{needLog:!0});c=f.start(),Qe(()=>{x(),y(),c&&c()})}),(h,p)=>(P(),G("canvas",{ref_key:"canvasRef",ref:u},null,512))}}),h2="/demo/assets/display-y86Fu395.png",p2={codes:[{name:"index.vue",code:c2,lang:"js"},{name:"wander-balls.ts",code:Ya,lang:"ts"},{name:"ball.ts",code:Er,lang:"ts"}],component:d2,display:h2,title:"粒子小球连线",descriptions:""},g2=`<template>
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
`,m2=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t;mt({查看源码(){n("check-source")}});const r=V();return Le(()=>{let i=r.value,s,o,a,l=i.getContext("2d");const c=Pt(window,"resize",()=>{Object.assign(i,{width:s=innerWidth,height:o=innerHeight})},{immediate:!0}),u=Pt(i,"mousemove",function(x){a={x:x.offsetX,y:x.offsetY}});let f=[new on({r:50,x:s/2-80,y:o/2,styleOptions:{fillStyle:an()}}),new on({r:50,x:s/2+80,y:o/2,styleOptions:{fillStyle:an()}})],d=f.map(x=>new on({r:x.r/4,x:x.x,y:x.y,styleOptions:{fillStyle:an()}})),h=new on({r:200,x:s/2,y:o/2,styleOptions:{fillStyle:"#E6A23C"}}),p=lh(l,{strokeStyle:"#fff",lineWidth:"10",lineCap:"round"}),m=.05;Ar(()=>{l.clearRect(0,0,s,o),h.render(l),f.forEach(x=>{x.render(l)}),d.forEach((x,y)=>{if(a){let g=x.x=yr(x.x,a.x,m),v=x.y=yr(x.y,a.y,m),_=f[y],C={x:_.x,y:_.y,r:_.r-10};if(!Ow(C,x)){x.x=g,x.y=v;let A=Tw(C,a);Object.assign(x,kw(C,A,C.r-x.r))}}x.render(l)}),p({x:s/2-50,y:o/2+100},{x:s/2+50,y:o/2+100})}),Qe(()=>{c(),u()})}),(i,s)=>(P(),G("canvas",{ref_key:"canvasRef",ref:r},null,512))}}),v2="/demo/assets/display-BcjSOcDf.png",y2={codes:[{name:"index.vue",code:g2,lang:"js"},{name:"ball.ts",code:Er,lang:"ts"}],component:m2,display:v2,title:"会动的眼球",descriptions:""},b2=`<template>
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
`,_2=`import { Ball } from '@/utils/class/ball'
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
`;function x2(e){let{canvas:t,num:n,onAllStopped:r}=e;const i=t.getContext("2d");let s=t.width,o=t.height,a=[],l=!1,c=!1;const u=qa(()=>new on(f()));function f(){return{x:be(10,s-10),y:be(10,o-10),r:4,ax:0,ay:be(.1,2,!1),vx:0,vy:be(1,3),styleOptions:{fillStyle:an()},stopped:!1}}function d(g){a=u(g)}function h(){for(let g of a)g.reset().set(f());if(c=!1,!l)return y()}function p(g){Object.assign(t,g),s=g.width,o=g.height}function m(g){return g.stopped||as(g.vy,0,1)&&as(g.y+g.r,o,1)}function x(){if(a.length!=0){i.clearRect(0,0,s,o);for(let g of a)if(g.update(),g.y+g.r>o&&(g.y=o-g.r,g.vy*=-.7),g.render(i),m(g)&&(g.stopped=!0,a.every(m))){l=!1,c=!0;try{r==null||r()}catch(v){console.error(v)}return!1}}}d(n);function y(){if(l)return;l=!0,c&&h();let g=Ar(x);return()=>{l&&(l=!1,g())}}return{start:y,reset:h,setBallsNum:d,setSize:p,render:x}}const w2=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t;let r=100;const i=V(),{helpers:{getControllerByKey:s}}=mt({小球个数:{value:[r,1,1e3,10],onFinishChange(c){r=c,a.setBallsNum(c)}},开始(){let c=a.start();c&&(i.value=c)},暂停:{value:[function(){i.value()}],disable:!i.value},重置(){let c=a.reset();c&&(i.value=c)},查看源码(){n("check-source")}});ke(i,c=>{s("暂停").enable(!!c)});const o=V();let a;function l(){Ka({showClose:!0,message:"所有小球都停止运动了",type:"success",grouping:!0})}return Le(()=>{let c=o.value;Object.assign(c,{width:innerWidth,height:innerHeight}),a=x2({num:r,canvas:c,onAllStopped:l});const u=Pt(window,"resize",()=>{a.setSize({width:innerWidth,height:innerHeight})},{immediate:!0});a.render(),Qe(()=>{u(),i.value&&i.value()})}),(c,u)=>(P(),G("canvas",{ref_key:"canvasRef",ref:o},null,512))}}),S2="/demo/assets/display-DOU4TeMC.png",C2={codes:[{name:"index.vue",code:b2,lang:"js"},{name:"falling-balls.ts",code:_2,lang:"ts"},{name:"ball.ts",code:Er,lang:"ts"}],component:w2,display:S2,title:"下落的小球",descriptions:""},A2=`<template>
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
`,E2=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t;let r=100,i=20,s=20,o=17,a=.01;mt({小球个数:{value:[r,1,1e3,10],onFinishChange(f){r=f,u.setBallNum(f)}},小球半径上限:{value:[i,4,100,1],onFinishChange(f){i=f,u.updateBalls(d=>{d.r=be(4,f)})}},小球x方向移动速度上限:{value:[s,1,15,.5],onFinishChange(f){s=f,u.updateBalls(d=>{d.vx=be(1,f)})}},小球y方向移动速度上限:{value:[o,1,15,.5],onFinishChange(f){o=f,u.updateBalls(d=>{d.vy=be(1,f)})}},小球摩擦力因子:{value:[a,0,3,.1],onFinishChange(f){a=f,u.updateBalls(d=>{d.friction=be(0,f)})}},开始(){l&&l(),l=u.start()},查看源码(){n("check-source")}});let l;const c=V();let u;return Le(()=>{let f=c.value,d,h;Object.assign(f,{width:d=innerWidth,height:h=innerHeight}),u=Xa({canvas:f,ballsNum:r,createBallFac:()=>{let m={x:be(10,d-10),y:be(10,h-10),r:be(1,i),vx:be(1,s),vy:be(1,o),styleOptions:{fillStyle:an()},friction:be(0,a)};return new on(m)},onBallUpdate(m){m.vx>=.01&&(m.vx-=m.friction,m.x+=m.vx),m.vy>=.01&&(m.vy-=m.friction,m.y+=m.vy),m.x>d+m.r&&(m.x=-m.r),m.y>h+m.r&&(m.y=-m.r)}});const p=Pt(window,"resize",()=>{u.setSize({width:d=innerWidth,height:h=innerHeight})},{immediate:!0});Qe(()=>{p(),l&&l()})}),(f,d)=>(P(),G("canvas",{ref_key:"canvasRef",ref:c},null,512))}}),$2="/demo/assets/display-BaZn1eIe.png",T2={codes:[{name:"index.vue",code:A2,lang:"js"},{name:"wander-balls.ts",code:Ya,lang:"ts"},{name:"ball.ts",code:Er,lang:"ts"}],component:E2,display:$2,title:"运动减速",descriptions:""},k2=`<template>
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
`;class O2{constructor(t){ae(this,"x",0);ae(this,"y",0);ae(this,"tx",0);ae(this,"ty",0);ae(this,"color","pink");ae(this,"name","");ae(this,"fx",.01);ae(this,"fy",.01);ae(this,"onDone");ae(this,"r",0);ae(this,"size",0);ae(this,"done",!1);Object.assign(this,t)}update(){var r;let{tx:t,ty:n}=this;if(!this.done)return this.x=yr(this.x,t,this.fx),this.y=yr(this.y,n,this.fy),as(this.x,this.tx)&&as(this.y,this.ty)&&(this.done=!0,(r=this.onDone)==null||r.call(this)),this}render(t){let{color:n,x:r,y:i,size:s,r:o}=this;t.save(),Object.assign(t,{fillStyle:n}),t.beginPath(),s>0?t.fillRect(r,i,s,s):o>0?t.arc(r,i,o,0,Math.PI*2):t.arc(r,i,2,0,Math.PI*2),t.fill(),t.restore()}}class R2{constructor(t){ae(this,"canvas");ae(this,"ctx");ae(this,"fontSize",200);ae(this,"fontFamily","微软雅黑");ae(this,"color","pink");ae(this,"gap",3);ae(this,"alphaThreshold",30);ae(this,"w",0);ae(this,"h",0);let{canvas:n,ctx:r,fontSize:i,fontFamily:s,color:o,gap:a,alphaThreshold:l}=t;this.canvas=n,this.ctx=r??n.getContext("2d"),i&&(this.fontSize=i),s&&(this.fontFamily=s),o&&(this.color=o),a!=null&&(this.gap=a),l!=null&&(this.alphaThreshold=l),this.w=n.width,this.h=n.height}setSize(t){this.w=t.width,this.h=t.height}_measureText(t){let{ctx:n,fontSize:r,fontFamily:i,color:s,w:o,h:a}=this;n.save(),Object.assign(n,{font:`${r}px ${i}`,fillStyle:s,textBaseline:"bottom"});let l=n.measureText(t),{width:c,actualBoundingBoxAscent:u,actualBoundingBoxDescent:f}=l,d=~~(Math.abs(u)+Math.abs(f));c=~~c,n.fillText(t,0,d);let h=n.getImageData(0,0,c,d).data;return n.clearRect(0,0,o,a),n.restore(),{data:h,width:c,height:d}}getParticles(t){let{data:n,width:r,height:i}=this._measureText(t),{gap:s,alphaThreshold:o,w:a,h:l}=this,c=[],u=[];for(let f=0;f<r;f+=s)for(let d=0;d<i;d+=s){let h=d*r+f,p=n[h*4+0],m=n[h*4+1],x=n[h*4+2],y=n[h*4+3];if(y<=o)continue;let{signal:g,resolve:v}=Nw();c.push(g);let _=Fw({x:f,y:d},Rw({x:r/2,y:i/2},{x:a/2,y:l/2}));u.push({tx:_.x,ty:_.y,color:ch(p,m,x,y),onDone:v})}return{particles:u,done:Promise.all(c)}}}const I2=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t,r=V(),i=V("");let s,o=[],a=3,l="#f00",c=30,u=100,f=1,d=.1,h=.1,p=innerWidth,m=innerHeight,x=qa(()=>new O2({r:f,x:be(0,p),y:be(0,m),fx:.1,fy:.1})),y="hello world";function g(_,C){let A=s.getParticles(_);return o=x(A.particles.length).map(E=>(E.done=!1,C&&(E.x=be(0,p),E.y=be(0,m)),E)),o.forEach((E,O)=>Object.assign(E,A.particles[O])),A.done}function v(){i.value&&(y=i.value,g(y,!0))}return Le(()=>{let _=r.value;const C=_.getContext("2d");Object.assign(_,{width:p,height:m}),s=new R2({canvas:_,ctx:C,gap:a,alphaThreshold:c,color:l}),mt({调整文字颜色:{value:[l],isColor:!0,onFinishChange(O){s.color=O,g(y,!0)}},采样alpha过滤阈值:{value:[c,0,100,1],onFinishChange(O){s.alphaThreshold=O,g(y,!0)}},采样间隔调整:{value:[a,0,20,1],onFinishChange(O){s.gap=O,g(y,!0)}},点大小调整:{value:[f,1,20,1],onFinishChange(O){f=O,x.update($=>$.r=O),g(y,!0)}},x方向缓动因子调整:{value:[d,.01,1,.01],onFinishChange(O){d=O,x.update($=>$.fx=O),g(y,!0)}},y方向缓动因子调整:{value:[h,.01,1,.01],onFinishChange(O){h=O,x.update($=>$.fy=O),g(y,!0)}},字体大小调整:{value:[u,50,340,10],onFinishChange(O){u=O,s.fontSize=O,g(y,!0)}},查看源码(){n("check-source")}}),g(y);const A=Ar(()=>{C.clearRect(0,0,p,m),o.forEach(O=>{O.render(C),O.update()})}),E=Pt(window,"resize",()=>{p=innerWidth,m=innerHeight,_.width=p,_.height=m,s.setSize({width:p,height:m})});Qe(()=>{E(),A()})}),(_,C)=>{const A=I_;return P(),G(Fe,null,[re("canvas",{ref_key:"canvasRef",ref:r},null,512),Z(A,{class:"input",modelValue:b(i),"onUpdate:modelValue":C[0]||(C[0]=E=>We(i)?i.value=E:null),placeholder:"请输入内容",size:"large",onKeyup:vm(v,["enter"])},null,8,["modelValue"])],64)}}}),F2=Nt(I2,[["__scopeId","data-v-2e3c1ef8"]]),M2=`import { iterateEaseFromTo, looseEqual } from '@thing772/utils'

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
`,P2=`import { getSignal, ptOffset, getMovePt, rgb } from '@thing772/utils'
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
`,N2="/demo/assets/display-DOJbIvru.png",B2={codes:[{name:"index.vue",code:k2,lang:"js"},{name:"textParticle.ts",code:P2,lang:"ts"},{name:"particle.ts",code:M2,lang:"ts"}],component:F2,display:N2,title:"文字粒子化",descriptions:""},L2=`<template>
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
`,D2=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t;let r=100,i=20,s=10,o=7;mt({小球个数:{value:[r,1,1e3,10],onFinishChange(u){r=u,c.setBallNum(u)}},小球半径上限:{value:[i,4,100,1],onFinishChange(u){i=u,c.updateBalls(f=>{f.r=be(4,u)})}},小球x方向移动速度上限:{value:[s,1,15,.5],onFinishChange(u){s=u,c.updateBalls(f=>{f.vx=be(1,u)})}},小球y方向移动速度上限:{value:[o,1,15,.5],onFinishChange(u){o=u,c.updateBalls(f=>{f.vy=be(1,u)})}},开始(){a&&a(),a=c.start()},查看源码(){n("check-source")}});let a;const l=V();let c;return Le(()=>{let u=l.value,f=innerWidth,d=innerHeight;Object.assign(u,{width:f,height:d}),c=Xa({canvas:u,ballsNum:r,createBallFac:()=>new on({x:be(10,f-10),y:be(10,d-10),r:be(1,i),vx:be(1,s),vy:be(1,o),styleOptions:{fillStyle:an()}})});const h=Pt(window,"resize",()=>{f=innerWidth,d=innerHeight,c.setSize({width:f,height:d})},{immediate:!0});c.render(),Qe(()=>{h(),a&&a()})}),(u,f)=>(P(),G("canvas",{ref_key:"canvasRef",ref:l},null,512))}}),z2="/demo/assets/display-BpUGJlnU.png",j2={codes:[{name:"index.vue",code:L2,lang:"js"},{name:"wander-balls.ts",code:Ya,lang:"ts"},{name:"ball.ts",code:Er,lang:"ts"}],component:D2,display:z2,title:"矩形区域内飘荡的小球",descriptions:""},H2=`<template>
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
`,V2={class:"container"},W2=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t,{obj:r}=mt({模糊自身:{value:[!1],onChange(a){i.value=a}},模糊背景:{value:[!1],onChange(a){s.value=a}},查看源码(){n("check-source")}}),i=V(r.模糊自身),s=V(r.模糊背景),o=B(()=>["el2",{"blur-self":i.value,"blur-backdrop":s.value}]);return(a,l)=>(P(),G("div",V2,[l[0]||(l[0]=re("div",{class:"el1"}," 财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人， 较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻） ",-1)),re("div",{class:J(b(o))}," 财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。 ",2)]))}}),U2=Nt(W2,[["__scopeId","data-v-bce03b61"]]),K2="/demo/assets/display-C7z4HTpE.png",G2={codes:[{name:"index.vue",code:H2,lang:"js"}],component:U2,display:K2,title:"css模糊效果",descriptions:""},Y2=`<template>
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
`,q2=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t;let{obj:r}=mt({"添加box-shadow":{value:[!1],onChange(l){i.value=l}},添加圆角:{value:[!1],onChange(l){s.value=l}},"添加filter:drop-shadow":{value:[!1],onChange(l){o.value=l}},查看源码(){n("check-source")}});const i=V(r["添加box-shadow"]),s=V(r.添加圆角),o=V(r["添加filter:drop-shadow"]),a=B(()=>["container",{"has-shadow-box":i.value,"round-border":s.value,filter:o.value}]);return(l,c)=>(P(),G("div",{class:J(b(a))},c[0]||(c[0]=[cn(" 测试文本 "),re("div",{class:"circle"}," 测试文本2 ",-1)]),2))}}),X2=Nt(q2,[["__scopeId","data-v-8a62668d"]]),Z2="/demo/assets/display-CvX0ByRG.png",J2={codes:[{name:"index.vue",code:Y2,lang:"js"}],component:X2,display:Z2,title:"css box阴影效果",descriptions:""},Q2=`<template>
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
`;function ln(e,t){return e==null||t==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function eS(e,t){return e==null||t==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function hh(e){let t,n,r;e.length!==2?(t=ln,n=(a,l)=>ln(e(a),l),r=(a,l)=>e(a)-l):(t=e===ln||e===eS?e:tS,n=e,r=e);function i(a,l,c=0,u=a.length){if(c<u){if(t(l,l)!==0)return u;do{const f=c+u>>>1;n(a[f],l)<0?c=f+1:u=f}while(c<u)}return c}function s(a,l,c=0,u=a.length){if(c<u){if(t(l,l)!==0)return u;do{const f=c+u>>>1;n(a[f],l)<=0?c=f+1:u=f}while(c<u)}return c}function o(a,l,c=0,u=a.length){const f=i(a,l,c,u-1);return f>c&&r(a[f-1],l)>-r(a[f],l)?f-1:f}return{left:i,center:o,right:s}}function tS(){return 0}function nS(e){return e===null?NaN:+e}const rS=hh(ln),iS=rS.right;hh(nS).center;class Xo extends Map{constructor(t,n=aS){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:n}}),t!=null)for(const[r,i]of t)this.set(r,i)}get(t){return super.get(iu(this,t))}has(t){return super.has(iu(this,t))}set(t,n){return super.set(sS(this,t),n)}delete(t){return super.delete(oS(this,t))}}function iu({_intern:e,_key:t},n){const r=t(n);return e.has(r)?e.get(r):n}function sS({_intern:e,_key:t},n){const r=t(n);return e.has(r)?e.get(r):(e.set(r,n),n)}function oS({_intern:e,_key:t},n){const r=t(n);return e.has(r)&&(n=e.get(r),e.delete(r)),n}function aS(e){return e!==null&&typeof e=="object"?e.valueOf():e}function Zo(e){return e}function lS(e,...t){return ph(e,Zo,Zo,t)}function cS(e,t,...n){return ph(e,Zo,t,n)}function ph(e,t,n,r){return function i(s,o){if(o>=r.length)return n(s);const a=new Xo,l=r[o++];let c=-1;for(const u of s){const f=l(u,++c,s),d=a.get(f);d?d.push(u):a.set(f,[u])}for(const[u,f]of a)a.set(u,i(f,o));return t(a)}(e,0)}function uS(e,t){return Array.from(t,n=>e[n])}function su(e,...t){if(typeof e[Symbol.iterator]!="function")throw new TypeError("values is not iterable");e=Array.from(e);let[n]=t;if(n&&n.length!==2||t.length>1){const r=Uint32Array.from(e,(i,s)=>s);return t.length>1?(t=t.map(i=>e.map(i)),r.sort((i,s)=>{for(const o of t){const a=Jo(o[i],o[s]);if(a)return a}})):(n=e.map(n),r.sort((i,s)=>Jo(n[i],n[s]))),uS(e,r)}return e.sort(fS(n))}function fS(e=ln){if(e===ln)return Jo;if(typeof e!="function")throw new TypeError("compare is not a function");return(t,n)=>{const r=e(t,n);return r||r===0?r:(e(n,n)===0)-(e(t,t)===0)}}function Jo(e,t){return(e==null||!(e>=e))-(t==null||!(t>=t))||(e<t?-1:e>t?1:0)}function dS(e,t,n){return(t.length!==2?su(cS(e,t,n),([r,i],[s,o])=>ln(i,o)||ln(r,s)):su(lS(e,n),([r,i],[s,o])=>t(i,o)||ln(r,s))).map(([r])=>r)}const hS=Math.sqrt(50),pS=Math.sqrt(10),gS=Math.sqrt(2);function ls(e,t,n){const r=(t-e)/Math.max(0,n),i=Math.floor(Math.log10(r)),s=r/Math.pow(10,i),o=s>=hS?10:s>=pS?5:s>=gS?2:1;let a,l,c;return i<0?(c=Math.pow(10,-i)/o,a=Math.round(e*c),l=Math.round(t*c),a/c<e&&++a,l/c>t&&--l,c=-c):(c=Math.pow(10,i)*o,a=Math.round(e/c),l=Math.round(t/c),a*c<e&&++a,l*c>t&&--l),l<a&&.5<=n&&n<2?ls(e,t,n*2):[a,l,c]}function mS(e,t,n){if(t=+t,e=+e,n=+n,!(n>0))return[];if(e===t)return[e];const r=t<e,[i,s,o]=r?ls(t,e,n):ls(e,t,n);if(!(s>=i))return[];const a=s-i+1,l=new Array(a);if(r)if(o<0)for(let c=0;c<a;++c)l[c]=(s-c)/-o;else for(let c=0;c<a;++c)l[c]=(s-c)*o;else if(o<0)for(let c=0;c<a;++c)l[c]=(i+c)/-o;else for(let c=0;c<a;++c)l[c]=(i+c)*o;return l}function Qo(e,t,n){return t=+t,e=+e,n=+n,ls(e,t,n)[2]}function vS(e,t,n){t=+t,e=+e,n=+n;const r=t<e,i=r?Qo(t,e,n):Qo(e,t,n);return(r?-1:1)*(i<0?1/-i:i)}function yS(e,t){let n;if(t===void 0)for(const r of e)r!=null&&(n<r||n===void 0&&r>=r)&&(n=r);else{let r=-1;for(let i of e)(i=t(i,++r,e))!=null&&(n<i||n===void 0&&i>=i)&&(n=i)}return n}function bS(e,t,n){e=+e,t=+t,n=(i=arguments.length)<2?(t=e,e=0,1):i<3?1:+n;for(var r=-1,i=Math.max(0,Math.ceil((t-e)/n))|0,s=new Array(i);++r<i;)s[r]=e+r*n;return s}function _S(e){return e}var xo=1,wo=2,ea=3,Pr=4,ou=1e-6;function xS(e){return"translate("+e+",0)"}function wS(e){return"translate(0,"+e+")"}function SS(e){return t=>+e(t)}function CS(e,t){return t=Math.max(0,e.bandwidth()-t*2)/2,e.round()&&(t=Math.round(t)),n=>+e(n)+t}function AS(){return!this.__axis}function gh(e,t){var n=[],r=null,i=null,s=6,o=6,a=3,l=typeof window<"u"&&window.devicePixelRatio>1?0:.5,c=e===xo||e===Pr?-1:1,u=e===Pr||e===wo?"x":"y",f=e===xo||e===ea?xS:wS;function d(h){var p=r??(t.ticks?t.ticks.apply(t,n):t.domain()),m=i??(t.tickFormat?t.tickFormat.apply(t,n):_S),x=Math.max(s,0)+a,y=t.range(),g=+y[0]+l,v=+y[y.length-1]+l,_=(t.bandwidth?CS:SS)(t.copy(),l),C=h.selection?h.selection():h,A=C.selectAll(".domain").data([null]),E=C.selectAll(".tick").data(p,t).order(),O=E.exit(),$=E.enter().append("g").attr("class","tick"),M=E.select("line"),R=E.select("text");A=A.merge(A.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),E=E.merge($),M=M.merge($.append("line").attr("stroke","currentColor").attr(u+"2",c*s)),R=R.merge($.append("text").attr("fill","currentColor").attr(u,c*x).attr("dy",e===xo?"0em":e===ea?"0.71em":"0.32em")),h!==C&&(A=A.transition(h),E=E.transition(h),M=M.transition(h),R=R.transition(h),O=O.transition(h).attr("opacity",ou).attr("transform",function(k){return isFinite(k=_(k))?f(k+l):this.getAttribute("transform")}),$.attr("opacity",ou).attr("transform",function(k){var D=this.parentNode.__axis;return f((D&&isFinite(D=D(k))?D:_(k))+l)})),O.remove(),A.attr("d",e===Pr||e===wo?o?"M"+c*o+","+g+"H"+l+"V"+v+"H"+c*o:"M"+l+","+g+"V"+v:o?"M"+g+","+c*o+"V"+l+"H"+v+"V"+c*o:"M"+g+","+l+"H"+v),E.attr("opacity",1).attr("transform",function(k){return f(_(k)+l)}),M.attr(u+"2",c*s),R.attr(u,c*x).text(m),C.filter(AS).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",e===wo?"start":e===Pr?"end":"middle"),C.each(function(){this.__axis=_})}return d.scale=function(h){return arguments.length?(t=h,d):t},d.ticks=function(){return n=Array.from(arguments),d},d.tickArguments=function(h){return arguments.length?(n=h==null?[]:Array.from(h),d):n.slice()},d.tickValues=function(h){return arguments.length?(r=h==null?null:Array.from(h),d):r&&r.slice()},d.tickFormat=function(h){return arguments.length?(i=h,d):i},d.tickSize=function(h){return arguments.length?(s=o=+h,d):s},d.tickSizeInner=function(h){return arguments.length?(s=+h,d):s},d.tickSizeOuter=function(h){return arguments.length?(o=+h,d):o},d.tickPadding=function(h){return arguments.length?(a=+h,d):a},d.offset=function(h){return arguments.length?(l=+h,d):l},d}function ES(e){return gh(ea,e)}function $S(e){return gh(Pr,e)}var TS={value:()=>{}};function mh(){for(var e=0,t=arguments.length,n={},r;e<t;++e){if(!(r=arguments[e]+"")||r in n||/[\s.]/.test(r))throw new Error("illegal type: "+r);n[r]=[]}return new Ui(n)}function Ui(e){this._=e}function kS(e,t){return e.trim().split(/^|\s+/).map(function(n){var r="",i=n.indexOf(".");if(i>=0&&(r=n.slice(i+1),n=n.slice(0,i)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:r}})}Ui.prototype=mh.prototype={constructor:Ui,on:function(e,t){var n=this._,r=kS(e+"",n),i,s=-1,o=r.length;if(arguments.length<2){for(;++s<o;)if((i=(e=r[s]).type)&&(i=OS(n[i],e.name)))return i;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++s<o;)if(i=(e=r[s]).type)n[i]=au(n[i],e.name,t);else if(t==null)for(i in n)n[i]=au(n[i],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new Ui(e)},call:function(e,t){if((i=arguments.length-2)>0)for(var n=new Array(i),r=0,i,s;r<i;++r)n[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(s=this._[e],r=0,i=s.length;r<i;++r)s[r].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var r=this._[e],i=0,s=r.length;i<s;++i)r[i].value.apply(t,n)}};function OS(e,t){for(var n=0,r=e.length,i;n<r;++n)if((i=e[n]).name===t)return i.value}function au(e,t,n){for(var r=0,i=e.length;r<i;++r)if(e[r].name===t){e[r]=TS,e=e.slice(0,r).concat(e.slice(r+1));break}return n!=null&&e.push({name:t,value:n}),e}var ta="http://www.w3.org/1999/xhtml";const lu={svg:"http://www.w3.org/2000/svg",xhtml:ta,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Ws(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),lu.hasOwnProperty(t)?{space:lu[t],local:e}:e}function RS(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===ta&&t.documentElement.namespaceURI===ta?t.createElement(e):t.createElementNS(n,e)}}function IS(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Za(e){var t=Ws(e);return(t.local?IS:RS)(t)}function FS(){}function Ja(e){return e==null?FS:function(){return this.querySelector(e)}}function MS(e){typeof e!="function"&&(e=Ja(e));for(var t=this._groups,n=t.length,r=new Array(n),i=0;i<n;++i)for(var s=t[i],o=s.length,a=r[i]=new Array(o),l,c,u=0;u<o;++u)(l=s[u])&&(c=e.call(l,l.__data__,u,s))&&("__data__"in l&&(c.__data__=l.__data__),a[u]=c);return new Ct(r,this._parents)}function PS(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function NS(){return[]}function vh(e){return e==null?NS:function(){return this.querySelectorAll(e)}}function BS(e){return function(){return PS(e.apply(this,arguments))}}function LS(e){typeof e=="function"?e=BS(e):e=vh(e);for(var t=this._groups,n=t.length,r=[],i=[],s=0;s<n;++s)for(var o=t[s],a=o.length,l,c=0;c<a;++c)(l=o[c])&&(r.push(e.call(l,l.__data__,c,o)),i.push(l));return new Ct(r,i)}function yh(e){return function(){return this.matches(e)}}function bh(e){return function(t){return t.matches(e)}}var DS=Array.prototype.find;function zS(e){return function(){return DS.call(this.children,e)}}function jS(){return this.firstElementChild}function HS(e){return this.select(e==null?jS:zS(typeof e=="function"?e:bh(e)))}var VS=Array.prototype.filter;function WS(){return Array.from(this.children)}function US(e){return function(){return VS.call(this.children,e)}}function KS(e){return this.selectAll(e==null?WS:US(typeof e=="function"?e:bh(e)))}function GS(e){typeof e!="function"&&(e=yh(e));for(var t=this._groups,n=t.length,r=new Array(n),i=0;i<n;++i)for(var s=t[i],o=s.length,a=r[i]=[],l,c=0;c<o;++c)(l=s[c])&&e.call(l,l.__data__,c,s)&&a.push(l);return new Ct(r,this._parents)}function _h(e){return new Array(e.length)}function YS(){return new Ct(this._enter||this._groups.map(_h),this._parents)}function cs(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}cs.prototype={constructor:cs,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function qS(e){return function(){return e}}function XS(e,t,n,r,i,s){for(var o=0,a,l=t.length,c=s.length;o<c;++o)(a=t[o])?(a.__data__=s[o],r[o]=a):n[o]=new cs(e,s[o]);for(;o<l;++o)(a=t[o])&&(i[o]=a)}function ZS(e,t,n,r,i,s,o){var a,l,c=new Map,u=t.length,f=s.length,d=new Array(u),h;for(a=0;a<u;++a)(l=t[a])&&(d[a]=h=o.call(l,l.__data__,a,t)+"",c.has(h)?i[a]=l:c.set(h,l));for(a=0;a<f;++a)h=o.call(e,s[a],a,s)+"",(l=c.get(h))?(r[a]=l,l.__data__=s[a],c.delete(h)):n[a]=new cs(e,s[a]);for(a=0;a<u;++a)(l=t[a])&&c.get(d[a])===l&&(i[a]=l)}function JS(e){return e.__data__}function QS(e,t){if(!arguments.length)return Array.from(this,JS);var n=t?ZS:XS,r=this._parents,i=this._groups;typeof e!="function"&&(e=qS(e));for(var s=i.length,o=new Array(s),a=new Array(s),l=new Array(s),c=0;c<s;++c){var u=r[c],f=i[c],d=f.length,h=eC(e.call(u,u&&u.__data__,c,r)),p=h.length,m=a[c]=new Array(p),x=o[c]=new Array(p),y=l[c]=new Array(d);n(u,f,m,x,y,h,t);for(var g=0,v=0,_,C;g<p;++g)if(_=m[g]){for(g>=v&&(v=g+1);!(C=x[v])&&++v<p;);_._next=C||null}}return o=new Ct(o,r),o._enter=a,o._exit=l,o}function eC(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function tC(){return new Ct(this._exit||this._groups.map(_h),this._parents)}function nC(e,t,n){var r=this.enter(),i=this,s=this.exit();return typeof e=="function"?(r=e(r),r&&(r=r.selection())):r=r.append(e+""),t!=null&&(i=t(i),i&&(i=i.selection())),n==null?s.remove():n(s),r&&i?r.merge(i).order():i}function rC(e){for(var t=e.selection?e.selection():e,n=this._groups,r=t._groups,i=n.length,s=r.length,o=Math.min(i,s),a=new Array(i),l=0;l<o;++l)for(var c=n[l],u=r[l],f=c.length,d=a[l]=new Array(f),h,p=0;p<f;++p)(h=c[p]||u[p])&&(d[p]=h);for(;l<i;++l)a[l]=n[l];return new Ct(a,this._parents)}function iC(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var r=e[t],i=r.length-1,s=r[i],o;--i>=0;)(o=r[i])&&(s&&o.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(o,s),s=o);return this}function sC(e){e||(e=oC);function t(f,d){return f&&d?e(f.__data__,d.__data__):!f-!d}for(var n=this._groups,r=n.length,i=new Array(r),s=0;s<r;++s){for(var o=n[s],a=o.length,l=i[s]=new Array(a),c,u=0;u<a;++u)(c=o[u])&&(l[u]=c);l.sort(t)}return new Ct(i,this._parents).order()}function oC(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function aC(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function lC(){return Array.from(this)}function cC(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],i=0,s=r.length;i<s;++i){var o=r[i];if(o)return o}return null}function uC(){let e=0;for(const t of this)++e;return e}function fC(){return!this.node()}function dC(e){for(var t=this._groups,n=0,r=t.length;n<r;++n)for(var i=t[n],s=0,o=i.length,a;s<o;++s)(a=i[s])&&e.call(a,a.__data__,s,i);return this}function hC(e){return function(){this.removeAttribute(e)}}function pC(e){return function(){this.removeAttributeNS(e.space,e.local)}}function gC(e,t){return function(){this.setAttribute(e,t)}}function mC(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function vC(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function yC(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function bC(e,t){var n=Ws(e);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((t==null?n.local?pC:hC:typeof t=="function"?n.local?yC:vC:n.local?mC:gC)(n,t))}function xh(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function _C(e){return function(){this.style.removeProperty(e)}}function xC(e,t,n){return function(){this.style.setProperty(e,t,n)}}function wC(e,t,n){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(e):this.style.setProperty(e,r,n)}}function SC(e,t,n){return arguments.length>1?this.each((t==null?_C:typeof t=="function"?wC:xC)(e,t,n??"")):br(this.node(),e)}function br(e,t){return e.style.getPropertyValue(t)||xh(e).getComputedStyle(e,null).getPropertyValue(t)}function CC(e){return function(){delete this[e]}}function AC(e,t){return function(){this[e]=t}}function EC(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function $C(e,t){return arguments.length>1?this.each((t==null?CC:typeof t=="function"?EC:AC)(e,t)):this.node()[e]}function wh(e){return e.trim().split(/^|\s+/)}function Qa(e){return e.classList||new Sh(e)}function Sh(e){this._node=e,this._names=wh(e.getAttribute("class")||"")}Sh.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Ch(e,t){for(var n=Qa(e),r=-1,i=t.length;++r<i;)n.add(t[r])}function Ah(e,t){for(var n=Qa(e),r=-1,i=t.length;++r<i;)n.remove(t[r])}function TC(e){return function(){Ch(this,e)}}function kC(e){return function(){Ah(this,e)}}function OC(e,t){return function(){(t.apply(this,arguments)?Ch:Ah)(this,e)}}function RC(e,t){var n=wh(e+"");if(arguments.length<2){for(var r=Qa(this.node()),i=-1,s=n.length;++i<s;)if(!r.contains(n[i]))return!1;return!0}return this.each((typeof t=="function"?OC:t?TC:kC)(n,t))}function IC(){this.textContent=""}function FC(e){return function(){this.textContent=e}}function MC(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function PC(e){return arguments.length?this.each(e==null?IC:(typeof e=="function"?MC:FC)(e)):this.node().textContent}function NC(){this.innerHTML=""}function BC(e){return function(){this.innerHTML=e}}function LC(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function DC(e){return arguments.length?this.each(e==null?NC:(typeof e=="function"?LC:BC)(e)):this.node().innerHTML}function zC(){this.nextSibling&&this.parentNode.appendChild(this)}function jC(){return this.each(zC)}function HC(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function VC(){return this.each(HC)}function WC(e){var t=typeof e=="function"?e:Za(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function UC(){return null}function KC(e,t){var n=typeof e=="function"?e:Za(e),r=t==null?UC:typeof t=="function"?t:Ja(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})}function GC(){var e=this.parentNode;e&&e.removeChild(this)}function YC(){return this.each(GC)}function qC(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function XC(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function ZC(e){return this.select(e?XC:qC)}function JC(e){return arguments.length?this.property("__data__",e):this.node().__data__}function QC(e){return function(t){e.call(this,t,this.__data__)}}function eA(e){return e.trim().split(/^|\s+/).map(function(t){var n="",r=t.indexOf(".");return r>=0&&(n=t.slice(r+1),t=t.slice(0,r)),{type:t,name:n}})}function tA(e){return function(){var t=this.__on;if(t){for(var n=0,r=-1,i=t.length,s;n<i;++n)s=t[n],(!e.type||s.type===e.type)&&s.name===e.name?this.removeEventListener(s.type,s.listener,s.options):t[++r]=s;++r?t.length=r:delete this.__on}}}function nA(e,t,n){return function(){var r=this.__on,i,s=QC(t);if(r){for(var o=0,a=r.length;o<a;++o)if((i=r[o]).type===e.type&&i.name===e.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=s,i.options=n),i.value=t;return}}this.addEventListener(e.type,s,n),i={type:e.type,name:e.name,value:t,listener:s,options:n},r?r.push(i):this.__on=[i]}}function rA(e,t,n){var r=eA(e+""),i,s=r.length,o;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,c=a.length,u;l<c;++l)for(i=0,u=a[l];i<s;++i)if((o=r[i]).type===u.type&&o.name===u.name)return u.value}return}for(a=t?nA:tA,i=0;i<s;++i)this.each(a(r[i],t,n));return this}function Eh(e,t,n){var r=xh(e),i=r.CustomEvent;typeof i=="function"?i=new i(t,n):(i=r.document.createEvent("Event"),n?(i.initEvent(t,n.bubbles,n.cancelable),i.detail=n.detail):i.initEvent(t,!1,!1)),e.dispatchEvent(i)}function iA(e,t){return function(){return Eh(this,e,t)}}function sA(e,t){return function(){return Eh(this,e,t.apply(this,arguments))}}function oA(e,t){return this.each((typeof t=="function"?sA:iA)(e,t))}function*aA(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],i=0,s=r.length,o;i<s;++i)(o=r[i])&&(yield o)}var $h=[null];function Ct(e,t){this._groups=e,this._parents=t}function xi(){return new Ct([[document.documentElement]],$h)}function lA(){return this}Ct.prototype=xi.prototype={constructor:Ct,select:MS,selectAll:LS,selectChild:HS,selectChildren:KS,filter:GS,data:QS,enter:YS,exit:tC,join:nC,merge:rC,selection:lA,order:iC,sort:sC,call:aC,nodes:lC,node:cC,size:uC,empty:fC,each:dC,attr:bC,style:SC,property:$C,classed:RC,text:PC,html:DC,raise:jC,lower:VC,append:WC,insert:KC,remove:YC,clone:ZC,datum:JC,on:rA,dispatch:oA,[Symbol.iterator]:aA};function cA(e){return typeof e=="string"?new Ct([[document.querySelector(e)]],[document.documentElement]):new Ct([[e]],$h)}function uA(e){return cA(Za(e).call(document.documentElement))}function el(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function Th(e,t){var n=Object.create(e.prototype);for(var r in t)n[r]=t[r];return n}function wi(){}var ci=.7,us=1/ci,ur="\\s*([+-]?\\d+)\\s*",ui="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Yt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",fA=/^#([0-9a-f]{3,8})$/,dA=new RegExp(`^rgb\\(${ur},${ur},${ur}\\)$`),hA=new RegExp(`^rgb\\(${Yt},${Yt},${Yt}\\)$`),pA=new RegExp(`^rgba\\(${ur},${ur},${ur},${ui}\\)$`),gA=new RegExp(`^rgba\\(${Yt},${Yt},${Yt},${ui}\\)$`),mA=new RegExp(`^hsl\\(${ui},${Yt},${Yt}\\)$`),vA=new RegExp(`^hsla\\(${ui},${Yt},${Yt},${ui}\\)$`),cu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};el(wi,Gn,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:uu,formatHex:uu,formatHex8:yA,formatHsl:bA,formatRgb:fu,toString:fu});function uu(){return this.rgb().formatHex()}function yA(){return this.rgb().formatHex8()}function bA(){return kh(this).formatHsl()}function fu(){return this.rgb().formatRgb()}function Gn(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=fA.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?du(t):n===3?new pt(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?Mi(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?Mi(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=dA.exec(e))?new pt(t[1],t[2],t[3],1):(t=hA.exec(e))?new pt(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=pA.exec(e))?Mi(t[1],t[2],t[3],t[4]):(t=gA.exec(e))?Mi(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=mA.exec(e))?gu(t[1],t[2]/100,t[3]/100,1):(t=vA.exec(e))?gu(t[1],t[2]/100,t[3]/100,t[4]):cu.hasOwnProperty(e)?du(cu[e]):e==="transparent"?new pt(NaN,NaN,NaN,0):null}function du(e){return new pt(e>>16&255,e>>8&255,e&255,1)}function Mi(e,t,n,r){return r<=0&&(e=t=n=NaN),new pt(e,t,n,r)}function _A(e){return e instanceof wi||(e=Gn(e)),e?(e=e.rgb(),new pt(e.r,e.g,e.b,e.opacity)):new pt}function na(e,t,n,r){return arguments.length===1?_A(e):new pt(e,t,n,r??1)}function pt(e,t,n,r){this.r=+e,this.g=+t,this.b=+n,this.opacity=+r}el(pt,na,Th(wi,{brighter(e){return e=e==null?us:Math.pow(us,e),new pt(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?ci:Math.pow(ci,e),new pt(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new pt(Vn(this.r),Vn(this.g),Vn(this.b),fs(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:hu,formatHex:hu,formatHex8:xA,formatRgb:pu,toString:pu}));function hu(){return`#${jn(this.r)}${jn(this.g)}${jn(this.b)}`}function xA(){return`#${jn(this.r)}${jn(this.g)}${jn(this.b)}${jn((isNaN(this.opacity)?1:this.opacity)*255)}`}function pu(){const e=fs(this.opacity);return`${e===1?"rgb(":"rgba("}${Vn(this.r)}, ${Vn(this.g)}, ${Vn(this.b)}${e===1?")":`, ${e})`}`}function fs(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Vn(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function jn(e){return e=Vn(e),(e<16?"0":"")+e.toString(16)}function gu(e,t,n,r){return r<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new Ot(e,t,n,r)}function kh(e){if(e instanceof Ot)return new Ot(e.h,e.s,e.l,e.opacity);if(e instanceof wi||(e=Gn(e)),!e)return new Ot;if(e instanceof Ot)return e;e=e.rgb();var t=e.r/255,n=e.g/255,r=e.b/255,i=Math.min(t,n,r),s=Math.max(t,n,r),o=NaN,a=s-i,l=(s+i)/2;return a?(t===s?o=(n-r)/a+(n<r)*6:n===s?o=(r-t)/a+2:o=(t-n)/a+4,a/=l<.5?s+i:2-s-i,o*=60):a=l>0&&l<1?0:o,new Ot(o,a,l,e.opacity)}function wA(e,t,n,r){return arguments.length===1?kh(e):new Ot(e,t,n,r??1)}function Ot(e,t,n,r){this.h=+e,this.s=+t,this.l=+n,this.opacity=+r}el(Ot,wA,Th(wi,{brighter(e){return e=e==null?us:Math.pow(us,e),new Ot(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?ci:Math.pow(ci,e),new Ot(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*t,i=2*n-r;return new pt(So(e>=240?e-240:e+120,i,r),So(e,i,r),So(e<120?e+240:e-120,i,r),this.opacity)},clamp(){return new Ot(mu(this.h),Pi(this.s),Pi(this.l),fs(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=fs(this.opacity);return`${e===1?"hsl(":"hsla("}${mu(this.h)}, ${Pi(this.s)*100}%, ${Pi(this.l)*100}%${e===1?")":`, ${e})`}`}}));function mu(e){return e=(e||0)%360,e<0?e+360:e}function Pi(e){return Math.max(0,Math.min(1,e||0))}function So(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const tl=e=>()=>e;function SA(e,t){return function(n){return e+n*t}}function CA(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(r){return Math.pow(e+r*t,n)}}function AA(e){return(e=+e)==1?Oh:function(t,n){return n-t?CA(t,n,e):tl(isNaN(t)?n:t)}}function Oh(e,t){var n=t-e;return n?SA(e,n):tl(isNaN(e)?t:e)}const ds=function e(t){var n=AA(t);function r(i,s){var o=n((i=na(i)).r,(s=na(s)).r),a=n(i.g,s.g),l=n(i.b,s.b),c=Oh(i.opacity,s.opacity);return function(u){return i.r=o(u),i.g=a(u),i.b=l(u),i.opacity=c(u),i+""}}return r.gamma=e,r}(1);function EA(e,t){t||(t=[]);var n=e?Math.min(t.length,e.length):0,r=t.slice(),i;return function(s){for(i=0;i<n;++i)r[i]=e[i]*(1-s)+t[i]*s;return r}}function $A(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function TA(e,t){var n=t?t.length:0,r=e?Math.min(n,e.length):0,i=new Array(r),s=new Array(n),o;for(o=0;o<r;++o)i[o]=nl(e[o],t[o]);for(;o<n;++o)s[o]=t[o];return function(a){for(o=0;o<r;++o)s[o]=i[o](a);return s}}function kA(e,t){var n=new Date;return e=+e,t=+t,function(r){return n.setTime(e*(1-r)+t*r),n}}function Tt(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}function OA(e,t){var n={},r={},i;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(i in t)i in e?n[i]=nl(e[i],t[i]):r[i]=t[i];return function(s){for(i in n)r[i]=n[i](s);return r}}var ra=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Co=new RegExp(ra.source,"g");function RA(e){return function(){return e}}function IA(e){return function(t){return e(t)+""}}function Rh(e,t){var n=ra.lastIndex=Co.lastIndex=0,r,i,s,o=-1,a=[],l=[];for(e=e+"",t=t+"";(r=ra.exec(e))&&(i=Co.exec(t));)(s=i.index)>n&&(s=t.slice(n,s),a[o]?a[o]+=s:a[++o]=s),(r=r[0])===(i=i[0])?a[o]?a[o]+=i:a[++o]=i:(a[++o]=null,l.push({i:o,x:Tt(r,i)})),n=Co.lastIndex;return n<t.length&&(s=t.slice(n),a[o]?a[o]+=s:a[++o]=s),a.length<2?l[0]?IA(l[0].x):RA(t):(t=l.length,function(c){for(var u=0,f;u<t;++u)a[(f=l[u]).i]=f.x(c);return a.join("")})}function nl(e,t){var n=typeof t,r;return t==null||n==="boolean"?tl(t):(n==="number"?Tt:n==="string"?(r=Gn(t))?(t=r,ds):Rh:t instanceof Gn?ds:t instanceof Date?kA:$A(t)?EA:Array.isArray(t)?TA:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?OA:Tt)(e,t)}function FA(e,t){return e=+e,t=+t,function(n){return Math.round(e*(1-n)+t*n)}}var vu=180/Math.PI,ia={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Ih(e,t,n,r,i,s){var o,a,l;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(l=e*n+t*r)&&(n-=e*l,r-=t*l),(a=Math.sqrt(n*n+r*r))&&(n/=a,r/=a,l/=a),e*r<t*n&&(e=-e,t=-t,l=-l,o=-o),{translateX:i,translateY:s,rotate:Math.atan2(t,e)*vu,skewX:Math.atan(l)*vu,scaleX:o,scaleY:a}}var Ni;function MA(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?ia:Ih(t.a,t.b,t.c,t.d,t.e,t.f)}function PA(e){return e==null||(Ni||(Ni=document.createElementNS("http://www.w3.org/2000/svg","g")),Ni.setAttribute("transform",e),!(e=Ni.transform.baseVal.consolidate()))?ia:(e=e.matrix,Ih(e.a,e.b,e.c,e.d,e.e,e.f))}function Fh(e,t,n,r){function i(c){return c.length?c.pop()+" ":""}function s(c,u,f,d,h,p){if(c!==f||u!==d){var m=h.push("translate(",null,t,null,n);p.push({i:m-4,x:Tt(c,f)},{i:m-2,x:Tt(u,d)})}else(f||d)&&h.push("translate("+f+t+d+n)}function o(c,u,f,d){c!==u?(c-u>180?u+=360:u-c>180&&(c+=360),d.push({i:f.push(i(f)+"rotate(",null,r)-2,x:Tt(c,u)})):u&&f.push(i(f)+"rotate("+u+r)}function a(c,u,f,d){c!==u?d.push({i:f.push(i(f)+"skewX(",null,r)-2,x:Tt(c,u)}):u&&f.push(i(f)+"skewX("+u+r)}function l(c,u,f,d,h,p){if(c!==f||u!==d){var m=h.push(i(h)+"scale(",null,",",null,")");p.push({i:m-4,x:Tt(c,f)},{i:m-2,x:Tt(u,d)})}else(f!==1||d!==1)&&h.push(i(h)+"scale("+f+","+d+")")}return function(c,u){var f=[],d=[];return c=e(c),u=e(u),s(c.translateX,c.translateY,u.translateX,u.translateY,f,d),o(c.rotate,u.rotate,f,d),a(c.skewX,u.skewX,f,d),l(c.scaleX,c.scaleY,u.scaleX,u.scaleY,f,d),c=u=null,function(h){for(var p=-1,m=d.length,x;++p<m;)f[(x=d[p]).i]=x.x(h);return f.join("")}}}var NA=Fh(MA,"px, ","px)","deg)"),BA=Fh(PA,", ",")",")"),_r=0,Nr=0,Fr=0,Mh=1e3,hs,Br,ps=0,Yn=0,Us=0,fi=typeof performance=="object"&&performance.now?performance:Date,Ph=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function rl(){return Yn||(Ph(LA),Yn=fi.now()+Us)}function LA(){Yn=0}function gs(){this._call=this._time=this._next=null}gs.prototype=Nh.prototype={constructor:gs,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?rl():+n)+(t==null?0:+t),!this._next&&Br!==this&&(Br?Br._next=this:hs=this,Br=this),this._call=e,this._time=n,sa()},stop:function(){this._call&&(this._call=null,this._time=1/0,sa())}};function Nh(e,t,n){var r=new gs;return r.restart(e,t,n),r}function DA(){rl(),++_r;for(var e=hs,t;e;)(t=Yn-e._time)>=0&&e._call.call(void 0,t),e=e._next;--_r}function yu(){Yn=(ps=fi.now())+Us,_r=Nr=0;try{DA()}finally{_r=0,jA(),Yn=0}}function zA(){var e=fi.now(),t=e-ps;t>Mh&&(Us-=t,ps=e)}function jA(){for(var e,t=hs,n,r=1/0;t;)t._call?(r>t._time&&(r=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:hs=n);Br=e,sa(r)}function sa(e){if(!_r){Nr&&(Nr=clearTimeout(Nr));var t=e-Yn;t>24?(e<1/0&&(Nr=setTimeout(yu,e-fi.now()-Us)),Fr&&(Fr=clearInterval(Fr))):(Fr||(ps=fi.now(),Fr=setInterval(zA,Mh)),_r=1,Ph(yu))}}function bu(e,t,n){var r=new gs;return t=t==null?0:+t,r.restart(i=>{r.stop(),e(i+t)},t,n),r}var HA=mh("start","end","cancel","interrupt"),VA=[],Bh=0,_u=1,oa=2,Ki=3,xu=4,aa=5,Gi=6;function Ks(e,t,n,r,i,s){var o=e.__transition;if(!o)e.__transition={};else if(n in o)return;WA(e,n,{name:t,index:r,group:i,on:HA,tween:VA,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:Bh})}function il(e,t){var n=Bt(e,t);if(n.state>Bh)throw new Error("too late; already scheduled");return n}function Xt(e,t){var n=Bt(e,t);if(n.state>Ki)throw new Error("too late; already running");return n}function Bt(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function WA(e,t,n){var r=e.__transition,i;r[t]=n,n.timer=Nh(s,0,n.time);function s(c){n.state=_u,n.timer.restart(o,n.delay,n.time),n.delay<=c&&o(c-n.delay)}function o(c){var u,f,d,h;if(n.state!==_u)return l();for(u in r)if(h=r[u],h.name===n.name){if(h.state===Ki)return bu(o);h.state===xu?(h.state=Gi,h.timer.stop(),h.on.call("interrupt",e,e.__data__,h.index,h.group),delete r[u]):+u<t&&(h.state=Gi,h.timer.stop(),h.on.call("cancel",e,e.__data__,h.index,h.group),delete r[u])}if(bu(function(){n.state===Ki&&(n.state=xu,n.timer.restart(a,n.delay,n.time),a(c))}),n.state=oa,n.on.call("start",e,e.__data__,n.index,n.group),n.state===oa){for(n.state=Ki,i=new Array(d=n.tween.length),u=0,f=-1;u<d;++u)(h=n.tween[u].value.call(e,e.__data__,n.index,n.group))&&(i[++f]=h);i.length=f+1}}function a(c){for(var u=c<n.duration?n.ease.call(null,c/n.duration):(n.timer.restart(l),n.state=aa,1),f=-1,d=i.length;++f<d;)i[f].call(e,u);n.state===aa&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){n.state=Gi,n.timer.stop(),delete r[t];for(var c in r)return;delete e.__transition}}function UA(e,t){var n=e.__transition,r,i,s=!0,o;if(n){t=t==null?null:t+"";for(o in n){if((r=n[o]).name!==t){s=!1;continue}i=r.state>oa&&r.state<aa,r.state=Gi,r.timer.stop(),r.on.call(i?"interrupt":"cancel",e,e.__data__,r.index,r.group),delete n[o]}s&&delete e.__transition}}function KA(e){return this.each(function(){UA(this,e)})}function GA(e,t){var n,r;return function(){var i=Xt(this,e),s=i.tween;if(s!==n){r=n=s;for(var o=0,a=r.length;o<a;++o)if(r[o].name===t){r=r.slice(),r.splice(o,1);break}}i.tween=r}}function YA(e,t,n){var r,i;if(typeof n!="function")throw new Error;return function(){var s=Xt(this,e),o=s.tween;if(o!==r){i=(r=o).slice();for(var a={name:t,value:n},l=0,c=i.length;l<c;++l)if(i[l].name===t){i[l]=a;break}l===c&&i.push(a)}s.tween=i}}function qA(e,t){var n=this._id;if(e+="",arguments.length<2){for(var r=Bt(this.node(),n).tween,i=0,s=r.length,o;i<s;++i)if((o=r[i]).name===e)return o.value;return null}return this.each((t==null?GA:YA)(n,e,t))}function sl(e,t,n){var r=e._id;return e.each(function(){var i=Xt(this,r);(i.value||(i.value={}))[t]=n.apply(this,arguments)}),function(i){return Bt(i,r).value[t]}}function Lh(e,t){var n;return(typeof t=="number"?Tt:t instanceof Gn?ds:(n=Gn(t))?(t=n,ds):Rh)(e,t)}function XA(e){return function(){this.removeAttribute(e)}}function ZA(e){return function(){this.removeAttributeNS(e.space,e.local)}}function JA(e,t,n){var r,i=n+"",s;return function(){var o=this.getAttribute(e);return o===i?null:o===r?s:s=t(r=o,n)}}function QA(e,t,n){var r,i=n+"",s;return function(){var o=this.getAttributeNS(e.space,e.local);return o===i?null:o===r?s:s=t(r=o,n)}}function eE(e,t,n){var r,i,s;return function(){var o,a=n(this),l;return a==null?void this.removeAttribute(e):(o=this.getAttribute(e),l=a+"",o===l?null:o===r&&l===i?s:(i=l,s=t(r=o,a)))}}function tE(e,t,n){var r,i,s;return function(){var o,a=n(this),l;return a==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),l=a+"",o===l?null:o===r&&l===i?s:(i=l,s=t(r=o,a)))}}function nE(e,t){var n=Ws(e),r=n==="transform"?BA:Lh;return this.attrTween(e,typeof t=="function"?(n.local?tE:eE)(n,r,sl(this,"attr."+e,t)):t==null?(n.local?ZA:XA)(n):(n.local?QA:JA)(n,r,t))}function rE(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function iE(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function sE(e,t){var n,r;function i(){var s=t.apply(this,arguments);return s!==r&&(n=(r=s)&&iE(e,s)),n}return i._value=t,i}function oE(e,t){var n,r;function i(){var s=t.apply(this,arguments);return s!==r&&(n=(r=s)&&rE(e,s)),n}return i._value=t,i}function aE(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var r=Ws(e);return this.tween(n,(r.local?sE:oE)(r,t))}function lE(e,t){return function(){il(this,e).delay=+t.apply(this,arguments)}}function cE(e,t){return t=+t,function(){il(this,e).delay=t}}function uE(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?lE:cE)(t,e)):Bt(this.node(),t).delay}function fE(e,t){return function(){Xt(this,e).duration=+t.apply(this,arguments)}}function dE(e,t){return t=+t,function(){Xt(this,e).duration=t}}function hE(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?fE:dE)(t,e)):Bt(this.node(),t).duration}function pE(e,t){if(typeof t!="function")throw new Error;return function(){Xt(this,e).ease=t}}function gE(e){var t=this._id;return arguments.length?this.each(pE(t,e)):Bt(this.node(),t).ease}function mE(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;Xt(this,e).ease=n}}function vE(e){if(typeof e!="function")throw new Error;return this.each(mE(this._id,e))}function yE(e){typeof e!="function"&&(e=yh(e));for(var t=this._groups,n=t.length,r=new Array(n),i=0;i<n;++i)for(var s=t[i],o=s.length,a=r[i]=[],l,c=0;c<o;++c)(l=s[c])&&e.call(l,l.__data__,c,s)&&a.push(l);return new un(r,this._parents,this._name,this._id)}function bE(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,r=t.length,i=n.length,s=Math.min(r,i),o=new Array(r),a=0;a<s;++a)for(var l=t[a],c=n[a],u=l.length,f=o[a]=new Array(u),d,h=0;h<u;++h)(d=l[h]||c[h])&&(f[h]=d);for(;a<r;++a)o[a]=t[a];return new un(o,this._parents,this._name,this._id)}function _E(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function xE(e,t,n){var r,i,s=_E(t)?il:Xt;return function(){var o=s(this,e),a=o.on;a!==r&&(i=(r=a).copy()).on(t,n),o.on=i}}function wE(e,t){var n=this._id;return arguments.length<2?Bt(this.node(),n).on.on(e):this.each(xE(n,e,t))}function SE(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function CE(){return this.on("end.remove",SE(this._id))}function AE(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Ja(e));for(var r=this._groups,i=r.length,s=new Array(i),o=0;o<i;++o)for(var a=r[o],l=a.length,c=s[o]=new Array(l),u,f,d=0;d<l;++d)(u=a[d])&&(f=e.call(u,u.__data__,d,a))&&("__data__"in u&&(f.__data__=u.__data__),c[d]=f,Ks(c[d],t,n,d,c,Bt(u,n)));return new un(s,this._parents,t,n)}function EE(e){var t=this._name,n=this._id;typeof e!="function"&&(e=vh(e));for(var r=this._groups,i=r.length,s=[],o=[],a=0;a<i;++a)for(var l=r[a],c=l.length,u,f=0;f<c;++f)if(u=l[f]){for(var d=e.call(u,u.__data__,f,l),h,p=Bt(u,n),m=0,x=d.length;m<x;++m)(h=d[m])&&Ks(h,t,n,m,d,p);s.push(d),o.push(u)}return new un(s,o,t,n)}var $E=xi.prototype.constructor;function TE(){return new $E(this._groups,this._parents)}function kE(e,t){var n,r,i;return function(){var s=br(this,e),o=(this.style.removeProperty(e),br(this,e));return s===o?null:s===n&&o===r?i:i=t(n=s,r=o)}}function Dh(e){return function(){this.style.removeProperty(e)}}function OE(e,t,n){var r,i=n+"",s;return function(){var o=br(this,e);return o===i?null:o===r?s:s=t(r=o,n)}}function RE(e,t,n){var r,i,s;return function(){var o=br(this,e),a=n(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(e),br(this,e))),o===l?null:o===r&&l===i?s:(i=l,s=t(r=o,a))}}function IE(e,t){var n,r,i,s="style."+t,o="end."+s,a;return function(){var l=Xt(this,e),c=l.on,u=l.value[s]==null?a||(a=Dh(t)):void 0;(c!==n||i!==u)&&(r=(n=c).copy()).on(o,i=u),l.on=r}}function FE(e,t,n){var r=(e+="")=="transform"?NA:Lh;return t==null?this.styleTween(e,kE(e,r)).on("end.style."+e,Dh(e)):typeof t=="function"?this.styleTween(e,RE(e,r,sl(this,"style."+e,t))).each(IE(this._id,e)):this.styleTween(e,OE(e,r,t),n).on("end.style."+e,null)}function ME(e,t,n){return function(r){this.style.setProperty(e,t.call(this,r),n)}}function PE(e,t,n){var r,i;function s(){var o=t.apply(this,arguments);return o!==i&&(r=(i=o)&&ME(e,o,n)),r}return s._value=t,s}function NE(e,t,n){var r="style."+(e+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!="function")throw new Error;return this.tween(r,PE(e,t,n??""))}function BE(e){return function(){this.textContent=e}}function LE(e){return function(){var t=e(this);this.textContent=t??""}}function DE(e){return this.tween("text",typeof e=="function"?LE(sl(this,"text",e)):BE(e==null?"":e+""))}function zE(e){return function(t){this.textContent=e.call(this,t)}}function jE(e){var t,n;function r(){var i=e.apply(this,arguments);return i!==n&&(t=(n=i)&&zE(i)),t}return r._value=e,r}function HE(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,jE(e))}function VE(){for(var e=this._name,t=this._id,n=zh(),r=this._groups,i=r.length,s=0;s<i;++s)for(var o=r[s],a=o.length,l,c=0;c<a;++c)if(l=o[c]){var u=Bt(l,t);Ks(l,e,n,c,o,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new un(r,this._parents,e,n)}function WE(){var e,t,n=this,r=n._id,i=n.size();return new Promise(function(s,o){var a={value:o},l={value:function(){--i===0&&s()}};n.each(function(){var c=Xt(this,r),u=c.on;u!==e&&(t=(e=u).copy(),t._.cancel.push(a),t._.interrupt.push(a),t._.end.push(l)),c.on=t}),i===0&&s()})}var UE=0;function un(e,t,n,r){this._groups=e,this._parents=t,this._name=n,this._id=r}function zh(){return++UE}var tn=xi.prototype;un.prototype={constructor:un,select:AE,selectAll:EE,selectChild:tn.selectChild,selectChildren:tn.selectChildren,filter:yE,merge:bE,selection:TE,transition:VE,call:tn.call,nodes:tn.nodes,node:tn.node,size:tn.size,empty:tn.empty,each:tn.each,on:wE,attr:nE,attrTween:aE,style:FE,styleTween:NE,text:DE,textTween:HE,remove:CE,tween:qA,delay:uE,duration:hE,ease:gE,easeVarying:vE,end:WE,[Symbol.iterator]:tn[Symbol.iterator]};function KE(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var GE={time:null,delay:0,duration:250,ease:KE};function YE(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function qE(e){var t,n;e instanceof un?(t=e._id,e=e._name):(t=zh(),(n=GE).time=rl(),e=e==null?null:e+"");for(var r=this._groups,i=r.length,s=0;s<i;++s)for(var o=r[s],a=o.length,l,c=0;c<a;++c)(l=o[c])&&Ks(l,e,t,c,o,n||YE(l,t));return new un(r,this._parents,e,t)}xi.prototype.interrupt=KA;xi.prototype.transition=qE;function XE(e){return Math.abs(e=Math.round(e))>=1e21?e.toLocaleString("en").replace(/,/g,""):e.toString(10)}function ms(e,t){if((n=(e=t?e.toExponential(t-1):e.toExponential()).indexOf("e"))<0)return null;var n,r=e.slice(0,n);return[r.length>1?r[0]+r.slice(2):r,+e.slice(n+1)]}function xr(e){return e=ms(Math.abs(e)),e?e[1]:NaN}function ZE(e,t){return function(n,r){for(var i=n.length,s=[],o=0,a=e[0],l=0;i>0&&a>0&&(l+a+1>r&&(a=Math.max(1,r-l)),s.push(n.substring(i-=a,i+a)),!((l+=a+1)>r));)a=e[o=(o+1)%e.length];return s.reverse().join(t)}}function JE(e){return function(t){return t.replace(/[0-9]/g,function(n){return e[+n]})}}var QE=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function vs(e){if(!(t=QE.exec(e)))throw new Error("invalid format: "+e);var t;return new ol({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}vs.prototype=ol.prototype;function ol(e){this.fill=e.fill===void 0?" ":e.fill+"",this.align=e.align===void 0?">":e.align+"",this.sign=e.sign===void 0?"-":e.sign+"",this.symbol=e.symbol===void 0?"":e.symbol+"",this.zero=!!e.zero,this.width=e.width===void 0?void 0:+e.width,this.comma=!!e.comma,this.precision=e.precision===void 0?void 0:+e.precision,this.trim=!!e.trim,this.type=e.type===void 0?"":e.type+""}ol.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function e4(e){e:for(var t=e.length,n=1,r=-1,i;n<t;++n)switch(e[n]){case".":r=i=n;break;case"0":r===0&&(r=n),i=n;break;default:if(!+e[n])break e;r>0&&(r=0);break}return r>0?e.slice(0,r)+e.slice(i+1):e}var jh;function t4(e,t){var n=ms(e,t);if(!n)return e+"";var r=n[0],i=n[1],s=i-(jh=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,o=r.length;return s===o?r:s>o?r+new Array(s-o+1).join("0"):s>0?r.slice(0,s)+"."+r.slice(s):"0."+new Array(1-s).join("0")+ms(e,Math.max(0,t+s-1))[0]}function wu(e,t){var n=ms(e,t);if(!n)return e+"";var r=n[0],i=n[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}const Su={"%":(e,t)=>(e*100).toFixed(t),b:e=>Math.round(e).toString(2),c:e=>e+"",d:XE,e:(e,t)=>e.toExponential(t),f:(e,t)=>e.toFixed(t),g:(e,t)=>e.toPrecision(t),o:e=>Math.round(e).toString(8),p:(e,t)=>wu(e*100,t),r:wu,s:t4,X:e=>Math.round(e).toString(16).toUpperCase(),x:e=>Math.round(e).toString(16)};function Cu(e){return e}var Au=Array.prototype.map,Eu=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function n4(e){var t=e.grouping===void 0||e.thousands===void 0?Cu:ZE(Au.call(e.grouping,Number),e.thousands+""),n=e.currency===void 0?"":e.currency[0]+"",r=e.currency===void 0?"":e.currency[1]+"",i=e.decimal===void 0?".":e.decimal+"",s=e.numerals===void 0?Cu:JE(Au.call(e.numerals,String)),o=e.percent===void 0?"%":e.percent+"",a=e.minus===void 0?"−":e.minus+"",l=e.nan===void 0?"NaN":e.nan+"";function c(f){f=vs(f);var d=f.fill,h=f.align,p=f.sign,m=f.symbol,x=f.zero,y=f.width,g=f.comma,v=f.precision,_=f.trim,C=f.type;C==="n"?(g=!0,C="g"):Su[C]||(v===void 0&&(v=12),_=!0,C="g"),(x||d==="0"&&h==="=")&&(x=!0,d="0",h="=");var A=m==="$"?n:m==="#"&&/[boxX]/.test(C)?"0"+C.toLowerCase():"",E=m==="$"?r:/[%p]/.test(C)?o:"",O=Su[C],$=/[defgprs%]/.test(C);v=v===void 0?6:/[gprs]/.test(C)?Math.max(1,Math.min(21,v)):Math.max(0,Math.min(20,v));function M(R){var k=A,D=E,ce,le,se;if(C==="c")D=O(R)+D,R="";else{R=+R;var oe=R<0||1/R<0;if(R=isNaN(R)?l:O(Math.abs(R),v),_&&(R=e4(R)),oe&&+R==0&&p!=="+"&&(oe=!1),k=(oe?p==="("?p:a:p==="-"||p==="("?"":p)+k,D=(C==="s"?Eu[8+jh/3]:"")+D+(oe&&p==="("?")":""),$){for(ce=-1,le=R.length;++ce<le;)if(se=R.charCodeAt(ce),48>se||se>57){D=(se===46?i+R.slice(ce+1):R.slice(ce))+D,R=R.slice(0,ce);break}}}g&&!x&&(R=t(R,1/0));var ne=k.length+R.length+D.length,W=ne<y?new Array(y-ne+1).join(d):"";switch(g&&x&&(R=t(W+R,W.length?y-D.length:1/0),W=""),h){case"<":R=k+R+D+W;break;case"=":R=k+W+R+D;break;case"^":R=W.slice(0,ne=W.length>>1)+k+R+D+W.slice(ne);break;default:R=W+k+R+D;break}return s(R)}return M.toString=function(){return f+""},M}function u(f,d){var h=c((f=vs(f),f.type="f",f)),p=Math.max(-8,Math.min(8,Math.floor(xr(d)/3)))*3,m=Math.pow(10,-p),x=Eu[8+p/3];return function(y){return h(m*y)+x}}return{format:c,formatPrefix:u}}var Bi,Hh,Vh;r4({thousands:",",grouping:[3],currency:["$",""]});function r4(e){return Bi=n4(e),Hh=Bi.format,Vh=Bi.formatPrefix,Bi}function i4(e){return Math.max(0,-xr(Math.abs(e)))}function s4(e,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(xr(t)/3)))*3-xr(Math.abs(e)))}function o4(e,t){return e=Math.abs(e),t=Math.abs(t)-e,Math.max(0,xr(t)-xr(e))+1}function al(e,t){switch(arguments.length){case 0:break;case 1:this.range(e);break;default:this.range(t).domain(e);break}return this}const $u=Symbol("implicit");function Wh(){var e=new Xo,t=[],n=[],r=$u;function i(s){let o=e.get(s);if(o===void 0){if(r!==$u)return r;e.set(s,o=t.push(s)-1)}return n[o%n.length]}return i.domain=function(s){if(!arguments.length)return t.slice();t=[],e=new Xo;for(const o of s)e.has(o)||e.set(o,t.push(o)-1);return i},i.range=function(s){return arguments.length?(n=Array.from(s),i):n.slice()},i.unknown=function(s){return arguments.length?(r=s,i):r},i.copy=function(){return Wh(t,n).unknown(r)},al.apply(i,arguments),i}function Uh(){var e=Wh().unknown(void 0),t=e.domain,n=e.range,r=0,i=1,s,o,a=!1,l=0,c=0,u=.5;delete e.unknown;function f(){var d=t().length,h=i<r,p=h?i:r,m=h?r:i;s=(m-p)/Math.max(1,d-l+c*2),a&&(s=Math.floor(s)),p+=(m-p-s*(d-l))*u,o=s*(1-l),a&&(p=Math.round(p),o=Math.round(o));var x=bS(d).map(function(y){return p+s*y});return n(h?x.reverse():x)}return e.domain=function(d){return arguments.length?(t(d),f()):t()},e.range=function(d){return arguments.length?([r,i]=d,r=+r,i=+i,f()):[r,i]},e.rangeRound=function(d){return[r,i]=d,r=+r,i=+i,a=!0,f()},e.bandwidth=function(){return o},e.step=function(){return s},e.round=function(d){return arguments.length?(a=!!d,f()):a},e.padding=function(d){return arguments.length?(l=Math.min(1,c=+d),f()):l},e.paddingInner=function(d){return arguments.length?(l=Math.min(1,d),f()):l},e.paddingOuter=function(d){return arguments.length?(c=+d,f()):c},e.align=function(d){return arguments.length?(u=Math.max(0,Math.min(1,d)),f()):u},e.copy=function(){return Uh(t(),[r,i]).round(a).paddingInner(l).paddingOuter(c).align(u)},al.apply(f(),arguments)}function a4(e){return function(){return e}}function l4(e){return+e}var Tu=[0,1];function rr(e){return e}function la(e,t){return(t-=e=+e)?function(n){return(n-e)/t}:a4(isNaN(t)?NaN:.5)}function c4(e,t){var n;return e>t&&(n=e,e=t,t=n),function(r){return Math.max(e,Math.min(t,r))}}function u4(e,t,n){var r=e[0],i=e[1],s=t[0],o=t[1];return i<r?(r=la(i,r),s=n(o,s)):(r=la(r,i),s=n(s,o)),function(a){return s(r(a))}}function f4(e,t,n){var r=Math.min(e.length,t.length)-1,i=new Array(r),s=new Array(r),o=-1;for(e[r]<e[0]&&(e=e.slice().reverse(),t=t.slice().reverse());++o<r;)i[o]=la(e[o],e[o+1]),s[o]=n(t[o],t[o+1]);return function(a){var l=iS(e,a,1,r)-1;return s[l](i[l](a))}}function d4(e,t){return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown())}function h4(){var e=Tu,t=Tu,n=nl,r,i,s,o=rr,a,l,c;function u(){var d=Math.min(e.length,t.length);return o!==rr&&(o=c4(e[0],e[d-1])),a=d>2?f4:u4,l=c=null,f}function f(d){return d==null||isNaN(d=+d)?s:(l||(l=a(e.map(r),t,n)))(r(o(d)))}return f.invert=function(d){return o(i((c||(c=a(t,e.map(r),Tt)))(d)))},f.domain=function(d){return arguments.length?(e=Array.from(d,l4),u()):e.slice()},f.range=function(d){return arguments.length?(t=Array.from(d),u()):t.slice()},f.rangeRound=function(d){return t=Array.from(d),n=FA,u()},f.clamp=function(d){return arguments.length?(o=d?!0:rr,u()):o!==rr},f.interpolate=function(d){return arguments.length?(n=d,u()):n},f.unknown=function(d){return arguments.length?(s=d,f):s},function(d,h){return r=d,i=h,u()}}function p4(){return h4()(rr,rr)}function g4(e,t,n,r){var i=vS(e,t,n),s;switch(r=vs(r??",f"),r.type){case"s":{var o=Math.max(Math.abs(e),Math.abs(t));return r.precision==null&&!isNaN(s=s4(i,o))&&(r.precision=s),Vh(r,o)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(s=o4(i,Math.max(Math.abs(e),Math.abs(t))))&&(r.precision=s-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(s=i4(i))&&(r.precision=s-(r.type==="%")*2);break}}return Hh(r)}function m4(e){var t=e.domain;return e.ticks=function(n){var r=t();return mS(r[0],r[r.length-1],n??10)},e.tickFormat=function(n,r){var i=t();return g4(i[0],i[i.length-1],n??10,r)},e.nice=function(n){n==null&&(n=10);var r=t(),i=0,s=r.length-1,o=r[i],a=r[s],l,c,u=10;for(a<o&&(c=o,o=a,a=c,c=i,i=s,s=c);u-- >0;){if(c=Qo(o,a,n),c===l)return r[i]=o,r[s]=a,t(r);if(c>0)o=Math.floor(o/c)*c,a=Math.ceil(a/c)*c;else if(c<0)o=Math.ceil(o*c)/c,a=Math.floor(a*c)/c;else break;l=c}return e},e}function Kh(){var e=p4();return e.copy=function(){return d4(e,Kh())},al.apply(e,arguments),m4(e)}function Lr(e,t,n){this.k=e,this.x=t,this.y=n}Lr.prototype={constructor:Lr,scale:function(e){return e===1?this:new Lr(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new Lr(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};Lr.prototype;function v4(e){const{data:t=[],getX:n,getY:r,width:i=200,height:s=200,margin:o=[],color:a={},sortY:l=0,xAxis:c={},yAxis:u={},yLegend:f={},hideXTicks:d}=e,[h=60,p=0,m=30,x=30]=o;let y,g;const v=uA("svg").attr("width",i).attr("height",s).attr("viewBox",[0,0,i,s]).style("background-color",a.bg||""),_=v.append("g"),C=v.append("g").attr("transform",`translate(0,${s-m})`),A=v.append("g").attr("transform",`translate(${x},0)`),E=O=>{const $=k=>{if(y=Uh().range([x,i-p]),Wi(e.xScale))for(let[D,ce]of Object.entries(e.xScale))y[D](ce);else y.padding(.2);l>0?y.domain(dS(k,([D])=>(l==1?1:-1)*r(D),n)):y.domain(k.map(n)),g=Kh().domain([0,yS(k,r)]).range([s-m,h])},M=k=>{k.attr("x",0).attr("y",0).attr("width",y.bandwidth()).attr("height",D=>g(0)-g(r(D))).attr("fill",a.bar||"#409eff")},R=k=>{k.text(D=>D.value).attr("text-anchor","middle").attr("x",y.bandwidth()/2).attr("y",-4)};$(O),_.selectAll("g").data(O).join(k=>k.append("g").attr("transform",D=>`translate(${y(n(D))},${g(r(D))})`).call(D=>{M(D.append("rect")),R(D.append("text"))}),k=>(M(k.select("rect")),R(k.select("text")),k)).attr("transform",k=>`translate(${y(n(k))},${g(r(k))})`),C.call(k=>{let D=ES(y);D.tickSizeOuter(0);for(const[ce,le]of Object.entries(c))D[ce](le);D(k)}).call(k=>{d&&k.selectAll(".tick").remove()}),A.call(k=>{let D=$S(g);for(const[ce,le]of Object.entries(u))D[ce](le);D(k)}).call(k=>k.select(".domain").remove()).call(k=>{if(f.text){let D=k.append("text").attr("text-anchor","middle").attr("x",0).attr("y",20);for(const[ce,le]of Object.entries(f))ce=="text"?D[ce](le):D.attr(ce,le)}})};return E(t),{svg:v.node(),update:E}}function*y4(e,t){_i(t)||(t=Vs),t=t;for(let n=1;n<e.length;n++)for(let r=0;r<e.length-n;r++)t(e[r])>t(e[r+1])&&(li(e,r,r+1),yield[...e])}function*b4(e,t){_i(t)||(t=Vs),t=t,e=[...e];for(let n=0;n<e.length-1;n++){let r=0;for(let i=0;i<e.length-n;i++)t(e[i])>t(e[r])&&(r=i);li(e,r,e.length-n-1),yield[...e]}}function*_4(e,t){_i(t)||(t=Vs),e=[...e],t=t;for(let n=0;n<e.length-1;n++)if(t(e[n])>t(e[n+1])){li(e,n,n+1),yield[...e];let r=n;for(;r>0&&!(t(e[r])>=t(e[r-1]));)li(e,r,r-1),yield[...e],r--}}function*x4(e,t){_i(t)||(t=Vs);function*n(r,i){if(t=t,r==i)return;let s=Math.floor((r+i)/2);yield*n(r,s),yield*n(s+1,i);const o=a=>e=[...e.slice(0,r),...a,...e.slice(i+1)];if(!(t(e[s])<=t(e[s+1]))){if(t(e[i])<=t(e[r])){yield o([...e.slice(s+1,i+1),...e.slice(r,s+1)]);return}for(let a=1;s+a<=i;a++){let l=s+a;for(;l>r&&!(t(e[l])>=t(e[l-1]));)li(e,l,l-1),l--,yield[...e]}}}yield*n(0,e.length-1)}const w4={class:"box"},S4=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t,r=V(),i=[{label:"冒泡排序",value:y4},{label:"选择排序",value:b4},{label:"插入排序",value:_4},{label:"归并排序",value:x4}],s=i[0],o=V(s.value);let a,l=innerWidth-100,c=innerHeight-100,u=!1,f=20,d=Ut([]),h=Ut();function p(){d.value=u2(f).map((v,_)=>({id:_,value:v})),u=!1,h.value=o.value(d.value,v=>v.value)}ke(o,()=>{h.value=o.value(d.value,v=>v.value)});function m(){let{value:v,done:_}=h.value.next();if(u=_,_){Ka({showClose:!0,message:"已经排序完毕",type:"success",grouping:!0});return}else d.value=v}let x=V(0);function y(){x.value==0&&((!h.value||u)&&p(),x.value=setInterval(()=>{if(u){clearInterval(x.value),x.value=0;return}m()},g))}ke(()=>d.value,v=>{v.length>0?(a||(a=v4({width:l,height:c,getX:_=>_.id,getY:_=>_.value}),r.value.appendChild(a.svg)),a.update(v)):a&&(r.value.removeChild(a.svg),a=null)});let g=50;return Le(()=>{p();let{helpers:{getAllControllers:v}}=mt({选择算法:{value:[s.label,i.map(C=>C.label)],onChange(C){let A=i.find(E=>E.label==C);o.value=A.value}},随机数个数:{value:[f,10,100,1],onFinishChange(C){f=C}},自动开始时间间隔:{value:[g,16,100,5],onFinishChange(C){g=C}},生成随机数:{value:[function(){p()}],disable:x.value!=0},排序下一步:{value:[function(){m()}],disable:!h.value||x.value!=0},自动开始(){y()},查看源码(){n("check-source")}}),_=ke(x,C=>{v().forEach(A=>{A.property!="查看源码"&&A.disable(C>0)})});Qe(()=>{_(),clearInterval(x.value)})}),(v,_)=>(P(),G("div",w4,[re("div",{ref_key:"node",ref:r},null,512)]))}}),C4=Nt(S4,[["__scopeId","data-v-698136a6"]]),A4=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,E4=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'

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
`,$4=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,T4=`import { isFunc, identity, swapArrayItem } from '@/utils/utils'


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
`,k4="/demo/assets/display-B3luB7Uf.png",O4={codes:[{name:"index.vue",code:Q2,lang:"js"},{name:"bubble.ts",code:A4,lang:"ts"},{name:"selection.ts",code:E4,lang:"ts"},{name:"insertion.ts",code:$4,lang:"ts"},{name:"merge.ts",code:T4,lang:"ts"}],component:C4,display:k4,title:"排序算法可视化",descriptions:""},R4=`<template>
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
`,I4=`import { easeOutCubic } from './ease'
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
`;function F4(e){return 1-Math.pow(1-e,3)}var Dr=(e=>(e[e.NORMAL=0]="NORMAL",e[e.REVERSE=1]="REVERSE",e))(Dr||{});function M4(e,t){let{startIndex:n=0,speed:r=1,onDone:i,onProcessing:s}=t,o=n,a,l;const c=p=>{Wi(p)&&(l=Math.ceil(800/p))},u=()=>{a&&(cancelAnimationFrame(a),a=0)};c(r);function f(p){u();let{direction:m,speed:x,startIndex:y}=p,g;c(x),Wi(y)&&(o=y);const v=_=>{g||(g=_),_-g>=l&&(m==0?o=(o+1)%e.length:o=o-1>=0?o-1:e.length-1,s(o),g=_),a=requestAnimationFrame(v)};a||(a=requestAnimationFrame(v))}function d(){u()}function h(p){u();let{loopTimes:m=5,targetIndex:x=e.length-1,direction:y,speed:g,startIndex:v}=p||{};m=Math.max(Math.ceil(Number(m)),1),x=Math.max(0,Math.min(Number(x),e.length-1)),c(g),Wi(v)&&(o=v);let _=o,C,A=x-_;y==0?C=_+m*e.length+(A>=0?A:e.length+A):C=_-m*e.length+(A<=0?A:-e.length+A);let E=Math.abs(C-_)*l,O;const $=M=>{O||(O=M);let R=Math.min(1,(M-O)/E),D=(Math.ceil(F4(R)*(C-_))+_)%e.length;if(D<0&&(D+=e.length),o!=D&&(o=D,s(o)),R==1){i(o),a=0;return}a=requestAnimationFrame($)};a=requestAnimationFrame($)}return{wander:f,stop:d,draw:h}}const P4={class:"box"},N4={style:{display:"flex"}},B4=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t,r=V(1),i=[...Array(10)],s={targetIndex:2,loopTimes:2,direction:Dr.NORMAL,speed:5},{wander:o,stop:a,draw:l}=M4(i,{speed:s.speed,startIndex:r.value,onProcessing:h=>{r.value=h},onDone(h){Ka({showClose:!0,message:"已经抽奖完毕",type:"success",grouping:!0}),r.value=h}});function c(){o({...s})}function u(){l({...s})}Qe(()=>{a(),f&&clearTimeout(f)});let f;function d(){c(),f=setTimeout(()=>{s.targetIndex=fh(i),u(),f=0},2500)}return mt({设定巡航速度:{value:[s.speed,1,10,1],onFinishChange(h){s.speed=h}},设定最终选中项索引:{value:[s.targetIndex,0,i.length-1,1],onFinishChange(h){s.targetIndex=h}},轮转次数:{value:[s.loopTimes,2,20,1],onFinishChange(h){s.loopTimes=h}},轮转方向:{value:[s.direction==Dr.NORMAL?"正向":"负向",["正向","负向"]],onChange(h){s.direction=h=="正向"?Dr.NORMAL:Dr.REVERSE}},开始抽奖:u,开始巡航:c,停止:a,模拟接口返回预制数据:d,查看源码(){n("check-source")}}),(h,p)=>{const m=Gd;return P(),G("div",P4,[Z(m,{class:"demo-card",shadow:"always"},{default:ue(()=>[re("div",N4,[(P(),G(Fe,null,fr(i,(x,y)=>re("div",{class:J(["block",b(r)==y?"selected":""])},rt(y),3)),64))])]),_:1})])}}}),L4=Nt(B4,[["__scopeId","data-v-2fa66777"]]),D4="/demo/assets/display-DiF1Sfat.png",z4={codes:[{name:"index.vue",code:R4,lang:"js"},{name:"draw-price.ts",code:I4,lang:"ts"}],component:L4,display:D4,title:"抽奖",descriptions:""},j4=`<template>
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
`,H4="/demo/assets/018194d9aac11f975e17b274fe4a78af1463731957-BlWzWTpc.png",V4="/demo/assets/10251358673700483-Bf69morh.jpg",W4="/demo/assets/10251358673922612-wa-5hia3.jpg",U4="/demo/assets/10251381214893821-DZ0tyfKl.jpg",K4="/demo/assets/10251381215028477-DT0oxPDL.jpg",G4="/demo/assets/10251381215091916-34MSuKPK.jpg",Y4="/demo/assets/10251381215152314-ZOViud5b.jpg",q4="/demo/assets/10251381215208971-BnTSlzDn.jpg",X4="/demo/assets/10251381215487222-CyoYfFWR.jpg",Z4="/demo/assets/10251381215991717-jivRh7vw.jpg",J4="/demo/assets/10251381216212847-C6d5iI8I.jpg",Q4="/demo/assets/3a5950fc2408a7f8136de8704e1819c21463732075-DT6cAkAt.png",e3="/demo/assets/48d780d33eaf46a5646376b814b8efa71463731556-CGACL27Z.png",t3="/demo/assets/554e21161de34506e9cb1ecbcd85716d1463732343-LZH7KjnQ.png",n3="/demo/assets/884f9b653e317cc514890954b2e35be81463731323-DvATjqjX.png",r3="/demo/assets/8a116da0668edebd82af16ecf7e75ace1590566316-Cl-PTpZA.jpg",i3="/demo/assets/928d6ec50975da022bda97a1ab8f04c81463731839-d_LHiOEG.png",s3="/demo/assets/a748932756b48bd46a8fd17df4579dea1463732104-DlsyWN-A.png",o3="/demo/assets/b5978ead603dcdc66704e721960debe31590565987-4RsIwXgW.jpg",a3="/demo/assets/c06f07de280d4edebf801eef4b142c721463731804-DD1ps6p3.png",l3="/demo/assets/ceb8c078cf6b410d7def183870fe584d1590566557-9BfKn2sf.jpg",c3="/demo/assets/ea5871bc33e131b497b9bb273890e8ae1463731875-WWF6WmyZ.png",u3="/demo/assets/f29af13446f1feed47dcfd299ccaa23c1463732001-DrhlCMaO.png",f3="/demo/assets/fef4eadd191c3461054ca60cde8576db1590566398-Bn18syhQ.jpg",d3={class:"container"},h3=["src"],p3=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=t;let r=[...Object.values([H4,V4,W4,U4,K4,G4,Y4,q4,X4,Z4,J4,Q4,e3,t3,n3,r3,i3,s3,o3,a3,l3,c3,u3,f3])];r=V(f2(r,Math.ceil(r.length/5))),mt({查看源码(){n("check-source")}});function s(a){a.target.classList.add("level-up")}function o(a){a.target.classList.remove("level-up")}return(a,l)=>(P(),G("div",d3,[(P(!0),G(Fe,null,fr(b(r),(c,u)=>(P(),G("div",{class:J(["hive-row",u%2==1?"odd":""]),onMouseenter:s,onMouseleave:o},[(P(!0),G(Fe,null,fr(c,f=>(P(),G("img",{class:"hive-item",src:f,alt:""},null,8,h3))),256))],34))),256))]))}}),g3=Nt(p3,[["__scopeId","data-v-93867a89"]]),m3="/demo/assets/display-BVEemRNY.png",v3={codes:[{name:"index.vue",code:j4,lang:"js"}],component:g3,display:m3,title:"蜂巢图片",descriptions:""},y3=`<template>
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
`,b3=`import { isFunc } from '@/utils/utils'

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
`,_3=`import type { SceneInstance, SceneObj } from "./scene"
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
`;class x3{constructor(t){ae(this,"canvas");ae(this,"ctx");ae(this,"width",0);ae(this,"height",0);ae(this,"background");ae(this,"_t0",0);ae(this,"_t1",0);ae(this,"_dt",0);ae(this,"_objects",[]);ae(this,"_raf",0);let{width:n,height:r,canvas:i,background:s}=t;this.canvas=i,this.ctx=i.getContext("2d"),this.background=s??"#000",this.setSize(n,r)}setSize(t,n){this.canvas.width=t,this.canvas.height=n,this.width=t,this.height=n}_render(){let{width:t,height:n,ctx:r,background:i}=this;r.fillStyle=i,r.fillRect(0,0,t,n);for(let s of[...this._objects])s.render(this._dt)}_updateTime(t){this._t0==0&&(this._t0=t),this._dt=t-this._t0}run(t){const n=r=>{this._updateTime(r),_i(t)&&t(this._dt),this._render(),this._raf=requestAnimationFrame(n)};this._raf=requestAnimationFrame(n)}addObj(...t){return t.forEach(n=>{this._objects.find(r=>r==n)||(this._objects.push(n),n.scene=this)}),this}removeObj(t){let n=this._objects.findIndex(r=>r==t);return n!=-1&&(this._objects.splice(n,1),t.scene==this&&(t.scene=null)),this}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._t0=0,this._t1=0,this._dt=0)}}const w3=[...Array(26)].map((e,t)=>["a","A"].map(n=>String.fromCharCode(n.charCodeAt(0)+t))).flat();function S3(){return[...Array(nr(8)+2)].map(()=>dh(w3)).join("")}class C3{constructor(t){ae(this,"_x");ae(this,"_y");ae(this,"_text");ae(this,"_opacity");ae(this,"_onDismiss");ae(this,"scene");ae(this,"_opacityDecay");ae(this,"_rawOptions");ae(this,"_yStep");ae(this,"_font","20px serif");ae(this,"_fillStyle","red");let{x:n,y:r,text:i,opacity:s,opacityDecay:o,onDismiss:a,yStep:l}=t;this._x=n,this._y=r,this._text=i,this._opacity=s,this._onDismiss=a,this._opacityDecay=o??.01,this._rawOptions={...t},this._yStep=l??4}setFont(t,n){return this._font=t,this._fillStyle=n,this}render(t){let{_text:n,_x:r,_y:i,_opacityDecay:s,_yStep:o,_fillStyle:a,_font:l}=this,{ctx:c,height:u}=this.scene,f={font:c.font,fillStyle:c.fillStyle,globalAlpha:c.globalAlpha};this._opacity-=typeof s=="number"?s:s(t),this._opacity<0&&(this._opacity=0),c.font=l,c.fillStyle=a,c.globalAlpha=this._opacity;let d=0,h=i+(typeof o=="number"?o:o(t));for(let p of n){let m=c.measureText(p);const{actualBoundingBoxAscent:x,actualBoundingBoxDescent:y}=m;let g=y+x;c.fillText(p,r,h-d),d+=g+10}this._y=h,Object.assign(c,f),(this._opacity==0||h-d>u)&&this._onDismiss(this)}}class A3{constructor(t){ae(this,"scene");ae(this,"num",0);ae(this,"maxNum",100);ae(this,"colors",["brown","red","green","yellow","chocolate","pink","burlywood","chartreuse","cyan"]);let{scene:n,maxNum:r}=t;this.scene=n,r&&(this.maxNum=r)}addText(){if(this.num<this.maxNum){this.num++;let{width:t,height:n}=this.scene,r=new C3({text:S3(),x:nr(t),y:nr(n),yStep:nr(10)+2,opacity:+Math.min(1,Math.random()+.2).toPrecision(2),opacityDecay:.01,onDismiss:i=>{this.scene.removeObj(i),this.num--}}).setFont(`${nr(15)+14}px serif`,dh(this.colors));this.scene.addObj(r)}}start(){this.scene.run(t=>{this.addText()})}stop(){this.scene.stop()}}function E3(e,t,n){e.addEventListener("resize",t),Qe(()=>{e.removeEventListener("resize",t)})}const $3={class:"box"},T3=U({__name:"index",emits:["check-source"],setup(e,{emit:t}){const n=V(),r=t;return Le(()=>{let i=new x3({width:innerWidth,height:innerHeight,canvas:n.value}),{obj:s}=mt({文字串数量:{value:[10,10,200,10],onChange(a){o.maxNum=a}},查看代码:function(){r("check-source")}}),o=new A3({scene:i,maxNum:s.文字串数量});o.start(),E3(window,()=>{i.setSize(innerWidth,innerHeight)}),Qe(()=>{o.stop()})}),(i,s)=>(P(),G("div",$3,[re("canvas",{ref_key:"canvas",ref:n},null,512)]))}}),k3=Nt(T3,[["__scopeId","data-v-4010e3a7"]]),O3="/demo/assets/display-DwV-CRAI.png",R3={codes:[{name:"index.vue",code:y3,lang:"js"},{name:"scene.ts",code:b3,lang:"ts"},{name:"textRain.ts",code:_3,lang:"ts"}],component:k3,display:O3,title:"文字雨",descriptions:""};let Li;function Gh(){return Li||(Li=Object.assign({"./demo/canvas/audio-wave/config.ts":i2,"./demo/canvas/chasing/config.ts":l2,"./demo/canvas/connect-balls/config.ts":p2,"./demo/canvas/eyeballs/config.ts":y2,"./demo/canvas/faliling-balls/config.ts":C2,"./demo/canvas/friction/config.ts":T2,"./demo/canvas/text-particle/config.ts":B2,"./demo/canvas/wander-balls/config.ts":j2,"./demo/css/blur/config.ts":G2,"./demo/css/shadow/config.ts":J2,"./demo/d3/sort/config.ts":O4,"./demo/draw-price/config.ts":z4,"./demo/hive/config.ts":v3,"./demo/text-rain/config.ts":R3}),Li)}let Yh=[];function I3(){const e=Gh();for(let t in e){let{codes:n,component:r,title:i}=e[t],s=function(){return dr(Sw,{codes:n},({checkSource:l})=>dr(r,{onCheckSource:()=>{l()}}))};s.displayName=`Demo(${t})`;let o=t.replace(/.*\/demo\//,"").replace("/config.ts","").split("/").join("-");e[t].routeName=o,Yh.push({path:o,name:o,component:s,meta:{title:i}})}}I3();const F3={path:"/demo",children:Yh},M3={class:"common-layout"},P3=U({__name:"index",setup(e){let t=Object.values(Gh());return(n,r)=>{const i=$x,s=tw,o=Gd,a=N1,l=Mx,c=X1,u=q1;return P(),G("div",M3,[Z(u,{class:"container"},{default:ue(()=>[Z(c,{class:"main"},{default:ue(()=>[Z(l,{class:"row",gutter:20},{default:ue(()=>[(P(!0),G(Fe,null,fr(b(t),f=>(P(),Se(a,{key:f.routeName,span:4},{default:ue(()=>[Z(o,{class:"demo-card","body-style":{padding:"0px"},shadow:"always",onClick:d=>n.$router.push({name:f.routeName})},{footer:ue(()=>[Z(s,{tag:"p"},{default:ue(()=>[cn(rt(f.title),1)]),_:2},1024),Z(s,{tag:"p","line-clamp":2},{default:ue(()=>[cn(rt(f.descriptions||"暂无描述"),1)]),_:2},1024)]),default:ue(()=>[Z(i,{class:"image",src:f.display,fit:"cover"},null,8,["src"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}}}),N3=Nt(P3,[["__scopeId","data-v-fe2c6a64"]]),qh=T0({history:r0("/demo/"),routes:[{path:"/",component:N3},F3]});qh.beforeEach((e,t,n)=>{document.title=e.meta.title??"my demos",n()});const ll=bm(Em);ll.use(Sm());ll.use(qh);ll.mount("#app");
