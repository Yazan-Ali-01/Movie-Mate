import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: '10px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontWeight: 'bolder',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  image: {
    borderRadius: '20px',
    height: '300px',
    marginBottom: '10px',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale(1.062)',
    },
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '230px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '10px',
    marginBottom: '0',
    textAlign: 'center',
  },
  rating: {
    justifyContent: 'center',
  },
}));
