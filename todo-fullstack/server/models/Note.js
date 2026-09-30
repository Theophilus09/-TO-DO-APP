import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
      maxlength: [2000, 'Title cannot exceed 2000 characters']
    },
    content: {
      type: String,
      required: [true, 'Note content is required'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;