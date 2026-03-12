import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  adminAddBlog,
  adminUpdateBlog,
  adminGetBlog,
} from "../../services/blogService";
import { adminGetCategories } from "../../services/categoryService";
import toast from "react-hot-toast";

const AddBlog: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = !!id;

  const backPage = new URLSearchParams(location.search).get("page") || "1";
  const backUrl = `/admin/blog?page=${backPage}`;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [blogInfo, setBlogInfo] = useState({
    publisherName: "دكتور مصطفى سليم",
    categoryId: "",
    // year: "",
  });
  const [postTitle, setPostTitle] = useState("");
  const [postDetails, setPostDetails] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const catResponse = await adminGetCategories();
        const cats = catResponse.data || [];
        setCategories(Array.isArray(cats) ? cats : []);

        if (isEditMode) {
          const blogRes = await adminGetBlog(id!);
          const blog = blogRes.data;

          setPostTitle(blog.blog_title || "");
          setPostDetails(blog.blog_content || "");

          const matchedCat = cats.find(
            (c: any) =>
              c.category_title === blog.blog_classification ||
              c.category_id === blog.category_id,
          );

          setBlogInfo({
            publisherName: blog.blog_publisher || "دكتور مصطفى سليم",
            categoryId: matchedCat
              ? String(matchedCat.category_id)
              : String(blog.category_id || "")
            // year: blog.blog_date || "",
          });

          if (blog.blog_image_cover) {
            setImagePreview(blog.blog_image_cover);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadInitialData();
  }, [id, isEditMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/svg+xml", "image/webp"];
      const allowedExtensions = ["jpeg", "png", "jpg", "gif", "svg", "webp"];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!allowedTypes.includes(file.type) || (fileExtension && !allowedExtensions.includes(fileExtension))) {
        toast.error("عذراً، يجب أن يكون الملف صورة من نوع: jpeg, png, jpg, gif, svg, webp");
        e.target.value = ""; // Clear input
        setSelectedFile(null);
        setImagePreview(null);
        setErrors(prev => ({ ...prev, image: "نوع الملف غير مدعوم" }));
        return;
      }

      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      // Clear image error if any
      setErrors(prev => ({ ...prev, image: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!postTitle.trim()) {
      newErrors.title = "يجب إدخال عنوان المنشور";
    } else if (postTitle.trim().length < 5) {
      newErrors.title = "يجب أن يكون عنوان المنشور 5 حروف على الأقل";
    }

    if (!postDetails.trim()) {
      newErrors.content = "يجب إدخال محتوى المنشور";
    } else if (postDetails.trim().length < 20) {
      newErrors.content = "يجب أن يكون محتوى المنشور 20 حرف على الأقل";
    }

    const titleRegex = /[<>{}[\\]|]/;

    if (titleRegex.test(postTitle)) {
      newErrors.title = "العنوان يحتوي على رموز غير مسموحة";
    }

    if (titleRegex.test(postDetails)) {
      newErrors.content = "محتوى المنشور يحتوي على رموز غير مسموحة";
    }

    if (titleRegex.test(blogInfo.publisherName)) {
      newErrors.publisher = "اسم الناشر يحتوي على رموز غير مسموحة";
    }

    if (!blogInfo.categoryId) {
      newErrors.category = "يجب اختيار نوع المنشور";
    }

    if (!blogInfo.publisherName.trim()) {
      newErrors.publisher = "يجب إدخال اسم الناشر";
    }

    if (!isEditMode && !selectedFile) {
      newErrors.image = "يجب رفع صورة غلاف المنشور";
    } else if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/svg+xml", "image/webp"];
      if (!allowedTypes.includes(selectedFile.type)) {
        newErrors.image = "صورة الغلاف يجب أن تكون صورة صالحة (jpeg, png, etc.)";
      }
    }

    setErrors(newErrors);

    // Show errors in toast
    const errorList = Object.values(newErrors);
    if (errorList.length > 0) {
      errorList.forEach((err) => toast.error(err));
      return false;
    }

    return true;
  };

  const handlePublish = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", postTitle.trim());
      formData.append("content", postDetails.trim());
      formData.append(
        "publisher",
        blogInfo.publisherName.trim() || "دكتور مصطفى سليم",
      );
      formData.append("category_id", blogInfo.categoryId);
      // formData.append("date", blogInfo.year || "2026");

      if (selectedFile) {
        formData.append("image_cover", selectedFile);
        formData.append("image_content", selectedFile);
      }

      if (isEditMode) {
        await adminUpdateBlog(id!, formData);
      } else {
        await adminAddBlog(formData);
      }
      toast.success(isEditMode ? "تم التحديث بنجاح" : "تم الإضافة بنجاح");

      navigate(backUrl);
    } catch (error: any) {
      console.error("Error saving blog:", error);
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const mappedErrors: Record<string, string> = {};

        // Map backend errors to local error state keys
        if (backendErrors.title) mappedErrors.title = Array.isArray(backendErrors.title) ? backendErrors.title[0] : backendErrors.title;
        if (backendErrors.content) mappedErrors.content = Array.isArray(backendErrors.content) ? backendErrors.content[0] : backendErrors.content;
        if (backendErrors.category_id) mappedErrors.category = Array.isArray(backendErrors.category_id) ? backendErrors.category_id[0] : backendErrors.category_id;
        if (backendErrors.publisher) mappedErrors.publisher = Array.isArray(backendErrors.publisher) ? backendErrors.publisher[0] : backendErrors.publisher;
        if (backendErrors.image_cover) mappedErrors.image = Array.isArray(backendErrors.image_cover) ? backendErrors.image_cover[0] : backendErrors.image_cover;

        setErrors(mappedErrors);

        const errorMessages = Object.values(backendErrors).flat().join("\n");
        toast.error(`${errorMessages}`);
      } else {
        const errorMsg = error.response?.data?.message || "حدث خطأ أثناء الحفظ";
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = isEditMode ? "تعديل مدونة - دكتور مصطفي سليم" : "أضف مدونة - دكتور مصطفي سليم";
  }, [isEditMode]);

  return (
    <div className="md:p-8 w-full font-expo overflow-y-auto" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[#3A5F7D]">
          {isEditMode ? "تعديل مدونة" : "أضف مدونة"}
        </h1>
        <button
          onClick={() => navigate(backUrl)}
          className="text-[#3A5F7D] text-xl hover:text-primary transition-colors cursor-pointer hover:underline"
        >
          عودة
        </button>
      </div>

      <div className="space-y-6 max-w-5xl">
        <div className="bg-[#F3F4F6] rounded-[12px] p-2 md:p-6 border border-gray-100 shadow-sm">
          <h2 className="text-[20px] font-bold text-[#3A5F7D] text-right mb-6">
            معلومات الناشر
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="اسم الناشر"
                value={blogInfo.publisherName}
                onChange={(e) => {
                  setBlogInfo({ ...blogInfo, publisherName: e.target.value });
                  if (errors.publisher) setErrors(prev => ({ ...prev, publisher: "" }));
                }}
                className={`px-4 py-3 bg-white border border-gray-200 rounded-md text-right outline-none text-black font-bold focus:border-[#3A5F7D]`}
              />
              {/* {errors.publisher && <span className="text-red-500 text-sm mt-1">{errors.publisher}</span>} */}
            </div>

            <div className="flex flex-col gap-1">
              <select
                value={blogInfo.categoryId}
                onChange={(e) => {
                  setBlogInfo({ ...blogInfo, categoryId: e.target.value });
                  if (errors.category) setErrors(prev => ({ ...prev, category: "" }));
                }}
                className={`px-4 py-3 bg-white border border-gray-200 rounded-md text-right outline-none focus:border-primary cursor-pointer font-bold text-black`}
              >
                <option value="">اختر نوع المنشور</option>
                {categories.map((cat) => (
                  <option key={cat.category_id} value={String(cat.category_id)}>
                    {cat.category_title}
                  </option>
                ))}
              </select>
              {/* {errors.category && <span className="text-red-500 text-sm mt-1">{errors.category}</span>} */}
            </div>

            <div className="relative col-span-1 md:col-span-2">
              <input
                type="file"
                id="cover"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <label
                htmlFor="cover"
                className={`block px-4 py-3 bg-[#3A5F7D] hover:bg-[#2d4a62] text-white rounded-md text-center cursor-pointer font-bold transition-all shadow-sm`}
              >
                {selectedFile
                  ? selectedFile.name
                  : isEditMode
                    ? "تغيير الصورة (اختياري)"
                    : "ارفع صورة غلاف المنشور"}
              </label>
              {/* {errors.image && <span className="text-red-500 text-sm mt-1 block text-center">{errors.image}</span>} */}
            </div>
          </div>
          {imagePreview && (
            <div className="mt-6 flex justify-center">
              <img
                src={imagePreview}
                className="h-40 w-auto rounded-xl shadow-lg border-4 border-white object-cover"
                alt="preview"
              />
            </div>
          )}
        </div>

        <div className="bg-[#F3F4F6] rounded-[12px] p-2 md:p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-bold text-[#2B2B2B]">
              محتوي المنشور
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="عنوان المنشور"
                value={postTitle}
                onChange={(e) => {
                  setPostTitle(e.target.value);
                  if (errors.title) setErrors(prev => ({ ...prev, title: "" }));
                }}
                // className={`w-full px-4 py-3 bg-white border ${errors.title ? 'border-red-500' : 'border-gray-200'} rounded-md text-right outline-none focus:border-primary font-bold text-black`}
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-right outline-none focus:border-primary font-bold text-black`}
              />
              {/* {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title}</span>} */}
            </div>

            <div className="flex flex-col gap-1">
              <textarea
                placeholder="تفاصيل المنشور"
                value={postDetails}
                onChange={(e) => {
                  setPostDetails(e.target.value);
                  if (errors.content) setErrors(prev => ({ ...prev, content: "" }));
                }}
                rows={10}
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-right outline-none focus:border-primary resize-none text-black`}
              />
              {/* {errors.content && <span className="text-red-500 text-sm mt-1">{errors.content}</span>} */}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePublish}
            disabled={loading}
            className="bg-[#007FFF] cursor-pointer text-white px-20 py-4 rounded-xl font-bold hover:bg-[#2d4a62] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "جاري المعالجة..."
              : isEditMode
                ? "تحديث المنشور"
                : "نشر المنشور"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
