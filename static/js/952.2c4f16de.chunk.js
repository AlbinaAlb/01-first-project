"use strict";(self.webpackChunk_01_first_project=self.webpackChunk_01_first_project||[]).push([[952],{5424:function(t,e,s){s.d(e,{pj:function(){return o},IO:function(){return c},QI:function(){return l}});var r=s(132),n=r.Z_().email("Invalid email format").max(30,"Nice try, nobody has a first name that long").required("Required"),a=r.Z_().min(8,"Must be longer than 8 characters").required("Required"),i=r.Z_().max(1e3,"Must be less  than 1000 characters").required("Required"),u=r.Z_().max(500,"Must be less  than 500 characters").required("Required"),o=r.Ry().shape({email:n,password:a}),c=r.Ry().shape({newPostText:i}),l=r.Ry().shape({newMessageText:u})},1952:function(t,e,s){s.r(e),s.d(e,{default:function(){return y}});var r=s(1413),n=s(2791),a=s(364),i=s(6070),u="MyPosts_postsBlock__kEF9P",o="MyPosts_postsBlock__posts__Ejdve",c="Post_post__-BUTX",l=s(184),d=function(t){return(0,l.jsxs)("div",{className:c,children:[(0,l.jsx)("img",{src:"https://i.pinimg.com/originals/f1/9c/f5/f19cf5aaa0ea38889c940c12d8ab41b9.jpg",alt:""}),t.message,(0,l.jsx)("div",{children:(0,l.jsx)("span",{children:t.likesCount})})]})},f=s(5705),p=s(5424),h=s(2529),x=function(t){var e=(0,f.TA)({initialValues:{newPostText:""},onSubmit:t.onSubmit,validationSchema:p.IO}),s=e.errors.newPostText;return(0,l.jsxs)("form",{onSubmit:e.handleSubmit,children:[(0,l.jsxs)("div",{className:h.Z.formControl+" "+(s?h.Z.error:""),children:[(0,l.jsx)("textarea",{id:"newPostText",name:"newPostText",type:"textarea",onChange:e.handleChange,value:e.values.newPostText}),(0,l.jsx)("div",{children:s&&(0,l.jsx)("span",{children:s})})]}),(0,l.jsx)("div",{children:(0,l.jsx)("button",{type:"submit",children:"Add post"})})]})},m=n.memo((function(t){var e=t.posts.map((function(t,e){return(0,l.jsx)(d,{message:t.message,likesCount:t.likesCount},"postsElement_".concat(e))})).reverse();return(0,l.jsxs)("div",{className:u,children:[(0,l.jsx)("h3",{children:"My posts"}),(0,l.jsx)(x,{onSubmit:function(e){t.addPost(e.newPostText)}}),(0,l.jsx)("div",{className:o,children:e})]})})),j=(0,a.$j)((function(t){return{posts:t.profilePage.posts,newPostText:t.profilePage.newPostText}}),(function(t){return{addPost:function(e){t((0,i.Wl)(e))}}}))(m),_="ProfileInfo_profileImg__JHcdW",v="ProfileInfo_descriptionBlock__UM-7L",g=s(2026),P=s(885),S=function(t){var e=(0,n.useState)(!1),s=(0,P.Z)(e,2),r=s[0],a=s[1],i=(0,n.useState)(t.status),u=(0,P.Z)(i,2),o=u[0],c=u[1];(0,n.useEffect)((function(){c(t.status)}),[t.status]);return(0,l.jsxs)("div",{children:[!r&&(0,l.jsx)("div",{children:(0,l.jsx)("span",{onDoubleClick:function(){a(!0)},children:t.status||"---"})}),r&&(0,l.jsx)("div",{children:(0,l.jsx)("input",{onChange:function(t){c(t.currentTarget.value)},onBlur:function(){a(!1),t.updateStatus(o)},autoFocus:!0,value:o})})]})},b=function(t){var e=t.profile,s=t.status,r=t.updateStatus;return e?(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:_,children:(0,l.jsx)("img",{src:"https://cs8.pikabu.ru/post_img/big/2016/03/29/6/1459241134114051877.jpg",alt:""})}),(0,l.jsxs)("div",{className:v,children:[(0,l.jsx)("img",{src:e.photos.large,alt:""}),(0,l.jsx)(S,{status:s,updateStatus:r})]})]}):(0,l.jsx)(g.Z,{})},Z=function(t){return(0,l.jsxs)("div",{children:[(0,l.jsx)(b,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),(0,l.jsx)(j,{})]})},I=s(1548),k=s(6871);var y=(0,s(7781).qC)((0,a.$j)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,autorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfile:i.et,getStatus:i.lR,updateStatus:i.Nf}),I.D)((function(t){var e=(0,a.I0)(),s=(0,k.UO)();return s.userId||(s.userId=t.autorizedUserId),(0,n.useEffect)((function(){e((0,i.et)(s.userId)),e((0,i.lR)(s.userId))}),[]),(0,l.jsx)(Z,(0,r.Z)((0,r.Z)({},t),{},{profile:t.profile,status:t.status,updateStatus:t.updateStatus}))}))},1548:function(t,e,s){s.d(e,{D:function(){return p}});var r=s(1413),n=s(5671),a=s(3144),i=s(136),u=s(3668),o=s(2791),c=s(364),l=s(6871),d=s(184),f=function(t){return{isAuth:t.auth.isAuth}},p=function(t){var e=function(e){(0,i.Z)(o,e);var s=(0,u.Z)(o);function o(){return(0,n.Z)(this,o),s.apply(this,arguments)}return(0,a.Z)(o,[{key:"render",value:function(){return this.props.isAuth?(0,d.jsx)(t,(0,r.Z)({},this.props)):(0,d.jsx)(l.Fg,{to:"/login"})}}]),o}(o.Component);return(0,c.$j)(f)(e)}},2529:function(t,e){e.Z={formControl:"Validators_formControl__jAQ27",error:"Validators_error__Xq-TW",formSummaryError:"Validators_formSummaryError__sZQDQ"}}}]);
//# sourceMappingURL=952.2c4f16de.chunk.js.map