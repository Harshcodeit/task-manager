import React, { useState } from "react";

export default function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  isLoading = false,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEditClick = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSaveEdit = (taskId) => {
    if (!editTitle.trim()) {
      alert("Please enter a task title");
      return;
    }
    onEditTask(taskId, {
      title: editTitle,
      description: editDescription,
    });
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        <p>No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task._id} className="bg-white p-4 rounded-lg shadow-md">
          {editingId === task._id ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveEdit(task._id)}
                  disabled={isLoading}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task._id, !task.completed)}
                  disabled={isLoading}
                  className="mt-1 w-5 h-5 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-bold text-lg break-words ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-gray-600 mt-1 break-words">
                      {task.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEditClick(task)}
                  disabled={isLoading}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition disabled:opacity-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTask(task._id)}
                  disabled={isLoading}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
