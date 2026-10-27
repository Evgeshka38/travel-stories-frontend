'use client';

import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/lib/api/clientApi';

interface CategoriesListProps {
  selectedCategory: string | null;
  onSelect: (categoryId: string | null) => void;
}

export default function CategoriesList({
  selectedCategory,
  onSelect,
}: CategoriesListProps) {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => onSelect(null)}
        aria-pressed={selectedCategory === null}
      >
        Всі історії
      </button>

      {categories.map((category) => (
        <button
          key={category._id}
          type="button"
          onClick={() => onSelect(category._id)}
          aria-pressed={selectedCategory === category._id}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}