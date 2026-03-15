import React, { useEffect, useState } from "react";
import AdminPageHeader from "../components/page-header";
import {
    getAdminSubscribers,
    adminDeleteSubscriber,
    adminAddSubscriber,
    adminUpdateSubscriber,
} from "../../services/subscriberService";
import Pagination from "../../Components/Pagination";
import { Button } from "../../Components/Common/button";
import AdminPageLoading from "../components/loading";
import SubscriberTableSkeleton from "./SubscriberTableSkeleton";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";

interface PaginationData {
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
}

interface Subscriber {
    id: number;
    email: string;
    created_at: string;
}

const Subscribers: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [startSearch, setStartSearch] = useState(false);
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
    const [modalEmail, setModalEmail] = useState("");
    const [isActionLoading, setIsActionLoading] = useState(false);

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const fetchSubscribers = async (page: number, keyword: string = "") => {
        try {
            setLoading(true);
            const response = await getAdminSubscribers(page, 12, keyword || undefined);
            const data = response.data;

            setSubscribers(data.data || []);
            setPagination(data.pagination || null);
            setError(null);
            setStartSearch(false);
        } catch (err: any) {
            if (err.response?.status === 404) {
                setSubscribers([]);
                setPagination(null);
                setError("لا يوجد مشتركين");
            } else {
                setError("فشل في تحميل المشتركين");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers(currentPage, searchQuery);
    }, [currentPage, startSearch]);

    useEffect(() => {
        if (searchQuery === "") {
            setCurrentPage(1);
            fetchSubscribers(1);
        }
    }, [searchQuery]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const openDeleteModal = (subscriber: Subscriber) => {
        setSelectedSubscriber(subscriber);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedSubscriber) return;
        try {
            await adminDeleteSubscriber(selectedSubscriber.id);
            toast.success("تم الحذف بنجاح");
            setIsDeleteModalOpen(false);
            fetchSubscribers(currentPage, searchQuery);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "فشل في الحذف");
        }
    };

    const openAddModal = () => {
        setSelectedSubscriber(null);
        setModalEmail("");
        setIsEditModalOpen(true);
    };

    const openEditModal = (subscriber: Subscriber) => {
        setSelectedSubscriber(subscriber);
        setModalEmail(subscriber.email);
        setIsEditModalOpen(true);
    };

    const handleModalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!modalEmail) {
            toast.error("يرجى إدخال البريد الإلكتروني");
            return;
        }

        if (!validateEmail(modalEmail)) {
            toast.error("البريد الإلكتروني غير صحيح");
            return;
        }

        setIsActionLoading(true);
        try {
            if (selectedSubscriber) {
                await adminUpdateSubscriber(selectedSubscriber.id, { email: modalEmail });
                toast.success("تم التعديل بنجاح");
            } else {
                await adminAddSubscriber({ email: modalEmail });
                toast.success("تمت الإضافة بنجاح");
            }
            setIsEditModalOpen(false);
            fetchSubscribers(currentPage, searchQuery);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "حدث خطأ ما");
        } finally {
            setIsActionLoading(false);
        }
    };

    useEffect(() => {
        document.title = "المشتركون - دكتور مصطفي سليم";
    }, []);

    return (
        <>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                itemTitle={selectedSubscriber?.email || ""}
                itemType="المشترك"
            />

            {/* Add/Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-expo">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-primary">
                                {selectedSubscriber ? "تعديل مشترك" : "إضافة مشترك جديد"}
                            </h3>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleModalSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="text"
                                    value={modalEmail}
                                    onChange={(e) => setModalEmail(e.target.value)}
                                    placeholder="example@mail.com"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-right outline-none focus:border-primary transition-colors"
                                // required
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="primary"
                                    className="flex-1"
                                    disabled={isActionLoading}
                                >
                                    {isActionLoading ? "جاري الحفظ..." : "حفظ"}
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex-1 px-4 py-3 bg-gray-100 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <AdminPageHeader
                total={pagination?.total || 0}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setStartSearch={setStartSearch}
                btnLoading={loading && startSearch}
                title={"المشتركون"}
                titleSingle={"مشترك"}
                type="subscriber"
                onSearchClick={() => fetchSubscribers(1, searchQuery)}
                onAddClick={openAddModal}
            />

            <div className="space-y-6">
                {!loading && subscribers.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden font-expo">
                        <div className="overflow-x-auto">
                            <table className="w-full text-right bg-white">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-4 font-bold text-primary">#</th>
                                        <th className="px-6 py-4 font-bold text-primary text-center">البريد الإلكتروني</th>
                                        <th className="px-6 py-4 font-bold text-primary text-center">تاريخ الاشتراك</th>
                                        <th className="px-6 py-4 font-bold text-primary text-center">الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {subscribers.map((subscriber, index) => (
                                        <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-[#4D4D4D] font-medium">{(currentPage - 1) * 12 + index + 1}</td>
                                            <td className="px-6 py-4 text-[#4D4D4D] font-medium text-center truncate block max-w-[250px] md:max-w-[400px]" style={{ direction: "ltr" }} title={subscriber.email}>{subscriber.email}</td>
                                            <td className="px-6 py-4 text-[#4D4D4D] text-sm text-center">
                                                {new Date(subscriber.created_at).toLocaleDateString("ar-EG", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button
                                                        onClick={() => openEditModal(subscriber)}
                                                        className="text-[#007FFF] hover:text-[#0060C0] font-bold text-sm transition-colors cursor-pointer"
                                                    >
                                                        تعديل
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(subscriber)}
                                                        className="text-red-600 hover:text-red-800 font-bold text-sm transition-colors cursor-pointer"
                                                    >
                                                        حذف
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {!loading && (subscribers.length === 0 || error) && (
                    <div className="text-center text-[#6B7280] py-8 bg-white border border-gray-200 rounded-xl">
                        {error || "لا يوجد مشتركين"}
                    </div>
                )}

                {loading && <SubscriberTableSkeleton />}

                {!loading &&
                    subscribers.length > 0 &&
                    pagination?.last_page &&
                    pagination.last_page > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={pagination.last_page}
                            onPageChange={handlePageChange}
                        />
                    )}
            </div>
        </>
    );
};

export default Subscribers;
