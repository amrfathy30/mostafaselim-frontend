import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Services from "../Pages/Services";
import Podcasts from "../Pages/Podcasts";
import Blogs from "../Pages/Blogs";

export default function BodyContent() {
  return (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/podcasts" element={<Podcasts />} />
              <Route path="/blogs" element={<Blogs />} />
            </Routes>
  )
}