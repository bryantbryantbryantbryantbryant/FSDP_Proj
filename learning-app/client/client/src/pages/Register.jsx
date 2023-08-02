import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const register = async () => {
    const result = await axios.post('http://localhost:3001/auth/register', { username, password, email });
    if (result.data.error) {
      alert(result.data.error);
    } else {
      alert(result.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;