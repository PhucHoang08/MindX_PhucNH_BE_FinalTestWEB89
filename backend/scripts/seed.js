import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/user.model.js';
import Teacher from '../models/teacher.model.js';
import TeacherPosition from '../models/teacherPosition.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedData = async () => {
    try {
        await mongoose.connect("mongodb+srv://nhoangphuc960:9v1BNS48n9FxAWqw@cluster0.mtmz4od.mongodb.net/auth_db?retryWrites=true&w=majority&appName=Cluster0");
        console.log('📦 Đã kết nối MongoDB');

        const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../mock-data-fullstack/users.fixed.json')));
        const teachers = JSON.parse(fs.readFileSync(path.join(__dirname, '../mock-data-fullstack/teachers.fixed.json')));
        const positions = JSON.parse(fs.readFileSync(path.join(__dirname, '../mock-data-fullstack/teacherPositions.fixed.json')));


        await User.deleteMany();
        await Teacher.deleteMany();
        await TeacherPosition.deleteMany();

        await User.insertMany(users);
        await Teacher.insertMany(teachers);
        await TeacherPosition.insertMany(positions);

        console.log('✅ Đã seed dữ liệu mẫu thành công!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Lỗi khi seed:', err);
        process.exit(1);
    }
};

seedData();
