const app = require('./config/server');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');

connectDB();
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));