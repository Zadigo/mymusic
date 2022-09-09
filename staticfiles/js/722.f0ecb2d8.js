"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[722,361],{9255:function(t,s,e){e.d(s,{J_:function(){return a},sk:function(){return n}});e(1703),e(4806);function n(t){return new Promise((s=>setTimeout(s,t)))}function a(){function t(t){var s=new URL(t,window.location.href);return s.toString()}function s(t){var s={NODE_ENV:"production",BASE_URL:"/"}.rootUrl||"http://127.0.0.1:8000";return new URL(t,s).toString()}function e(t,s=100,e=0){let n=100,a=0;if(t){const r=new URL(t),i=r.searchParams.get("limit"),l=r.searchParams.get("offset");n=i||s,a=l||e}return new URLSearchParams({limit:n,offset:a})}function n(t,s=1){let e=1;if(t){const n=new URL(t),a=n.searchParams.get("page");e=a||s}return new URLSearchParams({page:e})}return{buildLimitOffset:e,getPageFromParams:n,mediaUrl:s,rebuildPath:t}}},7823:function(t,s,e){e.d(s,{n:function(){return a}});var n=e(3766);const a=(0,n.Q_)("player",{state:()=>({isPlaying:!1,currentSong:{}}),actions:{play(t){this.currentSong=t,this.isPlaying=!0},pause(){this.isPlaying=!1}},getters:{isCurrentSong(){return t=>t.name===this.currentSong.name}}})},6378:function(t,s,e){e.d(s,{K:function(){return l}});var n=e(3766),a=e(7823),r=e(4806),i=e.n(r);const l=(0,n.Q_)("playlists",{state:()=>({cursor:0,playlists:[],currentPlaylist:{songs:[]},playAllSongs:!1}),actions:{setPlaylist(t){const s=(0,r.toNumber)(t);this.currentPlaylist=i().find(this.playlists,["id",s])},increaseCursor(){},decreaseCursor(){},playAll(){this.cursor=0,this.playAllSongs=!0;const t=(0,a.n)();t.play(this.currentSong)},startPlaylist(){const t=(0,a.n)();t.play(this.currentSong)},stopPlaylist(){this.playAllSongs=!1;const t=(0,a.n)();t.pause()},nextSong(){const t=(0,a.n)();this.increaseCursor(),t.play(this.currentSong)},previousSong(){const t=(0,a.n)();this.decreaseCursor(),t.play(this.currentSong)},randomSong(){const t=(0,a.n)();this.cursor=0,t.play(this.currentSong)},loadFromCache(t=!1){(t||0===Object.keys(this.currentPlaylist).length)&&(this.playlists=this.$session.retrieve("playlists"))}},getters:{currentSong(){return this.currentPlaylist.songs[this.cursor]||{}},byGenre(){return[]},_isPlaying(){const t=(0,a.n)(),{isPlaying:s}=(0,n.Jk)(t);return s.value}}})},5361:function(t,s,e){e.r(s),e.d(s,{default:function(){return p}});var n=e(3396),a=e(7139);const r={class:"row"},i={class:"col-12"},l={class:"card bg-transparent shadow-none text-muted text-center"},o={class:"card-content"},c={class:"display-5"};function u(t,s,e,u,d,y){const h=(0,n.up)("font-awesome-icon");return(0,n.wg)(),(0,n.iD)("div",r,[(0,n._)("div",i,[(0,n._)("div",l,[(0,n._)("div",o,[(0,n.Wm)(h,{icon:"fa-solid fa-icons",class:"mb-4",size:"5x"}),(0,n._)("h4",c,(0,a.zw)(e.content),1)])])])])}var d={name:"EmptyIteration",props:{content:{type:String,default:"There are no playlists available"}}},y=e(89);const h=(0,y.Z)(d,[["render",u]]);var p=h},8722:function(t,s,e){e.r(s),e.d(s,{default:function(){return w}});var n=e(3396),a=e(7139);const r={class:"col-12 my-3"},i={key:0,class:"row"},l={class:"card my-2"},o=["src","alt"],c={class:"card-body"},u={class:"fw-bold card-title"},d={class:"card-text text-muted m-0"};function y(t,s,e,y,h,p){const g=(0,n.up)("router-link"),m=(0,n.up)("empty-iteration-vue");return(0,n.wg)(),(0,n.iD)("div",r,[y.store.playlists.length>0?((0,n.wg)(),(0,n.iD)("div",i,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(y.store.playlists,(s=>((0,n.wg)(),(0,n.iD)("article",{key:s.id,class:"col-sm-12 col-md-4"},[(0,n.Wm)(g,{to:p.navigateToPlaylist(s),"aria-label":s.name,class:"text-decoration-none text-white"},{default:(0,n.w5)((()=>[(0,n._)("div",l,[(0,n._)("img",{src:y.mediaUrl(s.cover_image),alt:s.name,class:"card-img-top"},null,8,o),(0,n._)("div",c,[(0,n._)("h4",u,(0,a.zw)(s.name),1),(0,n._)("p",d,(0,a.zw)(t.$t("Created by",{user:s.author.username})),1)])])])),_:2},1032,["to","aria-label"])])))),128))])):((0,n.wg)(),(0,n.j4)(m,{key:1,class:"py-5 my-5",content:"There are no playlists available"}))])}var h=e(9255),p=e(6378),g=e(5361),m={name:"ListPlaylists",components:{EmptyIterationVue:g["default"]},inject:{darkMode:["darkMode"]},setup(){const t=(0,p.K)(),{mediaUrl:s}=(0,h.J_)();return{store:t,mediaUrl:s}},created(){this.getPlaylists()},methods:{async getPlaylists(){try{if(this.sessionStorage.hasPlaylists)this.store.playlists=this.sessionStorage.playlists;else{const t=await this.$http.get("playlists");this.store.$patch((s=>{s.playlists=t.data,this.$session.create("hasPlaylists",!0),this.$session.create("playlists",t.data)}))}}catch(t){console.error(t)}},navigateToPlaylist(t){return this.store.setPlaylist(t.id),{name:"playlist_view",params:{id:t.id}}}}},f=e(89);const v=(0,f.Z)(m,[["render",y],["__scopeId","data-v-17a95e68"]]);var w=v}}]);
//# sourceMappingURL=722.f0ecb2d8.js.map