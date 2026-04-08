# 🍽️ Restaurant Ordering System
 
A multi-role restaurant management and ordering platform with separate applications for customers, kitchen staff, and administrators.
 
---
 
## 🛠 Tech Stack
 
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-007FFF?style=for-the-badge&logo=materialdesign&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A28CC?style=for-the-badge&logo=axios&logoColor=white)
 
---
 
## 🎯 System Roles
 
### 👥 Customer App
- Touch screen kiosk interface for ordering
- Browse menu by categories
- Search and filter items
- Customize items with modifiers
- Place orders for dine-in or take-away
- Checkout with card or cash payment
- Rate service and write reviews
- Submit complaints to admin
 
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
 
## 🎨 UI/UX Requirements
 
- All buttons and photos: **Minimum 48px × 48px**
- **High-contrast colors** for kitchen staff app readability
- **No keyboard input** for orders - only order numbers
- Customer name and phone number only needed for reviews and complaints
 
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
