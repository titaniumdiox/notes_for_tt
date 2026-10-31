(function (root) {
  const css = `
  .pm-bubble{position:absolute;right:44px;top:520px;width:530px;padding:26px 28px 22px;background:#FFF9EF;border:5px solid #2B3440;border-radius:28px;box-shadow:0 14px 0 rgba(43,52,64,.14)}
  .pm-line{font:700 46px/1.35 "Microsoft YaHei",sans-serif;color:#2B3440;text-align:center;letter-spacing:.02em}
  .pm-pinyin{font:600 22px/1.45 Arial,sans-serif;color:#7C8FA3;text-align:center;margin-top:8px}
  .pm-answer{position:absolute;left:74px;bottom:210px;width:932px;padding:22px 30px 24px;background:rgba(255,249,239,.94);border:2px solid rgba(43,52,64,.18);border-radius:24px;box-shadow:0 18px 42px rgba(43,52,64,.16)}
  .pm-blankline{font:700 58px/1.3 "Microsoft YaHei",sans-serif;color:#2B3440;text-align:center;letter-spacing:.02em}
  .pm-english{font:600 22px/1.45 Georgia,serif;color:#2B3440;text-align:center;margin-top:4px}
  .pm-chips{display:flex;gap:28px;justify-content:center;margin-top:12px;flex-wrap:wrap}
  .pm-chip{font:700 24px/1.4 "Microsoft YaHei",sans-serif;color:#2B3440;background:rgba(184,92,74,.10);border:1.5px solid rgba(184,92,74,.35);border-radius:14px;padding:8px 14px}
  .pm-chip small{font:600 18px/1.4 Arial,sans-serif;color:#B85C4A;margin-left:6px}
  .hl{color:#B85C4A}
  .blank{display:inline-block;width:132px;height:46px;border-bottom:5px solid #B85C4A;margin:0 8px;vertical-align:baseline}
  .pm-label{position:absolute;left:64px;top:118px;font:700 22px/1.2 Arial,sans-serif;letter-spacing:.14em;color:#7C8FA3}
  .pm-card{position:absolute;left:70px;top:250px;width:940px;padding:42px 46px;background:rgba(255,249,239,.94);border:2px solid rgba(43,52,64,.18);border-radius:28px;box-shadow:0 22px 55px rgba(43,52,64,.18)}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function brand(P, t0, label) {
    P.canvas(0, 0, 1080, 106, (ctx) => {
      ctx.clearRect(0, 0, 1080, 106);
      ctx.fillStyle = "rgba(232,230,223,.94)";
      ctx.fillRect(0, 0, 1080, 106);
      ctx.fillStyle = "rgba(43,52,64,.12)";
      ctx.fillRect(0, 103, 1080, 3);
    });
    P.canvas(0, 1810, 1080, 110, (ctx) => {
      ctx.clearRect(0, 0, 1080, 110);
      ctx.fillStyle = "rgba(232,230,223,.94)";
      ctx.fillRect(0, 0, 1080, 110);
      ctx.fillStyle = "rgba(43,52,64,.12)";
      ctx.fillRect(0, 0, 1080, 3);
    });
    P.text("SINOFIELDNOTES", { x: 64, y: 34, w: 620, align: "l", size: 30, color: "ink", weight: 700, at: t0 });
    P.text("EP.07", { x: 1016, y: 44, w: 160, align: "r", size: 22, color: "soft", at: t0 });
    P.text(label, { x: 1016, y: 86, w: 200, align: "r", size: 17, color: "soft", at: t0 });
  }

  root.poemLinePage = function (P, data) {
    const t0 = P.c(0);
    P.img(data.scene, 0, 0, 1080, 1920, { fit: "cover", at: 0 });
    P.canvas(0, 0, 1080, 1920, (ctx) => {
      ctx.clearRect(0, 0, 1080, 1920);
      ctx.fillStyle = "rgba(232,230,223,.10)";
      ctx.fillRect(0, 0, 1080, 1920);
    });
    brand(P, t0, "READING 01");
    P.text(`LINE ${data.lineNo} / 4`, { x: 64, y: 130, w: 420, align: "l", size: 22, color: "soft", weight: 700, at: t0 });

    const bubble = document.createElement("div");
    bubble.className = "pm-bubble";
    bubble.innerHTML = `<div class="pm-line">${data.lineHtml}</div><div class="pm-pinyin">${data.pinyinHtml}</div>`;
    P.html.appendChild(bubble);

    const answer = document.createElement("div");
    answer.className = "pm-answer";
    const chips = data.chips.map((c) => `<span class="pm-chip"><b class="hl">${c.hanzi}</b> <small>${c.pinyin}</small> · ${c.en}</span>`).join("");
    const answerLine = data.englishHtml
      ? `<div class="pm-blankline">${data.answerLineHtml || data.blankHtml}</div><div class="pm-english">${data.englishHtml}</div>`
      : `<div class="pm-blankline">${data.blankHtml}</div>`;
    answer.innerHTML = `${answerLine}<div class="pm-chips">${chips}</div>`;
    P.html.appendChild(answer);

    P.text("SINOFIELDNOTES · 静夜思", { x: 540, y: 1844, w: 900, align: "c", size: 20, color: "soft", at: 0, mode: "fade" });
  };
})(typeof window !== "undefined" ? window : globalThis);
