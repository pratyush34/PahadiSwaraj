
---

# 🏔️ HimShakti – Sustaining Himalayan Heritage & Economies

HimShakti is an agri-allied commerce and community platform designed to bridge the gap between isolated mountain farms in Uttarakhand and the national marketplace. By organizing farming collectives, preserving organic ancestral practices, and establishing direct-to-consumer digital channels, HimShakti empowers local cultivators and builds a resilient, self-sustaining rural economy.

## 🚀 Project Overview

The background of this initiative is rooted in solving one of Uttarakhand’s most pressing socio-economic challenges: rural out-migration, locally known as **"palayan."**

Despite the Himalayas possessing a rich biodiversity and a unique agricultural heritage—producing high-value, nutrient-dense crops like **Jakhiya**, authentic **red rice**, and medicinal-grade **turmeric**—mountain farmers have historically struggled to build profitable livelihoods. This is primarily due to fragmented terrace landholdings, difficult terrain, and a severe lack of direct market access. Traditionally, middlemen absorb the margins, leaving the primary cultivators—predominantly women—economically stagnant.

The integrated model of agri-allied commerce was developed to reverse this trend by creating a self-sustaining, localized economy:

* **Bypassing Supply Bottlenecks:** Through brands like HimShakti, the platform bridges the gap between isolated mountain farms and the national market by organizing farming collectives, maintaining organic ancestral practices, and utilizing e-commerce platforms to sell premium goods.
* **Empowering the Backbone:** By dealing directly with the community, the ecosystem ensures fair pricing and financial independence for local women, who form the absolute backbone of mountain agriculture.
* **Micro-Market & Digital Scale:** The platform creates a unified digital storefront and logistics framework that allows high-value, niche Himalayan products to reach health-conscious urban consumers nationwide.
* **Closed-Loop Ecosystem:** Ultimately, this builds a profitable, modern rural economy that preserves indigenous agriculture, honors ancestral farming traditions, and incentivizes the next generation to stay, cultivate, and thrive in the hills.

---

## ✨ Features

### 🌾 Collective & Inventory Management

* **Producer Collective Portals:** Tools to track yields across distributed village farming collectives.
* **Authenticity & Batch Tracking:** Digital logging of harvest dates, locations, and organic certification steps.
* **Fair Pay Ledger:** Transparent pricing tracking ensuring direct margins reach the cultivators without middleman deductions.

### 🛒 E-Commerce & Marketplace

* **Premium Product Showcase:** Dedicated digital storefront for heritage crops (Jakhiya, Himalayan Red Rice, High-Curcumin Turmeric).
* **Sub-Regional Storytelling:** Product pages integrated with the cultural history and geography of the specific valleys they were harvested from.
* **Subscription & Bulk Ordering:** Specialized fulfillment streams for health-focused consumer subscriptions and commercial culinary partners.

### 📊 Impact & Analytics Dashboard

* **Economic Impact Tracker:** Visual metrics demonstrating community payout growth and direct-to-farmer revenue shares.
* **Supply Chain Analytics:** Predictive demand mapping to help farming collectives plan seasonal crops effectively.
* **Palayan Mitigation Metrics:** Community data visualizations showing regional economic stabilization indicators.

---

## 🛠️ Tech Stack

### Frontend

* React.js / Vite
* Tailwind CSS v4
* React Router DOM
* React Context API (State Management)
* Recharts (Impact & Yield Visualization)

### Backend & Database

* Node.js / Express.js
* PostgreSQL (Supabase) for structured regional inventory and transaction management
* CORS / dotenv / Postman (API Testing)

---

## 📂 Project Structure

```plaintext
himshakti/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   └── .gitignore
│
└── src/
    ├── assets/
    │   └── logo.png
    │
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── Card.jsx
    │   ├── Footer.jsx
    │   │
    │   └── ui/
    │       ├── Button.jsx
    │       ├── Input.jsx
    │       ├── Modal.jsx
    │       ├── Toast.jsx
    │       ├── Loader.jsx
    │       └── index.jsx
    │
    ├── context/
    │   └── ThemeContext.jsx
    │
    ├── Pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Dashboard.jsx
    │   ├── Marketplace.jsx
    │   ├── Login.jsx
    │   └── ComponentsDemo.jsx
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css

```

---

## 🔗 Core API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/api/products` | Fetch all available heritage agricultural items |
| **GET** | `/api/products/:id` | Fetch details for a specific item/batch |
| **POST** | `/api/collectives/harvest` | Log a new harvest batch from a village farming collective |
| **GET** | `/api/analytics/impact` | Retrieve real-time metrics on direct farmer payouts |
| **GET** | `/api/products/search/origin/:region` | Search and filter crops by specific sub-regions/valleys |

---

## 🌐 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/patraomsai38/StaySense---AI-Powered-Homestay-insights.git
cd hemshakti

```

### 2. Install & Run Frontend

```bash
npm install
npm run dev

```

*Frontend Local URL: `http://localhost:5173/*`

### 3. Install & Run Backend

```bash
cd backend
npm install
npm run dev

```

*Backend Local URL: `http://localhost:5000/*`

---

## 📌 Project Status

* **✅ Completed:** Core frontend responsive layout, interactive impact analytics dashboard charts, dynamic product explorer with multi-attribute filtering, modular UI component library, and backend architecture setup with clean Express routing and tested CRUD frameworks.
* **🚧 In Progress:** Setting up PostgreSQL database layers to manage real-time collective inventories and securing production API testing lifecycles.
* **🔮 Future Enhancements:** Supply chain batch validation tracking via open ledger frameworks, seasonal agricultural yield prediction models, and direct payout notifications to local self-help groups (SHGs).

---

## 👨‍💻 Developer

**Pratyush Nautiyal**

B.Tech Computer Science and Engineering

Graphic Era University