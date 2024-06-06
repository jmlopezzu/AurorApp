import Typography from '@mui/material/Typography';

const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <div className="Footer">
      <div className="footer-column">
        <div className="footer-section">
          <Typography variant="h6">Rutas en Agenda </Typography>
          <Typography variant="body2">Grafos</Typography>
          <Typography variant="h6">Visitas Extra Ruta</Typography>
          <Typography variant="body2">Agentes</Typography>
        </div>
      <div className="footer-section">
          <Typography variant="h6">Planes/Suscripcion</Typography>
          <Typography variant="body2">Contenido</Typography>
        </div>
      </div>
      <div className="footer-section">
          <img src="R-bg.png" style={{width:"120px", marginTop:"3vh"}} alt="logo" />
      </div>
      <Typography variant="body2" color="#5e5e5e" className="footer-copyright">
        &copy; AurorApp, {currentYear}.
      </Typography>
    </div>
  );
};

export default Footer;
