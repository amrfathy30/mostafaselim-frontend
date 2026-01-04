import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Services from "../Pages/Services";
import Contact from "../Pages/Contact";
import Blogs from "../Pages/Blogs";

export default function BodyContent() {
  return (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/podcasts" element={<Contact />} />
              <Route path="/blogs" element={<Blogs />} />
            </Routes>
  )
}