# Sakeena — Muslim Student Matchmaking Platform
### Ultra-Premium Interactive Product Demonstration
**Client:** Olympia Enterprises LLC  
**Product:** Sakeena (`meetsakeena.com`)  
**Proposition:** *Meet, chat and match — free.*

---

## 📖 Overview

Sakeena is an ultra-premium matchmaking website engineered specifically for Muslim college and university students across:
- **United States**
- **GCC Countries**
- **Southeast Asia**
- **Canada**

Built with an editorial, natural design aesthetic that communicates peace, trust, comfort, authenticity, and simplicity. It features the client's strict official color palette (**Cream `#FAF4EA`**, **Sand `#E8DCC3`**, **Warm Gold `#C99A2E`**, **Soft Terracotta `#A34D28`**, and **Deep Warm Brown `#2B2118`**), editorial serif typography (**Cormorant Garamond** & **Inter**), with 0% green, 0% teal, and no cliché iconography.

---

## 🚀 Key Features Implemented

1. **Brand Loading Screen:** Elegant cream & gold line expansion transition with tagline: *"A little more peace in finding your people."*
2. **Cinematic Hero:** Authentic young adult Muslim man on left, young adult Muslim woman in cream/sand hijab on right, clear center space with headline *"All colleges and universities — have college friends worldwide."* and Free Forever badge. Faces remain completely unobstructed on all viewports.
3. **Quick Signup:** "I am a: Man/Woman" & "Looking for: Woman/Man" controls that carry selections directly into registration.
4. **2-Minute Signup Flow (`/join`):** 3-stage progress collecting only the 6 required details (Name, Email, Age, Gender, Location, 1 Photo). Interactive drag-and-drop photo upload simulation with instant preview.
5. **Community Browse & Search (`/browse`):** 8 sample student profiles across 4 regions, all labeled with `SAMPLE PROFILE` badges. Functional search, filtering (Region, Denomination, Age), and sorting.
6. **Detailed Member Profiles (`/profile/:id`):** Photo gallery, education & interests, compatibility percentage, Report modal, and Block modal (which hides the profile from browsing).
7. **Messaging Suite (`/messages`):** Chat with sample conversations, read receipts, and accurate membership rule enforcement (Free male reply restriction, Complimentary Silver female quota, Gold/Elite unlimited).
8. **30-Second Compatibility Quiz (`/personality-quiz`):** 5-question values quiz generating *"Your Compatibility Snapshot"* and updating browse compatibility scores.
9. **My Profile Management (`/my-profile`):** Edit biography, university, interests, and manage photos with simulated *"Pending Approval"* moderation review. Includes interactive Account Deletion simulation.
10. **Membership & Pricing (`/membership`):** Exact pricing tiers (**Silver $5.50 basic**, **Gold $9.50/mo**, **Elite $12.50/mo**) with 1, 3, and 12-month billing periods and Women's Complimentary Silver explanation.
11. **Safety, Privacy & Terms (`/privacy`, `/terms`):** Detailed editorial policy demonstration pages.
12. **Admin Demonstration (`/demo-admin`):** Moderation dashboard with metric cards, member directory, photo approval/reject queue, and community reports log.
13. **Top Demo Switcher Bar:** Allows instant switching between personas (*Tariq [Male Free]*, *Maryam [Female Silver]*, *Zayd [Male Gold]*, and *Guest*), plus one-click demo data reset.

---

## 🛠️ Tech Stack

- **React 19**
- **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (icons)
- **React Router 7**

---

## 🌐 Netlify Deployment

This repository is pre-configured for instant zero-configuration deployment to Netlify:
- `netlify.toml` configured with `command = "npm run build"`, `publish = "dist"`, and SPA fallback redirects.
- `public/_redirects` included as an additional routing safeguard.

### Build Locally
```bash
npm install
npm run build
npm run preview
```
