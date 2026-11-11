import { a as addProfile, s as switchProfile, g as getOrCreateProfile, i as initStorage, C as COLLECTIONS, b as storage } from "./schema-B4DNvIYP.js";
function fromBase64(b64) {
  const bin = atob(String(b64 || ""));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}
function say(text) {
  const el = document.getElementById("msg");
  if (el) el.textContent = text;
}
window.addEventListener("message", async (event) => {
  const d = event.data || {};
  if (d.type !== "stall-boot") return;
  say("正在写入数据…");
  try {
    const pack = JSON.parse(fromBase64(d.pack));
    const seed = pack && pack.seed || {};
    const c = seed.collections || {};
    const agent = pack.agent || {};
    const profileName = agent.name ? agent.name + "的店" : "代理店铺";
    const newId = addProfile(profileName);
    switchProfile(newId);
    const cur = getOrCreateProfile();
    await initStorage({ dbName: "stall3_" + cur.id });
    for (const name of COLLECTIONS) {
      if (Array.isArray(c[name])) await storage.write(name, c[name]);
    }
    if (seed.settings) await storage.write("settings", seed.settings);
    if (seed.meta) await storage.write("meta", seed.meta);
    say("写入完成，可以回代理页了");
    if (event.source) event.source.postMessage({ type: "stall-boot-ok", code: agent.code || "" }, "*");
  } catch (e) {
    say("写入失败：" + (e && e.message ? e.message : e));
    if (event.source) event.source.postMessage({ type: "stall-boot-error", message: String(e && e.message ? e.message : e) }, "*");
  }
});
try {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: "stall-boot-ready" }, "*");
  }
} catch (e) {
}
