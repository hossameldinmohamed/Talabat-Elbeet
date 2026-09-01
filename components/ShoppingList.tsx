"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { STORES, storeById, emojiForItem } from "@/lib/data";

export type Item = {
  id: string;
  name: string;
  quantity: string;
  store: string;
  note: string | null;
  addedByName: string;
  createdAt: string;
};

export default function ShoppingList({
  initialItems,
  userName,
}: {
  initialItems: Item[];
  userName: string;
}) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [filter, setFilter] = useState<string>("ALL");
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/items", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items ?? []);
      }
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(refresh, 12000);
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, [refresh]);

  async function handleBought(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    await fetch(`/api/items/${id}`, { method: "DELETE" });
  }

  const storesInUse = STORES.filter((s) => items.some((i) => i.store === s.id));
  const visibleItems = filter === "ALL" ? items : items.filter((i) => i.store === filter);

  return (
    <main className="min-h-screen pb-28">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-brand-700">🛒 طلبات البيت</h1>
            <p className="text-xs text-gray-500">أهلاً {userName}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-sm text-gray-500 hover:text-red-600"
          >
            خروج
          </button>
        </div>

        <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter("ALL")}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              filter === "ALL"
                ? "bg-brand-600 text-white border-brand-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            الكل ({items.length})
          </button>
          {storesInUse.map((s) => (
            <button
              key={s.id}
              onClick={() => setFilter(s.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border-2 transition ${
                filter === s.id ? "text-white border-transparent" : "bg-white"
              }`}
              style={
                filter === s.id
                  ? { backgroundColor: s.color }
                  : { borderColor: s.color, color: s.color }
              }
            >
              {s.name} ({items.filter((i) => i.store === s.id).length})
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-4 pt-4">
        {visibleItems.length === 0 ? (
          <div className="text-center text-gray-400 mt-24">
            <div className="text-5xl mb-3">📝</div>
            <p>القائمة فاضية دلوقتي</p>
            <p className="text-sm">دوس على زرار الإضافة تحت عشان تضيف حاجة</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {visibleItems.map((item) => {
              const store = storeById(item.store);
              return (
                <li
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm p-3 flex items-center gap-3"
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-brand-50 flex items-center justify-center text-2xl">
                    {emojiForItem(item.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-gray-800 truncate">{item.name}</span>
                      <span className="text-sm text-gray-500 shrink-0">{item.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${store.color}1f`, color: store.color }}
                      >
                        {store.name}
                      </span>
                    </div>
                    {item.note && <p className="text-xs text-gray-500 mt-1">{item.note}</p>}
                  </div>

                  <button
                    onClick={() => handleBought(item.id)}
                    aria-label="تم الشراء"
                    className="w-10 h-10 shrink-0 rounded-full border-2 border-brand-500 flex items-center justify-center text-brand-600 text-lg hover:bg-brand-50 active:scale-95 transition"
                  >
                    ✓
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Link
        href="/add"
        className="fixed bottom-6 inset-x-0 mx-auto w-fit bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-4 rounded-full shadow-lg flex items-center gap-2 active:scale-95 transition"
      >
        <span className="text-xl leading-none">+</span>
        إضافة طلب
      </Link>

      {refreshing && (
        <div className="fixed top-2 inset-x-0 mx-auto w-fit text-xs text-gray-400">
          جاري التحديث...
        </div>
      )}
    </main>
  );
}
