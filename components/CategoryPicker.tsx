import { CATEGORIES } from "@/lib/constants";

interface CategoryPickerProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function CategoryPicker({
  selected,
  onSelect,
}: CategoryPickerProps) {
  // Split categories for the 4-then-2 layout
  const topRow = CATEGORIES.slice(0, 4);
  const bottomRow = CATEGORIES.slice(4);

  const renderButton = (cat: typeof CATEGORIES[0]) => {
    const isActive = selected === cat.id;
    return (
      <button
        key={cat.id}
        onClick={() => onSelect(cat.id)}
        className={`
          btn border-none normal-case text-base font-medium px-6 py-2 h-12 min-h-[3rem] transition-all duration-200
          ${
            isActive
              ? "bg-primary text-primary-content shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:bg-primary"
              : "bg-transparent border border-base-300 hover:border-primary hover:text-primary text-secondary"
          }
        `}
        aria-pressed={isActive}
        aria-label={`Select category: ${cat.label}`}
      >
        <span className="mr-2 text-xl">{cat.emoji}</span>
        {cat.label}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 my-8 items-center w-full">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
        {topRow.map(renderButton)}
      </div>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
        {bottomRow.map(renderButton)}
      </div>
    </div>
  );
}
