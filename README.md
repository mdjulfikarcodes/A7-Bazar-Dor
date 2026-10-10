# 🛒 বাজার দর (BazarDor)

> বাংলাদেশের প্রতিদিনের বাজারদর এক নজরে — পণ্যের আজকের দাম, দামের পরিবর্তন, বাজারভিত্তিক তুলনা এবং বিস্তারিত তথ্য।

---

## 📖 Short Description

**বাজার দর (BazarDor)** হলো একটি ওয়েব অ্যাপ্লিকেশন যা বাংলাদেশের ব্যবহারকারীদের জন্য প্রতিদিনের বাজারদর, পণ্যের দামের ওঠানামা এবং বাজারভিত্তিক দামের তুলনা এক জায়গায় প্রদান করে। ব্যবহারকারীরা সহজেই জানতে পারবেন — আজ কোন পণ্যের দাম বেড়েছে, কোনটি কমেছে, এবং কোন বাজারে সবচেয়ে কম বা বেশি দামে পাওয়া যাচ্ছে। অ্যাপ্লিকেশনটি সম্পূর্ণ বাংলায় এবং মোবাইল, ট্যাবলেট ও ডেস্কটপ — সব ডিভাইসে সুন্দরভাবে কাজ করে।

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Framework, Routing, Server Components |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Responsive UI and utility-first styling |
| **DaisyUI** | Component library |
| **Better Auth** | Authentication (Email + Google + GitHub OAuth) |
| **MongoDB** | Database for users and sessions |

---

## ✨ 5 Key Features

### ১. 🔐 সম্পূর্ণ Authentication System
Email/Password দিয়ে Signup-Login এর সাথে Google ও GitHub OAuth সাপোর্ট। Better Auth দিয়ে session management এবং Protected Routes (Product, Profile, Profile Update) — যা login ছাড়া access করা যায় না।

### ২. 💰 Real-time Price Ticker (Marquee)
Header এর নিচে চলমান Marquee ticker-এ সব পণ্যের আজকের দাম ও পরিবর্তনের হার (▲ বেড়েছে / ▼ কমেছে) দেখায়, যা এক নজরে বাজারের সারসংক্ষেপ দেয়।

### ৩. 📊 বাজারভিত্তিক দামের তুলনা
প্রতিটি পণ্যের জন্য বিভিন্ন বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দাম আলাদা করে দেখানো হয় — mobile-এ card layout ও desktop-এ table view সহ।

### ৪. 📱 Fully Responsive & Bengali-First UI
Tailwind CSS দিয়ে mobile-first ডিজাইন। সব text বাংলায়, Noto Sans Bengali font এবং বাংলা সংখ্যায় (১, ২, ৩) দাম প্রদর্শন। প্রতিটি component mobile, tablet ও desktop এ perfectly adapt করে।

### ৫. ⚡ Skeleton Loading & Optimistic UI
প্রতিটি data fetch-এ Skeleton Loader ব্যবহার করা হয়েছে, যাতে user দ্রুত feedback পায়। Suspense ও Streaming এর মাধ্যমে page instant render হয় এবং smooth loading experience দেয়।

---

## 🧭 Application Flow Chart

```mermaid
flowchart TD
    A[👤 User] --> B[🏠 Home Page]
    B --> C[📂 Category Page]
    B --> D[🔥 Price Up Products]
    B --> E[❄️ Price Down Products]
    B --> F[📢 Marquee Ticker]

    C --> G[🛒 Product Details]
    G --> H{🔐 Login আছে?}

    H -->|না| I[🔑 Sign In Page]
    H -->|হ্যাঁ| J[📊 Full Details দেখায়]

    I --> K{Login সফল?}
    K -->|হ্যাঁ| G
    K -->|না| I

    J --> L[👤 Profile Page]
    L --> M[✏️ Profile Update]