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
 
## 🚀 Features
 
### 🟢 Customer App
- **Attract Screen**: Rotating slideshow with "Touch Here to Order" and "Send a Complaint" buttons
- **Order Flow**: Welcome → Order Type → Browse Menu → Search/Filter → Item Details → Customization → Cart → Checkout → Payment → Confirmation → Rating
- **Menu Categories**: Navigate by category with always-visible cart sidebar
- **Search**: Supports item name, partial text, and misspellings
- **Filters**: Sort by price (lowest/highest), popularity, top rated, available now
- **Item Customization**: Quantity selection with modifier checkboxes (extra cheese, beverages, etc.)
- **Cart Management**: View items, modify quantities, delete items
- **Payment Options**: Card (Stripe) or Cash at Counter
- **Order Confirmation**: Display order number and option to rate service
- **Ratings & Reviews**: Star rating with comment, linked to order number
- **Complaint System**: Direct communication with admin including user name and phone number
- **Idle Timeout**: 45 seconds of inactivity triggers "Are you still there?" popup with 15-second countdown; clears cart if no response
 
### 🟠 Kitchen Staff App
- **Live Orders**: Display new orders instantly with order number, item list, modifiers, and notes
- **Order Status**: Button to change order status to "Done"
- **Completed Orders**: View completed orders and undo if accidentally marked
- **Kitchen Communication**: Chat with admin for ingredient unavailability or replacements
- **Design**: Large buttons (minimum 48px × 48px), high-contrast colors for visibility
 
### 🔵 Admin App
- **Dashboard**: Charts showing order count, canceled orders, pending/late orders, revenue
- **Order Management**: View all orders, filter by status/date/payment method
- **Menu Management**: Create, read, update, delete categories, products, prices, modifiers
- **Complaint Management**: View and resolve customer complaints
- **Reviews Management**: Monitor customer ratings and reviews
- **Staff Management**: View kitchen staff list and details
- **Internal Messaging**: Chat with kitchen staff
- **Analytics & Reports**: Sales by day/month, best/worst selling items, cancel rate
- **Promotional Offers**: Create/update/delete offers with date ranges and discounts

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