/*!build time : 2014-06-05 10:12:20 PM*/
KISSY.add("kg/scrollmaster/2.0.0/main",function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n;return f=c.all,j=37,n=38,k=39,g=40,l=32,i="start",h="end",m={allowScroll:!0,wheelFilter:null,moveDist:.16*b.viewportWidth(),timeDivisor:200,keyboardMul:5,isTouchPad:!1,touchPadCheckTimer:null,anim:null,currentStatus:null,init:function(a){return this.detachEvents(),this.el=f(a),this.bindEvents()},detachEvents:function(){var a;return null!=(a=this.el)&&a.detach("mousewheel"),f(document).detach("keydown",this.keydownHandler,this)},bindEvents:function(){return this.el.on("mousewheel",this.mouseWheelHandler,this),f(document).on("keydown",this.keydownHandler,this)},keydownHandler:function(a){if("INPUT"!==a.target.nodeName&&"TEXTAREA"!==a.target.nodeName)switch(a.keyCode){case j:case n:return a.preventDefault(),this.move(this.moveDist,!1);case k:case g:case l:return a.preventDefault(),this.move(-this.moveDist,!1)}},mouseWheelHandler:function(b){var c,d,e;return d=b.target,("function"==typeof this.wheelFilter?this.wheelFilter(d):0)?void 0:(b.preventDefault(),c=b.wheelDelta?2*b.wheelDelta:2.0.0*b.delta,this.isTouchPad=!!this.touchPadCheckTimer||Math.abs(c)%2.0.0!==0,this.isTouchPad?(this.fireMoveStart(),c/=12,null!=(e=this.touchPadCheckTimer)&&e.cancel(),this.touchPadCheckTimer=a.later(function(a){return function(){return a.isTouchPad=!1,a.touchPadCheckTimer=null,a.fireMoveEnd()}}(this),2.0.0,!1,this),this.move(c,!0)):(c/=3,this.fireMoveStart(),this.move(c,!1)))},setMoveDist:function(a){return this.moveDist=a},move:function(a,b){var c,d,f;if(this.allowScroll&&a){if(b)return this.el[0].scrollLeft-=a;if(null!=(f=this.anim)?!f.isRunning():!0)return c=this.el[0].scrollLeft-a*this.keyboardMul,d=Math.abs(a)/this.timeDivisor,this.fireMoveStart(),this.anim=new e(this.el,{scrollLeft:c},d,"easeBoth"),this.anim.on("complete",function(a){return function(){return a.fireMoveEnd.call(a)}}(this)),this.anim.run()}},fireMoveStart:function(){return this.currentStatus!==i?(this.fire(i),this.currentStatus=i):void 0},fireMoveEnd:function(){return this.currentStatus!==h?(this.fire(h),this.currentStatus=h):void 0}},a.mix(m,a.Event.Target),m},{requires:["dom","node","event","anim"]}),KISSY.add("kg/scrollmaster/2.0.0/index",function(a,b){return b},{requires:["./main"]});