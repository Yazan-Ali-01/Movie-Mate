import React, { useEffect, useState } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemButton, Box, CircularProgress, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { useGetGenresQuery } from '../../services/TMDB';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const redLogo = '/blueLogo.png';
const blueLogo = '/redLogo.png';

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const { data, isLoading, isFetching, error } = useGetGenresQuery();
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  // State to manage if the data is ready to be displayed
  const [isDataReady, setIsDataReady] = useState(false);

  // useEffect to fetch data on component mount and update the state
  useEffect(() => {
    setIsDataReady(!isLoading && !isFetching && !error);
  }, [isLoading, isFetching, error]);

  if (isLoading || isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    // Handle the error case here, display an error message or retry button
    return <div>Error occurred while fetching genres.</div>;
  }

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="MovieMate logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={label} className={classes.links} to="/">
            <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={value} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {/* Render the genres here using the data variable */}
        {isDataReady
          && data
          && data.genres.map(({ name, id }) => (
            <Link key={id} className={classes.links} to="/">
              <ListItemButton onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemIcon>
                  <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))}
      </List>
    </>
  );
};

export default Sidebar;
