import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");

  // Fetch tasks from Firestore
  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "tasks"),
        where("userId", "==", auth.currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      });

      return () => unsubscribe();
    }
  }, []);

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === "" || !auth.currentUser) return;
    try {
      await addDoc(collection(db, "tasks"), {
        userId: auth.currentUser.uid,
        task: newTask,
        createdAt: new Date(),
      });
      setNewTask("");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  // Save the edited task
  const saveEditedTask = async (taskId) => {
    console.log(`Attempting to save task ID: ${taskId} with value: ${editTaskValue}`);
    if (editTaskValue.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    try {
      await updateDoc(doc(db, "tasks", taskId), {
        task: editTaskValue,
      });
      console.log("Task updated successfully in Firestore!");
      setEditTaskId(null); // Exit edit mode
      setEditTaskValue(""); // Reset input field
    } catch (error) {
      console.error("Error editing task: ", error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Task Manager</h1>
        <button className="signout-btn" onClick={() => signOut(auth)}>
          Sign Out
        </button>
      </header>

      <div className="task-input-section">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list-horizontal">
        {tasks.map((task) => (
          <li
            className={`task-item ${
              editTaskId === task.id ? "editing" : ""
            }`}
            key={task.id}
          >
            {editTaskId === task.id ? (
              <div className="edit-section">
                <input
                  type="text"
                  value={editTaskValue}
                  onChange={(e) => {
                    console.log("Input value changed:", e.target.value);
                    setEditTaskValue(e.target.value);
                  }}
                  autoFocus
                />
                <button onClick={() => saveEditedTask(task.id)}>Save</button>
                <button onClick={() => setEditTaskId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <span>{task.task}</span>
                <button
                  onClick={() => {
                    setEditTaskId(task.id);
                    setEditTaskValue(task.task); // Pre-fill edit field with current task
                    console.log(`Editing task: ${task.task}`);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
