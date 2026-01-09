import express from "express";
import cors from "cors";
import { createUser, deleteUser, getUserById, getUsers, searchUser, updateUser } from "./controller/userController.js";

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



app.get("/", (req, res) => {
  res.send("Server ishlayapdi!");
});

app.get("/users", getUsers);
app.get("/users/:id", getUserById);
app.get("/search", searchUser);
app.post("/users", createUser);
app.delete("/users/:id", deleteUser);
app.put("/users/:id", updateUser);

app.listen(7777, () => {
  console.log("Server is running on http://localhost:7777");
});
