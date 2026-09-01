export type Store = {
  id: string;
  name: string;
  color: string;
};

export const STORES: Store[] = [
  { id: "ANY", name: "أي ماركت", color: "#6b7280" },
  { id: "REWE", name: "Rewe", color: "#cc0000" },
  { id: "NETTO", name: "Netto", color: "#ffcc00" },
  { id: "LIDL", name: "Lidl", color: "#0050aa" },
  { id: "KAUFLAND", name: "Kaufland", color: "#e2001a" },
  { id: "EDEKA", name: "Edeka", color: "#1a6d3c" },
  { id: "ALDI", name: "Aldi", color: "#00447c" },
  { id: "PENNY", name: "Penny", color: "#e2001a" },
  { id: "OTHER", name: "تاني", color: "#4b5563" },
];

export function storeById(id: string): Store {
  return STORES.find((s) => s.id === id) ?? STORES[0];
}

export const UNITS: string[] = ["كيلو", "حبة", "جرام", "علبة", "لتر", "ربطة", "كيس"];
export const DEFAULT_UNIT = "كيلو";

export type Category = {
  id: string;
  name: string;
  emoji: string;
  items: string[];
};

export const CATEGORIES: Category[] = [
  {
    id: "veg",
    name: "خضروات",
    emoji: "🥦",
    items: [
      "طماطم",
      "خيار",
      "بصل",
      "ثوم",
      "بطاطس",
      "فلفل ألوان",
      "كوسة",
      "باذنجان",
      "جزر",
      "خس",
      "سبانخ",
      "فطر",
      "ليمون",
      "بقدونس",
      "كزبرة",
      "فجل",
    ],
  },
  {
    id: "fruit",
    name: "فاكهة",
    emoji: "🍎",
    items: [
      "تفاح",
      "موز",
      "برتقال",
      "عنب",
      "فراولة",
      "بطيخ",
      "مانجو",
      "أناناس",
      "كمثرى",
      "خوخ",
      "رمان",
    ],
  },
  {
    id: "dairy",
    name: "ألبان وبيض",
    emoji: "🥛",
    items: [
      "لبن",
      "زبادي",
      "جبنة شيدر",
      "جبنة موتزاريلا",
      "جبنة قريش",
      "زبدة",
      "بيض",
      "كريمة طبخ",
      "لبن رايب",
    ],
  },
  {
    id: "meat",
    name: "لحوم ودواجن وأسماك",
    emoji: "🍗",
    items: ["فراخ", "لحمة مفرومة", "لحمة بقري", "سجق", "سمك", "لانشون", "برجر"],
  },
  {
    id: "bakery",
    name: "مخبوزات وحبوب",
    emoji: "🍞",
    items: ["عيش توست", "عيش بلدي", "أرز", "مكرونة", "دقيق", "شوفان", "كرواسون"],
  },
  {
    id: "pantry",
    name: "بقالة ومعلبات",
    emoji: "🥫",
    items: [
      "سكر",
      "ملح",
      "زيت",
      "زيت زيتون",
      "شاي",
      "قهوة",
      "عسل",
      "طحينة",
      "صلصة طماطم",
      "توابل",
      "فول",
      "ذرة معلبة",
      "تونة معلبة",
      "مكسرات",
      "شيبسي",
      "بسكويت",
    ],
  },
  {
    id: "drinks",
    name: "مشروبات",
    emoji: "🧃",
    items: ["مياه معدنية", "عصير", "مياه غازية", "مشروب طاقة"],
  },
  {
    id: "cleaning",
    name: "تنظيف المنزل",
    emoji: "🧽",
    items: [
      "منظف أطباق",
      "مسحوق غسيل",
      "منعم ملابس",
      "مناديل تنظيف",
      "كيس زبالة",
      "ورق تواليت",
      "مطهر أرضيات",
      "اسفنج",
    ],
  },
  {
    id: "personal",
    name: "عناية شخصية",
    emoji: "🧴",
    items: ["شامبو", "معجون أسنان", "صابون", "مناديل ورقية", "مزيل عرق"],
  },
  {
    id: "other",
    name: "أخرى",
    emoji: "🛒",
    items: [],
  },
];

export function emojiForItem(name: string): string {
  const category = CATEGORIES.find((c) => c.items.includes(name));
  return category?.emoji ?? "🛒";
}
