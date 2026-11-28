import { _ as _export_sfc, d as devMode, a as _sfc_main$1, c as consoleRows, b as codecMode, t as tip, e as codecSelfTest, f as codecLastError, g as codecRetryWorker, h as clearConsoleRows } from "./main-DeDeeoym.js";
import { Q as resolveComponent, o as openBlock, c as createElementBlock, u as unref, a as createBaseVNode, t as toDisplayString, O as createCommentVNode, G as createVNode, N as withCtx, F as Fragment, r as renderList, d as createTextVNode, g as ref, f as computed } from "./runtime-dom.esm-bundler-q_bMS1-u.js";
import "./schema-CxiIvDUT.js";
const _hoisted_1 = {
  key: 0,
  class: "dev-fab-wrap"
};
const _hoisted_2 = {
  key: 0,
  class: "dev-badge"
};
const _hoisted_3 = { class: "dev-sheet" };
const _hoisted_4 = { class: "dev-head" };
const _hoisted_5 = { class: "dev-sub" };
const _hoisted_6 = { class: "dev-filters" };
const _hoisted_7 = ["data-on"];
const _hoisted_8 = ["data-on"];
const _hoisted_9 = ["data-on"];
const _hoisted_10 = ["data-on"];
const _hoisted_11 = ["data-on"];
const _hoisted_12 = { class: "dev-body" };
const _hoisted_13 = ["data-level"];
const _hoisted_14 = { class: "dev-time" };
const _hoisted_15 = { class: "dev-lv" };
const _hoisted_16 = { class: "dev-txt" };
const _hoisted_17 = {
  key: 0,
  class: "dev-empty"
};
const _sfc_main = {
  __name: "DevConsole",
  setup(__props) {
    const open = ref(false);
    const filter = ref("all");
    const rows = computed(() => {
      const list = consoleRows.value.slice().reverse();
      if (filter.value === "all") return list;
      if (filter.value === "error") return list.filter((r) => r.level === "error");
      if (filter.value === "warn") return list.filter((r) => r.level === "warn");
      if (filter.value === "net") return list.filter((r) => r.level === "net");
      if (filter.value === "log") return list.filter((r) => r.level === "log");
      return list;
    });
    const counts = computed(() => ({
      all: consoleRows.value.length,
      error: consoleRows.value.filter((r) => r.level === "error").length,
      warn: consoleRows.value.filter((r) => r.level === "warn").length,
      net: consoleRows.value.filter((r) => r.level === "net").length
    }));
    function hhmmss(t) {
      const d = new Date(t);
      const p = (n) => String(n).padStart(2, "0");
      return p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
    }
    function levelName(l) {
      return l === "error" ? "报错" : l === "warn" ? "警告" : l === "net" ? "网络" : "日志";
    }
    async function copyAll() {
      const text = ConsoleStoreText();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(text);
        else {
          const ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        tip("已复制 " + rows.value.length + " 条");
      } catch (e) {
        tip("复制失败，长按文字手动复制");
      }
    }
    function ConsoleStoreText() {
      return rows.value.slice().reverse().map((r) => "[" + hhmmss(r.at) + "] " + levelName(r.level) + " " + r.text).join("\n");
    }
    function clearAll() {
      clearConsoleRows();
      tip("已清空");
    }
    async function runSelfTest() {
      tip("正在自检同步线程…");
      try {
        const r = await codecSelfTest();
        const err = codecLastError();
        console.info("[自检] 同步线程 " + (r.ok ? "正常" : "异常") + " · 运行在 " + (r.mode === "worker" ? "Worker 线程" : "主线程（已回退）") + " · 打包 " + r.encodeMs + "ms · 解包 " + r.decodeMs + "ms · " + r.bytes + " 字节" + (r.mode !== "worker" && err ? " · 最近失败原因：" + err : ""));
        tip("自检完成：" + (r.mode === "worker" ? "Worker 线程" : "主线程回退"));
      } catch (e) {
        console.error("[自检] 同步线程失败 " + (e && e.message ? e.message : e));
        tip("自检失败，详见面板日志", "error");
      }
    }
    const codecLabel = computed(() => {
      const m = codecMode();
      if (m === "worker" || m === "worker-idle") return "Worker";
      if (m === "worker-retry") return "Worker 待重试";
      return "主线程";
    });
    async function retryWorker() {
      codecRetryWorker();
      tip("已重置，正在重新拉起同步线程…");
      await runSelfTest();
    }
    return (_ctx, _cache) => {
      const _component_var_popup = resolveComponent("var-popup");
      return openBlock(), createElementBlock(Fragment, null, [
        unref(devMode) && !open.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createBaseVNode("button", {
            class: "dev-fab",
            "aria-label": "打开手机控制台",
            onClick: _cache[0] || (_cache[0] = ($event) => open.value = true)
          }, [
            _cache[8] || (_cache[8] = createBaseVNode("b", null, "DEV", -1)),
            counts.value.error ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(counts.value.error > 99 ? "99+" : counts.value.error), 1)) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true),
        createVNode(_component_var_popup, {
          show: open.value,
          "onUpdate:show": _cache[7] || (_cache[7] = ($event) => open.value = $event),
          position: "full"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("header", _hoisted_4, [
                _cache[9] || (_cache[9] = createBaseVNode("b", null, "手机控制台", -1)),
                createBaseVNode("span", _hoisted_5, "共 " + toDisplayString(counts.value.all) + " 条 · 报错 " + toDisplayString(counts.value.error) + " · 警告 " + toDisplayString(counts.value.warn) + " · 同步线程 " + toDisplayString(codecLabel.value), 1),
                _cache[10] || (_cache[10] = createBaseVNode("div", { class: "dev-spacer" }, null, -1)),
                createBaseVNode("button", {
                  class: "icon-btn",
                  "aria-label": "关闭",
                  onClick: _cache[1] || (_cache[1] = ($event) => open.value = false)
                }, [
                  createVNode(_sfc_main$1, {
                    name: "close",
                    size: 18
                  })
                ])
              ]),
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("button", {
                  class: "chip sm",
                  "data-on": filter.value === "all",
                  onClick: _cache[2] || (_cache[2] = ($event) => filter.value = "all")
                }, "全部 " + toDisplayString(counts.value.all), 9, _hoisted_7),
                createBaseVNode("button", {
                  class: "chip sm",
                  "data-on": filter.value === "error",
                  onClick: _cache[3] || (_cache[3] = ($event) => filter.value = "error")
                }, "报错 " + toDisplayString(counts.value.error), 9, _hoisted_8),
                createBaseVNode("button", {
                  class: "chip sm",
                  "data-on": filter.value === "warn",
                  onClick: _cache[4] || (_cache[4] = ($event) => filter.value = "warn")
                }, "警告 " + toDisplayString(counts.value.warn), 9, _hoisted_9),
                createBaseVNode("button", {
                  class: "chip sm",
                  "data-on": filter.value === "net",
                  onClick: _cache[5] || (_cache[5] = ($event) => filter.value = "net")
                }, "网络 " + toDisplayString(counts.value.net), 9, _hoisted_10),
                createBaseVNode("button", {
                  class: "chip sm",
                  "data-on": filter.value === "log",
                  onClick: _cache[6] || (_cache[6] = ($event) => filter.value = "log")
                }, "日志", 8, _hoisted_11),
                _cache[11] || (_cache[11] = createBaseVNode("div", { class: "dev-spacer" }, null, -1)),
                createBaseVNode("button", {
                  class: "chip sm",
                  onClick: runSelfTest
                }, "线程自检"),
                createBaseVNode("button", {
                  class: "chip sm",
                  onClick: retryWorker
                }, "重试线程"),
                createBaseVNode("button", {
                  class: "chip sm",
                  onClick: copyAll
                }, "复制"),
                createBaseVNode("button", {
                  class: "chip sm danger",
                  onClick: clearAll
                }, "清空")
              ]),
              createBaseVNode("div", _hoisted_12, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(rows.value, (r) => {
                  return openBlock(), createElementBlock("div", {
                    key: r.id,
                    class: "dev-row",
                    "data-level": r.level
                  }, [
                    createBaseVNode("span", _hoisted_14, toDisplayString(hhmmss(r.at)), 1),
                    createBaseVNode("span", _hoisted_15, toDisplayString(levelName(r.level)), 1),
                    createBaseVNode("span", _hoisted_16, toDisplayString(r.text), 1)
                  ], 8, _hoisted_13);
                }), 128)),
                !rows.value.length ? (openBlock(), createElementBlock("div", _hoisted_17, [..._cache[12] || (_cache[12] = [
                  createBaseVNode("b", null, "还没有记录", -1),
                  createTextVNode("页面里的 console 输出、报错和网络请求会按时间倒序出现在这里 ", -1)
                ])])) : createCommentVNode("", true)
              ])
            ])
          ]),
          _: 1
        }, 8, ["show"])
      ], 64);
    };
  }
};
const DevConsole = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8b5650ec"]]);
export {
  DevConsole as default
};
