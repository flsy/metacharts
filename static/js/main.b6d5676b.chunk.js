(this.webpackJsonpmetacharts=this.webpackJsonpmetacharts||[]).push([[0],{111:function(t,e,n){},112:function(t,e,n){},113:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(53),o=n.n(i),l=n(11),c=n(4),s=n(5),u=n(13),d=n(25),h=function(t){var e=t.children,n=t.title,a=t.settings,i=t.data,o=r.a.useState(a),l=Object(c.a)(o,2),s=l[0],h=l[1],f=r.a.useState(i),m=Object(c.a)(f,2),v=m[0],p=m[1],x=r.a.useState(!1),g=Object(c.a)(x,2),b=g[0],y=g[1];return r.a.createElement("div",{style:{margin:"20px 0"}},r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},r.a.createElement("div",null,r.a.createElement("h2",null,n),Object.keys(s).map((function(t){var e="".concat(n,"=").concat(t);return"number"===typeof s[t]?r.a.createElement("div",{key:"".concat(e,"-key")},r.a.createElement("input",{type:"checkbox",id:e,checked:!!s[t],onChange:function(e){var n=e.target;return h(Object(d.a)({},s,Object(u.a)({},t,n.checked?a[t]:0)))}}),r.a.createElement("label",{htmlFor:e},t,": "),0!==s[t]&&r.a.createElement("input",{type:"number",id:e,value:s[t],onChange:function(e){var n=e.target;return h(Object(d.a)({},s,Object(u.a)({},t,parseInt(n.value,10))))}})):r.a.createElement("div",{key:"".concat(e,"-key")},r.a.createElement("input",{type:"checkbox",id:e,checked:s[t],onChange:function(e){var n=e.target;return h(Object(d.a)({},s,Object(u.a)({},t,n.checked)))}}),r.a.createElement("label",{htmlFor:e},t))}))),r.a.createElement("div",null,e(s,v)),r.a.createElement("div",null,r.a.createElement("textarea",{style:{height:"100%"},rows:10,cols:50,onChange:function(t){try{var e=JSON.parse(t.target.value);p(e),y(!1)}catch(n){y(!0)}},defaultValue:JSON.stringify(i,null,2)}),r.a.createElement("div",null,b&&r.a.createElement("span",null,"invalid JSON")))))},f=(n(111),[{label:"male",value:30,colour:"#88BB88"},{label:"female",value:60,colour:"#8888CC"},{label:"unknown",value:10,colour:"#AA8888"}]),m=function(){var t=r.a.useState([]),e=Object(c.a)(t,2),n=e[0],a=e[1];return r.a.createElement(h,{title:"Donut chart",settings:{customValueFormat:!0,filterable:!0,maxTableRows:!1},data:f},(function(t,e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.DonutChart,{width:300,height:300,data:e,filters:t.filterable?n:void 0,onFilter:t.filterable?function(t){return function(t){n.find((function(e){return e===t}))?a(n.filter((function(e){return e!==t}))):a([].concat(Object(l.a)(n),[t]))}(t)}:void 0,valueFormat:t.customValueFormat?function(t){return"".concat(Math.floor(t),"%")}:void 0,maxTableRows:t.maxTableRows?2:void 0}),r.a.createElement("div",null,t.filterable&&r.a.createElement("pre",null,JSON.stringify(n))))}))},v=[{key:1,value:50},{key:2,value:20},{key:3,value:40},{key:5,value:30},{key:6,value:10}],p=function(){var t=r.a.useState({from:3,to:5}),e=Object(c.a)(t,2),n=e[0],a=e[1];return r.a.createElement("div",null,r.a.createElement(h,{title:"Line chart",settings:{withXLabel:!0,withYLabel:!0,useKeyFormat:!1,useFilters:!0,xLabelRotate:!1,xAxisTicksTooltip:!1},data:v},(function(t,e){return r.a.createElement("div",null,r.a.createElement(s.LineChart,{data:e,height:300,width:500,yAxisLabel:t.withYLabel?"Y label":void 0,xAxisLabel:t.withXLabel?"X label":void 0,colour:"green",onFilter:t.useFilters?function(t){var e=t.from,n=t.to;return a({from:e,to:n})}:void 0,filterFrom:t.useFilters?n.from:void 0,filterTo:t.useFilters?n.to:void 0,keyFormat:t.useKeyFormat?function(t){return"".concat(t,",-")}:void 0,xAxisTicksRotate:t.xLabelRotate?-45:void 0,xAxisTicksTooltip:t.xAxisTicksTooltip}),t.useFilters&&r.a.createElement("pre",null,JSON.stringify(n)))})))},x=[{key:"a",value:50},{key:"b",value:20},{key:"c",value:40},{key:"d",value:10}],g=function(){var t=r.a.useState([]),e=Object(c.a)(t,2),n=e[0],a=e[1];return r.a.createElement(h,{title:"Row chart",data:x,settings:{withXLabel:!0,withYLabel:!0,filterable:!0,yLabelCustomWidth:15,xLabelCustomWidth:100,customValueFormat:!1,customToolTipFormat:!1}},(function(t,e){return r.a.createElement("div",null,r.a.createElement(s.RowChart,{data:e,width:400,yAxisLabel:t.withYLabel?"Y label":void 0,xAxisLabel:t.withXLabel?"X label":void 0,colour:"green",onFilter:t.filterable?function(t){return a([].concat(Object(l.a)(n),[t]))}:void 0,filters:t.filterable?n:void 0,labelWidth:t.yLabelCustomWidth||void 0,valueLabelWidth:t.xLabelCustomWidth||void 0,valueFormat:t.customValueFormat?function(t){return"".concat(t,",-")}:void 0,tooltipValueFormat:t.customToolTipFormat?function(t){return"".concat(t," custom tooltip")}:void 0}),t.filterable&&r.a.createElement("pre",null,JSON.stringify(n)))}))},b=function(){return r.a.createElement(h,{title:"Bar chart",settings:{withXLabel:!0,withYLabel:!0,xLabelRotate:!0,xAxisTicksTooltip:!0},data:[{key:"way toooo long name to show",value:8},{key:"26.12.2020 15:40",value:9},{key:"another too long name",value:10}]},(function(t,e){return r.a.createElement(s.BarChart,{data:e,height:300,width:300,colour:"green",colours:["green","grey"],yAxisLabel:t.withYLabel?"Y label":void 0,xAxisLabel:t.withXLabel?"X label":void 0,xAxisTicksRotate:t.xLabelRotate?-90:void 0,xAxisTicksTooltip:t.xAxisTicksTooltip,keyFormat:function(t){return t.length>16?"".concat(t.substring(0,13),"..."):t},xAxisTicksTooltipFormat:function(t){return"".concat(t," ?")}})}))},y=(n(112),function(){return a.createElement(h,{title:"Number chart",data:50,settings:{useCustomLabel:!1,useCustomValueFormat:!0}},(function(t,e){return a.createElement(s.NumberChart,{width:200,color:"#88BB88",value:e,label:t.useCustomLabel?"custom label":void 0,valueFormat:t.useCustomValueFormat?function(t){return"".concat(Math.floor(t),",-")}:void 0})}))}),k=function(){return r.a.createElement("div",null,r.a.createElement("div",{style:{padding:"10px"}},r.a.createElement(m,null),r.a.createElement(p,null),r.a.createElement(g,null),r.a.createElement(b,null),r.a.createElement(y,null)))};o.a.render(r.a.createElement(k,null),document.getElementById("root"))},2:function(t,e,n){"use strict";n.d(e,"d",(function(){return u})),n.d(e,"b",(function(){return h})),n.d(e,"c",(function(){return f})),n.d(e,"e",(function(){return m})),n.d(e,"a",(function(){return v})),n.d(e,"f",(function(){return p}));var a=n(11),r=n(1),i=function(t,e){return t===e},o=function(t){var e=function e(n){return n.length>=t.length?t.apply(void 0,Object(a.a)(n)):function(){for(var t=arguments.length,r=new Array(t),i=0;i<t;i++)r[i]=arguments[i];return e([].concat(Object(a.a)(n),r))}};return function(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return e(n)}},l=(o((function(t,e){var n=e.slice();return n.unshift(t),n})),function(t){return t[0]||null}),c=function(t){return t.slice(1)},s=function(t,e){var n=e.slice();return n.push(t),n},u=o((function(t,e){return e[t]})),d=(o((function(t,e){return e.filter((function(e){return!i(e,t)}))})),o((function(t,e,n){return n.length<=t?d(t,e,s(null,n)):n.map((function(n,a){return i(a,t)?e:n}))}))),h=function(t){return function(t,e){return 0===e.length?0:e.reduce(t)}((function(t,e){return Math.max(t,e)}),t)},f=function(t,e){return h(e.map((function(e){return e[t]})))},m=function(t,e){var n=t/15;if(e.length>n){var a=Math.ceil(e.length/n);return function(t,e){return e%a===0?t:""}}return function(t,e){return t}},v=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=n.length>0;return i&&!n.find((function(t){return t===e}))?a?Object(r.f)("grey").darker(.5).toString():"grey":a?Object(r.f)(t).darker(.5).toString():t},p=function t(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];if(0===r.length)return"".concat(e);var o=l(r);return o?o(e):t.apply(void 0,[e].concat(Object(a.a)(c(r))))}},23:function(t,e,n){"use strict";var a=n(7),r=n(8),i=n(9),o=n(10),l=n(0),c=n(1),s=n(2),u=function(t){Object(o.a)(n,t);var e=Object(i.a)(n);function n(){var t;Object(a.a)(this,n);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(t=e.call.apply(e,[this].concat(i))).axis=void 0,t}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.updateAxis()}},{key:"componentDidUpdate",value:function(t){this.updateAxis()}},{key:"updateAxis",value:function(){var t=Object(c.k)(this.axis).call(Object(c.c)(this.props.scale).tickFormat(this.props.tickFormat||null));if(this.props.axisWidthUpdated){var e=t.selectAll("g.tick text").nodes().map((function(t){return t.getComputedTextLength()}));this.props.axisWidthUpdated(Object(s.b)(e))}}},{key:"render",value:function(){var t=this;return l.createElement("g",{ref:function(e){return t.axis=e}})}}]),n}(l.Component);e.a=u},24:function(t,e,n){"use strict";var a,r=n(7),i=n(8),o=n(9),l=n(10),c=n(1),s=n(0),u=n(2);!function(t){t[t.XS=4.45]="XS",t[t.S=5.39]="S",t[t.M=6.13]="M",t[t.L=7.11]="L",t[t.X=8]="X",t[t.XL=12]="XL"}(a||(a={}));var d={a:a.L,b:a.X,c:a.L,d:a.X,e:a.L,f:a.M,g:a.X,h:a.X,i:a.XS,j:a.S,k:a.X,l:a.XS,m:a.XL,n:a.X,o:a.X,p:a.X,q:a.X,r:a.S,s:a.M,t:a.XS,u:a.X,v:a.X,w:a.XL,x:a.X,y:a.X,z:a.L," ":a.XS,".":a.XS,1:a.S},h=function(t){Object(l.a)(n,t);var e=Object(o.a)(n);function n(t){var a;return Object(r.a)(this,n),(a=e.call(this,t)).axis=void 0,a.state={label:void 0},a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.updateAxis()}},{key:"componentDidUpdate",value:function(t){this.updateAxis()}},{key:"updateAxis",value:function(){var t=this;if(this.axis){var e=Object(c.k)(this.axis).call(Object(c.b)(this.props.scale).tickSize(0).tickPadding(6).tickFormat((function(e,n){return t.props.tickFormat?t.props.tickFormat(e,n):e})));if(this.props.xAxisTicksTooltip){var n=this.props.xAxisTicksTooltipFormat?this.props.xAxisTicksTooltipFormat:function(t){return"".concat(t)};e.selectAll("g.tick text").attr("label",n)}if(this.props.rotate&&(e.selectAll("g.tick text").style("text-anchor","end").attr("dx","-10").attr("dy","0").attr("transform","rotate(".concat(this.props.rotate,")")),this.props.axisHeightUpdated)){var a=e.selectAll("g.tick text").nodes().map((function(t){return t.getComputedTextLength()}));this.props.axisHeightUpdated(this.getLabelsMaxHeight(a))}}}},{key:"render",value:function(){var t,e=this;return s.createElement(s.Fragment,null,s.createElement("g",{transform:"translate(0,".concat(this.props.height,")"),ref:function(t){return e.axis=t},onMouseOver:function(t){if(e.props.xAxisTicksTooltip){var n=t.target.getAttribute("label");e.setState({label:n})}},onMouseOut:function(){return e.setState({label:void 0})}}),this.props.xAxisTicksTooltip&&this.state.label&&s.createElement("g",null,s.createElement("rect",{x:3,y:this.props.height-20,height:"18",width:(t=this.state.label,Array.from(t).reduce((function(t,e){return t+(d[e]||a.L)}),0)+8),style:{fill:"white",stroke:"grey",strokeWidth:1,strokeOpacity:.9,fillOpacity:.9}}),s.createElement("text",{x:7,y:this.props.height-6,fontSize:14},this.state.label)))}},{key:"getLabelsMaxHeight",value:function(t){var e=Object(u.b)(t);return this.props.rotate?Math.sin(Math.abs(this.props.rotate)*Math.PI/180)*e:0}}]),n}(s.Component);e.a=h},45:function(t,e,n){"use strict";var a=n(1),r=n(0),i=n(3),o=n(6),l=n(2);e.a=Object(o.a)((function(t){var e=t.data,n=void 0===e?[]:e,o=t.width,c=t.height,s=t.filters,u=void 0===s?[]:s,d=t.onFilter,h=t.onFocus,f=t.focused,m=t.children,v=t.valueFormat,p=t.tooltipValueFormat,x=t.maxTableRows,g=d?"pointer":"default",b=10,y=10,k=10,E=10,F=c-(x?20*x:20*n.length)-20-b-E,O=o-E-y,A=Object(a.h)().value((function(t){return t.value})),j=Math.min(O,F)/2,S=Object(a.a)().outerRadius(j).innerRadius(j-j/5);return r.createElement("div",{className:"DonutChart",style:{width:o,height:c}},r.createElement("svg",{width:O,height:F,style:{margin:"".concat(b,"px ").concat(E,"px ").concat(20,"px ").concat(E,"px")}},r.createElement("g",{transform:"translate(".concat(O/2,", ").concat(F/2,")")},A(n).filter((function(t){return!!t.data.colour})).map((function(t){return r.createElement(i.Motion,{key:"".concat(t.data.label,"-").concat(t.data.value),defaultStyle:{startAngle:t.startAngle,endAngle:t.endAngle,padAngle:t.padAngle},style:{startAngle:Object(i.spring)(t.startAngle),endAngle:Object(i.spring)(t.endAngle),padAngle:Object(i.spring)(t.padAngle)}},(function(e){return r.createElement("g",null,r.createElement("path",{fill:Object(l.a)(t.data.colour,t.data.label,u,t.data.label===f),d:S(e),stroke:"white",strokeWidth:1,cursor:g,onClick:d?function(e){return d(t.data.label)}:void 0,onMouseOver:function(){return h(t.data.label||void 0)},onMouseOut:function(){return h(void 0)}}),r.createElement("title",null,"".concat(t.data.label?"".concat(t.data.label,": "):"").concat(Object(l.f)(t.data.value,p,v))))}))})),m)),r.createElement("table",{cellSpacing:0,cellPadding:0,style:{border:"none",borderCollapse:"collapse",margin:"0 ".concat(E,"px ").concat(k,"px ").concat(E,"px")}},n.filter((function(t){return!!t.label})).map((function(t,e){var n=t.label,a=t.value,o=t.colour;return r.createElement(i.Motion,{key:n,defaultStyle:{x:0},style:{x:Object(i.spring)(a,{precision:10})}},(function(t){if(x&&e>=x)return r.createElement(r.Fragment,null);var a=n===f?10:6;return r.createElement("tr",{onClick:d?function(){return d(n)}:void 0,onMouseOver:function(){return h(n||void 0)},onMouseOut:function(){return h(void 0)},style:{cursor:g,height:20}},r.createElement("td",null,r.createElement("svg",{height:20,width:20},r.createElement(i.Motion,{defaultStyle:{x:0},style:{x:Object(i.spring)(a)}},(function(t){var e=t.x;return r.createElement("circle",{cx:10,cy:10,r:e,fill:o})})))),r.createElement("td",null,n),r.createElement("td",null,v?v(t.x):t.x))}))}))))}))},48:function(t,e,n){"use strict";var a=n(1),r=n(0),i=n(3),o=n(2),l=n(6);e.a=Object(l.a)((function(t){var e=t.data,n=void 0===e?[]:e,l=t.width,c=t.filters,s=void 0===c?[]:c,u=t.focused,d=t.onFilter,h=t.onFocus,f=t.colour,m=t.valueFormat,v=t.tooltipValueFormat,p=t.labelWidth,x=void 0===p?80:p,g=t.valueLabelWidth,b=void 0===g?40:g,y=t.xAxisLabel,k=t.yAxisLabel,E=40*n.length,F=10,O=10,A=10,j=l-A-10,S=Object(o.c)("value",n),T=k?19:0,w=Object(a.j)().range([0,j-x-b-5]).domain([0,S]),L=Object(a.i)().rangeRound([0,E-F-O]).domain(n.map((function(t){return t.key})));return r.createElement("svg",{width:l,height:E,className:"RowChart"},r.createElement("g",{transform:"translate(".concat(A+0+9+T,", ").concat(F,")")},n.map((function(t){var e=L(t.key)||0;return r.createElement("g",{key:t.key,cursor:d?"pointer":"default",onClick:d?function(e){return d(t.key)}:void 0,onMouseOver:function(e){return h(t.key)},onMouseOut:function(t){return h(void 0)}},r.createElement(i.Motion,{defaultStyle:{width:0},style:{width:Object(i.spring)(t.value)}},(function(n){var a=w(n.width);return r.createElement("rect",{fill:Object(o.a)(f,t.key,s,u===t.key),x:x,y:e,width:a>0?a:0,height:20})})),r.createElement("text",{y:e+18-4,x:0,fontSize:14},t.key),r.createElement("text",{y:e+18-4,x:w(S)+x+5,fontSize:14},m?m(t.value):t.value),r.createElement("title",null,"".concat(t.key,": ").concat(Object(o.f)(t.value,v,m))))})),y?r.createElement("text",{className:"RowChart__label",transform:"translate(".concat(j/2,", ").concat(E,")"),dy:"-1em",textAnchor:"middle",fontSize:14},y):null,k?r.createElement("text",{className:"RowChart__label",transform:"rotate(-90)",x:-E/2,y:-0,dy:"-1em",textAnchor:"middle",fontSize:14},k):null))}))},49:function(t,e,n){"use strict";var a=n(4),r=n(0),i=n(3),o=n(1),l=n(2),c=n(6),s=n(24),u=n(23);e.a=Object(c.a)((function(t){var e=t.width,n=t.height,c=t.data,d=t.filters,h=t.colour,f=t.colours,m=t.focused,v=t.keyFormat,p=t.valueFormat,x=t.tooltipValueFormat,g=t.onFilter,b=t.onFocus,y=t.xAxisTicksRotate,k=t.xAxisLabel,E=t.yAxisLabel,F=t.xAxisTicksTooltip,O=t.xAxisTicksTooltipFormat,A=r.useState(0),j=Object(a.a)(A,2),S=j[0],T=j[1],w=r.useState(0),L=Object(a.a)(w,2),M=L[0],C=L[1],X=10,W=10,R=E?19:0,U=e-W-10-S-9-R,D=n-X-10-M-9-(k?19:0),N=c.map(Object(l.d)("key")),Y=Object(o.i)().range([0,U]).padding(.1).domain(N),z=Object(o.j)().range([D,0]).domain([0,Object(l.c)("value",c)]);return r.createElement("svg",{width:e,height:n,className:"BarChart"},r.createElement("g",{transform:"translate(".concat(W+S+9+R,", ").concat(X,")")},c.map((function(t,e){var n=t.key,a=t.value,o=t.uniqueKey;return r.createElement("g",{key:o||"".concat(n,"-").concat(a)},r.createElement(i.Motion,{defaultStyle:{x:D},style:{x:Object(i.spring)(z(a))}},(function(t){var a=t.x,i=D-a,o=f&&f[e]?f[e]:h;return r.createElement("rect",{x:Y(n),y:a,cursor:g?"pointer":"default",width:Y.bandwidth(),height:i>0?i:0,fill:Object(l.a)(o,n,d,m===n),onClick:g?function(){return g(n)}:void 0,onMouseEnter:function(){return b(n)},onMouseLeave:function(){return b(void 0)}})})),r.createElement("title",null,"".concat(n,": ").concat(Object(l.f)(a,x,p))))})),r.createElement(s.a,{height:D,scale:Y,rotate:y,reduceAxisLabels:Object(l.e)(U,N),tickFormat:v,axisHeightUpdated:function(t){return function(t){M!==t&&C(t)}(t)},xAxisTicksTooltip:F,xAxisTicksTooltipFormat:O}),r.createElement(u.a,{scale:z,tickFormat:p,axisWidthUpdated:function(t){return function(t){S!==t&&T(t)}(t)}}),k?r.createElement("text",{className:"BarChart__label",transform:"translate(".concat(U/2,", ").concat(n,")"),dy:"-1em",textAnchor:"middle",fontSize:14},k):null,E?r.createElement("text",{className:"BarChart__label",transform:"rotate(-90)",x:-n/2,y:-S,dy:"-1em",textAnchor:"middle",fontSize:14},E):null))}))},5:function(t,e,n){"use strict";var a=n(45);n.d(e,"DonutChart",(function(){return a.a}));var r=n(48);n.d(e,"RowChart",(function(){return r.a}));var i=n(49);n.d(e,"BarChart",(function(){return i.a}));var o=n(52);n.d(e,"LineChart",(function(){return o.a}));var l=n(50);n.d(e,"NumberChart",(function(){return l.a}));n(51)},50:function(t,e,n){"use strict";var a=n(0),r=n(3),i=n(6),o=n(2);e.a=Object(i.a)((function(t){var e=t.value,n=t.label,i=t.valueFormat,l=t.tooltipValueFormat,c=t.width,s=t.color,u=t.children;return a.createElement("div",{className:"NumberChart",title:"".concat(n?"".concat(n,": "):"").concat(Object(o.f)(e,l,i)),style:{width:"".concat(c,"px"),height:"".concat(c,"px"),backgroundColor:s,lineHeight:"".concat(c,"px")}},u,a.createElement(r.Motion,{key:n,defaultStyle:{x:0},style:{x:Object(r.spring)(e,{precision:10})}},(function(t){return a.createElement("div",{className:"value"},i?i(t.x):t.x)})))}))},51:function(t,e){},52:function(t,e,n){"use strict";var a=n(7),r=n(8),i=n(16),o=n(9),l=n(10),c=n(0),s=n(1),u=n(24),d=n(23),h=function(t){var e=t.height,n=t.width,a=t.x,r=t.colour,i=t.handlePadding,o=t.focusedFrom,l=t.focusedTo,s=2*i;return c.createElement("g",null,c.createElement("rect",{x:a,y:0,width:n,height:e,cursor:"move",fill:r,opacity:.5}),c.createElement("line",{x2:a,x1:a,y1:0,y2:e,stroke:o?"grey":"lightgrey",strokeWidth:s}),c.createElement("line",{x2:a+n,x1:a+n,y1:0,y2:e,stroke:l?"grey":"lightgrey",strokeWidth:s}))},f=function(t){var e=t.height,n=t.x,a=t.y;return c.createElement("g",null,c.createElement("line",{x1:0,x2:n,y1:a,y2:a,stroke:"lightgrey",strokeWidth:"1"}),c.createElement("line",{x1:n,x2:n,y1:a,y2:e,stroke:"lightgrey",strokeWidth:"1"}),c.createElement("circle",{r:4,cx:n,cy:a}))},m=10,v=10,p=20,x=20,g=function(t){Object(l.a)(n,t);var e=Object(o.a)(n);function n(t){var r;return Object(a.a)(this,n),(r=e.call(this,t)).svg=c.createRef(),r.bottomAxisUpdated=r.bottomAxisUpdated.bind(Object(i.a)(r)),r.leftAxisUpdated=r.leftAxisUpdated.bind(Object(i.a)(r)),r.state={xAxisHeight:0,yAxisWidth:0,focusedX:0,focusedY:0,isFocused:!1,isFiltering:!1,isExtending:!1,isMoving:!1,filterStart:0,filterEnd:0,filterFocused:!1,filterFromFocused:!1,filterToFocused:!1,movingFromDiff:void 0,movingToDiff:void 0},r}return Object(r.a)(n,[{key:"scaleX",value:function(){var t=this.state.yAxisWidth?19:0,e=this.props.width-x-v-this.state.yAxisWidth-t;return Object(s.j)().rangeRound([0,e]).domain(Object(s.e)(this.props.data,(function(t){return t.key})))}},{key:"scaleY",value:function(){var t=this.props.xAxisLabel?19:0,e=this.props.height-m-p-this.state.xAxisHeight-t;return Object(s.j)().rangeRound([e,0]).domain(Object(s.e)(this.props.data,(function(t){return t.value})))}},{key:"mousePosition",value:function(t){var e=this.svg.current.getBoundingClientRect(),n=this.state.yAxisWidth?19:0,a=t.pageX-x-this.state.yAxisWidth-e.left-n;return this.scaleX().invert(a)}},{key:"onMouseMove",value:function(t){var e=this.mousePosition(t);if(this.state.isMoving)this.setState({filterStart:e-(this.state.movingFromDiff||0),filterEnd:e+(this.state.movingToDiff||0)});else if(this.state.isExtending)this.setState({filterEnd:e});else if(this.state.isFiltering)this.setState({filterEnd:e,filterToFocused:!0});else if(this.state.isFocused){var n=this.props.data,a=(0,Object(s.d)((function(t){return t.key})).left)(n,e),r=n[a-1],i=n[a];if(!r)return;if(!i)return;var o=e-r.key>i.key-e?i:r,l=this.scaleX(),c=l(e),u=!1,d=!1,h=!1;if(this.props.filterFrom&&this.props.filterTo){var f=l(this.props.filterFrom),m=l(this.props.filterTo);c-2<m&&m<c+2?d=!0:c-2<f&&f<c+2?h=!0:f+2<=c&&c<=m-2&&(u=!0)}this.setState({focusedX:l(o.key),focusedY:this.scaleY()(o.value),filterFocused:u,filterFromFocused:h,filterToFocused:d})}}},{key:"onMouseDown",value:function(t){var e=this.mousePosition(t);this.state.filterFocused?this.setState({filterStart:this.props.filterFrom,filterEnd:this.props.filterTo,isMoving:!0,movingFromDiff:e-(this.props.filterFrom||0),movingToDiff:(this.props.filterTo||0)-e,isFocused:!1}):this.state.filterToFocused?this.setState({filterStart:this.props.filterFrom,filterEnd:this.props.filterTo,isExtending:!0,isFocused:!1}):this.state.filterFromFocused?this.setState({filterStart:this.props.filterTo,filterEnd:this.props.filterFrom,isExtending:!0,isFocused:!1}):this.setState({filterStart:e,filterEnd:e,isFiltering:!0,isFocused:!1})}},{key:"onMouseUp",value:function(){if(this.props.onFilter){var t=this.state,e=t.filterStart,n=t.filterEnd,a=e,r=n;e&&n&&e>n?(a=n,r=e):a===r&&(a=void 0,r=void 0),a&&r||(a=void 0,r=void 0),this.props.onFilter({from:a,to:r})}this.setState({filterStart:void 0,filterEnd:void 0,isFocused:!0,isFiltering:!1,isExtending:!1,isMoving:!1,movingFromDiff:void 0,movingToDiff:void 0})}},{key:"cursor",value:function(){return this.props.onFilter?this.state.filterFocused?"move":this.state.filterFromFocused||this.state.filterToFocused?"ew-resize":"crosshair":"default"}},{key:"bottomAxisUpdated",value:function(t){this.state.xAxisHeight!==t&&this.setState({xAxisHeight:t})}},{key:"leftAxisUpdated",value:function(t){this.state.yAxisWidth!==t&&this.setState({yAxisWidth:t})}},{key:"render",value:function(){var t=this,e=this.props,n=e.data,a=e.width,r=e.height,i=e.xAxisLabel,o=e.yAxisLabel,l=e.valueFormat,g=e.keyFormat,b=e.colour,y=e.xAxisTicksTooltip,k=o?19:0,E=i?19:0,F=r-m-p-this.state.xAxisHeight-E,O=this.scaleX(),A=Object(s.g)().x((function(t){return O(t.key)})).y((function(e){return t.scaleY()(e.value)})),j=this.props.filterFrom||0,S=this.props.filterTo||0,T=O(Math.min(j,S)),w=Math.abs(O(j)-O(S));(this.state.isFiltering||this.state.isExtending||this.state.isMoving)&&(T=O(Math.min(this.state.filterStart||0,this.state.filterEnd||0)),w=0===this.state.filterEnd?0:Math.abs(O(this.state.filterStart||0)-O(this.state.filterEnd||0)));var L=this.state.isFiltering||this.state.isExtending||j;return c.createElement("svg",{width:a,height:r,ref:this.svg},c.createElement("g",{transform:"translate(".concat(x+this.state.yAxisWidth+k,", ").concat(m,")")},c.createElement(u.a,{height:F,scale:this.scaleX(),tickFormat:g,rotate:this.props.xAxisTicksRotate,axisHeightUpdated:this.bottomAxisUpdated,xAxisTicksTooltip:y}),c.createElement(d.a,{scale:this.scaleY(),tickFormat:l,axisWidthUpdated:this.leftAxisUpdated}),c.createElement("path",{d:A(n),fill:"none",stroke:b,strokeWidth:1.5,strokeLinejoin:"round",strokeLinecap:"round"}),this.state.isFocused?c.createElement(f,{x:this.state.focusedX,y:this.state.focusedY,height:F}):null,L?c.createElement(h,{height:F,x:T,width:w,colour:b,handlePadding:2,focusedFrom:this.state.filterFromFocused,focusedTo:this.state.filterToFocused}):null,c.createElement("rect",{fill:"none",pointerEvents:"all",cursor:this.cursor(),width:a-x-v-this.state.yAxisWidth-k,height:r-m-p-E,onMouseMove:function(e){return t.onMouseMove(e)},onMouseOut:function(){return t.setState({isFocused:!1})},onMouseOver:function(){return t.setState({isFocused:!0})},onMouseDown:function(e){return t.props.onFilter?t.onMouseDown(e):null},onMouseUp:function(e){return t.props.onFilter?t.onMouseUp():null}}),i?c.createElement("text",{transform:"translate(".concat(a/2,", ").concat(r,")"),dy:"-1em",textAnchor:"middle",fontSize:14},i):null,o?c.createElement("text",{transform:"rotate(-90)",y:-this.state.yAxisWidth,x:-r/2,dy:"-1em",textAnchor:"middle",fontSize:14},o):null))}}]),n}(c.Component);e.a=g},6:function(t,e,n){"use strict";var a=n(7),r=n(8),i=n(9),o=n(10),l=n(0);e.a=function(t){return function(e){Object(o.a)(c,e);var n=Object(i.a)(c);function c(t){var e;return Object(a.a)(this,c),(e=n.call(this,t)).state={focused:void 0},e}return Object(r.a)(c,[{key:"render",value:function(){var e=this;return l.createElement(t,Object.assign({},this.props,{onFocus:function(t){return e.setState({focused:t})},focused:this.state.focused}))}}]),c}(l.Component)}},96:function(t,e,n){t.exports=n(113)}},[[96,1,2]]]);
//# sourceMappingURL=main.b6d5676b.chunk.js.map