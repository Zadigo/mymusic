"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[450],{7823:function(t,n,s){s.d(n,{n:function(){return e}});var i=s(3766);const e=(0,i.Q_)("player",{state:()=>({isPlaying:!1,currentSong:{}}),actions:{play(t){this.currentSong=t,this.isPlaying=!0},pause(){this.isPlaying=!1}},getters:{isCurrentSong(){return t=>t.name===this.currentSong.name}}})},450:function(t,n,s){s.r(n),s.d(n,{default:function(){return k}});var i=s(3396),e=s(7139),a=s(9242);const o={class:"list-group"},r={class:"d-flex flex-column"},l={class:"btn-group"},c=["onClick"],u={type:"button",class:"btn btn-primary btn-sm"},g={type:"button",class:"btn btn-primary btn-sm"};function p(t,n,s,p,f,d){const m=(0,i.up)("font-awesome-icon"),h=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("div",o,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(f.titles,(t=>((0,i.wg)(),(0,i.iD)("div",{key:t},[(0,i._)("h3",null,(0,e.zw)(t),1),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(f.classification[t],(t=>((0,i.wg)(),(0,i.iD)("a",{key:t.id,href:"",class:"list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center",onClick:n[1]||(n[1]=(0,a.withModifiers)((()=>{}),["prevent"]))},[(0,i._)("div",r,[(0,i._)("span",null,[(0,i.Uk)((0,e.zw)(t.name)+" ",1),(0,i.Wm)(m,{icon:"fa-solid fa-e",class:"ms-3"})]),(0,i.Wm)(h,{to:{name:"artist_view",params:{id:"nnoin"}},class:"text-muted text-decoration"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,e.zw)(t.album.artist.name),1)])),_:2},1024)]),(0,i._)("div",l,[p.isPlaying&&p.store.isCurrentSong(t)?((0,i.wg)(),(0,i.iD)("button",{key:0,type:"button",class:"btn btn-primary btn-sm",onClick:n[0]||(n[0]=(...t)=>p.store.pause&&p.store.pause(...t))},[(0,i.Wm)(m,{icon:"fa-solid fa-pause"})])):((0,i.wg)(),(0,i.iD)("button",{key:1,type:"button",class:"btn btn-primary btn-sm",onClick:n=>p.store.play(t)},[(0,i.Wm)(m,{icon:"fa-solid fa-play"})],8,c)),(0,i._)("button",u,[(0,i.Wm)(m,{icon:"fa-solid fa-heart"})]),(0,i._)("button",g,[(0,i.Wm)(m,{icon:"fa-solid fa-ellipsis-vertical"})])])])))),128))])))),128))])}var f=s(4806),d=s.n(f),m=s(7823),h=s(3766),b={name:"BaseCategorizedSongsListGroup",props:{songs:{type:Array,default:()=>[]}},setup(){const t=(0,m.n)(),{isPlaying:n}=(0,h.Jk)(t);return{store:t,isPlaying:n}},data(){return{titles:[],classification:{}}},watch:{songs(){this.categorizeSongs()}},created(){this.categorizeSongs()},methods:{categorizeSongs(){d().forEach(this.songs,(t=>{this.titles.push(t.genre),this.classification[t.genre]=[]})),this.titles=d().uniq(this.titles),d().forEach(this.songs,(t=>{this.classification[t.genre].push(t)}))}}},y=s(89);const w=(0,y.Z)(b,[["render",p],["__scopeId","data-v-5a06c1c1"]]);var k=w}}]);
//# sourceMappingURL=450.b4c27e7a.js.map