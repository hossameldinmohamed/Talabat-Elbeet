<div align="center">

# 🛒 Talabat Elbeet — طلبات البيت

**One shared grocery list for the whole household.**
Everyone adds items from their own phone, everyone sees the same list — and when you buy something, tap ✓ and it's gone for everyone.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-Neon-4169E1?logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![PWA](https://img.shields.io/badge/PWA-iPhone%20%26%20Android-5A0FC8)

<img src="docs/screenshots/list.png" width="260" alt="The shared shopping list">

</div>

> **Note:** The app's interface is in Arabic (right-to-left). This README is in English.

---

## ✨ Features

| | |
|---|---|
| 👥 **One shared list** | Everyone has their own login, but sees the same list |
| 🥦 **Ready-made categories** | Vegetables, fruit, dairy, meat, cleaning… or type any item and it's saved to that category for next time |
| ⚖️ **Quantity & unit** | Quantity counter + kilo / piece / gram / pack / liter… or any custom unit |
| 🏪 **Pick the store** | Rewe, Netto, Lidl, Kaufland, Edeka, Aldi, Penny, Arabic shop, or "any store" |
| 🔎 **Filter by store** | Standing in Lidl? Show only the Lidl items |
| 🔄 **Auto-refresh** | The list refreshes every 12 seconds and whenever you return to the app |
| 📱 **Feels like a native app** | Add it to your phone's home screen with its own icon (PWA) |
| 🔒 **Private to your household** | Sign-up requires a secret code and closes automatically after the number of accounts you allow |

## 📸 Screenshots

<div align="center">

| Shopping list | Filter by store | Pick a category |
|:---:|:---:|:---:|
| <img src="docs/screenshots/list.png" width="220"> | <img src="docs/screenshots/filter.png" width="220"> | <img src="docs/screenshots/add-category.png" width="220"> |
| **Pick an item** | **Quantity & store** | **Sign up** |
| <img src="docs/screenshots/add-items.png" width="220"> | <img src="docs/screenshots/add-details.png" width="220"> | <img src="docs/screenshots/register.png" width="220"> |

</div>

---

## 🚀 Deploy your own in ~15 minutes (free)

All you need is a **GitHub** account and a **Vercel** account (sign up to Vercel with GitHub). Nothing to install on your computer.

> 💡 Every deployment is fully independent: its own database, its own accounts. Nobody can see anyone else's data.

### Step 1 — Get the code onto your GitHub

**If you have access to the repo on GitHub:** click **Fork** at the top right. Done.

**If you received the code as a zip:** unzip it, create an empty repo on GitHub called `talabat-elbeet` (preferably **Private**), then from inside the folder:

```bash
git init
git add .
git commit -m "Talabat Elbeet"
git branch -M main
git remote add origin https://github.com/<your-username>/talabat-elbeet.git
git push -u origin main
```

### Step 2 — Create the project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new), pick the `talabat-elbeet` repo → **Import**.
2. Leave all settings as they are and click **Deploy**.

> ⚠️ **The first deploy will fail — that's expected.** There's no database yet. We just need the project to exist so we can continue.

### Step 3 — Create the database (Postgres)

