export default function generateRandomCode(length = 10) {
    return Math.random().toString().slice(2, 2 + length);
}
