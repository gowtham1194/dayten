
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://sgowtham0181:NAQo1hpSYW36yAlp@database.esipoqo.mongodb.net/?retryWrites=true&w=majority&appName=database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

// Routes
app.post('/api/tasks', async (req, res) => {
    try {
      console.log("Received Task:", req.body); // Ensure dueDate is present in the request
      const newTask = new Task(req.body);
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
 });

 app.get('/api/tasks', async (req, res) => {
    try {
      const tasks = await Task.find(); // Check if tasks include dueDate
      console.log(tasks); // Log all tasks to verify dueDate exists
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
 });

app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const taskId = req.params.id;
      await Task.findByIdAndDelete(taskId);
      res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  });

//
  app.put('/api/tasks/:id', async (req, res) => {
    console.log("Request Body:", req.body); // Log incoming request
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body, // Update fields as per the request body
        { new: true } // Return the updated task
      );
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Error updating task", error });
    }
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));