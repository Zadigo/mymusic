"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[520,310,361],{9255:function(t,e,n){n.d(e,{J_:function(){return a},sk:function(){return r}});n(1703),n(4806);function r(t){return new Promise((e=>setTimeout(e,t)))}function a(){function t(t){var e=new URL(t,window.location.href);return e.toString()}function e(t){var e={NODE_ENV:"production",BASE_URL:"/"}.rootUrl||"http://127.0.0.1:8000";return new URL(t,e).toString()}function n(t,e=100,n=0){let r=100,a=0;if(t){const s=new URL(t),c=s.searchParams.get("limit"),o=s.searchParams.get("offset");r=c||e,a=o||n}return new URLSearchParams({limit:r,offset:a})}function r(t,e=1){let n=1;if(t){const r=new URL(t),a=r.searchParams.get("page");n=a||e}return new URLSearchParams({page:n})}return{buildLimitOffset:n,getPageFromParams:r,mediaUrl:e,rebuildPath:t}}},9761:function(t,e,n){n.d(e,{R:function(){return a}});var r=n(3766);const a=(0,r.Q_)("search",{state:()=>({currentSearch:null,currentArtist:{},currentAlbum:{}}),actions:{},getters:{searchHistory(){return[]}}})},5361:function(t,e,n){n.r(e),n.d(e,{default:function(){return g}});var r=n(3396),a=n(7139);const s={class:"row"},c={class:"col-12"},o={class:"card bg-transparent shadow-none text-muted text-center"},i={class:"card-content"},u={class:"display-5"};function l(t,e,n,l,d,f){const m=(0,r.up)("font-awesome-icon");return(0,r.wg)(),(0,r.iD)("div",s,[(0,r._)("div",c,[(0,r._)("div",o,[(0,r._)("div",i,[(0,r.Wm)(m,{icon:"fa-solid fa-icons",class:"mb-4",size:"5x"}),(0,r._)("h4",u,(0,a.zw)(n.content),1)])])])])}var d={name:"EmptyIteration",props:{content:{type:String,default:"There are no playlists available"}}},f=n(89);const m=(0,f.Z)(d,[["render",l]]);var g=m},1520:function(t,e,n){n.r(e),n.d(e,{default:function(){return b}});var r=n(3396),a=n(9242),s=n(7139);const c=t=>((0,r.dD)("data-v-75787646"),t=t(),(0,r.Cn)(),t),o=["onClick"],i=["src","alt"],u={class:"card-body"},l={class:"card-title fw-bold"},d=c((()=>(0,r._)("p",{class:"card-text"},"2015",-1)));function f(t,e,n,c,f,m){const g=(0,r.up)("scrollable-cards-vue"),p=(0,r.up)("empty-iteration-vue");return m.albums.length>0?((0,r.wg)(),(0,r.j4)(g,{key:0},{default:(0,r.w5)((()=>[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(m.albums,(t=>((0,r.wg)(),(0,r.iD)("article",{key:t.id,class:"card bg-dark mx-2"},[(0,r._)("a",{href:"",class:"text-light",onClick:(0,a.withModifiers)((e=>m.goToPage(t)),["prevent"])},[(0,r._)("img",{src:c.mediaUrl(t.cover_image_thumbnail),alt:t.artist.name,class:"card-img-top"},null,8,i),(0,r._)("div",u,[(0,r._)("h6",l,(0,s.zw)(t.name),1),d])],8,o)])))),128))])),_:1})):((0,r.wg)(),(0,r.j4)(p,{key:1,content:"No albums"}))}var m=n(9255),g=n(6310),p=n(9761),v=n(5361),h={name:"ListAlbums",components:{ScrollableCardsVue:g["default"],EmptyIterationVue:v["default"]},inject:{albums:{default:()=>[]}},setup(){const{mediaUrl:t}=(0,m.J_)(),e=(0,p.R)();return{mediaUrl:t,store:e}},methods:{goToPage(t){this.store.currentAlbum=t,this.$router.push({name:"album_view",params:{id:"4AcFhqecUgQOUNmdcdngEq"}})}}},w=n(89);const _=(0,w.Z)(h,[["render",f],["__scopeId","data-v-75787646"]]);var b=_},6310:function(t,e,n){n.r(e),n.d(e,{default:function(){return l}});var r=n(3396);const a={class:"row"},s={class:"wrapper"};function c(t,e){return(0,r.wg)(),(0,r.iD)("div",a,[(0,r._)("div",s,[(0,r.WI)(t.$slots,"default",{},void 0,!0)])])}var o=n(89);const i={},u=(0,o.Z)(i,[["render",c],["__scopeId","data-v-1424d073"]]);var l=u}}]);
//# sourceMappingURL=520.f8f15485.js.map