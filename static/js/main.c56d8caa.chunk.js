(this["webpackJsonppathfinding-visualizer-react"]=this["webpackJsonppathfinding-visualizer-react"]||[]).push([[0],{39:function(t,e,n){},46:function(t,e,n){"use strict";n.r(e);var o,a=n(0),i=n.n(a),r=n(11),c=n.n(r),s=(n(39),n(5)),u=n(59),l=n(61),d=n(62),f=n(23),h=n.n(f),j=n(63),v=n(24);function b(t,e,n){var o=[e],a=[];for(e.distance=0;o.length;){var i=r(o);if(i===n)return a;i.isVisited=!0,a.push(i),c(i)}return a;function r(t){return t.sort((function(t,e){return t.distance-e.distance})),t.shift()}function c(e){var n,a=function(e){var n=[],o=e.i,a=e.j;o>0&&n.push(t[o-1][a]);o<t.length-1&&n.push(t[o+1][a]);a>0&&n.push(t[o][a-1]);a<t[0].length-1&&n.push(t[o][a+1]);return n.filter((function(t){return!t.isWall()&&!t.isVisited}))}(e),i=Object(v.a)(a);try{for(i.s();!(n=i.n()).done;){var r=n.value;r.distance=e.distance+1,r.prevNode=e,o.includes(r)||o.push(r)}}catch(c){i.e(c)}finally{i.f()}}}!function(t){t[t.Default=0]="Default",t[t.Start=1]="Start",t[t.End=2]="End",t[t.Wall=3]="Wall"}(o||(o={}));var p=n(25),g=n(26),O=function(){function t(e,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o.Default,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1/0,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,c=arguments.length>5&&void 0!==arguments[5]&&arguments[5];Object(p.a)(this,t),this.i=e,this.j=n,this.nodeType=a,this.distance=i,this.prevNode=r,this.isVisited=c}return Object(g.a)(t,[{key:"reset",value:function(){this.distance=1/0,this.prevNode=null,this.isVisited=!1}},{key:"isStartOrEnd",value:function(){return this.nodeType===o.Start||this.nodeType===o.End}},{key:"isWall",value:function(){return this.nodeType===o.Wall}},{key:"setWall",value:function(){this.nodeType=o.Wall}},{key:"clearWall",value:function(){this.nodeType=o.Default}}]),t}(),w=function(t,e,n,i,r,c,u){var l=Object(a.useState)(!1),d=Object(s.a)(l,2),f=d[0],h=d[1],j=Object(a.useState)(!1),v=Object(s.a)(j,2),b=v[0],p=v[1],g=Object(a.useState)(!1),w=Object(s.a)(g,2),m=w[0],x=w[1],y=Object(a.useState)(!1),M=Object(s.a)(y,2),E=M[0],T=M[1],C=function(e,n){t[e][n].isStartOrEnd()||(E?S(e,n):W(e,n))},S=function(e,n){var o=t.slice();o[e][n].setWall(),i(o)},W=function(e,n){var o=t.slice();o[e][n].clearWall(),i(o)};return{handleMouseDown:function(e,n){h(!0),T(t[e][n].nodeType!==o.Wall),t[e][n].nodeType===o.Start?p(!0):t[e][n].nodeType===o.End?x(!0):C(e,n)},handleMouseEnter:function(a,s){f&&(b?function(n,a){var c=t.slice();c[e.i][e.j]=new O(e.i,e.j),c[n][a]=new O(n,a,o.Start),i(c),r({i:n,j:a})}(a,s):m?function(e,a){var r=t.slice();r[n.i][n.j]=new O(n.i,n.j),r[e][a]=new O(e,a,o.End),i(r),c({i:e,j:a})}(a,s):C(a,s))},handleMouseUp:function(e,n){h(!1),T(!1),(b||m)&&u(),p(!1),x(!1),T(t[e][n].nodeType!==o.Wall)}}},m=n(2),x=Object(u.a)((function(t){return{item:function(t){return{border:"1px solid lightgray",gridRow:"".concat(t.i+1),gridCol:"".concat(t.j+1),backgroundColor:"".concat(t.vertex.nodeType===o.Start?"green":t.vertex.nodeType===o.End?"red":"")}},wall:{backgroundColor:"black"}}}));var y=function(t){var e=x(t);Object(a.useEffect)((function(){t.nodeRef.current.addEventListener("touchstart",n,{passive:!1})}),[]);var n=function(e){e.preventDefault(),t.handleMouseDown(t.i,t.j)},i=t.vertex.nodeType===o.Wall?e.wall:"";return Object(m.jsx)("div",{className:"".concat(e.item," ").concat(i),ref:t.nodeRef,"data-i":t.i,"data-j":t.j,title:"".concat(t.i,", ").concat(t.j),onMouseDown:function(){t.handleMouseDown(t.i,t.j)},onMouseEnter:function(){t.handleMouseEnter(t.i,t.j)},onMouseUp:function(){t.handleMouseUp(t.i,t.j)},onTouchMove:function(e){var n=e.changedTouches[0],o=n.pageX-window.pageXOffset,a=n.pageY-window.pageYOffset,i=document.elementFromPoint(o,a),r=Number(i.dataset.i),c=Number(i.dataset.j);t.handleMouseEnter(r,c)},onTouchEnd:function(e){t.handleMouseUp(t.i,t.j)}})},M=Object(u.a)((function(t){return{container:function(t){return{display:"grid",gridTemplateRows:"repeat(".concat(t.nRows,", 20px)"),gridTemplateColumns:"repeat(".concat(t.nCols,", 20px)"),justifyContent:"center",margin:"20px auto",touchAction:"none"}},visited:{backgroundColor:"lightgreen"},shortestPath:{backgroundColor:"yellow"},buttons:{display:"flex",justifyContent:"center",width:"100%",margin:"10px auto"}}}));var E=function(t){var e,n=M(t),i=(e=t).nRows<e.nCols?[{i:Math.trunc(e.nRows/2),j:Math.trunc(e.nCols/5)},{i:Math.trunc(e.nRows/2),j:Math.trunc(4*e.nCols/5)-1}]:[{j:Math.trunc(e.nCols/2),i:Math.trunc(e.nRows/5)},{j:Math.trunc(e.nCols/2),i:Math.trunc(4*e.nRows/5)-1}],r=Object(a.useState)(i[0]),c=Object(s.a)(r,2),u=c[0],l=c[1],d=Object(a.useState)(i[1]),f=Object(s.a)(d,2),h=f[0],v=f[1],p=Array.from({length:t.nRows},(function(e){return Array.from({length:t.nCols},(function(t){return Object(a.createRef)()}))})),g=Object(a.useState)(p),x=Object(s.a)(g,1)[0],E=Array.from({length:t.nRows},(function(e,n){return Array.from({length:t.nCols},(function(t,e){var a=function(t,e,n,a){return t===n.i&&e===n.j?o.Start:t===a.i&&e===a.j?o.End:o.Default}(n,e,u,h);return new O(n,e,a)}))})),T=Object(a.useState)(E),C=Object(s.a)(T,2),S=C[0],W=C[1],k=function(){x.forEach((function(t,e){return t.forEach((function(t,o){var a;S[e][o].reset(),null===(a=t.current)||void 0===a||a.classList.remove(n.visited,n.shortestPath)}))}))},D=function(t){x.forEach((function(e,n){return e.forEach((function(e,o){S[n][o].isStartOrEnd()||(Math.random()<t?S[n][o].setWall():S[n][o].clearWall())}))})),k(),l({i:u.i,j:u.j})};Object(a.useEffect)((function(){D(.32)}),[]);var R=w(S,u,h,W,l,v,k),N=function(t,e){for(var o=function(o){if(setTimeout((function(){var e=t[o];x[e.i][e.j].current.classList.add(n.visited)}),10*o),o===t.length-2)return setTimeout((function(){L(e)}),10*o),{v:void 0}},a=1;a<t.length-1;a++){var i=o(a);if("object"===typeof i)return i.v}},L=function(t){for(var e=function(e){setTimeout((function(){var o=t[e];x[o.i][o.j].current.classList.add(n.shortestPath)}),50*e)},o=1;o<t.length-1;o++)e(o)};return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{className:n.buttons,children:[Object(m.jsx)(j.a,{variant:"contained",style:{textTransform:"none"},onClick:function(){return D(.32)},children:"Random Wall"}),Object(m.jsx)(j.a,{variant:"contained",style:{textTransform:"none"},onClick:function(){return D(0)},children:"Clear Wall"})]}),Object(m.jsx)(j.a,{variant:"contained",style:{textTransform:"none"},onClick:function(){k();var t=S[u.i][u.j],e=S[h.i][h.j],n=b(S,t,e),o=function(t){for(var e=[t];t.prevNode;)e.unshift(t.prevNode),t=t.prevNode;return e}(e);N(n,o)},children:"Visualize Dijkstra's Algorithm"}),Object(m.jsx)("div",{className:n.container,children:x.map((function(t,e){return t.map((function(t,n){return Object(m.jsx)(y,{i:e,j:n,nodeRef:t,vertex:S[e][n],handleMouseDown:R.handleMouseDown,handleMouseEnter:R.handleMouseEnter,handleMouseUp:R.handleMouseUp},"node-".concat(e,"-").concat(n))}))}))})]})},T=function(){var t=Object(a.useState)({width:void 0,height:void 0}),e=Object(s.a)(t,2),n=e[0],o=e[1];return Object(a.useEffect)((function(){function t(){o({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",t),t(),function(){return window.removeEventListener("resize",t)}}),[]),n},C=Object(u.a)((function(t){return{paper:{flexGrow:1,maxWidth:1e3,margin:"30px auto",padding:"20px ".concat(t.spacing(5),"px"),textAlign:"center"},start:{color:"green",fontWeight:"bold"},end:{color:"red",fontWeight:"bold"},wall:{color:"black",fontWeight:"bold"}}}));var S=function(){var t=C(),e="https://github.com/kenfj/pathfinding-visualizer-react",n=T(),o=n.width,i=n.height,r=Object(a.useState)(0),c=Object(s.a)(r,2),u=c[0],f=c[1],j=Object(a.useState)(0),v=Object(s.a)(j,2),b=v[0],p=v[1];return Object(a.useEffect)((function(){void 0===o||void 0===i?console.log("Device undefined"):o>=700?(console.log("Device PC"),f(Math.trunc(i/20*.6)),p(Math.min(Math.trunc(o/20*.7),50))):(console.log("Device SmartPhone"),f(Math.trunc(i/20*.7)),p(Math.trunc(o/20*.9)))}),[o,i]),console.log("[w: ".concat(o,", h: ").concat(i,"], [rows: ").concat(u,", cols: ").concat(b,"]")),Object(m.jsxs)(l.a,{elevation:5,className:t.paper,children:[Object(m.jsx)(h.a,{href:e}),Object(m.jsx)("h1",{children:"Pathfinding Visualizer"}),Object(m.jsxs)(d.a,{variant:"body1",gutterBottom:!0,children:["Click to create ",Object(m.jsx)("span",{className:t.wall,children:"WALL"}),Object(m.jsx)("br",{}),"Drag ",Object(m.jsx)("span",{className:t.start,children:"START"})," and ",Object(m.jsx)("span",{className:t.end,children:"END"})]}),Object(m.jsx)(E,{nRows:u,nCols:b},u),Object(m.jsxs)(d.a,{variant:"caption",display:"block",gutterBottom:!0,children:["source code: ",Object(m.jsx)("a",{href:e,children:e})]})]})},W=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,65)).then((function(e){var n=e.getCLS,o=e.getFID,a=e.getFCP,i=e.getLCP,r=e.getTTFB;n(t),o(t),a(t),i(t),r(t)}))};c.a.render(Object(m.jsx)(i.a.StrictMode,{children:Object(m.jsx)(S,{})}),document.getElementById("root")),W()}},[[46,1,2]]]);
//# sourceMappingURL=main.c56d8caa.chunk.js.map