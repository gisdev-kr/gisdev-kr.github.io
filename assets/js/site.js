(() => {
  window.addEventListener("DOMContentLoaded", () => window.hljs?.highlightAll());
  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  themeButton?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("gisdev-theme", root.dataset.theme);
    document.querySelector(".giscus-frame")?.contentWindow?.postMessage({giscus:{setConfig:{theme:root.dataset.theme}}}, "https://giscus.app");
  });

  const nav = document.querySelector("[data-site-nav]");
  const navButton = document.querySelector("[data-nav-toggle]");
  const setNav = (open) => {
    nav?.classList.toggle("open", open);
    navButton?.setAttribute("aria-expanded", String(open));
  };
  navButton?.addEventListener("click", () => setNav(!nav?.classList.contains("open")));
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setNav(false)));
  window.addEventListener("resize", () => { if (window.innerWidth > 760) setNav(false); });

  const traffic = document.querySelector("[data-page-traffic]");
  if (traffic) {
    const code = traffic.dataset.goatcounterCode;
    const fetchCount = async (path) => {
      const response = await fetch(`https://${code}.goatcounter.com/counter/${encodeURIComponent(path)}.json`);
      if (!response.ok) throw new Error(`GoatCounter ${response.status}`);
      return (await response.json()).count || "—";
    };
    fetchCount(location.pathname).then((count) => { traffic.querySelector("[data-page-count]").textContent = count; }).catch(() => {});
    fetchCount("TOTAL").then((count) => { traffic.querySelector("[data-total-count]").textContent = count; }).catch(() => {});
  }

  document.querySelector("[data-ad-close]")?.addEventListener("click", () => document.querySelector("[data-ad-popup]")?.remove());

  document.querySelectorAll(".prose pre").forEach((pre) => {
    const button = document.createElement("button"); button.className = "copy-code"; button.type = "button"; button.textContent = "COPY";
    button.addEventListener("click", async () => { await navigator.clipboard.writeText(pre.querySelector("code")?.textContent || pre.textContent || ""); button.textContent = "COPIED"; setTimeout(() => button.textContent = "COPY", 1400); });
    pre.append(button);
  });

  const post = document.querySelector("[data-post-content]");
  if (post) {
    const words = (post.textContent || "").trim().split(/\s+/).length;
    const reading = document.querySelector("[data-reading-time]"); if (reading) reading.textContent = String(Math.max(1, Math.ceil(words / 300)));
    const headings = [...post.querySelectorAll("h2,h3")]; const toc = document.querySelector("[data-toc]");
    headings.forEach((heading, index) => { if (!heading.id) heading.id = `section-${index+1}`; const link = document.createElement("a"); link.href = `#${heading.id}`; link.textContent = heading.textContent || ""; link.dataset.level = heading.tagName.slice(1); toc?.append(link); });
    if (headings.length) { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) document.querySelectorAll("[data-toc] a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)); }), {rootMargin:"-15% 0px -70%"}); headings.forEach((heading) => observer.observe(heading)); }
  }

  document.querySelectorAll("[data-category]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-category]").forEach((item) => item.classList.remove("active")); button.classList.add("active"); const selected = button.dataset.category;
    document.querySelectorAll("[data-post-category]").forEach((row) => row.hidden = selected !== "all" && !row.dataset.postCategory.includes(selected));
  }));

  const input = document.querySelector("[data-search-input]"); const results = document.querySelector("[data-search-results]"); const summary = document.querySelector("[data-search-summary]");
  if (input && results) {
    let index = []; fetch(window.GISDEV_SEARCH_INDEX || "/search.json").then((r) => r.json()).then((data) => { index = data; const q = new URLSearchParams(location.search).get("q"); if (q) { input.value = q; input.dispatchEvent(new Event("input")); } });
    input.addEventListener("input", () => { const query = input.value.trim().toLocaleLowerCase("ko"); results.innerHTML = ""; if (!query) { summary.textContent = "검색어를 입력하면 제목과 태그를 찾아봅니다."; return; } const found = index.filter((item) => [item.title,item.excerpt,item.content,...item.tags,...item.categories].join(" ").toLocaleLowerCase("ko").includes(query)); summary.textContent = `${found.length}개의 기록을 찾았습니다.`; found.forEach((item) => { const row = document.createElement("article"); row.className="post-row"; row.innerHTML=`<time>${item.date}</time><div><p class="eyebrow">${item.categories.join(" / ")}</p><h2><a href="${item.url}">${item.title}</a></h2><p>${item.excerpt}</p><div class="tag-row">${item.tags.map((tag)=>`<span>#${tag}</span>`).join("")}</div></div><a class="row-arrow" href="${item.url}" aria-label="읽기">↗</a>`; results.append(row); }); });
    document.addEventListener("keydown", (event) => { if (event.key === "/" && document.activeElement !== input) { event.preventDefault(); input.focus(); } });
  }
})();
