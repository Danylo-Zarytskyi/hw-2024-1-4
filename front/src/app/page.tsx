'use client';
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:4000/users');
    setUsers(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { nickname, description, age: parseInt(age, 10) };
    await axios.post('http://localhost:4000/', formData);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>List:</h1>
        <br />
        <div>
          <h2>Nickname:</h2>
          <input 
            type="text" 
            placeholder="Ваш нікнейм" 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div>
          <h2>Profile description:</h2>
          <input 
            type="text" 
            placeholder="Ваш опис" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <h2>Age:</h2>
          <input 
            type="number" 
            placeholder="Ваш вік" 
            value={age} 
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>{user.nickname}</strong>: {user.description} (Age: {user.age})
          </li>
        ))}
      </ul>
    </div>
  );
}
