webpackJsonp([0],{2679:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(0),c=n.n(u),f=n(44),a=n(33),p=n(34),l=n(51),s=n(72),b=n(17),y=n(35),h=n(4),d=(n.n(h),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),O=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),d(t,[{key:"componentDidMount",value:function(){var e=this.props.match.params.user_id;this.props.handleGetProfile(e)}},{key:"render",value:function(){return c.a.createElement(b.o,this.props)}}]),t}(u.Component);O.propTypes={handleGetProfile:h.func.isRequired};var j=function(e){return{item:e.getIn(["profile","profileView","item"]),isLoading:e.getIn(["profile","profileView","isLoading"])}},m=function(e){return{handleGetProfile:function(t){return e(Object(y.z)(t))}}},w=Object(f.b)(j,m),_=Object(p.c)({key:"profile",reducer:l.e}),v=Object(p.d)({key:"profile",saga:s.c});t.default=Object(a.compose)(_,v,w)(O)}});
//# sourceMappingURL=0.e7ec21f3.chunk.js.map