import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/todo/')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            })
    }, []);

    const toggleDone = (todo) => {
        if (!todo.done) {
            alert('Congratulations on completing your task!');
        }

        axios.put(`http://localhost:8000/api/todo/${todo.id}/`, {
            ...todo,
            done: !todo.done,
        })
        .then(response => {
            setTodos(todos.map(item => item.id === todo.id ? { ...item, done: !item.done } : item));
        })
        .catch(error => {
            console.error("Error updating ToDo", error);
        });
    };

    const deleteToDo = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this task?');
        if (isConfirmed) {
            axios.delete(`http://localhost:8000/api/todo/${id}/`)
                .then(() => {
                    setTodos(todos.filter(item => item.id !== id));
                })
                .catch(error => {
                    console.error("Error deleting ToDo", error);
                });
        }
    };

    return (
        <div>
            <h2 className="mb-3">To Do's</h2>
            <ul className="list-group">
                {todos.map(todo => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={todo.id}>
                        <div>
                            <h5 className={todo.done ? 'done' : ''}>{todo.title}</h5>
                            <p className={todo.done ? 'done' : ''}>{todo.description || 'No description available.'}</p>
                        </div>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" checked={todo.done} onChange={() => toggleDone(todo)} />
                            <button className="btn btn-danger" onClick={() => deleteToDo(todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
