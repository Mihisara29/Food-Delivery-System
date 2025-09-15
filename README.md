# 🍽️ Food Delivery Platform  

A dedicated food delivery platform built for a specific restaurant, featuring separate web applications for **customers** and **admins**. The system provides a seamless experience for customers while giving admins full control over menus, orders, and customer data.  

---

## ✨ Features  

### 👤 Customer Web Application  
- **View Menu** – Browse all available food items with prices and descriptions  
- **Place Orders** – Add items to cart and confirm orders easily  
- **Secure Payments** – Integrated with **Stripe** for safe and smooth transactions  

### 🛠️ Admin Panel  
- **Manage Food Items** – Add, update, and remove menu items  
- **Track Orders** – Monitor real-time order status and view order history  
- **Customer Management** – Access and manage customer information  

---

## 🏗️ Tech Stack  

- **Frontend:** React  
- **Backend:** Spring Boot  
- **Database:** MongoDB  
- **Payment Gateway:** Stripe  
- **Cloud Storage:** AWS S3  
- **Authentication:** Spring Security  

---

## 🖼️ System Architecture  

```mermaid
graph TD;
    A[Customer Web App] -->|REST API| B[Spring Boot Backend]
    C[Admin Panel] -->|REST API| B[Spring Boot Backend]
    B --> D[MongoDB Database]
    B --> E[AWS S3 - Image Storage]
    B --> F[Stripe - Payment Gateway]
````

This diagram shows how customers and admins interact with the backend, which handles business logic, connects to the database, manages storage on AWS S3, and processes payments via Stripe.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v16+)
* **Java JDK** (11 or 17)
* **MongoDB** (local or MongoDB Atlas)
* **AWS Account** with S3 bucket set up
* **Stripe Account** with API keys

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Mihisara29/food-delivery-platform.git
cd food-delivery-platform
```

2. **Frontend Setup:**

```bash
cd customer-app
npm install
npm start
```

3. **Backend Setup:**

```bash
cd backend
./mvnw spring-boot:run
```

4. **Environment Variables:**
   Create a `.env` file in the backend directory and configure:

```
MONGO_URI=your_mongo_db_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_bucket_name
```

---

## 📸 Demo Video

🔗 [Watch the Demo on LinkedIn](https://www.linkedin.com/posts/induwara-mihisara-9572712a4_reactjs-springboot-mongodb-activity-7345539785383452672-8CDA?utm_source=share&utm_medium=member_desktop)

---

## 📦 Deployment

* **Frontend:** Deploy on **Netlify**, **Vercel**, or any static hosting service
* **Backend:** Deploy on **AWS EC2**, **Render**, or **Heroku**

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📬 Contact

**Induwara Mihisara**
📧 Email: [induwaramihisara@gmail.com](mailto:induwaramihisara@gmail.com)
🔗 GitHub: [@Mihisara29](https://github.com/Mihisara29)

**🔗 Project Link:** [Food Delivery Platform](https://github.com/Mihisara29/food-delivery-platform)

