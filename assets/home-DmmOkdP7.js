import "./modulepreload-polyfill-DaKOjhqt.js";
import { o as openBlock, c as createElementBlock, a as createBaseVNode, u as unref, b as createStaticVNode, t as toDisplayString, d as createTextVNode, F as Fragment, r as renderList, n as normalizeClass, e as normalizeStyle, f as computed, g as ref, h as createApp } from "./runtime-dom.esm-bundler-q_bMS1-u.js";
const brand = "" + new URL("brand-mark-C1MNnppS.svg", import.meta.url).href;
const shotCashier = "" + new URL("cashier-BnspGia9.png", import.meta.url).href;
const shotProducts = "" + new URL("products-CTkyn6zT.png", import.meta.url).href;
const shotMe = "" + new URL("me-CkZGJJIM.png", import.meta.url).href;
const _hoisted_1 = { class: "promo-page" };
const _hoisted_2 = { class: "topbar" };
const _hoisted_3 = {
  class: "brand",
  href: "./",
  "aria-label": "83摊盈助手宣传主页"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = { class: "hero" };
const _hoisted_6 = {
  class: "hero-visual",
  "data-reveal": ""
};
const _hoisted_7 = { class: "phone phone-main" };
const _hoisted_8 = { class: "phone-screen" };
const _hoisted_9 = ["src"];
const _hoisted_10 = { class: "float-card f3" };
const _hoisted_11 = {
  class: "section flow",
  id: "flow"
};
const _hoisted_12 = {
  class: "flow-stage",
  "data-reveal": ""
};
const _hoisted_13 = { class: "flow-track" };
const _hoisted_14 = ["onClick"];
const _hoisted_15 = {
  class: "flow-line",
  "aria-hidden": "true"
};
const _hoisted_16 = { class: "flow-panel-head" };
const _hoisted_17 = { class: "flow-badge" };
const _hoisted_18 = { class: "flow-stat" };
const _hoisted_19 = { class: "flow-steps" };
const _hoisted_20 = {
  class: "section screens",
  id: "screens"
};
const _hoisted_21 = { class: "screen-grid" };
const _hoisted_22 = { "data-reveal": "" };
const _hoisted_23 = { class: "phone small" };
const _hoisted_24 = { class: "phone-screen" };
const _hoisted_25 = ["src"];
const _hoisted_26 = { "data-reveal": "" };
const _hoisted_27 = { class: "phone small" };
const _hoisted_28 = { class: "phone-screen" };
const _hoisted_29 = ["src"];
const _hoisted_30 = { "data-reveal": "" };
const _hoisted_31 = { class: "phone small" };
const _hoisted_32 = { class: "phone-screen" };
const _hoisted_33 = ["src"];
const _hoisted_34 = {
  class: "final",
  "data-reveal": ""
};
const _hoisted_35 = ["src"];
const _hoisted_36 = { class: "domain" };
const _hoisted_37 = { class: "foot" };
const _hoisted_38 = { class: "copyright" };
const _sfc_main = {
  __name: "PromoApp",
  setup(__props) {
    const siteHost = computed(() => {
      try {
        const host = (window.location.hostname || "").trim();
        return host || "83.fivecc.cn";
      } catch (e) {
        return "83.fivecc.cn";
      }
    });
    const FLOW = [
      { id: "sell", act: "开单", tag: "本机", title: "先写本机，不等网络", text: "收银、扣库存、写日志都在 IndexedDB 里完成。断网、在地摊、在地下车库，照样能开单。", stat: "写入 1 次事务", cls: "a" },
      { id: "scope", act: "取数", tag: "Worker", title: "只圈这家店的数据", text: "自动同步时按店铺范围取数：本店商品、挂载仓、订单、流水、日志，别家店一行不碰。", stat: "提取在后台线程", cls: "b" },
      { id: "pack", act: "打包", tag: "PACK1", title: "压缩后才上传", text: "整包先压成 PACK1，压缩不比原文小就直接传 JSON；大包体积能少一半以上。", stat: "按字节比大小", cls: "c" },
      { id: "cloud", act: "上传", tag: "临时链接", title: "一次上传，成员各取", text: "店主建云群组，成员各传自己的包；代理包、共享包分开走，链接默认 1 小时有效。", stat: "独立单文件", cls: "d" },
      { id: "merge", act: "合并", tag: "增量", title: "只写变化的那几行", text: "按 id 对齐、同 id 取更新的；库存用流水对账后再落库，主线程不重扫整店。", stat: "Worker 算差异行", cls: "e" }
    ];
    const flowOn = ref(0);
    let flowTimer = 0;
    function playFlow() {
      stopFlow();
      flowTimer = setInterval(() => {
        flowOn.value = (flowOn.value + 1) % FLOW.length;
      }, 2600);
    }
    function stopFlow() {
      if (flowTimer) {
        clearInterval(flowTimer);
        flowTimer = 0;
      }
    }
    playFlow();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, [
          createBaseVNode("a", _hoisted_3, [
            createBaseVNode("img", {
              src: unref(brand),
              alt: "83摊盈助手"
            }, null, 8, _hoisted_4),
            _cache[0] || (_cache[0] = createBaseVNode("span", null, [
              createBaseVNode("b", null, "83摊盈助手"),
              createBaseVNode("i", null, "摆摊经营，一本明白账")
            ], -1))
          ]),
          _cache[1] || (_cache[1] = createStaticVNode('<nav><a href="#features">功能</a><a href="#how">怎么用</a><a href="#flow">数据流</a><a href="#screens">界面</a><a href="#safe">数据</a></nav><a class="top-cta" href="../">打开账本 <span>↗</span></a>', 2))
        ]),
        createBaseVNode("main", null, [
          createBaseVNode("section", _hoisted_5, [
            _cache[6] || (_cache[6] = createStaticVNode('<div class="hero-bg" aria-hidden="true"><span class="orb orb-a"></span><span class="orb orb-b"></span><span class="grid"></span></div><div class="hero-copy" data-reveal><div class="eyebrow"><span class="pulse"></span> 为摆摊、小铺、手作人做的随身账本</div><h1> 小摊的每一笔，<br> 都该算得<span class="mark">明明白白</span>。 </h1><p class="lead"> 开单、找零、库存、分仓、代理对账、毛利分析，一个手机就够。 不联网也能卖货，数据默认留在你自己的设备里。 </p><div class="hero-actions"><a class="btn primary" href="../">打开我的账本 <span>→</span></a><a class="btn ghost" href="#features">先看看能做什么</a></div><ul class="trust"><li><b>不用注册</b><span>打开就能开单</span></li><li><b>离线可用</b><span>断网照常收银</span></li><li><b>多端适配</b><span>手机 / 平板 / 电脑</span></li></ul></div>', 2)),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("div", _hoisted_8, [
                  createBaseVNode("img", {
                    src: unref(shotCashier),
                    alt: "83摊盈助手收银台界面"
                  }, null, 8, _hoisted_9)
                ])
              ]),
              _cache[4] || (_cache[4] = createBaseVNode("div", { class: "float-card f1" }, [
                createBaseVNode("span", { class: "dot" }),
                createBaseVNode("div", null, [
                  createBaseVNode("b", null, "收银、库存、统计"),
                  createBaseVNode("i", null, "都在一个应用里")
                ])
              ], -1)),
              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "float-card f2" }, [
                createBaseVNode("span", { class: "mini-bars" }, [
                  createBaseVNode("i"),
                  createBaseVNode("i"),
                  createBaseVNode("i")
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("b", null, "每笔毛利"),
                  createBaseVNode("i", null, "卖完就能看见")
                ])
              ], -1)),
              createBaseVNode("div", _hoisted_10, [
                _cache[3] || (_cache[3] = createBaseVNode("span", { class: "mini-tag" }, "83", -1)),
                createBaseVNode("div", null, [
                  _cache[2] || (_cache[2] = createBaseVNode("b", null, "八收三扣", -1)),
                  createBaseVNode("i", null, "盈利有数 · " + toDisplayString(siteHost.value), 1)
                ])
              ])
            ]),
            _cache[7] || (_cache[7] = createBaseVNode("div", {
              class: "scroll-hint",
              "aria-hidden": "true"
            }, [
              createBaseVNode("span"),
              createTextVNode("往下看，先算清三件事")
            ], -1))
          ]),
          _cache[21] || (_cache[21] = createStaticVNode('<div class="ribbon" aria-hidden="true"><div class="ribbon-track"><span>快速开单</span><i>·</i><span>自动找零</span><i>·</i><span>整卷拆份</span><i>·</i><span>多仓调拨</span><i>·</i><span>代理交账</span><i>·</i><span>共享店主</span><i>·</i><span>商品销售细则</span><i>·</i><span>云端导出</span><i>·</i><span>快速开单</span><i>·</i><span>自动找零</span><i>·</i><span>整卷拆份</span><i>·</i><span>多仓调拨</span><i>·</i><span>代理交账</span><i>·</i><span>共享店主</span><i>·</i><span>商品销售细则</span><i>·</i><span>云端导出</span><i>·</i></div></div><section class="section pain" data-reveal><div class="section-kicker">摆摊人的三个瞬间</div><h2>忙起来的时候，账最容易乱。</h2><p class="section-sub">不是不会算，是手上沾着胶带、后面还排着人。83 把容易出错的环节，交给手机算。</p><div class="pain-grid"><article><span class="pain-no">01</span><h3>“收 50 找多少？”</h3><p>现金、扫码、折扣、抹零混在一起，忙中算错一次，半天白干。</p><strong>→ 输入实收，找零自动算清</strong></article><article><span class="pain-no">02</span><h3>“那卷货放哪了？”</h3><p>店里有、仓库有、分装还有，翻箱子找半天，顾客已经走了。</p><strong>→ 店内 / 仓库 / 分装库存分开记</strong></article><article><span class="pain-no">03</span><h3>“这个月到底赚没赚？”</h3><p>只知道收了多少，不知道成本、折扣、抹零之后还剩多少。</p><strong>→ 每单毛利、毛利率实时汇总</strong></article></div></section><section class="section features" id="features"><div class="section-head" data-reveal><div><div class="section-kicker">现有功能</div><h2>从开第一单，到月底对账。</h2></div><p>不是把收银机搬进手机，而是按摊位真实的动线来：先卖货，再管货，最后算赚了多少。</p></div><div class="feature-grid"><article class="feature-card big" data-reveal><div class="feature-top"><span class="glyph">收</span><em>01</em></div><h3>三秒开单，找零不用心算</h3><p>选商品、改数量、点结账。现金自动算找零，扫码直接记实收；折扣和抹零都留在订单里，事后能复盘。</p><div class="receipt"><div><span>原价</span><b>¥ 108.00</b></div><div><span>9 折</span><b class="jade">− ¥ 10.80</b></div><div><span>抹零</span><b class="jade">− ¥ 0.20</b></div><div class="total"><span>应收</span><b>¥ 97.00</b></div></div></article><article class="feature-card" data-reveal><div class="feature-top"><span class="glyph">拆</span><em>02</em></div><h3>整卷拆份，库存自己变</h3><p>一卷胶带拆 10 份，点一下拆卷，整卷 −1、分装 +10，数量关系自动记，不用两头改表。</p><div class="split-figure"><span class="roll">整卷 <b>−1</b></span><span class="arrow">→</span><span class="pieces"><i></i><i></i><i></i><i></i><i></i><b>+10 份</b></span></div></article><article class="feature-card" data-reveal><div class="feature-top"><span class="glyph">仓</span><em>03</em></div><h3>多店多仓，货在哪一眼清</h3><p>一家店可以挂多个仓库。店里卖、仓库调、库存分开算；低库存会自动提醒，不等到卖空才发现。</p><div class="loc-lines"><div><span class="loc-dot store"></span>本店 <b>18</b></div><div><span class="loc-dot wh"></span>仓库 A <b>12</b></div><div><span class="loc-dot wh"></span>仓库 B <b>6</b></div></div></article><article class="feature-card" data-reveal><div class="feature-top"><span class="glyph">账</span><em>04</em></div><h3>代理、共享店主，各算各的账</h3><p>代理交账包、共享授权包分开走；店主看全局，代理只看到自己的货和账，权限有边界。</p><div class="role-pills"><span>店主 · 全部</span><span>代理 · 交账</span><span>共管 · 授权</span></div></article><article class="feature-card" data-reveal><div class="feature-top"><span class="glyph">析</span><em>05</em></div><h3>毛利不是“收了多少”</h3><p>按实收减成本算毛利：折扣、抹零、商品成本、其他成本（杯子/包装）都算进去，避免毛利虚高。</p><div class="profit-figure"><div><span>实收</span><b>¥ 97.00</b></div><div><span>成本</span><b>− ¥ 31.50</b></div><div class="profit-line"><span>毛利</span><b>¥ 65.50</b><i>67.5%</i></div></div></article><article class="feature-card big" data-reveal><div class="feature-top"><span class="glyph">出</span><em>06</em></div><h3>账能带走，也能换台手机继续</h3><p>商品表、库存表、经营分析、店铺包都能导出。打开“云导出”后，文件直接生成下载链接，微信里也能复制到浏览器打开。</p><div class="export-chips"><span>店铺包</span><span>商品表</span><span>库存表</span><span>经营分析</span><span class="hot">商品销售细则</span></div></article></div></section><section class="section deep"><div class="deep-row" data-reveal><div class="deep-copy"><div class="section-kicker">算钱</div><h2>折扣、抹零、找零，<br>每一步都留痕。</h2><p>很多账本只记“收了多少”。83 把原价、折扣、抹零、顾客递来的现金和找零分开记，订单详情里随时能翻。</p><ul><li><b>现金单</b>：输入顾客给的钱，找零自动算，不用按计算器。</li><li><b>折扣单</b>：低于店主设置的最低折扣点不出来，避免忙中让价太多。</li><li><b>抹零单</b>：抹掉的是利润，不是找零，统计里分得清。</li></ul></div><div class="deep-art"><div class="mock-panel"><div class="mock-head"><span>结算</span><em>现金</em></div><div class="mock-line"><span>顾客给</span><b>¥ 100.00</b></div><div class="mock-line"><span>应收</span><b>¥ 97.00</b></div><div class="mock-change"><span>应找</span><b>¥ 3.00</b></div><div class="mock-ok">确认收款</div></div></div></div><div class="deep-row reverse" data-reveal><div class="deep-copy"><div class="section-kicker">算货</div><h2>整卷和分装，<br>本来就是两笔库存。</h2><p>手作、胶带、贴纸这类货，整卷进、按份卖。83 允许一个商品挂多个分装商品，拆卷时按“每卷拆几份”自动换算。</p><ul><li><b>拆卷不改钱</b>：只搬数量，库存成本按商品各自记。</li><li><b>位置分开</b>：本店拆、仓库拆，拆完的份数落在对应位置。</li><li><b>父商品汇总</b>：销售细则里能直接看到分装库存和分装售卖数量。</li></ul></div><div class="deep-art craft"><div class="craft-roll"><span>整卷</span><b>3 → 2</b></div><div class="craft-path"><i></i><i></i><i></i></div><div class="craft-pieces"><span>分装</span><b>18 → 28 份</b><em>每卷拆 10 份</em></div></div></div><div class="deep-row" data-reveal><div class="deep-copy"><div class="section-kicker">算经营</div><h2>商品销售细则，<br>一眼看出谁在赚钱。</h2><p>商品库新增一份更细的经营表：每个商品的全部参数，加上售卖数量、成交单数、销售实收、毛利、毛利率、库存成本价值、分装库存和分装销量。</p><ul><li><b>整单折扣会分摊</b>：按每行原价占比摊到商品，毛利加总能和订单对得上。</li><li><b>库存算两遍</b>：成本口径看压了多少钱，售价口径看还能卖多少钱。</li><li><b>导出跟随云开关</b>：开了云导出就生成临时下载链接，没开就落本机。</li></ul></div><div class="deep-art table-art"><div class="detail-table"><div class="th"><span>商品</span><span>销量</span><span>毛利</span><span>毛利率</span></div><div><span>街景胶带整卷</span><span>7</span><span>¥ 58.8</span><span class="jade">50.0%</span></div><div><span>街景胶带分装</span><span>21</span><span>¥ 54.6</span><span class="jade">74.3%</span></div><div><span>周计划内页 A5</span><span>4</span><span>¥ 20.4</span><span class="jade">51.5%</span></div><em>示例数据，仅示意列结构</em></div></div></div></section>', 4)),
          createBaseVNode("section", _hoisted_11, [
            _cache[10] || (_cache[10] = createBaseVNode("div", {
              class: "section-head",
              "data-reveal": ""
            }, [
              createBaseVNode("div", null, [
                createBaseVNode("div", { class: "section-kicker" }, "数据怎么流动"),
                createBaseVNode("h2", null, [
                  createTextVNode("一台手机开单，"),
                  createBaseVNode("br"),
                  createTextVNode("另一台接着算。")
                ])
              ]),
              createBaseVNode("p", null, "不靠“云账号”才能用。默认先写本机，需要跨设备时再把这家店的包传出去；每一步都能在「数据同步」里看见。")
            ], -1)),
            createBaseVNode("div", _hoisted_12, [
              createBaseVNode("div", _hoisted_13, [
                (openBlock(), createElementBlock(Fragment, null, renderList(FLOW, (f, i) => {
                  return createBaseVNode("button", {
                    key: f.id,
                    class: normalizeClass(["flow-node", [f.cls, { on: flowOn.value === i }]]),
                    type: "button",
                    onClick: ($event) => flowOn.value = i
                  }, [
                    _cache[8] || (_cache[8] = createBaseVNode("span", { class: "flow-dot" }, null, -1)),
                    createBaseVNode("b", null, toDisplayString(f.act), 1),
                    createBaseVNode("i", null, toDisplayString(f.tag), 1)
                  ], 10, _hoisted_14);
                }), 64)),
                createBaseVNode("span", _hoisted_15, [
                  createBaseVNode("i", {
                    style: normalizeStyle({ left: flowOn.value / (FLOW.length - 1) * 100 + "%" })
                  }, null, 4)
                ])
              ]),
              createBaseVNode("div", {
                class: "flow-panel",
                onMouseenter: stopFlow,
                onMouseleave: playFlow
              }, [
                createBaseVNode("div", _hoisted_16, [
                  createBaseVNode("span", _hoisted_17, toDisplayString(FLOW[flowOn.value].tag), 1),
                  createBaseVNode("em", null, "0" + toDisplayString(flowOn.value + 1) + " / 0" + toDisplayString(FLOW.length), 1)
                ]),
                createBaseVNode("h3", null, toDisplayString(FLOW[flowOn.value].title), 1),
                createBaseVNode("p", null, toDisplayString(FLOW[flowOn.value].text), 1),
                createBaseVNode("div", _hoisted_18, [
                  _cache[9] || (_cache[9] = createBaseVNode("span", { class: "pulse-dot" }, null, -1)),
                  createTextVNode(toDisplayString(FLOW[flowOn.value].stat), 1)
                ]),
                createBaseVNode("div", _hoisted_19, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(FLOW, (f, i) => {
                    return createBaseVNode("span", {
                      key: f.id,
                      class: normalizeClass({ done: i <= flowOn.value })
                    }, toDisplayString(f.act), 3);
                  }), 64))
                ])
              ], 32)
            ]),
            _cache[11] || (_cache[11] = createStaticVNode('<div class="flow-cards"><article data-reveal><div class="fc-head"><span class="fc-ico">库</span><em>LOCAL FIRST</em></div><h3>本机先落库</h3><p>收银、扣库存、写流水在同一个事务里提交。网络断了也不影响成交，不会出现“点了收钱但没记上”的账。</p><div class="fc-meter"><span></span><b>0 网络依赖</b></div></article><article data-reveal><div class="fc-head"><span class="fc-ico">包</span><em>PACK1</em></div><h3>打包与压缩</h3><p>整包先 JSON 化，再按字节比较压缩前后体积；只有真的更小才用压缩包，避免小包反而被 Base64 撑大。</p><div class="fc-bars"><i style="width:76%;"></i><i style="width:42%;"></i><span>原文 / 压缩</span></div></article><article data-reveal><div class="fc-head"><span class="fc-ico">并</span><em>MERGE</em></div><h3>合并不是覆盖</h3><p>同 id 取更新时间新的；库存用流水把两边“谁加货、谁卖货”叠加算清，不会一边卖一边把数算丢。</p><div class="fc-merge"><span>本地</span><i>+</i><span>远端</span><i>=</i><b>按 id 合并</b></div></article><article data-reveal><div class="fc-head"><span class="fc-ico">盾</span><em>GUARD</em></div><h3>权限有边界</h3><p>代理只交自己的订单和流水；共享店主可改货但不能越权；店主随时能收回授权，包里也带着角色校验。</p><div class="fc-roles"><span>店主</span><span>代理</span><span>共管</span></div></article></div><div class="flow-note" data-reveal><span class="fn-key">同步状态</span><span>最近上传 <b>刚刚</b></span><span>最近合并 <b>3 分钟前</b></span><span>模式 <b>自动 · 5 分钟</b></span><span class="fn-live"><i></i> Worker 运行中</span></div>', 2))
          ]),
          createBaseVNode("section", _hoisted_20, [
            _cache[15] || (_cache[15] = createBaseVNode("div", {
              class: "section-head",
              "data-reveal": ""
            }, [
              createBaseVNode("div", null, [
                createBaseVNode("div", { class: "section-kicker" }, "真实界面"),
                createBaseVNode("h2", null, "没有花活，打开就能用。")
              ]),
              createBaseVNode("p", null, "下面是应用里的三个核心页面。手机竖屏是一列，平板两列，电脑三列，同一个账本自动适配。")
            ], -1)),
            createBaseVNode("div", _hoisted_21, [
              createBaseVNode("figure", _hoisted_22, [
                createBaseVNode("div", _hoisted_23, [
                  createBaseVNode("div", _hoisted_24, [
                    createBaseVNode("img", {
                      src: unref(shotCashier),
                      alt: "收银台"
                    }, null, 8, _hoisted_25)
                  ])
                ]),
                _cache[12] || (_cache[12] = createBaseVNode("figcaption", null, [
                  createBaseVNode("b", null, "收银台"),
                  createBaseVNode("span", null, "今日小票、开单入口、补货提醒")
                ], -1))
              ]),
              createBaseVNode("figure", _hoisted_26, [
                createBaseVNode("div", _hoisted_27, [
                  createBaseVNode("div", _hoisted_28, [
                    createBaseVNode("img", {
                      src: unref(shotProducts),
                      alt: "商品库"
                    }, null, 8, _hoisted_29)
                  ])
                ]),
                _cache[13] || (_cache[13] = createBaseVNode("figcaption", null, [
                  createBaseVNode("b", null, "商品库"),
                  createBaseVNode("span", null, "库存、分装、共享标记一屏看清")
                ], -1))
              ]),
              createBaseVNode("figure", _hoisted_30, [
                createBaseVNode("div", _hoisted_31, [
                  createBaseVNode("div", _hoisted_32, [
                    createBaseVNode("img", {
                      src: unref(shotMe),
                      alt: "我的页面"
                    }, null, 8, _hoisted_33)
                  ])
                ]),
                _cache[14] || (_cache[14] = createBaseVNode("figcaption", null, [
                  createBaseVNode("b", null, "我的"),
                  createBaseVNode("span", null, "店铺、身份、同步、设置都在这")
                ], -1))
              ])
            ]),
            _cache[16] || (_cache[16] = createBaseVNode("p", { class: "shot-note" }, "截图来自示例店铺“我的小摊”，实际数据以你的账本为准。", -1))
          ]),
          _cache[22] || (_cache[22] = createStaticVNode('<section class="section how" id="how"><div class="section-kicker" data-reveal>怎么开始</div><h2 data-reveal>三步，把摊子搬进手机。</h2><div class="steps"><article data-reveal><span class="step-no">1</span><h3>建店，先把货录进去</h3><p>打开应用就是一家默认店铺。可以改店名、加分类、逐个新增商品，也可以用模板批量导入；有整卷分装的，顺手把“每卷拆几份”填上。</p><div class="step-tip">建议先录售价、成本、其他成本，毛利才算得准</div></article><article data-reveal><span class="step-no">2</span><h3>开单，收钱找零</h3><p>点“手动开单”，选商品、改数量。现金单输入顾客给的钱，扫码单直接确认；有折扣或抹零，在结算页一起填。</p><div class="step-tip">忙的时候先开单，商品介绍可以之后再补</div></article><article data-reveal><span class="step-no">3</span><h3>对账，把赚的算出来</h3><p>统计页看今日/本月/累计的销售额、成本、毛利；商品库导出“销售细则”，看每个商品卖了多少、赚了多少、还压多少货。</p><div class="step-tip">换手机前导出店铺包，新设备导入就能继续</div></article></div><div class="quickstart" data-reveal><div><b>第一次打开，先做这 4 件事</b><span>不用一次做完，边卖边补也行。</span></div><ol><li>在「我的」改店铺名</li><li>商品库新增 3–5 个常卖商品</li><li>填成本和其他成本</li><li>试着开一单，熟悉结算页</li></ol><a href="../">现在打开账本 <span>→</span></a></div></section><section class="section safe" id="safe"><div class="safe-inner"><div class="safe-copy" data-reveal><div class="section-kicker light">数据这件事</div><h2>账是你的，默认不离开你的设备。</h2><p>83 摊盈助手默认把数据存在浏览器本机 IndexedDB 里，不需要注册，也不靠云端账号才能开单。断网、在地摊、在仓库，都能照常收银。</p><div class="safe-points"><div><b>本机优先</b><span>不登录也能完整使用</span></div><div><b>导出可控</b><span>什么时候导出、导给谁，由你决定</span></div><div><b>云导出可选</b><span>默认关闭，开了才生成临时链接</span></div></div><p class="safe-note">换设备、清浏览器缓存前，请先导出店铺包备份；云导出链接是临时的，过期后需要重新导出。</p></div><div class="safe-visual" data-reveal><div class="vault"><div class="vault-top"><span>本机账本</span><em>LOCAL</em></div><div class="vault-row"><span>商品 / 订单 / 库存</span><b>本机</b></div><div class="vault-row"><span>店铺包</span><b class="jade">可导出</b></div><div class="vault-row"><span>云导出</span><b class="muted">默认关闭</b></div><div class="vault-lock">不上传，也能卖货</div></div></div></div></section><section class="section audience"><div class="audience-copy" data-reveal><div class="section-kicker">适合谁</div><h2>摊子不大，账要清楚。</h2><p>一个人守摊、夫妻档、手作工作室、校园市集、夜市小铺，只要你有“进货—摆摊—收钱—剩货”这条线，就用得上。</p><div class="audience-chips"><span>夜市小吃</span><span>手作胶带</span><span>贴纸文具</span><span>文创市集</span><span>校园摆摊</span><span>小店补货</span></div></div><div class="faq" data-reveal><details open><summary>一定要联网、注册吗？</summary><p>不用。默认本机账本，打开就能开单。登录只用于跨设备的用户身份和云群组，不登录也能完整收银。</p></details><details><summary>换手机，数据怎么过去？</summary><p>在「我的 → 数据同步」导出店铺包，新手机导入即可。整机同步包会带上所有店铺；单店包只带一家。</p></details><details><summary>代理能看到我的成本和总账吗？</summary><p>按角色控制。代理有独立的交账包和可见范围；共享店主走授权包，店主可以随时收回。</p></details><details><summary>商品销售细则和商品表有什么区别？</summary><p>商品表用于备份和批量导入，只含档案字段；销售细则用于经营分析，额外带销量、实收、成本、毛利、毛利率、库存货值和分装统计。</p></details></div></section>', 3)),
          createBaseVNode("section", _hoisted_34, [
            _cache[17] || (_cache[17] = createBaseVNode("div", {
              class: "final-glow",
              "aria-hidden": "true"
            }, null, -1)),
            createBaseVNode("img", {
              class: "final-logo",
              src: unref(brand),
              alt: ""
            }, null, 8, _hoisted_35),
            _cache[18] || (_cache[18] = createBaseVNode("h2", null, [
              createTextVNode("下一笔生意，"),
              createBaseVNode("br"),
              createTextVNode("从一笔明白账开始。")
            ], -1)),
            _cache[19] || (_cache[19] = createBaseVNode("p", null, "不用下载安装包，打开网页就能用。先开着试试，觉得顺手再慢慢把货录进来。", -1)),
            _cache[20] || (_cache[20] = createBaseVNode("div", { class: "final-actions" }, [
              createBaseVNode("a", {
                class: "btn primary light",
                href: "../"
              }, [
                createTextVNode("打开 83摊盈助手 "),
                createBaseVNode("span", null, "→")
              ]),
              createBaseVNode("a", {
                class: "btn ghost light",
                href: "#features"
              }, "再看一遍功能")
            ], -1)),
            createBaseVNode("span", _hoisted_36, toDisplayString(siteHost.value) + " · 八收三扣，盈利有数", 1)
          ])
        ]),
        createBaseVNode("footer", _hoisted_37, [
          _cache[23] || (_cache[23] = createStaticVNode('<div><b>83摊盈助手</b><span>摆摊收银 / 库存分仓 / 代理对账 / 经营分析</span></div><div class="foot-links"><a href="../">打开账本</a><a href="#features">功能介绍</a><a href="#how">使用说明</a><a href="#safe">数据说明</a></div>', 2)),
          createBaseVNode("span", _hoisted_38, "© 2026 83摊盈助手 · " + toDisplayString(siteHost.value) + " · 本页面为产品介绍，界面以实际版本为准", 1)
        ])
      ]);
    };
  }
};
createApp(_sfc_main).mount("#promo");
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.16 });
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
