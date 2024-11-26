'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useFilters = (initialFilters = { name: '', priceMin: '', priceMax: '' }) => {
  const [filters, setFilters] = useState(initialFilters);
  const router = useRouter();

  const applyFilters = () => {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      }
    });

    router.push(`/catalog?${queryParams.toString()}`);
  };

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    filters,
    updateFilter,
    applyFilters,
  };
};
