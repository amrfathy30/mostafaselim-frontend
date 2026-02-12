import React, { useState, useEffect } from "react";
import { getSetting, updateSetting } from "../../services/settingService";
import {
  getAdminProfile,
  updateAdminProfile,
} from "../../services/authService";

type TabType = "user" | "website";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("user");
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [passwordStep, setPasswordStep] = useState<1 | 2>(1);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingWebsite, setIsLoadingWebsite] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    full_name: "",
    email: "",
    bio: "",
    personal_aspect: "",
    educational_aspect: "",
    phone: "",
    user_cv_url: "", // 🔹 رابط السيرة الذاتية
    user_image_cover_url: "", // 🔹 رابط صورة الغلاف
    user_images_urls: [] as string[], // 🔹 روابط الصور
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [files, setFiles] = useState({
    cv: null as File | null,
    image_cover: null as File | null,
    images: [] as File[],
  });

  const [websiteInfo, setWebsiteInfo] = useState({
    site_name: "",
    site_email: "",
    site_phone: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    footer: "",
  });

  const [websiteFiles, setWebsiteFiles] = useState({
    logo: null as File | null,
    favicon: null as File | null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getAdminProfile();
        if (userRes.status === 200) {
          const data = userRes.data;
          setUserInfo({
            name: data.user_name || "",
            email: data.email || "",
            full_name: data.user_full_name || "",
            bio: data.user_bio || "",
            personal_aspect: data.user_personal || "",
            educational_aspect: data.user_educational || "",
            phone: data.user_phone || "",
            user_cv_url: data.user_cv || "",
            user_image_cover_url: data.user_image_cover || "",
            user_images_urls: data.user_images || [],
          });

          setFiles({
            cv: null,
            image_cover: null,
            images: [],
          });
        }
        const settingRes = await getSetting();
        if (settingRes.status === 200) {
          const s = settingRes.data;
          setWebsiteInfo({
            site_name: s.site_name || "",
            site_email: s.site_email || "",
            site_phone: s.site_phone || "",
            facebook: s.facebook || "",
            twitter: s.twitter || "",
            linkedin: s.linkedin || "",
            instagram: s.instagram || "",
            footer: s.footer || "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSaveWebsiteInfo = async () => {
    setIsLoadingWebsite(true);

    const formData = new FormData();

    formData.append("_method", "PUT");

    Object.entries(websiteInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (websiteFiles.logo) {
      formData.append("logo", websiteFiles.logo);
    }
    if (websiteFiles.favicon) {
      formData.append("favicon", websiteFiles.favicon);
    }

    try {
      const res = await updateSetting(formData);
      if (res.status === 200) {
        alert("تم تحديث إعدادات الموقع بنجاح");
      }
    } catch (error: any) {
      console.error("خطأ في التحديث:", error.response?.data);
      alert(error.response?.data?.message || "حدث خطأ أثناء الحفظ");
    } finally {
      setIsLoadingWebsite(false);
    }
  };

  const handleSaveUserInfo = async () => {
    setIsLoadingUser(true);
    const formData = new FormData();

    formData.append("_method", "PUT");

    formData.append("name", userInfo?.name?.trim() || "");
    formData.append("full_name", userInfo?.full_name?.trim() || "");
    formData.append("email", userInfo?.email?.trim() || "");
    formData.append("phone", userInfo?.phone?.trim() || "");
    formData.append("bio", userInfo?.bio?.trim() || "");
    formData.append("personal_aspect", userInfo?.personal_aspect?.trim() || "");
    formData.append(
      "educational_aspect",
      userInfo?.educational_aspect?.trim() || "",
    );

    if (files.cv instanceof File) {
      formData.append("cv", files.cv);
    }

    if (files.image_cover instanceof File) {
      formData.append("image_cover", files.image_cover);
    }

    if (files.images && files.images.length > 0) {
      files.images.forEach((file) => formData.append("images[]", file));
    }

    try {
      const res = await updateAdminProfile(formData);
      alert("تم تحديث معلومات المستخدم بنجاح");
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      if (errors) {
        const firstKey = Object.keys(errors)[0];
        alert(`خطأ في ${firstKey}: ${errors[firstKey][0]}`);
      } else {
        alert("حدث خطأ غير متوقع");
      }
    } finally {
      setIsLoadingUser(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-primary">الاعدادات</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("user")}
          className={`pb-3 px-4 text-[16px] font-medium hover:text-blue-500 hover:border-blue-500 cursor-pointer transition-colors ${
            activeTab === "user"
              ? "text-primary border-b-2 border-primary"
              : "text-[#6B7280] hover:text-primary "
          }`}
        >
          معلومات المستخدم
        </button>
        <button
          onClick={() => setActiveTab("website")}
          className={`pb-3 px-4 text-[16px] font-medium cursor-pointer hover:text-blue-500 hover:border-blue-500 transition-colors ${
            activeTab === "website"
              ? "text-primary border-b-2 border-primary"
              : "text-[#6B7280] hover:text-primary "
          }`}
        >
          معلومات الموقع
        </button>
      </div>

      {/* User Info Tab */}
      {activeTab === "user" && (
        <div className="space-y-6">
          <div className="bg-[#F3F4F6] rounded-[12px] p-6">
            <h2 className="text-[18px] font-bold text-[#2B2B2B] text-center mb-6">
              معلومات المستخدم
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                  الاسم
                </label>
                <input
                  type="text"
                  placeholder="الاسم"
                  value={userInfo?.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  placeholder="الاسم بالكامل"
                  value={userInfo?.full_name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, full_name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[14px] text-[#6B7280] mb-2 text-right"
                >
                  بريد إلكتروني
                </label>
                <input
                  type="email"
                  placeholder="البريد الالكتروني"
                  value={userInfo?.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                  الهاتف
                </label>
                <input
                  type="text"
                  placeholder="الهاتف"
                  value={userInfo?.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                النبذة التعريفية
              </label>
              <textarea
                value={userInfo?.bio}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, bio: e.target.value })
                }
                placeholder="تم التعديل"
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
              />
            </div>
            <div className="mt-4">
              <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                الجانب الشخصي
              </label>
              <textarea
                value={userInfo?.personal_aspect}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, personal_aspect: e.target.value })
                }
                placeholder="تم التعديل"
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
              />
            </div>
            <div className="mt-4">
              <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                الجانب التعليمي
              </label>
              <textarea
                value={userInfo?.educational_aspect}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    educational_aspect: e.target.value,
                  })
                }
                placeholder="تم التعديل"
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
              />
            </div>
            {/* File Uploads */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                  السيرة الذاتية
                </label>
                <div className="flex flex-col gap-4">
                  <input
                    type="file"
                    onChange={(e) =>
                      setFiles({ ...files, cv: e.target.files?.[0] || null })
                    }
                    className="hidden"
                    id="cv-upload"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary"
                  >
                    {files.cv?.name || "اختر ملف CV"}
                  </label>

                  {userInfo?.user_cv_url && !files.cv && (
                    <a
                      href={userInfo?.user_cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline text-[14px]"
                    >
                      عرض السيرة الذاتية الحالية
                    </a>
                  )}
                </div>{" "}
              </div>{" "}
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                  صورة الغلاف
                </label>
                <div className="flex flex-col gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFiles({
                        ...files,
                        image_cover: e.target.files?.[0] || null,
                      })
                    }
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary"
                  >
                    {"اختر صورة الغلاف"}
                  </label>

                  {(files.image_cover || userInfo?.user_image_cover_url) && (
                    <img
                      src={
                        files.image_cover
                          ? URL.createObjectURL(files.image_cover)
                          : userInfo.user_image_cover_url
                      }
                      alt="صورة الغلاف"
                      className="w-full h-40 object-contain rounded-lg border-white border-4"
                    />
                  )}
                </div>
              </div>{" "}
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                  الصور
                </label>
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        setFiles({
                          ...files,
                          images: Array.from(e.target.files || []),
                        })
                      }
                      className="hidden"
                      id="images-upload"
                    />
                    <label
                      htmlFor="images-upload"
                      className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary"
                    >
                      <span className="text-[14px] text-[#2B2B2B]">
                        {"اختر الصورة الشخصية"}
                      </span>
                    </label>{" "}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {files.images.length > 0
                      ? files.images.map((file, idx) => (
                          <img
                            key={`new-${idx}`}
                            src={URL.createObjectURL(file)}
                            alt={`ملف جديد ${idx + 1}`}
                            className="w-full h-40 object-contain rounded-lg border-white border-4"
                          />
                        ))
                      : userInfo?.user_images_urls?.map((url, idx) => (
                          <img
                            key={`server-${idx}`}
                            src={url}
                            alt={`صورة ${idx + 1}`}
                            className="w-full h-40 object-contain rounded-lg border-white border-4"
                          />
                        ))}
                  </div>{" "}
                </div>
              </div>{" "}
            </div>
            {/* Action Buttons */}
            <button
              onClick={handleSaveUserInfo}
              disabled={isLoadingUser}
              className="mt-6 bg-primary text-white px-8 py-3 rounded-lg hover:bg-[#2d4a62] cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              {isLoadingUser && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {isLoadingUser ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>{" "}
          </div>
        </div>
      )}

      {/* Website Info Tab */}
      {activeTab === "website" && (
        <div className="space-y-6">
          <div className="bg-[#F3F4F6] rounded-[12px] p-6">
            <h2 className="text-[18px] font-bold text-[#2B2B2B] text-center mb-6">
              معلومات الموقع
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                  {" "}
                  اسم الموقع
                </label>
                <input
                  type="text"
                  placeholder="اسم الموقع"
                  value={websiteInfo.site_name}
                  onChange={(e) =>
                    setWebsiteInfo({
                      ...websiteInfo,
                      site_name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                  البريد الإلكتروني للموقع
                </label>
                <input
                  type="email"
                  placeholder="البريد الإلكتروني للموقع"
                  value={websiteInfo.site_email}
                  onChange={(e) =>
                    setWebsiteInfo({
                      ...websiteInfo,
                      site_email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                  هاتف الموقع
                </label>
                <input
                  type="text"
                  value={websiteInfo.site_phone}
                  placeholder="هاتف الموقع"
                  onChange={(e) =>
                    setWebsiteInfo({
                      ...websiteInfo,
                      site_phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                  logo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setWebsiteFiles({
                        ...websiteFiles,
                        logo: e.target.files?.[0] || null,
                      })
                    }
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary"
                  >
                    <span className="text-[#6B7280]">×</span>
                    <span className="text-[14px] text-[#2B2B2B] truncate">
                      {websiteFiles.logo?.name ||
                        "eRuftg-Lp/Screenshot 2025-..."}
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                  favicon
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setWebsiteFiles({
                        ...websiteFiles,
                        favicon: e.target.files?.[0] || null,
                      })
                    }
                    className="hidden"
                    id="favicon-upload"
                  />
                  <label
                    htmlFor="favicon-upload"
                    className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary"
                  >
                    <span className="text-[#6B7280]">×</span>
                    <span className="text-[14px] text-[#2B2B2B] truncate">
                      {websiteFiles.favicon?.name ||
                        "E0vCz-PI8/Screenshot 2025-..."}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-[16px] font-bold text-[#2B2B2B] text-right mb-4">
                روابط التواصل الاجتماعي
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                    فيسبوك
                  </label>
                  <input
                    placeholder="فيسبوك"
                    type="url"
                    value={websiteInfo.facebook}
                    onChange={(e) =>
                      setWebsiteInfo({
                        ...websiteInfo,
                        facebook: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                    تويتر
                  </label>
                  <input
                    placeholder="فتويتر"
                    type="url"
                    value={websiteInfo.twitter}
                    onChange={(e) =>
                      setWebsiteInfo({
                        ...websiteInfo,
                        twitter: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                    تيك توك
                  </label>
                  <input
                    placeholder="تيك توك"
                    type="url"
                    value={websiteInfo.linkedin}
                    onChange={(e) =>
                      setWebsiteInfo({
                        ...websiteInfo,
                        linkedin: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                    إنستجرام
                  </label>
                  <input
                    placeholder="إنستجرام"
                    type="url"
                    value={websiteInfo.instagram}
                    onChange={(e) =>
                      setWebsiteInfo({
                        ...websiteInfo,
                        instagram: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4">
              <label className="block text-[14px] text-[#6B7280] mb-2 text-right">
                footer
              </label>
              <textarea
                value={websiteInfo.footer}
                onChange={(e) =>
                  setWebsiteInfo({ ...websiteInfo, footer: e.target.value })
                }
                placeholder="تم التعديل"
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Save Button */}
            <div className="mt-6 flex">
              <button
                onClick={handleSaveWebsiteInfo}
                disabled={isLoadingWebsite}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-[#2d4a62] cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                {isLoadingWebsite && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {isLoadingWebsite ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>{" "}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
