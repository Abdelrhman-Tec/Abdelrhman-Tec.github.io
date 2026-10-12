var d = document,
        h = d.documentElement,
        rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
      h.classList.add("js");
      var hd = d.querySelector("header"),
        bar = d.querySelector(".bar"),
        big = d.querySelector(".big"),
        me = d.querySelector(".me"),
        m = 0,
        tm = 0;
      function count(el) {
        var b = el.querySelector("b[data-n]");
        if (!b || rm) return;
        var n = +b.dataset.n,
          s = b.dataset.s || "",
          t0 = performance.now();
        (function f(t) {
          var p = Math.min((t - t0) / 1500, 1);
          b.textContent = Math.round(n * (1 - Math.pow(1 - p, 4))) + s;
          if (p < 1) requestAnimationFrame(f);
        })(t0);
      }
      var io = new IntersectionObserver(
        function (es) {
          es.forEach(function (x) {
            if (x.isIntersecting) {
              x.target.classList.add("in");
              io.unobserve(x.target);
              count(x.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
      );
      d.querySelectorAll(".rv").forEach(function (e) {
        var p = e.parentNode;
        if (/stats|sk|edu|focus|\bcl\b/.test(p.className))
          e.style.setProperty(
            "--d",
            ([].indexOf.call(p.children, e) % 4) * 90 + "ms",
          );
        rm ? e.classList.add("in") : io.observe(e);
      });
      var links = [].slice.call(d.querySelectorAll("nav a"));
      var so = new IntersectionObserver(
        function (es) {
          es.forEach(function (x) {
            if (x.isIntersecting)
              links.forEach(function (a) {
                a.classList.toggle(
                  "on",
                  a.getAttribute("href") === "#" + x.target.id,
                );
              });
          });
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );
      d.querySelectorAll("main > section,.hero").forEach(function (s) {
        so.observe(s);
      });
      var hero = d.querySelector(".hero");
      hero.addEventListener("mousemove", function (e) {
        tm = e.clientX / innerWidth - 0.5;
      });
      hero.addEventListener("mouseleave", function () {
        tm = 0;
      });
      function wd(e) {
        var c = e.children;
        return (
          c[c.length - 1].getBoundingClientRect().right -
          c[0].getBoundingClientRect().left
        );
      }
      function fit() {
        var mob = innerWidth <= 760,
          port = !mob && innerWidth / innerHeight <= 1,
          ws = [].slice.call(big.querySelectorAll(".w"));
        big.style.fontSize = "100px";
        var w = mob
          ? Math.max.apply(null, ws.map(wd))
          : ws.reduce(function (a, e) {
              return a + wd(e);
            }, 0) + 26;
        big.style.fontSize =
          Math.min(
            (100 * innerWidth * 0.9) / w,
            ((mob ? 26 : port ? 17 : 14) * innerWidth) / 100,
          ) + "px";
      }
      fit();
      addEventListener("resize", fit);
      if (d.fonts && d.fonts.ready) d.fonts.ready.then(fit);
      if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
        h.classList.add("cc");
        var cu = d.querySelector(".cur"),
          cd = cu.querySelector(".cd"),
          cr = cu.querySelector(".cr"),
          px = -100,
          py = -100,
          rx = -100,
          ry = -100;
        addEventListener("pointermove", function (e) {
          px = e.clientX;
          py = e.clientY;
          if (!cu.classList.contains("on")) {
            rx = px;
            ry = py;
            cu.classList.add("on");
          }
          var el = e.target.closest && e.target.closest("a,button,.shot");
          cu.classList.toggle("p", !!el && el.classList.contains("shot"));
          cu.classList.toggle("h", !!el && !el.classList.contains("shot"));
        });
        d.addEventListener("pointerleave", function () {
          cu.classList.remove("on");
        });
        addEventListener("pointerdown", function () {
          cu.classList.add("dn");
        });
        addEventListener("pointerup", function () {
          cu.classList.remove("dn");
        });
        (function mv() {
          rx += (px - rx) * (rm ? 1 : 0.16);
          ry += (py - ry) * (rm ? 1 : 0.16);
          cd.style.transform = "translate3d(" + px + "px," + py + "px,0)";
          cr.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
          requestAnimationFrame(mv);
        })();
      }
      var AR = {
          Home: "الرئيسية",
          About: "نبذة عني",
          Projects: "المشاريع",
          Skills: "المهارات",
          Contact: "تواصل معي",
          Experience: "الخبرة",
          "Hire me": "تواصل معي",
          "Flutter Developer": "مطوّر Flutter",
          "for iOS & Android": "لأجهزة iOS وأندرويد",
          "Cairo, Egypt": "القاهرة، مصر",
          "Open to freelance work": "متاح للعمل الحر",
          "I turn product ideas into Flutter apps that run smoothly on iOS and Android, and I take them all the way to the stores.":
            "أحوّل أفكار المنتجات إلى تطبيقات Flutter تعمل بسلاسة على iOS وأندرويد، وأوصلها بنفسي حتى المتاجر.",
          "I have over 3 years of Flutter experience, with a focus on Clean Architecture, Bloc and Riverpod, Firebase-backed real-time systems and REST API integration.":
            "لدي أكثر من 3 سنوات من الخبرة في Flutter، مع تركيز على Clean Architecture وBloc وRiverpod والأنظمة اللحظية المبنية على Firebase وربط REST API.",
          "As a freelancer I delivered a dual-platform construction marketplace with 500+ downloads and a full-service provider platform.":
            "كمستقل، سلّمت منصة مقاولات تعمل على النظامين وتجاوزت 500 تحميل، ومنصة متكاملة لمزوّدي الخدمات.",
          "I analyze project requirements and constraints, compare possible approaches, recommend the best-fit solution, and estimate the cost and effort of each option.":
            "أحلل متطلبات المشروع وقيوده، وأقارن بين الحلول الممكنة، وأوصي بالأنسب، مع تقدير تكلفة وجهد كل خيار.",
          "I take projects from start to finish: understanding client requirements, designing the system and database, comparing solutions and their costs, then implementing, testing, and shipping the best-fit solution.":
            "أنفّذ المشاريع من البداية للنهاية: أفهم متطلبات العميل، وأصمم النظام وقاعدة البيانات، وأقارن الحلول وتكلفتها، ثم أنفذ الحل الأنسب وأختبره وأسلمه.",
          "Let's talk": "لنتحدث",
          "Download CV": "تحميل السيرة الذاتية",
          Architecture: "المعمارية",
          "Clean Architecture with Bloc or Riverpod, so code stays easy to change.":
            "Clean Architecture مع Bloc أو Riverpod ليبقى الكود سهل التعديل.",
          "Real time": "اللحظي",
          "Chat, live location and push notifications on Firebase and Laravel.":
            "دردشة وموقع مباشر وإشعارات فورية باستخدام Firebase وLaravel.",
          Shipping: "النشر",
          "CI/CD and releases to Google Play and the App Store.":
            "CI/CD والنشر على Google Play وApp Store.",
          "Years of Flutter": "سنوات في Flutter",
          "Projects built end to end": "مشاريع نُفذت من البداية للنهاية",
          "Rating on Mostaql": "التقييم على مستقل",
          "Mid Flutter Developer": "مطوّر Flutter متوسط المستوى",
          Metafortech: "Metafortech",
          "Freelancer for 3 years": "مستقل منذ 3 سنوات",
          "Freelance Flutter Developer, Mostaql":
            "مطوّر Flutter مستقل، منصة مستقل",
          "Delivered 5 client projects end to end, from requirements discovery and system/database design through implementation, testing, and production release.":
            "سلّمت 5 مشاريع لعملاء من البداية للنهاية، بدءًا من فهم المتطلبات وتصميم النظام وقاعدة البيانات، مرورًا بالتنفيذ والاختبار، وحتى النشر الفعلي.",
          "Built full-stack marketplace platforms with Flutter and Laravel, including real-time chat, FCM push notifications and role-based authentication.":
            "بنيت منصات سوق متكاملة بـ Flutter وLaravel، تشمل دردشة لحظية وإشعارات FCM وتسجيل دخول بصلاحيات حسب الدور.",
          "Applied Clean Architecture and Bloc across projects for scalable, maintainable code delivered on time.":
            "طبّقت Clean Architecture وBloc في كل المشاريع للحصول على كود قابل للتوسع والصيانة وتسليمه في موعده.",
          "Optimised performance, integrated Firebase and Supabase, and managed CI/CD for smooth store submissions.":
            "حسّنت الأداء، وربطت Firebase وSupabase، وأدرت CI/CD لرفع التطبيقات على المتاجر بسلاسة.",
          "Engineering Service": "الخدمة الهندسية",
          "Ala Khota Al Habib — Fashion POS":
            "على خطى الحبيب — نقطة بيع للأزياء",
          Shatabli: "شطبلي",
          BNAA: "بناء",
          "Education Platform": "منصة تعليمية",
          "Colt E-Commerce": "Colt للتجارة الإلكترونية",
          "Pharmacy App & Dashboard": "تطبيق الصيدلية ولوحة التحكم",
          "A dual-platform construction marketplace published on Google Play and the App Store, with 500+ downloads. Built with Flutter and shipped as a freelance project.":
            "منصة مقاولات تعمل على النظامين ومنشورة على Google Play وApp Store، وتجاوزت 500 تحميل. بُنيت بـ Flutter كمشروع مستقل.",
          "A desktop point-of-sale system designed for a fashion retail business.":
            "نظام نقاط بيع لسطح المكتب، مصمم لمتجر أزياء.",
          "A full-service marketplace connecting clients with providers. Covers the whole order lifecycle (request, acceptance, completion, rating) with real-time chat and push notifications. Three user roles (Client, Provider, Admin) and geo-filtered provider search with multi-criteria filters.":
            "سوق خدمات متكامل يربط العملاء بمزوّدي الخدمة. يغطي دورة الطلب كاملة (الطلب، القبول، التنفيذ، التقييم) مع دردشة لحظية وإشعارات فورية. ثلاثة أنواع مستخدمين (عميل، مزوّد، مدير) وبحث عن المزوّدين حسب الموقع بعدة معايير.",
          "A cross-platform mobile app built with Flutter for Android and iOS.":
            "تطبيق موبايل متعدد المنصات مبني بـ Flutter لأندرويد وiOS.",
          "Course enrollment and progress tracking with video streaming and offline caching. Users and live data are handled with Firebase Authentication and Firestore.":
            "التسجيل في الكورسات ومتابعة التقدم مع بث الفيديو والتخزين المؤقت للعمل بدون إنترنت. إدارة المستخدمين والبيانات اللحظية عبر Firebase Authentication وFirestore.",
          "A full e-commerce app with product catalog, cart, checkout, order tracking and Stripe payments. Built with Clean Architecture and Bloc, tuned for smooth UI performance.":
            "تطبيق تجارة إلكترونية متكامل: كتالوج المنتجات والسلة والدفع وتتبع الطلبات والدفع عبر Stripe. مبني بـ Clean Architecture وBloc مع أداء سلس للواجهة.",
          "A role-based system for Admin, Pharmacist and Customer with inventory management, stock alerts and a sales dashboard.":
            "نظام بصلاحيات حسب الدور للمدير والصيدلي والعميل، مع إدارة المخزون وتنبيهات النقص ولوحة تحكم للمبيعات.",
          "A complete Islamic Azkar app with offline support, audio playback, prayer time notifications from the Aladhan API, dark and light themes, and full RTL/LTR localization.":
            "تطبيق أذكار إسلامي متكامل يعمل بدون إنترنت، مع تشغيل الصوت وإشعارات مواقيت الصلاة من Aladhan API، ووضعين داكن وفاتح، ودعم كامل للعربية والإنجليزية.",
          "Android & iOS": "أندرويد وiOS",
          "500+ downloads": "+500 تحميل",
          Desktop: "سطح المكتب",
          "Point of Sale": "نقاط البيع",
          "Fashion Retail": "تجارة الأزياء",
          "Real-time chat": "دردشة لحظية",
          "Role-based access": "صلاحيات حسب الدور",
          Dashboard: "لوحة تحكم",
          Localization: "تعدد اللغات",
          Offline: "بدون إنترنت",
          Demo: "عرض توضيحي",
          Mobile: "الموبايل",
          "State management": "إدارة الحالة",
          "Software Engineering": "هندسة البرمجيات",
          "AI Tools": "أدوات الذكاء الاصطناعي",
          "OOP, OOD, SOLID principles, data structures and algorithms, C++, Python":
            "البرمجة كائنية التوجه (OOP)، والتصميم كائني التوجه (OOD)، ومبادئ SOLID، وهياكل البيانات والخوارزميات، وC++ وPython",
          "Claude, ChatGPT, OpenAI Codex, GitHub Copilot, Trae AI, Antigravity, Cursor, Gemini":
            "Claude وChatGPT وOpenAI Codex وGitHub Copilot وTrae AI وAntigravity وCursor وGemini",
          "Backend and APIs": "الباك إند وAPIs",
          Networking: "الشبكات",
          "Local storage": "التخزين المحلي",
          "Maps and location": "الخرائط والموقع",
          Payments: "المدفوعات",
          Also: "أيضًا",
          "Flutter, Dart (iOS & Android)": "Flutter وDart (iOS وأندرويد)",
          "Google Maps, real-time location tracking":
            "Google Maps وتتبع الموقع لحظيًا",
          "CI/CD, Git, GitHub, Play Store and App Store releases":
            "CI/CD وGit وGitHub والنشر على Play Store وApp Store",
          "RTL/LTR localization, push notifications, deep linking, pagination":
            "دعم RTL/LTR والإشعارات وDeep Linking وPagination",
          Education: "التعليم",
          "Bachelor's Degree in Engineering, Kafr El-Sheikh University":
            "بكالوريوس الهندسة، جامعة كفر الشيخ",
          Certifications: "الشهادات",
          "The Complete Flutter & AWS Course: Build a Shop App":
            "كورس Flutter وAWS الكامل: بناء تطبيق متجر",
          "Master Flutter App Architectures: Practical and Modern":
            "إتقان معماريات تطبيقات Flutter: عملي وحديث",
          Languages: "اللغات",
          "Arabic: native": "العربية: لغة أم",
          "English: professional working proficiency":
            "الإنجليزية: كفاءة مهنية",
          Email: "البريد الإلكتروني",
          WhatsApp: "واتساب",
          "© 2026 Abdelrhman Nada": "© 2026 عبدالرحمن ندا",
        },
        T = new WeakMap(),
        H1 = big.innerHTML,
        lgb = d.querySelector(".lg"),
        ttl = d.title,
        lang = "en";
      function nz(s) {
        return s.replace(/\s+/g, " ").trim();
      }
      function walk(l) {
        var w = d.createTreeWalker(d.body, NodeFilter.SHOW_TEXT, {
            acceptNode: function (n) {
              return n.parentNode.closest("script,style,.big")
                ? NodeFilter.FILTER_REJECT
                : NodeFilter.FILTER_ACCEPT;
            },
          }),
          n,
          k;
        while ((n = w.nextNode())) {
          if (l === "ar") {
            k = nz(n.nodeValue);
            if (AR[k]) {
              if (!T.has(n)) T.set(n, n.nodeValue);
              n.nodeValue = AR[k];
            }
          } else if (T.has(n)) {
            n.nodeValue = T.get(n);
            T.delete(n);
          }
        }
      }
      function setLang(l) {
        lang = l;
        var ar = l === "ar";
        h.lang = l;
        h.dir = ar ? "rtl" : "ltr";
        walk(l);
        big.innerHTML = ar
          ? '<span class="w" aria-hidden="true"><span class="ch" style="--i:0">عبدالرحمن</span></span> <span class="w" aria-hidden="true"><span class="ch" style="--i:1">ندا</span></span>'
          : H1;
        big.setAttribute(
          "aria-label",
          ar ? "عبدالرحمن ندا" : "Abdelrhman Nada",
        );
        lgb.textContent = ar ? "EN" : "ع";
        lgb.setAttribute(
          "aria-label",
          ar ? "Switch to English" : "التبديل إلى العربية",
        );
        var pageTitle = ar ? "عبدالرحمن ندا — مطوّر Flutter" : ttl;
        var socialDescription = ar
          ? "مطوّر Flutter ينفّذ المشاريع من متطلبات العميل وتصميم النظام إلى التنفيذ والإطلاق."
          : "Flutter developer delivering projects end to end, from client requirements and system design to implementation and release.";
        d.title = pageTitle;
        d.querySelector("#og-title").content = pageTitle;
        d.querySelector("#twitter-title").content = pageTitle;
        d.querySelector("#og-locale").content = ar ? "ar_EG" : "en_US";
        d.querySelector("#page-description").content = ar
          ? "مطوّر Flutter بخبرة تتجاوز 3 سنوات، أنفّذ مشاريع الموبايل وسطح المكتب من تحليل المتطلبات وتصميم النظام إلى البرمجة والإطلاق."
          : "Flutter developer with 3+ years of experience delivering mobile and desktop projects end to end, from requirements analysis and system design to implementation and release.";
        d.querySelector("#og-description").content = socialDescription;
        d.querySelector("#twitter-description").content = socialDescription;
        fit();
        try {
          localStorage.setItem("lang", l);
        } catch (e) {}
      }
      lgb.addEventListener("click", function () {
        setLang(lang === "ar" ? "en" : "ar");
      });
      try {
        if (localStorage.getItem("lang") === "ar") setLang("ar");
      } catch (e) {}
      (function () {
        d.querySelectorAll("[data-gal]").forEach(function (fg) {
          var g = fg.querySelector(".track"),
            sc = fg.querySelector(".sc"),
            bl = fg.querySelector(".gb.l"),
            br = fg.querySelector(".gb.r");
          function upd() {
            var a = g.getBoundingClientRect(),
              c = sc.getBoundingClientRect();
            bl.disabled = !(a.left < c.left - 2);
            br.disabled = !(a.right > c.right + 2);
          }
          function step(n) {
            sc.scrollBy({
              left: n * Math.max(200, sc.clientWidth * 0.6),
              behavior: rm ? "auto" : "smooth",
            });
          }
          bl.addEventListener("click", function () {
            step(-1);
          });
          br.addEventListener("click", function () {
            step(1);
          });
          sc.addEventListener("scroll", upd, { passive: true });
          addEventListener("resize", upd);
          [].forEach.call(g.children, function (i) {
            i.addEventListener("load", upd);
          });
          setTimeout(upd, 150);
          setTimeout(upd, 900);
        });
        var lb = d.querySelector(".lb"),
          li = lb.querySelector("img");
        function open(s, a) {
          li.src = s;
          li.alt = a || "";
          lb.classList.add("on");
          lb.setAttribute("aria-hidden", "false");
        }
        function close() {
          lb.classList.remove("on");
          lb.setAttribute("aria-hidden", "true");
        }
        d.querySelectorAll("[data-gal] .track").forEach(function (g) {
          g.addEventListener("click", function (e) {
            if (e.target.tagName === "IMG") open(e.target.src, e.target.alt);
          });
          g.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && e.target.tagName === "IMG")
              open(e.target.src, e.target.alt);
          });
        });
        lb.addEventListener("click", close);
        addEventListener("keydown", function (e) {
          if (e.key === "Escape") close();
        });
      })();
      (function tick() {
        var y = scrollY,
          H = innerHeight;
        hd.classList.toggle("sc", y > 40);
        bar.style.transform =
          "scaleX(" + Math.min(1, y / Math.max(1, h.scrollHeight - H)) + ")";
        if (!rm) {
          m += (tm - m) * 0.07;
          big.style.setProperty("--mx", -m * 36 + "px");
          me.style.setProperty("--px", m * 16 + "px");
          if (y < H) big.style.setProperty("--sy", y * 0.3 + "px");
        }
        requestAnimationFrame(tick);
      })();
      (function () {
        var c = d.getElementById("bg"),
          x = c.getContext("2d"),
          W,
          H,
          R,
          P = [],
          G = [],
          mx = -999,
          my = -999;
        function size() {
          R = Math.min(devicePixelRatio || 1, 2);
          W = innerWidth;
          H = innerHeight;
          c.width = W * R;
          c.height = H * R;
          x.setTransform(R, 0, 0, R, 0, 0);
          var n = Math.round(Math.min(90, (W * H) / 16000));
          P = [];
          for (var i = 0; i < n; i++)
            P.push({
              x: Math.random() * W,
              y: Math.random() * H,
              vx: (Math.random() - 0.5) * 0.25,
              vy: (Math.random() - 0.5) * 0.25 - 0.05,
              r: 0.6 + Math.random() * 1.4,
              a: 0.1 + Math.random() * 0.3,
              p: Math.random() * 6.28,
            });
          G = [0, 1, 2].map(function (i) {
            return {
              x: Math.random() * W,
              y: Math.random() * H,
              r: Math.max(W, H) * (0.28 + 0.1 * i),
              vx: (Math.random() - 0.5) * 0.18,
              vy: (Math.random() - 0.5) * 0.18,
            };
          });
        }
        function draw(t) {
          x.clearRect(0, 0, W, H);
          G.forEach(function (g) {
            g.x += g.vx;
            g.y += g.vy;
            if (g.x < -g.r * 0.3 || g.x > W + g.r * 0.3) g.vx *= -1;
            if (g.y < -g.r * 0.3 || g.y > H + g.r * 0.3) g.vy *= -1;
            var q = x.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
            q.addColorStop(0, "rgba(255,255,255,.055)");
            q.addColorStop(1, "rgba(255,255,255,0)");
            x.fillStyle = q;
            x.fillRect(0, 0, W, H);
          });
          for (var i = 0; i < P.length; i++) {
            var p = P[i];
            p.x += p.vx;
            p.y += p.vy;
            var dx = p.x - mx,
              dy = p.y - my,
              dd = dx * dx + dy * dy;
            if (dd < 22500) {
              var f = (1 - Math.sqrt(dd) / 150) * 0.6;
              p.x += dx * f * 0.03;
              p.y += dy * f * 0.03;
            }
            if (p.x < -10) p.x = W + 10;
            if (p.x > W + 10) p.x = -10;
            if (p.y < -10) p.y = H + 10;
            if (p.y > H + 10) p.y = -10;
            var tw = p.a * (0.75 + 0.25 * Math.sin(t / 1400 + p.p));
            x.fillStyle = "rgba(255,255,255," + tw + ")";
            x.beginPath();
            x.arc(p.x, p.y, p.r, 0, 6.283);
            x.fill();
            for (var j = i + 1; j < P.length; j++) {
              var q = P[j],
                ax = p.x - q.x,
                ay = p.y - q.y,
                l = ax * ax + ay * ay;
              if (l < 14400) {
                x.strokeStyle =
                  "rgba(255,255,255," + 0.09 * (1 - l / 14400) + ")";
                x.lineWidth = 0.6;
                x.beginPath();
                x.moveTo(p.x, p.y);
                x.lineTo(q.x, q.y);
                x.stroke();
              }
            }
          }
          if (!rm) requestAnimationFrame(draw);
        }
        addEventListener("resize", size);
        addEventListener("pointermove", function (e) {
          mx = e.clientX;
          my = e.clientY;
        });
        addEventListener("pointerleave", function () {
          mx = my = -999;
        });
        size();
        requestAnimationFrame(draw);
      })();
