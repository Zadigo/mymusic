"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[668,68,583],{9255:function(t,n,e){e.d(n,{J_:function(){return r},sk:function(){return s}});e(1703),e(4806);function s(t){return new Promise((n=>setTimeout(n,t)))}function r(){function t(t){var n=new URL(t,window.location.href);return n.toString()}function n(t){var n={NODE_ENV:"production",BASE_URL:"/"}.rootUrl||"http://127.0.0.1:8000";return new URL(t,n).toString()}function e(t,n=100,e=0){let s=100,r=0;if(t){const a=new URL(t),i=a.searchParams.get("limit"),o=a.searchParams.get("offset");s=i||n,r=o||e}return new URLSearchParams({limit:s,offset:r})}function s(t,n=1){let e=1;if(t){const s=new URL(t),r=s.searchParams.get("page");e=r||n}return new URLSearchParams({page:e})}return{buildLimitOffset:e,getPageFromParams:s,mediaUrl:n,rebuildPath:t}}},7823:function(t,n,e){e.d(n,{n:function(){return r}});var s=e(3766);const r=(0,s.Q_)("player",{state:()=>({isPlaying:!1,currentSong:{}}),actions:{play(t){this.currentSong=t,this.isPlaying=!0},pause(){this.isPlaying=!1}},getters:{isCurrentSong(){return t=>t.name===this.currentSong.name}}})},9761:function(t,n,e){e.d(n,{R:function(){return r}});var s=e(3766);const r=(0,s.Q_)("search",{state:()=>({currentSearch:null,currentArtist:{},currentAlbum:{}}),actions:{},getters:{searchHistory(){return[]}}})},9068:function(t,n,e){e.r(n),e.d(n,{default:function(){return g}});var s=e(3396);const r=t=>((0,s.dD)("data-v-dbb9f374"),t=t(),(0,s.Cn)(),t),a={ref:"link",class:"bg-dark px-4 py-5 bg-image"},i={class:"py-5"},o=r((()=>(0,s._)("div",{class:"fader"},null,-1))),u={class:"container"};function l(t,n,e,r,l,c){return(0,s.wg)(),(0,s.iD)("section",null,[(0,s._)("div",a,[(0,s._)("div",i,[(0,s.WI)(t.$slots,"default",{},void 0,!0),o])],512),(0,s._)("div",u,[(0,s.WI)(t.$slots,"content",{},void 0,!0)])])}var c=e(9255),d={name:"BaseDetailPage",props:{image:{type:String,required:!0}},setup(){const{mediaUrl:t}=(0,c.J_)();return{mediaUrl:t}},mounted(){const t=this.mediaUrl(this.image);this.$refs.link.style.backgroundImage=`url(${t})`}},f=e(89);const m=(0,f.Z)(d,[["render",l],["__scopeId","data-v-dbb9f374"]]);var g=m},3583:function(t,n,e){e.r(n),e.d(n,{default:function(){return w}});var s=e(3396),r=e(9242),a=e(7139);const i={class:"list-group"},o={class:"d-flex flex-column"},u={class:"btn-group"},l=["onClick"],c={type:"button",class:"btn btn-primary btn-sm"},d={type:"button",class:"btn btn-primary btn-sm"};function f(t,n,e,f,m,g){const p=(0,s.up)("font-awesome-icon"),b=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",i,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.songs,(t=>((0,s.wg)(),(0,s.iD)("a",{key:t.id,href:"",class:"list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center",onClick:n[1]||(n[1]=(0,r.withModifiers)((()=>{}),["prevent"]))},[(0,s._)("div",o,[(0,s._)("span",null,[(0,s.Uk)((0,a.zw)(t.name)+" ",1),(0,s.Wm)(p,{icon:"fa-solid fa-e",class:"ms-3"})]),(0,s.Wm)(b,{to:{name:"artist_view",params:{id:"nnoin"}},class:"text-muted text-decoration"},{default:(0,s.w5)((()=>[(0,s.Uk)((0,a.zw)(t.album.artist.name),1)])),_:2},1024)]),(0,s._)("div",u,[f.isPlaying&&f.store.isCurrentSong(t)?((0,s.wg)(),(0,s.iD)("button",{key:0,type:"button",class:"btn btn-primary btn-sm",onClick:n[0]||(n[0]=(...t)=>f.store.pause&&f.store.pause(...t))},[(0,s.Wm)(p,{icon:"fa-solid fa-pause"})])):((0,s.wg)(),(0,s.iD)("button",{key:1,type:"button",class:"btn btn-primary btn-sm",onClick:n=>f.store.play(t)},[(0,s.Wm)(p,{icon:"fa-solid fa-play"})],8,l)),(0,s._)("button",c,[(0,s.Wm)(p,{icon:"fa-solid fa-heart"})]),(0,s._)("button",d,[(0,s.Wm)(p,{icon:"fa-solid fa-ellipsis-vertical"})])])])))),128))])}var m=e(7823),g=e(3766),p={name:"BaseSongsListGroup",props:{songs:{type:Array,default:()=>[]}},setup(){const t=(0,m.n)(),{isPlaying:n}=(0,g.Jk)(t);return{store:t,isPlaying:n}}},b=e(89);const v=(0,b.Z)(p,[["render",f],["__scopeId","data-v-1cc4293f"]]);var w=v},9668:function(t,n,e){e.r(n),e.d(n,{default:function(){return k}});var s=e(3396),r=e(7139);const a={class:"d-flex justify-content-start"},i=["src"],o={class:"ms-3"},u={class:"display-4 fw-bold"},l={class:"btn-group shadow-none"},c={type:"button",class:"btn btn-light"},d={type:"button",class:"btn btn-light"},f={class:"row my-5"},m={class:"col-12"};function g(t,n,e,g,p,b){const v=(0,s.up)("font-awesome-icon"),w=(0,s.up)("base-songs-list-group-vue"),y=(0,s.up)("base-detail-page-vue");return(0,s.wg)(),(0,s.j4)(y,{image:g.mediaUrl(g.store.currentAlbum.cover_image),class:"text-light position-relative"},{default:(0,s.w5)((()=>[(0,s._)("div",a,[(0,s._)("img",{src:g.mediaUrl(g.store.currentAlbum.cover_image_thumbnail),class:"img-fluid rounded shadow",width:"250",alt:""},null,8,i),(0,s._)("div",o,[(0,s._)("h1",u,(0,r.zw)(g.store.currentAlbum.name),1),(0,s._)("div",l,[(0,s._)("button",c,[(0,s.Wm)(v,{icon:"fa-solid fa-play"})]),(0,s._)("button",d,[(0,s.Wm)(v,{icon:"fa-solid fa-circle-plus"})])])])])])),content:(0,s.w5)((()=>[(0,s._)("div",f,[(0,s._)("div",m,[(0,s.Wm)(w)])])])),_:1},8,["image"])}var p=e(9761),b=e(9255),v=e(9068),w=e(3583),y={name:"AlbumView",components:{BaseDetailPageVue:v["default"],BaseSongsListGroupVue:w["default"]},setup(){const t=(0,p.R)(),{mediaUrl:n}=(0,b.J_)();return{store:t,mediaUrl:n}}},_=e(89);const h=(0,_.Z)(y,[["render",g]]);var k=h}}]);
//# sourceMappingURL=668.897aad5d.js.map