const express = require('express');
const db = require('./models');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the learning space.");
});

// Routes
const tutorialRoute = require('./routes/tutorial');
const userRoute = require('./routes/user'); 
const authRoute = require('./routes/auth'); 
app.use("/auth", authRoute); 
app.use("/tutorial", tutorialRoute);
app.use("/user", userRoute); 

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
      return res.status(401).send({ error: 'Invalid or missing token' });
  }
  next();
});

async function createAdminUser() {
    const adminUser = await db.User.findOne({ where: { username: 'admin01' } });
    
    if (!adminUser) {
      await db.User.create({
        username: 'admin01',
        password: 'adminpassword01',
        role: 'admin',
        email: 'adminemail@gmail.com'
      });
    }
}

db.sequelize.sync().then(() => {
  createAdminUser();
  
  let port = process.env.APP_PORT;
  app.listen(port, () => {
      console.log(`⚡ Server running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});