# 🍽️ Restaurant Ordering System
 
A multi-role restaurant management and ordering platform with separate applications for customers, kitchen staff, and administrators.

 ### Full Demo Link: https://drive.google.com/file/d/1qAZCfQEVfU0LP2d8gHI-cT_YgoePx8Rz/view?usp=sharing
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
![bcrypt](https://img.shields.io/badge/bcrypt-323330?style=for-the-badge&logoColor=white)
![Fuse.js](https://img.shields.io/badge/Fuse.js-000000?style=for-the-badge&logoColor=white)
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
- See order details, items, modifiers, and notes
- Change status of orders like complete
- Undo completed orders if needed
- edit their informations
 
### ⚙️ Admin App
- Manage menu (CRUD): categories, products, prices, extra items, with fuzzy search
- Track all orders and filter by status, type
- View customer complaints and communicate directly
- Manage kitchen staff and other admins and add new ones or delete.
- View business analytics: sales by month, cancel and pending orders number, revenue
 
---

# ⚙️ Setup & Installation
 
## Prerequisites
 
Before you begin, ensure you have the following installed on your system:
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **MySQL** (v8.0 or higher)
- **Git**
## Step 1: Clone the Repository
 
```bash
# Clone the repository
git clone https://github.com/ShamsAziz03/restaurant-kiosk.git
 
# Navigate into the project
cd restaurant-kiosk
```
 
## Step 2: Create Database & Environment Configuration
 
### Create MySQL Database
 
First, create a MySQL database for your project:
 
```bash
# Login to MySQL
mysql -u root -p
 
# In MySQL console, create a new database
CREATE DATABASE restaurant_kiosk;
 
# Exit MySQL
EXIT;
```
 
### Configure Environment Variables
 
Create a `.env.local` file in the root directory of your project and add the following configuration:
 
```bash
# Database Configuration
DATABASE_URL="mysql://root:your_password@localhost:3306/restaurant_kiosk"
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="your_password"
DB_PORT="3306"
DB_NAME="restaurant_kiosk"
 
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
 
# Application Password
PASSWORD="your_secure_password"
```
 
### Update Placeholders
 
Replace the following values with your actual credentials:
- `your_password` - Your MySQL root password
- `restaurant_kiosk` - Your desired database name
- `your_stripe_publishable_key` - Your Stripe publishable key (get from Stripe dashboard)
- `your_stripe_secret_key` - Your Stripe secret key (get from Stripe dashboard)
- `your_secure_password` - A secure password for your application
## Step 3: Set Up Stripe Account
 
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create a new Stripe account or log in to an existing one
3. Navigate to the **API keys** section in your account settings
4. Copy your:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)
5. Add these keys to your `.env.local` file (as shown in Step 2)
## Step 4: Install Dependencies
 
```bash
npm install
```
 
## Step 5: Initialize Prisma & Database
 
### Generate Prisma Client
 
```bash
npx prisma generate
```
 
### Run Database Migrations
 
```bash
npx prisma migrate dev
```
 
This command will:
- Create all necessary database tables
- Set up the schema based on your Prisma schema file
- Generate the Prisma client
### Seed the Database (Optional)
 
If you have seed data configured:
 
```bash
npx prisma db seed
```
 
This will populate your database with initial data.
 
## Step 6: Start the Development Server
 
```bash
npm run dev
```
 
The application will start on `http://localhost:3000`
