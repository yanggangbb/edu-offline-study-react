import { Stack } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const IndexPage = () => {
  return (
    <>
      <Helmet>
        <title>IndexPage</title>
      </Helmet>
      <Stack spacing={1} width='fit-content'></Stack>
    </>
  );
};

export default IndexPage;
