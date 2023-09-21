import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import { useGetMoviesQuery } from '../../services/TMDB';
// eslint-disable-next-line import/no-cycle
import { MoviesList } from '..';
import Pagination from '../Pagination/Pagination';

const Movies = () => {
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 16 : 18;
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (data.results.length === 0) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          no movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          Error loading movies data.
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <MoviesList movies={data} numberOfMovies={numberOfMovies} />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
};

export default Movies;
