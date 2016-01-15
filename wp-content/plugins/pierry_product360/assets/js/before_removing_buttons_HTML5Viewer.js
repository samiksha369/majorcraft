!function (){
  var h, g, l = document.createElement("p"), k = l.style, j = ["Webkit", "Moz", "O", "ms"]
  , i =! 1;
  if ("opacity"in k){
    i =! 0
  }
  else {
    for (g = j.length, h = 0; g > h; h ++ ){
      j[h] + "Opacity"in k && (i =! 0)
    }
  }
  
  Ortery.Button = function (d, c){
    this.createButton(d, c)
  }
  , Ortery.Button.prototype = {
    createButton : function (d, c){
      i ? this.createImageButton(d, c) : this.createDivButton(d, c)
    }
    , createImageButton : function (e, d){
      var f = document.createElement("img");
      return f.src = e, d && f.setAttribute("alt", d), this.domElement = f, this 
    }
    , createDivButton : function (d){
      var c = document.createElement("div");
      return c.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + 
      d + ", sizingMethod=scale)", this.domElement = c, this 
    }
    , setNewPath : function (b){
      return i ? this.domElement.src = b : this.domElement.style.filter = 
      "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + b + 
      ", sizingMethod=scale)", this 
    }
  }
}
(), function (){
  Ortery.Magnifier = function (h, g, l){
    var k, j = document.createElement("p").style, i = document.createElement("div");
    i.className = "animateMagnifier", i.data = {
      left : 0, top : 0, degree : 0
    }
    , j = document.createElement("p").style, k = "transform"in j || "WebkitTransform"in j
     || "MozTransform"in j || "msTransform"in j || "OTransform"in j, this.initSize = h, 
    this._maxSize = g, this._minSize = l, this.supportsTransforms = k, this.domElement
     = i, this.registerDrag()
  }
  , Ortery.Magnifier.prototype = {
    init : function (){
      var g = this.domElement, f = g.parentNode, j = this.initSize, i = (f.clientWidth - 
      j) / 2, h = (f.clientHeight - j) / 2;
      return this.resize(j, i, h), this 
    }
    , resize : function (e, d, f){
      this.setSize(e), this.setOffset(d, f)
    }
    , setSize : function (b){
      this.domElement.style.width = b + "px", this.domElement.style.height = b + "px"
    }
    , setOffset : function (e, d){
      var f = this.domElement;
      f.data.left = e, f.data.top = d, this.supportsTransforms ? this.setTransform() : (
      f.style.left = e + "px", f.style.top = d + "px")
    }
    , setDegree : function (d){
      var c;
      return this.domElement.data.degree = d, this.supportsTransforms ? this.
      setTransform() : (c = 180 === d ? 2 : 0, this.domElement.style.filter = 
      "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + c + ")"), this 
    }
    , setTransform : function (){
      var g = this.domElement, f = g.data, j = f.left, i = f.top, h = f.degree;
      g.style.WebkitTransform = "translate(" + j + "px, " + i + "px) rotate(" + h + "deg)"
      , g.style.MozTransform = "translate(" + j + "px, " + i + "px) rotate(" + h + "deg)", 
      g.style.OTransform = "translate(" + j + "px, " + i + "px) rotate(" + h + "deg)", g.
      style.msTransform = "translate(" + j + "px, " + i + "px) rotate(" + h + "deg)", g.
      style.transform = "translate(" + j + "px, " + i + "px) rotate(" + h + "deg)"
    }
    , setBackgroundImage : function (f, e){
      var h = document.createElement("img"), g = this.domElement;
      return h.onload = function (){
        g.style.backgroundImage = 'url("' + this.src + '")', e.apply(g)
      }
      , h.src = f, this 
    }
    , setBackgroundSize : function (d, c){
      return this.domElement.style.backgroundSize = d + "px " + c + "px", this 
    }
    , setBackgroundPosition : function (J, I, H, G, F, E, D){
      var C, B, A, z, y, x, w = Math.PI * ( - D / 180), v = this.getSize() / 2, u = this 
      .getOffset(), t = u.left, s = u.top;
      return C = t + v - F, B = s + v - E, A = Math.cos(w) * (C - H / 2) - Math.sin(w) * (
      B - G / 2) + H / 2, z = Math.sin(w) * (C - H / 2) + Math.cos(w) * (B - G / 2) + G / 
      2, y =- J * A / H + v, x =- I * z / G + v, this.domElement.style.backgroundPosition
       = y + "px " + x + "px", this 
    }
    , getSize : function (){
      return this.domElement.clientWidth
    }
    , getOffset : function (){
      return {
        left : this.domElement.data.left, top : this.domElement.data.top
      }
    }
    , applyParentBackgroundColor : function (){
      var e, d = this.domElement, f = d.parentNode.style.backgroundColor;
      return e = f ? f : "white", d.style.backgroundColor = e, this 
    }
    , show : function (){
      this.domElement.style.display = "block"
    }
    , hide : function (){
      this.domElement.style.display = "none"
    }
    , registerDrag : function (){
      var d = this.domElement, c = this ;
      this.dragStart = function (b){
        return c.onDragStart(b) ,! 1
      }
      , this.dragging = function (b){
        return c.onDragging(b) ,! 1
      }
      , this.dragStop = function (b){
        return c.onDragStop(b) ,! 1
      }
      , d.addEventListener ? (d.addEventListener("mousedown", this.dragStart), d.
      addEventListener("touchstart", this.dragStart)) : d.attachEvent && d.attachEvent(
      "onmousedown", this.dragStart)
    }
    , onDragStart : function (b){
      b = window.event || b, b.touches && b.touches.length >= 2 || (document.
      addEventListener ? (document.addEventListener("mousemove", this.dragging), document
      .addEventListener("touchmove", this.dragging), document.addEventListener("mouseup", 
      this.dragStop), document.addEventListener("touchend", this.dragStop)) : document.
      attachEvent && (document.attachEvent("onmousemove", this.dragging), document.
      attachEvent("onmouseup", this.dragStop)), this._lastMousePos = Ortery.
      getCoordinates(b), this.preventDefault(b), this.stopPropagation(b))
    }
    , onDragging : function (g){
      var f, j, i, h;
      g = window.event || g, g.touches && g.touches.length >= 2 || (f = Ortery.
      getCoordinates(g), j = this.getOffset(), i = j.left + f[0] - this._lastMousePos[0]
      , h = j.top + f[1] - this._lastMousePos[1], this._lastMousePos = f, this.
      setOffset(i, h), jQuery(this.domElement).trigger("magnifierChanged", [i, h]), this 
      .preventDefault(g), this.stopPropagation(g))
    }
    , onDragStop : function (){
      document.removeEventListener ? (document.removeEventListener("mousemove", this.
      dragging), document.removeEventListener("touchmove", this.dragging), document.
      removeEventListener("mouseup", this.dragStop), document.removeEventListener(
      "touchend", this.dragStop)) : document.detachEvent && (document.detachEvent(
      "onmousemove", this.dragging), document.detachEvent("onmouseup", this.dragStop))
    }
    , bindWheel : function (){
      var d = this , c = this.domElement.parentNode;
      this.wheelScroll = function (a){
        d.onWheel(a)
      }
      , c.addEventListener ? (c.addEventListener("mousewheel", this.wheelScroll ,! 1), c.
      addEventListener("DOMMouseScroll", this.wheelScroll ,! 1)) : c.attachEvent(
      "onmousewheel", this.wheelScroll)
    }
    , onWheel : function (j){
      j = window.event || j;
      var i, p = Math.max( - 1, Math.min(1, j.wheelDelta ||- j.detail)), o = this.
      getOffset(), n = o.left, m = o.top, l = this.getSize(), k = 2 *~~ (l / 10);
      p > 0 ? l + k >= this._maxSize ? (i = this._maxSize, k = i - l) : i = k + l : 0 > 
      p && (k *=- 1, l + k <= this._minSize ? (i = this._minSize, k = i - l) : i = k + l
      ), n -= k / 2, m -= k / 2, this.resize(i, n, m), jQuery(this.domElement).trigger(
      "magnifierChanged", [n, m]), this.preventDefault(j), this.stopPropagation(j)
    }
    , unbindWheel : function (){
      var b = this.domElement.parentNode;
      b.removeEventListener ? (b.removeEventListener("mousewheel", this.wheelScroll), b.
      removeEventListener("DOMMouseScroll", this.wheelScroll)) : b.detachEvent(
      "onmousewheel", this.onWheel)
    }
    , bindPinch : function (){
      var d = this , c = this.domElement.parentNode;
      this.pinchStart = function (a){
        return d.onPichStart(a) ,! 1
      }
      , this.pinchChange = function (a){
        return d.onPinch(a) ,! 1
      }
      , this.pinchEnd = function (a){
        return d.onPinchEnd(a) ,! 1
      }
      , "ongesturestart"in window ? c.addEventListener("gesturestart", this.pinchStart ,! 
      1) : this.magHammertime && this.magHammertime.on("transformstart", this.
      pinchStart)
    }
    , onPichStart : function (){
      var d, c;
      this.originSize = this.getSize(), this.originPos = this.getOffset(), c = this.
      magHammertime, "ongesturestart"in window ? (d = this.domElement.parentNode, d.
      addEventListener("gesturechange", this.pinchChange ,! 1), d.addEventListener(
      "gestureend", this.pinchEnd ,! 1)) : c && (c.on("transform", this.pinchChange), c.
      on("transformend", this.pinchEnd))
    }
    , onPinch : function (j){
      var i, p = this.originPos, o = p.left, n = p.top, m = j.scale || j.gesture.scale, l
       = this.originSize, k =~~ (l * m);
      k > this._maxSize ? k = this._maxSize : k < this._minSize && (k = this._minSize)
      , i = k - l, o -= i / 2, n -= i/2,this.resize(k,o,n),jQuery(this.domElement).trigger("magnifierChanged"),
      this.preventDefault(j),this.stopPropagation(j)
      },
      onPinchEnd:function(){
      var d,c;"ongesturestart"in window?(d=this.domElement.parentNode,
      d.removeEventListener("gesturechange",this.pinchChange),d.removeEventListener("gestureend",this.pinchEnd)):this.magHammertime&&(c=this.magHammertime,c.off("transform",this.pinchChange),
    		  c.off("transformend",this.pinchEnd))
      },
      unbindPinch:function(){
    	  this.domElement.parentNode.removeEventListener("gesturechange",this.pinchChange)
      },
      preventDefault:function(b){
    	  b.preventDefault&&b.preventDefault(),b.returnValue=!1},
      stopPropagation:function(b){
    	  b.stopPropagation&&b.stopPropagation(),b.cancelBunbble=!0}
      }
}(),function(){
Ortery.Rotate=function(){}
,Ortery.Rotate.prototype={}}()
,function(){
	Ortery.Zoom=function(g,f,j,i,h){
	this.maxRatio=i||4,this.minRatio=h||0.25,this.zoomedRatio=1,this.object=g},
	Ortery.Zoom.prototype={
	getValidRatio:function(g){
		var f=this.maxRatio,j=this.minRatio,i=this.zoomedRatio,
		h=i*g;return h>f?f/i : j > h ? j / i : g
    }
    , getNewSize : function (d){
      var c = this.object;
      return [c.qzQJX429O1c * d, c.qzQJX429O1c * d]
    }
    , getNewOffset : function (d){
      var c = this.object;
      return [c.bRgDKeXSmar * d, c.WsBERq2aDwM * d]
    }
    , initWheelData : function (d){
      var c = this ;
      this.SCROLL_IN_RATIO = d || 1.2, this.SCROLL_OUT_RATIO = 1 / d, this.scrolling = 
      function (b){
        b = window.event || b, c.onWheel(b), c.preventDefault(b), c.stopPropagation(b)
      }
    }
    , bindWheelScroll : function (b){
      b.addEventListener ? (b.addEventListener("mousewheel", this.scrolling ,! 1), b.
      addEventListener("DOMMouseScroll", this.scrolling ,! 1)) : b.attachEvent(
      "onmousewheel", this.scrolling)
    }
    , onWheel : function (e){
      var d, f = Math.max( - 1, Math.min(1, e.wheelDelta ||- e.detail));
      if (d = getValidRatio(f > 0 ? this.SCROLL_IN_RATIO : this.SCROLL_OUT_RATIO), this 
      .zoomedRatio !== d){
        this.getNewSize(d), this.getNewOffset(d);
        this.zoomedRatio = d
      }
    }
    , unbindWheelScroll : function (){
      listener.removeEventListener ? (listener.removeEventListener("mousewheel", this.
      scrolling ,! 1), listener.removeEventListener("DOMMouseScroll", this.scrolling ,! 1
      )) : listener.detachEvent("onmousewheel", this.scrolling)
    }
    , preventDefault : function (b){
      b.preventDefault && b.preventDefault(), b.returnValue =! 1
    }
    , stopPropagation : function (b){
      b.stopPropagation && b.stopPropagation(), b.cancelBunbble =! 0
    }
    , YzNpqvKSPgJ : function (j, i, p){
      var o = this.object, n = p ? p[0] : o.bRgDKeXSmar, m = p ? p[1] : o.WsBERq2aDwM, l = 
      n * j, k = m * j;
      p0URicG3K5g ? o.hg78gccLEho(i[0], i[1], l, k) : this.hg78gccLEho(i[0], i[1], o.
      nCByR7f4Tly.width() * (1 - j) / 2 + l, o.nCByR7f4Tly.height() * (1 - j) / 2 + k)
    }
    , hg78gccLEho : function (f, e, h, g){
      this.ZMlaaryiYDe(f, e), this.qPg9NKxm8e2(h, g)
    }
    , ZMlaaryiYDe : function (e, d){
      var f = this.object;
      f.qzQJX429O1c = e, f.ABJvA9rDSZ6 = d, p0URicG3K5g || f.aZdQe4pwxJ7.width(e).height(d
      )
    }
    , qPg9NKxm8e2 : function (e, d){
      var f = this.object;
      f.bRgDKeXSmar = e, f.WsBERq2aDwM = d, p0URicG3K5g || this.LCNPfnZMXxn(e, d)
    }
    , LCNPfnZMXxn : function (g, f){
      var j = this.object, i = Math.round(g), h = Math.round(f);
      j.aZdQe4pwxJ7.css(!$.browser.msie && j.Eqp0cmrzA8v ? {
        "margin-left" : j.nCByR7f4Tly.width() - j.qzQJX429O1c - i, "margin-top" : j.
        nCByR7f4Tly.height() - j.ABJvA9rDSZ6 - h
      }
       : {
        "margin-left" : i, "margin-top" : h
      }
      )
    }
  }
}
(), function (x, w, v){
  var u = Ortery.environment, t = u.ViK1w9I3qSj, s = u.gjV6o7XtjQE, r = u.isIOSDevice, q = 
  u.p0URicG3K5g, p = u.DGbNr1m4PDc, o = u.hk7lq4TY3Zi, n = u.isOldIE, m = "ongesturestart"
  in v;
  x.extend(Ortery.Button.prototype, {
    enable : function (){
      var b = this.domElement;
      b.className = b.className.replace(/^(btnHoverEffectDisabled)$/i, "btnHoverEffect")
    }
    , disable : function (){
      var b = this.domElement;
      b.className = b.className.replace(/^(btnHoverEffect)$/i, "btnHoverEffectDisabled"
      )
    }
  }
  ), x.extend(Ortery.Magnifier.prototype, {
    initHammer : function (d){
      var c = Hammer(d, {
        drag :! 1, hold :! 1, show_touches :! 1, swipe :! 1, tap :! 1, touch :! 1
      }
      );
      this.magHammertime = c
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    Qi84rdqsacT : function (a, l, k){
      var j = k[0], i = k[1], h = a[0]._callback;
      this.HxmW8GQUpXb = l, this.hN1erQNwYg6 = x.extend([], i), x.extend(this , j), 
      "thirdParty" === this.producer && (q =! 1, this.producer = null), x(a[0]).data(
      "bePartner") && (this.ElSEJhGrEEr =! 1), this.ut6MKiFirc5 = a[0].ut6MKiFirc5, a[0
      ]._operateAnimation = this.KNlr0kTPIw2(), this.HW4ywkFkY3j().OkdZQA1JhXz(a, i).
      zxixszmZXfQ().uSiFJ1AMrlO().joNQY2RZ0Wq().MKOgDsnJgjy(), h && h && h.constructor && 
      h.call && h.apply && h.call(a[0], l)
    }
    , HW4ywkFkY3j : function (){
      return this.bCxwsdBxXdX = this.BsWo0BzEc8o && 0 === this.hwRu8RgEokB ? this.
      N569BzTl4FA - 1 : 0, this.x2UklZHYFjx = 0, this.RiWjrEA4iCs = 0, this.lXFRoaPaply
       = this.Qza9178cmsR + this.itiOAGUtogE + "/", "cylindrical" !== this.WHPkz4ocodZ
       && (this.qA6xR6yItRY.A9nQ9YvvBDQ = {
      }
      , this.DmzT1McqHog.A9nQ9YvvBDQ = {
      }
      , this.Cob3EQnRmfv = this.qA6xR6yItRY(0 ,! 1)), this.Eqp0cmrzA8v =! 1, (!q || 
      "spherical" !== this.WHPkz4ocodZ || this.isConcurrent) && (this.ElSEJhGrEEr =! 1)
      , this.q7dxUE1n1P2 =! 1, this.ohaX9EVshI2 =! 1, this.rCBZ924CoFl = 2 === this.
      roxiyseeVWt ?! 0 :! 1, this.itiOAGUtogE = null, this 
    }
    , uSiFJ1AMrlO : function (){
      var F, E, D, C, B, A = this.nCByR7f4Tly.width(), z = this.nCByR7f4Tly.height(), y = 
      Ortery.getSizeToFitContainer([A, z], this.a7YX4DsL5Ty / this.nFnazX5xcs9), h = y[0
      ], a = y[1];
      return q ? (B = this.aZdQe4pwxJ7[0], B.width = A, B.height = z, this.wkXfNVDZgjv = 
      B.getContext("2d"), F = 0, E = 0, D = F, C = E) : (F = (A - h) / 2, E = (z - a) / 2)
      , this.useSpriteImg ? (this.bhG1vqAVmN5 = this.rkdMBzodXH4, this.Gzn80VANsP4 = 
      this.HElLpL4g3Cd) : (this.bhG1vqAVmN5 = 0.25 * this.a7YX4DsL5Ty, this.
      Gzn80VANsP4 = 0.25 * this.nFnazX5xcs9), this.iHgDSCUUcWw && this.Y0lnt9fFutw(), 
      this.XDC1pe5lm6C(h, a, F, E), this.Muc2tbhAPVV = this.bhG1vqAVmN5 > h ? h : this 
      .bhG1vqAVmN5, this.Z8WmcagQh5w = this.Gzn80VANsP4 > a ? a : this.Gzn80VANsP4, q || 
      (D = (A - this.Muc2tbhAPVV) / 2, C = (z - this.Z8WmcagQh5w) / 2), this.
      ryhlXYGMdQg =~~ (h * this.rW6t5CtRDm1), this.sPws6J9uwE2 =~~ (a * this.
      rW6t5CtRDm1), this.sTtnRSADRel =~~ (h * this.Cs3viULhwSb), this.frZjUmjYdRP =~~ (
      a * this.Cs3viULhwSb), this.rW6t5CtRDm1 = null, this.Cs3viULhwSb = null, this.
      ZGTf9Cx3NuF = 0, this.ryhlXYGMdQg > this.a7YX4DsL5Ty && (this.ryhlXYGMdQg = this 
      .a7YX4DsL5Ty), this.sPws6J9uwE2 > this.nFnazX5xcs9 && (this.sPws6J9uwE2 = this.
      nFnazX5xcs9), this.rLzYbq2i0SP.hide(), this.pYBFZ99pfjo ? x.support.opacity && 
      this.rLzYbq2i0SP.css("background-color", "rgba(0, 0, 0, 0.2)") : this.rLzYbq2i0SP.
      remove(), 1 === this.roxiyseeVWt ? this.hg78gccLEho(this.Muc2tbhAPVV, this.
      Z8WmcagQh5w, D, C) : this.hg78gccLEho(h, a, F, E), this.aZdQe4pwxJ7.css(
      "visibility", "inherit"), this.xeiUGuhH6MS(), this.rkdMBzodXH4 = null, this.
      HElLpL4g3Cd = null, this 
    }
    , zxixszmZXfQ : function (){
      return this.xeiUGuhH6MS = this.odhLNs8pqSS(), this.bQ3jDAkro3y = this.
      U07xZDaUL5K(), "cylindrical" !== this.WHPkz4ocodZ && (this.tukUPz2gFB9 = this.
      fnWbwur5hBi()), this 
    }
    , XDC1pe5lm6C : function (P, O, N, M){
      var L, K, J, I, H, G, F, E, D, C, B, A = Ortery.getSizeToFitContainer(this.
      z6BTIDH68yN, this.a7YX4DsL5Ty / this.nFnazX5xcs9), z = A[0], y = A[1], h = 0;
      for (this.DBS85HeoDhV = [], this.qrIGzYBmvg5 = [], this.mafG3iVPwau = [], 
      "cylindrical" !== this.WHPkz4ocodZ ? (K = [[45, 0, 0, 0, 0, 0, 0, 0, 0, 0], [23, 68
      , 0, 0, 0, 0, 0, 0, 0, 0], [15, 45, 75, 0, 0, 0, 0, 0, 0, 0], [11, 34, 56, 79, 0, 0, 
      0, 0, 0, 0], [9, 27, 45, 63, 81, 0, 0, 0, 0, 0], [8, 23, 38, 53, 68, 83, 0, 0, 0, 0]
      , [6, 19, 32, 45, 58, 71, 84, 0, 0, 0], [6, 17, 28, 39, 51, 62, 73, 84, 0, 0], [5, 
      15, 25, 35, 45, 55, 65, 75, 85, 0], [5, 14, 23, 32, 41, 50, 59, 68, 77, 86]], J = (
      "spherical" === this.WHPkz4ocodZ ? this.ibHLlbN8krz / 2 : this.ibHLlbN8krz) - 1, 
      L = K[J]) : L = [45, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.XnnZhZgZeN1.A9nQ9YvvBDQ = {
      }
      , I = this.hN1erQNwYg6.length, 0 === I && (E = 0, D = 0, q || (E = N, D = M), this 
      .DBS85HeoDhV.push([0, 0]), this.qrIGzYBmvg5.push([z, y]), this.mafG3iVPwau.push([E
      , D]));
      I > h;
      h ++ ){
        H = this.hN1erQNwYg6[h].tB8vK3ay7Vq, G = H.H2nXXQc8T27 * z, F = H.H2nXXQc8T27 * y
        , E = H.lxVoWV4Y2RT.x, D = H.lxVoWV4Y2RT.y, q || (C = G - P, B = F - O, E = N + E - 
        Math.round(C / 2), D = M + D - Math.round(B / 2)), this.DBS85HeoDhV.push(this.
        XnnZhZgZeN1(H.ak2gYBJ955P, H.g1WhmjvC1cN, L)), this.qrIGzYBmvg5.push([G, F]), 
        this.mafG3iVPwau.push([E, D]), this.hN1erQNwYg6[h].tB8vK3ay7Vq = null
      }
    }
    , ySLToVLNnVM : function (){
      this.bCxwsdBxXdX = this.DBS85HeoDhV[0][0], this.x2UklZHYFjx = this.DBS85HeoDhV[0
      ][1], this.DBS85HeoDhV[0][2] && (this.bCxwsdBxXdX = this.yWmvgnwDAUT(180, this.
      bCxwsdBxXdX)), this.hg78gccLEho(this.qrIGzYBmvg5[0][0], this.qrIGzYBmvg5[0][1], 
      this.mafG3iVPwau[0][0], this.mafG3iVPwau[0][1]), this.xeiUGuhH6MS(), this.
      PlAo8puZLCx()
    }
    , MKOgDsnJgjy : function (){
      2 !== this.roxiyseeVWt || p && 0 !== this.hN1erQNwYg6.length || (this.roxiyseeVWt
       = 1), this.RiWjrEA4iCs =- 1 ,- 1 === this.roxiyseeVWt ? ("hemispherical" === this 
      .WHPkz4ocodZ && x(this ).data("arriveNorth" ,! 1), this.KNiSHHExuA3(!1)) : 0 === 
      this.roxiyseeVWt ? (this.ySLToVLNnVM(), this.rCYeBenyIOM({
        spin :! 1, svg :! 0
      }
      )) : 1 === this.roxiyseeVWt ? ("hemispherical" === this.WHPkz4ocodZ && x(this ).data(
      "arriveNorth" ,! 1), this.KNiSHHExuA3(!0)) : 2 === this.roxiyseeVWt ? (this.
      ySLToVLNnVM(), this.h1DBXdAY6KR(!1)) : this.PlAo8puZLCx(), this.roxiyseeVWt = 
      null    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    OkdZQA1JhXz : function (h, e){
      var l, k = this , j = 0, i = e.length;
      if (this.ZIOW6rED6Mh(h), o){
        for (;
        i > j; j ++ ){
          e[j].pageAudio && this.jr9T7O7nVSd(e, j)
        }
      }
      return 0 !== i && ("photo" === this.tSQHmWyTM8b || "combo" === this.tSQHmWyTM8b ? 
      (k = this , (l = function (){
        i === k.pagePhotoArray.length ? (k.Fr370i8gbhC(k.pagePhotoArray).KxbOdGEmhIM(), k.
        pagePhotoArray = null) : setTimeout(l, 100)
      }
      )()) : "text" === this.tSQHmWyTM8b && this.Fr370i8gbhC().KxbOdGEmhIM()), t || this.
      t7pTHFsbZaG(), this.RCbIg1LCz39 && this.bv3Cz4Z8yzL(this.lXFRoaPaply), (this.
      RCbIg1LCz39 || this.Sjx4PFuOKnn) && this.ZbLypGCi2Gw(), this.UV5QAvr2Pqr.show && 
      this.YLgPdYSP3fe(), this.V9kxKd3yJcH(), this.U36JBGhGIaf && this.jNlms4GVANT(e), 
      this.f632t3bDAKY && this.HbDPz5b46sm(), this.mediaType && this.s1R4QC3Ku1r(), 
      this 
    }
    , ZIOW6rED6Mh : function (B){
      var A, z, y, l, h = w.createElement("div"), b = w.createDocumentFragment(), a = x(q ? 
      "<canvas></canvas>" : '<img galleryimg = "no" />');
      h.className = "animateViewerPhoto", b.appendChild(h), (this.xGQtTmerVr5 && "hide"
       !== this.xGQtTmerVr5 || this.q8J9u9AjZ2M && "hide" !== this.q8J9u9AjZ2M || this 
      .VJmEqGoppen && "hide" !== this.VJmEqGoppen) && (A = w.createElement("div"), A.
      className = "animateViewerBtnDiv", b.appendChild(A), this.RCbIg1LCz39 = x(A)), (
      "text" === this.tSQHmWyTM8b || "photo" === this.tSQHmWyTM8b || "combo" === this.
      tSQHmWyTM8b) && (z = w.createElement("div"), z.className = "animateViewerPageBtnDiv"
      , b.appendChild(z), this.Sjx4PFuOKnn = x(z)), this.mediaType && (l = w.
      createElement("div"), l.className = "animateViewrMediaDiv", b.appendChild(l)), this 
      .U36JBGhGIaf && (y = w.createElement("div"), y.className = "animateViewerSvgDiv", h.
      appendChild(y), this.UIfMFHWVG4x = x(y)), B.append(b).data("ort3d_isTurning" ,! 1), 
      a.prop("class", "animateViewerDisplayer").appendTo(h), this.aZdQe4pwxJ7 = a, this.
      nCByR7f4Tly = B, this.XSobPo3R6RZ = x(h), this.rLzYbq2i0SP = B.find(
      ".animateViewerLoader")
    }
    , YLgPdYSP3fe : function (){
      var a = x('<button class = "animateViewerHintBtn">?</button>'), h = x(
      '<div class = "animateViewerHintDiv"></div>'), g = x(
      '<div class = "animateViewerHintTextDiv"></div>'), f = this.UV5QAvr2Pqr;
      this.nCByR7f4Tly.append(a).append(h), h.append(g).data("show" ,! 1), a.on({
        mousedown : function (){
          return h.stop(!0 ,! 0).fadeOut(1200).data("show" ,! h.data("show")) ,! 1
        }
        , click : function (){
          return !1
        }
      }
      ), f.text && g.html(f.text), this.$UV5QAvr2PqrDiv = h
    }
    , bCjqDWq1GbL : function (a){
      var h, g, f;
      return g = this.correctPathCase(this.fileNamingCase, a.filepath + ".mp3"), f = 
      this.correctPathCase(this.fileNamingCase, a.filepath + ".wav"), h = x(
      '<audio preload="none"><source src="' + g + '" type="audio/mpeg"><source src="' + f + 
      '" type="audio/wav"></audio>'), h[0].loop = a.eYHIZBk4dXm, h.attr({
        "data-lasting" : a.mYiCUQOGf7d, "data-playing" :! 1
      }
      ), a.mYiCUQOGf7d = null, h
    }
    , jr9T7O7nVSd : function (F, E){
      var D, C, B, A, z, y = F[E], l = this , a = y.pageAudio;
      a && (B = this.Qza9178cmsR, A = B + this.correctPathCase(this.fileNamingCase, 
      "AudioPlay.png"), z = B + this.correctPathCase(this.fileNamingCase, 
      "AudioHalt.png"), D = this.bCjqDWq1GbL(a)[0], D.className = 
      "animateViewerPageAudio", this.nCByR7f4Tly.append(D), this.L1dIS1xoo9X || (C = x(
      '<img class="animateViewerPageAudioPlayer" src="' + A + '" />'), C.click(function 
      (){
        var b = F[l.RiWjrEA4iCs].pageAudio.elem;
        b.paused ? (b.play(), x(b).data("playing" ,! 0), C.prop("src", z)) : (b.pause(), x
        (b).data("playing" ,! 1), C.prop("src", A))
      }
      ).appendTo(this.nCByR7f4Tly), this.L1dIS1xoo9X = C), D.addEventListener("ended", function 
      (){
        a.eYHIZBk4dXm || E !== l.RiWjrEA4iCs || x(".animateViewerPageAudioPlayer").prop(
        "src", A)
      }
      ), y.pageAudio.elem = D)
    }
    , HbDPz5b46sm : function (){
      var d, aa, Z, Y, X, W, V, U, T, S, R, Q, P, O, M, K, I, H, G, F, E, D, b, a = this.
      nCByR7f4Tly, N = a.width(), L = a.height();
      if ("Contemporary" === this.xODgjd9qySP){
        d = Math.round(L * this.YINVbkFb34w.PMYVB97f8kG / 100), aa = N > L ? N : L, Z = 
        Math.round(0.0125 * aa), Y = x(
        '<div class = "animateViewerEaselDiv"style = "width: 100%;height: ' + d + 
        "px;line-height: " + d + "px;filter:glow(color=black,strength=5);font-size: " + N / 
        20 + 'px;">' + this.XvVktYCPxS0 + "</div>"), X = x(
        '<div class = "animateViewerEaselDiv"style = "width: 100%;height: ' + Z + 
        'px;"></div>'), W = x('<div class = "animateViewerEaselDiv"style = "width: ' + Z + 
        'px;height: 100%;"></div>'), V = x(
        '<div class = "animateViewerEaselDiv"style = "width: ' + Z + 
        'px;height: 100%;right: 0px;"></div>'), U = w.createDocumentFragment(), U.
        appendChild(Y[0]), U.appendChild(X[0]), U.appendChild(W[0]), U.appendChild(V[0]), 
        a.append(U), "white" !== this.acmkkATMuCZ && (Y.css("background-color", this.
        acmkkATMuCZ), X.css("background-color", this.acmkkATMuCZ), W.css(
        "background-color", this.acmkkATMuCZ), V.css("background-color", this.
        acmkkATMuCZ)), "top" === this.YINVbkFb34w.location ? (Y.css("top", "0px"), X.css(
        "bottom", "0px")) : "bottom" === this.YINVbkFb34w.location && (Y.css("bottom", 
        "0px"), X.css("top", "0px")), W.css("top", "0px"), V.css("top", "0px")
      }
      else {
        if ("Flash Bar" === this.xODgjd9qySP){
          T = L * this.YINVbkFb34w.PMYVB97f8kG / 100;
          var J = this.bFVdeRZ0I4g + this.correctPathCase(this.fileNamingCase, 
          "FlashBlock.png") + "?" + Math.random();
          S = x('<div class = "animateViewerEaselDiv"style = "width: 100%;height: ' + this 
          .YINVbkFb34w.PMYVB97f8kG + "%;line-height: " + T + "px;left: " +- 5 * N + 
          "px;font-size: " + N / 20 + "px;background-image: url(" + J + ');">' + this.
          XvVktYCPxS0 + "</div>"), a.append(S), "top" === this.YINVbkFb34w.location ? S.
          css("top", "0px") : "bottom" === this.YINVbkFb34w.location && S.css("bottom", 
          "0px"), S.animate({
            left : "0px"
          }
          , this.YINVbkFb34w.V96qvlYFgLr), this.H31vrN0ZCMb = S
        }
        else {
          "Pixel Image" === this.xODgjd9qySP && (R = this.YINVbkFb34w, Q = function (){
            return x.support.opacity ? function (c){
              x(this ).css({
                "background-size" : "100% 100%", "background-image" : "url(" + c + ")"
              }
              )
            }
             : function (c){
              x(this ).css({
                background : "none", filter : 
                "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + c + 
                ", sizingMethod=scale)"
              }
              )
            }
          }
          (), M = Math.round(this.YINVbkFb34w.nudtccKv9Ju.eGViHzj19t6 * L), K = Math.round(this.
          YINVbkFb34w.ckT11Imtvmv.eGViHzj19t6 * L), G = N / this.YINVbkFb34w.nudtccKv9Ju.
          sizeW, P = Math.round(this.YINVbkFb34w.vhe2vnMu1kV.sizeW * G), O = L - M - K, I
           = Math.round(this.YINVbkFb34w.v0JnKj29Hoy.sizeW * G), H = L - M - K, F = x(
          '<div class="animateViewerEaselDiv"style="width: 100%;height:' + M + 
          'px;top: 0px;">'), E = x('<div class="animateViewerEaselDiv"style="width:' + P + 
          "px;height:" + O + "px;top: " + M + 'px;">'), D = x(
          '<div class="animateViewerEaselDiv"style="width:' + I + "px;height:" + H + 
          "px;top: " + M + 'px;right: 0px;">'), b = x(
          '<div class="animateViewerEaselDiv"style="width: 100%;height:' + K + 
          'px;bottom: 0px;">'), Q.call(F, this.correctPathCase(this.fileNamingCase, this 
          .YINVbkFb34w.nudtccKv9Ju.imgPath)), Q.call(E, this.correctPathCase(this.
          fileNamingCase, this.YINVbkFb34w.vhe2vnMu1kV.imgPath)), Q.call(D, this.
          correctPathCase(this.fileNamingCase, this.YINVbkFb34w.v0JnKj29Hoy.imgPath)), Q
          .call(b, this.correctPathCase(this.fileNamingCase, this.YINVbkFb34w.
          ckT11Imtvmv.imgPath)), U = w.createDocumentFragment(), U.appendChild(F[0]), U.
          appendChild(E[0]), U.appendChild(D[0]), U.appendChild(b[0]), a.append(U), this.
          sLRVOduo7nV = F, this.zb7sVoWYo0U = E, this.pVZK3vzSkVn = D, this.D0wIkMyOeuK
           = b, this.YINVbkFb34w.nudtccKv9Ju.imgPath = null, this.YINVbkFb34w.
          vhe2vnMu1kV.imgPath = null, this.YINVbkFb34w.v0JnKj29Hoy.imgPath = null, this.
          YINVbkFb34w.ckT11Imtvmv.imgPath = null)
        }
      }
      this.eSddq2jWA6b = null, this.acmkkATMuCZ = null
    }
    , s1R4QC3Ku1r : function (){
      var b, l, k, j = this.nCByR7f4Tly.find("div.animateViewrMediaDiv"), i = this.
      mediaType, h = this.correctPathCase(this.fileNamingCase, this.mediaSource);
      "image" === i ? (b = w.createElement("img"), b.onload = function (){
        j[0].appendChild(this )
      }
      , b.src = h) : "video" === i && (k = w.createElement("source"), k.src = h, k.type = 
      "video/mp4", l = w.createElement("video"), j.append(l), l.appendChild(k), l.loop =! 
      0, l.play())
    }
    , V9kxKd3yJcH : function (){
      var H, G, F, E, D, C, B, A, z = this.nCByR7f4Tly, y = this.jslVsp0uCl0, a = y.
      split("");
      H = parseInt(a[0] + a[1], 16) / 255, C = parseInt(a[2] + a[3], 16), B = parseInt(a[4
      ] + a[5], 16), A = parseInt(a[6] + a[7], 16), y = x.support.opacity ? "rgba(" + C + 
      ", " + B + ", " + A + ", " + H + ")" : "rgb(" + C + ", " + B + ", " + A + ")", z.css
      ({
        "text-align" : "left", overflow : "hidden", "background-color" : y
      }
      ).attr("onselectstart", "return false;"), E = z.width(), D = z.height(), this.XSobPo3R6RZ.
      css(this.iHgDSCUUcWw ===! 0 ? {
        width : "100%", height : "100%"
      }
       : {
        width : E, height : D
      }
      ), this.UIfMFHWVG4x && (G = this.z6BTIDH68yN[0], F = this.z6BTIDH68yN[1], this.
      UIfMFHWVG4x.css({
        width : G, height : F, left : (E - G) / 2, top : (D - F) / 2
      }
      )), this.jslVsp0uCl0 = null
    }
    , Y0lnt9fFutw : function (){
      var z, y, l, h, c, b, a = this ;
      return y = function (){
        var j, E, D = v.innerWidth || w.documentElement.clientWidth, C = v.innerHeight || 
        w.documentElement.clientHeight, B = a.nCByR7f4Tly, A = B.width(), k = B.height();
        j = D > A ? (D - A) / 2 : 0, E = C > k ? (C - k) / 2 : 0, B.css({
          left : j, top : E
        }
        )
      }
      , q ? (l = "onorientationchange"in v, h = l ? "orientationchange" : "resize", c = 
      function (){
        var R, Q, P, O, N, M, L, K, J = v.innerWidth, I = v.innerHeight, H = J > I ? I : J
        ;
        a.wkXfNVDZgjv.canvas.width = J, a.wkXfNVDZgjv.canvas.height = I, a.radius = H / 2, 
        a.b8nCnG6eOwM && a.jIFZpKf8dM3(), a.UIfMFHWVG4x && a.UIfMFHWVG4x.css({
          left : (J - a.UIfMFHWVG4x.width()) / 2, top : (I - a.UIfMFHWVG4x.height()) / 2
        }
        ), a.f632t3bDAKY && ("Flash Bar" === a.xODgjd9qySP ? (R = I * a.YINVbkFb34w.PMYVB97f8kG / 
        100, a.H31vrN0ZCMb.css({
          "line-height" : R + "px", "font-size" : J / 20 + "px"
        }
        )) : "Pixel Image" === a.xODgjd9qySP && (Q = Math.round(a.YINVbkFb34w.nudtccKv9Ju.
        eGViHzj19t6 * I), P = Math.round(a.YINVbkFb34w.ckT11Imtvmv.eGViHzj19t6 * I), O = J
         / a.YINVbkFb34w.nudtccKv9Ju.sizeW, N = Math.round(a.YINVbkFb34w.vhe2vnMu1kV.sizeW
         * O), M = I - Q - P, L = Math.round(a.YINVbkFb34w.v0JnKj29Hoy.sizeW * O), K = I - 
        Q - P, a.sLRVOduo7nV.stop().animate({
          height : Q + "px"
        }
        , 200), a.D0wIkMyOeuK.stop().animate({
          height : P + "px"
        }
        , 200), a.zb7sVoWYo0U.stop().animate({
          top : Q + "px", width : N + "px", height : M + "px"
        }
        , 200), a.pVZK3vzSkVn.stop().animate({
          top : Q + "px", width : L + "px", height : K + "px"
        }
        , 200)));
        var G = Ortery.getSizeToFitContainer([J, I], this.spaceAspectRatio), F = G[0] > G
        [1] ? G[0] : G[1];
        if (0 !== F){
          var E = F / a.maxSpaceEdge;
          a.maxSpaceEdge = F;
          var D = a.Pi9U8lqljwr();
          if (a.RCbIg1LCz39){
            var C, B, A = a.RCbIg1LCz39.data("btnSize") * E;
            A > 64 && (E = 64 / a.RCbIg1LCz39.data("btnSize"), A = 64), D > A && (E = D / 
            a.RCbIg1LCz39.data("btnSize"), A = D), C = a.RCbIg1LCz39.data("left") * E, B = 
            a.RCbIg1LCz39.data("bottom") * E, a.RCbIg1LCz39.data({
              btnSize : A, left : C, bottom : B
            }
            ).stop(!0 ,! 0).animate({
              left : C, bottom : B
            }
            , 500).find("img").stop(!0 ,! 0).animate({
              width : A, height : A
            }
            , 500).each(function (){
              var d, e = x(this );
              e.data("left") || e.data("left", parseInt(e.css("left"), 10)), d = E * e.
              data("left"), e.css("left", d + "px").data("left", d)
            }
            ), a.ctrBtnSize = A
          }
          if (a.Sjx4PFuOKnn){
            var k = 0.045 * F * 0.75;
            D > k && (k = D), "text" === a.tSQHmWyTM8b ? a.I6jKuvh3IUf(a.Sjx4PFuOKnn, k) : 
            "photo" === a.tSQHmWyTM8b ? a.ZGT18hkNjhP(a.Sjx4PFuOKnn, k) : "combo" === a.
            tSQHmWyTM8b && a.STBanp9KHSi(a.Sjx4PFuOKnn, 2 * k), a.VExKeC5R4LK.css({
              width : k, height : k, right : a.Sjx4PFuOKnn.width() + k / 9 * 3
            }
            )
          }
          a.xeiUGuhH6MS(), a.PlAo8puZLCx()
        }
      }
      , b = this.iHgDSCUUcWw ===! 0 ? c : y, void x(v).resize(function (){
        clearTimeout(z), z = setTimeout(b, 100)
      }
      )) : voidx(v).resize(y)
    }
    , joNQY2RZ0Wq : function (){
      return this.FfptTSCQEyH("rotate"), this.Lp2A9EWHrCU(), t || this.yZVCMl96NRH(), 
      this.RCbIg1LCz39 && this.rR0Lps25g0a(), this.exz2oDH4hD7(), t || this.
      dHYMX8MOL9L(), this 
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    msWf1GIz7S9 : function (){
      return v.requestAnimationFrame || v.webkitResquestAnimationFrame || v.
      mozResquestAnimationFrame || v.oResquestAnimationFrame || v.msResquestAnimationFrame
       || function (b){
        v.setTimeout(b, 1000 / 60)
      }
    }
    , P8ay1oiZbSn : function (){
      return v.cancelAnimationFrame || v.webkitCancelAnimationFrame || v.
      mozCancelAnimationFrame || v.oCancelAnimationFrame || v.msCancelAnimationFrame || 
      function (b){
        clearTimeout(b)
      }
    }
    , vaIFkXfg6Hv : function (j, i){
      var B = j / 2, A = i / 2, z = this.wkXfNVDZgjv, y =- this.ZGTf9Cx3NuF * Math.PI / 
      180, l = Math.cos(y), k = Math.sin(y);
      z.setTransform(1, 0, 0, 1, 0, 0), z.clearRect(0, 0, j + 1, i + 1), this.k0GIl1n4BJ8
      (), z.setTransform(l ,- k, k, l ,- B * l +- A * k + B + this.bRgDKeXSmar, B * k +- 
      A * l + A + this.WsBERq2aDwM)
    }
    , k0GIl1n4BJ8 : function (){
      var b = this.aZdQe4pwxJ7[0];
      b.style.opacity = 0.99, setTimeout(function (){
        b.style.opacity = 1
      }
      , 1)
    }
    , odhLNs8pqSS : function (){
      var g, f, j, i;
      if (q){
        return g = this.rkdMBzodXH4, f = this.HElLpL4g3Cd, j = this.HUE9PBxg4jS, i = 
        Math.ceil(this.N569BzTl4FA / j), this.HUE9PBxg4jS = null, this.useSpriteImg ? 
        this.dZC1rRHFjVp ? function (){
          var G, F, E, D, C = this.nCByR7f4Tly, B = C.width(), A = C.height(), z = this.
          qzQJX429O1c, y = this.ABJvA9rDSZ6;
          "spherical" === this.WHPkz4ocodZ ? (G = this.x2UklZHYFjx > this.ibHLlbN8krz / 
          2 - 1 ? 1 : 0, F = this.x2UklZHYFjx % (this.ibHLlbN8krz / 2)) : (G = 0, F = 
          this.x2UklZHYFjx);
          var b, a = this.bCxwsdBxXdX + this.x2UklZHYFjx * this.N569BzTl4FA;
          a !== this.GA8lRWa6vjJ ? (b = this.HxmW8GQUpXb[G], this.jA1tYzcyGNn = b, this 
          .tsjTZmBs3v7 =! 0, this.GA8lRWa6vjJ = a) : b = this.jA1tYzcyGNn, this.
          vaIFkXfg6Hv(B, A), E = (B - z) / 2, D = (A - y) / 2, this.tsjTZmBs3v7 ? this.
          wkXfNVDZgjv.drawImage(b, this.bCxwsdBxXdX * g, F * f, g, f, E, D, z, y) : this 
          .wkXfNVDZgjv.drawImage(b, E, D, z, y)
        }
         : function (){
          var E, D, C, B, A, z = this.nCByR7f4Tly, y = z.width(), d = z.height(), c = 
          this.qzQJX429O1c, b = this.ABJvA9rDSZ6, a = this.bCxwsdBxXdX + this.
          x2UklZHYFjx * this.N569BzTl4FA;
          a !== this.GA8lRWa6vjJ ? (E = this.x2UklZHYFjx * i +~~ (this.bCxwsdBxXdX / j)
          , A = this.HxmW8GQUpXb[E], this.jA1tYzcyGNn = A, this.tsjTZmBs3v7 =! 0, this 
          .GA8lRWa6vjJ = a) : A = this.jA1tYzcyGNn, this.vaIFkXfg6Hv(y, d), C = (y - c) / 
          2, B = (d - b) / 2, D = this.bCxwsdBxXdX % j, this.tsjTZmBs3v7 ? r ? this.
          iz9Rvp5Tpmu(this.wkXfNVDZgjv, A, D * g, 0, g, f, C, B, c, b) : this.
          wkXfNVDZgjv.drawImage(A, D * g, 0, g, f, C, B, c, b) : r ? this.cv6daQJg3X3(
          this.wkXfNVDZgjv, A, C, B, c, b) : this.wkXfNVDZgjv.drawImage(A, C, B, c, b)
        }
         : function (){
          var E, D, C, B, A = this.nCByR7f4Tly, z = A.width(), y = A.height(), l = this.
          qzQJX429O1c, k = this.ABJvA9rDSZ6;
          E = this.bCxwsdBxXdX + this.x2UklZHYFjx * this.N569BzTl4FA, E !== this.
          GA8lRWa6vjJ ? (B = this.HxmW8GQUpXb[E], this.jA1tYzcyGNn = B, this.
          GA8lRWa6vjJ = E) : B = this.jA1tYzcyGNn, this.vaIFkXfg6Hv(z, y), D = (z - l) / 
          2, C = (y - k) / 2, r ? this.cv6daQJg3X3(this.wkXfNVDZgjv, B, D, C, l, k) : 
          this.wkXfNVDZgjv.drawImage(B, D, C, l, k)
        }
      }
      var h = this.aZdQe4pwxJ7[0];
      return function (){
        var d, c = this.bCxwsdBxXdX % this.N569BzTl4FA + this.x2UklZHYFjx * this.
        N569BzTl4FA;
        c !== this.GA8lRWa6vjJ ? (d = this.HxmW8GQUpXb[c], this.jA1tYzcyGNn = d, this.
        GA8lRWa6vjJ = c) : d = this.jA1tYzcyGNn, h.src = d.src
      }
    }
    , detectVerticalSquash : function (F){
      var E = F.naturalHeight, D = w.createElement("canvas");
      D.width = 1, D.height = E;
      var C = D.getContext("2d");
      C.drawImage(F, 0, 0);
      for (var B = C.getImageData(0, 0, 1, E).data, A = 0, z = E, y = E;
      y > A;
      ){
        var l = B[4 * (y - 1) + 3];
        0 === l ? z = y : A = y, y = z + A >> 1
      }
      var b = y / E;
      return 0 === b ? 1 : b
    }
    , cv6daQJg3X3 : function (i, h, z, y, l, k){
      var j = this.detectVerticalSquash(h);
      i.drawImage(h, z, y, l, k / j)
    }
    , iz9Rvp5Tpmu : function (H, G, F, E, D, C, B, A, z, y){
      var l = this.detectVerticalSquash(G);
      H.drawImage(G, F, E, D, C, B, A, z, y / l)
    }
    , U07xZDaUL5K : function (){
      var b = this.WHPkz4ocodZ;
      return "cylindrical" === b ? function (d, c){
        return d + this.correctPathCase(this.fileNamingCase, "img" + c + ".jpg")
      }
       : "hemispherical" === b ? function (d, c){
        return d + this.correctPathCase(this.fileNamingCase, "N" + (this.x2UklZHYFjx + 
        1) + "-" + c + ".jpg")
      }
       : "spherical" === b ? function (h, g){
        var l = this.x2UklZHYFjx, k = this.ibHLlbN8krz / 2, j = l > k - 1 ? "S" : "N", i
         = "S" === j ? l - k : l;
        return h + this.correctPathCase(this.fileNamingCase, j + (i + 1) + "-" + g + 
        ".jpg")
      }
       : void0
    }
    , fnWbwur5hBi : function (){
      return "spherical" === this.WHPkz4ocodZ ? function (b){
        this.Cob3EQnRmfv = (this.Cob3EQnRmfv + b) % (2 * this.ibHLlbN8krz), this.
        bCxwsdBxXdX = this.AiaiOZHbdbc(this.bCxwsdBxXdX) % this.N569BzTl4FA
      }
       : function (d){
        var c = this.x2UklZHYFjx;
        c += d, c > this.ibHLlbN8krz - 1 ? c = this.ibHLlbN8krz - 1 : 0 > c && (c = 0), 
        this.x2UklZHYFjx = c
      }
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    Pi9U8lqljwr : function (){
      var b, d = w.createElement("div");
      return w.body.appendChild(d), d.style.width = "0.25in", d.style.padding = "0", b = d
      .offsetWidth, d.parentNode.removeChild(d), b
    }
    , bv3Cz4Z8yzL : function (h){
      var i, ab, aa, Z, Y, X, W, V, U, T, S, Q, O, M, K, I, G = 0, e = 0, c = this.
      Pi9U8lqljwr(), b = this.ctrBtnSize > c ? this.ctrBtnSize : c, a = b / 8, R = b / 4
      , P = w.createDocumentFragment(), N = this ;
      i = function (){
        var d;
        return x.support.opacity ? function (g){
        	//EZ - remove some buttons
        	if(g == 'MoveRotate' || g == 'MovePan') {
        		return false;
        	}// EZ end 
          var f = N.correctPathCase(N.fileNamingCase, h + g + ".png");
          return d = x('<img class = "animateViewer' + g + '" src="' + f + 
          '" style = " width:' + b + "px; height:" + b + 'px;" />'), P.appendChild(d[0]), 
          d
        }
         : function (g){
          var f = N.correctPathCase(N.fileNamingCase, h + g + ".png");
          return d = x('<div class = "animateViewer' + g + 
          '" style = "filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + f
           + ", sizingMethod=scale); background: none; width:" + b + "px; height:" + b + 
          'px;position:absolute;bottom:0px;"></div>'), P.appendChild(d[0]), d
        }
      }
      (), this.xGQtTmerVr5 && "hide" !== this.xGQtTmerVr5 && (ab = i("MovePan"), "switch" === 
      this.xGQtTmerVr5 && (aa = i("MoveRotate"))), this.q8J9u9AjZ2M && "hide" !== this.
      q8J9u9AjZ2M && (Z = i("ZoomIn"), Y = i("ZoomOut")), this.VJmEqGoppen && "hide" !== 
      this.VJmEqGoppen && (X = i("PlayStart"), "switch" === this.VJmEqGoppen && (W = i(
      "PlayStop"))), this.pYBFZ99pfjo && (V = i("Magnifier")), this.RCbIg1LCz39.append(P
      ), K = 0, ab && (e += 1, G += 1, I += a, K += b, t || ab.addClass(
      "animateViewerEffectBtn"), this.VKVlylGmhyU = ab, "switch" === this.xGQtTmerVr5 && 
      (ab.css("left", K + a), aa.addClass("animateViewerBtnDisabled"), G += 1, K += b + a, 
      this.JxGcbLL206b = aa)), Z && (e += 1, G += 2, 1 !== e ? (Z.css("left", K + R), K += 
      b + R) : K += b, Y.css("left", K + a), K += b + a, t || (Z.addClass(
      "animateViewerEffectBtn"), Y.addClass("animateViewerEffectBtn")), this.E5e8onyZeOG = 
      Z, this.kTHuVIGTWNl = Y), X && (e += 1, G += 1, 1 !== e ? (X.css("left", K + R), K
       += b + R) : K += b, t || X.addClass("animateViewerEffectBtn"), this.uMBNyW14VKB = 
      X, "switch" === this.VJmEqGoppen && (G += 1, W.css("left", K + a).addClass(
      "animateViewerBtnDisabled"), K += b + a, this.FQA4hVfhcCH = W)), this.pYBFZ99pfjo
       && (e += 1, G += 1, 1 !== e && V.css("left", K + R), t || V.addClass(
      "animateViewerEffectBtn"), this.bghTGZnv05N = V, K += b + a), U && (T = 200, S = x(
      '<img class="animateViewerQRImg" style="width:' + T + "px;height:" + T + 'px;" />'), 
      Q = x('<div class="animateViewerQRLightbox"></div>'), this.nCByR7f4Tly.append(Q), O
       = (Q[0].offsetWidth - T) / 2, M = (Q[0].offsetHeight - T) / 2, S.prop("src", 
      "http://chart.apis.google.com/chart?chs=" + T + "x" + T + "&chl=" + v.location + 
      "&choe=UTF-8&cht=qr").css({
        left : O, top : M
      }
      ).appendTo(Q), e += 1, G += 1, 1 !== e && U.css("left", K + R), t || U.addClass(
      "animateViewerEffectBtn"), this.Ex0UBcLgacA = U, this.zEs3Ck6w3bc = Q, this.
      WB5gRraqUtw = S, Q.on("mousedown touchstart", function (){
        x(this ).hide()
      }
      )), I = R * (e - 1) + a * (G - 1) + b * G;
      var L = Ortery.getSizeToFitContainer([this.nCByR7f4Tly.width(), this.nCByR7f4Tly.
      height()], this.spaceAspectRatio), J = L[0] > L[1] ? L[0] : L[1], H = J / 4000;
      return this.ctrDivBottom = this.e8UmU9TsEtP * H, this.RCbIg1LCz39.css({
        width : I, left : this.oc7df0jpKMZ * H, bottom :- (1.5 * this.ctrBtnSize + this 
        .ctrDivBottom)
      }
      ).on("mousedown touchstart", function (d){
        N.vvCxH1Lg0Hr(d.originalEvent)
      }
      ).data({
        btnSize : b, left : this.oc7df0jpKMZ * H, bottom :- (1.5 * this.ctrBtnSize + 
        this.ctrDivBottom)
      }
      ), this.oc7df0jpKMZ = null, this 
    }
    , ZbLypGCi2Gw : function (){
      function F(d, c){
        y.RCbIg1LCz39.css("bottom", d).stop(!0 ,! 0).show().animate({
          bottom : y.ctrDivBottom
        }
        , c).data("bottom", y.ctrDivBottom)
      }
      function E(d, f){
        y.RCbIg1LCz39.stop(!0 ,! 0).animate({
          bottom : d
        }
        , f, function (){
          x(this ).hide()
        }
        ).data("bottom", d)
      }
      function D(b){
        y.Sjx4PFuOKnn.add(y.VExKeC5R4LK).stop(!0 ,! 0).show().animate({
          bottom : y.Sjx4PFuOKnn.css("right")
        }
        , b)
      }
      function C(c){
        y.Sjx4PFuOKnn.add(y.VExKeC5R4LK).stop(!0 ,! 0).animate({
          bottom : 1.5 *- y.Sjx4PFuOKnn.height()
        }
        , c, function (){
          x(this ).hide()
        }
        )
      }
      function B(g){
        var k = this.src, j = k.lastIndexOf("/") + 1, i = k.substring(0, j), h = i + y.
        correctPathCase(y.fileNamingCase, g + ".png");
        x(this ).attr("src", h), x.support.opacity || x(this ).css("filter", 
        "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + h + 
        ", sizingMethod=scale)")
      }
      function A(){
        var b, g, f = 0, d = 500, c =- (1.5 * y.ctrBtnSize + y.ctrDivBottom);
        3 === a ? (y.RCbIg1LCz39 && E(c, d), y.Sjx4PFuOKnn && C(d), a = 0, B.call(this , 
        "ButtonsOn")) : (y.RCbIg1LCz39 && (b = y.RCbIg1LCz39.children("img, div").last(), 
        f = parseInt(y.RCbIg1LCz39.css("left"), 10) + parseInt(b.css("left"), 10) + 
        parseInt(b.css("width"), 10)), y.Sjx4PFuOKnn && (g = parseInt(y.nCByR7f4Tly.width
        (), 10) - parseInt(y.VExKeC5R4LK.css("right"), 10) - parseInt(y.VExKeC5R4LK.css(
        "width"), 10), g > f && (a = 2)), 0 === a ? y.RCbIg1LCz39 ? (F(c, d), a = 1, y.
        Sjx4PFuOKnn || B.call(this , "ButtonsOff")) : y.Sjx4PFuOKnn && (D(d), a = 3, B.
        call(this , "ButtonsOff")) : 1 === a ? y.Sjx4PFuOKnn ? (D(d), E(c, d), a = 3, B.
        call(this , "ButtonsOff")) : (E(c, d), a = 0, B.call(this , "ButtonsOn")) : (y.
        RCbIg1LCz39 && (y.RCbIg1LCz39.stop(!0 ,! 0).is(":visible") || F(c, d)), y.
        Sjx4PFuOKnn && D(d), B.call(this , "ButtonsOff"), a = 3))
      }
      var z, y = this , e = this.Qza9178cmsR + this.correctPathCase(this.fileNamingCase
      , "ButtonsOn.png");
      z = x(x.support.opacity ? '<img class="animateViewerToggleCtrBtn" src="' + e + 
      '" />' : '<div class="animateViewerToggleCtrBtn" src="' + e + 
      '" style = "filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + e + 
      ', sizingMethod=scale); background: none;display:none;"></div>'), t || z.addClass(
      "animateViewerEffectBtn"), this.nCByR7f4Tly.append(z);
      var a = 0;
      z.on({
        click : function (){
          var d, f;
          if (y.d5zewV5xz9O(x(this )), y.isConcurrent){
            for (f = y.ut6MKiFirc5.length, d = 0; f > d; d ++ ){
              x(y.ut6MKiFirc5[d]).find(".animateViewerToggleCtrBtn").trigger(
              "conCurrentClick")
            }
          }
          A.call(this )
        }
        , conCurrentClick : function (){
          A.call(this )
        }
      }
      ).data("show" ,! 1).css("height", z.css("width")),
      this.cJveHRVsDRk && z.trigger("conCurrentClick"), 
      z.hide(),
      this.cJveHRVsDRk = null
    }
    , I6jKuvh3IUf : function (a, z){
      for (var y, l = 0, k = 0.5 * z, j = z / 9, i = 0; i < this.hN1erQNwYg6.length; i ++ 
      ){
        y = parseInt(this.ZmhwPSGImzg(this.hN1erQNwYg6[i].YfUS0EVLDDs, "normal", 
        "normal", k, "Arial").width, 10), y > l && (l = y + 4 * j)
      }
      x(a).find("button.animateViewerPageBtn").css({
        width : 1.1 * l, "font-size" : k + "px", height : z + "px"
      }
      )
    }
    , ZGT18hkNjhP : function (a, j){
      var i = 8 * j / 3, h = 2 * j, g = j / 18;
      1 >= g && (g = 1), x(a).find("div.animateViewerPageBlock").css({
        width : i, height : h, "border-width" : g
      }
      ).find("img").each(function (){
        var b = Ortery.getSizeToFitContainer([i, h], this.naturalWidth / this.
        naturalHeight);
        b[0] < 1 || b[1] < 1 || (this.style.width = b[0] + "px", this.style.height = b[1
        ] + "px", this.style.left = (i - b[0]) / 2 + "px", this.style.top = (h - b[1]) / 
        2 + "px")
      }
      )
    }
    , STBanp9KHSi : function (a, l){
      var k = 4 * l / 3, j = l, i = l / 36;
      1 >= i && (i = 1);
      var h = 1.1 * l / 2 * 25 / 9;
      x(a).find("div.animateViewerPageBlock").css({
        width : k + h, height : j, "border-width" : i
      }
      ).find("button.animateViewerPageBtn").css({
        "font-size" : 0.25 * l, width : h, "min-width" : k, height : l
      }
      ).end().find("img").each(function (){
        var b = Ortery.getSizeToFitContainer([k, j], this.naturalWidth / this.
        naturalHeight);
        b[0] < 1 || b[1] < 1 || (this.style.width = b[0] + "px", this.style.height = b[1
        ] + "px", this.style.left = (k - b[0]) / 2 + "px", this.style.top = (j - b[1]) / 
        2 + "px")
      }
      )
    }
    , Fr370i8gbhC : function (V){
      var U, T, S, R, Q, P, O, N, M, L, K, J, I, H, G, F = this.hN1erQNwYg6.length, E = 
      this.Sjx4PFuOKnn, D = this.z6BTIDH68yN[0] > this.z6BTIDH68yN[1] ? this.
      z6BTIDH68yN[0] : this.z6BTIDH68yN[1], C = this.z6BTIDH68yN[0] < this.z6BTIDH68yN[
      1] ? this.z6BTIDH68yN[0] : this.z6BTIDH68yN[1], B = 0.045 * D * 0.75, A = 0, z = 
      this.Pi9U8lqljwr(), b = this ;
      if (B = B > z ? B : z, U = 8 * B / 3, T = 2 * B, S = B / 18, R = B / 9, "text" === 
      this.tSQHmWyTM8b){
        for (P = "", O = 0.5 * B, H = 0; F > H; H ++ ){
          P += '<button class = "animateViewerPageBtn">' + this.hN1erQNwYg6[H].
          YfUS0EVLDDs + "</button>", I = parseInt(this.ZmhwPSGImzg(this.hN1erQNwYg6[H].
          YfUS0EVLDDs, "normal", "normal", O, "Arial").width, 10), I > A && (A = I + 4 * R
          )
        }
        G = this.correctPathCase(this.fileNamingCase, this.lXFRoaPaply + 
        "PageControl.png"), E.html(P).find("button.animateViewerPageBtn").css({
          "background-image" : "url(" + G + ")", "white-space" : "nowrap", "min-width" : 
          "50px", padding : "0px 3px"
        }
        ), this.I6jKuvh3IUf(E, B)
      }
      else {
        if ("photo" === this.tSQHmWyTM8b){
          for (N = w.createDocumentFragment(), H = 0;
          F > H;
          H ++ ){
            M = w.createElement("div"), M.className = "animateViewerPageBlock", M.style.
            textAlign = "center", N.appendChild(M), K = V[H], M.appendChild(K), M = null
          }
          E.append(N).on({
            mousedown : function (){
              return !1
            }
            , touchstart : function (c){
              c.originalEvent.stopPropagation()
            }
          }
          , "img"), this.ZGT18hkNjhP(E, B)
        }
        else {
          if ("combo" === this.tSQHmWyTM8b){
            for (Q = 25 * B / 9, B *= 2, N = w.createDocumentFragment(), H = 0;
            F > H;
            H ++ ){
              M = w.createElement("div"), M.className = "animateViewerPageBlock", L = w.
              createElement("button"), L.className = "animateViewerPageBtn", L.innerHTML = 
              this.hN1erQNwYg6[H].YfUS0EVLDDs, N.appendChild(M), K = V[H], J = Ortery.
              getSizeToFitContainer([U, T], K.width / K.height), M.appendChild(L), M.
              appendChild(K), M = null, L = null
            }
            G = this.correctPathCase(this.fileNamingCase, this.lXFRoaPaply + 
            "PageControl.png"), E.on({
              mousedown : function (){
                return !1
              }
              , touchstart : function (c){
                c.originalEvent.stopPropagation()
              }
            }
            , "img, button.animateViewerPageBtn").append(N).find(
            "button.animateViewerPageBtn").css({
              "background-image" : "url(" + G + ")", padding : "0px 3px", position : 
              "absolute", right : "0px"
            }
            ), this.STBanp9KHSi(E, B)
          }
        }
      }
      return E.height() > C && E.css({
        height : C, "overflow-y" : "scroll"
      }
      ), E.css({
        right : R + "px", bottom : 1.5 *- E.height()
      }
      ).on("mousedown touchstart", function (c){
        b.vvCxH1Lg0Hr(c.originalEvent)
      }
      ), this.xZJvKRYlbXT(R, Q, B), this.EpQIksFhuta(), this 
    }
    , xZJvKRYlbXT : function (a, B, A){
      function z(){
        return y.b8nCnG6eOwM ?! 1 : (y.hKVprKjygye && clearTimeout(y.hKVprKjygye), y.
        rCBZ924CoFl ? (y.lvOvDxFoL1d && (clearTimeout(y.s2edS3lG6s6), y.lvOvDxFoL1d =! 1), 
        y.ZiDI8ePJik8()) : (y.ohaX9EVshI2 ? y.CWIZwvJjygd() : y.q7dxUE1n1P2 && (y.
        BjwlQNpVGsj(), y.WxeuU00W58G()), y.h1DBXdAY6KR(!0)) ,! 1)
      }
      // EZ - emove some buttons
      var y = this , l= false/*l = x('<img class = "animateViewerStartPageBtn" />')*/, k = "combo" !== 
      this.tSQHmWyTM8b ? A : A / 2, j = a + this.Sjx4PFuOKnn.width();
      k = k > 24 ? k : 24/*, this.VExKeC5R4LK = l, l.insertBefore(this.Sjx4PFuOKnn).on({
        "mousedown touchstart" : function (b){
          y.vvCxH1Lg0Hr(b.originalEvent)
        }
        , click : function (e){
          var g, f = 0;
          if (y.isConcurrent){
            for (g = y.ut6MKiFirc5.length; g > f; f ++ ){
              x(y.ut6MKiFirc5[f]).find("img.animateViewerStartPageBtn").trigger(
              "conCurrentClick", e)
            }
          }
          z()
        }
        , conCurrentClick : z
      }
      ).attr("src", this.correctPathCase(this.fileNamingCase, this.lXFRoaPaply + "PagePlay.png"
      )).css({
        right : j + 2 * a, width : k, height : k, bottom : 1.5 *- this.Sjx4PFuOKnn.height
        ()
      }
      )*/
    }
    , EpQIksFhuta : function (){
      var b;
      t && (b = navigator.userAgent, (b.match(/iPhone/i) || b.match(/iPad/i) || b.match(
      /Android/i)) && this.y7CIzEJfZwh())
    }
    , y7CIzEJfZwh : function (){
      var B, A, z, y = this , l = 0, k = 0, b = 0, a =~~ this.Sjx4PFuOKnn[0].scrollHeight
       -~~ this.Sjx4PFuOKnn.height();
      B = function (){
        x(w).off("touchend", B).off("touchmove", A), y.Sjx4PFuOKnn.off("touchstart", z).on
        ("touchstart", z)
      }
      , A = function (d){
        var c = d.originalEvent;
        return k = Ortery.getCoordinates(c)[1], k > l ? b += 10 : l > k && (b -= 10) ,- a > 
        b ? b =- a : b > 0 && (b = 0), y.Sjx4PFuOKnn.find("div").css("top", b + "px"), l = 
        k, y.MNkKOFJ6Ynh(c), y.vvCxH1Lg0Hr(c) ,! 1
      }
      , z = function (c){
        l = Ortery.getCoordinates(c.originalEvent)[1], x(w).on({
          touchmove : A, touchend : B
        }
        )
      }
      , this.Sjx4PFuOKnn.on("touchstart", z)
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    t7pTHFsbZaG : function (){
      var D, C, B, A, z, y, l, k, a = this ;
      return x("#animateViewerContMenu")[0] || (D = this.Qza9178cmsR, y = D + this.
      correctPathCase(this.fileNamingCase, "iconRotate.png"), l = D + this.
      correctPathCase(this.fileNamingCase, "iconPan.png"), x("body").append(
      '<div id = "animateViewerContMenu"><ul><li id = "animateContRotateObj"><img src = "'
       + y + '" />Rotate</li><li id = "animateContPanObj"><img src = "' + l + 
      '" />Pan</li></ul></div>'), this.KQqeBOxQNgq && this.KQqeBOxQNgq && (k = D + this 
      .correctPathCase(this.fileNamingCase, "iconLink.png"), x("#animateContPanObj").
      after('<li id = "animateContLink"><a href="' + this.sCUn8igE7fB + '"><img src = "' + 
      k + '" />' + this.KQqeBOxQNgq + "</a></li>"), this.KQqeBOxQNgq = null, this.
      KQqeBOxQNgq = null)), A = function (){
        var e, g, f;
        if (a.isConcurrent){
          for (f = a.ut6MKiFirc5.length, e = 0; f > e; e ++ ){
            g = x(a.ut6MKiFirc5[e]), g.find(".animateViewerMoveRotate").length > 0 ? g.
            find(".animateViewerMoveRotate").trigger("conCurrentClick") : "pan" === g.data
            ("ort3d_CwHYe2sA2uZ") && g.find(".animateViewerMovePan").trigger(
            "conCurrentClick")
          }
        }
      }
      , z = function (){
        var e, g, f;
        if (a.isConcurrent){
          for (f = a.ut6MKiFirc5.length, e = 0; f > e; e ++ ){
            g = x(a.ut6MKiFirc5[e]), "rotate" === g.data("ort3d_CwHYe2sA2uZ") && g.find(
            ".animateViewerMovePan").trigger("conCurrentClick")
          }
        }
      }
      , C = function (){
        "rotate" === a.CwHYe2sA2uZ || a.b8nCnG6eOwM || ("toggle" === a.xGQtTmerVr5 ? a.
        bpDRlWIzMQ4(a.VKVlylGmhyU, "MovePan.png") : "switch" === a.xGQtTmerVr5 && a.
        yHi6dfvpMGB(a.VKVlylGmhyU, a.JxGcbLL206b), a.FfptTSCQEyH("rotate"), A())
      }
      , B = function (){
        "pan" === a.CwHYe2sA2uZ || a.b8nCnG6eOwM || ("toggle" === a.xGQtTmerVr5 ? a.
        bpDRlWIzMQ4(a.VKVlylGmhyU, "MoveRotate.png") : "switch" === a.xGQtTmerVr5 && a.
        yHi6dfvpMGB(a.JxGcbLL206b, a.VKVlylGmhyU), a.FfptTSCQEyH("pan"), z())
      }
      , this.nCByR7f4Tly.contextMenu("animateViewerContMenu", {
        bindings : {
          animateContRotateObj : C, animateContPanObj : B
        }
      }
      ), this 
    }
    , yZVCMl96NRH : function (){
      var f, b, a = this ;
      f = function (c){
        if ((c.shiftKey || 16 === c.keyCode) &&! a.q7dxUE1n1P2){
          if ("pan" === a.CwHYe2sA2uZ || a.b8nCnG6eOwM){
            return 
          }
          "toggle" === a.xGQtTmerVr5 ? a.bpDRlWIzMQ4(a.VKVlylGmhyU, "MoveRotate.png") : 
          "switch" === a.xGQtTmerVr5 && a.yHi6dfvpMGB(a.JxGcbLL206b, a.VKVlylGmhyU), a.
          FfptTSCQEyH("pan")
        }
      }
      , b = function (c){
        16 !== c.keyCode || a.q7dxUE1n1P2 || "rotate" === a.CwHYe2sA2uZ || a.b8nCnG6eOwM || 
        ("toggle" === a.xGQtTmerVr5 ? a.bpDRlWIzMQ4(a.VKVlylGmhyU, "MovePan.png") : 
        "switch" === a.xGQtTmerVr5 && a.yHi6dfvpMGB(a.VKVlylGmhyU, a.JxGcbLL206b), a.
        FfptTSCQEyH("rotate"))
      }
      , x(w).on({
        keydown : f, keyup : b
      }
      )
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    rR0Lps25g0a : function (){
      return this.VKVlylGmhyU && this.TVwzS82wy4x(), this.E5e8onyZeOG && (this.
      thbUgtUn2am(), this.q8J9u9AjZ2M = null), this.uMBNyW14VKB && this.S8KISLz0hQA(), 
      this.pYBFZ99pfjo && this.eQGluh9TihI(), this.Ex0UBcLgacA && this.dM6NU4GtkBl(), 
      this.RCbIg1LCz39 && this.RCbIg1LCz39.delegate("img", "mousedown touchmove", 
      function (b){
        b.preventDefault()
      }
      ), this 
    }
    , TVwzS82wy4x : function (){
      var a, f, e = this ;
      a = function (){
        var c;
        e.b8nCnG6eOwM || (c = e.CwHYe2sA2uZ, "toggle" === e.xGQtTmerVr5 ? ("rotate" === c ? 
        (e.bpDRlWIzMQ4(e.VKVlylGmhyU, "MoveRotate.png"), e.FfptTSCQEyH("pan")) : (e.
        bpDRlWIzMQ4(e.VKVlylGmhyU, "MovePan.png"), e.FfptTSCQEyH("rotate")), e.d5zewV5xz9O
        (x(this ))) : "switch" === e.xGQtTmerVr5 && "rotate" === c && (e.yHi6dfvpMGB(e.
        JxGcbLL206b, e.VKVlylGmhyU), e.FfptTSCQEyH("pan")))
      }
      , f = function (){
        e.b8nCnG6eOwM || "rotate" !== e.CwHYe2sA2uZ && (e.yHi6dfvpMGB(e.VKVlylGmhyU, e.
        JxGcbLL206b), e.FfptTSCQEyH("rotate"))
      }
      , this.VKVlylGmhyU.on({
        click : function (){
          var i, h, d, b = "pan";
          if ("toggle" === e.xGQtTmerVr5 && (b = "rotate" === e.CwHYe2sA2uZ ? "pan" : 
          "rotate"), a.call(this ), e.isConcurrent){
            for (d = e.ut6MKiFirc5.length, i = 0; d > i; i ++ ){
              h = x(e.ut6MKiFirc5[i]), "pan" === b ? "rotate" === h.data(
              "ort3d_CwHYe2sA2uZ") && h.find(".animateViewerMovePan").trigger(
              "conCurrentClick") : "rotate" === b && (h.find(".animateViewerMoveRotate").
              length > 0 ? h.find(".animateViewerMoveRotate").trigger("conCurrentClick") : 
              "pan" === h.data("ort3d_CwHYe2sA2uZ") && h.find(".animateViewerMovePan").
              trigger("conCurrentClick"))
            }
          }
        }
        , conCurrentClick : function (){
          a.call(this )
        }
      }
      ), this.JxGcbLL206b && this.JxGcbLL206b.on({
        click : function (){
          var c, g, d;
          if (f.call(this ), e.isConcurrent){
            for (d = e.ut6MKiFirc5.length, c = 0; d > c; c ++ ){
              g = x(e.ut6MKiFirc5[c]), g.find(".animateViewerMoveRotate").length > 0 ? g.
              find(".animateViewerMoveRotate").trigger("conCurrentClick") : "pan" === g.
              data("ort3d_CwHYe2sA2uZ") && g.find(".animateViewerMovePan").trigger(
              "conCurrentClick")
            }
          }
        }
        , conCurrentClick : function (){
          f.call(this )
        }
      }
      )
    }
    , wwwsj71grAr : function (D, C){
      var B, A, z, y, l = D.type, k = 1 + this.m9ugat5Q70k, j = 1 / k;
      this.b8nCnG6eOwM || ("wheel" === l || "mousewheel" === l || "DOMMouseScroll" === l ? 
      D.deltaY ? y = D.deltaY < 0 ? k : j : (z = Math.max( - 1, Math.min(1, D.wheelDelta
       ||- D.detail)), y = z > 0 ? k : j) : y = "zoomIn" === C ? k : j, this.GgaLAlOKDDM
      (), B = this.Ia7rjik9KhJ(y, this.qzQJX429O1c, this.ABJvA9rDSZ6), B[0] !== this.
      qzQJX429O1c && (A = B[0] / this.qzQJX429O1c, this.YzNpqvKSPgJ(A, B)), y > 1 && 
      this.PlAo8puZLCx(), this.MNkKOFJ6Ynh(D), this.vvCxH1Lg0Hr(D))
    }
    , thbUgtUn2am : function (){
      var a = this ;
      this.E5e8onyZeOG.add(this.kTHuVIGTWNl).on({
        click : function (y){
          var l, k, j, i, b;
          if (!a.b8nCnG6eOwM){
            if (b = y.originalEvent || y, k = x(this ), l = k.hasClass(
            "animateViewerZoomIn") ? "zoomIn" : "zoomOut", a.d5zewV5xz9O(k), a.
            isConcurrent){
              for (i = a.ut6MKiFirc5.length, j = 0; i > j; j ++ ){
                x(a.ut6MKiFirc5[j]).find(".animateViewerZoomIn").trigger("conCurrentClick"
                , [b, l])
              }
            }
            a.wwwsj71grAr(b, l)
          }
        }
        , conCurrentClick : function (){
          a.wwwsj71grAr(arguments[1], arguments[2])
        }
      }
      )
    }
    , S8KISLz0hQA : function (){
      var a, j, i, h = this , g = this.BsWo0BzEc8o ? this.Hfo8fNe9DAy : this.
      hkgyMyadq2p;
      a = function (){
        var f, e, l, k = h.nCByR7f4Tly;
        h.U36JBGhGIaf && h.MakmVJwwyQt(), h.rCBZ924CoFl ? (h.lvOvDxFoL1d && (clearTimeout(
        h.s2edS3lG6s6), h.lvOvDxFoL1d =! 1), h.ZiDI8ePJik8()) : h.ohaX9EVshI2 && h.
        CWIZwvJjygd(), h.hKVprKjygye && clearTimeout(h.hKVprKjygye), q ? (e = 0, l = 0) : 
        (e = (k.width() - h.Muc2tbhAPVV) / 2, l = (k.height() - h.Z8WmcagQh5w) / 2), h.
        pP6Dgpi41Uh(h.Muc2tbhAPVV, h.Z8WmcagQh5w, e, l, 450), h.q7dxUE1n1P2 =! 0, k.data(
        "ort3d_isTurning" ,! 0), f = setInterval(function (){
          g.call(h)
        }
        , h.D5IvjlIS22K), h.c0uD4mJ7vfR = f
      }
      , "toggle" === this.VJmEqGoppen ? j = function (){
        h.b8nCnG6eOwM || (h.d5zewV5xz9O(x(this )), h.q7dxUE1n1P2 ? (h.BjwlQNpVGsj(), h.
        WxeuU00W58G()) : (h.bpDRlWIzMQ4(h.uMBNyW14VKB, "PlayStop.png"), a()))
      }
       : "switch" === this.VJmEqGoppen && (i = function (){
        h.b8nCnG6eOwM || h.q7dxUE1n1P2 && (h.BjwlQNpVGsj(), h.WxeuU00W58G())
      }
      , this.FQA4hVfhcCH.on({
        click : function (){
          var d, k, e;
          if (i.call(this ), h.isConcurrent){
            for (e = h.ut6MKiFirc5.length, d = 0; e > d; d ++ ){
              k = x(h.ut6MKiFirc5[d]), k.find(".animateViewerPlayStop").length > 0 ? k.
              find(".animateViewerPlayStop").trigger("conCurrentClick") : k.data(
              "ort3d_isTurning") && k.find(".animateViewerPlayStart").trigger(
              "conCurrentClick")
            }
          }
        }
        , conCurrentClick : function (){
          i.call(this )
        }
      }
      ), j = function (){
        h.b8nCnG6eOwM || h.q7dxUE1n1P2 || (a(), h.yHi6dfvpMGB(h.FQA4hVfhcCH, h.uMBNyW14VKB
        ))
      }
      ), this.uMBNyW14VKB.on({
        click : function (){
          var c, l, k, e = "play";
          if ("toggle" === h.VJmEqGoppen && h.q7dxUE1n1P2 && (e = "stop"), j.call(this ), 
          h.isConcurrent){
            for (k = h.ut6MKiFirc5.length, c = 0; k > c; c ++ ){
              l = x(h.ut6MKiFirc5[c]), "play" === e ? l.data("ort3d_isTurning") || l.find(
              ".animateViewerPlayStart").trigger("conCurrentClick") : "stop" === e && (l.
              find(".animateViewerPlayStop").length > 0 ? l.find(".animateViewerPlayStop"
              ).trigger("conCurrentClick") : l.data("ort3d_isTurning") && l.find(
              ".animateViewerPlayStart").trigger("conCurrentClick"))
            }
          }
        }
        , conCurrentClick : function (){
          j.call(this )
        }
      }
      )
    }
    , dM6NU4GtkBl : function (){
      var a = this ;
      this.Ex0UBcLgacA.on("click", function (){
        var b = a.zEs3Ck6w3bc;
        a.d5zewV5xz9O(x(this )), b.show(), a.WB5gRraqUtw.css({
          left : (b[0].offsetWidth - 200) / 2, top : (b[0].offsetHeight - 200) / 2
        }
        )
      }
      )
    }
    , eQGluh9TihI : function (){
      function C(){
        y.b8nCnG6eOwM ? y.closeMagnifier() : y.openMagnifier()
      }
      var B, A, z, y = this , l = this.nCByR7f4Tly, k = l.width(), e = l.height(), a = e > 
      k ? k : e;
      A = a >= 480 ? 240 : 160 > a ? 80 : a / 2, z = 30 > A ? A : 30, B = new Ortery.
      Magnifier(A, a, z), m && (x(B.domElement).on({
        conCurrentGestureStart : function (d, c){
          B.onPichStart(c)
        }
        , conCurrentGestureChange : function (d, c){
          B.onPinch(c)
        }
        , conCurrentGestureEnd : function (d, c){
          B.onPinchEnd(c)
        }
      }
      ), x(l).on({
        gesturestart : function (f){
          var h, g;
          if (y.b8nCnG6eOwM && (f = f.originalEvent, y.isConcurrent)){
            for (h = y.ut6MKiFirc5.length, g = 0; h > g; g ++ ){
              x(y.ut6MKiFirc5[g]).find(".animateMagnifier").trigger(
              "conCurrentGestureStart", f)
            }
          }
        }
        , gesturechange : function (f){
          var h, g;
          if (y.b8nCnG6eOwM && (f = f.originalEvent, y.isConcurrent)){
            for (h = y.ut6MKiFirc5.length, g = 0; h > g; g ++ ){
              x(y.ut6MKiFirc5[g]).find(".animateMagnifier").trigger(
              "conCurrentGestureChange", f)
            }
          }
        }
        , gestureend : function (f){
          var h, g;
          if (y.b8nCnG6eOwM && (f = f.originalEvent, y.isConcurrent)){
            for (h = y.ut6MKiFirc5.length, g = 0; h > g; g ++ ){
              x(y.ut6MKiFirc5[g]).find(".animateMagnifier").trigger("conCurrentGestureEnd"
              , f)
            }
          }
        }
      }
      )), l.append(B.domElement), B.applyParentBackgroundColor(), this.b8nCnG6eOwM =! 1, this.
      magnifier = B, this.bindMagConcurrent(), n || B.initHammer(this.nCByR7f4Tly[0]), x
      (B.domElement).on("magnifierChanged", function (){
        y.jIFZpKf8dM3()
      }
      ), this.bghTGZnv05N.on({
        click : function (){
          var h, g, b;
          if (C(), y.b8nCnG6eOwM ? y.RCbIg1LCz39.find("img, div").not(this ).removeClass(
          "animateViewerEffectBtn").addClass("animateViewerBtnDisabled") : ("switch" === y
          .xGQtTmerVr5 && (b = "rotate" === y.CwHYe2sA2uZ ? y.JxGcbLL206b : y.VKVlylGmhyU)
          , y.RCbIg1LCz39.find(".animateViewerBtnDisabled").not(y.FQA4hVfhcCH).not(b).
          removeClass("animateViewerBtnDisabled"), t || y.RCbIg1LCz39.find("img, div").not
          (this ).not(".animateViewerBtnDisabled").addClass("animateViewerEffectBtn")), y.
          d5zewV5xz9O(x(this )), y.isConcurrent){
            for (g = y.ut6MKiFirc5.length, h = 0; g > h; h ++ ){
              x(y.ut6MKiFirc5[h]).find(".animateViewerMagnifier").trigger(
              "conCurrentClick")
            }
          }
        }
        , conCurrentClick : C
      }
      )
    }
    , cGsWfpmbO72 : function (e){
      var d = "white", f = this ;
      e.parents().each(function (){
        return this.style.backgroundColor ? (d = this.style.backgroundColor ,! 1) : this 
         === f.nCByR7f4Tly[0] ?! 1 : void0
      }
      ).end().css("background-color", d)
    }
    , openMagnifier : function (){
      var a, f = this , e = (this.bCxwsdBxXdX + 1) % this.N569BzTl4FA;
      0 === e && (e = this.N569BzTl4FA), 10 > e && (e = "0" + e), a = this.bQ3jDAkro3y(
      this.oXgg7XiecK8, e), this.b8nCnG6eOwM =! 0, this.rLzYbq2i0SP.show(), this.
      U36JBGhGIaf && this.MakmVJwwyQt(), this.magnifier.init().setDegree(this.
      ZGTf9Cx3NuF).setBackgroundSize(this.a7YX4DsL5Ty, this.nFnazX5xcs9).
      setBackgroundImage(a, function (){
        f.rLzYbq2i0SP.hide(), x(this ).stop(!0 ,! 0).fadeIn(1000), f.jIFZpKf8dM3()
      }
      ), this.ZT4xPzjO3rl(), this.q7dxUE1n1P2 ? (this.BjwlQNpVGsj(), this.WxeuU00W58G()) : 
      this.rCBZ924CoFl ? (this.lvOvDxFoL1d && (clearTimeout(this.s2edS3lG6s6), this.
      lvOvDxFoL1d =! 1), this.ZiDI8ePJik8()) : this.ohaX9EVshI2 && this.CWIZwvJjygd(), 
      this.hKVprKjygye && clearTimeout(this.hKVprKjygye)
    }
    , closeMagnifier : function (){
      this.rLzYbq2i0SP.hide(), this.magnifier.hide(), this.b8nCnG6eOwM =! 1, m ? (this 
      .magnifier.unbindPinch(), this.XSobPo3R6RZ.on("gesturestart", this.JbEfzUA3kbO)) : 
      n || this.hammertime.on("transformstart", this.JbEfzUA3kbO), this.XSobPo3R6RZ.on(
      "touchstart mousedown", this.DGG3GQ8rzPz), t || (this.magnifier.unbindWheel(), 
      this.dHYMX8MOL9L())
    }
    , bindMagConcurrent : function (){
      var a = this ;
      x(this.magnifier.domElement).on({
        "touchstart mousedown" : function (i){
          var h, g, b = i.originalEvent;
          if (a.isConcurrent){
            for (g = a.ut6MKiFirc5.length, h = 0; g > h; h ++ ){
              x(a.ut6MKiFirc5[h]).find("div.animateMagnifier").trigger("conCurrentDown", b
              )
            }
          }
        }
        , conCurrentDown : function (b, d){
          a.magnifier.dragStart(d)
        }
      }
      );
      var f = function (i){
        var h, g, b = i.originalEvent;
        if (a.isConcurrent && a.b8nCnG6eOwM){
          for (g = a.ut6MKiFirc5.length, h = 0; g > h; h ++ ){
            x(a.ut6MKiFirc5[h]).trigger("conCurrentWheel", b)
          }
        }
      }
      , e = this.nCByR7f4Tly[0];
      e.addEventListener ? (e.addEventListener("mousewheel", f ,! 1), e.addEventListener(
      "DOMMouseScroll", f ,! 1)) : e.attachEvent("onmousewheel", f), this.nCByR7f4Tly.on(
      "conCurrentWheel", function (b, d){
        a.magnifier.onWheel(d)
      }
      )
    }
    , ZT4xPzjO3rl : function (){
      this.nCByR7f4Tly.off("mousedown touchstart", this.iEqSqvb09EQ), m ? (this.
      XSobPo3R6RZ.off("gesturestart"), this.magnifier.bindPinch()) : n || (this.
      hammertime.off("transformstart", this.JbEfzUA3kbO), this.magnifier.bindPinch()), t
       || (this.XSobPo3R6RZ.off("mousewheel"), this.magnifier.bindWheel())
    }
    , jIFZpKf8dM3 : function (){
      var d, c;
      q ? (d = this.bRgDKeXSmar + (this.nCByR7f4Tly.width() - this.qzQJX429O1c) / 2, c = 
      this.WsBERq2aDwM + (this.nCByR7f4Tly.height() - this.ABJvA9rDSZ6) / 2) : (d = 
      this.bRgDKeXSmar, c = this.WsBERq2aDwM), this.magnifier.setBackgroundPosition(
      this.a7YX4DsL5Ty, this.nFnazX5xcs9, this.qzQJX429O1c, this.ABJvA9rDSZ6, d, c, 
      this.ZGTf9Cx3NuF)
    }
    , bpDRlWIzMQ4 : function (a, f){
      var e = this.correctPathCase(this.fileNamingCase, this.lXFRoaPaply + f);
      x.support.opacity ? a.prop("src", e) : a.css("filter", 
      'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + e + 
      '", sizingMethod="scale")')
    }
    , FfptTSCQEyH : function (d){
      var c;
      "rotate" === d ? (this.nCByR7f4Tly.data("ort3d_CwHYe2sA2uZ", "rotate"), this.
      CwHYe2sA2uZ = "rotate", c = "default") : (this.nCByR7f4Tly.data("ort3d_CwHYe2sA2uZ"
      , "pan"), this.CwHYe2sA2uZ = "pan", c = "move"), this.XSobPo3R6RZ.css("cursor", c
      )
    }
    , h1DBXdAY6KR : function (b){
      this.rCBZ924CoFl =! 0, this.ElSEJhGrEEr && this.sxGk4b4O8yN(), this.rCYeBenyIOM
      ({
        spin : b, svg :! 0
      }
      )
    }
    , ZiDI8ePJik8 : function (){
      this.rCBZ924CoFl =! 1
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    XnnZhZgZeN1 : function (F, E, D){
      var C, B, A, z, y, l, k = F + "KEY" + E;
      if (!this.XnnZhZgZeN1.A9nQ9YvvBDQ[k]){
        if (C = 360 / this.N569BzTl4FA, B =~~ (F / C + 0.5), B === this.N569BzTl4FA && (
        B = 0), A =! 1, E > 90 ? (E = 180 - E, A =! 0) :- 90 > E && (E =- 180 - E, A =! 0)
        , z = 0, "cylindrical" !== this.WHPkz4ocodZ){
          for (y = 0; 10 > y; y ++ ){
            if (l = D[y], 0 === l){
              z = y - 1;
              break 
            }
            if (9 === y){
              z = y - 1
            }
            else {
              if (Math.abs(E) < (l + D[y + 1]) / 2){
                z = y;
                break 
              }
            }
          }
          0 > E && (z += this.ibHLlbN8krz / 2)
        }
        this.XnnZhZgZeN1.A9nQ9YvvBDQ[k] = [B, z, A]
      }
      return this.XnnZhZgZeN1.A9nQ9YvvBDQ[k]
    }
    , KxbOdGEmhIM : function (){
      var a, h, g, f = this ;
      g = function (){
        this.q7dxUE1n1P2 ? (this.BjwlQNpVGsj(), this.WxeuU00W58G()) : this.rCBZ924CoFl
         ? (this.lvOvDxFoL1d && (clearTimeout(this.s2edS3lG6s6), this.lvOvDxFoL1d =! 1)
        , this.ZiDI8ePJik8()) : this.ohaX9EVshI2 && this.CWIZwvJjygd(), this.
        hKVprKjygye && clearTimeout(this.hKVprKjygye)
      }
      , a = this.Sjx4PFuOKnn.find("text" === this.tSQHmWyTM8b ? ".animateViewerPageBtn" : 
      ".animateViewerPageBlock"), h = function (e){
        function d(){
          var b, i, c;
          return l += z ,++ j > y ? (f.PlAo8puZLCx(), void(f.Cob3EQnRmfv = Math.round(f.
          Cob3EQnRmfv))) : (B.call(f), b = (new Date).getTime(), i = b - A - l, c = z > i ? 
          z - i : z, void(f.hKVprKjygye = setTimeout(d, c)))
        }
        var B, A, z = 50, y = 1000 / z, l = 0, j = 0;
        return f.b8nCnG6eOwM ?! 1 : (g.call(f), f.RiWjrEA4iCs = e, f.ElSEJhGrEEr && f.
        sxGk4b4O8yN(), o && f.vx3FaSOHRAG(), f.U36JBGhGIaf && f.F0t95BVjN0I(f.RiWjrEA4iCs)
        , B = f.OyU8s3YSgRB(y, f.DBS85HeoDhV[e]), A = (new Date).getTime(), void(f.
        hKVprKjygye = setTimeout(d, z)))
      }
      , a.each(function (c){
        x(this ).on({
          click : function (l){
            var k, j, e, b = l.originalEvent;
            if (h(c), f.isConcurrent){
              for (j = f.ut6MKiFirc5.length, k = 0; j > k; k ++ ){
                e = x(f.ut6MKiFirc5[k]).find("div.animateViewerPageBtnDiv").children()[c], 
                e && x(e).trigger("conCurrentClick")
              }
            }
            f.MNkKOFJ6Ynh(b), f.vvCxH1Lg0Hr(b)
          }
          , conCurrentClick : function (){
            h(c)
          }
        }
        )
      }
      )
    }
    , OyU8s3YSgRB : function (U, T){
      var S, R, Q, P, O, N, M, L, K, J, I, H, G, F, E, D, C = this.RiWjrEA4iCs, B = this 
      .bCxwsdBxXdX, A = this.N569BzTl4FA, z = this.ibHLlbN8krz, y = A / 2;
      return S = this.qrIGzYBmvg5[C], R = this.mafG3iVPwau[C], Q = (S[0] - this.
      qzQJX429O1c) / U, P = (S[1] - this.ABJvA9rDSZ6) / U, O = (R[0] - this.bRgDKeXSmar)
       / U, N = (R[1] - this.WsBERq2aDwM) / U, M = (T[0] - B + A) % A, this.BsWo0BzEc8o ? 
      (D = (this.hwRu8RgEokB - B + A) % A, M > D ? (I = A - M, G =! 1) : (I = M, G =! 0))
       : (M >= y ? (I = M, G =! 0) : (I = A - M, G =! 1), "spherical" === this.
      WHPkz4ocodZ && this.Eqp0cmrzA8v && (I = I % A + y)), F = I / U, this.ibHLlbN8krz > 
      1 && ("spherical" === this.WHPkz4ocodZ ? (this.Cob3EQnRmfv = this.qA6xR6yItRY(
      this.x2UklZHYFjx, this.Eqp0cmrzA8v), L = this.qA6xR6yItRY(T[1], T[2]) - this.
      Cob3EQnRmfv) : (this.Cob3EQnRmfv = this.x2UklZHYFjx, L = this.x2UklZHYFjx - T[1])
      , K = Math.abs(L), H = 0 > L ?! 1 :! 0, "spherical" === this.WHPkz4ocodZ && (J = 
      Math.abs(L), z > J ? K = 2 * z - J : J > z && (H = 0 > L ?! 0 :! 1)), E = K / U), 
      function (){
        B += G ? F :- F, this.ibHLlbN8krz > 1 && (this.Cob3EQnRmfv += H ?- E : E, 
        "hemispherical" === this.WHPkz4ocodZ && 0 !== L ? this.x2UklZHYFjx = Math.round(
        this.Cob3EQnRmfv) % z : "spherical" === this.WHPkz4ocodZ && (B = this.
        AiaiOZHbdbc(B))), this.bCxwsdBxXdX = (Math.round(B) + A) % this.N569BzTl4FA, 
        this.hg78gccLEho(this.qzQJX429O1c + Q, this.ABJvA9rDSZ6 + P, this.bRgDKeXSmar + 
        O, this.WsBERq2aDwM + N), this.xeiUGuhH6MS()
      }
    }
    , qA6xR6yItRY : function (g, f){
      var j, i, h = g + "KEY" + f;
      return this.qA6xR6yItRY.A9nQ9YvvBDQ.hasOwnProperty(h) || (i = this.ibHLlbN8krz / 2
      , i > g &&! f ? j = g : g >= i &&! f ? j = 3 * i + this.ibHLlbN8krz - 1 - g : g >= 
      i && f ? j = i + g : i > g && f && (j = this.ibHLlbN8krz - 1 - g), this.
      qA6xR6yItRY.A9nQ9YvvBDQ[h] = j), this.qA6xR6yItRY.A9nQ9YvvBDQ[h]
    }
    , DmzT1McqHog : function (g, f){
      var j, i, h = g + "KEY" + f;
      return this.DmzT1McqHog.A9nQ9YvvBDQ[h] || (i = this.ibHLlbN8krz / 2, g >= 0 && i > 
      g ? j = g : g >= 3 * i && 4 * i > g ? j = 3 * i + this.ibHLlbN8krz - 1 - g : g >= 2
       * i && 3 * i > g ? j = g - i : g >= i && 2 * i > g && (j = this.ibHLlbN8krz - 1 - 
      g), this.DmzT1McqHog.A9nQ9YvvBDQ[h] = j), this.DmzT1McqHog.A9nQ9YvvBDQ[h]
    }
    , yWmvgnwDAUT : function (e, d){
      var f;
      return this.Eqp0cmrzA8v = 180 === e ?! 0 :! 1, this.ZGTf9Cx3NuF = e % 360, q || (f
       = 180 === e ? 2 : 0, this.aZdQe4pwxJ7.css({
        filter : "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + f + ")", 
        transform : "rotate(" + e + "deg)"
      }
      )), d += this.N569BzTl4FA / 2
    }
    , AiaiOZHbdbc : function (d){
      var c;
      return this.Cob3EQnRmfv < 0 && (this.Cob3EQnRmfv += 2 * this.ibHLlbN8krz), c = 
      Math.round(this.Cob3EQnRmfv) % (2 * this.ibHLlbN8krz), c >= this.ibHLlbN8krz / 2
       && c < 3 * this.ibHLlbN8krz / 2 ? this.Eqp0cmrzA8v || (d = this.yWmvgnwDAUT(180, 
      d)) : this.Eqp0cmrzA8v && (d = this.yWmvgnwDAUT(360, d)), this.x2UklZHYFjx = this 
      .DmzT1McqHog(c, this.Eqp0cmrzA8v), d
    }
    , rCYeBenyIOM : function (K){
      function J(){
        var b = F.hN1erQNwYg6[E].jdlKi7WYJcW;
        return F.Cob3EQnRmfv = Math.round(F.Cob3EQnRmfv), F.TC3XmBnFbdB || F.RiWjrEA4iCs
         !== F.hN1erQNwYg6.length - 1 ? F.rCBZ924CoFl ? (F.s2edS3lG6s6 = setTimeout(
        function (){
          F.rCYeBenyIOM.call(F, {
            spin :! 0, svg :! 0
          }
          )
        }
        , b), F.lvOvDxFoL1d =! 0, voidF.PlAo8puZLCx()) : voidF.PlAo8puZLCx() : (F.
        sVMDofkCoa8 &&/\ S / .test(F.sVMDofkCoa8) ? setTimeout(function (){
          F.tcsADWqyE0i(F.sVMDofkCoa8, F.linkTarget)
        }
        , b) : F.ZiDI8ePJik8(), voidF.PlAo8puZLCx())
      }
      var I, H, G, F = this , E = this.RiWjrEA4iCs + 1, D = this.hN1erQNwYg6.length, C = 
      50, B = 0, A = 0, z = 1000 / C, y = K.spin, j = K.svg;
      E >= D && (E = 0), this.RiWjrEA4iCs = E, j && (o && this.vx3FaSOHRAG(), this.
      U36JBGhGIaf && this.F0t95BVjN0I(E)), y ? (I = this.OyU8s3YSgRB(z, this.
      DBS85HeoDhV[E]), G = function (){
        var b, d, c;
        return B += C ,++ A > z ? voidJ() : (I.call(F), b = (new Date).getTime(), d = b - 
        H - B, c = C > d ? C - d : C, F.hKVprKjygye = setTimeout(G, c), void0)
      }
      , H = (new Date).getTime(), this.hKVprKjygye = setTimeout(G, C)) : J()
    }
    , tcsADWqyE0i : function (d, c){
      "object" === c ? this.xIlZpgGYVx2(d, this.W2tEERtb61r) : v.location = d
    }
    , vx3FaSOHRAG : function (){
      var a, B, A, z, y, l = this.L1dIS1xoo9X, k = this , j = this.hN1erQNwYg6[this.
      RiWjrEA4iCs];
      x('.animateViewerPageAudio[data-lasting="false"]').each(function (){
        this.paused || this.pause(), 4 === this.readyState && (this.currentTime = 0)
      }
      ), j.pageAudio ? (a = j.pageAudio.elem, B = a.paused, A = this.Qza9178cmsR, y = A + this.
      correctPathCase(this.fileNamingCase, B ? "AudioPlay.png" : "AudioHalt.png"), l.show
      ().prop("src", y) ,- 1000 !== j.pageAudio.UiO4OFWTzWY && B && (z = j.pageAudio.
      UiO4OFWTzWY || 0, setTimeout(function (){
        a.play(), l.prop("src", A + k.correctPathCase(k.fileNamingCase, "AudioHalt.png"))
      }
      , z))) : l && l.hide()
    }
    , pP6Dgpi41Uh : function (N, M, L, K, J){
      var I, H, G, F, E, D, C = this , B = 15, A = 0, z = 0, y = J / B;
      H = (N - this.qzQJX429O1c) / y, G = (M - this.ABJvA9rDSZ6) / y, F = (L - this.
      bRgDKeXSmar) / y, E = (K - this.WsBERq2aDwM) / y, D = function (){
        var e, d, f;
        A += B ,++ z > y || (e = C.bRgDKeXSmar + F, d = C.WsBERq2aDwM + E, C.hg78gccLEho(C
        .qzQJX429O1c + H, C.ABJvA9rDSZ6 + G, e, d), C.xeiUGuhH6MS(), f = (new Date).
        getTime(), C.uqhKugsvHg6 = setTimeout(D, B - (f - I - A)))
      }
      , I = (new Date).getTime(), this.uqhKugsvHg6 = setTimeout(D, B)
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    Lp2A9EWHrCU : function (){
      var a = this ;
      this.zl2sY1klZUe = this.N569BzTl4FA / 600, this.DGG3GQ8rzPz = function (c){
        if (a.b8nCnG6eOwM){
          return !1
        }
        var i, h, g = c.originalEvent;
        if (a.isConcurrent){
          for (h = a.ut6MKiFirc5.length, i = 0; h > i; i ++ ){
            x(a.ut6MKiFirc5[i]).find("div.animateViewerPhoto").trigger("conCurrentDown", g
            )
          }
        }
        a.iEqSqvb09EQ(g)
      }
      , this.XSobPo3R6RZ.on({
        "touchstart mousedown" : this.DGG3GQ8rzPz, conCurrentDown : function (){
          return a.b8nCnG6eOwM ?! 1 : voida.iEqSqvb09EQ(arguments[1])
        }
      }
      ), this.ElSEJhGrEEr && (this.FyUiAlE42JE(), this.ubGrFjVqou5()), this.fZqFjhEYeJk = s ? 
      this.XSobPo3R6RZ : x(w)
    }
    , iEqSqvb09EQ : function (d){
      var c;
      this.U36JBGhGIaf && this.MakmVJwwyQt(), this.rCBZ924CoFl ? (this.lvOvDxFoL1d && 
      (clearTimeout(this.s2edS3lG6s6), this.lvOvDxFoL1d =! 1), this.ZiDI8ePJik8()) : 
      this.q7dxUE1n1P2 ? (this.BjwlQNpVGsj(), this.WxeuU00W58G()) : this.ohaX9EVshI2 && 
      this.CWIZwvJjygd(), this.hKVprKjygye && clearTimeout(this.hKVprKjygye), this.
      $UV5QAvr2PqrDiv && this.$UV5QAvr2PqrDiv.stop(!0 ,! 0).fadeOut(1200).data("show" ,! 
      1), (t ||! d.which || 1 === d.which) && (c = Ortery.getCoordinates(d), this.
      xeiUGuhH6MSStartPointX = c[0], this.xeiUGuhH6MSStartPointY = c[1], this.
      b2X46XcSSvf = c[0], this.ZBnh1YcHMA9 = c[1], this.ElSEJhGrEEr && this.M7t6fDChzby
      (c), this.fZqFjhEYeJk || (console.log("this.fZqFjhEYeJk:" + this.fZqFjhEYeJk), 
      console.log("this.XSobPo3R6RZ:" + this.XSobPo3R6RZ[0])), this.fZqFjhEYeJk.on({
        "touchmove mousemove" : this.cO9vtdgDi44, "touchend mouseup" : this.Um5cxUkT6jY
      }
      , {
        context : this 
      }
      ), this.currentMovedX = 0, this.MNkKOFJ6Ynh(d), this.vvCxH1Lg0Hr(d))
    }
    , cO9vtdgDi44 : function (i){
      var h, z, y, l, k, j = i.data.context;
      i = i.originalEvent, i.touches && i.touches.length >= 2 || (h = Ortery.
      getCoordinates(i), z = h[0], y = h[1], l = z - j.b2X46XcSSvf, k = y - j.ZBnh1YcHMA9, 
      "rotate" === j.CwHYe2sA2uZ ? (j.ElSEJhGrEEr ? j.OwBBRVkQRq1(z, y) : j.zpoZYaBcnun(z, 
      y), j.m16wHeh8jvp && (j.vHK7723zBHa = (new Date).getTime()), j.currentMovedX = l) : 
      j.wfAQbTJSCRO(l, k), j.b2X46XcSSvf = z, j.ZBnh1YcHMA9 = y, j.MNkKOFJ6Ynh(i), j.
      vvCxH1Lg0Hr(i))
    }
    , Um5cxUkT6jY : function (f){
      var e, h, g = f.data.context;
      return g.fZqFjhEYeJk.off({
        "touchmove mousemove" : g.cO9vtdgDi44, "touchend mouseup" : g.Um5cxUkT6jY
      }
      ), "rotate" === g.CwHYe2sA2uZ && (g.VC7DoEnXvIY = g.currentMovedX > 0 ?! 1 :! 0, e = Math.
      abs(g.ZGTf9Cx3NuF), h = (new Date).getTime(), g.m16wHeh8jvp && Math.abs(g.
      currentMovedX) >= 35 &&! (g.ElSEJhGrEEr && e > 45 && 135 > e) && h - g.vHK7723zBHa < 
      500) ? void g.FUSFsssRwPN() : void g.PlAo8puZLCx()
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    zpoZYaBcnun : function (H, G){
      var F, E, D, C, B, A, z = H - this.xeiUGuhH6MSStartPointX, y = G - this.
      xeiUGuhH6MSStartPointY, l =! 1;
      if ("cylindrical" === this.WHPkz4ocodZ){
        if ("vertical" === this.cylindricalDragDirection){
          if (Math.abs(z) > Math.abs(y)){
            return this.xeiUGuhH6MSStartPointX = H, void(this.xeiUGuhH6MSStartPointY = G
            )
          }
          F = Math.round(y * this.zl2sY1klZUe)
        }
        else {
          if (Math.abs(y) > Math.abs(z)){
            return this.xeiUGuhH6MSStartPointX = H, void(this.xeiUGuhH6MSStartPointY = G
            )
          }
          F = Math.round(z * this.zl2sY1klZUe)
        }
      }
      else {
        F = Math.round(z * this.zl2sY1klZUe)
      }
      0 !== F && (E = F * (this.Eqp0cmrzA8v ? 1 :- 1), this.BsWo0BzEc8o ? (C = this.
      hwRu8RgEokB, B = this.je098qml1Gu, D = this.bCxwsdBxXdX - (B + 1), 0 > D && (D += 
      this.N569BzTl4FA), A = this.N569BzTl4FA - (B - C) - 1, D + E >= A ? this.
      bCxwsdBxXdX = C - 1 : 0 > D + E ? this.bCxwsdBxXdX = B + 1 : this.bCxwsdBxXdX += E
      ) : this.bCxwsdBxXdX += E, this.bCxwsdBxXdX = (this.bCxwsdBxXdX + this.
      N569BzTl4FA) % this.N569BzTl4FA, this.xeiUGuhH6MSStartPointX = H, this.
      xeiUGuhH6MSStartPointY = G, l =! 0), "cylindrical" !== this.WHPkz4ocodZ && Math.abs
      (y) > 50 && (this.tukUPz2gFB9(y > 0 ? 1 :- 1), this.xeiUGuhH6MSStartPointY = G, l
       =! 0), l && this.xeiUGuhH6MS()
    }
    , OwBBRVkQRq1 : function (K, J){
      var I, H, G, F = this.PyGqEuAFKkE([K, J]) % 360, E = this.N569BzTl4FA, D = this.
      ibHLlbN8krz, C = this.bCxwsdBxXdX, B = this.x2UklZHYFjx, A = 360 / E, z = 180 / D, 
      y = A / 2;
      I = this.wN7E6qALYHV < y || this.wN7E6qALYHV >= 360 - y ? 0 :~~ ((this.
      wN7E6qALYHV + y) / A), I = (I + E) % E, this.iNS38Htzvs6 <= 90 ? (H =~~ (this.
      iNS38Htzvs6 / z), G = D / 2 - 1, H = H > G ? G : H) : H =~~ ((360 - this.
      iNS38Htzvs6) / z) + D / 2, H = H > D - 1 ? D - 1 : H, (C !== I || B !== H) && (this 
      .ZGTf9Cx3NuF = F, this.Eqp0cmrzA8v = 90 < Math.abs(F) && Math.abs(F) < 270, this.
      x2UklZHYFjx = H, this.bCxwsdBxXdX = I, this.xeiUGuhH6MS())
    }
    , wfAQbTJSCRO : function (d, c){
      (0 !== d || 0 !== c) && (this.qPg9NKxm8e2(this.bRgDKeXSmar + d, this.WsBERq2aDwM + c), q
       && this.xeiUGuhH6MS())
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    KNiSHHExuA3 : function (f){
      var e, h, g = this ;
      "toggle" === this.VJmEqGoppen ? this.bpDRlWIzMQ4(this.uMBNyW14VKB, "PlayStop.png"
      ) : "switch" === this.VJmEqGoppen && this.yHi6dfvpMGB(this.FQA4hVfhcCH, this.
      uMBNyW14VKB), this.BsWo0BzEc8o ? (e = f ? this.Hfo8fNe9DAy : this.sectorSpinOnce, 
      this.isArriveMin =! 1, this.isArriveMax =! 1) : e = f ? this.hkgyMyadq2p : this.
      spinOnce, this.q7dxUE1n1P2 =! 0, this.nCByR7f4Tly.data("ort3d_isTurning" ,! 0), h = 
      setInterval(function (){
        e.call(g)
      }
      , this.D5IvjlIS22K), this.c0uD4mJ7vfR = h
    }
    , hkgyMyadq2p : function (){
      var b;
      this.VC7DoEnXvIY ? this.bCxwsdBxXdX ++: this.bCxwsdBxXdX --, this.rJttmrdTaN5 && 
      this.Fx4h7PNcqnC(), this.bCxwsdBxXdX = (this.bCxwsdBxXdX + this.N569BzTl4FA) % 
      this.N569BzTl4FA, this.xeiUGuhH6MS(), this.ElSEJhGrEEr && this.rJttmrdTaN5 && (b
       = this.ZGTf9Cx3NuF + 1, this.ZGTf9Cx3NuF = b % 360)
    }
    , Hfo8fNe9DAy : function (){
      var b = this.bCxwsdBxXdX;
      this.VC7DoEnXvIY ? this.bCxwsdBxXdX ++: this.bCxwsdBxXdX --, this.rJttmrdTaN5 && 
      this.Fx4h7PNcqnC(this.hwRu8RgEokB, this.je098qml1Gu), this.bCxwsdBxXdX = (this.
      bCxwsdBxXdX + this.N569BzTl4FA) % this.N569BzTl4FA, this.bCxwsdBxXdX === this.
      hwRu8RgEokB ? (this.bCxwsdBxXdX = b, this.VC7DoEnXvIY =! this.VC7DoEnXvIY) : this 
      .bCxwsdBxXdX === this.je098qml1Gu && (this.bCxwsdBxXdX = b, this.VC7DoEnXvIY =! 
      this.VC7DoEnXvIY), this.xeiUGuhH6MS()
    }
    , Fx4h7PNcqnC : function (a, l){
      var k, j, i, h;
      if ("hemispherical" === this.WHPkz4ocodZ){
        if (k = a || this.N569BzTl4FA, j = l || 0 ,! (this.bCxwsdBxXdX === k && this.
        VC7DoEnXvIY || this.bCxwsdBxXdX === j &&! this.VC7DoEnXvIY)){
          return 
        }
        0 === this.x2UklZHYFjx ? x(this ).data("arriveNorth" ,! 1) : this.x2UklZHYFjx === 
        this.ibHLlbN8krz - 1 && x(this ).data("arriveNorth" ,! 0), i = x(this ).data(
        "arriveNorth"), i ? this.x2UklZHYFjx -= 1 : i || (this.x2UklZHYFjx += 1)
      }
      else {
        "spherical" === this.WHPkz4ocodZ && (h = this.VC7DoEnXvIY ? this.N569BzTl4FA : 
        0, this.Eqp0cmrzA8v || this.bCxwsdBxXdX !== h || this.x2UklZHYFjx !== this.
        ibHLlbN8krz / 2 - 1 ? this.Eqp0cmrzA8v && this.bCxwsdBxXdX === this.N569BzTl4FA
         / 2 && this.x2UklZHYFjx === this.ibHLlbN8krz - 1 ? (this.bCxwsdBxXdX = 0, this 
        .Eqp0cmrzA8v =! 1, q ? this.ZGTf9Cx3NuF = 360 : this.aZdQe4pwxJ7.css({
          filter : "progid:DXImageTransform.Microsoft.BasicImage(rotation=0)", transform : 
          "rotate(360deg)"
        }
        )) : this.Eqp0cmrzA8v && this.bCxwsdBxXdX === this.N569BzTl4FA / 2 && 0 === this.
        x2UklZHYFjx ? this.x2UklZHYFjx = this.ibHLlbN8krz / 2 : this.Eqp0cmrzA8v || 
        this.bCxwsdBxXdX !== h || this.x2UklZHYFjx !== this.ibHLlbN8krz / 2 ? this.
        Eqp0cmrzA8v && this.bCxwsdBxXdX === this.N569BzTl4FA / 2 ? this.x2UklZHYFjx += 
        this.x2UklZHYFjx > this.ibHLlbN8krz / 2 - 1 ? 1 :- 1 : this.Eqp0cmrzA8v || this 
        .bCxwsdBxXdX !== h || (this.x2UklZHYFjx += this.x2UklZHYFjx > this.ibHLlbN8krz / 
        2 - 1 ?- 1 : 1) : this.x2UklZHYFjx = 0 : (this.bCxwsdBxXdX = this.N569BzTl4FA / 
        2, this.Eqp0cmrzA8v =! 0, q ? this.ZGTf9Cx3NuF = 180 : this.aZdQe4pwxJ7.css({
          filter : "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)", transform : 
          "rotate(180deg)"
        }
        )))
      }
    }
    , spinOnce : function (){
      var a;
      this.VC7DoEnXvIY ? this.bCxwsdBxXdX ++: this.bCxwsdBxXdX --, this.rJttmrdTaN5 && 
      this.Fx4h7PNcqnC(), this.bCxwsdBxXdX = (this.bCxwsdBxXdX + this.N569BzTl4FA) % 
      this.N569BzTl4FA, 0 === this.bCxwsdBxXdX && ("cylindrical" === this.WHPkz4ocodZ ? 
      this.BjwlQNpVGsj() : "hemispherical" === this.WHPkz4ocodZ ? this.rJttmrdTaN5 ? 0
       === this.x2UklZHYFjx && x(this ).data("arriveNorth") && this.BjwlQNpVGsj() : this 
      .BjwlQNpVGsj() : "spherical" !== this.WHPkz4ocodZ || this.Eqp0cmrzA8v || 0 !== 
      this.x2UklZHYFjx || this.BjwlQNpVGsj()), this.ElSEJhGrEEr && this.rJttmrdTaN5 && 
      (a = this.ZGTf9Cx3NuF + 1, this.canvasRotate(a)), this.xeiUGuhH6MS()
    }
    , sectorSpinOnce : function (){
      var a = this.bCxwsdBxXdX;
      if (this.WadzpPztjBO || (this.WadzpPztjBO =! 1), this.VC7DoEnXvIY ? this.
      bCxwsdBxXdX ++: this.bCxwsdBxXdX --, this.rJttmrdTaN5 && this.Fx4h7PNcqnC(this.
      hwRu8RgEokB, this.je098qml1Gu), this.bCxwsdBxXdX = (this.bCxwsdBxXdX + this.
      N569BzTl4FA) % this.N569BzTl4FA, this.bCxwsdBxXdX === this.hwRu8RgEokB){
        if (this.bCxwsdBxXdX = a, this.WadzpPztjBO){
          return void(this.rJttmrdTaN5 ? x(this ).data("arriveNorth") ? (this.
          x2UklZHYFjx = this.ibHLlbN8krz - 1, this.BjwlQNpVGsj()) : this.VC7DoEnXvIY =! 
          this.VC7DoEnXvIY : this.BjwlQNpVGsj())
        }
        this.VC7DoEnXvIY =! this.VC7DoEnXvIY, this.WadzpPztjBO =! 0
      }
      else {
        if (this.bCxwsdBxXdX === this.je098qml1Gu){
          if (this.bCxwsdBxXdX = a, this.WadzpPztjBO){
            return void(this.rJttmrdTaN5 ? x(this ).data("arriveNorth") ? (this.
            x2UklZHYFjx = this.ibHLlbN8krz - 1, this.BjwlQNpVGsj()) : this.VC7DoEnXvIY
             =! this.VC7DoEnXvIY : this.BjwlQNpVGsj())
          }
          this.WadzpPztjBO =! 0, this.VC7DoEnXvIY =! this.VC7DoEnXvIY, this.
          WadzpPztjBO =! 0
        }
      }
      this.xeiUGuhH6MS()
    }
    , WxeuU00W58G : function (){
      "toggle" === this.VJmEqGoppen ? this.bpDRlWIzMQ4(this.uMBNyW14VKB, 
      "PlayStart.png") : "switch" === this.VJmEqGoppen && this.yHi6dfvpMGB(this.
      uMBNyW14VKB, this.FQA4hVfhcCH), this.xeiUGuhH6MS()
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    FUSFsssRwPN : function (){
      var g, f, j, i = this , h = (new Date).getTime();
      this.lastThx2UklZHYFjxImg = 0, j = Math.abs(this.currentMovedX), j > 70 && (j = 70
      ), g = 100 * j, f =~~ (j / 10), this.GK43JGw8A4G = this.tSTI6InLpk2(this.
      N569BzTl4FA * f, g), this.ohaX9EVshI2 =! 0, this.HhFswah11PO = setInterval(
      function (){
        i.BC4InFC52Nm.apply(i, [g, h])
      }
      , 100)
    }
    , BC4InFC52Nm : function (g, f){
      var j, i, h = (new Date).getTime();
      return j = Math.round(this.GK43JGw8A4G(h - f)), i = (j - this.lastThx2UklZHYFjxImg
      ) % this.N569BzTl4FA, this.bCxwsdBxXdX += this.VC7DoEnXvIY ? this.Eqp0cmrzA8v ?- 
      i : i : this.Eqp0cmrzA8v ? i :- i, this.bCxwsdBxXdX = (this.bCxwsdBxXdX + this.
      N569BzTl4FA) % this.N569BzTl4FA, this.xeiUGuhH6MS(), h - f >= g ? (this.
      CWIZwvJjygd(), voidthis.PlAo8puZLCx()) : void(this.lastThx2UklZHYFjxImg = j)
    }
    , tSTI6InLpk2 : function (d, c){
      return function (a){
        return  - d * (a /= c) * (a - 2)
      }
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    dHYMX8MOL9L : function (){
      var a = this ;
      this.XSobPo3R6RZ.on({
        mousewheel : function (i){
          var h, g, b = i.originalEvent;
          if (a.wwwsj71grAr(b), a.isConcurrent){
            for (g = a.ut6MKiFirc5.length, h = 0; g > h; h ++ ){
              x(a.ut6MKiFirc5[h]).find("div.animateViewerPhoto").trigger("conCurrentWheel"
              , b)
            }
          }
        }
        , conCurrentWheel : function (){
          a.wwwsj71grAr(arguments[1])
        }
      }
      )
    }
    , exz2oDH4hD7 : function (){
      var a, c = this ;
      this.JbEfzUA3kbO = function (d){
        var g, f;
        if (c.gNUZyWsO2T2(d), c.isConcurrent){
          for (g = c.ut6MKiFirc5.length, f = 0; g > f; f ++ ){
            x(c.ut6MKiFirc5[f]).find(".animateViewerPhoto").trigger("conCurrentGesture", d
            )
          }
        }
      }
      , this.Kfi4hOtUZmI = function (d){
        var g, f;
        if (c.mBkmGwYvF1o(d), c.isConcurrent){
          for (g = c.ut6MKiFirc5.length, f = 0; g > f; f ++ ){
            x(c.ut6MKiFirc5[f]).find(".animateViewerPhoto").trigger(
            "conCurrentGestureChange", d)
          }
        }
      }
      , this.d5n1gMncsDl = function (){
        var d, e;
        if (c.Lu1emfCOnjv(), c.isConcurrent){
          for (d = c.ut6MKiFirc5.length, e = 0; d > e; e ++ ){
            x(c.ut6MKiFirc5[e]).find(".animateViewerPhoto").trigger("conCurrentGestureEnd"
            )
          }
        }
      }
      , "ongesturestart"in v ? this.XSobPo3R6RZ.on({
        gesturestart : this.JbEfzUA3kbO, conCurrentGesture : function (e, d){
          c.gNUZyWsO2T2(d)
        }
      }
      ) : n || (a = Hammer(this.XSobPo3R6RZ[0], {
        drag :! 1, hold :! 1, show_touches :! 1, swipe :! 1, tap :! 1, touch :! 1
      }
      ), a.on("transformstart", this.JbEfzUA3kbO), this.hammertime = a)
    }
    , gNUZyWsO2T2 : function (e){
      var d, f = this ;
      return e.preventDefault(), this.rCBZ924CoFl ? (this.lvOvDxFoL1d && (clearTimeout(
      this.s2edS3lG6s6), this.lvOvDxFoL1d =! 1), this.ZiDI8ePJik8()) : this.
      q7dxUE1n1P2 ? (this.BjwlQNpVGsj(), this.WxeuU00W58G()) : this.ohaX9EVshI2 && this 
      .CWIZwvJjygd(), this.hKVprKjygye && clearTimeout(this.hKVprKjygye), this.
      RR1nnvqYt5m = this.qzQJX429O1c, this.CqnhvQLb6fa = this.ABJvA9rDSZ6, this.
      j6ZGg0Pt4R6 = [this.bRgDKeXSmar, this.WsBERq2aDwM], "gesturestart" === e.type ? 
      this.XSobPo3R6RZ.on({
        gesturechange : f.Kfi4hOtUZmI, gestureend : f.d5n1gMncsDl, conCurrentGestureChange
         : function (g, c){
          f.mBkmGwYvF1o(c)
        }
        , conCurrentGestureEnd : function (){
          f.Lu1emfCOnjv()
        }
      }
      ) : n || (d = this.hammertime, d.on("transform", f.Kfi4hOtUZmI), d.on("transformend", f.
      d5n1gMncsDl)) ,! 1
    }
    , mBkmGwYvF1o : function (f){
      var e, h, g;
      h = "gesturechange" === f.type ? f.originalEvent.scale : f.gesture.scale, g = this.
      Ia7rjik9KhJ(h, this.RR1nnvqYt5m, this.CqnhvQLb6fa), f.preventDefault(), g[0] !== 
      this.RR1nnvqYt5m && (e = g[0] / this.RR1nnvqYt5m, this.YzNpqvKSPgJ(e, g, this.
      j6ZGg0Pt4R6))
    }
    , Lu1emfCOnjv : function (){
      var b;
      return "ongesturestart"in v ? this.XSobPo3R6RZ.off({
        gestureend : this.d5n1gMncsDl, gesturechange : this.Kfi4hOtUZmI
      }
      ) : n || (b = this.hammertime, b.off("transform", this.Kfi4hOtUZmI), b.off("transformend"
      , this.gestureEndEvt)), this.PlAo8puZLCx(), this.RR1nnvqYt5m = null, this.
      CqnhvQLb6fa = null, this.j6ZGg0Pt4R6 = null ,! 1
    }
    , Ia7rjik9KhJ : function (f, e, h){
      var g = e * f;
      return g > this.ryhlXYGMdQg ? [this.ryhlXYGMdQg, this.sPws6J9uwE2] : g < this.
      sTtnRSADRel ? [this.sTtnRSADRel, this.frZjUmjYdRP] : [ ~~ g ,~~ (h * f)]
    }
    , GgaLAlOKDDM : function (){
      this.U36JBGhGIaf && this.MakmVJwwyQt(), this.q7dxUE1n1P2 && (this.BjwlQNpVGsj(), 
      this.WxeuU00W58G()), this.rCBZ924CoFl ? (this.lvOvDxFoL1d && (clearTimeout(this.
      s2edS3lG6s6), this.lvOvDxFoL1d =! 1), this.ZiDI8ePJik8()) : this.ohaX9EVshI2 && 
      this.CWIZwvJjygd(), this.hKVprKjygye && clearTimeout(this.hKVprKjygye)
    }
    , YzNpqvKSPgJ : function (i, h, z){
      var y = z ? z[0] : this.bRgDKeXSmar, l = z ? z[1] : this.WsBERq2aDwM, k = y * i, j
       = l * i;
      q ? (this.hg78gccLEho(h[0], h[1], k, j), this.xeiUGuhH6MS()) : this.hg78gccLEho(h
      [0], h[1], this.nCByR7f4Tly.width() * (1 - i) / 2 + k, this.nCByR7f4Tly.height() * 
      (1 - i) / 2 + j)
    }
    , qwGWQH4fV9i : function (N, M, L, K){
      var J, I, H, G, F, E, D, C = this , B = 15, A = 0, z = 0, y = 150 / B;
      I = (N - this.qzQJX429O1c) / y, H = (M - this.ABJvA9rDSZ6) / y, G = (L - this.
      bRgDKeXSmar) / y, F = (K - this.WsBERq2aDwM) / y, E = function (){
        var f, e, h, g;
        A += B ,++ z > y || (f = C.bRgDKeXSmar + G, e = C.WsBERq2aDwM + F, C.hg78gccLEho(C
        .qzQJX429O1c + I, C.ABJvA9rDSZ6 + H, f, e), C.xeiUGuhH6MS(), h = (new Date).
        getTime(), g = setTimeout(E, B - (h - J - A)))
      }
      , J = (new Date).getTime(), D = setTimeout(E, B)
    }
    , PlAo8puZLCx : function (){
      !this.q7dxUE1n1P2 && this.qzQJX429O1c >= this.bhG1vqAVmN5 && this.YYfCc9DUcka()
    }
    , YYfCc9DUcka : function (){
      var E, D, C, B = this , A = this.bCxwsdBxXdX, z = (this.bCxwsdBxXdX + 1) % this.
      N569BzTl4FA, y = this.a7YX4DsL5Ty, h = y / 2, g = this.bhG1vqAVmN5, b = this.
      qzQJX429O1c;
      g >= y || this.ursecDgHnBj && r && g >= h || (C = b >= 1.2 * h ? this.oXgg7XiecK8 : 
      g >= h ? this.oXgg7XiecK8 : this.oXgg7XiecK8 + "Lv1/", 0 === z && (z = this.
      N569BzTl4FA), 10 > z && (z = "0" + z), E = this.bQ3jDAkro3y(C, z), D = w.
      createElement("img"), D.onload = function (){
        A === B.bCxwsdBxXdX && (q ? (B.jA1tYzcyGNn = D, B.tsjTZmBs3v7 =! 1, B.xeiUGuhH6MS
        ()) : (B.jA1tYzcyGNn = D, B.xeiUGuhH6MS()), D = null)
      }
      , D.src = this.correctPathCase(this.fileNamingCase, E))
    }
  }
  ), x.extend(Ortery.TruView.prototype, {
    sxGk4b4O8yN : function (){
      this.ZGTf9Cx3NuF <= 90 || this.ZGTf9Cx3NuF >= 270 ? (this.Eqp0cmrzA8v =! 1, this 
      .ZGTf9Cx3NuF = 0) : (this.Eqp0cmrzA8v =! 0, this.ZGTf9Cx3NuF = 180), this.
      ubGrFjVqou5()
    }
    , vvCxH1Lg0Hr : function (d){
      var c = d || event;
      c.stopPropagation ? c.stopPropagation() : c.cancelBubble =! 0
    }
    , MNkKOFJ6Ynh : function (b){
      b.preventDefault ? b.preventDefault() : b.returnValue =! 1
    }
    , LCNPfnZMXxn : function (a, h){
      var g = Math.round(a), f = Math.round(h);
      this.aZdQe4pwxJ7.css(!x.browser.msie && this.Eqp0cmrzA8v ? {
        "margin-left" : this.nCByR7f4Tly.width() - this.qzQJX429O1c - g, "margin-top" : 
        this.nCByR7f4Tly.height() - this.ABJvA9rDSZ6 - f
      }
       : {
        "margin-left" : g, "margin-top" : f
      }
      )
    }
    , Q544aYySYY5 : function (b){
      return this.slice(0, b.length) === b
    }
    , dm1mqzqzBC8 : function (b){
      return this.slice( - b.length) === b
    }
    , uTAphgR5dqX : function (a){
      var h = x('<div style="background-image:url(' + a + ');"></div>').css(
      "background-image"), g = this.Q544aYySYY5, f = this.dm1mqzqzBC8;
      return g.call(h, "url(") && (h = h.substring(4)), f.call(h, ")") && (h = h.substring
      (0, h.length - 1)), g.call(h, '"') && (h = h.substring(1, h.length)), f.call(h, '"')
       && (h = h.substring(0, h.length - 1)), h
    }
    , xIlZpgGYVx2 : function (D, C){
      var B, A, z, y, l, k = "", a = this ;
      for (D = D.match(/(\s*)(.+\/.+\.html)/i)[2], l = D.match(/(.+)(\/)(.+\.html)/i)[1], 
      B = this.uTAphgR5dqX(C), y = B.split("/"), z = y.length - 3, A = 0;
      z > A;
      A ++ ){
        k += y[A] + "/"
      }
      x.ajax({
        url : k + D, global :! 1, dataType : "html", error : function (){
          console.info("Error Url:" + this.url)
        }
        , success : function (X){
          var W, V, U, T, S, R, Q, P, O, N, M, L, K, J, I, H, G, F, E, j, i, h = k + 
          encodeURI(l) + "/";
          W = X.match(/(pathProfiles\:)(.*)/), V = X.match(/(pathImages\:)(.*)/), U = X.
          match(/(pathIcons\:)(.*)/), T = X.match(/(pathAudios\:)(.*)/), S = X.match(
          /(pathFrames\:)(.*)/), R = X.match(/(pathPages\:)(.*)/), Q = X.match(
          /(pathTiles\:)(.*)/), W && (W = W[0].split(",")[0], W = W.match(
          /(pathProfiles\:\s*)(.*)/)), V && (V = V[0].split(",")[0], V = V.match(
          /(pathImages\:\s*)(.*)/)), U && (U = U[0].split(",")[0], U = U.match(
          /(pathIcons\:\s*)(.*)/)), T && (T = T[0].split(",")[0], T = T.match(
          /(pathAudios\:\s*)(.*)/)), S && (S = S[0].split(",")[0], S = S.match(
          /(pathFrames\:\s*)(.*)/)), R && (R = R[0].split(",")[0], R = R.match(
          /(pathPages\:\s*)(.*)/)), Q && (Q = Q[0].split(",")[0], Q = Q.match(
          /(pathTiles\:\s*)(.*)/)), P = W ? W[2] : "'./Profiles/Profile.xml'", O = V ? V[2
          ] : "'./Images/'", N = U ? U[2] : "'./Profiles/Icons/'", M = T ? T[2] : 
          "'./Profiles/Audios/'", L = S ? S[2] : "'./Profiles/Frames/'", K = R ? R[2] : 
          "'./Profiles/Icons/'", J = Q ? Q[2] : "'./Profiles/Tiles/'", I = P.match(
          /(\W*\/)(.+)(\'|\")/)[2], H = O.match(/(\W*\/)(.+)(\'|\")/)[2], G = N.match(
          /(\W*\/)(.+)(\'|\")/)[2], F = M.match(/(\W*\/)(.+)(\'|\")/)[2], E = L.match(
          /(\W*\/)(.+)(\'|\")/)[2], j = K.match(/(\W*\/)(.+)(\'|\")/)[2], i = J.match(
          /(\W*\/)(.+)(\'|\")/)[2], a.nCByR7f4Tly.empty().animate3D({
            pathProfiles : h + I + "?" + Math.random(), pathImages : h + H, pathIcons : h + 
            G, pathAudios : h + F, pathFrames : h + E, pathPages : h + j, pathTiles : h + 
            i, fileNamingCase : a.fileNamingCase, autoAllocation : a.iHgDSCUUcWw
          }
          )
        }
      }
      )
    }
    , CWIZwvJjygd : function (){
      this.ohaX9EVshI2 =! 1, clearInterval(this.HhFswah11PO)
    }
    , BjwlQNpVGsj : function (){
      this.q7dxUE1n1P2 =! 1, this.nCByR7f4Tly.data("ort3d_isTurning" ,! 1), this.
      uqhKugsvHg6 && clearTimeout(this.uqhKugsvHg6), this.c0uD4mJ7vfR && clearInterval(
      this.c0uD4mJ7vfR)
    }
    , ZmhwPSGImzg : function (l, k, j, i, b){
      var a = x(".animateViewerTextCalculator");
      return a.length < 1 && (a = w.createElement("span"), a.className = 
      "animateViewerTextCalculator", w.body.appendChild(a), a = x(a)), a.empty().html(l).
      css({
        "font-style" : k || "normal", "font-weight" : j || "normal", "font-size" : i, 
        "font-family" : b
      }
      ), {
        width : a.css("width"), height : a.css("height")
      }
    }
    , BoJY2XsQd9B : function (){
      var d = this.ryhlXYGMdQg / this.qzQJX429O1c, c = [this.ryhlXYGMdQg, this.
      sPws6J9uwE2];
      this.YzNpqvKSPgJ(d, c), this.GgaLAlOKDDM(), this.PlAo8puZLCx()
    }
    , ww65C4TNGpl : function (){
      var d = this.sTtnRSADRel / this.qzQJX429O1c, c = [this.sTtnRSADRel, this.
      frZjUmjYdRP];
      this.GgaLAlOKDDM(), this.YzNpqvKSPgJ(d, c)
    }
    , j2KnWvHTixA : function (){
      var d, c = this.bCxwsdBxXdX;
      if (!this.b8nCnG6eOwM){
        if (this.GgaLAlOKDDM(), this.BsWo0BzEc8o){
          if (d = c + (this.Eqp0cmrzA8v ? 1 :- 1) ,! (d < this.hwRu8RgEokB || d > this.
          je098qml1Gu)){
            return 
          }
        }
        else {
          d = this.bCxwsdBxXdX + (this.Eqp0cmrzA8v ? 1 :- 1)
        }
        this.bCxwsdBxXdX = (d + this.N569BzTl4FA) % this.N569BzTl4FA, this.xeiUGuhH6MS
        ()
      }
    }
    , mCY0Z9JKWOn : function (){
      var d, c = this.bCxwsdBxXdX;
      if (!this.b8nCnG6eOwM){
        if (this.GgaLAlOKDDM(), this.BsWo0BzEc8o){
          if (d = c + (this.Eqp0cmrzA8v ?- 1 : 1) ,! (d < this.hwRu8RgEokB || d > this.
          je098qml1Gu)){
            return 
          }
        }
        else {
          d = this.bCxwsdBxXdX + (this.Eqp0cmrzA8v ?- 1 : 1)
        }
        this.bCxwsdBxXdX = (d + this.N569BzTl4FA) % this.N569BzTl4FA, this.xeiUGuhH6MS
        ()
      }
    }
    , Sz3iwreesbg : function (){
      this.b8nCnG6eOwM || (this.GgaLAlOKDDM(), this.tukUPz2gFB9(1), this.bCxwsdBxXdX = 
      this.bCxwsdBxXdX % this.N569BzTl4FA, this.xeiUGuhH6MS())
    }
    , RRGMDBhTUTy : function (){
      this.b8nCnG6eOwM || (this.GgaLAlOKDDM(), this.tukUPz2gFB9( - 1), this.
      bCxwsdBxXdX = this.bCxwsdBxXdX % this.N569BzTl4FA, this.xeiUGuhH6MS())
    }
    , KNlr0kTPIw2 : function (){
      var b = this ;
      return function (a, f, e){
        if ("function" != typeof b[f]){
          if ("get" === a){
            return b[f]
          }
          "set" === a && (b[f] = e)
        }
        else {
          "exec" === a && b[f](e)
        }
      }
    }
    , addDebuggerText : function (){
      var j = w.createElement("div"), i = w.createElement("p"), h = w.createElement("p"), 
      b = w.createElement("p"), a = w.createElement("p");
      return x(j).css({
        "z-index" : 10, position : "absolute", "font-family" : "Arial", "font-size" : 
        "2em", "font-weight" : "bold", top : "0px", left : "0px"
      }
      ).append(i).append(h).append(b).append(a).appendTo(this.nCByR7f4Tly), i.style.color = "red"
      , h.style.color = "blue", b.style.color = "green", a.style.color = "purple", this.
      rowDebugger = i, this.columnDebugger = h, this.degreeDebugger = b, this.
      reverseDebugger = a, this 
    }
    , yHi6dfvpMGB : function (d, c){
      d.removeClass("animateViewerBtnDisabled"), c.addClass("animateViewerBtnDisabled"), t
       || (d.addClass("animateViewerEffectBtn"), c.removeClass("animateViewerEffectBtn"))
    }
    , d5zewV5xz9O : function (b){
      t || (b.removeClass("animateViewerEffectBtn"), setTimeout(function (){
        b.addClass("animateViewerEffectBtn")
      }
      , 200))
    }
    , hg78gccLEho : function (f, e, h, g){
      this.ZMlaaryiYDe(f, e), this.qPg9NKxm8e2(h, g)
    }
    , ZMlaaryiYDe : function (d, c){
      this.qzQJX429O1c = d, this.ABJvA9rDSZ6 = c, q || this.aZdQe4pwxJ7.width(d).height
      (c)
    }
    , qPg9NKxm8e2 : function (d, c){
      this.bRgDKeXSmar = d, this.WsBERq2aDwM = c, q || this.LCNPfnZMXxn(d, c)
    }
  }
  )
}
(jQuery, document, window);
