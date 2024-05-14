(function() {
    function k(T, Y, W) {
        function z(A, U) {
            if (!Y[A]) {
                if (!T[A]) {
                    var a = "function" == typeof require && require;
                    if (!U && a) return a(A, !0);
                    if (E) return E(A, !0);
                    var p = new Error("Cannot find module '" + A + "'");
                    throw p.code = "MODULE_NOT_FOUND", p;
                }
                var r = Y[A] = {
                    exports: {}
                };
                T[A][0].call(r.exports, (function(k) {
                    var Y = T[A][1][k];
                    return z(Y || k);
                }), r, r.exports, k, T, Y, W);
            }
            return Y[A].exports;
        }
        for (var E = "function" == typeof require && require, A = 0; A < W.length; A++) z(W[A]);
        return z;
    }
    return k;
})()({
    1: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = Y.analytics = Y.Analytics = void 0;
        const W = k("uuid"), z = "https://www.google-analytics.com/mp/collect", E = "https://www.google-analytics.com/debug/mp/collect", A = "cid", U = 100, a = 30;
        class p {
            constructor(k, T, Y = false) {
                this.measurement_id = k, this.api_secret = T, this.debug = Y;
            }
            async getOrCreateClientId() {
                const k = await chrome.storage.local.get(A);
                let T = k[A];
                if (!T) T = (0, W.v4)(), await chrome.storage.local.set({
                    [A]: T
                });
                return T;
            }
            async getOrCreateSessionId() {
                let {sessionData: k} = await chrome.storage.session.get("sessionData");
                const T = Date.now();
                if (k && k.timestamp) {
                    const Y = (T - k.timestamp) / 6e4;
                    if (Y > a) k = null; else k.timestamp = T, await chrome.storage.session.set({
                        sessionData: k
                    });
                }
                if (!k) k = {
                    session_id: T.toString(),
                    timestamp: T.toString()
                }, await chrome.storage.session.set({
                    sessionData: k
                });
                return k.session_id;
            }
            async fireEvent(k, T = {}) {
                if (!T.session_id) T.session_id = await this.getOrCreateSessionId();
                if (!T.engagement_time_msec) T.engagement_time_msec = U;
                try {
                    const Y = await fetch(`${this.debug ? E : z}?measurement_id=${this.measurement_id}&api_secret=${this.api_secret}`, {
                        method: "POST",
                        body: JSON.stringify({
                            client_id: await this.getOrCreateClientId(),
                            events: [ {
                                name: k,
                                params: T
                            } ]
                        })
                    });
                    if (!this.debug) return;
                } catch (k) {}
            }
            async firePageViewEvent(k, T, Y = {}) {
                return this.fireEvent("page_view", Object.assign({
                    page_title: k,
                    page_location: T
                }, Y));
            }
            async fireErrorEvent(k, T = {}) {
                return this.fireEvent("extension_error", Object.assign(Object.assign({}, k), T));
            }
        }
        function r(k, T) {
            const Y = new p(k, T);
            Y.fireEvent("run");
        }
        Y.Analytics = p, Y.analytics = r, Y.default = r;
    }, {
        uuid: 2
    } ],
    2: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Object.defineProperty(Y, "NIL", {
            enumerable: true,
            get: function() {
                return U.default;
            }
        }), Object.defineProperty(Y, "parse", {
            enumerable: true,
            get: function() {
                return J.default;
            }
        }), Object.defineProperty(Y, "stringify", {
            enumerable: true,
            get: function() {
                return r.default;
            }
        }), Object.defineProperty(Y, "v1", {
            enumerable: true,
            get: function() {
                return W.default;
            }
        }), Object.defineProperty(Y, "v3", {
            enumerable: true,
            get: function() {
                return z.default;
            }
        }), Object.defineProperty(Y, "v4", {
            enumerable: true,
            get: function() {
                return E.default;
            }
        }), Object.defineProperty(Y, "v5", {
            enumerable: true,
            get: function() {
                return A.default;
            }
        }), Object.defineProperty(Y, "validate", {
            enumerable: true,
            get: function() {
                return p.default;
            }
        }), Object.defineProperty(Y, "version", {
            enumerable: true,
            get: function() {
                return a.default;
            }
        });
        var W = P(k("xV")), z = P(k("f")), E = P(k("vy")), A = P(k("Ip")), U = P(k("wk")), a = P(k("xu")), p = P(k("WH")), r = P(k("HI")), J = P(k("Wt"));
        function P(k) {
            return k && k.__esModule ? k : {
                default: k
            };
        }
    }, {
        wk: 5,
        Wt: 6,
        HI: 10,
        xV: 11,
        f: 12,
        vy: 14,
        Ip: 15,
        WH: 16,
        xu: 17
    } ],
    3: [ function(k, T, Y) {
        "use strict";
        function W(k) {
            if (typeof k === "string") {
                const T = unescape(encodeURIComponent(k));
                k = new Uint8Array(T.length);
                for (let Y = 0; Y < T.length; ++Y) k[Y] = T.charCodeAt(Y);
            }
            return z(A(U(k), k.length * 8));
        }
        function z(k) {
            const T = [], Y = k.length * 32, W = "0123456789abcdef";
            for (let z = 0; z < Y; z += 8) {
                const Y = k[z >> 5] >>> z % 32 & 255, E = parseInt(W.charAt(Y >>> 4 & 15) + W.charAt(Y & 15), 16);
                T.push(E);
            }
            return T;
        }
        function E(k) {
            return (k + 64 >>> 9 << 4) + 14 + 1;
        }
        function A(k, T) {
            k[T >> 5] |= 128 << T % 32, k[E(T) - 1] = T;
            let Y = 1732584193, W = -271733879, z = -1732584194, A = 271733878;
            for (let T = 0; T < k.length; T += 16) {
                const E = Y, U = W, p = z, r = A;
                Y = J(Y, W, z, A, k[T], 7, -680876936), A = J(A, Y, W, z, k[T + 1], 12, -389564586),
                z = J(z, A, Y, W, k[T + 2], 17, 606105819), W = J(W, z, A, Y, k[T + 3], 22, -1044525330),
                Y = J(Y, W, z, A, k[T + 4], 7, -176418897), A = J(A, Y, W, z, k[T + 5], 12, 1200080426),
                z = J(z, A, Y, W, k[T + 6], 17, -1473231341), W = J(W, z, A, Y, k[T + 7], 22, -45705983),
                Y = J(Y, W, z, A, k[T + 8], 7, 1770035416), A = J(A, Y, W, z, k[T + 9], 12, -1958414417),
                z = J(z, A, Y, W, k[T + 10], 17, -42063), W = J(W, z, A, Y, k[T + 11], 22, -1990404162),
                Y = J(Y, W, z, A, k[T + 12], 7, 1804603682), A = J(A, Y, W, z, k[T + 13], 12, -40341101),
                z = J(z, A, Y, W, k[T + 14], 17, -1502002290), W = J(W, z, A, Y, k[T + 15], 22, 1236535329),
                Y = P(Y, W, z, A, k[T + 1], 5, -165796510), A = P(A, Y, W, z, k[T + 6], 9, -1069501632),
                z = P(z, A, Y, W, k[T + 11], 14, 643717713), W = P(W, z, A, Y, k[T], 20, -373897302),
                Y = P(Y, W, z, A, k[T + 5], 5, -701558691), A = P(A, Y, W, z, k[T + 10], 9, 38016083),
                z = P(z, A, Y, W, k[T + 15], 14, -660478335), W = P(W, z, A, Y, k[T + 4], 20, -405537848),
                Y = P(Y, W, z, A, k[T + 9], 5, 568446438), A = P(A, Y, W, z, k[T + 14], 9, -1019803690),
                z = P(z, A, Y, W, k[T + 3], 14, -187363961), W = P(W, z, A, Y, k[T + 8], 20, 1163531501),
                Y = P(Y, W, z, A, k[T + 13], 5, -1444681467), A = P(A, Y, W, z, k[T + 2], 9, -51403784),
                z = P(z, A, Y, W, k[T + 7], 14, 1735328473), W = P(W, z, A, Y, k[T + 12], 20, -1926607734),
                Y = N(Y, W, z, A, k[T + 5], 4, -378558), A = N(A, Y, W, z, k[T + 8], 11, -2022574463),
                z = N(z, A, Y, W, k[T + 11], 16, 1839030562), W = N(W, z, A, Y, k[T + 14], 23, -35309556),
                Y = N(Y, W, z, A, k[T + 1], 4, -1530992060), A = N(A, Y, W, z, k[T + 4], 11, 1272893353),
                z = N(z, A, Y, W, k[T + 7], 16, -155497632), W = N(W, z, A, Y, k[T + 10], 23, -1094730640),
                Y = N(Y, W, z, A, k[T + 13], 4, 681279174), A = N(A, Y, W, z, k[T], 11, -358537222),
                z = N(z, A, Y, W, k[T + 3], 16, -722521979), W = N(W, z, A, Y, k[T + 6], 23, 76029189),
                Y = N(Y, W, z, A, k[T + 9], 4, -640364487), A = N(A, Y, W, z, k[T + 12], 11, -421815835),
                z = N(z, A, Y, W, k[T + 15], 16, 530742520), W = N(W, z, A, Y, k[T + 2], 23, -995338651),
                Y = g(Y, W, z, A, k[T], 6, -198630844), A = g(A, Y, W, z, k[T + 7], 10, 1126891415),
                z = g(z, A, Y, W, k[T + 14], 15, -1416354905), W = g(W, z, A, Y, k[T + 5], 21, -57434055),
                Y = g(Y, W, z, A, k[T + 12], 6, 1700485571), A = g(A, Y, W, z, k[T + 3], 10, -1894986606),
                z = g(z, A, Y, W, k[T + 10], 15, -1051523), W = g(W, z, A, Y, k[T + 1], 21, -2054922799),
                Y = g(Y, W, z, A, k[T + 8], 6, 1873313359), A = g(A, Y, W, z, k[T + 15], 10, -30611744),
                z = g(z, A, Y, W, k[T + 6], 15, -1560198380), W = g(W, z, A, Y, k[T + 13], 21, 1309151649),
                Y = g(Y, W, z, A, k[T + 4], 6, -145523070), A = g(A, Y, W, z, k[T + 11], 10, -1120210379),
                z = g(z, A, Y, W, k[T + 2], 15, 718787259), W = g(W, z, A, Y, k[T + 9], 21, -343485551),
                Y = a(Y, E), W = a(W, U), z = a(z, p), A = a(A, r);
            }
            return [ Y, W, z, A ];
        }
        function U(k) {
            if (k.length === 0) return [];
            const T = k.length * 8, Y = new Uint32Array(E(T));
            for (let W = 0; W < T; W += 8) Y[W >> 5] |= (k[W / 8] & 255) << W % 32;
            return Y;
        }
        function a(k, T) {
            const Y = (k & 65535) + (T & 65535), W = (k >> 16) + (T >> 16) + (Y >> 16);
            return W << 16 | Y & 65535;
        }
        function p(k, T) {
            return k << T | k >>> 32 - T;
        }
        function r(k, T, Y, W, z, E) {
            return a(p(a(a(T, k), a(W, E)), z), Y);
        }
        function J(k, T, Y, W, z, E, A) {
            return r(T & Y | ~T & W, k, T, z, E, A);
        }
        function P(k, T, Y, W, z, E, A) {
            return r(T & W | Y & ~W, k, T, z, E, A);
        }
        function N(k, T, Y, W, z, E, A) {
            return r(T ^ Y ^ W, k, T, z, E, A);
        }
        function g(k, T, Y, W, z, E, A) {
            return r(Y ^ (T | ~W), k, T, z, E, A);
        }
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        var j = W;
        Y.default = j;
    }, {} ],
    4: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        const W = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
        var z = {
            randomUUID: W
        };
        Y.default = z;
    }, {} ],
    5: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        var W = "00000000-0000-0000-0000-000000000000";
        Y.default = W;
    }, {} ],
    6: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        var W = z(k("WH"));
        function z(k) {
            return k && k.__esModule ? k : {
                default: k
            };
        }
        function E(k) {
            if (!(0, W.default)(k)) throw TypeError("Invalid UUID");
            let T;
            const Y = new Uint8Array(16);
            return Y[0] = (T = parseInt(k.slice(0, 8), 16)) >>> 24, Y[1] = T >>> 16 & 255, Y[2] = T >>> 8 & 255,
            Y[3] = T & 255, Y[4] = (T = parseInt(k.slice(9, 13), 16)) >>> 8, Y[5] = T & 255,
            Y[6] = (T = parseInt(k.slice(14, 18), 16)) >>> 8, Y[7] = T & 255, Y[8] = (T = parseInt(k.slice(19, 23), 16)) >>> 8,
            Y[9] = T & 255, Y[10] = (T = parseInt(k.slice(24, 36), 16)) / 1099511627776 & 255,
            Y[11] = T / 4294967296 & 255, Y[12] = T >>> 24 & 255, Y[13] = T >>> 16 & 255, Y[14] = T >>> 8 & 255,
            Y[15] = T & 255, Y;
        }
        var A = E;
        Y.default = A;
    }, {
        WH: 16
    } ],
    7: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        var W = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        Y.default = W;
    }, {} ],
    8: [ function(k, T, Y) {
        "use strict";
        let W;
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = E;
        const z = new Uint8Array(16);
        function E() {
            if (!W) if (W = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto),
            !W) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return W(z);
        }
    }, {} ],
    9: [ function(k, T, Y) {
        "use strict";
        function W(k, T, Y, W) {
            switch (k) {
              case 0:
                return T & Y ^ ~T & W;

              case 1:
                return T ^ Y ^ W;

              case 2:
                return T & Y ^ T & W ^ Y & W;

              case 3:
                return T ^ Y ^ W;
            }
        }
        function z(k, T) {
            return k << T | k >>> 32 - T;
        }
        function E(k) {
            const T = [ 1518500249, 1859775393, 2400959708, 3395469782 ], Y = [ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ];
            if (typeof k === "string") {
                const T = unescape(encodeURIComponent(k));
                k = [];
                for (let Y = 0; Y < T.length; ++Y) k.push(T.charCodeAt(Y));
            } else if (!Array.isArray(k)) k = Array.prototype.slice.call(k);
            k.push(128);
            const E = k.length / 4 + 2, A = Math.ceil(E / 16), U = new Array(A);
            for (let T = 0; T < A; ++T) {
                const Y = new Uint32Array(16);
                for (let W = 0; W < 16; ++W) Y[W] = k[T * 64 + W * 4] << 24 | k[T * 64 + W * 4 + 1] << 16 | k[T * 64 + W * 4 + 2] << 8 | k[T * 64 + W * 4 + 3];
                U[T] = Y;
            }
            U[A - 1][14] = (k.length - 1) * 8 / Math.pow(2, 32), U[A - 1][14] = Math.floor(U[A - 1][14]),
            U[A - 1][15] = (k.length - 1) * 8 & 4294967295;
            for (let k = 0; k < A; ++k) {
                const E = new Uint32Array(80);
                for (let T = 0; T < 16; ++T) E[T] = U[k][T];
                for (let k = 16; k < 80; ++k) E[k] = z(E[k - 3] ^ E[k - 8] ^ E[k - 14] ^ E[k - 16], 1);
                let A = Y[0], a = Y[1], p = Y[2], r = Y[3], J = Y[4];
                for (let k = 0; k < 80; ++k) {
                    const Y = Math.floor(k / 20), U = z(A, 5) + W(Y, a, p, r) + J + T[Y] + E[k] >>> 0;
                    J = r, r = p, p = z(a, 30) >>> 0, a = A, A = U;
                }
                Y[0] = Y[0] + A >>> 0, Y[1] = Y[1] + a >>> 0, Y[2] = Y[2] + p >>> 0, Y[3] = Y[3] + r >>> 0,
                Y[4] = Y[4] + J >>> 0;
            }
            return [ Y[0] >> 24 & 255, Y[0] >> 16 & 255, Y[0] >> 8 & 255, Y[0] & 255, Y[1] >> 24 & 255, Y[1] >> 16 & 255, Y[1] >> 8 & 255, Y[1] & 255, Y[2] >> 24 & 255, Y[2] >> 16 & 255, Y[2] >> 8 & 255, Y[2] & 255, Y[3] >> 24 & 255, Y[3] >> 16 & 255, Y[3] >> 8 & 255, Y[3] & 255, Y[4] >> 24 & 255, Y[4] >> 16 & 255, Y[4] >> 8 & 255, Y[4] & 255 ];
        }
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        var A = E;
        Y.default = A;
    }, {} ],
    10: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0, Y.unsafeStringify = A;
        var W = z(k("WH"));
        function z(k) {
            return k && k.__esModule ? k : {
                default: k
            };
        }
        const E = [];
        for (let k = 0; k < 256; ++k) E.push((k + 256).toString(16).slice(1));
        function A(k, T = 0) {
            return (E[k[T + 0]] + E[k[T + 1]] + E[k[T + 2]] + E[k[T + 3]] + "-" + E[k[T + 4]] + E[k[T + 5]] + "-" + E[k[T + 6]] + E[k[T + 7]] + "-" + E[k[T + 8]] + E[k[T + 9]] + "-" + E[k[T + 10]] + E[k[T + 11]] + E[k[T + 12]] + E[k[T + 13]] + E[k[T + 14]] + E[k[T + 15]]).toLowerCase();
        }
        function U(k, T = 0) {
            const Y = A(k, T);
            if (!(0, W.default)(Y)) throw TypeError("Stringified UUID is invalid");
            return Y;
        }
        var a = U;
        Y.default = a;
    }, {
        WH: 16
    } ],
    11: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        var W = E(k("EU")), z = k("HI");
        function E(k) {
            return k && k.__esModule ? k : {
                default: k
            };
        }
        let A, U, a = 0, p = 0;
        function r(k, T, Y) {
            let E = T && Y || 0;
            const r = T || new Array(16);
            k = k || {};
            let J = k.node || A, P = k.clockseq !== void 0 ? k.clockseq : U;
            if (J == null || P == null) {
                const T = k.random || (k.rng || W.default)();
                if (J == null) J = A = [ T[0] | 1, T[1], T[2], T[3], T[4], T[5] ];
                if (P == null) P = U = (T[6] << 8 | T[7]) & 16383;
            }
            let N = k.msecs !== void 0 ? k.msecs : Date.now(), g = k.nsecs !== void 0 ? k.nsecs : p + 1;
            const j = N - a + (g - p) / 1e4;
            if (j < 0 && k.clockseq === void 0) P = P + 1 & 16383;
            if ((j < 0 || N > a) && k.nsecs === void 0) g = 0;
            if (g >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            a = N, p = g, U = P, N += 122192928e5;
            const w = ((N & 268435455) * 1e4 + g) % 4294967296;
            r[E++] = w >>> 24 & 255, r[E++] = w >>> 16 & 255, r[E++] = w >>> 8 & 255, r[E++] = w & 255;
            const b = N / 4294967296 * 1e4 & 268435455;
            r[E++] = b >>> 8 & 255, r[E++] = b & 255, r[E++] = b >>> 24 & 15 | 16, r[E++] = b >>> 16 & 255,
            r[E++] = P >>> 8 | 128, r[E++] = P & 255;
            for (let k = 0; k < 6; ++k) r[E + k] = J[k];
            return T || (0, z.unsafeStringify)(r);
        }
        var J = r;
        Y.default = J;
    }, {
        EU: 8,
        HI: 10
    } ],
    12: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        var W = E(k("mJ")), z = E(k("aj"));
        function E(k) {
            return k && k.__esModule ? k : {
                default: k
            };
        }
        const A = (0, W.default)("v3", 48, z.default);
        var U = A;
        Y.default = U;
    }, {
        aj: 3,
        mJ: 13
    } ],
    13: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.URL = Y.DNS = void 0, Y.default = p;
        var W = k("HI"), z = E(k("Wt"));
        function E(k) {
            return k && k.__esModule ? k : {
                default: k
            };
        }
        function A(k) {
            k = unescape(encodeURIComponent(k));
            const T = [];
            for (let Y = 0; Y < k.length; ++Y) T.push(k.charCodeAt(Y));
            return T;
        }
        const U = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
        Y.DNS = U;
        const a = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
        function p(k, T, Y) {
            function E(k, E, U, a) {
                var p;
                if (typeof k === "string") k = A(k);
                if (typeof E === "string") E = (0, z.default)(E);
                if (((p = E) === null || p === void 0 ? void 0 : p.length) !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
                let r = new Uint8Array(16 + k.length);
                if (r.set(E), r.set(k, E.length), r = Y(r), r[6] = r[6] & 15 | T, r[8] = r[8] & 63 | 128,
                U) {
                    a = a || 0;
                    for (let k = 0; k < 16; ++k) U[a + k] = r[k];
                    return U;
                }
                return (0, W.unsafeStringify)(r);
            }
            try {
                E.name = k;
            } catch (k) {}
            return E.DNS = U, E.URL = a, E;
        }
        Y.URL = a;
    }, {
        Wt: 6,
        HI: 10
    } ],
    14: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        var W = A(k("gM")), z = A(k("EU")), E = k("HI");
        function A(k) {
            return k && k.__esModule ? k : {
                default: k
            };
        }
        function U(k, T, Y) {
            if (W.default.randomUUID && !T && !k) return W.default.randomUUID();
            k = k || {};
            const A = k.random || (k.rng || z.default)();
            if (A[6] = A[6] & 15 | 64, A[8] = A[8] & 63 | 128, T) {
                Y = Y || 0;
                for (let k = 0; k < 16; ++k) T[Y + k] = A[k];
                return T;
            }
            return (0, E.unsafeStringify)(A);
        }
        var a = U;
        Y.default = a;
    }, {
        gM: 4,
        EU: 8,
        HI: 10
    } ],
    15: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        var W = E(k("mJ")), z = E(k("NV"));
        function E(k) {
            return k && k.__esModule ? k : {
                default: k
            };
        }
        const A = (0, W.default)("v5", 80, z.default);
        var U = A;
        Y.default = U;
    }, {
        NV: 9,
        mJ: 13
    } ],
    16: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        var W = z(k("DR"));
        function z(k) {
            return k && k.__esModule ? k : {
                default: k
            };
        }
        function E(k) {
            return typeof k === "string" && W.default.test(k);
        }
        var A = E;
        Y.default = A;
    }, {
        DR: 7
    } ],
    17: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.default = void 0;
        var W = z(k("WH"));
        function z(k) {
            return k && k.__esModule ? k : {
                default: k
            };
        }
        function E(k) {
            if (!(0, W.default)(k)) throw TypeError("Invalid UUID");
            return parseInt(k.slice(14, 15), 16);
        }
        var A = E;
        Y.default = A;
    }, {
        WH: 16
    } ],
    18: [ function(k, T, Y) {
        "use strict";
        var W;
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.StorageOptions = void 0, function(k) {
            k["SETTINGS"] = "settings";
        }(W = Y.StorageOptions || (Y.StorageOptions = {}));
        class z {
            constructor() {
                this.validSettings = {
                    videoType: [ "screen", "screenAndWebcam", "webcam" ],
                    resolution: [ "720", "480", "1080" ],
                    format: [ "mp4", "webm" ],
                    screenAudioType: [ "system", "micAndSystem", "mic", "mute" ],
                    screenWebcamAudioType: [ "system", "micAndSystem", "mic", "mute" ],
                    webcamAudioType: [ "mic", "mute" ]
                }, this.default = {
                    videoType: "screen",
                    resolution: "1080",
                    format: "mp4",
                    screenAudioType: "system",
                    screenWebcamAudioType: "mic",
                    webcamAudioType: "mic"
                };
            }
            async init() {
                const k = await z.get([ W.SETTINGS ]);
                if (!k || !k[W.SETTINGS]) return void await z.set({
                    [W.SETTINGS]: this.default
                });
                const T = k[W.SETTINGS];
                this.validateSettings(T);
            }
            getDefaultSettings() {
                return this.default;
            }
            deleteUselessKeys(k) {
                const T = JSON.parse(JSON.stringify(k));
                for (const k in T) if (!(k in this.default)) delete T[k];
                return T;
            }
            validateSettingsKeys(k) {
                const T = JSON.parse(JSON.stringify(k));
                for (const k in T) if (Object.prototype.hasOwnProperty.call(T, k)) {
                    const Y = this.validSettings[k];
                    if (!Y.includes(T[k])) {
                        const W = Y[0];
                        T[k] = W;
                    }
                }
                return T;
            }
            addSettingsNecessaryKeys(k) {
                const T = JSON.parse(JSON.stringify(k));
                for (const k in this.default) if (!(k in T)) T[k] = this.default[k];
                return T;
            }
            validateSettings(k) {
                const T = this.deleteUselessKeys(k), Y = this.validateSettingsKeys(T), E = this.addSettingsNecessaryKeys(Y);
                z.set({
                    [W.SETTINGS]: E
                });
            }
            static async get(k) {
                const T = await chrome.storage.local.get(k);
                if (!T) return null;
                return T;
            }
            static async set(k, T) {
                chrome.storage.local.set(k, (() => {
                    if (T) T();
                }));
            }
        }
        Y.default = z;
    }, {} ],
    19: [ function(k, T, Y) {
        "use strict";
        var W = void 0 && (void 0).__importDefault || function(k) {
            return k && k.__esModule ? k : {
                default: k
            };
        };
        Object.defineProperty(Y, "__esModule", {
            value: true
        });
        const z = k("jQ"), E = W(k("TU")), A = W(k("zr"));
        class U {
            constructor(k) {
                this.popupWidth = k.width, this.popupHeight = k.height;
            }
            init() {
                const k = new E.default;
                k.init(), U.addOnInstalledListener(), U.setContentSettings(), chrome.runtime.onMessage.addListener(U.onMessage),
                this.addOnClickActionListener();
            }
            static addOnInstalledListener() {
                chrome.runtime.onInstalled.addListener((k => {
                    if (k.reason === chrome.runtime.OnInstalledReason.INSTALL) chrome.storage.sync.set({
                        showPolicy: true
                    });
                }));
            }
            static getUserMediaClient(k) {
                return navigator.mediaDevices.getUserMedia(k);
            }
            static async onMessage(k, T, Y) {
                if (k.action === "getUserMedia") {
                    const T = await chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    });
                    if (T.length == 0) Y(false); else {
                        const W = T[0], z = await chrome.scripting.executeScript({
                            func: U.getUserMediaClient,
                            target: {
                                tabId: W.id,
                                allFrames: false
                            },
                            args: k.args
                        });
                        Y(z.length ? z[0] : false);
                    }
                }
                if (k.action === "viewPopup") U.showPopupWindow();
            }
            static setContentSettings() {
                const k = chrome.runtime.id;
                chrome.contentSettings.microphone.set({
                    primaryPattern: "*://".concat(k, "/*"),
                    setting: "allow"
                }), chrome.contentSettings.camera.set({
                    primaryPattern: "*://".concat(k, "/*"),
                    setting: "allow"
                });
            }
            static async getPopupWindows() {
                const k = [], T = chrome.runtime.id, Y = await chrome.windows.getAll({
                    populate: true
                });
                for (const W of Y) if (W.type === "popup" && W.tabs) {
                    let Y = false;
                    for (const k of W.tabs) if (k.url && k.url.includes(`chrome-extension://${T}`) && k.url.includes("popup.html")) Y = true;
                    if (Y) k.push(W);
                }
                return k;
            }
            static async showPopupWindow(k) {
                let T = k;
                if (!T) T = await U.getPopupWindows();
                T.forEach((k => {
                    const {id: T} = k;
                    if (T) chrome.windows.update(T, {
                        state: "normal",
                        focused: true
                    });
                }));
            }
            async calculatePopupShift() {
                const k = {
                    leftShift: 0,
                    topShift: 0
                }, T = await chrome.windows.getCurrent();
                if (T) k.leftShift = T.width ? T.width / 2 - this.popupWidth / 2 : 0, k.topShift = T.height ? T.height / 2 - this.popupHeight / 2 : 0;
                return k;
            }
            addOnClickActionListener() {
                chrome.action.onClicked.addListener((async () => {
                    const k = await U.getPopupWindows();
                    let T = false;
                    if (k.length > 0) T = true;
                    if (T) U.showPopupWindow(k); else {
                        const k = await this.calculatePopupShift();
                        chrome.windows.create({
                            url: chrome.runtime.getURL("html/popup.html"),
                            type: "popup",
                            width: this.popupWidth,
                            height: this.popupHeight,
                            left: Math.round(k.leftShift),
                            top: Math.round(k.topShift),
                            focused: true
                        });
                    }
                }));
            }
        }
        const a = {
            width: z.popupWidth,
            height: z.popupHeight
        }, p = new U(a);
        p.init(), (0, A.default)("G-WY4CV2LTLW", "gbWeP8IITouREKGC7lBSaw");
    }, {
        zr: 1,
        TU: 18,
        jQ: 20
    } ],
    20: [ function(k, T, Y) {
        "use strict";
        Object.defineProperty(Y, "__esModule", {
            value: true
        }), Y.previewPopupHeight = Y.previewPopupWidth = Y.popupHeight = Y.popupWidth = void 0,
        Y.popupWidth = 700, Y.popupHeight = 700, Y.previewPopupWidth = 700, Y.previewPopupHeight = 700;
    }, {} ]
}, {}, [ 19 ]);