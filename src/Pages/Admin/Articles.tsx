import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Common/button";
import { CalendarIcon, ClockIcon } from "../../icons/admin";
import Pagination from "../../Components/Pagination";
import AdminPageHeader from "../components/page-header";
import {
  getAdminArticles,
  adminDeleteArticle,
} from "../../services/articleService";
import AdminPageLoading from "../components/loading";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";

const Articles: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [startSearch, setStartSearch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async (page: number, keyword: string = "") => {
    try {
      setLoading(true);
      const res = await getAdminArticles(page, 12, keyword);
      setArticles(res.data.articles || []);
      setPagination(res.data.pagination);
      setError(null); 
    } catch (err: any) {
      if (err.response?.status === 404) {
        setArticles([]);
        setPagination(null);
        setError("لا توجد مقالات");
      } else {
        setError("فشل في تحميل المقالات");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage, searchQuery);
  }, [currentPage, startSearch]);

  useEffect(() => {
    if (searchQuery === "") {
      setCurrentPage(1);
      fetchArticles(1);
    }
  }, [searchQuery]);

  const confirmDelete = async () => {
    try {
      await adminDeleteArticle(selectedArticle.article_id);
      toast.success("تم الحذف بنجاح");
      setIsModalOpen(false);
      fetchArticles(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemTitle={selectedArticle?.article_title || ""}
        itemType="المقالة"
      />
      <AdminPageHeader
        total={pagination?.total || 0}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setStartSearch={setStartSearch}
        btnLoading={loading && startSearch}
        title="المقالات"
        titleSingle="مقالة"
        type="articles"
        onSearchClick={() => fetchArticles(1, searchQuery)}
      />
      <div className="space-y-6 font-expo">
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article) => (
              <div
                key={article.article_id}
                className="bg-white rounded-lg p-6 border border-gray-200 flex flex-col justify-between h-[250px] shadow-sm"
              >
                <div>
                  <h3 className="text-primary text-xl font-bold mb-4 text-right">
                    {article.article_title}
                  </h3>
                  <div className="flex gap-4 text-gray-500 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      {article.article_time} <ClockIcon />
                    </span>
                    <span className="flex items-center gap-1">
                      {article.article_date} <CalendarIcon />
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="w-1/2 hover:bg-primary"
                    onClick={() =>
                      navigate(`/admin/articles/edit/${article.article_id}`)
                    }
                    type="primary"
                  >
                    تعديل
                  </Button>
                  <Button
                    className="w-1/2 hover:bg-red-500"
                    onClick={() => {
                      setSelectedArticle(article);
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
        {!loading && (articles.length === 0 || error) && (
          <div className="text-center text-[#6B7280] py-8">
            {error || "لا توجد مقالات"}
          </div>
        )}
        {loading && <AdminPageLoading />}
        {!loading &&
          articles.length > 0 &&
          pagination?.last_page &&
          pagination.last_page > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.last_page}
              onPageChange={setCurrentPage}
            />
          )}
      </div>
    </>
  );
};

export default Articles;
