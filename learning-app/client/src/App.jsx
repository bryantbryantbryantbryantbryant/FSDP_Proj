import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tutorials from './pages/Tutorials';
import AddTutorial from './pages/AddTutorial';
import EditTutorial from './pages/EditTutorial';
import Mapping from './pages/Mapping';
import Homepage from './pages/Homepage';
import CustomerView from './pages/CustomerView';


function App() {
  return (
    <Router>
      <AppBar position="static" className="AppBar">
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/homepage">
              <Typography variant="h6" component="div">
                EVCharge
              </Typography>
            </Link>
            <Link to="/customerview" ><Typography>Charger</Typography></Link>
            <Link to="/mapping" ><Typography>Map</Typography></Link>
            <Link to="/tutorials" ><Typography>Admin-Chargers</Typography></Link>
            
            
          </Toolbar>
        </Container>
      </AppBar>

      <Container>
        <Routes>
          <Route path={"/"} element={<Tutorials />} />
          <Route path={"/tutorials"} element={<Tutorials />} />
          <Route path={"/addtutorial"} element={<AddTutorial />} />
          <Route path={"/edittutorial/:id"} element={<EditTutorial />} />
          <Route path={"/mapping"} element={<Mapping />} />
          <Route path={"/homepage"} element={<Homepage />} />
          <Route path={"/customerview"} element={<CustomerView />} />

        </Routes>
      </Container>
    </Router>
  );
}

export default App;
