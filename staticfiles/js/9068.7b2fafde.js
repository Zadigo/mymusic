"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[9068],{9255:function(n,t,e){e.d(t,{J_:function(){return f},jh:function(){return l},sk:function(){return s}});e(1703);var r=e(4806),i=e.n(r);function o(n,t){throw new Error(`${n} - ${t}`)}function a(n){return()=>e(2513)(`./${n}.vue`)}function u(n){return()=>e(2115)(`./${n}.vue`)}function c(n){return()=>e(3457)(`./${n}.vue`)}function s(n){return new Promise((t=>setTimeout(t,n)))}function l(){function n(n){let t=[];return"object"===typeof n&&(t=Object.values(n)),i().some(t,(n=>null===n||""===n))}function t(n){n.forEach((n=>"object"!==typeof n?(o("indexElements",`${n} is not a dictionnary`),null):(n.id=1,n)))}function e(n){var t=i().last(n);return"object"!==typeof t?(o("incrementLastId",`${t} is not a dictionnary`),null):t.id+1}function r(n){var t=null;if(n&&n[0]){const e=new FileReader;e.onload=n=>{t=n.target.result},e.readAsDataURL(n[0])}return t}function s(n){return n.map((n=>r(n)))}function l(n,t=28){return"string"!==typeof n?(o("truncate",`${n} should be a string`),""):`${n.slice(0,t)}...`}function f(n,t,e){return n.length>=t?l(n,e):n}function d(n,t){if(n.includes(t)){const e=i().indexOf(n,t);n.splice(e,1)}else n.push(t);return n}function m(n,t){var e=t+1;return e>n.length-1&&(e=0),e}function p(n,t){var e=t-1;return e<0&&(e=n.length-1),e}function g(n){document.getElementById(n).scrollIntoView()}function h(n){return n?n.charAt(0).toUpperCase()+n.slice(1):n}function v(n){var t=n.split(" "),e=t.map((n=>h(n)));return e.join(" ")}function w(n,t=!1){return t?`-${n}%`:`${n}%`}function b(n){var t=n.parentNode;return(n.scrollTop||t.scrollTop)/(t.scrollHeight-t.clientHeight)*100}function $(n,t=!0){return n.sort(((n,e)=>t?n-e:e-n))}return{capitalizeFirstLetter:h,capitalizeLetters:v,conditionalTruncate:f,decreaseIndex:p,formatAsPercentage:w,getVerticalScrollPercentage:b,hasNull:n,indexElements:t,incrementLastId:e,increaseIndex:m,listManager:d,loadComponent:c,loadLayout:u,loadView:a,quickSort:$,readFile:r,readMultipleFiles:s,scrollToSection:g,truncate:l}}function f(){function n(n){var t=new URL(n,window.location.href);return t.toString()}function t(n){var t={NODE_ENV:"production",BASE_URL:"/"}.rootUrl||"http://127.0.0.1:8000";return new URL(n,t).toString()}function e(n,t=100,e=0){let r=100,i=0;if(n){const o=new URL(n),a=o.searchParams.get("limit"),u=o.searchParams.get("offset");r=a||t,i=u||e}return new URLSearchParams({limit:r,offset:i})}function r(n,t=1){let e=1;if(n){const r=new URL(n),i=r.searchParams.get("page");e=i||t}return new URLSearchParams({page:e})}return{buildLimitOffset:e,getPageFromParams:r,mediaUrl:t,rebuildPath:n}}},9068:function(n,t,e){e.r(t),e.d(t,{default:function(){return p}});var r=e(3396);const i=n=>((0,r.dD)("data-v-dbb9f374"),n=n(),(0,r.Cn)(),n),o={ref:"link",class:"bg-dark px-4 py-5 bg-image"},a={class:"py-5"},u=i((()=>(0,r._)("div",{class:"fader"},null,-1))),c={class:"container"};function s(n,t,e,i,s,l){return(0,r.wg)(),(0,r.iD)("section",null,[(0,r._)("div",o,[(0,r._)("div",a,[(0,r.WI)(n.$slots,"default",{},void 0,!0),u])],512),(0,r._)("div",c,[(0,r.WI)(n.$slots,"content",{},void 0,!0)])])}var l=e(9255),f={name:"BaseDetailPage",props:{image:{type:String,required:!0}},setup(){const{mediaUrl:n}=(0,l.J_)();return{mediaUrl:n}},mounted(){const n=this.mediaUrl(this.image);this.$refs.link.style.backgroundImage=`url(${n})`}},d=e(89);const m=(0,d.Z)(f,[["render",s],["__scopeId","data-v-dbb9f374"]]);var p=m}}]);
//# sourceMappingURL=9068.7b2fafde.js.map