!function(t,e,o,i){var r=t(e);t.fn.lazyload=function(o){function i(){var e=0;a.each(function(){var o=t(this);if(!l.skip_invisible||o.is(":visible"))if(t.abovethetop(this,l)||t.leftofbegin(this,l));else if(t.belowthefold(this,l)||t.rightoffold(this,l)){if(++e>l.failure_limit)return!1}else o.trigger("appear"),e=0})}var n,a=this,l={threshold:0,failure_limit:0,event:"scroll.lazyload",effect:"show",container:e,data_attribute:"original",data_srcset:"srcset",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAegAAAG+AQMAAABiSQWlAAAABlBMVEXMzMz////TjRV2AAAAn0lEQVR42u3TMQ0AAAgDQRzg3yUSEEEYCJfOv/WicrC4W0/iVJ+rv/6cb0r4poRvSvhW863mW823mm8132q+1Xyr+VbzzTclfFPCNyV8q/lW863mW823mm8132q+1Xyr+eabEr4p4ZsxvtV8q/lW863mW823mm8132q+1XzzTQnflPDNGN9qvtV8q/lW863mW823mm8132q++aaE75WvNaTe8AlptyMVAAAAAElFTkSuQmCC"};return o&&(void 0!==o.failurelimit&&(o.failure_limit=o.failurelimit,delete o.failurelimit),void 0!==o.effectspeed&&(o.effect_speed=o.effectspeed,delete o.effectspeed),t.extend(l,o)),n=void 0===l.container||l.container===e?r:t(l.container),0===l.event.indexOf("scroll")&&n.off(l.event).on(l.event,function(){return i()}),this.each(function(){var e=this,o=t(e);e.loaded=!1,void 0!==o.attr("src")&&!1!==o.attr("src")||o.is("img")&&o.attr("src",l.placeholder),o.one("appear",function(){if(!this.loaded){if(l.appear){var i=a.length;l.appear.call(e,i,l)}t("<img />").one("load",function(){var i=o.attr("data-"+l.data_attribute),r=o.attr("data-"+l.data_srcset);i!=o.attr("src")&&(o.hide(),o.is("img")&&(o.attr("src",i),null!=r&&o.attr("srcset",r)),o.is("video")?o.attr("poster",i):o.css("background-image","url('"+i+"')"),o[l.effect](l.effect_speed)),e.loaded=!0;var n=t.grep(a,function(t){return!t.loaded});if(a=t(n),l.load){var f=a.length;l.load.call(e,f,l)}}).attr({src:o.attr("data-"+l.data_attribute),srcset:o.attr("data-"+l.data_srcset)||""})}}),0!==l.event.indexOf("scroll")&&o.off(l.event).on(l.event,function(){e.loaded||o.trigger("appear")})}),r.off("resize.lazyload").bind("resize.lazyload",function(){i()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&r.on("pageshow",function(e){e.originalEvent&&e.originalEvent.persisted&&a.each(function(){t(this).trigger("appear")})}),t(function(){i()}),this},t.belowthefold=function(o,i){return(void 0===i.container||i.container===e?(e.innerHeight?e.innerHeight:r.height())+r.scrollTop():t(i.container).offset().top+t(i.container).height())<=t(o).offset().top-i.threshold},t.rightoffold=function(o,i){return(void 0===i.container||i.container===e?r.width()+r.scrollLeft():t(i.container).offset().left+t(i.container).width())<=t(o).offset().left-i.threshold},t.abovethetop=function(o,i){return(void 0===i.container||i.container===e?r.scrollTop():t(i.container).offset().top)>=t(o).offset().top+i.threshold+t(o).height()},t.leftofbegin=function(o,i){return(void 0===i.container||i.container===e?r.scrollLeft():t(i.container).offset().left)>=t(o).offset().left+i.threshold+t(o).width()},t.inviewport=function(e,o){return!(t.rightoffold(e,o)||t.leftofbegin(e,o)||t.belowthefold(e,o)||t.abovethetop(e,o))},t.extend(t.expr[":"],{"below-the-fold":function(e){return t.belowthefold(e,{threshold:0})},"above-the-top":function(e){return!t.belowthefold(e,{threshold:0})},"right-of-screen":function(e){return t.rightoffold(e,{threshold:0})},"left-of-screen":function(e){return!t.rightoffold(e,{threshold:0})},"in-viewport":function(e){return t.inviewport(e,{threshold:0})},"above-the-fold":function(e){return!t.belowthefold(e,{threshold:0})},"right-of-fold":function(e){return t.rightoffold(e,{threshold:0})},"left-of-fold":function(e){return!t.rightoffold(e,{threshold:0})}})}(jQuery,window,document);