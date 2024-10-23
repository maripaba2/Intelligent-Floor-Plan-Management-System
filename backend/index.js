const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({ path: '../.env' });
}

const User = require('./Models/userModel'); // 

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // To handle JSON payloads

const adminRoutes = require('./routes/admin'); // Admin routes
const bookingRoutes = require('./routes/bookings'); // Booking routes
const suggetionbookingRoutes = require('./routes/suggestion'); // Booking routes

app.use('/admin', adminRoutes); // Admin routes
app.use('/bookings', bookingRoutes); // Booking routes
app.use('/suggest-rooms', suggetionbookingRoutes); // Booking routes


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected!"))
.catch((err) => console.log(err));


app.post('/user', async (req, res) => {
    const { username, useremail,userimage } = req.body;

    if (!username || !useremail) {
        return res.status(400).json({ message: 'Username and email are required.' });
    }

    try {
        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({ useremail });
        

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const newUser = new User({ username, useremail,userimage });
        const result = await newUser.save();
        
        console.log('User created:', newUser);
        
        res.status(201).json({ message: 'User added successfully', users: result });
    } catch (err) {
        console.error('Error details:', err);
        
        res.status(500).json({ message: 'Error adding user to MongoDB', error: err });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});