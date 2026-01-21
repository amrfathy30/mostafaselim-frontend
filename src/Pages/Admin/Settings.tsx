import React, { useState, useEffect } from 'react';
import { getSetting, updateSetting } from '../../services/settingService';
import { getAdminProfile, updateAdminProfile } from '../../services/authService';

type TabType = 'user' | 'website';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('user');
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [passwordStep, setPasswordStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: '',
    full_name: '',
    email: '',
    bio: '',
    personal_aspect: '',
    educational_aspect: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [files, setFiles] = useState({
    cv: null as File | null,
    image_cover: null as File | null,
    images: [] as File[],
  });

  const [websiteInfo, setWebsiteInfo] = useState({
    site_name: '',
    site_email: '',
    site_phone: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    footer: '',
  });

  const [websiteFiles, setWebsiteFiles] = useState({
    logo: null as File | null,
    favicon: null as File | null,
  });

useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [settingRes, userRes] = await Promise.all([
          getSetting(),
          getAdminProfile()
        ]);

        if (settingRes) {
          setWebsiteInfo(prev => ({ ...prev, ...settingRes.data || settingRes }));
        }

        if (userRes) {
          const userData = userRes.data || userRes;
          setUserInfo({
            name: userData.name || '',
            full_name: userData.full_name || '',
            email: userData.email || '',
            bio: userData.bio || '',
            personal_aspect: userData.personal_aspect || '',
            educational_aspect: userData.educational_aspect || '',
            phone: userData.phone || '',
          });
          const response = await getSetting();
        if (response.status === 200) {
          setWebsiteInfo({
            site_name: response.data.site_name || '',
            site_email: response.data.site_email || '',
            site_phone: response.data.site_phone || '',
            facebook: response.data.facebook || '',
            twitter: response.data.twitter || '',
            linkedin: response.data.linkedin || '',
            instagram: response.data.instagram || '',
            footer: response.data.footer || '',
          });}
        }
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
      }
    };

    fetchAllData();
  }, []);


  const handleSaveWebsiteInfo = async () => {
    const formData = new FormData();
    
    formData.append('_method', 'PUT'); 

     Object.entries(websiteInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (websiteFiles.logo) {
      formData.append('logo', websiteFiles.logo);
    }
    if (websiteFiles.favicon) {
      formData.append('favicon', websiteFiles.favicon);
    }

    try {
      const res = await updateSetting(formData);
      if (res.status === 200) {
        alert("تم تحديث إعدادات الموقع بنجاح");
      }
    } catch (error: any) {
      console.error("خطأ في التحديث:", error.response?.data);
      alert(error.response?.data?.message || "حدث خطأ أثناء الحفظ");
    }
  };

const handleSaveUserInfo = async () => {
    setIsLoading(true);
    const formData = new FormData();
    
    formData.append('_method', 'PUT'); 

    formData.append('name', userInfo.name.trim());
    formData.append('full_name', userInfo.full_name.trim());
    formData.append('email', userInfo.email.trim());
    formData.append('phone', userInfo.phone.trim());
    formData.append('bio', userInfo.bio.trim());
    formData.append('personal_aspect', userInfo.personal_aspect.trim());
    formData.append('educational_aspect', userInfo.educational_aspect.trim());

    if (files.cv instanceof File) {
        formData.append('cv', files.cv);
    }
    
    if (files.image_cover instanceof File) {
        formData.append('image_cover', files.image_cover);
    }

    if (files.images && files.images.length > 0) {
        files.images.forEach((file) => formData.append('images[]', file));
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
        setIsLoading(false);
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
          onClick={() => setActiveTab('user')}
          className={`pb-3 px-4 text-[16px] font-medium transition-colors ${
            activeTab === 'user'
              ? 'text-primary border-b-2 border-primary'
              : 'text-[#6B7280] hover:text-primary'
          }`}
        >
          معلومات المستخدم
        </button>
        <button
          onClick={() => setActiveTab('website')}
          className={`pb-3 px-4 text-[16px] font-medium transition-colors ${
            activeTab === 'website'
              ? 'text-primary border-b-2 border-primary'
              : 'text-[#6B7280] hover:text-primary'
          }`}
        >
          معلومات الموقع
        </button>
      </div>

      {/* User Info Tab */}
      {activeTab === 'user' && (
        <div className="space-y-6">
          <div className="bg-[#F3F4F6] rounded-[12px] p-6">
            <h2 className="text-[18px] font-bold text-[#2B2B2B] text-center mb-6">معلومات المستخدم</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">الاسم</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">الاسم الكامل</label>
                <input
                  type="text"
                  value={userInfo.full_name}
                  onChange={(e) => setUserInfo({ ...userInfo, full_name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">بريد إلكتروني</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">الهاتف</label>
                <input
                  type="text"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[14px] text-[#6B7280] mb-2 text-right">النبذة التعريفية</label>
              <textarea
                value={userInfo.bio}
                onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                placeholder="تم التعديل"
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="mt-4">
              <label className="block text-[14px] text-[#6B7280] mb-2 text-right">الجانب الشخصي</label>
              <textarea
                value={userInfo.personal_aspect}
                onChange={(e) => setUserInfo({ ...userInfo, personal_aspect: e.target.value })}
                placeholder="تم التعديل"
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="mt-4">
              <label className="block text-[14px] text-[#6B7280] mb-2 text-right">الجانب التعليمي</label>
              <textarea
                value={userInfo.educational_aspect}
                onChange={(e) => setUserInfo({ ...userInfo, educational_aspect: e.target.value })}
                placeholder="تم التعديل"
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
              />
            </div>

            {/* File Uploads */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">السيرة الذاتية</label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setFiles({ ...files, cv: e.target.files?.[0] || null })}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary"
                  >
                    <span className="text-[14px] text-[#2B2B2B] truncate">
                      {files.cv?.name || 'لم يتم اختيار ملف'} 
                        </span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">صورة الغلاف</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFiles({ ...files, image_cover: e.target.files?.[0] || null })}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary"
                  >
                    <span className="text-[14px] text-[#2B2B2B] truncate">
                         {files.image_cover ? files.image_cover.name : 'اختر صورة الغلاف...'}
                      </span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">الصور</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setFiles({ ...files, images: Array.from(e.target.files || []) })}
                    className="hidden"
                    id="images-upload"
                  />
                  <label
                    htmlFor="images-upload"
                    className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary"
                  >
                    <span className="text-[14px] text-[#2B2B2B]">
                      {files.images.length > 0 
                        ? `${files.images.length} ملفات مختارة` 
                        : 'لم يتم اختيار صور'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={handleSaveUserInfo}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Website Info Tab */}
      {activeTab === 'website' && (
        <div className="space-y-6">
          <div className="bg-[#F3F4F6] rounded-[12px] p-6">
            <h2 className="text-[18px] font-bold text-[#2B2B2B] text-center mb-6">معلومات الموقع</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right"> اسم الموقع</label>
                <input
                  type="text"
                  value={websiteInfo.site_name}
                  onChange={(e) => setWebsiteInfo({ ...websiteInfo, site_name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">البريد الإلكتروني للموقع</label>
                <input
                  type="email"
                  value={websiteInfo.site_email}
                  onChange={(e) => setWebsiteInfo({ ...websiteInfo, site_email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">هاتف الموقع</label>
                <input
                  type="text"
                  value={websiteInfo.site_phone}
                  onChange={(e) => setWebsiteInfo({ ...websiteInfo, site_phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">logo</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setWebsiteFiles({ ...websiteFiles, logo: e.target.files?.[0] || null })}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary"
                  >
                    <span className="text-[#6B7280]">×</span>
                    <span className="text-[14px] text-[#2B2B2B] truncate">
                      {websiteFiles.logo?.name || 'eRuftg-Lp/Screenshot 2025-...'}
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-[14px] text-[#6B7280] mb-2 text-right">favicon</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setWebsiteFiles({ ...websiteFiles, favicon: e.target.files?.[0] || null })}
                    className="hidden"
                    id="favicon-upload"
                  />
                  <label
                    htmlFor="favicon-upload"
                    className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary"
                  >
                    <span className="text-[#6B7280]">×</span>
                    <span className="text-[14px] text-[#2B2B2B] truncate">
                      {websiteFiles.favicon?.name || 'E0vCz-PI8/Screenshot 2025-...'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-[16px] font-bold text-[#2B2B2B] text-right mb-4">روابط التواصل الاجتماعي</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] text-[#6B7280] mb-2 text-right">فيسبوك</label>
                  <input
                    type="url"
                    value={websiteInfo.facebook}
                    onChange={(e) => setWebsiteInfo({ ...websiteInfo, facebook: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[14px] text-[#6B7280] mb-2 text-right">تويتر</label>
                  <input
                    type="url"
                    value={websiteInfo.twitter}
                    onChange={(e) => setWebsiteInfo({ ...websiteInfo, twitter: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[14px] text-[#6B7280] mb-2 text-right">لينكد إن</label>
                  <input
                    type="url"
                    value={websiteInfo.linkedin}
                    onChange={(e) => setWebsiteInfo({ ...websiteInfo, linkedin: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[14px] text-[#6B7280] mb-2 text-right">إنستجرام</label>
                  <input
                    type="url"
                    value={websiteInfo.instagram}
                    onChange={(e) => setWebsiteInfo({ ...websiteInfo, instagram: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4">
              <label className="block text-[14px] text-[#6B7280] mb-2 text-right">footer</label>
              <textarea
                value={websiteInfo.footer}
                onChange={(e) => setWebsiteInfo({ ...websiteInfo, footer: e.target.value })}
                placeholder="تم التعديل"
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSaveWebsiteInfo}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
};

export default Settings;
