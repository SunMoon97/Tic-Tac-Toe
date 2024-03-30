(function(r, t) {
    "use strict";
    r.onerror = function(e, r) {
        return false
    };
    function y(e) {
        if (d || !l[e]) {
            return
        }
        if (f && f.resume) {
            f.resume()
        }
        var r = f.createBufferSource();
        r.buffer = l[e];
        r.connect(f.destination);
        if (r.start) {
            r.start(0)
        } else {
            r.noteOn(0)
        }
    }
    var n = {}, i = {
        player1: 0,
        player2: 0,
        ties: 0
    }, u = {
        player1: 0,
        player2: 0,
        ties: 0
    }, c = "x", v = "o", l = {}, f, m = 9, d, p, L = true, h = true, q = false, b = 300, S = .75, g, w = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    function k() {
        q = !q;
        var e = n.scores.scores.classList;
        if (q) {
            e.remove("p1");
            e.add("p2");
            h = true
        } else {
            e.remove("p2");
            e.add("p1");
            h = false
        }
        n.scores.player1.innerHTML = q ? u.player1 : i.player1;
        n.scores.player2.innerHTML = q ? u.player2 : i.player2;
        n.scores.ties.innerHTML = q ? u.ties : i.ties;
        p = false;
        O()
    }
    function A(e, r) {
        n.squares[r].querySelector("div").classList.add(e)
    }
    function x() {
        var e = n.scores.turn1.classList
          , r = n.scores.turn2.classList
          , t = n.scores.turnTies.classList;
        if (q && n.restart.style.display === "none") {
            if (L) {
                r.remove("turn");
                e.add("turn")
            } else {
                e.remove("turn");
                r.add("turn")
            }
            t.add("turn")
        } else {
            e.remove("turn");
            r.remove("turn");
            t.remove("turn")
        }
    }
    function D(e) {
        if (g[e] !== 0 || C() || !q && L) {
            return
        }
        if (q) {
            L = !L;
            g[e] = L ? -1 : 1;
            A(L ? c : v, e);
            y("note-" + (L ? "low" : "high"));
            C()
        } else {
            g[e] = -1;
            A(c, e);
            L = true;
            y("note-low");
            setTimeout(B, b)
        }
        x()
    }
    function H(s, o) {
        n.restart.style.display = "block";
        setTimeout(function() {
          
            setTimeout(function() {
                p = false
            }, b);
            if (o) {
                for (var t = 3; t--; ) {
                    n.squares[o[t]].classList.add("win")
                }
            }
            switch (s) {
            case c:
                n.scores.player1.innerHTML = q ? ++u.player1 : ++i.player1;
                n.scores.player1.classList.add("appear");
                n.board.classList.add("win");
                y("game-over");
                break;
            case v:
                n.scores.player2.innerHTML = q ? ++u.player2 : ++i.player2;
                n.scores.player2.classList.add("appear");
                n.board.classList.add("win");
                y("game-over");
                break;
            default:
                n.scores.ties.innerHTML = q ? ++u.ties : ++i.ties;
                n.scores.ties.classList.add("appear");
                n.board.classList.add("tie");
                y("game-over-tie");
                break
            }
        }, L && !q ? 100 : b + 100)
    }
    function C() {
        for (var e = w.length; e--; ) {
            var r = w[e]
              , t = g[r[0]] + g[r[1]] + g[r[2]];
            if (t === 3 || t === -3) {
                H(t === 3 ? v : c, r);
                return true
            }
        }
        var s = 0;
        for (e = m; e--; ) {
            if (g[e] !== 0) {
                s++
            }
        }
        if (s === 9) {
            H();
            return true
        }
        return false
    }
    function B() {
        if (C()) {
            return
        }
        var e, r, t, s, o, a, n = 0;
        L = false;
        x();
        y("note-high");
        for (e = m; e--; ) {
            if (g[e] !== 0) {
                n++;
                if (n === 1) {
                    a = e
                }
            }
        }
        if (n < 2 && Math.random() > .2) {
            do {
                o = Math.floor(Math.random() * m)
            } while (o === a)
        } else {
            for (e = m; e--; ) {
                for (r = m; r--; ) {
                    if (g[r] !== 0) {
                        continue
                    }
                    g[r] = 1;
                    if (C()) {
                        A(v, r);
                        return
                    }
                    g[r] = 0
                }
                if (g[e] !== 0) {
                    continue
                }
                g[e] = 1;
                var i = null
                  , u = g.concat();
                for (r = m; r--; ) {
                    if (u[r] !== 0) {
                        continue
                    }
                    u[r] = -1;
                    for (t = w.length; t--; ) {
                        if (u[w[t][0]] + u[w[t][1]] + u[w[t][2]] === -3 && Math.random() > S) {
                            g[e] = 0;
                            g[r] = 1;
                            A(v, r);
                            C();
                            return
                        }
                    }
                    var c = 0
                      , l = 0
                      , f = u.concat()
                      , d = u.concat();
                    for (t = m; t--; ) {
                        if (f[t] === 0) {
                            f[t] = 1
                        }
                        if (d[t] === 0) {
                            d[t] = -1
                        }
                    }
                    for (t = w.length; t--; ) {
                        if (f[w[t][0]] + f[w[t][1]] + f[w[t][2]] === 3) {
                            c++
                        }
                        if (d[w[t][0]] + d[w[t][1]] + d[w[t][2]] === -3) {
                            l++
                        }
                    }
                    var p = c - l;
                    i = i == null ? p : i > p ? p : i;
                    u[r] = 0
                }
                if (s == null || s < i) {
                    s = i;
                    o = e
                }
                g[e] = 0
            }
        }
        g[o] = 1;
        A(v, o);
        C()
    }
    function I(r) {
        n.squares[r].ontouchstart = n.squares[r].onmousedown = function(e) {
            e.preventDefault();
            D(r)
        }
    }
    function O() {
        if (p) {
            return
        }
        p = true;
        n.restart.style.display = "none";
        g = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var e = m; e--; ) {
            n.squares[e].classList.remove("win");
            n.squares[e].querySelector("div").className = ""
        }
        n.scores.ties.classList.remove("appear");
        n.scores.player1.classList.remove("appear");
        n.scores.player2.classList.remove("appear");
        n.board.classList.remove("win");
        n.board.classList.remove("tie");
        L = h = !h;
        x();
        if (h && !q) {
            setTimeout(B, b)
        }
    }
    t.addEventListener("DOMContentLoaded", function() {
        n = {
            board: t.querySelector(".board"),
            squares: t.querySelectorAll(".square"),
            restart: t.querySelector(".restart"),
            muteButton: t.querySelector(".mute"),
            mute: t.querySelectorAll(".mute path"),
            privacy: t.querySelector(".privacy"),
            scores: {
                scores: t.querySelector(".scores"),
                swap: t.querySelector(".swap"),
                player1: t.querySelector(".player1 .score"),
                player2: t.querySelector(".player2 .score"),
                ties: t.querySelector(".ties .score"),
                turn1: t.querySelector(".player1"),
                turn2: t.querySelector(".player2"),
                turnTies: t.querySelector(".ties")
            }
        };
        for (var e = m; e--; ) {
            I(e)
        }
        n.restart.ontouchstart = n.scores.scores.ontouchstart = function(e) {
            e.preventDefault()
        }
        ;
        n.scores.scores.ontouchend = n.scores.scores.onclick = function(e) {
            e.preventDefault();
            k()
        }
        ;
        n.restart.ontouchend = n.restart.onclick = function(e) {
            e.preventDefault();
            O()
        }
        ;
       
        O()
    })
}
)(window, document);