import React, { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { fetchUserDetails } from '../services/swapiService';
// pages/Dashboard.jsx
// export default function Dashboard() {
//   //throw new Error("Simulated crash in Dashboard");
//   return <h2>Dashboard Page</h2>;
// }

export default function Dashboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails().then(data => {
      setRows(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <CircularProgress />;

  const Row = ({ index, style }) => {
    const row = rows[index];
    return (
      <Box
        style={style}
        display="flex"
        px={2}
        py={1}
        borderBottom="1px solid #ddd"
        bgcolor={index % 2 === 0 ? '#f9f9f9' : '#fff'}
      >
        <Box flex={1}>{row.name}</Box>
        <Box flex={2}>{row.films}</Box>
        <Box flex={2}>{row.vehicles}</Box>
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Star Wars Characters</Typography>
      <Paper elevation={2}>
        <Box display="flex" px={2} py={1} bgcolor="#eee" fontWeight="bold">
          <Box flex={1}>Name</Box>
          <Box flex={2}>Films</Box>
          <Box flex={2}>Vehicles</Box>
        </Box>
        <List
          height={400}
          itemCount={rows.length}
          itemSize={60}
          width="100%"
        >
          {Row}
        </List>
      </Paper>
    </Box>
  );
}

