import React, { useState } from 'react';
import axios from 'axios';

const CreateTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/todo/', { title, description })
            .then(response => {
                console.log(response.data);
                setTitle('');
                setDescription('');
            })
            .catch(error => {
                console.error("Error adding task: ", error);
            });
    };

    return (
        <div>
            <h2 className="mb-3">Create Todo</h2>
            <form onSubmit={handleSubmit} className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    type="text"
                    className="form-control mb-2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <button  onClick={() => window.location.reload(true)} type="submit" className="btn btn-primary">Add Todo</button>
            </form>
        </div>
    );
};

export default CreateTodo;