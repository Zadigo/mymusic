"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[7850,5361],{9255:function(t,e,n){n.d(e,{J_:function(){return d},jh:function(){return u},sk:function(){return c}});n(1703);var s=n(4806),r=n.n(s);function a(t,e){throw new Error(`${t} - ${e}`)}function i(t){return()=>n(2513)(`./${t}.vue`)}function o(t){return()=>n(2115)(`./${t}.vue`)}function l(t){return()=>n(3457)(`./${t}.vue`)}function c(t){return new Promise((e=>setTimeout(e,t)))}function u(){function t(t){let e=[];return"object"===typeof t&&(e=Object.values(t)),r().some(e,(t=>null===t||""===t))}function e(t){t.forEach((t=>"object"!==typeof t?(a("indexElements",`${t} is not a dictionnary`),null):(t.id=1,t)))}function n(t){var e=r().last(t);return"object"!==typeof e?(a("incrementLastId",`${e} is not a dictionnary`),null):e.id+1}function s(t){var e=null;if(t&&t[0]){const n=new FileReader;n.onload=t=>{e=t.target.result},n.readAsDataURL(t[0])}return e}function c(t){return t.map((t=>s(t)))}function u(t,e=28){return"string"!==typeof t?(a("truncate",`${t} should be a string`),""):`${t.slice(0,e)}...`}function d(t,e,n){return t.length>=e?u(t,n):t}function y(t,e){if(t.includes(e)){const n=r().indexOf(t,e);t.splice(n,1)}else t.push(e);return t}function p(t,e){var n=e+1;return n>t.length-1&&(n=0),n}function h(t,e){var n=e-1;return n<0&&(n=t.length-1),n}function f(t){document.getElementById(t).scrollIntoView()}function g(t){return t?t.charAt(0).toUpperCase()+t.slice(1):t}function m(t){var e=t.split(" "),n=e.map((t=>g(t)));return n.join(" ")}function v(t,e=!1){return e?`-${t}%`:`${t}%`}function w(t){var e=t.parentNode;return(t.scrollTop||e.scrollTop)/(e.scrollHeight-e.clientHeight)*100}function P(t,e=!0){return t.sort(((t,n)=>e?t-n:n-t))}return{capitalizeFirstLetter:g,capitalizeLetters:m,conditionalTruncate:d,decreaseIndex:h,formatAsPercentage:v,getVerticalScrollPercentage:w,hasNull:t,indexElements:e,incrementLastId:n,increaseIndex:p,listManager:y,loadComponent:l,loadLayout:o,loadView:i,quickSort:P,readFile:s,readMultipleFiles:c,scrollToSection:f,truncate:u}}function d(){function t(t){var e=new URL(t,window.location.href);return e.toString()}function e(t){var e={NODE_ENV:"production",BASE_URL:"/"}.rootUrl||"http://127.0.0.1:8000";return new URL(t,e).toString()}function n(t,e=100,n=0){let s=100,r=0;if(t){const a=new URL(t),i=a.searchParams.get("limit"),o=a.searchParams.get("offset");s=i||e,r=o||n}return new URLSearchParams({limit:s,offset:r})}function s(t,e=1){let n=1;if(t){const s=new URL(t),r=s.searchParams.get("page");n=r||e}return new URLSearchParams({page:n})}return{buildLimitOffset:n,getPageFromParams:s,mediaUrl:e,rebuildPath:t}}},7823:function(t,e,n){n.d(e,{n:function(){return r}});var s=n(3766);const r=(0,s.Q_)("player",{state:()=>({isPlaying:!1,currentSong:{}}),actions:{play(t){this.currentSong=t,this.isPlaying=!0},pause(){this.isPlaying=!1}},getters:{isCurrentSong(){return t=>t.name===this.currentSong.name}}})},6378:function(t,e,n){n.d(e,{K:function(){return o}});var s=n(3766),r=n(7823),a=n(4806),i=n.n(a);const o=(0,s.Q_)("playlists",{state:()=>({cursor:0,playlists:[],currentPlaylist:{songs:[]},playAllSongs:!1}),actions:{setPlaylist(t){this.loadFromCache();const e=(0,a.toNumber)(t);this.currentPlaylist=i().find(this.playlists,["id",e])},increaseCursor(){},decreaseCursor(){},playAll(){this.cursor=0,this.playAllSongs=!0;const t=(0,r.n)();t.play(this.currentSong)},startPlaylist(){const t=(0,r.n)();t.play(this.currentSong)},stopPlaylist(){this.playAllSongs=!1;const t=(0,r.n)();t.pause()},nextSong(){const t=(0,r.n)();this.increaseCursor(),t.play(this.currentSong)},previousSong(){const t=(0,r.n)();this.decreaseCursor(),t.play(this.currentSong)},randomSong(){const t=(0,r.n)();this.cursor=0,t.play(this.currentSong)},loadFromCache(t=!1){(t||0===this.playlists.length)&&(this.playlists=this.$session.retrieve("playlists"))}},getters:{currentSong(){return this.currentPlaylist.songs[this.cursor]||{}},byGenre(){return[]},_isPlaying(){const t=(0,r.n)(),{isPlaying:e}=(0,s.Jk)(t);return e.value}}})},5361:function(t,e,n){n.r(e),n.d(e,{default:function(){return h}});var s=n(3396),r=n(7139);const a={class:"row"},i={class:"col-12"},o={class:"card bg-transparent shadow-none text-muted text-center"},l={class:"card-content"},c={class:"display-5"};function u(t,e,n,u,d,y){const p=(0,s.up)("font-awesome-icon");return(0,s.wg)(),(0,s.iD)("div",a,[(0,s._)("div",i,[(0,s._)("div",o,[(0,s._)("div",l,[(0,s.Wm)(p,{icon:"fa-solid fa-icons",class:"mb-4",size:"5x"}),(0,s._)("h4",c,(0,r.zw)(n.content),1)])])])])}var d={name:"EmptyIteration",props:{content:{type:String,default:"There are no playlists available"}}},y=n(89);const p=(0,y.Z)(d,[["render",u]]);var h=p},7850:function(t,e,n){n.r(e),n.d(e,{default:function(){return P}});var s=n(3396),r=n(7139);const a={class:"col-12 my-3"},i={key:0,class:"row"},o={class:"card my-2"},l=["src","alt"],c={class:"card-body"},u={class:"fw-bold card-title"},d={key:0,class:"card-text text-muted m-0"},y={key:1,class:"card-text text-muted m-0"};function p(t,e,n,p,h,f){const g=(0,s.up)("router-link"),m=(0,s.up)("empty-iteration-vue");return(0,s.wg)(),(0,s.iD)("div",a,[f.playlists.length>0?((0,s.wg)(),(0,s.iD)("div",i,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(f.playlists,(e=>((0,s.wg)(),(0,s.iD)("article",{key:e.id,class:"col-sm-12 col-md-4"},[(0,s.Wm)(g,{to:f.navigateToPlaylist(e),"aria-label":e.name,class:"text-decoration-none text-white"},{default:(0,s.w5)((()=>[(0,s._)("div",o,[(0,s._)("img",{src:p.mediaUrl(e.cover_image),alt:e.name,class:"card-img-top"},null,8,l),(0,s._)("div",c,[(0,s._)("h4",u,(0,r.zw)(e.name),1),n.userPlaylists?((0,s.wg)(),(0,s.iD)("p",d,(0,r.zw)(t.$t("Created by",{user:e.author.username})),1)):((0,s.wg)(),(0,s.iD)("p",y,(0,r.zw)(t.$t("Created by",{user:"spotify"})),1))])])])),_:2},1032,["to","aria-label"])])))),128))])):((0,s.wg)(),(0,s.j4)(m,{key:1,class:"py-5 my-5",content:"There are no playlists available"}))])}var h=n(9255),f=n(6378),g=n(5361),m={name:"ListPlaylists",components:{EmptyIterationVue:g["default"]},inject:{darkMode:["darkMode"]},props:{userPlaylists:{type:Boolean},otherPlaylist:{type:Array,default:()=>[]}},setup(){const t=(0,f.K)(),{mediaUrl:e}=(0,h.J_)();return{store:t,mediaUrl:e}},computed:{playlists(){return this.userPlaylists?this.store.playlists:this.otherPlaylist}},created(){this.userPlaylists&&this.getUserPlaylists()},methods:{async getUserPlaylists(){try{if(this.sessionStorage.hasPlaylists)this.store.playlists=this.sessionStorage.playlists;else{const t=await this.$http.get("playlists");this.store.$patch((e=>{e.playlists=t.data,this.$session.create("hasPlaylists",!0),this.$session.create("playlists",t.data)}))}}catch(t){console.error(t)}},navigateToPlaylist(t){return this.store.setPlaylist(t.id),{name:"playlist_view",params:{id:t.id}}}}},v=n(89);const w=(0,v.Z)(m,[["render",p],["__scopeId","data-v-1cc0989b"]]);var P=w}}]);
//# sourceMappingURL=7850.f39f2ce6.js.map