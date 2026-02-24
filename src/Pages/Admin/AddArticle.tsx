import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../Components/Common/button";
import {
  adminAddArticle,
  adminUpdateArticle,
  adminGetArticle,
} from "../../services/articleService";
import { adminGetCategories } from "../../services/categoryService";
import toast from "react-hot-toast";

interface SectionContent {
  type: "text" | "image" | "video";
  content: string | File;
  isNew?: boolean;
}

interface Paragraph {
  id: number;
  title: string;
  contents: SectionContent[];
}

const AddArticle: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [articleInfo, setArticleInfo] = useState({
    title: "",
    type: "",
    author: "",
    published: "",
    categoryId: "",
    year: "",
    references: [] as string[],
  });

  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
    {
      id: 1,
      title: "",
      contents: [{ type: "text", content: "" }],
    },
  ]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const catRes = await adminGetCategories();
        const cats = catRes.data?.data || catRes.data || [];
        setCategories(cats);

        if (isEditMode) {
          const res = await adminGetArticle(id!);
          const data = res.data;

          const matchedCat = cats.find(
            (c: any) =>
              (c.title || c.category_title) === data.article_classification,
          );

          setArticleInfo({
            title: data.article_title || "",
            type: data.article_type || "",
            author: data.article_author || "",
            published: data.article_publisher || "",
            categoryId: matchedCat
              ? String(matchedCat.id || matchedCat.category_id)
              : String(data.category_id || ""),
            year: data.article_date
              ? data.article_date.split("/")[2] || data.article_date
              : "",
            references: data.article_reference
              ? JSON.parse(data.article_reference[0] || "[]")
              : [],
          });

          if (data.article_sections) {
            const mappedParagraphs = data.article_sections.map(
              (sec: any, index: number) => {
                const contentArray = Array.isArray(sec.section_content)
                  ? sec.section_content
                  : sec.section_content
                    ? [sec.section_content]
                    : [];

                return {
                  id: index + 1,
                  title: sec.section_title || "",
                  contents: contentArray.map((c: any) => ({
                    type: c.type,
                    content: c.content,
                  })),
                };
              },
            );

            setParagraphs(mappedParagraphs);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadInitialData();
  }, [id, isEditMode]);

  const addParagraph = () => {
    setParagraphs([
      ...paragraphs,
      { id: Date.now(), title: "", contents: [{ type: "text", content: "" }] },
    ]);
  };

  const updateParagraph = (
    pid: number,
    field: "title" | "details",
    value: string,
  ) => {
    setParagraphs(
      paragraphs.map((p) => (p.id === pid ? { ...p, [field]: value } : p)),
    );
  };

  const handlePublish = async () => {
    console.log("PUBLISH CALLED");
    if (loading) return;
    if (!articleInfo.title.trim() || !articleInfo.categoryId)
      return toast.error("يرجى ملء الحقول المطلوبة");

    setLoading(true);
    const formData = new FormData();

    formData.append("title", articleInfo.title);
    formData.append("type", articleInfo.type || "مقالة");
    formData.append("year", articleInfo.year);
    formData.append("category_id", articleInfo.categoryId);
    formData.append("writer", articleInfo.author || "دكتور مصطفى سليم");
    formData.append("post_by", articleInfo.published || "دكتور مصطفى سليم");
    formData.append("references[]", JSON.stringify(articleInfo.references));
    paragraphs.forEach((p, pIndex) => {
      formData.append(`sections[${pIndex}][title]`, p.title);

      formData.append(`sections[${pIndex}][order]`, String(pIndex + 1));

      p.contents.filter((c) => {
        if (c.type === "image" && !(c.content instanceof File)) {
          return false;
        }
        return true;
      });
      p.contents
        .filter((c) => {
          if (c.type === "image" && !c.isNew) return false;
          return true;
        })
        .forEach((c, cIndex) => {
          formData.append(
            `sections[${pIndex}][content][${cIndex}][type]`,
            c.type,
          );

          if (c.type === "image") {
            formData.append(
              `sections[${pIndex}][content][${cIndex}][content]`,
              c.content as File,
            );
          } else {
            formData.append(
              `sections[${pIndex}][content][${cIndex}][content]`,
              c.content as string,
            );
          }
        });
    });
    if (isEditMode) {
      formData.append("_method", "PUT");
    }
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      if (isEditMode) await adminUpdateArticle(id!, formData);
      else await adminAddArticle(formData);
      toast.success("تم الحفظ بنجاح");
      navigate("/admin/articles");
    } catch (error: any) {
      const serverErrors = error.response?.data?.errors as Record<
        string,
        string[]
      >;
      if (serverErrors) {
        const firstErrorArray = Object.values(serverErrors)[0];
        toast.error(firstErrorArray[0], {
          id: "article-error",
        });
      } else {
        toast.error("حدث خطأ في الحفظ");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (paragraphId: number, imageIndex: number) => {
    setParagraphs((prev) =>
      prev.map((p) => {
        if (p.id !== paragraphId) return p;

        return {
          ...p,
          contents: p.contents.filter((_, idx) => idx !== imageIndex),
        };
      }),
    );
  };
  return (
    <div className="font-expo pb-10 md:px-6" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[32px] font-bold text-[#3A5F7D]">
          {isEditMode ? "تعديل مقالة" : "أضف مقالة"}
        </h1>
        <button
          onClick={() => navigate("/admin/articles")}
          className="text-lg text-[#3A5F7D] cursor-pointer hover:underline font-bold"
        >
          عودة
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-[#E8E8E8] rounded-[12px] p-2 md:p-6 shadow-sm border border-gray-100">
          <h2 className="text-[22px] text-primary text-right mb-6 font-bold">
            معلومات المقالة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="عنوان المقالة"
              value={articleInfo.title}
              onChange={(e) =>
                setArticleInfo({ ...articleInfo, title: e.target.value })
              }
              className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-semibold text-black"
            />
            <input
              type="text"
              placeholder="نوع المقالة"
              value={articleInfo.type}
              onChange={(e) =>
                setArticleInfo({ ...articleInfo, type: e.target.value })
              }
              className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-semibold text-black"
            />
            <input
              type="text"
              placeholder="الكاتب"
              value={articleInfo.author}
              onChange={(e) =>
                setArticleInfo({ ...articleInfo, author: e.target.value })
              }
              className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-semibold text-black"
            />
            <input
              type="text"
              placeholder="دار النشر"
              value={articleInfo.published}
              onChange={(e) =>
                setArticleInfo({ ...articleInfo, published: e.target.value })
              }
              className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-semibold text-black"
            />
            <select
              value={articleInfo.categoryId}
              onChange={(e) =>
                setArticleInfo({ ...articleInfo, categoryId: e.target.value })
              }
              className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-bold text-black"
            >
              <option value="">اختر التصنيف</option>
              {categories.map((cat) => (
                <option
                  key={cat.id || cat.category_id}
                  value={cat.id || cat.category_id}
                >
                  {cat.title || cat.category_title}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={articleInfo.year}
              onChange={(e) =>
                setArticleInfo({ ...articleInfo, year: e.target.value })
              }
              className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-semibold text-black"
            />
          </div>
        </div>

        <div className="bg-[#E8E8E8] rounded-[12px] p-2 md:p-6 shadow-sm border border-gray-100">
          <h2 className="text-[22px] text-primary text-right mb-6 font-bold">
            محتوي المقالة
          </h2>
          <div className="space-y-6">
            {paragraphs.map((p, index) => (
              <div
                key={p.id}
                className="bg-[#D9D9D9] rounded-[12px] p-2 md:p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between flex-col md:flex-row gap-3 mb-4">
                  <h3 className="text-[18px] text-primary font-bold">
                    الفقرة {index + 1}
                  </h3>
                  <div className="flex flex-col md:flex-row gap-2">
                    {!p.contents.some((c) => c.type === "video") && (
                      <Button
                        className="w-[140px] h-10 hover:bg-primary"
                        type="primary"
                        onClick={() => {
                          setParagraphs(
                            paragraphs.map((para) =>
                              para.id === p.id
                                ? {
                                    ...para,
                                    contents: [
                                      ...para.contents,
                                      {
                                        type: "video",
                                        content: "",
                                      },
                                    ],
                                  }
                                : para,
                            ),
                          );
                        }}
                      >
                        أضف فيديو
                      </Button>
                    )}{" "}
                    <Button
                      className="w-[140px] h-10 hover:bg-primary"
                      type="primary"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";
                        input.multiple = true;
                        input.onchange = (e: Event) => {
                          const target = e.target as HTMLInputElement;
                          const files = Array.from(
                            target.files || [],
                          ) as File[];
                          if (!files.length) return;
                          setParagraphs((prev) =>
                            prev.map((para) =>
                              para.id === p.id
                                ? {
                                    ...para,
                                    contents: [
                                      ...para.contents,
                                      ...files.map(
                                        (file): SectionContent => ({
                                          type: "image",
                                          content: file,
                                          isNew: true,
                                        }),
                                      ),
                                    ],
                                  }
                                : para,
                            ),
                          );
                        };
                        input.click();
                      }}
                    >
                      أضف صورة
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="عنوان الفقرة"
                    value={p.title}
                    onChange={(e) =>
                      updateParagraph(p.id, "title", e.target.value)
                    }
                    className="bg-white w-full px-4 py-3 rounded-lg text-right outline-none font-bold text-black"
                  />
                  <textarea
                    placeholder="تفاصيل الفقرة"
                    value={
                      (p.contents?.find((c) => c.type === "text")
                        ?.content as string) || ""
                    }
                    rows={6}
                    className="bg-white w-full px-4 py-3 rounded-lg text-right outline-none resize-none font-semibold min-h-[250px] text-black mb-1"
                    onChange={(e) =>
                      setParagraphs(
                        paragraphs.map((para) =>
                          para.id === p.id
                            ? {
                                ...para,
                                contents: para.contents.map((c) =>
                                  c.type === "text"
                                    ? { ...c, content: e.target.value }
                                    : c,
                                ),
                              }
                            : para,
                        ),
                      )
                    }
                  />
                  {p.contents
                    ?.filter((c) => c.type === "video")
                    .map((video, vIndex) => (
                      <div key={vIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="رابط الفيديو"
                          value={video.content as string}
                          onChange={(e) => {
                            setParagraphs(
                              paragraphs.map((para) =>
                                para.id === p.id
                                  ? {
                                      ...para,
                                      contents: para.contents.map((c, idx) =>
                                        c.type === "video" &&
                                        para.contents.indexOf(video) === idx
                                          ? { ...c, content: e.target.value }
                                          : c,
                                      ),
                                    }
                                  : para,
                              ),
                            );
                          }}
                          className="bg-white w-full px-4 py-2 rounded-lg text-right outline-none font-semibold text-black"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setParagraphs(
                              paragraphs.map((para) =>
                                para.id === p.id
                                  ? {
                                      ...para,
                                      contents: para.contents.filter(
                                        (c) => c !== video,
                                      ),
                                    }
                                  : para,
                              ),
                            )
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
                        >
                          حذف
                        </button>
                      </div>
                    ))}
                  <div className="flex flex-wrap gap-4">
                    {p.contents.map((contentItem, idx) => {
                      if (contentItem.type !== "image") return null;

                      return (
                        <div key={idx} className="relative w-32 h-32">
                          <img
                            src={
                              typeof contentItem.content === "string"
                                ? contentItem.content
                                : URL.createObjectURL(contentItem.content)
                            }
                            alt="preview"
                            className="w-full h-full object-cover rounded"
                          />

                          <button
                            type="button"
                            onClick={() => removeImage(p.id, idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded cursor-pointer"
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#E8E8E8] rounded-[12px] p-2 md:p-6 shadow-sm border border-gray-100 mt-6">
          <label className="font-bold text-[#3A5F7D]">المراجع</label>

          {(articleInfo.references?.length ? articleInfo.references : [""]).map(
            (ref, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={ref}
                  placeholder={`مرجع ${index + 1}`}
                  onChange={(e) => {
                    const newRefs = [...(articleInfo.references || [])];
                    newRefs[index] = e.target.value;
                    setArticleInfo({ ...articleInfo, references: newRefs });
                  }}
                  className="flex-1 md:px-4 py-3 rounded-lg border border-gray-200 text-right outline-none bg-white font-bold text-black mt-2"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newRefs = [...(articleInfo.references || [])];
                      newRefs.splice(index, 1);
                      setArticleInfo({ ...articleInfo, references: newRefs });
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    X
                  </button>
                )}
              </div>
            ),
          )}

          <Button
            type="primary"
            className="w-[140px] h-10 hover:bg-primary mt-3"
            onClick={() => {
              const newRefs = [...(articleInfo.references || []), ""];
              setArticleInfo({ ...articleInfo, references: newRefs });
            }}
          >
            إضافة مرجع
          </Button>
        </div>
        <div className="flex items-center justify-center gap-4 py-4">
          <Button
            className="w-[273px] h-[52px] hover:bg-primary"
            type="primary"
            onClick={addParagraph}
          >
            أضف فقرة
          </Button>
          <Button
            className="w-[273px] h-[52px] hover:bg-primary"
            type="primary"
            onClick={handlePublish}
            loading={loading}
          >
            {loading
              ? isEditMode
                ? "جاري التحديث..."
                : "جاري النشر..."
              : isEditMode
                ? "تحديث المقالة"
                : "نشر المقالة"}
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
