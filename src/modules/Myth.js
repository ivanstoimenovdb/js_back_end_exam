import { Schema, model, Types } from "mongoose";


const mythSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Myth name is required'],
    },
    origin: {
        type: String,
        required: [true, 'Myth origin is required'],
    },
    role: {
        type: String,
        required: [true, 'Myth role is required'],
    },
    image: {
        type: String,
        required: [true, 'Myth image is required'],
    },
    symbol: {
        type: String,
        required: [true, 'Myth symbol is required'],
    },
    era: {
        type: String,
        required: [true, 'Myth era is required'],
    },
    description: {
        type: String,
        required: [true, 'Myth description is required'],
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },
    likedList: [{
        type: Types.ObjectId,
        ref: 'User',
    }]
});


const Myth = model('Myth', mythSchema);

export default Myth;