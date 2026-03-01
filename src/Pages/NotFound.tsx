import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-138px)] bg-gray-100 p-4 text-center">            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                الصفحة غير موجودة
            </h2>
            <p className="text-gray-600 mb-6">
                عذراً، الرابط الذي تحاول الوصول إليه غير صحيح أو تم حذفه.
            </p>
            <button
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90 cursor-pointer text-white font-bold py-2 px-6 rounded-lg transition"
            >
                العودة للصفحة الرئيسية
            </button>
        </div>
    );
}