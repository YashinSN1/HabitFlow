import { useState } from "react";

const PredefinedCategories = [
  { id: "work", label: " Work", color: "#ef4444" },
  { id: "personal", label: "Personal", color: "#000000" },
  { id: "shopping", label: " Shopping", color: "#ef4444" },
  { id: "health", label: " Health", color: "#000000" },
  { id: "finance", label: " Finance", color: "#ef4444" },
  { id: "travel", label: "Travel", color: "#000000" },
  { id: "education", label: "Education", color: "#ef4444" },
];

function CategorySelector({ onClose, HabitData, SetHabitData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCustomUi, setShowCustomUi] = useState(false);
  const [customName, setCustomName] = useState("");
  const [savedCustom, setSavedCustom] = useState(null);

  const handleCategoryClick = (categ) => {
    if (categ.id === "custom") {
      setShowCustomUi(true);
    } else {
      setSelectedCategory(categ.id);
    }
  };

  const customCategory = [
    ...PredefinedCategories,
    {
      id: "custom",
      label: savedCustom ? `${savedCustom}` : "Custom",
      color: "#ef4444",
      isCustom: true,
    },
  ];

  const handleSaveCustom = () => {
    if (customName.trim()) {
      setSavedCustom(customName.trim());
      setSelectedCategory("custom");
      setShowCustomUi(false);
    }
  };

  const categoryClick = (categ) => {
    handleCategoryClick(categ);
    if (selectedCategory !== "custom" && selectedCategory !== null) {
      setSavedCustom(null);
      setCustomName("");
    }
  };

  const finalCategory = () => {
    let finalData;

    if (selectedCategory !== null) {
      for (let i = 0; i < customCategory.length; i++) {
        if (customCategory[i].id === selectedCategory) {
          finalData = customCategory[i];
        }
      }

      SetHabitData((prev) => ({
        ...prev,
        category: { ...prev.category, name: finalData.label.trim(), icon: "" },
      }));
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-black text-lg font-black tracking-tight">
            Category
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-red-300 hover:text-white transition-colors text-gray-500 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <div className="px-4 pt-4 pb-3">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">
            Select a category
          </p>
          <div className="grid grid-cols-2 gap-2">
            {customCategory.map((categ) => {
              const isSelected = selectedCategory === categ.id;
              const isCustom = categ.isCustom;

              return (
                <button
                  key={categ.id}
                  onClick={() => categoryClick(categ)}
                  className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left border"
                  style={{
                    background: isSelected ? "#000000" : "#fafafa",
                    borderColor: isSelected
                      ? "#000000"
                      : isCustom
                        ? "#d1d5db"
                        : "#e5e7eb",
                    borderStyle: isCustom && !isSelected ? "dashed" : "solid",
                    color: isSelected ? "#ffffff" : "#374151",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: isSelected ? "#ef4444" : categ.color }}
                  />
                  <span className="truncate">{categ.label.trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={() => finalCategory()}
            className="w-full py-3 rounded-xl bg-red-500 text-white text-sm font-bold tracking-wider hover:bg-red-black transition-colors duration-200"
          >
            Save Category
          </button>
        </div>
      </div>

      {showCustomUi && (
        <div
          className="absolute inset-0 z-60 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs overflow-hidden border border-gray-100">
            <div className="px-5 py-3 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-black text-sm font-bold tracking-tight">
                Custom Category
              </h3>
              <button
                onClick={() => setShowCustomUi(false)}
                className="text-gray-400 hover:text-black text-xs transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-500 text-xs mb-3 font-medium">
                Give your category a name
              </p>
              <input
                type="text"
                placeholder="eg. Groceries, Goals..."
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveCustom()}
                autoFocus
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-black transition-all placeholder-gray-300"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setShowCustomUi(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-black transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategorySelector;
