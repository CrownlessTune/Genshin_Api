import{r as t,j as e,a as N}from"./index-CST-u42E.js";const F=()=>{const[c,y]=t.useState([]),[C,x]=t.useState([]),[S,w]=t.useState(!0),[j,E]=t.useState(null),[o,m]=t.useState({vision:"",weapon:"",rarity:"",nation:""}),[I,u]=t.useState({}),p=t.useRef(null);t.useEffect(()=>{const n=JSON.parse(localStorage.getItem("filters"));n&&m(n)},[]),t.useEffect(()=>{(async()=>{try{const a=await N.get("https://genshin.jmp.blue/characters/all?lang=en");y(a.data),x(a.data)}catch(a){E(a.message)}finally{w(!1)}})()},[]),t.useEffect(()=>{(()=>{const{vision:a,weapon:s,rarity:r,nation:i}=o,l=c.filter(h=>{var g,v,f;return(!a||((g=h.vision)==null?void 0:g.toLowerCase())===a.toLowerCase())&&(!s||((v=h.weapon)==null?void 0:v.toLowerCase())===s.toLowerCase())&&(!r||h.rarity===parseInt(r))&&(!i||((f=h.nation)==null?void 0:f.toLowerCase())===i.toLowerCase())});x(l)})()},[o,c]);const d=n=>{const{name:a,value:s}=n.target,r={...o,[a]:s};m(r),localStorage.setItem("filters",JSON.stringify(r))},L=n=>{const a=localStorage.getItem(`character_${n.id}`);if(a){u(l=>({...l,[n.id]:a}));return}const s=`https://genshin.jmp.blue/characters/${n.id}/card`,r=`https://genshin.jmp.blue/characters/${n.name.toLowerCase().replace(/\s+/g,"-")}/card`,i=new Image;i.onload=()=>{localStorage.setItem(`character_${n.id}`,s),u(l=>({...l,[n.id]:s}))},i.onerror=()=>{localStorage.setItem(`character_${n.id}`,r),u(l=>({...l,[n.id]:r}))},i.src=s};return t.useEffect(()=>{c.forEach(n=>{L(n)})},[c]),t.useEffect(()=>{const n=()=>{const s=p.current;s.scrollTop+s.clientHeight>=s.scrollHeight-50&&console.log("Reached the end of the scroll")},a=p.current;return a&&a.addEventListener("scroll",n),()=>{a&&a.removeEventListener("scroll",n)}},[]),S?e.jsx("p",{children:"Loading..."}):j?e.jsxs("p",{children:["Error: ",j]}):e.jsxs("main",{className:"character-search-container",children:[e.jsx("header",{children:e.jsx("h1",{children:"Characters"})}),e.jsxs("section",{className:"filters","aria-label":"Filter options",children:[e.jsxs("label",{children:["Vision:",e.jsxs("select",{name:"vision",onChange:d,value:o.vision,children:[e.jsx("option",{value:"",children:"All"}),e.jsx("option",{value:"Pyro",children:"Pyro"}),e.jsx("option",{value:"Hydro",children:"Hydro"}),e.jsx("option",{value:"Cryo",children:"Cryo"}),e.jsx("option",{value:"Electro",children:"Electro"}),e.jsx("option",{value:"Anemo",children:"Anemo"}),e.jsx("option",{value:"Geo",children:"Geo"}),e.jsx("option",{value:"Dendro",children:"Dendro"})]})]}),e.jsxs("label",{children:["Weapon:",e.jsxs("select",{name:"weapon",onChange:d,value:o.weapon,children:[e.jsx("option",{value:"",children:"All"}),e.jsx("option",{value:"Sword",children:"Sword"}),e.jsx("option",{value:"Claymore",children:"Claymore"}),e.jsx("option",{value:"Polearm",children:"Polearm"}),e.jsx("option",{value:"Bow",children:"Bow"}),e.jsx("option",{value:"Catalyst",children:"Catalyst"})]})]}),e.jsxs("label",{children:["Rarity:",e.jsxs("select",{name:"rarity",onChange:d,value:o.rarity,children:[e.jsx("option",{value:"",children:"All"}),e.jsx("option",{value:"4",children:"4 Stars"}),e.jsx("option",{value:"5",children:"5 Stars"})]})]}),e.jsxs("label",{children:["Nation:",e.jsxs("select",{name:"nation",onChange:d,value:o.nation,children:[e.jsx("option",{value:"",children:"All"}),e.jsx("option",{value:"Mondstadt",children:"Mondstadt"}),e.jsx("option",{value:"Liyue",children:"Liyue"}),e.jsx("option",{value:"Inazuma",children:"Inazuma"}),e.jsx("option",{value:"Sumeru",children:"Sumeru"}),e.jsx("option",{value:"Fontaine",children:"Fontaine"}),e.jsx("option",{value:"Natlan",children:"Natlan"}),e.jsx("option",{value:"Snezhnaya",children:"Snezhnaya"}),e.jsx("option",{value:"Khaenri'ah",children:"Khaenri'ah"})]})]})]}),e.jsx("section",{className:"characters-grid",ref:p,style:{maxHeight:"400px",overflowY:"auto"},"aria-label":"Character results",children:e.jsx("ul",{style:{listStyle:"none",margin:0,padding:0},children:C.map(n=>e.jsx("li",{className:"character-card",children:e.jsxs("article",{children:[e.jsx("h2",{children:n.name}),e.jsx("img",{src:I[n.id],alt:`Image of ${n.name}`,className:"character-image"}),e.jsxs("p",{children:["Vision: ",n.vision]}),e.jsxs("p",{children:["Weapon: ",n.weapon]}),e.jsxs("p",{children:["Rarity: ",n.rarity," Stars"]}),e.jsxs("p",{children:["Region: ",n.nation]})]})},n.id))})})]})};export{F as default};