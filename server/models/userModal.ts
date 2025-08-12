import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    }
})

const Users = mongoose.model('Users', userSchema);

export default Users;
