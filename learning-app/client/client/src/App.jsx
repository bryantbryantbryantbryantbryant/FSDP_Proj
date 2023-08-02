import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tutorials from './pages/Tutorials';
import AddTutorial from './pages/AddTutorial';
import EditTutorial from './pages/EditTutorial';
import MyPoints from './pages/MyPoints';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';  

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');  


function App() {
  return (
    <Router>
      <AppBar position="static" className="AppBar">
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <Typography variant="h6" component="div">
                Website
              </Typography>
            </Link>
            <Link to="/tutorials" ><Typography>Coupons</Typography></Link>
            <Link to="/mypoints" ><Typography>My Points</Typography></Link>
            <Link to= "/register" ><Typography>Register</Typography></Link>
            <Link to= "/login" ><Typography>Login</Typography></Link>
          </Toolbar>
        </Container>
      </AppBar>

      <Container>
        <Routes>
          <Route path={"/"} element={<Tutorials />} />
          <Route path={"/tutorials"} element={<Tutorials />} />
          <Route path={"/addtutorial"} element={<AddTutorial />} />
          <Route path={"/edittutorial/:id"} element={<EditTutorial />} />
          <Route path={"/mypoints"} element={<MyPoints />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </Container>
    </Router>
  );
}

export default App;