import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import TodoList from './components/TodoList';
import ProductivityTimer from './components/ProductivityTimer';
import axios from 'axios';
import index from "./index.js"


function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
   
    const fetchUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      console.log(response);
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {

    if (selectedUser) {
      const fetchTodos = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/?userId=${selectedUser.id}`);
        setTodos(response.data);
      };
      fetchTodos();
    }
  }, [selectedUser]);

  const handleUserSelect = (userId) => {
    setSelectedUser(users.find((user) => user.id === userId));
  };


  return (
    <div className="App">
      <h1>Todo App with Productivity Timer</h1>
      {users.length > 0 ? (
        <UserList users={users} onSelect={handleUserSelect} />
      ) : (
        <p>Loading users...</p>
      )}
      {selectedUser && (
        <>
          <TodoList todos={todos} userId={selectedUser.id} />
      
        </>
      )}
    </div>
  );
}

export default App;
