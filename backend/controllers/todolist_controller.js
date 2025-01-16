const todo = require("../models/todolist_model");

// Create a new ToDo
const createToDo = async (req, res) => {
    const { message } = req.body;

    // Validation: Check if message is empty
    if (!message || message.trim() === "") {
        return res.status(401).json({ errorMessage: "Message cannot be empty" });
    }

    // Validation: Check message length
    if (message.length < 4 || message.length > 20) {
        return res.status(400).json({ errorMessage: "Message must be between 4 and 20 characters." });
    }

    try {
        const addToDo = await todo.create({ message });
        res.status(200).json({ success: "created", data: addToDo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all ToDos
const getAllToDo = async (req, res) => {
    try {
        const getToDo = await todo.find({});
        res.status(200).json({ data: getToDo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a ToDo
const updateToDo = async (req, res) => {
    try {
        const updatedTodo = await todo.findByIdAndUpdate(
            req.params.id,
            { message: req.body.message },
            { new: true } // Return the updated document
        );

        if (updatedTodo) {
            res.json({ success: "updated", data: updatedTodo });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a ToDo
const deleteToDo = async (req, res) => {
    try {
        const deleted = await todo.findByIdAndDelete(req.params.id);

        if (deleted) {
            res.status(200).json({ success: "deleted" });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createToDo,
    getAllToDo,
    updateToDo,
    deleteToDo,
};
