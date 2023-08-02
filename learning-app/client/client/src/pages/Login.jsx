
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:3001/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        if (res.data) {
          setUser(res.data);
        }
      });
    }
  }, []);

  const login = async () => {
    const result = await axios.post('http://localhost:3001/user/login', { username, password });

    if (result.data.error) {
        alert(result.data.error);
    } else {
        localStorage.setItem('token', result.data.token);
        setUser(result.data.user);
        alert(result.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {user ? (
        <div>Welcome {user.name}! Your email is {user.email}.</div>
      ) : (
        <div>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;