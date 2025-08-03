import fs from 'fs';

const convertObject = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(convertObject);
    } else if (typeof obj === 'object' && obj !== null) {
        if ('$date' in obj) return obj['$date'];
        if ('$oid' in obj) return obj['$oid'];
        const newObj = {};
        for (const key in obj) {
            newObj[key] = convertObject(obj[key]);
        }
        return newObj;
    }
    return obj;
};

const convertFile = (filePath, outputPath) => {
    const raw = fs.readFileSync(filePath);
    const data = JSON.parse(raw);
    const fixed = convertObject(data);
    fs.writeFileSync(outputPath, JSON.stringify(fixed, null, 2));
    console.log(`✅ Converted: ${outputPath}`);
};

// Convert all files
convertFile('./mock-data-fullstack/users.json', './mock-data-fullstack/users.fixed.json');
convertFile('./mock-data-fullstack/teachers.json', './mock-data-fullstack/teachers.fixed.json');
convertFile('./mock-data-fullstack/teacherPositions.json', './mock-data-fullstack/teacherPositions.fixed.json');
