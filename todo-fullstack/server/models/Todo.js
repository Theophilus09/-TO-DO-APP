import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Todo title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    // Automatically creates and updates createdAt and updatedAt timestamps
    timestamps: true
  }
);

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;