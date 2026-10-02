function ProductFilter({
  categories,
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="mb-10 space-y-5">

      {/* Search */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/40">
            Collection
          </p>

          <h1 className="mt-2 text-4xl font-black uppercase tracking-[-0.06em] sm:text-6xl">
            All products
          </h1>
        </div>

        <div className="flex gap-2">

          <div className="flex items-center rounded-full bg-white px-4 shadow-sm">
            <span className="mr-2 text-black/30">⌕</span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search..."
              className="w-40 bg-transparent py-3 text-xs outline-none sm:w-56"
            />
          </div>

          <select
            value={sort}
            onChange={(e) =>
              onSortChange(e.target.value)
            }
            className="rounded-full border-0 bg-black px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white outline-none"
          >
            <option value="">Sort</option>
            <option value="price-asc">
              Price ↑
            </option>
            <option value="price-desc">
              Price ↓
            </option>
          </select>

        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => onCategoryChange("")}
          className={`shrink-0 rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] transition ${
            activeCategory === ""
              ? "bg-black text-white"
              : "bg-white text-black/50 hover:bg-black hover:text-white"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              onCategoryChange(category)
            }
            className={`shrink-0 rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] capitalize transition ${
              activeCategory === category
                ? "bg-black text-white"
                : "bg-white text-black/50 hover:bg-black hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

    </div>
  );
}

export default ProductFilter;