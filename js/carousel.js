!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):e.Util=t(e.jQuery)}(this,function(e){"use strict";return function(e){var t="transitionend";function i(t){var i=this,r=!1;return e(this).one(n.TRANSITION_END,function(){r=!0}),setTimeout(function(){r||n.triggerTransitionEnd(i)},t),this}var n={TRANSITION_END:"bsTransitionEnd",getUID:function(e){do{e+=~~(1e6*Math.random())}while(document.getElementById(e));return e},getSelectorFromElement:function(e){var t=e.getAttribute("data-target"),i="querySelector";t&&"#"!==t||(t=(e.getAttribute("href")||"").trim());var n=t;"#"===t.charAt(0)&&-1===t.indexOf(",")&&(t=t.substr(1),i="getElementById");try{return document[i](t)?n:null}catch(e){return null}},getTransitionDurationFromElement:function(t){if(!t)return 0;var i=e(t).css("transition-duration");return parseFloat(i)?(i=i.split(",")[0],1e3*parseFloat(i)):0},reflow:function(e){return e.offsetHeight},triggerTransitionEnd:function(i){e(i).trigger(t)},supportsTransitionEnd:function(){return Boolean(t)},isElement:function(e){return(e[0]||e).nodeType},typeCheckConfig:function(e,t,i){for(var r in i)if(Object.prototype.hasOwnProperty.call(i,r)){var s=i[r],o=t[r],l=o&&n.isElement(o)?"element":(a=o,{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if(!new RegExp(s).test(l))throw new Error(e.toUpperCase()+': Option "'+r+'" provided type "'+l+'" but expected type "'+s+'".')}var a}};return e.fn.emulateTransitionEnd=i,e.event.special[n.TRANSITION_END]={bindType:t,delegateType:t,handle:function(t){if(e(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}},n}(e=e&&e.hasOwnProperty("default")?e.default:e)}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery"),require("./util.js")):"function"==typeof define&&define.amd?define(["jquery","./util.js"],t):e.Carousel=t(e.jQuery,e.Util)}(this,function(e,t){"use strict";function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function n(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable}))),n.forEach(function(t){var n,r,s;n=e,r=t,s=i[t],r in n?Object.defineProperty(n,r,{value:s,enumerable:!0,configurable:!0,writable:!0}):n[r]=s})}return e}var r,s,o,l,a,u,c,d,h,f,_,m,v,g,p,E,y,I,T,A,b,S;return e=e&&e.hasOwnProperty("default")?e.default:e,t=t&&t.hasOwnProperty("default")?t.default:t,s="carousel",l="."+(o="bs.carousel"),a=".data-api",u=(r=e).fn[s],c={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},d={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},h="next",f="prev",_="left",m="right",v={SLIDE:"slide"+l,SLID:"slid"+l,KEYDOWN:"keydown"+l,MOUSEENTER:"mouseenter"+l,MOUSELEAVE:"mouseleave"+l,TOUCHEND:"touchend"+l,LOAD_DATA_API:"load"+l+a,CLICK_DATA_API:"click"+l+a},g="carousel",p="active",E="slide",y="carousel-item-right",I="carousel-item-left",T="carousel-item-next",A="carousel-item-prev",b={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},S=function(){function e(e,t){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(t),this._element=r(e)[0],this._indicatorsElement=this._element.querySelector(b.INDICATORS),this._addEventListeners()}var a,u,S,D=e.prototype;return D.next=function(){this._isSliding||this._slide(h)},D.nextWhenVisible=function(){!document.hidden&&r(this._element).is(":visible")&&"hidden"!==r(this._element).css("visibility")&&this.next()},D.prev=function(){this._isSliding||this._slide(f)},D.pause=function(e){e||(this._isPaused=!0),this._element.querySelector(b.NEXT_PREV)&&(t.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},D.cycle=function(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},D.to=function(e){var t=this;this._activeElement=this._element.querySelector(b.ACTIVE_ITEM);var i=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)r(this._element).one(v.SLID,function(){return t.to(e)});else{if(i===e)return this.pause(),void this.cycle();var n=e>i?h:f;this._slide(n,this._items[e])}},D.dispose=function(){r(this._element).off(l),r.removeData(this._element,o),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},D._getConfig=function(e){return e=n({},c,e),t.typeCheckConfig(s,e,d),e},D._addEventListeners=function(){var e=this;this._config.keyboard&&r(this._element).on(v.KEYDOWN,function(t){return e._keydown(t)}),"hover"===this._config.pause&&(r(this._element).on(v.MOUSEENTER,function(t){return e.pause(t)}).on(v.MOUSELEAVE,function(t){return e.cycle(t)}),"ontouchstart"in document.documentElement&&r(this._element).on(v.TOUCHEND,function(){e.pause(),e.touchTimeout&&clearTimeout(e.touchTimeout),e.touchTimeout=setTimeout(function(t){return e.cycle(t)},500+e._config.interval)}))},D._keydown=function(e){if(!/input|textarea/i.test(e.target.tagName))switch(e.which){case 37:e.preventDefault(),this.prev();break;case 39:e.preventDefault(),this.next()}},D._getItemIndex=function(e){return this._items=e&&e.parentNode?[].slice.call(e.parentNode.querySelectorAll(b.ITEM)):[],this._items.indexOf(e)},D._getItemByDirection=function(e,t){var i=e===h,n=e===f,r=this._getItemIndex(t),s=this._items.length-1;if((n&&0===r||i&&r===s)&&!this._config.wrap)return t;var o=(r+(e===f?-1:1))%this._items.length;return-1===o?this._items[this._items.length-1]:this._items[o]},D._triggerSlideEvent=function(e,t){var i=this._getItemIndex(e),n=this._getItemIndex(this._element.querySelector(b.ACTIVE_ITEM)),s=r.Event(v.SLIDE,{relatedTarget:e,direction:t,from:n,to:i});return r(this._element).trigger(s),s},D._setActiveIndicatorElement=function(e){if(this._indicatorsElement){var t=[].slice.call(this._indicatorsElement.querySelectorAll(b.ACTIVE));r(t).removeClass(p);var i=this._indicatorsElement.children[this._getItemIndex(e)];i&&r(i).addClass(p)}},D._slide=function(e,i){var n,s,o,l=this,a=this._element.querySelector(b.ACTIVE_ITEM),u=this._getItemIndex(a),c=i||a&&this._getItemByDirection(e,a),d=this._getItemIndex(c),f=Boolean(this._interval);if(e===h?(n=I,s=T,o=_):(n=y,s=A,o=m),c&&r(c).hasClass(p))this._isSliding=!1;else if(!this._triggerSlideEvent(c,o).isDefaultPrevented()&&a&&c){this._isSliding=!0,f&&this.pause(),this._setActiveIndicatorElement(c);var g=r.Event(v.SLID,{relatedTarget:c,direction:o,from:u,to:d});if(r(this._element).hasClass(E)){r(c).addClass(s),t.reflow(c),r(a).addClass(n),r(c).addClass(n);var S=t.getTransitionDurationFromElement(a);r(a).one(t.TRANSITION_END,function(){r(c).removeClass(n+" "+s).addClass(p),r(a).removeClass(p+" "+s+" "+n),l._isSliding=!1,setTimeout(function(){return r(l._element).trigger(g)},0)}).emulateTransitionEnd(S)}else r(a).removeClass(p),r(c).addClass(p),this._isSliding=!1,r(this._element).trigger(g);f&&this.cycle()}},e._jQueryInterface=function(t){return this.each(function(){var i=r(this).data(o),s=n({},c,r(this).data());"object"==typeof t&&(s=n({},s,t));var l="string"==typeof t?t:s.slide;if(i||(i=new e(this,s),r(this).data(o,i)),"number"==typeof t)i.to(t);else if("string"==typeof l){if(void 0===i[l])throw new TypeError('No method named "'+l+'"');i[l]()}else s.interval&&(i.pause(),i.cycle())})},e._dataApiClickHandler=function(i){var s=t.getSelectorFromElement(this);if(s){var l=r(s)[0];if(l&&r(l).hasClass(g)){var a=n({},r(l).data(),r(this).data()),u=this.getAttribute("data-slide-to");u&&(a.interval=!1),e._jQueryInterface.call(r(l),a),u&&r(l).data(o).to(u),i.preventDefault()}}},a=e,S=[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return c}}],(u=null)&&i(a.prototype,u),S&&i(a,S),e}(),r(document).on(v.CLICK_DATA_API,b.DATA_SLIDE,S._dataApiClickHandler),r(window).on(v.LOAD_DATA_API,function(){for(var e=[].slice.call(document.querySelectorAll(b.DATA_RIDE)),t=0,i=e.length;t<i;t++){var n=r(e[t]);S._jQueryInterface.call(n,n.data())}}),r.fn[s]=S._jQueryInterface,r.fn[s].Constructor=S,r.fn[s].noConflict=function(){return r.fn[s]=u,S._jQueryInterface},S});