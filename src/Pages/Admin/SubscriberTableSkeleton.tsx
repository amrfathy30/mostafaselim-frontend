import React from "react";

const SubscriberTableSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden font-expo animate-pulse">
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
                        {[...Array(6)].map((_, index) => (
                            <tr key={index}>
                                <td className="px-6 py-6">
                                    <div className="h-4 w-4 bg-gray-200 rounded" />
                                </td>
                                <td className="px-6 py-6">
                                    <div className="h-4 w-48 bg-gray-200 rounded mx-auto" />
                                </td>
                                <td className="px-6 py-6">
                                    <div className="h-4 w-32 bg-gray-200 rounded mx-auto" />
                                </td>
                                <td className="px-6 py-6">
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="h-4 w-10 bg-gray-100 rounded" />
                                        <div className="h-4 w-10 bg-gray-100 rounded" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubscriberTableSkeleton;
