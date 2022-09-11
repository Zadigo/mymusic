"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[267,450,68,583],{9255:function(t,s,n){n.d(s,{J_:function(){return i},sk:function(){return e}});n(1703),n(4806);function e(t){return new Promise((s=>setTimeout(s,t)))}function i(){function t(t){var s=new URL(t,window.location.href);return s.toString()}function s(t){var s={NODE_ENV:"production",BASE_URL:"/"}.rootUrl||"http://127.0.0.1:8000";return new URL(t,s).toString()}function n(t,s=100,n=0){let e=100,i=0;if(t){const a=new URL(t),o=a.searchParams.get("limit"),r=a.searchParams.get("offset");e=o||s,i=r||n}return new URLSearchParams({limit:e,offset:i})}function e(t,s=1){let n=1;if(t){const e=new URL(t),i=e.searchParams.get("page");n=i||s}return new URLSearchParams({page:n})}return{buildLimitOffset:n,getPageFromParams:e,mediaUrl:s,rebuildPath:t}}},7823:function(t,s,n){n.d(s,{n:function(){return i}});var e=n(3766);const i=(0,e.Q_)("player",{state:()=>({isPlaying:!1,currentSong:{}}),actions:{play(t){this.currentSong=t,this.isPlaying=!0},pause(){this.isPlaying=!1}},getters:{isCurrentSong(){return t=>t.name===this.currentSong.name}}})},6378:function(t,s,n){n.d(s,{K:function(){return r}});var e=n(3766),i=n(7823),a=n(4806),o=n.n(a);const r=(0,e.Q_)("playlists",{state:()=>({cursor:0,playlists:[],currentPlaylist:{songs:[]},playAllSongs:!1}),actions:{setPlaylist(t){const s=(0,a.toNumber)(t);this.currentPlaylist=o().find(this.playlists,["id",s])},increaseCursor(){},decreaseCursor(){},playAll(){this.cursor=0,this.playAllSongs=!0;const t=(0,i.n)();t.play(this.currentSong)},startPlaylist(){const t=(0,i.n)();t.play(this.currentSong)},stopPlaylist(){this.playAllSongs=!1;const t=(0,i.n)();t.pause()},nextSong(){const t=(0,i.n)();this.increaseCursor(),t.play(this.currentSong)},previousSong(){const t=(0,i.n)();this.decreaseCursor(),t.play(this.currentSong)},randomSong(){const t=(0,i.n)();this.cursor=0,t.play(this.currentSong)},loadFromCache(t=!1){(t||0===Object.keys(this.currentPlaylist).length)&&(this.playlists=this.$session.retrieve("playlists"))}},getters:{currentSong(){return this.currentPlaylist.songs[this.cursor]||{}},byGenre(){return[]},_isPlaying(){const t=(0,i.n)(),{isPlaying:s}=(0,e.Jk)(t);return s.value}}})},450:function(t,s,n){n.r(s),n.d(s,{default:function(){return v}});var e=n(3396),i=n(7139),a=n(9242);const o={class:"list-group"},r={class:"d-flex flex-column"},l={class:"btn-group"},c=["onClick"],u={type:"button",class:"btn btn-primary btn-sm"},d={type:"button",class:"btn btn-primary btn-sm"};function g(t,s,n,g,p,f){const y=(0,e.up)("font-awesome-icon"),m=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)("div",o,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(p.titles,(t=>((0,e.wg)(),(0,e.iD)("div",{key:t},[(0,e._)("h3",null,(0,i.zw)(t),1),((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(p.classification[t],(t=>((0,e.wg)(),(0,e.iD)("a",{key:t.id,href:"",class:"list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center",onClick:s[1]||(s[1]=(0,a.withModifiers)((()=>{}),["prevent"]))},[(0,e._)("div",r,[(0,e._)("span",null,[(0,e.Uk)((0,i.zw)(t.name)+" ",1),(0,e.Wm)(y,{icon:"fa-solid fa-e",class:"ms-3"})]),(0,e.Wm)(m,{to:{name:"artist_view",params:{id:"nnoin"}},class:"text-muted text-decoration"},{default:(0,e.w5)((()=>[(0,e.Uk)((0,i.zw)(t.album.artist.name),1)])),_:2},1024)]),(0,e._)("div",l,[g.isPlaying&&g.store.isCurrentSong(t)?((0,e.wg)(),(0,e.iD)("button",{key:0,type:"button",class:"btn btn-primary btn-sm",onClick:s[0]||(s[0]=(...t)=>g.store.pause&&g.store.pause(...t))},[(0,e.Wm)(y,{icon:"fa-solid fa-pause"})])):((0,e.wg)(),(0,e.iD)("button",{key:1,type:"button",class:"btn btn-primary btn-sm",onClick:s=>g.store.play(t)},[(0,e.Wm)(y,{icon:"fa-solid fa-play"})],8,c)),(0,e._)("button",u,[(0,e.Wm)(y,{icon:"fa-solid fa-heart"})]),(0,e._)("button",d,[(0,e.Wm)(y,{icon:"fa-solid fa-ellipsis-vertical"})])])])))),128))])))),128))])}var p=n(4806),f=n.n(p),y=n(7823),m=n(3766),b={name:"BaseCategorizedSongsListGroup",props:{songs:{type:Array,default:()=>[]}},setup(){const t=(0,y.n)(),{isPlaying:s}=(0,m.Jk)(t);return{store:t,isPlaying:s}},data(){return{titles:[],classification:{}}},watch:{songs(){this.categorizeSongs()}},created(){this.categorizeSongs()},methods:{categorizeSongs(){f().forEach(this.songs,(t=>{this.titles.push(t.genre),this.classification[t.genre]=[]})),this.titles=f().uniq(this.titles),f().forEach(this.songs,(t=>{this.classification[t.genre].push(t)}))}}},h=n(89);const w=(0,h.Z)(b,[["render",g],["__scopeId","data-v-5a06c1c1"]]);var v=w},9068:function(t,s,n){n.r(s),n.d(s,{default:function(){return f}});var e=n(3396);const i=t=>((0,e.dD)("data-v-dbb9f374"),t=t(),(0,e.Cn)(),t),a={ref:"link",class:"bg-dark px-4 py-5 bg-image"},o={class:"py-5"},r=i((()=>(0,e._)("div",{class:"fader"},null,-1))),l={class:"container"};function c(t,s,n,i,c,u){return(0,e.wg)(),(0,e.iD)("section",null,[(0,e._)("div",a,[(0,e._)("div",o,[(0,e.WI)(t.$slots,"default",{},void 0,!0),r])],512),(0,e._)("div",l,[(0,e.WI)(t.$slots,"content",{},void 0,!0)])])}var u=n(9255),d={name:"BaseDetailPage",props:{image:{type:String,required:!0}},setup(){const{mediaUrl:t}=(0,u.J_)();return{mediaUrl:t}},mounted(){const t=this.mediaUrl(this.image);this.$refs.link.style.backgroundImage=`url(${t})`}},g=n(89);const p=(0,g.Z)(d,[["render",c],["__scopeId","data-v-dbb9f374"]]);var f=p},3583:function(t,s,n){n.r(s),n.d(s,{default:function(){return h}});var e=n(3396),i=n(9242),a=n(7139);const o={class:"list-group"},r={class:"d-flex flex-column"},l={class:"btn-group"},c=["onClick"],u={type:"button",class:"btn btn-primary btn-sm"},d={type:"button",class:"btn btn-primary btn-sm"};function g(t,s,n,g,p,f){const y=(0,e.up)("font-awesome-icon"),m=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)("div",o,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(n.songs,(t=>((0,e.wg)(),(0,e.iD)("a",{key:t.id,href:"",class:"list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center",onClick:s[1]||(s[1]=(0,i.withModifiers)((()=>{}),["prevent"]))},[(0,e._)("div",r,[(0,e._)("span",null,[(0,e.Uk)((0,a.zw)(t.name)+" ",1),(0,e.Wm)(y,{icon:"fa-solid fa-e",class:"ms-3"})]),(0,e.Wm)(m,{to:{name:"artist_view",params:{id:"nnoin"}},class:"text-muted text-decoration"},{default:(0,e.w5)((()=>[(0,e.Uk)((0,a.zw)(t.album.artist.name),1)])),_:2},1024)]),(0,e._)("div",l,[g.isPlaying&&g.store.isCurrentSong(t)?((0,e.wg)(),(0,e.iD)("button",{key:0,type:"button",class:"btn btn-primary btn-sm",onClick:s[0]||(s[0]=(...t)=>g.store.pause&&g.store.pause(...t))},[(0,e.Wm)(y,{icon:"fa-solid fa-pause"})])):((0,e.wg)(),(0,e.iD)("button",{key:1,type:"button",class:"btn btn-primary btn-sm",onClick:s=>g.store.play(t)},[(0,e.Wm)(y,{icon:"fa-solid fa-play"})],8,c)),(0,e._)("button",u,[(0,e.Wm)(y,{icon:"fa-solid fa-heart"})]),(0,e._)("button",d,[(0,e.Wm)(y,{icon:"fa-solid fa-ellipsis-vertical"})])])])))),128))])}var p=n(7823),f=n(3766),y={name:"BaseSongsListGroup",props:{songs:{type:Array,default:()=>[]}},setup(){const t=(0,p.n)(),{isPlaying:s}=(0,f.Jk)(t);return{store:t,isPlaying:s}}},m=n(89);const b=(0,m.Z)(y,[["render",g],["__scopeId","data-v-1cc4293f"]]);var h=b},3267:function(t,s,n){n.r(s),n.d(s,{default:function(){return z}});var e=n(3396),i=n(7139),a=n(9242);const o={class:"d-flex flex-column justify-content-start"},r={class:"display-2 fw-bold"},l={class:"actions p-3 mt-1 bg-white text-center rounded shadow-sm"},c={type:"button",class:"btn btn-light mx-2 shadow-none"},u={type:"button",class:"btn btn-light mx-2 shadow-none"},d={class:"row my-5"},g={class:"col-12 mb-2"},p={class:"card bg-dark text-light"},f={class:"card-body"},y=["placeholder"],m={class:"form-check form-switch"},b={class:"form-check-label",for:"by-genre"},h={class:"col-12"};function w(t,s,n,w,v,_){const k=(0,e.up)("font-awesome-icon"),P=(0,e.up)("base-categorized-songs-list-group-vue"),S=(0,e.up)("base-songs-list-group-vue"),x=(0,e.up)("base-detail-page-vue");return(0,e.wg)(),(0,e.j4)(x,{image:w.currentPlaylist.cover_image,class:"text-light position-relative"},{default:(0,e.w5)((()=>[(0,e._)("div",o,[(0,e._)("h1",r,(0,i.zw)(w.currentPlaylist.name),1),(0,e._)("p",null,(0,i.zw)(t.$t("k subscribers",{count:34.4})),1),(0,e._)("div",l,[w.store._isPlaying?((0,e.wg)(),(0,e.iD)("button",{key:0,type:"button",class:"btn btn-light shadow-none",onClick:s[0]||(s[0]=(...t)=>w.store.stopPlaylist&&w.store.stopPlaylist(...t))},[(0,e.Wm)(k,{icon:"fa-solid fa-pause"})])):((0,e.wg)(),(0,e.iD)("button",{key:1,type:"button",class:"btn btn-light shadow-none",onClick:s[1]||(s[1]=(...t)=>w.store.playAll&&w.store.playAll(...t))},[(0,e.Wm)(k,{icon:"fa-solid fa-play"})])),(0,e._)("button",c,[(0,e.Wm)(k,{icon:"fa-solid fa-heart-circle-check"})]),(0,e._)("button",u,[(0,e.Wm)(k,{icon:"fa-solid fa-circle-info"})])])])])),content:(0,e.w5)((()=>[(0,e._)("div",d,[(0,e._)("div",g,[(0,e._)("div",p,[(0,e._)("div",f,[(0,e.wy)((0,e._)("input",{"onUpdate:modelValue":s[2]||(s[2]=t=>v.song.attributes=t),placeholder:`Search ${w.currentPlaylist.songs.length} songs...`,type:"text",class:"form-control p-2"},null,8,y),[[a.vModelText,v.song.attributes]]),(0,e._)("div",m,[(0,e.wy)((0,e._)("input",{id:"by-genre","onUpdate:modelValue":s[3]||(s[3]=t=>v.displayByGenre=t),class:"form-check-input",type:"checkbox",role:"switch"},null,512),[[a.vModelCheckbox,v.displayByGenre]]),(0,e._)("label",b,(0,i.zw)(t.$t("Display by genre")),1)])])])]),(0,e._)("div",h,[v.displayByGenre?((0,e.wg)(),(0,e.j4)(P,{key:0,songs:_.searchSongs},null,8,["songs"])):((0,e.wg)(),(0,e.j4)(S,{key:1,songs:_.searchSongs},null,8,["songs"]))])])])),_:1},8,["image"])}var v=n(4806),_=n.n(v),k=n(6378),P=n(3766),S=n(9068),x=n(3583),C=n(450),D={name:"PlaylistView",components:{BaseDetailPageVue:S["default"],BaseCategorizedSongsListGroupVue:C["default"],BaseSongsListGroupVue:x["default"]},setup(){const t=(0,k.K)(),{currentPlaylist:s}=(0,P.Jk)(t);return{store:t,currentPlaylist:s}},data(){return{displayByGenre:!1,song:{attributes:null}}},computed:{searchSongs(){return null===this.song.attributes||""===this.song.attributes?this.currentPlaylist.songs:_().filter(this.currentPlaylist.songs,(t=>t.name.includes(this.song.attributes)||t.album.name.includes(this.song.attributes)||t.album.artist.name.includes(this.song.attributes)))}},created(){this.store.setPlaylist(this.$route.params.id)}},U=n(89);const W=(0,U.Z)(D,[["render",w],["__scopeId","data-v-ecff066a"]]);var z=W}}]);
//# sourceMappingURL=267.93cac714.js.map