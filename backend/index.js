import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs"; // Thêm fs

import { connectDB } from "./db/connectDB.js";

// import userRoutes from "./routes/auth.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import teacherPositionRoutes from "./routes/teacherPosition.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6080;
const __dirname = path.resolve();

// Tạo thư mục uploads nếu chưa tồn tại (đảm bảo nhất quán)
const uploadsDir = path.join(__dirname, 'uploads'); // Đường dẫn từ root project
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory:', uploadsDir);
}

console.log('Static uploads directory:', uploadsDir);
console.log('Directory exists:', fs.existsSync(uploadsDir));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api", teacherRoutes);
app.use("/api", teacherPositionRoutes);

// Sửa đường dẫn static để nhất quán
app.use('/uploads', express.static(uploadsDir));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port: ", PORT);
});
