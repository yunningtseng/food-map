import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <AppBar>
      <Toolbar sx={{ height: '4rem' }}>
        <Typography variant='h6' component='div'>
          Food Map
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
