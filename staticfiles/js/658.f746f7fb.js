"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[658,583,361],{7823:function(t,n,s){s.d(n,{n:function(){return o}});var e=s(3766);const o=(0,e.Q_)("player",{state:()=>({isPlaying:!1,currentSong:{}}),actions:{play(t){this.currentSong=t,this.isPlaying=!0},pause(){this.isPlaying=!1}},getters:{isCurrentSong(){return t=>t.name===this.currentSong.name}}})},5361:function(t,n,s){s.r(n),s.d(n,{default:function(){return g}});var e=s(3396),o=s(7139);const a={class:"row"},i={class:"col-12"},r={class:"card bg-transparent shadow-none text-muted text-center"},c={class:"card-content"},l={class:"display-5"};function u(t,n,s,u,p,d){const f=(0,e.up)("font-awesome-icon");return(0,e.wg)(),(0,e.iD)("div",a,[(0,e._)("div",i,[(0,e._)("div",r,[(0,e._)("div",c,[(0,e.Wm)(f,{icon:"fa-solid fa-icons",class:"mb-4",size:"5x"}),(0,e._)("h4",l,(0,o.zw)(s.content),1)])])])])}var p={name:"EmptyIteration",props:{content:{type:String,default:"There are no playlists available"}}},d=s(89);const f=(0,d.Z)(p,[["render",u]]);var g=f},181:function(t,n,s){s.r(n),s.d(n,{default:function(){return d}});var e=s(3396);const o={class:"row"},a={key:0,class:"col-12"};function i(t,n,s,i,r,c){const l=(0,e.up)("base-songs-list-group"),u=(0,e.up)("empty-iteration-vue");return(0,e.wg)(),(0,e.iD)("div",o,[c.songs.length>0?((0,e.wg)(),(0,e.iD)("div",a,[(0,e.Wm)(l,{songs:c.songs},null,8,["songs"])])):((0,e.wg)(),(0,e.j4)(u,{key:1,content:"No songs"}))])}var r=s(3583),c=s(5361),l={name:"ListSongs",components:{BaseSongsListGroup:r["default"],EmptyIterationVue:c["default"]},inject:{songs:{default:()=>[]}}},u=s(89);const p=(0,u.Z)(l,[["render",i]]);var d=p},3583:function(t,n,s){s.r(n),s.d(n,{default:function(){return v}});var e=s(3396),o=s(9242),a=s(7139);const i={class:"list-group"},r={class:"d-flex flex-column"},c={class:"btn-group"},l=["onClick"],u={type:"button",class:"btn btn-primary btn-sm"},p={type:"button",class:"btn btn-primary btn-sm"};function d(t,n,s,d,f,g){const m=(0,e.up)("font-awesome-icon"),y=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)("div",i,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(s.songs,(t=>((0,e.wg)(),(0,e.iD)("a",{key:t.id,href:"",class:"list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center",onClick:n[1]||(n[1]=(0,o.withModifiers)((()=>{}),["prevent"]))},[(0,e._)("div",r,[(0,e._)("span",null,[(0,e.Uk)((0,a.zw)(t.name)+" ",1),(0,e.Wm)(m,{icon:"fa-solid fa-e",class:"ms-3"})]),(0,e.Wm)(y,{to:{name:"artist_view",params:{id:"nnoin"}},class:"text-muted text-decoration"},{default:(0,e.w5)((()=>[(0,e.Uk)((0,a.zw)(t.album.artist.name),1)])),_:2},1024)]),(0,e._)("div",c,[d.isPlaying&&d.store.isCurrentSong(t)?((0,e.wg)(),(0,e.iD)("button",{key:0,type:"button",class:"btn btn-primary btn-sm",onClick:n[0]||(n[0]=(...t)=>d.store.pause&&d.store.pause(...t))},[(0,e.Wm)(m,{icon:"fa-solid fa-pause"})])):((0,e.wg)(),(0,e.iD)("button",{key:1,type:"button",class:"btn btn-primary btn-sm",onClick:n=>d.store.play(t)},[(0,e.Wm)(m,{icon:"fa-solid fa-play"})],8,l)),(0,e._)("button",u,[(0,e.Wm)(m,{icon:"fa-solid fa-heart"})]),(0,e._)("button",p,[(0,e.Wm)(m,{icon:"fa-solid fa-ellipsis-vertical"})])])])))),128))])}var f=s(7823),g=s(3766),m={name:"BaseSongsListGroup",props:{songs:{type:Array,default:()=>[]}},setup(){const t=(0,f.n)(),{isPlaying:n}=(0,g.Jk)(t);return{store:t,isPlaying:n}}},y=s(89);const b=(0,y.Z)(m,[["render",d],["__scopeId","data-v-1cc4293f"]]);var v=b}}]);
//# sourceMappingURL=658.f746f7fb.js.map