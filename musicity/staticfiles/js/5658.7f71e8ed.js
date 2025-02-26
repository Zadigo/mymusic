(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[5658,5604,3416,5361],{231:function(t,n,e){"use strict";e.d(n,{O:function(){return a},j:function(){return d}});var o=e(4806),s=e.n(o),i=e(4870),r=e(3396);function a(t,n=(()=>{}),e=(()=>{})){const o=(0,i.iH)(!1);function s(t){const s=t.target;n(t),s.classList.contains("dropdown-header")||s.classList.contains("dropdown-divider")||(s.classList.contains("dropdown-toggle")||(o.value=!1),e(t))}function a(){o.value=!o.value}return(0,r.bv)((()=>{window.addEventListener("click",s)})),(0,r.Jd)((()=>{window.removeEventListener("click",s)})),{show:o,toggleShow:a}}function d(t,n=(()=>{}),e=(()=>{})){const o=t,a=(0,i.iH)([]);function d(t){if(a.value.includes(t)){const n=s().indexOf(a.value,t);a.value.splice(n,1)}else a.value.push(t)}const l=(0,r.Fl)((()=>a.value.map((t=>o[t]))));function c(t,o){n(t),d(o),e(t)}function u(t){return a.value.includes(t)}return{isSelected:u,selected:l,selectedIds:a,selectItem:c}}},7823:function(t,n,e){"use strict";e.d(n,{n:function(){return s}});var o=e(3766);const s=(0,o.Q_)("player",{state:()=>({isPlaying:!1,currentSong:{}}),actions:{play(t){this.currentSong=t,this.isPlaying=!0},pause(){this.isPlaying=!1}},getters:{isCurrentSong(){return t=>t.name===this.currentSong.name}}})},5361:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return w}});var o=e(3396),s=e(7139);const i={class:"row"},r={class:"col-12"},a={class:"card bg-transparent shadow-none text-muted text-center"},d={class:"card-content"},l={class:"display-5"};function c(t,n,e,c,u,p){const f=(0,o.up)("font-awesome-icon");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o._)("div",r,[(0,o._)("div",a,[(0,o._)("div",d,[(0,o.Wm)(f,{icon:"fa-solid fa-icons",class:"mb-4",size:"5x"}),(0,o._)("h4",l,(0,s.zw)(e.content),1)])])])])}var u={name:"EmptyIteration",props:{content:{type:String,default:"There are no playlists available"}}},p=e(89);const f=(0,p.Z)(u,[["render",c]]);var w=f},181:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return p}});var o=e(3396);const s={class:"row"},i={key:0,class:"col-12"};function r(t,n,e,r,a,d){const l=(0,o.up)("base-songs-list-group"),c=(0,o.up)("empty-iteration-vue");return(0,o.wg)(),(0,o.iD)("div",s,[d.songs.length>0?((0,o.wg)(),(0,o.iD)("div",i,[(0,o.Wm)(l,{songs:d.songs},null,8,["songs"])])):((0,o.wg)(),(0,o.j4)(c,{key:1,content:"No songs"}))])}var a=e(5604),d=e(5361),l={name:"ListSongs",components:{BaseSongsListGroup:a["default"],EmptyIterationVue:d["default"]},inject:{songs:{default:()=>[]}}},c=e(89);const u=(0,c.Z)(l,[["render",r]]);var p=u},5604:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return b}});var o=e(3396),s=e(9242),i=e(7139);const r={class:"list-group"},a={class:"d-flex flex-column"},d={class:"btn-group"},l=["onClick"],c={type:"button",class:"btn btn-primary btn-sm"};function u(t,n,e,u,p,f){const w=(0,o.up)("font-awesome-icon"),g=(0,o.up)("router-link"),m=(0,o.up)("base-dropdown-button");return(0,o.wg)(),(0,o.iD)("div",r,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.songs,(t=>((0,o.wg)(),(0,o.iD)("a",{key:t.id,href:"",class:"list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center",onClick:n[1]||(n[1]=(0,s.withModifiers)((()=>{}),["prevent"]))},[(0,o._)("div",a,[(0,o._)("span",null,[(0,o.Uk)((0,i.zw)(t.name)+" ",1),(0,o.Wm)(w,{icon:"fa-solid fa-e",class:"ms-3"})]),(0,o.Wm)(g,{to:{name:"artist_view",params:{id:t.album.artist.id}},class:"text-muted text-decoration"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(t.album.artist.name),1)])),_:2},1032,["to"])]),(0,o._)("div",d,[u.isPlaying&&u.store.isCurrentSong(t)?((0,o.wg)(),(0,o.iD)("button",{key:0,type:"button",class:"btn btn-primary btn-sm",onClick:n[0]||(n[0]=(...t)=>u.store.pause&&u.store.pause(...t))},[(0,o.Wm)(w,{icon:"fa-solid fa-pause"})])):((0,o.wg)(),(0,o.iD)("button",{key:1,type:"button",class:"btn btn-primary btn-sm",onClick:n=>u.store.play(t)},[(0,o.Wm)(w,{icon:"fa-solid fa-play"})],8,l)),(0,o._)("button",c,[(0,o.Wm)(w,{icon:"fa-solid fa-heart"})]),(0,o.Wm)(m,{id:"options",items:[{name:"Google"}],size:"sm"})])])))),128))])}var p=e(7823),f=e(3766),w=e(3416),g={name:"BaseSongsListGroup",components:{BaseDropdownButton:w["default"]},props:{songs:{type:Array,default:()=>[]}},setup(){const t=(0,p.n)(),{isPlaying:n}=(0,f.Jk)(t);return{store:t,isPlaying:n}}},m=e(867),h=e.n(m),y=e(89);"function"===typeof h()&&h()(g);const v=(0,y.Z)(g,[["render",u],["__scopeId","data-v-37e96fff"]]);var b=v},3416:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return y}});var o=e(3396),s=e(7139),i=e(9242);const r={ref:"link",class:"dropdown"},a=["id","aria-expanded"],d=["aria-labelledby"],l={key:0,class:"dropdown-header rounded-2"},c={key:1,class:"dropdown-divider"},u=["onClick"];function p(t,n,e,p,f,w){const g=(0,o.up)("font-awesome-icon");return(0,o.wg)(),(0,o.iD)("div",r,[(0,o._)("button",{id:e.id,class:(0,s.C_)([w.buttonClasses,"btn dropdown-toggle"]),"aria-expanded":p.show,type:"button",onClick:n[0]||(n[0]=(...t)=>p.toggleShow&&p.toggleShow(...t))},[e.icon?((0,o.wg)(),(0,o.j4)(g,{key:0,icon:`fa-solid fa-${t.item.icon}`,class:"me-2"},null,8,["icon"])):(0,o.kq)("",!0),(0,o.Uk)(" "+(0,s.zw)(e.buttonName),1)],10,a),(0,o.Wm)(i.Transition,{name:e.animation,mode:"in-out"},{default:(0,o.w5)((()=>[p.show?((0,o.wg)(),(0,o.iD)("ul",{key:0,class:(0,s.C_)([{show:p.show,"dropdown-menu-dark":p.darkMode},"dropdown-menu p-2"]),"aria-labelledby":e.id},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.items,((t,n)=>((0,o.wg)(),(0,o.iD)("li",{key:t.name},[t.header?((0,o.wg)(),(0,o.iD)("h6",l,(0,s.zw)(t.name),1)):t.divider?((0,o.wg)(),(0,o.iD)("hr",c)):((0,o.wg)(),(0,o.iD)("a",{key:2,class:(0,s.C_)([e.showActive&&f.selected===n?"active":null,"dropdown-item rounded-2"]),href:"",onClick:(0,i.withModifiers)((e=>w.dropdownClick(n,t)),["prevent"])},[t.icon?((0,o.wg)(),(0,o.j4)(g,{key:0,icon:`fa-solid fa-${t.icon}`,class:"me-2"},null,8,["icon"])):(0,o.kq)("",!0),(0,o.Uk)((0,s.zw)(t.name),1)],10,u))])))),128))],10,d)):(0,o.kq)("",!0)])),_:1},8,["name"])],512)}var f=e(4870),w=e(231),g={name:"BaseDropdownButton",props:{animation:{type:String,default:"slideup"},buttonName:{type:String},color:{type:String,default:"primary"},id:{type:String},icon:{type:String},items:{type:Array,required:!0},showActive:{type:Boolean},size:{type:String,default:"md"}},emits:{"dropdown-click"(){return!0},"dropdown-closed"(){return!0},"dropdown-opened"(){return!0}},setup(){const t=(0,f.iH)(null),{show:n,toggleShow:e}=(0,w.O)(t),s=(0,o.f3)("darkMode",!1),i=0;return{buttonWidth:i,darkMode:s,show:n,target:t,toggleShow:e}},data(){return{selected:0}},computed:{buttonClasses(){return[this.show?"show":null,{[`btn-${this.size}`]:!0,[`btn-${this.color}`]:!0}]}},watch:{show(t){t?this.$emit("dropdown-opened"):this.$emit("dropdown-closed")}},mounted(){this.target=this.$refs.link,this.buttonWidth=this.$refs.link.offsetWidth},methods:{dropdownClick(t,n){this.selected=t,this.toggleShow(),this.$emit("dropdown-click",[t,n])}}},m=e(89);const h=(0,m.Z)(g,[["render",p],["__scopeId","data-v-dbfbf7f2"]]);var y=h},867:function(){}}]);
//# sourceMappingURL=5658.7f71e8ed.js.map