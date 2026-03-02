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
    { label: "العام", subLabel: article.article_date, icon: <DateIcon /> },
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