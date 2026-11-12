import { C as COLLECTIONS, R as ROLE, d as defaultMeta, c as defaultSettings, b as storage, n as newId, i as initStorage, e as currentDbName, f as storageErrors, a as addProfile, s as switchProfile, D as DB_NAME, U as UNITS, F as FONT_STEPS, T as THEME_COLORS, h as storageUsage } from "./schema-Cpo7YWVO.js";
/**
* @vue/shared v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$2.call(val, key);
const isArray$1 = Array.isArray;
const isMap$1 = (val) => toTypeString$1(val) === "[object Map]";
const isSet$1 = (val) => toTypeString$1(val) === "[object Set]";
const isDate$1 = (val) => toTypeString$1(val) === "[object Date]";
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$1(val) || isFunction$1(val)) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString$1 = Object.prototype.toString;
const toTypeString$1 = (value) => objectToString$1.call(value);
const toRawType$1 = (value) => {
  return toTypeString$1(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString$1(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-\w/g;
const camelize$1 = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const toNumber$1 = (val) => {
  const n2 = isString$1(val) ? Number(val) : NaN;
  return isNaN(n2) ? val : n2;
};
let _globalThis;
const getGlobalThis$1 = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value) || isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, (match) => match.startsWith("/*") ? "" : match).split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name2 in value) {
      if (value[name2]) {
        res += name2 + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props2) {
  if (!props2) return null;
  let { class: klass, style } = props2;
  if (klass && !isString$1(klass)) {
    props2.class = normalizeClass(klass);
  }
  if (style) {
    props2.style = normalizeStyle(style);
  }
  return props2;
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function looseCompareArrays(a, b, seen) {
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i], seen);
  }
  return equal;
}
function looseCompareCollections(a, b, seen) {
  if (a.size !== b.size) return false;
  const candidates = Array.from(b);
  const matched = new Uint8Array(candidates.length);
  for (const item of a) {
    let index = -1;
    for (let i = 0; i < candidates.length; i++) {
      if (!matched[i] && looseEqual(item, candidates[i], seen)) {
        index = i;
        break;
      }
    }
    if (index < 0) return false;
    matched[index] = 1;
  }
  return true;
}
function looseCompareObjects(a, b, seen) {
  let aValidType = isMap$1(a);
  let bValidType = isMap$1(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareCollections(a, b, seen) : false;
  }
  aValidType = isSet$1(a);
  bValidType = isSet$1(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareCollections(a, b, seen) : false;
  }
  const aKeysCount = Object.keys(a).length;
  const bKeysCount = Object.keys(b).length;
  if (aKeysCount !== bKeysCount) {
    return false;
  }
  for (const key in a) {
    const aHasKey = a.hasOwnProperty(key);
    const bHasKey = b.hasOwnProperty(key);
    if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key], seen)) {
      return false;
    }
  }
  return String(a) === String(b);
}
function looseCompareNested(a, b, seen, compare) {
  if (!seen) {
    seen = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
  }
  const [seenA, seenB] = seen;
  if (seenA.has(a) || seenB.has(b)) {
    return seenA.get(a) === b && seenB.get(b) === a;
  }
  seenA.set(a, b);
  seenB.set(b, a);
  const equal = compare(a, b, seen);
  seenA.delete(a);
  seenB.delete(b);
  return equal;
}
function looseEqual(a, b, seen) {
  if (a === b) return true;
  let aValidType = isDate$1(a);
  let bValidType = isDate$1(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray$1(a);
  bValidType = isArray$1(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareNested(a, b, seen, looseCompareArrays) : false;
  }
  aValidType = isObject$1(a);
  bValidType = isObject$1(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    return looseCompareNested(a, b, seen, looseCompareObjects);
  }
  return String(a) === String(b);
}
const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  return isString$1(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString$1 || !isFunction$1(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isRef$1(val)) {
    return replacer(_key, val.value);
  } else if (isMap$1(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet$1(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};
/**
* @vue/reactivity v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeEffectScope;
class EffectScope {
  // TODO isolatedDeclarations "__v_skip"
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this._warnOnRun = true;
    this.__v_skip = true;
    if (!detached && activeEffectScope) {
      if (activeEffectScope.active) {
        this.parent = activeEffectScope;
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
      } else {
        this._active = false;
        this._warnOnRun = false;
      }
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        const scopes = this.scopes.slice();
        for (i = 0, l = scopes.length; i < l; i++) {
          scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          const scopes = this.scopes.slice();
          for (i = 0, l = scopes.length; i < l; i++) {
            scopes[i].resume();
          }
        }
        const effects = this.effects.slice();
        for (i = 0, l = effects.length; i < l; i++) {
          effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (activeEffectScope === this) {
        activeEffectScope = this.prevScope;
      } else {
        let current = activeEffectScope;
        while (current) {
          if (current.prevScope === this) {
            current.prevScope = this.prevScope;
            break;
          }
          current = current.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        const scopes = this.scopes.slice();
        for (i = 0, l = scopes.length; i < l; i++) {
          scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope) {
      if (activeEffectScope.active) {
        activeEffectScope.effects.push(this);
      } else {
        this.flags &= -2;
      }
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error2;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error2) error2 = err;
        }
      }
      e = next;
    }
  }
  if (error2) throw error2;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
    return;
  }
  computed2.flags |= 2;
  const dep = computed2.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2.flags |= 128;
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  // TODO isolatedDeclarations "__v_skip"
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
const ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray$1(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap$1(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap$1(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap$1(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = /* @__PURE__ */ toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  if (/* @__PURE__ */ isShallow(array)) return raw;
  if (!/* @__PURE__ */ isReadonly(array)) return raw.map(toReactive);
  return /* @__PURE__ */ isReactive(array) ? raw.map((item) => toReadonly(toReactive(item))) : raw.map(toReadonly);
}
function shallowReadArray(arr) {
  track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
function toWrapped(target, item) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
  }
  return toReactive(item);
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray$1(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toWrapped(this, value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(
      this,
      "filter",
      fn,
      thisArg,
      (v) => v.map((item) => toWrapped(this, item)),
      arguments
    );
  },
  find(fn, thisArg) {
    return apply(
      this,
      "find",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(
      this,
      "findLast",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", (item) => toWrapped(this, item));
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const methodFn = arr[method];
  const iter = methodFn.call(arr);
  if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
    if (iter[Symbol.toStringTag] === "Array Iterator") {
      const wrapped = Object.create(Object.getPrototypeOf(iter));
      wrapped.next = () => wrapResult(iter.next(), wrapValue);
      if (methodFn !== arrayProto[method]) {
        Object.defineProperties(wrapped, {
          return: {
            get() {
              const fn = iter.return;
              return typeof fn === "function" ? fn.bind(iter) : fn;
            }
          },
          throw: {
            get() {
              const fn = iter.throw;
              return typeof fn === "function" ? fn.bind(iter) : fn;
            }
          }
        });
      }
      return wrapped;
    }
    iter._next = iter.next;
    iter.next = () => wrapResult(iter._next(), wrapValue);
  }
  return iter;
}
function wrapResult(result, wrapValue) {
  if (!result.done) {
    result.value = wrapValue(result.value);
  }
  return result;
}
const arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  let wrappedFn = fn;
  let wrapInitialAccumulator = false;
  if (arr !== self2) {
    if (needsWrap) {
      wrapInitialAccumulator = args.length === 0;
      wrappedFn = function(acc, item, index) {
        if (wrapInitialAccumulator) {
          wrapInitialAccumulator = false;
          acc = toWrapped(self2, acc);
        }
        return fn.call(this, acc, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  const result = arr[method](wrappedFn, ...args);
  return wrapInitialAccumulator ? toWrapped(self2, result) : result;
}
function searchProxy(self2, method, args) {
  const arr = /* @__PURE__ */ toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
    args[0] = /* @__PURE__ */ toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty$1(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = /* @__PURE__ */ toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty$1;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (/* @__PURE__ */ isRef(res)) {
      const value = targetIsArray && isIntegerKey(key) ? res : res.value;
      return isReadonly2 && isObject$1(value) ? /* @__PURE__ */ readonly(value) : value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const isArrayWithIntegerKey = isArray$1(target) && isIntegerKey(key);
    if (!this._isShallow) {
      const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
      if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
        oldValue = /* @__PURE__ */ toRaw(oldValue);
        value = /* @__PURE__ */ toRaw(value);
      }
      if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
        if (isOldValueReadonly) {
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (target === /* @__PURE__ */ toRaw(receiver) && result) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn$1(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = /* @__PURE__ */ toRaw(target);
    const targetIsMap = isMap$1(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return extend(
      // inheriting all iterator properties
      Object.create(innerIterator),
      {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        }
      }
    );
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        const target = /* @__PURE__ */ toRaw(this);
        const proto = getProto(target);
        const rawValue = /* @__PURE__ */ toRaw(value);
        const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
        const hadKey = proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue);
        if (!hadKey) {
          target.add(valueToAdd);
          trigger(target, "add", valueToAdd, valueToAdd);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          value = /* @__PURE__ */ toRaw(value);
        }
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = /* @__PURE__ */ toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn$1(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function reactive(target) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
// @__NO_SIDE_EFFECTS__
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  if (target["__v_skip"] || !Object.isExtensible(target)) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = targetTypeMap(toRawType$1(target));
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
  if (/* @__PURE__ */ isReadonly(value)) {
    return /* @__PURE__ */ isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
// @__NO_SIDE_EFFECTS__
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn$1(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$1(value) ? /* @__PURE__ */ reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? /* @__PURE__ */ readonly(value) : value;
// @__NO_SIDE_EFFECTS__
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
// @__NO_SIDE_EFFECTS__
function ref(value) {
  return createRef(value, false);
}
// @__NO_SIDE_EFFECTS__
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (/* @__PURE__ */ isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
    newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
function unref(ref2) {
  return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
// @__NO_SIDE_EFFECTS__
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction$1(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call: call2 } = options;
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (/* @__PURE__ */ isRef(source)) {
    getter = () => source.value;
    forceTrigger = /* @__PURE__ */ isShallow(source);
  } else if (/* @__PURE__ */ isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
    getter = () => source.map((s) => {
      if (/* @__PURE__ */ isRef(s)) {
        return s.value;
      } else if (/* @__PURE__ */ isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction$1(s)) {
        return call2 ? call2(s, 2) : s();
      } else ;
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = call2 ? () => call2(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call2 ? call2(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      try {
        return _cb(...args);
      } finally {
        watchHandle();
      }
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (immediateFirstRun || deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        const currentWatcher = activeWatcher;
        pauseTracking();
        try {
          if (cleanup) {
            cleanup();
          }
          activeWatcher = effect2;
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          oldValue = newValue;
          call2 ? call2(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
        } finally {
          activeWatcher = currentWatcher;
          resetTracking();
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call2) {
        call2(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Map();
  if ((seen.get(value) || 0) >= depth) {
    return value;
  }
  seen.set(value, depth);
  depth--;
  if (/* @__PURE__ */ isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet$1(value) || isMap$1(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
/**
* @vue/runtime-core v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack$1 = [];
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack$1.length ? stack$1[stack$1.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack$1[stack$1.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs2 = [];
  trace.forEach((entry, i) => {
    logs2.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs2;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props2) {
  const res = [];
  const keys = Object.keys(props2);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props2[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString$1(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (/* @__PURE__ */ isRef(value)) {
    value = formatProp(key, /* @__PURE__ */ toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$1(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = /* @__PURE__ */ toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray$1(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    for (let i = 0; i < cb.length; i++) {
      pendingPostFlushCbs.push(cb[i]);
    }
  }
  queueFlush();
}
function flushPreFlushCbs(instance, minUid, seen, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid || minUid !== void 0 && !(cb.id >= minUid)) {
        continue;
      }
      queue.splice(i, 1);
      i = instance ? i - 1 : flushIndex;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen, skip, minUid = 0) {
  if (pendingPostFlushCbs.length) {
    let cbs = pendingPostFlushCbs;
    let kept = 0;
    if (skip) {
      cbs = [];
      for (let i = 0; i < pendingPostFlushCbs.length; i++) {
        const cb = pendingPostFlushCbs[i];
        if (cb.i !== void 0 ? !cb.i || cb.i.uid < minUid : skip.has(cb)) {
          pendingPostFlushCbs[kept++] = cb;
        } else {
          cbs.push(cb);
        }
      }
    }
    const deduped = [...new Set(cbs)].sort((a, b) => getId(a) - getId(b));
    pendingPostFlushCbs.length = kept;
    if (activePostFlushCbs) {
      for (let i = 0; i < deduped.length; i++) {
        activePostFlushCbs.push(deduped[i]);
      }
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
let isFlushing = false;
function flushOnAppMount(fn, minUid) {
  if (isFlushing) {
    fn();
    return;
  }
  const queued = minUid === void 0 ? void 0 : new Set(pendingPostFlushCbs);
  fn();
  isFlushing = true;
  try {
    flushPreFlushCbs(void 0, minUid);
    flushPostFlushCbs(void 0, queued, minUid);
  } finally {
    isFlushing = false;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) ;
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const prevStackSize = blockStack.length;
    let res;
    try {
      res = fn(...args);
    } finally {
      for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    return vnode;
  }
  const instance = getComponentPublicInstance(currentRenderingInstance);
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction$1(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name2) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name2];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function provide(key, value) {
  if (currentInstance) {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = getCurrentInstance();
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
const ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush: flush2, once } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = cb && immediate || !cb && flush2 !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush2 === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush2 === "post") {
    baseWatchOptions.scheduler = (job) => {
      job.i = instance;
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush2 !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
const pendingMounts = /* @__PURE__ */ new WeakMap();
const TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props2) => props2 && (props2.disabled || props2.disabled === "");
const isTeleportDeferred = (props2) => props2 && (props2.defer || props2.defer === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
const resolveTarget = (props2, select) => {
  const targetSelector = props2 && props2.to;
  if (isString$1(targetSelector)) {
    if (!select) {
      return null;
    } else {
      const target = select(targetSelector);
      return target;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  name: "Teleport",
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment, parentNode }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { dynamicChildren } = n2;
    const mount2 = (vnode, container2, anchor2) => {
      if (vnode.shapeFlag & 16) {
        mountChildren(
          vnode.children,
          container2,
          anchor2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const mountToTarget = (vnode = n2) => {
      const disabled2 = isTeleportDisabled(vnode.props);
      const target = vnode.target = resolveTarget(vnode.props, querySelector);
      const targetAnchor = prepareAnchor(target, vnode, createText, insert);
      if (target) {
        if (namespace !== "svg" && isTargetSVG(target)) {
          namespace = "svg";
        } else if (namespace !== "mathml" && isTargetMathML(target)) {
          namespace = "mathml";
        }
        if (parentComponent && parentComponent.isCE) {
          (parentComponent.ce._teleportTargets || (parentComponent.ce._teleportTargets = /* @__PURE__ */ new Set())).add(target);
        }
        if (!disabled2) {
          mount2(vnode, target, targetAnchor);
          updateCssVars(vnode, false);
        }
      }
    };
    const queuePendingMount = (vnode) => {
      const mountJob = () => {
        if (pendingMounts.get(vnode) !== mountJob) return;
        pendingMounts.delete(vnode);
        if (isTeleportDisabled(vnode.props)) {
          const mountContainer = parentNode(vnode.el) || container;
          mount2(vnode, mountContainer, vnode.anchor);
          updateCssVars(vnode, true);
        }
        mountToTarget(vnode);
      };
      pendingMounts.set(vnode, mountJob);
      queuePostRenderEffect(mountJob, parentSuspense);
    };
    if (n1 == null) {
      const placeholder = n2.el = createText("");
      const mainAnchor = n2.anchor = createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      if (isTeleportDeferred(n2.props) || parentSuspense && parentSuspense.pendingBranch) {
        queuePendingMount(n2);
        return;
      }
      if (disabled) {
        mount2(n2, container, mainAnchor);
        updateCssVars(n2, true);
      }
      mountToTarget();
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const pendingMount = pendingMounts.get(n1);
      if (pendingMount) {
        pendingMount.flags |= 8;
        pendingMounts.delete(n1);
        queuePendingMount(n2);
        return;
      }
      n2.targetStart = n1.targetStart;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      if (namespace === "svg" || isTargetSVG(target)) {
        namespace = "svg";
      } else if (namespace === "mathml" || isTargetMathML(target)) {
        namespace = "mathml";
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
          );
        } else {
          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
            n2.props.to = n1.props.to;
          }
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = resolveTarget(n2.props, querySelector);
          if (nextTarget) {
            n2.target = nextTarget;
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
            );
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            1
          );
        }
      }
      updateCssVars(n2, disabled);
    }
  },
  remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const {
      shapeFlag,
      children,
      anchor,
      targetStart,
      targetAnchor,
      target,
      props: props2
    } = vnode;
    const disabled = isTeleportDisabled(props2);
    const shouldRemove = doRemove || !disabled;
    const pendingMount = pendingMounts.get(vnode);
    if (pendingMount) {
      pendingMount.flags |= 8;
      pendingMounts.delete(vnode);
    }
    if (target) {
      hostRemove(targetStart);
      hostRemove(targetAnchor);
    }
    doRemove && hostRemove(anchor);
    if (!pendingMount && (disabled || target) && shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        unmount(
          child,
          parentComponent,
          parentSuspense,
          shouldRemove,
          !!child.dynamicChildren
        );
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    if (vnode.targetStart) {
      insert(vnode.targetStart, container, parentAnchor);
    }
    insert(vnode.targetAnchor, container, parentAnchor);
    parentAnchor = vnode.targetAnchor;
  }
  const { el, anchor, shapeFlag, children, props: props2 } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!pendingMounts.has(vnode) && (!isReorder || isTeleportDisabled(props2))) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          parentAnchor,
          2
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: { nextSibling, parentNode, querySelector, insert, createText }
}, hydrateChildren) {
  function hydrateAnchor(target2, targetNode) {
    let targetAnchor = targetNode;
    while (targetAnchor) {
      if (targetAnchor && targetAnchor.nodeType === 8) {
        if (targetAnchor.data === "teleport start anchor") {
          vnode.targetStart = targetAnchor;
        } else if (targetAnchor.data === "teleport anchor") {
          vnode.targetAnchor = targetAnchor;
          target2._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
          break;
        }
      }
      targetAnchor = nextSibling(targetAnchor);
    }
  }
  function hydrateDisabledTeleport(node2, vnode2) {
    vnode2.anchor = hydrateChildren(
      nextSibling(node2),
      vnode2,
      parentNode(node2),
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
  }
  const target = vnode.target = resolveTarget(
    vnode.props,
    querySelector
  );
  const disabled = isTeleportDisabled(vnode.props);
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (disabled) {
        hydrateDisabledTeleport(node, vnode);
        hydrateAnchor(target, targetNode);
        if (!vnode.targetAnchor) {
          prepareAnchor(
            target,
            vnode,
            createText,
            insert,
            // if target is the same as the main view, insert anchors before current node
            // to avoid hydrating mismatch
            parentNode(node) === target ? node : null
          );
        }
      } else {
        vnode.anchor = nextSibling(node);
        hydrateAnchor(target, targetNode);
        if (!vnode.targetAnchor) {
          prepareAnchor(target, vnode, createText, insert);
        }
        hydrateChildren(
          targetNode && nextSibling(targetNode),
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
    }
    updateCssVars(vnode, disabled);
  } else if (disabled) {
    if (vnode.shapeFlag & 16) {
      hydrateDisabledTeleport(node, vnode);
      vnode.targetStart = node;
      vnode.targetAnchor = nextSibling(node);
    }
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode, isDisabled) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node, anchor;
    if (isDisabled) {
      node = vnode.el;
      anchor = vnode.anchor;
    } else {
      node = vnode.targetStart;
      anchor = vnode.targetAnchor;
    }
    while (node && node !== anchor) {
      if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
function prepareAnchor(target, vnode, createText, insert, anchor = null) {
  const targetStart = vnode.targetStart = createText("");
  const targetAnchor = vnode.targetAnchor = createText("");
  targetStart[TeleportEndKey] = targetAnchor;
  if (target) {
    insert(targetStart, target, anchor);
    insert(targetAnchor, target, anchor);
  }
  return targetAnchor;
}
const leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
const enterCbKey$1 = /* @__PURE__ */ Symbol("_enterCb");
function useTransitionState() {
  const state2 = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state2.isMounted = true;
  });
  onBeforeUnmount(() => {
    state2.isUnmounting = true;
  });
  return state2;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props2, { slots }) {
    const instance = getCurrentInstance();
    const state2 = useTransitionState();
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      const child = children && children.length ? findNonCommentChild(children) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        instance.subTree ? createCommentVNode() : void 0
      );
      if (!child) {
        return;
      }
      const rawProps = /* @__PURE__ */ toRaw(props2);
      const { mode } = rawProps;
      if (state2.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getInnerChild$1(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      let enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state2,
        instance,
        // #11061, ensure enterHooks is fresh after clone
        (hooks) => enterHooks = hooks
      );
      if (innerChild.type !== Comment) {
        setTransitionHooks(innerChild, enterHooks);
      }
      let oldInnerChild = instance.subTree && getInnerChild$1(instance.subTree);
      if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(oldInnerChild, innerChild) && getTransitionRoot(instance.subTree)) {
        let leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state2,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in" && innerChild.type !== Comment) {
          state2.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state2.isLeaving = false;
            if (!(instance.job.flags & 8)) {
              instance.update();
            }
            delete leavingHooks.afterLeave;
            oldInnerChild = void 0;
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state2,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el[leaveCbKey] = () => {
              earlyRemove();
              el[leaveCbKey] = void 0;
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
            enterHooks.delayedLeave = () => {
              delayedLeave();
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
          };
        } else {
          oldInnerChild = void 0;
        }
      } else if (oldInnerChild) {
        oldInnerChild = void 0;
      }
      return child;
    };
  }
};
function findNonCommentChild(children) {
  let child = children[0];
  if (children.length > 1) {
    for (const c of children) {
      if (c.type !== Comment) {
        child = c;
        break;
      }
    }
  }
  return child;
}
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state2, vnode) {
  const { leavingVNodes } = state2;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props2, state2, instance, postClone) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props2;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state2, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$1(hook)) {
      if (hook.every((hook2) => hook2.length <= 1)) done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state2.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode)) {
        let leavingCb = leavingVNode.el[leaveCbKey];
        if (!leavingCb) {
          const leavingRoot = getTransitionRoot(leavingVNode);
          leavingCb = leavingRoot && leavingRoot.el[leaveCbKey];
        }
        if (leavingCb) {
          leavingCb();
        }
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      if (leavingVNodesCache[key] === vnode) return;
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state2.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      el[enterCbKey$1] = (cancelled) => {
        if (called) return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey$1] = void 0;
      };
      const done = el[enterCbKey$1].bind(null, false);
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el[enterCbKey$1]) {
        el[enterCbKey$1](
          true
          /* cancelled */
        );
      }
      if (state2.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      el[leaveCbKey] = (cancelled) => {
        if (called) return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el[leaveCbKey] = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      const done = el[leaveCbKey].bind(null, false);
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      const hooks2 = resolveTransitionHooks(
        vnode2,
        props2,
        state2,
        instance,
        postClone
      );
      if (postClone) postClone(hooks2);
      return hooks2;
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getInnerChild$1(vnode) {
  if (!isKeepAlive(vnode)) {
    if (isTeleport(vnode.type) && vnode.children) {
      return findNonCommentChild(vnode.children);
    }
    return vnode;
  }
  if (vnode.component) {
    return vnode.component.subTree;
  }
  const { shapeFlag, children } = vnode;
  if (children) {
    if (shapeFlag & 16) {
      return children[0];
    }
    if (shapeFlag & 32 && isFunction$1(children.default)) {
      return children.default();
    }
  }
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    const subTree = vnode.component.subTree;
    setTransitionHooks(
      isTeleport(subTree.type) ? getInnerChild$1(subTree) || subTree : subTree,
      hooks
    );
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
    if (vnode.type === Fragment && isArray$1(vnode.children)) {
      const child = filterSingleRoot(vnode.children, false);
      if (child) {
        setTransitionHooks(child, hooks);
      }
    }
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128) keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function getTransitionRoot(vnode) {
  if (vnode.component) {
    return getTransitionRoot(vnode.component.subTree);
  }
  if (vnode.type === Fragment) {
    const child = isArray$1(vnode.children) && filterSingleRoot(vnode.children, false);
    return child ? getTransitionRoot(child) : void 0;
  }
  if (vnode.type !== Comment) {
    return vnode;
  }
}
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction$1(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
function isTemplateRefKey(refs, key) {
  let desc;
  return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
}
const pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = /* @__PURE__ */ toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
    if (isTemplateRefKey(refs, key)) {
      return false;
    }
    return hasOwn$1(rawSetupState, key);
  };
  const canSetRef = (ref22, key) => {
    if (key && isTemplateRefKey(refs, key)) {
      return false;
    }
    return true;
  };
  if (oldRef != null && oldRef !== ref3) {
    invalidatePendingSetRef(oldRawRef);
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (/* @__PURE__ */ isRef(oldRef)) {
      const oldRawRefAtom = oldRawRef;
      if (canSetRef(oldRef, oldRawRefAtom.k)) {
        oldRef.value = null;
      }
      if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
    }
  }
  if (isFunction$1(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString$1(ref3);
    const _isRef = /* @__PURE__ */ isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : canSetRef() || !rawRef.k ? ref3.value : refs[rawRef.k];
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (canSetSetupRef(ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                const newVal = [refValue];
                if (canSetRef(ref3, rawRef.k)) {
                  ref3.value = newVal;
                }
                if (rawRef.k) refs[rawRef.k] = newVal;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          if (canSetRef(ref3, rawRef.k)) {
            ref3.value = value;
          }
          if (rawRef.k) refs[rawRef.k] = value;
        } else ;
      };
      if (value) {
        const job = () => {
          doSet();
          pendingSetRefMap.delete(rawRef);
        };
        job.id = -1;
        pendingSetRefMap.set(rawRef, job);
        queuePostRenderEffect(job, parentSuspense);
      } else {
        invalidatePendingSetRef(rawRef);
        doSet();
      }
    }
  }
}
function invalidatePendingSetRef(rawRef) {
  const pendingSetRef = pendingSetRefMap.get(rawRef);
  if (pendingSetRef) {
    pendingSetRef.flags |= 8;
    pendingSetRefMap.delete(rawRef);
  }
}
getGlobalThis$1().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis$1().cancelIdleCallback || ((id) => clearTimeout(id));
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const COMPONENTS = "components";
const DIRECTIVES = "directives";
function resolveComponent(name2, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name2, true, maybeSelfReference) || name2;
}
const NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (isString$1(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveDirective(name2) {
  return resolveAsset(DIRECTIVES, name2);
}
function resolveAsset(type, name2, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name2 || selfName === camelize$1(name2) || selfName === capitalize(camelize$1(name2)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name2) || // global registration
      resolve(instance.appContext[type], name2)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name2) {
  return registry && (registry[name2] || registry[camelize$1(name2)] || registry[capitalize(camelize$1(name2))]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache;
  const sourceIsArray = isArray$1(source);
  if (sourceIsArray || isString$1(source)) {
    const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
    let needsWrap = false;
    let isReadonlySource = false;
    if (sourceIsReactiveArray) {
      needsWrap = !/* @__PURE__ */ isShallow(source);
      isReadonlySource = /* @__PURE__ */ isReadonly(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
        i,
        void 0,
        cached
      );
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source) || source < 0) {
      ret = [];
    } else {
      ret = new Array(source);
      for (let i = 0; i < source; i++) {
        ret[i] = renderItem(i + 1, i, void 0, cached);
      }
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached)
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function createSlots(slots, dynamicSlots) {
  for (let i = 0; i < dynamicSlots.length; i++) {
    const slot = dynamicSlots[i];
    if (isArray$1(slot)) {
      for (let j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else if (slot) {
      slots[slot.name] = slot.key ? (...args) => {
        const res = slot.fn(...args);
        if (res) res.key = slot.key;
        return res;
      } : slot.fn;
    }
  }
  return slots;
}
function renderSlot(slots, name2, props2, fallback, noSlotted, branchKey) {
  if (props2 == null) props2 = {};
  if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
    const slotProps = props2;
    const hasProps = Object.keys(slotProps).length > 0;
    if (name2 !== "default") slotProps.name = name2;
    return openBlock(), createBlock(
      Fragment,
      null,
      [createVNode("slot", slotProps, fallback && fallback())],
      hasProps ? -2 : 64
    );
  }
  let slot = slots[name2];
  if (slot && slot._c) {
    slot._d = false;
  }
  const prevStackSize = blockStack.length;
  openBlock();
  let rendered;
  try {
    const validSlotContent = slot && ensureValidVNode(slot(props2));
    const slotKey = props2.key || branchKey || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    validSlotContent && validSlotContent.key;
    rendered = createBlock(
      Fragment,
      {
        key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name2}`) + // #7256 force differentiate fallback content from actual content
        (!validSlotContent && fallback ? "_fb" : "")
      },
      validSlotContent || (fallback ? fallback() : []),
      validSlotContent && slots._ === 1 ? 64 : -2
    );
  } catch (err) {
    for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
    throw err;
  } finally {
    if (slot && slot._c) {
      slot._d = true;
    }
  }
  if (rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child)) return true;
    if (child.type === Comment) return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state2, key) => state2 !== EMPTY_OBJ && !state2.__isScriptSetup && hasOwn$1(state2, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props: props2, accessCache, type, appContext } = instance;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props2[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (hasOwn$1(props2, key)) {
        accessCache[key] = 3;
        return props2[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, props: props2, type }
  }, key) {
    let cssModules;
    return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn$1(data, key) || hasSetupBinding(setupState, key) || hasOwn$1(props2, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function useSlots() {
  return getContext().slots;
}
function getContext(calledFunctionName) {
  const i = getCurrentInstance();
  return i.setupContext || (i.setupContext = createSetupContext(i));
}
function normalizePropsOrEmits(props2) {
  return isArray$1(props2) ? props2.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props2;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted: mounted2,
    beforeUpdate: beforeUpdate2,
    updated: updated2,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted: unmounted2,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data)) ;
    else {
      instance.data = /* @__PURE__ */ reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted2);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate2);
  registerLifecycleHook(onUpdated, updated2);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted2);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val,
          enumerable: true
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (/* @__PURE__ */ isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction$1(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction$1(to) ? to.call(this, this) : to,
      isFunction$1(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$1(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context2 = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app2 = context2.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context2,
      _instance: null,
      version,
      get config() {
        return context2.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) ;
        else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction$1(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else ;
        return app2;
      },
      mixin(mixin) {
        {
          if (!context2.mixins.includes(mixin)) {
            context2.mixins.push(mixin);
          }
        }
        return app2;
      },
      component(name2, component) {
        if (!component) {
          return context2.components[name2];
        }
        context2.components[name2] = component;
        return app2;
      },
      directive(name2, directive) {
        if (!directive) {
          return context2.directives[name2];
        }
        context2.directives[name2] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app2._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context2;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app2._instance,
            16
          );
          render(null, app2._container);
          delete app2._container.__vue_app__;
        }
      },
      provide(key, value) {
        context2.provides[key] = value;
        return app2;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app2;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app2;
  };
}
let currentApp = null;
const getModelModifiers = (props2, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props2.modelModifiers : props2[`${modelName}Modifiers`] || props2[`${camelize$1(modelName)}Modifiers`] || props2[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props2 = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props2, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString$1(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = args.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props2[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props2[handlerName = toHandlerKey(camelize$1(event))];
  if (!handler && isModelListener2) {
    handler = props2[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props2[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
const mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2);
  key = key === "Once" ? key : key.replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props: props2,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? /* @__PURE__ */ shallowReadonly(props2) : props2,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          false ? /* @__PURE__ */ shallowReadonly(props2) : props2,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return /* @__PURE__ */ shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          false ? /* @__PURE__ */ shallowReadonly(props2) : props2,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    const child = isTeleport(root.type) ? getInnerChild$1(root) || root : root;
    setTransitionHooks(child, vnode.transition);
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
function filterSingleRoot(children, recurse = true) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props2) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props2)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (!hasOwn$1(prevProps, key) || hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function hasPropValueChanged(nextProps, prevProps, key) {
  const nextProp = nextProps[key];
  const prevProp = prevProps[key];
  if (key === "style" && isObject$1(nextProp) && isObject$1(prevProp)) {
    return !looseEqual(nextProp, prevProp);
  }
  return nextProp !== prevProp;
}
function updateHOCHostEl({ vnode, parent, suspense }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.suspense.vnode.el = root.el = el;
      vnode = root;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
  if (suspense && suspense.activeBranch === vnode) {
    suspense.vnode.el = el;
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props2 = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props2, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props2)) {
      props2[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props2 : /* @__PURE__ */ shallowReactive(props2);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props2;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props: props2,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = /* @__PURE__ */ toRaw(props2);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize$1(key);
            props2[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props2, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$1(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props2[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props2[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props2, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize$1(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props2[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = /* @__PURE__ */ toRaw(props2);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props2[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn$1(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props2, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props2
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props2, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props2);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize$1(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize$1(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction$1(opt) ? { type: opt } : extend({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray$1(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction$1(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction$1(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn$1(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction$1(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || !isInternalKey(key)) {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis$1();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    if (n2.dynamicChildren && n1 && n1.dynamicChildren && n1.dynamicChildren.hasOnce) {
      if (n2.dynamicChildren === EMPTY_ARR) {
        n2.dynamicChildren = [];
      }
      n2.dynamicChildren.hasOnce = true;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    } else if (ref3 == null && n1 && n1.ref != null) {
      setRef(n1.ref, null, parentSuspense, n1, true);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
      try {
        if (customElement) {
          customElement._beginPatch();
        }
        patchElement(
          n1,
          n2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } finally {
        if (customElement) {
          customElement._endPatch();
        }
      }
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props: props2, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props2 && props2.is,
      props2
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props2) {
      for (const key in props2) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props2[key], namespace, parentComponent);
        }
      }
      if ("value" in props2) {
        hostPatchProp(el, "value", null, props2.value, namespace);
      }
      if (vnodeHook = props2.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props2 && props2.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        try {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        } finally {
        }
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (
      // #6385 the old vnode may be a user-wrapped non-isomorphic block
      // Force full diff when block metadata is unstable.
      dynamicChildren && (!n1.dynamicChildren || n1.dynamicChildren.length !== dynamicChildren.length)
    ) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const oldEl = oldVNode.el || resolveAsyncComponentPlaceholder(oldVNode);
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldEl && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldEl) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(
        instance,
        setupRenderEffect,
        optimized,
        namespace
      );
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
        initialVNode.placeholder = placeholder.el;
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        n2.el = n1.el;
        n2.placeholder = n1.placeholder;
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      n2.placeholder = n1.placeholder;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props: props2 } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        {
          if (root.ce && root.ce._hasShadowRoot()) {
            root.ce._injectChildStyle(
              type,
              instance.parent ? instance.parent.type : void 0
            );
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              queuePostRenderEffect(() => {
                if (!instance.isUnmounted) update();
              }, parentSuspense);
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchorVNode = c2[nextIndex + 1];
        const anchor = nextIndex + 1 < l2 ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode)
        ) : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        if (transition.persisted && !el[leaveCbKey]) {
          hostInsert(el, container, anchor);
        } else {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        }
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => {
          if (vnode.ctx.isUnmounted) {
            hostRemove(el);
          } else {
            hostInsert(el, container, anchor);
          }
        };
        const performLeave = () => {
          const wasLeaving = el._isLeaving || !!el[leaveCbKey];
          if (el._isLeaving) {
            el[leaveCbKey](
              true
              /* cancelled */
            );
          }
          if (transition.persisted && !wasLeaving) {
            remove22();
          } else {
            leave(el, () => {
              remove22();
              afterLeave && afterLeave();
            });
          }
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props: props2,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex,
      memo
    } = vnode;
    if (patchFlag === -2 || dynamicChildren && dynamicChildren.hasOnce) {
      optimized = false;
    }
    if (ref3 != null) {
      pauseTracking();
      setRef(ref3, null, parentSuspense, vnode, true);
      resetTracking();
    }
    if (cacheIndex != null && (!vnode.ctx || vnode.ctx === parentComponent)) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    const shouldInvalidateMemo = memo != null && cacheIndex == null;
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        if (shouldInvalidateMemo) {
          vnode.el = null;
        }
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    const isFragment = type === Fragment;
    if (isFragment && !transition) {
      removeFragment(el, anchor);
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
      return;
    }
    const leavingNode = isFragment ? getTransitionRoot(vnode) : vnode;
    const performRemove = () => {
      if (isFragment) {
        if (hostParentNode(el)) {
          removeFragment(el, anchor);
        }
      } else {
        hostRemove(el);
      }
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (leavingNode && leavingNode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const leavingEl = leavingNode.el;
      const performLeave = () => leave(leavingEl, performRemove);
      if (delayLeave) {
        delayLeave(leavingEl, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    } else if (instance.vnode.el && subTree) {
      subTree.transition = instance.vnode.transition;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  const render = (vnode, container, namespace) => {
    const minUid = vnode && container._vnode ? void 0 : vnode && vnode.component ? vnode.component.uid : getNextUid();
    flushOnAppMount(() => {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
        }
      } else {
        patch(
          container._vnode || null,
          vnode,
          container,
          null,
          null,
          null,
          namespace
        );
      }
      container._vnode = vnode;
    }, minUid);
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  return {
    render,
    hydrate,
    createApp: createAppAPI(render)
  };
}
function resolveChildrenNamespace({ type, props: props2 }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props2 && props2.encoding && props2.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        if (c2.patchFlag === -1) {
          c2 = ch2[i] = cloneIfMounted(c2);
        }
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
function resolveAsyncComponentPlaceholder(anchorVnode) {
  if (anchorVnode.placeholder) {
    return anchorVnode.placeholder;
  }
  const instance = anchorVnode.component;
  if (instance) {
    return resolveAsyncComponentPlaceholder(instance.subTree);
  }
  return null;
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
const Text = /* @__PURE__ */ Symbol.for("v-txt");
const Comment = /* @__PURE__ */ Symbol.for("v-cmt");
const Static = /* @__PURE__ */ Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props2, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props2,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props2, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props2,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString$1(ref3) || /* @__PURE__ */ isRef(ref3) || isFunction$1(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type, props2 = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props: props2,
    key: props2 && normalizeKey(props2),
    ref: props2 && normalizeRef(props2),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$1(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props2 = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props2,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props2) {
    props2 = guardReactiveProps(props2);
    let { class: klass, style } = props2;
    if (klass && !isString$1(klass)) {
      props2.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (/* @__PURE__ */ isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props2.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props2,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props2) {
  if (!props2) return null;
  return /* @__PURE__ */ isProxy(props2) || isInternalObject(props2) ? extend({}, props2) : props2;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props: props2, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props2 || {}, extraProps) : props2;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray$1(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    placeholder: vnode.placeholder,
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce,
    cacheIndex: vnode.cacheIndex
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$1(children)) {
    if (shapeFlag & (1 | 64)) {
      normalizeChildren(vnode, { default: children });
      return;
    }
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        } else if (incoming == null && existing == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !isModelListener(key)) {
          ret[key] = incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function getNextUid() {
  return uid;
}
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis$1();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props: props2, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props2, isStateful, isSSR);
  initSlots(instance, children, optimized || isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          setInSSRSetupState(true);
          try {
            handleSetupResult(instance, resolvedResult, isSSR);
          } finally {
            setInSSRSetupState(false);
          }
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else ;
  finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])\w/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction$1(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name2 = getComponentName(Component);
  if (!name2 && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name2 = match[1];
    }
  }
  if (!name2 && instance) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name2 = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(
      instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name2 ? classify(name2) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction$1(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
function h(type, propsOrChildren, children) {
  try {
    setBlockTracking(-1);
    const l = arguments.length;
    if (l === 2) {
      if (isObject$1(propsOrChildren) && !isArray$1(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  } finally {
    setBlockTracking(1);
  }
}
const version = "3.5.44";
/**
* @vue/runtime-dom v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props2) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props2 && props2.multiple != null) {
      el.setAttribute("multiple", props2.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const TRANSITION = "transition";
const ANIMATION = "animation";
const vtcKey = /* @__PURE__ */ Symbol("_vtc");
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = /* @__PURE__ */ extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const decorate$1 = (t2) => {
  t2.displayName = "Transition";
  t2.props = TransitionPropsValidators;
  return t2;
};
const Transition = /* @__PURE__ */ decorate$1(
  (props2, { slots }) => h(BaseTransition, resolveTransitionProps(props2), slots)
);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name: name2 = "v",
    type,
    duration,
    enterFromClass = `${name2}-enter-from`,
    enterActiveClass = `${name2}-enter-active`,
    enterToClass = `${name2}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name2}-leave-from`,
    leaveActiveClass = `${name2}-leave-active`,
    leaveToClass = `${name2}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done, isCancelled) => {
    el._enterCancelled = isCancelled;
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      if (!el._enterCancelled) {
        forceReflow(el);
        addTransitionClass(el, leaveActiveClass);
      } else {
        addTransitionClass(el, leaveActiveClass);
        forceReflow(el);
      }
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false, void 0, true);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true, void 0, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$1(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n2 = NumberOf(duration);
    return [n2, n2];
  }
}
function NumberOf(val) {
  const res = toNumber$1(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el[vtcKey] = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout != null) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  if (s === "auto") return 0;
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow(el) {
  const targetDocument = el ? el.ownerDocument : document;
  return targetDocument.body.offsetHeight;
}
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
const vShowHidden = /* @__PURE__ */ Symbol("_vsh");
const vShow = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
const CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
const displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$1(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString$1(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      const value = next[key];
      if (value != null) {
        if (!shouldPreserveTextareaResizeStyle(
          el,
          key,
          !isString$1(prev) && prev ? prev[key] : void 0,
          value
        )) {
          setStyle(style, key, value);
        }
      } else {
        setStyle(style, key, "");
      }
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    if (!isCssString || prev !== next) {
      el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    }
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name2, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name2, v));
  } else {
    if (val == null) val = "";
    if (name2.startsWith("--")) {
      if (importantRE.test(val)) {
        style.setProperty(name2, val.replace(importantRE, ""), "important");
      } else {
        style.setProperty(name2, val);
      }
    } else {
      const prefixed = autoPrefix(style, name2);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name2 = camelize$1(rawName);
  if (name2 !== "filter" && name2 in style) {
    return prefixCache[rawName] = name2;
  }
  name2 = capitalize(name2);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name2;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
  return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString$1(next) && prev === next;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean2 = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean2 ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name2, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name2, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name2, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(Once|Passive|Capture)$/;
const optionsModifierEventRE = /^on:?(?:Once|Passive|Capture)$/;
function parseName(name2) {
  let options;
  let m;
  while ((m = name2.match(optionsModifierRE)) && !optionsModifierEventRE.test(name2)) {
    if (!options) options = {};
    name2 = name2.slice(0, name2.length - m[1].length);
    options[m[1].toLowerCase()] = true;
  }
  const event = name2[2] === ":" ? name2.slice(3) : hyphenate(name2.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    const value = invoker.value;
    if (isArray$1(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      const handlers = value.slice();
      const args = [e];
      for (let i = 0; i < handlers.length; i++) {
        if (e._stopped) {
          break;
        }
        const handler = handlers[i];
        if (handler) {
          callWithAsyncErrorHandling(
            handler,
            instance,
            5,
            args
          );
        }
      }
    } else {
      callWithAsyncErrorHandling(
        value,
        instance,
        5,
        [e]
      );
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && // #12408 check if it's declared prop or it's async custom element
    (shouldSetAsPropForVueCE(el, key) || // @ts-expect-error _def is private
    el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString$1(nextValue)))
  ) {
    patchDOMProp(el, camelize$1(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction$1(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
    return false;
  }
  if (key === "sandbox" && el.tagName === "IFRAME") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString$1(value)) {
    return false;
  }
  return key in el;
}
function shouldSetAsPropForVueCE(el, key) {
  const props2 = (
    // @ts-expect-error _def is private
    el._def.props
  );
  if (!props2) {
    return false;
  }
  const camelKey = camelize$1(key);
  return Array.isArray(props2) ? props2.some((prop) => camelize$1(prop) === camelKey) : Object.keys(props2).some((prop) => camelize$1(prop) === camelKey);
}
const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const moveCbKey = /* @__PURE__ */ Symbol("_moveCb");
const enterCbKey = /* @__PURE__ */ Symbol("_enterCb");
const pendingGroups = /* @__PURE__ */ new WeakMap();
const decorate = (t2) => {
  delete t2.props.mode;
  return t2;
};
const TransitionGroupImpl = /* @__PURE__ */ decorate({
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props2, { slots }) {
    const instance = getCurrentInstance();
    const state2 = useTransitionState();
    let prevChildren;
    let children;
    let origins;
    let moves;
    const willMove = () => {
      if (moves === void 0) {
        moves = prevChildren.length > 0 && hasCSSTransform(
          prevChildren[0].el,
          instance.vnode.el,
          resolveMoveClass(props2)
        );
      }
      return moves;
    };
    onUpdated(() => {
      pendingGroups.delete(instance);
      if (!willMove()) {
        prevChildren = [];
        origins = void 0;
        return;
      }
      const moveClass = resolveMoveClass(props2);
      prevChildren.forEach(callPendingCbs);
      const shift = origins && getOriginShift(origins, instance.vnode.el);
      origins = void 0;
      prevChildren.forEach((c) => recordPosition(c, shift));
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow(instance.vnode.el);
      movedChildren.forEach((c) => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el[moveCbKey] = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || e.propertyName.endsWith("transform")) {
            el.removeEventListener("transitionend", cb);
            el[moveCbKey] = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
      prevChildren = [];
    });
    return () => {
      const rawProps = /* @__PURE__ */ toRaw(props2);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      prevChildren = [];
      moves = void 0;
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.el && child.el instanceof Element && // Hidden v-show nodes have no previous layout box to animate from.
          !child.el[vShowHidden]) {
            prevChildren.push(child);
            setTransitionHooks(
              child,
              resolveTransitionHooks(
                child,
                cssTransitionProps,
                state2,
                instance
              )
            );
            positionMap.set(child, getPosition(child.el));
          }
        }
      }
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state2, instance)
          );
        }
      }
      if (prevChildren.length) {
        origins = getOrigins(instance);
        pendingGroups.set(instance, willMove);
      }
      return createVNode(tag, null, children);
    };
  }
});
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
  const el = c.el;
  if (el[moveCbKey]) {
    el[moveCbKey]();
  }
  if (el[enterCbKey]) {
    el[enterCbKey]();
  }
}
function resolveMoveClass(props2) {
  return props2.moveClass || `${props2.name || "v"}-move`;
}
function recordPosition(c, shift) {
  newPositionMap.set(c, getPosition(c.el, shift));
}
function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const el = c.el;
    const s = el.style;
    const rect = el.getBoundingClientRect();
    let scaleX = 1;
    let scaleY = 1;
    if (el.offsetWidth) scaleX = rect.width / el.offsetWidth;
    if (el.offsetHeight) scaleY = rect.height / el.offsetHeight;
    if (!Number.isFinite(scaleX) || scaleX === 0) scaleX = 1;
    if (!Number.isFinite(scaleY) || scaleY === 0) scaleY = 1;
    if (Math.abs(scaleX - 1) < 0.01) scaleX = 1;
    if (Math.abs(scaleY - 1) < 0.01) scaleY = 1;
    s.transform = s.webkitTransform = `translate(${dx / scaleX}px,${dy / scaleY}px)`;
    s.transitionDuration = "0s";
    return c;
  }
}
function getPosition(el, shift) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left - (shift ? shift.left : 0),
    top: rect.top - (shift ? shift.top : 0)
  };
}
function getOrigins(instance) {
  let origins;
  for (let group = instance.parent; group; group = group.parent) {
    const willMove = pendingGroups.get(group);
    if (willMove) {
      const item = findItem(group.vnode.el, instance.vnode.el);
      if (item) {
        (origins || (origins = [])).push(
          extend(getPosition(item), { item, willMove })
        );
      }
    }
  }
  return origins;
}
function findItem(root, node) {
  const container = root.nodeType === 1 ? root : root.parentNode;
  while (node && node.parentNode !== container) {
    node = node.parentNode;
  }
  if (node && node.nodeType === 1) {
    return node;
  }
}
function getOriginShift(origins, root) {
  const origin = origins.find((o) => o.willMove() && o.item.contains(root));
  return origin && getPosition(origin.item, origin);
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const assignKey = /* @__PURE__ */ Symbol("_assign");
const initialValueKey = /* @__PURE__ */ Symbol("_initialValue");
function castValue(value, trim, number) {
  if (trim) value = value.trim();
  if (number) value = looseToNumber(value);
  return value;
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    if (el.parentNode) {
      if (el.type === "text") {
        el[initialValueKey] = el.defaultValue.replace(/[\r\n]/g, "");
      } else if (el.type === "textarea") {
        el[initialValueKey] = el.defaultValue.replace(/\r\n?/g, "\n");
      }
    }
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing) return;
      el[assignKey](castValue(el.value, trim, castToNumber));
    });
    if (trim || castToNumber) {
      addEventListener(el, "change", () => {
        el.value = castValue(el.value, trim, castToNumber);
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value, modifiers: { trim, number } }) {
    const newValue = value == null ? "" : value;
    const initialValue = el[initialValueKey];
    delete el[initialValueKey];
    if (initialValue !== void 0 && (el.type === "text" || el.type === "textarea") && el.value !== initialValue) {
      el[assignKey](castValue(el.value, trim, number));
    } else {
      el.value = newValue;
    }
  },
  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing) return;
    const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) {
      return;
    }
    const rootNode = el.getRootNode();
    if ((rootNode instanceof Document || rootNode instanceof ShadowRoot) && rootNode.activeElement === el && el.type !== "range") {
      if (lazy && value === oldValue) {
        return;
      }
      if (trim && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
  }
};
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  if (!fn) return fn;
  const cache = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }
    return fn(event, ...args);
  });
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  const cache = fn._withKeys || (fn._withKeys = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some(
      (k) => k === eventKey || keyNames[k] === eventKey
    )) {
      return fn(event);
    }
  });
};
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount: mount2 } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app2._component;
    if (!isFunction$1(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount2(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString$1(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
function isArray(val) {
  return Array.isArray(val);
}
function isFunction(val) {
  return typeof val === "function";
}
function isString(val) {
  return typeof val === "string";
}
function callOrReturn(fnOrValue, ...args) {
  if (isFunction(fnOrValue)) return fnOrValue(...args);
  return fnOrValue;
}
/*! js-cookie v3.0.5 | MIT */
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}
var defaultConverter = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function init(converter, defaultAttributes) {
  function set(name2, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name2 = encodeURIComponent(name2).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name2 + "=" + converter.write(value, name2) + stringifiedAttributes;
  }
  function get(name2) {
    if (typeof document === "undefined" || arguments.length && !name2) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);
        if (name2 === found) {
          break;
        }
      } catch (e) {
      }
    }
    return name2 ? jar[name2] : jar;
  }
  return Object.create(
    {
      set,
      get,
      remove: function(name2, attributes) {
        set(
          name2,
          "",
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function(attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function(converter2) {
        return init(assign({}, this.converter, converter2), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}
init(defaultConverter, { path: "/" });
function clamp(num2, min, max) {
  return Math.min(max, Math.max(min, num2));
}
function clampArrayRange(index, arr) {
  return clamp(index, 0, arr.length - 1);
}
function times(num2, fn) {
  return Array.from({ length: num2 }, (_, index) => fn(index));
}
function inBrowser() {
  return typeof window !== "undefined";
}
function getGlobalThis() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (inBrowser()) return window;
  return typeof global !== "undefined" ? global : self;
}
const { hasOwnProperty } = Object.prototype;
function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
}
function inMobile() {
  return inBrowser() && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
const objectToString = Object.prototype.toString;
function toTypeString(value) {
  return objectToString.call(value);
}
function toRawType(value) {
  return toTypeString(value).slice(8, -1);
}
function isArrayBuffer(val) {
  return toRawType(val) === "ArrayBuffer";
}
function isBoolean(val) {
  return typeof val === "boolean";
}
function isDataView(val) {
  return toRawType(val) === "DataView";
}
function isDate(val) {
  return toRawType(val) === "Date";
}
function isDOMException(val) {
  return toRawType(val) === "DOMException";
}
function isEmpty(val) {
  return val === void 0 || val === null || val === "" || isArray(val) && !val.length;
}
function isError(val) {
  return toRawType(val) === "Error";
}
function isMap(val) {
  return toRawType(val) === "Map";
}
function isObject(val) {
  return typeof val === "object" && val !== null;
}
function isPlainObject(val) {
  return toRawType(val) === "Object";
}
function isRegExp(val) {
  return toRawType(val) === "RegExp";
}
function isSet(val) {
  return toRawType(val) === "Set";
}
function isTypedArray(val) {
  return [
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array",
    "BigInt64Array",
    "BigUint64Array"
  ].includes(toRawType(val));
}
function isEqualWith(value, other, fn) {
  const valueStack = /* @__PURE__ */ new WeakMap();
  const otherStack = /* @__PURE__ */ new WeakMap();
  function baseIsEqual(value2, other2, valueStack2, otherStack2) {
    if (fn(value2, other2) === true) return true;
    if (value2 === other2) return true;
    if (value2 !== value2 && other2 !== other2) return true;
    if (!isObject(value2) || !isObject(other2)) return value2 === other2;
    if (value2.constructor !== other2.constructor) return false;
    if (toRawType(value2) === "String" && toRawType(other2) === "String" || toRawType(value2) === "Number" && toRawType(other2) === "Number" || toRawType(value2) === "Boolean" && toRawType(other2) === "Boolean" || toRawType(value2) === "BigInt" && toRawType(other2) === "BigInt" || toRawType(value2) === "Symbol" && toRawType(other2) === "Symbol") return value2.valueOf() === other2.valueOf();
    if (isDate(value2) && isDate(other2)) return value2.getTime() === other2.getTime();
    if (isRegExp(value2) && isRegExp(other2)) return value2.source === other2.source && value2.flags === other2.flags;
    if (isError(value2) && isError(other2)) return value2.name === other2.name && value2.message === other2.message && value2.cause === other2.cause;
    if (isDOMException(value2) && isDOMException(other2)) return value2.name === other2.name && value2.message === other2.message;
    if (isTypedArray(value2) && isTypedArray(other2) || isDataView(value2) && isDataView(other2)) {
      if (value2.byteLength !== other2.byteLength) return false;
      const valueTypedArray = new Uint8Array(value2.buffer);
      const otherTypedArray = new Uint8Array(other2.buffer);
      return valueTypedArray.every((v, i) => v === otherTypedArray[i]);
    }
    if (isArrayBuffer(value2) && isArrayBuffer(other2)) {
      if (value2.byteLength !== other2.byteLength) return false;
      const valueTypedArray = new Uint8Array(value2);
      const otherTypedArray = new Uint8Array(other2);
      return valueTypedArray.every((v, i) => v === otherTypedArray[i]);
    }
    if (valueStack2.get(value2) === other2 && otherStack2.get(other2) === value2) return true;
    valueStack2.set(value2, other2);
    otherStack2.set(other2, value2);
    if (isMap(value2) && isMap(other2) || isSet(value2) && isSet(other2)) {
      if (value2.size !== other2.size) return false;
      const valueArray = [...value2];
      const otherArray = [...other2];
      const result = valueArray.every((v, i) => baseIsEqual(v, otherArray[i], valueStack2, otherStack2));
      valueStack2.delete(value2);
      otherStack2.delete(other2);
      return result;
    }
    if (isArray(value2) && isArray(other2)) {
      if (value2.length !== other2.length) return false;
      const result = value2.every((v, i) => baseIsEqual(v, other2[i], valueStack2, otherStack2));
      valueStack2.delete(value2);
      otherStack2.delete(other2);
      return result;
    }
    if (isPlainObject(value2) && isPlainObject(other2)) {
      const valueOwnKeys = [...Object.keys(value2), ...Object.getOwnPropertySymbols(value2)];
      const otherOwnKeys = [...Object.keys(other2), ...Object.getOwnPropertySymbols(other2)];
      if (valueOwnKeys.length !== otherOwnKeys.length) return false;
      const result = valueOwnKeys.every((k) => baseIsEqual(value2[k], other2[k], valueStack2, otherStack2));
      valueStack2.delete(value2);
      otherStack2.delete(other2);
      return result;
    }
    return false;
  }
  return baseIsEqual(value, other, valueStack, otherStack);
}
function isEqual(value, other) {
  return isEqualWith(value, other, () => void 0);
}
function isNumber(val) {
  return typeof val === "number";
}
function isNumeric(val) {
  return isNumber(val) || isString(val) && /^[-+]?\d+$/.test(val);
}
function isTruthy(v) {
  return Boolean(v);
}
function isWindow(val) {
  return val === window;
}
function supportTouch() {
  return inBrowser() && "ontouchstart" in window;
}
function assert$1(condition, message) {
  if (!condition) throw new Error(message);
}
function toNumber(val) {
  if (val == null) return 0;
  if (isString(val)) {
    val = parseFloat(val);
    val = Number.isNaN(val) ? 0 : val;
    return val;
  }
  if (isBoolean(val)) return Number(val);
  return val;
}
function removeItem(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) return arr.splice(index, 1);
  }
}
function uniq(arr) {
  return [...new Set(arr)];
}
function find(arr, fn, from = "start") {
  let i = from === "start" ? 0 : arr.length - 1;
  while (arr.length > 0 && i >= 0 && i <= arr.length - 1) {
    if (fn(arr[i], i, arr)) return [arr[i], i];
    from === "start" ? i++ : i--;
  }
  return [null, -1];
}
function removeArrayBlank(arr) {
  return arr.filter((item) => item != null);
}
function normalizeToArray(value) {
  return isArray(value) ? value : [value];
}
function cancelAnimationFrame(handle) {
  const globalThis2 = getGlobalThis();
  globalThis2.cancelAnimationFrame ? globalThis2.cancelAnimationFrame(handle) : globalThis2.clearTimeout(handle);
}
function classes$9(...classes2) {
  return classes2.map((className) => {
    if (isArray(className)) {
      const [condition, truthy, falsy = null] = className;
      return condition ? truthy : falsy;
    }
    return className;
  });
}
function camelize(s) {
  s = s.replace(/[-_](\w)/g, (_, p2) => p2.toUpperCase());
  return s.replace(s.charAt(0), s.charAt(0).toLowerCase());
}
function kebabCase(s) {
  return s.replace(/([A-Z])/g, " $1").replace(/[_\s]+/g, "-").trim().replace(/^-/, "").toLowerCase();
}
function pascalCase(s) {
  const ret = camelize(s);
  return ret.replace(ret.charAt(0), ret.charAt(0).toUpperCase());
}
function createNamespaceFn(namespace) {
  return (name2) => {
    const componentName = `${namespace}-${name2}`;
    const createBEM = (suffix) => {
      if (!suffix) return componentName;
      if (suffix[0] === "$") return suffix.replace("$", namespace);
      return suffix.startsWith("--") ? `${componentName}${suffix}` : `${componentName}__${suffix}`;
    };
    return {
      name: pascalCase(componentName),
      n: createBEM,
      classes: classes$9
    };
  };
}
function requestAnimationFrame$1(fn) {
  const globalThis2 = getGlobalThis();
  return globalThis2.requestAnimationFrame ? globalThis2.requestAnimationFrame(fn) : globalThis2.setTimeout(fn);
}
function doubleRaf() {
  return new Promise((resolve2) => {
    requestAnimationFrame$1(() => {
      requestAnimationFrame$1(resolve2);
    });
  });
}
function getStyle$1(element) {
  return window.getComputedStyle(element);
}
function getRect(element) {
  if (isWindow(element)) {
    const width = element.innerWidth;
    const height = element.innerHeight;
    const rect = {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      width,
      height
    };
    return {
      ...rect,
      toJSON: () => rect
    };
  }
  return element.getBoundingClientRect();
}
function getScrollLeft(element) {
  const left = "scrollLeft" in element ? element.scrollLeft : element.scrollX;
  return Math.max(left, 0);
}
function getScrollTop(element) {
  const top = "scrollTop" in element ? element.scrollTop : element.scrollY;
  return Math.max(top, 0);
}
function inViewport(element) {
  const { top, bottom, left, right } = getRect(element);
  const { width, height } = getRect(window);
  return left <= width && right >= 0 && top <= height && bottom >= 0;
}
function preventDefault(event) {
  if (event.cancelable === false) return;
  event.preventDefault();
}
function raf() {
  return new Promise((resolve2) => {
    requestAnimationFrame$1(resolve2);
  });
}
function createStorage(storage2) {
  return {
    ...storage2,
    set(key, value) {
      if (value == null) return;
      if (!isString(value)) value = JSON.stringify(value);
      storage2.setItem(key, value);
    },
    get(key) {
      const data = storage2.getItem(key);
      try {
        return JSON.parse(data);
      } catch (err) {
        return data;
      }
    },
    remove(key) {
      storage2.removeItem(key);
    }
  };
}
createStorage(getGlobalThis().sessionStorage);
createStorage(getGlobalThis().localStorage);
function call(fn, ...args) {
  if (isArray(fn)) return fn.map((f) => f(...args));
  if (fn) return fn(...args);
}
function throttle(fn, delay = 200) {
  let timer;
  let start = 0;
  return function loop(...args) {
    const now2 = performance.now();
    const elapsed = now2 - start;
    if (!start) start = now2;
    if (timer) clearTimeout(timer);
    if (elapsed >= delay) {
      fn.apply(this, args);
      start = now2;
    } else timer = setTimeout(() => {
      loop.apply(this, args);
    }, delay - elapsed);
  };
}
function enumOf(config) {
  const extractValues = Object.entries(config).reduce((result, [key, value]) => {
    result[key] = isPlainObject(value) ? value.value : value;
    return result;
  }, {});
  const configValues = Object.values(config);
  function label(v) {
    const valueObject = getValueObject(v);
    return (valueObject == null ? void 0 : valueObject.label) ? callOrReturn(valueObject.label) : "";
  }
  function description(v) {
    const valueObject = getValueObject(v);
    return (valueObject == null ? void 0 : valueObject.description) ? callOrReturn(valueObject.description) : "";
  }
  function values() {
    return configValues.map((option2) => isPlainObject(option2) ? option2.value : option2);
  }
  function labels() {
    return configValues.map((option2) => {
      if (isPlainObject(option2)) return option2.label ? callOrReturn(option2.label) : "";
      return "";
    });
  }
  function descriptions() {
    return configValues.map((option2) => {
      if (isPlainObject(option2)) return option2.description ? callOrReturn(option2.description) : "";
      return "";
    });
  }
  function resolveOption(option2) {
    const result = {};
    for (const key of Object.keys(option2)) result[key] = callOrReturn(option2[key]);
    return result;
  }
  function option(v) {
    const valueObject = getValueObject(v);
    if (valueObject) return resolveOption(valueObject);
    return {
      value: v,
      label: "",
      description: ""
    };
  }
  function options() {
    return configValues.map((option2) => {
      if (isPlainObject(option2)) return resolveOption(option2);
      return {
        value: option2,
        label: "",
        description: ""
      };
    });
  }
  function getValueObject(v) {
    return configValues.find((option2) => isPlainObject(option2) && option2.value === v);
  }
  return {
    ...extractValues,
    values,
    label,
    description,
    labels,
    descriptions,
    option,
    options
  };
}
function motion(options) {
  const { from, to, duration = 300, frame = () => {
  }, timingFunction = (value2) => value2, onStateChange = () => {
  } } = options;
  let state2 = "pending";
  let value = from;
  const distance = to - from;
  let ticker = void 0;
  let startTime = void 0;
  let pausedTime = void 0;
  let sleepTime = 0;
  function start() {
    if (state2 === "running" || state2 === "finished") return;
    setState("running");
    const now2 = performance.now();
    startTime = startTime != null ? startTime : now2;
    sleepTime += pausedTime != null ? now2 - pausedTime : 0;
    pausedTime = void 0;
    tick();
    function tick() {
      ticker = requestAnimationFrame$1(() => {
        const progress = clamp((performance.now() - startTime - sleepTime) / duration, 0, 1);
        value = distance * timingFunction(progress) + from;
        if (progress >= 1) {
          setState("finished");
          frame({
            value: to,
            done: true
          });
          return;
        }
        frame({
          value,
          done: false
        });
        tick();
      });
    }
  }
  function pause() {
    if (state2 !== "running") return;
    cancelAnimationFrame(ticker);
    setState("paused");
    pausedTime = performance.now();
  }
  function reset() {
    cancelAnimationFrame(ticker);
    setState("pending");
    value = from;
    ticker = void 0;
    startTime = void 0;
    pausedTime = void 0;
    sleepTime = 0;
  }
  function getState() {
    return state2;
  }
  function setState(_state) {
    state2 = _state;
    onStateChange(_state);
  }
  return {
    start,
    pause,
    reset,
    getState
  };
}
function toDataURL(file) {
  return new Promise((resolve2) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve2(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  });
}
function baseRound(val, precision, fn) {
  precision = clamp(precision != null ? precision : 0, -292, 292);
  if (!precision) return fn(val);
  const [base, exponent = "0"] = `${val}`.split("e");
  const [roundedBase, roundedExponent = "0"] = `${fn(+`${base}e${+exponent + precision}`)}`.split("e");
  return +`${roundedBase}e${+roundedExponent - precision}`;
}
function floor(val, precision = 0) {
  return baseRound(val, precision, Math.floor);
}
function assert(condition, source, message) {
  return assert$1(condition, `Varlet [${source}]: ${message}`);
}
function warn(source, message) {
  console.warn(`Varlet [${source}]: ${message}`);
}
function error(source, message) {
  console.error(`Varlet [${source}]: ${message}`);
}
const isURL = (val) => {
  if (!val) return false;
  return /^(http)|(\.*\/)/.test(val);
};
function onSmartMounted(hook) {
  let isMounted = false;
  onMounted(() => {
    hook();
    nextTick(() => {
      isMounted = true;
    });
  });
  onActivated(() => {
    if (!isMounted) return;
    hook();
  });
}
function useEventListener(target, type, listener, options = {}) {
  if (!inBrowser()) return;
  const { passive = false, capture = false } = options;
  let listening = false;
  let cleaned = false;
  const getElement = (target2) => isFunction(target2) ? target2() : unref(target2);
  const add2 = (target2) => {
    if (listening || cleaned) return;
    const element = getElement(target2);
    if (element) {
      element.addEventListener(type, listener, {
        passive,
        capture
      });
      listening = true;
    }
  };
  const remove2 = (target2) => {
    if (!listening || cleaned) return;
    const element = getElement(target2);
    if (element) {
      element.removeEventListener(type, listener, { capture });
      listening = false;
    }
  };
  let watchStopHandle;
  if (/* @__PURE__ */ isRef(target)) watchStopHandle = watch(() => target.value, (newValue, oldValue) => {
    remove2(oldValue);
    add2(newValue);
  });
  const cleanup = () => {
    watchStopHandle == null ? void 0 : watchStopHandle();
    remove2(target);
    cleaned = true;
  };
  onSmartMounted(() => {
    add2(target);
  });
  onBeforeUnmount(() => {
    remove2(target);
  });
  onDeactivated(() => {
    remove2(target);
  });
  return cleanup;
}
function useClickOutside(target, type, listener) {
  if (!inBrowser()) return;
  const handler = (event) => {
    const element = isFunction(target) ? target() : unref(target);
    if (element && !element.contains(event.target)) listener(event);
  };
  useEventListener(document, type, handler);
}
function onSmartUnmounted(hook) {
  let keepalive = false;
  onDeactivated(() => {
    keepalive = true;
    hook();
  });
  onUnmounted(() => {
    if (keepalive) return;
    hook();
  });
}
function keyInProvides(key) {
  return key in getCurrentInstance().provides;
}
function useParent(key) {
  if (!keyInProvides(key)) return {
    index: null,
    parentProvider: null,
    bindParent: null
  };
  const { childInstances, collect, clear, ...parentProvider } = inject(key);
  const childInstance = getCurrentInstance();
  const index = computed(() => childInstances.indexOf(childInstance));
  const bindParent = (childProvider) => {
    onMounted(() => {
      nextTick().then(() => {
        collect(childInstance, childProvider);
      });
    });
    onBeforeUnmount(() => {
      nextTick().then(() => {
        clear(childInstance, childProvider);
      });
    });
  };
  return {
    index,
    parentProvider,
    bindParent
  };
}
function flatVNodes(subTree) {
  const vNodes = [];
  const flat = (subTree2) => {
    if (subTree2 == null ? void 0 : subTree2.component) {
      flat(subTree2 == null ? void 0 : subTree2.component.subTree);
      return;
    }
    if (isArray(subTree2 == null ? void 0 : subTree2.children)) subTree2.children.forEach((child) => {
      if (isVNode(child)) {
        vNodes.push(child);
        flat(child);
      }
    });
  };
  flat(subTree);
  return vNodes;
}
function useChildren(key) {
  const parentInstance = getCurrentInstance();
  const childInstances = /* @__PURE__ */ reactive([]);
  const childProviders = [];
  const length = computed(() => childInstances.length);
  const sortInstances = () => {
    const vNodes = flatVNodes(parentInstance.subTree);
    const pairs = childInstances.map((instance, index) => ({
      instance,
      provider: childProviders[index]
    }));
    const getVNodeIndex = (instance) => {
      const index = vNodes.indexOf(instance.vnode);
      return index === -1 ? Number.MAX_SAFE_INTEGER : index;
    };
    pairs.sort((a, b) => getVNodeIndex(a.instance) - getVNodeIndex(b.instance));
    childInstances.splice(0, childInstances.length, ...pairs.map(({ instance }) => instance));
    childProviders.splice(0, childProviders.length, ...pairs.map(({ provider }) => provider));
  };
  const collect = (childInstance, childProvider) => {
    childInstances.push(childInstance);
    childProviders.push(childProvider);
    sortInstances();
  };
  const clear = (childInstance, childProvider) => {
    removeItem(childInstances, childInstance);
    removeItem(childProviders, childProvider);
  };
  const bindChildren = (parentProvider) => {
    provide(key, {
      childInstances,
      collect,
      clear,
      ...parentProvider
    });
  };
  onUpdated(sortInstances);
  return {
    length,
    childInstances,
    childProviders,
    bindChildren
  };
}
function onWindowResize(listener) {
  useEventListener(() => window, "resize", listener, { passive: true });
  useEventListener(() => window, "orientationchange", listener, { passive: true });
}
function useInitialized(source, value) {
  const initialized = /* @__PURE__ */ ref(false);
  watch(source, (newValue) => {
    if (value === newValue) initialized.value = true;
  }, { immediate: true });
  return initialized;
}
function getDirection(x, y) {
  if (x > y) return "horizontal";
  if (y > x) return "vertical";
}
function useTouch() {
  const startX = /* @__PURE__ */ ref(0);
  const startY = /* @__PURE__ */ ref(0);
  const deltaX = /* @__PURE__ */ ref(0);
  const deltaY = /* @__PURE__ */ ref(0);
  const offsetX = /* @__PURE__ */ ref(0);
  const offsetY = /* @__PURE__ */ ref(0);
  const prevX = /* @__PURE__ */ ref(0);
  const prevY = /* @__PURE__ */ ref(0);
  const moveX = /* @__PURE__ */ ref(0);
  const moveY = /* @__PURE__ */ ref(0);
  const direction = /* @__PURE__ */ ref();
  const touching = /* @__PURE__ */ ref(false);
  const dragging = /* @__PURE__ */ ref(false);
  const startTime = /* @__PURE__ */ ref(0);
  const distance = /* @__PURE__ */ ref(0);
  let draggingAnimationFrame = null;
  const resetTouch = () => {
    startX.value = 0;
    startY.value = 0;
    deltaX.value = 0;
    deltaY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
    prevX.value = 0;
    prevY.value = 0;
    moveX.value = 0;
    moveY.value = 0;
    direction.value = void 0;
    touching.value = false;
    dragging.value = false;
    startTime.value = 0;
    distance.value = 0;
  };
  const startTouch = (event) => {
    resetTouch();
    const { clientX: x, clientY: y } = event.touches[0];
    startX.value = x;
    startY.value = y;
    prevX.value = x;
    prevY.value = y;
    touching.value = true;
    startTime.value = performance.now();
    dragging.value = false;
    if (draggingAnimationFrame) window.cancelAnimationFrame(draggingAnimationFrame);
  };
  const moveTouch = (event) => {
    const { clientX: x, clientY: y } = event.touches[0];
    dragging.value = true;
    deltaX.value = x - startX.value;
    deltaY.value = y - startY.value;
    offsetX.value = Math.abs(deltaX.value);
    offsetY.value = Math.abs(deltaY.value);
    distance.value = Math.sqrt(offsetX.value ** 2 + offsetY.value ** 2);
    moveX.value = x - prevX.value;
    moveY.value = y - prevY.value;
    if (!direction.value) direction.value = getDirection(offsetX.value, offsetY.value);
    prevX.value = x;
    prevY.value = y;
  };
  const endTouch = () => {
    touching.value = false;
    draggingAnimationFrame = window.requestAnimationFrame(() => {
      dragging.value = false;
    });
  };
  const isReachTop = (element) => {
    return getScrollTop(element) === 0 && deltaY.value > 0;
  };
  const isReachBottom = (element, offset = 1) => {
    const { scrollHeight, clientHeight, scrollTop } = element;
    const offsetBottom = Math.abs(scrollHeight - scrollTop - clientHeight);
    return deltaY.value < 0 && offsetBottom <= offset;
  };
  return {
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    prevX,
    prevY,
    moveX,
    moveY,
    direction,
    touching,
    dragging,
    startTime,
    distance,
    resetTouch,
    startTouch,
    moveTouch,
    endTouch,
    isReachTop,
    isReachBottom
  };
}
function useClientId() {
  const instance = getCurrentInstance();
  const name2 = kebabCase(instance.type.name);
  const id = /* @__PURE__ */ ref(void 0);
  onMounted(() => {
    id.value = `${name2}-${instance.uid}`;
  });
  return id;
}
function useWindowSize(options = {}) {
  const { initialWidth = 0, initialHeight = 0 } = options;
  const width = /* @__PURE__ */ ref(initialWidth);
  const height = /* @__PURE__ */ ref(initialHeight);
  const update = () => {
    if (!inBrowser()) return;
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };
  onSmartMounted(update);
  onWindowResize(update);
  return {
    width,
    height
  };
}
function useVModel(props2, key, options = {}) {
  const { passive = true, eventName, defaultValue, emit: emit2 } = options;
  const event = eventName != null ? eventName : `onUpdate:${key.toString()}`;
  const getValue = () => {
    var _a;
    return (_a = props2[key]) != null ? _a : defaultValue;
  };
  if (!passive) return computed({
    get() {
      return getValue();
    },
    set(value) {
      emit2 ? emit2(event, value) : call(props2[event], value);
    }
  });
  const proxy = /* @__PURE__ */ ref(getValue());
  let shouldEmit = true;
  watch(() => props2[key], () => {
    shouldEmit = false;
    proxy.value = getValue();
    nextTick(() => {
      shouldEmit = true;
    });
  });
  watch(() => proxy.value, (newValue) => {
    if (!shouldEmit) return;
    emit2 ? emit2(event, newValue) : call(props2[event], newValue);
  });
  return proxy;
}
function useMotion(options) {
  const value = /* @__PURE__ */ ref(getter(options.from));
  const state2 = /* @__PURE__ */ ref("pending");
  let ctx = createMotionContext();
  function getter(value2) {
    return isFunction(value2) ? value2() : value2;
  }
  function reset() {
    ctx.reset();
    value.value = getter(options.from);
    state2.value = "pending";
    ctx = createMotionContext();
  }
  function start() {
    ctx.start();
  }
  function pause() {
    ctx.pause();
  }
  function createMotionContext() {
    return motion({
      from: getter(options.from),
      to: getter(options.to),
      duration: options.duration ? getter(options.duration) : 300,
      timingFunction: options.timingFunction,
      onStateChange(newState) {
        state2.value = newState;
      },
      frame({ value: newValue, done }) {
        var _a;
        value.value = newValue;
        if (done) (_a = options.onFinished) == null ? void 0 : _a.call(options, value.value);
      }
    });
  }
  return {
    value,
    state: state2,
    start,
    pause,
    reset
  };
}
function useResizeObserver(target, callback) {
  if (!inBrowser() || typeof ResizeObserver === "undefined") return;
  let observer;
  let observedElement;
  let cleaned = false;
  const getElement = (target2) => isFunction(target2) ? target2() : unref(target2);
  const observe = (target2) => {
    if (cleaned) return;
    const element = getElement(target2);
    if (!element || element === observedElement) return;
    unobserve();
    observer = new ResizeObserver(callback);
    observer.observe(element);
    observedElement = element;
  };
  const unobserve = () => {
    observer == null ? void 0 : observer.disconnect();
    observer = void 0;
    observedElement = void 0;
  };
  let watchStopHandle;
  if (/* @__PURE__ */ isRef(target)) watchStopHandle = watch(() => target.value, () => observe(target));
  const cleanup = () => {
    watchStopHandle == null ? void 0 : watchStopHandle();
    unobserve();
    cleaned = true;
  };
  onSmartMounted(() => observe(target));
  onBeforeUnmount(unobserve);
  onDeactivated(unobserve);
  return cleanup;
}
var __defProp$9 = Object.defineProperty;
var __defProps$6 = Object.defineProperties;
var __getOwnPropDescs$6 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$9 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$9.call(b, prop))
      __defNormalProp$9(a, prop, b[prop]);
  if (__getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(b)) {
      if (__propIsEnum$9.call(b, prop))
        __defNormalProp$9(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$6 = (a, b) => __defProps$6(a, __getOwnPropDescs$6(b));
var __async$2 = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function pickProps(props2, propsKey) {
  return isArray(propsKey) ? propsKey.reduce((pickedProps, key) => {
    pickedProps[key] = props2[key];
    return pickedProps;
  }, {}) : props2[propsKey];
}
function withInstall(component, target) {
  const componentWithInstall = target != null ? target : component;
  componentWithInstall.install = function(app2) {
    const { name: name2 } = component;
    if (name2) {
      app2.component(name2, component);
    }
  };
  return componentWithInstall;
}
function withPropsDefaultsSetter(target, props2) {
  target.setPropsDefaults = function(defaults) {
    Object.entries(defaults).forEach(([key, value]) => {
      const prop = props2[key];
      if (prop == null) {
        return;
      }
      if (isPlainObject(prop)) {
        props2[key] = __spreadProps$6(__spreadValues$9({}, prop), {
          default: value
        });
        return;
      }
      props2[key] = {
        type: prop,
        default: value
      };
    });
  };
}
function mount(component) {
  const app2 = createApp(component);
  const host = document.createElement("div");
  document.body.appendChild(host);
  return {
    instance: app2.mount(host),
    unmount() {
      app2.unmount();
      if (host.parentNode) {
        document.body.removeChild(host);
      }
    }
  };
}
function mountInstance(component, props2 = {}, eventListener = {}) {
  const Host = {
    setup() {
      return () => h(component, __spreadValues$9(__spreadValues$9({}, props2), eventListener));
    }
  };
  const { unmount } = mount(Host);
  return { unmountInstance: unmount };
}
function flatFragment(vNodes) {
  const result = [];
  vNodes.forEach((vNode) => {
    if (vNode.type === Comment) {
      return;
    }
    if (vNode.type === Fragment && isArray(vNode.children)) {
      result.push(...flatFragment(vNode.children));
      return;
    }
    result.push(vNode);
  });
  return result;
}
function isZodRule(rule) {
  return isPlainObject(rule) && isFunction(rule.safeParseAsync);
}
function isZodResult(result) {
  return isPlainObject(result) && hasOwn(result, "success");
}
function useValidation() {
  const errorMessage = /* @__PURE__ */ ref("");
  const validate = (ruleOrRules, value, apis) => __async$2(null, null, function* () {
    const rules = normalizeToArray(ruleOrRules).filter((rule) => isZodRule(rule) || isFunction(rule));
    const results = yield Promise.all(
      rules.map((rule) => isZodRule(rule) ? rule.safeParseAsync(value) : rule(value, apis))
    );
    resetValidation();
    return !results.some((result) => {
      if (isZodResult(result)) {
        if (result.success === false) {
          errorMessage.value = result.error.issues[0].message;
          return true;
        }
      } else if (result !== true) {
        errorMessage.value = String(result);
        return true;
      }
      return false;
    });
  });
  const resetValidation = () => {
    errorMessage.value = "";
  };
  const validateWithTrigger = (validateTrigger, trigger2, rules, value, apis) => __async$2(null, null, function* () {
    if (validateTrigger.includes(trigger2)) {
      (yield validate(rules, value, apis)) && (errorMessage.value = "");
    }
  });
  return {
    errorMessage,
    validate,
    resetValidation,
    validateWithTrigger
  };
}
function useRouteListener(listener) {
  useEventListener(() => window, "hashchange", listener);
  useEventListener(() => window, "popstate", listener);
}
function useTeleport() {
  const disabled = /* @__PURE__ */ ref(false);
  onActivated(() => {
    disabled.value = false;
  });
  onDeactivated(() => {
    disabled.value = true;
  });
  return {
    disabled
  };
}
const createNamespace = createNamespaceFn("var");
function defineListenerProp(fallback) {
  return {
    type: [Function, Array],
    default: fallback
  };
}
function formatElevation(elevation, defaultLevel) {
  if (elevation === false) {
    return null;
  }
  if (elevation === true && defaultLevel) {
    elevation = defaultLevel;
  }
  return `var-elevation--${elevation}`;
}
const MaybeVNode = /* @__PURE__ */ defineComponent({
  props: {
    is: {
      type: [String, Number, Boolean, Object, Array]
    },
    tag: {
      type: String,
      default: "span"
    }
  },
  setup(props2) {
    return () => isString(props2.is) ? h(props2.tag, props2.is) : props2.is;
  }
});
var stdin_default$n = {
  // Dialog
  dialogTitle: "提示",
  dialogConfirmButtonText: "确认",
  dialogCancelButtonText: "取消",
  // ActionSheet
  actionSheetTitle: "请选择",
  // List
  listLoadingText: "加载中",
  listFinishedText: "没有更多了",
  listErrorText: "加载失败",
  // Picker
  pickerTitle: "请选择",
  pickerConfirmButtonText: "确认",
  pickerCancelButtonText: "取消",
  // date-picker
  datePickerMonthDict: {
    "01": {
      name: "一月",
      abbr: "一月"
    },
    "02": {
      name: "二月",
      abbr: "二月"
    },
    "03": {
      name: "三月",
      abbr: "三月"
    },
    "04": {
      name: "四月",
      abbr: "四月"
    },
    "05": {
      name: "五月",
      abbr: "五月"
    },
    "06": {
      name: "六月",
      abbr: "六月"
    },
    "07": {
      name: "七月",
      abbr: "七月"
    },
    "08": {
      name: "八月",
      abbr: "八月"
    },
    "09": {
      name: "九月",
      abbr: "九月"
    },
    "10": {
      name: "十月",
      abbr: "十月"
    },
    "11": {
      name: "十一月",
      abbr: "十一月"
    },
    "12": {
      name: "十二月",
      abbr: "十二月"
    }
  },
  datePickerWeekDict: {
    "0": {
      name: "星期日",
      abbr: "日"
    },
    "1": {
      name: "星期一",
      abbr: "一"
    },
    "2": {
      name: "星期二",
      abbr: "二"
    },
    "3": {
      name: "星期三",
      abbr: "三"
    },
    "4": {
      name: "星期四",
      abbr: "四"
    },
    "5": {
      name: "星期五",
      abbr: "五"
    },
    "6": {
      name: "星期六",
      abbr: "六"
    }
  },
  datePickerSelected: "个被选择",
  datePickerHint: "选择日期",
  datePickerYearHint: "选择年份",
  datePickerMonthHint: "选择月份",
  // pagination
  paginationItem: "条",
  paginationPage: "页",
  paginationJump: "前往",
  // time-picker
  timePickerHint: "选择时间",
  // select
  selectEmptyText: "暂无数据",
  // data-table
  dataTableEmptyText: "暂无数据"
};
var __defProp$8 = Object.defineProperty;
var __getOwnPropSymbols$8 = Object.getOwnPropertySymbols;
var __hasOwnProp$8 = Object.prototype.hasOwnProperty;
var __propIsEnum$8 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$8 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$8.call(b, prop))
      __defNormalProp$8(a, prop, b[prop]);
  if (__getOwnPropSymbols$8)
    for (var prop of __getOwnPropSymbols$8(b)) {
      if (__propIsEnum$8.call(b, prop))
        __defNormalProp$8(a, prop, b[prop]);
    }
  return a;
};
function useLocale() {
  const messages2 = /* @__PURE__ */ ref({});
  const currentMessage2 = /* @__PURE__ */ ref({});
  const add2 = (lang, message) => {
    message.lang = lang;
    messages2.value[lang] = message;
  };
  const use2 = (lang) => {
    if (!messages2.value[lang]) {
      console.warn(`The ${lang} does not exist. You can mount a language message using the add method`);
      return {};
    }
    currentMessage2.value = messages2.value[lang];
  };
  const merge2 = (lang, message) => {
    if (!messages2.value[lang]) {
      console.warn(`The ${lang} does not exist. You can mount a language message using the add method`);
      return;
    }
    messages2.value[lang] = __spreadValues$8(__spreadValues$8({}, messages2.value[lang]), message);
    use2(lang);
  };
  const t2 = (id) => {
    if (hasOwn(currentMessage2.value, id)) {
      return currentMessage2.value[id];
    }
  };
  return {
    messages: messages2,
    currentMessage: currentMessage2,
    add: add2,
    use: use2,
    merge: merge2,
    t: t2
  };
}
const { add, use, t } = useLocale();
add("zh-CN", stdin_default$n);
use("zh-CN");
const LOCALE_PROVIDER_KEY = /* @__PURE__ */ Symbol("LOCALE_PROVIDER_KEY");
function provideLocaleProvider(localeProvider) {
  provide(LOCALE_PROVIDER_KEY, localeProvider);
}
function injectLocaleProvider() {
  if (!keyInProvides(LOCALE_PROVIDER_KEY)) {
    return { t: null };
  }
  return inject(LOCALE_PROVIDER_KEY);
}
const context = {
  locks: {},
  zIndex: 2e3,
  enableRipple: true
};
var stdin_default$m = /* @__PURE__ */ reactive(context);
const { n: n$b } = createNamespace("");
function resolveLock() {
  const lockCounts = Object.keys(stdin_default$m.locks).length;
  lockCounts <= 0 ? document.body.classList.remove(n$b("$--lock")) : document.body.classList.add(n$b("$--lock"));
}
function addLock(uid2) {
  stdin_default$m.locks[uid2] = 1;
  resolveLock();
}
function releaseLock(uid2) {
  delete stdin_default$m.locks[uid2];
  resolveLock();
}
function useLock(source, useSource) {
  const { uid: uid2 } = getCurrentInstance();
  if (useSource) {
    watch(useSource, (newValue) => {
      if (newValue === false) {
        releaseLock(uid2);
      } else if (newValue === true && source() === true) {
        addLock(uid2);
      }
    });
  }
  watch(source, (newValue) => {
    if (useSource && useSource() === false) {
      return;
    }
    if (newValue === true) {
      addLock(uid2);
    } else {
      releaseLock(uid2);
    }
  });
  onBeforeMount(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      addLock(uid2);
    }
  });
  onUnmounted(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      releaseLock(uid2);
    }
  });
  onActivated(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      addLock(uid2);
    }
  });
  onDeactivated(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      releaseLock(uid2);
    }
  });
}
const stack = [];
function useStack(activeGetter, zIndex) {
  const { uid: uid2 } = getCurrentInstance();
  watch(activeGetter, (isActive) => {
    if (isActive && !getStackItem(uid2)) {
      pushStackItem();
    } else {
      setTimeout(() => {
        removeItem(stack, getStackItem(uid2));
      });
    }
  });
  onSmartMounted(() => {
    if (activeGetter()) {
      pushStackItem();
    }
  });
  onSmartUnmounted(() => {
    removeItem(stack, getStackItem(uid2));
  });
  function onStackTop() {
    if (stack.length === 0) {
      return true;
    }
    stack.sort((a, b) => a.zIndex.value - b.zIndex.value);
    return stack[stack.length - 1].uid === uid2;
  }
  function pushStackItem() {
    if (getStackItem(uid2)) {
      return;
    }
    stack.push({ uid: uid2, zIndex });
  }
  function getStackItem(uid22) {
    return stack.find((item) => item.uid === uid22);
  }
  return {
    onStackTop
  };
}
function useZIndex(source, count) {
  const zIndex = /* @__PURE__ */ ref(stdin_default$m.zIndex);
  watch(
    source,
    (newValue) => {
      if (newValue) {
        stdin_default$m.zIndex += count;
        zIndex.value = stdin_default$m.zIndex;
      }
    },
    { immediate: true }
  );
  return { zIndex };
}
const props$9 = {
  show: Boolean,
  position: {
    type: String,
    default: "center"
  },
  transition: String,
  overlay: {
    type: Boolean,
    default: true
  },
  overlayClass: String,
  overlayStyle: Object,
  lockScroll: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  closeOnKeyEscape: {
    type: Boolean,
    default: true
  },
  defaultStyle: {
    type: Boolean,
    default: true
  },
  zIndex: Number,
  safeArea: Boolean,
  safeAreaTop: Boolean,
  teleport: {
    type: [String, Object, Boolean],
    default: "body"
  },
  onOpen: defineListenerProp(),
  onOpened: defineListenerProp(),
  onClose: defineListenerProp(),
  onClosed: defineListenerProp(),
  onKeyEscape: defineListenerProp(),
  onClickOverlay: defineListenerProp(),
  "onUpdate:show": defineListenerProp(),
  // internal for Dialog
  onRouteChange: defineListenerProp()
};
const POPUP_BIND_POPUP_ITEM_KEY = /* @__PURE__ */ Symbol("POPUP_BIND_POPUP_ITEM_KEY");
function usePopup() {
  const { bindParent, parentProvider, index } = useParent(POPUP_BIND_POPUP_ITEM_KEY);
  return {
    index,
    popup: parentProvider,
    bindPopup: bindParent
  };
}
function usePopupItems() {
  const { bindChildren, childProviders, length } = useChildren(POPUP_BIND_POPUP_ITEM_KEY);
  return {
    length,
    popupItems: childProviders,
    bindPopupItems: bindChildren
  };
}
var __defProp$7 = Object.defineProperty;
var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols;
var __hasOwnProp$7 = Object.prototype.hasOwnProperty;
var __propIsEnum$7 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$7 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$7.call(b, prop))
      __defNormalProp$7(a, prop, b[prop]);
  if (__getOwnPropSymbols$7)
    for (var prop of __getOwnPropSymbols$7(b)) {
      if (__propIsEnum$7.call(b, prop))
        __defNormalProp$7(a, prop, b[prop]);
    }
  return a;
};
const {
  name: name$9,
  n: n$a,
  classes: classes$8
} = createNamespace("popup");
var stdin_default$l = /* @__PURE__ */ defineComponent({
  name: name$9,
  inheritAttrs: false,
  props: props$9,
  setup(props2, {
    slots,
    attrs
  }) {
    const rendered = useInitialized(() => props2.show, true);
    const {
      zIndex
    } = useZIndex(() => props2.show, 3);
    const normalizedZIndex = computed(() => {
      var _a;
      return (_a = props2.zIndex) != null ? _a : zIndex.value;
    });
    const {
      onStackTop
    } = useStack(() => props2.show, normalizedZIndex);
    const {
      disabled
    } = useTeleport();
    const {
      bindPopupItems
    } = usePopupItems();
    useLock(() => props2.show, () => props2.lockScroll);
    watch(() => props2.show, (newValue) => {
      newValue ? call(props2.onOpen) : call(props2.onClose);
    });
    bindPopupItems({
      show: computed(() => props2.show)
    });
    useEventListener(() => window, "keydown", handleKeydown);
    useRouteListener(() => call(props2.onRouteChange));
    function hidePopup() {
      const {
        closeOnClickOverlay,
        onClickOverlay
      } = props2;
      call(onClickOverlay);
      if (!closeOnClickOverlay) {
        return;
      }
      call(props2["onUpdate:show"], false);
    }
    function renderOverlay() {
      const {
        overlayClass = "",
        overlayStyle
      } = props2;
      return createVNode("div", {
        "class": classes$8(n$a("overlay"), overlayClass),
        "style": __spreadValues$7({
          zIndex: normalizedZIndex.value - 1
        }, overlayStyle),
        "onClick": hidePopup
      }, null);
    }
    function renderContent() {
      return withDirectives(createVNode("div", mergeProps({
        "class": classes$8(n$a("content"), n$a(`--${props2.position}`), [props2.defaultStyle, n$a("--content-background-color")], [props2.defaultStyle, n$a("$-elevation--3")], [props2.safeArea, n$a("--safe-area")], [props2.safeAreaTop, n$a("--safe-area-top")]),
        "style": {
          zIndex: normalizedZIndex.value
        },
        "role": "dialog",
        "aria-modal": "true"
      }, attrs), [rendered.value && call(slots.default)]), [[vShow, props2.show]]);
    }
    function renderPopup() {
      return createVNode(Transition, {
        "name": n$a("$-fade"),
        "onAfterEnter": props2.onOpened,
        "onAfterLeave": props2.onClosed
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": classes$8(n$a("$--box"), n$a(), [!props2.overlay, n$a("--pointer-events-none")]),
          "style": {
            zIndex: normalizedZIndex.value - 2
          }
        }, [props2.overlay && renderOverlay(), createVNode(Transition, {
          "name": props2.transition || n$a(`$-pop-${props2.position}`)
        }, {
          default: () => [renderContent()]
        })]), [[vShow, props2.show]])]
      });
    }
    function handleKeydown(event) {
      if (!onStackTop() || event.key !== "Escape" || !props2.show) {
        return;
      }
      call(props2.onKeyEscape);
      if (!props2.closeOnKeyEscape) {
        return;
      }
      preventDefault(event);
      call(props2["onUpdate:show"], false);
    }
    return () => {
      const {
        teleport
      } = props2;
      if (teleport) {
        return createVNode(Teleport, {
          "to": teleport,
          "disabled": disabled.value
        }, {
          default: () => [renderPopup()]
        });
      }
      return renderPopup();
    };
  }
});
withInstall(stdin_default$l);
withPropsDefaultsSetter(stdin_default$l, props$9);
var stdin_default$k = stdin_default$l;
var __defProp$6 = Object.defineProperty;
var __defProps$5 = Object.defineProperties;
var __getOwnPropDescs$5 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$6.call(b, prop))
      __defNormalProp$6(a, prop, b[prop]);
  if (__getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(b)) {
      if (__propIsEnum$6.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$5 = (a, b) => __defProps$5(a, __getOwnPropDescs$5(b));
const { n: n$9 } = createNamespace("ripple");
const ANIMATION_DURATION = 250;
function setStyles(element) {
  const { zIndex, position } = getStyle$1(element);
  element.style.overflow = "hidden";
  element.style.overflowX = "hidden";
  element.style.overflowY = "hidden";
  position === "static" && (element.style.position = "relative");
  zIndex === "auto" && (element.style.zIndex = "1");
}
function isTouchEvent(event) {
  return "touches" in event;
}
function computeRippleStyles(element, event) {
  const { top, left } = getRect(element);
  const { clientWidth, clientHeight } = element;
  const radius = Math.sqrt(clientWidth ** 2 + clientHeight ** 2) / 2;
  const size = radius * 2;
  const localX = isTouchEvent(event) ? event.touches[0].clientX - left : clientWidth / 2;
  const localY = isTouchEvent(event) ? event.touches[0].clientY - top : clientHeight / 2;
  const centerX = (clientWidth - radius * 2) / 2;
  const centerY = (clientHeight - radius * 2) / 2;
  const x = localX - radius;
  const y = localY - radius;
  return { x, y, centerX, centerY, size };
}
function createRipple(event) {
  const _ripple = this._ripple;
  _ripple.removeRipple();
  if (_ripple.disabled || _ripple.tasker || !stdin_default$m.enableRipple) {
    return;
  }
  const task = () => {
    _ripple.tasker = null;
    const { x, y, centerX, centerY, size } = computeRippleStyles(this, event);
    const ripple = document.createElement("div");
    ripple.classList.add(n$9());
    ripple.style.opacity = `0`;
    ripple.style.transform = `translate(${x}px, ${y}px) scale3d(.3, .3, .3)`;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    _ripple.color && (ripple.style.backgroundColor = _ripple.color);
    ripple.dataset.createdAt = String(performance.now());
    setStyles(this);
    this.appendChild(ripple);
    window.setTimeout(() => {
      ripple.style.transform = `translate(${centerX}px, ${centerY}px) scale3d(1, 1, 1)`;
      ripple.style.opacity = `.25`;
    }, 20);
  };
  _ripple.tasker = window.setTimeout(task, 30);
}
function removeRipple() {
  const _ripple = this._ripple;
  const task = () => {
    const ripples = this.querySelectorAll(`.${n$9()}`);
    if (!ripples.length) {
      return;
    }
    const lastRipple = ripples[ripples.length - 1];
    const delay = ANIMATION_DURATION - performance.now() + Number(lastRipple.dataset.createdAt);
    window.setTimeout(() => {
      lastRipple.style.opacity = `0`;
      window.setTimeout(() => {
        var _a;
        return (_a = lastRipple.parentNode) == null ? void 0 : _a.removeChild(lastRipple);
      }, ANIMATION_DURATION);
    }, delay);
  };
  _ripple.tasker ? window.setTimeout(task, 30) : task();
}
function forbidRippleTask() {
  if (!supportTouch() || !stdin_default$m.enableRipple) {
    return;
  }
  const _ripple = this._ripple;
  _ripple.tasker && window.clearTimeout(_ripple.tasker);
  _ripple.tasker = null;
}
let hasKeyboardRipple = false;
function createKeyboardRipple(event) {
  if (hasKeyboardRipple || !(event.key === " " || event.key === "Enter")) {
    return;
  }
  createRipple.call(this, event);
  hasKeyboardRipple = true;
}
function removeKeyboardRipple() {
  if (!hasKeyboardRipple) {
    return;
  }
  removeRipple.call(this);
  hasKeyboardRipple = false;
}
function mounted$1(el, binding) {
  var _a;
  el._ripple = __spreadProps$5(__spreadValues$6({
    tasker: null
  }, (_a = binding.value) != null ? _a : {}), {
    removeRipple: removeRipple.bind(el)
  });
  el.addEventListener("touchstart", createRipple, { passive: true });
  el.addEventListener("touchmove", forbidRippleTask, { passive: true });
  el.addEventListener("dragstart", removeRipple, { passive: true });
  el.addEventListener("keydown", createKeyboardRipple);
  el.addEventListener("keyup", removeKeyboardRipple);
  el.addEventListener("blur", removeKeyboardRipple);
  document.addEventListener("touchend", el._ripple.removeRipple, { passive: true });
  document.addEventListener("touchcancel", el._ripple.removeRipple, { passive: true });
  document.addEventListener("dragend", el._ripple.removeRipple, { passive: true });
}
function unmounted$1(el) {
  el.removeEventListener("touchstart", createRipple);
  el.removeEventListener("touchmove", forbidRippleTask);
  el.removeEventListener("dragstart", removeRipple);
  if (!el._ripple || !el._ripple.removeRipple) {
    return;
  }
  document.removeEventListener("touchend", el._ripple.removeRipple);
  document.removeEventListener("touchcancel", el._ripple.removeRipple);
  document.removeEventListener("dragend", el._ripple.removeRipple);
}
function updated$1(el, binding) {
  var _a, _b, _c, _d, _e, _f;
  const newBinding = {
    color: (_a = binding.value) == null ? void 0 : _a.color,
    disabled: (_b = binding.value) == null ? void 0 : _b.disabled
  };
  const diff = newBinding.color !== ((_c = el._ripple) == null ? void 0 : _c.color) || newBinding.disabled !== ((_d = el._ripple) == null ? void 0 : _d.disabled);
  if (diff) {
    el._ripple = __spreadValues$6({
      tasker: newBinding.disabled ? null : (_e = el._ripple) == null ? void 0 : _e.tasker,
      removeRipple: (_f = el._ripple) == null ? void 0 : _f.removeRipple
    }, newBinding);
  }
}
const Ripple = {
  mounted: mounted$1,
  unmounted: unmounted$1,
  updated: updated$1,
  install(app2) {
    app2.directive("ripple", this);
  }
};
var stdin_default$j = Ripple;
function shouldDisabled(arg) {
  if (!arg) {
    return false;
  }
  if (arg === "desktop" && inMobile()) {
    return true;
  }
  if (arg === "mobile" && !inMobile()) {
    return true;
  }
  return false;
}
function getStyle(element) {
  const style = element.getAttribute("style");
  if (!style) {
    return {};
  }
  return style.split(";").filter(Boolean).reduce(
    (style2, item) => {
      const [key, value] = item.split(":").map((item2) => item2.trim());
      style2[camelize(key)] = value;
      return style2;
    },
    {}
  );
}
function updateRawStyle(element) {
  const { value } = element._hover;
  const style = getStyle(element);
  Object.keys(value).forEach((key) => {
    const camelizedKey = camelize(key);
    const styleValue = value[camelizedKey];
    if (styleValue != null && style[camelizedKey]) {
      element._hover.rawStyle[camelizedKey] = style[camelizedKey];
    }
  });
}
function updateStyle(element, styleValue) {
  Object.keys(styleValue).forEach((key) => {
    const value = styleValue[key];
    if (value != null) {
      element.style[key] = value;
    }
  });
}
function clearStyle(element) {
  Object.keys(element._hover.value).forEach((key) => {
    const value = element._hover.value[key];
    if (value != null) {
      element.style[key] = "";
    }
  });
}
function restoreStyle(element) {
  if ((element == null ? void 0 : element._hover) == null) {
    return;
  }
  clearStyle(element);
  updateStyle(element, element._hover.rawStyle);
}
function createHover() {
  const { value } = this._hover;
  this._hover.hovering = true;
  if (isFunction(value)) {
    value(this._hover.hovering);
    return;
  }
  updateStyle(this, value);
}
function removeHover() {
  this._hover.hovering = false;
  if (isFunction(this._hover.value)) {
    this._hover.value(this._hover.hovering);
    return;
  }
  restoreStyle(this);
}
function mounted(element, binding) {
  var _a, _b;
  const { arg, value } = binding;
  if (shouldDisabled(arg)) {
    return;
  }
  element._hover = {
    value,
    hovering: (_b = (_a = element._hover) == null ? void 0 : _a.hovering) != null ? _b : false,
    rawStyle: {}
  };
  updateRawStyle(element);
  element.addEventListener("mouseenter", createHover);
  element.addEventListener("mouseleave", removeHover);
}
function unmounted(element, binding) {
  if (shouldDisabled(binding.arg)) {
    return;
  }
  restoreStyle(element);
  element.removeEventListener("mouseenter", createHover);
  element.removeEventListener("mouseleave", removeHover);
}
function beforeUpdate(element, binding) {
  if (!element._hover) {
    return;
  }
  unmounted(element, binding);
}
function shouldUpdateStyle(element, binding) {
  return !isFunction(binding.value) && element._hover.hovering;
}
function updated(element, binding) {
  mounted(element, binding);
  if (shouldUpdateStyle(element, binding)) {
    updateStyle(element, binding.value);
  }
}
const Hover = {
  mounted,
  unmounted,
  beforeUpdate,
  updated,
  install(app2) {
    app2.directive("hover", this);
  }
};
var stdin_default$i = Hover;
const props$8 = {
  hovering: Boolean,
  focusing: Boolean,
  color: String
};
const { name: name$8, n: n$8, classes: classes$7 } = createNamespace("hover-overlay");
function __render__$8(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.classes(_ctx.n(), [_ctx.hovering, _ctx.n("--hovering")], [_ctx.focusing && !_ctx.inMobile(), _ctx.n("--focusing")])),
      style: normalizeStyle({ color: _ctx.color })
    },
    null,
    6
    /* CLASS, STYLE */
  );
}
const __sfc__$8 = /* @__PURE__ */ defineComponent({
  name: name$8,
  props: props$8,
  setup: () => ({
    n: n$8,
    classes: classes$7,
    inMobile
  })
});
__sfc__$8.render = __render__$8;
var stdin_default$h = __sfc__$8;
withInstall(stdin_default$h);
withPropsDefaultsSetter(stdin_default$h, props$8);
function useHoverOverlay() {
  const hovering = /* @__PURE__ */ ref(false);
  const handleHovering = (value) => {
    hovering.value = value;
  };
  return {
    hovering,
    handleHovering
  };
}
var stdin_default$g = stdin_default$h;
function getLeft(element) {
  const { left } = getRect(element);
  return left + (document.body.scrollLeft || document.documentElement.scrollLeft);
}
function getTop(element) {
  const { top } = getRect(element);
  return top + (document.body.scrollTop || document.documentElement.scrollTop);
}
function getTranslateY(el) {
  const { transform } = getStyle$1(el);
  return +transform.slice(transform.lastIndexOf(",") + 2, transform.length - 1);
}
function getParentScroller(el) {
  let element = el;
  while (element) {
    if (!element.parentNode) {
      break;
    }
    element = element.parentNode;
    if (element === document.body || element === document.documentElement) {
      break;
    }
    const scrollRE = /(scroll|auto)/;
    const { overflowY, overflow } = getStyle$1(element);
    if (scrollRE.test(overflowY) || scrollRE.test(overflow)) {
      return element;
    }
  }
  return window;
}
function getAllParentScroller(el) {
  const allParentScroller = [];
  let element = el;
  while (!isWindow(element)) {
    element = getParentScroller(element);
    allParentScroller.push(element);
  }
  return allParentScroller;
}
function getTarget(target, componentName) {
  if (isString(target)) {
    const el = document.querySelector(target);
    assert(!!el, componentName, "target element cannot found");
    return el;
  }
  assert(isObject(target), componentName, 'type of prop "target" should be an element object');
  return target;
}
function getViewportSize() {
  const { width, height } = getRect(window);
  return {
    vw: width,
    vh: height,
    vMin: Math.min(width, height),
    vMax: Math.max(width, height)
  };
}
const isRem = (value) => isString(value) && value.endsWith("rem");
const isPx = (value) => isString(value) && value.endsWith("px") || isNumber(value);
const isVw = (value) => isString(value) && value.endsWith("vw");
const isVh = (value) => isString(value) && value.endsWith("vh");
const isVMin = (value) => isString(value) && value.endsWith("vmin");
const isVMax = (value) => isString(value) && value.endsWith("vmax");
const toPxNum = (value) => {
  if (isNumeric(value)) {
    return Number(value);
  }
  if (isPx(value)) {
    return +value.replace("px", "");
  }
  if (!inBrowser()) {
    return 0;
  }
  const { vw, vh, vMin, vMax } = getViewportSize();
  if (isVw(value)) {
    return +value.replace("vw", "") * vw / 100;
  }
  if (isVh(value)) {
    return +value.replace("vh", "") * vh / 100;
  }
  if (isVMin(value)) {
    return +value.replace("vmin", "") * vMin / 100;
  }
  if (isVMax(value)) {
    return +value.replace("vmax", "") * vMax / 100;
  }
  if (isRem(value)) {
    const num2 = +value.replace("rem", "");
    const rootFontSize = getStyle$1(document.documentElement).fontSize;
    return num2 * parseFloat(rootFontSize);
  }
  if (isString(value)) {
    return toNumber(value);
  }
  return 0;
};
const toSizeUnit = (value) => {
  if (value == null) {
    return void 0;
  }
  if (isNumeric(value)) {
    return `${value}px`;
  }
  return String(value);
};
const multiplySizeUnit = (value, quantity = 1) => {
  if (value == null) {
    return void 0;
  }
  const legalSize = toSizeUnit(value);
  const unit = legalSize.match(/(vh|%|r?em|px|vw|vmin|vmax)$/)[0];
  return `${parseFloat(legalSize) * quantity}${unit}`;
};
function scrollTo(element, { top = 0, left = 0, duration = 300, animation }) {
  const startTime = Date.now();
  const scrollTop = getScrollTop(element);
  const scrollLeft = getScrollLeft(element);
  return new Promise((resolve2) => {
    const frame = () => {
      const progress = (Date.now() - startTime) / duration;
      if (progress < 1) {
        const nextTop = scrollTop + (top - scrollTop) * animation(progress);
        const nextLeft = scrollLeft + (left - scrollLeft) * animation(progress);
        element.scrollTo(nextLeft, nextTop);
        requestAnimationFrame(frame);
      } else {
        element.scrollTo(left, top);
        resolve2();
      }
    };
    requestAnimationFrame(frame);
  });
}
function formatStyleVars(styleVars) {
  return Object.entries(styleVars != null ? styleVars : {}).reduce((styles, [key, value]) => {
    const cssVar = key.startsWith("--") ? key : `--${kebabCase(key)}`;
    styles[cssVar] = value;
    return styles;
  }, {});
}
function padStartFlex(style) {
  return style === "start" || style === "end" ? `flex-${style}` : style;
}
function isDisplayNoneElement(element) {
  let parent = element;
  while (parent && parent !== document.documentElement) {
    if (getStyle$1(parent).display === "none") {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
}
function scrollSelectedIntoView(scroller, selected) {
  if (!scroller || !selected) {
    return;
  }
  scroller.scrollTop = selected.offsetTop - scroller.clientHeight / 2 + selected.offsetHeight / 2;
}
const focusableSelector = ["button", "input", "select", "textarea", "[tabindex]", "[href]"].map((s) => `${s}:not([disabled])`).join(", ");
function focusChildElementByKey(referenceElement, parentElement, key, beforeFocus) {
  const focusableElements = Array.from(parentElement.querySelectorAll(focusableSelector)).filter(
    (element) => !isDisplayNoneElement(element)
  );
  if (!focusableElements.length) {
    return;
  }
  const isActiveInReferenceElements = [referenceElement, ...Array.from(referenceElement.querySelectorAll(focusableSelector))].findIndex(
    (el) => el === document.activeElement
  ) !== -1;
  const activeElementIndex = Array.from(focusableElements).findIndex((el) => el === document.activeElement);
  if (key === "ArrowDown") {
    if (isActiveInReferenceElements && activeElementIndex === -1 || activeElementIndex === focusableElements.length - 1) {
      focus(focusableElements[0]);
      return;
    }
    if (activeElementIndex !== -1 && activeElementIndex < focusableElements.length - 1) {
      focus(focusableElements[activeElementIndex + 1]);
      return;
    }
  }
  if (key === "ArrowUp") {
    if (isActiveInReferenceElements && activeElementIndex === -1 || activeElementIndex === 0) {
      focus(focusableElements[focusableElements.length - 1]);
      return;
    }
    if (activeElementIndex > 0) {
      focus(focusableElements[activeElementIndex - 1]);
    }
  }
  function focus(nextActiveElement) {
    if (beforeFocus && !beforeFocus(document.activeElement, nextActiveElement, isActiveInReferenceElements)) {
      return;
    }
    nextActiveElement.focus();
  }
}
const props$7 = {
  name: String,
  size: [Number, String],
  color: String,
  namespace: {
    type: String,
    default: "var-icon"
  },
  transition: {
    type: [Number, String],
    default: 0
  },
  animationClass: String,
  onClick: defineListenerProp()
};
var __async$1 = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const { name: name$7, n: n$7, classes: classes$6 } = createNamespace("icon");
function __render__$7(_ctx, _cache) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.isURL(_ctx.name) ? "img" : "i"), {
    class: normalizeClass(
      _ctx.classes(
        _ctx.n(),
        [_ctx.namespace !== _ctx.n(), _ctx.namespace],
        `${_ctx.namespace}--set`,
        [_ctx.isURL(_ctx.name), _ctx.n("image"), `${_ctx.namespace}-${_ctx.nextName}`],
        [_ctx.animateInProgress, _ctx.animationClass == null ? _ctx.n("--shrinking") : _ctx.animationClass]
      )
    ),
    style: normalizeStyle({
      color: _ctx.color,
      "transition-duration": `${_ctx.toNumber(_ctx.transition)}ms`,
      width: _ctx.isURL(_ctx.name) ? _ctx.toSizeUnit(_ctx.size) : null,
      height: _ctx.isURL(_ctx.name) ? _ctx.toSizeUnit(_ctx.size) : null,
      fontSize: _ctx.toSizeUnit(_ctx.size)
    }),
    src: _ctx.isURL(_ctx.name) ? _ctx.nextName : null,
    onClick: _ctx.onClick
  }, null, 8, ["class", "style", "src", "onClick"]);
}
const __sfc__$7 = /* @__PURE__ */ defineComponent({
  name: name$7,
  props: props$7,
  setup(props2) {
    const nextName = /* @__PURE__ */ ref("");
    const animateInProgress = /* @__PURE__ */ ref(false);
    watch(() => props2.name, handleNameChange, { immediate: true });
    function handleNameChange(newName, oldName) {
      return __async$1(this, null, function* () {
        const { transition } = props2;
        if (oldName == null || toNumber(transition) === 0) {
          nextName.value = newName;
          return;
        }
        animateInProgress.value = true;
        yield nextTick();
        setTimeout(() => {
          if (oldName != null) {
            nextName.value = newName;
          }
          animateInProgress.value = false;
        }, toNumber(transition));
      });
    }
    return {
      nextName,
      animateInProgress,
      n: n$7,
      classes: classes$6,
      isURL,
      toNumber,
      toSizeUnit
    };
  }
});
__sfc__$7.render = __render__$7;
var stdin_default$f = __sfc__$7;
withInstall(stdin_default$f);
withPropsDefaultsSetter(stdin_default$f, props$7);
var stdin_default$e = stdin_default$f;
const props$6 = {
  errorMessage: {
    type: String,
    default: ""
  },
  extraMessage: {
    type: String,
    default: ""
  }
};
const { name: name$6, n: n$6 } = createNamespace("form-details");
const _hoisted_1$l = { key: 0 };
const _hoisted_2$i = { key: 0 };
function __render__$6(_ctx, _cache) {
  return openBlock(), createBlock(Transition, {
    name: _ctx.n()
  }, {
    default: withCtx(() => [
      _ctx.errorMessage || _ctx.extraMessage || _ctx.$slots["extra-message"] ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(_ctx.n())
        },
        [
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.n("error-message"))
            },
            [
              createVNode(Transition, {
                name: _ctx.n("message")
              }, {
                default: withCtx(() => [
                  _ctx.errorMessage ? (openBlock(), createElementBlock(
                    "div",
                    _hoisted_1$l,
                    toDisplayString(_ctx.errorMessage),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              }, 8, ["name"])
            ],
            2
            /* CLASS */
          ),
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.n("extra-message"))
            },
            [
              createVNode(Transition, {
                name: _ctx.n("message")
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "extra-message", {}, () => [
                    _ctx.extraMessage ? (openBlock(), createElementBlock(
                      "div",
                      _hoisted_2$i,
                      toDisplayString(_ctx.extraMessage),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true)
                  ])
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["name"])
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
const __sfc__$6 = /* @__PURE__ */ defineComponent({
  name: name$6,
  props: props$6,
  setup: () => ({ n: n$6 })
});
__sfc__$6.render = __render__$6;
var stdin_default$d = __sfc__$6;
withInstall(stdin_default$d);
withPropsDefaultsSetter(stdin_default$d, props$6);
var stdin_default$c = stdin_default$d;
var __defProp$5 = Object.defineProperty;
var __defProps$4 = Object.defineProperties;
var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$4 = (a, b) => __defProps$4(a, __getOwnPropDescs$4(b));
const FORM_BIND_FORM_ITEM_KEY = /* @__PURE__ */ Symbol("FORM_BIND_FORM_ITEM_KEY");
function useForm() {
  const { parentProvider, index, bindParent } = useParent(FORM_BIND_FORM_ITEM_KEY);
  const instance = getCurrentInstance();
  const bindForm = bindParent ? (formItemProvider) => {
    bindParent(__spreadProps$4(__spreadValues$5({}, formItemProvider), { instance }));
  } : null;
  return {
    index,
    form: parentProvider,
    bindForm
  };
}
function useFormItems() {
  const { childProviders, length, bindChildren } = useChildren(FORM_BIND_FORM_ITEM_KEY);
  return {
    length,
    formItems: childProviders,
    bindFormItems: bindChildren
  };
}
const SWIPE_BIND_SWIPE_ITEM_KEY = /* @__PURE__ */ Symbol("SWIPE_BIND_SWIPE_ITEM_KEY");
const SWIPE_RESIZE_DISPATCHER_BIND_SWIPE_RESIZE_LISTENER_KEY = /* @__PURE__ */ Symbol(
  "SWIPE_RESIZE_DISPATCHER_BIND_SWIPE_RESIZE_LISTENER_KEY"
);
function useSwipeItems() {
  const { childProviders, length, bindChildren } = useChildren(
    SWIPE_BIND_SWIPE_ITEM_KEY
  );
  return {
    length,
    swipeItems: childProviders,
    bindSwipeItems: bindChildren
  };
}
function useSwipeResizeListeners() {
  const { childProviders, bindChildren } = useChildren(
    SWIPE_RESIZE_DISPATCHER_BIND_SWIPE_RESIZE_LISTENER_KEY
  );
  return {
    swipeResizeListeners: childProviders,
    bindSwipeResizeListeners: bindChildren
  };
}
function useSwipeResizeDispatcher() {
  const { parentProvider, bindParent } = useParent(
    SWIPE_RESIZE_DISPATCHER_BIND_SWIPE_RESIZE_LISTENER_KEY
  );
  return {
    swipeResizeDispatcher: parentProvider,
    bindSwipeResizeDispatcher: bindParent
  };
}
const props$5 = {
  value: {
    type: null,
    required: true
  },
  id: {
    type: String,
    default: ""
  },
  isFocusing: Boolean,
  size: {
    type: String,
    default: "normal"
  },
  variant: {
    type: String,
    default: "standard"
  },
  placeholder: String,
  line: {
    type: Boolean,
    default: true
  },
  hint: {
    type: Boolean,
    default: true
  },
  hintCenter: {
    type: Boolean,
    default: true
  },
  textarea: Boolean,
  textColor: String,
  focusColor: String,
  blurColor: String,
  isError: Boolean,
  formDisabled: Boolean,
  formReadonly: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  clearable: Boolean,
  cursor: String,
  composing: Boolean,
  onClick: defineListenerProp(),
  onClear: defineListenerProp()
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const { name: name$5, n: n$5, classes: classes$5 } = createNamespace("field-decorator");
const _hoisted_1$k = ["for"];
function __render__$5(_ctx, _cache) {
  const _component_var_icon = resolveComponent("var-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), _ctx.n(`--${_ctx.variant}`), [_ctx.size === "small", _ctx.n("--small")], [_ctx.disabled, _ctx.n("--disabled")])),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
    },
    [
      createBaseVNode(
        "div",
        {
          class: normalizeClass(
            _ctx.classes(
              _ctx.n("controller"),
              [_ctx.isFocusing, _ctx.n("--focus")],
              [_ctx.isError, _ctx.n("--error")],
              [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")],
              [!_ctx.line, _ctx.n("--bottom-border-radius")]
            )
          ),
          style: normalizeStyle({
            color: _ctx.color,
            cursor: _ctx.cursor,
            overflow: _ctx.isFloating ? "visible" : "hidden",
            "--field-decorator-middle-offset-left": _ctx.middleOffsetLeft,
            "--field-decorator-middle-offset-width": _ctx.middleOffsetWidth,
            "--field-decorator-middle-offset-height": _ctx.middleOffsetHeight
          })
        },
        [
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.classes(_ctx.n("icon"), [!_ctx.hint, _ctx.n("--icon-non-hint")]))
            },
            [
              renderSlot(_ctx.$slots, "prepend-icon")
            ],
            2
            /* CLASS */
          ),
          createBaseVNode(
            "div",
            {
              ref: "middleEl",
              class: normalizeClass(_ctx.classes(_ctx.n("middle"), [!_ctx.hint, _ctx.n("--middle-non-hint")]))
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          _ctx.placeholder && _ctx.hint ? (openBlock(), createElementBlock("label", {
            key: 0,
            class: normalizeClass(
              _ctx.classes(
                _ctx.n("placeholder"),
                _ctx.n("$--ellipsis"),
                [_ctx.isFocusing, _ctx.n("--focus")],
                [_ctx.hintCenter, _ctx.n("--hint-center")],
                [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")],
                [_ctx.isError, _ctx.n("--error")],
                [_ctx.transitionDisabled, _ctx.n("--transition-disabled")],
                _ctx.computePlaceholderState()
              )
            ),
            style: normalizeStyle({ color: _ctx.color }),
            for: _ctx.id
          }, [
            createBaseVNode(
              "span",
              null,
              toDisplayString(_ctx.placeholder),
              1
              /* TEXT */
            )
          ], 14, _hoisted_1$k)) : createCommentVNode("v-if", true),
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.classes(_ctx.n("icon"), [!_ctx.hint, _ctx.n("--icon-non-hint")]))
            },
            [
              _ctx.clearable && !_ctx.isEmpty(_ctx.value) && !_ctx.readonly && !_ctx.formReadonly ? renderSlot(_ctx.$slots, "clear-icon", {
                key: 0,
                clear: _ctx.handleClear
              }, () => [
                createVNode(_component_var_icon, {
                  class: normalizeClass(_ctx.n("clear-icon")),
                  "var-field-decorator-cover": "",
                  name: "close-circle",
                  onClick: _ctx.handleClear
                }, null, 8, ["class", "onClick"])
              ]) : createCommentVNode("v-if", true),
              renderSlot(_ctx.$slots, "append-icon")
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      ),
      _ctx.line ? (openBlock(), createElementBlock(
        Fragment,
        { key: 0 },
        [
          _ctx.variant === "outlined" ? (openBlock(), createElementBlock(
            "fieldset",
            {
              key: 0,
              class: normalizeClass(
                _ctx.classes(
                  _ctx.n("line"),
                  [_ctx.isFocusing, _ctx.n("--line-focus")],
                  [_ctx.isError, _ctx.n("--line-error")],
                  [_ctx.formDisabled || _ctx.disabled, _ctx.n("--line-disabled")]
                )
              ),
              style: normalizeStyle({ borderColor: _ctx.color })
            },
            [
              createBaseVNode(
                "legend",
                {
                  class: normalizeClass(_ctx.classes(_ctx.n("line-legend"), [_ctx.isFloating, _ctx.n("line-legend--hint")])),
                  style: normalizeStyle({ width: _ctx.legendWidth })
                },
                [
                  _ctx.placeholder && _ctx.hint ? (openBlock(), createBlock(Teleport, {
                    key: 0,
                    to: "body"
                  }, [
                    createBaseVNode(
                      "span",
                      {
                        ref: "placeholderTextEl",
                        class: normalizeClass(
                          _ctx.classes(_ctx.n("placeholder-text"), _ctx.n("$--ellipsis"), [_ctx.size === "small", _ctx.n("placeholder-text--small")])
                        )
                      },
                      toDisplayString(_ctx.placeholder),
                      3
                      /* TEXT, CLASS */
                    )
                  ])) : createCommentVNode("v-if", true)
                ],
                6
                /* CLASS, STYLE */
              )
            ],
            6
            /* CLASS, STYLE */
          )) : (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass(_ctx.classes(_ctx.n("line"), [_ctx.formDisabled || _ctx.disabled, _ctx.n("--line-disabled")], [_ctx.isError, _ctx.n("--line-error")])),
              style: normalizeStyle({ background: !_ctx.isError ? _ctx.blurColor : void 0 })
            },
            [
              createBaseVNode(
                "div",
                {
                  class: normalizeClass(
                    _ctx.classes(
                      _ctx.n("dot"),
                      [_ctx.isFocusing, _ctx.n("--line-focus")],
                      [_ctx.formDisabled || _ctx.disabled, _ctx.n("--line-disabled")],
                      [_ctx.isError, _ctx.n("--line-error")]
                    )
                  ),
                  style: normalizeStyle({ background: !_ctx.isError ? _ctx.focusColor : void 0 })
                },
                null,
                6
                /* CLASS, STYLE */
              )
            ],
            6
            /* CLASS, STYLE */
          ))
        ],
        64
        /* STABLE_FRAGMENT */
      )) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
const __sfc__$5 = /* @__PURE__ */ defineComponent({
  name: name$5,
  components: { VarIcon: stdin_default$e },
  props: props$5,
  setup(props2) {
    const placeholderTextEl = /* @__PURE__ */ ref(null);
    const middleEl = /* @__PURE__ */ ref(null);
    const legendWidth = /* @__PURE__ */ ref("");
    const middleOffsetLeft = /* @__PURE__ */ ref("0px");
    const middleOffsetWidth = /* @__PURE__ */ ref("0px");
    const middleOffsetHeight = /* @__PURE__ */ ref("0px");
    const transitionDisabled = /* @__PURE__ */ ref(true);
    const isFloating = computed(() => props2.hint && (!isEmpty(props2.value) || props2.isFocusing));
    const { popup, bindPopup } = usePopup();
    const { bindSwipeResizeDispatcher } = useSwipeResizeDispatcher();
    let transitionVersion = 0;
    const color = computed(
      () => !props2.isError ? props2.isFocusing ? props2.focusColor : props2.blurColor : void 0
    );
    onWindowResize(() => resize(true));
    useResizeObserver(middleEl, () => resize(true));
    onSmartMounted(() => {
      resize();
      nextTick().then(() => {
        transitionDisabled.value = false;
      });
    });
    onUpdated(resize);
    call(bindPopup, null);
    call(bindSwipeResizeDispatcher, {
      onResize() {
        nextTick().then(() => resize(true));
      }
    });
    if (popup) {
      watch(
        () => popup.show.value,
        (show) => __async(null, null, function* () {
          if (show) {
            yield doubleRaf();
            resize(true);
          }
        })
      );
    }
    function computePlaceholderState() {
      const { hint, value, composing } = props2;
      if (!hint && (!isEmpty(value) || composing)) {
        return n$5("--placeholder-hidden");
      }
      if (isFloating.value) {
        return n$5("--placeholder-hint");
      }
    }
    function handleClear(e) {
      call(props2.onClear, e);
    }
    function handleClick(e) {
      call(props2.onClick, e);
    }
    function resize(disableTransition = false) {
      return __async(this, null, function* () {
        if (!middleEl.value) {
          return;
        }
        if (disableTransition) {
          transitionVersion++;
          transitionDisabled.value = true;
        }
        const currentTransitionVersion = transitionVersion;
        middleOffsetLeft.value = `${middleEl.value.offsetLeft}px`;
        middleOffsetWidth.value = `${middleEl.value.offsetWidth}px`;
        middleOffsetHeight.value = `${middleEl.value.offsetHeight}px`;
        if (props2.variant === "outlined" && placeholderTextEl.value) {
          const placeholderTextStyle = getStyle$1(placeholderTextEl.value);
          const placeholderSpace = `var(--field-decorator-outlined-${props2.size}-placeholder-space)`;
          legendWidth.value = `calc(${placeholderTextStyle.width} * 0.75 + ${placeholderSpace} * 2)`;
        }
        if (disableTransition) {
          yield nextTick();
          yield raf();
          if (currentTransitionVersion === transitionVersion) {
            transitionDisabled.value = false;
          }
        }
      });
    }
    return {
      placeholderTextEl,
      middleEl,
      middleOffsetLeft,
      middleOffsetWidth,
      middleOffsetHeight,
      color,
      legendWidth,
      isFloating,
      transitionDisabled,
      resize,
      computePlaceholderState,
      n: n$5,
      classes: classes$5,
      isEmpty,
      handleClear,
      handleClick
    };
  }
});
__sfc__$5.render = __render__$5;
var stdin_default$b = __sfc__$5;
withInstall(stdin_default$b);
withPropsDefaultsSetter(stdin_default$b, props$5);
var stdin_default$a = stdin_default$b;
var __defProp$4 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
const props$4 = __spreadProps$3(__spreadValues$4({
  modelValue: String,
  modelModifiers: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    default: "text"
  },
  textarea: Boolean,
  ariaLabel: String,
  rows: {
    type: [String, Number],
    default: 8
  },
  maxlength: [String, Number],
  readonly: Boolean,
  resize: Boolean,
  autofocus: Boolean,
  validateTrigger: {
    type: Array,
    default: () => ["onInput", "onClear"]
  },
  rules: [Array, Function, Object],
  enterkeyhint: String,
  preventAutoFill: {
    type: Boolean,
    default: true
  },
  inputmode: String,
  tabindex: String,
  onFocus: defineListenerProp(),
  onBlur: defineListenerProp(),
  onInput: defineListenerProp(),
  onChange: defineListenerProp(),
  onClear: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
}, pickProps(props$5, [
  "size",
  "variant",
  "placeholder",
  "line",
  "hint",
  "textColor",
  "focusColor",
  "blurColor",
  "disabled",
  "clearable",
  "onClick"
])), {
  // internal start
  autocomplete: String,
  isForceFocusingEffect: {
    type: Boolean,
    default: void 0
  },
  isForceErrorEffect: {
    type: Boolean,
    default: void 0
  },
  isShowFormDetails: {
    type: Boolean,
    default: true
  }
  // internal end
});
const { name: name$4, n: n$4, classes: classes$4 } = createNamespace("input");
const _hoisted_1$j = ["aria-label", "placeholder", "enterkeyhint"];
const _hoisted_2$h = ["id", "aria-label", "autocomplete", "disabled", "readonly", "type", "value", "placeholder", "maxlength", "rows", "enterkeyhint", "inputmode", "tabindex"];
const _hoisted_3$f = ["id", "aria-label", "autocomplete", "disabled", "readonly", "type", "value", "placeholder", "maxlength", "enterkeyhint", "tabindex", "inputmode"];
function __render__$4(_ctx, _cache) {
  const _component_var_field_decorator = resolveComponent("var-field-decorator");
  const _component_var_form_details = resolveComponent("var-form-details");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"))),
      onMousedown: _cache[12] || (_cache[12] = (...args) => _ctx.handleMousedown && _ctx.handleMousedown(...args))
    },
    [
      createVNode(
        _component_var_field_decorator,
        normalizeProps(guardReactiveProps({
          value: _ctx.modelValue,
          id: _ctx.id,
          size: _ctx.size,
          variant: _ctx.variant,
          placeholder: _ctx.placeholder,
          ariaLabel: _ctx.ariaLabel,
          line: _ctx.line,
          hint: _ctx.hint,
          textColor: _ctx.textColor,
          focusColor: _ctx.focusColor,
          blurColor: _ctx.blurColor,
          isFocusing: _ctx.isForceFocusingEffect != null ? _ctx.isForceFocusingEffect : _ctx.isFocusing,
          isError: _ctx.isForceErrorEffect != null ? _ctx.isForceErrorEffect : !!_ctx.errorMessage,
          formDisabled: _ctx.formDisabled,
          formReadonly: _ctx.formReadonly,
          disabled: _ctx.disabled,
          readonly: _ctx.readonly,
          clearable: _ctx.clearable,
          cursor: _ctx.cursor,
          composing: _ctx.isComposing,
          hintCenter: !_ctx.textarea,
          onClick: _ctx.handleClick,
          onClear: _ctx.handleClear
        })),
        createSlots({
          "clear-icon": withCtx(({ clear }) => [
            renderSlot(_ctx.$slots, "clear-icon", { clear })
          ]),
          "append-icon": withCtx(() => [
            renderSlot(_ctx.$slots, "append-icon")
          ]),
          default: withCtx(() => [
            _ctx.normalizedType === "password" && _ctx.preventAutoFill ? (openBlock(), createElementBlock("input", {
              key: 0,
              tabindex: "-1",
              "aria-label": _ctx.ariaLabel,
              class: normalizeClass(_ctx.n("autocomplete")),
              placeholder: !_ctx.hint ? _ctx.placeholder : void 0,
              style: normalizeStyle({
                "--input-placeholder-color": _ctx.placeholderColor
              }),
              enterkeyhint: _ctx.enterkeyhint
            }, null, 14, _hoisted_1$j)) : createCommentVNode("v-if", true),
            _ctx.textarea ? (openBlock(), createElementBlock("textarea", {
              key: 1,
              id: _ctx.id,
              ref: "el",
              "aria-label": _ctx.ariaLabel,
              class: normalizeClass(
                _ctx.classes(
                  _ctx.n("input"),
                  _ctx.n("--textarea"),
                  [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")],
                  [_ctx.errorMessage, _ctx.n("--error")],
                  [_ctx.errorMessage, _ctx.n("--caret-error")]
                )
              ),
              autocomplete: _ctx.autocomplete ? _ctx.autocomplete : "new-password",
              disabled: _ctx.formDisabled || _ctx.disabled,
              readonly: _ctx.formReadonly || _ctx.readonly,
              type: _ctx.normalizedType,
              value: _ctx.modelValue,
              placeholder: !_ctx.hint ? _ctx.placeholder : void 0,
              maxlength: _ctx.maxlength,
              rows: _ctx.rows,
              enterkeyhint: _ctx.enterkeyhint,
              inputmode: _ctx.inputmode != null ? _ctx.inputmode : _ctx.type === "number" ? "decimal" : void 0,
              tabindex: _ctx.tabindex,
              style: normalizeStyle({
                color: !_ctx.errorMessage ? _ctx.textColor : void 0,
                caretColor: !_ctx.errorMessage ? _ctx.focusColor : void 0,
                resize: _ctx.resize ? "vertical" : "none",
                "--input-placeholder-color": _ctx.placeholderColor
              }),
              onFocus: _cache[0] || (_cache[0] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
              onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.handleBlur && _ctx.handleBlur(...args)),
              onInput: _cache[2] || (_cache[2] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
              onChange: _cache[3] || (_cache[3] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
              onCompositionstart: _cache[4] || (_cache[4] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
              onCompositionend: _cache[5] || (_cache[5] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args))
            }, null, 46, _hoisted_2$h)) : (openBlock(), createElementBlock("input", {
              key: 2,
              id: _ctx.id,
              ref: "el",
              "aria-label": _ctx.ariaLabel,
              class: normalizeClass(
                _ctx.classes(
                  _ctx.n("input"),
                  [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")],
                  [_ctx.errorMessage, _ctx.n("--error")],
                  [_ctx.errorMessage, _ctx.n("--caret-error")]
                )
              ),
              autocomplete: _ctx.autocomplete ? _ctx.autocomplete : "new-password",
              disabled: _ctx.formDisabled || _ctx.disabled,
              readonly: _ctx.formReadonly || _ctx.readonly,
              type: _ctx.normalizedType,
              value: _ctx.modelValue,
              placeholder: !_ctx.hint ? _ctx.placeholder : void 0,
              maxlength: _ctx.maxlength,
              enterkeyhint: _ctx.enterkeyhint,
              tabindex: _ctx.tabindex,
              inputmode: _ctx.inputmode != null ? _ctx.inputmode : _ctx.type === "number" ? "decimal" : void 0,
              style: normalizeStyle({
                color: !_ctx.errorMessage ? _ctx.textColor : void 0,
                caretColor: !_ctx.errorMessage ? _ctx.focusColor : void 0,
                "--input-placeholder-color": _ctx.placeholderColor
              }),
              onFocus: _cache[6] || (_cache[6] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => _ctx.handleBlur && _ctx.handleBlur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
              onChange: _cache[9] || (_cache[9] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
              onCompositionstart: _cache[10] || (_cache[10] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
              onCompositionend: _cache[11] || (_cache[11] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args))
            }, null, 46, _hoisted_3$f))
          ]),
          _: 2
          /* DYNAMIC */
        }, [
          _ctx.$slots["prepend-icon"] ? {
            name: "prepend-icon",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "prepend-icon")
            ]),
            key: "0"
          } : void 0
        ]),
        1040
        /* FULL_PROPS, DYNAMIC_SLOTS */
      ),
      _ctx.isShowFormDetails ? (openBlock(), createBlock(_component_var_form_details, {
        key: 0,
        "error-message": _ctx.errorMessage,
        "extra-message": _ctx.maxlengthText
      }, createSlots({
        _: 2
        /* DYNAMIC */
      }, [
        _ctx.$slots["extra-message"] ? {
          name: "extra-message",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "extra-message")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["error-message", "extra-message"])) : createCommentVNode("v-if", true)
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const __sfc__$4 = /* @__PURE__ */ defineComponent({
  name: name$4,
  components: {
    VarFormDetails: stdin_default$c,
    VarFieldDecorator: stdin_default$a
  },
  props: props$4,
  setup(props2) {
    const id = useClientId();
    const el = /* @__PURE__ */ ref(null);
    const isFocusing = /* @__PURE__ */ ref(false);
    const isComposing = /* @__PURE__ */ ref(false);
    const { bindForm, form } = useForm();
    const {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation
    } = useValidation();
    const cursor = computed(() => props2.disabled || props2.readonly ? "" : "text");
    const normalizedType = computed(() => {
      if (props2.type === "number") {
        return "text";
      }
      return props2.type;
    });
    const maxlengthText = computed(() => {
      const { maxlength, modelValue } = props2;
      if (!maxlength) {
        return "";
      }
      if (isEmpty(modelValue)) {
        return `0 / ${maxlength}`;
      }
      return `${String(modelValue).length}/${maxlength}`;
    });
    const placeholderColor = computed(() => {
      const { hint, blurColor, focusColor } = props2;
      if (hint) {
        return void 0;
      }
      if (errorMessage.value) {
        return "var(--field-decorator-error-color)";
      }
      if (isFocusing.value) {
        return focusColor || "var(--field-decorator-focus-color)";
      }
      return blurColor || "var(--field-decorator-placeholder-color, var(--field-decorator-blur-color))";
    });
    const inputProvider = {
      reset,
      validate,
      resetValidation
    };
    call(bindForm, inputProvider);
    onSmartMounted(() => {
      if (props2.autofocus) {
        focus();
      }
    });
    function validateWithTrigger(trigger2) {
      nextTick(() => {
        const { validateTrigger, rules, modelValue } = props2;
        vt(validateTrigger, trigger2, rules, modelValue);
      });
    }
    function handleFocus(e) {
      isFocusing.value = true;
      call(props2.onFocus, e);
      validateWithTrigger("onFocus");
    }
    function handleBlur(e) {
      isFocusing.value = false;
      call(props2.onBlur, e);
      validateWithTrigger("onBlur");
    }
    function updateValue(e) {
      const target = e.target;
      let { value } = target;
      if (props2.type === "number") {
        value = formatNumber(value);
      }
      const targetValue = withMaxlength(value);
      if (targetValue === props2.modelValue) {
        target.value = targetValue;
      }
      return targetValue;
    }
    function handleCompositionStart() {
      isComposing.value = true;
    }
    function handleCompositionEnd(e) {
      if (!isComposing.value) {
        return;
      }
      isComposing.value = false;
      e.target.dispatchEvent(new Event("input"));
    }
    function handleInput(e) {
      if (isComposing.value) {
        return;
      }
      const value = updateValue(e);
      call(props2["onUpdate:modelValue"], value);
      call(props2.onInput, value, e);
      validateWithTrigger("onInput");
    }
    function handleChange(e) {
      const value = withTrim(updateValue(e));
      if (props2.modelModifiers.trim) {
        call(props2["onUpdate:modelValue"], value);
      }
      call(props2.onChange, value, e);
      validateWithTrigger("onChange");
    }
    function handleClear() {
      const { disabled, readonly: readonly2, clearable, onClear } = props2;
      if ((form == null ? void 0 : form.disabled.value) || (form == null ? void 0 : form.readonly.value) || disabled || readonly2 || !clearable) {
        return;
      }
      call(props2["onUpdate:modelValue"], "");
      call(onClear, "");
      validateWithTrigger("onClear");
    }
    function handleClick(e) {
      const { disabled, onClick } = props2;
      if ((form == null ? void 0 : form.disabled.value) || disabled) {
        return;
      }
      call(onClick, e);
      validateWithTrigger("onClick");
    }
    function formatNumber(value) {
      const minusIndex = value.indexOf("-");
      const dotIndex = value.indexOf(".");
      if (minusIndex > -1) {
        value = minusIndex === 0 ? "-" + value.replace(/-/g, "") : value.replace(/-/g, "");
      }
      if (dotIndex > -1) {
        value = value.slice(0, dotIndex + 1) + value.slice(dotIndex).replace(/\./g, "");
      }
      return value.replace(/[^-0-9.]/g, "");
    }
    function withTrim(value) {
      return props2.modelModifiers.trim ? value.trim() : value;
    }
    function withMaxlength(value) {
      return props2.maxlength ? value.slice(0, toNumber(props2.maxlength)) : value;
    }
    function handleMousedown(e) {
      const { disabled } = props2;
      if ((form == null ? void 0 : form.disabled.value) || disabled || e.target === el.value) {
        return;
      }
      focus();
      preventDefault(e);
    }
    function reset() {
      call(props2["onUpdate:modelValue"], "");
      resetValidation();
    }
    function validate() {
      return v(props2.rules, props2.modelValue);
    }
    function focus() {
      var _a;
      (_a = el.value) == null ? void 0 : _a.focus();
    }
    function blur() {
      el.value.blur();
    }
    function select() {
      el.value.select();
    }
    return {
      el,
      id,
      isFocusing,
      isComposing,
      errorMessage,
      placeholderColor,
      normalizedType,
      cursor,
      maxlengthText,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly,
      n: n$4,
      classes: classes$4,
      isEmpty,
      handleFocus,
      handleBlur,
      handleInput,
      handleChange,
      handleClear,
      handleClick,
      handleCompositionStart,
      handleCompositionEnd,
      handleMousedown,
      validate,
      resetValidation,
      reset,
      focus,
      blur,
      select
    };
  }
});
__sfc__$4.render = __render__$4;
var stdin_default$9 = __sfc__$4;
withInstall(stdin_default$9);
withPropsDefaultsSetter(stdin_default$9, props$4);
var stdin_default$8 = stdin_default$9;
const props$3 = {
  type: {
    type: String,
    default: "circle"
  },
  radius: [String, Number],
  size: {
    type: String,
    default: "normal"
  },
  color: String,
  description: String,
  loading: Boolean
};
const { name: name$3, n: n$3, classes: classes$3 } = createNamespace("loading");
function __render__$3(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.n())
    },
    [
      _ctx.$slots.default ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(_ctx.classes(_ctx.n("content"), [_ctx.loading, _ctx.n("content--active")]))
        },
        [
          renderSlot(_ctx.$slots, "default"),
          _ctx.loading ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(_ctx.n("content-mask"))
            },
            null,
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true),
      _ctx.isShow ? (openBlock(), createElementBlock(
        "div",
        {
          key: 1,
          class: normalizeClass(_ctx.classes(_ctx.n("$--box"), _ctx.n("body"), [_ctx.$slots.default, _ctx.n("inside")]))
        },
        [
          _ctx.type === "circle" ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(_ctx.n("circle"))
            },
            [
              createBaseVNode(
                "span",
                {
                  class: normalizeClass(_ctx.classes(_ctx.n("circle-block"), _ctx.n(`circle-block--${_ctx.size}`))),
                  style: normalizeStyle({
                    width: _ctx.multiplySizeUnit(_ctx.radius, 2),
                    height: _ctx.multiplySizeUnit(_ctx.radius, 2),
                    color: _ctx.color
                  })
                },
                [..._cache[0] || (_cache[0] = [
                  createBaseVNode(
                    "svg",
                    { viewBox: "25 25 50 50" },
                    [
                      createBaseVNode("circle", {
                        cx: "50",
                        cy: "50",
                        r: "20",
                        fill: "none"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])],
                6
                /* CLASS, STYLE */
              )
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.loadingTypeDict, (nums, key) => {
              return openBlock(), createElementBlock(
                Fragment,
                { key },
                [
                  _ctx.type === key ? (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: normalizeClass(_ctx.classes(_ctx.n(key), _ctx.n(`${key}--${_ctx.size}`)))
                    },
                    [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(nums, (num2) => {
                          return openBlock(), createElementBlock(
                            "div",
                            {
                              key: num2 + key,
                              style: normalizeStyle({ backgroundColor: _ctx.color }),
                              class: normalizeClass(_ctx.classes(_ctx.n(`${key}-item`), _ctx.n(`${key}-item--${_ctx.size}`)))
                            },
                            null,
                            6
                            /* CLASS, STYLE */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true)
                ],
                64
                /* STABLE_FRAGMENT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _ctx.$slots.description || _ctx.description ? (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass(_ctx.classes(_ctx.n("description"), _ctx.n(`description--${_ctx.size}`))),
              style: normalizeStyle({ color: _ctx.color })
            },
            [
              renderSlot(_ctx.$slots, "description", {}, () => [
                createTextVNode(
                  toDisplayString(_ctx.description),
                  1
                  /* TEXT */
                )
              ])
            ],
            6
            /* CLASS, STYLE */
          )) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
const __sfc__$3 = /* @__PURE__ */ defineComponent({
  name: name$3,
  props: props$3,
  setup(props2, { slots }) {
    const isShow = computed(() => {
      if (!call(slots.default)) {
        return true;
      }
      return props2.loading;
    });
    const loadingTypeDict = {
      wave: 5,
      cube: 4,
      rect: 8,
      disappear: 3
    };
    return {
      loadingTypeDict,
      isShow,
      n: n$3,
      classes: classes$3,
      multiplySizeUnit
    };
  }
});
__sfc__$3.render = __render__$3;
var stdin_default$7 = __sfc__$3;
withInstall(stdin_default$7);
withPropsDefaultsSetter(stdin_default$7, props$3);
var stdin_default$6 = stdin_default$7;
var __defProp$3 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
const props$2 = {
  type: String,
  nativeType: {
    type: String,
    default: "button"
  },
  size: String,
  loading: Boolean,
  round: Boolean,
  fab: Boolean,
  block: Boolean,
  text: Boolean,
  outline: Boolean,
  disabled: Boolean,
  autoLoading: Boolean,
  tonal: Boolean,
  iconContainer: Boolean,
  ripple: {
    type: Boolean,
    default: true
  },
  focusable: {
    type: Boolean,
    default: true
  },
  color: String,
  textColor: String,
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  loadingRadius: [Number, String],
  loadingType: pickProps(props$3, "type"),
  loadingSize: __spreadProps$2(__spreadValues$3({}, pickProps(props$3, "size")), {
    default: void 0
  }),
  loadingColor: __spreadProps$2(__spreadValues$3({}, pickProps(props$3, "color")), {
    default: "currentColor"
  }),
  onClick: defineListenerProp(),
  onTouchstart: defineListenerProp()
};
const BUTTON_GROUP_BIND_BUTTON_KEY = /* @__PURE__ */ Symbol("BUTTON_GROUP_BIND_BUTTON_KEY");
function useButtons() {
  const { bindChildren, childProviders, length } = useChildren(BUTTON_GROUP_BIND_BUTTON_KEY);
  return {
    length,
    buttons: childProviders,
    bindButtons: bindChildren
  };
}
function useButtonGroup() {
  const { bindParent, parentProvider, index } = useParent(BUTTON_GROUP_BIND_BUTTON_KEY);
  return {
    index,
    buttonGroup: parentProvider,
    bindButtonGroup: bindParent
  };
}
const { name: name$2, n: n$2, classes: classes$2 } = createNamespace("button");
const _hoisted_1$i = ["tabindex", "type", "disabled"];
function __render__$2(_ctx, _cache) {
  const _component_var_loading = resolveComponent("var-loading");
  const _component_var_hover_overlay = resolveComponent("var-hover-overlay");
  const _directive_ripple = resolveDirective("ripple");
  const _directive_hover = resolveDirective("hover");
  return withDirectives((openBlock(), createElementBlock("button", {
    class: normalizeClass(
      _ctx.classes(
        _ctx.n(),
        _ctx.n("$--box"),
        _ctx.n(`--${_ctx.states.size}`),
        [_ctx.block, `${_ctx.n("$--flex")} ${_ctx.n("--block")}`, _ctx.n("$--inline-flex")],
        [!_ctx.states.text, _ctx.states.elevation],
        [!_ctx.states.iconContainer && !_ctx.states.text, _ctx.n(`--${_ctx.states.type}`)],
        [_ctx.states.text, `${_ctx.n("--text")} ${_ctx.n(`--text-${_ctx.states.type}`)}`],
        [_ctx.states.iconContainer, _ctx.n(`--icon-container-${_ctx.states.type}`)],
        [_ctx.states.filledDefault, _ctx.n("--filled-default")],
        [_ctx.states.elevationDisabled, _ctx.n("--elevation-disabled")],
        [_ctx.round, _ctx.n("--round")],
        [_ctx.fab, _ctx.n("--fab")],
        [_ctx.states.outline, _ctx.n("--outline")],
        [_ctx.loading || _ctx.pending, _ctx.n("--loading")],
        [_ctx.disabled, _ctx.n("--disabled")],
        [_ctx.states.text && _ctx.disabled, _ctx.n("--text-disabled")]
      )
    ),
    tabindex: _ctx.focusable ? void 0 : "-1",
    style: normalizeStyle({
      color: _ctx.states.textColor,
      background: _ctx.states.color
    }),
    type: _ctx.nativeType,
    disabled: _ctx.disabled || _ctx.loading || _ctx.pending,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args)),
    onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx.handleTouchstart && _ctx.handleTouchstart(...args)),
    onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
    onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.isFocusing = false)
  }, [
    _ctx.loading || _ctx.pending ? (openBlock(), createBlock(_component_var_loading, {
      key: 0,
      class: normalizeClass(_ctx.n("loading")),
      "var-button-cover": "",
      color: _ctx.loadingColor,
      type: _ctx.loadingType,
      size: _ctx.loadingSize || _ctx.states.size,
      radius: _ctx.loadingRadius
    }, null, 8, ["class", "color", "type", "size", "radius"])) : createCommentVNode("v-if", true),
    createBaseVNode(
      "div",
      {
        class: normalizeClass(_ctx.classes(_ctx.n("content"), [_ctx.loading || _ctx.pending, _ctx.n("--hidden")]))
      },
      [
        renderSlot(_ctx.$slots, "default")
      ],
      2
      /* CLASS */
    ),
    createVNode(_component_var_hover_overlay, {
      hovering: _ctx.disabled || _ctx.loading || _ctx.pending ? false : _ctx.hovering,
      focusing: _ctx.disabled || _ctx.loading || _ctx.pending ? false : _ctx.isFocusing
    }, null, 8, ["hovering", "focusing"])
  ], 46, _hoisted_1$i)), [
    [_directive_ripple, { disabled: _ctx.disabled || !_ctx.ripple || _ctx.loading || _ctx.pending }],
    [_directive_hover, _ctx.handleHovering, "desktop"]
  ]);
}
const __sfc__$2 = /* @__PURE__ */ defineComponent({
  name: name$2,
  components: {
    VarLoading: stdin_default$6,
    VarHoverOverlay: stdin_default$g
  },
  directives: { Ripple: stdin_default$j, Hover: stdin_default$i },
  props: props$2,
  setup(props2) {
    const isFocusing = /* @__PURE__ */ ref(false);
    const pending = /* @__PURE__ */ ref(false);
    const { buttonGroup } = useButtonGroup();
    const { hovering, handleHovering } = useHoverOverlay();
    const states = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g;
      if (!buttonGroup) {
        return {
          elevation: props2.tonal ? "" : formatElevation(props2.elevation, 2),
          type: (_a = props2.type) != null ? _a : "default",
          size: (_b = props2.size) != null ? _b : "normal",
          color: props2.color,
          text: props2.text,
          textColor: props2.textColor,
          outline: props2.outline,
          iconContainer: props2.tonal || props2.iconContainer,
          elevationDisabled: props2.tonal || props2.elevation === false || toNumber(props2.elevation) === 0,
          filledDefault: (props2.type == null || props2.type === "default") && (props2.elevation === false || toNumber(props2.elevation) === 0) && !props2.text && !props2.outline && !props2.tonal && !props2.iconContainer
        };
      }
      const { type, size, color, textColor, mode, elevation } = buttonGroup;
      return {
        elevation: "",
        type: (_c = props2.type) != null ? _c : type.value,
        size: (_d = props2.size) != null ? _d : size.value,
        color: (_e = props2.color) != null ? _e : color.value,
        textColor: (_f = props2.textColor) != null ? _f : textColor.value,
        text: mode.value === "text" || mode.value === "outline",
        outline: mode.value === "outline",
        iconContainer: mode.value === "tonal" || mode.value === "icon-container",
        elevationDisabled: mode.value === "tonal",
        filledDefault: mode.value === "normal" && ((_g = props2.type) != null ? _g : type.value) === "default" && (elevation.value === false || toNumber(elevation.value) === 0)
      };
    });
    function attemptAutoLoading(result) {
      if (props2.autoLoading) {
        pending.value = true;
        Promise.all(normalizeToArray(result)).then(() => {
          pending.value = false;
        }).catch(() => {
          pending.value = false;
        });
      }
    }
    function handleClick(e) {
      const { loading, disabled, onClick } = props2;
      if (!onClick || loading || disabled || pending.value) {
        return;
      }
      attemptAutoLoading(call(onClick, e));
    }
    function handleTouchstart(e) {
      const { loading, disabled, onTouchstart } = props2;
      if (!onTouchstart || loading || disabled || pending.value) {
        return;
      }
      attemptAutoLoading(call(onTouchstart, e));
    }
    function handleFocus() {
      if (!props2.focusable) {
        return;
      }
      isFocusing.value = true;
    }
    return {
      pending,
      states,
      hovering,
      isFocusing,
      n: n$2,
      classes: classes$2,
      handleHovering,
      handleClick,
      handleTouchstart,
      handleFocus
    };
  }
});
__sfc__$2.render = __render__$2;
var stdin_default$5 = __sfc__$2;
withInstall(stdin_default$5);
withPropsDefaultsSetter(stdin_default$5, props$2);
var stdin_default$4 = stdin_default$5;
var __defProp$2 = Object.defineProperty;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
const props$1 = __spreadValues$2({
  show: Boolean,
  width: [Number, String],
  title: String,
  message: String,
  messageAlign: {
    type: String,
    default: "left"
  },
  confirmButton: {
    type: Boolean,
    default: true
  },
  cancelButton: {
    type: Boolean,
    default: true
  },
  confirmButtonText: String,
  cancelButtonText: String,
  confirmButtonTextColor: String,
  cancelButtonTextColor: String,
  confirmButtonColor: String,
  cancelButtonColor: String,
  confirmButtonProps: Object,
  cancelButtonProps: Object,
  confirmButtonLoading: Boolean,
  cancelButtonLoading: Boolean,
  confirmButtonDisabled: Boolean,
  cancelButtonDisabled: Boolean,
  dialogClass: String,
  dialogStyle: Object,
  onBeforeClose: defineListenerProp(),
  onConfirm: defineListenerProp(),
  onCancel: defineListenerProp(),
  "onUpdate:show": defineListenerProp()
}, pickProps(props$9, [
  "overlay",
  "overlayClass",
  "overlayStyle",
  "lockScroll",
  "closeOnClickOverlay",
  "closeOnKeyEscape",
  "teleport",
  "onOpen",
  "onClose",
  "onOpened",
  "onClosed",
  "onClickOverlay",
  "onKeyEscape",
  // internal for function call closes the dialog
  "onRouteChange"
]));
var __defProp$1 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
const { name: name$1, n: n$1, classes: classes$1 } = createNamespace("dialog");
function __render__$1(_ctx, _cache) {
  const _component_var_button = resolveComponent("var-button");
  const _component_var_popup = resolveComponent("var-popup");
  return openBlock(), createBlock(_component_var_popup, {
    class: normalizeClass(_ctx.n("popup")),
    "var-dialog-cover": "",
    show: _ctx.popupShow,
    overlay: _ctx.overlay,
    "overlay-class": _ctx.overlayClass,
    "overlay-style": _ctx.overlayStyle,
    "lock-scroll": _ctx.lockScroll,
    "close-on-click-overlay": _ctx.popupCloseOnClickOverlay,
    "close-on-key-escape": false,
    teleport: _ctx.teleport,
    onOpen: _ctx.onOpen,
    onClose: _ctx.onClose,
    onClosed: _ctx.onClosed,
    onOpened: _ctx.onOpened,
    onKeyEscape: _ctx.handleKeyEscape,
    onRouteChange: _ctx.onRouteChange,
    onClickOverlay: _ctx.handleClickOverlay
  }, {
    default: withCtx(() => [
      createBaseVNode(
        "div",
        mergeProps({
          class: _ctx.classes(_ctx.n("$--box"), _ctx.n(), _ctx.dialogClass),
          style: __spreadValues$1({ width: _ctx.toSizeUnit(_ctx.width) }, _ctx.dialogStyle)
        }, _ctx.$attrs),
        [
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.n("title"))
            },
            [
              renderSlot(_ctx.$slots, "title", {}, () => {
                var _a;
                return [
                  createTextVNode(
                    toDisplayString((_a = _ctx.title) != null ? _a : (_ctx.pt ? _ctx.pt : _ctx.t)("dialogTitle")),
                    1
                    /* TEXT */
                  )
                ];
              })
            ],
            2
            /* CLASS */
          ),
          createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.n("message")),
              style: normalizeStyle({ textAlign: _ctx.messageAlign })
            },
            [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(
                  toDisplayString(_ctx.message),
                  1
                  /* TEXT */
                )
              ])
            ],
            6
            /* CLASS, STYLE */
          ),
          renderSlot(_ctx.$slots, "actions", {
            slotClass: _ctx.n("actions"),
            cancel: _ctx.cancel,
            confirm: _ctx.confirm
          }, () => [
            createBaseVNode(
              "div",
              {
                class: normalizeClass(_ctx.n("actions"))
              },
              [
                _ctx.cancelButton ? (openBlock(), createBlock(_component_var_button, mergeProps({ key: 0 }, _ctx.cancelButtonNormalizedProps, {
                  class: _ctx.classes(_ctx.n("button"), _ctx.n("cancel-button"), [_ctx.cancelButtonProps != null, _ctx.n("--with-button-props")]),
                  "var-dialog-cover": "",
                  onClick: _ctx.cancel
                }), {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createTextVNode(
                        toDisplayString((_a = _ctx.cancelButtonText) != null ? _a : (_ctx.pt ? _ctx.pt : _ctx.t)("dialogCancelButtonText")),
                        1
                        /* TEXT */
                      )
                    ];
                  }),
                  _: 1
                  /* STABLE */
                }, 16, ["class", "onClick"])) : createCommentVNode("v-if", true),
                _ctx.confirmButton ? (openBlock(), createBlock(_component_var_button, mergeProps({ key: 1 }, _ctx.confirmButtonNormalizedProps, {
                  class: _ctx.classes(_ctx.n("button"), _ctx.n("confirm-button"), [_ctx.confirmButtonProps != null, _ctx.n("--with-button-props")]),
                  "var-dialog-cover": "",
                  onClick: _ctx.confirm
                }), {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createTextVNode(
                        toDisplayString((_a = _ctx.confirmButtonText) != null ? _a : (_ctx.pt ? _ctx.pt : _ctx.t)("dialogConfirmButtonText")),
                        1
                        /* TEXT */
                      )
                    ];
                  }),
                  _: 1
                  /* STABLE */
                }, 16, ["class", "onClick"])) : createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ])
        ],
        16
        /* FULL_PROPS */
      )
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "show", "overlay", "overlay-class", "overlay-style", "lock-scroll", "close-on-click-overlay", "teleport", "onOpen", "onClose", "onClosed", "onOpened", "onKeyEscape", "onRouteChange", "onClickOverlay"]);
}
const __sfc__$1 = /* @__PURE__ */ defineComponent({
  name: name$1,
  components: {
    VarPopup: stdin_default$k,
    VarButton: stdin_default$4
  },
  inheritAttrs: false,
  props: props$1,
  setup(props2) {
    const { t: pt } = injectLocaleProvider();
    const popupShow = /* @__PURE__ */ ref(false);
    const popupCloseOnClickOverlay = /* @__PURE__ */ ref(false);
    const confirmButtonLoading = useVModel(props2, "confirmButtonLoading");
    const cancelButtonLoading = useVModel(props2, "cancelButtonLoading");
    const confirmButtonDisabled = useVModel(props2, "confirmButtonDisabled");
    const cancelButtonDisabled = useVModel(props2, "cancelButtonDisabled");
    const confirmButtonNormalizedProps = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return __spreadProps$1(__spreadValues$1({
        text: true
      }, props2.confirmButtonProps), {
        textColor: (_b = props2.confirmButtonTextColor) != null ? _b : (_a = props2.confirmButtonProps) == null ? void 0 : _a.textColor,
        color: (_d = props2.confirmButtonColor) != null ? _d : (_c = props2.confirmButtonProps) == null ? void 0 : _c.color,
        loading: confirmButtonLoading.value || ((_e = props2.confirmButtonProps) == null ? void 0 : _e.loading),
        disabled: confirmButtonDisabled.value || ((_f = props2.confirmButtonProps) == null ? void 0 : _f.disabled)
      });
    });
    const cancelButtonNormalizedProps = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return __spreadProps$1(__spreadValues$1({
        text: true
      }, props2.cancelButtonProps), {
        textColor: (_b = props2.cancelButtonTextColor) != null ? _b : (_a = props2.cancelButtonProps) == null ? void 0 : _a.textColor,
        color: (_d = props2.cancelButtonColor) != null ? _d : (_c = props2.cancelButtonProps) == null ? void 0 : _c.color,
        loading: cancelButtonLoading.value || ((_e = props2.cancelButtonProps) == null ? void 0 : _e.loading),
        disabled: cancelButtonDisabled.value || ((_f = props2.cancelButtonProps) == null ? void 0 : _f.disabled)
      });
    });
    const exposedRefs = {
      confirmButtonLoading,
      cancelButtonLoading,
      confirmButtonDisabled,
      cancelButtonDisabled
    };
    watch(
      () => props2.show,
      (newValue) => {
        popupShow.value = newValue;
      },
      { immediate: true }
    );
    watch(
      () => props2.closeOnClickOverlay,
      (newValue) => {
        if (props2.onBeforeClose != null) {
          popupCloseOnClickOverlay.value = false;
          return;
        }
        popupCloseOnClickOverlay.value = newValue;
      },
      { immediate: true }
    );
    function done() {
      return call(props2["onUpdate:show"], false);
    }
    function handleClickOverlay() {
      const { closeOnClickOverlay, onClickOverlay, onBeforeClose } = props2;
      call(onClickOverlay);
      if (!closeOnClickOverlay) {
        return;
      }
      if (onBeforeClose != null) {
        call(onBeforeClose, "close", done, exposedRefs);
        return;
      }
      call(props2["onUpdate:show"], false);
    }
    function confirm() {
      const { onBeforeClose, onConfirm } = props2;
      call(onConfirm);
      if (onBeforeClose != null) {
        call(onBeforeClose, "confirm", done, exposedRefs);
        return;
      }
      call(props2["onUpdate:show"], false);
    }
    function cancel() {
      const { onBeforeClose, onCancel } = props2;
      call(onCancel);
      if (onBeforeClose != null) {
        call(onBeforeClose, "cancel", done, exposedRefs);
        return;
      }
      call(props2["onUpdate:show"], false);
    }
    function handleKeyEscape() {
      call(props2.onKeyEscape);
      if (!props2.closeOnKeyEscape) {
        return;
      }
      cancel();
    }
    return {
      popupShow,
      popupCloseOnClickOverlay,
      confirmButtonLoading,
      cancelButtonLoading,
      confirmButtonDisabled,
      cancelButtonDisabled,
      confirmButtonNormalizedProps,
      cancelButtonNormalizedProps,
      pt,
      t,
      n: n$1,
      classes: classes$1,
      handleClickOverlay,
      confirm,
      cancel,
      toSizeUnit,
      handleKeyEscape
    };
  }
});
__sfc__$1.render = __render__$1;
var stdin_default$3 = __sfc__$1;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
let singletonOptions;
let defaultOptions = {};
function normalizeOptions(options = {}) {
  if (isString(options)) {
    return __spreadProps(__spreadValues({}, defaultOptions), { message: options });
  }
  return __spreadValues(__spreadValues({}, defaultOptions), options);
}
function Dialog(options) {
  if (!inBrowser()) {
    return Promise.resolve();
  }
  return new Promise((resolve2) => {
    Dialog.close();
    const dialogOptions = normalizeOptions(options);
    const reactiveDialogOptions = /* @__PURE__ */ reactive(dialogOptions);
    reactiveDialogOptions.teleport = "body";
    singletonOptions = reactiveDialogOptions;
    const { unmountInstance } = mountInstance(stdin_default$3, reactiveDialogOptions, {
      onConfirm: () => {
        call(reactiveDialogOptions.onConfirm);
        resolve2("confirm");
      },
      onCancel: () => {
        call(reactiveDialogOptions.onCancel);
        resolve2("cancel");
      },
      onClose: () => {
        call(reactiveDialogOptions.onClose);
        resolve2("close");
      },
      onClosed: () => {
        call(reactiveDialogOptions.onClosed);
        unmountInstance();
        singletonOptions === reactiveDialogOptions && (singletonOptions = null);
      },
      onRouteChange: () => {
        unmountInstance();
        singletonOptions === reactiveDialogOptions && (singletonOptions = null);
      },
      "onUpdate:show": (value) => {
        reactiveDialogOptions.show = value;
      }
    });
    reactiveDialogOptions.show = true;
  });
}
Dialog.setDefaultOptions = function(options) {
  defaultOptions = options;
};
Dialog.resetDefaultOptions = function() {
  defaultOptions = {};
};
Dialog.close = function() {
  if (singletonOptions != null) {
    const prevSingletonOptions = singletonOptions;
    singletonOptions = null;
    nextTick().then(() => {
      prevSingletonOptions.show = false;
    });
  }
};
Dialog.Component = stdin_default$3;
withInstall(stdin_default$3);
withInstall(stdin_default$3, Dialog);
withPropsDefaultsSetter(Dialog, props$1);
var stdin_default$2 = Dialog;
const props = {
  modelValue: {
    default: false
  },
  activeValue: {
    default: true
  },
  inactiveValue: {
    default: false
  },
  lazyChange: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  loading: Boolean,
  color: String,
  loadingColor: String,
  closeColor: String,
  size: [String, Number],
  variant: Boolean,
  rules: [Array, Function, Object],
  tabindex: String,
  ripple: {
    type: Boolean,
    default: true
  },
  buttonElevation: {
    type: [Boolean, String, Number],
    default: true
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange", "onLazyChange"]
  },
  onClick: defineListenerProp(),
  onBeforeChange: defineListenerProp(),
  onChange: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
const { name, n, classes } = createNamespace("switch");
const _hoisted_1$h = ["aria-checked"];
const _hoisted_2$g = ["tabindex"];
function __render__(_ctx, _cache) {
  const _component_var_hover_overlay = resolveComponent("var-hover-overlay");
  const _component_var_form_details = resolveComponent("var-form-details");
  const _directive_ripple = resolveDirective("ripple");
  const _directive_hover = resolveDirective("hover");
  return withDirectives((openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes(_ctx.n(), [_ctx.variant, _ctx.n("--variant")])),
    role: "switch",
    "aria-checked": _ctx.modelValue
  }, [
    createBaseVNode(
      "div",
      {
        ref: "switchRef",
        class: normalizeClass(_ctx.classes(_ctx.n("block"), [_ctx.disabled || _ctx.formDisabled, _ctx.n("--disabled")], [_ctx.isActive, _ctx.n("block--active")])),
        style: normalizeStyle(_ctx.styleComputed.switch),
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.switchActive && _ctx.switchActive(...args))
      },
      [
        createBaseVNode(
          "div",
          {
            style: normalizeStyle(_ctx.styleComputed.track),
            class: normalizeClass(_ctx.classes(_ctx.n("track"), [_ctx.isActive, _ctx.n("track--active")], [_ctx.errorMessage && !_ctx.variant, _ctx.n("track--error")]))
          },
          null,
          6
          /* CLASS, STYLE */
        ),
        withDirectives((openBlock(), createElementBlock("div", {
          class: normalizeClass(_ctx.classes(_ctx.n("ripple"), [_ctx.isActive, _ctx.n("ripple--active")])),
          style: normalizeStyle(_ctx.styleComputed.ripple),
          tabindex: _ctx.tabindex == null ? _ctx.disabled || _ctx.formDisabled ? void 0 : "0" : _ctx.tabindex,
          onFocus: _cache[0] || (_cache[0] = ($event) => _ctx.isFocusing = true),
          onBlur: _cache[1] || (_cache[1] = ($event) => _ctx.isFocusing = false)
        }, [
          createBaseVNode(
            "div",
            {
              style: normalizeStyle(_ctx.styleComputed.handle),
              class: normalizeClass(
                _ctx.classes(
                  _ctx.n("handle"),
                  _ctx.formatElevation(_ctx.buttonElevation, 2),
                  [_ctx.isActive, _ctx.n("handle--active")],
                  [_ctx.errorMessage && !_ctx.variant, _ctx.n("handle--error")],
                  [_ctx.hovering, _ctx.n("handle--hover")]
                )
              )
            },
            [
              _ctx.loading ? (openBlock(), createElementBlock(
                "span",
                {
                  key: 0,
                  class: normalizeClass(_ctx.n("loading")),
                  style: normalizeStyle({
                    width: _ctx.radius,
                    height: _ctx.radius
                  })
                },
                [..._cache[3] || (_cache[3] = [
                  createBaseVNode(
                    "svg",
                    { viewBox: "25 25 50 50" },
                    [
                      createBaseVNode("circle", {
                        cx: "50",
                        cy: "50",
                        r: "20",
                        fill: "none"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])],
                6
                /* CLASS, STYLE */
              )) : createCommentVNode("v-if", true)
            ],
            6
            /* CLASS, STYLE */
          ),
          createVNode(_component_var_hover_overlay, {
            hovering: _ctx.hovering && !_ctx.disabled && !_ctx.formDisabled,
            focusing: _ctx.isFocusing && !_ctx.disabled && !_ctx.formDisabled
          }, null, 8, ["hovering", "focusing"])
        ], 46, _hoisted_2$g)), [
          [_directive_ripple, {
            disabled: !_ctx.ripple || _ctx.disabled || _ctx.loading || _ctx.formDisabled || _ctx.readonly || _ctx.formReadonly
          }]
        ])
      ],
      6
      /* CLASS, STYLE */
    ),
    createVNode(_component_var_form_details, { "error-message": _ctx.errorMessage }, null, 8, ["error-message"])
  ], 10, _hoisted_1$h)), [
    [_directive_hover, _ctx.hover, "desktop"]
  ]);
}
const __sfc__ = /* @__PURE__ */ defineComponent({
  name,
  components: {
    VarFormDetails: stdin_default$c,
    VarHoverOverlay: stdin_default$g
  },
  directives: { Ripple: stdin_default$j, Hover: stdin_default$i },
  props,
  setup(props2) {
    const switchRef = /* @__PURE__ */ ref(null);
    const isFocusing = /* @__PURE__ */ ref(false);
    const { bindForm, form } = useForm();
    const { errorMessage, validateWithTrigger: vt, validate: v, resetValidation } = useValidation();
    const { hovering, handleHovering } = useHoverOverlay();
    const isActive = computed(() => props2.modelValue === props2.activeValue);
    const styleComputed = computed(() => {
      const { size, color, closeColor, loadingColor, variant } = props2;
      return {
        handle: {
          width: multiplySizeUnit(size),
          height: multiplySizeUnit(size),
          backgroundColor: isActive.value ? color : closeColor,
          color: loadingColor
        },
        ripple: {
          left: isActive.value ? multiplySizeUnit(size, 0.5) : `-${multiplySizeUnit(size, variant ? 1 / 3 : 0.5)}`,
          color: isActive.value ? color : closeColor || "currentColor",
          width: multiplySizeUnit(size, 2),
          height: multiplySizeUnit(size, 2)
        },
        track: {
          width: multiplySizeUnit(size, variant ? 13 / 6 : 1.9),
          height: multiplySizeUnit(size, variant ? 4 / 3 : 0.72),
          borderRadius: multiplySizeUnit(size, 2 / 3),
          filter: isActive.value || (errorMessage == null ? void 0 : errorMessage.value) ? void 0 : `brightness(${variant ? 1 : 0.6})`,
          backgroundColor: isActive.value ? color : closeColor,
          borderWidth: variant && !isActive.value ? multiplySizeUnit(size, 1 / 12) : void 0
        },
        switch: {
          width: multiplySizeUnit(size, variant ? 13 / 6 : 2),
          height: multiplySizeUnit(size, variant ? 4 / 3 : 1.2)
        }
      };
    });
    const radius = computed(() => multiplySizeUnit(props2.size, 0.8));
    const switchProvider = {
      reset,
      validate,
      resetValidation
    };
    call(bindForm, switchProvider);
    useEventListener(() => window, "keydown", handleKeydown);
    useEventListener(() => window, "keyup", handleKeyup);
    function handleKeydown(event) {
      if (!isFocusing.value) {
        return;
      }
      if (event.key === " " || event.key === "Enter") {
        preventDefault(event);
      }
      if (event.key === "Enter") {
        switchRef.value.click();
      }
    }
    function handleKeyup(event) {
      if (!isFocusing.value || event.key !== " ") {
        return;
      }
      preventDefault(event);
      switchRef.value.click();
    }
    function validate() {
      return v(props2.rules, props2.modelValue);
    }
    function validateWithTrigger(trigger2) {
      nextTick(() => {
        const { validateTrigger, rules, modelValue } = props2;
        vt(validateTrigger, trigger2, rules, modelValue);
      });
    }
    function switchActive(event) {
      const {
        onClick,
        onChange,
        disabled,
        loading,
        readonly: readonly2,
        activeValue,
        inactiveValue,
        lazyChange,
        "onUpdate:modelValue": updateModelValue,
        onBeforeChange
      } = props2;
      if (disabled || (form == null ? void 0 : form.disabled.value)) {
        return;
      }
      call(onClick, event);
      if (loading || readonly2 || (form == null ? void 0 : form.readonly.value)) {
        return;
      }
      const newValue = isActive.value ? inactiveValue : activeValue;
      if (lazyChange) {
        call(onBeforeChange, newValue, (value) => {
          call(updateModelValue, value);
          validateWithTrigger("onLazyChange");
        });
      } else {
        call(updateModelValue, newValue);
        call(onChange, newValue);
        validateWithTrigger("onChange");
      }
    }
    function hover(value) {
      if (props2.disabled || (form == null ? void 0 : form.disabled.value)) {
        return;
      }
      handleHovering(value);
    }
    function reset() {
      call(props2["onUpdate:modelValue"], props2.inactiveValue);
      resetValidation();
    }
    return {
      isActive,
      switchRef,
      hovering,
      isFocusing,
      radius,
      styleComputed,
      errorMessage,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly,
      n,
      classes,
      formatElevation,
      multiplySizeUnit,
      switchActive,
      hover
    };
  }
});
__sfc__.render = __render__;
var stdin_default$1 = __sfc__;
withInstall(stdin_default$1);
withPropsDefaultsSetter(stdin_default$1, props);
var stdin_default = stdin_default$1;
const _hoisted_1$g = ["width", "height", "innerHTML"];
const _sfc_main$g = {
  __name: "AppIcon",
  props: {
    name: { type: String, required: true },
    size: { type: [Number, String], default: 18 }
  },
  setup(__props) {
    const PATHS = {
      cart: '<path d="M5 4h2.2l2 12h9.3l2-9H8.4"/><circle cx="10" cy="19.6" r="1.2"/><circle cx="17.6" cy="19.6" r="1.2"/>',
      box: '<path d="M4 8.4 12 4l8 4.4v7.2L12 20l-8-4.4z"/><path d="M4 8.4 12 12.8l8-4.4M12 12.8V20"/>',
      list: '<path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
      chart: '<path d="M4 19h16"/><path d="M7 16V9M12 16V5M17 16v-4"/>',
      user: '<circle cx="12" cy="8.4" r="3.5"/><path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6"/>',
      layers: '<path d="m12 4 8 4-8 4-8-4z"/><path d="m4 12 8 4 8-4M4 16l8 4 8-4"/>',
      shop: '<path d="M4 9l1.6-4h12.8L20 9"/><path d="M5 9v10h14V9"/><path d="M9.5 19v-5h5v5"/>',
      plus: '<path d="M12 6v12M6 12h12"/>',
      minus: '<path d="M6 12h12"/>',
      search: '<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>',
      back: '<path d="m15 5-7 7 7 7"/>',
      chev: '<path d="m9 5 7 7-7 7"/>',
      close: '<path d="M6 6l12 12M18 6 6 18"/>',
      upload: '<path d="M12 18V8m0 0-3.5 3.5M12 8l3.5 3.5"/><path d="M5 4h14"/>',
      download: '<path d="M12 4v10m0 0-3.5-3.5M12 14l3.5-3.5"/><path d="M5 18h14"/>',
      link: '<path d="M10 14a4 4 0 0 1 0-5.7l3-3a4 4 0 0 1 5.7 5.7l-1.5 1.5"/><path d="M14 10a4 4 0 0 1 0 5.7l-3 3a4 4 0 0 1-5.7-5.7l1.5-1.5"/>',
      alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.2v.2"/>',
      check: '<path d="m5 13 5 5 9-11"/>',
      edit: '<path d="M4 20h4l10-10-4-4-10 10z"/><path d="M14 6l4 4"/>',
      trash: '<path d="M4 7h16"/><path d="M9 7V5h6v2M6 7l1 13h10l1-13"/>',
      split: '<path d="M4 6h6v6"/><path d="M20 18h-6v-6"/><path d="M10 12 4.5 6.5M14 12l5.5 5.5"/>',
      clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7.6V12l3 2"/>',
      sync: '<path d="M20 12a8 8 0 0 1-13.6 5.7"/><path d="M4 12a8 8 0 0 1 13.6-5.7"/><path d="M4 5v4h4M20 19v-4h-4"/>',
      theme: '<circle cx="12" cy="12" r="8"/><path d="M12 4v16"/>',
      speaker: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
      dots: '<circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/>',
      qrcode: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h.1"/>'
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        width: __props.size,
        height: __props.size,
        style: normalizeStyle({ width: __props.size + "px", height: __props.size + "px" }),
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.6",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "aria-hidden": "true",
        innerHTML: PATHS[__props.name] || ""
      }, null, 12, _hoisted_1$g);
    };
  }
};
function r2(n2) {
  const v = Number(n2);
  if (!isFinite(v)) return 0;
  return Math.round((v + Number.EPSILON) * 100) / 100;
}
function money(n2) {
  return "¥" + money2(n2);
}
function money2(n2) {
  return r2(n2).toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtQty(qty, unit = "件") {
  const v = r2(qty);
  const abs = Math.abs(v);
  let text;
  if (Number.isInteger(v)) text = String(v);
  else if (abs >= 1) text = v.toFixed(2).replace(/0$/, "");
  else text = v.toFixed(2);
  return text + " " + (unit || "件");
}
function fmtTime(ts) {
  const d = new Date(ts);
  const p2 = (n2) => String(n2).padStart(2, "0");
  return d.getMonth() + 1 + "月" + p2(d.getDate()) + " " + p2(d.getHours()) + ":" + p2(d.getMinutes());
}
function dayKey(ts) {
  const d = new Date(ts);
  const p2 = (n2) => String(n2).padStart(2, "0");
  return d.getFullYear() + "-" + p2(d.getMonth() + 1) + "-" + p2(d.getDate());
}
function startOfDay(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
function startOfMonth(ts = Date.now()) {
  const d = new Date(ts);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
function startOfYear(ts = Date.now()) {
  const d = new Date(ts);
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
const now = Date.now();
const hour = 36e5;
const ago = (h2) => now - h2 * hour;
const OP_OWNER = { operatorName: "我（店主）" };
function seedData() {
  const categories2 = [
    { id: "c1", name: "胶带", sort: 1 },
    { id: "c2", name: "贴纸", sort: 2 },
    { id: "c3", name: "内页", sort: 3 },
    { id: "c4", name: "便签", sort: 4 },
    { id: "c5", name: "日付", sort: 5 },
    { id: "c6", name: "明信片", sort: 6 },
    { id: "c7", name: "散装/称重", sort: 7 }
  ].map((c) => ({ ...c, storeIds: ["s1", "s2"], updatedAt: ago(30 * 24) }));
  const P = (id, name2, price, cost, other, unit, step, cat, motif, extra = {}) => ({
    id,
    name: name2,
    price,
    cost,
    other,
    unit,
    step,
    cat,
    motif,
    storeId: "s1",
    barcode: "",
    traceCode: "",
    img: "",
    splitFrom: "",
    splitPer: 0,
    lowStock: 0,
    createdAt: ago(20 * 24),
    updatedAt: ago(20 * 24),
    ...extra
  });
  const products2 = [
    P("p1", "大日付下半年分装", 15.8, 9.2, 0.3, "份", 1, "c5", "dayf", { lowStock: 5 }),
    P("p2", "街景胶带整卷", 16.8, 8, 0.4, "卷", 1, "c1", "tape", { lowStock: 3 }),
    P("p3", "街景胶带分装2循", 3.5, 1.6, 0.1, "份", 1, "c1", "tape", { splitFrom: "p2", splitPer: 5, lowStock: 8 }),
    P("p5", "Bird系列和纸贴纸整版", 12.8, 6.6, 0.2, "份", 1, "c2", "sticker", { lowStock: 5 }),
    P("p6", "小日付上半年分装", 8.8, 4.6, 0.2, "份", 1, "c5", "dayf", { lowStock: 6 }),
    P("p7", "明信片 · 老城街角", 8, 3.6, 0.2, "个", 1, "c6", "card", { barcode: "690000000007", lowStock: 10 }),
    P("p8", "散装和纸胶带（称重）", 120, 58, 0, "kg", 0.01, "c7", "tape"),
    P("p9", "手帐冰箱贴", 9.9, 4.2, 0.2, "个", 1, "c6", "magnet", { lowStock: 4 }),
    P("p10", "周计划内页 A5", 9.9, 3.8, 0.2, "份", 1, "c3", "page"),
    P("p11", "方形便签本", 5.9, 2.4, 0.1, "份", 1, "c4", "note"),
    /* 城西夜市摊自己的货：和「我的小摊」完全独立的商品库 */
    P("p4", "棉纸异形贺卡", 6.6, 3.3, 0.2, "个", 1, "c6", "shaped", { storeId: "s2", lowStock: 10 }),
    P("p12", "夜市荧光手环", 5, 1.8, 0.1, "个", 1, "c7", "sticker", { storeId: "s2", lowStock: 10 }),
    P("p13", "冷萃冰粉杯", 12, 6.5, 0.4, "份", 1, "c7", "page", { storeId: "s2", lowStock: 5 })
  ];
  const stores2 = [
    { id: "s1", name: "我的小摊", role: "owner", mine: true, warehouseIds: ["w1", "w2"], createdAt: ago(40 * 24), updatedAt: ago(2) },
    { id: "s2", name: "城西夜市摊", role: "owner", mine: true, warehouseIds: ["w2"], createdAt: ago(10 * 24), updatedAt: ago(2) }
  ];
  const warehouses2 = [
    { id: "w1", name: "主仓 · 家里", note: "常备货，每周补一次", createdAt: ago(35 * 24), updatedAt: ago(2) },
    { id: "w2", name: "备用仓 · 车库", note: "大件和囤货", createdAt: ago(33 * 24), updatedAt: ago(2) }
  ];
  const agents2 = [
    { id: "a1", name: "小刘代卖点", ownerName: "小刘", parentStoreId: "s1", code: "AG-8F2C", createdAt: ago(5 * 24), updatedAt: ago(2) }
  ];
  const ops = [];
  const stockMap = /* @__PURE__ */ new Map();
  const keyOf = (pid, type, id) => pid + "|" + type + "|" + id;
  function pushOp(at, pid, locType, locId, delta, reason, refId) {
    const d = r2(delta);
    if (!d) return;
    const k = keyOf(pid, locType, locId);
    const next = r2((stockMap.get(k) || 0) + d);
    if (next < 0) throw new Error("示例数据库存被扣成负数：" + k + " @ " + reason);
    stockMap.set(k, next);
    ops.push({
      id: "so-" + (ops.length + 1),
      productId: pid,
      locType,
      locId,
      delta: d,
      reason,
      refId: refId || "",
      at,
      updatedAt: at
    });
  }
  [["p1", 60], ["p2", 20], ["p5", 40], ["p8", 20], ["p6", 30], ["p9", 10], ["p11", 12]].forEach(([pid, q]) => pushOp(ago(15 * 24), pid, "warehouse", "w1", q, "inbound"));
  [["p2", 8], ["p6", 30], ["p10", 12]].forEach(([pid, q]) => pushOp(ago(15 * 24), pid, "warehouse", "w2", q, "inbound"));
  [["p4", 24], ["p12", 30], ["p13", 12]].forEach(([pid, q]) => pushOp(ago(9 * 24), pid, "store", "s2", q, "inbound"));
  [["p7", 30], ["p11", 10], ["p10", 6], ["p2", 4]].forEach(([pid, q]) => pushOp(ago(6 * 24), pid, "store", "s1", q, "inbound"));
  pushOp(ago(5 * 24), "p2", "store", "s1", -2, "split-out", "p3");
  pushOp(ago(5 * 24), "p3", "store", "s1", 10, "split-in", "p2");
  [["p1", 20], ["p2", 6], ["p5", 10], ["p8", 4], ["p9", 6], ["p6", 25]].forEach(([pid, q]) => {
    pushOp(ago(4 * 24), pid, "warehouse", "w1", -q, "transfer-out");
    pushOp(ago(4 * 24), pid, "store", "s1", q, "transfer-in");
  });
  pushOp(ago(60), "p13", "store", "s2", -3, "count");
  function order(id, at, items, opt = {}) {
    const lines = items.map((it) => ({
      productId: it.p,
      name: it.n,
      price: it.price,
      qty: it.qty,
      unit: it.unit,
      cost: it.cost || 0,
      other: it.other || 0
    }));
    const origTotal = r2(lines.reduce((s, it) => s + it.price * it.qty, 0));
    const received = opt.received == null ? origTotal : opt.received;
    lines.forEach((l) => pushOp(at, l.productId, "store", opt.storeId || "s1", -l.qty, "sell", id));
    return {
      id,
      storeId: opt.storeId || "s1",
      agentId: opt.agentId || "",
      at,
      items: lines,
      origTotal,
      total: received,
      received,
      discount: opt.discount || 0,
      roundOff: opt.roundOff || 0,
      paymentMethod: opt.paymentMethod || "wechat",
      cashTendered: opt.paymentMethod === "cash" ? received : 0,
      change: 0,
      note: opt.note || "",
      updatedAt: at
    };
  }
  const orders2 = [
    /* 3 天前：批发给小店，20 份小日付 */
    order("o5", ago(72), [
      { p: "p6", n: "小日付上半年分装", price: 8.8, qty: 20, unit: "份", cost: 4.6, other: 0.2 }
    ], { paymentMethod: "cash", note: "批发给隔壁文具店" }),
    /* 66 小时前：城西摊开张第一单 */
    order("o6", ago(66), [
      { p: "p4", n: "棉纸异形贺卡", price: 6.6, qty: 2, unit: "个", cost: 3.3, other: 0.2 }
    ], { storeId: "s2", paymentMethod: "alipay", note: "城西摊" }),
    /* 50 小时前：城西摊卖了手环 + 冰粉 */
    order("o7", ago(50), [
      { p: "p12", n: "夜市荧光手环", price: 5, qty: 3, unit: "个", cost: 1.8, other: 0.1 },
      { p: "p13", n: "冷萃冰粉杯", price: 12, qty: 2, unit: "份", cost: 6.5, other: 0.4 }
    ], { storeId: "s2", paymentMethod: "wechat" }),
    /* 30 小时前：抹零单 36.6 → 收 36 */
    order("o4", ago(30), [
      { p: "p2", n: "街景胶带整卷", price: 16.8, qty: 1, unit: "卷", cost: 8, other: 0.4 },
      { p: "p9", n: "手帐冰箱贴", price: 9.9, qty: 1, unit: "个", cost: 4.2, other: 0.2 },
      { p: "p10", n: "周计划内页 A5", price: 9.9, qty: 1, unit: "份", cost: 3.8, other: 0.2 }
    ], { received: 36, roundOff: 0.6, paymentMethod: "cash", note: "抹零" }),
    /* 20 小时前：附近老师一次拿走 4 本内页（卖到只剩 1 本，用来验证「补货提示」） */
    order("o8", ago(20), [
      { p: "p10", n: "周计划内页 A5", price: 9.9, qty: 4, unit: "份", cost: 3.8, other: 0.2 }
    ], { paymentMethod: "cash", note: "附近老师采购" }),
    /* 7 小时前：老客两件 */
    order("o1", ago(7), [
      { p: "p1", n: "大日付下半年分装", price: 15.8, qty: 2, unit: "份", cost: 9.2, other: 0.3 },
      { p: "p5", n: "Bird系列和纸贴纸整版", price: 12.8, qty: 1, unit: "份", cost: 6.6, other: 0.2 }
    ], { paymentMethod: "wechat" }),
    /* 4 小时前：代理小刘卖的（订单挂在 s1，agentId 有值） */
    order("o2", ago(4), [
      { p: "p3", n: "街景胶带分装2循", price: 3.5, qty: 4, unit: "份", cost: 1.6, other: 0.1 },
      { p: "p7", n: "明信片 · 老城街角", price: 8, qty: 2, unit: "个", cost: 3.6, other: 0.2 }
    ], { agentId: "a1", paymentMethod: "cash" }),
    /* 2 小时前：称重单 0.35kg × 120 = 42 */
    order("o3", ago(2), [
      { p: "p8", n: "散装和纸胶带（称重）", price: 120, qty: 0.35, unit: "kg", cost: 58, other: 0 }
    ], { paymentMethod: "wechat" })
  ];
  const holds2 = [{
    id: "h1",
    storeId: "s1",
    agentId: "",
    at: ago(0.67),
    items: [
      { productId: "p7", name: "明信片 · 老城街角", price: 8, qty: 2, unit: "个", cost: 3.6, other: 0.2 },
      { productId: "p11", name: "方形便签本", price: 5.9, qty: 1, unit: "份", cost: 2.4, other: 0.1 }
    ],
    note: "客人去取车，回头来付",
    updatedAt: ago(0.67)
  }];
  const L = (id, at, type, text, extra = {}) => ({
    id,
    at,
    type,
    text,
    storeId: extra.storeId !== void 0 ? extra.storeId : "s1",
    warehouseId: extra.warehouseId || "",
    refId: extra.refId || "",
    deviceId: "",
    operatorId: extra.operatorId !== void 0 ? extra.operatorId : "",
    operatorName: extra.operatorName || OP_OWNER.operatorName,
    operatorRole: extra.operatorRole || "owner",
    updatedAt: at
  });
  const logs2 = [
    L("l1", ago(40 * 24), "store", "新建店铺「我的小摊」"),
    L("l2", ago(35 * 24), "warehouse", "新建仓库「主仓 · 家里」", { warehouseId: "w1" }),
    L("l3", ago(33 * 24), "warehouse", "新建仓库「备用仓 · 车库」", { warehouseId: "w2" }),
    L("l4", ago(20 * 24), "product", "上架 10 款商品（胶带 / 贴纸 / 明信片 / 称重胶带等）"),
    L(
      "l5",
      ago(15 * 24),
      "stock",
      "入库「主仓 · 家里」：大日付 +60、街景整卷 +20、Bird 贴纸 +40、称重胶带 +20kg、小日付 +30、冰箱贴 +10、便签 +12",
      { warehouseId: "w1" }
    ),
    L(
      "l6",
      ago(15 * 24),
      "stock",
      "入库「备用仓 · 车库」：街景整卷 +8、小日付 +30、周计划内页 +12",
      { warehouseId: "w2" }
    ),
    L("l7", ago(10 * 24), "store", "新建店铺「城西夜市摊」，挂上「备用仓 · 车库」", { storeId: "s2" }),
    L("l8", ago(9 * 24), "stock", "入库「城西夜市摊」：贺卡 +24、荧光手环 +30、冰粉杯 +12", { storeId: "s2" }),
    L("l9", ago(6 * 24), "stock", "入库到店：明信片 +30、方形便签 +10、周计划内页 +6、街景整卷 +4"),
    L("l10", ago(5 * 24), "split", "拆卷：街景胶带整卷 −2 → 分装 2 循 +10（每卷 5 份）"),
    L(
      "l11",
      ago(4 * 24),
      "stock",
      "调拨「主仓 · 家里」→「我的小摊」：大日付 +20、街景整卷 +6、Bird 贴纸 +10、称重胶带 +4kg、小日付 +25、冰箱贴 +6",
      { warehouseId: "w1" }
    ),
    L("l12", ago(60), "stock", "盘点「城西夜市摊」：冷萃冰粉杯 12 → 9（摔坏 3 杯）", { storeId: "s2" }),
    L("l13", ago(0.67), "hold", "挂单：明信片 2 个 + 方形便签 1 份（客人去取车）"),
    L("l21", ago(20), "settle", "结算[现金] ¥39.60：周计划内页 4 份（老师采购）", { refId: "o8" }),
    L("l14", ago(2), "settle", "结算[微信] ¥42.00：散装和纸胶带 0.35 kg", { refId: "o3" }),
    L(
      "l15",
      ago(4),
      "settle",
      "结算[现金] ¥30.00：街景胶带分装 4 份、明信片 2 个",
      { refId: "o2", operatorId: "a1", operatorName: "小刘代卖点", operatorRole: "agent" }
    ),
    L("l16", ago(7), "settle", "结算[微信] ¥44.40：大日付 2 份、Bird 贴纸 1 份", { refId: "o1" }),
    L("l17", ago(30), "settle", "结算[现金] ¥36.00（抹零 0.60）：街景整卷 1 卷、冰箱贴 1 个、内页 1 份", { refId: "o4" }),
    L("l18", ago(50), "settle", "结算[微信] ¥39.00：荧光手环 3 个、冰粉杯 2 份", { refId: "o7", storeId: "s2" }),
    L("l19", ago(66), "settle", "结算[支付宝] ¥13.20：贺卡 2 个", { refId: "o6", storeId: "s2" }),
    L("l20", ago(72), "settle", "结算[现金] ¥176.00：小日付 20 份（批发给隔壁文具店）", { refId: "o5" })
  ].sort((a, b) => b.at - a.at);
  const stocks = [];
  stockMap.forEach((qty, k) => {
    const [productId, locType, locId] = k.split("|");
    stocks.push({
      id: "st-" + productId + "-" + locType + "-" + locId,
      productId,
      locType,
      locId,
      qty,
      updatedAt: Math.max(...ops.filter((o) => o.productId === productId && o.locType === locType && o.locId === locId).map((o) => o.at))
    });
  });
  stocks.sort((a, b) => a.productId < b.productId ? -1 : 1);
  return {
    collections: {
      categories: categories2,
      products: products2,
      stocks,
      orders: orders2,
      holds: holds2,
      stores: stores2,
      warehouses: warehouses2,
      agents: agents2,
      logs: logs2,
      stockOps: ops
    },
    settings: {
      themeColor: "jade",
      dark: false,
      fontScale: 1,
      shopName: "我的小摊",
      updatedAt: ago(2)
    },
    meta: {
      deviceId: "dev-seed01",
      activeStoreId: "s1",
      role: "owner",
      agentId: "",
      schemaVersion: 1,
      updatedAt: now
    }
  };
}
function encodeSnap(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function decodeSnap(str) {
  const b64 = String(str).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return JSON.parse(new TextDecoder().decode(bytes));
}
function agentLink(code, base) {
  const b = base || (typeof location !== "undefined" ? location.href : "http://localhost/");
  const url = new URL("agent.html", b);
  url.searchParams.set("code", code);
  return url.href;
}
function agentDataLink(code, bundle, base) {
  if (!bundle) return null;
  const c = bundle.seed.collections;
  const pack = {
    collections: {
      categories: c.categories,
      products: c.products,
      stocks: c.stocks,
      agents: c.agents,
      stores: c.stores,
      warehouses: c.warehouses,
      orders: c.orders,
      holds: c.holds,
      logs: c.logs
    },
    settings: bundle.seed.settings
  };
  return agentLink(code, base) + "&s=" + encodeSnap(pack);
}
function toBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin);
}
function agentBootHtml({ code, name: name2, origin, pack }) {
  const safeName = String(name2).replace(/[\\/:*?"<>|]/g, "");
  const payload = toBase64(JSON.stringify(pack));
  const agentUrl = origin + "agent.html?code=" + encodeURIComponent(code);
  const bootUrl = origin + "boot.html";
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${safeName} · 摆摊助手代理入口</title>
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 28px 20px; background: #f3f4ef; color: #22302b;
    font-family: -apple-system, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  }
  .card { width: min(520px, 100%); background: #fff; border-radius: 18px; padding: 26px 22px; border: 1px solid #dfe3dc; }
  h1 { font-size: 20px; margin: 0 0 6px; letter-spacing: -.3px; }
  .sub { font-size: 13px; color: #6b7a73; line-height: 1.8; margin: 0 0 18px; }
  .state { display: flex; align-items: center; gap: 10px; font-size: 14px; padding: 12px 14px; border-radius: 12px; background: #eef4f0; color: #1f6b52; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: #2f9c7a; animation: pulse 1.2s infinite; }
  @keyframes pulse { 0%,100% { opacity: .35 } 50% { opacity: 1 } }
  .hint { font-size: 12.5px; color: #6b7a73; line-height: 1.9; margin-top: 14px; }
  a.btn { display: block; text-align: center; margin-top: 16px; padding: 12px; border-radius: 12px; background: #1f6b52; color: #fff; text-decoration: none; font-size: 15px; font-weight: 600; }
  a.btn[hidden] { display: none; }
  iframe { width: 1px; height: 1px; border: 0; opacity: 0; position: fixed; left: -9999px; }
</style>
</head>
<body>
  <div class="card">
    <h1>${safeName} · 代理入口</h1>
    <p class="sub">这份文件里有店主发来的整份数据（商品、库存、历史单）。打开它会把数据写进这台设备的浏览器，然后进入代理界面。</p>
    <div class="state"><span class="dot"></span><b id="msg">正在写入数据…</b></div>
    <div class="hint" id="tip">不要关闭这个页面。写入通常 1～2 秒，完成后会自动跳到代理页。</div>
    <a class="btn" id="go" href="${agentUrl}" hidden>立即打开代理页</a>
  </div>

  <iframe id="boot" src="${bootUrl}" title="数据写入桥"></iframe>

<script>
(function () {
  var PACK = "${payload}";
  var AGENT_URL = ${JSON.stringify(agentUrl)};
  var boot = document.getElementById('boot');
  var msg = document.getElementById('msg');
  var tip = document.getElementById('tip');
  var go = document.getElementById('go');

  function send () {
    try {
      boot.contentWindow.postMessage({ type: 'stall-boot', pack: PACK }, '*');
    } catch (e) {
      fallback('浏览器不允许自动写入：' + e.message);
    }
  }

  function fallback (text) {
    msg.textContent = '需要手动点一下';
    tip.textContent = text + ' 。如果这里一直没反应，可能是浏览器拦了跨源 iframe，点下面的按钮直接进入代理页（首次可能没有数据，需要店主再发一次）。';
    go.hidden = false;
  }

  boot.addEventListener('load', function () {
    send();
    /* 桥页可能加载稍慢，补两次，重复写入是幂等的（整份覆盖） */
    setTimeout(send, 1200);
    setTimeout(send, 2600);
  });

  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (d.type === 'stall-boot-ok') {
      msg.textContent = '数据已写入，正在打开代理页…';
      tip.textContent = '如果没有自动跳转，点下面的按钮。';
      go.hidden = false;
      setTimeout(function () { location.replace(AGENT_URL); }, 500);
    } else if (d.type === 'stall-boot-error') {
      fallback('写入失败：' + (d.message || '未知原因'));
    }
  });

  setTimeout(function () {
    if (!go.hidden) return;
    msg.textContent = '还在写入，可以先点下面按钮试试';
    go.hidden = false;
  }, 8000);
})();
<\/script>
</body>
</html>`;
  return { fileName: "代理-" + safeName + "-" + code + "-入口.html", html };
}
function stockId(productId, locType, locId) {
  return "st-" + productId + "-" + locType + "-" + locId;
}
function qtyAt(stocks, productId, locType, locId) {
  const row = stocks.find((s) => s.productId === productId && s.locType === locType && s.locId === locId);
  return row ? r2(row.qty) : 0;
}
function storeQty(stocks, productId, storeId) {
  return qtyAt(stocks, productId, "store", storeId);
}
function whQty(stocks, productId, whId) {
  return qtyAt(stocks, productId, "warehouse", whId);
}
function setQty(stocks, productId, locType, locId, qty) {
  const id = stockId(productId, locType, locId);
  let row = stocks.find((s) => s.id === id);
  if (!row) {
    row = { id, productId, locType, locId, qty: 0, updatedAt: 0 };
    stocks.push(row);
  }
  row.qty = r2(qty);
  row.updatedAt = Date.now();
  return row;
}
function addQty(stocks, productId, locType, locId, delta) {
  const cur = qtyAt(stocks, productId, locType, locId);
  return setQty(stocks, productId, locType, locId, cur + r2(delta)).qty;
}
function transfer(stocks, productId, from, to, qty) {
  const amount = r2(qty);
  if (!(amount > 0)) return { ok: false, msg: "调拨数量要大于 0" };
  const have = qtyAt(stocks, productId, from.type, from.id);
  if (have < amount) return { ok: false, msg: "来源只剩 " + have + "，不够调 " + amount };
  addQty(stocks, productId, from.type, from.id, -amount);
  addQty(stocks, productId, to.type, to.id, amount);
  return { ok: true };
}
function deductForOrder(stocks, items, storeId) {
  const shortages = [];
  items.forEach((it) => {
    const cur = qtyAt(stocks, it.productId, "store", storeId);
    const next = r2(cur - r2(it.qty));
    setQty(stocks, it.productId, "store", storeId, next);
    if (next < 0) shortages.push({ name: it.name, need: r2(it.qty), have: cur });
  });
  return shortages;
}
function stockOverview(stocks, products2, locType, locId) {
  const rows = stocks.filter((s) => {
    if (s.locType !== locType || s.locId !== locId) return false;
    if (r2(s.qty) === 0) return false;
    return products2.some((x) => x.id === s.productId);
  });
  const lines = rows.map((s) => {
    const p2 = products2.find((x) => x.id === s.productId);
    return {
      product: p2,
      qty: r2(s.qty),
      /* 【金额计算】-单行货值：单行货值 = 数量 × (商品成本 + 商品其他成本)
         eg: 柠檬茶库存 14 杯，成本 3 元 + 其他 0.5 元 → 14 × 3.5 = 49 元
         eg: 整卷 3 卷，成本 12 元 + 其他 3 元 → 3 × 15 = 45 元
         ⚠ 按成本算，不是按售价：货值回答的是「压了多少钱」，不是「能卖多少钱」 */
      value: p2 ? r2(s.qty * ((p2.cost || 0) + (p2.other || 0))) : 0
    };
  });
  return {
    lines,
    count: lines.length,
    /* 【金额计算】-总货值：总货值 = Σ单行货值
       eg: 柠檬茶 49 元 + 贴纸包 25 元 → 合计 74 元 */
    value: r2(lines.reduce((sum, l) => sum + l.value, 0))
  };
}
function refillSuggestions(stocks, products2, storeId, whIds) {
  const out = [];
  products2.forEach((p2) => {
    const store = storeQty(stocks, p2.id, storeId);
    const threshold = p2.step && p2.step < 1 ? 0.2 : 1;
    if (store > threshold) return;
    const whTotal = whIds.reduce((sum, wid) => sum + whQty(stocks, p2.id, wid), 0);
    if (whTotal > 0) {
      const whs = whIds.map((id) => ({ id, qty: whQty(stocks, p2.id, id) })).filter((w) => w.qty > 0).sort((a, b) => b.qty - a.qty);
      out.push({ product: p2, store, whTotal, whIds, whs, bestWh: whs.length ? whs[0].id : whIds[0] });
    }
  });
  return out;
}
const AGENT_ALLOWED = ["orders", "holds", "logs", "stockOps"];
function sameContent(a, b) {
  const ka = Object.keys(a).filter((k) => k !== "updatedAt");
  const kb = Object.keys(b).filter((k) => k !== "updatedAt");
  if (ka.length !== kb.length) return false;
  return ka.every((k) => JSON.stringify(a[k]) === JSON.stringify(b[k]));
}
function mergeList(local, remote, name2, report) {
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
      report.conflicts.push({ collection: name2, id: rec.id, kept: "local" });
    }
  });
  return Array.from(map.values());
}
function reconcileStocks(localRows, remoteRows, ops, report) {
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
    if (!l || !r) {
      const one = l || r;
      const after2 = list.filter((o) => (Number(o.at) || 0) > (Number(one.updatedAt) || 0));
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
    if (!list.length) {
      out.push(rt > lt ? r : l);
      report.deduped = (report.deduped || 0) + 1;
      return;
    }
    const base = lt <= rt ? l : r;
    const after = list.filter((o) => (Number(o.at) || 0) > (Number(base.updatedAt) || 0));
    const newer = rt > lt ? r : l;
    out.push({
      ...newer,
      qty: round2(Number(base.qty) + sumDelta(after)),
      updatedAt: Math.max(lt, rt)
    });
    report.reconciled = (report.reconciled || 0) + 1;
  });
  return out;
}
function round2(n2) {
  return Math.round((Number(n2) || 0) * 100) / 100;
}
function mergeAll(local, remote, opts = {}) {
  const fromRole = opts.fromRole || "owner";
  const report = { added: 0, updated: 0, conflicts: [], skipped: [], deduped: 0, reconciled: 0 };
  const collections = {};
  COLLECTIONS.forEach((name2) => {
    const base = local.collections && local.collections[name2] || [];
    if (fromRole === "agent" && !AGENT_ALLOWED.includes(name2)) {
      report.skipped.push(name2);
      collections[name2] = base;
      return;
    }
    let incoming = remote && remote.collections && remote.collections[name2] || [];
    if (name2 === "stocks") {
      const lok = local.collections && local.collections.stockOps || [];
      const rok = remote && remote.collections && remote.collections.stockOps || [];
      const ops = mergeList(lok, rok, "stockOps", report);
      collections.stockOps = ops;
      collections.stocks = reconcileStocks(base, incoming, ops, report);
      return;
    }
    let merged = mergeList(base, incoming, name2, report);
    collections[name2] = merged;
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
function reportText(report) {
  if (!report) return "";
  const parts = [];
  if (report.added) parts.push("新增 " + report.added + " 条");
  if (report.updated) parts.push("更新 " + report.updated + " 条");
  if (report.deduped) parts.push("去重 " + report.deduped + " 条库存");
  if (report.reconciled) parts.push("按流水对账 " + report.reconciled + " 处库存");
  if (report.conflicts.length) parts.push("冲突 " + report.conflicts.length + " 条（保留本地版本）");
  if (report.skipped.length) parts.push("忽略 " + report.skipped.length + " 类无权修改的数据");
  return parts.length ? parts.join("，") : "没有变化，两份数据已经一致";
}
const MATRIX = {
  "product:write": [ROLE.OWNER],
  // 新增/编辑商品（名称、售价、成本、图片、单位）
  "stock:write": [ROLE.OWNER],
  // 盘点、改库存
  /* 分装只在自己的店里：代理能拆自己店的整卷，但动不了店主挂载仓库里的货 */
  "split:store": [ROLE.OWNER, ROLE.AGENT],
  "warehouse:write": [ROLE.OWNER],
  // 新增仓库、调拨
  "agent:write": [ROLE.OWNER],
  // 生成/管理代理店铺
  "store:write": [ROLE.OWNER],
  // 新增店铺
  "order:edit": [ROLE.OWNER],
  // 改价、删除历史订单
  "import:write": [ROLE.OWNER],
  // 从表格导入商品
  "sell": [ROLE.OWNER, ROLE.AGENT],
  // 开单结算
  "hold": [ROLE.OWNER, ROLE.AGENT],
  // 挂单
  "export": [ROLE.OWNER, ROLE.AGENT],
  // 导出 JSON（代理要把单子交回店主）
  "merge": [ROLE.OWNER, ROLE.AGENT],
  // 合并外部 JSON
  "settings:local": [ROLE.OWNER, ROLE.AGENT]
  // 主题/夜间/字号（只影响本机显示）
};
function can(role2, action) {
  const allow2 = MATRIX[action];
  if (!allow2) return false;
  return allow2.indexOf(role2 || ROLE.OWNER) >= 0;
}
function lineCost(line, resolveProduct) {
  let cost = line.cost;
  let other = line.other;
  if ((cost === void 0 || cost === null) && typeof resolveProduct === "function") {
    const p2 = resolveProduct(line.productId) || {};
    cost = p2.cost;
    other = p2.other;
  }
  return r2(((Number(cost) || 0) + (Number(other) || 0)) * (Number(line.qty) || 0));
}
function orderStats(o, resolveProduct) {
  const items = o.items || [];
  const sales = r2(o.total);
  let received = r2(o.received == null ? o.total : o.received);
  if (!o.cashTendered && o.change > 0) {
    received = r2(received - o.change);
  }
  const cost = r2(items.reduce((s, l) => s + lineCost(l, resolveProduct), 0));
  return {
    sales,
    received,
    cost,
    /* 【金额计算】-毛利：毛利 = 实收 − 成本（不是销售额 − 成本）
       eg: 实收 380、成本 200 → 毛利 = 180 元
       eg: 打过折的单：实收 90、成本 95 → 毛利 = -5 元（亏本卖，界面标红） */
    profit: r2(received - cost),
    /* 【金额计算】-件数：件数 = Σ各行数量（不是金额，称重商品是小数）
       eg: 烤肠 14 根 + 贴纸包 14 份 → qty = 28 */
    qty: r2(items.reduce((s, l) => s + (Number(l.qty) || 0), 0)),
    lines: items.length
  };
}
function isBigOrder(o) {
  return (o.items || []).some((l) => (Number(l.qty) || 0) >= 20) || r2(o.total) >= 800;
}
function rangePresets(now2 = Date.now()) {
  return [
    { key: "today", label: "今天", from: startOfDay(now2), to: now2 + 1 },
    { key: "yesterday", label: "昨天", from: startOfDay(now2) - 864e5, to: startOfDay(now2) },
    { key: "week", label: "近 7 天", from: startOfDay(now2) - 6 * 864e5, to: now2 + 1 },
    { key: "month", label: "本月", from: startOfMonth(now2), to: now2 + 1 },
    { key: "year", label: "今年", from: startOfYear(now2), to: now2 + 1 },
    { key: "all", label: "累计", from: 0, to: now2 + 1 }
  ];
}
function filterOrders(orders2, opt = {}) {
  const from = opt.from == null ? 0 : opt.from;
  const to = opt.to == null ? Date.now() + 1 : opt.to;
  return orders2.filter((o) => {
    if (o.at < from || o.at >= to) return false;
    if (opt.storeId && o.storeId !== opt.storeId) return false;
    if (opt.agentId && o.agentId !== opt.agentId) return false;
    if (opt.onlyAgent && !o.agentId) return false;
    if (opt.excludeBig && isBigOrder(o)) return false;
    return true;
  });
}
function summarize(list, resolveProduct) {
  return list.reduce((acc, o) => {
    const s = orderStats(o, resolveProduct);
    acc.sales = r2(acc.sales + s.sales);
    acc.received = r2(acc.received + s.received);
    acc.cost = r2(acc.cost + s.cost);
    acc.profit = r2(acc.profit + s.profit);
    acc.count++;
    return acc;
  }, { sales: 0, received: 0, cost: 0, profit: 0, count: 0 });
}
function topProducts(list, limit = 10) {
  const map = /* @__PURE__ */ new Map();
  list.forEach((o) => {
    (o.items || []).forEach((l) => {
      const key = l.productId || l.name;
      const cur = map.get(key) || { productId: l.productId, name: l.name, unit: l.unit, qty: 0, sales: 0, profit: 0 };
      cur.qty = r2(cur.qty + (Number(l.qty) || 0));
      cur.sales = r2(cur.sales + (Number(l.price) || 0) * (Number(l.qty) || 0));
      cur.profit = r2(cur.profit + ((Number(l.price) || 0) - (Number(l.cost) || 0) - (Number(l.other) || 0)) * (Number(l.qty) || 0));
      map.set(key, cur);
    });
  });
  const rows = Array.from(map.values());
  const bySales = rows.slice().sort((a, b) => b.sales - a.sales);
  return { bySales: bySales.slice(0, limit), rows };
}
function dailySeries(orders2, days = 7, now2 = Date.now()) {
  const start = startOfDay(now2) - (days - 1) * 864e5;
  const buckets = [];
  for (let i = 0; i < days; i++) {
    const day = start + i * 864e5;
    buckets.push({ key: dayKey(day), label: ["日", "一", "二", "三", "四", "五", "六"][new Date(day).getDay()], at: day, value: 0 });
  }
  orders2.forEach((o) => {
    if (o.at < start) return;
    const k = dayKey(o.at);
    const b = buckets.find((x) => x.key === k);
    if (b) b.value = r2(b.value + r2(o.total));
  });
  return buckets;
}
function groupByDay(orders2) {
  const groups = [];
  const map = /* @__PURE__ */ new Map();
  orders2.forEach((o) => {
    const k = dayKey(o.at);
    if (!map.has(k)) {
      map.set(k, { key: k, at: startOfDay(o.at), orders: [] });
      groups.push(map.get(k));
    }
    map.get(k).orders.push(o);
  });
  groups.sort((a, b) => b.at - a.at);
  groups.forEach((g) => g.orders.sort((a, b) => b.at - a.at));
  return groups;
}
const IMP_COLS = [
  "商品名称",
  "售价",
  "商品成本",
  "其他成本",
  "库存",
  "分类",
  "条形码",
  "追溯码",
  "单位",
  "步长",
  "低库存阈值",
  "商品描述",
  "图片链接",
  "分装来源",
  "每卷可拆"
];
const FIELDS = [
  { k: "name", label: "名称", alias: ["商品名称", "名称", "品名", "商品", "货品"] },
  { k: "price", label: "售价", alias: ["售价", "价格", "单价", "销售价", "零售价"] },
  { k: "cost", label: "商品成本", alias: ["商品成本", "成本", "进价", "进货价"] },
  { k: "other", label: "其他成本", alias: ["其他成本", "其他费用", "包装成本", "杂费"] },
  { k: "stock", label: "库存", alias: ["库存", "库存数量", "剩余", "数量"] },
  { k: "cat", label: "分类", alias: ["分类", "类目", "品类", "类别"] },
  { k: "barcode", label: "条形码", alias: ["条形码", "条码", "编码", "sku", "barcode"] },
  /* 追溯码：摊主在自己这套里记一个批次/来源编号，导到别的平台也能对上货是从哪来的 */
  { k: "traceCode", label: "追溯码", alias: ["追溯码", "溯源码", "追溯编号", "批次号", "批次", "tracecode", "trace"] },
  { k: "unit", label: "单位", alias: ["单位", "计量单位", "unit"] },
  { k: "step", label: "步长", alias: ["步长", "最小单位", "精度"] },
  { k: "splitFrom", label: "分装来源", alias: ["分装来源", "来源商品", "整卷商品", "母商品", "父商品"] },
  { k: "splitPer", label: "每卷可拆", alias: ["每卷可拆", "可拆份数", "每卷份数", "拆分份数"] },
  { k: "lowStock", label: "低库存阈值", alias: ["低库存阈值", "低库存", "补货阈值", "库存预警", "预警数量", "安全库存"] },
  { k: "desc", label: "商品描述", alias: ["商品描述", "描述", "商品说明", "备注"] },
  { k: "img", label: "图片链接", alias: ["图片链接", "图片", "图片地址", "img", "image"] }
];
function hkey(s) {
  return String(s == null ? "" : s).replace(/[\s\u3000]/g, "").replace(/[（(\[【].*?[）)\]】]/g, "").replace(/[:：*]/g, "").toLowerCase();
}
function detectMap(header = []) {
  const used = {};
  const out = {};
  const plan = FIELDS.map((f) => ({ k: f.k, alias: f.alias.map(hkey) }));
  plan.forEach((f) => {
    for (let i = 0; i < header.length; i++) {
      if (used[i]) continue;
      const h2 = hkey(header[i]);
      if (h2 && f.alias.indexOf(h2) >= 0) {
        out[f.k] = i;
        used[i] = 1;
        return;
      }
    }
  });
  plan.forEach((f) => {
    if (out[f.k] != null) return;
    for (let i = 0; i < header.length; i++) {
      if (used[i]) continue;
      const h2 = hkey(header[i]);
      if (!h2) continue;
      const al = f.alias.slice().sort((a, b) => b.length - a.length).find((a) => h2.indexOf(a) >= 0);
      if (al) {
        out[f.k] = i;
        used[i] = 1;
        return;
      }
    }
  });
  return out;
}
function findHeader(raw) {
  if (!Array.isArray(raw)) return null;
  for (let i = 0; i < Math.min(raw.length, 6); i++) {
    const map = detectMap(raw[i] || []);
    if (map.name != null && map.price != null) return { idx: i, map };
  }
  return null;
}
function num(v) {
  if (v == null) return NaN;
  const s = String(v).replace(/[¥￥$,\s]/g, "").replace(/(kg|g|ml|米|件|个|份|卷|包|盒|套)$/i, "");
  if (s === "") return NaN;
  const n2 = parseFloat(s);
  return isFinite(n2) ? n2 : NaN;
}
function buildRows(raw, hIdx, map) {
  const out = [];
  for (let r = hIdx + 1; r < raw.length; r++) {
    const cells = raw[r] || [];
    const txt = (c) => String(c == null ? "" : c).trim();
    if (!cells.some((c) => txt(c) !== "")) continue;
    const g = (k) => map[k] == null ? "" : txt(cells[map[k]]);
    const name2 = g("name");
    const price = num(g("price"));
    const errs = [];
    if (!name2) errs.push("缺名称");
    if (!isFinite(price) || price <= 0) errs.push("售价不是正数");
    const unit = g("unit") || "件";
    out.push({
      line: r + 1,
      name: name2,
      price,
      cost: num(g("cost")),
      other: num(g("other")),
      stock: num(g("stock")),
      unit,
      step: num(g("step")),
      cat: g("cat"),
      barcode: g("barcode"),
      traceCode: g("traceCode"),
      splitFrom: g("splitFrom"),
      splitPer: Math.round(num(g("splitPer")) || 0),
      /* 阈值缺省 5：和商品编辑页默认一致；0 表示不提醒 */
      lowStock: isFinite(num(g("lowStock"))) ? Math.max(0, num(g("lowStock"))) : 5,
      desc: g("desc"),
      img: g("img"),
      errs
    });
  }
  return out;
}
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  const src = String(text || "").replace(/^\uFEFF/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else quoted = false;
      } else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (c !== "\r") cell += c;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}
function csvCell(v) {
  const s = String(v == null ? "" : v);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function toCSV(rows) {
  return "\uFEFF" + rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
}
function downloadText(name2, text, mime = "text/csv;charset=utf-8") {
  try {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name2;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4e3);
    return true;
  } catch (e) {
    return false;
  }
}
function templateCSV() {
  return toCSV([
    IMP_COLS,
    ["街景胶带整卷", "16.80", "8.00", "0.40", "3", "胶带", "690000000001", "卷", "1", "5", "", "", "", ""],
    ["街景胶带分装2循", "3.50", "1.60", "0.10", "10", "胶带", "690000000002", "份", "1", "10", "", "", "街景胶带整卷", "5"],
    ["散装和纸胶带", "120.00", "58.00", "0.00", "3.20", "散装/称重", "", "kg", "0.01", "2", "按顾客要的长度现称", "", "", ""]
  ]);
}
function productsToCSV(products2, categories2, stocks, storeId) {
  const rows = [[...IMP_COLS]];
  products2.forEach((p2) => {
    const cat = (categories2.find((c) => c.id === p2.cat) || {}).name || "";
    const src = p2.splitFrom ? (products2.find((x) => x.id === p2.splitFrom) || {}).name || "" : "";
    const qty = stocks.find((s) => s.productId === p2.id && s.locType === "store" && s.locId === storeId);
    rows.push([
      p2.name,
      Number(p2.price || 0).toFixed(2),
      Number(p2.cost || 0).toFixed(2),
      Number(p2.other || 0).toFixed(2),
      qty ? qty.qty : 0,
      cat,
      p2.barcode || "",
      p2.traceCode || "",
      p2.unit || "件",
      p2.step || 1,
      /* 顺序必须和 IMP_COLS 一模一样，否则导回去会串列 */
      Number.isFinite(Number(p2.lowStock)) ? Number(p2.lowStock) : 5,
      p2.desc || "",
      p2.img || "",
      src,
      p2.splitFrom ? p2.splitPer || 0 : ""
    ]);
  });
  return toCSV(rows);
}
const XLSX_SRC = [
  "https://fastly.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
];
let xlsxPromise = null;
function loadXLSX() {
  if (window.XLSX) return Promise.resolve(window.XLSX);
  if (xlsxPromise) return xlsxPromise;
  xlsxPromise = new Promise((resolve2, reject) => {
    let i = 0;
    const next = () => {
      if (i >= XLSX_SRC.length) {
        reject(new Error("xlsx-unavailable"));
        return;
      }
      const s = document.createElement("script");
      s.src = XLSX_SRC[i++];
      s.onload = () => window.XLSX ? resolve2(window.XLSX) : next();
      s.onerror = next;
      document.head.appendChild(s);
    };
    next();
  });
  return xlsxPromise;
}
async function readTableFile(file) {
  const isCSV = /\.csv$/i.test(file.name);
  if (isCSV) return { raw: parseCSV(await file.text()), kind: "csv" };
  const X = await loadXLSX();
  const buf = await file.arrayBuffer();
  const wb = X.read(new Uint8Array(buf), { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  if (!ws) throw new Error("empty-workbook");
  const raw = X.utils.sheet_to_json(ws, { header: 1, blankrows: false, defval: "", raw: false });
  return { raw, kind: "xlsx" };
}
const emptyCollections = () => COLLECTIONS.reduce((acc, k) => {
  acc[k] = [];
  return acc;
}, {});
const state = /* @__PURE__ */ reactive({
  ready: false,
  storageKind: "",
  storageLabel: "",
  storageErrors: [],
  collections: emptyCollections(),
  settings: defaultSettings(),
  meta: defaultMeta(),
  syncing: false,
  /** 代理链接打开但本机没有任何店铺数据时为 true：界面显示引导而不是空账本 */
  agentNoData: false,
  /** 链接里的代理编号在本机数据里找不到时的提示 */
  agentCodeError: "",
  /** 本机当前以什么身份看这份数据：owner / agent（同一台设备可以随时切） */
  viewRole: ROLE.OWNER,
  viewAgentId: ""
});
const activeStore = computed(() => {
  return state.collections.stores.find((s) => s.id === state.meta.activeStoreId) || stores.value[0] || null;
});
const role = computed(() => state.viewRole || ROLE.OWNER);
const isAgent = computed(() => role.value === ROLE.AGENT);
const showCost = computed(() => !!state.settings.showCost && !isAgent.value);
const products = computed(() => {
  const sid = activeStore.value ? activeStore.value.id : "";
  if (!sid) return state.collections.products;
  const all = state.collections.products;
  const own = all.filter((p2) => p2.storeId === sid);
  const whIds = storeWarehouseIds.value;
  const sharedIds = new Set(
    state.collections.stocks.filter((s) => r2(s.qty) > 0).filter(
      (s) => s.locType === "warehouse" && whIds.includes(s.locId) || /* 挂载仓里有货 */
      s.locType === "store" && s.locId === sid
      /* 或已经调拨进本店 */
    ).map((s) => s.productId)
  );
  if (!sharedIds.size) return own;
  const agentStoreIds = new Set(
    state.collections.stores.filter((x) => x.asAgent).map((x) => x.id)
  );
  const shared = all.filter(
    (p2) => p2.storeId !== sid && sharedIds.has(p2.id) && !agentStoreIds.has(p2.storeId)
  );
  return own.concat(shared);
});
const storeWarehouseIds = computed(() => {
  const st = activeStore.value;
  if (!st) return [];
  const all = state.collections.warehouses;
  return (st.warehouseIds || []).filter((id) => all.some((w) => w.id === id));
});
const categories = computed(() => {
  const sid = activeStore.value ? activeStore.value.id : "";
  return state.collections.categories.filter((c) => {
    if (!c.storeIds || !c.storeIds.length) return true;
    return sid ? c.storeIds.includes(sid) : true;
  }).slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
});
const warehouses = computed(() => state.collections.warehouses);
const productShares = computed(() => {
  const map = {};
  const whs = state.collections.warehouses;
  const stocks = state.collections.stocks;
  state.collections.stores.forEach((st) => {
    (st.warehouseIds || []).forEach((wid) => {
      const rows = stocks.filter((s) => s.locType === "warehouse" && s.locId === wid && r2(s.qty) !== 0);
      rows.forEach((row) => {
        const p2 = state.collections.products.find((x) => x.id === row.productId);
        if (!p2 || !p2.storeId || p2.storeId === st.id) return;
        const wh = whs.find((w) => w.id === wid);
        const label = st.name + "·" + (wh && wh.name || "仓库");
        if (!map[p2.id]) map[p2.id] = [];
        if (!map[p2.id].includes(label)) map[p2.id].push(label);
      });
    });
  });
  return map;
});
const agents = computed(() => state.collections.agents);
const orders = computed(() => state.collections.orders);
const holds = computed(() => state.collections.holds.filter((h2) => h2.storeId === (activeStore.value && activeStore.value.id) && !h2.closed));
const stores = computed(() => state.collections.stores);
const logs = computed(() => state.collections.logs);
const agentProfile = computed(() => {
  if (!isAgent.value) return null;
  return state.collections.agents.find((a) => a.id === state.viewAgentId) || null;
});
const IDENTITY_KEY = "stall3:identity";
function readLocalIdentity() {
  try {
    return window.localStorage.getItem(IDENTITY_KEY) || "";
  } catch (e) {
    return "";
  }
}
function writeLocalIdentity(v) {
  try {
    if (v) window.localStorage.setItem(IDENTITY_KEY, v);
    else window.localStorage.removeItem(IDENTITY_KEY);
  } catch (e) {
  }
}
function applyIdentity(agentId) {
  const agent = agentId ? state.collections.agents.find((a) => a.id === agentId) : null;
  if (agent) {
    state.viewRole = ROLE.AGENT;
    state.viewAgentId = agent.id;
    if (agent.parentStoreId) state.meta.activeStoreId = agent.parentStoreId;
  } else {
    state.viewRole = ROLE.OWNER;
    state.viewAgentId = "";
    const own = state.collections.stores.find((x) => x.mine) || state.collections.stores.find((x) => !x.asAgent) || null;
    if (own) state.meta.activeStoreId = own.id;
  }
  state.meta.role = state.viewRole;
  state.meta.agentId = state.viewAgentId;
  touch("meta");
}
const identities = computed(() => {
  const list = [{
    id: "",
    kind: "owner",
    name: state.settings.shopName || "我的小摊",
    sub: "店主 · 可以改商品、库存、分类",
    storeId: ""
  }];
  state.collections.agents.forEach((a) => {
    const st = state.collections.stores.find((x) => x.id === a.parentStoreId);
    list.push({
      id: a.id,
      kind: "agent",
      name: a.name || a.code,
      sub: "代卖点 · " + (st ? st.name : "未知店铺") + " · 看不到成本毛利",
      storeId: a.parentStoreId || ""
    });
  });
  return list;
});
const currentIdentity = computed(() => isAgent.value ? state.viewAgentId : "");
function switchIdentity(id) {
  const target = id || "";
  if (target && !state.collections.agents.some((a) => a.id === target)) {
    tip("找不到这个代理");
    return false;
  }
  applyIdentity(target);
  writeLocalIdentity(target);
  const who = target ? agentProfileName(target) || "代理" : "店主";
  tip("已切换为" + who + "视角");
  return true;
}
function agentProfileName(id) {
  const a = state.collections.agents.find((x) => x.id === id);
  return a ? a.name : "";
}
function catName(id) {
  const c = state.collections.categories.find((x) => x.id === id);
  return c ? c.name : "未分类";
}
const categoryTree = computed(() => {
  const all = categories.value;
  return all.filter((c) => !c.parentId).map((c) => ({
    ...c,
    children: all.filter((x) => x.parentId === c.id)
  }));
});
function productsInCategory(catId, list) {
  const kids = state.collections.categories.filter((c) => c.parentId === catId).map((c) => c.id);
  const ids = [catId, ...kids];
  return (list || state.collections.products).filter((p2) => ids.includes(p2.cat));
}
function saveCategory({ id, name: name2, parentId }) {
  if (!allow("product:write")) {
    tip("代理不能改分类");
    return null;
  }
  const n2 = String(name2 || "").trim();
  if (!n2) {
    tip("分类名不能空");
    return null;
  }
  const visible = categories.value;
  if (visible.some((c) => c.id !== id && c.name === n2 && (c.parentId || "") === (parentId || ""))) {
    tip("同一级里已经有这个分类了");
    return null;
  }
  const sid = activeStore.value ? activeStore.value.id : "";
  if (id) {
    const c = state.collections.categories.find((x) => x.id === id);
    if (!c) return null;
    c.name = n2;
    c.parentId = parentId || "";
    if (!c.storeIds || !c.storeIds.length) c.storeIds = sid ? [sid] : [];
    c.updatedAt = Date.now();
  } else {
    const rec = {
      id: newId("c"),
      name: n2,
      parentId: parentId || "",
      /* 分类归当前店铺：别的店看不到，也不会被别的店改名 */
      storeIds: sid ? [sid] : [],
      sort: categories.value.length + 1,
      updatedAt: Date.now()
    };
    state.collections.categories.push(rec);
    touch("categories");
    addLog("edit", "新建分类「" + n2 + "」" + (parentId ? "（二级）" : ""));
    return rec;
  }
  touch("categories");
  return null;
}
function setProductCategory(productId, catId) {
  if (!allow("product:write")) {
    tip("代理不能改分类");
    return false;
  }
  const p2 = productById(productId);
  if (!p2) return false;
  p2.cat = catId || "";
  p2.updatedAt = Date.now();
  touch("products");
  addLog("edit", "把「" + p2.name + "」归到「" + (catId ? catName(catId) : "未分类") + "」");
  return true;
}
function reorderCategory(id, targetId, before = true) {
  const visibleIds = new Set(categories.value.map((c) => c.id));
  const all = state.collections.categories.filter((c) => visibleIds.has(c.id));
  const moving = all.find((c) => c.id === id);
  const target = all.find((c) => c.id === targetId);
  if (!moving || !target || moving.id === target.id) return false;
  if ((moving.parentId || "") !== (target.parentId || "")) {
    tip("只能和同一级的分类调换顺序");
    return false;
  }
  const group = all.filter((c) => (c.parentId || "") === (moving.parentId || "")).sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const from = group.findIndex((c) => c.id === id);
  if (from < 0) return false;
  group.splice(from, 1);
  let to = group.findIndex((c) => c.id === targetId);
  if (to < 0) to = group.length;
  if (!before) to += 1;
  group.splice(Math.max(0, Math.min(to, group.length)), 0, moving);
  if (!moving.parentId) {
    let n2 = 1;
    group.forEach((p2) => {
      p2.sort = n2++;
      p2.updatedAt = Date.now();
      all.filter((c) => c.parentId === p2.id).sort((a, b) => (a.sort || 0) - (b.sort || 0)).forEach((k) => {
        k.sort = n2++;
        k.updatedAt = Date.now();
      });
    });
  } else {
    group.forEach((c, i) => {
      c.sort = i + 1;
      c.updatedAt = Date.now();
    });
  }
  touch("categories");
  return true;
}
function deleteCategory(id) {
  if (!allow("product:write")) {
    tip("代理不能改分类");
    return false;
  }
  const hasChild = state.collections.categories.some((c) => c.parentId === id);
  if (hasChild) {
    tip("先删掉它下面的二级分类");
    return false;
  }
  const used = state.collections.products.filter((p2) => p2.cat === id);
  if (used.length) {
    tip("还有 " + used.length + " 个商品在这个分类里");
    return false;
  }
  state.collections.categories = state.collections.categories.filter((c) => c.id !== id);
  touch("categories");
  addLog("edit", "删除分类「" + catName(id) + "」");
  return true;
}
function productById(id) {
  return state.collections.products.find((p2) => p2.id === id);
}
function storeStockOf(productId) {
  const sid = activeStore.value && activeStore.value.id;
  return sid ? storeQty(state.collections.stocks, productId, sid) : 0;
}
function totalStockOf(productId) {
  const sid = activeStore.value ? activeStore.value.id : "";
  const stocks = state.collections.stocks;
  const inStore = sid ? storeQty(stocks, productId, sid) : 0;
  const inWh = storeWarehouseIds.value.reduce((sum, wid) => sum + whQty(stocks, productId, wid), 0);
  return r2(inStore + inWh);
}
function allow(action) {
  return can(role.value, action);
}
const toasts = /* @__PURE__ */ reactive([]);
let toastSeq = 0;
function guessToastType(msg) {
  const t2 = String(msg);
  if (/不能|失败|不够|要大于|错误|不支持|没有|先|拒绝|异常/.test(t2)) return "error";
  if (/已|成功|完成|保存|复制|同步/.test(t2)) return "success";
  return "info";
}
function tip(msg, type) {
  const text = String(msg);
  const kind = type || guessToastType(text);
  console.log("[tip:" + kind + "]", text);
  const item = { id: ++toastSeq, msg: text, type: kind };
  toasts.push(item);
  if (toasts.length > 2) toasts.shift();
  setTimeout(() => {
    const i = toasts.findIndex((x) => x.id === item.id);
    if (i > -1) toasts.splice(i, 1);
  }, kind === "error" ? 2800 : 2e3);
  return item.id;
}
function speak$1(text, force) {
  if (!force && !state.settings.voice) return;
  try {
    if (!("speechSynthesis" in window)) {
      tip("这台设备不支持语音播报");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = "zh-CN";
    u.rate = 1.05;
    u.onend = () => {
    };
    u.onerror = (e) => tip("语音播报失败：" + (e.error || "未知错误"));
    window.speechSynthesis.speak(u);
  } catch (e) {
    tip("语音播报异常：" + (e && e.message ? e.message : e));
  }
}
const dirty = /* @__PURE__ */ new Set();
let flushTimer = null;
function touch(...names) {
  names.forEach((n2) => dirty.add(n2));
  clearTimeout(flushTimer);
  flushTimer = setTimeout(flush, 250);
}
async function flush() {
  clearTimeout(flushTimer);
  if (!state.ready) return;
  const jobs = Array.from(dirty);
  dirty.clear();
  const plain = (v) => {
    try {
      return JSON.parse(JSON.stringify(v));
    } catch (e) {
      return v;
    }
  };
  for (const name2 of jobs) {
    try {
      if (name2 === "settings") await storage.write("settings", plain(state.settings));
      else if (name2 === "meta") await storage.write("meta", plain(state.meta));
      else await storage.write(name2, plain(state.collections[name2] || []));
    } catch (e) {
      dirty.add(name2);
      console.warn("[flush] 写入失败", name2, e);
    }
  }
}
async function initApp(opts = {}) {
  const agentCode = (opts.agentCode || "").trim().toUpperCase();
  const adapter = await initStorage({ dbName: currentDbName() });
  state.storageKind = adapter.kind;
  state.storageLabel = adapter.label;
  state.storageErrors = storageErrors.slice();
  const loaded = emptyCollections();
  for (const name2 of COLLECTIONS) {
    const rows = await storage.read(name2);
    loaded[name2] = Array.isArray(rows) ? rows : [];
  }
  const settings = await storage.read("settings") || null;
  const meta = await storage.read("meta") || null;
  const isEmpty2 = COLLECTIONS.every((n2) => loaded[n2].length === 0);
  let snapPack = null;
  if (agentCode) {
    const raw = new URLSearchParams(location.search).get("s");
    if (raw) {
      try {
        snapPack = decodeSnap(raw);
      } catch (e) {
        state.storageErrors.push("链接数据包解析失败：" + (e && e.message ? e.message : e));
      }
    }
  }
  if (snapPack) {
    const agentName = snapPack.meta && snapPack.meta.storeName || "代理店铺";
    const newPid = addProfile(agentName + "的店");
    switchProfile(newPid);
    await initStorage({ dbName: "stall3_" + newPid });
    const fresh = emptyCollections();
    for (const name2 of COLLECTIONS) fresh[name2] = [];
    const c = snapPack.collections || {};
    for (const name2 of COLLECTIONS) {
      if (Array.isArray(c[name2])) fresh[name2] = c[name2];
    }
    state.collections = fresh;
    state.settings = { ...defaultSettings(), ...snapPack.settings || {} };
    state.meta = { ...defaultMeta(), ...snapPack.meta || {}, role: ROLE.AGENT, agentId: "", activeStoreId: "" };
    state.ready = true;
    COLLECTIONS.forEach((n2) => {
      if (c[n2]) dirty.add(n2);
    });
    dirty.add("settings");
    dirty.add("meta");
    await flush();
  } else if (agentCode && isEmpty2) {
    state.collections = loaded;
    state.settings = { ...defaultSettings(), ...settings || {} };
    state.meta = { ...defaultMeta(), ...meta || {}, role: ROLE.AGENT, agentId: "", activeStoreId: "" };
    state.ready = true;
    state.agentNoData = true;
  } else if (isEmpty2 && !settings) {
    const seed = seedData();
    Object.assign(loaded, seed.collections);
    state.collections = loaded;
    state.settings = { ...defaultSettings(), ...seed.settings };
    state.meta = { ...defaultMeta(), ...seed.meta, deviceId: "dev-" + Math.random().toString(36).slice(2, 8) };
    state.ready = true;
    COLLECTIONS.forEach((n2) => dirty.add(n2));
    dirty.add("settings");
    dirty.add("meta");
    await flush();
  } else {
    state.collections = loaded;
    state.settings = { ...defaultSettings(), ...settings || {} };
    state.meta = { ...defaultMeta(), ...meta || {} };
    state.ready = true;
  }
  if (agentCode && !state.agentNoData) {
    const found = state.collections.agents.find((a) => a.code === agentCode) || (state.collections.agents.length === 1 ? state.collections.agents[0] : null);
    if (found) {
      applyIdentity(found.id);
      writeLocalIdentity(found.id);
      state.agentCodeError = "";
    } else {
      state.agentCodeError = "本机数据里没有编号 " + agentCode + " 的代理";
    }
  } else if (!state.agentNoData) {
    let identity = readLocalIdentity();
    if (identity && !state.collections.agents.some((a) => a.id === identity)) identity = "";
    applyIdentity(identity);
  }
  try {
    const boot = await storage.read("boot");
    if (boot && boot.seed) {
      await consumeBootPackage(boot);
      await storage.remove("boot");
    }
  } catch (e) {
    console.warn("[boot] 引导包处理失败", e);
  }
  if (!state.meta.activeStoreId || !state.collections.stores.some((s) => s.id === state.meta.activeStoreId)) {
    const first = state.collections.stores[0];
    state.meta.activeStoreId = first ? first.id : "";
    touch("meta");
  }
  assignCategoryStores();
  assignProductStores();
  assignWarehouseOwners();
  assignAgentStores();
  pruneStockOps();
  backfillOrderCosts();
  ensureStoreCategories();
  if (dirty.size) await flush();
  return state;
}
function assignCategoryStores() {
  const st = activeStore.value || state.collections.stores[0];
  if (!st) return;
  let changed = false;
  state.collections.categories.forEach((c) => {
    if (!c.storeIds || !c.storeIds.length) {
      c.storeIds = [st.id];
      changed = true;
    }
  });
  if (changed) dirty.add("categories");
}
function ensureStoreCategories() {
  let changed = false;
  state.collections.stores.forEach((st) => {
    const used = new Set(
      state.collections.products.filter((p2) => p2.storeId === st.id && p2.cat).map((p2) => p2.cat)
    );
    if (!used.size) return;
    state.collections.categories.forEach((c) => {
      if (!used.has(c.id)) return;
      if (!c.storeIds) c.storeIds = [];
      if (!c.storeIds.includes(st.id)) {
        c.storeIds.push(st.id);
        changed = true;
      }
    });
  });
  if (changed) dirty.add("categories");
}
function assignWarehouseOwners() {
  let changed = false;
  state.collections.warehouses.forEach((w) => {
    if (!w.ownerId) {
      w.ownerId = state.meta.deviceId || "local";
      changed = true;
    }
  });
  if (changed) dirty.add("warehouses");
}
function pruneStockOps() {
  const ops = state.collections.stockOps || [];
  const cut = Date.now() - 90 * 24 * 3600 * 1e3;
  let next = ops.filter((o) => (Number(o.at) || 0) >= cut);
  if (next.length > 4e3) next = next.slice(-4e3);
  if (next.length !== ops.length) {
    state.collections.stockOps = next;
    dirty.add("stockOps");
  }
}
function backfillOrderCosts() {
  let changed = 0;
  (state.collections.orders || []).forEach((o) => {
    (o.items || []).forEach((l) => {
      if (l.cost !== void 0 && l.other !== void 0) return;
      const p2 = state.collections.products.find((x) => x.id === l.productId);
      if (!p2) return;
      if (l.cost === void 0) l.cost = p2.cost || 0;
      if (l.other === void 0) l.other = p2.other || 0;
      changed++;
    });
  });
  if (changed) {
    state.collections.orders.forEach((o) => {
      o.updatedAt = o.updatedAt || Date.now();
    });
    dirty.add("orders");
  }
}
function assignAgentStores() {
  const c = state.collections;
  const st = activeStore.value || c.stores[0];
  if (!c.agents.length) return;
  let changed = false;
  c.agents.forEach((a) => {
    if (a.parentStoreId) return;
    const o = (c.orders || []).find((x) => x.agentId === a.id && x.storeId);
    const storeId = o && o.storeId || (st ? st.id : "");
    if (storeId) {
      a.parentStoreId = storeId;
      changed = true;
    }
  });
  if (changed) {
    dirty.add("agents");
    c.agents.forEach((a) => {
      a.updatedAt = a.updatedAt || Date.now();
    });
  }
}
function assignProductStores() {
  const st = activeStore.value || state.collections.stores[0];
  if (!st) return;
  let changed = false;
  state.collections.products.forEach((p2) => {
    if (!p2.storeId && !p2.parked) {
      p2.storeId = st.id;
      changed = true;
    }
  });
  if (changed) dirty.add("products");
}
async function consumeBootPackage(boot) {
  const merged = mergeAll(
    { collections: state.collections, settings: state.settings, meta: state.meta },
    boot.seed,
    { fromRole: "owner" }
  );
  state.collections = merged.collections;
  state.settings = { ...state.settings, ...boot.seed.settings || {} };
  const bootAgentId = boot.agent && boot.agent.id ? boot.agent.id : state.meta.agentId;
  applyIdentity(bootAgentId);
  if (bootAgentId) writeLocalIdentity(bootAgentId);
  state.meta.activeStoreId = boot.seed.meta && boot.seed.meta.activeStoreId || state.meta.activeStoreId;
  COLLECTIONS.forEach((n2) => dirty.add(n2));
  dirty.add("settings");
  dirty.add("meta");
  await flush();
}
function deleteDB(name2) {
  return new Promise((resolve2) => {
    try {
      const req = indexedDB.deleteDatabase(name2);
      req.onsuccess = () => resolve2(true);
      req.onerror = () => resolve2(false);
      req.onblocked = () => resolve2(false);
    } catch (e) {
      resolve2(false);
    }
  });
}
async function wipeIndexedDBAll() {
  try {
    await storage.close();
  } catch (e) {
  }
  if (window.indexedDB && indexedDB.databases) {
    try {
      const names = (await indexedDB.databases()).map((d) => d.name).filter(Boolean);
      const targets = names.filter((n2) => n2 === "stall3" || n2.indexOf("stall3") === 0);
      if (targets.length) {
        const results = await Promise.all(targets.map((n2) => deleteDB(n2)));
        return results.some(Boolean) || targets.length === 0;
      }
    } catch (e) {
    }
  }
  return wipeIndexedDB();
}
function wipeIndexedDB() {
  return new Promise((resolve2) => {
    try {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains("docs")) db.createObjectStore("docs");
      };
      req.onsuccess = () => {
        const db = req.result;
        try {
          const tx = db.transaction("docs", "readwrite");
          tx.objectStore("docs").clear();
          tx.oncomplete = () => {
            db.close();
            resolve2(true);
          };
          tx.onerror = () => {
            db.close();
            resolve2(false);
          };
          tx.onabort = () => {
            db.close();
            resolve2(false);
          };
        } catch (e) {
          db.close();
          resolve2(false);
        }
      };
      req.onerror = () => resolve2(false);
      req.onblocked = () => resolve2(false);
    } catch (e) {
      resolve2(false);
    }
  });
}
function wipeLocalStorage() {
  try {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.indexOf("stall3:") === 0) keys.push(k);
    }
    keys.forEach((k) => window.localStorage.removeItem(k));
    return true;
  } catch (e) {
    return false;
  }
}
async function clearStoreData(kind) {
  let ok = true;
  {
    const dbOk = await wipeIndexedDBAll();
    wipeLocalStorage();
    ok = dbOk;
  }
  if (!ok) {
    tip("清空失败：可能还有别的标签页占着这个库");
    return false;
  }
  {
    state.collections = emptyCollections();
    state.settings = defaultSettings();
    state.meta = defaultMeta();
  }
  return true;
}
function setSetting(key, value) {
  state.settings[key] = value;
  state.settings.updatedAt = Date.now();
  touch("settings");
}
function addLog(type, text, extra) {
  const e = extra || {};
  const agentId = isAgent.value ? state.meta.agentId : "";
  const agentRec = agentId ? state.collections.agents.find((a) => a.id === agentId) : null;
  const rec = {
    id: newId("l"),
    at: Date.now(),
    type,
    text,
    storeId: e.storeId !== void 0 ? e.storeId : activeStore.value ? activeStore.value.id : "",
    warehouseId: e.warehouseId || "",
    refId: e.refId || "",
    deviceId: e.deviceId || (state.meta.deviceId || ""),
    operatorId: e.operatorId !== void 0 ? e.operatorId : agentId,
    operatorName: e.operatorName || (agentRec ? agentRec.name || agentRec.code || "代理" : state.settings.shopName || "店主"),
    operatorRole: e.operatorRole || (agentId ? "agent" : "owner"),
    updatedAt: Date.now()
  };
  state.collections.logs.unshift(rec);
  if (state.collections.logs.length > 120) state.collections.logs.length = 120;
  touch("logs");
}
function saveProduct(payload, id) {
  if (!allow("product:write")) {
    tip("代理模式不能改商品");
    return false;
  }
  const name2 = String(payload.name || "").trim();
  if (!name2) {
    tip("商品名称不能空");
    return false;
  }
  if (!(Number(payload.price) > 0)) {
    tip("售价要大于 0");
    return false;
  }
  let p2 = id ? productById(id) : null;
  if (!p2) {
    p2 = {
      id: newId("p"),
      name: "",
      price: 0,
      cost: 0,
      other: 0,
      unit: "件",
      step: 1,
      cat: "",
      barcode: "",
      traceCode: "",
      motif: "tape",
      img: "",
      splitFrom: "",
      splitPer: 0,
      lowStock: 5,
      /* 新建商品落在当前店铺的商品库；之后切店不会跟着跑 */
      storeId: activeStore.value ? activeStore.value.id : "",
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    state.collections.products.push(p2);
  }
  Object.assign(p2, {
    name: name2,
    price: r2(payload.price),
    cost: r2(payload.cost || 0),
    other: r2(payload.other || 0),
    unit: payload.unit || "件",
    step: Number(payload.step) > 0 ? Number(payload.step) : 1,
    cat: payload.cat || "",
    barcode: payload.barcode || "",
    /* 追溯码：批次/来源编号，摊主自己看得懂就行，别处平台也能对上这款货的来历 */
    traceCode: payload.traceCode || "",
    motif: payload.motif || "tape",
    img: payload.img || p2.img || "",
    splitFrom: payload.splitFrom || "",
    splitPer: payload.splitFrom ? Math.max(2, Number(payload.splitPer) || 2) : 0,
    desc: payload.desc || "",
    /* 低库存阈值：每个商品自己的预警线，库存 ≤ 这个值就提示补货 */
    lowStock: Number.isFinite(Number(payload.lowStock)) ? Math.max(0, Number(payload.lowStock)) : 5,
    updatedAt: Date.now()
  });
  touch("products");
  addLog("product", (id ? "修改商品：" : "新增商品：") + name2 + "（" + money(p2.price) + "/" + p2.unit + "）");
  return p2.id;
}
function deleteProduct(id) {
  if (!allow("product:write")) {
    tip("代理模式不能删商品");
    return false;
  }
  const p2 = productById(id);
  if (!p2) return false;
  state.collections.products = state.collections.products.filter((x) => x.id !== id);
  state.collections.stocks = state.collections.stocks.filter((s) => s.productId !== id);
  touch("products", "stocks");
  addLog("product", "删除商品：" + p2.name);
  return true;
}
function saveWarehouse(payload, id) {
  if (!allow("warehouse:write")) {
    tip("代理模式不能管仓库");
    return false;
  }
  if (activeStore.value && activeStore.value.asAgent) {
    tip("这是别人的店，你只是代卖，不能在这里建仓 / 挂仓", "error");
    return false;
  }
  const name2 = String(payload.name || "").trim();
  if (!name2) {
    tip("仓库名不能空");
    return false;
  }
  let w = state.collections.warehouses.find((x) => x.id === id);
  if (!w) {
    w = { id: newId("w"), name: name2, note: "", ownerId: state.meta.deviceId || "local", createdAt: Date.now(), updatedAt: Date.now() };
    state.collections.warehouses.push(w);
    const st = activeStore.value;
    if (st && !st.warehouseIds.includes(w.id)) {
      st.warehouseIds = [...st.warehouseIds || [], w.id];
      st.updatedAt = Date.now();
      touch("stores");
    }
  }
  w.name = name2;
  w.note = payload.note || "";
  w.updatedAt = Date.now();
  touch("warehouses");
  addLog("warehouse", "新增仓库：" + name2);
  return true;
}
async function deleteWarehouse(whId) {
  if (!allow("warehouse:write")) {
    tip("代理不能删仓库");
    return false;
  }
  const c = state.collections;
  const w = c.warehouses.find((x) => x.id === whId);
  if (!w) {
    tip("找不到这个仓库");
    return false;
  }
  const me = state.meta.deviceId || "local";
  if ((w.ownerId || me) !== me) {
    tip("这个仓库属于别人，只能看不能删", "error");
    return false;
  }
  const mountedBy = c.stores.filter((s) => (s.warehouseIds || []).includes(whId));
  if (mountedBy.length) {
    tip("还有 " + mountedBy.map((s) => s.name).join("、") + " 挂着这个仓库，先取消挂载再删", "error");
    return false;
  }
  const rows = c.stocks.filter((s) => s.locType === "warehouse" && s.locId === whId && r2(s.qty) !== 0);
  c.stocks = c.stocks.filter((s) => !(s.locType === "warehouse" && s.locId === whId));
  c.warehouses = c.warehouses.filter((x) => x.id !== whId);
  touch("warehouses", "stocks");
  addLog("warehouse", "删除仓库「" + w.name + "」" + (rows.length ? "（清掉 " + rows.length + " 条库存行）" : ""), { warehouseId: whId });
  return true;
}
function storesUsingWarehouse(whId) {
  return state.collections.stores.filter((s) => (s.warehouseIds || []).includes(whId));
}
function warehouseOwnerText(w) {
  const me = state.meta.deviceId || "local";
  return (w.ownerId || me) === me ? "我建的" : "别人建的（" + (w.ownerName || "其他设备") + "）";
}
function locInScope(locType, locId) {
  const st = activeStore.value;
  if (!st) return false;
  if (locType === "store") return locId === st.id;
  if (locType === "warehouse") return storeWarehouseIds.value.includes(locId);
  return false;
}
function pushStockOp(productId, locType, locId, delta, reason = "", refId = "") {
  const d = r2(delta);
  if (!d) return;
  state.collections.stockOps.push({
    id: newId("so"),
    productId,
    locType,
    locId,
    delta: d,
    reason,
    refId,
    at: Date.now(),
    updatedAt: Date.now()
  });
  touch("stockOps");
}
function setStock(productId, locType, locId, qty) {
  if (!allow("stock:write")) {
    tip("代理模式不能改库存");
    return false;
  }
  if (!locInScope(locType, locId)) {
    tip(locType === "warehouse" ? "这个仓库没挂到当前店铺，先去仓库页挂上" : "只能改当前店铺的库存", "error");
    return false;
  }
  const p2 = productById(productId);
  const before = qtyAt(state.collections.stocks, productId, locType, locId);
  setQty(state.collections.stocks, productId, locType, locId, r2(qty));
  pushStockOp(productId, locType, locId, r2(qty) - before, "count");
  touch("stocks");
  addLog(
    "stock",
    "改库存：" + (p2 ? p2.name : productId) + " → " + r2(qty) + (p2 ? p2.unit : ""),
    { warehouseId: locType === "warehouse" ? locId : "", refId: productId }
  );
  return true;
}
function transferToStore(productId, whId, qty) {
  if (!allow("warehouse:write")) {
    tip("代理模式不能调拨");
    return false;
  }
  const store = activeStore.value;
  if (!store) return false;
  if (!storeWarehouseIds.value.includes(whId)) {
    tip("这个仓库没挂到当前店铺，调不了货", "error");
    return false;
  }
  const res = transfer(
    state.collections.stocks,
    productId,
    { type: "warehouse", id: whId },
    { type: "store", id: store.id },
    qty
  );
  if (!res.ok) {
    tip(res.msg);
    return false;
  }
  touch("stocks");
  const p2 = productById(productId);
  pushStockOp(productId, "warehouse", whId, -r2(qty), "transfer-out");
  pushStockOp(productId, "store", store.id, r2(qty), "transfer-in");
  addLog(
    "stock",
    "调拨：「" + (state.collections.warehouses.find((w) => w.id === whId) || {}).name + "」→「" + store.name + "」" + (p2 ? p2.name : "") + " +" + r2(qty) + (p2 ? p2.unit : ""),
    { warehouseId: whId, refId: productId }
  );
  return true;
}
function shareWarehouseCategories(whId) {
  const st = activeStore.value;
  if (!st) return 0;
  const stocks = state.collections.stocks.filter(
    (s) => s.locType === "warehouse" && s.locId === whId && r2(s.qty) > 0
  );
  const catIds = /* @__PURE__ */ new Set();
  stocks.forEach((s) => {
    const p2 = state.collections.products.find((x) => x.id === s.productId);
    if (p2 && p2.cat) catIds.add(p2.cat);
  });
  let added = 0;
  catIds.forEach((cid) => {
    const c = state.collections.categories.find((x) => x.id === cid);
    if (!c) return;
    if (!c.storeIds) c.storeIds = [];
    if (!c.storeIds.includes(st.id)) {
      c.storeIds.push(st.id);
      c.updatedAt = Date.now();
      added++;
    }
  });
  if (added) touch("categories");
  return added;
}
function refillList() {
  const store = activeStore.value;
  if (!store) return [];
  const whIds = (store.warehouseIds || []).filter((id) => state.collections.warehouses.some((w) => w.id === id));
  return refillSuggestions(state.collections.stocks, state.collections.products, store.id, whIds);
}
function overviewOf(locType, locId) {
  const list = locType === "warehouse" ? state.collections.products : products.value;
  return stockOverview(state.collections.stocks, list, locType, locId);
}
function checkout({ items, received, note, paymentMethod, discount, roundOff, holdId }) {
  if (!allow("sell")) {
    tip("当前角色不能开单");
    return null;
  }
  const store = activeStore.value;
  if (!store || !items.length) {
    tip("先选商品");
    return null;
  }
  const lines = items.map((it) => {
    const p2 = productById(it.productId);
    return {
      productId: it.productId,
      name: p2 ? p2.name : "未知商品",
      price: r2(p2 ? p2.price : 0),
      qty: r2(it.qty),
      unit: p2 ? p2.unit : "件",
      cost: r2(p2 ? p2.cost : 0),
      other: r2(p2 ? p2.other : 0)
    };
  });
  const origTotal = r2(lines.reduce((s, l) => s + l.price * l.qty, 0));
  let afterDisc = discount && discount > 0 && discount < 10 ? r2(origTotal * discount / 10) : origTotal;
  const roundOffAmt = roundOff ? r2(Math.max(0, afterDisc - roundOff)) : 0;
  const total = roundOff ? r2(roundOff) : afterDisc;
  const cashTendered = paymentMethod === "cash" ? r2(received == null ? total : received) : total;
  const change = paymentMethod === "cash" ? r2(Math.max(0, cashTendered - total)) : 0;
  const order = {
    id: newId("o"),
    storeId: store.id,
    agentId: isAgent.value ? state.meta.agentId : "",
    at: Date.now(),
    items: lines,
    total,
    // 实收（折扣+抹零后）= 销售额
    origTotal,
    // 原价（折扣前）
    discount: discount || 0,
    // 折扣数
    roundOff: roundOffAmt,
    // 抹零金额
    paymentMethod: paymentMethod || "other",
    /* 【金额计算】-实收：实收 = 应收 total（找零已经退给顾客，剩下就是实际留下的钱）
       eg: 应收 378、顾客给 500、找零 122 → 实收 = 378 元 */
    received: total,
    /* 顾客递过来的现金原值，只用于「账怎么对」，不参与收入计算 eg: 500 */
    cashTendered: paymentMethod === "cash" ? cashTendered : 0,
    /* 找零金额，只用于核对，不参与收入计算 eg: 122 */
    change,
    note: note || "",
    updatedAt: Date.now()
  };
  state.collections.orders.push(order);
  if (holdId) closeHold(holdId, order.id);
  const shortages = deductForOrder(state.collections.stocks, lines, store.id);
  lines.forEach((l) => pushStockOp(l.productId, "store", store.id, -r2(l.qty), "sell", order.id));
  touch("orders", "stocks", "stockOps");
  const methodText = { wechat: "微信", alipay: "支付宝", cash: "现金", other: "其他" }[order.paymentMethod] || "其他";
  const qtyText = lines.map((l) => l.name + " " + fmtQty(l.qty, l.unit)).join("、");
  addLog("settle", "结算[" + methodText + "] " + money(total) + (discount ? "（" + discount + "折）" : "") + (order.roundOff > 0 ? "（抹零 " + money(order.roundOff) + "）" : "") + (order.change > 0 ? "（实收现金 " + money(cashTendered) + "，找零 " + money(order.change) + "）" : "") + (shortages.length ? " · 含欠货" : "") + "：" + qtyText, { refId: order.id });
  return { order, total, origTotal, discount, roundOff: order.roundOff, received: total, change: order.change, shortages };
}
function saveHold(items, note) {
  if (!allow("hold")) {
    tip("当前角色不能挂单");
    return false;
  }
  const store = activeStore.value;
  const lines = items.map((it) => {
    const p2 = productById(it.productId);
    return { productId: it.productId, name: p2 ? p2.name : "", price: p2 ? p2.price : 0, qty: r2(it.qty), unit: p2 ? p2.unit : "件", cost: p2 ? p2.cost : 0, other: p2 ? p2.other : 0 };
  });
  state.collections.holds.push({ id: newId("h"), storeId: store.id, agentId: isAgent.value ? state.meta.agentId : "", at: Date.now(), items: lines, note: "", updatedAt: Date.now() });
  touch("holds");
  addLog("hold", "挂单：" + lines.map((l) => l.name + " " + fmtQty(l.qty, l.unit)).join("、"), { refId: "h" });
  return true;
}
function closeHold(id, orderId = "") {
  const h2 = state.collections.holds.find((x) => x.id === id);
  if (!h2) return false;
  h2.closed = true;
  h2.closedOrderId = orderId;
  h2.updatedAt = Date.now();
  touch("holds");
  return true;
}
function updateOrderReceived(orderId, received) {
  if (!allow("order:edit")) {
    tip("代理不能改历史订单");
    return false;
  }
  const o = state.collections.orders.find((x) => x.id === orderId);
  if (!o) return false;
  o.received = r2(received);
  o.updatedAt = Date.now();
  touch("orders");
  addLog("edit", "改实收：" + money(o.total) + " → " + money(o.received));
  return true;
}
function deleteOrder(orderId) {
  if (!allow("order:edit")) {
    tip("代理不能删订单");
    return false;
  }
  const o = state.collections.orders.find((x) => x.id === orderId);
  if (!o) return false;
  o.items.forEach((it) => {
    addQty(state.collections.stocks, it.productId, "store", o.storeId, it.qty);
    pushStockOp(it.productId, "store", o.storeId, r2(it.qty), "order-del", o.id);
  });
  state.collections.orders = state.collections.orders.filter((x) => x.id !== orderId);
  touch("orders", "stocks", "stockOps");
  addLog("edit", "删除订单 " + money(o.received));
  return true;
}
function editOrderItems(orderId, newLines) {
  if (!allow("order:edit")) {
    tip("代理不能改历史订单");
    return false;
  }
  const o = state.collections.orders.find((x) => x.id === orderId);
  if (!o) return false;
  if (!newLines || !newLines.length) {
    tip("订单至少要有一行商品");
    return false;
  }
  o.items.forEach((it) => {
    addQty(state.collections.stocks, it.productId, "store", o.storeId, it.qty);
    pushStockOp(it.productId, "store", o.storeId, r2(it.qty), "order-edit-undo", o.id);
  });
  deductForOrder(state.collections.stocks, newLines, o.storeId);
  newLines.forEach((l) => pushStockOp(l.productId, "store", o.storeId, -r2(l.qty), "order-edit", o.id));
  const origTotal = r2(newLines.reduce((sum, l) => sum + l.price * l.qty, 0));
  const hasDisc = o.discount && o.discount > 0 && o.discount < 10;
  const afterDisc = hasDisc ? r2(origTotal * o.discount / 10) : origTotal;
  o.roundOff ? r2(Math.max(0, afterDisc - o.roundOff)) : 0;
  const total = o.roundOff ? r2(o.roundOff) : afterDisc;
  o.items = newLines;
  o.origTotal = origTotal;
  o.total = total;
  o.received = total;
  if (o.paymentMethod === "cash" && o.cashTendered > 0) {
    o.change = r2(Math.max(0, o.cashTendered - total));
  }
  o.updatedAt = Date.now();
  touch("orders", "stocks");
  addLog("edit", "修改订单商品：" + newLines.map((l) => l.name + "×" + l.qty).join("、"));
  return true;
}
function splitProduct(parentId, locType, locId, count) {
  if (isAgent.value) {
    if (!allow("split:store")) {
      tip("当前角色不能拆卷");
      return false;
    }
    if (locType !== "store") {
      tip("代理只能在「本店」分装，仓库里的货由店主处理", "error");
      return false;
    }
  } else if (!allow("stock:write")) {
    tip("当前角色不能拆卷");
    return false;
  }
  if (!locInScope(locType, locId)) {
    tip("只能在当前店铺或它挂载的仓库里分装", "error");
    return false;
  }
  const parent = state.collections.products.find((p2) => p2.id === parentId);
  if (!parent) return false;
  if (parent.storeId && activeStore.value && parent.storeId !== activeStore.value.id) {
    tip("这是别的店铺的商品", "error");
    return false;
  }
  const child = state.collections.products.find((p2) => p2.splitFrom === parentId);
  if (!child) {
    tip("这个商品没有关联的分装商品，先去商品编辑里设置分装关系");
    return false;
  }
  const per = Math.max(2, Number(child.splitPer) || Number(parent.splitPer) || 2);
  const n2 = Math.max(1, Number(count) || 1);
  const have = qtyAt(state.collections.stocks, parentId, locType, locId);
  if (have < n2) {
    tip("这里只剩 " + have + " " + (parent.unit || "卷") + "，不够拆 " + n2);
    return false;
  }
  addQty(state.collections.stocks, parentId, locType, locId, -n2);
  addQty(state.collections.stocks, child.id, locType, locId, n2 * per);
  pushStockOp(parentId, locType, locId, -n2, "split-out", child.id);
  pushStockOp(child.id, locType, locId, n2 * per, "split-in", child.id);
  touch("stocks");
  addLog(
    "split",
    "拆卷 " + n2 + " " + (parent.unit || "卷") + "：" + parent.name + " -" + n2 + " → " + child.name + " +" + n2 * per,
    { refId: parent.id }
  );
  return true;
}
function switchStore(id) {
  state.meta.activeStoreId = id;
  state.meta.updatedAt = Date.now();
  touch("meta");
}
function saveStore(payload) {
  if (!allow("store:write")) {
    tip("代理模式不能加店铺");
    return false;
  }
  const name2 = String(payload.name || "").trim();
  if (!name2) {
    tip("店铺名不能空");
    return false;
  }
  const st = { id: newId("s"), name: name2, role: "owner", mine: true, warehouseIds: payload.warehouseIds || [], createdAt: Date.now(), updatedAt: Date.now() };
  state.collections.stores.push(st);
  state.meta.activeStoreId = st.id;
  touch("stores", "meta");
  addLog("store", "新增店铺：" + name2);
  return st;
}
function createAgent(payload) {
  if (!allow("agent:write")) {
    tip("只有店主能生成代理");
    return false;
  }
  const st = activeStore.value;
  if (st && st.asAgent) {
    tip("这是别人的店，你只是代卖，不能给它生成代理", "error");
    return false;
  }
  const name2 = String(payload.name || "").trim();
  if (!name2) {
    tip("代理名称不能空");
    return false;
  }
  const a = {
    id: newId("a"),
    name: name2,
    ownerName: payload.ownerName || "",
    parentStoreId: payload.parentStoreId || activeStore.value && activeStore.value.id,
    code: "AG-" + Math.random().toString(36).slice(2, 6).toUpperCase(),
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  state.collections.agents.push(a);
  touch("agents");
  addLog("agent", "生成代理：" + name2);
  return a;
}
function agentBundle(agentId) {
  const agent = state.collections.agents.find((a) => a.id === agentId);
  if (!agent) return null;
  const storeId = agent.parentStoreId;
  const collections = {
    stores: state.collections.stores.filter((s) => s.id === storeId),
    warehouses: [],
    categories: state.collections.categories,
    products: state.collections.products,
    stocks: state.collections.stocks.filter((s) => s.locType === "store" && s.locId === storeId),
    /* 代理卖货也要留下流水，否则店主合并后库存不会跟着减 */
    stockOps: state.collections.stockOps.filter((o) => o.locType === "store" && o.locId === storeId),
    orders: state.collections.orders.filter((o) => o.storeId === storeId),
    holds: state.collections.holds.filter((h2) => h2.storeId === storeId),
    agents: [agent],
    /* 操作日志也带上：代理看到的是和店主同一套界面，记录不该凭空缺一段 */
    logs: state.collections.logs
  };
  const exportable = exportAgentPack(agent.id);
  return {
    agent: { id: agent.id, name: agent.name, code: agent.code, parentStoreId: storeId },
    /* 顶层放开一份：代理数据包下载后能被「我的 → 导入店铺数据包」直接吃进去；
       seed 保留老结构，入口 HTML（boot.html）仍按 seed 写入 */
    kind: "agent",
    from: exportable ? exportable.from : void 0,
    store: exportable ? exportable.store : void 0,
    collections: exportable ? exportable.collections : void 0,
    seed: {
      collections,
      settings: { ...state.settings, updatedAt: Date.now() },
      meta: {
        deviceId: "agent-" + agent.id,
        activeStoreId: storeId,
        role: ROLE.AGENT,
        agentId: agent.id,
        schemaVersion: 1,
        updatedAt: Date.now()
      }
    },
    generatedAt: Date.now()
  };
}
function siteBase() {
  let p2 = location.pathname;
  if (/\.html?$/i.test(p2)) p2 = p2.replace(/[^/]*$/, "");
  if (!p2.endsWith("/")) p2 += "/";
  return location.origin + p2;
}
function agentBootFile(agentId) {
  const agent = state.collections.agents.find((a) => a.id === agentId);
  if (!agent) return null;
  const pack = agentBundle(agentId);
  if (!pack) return null;
  const origin = siteBase();
  return agentBootHtml({
    code: agent.code,
    name: agent.name || agent.ownerName || "代理",
    origin,
    pack
  });
}
function agentLinks(agentId) {
  const agent = state.collections.agents.find((a) => a.id === agentId);
  if (!agent) return null;
  const pack = agentBundle(agentId);
  const base = siteBase();
  const plain = agentLink(agent.code, base);
  const data = agentDataLink(agent.code, pack, base);
  return { plain, data, size: data ? data.length : 0 };
}
function exportBundle() {
  return {
    app: "stall-assistant",
    version: 3,
    kind: "full",
    exportedAt: Date.now(),
    role: role.value,
    deviceId: state.meta.deviceId,
    collections: state.collections,
    settings: state.settings,
    meta: state.meta
  };
}
async function importBundle(remote) {
  if (!remote || !remote.collections) throw new Error("文件不是有效的摆摊助手 JSON");
  const fromRole = remote.meta && remote.meta.role || remote.role || ROLE.OWNER;
  const merged = mergeAll(
    { collections: state.collections, settings: state.settings, meta: state.meta },
    remote,
    { fromRole }
  );
  state.collections = merged.collections;
  if (fromRole === ROLE.OWNER && merged.settings && merged.settings.updatedAt > (state.settings.updatedAt || 0)) {
    state.settings = { ...state.settings, ...merged.settings };
    touch("settings");
  }
  COLLECTIONS.forEach((n2) => dirty.add(n2));
  assignCategoryStores();
  assignProductStores();
  ensureStoreCategories();
  await flush();
  const text = reportText(merged.report);
  addLog("sync", "合并数据：" + text);
  return text;
}
function exportSyncPack() {
  const base = exportBundle();
  const c = state.collections;
  return {
    ...base,
    kind: "sync",
    sync: {
      deviceId: state.meta.deviceId || "",
      syncedAt: Date.now(),
      /* 给用户看的规模，导入前能一眼判断"是不是空包" */
      counts: {
        products: (c.products || []).length,
        categories: (c.categories || []).length,
        stocks: (c.stocks || []).length,
        orders: (c.orders || []).length,
        warehouses: (c.warehouses || []).length,
        stores: (c.stores || []).length,
        agents: (c.agents || []).length
      }
    }
  };
}
async function importSyncPack(remote) {
  if (!remote || !remote.collections) throw new Error("文件不是有效的摆摊助手同步包");
  const merged = mergeAll(
    { collections: {}, settings: {}, meta: {} },
    remote,
    { fromRole: ROLE.OWNER }
  );
  state.collections = merged.collections;
  const remoteMeta = remote.meta || {};
  state.meta = {
    ...state.meta,
    activeStoreId: remoteMeta.activeStoreId || merged.collections.stores[0] && merged.collections.stores[0].id || "",
    role: ROLE.OWNER,
    agentId: "",
    lastSyncAt: Date.now(),
    lastSyncDevice: remote.sync && remote.sync.deviceId || remoteMeta.deviceId || ""
  };
  COLLECTIONS.forEach((n2) => dirty.add(n2));
  dirty.add("meta");
  assignCategoryStores();
  assignProductStores();
  assignWarehouseOwners();
  assignAgentStores();
  pruneStockOps();
  backfillOrderCosts();
  ensureStoreCategories();
  await flush();
  const c = state.collections;
  const text = "覆盖为 " + c.products.length + " 商品 / " + c.orders.length + " 订单";
  addLog("sync", "设备同步（全量覆盖）：" + text);
  return text;
}
function storeScopeData(storeId) {
  const c = state.collections;
  const store = c.stores.find((s) => s.id === storeId);
  if (!store) return null;
  const whIds = (store.warehouseIds || []).filter((id) => c.warehouses.some((w) => w.id === id));
  const inScopeStock = (s) => s.locType === "store" && s.locId === storeId || s.locType === "warehouse" && whIds.includes(s.locId);
  const inScopeStocks = c.stocks.filter(inScopeStock);
  const scopedIds = new Set(inScopeStocks.filter((s) => r2(s.qty) !== 0).map((s) => s.productId));
  const products2 = c.products.filter((p2) => p2.storeId === storeId || scopedIds.has(p2.id));
  const productIds = new Set(products2.map((p2) => p2.id));
  const catIds = new Set(products2.map((p2) => p2.cat).filter(Boolean));
  return {
    store: { ...store, warehouseIds: whIds },
    data: {
      stores: [store],
      warehouses: c.warehouses.filter((w) => whIds.includes(w.id)),
      products: products2,
      /* 只带这些商品的库存行，别家店的货不跟着跑 */
      stocks: inScopeStocks.filter((s) => productIds.has(s.productId)),
      categories: c.categories.filter((cat) => catIds.has(cat.id) || (cat.storeIds || []).includes(storeId)),
      orders: c.orders.filter((o) => o.storeId === storeId),
      holds: c.holds.filter((h2) => h2.storeId === storeId),
      logs: c.logs.filter((l) => l.storeId === storeId),
      agents: c.agents.filter((a) => a.parentStoreId === storeId),
      /* 库存流水也带：对方合并时靠它把两边的变动叠加（不能只比 updatedAt） */
      stockOps: (c.stockOps || []).filter((o) => productIds.has(o.productId) && inScopeStock(o))
    }
  };
}
function exportStorePack(storeId) {
  const scope = storeScopeData(storeId || activeStore.value && activeStore.value.id);
  if (!scope) return null;
  return {
    app: "stall-assistant",
    version: 3,
    kind: "store",
    exportedAt: Date.now(),
    from: { deviceId: state.meta.deviceId, storeName: scope.store.name },
    store: scope.store,
    /* 注意：故意不带 settings —— 头像、主题、字号、语音都是"这台设备怎么显示"，不随店走 */
    collections: scope.data,
    meta: { activeStoreId: scope.store.id, role: ROLE.OWNER, schemaVersion: 1 }
  };
}
function exportAgentPack(agentId) {
  const agent = state.collections.agents.find((a) => a.id === agentId);
  if (!agent) return null;
  const scope = storeScopeData(agent.parentStoreId);
  if (!scope) return null;
  return {
    app: "stall-assistant",
    version: 3,
    kind: "agent",
    exportedAt: Date.now(),
    from: { deviceId: state.meta.deviceId, storeName: scope.store.name },
    agent: { id: agent.id, name: agent.name, code: agent.code, parentStoreId: agent.parentStoreId },
    store: scope.store,
    collections: scope.data,
    meta: { activeStoreId: agent.parentStoreId, role: ROLE.AGENT, agentId: agent.id, schemaVersion: 1 }
  };
}
async function importStorePack(remote) {
  const pack = remote && !remote.collections && remote.seed ? { kind: "agent", collections: remote.seed.collections, meta: remote.seed.meta, agent: remote.agent, settings: remote.seed.settings } : remote;
  if (!pack || !pack.collections) throw new Error("这不是本程序导出的店铺数据包");
  const isAgentPack = pack.kind === "agent" || pack.meta && pack.meta.role === ROLE.AGENT;
  const localOwner = state.meta.deviceId || "local";
  const packOwner = pack.from && pack.from.deviceId || "pack";
  let c = pack.collections;
  if (isAgentPack) {
    c = {
      ...c,
      warehouses: [],
      stores: (c.stores || []).map((st) => ({ ...st, warehouseIds: [] })),
      stocks: (c.stocks || []).filter((s) => s.locType === "store")
    };
  } else {
    const remap = {};
    const whs = (c.warehouses || []).map((w) => ({ ...w }));
    whs.forEach((w) => {
      if (!w.ownerId) w.ownerId = packOwner;
      const clash = state.collections.warehouses.find((x) => x.id === w.id && (x.ownerId || localOwner) !== w.ownerId);
      if (clash) {
        const twin = state.collections.warehouses.find((x) => x.name === w.name && x.ownerId === w.ownerId);
        const nid = twin ? twin.id : newId("w");
        remap[w.id] = nid;
        w.id = nid;
        if (twin && (Number(twin.updatedAt) || 0) > (Number(w.updatedAt) || 0)) w.updatedAt = twin.updatedAt;
      }
    });
    c = {
      ...c,
      warehouses: whs,
      stores: (c.stores || []).map((st) => ({ ...st, warehouseIds: (st.warehouseIds || []).map((id) => remap[id] || id) })),
      stocks: (c.stocks || []).map((st) => st.locType === "warehouse" && remap[st.locId] ? { ...st, locId: remap[st.locId] } : st)
    };
    if (pack.store) pack.store = { ...pack.store, warehouseIds: (pack.store.warehouseIds || []).map((id) => remap[id] || id) };
  }
  const storeRec = pack.store || c.stores && c.stores[0];
  if (!storeRec || !storeRec.id) throw new Error("数据包里没有店铺信息");
  const rid = storeRec.id;
  const existing = state.collections.stores.find((s) => s.id === rid);
  const isNew = !existing;
  if (isNew) {
    state.collections.stores.push({
      ...storeRec,
      mine: false,
      coManaged: !isAgentPack,
      asAgent: !!isAgentPack,
      ownerAgentId: isAgentPack ? pack.agent && pack.agent.id || "" : "",
      sharedFrom: pack.from && pack.from.deviceId || "",
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  } else {
    existing.name = storeRec.name || existing.name;
    if (!isAgentPack && Array.isArray(storeRec.warehouseIds)) {
      existing.warehouseIds = [.../* @__PURE__ */ new Set([...existing.warehouseIds || [], ...storeRec.warehouseIds])];
    }
    existing.updatedAt = Date.now();
  }
  const merged = mergeAll(
    { collections: state.collections, settings: state.settings, meta: state.meta },
    { collections: c },
    { fromRole: ROLE.OWNER }
  );
  state.collections = merged.collections;
  const storeNow = state.collections.stores.find((x) => x.id === rid);
  if (storeNow) {
    if (existing) {
      storeNow.mine = existing.mine;
      storeNow.coManaged = !!existing.coManaged;
      storeNow.asAgent = !!existing.asAgent;
      storeNow.ownerAgentId = existing.ownerAgentId || "";
      storeNow.sharedFrom = existing.sharedFrom || "";
    } else {
      storeNow.mine = false;
      storeNow.coManaged = !isAgentPack;
      storeNow.asAgent = !!isAgentPack;
      storeNow.ownerAgentId = isAgentPack ? pack.agent && pack.agent.id || "" : "";
      storeNow.sharedFrom = pack.from && pack.from.deviceId || "";
    }
    storeNow.name = storeRec.name || storeNow.name;
    if (isNew) storeNow.warehouseIds = (storeRec.warehouseIds || []).slice();
    else if (!isAgentPack && Array.isArray(storeRec.warehouseIds)) {
      storeNow.warehouseIds = [.../* @__PURE__ */ new Set([...storeNow.warehouseIds || [], ...storeRec.warehouseIds])];
    }
    if (storeNow.asAgent) storeNow.warehouseIds = [];
    storeNow.updatedAt = Date.now();
  }
  const agentId = isAgentPack ? pack.agent && pack.agent.id || (state.collections.agents.find((a) => a.parentStoreId === rid) || {}).id || "" : "";
  applyIdentity(agentId);
  state.meta.activeStoreId = rid;
  state.meta.role = isAgentPack ? ROLE.AGENT : ROLE.OWNER;
  state.meta.agentId = agentId;
  writeLocalIdentity(agentId);
  state.meta.updatedAt = Date.now();
  COLLECTIONS.forEach((n2) => dirty.add(n2));
  dirty.add("meta");
  assignCategoryStores();
  assignProductStores();
  assignWarehouseOwners();
  assignAgentStores();
  pruneStockOps();
  backfillOrderCosts();
  ensureStoreCategories();
  await flush();
  const counts = {
    products: (c.products || []).length,
    orders: (c.orders || []).length,
    warehouses: (c.warehouses || []).length
  };
  const text = (isNew ? isAgentPack ? "接入代理店铺「" : "接入共管店铺「" : "合并店铺「") + (storeRec.name || rid) + "」：" + counts.products + " 商品 / " + counts.orders + " 订单 / " + counts.warehouses + " 仓库" + (merged.report && merged.report.added ? "（新增 " + merged.report.added + " 条，更新 " + merged.report.updated + " 条）" : "");
  addLog("sync", (isNew ? "导入店铺包（新建共管）：" : "导入店铺包（合并）：") + (storeRec.name || rid));
  return text;
}
function purgeStoreData(storeId, keepProductIds) {
  const keep = new Set(keepProductIds || []);
  const c = state.collections;
  const st = c.stores.find((s) => s.id === storeId);
  if (!st) return null;
  const whIds = (st.warehouseIds || []).slice();
  const ownIds = c.products.filter((p2) => p2.storeId === storeId).map((p2) => p2.id);
  c.products = c.products.filter((p2) => p2.storeId !== storeId);
  c.stocks = c.stocks.filter(
    (s) => (!ownIds.includes(s.productId) || keep.has(s.productId)) && !(s.locType === "store" && s.locId === storeId)
  );
  c.orders = c.orders.filter((o) => o.storeId !== storeId);
  c.holds = c.holds.filter((h2) => h2.storeId !== storeId);
  c.logs = c.logs.filter((l) => l.storeId !== storeId);
  c.agents = c.agents.filter((a) => a.parentStoreId !== storeId);
  c.stores = c.stores.filter((s) => s.id !== storeId);
  const stillUsed = new Set(c.products.map((p2) => p2.cat).filter(Boolean));
  const catChanged = [];
  c.categories = c.categories.filter((cat) => {
    if (!Array.isArray(cat.storeIds)) return true;
    const next = cat.storeIds.filter((id) => id !== storeId);
    if (next.length !== cat.storeIds.length) catChanged.push(cat.id);
    cat.storeIds = next;
    if (next.length) return true;
    return stillUsed.has(cat.id);
  });
  const usedElsewhere = /* @__PURE__ */ new Set();
  c.stores.forEach((s) => (s.warehouseIds || []).forEach((id) => usedElsewhere.add(id)));
  whIds.forEach((wid) => {
    if (usedElsewhere.has(wid)) return;
    c.warehouses = c.warehouses.filter((w) => w.id !== wid);
    c.stocks = c.stocks.filter((s) => !(s.locType === "warehouse" && s.locId === wid));
  });
  const first = c.stores[0];
  state.meta.activeStoreId = first ? first.id : "";
  state.meta.updatedAt = Date.now();
  if (state.meta.agentId && !c.agents.some((a) => a.id === state.meta.agentId)) {
    applyIdentity("");
    state.meta.agentId = "";
    writeLocalIdentity("");
  }
  return { products: ownIds.length, orders: st && 1 || 0, name: st.name, cats: catChanged.length };
}
async function deleteStore(storeId) {
  if (!allow("store:write")) {
    tip("代理不能删店铺");
    return false;
  }
  const c = state.collections;
  const st = c.stores.find((s) => s.id === storeId);
  if (!st) {
    tip("找不到这家店");
    return false;
  }
  if (st.asAgent) {
    tip("这是别人的店（你只是代卖），请用「退出代理」", "error");
    return false;
  }
  if (st.mine === false) {
    tip("这是共管店铺，只能用「退出」", "error");
    return false;
  }
  if (c.stores.length <= 1) {
    tip("这是最后一家店，删了就什么都没了；先在「店铺与身份」建一家新的", "error");
    return false;
  }
  const whIds = (st.warehouseIds || []).filter((id) => c.warehouses.some((w) => w.id === id));
  const ownProducts = c.products.filter((p2) => p2.storeId === storeId);
  const rows = c.stocks.filter((s) => s.locType === "store" && s.locId === storeId && r2(s.qty) > 0 && ownProducts.some((p2) => p2.id === s.productId));
  if (rows.length && !whIds.length) {
    tip("这家店还挂着 " + rows.length + " 款货，但没有可退的仓库：先去仓库页给它挂一个仓，把货退回去再删", "error");
    return false;
  }
  let movedLines = 0;
  let movedQty = 0;
  const movedNames = [];
  rows.forEach((row) => {
    const p2 = ownProducts.find((x) => x.id === row.productId);
    if (!p2) return;
    const target = whIds.find((id) => c.stocks.some((s) => s.productId === p2.id && s.locType === "warehouse" && s.locId === id && r2(s.qty) > 0)) || whIds[0];
    if (!target) return;
    const qty = r2(row.qty);
    const res = transfer(c.stocks, p2.id, { type: "store", id: storeId }, { type: "warehouse", id: target }, qty);
    if (!res.ok) return;
    pushStockOp(p2.id, "store", storeId, -qty, "return-out", target);
    pushStockOp(p2.id, "warehouse", target, qty, "return-in", storeId);
    movedLines++;
    movedQty = r2(movedQty + qty);
    movedNames.push(p2.name + " " + fmtQty(qty, p2.unit));
    const wh = c.warehouses.find((w) => w.id === target);
    addLog(
      "stock",
      "删除店铺前退仓：「" + st.name + "」→「" + (wh ? wh.name : target) + "」" + p2.name + " " + fmtQty(qty, p2.unit),
      { warehouseId: target, refId: p2.id }
    );
  });
  if (rows.length && !movedLines) {
    tip("货没能退回仓库，先检查挂载关系", "error");
    return false;
  }
  const parkedIds = [];
  ownProducts.forEach((p2) => {
    const whRows = c.stocks.filter((s) => s.productId === p2.id && s.locType === "warehouse" && r2(s.qty) > 0);
    if (!whRows.length) return;
    p2.storeId = "";
    p2.parked = true;
    p2.updatedAt = Date.now();
    parkedIds.push(p2.id);
  });
  if (parkedIds.length) touch("products");
  const info = purgeStoreData(storeId, parkedIds);
  if (!info) return false;
  COLLECTIONS.forEach((n2) => dirty.add(n2));
  dirty.add("meta");
  await flush();
  addLog("store", "删除店铺「" + info.name + "」" + (movedLines ? "，" + movedLines + " 款货（" + movedNames.join("、") + "）已退回仓库并寄存在库里" : ""));
  tip("已删除「" + info.name + "」" + (movedLines ? "，" + movedLines + " 款货已退回仓库" : ""));
  return { ok: true, movedLines, movedQty, movedNames, parked: parkedIds.length };
}
function storeDeletePreview(storeId) {
  const c = state.collections;
  const st = c.stores.find((s) => s.id === storeId);
  if (!st) return null;
  const whIds = (st.warehouseIds || []).filter((id) => c.warehouses.some((w) => w.id === id));
  const ownProducts = c.products.filter((p2) => p2.storeId === storeId);
  const rows = c.stocks.filter((s) => s.locType === "store" && s.locId === storeId && r2(s.qty) > 0 && ownProducts.some((p2) => p2.id === s.productId));
  const value = r2(rows.reduce((sum, r) => {
    const p2 = ownProducts.find((x) => x.id === r.productId);
    return sum + (p2 ? (Number(p2.cost || 0) + Number(p2.other || 0)) * r.qty : 0);
  }, 0));
  return {
    name: st.name,
    products: ownProducts.length,
    orders: c.orders.filter((o) => o.storeId === storeId).length,
    holds: c.holds.filter((h2) => h2.storeId === storeId).length,
    agents: c.agents.filter((a) => a.parentStoreId === storeId).length,
    moveLines: rows.length,
    moveValue: value,
    warehouses: whIds.map((id) => (c.warehouses.find((w) => w.id === id) || {}).name).filter(Boolean)
  };
}
async function leaveSharedStore(storeId) {
  const st = state.collections.stores.find((s) => s.id === storeId);
  if (!st) {
    tip("找不到这家店");
    return false;
  }
  if (st.mine !== false) {
    tip("这是你自己建的店，不能「退出」，要删就删数据", "error");
    return false;
  }
  if (st.asAgent) {
    tip("这是代理店铺，请用「退出代理」", "error");
    return false;
  }
  const info = purgeStoreData(storeId);
  if (!info) return false;
  COLLECTIONS.forEach((n2) => dirty.add(n2));
  dirty.add("meta");
  await flush();
  addLog("store", "退出共管店铺：" + info.name);
  tip("已退出「" + info.name + "」，它的 " + info.products + " 个商品和数据都清掉了");
  return true;
}
async function leaveAgent(agentId) {
  const agent = state.collections.agents.find((a) => a.id === agentId);
  if (!agent) {
    tip("找不到这个代理");
    return false;
  }
  const st = state.collections.stores.find((s) => s.id === agent.parentStoreId);
  const isOwnStore = st && st.mine !== false;
  state.collections.agents = state.collections.agents.filter((a) => a.id !== agentId);
  touch("agents");
  if (state.viewAgentId === agentId) {
    applyIdentity("");
    state.meta.agentId = "";
    writeLocalIdentity("");
  }
  if (st && !isOwnStore) purgeStoreData(st.id);
  COLLECTIONS.forEach((n2) => dirty.add(n2));
  dirty.add("meta");
  await flush();
  addLog("agent", "退出代理：" + (agent.name || agentId));
  tip("已退出代理「" + (agent.name || "") + "」" + (st && !isOwnStore ? "，" + st.name + " 的数据也清了" : ""));
  return true;
}
async function clearDemoData() {
  const now2 = Date.now();
  const sid = newId("s");
  state.collections = emptyCollections();
  state.collections.stores = [{
    id: sid,
    name: state.settings.shopName || "我的小摊",
    role: "owner",
    mine: true,
    coManaged: false,
    sharedFrom: "",
    warehouseIds: [],
    createdAt: now2,
    updatedAt: now2
  }];
  state.meta.activeStoreId = sid;
  state.meta.role = ROLE.OWNER;
  state.meta.agentId = "";
  state.meta.updatedAt = now2;
  applyIdentity("");
  writeLocalIdentity("");
  COLLECTIONS.forEach((n2) => dirty.add(n2));
  dirty.add("meta");
  await flush();
  addLog("system", "清空示例数据");
}
async function resetDemo() {
  const seed = seedData();
  state.collections = seed.collections;
  state.settings = { ...defaultSettings(), ...seed.settings };
  state.meta = { ...state.meta, activeStoreId: seed.meta.activeStoreId, role: ROLE.OWNER, agentId: "" };
  COLLECTIONS.forEach((n2) => dirty.add(n2));
  dirty.add("settings");
  dirty.add("meta");
  await flush();
  addLog("system", "恢复示例数据");
}
async function previewTable(file) {
  const { raw, kind } = await readTableFile(file);
  const head = findHeader(raw);
  if (!head) throw new Error("没认出表头：前 6 行里要同时有「商品名称」和「售价」");
  const rows = buildRows(raw, head.idx, head.map);
  return { kind, raw, headerIndex: head.idx, map: head.map, rows, fileName: file.name };
}
function applyTableImport(preview, mode = "merge", fields = null) {
  const ALL_FIELDS = ["price", "cost", "other", "unit", "step", "cat", "barcode", "traceCode", "lowStock", "desc", "img", "stock"];
  const picked = Array.isArray(fields) && fields.length ? fields : ALL_FIELDS;
  const take = (k) => picked.includes(k);
  if (!allow("import:write")) {
    tip("代理模式不能导入商品");
    return null;
  }
  const store = activeStore.value;
  const valid = preview.rows.filter((r) => !r.errs.length);
  let created = 0, updated2 = 0, skipped = 0, splitBad = 0;
  const ensureCat = (name2) => {
    const n2 = String(name2 || "").trim() || "未分类";
    const sid = store ? store.id : "";
    let c = state.collections.categories.find(
      (x) => x.name === n2 && (!sid || !x.storeIds || !x.storeIds.length || x.storeIds.includes(sid))
    );
    if (!c) {
      c = { id: newId("c"), name: n2, sort: state.collections.categories.length + 1, storeIds: sid ? [sid] : [], updatedAt: Date.now() };
      state.collections.categories.push(c);
    } else if (sid && Array.isArray(c.storeIds) && !c.storeIds.includes(sid)) {
      c.storeIds = [...c.storeIds, sid];
      c.updatedAt = Date.now();
    }
    return c;
  };
  const made = [];
  valid.forEach((r) => {
    var _a;
    const sid = store ? store.id : "";
    const exist = state.collections.products.find((p3) => p3.name === r.name && p3.storeId === sid);
    if (exist && mode === "skip") {
      skipped++;
      return;
    }
    let p2;
    const isNewProduct = !exist || mode === "new";
    if (exist && mode === "merge") {
      p2 = exist;
      updated2++;
    } else {
      p2 = {
        id: newId("p"),
        name: "",
        price: 0,
        cost: 0,
        other: 0,
        unit: "件",
        step: 1,
        cat: "",
        barcode: "",
        traceCode: "",
        motif: "tape",
        img: "",
        splitFrom: "",
        splitPer: 0,
        lowStock: 5,
        /* 新建商品落在当前店铺的商品库；之后切店不会跟着跑 */
        storeId: activeStore.value ? activeStore.value.id : "",
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      state.collections.products.push(p2);
      created++;
    }
    const cat = ensureCat(r.cat);
    const patch = { name: r.name, updatedAt: Date.now() };
    if (take("price")) patch.price = r2(r.price);
    if (take("cost")) patch.cost = isFinite(r.cost) ? r2(Math.max(0, r.cost)) : 0;
    if (take("other")) patch.other = isFinite(r.other) ? r2(Math.max(0, r.other)) : 0;
    if (take("unit")) patch.unit = r.unit || "件";
    if (take("step")) patch.step = isFinite(r.step) && r.step > 0 ? r.step : 1;
    if (take("cat")) patch.cat = cat.id;
    if (take("barcode")) patch.barcode = r.barcode || p2.barcode || "";
    if (take("traceCode")) patch.traceCode = r.traceCode || p2.traceCode || "";
    if (take("lowStock")) patch.lowStock = Number.isFinite(Number(r.lowStock)) ? Math.max(0, Number(r.lowStock)) : (_a = p2.lowStock) != null ? _a : 5;
    if (take("desc")) patch.desc = r.desc || p2.desc || "";
    if (take("img")) patch.img = r.img || p2.img || "";
    if (isNewProduct) {
      patch.price = r2(r.price);
      patch.cost = isFinite(r.cost) ? r2(Math.max(0, r.cost)) : 0;
      patch.other = isFinite(r.other) ? r2(Math.max(0, r.other)) : 0;
      patch.unit = r.unit || "件";
      patch.step = isFinite(r.step) && r.step > 0 ? r.step : 1;
      patch.cat = cat.id;
      patch.barcode = r.barcode || "";
      patch.traceCode = r.traceCode || "";
      patch.lowStock = Number.isFinite(Number(r.lowStock)) ? Math.max(0, Number(r.lowStock)) : 5;
      patch.desc = r.desc || "";
      patch.img = r.img || "";
    }
    Object.assign(p2, patch);
    if (take("stock") && isFinite(r.stock) && store) {
      const before = qtyAt(state.collections.stocks, p2.id, "store", store.id);
      setQty(state.collections.stocks, p2.id, "store", store.id, r2(r.stock));
      pushStockOp(p2.id, "store", store.id, r2(r.stock) - before, "import");
    }
    made.push({ row: r, product: p2 });
  });
  made.forEach((m) => {
    const src = (m.row.splitFrom || "").trim();
    if (!src || src === m.row.name) return;
    const sid = store ? store.id : "";
    const target = state.collections.products.find((p2) => p2.name === src && p2 !== m.product && p2.storeId === sid);
    if (!target) {
      splitBad++;
      return;
    }
    m.product.splitFrom = target.id;
    m.product.splitPer = Math.max(2, m.row.splitPer || 2);
  });
  assignCategoryStores();
  ensureStoreCategories();
  touch("products", "stocks", "categories");
  addLog("import", "导入表格：新增 " + created + "、更新 " + updated2 + (skipped ? "、跳过 " + skipped : "") + "（" + preview.fileName + "）");
  return { created, updated: updated2, skipped, splitBad };
}
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$f = {
  class: "toast-host",
  "aria-live": "polite"
};
const _hoisted_2$f = ["data-type"];
const _hoisted_3$e = { class: "toast-ico" };
const _hoisted_4$e = { class: "toast-msg" };
const _sfc_main$f = {
  __name: "ToastHost",
  setup(__props) {
    const ICON = {
      success: "check",
      error: "alert",
      warn: "alert",
      info: "alert"
    };
    const list = computed(() => toasts);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        createVNode(TransitionGroup, { name: "toast" }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (t2) => {
              return openBlock(), createElementBlock("div", {
                key: t2.id,
                class: "toast",
                "data-type": t2.type
              }, [
                createBaseVNode("span", _hoisted_3$e, [
                  createVNode(_sfc_main$g, {
                    name: ICON[t2.type] || "alert",
                    size: 14
                  }, null, 8, ["name"])
                ]),
                createBaseVNode("span", _hoisted_4$e, toDisplayString(t2.msg), 1)
              ], 8, _hoisted_2$f);
            }), 128))
          ]),
          _: 1
        })
      ]);
    };
  }
};
const ToastHost = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-0a1b364f"]]);
const _hoisted_1$e = ["src", "alt"];
const _hoisted_2$e = ["width", "height", "innerHTML"];
const _sfc_main$e = {
  __name: "ProductThumb",
  props: {
    product: { type: Object, required: true },
    size: { type: Number, default: 44 }
  },
  setup(__props) {
    const props2 = __props;
    const broken = /* @__PURE__ */ ref(false);
    watch(() => props2.product.img, () => {
      broken.value = false;
    });
    const MOTIF = {
      tape: '<rect x="3" y="8" width="18" height="8" rx="1.5"/><path d="M7 8v8M17 8v8M10 12h4"/>',
      sticker: '<circle cx="12" cy="12" r="6.5"/><path d="m12 8.6 1.4 2.9 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1L7.5 11.9l3.1-.4z"/>',
      card: '<rect x="4" y="6" width="16" height="12" rx="1.5"/><path d="M4 10h16M8 14h6"/>',
      dayf: '<rect x="4" y="5" width="16" height="15" rx="1.5"/><path d="M4 9h16M8 5V3M16 5V3"/><path d="M8 13h3M13 13h3M8 17h3"/>',
      note: '<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M8 8h8M8 12h8M8 16h5"/>',
      shaped: '<path d="m12 4 2.6 5.6 6 .7-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 10.3l6-.7z"/>',
      magnet: '<circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2.6"/>',
      book: '<path d="M5 5h9a2 2 0 0 1 2 2v12H7a2 2 0 0 1-2-2z"/><path d="M16 7h3v12H9"/>',
      page: '<rect x="5" y="4" width="14" height="16" rx="1"/><path d="M8 8h8M8 12h8M8 16h5"/>'
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "thumb",
        style: normalizeStyle({ width: __props.size + "px", height: __props.size + "px" })
      }, [
        __props.product.img && !broken.value ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: __props.product.img,
          alt: __props.product.name,
          onError: _cache[0] || (_cache[0] = ($event) => broken.value = true)
        }, null, 40, _hoisted_1$e)) : (openBlock(), createElementBlock("svg", {
          key: 1,
          width: Math.round(__props.size * 0.5),
          height: Math.round(__props.size * 0.5),
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          innerHTML: MOTIF[__props.product.motif] || MOTIF.tape
        }, null, 8, _hoisted_2$e))
      ], 4);
    };
  }
};
const _hoisted_1$d = { class: "sell" };
const _hoisted_2$d = { class: "sell-head" };
const _hoisted_3$d = { class: "txt" };
const _hoisted_4$d = {
  key: 0,
  class: "sell-body"
};
const _hoisted_5$d = {
  class: "search",
  style: { "position": "sticky", "top": "0", "z-index": "5", "padding": "4px 0 8px" }
};
const _hoisted_6$d = {
  class: "tabs",
  style: { "position": "sticky", "top": "36px", "z-index": "5", "background": "hsl(var(--hsl-body))", "padding": "4px 0 8px" }
};
const _hoisted_7$d = ["data-on"];
const _hoisted_8$d = ["data-on"];
const _hoisted_9$d = ["data-on", "onClick"];
const _hoisted_10$d = {
  key: 0,
  class: "tabs sub",
  style: { "position": "sticky", "top": "66px", "z-index": "5", "background": "hsl(var(--hsl-body))" }
};
const _hoisted_11$c = ["data-on"];
const _hoisted_12$c = ["data-on", "onClick"];
const _hoisted_13$c = { class: "list" };
const _hoisted_14$b = { class: "meta" };
const _hoisted_15$b = { class: "ctrl" };
const _hoisted_16$b = ["onClick"];
const _hoisted_17$b = ["value", "onChange", "onKeyup"];
const _hoisted_18$b = ["onClick"];
const _hoisted_19$a = {
  key: 0,
  class: "empty"
};
const _hoisted_20$a = {
  key: 1,
  class: "sell-body"
};
const _hoisted_21$9 = { class: "pay-lines" };
const _hoisted_22$9 = { class: "meta" };
const _hoisted_23$9 = ["value", "onChange"];
const _hoisted_24$9 = { class: "tnum" };
const _hoisted_25$9 = {
  key: 0,
  class: "hint",
  style: { "margin-top": "8px", "line-height": "1.7" }
};
const _hoisted_26$8 = {
  class: "chips",
  style: { "margin-top": "10px" }
};
const _hoisted_27$8 = ["data-on"];
const _hoisted_28$7 = ["data-on", "onClick"];
const _hoisted_29$7 = ["data-on"];
const _hoisted_30$7 = { class: "pay-total" };
const _hoisted_31$7 = { class: "tnum" };
const _hoisted_32$6 = {
  key: 1,
  class: "pay-total",
  style: { "padding-top": "0" }
};
const _hoisted_33$6 = { style: { "text-decoration": "line-through", "color": "var(--mute)" } };
const _hoisted_34$5 = { style: { "color": "var(--jade)", "font-size": "12px" } };
const _hoisted_35$4 = {
  key: 2,
  class: "hint",
  style: { "margin-top": "2px" }
};
const _hoisted_36$4 = { class: "pay-methods" };
const _hoisted_37$4 = ["data-on"];
const _hoisted_38$4 = ["data-on"];
const _hoisted_39$4 = ["data-on"];
const _hoisted_40$4 = ["data-on"];
const _hoisted_41$4 = { class: "pay-total" };
const _hoisted_42$4 = ["data-ok"];
const _hoisted_43$4 = { class: "tnum" };
const _hoisted_44$3 = {
  class: "hint",
  style: { "margin-top": "6px" }
};
const _hoisted_45$3 = {
  class: "chips",
  style: { "margin-top": "8px" }
};
const _hoisted_46$3 = ["onClick"];
const _hoisted_47$3 = {
  key: 4,
  class: "pay-total"
};
const _hoisted_48$3 = { class: "tnum" };
const _hoisted_49$3 = {
  key: 5,
  class: "banner",
  style: { "margin-top": "10px" }
};
const _hoisted_50$3 = { class: "sell-foot" };
const _hoisted_51$3 = { class: "foot-sum" };
const _hoisted_52$3 = { class: "tnum" };
const _hoisted_53$3 = { class: "foot-btns" };
const _hoisted_54$3 = { class: "qr-full-screen" };
const _hoisted_55$3 = { class: "qr-full-head" };
const _hoisted_56$3 = { style: { "display": "flex", "gap": "8px" } };
const _hoisted_57$3 = { class: "qr-amount" };
const _hoisted_58$3 = { class: "tnum" };
const _hoisted_59$3 = { class: "qr-img-wrap" };
const _hoisted_60$3 = ["src"];
const _hoisted_61$3 = {
  class: "hint",
  style: { "text-align": "center", "margin-top": "14px" }
};
const _sfc_main$d = {
  __name: "SellSheet",
  props: {
    show: Boolean,
    /* 从挂单恢复时传进来：[{productId, qty}] */
    preset: { type: Array, default: () => [] },
    /* 从哪张挂单恢复来的：结算成功后要把那张挂单收口（closed=true） */
    holdId: { type: String, default: "" }
  },
  emits: ["update:show", "settled"],
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    const emit2 = __emit;
    const step = /* @__PURE__ */ ref("pick");
    const q = /* @__PURE__ */ ref("");
    const cat = /* @__PURE__ */ ref("all");
    const inStockOnly = /* @__PURE__ */ ref(false);
    const catTree = computed(() => categoryTree.value.map((t2) => ({
      id: t2.id,
      name: t2.name,
      children: (t2.children || []).map((ch) => ({ id: ch.id, name: ch.name }))
    })));
    const activeParent = computed(() => {
      if (cat.value === "all" || cat.value === "stock") return null;
      return catTree.value.find((t2) => t2.id === cat.value || t2.children.some((ch) => ch.id === cat.value)) || null;
    });
    const cart = /* @__PURE__ */ ref([]);
    const receivedInput = /* @__PURE__ */ ref("");
    const payMethod = /* @__PURE__ */ ref("wechat");
    const discount = /* @__PURE__ */ ref(0);
    const showQR = /* @__PURE__ */ ref(false);
    const qrRotate = /* @__PURE__ */ ref(0);
    watch(() => props2.show, (v) => {
      if (!v) return;
      step.value = "pick";
      q.value = "";
      cat.value = "all";
      receivedInput.value = "";
      payMethod.value = "wechat";
      discount.value = 0;
      cart.value = (props2.preset || []).filter((it) => products.value.some((p2) => p2.id === it.productId)).map((it) => ({ productId: it.productId, qty: r2(it.qty) }));
    });
    const list = computed(() => {
      const kw = q.value.trim().toLowerCase();
      let arr;
      if (cat.value === "all") {
        arr = products.value;
      } else if (cat.value === "stock") {
        arr = products.value.filter((p2) => storeStockOf(p2.id) > 0);
      } else {
        arr = productsInCategory(cat.value);
      }
      if (kw) arr = arr.filter((p2) => (p2.name || "").toLowerCase().includes(kw) || (p2.barcode || "").includes(kw));
      return arr;
    });
    const origTotal = computed(() => r2(cart.value.reduce((s, it) => {
      const p2 = products.value.find((x) => x.id === it.productId);
      return s + (p2 ? p2.price * it.qty : 0);
    }, 0)));
    const total = computed(() => discount.value > 0 ? r2(origTotal.value * discount.value / 10) : origTotal.value);
    const roundOffOn = /* @__PURE__ */ ref(false);
    const tail = computed(() => r2(total.value - Math.floor(total.value)));
    const hasTail = computed(() => tail.value > 1e-3);
    const roundOffAmt = computed(() => roundOffOn.value && hasTail.value ? tail.value : 0);
    const payable = computed(() => roundOffOn.value && hasTail.value ? Math.floor(total.value) : total.value);
    const change = computed(() => r2(received.value - payable.value));
    watch([() => discount.value, () => origTotal.value], () => {
      roundOffOn.value = false;
    });
    const minDiscount = computed(() => Math.max(1, Number(state.settings.minDiscount) || 8));
    const cartCost = computed(() => r2(cart.value.reduce((s, it) => {
      const p2 = products.value.find((x) => x.id === it.productId);
      return s + (p2 ? ((Number(p2.cost) || 0) + (Number(p2.other) || 0)) * it.qty : 0);
    }, 0)));
    const costFloor = computed(() => {
      if (!origTotal.value) return 0;
      return r2(cartCost.value / origTotal.value * 10);
    });
    const effMin = computed(() => {
      const raw = Math.max(minDiscount.value, costFloor.value);
      const stepped = Math.ceil(raw * 2) / 2;
      return Math.min(10, Math.max(1, stepped));
    });
    const noDiscount = computed(() => effMin.value >= 10);
    const discountOptions = computed(() => {
      const arr = [];
      for (let x = effMin.value; x < 10; x += 0.5) arr.push(x);
      return arr;
    });
    watch(effMin, (v) => {
      if (discount.value > 0 && discount.value < v) {
        discount.value = noDiscount.value ? 0 : v;
        tip(noDiscount.value ? "这批货成本已经顶到卖价，只能按原价收" : "这批货成本偏高，最低只能打到 " + v + " 折");
      }
    });
    function incStep(p2) {
      return p2 && p2.step && p2.step < 1 ? 0.1 : 1;
    }
    function qtyOf(pid) {
      const it = cart.value.find((x) => x.productId === pid);
      return it ? it.qty : 0;
    }
    function add2(p2) {
      const it = cart.value.find((x) => x.productId === p2.id);
      if (it) it.qty = r2(it.qty + incStep(p2));
      else cart.value.push({ productId: p2.id, qty: incStep(p2) });
    }
    function dec(p2) {
      const it = cart.value.find((x) => x.productId === p2.id);
      if (!it) return;
      it.qty = r2(it.qty - incStep(p2));
      if (it.qty <= 0) cart.value = cart.value.filter((x) => x.productId !== p2.id);
    }
    function setQty2(pid, v) {
      const it = cart.value.find((x) => x.productId === pid);
      if (!it) return;
      const n2 = parseFloat(v);
      it.qty = isFinite(n2) && n2 > 0 ? r2(n2) : 0;
      if (it.qty <= 0) cart.value = cart.value.filter((x) => x.productId !== pid);
    }
    const received = computed(() => {
      const n2 = parseFloat(receivedInput.value);
      return isFinite(n2) ? r2(n2) : payable.value;
    });
    function toPay() {
      if (!cart.value.length) {
        tip("先选商品");
        return;
      }
      receivedInput.value = payable.value.toFixed(2);
      step.value = "pay";
    }
    function setMethod(m) {
      payMethod.value = m;
      if (m !== "cash") receivedInput.value = payable.value.toFixed(2);
    }
    function setDiscount(d) {
      discount.value = discount.value === d ? 0 : d;
      roundOffOn.value = false;
    }
    function toggleRoundOff() {
      if (!hasTail.value) {
        tip("这单没有零头，不用抹");
        return;
      }
      roundOffOn.value = !roundOffOn.value;
      if (payMethod.value === "cash") receivedInput.value = payable.value.toFixed(2);
      else receivedInput.value = payable.value.toFixed(2);
    }
    function quickAmount(v) {
      receivedInput.value = String(v);
    }
    const quickAmounts = computed(() => {
      const t2 = payable.value;
      const out = [];
      const push = (v) => {
        const n2 = r2(v);
        if (n2 >= t2 - 1e-3 && !out.some((x) => Math.abs(x - n2) < 5e-3)) out.push(n2);
      };
      push(t2);
      push(Math.ceil(t2));
      push(Math.ceil(t2 / 10) * 10);
      push(Math.ceil(t2 / 50) * 50);
      push(Math.ceil(t2 / 100) * 100);
      return out.slice(0, 4);
    });
    function openQR(m) {
      payMethod.value = m;
      showQR.value = true;
    }
    function speakNow() {
      if (payMethod.value === "cash" && change.value > 0) {
        speak$1("应收" + money(total.value) + "，实收" + money(change.value + total.value) + "，找零" + money(change.value), true);
      } else {
        speak$1("应收" + money(total.value), true);
      }
    }
    function settle() {
      const finalReceived = received.value;
      const res = checkout({
        items: cart.value.map((it) => ({ productId: it.productId, qty: it.qty })),
        received: finalReceived,
        paymentMethod: payMethod.value,
        discount: discount.value,
        roundOff: roundOffOn.value && hasTail.value ? payable.value : 0,
        /* 挂单收口：带上 holdId，checkout 里会把它标成已结算，别的设备也能看到 */
        holdId: props2.holdId || "",
        note: roundOffAmt.value > 0 ? "抹零" : ""
      });
      if (!res) return;
      if (payMethod.value === "cash" && res.change > 0) {
        speak$1("应收" + money(res.total) + "，收到" + money(res.cashTendered) + "，找零" + money(res.change));
      } else {
        speak$1("收款" + money(res.received));
      }
      if (res.shortages.length) {
        tip("含欠货：" + res.shortages.map((s) => s.name + " 缺 " + fmtQty(s.need - s.have, "")).join("，"));
      } else {
        tip(payMethod.value === "cash" && res.change > 0 ? "已收 " + money(res.received) + "，找零 " + money(res.change) : "已收 " + money(res.received));
      }
      emit2("settled", res);
      emit2("update:show", false);
    }
    function hold() {
      if (!cart.value.length) {
        tip("先选商品");
        return;
      }
      if (saveHold(cart.value.map((it) => ({ productId: it.productId, qty: it.qty })))) {
        tip("已挂单，回头接着卖");
        emit2("update:show", false);
      }
    }
    function close() {
      emit2("update:show", false);
    }
    return (_ctx, _cache) => {
      const _component_var_button = resolveComponent("var-button");
      const _component_var_popup = resolveComponent("var-popup");
      return openBlock(), createBlock(_component_var_popup, {
        show: __props.show,
        position: "bottom",
        "onUpdate:show": _cache[17] || (_cache[17] = (v) => emit2("update:show", v))
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$d, [
            createBaseVNode("header", _hoisted_2$d, [
              createBaseVNode("div", _hoisted_3$d, [
                createBaseVNode("b", null, toDisplayString(step.value === "pick" ? "选择商品" : "确认结算"), 1),
                createBaseVNode("span", null, toDisplayString(step.value === "pick" ? unref(isAgent) ? "代理 · 货是店里的" : "店铺库存" : "应收与实收"), 1)
              ]),
              step.value === "pay" ? (openBlock(), createElementBlock("button", {
                key: 0,
                class: "icon-btn",
                "aria-label": "语音播报",
                onClick: speakNow
              }, [
                createVNode(_sfc_main$g, {
                  name: "speaker",
                  size: 18
                })
              ])) : createCommentVNode("", true),
              createBaseVNode("button", {
                class: "icon-btn",
                "aria-label": "关闭",
                onClick: close
              }, [
                createVNode(_sfc_main$g, {
                  name: "close",
                  size: 18
                })
              ])
            ]),
            step.value === "pick" ? (openBlock(), createElementBlock("div", _hoisted_4$d, [
              createBaseVNode("div", _hoisted_5$d, [
                createVNode(_sfc_main$g, {
                  name: "search",
                  size: 16
                }),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => q.value = $event),
                  type: "search",
                  placeholder: "搜商品名或条码"
                }, null, 512), [
                  [vModelText, q.value]
                ])
              ]),
              createBaseVNode("div", _hoisted_6$d, [
                createBaseVNode("button", {
                  "data-on": cat.value === "all",
                  onClick: _cache[1] || (_cache[1] = ($event) => {
                    cat.value = "all";
                    inStockOnly.value = false;
                  })
                }, "全部", 8, _hoisted_7$d),
                createBaseVNode("button", {
                  "data-on": cat.value === "stock",
                  onClick: _cache[2] || (_cache[2] = ($event) => {
                    cat.value = "stock";
                    inStockOnly.value = true;
                  })
                }, "有库存", 8, _hoisted_8$d),
                (openBlock(true), createElementBlock(Fragment, null, renderList(catTree.value, (c) => {
                  return openBlock(), createElementBlock("button", {
                    key: c.id,
                    "data-on": cat.value === c.id || activeParent.value && activeParent.value.id === c.id,
                    onClick: ($event) => {
                      cat.value = c.id;
                      inStockOnly.value = false;
                    }
                  }, toDisplayString(c.name), 9, _hoisted_9$d);
                }), 128))
              ]),
              activeParent.value && activeParent.value.children.length ? (openBlock(), createElementBlock("div", _hoisted_10$d, [
                createBaseVNode("button", {
                  "data-on": cat.value === activeParent.value.id,
                  onClick: _cache[3] || (_cache[3] = ($event) => cat.value = activeParent.value.id)
                }, "全部", 8, _hoisted_11$c),
                (openBlock(true), createElementBlock(Fragment, null, renderList(activeParent.value.children, (ch) => {
                  return openBlock(), createElementBlock("button", {
                    key: ch.id,
                    "data-on": cat.value === ch.id,
                    onClick: ($event) => cat.value = ch.id
                  }, toDisplayString(ch.name), 9, _hoisted_12$c);
                }), 128))
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_13$c, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (p2) => {
                  return openBlock(), createElementBlock("div", {
                    key: p2.id,
                    class: "prod"
                  }, [
                    createVNode(_sfc_main$e, {
                      product: p2,
                      size: 42
                    }, null, 8, ["product"]),
                    createBaseVNode("div", _hoisted_14$b, [
                      createBaseVNode("b", null, toDisplayString(p2.name), 1),
                      createBaseVNode("span", null, toDisplayString(unref(money)(p2.price)) + " / " + toDisplayString(p2.unit) + " · 库存 " + toDisplayString(unref(fmtQty)(unref(storeStockOf)(p2.id), p2.unit)), 1)
                    ]),
                    createBaseVNode("div", _hoisted_15$b, [
                      qtyOf(p2.id) > 0 ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        class: "round",
                        onClick: ($event) => dec(p2)
                      }, [
                        createVNode(_sfc_main$g, {
                          name: "minus",
                          size: 14
                        })
                      ], 8, _hoisted_16$b)) : createCommentVNode("", true),
                      qtyOf(p2.id) > 0 ? (openBlock(), createElementBlock("input", {
                        key: 1,
                        class: "qty-in tnum",
                        type: "text",
                        inputmode: "decimal",
                        value: qtyOf(p2.id),
                        onFocus: _cache[4] || (_cache[4] = (e) => e.target.select()),
                        onChange: (e) => setQty2(p2.id, e.target.value),
                        onKeyup: withKeys((e) => {
                          setQty2(p2.id, e.target.value);
                          e.target.blur();
                        }, ["enter"])
                      }, null, 40, _hoisted_17$b)) : createCommentVNode("", true),
                      createBaseVNode("button", {
                        class: "round jade",
                        onClick: ($event) => add2(p2)
                      }, [
                        createVNode(_sfc_main$g, {
                          name: "plus",
                          size: 14
                        })
                      ], 8, _hoisted_18$b)
                    ])
                  ]);
                }), 128)),
                !list.value.length ? (openBlock(), createElementBlock("div", _hoisted_19$a, [..._cache[18] || (_cache[18] = [
                  createBaseVNode("b", null, "没有匹配的商品", -1),
                  createTextVNode("换个关键词，或者去商品页添加", -1)
                ])])) : createCommentVNode("", true)
              ])
            ])) : (openBlock(), createElementBlock("div", _hoisted_20$a, [
              createBaseVNode("div", _hoisted_21$9, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(cart.value, (it) => {
                  return openBlock(), createElementBlock("div", {
                    key: it.productId,
                    class: "pay-line"
                  }, [
                    createBaseVNode("div", _hoisted_22$9, [
                      createBaseVNode("b", null, toDisplayString((unref(products).find((p2) => p2.id === it.productId) || {}).name), 1),
                      createBaseVNode("span", null, toDisplayString(unref(money)((unref(products).find((p2) => p2.id === it.productId) || {}).price)) + " × " + toDisplayString(unref(fmtQty)(it.qty, (unref(products).find((p2) => p2.id === it.productId) || {}).unit)), 1)
                    ]),
                    createBaseVNode("input", {
                      class: "num-input qty-input",
                      type: "number",
                      step: "0.01",
                      value: it.qty,
                      onChange: (e) => setQty2(it.productId, e.target.value)
                    }, null, 40, _hoisted_23$9),
                    createBaseVNode("b", _hoisted_24$9, toDisplayString(unref(money2)((unref(products).find((p2) => p2.id === it.productId) || {}).price * it.qty)), 1)
                  ]);
                }), 128))
              ]),
              cart.value.length && costFloor.value >= minDiscount.value ? (openBlock(), createElementBlock("div", _hoisted_25$9, " 这批货成本 " + toDisplayString(unref(money)(cartCost.value)) + "，毛利保底最多打到 " + toDisplayString(noDiscount.value ? "原价（不能打折）" : effMin.value + " 折"), 1)) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_26$8, [
                createBaseVNode("button", {
                  class: "chip",
                  "data-on": discount.value === 0,
                  onClick: _cache[5] || (_cache[5] = ($event) => setDiscount(0))
                }, "原价", 8, _hoisted_27$8),
                (openBlock(true), createElementBlock(Fragment, null, renderList(discountOptions.value, (d) => {
                  return openBlock(), createElementBlock("button", {
                    key: d,
                    class: "chip",
                    "data-on": discount.value === d,
                    onClick: ($event) => setDiscount(d)
                  }, toDisplayString(d) + "折", 9, _hoisted_28$7);
                }), 128)),
                hasTail.value || roundOffOn.value ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: "chip",
                  "data-on": roundOffOn.value,
                  onClick: toggleRoundOff
                }, [
                  createTextVNode("抹零到 " + toDisplayString(Math.floor(total.value)), 1),
                  roundOffOn.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createTextVNode("✓")
                  ], 64)) : createCommentVNode("", true)
                ], 8, _hoisted_29$7)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_30$7, [
                createBaseVNode("span", null, [
                  _cache[19] || (_cache[19] = createTextVNode("应收", -1)),
                  discount.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createTextVNode("（" + toDisplayString(discount.value) + "折）", 1)
                  ], 64)) : createCommentVNode("", true)
                ]),
                createBaseVNode("b", _hoisted_31$7, toDisplayString(unref(money)(payable.value)), 1)
              ]),
              discount.value || roundOffOn.value ? (openBlock(), createElementBlock("div", _hoisted_32$6, [
                createBaseVNode("span", _hoisted_33$6, "原价 " + toDisplayString(unref(money)(origTotal.value)), 1),
                createBaseVNode("span", _hoisted_34$5, "省 " + toDisplayString(unref(money)(unref(r2)(origTotal.value - payable.value))), 1)
              ])) : createCommentVNode("", true),
              discount.value || roundOffOn.value ? (openBlock(), createElementBlock("div", _hoisted_35$4, [
                createTextVNode(" 折扣省 " + toDisplayString(unref(money)(unref(r2)(origTotal.value - total.value))), 1),
                roundOffAmt.value > 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createTextVNode("，抹零 " + toDisplayString(unref(money)(roundOffAmt.value)), 1)
                ], 64)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_36$4, [
                createBaseVNode("button", {
                  "data-on": payMethod.value === "wechat",
                  onClick: _cache[6] || (_cache[6] = ($event) => setMethod("wechat"))
                }, "微信", 8, _hoisted_37$4),
                payMethod.value === "wechat" && unref(state).settings.showQR !== false && unref(state).settings.wechatQR ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: "qr-icon-btn",
                  "aria-label": "展示微信收款码",
                  onClick: _cache[7] || (_cache[7] = withModifiers(($event) => openQR("wechat"), ["stop"]))
                }, [
                  createVNode(_sfc_main$g, {
                    name: "qrcode",
                    size: 18
                  })
                ])) : createCommentVNode("", true),
                createBaseVNode("button", {
                  "data-on": payMethod.value === "alipay",
                  onClick: _cache[8] || (_cache[8] = ($event) => setMethod("alipay"))
                }, "支付宝", 8, _hoisted_38$4),
                payMethod.value === "alipay" && unref(state).settings.showQR !== false && unref(state).settings.alipayQR ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  class: "qr-icon-btn",
                  "aria-label": "展示支付宝收款码",
                  onClick: _cache[9] || (_cache[9] = withModifiers(($event) => openQR("alipay"), ["stop"]))
                }, [
                  createVNode(_sfc_main$g, {
                    name: "qrcode",
                    size: 18
                  })
                ])) : createCommentVNode("", true),
                createBaseVNode("button", {
                  "data-on": payMethod.value === "cash",
                  onClick: _cache[10] || (_cache[10] = ($event) => setMethod("cash"))
                }, "现金", 8, _hoisted_39$4),
                createBaseVNode("button", {
                  "data-on": payMethod.value === "other",
                  onClick: _cache[11] || (_cache[11] = ($event) => setMethod("other"))
                }, "其他", 8, _hoisted_40$4)
              ]),
              payMethod.value === "cash" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                createBaseVNode("div", _hoisted_41$4, [
                  _cache[20] || (_cache[20] = createBaseVNode("span", null, "顾客给 ¥", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => receivedInput.value = $event),
                    class: "num-input pay-input",
                    type: "number",
                    step: "0.01"
                  }, null, 512), [
                    [vModelText, receivedInput.value]
                  ])
                ]),
                createBaseVNode("div", {
                  class: "change-row",
                  "data-ok": change.value >= 0
                }, [
                  _cache[21] || (_cache[21] = createBaseVNode("span", null, "找零", -1)),
                  createBaseVNode("b", _hoisted_43$4, toDisplayString(change.value >= 0 ? unref(money)(change.value) : "欠 " + unref(money)(-change.value)), 1)
                ], 8, _hoisted_42$4),
                createBaseVNode("div", _hoisted_44$3, " 实收按应收 " + toDisplayString(unref(money)(payable.value)) + " 记账；顾客多给的部分找零退回去，不算收入 ", 1),
                createBaseVNode("div", _hoisted_45$3, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(quickAmounts.value, (v) => {
                    return openBlock(), createElementBlock("button", {
                      key: v,
                      class: "chip",
                      onClick: ($event) => quickAmount(v)
                    }, toDisplayString(v === payable.value ? "刚好 " + unref(money)(v) : unref(money)(v)), 9, _hoisted_46$3);
                  }), 128))
                ])
              ], 64)) : (openBlock(), createElementBlock("div", _hoisted_47$3, [
                _cache[22] || (_cache[22] = createBaseVNode("span", null, "实收", -1)),
                createBaseVNode("b", _hoisted_48$3, toDisplayString(unref(money)(payable.value)), 1)
              ])),
              roundOffOn.value && roundOffAmt.value > 0 ? (openBlock(), createElementBlock("div", _hoisted_49$3, [
                createVNode(_sfc_main$g, {
                  name: "alert",
                  size: 16
                }),
                createTextVNode(" 已抹零 " + toDisplayString(unref(money)(roundOffAmt.value)), 1),
                _ctx.showCost ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createTextVNode("，这部分直接从销售额和毛利里扣掉")
                ], 64)) : createCommentVNode("", true),
                _cache[23] || (_cache[23] = createTextVNode("。 ", -1))
              ])) : createCommentVNode("", true)
            ])),
            createBaseVNode("footer", _hoisted_50$3, [
              createBaseVNode("div", _hoisted_51$3, [
                createBaseVNode("b", _hoisted_52$3, toDisplayString(unref(money)(step.value === "pick" ? total.value : payable.value)), 1),
                createBaseVNode("span", null, [
                  createTextVNode(toDisplayString(cart.value.length) + " 行商品 ", 1),
                  step.value === "pay" && payMethod.value === "cash" && change.value > 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createTextVNode(" · 找零 " + toDisplayString(unref(money)(change.value)), 1)
                  ], 64)) : createCommentVNode("", true)
                ])
              ]),
              createBaseVNode("div", _hoisted_53$3, [
                createVNode(_component_var_button, {
                  size: "small",
                  onClick: hold
                }, {
                  default: withCtx(() => [..._cache[24] || (_cache[24] = [
                    createTextVNode("挂单", -1)
                  ])]),
                  _: 1
                }),
                step.value === "pick" ? (openBlock(), createBlock(_component_var_button, {
                  key: 0,
                  type: "primary",
                  size: "normal",
                  disabled: !cart.value.length,
                  onClick: toPay
                }, {
                  default: withCtx(() => [..._cache[25] || (_cache[25] = [
                    createTextVNode("去结算", -1)
                  ])]),
                  _: 1
                }, 8, ["disabled"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createVNode(_component_var_button, {
                    size: "normal",
                    onClick: _cache[13] || (_cache[13] = ($event) => step.value = "pick")
                  }, {
                    default: withCtx(() => [..._cache[26] || (_cache[26] = [
                      createTextVNode("返回", -1)
                    ])]),
                    _: 1
                  }),
                  createVNode(_component_var_button, {
                    type: "primary",
                    size: "normal",
                    onClick: settle
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(payMethod.value === "cash" ? "确认收款" : "收款"), 1)
                    ]),
                    _: 1
                  })
                ], 64))
              ])
            ])
          ]),
          createVNode(_component_var_popup, {
            show: showQR.value,
            position: "full",
            "onUpdate:show": _cache[16] || (_cache[16] = (v) => showQR.value = v)
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_54$3, [
                createBaseVNode("div", _hoisted_55$3, [
                  createBaseVNode("b", null, toDisplayString(payMethod.value === "wechat" ? "微信收款" : "支付宝收款"), 1),
                  createBaseVNode("div", _hoisted_56$3, [
                    createBaseVNode("button", {
                      class: "icon-btn",
                      "aria-label": "旋转二维码",
                      onClick: _cache[14] || (_cache[14] = ($event) => qrRotate.value += 90)
                    }, [..._cache[27] || (_cache[27] = [
                      createBaseVNode("svg", {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }, [
                        createBaseVNode("path", { d: "M21 12a9 9 0 1 1-9-9" }),
                        createBaseVNode("path", { d: "M21 3v9h-9" })
                      ], -1)
                    ])]),
                    createBaseVNode("button", {
                      class: "icon-btn",
                      "aria-label": "关闭",
                      onClick: _cache[15] || (_cache[15] = ($event) => showQR.value = false)
                    }, [
                      createVNode(_sfc_main$g, {
                        name: "close",
                        size: 18
                      })
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_57$3, [
                  _cache[28] || (_cache[28] = createTextVNode("应付 ", -1)),
                  createBaseVNode("b", _hoisted_58$3, toDisplayString(unref(money)(total.value)), 1)
                ]),
                createBaseVNode("div", _hoisted_59$3, [
                  (payMethod.value === "wechat" ? unref(state).settings.wechatQR : unref(state).settings.alipayQR) ? (openBlock(), createElementBlock("img", {
                    key: 0,
                    src: payMethod.value === "wechat" ? unref(state).settings.wechatQR : unref(state).settings.alipayQR,
                    class: "qr-img",
                    style: normalizeStyle({ transform: "rotate(" + qrRotate.value + "deg)" }),
                    alt: "收款码"
                  }, null, 12, _hoisted_60$3)) : createCommentVNode("", true)
                ]),
                createBaseVNode("p", _hoisted_61$3, "请顾客扫码支付 " + toDisplayString(unref(money)(total.value)), 1),
                createVNode(_component_var_button, {
                  type: "primary",
                  size: "normal",
                  style: { "width": "100%", "margin-top": "16px" },
                  onClick: settle
                }, {
                  default: withCtx(() => [
                    createTextVNode("已扫码收款 " + toDisplayString(unref(money)(total.value)), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }, 8, ["show"])
        ]),
        _: 1
      }, 8, ["show"]);
    };
  }
};
const SellSheet = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-6df9b48d"]]);
const nav = /* @__PURE__ */ reactive({ view: "home" });
function go(view) {
  nav.view = view;
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
const _hoisted_1$c = { class: "page" };
const _hoisted_2$c = { class: "topbar" };
const _hoisted_3$c = { class: "title" };
const _hoisted_4$c = { class: "sub" };
const _hoisted_5$c = { class: "receipt" };
const _hoisted_6$c = { class: "receipt-head" };
const _hoisted_7$c = { class: "amount" };
const _hoisted_8$c = { class: "tnum" };
const _hoisted_9$c = { class: "metrics" };
const _hoisted_10$c = { key: 0 };
const _hoisted_11$b = { key: 1 };
const _hoisted_12$b = { class: "bs-ico" };
const _hoisted_13$b = { class: "quick-mini" };
const _hoisted_14$a = {
  key: 0,
  class: "banner jade",
  style: { "margin-top": "14px" }
};
const _hoisted_15$a = { class: "sec-head" };
const _hoisted_16$a = { class: "hint" };
const _hoisted_17$a = { class: "card" };
const _hoisted_18$a = ["onClick"];
const _hoisted_19$9 = { class: "ico" };
const _hoisted_20$9 = { class: "txt" };
const _hoisted_21$8 = { class: "sec-head" };
const _hoisted_22$8 = { class: "card" };
const _hoisted_23$8 = {
  class: "ico",
  style: { "background": "var(--amber-soft)", "color": "#7C5409" }
};
const _hoisted_24$8 = { class: "txt" };
const _hoisted_25$8 = { class: "sec-head" };
const _hoisted_26$7 = { class: "card" };
const _hoisted_27$7 = { class: "ico" };
const _hoisted_28$6 = { class: "txt" };
const _hoisted_29$6 = { key: 0 };
const _hoisted_30$6 = { key: 1 };
const _hoisted_31$6 = { class: "right" };
const _hoisted_32$5 = {
  key: 0,
  class: "empty"
};
const _hoisted_33$5 = {
  class: "hint",
  style: { "text-align": "center", "margin-top": "18px" }
};
const _sfc_main$c = {
  __name: "HomeView",
  setup(__props) {
    const sellOpen = /* @__PURE__ */ ref(false);
    const preset = /* @__PURE__ */ ref([]);
    const store = computed(() => activeStore.value);
    const todayOrders = computed(() => filterOrders(orders.value, {
      from: startOfDay(),
      storeId: store.value ? store.value.id : ""
    }));
    const today = computed(() => summarize(todayOrders.value, productById));
    const recent = computed(() => todayOrders.value.slice().sort((a, b) => b.at - a.at).slice(0, 3));
    const refills = computed(() => refillList());
    function openSell() {
      preset.value = [];
      resumeHoldId.value = "";
      sellOpen.value = true;
    }
    const resumeHoldId = /* @__PURE__ */ ref("");
    function resumeHold(h2) {
      preset.value = h2.items.map((it) => ({ productId: it.productId, qty: it.qty }));
      resumeHoldId.value = h2.id;
      sellOpen.value = true;
    }
    function onSellClose(v) {
      sellOpen.value = v;
      if (!v) resumeHoldId.value = "";
    }
    function demoScan(kind) {
      tip(kind + "识别是演示占位：可以在商品页给商品填条码，真机上接识别服务即可");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        createBaseVNode("div", _hoisted_2$c, [
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_3$c, toDisplayString(store.value ? store.value.name : "未选店铺"), 1),
            createBaseVNode("div", _hoisted_4$c, toDisplayString(unref(isAgent) ? "代理 · " + (unref(agentProfile) ? unref(agentProfile).name : "") : "店主 · 收银台"), 1)
          ]),
          _cache[7] || (_cache[7] = createBaseVNode("div", { class: "spacer" }, null, -1)),
          createBaseVNode("button", {
            class: "icon-btn",
            "aria-label": "设置",
            onClick: _cache[0] || (_cache[0] = ($event) => unref(go)("me"))
          }, [
            createVNode(_sfc_main$g, {
              name: "theme",
              size: 18
            })
          ])
        ]),
        createBaseVNode("div", _hoisted_5$c, [
          _cache[15] || (_cache[15] = createBaseVNode("div", { class: "tape" }, null, -1)),
          createBaseVNode("div", _hoisted_6$c, [
            _cache[8] || (_cache[8] = createBaseVNode("span", null, "今日小票", -1)),
            _cache[9] || (_cache[9] = createBaseVNode("span", { class: "grow" }, null, -1)),
            createBaseVNode("span", null, toDisplayString((/* @__PURE__ */ new Date()).getMonth() + 1) + "月" + toDisplayString((/* @__PURE__ */ new Date()).getDate()) + "日", 1)
          ]),
          createBaseVNode("div", _hoisted_7$c, [
            _cache[10] || (_cache[10] = createBaseVNode("small", null, "¥", -1)),
            createBaseVNode("b", _hoisted_8$c, toDisplayString(unref(money2)(today.value.sales)), 1)
          ]),
          createBaseVNode("div", _hoisted_9$c, [
            createBaseVNode("div", null, [
              _cache[11] || (_cache[11] = createTextVNode("单数", -1)),
              createBaseVNode("b", null, toDisplayString(today.value.count), 1)
            ]),
            unref(showCost) ? (openBlock(), createElementBlock("div", _hoisted_10$c, [
              _cache[12] || (_cache[12] = createTextVNode("毛利", -1)),
              createBaseVNode("b", null, toDisplayString(unref(money2)(today.value.profit)), 1)
            ])) : (openBlock(), createElementBlock("div", _hoisted_11$b, [
              _cache[13] || (_cache[13] = createTextVNode("实收", -1)),
              createBaseVNode("b", null, toDisplayString(unref(money2)(today.value.received)), 1)
            ])),
            createBaseVNode("div", null, [
              _cache[14] || (_cache[14] = createTextVNode("客单价", -1)),
              createBaseVNode("b", null, toDisplayString(unref(money2)(today.value.count ? today.value.sales / today.value.count : 0)), 1)
            ])
          ])
        ]),
        createBaseVNode("button", {
          class: "big-sell-btn",
          onClick: openSell
        }, [
          createBaseVNode("span", _hoisted_12$b, [
            createVNode(_sfc_main$g, {
              name: "cart",
              size: 32
            })
          ]),
          _cache[16] || (_cache[16] = createBaseVNode("span", { class: "bs-txt" }, [
            createBaseVNode("b", null, "手动开单"),
            createBaseVNode("small", null, "选商品 · 结账 · 找零，一步到位")
          ], -1)),
          createVNode(_sfc_main$g, {
            name: "chev",
            size: 22,
            style: { "opacity": ".85" }
          })
        ]),
        createBaseVNode("div", _hoisted_13$b, [
          createBaseVNode("button", {
            class: "q-mini",
            onClick: _cache[1] || (_cache[1] = ($event) => demoScan("拍照"))
          }, [
            createVNode(_sfc_main$g, {
              name: "search",
              size: 16
            }),
            _cache[17] || (_cache[17] = createBaseVNode("span", null, "拍照识别", -1))
          ]),
          createBaseVNode("button", {
            class: "q-mini",
            onClick: _cache[2] || (_cache[2] = ($event) => demoScan("条码"))
          }, [
            createVNode(_sfc_main$g, {
              name: "list",
              size: 16
            }),
            _cache[18] || (_cache[18] = createBaseVNode("span", null, "条码识别", -1))
          ])
        ]),
        unref(isAgent) ? (openBlock(), createElementBlock("div", _hoisted_14$a, [
          createVNode(_sfc_main$g, {
            name: "alert",
            size: 16
          }),
          _cache[19] || (_cache[19] = createTextVNode(" 你在代卖点模式：能开单、能挂单，商品和库存是店主的，不能改。 ", -1))
        ])) : createCommentVNode("", true),
        unref(holds).length ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_15$a, [
            _cache[20] || (_cache[20] = createBaseVNode("h2", null, "挂着的单", -1)),
            _cache[21] || (_cache[21] = createBaseVNode("div", { class: "line" }, null, -1)),
            createBaseVNode("span", _hoisted_16$a, toDisplayString(unref(holds).length), 1)
          ]),
          createBaseVNode("div", _hoisted_17$a, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(holds), (h2) => {
              return openBlock(), createElementBlock("button", {
                key: h2.id,
                class: "row",
                onClick: ($event) => resumeHold(h2)
              }, [
                createBaseVNode("span", _hoisted_19$9, [
                  createVNode(_sfc_main$g, {
                    name: "clock",
                    size: 18
                  })
                ]),
                createBaseVNode("span", _hoisted_20$9, [
                  createBaseVNode("b", null, toDisplayString(unref(money)(h2.items.reduce((s, it) => s + it.price * it.qty, 0))), 1),
                  createBaseVNode("span", null, toDisplayString(h2.items.map((it) => it.name + " ×" + unref(fmtQty)(it.qty, it.unit)).join("，")), 1)
                ]),
                _cache[22] || (_cache[22] = createBaseVNode("span", { class: "right" }, [
                  createBaseVNode("b", { style: { "color": "var(--jade)" } }, "继续"),
                  createBaseVNode("span", null, "接着卖")
                ], -1))
              ], 8, _hoisted_18$a);
            }), 128))
          ])
        ], 64)) : createCommentVNode("", true),
        refills.value.length && unref(allow)("stock:write") ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          createBaseVNode("div", _hoisted_21$8, [
            _cache[23] || (_cache[23] = createBaseVNode("h2", null, "该补货了", -1)),
            _cache[24] || (_cache[24] = createBaseVNode("div", { class: "line" }, null, -1)),
            createBaseVNode("button", {
              class: "hint",
              style: { "color": "var(--jade)" },
              onClick: _cache[3] || (_cache[3] = ($event) => unref(go)("warehouses"))
            }, "去调拨")
          ]),
          createBaseVNode("div", _hoisted_22$8, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(refills.value.slice(0, 3), (r) => {
              return openBlock(), createElementBlock("button", {
                key: r.product.id,
                class: "row",
                onClick: _cache[4] || (_cache[4] = ($event) => unref(go)("warehouses"))
              }, [
                createBaseVNode("span", _hoisted_23$8, [
                  createVNode(_sfc_main$g, {
                    name: "layers",
                    size: 18
                  })
                ]),
                createBaseVNode("span", _hoisted_24$8, [
                  createBaseVNode("b", null, toDisplayString(r.product.name), 1),
                  createBaseVNode("span", null, "店内 " + toDisplayString(unref(fmtQty)(r.store, r.product.unit)) + " · 仓库还有 " + toDisplayString(unref(fmtQty)(r.whTotal, r.product.unit)), 1)
                ]),
                _cache[25] || (_cache[25] = createBaseVNode("span", { class: "right" }, [
                  createBaseVNode("b", null, "调拨"),
                  createBaseVNode("span", null, "从仓库拿")
                ], -1))
              ]);
            }), 128))
          ])
        ], 64)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_25$8, [
          _cache[26] || (_cache[26] = createBaseVNode("h2", null, "今天的单", -1)),
          _cache[27] || (_cache[27] = createBaseVNode("div", { class: "line" }, null, -1)),
          createBaseVNode("button", {
            class: "hint",
            style: { "color": "var(--jade)" },
            onClick: _cache[5] || (_cache[5] = ($event) => unref(go)("orders"))
          }, "全部")
        ]),
        createBaseVNode("div", _hoisted_26$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(recent.value, (o) => {
            return openBlock(), createElementBlock("div", {
              key: o.id,
              class: "row"
            }, [
              createBaseVNode("span", _hoisted_27$7, [
                createVNode(_sfc_main$g, {
                  name: "list",
                  size: 18
                })
              ]),
              createBaseVNode("span", _hoisted_28$6, [
                createBaseVNode("b", null, toDisplayString(o.agentId ? "代理单 · " + ((unref(state).collections.agents.find((a) => a.id === o.agentId) || {}).name || "") : o.items.map((i) => i.name).join("、")), 1),
                unref(showCost) ? (openBlock(), createElementBlock("span", _hoisted_29$6, toDisplayString(o.items.length) + " 行 · 毛利 " + toDisplayString(unref(money2)(unref(orderStats)(o, unref(productById)).profit)), 1)) : (openBlock(), createElementBlock("span", _hoisted_30$6, toDisplayString(o.items.length) + " 行商品" + toDisplayString(o.agentId ? " · 代理开单" : ""), 1))
              ]),
              createBaseVNode("span", _hoisted_31$6, [
                createBaseVNode("b", null, toDisplayString(unref(money2)(o.received)), 1),
                createBaseVNode("span", null, toDisplayString(new Date(o.at).getHours()) + ":" + toDisplayString(String(new Date(o.at).getMinutes()).padStart(2, "0")), 1)
              ])
            ]);
          }), 128)),
          !recent.value.length ? (openBlock(), createElementBlock("div", _hoisted_32$5, [..._cache[28] || (_cache[28] = [
            createBaseVNode("b", null, "今天还没开单", -1),
            createTextVNode("点上面的「手动开单」，选货、收款就完事", -1)
          ])])) : createCommentVNode("", true)
        ]),
        createBaseVNode("p", _hoisted_33$5, " 数据存在本机 " + toDisplayString(unref(state).storageKind) + "，可以导出 JSON 同步到别的设备 ", 1),
        createVNode(SellSheet, {
          show: sellOpen.value,
          "onUpdate:show": [
            _cache[6] || (_cache[6] = ($event) => sellOpen.value = $event),
            onSellClose
          ],
          preset: preset.value,
          "hold-id": resumeHoldId.value
        }, null, 8, ["show", "preset", "hold-id"])
      ]);
    };
  }
};
const HomeView = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-b69848bc"]]);
const _hoisted_1$b = ["disabled"];
const _hoisted_2$b = { class: "pf-label" };
const _hoisted_3$b = { class: "picker-sheet" };
const _hoisted_4$b = { class: "picker-head" };
const _hoisted_5$b = {
  key: 0,
  class: "picker-search"
};
const _hoisted_6$b = { class: "picker-list" };
const _hoisted_7$b = ["onClick"];
const _hoisted_8$b = { class: "po-main" };
const _hoisted_9$b = {
  key: 0,
  class: "po-hint"
};
const _hoisted_10$b = {
  key: 0,
  class: "empty"
};
const _sfc_main$b = {
  __name: "PickerField",
  props: {
    modelValue: { type: [String, Number], default: "" },
    options: { type: Array, default: () => [] },
    title: { type: String, default: "请选择" },
    placeholder: { type: String, default: "请选择" },
    disabled: Boolean
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    const emit2 = __emit;
    const open = /* @__PURE__ */ ref(false);
    const kw = /* @__PURE__ */ ref("");
    const current = computed(
      () => props2.options.find((o) => String(o.value) === String(props2.modelValue)) || null
    );
    const label = computed(() => current.value ? current.value.label : props2.placeholder);
    const filtered = computed(() => {
      const k = kw.value.trim();
      if (!k) return props2.options;
      return props2.options.filter((o) => (o.label || "").includes(k));
    });
    watch(open, (v) => {
      if (v) kw.value = "";
    });
    function pick(o) {
      emit2("update:modelValue", o.value);
      emit2("change", o.value);
      open.value = false;
    }
    return (_ctx, _cache) => {
      const _component_var_popup = resolveComponent("var-popup");
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("button", {
          type: "button",
          class: normalizeClass(["picker-field", { empty: !current.value, disabled: __props.disabled }]),
          disabled: __props.disabled,
          onClick: _cache[0] || (_cache[0] = ($event) => !__props.disabled && (open.value = true))
        }, [
          createBaseVNode("span", _hoisted_2$b, toDisplayString(label.value), 1),
          createVNode(_sfc_main$g, {
            name: "down",
            size: 14
          })
        ], 10, _hoisted_1$b),
        createVNode(_component_var_popup, {
          show: open.value,
          position: "bottom",
          "onUpdate:show": _cache[3] || (_cache[3] = (v) => open.value = v)
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3$b, [
              createBaseVNode("header", _hoisted_4$b, [
                createBaseVNode("b", null, toDisplayString(__props.title), 1),
                createBaseVNode("button", {
                  class: "icon-btn",
                  "aria-label": "关闭",
                  onClick: _cache[1] || (_cache[1] = ($event) => open.value = false)
                }, [
                  createVNode(_sfc_main$g, {
                    name: "close",
                    size: 18
                  })
                ])
              ]),
              __props.options.length > 7 ? (openBlock(), createElementBlock("div", _hoisted_5$b, [
                createVNode(_sfc_main$g, {
                  name: "search",
                  size: 16
                }),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => kw.value = $event),
                  type: "search",
                  placeholder: "搜一下"
                }, null, 512), [
                  [vModelText, kw.value]
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_6$b, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filtered.value, (o) => {
                  return openBlock(), createElementBlock("button", {
                    key: String(o.value) + o.label,
                    class: normalizeClass(["picker-opt", { on: String(o.value) === String(__props.modelValue), child: o.level === 1 }]),
                    onClick: ($event) => pick(o)
                  }, [
                    createBaseVNode("span", _hoisted_8$b, [
                      createBaseVNode("b", null, toDisplayString(o.label), 1),
                      o.hint ? (openBlock(), createElementBlock("span", _hoisted_9$b, toDisplayString(o.hint), 1)) : createCommentVNode("", true)
                    ]),
                    String(o.value) === String(__props.modelValue) ? (openBlock(), createBlock(_sfc_main$g, {
                      key: 0,
                      name: "check",
                      size: 16
                    })) : createCommentVNode("", true)
                  ], 10, _hoisted_7$b);
                }), 128)),
                !filtered.value.length ? (openBlock(), createElementBlock("div", _hoisted_10$b, [..._cache[4] || (_cache[4] = [
                  createBaseVNode("b", null, "没有匹配项", -1),
                  createTextVNode("换个词试试", -1)
                ])])) : createCommentVNode("", true)
              ])
            ])
          ]),
          _: 1
        }, 8, ["show"])
      ]);
    };
  }
};
const PickerField = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-39c60741"]]);
const _hoisted_1$a = {
  class: "sheet pe-sheet",
  style: { "height": "95dvh", "max-height": "95dvh" }
};
const _hoisted_2$a = { class: "sheet-head" };
const _hoisted_3$a = { class: "sheet-body" };
const _hoisted_4$a = { class: "img-row" };
const _hoisted_5$a = { class: "img-box" };
const _hoisted_6$a = ["src"];
const _hoisted_7$a = {
  class: "chip",
  style: { "cursor": "pointer" }
};
const _hoisted_8$a = { class: "grid2" };
const _hoisted_9$a = { class: "grid2" };
const _hoisted_10$a = { class: "grid2" };
const _hoisted_11$a = {
  class: "chips",
  style: { "margin-bottom": "8px" }
};
const _hoisted_12$a = ["data-on"];
const _hoisted_13$a = ["data-on", "disabled"];
const _hoisted_14$9 = {
  key: 0,
  style: { "margin-bottom": "8px" }
};
const _hoisted_15$9 = { class: "grid2" };
const _hoisted_16$9 = { class: "field-label" };
const _hoisted_17$9 = ["step"];
const _hoisted_18$9 = {
  key: 1,
  class: "grid2",
  style: { "margin-top": "8px" }
};
const _hoisted_19$8 = {
  key: 2,
  class: "banner",
  style: { "margin-top": "12px", "background": "var(--clay-soft)", "color": "var(--clay)" }
};
const _hoisted_20$8 = { class: "sheet-foot" };
const _sfc_main$a = {
  __name: "ProductEditor",
  props: { show: Boolean, productId: { type: String, default: "" } },
  emits: ["update:show"],
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    const emit2 = __emit;
    const form = /* @__PURE__ */ ref({
      name: "",
      price: "",
      cost: "",
      other: "",
      unit: "件",
      step: 1,
      cat: "",
      barcode: "",
      traceCode: "",
      splitFrom: "",
      splitPer: 2,
      img: "",
      desc: "",
      lowStock: 5
    });
    const stockLoc = /* @__PURE__ */ ref("store");
    const stockWh = /* @__PURE__ */ ref("");
    const stockQty = /* @__PURE__ */ ref("");
    const unitLabel = computed(() => form.value.unit || "件");
    const error2 = /* @__PURE__ */ ref("");
    watch(() => props2.show, (v) => {
      var _a;
      if (!v) return;
      error2.value = "";
      const p2 = props2.productId ? products.value.find((x) => x.id === props2.productId) : null;
      form.value = p2 ? {
        name: p2.name,
        price: String(p2.price),
        cost: String(p2.cost),
        other: String(p2.other),
        unit: p2.unit || "件",
        step: p2.step || 1,
        cat: p2.cat || "",
        barcode: p2.barcode || "",
        traceCode: p2.traceCode || "",
        splitFrom: p2.splitFrom || "",
        splitPer: p2.splitPer || 2,
        img: p2.img || "",
        desc: p2.desc || "",
        lowStock: (_a = p2.lowStock) != null ? _a : 5
      } : { name: "", price: "", cost: "", other: "", unit: "件", step: 1, cat: (categories.value[0] || {}).id || "", barcode: "", traceCode: "", splitFrom: "", splitPer: 2, img: "", lowStock: 5 };
      stockLoc.value = "store";
      stockQty.value = "";
      stockWh.value = (warehouses.value[0] || {}).id || "";
    });
    const isEdit = computed(() => !!props2.productId);
    const unitOptions = computed(() => UNITS.map((u) => ({ value: u.v, label: u.v, hint: u.n || "" })));
    const catOptions = computed(() => [
      { value: "", label: "未分类", hint: "不在任何分类下" },
      ...categoryTree.value.flatMap((t2) => [
        { value: t2.id, label: t2.name, hint: "大类" },
        ...t2.children.map((ch) => ({ value: ch.id, label: ch.name, hint: t2.name + " 的二级", level: 1 }))
      ])
    ]);
    const whOptions = computed(() => warehouses.value.map((w) => ({ value: w.id, label: w.name })));
    const parentOptions = computed(() => parents.value.map((p2) => ({ value: p2.id, label: p2.name, hint: p2.unit })));
    const parents = computed(() => products.value.filter((p2) => p2.id !== props2.productId));
    function onUnitChange() {
      const u = UNITS.find((x) => x.v === form.value.unit);
      form.value.step = u ? u.step : 1;
    }
    function pickImage(e) {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const max = 600;
          const scale = Math.min(1, max / Math.max(img.width, img.height));
          const cv = document.createElement("canvas");
          cv.width = Math.round(img.width * scale);
          cv.height = Math.round(img.height * scale);
          cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
          form.value.img = cv.toDataURL("image/jpeg", 0.72);
          tip("图片已压缩到 " + cv.width + "×" + cv.height);
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(f);
    }
    function onImgUrl(e) {
      const v = String(e.target.value || "").trim();
      if (!v) {
        form.value.img = "";
        return;
      }
      if (!/^(https?:\/\/|data:image\/)/i.test(v)) {
        tip("链接要以 http:// 或 https:// 开头");
        return;
      }
      form.value.img = v;
    }
    function removeProduct() {
      if (!window.confirm("删除商品会同时清掉它的库存记录，确定删？")) return;
      deleteProduct(props2.productId);
      emit2("update:show", false);
      tip("已删除");
    }
    function submit() {
      const f = form.value;
      if (!f.name.trim()) {
        error2.value = "商品名称不能空";
        return;
      }
      const price = parseFloat(f.price);
      if (!(price > 0)) {
        error2.value = "售价要大于 0";
        return;
      }
      const cost = parseFloat(f.cost);
      if (!(cost > 0)) {
        error2.value = "成本要大于 0：成本为 0 会让毛利虚高";
        return;
      }
      const newId2 = saveProduct({
        name: f.name,
        price,
        cost,
        other: parseFloat(f.other) || 0,
        lowStock: parseFloat(f.lowStock) >= 0 ? parseFloat(f.lowStock) : 5,
        unit: f.unit,
        step: parseFloat(f.step) || 1,
        cat: f.cat,
        barcode: f.barcode,
        traceCode: f.traceCode,
        splitFrom: f.splitFrom,
        splitPer: f.splitPer,
        img: f.img,
        desc: f.desc
      }, props2.productId);
      if (!newId2) return;
      const q = parseFloat(stockQty.value);
      if (!isEdit.value && q > 0) {
        if (stockLoc.value === "warehouse" && stockWh.value) {
          setStock(newId2, "warehouse", stockWh.value, q);
        } else {
          const st = activeStore.value;
          if (st) setStock(newId2, "store", st.id, q);
        }
      }
      emit2("update:show", false);
      if (isEdit.value) tip("已保存");
      else tip(q > 0 ? "已加入商品库，并记了首笔库存" : "已加入商品库");
    }
    return (_ctx, _cache) => {
      const _component_var_button = resolveComponent("var-button");
      const _component_var_popup = resolveComponent("var-popup");
      return openBlock(), createBlock(_component_var_popup, {
        show: __props.show,
        position: "bottom",
        "onUpdate:show": _cache[21] || (_cache[21] = (v) => emit2("update:show", v))
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$a, [
            createBaseVNode("header", _hoisted_2$a, [
              createBaseVNode("b", null, toDisplayString(isEdit.value ? "编辑商品" : "新增商品"), 1),
              createBaseVNode("button", {
                class: "icon-btn",
                "aria-label": "关闭",
                onClick: _cache[0] || (_cache[0] = ($event) => emit2("update:show", false))
              }, [
                createVNode(_sfc_main$g, {
                  name: "close",
                  size: 18
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_3$a, [
              _cache[33] || (_cache[33] = createBaseVNode("div", { class: "field-label" }, "商品图片（可选，会自动压缩）", -1)),
              createBaseVNode("div", _hoisted_4$a, [
                createBaseVNode("div", _hoisted_5$a, [
                  form.value.img ? (openBlock(), createElementBlock("img", {
                    key: 0,
                    src: form.value.img,
                    alt: ""
                  }, null, 8, _hoisted_6$a)) : (openBlock(), createBlock(_sfc_main$g, {
                    key: 1,
                    name: "upload",
                    size: 20
                  }))
                ]),
                createBaseVNode("label", _hoisted_7$a, [
                  _cache[22] || (_cache[22] = createTextVNode(" 选择图片 ", -1)),
                  createBaseVNode("input", {
                    type: "file",
                    accept: "image/*",
                    style: { "display": "none" },
                    onChange: pickImage
                  }, null, 32)
                ]),
                form.value.img ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: "chip",
                  onClick: _cache[1] || (_cache[1] = ($event) => form.value.img = "")
                }, "移除")) : createCommentVNode("", true)
              ]),
              _cache[34] || (_cache[34] = createBaseVNode("div", { class: "field-label" }, "图片链接（可选，贴 http(s) 地址就不占本机空间）", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.value.img = $event),
                class: "inp",
                placeholder: "https://…/tape.jpg",
                onChange: onImgUrl
              }, null, 544), [
                [vModelText, form.value.img]
              ]),
              _cache[35] || (_cache[35] = createBaseVNode("p", {
                class: "hint",
                style: { "margin-top": "6px" }
              }, "上传和链接二选一，后填的会覆盖先填的。外链图挂了会自动换成色块占位。", -1)),
              _cache[36] || (_cache[36] = createBaseVNode("div", { class: "field-label" }, "名称 *", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.value.name = $event),
                class: "inp",
                placeholder: "例如 街景胶带整卷"
              }, null, 512), [
                [vModelText, form.value.name]
              ]),
              _cache[37] || (_cache[37] = createBaseVNode("div", { class: "field-label" }, "介绍（可选，一句话描述）", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.value.desc = $event),
                class: "inp",
                placeholder: "例如 本地现烤，每日限量"
              }, null, 512), [
                [vModelText, form.value.desc]
              ]),
              createBaseVNode("div", _hoisted_8$a, [
                createBaseVNode("div", null, [
                  _cache[23] || (_cache[23] = createBaseVNode("div", { class: "field-label" }, "售价 *（每单位）", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => form.value.price = $event),
                    class: "inp num-input",
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00"
                  }, null, 512), [
                    [vModelText, form.value.price]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[24] || (_cache[24] = createBaseVNode("div", { class: "field-label" }, "商品成本 *", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => form.value.cost = $event),
                    class: "inp num-input",
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00"
                  }, null, 512), [
                    [vModelText, form.value.cost]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_9$a, [
                createBaseVNode("div", null, [
                  _cache[25] || (_cache[25] = createBaseVNode("div", { class: "field-label" }, "其他成本（包装/损耗）", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => form.value.other = $event),
                    class: "inp num-input",
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00"
                  }, null, 512), [
                    [vModelText, form.value.other]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[26] || (_cache[26] = createBaseVNode("div", { class: "field-label" }, "单位", -1)),
                  createVNode(PickerField, {
                    modelValue: form.value.unit,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => form.value.unit = $event),
                    options: unitOptions.value,
                    title: "选择单位",
                    onChange: onUnitChange
                  }, null, 8, ["modelValue", "options"])
                ])
              ]),
              createBaseVNode("div", _hoisted_10$a, [
                createBaseVNode("div", null, [
                  _cache[27] || (_cache[27] = createBaseVNode("div", { class: "field-label" }, "最小步长（kg 用 0.01）", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => form.value.step = $event),
                    class: "inp num-input",
                    type: "number",
                    step: "0.01"
                  }, null, 512), [
                    [vModelText, form.value.step]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[28] || (_cache[28] = createBaseVNode("div", { class: "field-label" }, "低库存阈值", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => form.value.lowStock = $event),
                    class: "inp num-input",
                    type: "number",
                    min: "0",
                    step: "1",
                    placeholder: "5"
                  }, null, 512), [
                    [vModelText, form.value.lowStock]
                  ])
                ])
              ]),
              _cache[38] || (_cache[38] = createBaseVNode("div", { class: "note" }, [
                createBaseVNode("b", null, "低库存怎么算："),
                createTextVNode("店内库存 ≤ 这个数，商品行就会标红并出现「补货」角标；填 0 表示不提醒。每个商品各自设，不是全局的。 ")
              ], -1)),
              _cache[39] || (_cache[39] = createBaseVNode("div", {
                class: "field-label",
                style: { "margin-top": "12px" }
              }, "分类", -1)),
              createVNode(PickerField, {
                modelValue: form.value.cat,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => form.value.cat = $event),
                options: catOptions.value,
                title: "选择分类",
                placeholder: "未分类"
              }, null, 8, ["modelValue", "options"]),
              !isEdit.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                _cache[30] || (_cache[30] = createBaseVNode("div", { class: "field-label" }, "首笔库存（可不填，之后也能在仓库页入库）", -1)),
                createBaseVNode("div", _hoisted_11$a, [
                  createBaseVNode("button", {
                    class: "chip",
                    "data-on": stockLoc.value === "store",
                    onClick: _cache[12] || (_cache[12] = ($event) => stockLoc.value = "store")
                  }, "进店内", 8, _hoisted_12$a),
                  createBaseVNode("button", {
                    class: "chip",
                    "data-on": stockLoc.value === "warehouse",
                    disabled: !unref(warehouses).length,
                    onClick: _cache[13] || (_cache[13] = ($event) => stockLoc.value = "warehouse")
                  }, " 进仓库" + toDisplayString(unref(warehouses).length ? "" : "（还没有仓）"), 9, _hoisted_13$a)
                ]),
                stockLoc.value === "warehouse" ? (openBlock(), createElementBlock("div", _hoisted_14$9, [
                  createVNode(PickerField, {
                    modelValue: stockWh.value,
                    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => stockWh.value = $event),
                    options: whOptions.value,
                    title: "选择仓库"
                  }, null, 8, ["modelValue", "options"])
                ])) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_15$9, [
                  createBaseVNode("div", null, [
                    createBaseVNode("div", _hoisted_16$9, "数量（" + toDisplayString(unitLabel.value) + "）", 1),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => stockQty.value = $event),
                      class: "inp num-input",
                      type: "number",
                      step: form.value.step || 1,
                      placeholder: "0"
                    }, null, 8, _hoisted_17$9), [
                      [vModelText, stockQty.value]
                    ])
                  ]),
                  _cache[29] || (_cache[29] = createBaseVNode("div", {
                    class: "hint",
                    style: { "padding-top": "22px" }
                  }, " 进仓库的货，到店铺还要「发放」一次才卖得出去 ", -1))
                ])
              ], 64)) : createCommentVNode("", true),
              _cache[40] || (_cache[40] = createBaseVNode("div", { class: "field-label" }, "条形码（可选）", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => form.value.barcode = $event),
                class: "inp",
                placeholder: "扫码枪/条码识别用"
              }, null, 512), [
                [vModelText, form.value.barcode]
              ]),
              _cache[41] || (_cache[41] = createBaseVNode("div", { class: "field-label" }, "追溯码（可选）", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => form.value.traceCode = $event),
                class: "inp",
                placeholder: "例如 批次号 B2405 / 来源编号"
              }, null, 512), [
                [vModelText, form.value.traceCode]
              ]),
              _cache[42] || (_cache[42] = createBaseVNode("div", { class: "field-label" }, "分装关系（整卷 → 分装）", -1)),
              createVNode(PickerField, {
                modelValue: form.value.splitFrom,
                "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => form.value.splitFrom = $event),
                options: [{ value: "", label: "不是分装商品" }, ...parentOptions.value],
                title: "选择整卷商品",
                placeholder: "不是分装商品"
              }, null, 8, ["modelValue", "options"]),
              form.value.splitFrom ? (openBlock(), createElementBlock("div", _hoisted_18$9, [
                createBaseVNode("div", null, [
                  _cache[31] || (_cache[31] = createBaseVNode("div", { class: "field-label" }, "每卷能拆几份", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => form.value.splitPer = $event),
                    class: "inp num-input",
                    type: "number",
                    min: "2",
                    step: "1"
                  }, null, 512), [
                    [vModelText, form.value.splitPer]
                  ])
                ]),
                _cache[32] || (_cache[32] = createBaseVNode("div", {
                  class: "hint",
                  style: { "padding-top": "22px" }
                }, "拆卷时整卷 −1，分装 +N", -1))
              ])) : createCommentVNode("", true),
              error2.value ? (openBlock(), createElementBlock("div", _hoisted_19$8, [
                createVNode(_sfc_main$g, {
                  name: "alert",
                  size: 16
                }),
                createTextVNode(toDisplayString(error2.value), 1)
              ])) : createCommentVNode("", true)
            ]),
            createBaseVNode("footer", _hoisted_20$8, [
              isEdit.value ? (openBlock(), createBlock(_component_var_button, {
                key: 0,
                size: "normal",
                onClick: removeProduct
              }, {
                default: withCtx(() => [..._cache[43] || (_cache[43] = [
                  createTextVNode("删除", -1)
                ])]),
                _: 1
              })) : createCommentVNode("", true),
              _cache[45] || (_cache[45] = createBaseVNode("div", { style: { "flex": "1" } }, null, -1)),
              createVNode(_component_var_button, {
                size: "normal",
                onClick: _cache[20] || (_cache[20] = ($event) => emit2("update:show", false))
              }, {
                default: withCtx(() => [..._cache[44] || (_cache[44] = [
                  createTextVNode("取消", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_var_button, {
                type: "primary",
                size: "normal",
                onClick: submit
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(isEdit.value ? "保存修改" : "加入商品库"), 1)
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      }, 8, ["show"]);
    };
  }
};
const ProductEditor = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-0f3473ac"]]);
const _hoisted_1$9 = { class: "sheet" };
const _hoisted_2$9 = { class: "sheet-head" };
const _hoisted_3$9 = { class: "sheet-body" };
const _hoisted_4$9 = { class: "drop" };
const _hoisted_5$9 = { class: "drop-ico" };
const _hoisted_6$9 = { class: "drop-txt" };
const _hoisted_7$9 = { class: "drop-act" };
const _hoisted_8$9 = {
  key: 0,
  class: "banner",
  style: { "margin-top": "12px", "background": "var(--clay-soft)", "color": "var(--clay)" }
};
const _hoisted_9$9 = {
  key: 1,
  class: "hint",
  style: { "margin-top": "14px", "line-height": "1.9" }
};
const _hoisted_10$9 = { class: "sum" };
const _hoisted_11$9 = {
  key: 0,
  style: { "color": "var(--clay)" }
};
const _hoisted_12$9 = {
  class: "hint",
  style: { "margin-top": "4px" }
};
const _hoisted_13$9 = { class: "imp" };
const _hoisted_14$8 = { class: "num" };
const _hoisted_15$8 = { class: "num" };
const _hoisted_16$8 = {
  key: 0,
  class: "hint",
  style: { "margin-top": "6px" }
};
const _hoisted_17$8 = { class: "field-label" };
const _hoisted_18$8 = { class: "mode-row" };
const _hoisted_19$7 = ["data-on", "onClick"];
const _hoisted_20$7 = {
  class: "field-label",
  style: { "display": "flex", "align-items": "center", "justify-content": "space-between" }
};
const _hoisted_21$7 = ["data-on"];
const _hoisted_22$7 = {
  class: "mode-row",
  style: { "flex-wrap": "wrap", "gap": "6px" }
};
const _hoisted_23$7 = ["data-on", "onClick"];
const _hoisted_24$7 = {
  class: "hint",
  style: { "margin-top": "12px", "line-height": "1.9" }
};
const _hoisted_25$7 = { key: 0 };
const _hoisted_26$6 = { class: "links" };
const _hoisted_27$6 = { class: "sheet-foot" };
const _sfc_main$9 = {
  __name: "ImportSheet",
  props: { show: Boolean },
  emits: ["update:show"],
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    const emit2 = __emit;
    const preview = /* @__PURE__ */ ref(null);
    const error2 = /* @__PURE__ */ ref("");
    const loading = /* @__PURE__ */ ref(false);
    const mode = /* @__PURE__ */ ref("merge");
    const FIELD_OPTS = [
      ["price", "售价"],
      ["cost", "成本"],
      ["other", "其他成本"],
      ["stock", "库存"],
      ["unit", "单位"],
      ["step", "步长"],
      ["cat", "分类"],
      ["barcode", "条形码"],
      ["traceCode", "追溯码"],
      ["lowStock", "低库存阈值"],
      ["desc", "描述"],
      ["img", "图片"]
    ];
    const fields = /* @__PURE__ */ ref(["price", "stock"]);
    function toggleField(k) {
      fields.value = fields.value.includes(k) ? fields.value.filter((x) => x !== k) : [...fields.value, k];
    }
    const allFields = computed(() => fields.value.length === FIELD_OPTS.length);
    watch(() => props2.show, (v) => {
      if (v) {
        preview.value = null;
        error2.value = "";
        mode.value = "merge";
        fields.value = ["price", "stock"];
      }
    });
    const stats = computed(() => {
      if (!preview.value) return null;
      const valid = preview.value.rows.filter((r) => !r.errs.length);
      const bad = preview.value.rows.length - valid.length;
      const same = valid.filter((r) => products.value.some((p2) => p2.name === r.name));
      const newCats = [...new Set(valid.map((r) => (r.cat || "").trim()).filter((n2) => n2 && !categories.value.some((c) => c.name === n2)))];
      return { valid, bad, same, newCats };
    });
    async function onFile(e) {
      const f = e.target.files && e.target.files[0];
      e.target.value = "";
      if (!f) return;
      loading.value = true;
      error2.value = "";
      try {
        preview.value = await previewTable(f);
      } catch (err) {
        preview.value = null;
        error2.value = err && err.message ? err.message : "读不出这个文件";
      } finally {
        loading.value = false;
      }
    }
    function doImport() {
      if (!preview.value) return;
      if (mode.value === "merge" && !fields.value.length) {
        tip("至少勾一个允许被表格覆盖的字段");
        return;
      }
      const res = applyTableImport(preview.value, mode.value, mode.value === "merge" ? fields.value : null);
      if (!res) return;
      tip("导入完成：新增 " + res.created + "，更新 " + res.updated + (res.skipped ? "，跳过 " + res.skipped : ""));
      emit2("update:show", false);
    }
    function downloadTemplate() {
      if (downloadText("摆摊助手-商品导入模板.csv", templateCSV())) tip("模板已下载，用 Excel 打开填");
      else tip("下载被浏览器拦住了");
    }
    function exportCurrent() {
      const store = activeStore.value;
      if (!store) return;
      const csv = productsToCSV(products.value, categories.value, state.collections.stocks, store.id);
      if (downloadText("摆摊助手-商品表-" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".csv", csv)) {
        tip("已导出 " + products.value.length + " 个商品");
      }
    }
    return (_ctx, _cache) => {
      const _component_var_button = resolveComponent("var-button");
      const _component_var_popup = resolveComponent("var-popup");
      return openBlock(), createBlock(_component_var_popup, {
        show: __props.show,
        position: "bottom",
        "onUpdate:show": _cache[3] || (_cache[3] = (v) => emit2("update:show", v))
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$9, [
            createBaseVNode("header", _hoisted_2$9, [
              _cache[4] || (_cache[4] = createBaseVNode("b", null, "导入商品", -1)),
              createBaseVNode("button", {
                class: "icon-btn",
                "aria-label": "关闭",
                onClick: _cache[0] || (_cache[0] = ($event) => emit2("update:show", false))
              }, [
                createVNode(_sfc_main$g, {
                  name: "close",
                  size: 18
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_3$9, [
              createBaseVNode("label", _hoisted_4$9, [
                createBaseVNode("input", {
                  type: "file",
                  accept: ".xlsx,.xls,.csv,text/csv",
                  style: { "display": "none" },
                  onChange: onFile
                }, null, 32),
                createBaseVNode("span", _hoisted_5$9, [
                  createVNode(_sfc_main$g, {
                    name: "upload",
                    size: 19
                  })
                ]),
                createBaseVNode("span", _hoisted_6$9, [
                  createBaseVNode("b", null, toDisplayString(loading.value ? "正在读文件…" : "选择表格文件"), 1),
                  _cache[5] || (_cache[5] = createBaseVNode("span", null, "支持 .xlsx / .xls / .csv，只读第一个工作表", -1))
                ]),
                createBaseVNode("span", _hoisted_7$9, toDisplayString(loading.value ? "稍等" : "浏览"), 1)
              ]),
              error2.value ? (openBlock(), createElementBlock("p", _hoisted_8$9, [
                createVNode(_sfc_main$g, {
                  name: "alert",
                  size: 16
                }),
                createTextVNode(toDisplayString(error2.value), 1)
              ])) : createCommentVNode("", true),
              !preview.value ? (openBlock(), createElementBlock("div", _hoisted_9$9, [..._cache[6] || (_cache[6] = [
                createTextVNode(" 第一行当表头，列顺序随意，认不出的列会忽略。可用列名：", -1),
                createBaseVNode("br", null, null, -1),
                createTextVNode(" 商品名称 · 售价 · 商品成本 · 其他成本 · 库存 · 分类 · 条形码 · 单位 · 步长 · 分装来源 · 每卷可拆", -1),
                createBaseVNode("br", null, null, -1),
                createTextVNode(" 只有「商品名称 / 售价」必填；分类不存在会自动新建。 ", -1)
              ])])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                createBaseVNode("div", _hoisted_10$9, [
                  _cache[7] || (_cache[7] = createTextVNode(" 读到 ", -1)),
                  createBaseVNode("b", null, toDisplayString(preview.value.rows.length), 1),
                  _cache[8] || (_cache[8] = createTextVNode(" 行 · 认出 ", -1)),
                  createBaseVNode("b", null, toDisplayString(Object.keys(preview.value.map).length), 1),
                  _cache[9] || (_cache[9] = createTextVNode(" 列 ", -1)),
                  stats.value.bad ? (openBlock(), createElementBlock("span", _hoisted_11$9, "· " + toDisplayString(stats.value.bad) + " 行有问题", 1)) : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_12$9, toDisplayString(preview.value.fileName) + " · 表头在第 " + toDisplayString(preview.value.headerIndex + 1) + " 行", 1)
                ]),
                createBaseVNode("table", _hoisted_13$9, [
                  _cache[10] || (_cache[10] = createBaseVNode("colgroup", null, [
                    createBaseVNode("col", { style: { "width": "34%" } }),
                    createBaseVNode("col", { style: { "width": "16%" } }),
                    createBaseVNode("col", { style: { "width": "14%" } }),
                    createBaseVNode("col", { style: { "width": "14%" } }),
                    createBaseVNode("col", { style: { "width": "22%" } })
                  ], -1)),
                  _cache[11] || (_cache[11] = createBaseVNode("tr", null, [
                    createBaseVNode("th", null, "名称"),
                    createBaseVNode("th", null, "分类"),
                    createBaseVNode("th", { style: { "text-align": "right" } }, "售价"),
                    createBaseVNode("th", { style: { "text-align": "right" } }, "库存"),
                    createBaseVNode("th", null, "状态")
                  ], -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(preview.value.rows.slice(0, 8), (r) => {
                    return openBlock(), createElementBlock("tr", {
                      key: r.line
                    }, [
                      createBaseVNode("td", {
                        class: normalizeClass({ bad: !r.name })
                      }, toDisplayString(r.name || "—"), 3),
                      createBaseVNode("td", null, toDisplayString(r.cat || "未分类"), 1),
                      createBaseVNode("td", _hoisted_14$8, toDisplayString(isFinite(r.price) ? r.price.toFixed(2) : "—"), 1),
                      createBaseVNode("td", _hoisted_15$8, toDisplayString(isFinite(r.stock) ? r.stock : 0) + " " + toDisplayString(r.unit), 1),
                      createBaseVNode("td", {
                        class: normalizeClass({ bad: r.errs.length })
                      }, toDisplayString(r.errs.length ? r.errs.join("、") : "可导入"), 3)
                    ]);
                  }), 128))
                ]),
                preview.value.rows.length > 8 ? (openBlock(), createElementBlock("div", _hoisted_16$8, "还有 " + toDisplayString(preview.value.rows.length - 8) + " 行没显示", 1)) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_17$8, "同名商品怎么办（店里有 " + toDisplayString(stats.value.same.length) + " 个重名）", 1),
                createBaseVNode("div", _hoisted_18$8, [
                  (openBlock(), createElementBlock(Fragment, null, renderList([["merge", "覆盖勾选字段"], ["skip", "跳过不动"], ["new", "另建一个"]], (m) => {
                    return createBaseVNode("button", {
                      key: m[0],
                      class: "chip",
                      "data-on": mode.value === m[0],
                      onClick: ($event) => mode.value = m[0]
                    }, toDisplayString(m[1]), 9, _hoisted_19$7);
                  }), 64))
                ]),
                mode.value === "merge" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createBaseVNode("div", _hoisted_20$7, [
                    _cache[12] || (_cache[12] = createBaseVNode("span", null, "表格可以覆盖这些字段", -1)),
                    createBaseVNode("button", {
                      class: "chip",
                      style: { "height": "28px" },
                      "data-on": allFields.value,
                      onClick: _cache[1] || (_cache[1] = ($event) => fields.value = allFields.value ? [] : FIELD_OPTS.map((f) => f[0]))
                    }, toDisplayString(allFields.value ? "全不选" : "全选"), 9, _hoisted_21$7)
                  ]),
                  createBaseVNode("div", _hoisted_22$7, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(FIELD_OPTS, (f) => {
                      return createBaseVNode("button", {
                        key: f[0],
                        class: "chip",
                        "data-on": fields.value.includes(f[0]),
                        onClick: ($event) => toggleField(f[0])
                      }, toDisplayString(f[1]), 9, _hoisted_23$7);
                    }), 64))
                  ]),
                  _cache[13] || (_cache[13] = createBaseVNode("div", {
                    class: "hint",
                    style: { "margin-top": "6px" }
                  }, "没勾的字段以本机为准，不会被这张表改掉。", -1))
                ], 64)) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_24$7, [
                  stats.value.newCats.length ? (openBlock(), createElementBlock("div", _hoisted_25$7, "会新建分类：" + toDisplayString(stats.value.newCats.join("、")), 1)) : createCommentVNode("", true),
                  createTextVNode(" 库存写进当前店铺「" + toDisplayString(unref(activeStore) ? unref(activeStore).name : "") + "」，仓库库存不动。 ", 1)
                ])
              ], 64)),
              createBaseVNode("div", _hoisted_26$6, [
                createBaseVNode("button", {
                  class: "chip",
                  onClick: downloadTemplate
                }, [
                  createVNode(_sfc_main$g, {
                    name: "download",
                    size: 14
                  }),
                  _cache[14] || (_cache[14] = createTextVNode(" 下载模板", -1))
                ]),
                createBaseVNode("button", {
                  class: "chip",
                  onClick: exportCurrent
                }, [
                  createVNode(_sfc_main$g, {
                    name: "download",
                    size: 14
                  }),
                  _cache[15] || (_cache[15] = createTextVNode(" 导出当前商品", -1))
                ])
              ])
            ]),
            createBaseVNode("footer", _hoisted_27$6, [
              createVNode(_component_var_button, {
                size: "normal",
                onClick: _cache[2] || (_cache[2] = ($event) => emit2("update:show", false))
              }, {
                default: withCtx(() => [..._cache[16] || (_cache[16] = [
                  createTextVNode("关闭", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_var_button, {
                type: "primary",
                size: "normal",
                disabled: !preview.value || !stats.value.valid.length,
                onClick: doImport
              }, {
                default: withCtx(() => [
                  createTextVNode(" 导入 " + toDisplayString(stats.value ? stats.value.valid.length : 0) + " 个 ", 1)
                ]),
                _: 1
              }, 8, ["disabled"])
            ])
          ])
        ]),
        _: 1
      }, 8, ["show"]);
    };
  }
};
const ImportSheet = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-0f4b86e4"]]);
const _hoisted_1$8 = { class: "cat-sheet" };
const _hoisted_2$8 = { class: "cat-head" };
const _hoisted_3$8 = { class: "hint" };
const _hoisted_4$8 = { class: "cat-tools" };
const _hoisted_5$8 = {
  key: 0,
  class: "cat-search"
};
const _hoisted_6$8 = { class: "cat-body" };
const _hoisted_7$8 = {
  key: 0,
  class: "banner"
};
const _hoisted_8$8 = {
  key: 1,
  class: "card create-card"
};
const _hoisted_9$8 = { class: "create-actions" };
const _hoisted_10$8 = ["data-cat-id"];
const _hoisted_11$8 = { class: "cat-line" };
const _hoisted_12$8 = ["onPointerdown"];
const _hoisted_13$8 = ["aria-label", "onClick"];
const _hoisted_14$7 = {
  key: 1,
  class: "caret ghost"
};
const _hoisted_15$7 = ["onKeyup"];
const _hoisted_16$7 = ["onClick"];
const _hoisted_17$7 = { class: "cat-name" };
const _hoisted_18$7 = { class: "cat-sub" };
const _hoisted_19$6 = { key: 0 };
const _hoisted_20$6 = {
  key: 0,
  class: "acts"
};
const _hoisted_21$6 = ["onClick"];
const _hoisted_22$6 = ["onClick"];
const _hoisted_23$6 = ["onClick"];
const _hoisted_24$6 = ["onClick"];
const _hoisted_25$6 = ["onClick"];
const _hoisted_26$5 = {
  key: 0,
  class: "child-wrap"
};
const _hoisted_27$5 = ["data-cat-id"];
const _hoisted_28$5 = ["onPointerdown"];
const _hoisted_29$5 = ["onKeyup"];
const _hoisted_30$5 = ["onClick"];
const _hoisted_31$5 = { class: "cat-name" };
const _hoisted_32$4 = { class: "cat-sub" };
const _hoisted_33$4 = {
  key: 0,
  class: "acts"
};
const _hoisted_34$4 = ["onClick"];
const _hoisted_35$3 = ["onClick"];
const _hoisted_36$3 = ["onClick"];
const _hoisted_37$3 = ["onClick"];
const _hoisted_38$3 = {
  key: 2,
  class: "empty"
};
const _hoisted_39$3 = {
  key: 3,
  class: "sec-head",
  style: { "margin-top": "18px" }
};
const _hoisted_40$3 = { class: "hint" };
const _hoisted_41$3 = {
  key: 4,
  class: "card"
};
const _hoisted_42$3 = { class: "uncat-name" };
const _hoisted_43$3 = { class: "uncat-pick" };
const _sfc_main$8 = {
  __name: "CategorySheet",
  props: { show: Boolean },
  emits: ["update:show"],
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    const emit2 = __emit;
    const kw = /* @__PURE__ */ ref("");
    const tree = computed(() => categoryTree.value.map((t2) => ({
      ...t2,
      count: products.value.filter((p2) => p2.cat === t2.id).length,
      children: t2.children.map((ch) => ({
        ...ch,
        count: products.value.filter((p2) => p2.cat === ch.id).length
      }))
    })));
    const totalCats = computed(() => categories.value.length);
    const usedCats = computed(() => new Set(categories.value.map((c) => c.id)));
    const unclassified = computed(() => products.value.filter((p2) => !p2.cat || !usedCats.value.has(p2.cat)));
    const shownTree = computed(() => {
      const k = kw.value.trim();
      if (!k) return tree.value;
      return tree.value.map((t2) => ({ ...t2, children: t2.children.filter((ch) => ch.name.includes(k)) })).filter((t2) => t2.name.includes(k) || t2.children.length);
    });
    const collapsed = /* @__PURE__ */ ref({});
    watch(() => props2.show, (v) => {
      if (v) {
        collapsed.value = {};
        editId.value = "";
        creating.value = false;
      }
    });
    function toggle(id) {
      collapsed.value = { ...collapsed.value, [id]: !collapsed.value[id] };
    }
    const creating = /* @__PURE__ */ ref(false);
    const form = /* @__PURE__ */ ref({ name: "", parent: "" });
    const parentOptions = computed(() => [
      { value: "", label: "作为一级分类", hint: "如 胶带、贴纸" },
      ...tree.value.map((t2) => ({ value: t2.id, label: "挂在「" + t2.name + "」下", hint: "二级分类" }))
    ]);
    function startCreate(parentId) {
      creating.value = true;
      form.value = { name: "", parent: parentId || "" };
    }
    function commitCreate() {
      const rec = saveCategory({ name: form.value.name, parentId: form.value.parent });
      if (rec) {
        tip("已新建「" + rec.name + "」");
        form.value = { name: "", parent: "" };
        creating.value = false;
      }
    }
    const editId = /* @__PURE__ */ ref("");
    const editName = /* @__PURE__ */ ref("");
    function startEdit(c) {
      editId.value = c.id;
      editName.value = c.name;
    }
    function commitEdit(c) {
      saveCategory({ id: c.id, name: editName.value, parentId: c.parentId || "" });
      editId.value = "";
    }
    function removeCat(c) {
      if (deleteCategory(c.id)) tip("已删除「" + c.name + "」");
    }
    const catOptions = computed(() => [
      { value: "", label: "未分类" },
      ...tree.value.flatMap((t2) => [
        { value: t2.id, label: t2.name, hint: "大类" },
        ...t2.children.map((ch) => ({ value: ch.id, label: ch.name, hint: t2.name + " 的二级", level: 1 }))
      ])
    ]);
    function assign2(productId, catId) {
      if (setProductCategory(productId, catId)) tip("已归到「" + (catId ? findCatName(catId) : "未分类") + "」");
    }
    const dragId = /* @__PURE__ */ ref("");
    const dropId = /* @__PURE__ */ ref("");
    const dropBefore = /* @__PURE__ */ ref(true);
    function onHandleDown(e, id) {
      if (!allow("product:write")) {
        tip("代理不能调整分类顺序");
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      dragId.value = id;
      dropId.value = "";
      window.addEventListener("pointermove", onDragMove);
      window.addEventListener("pointerup", onDragUp, { once: true });
      window.addEventListener("pointercancel", onDragUp, { once: true });
    }
    function onDragMove(e) {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const row = el && el.closest("[data-cat-id]");
      if (!row) {
        dropId.value = "";
        return;
      }
      const rect = row.getBoundingClientRect();
      dropId.value = row.getAttribute("data-cat-id");
      dropBefore.value = e.clientY - rect.top < rect.height / 2;
    }
    function onDragUp() {
      window.removeEventListener("pointermove", onDragMove);
      const target = dropId.value;
      const moving = dragId.value;
      dragId.value = "";
      dropId.value = "";
      if (!moving || !target || moving === target) return;
      if (reorderCategory(moving, target, dropBefore.value) !== false) tip("已调整顺序");
    }
    function moveUp(id, siblings, idx) {
      if (!(idx > 0)) {
        tip("已经在最前面了");
        return;
      }
      if (reorderCategory(id, siblings[idx - 1].id, true) !== false) tip("已调整顺序");
    }
    function moveDown(id, siblings, idx) {
      if (!(idx < siblings.length - 1)) {
        tip("已经在最后面了");
        return;
      }
      if (reorderCategory(id, siblings[idx + 1].id, false) !== false) tip("已调整顺序");
    }
    function findCatName(id) {
      const t2 = tree.value.find((x) => x.id === id);
      if (t2) return t2.name;
      const ch = tree.value.flatMap((x) => x.children).find((x) => x.id === id);
      return ch ? ch.name : "未分类";
    }
    return (_ctx, _cache) => {
      const _component_var_button = resolveComponent("var-button");
      const _component_var_popup = resolveComponent("var-popup");
      return openBlock(), createBlock(_component_var_popup, {
        show: __props.show,
        position: "bottom",
        "onUpdate:show": _cache[10] || (_cache[10] = (v) => emit2("update:show", v))
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$8, [
            createBaseVNode("header", _hoisted_2$8, [
              createBaseVNode("div", null, [
                _cache[11] || (_cache[11] = createBaseVNode("b", null, "分类管理", -1)),
                createBaseVNode("div", _hoisted_3$8, toDisplayString(totalCats.value) + " 个分类 · " + toDisplayString(unref(products).length) + " 个商品 · " + toDisplayString(unclassified.value.length) + " 个未分类", 1)
              ]),
              createBaseVNode("button", {
                class: "icon-btn",
                "aria-label": "关闭",
                onClick: _cache[0] || (_cache[0] = ($event) => emit2("update:show", false))
              }, [
                createVNode(_sfc_main$g, {
                  name: "close",
                  size: 18
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_4$8, [
              tree.value.length > 6 ? (openBlock(), createElementBlock("div", _hoisted_5$8, [
                createVNode(_sfc_main$g, {
                  name: "search",
                  size: 15
                }),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => kw.value = $event),
                  type: "search",
                  placeholder: "搜分类名"
                }, null, 512), [
                  [vModelText, kw.value]
                ])
              ])) : createCommentVNode("", true),
              unref(allow)("product:write") ? (openBlock(), createElementBlock("button", {
                key: 1,
                class: "chip new-chip",
                onClick: _cache[2] || (_cache[2] = ($event) => startCreate(""))
              }, [
                createVNode(_sfc_main$g, {
                  name: "plus",
                  size: 13
                }),
                _cache[12] || (_cache[12] = createTextVNode(" 新建分类 ", -1))
              ])) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_6$8, [
              !unref(allow)("product:write") ? (openBlock(), createElementBlock("div", _hoisted_7$8, [
                createVNode(_sfc_main$g, {
                  name: "alert",
                  size: 16
                }),
                _cache[13] || (_cache[13] = createTextVNode("代理模式只能看分类结构，改分类要店主来。 ", -1))
              ])) : createCommentVNode("", true),
              creating.value ? (openBlock(), createElementBlock("div", _hoisted_8$8, [
                _cache[16] || (_cache[16] = createBaseVNode("div", { class: "field-label" }, "分类名", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.value.name = $event),
                  class: "inp",
                  placeholder: "如 胶带 / 整卷",
                  onKeyup: withKeys(commitCreate, ["enter"])
                }, null, 544), [
                  [vModelText, form.value.name]
                ]),
                _cache[17] || (_cache[17] = createBaseVNode("div", {
                  class: "field-label",
                  style: { "margin-top": "10px" }
                }, "放在哪一级", -1)),
                createVNode(PickerField, {
                  modelValue: form.value.parent,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.value.parent = $event),
                  options: parentOptions.value,
                  title: "选择上级",
                  placeholder: "作为一级分类"
                }, null, 8, ["modelValue", "options"]),
                createBaseVNode("div", _hoisted_9$8, [
                  createVNode(_component_var_button, {
                    size: "small",
                    onClick: _cache[5] || (_cache[5] = ($event) => creating.value = false)
                  }, {
                    default: withCtx(() => [..._cache[14] || (_cache[14] = [
                      createTextVNode("取消", -1)
                    ])]),
                    _: 1
                  }),
                  createVNode(_component_var_button, {
                    type: "primary",
                    size: "small",
                    onClick: commitCreate
                  }, {
                    default: withCtx(() => [..._cache[15] || (_cache[15] = [
                      createTextVNode("建分类", -1)
                    ])]),
                    _: 1
                  })
                ])
              ])) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(shownTree.value, (t2, ti) => {
                return openBlock(), createElementBlock("div", {
                  key: t2.id,
                  class: normalizeClass(["card cat-card", { dragging: dragId.value === t2.id, dragover: dropId.value === t2.id }]),
                  "data-cat-id": t2.id
                }, [
                  createBaseVNode("div", _hoisted_11$8, [
                    createBaseVNode("span", {
                      class: "drag-handle",
                      title: "按住拖动排序",
                      onPointerdown: ($event) => onHandleDown($event, t2.id)
                    }, [..._cache[18] || (_cache[18] = [
                      createBaseVNode("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "currentColor"
                      }, [
                        createBaseVNode("circle", {
                          cx: "9",
                          cy: "6",
                          r: "1.5"
                        }),
                        createBaseVNode("circle", {
                          cx: "15",
                          cy: "6",
                          r: "1.5"
                        }),
                        createBaseVNode("circle", {
                          cx: "9",
                          cy: "12",
                          r: "1.5"
                        }),
                        createBaseVNode("circle", {
                          cx: "15",
                          cy: "12",
                          r: "1.5"
                        }),
                        createBaseVNode("circle", {
                          cx: "9",
                          cy: "18",
                          r: "1.5"
                        }),
                        createBaseVNode("circle", {
                          cx: "15",
                          cy: "18",
                          r: "1.5"
                        })
                      ], -1)
                    ])], 40, _hoisted_12$8),
                    t2.children.length ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      class: normalizeClass(["caret", { closed: collapsed.value[t2.id] }]),
                      "aria-label": "展开 " + t2.name,
                      onClick: ($event) => toggle(t2.id)
                    }, [
                      createVNode(_sfc_main$g, {
                        name: "down",
                        size: 13
                      })
                    ], 10, _hoisted_13$8)) : (openBlock(), createElementBlock("span", _hoisted_14$7)),
                    editId.value === t2.id ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => editName.value = $event),
                        class: "inp inline",
                        onKeyup: withKeys(($event) => commitEdit(t2), ["enter"])
                      }, null, 40, _hoisted_15$7), [
                        [vModelText, editName.value]
                      ]),
                      createBaseVNode("button", {
                        class: "mini",
                        onClick: ($event) => commitEdit(t2)
                      }, "保存", 8, _hoisted_16$7),
                      createBaseVNode("button", {
                        class: "mini",
                        onClick: _cache[7] || (_cache[7] = ($event) => editId.value = "")
                      }, "取消")
                    ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                      createBaseVNode("span", _hoisted_17$7, [
                        createBaseVNode("b", null, toDisplayString(t2.name), 1),
                        createBaseVNode("span", _hoisted_18$7, [
                          createTextVNode(toDisplayString(t2.count) + " 个商品", 1),
                          t2.children.length ? (openBlock(), createElementBlock("span", _hoisted_19$6, " · " + toDisplayString(t2.children.length) + " 个二级", 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      unref(allow)("product:write") ? (openBlock(), createElementBlock("span", _hoisted_20$6, [
                        createBaseVNode("button", {
                          class: "mini icon-only",
                          "aria-label": "上移",
                          title: "上移",
                          onClick: ($event) => moveUp(t2.id, shownTree.value, ti)
                        }, [
                          createVNode(_sfc_main$g, {
                            name: "chev",
                            size: 13,
                            style: { "transform": "rotate(-90deg)" }
                          })
                        ], 8, _hoisted_21$6),
                        createBaseVNode("button", {
                          class: "mini icon-only",
                          "aria-label": "下移",
                          title: "下移",
                          onClick: ($event) => moveDown(t2.id, shownTree.value, ti)
                        }, [
                          createVNode(_sfc_main$g, {
                            name: "chev",
                            size: 13,
                            style: { "transform": "rotate(90deg)" }
                          })
                        ], 8, _hoisted_22$6),
                        createBaseVNode("button", {
                          class: "mini icon-only",
                          "aria-label": "新建二级分类",
                          title: "新建二级分类",
                          onClick: ($event) => startCreate(t2.id)
                        }, [
                          createVNode(_sfc_main$g, {
                            name: "plus",
                            size: 13
                          })
                        ], 8, _hoisted_23$6),
                        createBaseVNode("button", {
                          class: "mini icon-only",
                          "aria-label": "改名",
                          title: "改名",
                          onClick: ($event) => startEdit(t2)
                        }, [
                          createVNode(_sfc_main$g, {
                            name: "edit",
                            size: 13
                          })
                        ], 8, _hoisted_24$6),
                        createBaseVNode("button", {
                          class: "mini icon-only danger",
                          "aria-label": "删除分类",
                          title: "删除分类",
                          onClick: ($event) => removeCat(t2)
                        }, [
                          createVNode(_sfc_main$g, {
                            name: "trash",
                            size: 13
                          })
                        ], 8, _hoisted_25$6)
                      ])) : createCommentVNode("", true)
                    ], 64))
                  ]),
                  t2.children.length && !collapsed.value[t2.id] ? (openBlock(), createElementBlock("div", _hoisted_26$5, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(t2.children, (ch, ci) => {
                      return openBlock(), createElementBlock("div", {
                        key: ch.id,
                        class: normalizeClass(["cat-line child", { dragging: dragId.value === ch.id, dragover: dropId.value === ch.id }]),
                        "data-cat-id": ch.id
                      }, [
                        _cache[20] || (_cache[20] = createBaseVNode("span", { class: "branch" }, null, -1)),
                        unref(allow)("product:write") ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: "drag-handle small",
                          title: "按住拖动排序",
                          onPointerdown: ($event) => onHandleDown($event, ch.id)
                        }, [..._cache[19] || (_cache[19] = [
                          createBaseVNode("svg", {
                            width: "11",
                            height: "11",
                            viewBox: "0 0 24 24",
                            fill: "currentColor"
                          }, [
                            createBaseVNode("circle", {
                              cx: "9",
                              cy: "8",
                              r: "1.4"
                            }),
                            createBaseVNode("circle", {
                              cx: "15",
                              cy: "8",
                              r: "1.4"
                            }),
                            createBaseVNode("circle", {
                              cx: "9",
                              cy: "14",
                              r: "1.4"
                            }),
                            createBaseVNode("circle", {
                              cx: "15",
                              cy: "14",
                              r: "1.4"
                            })
                          ], -1)
                        ])], 40, _hoisted_28$5)) : createCommentVNode("", true),
                        editId.value === ch.id ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => editName.value = $event),
                            class: "inp inline",
                            onKeyup: withKeys(($event) => commitEdit(ch), ["enter"])
                          }, null, 40, _hoisted_29$5), [
                            [vModelText, editName.value]
                          ]),
                          createBaseVNode("button", {
                            class: "mini",
                            onClick: ($event) => commitEdit(ch)
                          }, "保存", 8, _hoisted_30$5),
                          createBaseVNode("button", {
                            class: "mini",
                            onClick: _cache[9] || (_cache[9] = ($event) => editId.value = "")
                          }, "取消")
                        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                          createBaseVNode("span", _hoisted_31$5, [
                            createBaseVNode("b", null, toDisplayString(ch.name), 1),
                            createBaseVNode("span", _hoisted_32$4, toDisplayString(ch.count) + " 个商品", 1)
                          ]),
                          unref(allow)("product:write") ? (openBlock(), createElementBlock("span", _hoisted_33$4, [
                            createBaseVNode("button", {
                              class: "mini icon-only sm",
                              "aria-label": "上移",
                              title: "上移",
                              onClick: ($event) => moveUp(ch.id, t2.children, ci)
                            }, [
                              createVNode(_sfc_main$g, {
                                name: "chev",
                                size: 12,
                                style: { "transform": "rotate(-90deg)" }
                              })
                            ], 8, _hoisted_34$4),
                            createBaseVNode("button", {
                              class: "mini icon-only sm",
                              "aria-label": "下移",
                              title: "下移",
                              onClick: ($event) => moveDown(ch.id, t2.children, ci)
                            }, [
                              createVNode(_sfc_main$g, {
                                name: "chev",
                                size: 12,
                                style: { "transform": "rotate(90deg)" }
                              })
                            ], 8, _hoisted_35$3),
                            createBaseVNode("button", {
                              class: "mini icon-only sm",
                              "aria-label": "改名",
                              title: "改名",
                              onClick: ($event) => startEdit(ch)
                            }, [
                              createVNode(_sfc_main$g, {
                                name: "edit",
                                size: 12
                              })
                            ], 8, _hoisted_36$3),
                            createBaseVNode("button", {
                              class: "mini icon-only sm danger",
                              "aria-label": "删除二级分类",
                              title: "删除二级分类",
                              onClick: ($event) => removeCat(ch)
                            }, [
                              createVNode(_sfc_main$g, {
                                name: "trash",
                                size: 12
                              })
                            ], 8, _hoisted_37$3)
                          ])) : createCommentVNode("", true)
                        ], 64))
                      ], 10, _hoisted_27$5);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ], 10, _hoisted_10$8);
              }), 128)),
              !shownTree.value.length ? (openBlock(), createElementBlock("div", _hoisted_38$3, [
                createBaseVNode("b", null, toDisplayString(kw.value ? "没有匹配的分类" : "还没有分类"), 1),
                createTextVNode(toDisplayString(kw.value ? "换个词试试" : "点上面的「新建分类」建一个"), 1)
              ])) : createCommentVNode("", true),
              unclassified.value.length ? (openBlock(), createElementBlock("div", _hoisted_39$3, [
                _cache[21] || (_cache[21] = createBaseVNode("h2", null, "未分类商品", -1)),
                _cache[22] || (_cache[22] = createBaseVNode("div", { class: "line" }, null, -1)),
                createBaseVNode("span", _hoisted_40$3, toDisplayString(unclassified.value.length), 1)
              ])) : createCommentVNode("", true),
              unclassified.value.length ? (openBlock(), createElementBlock("div", _hoisted_41$3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unclassified.value, (p2) => {
                  return openBlock(), createElementBlock("div", {
                    key: p2.id,
                    class: "uncat-row"
                  }, [
                    createBaseVNode("span", _hoisted_42$3, [
                      createBaseVNode("b", null, toDisplayString(p2.name), 1),
                      createBaseVNode("span", null, "单位 " + toDisplayString(p2.unit) + " · 售价 " + toDisplayString(p2.price), 1)
                    ]),
                    createBaseVNode("div", _hoisted_43$3, [
                      createVNode(PickerField, {
                        "model-value": p2.cat || "",
                        options: catOptions.value,
                        title: "归到哪个分类",
                        placeholder: "未分类",
                        onChange: (val) => assign2(p2.id, val)
                      }, null, 8, ["model-value", "options", "onChange"])
                    ])
                  ]);
                }), 128))
              ])) : createCommentVNode("", true),
              _cache[23] || (_cache[23] = createBaseVNode("p", {
                class: "hint",
                style: { "margin-top": "14px", "line-height": "1.9" }
              }, " 删不掉？说明那个分类下面还有商品或二级分类，先把它们挪走再删。 点大类会自动带上它的二级一起筛选，商品挂哪一级都能被找到。 ", -1))
            ])
          ])
        ]),
        _: 1
      }, 8, ["show"]);
    };
  }
};
const CategorySheet = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-a62bcce9"]]);
const _hoisted_1$7 = { class: "split-sheet" };
const _hoisted_2$7 = { class: "split-head" };
const _hoisted_3$7 = { class: "loc-tabs" };
const _hoisted_4$7 = ["data-on", "onClick"];
const _hoisted_5$7 = { class: "split-body" };
const _hoisted_6$7 = {
  key: 0,
  class: "banner"
};
const _hoisted_7$7 = { class: "split-row" };
const _hoisted_8$7 = { class: "col from" };
const _hoisted_9$7 = { class: "col-meta" };
const _hoisted_10$7 = {
  key: 0,
  class: "cost"
};
const _hoisted_11$7 = { class: "arrow" };
const _hoisted_12$7 = { class: "arrow-num" };
const _hoisted_13$7 = { class: "col to" };
const _hoisted_14$6 = { class: "col-meta" };
const _hoisted_15$6 = { class: "qty-in-loc" };
const _hoisted_16$6 = {
  key: 0,
  class: "cost"
};
const _hoisted_17$6 = { class: "split-ops" };
const _hoisted_18$6 = { class: "stepper" };
const _hoisted_19$5 = ["onClick"];
const _hoisted_20$5 = ["value", "onChange"];
const _hoisted_21$5 = ["onClick"];
const _hoisted_22$5 = { class: "step-unit" };
const _hoisted_23$5 = ["disabled", "onClick"];
const _hoisted_24$5 = { class: "preview" };
const _hoisted_25$5 = {
  key: 1,
  class: "empty"
};
const _sfc_main$7 = {
  __name: "SplitSheet",
  props: {
    show: Boolean,
    /* 打开时默认选中的位置：{ type:'store'|'warehouse', id } */
    defaultLoc: { type: Object, default: null }
  },
  emits: ["update:show"],
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    const emit2 = __emit;
    const locType = /* @__PURE__ */ ref("store");
    const locId = /* @__PURE__ */ ref("");
    const locOptions = computed(() => {
      const out = [];
      if (activeStore.value) out.push({ key: "store:" + activeStore.value.id, type: "store", id: activeStore.value.id, name: "本店 · " + activeStore.value.name });
      if (isAgent.value) return out;
      warehouses.value.filter((w) => storeWarehouseIds.value.includes(w.id)).forEach((w) => out.push({ key: "warehouse:" + w.id, type: "warehouse", id: w.id, name: "仓库 · " + w.name }));
      return out;
    });
    const curLocKey = computed(() => locType.value + ":" + locId.value);
    watch(() => props2.show, (v) => {
      if (!v) return;
      const d = props2.defaultLoc;
      if (d && (d.type === "store" || d.type === "warehouse") && d.id) {
        locType.value = d.type;
        locId.value = d.id;
      } else if (activeStore.value) {
        locType.value = "store";
        locId.value = activeStore.value.id;
      } else if (warehouses.value.length) {
        locType.value = "warehouse";
        locId.value = warehouses.value[0].id;
      }
    });
    const rows = computed(() => {
      const list = products.value || [];
      return list.filter((p2) => list.some((c) => c.splitFrom === p2.id)).map((p2) => {
        const child = list.find((c) => c.splitFrom === p2.id);
        const per = Math.max(2, Number(child && child.splitPer) || Number(p2.splitPer) || 2);
        const parentQty = qtyAt(state.collections.stocks, p2.id, locType.value, locId.value);
        const childQty = child ? qtyAt(state.collections.stocks, child.id, locType.value, locId.value) : 0;
        return { parent: p2, child, per, parentQty, childQty };
      });
    });
    const counts = /* @__PURE__ */ ref({});
    function countOf(id) {
      return Number(counts.value[id]) || 1;
    }
    function setCount(id, v) {
      const n2 = Math.max(1, Math.floor(Number(v) || 1));
      counts.value = { ...counts.value, [id]: n2 };
    }
    function preview(r) {
      const n2 = countOf(r.parent.id);
      return { parentAfter: r.parentQty - n2, childAfter: r.childQty + n2 * r.per };
    }
    function doSplit(r) {
      const n2 = countOf(r.parent.id);
      if (r.parentQty < n2) {
        tip("这里只剩 " + fmtQty(r.parentQty, r.parent.unit) + "，不够拆");
        return;
      }
      const p2 = preview(r);
      stdin_default$2({
        title: "拆 " + n2 + " " + (r.parent.unit || "卷") + "「" + r.parent.name + "」？",
        message: "整卷：" + fmtQty(r.parentQty, r.parent.unit) + " → " + fmtQty(p2.parentAfter, r.parent.unit) + (r.child ? "；分装「" + r.child.name + "」：" + fmtQty(r.childQty, r.child.unit) + " → " + fmtQty(p2.childAfter, r.child.unit) : ""),
        confirmButtonText: "拆卷",
        cancelButtonText: "再看看"
      }).then(() => {
        if (splitProduct(r.parent.id, locType.value, locId.value, n2)) {
          tip("已拆 " + n2 + " " + (r.parent.unit || "卷"));
          counts.value = {};
        }
      }).catch(() => {
      });
    }
    function parentUnitCost(p2) {
      return money2((Number(p2.cost) || 0) + (Number(p2.other) || 0));
    }
    function childUnitCost(r) {
      const total = (Number(r.parent.cost) || 0) + (Number(r.parent.other) || 0);
      return money2(total / r.per);
    }
    return (_ctx, _cache) => {
      const _component_var_popup = resolveComponent("var-popup");
      return openBlock(), createBlock(_component_var_popup, {
        show: __props.show,
        position: "bottom",
        "onUpdate:show": _cache[1] || (_cache[1] = (v) => emit2("update:show", v))
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$7, [
            createBaseVNode("header", _hoisted_2$7, [
              _cache[2] || (_cache[2] = createBaseVNode("div", null, [
                createBaseVNode("b", null, "分装 / 拆卷"),
                createBaseVNode("div", { class: "hint" }, "整卷拆成小份卖，库存自动对得上")
              ], -1)),
              createBaseVNode("button", {
                class: "icon-btn",
                "aria-label": "关闭",
                onClick: _cache[0] || (_cache[0] = ($event) => emit2("update:show", false))
              }, [
                createVNode(_sfc_main$g, {
                  name: "close",
                  size: 18
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_3$7, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(locOptions.value, (o) => {
                return openBlock(), createElementBlock("button", {
                  key: o.key,
                  class: "loc-chip",
                  "data-on": curLocKey.value === o.key,
                  onClick: ($event) => {
                    locType.value = o.type;
                    locId.value = o.id;
                  }
                }, toDisplayString(o.name), 9, _hoisted_4$7);
              }), 128))
            ]),
            createBaseVNode("div", _hoisted_5$7, [
              unref(isAgent) ? (openBlock(), createElementBlock("div", _hoisted_6$7, [
                createVNode(_sfc_main$g, {
                  name: "alert",
                  size: 16
                }),
                _cache[3] || (_cache[3] = createTextVNode("代理只能在这里拆「本店」的整卷；仓库里的货由店主处理。 ", -1))
              ])) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(rows.value, (r) => {
                return openBlock(), createElementBlock("div", {
                  key: r.parent.id,
                  class: "split-card"
                }, [
                  createBaseVNode("div", _hoisted_7$7, [
                    createBaseVNode("div", _hoisted_8$7, [
                      createVNode(_sfc_main$e, {
                        product: r.parent,
                        size: 40
                      }, null, 8, ["product"]),
                      createBaseVNode("div", _hoisted_9$7, [
                        createBaseVNode("b", null, toDisplayString(r.parent.name), 1),
                        createBaseVNode("span", {
                          class: "qty-in-loc",
                          style: normalizeStyle({ color: r.parentQty > 0 ? "" : "var(--clay)" })
                        }, " 现有 " + toDisplayString(unref(fmtQty)(r.parentQty, r.parent.unit)), 5),
                        unref(showCost) ? (openBlock(), createElementBlock("span", _hoisted_10$7, "成本 " + toDisplayString(parentUnitCost(r.parent)) + "/" + toDisplayString(r.parent.unit), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_11$7, [
                      createBaseVNode("span", _hoisted_12$7, "1 " + toDisplayString(r.parent.unit) + " → " + toDisplayString(r.per) + " 份", 1),
                      _cache[4] || (_cache[4] = createBaseVNode("div", { class: "arrow-line" }, [
                        createBaseVNode("svg", {
                          width: "34",
                          height: "10",
                          viewBox: "0 0 34 10",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "1.4"
                        }, [
                          createBaseVNode("path", { d: "M0 5h30M26 1.5 30 5 26 8.5" })
                        ])
                      ], -1))
                    ]),
                    createBaseVNode("div", _hoisted_13$7, [
                      r.child ? (openBlock(), createBlock(_sfc_main$e, {
                        key: 0,
                        product: r.child,
                        size: 40
                      }, null, 8, ["product"])) : createCommentVNode("", true),
                      createBaseVNode("div", _hoisted_14$6, [
                        createBaseVNode("b", null, toDisplayString(r.child ? r.child.name : "未关联分装商品"), 1),
                        createBaseVNode("span", _hoisted_15$6, "现有 " + toDisplayString(unref(fmtQty)(r.childQty, r.child ? r.child.unit : "份")), 1),
                        unref(showCost) && r.child ? (openBlock(), createElementBlock("span", _hoisted_16$6, "成本 " + toDisplayString(childUnitCost(r)) + "/份", 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_17$6, [
                    _cache[5] || (_cache[5] = createBaseVNode("span", { class: "ops-label" }, "拆几卷", -1)),
                    createBaseVNode("div", _hoisted_18$6, [
                      createBaseVNode("button", {
                        class: "step-btn",
                        "aria-label": "减一卷",
                        onClick: ($event) => setCount(r.parent.id, countOf(r.parent.id) - 1)
                      }, "−", 8, _hoisted_19$5),
                      createBaseVNode("input", {
                        class: "step-in tnum",
                        type: "number",
                        min: "1",
                        step: "1",
                        value: countOf(r.parent.id),
                        onChange: (e) => setCount(r.parent.id, e.target.value)
                      }, null, 40, _hoisted_20$5),
                      createBaseVNode("button", {
                        class: "step-btn",
                        "aria-label": "加一卷",
                        onClick: ($event) => setCount(r.parent.id, countOf(r.parent.id) + 1)
                      }, "＋", 8, _hoisted_21$5)
                    ]),
                    createBaseVNode("span", _hoisted_22$5, toDisplayString(r.parent.unit), 1),
                    _cache[6] || (_cache[6] = createBaseVNode("span", { class: "grow" }, null, -1)),
                    createBaseVNode("button", {
                      class: "split-btn",
                      disabled: !(unref(allow)("split:store") || unref(allow)("stock:write")) || !r.parentQty || r.parentQty < countOf(r.parent.id),
                      onClick: ($event) => doSplit(r)
                    }, "拆卷", 8, _hoisted_23$5)
                  ]),
                  createBaseVNode("div", _hoisted_24$5, [
                    _cache[7] || (_cache[7] = createTextVNode(" 拆完 → 整卷 ", -1)),
                    createBaseVNode("b", null, toDisplayString(unref(fmtQty)(preview(r).parentAfter, r.parent.unit)), 1),
                    _cache[8] || (_cache[8] = createTextVNode(" · 分装 ", -1)),
                    createBaseVNode("b", null, toDisplayString(unref(fmtQty)(preview(r).childAfter, r.child ? r.child.unit : "份")), 1)
                  ])
                ]);
              }), 128)),
              !rows.value.length ? (openBlock(), createElementBlock("div", _hoisted_25$5, [..._cache[9] || (_cache[9] = [
                createBaseVNode("b", null, "还没有分装关系的商品", -1),
                createTextVNode(" 到「商品」里编辑一个商品，在「分装关系」里选它的整卷来源，就会出现在这里 ", -1)
              ])])) : createCommentVNode("", true),
              _cache[10] || (_cache[10] = createBaseVNode("p", {
                class: "hint",
                style: { "margin-top": "14px", "line-height": "1.9" }
              }, [
                createTextVNode(" 拆卷只搬库存数量，不动价格和成本：整卷 −N，分装 +（N × 每卷可拆份数）。"),
                createBaseVNode("br"),
                createTextVNode(" 同一个商品在「本店」和「仓库」是两份独立的库存，想拆哪一份就切到哪个位置。 ")
              ], -1))
            ])
          ])
        ]),
        _: 1
      }, 8, ["show"]);
    };
  }
};
const SplitSheet = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-96cf2490"]]);
const _hoisted_1$6 = { class: "page" };
const _hoisted_2$6 = { class: "topbar" };
const _hoisted_3$6 = { class: "sub" };
const _hoisted_4$6 = { class: "ico" };
const _hoisted_5$6 = { class: "txt" };
const _hoisted_6$6 = { class: "right go" };
const _hoisted_7$6 = { class: "sub-n" };
const _hoisted_8$6 = {
  key: 1,
  class: "card row",
  style: { "width": "100%" }
};
const _hoisted_9$6 = { class: "ico" };
const _hoisted_10$6 = { class: "txt" };
const _hoisted_11$6 = {
  key: 2,
  class: "banner",
  style: { "margin-top": "12px" }
};
const _hoisted_12$6 = {
  class: "search",
  style: { "margin-top": "14px" }
};
const _hoisted_13$6 = {
  class: "tabs",
  style: { "margin-top": "8px" }
};
const _hoisted_14$5 = ["data-on"];
const _hoisted_15$5 = ["data-on"];
const _hoisted_16$5 = ["data-on", "onClick"];
const _hoisted_17$5 = {
  key: 4,
  class: "tabs sub",
  style: { "margin-top": "4px" }
};
const _hoisted_18$5 = ["data-on"];
const _hoisted_19$4 = ["data-on", "onClick"];
const _hoisted_20$4 = {
  class: "grid-products",
  style: { "margin-top": "10px" }
};
const _hoisted_21$4 = ["onClick"];
const _hoisted_22$4 = { class: "meta" };
const _hoisted_23$4 = {
  key: 0,
  class: "low-badge"
};
const _hoisted_24$4 = {
  key: 1,
  class: "share-badge"
};
const _hoisted_25$4 = ["title"];
const _hoisted_26$4 = {
  key: 0,
  style: { "color": "var(--mute)", "font-size": "11px", "font-family": "inherit", "overflow": "hidden", "text-overflow": "ellipsis", "display": "-webkit-box", "-webkit-line-clamp": "1", "-webkit-box-orient": "vertical" }
};
const _hoisted_27$4 = { style: { "text-align": "right", "flex": "0 0 auto" } };
const _hoisted_28$4 = { class: "price" };
const _hoisted_29$4 = {
  class: "price",
  style: { "font-size": "11px", "color": "var(--mute)" }
};
const _hoisted_30$4 = {
  key: 0,
  class: "empty",
  style: { "grid-column": "1/-1" }
};
const _hoisted_31$4 = {
  key: 5,
  class: "hint",
  style: { "margin-top": "20px", "text-align": "center" }
};
const _sfc_main$6 = {
  __name: "ProductsView",
  setup(__props) {
    const shares = computed(() => productShares.value);
    const q = /* @__PURE__ */ ref("");
    const whCount = computed(() => storeWarehouseIds.value.length);
    const cat = /* @__PURE__ */ ref("all");
    const editorOpen = /* @__PURE__ */ ref(false);
    const editingId = /* @__PURE__ */ ref("");
    const importOpen = /* @__PURE__ */ ref(false);
    const catOpen = /* @__PURE__ */ ref(false);
    const splitOpen = /* @__PURE__ */ ref(false);
    const store = computed(() => activeStore.value);
    const overview = computed(() => store.value ? overviewOf("store", store.value.id) : { count: 0, value: 0, lines: [] });
    const tree = computed(() => categoryTree.value.map((t2) => ({
      ...t2,
      n: productsInCategory(t2.id).length,
      children: t2.children.map((ch) => ({ ...ch, n: products.value.filter((p2) => p2.cat === ch.id).length }))
    })));
    const activeParent = computed(() => {
      if (cat.value === "all" || cat.value === "stock") return null;
      return tree.value.find((t2) => t2.id === cat.value || t2.children.some((ch) => ch.id === cat.value)) || null;
    });
    const stockCount = computed(() => products.value.filter((p2) => storeStockOf(p2.id) > 0).length);
    const list = computed(() => {
      const kw = q.value.trim().toLowerCase();
      const scope = cat.value === "all" ? products.value : cat.value === "stock" ? products.value.filter((p2) => storeStockOf(p2.id) > 0) : productsInCategory(cat.value);
      return scope.filter((p2) => {
        if (!kw) return true;
        return (p2.name || "").toLowerCase().includes(kw) || (p2.barcode || "").includes(kw);
      });
    });
    const uncosted = computed(() => products.value.filter((p2) => !p2.cost).length);
    const refills = computed(() => refillList());
    function openNew() {
      if (!allow("product:write")) {
        tip("代理模式不能新增商品");
        return;
      }
      editingId.value = "";
      editorOpen.value = true;
    }
    function openEdit(p2) {
      if (!allow("product:write")) {
        tip("代理只能看商品：名称、价格、库存由店主维护");
        return;
      }
      editingId.value = p2.id;
      editorOpen.value = true;
    }
    function openImport() {
      if (!allow("import:write")) {
        tip("代理模式不能导入商品");
        return;
      }
      importOpen.value = true;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$6, [
          createBaseVNode("div", null, [
            _cache[12] || (_cache[12] = createBaseVNode("div", { class: "title" }, "商品库", -1)),
            createBaseVNode("div", _hoisted_3$6, toDisplayString(store.value ? store.value.name : "当前店铺") + " 的商品库 · " + toDisplayString(unref(products).length) + " 个商品", 1)
          ]),
          _cache[13] || (_cache[13] = createBaseVNode("div", { class: "spacer" }, null, -1)),
          createBaseVNode("button", {
            class: "icon-btn",
            "aria-label": "分装拆卷",
            onClick: _cache[0] || (_cache[0] = ($event) => splitOpen.value = true)
          }, [
            createVNode(_sfc_main$g, {
              name: "split",
              size: 17
            })
          ]),
          createBaseVNode("button", {
            class: "icon-btn",
            "aria-label": "分类管理",
            onClick: _cache[1] || (_cache[1] = ($event) => catOpen.value = true)
          }, [
            createVNode(_sfc_main$g, {
              name: "list",
              size: 17
            })
          ]),
          unref(allow)("product:write") ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("button", {
              class: "icon-btn",
              "aria-label": "导入",
              onClick: openImport
            }, [
              createVNode(_sfc_main$g, {
                name: "upload",
                size: 18
              })
            ]),
            createBaseVNode("button", {
              class: "icon-btn",
              "aria-label": "新增",
              onClick: openNew
            }, [
              createVNode(_sfc_main$g, {
                name: "plus",
                size: 18
              })
            ])
          ], 64)) : createCommentVNode("", true)
        ]),
        !unref(isAgent) ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "card row wh-entry",
          style: { "width": "100%" },
          onClick: _cache[2] || (_cache[2] = ($event) => unref(go)("warehouses"))
        }, [
          createBaseVNode("span", _hoisted_4$6, [
            createVNode(_sfc_main$g, {
              name: "layers",
              size: 18
            })
          ]),
          createBaseVNode("span", _hoisted_5$6, [
            createBaseVNode("b", null, toDisplayString(unref(showCost) ? "店内库存 " + unref(money)(overview.value.value) : "店内可卖 " + overview.value.count + " 款"), 1),
            createBaseVNode("span", null, toDisplayString(overview.value.count) + " 个商品在店 · 仓库里的货另算", 1)
          ]),
          createBaseVNode("span", _hoisted_6$6, [
            _cache[14] || (_cache[14] = createTextVNode("仓库", -1)),
            createVNode(_sfc_main$g, {
              name: "chev",
              size: 14
            }),
            createBaseVNode("span", _hoisted_7$6, toDisplayString(whCount.value) + " 个已挂", 1)
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_8$6, [
          createBaseVNode("span", _hoisted_9$6, [
            createVNode(_sfc_main$g, {
              name: "layers",
              size: 18
            })
          ]),
          createBaseVNode("span", _hoisted_10$6, [
            createBaseVNode("b", null, "店内可卖 " + toDisplayString(overview.value.count) + " 个商品", 1),
            createBaseVNode("span", null, toDisplayString(store.value ? store.value.name : "") + " · 库存与价格由店主维护", 1)
          ]),
          _cache[15] || (_cache[15] = createBaseVNode("span", { class: "right" }, [
            createBaseVNode("b", null, "代理"),
            createBaseVNode("span", null, "只读商品")
          ], -1))
        ])),
        unref(showCost) && uncosted.value ? (openBlock(), createElementBlock("div", _hoisted_11$6, [
          createVNode(_sfc_main$g, {
            name: "alert",
            size: 16
          }),
          createTextVNode(" " + toDisplayString(uncosted.value) + " 个商品没填成本，毛利会偏高。买货时顺手记一下成本，统计才准。 ", 1)
        ])) : createCommentVNode("", true),
        refills.value.length ? (openBlock(), createElementBlock("div", {
          key: 3,
          class: "banner jade",
          style: { "margin-top": "12px" },
          onClick: _cache[3] || (_cache[3] = ($event) => unref(go)("warehouses"))
        }, [
          createVNode(_sfc_main$g, {
            name: "layers",
            size: 16
          }),
          createTextVNode(" " + toDisplayString(refills.value.length) + " 个商品店里见底了，仓库还有货 —— 去仓库调拨 ", 1)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_12$6, [
          createVNode(_sfc_main$g, {
            name: "search",
            size: 16
          }),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => q.value = $event),
            type: "search",
            placeholder: "搜商品名或条码"
          }, null, 512), [
            [vModelText, q.value]
          ])
        ]),
        createBaseVNode("div", _hoisted_13$6, [
          createBaseVNode("button", {
            "data-on": cat.value === "all",
            onClick: _cache[5] || (_cache[5] = ($event) => cat.value = "all")
          }, "全部", 8, _hoisted_14$5),
          createBaseVNode("button", {
            "data-on": cat.value === "stock",
            onClick: _cache[6] || (_cache[6] = ($event) => cat.value = "stock")
          }, "有库存 " + toDisplayString(stockCount.value), 9, _hoisted_15$5),
          (openBlock(true), createElementBlock(Fragment, null, renderList(tree.value, (x) => {
            return openBlock(), createElementBlock("button", {
              key: x.id,
              "data-on": cat.value === x.id || x.children.some((ch) => cat.value === ch.id),
              onClick: ($event) => cat.value = x.id
            }, toDisplayString(x.name), 9, _hoisted_16$5);
          }), 128))
        ]),
        activeParent.value && activeParent.value.children.length ? (openBlock(), createElementBlock("div", _hoisted_17$5, [
          createBaseVNode("button", {
            "data-on": cat.value === activeParent.value.id,
            onClick: _cache[7] || (_cache[7] = ($event) => cat.value = activeParent.value.id)
          }, "全部", 8, _hoisted_18$5),
          (openBlock(true), createElementBlock(Fragment, null, renderList(activeParent.value.children, (ch) => {
            return openBlock(), createElementBlock("button", {
              key: ch.id,
              "data-on": cat.value === ch.id,
              onClick: ($event) => cat.value = ch.id
            }, toDisplayString(ch.name), 9, _hoisted_19$4);
          }), 128))
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_20$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (p2) => {
            return openBlock(), createElementBlock("button", {
              key: p2.id,
              class: normalizeClass(["prod", { "low-stock": p2.lowStock && unref(storeStockOf)(p2.id) <= p2.lowStock }]),
              onClick: ($event) => openEdit(p2)
            }, [
              createVNode(_sfc_main$e, {
                product: p2,
                size: 64
              }, null, 8, ["product"]),
              createBaseVNode("div", _hoisted_22$4, [
                createBaseVNode("b", null, [
                  createTextVNode(toDisplayString(p2.name) + " ", 1),
                  p2.lowStock && unref(storeStockOf)(p2.id) <= p2.lowStock ? (openBlock(), createElementBlock("span", _hoisted_23$4, "补货")) : createCommentVNode("", true),
                  p2.storeId && store.value && p2.storeId !== store.value.id ? (openBlock(), createElementBlock("span", _hoisted_24$4, "仓库共享")) : createCommentVNode("", true),
                  shares.value[p2.id] ? (openBlock(), createElementBlock("span", {
                    key: 2,
                    class: "share-badge out",
                    title: "共享给：" + shares.value[p2.id].join("、")
                  }, "共享给 " + toDisplayString(shares.value[p2.id].length) + " 店", 9, _hoisted_25$4)) : createCommentVNode("", true)
                ]),
                p2.desc ? (openBlock(), createElementBlock("span", _hoisted_26$4, toDisplayString(p2.desc), 1)) : createCommentVNode("", true),
                createBaseVNode("span", {
                  style: normalizeStyle({ color: p2.lowStock && unref(storeStockOf)(p2.id) <= p2.lowStock ? "var(--clay)" : "" })
                }, " 店 " + toDisplayString(unref(fmtQty)(unref(storeStockOf)(p2.id), p2.unit)) + " · 总 " + toDisplayString(unref(fmtQty)(unref(totalStockOf)(p2.id), p2.unit)), 5)
              ]),
              createBaseVNode("div", _hoisted_27$4, [
                createBaseVNode("div", _hoisted_28$4, toDisplayString(unref(money2)(p2.price)), 1),
                createBaseVNode("div", _hoisted_29$4, "/" + toDisplayString(p2.unit), 1)
              ])
            ], 10, _hoisted_21$4);
          }), 128)),
          !list.value.length ? (openBlock(), createElementBlock("div", _hoisted_30$4, [..._cache[16] || (_cache[16] = [
            createBaseVNode("b", null, "本店还没有商品", -1),
            createTextVNode("点右上角 + 新增，或去仓库页把有货的仓库挂到本店 —— 仓库里商品的分类和商品会自动带到本店 ", -1)
          ])])) : createCommentVNode("", true)
        ]),
        unref(showCost) ? (openBlock(), createElementBlock("p", _hoisted_31$4, " 售价 −（商品成本 + 其他成本）= 单件毛利；成本为 0 的商品不计入毛利 ")) : createCommentVNode("", true),
        createVNode(ProductEditor, {
          show: editorOpen.value,
          "onUpdate:show": _cache[8] || (_cache[8] = ($event) => editorOpen.value = $event),
          "product-id": editingId.value
        }, null, 8, ["show", "product-id"]),
        createVNode(ImportSheet, {
          show: importOpen.value,
          "onUpdate:show": _cache[9] || (_cache[9] = ($event) => importOpen.value = $event)
        }, null, 8, ["show"]),
        createVNode(CategorySheet, {
          show: catOpen.value,
          "onUpdate:show": _cache[10] || (_cache[10] = ($event) => catOpen.value = $event)
        }, null, 8, ["show"]),
        createVNode(SplitSheet, {
          show: splitOpen.value,
          "onUpdate:show": _cache[11] || (_cache[11] = ($event) => splitOpen.value = $event)
        }, null, 8, ["show"])
      ]);
    };
  }
};
const _hoisted_1$5 = { class: "page" };
const _hoisted_2$5 = { class: "topbar" };
const _hoisted_3$5 = { class: "wh-sum" };
const _hoisted_4$5 = { class: "sum-main" };
const _hoisted_5$5 = { class: "tnum" };
const _hoisted_6$5 = { class: "sum-side" };
const _hoisted_7$5 = { class: "tnum" };
const _hoisted_8$5 = { class: "tnum" };
const _hoisted_9$5 = { class: "sec-head" };
const _hoisted_10$5 = { class: "hint" };
const _hoisted_11$5 = { class: "wh-grid" };
const _hoisted_12$5 = ["onClick"];
const _hoisted_13$5 = { class: "wh-top" };
const _hoisted_14$4 = { class: "wh-ico" };
const _hoisted_15$4 = { class: "wtag" };
const _hoisted_16$4 = { class: "wh-name" };
const _hoisted_17$4 = { class: "wh-value tnum" };
const _hoisted_18$4 = { class: "wh-foot" };
const _hoisted_19$3 = {
  key: 0,
  class: "empty"
};
const _hoisted_20$3 = { class: "card" };
const _hoisted_21$3 = ["onClick"];
const _hoisted_22$3 = { class: "ico" };
const _hoisted_23$3 = { class: "txt" };
const _hoisted_24$3 = { class: "right" };
const _hoisted_25$3 = ["onClick"];
const _hoisted_26$3 = { class: "card" };
const _hoisted_27$3 = ["onClick"];
const _hoisted_28$3 = { class: "ico amber" };
const _hoisted_29$3 = { class: "txt" };
const _hoisted_30$3 = { class: "right go" };
const _hoisted_31$3 = { class: "card" };
const _hoisted_32$3 = { class: "ico" };
const _hoisted_33$3 = { class: "txt" };
const _hoisted_34$3 = {
  key: 4,
  class: "card how-card"
};
const _hoisted_35$2 = { class: "sheet wh-sheet" };
const _hoisted_36$2 = { class: "sheet-head wh-head" };
const _hoisted_37$2 = { class: "wh-title" };
const _hoisted_38$2 = { class: "wtag" };
const _hoisted_39$2 = { class: "wh-stats" };
const _hoisted_40$2 = { class: "tnum" };
const _hoisted_41$2 = { class: "tnum" };
const _hoisted_42$2 = { class: "wh-acts" };
const _hoisted_43$2 = {
  key: 0,
  class: "wh-supply"
};
const _hoisted_44$2 = { class: "sheet-body wh-body" };
const _hoisted_45$2 = { class: "meta" };
const _hoisted_46$2 = { class: "tnum" };
const _hoisted_47$2 = { class: "qty" };
const _hoisted_48$2 = { class: "tnum" };
const _hoisted_49$2 = {
  key: 0,
  class: "ops"
};
const _hoisted_50$2 = ["onUpdate:modelValue"];
const _hoisted_51$2 = ["onClick"];
const _hoisted_52$2 = {
  key: 0,
  class: "empty"
};
const _hoisted_53$2 = {
  key: 0,
  style: { "margin-top": "10px" }
};
const _hoisted_54$2 = {
  class: "sheet",
  style: { "height": "auto" }
};
const _hoisted_55$2 = { class: "sheet-head" };
const _hoisted_56$2 = {
  class: "card",
  style: { "margin": "0 16px calc(16px + env(safe-area-inset-bottom))" }
};
const _hoisted_57$2 = { class: "ico" };
const _hoisted_58$2 = { class: "ico clay" };
const _hoisted_59$2 = {
  key: 2,
  class: "empty",
  style: { "padding": "16px" }
};
const _hoisted_60$2 = { class: "sheet job-sheet" };
const _hoisted_61$2 = { class: "sheet-head job-head" };
const _hoisted_62$2 = { style: { "min-width": "0" } };
const _hoisted_63$2 = { class: "hint" };
const _hoisted_64$2 = { class: "seg" };
const _hoisted_65$2 = ["data-on"];
const _hoisted_66$2 = ["data-on"];
const _hoisted_67$2 = ["data-on"];
const _hoisted_68$2 = { class: "job-search" };
const _hoisted_69$2 = { class: "sheet-body job-body" };
const _hoisted_70$2 = { class: "job-meta" };
const _hoisted_71$2 = { class: "tnum" };
const _hoisted_72$2 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_73$2 = {
  key: 0,
  class: "empty"
};
const _hoisted_74$2 = { class: "sheet-foot job-foot" };
const _hoisted_75$2 = { class: "job-sum" };
const _hoisted_76$2 = { class: "tnum" };
const _hoisted_77$1 = { key: 0 };
const _hoisted_78$1 = {
  class: "sheet",
  style: { "height": "auto" }
};
const _hoisted_79$1 = { class: "sheet-head" };
const _hoisted_80$1 = { class: "sheet-body" };
const _hoisted_81$1 = { class: "sheet-foot" };
const _sfc_main$5 = {
  __name: "WarehousesView",
  setup(__props) {
    const store = computed(() => activeStore.value);
    const detailId = /* @__PURE__ */ ref("");
    const splitOpen = /* @__PURE__ */ ref(false);
    const splitLoc = /* @__PURE__ */ ref(null);
    const detail = computed(() => detailId.value ? overviewOf("warehouse", detailId.value) : { lines: [], count: 0, value: 0 });
    const mine = computed(() => {
      const ids = store.value ? store.value.warehouseIds || [] : [];
      return warehouses.value.filter((w) => ids.includes(w.id)).map((w) => ({ w, ov: overviewOf("warehouse", w.id) }));
    });
    const others = computed(() => {
      const ids = store.value ? store.value.warehouseIds || [] : [];
      const me = state.meta.deviceId || "local";
      if (store.value && store.value.asAgent) return [];
      return warehouses.value.filter((w) => !ids.includes(w.id) && (w.ownerId || me) === me).map((w) => ({ w, ov: overviewOf("warehouse", w.id) }));
    });
    const jobShow = /* @__PURE__ */ ref(false);
    const jobAct = /* @__PURE__ */ ref("in");
    const jobQty = /* @__PURE__ */ ref({});
    const jobSearch = /* @__PURE__ */ ref("");
    const whName = computed(() => (warehouses.value.find((w) => w.id === detailId.value) || {}).name || "仓库");
    const whHave = (pid) => {
      const row = state.collections.stocks.find((s) => s.productId === pid && s.locType === "warehouse" && s.locId === detailId.value);
      return row ? r2(row.qty) : 0;
    };
    function openJob(act = "in") {
      jobAct.value = act;
      jobQty.value = {};
      jobSearch.value = "";
      jobShow.value = true;
    }
    function closeJob() {
      jobShow.value = false;
      jobQty.value = {};
    }
    const jobList = computed(() => {
      const kw = jobSearch.value.trim().toLowerCase();
      const have = products.value.map((p2) => ({ p: p2, have: whHave(p2.id) }));
      const sorted = have.slice().sort((a, b) => (r2(b.have) > 0 ? 1 : 0) - (r2(a.have) > 0 ? 1 : 0));
      return sorted.filter((l) => !kw || l.p.name.toLowerCase().includes(kw) || (l.p.barcode || "").includes(kw)).slice(0, 40);
    });
    const jobFilled = computed(() => jobList.value.filter((l) => {
      const v = jobQty.value[l.p.id];
      return v !== void 0 && v !== "" && isFinite(parseFloat(v)) && parseFloat(v) > 0;
    }));
    const jobTotal = computed(() => r2(jobFilled.value.reduce((sum, l) => sum + parseFloat(jobQty.value[l.p.id]), 0)));
    function jobAfter(line) {
      const v = parseFloat(jobQty.value[line.p.id]);
      if (!isFinite(v) || v <= 0) return null;
      if (jobAct.value === "in") return r2(line.have + v);
      if (jobAct.value === "count") return r2(v);
      return r2(line.have - v);
    }
    const jobHint = computed(() => ({
      in: "入库 = 在现有数量上累加，进多少填多少",
      count: "盘点 = 直接把数量改成你数出来的数，以本次为准",
      transfer: "调货 = 从仓库发到本店，仓里减少、店里增加"
    })[jobAct.value]);
    function submitJob() {
      if (!jobFilled.value.length) {
        tip("先给要处理的商品填上数量");
        return;
      }
      const whId = detailId.value;
      const acts = [];
      let ok = 0, fail = 0;
      jobFilled.value.forEach((l) => {
        const n2 = parseFloat(jobQty.value[l.p.id]);
        if (jobAct.value === "in") {
          setStock(l.p.id, "warehouse", whId, r2(l.have + n2));
          ok++;
          acts.push(l.p.name + " +" + fmtQty(n2, l.p.unit));
        } else if (jobAct.value === "count") {
          setStock(l.p.id, "warehouse", whId, r2(n2));
          ok++;
          acts.push(l.p.name + " → " + fmtQty(n2, l.p.unit));
        } else {
          if (transferToStore(l.p.id, whId, n2)) {
            ok++;
            acts.push(l.p.name + " " + fmtQty(n2, l.p.unit));
          } else fail++;
        }
      });
      const word = { in: "入库", count: "盘点", transfer: "调货" }[jobAct.value];
      addLog("stock", word + "「" + whName.value + "」" + ok + " 款：" + acts.join("、") + (fail ? "（" + fail + " 款仓里不够）" : ""));
      const unit = jobFilled.value.length === 1 ? jobFilled.value[0].p.unit : "";
      tip(word + "：" + ok + " 款 · " + fmtQty(jobTotal.value, unit) + (fail ? "，" + fail + " 款仓里不够" : ""));
      closeJob();
    }
    const qtyInput = /* @__PURE__ */ ref({});
    const newWh = /* @__PURE__ */ ref({ show: false, name: "", note: "" });
    function openDetail(id) {
      detailId.value = id;
      qtyInput.value = {};
    }
    const moreShow = /* @__PURE__ */ ref(false);
    const sec = /* @__PURE__ */ ref({ help: false });
    const mountedHere = computed(() => !!(detailId.value && store.value && (store.value.warehouseIds || []).includes(detailId.value)));
    const isOwner = computed(() => !!detailWh.value && (detailWh.value.ownerId || (state.meta.deviceId || "local")) === (state.meta.deviceId || "local"));
    const detailWh = computed(() => warehouses.value.find((w) => w.id === detailId.value) || null);
    const detailStores = computed(() => detailId.value ? storesUsingWarehouse(detailId.value) : []);
    const detailOwner = computed(() => detailWh.value ? warehouseOwnerText(detailWh.value) : "");
    function exportWhStock() {
      const w = detailWh.value;
      if (!w) return;
      const rows = [["仓库", "商品名称", "分类", "条形码", "单位", "仓库数量", "成本单价", "成本合计", "成本口径货值"]];
      const cats = state.collections.categories;
      detail.value.lines.forEach((l) => {
        const p2 = l.product;
        rows.push([
          w.name,
          p2.name,
          (cats.find((c) => c.id === p2.cat) || {}).name || "",
          p2.barcode || "",
          p2.unit || "件",
          Number(l.qty || 0),
          Number(p2.cost || 0).toFixed(2),
          Number(p2.other || 0).toFixed(2),
          Number(l.value || 0).toFixed(2)
        ]);
      });
      rows.push(["合计", "", "", "", "", "", "", "", Number(detail.value.value || 0).toFixed(2)]);
      downloadText("库存表-" + w.name + "-" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".csv", toCSV(rows));
      addLog("warehouse", "导出仓库库存表：" + w.name, { warehouseId: w.id });
      tip("已导出「" + w.name + "」库存表");
    }
    async function removeWarehouse() {
      const w = detailWh.value;
      if (!w) return;
      const used = storesUsingWarehouse(w.id);
      if (used.length) {
        await stdin_default$2({ title: "还有店铺挂着它", message: used.map((s) => s.name).join("、") + " 正在用这个仓库供货。先到店铺里取消挂载，再删。", confirmButtonText: "知道了" });
        return;
      }
      const answer = await stdin_default$2({
        title: "删除仓库「" + w.name + "」？",
        message: "仓库里还有 " + detail.value.count + " 个商品、成本货值 " + money(detail.value.value) + "，一起清掉。这个仓库没挂任何店铺，所以不影响店里的货。",
        confirmButton: true,
        cancelButton: true,
        confirmButtonText: "删除",
        cancelButtonText: "再想想"
      });
      if (answer !== "confirm") return;
      if (deleteWarehouse(w.id)) {
        detailId.value = "";
      }
    }
    function doTransfer(line) {
      const n2 = parseFloat(qtyInput.value[line.product.id]);
      if (!(n2 > 0)) {
        tip("先填调拨数量");
        return;
      }
      if (transferToStore(line.product.id, detailId.value, n2)) {
        qtyInput.value[line.product.id] = "";
        tip("已调拨 " + fmtQty(n2, line.product.unit) + " 到「" + (store.value ? store.value.name : "") + "」");
      }
    }
    function attach(w) {
      if (!allow("warehouse:write")) {
        tip("代理不能改仓库归属");
        return;
      }
      if (!store.value) return;
      if (store.value.asAgent) {
        tip("这是别人的店，你只是代卖，不能帮它挂仓库", "error");
        return;
      }
      if (w.ownerId && w.ownerId !== (state.meta.deviceId || "local")) {
        tip("这个仓库属于别人，只能看不能挂", "error");
        return;
      }
      const st = state.collections.stores.find((x) => x.id === store.value.id);
      if (!st) return;
      if (!(st.warehouseIds || []).includes(w.id)) {
        st.warehouseIds = [...st.warehouseIds || [], w.id];
        st.updatedAt = Date.now();
        touch("stores");
        const cats = shareWarehouseCategories(w.id);
        const shared = products.value.filter((p2) => p2.storeId !== st.id).length;
        tip("已挂「" + w.name + "」" + (cats ? "，带回 " + cats + " 个分类" : "") + (shared ? "、" + shared + " 个共享商品" : ""));
      }
    }
    function detach(w) {
      if (!allow("warehouse:write")) {
        tip("代理不能改仓库归属");
        return;
      }
      const st = state.collections.stores.find((x) => x.id === (store.value ? store.value.id : ""));
      if (!st) return;
      const next = (st.warehouseIds || []).filter((id) => id !== w.id);
      if (next.length === (st.warehouseIds || []).length) return;
      st.warehouseIds = next;
      st.updatedAt = Date.now();
      touch("stores");
      addLog("warehouse", "取消挂载：「" + st.name + "」不再从「" + w.name + "」补货", { warehouseId: w.id });
      tip("已取消挂载「" + w.name + "」");
    }
    function createWh() {
      if (!newWh.value.name.trim()) {
        tip("仓库名不能空");
        return;
      }
      saveWarehouse({ name: newWh.value.name, note: newWh.value.note });
      newWh.value = { show: false, name: "", note: "" };
    }
    const refills = computed(() => refillList());
    const recentOps = computed(() => (logs.value || []).filter((l) => l.warehouseId && (l.type === "stock" || l.type === "warehouse")).slice(0, 6).map((l) => ({
      id: l.id,
      text: l.text,
      at: l.at,
      who: l.operatorName || "",
      wh: (warehouses.value.find((w) => w.id === l.warehouseId) || {}).name || ""
    })));
    const allWh = computed(() => {
      const rows = warehouses.value.map((w) => ({ w, ov: overviewOf("warehouse", w.id) }));
      return {
        count: rows.length,
        value: r2(rows.reduce((s, x) => s + x.ov.value, 0)),
        lines: rows.reduce((s, x) => s + x.ov.count, 0)
      };
    });
    return (_ctx, _cache) => {
      const _component_var_popup = resolveComponent("var-popup");
      const _component_var_button = resolveComponent("var-button");
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createBaseVNode("div", _hoisted_2$5, [
          _cache[22] || (_cache[22] = createBaseVNode("div", null, [
            createBaseVNode("div", { class: "title" }, "仓库"),
            createBaseVNode("div", { class: "sub" }, "货先进仓，再按天发放到店")
          ], -1)),
          _cache[23] || (_cache[23] = createBaseVNode("div", { class: "spacer" }, null, -1)),
          createBaseVNode("button", {
            class: "icon-btn",
            "aria-label": "新增仓库",
            onClick: _cache[0] || (_cache[0] = ($event) => newWh.value.show = true)
          }, [
            createVNode(_sfc_main$g, {
              name: "plus",
              size: 18
            })
          ])
        ]),
        createBaseVNode("div", _hoisted_3$5, [
          createBaseVNode("div", _hoisted_4$5, [
            _cache[25] || (_cache[25] = createBaseVNode("span", null, "仓库总货值", -1)),
            createBaseVNode("b", _hoisted_5$5, [
              _cache[24] || (_cache[24] = createBaseVNode("em", null, "¥", -1)),
              createTextVNode(toDisplayString(unref(money2)(allWh.value.value)), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_6$5, [
            createBaseVNode("div", null, [
              _cache[26] || (_cache[26] = createBaseVNode("span", null, "在库商品", -1)),
              createBaseVNode("b", _hoisted_7$5, toDisplayString(allWh.value.lines), 1)
            ]),
            createBaseVNode("div", null, [
              _cache[27] || (_cache[27] = createBaseVNode("span", null, "仓库", -1)),
              createBaseVNode("b", _hoisted_8$5, toDisplayString(allWh.value.count), 1)
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_9$5, [
          createBaseVNode("h2", null, toDisplayString(store.value ? store.value.name : "") + " 的供货仓", 1),
          _cache[28] || (_cache[28] = createBaseVNode("div", { class: "line" }, null, -1)),
          createBaseVNode("span", _hoisted_10$5, toDisplayString(mine.value.length) + " 个", 1)
        ]),
        createBaseVNode("div", _hoisted_11$5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(mine.value, (x) => {
            return openBlock(), createElementBlock("button", {
              key: x.w.id,
              class: "prod wh-card",
              onClick: ($event) => openDetail(x.w.id)
            }, [
              createBaseVNode("div", _hoisted_13$5, [
                createBaseVNode("span", _hoisted_14$4, [
                  createVNode(_sfc_main$g, {
                    name: "layers",
                    size: 16
                  })
                ]),
                createBaseVNode("span", _hoisted_15$4, toDisplayString(unref(warehouseOwnerText)(x.w)), 1)
              ]),
              createBaseVNode("b", _hoisted_16$4, toDisplayString(x.w.name), 1),
              createBaseVNode("div", _hoisted_17$4, toDisplayString(unref(money)(x.ov.value)), 1),
              createBaseVNode("div", _hoisted_18$4, [
                createBaseVNode("span", null, toDisplayString(x.ov.count) + " 款在库", 1),
                _cache[29] || (_cache[29] = createBaseVNode("span", { class: "dot" }, "·", -1)),
                createBaseVNode("span", null, toDisplayString(unref(storesUsingWarehouse)(x.w.id).length) + " 店在用", 1)
              ])
            ], 8, _hoisted_12$5);
          }), 128))
        ]),
        !mine.value.length ? (openBlock(), createElementBlock("div", _hoisted_19$3, [..._cache[30] || (_cache[30] = [
          createBaseVNode("b", null, "本店还没有供货仓", -1),
          createTextVNode("下面挂一个仓库上来，就能从仓里往店里发货 ", -1)
        ])])) : createCommentVNode("", true),
        others.value.length ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[31] || (_cache[31] = createBaseVNode("div", { class: "sec-head" }, [
            createBaseVNode("h2", null, "未挂载的仓库"),
            createBaseVNode("div", { class: "line" }),
            createBaseVNode("span", { class: "hint" }, "不计入本店库存")
          ], -1)),
          createBaseVNode("div", _hoisted_20$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(others.value, (x) => {
              return openBlock(), createElementBlock("div", {
                key: x.w.id,
                class: "row",
                onClick: ($event) => openDetail(x.w.id)
              }, [
                createBaseVNode("span", _hoisted_22$3, [
                  createVNode(_sfc_main$g, {
                    name: "layers",
                    size: 18
                  })
                ]),
                createBaseVNode("span", _hoisted_23$3, [
                  createBaseVNode("b", null, toDisplayString(x.w.name), 1),
                  createBaseVNode("span", null, toDisplayString(x.ov.count) + " 款在库 · " + toDisplayString(unref(money)(x.ov.value)) + " · " + toDisplayString(unref(storesUsingWarehouse)(x.w.id).length ? unref(storesUsingWarehouse)(x.w.id).length + " 家店在用" : "没有店铺在用"), 1)
                ]),
                createBaseVNode("span", _hoisted_24$3, [
                  createBaseVNode("button", {
                    class: "chip",
                    "data-on": true,
                    onClick: withModifiers(($event) => attach(x.w), ["stop"])
                  }, "挂到本店", 8, _hoisted_25$3)
                ])
              ], 8, _hoisted_21$3);
            }), 128))
          ])
        ], 64)) : createCommentVNode("", true),
        refills.value.length ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[33] || (_cache[33] = createBaseVNode("div", { class: "sec-head" }, [
            createBaseVNode("h2", null, "该往下发的货"),
            createBaseVNode("div", { class: "line" }),
            createBaseVNode("span", { class: "hint" }, "店内见底")
          ], -1)),
          createBaseVNode("div", _hoisted_26$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(refills.value, (r) => {
              return openBlock(), createElementBlock("div", {
                key: r.product.id,
                class: "row",
                onClick: ($event) => openDetail(r.bestWh || r.whIds[0])
              }, [
                createBaseVNode("span", _hoisted_28$3, [
                  createVNode(_sfc_main$g, {
                    name: "alert",
                    size: 18
                  })
                ]),
                createBaseVNode("span", _hoisted_29$3, [
                  createBaseVNode("b", null, toDisplayString(r.product.name), 1),
                  createBaseVNode("span", null, "店内剩 " + toDisplayString(unref(fmtQty)(r.store, r.product.unit)) + " · 仓里还有 " + toDisplayString(unref(fmtQty)(r.whTotal, r.product.unit)), 1)
                ]),
                createBaseVNode("span", _hoisted_30$3, [
                  _cache[32] || (_cache[32] = createTextVNode("去调拨", -1)),
                  createVNode(_sfc_main$g, {
                    name: "chev",
                    size: 14
                  })
                ])
              ], 8, _hoisted_27$3);
            }), 128))
          ])
        ], 64)) : createCommentVNode("", true),
        recentOps.value.length ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[34] || (_cache[34] = createBaseVNode("div", { class: "sec-head" }, [
            createBaseVNode("h2", null, "最近的仓库流水"),
            createBaseVNode("div", { class: "line" }),
            createBaseVNode("span", { class: "hint" }, "可追溯")
          ], -1)),
          createBaseVNode("div", _hoisted_31$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(recentOps.value, (o) => {
              return openBlock(), createElementBlock("div", {
                key: o.id,
                class: "row op"
              }, [
                createBaseVNode("span", _hoisted_32$3, [
                  createVNode(_sfc_main$g, {
                    name: "clock",
                    size: 17
                  })
                ]),
                createBaseVNode("span", _hoisted_33$3, [
                  createBaseVNode("b", null, toDisplayString(o.text), 1),
                  createBaseVNode("span", null, toDisplayString(o.wh) + " · " + toDisplayString(o.who || "本机") + " · " + toDisplayString(unref(fmtTime)(o.at)), 1)
                ])
              ]);
            }), 128))
          ])
        ], 64)) : createCommentVNode("", true),
        createBaseVNode("button", {
          class: "how-toggle",
          onClick: _cache[1] || (_cache[1] = ($event) => sec.value.help = !sec.value.help)
        }, [
          createVNode(_sfc_main$g, {
            name: "list",
            size: 15
          }),
          _cache[35] || (_cache[35] = createBaseVNode("span", null, "仓库怎么用", -1)),
          createVNode(_sfc_main$g, {
            name: sec.value.help ? "minus" : "plus",
            size: 14
          }, null, 8, ["name"])
        ]),
        sec.value.help ? (openBlock(), createElementBlock("div", _hoisted_34$3, [..._cache[36] || (_cache[36] = [
          createStaticVNode('<div class="how" data-v-b6601c5e><b data-v-b6601c5e>1</b><span data-v-b6601c5e>买回来的货先进仓库，「入库」是在原有数量上累加，「盘点」是直接改成你数出来的数。</span></div><div class="how" data-v-b6601c5e><b data-v-b6601c5e>2</b><span data-v-b6601c5e>出摊前把今天要卖的量「发放」到店铺，店内库存才是能卖的量。</span></div><div class="how" data-v-b6601c5e><b data-v-b6601c5e>3</b><span data-v-b6601c5e>调拨是整笔成功的：仓里不够就整笔拒绝，不会半路少货。</span></div><div class="how" data-v-b6601c5e><b data-v-b6601c5e>4</b><span data-v-b6601c5e>一家店的商品总数 = 店内 + 已挂载仓库的货；没挂载的仓库，里面的同款货不算给这家店。</span></div>', 4)
        ])])) : createCommentVNode("", true),
        createVNode(_component_var_popup, {
          show: !!detailId.value,
          position: "bottom",
          "onUpdate:show": _cache[7] || (_cache[7] = (v) => {
            if (!v) detailId.value = "";
          })
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_35$2, [
              _cache[46] || (_cache[46] = createBaseVNode("div", { class: "drag" }, null, -1)),
              createBaseVNode("header", _hoisted_36$2, [
                createBaseVNode("div", _hoisted_37$2, [
                  createBaseVNode("b", null, toDisplayString(detailWh.value ? detailWh.value.name : "仓库"), 1),
                  createBaseVNode("span", _hoisted_38$2, toDisplayString(detailOwner.value), 1)
                ]),
                createBaseVNode("button", {
                  class: "icon-btn",
                  "aria-label": "关闭",
                  onClick: _cache[2] || (_cache[2] = ($event) => detailId.value = "")
                }, [
                  createVNode(_sfc_main$g, {
                    name: "close",
                    size: 18
                  })
                ])
              ]),
              createBaseVNode("div", _hoisted_39$2, [
                createBaseVNode("div", null, [
                  _cache[37] || (_cache[37] = createBaseVNode("span", null, "在仓商品", -1)),
                  createBaseVNode("b", _hoisted_40$2, toDisplayString(detail.value.count), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[38] || (_cache[38] = createBaseVNode("span", null, "成本货值", -1)),
                  createBaseVNode("b", _hoisted_41$2, toDisplayString(unref(money)(detail.value.value)), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[39] || (_cache[39] = createBaseVNode("span", null, "供货门店", -1)),
                  createBaseVNode("b", null, toDisplayString(detailStores.value.length ? detailStores.value.length + " 家" : "未挂载"), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_42$2, [
                unref(allow)("stock:write") ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: "act",
                  onClick: _cache[3] || (_cache[3] = ($event) => {
                    splitLoc.value = { type: "warehouse", id: detailId.value };
                    splitOpen.value = true;
                  })
                }, [
                  createVNode(_sfc_main$g, {
                    name: "split",
                    size: 15
                  }),
                  _cache[40] || (_cache[40] = createTextVNode("分装 ", -1))
                ])) : createCommentVNode("", true),
                unref(allow)("stock:write") ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  class: "act jade",
                  onClick: _cache[4] || (_cache[4] = ($event) => openJob("in"))
                }, [
                  createVNode(_sfc_main$g, {
                    name: "box",
                    size: 15
                  }),
                  _cache[41] || (_cache[41] = createTextVNode("入库 / 盘点 ", -1))
                ])) : createCommentVNode("", true),
                createBaseVNode("button", {
                  class: "act",
                  onClick: exportWhStock
                }, [
                  createVNode(_sfc_main$g, {
                    name: "download",
                    size: 15
                  }),
                  _cache[42] || (_cache[42] = createTextVNode("导出表", -1))
                ]),
                createBaseVNode("button", {
                  class: "icon-btn",
                  "aria-label": "更多",
                  onClick: _cache[5] || (_cache[5] = ($event) => moreShow.value = true)
                }, [
                  createVNode(_sfc_main$g, {
                    name: "dots",
                    size: 18
                  })
                ])
              ]),
              detailStores.value.length ? (openBlock(), createElementBlock("div", _hoisted_43$2, [
                _cache[43] || (_cache[43] = createBaseVNode("span", null, "供货给", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(detailStores.value, (s2) => {
                  return openBlock(), createElementBlock("span", {
                    key: s2.id,
                    class: "store-tag"
                  }, toDisplayString(s2.name), 1);
                }), 128))
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_44$2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(detail.value.lines, (l) => {
                  return openBlock(), createElementBlock("div", {
                    key: l.product.id,
                    class: "wh-line"
                  }, [
                    createVNode(_sfc_main$e, {
                      product: l.product,
                      size: 40
                    }, null, 8, ["product"]),
                    createBaseVNode("div", _hoisted_45$2, [
                      createBaseVNode("b", null, toDisplayString(l.product.name), 1),
                      createBaseVNode("span", _hoisted_46$2, "成本 " + toDisplayString(unref(money)((l.product.cost || 0) + (l.product.other || 0))) + " / " + toDisplayString(l.product.unit || "件"), 1)
                    ]),
                    createBaseVNode("div", _hoisted_47$2, [
                      createBaseVNode("b", _hoisted_48$2, toDisplayString(l.qty), 1),
                      createBaseVNode("span", null, toDisplayString(l.product.unit || "件"), 1)
                    ]),
                    unref(allow)("stock:write") ? (openBlock(), createElementBlock("div", _hoisted_49$2, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": ($event) => qtyInput.value[l.product.id] = $event,
                        class: "num-input tiny",
                        type: "number",
                        step: "0.01",
                        placeholder: "数"
                      }, null, 8, _hoisted_50$2), [
                        [vModelText, qtyInput.value[l.product.id]]
                      ]),
                      createBaseVNode("button", {
                        class: "send",
                        onClick: ($event) => doTransfer(l)
                      }, "发放", 8, _hoisted_51$2)
                    ])) : createCommentVNode("", true)
                  ]);
                }), 128)),
                !detail.value.lines.length ? (openBlock(), createElementBlock("div", _hoisted_52$2, [
                  _cache[44] || (_cache[44] = createBaseVNode("b", null, "这个仓库是空的", -1)),
                  _cache[45] || (_cache[45] = createTextVNode("点上面「入库 / 盘点」，把商品和数量记进来 ", -1)),
                  unref(allow)("stock:write") ? (openBlock(), createElementBlock("div", _hoisted_53$2, [
                    createBaseVNode("button", {
                      class: "chip",
                      "data-on": true,
                      onClick: _cache[6] || (_cache[6] = ($event) => openJob("in"))
                    }, "去入库")
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
              ])
            ])
          ]),
          _: 1
        }, 8, ["show"]),
        createVNode(_component_var_popup, {
          show: moreShow.value,
          position: "bottom",
          "onUpdate:show": _cache[11] || (_cache[11] = (v) => moreShow.value = v)
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_54$2, [
              _cache[50] || (_cache[50] = createBaseVNode("div", { class: "drag" }, null, -1)),
              createBaseVNode("header", _hoisted_55$2, [
                _cache[47] || (_cache[47] = createBaseVNode("b", null, "仓库操作", -1)),
                createBaseVNode("button", {
                  class: "icon-btn",
                  "aria-label": "关闭",
                  onClick: _cache[8] || (_cache[8] = ($event) => moreShow.value = false)
                }, [
                  createVNode(_sfc_main$g, {
                    name: "close",
                    size: 18
                  })
                ])
              ]),
              createBaseVNode("div", _hoisted_56$2, [
                mountedHere.value ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: "row",
                  onClick: _cache[9] || (_cache[9] = ($event) => {
                    moreShow.value = false;
                    detach(detailWh.value);
                  })
                }, [
                  createBaseVNode("span", _hoisted_57$2, [
                    createVNode(_sfc_main$g, {
                      name: "link",
                      size: 18
                    })
                  ]),
                  _cache[48] || (_cache[48] = createBaseVNode("span", { class: "txt" }, [
                    createBaseVNode("b", null, "取消挂载"),
                    createBaseVNode("span", null, "本店不再从它补货，仓里的货不动")
                  ], -1))
                ])) : createCommentVNode("", true),
                isOwner.value && unref(allow)("warehouse:write") ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  class: "row",
                  onClick: _cache[10] || (_cache[10] = ($event) => {
                    moreShow.value = false;
                    removeWarehouse();
                  })
                }, [
                  createBaseVNode("span", _hoisted_58$2, [
                    createVNode(_sfc_main$g, {
                      name: "trash",
                      size: 18
                    })
                  ]),
                  _cache[49] || (_cache[49] = createBaseVNode("span", { class: "txt" }, [
                    createBaseVNode("b", { style: { "color": "var(--clay)" } }, "删除仓库"),
                    createBaseVNode("span", null, "仅能删自己建的、且没有任何店铺挂着")
                  ], -1))
                ])) : createCommentVNode("", true),
                !mountedHere.value && !(isOwner.value && unref(allow)("warehouse:write")) ? (openBlock(), createElementBlock("div", _hoisted_59$2, "这个仓库没有可以做的操作")) : createCommentVNode("", true)
              ])
            ])
          ]),
          _: 1
        }, 8, ["show"]),
        createVNode(SplitSheet, {
          show: splitOpen.value,
          "onUpdate:show": _cache[12] || (_cache[12] = ($event) => splitOpen.value = $event),
          "default-loc": splitLoc.value
        }, null, 8, ["show", "default-loc"]),
        createVNode(_component_var_popup, {
          show: jobShow.value,
          position: "bottom",
          "onUpdate:show": _cache[17] || (_cache[17] = (v) => jobShow.value = v)
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_60$2, [
              _cache[56] || (_cache[56] = createBaseVNode("div", { class: "drag" }, null, -1)),
              createBaseVNode("header", _hoisted_61$2, [
                createBaseVNode("div", _hoisted_62$2, [
                  createBaseVNode("b", null, toDisplayString(jobAct.value === "transfer" ? "调货到店" : jobAct.value === "count" ? "盘点" : "入库") + " · " + toDisplayString(whName.value), 1),
                  createBaseVNode("div", _hoisted_63$2, toDisplayString(jobHint.value), 1)
                ]),
                createBaseVNode("button", {
                  class: "icon-btn",
                  "aria-label": "关闭",
                  onClick: closeJob
                }, [
                  createVNode(_sfc_main$g, {
                    name: "close",
                    size: 18
                  })
                ])
              ]),
              createBaseVNode("div", _hoisted_64$2, [
                createBaseVNode("button", {
                  "data-on": jobAct.value === "in",
                  onClick: _cache[13] || (_cache[13] = ($event) => {
                    jobAct.value = "in";
                    jobQty.value = {};
                  })
                }, [..._cache[51] || (_cache[51] = [
                  createTextVNode("入库 ", -1),
                  createBaseVNode("em", null, "+", -1)
                ])], 8, _hoisted_65$2),
                createBaseVNode("button", {
                  "data-on": jobAct.value === "count",
                  onClick: _cache[14] || (_cache[14] = ($event) => {
                    jobAct.value = "count";
                    jobQty.value = {};
                  })
                }, [..._cache[52] || (_cache[52] = [
                  createTextVNode("盘点 ", -1),
                  createBaseVNode("em", null, "=", -1)
                ])], 8, _hoisted_66$2),
                createBaseVNode("button", {
                  "data-on": jobAct.value === "transfer",
                  onClick: _cache[15] || (_cache[15] = ($event) => {
                    jobAct.value = "transfer";
                    jobQty.value = {};
                  })
                }, "调货到店", 8, _hoisted_67$2)
              ]),
              createBaseVNode("div", _hoisted_68$2, [
                createVNode(_sfc_main$g, {
                  name: "search",
                  size: 16
                }),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => jobSearch.value = $event),
                  placeholder: "搜商品名或条码"
                }, null, 512), [
                  [vModelText, jobSearch.value]
                ])
              ]),
              createBaseVNode("div", _hoisted_69$2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(jobList.value, (l) => {
                  return openBlock(), createElementBlock("div", {
                    key: l.p.id,
                    class: "job-row"
                  }, [
                    createVNode(_sfc_main$e, {
                      product: l.p,
                      size: 36
                    }, null, 8, ["product"]),
                    createBaseVNode("div", _hoisted_70$2, [
                      createBaseVNode("b", null, toDisplayString(l.p.name), 1),
                      createBaseVNode("span", _hoisted_71$2, [
                        createTextVNode("现存 " + toDisplayString(unref(fmtQty)(l.have, l.p.unit)), 1),
                        jobAfter(l) !== null ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                          _cache[53] || (_cache[53] = createTextVNode(" → ", -1)),
                          createBaseVNode("em", null, toDisplayString(unref(fmtQty)(jobAfter(l), l.p.unit)), 1)
                        ], 64)) : createCommentVNode("", true)
                      ])
                    ]),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": ($event) => jobQty.value[l.p.id] = $event,
                      class: "num-input tiny",
                      type: "number",
                      step: "0.01",
                      placeholder: jobAct.value === "count" ? "盘成" : jobAct.value === "in" ? "加多少" : "发多少"
                    }, null, 8, _hoisted_72$2), [
                      [vModelText, jobQty.value[l.p.id]]
                    ])
                  ]);
                }), 128)),
                !jobList.value.length ? (openBlock(), createElementBlock("div", _hoisted_73$2, [..._cache[54] || (_cache[54] = [
                  createBaseVNode("b", null, "没找到商品", -1),
                  createTextVNode("换个关键词，或先去「商品」页新建", -1)
                ])])) : createCommentVNode("", true)
              ]),
              createBaseVNode("footer", _hoisted_74$2, [
                createBaseVNode("div", _hoisted_75$2, [
                  createBaseVNode("span", null, "已填 " + toDisplayString(jobFilled.value.length) + " 款", 1),
                  createBaseVNode("b", _hoisted_76$2, toDisplayString(unref(fmtQty)(jobTotal.value, "")), 1),
                  jobAct.value === "transfer" ? (openBlock(), createElementBlock("span", _hoisted_77$1, "发到「" + toDisplayString(store.value ? store.value.name : "本店") + "」", 1)) : createCommentVNode("", true)
                ]),
                createVNode(_component_var_button, {
                  type: "primary",
                  size: "large",
                  block: "",
                  onClick: submitJob
                }, {
                  default: withCtx(() => [
                    _cache[55] || (_cache[55] = createTextVNode(" 全部提交", -1)),
                    jobFilled.value.length ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      createTextVNode("（" + toDisplayString(jobFilled.value.length) + " 款）", 1)
                    ], 64)) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _: 1
        }, 8, ["show"]),
        createVNode(_component_var_popup, {
          show: newWh.value.show,
          position: "bottom",
          "onUpdate:show": _cache[21] || (_cache[21] = (v) => newWh.value.show = v)
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_78$1, [
              _cache[61] || (_cache[61] = createBaseVNode("div", { class: "drag" }, null, -1)),
              createBaseVNode("header", _hoisted_79$1, [
                _cache[57] || (_cache[57] = createBaseVNode("b", null, "新增仓库", -1)),
                createBaseVNode("button", {
                  class: "icon-btn",
                  "aria-label": "关闭",
                  onClick: _cache[18] || (_cache[18] = ($event) => newWh.value.show = false)
                }, [
                  createVNode(_sfc_main$g, {
                    name: "close",
                    size: 18
                  })
                ])
              ]),
              createBaseVNode("div", _hoisted_80$1, [
                _cache[58] || (_cache[58] = createBaseVNode("div", { class: "field-label" }, "仓库名", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => newWh.value.name = $event),
                  class: "inp",
                  placeholder: "例如 家里柜子 / 车库存货"
                }, null, 512), [
                  [vModelText, newWh.value.name]
                ]),
                _cache[59] || (_cache[59] = createBaseVNode("div", { class: "field-label" }, "备注", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => newWh.value.note = $event),
                  class: "inp",
                  placeholder: "放什么、谁在管"
                }, null, 512), [
                  [vModelText, newWh.value.note]
                ])
              ]),
              createBaseVNode("footer", _hoisted_81$1, [
                createVNode(_component_var_button, {
                  type: "primary",
                  size: "normal",
                  block: "",
                  onClick: createWh
                }, {
                  default: withCtx(() => [..._cache[60] || (_cache[60] = [
                    createTextVNode("建仓并挂到本店", -1)
                  ])]),
                  _: 1
                })
              ])
            ])
          ]),
          _: 1
        }, 8, ["show"])
      ]);
    };
  }
};
const WarehousesView = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-b6601c5e"]]);
const _hoisted_1$4 = { class: "page" };
const _hoisted_2$4 = { class: "topbar" };
const _hoisted_3$4 = { class: "sub" };
const _hoisted_4$4 = { class: "chips" };
const _hoisted_5$4 = ["data-on", "onClick"];
const _hoisted_6$4 = {
  class: "chips",
  style: { "margin-top": "6px" }
};
const _hoisted_7$4 = ["data-on", "onClick"];
const _hoisted_8$4 = { class: "sec-head" };
const _hoisted_9$4 = { class: "hint" };
const _hoisted_10$4 = { class: "card" };
const _hoisted_11$4 = ["onClick"];
const _hoisted_12$4 = { class: "txt" };
const _hoisted_13$4 = ["onClick"];
const _hoisted_14$3 = { key: 0 };
const _hoisted_15$3 = { key: 1 };
const _hoisted_16$3 = { class: "order-meta" };
const _hoisted_17$3 = { class: "right order-amount" };
const _hoisted_18$3 = { key: 0 };
const _hoisted_19$2 = { key: 1 };
const _hoisted_20$2 = { key: 2 };
const _hoisted_21$2 = { key: 3 };
const _hoisted_22$2 = {
  key: 0,
  class: "empty"
};
const _hoisted_23$2 = { class: "sheet" };
const _hoisted_24$2 = { class: "sheet-head" };
const _hoisted_25$2 = { class: "hint" };
const _hoisted_26$2 = { class: "head-acts" };
const _hoisted_27$2 = { class: "sheet-body" };
const _hoisted_28$2 = {
  class: "meta",
  style: { "flex": "1", "min-width": "0" }
};
const _hoisted_29$2 = { style: { "display": "flex", "align-items": "center", "gap": "6px" } };
const _hoisted_30$2 = ["onClick"];
const _hoisted_31$2 = {
  class: "tnum",
  style: { "min-width": "36px", "text-align": "center" }
};
const _hoisted_32$2 = ["onClick"];
const _hoisted_33$2 = ["onClick"];
const _hoisted_34$2 = { class: "pay-total" };
const _hoisted_35$1 = {
  class: "edit-row",
  style: { "margin-top": "14px" }
};
const _hoisted_36$1 = { class: "pay-hero" };
const _hoisted_37$1 = { class: "pay-hero-l" };
const _hoisted_38$1 = ["data-pm"];
const _hoisted_39$1 = { class: "pay-hero-amt" };
const _hoisted_40$1 = { class: "pay-hero-sub" };
const _hoisted_41$1 = { class: "pay-hero-qty" };
const _hoisted_42$1 = { class: "kv-grid" };
const _hoisted_43$1 = { class: "kv" };
const _hoisted_44$1 = { class: "kv" };
const _hoisted_45$1 = { class: "kv" };
const _hoisted_46$1 = { class: "kv" };
const _hoisted_47$1 = { class: "kv" };
const _hoisted_48$1 = { class: "kv" };
const _hoisted_49$1 = { class: "kv" };
const _hoisted_50$1 = { class: "kv" };
const _hoisted_51$1 = {
  key: 0,
  class: "note-line"
};
const _hoisted_52$1 = { class: "money-block" };
const _hoisted_53$1 = { class: "mline" };
const _hoisted_54$1 = {
  key: 0,
  class: "mline disc"
};
const _hoisted_55$1 = {
  key: 1,
  class: "mline disc"
};
const _hoisted_56$1 = { class: "mline" };
const _hoisted_57$1 = {
  key: 2,
  class: "mline"
};
const _hoisted_58$1 = {
  key: 3,
  class: "mline"
};
const _hoisted_59$1 = { class: "mline strong" };
const _hoisted_60$1 = { class: "money-block" };
const _hoisted_61$1 = { class: "mline" };
const _hoisted_62$1 = { class: "mline strong" };
const _hoisted_63$1 = { class: "mline" };
const _hoisted_64$1 = { class: "block-title" };
const _hoisted_65$1 = { class: "items-block" };
const _hoisted_66$1 = { class: "item-idx" };
const _hoisted_67$1 = { class: "item-meta" };
const _hoisted_68$1 = { class: "tnum" };
const _hoisted_69$1 = {
  key: 2,
  class: "edit-row"
};
const _hoisted_70$1 = {
  key: 3,
  class: "hint",
  style: { "margin-top": "10px" }
};
const _hoisted_71$1 = { class: "picker-sheet" };
const _hoisted_72$1 = { class: "sheet-head" };
const _hoisted_73$1 = {
  class: "search",
  style: { "padding": "0 16px 8px" }
};
const _hoisted_74$1 = { class: "picker-grid" };
const _hoisted_75$1 = ["onClick"];
const _hoisted_76$1 = { class: "picker-card-meta" };
const _sfc_main$4 = {
  __name: "OrdersView",
  setup(__props) {
    const rangeKey = /* @__PURE__ */ ref("today");
    const agentKey = /* @__PURE__ */ ref("all");
    const detailId = /* @__PURE__ */ ref("");
    const editReceived = /* @__PURE__ */ ref("");
    const expandedIds = /* @__PURE__ */ ref(/* @__PURE__ */ new Set());
    const editing = /* @__PURE__ */ ref(false);
    const draftLines = /* @__PURE__ */ ref([]);
    const showProductPicker = /* @__PURE__ */ ref(false);
    const pickerKw = /* @__PURE__ */ ref("");
    const ranges = rangePresets();
    const current = computed(() => ranges.find((r) => r.key === rangeKey.value) || ranges[0]);
    const store = computed(() => activeStore.value);
    const agentOptions = computed(() => {
      const sid = store.value ? store.value.id : "";
      const seen = new Set((orders.value || []).filter((o) => o.storeId === sid && o.agentId).map((o) => o.agentId));
      const list = (state.collections.agents || []).filter((a) => a.parentStoreId === sid || seen.has(a.id));
      return [{ id: "all", name: "全部" }, { id: "__self", name: "店主自卖" }, ...list.map((a) => ({ id: a.id, name: a.name }))];
    });
    watch(() => store.value ? store.value.id : "", () => {
      agentKey.value = "all";
    });
    const filtered = computed(() => {
      let list = filterOrders(orders.value, {
        from: current.value.from,
        to: current.value.to,
        storeId: store.value ? store.value.id : ""
      });
      if (agentKey.value === "__self") list = list.filter((o) => !o.agentId);
      else if (agentKey.value !== "all") list = list.filter((o) => o.agentId === agentKey.value);
      return list;
    });
    const groups = computed(() => groupByDay(filtered.value));
    const total = computed(() => filtered.value.reduce((s, o) => s + orderStats(o, productById).received, 0));
    const detail = computed(() => state.collections.orders.find((o) => o.id === detailId.value) || null);
    const detailStats = computed(() => detail.value ? orderStats(detail.value, productById) : null);
    const METHOD = { wechat: "微信", alipay: "支付宝", cash: "现金", other: "其他" };
    const methodName = (o) => METHOD[o.paymentMethod] || "其他";
    const detailQty = computed(() => detail.value ? detail.value.items.reduce((s, l) => s + Number(l.qty || 0), 0) : 0);
    const detailMargin = computed(() => {
      const st = detailStats.value;
      if (!st || !st.received) return 0;
      return st.profit / st.received;
    });
    const detailDiscSaving = computed(() => {
      const o = detail.value;
      if (!o) return 0;
      const afterDisc = o.total + (o.roundOff || 0);
      return Math.max(0, r2((o.origTotal || o.total) - afterDisc));
    });
    const detailTendered = computed(() => {
      const o = detail.value;
      if (!o) return 0;
      return o.paymentMethod === "cash" ? o.cashTendered || o.total : o.total;
    });
    const detailStoreName = computed(() => activeStore.value ? activeStore.value.name : "-");
    function open(o) {
      detailId.value = o.id;
      editReceived.value = String(o.received);
      editing.value = false;
      draftLines.value = [];
    }
    function startEdit() {
      if (!detail.value) return;
      draftLines.value = detail.value.items.map((l) => ({ ...l }));
      editing.value = true;
    }
    function cancelEdit() {
      editing.value = false;
      draftLines.value = [];
    }
    function changeQty(i, delta) {
      const l = draftLines.value[i];
      l.qty = Math.max(0, r2(l.qty + delta));
      if (l.qty === 0) {
        if (window.confirm("删除「" + l.name + "」这一行？")) {
          draftLines.value.splice(i, 1);
        } else {
          l.qty = r2(-delta);
        }
      }
    }
    function removeLine(i) {
      draftLines.value.splice(i, 1);
    }
    function addProductToOrder(p2) {
      const existing = draftLines.value.find((l) => l.productId === p2.id);
      if (existing) {
        existing.qty = r2(existing.qty + (p2.step || 1));
      } else {
        draftLines.value.push({
          productId: p2.id,
          name: p2.name,
          price: r2(p2.price),
          qty: r2(p2.step || 1),
          unit: p2.unit || "件",
          cost: r2(p2.cost || 0),
          other: r2(p2.other || 0)
        });
      }
      showProductPicker.value = false;
      pickerKw.value = "";
    }
    function saveEdit() {
      if (!draftLines.value.length) {
        tip("订单至少要有一行商品");
        return;
      }
      if (editOrderItems(detailId.value, draftLines.value)) {
        tip("已保存修改");
        editing.value = false;
        draftLines.value = [];
      }
    }
    const pickerProducts = computed(() => {
      const kw = pickerKw.value.trim().toLowerCase();
      if (!kw) return products.value.slice(0, 20);
      return products.value.filter((p2) => p2.name.toLowerCase().includes(kw)).slice(0, 30);
    });
    function saveReceived() {
      const n2 = parseFloat(editReceived.value);
      if (!isFinite(n2)) {
        tip("填个数字");
        return;
      }
      if (updateOrderReceived(detailId.value, n2)) {
        tip("实收已改");
        detailId.value = "";
      }
    }
    function remove2() {
      if (!window.confirm("删除这笔订单并把库存还回去？")) return;
      if (deleteOrder(detailId.value)) {
        tip("已删单，库存已还");
        detailId.value = "";
      }
    }
    function agentName(id) {
      return (state.collections.agents.find((a) => a.id === id) || {}).name || "代理";
    }
    function toggleExpand(id) {
      const set = new Set(expandedIds.value);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      expandedIds.value = set;
    }
    function isExpanded(id) {
      return expandedIds.value.has(id);
    }
    function firstProduct(o) {
      const it = o.items && o.items[0];
      if (!it) return { name: "", img: "", motif: "tape" };
      const real = (state.collections.products || []).find((p2) => p2.id === it.productId);
      return { name: it.name, img: it.img || real && real.img || "", motif: real && real.motif || "tape" };
    }
    function speakOrder() {
      if (!detail.value) return;
      const o = detail.value;
      const methodText = { wechat: "微信", alipay: "支付宝", cash: "现金", other: "其他" }[o.paymentMethod] || "其他";
      let text = methodText + "收款 " + money(detailStats.value.received);
      if (o.change > 0) text += "，找零 " + money(o.change);
      speak(text, true);
    }
    function orderCode(o) {
      const tail = String(o.id || "").split("-").pop() || "";
      return "#" + (tail.toUpperCase().slice(0, 4) || "----");
    }
    function fullTime(ts) {
      const d = new Date(ts);
      const p2 = (n2) => String(n2).padStart(2, "0");
      return d.getFullYear() + "-" + p2(d.getMonth() + 1) + "-" + p2(d.getDate()) + " " + p2(d.getHours()) + ":" + p2(d.getMinutes());
    }
    function dayLabel(g) {
      const d = new Date(g.at);
      return d.getMonth() + 1 + "月" + d.getDate() + "日";
    }
    return (_ctx, _cache) => {
      const _component_var_button = resolveComponent("var-button");
      const _component_var_popup = resolveComponent("var-popup");
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("div", _hoisted_2$4, [
          createBaseVNode("div", null, [
            _cache[7] || (_cache[7] = createBaseVNode("div", { class: "title" }, "订单", -1)),
            createBaseVNode("div", _hoisted_3$4, toDisplayString(filtered.value.length) + " 笔 · 实收 " + toDisplayString(unref(money)(total.value)), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_4$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(ranges), (r) => {
            return openBlock(), createElementBlock("button", {
              key: r.key,
              class: "chip",
              "data-on": rangeKey.value === r.key,
              onClick: ($event) => rangeKey.value = r.key
            }, toDisplayString(r.label), 9, _hoisted_5$4);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_6$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(agentOptions.value, (a) => {
            return openBlock(), createElementBlock("button", {
              key: a.id,
              class: "chip",
              "data-on": agentKey.value === a.id,
              onClick: ($event) => agentKey.value = a.id
            }, toDisplayString(a.name), 9, _hoisted_7$4);
          }), 128))
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(groups.value, (g) => {
          return openBlock(), createElementBlock("div", {
            key: g.key
          }, [
            createBaseVNode("div", _hoisted_8$4, [
              createBaseVNode("h2", null, toDisplayString(dayLabel(g)), 1),
              _cache[8] || (_cache[8] = createBaseVNode("div", { class: "line" }, null, -1)),
              createBaseVNode("span", _hoisted_9$4, toDisplayString(unref(money)(g.orders.reduce((s, o) => s + unref(orderStats)(o, unref(productById)).received, 0))), 1)
            ]),
            createBaseVNode("div", _hoisted_10$4, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(g.orders, (o) => {
                return openBlock(), createElementBlock("button", {
                  key: o.id,
                  class: "row order-row",
                  onClick: ($event) => open(o)
                }, [
                  createVNode(_sfc_main$e, {
                    product: firstProduct(o),
                    size: 40
                  }, null, 8, ["product"]),
                  createBaseVNode("span", _hoisted_12$4, [
                    createBaseVNode("b", {
                      class: normalizeClass(["order-name", { "expanded": isExpanded(o.id) }]),
                      onClick: withModifiers(($event) => toggleExpand(o.id), ["stop"])
                    }, [
                      isExpanded(o.id) ? (openBlock(), createElementBlock("span", _hoisted_14$3, toDisplayString(o.items.map((it) => it.name).join("、")), 1)) : (openBlock(), createElementBlock("span", _hoisted_15$3, toDisplayString(o.items.map((it) => it.name).slice(0, 2).join("、")) + toDisplayString(o.items.length > 2 ? " 等" : ""), 1))
                    ], 10, _hoisted_13$4),
                    createBaseVNode("span", _hoisted_16$3, [
                      createTextVNode(toDisplayString(unref(fmtTime)(o.at)) + " · " + toDisplayString(o.items.length) + "行 ", 1),
                      o.agentId ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        createTextVNode(" · 代理" + toDisplayString(agentName(o.agentId)), 1)
                      ], 64)) : createCommentVNode("", true),
                      unref(isBigOrder)(o) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        _cache[9] || (_cache[9] = createTextVNode(" · ", -1)),
                        _cache[10] || (_cache[10] = createBaseVNode("b", { style: { "color": "var(--clay)" } }, "大单", -1))
                      ], 64)) : createCommentVNode("", true)
                    ])
                  ]),
                  createBaseVNode("span", _hoisted_17$3, [
                    createBaseVNode("b", null, toDisplayString(unref(money2)(o.received)), 1),
                    o.paymentMethod === "wechat" ? (openBlock(), createElementBlock("span", _hoisted_18$3, "微信")) : o.paymentMethod === "alipay" ? (openBlock(), createElementBlock("span", _hoisted_19$2, "支付宝")) : o.paymentMethod === "cash" ? (openBlock(), createElementBlock("span", _hoisted_20$2, "现金")) : (openBlock(), createElementBlock("span", _hoisted_21$2, "其他"))
                  ])
                ], 8, _hoisted_11$4);
              }), 128))
            ])
          ]);
        }), 128)),
        !groups.value.length ? (openBlock(), createElementBlock("div", _hoisted_22$2, [..._cache[11] || (_cache[11] = [
          createBaseVNode("b", null, "这段时间没有订单", -1),
          createTextVNode("换个时间范围看看，或者回首页开一单 ", -1)
        ])])) : createCommentVNode("", true),
        createVNode(_component_var_popup, {
          show: !!detailId.value,
          position: "bottom",
          "onUpdate:show": _cache[6] || (_cache[6] = (v) => {
            if (!v) detailId.value = "";
          })
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_23$2, [
              createBaseVNode("header", _hoisted_24$2, [
                createBaseVNode("div", null, [
                  _cache[12] || (_cache[12] = createBaseVNode("b", null, "订单详情", -1)),
                  createBaseVNode("div", _hoisted_25$2, toDisplayString(detail.value ? fullTime(detail.value.at) : "") + " · " + toDisplayString(detail.value ? detail.value.items.length : 0) + " 行", 1)
                ]),
                createBaseVNode("div", _hoisted_26$2, [
                  createBaseVNode("button", {
                    class: "icon-btn",
                    "aria-label": "语音重播",
                    title: "语音重播",
                    onClick: speakOrder
                  }, [
                    createVNode(_sfc_main$g, {
                      name: "speaker",
                      size: 18
                    })
                  ]),
                  createBaseVNode("button", {
                    class: "icon-btn",
                    "aria-label": "关闭",
                    onClick: _cache[0] || (_cache[0] = ($event) => detailId.value = "")
                  }, [
                    createVNode(_sfc_main$g, {
                      name: "close",
                      size: 18
                    })
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_27$2, [
                editing.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(draftLines.value, (l, i) => {
                    return openBlock(), createElementBlock("div", {
                      key: i,
                      class: "pay-line",
                      style: { "flex-wrap": "wrap" }
                    }, [
                      createBaseVNode("div", _hoisted_28$2, [
                        createBaseVNode("b", null, toDisplayString(l.name), 1),
                        createBaseVNode("span", null, toDisplayString(unref(money)(l.price)) + " / " + toDisplayString(l.unit), 1)
                      ]),
                      createBaseVNode("div", _hoisted_29$2, [
                        createBaseVNode("button", {
                          class: "qty-btn",
                          onClick: ($event) => changeQty(i, -(l.step || 1))
                        }, "−", 8, _hoisted_30$2),
                        createBaseVNode("b", _hoisted_31$2, toDisplayString(unref(fmtQty)(l.qty, l.unit)), 1),
                        createBaseVNode("button", {
                          class: "qty-btn",
                          onClick: ($event) => changeQty(i, l.step || 1)
                        }, "＋", 8, _hoisted_32$2),
                        createBaseVNode("button", {
                          class: "qty-btn del",
                          onClick: ($event) => removeLine(i)
                        }, "×", 8, _hoisted_33$2)
                      ])
                    ]);
                  }), 128)),
                  createBaseVNode("button", {
                    class: "add-prod-btn",
                    onClick: _cache[1] || (_cache[1] = ($event) => showProductPicker.value = true)
                  }, [
                    createVNode(_sfc_main$g, {
                      name: "plus",
                      size: 16
                    }),
                    _cache[13] || (_cache[13] = createTextVNode(" 添加商品 ", -1))
                  ]),
                  createBaseVNode("div", _hoisted_34$2, [
                    _cache[14] || (_cache[14] = createBaseVNode("span", null, "小计", -1)),
                    createBaseVNode("b", null, toDisplayString(unref(money)(draftLines.value.reduce((s, l) => s + l.price * l.qty, 0))), 1)
                  ]),
                  createBaseVNode("div", _hoisted_35$1, [
                    createVNode(_component_var_button, {
                      size: "small",
                      onClick: cancelEdit
                    }, {
                      default: withCtx(() => [..._cache[15] || (_cache[15] = [
                        createTextVNode("取消", -1)
                      ])]),
                      _: 1
                    }),
                    createVNode(_component_var_button, {
                      size: "small",
                      type: "primary",
                      onClick: saveEdit
                    }, {
                      default: withCtx(() => [..._cache[16] || (_cache[16] = [
                        createTextVNode("保存修改", -1)
                      ])]),
                      _: 1
                    })
                  ])
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createBaseVNode("div", _hoisted_36$1, [
                    createBaseVNode("div", _hoisted_37$1, [
                      createBaseVNode("span", {
                        class: "pm-chip",
                        "data-pm": detail.value ? detail.value.paymentMethod : "other"
                      }, toDisplayString(detail.value ? methodName(detail.value) : ""), 9, _hoisted_38$1),
                      createBaseVNode("b", _hoisted_39$1, toDisplayString(unref(money)(detailStats.value ? detailStats.value.received : 0)), 1),
                      createBaseVNode("span", _hoisted_40$1, "实收 · " + toDisplayString(detail.value ? unref(fmtTime)(detail.value.at) : ""), 1)
                    ]),
                    createBaseVNode("span", _hoisted_41$1, [
                      createBaseVNode("b", null, toDisplayString(unref(fmtQty)(detailQty.value, "件")), 1),
                      createBaseVNode("small", null, toDisplayString(detail.value ? detail.value.items.length : 0) + " 行", 1)
                    ])
                  ]),
                  _cache[41] || (_cache[41] = createBaseVNode("div", { class: "block-title" }, "订单信息", -1)),
                  createBaseVNode("div", _hoisted_42$1, [
                    createBaseVNode("div", _hoisted_43$1, [
                      _cache[17] || (_cache[17] = createBaseVNode("span", null, "单号", -1)),
                      createBaseVNode("b", null, toDisplayString(detail.value ? orderCode(detail.value) : "-"), 1)
                    ]),
                    createBaseVNode("div", _hoisted_44$1, [
                      _cache[18] || (_cache[18] = createBaseVNode("span", null, "件数", -1)),
                      createBaseVNode("b", null, toDisplayString(unref(fmtQty)(detailQty.value, "件")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_45$1, [
                      _cache[19] || (_cache[19] = createBaseVNode("span", null, "时间", -1)),
                      createBaseVNode("b", null, toDisplayString(detail.value ? fullTime(detail.value.at) : "-"), 1)
                    ]),
                    createBaseVNode("div", _hoisted_46$1, [
                      _cache[20] || (_cache[20] = createBaseVNode("span", null, "支付方式", -1)),
                      createBaseVNode("b", null, toDisplayString(detail.value ? methodName(detail.value) : "-"), 1)
                    ]),
                    createBaseVNode("div", _hoisted_47$1, [
                      _cache[21] || (_cache[21] = createBaseVNode("span", null, "店铺", -1)),
                      createBaseVNode("b", null, toDisplayString(detailStoreName.value), 1)
                    ]),
                    createBaseVNode("div", _hoisted_48$1, [
                      _cache[22] || (_cache[22] = createBaseVNode("span", null, "记账人", -1)),
                      createBaseVNode("b", null, toDisplayString(detail.value && detail.value.agentId ? "代理 · " + agentName(detail.value.agentId) : "店主自卖"), 1)
                    ]),
                    createBaseVNode("div", _hoisted_49$1, [
                      _cache[23] || (_cache[23] = createBaseVNode("span", null, "大单", -1)),
                      createBaseVNode("b", null, toDisplayString(detail.value && unref(isBigOrder)(detail.value) ? "是" : "否"), 1)
                    ]),
                    createBaseVNode("div", _hoisted_50$1, [
                      _cache[24] || (_cache[24] = createBaseVNode("span", null, "状态", -1)),
                      createBaseVNode("b", null, toDisplayString(detail.value && detail.value.settled === false ? "挂单中" : "已完成"), 1)
                    ])
                  ]),
                  detail.value && detail.value.note ? (openBlock(), createElementBlock("div", _hoisted_51$1, [
                    _cache[25] || (_cache[25] = createBaseVNode("span", null, "备注", -1)),
                    createBaseVNode("b", null, toDisplayString(detail.value.note), 1)
                  ])) : createCommentVNode("", true),
                  _cache[42] || (_cache[42] = createBaseVNode("div", { class: "block-title" }, "金额明细", -1)),
                  createBaseVNode("div", _hoisted_52$1, [
                    createBaseVNode("div", _hoisted_53$1, [
                      _cache[26] || (_cache[26] = createBaseVNode("span", null, "原价合计", -1)),
                      createBaseVNode("b", null, toDisplayString(unref(money)(detail.value ? detail.value.origTotal || detail.value.total : 0)), 1)
                    ]),
                    detail.value && detailDiscSaving.value > 0 ? (openBlock(), createElementBlock("div", _hoisted_54$1, [
                      createBaseVNode("span", null, [
                        _cache[27] || (_cache[27] = createTextVNode("折扣 ", -1)),
                        createBaseVNode("i", null, toDisplayString(detail.value.discount) + " 折", 1)
                      ]),
                      createBaseVNode("b", null, "-" + toDisplayString(unref(money)(detailDiscSaving.value)), 1)
                    ])) : createCommentVNode("", true),
                    detail.value && detail.value.roundOff ? (openBlock(), createElementBlock("div", _hoisted_55$1, [
                      _cache[28] || (_cache[28] = createBaseVNode("span", null, "抹零", -1)),
                      createBaseVNode("b", null, "-" + toDisplayString(unref(money)(detail.value.roundOff)), 1)
                    ])) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_56$1, [
                      _cache[29] || (_cache[29] = createBaseVNode("span", null, "应收", -1)),
                      createBaseVNode("b", null, toDisplayString(unref(money)(detail.value ? detail.value.total : 0)), 1)
                    ]),
                    detail.value && detail.value.paymentMethod === "cash" ? (openBlock(), createElementBlock("div", _hoisted_57$1, [
                      _cache[30] || (_cache[30] = createBaseVNode("span", null, "顾客给的现金", -1)),
                      createBaseVNode("b", null, toDisplayString(unref(money)(detailTendered.value)), 1)
                    ])) : createCommentVNode("", true),
                    detail.value && detail.value.change > 0 ? (openBlock(), createElementBlock("div", _hoisted_58$1, [
                      _cache[31] || (_cache[31] = createBaseVNode("span", null, "找零（退回去，不算收入）", -1)),
                      createBaseVNode("b", null, toDisplayString(unref(money)(detail.value.change)), 1)
                    ])) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_59$1, [
                      _cache[32] || (_cache[32] = createBaseVNode("span", null, "实收", -1)),
                      createBaseVNode("b", null, toDisplayString(unref(money)(detailStats.value ? detailStats.value.received : 0)), 1)
                    ])
                  ]),
                  unref(showCost) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    _cache[36] || (_cache[36] = createBaseVNode("div", { class: "block-title" }, "成本与毛利", -1)),
                    createBaseVNode("div", _hoisted_60$1, [
                      createBaseVNode("div", _hoisted_61$1, [
                        _cache[33] || (_cache[33] = createBaseVNode("span", null, "商品成本", -1)),
                        createBaseVNode("b", null, toDisplayString(unref(money)(detailStats.value ? detailStats.value.cost : 0)), 1)
                      ]),
                      createBaseVNode("div", _hoisted_62$1, [
                        _cache[34] || (_cache[34] = createBaseVNode("span", null, "毛利", -1)),
                        createBaseVNode("b", {
                          style: normalizeStyle({ color: detailStats.value && detailStats.value.profit < 0 ? "var(--clay)" : "var(--jade)" })
                        }, toDisplayString(unref(money)(detailStats.value ? detailStats.value.profit : 0)), 5)
                      ]),
                      createBaseVNode("div", _hoisted_63$1, [
                        _cache[35] || (_cache[35] = createBaseVNode("span", null, "毛利率", -1)),
                        createBaseVNode("b", {
                          style: normalizeStyle({ color: detailMargin.value < 0 ? "var(--clay)" : "" })
                        }, toDisplayString((detailMargin.value * 100).toFixed(1)) + "%", 5)
                      ])
                    ])
                  ], 64)) : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_64$1, [
                    _cache[37] || (_cache[37] = createTextVNode("商品明细 ", -1)),
                    createBaseVNode("i", null, toDisplayString(detail.value ? detail.value.items.length : 0) + " 行 · " + toDisplayString(unref(fmtQty)(detailQty.value, "件")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_65$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(detail.value ? detail.value.items : [], (l, i) => {
                      return openBlock(), createElementBlock("div", {
                        key: i,
                        class: "item-line"
                      }, [
                        createBaseVNode("span", _hoisted_66$1, toDisplayString(i + 1), 1),
                        createBaseVNode("div", _hoisted_67$1, [
                          createBaseVNode("b", null, toDisplayString(l.name), 1),
                          createBaseVNode("span", null, [
                            createTextVNode(toDisplayString(unref(money)(l.price)) + " × " + toDisplayString(unref(fmtQty)(l.qty, l.unit)), 1),
                            unref(showCost) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                              createTextVNode(" · 成本 " + toDisplayString(unref(money2)((l.cost + l.other) * l.qty)), 1)
                            ], 64)) : createCommentVNode("", true)
                          ])
                        ]),
                        createBaseVNode("b", _hoisted_68$1, toDisplayString(unref(money2)(l.price * l.qty)), 1)
                      ]);
                    }), 128))
                  ]),
                  unref(allow)("order:edit") ? (openBlock(), createElementBlock("div", _hoisted_69$1, [
                    createVNode(_component_var_button, {
                      size: "small",
                      type: "primary",
                      onClick: startEdit
                    }, {
                      default: withCtx(() => [..._cache[38] || (_cache[38] = [
                        createTextVNode("编辑商品", -1)
                      ])]),
                      _: 1
                    }),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => editReceived.value = $event),
                      class: "num-input",
                      type: "number",
                      step: "0.01",
                      style: { "flex": "1" }
                    }, null, 512), [
                      [vModelText, editReceived.value]
                    ]),
                    createVNode(_component_var_button, {
                      size: "small",
                      onClick: saveReceived
                    }, {
                      default: withCtx(() => [..._cache[39] || (_cache[39] = [
                        createTextVNode("改实收", -1)
                      ])]),
                      _: 1
                    }),
                    createVNode(_component_var_button, {
                      size: "small",
                      onClick: remove2
                    }, {
                      default: withCtx(() => [..._cache[40] || (_cache[40] = [
                        createTextVNode("删单", -1)
                      ])]),
                      _: 1
                    })
                  ])) : (openBlock(), createElementBlock("p", _hoisted_70$1, "代理不能改历史订单，需要改请联系店主。"))
                ], 64))
              ]),
              createVNode(_component_var_popup, {
                show: showProductPicker.value,
                position: "bottom",
                "onUpdate:show": _cache[5] || (_cache[5] = (v) => showProductPicker.value = v)
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_71$1, [
                    createBaseVNode("header", _hoisted_72$1, [
                      _cache[43] || (_cache[43] = createBaseVNode("div", null, [
                        createBaseVNode("b", null, "添加商品到订单")
                      ], -1)),
                      createBaseVNode("button", {
                        class: "icon-btn",
                        onClick: _cache[3] || (_cache[3] = ($event) => showProductPicker.value = false)
                      }, [
                        createVNode(_sfc_main$g, {
                          name: "close",
                          size: 18
                        })
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_73$1, [
                      createVNode(_sfc_main$g, {
                        name: "search",
                        size: 16
                      }),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => pickerKw.value = $event),
                        type: "search",
                        placeholder: "搜商品名"
                      }, null, 512), [
                        [vModelText, pickerKw.value]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_74$1, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(pickerProducts.value, (p2) => {
                        return openBlock(), createElementBlock("button", {
                          key: p2.id,
                          class: "picker-card",
                          onClick: ($event) => addProductToOrder(p2)
                        }, [
                          createVNode(_sfc_main$e, {
                            product: p2,
                            size: 48
                          }, null, 8, ["product"]),
                          createBaseVNode("div", _hoisted_76$1, [
                            createBaseVNode("b", null, toDisplayString(p2.name), 1),
                            createBaseVNode("span", null, toDisplayString(unref(money)(p2.price)) + "/" + toDisplayString(p2.unit), 1),
                            createBaseVNode("span", {
                              class: "picker-stock",
                              style: normalizeStyle({ color: p2.lowStock && unref(storeStockOf)(p2.id) <= p2.lowStock ? "var(--clay)" : "" })
                            }, " 库存 " + toDisplayString(unref(fmtQty)(unref(storeStockOf)(p2.id), p2.unit)), 5)
                          ])
                        ], 8, _hoisted_75$1);
                      }), 128))
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["show"])
            ])
          ]),
          _: 1
        }, 8, ["show"])
      ]);
    };
  }
};
const OrdersView = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-f8972840"]]);
const _hoisted_1$3 = { class: "page" };
const _hoisted_2$3 = { class: "topbar" };
const _hoisted_3$3 = { class: "sub" };
const _hoisted_4$3 = { class: "chips" };
const _hoisted_5$3 = ["data-on", "onClick"];
const _hoisted_6$3 = {
  class: "metrics-card",
  style: { "margin-top": "12px" }
};
const _hoisted_7$3 = { class: "big" };
const _hoisted_8$3 = { class: "tnum" };
const _hoisted_9$3 = { class: "mini-row" };
const _hoisted_10$3 = {
  class: "hint",
  style: { "margin-top": "8px" }
};
const _hoisted_11$3 = {
  class: "card",
  style: { "padding": "14px 12px" }
};
const _hoisted_12$3 = { class: "bars" };
const _hoisted_13$3 = { class: "bar-val" };
const _hoisted_14$2 = { class: "bar-label" };
const _hoisted_15$2 = { class: "card" };
const _hoisted_16$2 = { class: "rank-line" };
const _hoisted_17$2 = { class: "tnum" };
const _hoisted_18$2 = { class: "rank-track" };
const _hoisted_19$1 = { class: "hint" };
const _hoisted_20$1 = {
  key: 0,
  class: "empty"
};
const _hoisted_21$1 = { class: "sec-head" };
const _hoisted_22$1 = { class: "hint" };
const _hoisted_23$1 = { class: "card" };
const _hoisted_24$1 = { class: "ico" };
const _hoisted_25$1 = { class: "txt" };
const _hoisted_26$1 = { class: "right" };
const _hoisted_27$1 = {
  key: 0,
  class: "empty"
};
const _hoisted_28$1 = {
  class: "hint",
  style: { "padding": "10px 0 4px", "line-height": "1.8" }
};
const _hoisted_29$1 = { class: "card" };
const _hoisted_30$1 = { class: "ico" };
const _hoisted_31$1 = { class: "txt" };
const _hoisted_32$1 = { class: "right" };
const _hoisted_33$1 = {
  key: 0,
  class: "empty"
};
const _hoisted_34$1 = {
  key: 0,
  class: "hint",
  style: { "margin-top": "18px", "text-align": "center", "line-height": "1.9" }
};
const _sfc_main$3 = {
  __name: "StatsView",
  setup(__props) {
    const rangeKey = /* @__PURE__ */ ref("week");
    const excludeBig = /* @__PURE__ */ ref(false);
    const ranges = rangePresets();
    const current = computed(() => ranges.find((r) => r.key === rangeKey.value) || ranges[1]);
    const store = computed(() => activeStore.value);
    const scoped = computed(() => filterOrders(orders.value, {
      from: current.value.from,
      to: current.value.to,
      storeId: store.value ? store.value.id : "",
      excludeBig: excludeBig.value
    }));
    const sum = computed(() => summarize(scoped.value, productById));
    const series = computed(() => dailySeries(scoped.value, 7));
    const maxBar = computed(() => Math.sqrt(Math.max(1, ...series.value.map((b) => b.value))));
    const top = computed(() => topProducts(scoped.value, 6));
    const agentRows = computed(() => {
      const sid = store.value ? store.value.id : "";
      const mineAgents = state.collections.agents.filter((a) => !sid || a.parentStoreId === sid);
      const map = /* @__PURE__ */ new Map();
      scoped.value.forEach((o) => {
        const key = o.agentId || "__self";
        if (o.agentId && !mineAgents.some((a) => a.id === o.agentId)) return;
        const cur = map.get(key) || {
          id: key,
          name: o.agentId ? (mineAgents.find((a) => a.id === o.agentId) || {}).name || "代理" : "店主自卖",
          count: 0,
          sales: 0
        };
        cur.count++;
        cur.sales += orderStats(o, productById).received;
        map.set(key, cur);
      });
      return Array.from(map.values()).sort((a, b) => b.sales - a.sales);
    });
    const myAgentCount = computed(() => {
      const sid = store.value ? store.value.id : "";
      return state.collections.agents.filter((a) => !sid || a.parentStoreId === sid).length;
    });
    const METHOD_TEXT = { wechat: "微信", alipay: "支付宝", cash: "现金", other: "其他" };
    const methodRows = computed(() => {
      const map = /* @__PURE__ */ new Map();
      scoped.value.forEach((o) => {
        const m = o.paymentMethod || "other";
        const cur = map.get(m) || { id: m, name: METHOD_TEXT[m] || "其他", count: 0, sales: 0 };
        cur.count++;
        cur.sales += orderStats(o, productById).received;
        map.set(m, cur);
      });
      return Array.from(map.values()).sort((a, b) => b.sales - a.sales);
    });
    function pct(v, max) {
      return Math.max(4, Math.round(Math.sqrt(Math.max(0, v)) / Math.sqrt(Math.max(1, max)) * 100)) + "%";
    }
    return (_ctx, _cache) => {
      const _component_var_switch = resolveComponent("var-switch");
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$3, [
          createBaseVNode("div", null, [
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "title" }, "统计", -1)),
            createBaseVNode("div", _hoisted_3$3, toDisplayString(current.value.label) + " · " + toDisplayString(sum.value.count) + " 笔", 1)
          ]),
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "spacer" }, null, -1)),
          _cache[3] || (_cache[3] = createBaseVNode("span", { class: "hint" }, "排除大单", -1)),
          createVNode(_component_var_switch, {
            modelValue: excludeBig.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => excludeBig.value = $event),
            size: 19,
            style: { "margin-left": "6px" }
          }, null, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_4$3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(ranges), (r) => {
            return openBlock(), createElementBlock("button", {
              key: r.key,
              class: "chip",
              "data-on": rangeKey.value === r.key,
              onClick: ($event) => rangeKey.value = r.key
            }, toDisplayString(r.label), 9, _hoisted_5$3);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_6$3, [
          createBaseVNode("div", _hoisted_7$3, [
            _cache[4] || (_cache[4] = createBaseVNode("span", null, "销售额", -1)),
            createBaseVNode("b", _hoisted_8$3, toDisplayString(unref(money2)(sum.value.sales)), 1)
          ]),
          createBaseVNode("div", _hoisted_9$3, [
            createBaseVNode("div", null, [
              _cache[5] || (_cache[5] = createBaseVNode("span", null, "实收", -1)),
              createBaseVNode("b", null, toDisplayString(unref(money2)(sum.value.received)), 1)
            ]),
            unref(showCost) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createBaseVNode("div", null, [
                _cache[6] || (_cache[6] = createBaseVNode("span", null, "成本", -1)),
                createBaseVNode("b", null, toDisplayString(unref(money2)(sum.value.cost)), 1)
              ]),
              createBaseVNode("div", null, [
                _cache[7] || (_cache[7] = createBaseVNode("span", null, "毛利", -1)),
                createBaseVNode("b", {
                  style: normalizeStyle({ color: sum.value.profit < 0 ? "var(--clay)" : "var(--jade)" })
                }, toDisplayString(unref(money2)(sum.value.profit)), 5)
              ])
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", null, [
                _cache[8] || (_cache[8] = createBaseVNode("span", null, "笔数", -1)),
                createBaseVNode("b", null, toDisplayString(sum.value.count), 1)
              ]),
              createBaseVNode("div", null, [
                _cache[9] || (_cache[9] = createBaseVNode("span", null, "客单价", -1)),
                createBaseVNode("b", null, toDisplayString(unref(money2)(sum.value.count ? sum.value.sales / sum.value.count : 0)), 1)
              ])
            ], 64))
          ]),
          createBaseVNode("div", _hoisted_10$3, [
            unref(showCost) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode("毛利率 " + toDisplayString(sum.value.received ? (sum.value.profit / sum.value.received * 100).toFixed(1) : "0.0") + "% · ", 1)
            ], 64)) : createCommentVNode("", true),
            createTextVNode(" 客单价 " + toDisplayString(unref(money2)(sum.value.count ? sum.value.sales / sum.value.count : 0)) + " ", 1),
            excludeBig.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(" · 已排除 " + toDisplayString("大单"))
            ], 64)) : createCommentVNode("", true)
          ])
        ]),
        _cache[16] || (_cache[16] = createBaseVNode("div", { class: "sec-head" }, [
          createBaseVNode("h2", null, "近 7 天"),
          createBaseVNode("div", { class: "line" }),
          createBaseVNode("span", { class: "hint" }, "按日销售额")
        ], -1)),
        createBaseVNode("div", _hoisted_11$3, [
          createBaseVNode("div", _hoisted_12$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(series.value, (b) => {
              return openBlock(), createElementBlock("div", {
                key: b.key,
                class: "bar-col"
              }, [
                createBaseVNode("span", _hoisted_13$3, toDisplayString(b.value ? Math.round(b.value) : ""), 1),
                createBaseVNode("div", {
                  class: "bar",
                  style: normalizeStyle({ height: pct(b.value, maxBar.value) })
                }, null, 4),
                createBaseVNode("span", _hoisted_14$2, toDisplayString(b.label), 1)
              ]);
            }), 128))
          ])
        ]),
        _cache[17] || (_cache[17] = createBaseVNode("div", { class: "sec-head" }, [
          createBaseVNode("h2", null, "卖得最好"),
          createBaseVNode("div", { class: "line" }),
          createBaseVNode("span", { class: "hint" }, "按销售额")
        ], -1)),
        createBaseVNode("div", _hoisted_15$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(top.value.bySales, (p2) => {
            return openBlock(), createElementBlock("div", {
              key: p2.productId + p2.name,
              class: "rank-row"
            }, [
              createBaseVNode("div", _hoisted_16$2, [
                createBaseVNode("b", null, toDisplayString(p2.name), 1),
                createBaseVNode("span", _hoisted_17$2, toDisplayString(unref(money2)(p2.sales)), 1)
              ]),
              createBaseVNode("div", _hoisted_18$2, [
                createBaseVNode("div", {
                  class: "rank-fill",
                  style: normalizeStyle({ width: pct(p2.sales, top.value.bySales[0].sales) })
                }, null, 4)
              ]),
              createBaseVNode("div", _hoisted_19$1, [
                createTextVNode("卖了 " + toDisplayString(unref(fmtQty)(p2.qty, p2.unit || "")), 1),
                unref(showCost) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createTextVNode(" · 毛利 " + toDisplayString(unref(money2)(p2.profit)), 1)
                ], 64)) : createCommentVNode("", true)
              ])
            ]);
          }), 128)),
          !top.value.bySales.length ? (openBlock(), createElementBlock("div", _hoisted_20$1, [..._cache[10] || (_cache[10] = [
            createBaseVNode("b", null, "这段时间没卖出东西", -1),
            createTextVNode("换个范围，或者去开一单", -1)
          ])])) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_21$1, [
          _cache[11] || (_cache[11] = createBaseVNode("h2", null, "谁在卖", -1)),
          _cache[12] || (_cache[12] = createBaseVNode("div", { class: "line" }, null, -1)),
          createBaseVNode("span", _hoisted_22$1, toDisplayString(store.value ? store.value.name : "") + " · 本店代理 " + toDisplayString(myAgentCount.value) + " 个", 1)
        ]),
        createBaseVNode("div", _hoisted_23$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(agentRows.value, (a) => {
            return openBlock(), createElementBlock("div", {
              key: a.id,
              class: "row"
            }, [
              createBaseVNode("span", _hoisted_24$1, [
                createVNode(_sfc_main$g, {
                  name: "user",
                  size: 18
                })
              ]),
              createBaseVNode("span", _hoisted_25$1, [
                createBaseVNode("b", null, toDisplayString(a.name), 1),
                createBaseVNode("span", null, toDisplayString(a.count) + " 笔", 1)
              ]),
              createBaseVNode("span", _hoisted_26$1, [
                createBaseVNode("b", null, toDisplayString(unref(money2)(a.sales)), 1),
                createBaseVNode("span", null, toDisplayString(sum.value.received ? Math.round(a.sales / sum.value.received * 100) : 0) + "%", 1)
              ])
            ]);
          }), 128)),
          !agentRows.value.length ? (openBlock(), createElementBlock("div", _hoisted_27$1, [
            createBaseVNode("b", null, toDisplayString(myAgentCount.value ? "这段时间没有代理的单" : "这家店还没有代理"), 1),
            _cache[13] || (_cache[13] = createTextVNode(" 别家店的代理不会出现在这里 ", -1))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_28$1, " 只统计本店自己的代理：" + toDisplayString(store.value ? store.value.name : "") + "。代理是按店铺分家的，别家店的代理混进来对不上账。 ", 1)
        ]),
        _cache[18] || (_cache[18] = createBaseVNode("div", { class: "sec-head" }, [
          createBaseVNode("h2", null, "收款方式"),
          createBaseVNode("div", { class: "line" }),
          createBaseVNode("span", { class: "hint" }, "按实收统计")
        ], -1)),
        createBaseVNode("div", _hoisted_29$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(methodRows.value, (m) => {
            return openBlock(), createElementBlock("div", {
              key: m.id,
              class: "row"
            }, [
              createBaseVNode("span", _hoisted_30$1, [
                createVNode(_sfc_main$g, {
                  name: "split",
                  size: 18
                })
              ]),
              createBaseVNode("span", _hoisted_31$1, [
                createBaseVNode("b", null, toDisplayString(m.name), 1),
                createBaseVNode("span", null, toDisplayString(m.count) + " 笔", 1)
              ]),
              createBaseVNode("span", _hoisted_32$1, [
                createBaseVNode("b", null, toDisplayString(unref(money2)(m.sales)), 1),
                createBaseVNode("span", null, toDisplayString(sum.value.received ? Math.round(m.sales / sum.value.received * 100) : 0) + "%", 1)
              ])
            ]);
          }), 128)),
          !methodRows.value.length ? (openBlock(), createElementBlock("div", _hoisted_33$1, [..._cache[14] || (_cache[14] = [
            createBaseVNode("b", null, "还没有收款记录", -1)
          ])])) : createCommentVNode("", true)
        ]),
        unref(showCost) ? (openBlock(), createElementBlock("p", _hoisted_34$1, [..._cache[15] || (_cache[15] = [
          createTextVNode(" 成本包含商品成本与其他成本；成本没填的商品会让毛利偏高，", -1),
          createBaseVNode("br", null, null, -1),
          createTextVNode("回商品页补一下更准。 ", -1)
        ])])) : createCommentVNode("", true)
      ]);
    };
  }
};
const StatsView = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-301de663"]]);
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
const LZString = /* @__PURE__ */ getDefaultExportFromCjs(lzStringExports);
const _hoisted_1$2 = { class: "sheet" };
const _hoisted_2$2 = { class: "sheet-head" };
const _hoisted_3$2 = { class: "sheet-body" };
const _hoisted_4$2 = {
  key: 0,
  class: "banner"
};
const _hoisted_5$2 = { class: "row-2" };
const _hoisted_6$2 = { class: "sec-head" };
const _hoisted_7$2 = { class: "hint" };
const _hoisted_8$2 = { class: "card" };
const _hoisted_9$2 = { class: "ico" };
const _hoisted_10$2 = { class: "txt" };
const _hoisted_11$2 = ["onClick"];
const _hoisted_12$2 = { style: { "display": "flex", "gap": "6px", "margin-top": "8px", "flex-wrap": "wrap" } };
const _hoisted_13$2 = ["onClick"];
const _hoisted_14$1 = ["onClick"];
const _hoisted_15$1 = ["onClick"];
const _hoisted_16$1 = ["onClick"];
const _hoisted_17$1 = {
  key: 0,
  class: "empty"
};
const _hoisted_18$1 = {
  class: "banner jade",
  style: { "margin-top": "16px" }
};
const _sfc_main$2 = {
  __name: "AgentSheet",
  props: { show: Boolean },
  emits: ["update:show"],
  setup(__props, { emit: __emit }) {
    const emit2 = __emit;
    const form = /* @__PURE__ */ ref({ name: "", ownerName: "" });
    const list = computed(() => {
      const sid = activeStore.value ? activeStore.value.id : "";
      return agents.value.filter((a) => !sid || a.parentStoreId === sid).map((a) => ({
        a,
        storeName: (state.collections.stores.find((s) => s.id === a.parentStoreId) || {}).name || ""
      }));
    });
    function create() {
      if (!form.value.name.trim()) {
        tip("代理名称不能空");
        return;
      }
      const a = createAgent({ name: form.value.name, ownerName: form.value.ownerName, parentStoreId: activeStore.value && activeStore.value.id });
      if (a) {
        tip("已生成代理「" + a.name + "」，接着下载它的 HTML");
        form.value = { name: "", ownerName: "" };
      }
    }
    function linksOf(agent) {
      return agentLinks(agent.id) || { plain: "", data: "", size: 0 };
    }
    function copyLink(agent, withData) {
      const l = linksOf(agent);
      const text = l.plain;
      if (!text) {
        tip("链接生成失败");
        return;
      }
      const done = () => tip("代理链接已复制，发给他就能打开");
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => {
        window.prompt("复制下面的链接", text);
      });
      else window.prompt("复制下面的链接", text);
    }
    function downloadBoot(agent) {
      const file = agentBootFile(agent.id);
      if (!file) {
        tip("生成失败：先确认代理还在");
        return;
      }
      const ok = downloadText(file.fileName, file.html, "text/html");
      tip(ok ? "入口文件已下载，发给代理，用浏览器打开即可（数据会自动写进他的浏览器）" : "下载被浏览器拦住了，换个浏览器再试");
    }
    function downloadPack(agent) {
      const pack = exportAgentPack(agent.id);
      if (!pack) {
        tip("导出失败");
        return;
      }
      const d = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const ok = downloadText("代理店铺-" + agent.code + "-" + d + ".json", JSON.stringify(pack), "application/json");
      tip(ok ? "代理店铺包已下载，发给代理，在他的「我的 → 导入店铺数据包」里选这个文件" : "下载被浏览器拦住了");
    }
    function copy(text) {
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => tip("已复制"), () => tip("复制失败"));
      else tip(text);
    }
    return (_ctx, _cache) => {
      const _component_var_button = resolveComponent("var-button");
      const _component_var_popup = resolveComponent("var-popup");
      return openBlock(), createBlock(_component_var_popup, {
        show: __props.show,
        position: "bottom",
        "onUpdate:show": _cache[3] || (_cache[3] = (v) => emit2("update:show", v))
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$2, [
            createBaseVNode("header", _hoisted_2$2, [
              _cache[4] || (_cache[4] = createBaseVNode("div", null, [
                createBaseVNode("b", null, "代理代卖点"),
                createBaseVNode("div", { class: "hint" }, "同一套数据的另一台终端，只能卖、不能改货")
              ], -1)),
              createBaseVNode("button", {
                class: "icon-btn",
                "aria-label": "关闭",
                onClick: _cache[0] || (_cache[0] = ($event) => emit2("update:show", false))
              }, [
                createVNode(_sfc_main$g, {
                  name: "close",
                  size: 18
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_3$2, [
              unref(isAgent) ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
                createVNode(_sfc_main$g, {
                  name: "alert",
                  size: 16
                }),
                _cache[5] || (_cache[5] = createTextVNode("你正处在代理模式，代理名单只有店主能改。 ", -1))
              ])) : createCommentVNode("", true),
              unref(allow)("agent:write") ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                _cache[7] || (_cache[7] = createBaseVNode("div", { class: "field-label" }, "新建一个代卖点", -1)),
                createBaseVNode("div", _hoisted_5$2, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.value.name = $event),
                    class: "inp",
                    placeholder: "代理名，如 小刘夜市摊"
                  }, null, 512), [
                    [vModelText, form.value.name]
                  ]),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.value.ownerName = $event),
                    class: "inp",
                    placeholder: "对方称呼（可选）"
                  }, null, 512), [
                    [vModelText, form.value.ownerName]
                  ])
                ]),
                createVNode(_component_var_button, {
                  type: "primary",
                  size: "normal",
                  block: "",
                  style: { "margin-top": "10px" },
                  onClick: create
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$g, {
                      name: "plus",
                      size: 16
                    }),
                    _cache[6] || (_cache[6] = createTextVNode(" 建代理", -1))
                  ]),
                  _: 1
                })
              ], 64)) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_6$2, [
                _cache[8] || (_cache[8] = createBaseVNode("h2", null, "已有代理", -1)),
                _cache[9] || (_cache[9] = createBaseVNode("div", { class: "line" }, null, -1)),
                createBaseVNode("span", _hoisted_7$2, toDisplayString(unref(activeStore) ? unref(activeStore).name : "") + " · " + toDisplayString(list.value.length) + " 个", 1)
              ]),
              createBaseVNode("div", _hoisted_8$2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (x) => {
                  return openBlock(), createElementBlock("div", {
                    key: x.a.id,
                    class: "row",
                    style: { "align-items": "flex-start" }
                  }, [
                    createBaseVNode("span", _hoisted_9$2, [
                      createVNode(_sfc_main$g, {
                        name: "user",
                        size: 18
                      })
                    ]),
                    createBaseVNode("span", _hoisted_10$2, [
                      createBaseVNode("b", null, toDisplayString(x.a.name), 1),
                      createBaseVNode("span", null, [
                        createTextVNode("供货店：" + toDisplayString(x.storeName) + " · 编号 ", 1),
                        createBaseVNode("b", {
                          class: "mono",
                          onClick: ($event) => copy(x.a.code)
                        }, toDisplayString(x.a.code), 9, _hoisted_11$2)
                      ]),
                      createBaseVNode("div", _hoisted_12$2, [
                        createBaseVNode("button", {
                          class: "chip",
                          "data-on": true,
                          onClick: ($event) => copyLink(x.a, false)
                        }, [
                          createVNode(_sfc_main$g, {
                            name: "link",
                            size: 13
                          }),
                          _cache[10] || (_cache[10] = createTextVNode(" 复制代理链接 ", -1))
                        ], 8, _hoisted_13$2),
                        createBaseVNode("button", {
                          class: "chip",
                          "data-on": true,
                          onClick: ($event) => downloadBoot(x.a)
                        }, [
                          createVNode(_sfc_main$g, {
                            name: "download",
                            size: 13
                          }),
                          _cache[11] || (_cache[11] = createTextVNode(" 下载入口 HTML ", -1))
                        ], 8, _hoisted_14$1),
                        createBaseVNode("button", {
                          class: "chip",
                          onClick: ($event) => downloadPack(x.a)
                        }, [
                          createVNode(_sfc_main$g, {
                            name: "download",
                            size: 13
                          }),
                          _cache[12] || (_cache[12] = createTextVNode(" 数据包 ", -1))
                        ], 8, _hoisted_15$1),
                        createBaseVNode("button", {
                          class: "chip",
                          onClick: ($event) => copy(x.a.code)
                        }, "复制编号", 8, _hoisted_16$1)
                      ])
                    ])
                  ]);
                }), 128)),
                !list.value.length ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
                  _cache[13] || (_cache[13] = createBaseVNode("b", null, "这家店还没有代理", -1)),
                  createTextVNode(toDisplayString(unref(activeStore) ? unref(activeStore).name : "") + " 名下没有代卖点；别的店的代理不会列在这里 ", 1)
                ])) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_18$1, [
                createVNode(_sfc_main$g, {
                  name: "link",
                  size: 16
                }),
                _cache[14] || (_cache[14] = createBaseVNode("span", null, [
                  createTextVNode("代理端是站点里的一个页面 "),
                  createBaseVNode("b", null, "agent.html"),
                  createTextVNode("。同设备直接发链接；换手机就发那个入口 HTML。")
                ], -1))
              ]),
              _cache[15] || (_cache[15] = createBaseVNode("p", {
                class: "hint",
                style: { "margin-top": "10px", "line-height": "1.9" }
              }, [
                createTextVNode(" · "),
                createBaseVNode("b", null, "复制代理链接"),
                createTextVNode("：同一台设备/同一浏览器打开，两边读写同一份数据（代理卖一件，你这边库存就少一件）。"),
                createBaseVNode("br"),
                createTextVNode(" · "),
                createBaseVNode("b", null, "下载入口 HTML"),
                createTextVNode("：给"),
                createBaseVNode("b", null, "另一台手机"),
                createTextVNode("用。文件里内嵌整份数据，对方用浏览器打开时，页面会通过 iframe 把数据写进他浏览器里的站点存储，然后自动跳到代理页面——不用手动导入。"),
                createBaseVNode("br"),
                createTextVNode(" · "),
                createBaseVNode("b", null, "代理店铺包 .json"),
                createTextVNode("：只带这家店（店铺 + 挂载仓库 + 商品 + 订单），不含你的头像/主题设置。代理在他自己的「我的 → 导入店铺数据包」里选这个文件，就能接入这家店；本机已经有这家店时会直接更新，没有就多一家「共管店铺」。"),
                createBaseVNode("br"),
                createTextVNode(" · 代理端和你看的是同一套界面（收银/商品/订单/统计/我的），只是"),
                createBaseVNode("b", null, "成本、毛利、货值不显示"),
                createTextVNode("；"),
                createBaseVNode("br"),
                createTextVNode(" · 代理的单据会在他的订单页和操作日志里；要回流给你，让他在「我的 → 导出这家店」发回来，你导入同一家店就是一次数据更新。 ")
              ], -1))
            ])
          ])
        ]),
        _: 1
      }, 8, ["show"]);
    };
  }
};
const AgentSheet = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-aac5d790"]]);
const _hoisted_1$1 = { class: "page me" };
const _hoisted_2$1 = { class: "topbar" };
const _hoisted_3$1 = { class: "sub" };
const _hoisted_4$1 = { class: "card hero" };
const _hoisted_5$1 = { class: "hero-top" };
const _hoisted_6$1 = ["src"];
const _hoisted_7$1 = { style: { "flex": "1", "min-width": "0" } };
const _hoisted_8$1 = ["value"];
const _hoisted_9$1 = { class: "hero-sub" };
const _hoisted_10$1 = { class: "hero-store" };
const _hoisted_11$1 = { class: "hero-stats" };
const _hoisted_12$1 = { class: "mono" };
const _hoisted_13$1 = { class: "quick" };
const _hoisted_14 = { class: "q-label" };
const _hoisted_15 = { class: "fh-l" };
const _hoisted_16 = { class: "fh-r" };
const _hoisted_17 = {
  key: 0,
  class: "fold-body"
};
const _hoisted_18 = ["onClick"];
const _hoisted_19 = { class: "ico" };
const _hoisted_20 = { class: "txt" };
const _hoisted_21 = {
  key: 0,
  class: "store-tag agent"
};
const _hoisted_22 = {
  key: 1,
  class: "store-tag"
};
const _hoisted_23 = { class: "row-tail" };
const _hoisted_24 = {
  key: 0,
  class: "using sm"
};
const _hoisted_25 = {
  key: 1,
  class: "hint"
};
const _hoisted_26 = ["onClick"];
const _hoisted_27 = {
  key: 3,
  class: "hint"
};
const _hoisted_28 = ["onClick"];
const _hoisted_29 = {
  key: 0,
  style: { "display": "flex", "gap": "8px", "margin-top": "10px" }
};
const _hoisted_30 = { class: "id-meta" };
const _hoisted_31 = { class: "hint" };
const _hoisted_32 = { class: "row-tail" };
const _hoisted_33 = {
  key: 0,
  class: "using sm"
};
const _hoisted_34 = ["onClick"];
const _hoisted_35 = ["onClick"];
const _hoisted_36 = { class: "fh-l" };
const _hoisted_37 = { class: "fh-r" };
const _hoisted_38 = {
  key: 0,
  class: "fold-body"
};
const _hoisted_39 = {
  key: 0,
  class: "banner",
  style: { "margin": "0 0 10px" }
};
const _hoisted_40 = { class: "ico" };
const _hoisted_41 = {
  class: "row",
  style: { "cursor": "pointer" }
};
const _hoisted_42 = {
  class: "ico",
  style: { "background": "var(--jade-soft)", "color": "var(--jade)" }
};
const _hoisted_43 = { class: "txt" };
const _hoisted_44 = {
  class: "hint",
  style: { "padding": "0 2px 10px" }
};
const _hoisted_45 = { class: "mono" };
const _hoisted_46 = { key: 0 };
const _hoisted_47 = { class: "mini-head" };
const _hoisted_48 = { class: "ico" };
const _hoisted_49 = {
  class: "row",
  style: { "cursor": "pointer" }
};
const _hoisted_50 = {
  class: "ico",
  style: { "background": "var(--jade-soft)", "color": "var(--jade)" }
};
const _hoisted_51 = { class: "txt" };
const _hoisted_52 = { class: "ico" };
const _hoisted_53 = {
  class: "row",
  style: { "cursor": "pointer" }
};
const _hoisted_54 = { class: "ico" };
const _hoisted_55 = { class: "txt" };
const _hoisted_56 = {
  key: 1,
  class: "banner jade",
  style: { "margin": "10px 0 0" }
};
const _hoisted_57 = { class: "fh-l" };
const _hoisted_58 = { class: "fh-r" };
const _hoisted_59 = {
  key: 0,
  class: "fold-body"
};
const _hoisted_60 = { class: "kv-row" };
const _hoisted_61 = { class: "kv-row" };
const _hoisted_62 = {
  class: "kv-row",
  style: { "border-bottom": "0" }
};
const _hoisted_63 = { class: "chips" };
const _hoisted_64 = ["data-on", "onClick"];
const _hoisted_65 = ["value"];
const _hoisted_66 = ["value"];
const _hoisted_67 = { class: "fh-l" };
const _hoisted_68 = { class: "fh-r" };
const _hoisted_69 = {
  key: 0,
  class: "fold-body"
};
const _hoisted_70 = { class: "chips" };
const _hoisted_71 = ["data-on", "onClick"];
const _hoisted_72 = {
  class: "kv-row",
  style: { "margin-top": "8px" }
};
const _hoisted_73 = { class: "chips" };
const _hoisted_74 = ["data-on", "onClick"];
const _hoisted_75 = { class: "fh-l" };
const _hoisted_76 = { class: "fh-r" };
const _hoisted_77 = {
  key: 0,
  class: "fold-body"
};
const _hoisted_78 = { class: "kv-row" };
const _hoisted_79 = { class: "kv-row" };
const _hoisted_80 = {
  class: "hint",
  style: { "margin-left": "4px" }
};
const _hoisted_81 = { class: "kv-row" };
const _hoisted_82 = {
  class: "hint",
  style: { "margin-left": "4px" }
};
const _hoisted_83 = { class: "kv-row" };
const _hoisted_84 = { class: "mono" };
const _hoisted_85 = {
  class: "kv-row",
  style: { "border-bottom": "0" }
};
const _hoisted_86 = {
  key: 0,
  class: "hint",
  style: { "color": "var(--clay)", "margin-top": "6px" }
};
const _hoisted_87 = {
  class: "chips",
  style: { "margin-top": "10px" }
};
const _hoisted_88 = { class: "chips" };
const _hoisted_89 = { class: "lt" };
const _hoisted_90 = { class: "lb" };
const _hoisted_91 = { class: "lx" };
const _hoisted_92 = { class: "lwho" };
const _hoisted_93 = {
  key: 1,
  class: "hint",
  style: { "padding": "10px 0" }
};
const _hoisted_94 = { class: "fh-l" };
const _hoisted_95 = { class: "fh-r" };
const _hoisted_96 = {
  key: 0,
  class: "fold-body"
};
const _hoisted_97 = { class: "sheet" };
const _hoisted_98 = { class: "sheet-head" };
const _hoisted_99 = { class: "sheet-body" };
const _hoisted_100 = { class: "lt" };
const _hoisted_101 = { class: "lb" };
const _hoisted_102 = { class: "lx" };
const _hoisted_103 = { class: "lwho" };
const _hoisted_104 = {
  key: 0,
  class: "empty"
};
const _hoisted_105 = { class: "sheet avatar-sheet" };
const _hoisted_106 = { class: "sheet-head" };
const _hoisted_107 = { class: "sheet-body" };
const _hoisted_108 = { class: "avatar-preview" };
const _hoisted_109 = ["src"];
const _hoisted_110 = {
  class: "q-btn jade",
  style: { "width": "100%", "margin-top": "12px", "cursor": "pointer" }
};
const _hoisted_111 = {
  class: "row-2",
  style: { "display": "grid", "grid-template-columns": "1fr auto", "gap": "8px" }
};
const _hoisted_112 = { class: "menu-sheet" };
const _hoisted_113 = { class: "menu-head" };
const _hoisted_114 = { class: "hint" };
const _hoisted_115 = ["onClick"];
const _hoisted_116 = { class: "menu-txt" };
const _sfc_main$1 = {
  __name: "MeView",
  setup(__props) {
    const agentOpen = /* @__PURE__ */ ref(false);
    const sec = /* @__PURE__ */ ref({ stores: false, data: false, cash: false, look: false, local: false, help: false });
    function toggle(k) {
      sec.value[k] = !sec.value[k];
    }
    const menu = /* @__PURE__ */ ref({ show: false, title: "", sub: "", items: [] });
    function openMenu(title, sub, items) {
      menu.value = { show: true, title, sub, items };
    }
    function runMenu(item) {
      menu.value.show = false;
      setTimeout(() => {
        item.run();
      }, 80);
    }
    function storeOps(st) {
      const items = [];
      if (!(store.value && store.value.id === st.id) && !st.asAgent && allow("store:write")) {
        items.push({ label: "切换到这个店铺", desc: "把收银、商品、订单都切到这家店", run: () => pickStore(st) });
      }
      if (st.mine === false && !st.asAgent && allow("store:write")) {
        items.push({ label: "退出共管", danger: true, desc: "这家店和它的数据会从本机删掉，像没来过一样", run: () => quitStore(st) });
      }
      if (st.mine && !st.asAgent && allow("store:write") && stores.value.length > 1) {
        items.push({ label: "删除店铺", danger: true, desc: "先把店内货物退回挂载仓库，再删掉这家店", run: () => delStore(st) });
      }
      return items;
    }
    function openStoreMenu(st) {
      const items = storeOps(st);
      if (!items.length) {
        tip("这家店没有可操作的项");
        return;
      }
      openMenu(st.name, st.asAgent ? "代理店铺 · 只读" : st.mine === false ? "共管店铺" : "自己建的店铺", items);
    }
    function openIdentityMenu(it) {
      const items = [];
      if (it.kind === "agent") {
        items.push({ label: "退出代理", danger: true, desc: "删掉这个代理身份和它代卖的店，只保留自己的店", run: () => quitAgent(it) });
      }
      if (currentIdentity.value !== it.id) {
        items.unshift({ label: "切换到这个身份", desc: "店主看全部；代理只读、不显示成本与毛利", run: () => useIdentity(it.id) });
      }
      if (!items.length) {
        tip("没有可操作的项");
        return;
      }
      openMenu(it.name, it.sub, items);
    }
    const avatarOpen = /* @__PURE__ */ ref(false);
    const avatarUrl = /* @__PURE__ */ ref("");
    const usage = /* @__PURE__ */ ref(null);
    const newStoreName = /* @__PURE__ */ ref("");
    const report = /* @__PURE__ */ ref("");
    const importing = /* @__PURE__ */ ref(false);
    const inWeChat = /MicroMessenger/i.test(navigator.userAgent || "");
    const store = computed(() => activeStore.value);
    const logOpen = /* @__PURE__ */ ref(false);
    const scopedLogs = computed(() => {
      const sid = store.value ? store.value.id : "";
      return logs.value.filter((l) => !l.storeId || l.storeId === sid);
    });
    const recentLogs = computed(() => scopedLogs.value.slice(0, 6));
    function whName(id) {
      const w = state.collections.warehouses.find((x) => x.id === id);
      return w ? w.name : "";
    }
    function logWhere(l) {
      const parts = [];
      if (l.warehouseId) parts.push(whName(l.warehouseId) || "仓库");
      if (l.operatorRole === "agent") parts.push("代卖");
      return parts.join(" · ");
    }
    const TYPE_TEXT = {
      product: "商品",
      stock: "库存",
      warehouse: "仓库",
      store: "店铺",
      agent: "代理",
      settle: "结算",
      hold: "挂单",
      edit: "改单",
      split: "拆卷",
      import: "导入",
      sync: "同步",
      system: "系统"
    };
    const typeText = (t2) => TYPE_TEXT[t2] || "操作";
    const deviceId = computed(() => state.meta.deviceId || "—");
    function saveAvatar(v) {
      setSetting("avatar", v || "");
      avatarOpen.value = false;
      tip(v ? "头像已更新" : "已恢复默认头像");
    }
    function pickAvatar(e) {
      const f = e.target.files && e.target.files[0];
      e.target.value = "";
      if (!f) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const size = 128;
          const scale = Math.min(1, size / Math.max(img.width, img.height));
          const cv = document.createElement("canvas");
          cv.width = Math.round(img.width * scale);
          cv.height = Math.round(img.height * scale);
          cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
          saveAvatar(cv.toDataURL("image/jpeg", 0.8));
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(f);
    }
    function useAvatarUrl() {
      const v = avatarUrl.value.trim();
      if (!v) {
        tip("先贴一个图片链接");
        return;
      }
      if (!/^(https?:\/\/|data:image\/)/i.test(v)) {
        tip("链接要以 http(s):// 开头");
        return;
      }
      saveAvatar(v);
    }
    function fmtBytes(n2) {
      if (n2 == null) return "—";
      if (n2 < 1024) return n2 + " B";
      if (n2 < 1024 * 1024) return (n2 / 1024).toFixed(1) + " KB";
      if (n2 < 1024 * 1024 * 1024) return (n2 / 1024 / 1024).toFixed(1) + " MB";
      return (n2 / 1024 / 1024 / 1024).toFixed(2) + " GB";
    }
    async function loadUsage() {
      try {
        usage.value = await storageUsage();
      } catch (e) {
        usage.value = null;
      }
    }
    onMounted(loadUsage);
    function useIdentity(id) {
      switchIdentity(id);
    }
    function pickStore(s) {
      if (s.asAgent) {
        const agent = state.collections.agents.find((a) => a.id === s.ownerAgentId) || state.collections.agents.find((a) => a.parentStoreId === s.id);
        if (!agent) {
          tip("这家代理店铺的代理身份已经不在了", "error");
          return;
        }
        switchIdentity(agent.id);
        tip("已切到代理「" + (agent.name || agent.code) + "」");
        return;
      }
      if (!allow("store:write")) return;
      switchStore(s.id);
    }
    async function dropDemo() {
      const answer = await stdin_default$2({
        title: "去掉示例数据？",
        message: "示例里的商品、分类、库存、订单、挂单、日志、代理、仓库都会清掉，只留一家空白店铺「" + (state.settings.shopName || "我的小摊") + "」。头像、主题、字号、语音设置保留。清完想反悔可以点下面的「恢复示例数据」。",
        confirmButton: true,
        cancelButton: true,
        confirmButtonText: "清空示例数据",
        cancelButtonText: "算了"
      });
      if (answer !== "confirm") return;
      await clearDemoData();
      tip("示例数据已清空，可以开始录自己的货了");
    }
    async function quitStore(st) {
      const answer = await stdin_default$2({
        title: "退出「" + st.name + "」？",
        message: "这家店在本机的商品、库存、订单、挂单、日志会全部删掉，等于没接入过。别的店还在用的仓库不会被删。要先备份就先「导出这家店」。",
        confirmButton: true,
        cancelButton: true,
        confirmButtonText: "退出并清掉",
        cancelButtonText: "再想想"
      });
      if (answer !== "confirm") return;
      const ok = await leaveSharedStore(st.id);
      if (ok) report.value = "";
    }
    async function delStore(st) {
      if (st.mine === false) {
        tip("共管店铺只能用「退出」");
        return;
      }
      const pv = storeDeletePreview(st.id);
      if (!pv) {
        tip("找不到这家店");
        return;
      }
      if (pv.moveLines && !pv.warehouses.length) {
        await stdin_default$2({ title: "这家店没挂仓库", message: "店里还有 " + pv.moveLines + " 款货（成本货值 ¥" + pv.moveValue.toFixed(2) + "），没地方退。先去仓库页给它挂一个仓，把货退回去再删。", confirmButtonText: "知道了" });
        return;
      }
      const answer = await stdin_default$2({
        title: "删除「" + pv.name + "」？",
        message: "删除前先把店里 " + pv.moveLines + " 款货（货值 ¥" + pv.moveValue.toFixed(2) + "）退回" + (pv.warehouses.length ? "「" + pv.warehouses.join("、") + "」" : "（没有可退的仓）") + "，退仓会记一条库存流水和日志。\n然后会删掉这家店的 " + pv.products + " 个商品、" + pv.orders + " 笔订单" + (pv.holds ? "、" + pv.holds + " 张挂单" : "") + (pv.agents ? "、" + pv.agents + " 个代理" : "") + " 和它的日志。想留个底就先「导出这家店」。",
        confirmButton: true,
        cancelButton: true,
        confirmButtonText: "退仓并删除",
        cancelButtonText: "再想想"
      });
      if (answer !== "confirm") return;
      const r = await deleteStore(st.id);
      if (r && r.ok) report.value = "";
    }
    async function quitAgent(it) {
      const answer = await stdin_default$2({
        title: "退出代理「" + it.name + "」？",
        message: "会卸掉这个代理身份。如果这家店本来就是代理包导进来的，店和它的商品、订单也会一起清掉；你自己的店不受影响。",
        confirmButton: true,
        cancelButton: true,
        confirmButtonText: "退出代理",
        cancelButtonText: "再想想"
      });
      if (answer !== "confirm") return;
      const ok = await leaveAgent(it.id);
      if (ok) report.value = "";
    }
    async function wipe(kind) {
      const answer = await stdin_default$2({
        title: "清空这台设备的全部数据？",
        message: "IndexedDB 里的账本和 localStorage 里的本地键（含当前身份记忆）一起删掉，其他设备不受影响。清空后页面自动重开，回到初始示例账本。要留住数据就先「导出全部数据」。",
        confirmButton: true,
        cancelButton: true,
        confirmButtonText: "清空",
        cancelButtonText: "算了"
      });
      if (answer !== "confirm") return;
      const ok = await clearStoreData();
      if (!ok) {
        tip("清空失败：可能还有别的标签页占着这个库");
        return;
      }
      tip("已清空全部数据，正在重开");
      setTimeout(() => location.reload(), 700);
    }
    function themeColor(k) {
      setSetting("themeColor", k);
    }
    function toggleDark(v) {
      setSetting("dark", !!v);
    }
    function setFont(k) {
      setSetting("fontScale", k);
    }
    function setName(e) {
      setSetting("shopName", e.target.value);
    }
    function addStore() {
      if (!newStoreName.value.trim()) {
        tip("写个店名");
        return;
      }
      const st = saveStore({ name: newStoreName.value, warehouseIds: [] });
      if (st) {
        newStoreName.value = "";
        tip("已建店并切换过去");
      }
    }
    function packJSON() {
      return JSON.stringify(exportBundle());
    }
    function doExport() {
      exportBundle();
      const name2 = "摆摊数据-" + (store.value ? store.value.name : "shop") + "-" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".json";
      if (downloadText(name2, packJSON(), "application/json;charset=utf-8")) {
        tip("已导出 .json（" + state.collections.orders.length + " 笔订单，" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + "）");
      } else {
        tip("这个浏览器不让下载，请在浏览器里打开本页", "error");
      }
    }
    function doExportStore() {
      if (!store.value) {
        tip("先建一家店铺");
        return;
      }
      const pack = exportStorePack(store.value.id);
      if (!pack) {
        tip("导出失败：这家店的数据读不出来", "error");
        return;
      }
      const d = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const name2 = "店铺-" + store.value.name + "-" + d + ".json";
      const c = pack.collections;
      if (downloadText(name2, JSON.stringify(pack), "application/json;charset=utf-8")) {
        tip("店铺包已导出：" + c.products.length + " 商品 / " + c.orders.length + " 订单 / " + c.warehouses.length + " 仓库");
      } else {
        tip("这个浏览器不让下载，请在浏览器里打开本页", "error");
      }
    }
    async function onImportStore(e) {
      const f = e.target.files && e.target.files[0];
      e.target.value = "";
      if (!f) return;
      importing.value = true;
      try {
        const text = await f.text();
        const pack = parsePack(text);
        const r = await importStorePack(pack);
        report.value = r || "";
        tip("店铺数据已接入");
      } catch (err) {
        tip("导入失败：" + (err && err.message ? err.message : "文件格式不对"), "error");
      } finally {
        importing.value = false;
      }
    }
    const syncing = /* @__PURE__ */ ref(false);
    function doExportSync() {
      const pack = exportSyncPack();
      const dev = state.meta.deviceId || "device";
      const name2 = "摆摊同步-" + dev + "-" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".json";
      if (downloadText(name2, JSON.stringify(pack), "application/json;charset=utf-8")) {
        const c = pack.sync.counts;
        tip("同步包已导出：" + c.products + " 商品 / " + c.orders + " 订单，拿到另一台导入");
      } else {
        tip("这个浏览器不让下载，请在浏览器里打开本页", "error");
      }
    }
    async function onImportSync(e) {
      const f = e.target.files && e.target.files[0];
      e.target.value = "";
      if (!f) return;
      const answer = await stdin_default$2({
        title: "覆盖本机数据？",
        message: "同步包会整个替换本机的商品、库存、订单、店铺和代理，本机现有数据不作保留。建议先「导出全部数据」备份一份。",
        confirmButton: true,
        cancelButton: true,
        confirmButtonText: "覆盖导入",
        cancelButtonText: "取消"
      });
      if (answer !== "confirm") return;
      syncing.value = true;
      try {
        const text = await f.text();
        const pack = parsePack(text);
        const r = await importSyncPack(pack);
        report.value = r || "";
        tip("设备同步完成");
      } catch (err) {
        tip("同步失败：" + (err && err.message ? err.message : "文件格式不对"), "error");
      } finally {
        syncing.value = false;
      }
    }
    const lastSyncText = computed(() => {
      const t2 = state.meta.lastSyncAt || 0;
      if (!t2) return "还没同步过";
      const d = new Date(t2);
      const pad = (n2) => String(n2).padStart(2, "0");
      return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
    });
    function parsePack(raw) {
      let t2 = String(raw || "").replace(/^\uFEFF/, "").trim();
      if (!t2) throw new Error("内容是空的");
      if (/^PACK1:/i.test(t2)) {
        const body = t2.slice(6).replace(/\s+/g, "");
        const plain = LZString.decompressFromBase64(body);
        if (!plain) throw new Error("压缩包不完整（可能被截断了），重新导出一次");
        return JSON.parse(plain);
      }
      try {
        return JSON.parse(t2);
      } catch (e) {
      }
      const a = t2.indexOf("{");
      const b = t2.lastIndexOf("}");
      if (a >= 0 && b > a) return JSON.parse(t2.slice(a, b + 1));
      throw new Error("这不是本程序导出的数据包（找不到 JSON）");
    }
    async function onImport(e) {
      const f = e.target.files && e.target.files[0];
      e.target.value = "";
      if (!f) return;
      importing.value = true;
      try {
        const text = await f.text();
        const pack = parsePack(text);
        const r = await importBundle(pack);
        report.value = r ? r : "";
        tip("合并完成");
      } catch (err) {
        tip("导入失败：" + (err && err.message ? err.message : "文件格式不对"));
      } finally {
        importing.value = false;
      }
    }
    async function reset() {
      const answer = await stdin_default$2({
        title: "恢复示例数据？",
        message: "会用示例账本覆盖本机当前数据（商品、订单、库存、分类、仓库、日志），头像和主题设置保留。要先备份就点上面的「导出全部数据」。",
        confirmButton: true,
        cancelButton: true,
        confirmButtonText: "恢复示例",
        cancelButtonText: "算了"
      });
      if (answer !== "confirm") return;
      await resetDemo();
      tip("已恢复示例数据");
    }
    return (_ctx, _cache) => {
      const _component_var_button = resolveComponent("var-button");
      const _component_var_switch = resolveComponent("var-switch");
      const _component_var_popup = resolveComponent("var-popup");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", null, [
            _cache[27] || (_cache[27] = createBaseVNode("div", { class: "title" }, "我的", -1)),
            createBaseVNode("div", _hoisted_3$1, toDisplayString(unref(isAgent) ? "代理 · " + (unref(agentProfile) ? unref(agentProfile).name : "") : "店主"), 1)
          ]),
          createBaseVNode("button", {
            class: "icon-btn",
            "aria-label": "操作日志",
            onClick: _cache[0] || (_cache[0] = ($event) => logOpen.value = true)
          }, [
            createVNode(_sfc_main$g, {
              name: "list",
              size: 18
            })
          ])
        ]),
        createBaseVNode("div", _hoisted_4$1, [
          createBaseVNode("div", _hoisted_5$1, [
            createBaseVNode("button", {
              class: "thumb avatar-btn",
              style: { width: "52px", height: "52px" },
              "aria-label": "更换头像",
              onClick: _cache[1] || (_cache[1] = ($event) => avatarOpen.value = true)
            }, [
              unref(state).settings.avatar ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: unref(state).settings.avatar,
                alt: "头像"
              }, null, 8, _hoisted_6$1)) : (openBlock(), createBlock(_sfc_main$g, {
                key: 1,
                name: "user",
                size: 24
              }))
            ]),
            createBaseVNode("div", _hoisted_7$1, [
              createBaseVNode("input", {
                class: "name-input",
                value: unref(state).settings.shopName,
                onChange: setName
              }, null, 40, _hoisted_8$1),
              createBaseVNode("div", _hoisted_9$1, [
                createBaseVNode("span", {
                  class: normalizeClass(["pill", unref(isAgent) ? "agent" : "owner"])
                }, toDisplayString(unref(isAgent) ? "代理身份" : "店主身份"), 3),
                createBaseVNode("span", _hoisted_10$1, toDisplayString(store.value ? store.value.name : "未选店铺"), 1)
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_11$1, [
            createBaseVNode("span", null, [
              createBaseVNode("b", null, toDisplayString(unref(state).collections.products.length), 1),
              _cache[28] || (_cache[28] = createTextVNode(" 商品", -1))
            ]),
            createBaseVNode("span", null, [
              createBaseVNode("b", null, toDisplayString(unref(state).collections.orders.length), 1),
              _cache[29] || (_cache[29] = createTextVNode(" 订单", -1))
            ]),
            createBaseVNode("span", null, [
              createBaseVNode("b", null, toDisplayString(unref(stores).length), 1),
              _cache[30] || (_cache[30] = createTextVNode(" 家店", -1))
            ]),
            createBaseVNode("span", _hoisted_12$1, toDisplayString(deviceId.value), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_13$1, [
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => toggle("stores"))
          }, [
            createVNode(_sfc_main$g, {
              name: "shop",
              size: 20
            }),
            _cache[31] || (_cache[31] = createBaseVNode("b", null, "切换店铺", -1)),
            createBaseVNode("small", null, toDisplayString(store.value ? store.value.name : "未选"), 1)
          ]),
          unref(allow)("store:write") ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: _cache[3] || (_cache[3] = ($event) => agentOpen.value = true)
          }, [
            createVNode(_sfc_main$g, {
              name: "user",
              size: 20
            }),
            _cache[32] || (_cache[32] = createBaseVNode("b", null, "代理管理", -1)),
            createBaseVNode("small", null, toDisplayString(store.value ? store.value.name : ""), 1)
          ])) : createCommentVNode("", true),
          createBaseVNode("button", { onClick: doExportStore }, [
            createVNode(_sfc_main$g, {
              name: "download",
              size: 20
            }),
            _cache[33] || (_cache[33] = createBaseVNode("b", null, "导出这家店", -1)),
            _cache[34] || (_cache[34] = createBaseVNode("small", null, "发给共管的人", -1))
          ]),
          createBaseVNode("label", _hoisted_14, [
            createBaseVNode("input", {
              type: "file",
              accept: ".json,application/json",
              style: { "display": "none" },
              onChange: onImportStore
            }, null, 32),
            createVNode(_sfc_main$g, {
              name: "upload",
              size: 20
            }),
            createBaseVNode("b", null, toDisplayString(importing.value ? "接入中…" : "导入数据包"), 1),
            _cache[35] || (_cache[35] = createBaseVNode("small", null, "店铺 / 代理包", -1))
          ])
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["fold", { open: sec.value.stores }])
        }, [
          createBaseVNode("button", {
            class: "fold-head",
            onClick: _cache[4] || (_cache[4] = ($event) => toggle("stores"))
          }, [
            createBaseVNode("span", _hoisted_15, [
              createVNode(_sfc_main$g, {
                name: "shop",
                size: 17
              }),
              _cache[36] || (_cache[36] = createBaseVNode("b", null, "店铺与身份", -1))
            ]),
            createBaseVNode("span", _hoisted_16, [
              createBaseVNode("span", null, toDisplayString(unref(stores).length) + " 家店 · " + toDisplayString(unref(identities).length) + " 个身份", 1),
              createVNode(_sfc_main$g, {
                class: "chev",
                name: "chev",
                size: 14
              })
            ])
          ]),
          sec.value.stores ? (openBlock(), createElementBlock("div", _hoisted_17, [
            _cache[38] || (_cache[38] = createBaseVNode("div", { class: "mini-head" }, "店铺", -1)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(allow)("store:write") ? unref(stores) : unref(stores).filter((x) => store.value && x.id === store.value.id), (s) => {
              return openBlock(), createElementBlock("button", {
                key: s.id,
                class: "row",
                onClick: ($event) => pickStore(s)
              }, [
                createBaseVNode("span", _hoisted_19, [
                  createVNode(_sfc_main$g, {
                    name: "shop",
                    size: 18
                  })
                ]),
                createBaseVNode("span", _hoisted_20, [
                  createBaseVNode("b", null, [
                    createTextVNode(toDisplayString(s.name) + " ", 1),
                    s.asAgent ? (openBlock(), createElementBlock("span", _hoisted_21, "代理")) : !s.mine ? (openBlock(), createElementBlock("span", _hoisted_22, "共管")) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("span", null, toDisplayString(s.warehouseIds && s.warehouseIds.length ? s.warehouseIds.length + " 个供货仓" : "未挂仓库"), 1)
                ]),
                createBaseVNode("span", _hoisted_23, [
                  store.value && store.value.id === s.id ? (openBlock(), createElementBlock("span", _hoisted_24, "使用中")) : s.asAgent ? (openBlock(), createElementBlock("span", _hoisted_25, "走代理身份")) : unref(allow)("store:write") ? (openBlock(), createElementBlock("button", {
                    key: 2,
                    class: "chip sm",
                    onClick: withModifiers(($event) => pickStore(s), ["stop"])
                  }, "切换", 8, _hoisted_26)) : (openBlock(), createElementBlock("span", _hoisted_27, "只读")),
                  storeOps(s).length ? (openBlock(), createElementBlock("button", {
                    key: 4,
                    class: "more-btn",
                    "aria-label": "店铺操作",
                    onClick: withModifiers(($event) => openStoreMenu(s), ["stop"])
                  }, [
                    createVNode(_sfc_main$g, {
                      name: "dots",
                      size: 17
                    })
                  ], 8, _hoisted_28)) : createCommentVNode("", true)
                ])
              ], 8, _hoisted_18);
            }), 128)),
            unref(allow)("store:write") ? (openBlock(), createElementBlock("div", _hoisted_29, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => newStoreName.value = $event),
                class: "inp",
                placeholder: "新店铺名，如 周末市集摊位",
                style: { "flex": "1" }
              }, null, 512), [
                [vModelText, newStoreName.value]
              ]),
              createVNode(_component_var_button, {
                size: "normal",
                type: "primary",
                onClick: addStore
              }, {
                default: withCtx(() => [..._cache[37] || (_cache[37] = [
                  createTextVNode("建店", -1)
                ])]),
                _: 1
              })
            ])) : createCommentVNode("", true),
            _cache[39] || (_cache[39] = createBaseVNode("div", {
              class: "mini-head",
              style: { "margin-top": "16px" }
            }, "身份（店主 / 代理，随时切）", -1)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(identities), (it) => {
              return openBlock(), createElementBlock("div", {
                key: it.id || "owner",
                class: "id-row"
              }, [
                createBaseVNode("span", {
                  class: normalizeClass(["id-badge", it.kind])
                }, toDisplayString(it.kind === "owner" ? "店" : "代"), 3),
                createBaseVNode("span", _hoisted_30, [
                  createBaseVNode("b", null, toDisplayString(it.name), 1),
                  createBaseVNode("span", _hoisted_31, toDisplayString(it.sub), 1)
                ]),
                createBaseVNode("span", _hoisted_32, [
                  unref(currentIdentity) === it.id ? (openBlock(), createElementBlock("span", _hoisted_33, "使用中")) : (openBlock(), createElementBlock("button", {
                    key: 1,
                    class: "chip sm",
                    onClick: ($event) => useIdentity(it.id)
                  }, "切到这里", 8, _hoisted_34)),
                  createBaseVNode("button", {
                    class: "more-btn",
                    "aria-label": "身份操作",
                    onClick: withModifiers(($event) => openIdentityMenu(it), ["stop"])
                  }, [
                    createVNode(_sfc_main$g, {
                      name: "dots",
                      size: 17
                    })
                  ], 8, _hoisted_35)
                ])
              ]);
            }), 128)),
            _cache[40] || (_cache[40] = createBaseVNode("div", {
              class: "hint",
              style: { "padding": "8px 0 2px", "line-height": "1.8" }
            }, " 代理身份看不到成本与毛利，商品/分类/库存只读；两个身份用的是同一份数据，切换不重新加载。 ", -1))
          ])) : createCommentVNode("", true)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["fold", { open: sec.value.data }])
        }, [
          createBaseVNode("button", {
            class: "fold-head",
            onClick: _cache[6] || (_cache[6] = ($event) => toggle("data"))
          }, [
            createBaseVNode("span", _hoisted_36, [
              createVNode(_sfc_main$g, {
                name: "sync",
                size: 17
              }),
              _cache[41] || (_cache[41] = createBaseVNode("b", null, "数据同步与备份", -1))
            ]),
            createBaseVNode("span", _hoisted_37, [
              createBaseVNode("span", null, toDisplayString(lastSyncText.value), 1),
              createVNode(_sfc_main$g, {
                class: "chev",
                name: "chev",
                size: 14
              })
            ])
          ]),
          sec.value.data ? (openBlock(), createElementBlock("div", _hoisted_38, [
            unref(inWeChat) ? (openBlock(), createElementBlock("div", _hoisted_39, [
              createVNode(_sfc_main$g, {
                name: "alert",
                size: 16
              }),
              _cache[42] || (_cache[42] = createBaseVNode("span", null, "微信里点不动下载。请点右上角「···」→「在浏览器打开」，再在这里导出/导入。", -1))
            ])) : createCommentVNode("", true),
            _cache[50] || (_cache[50] = createBaseVNode("div", { class: "mini-head" }, "手机 ↔ 电脑（同一个用户，整包覆盖）", -1)),
            createBaseVNode("button", {
              class: "row",
              onClick: doExportSync
            }, [
              createBaseVNode("span", _hoisted_40, [
                createVNode(_sfc_main$g, {
                  name: "download",
                  size: 18
                })
              ]),
              _cache[43] || (_cache[43] = createBaseVNode("span", { class: "txt" }, [
                createBaseVNode("b", null, "导出同步包"),
                createBaseVNode("span", null, "带设置；拿到另一台导入 = 那台变成本机这一份")
              ], -1))
            ]),
            createBaseVNode("label", _hoisted_41, [
              createBaseVNode("input", {
                type: "file",
                accept: ".json,application/json",
                style: { "display": "none" },
                onChange: onImportSync
              }, null, 32),
              createBaseVNode("span", _hoisted_42, [
                createVNode(_sfc_main$g, {
                  name: "sync",
                  size: 18
                })
              ]),
              createBaseVNode("span", _hoisted_43, [
                createBaseVNode("b", null, toDisplayString(syncing.value ? "正在覆盖…" : "导入同步包（整套覆盖）"), 1),
                _cache[44] || (_cache[44] = createBaseVNode("span", null, "本机全部换成本包里那份，导入前二次确认", -1))
              ])
            ]),
            createBaseVNode("div", _hoisted_44, [
              _cache[45] || (_cache[45] = createTextVNode("本机：", -1)),
              createBaseVNode("span", _hoisted_45, toDisplayString(deviceId.value), 1),
              createTextVNode(" · 上次同步：" + toDisplayString(lastSyncText.value), 1),
              unref(state).meta.lastSyncDevice ? (openBlock(), createElementBlock("span", _hoisted_46, "（来自 " + toDisplayString(unref(state).meta.lastSyncDevice) + "）", 1)) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_47, "这家店 · " + toDisplayString(store.value ? store.value.name : ""), 1),
            createBaseVNode("button", {
              class: "row",
              onClick: doExportStore
            }, [
              createBaseVNode("span", _hoisted_48, [
                createVNode(_sfc_main$g, {
                  name: "shop",
                  size: 18
                })
              ]),
              _cache[46] || (_cache[46] = createBaseVNode("span", { class: "txt" }, [
                createBaseVNode("b", null, "导出这家店"),
                createBaseVNode("span", null, "店 + 挂载仓库 + 商品/库存/订单/挂单/本店日志；不含头像主题")
              ], -1))
            ]),
            createBaseVNode("label", _hoisted_49, [
              createBaseVNode("input", {
                type: "file",
                accept: ".json,application/json",
                style: { "display": "none" },
                onChange: onImportStore
              }, null, 32),
              createBaseVNode("span", _hoisted_50, [
                createVNode(_sfc_main$g, {
                  name: "upload",
                  size: 18
                })
              ]),
              createBaseVNode("span", _hoisted_51, [
                createBaseVNode("b", null, toDisplayString(importing.value ? "正在接入…" : "导入店铺数据包"), 1),
                _cache[47] || (_cache[47] = createBaseVNode("span", null, "本机已有 → 更新；没有 → 建一家共管店挂进来（代理包也行）", -1))
              ])
            ]),
            _cache[51] || (_cache[51] = createBaseVNode("div", { class: "mini-head" }, "全部数据（备份 / 合并）", -1)),
            createBaseVNode("button", {
              class: "row",
              onClick: doExport
            }, [
              createBaseVNode("span", _hoisted_52, [
                createVNode(_sfc_main$g, {
                  name: "download",
                  size: 18
                })
              ]),
              _cache[48] || (_cache[48] = createBaseVNode("span", { class: "txt" }, [
                createBaseVNode("b", null, "导出全部数据"),
                createBaseVNode("span", null, "所有店铺 + 头像/主题等设置，换机或误删前先存一份")
              ], -1))
            ]),
            createBaseVNode("label", _hoisted_53, [
              createBaseVNode("input", {
                type: "file",
                accept: ".json,application/json",
                style: { "display": "none" },
                onChange: onImport
              }, null, 32),
              createBaseVNode("span", _hoisted_54, [
                createVNode(_sfc_main$g, {
                  name: "upload",
                  size: 18
                })
              ]),
              createBaseVNode("span", _hoisted_55, [
                createBaseVNode("b", null, toDisplayString(importing.value ? "正在合并…" : "导入并合并（不覆盖）"), 1),
                _cache[49] || (_cache[49] = createBaseVNode("span", null, "同 id 取更新的一条，本机独有的留着 —— 和同步包正好相反", -1))
              ])
            ]),
            report.value ? (openBlock(), createElementBlock("div", _hoisted_56, [
              createVNode(_sfc_main$g, {
                name: "sync",
                size: 16
              }),
              createTextVNode(toDisplayString(report.value), 1)
            ])) : createCommentVNode("", true),
            _cache[52] || (_cache[52] = createBaseVNode("div", {
              class: "hint",
              style: { "padding": "10px 2px 0", "line-height": "1.9" }
            }, [
              createTextVNode(" 一句话记："),
              createBaseVNode("b", null, "同步 = 覆盖成一模一样"),
              createTextVNode("，"),
              createBaseVNode("b", null, "备份 = 合并、谁都不丢"),
              createTextVNode("； 店铺包只管一家店（可交给别人共管），代理包 = 店铺包 + 代理身份。 ")
            ], -1))
          ])) : createCommentVNode("", true)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["fold", { open: sec.value.cash }])
        }, [
          createBaseVNode("button", {
            class: "fold-head",
            onClick: _cache[7] || (_cache[7] = ($event) => toggle("cash"))
          }, [
            createBaseVNode("span", _hoisted_57, [
              createVNode(_sfc_main$g, {
                name: "cart",
                size: 17
              }),
              _cache[53] || (_cache[53] = createBaseVNode("b", null, "收银台", -1))
            ]),
            createBaseVNode("span", _hoisted_58, [
              createBaseVNode("span", null, "折扣 " + toDisplayString(unref(state).settings.minDiscount) + "折起", 1),
              createVNode(_sfc_main$g, {
                class: "chev",
                name: "chev",
                size: 14
              })
            ])
          ]),
          sec.value.cash ? (openBlock(), createElementBlock("div", _hoisted_59, [
            createBaseVNode("div", _hoisted_60, [
              _cache[54] || (_cache[54] = createBaseVNode("span", null, [
                createTextVNode("显示成本/毛利"),
                createBaseVNode("small", { class: "hint" }, "代理永远不显示")
              ], -1)),
              createVNode(_component_var_switch, {
                "model-value": !!unref(state).settings.showCost,
                size: 19,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = (v) => unref(setSetting)("showCost", !!v))
              }, null, 8, ["model-value"])
            ]),
            createBaseVNode("div", _hoisted_61, [
              _cache[55] || (_cache[55] = createBaseVNode("span", null, [
                createTextVNode("收款后语音播报"),
                createBaseVNode("small", { class: "hint" }, "金额/找零")
              ], -1)),
              createVNode(_component_var_switch, {
                "model-value": !!unref(state).settings.voice,
                size: 19,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = (v) => unref(setSetting)("voice", !!v))
              }, null, 8, ["model-value"])
            ]),
            createBaseVNode("div", _hoisted_62, [
              _cache[56] || (_cache[56] = createBaseVNode("span", null, [
                createTextVNode("显示微信/支付宝二维码"),
                createBaseVNode("small", { class: "hint" }, "收款码没填就不显示")
              ], -1)),
              createVNode(_component_var_switch, {
                "model-value": unref(state).settings.showQR !== false,
                size: 19,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = (v) => unref(setSetting)("showQR", !!v))
              }, null, 8, ["model-value"])
            ]),
            _cache[57] || (_cache[57] = createBaseVNode("div", {
              class: "field-label",
              style: { "margin-top": "10px" }
            }, "最低折扣（店主定，低于此不给折）", -1)),
            createBaseVNode("div", _hoisted_63, [
              (openBlock(), createElementBlock(Fragment, null, renderList([10, 9.5, 9, 8.5, 8, 7.5, 7], (d) => {
                return createBaseVNode("button", {
                  key: d,
                  class: "chip",
                  "data-on": Number(unref(state).settings.minDiscount) === d,
                  onClick: ($event) => unref(setSetting)("minDiscount", d)
                }, toDisplayString(d) + "折起", 9, _hoisted_64);
              }), 64))
            ]),
            _cache[58] || (_cache[58] = createBaseVNode("div", {
              class: "hint",
              style: { "margin-top": "6px" }
            }, "这只管「最多能打多低」；真正开单时还会看这批货的成本，成本顶到卖价就不给折。", -1)),
            _cache[59] || (_cache[59] = createBaseVNode("div", {
              class: "field-label",
              style: { "margin-top": "14px" }
            }, "微信收款码链接", -1)),
            createBaseVNode("input", {
              class: "inp",
              value: unref(state).settings.wechatQR,
              placeholder: "https://…/wechat-qr.jpg",
              onChange: _cache[11] || (_cache[11] = (e) => unref(setSetting)("wechatQR", e.target.value.trim()))
            }, null, 40, _hoisted_65),
            _cache[60] || (_cache[60] = createBaseVNode("div", {
              class: "field-label",
              style: { "margin-top": "10px" }
            }, "支付宝收款码链接", -1)),
            createBaseVNode("input", {
              class: "inp",
              value: unref(state).settings.alipayQR,
              placeholder: "https://…/alipay-qr.jpg",
              onChange: _cache[12] || (_cache[12] = (e) => unref(setSetting)("alipayQR", e.target.value.trim()))
            }, null, 40, _hoisted_66),
            _cache[61] || (_cache[61] = createBaseVNode("div", {
              class: "hint",
              style: { "margin-top": "8px" }
            }, "代理端共用这些设置、不能改；改了所有设备下次开单即生效。", -1))
          ])) : createCommentVNode("", true)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["fold", { open: sec.value.look }])
        }, [
          createBaseVNode("button", {
            class: "fold-head",
            onClick: _cache[13] || (_cache[13] = ($event) => toggle("look"))
          }, [
            createBaseVNode("span", _hoisted_67, [
              createVNode(_sfc_main$g, {
                name: "theme",
                size: 17
              }),
              _cache[62] || (_cache[62] = createBaseVNode("b", null, "外观", -1))
            ]),
            createBaseVNode("span", _hoisted_68, [
              createBaseVNode("span", null, toDisplayString(unref(state).settings.dark ? "夜间" : "日间") + " · 字号" + toDisplayString((unref(FONT_STEPS).find((f) => f.key === unref(state).settings.fontScale) || {}).name || "标准"), 1),
              createVNode(_sfc_main$g, {
                class: "chev",
                name: "chev",
                size: 14
              })
            ])
          ]),
          sec.value.look ? (openBlock(), createElementBlock("div", _hoisted_69, [
            _cache[64] || (_cache[64] = createBaseVNode("div", { class: "field-label" }, "主题色", -1)),
            createBaseVNode("div", _hoisted_70, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(THEME_COLORS), (c) => {
                return openBlock(), createElementBlock("button", {
                  key: c.key,
                  class: "chip",
                  "data-on": unref(state).settings.themeColor === c.key,
                  onClick: ($event) => themeColor(c.key)
                }, toDisplayString(c.name), 9, _hoisted_71);
              }), 128))
            ]),
            createBaseVNode("div", _hoisted_72, [
              _cache[63] || (_cache[63] = createBaseVNode("span", null, "夜间模式", -1)),
              createVNode(_component_var_switch, {
                "model-value": !!unref(state).settings.dark,
                size: 19,
                "onUpdate:modelValue": toggleDark
              }, null, 8, ["model-value"])
            ]),
            _cache[65] || (_cache[65] = createBaseVNode("div", { class: "field-label" }, "字号", -1)),
            createBaseVNode("div", _hoisted_73, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(FONT_STEPS), (f) => {
                return openBlock(), createElementBlock("button", {
                  key: f.key,
                  class: "chip",
                  "data-on": unref(state).settings.fontScale === f.key,
                  onClick: ($event) => setFont(f.key)
                }, toDisplayString(f.name), 9, _hoisted_74);
              }), 128))
            ])
          ])) : createCommentVNode("", true)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["fold", { open: sec.value.local }])
        }, [
          createBaseVNode("button", {
            class: "fold-head",
            onClick: _cache[14] || (_cache[14] = ($event) => toggle("local"))
          }, [
            createBaseVNode("span", _hoisted_75, [
              createVNode(_sfc_main$g, {
                name: "box",
                size: 17
              }),
              _cache[66] || (_cache[66] = createBaseVNode("b", null, "本机存储与操作日志", -1))
            ]),
            createBaseVNode("span", _hoisted_76, [
              createBaseVNode("span", null, toDisplayString(usage.value && usage.value.estimate && usage.value.estimate.usage != null ? fmtBytes(usage.value.estimate.usage) : "—"), 1),
              createVNode(_sfc_main$g, {
                class: "chev",
                name: "chev",
                size: 14
              })
            ])
          ]),
          sec.value.local ? (openBlock(), createElementBlock("div", _hoisted_77, [
            createBaseVNode("div", _hoisted_78, [
              _cache[67] || (_cache[67] = createBaseVNode("span", null, "存储方案", -1)),
              createBaseVNode("b", null, toDisplayString(unref(state).storageLabel || unref(state).storageKind), 1)
            ]),
            createBaseVNode("div", _hoisted_79, [
              _cache[68] || (_cache[68] = createBaseVNode("span", null, "IndexedDB", -1)),
              createBaseVNode("b", null, [
                createTextVNode(toDisplayString(usage.value && usage.value.estimate && usage.value.estimate.usage != null ? fmtBytes(usage.value.estimate.usage) : "—") + " ", 1),
                createBaseVNode("span", _hoisted_80, "配额 " + toDisplayString(usage.value && usage.value.estimate && usage.value.estimate.quota != null ? fmtBytes(usage.value.estimate.quota) : "—"), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_81, [
              _cache[69] || (_cache[69] = createBaseVNode("span", null, "localStorage", -1)),
              createBaseVNode("b", null, [
                createTextVNode(toDisplayString(usage.value ? fmtBytes(usage.value.localBytes) : "—"), 1),
                createBaseVNode("span", _hoisted_82, toDisplayString(usage.value ? usage.value.localKeys + " 个键" : ""), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_83, [
              _cache[70] || (_cache[70] = createBaseVNode("span", null, "设备", -1)),
              createBaseVNode("b", _hoisted_84, toDisplayString(deviceId.value), 1)
            ]),
            createBaseVNode("div", _hoisted_85, [
              _cache[71] || (_cache[71] = createBaseVNode("span", null, "数据量", -1)),
              createBaseVNode("b", null, toDisplayString(unref(state).collections.products.length) + " 商品 · " + toDisplayString(unref(state).collections.orders.length) + " 订单", 1)
            ]),
            unref(state).storageErrors.length ? (openBlock(), createElementBlock("div", _hoisted_86, "降级原因：" + toDisplayString(unref(state).storageErrors.join(" / ")), 1)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_87, [
              createBaseVNode("button", {
                class: "chip",
                onClick: loadUsage
              }, "刷新用量"),
              createBaseVNode("button", {
                class: "chip",
                onClick: _cache[15] || (_cache[15] = ($event) => wipe())
              }, "清空全部（IndexedDB + localStorage）")
            ]),
            _cache[72] || (_cache[72] = createBaseVNode("div", {
              class: "hint",
              style: { "margin-top": "8px" }
            }, "清空只影响这台设备，换设备/换浏览器各有一份自己的库。", -1)),
            _cache[73] || (_cache[73] = createBaseVNode("div", {
              class: "mini-head",
              style: { "margin-top": "14px" }
            }, "示例数据", -1)),
            createBaseVNode("div", _hoisted_88, [
              unref(allow)("store:write") ? (openBlock(), createElementBlock("button", {
                key: 0,
                class: "chip",
                onClick: dropDemo
              }, "去掉示例数据")) : createCommentVNode("", true),
              unref(allow)("store:write") ? (openBlock(), createElementBlock("button", {
                key: 1,
                class: "chip",
                onClick: reset
              }, "恢复示例数据")) : createCommentVNode("", true)
            ]),
            _cache[74] || (_cache[74] = createBaseVNode("div", {
              class: "mini-head",
              style: { "margin-top": "16px" }
            }, "最近操作", -1)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(recentLogs.value, (l) => {
              return openBlock(), createElementBlock("div", {
                key: l.id,
                class: "log-row"
              }, [
                createBaseVNode("span", _hoisted_89, toDisplayString(unref(fmtTime)(l.at)), 1),
                createBaseVNode("span", _hoisted_90, toDisplayString(typeText(l.type)), 1),
                createBaseVNode("span", _hoisted_91, [
                  createTextVNode(toDisplayString(l.text) + " ", 1),
                  createBaseVNode("em", _hoisted_92, [
                    createTextVNode(toDisplayString(l.operatorName || "我"), 1),
                    logWhere(l) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      createTextVNode(" · " + toDisplayString(logWhere(l)), 1)
                    ], 64)) : createCommentVNode("", true),
                    l.deviceId ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(" · " + toDisplayString(l.deviceId), 1)
                    ], 64)) : createCommentVNode("", true)
                  ])
                ])
              ]);
            }), 128)),
            !recentLogs.value.length ? (openBlock(), createElementBlock("div", _hoisted_93, "还没有记录。开单、改库存、调拨、建店都会自动留一条。")) : createCommentVNode("", true),
            createBaseVNode("button", {
              class: "chip",
              style: { "margin-top": "10px" },
              onClick: _cache[16] || (_cache[16] = ($event) => logOpen.value = true)
            }, "查看全部 " + toDisplayString(scopedLogs.value.length) + " 条", 1)
          ])) : createCommentVNode("", true)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["fold", { open: sec.value.help }])
        }, [
          createBaseVNode("button", {
            class: "fold-head",
            onClick: _cache[17] || (_cache[17] = ($event) => toggle("help"))
          }, [
            createBaseVNode("span", _hoisted_94, [
              createVNode(_sfc_main$g, {
                name: "alert",
                size: 17
              }),
              _cache[75] || (_cache[75] = createBaseVNode("b", null, "规则说明", -1))
            ]),
            createBaseVNode("span", _hoisted_95, [
              _cache[76] || (_cache[76] = createBaseVNode("span", null, "数据口径 / 三种包 / 权限", -1)),
              createVNode(_sfc_main$g, {
                class: "chev",
                name: "chev",
                size: 14
              })
            ])
          ]),
          sec.value.help ? (openBlock(), createElementBlock("div", _hoisted_96, [..._cache[77] || (_cache[77] = [
            createStaticVNode('<p class="hint" style="line-height:2;" data-v-3faac259> · 数据默认存 IndexedDB（库 <span class="mono" data-v-3faac259>stall3</span>），浏览器禁用时自动降到 localStorage，再不行就内存兜底。<br data-v-3faac259> · <b data-v-3faac259>同步包 ≠ 整机备份</b>（两者导出的数据几乎一样，区别只在「导入时怎么落库」）：<br data-v-3faac259> 　– <b data-v-3faac259>同步包</b>（.json + sync 标记）：导入是<b data-v-3faac259>全量覆盖</b>，本机被整套替掉 → 目标是你手机和电脑装着同一份库（哪台改都一样，导过去就完全一致），导入前会二次确认。<br data-v-3faac259> 　– <b data-v-3faac259>整机备份</b>（.json，无标记）：导入是<b data-v-3faac259>合并</b>，同 id 取更新时间新的、本机独有的留着 → 目标是备份/迁移，换机时不会因为导入把旧设备上的新数据冲掉。<br data-v-3faac259> 　– 一句话记：<b data-v-3faac259>同步 = 覆盖成一模一样</b>，<b data-v-3faac259>备份 = 合并、谁都不丢</b>。<br data-v-3faac259> · 三种数据包，互不混淆：<b data-v-3faac259>同步包</b>（同一个人的手机 ↔ 电脑，整包全量覆盖，含设置）、 <b data-v-3faac259>店铺包</b>（只带一家店，可交给别人共管，不含头像/主题等设置）、 <b data-v-3faac259>代理包</b>（店铺包 + 代理身份，导入后自动是代理视角）。<br data-v-3faac259> · 店铺包导入规则：本机已有这家店（自己导自己，或这家店本来就归你）→ 直接做一次数据更新； 本机没有 → 建一家「共管店铺」挂进来，商品/仓库/订单/日志一起落地。<br data-v-3faac259> · 「共管」店铺可以随时<b data-v-3faac259>退出</b>（店铺行右侧的「退出」）：它的商品、库存、订单、挂单、日志一起清掉， 别的店还在用的仓库和数据一件不动；代理身份同理由「退出代理」卸掉。<br data-v-3faac259> · 代理端是本站的 <span class="mono" data-v-3faac259>agent.html</span> 页面，和店主共用同一个库；换设备用「代理店铺包」在他的「我的 → 导入店铺数据包」接入。<br data-v-3faac259> · <b data-v-3faac259>入库是加、盘点是覆盖</b>：仓库页「入库 / 盘点」面板里先选动作再填数—— 入库 = 现存 + 填的数（进货天天发生，必须是加法）；盘点 = 直接改成填的数（纠正账实差异）。 明细页只做「调货到店」，不在每行挤一排按钮。<br data-v-3faac259> · <b data-v-3faac259>代理端也算毛利，只是不显示</b>：成本和毛利一直按完整数据算（订单行有成本快照， 缺的会在启动/导入时补上），代理端只是把成本、毛利、毛利率这几块藏起来， 统计口径和店主完全一致，不会出现&quot;毛利被算成负数&quot;。<br data-v-3faac259> · <b data-v-3faac259>库存按流水对账</b>：两边库存数量不一样时，不再&quot;谁新就用谁&quot;，而是取较早的那份快照， 再加上之后发生的所有变动（卖货、入库、盘点、调货都会留一条流水）。 eg: 同步时两边都 10 件；你这台入库 +5、另一台卖了 2 件 → 导回来是 10 + 5 − 2 = 13 件， 订单和营业额也一起在，不会出现&quot;库存对但营业额少&quot;或反过来。<br data-v-3faac259> · <b data-v-3faac259>仓库有主人</b>：仓库归&quot;建它的人&quot;（ownerId）。导入别人的店铺包时，包里仓库的 id 撞上我的仓库 （常见就是都叫「主仓 · 家里」、id 都是 w1）不会覆盖我的那条，而是给包里的仓库换一个新 id 接进来， 包内挂载关系和库存行一起改过去；别人建的仓库在本机只能看，不能挂到我的店上。<br data-v-3faac259> · <b data-v-3faac259>代理包导入不会升级成共管</b>：代理包里不带仓库（代理没有仓库权限），店铺标记固定为「代理」， 挂仓库、建仓、给这家店生成代理这几个入口都会被拦下。<br data-v-3faac259> · <b data-v-3faac259>谁能生成代理</b>：只有自己建的店（mine）和店主交我共管的店（coManaged）能生成/管理代理； 「代理」不能往下再发展代理，共管者也不能把代理提升成共管 —— 提升只有店铺所有人能做。<br data-v-3faac259> · <b data-v-3faac259>代理和代理之间</b>：A 代卖点导给 B 代卖点，两边都还是代理（不变成共管），数据合并到同一个上级店， 各自拿自己的代理身份卖货；想把某个代卖点变成能改商品的共管，必须由店主的设备重新导一次店铺包。<br data-v-3faac259> · 店铺带两种「不是自己建的」标记：<b data-v-3faac259>代理</b>（我只是代卖，只能卖货、看不到成本，点它会切到代理身份）和 <b data-v-3faac259>共管</b>（店主把店交给我管，能改商品和订单）。两种都不会变成我的店。<br data-v-3faac259> · 表格导入的 .xlsx 需要在线加载 SheetJS，断网时请另存为 CSV。<br data-v-3faac259> · 抹零、欠货、分装都会如实记进账里，不做美化。 </p>', 1)
          ])])) : createCommentVNode("", true)
        ], 2),
        createVNode(_component_var_popup, {
          show: logOpen.value,
          position: "bottom",
          "onUpdate:show": _cache[19] || (_cache[19] = (v) => logOpen.value = v)
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_97, [
              createBaseVNode("header", _hoisted_98, [
                createBaseVNode("div", null, [
                  createBaseVNode("b", null, "全部操作日志 · " + toDisplayString(store.value ? store.value.name : ""), 1),
                  _cache[78] || (_cache[78] = createBaseVNode("div", { class: "hint" }, "本店日志（含代理/共管在他店的操作）；只留最近 120 条", -1))
                ]),
                createBaseVNode("button", {
                  class: "icon-btn",
                  "aria-label": "关闭",
                  onClick: _cache[18] || (_cache[18] = ($event) => logOpen.value = false)
                }, [
                  createVNode(_sfc_main$g, {
                    name: "close",
                    size: 18
                  })
                ])
              ]),
              createBaseVNode("div", _hoisted_99, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(scopedLogs.value, (l) => {
                  return openBlock(), createElementBlock("div", {
                    key: l.id,
                    class: "log-row"
                  }, [
                    createBaseVNode("span", _hoisted_100, toDisplayString(unref(fmtTime)(l.at)), 1),
                    createBaseVNode("span", _hoisted_101, toDisplayString(typeText(l.type)), 1),
                    createBaseVNode("span", _hoisted_102, [
                      createTextVNode(toDisplayString(l.text) + " ", 1),
                      createBaseVNode("em", _hoisted_103, [
                        createTextVNode(toDisplayString(l.operatorName || "我"), 1),
                        logWhere(l) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                          createTextVNode(" · " + toDisplayString(logWhere(l)), 1)
                        ], 64)) : createCommentVNode("", true),
                        l.deviceId ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                          createTextVNode(" · " + toDisplayString(l.deviceId), 1)
                        ], 64)) : createCommentVNode("", true)
                      ])
                    ])
                  ]);
                }), 128)),
                !scopedLogs.value.length ? (openBlock(), createElementBlock("div", _hoisted_104, [..._cache[79] || (_cache[79] = [
                  createBaseVNode("b", null, "这家店还没有日志", -1),
                  createTextVNode("开单、改库存、调拨都会记下来", -1)
                ])])) : createCommentVNode("", true)
              ])
            ])
          ]),
          _: 1
        }, 8, ["show"]),
        createVNode(_component_var_popup, {
          show: avatarOpen.value,
          position: "bottom",
          "onUpdate:show": _cache[23] || (_cache[23] = (v) => avatarOpen.value = v)
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_105, [
              createBaseVNode("header", _hoisted_106, [
                _cache[80] || (_cache[80] = createBaseVNode("div", null, [
                  createBaseVNode("b", null, "更换头像"),
                  createBaseVNode("div", { class: "hint" }, "上传的图会压到 128px，不占本机空间")
                ], -1)),
                createBaseVNode("button", {
                  class: "icon-btn",
                  "aria-label": "关闭",
                  onClick: _cache[20] || (_cache[20] = ($event) => avatarOpen.value = false)
                }, [
                  createVNode(_sfc_main$g, {
                    name: "close",
                    size: 18
                  })
                ])
              ]),
              createBaseVNode("div", _hoisted_107, [
                createBaseVNode("div", _hoisted_108, [
                  unref(state).settings.avatar ? (openBlock(), createElementBlock("img", {
                    key: 0,
                    src: unref(state).settings.avatar,
                    alt: "当前头像"
                  }, null, 8, _hoisted_109)) : (openBlock(), createBlock(_sfc_main$g, {
                    key: 1,
                    name: "user",
                    size: 30
                  }))
                ]),
                createBaseVNode("label", _hoisted_110, [
                  createBaseVNode("input", {
                    type: "file",
                    accept: "image/*",
                    style: { "display": "none" },
                    onChange: pickAvatar
                  }, null, 32),
                  createVNode(_sfc_main$g, {
                    name: "upload",
                    size: 18
                  }),
                  _cache[81] || (_cache[81] = createBaseVNode("span", null, "从相册选一张", -1))
                ]),
                _cache[83] || (_cache[83] = createBaseVNode("div", {
                  class: "field-label",
                  style: { "margin-top": "14px" }
                }, "或者贴一个图片链接", -1)),
                createBaseVNode("div", _hoisted_111, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => avatarUrl.value = $event),
                    class: "inp",
                    placeholder: "https://…/avatar.jpg"
                  }, null, 512), [
                    [vModelText, avatarUrl.value]
                  ]),
                  createVNode(_component_var_button, {
                    type: "primary",
                    onClick: useAvatarUrl
                  }, {
                    default: withCtx(() => [..._cache[82] || (_cache[82] = [
                      createTextVNode("用这个", -1)
                    ])]),
                    _: 1
                  })
                ]),
                createBaseVNode("button", {
                  class: "chip",
                  style: { "margin-top": "14px" },
                  onClick: _cache[22] || (_cache[22] = ($event) => saveAvatar(""))
                }, "恢复默认头像")
              ])
            ])
          ]),
          _: 1
        }, 8, ["show"]),
        createVNode(_component_var_popup, {
          show: menu.value.show,
          position: "bottom",
          "onUpdate:show": _cache[25] || (_cache[25] = (v) => menu.value.show = v)
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_112, [
              _cache[84] || (_cache[84] = createBaseVNode("div", { class: "drag" }, null, -1)),
              createBaseVNode("div", _hoisted_113, [
                createBaseVNode("b", null, toDisplayString(menu.value.title), 1),
                createBaseVNode("span", _hoisted_114, toDisplayString(menu.value.sub), 1)
              ]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(menu.value.items, (it, i) => {
                return openBlock(), createElementBlock("button", {
                  key: i,
                  class: normalizeClass(["menu-row", { danger: it.danger }]),
                  onClick: ($event) => runMenu(it)
                }, [
                  createBaseVNode("span", _hoisted_116, [
                    createBaseVNode("b", null, toDisplayString(it.label), 1),
                    createBaseVNode("span", null, toDisplayString(it.desc), 1)
                  ]),
                  it.danger ? (openBlock(), createBlock(_sfc_main$g, {
                    key: 0,
                    name: "alert",
                    size: 15
                  })) : (openBlock(), createBlock(_sfc_main$g, {
                    key: 1,
                    name: "chev",
                    size: 14
                  }))
                ], 10, _hoisted_115);
              }), 128)),
              createBaseVNode("button", {
                class: "menu-cancel",
                onClick: _cache[24] || (_cache[24] = ($event) => menu.value.show = false)
              }, "取消")
            ])
          ]),
          _: 1
        }, 8, ["show"]),
        createVNode(AgentSheet, {
          show: agentOpen.value,
          "onUpdate:show": _cache[26] || (_cache[26] = ($event) => agentOpen.value = $event)
        }, null, 8, ["show"])
      ]);
    };
  }
};
const MeView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3faac259"]]);
const _hoisted_1 = { class: "shell" };
const _hoisted_2 = { class: "rail" };
const _hoisted_3 = { class: "rail-brand" };
const _hoisted_4 = { class: "rail-logo" };
const _hoisted_5 = ["data-on", "onClick"];
const _hoisted_6 = {
  class: "hint",
  style: { "padding": "0 10px" }
};
const _hoisted_7 = { class: "main" };
const _hoisted_8 = {
  key: 0,
  class: "empty",
  style: { "padding-top": "38vh" }
};
const _hoisted_9 = {
  key: 1,
  class: "page",
  style: { "padding-top": "12vh" }
};
const _hoisted_10 = { class: "card" };
const _hoisted_11 = { style: { "font-size": "17px" } };
const _hoisted_12 = {
  key: 3,
  class: "tabbar"
};
const _hoisted_13 = ["data-on", "onClick"];
const _sfc_main = {
  __name: "App",
  setup(__props) {
    const TABS = [
      { key: "home", label: "收银", icon: "cart", comp: HomeView },
      { key: "products", label: "商品", icon: "box", comp: _sfc_main$6 },
      { key: "orders", label: "订单", icon: "list", comp: OrdersView },
      { key: "stats", label: "统计", icon: "chart", comp: StatsView },
      { key: "me", label: "我的", icon: "user", comp: MeView },
      { key: "warehouses", label: "仓库", icon: "layers", comp: WarehousesView }
    ];
    const tabs = computed(() => isAgent.value ? TABS.filter((t2) => t2.key !== "warehouses") : TABS);
    const mobileTabs = computed(() => tabs.value.filter((t2) => t2.key !== "warehouses"));
    const current = computed(() => tabs.value.find((t2) => t2.key === nav.view) || tabs.value[0] || TABS[0]);
    function agentCodeFromUrl() {
      const p2 = new URLSearchParams(location.search);
      return p2.get("code") || p2.get("agent") || "";
    }
    function pickDataFile() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json,.json";
      input.onchange = async () => {
        const f = input.files && input.files[0];
        if (!f) return;
        try {
          const obj = JSON.parse(await f.text());
          const report = await importBundle(obj);
          state.agentNoData = false;
          tip("已导入店铺数据：" + report);
        } catch (e) {
          tip("导入失败：" + (e && e.message ? e.message : e));
        }
      };
      input.click();
    }
    function applyTheme() {
      const s = state.settings;
      document.documentElement.dataset.theme = s.dark ? "dark" : "light";
      document.documentElement.dataset.color = s.themeColor || "jade";
      document.body.style.setProperty("--app-zoom", String(s.fontScale || 1));
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        const css = getComputedStyle(document.documentElement).getPropertyValue("--jade").trim();
        if (css) meta.setAttribute("content", css);
      }
    }
    watch(
      () => [state.settings.dark, state.settings.themeColor, state.settings.fontScale, state.ready],
      applyTheme,
      { deep: true }
    );
    onMounted(async () => {
      try {
        await initApp({ agentCode: agentCodeFromUrl() });
      } catch (e) {
        state.storageErrors = [...state.storageErrors, String(e && e.message ? e.message : e)];
      }
      applyTheme();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("aside", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("span", _hoisted_4, [
              createVNode(_sfc_main$g, {
                name: "cart",
                size: 20
              })
            ]),
            createBaseVNode("div", null, [
              createBaseVNode("b", null, toDisplayString(unref(state).settings.shopName || "摆摊助手"), 1),
              createBaseVNode("span", null, toDisplayString(unref(isAgent) ? "代理代卖点" : unref(activeStore) ? unref(activeStore).name : "未选店铺"), 1)
            ])
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(tabs.value, (t2) => {
            return openBlock(), createElementBlock("button", {
              key: t2.key,
              "data-on": unref(nav).view === t2.key,
              onClick: ($event) => unref(go)(t2.key)
            }, [
              createVNode(_sfc_main$g, {
                name: t2.icon,
                size: 18
              }, null, 8, ["name"]),
              createTextVNode(" " + toDisplayString(t2.label), 1)
            ], 8, _hoisted_5);
          }), 128)),
          _cache[2] || (_cache[2] = createBaseVNode("div", { style: { "flex": "1" } }, null, -1)),
          createBaseVNode("div", _hoisted_6, [
            _cache[0] || (_cache[0] = createTextVNode(" 数据存在本机", -1)),
            _cache[1] || (_cache[1] = createBaseVNode("br", null, null, -1)),
            createTextVNode(toDisplayString(unref(state).storageKind || ""), 1)
          ])
        ]),
        createBaseVNode("main", _hoisted_7, [
          !unref(state).ready ? (openBlock(), createElementBlock("div", _hoisted_8, [
            _cache[3] || (_cache[3] = createBaseVNode("b", null, "正在打开本地仓库…", -1)),
            createTextVNode(" " + toDisplayString(unref(state).storageKind || "探测存储中"), 1)
          ])) : unref(state).agentNoData ? (openBlock(), createElementBlock("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("b", _hoisted_11, toDisplayString(unref(state).agentCodeError || "这台设备上还没有店铺数据"), 1),
              _cache[5] || (_cache[5] = createBaseVNode("p", {
                class: "hint",
                style: { "margin-top": "8px", "line-height": "1.9" }
              }, [
                createTextVNode(" 代理链接只带代理编号，数据要在这台设备上有一份才行："),
                createBaseVNode("br"),
                createTextVNode(" · 最好让店主发你那个「代理入口 HTML」，用浏览器打开，数据会自动写进这台设备，然后直接进代理页；"),
                createBaseVNode("br"),
                createTextVNode(" · 也可以把店主导出的 .json 数据包选进来，一次就能用。 ")
              ], -1)),
              createBaseVNode("button", {
                class: "q-btn jade",
                style: { "width": "100%", "margin-top": "12px" },
                onClick: pickDataFile
              }, [..._cache[4] || (_cache[4] = [
                createBaseVNode("span", null, "选择店主给的数据文件", -1)
              ])])
            ])
          ])) : (openBlock(), createBlock(resolveDynamicComponent(current.value.comp), { key: 2 })),
          createVNode(ToastHost),
          unref(state).ready ? (openBlock(), createElementBlock("nav", _hoisted_12, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(mobileTabs.value, (t2) => {
              return openBlock(), createElementBlock("button", {
                key: t2.key,
                "data-on": unref(nav).view === t2.key,
                onClick: ($event) => unref(go)(t2.key)
              }, [
                createVNode(_sfc_main$g, {
                  name: t2.icon,
                  size: 21
                }, null, 8, ["name"]),
                createTextVNode(" " + toDisplayString(t2.label), 1)
              ], 8, _hoisted_13);
            }), 128))
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
const LOCK = "stall3:main-v3";
const CH = "stall3:main-msg-v3";
const selfId = Math.random().toString(36).slice(2, 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function overlay(kind, onReactivate) {
  const old = document.getElementById("single-tab-hold");
  if (old) old.remove();
  const box = document.createElement("div");
  box.id = "single-tab-hold";
  const standby = kind === "standby";
  box.innerHTML = `
    <div style="position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:28px;
                background:#F1F3EE;color:#121A17;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',system-ui,sans-serif">
      <div style="max-width:340px;width:100%;text-align:center">
        <div style="width:54px;height:54px;margin:0 auto 16px;border-radius:15px;background:${standby ? "#E6EAE3" : "#DCE8E2"};color:#1D6A58;
                    display:grid;place-items:center;font-size:24px;font-weight:700">摆</div>
        <b style="display:block;font-size:17px">${standby ? "这个页面已停用" : "另一边已经开着"}</b>
        <p style="margin:8px 0 0;font-size:13px;line-height:1.8;color:#7C8A83">
          ${standby ? "摆摊助手已经在另一个页面里打开了，这边不再写入数据，<b>可以关掉这个页面</b>。<br>想换回这个页面，点下面的按钮把它接管回来（会自动刷新）。" : "同一台设备只留一个页面，避免两边同时改库存把数据弄乱。<br>请切回已经打开的那个标签。"}
        </p>
        <button id="single-tab-go" style="margin-top:18px;width:100%;height:44px;border:0;border-radius:12px;
                background:#1D6A58;color:#fff;font-size:15px;font-weight:600">${standby ? "重新用这个页面" : "切到已打开的页面"}</button>
        ${standby ? "" : '<button id="single-tab-close" style="margin-top:10px;width:100%;height:38px;border:1px solid #CFD6CD;border-radius:12px;background:transparent;color:#3A4741;font-size:13px">关掉这个多余页面</button>'}
      </div>
    </div>`;
  document.body.appendChild(box);
  const go2 = document.getElementById("single-tab-go");
  go2.addEventListener("click", async () => {
    if (standby && onReactivate) {
      onReactivate();
      return;
    }
    try {
      const ch = new BroadcastChannel(CH);
      ch.postMessage({ type: "focus-request", from: selfId });
    } catch (e) {
    }
    if (window.opener) {
      setTimeout(() => {
        try {
          window.close();
        } catch (e) {
        }
      }, 30);
    } else {
      go2.textContent = "已经通知那个页面，请手动切回那个标签";
    }
  });
  const closeBtn = document.getElementById("single-tab-close");
  if (closeBtn) closeBtn.addEventListener("click", () => {
    try {
      window.close();
    } catch (e) {
    }
    box.remove();
  });
}
function tryLock() {
  if (!navigator.locks || !navigator.locks.request) return Promise.resolve("unsupported");
  return new Promise((resolve2) => {
    let settled = false;
    let drop = null;
    navigator.locks.request(LOCK, { ifAvailable: true }, (lock) => {
      if (!lock) {
        settled = true;
        resolve2(null);
        return void 0;
      }
      settled = true;
      resolve2({ release: () => {
        if (drop) drop();
      } });
      return new Promise((r) => {
        drop = r;
      });
    }).catch(() => {
      if (!settled) resolve2(null);
    });
  });
}
async function fallbackBlocking(mount2) {
  let ch;
  try {
    ch = new BroadcastChannel(CH);
  } catch (e) {
    mount2();
    return;
  }
  const hasOther = await new Promise((resolve2) => {
    let done = false;
    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        resolve2(false);
      }
    }, 220);
    ch.onmessage = (e) => {
      const d = e.data || {};
      if (d.from === selfId) return;
      if (d.type === "who") ch.postMessage({ type: "here", from: selfId });
      if (d.type === "here" && !done) {
        done = true;
        clearTimeout(timer);
        resolve2(true);
      }
    };
    ch.postMessage({ type: "who", from: selfId });
  });
  if (hasOther) {
    overlay("blocked");
    return;
  }
  ch.onmessage = (e) => {
    const d = e.data || {};
    if (d.from !== selfId && d.type === "who") ch.postMessage({ type: "here", from: selfId });
    if (d.from !== selfId && d.type === "focus-request") {
      try {
        window.focus();
      } catch (err) {
      }
    }
  };
  mount2();
}
function installSingleTab(mount2) {
  if (typeof window === "undefined") return;
  let ch = null;
  try {
    ch = new BroadcastChannel(CH);
  } catch (e) {
    ch = null;
  }
  async function reactivate() {
    const go2 = document.getElementById("single-tab-go");
    if (go2) {
      go2.textContent = "正在接管…";
      go2.disabled = true;
    }
    if (ch) ch.postMessage({ type: "takeover", from: selfId });
    for (let i = 0; i < 15; i++) {
      await sleep(120);
      const r = await tryLock();
      if (r && r !== "unsupported") {
        location.reload();
        return;
      }
    }
    if (go2) {
      go2.textContent = "另一个页面还没让开，点我再试";
      go2.disabled = false;
    }
  }
  function takeoverHint() {
    if (document.getElementById("single-tab-hint")) return;
    const bar = document.createElement("div");
    bar.id = "single-tab-hint";
    bar.innerHTML = `
      <div style="position:fixed;left:12px;right:12px;top:calc(env(safe-area-inset-top,0px) + 10px);z-index:9998;
                  display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;
                  background:#1D6A58;color:#fff;font-size:12.5px;line-height:1.6;
                  box-shadow:0 6px 20px rgba(18,26,23,.22);font-family:-apple-system,'PingFang SC',system-ui,sans-serif">
        <span style="flex:1">已在当前页面接管。之前打开的那个页面已经停用，<b>可以关掉了</b>。</span>
        <button id="single-tab-hint-close" aria-label="关闭提示"
          style="flex:0 0 auto;width:26px;height:26px;border:0;border-radius:8px;background:rgba(255,255,255,.16);color:#fff;font-size:15px">×</button>
      </div>`;
    document.body.appendChild(bar);
    const close = document.getElementById("single-tab-hint-close");
    close.addEventListener("click", () => bar.remove());
    setTimeout(() => {
      if (bar.parentNode) bar.remove();
    }, 6e3);
  }
  let activeHandle = null;
  const startApp = (handle) => {
    activeHandle = handle;
    if (ch) {
      ch.onmessage = (e) => {
        const d = e.data || {};
        if (d.from && d.from === selfId) return;
        if (d.type === "who") ch.postMessage({ type: "here", from: selfId });
        if (d.type === "focus-request") {
          try {
            window.focus();
          } catch (err) {
          }
        }
        if (d.type === "takeover" && activeHandle) {
          const h2 = activeHandle;
          activeHandle = null;
          try {
            h2.release();
          } catch (err) {
          }
          if (ch) ch.postMessage({ type: "released", from: selfId });
          overlay("standby", () => reactivate());
        }
      };
    }
    mount2();
  };
  window.addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    if (document.getElementById("single-tab-hold")) reactivate();
  });
  (async () => {
    const first = await tryLock();
    if (first === "unsupported") {
      await fallbackBlocking(mount2);
      return;
    }
    if (first) {
      startApp(first);
      return;
    }
    if (ch) ch.postMessage({ type: "takeover", from: selfId });
    for (let i = 0; i < 10; i++) {
      await sleep(120);
      const r = await tryLock();
      if (r && r !== "unsupported") {
        startApp(r);
        takeoverHint();
        return;
      }
    }
    overlay("blocked");
  })();
}
const app = createApp(_sfc_main);
app.component("VarPopup", stdin_default$k);
app.component("VarButton", stdin_default$4);
app.component("VarSwitch", stdin_default);
app.component("VarInput", stdin_default$8);
window.$dialog = stdin_default$2;
window.$tip = tip;
const isAgentEntry = /agent\.html/i.test(location.pathname);
if (isAgentEntry) app.mount("#app");
else installSingleTab(() => app.mount("#app"));
