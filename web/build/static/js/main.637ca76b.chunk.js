(this["webpackJsonpdummy-web"]=this["webpackJsonpdummy-web"]||[]).push([[0],{273:function(e,t,n){e.exports=n(525)},396:function(e,t,n){e.exports=n(531)},525:function(e,t){e.exports=function(){return Date.now().toString(36)}},531:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"getConfig",(function(){return W})),n.d(a,"updateConfig",(function(){return M})),n.d(a,"listAPIs",(function(){return J})),n.d(a,"createAPI",(function(){return U})),n.d(a,"updateAPI",(function(){return K})),n.d(a,"deleteAPI",(function(){return V}));var r=n(0),o=n.n(r),c=n(14),s=n.n(c),l=n(25),i=n(548),u=n(329),d=n(113),p=n(560),m=n(262),f=n.n(m),h=n(381),b=n.n(h),g=n(569),E=n(567),v=n(344),C=n(257),y=n(90),k=n(204),O=n(341),j=n(345),w=n(218),x=n(43),P=n.n(x),A=n(81),I=n(23);function S(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Object(r.useState)(Object(I.a)({isLoading:!1,response:null,error:null},t)),a=Object(l.a)(n,2),o=a[0],c=a[1],s=Object(r.useRef)(0),i=Object(r.useCallback)(function(){var t=Object(A.a)(P.a.mark((function t(){var n,a,r=arguments;return P.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=s.current+1,s.current=n,c((function(e){return Object(I.a)(Object(I.a)({},e),{},{isLoading:!0})})),t.prev=3,t.next=6,e.apply(void 0,r);case 6:a=t.sent,n===s.current&&c({isLoading:!1,response:a,error:null}),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(3),n===s.current&&c({isLoading:!1,response:null,error:t.t0});case 13:case"end":return t.stop()}}),t,null,[[3,10]])})));return function(){return t.apply(this,arguments)}}(),[e]);return[o,i]}var z=n(91),D=n.n(z),N=n(82),L=n.n(N),R=n(374),B=n(375),F=n(382),T=n(383),q=function(e){Object(B.a)(n,e);var t=Object(F.a)(n);function n(){var e,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(R.a)(this,n),(e=t.call(this,a.message)).code=a.code,e.message=a.message,e.data=a.data,e}return n}(Object(T.a)(Error));function W(){return _.apply(this,arguments)}function _(){return(_=Object(A.a)(P.a.mark((function e(){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D.a.get("/_ds/config");case 3:return e.abrupt("return",e.sent);case 6:throw e.prev=6,e.t0=e.catch(0),new q({message:L()(e.t0,"message","")});case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}function M(e){return G.apply(this,arguments)}function G(){return(G=Object(A.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D.a.patch("/_ds/config",t);case 3:return e.abrupt("return",e.sent);case 6:throw e.prev=6,e.t0=e.catch(0),new q({message:L()(e.t0,"message","")});case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}function J(){return H.apply(this,arguments)}function H(){return(H=Object(A.a)(P.a.mark((function e(){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D.a.get("/_ds/apis");case 3:return e.abrupt("return",e.sent);case 6:throw e.prev=6,e.t0=e.catch(0),new q({message:L()(e.t0,"message","")});case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}function U(e){return $.apply(this,arguments)}function $(){return($=Object(A.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D.a.post("/_ds/apis",t);case 3:return e.abrupt("return",e.sent);case 6:throw e.prev=6,e.t0=e.catch(0),new q({message:L()(e.t0,"message","")});case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}function K(e,t){return Q.apply(this,arguments)}function Q(){return(Q=Object(A.a)(P.a.mark((function e(t,n){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D.a.patch("/_ds/apis/".concat(t),n);case 3:return e.abrupt("return",e.sent);case 6:throw e.prev=6,e.t0=e.catch(0),new q({message:L()(e.t0,"message","")});case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}function V(e){return X.apply(this,arguments)}function X(){return(X=Object(A.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D.a.delete("/_ds/apis/".concat(t));case 3:return e.abrupt("return",e.sent);case 6:throw e.prev=6,e.t0=e.catch(0),new q({message:L()(e.t0,"message","")});case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}D.a.interceptors.response.use((function(e){return e.data}),(function(e){return Promise.reject(e.response&&e.response.data)}));var Y=a,Z=n(261),ee=n.n(Z),te=n(15),ne=n(573),ae=n(371);var re=function(){var e=Object(w.b)().enqueueSnackbar;return o.a.useMemo((function(){return{default:function(t,n){return e(t,Object(I.a)({},n))},success:function(t,n){return e(t,Object(I.a)({variant:"success"},n))},error:function(t,n){return e(t,Object(I.a)({variant:"error"},n))},warning:function(t,n){return e(t,Object(I.a)({variant:"warning"},n))},info:function(t,n){return e(t,Object(I.a)({variant:"info"},n))}}}),[e])},oe=n(216),ce=n(270),se=n(343);var le=function(e){var t=e.status,n=Object(oe.a)(e,["status"]);return o.a.createElement(C.a,Object.assign({component:"span",color:t>=200&&t<300?"success.main":"error.main"},n),t)};function ie(e){var t=e.responses,n=e.value,a=e.onChange,r=Object(oe.a)(e,["responses","value","onChange"]);return o.a.createElement(ce.a,Object.assign({value:n,onChange:a},r),t.map((function(e){return o.a.createElement(se.a,{key:e.id,value:e.id},o.a.createElement(le,{key:e.id,status:e.status,mr:1}),e.name)})))}ie.defaultProps={responses:[],value:null,onChange:function(){}};var ue=ie,de=n(89),pe=n(162),me=n.n(pe),fe=n(219),he=n(547),be=n(100),ge=n(387),Ee=n(568),ve=n(353),Ce=n(266),ye=n(546),ke=n(268);function Oe(e){var t=e.title,n=e.onCloseClick;return o.a.createElement(C.a,{px:3,py:2,display:"flex",alignItems:"center",justifyContent:"space-between"},o.a.createElement(y.a,{variant:"h5"},t),o.a.createElement(k.a,{size:"small",onClick:n},o.a.createElement(O.a,null,"close")))}Oe.defaultProps={title:"",onCloseClick:function(){}};var je=Oe,we=n(355),xe=Object(u.a)((function(e){return{footer:{"& button + button":{marginLeft:e.spacing(2)}}}}));function Pe(e){var t=e.isOkDisabled,n=e.onOkClick,a=e.onCancelClick,r=xe();return o.a.createElement(C.a,{className:r.footer,p:3,py:2,display:"flex",justifyContent:"flex-end"},o.a.createElement(we.a,{onClick:a},"Cancel"),o.a.createElement(we.a,{variant:"contained",color:"primary",onClick:n,disabled:t},"Ok"))}Pe.defaultProps={isOkDisabled:!1,onOkClick:function(){},onCancelClick:function(){}};var Ae=Pe,Ie=Object(u.a)((function(e){return{modal:{display:"flex",alignItems:"start",justifyContent:"center",margin:e.spacing(5,"auto")},container:{display:"flex",flexDirection:"column",height:"100%",outline:"none"},paper:{display:"flex",flexDirection:"column",maxHeight:"100%"}}})),Se=n(354),ze=n(361),De=n(575);function Ne(e){var t=e.value,n=e.onChange;return o.a.createElement(Ce.a,{component:"fieldset",margin:"dense",required:!0},o.a.createElement(ye.a,{component:"legend"},"Method"),o.a.createElement(ze.a,{row:!0,value:t,onChange:n},["GET","POST","PUT","DELETE"].map((function(e){return o.a.createElement(Se.a,{key:e,value:e,control:o.a.createElement(De.a,null),label:e})}))))}Ne.defaultProps={value:"",onChange:function(){}};var Le=Ne,Re=n(101),Be=n(273),Fe=n.n(Be),Te=n(570),qe=n(572),We=n(571),_e=n(274),Me=n(380),Ge=n.n(Me),Je=(n(527),n(529),n(530),Object(u.a)((function(e){return{editor:{"& .jsoneditor":{border:0},"& .jsoneditor-menu":{backgroundColor:e.palette.background.default,border:0}}}})));var He=function(e){var t=Je();return o.a.createElement(C.a,{className:t.editor},o.a.createElement(_e.a,Object.assign({mode:_e.a.modes.code,ace:Ge.a,theme:"ace/theme/monokai"},e)))},Ue=Object(u.a)((function(e){return{panel:{"&:not(:first-child)":{marginTop:-1}},summary:{alignItems:"center",margin:0,"& button + button":{marginLeft:e.spacing(1)}}}}));function $e(e){var t=e.response,n=e.isCurrent,a=e.isExpanded,r=e.onExpandedChange,c=e.onChange,s=e.onCopyClick,l=e.onDeleteClick,i=Ue(),u=function(e,n){c(Object(I.a)(Object(I.a)({},t),{},Object(de.a)({},e,n)))};return o.a.createElement(Te.a,{className:i.panel,key:t.id,variant:"outlined",square:!0,expanded:a,onChange:r},o.a.createElement(qe.a,{classes:{content:i.summary}},o.a.createElement(le,{status:t.status,mr:1}),o.a.createElement(C.a,{mr:1},t.name),n&&o.a.createElement(ae.a,{variant:"outlined",size:"small",color:"secondary",label:"Current response"}),o.a.createElement(C.a,{ml:"auto"},o.a.createElement(k.a,{size:"small",onClick:function(e){e.stopPropagation(),s()}},o.a.createElement(O.a,{fontSize:"inherit"},"file_copy")),o.a.createElement(k.a,{size:"small",onClick:function(e){e.stopPropagation(),l()}},o.a.createElement(O.a,{fontSize:"inherit"},"delete")))),o.a.createElement(We.a,null,o.a.createElement(C.a,{display:"flex",flex:1},o.a.createElement(C.a,{flex:"none"},o.a.createElement(ve.a,{fullWidth:!0,id:"das-response-status-".concat(t.id),name:"das-response-status",label:"Status",size:"small",type:"number",value:t.status,onChange:function(e){u("status",+e.target.value)},placeholder:"Status code",autoFocus:!0})),o.a.createElement(C.a,{flex:1,ml:2},o.a.createElement(ve.a,{fullWidth:!0,id:"das-response-name-".concat(t.id),name:"das-response-name",label:"Name",size:"small",value:t.name,onChange:function(e){return u("name",e.target.value)},placeholder:"Response name"})))),o.a.createElement(He,{value:t.body,onChange:function(e){return u("body",e)}}))}$e.defaultProps={isCurrent:!1,isExpanded:!1,onExpandedChange:function(){},onChange:function(){},onCopyClick:function(){},onDeleteClick:function(){}};var Ke=$e;function Qe(e){var t=e.value,n=e.current,a=e.onChange,r=e.onCurrentChange,c=o.a.useState(null),s=Object(l.a)(c,2),i=s[0],u=s[1],d=function(e,n){var r=[].concat(Object(Re.a)(t.slice(0,e)),[n],Object(Re.a)(t.slice(e+1)));a(r)};return o.a.createElement(o.a.Fragment,null,o.a.createElement(C.a,{my:1},t.map((function(e,c){return o.a.createElement(Ke,{key:e.id,response:e,isCurrent:e.id===n,isExpanded:e.id===i,onExpandedChange:function(t,n){!function(e,t){u(t?e:null)}(e.id,n)},onChange:function(e){return d(c,e)},onCopyClick:function(){return function(e){var n=t[e],r=Object(I.a)(Object(I.a)({},n),{},{name:"".concat(n.name," (copied)"),id:Fe()()}),o=[].concat(Object(Re.a)(t),[r]);u(r.id),a(o)}(c)},onDeleteClick:function(){return function(e){var o=t[e],c=[].concat(Object(Re.a)(t.slice(0,e)),Object(Re.a)(t.slice(e+1)));a(c),o.id===n&&r(L()(c,"[0].id",null))}(c)}})}))),o.a.createElement(we.a,{color:"secondary",startIcon:o.a.createElement(O.a,null,"add"),onClick:function(){var e={id:Fe()(),name:"",status:200,body:{}},o=[].concat(Object(Re.a)(t),[e]);u(e.id),a(o),n||r(e.id)}},"Add Response"))}Qe.defaultProps={value:[],current:null,onChange:function(){},onCurrentChange:function(){}};var Ve=Qe,Xe={id:null,delay:0,method:"GET",path:"",description:"",responses:[],currentResponseID:null};function Ye(e){var t=e.open,n=e.data,a=e.onOk,r=e.onCancel,c=o.a.useState(Xe),s=Object(l.a)(c,2),i=s[0],u=s[1],d=Ie(),p=re(),m=S(Y.updateAPI),f=Object(l.a)(m,2),h=f[0],b=f[1],g=S(Y.createAPI),E=Object(l.a)(g,2),v=E[0],y=E[1];o.a.useEffect((function(){t&&u(n?{id:n.id,delay:me()(n.delay)?n.delay:0,method:n.method,path:n.path,description:n.description,responses:n.responses,currentResponseID:n.currentResponseID}:Xe)}),[t,n]),o.a.useEffect((function(){h.response&&(p.success(h.response.message),a(i)),h.error&&p.error(h.error.message)}),[h.response,h.error]),o.a.useEffect((function(){v.response&&(p.success(v.response.message),a(v.response)),v.error&&p.error(v.error.message)}),[v.response,v.error]);var k=me()(i.delay)&&i.delay>=0,O=!!i.path.length,j=!!i.responses.length,w=O&&j&&k,x=function(e,t){u((function(n){return Object(I.a)(Object(I.a)({},n),{},Object(de.a)({},e,t))}))};return o.a.createElement(fe.a,{className:d.modal,open:t,BackdropComponent:he.a,BackdropProps:{timeout:200},closeAfterTransition:!0,disableAutoFocus:!0,disableEnforceFocus:!0,disableBackdropClick:!0},o.a.createElement(ge.a,{in:t},o.a.createElement(Ee.a,{className:d.container,maxWidth:"md"},o.a.createElement(be.a,{className:d.paper,square:!0,elevation:5},o.a.createElement(je,{title:n?"Edit API":"Add API",onCloseClick:r}),o.a.createElement(C.a,{p:3,py:2,overflow:"auto"},o.a.createElement(C.a,{display:"flex"},o.a.createElement(Le,{value:i.method,onChange:function(e){return x("method",e.target.value)}}),o.a.createElement(ve.a,{required:!0,type:"number",id:"das-api-delay",name:"das-api-delay",label:"Delay (ms)",size:"small",margin:"normal",value:i.delay,min:0,error:!k,onChange:function(e){return x("delay",+e.target.value)},placeholder:"API delay",helperText:"Prior to config delay.",style:{marginLeft:"auto"}})),o.a.createElement(ve.a,{fullWidth:!0,required:!0,id:"das-api-path",name:"das-api-path",label:"Path",size:"small",margin:"normal",value:i.path,error:!O,onChange:function(e){return x("path",e.target.value)},placeholder:"API path e.g. /api/user/:userId",helperText:"API path with method should be unique and not empty.",autoFocus:!0}),o.a.createElement(ve.a,{fullWidth:!0,id:"das-api-description",name:"das-api-description",label:"Description",size:"small",margin:"normal",value:i.description,onChange:function(e){return x("description",e.target.value)},placeholder:"API description"}),o.a.createElement(Ce.a,{margin:"normal",fullWidth:!0,required:!0},o.a.createElement(ye.a,{component:"legend",error:!j},"Responses"),!j&&o.a.createElement(ke.a,{error:!0},"Should have at least one response."),o.a.createElement(Ve,{value:i.responses,current:i.currentResponseID,onChange:function(e){return x("responses",e)},onCurrentChange:function(e){x("currentResponseID",e)}}))),o.a.createElement(Ae,{isOkDisabled:!w,onOkClick:function(){i.id?b(i.id,i):y(i)},onCancelClick:r})))))}Ye.defaultProps={open:!1,data:null,onOk:function(){},onCancel:function(){}};var Ze=Ye;function et(e){var t=e.open,n=e.data,a=e.onOk,r=e.onCancel,c=Ie(),s=re(),i=S(Y.deleteAPI),u=Object(l.a)(i,2),d=u[0],p=u[1];o.a.useEffect((function(){d.response&&(s.success(d.response.message),a(d.response)),d.error&&s.error(d.error.message)}),[d.response,d.error]);return o.a.createElement(fe.a,{className:c.modal,open:t,BackdropComponent:he.a,BackdropProps:{timeout:200},closeAfterTransition:!0,disableAutoFocus:!0,disableEnforceFocus:!0,disableBackdropClick:!0},o.a.createElement(ge.a,{in:t},o.a.createElement(Ee.a,{className:c.container,maxWidth:"md"},o.a.createElement(be.a,{className:c.paper,square:!0,elevation:5},o.a.createElement(je,{title:"DeleteAPI",onCloseClick:r}),o.a.createElement(C.a,{p:3,py:2,overflow:"auto"},"Are you sure you want to remove this API?",o.a.createElement(C.a,{component:"span",ml:1,color:"secondary.main",fontWeight:"bold"},null===n||void 0===n?void 0:n.method," ",null===n||void 0===n?void 0:n.path)),o.a.createElement(Ae,{onOkClick:function(){p(n.id)},onCancelClick:r})))))}et.defaultProps={open:!1,data:null,onOk:function(){},onCancel:function(){}};var tt=et,nt=Object(u.a)((function(e){return{actions:{"& button + button":{marginLeft:e.spacing(1)}},fab:{position:"fixed",bottom:e.spacing(2),right:e.spacing(2)},table:{"& th:first-child":{width:"140px !important"},"& th:nth-child(2)":{width:"40% !important"},"& th:nth-child(3)":{width:"40% !important"},"& th:nth-child(4)":{width:"20% !important"},"& th:last-child":{width:"180px !important"},"& td":{wordBreak:"break-word"},"& .MuiToolbar-root":{padding:"0 16px"}},disabledRow:{backgroundColor:e.palette.disabled},response:{width:"100%"}}}));var at=function(){var e=o.a.useState([]),t=Object(l.a)(e,2),n=t[0],a=t[1],r=o.a.useState(null),c=Object(l.a)(r,2),s=c[0],i=c[1],u=o.a.useState(!1),d=Object(l.a)(u,2),p=d[0],m=d[1],f=o.a.useState(!1),h=Object(l.a)(f,2),b=h[0],g=h[1],E=Object(te.a)(),v=nt(),y=re(),w=S(Y.listAPIs,{isLoading:!0}),x=Object(l.a)(w,2),P=x[0],A=x[1],z=S(Y.updateAPI),D=Object(l.a)(z,2),N=D[0],L=D[1];o.a.useEffect((function(){A()}),[]),o.a.useEffect((function(){N.response&&(y.success(N.response.message),A()),N.error&&y.error(N.error.message)}),[N.response,N.error]),o.a.useEffect((function(){P.response&&a(P.response.data),P.error&&y.error(P.error.message)}),[P.response,P.error]);var R=function(e){i(e),m(!0)},B=function(e){e&&A(),m(!1)},F=function(e){e&&A(),g(!1)};return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:v.table},o.a.createElement(ee.a,{title:"API lists",isLoading:P.isLoading||N.isLoading,columns:[{title:"Method",field:"method",cellStyle:{fontSize:"initial"}},{title:"API Path",field:"path",cellStyle:{fontSize:16,fontFamily:"monospace"}},{title:"Description",field:"description",cellStyle:{fontSize:"initial"}},{title:"Delay",field:"delay",searchable:!1,render:function(e){return e.delay>0&&o.a.createElement(ae.a,{variant:"outlined",size:"small",color:"default",label:"".concat(e.delay,"ms"),style:{marginRight:4}})}},{title:"Response",sorting:!1,searchable:!1,render:function(e){return o.a.createElement(ue,{className:v.response,responses:e.responses,value:e.currentResponseID,onChange:function(t){return n=e.id,a=t.target.value,void L(n,{currentResponseID:a});var n,a}})}},{title:"Actions",sorting:!1,searchable:!1,headerStyle:{textAlign:"right"},cellStyle:{textAlign:"right"},render:function(e){return o.a.createElement(C.a,{className:v.actions},o.a.createElement(j.a,{title:"Edit API"},o.a.createElement(k.a,{size:"small",onClick:function(){return R(e)}},o.a.createElement(O.a,{fontSize:"small"},"edit"))),o.a.createElement(j.a,{title:"Copy API"},o.a.createElement(k.a,{size:"small",onClick:function(){return function(e){i(Object(I.a)(Object(I.a)({},e),{},{description:"".concat(e.description," (copied)"),id:null})),m(!0)}(e)}},o.a.createElement(O.a,{fontSize:"small"},"file_copy"))),o.a.createElement(j.a,{title:e.disabled?"Enable API":"Disable API"},o.a.createElement(k.a,{size:"small",onClick:function(){return function(e){L(e.id,{disabled:!e.disabled})}(e)}},o.a.createElement(O.a,{fontSize:"small"},e.disabled?"visibility":"visibility_off"))),o.a.createElement(j.a,{title:"Delete API"},o.a.createElement(k.a,{size:"small",onClick:function(){return function(e){i(e),g(!0)}(e)}},o.a.createElement(O.a,{fontSize:"small"},"delete"))))}}],data:n,options:{paging:!1,tableLayout:"fixed",headerStyle:{fontSize:"initial"},rowStyle:function(e){return e.disabled&&{color:E.palette.text.disabled,backgroundColor:E.palette.action.disabledBackground}},searchFieldStyle:{width:360}},localization:{toolbar:{searchPlaceholder:"Search by method, path, description"}}})),o.a.createElement(Ze,{open:p,data:s,onOk:function(e){return B(e)},onCancel:function(){return B()}}),o.a.createElement(tt,{open:b,data:s,onOk:function(e){return F(e)},onCancel:function(){return F()}}),o.a.createElement(j.a,{title:"Add API"},o.a.createElement(ne.a,{className:v.fab,color:"primary",onClick:function(){return R()}},o.a.createElement(O.a,null,"add"))))},rt={delay:0};function ot(e){var t=e.open,n=e.config,a=e.onOk,r=e.onCancel,c=o.a.useState(rt),s=Object(l.a)(c,2),i=s[0],u=s[1],d=Ie(),p=re(),m=S(Y.updateConfig),f=Object(l.a)(m,2),h=f[0],b=f[1];o.a.useEffect((function(){t&&u(n||rt)}),[t,n]),o.a.useEffect((function(){h.response&&(p.success(h.response.message),a(i)),h.error&&p.error(h.error.message)}),[h.response,h.error]);var g=me()(i.delay)&&i.delay>=0,E=g;return o.a.createElement(fe.a,{className:d.modal,open:t,BackdropComponent:he.a,BackdropProps:{timeout:200},closeAfterTransition:!0,disableAutoFocus:!0,disableEnforceFocus:!0,disableBackdropClick:!0},o.a.createElement(ge.a,{in:t},o.a.createElement(Ee.a,{className:d.container,maxWidth:"sm"},o.a.createElement(be.a,{className:d.paper,square:!0,elevation:5},o.a.createElement(je,{title:"Config",onCloseClick:r}),o.a.createElement(C.a,{p:3,py:2,overflow:"auto"},o.a.createElement(ve.a,{type:"number",required:!0,id:"das-config-delay",name:"das-config-delay",label:"API Delay (ms)",size:"small",margin:"normal",value:i.delay,min:0,error:!g,onChange:function(e){return t="delay",n=+e.target.value,void u((function(e){return Object(I.a)(Object(I.a)({},e),{},Object(de.a)({},t,n))}));var t,n},helperText:"Milliseconds delay for all APIs",autoFocus:!0})),o.a.createElement(Ae,{isOkDisabled:!E,onOkClick:function(){b(i)},onCancelClick:r})))))}ot.defaultProps={open:!1,config:null,onOk:function(){},onCancel:function(){}};var ct=ot,st=Object(u.a)((function(){return{title:{flexGrow:1}}}));var lt=function(){var e=o.a.useState([]),t=Object(l.a)(e,2),n=t[0],a=t[1],r=o.a.useState(!1),c=Object(l.a)(r,2),s=c[0],u=c[1],m=st(),h=Object(i.a)("(prefers-color-scheme: dark)"),x=S(Y.getConfig),P=Object(l.a)(x,2),A=P[0],I=P[1],z=o.a.useMemo((function(){return Object(d.a)({palette:{type:h?"dark":"light",primary:f.a,secondary:b.a}})}),[h]);o.a.useEffect((function(){I()}),[]),o.a.useEffect((function(){A.response&&a(A.response.data)}),[A.response]);var D=function(){u(!1),I()};return o.a.createElement(p.a,{theme:z},o.a.createElement(g.a,null),o.a.createElement(w.a,{maxSnack:3,anchorOrigin:{vertical:"bottom",horizontal:"center"}},o.a.createElement(E.a,{position:"sticky"},o.a.createElement(v.a,null,o.a.createElement(y.a,{variant:"h6",className:m.title},"Dummy API Server"),o.a.createElement(C.a,{mr:1},n.name),o.a.createElement(j.a,{title:"Config"},o.a.createElement(k.a,{size:"small",onClick:function(){u(!0)}},o.a.createElement(O.a,{fontSize:"small"},"settings"))))),o.a.createElement(at,null),o.a.createElement(ct,{open:s,config:n,onOk:function(){return D()},onCancel:function(){return D()}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(lt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[396,1,2]]]);