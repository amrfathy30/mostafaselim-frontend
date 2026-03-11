import React, { useState, useEffect } from "react";
import { getSmtpSettings, updateSmtpSettings } from "../../services/settingService";
import { Button } from "../../Components/Common/button";
import toast from "react-hot-toast";

const SmtpSettings: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        SenderName: "",
        BaseUrl: "",
        SenderEmail: "",
        Username: "",
        Password: "",
        Host: "",
        Port: 465,
        UseSsl: true,
        Enabled: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getSmtpSettings();
                if (res.data) {
                    setFormData(res.data);
                }
            } catch (error) {
                console.error("Error fetching SMTP settings:", error);
            } finally {
                setFetching(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateSmtpSettings(formData);
            toast.success("تم حفظ إعدادات SMTP بنجاح");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "حدث خطأ أثناء الحفظ");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "إعدادات SMTP - دكتور مصطفي سليم";
    }, []);

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-primary text-lg">جاري تحميل الإعدادات...</div>
            </div>
        );
    }

    return (
        <div className="p-2 md:p-6" dir="rtl">
            <h1 className="text-2xl font-bold text-primary mb-8">إعدادات SMTP</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 max-w-4xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Sender Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-[#6B7280]">
                            اسم المرسل (Sender Name)
                        </label>
                        <input
                            type="text"
                            placeholder="أدخل اسم المرسل هنا"
                            value={formData.SenderName}
                            onChange={(e) =>
                                setFormData({ ...formData, SenderName: e.target.value })
                            }
                            className="px-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-lg text-right outline-none focus:border-primary font-semibold text-black"
                        />
                    </div>

                    {/* Base URL */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-[#6B7280]">
                            عنوان URL الأساسي (Base Url)
                        </label>
                        <input
                            type="text"
                            placeholder="أدخل عنوان URL الأساسي هنا"
                            value={formData.BaseUrl}
                            onChange={(e) =>
                                setFormData({ ...formData, BaseUrl: e.target.value })
                            }
                            className="px-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-lg text-right outline-none focus:border-primary font-semibold text-black"
                        />
                    </div>

                    {/* Sender Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-[#6B7280]">
                            بريد الإرسال (Sender Email)
                        </label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            value={formData.SenderEmail}
                            onChange={(e) =>
                                setFormData({ ...formData, SenderEmail: e.target.value })
                            }
                            className="px-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-lg text-right outline-none focus:border-primary font-semibold text-black"
                        />
                    </div>

                    {/* Username */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-[#6B7280]">
                            اسم المستخدم (User name)
                        </label>
                        <input
                            type="text"
                            placeholder="أدخل اسم مستخدم SMTP"
                            value={formData.Username}
                            onChange={(e) =>
                                setFormData({ ...formData, Username: e.target.value })
                            }
                            className="px-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-lg text-right outline-none focus:border-primary font-semibold text-black"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-[#6B7280]">
                            كلمة سر التطبيق (App Password)
                        </label>
                        <input
                            type="password"
                            placeholder="*********"
                            value={formData.Password}
                            onChange={(e) =>
                                setFormData({ ...formData, Password: e.target.value })
                            }
                            className="px-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-lg text-right outline-none focus:border-primary font-semibold text-black"
                        />
                    </div>

                    {/* Host */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-[#6B7280]">
                            الخادم (SMTP Host)
                        </label>
                        <input
                            type="text"
                            placeholder="smtp.gmail.com"
                            value={formData.Host}
                            onChange={(e) => setFormData({ ...formData, Host: e.target.value })}
                            className="px-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-lg text-right outline-none focus:border-primary font-semibold text-black"
                        />
                    </div>

                    {/* Port */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-[#6B7280]">
                            المنفذ (Port)
                        </label>
                        <input
                            type="number"
                            placeholder="465"
                            value={formData.Port}
                            onChange={(e) =>
                                setFormData({ ...formData, Port: Number(e.target.value) })
                            }
                            className="px-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-lg text-right outline-none focus:border-primary font-semibold text-black"
                        />
                    </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-col md:flex-row gap-8 mb-8 border-t border-gray-100 pt-8">
                    <label className="flex items-center gap-4 cursor-pointer group">
                        <span className="text-[16px] font-bold text-primary group-hover:text-blue-500 transition-colors">
                            استخدام SSL / TLS
                        </span>
                        <div
                            className={`w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 ${formData.UseSsl ? "bg-primary" : "bg-gray-300"
                                }`}
                            onClick={() =>
                                setFormData({ ...formData, UseSsl: !formData.UseSsl })
                            }
                        >
                            <div
                                className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform duration-300 ${formData.UseSsl ? "-translate-x-7" : "translate-x-0"
                                    }`}
                            ></div>
                        </div>
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer group">
                        <span className="text-[16px] font-bold text-primary group-hover:text-blue-500 transition-colors">
                            تفعيل SMTP
                        </span>
                        <div
                            className={`w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 ${formData.Enabled ? "bg-primary" : "bg-gray-300"
                                }`}
                            onClick={() =>
                                setFormData({ ...formData, Enabled: !formData.Enabled })
                            }
                        >
                            <div
                                className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform duration-300 ${formData.Enabled ? "-translate-x-7" : "translate-x-0"
                                    }`}
                            ></div>
                        </div>
                    </label>
                </div>

                <div className="flex justify-start">
                    <Button type="primary" loading={loading} className="px-12 h-12">
                        حفظ الإعدادات
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SmtpSettings;
