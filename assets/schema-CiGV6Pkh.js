(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const STORE = "docs";
function createIndexedDBAdapter(dbName = "stall3") {
  let dbp = null;
  function open() {
    if (dbp) return dbp;
    dbp = new Promise((resolve, reject) => {
      if (typeof indexedDB === "undefined") {
        reject(new Error("indexeddb-unsupported"));
        return;
      }
      const req = indexedDB.open(dbName, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error("indexeddb-open-failed"));
      req.onblocked = () => reject(new Error("indexeddb-blocked"));
    });
    return dbp;
  }
  return {
    kind: "indexedDB",
    label: "IndexedDB · " + dbName,
    async init() {
      await open();
    },
    async read(key) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const t = db.transaction(STORE, "readonly");
        const req = t.objectStore(STORE).get(key);
        req.onsuccess = () => resolve(req.result == null ? null : req.result);
        req.onerror = () => reject(req.error);
      });
    },
    async write(key, value) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const t = db.transaction(STORE, "readwrite");
        t.objectStore(STORE).put(value, key);
        t.oncomplete = () => resolve(true);
        t.onerror = () => reject(t.error);
        t.onabort = () => reject(t.error || new Error("tx-aborted"));
      });
    },
    async remove(key) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const t = db.transaction(STORE, "readwrite");
        t.objectStore(STORE).delete(key);
        t.oncomplete = () => resolve(true);
        t.onerror = () => reject(t.error);
      });
    },
    async clear() {
      const db = await open();
      return new Promise((resolve, reject) => {
        const t = db.transaction(STORE, "readwrite");
        t.objectStore(STORE).clear();
        t.oncomplete = () => resolve(true);
        t.onerror = () => reject(t.error);
      });
    },
    async close() {
      if (!dbp) return;
      const db = await dbp;
      db.close();
      dbp = null;
    }
  };
}
function createLocalStorageAdapter(ns = "stall3") {
  const key = (k) => ns + ":" + k;
  return {
    kind: "localStorage",
    label: "localStorage（IndexedDB 不可用时的降级）",
    async init() {
      if (typeof localStorage === "undefined") throw new Error("no-localstorage");
      const probe = "__stall_probe__";
      localStorage.setItem(probe, "1");
      localStorage.removeItem(probe);
    },
    async read(k) {
      const raw = localStorage.getItem(key(k));
      if (raw == null) return null;
      try {
        return JSON.parse(raw);
      } catch (e) {
        return null;
      }
    },
    async write(k, value) {
      localStorage.setItem(key(k), JSON.stringify(value));
      return true;
    },
    async remove(k) {
      localStorage.removeItem(key(k));
      return true;
    },
    async clear() {
      Object.keys(localStorage).filter((x) => x.indexOf(ns + ":") === 0).forEach((x) => localStorage.removeItem(x));
      return true;
    }
  };
}
function createMemoryAdapter() {
  const mem = /* @__PURE__ */ new Map();
  return {
    kind: "memory",
    label: "内存（临时，刷新即丢）",
    async init() {
      return true;
    },
    async read(k) {
      return mem.has(k) ? mem.get(k) : null;
    },
    async write(k, v) {
      mem.set(k, v);
      return true;
    },
    async remove(k) {
      mem.delete(k);
      return true;
    },
    async clear() {
      mem.clear();
      return true;
    }
  };
}
let current = null;
const storageErrors = [];
const DRIVER_KEY = "stall3:driver";
const PROFILES_KEY = "stall3:profiles";
const CURRENT_PROFILE_KEY = "stall3:currentProfile";
function readProfiles() {
  try {
    const raw = window.localStorage.getItem(PROFILES_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}
function saveProfiles(list) {
  try {
    window.localStorage.setItem(PROFILES_KEY, JSON.stringify(list));
  } catch (e) {
  }
}
function readCurrentProfileId() {
  try {
    return window.localStorage.getItem(CURRENT_PROFILE_KEY) || "";
  } catch (e) {
    return "";
  }
}
function saveCurrentProfileId(id) {
  try {
    if (id) window.localStorage.setItem(CURRENT_PROFILE_KEY, id);
  } catch (e) {
  }
}
function getOrCreateProfile() {
  let list = readProfiles();
  let curId = readCurrentProfileId();
  if (!curId || !list.find((p) => p.id === curId)) {
    if (!list.length) {
      const id = "p-" + Date.now().toString(36);
      list = [{ id, name: "我的小店", createdAt: Date.now() }];
      saveProfiles(list);
    }
    curId = list[0].id;
    saveCurrentProfileId(curId);
  }
  return list.find((p) => p.id === curId) || list[0];
}
function addProfile(name) {
  const id = "p-" + Date.now().toString(36);
  const list = readProfiles();
  list.push({ id, name: name || "新配置档", createdAt: Date.now() });
  saveProfiles(list);
  return id;
}
function switchProfile(id) {
  saveCurrentProfileId(id);
}
function currentDbName() {
  const p = getOrCreateProfile();
  return "stall3_" + p.id;
}
function readDriverPref() {
  try {
    return window.localStorage.getItem(DRIVER_KEY) || "";
  } catch (e) {
    return "";
  }
}
function saveDriverPref(kind) {
  try {
    if (kind) window.localStorage.setItem(DRIVER_KEY, kind);
  } catch (e) {
  }
}
function clearDriverPref() {
  try {
    window.localStorage.removeItem(DRIVER_KEY);
  } catch (e) {
  }
}
function factoryOf(kind, dbName) {
  const k = String(kind || "").toLowerCase();
  if (k === "indexeddb") return () => createIndexedDBAdapter(dbName);
  if (k === "localstorage") return () => createLocalStorageAdapter(dbName);
  if (k === "memory") return () => createMemoryAdapter();
  return null;
}
async function initStorage(opts = {}) {
  const dbName = opts.dbName || currentDbName();
  if (opts.adapter) {
    await opts.adapter.init();
    current = opts.adapter;
    return opts.adapter;
  }
  const pref = readDriverPref();
  const prefFactory = pref ? factoryOf(pref, dbName) : null;
  const defaults = [
    () => createIndexedDBAdapter(dbName),
    () => createLocalStorageAdapter(dbName),
    () => createMemoryAdapter()
  ];
  const candidates = prefFactory ? [prefFactory, ...defaults] : defaults;
  for (const make of candidates) {
    const adapter = make();
    try {
      await adapter.init();
      current = adapter;
      saveDriverPref(adapter.kind);
      return adapter;
    } catch (e) {
      storageErrors.push((adapter.kind || "?") + ": " + (e && e.message ? e.message : e));
    }
  }
  clearDriverPref();
  throw new Error("没有可用的存储：" + storageErrors.join(" / "));
}
async function storageUsage() {
  let estimate = null;
  try {
    estimate = await navigator.storage.estimate();
  } catch (e) {
  }
  let localBytes = 0;
  let localKeys = 0;
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i) || "";
      const v = window.localStorage.getItem(k) || "";
      localBytes += (k.length + v.length) * 2;
      localKeys++;
    }
  } catch (e) {
  }
  return {
    kind: current ? current.kind : "",
    label: current ? current.label : "未初始化",
    driver: readDriverPref(),
    estimate,
    localBytes,
    localKeys
  };
}
async function dbBreakdown(currentName) {
  const out = { dbs: [], current: currentName || "", total: 0 };
  let names = [];
  try {
    names = (await indexedDB.databases()).map((d) => d.name).filter(Boolean);
  } catch (e) {
    names = currentName ? [currentName] : [];
  }
  for (const name of names) {
    const keys = [];
    let size = 0;
    await new Promise((resolve) => {
      let db = null;
      try {
        const req = indexedDB.open(name);
        req.onsuccess = () => {
          db = req.result;
          try {
            const store = db.transaction("docs", "readonly").objectStore("docs");
            const g = store.getAllKeys();
            g.onsuccess = () => {
              const ks = g.result || [];
              if (!ks.length) {
                db.close();
                resolve();
                return;
              }
              let i = 0;
              ks.forEach((k) => {
                const v = store.get(k);
                v.onsuccess = () => {
                  const bytes = JSON.stringify(v.result == null ? null : v.result).length;
                  size += bytes;
                  keys.push([k, bytes]);
                  if (++i === ks.length) {
                    db.close();
                    resolve();
                  }
                };
                v.onerror = () => {
                  if (++i === ks.length) {
                    db.close();
                    resolve();
                  }
                };
              });
            };
            g.onerror = () => {
              db.close();
              resolve();
            };
          } catch (e) {
            db.close();
            resolve();
          }
        };
        req.onerror = () => resolve();
      } catch (e) {
        resolve();
      }
    });
    out.dbs.push({ name, size, keys: keys.sort((a, b) => b[1] - a[1]) });
    out.total += size;
  }
  out.dbs.sort((a, b) => b.size - a.size);
  return out;
}
async function dropOtherDbs(keepName) {
  let names = [];
  try {
    names = (await indexedDB.databases()).map((d) => d.name).filter(Boolean);
  } catch (e) {
    return { dropped: 0 };
  }
  let dropped = 0;
  for (const name of names) {
    if (!/^stall3/.test(name) || name === keepName) continue;
    await new Promise((resolve) => {
      const req = indexedDB.deleteDatabase(name);
      req.onsuccess = () => {
        dropped++;
        resolve();
      };
      req.onerror = () => resolve();
      req.onblocked = () => resolve();
    });
  }
  return { dropped };
}
const storage = {
  async read(key) {
    return current.read(key);
  },
  async write(key, value) {
    return current.write(key, value);
  },
  async remove(key) {
    return current.remove(key);
  },
  async clear() {
    return current.clear();
  },
  /* 关掉当前连接：删库之前必须先松手，否则 deleteDatabase 会一直 blocked */
  async close() {
    if (current && current.close) return current.close();
  }
};
const DB_NAME = "stall3";
const COLLECTIONS = [
  "categories",
  "products",
  "stocks",
  "orders",
  "holds",
  "stores",
  "warehouses",
  "agents",
  "logs",
  /* 库存流水：每一次数量变动都留一条 {productId, locType, locId, delta, reason, refId, at}
     —— 合并时不能只比 updatedAt（A 加了库存、B 卖了货，谁新谁旧都算不对），
        要靠这张流水把两边发生的变动叠加，见 core/merge.js 的 reconcileStocks */
  "stockOps"
];
const ROLE = { OWNER: "owner", AGENT: "agent" };
const UNITS = [
  { v: "件", step: 1 },
  { v: "个", step: 1 },
  { v: "份", step: 1 },
  { v: "卷", step: 1 },
  { v: "包", step: 1 },
  { v: "盒", step: 1 },
  { v: "套", step: 1 },
  { v: "条", step: 1 },
  { v: "张", step: 1 },
  { v: "袋", step: 1 },
  { v: "瓶", step: 1 },
  { v: "罐", step: 1 },
  { v: "支", step: 1 },
  { v: "只", step: 1 },
  { v: "双", step: 1 },
  { v: "把", step: 1 },
  { v: "串", step: 1 },
  { v: "打", step: 1 },
  { v: "箱", step: 1 },
  { v: "组", step: 1 },
  { v: "kg", step: 0.01 },
  { v: "g", step: 1 },
  { v: "斤", step: 0.01 },
  { v: "两", step: 0.1 },
  { v: "米", step: 0.1 },
  { v: "cm", step: 0.1 },
  { v: "ml", step: 1 },
  { v: "L", step: 0.01 }
];
const THEME_COLORS = [
  { key: "jade", name: "青绿" },
  { key: "indigo", name: "靛蓝" },
  { key: "clay", name: "陶土" },
  { key: "plum", name: "莓紫" },
  { key: "stone", name: "岩灰" }
];
const FONT_STEPS = [
  { key: 0.92, name: "小" },
  { key: 1, name: "标准" },
  { key: 1.1, name: "大" },
  { key: 1.2, name: "特大" }
];
function defaultSettings() {
  return {
    themeColor: "jade",
    dark: false,
    fontScale: 1,
    shopName: "我的小摊",
    avatar: "",
    // 头像：dataURL（压缩后）或 http(s) 外链，空就用默认图标
    // —— 收银台设置（店主配，代理端共用同一份设置、不能改）——
    showCost: true,
    // 店主视角是否显示成本/毛利（代理永远不显示）
    voice: false,
    // 收款后语音播报金额/找零
    minDiscount: 8,
    // 最低折扣：8 = 8 折，低于这个不给折
    wechatQR: "",
    // 微信收款码图片链接（http/https）
    alipayQR: "",
    // 支付宝收款码图片链接
    updatedAt: 0
  };
}
function defaultMeta() {
  return {
    deviceId: "dev-" + Math.random().toString(36).slice(2, 8),
    activeStoreId: "",
    role: ROLE.OWNER,
    agentId: "",
    // 代理模式下的代理 id
    schemaVersion: 1,
    updatedAt: 0,
    lastSyncAt: 0,
    // 上次「设备同步」覆盖的时间，界面用来提示
    lastSyncDevice: ""
    // 上次是从哪台设备同步过来的
  };
}
function newId(prefix = "x") {
  return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
}
export {
  COLLECTIONS as C,
  DB_NAME as D,
  FONT_STEPS as F,
  ROLE as R,
  THEME_COLORS as T,
  UNITS as U,
  addProfile as a,
  storage as b,
  defaultSettings as c,
  defaultMeta as d,
  currentDbName as e,
  storageErrors as f,
  getOrCreateProfile as g,
  dbBreakdown as h,
  initStorage as i,
  dropOtherDbs as j,
  storageUsage as k,
  newId as n,
  switchProfile as s
};
