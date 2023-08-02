const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await db.User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).send({ error: 'Email already exists.' });
    }

    const newUser = await db.User.create({ 
      username, 
      email, 
      password, 
      role: 'user', 
      points: 0, 
      discount: 0 
    });

    return res.status(201).send({ message: 'User registered.' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Server error.' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { username } });
    
    if (!user || user.password !== password) {
      return res.status(400).send({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }  
    );

    return res.send({ 
      message: 'User logged in.', 
      user: {
        name: user.username, 
        email: user.email, 
        role: user.role 
      }, 
      token 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Server error.' });
  }
});

module.exports = router;