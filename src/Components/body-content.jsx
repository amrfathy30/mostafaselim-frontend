import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Articles from "../Pages/Articles";
import Podcasts from "../Pages/Podcasts";
import Blogs from "../Pages/Blogs";
import BooksPage from "../Components/books/books-page";
import AboutPage from '../Components/About/about-page';
import SingleBlogPage from "../Pages/SingleBlog";
import SingleBookPage from "../Components/books/single-book-page";
import SingleArticlePage from '../Components/works/SingleArticlePage';
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import BlogAdmin from "../Pages/Admin/Blog";
import AddBlog from "../Pages/Admin/AddBlog";
import AddArticle from "../Pages/Admin/AddArticle";
import ArticlesAdmin from "../Pages/Admin/Articles";
import Dashboard from "../Pages/Admin/Dashboard";

export default function BodyContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Articles" element={<Articles />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/podcasts" element={<Podcasts />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blogs/:id" element={<SingleBlogPage />} />
      <Route path="/book/:id" element={<SingleBookPage />} />
      <Route path="/articles/:id" element={<SingleArticlePage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="blog" element={<BlogAdmin />} />
        <Route path="blog/add" element={<AddBlog />} />
        <Route path="blog/edit/:id" element={<AddBlog />} />
        <Route path="articles" element={<ArticlesAdmin />} /> 
        <Route path="articles/add" element={<AddArticle />} />
        <Route path="articles/edit/:id" element={<AddArticle />} />
      </Route>
    </Routes>
  )
}
