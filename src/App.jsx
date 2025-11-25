import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">
          Task Manager
        </h1>

        {/* Input + Add button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            Add
          </button>
        </div>

        {/* Tasks List */}
        <ul className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">No tasks added yet.</p>
          )}

          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg shadow-sm border"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t.id)}
                  className="h-5 w-5"
                />
                <span
                  className={`text-lg ${
                    t.completed ? "line-through text-gray-500" : "text-gray-900"
                  }`}
                >
                  {t.title}
                </span>
              </div>

              <button
                onClick={() => deleteTask(t.id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;
