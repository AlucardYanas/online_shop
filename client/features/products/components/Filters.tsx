'use client';
import { useState } from 'react';
import { TextField, Button } from '@/shared/ui';

export const Filters = ({ onFilter }: { onFilter: (filters: any) => void }) => {
  const [filters, setFilters] = useState({
    name: '',
    priceMin: '',
    priceMax: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApply = () => {
    onFilter(filters);
  };

  return (
    <div>
      <TextField
        label="Name"
        name="name"
        value={filters.name}
        onChange={handleChange}
      />
      <TextField
        label="Min Price"
        name="priceMin"
        type="number"
        value={filters.priceMin}
        onChange={handleChange}
      />
      <TextField
        label="Max Price"
        name="priceMax"
        type="number"
        value={filters.priceMax}
        onChange={handleChange}
      />
      <Button onClick={handleApply}>Apply Filters</Button>
    </div>
  );
};
