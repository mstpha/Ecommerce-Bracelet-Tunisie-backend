# 🔧 E-commerce Bracelet Tunisia - Backend API

A robust and secure REST API backend for the E-commerce Bracelet Tunisia platform, built with Node.js, Express, and PostgreSQL.

## 📋 Project Description

This backend API provides all the server-side functionality for the E-commerce Bracelet Tunisia platform, including user authentication, product management, cart operations, and order processing. It features a RESTful architecture with JWT-based authentication and PostgreSQL for reliable data persistence.

## 🚀 Technologies Used

### Core
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database management system

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing and security
- **dotenv** - Environment variable management

### Database
- **pg (node-postgres)** - PostgreSQL client for Node.js
- Connection pooling for optimal performance

## 📦 Prerequisites

- **Node.js** (version 14.x or higher recommended)
- **PostgreSQL** (version 12.x or higher)
- **npm** or **yarn**

## 🔧 Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/mstpha/Ecommerce-Bracelet-Tunisie-Backend.git
cd Ecommerce-Bracelet-Tunisie-Backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Database Setup

#### Create PostgreSQL Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE ecommerce_bracelet_tunisia;

# Connect to the database
\c ecommerce_bracelet_tunisia
```

#### Import Database Schema
The `schema.sql` file contains all the necessary table definitions for the application. Import it into your PostgreSQL database:

```bash
psql -U postgres -d ecommerce_bracelet_tunisia -f schema.sql
```

This will create all required tables including:
- **users** - User account information
- **products** - Product catalog
- **cart** - Shopping cart items
- **orders** - Order history and details
- **order_items** - Individual items in each order

### 4. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_database_password
DB_NAME=ecommerce_bracelet_tunisia

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Important**: 
- Replace `your_database_password` with your actual PostgreSQL password
- Replace `your_super_secret_jwt_key_here` with a strong, random secret key
- Never commit the `.env` file to version control

### 5. Run the application

#### Development mode
```bash
npm run dev
```

#### Production mode
```bash
npm start
```

The API will be accessible at `http://localhost:5000` (or your specified PORT)

## 📁 Project Structure

```
Ecommerce-Bracelet-Tunisie-Backend/
├── config/
│   └── database.js       # PostgreSQL pool configuration
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── products.js      # Product management routes
│   ├── cart.js          # Cart operations routes
│   └── orders.js        # Order processing routes
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── services/
│   └── ...              # Business logic handlers
├── schema.sql           # Database schema and tables
├── .env.example         # Environment variables template
├── server.js            # Application entry point
├── package.json         # Dependencies and scripts
└── README.md           # Documentation
```

## 🔑 Key Components

### Database Configuration (`config/database.js`)

The `database.js` file contains the PostgreSQL connection pool configuration. It uses the `pg` library to create a pool of database connections for efficient query execution:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
```

The pool automatically manages connections, providing:
- Connection reuse for better performance
- Automatic connection recovery
- Query queueing when all connections are busy

### Environment Variables (`.env`)

The `.env` file stores sensitive configuration data:

- **Database Variables**: Connection details for PostgreSQL (host, port, user, password, database name)
- **JWT_SECRET**: Secret key used for signing and verifying JSON Web Tokens for secure authentication
- **Server Configuration**: Port number and environment mode

### Database Schema (`schema.sql`)

The `schema.sql` file contains all SQL table definitions needed for the application. Simply run this file in your PostgreSQL database to set up the complete database structure:

- User authentication tables
- Product catalog tables
- Shopping cart tables
- Order management tables
- Relational constraints and indexes

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:id` - Update cart item (protected)
- `DELETE /api/cart/:id` - Remove cart item (protected)

### Orders
- `GET /api/orders` - Get user's orders (protected)
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/:id` - Get order details (protected)

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Stateless authentication using JSON Web Tokens
- **Protected Routes**: Middleware-based route protection
- **SQL Injection Prevention**: Parameterized queries throughout
- **Environment Variables**: Sensitive data stored securely in `.env`

## 🧪 Testing

```bash
# Run tests (if implemented)
npm test
```

## 📊 Database Management

### Viewing Tables
```sql
-- List all tables
\dt

-- View table structure
\d table_name

-- View all users
SELECT * FROM users;
```

### Backup Database
```bash
pg_dump -U postgres ecommerce_bracelet_tunisia > backup.sql
```

### Restore Database
```bash
psql -U postgres ecommerce_bracelet_tunisia < backup.sql
```

## 🚀 Deployment

### Environment Setup
1. Set up PostgreSQL database on your hosting provider
2. Configure environment variables on the hosting platform
3. Update `.env` with production database credentials
4. Set `NODE_ENV=production`

### Recommended Platforms
- **Heroku** - Easy PostgreSQL integration
- **Railway** - Modern deployment platform
- **Render** - Simple and powerful deployment
- **DigitalOcean** - Full control with droplets

## 🎓 Context

This backend API was developed as part of a university project, demonstrating full-stack development skills with Node.js, Express, PostgreSQL, and modern authentication practices.

## 👨‍💻 Author

**Adem ben Mustapha** - [GitHub](https://github.com/mstpha)

## 📝 License

This project is a university project for educational purposes.

## 🤝 Contributing

This is a university project, but suggestions and feedback are welcome!

---

⭐ If you find this backend implementation helpful, feel free to give it a star on GitHub!