###
# @fileOverview 横屏滚动处理模块.
# @creator 筱谷<xiaogu.gxb@taobao.com>, 云谦<yunqian@taobao.com>.
###

KISSY.add (S, DOM, Node, Event, Anim) ->

  # Alias.
  $ = Node.all

  # Const.
  LEFT  = 37
  UP    = 38
  RIGHT = 39
  DOWN  = 40
  SPACE = 32
  EVENT_MOVE_START = "start"
  EVENT_MOVE_END   = "end"

  ScrollMaster =

    allowScroll: true
    wheelFilter: null

    moveDist: DOM.viewportWidth() * 0.16
    timeDivisor: 200 # 时间因子，越大越快
    keyboardMul: 5 # 键盘移动的倍数

    isTouchPad: false

    touchPadCheckTimer: null

    anim: null
    currentStatus: null

    #########################
    # Init.

    init: (el) ->
      @detachEvents()
      @el = $ el    # 当前滚动元素.
      @bindEvents()
      # @config.allowScroll = true

    #########################
    # Events.

    detachEvents: ->
      @el?.detach "mousewheel"
      $(document).detach "keydown", @keydownHandler, @

    bindEvents: ->
      @el.on "mousewheel", @mouseWheelHandler,  @
      $(document).on "keydown", @keydownHandler, @

    keydownHandler: (e) ->
      return if e.target.nodeName == "INPUT"
      return if e.target.nodeName == "TEXTAREA"

      switch e.keyCode
        when LEFT, UP
          e.preventDefault()
          @move @moveDist, false
        when RIGHT, DOWN, SPACE
          e.preventDefault()
          @move -@moveDist, false

    mouseWheelHandler: (e) ->
      tg = e.target
      return if @wheelFilter?(tg)

      e.preventDefault()
      # @isMacChrome = @getIsMacChrome() if @isMacChrome == null
      # 不禁止水平滚动了
      #return if e.originalEvent.wheelDeltaX && Math.abs(e.originalEvent.wheelDeltaX) > Math.abs(e.originalEvent.wheelDeltaY) && @isMac

      dist = if e.wheelDelta then e.wheelDelta * 2 else e.delta * 120

      @isTouchPad = !!@touchPadCheckTimer || Math.abs(dist) % 120 != 0
      if @isTouchPad
        @fireMoveStart()
        dist = dist / 12
        @touchPadCheckTimer?.cancel()
        @touchPadCheckTimer = S.later =>
          @isTouchPad = false
          @touchPadCheckTimer = null
          @fireMoveEnd()
        , 100, false, @
        @move dist, true
      else
        # 最小间隔: 30px，参考 myspace
        dist = dist / 3
        @fireMoveStart()
        @move dist, false

    #########################
    # Methods.

    setMoveDist: (dist)->
      @moveDist = dist;

    # Move.

    move: (dist, isMouseWheel) ->
      return if !@allowScroll
      return if !dist

      if isMouseWheel
        @el[0].scrollLeft -= dist
      else
        return if @anim?.isRunning()
        scrollLeft = @el[0].scrollLeft - dist * @keyboardMul
        t = Math.abs(dist) / @timeDivisor
        @fireMoveStart()
        @anim = new Anim @el, {scrollLeft}, t, "easeBoth"
        @anim.on "complete", =>
          @fireMoveEnd.call @
        @anim.run()

    # Fire.

    fireMoveStart: ->
      return if @currentStatus == EVENT_MOVE_START
      @fire EVENT_MOVE_START
      @currentStatus = EVENT_MOVE_START
      # console.log "start"

    fireMoveEnd: ->
      return if @currentStatus == EVENT_MOVE_END
      @fire EVENT_MOVE_END
      @currentStatus = EVENT_MOVE_END
      # console.log "end"

  
  # 添加自定义事件支持.
  S.mix ScrollMaster, S.Event.Target

  ScrollMaster

,
  requires: [
    "dom", "node", "event", "anim"
  ]
