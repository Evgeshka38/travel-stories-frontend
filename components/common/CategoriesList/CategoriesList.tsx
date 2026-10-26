import { Category } from '@/lib/api/clientApi';

interface CategoriesListProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelect: (categoryId: string | null) => void;
}

export default function CategoriesList({
  categories,
  selectedCategory,
  onSelect,
}: CategoriesListProps) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onSelect(null)}
      >
        Всі історії
      </button>

      {categories.map((category) => (
        <button
          key={category._id}
          type="button"
          onClick={() => onSelect(category._id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}