import Myth from "../modules/Myth.js";

// Add mith functionality.
export function create(mythData, userId){
    return Myth.create({
        ...mythData,
        owner: userId,
    });
}

// Dashboard view functionality.
export function getAll(){
    return Myth.find();
}

