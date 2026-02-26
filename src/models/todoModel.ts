import mongoose, { Schema, Document } from "mongoose";

export interface ITaskDocument extends Document {
  title: string;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITaskDocument>(
  {
    title: { type: String, required: true, trim: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<ITaskDocument>("Todo", taskSchema);

export default TaskModel;