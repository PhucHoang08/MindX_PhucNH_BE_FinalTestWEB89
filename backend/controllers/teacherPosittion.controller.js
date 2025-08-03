import TeacherPosition from '../models/teacherPosition.model.js';

export const getPositions = async (req, res) => {
    const positions = await TeacherPosition.find();
    res.json(positions);
};

export const createPosition = async (req, res) => {
    const { name, code, des, isActive } = req.body;

    const existing = await TeacherPosition.findOne({ code });
    if (existing) return res.status(400).json({ message: 'Code đã tồn tại' });

    const newPosition = await TeacherPosition.create({ name, code, des, isActive });
    res.status(201).json(newPosition);
};
