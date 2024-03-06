import React from 'react';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
      <div className="container-sm">
          <h1 className="text-center mb-4">Todo App</h1>
          <center>
            <div class="card text-center" style={{width: 36 + 'em'}}>
              <div class="card-body">
                <CreateTodo />
              </div>
            </div>
          </center>
          <hr></hr>
          <TodoList />
      </div>
    );
};

export default App;

