'use client';

import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/lib/api/clientApi';

import css from './CategoriesList.module.css';

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
    <>
      <div className={css.mobileCategories}>
        <label className={css.label} htmlFor="category-select">
          Категорії
        </label>

        <div className={css.selectWrapper}>
          <select
            id="category-select"
            className={css.select}
            value={selectedCategory ?? ''}
            onChange={(event) =>
              onSelect(event.target.value || null)
            }
          >
            <option value="">Всі історії</option>

            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <svg
            className={css.selectIcon}
            width="24"
            height="24"
            aria-hidden="true"
          >
            <use href="/sprite.svg#icon-arrow-down" />
          </svg>
        </div>
      </div>

      <div className={css.desktopCategories}>
        <button
          type="button"
          className={css.button}
          onClick={() => onSelect(null)}
          aria-pressed={selectedCategory === null}
        >
          Всі історії
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            type="button"
            className={css.button}
            onClick={() => onSelect(category._id)}
            aria-pressed={selectedCategory === category._id}
          >
            {category.name}
          </button>
        ))}
      </div>
    </>
  );
}