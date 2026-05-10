import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { taskAPI } from "../api/client";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data.tasks);
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks([response.data.task, ...tasks]);
    } catch (err) {
      setError("Failed to create task");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await taskAPI.updateTask(taskId, { completed });
      setTasks(
        tasks.map((task) => (task._id === taskId ? response.data.task : task)),
      );
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = async (taskId, taskData) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await taskAPI.updateTask(taskId, taskData);
      setTasks(
        tasks.map((task) => (task._id === taskId ? response.data.task : task)),
      );
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await taskAPI.deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">My Tasks</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="mb-6">
          <TaskForm onSubmit={handleAddTask} isLoading={isLoading} />
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded font-medium transition ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Tasks ({tasks.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded font-medium transition ${
              filter === "pending"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending ({tasks.filter((t) => !t.completed).length})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded font-medium transition ${
              filter === "completed"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            Completed ({tasks.filter((t) => t.completed).length})
          </button>
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
