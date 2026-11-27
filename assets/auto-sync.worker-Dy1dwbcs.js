(function() {
  "use strict";
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var lzString = { exports: {} };
  (function(module) {
    var LZString2 = function() {
      var f = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};
      function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i = 0; i < alphabet.length; i++) {
            baseReverseDic[alphabet][alphabet.charAt(i)] = i;
          }
        }
        return baseReverseDic[alphabet][character];
      }
      var LZString3 = {
        compressToBase64: function(input) {
          if (input == null) return "";
          var res = LZString3._compress(input, 6, function(a) {
            return keyStrBase64.charAt(a);
          });
          switch (res.length % 4) {
            default:
            case 0:
              return res;
            case 1:
              return res + "===";
            case 2:
              return res + "==";
            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          return LZString3._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null) return "";
          return LZString3._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString3._decompress(compressed.length, 16384, function(index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString3.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
            var current_value = compressed.charCodeAt(i);
            buf[i * 2] = current_value >>> 8;
            buf[i * 2 + 1] = current_value % 256;
          }
          return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === void 0) {
            return LZString3.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c) {
              result.push(f(c));
            });
            return LZString3.decompress(result.join(""));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
          if (input == null) return "";
          return LZString3._compress(input, 6, function(a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          input = input.replace(/ /g, "+");
          return LZString3._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function(uncompressed) {
          return LZString3._compress(uncompressed, 16, function(a) {
            return f(a);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null) return "";
          var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }
          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
          }
          value = 2;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          while (true) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString3._decompress(compressed.length, 32768, function(index) {
            return compressed.charCodeAt(index);
          });
        },
        _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
          for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c;
          w = c;
          result.push(c);
          while (true) {
            if (data.index > length) {
              return "";
            }
            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (c = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
            if (dictionary[c]) {
              entry = dictionary[c];
            } else {
              if (c === dictSize) {
                entry = w + w.charAt(0);
              } else {
                return null;
              }
            }
            result.push(entry);
            dictionary[dictSize++] = w + entry.charAt(0);
            enlargeIn--;
            w = entry;
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
          }
        }
      };
      return LZString3;
    }();
    if (module != null) {
      module.exports = LZString2;
    } else if (typeof angular !== "undefined" && angular != null) {
      angular.module("LZString", []).factory("LZString", function() {
        return LZString2;
      });
    }
  })(lzString);
  var lzStringExports = lzString.exports;
  var LZString = /* @__PURE__ */ getDefaultExportFromCjs(lzStringExports);
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
    "stockOps",
    /* 【成本】-经营杂费：摊位费、运费、水电燃料、平台推广、宣传物料、人工……
       一条记录 = 一笔钱 + 一种算法（平摊到某段日子 / 每天固定 / 一次性）。
       统计时按「这段日子里该摊多少」扣，而不是把一整笔砸在某一天，看盈亏才不失真。 */
    "expenses"
  ];
  function newId(prefix = "x") {
    return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  }
  const AGENT_ALLOWED = ["orders", "holds", "logs", "stockOps"];
  function sameContent(a, b) {
    const ka = Object.keys(a).filter((k) => k !== "updatedAt");
    const kb = Object.keys(b).filter((k) => k !== "updatedAt");
    if (ka.length !== kb.length) return false;
    return ka.every((k) => JSON.stringify(a[k]) === JSON.stringify(b[k]));
  }
  function mergeList(local, remote, name, report) {
    const map = new Map(local.map((r) => [r.id, r]));
    remote.forEach((rec) => {
      if (!rec || !rec.id) return;
      const cur = map.get(rec.id);
      if (!cur) {
        map.set(rec.id, rec);
        report.added++;
        return;
      }
      const lt = Number(cur.updatedAt) || 0;
      const rt = Number(rec.updatedAt) || 0;
      if (rt > lt) {
        map.set(rec.id, rec);
        report.updated++;
      } else if (rt === lt && !sameContent(cur, rec) && report.conflicts.length < 60) {
        report.conflicts.push({ collection: name, id: rec.id, kept: "local" });
      }
    });
    return Array.from(map.values());
  }
  function reconcileStocks(localRows, remoteRows, localOps, remoteOps, ops, report) {
    const opKey = (o) => o.originId || o.id;
    const lIds = new Set((localOps || []).map(opKey));
    const rIds = new Set((remoteOps || []).map(opKey));
    const commonIds = new Set([...lIds].filter((id) => rIds.has(id)));
    const uniqueOps = (ops || []).filter((o) => !commonIds.has(opKey(o)));
    const fromL = new Set((localOps || []).filter((o) => !commonIds.has(opKey(o))).map(opKey));
    const fromR = new Set((remoteOps || []).filter((o) => !commonIds.has(opKey(o))).map(opKey));
    const keyOf = (r) => r.productId + "|" + r.locType + "|" + r.locId;
    const pairs = /* @__PURE__ */ new Map();
    const put = (r, side) => {
      if (!r) return;
      const k = keyOf(r);
      const e = pairs.get(k) || {};
      e[side] = r;
      pairs.set(k, e);
    };
    (localRows || []).forEach((r) => put(r, "l"));
    (remoteRows || []).forEach((r) => put(r, "r"));
    const opsByKey = /* @__PURE__ */ new Map();
    (ops || []).forEach((o) => {
      const k = keyOf(o);
      if (!opsByKey.has(k)) opsByKey.set(k, []);
      opsByKey.get(k).push(o);
    });
    const sumDelta = (list) => list.reduce((sum, o) => sum + (Number(o.delta) || 0), 0);
    const out = [];
    pairs.forEach((e, k) => {
      const l = e.l, r = e.r;
      const list = opsByKey.get(k) || [];
      const keyOps = uniqueOps.filter((o) => keyOf(o) === k);
      if (!l || !r) {
        const one = l || r;
        const after2 = keyOps.filter((o) => o.id && (Number(o.at) || 0) > (Number(one.updatedAt) || 0));
        if (after2.length) {
          out.push({ ...one, qty: round2(Number(one.qty) + sumDelta(after2)), updatedAt: Math.max(Number(one.updatedAt) || 0, ...after2.map((o) => Number(o.at) || 0)) });
          report.reconciled = (report.reconciled || 0) + 1;
        } else {
          out.push(one);
        }
        return;
      }
      const lt = Number(l.updatedAt) || 0;
      const rt = Number(r.updatedAt) || 0;
      if (round2(l.qty) === round2(r.qty)) {
        out.push(rt > lt ? r : l);
        report.deduped = (report.deduped || 0) + 1;
        return;
      }
      if (!list.length) {
        out.push(rt > lt ? r : l);
        report.deduped = (report.deduped || 0) + 1;
        return;
      }
      const baseIsLocal = lt <= rt;
      const base = baseIsLocal ? l : r;
      const after = keyOps.filter((o) => {
        const at = Number(o.at) || 0;
        if (baseIsLocal) return fromR.has(opKey(o)) || at > lt;
        return fromL.has(opKey(o)) || at > rt;
      });
      const newer = baseIsLocal ? r : l;
      out.push({
        ...newer,
        qty: round2(Number(base.qty) + sumDelta(after)),
        updatedAt: Math.max(lt, rt)
      });
      report.reconciled = (report.reconciled || 0) + 1;
    });
    return out;
  }
  function round2(n) {
    return Math.round((Number(n) || 0) * 100) / 100;
  }
  function mergeAll(local, remote, opts = {}) {
    const fromRole = opts.fromRole || "owner";
    const report = { added: 0, updated: 0, conflicts: [], skipped: [], deduped: 0, reconciled: 0 };
    const collections = {};
    COLLECTIONS.forEach((name) => {
      const base = local.collections && local.collections[name] || [];
      if (fromRole === "agent" && !AGENT_ALLOWED.includes(name)) {
        report.skipped.push(name);
        collections[name] = base;
        return;
      }
      let incoming = remote && remote.collections && remote.collections[name] || [];
      if (name === "stocks") {
        const lok = local.collections && local.collections.stockOps || [];
        const rok = remote && remote.collections && remote.collections.stockOps || [];
        const ops = mergeList(lok, rok, "stockOps", report);
        collections.stockOps = ops;
        collections.stocks = reconcileStocks(base, incoming, lok, rok, ops, report);
        return;
      }
      let merged = mergeList(base, incoming, name, report);
      collections[name] = merged;
    });
    let settings = local.settings;
    const rs = remote && remote.settings;
    if (rs && (Number(rs.updatedAt) || 0) > (Number(local.settings && local.settings.updatedAt) || 0)) {
      settings = { ...local.settings, ...rs };
      report.updated++;
    }
    const meta = { ...local.meta || {} };
    const rm = remote && remote.meta;
    if (rm && !meta.activeStoreId && rm.activeStoreId) meta.activeStoreId = rm.activeStoreId;
    return { collections, settings, meta, report };
  }
  const STORE = "docs";
  function tx(db, mode) {
    try {
      return db.transaction(STORE, mode, { durability: "relaxed" });
    } catch (e) {
      return db.transaction(STORE, mode);
    }
  }
  function createIndexedDBAdapter(dbName = "stall3") {
    let dbp = null;
    const OPEN_TIMEOUT = 9e3;
    function open() {
      if (dbp) return dbp;
      dbp = new Promise((resolve, reject) => {
        if (typeof indexedDB === "undefined") {
          dbp = null;
          reject(new Error("indexeddb-unsupported"));
          return;
        }
        let settled = false;
        const finish = (fn, arg) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          if (fn === reject) dbp = null;
          fn(arg);
        };
        const timer = setTimeout(() => {
          finish(reject, new Error("indexeddb-open-timeout（另一个标签页可能还占着这个库）"));
        }, OPEN_TIMEOUT);
        let req;
        try {
          req = indexedDB.open(dbName, 1);
        } catch (e) {
          finish(reject, e);
          return;
        }
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
        };
        req.onsuccess = () => {
          const db = req.result;
          db.onversionchange = () => {
            try {
              db.close();
            } catch (e) {
            }
            dbp = null;
          };
          db.onclose = () => {
            dbp = null;
          };
          finish(resolve, db);
        };
        req.onerror = () => finish(reject, req.error || new Error("indexeddb-open-failed"));
        req.onblocked = () => {
        };
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
          const t = tx(db, "readwrite");
          t.objectStore(STORE).put(value, key);
          t.oncomplete = () => resolve(true);
          t.onerror = () => reject(t.error);
          t.onabort = () => reject(t.error || new Error("tx-aborted"));
        });
      },
      /**
       * 【体积】-一次事务写完多个集合
       * 每开一个事务，浏览器都要单独提交一次、留一条日志；收一单要写 orders/stocks/stockOps 三组，
       * 单开就是三次提交。合并成一次事务后，同样的数据只留一份日志 —— 库文件涨得慢很多。
       */
      async writeMany(pairs) {
        if (!pairs || !pairs.length) return true;
        const db = await open();
        return new Promise((resolve, reject) => {
          const t = tx(db, "readwrite");
          const st = t.objectStore(STORE);
          pairs.forEach(([key, value]) => st.put(value, key));
          t.oncomplete = () => resolve(true);
          t.onerror = () => reject(t.error);
          t.onabort = () => reject(t.error || new Error("tx-aborted"));
        });
      },
      /**
       * 【体积】-按行存：给某个集合的所有行键（集合名: 前缀）
       * 背景：整组写一个集合时，浏览器会把整个数组当成一个新版本追加，
       *      加一单就要重写全部订单，文件涨得比数据快。改成一行一个键，只追加那一行。
       */
      async listKeys(prefix) {
        const db = await open();
        return new Promise((resolve, reject) => {
          const out = [];
          const t = db.transaction(STORE, "readonly");
          const req = t.objectStore(STORE).openKeyCursor(IDBKeyRange.bound(prefix, prefix + "￿"));
          req.onsuccess = () => {
            const cur = req.result;
            if (cur) {
              out.push(cur.key);
              cur.continue();
            } else resolve(out);
          };
          req.onerror = () => reject(req.error);
        });
      },
      /**
       * 【启动速度】-一次把某个前缀下的所有行值取回来
       * 原来是一行一个事务、一次 await，8 万行就要 8 万次往返，
       * 关掉标签再打开能卡 40 秒。getAll 一个事务内批量取，快一个数量级。
       */
      async readPrefix(prefix) {
        const db = await open();
        return new Promise((resolve, reject) => {
          const t = db.transaction(STORE, "readonly");
          const req = t.objectStore(STORE).getAll(IDBKeyRange.bound(prefix, prefix + "￿"));
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => reject(req.error);
        });
      },
      async deleteMany(keys) {
        if (!keys || !keys.length) return true;
        const db = await open();
        return new Promise((resolve, reject) => {
          const t = tx(db, "readwrite");
          const st = t.objectStore(STORE);
          keys.forEach((k) => st.delete(k));
          t.oncomplete = () => resolve(true);
          t.onerror = () => reject(t.error);
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
  const SHARD_COLLECTIONS$1 = ["orders", "logs", "stockOps", "holds", "expenses"];
  let baseName = "";
  const adapters = /* @__PURE__ */ new Map();
  function setShardBase(name) {
    baseName = String(name || "");
  }
  function shardNameOf(storeId, base = baseName) {
    const safe = String(storeId || "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 80);
    return (base || "stall3") + "__s_" + (safe || "global");
  }
  async function adapterOf(storeId) {
    const key = shardNameOf(storeId);
    let item = adapters.get(key);
    if (item) return item;
    const adapter = createIndexedDBAdapter(key);
    await adapter.init();
    item = { adapter, name: key };
    adapters.set(key, item);
    return item;
  }
  async function readShard(storeId, names = SHARD_COLLECTIONS$1) {
    if (!storeId || typeof indexedDB === "undefined") return {};
    let item;
    try {
      item = await adapterOf(storeId);
    } catch (e) {
      console.warn("[shard] 打开分片失败", storeId, e);
      return {};
    }
    const out = {};
    for (const name of names) {
      try {
        const rows = await item.adapter.readPrefix(name + ":");
        out[name] = (rows || []).filter((v) => v && typeof v === "object");
      } catch (e) {
        console.warn("[shard] 读分片失败", storeId, name, e);
        out[name] = [];
      }
    }
    return out;
  }
  const SHARD_COLLECTIONS = ["orders", "logs", "stockOps", "holds", "expenses"];
  const MAIN_COLLECTIONS = ["stores", "warehouses", "products", "stocks", "categories", "agents"];
  const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
  const textBytes = (t) => {
    try {
      return new TextEncoder().encode(t).length;
    } catch (e) {
      return t.length;
    }
  };
  function toArray(v) {
    return Array.isArray(v) ? v.filter(Boolean) : [];
  }
  async function readCollection(adapter, name) {
    try {
      const whole = await adapter.read(name);
      if (Array.isArray(whole)) return whole.filter(Boolean);
    } catch (e) {
    }
    try {
      const rows = await adapter.readPrefix(name + ":");
      return toArray(rows);
    } catch (e) {
      return [];
    }
  }
  async function readLocal(dbName, shardBase, storeId, withShard = true, wantedShard = SHARD_COLLECTIONS) {
    const adapter = createIndexedDBAdapter(dbName);
    await adapter.init();
    const collections = {};
    for (const name of MAIN_COLLECTIONS) collections[name] = await readCollection(adapter, name);
    let settings = {};
    try {
      settings = await adapter.read("settings") || {};
    } catch (e) {
    }
    if (withShard) {
      setShardBase(shardBase);
      const shard = await readShard(storeId, wantedShard);
      for (const name of SHARD_COLLECTIONS) collections[name] = toArray(shard && shard[name]);
    } else {
      for (const name of SHARD_COLLECTIONS) collections[name] = [];
    }
    return { collections, settings };
  }
  function scopeStore(collections, storeId, payFallback) {
    const store = (collections.stores || []).find((s) => s.id === storeId);
    if (!store) return null;
    const whIds = (store.warehouseIds || []).filter((id) => (collections.warehouses || []).some((w) => w.id === id));
    const inScope = (s) => s.locType === "store" && s.locId === storeId || s.locType === "warehouse" && whIds.includes(s.locId);
    const stocks = (collections.stocks || []).filter(inScope);
    const scopedIds = new Set(stocks.filter((s) => r2(s.qty) !== 0).map((s) => s.productId));
    const products = (collections.products || []).filter((p) => p.storeId === storeId || scopedIds.has(p.id));
    const productIds = new Set(products.map((p) => p.id));
    const catIds = new Set(products.map((p) => p.cat).filter(Boolean));
    const pay = {
      ...store,
      wechatQR: store.wechatQR || (store.mine ? payFallback.wechatQR || "" : ""),
      alipayQR: store.alipayQR || (store.mine ? payFallback.alipayQR || "" : ""),
      minDiscount: Number(store.minDiscount) || (store.mine ? Number(payFallback.minDiscount) || 8 : 8)
    };
    return {
      store: { ...pay, warehouseIds: whIds },
      data: {
        stores: [pay],
        warehouses: (collections.warehouses || []).filter((w) => whIds.includes(w.id)),
        products,
        stocks: stocks.filter((s) => productIds.has(s.productId)),
        categories: (collections.categories || []).filter((cat) => catIds.has(cat.id) || (cat.storeIds || []).includes(storeId)),
        orders: (collections.orders || []).filter((o) => o.storeId === storeId),
        holds: (collections.holds || []).filter((h) => h.storeId === storeId),
        logs: (collections.logs || []).filter((l) => l.storeId === storeId),
        agents: (collections.agents || []).filter((a) => a.parentStoreId === storeId),
        stockOps: (collections.stockOps || []).filter((o) => productIds.has(o.productId) && inScope(o)),
        expenses: (collections.expenses || []).filter((e) => !e.storeId || e.storeId === storeId)
      }
    };
  }
  function verifyPackBodies(pack) {
    const cnt = pack && pack.counts || {};
    const c = pack && pack.collections || {};
    const bad = [];
    for (const k of Object.keys(cnt)) {
      const want = Number(cnt[k]) || 0;
      if (!want) continue;
      const got = Array.isArray(c[k]) ? c[k].filter(Boolean).length : 0;
      if (got < want) bad.push(k + " 应 " + want + " 条、有内容 " + got + " 条");
    }
    if (bad.length) throw new Error("导出数据不完整（" + bad.join("；") + "）");
  }
  function encodeText(pack, preferCompress) {
    const json = JSON.stringify(pack);
    let packed = "";
    try {
      packed = "PACK1:" + LZString.compressToBase64(json);
    } catch (e) {
      packed = "";
    }
    if (!packed) return { text: json, packed: false, bytes: textBytes(json) };
    return textBytes(packed) < textBytes(json) ? { text: packed, packed: true, bytes: textBytes(packed) } : { text: json, packed: false, bytes: textBytes(json) };
  }
  function decodeText(raw) {
    let t = String(raw || "").replace(/^\uFEFF/, "").trim();
    if (!t) throw new Error("内容是空的");
    if (/^PACK1:/i.test(t)) {
      const plain = LZString.decompressFromBase64(t.slice(6).replace(/\s+/g, ""));
      if (!plain) throw new Error("压缩包不完整（可能被截断了）");
      return JSON.parse(plain);
    }
    try {
      return JSON.parse(t);
    } catch (e) {
    }
    const a = t.indexOf("{");
    const b = t.lastIndexOf("}");
    if (a >= 0 && b > a) return JSON.parse(t.slice(a, b + 1));
    throw new Error("数据包格式不对");
  }
  async function timedFetch(url, opts = {}, timeoutMs = 45e3) {
    const ctl = new AbortController();
    const timer = setTimeout(() => {
      try {
        ctl.abort();
      } catch (e) {
      }
    }, timeoutMs);
    try {
      const res = await fetch(url, { ...opts, signal: ctl.signal });
      return res;
    } finally {
      clearTimeout(timer);
    }
  }
  function normalizeUpload(json, fallbackName, origin) {
    const raw = json && json.files && json.files[0] || json && json.data && json.data.files && json.data.files[0] || null;
    if (!raw) throw new Error("上传接口没有返回文件信息");
    const name = String(raw.name || raw.filename || fallbackName);
    let pageUrl = String(raw.url || "");
    let downloadUrl = String(raw.downloadUrl || "");
    if (pageUrl && !/^https?:\/\//i.test(pageUrl)) {
      try {
        pageUrl = new URL(pageUrl, origin).toString();
      } catch (e) {
      }
    }
    if (!downloadUrl && pageUrl) downloadUrl = pageUrl.replace(/\/+$/, "") + "/download";
    else if (downloadUrl && !/^https?:\/\//i.test(downloadUrl)) {
      try {
        downloadUrl = new URL(downloadUrl, origin).toString();
      } catch (e) {
      }
    }
    return {
      id: String(raw.id || ""),
      name,
      size: Number(raw.size) || 0,
      url: pageUrl,
      downloadUrl,
      expiresAt: Number(raw.expiryTime || raw.expiresAt) || 0,
      createdAt: Number(raw.createdAt || 0) || 0
    };
  }
  async function uploadPack({ apiBase, origin, name, text, expiryHours, timeoutMs }) {
    const fd = new FormData();
    const file = new File([text], name, { type: "application/json" });
    fd.append("files", file, name);
    fd.append("expiryHours", String(Math.max(1, Number(expiryHours) || 1)));
    const res = await timedFetch(apiBase + "/upload/local", {
      method: "POST",
      body: fd
    }, timeoutMs || 6e4);
    if (!res.ok) throw new Error("上传失败 HTTP " + res.status);
    const json = await res.json().catch(() => null);
    return normalizeUpload(json, name, origin);
  }
  async function extractAndUpload(payload) {
    const t0 = Date.now();
    const local = await readLocal(payload.dbName, payload.shardBase, payload.storeId);
    const tRead = Date.now();
    const scope = scopeStore(local.collections, payload.storeId, payload.payFallback || {});
    if (!scope) throw new Error("找不到当前店铺，无法导出");
    const pack = {
      app: "stall-assistant",
      version: 3,
      kind: "store",
      exportedAt: Date.now(),
      from: { deviceId: payload.deviceId, storeName: scope.store.name, userId: (payload.user || {}).id || "" },
      user: payload.user || null,
      store: { ...scope.store, ownerAuthUserId: scope.store.ownerAuthUserId || (payload.user || {}).id || "" },
      targetStoreId: scope.store.id,
      collections: scope.data,
      meta: { activeStoreId: scope.store.id, role: "owner", schemaVersion: 1 },
      counts: {
        products: scope.data.products.length,
        stocks: scope.data.stocks.length,
        orders: scope.data.orders.length,
        holds: scope.data.holds.length,
        logs: scope.data.logs.length,
        stockOps: scope.data.stockOps.length,
        expenses: scope.data.expenses.length
      }
    };
    Object.assign(pack, payload.packMeta || {});
    verifyPackBodies(pack);
    const tPack = Date.now();
    const encoded = encodeText(pack);
    const tEncode = Date.now();
    const up = await uploadPack({
      apiBase: payload.apiBase,
      origin: payload.origin,
      name: payload.fileName,
      text: encoded.text,
      expiryHours: payload.expiryHours,
      timeoutMs: payload.timeoutMs
    });
    const tEnd = Date.now();
    return {
      up,
      exportedAt: pack.exportedAt,
      counts: pack.counts,
      audience: pack.audience,
      bytes: encoded.bytes,
      packed: encoded.packed,
      ms: { read: tRead - t0, pack: tPack - tRead, encode: tEncode - tPack, upload: tEnd - tEncode, total: tEnd - t0 }
    };
  }
  async function fetchPack({ url, timeoutMs }) {
    const res = await timedFetch(url, { mode: "cors" }, timeoutMs || 45e3);
    if (!res.ok) throw new Error("下载失败 HTTP " + res.status);
    const text = await res.text();
    const pack = decodeText(text);
    return { pack, bytes: text.length };
  }
  function remapPack(pack, local, localOwner) {
    const c = { ...pack.collections || {} };
    const localWhs = local.warehouses || [];
    const packOwner = pack.from && pack.from.deviceId || "pack";
    const originOf = (w, owner) => w.originId || (w.ownerId || owner) + ":" + w.id;
    const remap = {};
    const whs = (c.warehouses || []).map((w) => ({ ...w }));
    whs.forEach((w) => {
      if (!w.ownerId) w.ownerId = packOwner;
      if (!w.originId) w.originId = (w.ownerId || packOwner) + ":" + w.id;
      const origin = w.originId;
      const byOrigin = localWhs.find((x) => originOf(x, localOwner) === origin);
      if (byOrigin) {
        remap[w.id] = byOrigin.id;
        w.id = byOrigin.id;
        w.updatedAt = Math.max(Number(byOrigin.updatedAt) || 0, Number(w.updatedAt) || 0);
        return;
      }
      const byName = localWhs.find((x) => (x.ownerId || localOwner) === w.ownerId && x.name === w.name);
      if (byName) {
        remap[w.id] = byName.id;
        w.id = byName.id;
        w.originId = originOf(byName, localOwner);
        w.updatedAt = Math.max(Number(byName.updatedAt) || 0, Number(w.updatedAt) || 0);
        return;
      }
      const clash = localWhs.find((x) => x.id === w.id && originOf(x, localOwner) !== origin);
      if (clash) {
        const nid = newId("w");
        remap[w.id] = nid;
        w.id = nid;
      }
    });
    const localOps = local.stockOps || [];
    const localOrigin = (o) => o.originId || (o.deviceId || localOwner) + ":" + o.id;
    const originIndex = /* @__PURE__ */ new Map();
    const idIndex = /* @__PURE__ */ new Map();
    for (const x of localOps) {
      const org = localOrigin(x);
      if (!originIndex.has(org)) originIndex.set(org, x);
      if (x.id && !idIndex.has(x.id)) idIndex.set(x.id, x);
    }
    const opRemap = {};
    const ops = (c.stockOps || []).map((o) => {
      if (!o.originId) o.originId = (o.deviceId || packOwner) + ":" + o.id;
      const twin = originIndex.get(o.originId);
      if (twin) {
        opRemap[o.id] = twin.id;
        return { ...o, id: twin.id };
      }
      if (idIndex.has(o.id)) {
        const nid = newId("so");
        opRemap[o.id] = nid;
        return { ...o, id: nid };
      }
      return o;
    });
    c.warehouses = whs;
    c.stores = (c.stores || []).map((st) => ({ ...st, warehouseIds: (st.warehouseIds || []).map((id) => remap[id] || id) }));
    c.stocks = (c.stocks || []).map((st) => st.locType === "warehouse" && remap[st.locId] ? { ...st, locId: remap[st.locId] } : st);
    c.stockOps = ops.map((o) => o.locType === "warehouse" && remap[o.locId] ? { ...o, locId: remap[o.locId] } : o);
    c.logs = (c.logs || []).map((l) => ({
      ...l,
      warehouseId: l.warehouseId && remap[l.warehouseId] ? remap[l.warehouseId] : l.warehouseId,
      opIds: (l.opIds || []).map((id) => opRemap[id] || id)
    }));
    if (pack.store) pack.store = { ...pack.store, warehouseIds: (pack.store.warehouseIds || []).map((id) => remap[id] || id) };
    return { c, remap };
  }
  function rowKey(name, row) {
    if (!row) return "";
    if (name === "stocks") return row.productId + "|" + row.locType + "|" + row.locId;
    return String(row.id || "");
  }
  function rowJson(row) {
    try {
      return JSON.stringify(row);
    } catch (e) {
      return "";
    }
  }
  function buildPlan(name, localRows, mergedRows) {
    const localMap = /* @__PURE__ */ new Map();
    for (const r of localRows || []) {
      const k = rowKey(name, r);
      if (k && !localMap.has(k)) localMap.set(k, r);
    }
    const upserts = [];
    for (const r of mergedRows || []) {
      const k = rowKey(name, r);
      if (!k) continue;
      const old = localMap.get(k);
      if (!old || rowJson(old) !== rowJson(r)) upserts.push(r);
    }
    return upserts;
  }
  async function mergePlan(payload) {
    const t0 = Date.now();
    const pack = payload.pack;
    if (!pack || !pack.collections) throw new Error("这不是店铺数据包");
    const cnt = pack.counts;
    if (cnt) {
      const c2 = pack.collections || {};
      const bad = [];
      for (const k of Object.keys(cnt)) {
        const want = Number(cnt[k]) || 0;
        const got = Array.isArray(c2[k]) ? c2[k].filter(Boolean).length : 0;
        if (got < want) bad.push(k + " 应 " + want + " 条、有内容 " + got + " 条");
      }
      if (bad.length) throw new Error("数据包是空壳（" + bad.join("；") + "）");
    }
    const local = await readLocal(payload.dbName, payload.shardBase, payload.storeId, true, SHARD_COLLECTIONS);
    const tRead = Date.now();
    const { c, remap } = remapPack(pack, local.collections, payload.deviceId || "local");
    const merged = mergeAll(
      { collections: local.collections, settings: local.settings, meta: {} },
      { collections: c },
      { fromRole: "owner" }
    );
    const upserts = {};
    const names = [...MAIN_COLLECTIONS, ...SHARD_COLLECTIONS];
    for (const name of names) {
      upserts[name] = buildPlan(name, local.collections[name], merged.collections[name]);
    }
    const tMerge = Date.now();
    return {
      upserts,
      report: merged.report,
      store: pack.store || null,
      remap,
      ms: { read: tRead - t0, merge: tMerge - tRead, total: Date.now() - t0 },
      counts: Object.fromEntries(names.map((n) => [n, upserts[n].length]))
    };
  }
  self.onmessage = async (e) => {
    const msg = e.data || {};
    const id = msg.id;
    if (msg.op === "ping") {
      self.postMessage({ id, pong: true });
      return;
    }
    try {
      let result;
      if (msg.op === "extractAndUpload") result = await extractAndUpload(msg.payload || {});
      else if (msg.op === "fetchPack") result = await fetchPack(msg.payload || {});
      else if (msg.op === "mergePlan") result = await mergePlan(msg.payload || {});
      else if (msg.op === "uploadText") {
        const p = msg.payload || {};
        result = await uploadPack({
          apiBase: p.apiBase,
          origin: p.origin,
          name: p.name,
          text: p.text,
          expiryHours: p.expiryHours,
          timeoutMs: p.timeoutMs
        });
      } else throw new Error("未知任务：" + msg.op);
      self.postMessage({ id, result });
    } catch (err) {
      self.postMessage({ id, error: err && err.message ? err.message : String(err) });
    }
  };
})();
