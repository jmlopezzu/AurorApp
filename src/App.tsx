import './App.css'
import AppRouter from './routes/Routes';
import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
import { Box } from '@mui/material';

function App() {
  return (
    <>
      <Box>
        <NavBar />
        <AppRouter />
        <Footer />
      </Box>
    </>
  );
}

export default App;

