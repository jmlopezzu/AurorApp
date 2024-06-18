import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/Routes';
import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Box>
        <NavBar />
        <AppRouter />
        <Footer/>
      </Box>
    </Router>
  );
}

export default App;