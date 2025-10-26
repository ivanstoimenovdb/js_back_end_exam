import Myth from "../modules/Myth.js";

// Add mith functionality.
export function create(mythData, userId) {
    return Myth.create({
        ...mythData,
        owner: userId,
    });
}

// Dashboard view functionality.
export function getAll() {
    return Myth.find();
}


// Details page functionality.
export function getOne(mythId) {
    //For next functionalities.
    return Myth.findById(mythId).populate(['owner', 'likedList']);
}

// Like functionality(ies)
export async function likePost(mythId, userId) {
    const myth = await Myth.findById(mythId);

    myth.likedList.push(userId);

    return myth.save();
}

// Edit functionality
export function edit(mythId, mythData) {
    return Myth.findByIdAndUpdate(mythId, mythData, { runValidators: true });
}

// Homepage view myths.
export function getLatest() {
    return Myth.find().sort({ _id: -1 }).limit(3);
}


