import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGO_URI;
const connecttoDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};
export default connecttoDB;
//# sourceMappingURL=db.config.js.map