1. On the project page in Vercel → **Storage** tab → **Create Database**.
2. Choose **Neon** (Serverless Postgres) → the free plan is more than enough → pick the region closest to you (e.g. Frankfurt if you're in Germany).
3. **Connect** it to the project, keeping all environments (Production / Preview / Development) checked.

Vercel adds several environment variables automatically. The important ones:
- `DATABASE_URL` ← the app uses this one directly ✅
- `DATABASE_URL_UNPOOLED` ← we'll copy this under another name in the next step

### Step 4 — Add the remaining environment variables

Go to **Settings → Environment Variables** and add:

| Name | Value | Where do I get it? |
|---|---|---|
| `DIRECT_URL` | Same value as `DATABASE_URL_UNPOOLED` | On the same page, click 👁 on `DATABASE_URL_UNPOOLED` and copy it |
| `NEXTAUTH_SECRET` | A long random string | macOS/Linux: `openssl rand -base64 32` — or any 32+ character random password from a password generator |
| `REGISTRATION_CODE` | A secret code of your choice | e.g. `bamya-2026` — share it only with your household |
| `NEXTAUTH_URL` | Your site's URL | On the Vercel project page under **Domains**, e.g. `https://talabat-elbeet-xyz.vercel.app` |
| `MAX_USERS` | Number of accounts allowed | Optional — defaults to `2`. A household of 4? Set it to `4` |

> 🔑 **Never reuse someone else's `NEXTAUTH_SECRET` or `REGISTRATION_CODE`.** Make your own.

### Step 5 — Redeploy 🎉

New environment variables only apply to new deployments:

**Deployments** → latest deployment → **⋯** → **Redeploy**.

This time it succeeds. The database tables are created automatically during the build — nothing to do manually.

### Step 6 — Create the accounts

1. Open your site → tap **"سجّل من هنا"** (*Sign up here*).
2. Enter your email, a password (at least 6 characters), and the `REGISTRATION_CODE`.
3. Everyone else in the household does the same from their own phone.
4. Once the number of accounts reaches `MAX_USERS`, sign-up closes — nobody else can register, even with the code.

> ℹ️ The name shown in the greeting ("أهلاً …" / *Hello …*) is the part of the email before the `@`.

---

## 📱 Add it to your home screen

<table>
<tr>
<td width="50%" valign="top">

**🍎 iPhone (Safari)**
1. Open the site in **Safari** (not Chrome).
2. Tap the Share button ⬆️.
3. Choose **Add to Home Screen**.

</td>
<td width="50%" valign="top">

**🤖 Android (Chrome)**
1. Open the site in **Chrome**.
2. Tap ⋮ at the top.
3. Choose **Install app** or **Add to Home screen**.

</td>
</tr>
</table>

From then on it opens from its icon like any other app, without the browser bar.

---

## 🛠️ Easy customization

All the preset data lives in one file: [`lib/data.ts`](lib/data.ts)

| Want to change… | Edit |
|---|---|
| Stores (name and color) | `STORES` |
| Categories and preset items | `CATEGORIES` |
| Units (kilo, piece…) | `UNITS` and `DEFAULT_UNIT` |

After you `git push`, Vercel deploys the change automatically.

---

## 🩺 Troubleshooting

| Problem | Fix |
|---|---|
| Build fails with `Environment variable not found: DATABASE_URL` or `DIRECT_URL` | Make sure both exist under **Environment Variables**, then **Redeploy** |
| Added variables but nothing changed | You must **Redeploy** after any change to environment variables |
| Logging in sends you back to the login page | `NEXTAUTH_URL` must exactly match your site URL (with `https://`, no trailing `/`), and `NEXTAUTH_SECRET` must be set |
| "كود الدعوة غير صحيح" (*Invalid invite code*) | The code is case- and space-sensitive. Double-check `REGISTRATION_CODE` |
| "تم إنشاء كل الحسابات المسموح بها" (*All allowed accounts already created*) | Increase `MAX_USERS` and **Redeploy** |
| Forgot a password | There's no reset in the app. In Vercel → **Storage** → Neon → open the SQL console, delete that row from the `User` table, then sign up again |

---

## 💻 Run locally (for developers — optional)

You need **Node.js 18+** and a Postgres database. The easiest way is Docker:

```bash
# 1) Local database
docker run -d --name talabat-db -e POSTGRES_PASSWORD=pw -e POSTGRES_DB=talabat -p 5432:5432 postgres:16-alpine

# 2) Environment variables
cp env.sample .env      # .env is git-ignored; both Next.js and Prisma read it
#    then set in .env:
#    DATABASE_URL="postgresql://postgres:pw@localhost:5432/talabat"
#    DIRECT_URL="postgresql://postgres:pw@localhost:5432/talabat"
#    NEXTAUTH_URL="http://localhost:3000"
#    + any values for NEXTAUTH_SECRET and REGISTRATION_CODE

# 3) Run
npm install
npm run db:push      # creates the tables
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Runs the app locally |
| `npm run db:push` | Creates/updates the database tables |
| `npm run db:studio` | Opens a UI to browse and edit the data |
| `npm run build` | Same as Vercel: prepares the tables and builds the app |

### Project structure

```
app/
  page.tsx            ← main shopping list
  add/                ← add-item flow
  login/ register/    ← login and sign-up
  api/                ← items, custom-items, register, auth
components/           ← ShoppingList, AddItemFlow
lib/data.ts           ← stores, categories, units
prisma/schema.prisma  ← database schema
public/               ← icons and PWA manifest
```

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · NextAuth · Prisma · PostgreSQL (Neon on Vercel)

---

<div align="center">

Made with love for the household 🏠💚

</div>
