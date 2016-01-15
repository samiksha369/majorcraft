jQuery.noConflict();
var Ortery = Ortery || {};
Ortery.TruView = function() {
    return this instanceof Ortery.TruView ? void 0 : new Ortery.TruView
}, function(Z, Y, X, W) {
    function V(d, c) {
        return "UpperCase" === d ? c.toUpperCase() : "LowerCase" === d ? c.toLowerCase() : c
    }
    function U(a, k, i, h) {
        var g = {},
            j = [];
        Z.ajax({
            global: !1,
            url: a.pathProfiles + "&" + Math.random(),
            dataType: "text xml",
            success: function(b) {
                var d = T(b, a);
                g = d[0], j = d[1]
            },
            error: function(e, d, f) {
                console.info("Can't load xml file.\njqXHR:" + e.status + ", textStatus:" + d + ", errorThrown:" + f)
            },
            complete: function() {
                var e, l, f, d, c, b;
                !g.teNt5o4Frex || "Photo" !== g.T89H0G8tlA2 && "Combo" !== g.T89H0G8tlA2 || (g.pagePhotoArray = P(j.length, a.pathPages, a.fileNamingCase)), e = a.pathImages, l = K && a.useSpriteImg ? O(e, g, a.fileNamingCase) : N(e, g, a.fileNamingCase), g.useSpriteImg = a.useSpriteImg, f = Z.getSizeToFitContainer([i, h], g.spaceAspectRatio), d = f[0] > f[1] ? f[0] : f[1], c = S(g, j, d, [i, h]), g.j9ukvLkJ6pg = e, g.BPpQBZjaoJa = a.pathIcons, g.PgKgNDjQKVU = f, g.dK4xnP7jH27 = a.autoAllocation, g.apkYqLjN8pO = a.apkYqLjN8pO, g.isConcurrent = a.isConcurrent, g.fileNamingCase = a.fileNamingCase, g.maxSpaceEdge = d, b = R(g), Q(c, b, k, l)
            }
        })
    }
    function T(a, l) {
        var k, j = Z("script[src*='HTML5Loader']").prop("src").match(/(.*)(HTML5Loader.js)(.*)$/i)[1],
            e = {},
            d = [];
        return "string" == typeof a ? (k = new ActiveXObject("Microsoft.XMLDOM"), k.async = !1, k.loadXML(a)) : k = a, Z(k).find("Profile").each(function() {
            e.producer = Z(this).attr("Producer"), "ThirdParty" === e.producer && (K = !1), Z(this).find("Object").each(function() {
                var c, m = Z(this);
                if (e.model = m.attr("Model"), "Spherical" !== e.model || C || (c = "UpperCase" === l.fileNamingCase ? j + "HTML5Angle.js".toUpperCase() : "LowerCase" === l.fileNamingCase ? j + "HTML5Angle.js".toLowerCase() : j + "HTML5Angle.js", Z.ajax({
                    global: !1,
                    url: c,
                    dataType: "script",
                    async: !1
                }), C = !0), 
                	e.imgRows = ~~m.attr("Rows"),
                	e.imgColumns = ~~m.attr("Columns"),
                	e.imgWidth = ~~m.attr("Width"),
                	e.imgHeight = ~~m.attr("Height"),
                	e.C8V4ywzC0qQ = e.imgWidth * e.imgHeight > 5000000,
                	e.inertia = "True" === m.attr("Inertia"),
                	e.gwSrfvoDgqT = m.attr("FreeRotate") === W ? !0 : "True" === m.attr("FreeRotate"),
                	m.find("Space").each(function() {
                		var f = Z(this);
                		e.spaceAspectRatio = f.attr("Width") / f.attr("Height")
                }), m.find("Frame").each(function() {
                    var f = Z(this);
                    e.showFrame = "True" === f.attr("Draw");
                    e.showFrame && (e.frameStyle = f.attr("Style"),
                    	e.frameAttribute = f.attr("Attribute"),
                    	e.frameColor = f.attr("Color")),
                    e.frameBackground = f.attr("Background")
                }), e.showFrame) {
                    var h = l.pathFrames,
                        g = h + V(l.fileNamingCase, e.frameStyle + ".xml");
                    Z.ajax({
                        global: !1,
                        url: g + "?" + Math.random(),
                        dataType: "text xml",
                        async: !1,
                        success: function(f) {
                            var n, i = {};
                            "string" == typeof f ? (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = !1, n.loadXML(f)) : n = f, "Contemporary" === e.frameStyle ? Z(n).find("Bar").each(function() {
                                var o = Z(this);
                                i.location = o.attr("Location"), i.FnA0jHa78bV = o.attr("HiPercent")
                            }) : "Flash Bar" === e.frameStyle ? (Z(n).find("Bar").each(function() {
                                var o = Z(this);
                                i.location = o.attr("Location"), i.FnA0jHa78bV = o.attr("HiPercent")
                            }), Z(n).find("Speed").each(function() {
                                var o = Z(this);
                                "Fast" === e.frameAttribute ? i.R3Ykm79Bkac = 100 * o.attr("Fast") : "Medium" === e.frameAttribute ? i.R3Ykm79Bkac = 100 * o.attr("Medium") : "Slow" === e.frameAttribute && (i.R3Ykm79Bkac = 100 * o.attr("Slow"))
                            })) : "Pixel Image" === e.frameStyle && Z(n).find("Frame").each(function() {
                                var o, t, s, r, q, p = Z(this);
                                e.frameAttribute === p.attr("Attribute") && (p.find("Top").each(function() {
                                    var b = Z(this);
                                    o = {
                                        sizeW: ~~b.attr("Width"),
                                        sizeH: ~~b.attr("Height"),
                                        imgPath: h + b.text()
                                    }
                                }), p.find("Left").each(function() {
                                    var u = Z(this);
                                    t = {
                                        sizeW: ~~u.attr("Width"),
                                        sizeH: ~~u.attr("Height"),
                                        imgPath: h + u.text()
                                    }
                                }), p.find("Right").each(function() {
                                    var u = Z(this);
                                    s = {
                                        sizeW: ~~u.attr("Width"),
                                        sizeH: ~~u.attr("Height"),
                                        imgPath: h + u.text()
                                    }
                                }), p.find("Bottom").each(function() {
                                    var u = Z(this);
                                    r = {
                                        sizeW: ~~u.attr("Width"),
                                        sizeH: ~~u.attr("Height"),
                                        imgPath: h + u.text()
                                    }
                                }), q = (o.sizeH || 0) + (t.sizeH || s.sizeH || 0) + (r.sizeH || 0), 0 === q && (q = 1), o && (o.zlbUjIRwU0J = o.sizeH / q, i.jUgMCT3PVgW = o, o.sizeH = null), t && (t.zlbUjIRwU0J = t.sizeH / q, i.V7IV7EVSwkl = t, t.sizeH = null), s && (s.zlbUjIRwU0J = s.sizeH / q, i.MQE74dXY8FH = s, s.sizeH = null), r && (r.zlbUjIRwU0J = r.sizeH / q, i.KWWwCxWB338 = r, r.sizeH = null))
                            }), e.VUb3h2t29lI = h, e.YahXSE7ucSF = i
                        }
                    })
                }
                m.find("Controls").each(function() {
                    var f = Z(this);
                    e.ButtonFolder = f.attr("Folder"), e.ButtonsLeft = f.attr("Left"), e.ButtonsBottom = f.attr("Bottom"), e.buttonSize = f.attr("Dimension"), e.buttonPostion = f.attr("Position"), e.hGEFy6EI9s7 = f.attr("Move"), e.DJrAP71iabm = f.attr("Zoom"), e.teNt5o4Frex = !0, e.trDe6IDwqSN = f.attr("Play"), e.T89H0G8tlA2 = f.attr("Page"), e.VCuKt8g15QN = "True" === f.attr("Show")
                }), e.ja6SIt01gjQ = "Hide" === e.DJrAP71iabm ? !1 : !0, m.find("Description").each(function() {
                    e.S5yBlHSoASu = Z(this).text()
                }), m.find("Controller").each(function() {
                    var f = Z(this);
                    e.p8lszZUAkeZ = ~~f.attr("PhaseIn"), e.FpxNSOyzgRo = "True" === f.attr("Repeatness"), e.ndNby6a4fDm = 1000 * (f.attr("RotateTime") / 10) / e.imgColumns, e.rotationDirection = "CW" === f.attr("Direction"), e.MOecrJxQtmu = "True" === f.attr("Flip") && 1 !== e.imgRows
                }), m.find("Link").each(function() {
                    var f = Z(this);
                    e.linkTarget = f.attr("Style"), e.uA59jP9JmuQ = f.text()
                }), m.find("InitView").each(function() {
                    var f = Z(this);
                    K && (e.iREL2BOCHs3 = ~~f.attr("Columns"), e.B9FvyuzSTs7 = ~~f.attr("Width"), e.X36HheNK1OW = ~~f.attr("Height")), e.VIODiRrUw35 = f.attr("ZoomMax") / 10, e.pkaIdigtGO8 = f.attr("ZoomMin") / 10, e.LPzS7D3N8n3 = f.attr("ZoomFactor") / 100
                }), m.find("Media").each(function() {
                    var f = Z(this);
                    e.mediaType = f.attr("Type"), e.mediaSyle = f.attr("Style"), e.mediaSource = l.pathMedia + f.text()
                }), m.find("ContextMenu").each(function() {
                    e.bbSnirb7BMi = Z(this).attr("Text"), e.utWixCuZVYu = Z(this).text()
                }), m.find("NoShow").each(function() {
                    "Cylindrical" === e.model || "Hemispherical" === e.model ? (e.rEyshwi5o4p = !0, e.inertia = !1) : e.rEyshwi5o4p = !1, e.XsYsBpR7Z0y = ~~Z(this).attr("from") - 1, e.lg7YVUgNuZ3 = ~~Z(this).attr("to") - 1
                }), e.kG9RziZBpMW = l.pathProfiles/*.match(/(.+\/)(.+\.(xml))/i)[1]*/.match(/(.*)(\?)/i)[1]
            }), e.Z2u31wHe1n3 = !1, Z(this).find("Page").each(function() {
                var c = Z(this),
                    g = {
                        QKaQHx4BxR3: [],
                        LV3TZdnOki3: c.attr("Title"),
                        H0TLJixJlYS: 1000 * c.attr("Time")
                    };
                if (L && c.find("Sign").each(function() {
                    var h = Z(this),
                        i = {
                            type: h.attr("Type"),
                            source: l.pathTiles + h.attr("Source"),
                            offset: {
                                x: h.attr("OffsetX"),
                                y: h.attr("OffsetY")
                            },
                            w: h.attr("W"),
                            h: h.attr("H"),
                            a: ~~h.attr("A"),
                            c: h.attr("Color") || "00FFFFFF"
                        };
                    e.Z2u31wHe1n3 = !0, h.find("Title").each(function() {
                        i.title = Z(this).text()
                    }), h.find("TextBlock").each(function() {
                        var m, n = Z(this);
                        i.YNSG3ewA5hd = {
                            width: n.attr("W"),
                            align: n.attr("Align") || "Left",
                            strings: []
                        }, m = i.YNSG3ewA5hd, n.find("String").each(function() {
                            var o = Z(this),
                                b = {
                                    SqlVWEVvpUs: o.text(),
                                    fontFamily: o.attr("FontFamily") || "Arial",
                                    fontSize: ~~o.attr("FontSize") || 12,
                                    fontWeight: o.attr("FontWeight") || "Normal",
                                    fontStyle: o.attr("FontStyle") || "Normal",
                                    mvIxKMlkfDM: o.attr("Color") || "FF000000",
                                    p: {
                                        x: o.attr("X"),
                                        y: o.attr("Y")
                                    }
                                };
                            m.strings.push(b)
                        })
                    }), h.find("Pointer").each(function() {
                        var m = Z(this);
                        i.l3TEFPeqgdW = {
                            x: m.attr("X"),
                            y: m.attr("Y")
                        }
                    }), h.find("Animation").each(function() {
                        var m = Z(this);
                        i.animation = {
                            YBPLmbsWsVM: m.attr("Style") || "Static",
                            uSXRZxbmLgA: m.attr("StartTime") / 10,
                            FEfWWNJ2Nu2: m.attr("Duration") / 10
                        }
                    }), h.find("Link").each(function() {
                        var m = Z(this);
                        i.link = {
                            linkTarget: m.attr("Style"),
                            oMHmRZdH33g: m.text()
                        }
                    }), J && h.find("Audio").each(function() {
                        var m = Z(this);
                        i.Qy0qP4LvXza = {
                            filepath: l.pathAudios + m.attr("Source"),
                            guBYRpTy5Tq: "True" === m.attr("Loop"),
                            GKaQ9Qq8pW1: "True" === m.attr("Lasting")
                        }
                    }), g.QKaQHx4BxR3.push(i)
                }), J && c.children("Audio").each(function() {
                    var h = Z(this);
                    g.pageAudio = {
                        filepath: l.pathAudios + h.attr("Source"),
                        guBYRpTy5Tq: "True" === h.attr("Loop"),
                        GKaQ9Qq8pW1: "True" === h.attr("Lasting"),
                        gAepXLC2xe5: 1000 * h.attr("StartTime")
                    }, H && (g.pageAudio.gAepXLC2xe5 = -1)
                }), c.find("Geo").each(function() {
                    var h, i = Z(this);
                    g.E6YDoXyxWOU = {}, i.find("Angles").each(function() {
                        var m = Z(this);
                        g.E6YDoXyxWOU = {
                            ZV9tVDa0M9h: ~~m.attr("T"),
                            qDjyaSnJyBq: ~~m.attr("P"),
                            d2Kw7eDbIR3: ~~m.attr("W")
                        }
                    }), h = g.E6YDoXyxWOU, i.find("Scale").each(function() {
                        h.PIc3oTCCwIj = Z(this).attr("Z") / 10
                    }), i.find("Pan").each(function() {
                        var b = Z(this);
                        h.T6AfXFeIeSe = {
                            x: b.attr("X"),
                            y: -b.attr("Y")
                        }
                    })
                }), e.Z2u31wHe1n3 && !D && L) {
                    var f;
                    f = "UpperCase" === l.fileNamingCase ? j + "HTML5Drawer.js".toUpperCase() : "LowerCase" === l.fileNamingCase ? j + "HTML5Drawer.js".toLowerCase() : j + "HTML5Drawer.js", Z.ajax({
                        global: !1,
                        url: f,
                        dataType: "script",
                        async: !1
                    }), D = !0
                }
                d.push(g)
            })
        }), k = null, [e, d]
    }
    function S(a, b, c) {
        var d, ab, aa, z, y, x, w, v, u, t, s, r = c / 4000,
            o = b.length;
        for (("Hide" !== a.hGEFy6EI9s7 || "Hide" !== a.DJrAP71iabm || "Hide" !== a.trDe6IDwqSN) && (a.ctrBtnSize = a.buttonSize, a.ctrBtnSize > 64 && (a.ctrBtnSize = 64)), v = 0; o > v; v++) {
            if (L) {
                for (d = b[v].QKaQHx4BxR3.length, u = 0; d > u; u++) {
                    if (ab = b[v].QKaQHx4BxR3[u], aa = ab.offset, aa.x *= r, aa.y *= r, ab.w *= r, ab.h *= r, y = ab.YNSG3ewA5hd) {
                        for (y.width *= r, x = b[v].QKaQHx4BxR3[u].YNSG3ewA5hd.strings.length, w = y.strings, t = 0; x > t; t++) {
                            w[t].fontSize *= 10 * r, w[t].p.x *= r, w[t].p.y *= r, w[t].p.w *= r
                        }
                    }
                    ab.l3TEFPeqgdW && (z = ab.l3TEFPeqgdW, z.x *= r, z.y *= r)
                }
            }
            s = b[v].E6YDoXyxWOU.T6AfXFeIeSe, s.x *= r, s.y *= r
        }
        return [a, b]
    }
    function R(d) {
        var c;
        return c = K && d.useSpriteImg ? d.kDRVcmF4Vzk ? "Spherical" === d.model ? 2 : 1 : d.imgRows * Math.ceil(d.imgColumns / d.iREL2BOCHs3) : d.imgRows * d.imgColumns, function(b) {
            return b.counter === c
        }
    }
    function Q(g, f, j, i) {
        if (f(i)) {
            var h = new Ortery.TruView;
            h.D8R4XL2UmFm(j, i, g)
        } else {
            setTimeout(function() {
                Q(g, f, j, i)
            }, 500)
        }
    }
    function P(n, m, l) {
        var k, e, b = [],
            a = 0;
        for (e = function(i, f) {
            var d = Y.createElement("img");
            Z(d).load(function() {
                b[f] = this, this.naturalWidth || (this.naturalWidth = this.width), this.naturalHeight || (this.naturalHeight = this.height), d = null
            }), d.src = m + V(l, "Page" + i + ".ps360")
        }; n > a; a++) {
            k = a + 1, 10 > k && (k = "0" + k), e(k, a)
        }
        return b
    }
    function O(d, g, i) {
        var j, z, y, x, w, v, u = !1,
            n = !0,
            e = [],
            b = Math.ceil(g.imgColumns / g.iREL2BOCHs3),
            a = g.imgRows;
        if (e.counter = 0, w = function(c, h) {
            var f = Y.createElement("img");
            f.onload = function() {
                e.counter++, e[c] = this, f = null
            }, f.src = d + V(i, h + ".ps360")
        }, Z.browser.mozilla) {
            var k, ae = g.imgColumns * g.B9FvyuzSTs7;
            k = "Spherical" === g.model ? g.imgRows / 2 * g.X36HheNK1OW : g.imgRows * g.X36HheNK1OW, (ae > 32000 || k > 32000) && (u = !0)
        }
        if (u || M) {
            for (y = 0; a > y; y++) {
                for (x = 0; b > x; x++) {
                    j = x + 1, 10 > j && (j = "0" + j), z = y + 1, 10 > z && (z = "0" + z), v = y * b + x, w(v, "R" + z + j)
                }
            }
            n = !1
        } else {
            w(0, "Ni"), "Spherical" === g.model && w(1, "Si")
        }
        return g.kDRVcmF4Vzk = n, e
    }
    function N(j, k, l) {
        var m, aa, z, y = k.model,
            x = [],
            w = 1,
            v = 1,
            u = "N",
            t = "",
            e = k.imgRows,
            b = k.imgColumns,
            a = e * b,
            af = e / 2 + 1;
        for (x.counter = 0, /*j += "Lv2/",*/ m = function() {
            return "Cylindrical" === y ?
            function(d, c) {
                return d + /*"img" +*/ c + ".ps360"
            } : "Hemispherical" === y ?
            function(g, f, i, h) {
                return g + "N" + h + "-" + f + ".ps360"
            } : "Spherical" === y ?
            function(g, f, i, h) {
                return g + i + h + "-" + f + ".ps360"
            } : void 0
        }(), z = function(i, h) {
            var f = Y.createElement("img");
            Z(f).load(function() {
                x.counter++, x[i] = this, f = null
            }), f.src = V(l, h)
        }, aa = 0; a > aa; aa++) {
            t = v + "", 1 === t.length && (t = "0" + t), z(aa, m(j, t, u, w)), v >= b ? (v = 1, w++) : v++, "Spherical" === y && w === af && (u = "S", w = 1)
        }
        return x
    }
    var M, L, K, J, I, H, G = navigator.userAgent,
        F = navigator.platform,
        E = !1,
        D = !1,
        C = !1;
    I = !(!G.match(/Android/i) || !G.match(/Mobile Safari/i)), H = Boolean(F.match(/iPad|iPhone|iPod/i)), M = function() {
        return H ? !0 : !! G.match(/iPhone|iPad|Android|Blackberry|Windows CE|Palm/i)
    }(), L = function() {
        return Y.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
    }(), K = function() {
        var b = Y.createElement("canvas");
        return !(!b.getContext || !b.getContext("2d"))
    }(), J = function() {
        var b = Y.createElement("audio");
        return Boolean(b.canPlayType)
    }(), Ortery.TruView.VERSION = "1.6.30", Ortery.environment = {
        WHWITHrQKnE: M,
        Z0d7Q7vyIRP: I,
        isIOSDevice: H,
        N0Jbwd3sVIm: L,
        uW0DTih35eX: K,
        c1foPjEMDvw: J
    }, Ortery.TruView.prototype.correctPathCase = V;
    var B = {
        apkYqLjN8pO: {
            show: !1,
            text: "Use mouse right button to switch pan or rotate action."
        },
        pathProfiles: "./Profiles/ProfileL.xml",
        pathImages: "./Images/",
        pathIcons: "./Profiles/Icons/",
        pathFrames: "./Profiles/Frames/",
        pathPages: "./Profiles/Icons/",
        pathTiles: "./Profiles/Tiles/",
        pathAudios: "./Profiles/Audios/",
        pathMedia: "./Profiles/Media/",
        fileNamingCase: "Default",
        useSpriteImg: !0,
        isConcurrent: !1,
        extraConcurrentElem: "",
        autoAllocation: !0
    },
        A = {
            init: function(n, m) {
                var f, e, c, b = this,
                    a = this.length;
                return n = Z.extend({}, B, n), K || (n.useSpriteImg = !1), c = n.fileNamingCase, this.each(function(v) {
                    var l, k, i, g, d, ae, ad, ac, ab, aa, z = Z(this),
                        j = {};
                    for (ac in n) {
                        j[ac] = Z.isArray(n[ac]) ? n[ac][v] : n[ac], ac.match(/path/) && (j[ac] = V(c, j[ac]))
                    }
                    for (m && (this._callback = Z.isArray(m) && m[v] ? m[v] : m), this.isConcurrent = j.isConcurrent, this.B9yzwPxJ95V = [], l = 0; a > l; l++) {
                        l !== v && this.B9yzwPxJ95V.push(b[l])
                    }
                    if (ab = j.extraConcurrentElem) {
                        if (Z.isArray(ab)) {
                            for (aa = Z(ab).length, l = 0; aa > l; l++) {
                                if (g = ab[l], Z.isArray(g)) {
                                    for (k = 0; k < g.length; k++) {
                                        if ("string" == typeof g[k]) {
                                            for (d = Z(g[k]), i = 0; i < d.length; i++) {
                                                -1 === Z.inArray(d[i], this.B9yzwPxJ95V) && d[i] !== this && (Z(d[i]).data("bePartner", !0), this.B9yzwPxJ95V.push(d[i]))
                                            }
                                        }
                                    }
                                } else {
                                    if ("string" == typeof g) {
                                        for (d = Z(g), i = 0; i < d.length; i++) {
                                            -1 === Z.inArray(d[i], this.B9yzwPxJ95V) && d[i] !== this && (Z(d[i]).data("bePartner", !0), this.B9yzwPxJ95V.push(d[i]))
                                        }
                                    }
                                }
                            }
                        } else {
                            if ("string" == typeof ab) {
                                for (d = Z(ab), i = 0; i < d.length; i++) {
                                    -1 === Z.inArray(d[i], this.B9yzwPxJ95V) && d[i] !== this && (Z(d[i]).data("bePartner", !0), this.B9yzwPxJ95V.push(d[i]))
                                }
                            }
                        }
                    }
                    ae = j.autoAllocation === !0 ? X.innerWidth || Y.documentElement.clientWidth : z.innerWidth() || 600, ad = j.autoAllocation === !0 ? X.innerHeight || Y.documentElement.clientHeight : z.innerHeight() || 600;
                    var h = V(c, "iconLoading.gif");
                    z.css({
                    	/* EZ - trying for responcive */
                        //width: ae,
                        //height: ad,
                    	width: "100%",
                    	height: "100%",
                        "user-select": "none"
                    }).append('<div class="animateViewerLoader" style="background-image:url(' + j.pathIcons + h + ')"></div>'), j.autoAllocation && (E || (A._setFullScreenEnviroment(j.autoAllocation), f = X.innerWidth || Y.documentElement.clientWidth, e = X.innerHeight || Y.documentElement.clientHeight), z.css("position", "absolute"), j.autoAllocation !== !0 || Z.browser.msie && Z.browser.version < 9 ? j.autoAllocation !== !0 && z.css({
                        left: f > ae ? (f - ae) / 2 : 0,
                        top: e > ad ? (e - ad) / 2 : 0
                    }) : z.css({
                        width: "100%",
                        height: "100%"
                    }), ae = parseInt(z.css("width"), 10), ad = parseInt(z.css("height"), 10)), U(j, z, ae, ad)
                })
            },
            _setFullScreenEnviroment: function(b) {
                var a = Z('<meta name = "viewport" />');
                b === !0 ? a.attr("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no") : a.attr("content", "user-scalable=no"), Z("head").append(a), Y.body.style.margin = "0px", E = !0
            },
            setBackgroundColor: function(a) {
                return this.each(function() {
                    var e = Z(this),
                        b = e.attr("style");
                    e.attr("style", b + " background-color:" + a + " !important;")
                })
            },
            setNativeFullScreen: function(a, d) {
                return this.each(function() {
                    function b() {
                        var e = a[0],
                            f = e.requestFullScreen || e.webkitRequestFullScreen || e.mozRequestFullScreen;
                        f && f.call(e)
                    }
                    d ? Z(d).on("click", b) : b()
                })
            },
            _changeCtnBtnDisplayStatus: function(a, l, k) {
                var j, i = a,
                    h = Z(a);
                j = function() {
                    var s, r, q, p, o, n, g, f = h.find(".animateViewerToggleCtrBtn"),
                        c = f.data("show");
                    if (("toggle" === l || "show" === l && !c || "hide" === l && c) && f.trigger("conCurrentClick"), i._operateAnimation && (r = i._operateAnimation("get", "isConcurrent"))) {
                        for (p = i.B9yzwPxJ95V, o = p.length, s = 0; o > s; s++) {
                            q = p[s], n = Z(q).find(".animateViewerToggleCtrBtn"), g = n.data("show"), ("toggle" === l || "show" === l && !g || "hide" === l && g) && n.trigger("conCurrentClick")
                        }
                    }
                }, k ? Z(k).on("click", j) : j()
            },
            showControlBar: function(b) {
                return this.each(function() {
                    A._changeCtnBtnDisplayStatus(this, "show", b)
                })
            },
            hideControlBar: function(b) {
                return this.each(function() {
                    A._changeCtnBtnDisplayStatus(this, "hide", b)
                })
            },
            toggleControlBar: function(b) {
                return this.each(function() {
                    A._changeCtnBtnDisplayStatus(this, "toggle", b)
                })
            },
            zoomIn: function(a) {
                return this.each(function(e) {
                    var b = Z(this);
                    a ? Z(a).on("click", function(c) {
                        b.find(".animateViewerZoomIn").trigger("click", [c, "zoomIn"])
                    }) : b.find(".animateViewerZoomIn").trigger("click", [e, "zoomIn"])
                })
            },
            zoomOut: function(a) {
                return this.each(function(e) {
                    var b = Z(this);
                    a ? Z(a).on("click", function(c) {
                        b.find(".animateViewerZoomOut").trigger("click", [c, "zoomOut"])
                    }) : b.find(".animateViewerZoomOut").trigger("click", [e, "zoomOut"])
                })
            },
            pan: function(a) {
                return this.each(function() {
                    function e() {
                        b.find(".animateViewerMovePan").trigger("click")
                    }
                    var b = Z(this);
                    a ? Z(a).on("click", e) : e()
                })
            },
            rotate: function(a) {
                return this.each(function() {
                    function e() {
                        b.find(".animateViewerMoveRotate").length ? b.find(".animateViewerMoveRotate").trigger("click") : b.find(".animateViewerMovePan").trigger("click")
                    }
                    var b = Z(this);
                    a ? Z(a).on("click", e) : e()
                })
            },
            toggleMove: function(a) {
                return this.each(function() {
                    var g, f, b = this;
                    g = function() {
                        var c = Z(this);
                        "pan" === c.data("ort3d_Wy5TV6yedV5") ? c.find(".animateViewerMoveRotate").length ? c.find(".animateViewerMoveRotate").trigger("conCurrentClick") : c.find(".animateViewerMovePan").trigger("conCurrentClick") : c.find(".animateViewerMovePan").trigger("conCurrentClick")
                    }, f = function() {
                        var e, c, i, h;
                        if (g.call(b), c = b._operateAnimation("get", "isConcurrent")) {
                            for (h = b.B9yzwPxJ95V, i = h.length, e = 0; i > e; e++) {
                                g.call(h[e])
                            }
                        }
                    }, a ? Z(a).on("click", function() {
                        f()
                    }) : f()
                })
            },
            autoTurn: function(a) {
                return this.each(function() {
                    function e() {
                        b.find(".animateViewerPlayStart").trigger("click")
                    }
                    var b = Z(this);
                    a ? Z(a).on("click", e) : e()
                })
            },
            stopTurn: function(a) {
                return this.each(function() {
                    function e() {
                        0 !== b.find(".animateViewerPlayStop").length ? b.find(".animateViewerPlayStop").trigger("click") : b.find(".animateViewerPlayStart").trigger("click")
                    }
                    var b = Z(this);
                    a ? Z(a).on("click", e) : e()
                })
            },
            toggleTurn: function(a) {
                return this.each(function() {
                    var g, f, b = this;
                    g = function() {
                        var c = Z(this);
                        c.data("ort3d_isTurning") ? 0 !== c.find(".animateViewerPlayStop").length ? c.find(".animateViewerPlayStop").trigger("conCurrentClick") : c.find(".animateViewerPlayStart").trigger("conCurrentClick") : c.find(".animateViewerPlayStart").trigger("conCurrentClick")
                    }, f = function() {
                        var e, c, i, h;
                        if (g.call(b), c = b._operateAnimation("get", "isConcurrent")) {
                            for (h = b.B9yzwPxJ95V, i = h.length, e = 0; i > e; e++) {
                                g.call(h[e])
                            }
                        }
                    }, a ? Z(a).on("click", function() {
                        f()
                    }) : f()
                })
            },
            openMagnifier: function(a) {
                return this.each(function() {
                    function g() {
                        var d, k, j, i, e;
                        if (f._operateAnimation && (b.find(".animateViewerMagnifierDiv").is(":visible") || b.find(".animateViewerMagnifier").trigger("conCurrentClick"), k = f._operateAnimation("get", "isConcurrent"))) {
                            for (i = f.B9yzwPxJ95V, e = i.length, d = 0; e > d; d++) {
                                j = i[d], Z(j).find(".animateViewerMagnifierDiv").is(":visible") || Z(j).find(".animateViewerMagnifier").trigger("conCurrentClick")
                            }
                        }
                    }
                    var f = this,
                        b = Z(this);
                    a ? Z(a).on("click", g) : g()
                })
            },
            closeMagnifier: function(a) {
                return this.each(function() {
                    function g() {
                        var d, k, j, i, e;
                        if (f._operateAnimation && (b.find(".animateViewerMagnifierDiv").is(":visible") && b.find(".animateViewerMagnifier").trigger("conCurrentClick"), k = f._operateAnimation("get", "isConcurrent"))) {
                            for (i = f.B9yzwPxJ95V, e = i.length, d = 0; e > d; d++) {
                                j = i[d], Z(j).find(".animateViewerMagnifierDiv").is(":visible") && Z(j).find(".animateViewerMagnifier").trigger("conCurrentClick")
                            }
                        }
                    }
                    var f = this,
                        b = Z(this);
                    a ? Z(a).on("click", g) : g()
                })
            },
            toggleMagnifier: function(a) {
                return this.each(function() {
                    var b = Z(this);
                    a ? Z(a).on("click", function() {
                        b.find(".animateViewerMagnifier").trigger("click")
                    }) : b.find(".animateViewerMagnifier").trigger("click")
                })
            },
            zoomToMax: function(a) {
                return this.each(function() {
                    var e, b = this;
                    e = function() {
                        var g, d, j, i, h;
                        if (b._operateAnimation && (b._operateAnimation("get", "rKg3QoCoPfd") || b._operateAnimation("exec", "Xrtykkpu2b7"), d = b._operateAnimation("get", "isConcurrent"))) {
                            for (i = b.B9yzwPxJ95V, h = i.length, g = 0; h > g; g++) {
                                j = i[g], j._operateAnimation && (j._operateAnimation("get", "rKg3QoCoPfd") || j._operateAnimation("exec", "Xrtykkpu2b7"))
                            }
                        }
                    }, a ? Z(a).on("click", e) : e()
                })
            },
            zoomToMin: function(a) {
                return this.each(function() {
                    var e, b = this;
                    e = function() {
                        var g, d, j, i, h;
                        if (b._operateAnimation && (b._operateAnimation("get", "rKg3QoCoPfd") || b._operateAnimation("exec", "eKycro1mDei"), d = b._operateAnimation("get", "isConcurrent"))) {
                            for (i = b.B9yzwPxJ95V, h = i.length, g = 0; h > g; g++) {
                                j = i[g], j._operateAnimation && (j._operateAnimation("get", "rKg3QoCoPfd") || j._operateAnimation("exec", "eKycro1mDei"))
                            }
                        }
                    }, a ? Z(a).on("click", e) : e()
                })
            },
            setTurnSpeed: function(a, d) {
                return "object" != typeof a && (d = a, a = W), this.each(function() {
                    var c, b = this;
                    isNaN(d) || (c = function() {
                        var h, e, k, j, i;
                        if (b._operateAnimation && (b._operateAnimation("set", "ndNby6a4fDm", d), e = b._operateAnimation("get", "isConcurrent"))) {
                            for (j = b.B9yzwPxJ95V, i = j.length, h = 0; i > h; h++) {
                                k = j[h], k._operateAnimation && k._operateAnimation("set", "ndNby6a4fDm", d)
                            }
                        }
                    }, a ? Z(a).on("click", c) : c())
                })
            },
            nextColumn: function(a) {
                return this.each(function() {
                    var e, b = this;
                    e = function() {
                        var g, d, j, i, h;
                        if (b._operateAnimation && (b._operateAnimation("exec", "qcFvIOGPoaw"), d = b._operateAnimation("get", "isConcurrent"))) {
                            for (i = b.B9yzwPxJ95V, h = i.length, g = 0; h > g; g++) {
                                j = i[g], j._operateAnimation && j._operateAnimation("exec", "qcFvIOGPoaw")
                            }
                        }
                    }, a ? Z(a).on("click", e) : e()
                })
            },
            previousColumn: function(a) {
                return this.each(function() {
                    var e, b = this;
                    e = function() {
                        var g, d, j, i, h;
                        if (b._operateAnimation && (b._operateAnimation("exec", "uUt5EX3IJok"), d = b._operateAnimation("get", "isConcurrent"))) {
                            for (i = b.B9yzwPxJ95V, h = i.length, g = 0; h > g; g++) {
                                j = i[g], j._operateAnimation && j._operateAnimation("exec", "uUt5EX3IJok")
                            }
                        }
                    }, a ? Z(a).on("click", e) : e()
                })
            },
            upperRow: function(a) {
                return this.each(function() {
                    var e, b = this;
                    e = function() {
                        var g, d, j, i, h;
                        if (b._operateAnimation && (b._operateAnimation("exec", "JflhWpR3SEZ"), d = b._operateAnimation("get", "isConcurrent"))) {
                            for (i = b.B9yzwPxJ95V, h = i.length, g = 0; h > g; g++) {
                                j = i[g], j._operateAnimation && j._operateAnimation("exec", "JflhWpR3SEZ")
                            }
                        }
                    }, a ? Z(a).on("click", e) : e()
                })
            },
            lowerRow: function(a) {
                return this.each(function() {
                    var e, b = this;
                    e = function() {
                        var g, d, j, i, h;
                        if (b._operateAnimation && (b._operateAnimation("exec", "tXpvCdcv6GR"), d = b._operateAnimation("get", "isConcurrent"))) {
                            for (i = b.B9yzwPxJ95V, h = i.length, g = 0; h > g; g++) {
                                j = i[g], j._operateAnimation && j._operateAnimation("exec", "tXpvCdcv6GR")
                            }
                        }
                    }, a ? Z(a).on("click", e) : e()
                })
            },
            openConcurrent: function(b) {
                return this.each(function() {
                    var a, d = this;
                    a = function() {
                        var c;
                        if (d._operateAnimation) {
                            if (c = d._operateAnimation("get", "isConcurrent")) {
                                return
                            }
                            d._operateAnimation("set", "isConcurrent", !0), d._operateAnimation("exec", "canvasRotate", 360)
                        }
                    }, b ? b.on("click", a) : a()
                })
            },
            closeConcurrent: function(b) {
                return this.each(function() {
                    var a, d = this;
                    a = function() {
                        var c;
                        if (d._operateAnimation) {
                            if (c = d._operateAnimation("get", "isConcurrent"), !c) {
                                return
                            }
                            d._operateAnimation("set", "isConcurrent", !1)
                        }
                    }, b ? b.on("click", a) : a()
                })
            },
            toggleConcurrent: function(a) {
                return this.each(function() {
                    function e() {
                        var c;
                        b._operateAnimation && (c = b._operateAnimation("get", "isConcurrent"), b._operateAnimation("set", "isConcurrent", !c))
                    }
                    var b = this;
                    a ? Z(a).on("click", e) : e()
                })
            },
            toggleFrame: function(a) {
                return this.each(function() {
                    function e() {
                        var c = b.find(".animateViewerEaselDiv");
                        c.length > 0 && (c.is(":visible") ? c.hide() : c.show())
                    }
                    var b = Z(this);
                    a ? Z(a).on("click", e) : e()
                })
            },
            togglePageSlide: function(a) {
                return this.each(function() {
                    var b = Z(this);
                    a ? Z(a).on("click", function() {
                        b.find(".animateViewerStartPageBtn").trigger("click")
                    }) : b.find(".animateViewerStartPageBtn").trigger("click")
                })
            },
            toggleInertia: function(a) {
                return this.each(function() {
                    function e() {
                        var d, c;
                        b._operateAnimation && (d = b._operateAnimation("get", "rEyshwi5o4p"), c = b._operateAnimation("get", "inertia"), d || b._operateAnimation("set", "inertia", !c))
                    }
                    var b = this;
                    a ? Z(a).on("click", e) : e()
                })
            },
            getPathImages: function(a) {
            	return B.pathImages;
            }
        };
    Z.fn.animate3D = function(a) {
        return A[a] ? A[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? (Z.error("Method does not exist."), void 0) : A.init.apply(this, arguments)
    }
}(jQuery, document, window), function(r) {
    var q, p, o, n, m, l = r("script[src*='HTML5Loader']").prop("src").match(/(.*)(HTML5Loader.js)(.*)$/i),
        k = l[1],
        j = l[2];
    "HTML5LOADER.JS" === j ? (o = k + "HTML5Viewer.css".toUpperCase(), n = k + "jQueryPlugin.js".toUpperCase(), m = k + "HTML5Viewer.js".toUpperCase()) : "html5loader.js" === j ? (o = k + "HTML5Viewer.css".toLowerCase(), n = k + "jQueryPlugin.js".toLowerCase(), m = k + "HTML5Viewer.js".toLowerCase()) : (o = k + "HTML5Viewer.css", n = k + "jQueryPlugin.js", m = k + "HTML5Viewer.js"), q = document.createElement("link"), r(q).prop({
        rel: "stylesheet",
        type: "text/css",
        href: o
    }), r("head")[0].appendChild(q), p = function(a) {
        r.ajax({
            url: a,
            global: !1,
            dataType: "script",
            async: !1
        })
    }
	p(n); p(m);
}(jQuery);