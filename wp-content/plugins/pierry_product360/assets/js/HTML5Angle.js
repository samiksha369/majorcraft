!
function(b) {
    b.extend(Ortery.TruView.prototype, {
        DQu8pF4hGzf: function() {
            var f = this.ZY17arGo0p4,
                e = f.width(),
                h = f.height(),
                g = h > e ? e : h;
            this.radius = g / 2
        },
        fQ6qtI2Ila3: function() {
            var c = this.radius;
            this.kb9RYEHZ99o = {
                x: 0,
                y: 0,
                z: c
            }, this.VBvfT36UrmS = {
                x: c,
                y: 0,
                z: 0
            }
        },
        ooZtewaXOwi: function(Z) {
            var Y, X, W, V, U, T, S, R, Q, P, O, N, M, L, K, J, I = Math.PI,
                H = 2 * I,
                G = I / 2,
                F = this.o8wTqix4yPC,
                E = this.QqFicy5JLVv,
                D = this.q9fkN3OzwlD,
                C = this.kb9RYEHZ99o,
                B = {
                    x: 1,
                    y: 0,
                    z: 0
                },
                A = {};
            return Y = this.JqqLYORpdKp(Z), X = Y, W = this.hjmTlYshi9l, W !== X ? (A = D(W, X), V = 2 * this.VHBiXkq4g2O(W, X), U = this.runbFziAlHe(C, A, V), T = {
                x: U.x,
                y: U.y,
                z: U.z
            }, S = Math.acos(E(T, B) / (F(T) * F(B))), R = G - S, 0 > R && (R += H), C.x = U.x, C.y = U.y, C.z = U.z, 0 === C.z ? Q = C.y >= 0 ? -G : G : (P = Math.atan(C.y / C.z), Q = C.z >= 0 ? -P : -P + (C.y <= 0 ? I : -I)), O = this.VBvfT36UrmS, N = this.runbFziAlHe(O, A, V), O.x = N.x, O.y = N.y, O.z = N.z, M = F(C), L = E(B, C) / (M * M), K = {
                x: B.x - L * C.x,
                y: B.y - L * C.y,
                z: B.z - L * C.z
            }, J = Math.acos(E(O, K) / (F(O) * F(K))), E(C, D(O, K)) < 0 && (J = H - J), this.Jfxe4WXZ1Sk = 180 * J / I, this.in5i2xi95r6 = 180 * R / I, W.x = Y.x, W.y = Y.y, W.z = Y.z, ~~ (180 * -Q / I)) : void 0
        },
        JqqLYORpdKp: function(j) {
            var i, p, o, n, m, l, k;
            return o = {
                x: j[0] - this.GUVIP8q2OeZ,
                y: -(j[1] - this.FYOfGIzLQpk)
            }, n = o.x / this.radius, m = o.y / this.radius, l = Math.sqrt(n * n + m * m), l > 1 && (n /= l, m /= l), i = Math.asin(m), k = Math.cos(i), p = l >= 1 ? n > 0 ? 0.5 * Math.PI : 0 > n ? -0.5 * Math.PI : 0 : Math.asin(n / k), {
                x: k * Math.cos(p),
                y: k * Math.sin(p),
                z: Math.sin(i)
            }
        },
        VHBiXkq4g2O: function(h, g) {
            var l, k, j = this.o8wTqix4yPC(h),
                i = this.o8wTqix4yPC(g);
            return 0 === j || 0 === i ? 0 : (l = this.QqFicy5JLVv(h, g), k = Math.acos(l / (j * i)), isNaN(k) && (k = 0), k)
        },
        runbFziAlHe: function(j, i, p) {
            var o, n, m, l, k = this.o8wTqix4yPC(i);
            return 0 === k && (k = 1), i.x /= k, i.y /= k, i.z /= k, o = Math.sin(p / 2), n = {
                w: Math.cos(p / 2),
                x: i.x * o,
                y: i.y * o,
                z: i.z * o
            }, m = {
                w: 0,
                x: j.x,
                y: j.y,
                z: j.z
            }, l = this.CGpCuWoUqjp(n, m), m = {
                w: n.w,
                x: -n.x,
                y: -n.y,
                z: -n.z
            }, this.CGpCuWoUqjp(l, m)
        },
        CGpCuWoUqjp: function(i, h) {
            var n, m, l, k, j;
            return n = i.w, l = {
                x: i.x,
                y: i.y,
                z: i.z
            }, m = h.w, k = {
                x: h.x,
                y: h.y,
                z: h.z
            }, j = this.q9fkN3OzwlD(l, k), {
                w: n * m - this.QqFicy5JLVv(l, k),
                x: n * k.x + m * l.x + j.x,
                y: n * k.y + m * l.y + j.y,
                z: n * k.z + m * l.z + j.z
            }
        },
        q9fkN3OzwlD: function(d, c) {
            return {
                x: d.y * c.z - d.z * c.y,
                y: d.z * c.x - d.x * c.z,
                z: d.x * c.y - d.y * c.x
            }
        },
        QqFicy5JLVv: function(d, c) {
            return d.x * c.x + d.y * c.y + d.z * c.z
        },
        o8wTqix4yPC: function(c) {
            return Math.sqrt(c.x * c.x + c.y * c.y + c.z * c.z)
        },
        mJA9vzVueK8: function(d) {
            var c = this.ZY17arGo0p4;
            this.GUVIP8q2OeZ = c.width() / 2 + c.offset().left + this.PisVzOjXy3G, this.FYOfGIzLQpk = c.height() / 2 + c.offset().top + this.Xy6KItDqALj, this.hjmTlYshi9l = this.JqqLYORpdKp(d)
        }
    })
}(jQuery);
 
