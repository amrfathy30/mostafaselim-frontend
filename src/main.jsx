import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.tsx'
import AdminLayout from './layouts/AdminLayout';
import { AdminLogin, Dashboard, Articles, AddArticle, Books, AddBook, Podcasts, Blog, AddBlog, Settings } from './Pages/Admin';
import Categories from "./Pages/Admin/Categories.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminLogin />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/add" element={<AddArticle />} />
        <Route path="books" element={<Books />} />
        <Route path="books/add" element={<AddBook />} />
        <Route path="/admin/book/edit/:id" element={<AddBook />} />
        <Route path="podcasts" element={<Podcasts />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/add" element={<AddBlog />} />
        <Route path="settings" element={<Settings />} />
        <Route path="categories" element={<Categories />} />
      </Route>
      <Route path="/*" element={<App isRTL={true} />} />
    </Routes>
  </BrowserRouter>
);
