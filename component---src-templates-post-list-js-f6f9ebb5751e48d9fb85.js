(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{249:function(e,a,t){"use strict";t.r(a),t.d(a,"listQuery",(function(){return d}));t(51),t(7);var l=t(1),n=t.n(l),r=t(29),c=(t(164),t(243),t(242)),s=t(241),m=t(244),o=t(116),i=t(64),d="3566277756";a.default=function(e){var a=e.data.allMarkdownRemark.edges,t=e.data.site.siteMetadata.labels,l=e.pageContext,d=l.currentPage,E=l.numPages,u=1===d||null==d,p=d===E||null==E,N=d-1==1?"/":(d-1).toString(),g=(d+1).toString();return n.a.createElement(c.a,null,n.a.createElement(s.a,{title:"Home",keywords:["gatsby","javascript","react","web development","blog","graphql"]}),n.a.createElement("div",{className:"container-fluid"},n.a.createElement("div",{className:"post-list-main"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12 col-xl-9 col-lg-9 mb-5"},a.map((function(e){var a=e.node.frontmatter.tags;return n.a.createElement("div",{key:e.node.id,className:"container card mb-5 p-3 bg-white"},n.a.createElement(r.Link,{to:e.node.fields.slug,className:"text-dark"},n.a.createElement("h2",{className:"title"},e.node.frontmatter.title)),n.a.createElement("small",{className:"d-block text-info"},n.a.createElement("i",null,"Published on ",e.node.frontmatter.date)),n.a.createElement("p",{className:"mt-3 d-inline"},e.node.excerpt),n.a.createElement("div",{className:"d-block"},n.a.createElement("span",{className:"mr-2"},n.a.createElement(i.FaTags,null)),function(e){return Object(o.a)(e,t)}(a)))})),n.a.createElement("div",{className:"text-center mt-4"},u&&n.a.createElement("span",{className:"mr-4",style:{color:"gray"}},n.a.createElement(i.FaArrowLeft,null)," Prev"),!u&&n.a.createElement(r.Link,{to:N,rel:"prev",style:{textDecoration:"none"}},n.a.createElement("span",{className:"text-dark mr-4"},n.a.createElement(i.FaArrowLeft,null)," Prev")),p&&n.a.createElement("span",{className:"ml-4",style:{color:"gray"}},"Next ",n.a.createElement(i.FaArrowRight,null)),!p&&n.a.createElement(r.Link,{to:g,rel:"next",style:{textDecoration:"none"}},n.a.createElement("span",{className:"text-dark ml-4"},"Next ",n.a.createElement(i.FaArrowRight,null))))),n.a.createElement("div",{className:"col-12 col-xl-3 col-lg-3"},n.a.createElement("div",{className:"px-4 py-2"},n.a.createElement(m.a,null)))))))}}}]);
//# sourceMappingURL=component---src-templates-post-list-js-f6f9ebb5751e48d9fb85.js.map