/*
 Magnific Popup - v0.9.9 - 2013-12-27
 http://dimsemenov.com/plugins/magnific-popup/
 Copyright (c) 2013 Dmitry Semenov; */
var tdAnalytics = {};
(function () {
    tdAnalytics = {
        _fbPixelId: "",
        _gaTrackingId: "",
        _gaErrors: [],
        _fbErrors: [],
        init: function () {
            !0 !== tdAnalytics._inIframe() &&
                ("undefined" !== typeof window.dataLayer &&
                    window.dataLayer.forEach(function (a, b, c) {
                        "config" === a[0] && (tdAnalytics._gaTrackingId = a[1]);
                    }),
                "undefined" !== typeof fbq &&
                    setTimeout(function () {
                        tdAnalytics._fbPixelId = fbq.getState().pixels[0].id;
                    }, 500),
                jQuery("body").on("click", ".tdm_block_button .tds-button .tdm-btn, .tdm_block_icon_box .tds-button .tdm-btn, .td_block_single_image .td_single_image_bg, .tds-newsletter .tdn-btn-wrap button", function (a) {
                    a.target.classList.contains("tdn-submit-btn") || a.preventDefault();
                    var b = jQuery(this),
                        c = { ga: {}, fb: {}, eventTarget: "", eventTargetAtt: a.target.getAttribute("target") };
                    a.target.classList.contains("tdm-btn-text") ? (c.eventTarget = a.target.parentElement.getAttribute("href")) : (c.eventTarget = a.target.getAttribute("href"));
                    void 0 !== b.data("ga-event-action") && (c.ga.eventAction = b.data("ga-event-action"));
                    void 0 !== b.data("ga-event-cat") && (c.ga.eventCategory = b.data("ga-event-cat"));
                    void 0 !== b.data("ga-event-label") && (c.ga.eventLabel = b.data("ga-event-label"));
                    void 0 !== b.data("fb-event-name") && (c.fb.eventName = b.data("fb-event-name"));
                    void 0 !== b.data("fb-event-content-name") && (c.fb.eventContentName = b.data("fb-event-content-name"));
                    tdAnalytics._trackEvent(c);
                }));
        },
        _trackEvent: function (a) {
            "undefined" === typeof a.ga.eventAction && tdAnalytics._gaErrors.push({ errorId: "eventActionError", errorMessage: "Google analytics event action is undefined." });
            "undefined" === typeof a.ga.eventCategory && tdAnalytics._gaErrors.push({ errorId: "eventCategory", errorMessage: "Google analytics event category is undefined." });
            window[window.GoogleAnalyticsObject || "ga"] || tdAnalytics._gaErrors.push({ errorId: "GoogleAnalyticsPageCode", errorMessage: "Google Analytics code is not loaded on the current page." });
            "" === tdAnalytics._gaTrackingId && tdAnalytics._gaErrors.push({ errorId: "GoogleAnalyticsTrackingId", errorMessage: "Google Analytics TrackingId is missing on the current page." });
            0 === tdAnalytics._gaErrors.length &&
                gtag("event", a.ga.eventAction, {
                    event_category: a.ga.eventCategory,
                    event_label: a.ga.eventLabel,
                    event_callback: function () {
                        console.log(" %c GA Success", "color: green; font-weight: bold;");
                    },
                });
            "undefined" === typeof window.fbq && tdAnalytics._fbErrors.push({ errorId: "FacebookPixelPageCode", errorMessage: "Facebook Pixel events code is not loaded on the current page." });
            "" === tdAnalytics._fbPixelId && tdAnalytics._fbErrors.push({ errorId: "FacebookPixelTrackingId", errorMessage: "Facebook Pixel TrackingId is missing on the current page." });
            "undefined" === typeof a.fb.eventName && tdAnalytics._fbErrors.push({ errorId: "FacebookPixelEventName", errorMessage: "Facebook pixel standard event name is not set ( undefined )." });
            0 === tdAnalytics._fbErrors.length &&
                ("undefined" !== typeof a.fb.eventContentName ? fbq("track", a.fb.eventName, { content_name: a.fb.eventContentName }) : fbq("track", a.fb.eventName), console.log(" %c FB track sent", "color: green; font-weight: bold;"));
            setTimeout(function () {
                a.eventTarget && ("_blank" === a.eventTargetAtt ? window.open(a.eventTarget) : (window.location = a.eventTarget));
            }, 150);
        },
        _inIframe: function () {
            try {
                return window.self !== window.top;
            } catch (a) {
                return !0;
            }
        },
        _displayErrors: function () {
            if (0 < tdAnalytics._gaErrors.length)
                for (; 0 < tdAnalytics._gaErrors.length; ) {
                    var a = tdAnalytics._gaErrors.shift();
                    console.warn(a.errorId + ": " + a.errorMessage);
                }
            if (0 < tdAnalytics._fbErrors.length) for (; 0 < tdAnalytics._fbErrors.length; ) (a = tdAnalytics._fbErrors.shift()), console.warn(a.errorId + ": " + a.errorMessage);
        },
    };
})();
jQuery(window).ready(function () {
    tdAnalytics.init();
});
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (a, b, c, d, f) {
        return jQuery.easing[jQuery.easing.def](a, b, c, d, f);
    },
    easeInQuad: function (a, b, c, d, f) {
        return d * (b /= f) * b + c;
    },
    easeOutQuad: function (a, b, c, d, f) {
        return -d * (b /= f) * (b - 2) + c;
    },
    easeInOutQuad: function (a, b, c, d, f) {
        return 1 > (b /= f / 2) ? (d / 2) * b * b + c : (-d / 2) * (--b * (b - 2) - 1) + c;
    },
    easeInCubic: function (a, b, c, d, f) {
        return d * (b /= f) * b * b + c;
    },
    easeOutCubic: function (a, b, c, d, f) {
        return d * ((b = b / f - 1) * b * b + 1) + c;
    },
    easeInOutCubic: function (a, b, c, d, f) {
        return 1 > (b /= f / 2) ? (d / 2) * b * b * b + c : (d / 2) * ((b -= 2) * b * b + 2) + c;
    },
    easeInQuart: function (a, b, c, d, f) {
        return d * (b /= f) * b * b * b + c;
    },
    easeOutQuart: function (a, b, c, d, f) {
        return -d * ((b = b / f - 1) * b * b * b - 1) + c;
    },
    easeInOutQuart: function (a, b, c, d, f) {
        return 1 > (b /= f / 2) ? (d / 2) * b * b * b * b + c : (-d / 2) * ((b -= 2) * b * b * b - 2) + c;
    },
    easeInQuint: function (a, b, c, d, f) {
        return d * (b /= f) * b * b * b * b + c;
    },
    easeOutQuint: function (a, b, c, d, f) {
        return d * ((b = b / f - 1) * b * b * b * b + 1) + c;
    },
    easeInOutQuint: function (a, b, c, d, f) {
        return 1 > (b /= f / 2) ? (d / 2) * b * b * b * b * b + c : (d / 2) * ((b -= 2) * b * b * b * b + 2) + c;
    },
    easeInSine: function (a, b, c, d, f) {
        return -d * Math.cos((b / f) * (Math.PI / 2)) + d + c;
    },
    easeOutSine: function (a, b, c, d, f) {
        return d * Math.sin((b / f) * (Math.PI / 2)) + c;
    },
    easeInOutSine: function (a, b, c, d, f) {
        return (-d / 2) * (Math.cos((Math.PI * b) / f) - 1) + c;
    },
    easeInExpo: function (a, b, c, d, f) {
        return 0 == b ? c : d * Math.pow(2, 10 * (b / f - 1)) + c;
    },
    easeOutExpo: function (a, b, c, d, f) {
        return b == f ? c + d : d * (-Math.pow(2, (-10 * b) / f) + 1) + c;
    },
    easeInOutExpo: function (a, b, c, d, f) {
        return 0 == b ? c : b == f ? c + d : 1 > (b /= f / 2) ? (d / 2) * Math.pow(2, 10 * (b - 1)) + c : (d / 2) * (-Math.pow(2, -10 * --b) + 2) + c;
    },
    easeInCirc: function (a, b, c, d, f) {
        return -d * (Math.sqrt(1 - (b /= f) * b) - 1) + c;
    },
    easeOutCirc: function (a, b, c, d, f) {
        return d * Math.sqrt(1 - (b = b / f - 1) * b) + c;
    },
    easeInOutCirc: function (a, b, c, d, f) {
        return 1 > (b /= f / 2) ? (-d / 2) * (Math.sqrt(1 - b * b) - 1) + c : (d / 2) * (Math.sqrt(1 - (b -= 2) * b) + 1) + c;
    },
    easeInElastic: function (a, b, c, d, f) {
        a = 1.70158;
        var e = 0,
            l = d;
        if (0 == b) return c;
        if (1 == (b /= f)) return c + d;
        e || (e = 0.3 * f);
        l < Math.abs(d) ? ((l = d), (a = e / 4)) : (a = (e / (2 * Math.PI)) * Math.asin(d / l));
        return -(l * Math.pow(2, 10 * --b) * Math.sin((2 * (b * f - a) * Math.PI) / e)) + c;
    },
    easeOutElastic: function (a, b, c, d, f) {
        a = 1.70158;
        var e = 0,
            l = d;
        if (0 == b) return c;
        if (1 == (b /= f)) return c + d;
        e || (e = 0.3 * f);
        l < Math.abs(d) ? ((l = d), (a = e / 4)) : (a = (e / (2 * Math.PI)) * Math.asin(d / l));
        return l * Math.pow(2, -10 * b) * Math.sin((2 * (b * f - a) * Math.PI) / e) + d + c;
    },
    easeInOutElastic: function (a, b, c, d, f) {
        a = 1.70158;
        var e = 0,
            l = d;
        if (0 == b) return c;
        if (2 == (b /= f / 2)) return c + d;
        e || (e = 0.3 * f * 1.5);
        l < Math.abs(d) ? ((l = d), (a = e / 4)) : (a = (e / (2 * Math.PI)) * Math.asin(d / l));
        return 1 > b ? -0.5 * l * Math.pow(2, 10 * --b) * Math.sin((2 * (b * f - a) * Math.PI) / e) + c : 0.5 * l * Math.pow(2, -10 * --b) * Math.sin((2 * (b * f - a) * Math.PI) / e) + d + c;
    },
    easeInBack: function (a, b, c, d, f, e) {
        void 0 == e && (e = 1.70158);
        return d * (b /= f) * b * ((e + 1) * b - e) + c;
    },
    easeOutBack: function (a, b, c, d, f, e) {
        void 0 == e && (e = 1.70158);
        return d * ((b = b / f - 1) * b * ((e + 1) * b + e) + 1) + c;
    },
    easeInOutBack: function (a, b, c, d, f, e) {
        void 0 == e && (e = 1.70158);
        return 1 > (b /= f / 2) ? (d / 2) * b * b * (((e *= 1.525) + 1) * b - e) + c : (d / 2) * ((b -= 2) * b * (((e *= 1.525) + 1) * b + e) + 2) + c;
    },
    easeInBounce: function (a, b, c, d, f) {
        return d - jQuery.easing.easeOutBounce(a, f - b, 0, d, f) + c;
    },
    easeOutBounce: function (a, b, c, d, f) {
        return (b /= f) < 1 / 2.75
            ? 7.5625 * d * b * b + c
            : b < 2 / 2.75
            ? d * (7.5625 * (b -= 1.5 / 2.75) * b + 0.75) + c
            : b < 2.5 / 2.75
            ? d * (7.5625 * (b -= 2.25 / 2.75) * b + 0.9375) + c
            : d * (7.5625 * (b -= 2.625 / 2.75) * b + 0.984375) + c;
    },
    easeInOutBounce: function (a, b, c, d, f) {
        return b < f / 2 ? 0.5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, f) + c : 0.5 * jQuery.easing.easeOutBounce(a, 2 * b - f, 0, d, f) + 0.5 * d + c;
    },
});
(function (a) {
    a.fn.supersubs = function (b) {
        var c = a.extend({}, a.fn.supersubs.defaults, b);
        return this.each(function () {
            var b = a(this),
                f = a.meta ? a.extend({}, c, b.data()) : c;
            setTimeout(
                function (b) {
                    var c = b.find(".sub-menu").show(),
                        d = a('<li id="menu-fontsize">&#8212;</li>').css({ padding: 0, position: "absolute", top: "-999em", width: "auto" }).appendTo(b)[0].clientWidth;
                    a("#menu-fontsize").remove();
                    c.each(function (b) {
                        b = a(this);
                        var c = b.children(),
                            e = c.children("a"),
                            g = c.css("white-space", "nowrap").css("float");
                        b.add(c).add(e).css({ float: "none", width: "auto" });
                        e = b[0].clientWidth / d;
                        e += f.extraWidth;
                        e > f.maxWidth ? (e = f.maxWidth) : e < f.minWidth && (e = f.minWidth);
                        e += "em";
                        f.applyMin ? b.css("min-width", e) : b.css("width", e);
                        c.css({ float: g, width: "100%", "white-space": "normal" }).each(function () {
                            var b = a(this).children("ul"),
                                c = void 0 !== b.css("left") ? "left" : "right";
                            b.css(c, "100%");
                        });
                        b.parent().hasClass("tdb-menu-item-inactive") && b.parent().removeClass("tdb-menu-item-inactive");
                    }).hide();
                },
                500,
                b
            );
        });
    };
    a.fn.supersubs.defaults = { minWidth: 9, maxWidth: 25, extraWidth: 0, applyMin: !1 };
})(jQuery);
(function (a) {
    var b = 0,
        c = 0,
        d = 0,
        f = 0,
        e = "ontouchstart" in window || 0 < navigator.msMaxTouchPoints,
        l = "onorientationchange" in window,
        g = !1,
        q = !1,
        u = !1,
        z = !1,
        w = !1,
        C = "pointer",
        Q = "pointer",
        W = [],
        U = [],
        oa = [],
        X = [],
        E = [],
        ba = [],
        F = [],
        r = [],
        y = [],
        ca = [],
        ja = [],
        m = {
            showScrollbar: function (b, c) {
                b.scrollbarHide && a("." + c).css({ opacity: b.scrollbarOpacity, filter: "alpha(opacity:" + 100 * b.scrollbarOpacity + ")" });
            },
            hideScrollbar: function (a, b, c, d, f, e, g, l, q, u) {
                if (a.scrollbar && a.scrollbarHide) for (var h = c; h < c + 25; h++) b[b.length] = m.hideScrollbarIntervalTimer(10 * h, d[c], (c + 24 - h) / 24, f, e, g, l, q, u, a);
            },
            hideScrollbarInterval: function (b, c, d, e, g, k, l, q, u) {
                f = ((-1 * b) / y[q]) * (g - k - l - e);
                m.setSliderOffset("." + d, f);
                a("." + d).css({ opacity: u.scrollbarOpacity * c, filter: "alpha(opacity:" + u.scrollbarOpacity * c * 100 + ")" });
            },
            slowScrollHorizontalInterval: function (b, c, d, e, g, k, l, q, u, z, H, N, Z, v, B, p, w, n, G) {
                if (G.infiniteSlider) {
                    if (d <= -1 * y[p] || d <= -1 * ca[p]) {
                        var h = a(b).width();
                        if (d <= -1 * ca[p]) {
                            var D = -1 * H[0];
                            a(c).each(function (b) {
                                m.setSliderOffset(a(c)[b], D + w);
                                b < N.length && (N[b] = -1 * D);
                                D += B[b];
                            });
                            d += -1 * N[0];
                            r[p] = -1 * N[0] + w;
                            y[p] = r[p] + h - k;
                            F[p] = 0;
                        }
                        for (; d <= -1 * y[p]; ) {
                            var t = 0,
                                J = m.getSliderOffset(a(c[0]), "x");
                            a(c).each(function (a) {
                                m.getSliderOffset(this, "x") < J && ((J = m.getSliderOffset(this, "x")), (t = a));
                            });
                            Z = r[p] + h;
                            m.setSliderOffset(a(c)[t], Z);
                            r[p] = -1 * N[1] + w;
                            y[p] = r[p] + h - k;
                            N.splice(0, 1);
                            N.splice(N.length, 0, -1 * Z + w);
                            F[p]++;
                        }
                    }
                    if (d >= -1 * r[p] || 0 <= d) {
                        h = a(b).width();
                        if (0 < d)
                            for (
                                D = -1 * H[0],
                                    a(c).each(function (b) {
                                        m.setSliderOffset(a(c)[b], D + w);
                                        b < N.length && (N[b] = -1 * D);
                                        D += B[b];
                                    }),
                                    d -= -1 * N[0],
                                    r[p] = -1 * N[0] + w,
                                    y[p] = r[p] + h - k,
                                    F[p] = v;
                                0 < -1 * N[0] - h + w;

                            ) {
                                var A = 0,
                                    M = m.getSliderOffset(a(c[0]), "x");
                                a(c).each(function (a) {
                                    m.getSliderOffset(this, "x") > M && ((M = m.getSliderOffset(this, "x")), (A = a));
                                });
                                Z = r[p] - B[A];
                                m.setSliderOffset(a(c)[A], Z);
                                N.splice(0, 0, -1 * Z + w);
                                N.splice(N.length - 1, 1);
                                r[p] = -1 * N[0] + w;
                                y[p] = r[p] + h - k;
                                F[p]--;
                                E[p]++;
                            }
                        for (; d > -1 * r[p]; )
                            (A = 0),
                                (M = m.getSliderOffset(a(c[0]), "x")),
                                a(c).each(function (a) {
                                    m.getSliderOffset(this, "x") > M && ((M = m.getSliderOffset(this, "x")), (A = a));
                                }),
                                (Z = r[p] - B[A]),
                                m.setSliderOffset(a(c)[A], Z),
                                N.splice(0, 0, -1 * Z + w),
                                N.splice(N.length - 1, 1),
                                (r[p] = -1 * N[0] + w),
                                (y[p] = r[p] + h - k),
                                F[p]--;
                    }
                }
                H = !1;
                k = m.calcActiveOffset(G, d, N, k, F[p], v, z, p);
                Z = (k + F[p] + v) % v;
                G.infiniteSlider ? Z != ba[p] && (H = !0) : k != E[p] && (H = !0);
                if (H && ((v = new m.args("change", G, b, a(b).children(":eq(" + Z + ")"), Z, n)), a(b).parent().data("args", v), "" != G.onSlideChange)) G.onSlideChange(v);
                E[p] = k;
                ba[p] = Z;
                d = Math.floor(d);
                if (p != a(b).parent().data("args").data.sliderNumber) return !0;
                m.setSliderOffset(b, d);
                G.scrollbar &&
                    ((f = Math.floor(((-1 * d - r[p] + w) / (y[p] - r[p] + w)) * (l - q - g))),
                    (b = g - u),
                    d >= -1 * r[p] + w ? ((b = g - u - -1 * f), m.setSliderOffset(a("." + e), 0)) : (d <= -1 * y[p] + 1 && (b = l - q - u - f), m.setSliderOffset(a("." + e), f)),
                    a("." + e).css({ width: b + "px" }));
            },
            slowScrollHorizontal: function (b, c, d, f, e, k, g, l, q, u, w, N, z, v, B, p, C, n, G, K, P) {
                var h = m.getSliderOffset(b, "x");
                k = [];
                var D = 0,
                    t = (25 / 1024) * l;
                frictionCoefficient = P.frictionCoefficient;
                elasticFrictionCoefficient = P.elasticFrictionCoefficient;
                snapFrictionCoefficient = P.snapFrictionCoefficient;
                e > P.snapVelocityThreshold && P.snapToChildren && !G ? (D = 1) : e < -1 * P.snapVelocityThreshold && P.snapToChildren && !G && (D = -1);
                e < -1 * t ? (e = -1 * t) : e > t && (e = t);
                a(b)[0] !== a(n)[0] && ((D *= -1), (e *= -2));
                n = F[B];
                if (P.infiniteSlider)
                    var J = r[B],
                        A = y[B];
                G = [];
                t = [];
                for (var M = 0; M < z.length; M++) (G[M] = z[M]), M < c.length && (t[M] = m.getSliderOffset(a(c[M]), "x"));
                for (; 1 < e || -1 > e; ) {
                    e *= frictionCoefficient;
                    h += e;
                    (h > -1 * r[B] || h < -1 * y[B]) && !P.infiniteSlider && ((e *= elasticFrictionCoefficient), (h += e));
                    if (P.infiniteSlider) {
                        if (h <= -1 * A) {
                            A = a(b).width();
                            var H = 0,
                                R = t[0];
                            for (M = 0; M < t.length; M++) t[M] < R && ((R = t[M]), (H = M));
                            M = J + A;
                            t[H] = M;
                            J = -1 * G[1] + K;
                            A = J + A - l;
                            G.splice(0, 1);
                            G.splice(G.length, 0, -1 * M + K);
                            n++;
                        }
                        if (h >= -1 * J) {
                            A = a(b).width();
                            H = 0;
                            R = t[0];
                            for (M = 0; M < t.length; M++) t[M] > R && ((R = t[M]), (H = M));
                            M = J - v[H];
                            t[H] = M;
                            G.splice(0, 0, -1 * M + K);
                            G.splice(G.length - 1, 1);
                            J = -1 * G[0] + K;
                            A = J + A - l;
                            n--;
                        }
                    }
                    k[k.length] = h;
                }
                t = !1;
                e = m.calcActiveOffset(P, h, G, l, n, C, E[B], B);
                J = (e + n + C) % C;
                P.snapToChildren &&
                    (P.infiniteSlider ? J != ba[B] && (t = !0) : e != E[B] && (t = !0), 0 > D && !t ? (e++, e >= z.length && !P.infiniteSlider && (e = z.length - 1)) : 0 < D && !t && (e--, 0 > e && !P.infiniteSlider && (e = 0)));
                if (P.snapToChildren || ((h > -1 * r[B] || h < -1 * y[B]) && !P.infiniteSlider)) {
                    (h > -1 * r[B] || h < -1 * y[B]) && !P.infiniteSlider ? k.splice(0, k.length) : (k.splice(0.1 * k.length, k.length), (h = 0 < k.length ? k[k.length - 1] : h));
                    for (; h < G[e] - 0.5 || h > G[e] + 0.5; ) (h = (h - G[e]) * snapFrictionCoefficient + G[e]), (k[k.length] = h);
                    k[k.length] = G[e];
                }
                D = 1;
                0 != k.length % 2 && (D = 0);
                for (h = 0; h < d.length; h++) clearTimeout(d[h]);
                n = (e + n + C) % C;
                J = 0;
                for (h = D; h < k.length; h += 2)
                    if (h == D || 1 < Math.abs(k[h] - J) || h >= k.length - 2) (J = k[h]), (d[d.length] = m.slowScrollHorizontalIntervalTimer(10 * h, b, c, k[h], f, g, l, q, u, w, e, N, z, p, C, v, B, K, n, P));
                J = (e + F[B] + C) % C;
                "" != P.onSlideComplete && 1 < k.length && (d[d.length] = m.onSlideCompleteTimer(10 * (h + 1), P, b, a(b).children(":eq(" + J + ")"), n, B));
                d[d.length] = m.updateBackfaceVisibilityTimer(10 * (h + 1), c, B, C, P);
                X[B] = d;
                m.hideScrollbar(P, d, h, k, f, g, l, u, w, B);
            },
            onSlideComplete: function (b, c, d, e, f) {
                d = new m.args("complete", b, a(c), d, e, e);
                a(c).parent().data("args", d);
                if ("" != b.onSlideComplete) b.onSlideComplete(d);
            },
            getSliderOffset: function (b, c) {
                c = "x" == c ? 4 : 5;
                if (!g || q || u) b = parseInt(a(b).css("left"), 10);
                else {
                    for (var d = ["-webkit-transform", "-moz-transform", "transform"], e, f = 0; f < d.length; f++)
                        if (void 0 != a(b).css(d[f]) && 0 < a(b).css(d[f]).length) {
                            e = a(b).css(d[f]).split(",");
                            break;
                        }
                    b = void 0 == e[c] ? 0 : parseInt(e[c], 10);
                }
                return b;
            },
            setSliderOffset: function (b, c) {
                c = parseInt(c, 10);
                !g || q || u
                    ? a(b).css({ left: c + "px" })
                    : a(b).css({ msTransform: "matrix(1,0,0,1," + c + ",0)", webkitTransform: "matrix(1,0,0,1," + c + ",0)", MozTransform: "matrix(1,0,0,1," + c + ",0)", transform: "matrix(1,0,0,1," + c + ",0)" });
            },
            setBrowserInfo: function () {
                null != navigator.userAgent.match("WebKit")
                    ? ((C = "-webkit-grab"), (Q = "-webkit-grabbing"))
                    : null != navigator.userAgent.match("Gecko")
                    ? ((w = !0), (C = "move"), (Q = "-moz-grabbing"))
                    : null != navigator.userAgent.match("MSIE 7")
                    ? (z = q = !0)
                    : null != navigator.userAgent.match("MSIE 8")
                    ? (z = u = !0)
                    : null != navigator.userAgent.match("MSIE 9") && (z = !0);
            },
            has3DTransform: function () {
                var b = !1,
                    c = a("<div />").css({ msTransform: "matrix(1,1,1,1,1,1)", webkitTransform: "matrix(1,1,1,1,1,1)", MozTransform: "matrix(1,1,1,1,1,1)", transform: "matrix(1,1,1,1,1,1)" });
                "" == c.attr("style") ? (b = !1) : w && 21 <= parseInt(navigator.userAgent.split("/")[3], 10) ? (b = !1) : void 0 != c.attr("style") && (b = !0);
                return b;
            },
            getSlideNumber: function (a, b, c) {
                return (a - F[b] + c) % c;
            },
            calcActiveOffset: function (a, b, c, d, e, f, g, l) {
                e = !1;
                a = [];
                var h;
                b > c[0] && (h = 0);
                b < c[c.length - 1] && (h = f - 1);
                for (f = 0; f < c.length; f++) c[f] <= b && c[f] > b - d && (e || c[f] == b || (a[a.length] = c[f - 1]), (a[a.length] = c[f]), (e = !0));
                0 == a.length && (a[0] = c[c.length - 1]);
                for (f = e = 0; f < a.length; f++) (g = Math.abs(b - a[f])), g < d && ((e = a[f]), (d = g));
                for (f = 0; f < c.length; f++) e == c[f] && (h = f);
                return h;
            },
            changeSlide: function (b, c, d, e, f, g, l, q, u, r, w, z, C, v, B, p, y, n) {
                m.autoSlidePause(v);
                for (var h = 0; h < e.length; h++) clearTimeout(e[h]);
                var D = Math.ceil(n.autoSlideTransTimer / 10) + 1,
                    k = m.getSliderOffset(c, "x"),
                    t = z[b];
                t -= k;
                var J = b - ((E[v] + F[v] + p) % p);
                if (n.infiniteSlider) {
                    b = (b - F[v] + 2 * p) % p;
                    h = !1;
                    0 == b && 2 == p && ((b = p), (z[b] = z[b - 1] - a(d).eq(0).outerWidth(!0)), (h = !0));
                    t = z[b];
                    t -= k;
                    var A = [z[b] - a(c).width(), z[b] + a(c).width()];
                    h && z.splice(z.length - 1, 1);
                    for (h = 0; h < A.length; h++) Math.abs(A[h] - k) < Math.abs(t) && (t = A[h] - k);
                }
                0 > t && -1 == J ? (t += a(c).width()) : 0 < t && 1 == J && (t -= a(c).width());
                J = [];
                m.showScrollbar(n, f);
                for (h = 0; h <= D; h++) (A = h), (A /= D), A--, (A = k + t * (Math.pow(A, 5) + 1)), (J[J.length] = A);
                D = (b + F[v] + p) % p;
                for (h = k = 0; h < J.length; h++) {
                    if (0 == h || 1 < Math.abs(J[h] - k) || h >= J.length - 2) (k = J[h]), (e[h] = m.slowScrollHorizontalIntervalTimer(10 * (h + 1), c, d, J[h], f, g, l, q, u, r, b, w, z, B, p, C, v, y, D, n));
                    0 == h && "" != n.onSlideStart && ((t = (E[v] + F[v] + p) % p), n.onSlideStart(new m.args("start", n, c, a(c).children(":eq(" + t + ")"), t, b)));
                }
                k = !1;
                n.infiniteSlider ? D != ba[v] && (k = !0) : b != E[v] && (k = !0);
                k && "" != n.onSlideComplete && (e[e.length] = m.onSlideCompleteTimer(10 * (h + 1), n, c, a(c).children(":eq(" + D + ")"), D, v));
                X[v] = e;
                m.hideScrollbar(n, e, h, J, f, g, l, u, r, v);
                m.autoSlide(c, d, e, f, g, l, q, u, r, w, z, C, v, B, p, y, n);
            },
            changeOffset: function (b, c, d, e, f, g, l, q, u, z, w, C, Q, v, B, p, W, n) {
                m.autoSlidePause(v);
                for (var h = 0; h < e.length; h++) clearTimeout(e[h]);
                n.infiniteSlider || ((b = b > -1 * r[v] + W ? -1 * r[v] + W : b), (b = b < -1 * y[v] ? -1 * y[v] : b));
                var k = Math.ceil(n.autoSlideTransTimer / 10) + 1,
                    D = m.getSliderOffset(c, "x");
                h = (m.calcActiveOffset(n, b, C, l, F, p, E[v], v) + F[v] + p) % p;
                var t = C.slice();
                if (n.snapToChildren && !n.infiniteSlider) b = C[h];
                else if (n.infiniteSlider && n.snapToChildren) {
                    for (; b >= t[0]; ) t.splice(0, 0, t[p - 1] + a(c).width()), t.splice(p, 1);
                    for (; b <= t[p - 1]; ) t.splice(p, 0, t[0] - a(c).width()), t.splice(0, 1);
                    h = m.calcActiveOffset(n, b, t, l, F, p, E[v], v);
                    b = t[h];
                }
                var J = b - D;
                b = [];
                m.showScrollbar(n, f);
                for (t = 0; t <= k; t++) {
                    var A = t;
                    A /= k;
                    A--;
                    A = D + J * (Math.pow(A, 5) + 1);
                    b[b.length] = A;
                }
                k = (h + F[v] + p) % p;
                for (t = D = 0; t < b.length; t++) {
                    if (0 == t || 1 < Math.abs(b[t] - D) || t >= b.length - 2) (D = b[t]), (e[t] = m.slowScrollHorizontalIntervalTimer(10 * (t + 1), c, d, b[t], f, g, l, q, u, z, h, w, C, B, p, Q, v, W, k, n));
                    0 == t && "" != n.onSlideStart && ((k = (E[v] + F[v] + p) % p), n.onSlideStart(new m.args("start", n, c, a(c).children(":eq(" + k + ")"), k, h)));
                }
                D = !1;
                n.infiniteSlider ? k != ba[v] && (D = !0) : h != E[v] && (D = !0);
                D && "" != n.onSlideComplete && (e[e.length] = m.onSlideCompleteTimer(10 * (t + 1), n, c, a(c).children(":eq(" + k + ")"), k, v));
                X[v] = e;
                m.hideScrollbar(n, e, t, b, f, g, l, u, z, v);
                m.autoSlide(c, d, e, f, g, l, q, u, z, w, C, Q, v, B, p, W, n);
            },
            autoSlide: function (a, b, c, d, e, f, g, l, q, u, z, r, w, v, C, p, y) {
                if (!U[w].autoSlide) return !1;
                m.autoSlidePause(w);
                W[w] = setTimeout(function () {
                    !y.infiniteSlider && E[w] > z.length - 1 && (E[w] -= C);
                    m.changeSlide(E[w] + F[w] + 1, a, b, c, d, e, f, g, l, q, u, z, r, w, v, C, p, y);
                    m.autoSlide(a, b, c, d, e, f, g, l, q, u, z, r, w, v, C, p, y);
                }, y.autoSlideTimer + y.autoSlideTransTimer);
            },
            autoSlidePause: function (a) {
                clearTimeout(W[a]);
            },
            isUnselectable: function (b, c) {
                return "" != c.unselectableSelector && 1 == a(b).closest(c.unselectableSelector).length ? !0 : !1;
            },
            slowScrollHorizontalIntervalTimer: function (a, b, c, d, e, f, g, l, q, u, w, z, r, v, C, p, y, n, Q, E) {
                return setTimeout(function () {
                    m.slowScrollHorizontalInterval(b, c, d, e, f, g, l, q, u, w, z, r, v, C, p, y, n, Q, E);
                }, a);
            },
            onSlideCompleteTimer: function (a, b, c, d, e, f) {
                return setTimeout(function () {
                    m.onSlideComplete(b, c, d, e, f);
                }, a);
            },
            hideScrollbarIntervalTimer: function (a, b, c, d, e, f, g, l, q, u) {
                return setTimeout(function () {
                    m.hideScrollbarInterval(b, c, d, e, f, g, l, q, u);
                }, a);
            },
            updateBackfaceVisibilityTimer: function (a, b, c, d, e) {
                return setTimeout(function () {
                    m.updateBackfaceVisibility(b, c, d, e);
                }, a);
            },
            updateBackfaceVisibility: function (b, c, d, e) {
                c = (E[c] + F[c] + d) % d;
                for (var h = [], f = 0; f < 2 * e.hardwareAccelBuffer; f++) {
                    var g = m.mod(c + f - e.hardwareAccelBuffer, d);
                    if ("visible" == a(b).eq(g).css("-webkit-backface-visibility")) {
                        h[h.length] = g;
                        var D = m.mod(g + 2 * e.hardwareAccelBuffer, d),
                            l = m.mod(g - 2 * e.hardwareAccelBuffer, d);
                        a(b).eq(g).css("-webkit-backface-visibility", "hidden");
                        -1 == h.indexOf(l) && a(b).eq(l).css("-webkit-backface-visibility", "");
                        -1 == h.indexOf(D) && a(b).eq(D).css("-webkit-backface-visibility", "");
                    }
                }
            },
            mod: function (a, b) {
                a %= b;
                return 0 > a ? a + b : a;
            },
            args: function (b, c, d, e, f, g) {
                this.prevSlideNumber = void 0 == a(d).parent().data("args") ? void 0 : a(d).parent().data("args").prevSlideNumber;
                this.prevSlideObject = void 0 == a(d).parent().data("args") ? void 0 : a(d).parent().data("args").prevSlideObject;
                this.targetSlideNumber = g + 1;
                this.targetSlideObject = a(d).children(":eq(" + g + ")");
                this.slideChanged = !1;
                "load" == b
                    ? (this.targetSlideObject = this.targetSlideNumber = void 0)
                    : "start" == b
                    ? (this.targetSlideObject = this.targetSlideNumber = void 0)
                    : "change" == b
                    ? ((this.slideChanged = !0),
                      (this.prevSlideNumber = void 0 == a(d).parent().data("args") ? c.startAtSlide : a(d).parent().data("args").currentSlideNumber),
                      (this.prevSlideObject = a(d).children(":eq(" + this.prevSlideNumber + ")")))
                    : "complete" == b && (this.slideChanged = a(d).parent().data("args").slideChanged);
                this.settings = c;
                this.data = a(d).parent().data("iosslider");
                this.sliderObject = d;
                this.sliderContainerObject = a(d).parent();
                this.currentSlideObject = e;
                this.currentSlideNumber = f + 1;
                this.currentSliderOffset = -1 * m.getSliderOffset(d, "x");
            },
            preventDrag: function (a) {
                a.preventDefault();
            },
            preventClick: function (a) {
                a.stopImmediatePropagation();
                return !1;
            },
            enableClick: function () {
                return !0;
            },
        };
    m.setBrowserInfo();
    var da = {
        init: function (J, A) {
            g = m.has3DTransform();
            var h = a.extend(
                !0,
                {
                    elasticPullResistance: 0.6,
                    frictionCoefficient: 0.92,
                    elasticFrictionCoefficient: 0.6,
                    snapFrictionCoefficient: 0.92,
                    snapToChildren: !1,
                    snapSlideCenter: !1,
                    startAtSlide: 1,
                    scrollbar: !1,
                    scrollbarDrag: !1,
                    scrollbarHide: !0,
                    scrollbarPaging: !1,
                    scrollbarLocation: "top",
                    scrollbarContainer: "",
                    scrollbarOpacity: 0.4,
                    scrollbarHeight: "4px",
                    scrollbarBorder: "0",
                    scrollbarMargin: "5px",
                    scrollbarBackground: "#000",
                    scrollbarBorderRadius: "100px",
                    scrollbarShadow: "0 0 0 #000",
                    scrollbarElasticPullResistance: 0.9,
                    desktopClickDrag: !1,
                    keyboardControls: !1,
                    tabToAdvance: !1,
                    responsiveSlideContainer: !0,
                    responsiveSlides: !0,
                    navSlideSelector: "",
                    navPrevSelector: "",
                    navNextSelector: "",
                    autoSlideToggleSelector: "",
                    autoSlide: !1,
                    autoSlideTimer: 5e3,
                    autoSlideTransTimer: 750,
                    autoSlideHoverPause: !0,
                    infiniteSlider: !1,
                    snapVelocityThreshold: 5,
                    slideStartVelocityThreshold: 0,
                    horizontalSlideLockThreshold: 5,
                    verticalSlideLockThreshold: 3,
                    hardwareAccelBuffer: 5,
                    stageCSS: { position: "relative", top: "0", left: "0", overflow: "hidden", zIndex: 1 },
                    unselectableSelector: "",
                    onSliderLoaded: "",
                    onSliderUpdate: "",
                    onSliderResize: "",
                    onSlideStart: "",
                    onSlideChange: "",
                    onSlideComplete: "",
                },
                J
            );
            void 0 == A && (A = this);
            return a(A).each(function (g) {
                function D() {
                    m.autoSlidePause(k);
                    ya = a(L).find("a");
                    Da = a(L).find("[onclick]");
                    ra = a(L).find("*");
                    a(G).css("width", "");
                    a(G).css("height", "");
                    a(L).css("width", "");
                    I = a(L).children().not("script").get();
                    na = [];
                    S = [];
                    h.responsiveSlides && a(I).css("width", "100%");
                    y[k] = 0;
                    x = [];
                    p = a(G).parent().width();
                    K = a(G).outerWidth(!0);
                    h.responsiveSlideContainer && (K = a(G).outerWidth(!0) > p ? p : a(G).width());
                    a(G).css({
                        position: h.stageCSS.position,
                        top: h.stageCSS.top,
                        left: h.stageCSS.left,
                        overflow: h.stageCSS.overflow,
                        zIndex: h.stageCSS.zIndex,
                        webkitPerspective: 1e3,
                        webkitBackfaceVisibility: "hidden",
                        msTouchAction: "pan-y",
                        width: K,
                    });
                    a(h.unselectableSelector).css({ cursor: "default" });
                    for (var b = 0; b < I.length; b++) {
                        na[b] = a(I[b]).width();
                        S[b] = a(I[b]).outerWidth(!0);
                        var c = S[b];
                        h.responsiveSlides && (S[b] > K ? ((c = K + -1 * (S[b] - na[b])), (na[b] = c), (S[b] = K)) : (c = na[b]), a(I[b]).css({ width: c }));
                        a(I[b]).css({ overflow: "hidden", position: "absolute" });
                        x[b] = -1 * y[k];
                        y[k] = y[k] + c + (S[b] - na[b]);
                    }
                    h.snapSlideCenter && ((n = 0.5 * (K - S[0])), h.responsiveSlides && S[0] > K && (n = 0));
                    ca[k] = 2 * y[k];
                    for (b = 0; b < I.length; b++) m.setSliderOffset(a(I[b]), -1 * x[b] + y[k] + n), (x[b] -= y[k]);
                    if (!h.infiniteSlider && !h.snapSlideCenter) {
                        for (b = 0; b < x.length && !(x[b] <= -1 * (2 * y[k] - K)); b++) Ea = b;
                        x.splice(Ea + 1, x.length);
                        x[x.length] = -1 * (2 * y[k] - K);
                    }
                    for (b = 0; b < x.length; b++) Y[b] = x[b];
                    wa &&
                        ((U[k].startAtSlide = U[k].startAtSlide > x.length ? x.length : U[k].startAtSlide),
                        h.infiniteSlider
                            ? ((U[k].startAtSlide = (U[k].startAtSlide - 1 + O) % O), (E[k] = U[k].startAtSlide))
                            : ((U[k].startAtSlide = 0 > U[k].startAtSlide - 1 ? x.length - 1 : U[k].startAtSlide), (E[k] = U[k].startAtSlide - 1)),
                        (ba[k] = E[k]));
                    r[k] = y[k] + n;
                    a(L).css({ position: "relative", cursor: C, webkitPerspective: "0", webkitBackfaceVisibility: "hidden", width: y[k] + "px" });
                    fa = y[k];
                    y[k] = 2 * y[k] - K + 2 * n;
                    (ha = fa + n < K || 0 == K ? !0 : !1) && a(L).css({ cursor: "default" });
                    va = a(G).parent().outerHeight(!0);
                    P = a(G).height();
                    h.responsiveSlideContainer && (P = P > va ? va : P);
                    a(G).css({ height: P });
                    m.setSliderOffset(L, x[E[k]]);
                    if (h.infiniteSlider && !ha) {
                        b = m.getSliderOffset(a(L), "x");
                        for (c = ((F[k] + O) % O) * -1; 0 > c; ) {
                            var d = 0,
                                e = m.getSliderOffset(a(I[0]), "x");
                            a(I).each(function (a) {
                                m.getSliderOffset(this, "x") < e && ((e = m.getSliderOffset(this, "x")), (d = a));
                            });
                            var f = r[k] + fa;
                            m.setSliderOffset(a(I)[d], f);
                            r[k] = -1 * x[1] + n;
                            y[k] = r[k] + fa - K;
                            x.splice(0, 1);
                            x.splice(x.length, 0, -1 * f + n);
                            c++;
                        }
                        for (; 0 < -1 * x[0] - fa + n && h.snapSlideCenter && wa; ) {
                            var g = 0,
                                D = m.getSliderOffset(a(I[0]), "x");
                            a(I).each(function (a) {
                                m.getSliderOffset(this, "x") > D && ((D = m.getSliderOffset(this, "x")), (g = a));
                            });
                            f = r[k] - S[g];
                            m.setSliderOffset(a(I)[g], f);
                            x.splice(0, 0, -1 * f + n);
                            x.splice(x.length - 1, 1);
                            r[k] = -1 * x[0] + n;
                            y[k] = r[k] + fa - K;
                            F[k]--;
                            E[k]++;
                        }
                        for (; b <= -1 * y[k]; )
                            (d = 0),
                                (e = m.getSliderOffset(a(I[0]), "x")),
                                a(I).each(function (a) {
                                    m.getSliderOffset(this, "x") < e && ((e = m.getSliderOffset(this, "x")), (d = a));
                                }),
                                (f = r[k] + fa),
                                m.setSliderOffset(a(I)[d], f),
                                (r[k] = -1 * x[1] + n),
                                (y[k] = r[k] + fa - K),
                                x.splice(0, 1),
                                x.splice(x.length, 0, -1 * f + n),
                                F[k]++,
                                E[k]--;
                    }
                    m.setSliderOffset(L, x[E[k]]);
                    m.updateBackfaceVisibility(I, k, O, h);
                    h.desktopClickDrag || a(L).css({ cursor: "default" });
                    h.scrollbar &&
                        (a("." + R).css({ margin: h.scrollbarMargin, overflow: "hidden", display: "none" }),
                        a("." + R + " ." + H).css({ border: h.scrollbarBorder }),
                        (T = parseInt(a("." + R).css("marginLeft")) + parseInt(a("." + R).css("marginRight"))),
                        (V = parseInt(a("." + R + " ." + H).css("borderLeftWidth"), 10) + parseInt(a("." + R + " ." + H).css("borderRightWidth"), 10)),
                        (v = "" != h.scrollbarContainer ? a(h.scrollbarContainer).width() : K),
                        (B = (K / fa) * (v - T)),
                        h.scrollbarHide || (xa = h.scrollbarOpacity),
                        a("." + R).css({ position: "absolute", left: 0, width: v - T + "px", margin: h.scrollbarMargin }),
                        "top" == h.scrollbarLocation ? a("." + R).css("top", "0") : a("." + R).css("bottom", "0"),
                        a("." + R + " ." + H).css({
                            borderRadius: h.scrollbarBorderRadius,
                            background: h.scrollbarBackground,
                            height: h.scrollbarHeight,
                            width: B - V + "px",
                            minWidth: h.scrollbarHeight,
                            border: h.scrollbarBorder,
                            webkitPerspective: 1e3,
                            webkitBackfaceVisibility: "hidden",
                            position: "relative",
                            opacity: xa,
                            filter: "alpha(opacity:" + 100 * xa + ")",
                            boxShadow: h.scrollbarShadow,
                        }),
                        m.setSliderOffset(a("." + R + " ." + H), Math.floor(((-1 * x[E[k]] - r[k] + n) / (y[k] - r[k] + n)) * (v - T - B))),
                        a("." + R).css({ display: "block" }),
                        (N = a("." + R + " ." + H)),
                        (W = a("." + R)));
                    h.scrollbarDrag && !ha && a("." + R + " ." + H).css({ cursor: C });
                    h.infiniteSlider && (aa = (y[k] + K) / 3);
                    "" != h.navSlideSelector &&
                        a(h.navSlideSelector).each(function (b) {
                            a(this).css({ cursor: "pointer" });
                            a(this)
                                .unbind(ea)
                                .bind(ea, function (c) {
                                    "touchstart" == c.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                                    ea = c.type + ".iosSliderEvent";
                                    m.changeSlide(b, L, I, A, H, B, K, v, T, V, Y, x, S, k, aa, O, n, h);
                                });
                        });
                    "" != h.navPrevSelector &&
                        (a(h.navPrevSelector).css({ cursor: "pointer" }),
                        a(h.navPrevSelector)
                            .unbind(ea)
                            .bind(ea, function (b) {
                                "touchstart" == b.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                                ea = b.type + ".iosSliderEvent";
                                b = (E[k] + F[k] + O) % O;
                                (0 < b || h.infiniteSlider) && m.changeSlide(b - 1, L, I, A, H, B, K, v, T, V, Y, x, S, k, aa, O, n, h);
                            }));
                    "" != h.navNextSelector &&
                        (a(h.navNextSelector).css({ cursor: "pointer" }),
                        a(h.navNextSelector)
                            .unbind(ea)
                            .bind(ea, function (b) {
                                "touchstart" == b.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                                ea = b.type + ".iosSliderEvent";
                                b = (E[k] + F[k] + O) % O;
                                (b < x.length - 1 || h.infiniteSlider) && m.changeSlide(b + 1, L, I, A, H, B, K, v, T, V, Y, x, S, k, aa, O, n, h);
                            }));
                    h.autoSlide &&
                        !ha &&
                        "" != h.autoSlideToggleSelector &&
                        (a(h.autoSlideToggleSelector).css({ cursor: "pointer" }),
                        a(h.autoSlideToggleSelector)
                            .unbind(ea)
                            .bind(ea, function (b) {
                                "touchstart" == b.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                                ea = b.type + ".iosSliderEvent";
                                pa
                                    ? (m.autoSlide(L, I, A, H, B, K, v, T, V, Y, x, S, k, aa, O, n, h), (pa = !1), a(h.autoSlideToggleSelector).removeClass("on"))
                                    : (m.autoSlidePause(k), (pa = !0), a(h.autoSlideToggleSelector).addClass("on"));
                            }));
                    m.autoSlide(L, I, A, H, B, K, v, T, V, Y, x, S, k, aa, O, n, h);
                    a(G).bind("mouseleave.iosSliderEvent", function () {
                        if (pa) return !0;
                        m.autoSlide(L, I, A, H, B, K, v, T, V, Y, x, S, k, aa, O, n, h);
                    });
                    a(G).bind("touchend.iosSliderEvent", function () {
                        if (pa) return !0;
                        m.autoSlide(L, I, A, H, B, K, v, T, V, Y, x, S, k, aa, O, n, h);
                    });
                    h.autoSlideHoverPause &&
                        a(G).bind("mouseenter.iosSliderEvent", function () {
                            m.autoSlidePause(k);
                        });
                    a(G).data("iosslider", {
                        obj: Fa,
                        settings: h,
                        scrollerNode: L,
                        slideNodes: I,
                        numberOfSlides: O,
                        centeredSlideOffset: n,
                        sliderNumber: k,
                        originalOffsets: Y,
                        childrenOffsets: x,
                        sliderMax: y[k],
                        scrollbarClass: H,
                        scrollbarWidth: B,
                        scrollbarStageWidth: v,
                        stageWidth: K,
                        scrollMargin: T,
                        scrollBorder: V,
                        infiniteSliderOffset: F[k],
                        infiniteSliderWidth: aa,
                        slideNodeOuterWidths: S,
                        shortContent: ha,
                    });
                    wa = !1;
                    return !0;
                }
                b++;
                var k = b,
                    A = [];
                U[k] = a.extend({}, h);
                r[k] = 0;
                y[k] = 0;
                var J = [0, 0],
                    w = [0, 0],
                    R = "scrollbarBlock" + b,
                    H = "scrollbar" + b,
                    N,
                    W,
                    v,
                    B,
                    p,
                    va,
                    n = 0,
                    G = a(this),
                    K,
                    P,
                    T,
                    V,
                    Ca,
                    wa = !0;
                g = -1;
                var x,
                    Y = [],
                    xa = 0,
                    ka = 0,
                    Ga = 0,
                    L = a(this).children(":first-child"),
                    I,
                    na,
                    S,
                    O = a(L).children().not("script").length,
                    ia = !1,
                    Ea = 0,
                    za = !1,
                    sa = void 0,
                    aa;
                F[k] = 0;
                var ha = !1,
                    pa = !1;
                oa[k] = !1;
                var la,
                    ta = !1,
                    qa = !1,
                    ea = "touchstart.iosSliderEvent click.iosSliderEvent",
                    fa,
                    ya,
                    Da,
                    ra;
                ja[k] = !1;
                X[k] = [];
                h.scrollbarDrag && ((h.scrollbar = !0), (h.scrollbarHide = !1));
                var Fa = a(this);
                if (void 0 != Fa.data("iosslider")) return !0;
                14.2 <= parseInt(a().jquery.split(".").join(""), 10)
                    ? a(this).delegate("img", "dragstart.iosSliderEvent", function (a) {
                          a.preventDefault();
                      })
                    : a(this)
                          .find("img")
                          .bind("dragstart.iosSliderEvent", function (a) {
                              a.preventDefault();
                          });
                h.infiniteSlider && (h.scrollbar = !1);
                h.infiniteSlider && 1 == O && (h.infiniteSlider = !1);
                h.scrollbar &&
                    ("" != h.scrollbarContainer
                        ? a(h.scrollbarContainer).append("<div class = '" + R + "'><div class = '" + H + "'></div></div>")
                        : a(L)
                              .parent()
                              .append("<div class = '" + R + "'><div class = '" + H + "'></div></div>"));
                if (!D()) return !0;
                a(this).find("a").bind("mousedown", m.preventDrag);
                a(this)
                    .find("[onclick]")
                    .bind("click", m.preventDrag)
                    .each(function () {
                        a(this).data("onclick", this.onclick);
                    });
                g = m.calcActiveOffset(h, m.getSliderOffset(a(L), "x"), x, K, F[k], O, void 0, k);
                g = (g + F[k] + O) % O;
                g = new m.args("load", h, L, a(L).children(":eq(" + g + ")"), g, g);
                a(G).data("args", g);
                if ("" != h.onSliderLoaded) h.onSliderLoaded(g);
                h.scrollbarPaging &&
                    h.scrollbar &&
                    !ha &&
                    (a(W).css("cursor", "pointer"),
                    a(W).bind("click.iosSliderEvent", function (b) {
                        this == b.target && (b.pageX > a(N).offset().left ? da.nextPage(G) : da.prevPage(G));
                    }));
                if (U[k].responsiveSlides || U[k].responsiveSlideContainer)
                    (g = l ? "orientationchange" : "resize"),
                        a(window).bind(g + ".iosSliderEvent-" + k, function () {
                            if (!D()) return !0;
                            var b = a(G).data("args");
                            if ("" != h.onSliderResize) h.onSliderResize(b);
                        });
                (!h.keyboardControls && !h.tabToAdvance) ||
                    ha ||
                    a(document).bind("keydown.iosSliderEvent", function (a) {
                        q || u || (a = a.originalEvent);
                        if ("INPUT" == a.target.nodeName || ja[k]) return !0;
                        if (37 == a.keyCode && h.keyboardControls) a.preventDefault(), (a = (E[k] + F[k] + O) % O), (0 < a || h.infiniteSlider) && m.changeSlide(a - 1, L, I, A, H, B, K, v, T, V, Y, x, S, k, aa, O, n, h);
                        else if ((39 == a.keyCode && h.keyboardControls) || (9 == a.keyCode && h.tabToAdvance))
                            a.preventDefault(), (a = (E[k] + F[k] + O) % O), (a < x.length - 1 || h.infiniteSlider) && m.changeSlide(a + 1, L, I, A, H, B, K, v, T, V, Y, x, S, k, aa, O, n, h);
                    });
                if (e || h.desktopClickDrag) {
                    var ma = !1,
                        Aa = !1;
                    g = a(L);
                    var ua = a(L),
                        Ba = !1;
                    h.scrollbarDrag && ((g = g.add(N)), (ua = ua.add(W)));
                    a(g).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent", function (b) {
                        a(window).one("scroll.iosSliderEvent", function (a) {
                            ma = !1;
                        });
                        if (ma) return !0;
                        ma = !0;
                        Aa = !1;
                        "touchstart" == b.type ? a(ua).unbind("mousedown.iosSliderEvent") : a(ua).unbind("touchstart.iosSliderEvent");
                        if (ja[k] || ha || (Ba = m.isUnselectable(b.target, h))) return (ia = ma = !1), !0;
                        la = a(this)[0] === a(N)[0] ? N : L;
                        q || u || (b = b.originalEvent);
                        m.autoSlidePause(k);
                        ra.unbind(".disableClick");
                        if ("touchstart" == b.type) (eventX = b.touches[0].pageX), (eventY = b.touches[0].pageY);
                        else {
                            if (window.getSelection) window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges();
                            else if (document.selection)
                                if (u)
                                    try {
                                        document.selection.empty();
                                    } catch (Ia) {}
                                else document.selection.empty();
                            eventX = b.pageX;
                            eventY = b.pageY;
                            za = !0;
                            sa = L;
                            a(this).css({ cursor: Q });
                        }
                        J = [0, 0];
                        w = [0, 0];
                        c = 0;
                        ia = !1;
                        for (b = 0; b < A.length; b++) clearTimeout(A[b]);
                        b = m.getSliderOffset(L, "x");
                        b > -1 * r[k] + n + fa
                            ? ((b = -1 * r[k] + n + fa), m.setSliderOffset(a("." + H), b), a("." + H).css({ width: B - V + "px" }))
                            : b < -1 * y[k] && ((b = -1 * y[k]), m.setSliderOffset(a("." + H), v - T - B), a("." + H).css({ width: B - V + "px" }));
                        b = a(this)[0] === a(N)[0] ? r[k] : 0;
                        ka = -1 * (m.getSliderOffset(this, "x") - eventX - b);
                        m.getSliderOffset(this, "y");
                        J[1] = eventX;
                        w[1] = eventY;
                        qa = !1;
                    });
                    a(document).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent", function (b) {
                        q || u || (b = b.originalEvent);
                        if (ja[k] || ha || Ba || !ma) return !0;
                        var e = 0;
                        if ("touchmove" == b.type) (eventX = b.touches[0].pageX), (eventY = b.touches[0].pageY);
                        else {
                            if (window.getSelection) window.getSelection().empty || (window.getSelection().removeAllRanges && window.getSelection().removeAllRanges());
                            else if (document.selection)
                                if (u)
                                    try {
                                        document.selection.empty();
                                    } catch (Ja) {}
                                else document.selection.empty();
                            eventX = b.pageX;
                            eventY = b.pageY;
                            if (!za || (!z && ("undefined" != typeof b.webkitMovementX || "undefined" != typeof b.webkitMovementY) && 0 === b.webkitMovementY && 0 === b.webkitMovementX)) return !0;
                        }
                        J[0] = J[1];
                        J[1] = eventX;
                        c = (J[1] - J[0]) / 2;
                        w[0] = w[1];
                        w[1] = eventY;
                        d = (w[1] - w[0]) / 2;
                        if (!ia) {
                            var g = (E[k] + F[k] + O) % O;
                            g = new m.args("start", h, L, a(L).children(":eq(" + g + ")"), g, void 0);
                            a(G).data("args", g);
                            if ("" != h.onSlideStart) h.onSlideStart(g);
                        }
                        (d > h.verticalSlideLockThreshold || d < -1 * h.verticalSlideLockThreshold) && "touchmove" == b.type && !ia && (ta = !0);
                        (c > h.horizontalSlideLockThreshold || c < -1 * h.horizontalSlideLockThreshold) && "touchmove" == b.type && b.preventDefault();
                        if (c > h.slideStartVelocityThreshold || c < -1 * h.slideStartVelocityThreshold) ia = !0;
                        if (ia && !ta) {
                            g = m.getSliderOffset(L, "x");
                            var D = a(la)[0] === a(N)[0] ? r[k] : n,
                                l = a(la)[0] === a(N)[0] ? (r[k] - y[k] - n) / (v - T - B) : 1,
                                t = a(la)[0] === a(N)[0] ? h.scrollbarElasticPullResistance : h.elasticPullResistance,
                                A = h.snapSlideCenter && a(la)[0] === a(N)[0] ? 0 : n,
                                p = h.snapSlideCenter && a(la)[0] === a(N)[0] ? n : 0;
                            "touchmove" == b.type && (Ga != b.touches.length && (ka = -1 * g + eventX), (Ga = b.touches.length));
                            if (h.infiniteSlider) {
                                if (g <= -1 * y[k]) {
                                    var M = a(L).width();
                                    if (g <= -1 * ca[k]) {
                                        var C = -1 * Y[0];
                                        a(I).each(function (b) {
                                            m.setSliderOffset(a(I)[b], C + n);
                                            b < x.length && (x[b] = -1 * C);
                                            C += S[b];
                                        });
                                        ka -= -1 * x[0];
                                        r[k] = -1 * x[0] + n;
                                        y[k] = r[k] + M - K;
                                        F[k] = 0;
                                    } else {
                                        var Q = 0,
                                            W = m.getSliderOffset(a(I[0]), "x");
                                        a(I).each(function (a) {
                                            m.getSliderOffset(this, "x") < W && ((W = m.getSliderOffset(this, "x")), (Q = a));
                                        });
                                        t = r[k] + M;
                                        m.setSliderOffset(a(I)[Q], t);
                                        r[k] = -1 * x[1] + n;
                                        y[k] = r[k] + M - K;
                                        x.splice(0, 1);
                                        x.splice(x.length, 0, -1 * t + n);
                                        F[k]++;
                                    }
                                }
                                if (g >= -1 * r[k] || 0 <= g)
                                    if (((M = a(L).width()), 0 <= g))
                                        for (
                                            C = -1 * Y[0],
                                                a(I).each(function (b) {
                                                    m.setSliderOffset(a(I)[b], C + n);
                                                    b < x.length && (x[b] = -1 * C);
                                                    C += S[b];
                                                }),
                                                ka += -1 * x[0],
                                                r[k] = -1 * x[0] + n,
                                                y[k] = r[k] + M - K,
                                                F[k] = O;
                                            0 < -1 * x[0] - M + n;

                                        ) {
                                            var R = 0,
                                                P = m.getSliderOffset(a(I[0]), "x");
                                            a(I).each(function (a) {
                                                m.getSliderOffset(this, "x") > P && ((P = m.getSliderOffset(this, "x")), (R = a));
                                            });
                                            t = r[k] - S[R];
                                            m.setSliderOffset(a(I)[R], t);
                                            x.splice(0, 0, -1 * t + n);
                                            x.splice(x.length - 1, 1);
                                            r[k] = -1 * x[0] + n;
                                            y[k] = r[k] + M - K;
                                            F[k]--;
                                            E[k]++;
                                        }
                                    else
                                        (R = 0),
                                            (P = m.getSliderOffset(a(I[0]), "x")),
                                            a(I).each(function (a) {
                                                m.getSliderOffset(this, "x") > P && ((P = m.getSliderOffset(this, "x")), (R = a));
                                            }),
                                            (t = r[k] - S[R]),
                                            m.setSliderOffset(a(I)[R], t),
                                            x.splice(0, 0, -1 * t + n),
                                            x.splice(x.length - 1, 1),
                                            (r[k] = -1 * x[0] + n),
                                            (y[k] = r[k] + M - K),
                                            F[k]--;
                            } else (M = a(L).width()), g > -1 * r[k] + n && (e = ((r[k] + -1 * (ka - D - eventX + A) * l - D) * t * -1) / l), g < -1 * y[k] && (e = ((y[k] + p + -1 * (ka - D - eventX) * l - D) * t * -1) / l);
                            m.setSliderOffset(L, -1 * (ka - D - eventX - e) * l - D + p);
                            h.scrollbar &&
                                (m.showScrollbar(h, H),
                                (f = Math.floor(((ka - eventX - e - r[k] + A) / (y[k] - r[k] + n)) * (v - T - B) * l)),
                                (g = B),
                                0 >= f
                                    ? ((g = B - V - -1 * f), m.setSliderOffset(a("." + H), 0), a("." + H).css({ width: g + "px" }))
                                    : f >= v - T - V - B
                                    ? ((g = v - T - V - f), m.setSliderOffset(a("." + H), f), a("." + H).css({ width: g + "px" }))
                                    : m.setSliderOffset(a("." + H), f));
                            "touchmove" == b.type && (Ca = b.touches[0].pageX);
                            b = !1;
                            e = m.calcActiveOffset(h, -1 * (ka - eventX - e), x, K, F[k], O, void 0, k);
                            g = (e + F[k] + O) % O;
                            h.infiniteSlider ? g != ba[k] && (b = !0) : e != E[k] && (b = !0);
                            if (b) {
                                E[k] = e;
                                ba[k] = g;
                                qa = !0;
                                g = new m.args("change", h, L, a(L).children(":eq(" + g + ")"), g, g);
                                a(G).data("args", g);
                                if ("" != h.onSlideChange) h.onSlideChange(g);
                                m.updateBackfaceVisibility(I, k, O, h);
                            }
                        }
                    });
                    var Ha = a(window);
                    if (u || q) Ha = a(document);
                    a(g).bind("touchcancel.iosSliderEvent touchend.iosSliderEvent", function (a) {
                        a = a.originalEvent;
                        if (Aa) return !1;
                        Aa = !0;
                        if (ja[k] || ha || Ba) return !0;
                        if (0 != a.touches.length) for (var b = 0; b < a.touches.length; b++) a.touches[b].pageX == Ca && m.slowScrollHorizontal(L, I, A, H, c, d, B, K, v, T, V, Y, x, S, k, aa, O, la, qa, n, h);
                        else m.slowScrollHorizontal(L, I, A, H, c, d, B, K, v, T, V, Y, x, S, k, aa, O, la, qa, n, h);
                        ma = ta = !1;
                        return !0;
                    });
                    a(Ha).bind("mouseup.iosSliderEvent-" + k, function (b) {
                        ia ? ya.unbind("click.disableClick").bind("click.disableClick", m.preventClick) : ya.unbind("click.disableClick").bind("click.disableClick", m.enableClick);
                        Da.each(function () {
                            this.onclick = function (b) {
                                if (ia) return !1;
                                a(this).data("onclick") &&
                                    a(this)
                                        .data("onclick")
                                        .call(this, b || window.event);
                            };
                            this.onclick = a(this).data("onclick");
                        });
                        1.8 <= parseFloat(a().jquery)
                            ? ra.each(function () {
                                  var b = a._data(this, "events");
                                  if (void 0 != b && void 0 != b.click && "iosSliderEvent" != b.click[0].namespace) {
                                      if (!ia) return !1;
                                      a(this).one("click.disableClick", m.preventClick);
                                      b = a._data(this, "events").click;
                                      var c = b.pop();
                                      b.splice(0, 0, c);
                                  }
                              })
                            : 1.6 <= parseFloat(a().jquery) &&
                              ra.each(function () {
                                  var b = a(this).data("events");
                                  if (void 0 != b && void 0 != b.click && "iosSliderEvent" != b.click[0].namespace) {
                                      if (!ia) return !1;
                                      a(this).one("click.disableClick", m.preventClick);
                                      b = a(this).data("events").click;
                                      var c = b.pop();
                                      b.splice(0, 0, c);
                                  }
                              });
                        if (!oa[k]) {
                            if (ha) return !0;
                            h.desktopClickDrag && a(L).css({ cursor: C });
                            h.scrollbarDrag && a(N).css({ cursor: C });
                            za = !1;
                            if (void 0 == sa) return !0;
                            m.slowScrollHorizontal(sa, I, A, H, c, d, B, K, v, T, V, Y, x, S, k, aa, O, la, qa, n, h);
                            sa = void 0;
                        }
                        ma = ta = !1;
                    });
                }
            });
        },
        destroy: function (b, c) {
            void 0 == c && (c = this);
            return a(c).each(function () {
                var c = a(this),
                    d = c.data("iosslider");
                if (void 0 == d) return !1;
                void 0 == b && (b = !0);
                m.autoSlidePause(d.sliderNumber);
                oa[d.sliderNumber] = !0;
                a(window).unbind(".iosSliderEvent-" + d.sliderNumber);
                a(document).unbind(".iosSliderEvent-" + d.sliderNumber);
                a(document).unbind("keydown.iosSliderEvent");
                a(this).unbind(".iosSliderEvent");
                a(this).children(":first-child").unbind(".iosSliderEvent");
                a(this).children(":first-child").children().unbind(".iosSliderEvent");
                a(d.settings.scrollbarBlockNode).unbind(".iosSliderEvent");
                b &&
                    (a(this).attr("style", ""),
                    a(this).children(":first-child").attr("style", ""),
                    a(this).children(":first-child").children().attr("style", ""),
                    a(d.settings.navSlideSelector).attr("style", ""),
                    a(d.settings.navPrevSelector).attr("style", ""),
                    a(d.settings.navNextSelector).attr("style", ""),
                    a(d.settings.autoSlideToggleSelector).attr("style", ""),
                    a(d.settings.unselectableSelector).attr("style", ""));
                d.settings.scrollbar && a(".scrollbarBlock" + d.sliderNumber).remove();
                d = X[d.sliderNumber];
                for (var e = 0; e < d.length; e++) clearTimeout(d[e]);
                c.removeData("iosslider");
                c.removeData("args");
            });
        },
        update: function (b) {
            void 0 == b && (b = this);
            return a(b).each(function () {
                var b = a(this),
                    c = b.data("iosslider");
                if (void 0 == c) return !1;
                c.settings.startAtSlide = b.data("args").currentSlideNumber;
                da.destroy(!1, this);
                1 != c.numberOfSlides && c.settings.infiniteSlider && (c.settings.startAtSlide = (E[c.sliderNumber] + 1 + F[c.sliderNumber] + c.numberOfSlides) % c.numberOfSlides);
                da.init(c.settings, this);
                b = new m.args("update", c.settings, c.scrollerNode, a(c.scrollerNode).children(":eq(" + (c.settings.startAtSlide - 1) + ")"), c.settings.startAtSlide - 1, c.settings.startAtSlide - 1);
                a(c.stageNode).data("args", b);
                if ("" != c.settings.onSliderUpdate) c.settings.onSliderUpdate(b);
            });
        },
        addSlide: function (b, c) {
            return this.each(function () {
                var d = a(this),
                    e = d.data("iosslider");
                if (void 0 == e) return !1;
                0 == a(e.scrollerNode).children().length
                    ? (a(e.scrollerNode).append(b), (d.data("args").currentSlideNumber = 1))
                    : e.settings.infiniteSlider
                    ? (1 == c
                          ? a(e.scrollerNode).children(":eq(0)").before(b)
                          : a(e.scrollerNode)
                                .children(":eq(" + (c - 2) + ")")
                                .after(b),
                      -1 > F[e.sliderNumber] && E[e.sliderNumber]--,
                      d.data("args").currentSlideNumber >= c && E[e.sliderNumber]++)
                    : (c <= e.numberOfSlides
                          ? a(e.scrollerNode)
                                .children(":eq(" + (c - 1) + ")")
                                .before(b)
                          : a(e.scrollerNode)
                                .children(":eq(" + (c - 2) + ")")
                                .after(b),
                      d.data("args").currentSlideNumber >= c && d.data("args").currentSlideNumber++);
                d.data("iosslider").numberOfSlides++;
                da.update(this);
            });
        },
        removeSlide: function (b) {
            return this.each(function () {
                var c = a(this),
                    d = c.data("iosslider");
                if (void 0 == d) return !1;
                a(d.scrollerNode)
                    .children(":eq(" + (b - 1) + ")")
                    .remove();
                E[d.sliderNumber] > b - 1 && E[d.sliderNumber]--;
                c.data("iosslider").numberOfSlides--;
                da.update(this);
            });
        },
        goToSlide: function (b, c, d) {
            void 0 == d && (d = this);
            return a(d).each(function () {
                var d = a(this).data("iosslider");
                if (void 0 == d || d.shortContent) return !1;
                b = b > d.childrenOffsets.length ? d.childrenOffsets.length - 1 : b - 1;
                void 0 != c && (d.settings.autoSlideTransTimer = c);
                m.changeSlide(
                    b,
                    a(d.scrollerNode),
                    a(d.slideNodes),
                    X[d.sliderNumber],
                    d.scrollbarClass,
                    d.scrollbarWidth,
                    d.stageWidth,
                    d.scrollbarStageWidth,
                    d.scrollMargin,
                    d.scrollBorder,
                    d.originalOffsets,
                    d.childrenOffsets,
                    d.slideNodeOuterWidths,
                    d.sliderNumber,
                    d.infiniteSliderWidth,
                    d.numberOfSlides,
                    d.centeredSlideOffset,
                    d.settings
                );
            });
        },
        prevSlide: function (b) {
            return this.each(function () {
                var c = a(this).data("iosslider");
                if (void 0 == c || c.shortContent) return !1;
                var d = (E[c.sliderNumber] + F[c.sliderNumber] + c.numberOfSlides) % c.numberOfSlides;
                void 0 != b && (c.settings.autoSlideTransTimer = b);
                (0 < d || c.settings.infiniteSlider) &&
                    m.changeSlide(
                        d - 1,
                        a(c.scrollerNode),
                        a(c.slideNodes),
                        X[c.sliderNumber],
                        c.scrollbarClass,
                        c.scrollbarWidth,
                        c.stageWidth,
                        c.scrollbarStageWidth,
                        c.scrollMargin,
                        c.scrollBorder,
                        c.originalOffsets,
                        c.childrenOffsets,
                        c.slideNodeOuterWidths,
                        c.sliderNumber,
                        c.infiniteSliderWidth,
                        c.numberOfSlides,
                        c.centeredSlideOffset,
                        c.settings
                    );
                E[c.sliderNumber] = d;
            });
        },
        nextSlide: function (b) {
            return this.each(function () {
                var c = a(this).data("iosslider");
                if (void 0 == c || c.shortContent) return !1;
                var d = (E[c.sliderNumber] + F[c.sliderNumber] + c.numberOfSlides) % c.numberOfSlides;
                void 0 != b && (c.settings.autoSlideTransTimer = b);
                (d < c.childrenOffsets.length - 1 || c.settings.infiniteSlider) &&
                    m.changeSlide(
                        d + 1,
                        a(c.scrollerNode),
                        a(c.slideNodes),
                        X[c.sliderNumber],
                        c.scrollbarClass,
                        c.scrollbarWidth,
                        c.stageWidth,
                        c.scrollbarStageWidth,
                        c.scrollMargin,
                        c.scrollBorder,
                        c.originalOffsets,
                        c.childrenOffsets,
                        c.slideNodeOuterWidths,
                        c.sliderNumber,
                        c.infiniteSliderWidth,
                        c.numberOfSlides,
                        c.centeredSlideOffset,
                        c.settings
                    );
                E[c.sliderNumber] = d;
            });
        },
        prevPage: function (b, c) {
            void 0 == c && (c = this);
            return a(c).each(function () {
                var c = a(this).data("iosslider");
                if (void 0 == c) return !1;
                var d = m.getSliderOffset(c.scrollerNode, "x") + c.stageWidth;
                void 0 != b && (c.settings.autoSlideTransTimer = b);
                m.changeOffset(
                    d,
                    a(c.scrollerNode),
                    a(c.slideNodes),
                    X[c.sliderNumber],
                    c.scrollbarClass,
                    c.scrollbarWidth,
                    c.stageWidth,
                    c.scrollbarStageWidth,
                    c.scrollMargin,
                    c.scrollBorder,
                    c.originalOffsets,
                    c.childrenOffsets,
                    c.slideNodeOuterWidths,
                    c.sliderNumber,
                    c.infiniteSliderWidth,
                    c.numberOfSlides,
                    c.centeredSlideOffset,
                    c.settings
                );
            });
        },
        nextPage: function (b, c) {
            void 0 == c && (c = this);
            return a(c).each(function () {
                var c = a(this).data("iosslider");
                if (void 0 == c) return !1;
                var d = m.getSliderOffset(c.scrollerNode, "x") - c.stageWidth;
                void 0 != b && (c.settings.autoSlideTransTimer = b);
                m.changeOffset(
                    d,
                    a(c.scrollerNode),
                    a(c.slideNodes),
                    X[c.sliderNumber],
                    c.scrollbarClass,
                    c.scrollbarWidth,
                    c.stageWidth,
                    c.scrollbarStageWidth,
                    c.scrollMargin,
                    c.scrollBorder,
                    c.originalOffsets,
                    c.childrenOffsets,
                    c.slideNodeOuterWidths,
                    c.sliderNumber,
                    c.infiniteSliderWidth,
                    c.numberOfSlides,
                    c.centeredSlideOffset,
                    c.settings
                );
            });
        },
        lock: function () {
            return this.each(function () {
                var b = a(this).data("iosslider");
                if (void 0 == b || b.shortContent) return !1;
                a(b.scrollerNode).css({ cursor: "default" });
                ja[b.sliderNumber] = !0;
            });
        },
        unlock: function () {
            return this.each(function () {
                var b = a(this).data("iosslider");
                if (void 0 == b || b.shortContent) return !1;
                a(b.scrollerNode).css({ cursor: C });
                ja[b.sliderNumber] = !1;
            });
        },
        getData: function () {
            return this.each(function () {
                var b = a(this).data("iosslider");
                return void 0 == b || b.shortContent ? !1 : b;
            });
        },
        autoSlidePause: function () {
            return this.each(function () {
                var b = a(this).data("iosslider");
                if (void 0 == b || b.shortContent) return !1;
                U[b.sliderNumber].autoSlide = !1;
                m.autoSlidePause(b.sliderNumber);
                return b;
            });
        },
        autoSlidePlay: function () {
            return this.each(function () {
                var b = a(this).data("iosslider");
                if (void 0 == b || b.shortContent) return !1;
                U[b.sliderNumber].autoSlide = !0;
                m.autoSlide(
                    a(b.scrollerNode),
                    a(b.slideNodes),
                    X[b.sliderNumber],
                    b.scrollbarClass,
                    b.scrollbarWidth,
                    b.stageWidth,
                    b.scrollbarStageWidth,
                    b.scrollMargin,
                    b.scrollBorder,
                    b.originalOffsets,
                    b.childrenOffsets,
                    b.slideNodeOuterWidths,
                    b.sliderNumber,
                    b.infiniteSliderWidth,
                    b.numberOfSlides,
                    b.centeredSlideOffset,
                    b.settings
                );
                return b;
            });
        },
    };
    a.fn.iosSlider = function (b) {
        if (da[b]) return da[b].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" !== typeof b && b) a.error("invalid method call!");
        else return da.init.apply(this, arguments);
    };
})(jQuery);
(function (a) {
    var b,
        c,
        d,
        f,
        e,
        l,
        g,
        q = function () {},
        u = !!window.jQuery,
        z = a(window),
        w = function (a, c) {
            b.ev.on("mfp" + a + ".mfp", c);
        },
        C = function (b, c, d, e) {
            var h = document.createElement("div");
            return (h.className = "mfp-" + b), d && (h.innerHTML = d), e ? c && c.appendChild(h) : ((h = a(h)), c && h.appendTo(c)), h;
        },
        Q = function (c, d) {
            b.ev.triggerHandler("mfp" + c, d);
            b.st.callbacks && ((c = c.charAt(0).toLowerCase() + c.slice(1)), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
        },
        W = function (c) {
            return (c === g && b.currTemplate.closeBtn) || ((b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose))), (g = c)), b.currTemplate.closeBtn;
        },
        U = function () {
            a.magnificPopup.instance || ((b = new q()), b.init(), (a.magnificPopup.instance = b));
        },
        oa = function () {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
            return !1;
        };
    q.prototype = {
        constructor: q,
        init: function () {
            var c = navigator.appVersion;
            b.isIE7 = -1 !== c.indexOf("MSIE 7.");
            b.isIE8 = -1 !== c.indexOf("MSIE 8.");
            b.isLowIE = b.isIE7 || b.isIE8;
            b.isAndroid = /android/gi.test(c);
            b.isIOS = /iphone|ipad|ipod/gi.test(c);
            b.supportsTransition = oa();
            b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent);
            f = a(document);
            b.popupsCache = {};
        },
        open: function (c) {
            d || (d = a(document.body));
            var e;
            if (!1 === c.isObj) {
                b.items = c.items.toArray();
                b.index = 0;
                var h,
                    g = c.items;
                for (e = 0; g.length > e; e++)
                    if (((h = g[e]), h.parsed && (h = h.el[0]), h === c.el[0])) {
                        b.index = e;
                        break;
                    }
            } else (b.items = a.isArray(c.items) ? c.items : [c.items]), (b.index = c.index || 0);
            if (b.isOpen) return b.updateItemHTML(), void 0;
            b.types = [];
            l = "";
            b.ev = c.mainEl && c.mainEl.length ? c.mainEl.eq(0) : f;
            c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), (b.currTemplate = b.popupsCache[c.key])) : (b.currTemplate = {});
            b.st = a.extend(!0, {}, a.magnificPopup.defaults, c);
            b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos;
            b.st.modal && ((b.st.closeOnContentClick = !1), (b.st.closeOnBgClick = !1), (b.st.showCloseBtn = !1), (b.st.enableEscapeKey = !1));
            b.bgOverlay ||
                ((b.bgOverlay = C("bg").on("click.mfp", function () {
                    b.close();
                })),
                (b.wrap = C("wrap")
                    .attr("tabindex", -1)
                    .on("click.mfp", function (a) {
                        b._checkIfClose(a.target) && b.close();
                    })),
                (b.container = C("container", b.wrap)));
            b.contentContainer = C("content");
            b.st.preloader && (b.preloader = C("preloader", b.container, b.st.tLoading));
            h = a.magnificPopup.modules;
            for (e = 0; h.length > e; e++) (g = h[e]), (g = g.charAt(0).toUpperCase() + g.slice(1)), b["init" + g].call(b);
            Q("BeforeOpen");
            b.st.showCloseBtn &&
                (b.st.closeBtnInside
                    ? (w("MarkupParse", function (a, b, c, d) {
                          c.close_replaceWith = W(d.type);
                      }),
                      (l += " mfp-close-btn-in"))
                    : b.wrap.append(W()));
            b.st.alignTop && (l += " mfp-align-top");
            b.fixedContentPos ? b.wrap.css({ overflow: b.st.overflowY, overflowX: "hidden", overflowY: b.st.overflowY }) : b.wrap.css({ top: z.scrollTop(), position: "absolute" });
            (!1 === b.st.fixedBgPos || ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) && b.bgOverlay.css({ height: f.height(), position: "absolute" });
            b.st.enableEscapeKey &&
                f.on("keyup.mfp", function (a) {
                    27 === a.keyCode && b.close();
                });
            z.on("resize.mfp", function () {
                b.updateSize();
            });
            b.st.closeOnContentClick || (l += " mfp-auto-cursor");
            l && b.wrap.addClass(l);
            e = b.wH = z.height();
            h = {};
            b.fixedContentPos && b._hasScrollBar(e) && (g = b._getScrollbarSize()) && (h.marginRight = g);
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : (h.overflow = "hidden"));
            g = b.st.mainClass;
            return (
                b.isIE7 && (g += " mfp-ie7"),
                g && b._addClassToMFP(g),
                b.updateItemHTML(),
                Q("BuildControls"),
                a("html").css(h),
                b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || d),
                (b._lastFocusedEl = document.activeElement),
                setTimeout(function () {
                    b.content ? (b._addClassToMFP("mfp-ready"), b._setFocus()) : b.bgOverlay.addClass("mfp-ready");
                    f.on("focusin.mfp", b._onFocusIn);
                }, 16),
                (b.isOpen = !0),
                b.updateSize(e),
                Q("Open"),
                c
            );
        },
        close: function () {
            b.isOpen &&
                (Q("BeforeClose"),
                (b.isOpen = !1),
                b.st.removalDelay && !b.isLowIE && b.supportsTransition
                    ? (b._addClassToMFP("mfp-removing"),
                      setTimeout(function () {
                          b._close();
                      }, b.st.removalDelay))
                    : b._close());
        },
        _close: function () {
            Q("Close");
            var c = "mfp-removing mfp-ready ";
            if ((b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos))
                (c = { marginRight: "" }), b.isIE7 ? a("body, html").css("overflow", "") : (c.overflow = ""), a("html").css(c);
            f.off("keyup.mfp focusin.mfp");
            b.ev.off(".mfp");
            b.wrap.attr("class", "mfp-wrap").removeAttr("style");
            b.bgOverlay.attr("class", "mfp-bg");
            b.container.attr("class", "mfp-container");
            !b.st.showCloseBtn || (b.st.closeBtnInside && !0 !== b.currTemplate[b.currItem.type]) || (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach());
            b._lastFocusedEl && a(b._lastFocusedEl).focus();
            b.currItem = null;
            b.content = null;
            b.currTemplate = null;
            b.prevHeight = 0;
            Q("AfterClose");
        },
        updateSize: function (a) {
            b.isIOS ? ((a = (document.documentElement.clientWidth / window.innerWidth) * window.innerHeight), b.wrap.css("height", a), (b.wH = a)) : (b.wH = a || z.height());
            b.fixedContentPos || b.wrap.css("height", b.wH);
            Q("Resize");
        },
        updateItemHTML: function () {
            var c = b.items[b.index];
            b.contentContainer.detach();
            b.content && b.content.detach();
            c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if ((Q("BeforeChange", [b.currItem ? b.currItem.type : "", d]), (b.currItem = c), !b.currTemplate[d])) {
                var f = b.st[d] ? b.st[d].markup : !1;
                Q("FirstMarkupParse", f);
                b.currTemplate[d] = f ? a(f) : !0;
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            f = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(f, d);
            c.preloaded = !0;
            Q("Change", c);
            e = c.type;
            b.container.prepend(b.contentContainer);
            Q("AfterChange");
        },
        appendContent: function (a, c) {
            (b.content = a) ? (b.st.showCloseBtn && b.st.closeBtnInside && !0 === b.currTemplate[c] ? b.content.find(".mfp-close").length || b.content.append(W()) : (b.content = a)) : (b.content = "");
            Q("BeforeAppend");
            b.container.addClass("mfp-" + c + "-holder");
            b.contentContainer.append(b.content);
        },
        parseEl: function (c) {
            var d,
                e = b.items[c];
            if ((e.tagName ? (e = { el: a(e) }) : ((d = e.type), (e = { data: e, src: e.src })), e.el)) {
                for (var f = b.types, h = 0; f.length > h; h++)
                    if (e.el.hasClass("mfp-" + f[h])) {
                        d = f[h];
                        break;
                    }
                e.src = e.el.attr("data-mfp-src");
                e.src || (e.src = e.el.attr("href"));
            }
            return (e.type = d || b.st.type || "inline"), (e.index = c), (e.parsed = !0), (b.items[c] = e), Q("ElementParse", e), b.items[c];
        },
        addGroup: function (a, c) {
            var d = function (d) {
                d.mfpEl = this;
                b._openClick(d, a, c);
            };
            c || (c = {});
            c.mainEl = a;
            c.items
                ? ((c.isObj = !0), a.off("click.magnificPopup").on("click.magnificPopup", d))
                : ((c.isObj = !1), c.delegate ? a.off("click.magnificPopup").on("click.magnificPopup", c.delegate, d) : ((c.items = a), a.off("click.magnificPopup").on("click.magnificPopup", d)));
        },
        _openClick: function (c, d, e) {
            if ((void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick) || (2 !== c.which && !c.ctrlKey && !c.metaKey)) {
                var f = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (f)
                    if (a.isFunction(f)) {
                        if (!f.call(b)) return !0;
                    } else if (f > z.width()) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation());
                e.el = a(c.mfpEl);
                e.delegate && (e.items = d.find(e.delegate));
                b.open(e);
            }
        },
        updateStatus: function (a, d) {
            b.preloader &&
                (c !== a && b.container.removeClass("mfp-s-" + c),
                d || "loading" !== a || (d = b.st.tLoading),
                (d = { status: a, text: d }),
                Q("UpdateStatus", d),
                (a = d.status),
                (d = d.text),
                b.preloader.html(d),
                b.preloader.find("a").on("click", function (a) {
                    a.stopImmediatePropagation();
                }),
                b.container.addClass("mfp-s-" + a),
                (c = a));
        },
        _checkIfClose: function (c) {
            if (!a(c).hasClass("mfp-prevent-close")) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if ((d && e) || !b.content || a(c).hasClass("mfp-close") || (b.preloader && c === b.preloader[0])) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0;
                } else if (e && a.contains(document, c)) return !0;
                return !1;
            }
        },
        _addClassToMFP: function (a) {
            b.bgOverlay.addClass(a);
            b.wrap.addClass(a);
        },
        _removeClassFromMFP: function (a) {
            this.bgOverlay.removeClass(a);
            b.wrap.removeClass(a);
        },
        _hasScrollBar: function (a) {
            return (b.isIE7 ? f.height() : document.body.scrollHeight) > (a || z.height());
        },
        _setFocus: function () {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
        },
        _onFocusIn: function (c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1);
        },
        _parseMarkup: function (b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c));
            Q("MarkupParse", [b, c, d]);
            a.each(c, function (a, c) {
                if (void 0 === c || !1 === c) return !0;
                if (((e = a.split("_")), 1 < e.length)) {
                    if (((a = b.find(".mfp-" + e[0])), 0 < a.length)) {
                        var d = e[1];
                        "replaceWith" === d ? a[0] !== c[0] && a.replaceWith(c) : "img" === d ? (a.is("img") ? a.attr("src", c) : a.replaceWith('<img src="' + c + '" class="' + a.attr("class") + '" />')) : a.attr(e[1], c);
                    }
                } else b.find(".mfp-" + a).html(c);
            });
        },
        _getScrollbarSize: function () {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.id = "mfp-sbm";
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
                document.body.appendChild(a);
                b.scrollbarSize = a.offsetWidth - a.clientWidth;
                document.body.removeChild(a);
            }
            return b.scrollbarSize;
        },
    };
    a.magnificPopup = {
        instance: null,
        proto: q.prototype,
        modules: [],
        open: function (b, c) {
            return U(), (b = b ? a.extend(!0, {}, b) : {}), (b.isObj = !0), (b.index = c || 0), this.instance.open(b);
        },
        close: function () {
            return a.magnificPopup.instance && a.magnificPopup.instance.close();
        },
        registerModule: function (b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options);
            a.extend(this.proto, c.proto);
            this.modules.push(b);
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
        },
    };
    a.fn.magnificPopup = function (c) {
        U();
        var d = a(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var e,
                    f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? (e = f.items[g]) : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g)));
                b._openClick({ mfpEl: e }, d, f);
            } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else (c = a.extend(!0, {}, c)), u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c), b.addGroup(d, c);
        return d;
    };
    var X,
        E,
        ba,
        F = function () {
            ba && (E.after(ba.addClass(X)).detach(), (ba = null));
        };
    a.magnificPopup.registerModule("inline", {
        options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
        proto: {
            initInline: function () {
                b.types.push("inline");
                w("Close.inline", function () {
                    F();
                });
            },
            getInline: function (c, d) {
                if ((F(), c.src)) {
                    d = b.st.inline;
                    var e = a(c.src);
                    if (e.length) {
                        var f = e[0].parentNode;
                        f && f.tagName && (E || ((X = d.hiddenClass), (E = C(X)), (X = "mfp-" + X)), (ba = e.after(E).detach().removeClass(X)));
                        b.updateStatus("ready");
                    } else b.updateStatus("error", d.tNotFound), (e = a("<div>"));
                    return (c.inlineElement = e), e;
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
            },
        },
    });
    var r,
        y = function () {
            r && d.removeClass(r);
            b.req && b.req.abort();
        };
    a.magnificPopup.registerModule("ajax", {
        options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
        proto: {
            initAjax: function () {
                b.types.push("ajax");
                r = b.st.ajax.cursor;
                w("Close.ajax", y);
                w("BeforeChange.ajax", y);
            },
            getAjax: function (c) {
                r && d.addClass(r);
                b.updateStatus("loading");
                var e = a.extend(
                    {
                        url: c.src,
                        success: function (e, f, g) {
                            e = { data: e, xhr: g };
                            Q("ParseAjax", e);
                            b.appendContent(a(e.data), "ajax");
                            c.finished = !0;
                            r && d.removeClass(r);
                            b._setFocus();
                            setTimeout(function () {
                                b.wrap.addClass("mfp-ready");
                            }, 16);
                            b.updateStatus("ready");
                            Q("AjaxContentAdded");
                        },
                        error: function () {
                            r && d.removeClass(r);
                            c.finished = c.loadError = !0;
                            b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src));
                        },
                    },
                    b.st.ajax.settings
                );
                return (b.req = a.ajax(e)), "";
            },
        },
    });
    var ca,
        ja = function (c) {
            if (c.data && void 0 !== c.data.title) return c.data.title;
            var d = b.st.image.titleSrc;
            if (d) {
                if (a.isFunction(d)) return d.call(b, c);
                if (c.el) return c.el.attr(d) || "";
            }
            return "";
        };
    a.magnificPopup.registerModule("image", {
        options: {
            markup:
                '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.',
        },
        proto: {
            initImage: function () {
                var a = b.st.image;
                b.types.push("image");
                w("Open.image", function () {
                    "image" === b.currItem.type && a.cursor && d.addClass(a.cursor);
                });
                w("Close.image", function () {
                    a.cursor && d.removeClass(a.cursor);
                    z.off("resize.mfp");
                });
                w("Resize.image", b.resizeImage);
                b.isLowIE && w("AfterChange", b.resizeImage);
            },
            resizeImage: function () {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10));
                    a.img.css("max-height", b.wH - c);
                }
            },
            _onImageHasSize: function (a) {
                a.img && ((a.hasSize = !0), ca && clearInterval(ca), (a.isCheckingImgSize = !1), Q("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), (a.imgHidden = !1)));
            },
            findImageSize: function (a) {
                var c = 0,
                    d = a.img[0],
                    e = function (f) {
                        ca && clearInterval(ca);
                        ca = setInterval(function () {
                            return 0 < d.naturalWidth ? (b._onImageHasSize(a), void 0) : (200 < c && clearInterval(ca), c++, 3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500), void 0);
                        }, f);
                    };
                e(1);
            },
            getImage: function (c, d) {
                var e = 0,
                    f = function () {
                        c &&
                            (c.img[0].complete
                                ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), (c.hasSize = !0), (c.loaded = !0), Q("ImageLoadComplete"))
                                : (e++, 200 > e ? setTimeout(f, 100) : g()));
                    },
                    g = function () {
                        c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), (c.hasSize = !0), (c.loaded = !0), (c.loadError = !0));
                    },
                    h = b.st.image,
                    l = d.find(".mfp-img");
                if (l.length) {
                    var m = document.createElement("img");
                    m.className = "mfp-img";
                    c.img = a(m).on("load.mfploader", f).on("error.mfploader", g);
                    m.src = c.src;
                    l.is("img") && (c.img = c.img.clone());
                    m = c.img[0];
                    0 < m.naturalWidth ? (c.hasSize = !0) : m.width || (c.hasSize = !1);
                }
                return (
                    b._parseMarkup(d, { title: ja(c), img_replaceWith: c.img }, c),
                    b.resizeImage(),
                    c.hasSize
                        ? (ca && clearInterval(ca), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d)
                        : (b.updateStatus("loading"), (c.loading = !0), c.hasSize || ((c.imgHidden = !0), d.addClass("mfp-loading"), b.findImageSize(c)), d)
                );
            },
        },
    });
    var m;
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (a) {
                return a.is("img") ? a : a.find("img");
            },
        },
        proto: {
            initZoom: function () {
                var a,
                    c = b.st.zoom;
                if (c.enabled && b.supportsTransition) {
                    var d,
                        e,
                        f = c.duration,
                        g = function (a) {
                            a = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image");
                            var b = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" };
                            return (b["-webkit-transition"] = b["-moz-transition"] = b["-o-transition"] = b.transition = "all " + c.duration / 1e3 + "s " + c.easing), a.css(b), a;
                        },
                        l = function () {
                            b.content.css("visibility", "visible");
                        };
                    w("BuildControls.zoom", function () {
                        if (b._allowZoom()) {
                            if ((clearTimeout(d), b.content.css("visibility", "hidden"), (a = b._getItemToZoom()), !a)) return l(), void 0;
                            e = g(a);
                            e.css(b._getOffset());
                            b.wrap.append(e);
                            d = setTimeout(function () {
                                e.css(b._getOffset(!0));
                                d = setTimeout(function () {
                                    l();
                                    setTimeout(function () {
                                        e.remove();
                                        a = e = null;
                                        Q("ZoomAnimationEnded");
                                    }, 16);
                                }, f);
                            }, 16);
                        }
                    });
                    w("BeforeClose.zoom", function () {
                        if (b._allowZoom()) {
                            if ((clearTimeout(d), (b.st.removalDelay = f), !a)) {
                                if (((a = b._getItemToZoom()), !a)) return;
                                e = g(a);
                            }
                            e.css(b._getOffset(!0));
                            b.wrap.append(e);
                            b.content.css("visibility", "hidden");
                            setTimeout(function () {
                                e.css(b._getOffset());
                            }, 16);
                        }
                    });
                    w("Close.zoom", function () {
                        b._allowZoom() && (l(), e && e.remove(), (a = null));
                    });
                }
            },
            _allowZoom: function () {
                return "image" === b.currItem.type;
            },
            _getItemToZoom: function () {
                return b.currItem.hasSize ? b.currItem.img : !1;
            },
            _getOffset: function (c) {
                var d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                c = d.offset();
                var e = parseInt(d.css("padding-top"), 10),
                    f = parseInt(d.css("padding-bottom"), 10);
                c.top -= a(window).scrollTop() - e;
                d = { width: d.width(), height: (u ? d.innerHeight() : d[0].offsetHeight) - f - e };
                return (void 0 === m && (m = void 0 !== document.createElement("p").style.MozTransform), m) ? (d["-moz-transform"] = d.transform = "translate(" + c.left + "px," + c.top + "px)") : ((d.left = c.left), (d.top = c.top)), d;
            },
        },
    });
    var da = function (a) {
        if (b.currTemplate.iframe) {
            var c = b.currTemplate.iframe.find("iframe");
            c.length && (a || (c[0].src = "//about:blank"), b.isIE8 && c.css("display", a ? "block" : "none"));
        }
    };
    a.magnificPopup.registerModule("iframe", {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" },
                vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
            },
        },
        proto: {
            initIframe: function () {
                b.types.push("iframe");
                w("BeforeChange", function (a, b, c) {
                    b !== c && ("iframe" === b ? da() : "iframe" === c && da(!0));
                });
                w("Close.iframe", function () {
                    da();
                });
            },
            getIframe: function (c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function () {
                    return -1 < e.indexOf(this.index) ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), (e = this.src.replace("%id%", e)), !1) : void 0;
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d;
            },
        },
    });
    var J = function (a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : 0 > a ? c + a : a;
        },
        A = function (a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%",
        },
        proto: {
            initGallery: function () {
                var c = b.st.gallery,
                    d = !!a.fn.mfpFastClick;
                return (
                    (b.direction = !0),
                    c && c.enabled
                        ? ((l += " mfp-gallery"),
                          w("Open.mfp-gallery", function () {
                              c.navigateByImgClick &&
                                  b.wrap.on("click.mfp-gallery", ".mfp-img", function () {
                                      return 1 < b.items.length ? (b.next(), !1) : void 0;
                                  });
                              f.on("keydown.mfp-gallery", function (a) {
                                  37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                              });
                          }),
                          w("UpdateStatus.mfp-gallery", function (a, c) {
                              c.text && (c.text = A(c.text, b.currItem.index, b.items.length));
                          }),
                          w("MarkupParse.mfp-gallery", function (a, d, e, f) {
                              a = b.items.length;
                              e.counter = 1 < a ? A(c.tCounter, f.index, a) : "";
                          }),
                          w("BuildControls.mfp-gallery", function () {
                              if (1 < b.items.length && c.arrows && !b.arrowLeft) {
                                  var e = c.arrowMarkup,
                                      f = (b.arrowLeft = a(e.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass("mfp-prevent-close"));
                                  e = b.arrowRight = a(e.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass("mfp-prevent-close");
                                  var g = d ? "mfpFastClick" : "click";
                                  f[g](function () {
                                      b.prev();
                                  });
                                  e[g](function () {
                                      b.next();
                                  });
                                  b.isIE7 && (C("b", f[0], !1, !0), C("a", f[0], !1, !0), C("b", e[0], !1, !0), C("a", e[0], !1, !0));
                                  b.container.append(f.add(e));
                              }
                          }),
                          w("Change.mfp-gallery", function () {
                              b._preloadTimeout && clearTimeout(b._preloadTimeout);
                              b._preloadTimeout = setTimeout(function () {
                                  b.preloadNearbyImages();
                                  b._preloadTimeout = null;
                              }, 16);
                          }),
                          w("Close.mfp-gallery", function () {
                              f.off(".mfp-gallery");
                              b.wrap.off("click.mfp-gallery");
                              b.arrowLeft && d && b.arrowLeft.add(b.arrowRight).destroyMfpFastClick();
                              b.arrowRight = b.arrowLeft = null;
                          }),
                          void 0)
                        : !1
                );
            },
            next: function () {
                b.direction = !0;
                b.index = J(b.index + 1);
                b.updateItemHTML();
            },
            prev: function () {
                b.direction = !1;
                b.index = J(b.index - 1);
                b.updateItemHTML();
            },
            goTo: function (a) {
                b.direction = a >= b.index;
                b.index = a;
                b.updateItemHTML();
            },
            preloadNearbyImages: function () {
                var a = b.st.gallery.preload;
                var c = Math.min(a[0], b.items.length),
                    d = Math.min(a[1], b.items.length);
                for (a = 1; (b.direction ? d : c) >= a; a++) b._preloadItem(b.index + a);
                for (a = 1; (b.direction ? c : d) >= a; a++) b._preloadItem(b.index - a);
            },
            _preloadItem: function (c) {
                if (((c = J(c)), !b.items[c].preloaded)) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c));
                    Q("LazyLoad", d);
                    "image" === d.type &&
                        (d.img = a('<img class="mfp-img" />')
                            .on("load.mfploader", function () {
                                d.hasSize = !0;
                            })
                            .on("error.mfploader", function () {
                                d.hasSize = !0;
                                d.loadError = !0;
                                Q("LazyLoadError", d);
                            })
                            .attr("src", d.src));
                    d.preloaded = !0;
                }
            },
        },
    });
    a.magnificPopup.registerModule("retina", {
        options: {
            replaceSrc: function (a) {
                return a.src.replace(/\.\w+$/, function (a) {
                    return "@2x" + a;
                });
            },
            ratio: 1,
        },
        proto: {
            initRetina: function () {
                if (1 < window.devicePixelRatio) {
                    var a = b.st.retina,
                        c = a.ratio;
                    c = isNaN(c) ? c() : c;
                    1 < c &&
                        (w("ImageHasSize.retina", function (a, b) {
                            b.img.css({ "max-width": b.img[0].naturalWidth / c, width: "100%" });
                        }),
                        w("ElementParse.retina", function (b, d) {
                            d.src = a.replaceSrc(d, c);
                        }));
                }
            },
        },
    });
    (function () {
        var b = "ontouchstart" in window,
            c = function () {
                z.off("touchmove" + d + " touchend" + d);
            },
            d = ".mfpFastClick";
        a.fn.mfpFastClick = function (e) {
            return a(this).each(function () {
                var f,
                    g = a(this);
                if (b) {
                    var l, h, k, m, q, u;
                    g.on("touchstart" + d, function (a) {
                        m = !1;
                        u = 1;
                        q = a.originalEvent ? a.originalEvent.touches[0] : a.touches[0];
                        h = q.clientX;
                        k = q.clientY;
                        z.on("touchmove" + d, function (a) {
                            q = a.originalEvent ? a.originalEvent.touches : a.touches;
                            u = q.length;
                            q = q[0];
                            (10 < Math.abs(q.clientX - h) || 10 < Math.abs(q.clientY - k)) && ((m = !0), c());
                        }).on("touchend" + d, function (a) {
                            c();
                            m ||
                                1 < u ||
                                ((f = !0),
                                a.preventDefault(),
                                clearTimeout(l),
                                (l = setTimeout(function () {
                                    f = !1;
                                }, 1e3)),
                                e());
                        });
                    });
                }
                g.on("click" + d, function () {
                    f || e();
                });
            });
        };
        a.fn.destroyMfpFastClick = function () {
            a(this).off("touchstart" + d + " click" + d);
            b && z.off("touchmove" + d + " touchend" + d);
        };
    })();
    U();
})(window.jQuery || window.Zepto);
(function (a, b, c) {
    function d(a) {
        var b = {},
            d = /^jQuery\d+$/;
        c.each(a.attributes, function (a, c) {
            c.specified && !d.test(c.name) && (b[c.name] = c.value);
        });
        return b;
    }
    function f(a, b) {
        var d = c(this);
        if (this.value == d.attr("placeholder") && d.hasClass("placeholder"))
            if (d.data("placeholder-password")) {
                d = d.hide().next().show().attr("id", d.removeAttr("id").data("placeholder-id"));
                if (!0 === a) return (d[0].value = b);
                d.focus();
            } else (this.value = ""), d.removeClass("placeholder"), this == l() && this.select();
    }
    function e() {
        var a = c(this),
            b = this.id;
        if ("" == this.value) {
            if ("password" == this.type) {
                if (!a.data("placeholder-textinput")) {
                    try {
                        var e = a.clone().attr({ type: "text" });
                    } catch (U) {
                        e = c("<input>").attr(c.extend(d(this), { type: "text" }));
                    }
                    e.removeAttr("name").data({ "placeholder-password": a, "placeholder-id": b }).bind("focus.placeholder", f);
                    a.data({ "placeholder-textinput": e, "placeholder-id": b }).before(e);
                }
                a = a.removeAttr("id").hide().prev().attr("id", b).show();
            }
            a.addClass("placeholder");
            a[0].value = a.attr("placeholder");
        } else a.removeClass("placeholder");
    }
    function l() {
        try {
            return b.activeElement;
        } catch (C) {}
    }
    var g = "placeholder" in b.createElement("input"),
        q = "placeholder" in b.createElement("textarea"),
        u = c.fn,
        z = c.valHooks,
        w = c.propHooks;
    g && q
        ? ((u = u.placeholder = function () {
              return this;
          }),
          (u.input = u.textarea = !0))
        : ((u = u.placeholder = function () {
              this.filter((g ? "textarea" : ":input") + "[placeholder]")
                  .not(".placeholder")
                  .bind({ "focus.placeholder": f, "blur.placeholder": e })
                  .data("placeholder-enabled", !0)
                  .trigger("blur.placeholder");
              return this;
          }),
          (u.input = g),
          (u.textarea = q),
          (u = {
              get: function (a) {
                  var b = c(a),
                      d = b.data("placeholder-password");
                  return d ? d[0].value : b.data("placeholder-enabled") && b.hasClass("placeholder") ? "" : a.value;
              },
              set: function (a, b) {
                  var d = c(a),
                      g = d.data("placeholder-password");
                  if (g) return (g[0].value = b);
                  if (!d.data("placeholder-enabled")) return (a.value = b);
                  "" == b ? ((a.value = b), a != l() && e.call(a)) : d.hasClass("placeholder") ? f.call(a, !0, b) || (a.value = b) : (a.value = b);
                  return d;
              },
          }),
          g || ((z.input = u), (w.value = u)),
          q || ((z.textarea = u), (w.value = u)),
          c(function () {
              c(b).delegate("form", "submit.placeholder", function () {
                  var a = c(".placeholder", this).each(f);
                  setTimeout(function () {
                      a.each(e);
                  }, 10);
              });
          }),
          c(a).bind("beforeunload.placeholder", function () {
              c(".placeholder").each(function () {
                  this.value = "";
              });
          }));
})(this, document, jQuery);
(function () {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c)
        (window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"]), (window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame ||
        (window.requestAnimationFrame = function (b, c) {
            var d = new Date().getTime(),
                f = Math.max(0, 16 - (d - a));
            c = window.setTimeout(function () {
                b(d + f);
            }, f);
            a = d + f;
            return c;
        });
    window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function (a) {
            clearTimeout(a);
        });
})();
var tdDetect = {};
(function () {
    tdDetect = {
        isIe8: !1,
        isIe9: !1,
        isIe10: !1,
        isIe11: !1,
        isIe: !1,
        isSafari: !1,
        isChrome: !1,
        isIpad: !1,
        isTouchDevice: !1,
        hasHistory: !1,
        isPhoneScreen: !1,
        isIos: !1,
        isAndroid: !1,
        isOsx: !1,
        isFirefox: !1,
        isWinOs: !1,
        isMobileDevice: !1,
        htmlJqueryObj: null,
        runIsPhoneScreen: function () {
            (768 > jQuery(window).width() || 768 > jQuery(window).height()) && !1 === tdDetect.isIpad ? (tdDetect.isPhoneScreen = !0) : (tdDetect.isPhoneScreen = !1);
        },
        set: function (a, b) {
            tdDetect[a] = b;
        },
    };
    tdDetect.htmlJqueryObj = jQuery("html");
    -1 !== navigator.appVersion.indexOf("Win") && tdDetect.set("isWinOs", !0);
    "ontouchstart" in window && !tdDetect.isWinOs && tdDetect.set("isTouchDevice", !0);
    tdDetect.htmlJqueryObj.is(".ie8") && (tdDetect.set("isIe8", !0), tdDetect.set("isIe", !0));
    tdDetect.htmlJqueryObj.is(".ie9") && (tdDetect.set("isIe9", !0), tdDetect.set("isIe", !0));
    -1 < navigator.userAgent.indexOf("MSIE 10.0") && (tdDetect.set("isIe10", !0), tdDetect.set("isIe", !0));
    navigator.userAgent.match(/Trident.*rv:11\./) && tdDetect.set("isIe11", !0);
    window.history && window.history.pushState && tdDetect.set("hasHistory", !0);
    -1 !== navigator.userAgent.indexOf("Safari") && -1 === navigator.userAgent.indexOf("Chrome") && tdDetect.set("isSafari", !0);
    /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) && tdDetect.set("isChrome", !0);
    null !== navigator.userAgent.match(/iPad/i) && tdDetect.set("isIpad", !0);
    /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && tdDetect.set("isIos", !0);
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && tdDetect.set("isMobileDevice", !0);
    tdDetect.runIsPhoneScreen();
    -1 < navigator.userAgent.toLowerCase().indexOf("android") && tdDetect.set("isAndroid", !0);
    -1 !== navigator.userAgent.indexOf("Mac OS X") && tdDetect.set("isOsx", !0);
    -1 !== navigator.userAgent.indexOf("Firefox") && tdDetect.set("isFirefox", !0);
})();
var tdViewport = {};
(function () {
    tdViewport = {
        INTERVAL_INITIAL_INDEX: -1,
        _currentIntervalIndex: tdViewport.INTERVAL_INITIAL_INDEX,
        _intervalList: [],
        init: function () {
            if ("undefined" !== typeof window.td_viewport_interval_list && Array === window.td_viewport_interval_list.constructor) {
                for (var a = 0; a < window.td_viewport_interval_list.length; a++) {
                    var b = new tdViewport.item(),
                        c = window.td_viewport_interval_list[a];
                    if (!c.hasOwnProperty("limitBottom") || !c.hasOwnProperty("sidebarWidth")) break;
                    b.limitBottom = c.limitBottom;
                    b.sidebarWidth = c.sidebarWidth;
                    tdViewport._items.push(b);
                }
                tdViewport.detectChanges();
            }
        },
        getCurrentIntervalIndex: function () {
            return tdViewport._currentIntervalIndex;
        },
        setIntervalList: function (a) {
            tdViewport._intervalList = a;
        },
        getIntervalList: function () {
            return tdViewport._intervalList;
        },
        getCurrentIntervalItem: function () {
            return tdViewport.INTERVAL_INITIAL_INDEX === tdViewport._currentIntervalIndex || 0 === tdViewport._currentIntervalIndex ? null : tdViewport._items[tdViewport._currentIntervalIndex - 1];
        },
        _items: [],
        item: function () {
            this.sidebarWidth = this.limitBottom = void 0;
        },
        detectChanges: function () {
            var a = !1,
                b = 0;
            var c = !0 === tdDetect.isSafari ? this._safariWiewPortWidth.getRealWidth() : Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            for (var d = 0; d < tdViewport._items.length; d++) {
                if (c <= tdViewport._items[d].limitBottom) {
                    b !== tdViewport._currentIntervalIndex && ((tdViewport._currentIntervalIndex = b), (a = !0), tdViewport.log("changing viewport " + tdViewport._currentIntervalIndex + " ~ " + c));
                    break;
                }
                b++;
            }
            !1 === a && b !== tdViewport._currentIntervalIndex && ((tdViewport._currentIntervalIndex = b), (a = !0), tdViewport.log("changing viewport " + tdViewport._currentIntervalIndex + " ~ " + c));
            return a;
        },
        _safariWiewPortWidth: {
            divAdded: !1,
            divJqueryObject: "",
            getRealWidth: function () {
                !1 === this.divAdded &&
                    ((this.divJqueryObject = jQuery("<div>").css({ height: "1px", position: "absolute", top: "-1px", left: "0", right: "0", visibility: "hidden", "z-index": "-1" })),
                    this.divJqueryObject.appendTo("body"),
                    (this.divAdded = !0));
                return this.divJqueryObject.width();
            },
        },
        log: function (a) {},
    };
    tdViewport.init();
})();
var tdMenu = {};
(function () {
    tdMenu = {
        _itemsWithSubmenu: null,
        _mainMenu: null,
        _outsideClickArea: null,
        _outsideClickExcludedAreas: "#td-header-menu .sf-menu, #td-header-menu .sf-menu *, .menu-top-container, .menu-top-container *",
        _openMenuClass: "sfHover",
        _openMenuBodyClass: "td-open-menu",
        init: function () {
            var a = jQuery("#td-header-menu .sf-menu"),
                b = jQuery("#td-header-menu .sf-menu, .top-header-menu"),
                c = b.find(".menu-item-has-children > a, .td-mega-menu > a");
            c.append('<i class="td-icon-menu-down"></i>');
            a.supersubs({ minWidth: 10, maxWidth: 20, extraWidth: 1 });
            c.addClass("sf-with-ul");
            b.addClass("sf-js-enabled");
            c.parent().find("ul").first().css("display", "none");
            tdMenu._mainMenu = a;
            tdMenu._itemsWithSubmenu = c;
            tdMenu._outsideClickArea = jQuery(window).not(tdMenu._outsideClickExcludedAreas);
            tdMenu._setHover(c, a);
        },
        _getSubmenuPosition: function (a) {
            var b = jQuery(window).width();
            a = a.children("ul").first();
            if (0 < a.length) {
                var c = a.offset().left + a.width();
                c > b && (a.parent().parent().hasClass("sf-menu") ? a.css("left", "-" + (c - b) + "px") : a.addClass("reversed").css("left", "-" + (a.width() + 0) + "px"));
            }
        },
        _getMouseAngleDirection: function (a, b, c, d) {
            return (Math.atan2(c - a, d - b) / Math.PI) * 180;
        },
        _setHover: function (a, b) {
            if (tdDetect.isTouchDevice)
                jQuery(document).on("touchstart", "body", function (b) {
                    var c = a.parent(),
                        d = jQuery("body");
                    d.hasClass(tdMenu._openMenuBodyClass) && !c.is(b.target) && 0 === c.has(b.target).length && (c.removeClass(tdMenu._openMenuClass), c.children("ul").hide(), d.removeClass(tdMenu._openMenuBodyClass));
                }),
                    a.on("touchstart", function (b) {
                        b.preventDefault();
                        b.stopPropagation();
                        var c = jQuery(this);
                        b = c.parent();
                        var d = jQuery("body");
                        b.hasClass(tdMenu._openMenuClass)
                            ? null !== c.attr("href") && "#" !== c.attr("href")
                                ? (window.location.href = c.attr("href"))
                                : ((b.parent().hasClass("sf-menu") || b.parent().hasClass("top-header-menu")) && d.removeClass(tdMenu._openMenuBodyClass),
                                  b.removeClass(tdMenu._openMenuClass),
                                  b.find("ul").hide(),
                                  b.find("li").removeClass(tdMenu._openMenuClass))
                            : (b.parent().hasClass("sf-menu") || b.parent().hasClass("top-header-menu")
                                  ? (a.parent().removeClass(tdMenu._openMenuClass), a.parent().children("ul").hide())
                                  : ((c = b.siblings()), c.removeClass(tdMenu._openMenuClass), c.find("ul").hide(), c.find("li").removeClass(tdMenu._openMenuClass)),
                              b.addClass(tdMenu._openMenuClass),
                              b.children("ul").show(),
                              tdMenu._getSubmenuPosition(b),
                              d.addClass(tdMenu._openMenuBodyClass));
                    });
            else {
                var c = {},
                    d,
                    f = !0;
                b.on("mouseleave", function () {
                    a.parent().removeClass(tdMenu._openMenuClass);
                    a.parent().children("ul").hide();
                    c = {};
                });
                b.find(".menu-item").hover(
                    function () {
                        var b = jQuery(this),
                            l = "",
                            g,
                            q;
                        if (b.hasClass("menu-item-has-children") || b.hasClass("td-mega-menu"))
                            if (b.parent().hasClass("sf-menu"))
                                if (jQuery.isEmptyObject(c)) b.addClass(tdMenu._openMenuClass), b.children("ul").show(), (c = b);
                                else {
                                    if (b[0] !== c[0]) {
                                        var u = (q = g = 0);
                                        var z = null;
                                        !0 === f &&
                                            ((f = !1),
                                            (d = setTimeout(function () {
                                                a.parent().removeClass(tdMenu._openMenuClass);
                                                a.parent().children("ul").hide();
                                                b.addClass(tdMenu._openMenuClass);
                                                b.children("ul").show();
                                                c = b;
                                            }, 400)));
                                        b.on("mousemove", function (e) {
                                            5 <= g ? ((g = 0), (z = tdMenu._getMouseAngleDirection(q, u, e.pageX, e.pageY)), (q = e.pageX), (u = e.pageY)) : (g++, 0 === q && 0 === u && ((q = e.pageX), (u = e.pageY)));
                                            null !== z &&
                                                (85 < z || -85 > z) &&
                                                (a.parent().removeClass(tdMenu._openMenuClass),
                                                a.parent().children("ul").hide(),
                                                b.addClass(tdMenu._openMenuClass),
                                                b.children("ul").show(),
                                                b.off("mousemove"),
                                                clearTimeout(d),
                                                (f = !0),
                                                (c = b));
                                        });
                                    }
                                }
                            else
                                (l = b.siblings()),
                                    l.removeClass(tdMenu._openMenuClass),
                                    l.find("ul").hide(),
                                    l.find("li").removeClass(tdMenu._openMenuClass),
                                    b.addClass(tdMenu._openMenuClass),
                                    b.children("ul").show(),
                                    tdMenu._getSubmenuPosition(b);
                        else
                            b.parent().hasClass("sf-menu") || b.parent().hasClass("top-header-menu")
                                ? jQuery.isEmptyObject(c) ||
                                  ((u = q = g = 0),
                                  (z = null),
                                  !0 === f &&
                                      ((f = !1),
                                      (d = setTimeout(function () {
                                          a.parent().removeClass(tdMenu._openMenuClass);
                                          a.parent().children("ul").hide();
                                          c = {};
                                      }, 400))),
                                  b.on("mousemove", function (e) {
                                      5 <= g ? ((g = 0), (z = tdMenu._getMouseAngleDirection(q, u, e.pageX, e.pageY)), (q = e.pageX), (u = e.pageY)) : (g++, 0 === q && 0 === u && ((q = e.pageX), (u = e.pageY)));
                                      null !== z && (85 < z || -85 > z) && (a.parent().removeClass(tdMenu._openMenuClass), a.parent().children("ul").hide(), b.off("mousemove"), clearTimeout(d), (f = !0), (c = {}));
                                  }))
                                : ((c = b.parent()), (l = b.siblings()), l.removeClass(tdMenu._openMenuClass), l.find("ul").hide(), l.find("li").removeClass(tdMenu._openMenuClass));
                    },
                    function () {
                        var a = jQuery(this);
                        !1 === f && (clearTimeout(d), (f = !0));
                        a.off("mousemove");
                    }
                );
            }
        },
        unsetHover: function () {
            null !== tdMenu._itemsWithSubmenu && tdMenu._itemsWithSubmenu.off();
            null !== tdMenu._outsideClickArea && tdMenu._outsideClickArea.off();
        },
    };
})();
jQuery().ready(function () {
    tdMenu.init();
});
var tdUtil = {};
(function () {
    tdUtil = {
        email_pattern: /^[a-zA-Z0-9][a-zA-Z0-9_\.-]{0,}[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9_\.-]{0,}[a-z0-9][\.][a-z0-9]{2,4}$/,
        stopBubble: function (a) {
            a && a.stopPropagation ? a.stopPropagation() : (window.event.cancelBubble = !0);
        },
        isEmail: function (a) {
            return tdUtil.email_pattern.test(a);
        },
        imageMoveClassToFigure: function (a) {
            jQuery("figure ." + a).each(function () {
                jQuery(this).parents("figure:first").addClass(a);
                jQuery(this).removeClass(a);
            });
        },
        getBackendVar: function (a) {
            return "undefined" === typeof window[a] ? "" : window[a];
        },
        isUndefined: function (a) {
            return void 0 === a;
        },
        scrollToElement: function (a, b) {
            tdIsScrollingAnimation = !0;
            jQuery("html, body").stop();
            a = a.offset().top > jQuery(document).height() - jQuery(window).height() ? jQuery(document).height() - jQuery(window).height() : a.offset().top;
            jQuery("html, body").animate(
                { scrollTop: a },
                {
                    duration: b,
                    easing: "easeInOutQuart",
                    complete: function () {
                        tdIsScrollingAnimation = !1;
                    },
                }
            );
        },
        scrollIntoView: function (a) {
            tdIsScrollingAnimation = !0;
            if (!0 !== tdDetect.isMobileDevice) {
                jQuery("html, body").stop();
                a = a.find("img").offset().top;
                a -= 150;
                var b = Math.abs(jQuery(window).scrollTop() - a) / 5;
                jQuery("html, body").animate(
                    { scrollTop: a },
                    {
                        duration: 1100 + b,
                        easing: "easeInOutQuart",
                        complete: function () {
                            tdIsScrollingAnimation = !1;
                        },
                    }
                );
            }
        },
        scrollToPosition: function (a, b) {
            if (window.location !== window.parent.location) {
                var c = jQuery(window.parent.document),
                    d = c.find("#" + jQuery("html").attr("id")).offset().top;
                tdIsScrollingAnimation = !0;
                c.find("html, body").stop();
                c.find("html, body").animate(
                    { scrollTop: d + a },
                    {
                        duration: b,
                        easing: "easeInOutQuart",
                        complete: function () {
                            tdIsScrollingAnimation = !1;
                        },
                    }
                );
            } else
                (tdIsScrollingAnimation = !0),
                    jQuery("html, body").stop(),
                    jQuery("html, body").animate(
                        { scrollTop: a },
                        {
                            duration: b,
                            easing: "easeInOutQuart",
                            complete: function () {
                                tdIsScrollingAnimation = !1;
                            },
                        }
                    );
        },
        tdMoveY: function (a, b) {
            b = "translate3d(0px," + b + "px, 0px)";
            a.style["-webkit-transform"] = b;
            a.style["-moz-transform"] = b;
            a.style["-ms-transform"] = b;
            a.style["-o-transform"] = b;
            a.style.transform = b;
        },
        isValidUrl: function (a) {
            return /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(a) ? !0 : !1;
        },
        round: function (a, b, c) {
            b = Math.pow(10, b | 0);
            a *= b;
            var d = (0 < a) | -(0 > a);
            var f = a % 1 === 0.5 * d;
            var e = Math.floor(a);
            if (f)
                switch (c) {
                    case "PHP_ROUND_HALF_DOWN":
                        a = e + (0 > d);
                        break;
                    case "PHP_ROUND_HALF_EVEN":
                        a = e + (e % 2) * d;
                        break;
                    case "PHP_ROUND_HALF_ODD":
                        a = e + !(e % 2);
                        break;
                    default:
                        a = e + (0 < d);
                }
            return (f ? a : Math.round(a)) / b;
        },
    };
})();
var tdAffix = {};
(function () {
    tdAffix = {
        allow_scroll: !0,
        menu_selector: "",
        menu_wrap_selector: "",
        tds_snap_menu: "",
        tds_snap_menu_logo: "",
        is_menu_affix_height_computed: !1,
        is_menu_affix_height_on_mobile_computed: !1,
        menu_affix_height: 0,
        menu_affix_height_on_mobile: 0,
        main_menu_height: 0,
        top_offset: 0,
        menu_offset: 0,
        is_requestAnimationFrame_running: !1,
        is_menu_affix: !1,
        is_top_menu: !1,
        menu_offset_max_hit: !1,
        menu_offset_min_hit: !0,
        scroll_window_scrollTop_last: 0,
        init: function (a) {
            tdAffix.menu_selector = a.menu_selector;
            tdAffix.menu_wrap_selector = a.menu_wrap_selector;
            tdAffix.tds_snap_menu = a.tds_snap_menu;
            tdAffix.tds_snap_menu_logo = a.tds_snap_menu_logo;
            tdAffix.menu_affix_height = a.menu_affix_height;
            tdAffix.menu_affix_height_on_mobile = a.menu_affix_height_on_mobile;
            jQuery(tdAffix.menu_selector).length &&
                jQuery(tdAffix.menu_wrap_selector).length &&
                tdAffix.tds_snap_menu &&
                (tdDetect.isFirefox && (tdAffix.compute_wrapper(), tdAffix.compute_top()),
                jQuery().ready(function () {
                    tdAffix.compute_wrapper();
                    tdAffix.compute_top();
                }),
                jQuery(window).load(function () {
                    tdAffix.compute_wrapper();
                    tdAffix.compute_top();
                    setTimeout(function () {
                        tdAffix.compute_top();
                    }, 1e3);
                }));
        },
        _get_menu_affix_height: function () {
            if (!0 === tdDetect.isPhoneScreen)
                return (
                    !tdAffix.is_menu_affix_height_on_mobile_computed && tdAffix.is_menu_affix && ((tdAffix.is_menu_affix_height_on_mobile_computed = !0), (tdAffix.menu_affix_height_on_mobile = jQuery(tdAffix.menu_selector).height())),
                    tdAffix.menu_affix_height_on_mobile
                );
            !tdAffix.is_menu_affix_height_computed &&
                tdAffix.is_menu_affix &&
                ((tdAffix.is_menu_affix_height_computed = !0), (tdAffix.menu_affix_height = jQuery(tdAffix.menu_selector).height()), "smart_snap_always" === tdAffix.tds_snap_menu && (tdAffix.top_offset = tdAffix.menu_affix_height));
            return tdAffix.menu_affix_height;
        },
        td_events_scroll: function (a) {
            if (tdAffix.allow_scroll && tdAffix.tds_snap_menu) {
                var b = "";
                if ("snap" !== tdAffix.tds_snap_menu && ("smart_snap_mobile" !== tdAffix.tds_snap_menu || !0 === tdDetect.isPhoneScreen)) {
                    var c = 0;
                    a !== tdAffix.scroll_window_scrollTop_last && ((b = a > tdAffix.scroll_window_scrollTop_last ? "down" : "up"), (c = Math.abs(a - tdAffix.scroll_window_scrollTop_last)));
                    tdAffix.scroll_window_scrollTop_last = a;
                }
                "" !== tdAffix.tds_snap_menu && "" !== tdAffix.tds_snap_menu_logo && jQuery(".td-main-menu-logo").addClass("td-logo-sticky");
                if (
                    a > tdAffix.top_offset + (tdAffix.main_menu_height / 2 - tdAffix._get_menu_affix_height() / 2) ||
                    (!0 === tdAffix.is_menu_affix && "smart_snap_always" === tdAffix.tds_snap_menu && a > tdAffix.top_offset - tdAffix._get_menu_affix_height()) ||
                    !0 === tdAffix.is_top_menu
                ) {
                    var d = jQuery(tdAffix.menu_selector);
                    d.length && tdAffix._affix_on(d);
                    "snap" === tdAffix.tds_snap_menu ||
                        ("smart_snap_mobile" === tdAffix.tds_snap_menu && !1 === tdDetect.isPhoneScreen) ||
                        (d.length &&
                            ((!1 === tdAffix.menu_offset_max_hit && "down" === b) || (!1 === tdAffix.menu_offset_min_hit && "up" === b)) &&
                            window.requestAnimationFrame(function () {
                                var e = 0;
                                0 < a && ("down" === b ? ((e = tdAffix.menu_offset - c), e < -tdAffix._get_menu_affix_height() && (e = -tdAffix._get_menu_affix_height())) : "up" === b && ((e = tdAffix.menu_offset + c), 0 < e && (e = 0)));
                                tdUtil.tdMoveY(d[0], e);
                                tdAffix.menu_offset_min_hit = 0 === e ? !0 : !1;
                                e === -tdAffix._get_menu_affix_height()
                                    ? ((tdAffix.menu_offset_max_hit = !0), (!0 === tdDetect.isIos || tdDetect.isSafari) && d.hide(), "" !== tdAffix.tds_snap_menu_logo && jQuery(".td-main-menu-logo").addClass("td-logo-sticky"))
                                    : ((tdAffix.menu_offset_max_hit = !1), (!0 === tdDetect.isIos || tdDetect.isSafari) && d.show());
                                tdAffix.menu_offset = e;
                            }, d[0]));
                } else {
                    var f = jQuery(tdAffix.menu_selector);
                    f.length && tdAffix._affix_off(f);
                }
            }
        },
        compute_top: function () {
            jQuery(tdAffix.menu_wrap_selector).length &&
                ((tdAffix.top_offset = jQuery(tdAffix.menu_wrap_selector).offset().top),
                "smart_snap_always" === tdAffix.tds_snap_menu && (tdAffix.top_offset += tdAffix.menu_affix_height),
                (tdAffix.is_top_menu = 1 === tdAffix.top_offset ? !0 : !1),
                tdAffix.td_events_scroll(jQuery(window).scrollTop()));
        },
        compute_wrapper: function () {
            jQuery(tdAffix.menu_selector).hasClass("td-affix")
                ? (jQuery(tdAffix.menu_selector).removeClass("td-affix"), (tdAffix.main_menu_height = jQuery(tdAffix.menu_selector).height()), jQuery(tdAffix.menu_selector).addClass("td-affix"))
                : (tdAffix.main_menu_height = jQuery(tdAffix.menu_selector).height());
            jQuery(tdAffix.menu_wrap_selector).css("height", tdAffix.main_menu_height);
        },
        _affix_on: function (a) {
            !1 === tdAffix.is_menu_affix
                ? ("smart_snap_always" === tdAffix.tds_snap_menu && !0 !== tdDetect.isPhoneScreen && a.css("visibility", "hidden"),
                  (tdAffix.menu_offset = -tdAffix.top_offset),
                  a.addClass("td-affix"),
                  jQuery("body").addClass("body-td-affix"),
                  (tdAffix.is_menu_affix = !0))
                : !0 !== tdDetect.isPhoneScreen && a.css("visibility", "");
        },
        _affix_off: function (a) {
            !0 === tdAffix.is_menu_affix &&
                (jQuery(tdAffix.menu_selector).removeClass("td-affix"),
                "" === tdAffix.tds_snap_menu_logo && jQuery(".td-main-menu-logo").removeClass("td-logo-sticky"),
                jQuery("body").removeClass("body-td-affix"),
                (tdAffix.is_menu_affix = !1),
                tdUtil.tdMoveY(a[0], 0),
                (!0 === tdDetect.isIos || tdDetect.isSafari) && a.show());
        },
    };
})();
("use strict");
jQuery().ready(function () {
    td_retina();
    td_mobile_menu_toogle();
    td_resize_videos();
    jQuery("input, textarea").placeholder();
    td_more_articles_box.init();
    td_smart_lists_magnific_popup();
    td_smart_list_dropdown();
    if ("undefined" !== typeof tdsDateFormat) {
        var a = Math.floor(new Date().getTime() / 1e3);
        a = td_date_i18n(tdsDateFormat, a);
        jQuery(".td_data_time").text(a);
    }
    td_comments_form_validation();
    td_scroll_to_class();
});
function td_smart_list_dropdown() {
    jQuery(".td-smart-list-dropdown").on("change", function () {
        window.location = this.value;
    });
}
var td_more_articles_box = {
        is_box_visible: !1,
        cookie: "",
        distance_from_top: 400,
        init: function () {
            td_more_articles_box.cookie = td_read_site_cookie("td-cookie-more-articles");
            !isNaN(parseInt(tds_more_articles_on_post_pages_distance_from_top)) && isFinite(tds_more_articles_on_post_pages_distance_from_top) && 0 < parseInt(tds_more_articles_on_post_pages_distance_from_top)
                ? (td_more_articles_box.distance_from_top = parseInt(tds_more_articles_on_post_pages_distance_from_top))
                : (td_more_articles_box.distance_from_top = 400);
            jQuery(".td-close-more-articles-box").click(function () {
                jQuery(".td-more-articles-box").removeClass("td-front-end-display-block");
                jQuery(".td-more-articles-box").hide();
                !isNaN(parseInt(tds_more_articles_on_post_time_to_wait)) &&
                    isFinite(tds_more_articles_on_post_time_to_wait) &&
                    td_set_cookies_life(["td-cookie-more-articles", "hide-more-articles-box", 864e5 * parseInt(tds_more_articles_on_post_time_to_wait)]);
            });
        },
        td_events_scroll: function (a) {
            tdIsScrollingAnimation ||
                "show" != tdUtil.getBackendVar("tds_more_articles_on_post_enable") ||
                "hide-more-articles-box" == td_more_articles_box.cookie ||
                (a > td_more_articles_box.distance_from_top
                    ? !1 === td_more_articles_box.is_box_visible && (jQuery(".td-more-articles-box").addClass("td-front-end-display-block"), (td_more_articles_box.is_box_visible = !0))
                    : !0 === td_more_articles_box.is_box_visible && (jQuery(".td-more-articles-box").removeClass("td-front-end-display-block"), (td_more_articles_box.is_box_visible = !1)));
        },
    },
    td_resize_timer_id;
jQuery(window).resize(function () {
    clearTimeout(td_resize_timer_id);
    td_resize_timer_id = setTimeout(function () {
        td_done_resizing();
    }, 200);
});
function td_done_resizing() {
    td_resize_videos();
}
function td_resize_videos() {
    jQuery(document)
        .find('iframe[src*="youtube.com"]')
        .each(function () {
            var a = jQuery(this).parent().parent().parent(),
                b = jQuery(this).parent().hasClass("td_wrapper_playlist_player_vimeo"),
                c = a.hasClass("vc_video-aspect-ratio-43");
            a = a.hasClass("vc_video-aspect-ratio-235");
            b || c || a || ((b = jQuery(this)), b.attr("width", "100%"), (c = b.width()), b.css("height", 0.5625 * c, "important"));
        });
    jQuery(document)
        .find('iframe[src*="vimeo.com"]')
        .each(function () {
            var a = jQuery(this).parent().parent().parent(),
                b = jQuery(this).parent().hasClass("td_wrapper_playlist_player_vimeo"),
                c = a.hasClass("vc_video-aspect-ratio-43");
            a = a.hasClass("vc_video-aspect-ratio-235");
            b || c || a || ((b = jQuery(this)), b.attr("width", "100%"), (c = b.width()), b.css("height", 0.5625 * c, "important"));
        });
    jQuery(document)
        .find('iframe[src*="dailymotion.com"]')
        .each(function () {
            var a = jQuery(this).parent().parent().parent(),
                b = a.hasClass("vc_video-aspect-ratio-43");
            a = a.hasClass("vc_video-aspect-ratio-235");
            b || a || ((b = jQuery(this)), b.attr("width", "100%"), (a = b.width()), b.css("height", 0.6 * a, "important"));
        });
}
function td_mobile_menu() {}
function td_mobile_menu_toogle() {
    jQuery("#td-top-mobile-toggle a, .td-mobile-close a, .tdb-mobile-menu-button").click(function () {
        jQuery("body").hasClass("td-menu-mob-open-menu") ? jQuery("body").removeClass("td-menu-mob-open-menu") : jQuery("body").addClass("td-menu-mob-open-menu");
    });
    jQuery(document)
        .find("#td-mobile-nav .menu-item-has-children")
        .each(function (a) {
            a = "td_mobile_submenu td_mobile_elem_with_submenu_" + a;
            jQuery(this).addClass(a);
            jQuery(this).children("a").addClass("td-link-element-after");
            jQuery(this).click(function (a) {
                var b = jQuery(a.target);
                !b.length ||
                    (!b.hasClass("td-element-after") && !b.hasClass("td-link-element-after")) ||
                    ("#" !== b.attr("href") && void 0 !== b.attr("href")) ||
                    (a.preventDefault(), a.stopPropagation(), jQuery(this).toggleClass("td-sub-menu-open"));
            });
        });
}
function td_retina() {
    1 < window.devicePixelRatio &&
        (jQuery(".td-retina").each(function (a) {
            a = jQuery(this).attr("src").replace(".png", "@2x.png");
            a = a.replace(".jpg", "@2x.jpg");
            jQuery(this).attr("src", a);
        }),
        jQuery(".td-retina-data").each(function (a) {
            jQuery(this).attr("src", jQuery(this).data("retina"));
            jQuery(this).addClass("td-retina-version");
        }));
}
tdDetect.isTouchDevice ||
    "" == tdUtil.getBackendVar("td_ad_background_click_link") ||
    jQuery("body").click(function (a) {
        a = jQuery(a.target ? a.target : a.srcElement);
        if (a.hasClass("td-outer-container") || a.hasClass("td-theme-wrap") || a.hasClass("td-header-wrap") || "tdb-autoload-article" === a.attr("id"))
            "_blank" == td_ad_background_click_target ? window.open(td_ad_background_click_link) : (location.href = td_ad_background_click_link);
    });
function td_read_site_cookie(a) {
    a = escape(a) + "=";
    for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
        for (var d = b[c]; " " == d.charAt(0); ) d = d.substring(1, d.length);
        if (0 == d.indexOf(a)) return unescape(d.substring(a.length, d.length));
    }
    return null;
}
function td_set_cookies_life(a) {
    var b = new Date();
    b.setTime(b.getTime() + a[2]);
    document.cookie = a[0] + "=" + a[1] + "; expires=" + b.toGMTString() + "; path=/";
}
var tdIsScrollingAnimation = !1,
    td_mouse_wheel_or_touch_moved = !1;
jQuery(document).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function (a) {
    !1 !== tdIsScrollingAnimation && ((tdIsScrollingAnimation = !1), (td_mouse_wheel_or_touch_moved = !0), jQuery("html, body").stop());
});
document.addEventListener &&
    document.addEventListener(
        "touchmove",
        function (a) {
            !1 !== tdIsScrollingAnimation && ((tdIsScrollingAnimation = !1), (td_mouse_wheel_or_touch_moved = !0), jQuery("html, body").stop());
        },
        !1
    );
var td_scroll_to_top_is_visible = !1;
function td_events_scroll_scroll_to_top(a) {
    tdIsScrollingAnimation ||
        (400 < a
            ? !1 === td_scroll_to_top_is_visible && ((td_scroll_to_top_is_visible = !0), jQuery(".td-scroll-up").addClass("td-scroll-up-visible"))
            : !0 === td_scroll_to_top_is_visible && ((td_scroll_to_top_is_visible = !1), jQuery(".td-scroll-up").removeClass("td-scroll-up-visible")));
}
jQuery(".td-scroll-up").click(function () {
    if (!tdIsScrollingAnimation)
        return (
            (td_scroll_to_top_is_visible = !1),
            jQuery(".td-scroll-up").removeClass("td-scroll-up-visible"),
            (td_more_articles_box.is_box_visible = !1),
            jQuery(".td-more-articles-box").removeClass("td-front-end-display-block"),
            tdUtil.scrollToPosition(0, 1200),
            !1
        );
});
jQuery(".td-read-down a").click(function (a) {
    a.preventDefault();
    tdUtil.scrollToPosition(jQuery(".td-full-screen-header-image-wrap").height(), 1200);
});
function td_post_template_6_title() {
    function a() {
        d = jQuery(document).scrollTop();
        if (950 >= d) {
            var a = 1 - d / 800;
            !0 === tdDetect.isIe8 && (a = 1);
            a = Math.round(100 * a) / 100;
            b.style.opacity = a;
            tdUtil.tdMoveY(c, -(-Math.round(d / 4)));
            f = -Math.round(d / 8);
            tdUtil.tdMoveY(b, -f);
        }
        e = !1;
    }
    var b = document.getElementById("td_parallax_header_6"),
        c = document.getElementById("td-full-screen-header-image"),
        d = "",
        f;
    jQuery(window).scroll(function () {
        !1 === e && window.requestAnimationFrame(a);
        e = !0;
    });
    var e = !1;
}
function td_smart_lists_magnific_popup() {
    jQuery(".td-lightbox-enabled").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1], tCounter: tdUtil.getBackendVar("td_magnific_popup_translation_tCounter") },
        image: {
            tError: "<a href='%url%'>The image #%curr%</a> could not be loaded.",
            titleSrc: function (a) {
                return a.el.attr("data-caption");
            },
        },
        zoom: {
            enabled: !0,
            duration: 300,
            opener: function (a) {
                return a.find("img");
            },
        },
        callbacks: {
            change: function (a) {
                if ("" != a.el[0].id) {
                    var b = a.el[0].id.split("_");
                    jQuery(".td-iosSlider").iosSlider("goToSlide", parseInt(b[1]) + 1);
                } else
                    (tdModalImageLastEl = a.el),
                        setTimeout(function () {
                            tdUtil.scrollIntoView(a.el);
                        }, 100);
            },
            beforeClose: function () {
                "" != tdModalImageLastEl && tdUtil.scrollIntoView(tdModalImageLastEl);
            },
        },
    });
    jQuery("[data-mfp-src]").on("click", function (a) {
        a.preventDefault();
        if ("undefined" === typeof window.parent.tdcAdminSettings)
            return (
                (a = jQuery(this)),
                a.hasClass("td-mfp-loaded") ||
                    (a.addClass("td-mfp-loaded"),
                    a.magnificPopup({
                        preloader: !0,
                        tLoading: "Loading url #%curr%...",
                        type: "iframe",
                        markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe></div>',
                        iframe: {
                            patterns: {
                                youtube: {
                                    index: "youtube.com/",
                                    id: function (a) {
                                        return (a = a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&\?]{11,11}).*/)) && 2 <= a.length ? a[2] : null;
                                    },
                                    src: "//www.youtube.com/embed/%id%?autoplay=1",
                                },
                                vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                            },
                            srcAction: "iframe_src",
                        },
                    })),
                a.magnificPopup("open"),
                !1
            );
    });
}
function td_get_document_width() {
    var a = 0;
    self.innerHeight ? (a = self.innerWidth) : document.documentElement && document.documentElement.clientHeight ? (a = document.documentElement.clientWidth) : document.body && (a = document.body.clientWidth);
    return a;
}
function td_get_document_height() {
    var a = 0;
    self.innerHeight ? (a = self.innerHeight) : document.documentElement && document.documentElement.clientHeight ? (a = document.documentElement.clientHeight) : document.body && (a = document.body.clientHeight);
    return a;
}
function td_comments_form_validation() {
    jQuery(".comment-form").submit(function (a) {
        jQuery("form#commentform :input").each(function () {
            var b = jQuery(this),
                c = jQuery(this).parent().parent();
            b.attr("aria-required") &&
                ("" == b.val()
                    ? (a.preventDefault(),
                      c.addClass("td-comment-form-warnings"),
                      "comment" == b.attr("id")
                          ? (c.find(".td-warning-comment").show(200), b.css("border", "1px solid #ff7a7a"))
                          : "author" == b.attr("id")
                          ? (c.find(".td-warning-author").show(200), b.css("border", "1px solid #ff7a7a"))
                          : "email" == b.attr("id") && (c.find(".td-warning-email").show(200), b.css("border", "1px solid #ff7a7a")))
                    : "email" == b.attr("id") && !1 === tdUtil.isEmail(b.val()) && (a.preventDefault(), c.addClass("td-comment-form-warnings"), c.find(".td-warning-email-error").show(200)));
        });
    });
    jQuery("form#commentform :input").each(function () {
        var a = jQuery(this).parent().parent(),
            b = jQuery(this);
        b.focus(function () {
            "comment" == b.attr("id")
                ? (a.find(".td-warning-comment").hide(200), b.css("border", "1px solid #e1e1e1"))
                : "author" == b.attr("id")
                ? (a.find(".td-warning-author").hide(200), b.css("border", "1px solid #e1e1e1"))
                : "email" == b.attr("id") && (a.find(".td-warning-email").hide(200), a.find(".td-warning-email-error").hide(200), b.css("border", "1px solid #e1e1e1"));
        });
    });
}
function td_scroll_to_class() {
    jQuery("[data-scroll-to-class]").on("click", function (a) {
        a.preventDefault();
        a.stopImmediatePropagation();
        jQuery("body").removeClass("td-menu-mob-open-menu");
        var b = jQuery(this),
            c = b.offset(),
            d = b.data("scroll-to-class");
        a = b.data("scroll-offset");
        var f = b.data("scroll-target");
        if ("undefined" === typeof a || "" === a) a = 0;
        if ("undefined" !== typeof d && "" !== d) {
            var e = jQuery("." + d);
            768 > tdEvents.window_innerWidth
                ? setTimeout(function () {
                      td_helper_scroll_to_class(b, e, c, 0, f, d);
                  }, 500)
                : td_helper_scroll_to_class(b, e, c, a, f, d);
        }
    });
}
function td_helper_scroll_to_class(a, b, c, d, f, e) {
    b.length
        ? ((b = b.offset()),
          (c = 400 * Math.floor(Math.abs(c.top - b.top) / 100)),
          1500 < c ? (c = 1500) : 500 > c && (c = 500),
          tdUtil.scrollToPosition(b.top + d, c),
          (a = a.parent().parent("li.menu-item")),
          a.length && (a.siblings(".current-menu-item").removeClass("current-menu-item"), a.addClass("current-menu-item")),
          jQuery("body").removeClass("td-menu-mob-open-menu"))
        : "undefined" !== typeof f &&
          "" !== f &&
          (td_set_cookies_life(["td-cookie-scroll-to-class", e, 864e5]), td_set_cookies_life(["td-cookie-scroll-offset", d, 864e5]), jQuery("body").removeClass("td-menu-mob-open-menu"), (window.location = f));
}
jQuery(window).load(function () {
    var a = td_read_site_cookie("td-cookie-scroll-to-class"),
        b = td_read_site_cookie("td-cookie-scroll-offset");
    if ("undefined" !== typeof a && null !== a) {
        td_set_cookies_life(["td-cookie-scroll-to-class", "", 1]);
        td_set_cookies_life(["td-cookie-scroll-offset", "", 1]);
        var c = jQuery("." + a);
        if (c.length) {
            c = c.offset();
            var d = 400 * Math.floor(Math.abs(c.top) / 100);
            1500 < d ? (d = 1500) : 500 > d && (d = 500);
            var f = 0;
            "undefined" !== typeof b && null !== b && (f = parseInt(b));
            tdUtil.scrollToPosition(c.top + f, d);
            a = jQuery('[data-scroll-to-class="' + a + '"]');
            a.length && ((a = a.parent().parent("li.menu-item")), a.length && (a.siblings(".current-menu-item").removeClass("current-menu-item"), a.addClass("current-menu-item")));
        }
    }
});
var tdLoadingBox = {};
(function () {
    tdLoadingBox = {
        speed: 40,
        arrayColorsTemp: "rgba(99, 99, 99, 0);rgba(99, 99, 99, 0.05);rgba(99, 99, 99, 0.08);rgba(99, 99, 99, 0.2);rgba(99, 99, 99, 0.3);rgba(99, 99, 99, 0.5);rgba(99, 99, 99, 0.6);rgba(99, 99, 99, 1)".split(";"),
        arrayColors: [],
        statusAnimation: "stop",
        stop: function () {
            tdLoadingBox.statusAnimation = "stop";
        },
        init: function (a, b) {
            !1 === tdUtil.isUndefined(b) && (tdLoadingBox.speed = b);
            b = /^#[a-zA-Z0-9]{3,6}$/;
            a && b.test(a)
                ? ((a = tdLoadingBox.hexToRgb(a)),
                  (a = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", "),
                  (tdLoadingBox.arrayColors[7] = a + " 0.9)"),
                  (tdLoadingBox.arrayColors[6] = a + " 0.7)"),
                  (tdLoadingBox.arrayColors[5] = a + " 0.5)"),
                  (tdLoadingBox.arrayColors[4] = a + " 0.3)"),
                  (tdLoadingBox.arrayColors[3] = a + " 0.15)"),
                  (tdLoadingBox.arrayColors[2] = a + " 0.15)"),
                  (tdLoadingBox.arrayColors[1] = a + " 0.15)"),
                  (tdLoadingBox.arrayColors[0] = a + " 0.15)"))
                : (tdLoadingBox.arrayColors = tdLoadingBox.arrayColorsTemp.slice(0));
            "stop" === tdLoadingBox.statusAnimation && ((tdLoadingBox.statusAnimation = "display"), this.render());
        },
        render: function (a) {
            tdLoadingBox.animationDisplay(
                '<div class="td-lb-box td-lb-box-1" style="background-color:' +
                    tdLoadingBox.arrayColors[0] +
                    '"></div><div class="td-lb-box td-lb-box-2" style="background-color:' +
                    tdLoadingBox.arrayColors[1] +
                    '"></div><div class="td-lb-box td-lb-box-3" style="background-color:' +
                    tdLoadingBox.arrayColors[2] +
                    '"></div><div class="td-lb-box td-lb-box-4" style="background-color:' +
                    tdLoadingBox.arrayColors[3] +
                    '"></div><div class="td-lb-box td-lb-box-5" style="background-color:' +
                    tdLoadingBox.arrayColors[4] +
                    '"></div><div class="td-lb-box td-lb-box-6" style="background-color:' +
                    tdLoadingBox.arrayColors[5] +
                    '"></div><div class="td-lb-box td-lb-box-7" style="background-color:' +
                    tdLoadingBox.arrayColors[6] +
                    '"></div><div class="td-lb-box td-lb-box-8" style="background-color:' +
                    tdLoadingBox.arrayColors[7] +
                    '"></div>'
            );
            a = [
                tdLoadingBox.arrayColors[0],
                tdLoadingBox.arrayColors[1],
                tdLoadingBox.arrayColors[2],
                tdLoadingBox.arrayColors[3],
                tdLoadingBox.arrayColors[4],
                tdLoadingBox.arrayColors[5],
                tdLoadingBox.arrayColors[6],
                tdLoadingBox.arrayColors[7],
            ];
            tdLoadingBox.arrayColors[0] = a[7];
            tdLoadingBox.arrayColors[1] = a[0];
            tdLoadingBox.arrayColors[2] = a[1];
            tdLoadingBox.arrayColors[3] = a[2];
            tdLoadingBox.arrayColors[4] = a[3];
            tdLoadingBox.arrayColors[5] = a[4];
            tdLoadingBox.arrayColors[6] = a[5];
            tdLoadingBox.arrayColors[7] = a[6];
            "display" === tdLoadingBox.statusAnimation ? setTimeout(tdLoadingBox.render, tdLoadingBox.speed) : tdLoadingBox.animationDisplay("");
        },
        animationDisplay: function (a) {
            jQuery(".td-loader-gif").html(a);
        },
        hexToRgb: function (a) {
            return (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)) ? { r: parseInt(a[1], 16), g: parseInt(a[2], 16), b: parseInt(a[3], 16) } : null;
        },
    };
})();
var tdAjaxSearch = {};
jQuery().ready(function () {
    tdAjaxSearch.init();
});
(function () {
    tdAjaxSearch = {
        _current_selection_index: 0,
        _last_request_results_count: 0,
        _first_down_up: !0,
        _is_search_open: !1,
        init: function () {
            jQuery(document).on("click", function (a) {
                "td-icon-search" !== a.target.className && "td-header-search" !== a.target.id && "td-header-search-top" !== a.target.id && !0 === tdAjaxSearch._is_search_open && tdAjaxSearch.hide_search_box();
            });
            jQuery("#td-header-search-button").on("click", function (a) {
                a.preventDefault();
                a.stopPropagation();
                !0 === tdAjaxSearch._is_search_open ? tdAjaxSearch.hide_search_box() : tdAjaxSearch.show_search_box();
            });
            jQuery("#td-header-search-button-mob, .tdb-header-search-button-mob").on("click", function (a) {
                jQuery("body").addClass("td-search-opened");
                var b = jQuery("#td-header-search-mob");
                setTimeout(function () {
                    b.focus();
                }, 1300);
                0 < b.val().trim().length && tdAjaxSearch.do_ajax_call_mob();
            });
            jQuery(".td-search-close a").on("click", function () {
                jQuery("body").removeClass("td-search-opened");
            });
            jQuery("#td-header-search").keydown(function (a) {
                if ((a.which && 39 === a.which) || (a.keyCode && 39 === a.keyCode) || (a.which && 37 === a.which) || (a.keyCode && 37 === a.keyCode)) tdAjaxSearch.td_aj_search_input_focus();
                else {
                    if ((a.which && 13 === a.which) || (a.keyCode && 13 === a.keyCode))
                        return (a = jQuery(".td-aj-cur-element")), 0 < a.length ? ((a = a.find(".entry-title a").attr("href")), (window.location = a)) : jQuery(this).parent().parent().submit(), !1;
                    if ((a.which && 40 === a.which) || (a.keyCode && 40 === a.keyCode)) return tdAjaxSearch.move_prompt_down(), !1;
                    if ((a.which && 38 === a.which) || (a.keyCode && 38 === a.keyCode)) return tdAjaxSearch.move_prompt_up(), !1;
                    ((a.which && 8 === a.which) || (a.keyCode && 8 === a.keyCode)) && 1 === jQuery(this).val().length && jQuery("#td-aj-search").empty();
                    tdAjaxSearch.td_aj_search_input_focus();
                    setTimeout(function () {
                        tdAjaxSearch.do_ajax_call();
                    }, 100);
                    return !0;
                }
            });
            jQuery("#td-header-search-mob").keydown(function (a) {
                if ((a.which && 13 === a.which) || (a.keyCode && 13 === a.keyCode))
                    return (a = jQuery(".td-aj-cur-element")), 0 < a.length ? ((a = a.find(".entry-title a").attr("href")), (window.location = a)) : jQuery(this).parent().parent().submit(), !1;
                ((a.which && 8 === a.which) || (a.keyCode && 8 === a.keyCode)) && 1 === jQuery(this).val().length && jQuery("#td-aj-search-mob").empty();
                setTimeout(function () {
                    tdAjaxSearch.do_ajax_call_mob();
                }, 100);
                return !0;
            });
        },
        show_search_box: function () {
            jQuery(".td-drop-down-search").addClass("td-drop-down-search-open");
            !0 !== tdDetect.isIos &&
                setTimeout(function () {
                    document.getElementById("td-header-search").focus();
                }, 200);
            tdAjaxSearch._is_search_open = !0;
        },
        hide_search_box: function () {
            jQuery(".td-drop-down-search").removeClass("td-drop-down-search-open");
            tdAjaxSearch._is_search_open = !1;
        },
        move_prompt_up: function () {
            !0 === tdAjaxSearch._first_down_up
                ? ((tdAjaxSearch._first_down_up = !1), 0 === tdAjaxSearch._current_selection_index ? (tdAjaxSearch._current_selection_index = tdAjaxSearch._last_request_results_count - 1) : tdAjaxSearch._current_selection_index--)
                : 0 === tdAjaxSearch._current_selection_index
                ? (tdAjaxSearch._current_selection_index = tdAjaxSearch._last_request_results_count)
                : tdAjaxSearch._current_selection_index--;
            tdAjaxSearch._repaintCurrentElement();
        },
        move_prompt_down: function () {
            !0 === tdAjaxSearch._first_down_up
                ? (tdAjaxSearch._first_down_up = !1)
                : tdAjaxSearch._current_selection_index === tdAjaxSearch._last_request_results_count
                ? (tdAjaxSearch._current_selection_index = 0)
                : tdAjaxSearch._current_selection_index++;
            tdAjaxSearch._repaintCurrentElement();
        },
        _repaintCurrentElement: function () {
            jQuery(".td_module_wrap").removeClass("td-aj-cur-element");
            tdAjaxSearch._current_selection_index > tdAjaxSearch._last_request_results_count - 1
                ? jQuery(".td-search-form").fadeTo(100, 1)
                : (tdAjaxSearch.td_aj_search_input_remove_focus(), jQuery(".td_module_wrap").eq(tdAjaxSearch._current_selection_index).addClass("td-aj-cur-element"));
        },
        td_aj_search_input_focus: function () {
            tdAjaxSearch._current_selection_index = 0;
            tdAjaxSearch._first_down_up = !0;
            jQuery(".td-search-form").fadeTo(100, 1);
            jQuery(".td_module_wrap").removeClass("td-aj-cur-element");
        },
        td_aj_search_input_remove_focus: function () {
            0 !== tdAjaxSearch._last_request_results_count && jQuery(".td-search-form").css("opacity", 0.5);
        },
        process_ajax_response: function (a) {
            var b = jQuery("#td-header-search").val();
            "" === b
                ? jQuery("#td-aj-search").empty()
                : ((a = jQuery.parseJSON(a)),
                  a.td_search_query === b &&
                      ((tdAjaxSearch._current_selection_index = 0),
                      (tdAjaxSearch._last_request_results_count = a.td_total_in_list),
                      (tdAjaxSearch._first_down_up = !0),
                      jQuery("#td-aj-search").html(a.td_data),
                      "undefined" !== typeof window.tdAnimationStack &&
                          !0 === window.tdAnimationStack.activated &&
                          (window.tdAnimationStack.check_for_new_items("#td-aj-search .td-animation-stack", window.tdAnimationStack.SORTED_METHOD.sort_left_to_right, !0, !1), window.tdAnimationStack.compute_items(!1))));
        },
        process_ajax_response_mob: function (a) {
            var b = jQuery("#td-header-search-mob").val();
            "" === b
                ? jQuery("#td-aj-search-mob").empty()
                : ((a = jQuery.parseJSON(a)),
                  a.td_search_query === b &&
                      (jQuery("#td-aj-search-mob").html(a.td_data),
                      "undefined" !== typeof window.tdAnimationStack &&
                          !0 === window.tdAnimationStack.activated &&
                          (window.tdAnimationStack.check_for_new_items("#td-aj-search-mob .td-animation-stack", window.tdAnimationStack.SORTED_METHOD.sort_left_to_right, !0, !1), window.tdAnimationStack.compute_items(!1))));
        },
        do_ajax_call: function () {
            var a = jQuery("#td-header-search").val();
            "" === a
                ? tdAjaxSearch.td_aj_search_input_focus()
                : tdLocalCache.exist(a)
                ? tdAjaxSearch.process_ajax_response(tdLocalCache.get(a))
                : jQuery.ajax({
                      type: "POST",
                      url: td_ajax_url,
                      data: { action: "td_ajax_search", td_string: a },
                      success: function (b, c, d) {
                          tdLocalCache.set(a, b);
                          tdAjaxSearch.process_ajax_response(b);
                      },
                      error: function (a, c, d) {},
                  });
        },
        do_ajax_call_mob: function () {
            var a = jQuery("#td-header-search-mob").val();
            "" !== a &&
                (tdLocalCache.exist(a)
                    ? tdAjaxSearch.process_ajax_response_mob(tdLocalCache.get(a))
                    : jQuery.ajax({
                          type: "POST",
                          url: td_ajax_url,
                          data: { action: "td_ajax_search", td_string: a },
                          success: function (b, c, d) {
                              tdLocalCache.set(a, b);
                              tdAjaxSearch.process_ajax_response_mob(b);
                          },
                          error: function (a, c, d) {},
                      }));
        },
    };
})();
("use strict");
jQuery().ready(function () {
    tdUtil.imageMoveClassToFigure("td-post-image-full");
    tdUtil.imageMoveClassToFigure("td-post-image-right");
    tdUtil.imageMoveClassToFigure("td-post-image-left");
    "undefined" !== typeof window.tds_general_modal_image &&
        "" !== window.tds_general_modal_image &&
        (jQuery(".single .td-post-content a > img").filter(function (a, b) {
            if (-1 !== b.className.indexOf("wp-image")) {
                a = jQuery(b);
                b = a.parent();
                var c = b.attr("href");
                -1 === c.indexOf(document.domain) || (-1 === c.indexOf("uploads") && -1 === c.indexOf("attachment")) || (a.addClass("td-modal-image"), -1 !== c.indexOf("attachment") && b.attr("href", a.attr("src")));
            }
        }),
        jQuery(".single .td-post-content .wp-block-image > img").filter(function (a, b) {
            -1 !== b.className.indexOf("wp-image") && ((a = jQuery(b)), (b = a.context.src), 1 !== a.closest(".td-modal-image").length && (a.wrap("<a href='" + b + "' class=''></a>"), a.addClass("td-modal-image")));
        }));
});
var tdModalImageLastEl = "",
    tdBlocks = {};
(function () {
    function a() {
        function a(a, b) {
            !0 === d && a.target === f
                ? (window.location = a.target)
                : ((d = !0),
                  (f = a.target),
                  a.preventDefault(),
                  setTimeout(function () {
                      d = !1;
                  }, 300),
                  c(a, b));
        }
        function c(a, b) {
            a = b.data("td_block_id");
            var c = tdBlocks.tdGetBlockObjById(a);
            c.is_ajax_running = !0;
            jQuery(".mega-menu-sub-cat-" + a).removeClass("cur-sub-cat");
            b.addClass("cur-sub-cat");
            c.td_filter_value = b.data("td_filter_value");
            c.td_current_page = 1;
            tdBlocks.tdAjaxDoBlockRequest(c, "mega_menu");
        }
        jQuery(".td-ajax-next-page").on("click", function (a) {
            a.preventDefault();
            a = tdBlocks.tdGetBlockObjById(jQuery(this).data("td_block_id"));
            jQuery(this).hasClass("ajax-page-disabled") || !0 === a.is_ajax_running || ((a.is_ajax_running = !0), a.td_current_page++, tdBlocks.tdAjaxDoBlockRequest(a, "next"));
        });
        jQuery(".td-ajax-prev-page").on("click", function (a) {
            a.preventDefault();
            a = tdBlocks.tdGetBlockObjById(jQuery(this).data("td_block_id"));
            jQuery(this).hasClass("ajax-page-disabled") || !0 === a.is_ajax_running || ((a.is_ajax_running = !0), a.td_current_page--, tdBlocks.tdAjaxDoBlockRequest(a, "back"));
        });
        jQuery(".td_ajax_load_more_js").on("click", function (a) {
            a.preventDefault();
            jQuery(this).hasClass("ajax-page-disabled") ||
                (jQuery(this).css("visibility", "hidden"),
                (a = tdBlocks.tdGetBlockObjById(jQuery(this).data("td_block_id"))),
                a.td_current_page++,
                tdBlocks.tdAjaxDoBlockRequest(a, "load_more"),
                a.max_num_pages <= a.td_current_page && jQuery(this).addClass("ajax-page-disabled"));
        });
        if (tdDetect.isMobileDevice)
            jQuery(".td-pulldown-filter-display-option").on("click", function () {
                var a = jQuery(this).data("td_block_id");
                jQuery("#td_pulldown_" + a).addClass("td-pulldown-filter-list-open");
                a = jQuery("#td_pulldown_" + a + "_list");
                a.removeClass("fadeOut");
                a.addClass("td_animated td_fadeIn");
            });
        else
            jQuery(".td-pulldown-filter-display-option").hover(
                function () {
                    var a = jQuery(this).data("td_block_id");
                    jQuery("#td_pulldown_" + a).addClass("td-pulldown-filter-list-open");
                    a = jQuery("#td_pulldown_" + a + "_list");
                    a.removeClass("fadeOut");
                    a.addClass("td_animated td_fadeIn");
                    a.css("visibility", "visible");
                },
                function () {
                    var a = jQuery(this).data("td_block_id");
                    jQuery("#td_pulldown_" + a).removeClass("td-pulldown-filter-list-open");
                }
            );
        jQuery(".td-related-title a").on("click", function (a) {
            a.preventDefault();
            jQuery(".td-related-title").children("a").removeClass("td-cur-simple-item");
            jQuery(this).addClass("td-cur-simple-item");
            a = jQuery(this).data("td_block_id");
            a = tdBlocks.tdGetBlockObjById(a);
            a.td_filter_value = jQuery(this).data("td_filter_value");
            a.td_current_page = 1;
            tdBlocks.tdAjaxDoBlockRequest(a, "pull_down");
        });
        var d = !1,
            f = "";
        tdDetect.isTouchDevice
            ? jQuery(".block-mega-child-cats a")
                  .click(function (b) {
                      a(b, jQuery(this));
                  }, !1)
                  .each(function (b, c) {
                      c.addEventListener(
                          "touchend",
                          function (b) {
                              a(b, jQuery(this));
                          },
                          !1
                      );
                  })
            : jQuery(".block-mega-child-cats a").hover(
                  function (a) {
                      c(a, jQuery(this));
                  },
                  function (a) {}
              );
        jQuery(".td-subcat-item a").on("click", function (a) {
            a.preventDefault();
            a = tdBlocks.tdGetBlockObjById(jQuery(this).data("td_block_id"));
            !0 !== a.is_ajax_running &&
                ((a.is_ajax_running = !0),
                jQuery("." + jQuery(this).data("td_block_id"))
                    .find(".td-cur-simple-item")
                    .removeClass("td-cur-simple-item"),
                jQuery(this).addClass("td-cur-simple-item"),
                (a.td_filter_value = jQuery(this).data("td_filter_value")),
                (a.td_current_page = 1),
                tdBlocks.tdAjaxDoBlockRequest(a, "pull_down"));
        });
        jQuery(".td-pulldown-filter-link").on("click", function (a) {
            a.preventDefault();
            var b = jQuery(this).data("td_block_id");
            jQuery("#" + b)
                .find(".iosSlider")
                .iosSlider("destroy");
            var c = tdBlocks.tdGetBlockObjById(b);
            !0 !== c.is_ajax_running &&
                ((c.is_ajax_running = !0),
                (c.td_filter_value = jQuery(this).data("td_filter_value")),
                jQuery("." + jQuery(this).data("td_block_id"))
                    .find(".td-cur-simple-item")
                    .removeClass("td-cur-simple-item"),
                jQuery(this).addClass("td-cur-simple-item"),
                (c.td_current_page = 1),
                jQuery("#td_pulldown_" + b).removeClass("td-pulldown-filter-list-open"),
                tdBlocks.tdAjaxDoBlockRequest(c, "pull_down"),
                tdDetect.isMobileDevice && tdUtil.stopBubble(a));
        });
    }
    jQuery().ready(function () {
        a();
    });
    tdBlocks = {
        tdPullDownFilterChangeValue: function (a, c) {
            jQuery("#td-pulldown-" + a + "-val").html(c);
        },
        tdAjaxDoBlockRequest: function (a, c) {
            var b = JSON.stringify(a);
            if (tdLocalCache.exist(b)) return tdBlocks.tdBlockAjaxLoadingStart(a, !0, c), tdBlocks.tdAjaxBlockProcessResponse(tdLocalCache.get(b), c), "cache_hit";
            tdBlocks.tdBlockAjaxLoadingStart(a, !1, c);
            jQuery.ajax({
                type: "POST",
                url: td_ajax_url,
                cache: !0,
                data: {
                    action: "td_ajax_block",
                    td_atts: a.atts,
                    td_block_id: a.id,
                    td_column_number: a.td_column_number,
                    td_current_page: a.td_current_page,
                    block_type: a.block_type,
                    td_filter_value: a.td_filter_value,
                    td_user_action: a.td_user_action,
                    td_magic_token: tdBlockNonce,
                },
                success: function (a, d, l) {
                    tdLocalCache.set(b, a);
                    tdBlocks.tdAjaxBlockProcessResponse(a, c);
                },
                error: function (a, b, c) {
                    console.log(c);
                },
            });
        },
        tdAjaxBlockProcessResponse: function (a, c) {
            a = jQuery.parseJSON(a);
            if ("load_more" === c || "infinite_load" === c) {
                for (var b = 0; b < tdSmartSidebar.items.length; b++) "case_3_bottom_of_content" === tdSmartSidebar.items[b].sidebar_state && (tdSmartSidebar.items[b].sidebar_state = "case_1_fixed_down");
                jQuery(a.td_data).appendTo("#" + a.td_block_id);
            } else jQuery("#" + a.td_block_id).html(a.td_data);
            !0 === a.td_hide_prev ? jQuery("#prev-page-" + a.td_block_id).addClass("ajax-page-disabled") : jQuery("#prev-page-" + a.td_block_id).removeClass("ajax-page-disabled");
            !0 === a.td_hide_next ? jQuery("#next-page-" + a.td_block_id).addClass("ajax-page-disabled") : jQuery("#next-page-" + a.td_block_id).removeClass("ajax-page-disabled");
            b = tdBlocks.tdGetBlockObjById(a.td_block_id);
            "slide" === b.block_type && jQuery("#" + a.td_block_id + " .slide-wrap-active-first").addClass("slide-wrap-active");
            b.is_ajax_running = !1;
            tdBlocks.tdBlockAjaxLoadingEnd(a, b, c);
        },
        tdBlockAjaxLoadingStart: function (a, c, d) {
            var b = jQuery("#" + a.id);
            jQuery(".td-loader-gif").remove();
            b.removeClass("td_fadeInRight td_fadeInLeft td_fadeInDown td_fadeInUp td_animated_xlong");
            b.addClass("td_block_inner_overflow");
            var e = b.height();
            b.css("height", e);
            !1 === c &&
                ("load_more" === d
                    ? (b.parent().append('<div class="td-loader-gif td-loader-infinite td-loader-blocks-load-more  td-loader-animation-start"></div>'),
                      tdLoadingBox.init(a.header_color ? a.header_color : tds_theme_color_site_wide),
                      setTimeout(function () {
                          jQuery(".td-loader-gif").removeClass("td-loader-animation-start").addClass("td-loader-animation-mid");
                      }, 50))
                    : "infinite_load" === d
                    ? (b.parent().append('<div class="td-loader-gif td-loader-infinite td-loader-animation-start"></div>'),
                      tdLoadingBox.init(a.header_color ? a.header_color : tds_theme_color_site_wide),
                      setTimeout(function () {
                          jQuery(".td-loader-gif").removeClass("td-loader-animation-start").addClass("td-loader-animation-mid");
                      }, 50))
                    : (b.parent().append('<div class="td-loader-gif td-loader-animation-start"></div>'),
                      tdLoadingBox.init(a.header_color ? a.header_color : tds_theme_color_site_wide),
                      setTimeout(function () {
                          jQuery(".td-loader-gif").removeClass("td-loader-animation-start").addClass("td-loader-animation-mid");
                      }, 50),
                      b.addClass("td_animated_long td_fadeOut_to_1")));
        },
        tdBlockAjaxLoadingEnd: function (a, c, d) {
            jQuery(".td-loader-gif").removeClass("td-loader-animation-mid").addClass("td-loader-animation-end");
            setTimeout(function () {
                jQuery(".td-loader-gif").remove();
                tdLoadingBox.stop();
            }, 400);
            var b = jQuery("#" + c.id);
            b.removeClass("td_animated_long td_fadeOut_to_1");
            if (!0 === tdAnimationStack.activated) var e = tdAnimationStack.SORTED_METHOD.sort_left_to_right;
            switch (d) {
                case "next":
                    b.addClass("td_animated_xlong td_fadeInRight");
                    void 0 !== e && (e = tdAnimationStack.SORTED_METHOD.sort_right_to_left);
                    break;
                case "back":
                    b.addClass("td_animated_xlong td_fadeInLeft");
                    break;
                case "pull_down":
                    b.addClass("td_animated_xlong td_fadeInDown");
                    break;
                case "mega_menu":
                    b.addClass("td_animated_xlong td_fadeInDown");
                    break;
                case "load_more":
                    setTimeout(function () {
                        jQuery("." + c.id + " .td_ajax_load_more_js").css("visibility", "visible");
                    }, 500);
                    break;
                case "infinite_load":
                    setTimeout(function () {
                        tdInfiniteLoader.computeTopDistances();
                        "" !== a.td_data && tdInfiniteLoader.enable_is_visible_callback(c.id);
                    }, 500),
                        setTimeout(function () {
                            tdInfiniteLoader.computeTopDistances();
                        }, 1e3),
                        setTimeout(function () {
                            tdInfiniteLoader.computeTopDistances();
                        }, 1500);
            }
            setTimeout(function () {
                jQuery(".td_block_inner_overflow").removeClass("td_block_inner_overflow");
                b.css("height", "auto");
                tdSmartSidebar.compute();
            }, 200);
            setTimeout(function () {
                tdSmartSidebar.compute();
            }, 500);
            void 0 !== e &&
                setTimeout(function () {
                    ("mega_menu" !== d && "back" !== d && "pull_down" !== d) || "" === JSON.parse(tdBlocksArray[0].atts).td_ajax_preloading
                        ? tdAnimationStack.check_for_new_items("#" + c.id + " .td-animation-stack", e, !0, !1)
                        : tdAnimationStack.check_for_new_items("#" + c.id + " .td-animation-stack", e, !0, !0);
                }, 200);
        },
        tdGetBlockIndex: function (a) {
            var b = 0,
                d = 0;
            jQuery.each(tdBlocksArray, function (c, e) {
                if (e.id === a) return (d = b), !1;
                b++;
            });
            return d;
        },
        tdGetBlockObjById: function (a) {
            return tdBlocksArray[tdBlocks.tdGetBlockIndex(a)];
        },
    };
})();
jQuery().ready(function () {
    var a = {
        type: "inline",
        preloader: !1,
        focus: "#name",
        removalDelay: 500,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = this.st.el.attr("data-effect");
                tdLogin.clearFields();
                tdLogin.showHideMsg();
                700 > jQuery(window).width() ? (this.st.focus = !1) : !1 === tdDetect.isIe && (this.st.focus = "#login_email");
            },
            beforeClose: function () {},
        },
        disableOn: function () {
            return 750 > jQuery(window).width() ? !1 : !0;
        },
    };
    void 0 !== window.tdb_login_sing_in_shortcode &&
        (window.self === window.top && jQuery(".tdb_header_user .td-login-modal-js").magnificPopup(a),
        jQuery(".tdb-head-usr-log").on("click", function (a) {
            750 > jQuery(window).width() &&
                jQuery(a.target).parents("tdb_header_user").length &&
                (a.preventDefault(),
                jQuery("body").addClass("td-menu-mob-open-menu"),
                jQuery(".td-mobile-container").hide(),
                jQuery("#td-mobile-nav").addClass("td-hide-menu-content"),
                setTimeout(function () {
                    jQuery(".td-mobile-container").show();
                }, 500),
                tdLogin.showHideElementsMobile([
                    ["#td-login-mob", 1],
                    ["#td-register-mob", 0],
                    ["#td-forgot-pass-mob", 0],
                ]));
        }));
    "yes" === window.tdc_is_installed &&
        (jQuery(".comment-reply-login").attr({ href: "#login-form", "data-effect": "mpf-td-login-effect" }), window.self === window.top && jQuery(".comment-reply-login, .td-login-modal-js").magnificPopup(a));
    jQuery(".td-login-modal-js, .comment-reply-login").on("click", function (a) {
        750 > jQuery(window).width() &&
            !jQuery(a.target).parents("tdb_header_user").length &&
            (a.preventDefault(),
            jQuery("body").addClass("td-menu-mob-open-menu"),
            jQuery(".td-mobile-container").hide(),
            jQuery("#td-mobile-nav").addClass("td-hide-menu-content"),
            setTimeout(function () {
                jQuery(".td-mobile-container").show();
            }, 500),
            tdLogin.showHideElementsMobile([
                ["#td-login-mob", 1],
                ["#td-register-mob", 0],
                ["#td-forgot-pass-mob", 0],
            ]));
    });
    jQuery("#login-link").on("click", function () {
        tdLogin.showHideElements([
            ["#td-login-div", 1],
            ["#td-register-div", 0],
            ["#td-forgot-pass-div", 0],
        ]);
        jQuery("#login-form").addClass("td-login-animation");
        700 < jQuery(window).width() && !1 === tdDetect.isIe && jQuery("#login_email").focus();
        tdLogin.showHideMsg();
    });
    jQuery("#register-link").on("click", function () {
        tdLogin.showHideElements([
            ["#td-login-div", 0],
            ["#td-register-div", 1],
            ["#td-forgot-pass-div", 0],
        ]);
        jQuery("#login-form").addClass("td-login-animation");
        700 < jQuery(window).width() && !1 === tdDetect.isIe && jQuery("#register_email").focus();
        tdLogin.showHideMsg();
    });
    jQuery("#forgot-pass-link").on("click", function (a) {
        a.preventDefault();
        tdLogin.showHideElements([
            ["#td-login-div", 0],
            ["#td-register-div", 0],
            ["#td-forgot-pass-div", 1],
        ]);
        jQuery("#login-form").addClass("td-login-animation");
        700 < jQuery(window).width() && !1 === tdDetect.isIe && jQuery("#forgot_email").focus();
        tdLogin.showHideMsg();
    });
    jQuery("#login_button").on("click", function () {
        tdLogin.handlerLogin();
    });
    jQuery("#login_pass").keydown(function (a) {
        ((a.which && 13 === a.which) || (a.keyCode && 13 === a.keyCode)) && tdLogin.handlerLogin();
    });
    jQuery("#register_button").on("click", function () {
        tdLogin.handlerRegister();
    });
    jQuery("#register_user").keydown(function (a) {
        ((a.which && 13 === a.which) || (a.keyCode && 13 === a.keyCode)) && tdLogin.handlerRegister();
    });
    jQuery("#forgot_button").on("click", function () {
        tdLogin.handlerForgotPass();
    });
    jQuery("#forgot_email").keydown(function (a) {
        ((a.which && 13 === a.which) || (a.keyCode && 13 === a.keyCode)) && tdLogin.handlerForgotPass();
    });
    jQuery(".td-back-button").on("click", function () {
        tdLogin.showHideElements([
            ["#td-login-div", 1],
            ["#td-register-div", 0],
            ["#td-forgot-pass-div", 0],
        ]);
        jQuery("#login-form").removeClass("td-login-animation");
        jQuery(".td_display_err").hide();
    });
});
var tdLogin = {};
(function () {
    tdLogin = {
        email_pattern: /^[a-zA-Z0-9][a-zA-Z0-9_\.-]{0,}[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9_\.-]{0,}[a-z0-9][\.][a-z0-9]{2,4}$/,
        handlerLogin: function (a) {
            var b = jQuery("#login_email");
            a = jQuery("#login_pass");
            b.length &&
                a.length &&
                ((b = b.val().trim()),
                (a = a.val().trim()),
                b && a ? (tdLogin.addRemoveClass([".td_display_err", 1, "td_display_msg_ok"]), tdLogin.showHideMsg(td_please_wait), tdLogin.doAction("td_mod_login", b, "", a)) : tdLogin.showHideMsg(td_email_user_pass_incorrect));
        },
        handlerRegister: function () {
            var a = jQuery("#register_email"),
                b = jQuery("#register_user");
            a.length &&
                b.length &&
                ((a = a.val().trim()),
                (b = b.val().trim()),
                tdLogin.email_pattern.test(a) && b
                    ? (tdLogin.addRemoveClass([".td_display_err", 1, "td_display_msg_ok"]), tdLogin.showHideMsg(td_please_wait), tdLogin.doAction("td_mod_register", a, b, ""))
                    : tdLogin.showHideMsg(td_email_user_incorrect));
        },
        handlerForgotPass: function () {
            var a = jQuery("#forgot_email");
            a.length &&
                ((a = a.val().trim()),
                tdLogin.email_pattern.test(a)
                    ? (tdLogin.addRemoveClass([".td_display_err", 1, "td_display_msg_ok"]), tdLogin.showHideMsg(td_please_wait), tdLogin.doAction("td_mod_remember_pass", a, "", ""))
                    : tdLogin.showHideMsg(td_email_incorrect));
        },
        showHideElements: function (a) {
            if (a.constructor === Array)
                for (var b = a.length, c = 0; c < b; c++)
                    if (a[c].constructor === Array && 2 === a[c].length) {
                        var d = jQuery(a[c][0]);
                        d.length && (1 === a[c][1] ? d.removeClass("td-display-none").addClass("td-display-block") : d.removeClass("td-display-block").addClass("td-display-none"));
                    }
        },
        showHideElementsMobile: function (a) {
            if (a.constructor === Array)
                for (var b = a.length, c = 0; c < b; c++)
                    if (a[c].constructor === Array && 2 === a[c].length) {
                        var d = jQuery(a[c][0]);
                        d.length && (1 === a[c][1] ? d.removeClass("td-login-hide").addClass("td-login-show") : d.removeClass("td-login-show").addClass("td-login-hide"));
                    }
        },
        showTabs: function (a) {
            if (a.constructor === Array)
                for (var b = a.length, c = 0; c < b; c++)
                    if (a[c].constructor === Array && 2 === a[c].length) {
                        var d = jQuery(a[c][0]);
                        d.length && (1 === a[c][1] ? d.addClass("td_login_tab_focus") : d.removeClass("td_login_tab_focus"));
                    }
        },
        addRemoveClass: function (a) {
            if (a.constructor === Array && 3 === a.length) {
                var b = jQuery(a[0]);
                b.length && (1 === a[1] ? b.addClass(a[2]) : b.removeClass(a[2]));
            }
        },
        showHideMsg: function (a) {
            var b = jQuery(".td_display_err");
            b.length && (void 0 !== a && a.constructor === String && 0 < a.length ? (b.show(), b.html(a)) : (b.hide(), b.html("")));
        },
        clearFields: function () {
            jQuery("#login_email").val("");
            jQuery("#login_pass").val("");
            jQuery("#register_email").val("");
            jQuery("#register_user").val("");
            jQuery("#forgot_email").val("");
        },
        doAction: function (a, b, c, d) {
            jQuery.ajax({
                type: "POST",
                url: td_ajax_url,
                data: { action: a, email: b, user: c, pass: d },
                success: function (a, b, c) {
                    a = jQuery.parseJSON(a);
                    switch (a[0]) {
                        case "login":
                            1 === a[1] ? location.reload(!0) : (tdLogin.addRemoveClass([".td_display_err", 0, "td_display_msg_ok"]), tdLogin.showHideMsg(a[2]));
                            break;
                        case "register":
                            1 === a[1] ? tdLogin.addRemoveClass([".td_display_err", 1, "td_display_msg_ok"]) : tdLogin.addRemoveClass([".td_display_err", 0, "td_display_msg_ok"]);
                            tdLogin.showHideMsg(a[2]);
                            break;
                        case "remember_pass":
                            1 === a[1] ? tdLogin.addRemoveClass([".td_display_err", 1, "td_display_msg_ok"]) : tdLogin.addRemoveClass([".td_display_err", 0, "td_display_msg_ok"]), tdLogin.showHideMsg(a[2]);
                    }
                },
                error: function (a, b, c) {},
            });
        },
    };
})();
jQuery().ready(function () {
    jQuery("#login-link-mob").on("click", function () {
        tdLoginMob.showHideElements([
            ["#td-login-mob", 1],
            ["#td-register-mob", 0],
            ["#td-forgot-pass-mob", 0],
        ]);
        jQuery("#td-mobile-nav").addClass("td-hide-menu-content");
        700 < jQuery(window).width() && !1 === tdDetect.isIe && jQuery("#login_email-mob").focus();
        tdLoginMob.showHideMsg();
    });
    jQuery("#register-link-mob, #signin-register-link-mob").on("click", function () {
        tdLoginMob.showHideElements([
            ["#td-login-mob", 0],
            ["#td-register-mob", 1],
            ["#td-forgot-pass-mob", 0],
        ]);
        jQuery("#td-mobile-nav").addClass("td-hide-menu-content");
        700 < jQuery(window).width() && !1 === tdDetect.isIe && jQuery("#register_email-mob").focus();
        tdLoginMob.showHideMsg();
    });
    jQuery("#forgot-pass-link-mob").on("click", function () {
        tdLoginMob.showHideElements([
            ["#td-login-mob", 0],
            ["#td-register-mob", 0],
            ["#td-forgot-pass-mob", 1],
        ]);
        700 < jQuery(window).width() && !1 === tdDetect.isIe && jQuery("#forgot_email-mob").focus();
        tdLoginMob.showHideMsg();
    });
    jQuery("#login_button-mob").on("click", function () {
        tdLoginMob.handlerLogin();
    });
    jQuery("#login_pass-mob").keydown(function (a) {
        ((a.which && 13 === a.which) || (a.keyCode && 13 === a.keyCode)) && tdLoginMob.handlerLogin();
    });
    jQuery("#register_button-mob").on("click", function () {
        tdLoginMob.handlerRegister();
    });
    jQuery("#register_user-mob").keydown(function (a) {
        ((a.which && 13 === a.which) || (a.keyCode && 13 === a.keyCode)) && tdLoginMob.handlerRegister();
    });
    jQuery("#forgot_button-mob").on("click", function () {
        tdLoginMob.handlerForgotPass();
    });
    jQuery("#forgot_email-mob").keydown(function (a) {
        ((a.which && 13 === a.which) || (a.keyCode && 13 === a.keyCode)) && tdLoginMob.handlerForgotPass();
    });
    jQuery("#td-mobile-nav .td-login-close a, #td-mobile-nav .td-register-close a").on("click", function () {
        tdLoginMob.showHideElements([
            ["#td-login-mob", 0],
            ["#td-register-mob", 0],
            ["#td-forgot-pass-mob", 0],
        ]);
        jQuery("#td-mobile-nav").removeClass("td-hide-menu-content");
    });
    jQuery("#td-mobile-nav .td-forgot-pass-close a").on("click", function () {
        tdLoginMob.showHideElements([
            ["#td-login-mob", 1],
            ["#td-register-mob", 0],
            ["#td-forgot-pass-mob", 0],
        ]);
    });
});
var tdLoginMob = {};
(function () {
    tdLoginMob = {
        email_pattern: /^[a-zA-Z0-9][a-zA-Z0-9_\.-]{0,}[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9_\.-]{0,}[a-z0-9][\.][a-z0-9]{2,4}$/,
        handlerLogin: function () {
            var a = jQuery("#login_email-mob"),
                b = jQuery("#login_pass-mob");
            a.length &&
                b.length &&
                ((a = a.val().trim()),
                (b = b.val().trim()),
                a && b
                    ? (tdLoginMob.addRemoveClass([".td_display_err", 1, "td_display_msg_ok"]), tdLoginMob.showHideMsg(td_please_wait), tdLoginMob.doAction("td_mod_login", a, "", b))
                    : tdLoginMob.showHideMsg(td_email_user_pass_incorrect));
        },
        handlerRegister: function () {
            var a = jQuery("#register_email-mob"),
                b = jQuery("#register_user-mob");
            a.length &&
                b.length &&
                ((a = a.val().trim()),
                (b = b.val().trim()),
                tdLoginMob.email_pattern.test(a) && b
                    ? (tdLoginMob.addRemoveClass([".td_display_err", 1, "td_display_msg_ok"]), tdLoginMob.showHideMsg(td_please_wait), tdLoginMob.doAction("td_mod_register", a, b, ""))
                    : tdLoginMob.showHideMsg(td_email_user_incorrect));
        },
        handlerForgotPass: function () {
            var a = jQuery("#forgot_email-mob");
            a.length &&
                ((a = a.val().trim()),
                tdLoginMob.email_pattern.test(a)
                    ? (tdLoginMob.addRemoveClass([".td_display_err", 1, "td_display_msg_ok"]), tdLoginMob.showHideMsg(td_please_wait), tdLoginMob.doAction("td_mod_remember_pass", a, "", ""))
                    : tdLoginMob.showHideMsg(td_email_incorrect));
        },
        showHideElements: function (a) {
            if (a.constructor === Array)
                for (var b = a.length, c = 0; c < b; c++)
                    if (a[c].constructor === Array && 2 === a[c].length) {
                        var d = jQuery(a[c][0]);
                        d.length && (1 === a[c][1] ? d.removeClass("td-login-hide").addClass("td-login-show") : d.removeClass("td-login-show").addClass("td-login-hide"));
                    }
        },
        addRemoveClass: function (a) {
            if (a.constructor === Array && 3 === a.length) {
                var b = jQuery(a[0]);
                b.length && (1 === a[1] ? b.addClass(a[2]) : b.removeClass(a[2]));
            }
        },
        showHideMsg: function (a) {
            var b = jQuery(".td_display_err");
            b.length && (void 0 !== a && a.constructor === String && 0 < a.length ? (b.show(), b.html(a)) : (b.hide(), b.html("")));
        },
        clearFields: function () {
            jQuery("#login_email-mob").val("");
            jQuery("#login_pass-mob").val("");
            jQuery("#register_email-mob").val("");
            jQuery("#register_user-mob").val("");
            jQuery("#forgot_email-mob").val("");
        },
        doAction: function (a, b, c, d) {
            jQuery.ajax({
                type: "POST",
                url: td_ajax_url,
                data: { action: a, email: b, user: c, pass: d },
                success: function (a, b, c) {
                    a = jQuery.parseJSON(a);
                    switch (a[0]) {
                        case "login":
                            1 === a[1] ? location.reload(!0) : (tdLoginMob.addRemoveClass([".td_display_err", 0, "td_display_msg_ok"]), tdLoginMob.showHideMsg(a[2]));
                            break;
                        case "register":
                            1 === a[1] ? tdLoginMob.addRemoveClass([".td_display_err", 1, "td_display_msg_ok"]) : tdLoginMob.addRemoveClass([".td_display_err", 0, "td_display_msg_ok"]);
                            tdLoginMob.showHideMsg(a[2]);
                            break;
                        case "remember_pass":
                            1 === a[1] ? tdLoginMob.addRemoveClass([".td_display_err", 1, "td_display_msg_ok"]) : tdLoginMob.addRemoveClass([".td_display_err", 0, "td_display_msg_ok"]), tdLoginMob.showHideMsg(a[2]);
                    }
                },
                error: function (a, b, c) {},
            });
        },
    };
})();
var tdDemoMenu;
(function (a, b) {
    tdDemoMenu = {
        mousePosX: 0,
        mousePosY: 0,
        init: function () {
            a(document).mousemove(function (a) {
                if (a.pageX || a.pageY) (tdDemoMenu.mousePosX = a.pageX), (tdDemoMenu.mousePosY = a.pageY);
                else if (a.clientX || a.clientY)
                    (tdDemoMenu.mousePosX = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft), (tdDemoMenu.mousePosY = a.clientY + document.body.scrollTop + document.documentElement.scrollTop);
            });
            a(document).mouseleave(function (b) {
                a(".td-screen-demo:first").css("visibility", "hidden");
            });
            a("#td-theme-settings")
                .find(".td-skin-wrap:first")
                .scroll(function (b) {
                    b = b.currentTarget;
                    var c = a(this).find(".td-skin-scroll:first");
                    b.clientHeight + b.scrollTop < b.scrollHeight ? c.css({ bottom: 0 }) : c.css({ bottom: -40 });
                });
            a("#td-theme-settings")
                .find(".td-skin-scroll:first")
                .click(function (b) {
                    b = a(this).closest(".td-skin-wrap");
                    b.animate({ scrollTop: b.scrollTop() + 200 }, { duration: 800, easing: "easeInOutQuart" });
                })
                .mouseenter(function (b) {
                    a("#td-theme-settings").find(".td-screen-demo:first").css("visibility", "hidden");
                });
            a(".td-set-theme-style-link")
                .hover(
                    function (b) {
                        var c = a(this),
                            f = c.closest(".td-set-theme-style"),
                            e = a(".td-screen-demo:first"),
                            l = 0,
                            g = 0;
                        var q = a("#wpadminbar");
                        var u = e.find("img:first");
                        c = c.data("img-url");
                        u.length ? u.replaceWith('<img src="' + c + '"/>') : e.html('<img src="' + c + '"/>');
                        0 === a(".td-set-theme-style-link").index(this) % 2
                            ? (l = 2 * f.outerWidth(!0))
                            : ((f = f.prev(".td-set-theme-style")), f.length && ((l = f.outerWidth(!0) - 0), (g = f.outerWidth(!0) + 0)), b.preventDefault(), b.stopPropagation());
                        b = b.pageY - document.body.scrollTop - e.outerHeight(!0) / 2;
                        b + e.outerHeight(!0) > window.innerHeight && (b -= b + e.outerHeight(!0) - window.innerHeight);
                        q = q.length ? q.outerHeight(!0) : 0;
                        q > b && (b = q);
                        q = { top: b, right: l, width: "" };
                        b = e.data("width-preview");
                        0 < g && (q.width = b + g);
                        e.css(q);
                        e.data("right-value", l + g);
                        e.css("visibility", "visible");
                    },
                    function (b) {
                        a(".td-screen-demo:first").css("visibility", "hidden");
                    }
                )
                .mousemove(function (a) {
                    tdDemoMenu._moveScreenDemo(a);
                });
        },
        _moveScreenDemo: function (b) {
            var c = a(".td-screen-demo:first"),
                f = a("#wpadminbar"),
                e = b.pageY - document.body.scrollTop - c.outerHeight(!0) / 2;
            f = f.length ? f.outerHeight(!0) : 0;
            f > e && (e = f);
            0 > e ? (e = 0) : a(window).height() - c.outerHeight(!0) / 2 < b.pageY - document.body.scrollTop && (e = a(window).height() - c.outerHeight(!0));
            c.css("top", e);
        },
        _checkMousePosition: function () {
            var c;
            a(".td-set-theme-style-link").each(function (b, f) {
                tdDemoMenu._log(b);
                b = a(f).closest(".td-set-theme-style");
                var d = !1,
                    l = !1;
                if (0 === a(".td-set-theme-style-link").index(f) % 2)
                    parseInt(b.position().top) + parseInt(a(window).scrollTop()) < tdDemoMenu.mousePosY &&
                        tdDemoMenu.mousePosY < parseInt(b.position().top) + parseInt(a(window).scrollTop()) + parseInt(b.outerHeight()) &&
                        ((d = !0), parseInt(a(window).width()) - 2 * parseInt(b.outerWidth()) < tdDemoMenu.mousePosX && tdDemoMenu.mousePosX < parseInt(a(window).width()) - parseInt(b.outerWidth()) && (l = !0));
                else {
                    var g = b.prev(".td-set-theme-style");
                    g.length &&
                        parseInt(g.position().top) + parseInt(a(window).scrollTop()) < tdDemoMenu.mousePosY &&
                        tdDemoMenu.mousePosY < parseInt(g.position().top) + parseInt(a(window).scrollTop()) + parseInt(g.outerHeight()) &&
                        ((d = !0), parseInt(a(window).width()) - parseInt(b.outerWidth()) < tdDemoMenu.mousePosX && tdDemoMenu.mousePosX < parseInt(a(window).width()) && (l = !0));
                }
                if (d && l) return (c = f), !1;
            });
            b === c ? a("#td-theme-settings").find(".td-screen-demo:first").css("visibility", "hidden") : a(c).mouseenter();
        },
        _log: function (a) {},
    };
})(jQuery);
var tdTrendingNow = {};
(function () {
    tdTrendingNow = {
        items: [],
        item: function () {
            this.blockUid = "";
            this.trendingNowAutostart = "manual";
            this.trendingNowPosition = this.trendingNowTimer = 0;
            this.trendingNowPosts = [];
            this._is_initialized = !1;
        },
        init: function () {
            tdTrendingNow.items = [];
        },
        _initialize_item: function (a) {
            !0 !== a._is_initialized && (a._is_initialized = !0);
        },
        addItem: function (a) {
            if ("undefined" === typeof a.blockUid) throw "item.blockUid is not valid";
            if ("undefined" === typeof a.trendingNowPosts || 1 > a.trendingNowPosts.length) throw "item.trendingNowPosts is not valid";
            tdTrendingNow.items.push(a);
            tdTrendingNow._initialize_item(a);
            tdTrendingNow.tdTrendingNowAutoStart(a.blockUid);
        },
        deleteItem: function (a) {
            for (var b = 0; b < tdTrendingNow.items.length; b++) if (tdTrendingNow.items[b].blockUid === a) return tdTrendingNow.items.splice(b, 1), !0;
            return !1;
        },
        itemPrev: function (a) {
            for (var b, c = 0; c < tdTrendingNow.items.length; c++) tdTrendingNow.items[c].blockUid === a && (b = tdTrendingNow.items[c]);
            (void 0 !== a && 1 >= b.trendingNowPosts.length) ||
                ("manual" !== b.trendingNowAutostart &&
                    (clearInterval(b.trendingNowTimer),
                    (b.trendingNowTimer = setInterval(function () {
                        tdTrendingNow.tdTrendingNowChangeText([a, "left"], !0);
                    }, 3e3))),
                tdTrendingNow.tdTrendingNowChangeText([a, "right"], !1));
        },
        itemNext: function (a) {
            for (var b, c = 0; c < tdTrendingNow.items.length; c++) tdTrendingNow.items[c].blockUid === a && (b = tdTrendingNow.items[c]);
            (void 0 !== a && 1 >= b.trendingNowPosts.length) ||
                ("manual" !== b.trendingNowAutostart &&
                    (clearInterval(b.trendingNowTimer),
                    (b.trendingNowTimer = setInterval(function () {
                        tdTrendingNow.tdTrendingNowChangeText([a, "left"], !0);
                    }, 3e3))),
                tdTrendingNow.tdTrendingNowChangeText([a, "left"], !0));
        },
        tdTrendingNowChangeText: function (a, b) {
            var c = a[0];
            a = a[1];
            for (var d = [], f = 0, e, l = 0; l < tdTrendingNow.items.length; l++) tdTrendingNow.items[l].blockUid === c && ((e = l), (d = tdTrendingNow.items[l].trendingNowPosts), (f = tdTrendingNow.items[l].trendingNowPosition));
            if ("undefined" !== typeof e && null !== e && ((c = f), (l = d.length - 1), !(1 > l))) {
                "left" === a ? ((f += 1), f > l && (f = 0)) : (--f, 0 > f && (f = l));
                tdTrendingNow.items[e].trendingNowPosition = f;
                d[c].css("opacity", 0);
                d[c].css("z-index", 0);
                for (var g in d) !0 === d.hasOwnProperty(g) && d[g].removeClass("td_animated_xlong td_fadeInLeft td_fadeInRight td_fadeOutLeft td_fadeOutRight");
                d[f].css("opacity", 1);
                d[f].css("z-index", 1);
                !0 === b ? (d[c].addClass("td_animated_xlong td_fadeOutLeft"), d[f].addClass("td_animated_xlong td_fadeInRight")) : (d[c].addClass("td_animated_xlong td_fadeOutRight"), d[f].addClass("td_animated_xlong td_fadeInLeft"));
            }
        },
        tdTrendingNowAutoStart: function (a) {
            for (var b = 0; b < tdTrendingNow.items.length; b++)
                tdTrendingNow.items[b].blockUid === a && "manual" !== tdTrendingNow.items[b].trendingNowAutostart && (tdTrendingNow.items[b].trendingNowTimer = tdTrendingNow.setTimerChangingText(a));
        },
        setTimerChangingText: function (a) {
            return setInterval(function () {
                tdTrendingNow.tdTrendingNowChangeText([a, "left"], !0);
            }, 3e3);
        },
    };
    tdTrendingNow.init();
})();
("use strict");
var td_history = {
    td_history_change_event: !1,
    init: function () {
        window.addEventListener("popstate", function (a) {
            td_history.td_history_change_event = !0;
            "undefined" != typeof a.state && null != a.state && jQuery("#" + a.state.slide_id).iosSlider("goToSlide", a.state.current_slide);
        });
    },
    replace_history_entry: function (a) {
        !1 !== tdDetect.hasHistory && history.replaceState(a, null);
    },
    add_history_entry: function (a, b, c) {
        if (!1 !== tdDetect.hasHistory)
            if ("" == c) history.pushState(a, null, null);
            else {
                var d = td_history.get_query_parameter("p");
                "" != d
                    ? 1 == c
                        ? history.pushState(a, null, "?p=" + d)
                        : history.pushState(a, null, "?p=" + d + "&" + b + "=" + c)
                    : 1 == c
                    ? history.pushState(a, null, td_history.get_mod_rewrite_base_url())
                    : history.pushState(a, null, td_history.get_mod_rewrite_base_url() + c + "/");
            }
    },
    get_mod_rewrite_base_url: function () {
        var a = document.URL;
        "/" == a.charAt(a.length - 1) && (a = a.slice(0, -1));
        return !1 === td_history.get_mod_rewrite_pagination(document.URL) ? document.URL : a.substring(0, a.lastIndexOf("/")) + "/";
    },
    get_mod_rewrite_pagination: function () {
        var a = document.URL;
        "/" == a.charAt(a.length - 1) && (a = a.slice(0, -1));
        a = a.substring(a.lastIndexOf("/") + 1, a.length);
        return td_history.isInt(a) ? a : !1;
    },
    get_current_page: function (a) {
        if ("" != td_history.get_query_parameter("p")) return (a = td_history.get_query_parameter(a)), "" != a ? a : 1;
        a = td_history.get_mod_rewrite_pagination();
        return !1 !== a ? a : 1;
    },
    isInt: function (a) {
        return 0 === a % 1;
    },
    get_query_parameter: function (a) {
        a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        a = new RegExp("[\\?&]" + a + "=([^&#]*)").exec(location.search);
        return null == a ? "" : decodeURIComponent(a[1].replace(/\+/g, " "));
    },
    slide_changed_callback: function (a) {
        if (!0 === td_history.td_history_change_event) td_history.td_history_change_event = !1;
        else {
            var b = a.currentSlideNumber;
            a = a.sliderContainerObject.attr("id");
            td_history.add_history_entry({ current_slide: b, slide_id: a }, "slide", b);
        }
    },
};
window.history && window.history.pushState && td_history.init();
var tdSmartSidebar = {};
(function () {
    tdSmartSidebar = {
        hasItems: !1,
        items: [],
        scroll_window_scrollTop_last: 0,
        tds_snap_menu: tdUtil.getBackendVar("tds_snap_menu"),
        is_enabled: !0,
        is_enabled_state_run_once: !1,
        is_disabled_state_run_once: !1,
        is_tablet_grid: !1,
        _view_port_current_interval_index: tdViewport.getCurrentIntervalIndex(),
        item: function () {
            this.sidebar_jquery_obj = this.content_jquery_obj = "";
            this.content_bottom = this.content_top = this.sidebar_height = this.sidebar_bottom = this.sidebar_top = 0;
            this.sidebar_state = "";
            this.case_3_run_once = this.case_2_run_once = this.case_1_run_once = !1;
            this.case_3_last_content_height = this.case_3_last_sidebar_height = 0;
            this.case_4_run_once = !1;
            this.case_4_last_menu_offset = 0;
            this.case_6_run_once = this.case_5_run_once = !1;
        },
        add_item: function (a) {
            tdSmartSidebar.hasItems = !0;
            a.sidebar_jquery_obj.prepend('<div class="clearfix"></div>').append('<div class="clearfix"></div>');
            a.content_jquery_obj.prepend('<div class="clearfix"></div>').append('<div class="clearfix"></div>');
            tdSmartSidebar.items.push(a);
        },
        td_events_scroll: function (a) {
            if (!1 !== tdSmartSidebar.hasItems)
                if (!1 === tdSmartSidebar.is_enabled) {
                    if (!1 === tdSmartSidebar.is_disabled_state_run_once) {
                        tdSmartSidebar.is_disabled_state_run_once = !0;
                        for (var b = 0; b < tdSmartSidebar.items.length; b++) tdSmartSidebar.items[b].sidebar_jquery_obj.css({ width: "auto", position: "static", top: "auto", bottom: "auto" });
                        tdSmartSidebar.log("smart_sidebar_disabled");
                    }
                } else
                    window.requestAnimationFrame(function () {
                        var b = 0;
                        "" !== tdSmartSidebar.tds_snap_menu && ((b = tdAffix._get_menu_affix_height()), "smart_snap_always" === tdAffix.tds_snap_menu && (b += tdAffix.menu_offset));
                        "undefined" !== typeof window.tdThemeName && "Newspaper" === window.tdThemeName && (b += 20);
                        var d = "";
                        a !== tdSmartSidebar.scroll_window_scrollTop_last && (d = a > tdSmartSidebar.scroll_window_scrollTop_last ? "down" : "up");
                        tdSmartSidebar.scroll_window_scrollTop_last = a;
                        var f = jQuery(window).height(),
                            e = a + f;
                        a += b;
                        for (var l = 0; l < tdSmartSidebar.items.length; l++) {
                            var g = tdSmartSidebar.items[l];
                            g.content_top = g.content_jquery_obj.offset().top;
                            g.content_height = g.content_jquery_obj.height();
                            g.content_bottom = g.content_top + g.content_height;
                            g.sidebar_top = g.sidebar_jquery_obj.offset().top;
                            g.sidebar_height = g.sidebar_jquery_obj.height();
                            g.sidebar_bottom = g.sidebar_top + g.sidebar_height;
                            if (g.content_height <= g.sidebar_height) g.sidebar_state = "case_6_content_too_small";
                            else if (g.sidebar_height < f) {
                                var q = g.content_top;
                                tdAffix.is_menu_affix || "undefined" === typeof window.tdThemeName || "Newsmag" !== window.tdThemeName || "smart_snap_always" !== tdAffix.tds_snap_menu || (q += b);
                                tdSmartSidebar._is_smaller_or_equal(a, q)
                                    ? (g.sidebar_state = "case_2_top_of_content")
                                    : !0 === tdSmartSidebar._is_smaller(g.sidebar_bottom, a)
                                    ? tdSmartSidebar._is_smaller(a, g.content_bottom - g.sidebar_height)
                                        ? (g.sidebar_state = "case_4_fixed_up")
                                        : (g.sidebar_state = "case_3_bottom_of_content")
                                    : tdSmartSidebar._is_smaller_or_equal(g.content_bottom, g.sidebar_bottom)
                                    ? "up" === d && tdSmartSidebar._is_smaller_or_equal(a, g.sidebar_top)
                                        ? (g.sidebar_state = "case_4_fixed_up")
                                        : (g.sidebar_state = "case_3_bottom_of_content")
                                    : (g.sidebar_state = g.content_bottom - a >= g.sidebar_height ? "case_4_fixed_up" : "case_3_bottom_of_content");
                            } else if (
                                (!0 === tdSmartSidebar._is_smaller(g.sidebar_bottom, a)
                                    ? !0 === tdSmartSidebar._is_smaller_or_equal(a, g.sidebar_top) && !0 === tdSmartSidebar._is_smaller_or_equal(g.content_top, a)
                                        ? (g.sidebar_state = "case_4_fixed_up")
                                        : !0 === tdSmartSidebar._is_smaller(g.sidebar_bottom, e) && !0 === tdSmartSidebar._is_smaller(g.sidebar_bottom, g.content_bottom) && g.content_bottom >= e
                                        ? (g.sidebar_state = "case_1_fixed_down")
                                        : (g.sidebar_state = "case_3_bottom_of_content")
                                    : !0 === tdSmartSidebar._is_smaller(g.sidebar_bottom, e) && !0 === tdSmartSidebar._is_smaller(g.sidebar_bottom, g.content_bottom) && "down" === d && g.content_bottom >= e
                                    ? (g.sidebar_state = "case_1_fixed_down")
                                    : !0 === tdSmartSidebar._is_smaller_or_equal(g.sidebar_top, g.content_top) && "up" === d && g.content_bottom >= e
                                    ? (g.sidebar_state = "case_2_top_of_content")
                                    : (!0 === tdSmartSidebar._is_smaller_or_equal(g.content_bottom, g.sidebar_bottom) && "down" === d) || g.content_bottom < e
                                    ? (g.sidebar_state = "case_3_bottom_of_content")
                                    : !0 === tdSmartSidebar._is_smaller_or_equal(a, g.sidebar_top) && "up" === d && !0 === tdSmartSidebar._is_smaller_or_equal(g.content_top, a)
                                    ? (g.sidebar_state = "case_4_fixed_up")
                                    : "up" === d && !0 === tdSmartSidebar._is_smaller_or_equal(e, g.sidebar_top) && (g.sidebar_state = "case_2_top_of_content"),
                                ("case_1_fixed_down" === g.sidebar_state && "up" === d) || ("case_4_fixed_up" === g.sidebar_state && "down" === d))
                            )
                                g.sidebar_state = "case_5_absolute";
                            q = 0;
                            null !== tdViewport.getCurrentIntervalItem() && ((q = g.sidebar_jquery_obj.parent(".vc_column, .td-main-sidebar, .vc_column-inner, .vc_column_inner").width()), g.sidebar_jquery_obj.width(q));
                            switch (g.sidebar_state) {
                                case "case_1_fixed_down":
                                    if (!0 === g.case_1_run_once) break;
                                    tdSmartSidebar.log("sidebar_id: " + l + " " + g.sidebar_state);
                                    g.case_1_run_once = !0;
                                    g.case_2_run_once = !1;
                                    g.case_3_run_once = !1;
                                    g.case_4_run_once = !1;
                                    g.case_5_run_once = !1;
                                    g.case_6_run_once = !1;
                                    g.sidebar_jquery_obj.css({ width: q, position: "fixed", top: "auto", bottom: "0", "z-index": "1" });
                                    break;
                                case "case_2_top_of_content":
                                    if (!0 === g.case_2_run_once) break;
                                    tdSmartSidebar.log("sidebar_id: " + l + " " + g.sidebar_state);
                                    g.case_1_run_once = !1;
                                    g.case_2_run_once = !0;
                                    g.case_3_run_once = !1;
                                    g.case_4_run_once = !1;
                                    g.case_5_run_once = !1;
                                    g.case_6_run_once = !1;
                                    g.sidebar_jquery_obj.css({ width: "auto", position: "static", top: "auto", bottom: "auto" });
                                    break;
                                case "case_3_bottom_of_content":
                                    if (!0 === g.case_3_run_once && g.case_3_last_sidebar_height === g.sidebar_height && g.case_3_last_content_height === g.content_height) break;
                                    tdSmartSidebar.log("sidebar_id: " + l + " " + g.sidebar_state);
                                    g.case_1_run_once = !1;
                                    g.case_2_run_once = !1;
                                    g.case_3_run_once = !0;
                                    g.case_3_last_sidebar_height = g.sidebar_height;
                                    g.case_3_last_content_height = g.content_height;
                                    g.case_4_run_once = !1;
                                    g.case_5_run_once = !1;
                                    g.case_6_run_once = !1;
                                    g.sidebar_jquery_obj.css({ width: q, position: "absolute", top: g.content_bottom - g.sidebar_height - g.content_top, bottom: "auto" });
                                    break;
                                case "case_4_fixed_up":
                                    if (!0 === g.case_4_run_once && g.case_4_last_menu_offset === b) break;
                                    tdSmartSidebar.log("sidebar_id: " + l + " " + g.sidebar_state);
                                    g.case_1_run_once = !1;
                                    g.case_2_run_once = !1;
                                    g.case_3_run_once = !1;
                                    g.case_4_run_once = !0;
                                    g.case_4_last_menu_offset = b;
                                    g.case_5_run_once = !1;
                                    g.case_6_run_once = !1;
                                    g.sidebar_jquery_obj.css({ width: q, position: "fixed", top: b, bottom: "auto" });
                                    break;
                                case "case_5_absolute":
                                    if (!0 === g.case_5_run_once) break;
                                    tdSmartSidebar.log("sidebar_id: " + l + " " + g.sidebar_state);
                                    g.case_1_run_once = !1;
                                    g.case_2_run_once = !1;
                                    g.case_3_run_once = !1;
                                    g.case_4_run_once = !1;
                                    g.case_5_run_once = !0;
                                    g.case_6_run_once = !1;
                                    g.sidebar_jquery_obj.css({ width: q, position: "absolute", top: g.sidebar_top - g.content_top, bottom: "auto" });
                                    break;
                                case "case_6_content_too_small":
                                    !0 !== g.case_6_run_once &&
                                        (tdSmartSidebar.log("sidebar_id: " + l + " " + g.sidebar_state),
                                        (g.case_1_run_once = !1),
                                        (g.case_2_run_once = !1),
                                        (g.case_3_run_once = !1),
                                        (g.case_4_run_once = !1),
                                        (g.case_5_run_once = !1),
                                        (g.case_6_run_once = !0),
                                        g.sidebar_jquery_obj.css({ width: "auto", position: "static", top: "auto", bottom: "auto" }));
                            }
                        }
                    });
        },
        compute: function () {
            tdSmartSidebar.td_events_scroll(jQuery(window).scrollTop());
        },
        reset_run_once_flags: function () {
            for (var a = 0; a < tdSmartSidebar.items.length; a++)
                (tdSmartSidebar.items[a].case_1_run_once = !1),
                    (tdSmartSidebar.items[a].case_2_run_once = !1),
                    (tdSmartSidebar.items[a].case_3_run_once = !1),
                    (tdSmartSidebar.items[a].case_3_last_sidebar_height = 0),
                    (tdSmartSidebar.items[a].case_3_last_content_height = 0),
                    (tdSmartSidebar.items[a].case_4_run_once = !1),
                    (tdSmartSidebar.items[a].case_4_last_menu_offset = 0),
                    (tdSmartSidebar.items[a].case_5_run_once = !1),
                    (tdSmartSidebar.items[a].case_6_run_once = !1);
        },
        td_events_resize: function () {
            tdSmartSidebar._view_port_current_interval_index = tdViewport.getCurrentIntervalIndex();
            switch (tdSmartSidebar._view_port_current_interval_index) {
                case 0:
                    tdSmartSidebar.is_enabled = !1;
                    tdSmartSidebar.is_enabled_state_run_once = !1;
                    break;
                case 1:
                    !1 === tdSmartSidebar.is_tablet_grid && (tdSmartSidebar.reset_run_once_flags(), (tdSmartSidebar.is_tablet_grid = !0), (tdSmartSidebar.is_desktop_grid = !1), tdSmartSidebar.log("view port tablet"));
                    tdSmartSidebar.is_enabled = !0;
                    tdSmartSidebar.is_disabled_state_run_once = !1;
                    !1 === tdSmartSidebar.is_enabled_state_run_once && ((tdSmartSidebar.is_enabled_state_run_once = !0), tdSmartSidebar.log("smart_sidebar_enabled"));
                    break;
                case 2:
                case 3:
                    !0 === tdSmartSidebar.is_tablet_grid && (tdSmartSidebar.reset_run_once_flags(), (tdSmartSidebar.is_tablet_grid = !1), (tdSmartSidebar.is_desktop_grid = !0), tdSmartSidebar.log("view port desktop")),
                        (tdSmartSidebar.is_enabled = !0),
                        (tdSmartSidebar.is_disabled_state_run_once = !1),
                        !1 === tdSmartSidebar.is_enabled_state_run_once && ((tdSmartSidebar.is_enabled_state_run_once = !0), tdSmartSidebar.log("smart_sidebar_enabled"));
            }
            tdSmartSidebar.compute();
        },
        log: function (a) {},
        _is_smaller_or_equal: function (a, b) {
            return 1 <= Math.abs(a - b) ? (a < b ? !0 : !1) : !0;
        },
        _is_smaller: function (a, b) {
            return 1 <= Math.abs(a - b) ? (a < b ? !0 : !1) : !1;
        },
    };
})();
var tdInfiniteLoader = {};
(function () {
    tdInfiniteLoader = {
        hasItems: !1,
        items: [],
        item: function () {
            this.jqueryObj = this.uid = "";
            this.bottomTop = 0;
            this.isVisibleCallbackEnabled = !0;
            this.isVisibleCallback = function () {};
        },
        addItem: function (a) {
            tdInfiniteLoader.hasItems = !0;
            tdInfiniteLoader.items.push(a);
        },
        computeTopDistances: function () {
            !1 !== tdInfiniteLoader.hasItems &&
                (jQuery.each(tdInfiniteLoader.items, function (a, b) {
                    b = tdInfiniteLoader.items[a].jqueryObj.offset().top;
                    tdInfiniteLoader.items[a].bottomTop = b + tdInfiniteLoader.items[a].jqueryObj.height();
                }),
                tdInfiniteLoader.computeEvents());
        },
        computeEvents: function () {
            if (!1 !== tdInfiniteLoader.hasItems) {
                var a = jQuery(window).height() + jQuery(window).scrollTop();
                jQuery.each(tdInfiniteLoader.items, function (b, c) {
                    tdInfiniteLoader.items[b].bottomTop < a + 700 && !0 === tdInfiniteLoader.items[b].isVisibleCallbackEnabled && ((tdInfiniteLoader.items[b].isVisibleCallbackEnabled = !1), tdInfiniteLoader.items[b].isVisibleCallback());
                });
            }
        },
        enable_is_visible_callback: function (a) {
            jQuery.each(tdInfiniteLoader.items, function (b, c) {
                if (c.uid === a) return (tdInfiniteLoader.items[b].isVisibleCallbackEnabled = !0), !1;
            });
        },
    };
    jQuery(".td_ajax_infinite").each(function () {
        var a = new tdInfiniteLoader.item();
        a.jqueryObj = jQuery(this);
        a.uid = jQuery(this).data("td_block_id");
        a.isVisibleCallback = function () {
            var b = tdBlocks.tdGetBlockObjById(a.jqueryObj.data("td_block_id"));
            "" === b.ajax_pagination_infinite_stop || b.td_current_page < parseInt(b.ajax_pagination_infinite_stop) + 1
                ? (b.td_current_page++, tdBlocks.tdAjaxDoBlockRequest(b, "infinite_load"))
                : b.td_current_page < b.max_num_pages &&
                  setTimeout(function () {
                      jQuery("#infinite-lm-" + b.id)
                          .css("display", "block")
                          .css("visibility", "visible");
                  }, 400);
        };
        tdInfiniteLoader.addItem(a);
    });
    jQuery(window).load(function () {
        tdInfiniteLoader.computeTopDistances();
    });
    jQuery().ready(function () {
        tdInfiniteLoader.computeTopDistances();
    });
})();
("use strict");
var Froogaloop = (function () {
        function a(b) {
            return new a.fn.init(b);
        }
        function b(a, b, c) {
            if (!c.contentWindow.postMessage) return !1;
            var d = c.getAttribute("src").split("?")[0];
            a = JSON.stringify({ method: a, value: b });
            "//" === d.substr(0, 2) && (d = window.location.protocol + d);
            c.contentWindow.postMessage(a, d);
        }
        function c(a) {
            try {
                var b = JSON.parse(a.data);
                var c = b.event || b.method;
            } catch (C) {}
            "ready" == c && !e && (e = !0);
            if (a.origin != l) return !1;
            a = b.value;
            var d = b.data,
                g = "" === g ? null : b.player_id;
            b = g ? f[g][c] : f[c];
            c = [];
            if (!b) return !1;
            void 0 !== a && c.push(a);
            d && c.push(d);
            g && c.push(g);
            return 0 < c.length ? b.apply(null, c) : b.call();
        }
        function d(a, b, c) {
            c ? (f[c] || (f[c] = {}), (f[c][a] = b)) : (f[a] = b);
        }
        var f = {},
            e = !1,
            l = "";
        a.fn = a.prototype = {
            element: null,
            init: function (a) {
                "string" === typeof a && (a = document.getElementById(a));
                this.element = a;
                a = this.element.getAttribute("src");
                "//" === a.substr(0, 2) && (a = window.location.protocol + a);
                a = a.split("/");
                for (var b = "", c = 0, d = a.length; c < d; c++) {
                    if (3 > c) b += a[c];
                    else break;
                    2 > c && (b += "/");
                }
                l = b;
                return this;
            },
            api: function (a, c) {
                if (!this.element || !a) return !1;
                var e = this.element,
                    f = "" !== e.id ? e.id : null,
                    g = c && c.constructor && c.call && c.apply ? null : c;
                (c = c && c.constructor && c.call && c.apply ? c : null) && d(a, c, f);
                b(a, g, e);
                return this;
            },
            addEvent: function (a, c) {
                if (!this.element) return !1;
                var f = this.element,
                    g = "" !== f.id ? f.id : null;
                d(a, c, g);
                "ready" != a ? b("addEventListener", a, f) : "ready" == a && e && c.call(null, g);
                return this;
            },
            removeEvent: function (a) {
                if (!this.element) return !1;
                var c = this.element,
                    d;
                a: {
                    if ((d = "" !== c.id ? c.id : null) && f[d]) {
                        if (!f[d][a]) {
                            d = !1;
                            break a;
                        }
                        f[d][a] = null;
                    } else {
                        if (!f[a]) {
                            d = !1;
                            break a;
                        }
                        f[a] = null;
                    }
                    d = !0;
                }
                "ready" != a && d && b("removeEventListener", a, c);
            },
        };
        a.fn.init.prototype = a.fn;
        window.addEventListener ? window.addEventListener("message", c, !1) : window.attachEvent("onmessage", c);
        return (window.Froogaloop = window.$f = a);
    })(),
    tdCustomEvents = {};
(function () {
    tdCustomEvents = {
        _callback_scroll: function () {
            tdAnimationScroll.compute_all_items();
        },
        _callback_resize: function () {},
        _lazy_callback_scroll_100: function () {
            !0 === tdAnimationStack.activated && tdAnimationStack.td_events_scroll();
        },
        _lazy_callback_scroll_500: function () {},
        _lazy_callback_resize_100: function () {
            tdPullDown.td_events_resize();
            tdBackstr.td_events_resize();
            tdAnimationScroll.td_events_resize();
        },
        _lazy_callback_resize_500: function () {
            !0 === tdAnimationStack.activated && tdAnimationStack.td_events_resize();
            for (var a = 0; a < td_backstretch_items.length; a++) tdAnimationScroll.reinitialize_item(td_backstretch_items[a], !0), td_compute_backstretch_item(td_backstretch_items[a]);
            tdAnimationScroll.compute_all_items();
            jQuery("body")
                .find(".tdc-video-inner-wrapper")
                .each(function () {
                    var a = jQuery(this),
                        c = a.find("iframe");
                    if (c.length) {
                        var d = c.attr("aspect-ratio");
                        if ("undefined" !== typeof d) {
                            var f = a.width();
                            a = a.height();
                            var e = a / f;
                            d < e ? c.css({ width: a / d, height: a }) : d > e && c.css({ width: "100%", height: d * f });
                        }
                    }
                });
            for (a = 0; a < tdAnimationScroll.items.length; a++) "undefined" !== typeof tdAnimationScroll.items[a].td_video_parallax && tdAnimationScroll.reinitialize_item(tdAnimationScroll.items[a], !0);
        },
    };
})();
var tdEvents = {};
(function () {
    tdEvents = {
        scroll_event_slow_run: !1,
        scroll_event_medium_run: !1,
        resize_event_slow_run: !1,
        resize_event_medium_run: !1,
        scroll_window_scrollTop: 0,
        window_pageYOffset: window.pageYOffset,
        window_innerHeight: window.innerHeight,
        window_innerWidth: window.innerWidth,
        init: function () {
            jQuery(window).scroll(function () {
                tdEvents.scroll_event_slow_run = !0;
                tdEvents.scroll_event_medium_run = !0;
                tdEvents.scroll_window_scrollTop = jQuery(window).scrollTop();
                tdEvents.window_pageYOffset = window.pageYOffset;
                tdAffix.td_events_scroll(tdEvents.scroll_window_scrollTop);
                tdSmartSidebar.td_events_scroll(tdEvents.scroll_window_scrollTop);
                tdCustomEvents._callback_scroll();
                tdHeader.scroll();
                tdShowVideo.scroll();
            });
            jQuery(window).resize(function () {
                tdEvents.resize_event_slow_run = !0;
                tdEvents.resize_event_medium_run = !0;
                tdEvents.window_innerHeight = window.innerHeight;
                tdEvents.window_innerWidth = window.innerWidth;
                tdCustomEvents._callback_resize();
                tdHeader.resize();
            });
            setInterval(function () {
                tdViewport.detectChanges();
                tdEvents.scroll_event_medium_run && ((tdEvents.scroll_event_medium_run = !1), tdInfiniteLoader.computeEvents(), tdCustomEvents._lazy_callback_scroll_100());
                tdEvents.resize_event_medium_run && ((tdEvents.resize_event_medium_run = !1), tdSmartSidebar.td_events_resize(), tdCustomEvents._lazy_callback_resize_100());
            }, 100);
            setInterval(function () {
                tdEvents.scroll_event_slow_run &&
                    ((tdEvents.scroll_event_slow_run = !1),
                    td_events_scroll_scroll_to_top(tdEvents.scroll_window_scrollTop),
                    td_more_articles_box.td_events_scroll(tdEvents.scroll_window_scrollTop),
                    tdCustomEvents._lazy_callback_scroll_500());
                tdEvents.resize_event_slow_run && ((tdEvents.resize_event_slow_run = !1), tdAffix.compute_wrapper(), tdAffix.compute_top(), tdDetect.runIsPhoneScreen(), tdCustomEvents._lazy_callback_resize_500());
            }, 500);
        },
    };
    tdEvents.init();
})();
var tdHeader = {};
(function () {
    tdHeader = {
        _selectorHeaderDesktop: ".td-header-desktop-wrap",
        _selectorHeaderDesktopSticky: ".td-header-desktop-sticky-wrap",
        _selectorHeaderMobile: ".td-header-mobile-wrap",
        _selectorHeaderMobileSticky: ".td-header-mobile-sticky-wrap",
        _selectorDataHeaderDesktop: "tdc_header_desktop",
        _selectorDataHeaderDesktopSticky: "tdc_header_desktop_sticky",
        _selectorDataHeaderMobile: "tdc_header_mobile",
        _selectorDataHeaderMobileSticky: "tdc_header_mobile_sticky",
        $_headerDesktop: void 0,
        $_headerDesktopSticky: void 0,
        $_mobileDesktop: void 0,
        $_mobileDesktopSticky: void 0,
        _headerDesktopHeight: void 0,
        _headerDesktopStickyHeight: void 0,
        _headerMobileHeight: void 0,
        _headerMobileStickyHeight: void 0,
        _headerDesktopStickyGap: 0,
        _headerMobileStickyGap: 0,
        _previousScrollPosition: 0,
        _isMobile: !1,
        _isInitialized: !1,
        init: function () {
            tdHeader._isInitialized ||
                ((tdHeader.$_headerDesktop = jQuery(tdHeader._selectorHeaderDesktop)),
                (tdHeader.$_headerDesktopSticky = jQuery(tdHeader._selectorHeaderDesktopSticky)),
                (tdHeader.$_headerMobile = jQuery(tdHeader._selectorHeaderMobile)),
                (tdHeader.$_headerMobileSticky = jQuery(tdHeader._selectorHeaderMobileSticky)),
                tdHeader.$_headerDesktop.length &&
                    tdHeader.$_headerDesktopSticky.length &&
                    tdHeader.$_headerMobile.length &&
                    tdHeader.$_headerMobileSticky.length &&
                    (window.parent === window.top &&
                        "undefined" === typeof window.parent.tdcSidebar &&
                        (tdHeader.$_headerDesktop.removeClass("tdc-zone-sticky-invisible tdc-zone-sticky-inactive"),
                        tdHeader.$_headerDesktopSticky.removeClass("tdc-zone-sticky-invisible tdc-zone-sticky-inactive"),
                        tdHeader.$_headerMobile.removeClass("tdc-zone-sticky-invisible tdc-zone-sticky-inactive"),
                        tdHeader.$_headerMobileSticky.removeClass("tdc-zone-sticky-invisible tdc-zone-sticky-inactive")),
                    tdHeader.checkSizes(),
                    (tdHeader._isInitialized = !0)));
        },
        computeItems: function () {
            if (tdHeader._isInitialized) {
                tdHeader._isMobile
                    ? (tdHeader.$_headerDesktop.hide(),
                      tdHeader.$_headerDesktopSticky.hide(),
                      tdHeader.$_headerMobile.show(),
                      tdHeader.$_headerMobileSticky.show(),
                      tdHeader.$_headerMobileSticky.hasClass("td-header-stop-transition") && tdHeader.$_headerMobileSticky.removeClass("td-header-stop-transition"),
                      tdHeader._headerMobileHeight < tdEvents.scroll_window_scrollTop
                          ? tdHeader.$_headerMobileSticky.find(".tdc_zone:first").hasClass("td-header-sticky-smart")
                              ? tdHeader._previousScrollPosition < tdEvents.scroll_window_scrollTop
                                  ? (tdHeader.$_headerMobileSticky.hasClass("td-header-active") && tdHeader.doExtra(), tdHeader.$_headerMobileSticky.removeClass("td-header-active"))
                                  : (tdHeader.$_headerMobileSticky.hasClass("td-header-active") || tdHeader.doExtra(), tdHeader.$_headerMobileSticky.addClass("td-header-active"))
                              : (tdHeader.$_headerMobileSticky.hasClass("td-header-active") || tdHeader.doExtra(), tdHeader.$_headerMobile.removeClass("td-header-active"), tdHeader.$_headerMobileSticky.addClass("td-header-active"))
                          : (tdHeader.$_headerMobile.hasClass("td-header-active") && tdHeader.$_headerMobileSticky.addClass("td-header-stop-transition"),
                            tdHeader.$_headerMobileSticky.hasClass("td-header-active") && tdHeader.doExtra(),
                            tdHeader.$_headerMobile.addClass("td-header-active"),
                            tdHeader.$_headerMobileSticky.removeClass("td-header-active")))
                    : (tdHeader.$_headerDesktop.show(),
                      tdHeader.$_headerDesktopSticky.show(),
                      tdHeader.$_headerMobile.hide(),
                      tdHeader.$_headerMobileSticky.hide(),
                      tdHeader.$_headerDesktopSticky.hasClass("td-header-stop-transition") && tdHeader.$_headerDesktopSticky.removeClass("td-header-stop-transition"),
                      tdHeader.$_headerDesktopSticky.find(".tdc_zone:first").hasClass("td-header-sticky-smart")
                          ? tdHeader._previousScrollPosition < tdEvents.scroll_window_scrollTop
                              ? tdHeader._headerDesktopHeight < tdEvents.scroll_window_scrollTop &&
                                (tdHeader.$_headerDesktopSticky.hasClass("td-header-active") && tdHeader.doExtra(), tdHeader.$_headerDesktop.addClass("td-header-active"), tdHeader.$_headerDesktopSticky.removeClass("td-header-active"))
                              : tdHeader._previousScrollPosition > tdEvents.scroll_window_scrollTop &&
                                (tdHeader._headerDesktopHeight + parseInt(tdHeader._headerDesktopStickyGap) < tdEvents.scroll_window_scrollTop
                                    ? (tdHeader.$_headerDesktopSticky.hasClass("td-header-active") || tdHeader.doExtra(), tdHeader.$_headerDesktop.removeClass("td-header-active"), tdHeader.$_headerDesktopSticky.addClass("td-header-active"))
                                    : (tdHeader._headerDesktopHeight > tdEvents.scroll_window_scrollTop && tdHeader.$_headerDesktop.hasClass("td-header-active") && tdHeader.$_headerDesktopSticky.addClass("td-header-stop-transition"),
                                      tdHeader.$_headerDesktopSticky.hasClass("td-header-active") && tdHeader.doExtra(),
                                      tdHeader.$_headerDesktop.addClass("td-header-active"),
                                      tdHeader.$_headerDesktopSticky.removeClass("td-header-active")))
                          : tdHeader._previousScrollPosition < tdEvents.scroll_window_scrollTop
                          ? tdHeader._headerDesktopHeight < tdEvents.scroll_window_scrollTop
                              ? (tdHeader.$_headerDesktopSticky.hasClass("td-header-active") || tdHeader.doExtra(), tdHeader.$_headerDesktop.removeClass("td-header-active"), tdHeader.$_headerDesktopSticky.addClass("td-header-active"))
                              : (tdHeader.$_headerDesktop.hasClass("td-header-active") && tdHeader.$_headerDesktopSticky.addClass("td-header-stop-transition"),
                                tdHeader.$_headerDesktopSticky.hasClass("td-header-active") && tdHeader.doExtra(),
                                tdHeader.$_headerDesktop.addClass("td-header-active"),
                                tdHeader.$_headerDesktopSticky.removeClass("td-header-active"))
                          : tdHeader._previousScrollPosition > tdEvents.scroll_window_scrollTop &&
                            (tdHeader._headerDesktopHeight + parseInt(tdHeader._headerDesktopStickyGap) < tdEvents.scroll_window_scrollTop
                                ? (tdHeader.$_headerDesktopSticky.hasClass("td-header-active") || tdHeader.doExtra(), tdHeader.$_headerDesktop.removeClass("td-header-active"), tdHeader.$_headerDesktopSticky.addClass("td-header-active"))
                                : (tdHeader._headerDesktopHeight > tdEvents.scroll_window_scrollTop && tdHeader.$_headerDesktop.hasClass("td-header-active") && tdHeader.$_headerDesktopSticky.addClass("td-header-stop-transition"),
                                  tdHeader.$_headerDesktopSticky.hasClass("td-header-active") || tdHeader.doExtra(),
                                  tdHeader.$_headerDesktop.addClass("td-header-active"),
                                  tdHeader.$_headerDesktopSticky.removeClass("td-header-active"))));
                if (window.parent === window.top && "undefined" !== typeof window.parent.tdcSidebar) {
                    var a = tdHeader.getActiveHeaderSelector();
                    if ("undefined" === typeof tdHeader.previousActiveHeaderSelector || a !== tdHeader.previousActiveHeaderSelector)
                        (tdHeader.previousActiveHeaderSelector = a),
                            window.parent.tdcSidebar.$_tdcZone.find(".tdc-zone").removeClass("tdc-zone-active"),
                            "undefined" !== typeof tdHeader.timeoutHeaderTemplate && clearTimeout(tdHeader.timeoutHeaderTemplate),
                            (tdHeader.timeoutHeaderTemplate = setTimeout(function () {
                                window.parent.tdcSidebar.$_tdcZone.find('.tdc-zone[data-type="' + a + '"]').addClass("tdc-zone-active");
                                0 > a.indexOf("sticky") && window.parent.tdcSidebar.setForcedHeaderZone(void 0);
                                window.parent.tdcState.isHeaderSticky()
                                    ? tdHeader.$_headerDesktopSticky.addClass("tdc-zone-sticky-active").removeClass("tdc-zone-sticky-inactive")
                                    : tdHeader.$_headerDesktopSticky.addClass("tdc-zone-sticky-inactive").removeClass("tdc-zone-sticky-active");
                                window.parent.tdcState.isMobileHeaderSticky()
                                    ? tdHeader.$_headerMobileSticky.addClass("tdc-zone-sticky-active").removeClass("tdc-zone-sticky-inactive")
                                    : tdHeader.$_headerMobileSticky.addClass("tdc-zone-sticky-inactive").removeClass("tdc-zone-sticky-active");
                                tdHeader._isMobile
                                    ? tdHeader.$_headerMobileSticky.hasClass("tdc-zone-sticky-active")
                                        ? tdHeader.$_headerMobileSticky.removeClass("tdc-zone-sticky-invisible")
                                        : tdHeader.$_headerMobileSticky.hasClass("tdc-zone-sticky-inactive") && tdHeader.$_headerMobileSticky.addClass("tdc-zone-sticky-invisible")
                                    : tdHeader.$_headerDesktopSticky.hasClass("tdc-zone-sticky-active")
                                    ? tdHeader.$_headerDesktopSticky.removeClass("tdc-zone-sticky-invisible")
                                    : tdHeader.$_headerDesktopSticky.hasClass("tdc-zone-sticky-inactive") && tdHeader.$_headerDesktopSticky.addClass("tdc-zone-sticky-invisible");
                            }, 250));
                }
                tdHeader._previousScrollPosition = tdEvents.scroll_window_scrollTop;
            }
        },
        scroll: function () {
            tdHeader.computeItems();
        },
        resize: function () {
            tdHeader.checkSizes();
            tdHeader.computeItems();
        },
        checkSizes: function () {
            if (tdHeader._isInitialized) {
                tdHeader._headerDesktopHeight = tdHeader.$_headerDesktop.outerHeight(!0);
                tdHeader._headerDesktopStickyHeight = tdHeader.$_headerDesktopSticky.outerHeight(!0);
                tdHeader._headerMobileHeight = tdHeader.$_headerMobile.outerHeight(!0);
                tdHeader._headerMobileStickyHeight = tdHeader.$_headerMobileSticky.outerHeight(!0);
                var a = tdHeader.$_headerDesktopSticky.find(".tdc_zone:first").data("sticky-offset");
                "undefined" !== typeof a && (tdHeader._headerDesktopStickyGap = a);
                tdHeader._isMobile = 768 > tdEvents.window_innerWidth;
            }
        },
        getFixedHeaderHeight: function () {
            if (tdHeader._isInitialized) return tdHeader.checkSizes(), tdHeader._isMobile ? tdHeader._headerMobileHeight : tdHeader._headerDesktopHeight;
        },
        getActiveHeaderSelector: function () {
            if (tdHeader._isInitialized)
                return tdHeader._isMobile
                    ? tdHeader.$_headerMobileSticky.hasClass("td-header-active")
                        ? tdHeader._selectorDataHeaderMobileSticky
                        : tdHeader._selectorDataHeaderMobile
                    : tdHeader.$_headerDesktopSticky.hasClass("td-header-active")
                    ? tdHeader._selectorDataHeaderDesktopSticky
                    : tdHeader._selectorDataHeaderDesktop;
        },
        doExtra: function () {
            "undefined" !== typeof window.tdbSearch.hideAllItems && window.tdbSearch.hideAllItems();
        },
    };
    jQuery(window).load(function () {
        tdHeader.init();
        tdHeader.resize();
    });
})();
var tdAjaxCount = {};
(function () {
    tdAjaxCount = {
        tdGetViewsCountsAjax: function (a, b) {
            var c = "td_ajax_get_views";
            "post" === a && (c = "td_ajax_update_views");
            jQuery.ajax({
                type: "POST",
                url: td_ajax_url,
                cache: !0,
                data: { action: c, td_post_ids: b },
                success: function (a, b, c) {
                    a = jQuery.parseJSON(a);
                    a instanceof Object &&
                        jQuery.each(a, function (a, b) {
                            jQuery(".td-nr-views-" + a).html(b);
                        });
                },
                error: function (a, b, c) {},
            });
        },
    };
})();
var tdYoutubePlayers = {},
    tdVimeoPlayers = {};
jQuery().ready(function () {
    tdYoutubePlayers.init();
    tdVimeoPlayers.init();
});
(function () {
    tdYoutubePlayers = {
        tdPlayerContainer: "player_youtube",
        players: [],
        init: function () {
            for (var a = jQuery(".td_wrapper_playlist_player_youtube"), b = 0; b < a.length; b++) {
                var c = jQuery(a[b]),
                    d = tdYoutubePlayers.addPlayer(c),
                    f = d.tdPlayerContainer;
                c.parent().find(".td_youtube_control").data("player-id", f);
                for (var e = c.parent().find(".td_click_video_youtube"), l = 0; l < e.length; l++)
                    jQuery(e[l]).data("player-id", f), l + 1 < e.length ? jQuery(e[l]).data("next-video-id", jQuery(e[l + 1]).data("video-id")) : jQuery(e[l]).data("next-video-id", jQuery(e[0]).data("video-id"));
                "1" == c.data("autoplay") && (d.autoplay = 1);
                c = c.data("first-video");
                "" !== c && ((d.tdPlaylistIdYoutubeVideoRunning = c), d.playVideo(c));
            }
            jQuery(".td_click_video_youtube").on("click", function () {
                var a = jQuery(this).data("video-id"),
                    b = jQuery(this).data("player-id");
                void 0 !== b && "" !== b && void 0 !== a && "" !== a && tdYoutubePlayers.operatePlayer(b, "play", a);
            });
            jQuery(".td_youtube_control").on("click", function () {
                var a = jQuery(this).data("player-id");
                void 0 !== a && "" !== a && (jQuery(this).hasClass("td-sp-video-play") ? tdYoutubePlayers.operatePlayer(a, "play") : tdYoutubePlayers.operatePlayer(a, "pause"));
            });
        },
        addPlayer: function (a) {
            a = tdYoutubePlayers.createPlayer(tdYoutubePlayers.tdPlayerContainer + "_" + tdYoutubePlayers.players.length, a);
            tdYoutubePlayers.players.push(a);
            return a;
        },
        operatePlayer: function (a, b, c) {
            for (var d = 0; d < tdYoutubePlayers.players.length; d++)
                if (tdYoutubePlayers.players[d].tdPlayerContainer == a) {
                    a = tdYoutubePlayers.players[d];
                    a.playStatus();
                    "play" === b ? ((a.autoplay = 1), void 0 === c ? a.playerPlay() : a.playVideo(c)) : "pause" == b && tdYoutubePlayers.players[d].playerPause();
                    break;
                }
        },
        createPlayer: function (a, b) {
            var c = {
                tdYtPlayer: "",
                tdPlayerContainer: a,
                autoplay: 0,
                tdPlaylistIdYoutubeVideoRunning: "",
                jqTDWrapperVideoPlaylist: b.closest(".td_wrapper_video_playlist"),
                jqPlayerWrapper: b,
                jqControlPlayer: "",
                _videoId: "",
                playVideo: function (a) {
                    c._videoId = a;
                    "undefined" === typeof YT || "undefined" === typeof YT.Player
                        ? ((window.onYouTubePlayerAPIReady = function () {
                              for (var a = 0; a < tdYoutubePlayers.players.length; a++) tdYoutubePlayers.players[a].loadPlayer();
                          }),
                          jQuery.getScript("https://www.youtube.com/player_api").done(function (a, b) {}))
                        : c.loadPlayer(a);
                },
                loadPlayer: function (a) {
                    var b = c._videoId;
                    void 0 !== a && (b = a);
                    if (void 0 !== b) {
                        c.tdPlaylistIdYoutubeVideoRunning = b;
                        a = window.td_youtube_list_ids["td_" + c.tdPlaylistIdYoutubeVideoRunning].title;
                        var d = window.td_youtube_list_ids["td_" + c.tdPlaylistIdYoutubeVideoRunning].time;
                        c.jqTDWrapperVideoPlaylist.find(".td_click_video_youtube").removeClass("td_video_currently_playing");
                        c.jqTDWrapperVideoPlaylist.find(".td_" + b).addClass("td_video_currently_playing");
                        c.jqTDWrapperVideoPlaylist.find(".td_current_video_play_title_youtube").html(a);
                        c.jqTDWrapperVideoPlaylist.find(".td_current_video_play_time_youtube").html(d);
                        c.jqPlayerWrapper.html("<div id=" + c.tdPlayerContainer + ' class="td-youtube-player"></div>');
                        c.jqControlPlayer = c.jqTDWrapperVideoPlaylist.find(".td_youtube_control");
                        c.tdYtPlayer = new YT.Player(c.tdPlayerContainer, { playerVars: { autoplay: c.autoplay }, height: "100%", width: "100%", videoId: b, events: { onReady: c.onPlayerReady, onStateChange: c.onPlayerStateChange } });
                    }
                },
                onPlayerReady: function (a) {
                    if ("undefined" !== typeof tdShowVideo) tdShowVideo.onYoutubeReadyEvent(a);
                },
                onPlayerStateChange: function (a) {
                    if (a.data === YT.PlayerState.PLAYING) c.pauseStatus();
                    else if (a.data === YT.PlayerState.ENDED) {
                        c.playStatus();
                        c.autoplay = 1;
                        var b = "",
                            d = c.jqTDWrapperVideoPlaylist.find(".td_video_currently_playing");
                        d.length && ((d = jQuery(d).next(".td_click_video_youtube")), d.length && (b = jQuery(d).data("video-id")));
                        "" !== b && c.playVideo(b);
                    } else YT.PlayerState.PAUSED && c.playStatus();
                    if ("undefined" !== typeof tdShowVideo) tdShowVideo.onYoutubeStateChangeEvent(a);
                },
                playerPlay: function () {
                    c.tdYtPlayer.playVideo();
                },
                playerPause: function () {
                    c.tdYtPlayer.pauseVideo();
                },
                playStatus: function () {
                    c.jqControlPlayer.removeClass("td-sp-video-pause").addClass("td-sp-video-play");
                },
                pauseStatus: function () {
                    c.jqControlPlayer.removeClass("td-sp-video-play").addClass("td-sp-video-pause");
                },
            };
            return c;
        },
    };
    tdVimeoPlayers = {
        tdPlayerContainer: "player_vimeo",
        players: [],
        existingAutoplay: !1,
        init: function () {
            for (var a = jQuery(".td_wrapper_playlist_player_vimeo"), b = 0; b < a.length; b++) tdVimeoPlayers.addPlayer(jQuery(a[b]));
            jQuery(".td_click_video_vimeo").on("click", function () {
                var a = jQuery(this).data("video-id"),
                    b = jQuery(this).data("player-id");
                void 0 !== b && "" !== b && void 0 !== a && "" !== a && tdVimeoPlayers.operatePlayer(b, "play", a);
            });
            jQuery(".td_vimeo_control").on("click", function () {
                var a = jQuery(this).data("player-id");
                void 0 !== a && "" !== a && (jQuery(this).hasClass("td-sp-video-play") ? tdVimeoPlayers.operatePlayer(a, "play") : tdVimeoPlayers.operatePlayer(a, "pause"));
            });
        },
        addPlayer: function (a) {
            var b = tdVimeoPlayers.tdPlayerContainer + "_" + tdVimeoPlayers.players.length,
                c = tdVimeoPlayers.createPlayer(b, a);
            a.parent().find(".td_vimeo_control").data("player-id", b);
            for (var d = a.parent().find(".td_click_video_vimeo"), f = 0; f < d.length; f++)
                jQuery(d[f]).data("player-id", b), f + 1 < d.length ? jQuery(d[f]).data("next-video-id", jQuery(d[f + 1]).data("video-id")) : jQuery(d[f]).data("next-video-id", jQuery(d[0]).data("video-id"));
            "1" == a.data("autoplay") && (c.autoplay = 1);
            a = a.data("first-video");
            void 0 !== a && "" !== a && c.createPlayer(a);
            tdVimeoPlayers.players.push(c);
            return c;
        },
        operatePlayer: function (a, b, c) {
            for (var d = 0; d < tdVimeoPlayers.players.length; d++)
                if (tdVimeoPlayers.players[d].playerId == a) {
                    a = tdVimeoPlayers.players[d];
                    "play" === b ? (void 0 !== c ? ((tdVimeoPlayers.existingAutoplay = !1), a.createPlayer(c)) : a.playerPlay()) : "pause" === b && a.playerPause();
                    break;
                }
        },
        createPlayer: function (a, b) {
            var c = {
                playerId: a,
                jqTDWrapperVideoPlaylist: b.closest(".td_wrapper_video_playlist"),
                jqPlayerWrapper: b,
                currentVideoPlaying: "",
                player: "",
                jqControlPlayer: "",
                autoplay: 0,
                createPlayer: function (a) {
                    if ("" !== a) {
                        this.currentVideoPlaying = a;
                        var b = "",
                            d = window.td_vimeo_list_ids["td_" + a].title,
                            l = window.td_vimeo_list_ids["td_" + a].time;
                        c.jqTDWrapperVideoPlaylist.find(".td_click_video_vimeo").removeClass("td_video_currently_playing");
                        c.jqTDWrapperVideoPlaylist.find(".td_" + a).addClass("td_video_currently_playing");
                        c.jqTDWrapperVideoPlaylist.find(".td_current_video_play_title_vimeo").html(d);
                        c.jqTDWrapperVideoPlaylist.find(".td_current_video_play_time_vimeo").html(l);
                        c.jqControlPlayer = c.jqTDWrapperVideoPlaylist.find(".td_vimeo_control");
                        tdVimeoPlayers.existingAutoplay || 0 === c.autoplay ? c.playStatus() : ((b = "&autoplay=1&muted=1"), tdDetect.isMobileDevice ? c.playStatus() : c.pauseStatus());
                        c.jqPlayerWrapper.html(
                            '<iframe id="' + c.playerId + '" src="https://player.vimeo.com/video/' + a + "?api=1&player_id=" + c.playerId + b + '"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
                        );
                        c.createVimeoObjectPlayer(jQuery);
                    }
                },
                createVimeoObjectPlayer: function (a) {
                    var b = "";
                    a = a("#" + c.playerId);
                    a.length &&
                        ((b = $f(a[0])),
                        (c.player = b),
                        b.addEvent("ready", function () {
                            b.addEvent("play", function (a) {
                                c.pauseStatus();
                            });
                            b.addEvent("pause", function (a) {
                                c.playStatus();
                            });
                            b.addEvent("finish", function (a) {
                                a = "";
                                var b = c.jqTDWrapperVideoPlaylist.find(".td_video_currently_playing");
                                b.length && ((b = jQuery(b).next(".td_click_video_vimeo")), b.length && (a = jQuery(b).data("video-id")));
                                "" !== a ? (c.createPlayer(a), tdDetect.isMobileDevice ? c.playStatus() : c.pauseStatus()) : c.playStatus();
                            });
                        }));
                },
                playerPlay: function () {
                    c.player.api("play");
                },
                playerPause: function () {
                    c.player.api("pause");
                },
                playStatus: function () {
                    c.jqControlPlayer.removeClass("td-sp-video-pause").addClass("td-sp-video-play");
                },
                pauseStatus: function () {
                    c.jqControlPlayer.removeClass("td-sp-video-play").addClass("td-sp-video-pause");
                },
            };
            return c;
        },
    };
})();
("use strict");
jQuery(window).load(function () {
    td_resize_smartlist_sliders_and_update();
});
jQuery().ready(function () {
    td_resize_smartlist_sliders_and_update();
});
function td_resize_smartlist_slides(a) {
    var b = a.currentSlideNumber;
    a = jQuery(a.data.obj[0]).attr("id");
    tdDetect.isIe8 || (jQuery("#" + a).css("overflow", "none"), jQuery("#" + a + " .td-item").css("overflow", "visible"));
    b = jQuery("#" + a + "_item_" + b).outerHeight(!0);
    jQuery("#" + a + ", #" + a + " .td-slider").css({ height: b });
}
function td_resize_smartlist_sliders_and_update() {
    jQuery(document)
        .find(".td-smart-list-slider")
        .each(function () {
            var a = jQuery(this).attr("id");
            tdDetect.isIe8 || (jQuery("#" + a).css("overflow", "none"), jQuery("#" + a + " .td-item").css("overflow", "visible"));
            var b = 0;
            b = jQuery("#" + a + "_item_" + td_history.get_current_page("slide")).outerHeight(!0);
            jQuery("#" + a + ", #" + a + " .td-slider").css({ height: b });
            tdDetect.isAndroid &&
                setTimeout(function () {
                    jQuery("#" + a).iosSlider("update");
                }, 2e3);
        });
}
function td_resize_normal_slide(a) {
    a = jQuery(a.data.obj[0]).attr("id");
    var b = td_get_document_width();
    tdDetect.isIe8 || (jQuery("#" + a).css("overflow", "none"), jQuery("#" + a + " .td-item").css("overflow", "visible"));
    var c = jQuery("#" + a + "_item_0").outerWidth(!0),
        d = 780;
    tdDetect.isAndroid && (d = 1e3);
    b < d && !tdDetect.isIpad && ((b = 300 < c ? 0.5 * c : c), jQuery("#" + a + ", #" + a + " .td-slider, #" + a + " .td-slider .td-module-thumb").css({ height: b }));
}
function td_resize_normal_slide_and_update(a) {
    var b = jQuery(a.data.obj[0]).attr("id");
    a = td_get_document_width();
    tdDetect.isIe8 || (jQuery("#" + b).css("overflow", "none"), jQuery("#" + b + " .td-item").css("overflow", "visible"));
    var c = 0;
    c = jQuery("#" + b + "_item_0").outerWidth(!0);
    var d = 780;
    tdDetect.isAndroid && (d = 1e3);
    a < d &&
        !tdDetect.isIpad &&
        ((c = 300 < c ? 0.5 * c : c),
        jQuery("#" + b + ", #" + b + " .td-slider, #" + b + " .td-slider .td-module-thumb").css({ height: c }),
        setTimeout(function () {
            jQuery("#" + b).iosSlider("update");
        }, 2e3));
}
var tdPullDown = {};
(function () {
    tdPullDown = {
        _view_port_interval_index: tdViewport.INTERVAL_INITIAL_INDEX,
        items: [],
        item: function () {
            this.horizontal_max_width = this.horizontal_no_items_css_class = this.horizontal_element_css_class = this.container_jquery_obj = this.vertical_jquery_obj = this.horizontal_jquery_obj = this.blockUid = "";
            this.minimum_elements = 1;
            this.excluded_jquery_elements = [];
            this._horizontal_extra_space = 1;
            this._horizontal_elements = [];
            this._vertical_elements = [];
            this._vertical_ul_jquery_obj = "";
            this._vertical_jquery_obj_outer_width = 0;
            this._is_initialized = !1;
        },
        init: function () {
            tdPullDown._view_port_interval_index = tdViewport.getCurrentIntervalIndex();
            tdPullDown.items = [];
        },
        add_item: function (a) {
            if (1 !== a.vertical_jquery_obj.length) throw "item.vertical_jquery_obj is more or less than one: " + a.vertical_jquery_obj.length;
            if (1 !== a.horizontal_jquery_obj.length) throw "item.horizontal_jquery_obj is more or less than one: " + a.horizontal_jquery_obj.length;
            if (1 !== a.container_jquery_obj.length) throw "item.container_jquery_obj is more or less than one: " + a.container_jquery_obj.length;
            if ("" === a.horizontal_element_css_class) throw "item.horizontal_element_css_class is empty";
            tdPullDown.items.push(a);
            tdPullDown._initialize_item(a);
            tdPullDown._compute_item(a);
        },
        deleteItem: function (a) {
            for (var b = 0; b < tdPullDown.items.length; b++) if (tdPullDown.items[b].blockUid === a) return tdPullDown.items.splice(b, 1), !0;
            return !1;
        },
        unloadItem: function (a) {
            for (var b = 0; b < tdPullDown.items.length; b++)
                if (tdPullDown.items[b].blockUid === a) {
                    for (var c = 0; c < tdPullDown.items[b]._vertical_elements.length; c++) tdPullDown.items[b]._vertical_elements[c].jquery_object.detach().appendTo(tdPullDown.items[b].horizontal_jquery_obj);
                    tdPullDown.deleteItem(a);
                    return !0;
                }
            return !1;
        },
        _initialize_item: function (a) {
            if (!0 !== a._is_initialized)
                if (((a._vertical_ul_jquery_obj = a.vertical_jquery_obj.find("ul:first")), 0 === a._vertical_ul_jquery_obj.length)) tdPullDown.log("Item can' be initialized. The vertical list doesn't have an 'ul' container");
                else {
                    var b = null,
                        c = null;
                    a.horizontal_jquery_obj.find("." + a.horizontal_element_css_class + ":visible").each(function (d, e) {
                        b = jQuery(e);
                        b.css("-webkit-transition", "opacity 0.2s");
                        b.css("-moz-transition", "opacity 0.2s");
                        b.css("-o-transition", "opacity 0.2s");
                        b.css("transition", "opacity 0.2s");
                        b.css("opacity", "1");
                        c = { jquery_object: b, calculated_width: b.outerWidth(!0) };
                        a._horizontal_elements.push(c);
                    });
                    a._vertical_jquery_obj_outer_width = a.vertical_jquery_obj.outerWidth(!0);
                    a.vertical_jquery_obj.css("display", "none");
                    var d = a.horizontal_jquery_obj.css("padding-left");
                    void 0 !== d && "" !== d && (a._horizontal_extra_space += parseInt(d.replace("px", "")));
                    d = a.horizontal_jquery_obj.css("padding-right");
                    void 0 !== d && "" !== d && (a._horizontal_extra_space += parseInt(d.replace("px", "")));
                    d = a.horizontal_jquery_obj.css("margin-left");
                    void 0 !== d && "" !== d && (a._horizontal_extra_space += parseInt(d.replace("px", "")));
                    d = a.horizontal_jquery_obj.css("margin-right");
                    void 0 !== d && "" !== d && (a._horizontal_extra_space += parseInt(d.replace("px", "")));
                    d = a.horizontal_jquery_obj.css("border-left");
                    void 0 !== d && "" !== d && (a._horizontal_extra_space += parseInt(d.replace("px", "")));
                    d = a.horizontal_jquery_obj.css("border-right");
                    void 0 !== d && "" !== d && (a._horizontal_extra_space += parseInt(d.replace("px", "")));
                    a._is_initialized = !0;
                }
        },
        _get_horizontal_elements_width: function (a) {
            for (var b = 0, c = a._horizontal_elements.length - 1; 0 <= c; c--) b += a._horizontal_elements[c].calculated_width;
            return b;
        },
        _reinitialize_all_items: function () {
            for (var a = tdPullDown.items.length - 1; 0 <= a; a--) tdPullDown._reinitialize_item(tdPullDown.items[a]);
        },
        _reinitialize_item: function (a) {
            !1 !== a._is_initialized &&
                ((a._is_initialized = !1),
                a.horizontal_jquery_obj.html(a.horizontal_jquery_obj.html() + a._vertical_ul_jquery_obj.html()),
                a._vertical_ul_jquery_obj.html(""),
                (a._horizontal_elements = []),
                (a._vertical_elements = []),
                (a._horizontal_extra_space = 1),
                tdPullDown._initialize_item(a));
        },
        _compute_item: function (a) {
            if (!1 !== a._is_initialized) {
                tdPullDown._prepare_horizontal_header(a, !0);
                var b = 0,
                    c = a.container_jquery_obj.width();
                if (void 0 !== c && "" !== c) {
                    b = c;
                    if ("" !== a.horizontal_max_width) {
                        var d = parseInt(a.horizontal_max_width.replace("px", ""));
                        c > d && (b = d);
                    }
                    for (c = a.excluded_jquery_elements.length - 1; 0 <= c; c--) b -= a.excluded_jquery_elements[c].outerWidth(!0);
                }
                0 < a._vertical_elements.length && (b -= a._vertical_jquery_obj_outer_width);
                b -= tdPullDown._get_horizontal_elements_width(a);
                for (b -= a._horizontal_extra_space; 0 > b; ) {
                    if (0 !== a.minimum_elements && a._horizontal_elements.length <= a.minimum_elements) {
                        tdPullDown._make_all_elements_vertical(a);
                        tdPullDown._prepare_horizontal_header(a);
                        return;
                    }
                    0 === a._vertical_elements.length && (b -= a._vertical_jquery_obj_outer_width);
                    d = tdPullDown._make_element_vertical(a);
                    b += d.calculated_width;
                }
                if (0 !== a.minimum_elements && 0 === a._horizontal_elements.length && 0 < a._vertical_elements.length && b >= a._vertical_elements[0].calculated_width) {
                    for (d = c = 0; d < a.minimum_elements && d < a._vertical_elements.length; d++) c += a._vertical_elements[d].calculated_width;
                    for (var f = 0, e = a.minimum_elements; 0 < e && 0 < a._vertical_elements.length && b >= c; )
                        if (((d = tdPullDown._make_element_horizontal(a)), null !== d)) (f += d.calculated_width), e--;
                        else {
                            tdPullDown._prepare_horizontal_header(a);
                            return;
                        }
                    b -= f;
                }
                for (; (0 < a._horizontal_elements.length || (0 === a._horizontal_elements.length && 0 === a.minimum_elements)) && 0 < a._vertical_elements.length && b >= a._vertical_elements[0].calculated_width; )
                    if (((d = tdPullDown._make_element_horizontal(a)), null !== d)) b -= d.calculated_width;
                    else {
                        tdPullDown._prepare_horizontal_header(a);
                        return;
                    }
                1 === a._vertical_elements.length && b + a._vertical_jquery_obj_outer_width >= a._vertical_elements[0].calculated_width && tdPullDown._make_element_horizontal(a);
                tdPullDown._add_no_items_class(a);
                tdPullDown._prepare_horizontal_header(a);
            }
        },
        _prepare_horizontal_header: function (a, b) {
            var c = a.horizontal_jquery_obj.parent().siblings(".block-title:first");
            1 === c.length &&
                ((c = c.find("span:first")),
                1 === c.length && ("undefined" !== typeof b && !0 === b ? c.css("margin-right", 0) : 0 === a._horizontal_elements.length ? c.css("margin-right", a._vertical_jquery_obj_outer_width + "px") : c.css("margin-right", 0)));
        },
        _compute_all_items: function () {
            for (var a = tdPullDown.items.length - 1; 0 <= a; a--) tdPullDown.items[a].constructor === tdPullDown.item && tdPullDown._compute_item(tdPullDown.items[a]);
        },
        _make_element_horizontal: function (a) {
            if (!1 === a._is_initialized || 0 === a._vertical_elements.length) return null;
            var b = a._vertical_elements.shift();
            0 === a._vertical_elements.length && a.vertical_jquery_obj.css("display", "none");
            a._horizontal_elements.push(b);
            b.jquery_object.css("opacity", "0");
            b.jquery_object.detach().appendTo(a.horizontal_jquery_obj);
            setTimeout(function () {
                b.jquery_object.css("opacity", "1");
            }, 50);
            return b;
        },
        _make_element_vertical: function (a) {
            if (!1 === a._is_initialized || 0 === a._horizontal_elements.length) return null;
            var b = a._horizontal_elements.pop();
            0 === a._vertical_elements.length && a.vertical_jquery_obj.css("display", "");
            a._vertical_elements.unshift(b);
            b.jquery_object.detach().prependTo(a._vertical_ul_jquery_obj);
            return b;
        },
        _make_all_elements_vertical: function (a) {
            for (; 0 < a._horizontal_elements.length; ) tdPullDown._make_element_vertical(a);
            tdPullDown._add_no_items_class(a);
        },
        _add_no_items_class: function (a) {
            "" !== a.horizontal_no_items_css_class &&
                (0 === a._horizontal_elements.length ? a.horizontal_jquery_obj.addClass(a.horizontal_no_items_css_class) : 0 < a._horizontal_elements.length && a.horizontal_jquery_obj.removeClass(a.horizontal_no_items_css_class));
        },
        td_events_resize: function () {
            0 !== tdPullDown.items.length &&
                (tdPullDown._view_port_interval_index !== tdViewport.getCurrentIntervalIndex()
                    ? ((tdPullDown._view_port_interval_index = tdViewport.getCurrentIntervalIndex()),
                      "undefined" !== typeof tdPullDown.reinitTimeout && clearTimeout(tdPullDown.reinitTimeout),
                      (tdPullDown.reinitTimeout = setTimeout(function () {
                          tdPullDown._reinitialize_all_items();
                          tdPullDown._compute_all_items();
                      }, 100)))
                    : tdPullDown._compute_all_items());
        },
        log: function (a) {},
    };
    tdPullDown.init();
})();
var td_fps = {
        start_time: 0,
        current_time: 0,
        frame_number: 0,
        init: function () {
            var a = (td_fps.start_time = 0),
                b = 0,
                c = 0,
                d = jQuery("#fps_table");
            0 == d.length &&
                ((d = jQuery("<div>").css({ position: "fixed", top: "120px", left: "10px", width: "100px", height: "20px", border: "1px solid black", "font-size": "11px", "z-index": "100000", "background-color": "white" })),
                d.appendTo("body"));
            var f = function () {
                td_fps.frame_number++;
                td_fps.current_time = Date.now();
                c = (td_fps.current_time - td_fps.start_time) / 1e3;
                b = (td_fps.frame_number / c).toPrecision(2);
                b != a && ((a = b), d.html(a + " fps"));
                1 < c && ((td_fps.start_time = td_fps.current_time), (td_fps.frame_number = 0));
                requestAnimationFrame(f);
            };
            f();
        },
    },
    tdAnimationScroll = {};
(function () {
    tdAnimationScroll = {
        items: [],
        rAFIndex: 0,
        animation_running: !1,
        item: function () {
            this.percent_value = 0;
            this.animation_callback = null;
            this.jqueryObj = "";
            this.wrapper_jquery_obj = void 0;
            this.top_marker_jquery_obj = "";
            this.full_height = 0;
            this.offset_bottom_top = this.offset_top = "";
            this.properties = {};
            this.computed_item_properties = {};
            this.computation_stopped = this._is_initialized = this.top_is_out = this.redraw = !1;
            this.add_item_property = function (a, b, c, d, f, e) {
                if (!(b >= c))
                    if (void 0 === this.properties[a])
                        (this.properties[a] = { computed_value: "", settings: [] }),
                            0 !== b && (this.properties[a].settings[this.properties[a].settings.length] = { start_percent: 0, end_percent: b, start_value: d, end_value: d, easing: "" }),
                            (this.properties[a].settings[this.properties[a].settings.length] = { start_percent: b, end_percent: c, start_value: d, end_value: f, easing: e }),
                            (this.properties[a].settings[this.properties[a].settings.length] = { start_percent: c, end_percent: 100, start_value: f, end_value: f, easing: "" });
                    else {
                        var l = this.properties[a].settings[this.properties[a].settings.length - 1];
                        l.start_percent !== b
                            ? ((this.properties[a].settings[this.properties[a].settings.length - 1] = { start_percent: l.start_percent, end_percent: b, start_value: l.end_value, end_value: l.end_value, easing: "" }),
                              (this.properties[a].settings[this.properties[a].settings.length] = { start_percent: b, end_percent: c, start_value: d, end_value: f, easing: e }))
                            : (this.properties[a].settings[this.properties[a].settings.length - 1] = { start_percent: b, end_percent: c, start_value: d, end_value: f, easing: e });
                        100 !== c && (this.properties[a].settings[this.properties[a].settings.length] = { start_percent: c, end_percent: 100, start_value: f, end_value: f, easing: "" });
                    }
            };
            this.remove_item_property = function (a) {
                if (void 0 === this.properties[a]) return !1;
                delete this.properties[a];
                return !0;
            };
        },
        init: function () {
            tdAnimationScroll.items = [];
        },
        add_item: function (a) {
            if (a.constructor === tdAnimationScroll.item && "undefined" !== typeof a.jqueryObj) {
                var b = a.jqueryObj.prev();
                (b.length && b.hasClass("td_marker_animation")) || (tdAnimationScroll.items.push(a), tdAnimationScroll._initialize_item(a));
            }
        },
        _initialize_item: function (a) {
            if (!0 !== a._is_initialized && ((a.full_height = void 0 === a.wrapper_jquery_obj ? a.jqueryObj.outerHeight(!0) : a.wrapper_jquery_obj.height()), 0 !== a.full_height)) {
                var b = jQuery('<div class="td_marker_animation" style="height: 0; width: 0">');
                b.insertBefore(a.jqueryObj);
                a.top_marker_jquery_obj = b;
                a.offset_top = a.top_marker_jquery_obj.offset().top;
                a.offset_bottom_top = a.offset_top + a.full_height;
                a.top_is_out = tdEvents.window_pageYOffset > a.offset_top;
                a._is_initialized = !0;
            }
        },
        reinitialize_all_items: function (a) {
            for (var b = tdAnimationScroll.items.length - 1; 0 <= b; b--) tdAnimationScroll.reinitialize_item(tdAnimationScroll.items[b], a);
        },
        reinitialize_item: function (a, b) {
            if (!1 !== a._is_initialized) {
                a._is_initialized = !1;
                a.offset_top = a.top_marker_jquery_obj.offset().top;
                if (!0 === b && ((a.full_height = void 0 === a.wrapper_jquery_obj ? a.jqueryObj.outerHeight(!0) : a.wrapper_jquery_obj.height()), 0 === a.full_height)) return;
                a.offset_bottom_top = a.offset_top + a.full_height;
                a._is_initialized = !0;
            }
        },
        _compute_item_properties: function (a) {
            var b = {},
                c;
            for (c in a.properties)
                if (!0 === a.properties.hasOwnProperty(c)) {
                    var d = a.properties[c];
                    var f;
                    for (f = 0; f < d.settings.length; f++) {
                        var e = d.settings[f];
                        if ((e.start_percent <= a.percent_value && a.percent_value < e.end_percent) || (a.percent_value === e.end_percent && 100 === a.percent_value)) {
                            if (e.start_value === e.end_value) e = e.start_value;
                            else if (((f = ((a.percent_value - e.start_percent) / (e.end_percent - e.start_percent)) * (e.end_value - e.start_value)), void 0 === e.easing || "" === e.easing)) e = e.start_value + f;
                            else {
                                var l = Math.abs(e.start_value - e.end_value) / 1e3;
                                e =
                                    e.start_value < e.end_value
                                        ? e.start_value + 1e3 * jQuery.easing[e.easing](null, f, 0, l, e.end_value - e.start_value)
                                        : e.start_value - 1e3 * jQuery.easing[e.easing](null, -f, 0, l, e.start_value - e.end_value);
                            }
                            d.computed_value !== e && ((d.computed_value = e), (b[c] = e), (a.redraw = !0));
                            break;
                        }
                    }
                }
            a.computed_item_properties = b;
        },
        compute_item: function (a) {
            if (!1 !== a._is_initialized) {
                var b = 0;
                tdEvents.window_pageYOffset + tdEvents.window_innerHeight >= a.offset_top &&
                    (b = tdEvents.window_pageYOffset > a.offset_bottom_top ? 100 : (100 * (tdEvents.window_pageYOffset + tdEvents.window_innerHeight - a.offset_top)) / (tdEvents.window_innerHeight + a.full_height));
                a.percent_value !== b && ((a.percent_value = b), tdAnimationScroll._compute_item_properties(a));
                a.top_is_out = tdEvents.window_pageYOffset > a.offset_top;
            }
        },
        compute_all_items: function () {
            !1 === tdAnimationScroll.animation_running && (tdAnimationScroll.rAFIndex = window.requestAnimationFrame(tdAnimationScroll._animate_all_items));
            tdAnimationScroll.animation_running = !0;
        },
        _animate_all_items: function () {
            for (var a = 0; a < tdAnimationScroll.items.length; a++) !1 === tdAnimationScroll.items[a].computation_stopped && tdAnimationScroll.compute_item(tdAnimationScroll.items[a]);
            for (a = 0; a < tdAnimationScroll.items.length; a++) !0 === tdAnimationScroll.items[a].redraw && tdAnimationScroll.items[a].animation_callback();
            tdAnimationScroll.animation_running = !1;
        },
        td_events_resize: function () {
            0 !== tdAnimationScroll.items.length && (tdAnimationScroll.reinitialize_all_items(!1), tdAnimationScroll.compute_all_items());
        },
        log: function (a) {},
    };
    tdAnimationScroll.init();
})();
var tdHomepageFull = {};
(function (a, b) {
    tdHomepageFull = {
        items: [],
        item: function () {
            this.blockUid = "";
            this.$tmplBlock = b;
        },
        addItem: function (a) {
            if (!tdHomepageFull.items.length)
                switch (a.theme_name) {
                    case "Newsmag":
                        tdHomepageFull._addNewsmagItem(a);
                        break;
                    default:
                        tdHomepageFull._addItem(a);
                }
        },
        deleteItem: function (a) {
            for (var b = 0; b < tdHomepageFull.items.length; b++) {
                var c = tdHomepageFull.items[b];
                if (c.blockUid === a)
                    switch (c.theme_name) {
                        case "Newsmag":
                            tdHomepageFull._deleteNewsmagItem(c, b);
                            break;
                        default:
                            tdHomepageFull._deleteItem(c, b);
                    }
            }
            return !1;
        },
        _addItem: function (b) {
            b.$tmplBlock = a("#" + b.blockUid + "_tmpl");
            a(".td-header-wrap").after(b.$tmplBlock.html());
            var c = a('<div class="backstretch"></div>'),
                f = a('<img class="td-backstretch not-parallax" src="' + b.postFeaturedImage + '"/>');
            c.append(f);
            a("body").prepend(c);
            var e = new tdBackstr.item();
            e.wrapper_image_jquery_obj = c;
            e.image_jquery_obj = f;
            tdBackstr.add_item(e);
            b.$article = a("#post-" + b.postId);
            b.$bgImageWrapper = c;
            b.backstrItem = e;
            tdHomepageFull.items.push(b);
        },
        _addNewsmagItem: function (b) {
            b.$tmplBlock = a("#" + b.blockUid + "_tmpl");
            a("body").addClass("single_template_6");
            a("#td-outer-wrap").prepend(b.$tmplBlock.html());
            var c = a('<div class="td-full-screen-header-image-wrap"></div>'),
                f = a('<div id="td-full-screen-header-image" class="td-image-gradient"></div>'),
                e = a('<img class="td-backstretch" src="' + b.postFeaturedImage + '"/>');
            c.append(f);
            f.append(e);
            a("#td-outer-wrap").prepend(c);
            b.$bgImageWrapper = c;
            f = new tdBackstr.item();
            f.wrapper_image_jquery_obj = c;
            f.image_jquery_obj = e;
            tdBackstr.add_item(f);
            b.$article = a("#post-" + b.postId);
            b.backstrItem = f;
            a(".td-read-down a").on("click", function (b) {
                b.preventDefault();
                tdUtil.scrollToPosition(a(".td-full-screen-header-image-wrap").height(), 1200);
            });
            tdHomepageFull.items.push(b);
        },
        _deleteItem: function (a, d) {
            a.$tmplBlock.remove();
            a.$article.remove();
            a.$bgImageWrapper.remove();
            tdHomepageFull.items.splice(d, 1);
            tdBackstr.deleteItem(a.blockUid) && (a.backstrItem = b);
            a = document.body.className;
            a = a.replace(/td-boxed-layout/g, "");
            a = a.replace(/single_template_8/g, "");
            a = a.replace(/homepage-post/g, "");
            document.body.className = a;
        },
        _deleteNewsmagItem: function (a, d) {
            a.$tmplBlock.remove();
            a.$article.remove();
            a.$bgImageWrapper.remove();
            tdHomepageFull.items.splice(d, 1);
            tdBackstr.deleteItem(a.blockUid) && (a.backstrItem = b);
            a = document.body.className;
            a = a.replace(/single_template_6/g, "");
            document.body.className = a;
        },
    };
})(jQuery);
var tdBackstr = {};
(function () {
    tdBackstr = {
        items: [],
        item: function () {
            this.blockUid = "";
            this.image_aspect_rate = this.previous_value = 0;
            this.image_jquery_obj = this.wrapper_image_jquery_obj = "";
        },
        add_item: function (a) {
            if (a.constructor === tdBackstr.item)
                if (a.image_jquery_obj.get(0).complete) tdBackstr._load_item_image(a);
                else
                    a.image_jquery_obj.on("load", function () {
                        tdBackstr._load_item_image(a);
                    });
        },
        deleteItem: function (a) {
            for (var b = 0; b < tdBackstr.items.length; b++) if (tdBackstr.items[b].blockUid === a) return tdBackstr.items.splice(b, 1), !0;
            return !1;
        },
        _load_item_image: function (a) {
            a.image_aspect_rate = a.image_jquery_obj.width() / a.image_jquery_obj.height();
            tdBackstr.items.push(a);
            tdBackstr._compute_item(a);
            a.image_jquery_obj.css("opacity", "1");
        },
        _compute_item: function (a) {
            if (a.wrapper_image_jquery_obj.width() / a.wrapper_image_jquery_obj.height() < a.image_aspect_rate) {
                var b = 1;
                a.previous_value !== b && (a.image_jquery_obj.removeClass("td-stretch-width"), a.image_jquery_obj.addClass("td-stretch-height"), (a.previous_value = b));
            } else (b = 2), a.previous_value !== b && (a.image_jquery_obj.removeClass("td-stretch-height"), a.image_jquery_obj.addClass("td-stretch-width"), (a.previous_value = b));
        },
        _compute_all_items: function () {
            for (var a = 0; a < tdBackstr.items.length; a++) tdBackstr._compute_item(tdBackstr.items[a]);
        },
        td_events_resize: function () {
            0 !== tdBackstr.items.length && tdBackstr._compute_all_items();
        },
        log: function (a) {
            window.console.log(a);
        },
    };
})();
var tdShowVideo = {};
(function () {
    tdShowVideo = {
        _isInitialized: !1,
        _isApiYoutubeLoaded: !1,
        _isApiVimeoLoaded: !1,
        items: [],
        _$clearZone: void 0,
        _$body: void 0,
        _refLeft: !1,
        _hDist: void 0,
        _refBottom: !1,
        _vDist: void 0,
        _width: 450,
        _playingOne: !1,
        _pauseHidden: !1,
        _runFixed: !1,
        _bodyClass: "td-sticky-video",
        item: function () {
            this.id = void 0;
            this.inlineHeight = this.inlineWidth = 0;
            this.$wrapper = this.player = this.initialOffsetTop = void 0;
            this.inViewport = this.moved = !1;
            this.wrapperHeightBeforeFixed = void 0;
            this.playerStarted = !1;
            this.internalStatus = this.playerType = this.parentFixIndexClass = this.restoreFixIndexClass = void 0;
        },
        loadApiYoutube: function () {
            if (!tdShowVideo._isApiYoutubeLoaded) {
                var a = document.createElement("script");
                a.src = "https://www.youtube.com/iframe_api";
                var b = document.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b);
                tdShowVideo._isApiYoutubeLoaded = !0;
            }
        },
        loadApiVimeo: function () {
            if (!tdShowVideo._isApiVimeoLoaded) {
                var a = document.createElement("script");
                a.src = "https://player.vimeo.com/api/player.js";
                var b = document.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b);
                tdShowVideo._isApiVimeoLoaded = !0;
            }
        },
        init: function () {
            tdShowVideo._isInitialized ||
                ("undefined" !== typeof window.tds_video_scroll && "" !== window.tds_video_scroll && (tdShowVideo._runFixed = !0),
                "undefined" !== typeof window.tds_video_position_h && "" !== window.tds_video_position_h && (tdShowVideo._refLeft = !0),
                "undefined" !== typeof window.tds_video_position_v && "" !== window.tds_video_position_v && (tdShowVideo._refBottom = !0),
                "undefined" !== typeof window.tds_video_distance_h && "" !== window.tds_video_distance_h && (tdShowVideo._hDist = parseInt(window.tds_video_distance_h.trim(), 10)),
                "undefined" !== typeof window.tds_video_distance_v && "" !== window.tds_video_distance_v && (tdShowVideo._vDist = parseInt(window.tds_video_distance_v.trim(), 10)),
                "undefined" !== typeof window.tds_video_width && "" !== window.tds_video_width && (tdShowVideo._width = parseInt(window.tds_video_width.trim(), 10)),
                "undefined" !== typeof window.tds_video_playing_one && "" !== window.tds_video_playing_one && (tdShowVideo._playingOne = !0),
                "undefined" !== typeof window.tds_video_pause_hidden && "" !== window.tds_video_pause_hidden && (tdShowVideo._pauseHidden = !0),
                (tdShowVideo._$clearZone = jQuery('<div class="td-close-video-fixed"><i class="td-icon-modal-close"></i></div>')),
                (tdShowVideo._$body = jQuery("body")),
                tdShowVideo._$body.append(tdShowVideo._$clearZone).on("click", ".td-close-video-fixed", function (a) {
                    var b = jQuery(this).data("item-id");
                    "undefined" !== typeof b &&
                        tdShowVideo.items.forEach(function (a) {
                            b === a.id && (tdShowVideo._clearPlayerStarted(), tdShowVideo._movePlayerFromZone(a), tdShowVideo._pauseHidden && tdShowVideo._pausePlayer(a));
                        });
                }),
                (this._isInitialized = !0));
        },
        addItem: function (a) {
            tdShowVideo._isInitialized && a.constructor === tdShowVideo.item && tdShowVideo.items.push(a);
        },
        scroll: function () {
            tdShowVideo._isInitialized && tdShowVideo._checkItems();
        },
        _checkItems: function () {
            tdShowVideo._isInitialized &&
                (tdShowVideo._runFixed &&
                    tdShowVideo.items.forEach(function (a) {
                        !0 !== tdDetect.isPhoneScreen && (tdShowVideo._getReplacer(a).insertBefore(a.$wrapper.parent()), tdShowVideo._isItemInViewport(a) ? tdShowVideo._movePlayerFromZone(a) : tdShowVideo._movePlayerToZone(a));
                    }),
                setTimeout(function () {
                    tdShowVideo._pauseHidden && tdShowVideo._pauseOtherPlayers();
                }, 500));
        },
        _movePlayerToZone: function (a) {
            if ("youtube" === a.playerType) {
                if (
                    !tdShowVideo._isInitialized ||
                    a.moved ||
                    "undefined" === typeof a.player ||
                    "undefined" === typeof a.player.getPlayerState ||
                    a.player.getPlayerState() !== YT.PlayerState.PLAYING ||
                    "undefined" === typeof a.playerStarted
                )
                    return !1;
            } else if ("vimeo" === a.playerType) {
                if (!tdShowVideo._isInitialized || a.moved || "undefined" === typeof a.player || "undefined" === typeof a.internalStatus || "VIMEO_PLAYING" !== a.internalStatus || "undefined" === typeof a.playerStarted) return !1;
            } else if ("video" === a.playerType) {
                if (!tdShowVideo._isInitialized || a.moved || "undefined" === typeof a.player || "undefined" === typeof a.internalStatus || "VIDEO_PLAYING" !== a.internalStatus || "undefined" === typeof a.playerStarted) return !1;
            } else if ("undefined" === typeof a.playerType) return !1;
            tdShowVideo._clearPlayerStarted(a);
            tdShowVideo._clearZone();
            var b = a.$wrapper.data("id");
            "undefined" === typeof b && ((b = tdShowVideo._getUniqueId()), a.$wrapper.data("id", b), (a.id = b));
            "undefined" === typeof a.initialOffsetTop && (a.initialOffsetTop = a.$wrapper.offset().top);
            a.wrapperHeightBeforeFixed = a.$wrapper.height();
            a.$wrapper.parent().addClass("td-video-fixed");
            tdShowVideo._showReplacer(a);
            tdShowVideo._refLeft && a.$wrapper.parent().addClass("td-video-fixed-left");
            tdShowVideo._refBottom && a.$wrapper.parent().addClass("td-video-fixed-bottom");
            b = "width:" + tdShowVideo._width + "px !important;";
            b += "height:" + (tdShowVideo._width * a.inlineHeight) / a.inlineWidth + "px !important;";
            "undefined" !== typeof tdShowVideo._hDist && (b = tdShowVideo._refLeft ? b + ("left:" + tdShowVideo._hDist + "px !important;") : b + ("right:" + tdShowVideo._hDist + "px !important;"));
            "undefined" !== typeof tdShowVideo._vDist && (b = tdShowVideo._refBottom ? b + ("bottom:" + tdShowVideo._vDist + "px !important;") : b + ("top:" + tdShowVideo._vDist + "px !important;"));
            a.$wrapper.css("width", tdShowVideo._width);
            a.$wrapper.css("height", "100%");
            a.$wrapper.parent().attr("style", b);
            a.$wrapper.closest(".tdb-block-inner").hasClass("td-fix-index")
                ? (a.$wrapper.closest(".tdb-block-inner").removeClass("td-fix-index"), (a.restoreFixIndexClass = !0), (a.parentFixIndexClass = "tdb-block-inner"))
                : a.$wrapper.closest(".td_block_inner").hasClass("td-fix-index") && (a.$wrapper.closest(".td_block_inner").removeClass("td-fix-index"), (a.restoreFixIndexClass = !0), (a.parentFixIndexClass = "td_block_inner"));
            tdShowVideo._$clearZone.data("item-id", a.id);
            tdShowVideo._$clearZone.show();
            tdShowVideo._$clearZone.prependTo(a.$wrapper.parent());
            tdShowVideo._addBodyClass();
            return (a.moved = !0);
        },
        _movePlayerFromZone: function (a) {
            if (!tdShowVideo._isInitialized || !a.moved) return !1;
            a.$wrapper.parent().removeClass("td-video-fixed");
            tdShowVideo._hideReplacer(a);
            tdShowVideo._refLeft && a.$wrapper.parent().removeClass("td-video-fixed-left");
            tdShowVideo._refBottom && a.$wrapper.parent().removeClass("td-video-fixed-bottom");
            a.$wrapper.parent().removeAttr("style");
            a.$wrapper.css("width", "");
            "undefined" !== typeof a.wrapperHeightBeforeFixed && a.$wrapper.css("height", a.wrapperHeightBeforeFixed + "px");
            "undefined" !== typeof a.restoreFixIndexClass && (a.$wrapper.closest("." + a.parentFixIndexClass).addClass("td-fix-index"), delete a.restoreFixIndexClass, delete a.parentFixIndexClass);
            tdShowVideo._$clearZone.appendTo(tdShowVideo._$body);
            tdShowVideo._$clearZone.hide();
            tdShowVideo._removeBodyClass();
            a.moved = !1;
            return !0;
        },
        _addBodyClass: function () {
            tdShowVideo._$body.addClass(tdShowVideo._bodyClass);
        },
        _removeBodyClass: function () {
            tdShowVideo._$body.removeClass(tdShowVideo._bodyClass);
        },
        _isItemInViewport: function (a) {
            var b = a.initialOffsetTop;
            "undefined" === typeof b && ((b = a.$wrapper.offset().top), (a.initialOffsetTop = b));
            return (b >= tdEvents.scroll_window_scrollTop && b <= tdEvents.scroll_window_scrollTop + tdEvents.window_innerHeight) ||
                (b + a.inlineHeight >= tdEvents.scroll_window_scrollTop && b + a.inlineHeight <= tdEvents.scroll_window_scrollTop + tdEvents.window_innerHeight)
                ? !0
                : !1;
        },
        _pauseOtherPlayers: function () {
            tdShowVideo.items.forEach(function (a) {
                tdShowVideo._isItemInViewport(a) ||
                    a.moved ||
                    ("undefined" !== typeof a.player &&
                        ("youtube" === a.playerType && "undefined" !== typeof a.player.getPlayerState && a.player.getPlayerState() === YT.PlayerState.PLAYING
                            ? a.player.pauseVideo()
                            : "vimeo" === a.playerType && "undefined" !== typeof a.internalStatus && "VIMEO_PLAYING" === a.internalStatus
                            ? a.player.pause()
                            : "video" === a.playerType && "undefined" !== typeof a.internalStatus && "VIDEO_PLAYING" === a.internalStatus && a.player.pause()));
            });
        },
        _pausePlayer: function (a) {
            "undefined" !== typeof a.player &&
                ("youtube" === a.playerType && "undefined" !== typeof a.player.getPlayerState && a.player.getPlayerState() === YT.PlayerState.PLAYING
                    ? a.player.pauseVideo()
                    : "vimeo" === a.playerType && "undefined" !== typeof a.internalStatus && "VIMEO_PLAYING" === a.internalStatus
                    ? a.player.pause()
                    : "video" === a.playerType && "undefined" !== typeof a.internalStatus && "VIDEO_PLAYING" === a.internalStatus && a.player.pause());
        },
        _clearZone: function () {
            tdShowVideo._isInitialized &&
                tdShowVideo.items.forEach(function (a) {
                    tdShowVideo._movePlayerFromZone(a, !0);
                });
        },
        _clearPlayerStarted: function (a) {
            tdShowVideo.items.forEach(function (b) {
                "undefined" !== typeof a ? b !== a && "undefined" !== typeof b.playerStarted && delete b.playerStarted : "undefined" !== typeof b.playerStarted && delete b.playerStarted;
            });
        },
        _getReplacer: function (a) {
            if (tdShowVideo._isInitialized) {
                if ("undefined" !== typeof a.$replacer) return a.$replacer;
                a.$replacer = jQuery('<div class="td-video-replacer" data-id="' + a.$wrapper.data("id") + '" style="position: absolute; visibility: hidden; width:' + a.inlineWidth + "px;height:" + a.inlineHeight + 'px"></div>');
                return a.$replacer;
            }
        },
        _showReplacer: function (a) {
            tdShowVideo._isInitialized && tdShowVideo._getReplacer(a).css("position", "relative");
        },
        _hideReplacer: function (a) {
            tdShowVideo._isInitialized && tdShowVideo._getReplacer(a).css("position", "absolute");
        },
        _getUniqueId: function () {
            return "uid_" + Math.floor(1e4 * Math.random() + 1) + "_" + Math.floor(100 * Math.random() + 1);
        },
        addPlayerStarted: function (a) {
            tdShowVideo._isInitialized &&
                tdShowVideo.items.forEach(function (b) {
                    b.player === a
                        ? (b.playerStarted = !0)
                        : tdShowVideo._playingOne &&
                          ("youtube" === b.playerType && "undefined" !== typeof b.player
                              ? b.player.pauseVideo()
                              : "vimeo" === b.playerType && "undefined" !== typeof b.player
                              ? b.player.pause()
                              : "video" === b.playerType && "undefined" !== typeof b.player && b.player.pause(),
                          (b.playerStarted = !1));
                });
        },
        clearPlayerStarted: function (a) {
            tdShowVideo._isInitialized &&
                tdShowVideo.items.forEach(function (b) {
                    b.player === a && "undefined" !== typeof b.playerStarted && delete b.playerStarted;
                });
        },
        onYoutubeReadyEvent: function (a) {
            tdShowVideo._isInitialized && a.target.setPlaybackQuality("hd720");
        },
        onYoutubeStateChangeEvent: function (a) {
            if (tdShowVideo._isInitialized)
                switch (a.target.getPlayerState()) {
                    case YT.PlayerState.PLAYING:
                        tdShowVideo.addPlayerStarted(a.target);
                        break;
                    case YT.PlayerState.ENDED:
                        tdShowVideo.clearPlayerStarted(a.target);
                }
        },
    };
})();
window.onYouTubeIframeAPIReady = function () {
    tdShowVideo.init();
    jQuery(".td-youtube-player, .wp-block-embed-youtube iframe").each(function () {
        var a = jQuery(this),
            b = new tdShowVideo.item();
        b.playerType = "youtube";
        b.inlineWidth = a.outerWidth();
        b.inlineHeight = a.outerHeight();
        b.$wrapper = a;
        b.player = new YT.Player(this, { height: "720", width: "960", events: { onReady: tdShowVideo.onYoutubeReadyEvent, onStateChange: tdShowVideo.onYoutubeStateChangeEvent } });
        tdShowVideo.addItem(b);
    });
};
jQuery(window).load(function () {
    tdYoutubePlayers.players.length &&
        (tdShowVideo.init(),
        tdYoutubePlayers.players.forEach(function (a) {
            var b = new tdShowVideo.item();
            b.playerType = "youtube";
            b.inlineWidth = a.jqPlayerWrapper.outerWidth();
            b.inlineHeight = a.jqPlayerWrapper.outerHeight();
            b.$wrapper = a.jqPlayerWrapper;
            b.player = a.tdYtPlayer;
            tdShowVideo.addItem(b);
        }));
});
jQuery(window).load(function () {
    var a = jQuery('.wpb_video_wrapper iframe[src*="vimeo.com"], .wp-block-embed-vimeo iframe[src*="vimeo.com"]');
    a.length &&
        (tdShowVideo.init(),
        a.each(function (a) {
            var b = jQuery(this),
                d = new tdShowVideo.item();
            d.playerType = "vimeo";
            d.inlineWidth = b.outerWidth();
            d.inlineHeight = b.outerHeight();
            d.$wrapper = b;
            d.id = a;
            d.player = new Vimeo.Player(this);
            d.player.on("play", function () {
                d.internalStatus = "VIMEO_PLAYING";
                tdShowVideo.addPlayerStarted(d.player);
            });
            d.player.on("pause", function () {
                d.internalStatus = void 0;
            });
            d.player.on("ended", function (a) {
                d.internalStatus = void 0;
                tdShowVideo.clearPlayerStarted(d.player);
            });
            tdShowVideo.addItem(d);
        }));
});
jQuery(window).ready(function () {
    var a = !1;
    if (
        ("undefined" !== typeof window.tds_video_scroll && "" !== window.tds_video_scroll) ||
        ("undefined" !== typeof window.tds_video_playing_one && "" !== window.tds_video_playing_one) ||
        ("undefined" !== typeof window.tds_video_pause_hidden && "" !== window.tds_video_pause_hidden)
    )
        a = !0;
    a &&
        (jQuery('.wpb_video_wrapper iframe[src*="vimeo.com"], .wp-block-embed-vimeo iframe[src*="vimeo.com"]').length && tdShowVideo.loadApiVimeo(),
        jQuery(".td-youtube-player, .wp-block-embed-youtube iframe").length && tdShowVideo.loadApiYoutube());
    a = jQuery("video");
    a.length &&
        (tdShowVideo.init(),
        a.each(function (a) {
            var b = jQuery(this),
                d = new tdShowVideo.item();
            d.playerType = "video";
            d.inlineWidth = b.outerWidth();
            d.inlineHeight = b.outerHeight();
            d.$wrapper = b;
            d.id = a;
            d.player = this;
            d.player.addEventListener(
                "play",
                function (a) {
                    d.internalStatus = "VIDEO_PLAYING";
                    tdShowVideo.addPlayerStarted(d.player);
                },
                !0
            );
            d.player.addEventListener(
                "pause",
                function (a) {
                    d.internalStatus = void 0;
                    tdShowVideo.addPlayerStarted(d.player);
                },
                !0
            );
            d.player.addEventListener(
                "ended",
                function (a) {
                    d.internalStatus = void 0;
                    tdShowVideo.addPlayerStarted(d.player);
                },
                !0
            );
            tdShowVideo.addItem(d);
        }));
});
var tdAnimationStack = {};
(function () {
    tdAnimationStack = {
        _animation_css_class1: "",
        _animation_css_class2: "",
        _animation_default_effect: "type0",
        activated: !1,
        _ready_for_initialization: !0,
        _ready_init_timeout: void 0,
        max_waiting_for_init: 3e3,
        _specific_selectors: "",
        _general_selectors: "",
        live_load_items: !1,
        ready_init: function () {
            tdDetect.isIe8 || tdDetect.isIe9 || 0 < jQuery(".vc_images_carousel").length
                ? ((tdAnimationStack._ready_for_initialization = !1),
                  void 0 !== window.td_animation_stack_effect &&
                      ("" === window.td_animation_stack_effect && (window.td_animation_stack_effect = tdAnimationStack._animation_default_effect), jQuery("body").removeClass("td-animation-stack-" + window.td_animation_stack_effect)))
                : void 0 === window.tds_animation_stack || void 0 === window.td_animation_stack_effect
                ? (tdAnimationStack._ready_for_initialization = !1)
                : (void 0 !== window.td_animation_stack_specific_selectors && (tdAnimationStack._specific_selectors = window.td_animation_stack_specific_selectors),
                  "" === window.td_animation_stack_effect && (window.td_animation_stack_effect = tdAnimationStack._animation_default_effect),
                  (tdAnimationStack._animation_css_class1 = "td-animation-stack-" + window.td_animation_stack_effect + "-1"),
                  (tdAnimationStack._animation_css_class2 = "td-animation-stack-" + window.td_animation_stack_effect + "-2"),
                  void 0 !== window.td_animation_stack_general_selectors && (tdAnimationStack._general_selectors = window.td_animation_stack_general_selectors),
                  jQuery(tdAnimationStack._general_selectors).addClass(tdAnimationStack._animation_css_class1),
                  (tdAnimationStack._ready_init_timeout = setTimeout(function () {
                      tdAnimationStack.log("%c _ready_init_timeout run ", "background: red; color: white;");
                      if (!0 !== tdAnimationStack.activated) {
                          tdAnimationStack._ready_for_initialization = !1;
                          jQuery(tdAnimationStack._general_selectors)
                              .not("." + tdAnimationStack._animation_css_class2)
                              .removeClass(tdAnimationStack._animation_css_class1);
                          var a = jQuery(".td-animation-stack, .post").find(tdAnimationStack._specific_selectors);
                          tdAnimationStack.log("_ready_init_timeout found elements: " + a.length);
                          a.each(function (a, c) {
                              a = jQuery(c).data("type");
                              c = jQuery(c);
                              tdAnimationStack.log("type: " + a);
                              tdAnimationStack.log("src: " + c.data("img-url"));
                              switch (a) {
                                  case "image_tag":
                                      void 0 !== c.data("img-retina-url") && !0 === tdAnimationStack._isHighDensity() ? c.attr("src", c.data("img-retina-url")) : c.attr("src", c.data("img-url"));
                                      break;
                                  case "css_image":
                                      void 0 !== c.data("img-retina-url") && !0 === tdAnimationStack._isHighDensity()
                                          ? c.attr("style", "background-image: url(" + c.data("img-retina-url") + ")")
                                          : c.attr("style", "background-image: url(" + c.data("img-url") + ")");
                              }
                          });
                          void 0 !== window.td_animation_stack_effect && jQuery("body").removeClass("td-animation-stack-" + window.td_animation_stack_effect);
                      }
                  }, tdAnimationStack.max_waiting_for_init)));
        },
        _ITEM_TO_VIEW_PORT: { ITEM_ABOVE_VIEW_PORT: 0, ITEM_IN_VIEW_PORT: 1, ITEM_UNDER_VIEW_PORT: 2 },
        SORTED_METHOD: {
            sort_left_to_right: function (a, b) {
                return a.offset_top > b.offset_top ? 1 : a.offset_top < b.offset_top ? -1 : a._order > b._order ? 1 : a._order < b._order ? -1 : 0;
            },
            sort_right_to_left: function (a, b) {
                return a.offset_top > b.offset_top || (!(a.offset_top < b.offset_top || a._order > b._order) && a._order < b._order) ? 1 : -1;
            },
        },
        _order: 0,
        interval: 70,
        min_interval: 17,
        max_interval: 40,
        _current_interval: void 0,
        _items_in_view_port: [],
        _items_above_view_port: [],
        items: [],
        item: function () {
            this.itemImgRetinaSrc = this.itemType = this.itemSrc = this._order = this.jqueryObj = this.offset_bottom_to_top = this.offset_top = void 0;
        },
        _initialize_item: function (a) {
            a._order = tdAnimationStack._order++;
            a.offset_top = a.jqueryObj.offset().top;
            a.offset_bottom_to_top = a.offset_top + a.jqueryObj.height();
        },
        check_for_new_items: function (a, b, c, d) {
            if (!1 !== tdAnimationStack.activated && !1 !== tdAnimationStack._ready_for_initialization) {
                void 0 === a && (a = "");
                var f = [];
                jQuery(tdAnimationStack._general_selectors)
                    .not("." + tdAnimationStack._animation_css_class2)
                    .addClass(tdAnimationStack._animation_css_class1);
                var e = jQuery(a + ", .post")
                    .find(tdAnimationStack._specific_selectors)
                    .filter(function () {
                        return jQuery(this).hasClass(tdAnimationStack._animation_css_class1);
                    });
                e.each(function (a, b) {
                    a = new tdAnimationStack.item();
                    a.jqueryObj = jQuery(b);
                    a.itemSrc = jQuery(b).data("img-url");
                    a.itemType = jQuery(b).data("type");
                    void 0 !== jQuery(b).data("img-retina-url") && (a.itemImgRetinaSrc = jQuery(b).data("img-retina-url"));
                    tdAnimationStack._initialize_item(a);
                    f.push(a);
                });
                !0 === d
                    ? (tdAnimationStack.log("%c live load items ", "background: brown; color: white;"), tdAnimationStack._precompute_items(f, b, c), tdAnimationStack.compute_items(d))
                    : (tdAnimationStack.log("%c preload items ", "background: brown; color: white;"),
                      (function () {
                          for (var a = !0, d = 0; d < f.length; d++)
                              if (!1 === e[d].complete) {
                                  a = !1;
                                  break;
                              }
                          if (!1 === a) {
                              var q = new Date().getTime();
                              tdAnimationStack.log("TIMER - started");
                              var u = setInterval(function () {
                                  var d;
                                  if (new Date().getTime() - q > tdAnimationStack.max_waiting_for_init)
                                      for (clearInterval(u), d = 0; d < f.length; d++) f[d].jqueryObj.removeClass(tdAnimationStack._animation_css_class1), f[d].jqueryObj.addClass(tdAnimationStack._animation_css_class2);
                                  else {
                                      a = !0;
                                      for (d = 0; d < f.length; d++)
                                          if (!1 === e[d].complete) {
                                              a = !1;
                                              break;
                                          }
                                      !0 === a && (clearInterval(u), tdAnimationStack.log("TIMER - stopped"), tdAnimationStack._precompute_items(f, b, c), tdAnimationStack.compute_items(!1));
                                  }
                              }, 100);
                          } else tdAnimationStack._precompute_items(f, b, c), tdAnimationStack.compute_items(!1);
                      })());
                tdAnimationStack.log("checked for new items finished");
            }
        },
        _precompute_items: function (a, b, c) {
            a.sort(b);
            if (!0 === c) for (; 0 < a.length; ) tdAnimationStack.log("add item 1 : " + a.length), tdAnimationStack._items_in_view_port.push(a.shift());
            else for (; 0 < a.length; ) tdAnimationStack.log("add item 2 : " + a.length), tdAnimationStack.items.push(a.shift());
        },
        init: function () {
            void 0 === window.tds_animation_stack
                ? tdAnimationStack.log("%c theme lazy loading animation is off! ", "background: #eb4026;")
                : (tdAnimationStack.log("%c theme lazy loading animation is on! ", "background: #03c04a; color: #fff;"),
                  !1 !== tdAnimationStack._ready_for_initialization &&
                      (clearTimeout(tdAnimationStack._ready_init_timeout), (tdAnimationStack.activated = !0), tdAnimationStack.check_for_new_items(".td-animation-stack", tdAnimationStack.SORTED_METHOD.sort_left_to_right, !1, !0)));
        },
        reinit: function () {
            !1 !== tdAnimationStack._ready_for_initialization && ((tdAnimationStack.items = []), (tdAnimationStack._items_in_view_port = []), (tdAnimationStack._items_above_view_port = []), tdAnimationStack.init());
        },
        compute_items: function (a) {
            if (!1 !== tdAnimationStack.activated && !1 !== tdAnimationStack._ready_for_initialization) {
                for (tdAnimationStack._separate_items(); 0 < tdAnimationStack._items_above_view_port.length; ) {
                    tdAnimationStack.log("animation - above the view port");
                    var b = tdAnimationStack._items_above_view_port.shift();
                    !0 === a
                        ? (tdAnimationStack._load_item(b, !1), tdAnimationStack.log("%c item above view port - loaded ", "background: #fef24e; color: #000;"))
                        : (b.jqueryObj.removeClass(tdAnimationStack._animation_css_class1), b.jqueryObj.addClass(tdAnimationStack._animation_css_class2));
                }
                0 < tdAnimationStack._items_in_view_port.length &&
                    (clearInterval(tdAnimationStack._current_interval),
                    (b = tdAnimationStack._get_item_from_view_port()),
                    !0 === a
                        ? (tdAnimationStack._load_item(b, !1), tdAnimationStack.log("%c item in view port - loaded ", "background: #fef24e; color: #000;"))
                        : (b.jqueryObj.removeClass(tdAnimationStack._animation_css_class1), b.jqueryObj.addClass(tdAnimationStack._animation_css_class2)),
                    0 < tdAnimationStack._items_in_view_port.length &&
                        (tdAnimationStack.log("start animation timer"), tdAnimationStack._to_timer(tdAnimationStack._get_right_interval((1 / tdAnimationStack._items_in_view_port.length) * tdAnimationStack.interval), a)));
            }
        },
        _to_timer: function (a, b) {
            tdAnimationStack._current_interval = setInterval(function () {
                if (0 < tdAnimationStack._items_in_view_port.length) {
                    var c = tdAnimationStack._get_item_from_view_port();
                    tdAnimationStack.log("animation at interval: " + a);
                    !0 === b
                        ? (tdAnimationStack._load_item(c, !1), tdAnimationStack.log("%c item above view port - loaded > _to_timer ", "background: #3895d3; color: #fff;"))
                        : (c.jqueryObj.removeClass(tdAnimationStack._animation_css_class1), c.jqueryObj.addClass(tdAnimationStack._animation_css_class2));
                    clearInterval(tdAnimationStack._current_interval);
                    0 < tdAnimationStack._items_in_view_port.length && tdAnimationStack._to_timer(tdAnimationStack._get_right_interval((1 / tdAnimationStack._items_in_view_port.length) * tdAnimationStack.interval), b);
                }
            }, a);
        },
        _get_item_from_view_port: function () {
            return tdAnimationStack._items_in_view_port.shift();
        },
        _get_right_interval: function (a) {
            return a < tdAnimationStack.min_interval ? tdAnimationStack.min_interval : a > tdAnimationStack.max_interval ? tdAnimationStack.max_interval : a;
        },
        _item_to_view_port: function (a) {
            tdAnimationStack.log("position item relative to the view port >> yOffset " + tdEvents.window_pageYOffset + " | xOffset " + tdEvents.window_innerHeight + " : " + a.offset_top);
            return tdEvents.window_pageYOffset + tdEvents.window_innerHeight < a.offset_top
                ? tdAnimationStack._ITEM_TO_VIEW_PORT.ITEM_UNDER_VIEW_PORT
                : tdEvents.window_pageYOffset + tdEvents.window_innerHeight >= a.offset_top && tdEvents.window_pageYOffset <= a.offset_bottom_to_top
                ? tdAnimationStack._ITEM_TO_VIEW_PORT.ITEM_IN_VIEW_PORT
                : tdAnimationStack._ITEM_TO_VIEW_PORT.ITEM_ABOVE_VIEW_PORT;
        },
        _separate_items: function () {
            if (0 !== tdAnimationStack.items.length)
                for (tdAnimationStack.log("%c _separate_items - total items: " + tdAnimationStack.items.length + " ", "background: #999da0; color: #fff;"); 0 < tdAnimationStack.items.length; )
                    switch (tdAnimationStack._item_to_view_port(tdAnimationStack.items[0])) {
                        case tdAnimationStack._ITEM_TO_VIEW_PORT.ITEM_ABOVE_VIEW_PORT:
                            tdAnimationStack._items_above_view_port.push(tdAnimationStack.items.shift());
                            break;
                        case tdAnimationStack._ITEM_TO_VIEW_PORT.ITEM_IN_VIEW_PORT:
                            tdAnimationStack._items_in_view_port.push(tdAnimationStack.items.shift());
                            break;
                        case tdAnimationStack._ITEM_TO_VIEW_PORT.ITEM_UNDER_VIEW_PORT:
                            tdAnimationStack.log("after separation items >> above: " + tdAnimationStack._items_above_view_port.length + " in: " + tdAnimationStack._items_in_view_port.length + " under: " + tdAnimationStack.items.length);
                            return;
                    }
        },
        _load_item: function (a, b) {
            if (void 0 === a.itemSrc)
                tdAnimationStack.log("%c item with no data url ", "background: #fc6600; color: #fff;"), a.jqueryObj.removeClass(tdAnimationStack._animation_css_class1), a.jqueryObj.addClass(tdAnimationStack._animation_css_class2);
            else if (((b = a.itemType), void 0 !== b))
                switch (b) {
                    case "image_tag":
                        tdAnimationStack.log("%c image tag ", "background: #3ded97; color: #fff;");
                        a.jqueryObj.data("complete", !1);
                        void 0 !== a.itemImgRetinaSrc && !0 === tdAnimationStack._isHighDensity()
                            ? a.jqueryObj.attr("src", a.itemImgRetinaSrc).load(function () {
                                  a.jqueryObj.data("complete", !0);
                              })
                            : a.jqueryObj.attr("src", a.itemSrc).load(function () {
                                  a.jqueryObj.data("complete", !0);
                              });
                        var c = new Date().getTime(),
                            d = setInterval(function () {
                                var b = new Date();
                                !0 === a.jqueryObj.data("complete")
                                    ? (clearInterval(d), a.jqueryObj.removeClass(tdAnimationStack._animation_css_class1), a.jqueryObj.addClass(tdAnimationStack._animation_css_class2))
                                    : b.getTime() - c > tdAnimationStack.max_waiting_for_init &&
                                      (clearInterval(d), a.jqueryObj.removeClass(tdAnimationStack._animation_css_class1), a.jqueryObj.addClass(tdAnimationStack._animation_css_class2));
                            }, 100);
                        break;
                    case "css_image":
                        a.jqueryObj.data("complete", !1);
                        tdAnimationStack.log("%c image tag ", "background: #3ded97; color: #fff;");
                        void 0 !== a.itemImgRetinaSrc && !0 === tdAnimationStack._isHighDensity()
                            ? jQuery("<img/>")
                                  .attr("src", a.itemImgRetinaSrc)
                                  .load(function () {
                                      jQuery(this).remove();
                                      a.jqueryObj.data("complete", !0);
                                  })
                            : jQuery("<img/>")
                                  .attr("src", a.itemSrc)
                                  .load(function () {
                                      jQuery(this).remove();
                                      a.jqueryObj.data("complete", !0);
                                  });
                        var f = new Date().getTime(),
                            e = setInterval(function () {
                                var b = new Date();
                                !0 === a.jqueryObj.data("complete")
                                    ? (void 0 !== a.itemImgRetinaSrc && !0 === tdAnimationStack._isHighDensity()
                                          ? a.jqueryObj.attr("style", "background-image: url(" + a.itemImgRetinaSrc + ")")
                                          : a.jqueryObj.attr("style", "background-image: url(" + a.itemSrc + ")"),
                                      clearInterval(e),
                                      a.jqueryObj.removeClass(tdAnimationStack._animation_css_class1),
                                      a.jqueryObj.addClass(tdAnimationStack._animation_css_class2))
                                    : b.getTime() - f > tdAnimationStack.max_waiting_for_init &&
                                      (clearInterval(e),
                                      void 0 !== a.itemImgRetinaSrc && !0 === tdAnimationStack._isHighDensity()
                                          ? a.jqueryObj.attr("style", "background-image: url(" + a.itemImgRetinaSrc + ")")
                                          : a.jqueryObj.attr("style", "background-image: url(" + a.itemSrc + ")"),
                                      a.jqueryObj.removeClass(tdAnimationStack._animation_css_class1),
                                      a.jqueryObj.addClass(tdAnimationStack._animation_css_class2));
                            }, 100);
                }
        },
        td_events_scroll: function () {
            tdAnimationStack.compute_items(!0);
        },
        td_events_resize: function () {
            clearInterval(tdAnimationStack._current_interval);
            tdAnimationStack.reinit();
        },
        log: function (a, b) {},
        _isHighDensity: function () {
            return (
                (window.matchMedia &&
                    (window.matchMedia("only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)").matches ||
                        window.matchMedia(
                            "only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)"
                        ).matches)) ||
                (window.devicePixelRatio && 1.3 < window.devicePixelRatio)
            );
        },
        _isRetina: function () {
            return (
                ((window.matchMedia &&
                    (window.matchMedia("only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)").matches ||
                        window.matchMedia(
                            "only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)"
                        ).matches)) ||
                    (window.devicePixelRatio && 2 <= window.devicePixelRatio)) &&
                /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
            );
        },
    };
})();
("use strict");
tdAffix.init({
    menu_selector: ".td-header-menu-wrap",
    menu_wrap_selector: ".td-header-menu-wrap-full",
    tds_snap_menu: tdUtil.getBackendVar("tds_snap_menu"),
    tds_snap_menu_logo: tdUtil.getBackendVar("tds_logo_on_sticky"),
    menu_affix_height: 48,
    menu_affix_height_on_mobile: 54,
});
"enabled" === tdUtil.getBackendVar("tds_smart_sidebar") &&
    jQuery(window).load(function () {
        jQuery(".td-ss-row").each(function () {
            var a = new tdSmartSidebar.item(),
                c = jQuery(this).children(".td-pb-span8").find(".wpb_wrapper:first"),
                d = jQuery(this).children(".td-pb-span4").find(".wpb_wrapper:first");
            0 < c.length && 0 < d.length && ((a.sidebar_jquery_obj = d), (a.content_jquery_obj = c), tdSmartSidebar.add_item(a));
        });
        if (0 < jQuery(".td-ss-main-content").length && 0 < jQuery(".td-ss-main-sidebar").length) {
            var a = new tdSmartSidebar.item();
            a.sidebar_jquery_obj = jQuery(".td-ss-main-sidebar");
            a.content_jquery_obj = jQuery(".td-ss-main-content");
            tdSmartSidebar.add_item(a);
        }
        tdSmartSidebar.td_events_resize();
    });
jQuery(window).load(function () {
    [{ ".vc_row": ".vc_column" }, { ".vc_row_inner": ".vc_column_inner" }].forEach(function (a) {
        for (var b in a) {
            var c = a[b];
            jQuery(b).each(function () {
                var a = [],
                    b;
                jQuery(this)
                    .children(c)
                    .each(function (c, d) {
                        c = jQuery(d);
                        if (c.hasClass("td-is-sticky")) a.push(c.find(".wpb_wrapper:first"));
                        else if ("undefined" === typeof b || b.outerHeight(!0) < c.outerHeight(!0)) b = c.find(".wpb_wrapper:first");
                    });
                a.length &&
                    "undefined" !== typeof b &&
                    a.forEach(function (a) {
                        var c = new tdSmartSidebar.item();
                        c.sidebar_jquery_obj = a;
                        c.content_jquery_obj = b;
                        tdSmartSidebar.add_item(c);
                    });
            });
        }
    });
    tdSmartSidebar.td_events_resize();
});
jQuery(window).load(function () {
    jQuery(".td-subcat-filter").each(function (a, b) {
        a = jQuery(b);
        b = a.find(".td-subcat-list:first");
        var c = new tdPullDown.item();
        c.blockUid = a.parent().parent().data("td-block-uid");
        c.horizontal_jquery_obj = b;
        c.vertical_jquery_obj = a.find(".td-subcat-dropdown:first");
        c.horizontal_element_css_class = "td-subcat-item";
        c.container_jquery_obj = b.closest(".td-block-title-wrap");
        c.excluded_jquery_elements = [c.container_jquery_obj.find(".td-pulldown-size")];
        tdPullDown.add_item(c);
    });
    jQuery(".td-category-siblings").each(function (a, b) {
        a = jQuery(b);
        b = a.find(".td-category:first");
        var c = new tdPullDown.item();
        c.blockUid = a.parent().parent().data("td-block-uid");
        c.horizontal_jquery_obj = b;
        c.vertical_jquery_obj = a.find(".td-subcat-dropdown:first");
        c.horizontal_element_css_class = "entry-category";
        c.container_jquery_obj = b.parents(".td-category-siblings:first");
        tdPullDown.add_item(c);
    });
});
function td_compute_parallax_background(a) {
    a = jQuery(a);
    var b = Math.round(0.2 * a.height()),
        c = -1 * b,
        d = new tdAnimationScroll.item();
    d.jqueryObj = a;
    d.add_item_property("move_y", 0, 100, c, b, "");
    d.animation_callback = function () {
        var a = parseFloat(d.computed_item_properties.move_y).toFixed();
        d.jqueryObj.css({ "-webkit-transform": "translate3d(0px," + a + "px, 0px) scale(1.2)", transform: "translate3d(0px," + a + "px, 0px) scale(1.2)" });
        d.redraw = !1;
        d.td_video_parallax = !0;
    };
    tdAnimationScroll.add_item(d);
}
function td_compute_backstretch_item(a) {
    var b = (100 * (tdEvents.window_innerHeight - a.offset_top)) / (tdEvents.window_innerHeight + a.full_height),
        c = (100 * tdEvents.window_innerHeight) / (tdEvents.window_innerHeight + a.full_height),
        d = a.offset_top / 4;
    0 == d && (d = 100);
    var f = ((d / 1.2) * (100 - b)) / (c - b);
    c = -d / 2 + 0.5;
    a.remove_item_property("move_y");
    a.add_item_property("move_y", b, 100, c, f, "");
    var e = parseFloat(1 + Math.abs(d) / a.full_height).toFixed(2);
    delete a.animation_callback;
    a.animation_callback = function () {
        var b = parseFloat(a.computed_item_properties.move_y).toFixed();
        a.jqueryObj.css({ left: "50%", "-webkit-transform": "translate3d(-50%," + b + "px, 0px) scale(" + e + "," + e + ")", transform: "translate3d(-50%," + b + "px, 0px) scale(" + e + "," + e + ")" });
        a.redraw = !1;
    };
}
var td_backstretch_items = [];
jQuery(window).ready(function () {
    jQuery(".td-backstretch").each(function (a, b) {
        jQuery(b).hasClass("not-parallax") ||
            ((a = new tdAnimationScroll.item()), (a.jqueryObj = jQuery(b)), (a.wrapper_jquery_obj = a.jqueryObj.parent()), tdAnimationScroll.add_item(a), td_backstretch_items.push(a), td_compute_backstretch_item(a));
    });
    jQuery(".td-parallax-header").each(function (a, b) {
        var c = new tdAnimationScroll.item();
        c.jqueryObj = jQuery(b);
        c.add_item_property("move_y", 50, 100, 0, 100, "");
        c.add_item_property("opacity", 50, 100, 1, 0, "");
        c.animation_callback = function () {
            var a = parseFloat(c.computed_item_properties.move_y).toFixed(),
                b = parseFloat(c.computed_item_properties.opacity);
            c.jqueryObj.css({ "-webkit-transform": "translate3d(0px," + a + "px, 0px)", transform: "translate3d(0px," + a + "px, 0px)" });
            c.jqueryObj.css("transform", "translate3d(0px," + a + "px, 0px)");
            c.jqueryObj.css("opacity", b);
            c.redraw = !1;
        };
        tdAnimationScroll.add_item(c);
    });
    tdAnimationScroll.compute_all_items();
    setTimeout(function () {
        jQuery(".tdc-video-parallax-wrapper").each(function (a, b) {
            td_compute_parallax_background(b);
        });
        tdAnimationScroll.compute_all_items();
    }, 300);
    tdAnimationStack.ready_init();
});
var tdAjaxLoop = {};
(function () {
    tdAjaxLoop = {
        loopState: { sidebarPosition: "", moduleId: 1, currentPage: 1, max_num_pages: 0, atts: {}, ajax_pagination_infinite_stop: 0, server_reply_html_data: "" },
        init: function () {
            jQuery(".td-ajax-loop-infinite").each(function () {
                var a = new tdInfiniteLoader.item();
                a.jqueryObj = jQuery(this);
                a.uid = "tdAjaxLoop";
                a.isVisibleCallback = function () {
                    0 !== tdAjaxLoop.loopState.ajax_pagination_infinite_stop &&
                    tdAjaxLoop.loopState.currentPage >= tdAjaxLoop.loopState.ajax_pagination_infinite_stop &&
                    tdAjaxLoop.loopState.currentPage + 1 < tdAjaxLoop.loopState.max_num_pages
                        ? jQuery(".td-load-more-infinite-wrap").css("display", "block").css("visibility", "visible")
                        : tdAjaxLoop.infiniteNextPage(!1);
                };
                tdInfiniteLoader.addItem(a);
            });
            jQuery(".td-load-more-infinite-wrap").on("click", function (a) {
                a.preventDefault();
                jQuery(".td-load-more-infinite-wrap").css("visibility", "hidden");
                tdAjaxLoop.infiniteNextPage(!0);
            });
        },
        infiniteNextPage: function (a) {
            tdAjaxLoop.loopState.currentPage++;
            tdAjaxLoop.loopState.server_reply_html_data = "";
            tdAjaxLoop.loopState.currentPage > tdAjaxLoop.loopState.max_num_pages ||
                (jQuery(".td-ss-main-content").append('<div class="td-loader-gif td-loader-infinite td-loader-animation-start"></div>'),
                tdLoadingBox.init(tds_theme_color_site_wide, 45),
                setTimeout(function () {
                    jQuery(".td-loader-gif").removeClass("td-loader-animation-start").addClass("td-loader-animation-mid");
                }, 50),
                jQuery.ajax({
                    type: "POST",
                    url: td_ajax_url,
                    cache: !0,
                    data: { action: "td_ajax_loop", loopState: tdAjaxLoop.loopState },
                    success: function (b, c, d) {
                        tdAjaxLoop._processAjaxRequest(b, a);
                    },
                    error: function (a, c, d) {},
                }));
        },
        _processAjaxRequest: function (a, b) {
            jQuery(".td-loader-gif").remove();
            tdLoadingBox.stop();
            a = jQuery.parseJSON(a);
            "" === a.server_reply_html_data
                ? jQuery(".td-load-more-infinite-wrap").css("visibility", "hidden")
                : (jQuery(".td-ajax-loop-infinite").before(a.server_reply_html_data),
                  parseInt(a.currentPage) >= parseInt(a.max_num_pages) ? jQuery(".td-load-more-infinite-wrap").css("visibility", "hidden") : !0 === b && jQuery(".td-load-more-infinite-wrap").css("visibility", "visible"),
                  setTimeout(function () {
                      tdAnimationStack.check_for_new_items(".td-main-content .td-animation-stack", tdAnimationStack.SORTED_METHOD.sort_left_to_right, !0, !1);
                  }, 200),
                  !0 !== b &&
                      (setTimeout(function () {
                          tdInfiniteLoader.computeTopDistances();
                          tdInfiniteLoader.enable_is_visible_callback("tdAjaxLoop");
                      }, 500),
                      setTimeout(function () {
                          tdInfiniteLoader.computeTopDistances();
                      }, 1e3),
                      setTimeout(function () {
                          tdInfiniteLoader.computeTopDistances();
                      }, 1500)));
        },
    };
})();
var tdWeather = {};
(function () {
    tdWeather = {
        _icons: {
            "01d": "clear-sky-d",
            "02d": "few-clouds-d",
            "03d": "scattered-clouds-d",
            "04d": "broken-clouds-d",
            "09d": "shower-rain-d",
            "10d": "rain-d",
            "11d": "thunderstorm-d",
            "13d": "snow-d",
            "50d": "mist-d",
            "01n": "clear-sky-n",
            "02n": "few-clouds-n",
            "03n": "scattered-clouds-n",
            "04n": "broken-clouds-n",
            "09n": "shower-rain-n",
            "10n": "rain-n",
            "11n": "thunderstorm-n",
            "13n": "snow-n",
            "50n": "mist-n",
        },
        _currentRequestInProgress: !1,
        _currentItem: "",
        _currentLatitude: 0,
        _currentLongitude: 0,
        _currentPositionCacheKey: "",
        _currentLocationCacheKey: "",
        _currentLocation: "",
        items: [],
        _is_location_open: !1,
        init: function () {
            jQuery(".td-icons-location").on("click", function () {
                !0 !== tdWeather._currentRequestInProgress &&
                    ((tdWeather._currentRequestInProgress = !0),
                    (tdWeather._currentItem = tdWeather._getItemByBlockID(jQuery(this).data("block-uid"))),
                    navigator.geolocation && navigator.geolocation.getCurrentPosition(tdWeather._updateLocationCallback, tdWeather._displayLocationApiError, { enableHighAccuracy: !0, timeout: 1e7, maximumAge: 6e5 }),
                    (tdWeather._currentRequestInProgress = !1));
            });
            jQuery(".td-weather-now").on("click", function () {
                !0 !== tdWeather._currentRequestInProgress &&
                    ((tdWeather._currentRequestInProgress = !0),
                    (tdWeather._currentItem = tdWeather._getItemByBlockID(jQuery(this).data("block-uid"))),
                    (tdWeather._currentItem.current_unit = 1 === tdWeather._currentItem.current_unit ? 0 : 1),
                    tdWeather._renderCurrentItem());
            });
            jQuery(".td-manual-location-form").submit(function (a) {
                a.preventDefault();
                !0 !== tdWeather._currentRequestInProgress &&
                    ((tdWeather._currentRequestInProgress = !0),
                    (tdWeather._currentItem = tdWeather._getItemByBlockID(jQuery(this).data("block-uid"))),
                    (tdWeather._currentLocation = jQuery("input#" + jQuery(this).data("block-uid")).val()),
                    tdWeather._updateLocationCallback2(tdWeather._currentLocation),
                    (tdWeather._currentRequestInProgress = !1),
                    tdWeather._hide_manual_location_form());
            });
            jQuery(document).on("click", function (a) {
                !0 === tdWeather._is_location_open && !0 !== jQuery(a.target).hasClass("td-location-set-input") && !0 !== jQuery(a.target).hasClass("td-location-set-button") && tdWeather._hide_manual_location_form();
            });
        },
        addItem: function (a) {
            tdWeather.items.push(a);
        },
        _updateLocationCallback: function (a) {
            tdWeather._currentLatitude = a.coords.latitude;
            tdWeather._currentLongitude = a.coords.longitude;
            tdWeather._currentPositionCacheKey = a.coords.latitude + "_" + a.coords.longitude;
            tdLocalCache.exist(tdWeather._currentPositionCacheKey + "_today")
                ? tdWeather._owmGetTodayDataCallback(tdLocalCache.get(tdWeather._currentPositionCacheKey + "_today"))
                : jQuery.ajax({
                      dataType: "jsonp",
                      url:
                          "https://api.openweathermap.org/data/2.5/weather?lat=" +
                          tdWeather._currentLatitude +
                          "&lon=" +
                          tdWeather._currentLongitude +
                          "&units=metric&lang=" +
                          tdWeather._currentItem.api_language +
                          "&appid=" +
                          tdWeather._currentItem.api_key,
                      success: tdWeather._owmGetTodayDataCallback,
                      cache: !0,
                  });
        },
        _owmGetTodayDataCallback: function (a) {
            tdLocalCache.set(tdWeather._currentPositionCacheKey + "_today", a);
            tdWeather._currentItem.api_location = a.name;
            tdWeather._currentItem.today_clouds = tdUtil.round(a.clouds.all);
            tdWeather._currentItem.today_humidity = tdUtil.round(a.main.humidity);
            tdWeather._currentItem.today_icon = tdWeather._icons[a.weather[0].icon];
            tdWeather._currentItem.today_icon_text = a.weather[0].description;
            tdWeather._currentItem.today_max[0] = tdUtil.round(a.main.temp_max, 1);
            tdWeather._currentItem.today_max[1] = tdWeather._celsiusToFahrenheit(a.main.temp_max);
            tdWeather._currentItem.today_min[0] = tdUtil.round(a.main.temp_min, 1);
            tdWeather._currentItem.today_min[1] = tdWeather._celsiusToFahrenheit(a.main.temp_min);
            tdWeather._currentItem.today_temp[0] = tdUtil.round(a.main.temp, 1);
            tdWeather._currentItem.today_temp[1] = tdWeather._celsiusToFahrenheit(a.main.temp);
            tdWeather._currentItem.today_wind_speed[0] = tdUtil.round(a.wind.speed, 1);
            tdWeather._currentItem.today_wind_speed[1] = tdWeather._kmphToMph(a.wind.speed);
            tdLocalCache.exist(tdWeather._currentPositionCacheKey)
                ? tdWeather._owmGetFiveDaysData(tdLocalCache.get(tdWeather._currentPositionCacheKey))
                : jQuery.ajax({
                      dataType: "jsonp",
                      url:
                          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
                          tdWeather._currentLatitude +
                          "&lon=" +
                          tdWeather._currentLongitude +
                          "&units=metric&lang=" +
                          tdWeather._currentItem.api_language +
                          "&appid=" +
                          tdWeather._currentItem.api_key,
                      success: tdWeather._owmGetFiveDaysData,
                      cache: !0,
                  });
        },
        _owmGetFiveDaysData: function (a) {
            tdLocalCache.set(tdWeather._currentPositionCacheKey, a);
            for (var b = 0; b < tdWeather._currentItem.forecast.length && 5 !== b; b++) {
                var c = tdWeather._currentItem.forecast[b];
                c.day_temp[0] = tdUtil.round(a.list[c.owm_day_index].main.temp_max);
                c.day_temp[1] = tdWeather._celsiusToFahrenheit(c.day_temp[0]);
            }
            tdWeather._renderCurrentItem();
        },
        _renderCurrentItem: function () {
            var a = jQuery("#" + tdWeather._currentItem.block_uid),
                b = tdWeather._currentLatitude,
                c = tdWeather._currentLongitude,
                d = tdWeather._currentLocation;
            a.find(".td-weather-city").html(tdWeather._currentItem.api_location);
            "" === d && 0 === b && 0 === c && a.find(".td-weather-city").html(tdWeather._currentItem.api_location);
            a.find(".td-weather-condition").html(tdWeather._currentItem.today_icon_text);
            b = a.find(".td-w-today-icon");
            b.removeClass();
            b.addClass("td-w-today-icon");
            b.addClass(tdWeather._currentItem.today_icon);
            b = tdWeather._currentItem.current_unit;
            c = "kmh";
            d = "C";
            1 === b && ((c = "mph"), (d = "F"));
            a.find(".td-big-degrees").html(tdWeather._currentItem.today_temp[b]);
            a.find(".td-weather-unit").html(d);
            a.find(".td-w-high-temp").html(tdWeather._currentItem.today_max[b]);
            a.find(".td-w-low-temp").html(tdWeather._currentItem.today_min[b]);
            a.find(".td-w-today-humidity").html(tdWeather._currentItem.today_humidity + "%");
            a.find(".td-w-today-wind-speed").html(tdWeather._currentItem.today_wind_speed[b] + c);
            a.find(".td-w-today-clouds").html(tdWeather._currentItem.today_clouds + "%");
            for (c = 0; c < tdWeather._currentItem.forecast.length; c++) a.find(".td-day-" + c).html(tdWeather._currentItem.forecast[c].day_name), a.find(".td-degrees-" + c).html(tdWeather._currentItem.forecast[c].day_temp[b]);
            tdWeather._currentRequestInProgress = !1;
        },
        _getItemByBlockID: function (a) {
            for (var b = 0; b < tdWeather.items.length; b++) if (tdWeather.items[b].block_uid === a) return tdWeather.items[b];
            return !1;
        },
        _displayLocationApiError: function (a) {
            if (1 === a.code) {
                if (tdDetect.isAndroid) tdWeather._show_manual_location_form();
                else if (tdDetect.isIos) {
                    alert("Please enable Location services for Safari Websites and reload the page. \n ---------------------- \nSettings > Privacy > Location Services");
                    return;
                }
                tdWeather._show_manual_location_form();
            }
            tdWeather._show_manual_location_form();
        },
        _celsiusToFahrenheit: function (a) {
            a = (9 * a) / 5 + 32;
            var b = tdUtil.round(a, 1);
            return 99.9 < b ? tdUtil.round(a) : b;
        },
        _kmphToMph: function (a) {
            return tdUtil.round(0.621371192 * a, 1);
        },
        _show_manual_location_form: function () {
            tdWeather._currentItem = tdWeather._getItemByBlockID(tdWeather._currentItem.block_uid);
            jQuery("#" + tdWeather._currentItem.block_uid)
                .find(".td-weather-set-location")
                .addClass("td-show-location");
            jQuery(".td-manual-location-form input").focus();
            tdWeather._is_location_open = !0;
        },
        _hide_manual_location_form: function () {
            jQuery("#" + tdWeather._currentItem.block_uid)
                .find(".td-weather-set-location")
                .removeClass("td-show-location");
            tdWeather._is_location_open = !1;
        },
        _updateLocationCallback2: function (a) {
            tdWeather._currentLocationCacheKey = a;
            tdLocalCache.exist(tdWeather._currentLocationCacheKey + "_today")
                ? tdWeather._owmGetTodayDataCallback2(tdLocalCache.get(tdWeather._currentLocationCacheKey + "_today"))
                : ((a = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(a) + "&lang=" + tdWeather._currentItem.api_language + "&units=metric&appid=" + tdWeather._currentItem.api_key),
                  jQuery.ajax({ dataType: "jsonp", url: a, success: tdWeather._owmGetTodayDataCallback2, cache: !0 }));
        },
        _owmGetTodayDataCallback2: function (a) {
            tdLocalCache.set(tdWeather._currentLocationCacheKey + "_today", a);
            tdWeather._currentItem.api_location = a.name;
            tdWeather._currentItem.today_clouds = tdUtil.round(a.clouds.all);
            tdWeather._currentItem.today_humidity = tdUtil.round(a.main.humidity);
            tdWeather._currentItem.today_icon = tdWeather._icons[a.weather[0].icon];
            tdWeather._currentItem.today_icon_text = a.weather[0].description;
            tdWeather._currentItem.today_max[0] = tdUtil.round(a.main.temp_max, 1);
            tdWeather._currentItem.today_max[1] = tdWeather._celsiusToFahrenheit(a.main.temp_max);
            tdWeather._currentItem.today_min[0] = tdUtil.round(a.main.temp_min, 1);
            tdWeather._currentItem.today_min[1] = tdWeather._celsiusToFahrenheit(a.main.temp_min);
            tdWeather._currentItem.today_temp[0] = tdUtil.round(a.main.temp, 1);
            tdWeather._currentItem.today_temp[1] = tdWeather._celsiusToFahrenheit(a.main.temp);
            tdWeather._currentItem.today_wind_speed[0] = tdUtil.round(a.wind.speed, 1);
            tdWeather._currentItem.today_wind_speed[1] = tdWeather._kmphToMph(a.wind.speed);
            tdLocalCache.exist(tdWeather._currentLocationCacheKey)
                ? tdWeather._owmGetFiveDaysData2(tdLocalCache.get(tdWeather._currentLocationCacheKey))
                : jQuery.ajax({
                      dataType: "jsonp",
                      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + tdWeather._currentItem.api_location + "&lang=" + tdWeather._currentItem.api_language + "&units=metric&cnt=35&appid=" + tdWeather._currentItem.api_key,
                      success: tdWeather._owmGetFiveDaysData2,
                      cache: !0,
                  });
        },
        _owmGetFiveDaysData2: function (a) {
            tdLocalCache.set(tdWeather._currentLocationCacheKey, a);
            for (var b = {}, c = !0, d = Object.prototype.hasOwnProperty, f = 0; f < a.list.length; f++)
                if (d.call(a.list[f], "dt")) {
                    c = a.list[f].dt;
                    var e = td_date_i18n("Ymd", c);
                    !1 === d.call(b, e)
                        ? (b[e] = { timestamp: c, day_name: td_date_i18n("D", c), day_temp: [tdUtil.round(a.list[f].main.temp_max), tdUtil.round(tdWeather._celsiusToFahrenheit(a.list[f].main.temp_max))], owm_day_index: f })
                        : b[e].day_temp[0] < tdUtil.round(a.list[f].main.temp_max) && ((b[e].day_temp[0] = tdUtil.round(a.list[f].main.temp_max)), (b[e].day_temp[1] = tdUtil.round(tdWeather._celsiusToFahrenheit(a.list[f].main.temp_max))));
                    c = !1;
                }
            if (!1 === c) {
                tdWeather._currentItem.forecast = [];
                for (var l in b) {
                    if (5 === tdWeather._currentItem.forecast.length) break;
                    tdWeather._currentItem.forecast[tdWeather._currentItem.forecast.length] = b[l];
                }
            }
            tdWeather._renderCurrentItem();
        },
    };
})();
tdWeather.init();
jQuery(window).load(function () {
    jQuery("body").addClass("td-js-loaded");
    window.tdAnimationStack.init();
});
jQuery(window).ready(function () {
    jQuery(".td_smart_list_1 a, .td_smart_list_3 a").on("click", function (a) {
        if (a.target === a.currentTarget) {
            var b = jQuery(this).attr("target"),
                c = jQuery(this)[0].hasAttribute("download"),
                d = jQuery(this).attr("href");
            c || ("_blank" == b ? (a.preventDefault(), window.open(d)) : window.location.href !== d && tdUtil.isValidUrl(d) && (window.location.href = d));
        }
    });
    jQuery(".td_block_trending_now").each(function () {
        var a = new tdTrendingNow.item(),
            b = jQuery(this).find(".td-trending-now-wrapper").data("start"),
            c = 0;
        a.blockUid = jQuery(this).data("td-block-uid");
        "manual" !== b && (a.trendingNowAutostart = b);
        jQuery("#" + a.blockUid + " .td-trending-now-post").each(function () {
            a.trendingNowPosts[c] = jQuery(this);
            c++;
        });
        "undefined" === typeof a.trendingNowPosts || 1 > a.trendingNowPosts.length || tdTrendingNow.addItem(a);
    });
    jQuery(".td-trending-now-nav-left").on("click", function (a) {
        a.preventDefault();
        a = jQuery(this).data("block-id");
        tdTrendingNow.itemPrev(a);
    });
    jQuery(".td-trending-now-nav-right").on("click", function (a) {
        a.preventDefault();
        a = jQuery(this).data("block-id");
        tdTrendingNow.itemNext(a);
    });
});
var tdAnimationSprite = {};
(function () {
    tdAnimationSprite = {
        items: [],
        isInRequestAnimation: !1,
        item: function () {
            this.blockUid = "";
            this.paused = this._isInitialized = !1;
            this.automatStart = !0;
            this.properties = [];
            this.readyToAnimate = !1;
            this.nextFrame = 1;
            this.animationSpriteClass = this.jqueryObj = this.interval = void 0;
            this._currentDirection = "right";
            this._executedLoops = 0;
            this.loops = this.reverse = this.velocity = this.frameWidth = this.frames = this._prop_background_position = void 0;
            this.animate = function () {
                this._prop_background_position = -1 * this.nextFrame * this.frameWidth + "px 0";
                this.readyToAnimate = !0;
                !0 === this.reverse
                    ? "right" === this._currentDirection
                        ? this.nextFrame === this.frames - 1
                            ? ((this._currentDirection = "left"), this.nextFrame--)
                            : this.nextFrame++
                        : "left" === this._currentDirection &&
                          (0 === this.nextFrame ? ((this._currentDirection = "right"), this.nextFrame++, this._executedLoops++, 0 !== this.loops && this._executedLoops === this.loops && clearInterval(this.interval)) : this.nextFrame--)
                    : this.nextFrame === this.frames - 1
                    ? (this._executedLoops++, 0 !== this.loops && this._executedLoops === this.loops && clearInterval(this.interval), (this.nextFrame = 0))
                    : this.nextFrame++;
                !1 === tdAnimationSprite.isInRequestAnimation && ((tdAnimationSprite.isInRequestAnimation = !0), window.requestAnimationFrame(tdAnimationSprite.animateAllItems));
            };
        },
        _initializeItem: function (a) {
            if (!0 !== a._isInitialized) {
                var b = /(td_animation_sprite\S*)/gi;
                "undefined" !== typeof a.jqueryObj.attr("class") &&
                    ((b = a.jqueryObj.attr("class").match(b)),
                    null !== b &&
                        ((a.offsetTop = a.jqueryObj.offset().top),
                        (a.offsetBottomToTop = a.offsetTop + a.jqueryObj.height()),
                        (a.animationSpriteClass = b[b.length - 1]),
                        (b = a.animationSpriteClass.split("-")),
                        7 === b.length &&
                            ((a.frames = parseInt(b[1])),
                            (a.frameWidth = parseInt(b[2])),
                            (a.velocity = parseInt(b[3])),
                            (a.loops = parseInt(b[4])),
                            1 === parseInt(b[5]) ? (a.reverse = !0) : (a.reverse = !1),
                            1 === parseInt(b[6]) ? (a.automatStart = !0) : (a.automatStart = !1),
                            (a._isInitialized = !0))));
            }
        },
        addItem: function (a) {
            a.constructor === tdAnimationSprite.item && (tdAnimationSprite.items.push(a), tdAnimationSprite._initializeItem(a), !0 === a.automatStart && tdAnimationSprite.computeItem(a));
        },
        deleteItem: function (a) {
            for (var b = 0; b < tdAnimationSprite.items.length; b++) if (tdAnimationSprite.items[b].blockUid === a) return tdAnimationSprite.items.splice(b, 1), !0;
            return !1;
        },
        computeItem: function (a) {
            1 < a.frames &&
                void 0 === a.interval &&
                (a.interval = setInterval(function () {
                    !1 === a.paused && a.animate();
                }, a.velocity));
        },
        recomputeItem: function (a) {
            clearInterval(a.interval);
            a.interval = void 0;
            a._isInitialized = !1;
            tdAnimationSprite._initializeItem(a);
            tdAnimationSprite.computeItem(a);
        },
        stopItem: function (a) {
            a.constructor === tdAnimationSprite.item && !0 === a._isInitialized && (clearInterval(a.interval), (a.interval = void 0));
        },
        startItem: function (a) {
            a.constructor === tdAnimationSprite.item && !0 === a._isInitialized && (a.paused = !1);
        },
        pauseItem: function (a) {
            a.constructor === tdAnimationSprite.item && !0 === a._isInitialized && (a.paused = !0);
        },
        computeAllItems: function () {
            for (var a = 0; a < tdAnimationSprite.items.length; a++) tdAnimationSprite.computeItem(tdAnimationSprite.items[a]);
        },
        recomputeAllItems: function () {
            for (var a = 0; a < tdAnimationSprite.items.length; a++) tdAnimationSprite.recomputeItem(tdAnimationSprite.items[a]);
        },
        stopAllItems: function () {
            for (var a = 0; a < tdAnimationSprite.items.length; a++) tdAnimationSprite.stopItem(tdAnimationSprite.items[a]);
        },
        pauseAllItems: function () {
            for (var a = 0; a < tdAnimationSprite.items.length; a++) tdAnimationSprite.pauseItem(tdAnimationSprite.items[a]);
        },
        startAllItems: function () {
            for (var a = 0; a < tdAnimationSprite.items.length; a++) tdAnimationSprite.startItem(tdAnimationSprite.items[a]);
        },
        animateAllItems: function () {
            for (var a, b = 0; b < tdAnimationSprite.items.length; b++) (a = tdAnimationSprite.items[b]), !0 === a.readyToAnimate && (a.jqueryObj.css("background-position", a._prop_background_position), (a.readyToAnimate = !1));
            tdAnimationSprite.isInRequestAnimation = !1;
        },
    };
    for (var a = jQuery('span[class^="td_animation_sprite"]'), b = 0; b < a.length; b++) {
        var c = new tdAnimationSprite.item();
        c.jqueryObj = jQuery(a[b]);
        c.blockUid = c.jqueryObj.data("td-block-uid");
        tdAnimationSprite.addItem(c);
    }
})();
function td_date_i18n(a, b) {
    var c,
        d = /\\?(.?)/gi,
        f = function (a, b) {
            return l[a] ? l[a]() : b;
        },
        e = function (a, b) {
            for (a = String(a); a.length < b; ) a = "0" + a;
            return a;
        };
    var l = {
        d: function () {
            return e(l.j(), 2);
        },
        D: function () {
            return tdDateNamesI18n.day_names_short[l.w()];
        },
        j: function () {
            return c.getDate();
        },
        l: function () {
            return tdDateNamesI18n.day_names[l.w()];
        },
        N: function () {
            return l.w() || 7;
        },
        S: function () {
            var a = l.j(),
                b = a % 10;
            3 >= b && 1 == parseInt((a % 100) / 10, 10) && (b = 0);
            return ["st", "nd", "rd"][b - 1] || "th";
        },
        w: function () {
            return c.getDay();
        },
        z: function () {
            var a = new Date(l.Y(), l.n() - 1, l.j()),
                b = new Date(l.Y(), 0, 1);
            return Math.round((a - b) / 864e5);
        },
        W: function () {
            var a = new Date(l.Y(), l.n() - 1, l.j() - l.N() + 3),
                b = new Date(a.getFullYear(), 0, 4);
            return e(1 + Math.round((a - b) / 864e5 / 7), 2);
        },
        F: function () {
            return tdDateNamesI18n.month_names[l.n() - 1];
        },
        m: function () {
            return e(l.n(), 2);
        },
        M: function () {
            return tdDateNamesI18n.month_names_short[l.n() - 1];
        },
        n: function () {
            return c.getMonth() + 1;
        },
        t: function () {
            return new Date(l.Y(), l.n(), 0).getDate();
        },
        L: function () {
            var a = l.Y();
            return ((0 === a % 4) & (0 !== a % 100)) | (0 === a % 400);
        },
        o: function () {
            var a = l.n(),
                b = l.W();
            return l.Y() + (12 === a && 9 > b ? 1 : 1 === a && 9 < b ? -1 : 0);
        },
        Y: function () {
            return c.getFullYear();
        },
        y: function () {
            return l.Y().toString().slice(-2);
        },
        a: function () {
            return 11 < c.getHours() ? "pm" : "am";
        },
        A: function () {
            return l.a().toUpperCase();
        },
        B: function () {
            var a = 3600 * c.getUTCHours(),
                b = 60 * c.getUTCMinutes(),
                d = c.getUTCSeconds();
            return e(Math.floor((a + b + d + 3600) / 86.4) % 1e3, 3);
        },
        g: function () {
            return l.G() % 12 || 12;
        },
        G: function () {
            return c.getHours();
        },
        h: function () {
            return e(l.g(), 2);
        },
        H: function () {
            return e(l.G(), 2);
        },
        i: function () {
            return e(c.getMinutes(), 2);
        },
        s: function () {
            return e(c.getSeconds(), 2);
        },
        u: function () {
            return e(1e3 * c.getMilliseconds(), 6);
        },
        e: function () {
            console.log("Not supported (see source code of date() for timezone on how to add support)");
        },
        I: function () {
            var a = new Date(l.Y(), 0),
                b = Date.UTC(l.Y(), 0),
                c = new Date(l.Y(), 6),
                d = Date.UTC(l.Y(), 6);
            return a - b !== c - d ? 1 : 0;
        },
        O: function () {
            var a = c.getTimezoneOffset(),
                b = Math.abs(a);
            return (0 < a ? "-" : "+") + e(100 * Math.floor(b / 60) + (b % 60), 4);
        },
        P: function () {
            var a = l.O();
            return a.substr(0, 3) + ":" + a.substr(3, 2);
        },
        T: function () {
            return "UTC";
        },
        Z: function () {
            return 60 * -c.getTimezoneOffset();
        },
        c: function () {
            return "Y-m-d\\TH:i:sP".replace(d, f);
        },
        r: function () {
            return "D, d M Y H:i:s O".replace(d, f);
        },
        U: function () {
            return (c / 1e3) | 0;
        },
    };
    this.date = function (a, b) {
        c = void 0 === b ? new Date() : b instanceof Date ? new Date(b) : new Date(1e3 * b);
        return a.replace(d, f);
    };
    return this.date(a, b);
}
var tdSocialSharing = {};
(function () {
    tdSocialSharing = {
        init: function () {
            jQuery(".td-social-sharing-button").on("click", function (a) {
                var b = jQuery(this);
                if (!b.hasClass("td-social-mail") && !b.hasClass("td-social-share-text"))
                    if ((a.preventDefault(), b.hasClass("td-social-expand-tabs"))) {
                        a = b.data("block-uid");
                        var c = jQuery("#" + a),
                            d = b.find(".td-social-expand-tabs-icon");
                        if (c.hasClass("td-social-show-all")) {
                            b.detach().appendTo(c.find(".td-social-sharing-hidden:first"));
                            b = c.find(".td-post-sharing-visible:first");
                            var f = new tdPullDown.item();
                            f.blockUid = c.attr("id");
                            f.horizontal_jquery_obj = b;
                            f.vertical_jquery_obj = c.find(".td-social-sharing-hidden:first");
                            f.horizontal_element_css_class = "td-social-sharing-button-js";
                            f.container_jquery_obj = b.parents(".td-post-sharing:first");
                            tdPullDown.add_item(f);
                            jQuery("#" + a).removeClass("td-social-show-all");
                            d.removeClass("td-icon-minus");
                            d.addClass("td-icon-plus");
                        } else tdPullDown.unloadItem(a), jQuery("#" + a).addClass("td-social-show-all"), d.removeClass("td-icon-plus"), d.addClass("td-icon-minus"), b.detach().appendTo(c.find(".td-post-sharing-visible:first"));
                    } else
                        b.hasClass("td-social-print")
                            ? window.print()
                            : (a.preventDefault(), (a = jQuery(window).width() / 2 - 450), (c = jQuery(window).height() / 2 - 300), window.open(b.attr("href"), "mywin", "left=" + a + ",top=" + c + ",width=900,height=600,toolbar=0"));
            });
            setTimeout(function () {
                jQuery(".td-post-sharing").each(function (a, b) {
                    a = jQuery(this);
                    b = jQuery(b);
                    var c = b.find(".td-post-sharing-visible:first"),
                        d = new tdPullDown.item();
                    d.blockUid = b.attr("id");
                    d.horizontal_jquery_obj = c;
                    d.vertical_jquery_obj = b.find(".td-social-sharing-hidden:first");
                    d.horizontal_element_css_class = "td-social-sharing-button-js";
                    a.hasClass("tdb-block") ? (d.container_jquery_obj = c.parents(".wpb_wrapper:first")) : (d.container_jquery_obj = c.parents(".td-post-sharing:first"));
                    tdPullDown.add_item(d);
                });
            }, 50);
        },
    };
    tdSocialSharing.init();
})();
("use strict");
jQuery().ready(function () {
    tdModalImage();
});
function tdModalImage() {
    jQuery("figure.wp-caption").each(function () {
        var a = jQuery(this).children("figcaption").html();
        jQuery(this).children("a").data("caption", a);
    });
    jQuery("figure.wp-block-image").each(function () {
        var a = jQuery(this),
            b = a.children("figcaption").html();
        a = a.attr("class");
        var c = "";
        -1 < a.indexOf("td-caption-align-") &&
            jQuery(a.split(" ")).each(function () {
                -1 < this.indexOf("td-caption-align-") && (c = String(this));
            });
        jQuery(this).parents("a.td-modal-image").data({ caption: b, caption_align: c });
    });
    jQuery(".td-modal-image").each(function () {
        var a = jQuery(this),
            b = a.parent();
        a.find(".wp-block-image").length || (b.addClass("td-modal-image"), a.removeClass("td-modal-image"));
    });
    jQuery("article").magnificPopup({
        type: "image",
        delegate: ".td-modal-image",
        gallery: {
            enabled: !0,
            tPrev: tdUtil.getBackendVar("td_magnific_popup_translation_tPrev"),
            tNext: tdUtil.getBackendVar("td_magnific_popup_translation_tNext"),
            tCounter: tdUtil.getBackendVar("td_magnific_popup_translation_tCounter"),
        },
        ajax: { tError: tdUtil.getBackendVar("td_magnific_popup_translation_ajax_tError") },
        image: {
            tError: tdUtil.getBackendVar("td_magnific_popup_translation_image_tError"),
            titleSrc: function (a) {
                a = jQuery(a.el).data("caption");
                return "undefined" !== typeof a ? a : "";
            },
        },
        zoom: {
            enabled: !0,
            duration: 300,
            opener: function (a) {
                return a.find("img");
            },
        },
        callbacks: {
            beforeOpen: function () {
                var a = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
                a = a.defaultView || a.parentWindow;
                a !== a.parent && jQuery(".td-header-mobile-wrap, .td-header-mobile-sticky-wrap, .td-header-desktop-wrap, .td-header-desktop-sticky-wrap, .tdc-header-wrap", a.top.document).css({ visibility: "hidden" });
            },
            open: function () {
                var a = jQuery.magnificPopup.instance.wrap.closest("html"),
                    b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
                b = b.defaultView || b.parentWindow;
                if (b !== b.parent) {
                    b = b.top;
                    var c = jQuery(b);
                    a = jQuery("#" + a.attr("id"), b.document.body);
                    if (a.length) {
                        var d = !1;
                        jQuery("html", b.document).scrollTop() < a.offset().top && ((d = !0), jQuery("html", b.document).scrollTop(a.offset().top));
                        a = { height: c.height() + (tdDetect.isMobileDevice ? 100 : 0), top: d ? 0 : c.scrollTop() - a.offset().top, overflow: "hidden" };
                        jQuery.magnificPopup.instance.wrap.css(a);
                        jQuery.magnificPopup.instance.bgOverlay.css(a);
                        jQuery("html", b.document).css({ overflow: "hidden" });
                    }
                }
                b = jQuery(this.currItem.el).data("caption_align");
                if ("undefined" !== typeof b) return jQuery(".mfp-figure").addClass(b), b;
            },
            imageLoadComplete: function () {
                var a = jQuery.magnificPopup.instance.wrap.closest("html"),
                    b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
                b = b.defaultView || b.parentWindow;
                if (b !== b.parent) {
                    b = b.top;
                    var c = jQuery(b);
                    jQuery("#" + a.attr("id"), b.document.body).length && jQuery(".mfp-img", a).css({ "max-height": c.height(), visibility: "" });
                }
            },
            change: function (a) {
                window.tdModalImageLastEl = a.el;
                tdUtil.scrollIntoView(a.el);
            },
            beforeClose: function () {
                tdAffix.allow_scroll = !1;
                tdUtil.scrollIntoView(window.tdModalImageLastEl);
                var a = setInterval(function () {
                    tdIsScrollingAnimation ||
                        (clearInterval(a),
                        setTimeout(function () {
                            tdAffix.allow_scroll = !0;
                        }, 100));
                }, 100);
            },
            close: function () {
                var a = jQuery.magnificPopup.instance.wrap.closest("html"),
                    b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
                b = b.defaultView || b.parentWindow;
                b !== b.parent && ((b = b.top), jQuery("#" + a.attr("id"), b.document.body).length && jQuery("html", b.document).css({ overflow: "" }));
            },
            afterClose: function () {
                var a = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
                a = a.defaultView || a.parentWindow;
                a !== a.parent && jQuery(".td-header-mobile-wrap, .td-header-mobile-sticky-wrap, .td-header-desktop-wrap, .td-header-desktop-sticky-wrap, .tdc-header-wrap", a.top.document).css({ visibility: "" });
            },
        },
    });
    jQuery(".td-main-content-wrap").magnificPopup({
        type: "image",
        delegate: ".td-modal-image",
        gallery: {
            enabled: !0,
            tPrev: tdUtil.getBackendVar("td_magnific_popup_translation_tPrev"),
            tNext: tdUtil.getBackendVar("td_magnific_popup_translation_tNext"),
            tCounter: tdUtil.getBackendVar("td_magnific_popup_translation_tCounter"),
        },
        ajax: { tError: tdUtil.getBackendVar("td_magnific_popup_translation_ajax_tError") },
        image: {
            tError: tdUtil.getBackendVar("td_magnific_popup_translation_image_tError"),
            titleSrc: function (a) {
                a = jQuery(a.el).data("caption");
                return "undefined" !== typeof a ? a : "";
            },
        },
        zoom: {
            enabled: !0,
            duration: 300,
            opener: function (a) {
                return a.find("img");
            },
        },
        callbacks: {
            change: function (a) {
                window.tdModalImageLastEl = a.el;
                tdUtil.scrollIntoView(a.el);
            },
            beforeClose: function () {
                tdAffix.allow_scroll = !1;
                tdUtil.scrollIntoView(window.tdModalImageLastEl);
                var a = setInterval(function () {
                    tdIsScrollingAnimation ||
                        (clearInterval(a),
                        setTimeout(function () {
                            tdAffix.allow_scroll = !0;
                        }, 100));
                }, 100);
            },
        },
    });
    "undefined" === typeof jetpackCarouselStrings &&
        (jQuery("figure.gallery-item").each(function () {
            var a = jQuery(this).children("figcaption").html();
            jQuery(this).find("a").data("caption", a);
        }),
        jQuery(".blocks-gallery-item figure").each(function () {
            var a = jQuery(this).children("figcaption").html();
            jQuery(this).find("a").data("caption", a);
        }),
        jQuery(".tiled-gallery").magnificPopup({
            type: "image",
            delegate: "a",
            gallery: {
                enabled: !0,
                tPrev: tdUtil.getBackendVar("td_magnific_popup_translation_tPrev"),
                tNext: tdUtil.getBackendVar("td_magnific_popup_translation_tNext"),
                tCounter: tdUtil.getBackendVar("td_magnific_popup_translation_tCounter"),
            },
            ajax: { tError: tdUtil.getBackendVar("td_magnific_popup_translation_ajax_tError") },
            image: {
                tError: tdUtil.getBackendVar("td_magnific_popup_translation_image_tError"),
                titleSrc: function (a) {
                    a = jQuery(a.el).parent().find(".tiled-gallery-caption").text();
                    return "undefined" !== typeof a ? a : "";
                },
            },
            zoom: {
                enabled: !0,
                duration: 300,
                opener: function (a) {
                    return a.find("img");
                },
            },
            callbacks: {
                change: function (a) {
                    window.tdModalImageLastEl = a.el;
                    tdUtil.scrollIntoView(a.el);
                },
                beforeClose: function () {
                    tdUtil.scrollIntoView(window.tdModalImageLastEl);
                },
            },
        }),
        jQuery(".gallery").magnificPopup({
            type: "image",
            delegate: ".gallery-icon > a",
            gallery: {
                enabled: !0,
                tPrev: tdUtil.getBackendVar("td_magnific_popup_translation_tPrev"),
                tNext: tdUtil.getBackendVar("td_magnific_popup_translation_tNext"),
                tCounter: tdUtil.getBackendVar("td_magnific_popup_translation_tCounter"),
            },
            ajax: { tError: tdUtil.getBackendVar("td_magnific_popup_translation_ajax_tError") },
            image: {
                tError: tdUtil.getBackendVar("td_magnific_popup_translation_image_tError"),
                titleSrc: function (a) {
                    a = jQuery(a.el).data("caption");
                    return "undefined" !== typeof a ? a : "";
                },
            },
            zoom: {
                enabled: !0,
                duration: 300,
                opener: function (a) {
                    return a.find("img");
                },
            },
            callbacks: {
                beforeOpen: function () {
                    var a = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
                    a = a.defaultView || a.parentWindow;
                    a !== a.parent && jQuery(".td-header-mobile-wrap, .td-header-mobile-sticky-wrap, .td-header-desktop-wrap, .td-header-desktop-sticky-wrap, .tdc-header-wrap", a.top.document).css({ visibility: "hidden" });
                },
                open: function () {
                    var a = jQuery.magnificPopup.instance.wrap.closest("html"),
                        b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
                    b = b.defaultView || b.parentWindow;
                    if (b !== b.parent) {
                        b = b.top;
                        var c = jQuery(b);
                        a = jQuery("#" + a.attr("id"), b.document.body);
                        if (a.length) {
                            var d = !1;
                            jQuery("html", b.document).scrollTop() < a.offset().top && ((d = !0), jQuery("html", b.document).scrollTop(a.offset().top));
                            a = { height: c.height() + (tdDetect.isMobileDevice ? 100 : 0), top: d ? 0 : c.scrollTop() - a.offset().top, overflow: "hidden" };
                            jQuery.magnificPopup.instance.wrap.css(a);
                            jQuery.magnificPopup.instance.bgOverlay.css(a);
                            jQuery("html", b.document).css({ overflow: "hidden" });
                        }
                    }
                },
                imageLoadComplete: function () {
                    var a = jQuery.magnificPopup.instance.wrap.closest("html"),
                        b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
                    b = b.defaultView || b.parentWindow;
                    if (b !== b.parent) {
                        b = b.top;
                        var c = jQuery(b);
                        jQuery("#" + a.attr("id"), b.document.body).length && jQuery(".mfp-img", a).css({ "max-height": c.height(), visibility: "" });
                    }
                },
                change: function (a) {
                    window.tdModalImageLastEl = a.el;
                    tdUtil.scrollIntoView(a.el);
                },
                beforeClose: function () {
                    tdUtil.scrollIntoView(window.tdModalImageLastEl);
                },
                close: function () {
                    var a = jQuery.magnificPopup.instance.wrap.closest("html"),
                        b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
                    b = b.defaultView || b.parentWindow;
                    b !== b.parent && ((b = b.top), jQuery("#" + a.attr("id"), b.document.body).length && jQuery("html", b.document).css({ overflow: "" }));
                },
                afterClose: function () {
                    var a = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
                    a = a.defaultView || a.parentWindow;
                    a !== a.parent && jQuery(".td-header-mobile-wrap, .td-header-mobile-sticky-wrap, .td-header-desktop-wrap, .td-header-desktop-sticky-wrap, .tdc-header-wrap", a.top.document).css({ visibility: "" });
                },
            },
        }));
}
var tdAjaxVideoModal = {};
jQuery().ready(function () {
    tdAjaxVideoModal.init();
});
(function () {
    tdAjaxVideoModal = {
        _is_modal_open: !1,
        init: function () {
            jQuery(document).on("click", function (a) {
                ("td-vm-overlay" !== a.target.className && "td-vm-close" !== a.target.className) || !0 !== tdAjaxVideoModal._is_modal_open || (a.preventDefault(), tdAjaxVideoModal.destroy_modal());
            });
            jQuery("body").on("click", ".td-module-video-modal", function (a) {
                a.preventDefault();
                a.stopPropagation();
                a = jQuery(this);
                var b = {
                    block_class: a.parents(".td_block_wrap").attr("data-td-block-uid") + "_m",
                    post_url: a.attr("href"),
                    post_title: a.attr("title"),
                    video_source: a.attr("data-video-source"),
                    video_url: a.attr("data-video-url"),
                    video_ad: "",
                };
                void 0 !== a.attr("data-video-rec") && (b.video_ad = JSON.parse(atob(a.attr("data-video-rec"))));
                tdAjaxVideoModal.build_modal(b);
            });
        },
        build_modal: function (a) {
            jQuery("body").prepend(
                '<div id="td-video-modal" class="td-vm-wrap td-vm-' +
                    a.video_source +
                    " " +
                    a.block_class +
                    '"><div class="td-vm-overlay"></div><div class="td-vm-content-wrap"><div class="td-vm-content"><div class="td-vm-content-loading"></div></div></div><a href="#" class="td-vm-close"><i class="td-icon-modal-close"></i></a></div>'
            );
            var b = jQuery("#td-video-modal");
            "" !== a.post_title && b.find(".td-vm-content-wrap").prepend('<h3 class="td-vm-title"><a href="' + a.post_url + '" title="' + a.post_title + '">' + a.post_title + "</a></h3>");
            "" !== a.video_ad &&
                (b.find(".td-vm-content-wrap").append('<div class="td-vm-rec-wrap"><div class="td-vm-rec-code">' + a.video_ad.code + "</div></div>"),
                "" !== a.video_ad.title && b.find(".td-vm-rec-wrap").prepend('<div class="td-vm-rec-title">' + a.video_ad.title + "</div>"));
            setTimeout(function () {
                b.addClass("td-vm-open");
                b.find(".td-vm-content-wrap").addClass("td-vm-content-wrap-visible");
                jQuery.ajax({
                    type: "POST",
                    url: td_ajax_url,
                    data: { action: "td_ajax_video_modal", td_video_url: a.video_url },
                    success: function (a) {
                        a = jQuery.parseJSON(a);
                        b.find(".td-vm-content").append(a.video_embed);
                        setTimeout(function () {
                            b.find(".td-vm-content-loading").remove();
                            b.find(".wpb_video_wrapper").addClass("td-vm-iframe-visible");
                        }, 200);
                    },
                });
            }, 50);
            tdAjaxVideoModal._is_modal_open = !0;
        },
        destroy_modal: function () {
            var a = jQuery("#td-video-modal");
            a.removeClass("td-vm-open");
            setTimeout(function () {
                a.remove();
            }, 500);
            tdAjaxVideoModal._is_modal_open = !1;
        },
    };
})();
var tdConfirm;
(function (a, b) {
    tdConfirm = {
        _isInitialized: !1,
        mediaUploadLoaded: !1,
        _$content: b,
        _$confirmYes: b,
        _$confirmNo: b,
        _$infoContent: b,
        _$body: b,
        init: function () {
            tdConfirm._$body = a("body");
            tdConfirm._$content = a(
                '<div id="td-confirm" style="display: none;"><div class="td-confirm-info"></div><div class="td-confirm-buttons"><button type="button" class="td-confirm-yes">Yes</button><button type="button" class="td-confirm-no">No</button></div></div>'
            );
            tdConfirm._$infoContent = tdConfirm._$content.find(".td-confirm-info");
            tdConfirm._$confirmYes = tdConfirm._$content.find("button.td-confirm-yes");
            tdConfirm._$confirmNo = tdConfirm._$content.find("button.td-confirm-no");
            tdConfirm._$body.append(tdConfirm._$content);
        },
        modal: function (b) {
            tdConfirm.init();
            "undefined" === typeof b.url && (b.url = "#TB_inline?inlineId=td-confirm&width=480");
            if ("undefined" === typeof b.objectContext || null === b.objectContext) b.objectContext = window;
            "undefined" === typeof b.htmlInfoContent && (b.htmlInfoContent = "");
            "undefined" === typeof b.textYes ? tdConfirm._$confirmYes.html("Ok") : tdConfirm._$confirmYes.html(b.textYes);
            "undefined" !== typeof b.switchButtons && !0 === b.switchButtons && tdConfirm._$confirmNo.insertBefore(tdConfirm._$confirmYes);
            tdConfirm._$infoContent.html(b.htmlInfoContent);
            "undefined" !== typeof b.hideNoButton && !0 === b.hideNoButton
                ? tdConfirm._$confirmNo.hide()
                : (tdConfirm._$confirmNo.show(),
                  tdConfirm._$confirmNo.unbind(),
                  tdConfirm._$confirmNo.on("click", function () {
                      "undefined" !== typeof b.callbackNo && b.callbackNo.apply(b.objectContext, b.argsNo);
                      tb_remove();
                      return !1;
                  }),
                  "undefined" === typeof b.textNo ? tdConfirm._$confirmNo.html("No") : tdConfirm._$confirmNo.html(b.textNo));
            if ("undefined" === typeof b.callbackYes)
                tdConfirm._$confirmYes.on("click", function () {
                    tb_remove();
                    return !0;
                });
            else
                tdConfirm._$confirmYes.off("click"),
                    tdConfirm._$confirmYes.on("click", function () {
                        b.callbackYes.apply(b.objectContext, b.argsYes);
                        return !0;
                    });
            tdConfirm._$body.addClass("td-thickbox-loading");
            tb_show(b.caption, b.url);
            "undefined" !== typeof b.offOverlayClick && !0 === b.offOverlayClick && a("#TB_overlay").off("click");
            var c = a("#TB_window");
            "undefined" !== typeof b.hideCloseButton && !0 === b.hideCloseButton && c.find("#TB_closeWindowButton").hide();
            c.addClass("td-thickbox");
            400 < tdConfirm._$infoContent.height() && c.addClass("td-thickbox-fixed");
            tdConfirm._$body.removeClass("td-thickbox-loading");
            tdConfirm._$content.remove();
        },
        showModalOk: function (b, d, f, e, l) {
            tdConfirm.init();
            "undefined" === typeof l && (l = "#TB_inline?inlineId=td-confirm&width=480");
            if ("undefined" === typeof e || null === e) e = window;
            "undefined" === typeof d && (d = "");
            tdConfirm._$infoContent.html(d);
            tdConfirm._$confirmNo.hide();
            tdConfirm._$confirmYes.html("Ok");
            if ("undefined" === typeof f)
                tdConfirm._$confirmYes.on("click", function () {
                    tb_remove();
                    return !0;
                });
            else
                tdConfirm._$confirmYes.on("click", function () {
                    tdConfirm._$confirmYes.off("click");
                    f.apply(e);
                    return !0;
                });
            tdConfirm._$body.addClass("td-thickbox-loading");
            tb_show(b, l);
            a("#TB_overlay").off("click");
            b = a("#TB_window");
            b.find("#TB_closeWindowButton").remove();
            !0 === tdConfirm.mediaUploadLoaded &&
                (tdConfirm.fixPosition(),
                a(window).resize(function () {
                    tdConfirm.fixPosition();
                }));
            b.addClass("td-thickbox");
            400 < tdConfirm._$infoContent.height() && b.addClass("td-thickbox-fixed");
            tdConfirm._$body.removeClass("td-thickbox-loading");
            tdConfirm._$content.remove();
        },
        fixPosition: function () {
            var b = a("#TB_window"),
                d = "undefined" === typeof document.body.style.maxHeight;
            b.css({ marginLeft: "-" + parseInt(TB_WIDTH / 2, 10) + "px", width: TB_WIDTH + "px" });
            d || b.css({ marginTop: +parseInt(TB_HEIGHT / 2, 10) + "px" });
            b.css("z-index", "170001");
            a("#TB_overlay").css("z-index", "170000");
        },
        showModal: function (b, d, f, e, l, g) {
            tdConfirm.init();
            "undefined" === typeof g && (g = "#TB_inline?inlineId=td-confirm&width=480");
            "undefined" === typeof d && (d = window);
            "undefined" === typeof l && (l = "");
            tdConfirm._$infoContent.html(l);
            tdConfirm._$confirmYes.unbind();
            if ("undefined" === typeof f)
                tdConfirm._$confirmYes.on("click", function () {
                    tb_remove();
                    return !0;
                });
            else
                "undefined" === typeof e && (e = []),
                    tdConfirm._$confirmYes.on("click", function () {
                        f.apply(d, e);
                    });
            tdConfirm._$confirmNo.show();
            tdConfirm._$confirmNo.unbind();
            tdConfirm._$confirmNo.on("click", function () {
                tb_remove();
                return !1;
            });
            tdConfirm._$body.addClass("td-thickbox-loading");
            tb_show(b, g);
            b = a("#TB_window");
            b.addClass("td-thickbox");
            400 < tdConfirm._$infoContent.height() && b.addClass("td-thickbox-fixed");
            tdConfirm._$body.removeClass("td-thickbox-loading");
            tdConfirm._$content.remove();
        },
    };
})(jQuery);
