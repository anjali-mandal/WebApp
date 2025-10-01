import React, { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import Button from "./ui/Button";

interface TaskFormProps {
  task?: any;
  onSuccess: () => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (task?._id) {
        await apiClient.put(`/tasks/${task._id}`, { title, description });
      } else {
        await apiClient.post("/tasks", { title, description });
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <Button type="submit">{task?._id ? "Update" : "Create"}</Button>
    </form>
  );
};

export default TaskForm;
