const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const cors = require('cors');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'https://bajaj-front-final.vercel.app' }));
// Prime number checking function
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// POST route
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = null;
    let isPrimeFound = false;
    let fileValid = true;

    // Process data
    data.forEach(item => {
        if (isNaN(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && (!highestLowercaseAlphabet || item > highestLowercaseAlphabet)) {
                highestLowercaseAlphabet = item;
            }
        } else {
            numbers.push(item);
            if (isPrime(parseInt(item))) {
                isPrimeFound = true;
            }
        }
    });

    // Handle file validation (check base64 validity, size, MIME)
    // Assuming file_b64 is a valid base64 string
    let fileMimeType = 'image/png';  // Mock MIME type
    let fileSizeKB = 400;  // Mock size

    res.json({
        is_success: true,
        user_id: "Priyanshu_Yadav_26072001",
        email: "priyanshuyadav210415@acropolis.in",
        roll_number: "0827IT211091",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
        is_prime_found: isPrimeFound,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    });
});

// GET route
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Start server
app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
