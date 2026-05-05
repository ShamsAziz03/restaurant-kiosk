# 🍽️ Restaurant Ordering System
 
A multi-role restaurant management and ordering platform with separate applications for customers, kitchen staff, and administrators.
 
---
## Final Project — Asal Training | Computer Engineering
#### This is my final project developed during my training at **Asal Technologies**, in Frontend Development.
---
 
## 🛠 Tech Stack
 
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge&logo=husky&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
---
 
## 🎯 System Roles
 
### 👥 Customer App
- Touch screen kiosk interface for ordering
- Browse menu by categories
- Search and filter items
- Customize items with modifiers
- Place orders for dine-in or take-away
- Checkout with card using Stripe Payment.
 
### 👨‍🍳 Kitchen Staff App
- View live incoming orders instantly
- See order details, items, modifiers, and notes
- Mark orders as done
- Undo completed orders if needed
- Chat with admin for ingredient issues or replacements
 
### ⚙️ Admin App
- Manage menu (CRUD): categories, products, prices, modifiers
- Track all orders and filter by status, date, payment
- View customer complaints and communicate directly
- Monitor ratings and reviews from customers
- Manage kitchen staff and their details
- Chat with kitchen staff for coordination
- Create and manage promotional offers with date ranges
- View business analytics: sales by day/month, best/worst selling items, cancel rate, revenue
 
---

## ⚙️ Setup & Installation
 
```bash
# Clone the repository
git clone https://github.com/ShamsAziz03/restaurant-kiosk.git
 
# Navigate into the project
cd restaurant-kiosk
 
# Install dependencies
npm install
 
# Start development server
npm run dev
```
 
Visit `http://localhost:3000` in your browser.
