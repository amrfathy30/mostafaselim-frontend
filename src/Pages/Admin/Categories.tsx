import { useState, useEffect } from "react";
import { Button } from "../../Components/Common/button";
import toast from "react-hot-toast";
import {
  adminUpdateCategory,
  adminGetCategories,
  adminDeleteCategory,
  adminAddCategory,
} from "../../services/categoryService";
import AdminPageHeader from "../components/page-header";
import AdminPageLoading from "../components/loading";
import DeleteModal from "./DeleteModal";
import { AiOutlineClose } from "react-icons/ai";

const Categories: React.FC = () => {
  const [Categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [startSearch, setStartSearch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState("");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await adminGetCategories();
      setCategories(res.data || []);
      setFilteredCategories(res.data || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openEditModal = (category: any) => {
    setSelectedCategory(category);
    setEditCategoryName(category.category_title);
    setEditModalOpen(true);
  };

  const saveCategoryEdit = async () => {
    if (!selectedCategory) return;
    try {
      await adminUpdateCategory(selectedCategory.category_id, {
        title: editCategoryName,
      });
      toast.success("تم تعديل التصنيف بنجاح");
      setEditModalOpen(false);
      setCategories((prev) =>
        prev.map((cat) =>
          cat.category_id === selectedCategory.category_id
            ? { ...cat, category_title: editCategoryName }
            : cat,
        ),
      );
    } catch (err: any) {
      toast.error("حدث خطأ أثناء التعديل");
      console.error(err);
    }
  };

  const saveNewCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("أدخل اسم التصنيف أولاً");
      return;
    }
    try {
      await adminAddCategory({ title: newCategoryName });
      toast.success("تم إضافة التصنيف بنجاح");
      setAddModalOpen(false);
      setNewCategoryName("");

      await fetchCategories();
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      if (errors?.title) {
        toast.error(errors.title[0]);
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("حدث خطأ أثناء الإضافة");
      }
    }
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;
    try {
      await adminDeleteCategory(selectedCategory.category_id);
      toast.success("تم الحذف بنجاح");
      setIsModalOpen(false);
      setCategories((prev) =>
        prev.filter((cat) => cat.category_id !== selectedCategory.category_id),
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCategories(Categories);
    } else {
      const filtered = Categories.filter((cat) =>
        cat.category_title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, Categories]);

  return (
    <>
      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemTitle={selectedCategory?.category_title || ""}
        itemType="التصنيف"
      />

      {/* Page Header */}
      <AdminPageHeader
        total={Categories.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setStartSearch={setStartSearch}
        btnLoading={loading && startSearch}
        title="التصنيفات"
        titleSingle="التصنيف"
        type="Categories"
        onSearchClick={fetchCategories}
        onAddClick={() => setAddModalOpen(true)}
      />

      <div className="space-y-6 font-expo">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 border border-gray-200 flex flex-col justify-between shadow-sm animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>{" "}
                <div className="flex gap-3">
                  <div className="h-10 bg-gray-300 rounded w-1/2"></div>{" "}
                  <div className="h-10 bg-gray-300 rounded w-1/2"></div>{" "}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCategories.map((category) => (
              <div
                key={category.category_id}
                className="bg-white rounded-lg p-6 border border-gray-200 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <h3 className="text-primary text-xl font-bold mb-4 text-right line-clamp-1">
                    {category.category_title}
                  </h3>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="w-1/2 hover:bg-primary"
                    onClick={() => openEditModal(category)}
                    type="primary"
                  >
                    تعديل
                  </Button>
                  <Button
                    className="w-1/2 hover:bg-red-500"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsModalOpen(true);
                    }}
                    type="danger"
                  >
                    حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && Categories.length === 0 && (
          <div className="text-center text-[#6B7280] py-8">لا توجد تصنيفات</div>
        )}
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-5/12 relative">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-red-500 cursor-pointer"
            >
              <AiOutlineClose size={24} />
            </button>

            <h2 className="text-lg font-bold mb-4 text-right">
              تعديل اسم التصنيف
            </h2>
            <input
              type="text"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right outline-none focus:border-primary mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button
                className="w-1/2 hover:bg-red-500"
                onClick={() => setEditModalOpen(false)}
                type="danger"
              >
                إلغاء
              </Button>
              <Button
                className="w-1/2 hover:bg-primary"
                onClick={saveCategoryEdit}
                type="primary"
              >
                حفظ
              </Button>
            </div>
          </div>
        </div>
      )}

      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-5/12 relative">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-red-500 cursor-pointer"
            >
              <AiOutlineClose size={24} />
            </button>

            <h2 className="text-lg font-bold mb-4 text-right">
              إضافة تصنيف جديد
            </h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right outline-none focus:border-primary mb-4"
              placeholder="اسم التصنيف"
            />
            <div className="flex justify-end gap-2">
              <Button
                className="w-1/2 hover:bg-red-500"
                onClick={() => setAddModalOpen(false)}
                type="danger"
              >
                إلغاء
              </Button>
              <Button
                className="w-1/2 hover:bg-primary"
                onClick={saveNewCategory}
                type="primary"
              >
                حفظ
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
