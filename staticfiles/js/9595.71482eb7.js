"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[9595,5361,1013,6413,7850],{9255:function(t,e,s){s.d(e,{J_:function(){return d},jh:function(){return u},sk:function(){return c}});s(1703);var n=s(4806),r=s.n(n);function a(t,e){throw new Error(`${t} - ${e}`)}function i(t){return()=>s(2513)(`./${t}.vue`)}function l(t){return()=>s(2115)(`./${t}.vue`)}function o(t){return()=>s(3457)(`./${t}.vue`)}function c(t){return new Promise((e=>setTimeout(e,t)))}function u(){function t(t){let e=[];return"object"===typeof t&&(e=Object.values(t)),r().some(e,(t=>null===t||""===t))}function e(t){t.forEach((t=>"object"!==typeof t?(a("indexElements",`${t} is not a dictionnary`),null):(t.id=1,t)))}function s(t){var e=r().last(t);return"object"!==typeof e?(a("incrementLastId",`${e} is not a dictionnary`),null):e.id+1}function n(t){var e=null;if(t&&t[0]){const s=new FileReader;s.onload=t=>{e=t.target.result},s.readAsDataURL(t[0])}return e}function c(t){return t.map((t=>n(t)))}function u(t,e=28){return"string"!==typeof t?(a("truncate",`${t} should be a string`),""):`${t.slice(0,e)}...`}function d(t,e,s){return t.length>=e?u(t,s):t}function p(t,e){if(t.includes(e)){const s=r().indexOf(t,e);t.splice(s,1)}else t.push(e);return t}function y(t,e){var s=e+1;return s>t.length-1&&(s=0),s}function m(t,e){var s=e-1;return s<0&&(s=t.length-1),s}function f(t){document.getElementById(t).scrollIntoView()}function h(t){return t?t.charAt(0).toUpperCase()+t.slice(1):t}function g(t){var e=t.split(" "),s=e.map((t=>h(t)));return s.join(" ")}function v(t,e=!1){return e?`-${t}%`:`${t}%`}function w(t){var e=t.parentNode;return(t.scrollTop||e.scrollTop)/(e.scrollHeight-e.clientHeight)*100}function P(t,e=!0){return t.sort(((t,s)=>e?t-s:s-t))}return{capitalizeFirstLetter:h,capitalizeLetters:g,conditionalTruncate:d,decreaseIndex:m,formatAsPercentage:v,getVerticalScrollPercentage:w,hasNull:t,indexElements:e,incrementLastId:s,increaseIndex:y,listManager:p,loadComponent:o,loadLayout:l,loadView:i,quickSort:P,readFile:n,readMultipleFiles:c,scrollToSection:f,truncate:u}}function d(){function t(t){var e=new URL(t,window.location.href);return e.toString()}function e(t){var e={NODE_ENV:"production",BASE_URL:"/"}.rootUrl||"http://127.0.0.1:8000";return new URL(t,e).toString()}function s(t,e=100,s=0){let n=100,r=0;if(t){const a=new URL(t),i=a.searchParams.get("limit"),l=a.searchParams.get("offset");n=i||e,r=l||s}return new URLSearchParams({limit:n,offset:r})}function n(t,e=1){let s=1;if(t){const n=new URL(t),r=n.searchParams.get("page");s=r||e}return new URLSearchParams({page:s})}return{buildLimitOffset:s,getPageFromParams:n,mediaUrl:e,rebuildPath:t}}},7823:function(t,e,s){s.d(e,{n:function(){return r}});var n=s(3766);const r=(0,n.Q_)("player",{state:()=>({isPlaying:!1,currentSong:{}}),actions:{play(t){this.currentSong=t,this.isPlaying=!0},pause(){this.isPlaying=!1}},getters:{isCurrentSong(){return t=>t.name===this.currentSong.name}}})},6378:function(t,e,s){s.d(e,{K:function(){return l}});var n=s(3766),r=s(7823),a=s(4806),i=s.n(a);const l=(0,n.Q_)("playlists",{state:()=>({cursor:0,playlists:[],currentPlaylist:{songs:[]},playAllSongs:!1}),actions:{setPlaylist(t){this.loadFromCache();const e=(0,a.toNumber)(t);this.currentPlaylist=i().find(this.playlists,["id",e])},increaseCursor(){},decreaseCursor(){},playAll(){this.cursor=0,this.playAllSongs=!0;const t=(0,r.n)();t.play(this.currentSong)},startPlaylist(){const t=(0,r.n)();t.play(this.currentSong)},stopPlaylist(){this.playAllSongs=!1;const t=(0,r.n)();t.pause()},nextSong(){const t=(0,r.n)();this.increaseCursor(),t.play(this.currentSong)},previousSong(){const t=(0,r.n)();this.decreaseCursor(),t.play(this.currentSong)},randomSong(){const t=(0,r.n)();this.cursor=0,t.play(this.currentSong)},loadFromCache(t=!1){(t||0===this.playlists.length)&&(this.playlists=this.$session.retrieve("playlists"))}},getters:{currentSong(){return this.currentPlaylist.songs[this.cursor]||{}},byGenre(){return[]},_isPlaying(){const t=(0,r.n)(),{isPlaying:e}=(0,n.Jk)(t);return e.value}}})},5361:function(t,e,s){s.r(e),s.d(e,{default:function(){return m}});var n=s(3396),r=s(7139);const a={class:"row"},i={class:"col-12"},l={class:"card bg-transparent shadow-none text-muted text-center"},o={class:"card-content"},c={class:"display-5"};function u(t,e,s,u,d,p){const y=(0,n.up)("font-awesome-icon");return(0,n.wg)(),(0,n.iD)("div",a,[(0,n._)("div",i,[(0,n._)("div",l,[(0,n._)("div",o,[(0,n.Wm)(y,{icon:"fa-solid fa-icons",class:"mb-4",size:"5x"}),(0,n._)("h4",c,(0,r.zw)(s.content),1)])])])])}var d={name:"EmptyIteration",props:{content:{type:String,default:"There are no playlists available"}}},p=s(89);const y=(0,p.Z)(d,[["render",u]]);var m=y},1013:function(t,e,s){s.r(e);const n={},r=n;e["default"]=r},6413:function(t,e,s){s.r(e);const n={},r=n;e["default"]=r},7850:function(t,e,s){s.r(e),s.d(e,{default:function(){return P}});var n=s(3396),r=s(7139);const a={class:"col-12 my-3"},i={key:0,class:"row"},l={class:"card my-2"},o=["src","alt"],c={class:"card-body"},u={class:"fw-bold card-title"},d={key:0,class:"card-text text-muted m-0"},p={key:1,class:"card-text text-muted m-0"};function y(t,e,s,y,m,f){const h=(0,n.up)("router-link"),g=(0,n.up)("empty-iteration-vue");return(0,n.wg)(),(0,n.iD)("div",a,[f.playlists.length>0?((0,n.wg)(),(0,n.iD)("div",i,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(f.playlists,(e=>((0,n.wg)(),(0,n.iD)("article",{key:e.id,class:"col-sm-12 col-md-4"},[(0,n.Wm)(h,{to:f.navigateToPlaylist(e),"aria-label":e.name,class:"text-decoration-none text-white"},{default:(0,n.w5)((()=>[(0,n._)("div",l,[(0,n._)("img",{src:y.mediaUrl(e.cover_image),alt:e.name,class:"card-img-top"},null,8,o),(0,n._)("div",c,[(0,n._)("h4",u,(0,r.zw)(e.name),1),s.userPlaylists?((0,n.wg)(),(0,n.iD)("p",d,(0,r.zw)(t.$t("Created by",{user:e.author.username})),1)):((0,n.wg)(),(0,n.iD)("p",p,(0,r.zw)(t.$t("Created by",{user:"spotify"})),1))])])])),_:2},1032,["to","aria-label"])])))),128))])):((0,n.wg)(),(0,n.j4)(g,{key:1,class:"py-5 my-5",content:"There are no playlists available"}))])}var m=s(9255),f=s(6378),h=s(5361),g={name:"ListPlaylists",components:{EmptyIterationVue:h["default"]},inject:{darkMode:["darkMode"]},props:{userPlaylists:{type:Boolean},otherPlaylist:{type:Array,default:()=>[]}},setup(){const t=(0,f.K)(),{mediaUrl:e}=(0,m.J_)();return{store:t,mediaUrl:e}},computed:{playlists(){return this.userPlaylists?this.store.playlists:this.otherPlaylist}},created(){this.userPlaylists&&this.getUserPlaylists()},methods:{async getUserPlaylists(){try{if(this.sessionStorage.hasPlaylists)this.store.playlists=this.sessionStorage.playlists;else{const t=await this.$http.get("playlists");this.store.$patch((e=>{e.playlists=t.data,this.$session.create("hasPlaylists",!0),this.$session.create("playlists",t.data)}))}}catch(t){console.error(t)}},navigateToPlaylist(t){return this.store.setPlaylist(t.id),{name:"playlist_view",params:{id:t.id}}}}},v=s(89);const w=(0,v.Z)(g,[["render",y],["__scopeId","data-v-1cc0989b"]]);var P=w},9595:function(t,e,s){s.r(e),s.d(e,{default:function(){return v}});var n=s(3396),r=s(7139);const a={id:"playlists",class:"p-5"},i={class:"row"},l={class:"col-12"},o=["onClick"],c={key:0,class:"col-12 mt-4"};function u(t,e,s,u,d,p){const y=(0,n.up)("font-awesome-icon");return(0,n.wg)(),(0,n.iD)("section",a,[(0,n._)("div",i,[(0,n._)("div",l,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(d.displayChoices,((e,s)=>((0,n.wg)(),(0,n.iD)("button",{key:s,class:(0,r.C_)([[e.component===d.activeComponent?"active":null,{"mx-2":s>0}],"btn btn-light"]),type:"button",onClick:t=>d.activeComponent=e.component},(0,r.zw)(t.$t(e.name)),11,o)))),128))]),"list-playlists-vue"===d.activeComponent?((0,n.wg)(),(0,n.iD)("div",c,[(0,n._)("button",{type:"button",class:"btn btn-primary",onClick:e[0]||(e[0]=(...t)=>p.create&&p.create(...t))},[(0,n.Wm)(y,{icon:"fa-solid fa-plus",class:"me-2"}),(0,n.Uk)(" "+(0,r.zw)(t.$t("Create playlist")),1)])])):(0,n.kq)("",!0),((0,n.wg)(),(0,n.j4)((0,n.LL)(d.activeComponent),{"user-playlists":!0}))])])}var d=s(6378),p=s(6413),y=s(1013),m=s(7850),f={name:"PlaylistsView",components:{ListArtistsVue:p["default"],ListAlbumsVue:y["default"],ListPlaylistsVue:m["default"]},emits:{"display-alert":()=>!0},setup(){const t=(0,d.K)();return{store:t}},data(){return{displayChoices:[{name:"Playlists",component:"list-playlists-vue"},{name:"Artists",component:"list-artists-vue"},{name:"Albums",component:"list-albums-vue"}],activeComponent:"list-playlists-vue"}},methods:{async create(){try{const t=await this.$http.post("playlists/create");this.$session.updateArray("playlists",t.data),this.store.loadFromCache(!0),this.$emit("display-alert","success","Playlist created",t)}catch(t){this.$emit("display-alert","error","PLA-CRE",t.message)}}}},h=s(89);const g=(0,h.Z)(f,[["render",u]]);var v=g}}]);
//# sourceMappingURL=9595.71482eb7.js.map