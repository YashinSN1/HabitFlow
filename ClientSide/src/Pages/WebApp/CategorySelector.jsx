import { useState } from "react";

const PredefinedCategories = [
  { id: "work", label: " Work", color: "#3b82f6" },
  { id: "personal", label: "Personal", color: "#10b981" },
  { id: "shopping", label: " Shopping", color: "#f59e0b" },
  { id: "health", label: " Health", color: "#ef4444" },
  { id: "finance", label: " Finance", color: "#8b5cf6" },
  { id: "travel", label: "Travel", color: "#06b6d4" },
  { id: "education", label: "Education", color: "#f97316" },
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
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        style={{
          border: "1.5px solid #fee2e2",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <div className="bg-red-500 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white text-xl font-black tracking-tight">
              Category
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white transition-colors duration-150 text-sm font-bold"
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
                  className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left"
                  style={{
                    background: isSelected
                      ? categ.color + "18"
                      : isCustom
                        ? "#fef2f2"
                        : "#f3f4f6",
                    border: isSelected
                      ? `2px solid ${categ.color}`
                      : isCustom
                        ? "2px dashed #ef4444"
                        : "2px solid transparent",
                    color: isSelected
                      ? categ.color
                      : isCustom
                        ? "black"
                        : "#374151",
                  }}
                >
                  <span className="text-base leading-none">
                    {categ.label.split(" ")[0]}
                  </span>
                  <span className="truncate">
                    {categ.label.split(" ").slice(1).join(" ")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={() => finalCategory()}
            className="w-full py-3 rounded-xl bg-black text-white text-sm font-bold tracking-wider hover:bg-red-500 transition-colors duration-200"
          >
            Save Category
          </button>
        </div>
      </div>

      {showCustomUi && (
        <div
          className="absolute inset-0 z-60 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.35)" }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xs overflow-hidden"
            style={{ border: "1.5px solid #e5e7eb" }}
          >
            <div className="bg-red-500 px-5 py-3 flex items-center justify-between">
              <h3 className="text-white text-sm font-bold tracking-tight">
                Custom Category
              </h3>
              <button
                onClick={() => setShowCustomUi(false)}
                className="text-white text-xs transition-colors"
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
                placeholder="eg. Grcoeries, Goals..."
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveCustom()}
                autoFocus
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all placeholder-gray-300"
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
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
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
