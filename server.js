import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/users.js";
import { productsRouter } from "./routes/products.js";


const app = express();

app.use(cors());

// bu Node.js/Express uchun bir middleware (o‘rnatiladigan funksiya) bo‘lib, CORS ni yoqadi.

// CORS degani Cross-Origin Resource Sharing – bu brauzer va server orasidagi xavfsizlik qoidasi. Oddiy qilib aytganda:

// Agar sizning frontendingiz (masalan http://localhost:3000) va backendingiz (http://localhost:5000) turli portlarda yoki domenlarda bo‘lsa, brauzer “CORS error” beradi.

// cors() middleware shu xatolikni oldini oladi va frontendga backendga murojaat qilishga ruxsat beradi.

app.use(express.json()); 
// express.json() – bu ham Express middleware.

// U HTTP request bodydagi JSON ma’lumotlarni avtomatik tahlil qiladi va req.body ga qo‘yadi.

// Oddiy qilib aytganda, siz POST so‘rovda JSON yuborsangiz, u avtomatik ravishda obyektga aylantiriladi.

app.use('/users', usersRouter)
app.use("/products", productsRouter);

app.get("/", (_, res) => {
  res.send("Server ishlayapdi!");
});


// 404 - ya'ni sahifa topilmasa shu kodimiz ishlaydi.
app.get(/.*/, (_,res) => {
  res.status(404).send("Sahifa topilmadi!")
})

// errorlarni ushlash uchun
app.use((err, req, res, next) => {
  console.error(err.stack); // Konsolga xatoni chiqarish (debug uchun)

  res.status(500).json({
    success: false,
    message: err.message || "Serverda xatolik yuz berdi",
  });
});

app.listen(7777, () => {
  console.log("Server is running on http://localhost:7777");
});
