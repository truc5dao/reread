// Import express and other necessary modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB setup
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const database = client.db("Books");
const bookStockCollection = database.collection("bookstocks");
const bookInfoCollection = database.collection("bookinfo");
const reviewsCollection = database.collection("bookreview");


// Simple Route to check if server is working
app.get("/", (req, res) => {
  res.send("This Web server is processed for MongoDB");
});

// Define /bookstocks route
app.get("/bookstocks", cors(), async (req, res) => {
  try {
    let filter = {};
    let sortOption = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.flash_sale === "true") {
      sortOption = { BookSales: -1 };
    }

    if (req.query.best_seller === "true") {
      filter.PlacedQty = { $gt: 2 };
      sortOption = { PlacedQty: -1 };
    }

    const books = await bookStockCollection.find(filter).sort(sortOption).toArray();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

app.get("/book/:id", cors(), async (req, res) => {
  try {
    const bookId = req.params["id"];

    // Tìm cuốn sách trong bookstocks theo BookISBN_n (id)
    const bookStock = await bookStockCollection.findOne({ BookISBN_n: bookId });

    if (!bookStock) {
      return res.status(404).json({ message: "Book not found in bookstocks" });
    }

    // Lấy BookInfoID của sách đã chọn
    const bookInfo = await bookInfoCollection.findOne({ BookInfoID: bookStock.BookInfoID });

    // Lấy danh sách tất cả các ISBN_n có cùng BookInfoID
    const availableConditions = await bookStockCollection
      .find({ BookInfoID: bookStock.BookInfoID })
      .project({ 
        BookISBN_n: 1, 
        BookCond: 1, 
        BookPrice: 1, 
        BookSales: 1, 
        CurrentQty: 1, 
        BookImg1: 1,
        BookImg2: 1,
        BookImg3: 1,
      })
      .toArray();

    // Trả về dữ liệu hợp nhất gồm thông tin sách và các điều kiện của sách
    const mergedBook = {
      ...bookStock,
      ...bookInfo,
      availableConditions, // Chứa tất cả các ISBN_n với các điều kiện khác nhau
    };

    res.json(mergedBook);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details", error });
  }
});


// Add a reference to the reviews collection
app.get("/bookreview", cors(), async (req, res) => {
  try {
    // Fetch all reviews from the collection
    const reviews = await reviewsCollection.find().toArray();

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found." });
    }

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

// API to get book reviews based on BookInfoID
app.get("/bookreview/:BookInfoID", cors(), async (req, res) => {
  try {
    const bookInfoID = parseInt(req.params["BookInfoID"]);

    // Tìm tất cả đánh giá theo BookInfoID
    const reviews = await reviewsCollection.find({ BookInfoID: bookInfoID }).toArray();

    if (reviews.length === 0) {
      return res.status(404).json({ message: "Không có đánh giá nào cho cuốn sách này." });
    }

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy đánh giá", error });
  }
});


// Start server
app.listen(port, () => {
  console.log(`My Server listening on port ${port}`);
});
