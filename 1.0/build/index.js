/*
combined files : 

gallery/scrollmaster/1.0/main
gallery/scrollmaster/1.0/index

*/

/*
 * @fileOverview 横屏滚动处理模块.
 * @creator 筱谷<xiaogu.gxb@taobao.com>, 云谦<yunqian@taobao.com>.
 */
KISSY.add('gallery/scrollmaster/1.0/main',function(S, DOM, Node, Event, Anim) {
  var $, DOWN, EVENT_MOVE_END, EVENT_MOVE_START, LEFT, RIGHT, SPACE, ScrollMaster, UP;
  $ = Node.all;
  LEFT = 37;
  UP = 38;
  RIGHT = 39;
  DOWN = 40;
  SPACE = 32;
  EVENT_MOVE_START = "start";
  EVENT_MOVE_END = "end";
  ScrollMaster = {
    allowScroll: true,
    wheelFilter: null,
    moveDist: DOM.viewportWidth() * 0.16,
    timeDivisor: 200,
    keyboardMul: 5,
    isTouchPad: false,
    touchPadCheckTimer: null,
    anim: null,
    currentStatus: null,
    init: function(el) {
      this.detachEvents();
      this.el = $(el);
      return this.bindEvents();
    },
    detachEvents: function() {
      var _ref;
      if ((_ref = this.el) != null) {
        _ref.detach("mousewheel");
      }
      return $(document).detach("keydown", this.keydownHandler, this);
    },
    bindEvents: function() {
      this.el.on("mousewheel", this.mouseWheelHandler, this);
      return $(document).on("keydown", this.keydownHandler, this);
    },
    keydownHandler: function(e) {
      if (e.target.nodeName === "INPUT") {
        return;
      }
      if (e.target.nodeName === "TEXTAREA") {
        return;
      }
      switch (e.keyCode) {
        case LEFT:
        case UP:
          e.preventDefault();
          return this.move(this.moveDist, false);
        case RIGHT:
        case DOWN:
        case SPACE:
          e.preventDefault();
          return this.move(-this.moveDist, false);
      }
    },
    mouseWheelHandler: function(e) {
      var dist, tg, _ref;
      tg = e.target;
      if (typeof this.wheelFilter === "function" ? this.wheelFilter(tg) : void 0) {
        return;
      }
      e.preventDefault();
      dist = e.wheelDelta ? e.wheelDelta * 2 : e.delta * 120;
      this.isTouchPad = !!this.touchPadCheckTimer || Math.abs(dist) % 120 !== 0;
      if (this.isTouchPad) {
        this.fireMoveStart();
        dist = dist / 12;
        if ((_ref = this.touchPadCheckTimer) != null) {
          _ref.cancel();
        }
        this.touchPadCheckTimer = S.later((function(_this) {
          return function() {
            _this.isTouchPad = false;
            _this.touchPadCheckTimer = null;
            return _this.fireMoveEnd();
          };
        })(this), 100, false, this);
        return this.move(dist, true);
      } else {
        dist = dist / 3;
        this.fireMoveStart();
        return this.move(dist, false);
      }
    },
    setMoveDist: function(dist) {
      return this.moveDist = dist;
    },
    move: function(dist, isMouseWheel) {
      var scrollLeft, t, _ref;
      if (!this.allowScroll) {
        return;
      }
      if (!dist) {
        return;
      }
      if (isMouseWheel) {
        return this.el[0].scrollLeft -= dist;
      } else {
        if ((_ref = this.anim) != null ? _ref.isRunning() : void 0) {
          return;
        }
        scrollLeft = this.el[0].scrollLeft - dist * this.keyboardMul;
        t = Math.abs(dist) / this.timeDivisor;
        this.fireMoveStart();
        this.anim = new Anim(this.el, {
          scrollLeft: scrollLeft
        }, t, "easeBoth");
        this.anim.on("complete", (function(_this) {
          return function() {
            return _this.fireMoveEnd.call(_this);
          };
        })(this));
        return this.anim.run();
      }
    },
    fireMoveStart: function() {
      if (this.currentStatus === EVENT_MOVE_START) {
        return;
      }
      this.fire(EVENT_MOVE_START);
      return this.currentStatus = EVENT_MOVE_START;
    },
    fireMoveEnd: function() {
      if (this.currentStatus === EVENT_MOVE_END) {
        return;
      }
      this.fire(EVENT_MOVE_END);
      return this.currentStatus = EVENT_MOVE_END;
    }
  };
  S.mix(ScrollMaster, S.Event.Target);
  return ScrollMaster;
}, {
  requires: ["dom", "node", "event", "anim"]
});

/**
 * @fileoverview 
 * @author 筱谷<xiaogu.gxb@taobao.com>
 * @module scrollmaster
 **/
KISSY.add('gallery/scrollmaster/1.0/index',function (S, SM) {
    return SM;
}, {requires:['./main']});




