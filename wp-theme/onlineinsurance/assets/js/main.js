(function () {
  "use strict";

  /* ---------------- Mobile menu ---------------- */
  var mobileMenu = document.getElementById("oi-mobile-menu");
  var openBtn = document.getElementById("oi-mobile-open");
  var closeBtn = document.getElementById("oi-mobile-close");
  var backdrop = document.getElementById("oi-mobile-backdrop");

  function setMobileMenu(open) {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle("hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (openBtn) openBtn.addEventListener("click", function () { setMobileMenu(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setMobileMenu(false); });
  if (backdrop) backdrop.addEventListener("click", function () { setMobileMenu(false); });

  /* ---------------- Desktop dropdown (Застраховки) ---------------- */
  var ddBtn = document.getElementById("oi-dropdown-btn");
  var ddPanel = document.getElementById("oi-dropdown-panel");
  var ddChevron = document.getElementById("oi-dropdown-chevron");

  function setDropdown(open) {
    if (!ddPanel || !ddBtn) return;
    ddPanel.classList.toggle("hidden", !open);
    ddBtn.setAttribute("aria-expanded", open ? "true" : "false");
    ddBtn.classList.toggle("border-[#47a7d7]", open);
    ddBtn.classList.toggle("text-[#47a7d7]", open);
    ddBtn.classList.toggle("border-transparent", !open);
    if (ddChevron) ddChevron.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
  }
  if (ddBtn) {
    ddBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setDropdown(ddPanel.classList.contains("hidden"));
    });
    document.addEventListener("click", function (e) {
      if (ddPanel && !ddPanel.classList.contains("hidden") && !ddPanel.contains(e.target)) {
        setDropdown(false);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setDropdown(false);
    });
  }

  /* ---------------- Search (REST API) ---------------- */
  var searchInput = document.getElementById("oi-search-input");
  var searchResults = document.getElementById("oi-search-results");
  var searchWrap = document.getElementById("oi-search-wrap");
  var searchTimer = null;

  function renderResults(items, loading) {
    if (!searchResults) return;
    searchResults.classList.remove("hidden");
    if (loading) {
      searchResults.innerHTML = '<div class="p-2 text-gray-500 text-sm text-center" role="status">Зареждане...</div>';
      return;
    }
    if (!items || items.length === 0) {
      searchResults.innerHTML = '<div class="p-2 text-gray-500 text-sm text-center">Няма намерени резултати</div>';
      return;
    }
    var ul = document.createElement("ul");
    ul.className = "divide-y divide-gray-200";
    items.forEach(function (item) {
      var li = document.createElement("li");
      li.className = "p-1 sm:p-2 hover:bg-gray-100";
      var a = document.createElement("a");
      a.href = item.url;
      a.className = "block w-full h-full p-1 sm:p-2 text-gray-900 hover:text-[#47a7d7]";
      a.setAttribute("role", "option");
      a.textContent = item.title;
      li.appendChild(a);
      ul.appendChild(li);
    });
    searchResults.innerHTML = "";
    searchResults.appendChild(ul);
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var q = searchInput.value.trim();
      clearTimeout(searchTimer);
      if (q.length < 3) {
        if (searchResults) searchResults.classList.add("hidden");
        return;
      }
      renderResults(null, true);
      searchTimer = setTimeout(function () {
        var base = (window.OI && window.OI.restUrl) || "/wp-json/";
        fetch(base + "wp/v2/search?search=" + encodeURIComponent(q) + "&per_page=8")
          .then(function (r) { return r.json(); })
          .then(function (data) {
            renderResults(
              (data || []).map(function (d) {
                var tmp = document.createElement("textarea");
                tmp.innerHTML = d.title || "";
                return { title: tmp.value, url: d.url };
              }),
              false
            );
          })
          .catch(function () { renderResults([], false); });
      }, 300);
    });
    document.addEventListener("mousedown", function (e) {
      if (searchWrap && !searchWrap.contains(e.target) && searchResults) {
        searchResults.classList.add("hidden");
      }
    });
  }

  /* ---------------- Back to top ---------------- */
  var backTop = document.getElementById("oi-backtotop");
  if (backTop) {
    window.addEventListener("scroll", function () {
      backTop.classList.toggle("hidden", window.scrollY < 400);
    }, { passive: true });
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- Cookie consent ---------------- */
  var cookieBanner = document.getElementById("oi-cookie-banner");
  function getCookie(name) {
    var m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + d.toUTCString() + "; path=/; SameSite=Lax";
  }
  if (cookieBanner && !getCookie("brdLawCookieConsent")) {
    cookieBanner.style.display = "flex";
    cookieBanner.classList.remove("hidden");
    var accept = document.getElementById("oi-cookie-accept");
    var decline = document.getElementById("oi-cookie-decline");
    if (accept) accept.addEventListener("click", function () {
      setCookie("brdLawCookieConsent", "true", 365);
      cookieBanner.style.display = "none";
    });
    if (decline) decline.addEventListener("click", function () {
      setCookie("brdLawCookieConsent", "false", 365);
      cookieBanner.style.display = "none";
    });
  }

  /* ---------------- Външни линкове в съдържанието ---------------- */
  document.querySelectorAll(".wordpress-content a[href]").forEach(function (a) {
    try {
      var url = new URL(a.getAttribute("href"), window.location.origin);
      if (url.origin !== window.location.origin) {
        a.setAttribute("target", "_blank");
        var rel = (a.getAttribute("rel") || "").split(" ").filter(Boolean);
        ["nofollow", "noopener", "noreferrer"].forEach(function (r) {
          if (rel.indexOf(r) === -1) rel.push(r);
        });
        a.setAttribute("rel", rel.join(" "));
      }
    } catch (e) {}
  });

  /* ---------------- Lazy attrs за изображения в съдържанието ---------------- */
  document.querySelectorAll(".wordpress-content img").forEach(function (img) {
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
    if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
  });
})();
