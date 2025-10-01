import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Button from "./ui/Button";
import TaskForm from "./TaskForm";
import Modal from "./ui/Model";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTasks = async () => {
    const res = await apiClient.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id: string) => {
    await apiClient.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <Button onClick={() => { setEditingTask(null); setModalOpen(true); }}>Add Task</Button>
      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task._id} className="border p-2 my-2 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => { setEditingTask(task); setModalOpen(true); }}>Edit</Button>
              <Button onClick={() => deleteTask(task._id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <TaskForm
          task={editingTask}
          onSuccess={fetchTasks}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default TaskList;
