import{a as w,b as y,z as k,r as c,A as E,o as h,f as m,i as e,u as I,t as n,F as B,m as C,k as A,l as _}from"./entry.9b3788d3.mjs";const L={class:""},S={class:"relative flex items-center bg-white py-4 shadow-lg"},j=["href"],N=_("Back to show "),R=e("svg",{"aria-hidden":"true",class:"ml-2 -mr-1 w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1),T=[N,R],z={class:"absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-xl"},$={class:"relative mx-auto flex items-center justify-center md:mt-20 bg-slate-900"},F=["src"],M={class:"absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white"},V=e("br",null,null,-1),D=e("br",null,null,-1),H={class:"flex flex-col items-center justify-center"},O={class:"flex justify-center items-center h-5"},q=e("span",null," Rating: \xA0",-1),G=e("svg",{"aria-hidden":"true",class:"w-5 h-5 text-yellow-400",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("title",null,"Rating star"),e("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"})],-1),J={class:"mt-2"},K={class:"w-[95%] md:w-[70%] sm:w-[80%] mt-3 md:mt-5 text-center bg-white py-4 px-5 shadow-xl border-t-2 border-b-2 border-slate-400"},U=w({__name:"index",setup(P){const f=y(),v=k(),i=c([]),a=c({id:"",image:{medium:""},summary:"",season:"",number:0,rating:{average:0}}),g=c({name:""}),u=c(localStorage.getItem("Tv-episodes_latestEpisodeId"));let o=1;const r=document.getElementsByClassName("slide"),p=()=>{u.value=localStorage.getItem("Tv-episodes_latestEpisodeId"),a.value=i.value.find(l=>l.id===Number(u.value))};E(async()=>{const t=await(await fetch(`${f.apiBase}/shows/${v.path.split("/")[2]}?embed=episodes`)).json();g.value=t,i.value=t._embedded.episodes,p(),o=i.value.indexOf(a.value)+1,addEventListener("keyup",s=>{if(s.key==="ArrowRight")d(1);else if(s.key==="ArrowLeft")d(-1);else return})});const d=l=>{x(o+=l),localStorage.setItem("Tv-episodes_latestEpisodeId",i.value[o-1].id),p()},x=l=>{let t;for(l>r.length&&(o=1),l<1&&(o=r.length),t=0;t<r.length;t++)r[t].classList.add("hidden");r[o-1].classList.remove("hidden")};return(l,t)=>(h(),m("div",L,[e("header",S,[e("a",{href:"/show/"+I(v).path.split("/")[2],class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer h-10 ml-5"},T,8,j),e("h1",z,n(g.value.name),1)]),e("main",null,[e("div",$,[(h(!0),m(B,null,C(i.value,s=>{var b;return h(),m("div",{class:A(s.id===Number(u.value)?"slide relative bg-green-500 ":"slide relative hidden"),key:s.id},[e("img",{class:"w-full h-[300px] object-cover",src:(b=s.image)==null?void 0:b.medium},null,8,F),e("div",M,[_(n(s.name)+" ",1),V])],2)}),128)),e("a",{class:"absolute left-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer select-none",onClick:t[0]||(t[0]=s=>d(-1))}," \u276E "),e("a",{class:"absolute right-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer select-none",onClick:t[1]||(t[1]=s=>d(1))},"\u276F")]),D,e("div",H,[e("div",O,[q,G,e("span",null,n(a.value.rating.average),1)]),e("div",J," Season: \xA0"+n(a.value.season)+" \xA0 Episode: \xA0 "+n(a.value.number),1),e("p",K,n(a.value.summary.slice(3,-4)),1)])])]))}});export{U as default};
