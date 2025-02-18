# Backend Development Tutorial for Beginners

This README provides a comprehensive guide for building backend applications using JavaScript, covering essential topics and best practices for beginners.

## Table of Contents

1.  [**Introduction to Backend Development**](#introduction-to-backend-development)
2.  [**Setting Up a Professional Backend Project**](#setting-up-a-professional-backend-project)
3.  [**Express.js Basics**](#expressjs-basics)
4.  [**Proxy and CORS in Vite**](#proxy-and-cors-in-vite)
5.  [**Data Modeling with Mongoose**](#data-modeling-with-mongoose)
6.  [**E-commerce and Hospital Management Data Modeling Examples**](#ecommerce-and-hospital-management-data-modeling-examples)
7.  [**Connecting to MongoDB in MERN Stack**](#connecting-to-mongodb-in-mern-stack)
8.  [**Custom API Response and Error Handling**](#custom-api-response-and-error-handling)
9.  [**User and Video Model with Hooks and JWT**](#user-and-video-model-with-hooks-and-jwt)
10. [**File Uploading with Multer**](#file-uploading-with-multer)
11. [**HTTP Crash Course**](#http-crash-course)
12. [**Routers and Controllers: A Complete Guide**](#routers-and-controllers-a-complete-guide)
13. [**Logic Building: Register Controller**](#logic-building-register-controller)
14. [**Using Postman for Backend Testing**](#using-postman-for-backend-testing)
15. [**Access, Refresh Tokens, Middleware, and Cookies**](#access-refresh-tokens-middleware-and-cookies)
16. [**Access Token and Refresh Token in Backend**](#access-token-and-refresh-token-in-backend)
17. [**Learn MongoDB Aggregation Pipelines**](#learn-mongodb-aggregation-pipelines)

## **Introduction to Backend Development**

Backend development involves building the server-side logic of web applications. It handles databases, server configurations, and API development, ensuring seamless data management and application functionality. A well-organized folder structure is crucial for scalability, collaboration, and debugging [1].

## **Setting Up a Professional Backend Project**

1.  **Install Node.js and npm**: Download and install Node.js, which includes npm (Node Package Manager) [2].

```
node -v
npm -v
```

2.  **Create a Project Folder**:

```powershell
mkdir my-node-project
cd my-node-project
```

3.  **Initialize Your Project**:

`npm init`

This creates a `package.json` file to manage dependencies [2].

4.  **Install Express.js**:

`npm install express`

A basic folder structure includes:

- `controllers/`
- `models/`
- `routes/`
- `middlewares/`
- `utils/`
- `config/`
- `server.js` [1]

To set up this structure:

`mkdir controllers models routes middlewares utils config
touch server.js`

## **Express.js Basics**

_Express.js_ is a framework that simplifies building Node.js backend applications [2].

1.  **Create `server.js`**: The entry point of your application [1].

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello, Express.js Server!</h1>");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

2.  **Run Your Server**:

```powershell
node server.js
```

3.  **Define Routes**: How your server responds to different URL requests [2].

```javascript
app.get("/about", (req, res) => {
  res.send("This is the about page");
});

app.get("/contact", (req, res) => {
  res.send("This is the contact page");
});
```

Use `nodemon` for automatic server restarts:

```powershell
npm install -g nodemon
nodemon server.js
```

## **Proxy and CORS in Vite**

_Vite_ is a build tool that improves the front-end development experience. Configuring a proxy in `vite.config.js` is essential for redirecting API calls during development [3].

```javascript

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^/api/, ''),
            },
          },
        },
});
```

- `target`: The URL to proxy to.
- `changeOrigin`: Changes the origin of the host header to the target URL.
- `rewrite`: Rewrites the URL path before sending the request to the target [3].

To handle CORS issues, configure the proxy [3]:

```javascript
proxy.on("proxyReq", (proxyReq, req, res) => {
  proxyReq.setHeader("Origin", "http://localhost:3000");
});
```

## **Data Modeling with Mongoose**

_Mongoose_ is an ODM (Object Data Modeling) library for MongoDB and Node.js. Models define data structure and interactions with the database [1].

```javascript
// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
```

## **E-commerce and Hospital Management Data Modeling Examples**

### **E-commerce Data Model**

- **Product**:
  - `name` (String, required)
  - `description` (String)
  - `price` (Number, required)
  - `category` (String)
  - `inventory` (Number)
  - `images` (Array of Strings)
- **User**:
  - `username` (String, required, unique)
  - `email` (String, required, unique)
  - `password` (String, required)
  - `address` (String)
  - `orders` (Array of References to Order)
- **Order**:
  - `user` (Reference to User, required)
  - `items` (Array of Objects with Reference to Product and Quantity)
  - `totalAmount` (Number)
  - `orderDate` (Date, default: Date.now)
  - `status` (String, e.g., "pending", "shipped", "delivered")

### **Hospital Management Data Model**

- **Patient**:
  - `name` (String, required)
  - `dateOfBirth` (Date)
  - `gender` (String)
  - `contactNumber` (String)
  - `address` (String)
  - `medicalHistory` (Array of Strings)
- **Doctor**:
  - `name` (String, required)
  - `specialization` (String)
  - `contactNumber` (String)
  - `appointments` (Array of References to Appointment)
- **Appointment**:
  - `patient` (Reference to Patient, required)
  - `doctor` (Reference to Doctor, required)
  - `appointmentDate` (Date, required)
  - `reason` (String)
  - `notes` (String)

## **Connecting to MongoDB in MERN Stack**

Use `mongoose.connect` to connect to a MongoDB database [1]:

```javascript
// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## **Custom API Response and Error Handling**

Implement custom API responses and error handling for better communication with the client.

```javascript
// utils/response.js
exports.success = (res, data, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
};

exports.error = (res, message = "Server Error", statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
```

## **User and Video Model with Hooks and JWT**

Use _hooks_ for pre- and post-save operations and _JWT_ (JSON Web Tokens) for authentication.

```javascript
// models/User.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
```

## **File Uploading with Multer**

_Multer_ is a middleware for handling `multipart/form-data` , primarily used for file uploads.

```javascript
// middlewares/upload.js
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
```

## **HTTP Crash Course**

_HTTP_ (Hypertext Transfer Protocol) is the foundation of data communication on the web. Understand request methods (GET, POST, PUT, DELETE) and status codes (200, 404, 500).

## **Routers and Controllers: A Complete Guide**

_Routes_ direct incoming requests to the appropriate controller functions, which handle the logic [1].

```javascript
// routes/userRoutes.js
const express = require("express");
const { getUsers, createUser } = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;
```

## **Logic Building: Register Controller**

Implement the registration logic in the controller.

```javascript
// controllers/userController.js
const User = require("../models/User");
const { success, error } = require("../utils/response");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = user.generateToken();
    success(res, { user, token }, "User registered successfully", 201);
  } catch (err) {
    error(res, err.message, 500);
  }
};
```

## **Using Postman for Backend Testing**

_Postman_ is a tool for testing APIs by sending requests to different endpoints and inspecting the responses [2].

## **Access, Refresh Tokens, Middleware, and Cookies**

- **Access Token**: A short-lived token used to authenticate requests.
- **Refresh Token**: A long-lived token used to obtain new access tokens.
- **Middleware**: Functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.

## **Access Token and Refresh Token in Backend**

Implement access and refresh tokens for secure authentication. Store refresh tokens securely (e.g., in a database) and use them to issue new access tokens when the old ones expire.

## **Learn MongoDB Aggregation Pipelines**

_Aggregation pipelines_ are a framework for data aggregation in MongoDB. They allow you to process and transform data through a sequence of stages.

```javascript
[
  {
    $match: { status: "active" },
  },
  {
    $group: {
      _id: "$category",
      total: { $sum: "$price" },
    },
  },
];
```

This pipeline filters documents with `status: "active"` and groups them by category, summing the prices for each category.
