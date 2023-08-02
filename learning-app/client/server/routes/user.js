const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticateJWT = require('../middleware/middleware');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    db.User.create({ username, password, email })
        .then(user => res.json({ message: 'User created!', user }))
        .catch(err => res.json({ error: 'Error creating user: ' + err.message }));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await db.User.findOne({ where: { username } });

    if (!user || password !== user.password) {
        return res.json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, 'SECRET_KEY');
    res.json({ message: 'Login successful!', token, user });
});

router.get('/me', authenticateJWT, async (req, res) => {
    const user = await db.User.findByPk(req.user.id);
  
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
});

module.exports = router;