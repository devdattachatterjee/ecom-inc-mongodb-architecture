# MongoDB NoSQL Database Implementation – Ecom Inc.

## 📌 Objective

To design and implement a scalable, flexible NoSQL schema using MongoDB that resolves performance bottlenecks of a traditional RDBMS in a high-traffic e-commerce system.

---

## 🧠 Part 1: Schema Design & Data Modeling

### 🔹 1. Embedding vs Normalization

MongoDB avoids expensive JOIN operations by embedding related data.

#### ✅ Case 1: Orders + Items

* Items are embedded inside the order document.
* Eliminates JOIN between `orders` and `order_items`.

**Why better:**

* Single query fetch
* Faster read performance
* Ideal for read-heavy systems like e-commerce

---

#### ✅ Case 2: Shipping Address

* Address is embedded inside order.

**Why better:**

* Preserves historical accuracy (immutability)
* Avoids dependency on external collections
* Reduces query complexity

---

### 🔹 2. Polymorphic Schema (Flexible Products Collection)

MongoDB supports different structures in the same collection.

#### ✅ Design

* Electronics → `specs`
* Apparel → `attributes`

This allows:

* Schema flexibility
* Easy onboarding of new product types
* No schema migrations

---

### 🔹 3. Indexing Strategy

```js
db.products.createIndex({ category: 1, price: 1 })
db.products.createIndex({ stock_quantity: 1 })
db.products.createIndex({ tags: 1 })
```

#### ✅ Justification:

1. **Category + Price Index**

   * Speeds up product filtering (very common query)

2. **Stock Quantity Index**

   * Enables fast inventory checks

3. **Tags Index**

   * Improves search functionality

---

## ⚙️ Part 2: CRUD Operations

### ✅ CREATE

```js
db.products.insertOne({
  product_id: "P200",
  name: "Wireless Mouse Pro",
  category: "Electronics",
  price: 29.99,
  tags: ["accessory", "wireless", "promo"],
  stock_quantity: 150,
  created_at: new Date()
})
```

---

### ✅ READ

```js
db.products.find({
  category: "Electronics",
  price: { $lt: 500 }
})
```

---

### ✅ UPDATE

```js
db.products.updateMany(
  { category: "Home Office" },
  { $inc: { stock_quantity: 50 } }
)
```

---

### ✅ DELETE

```js
db.orders.deleteOne({
  order_id: "ORD_7721"
})
```

---

## 🚀 Part 3: Scaling & Performance (Sharding)

### 🔥 Problem

Traditional RDBMS cannot efficiently handle:

* Massive product catalog
* Global traffic
* High read/write load

---

### ✅ MongoDB Solution: Sharding

Sharding distributes data across multiple servers.

#### 💡 How It Helps:

* Horizontal scaling
* Parallel query execution
* Reduced load per server
* High availability

#### ✅ Example:

```js
sh.shardCollection("ecom.orders", { customer_id: 1 })
```

**Why `customer_id`?**

* Ensures even data distribution
* Prevents data skew

---

## 📊 Part 4: Aggregation Pipeline (Monthly Revenue)

```js
db.orders.aggregate([
  {
    $group: {
      _id: {
        year: { $year: { $toDate: "$order_date" } },
        month: { $month: { $toDate: "$order_date" } }
      },
      total_revenue: { $sum: "$total_amount" }
    }
  },
  {
    $sort: { "_id.year": 1, "_id.month": 1 }
  }
])
```

---

## 📥 Data Import Instructions

```bash
mongoimport --collection products --file products.json --jsonArray
mongoimport --collection orders --file orders.json --jsonArray
```

---

## 🛠 Tools Used

* MongoDB
* MongoDB Compass
* GitHub

---

## ✅ Conclusion

MongoDB provides:

* Flexible schema design
* High performance through indexing
* Scalability via sharding

This makes it an ideal solution for modern high-traffic e-commerce platforms like Ecom Inc.
