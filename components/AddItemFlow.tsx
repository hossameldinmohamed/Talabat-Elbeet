"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, STORES, UNITS, Category } from "@/lib/data";

type Step = "category" | "items" | "details";

export default function AddItemFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<Category | null>(null);
  const [itemName, setItemName] = useState("");
  const [customName, setCustomName] = useState("");
  const [count, setCount] = useState(1);
  const [unit, setUnit] = useState<string>(UNITS[0]);
  const [customUnit, setCustomUnit] = useState("");
  const [store, setStore] = useState("ANY");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function goBack() {
    if (step === "details") setStep("items");
    else if (step === "items") setStep("category");
    else router.push("/");
  }

  function pickItem(name: string) {
    setItemName(name);
    setCount(1);
    setUnit(UNITS[0]);
    setCustomUnit("");
    setStore("ANY");
    setNote("");
    setStep("details");
  }

  async function submit() {
    if (!itemName.trim() || submitting) return;
    setSubmitting(true);
    const finalUnit = unit === "أخرى" ? customUnit.trim() || "أخرى" : unit;
    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: itemName.trim(),
        quantity: `${count} ${finalUnit}`,
        store,
        note,
      }),
    });
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen pb-10">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={goBack}
            className="w-9 h-9 shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
            aria-label="رجوع"
          >
            →
          </button>
          <h1 className="text-lg font-bold text-brand-700 truncate">
            {step === "category" && "اختار القسم"}
            {step === "items" && (category?.name ?? "اختار الصنف")}
            {step === "details" && itemName}
          </h1>
        </div>
      </header>

      <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-4 pt-4">
        {step === "category" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCategory(c);
                  setCustomName("");
                  setStep("items");
                }}
                className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center gap-2 hover:shadow-md active:scale-95 transition"
              >
                <span className="text-4xl">{c.emoji}</span>
                <span className="font-semibold text-gray-700">{c.name}</span>
              </button>
            ))}
          </div>
        )}

        {step === "items" && category && (
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {category.items.map((name) => (
                <button
                  key={name}
                  onClick={() => pickItem(name)}
                  className="bg-white rounded-full shadow-sm px-4 py-2 text-gray-700 font-medium hover:bg-brand-50 active:scale-95 transition"
                >
                  {name}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">مش لاقي الصنف؟ ضيفه هنا</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="اكتب اسم الصنف"
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  disabled={!customName.trim()}
                  onClick={() => pickItem(customName)}
                  className="bg-brand-600 disabled:opacity-40 text-white font-bold px-5 py-3 sm:py-0 rounded-xl"
                >
                  إضافة
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الكمية</label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCount((c) => Math.max(1, c - 1))}
                    className="w-11 h-11 shrink-0 rounded-xl bg-gray-100 text-gray-700 text-2xl font-bold flex items-center justify-center active:scale-95 transition"
                    aria-label="تقليل الكمية"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={count}
                    onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
                    className="w-20 text-center rounded-xl border border-gray-300 py-2.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setCount((c) => c + 1)}
                    className="w-11 h-11 shrink-0 rounded-xl bg-brand-100 text-brand-700 text-2xl font-bold flex items-center justify-center active:scale-95 transition"
                    aria-label="زيادة الكمية"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[...UNITS, "أخرى"].map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition ${
                        unit === u
                          ? "bg-brand-600 text-white border-brand-600"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {unit === "أخرى" && (
                <input
                  value={customUnit}
                  onChange={(e) => setCustomUnit(e.target.value)}
                  placeholder="اكتب الوحدة"
                  className="w-full mt-3 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                هنجيبها من فين
              </label>
              <div className="flex flex-wrap gap-2">
                {STORES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStore(s.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition ${
                      store === s.id ? "text-white border-transparent" : "bg-white text-gray-600"
                    }`}
                    style={
                      store === s.id
                        ? { backgroundColor: s.color }
                        : { borderColor: s.color, color: s.color }
                    }
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ملاحظة (اختياري)
              </label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="مثال: النوع اللي بيحبه بابا"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <button
              onClick={submit}
              disabled={submitting}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
            >
              {submitting ? "جاري الإضافة..." : "إضافة للقائمة"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
