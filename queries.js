// CREATE
db.products.insertOne({
  product_id: "P200",
  name: "Wireless Mouse Pro",
  category: "Electronics",
  price: 29.99,
  tags: ["accessory", "wireless", "promo"],
  stock_quantity: 150,
  created_at: new Date()
})

// READ
db.products.find({
  category: "Electronics",
  price: { $lt: 500 }
})

// UPDATE
db.products.updateMany(
  { category: "Home Office" },
  { $inc: { stock_quantity: 50 } }
)

// DELETE
db.orders.deleteOne({
  order_id: "ORD_7721"
})

// INDEXES
db.products.createIndex({ category: 1, price: 1 })
db.products.createIndex({ stock_quantity: 1 })
db.products.createIndex({ tags: 1 })

// AGGREGATION
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
