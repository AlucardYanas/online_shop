'use client';

import { useState } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export const Filters = ({
  filters,
  onFilter,
  onUpdateFilter,
}: {
  filters: { name: string; priceMin: string; priceMax: string; sort: string };
  onFilter: () => void;
  onUpdateFilter: (name: string, value: string) => void;
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onFilter();
    }
  };

  const handleChange = (key: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    Object.entries(localFilters).forEach(([key, value]) => {
      onUpdateFilter(key, value);
    });
    onFilter(); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginBottom: 3,
        maxWidth: '400px',
      }}
    >
      <TextField
        label="Name"
        name="name"
        value={localFilters.name}
        onChange={(e) => handleChange('name', e.target.value)}
        onKeyDown={handleKeyPress}
        variant="outlined"
        size="small"
        sx={{ width: '100%' }}
      />
      <TextField
        label="Min Price"
        name="priceMin"
        type="number"
        value={localFilters.priceMin}
        onChange={(e) => handleChange('priceMin', e.target.value)}
        onKeyDown={handleKeyPress}
        variant="outlined"
        size="small"
        sx={{ width: '100%' }}
      />
      <TextField
        label="Max Price"
        name="priceMax"
        type="number"
        value={localFilters.priceMax}
        onChange={(e) => handleChange('priceMax', e.target.value)}
        onKeyDown={handleKeyPress}
        variant="outlined"
        size="small"
        sx={{ width: '100%' }}
      />
      <FormControl fullWidth>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          value={localFilters.sort || ''}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          <MenuItem value="createdAt">Date</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={applyFilters}
        sx={{ padding: '10px', width: '100%' }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};
