import React, { useEffect, useState } from 'react';
import './App.css';
import useStorage from './hooks/storage.hook';

const Task = () => {
  const { getItem, setItem } = useStorage();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (id) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, }
        } else {
          return task;
        }
      });
      setItem('todos', updatedTasks);
      setTasks(updatedTasks);
    } else {
      const todoList = getItem('todos') ?? [];
      const createObject = { id: Date.now(), title, completed: false }
      setItem('todos', [...todoList, createObject]);
      setTasks([...tasks, createObject]);
    }
    setTitle("");
  }

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setItem('todos', updatedTasks);
    setTasks(updatedTasks);
  };

  const updateTask = (data) => {
    setId(data.id);
    setTitle(data.title)
  };

  const onCompleted = (id, checked) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: checked }
      } else {
        return task;
      }
    });
    setItem('todos', updatedTasks);
    setTasks(updatedTasks);
  }

  useEffect(() => {
    const todoList = getItem('todos') ?? [];
    setTasks(todoList);
  }, []);

  useEffect(() => {
    if (!title) {
      setId("");
    }
  }, [title]);

  return (
    <div className='main-box'>
      <h1>Task Details</h1>
      <div className='text-details'>
        <form onSubmit={(event) => onSubmit(event)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button>{id && title ? "Update" : "Add"}</button>
        </form>
      </div>
      <div style={{ padding: '20px 30px' }}>
        {tasks.map((task) => (
          <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex' }}>
              <input style={{ marginRight: '10px' }} checked={task.completed} type='checkbox' onChange={(event) => onCompleted(task.id, event.target.checked)} />
              <h5 style={{ margin: 0, textDecoration: task.completed && 'line-through' }}>{task.title}</h5>
            </div>
            <div>
              <button onClick={() => removeTask(task.id)}>Delete</button>{' '}
              <button
                onClick={() => updateTask(task)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
