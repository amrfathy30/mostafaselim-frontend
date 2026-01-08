import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Articles from "../Pages/Articles";
import Services from "../Pages/Services";
import Podcasts from "../Pages/Podcasts";
import Blogs from "../Pages/Blogs";
import BooksPage from "../Components/books/books-page";
import SingleBlogPage from "../Pages/SingleBlog";

export default function BodyContent() {
  return (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Articles" element={<Articles />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/podcasts" element={<Podcasts />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<SingleBlogPage />} />
            </Routes>
  )
}