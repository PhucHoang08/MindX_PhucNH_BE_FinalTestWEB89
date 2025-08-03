import Teacher from '../models/teacher.model.js';
import TeacherPosition from '../models/teacherPosition.model.js';
import User from '../models/user.model.js';
import generateRandomCode from '../utils/generateCode.js';

// ... (phần code trên giữ nguyên)
export const getTeachers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    // Đảm bảo số `limit` và `page` là số
    const numLimit = Number(limit);
    const numPage = Number(page);

    // Đếm tổng số giáo viên
    const total = await Teacher.countDocuments();
    
    const teachers = await Teacher.find()
        .populate('userId')
        .populate('teacherPositionsId')
        .skip((numPage - 1) * numLimit)
        .limit(numLimit);

    // Sửa lại: Trả về một đối tượng JSON
    res.json({
        teachers,
        total,
        page: numPage,
        limit: numLimit
    });
};

export const createTeacher = async (req, res) => {
    try {
        const { user, isActive, startDate, endDate, teacherPositionsId, degrees } = req.body;

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) return res.status(400).json({ message: 'Email đã tồn tại' });

        const newUser = await User.create(user);

        let code;
        let isDuplicate = true;
        while (isDuplicate) {
            code = generateRandomCode();
            const exists = await Teacher.findOne({ code });
            if (!exists) isDuplicate = false;
        }

        const newTeacher = await Teacher.create({
            userId: newUser._id,
            isActive,
            code,
            startDate,
            endDate,
            teacherPositionsId,
            degrees
        });

        res.status(201).json(newTeacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
