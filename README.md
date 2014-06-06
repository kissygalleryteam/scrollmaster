## scrollmaster

* 版本：1.0
* 教程：[http://gallery.kissyui.com/scrollmaster/1.0/guide/index.html](http://gallery.kissyui.com/scrollmaster/1.0/guide/index.html)
* demo：[http://gallery.kissyui.com/scrollmaster/1.0/demo/index.html](http://gallery.kissyui.com/scrollmaster/1.0/demo/index.html)

同时适配 TouchPad、鼠标、键盘的横向滚动组件。

use 后会回传实例对象，建议一个页面只使用一个实例，通过 `.detach()` 和 `.init()` 方法改变绑定元素
## API

config:

    allowScroll: true # 是否允许滚动，类似 Enabled
    wheelFilter: null # null 或 function ，用于判断该滚动操作是否触发 ScrollMaster 的移动，传参是 ev.target

    moveDist: DOM.viewportWidth() * 0.16 # 鼠标滚轮每格移动距离
    timeDivisor: 200 # 时间因子，越大越快
    keyboardMul: 5 # 键盘移动的倍数

method: 

    .init(el): el 是父元素，它包含了需要滚动的内容
    .detach(): 取消对所有元素的事件绑定

event:

    "start" 滚动开始时触发
    "end"   滚动结束时触发


## changelog

### V1.0

    [!]


