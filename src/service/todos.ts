import TaskModel, { ITaskDocument } from "../models/todoModel";

export const retrieveTasks = async (): Promise<ITaskDocument[]> => {
  return TaskModel.find().sort({ dueDate: 1 }).lean();
};

export const retrieveTaskById = async (
  taskId: string
): Promise<ITaskDocument | null> => {
  return TaskModel.findById(taskId).lean();
};

export const insertTask = async (
  taskTitle: string,
  taskDueDate: Date
): Promise<ITaskDocument> => {
  const newTask = new TaskModel({
    title: taskTitle,
    dueDate: taskDueDate
  });

  return newTask.save();
};

export const modifyTask = async (
  taskId: string,
  updateData: Partial<ITaskDocument>
): Promise<ITaskDocument | null> => {
  return TaskModel.findByIdAndUpdate(taskId, updateData, {
    new: true,
    runValidators: true
  }).lean();
};

export const eraseTask = async (
  taskId: string
): Promise<ITaskDocument | null> => {
  return TaskModel.findByIdAndDelete(taskId).lean();
};