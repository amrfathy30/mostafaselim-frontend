import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../services/articleService";
import Sidebar from "../Sidebar";
import Breadcrumbs from "../Common/Breadcrumbs";
import DescriptiveInfoSection from "../Common/DescriptiveInfoSection";
import SourcesSection from "../Common/SourcesSection";
import {
  InfoIcon,
  BookInfoIcon,
  CategoryIcon,
} from "../../icons/single-book-page-icons";
import {
  AuthorIcon,
  PublisherIcon,
  DateIcon,
  SectionsCountIcon,
  PagesCountIcon,
} from "../../icons/single-article-page-icons";
import AOS from "aos";
import "aos/dist/aos.css";

const SingleArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true, offset: 100 });
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        const res = await getArticleById(id);
        setArticle(res.data);
        AOS.refresh();
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const formatDateToArabic = (dateString?: string | null) => {
    if (!dateString) return "-";
    const parts = dateString.split("/");
    if (parts.length !== 3) return dateString;
    const [day, monthStr, year] = parts;
    const months: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const month = months[monthStr];
    if (month === undefined) return dateString;
    const date = new Date(Number(year), month, Number(day));
    return new Intl.DateTimeFormat("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  if (loading) return <div className="text-center py-20">جاري التحميل...</div>;
  if (!article)
    return <div className="text-center py-20">المقالة غير موجودة</div>;

  const sidebarData = [
    { label: "النوع", subLabel: article.article_type, icon: <BookInfoIcon /> },
    { label: "الكاتب", subLabel: article.article_author, icon: <AuthorIcon /> },
    {
      label: "المنشور",
      subLabel: article.article_publisher,
      icon: <PublisherIcon />,
    },
    { label: "العام", subLabel: formatDateToArabic(article.article_date), icon: <DateIcon /> },
    {
      label: "عدد الفقرات",
      subLabel: article.article_sections_count,
      icon: <SectionsCountIcon />,
    },
    {
      label: "عدد الكلمات",
      subLabel: `${article.total_word_count} كلمة`,
      icon: <PagesCountIcon />,
    },
    {
      label: "التصنيف",
      subLabel: article.article_classification,
      icon: <CategoryIcon />,
    },
  ];

  const formattedSources: { text: string }[] = article.article_reference?.map((ref: string) => {
    try {
      const parsed = JSON.parse(ref);
      if (Array.isArray(parsed)) return { text: parsed[0] };
      return { text: String(parsed) };
    } catch {
      return { text: ref };
    }
  }) || [];

  return (
    <main
      className="max-w-7xl mx-auto px-4 py-6 md:py-8 font-expo"
      dir="rtl"
    >
      <div className="mb-4" data-aos="fade-down">
        <Breadcrumbs
          items={[
            { label: "المقالات", path: "/articles" },
            { label: article.article_title },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
        <div className="lg:col-span-8 gap-10" data-aos="fade-up">
          <DescriptiveInfoSection
            mainTitle={article.article_title}
            showTopQuote={true}
            showBottomQuote={true}
            sections={article.article_sections.map((section: any) => ({
              title: section.section_title,
              content: section.section_content
                .filter((c: any) => c.type === "text")
                .map((c: any) => c.content)
                .join("\n\n"),
            }))}
          />
          <div className="mt-12 mb-10" data-aos="fade-up" data-aos-delay={100}>
            <SourcesSection sources={formattedSources} />
          </div>
        </div>

        <div className="lg:col-span-4 relative" data-aos="fade-left">
          <div className="sticky top-10 self-start">
            <Sidebar
              title="معلومات المقالة"
              titleIcon={<InfoIcon />}
              items={sidebarData}
              showShareButton={true}
              book={{ book_name: article.article_title }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleArticlePage;