import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Articles from "../Pages/Articles";
import Services from "../Pages/Services";
import Contact from "../Pages/Contact";
import Blogs from "../Pages/Blogs";

export default function BodyContent() {
  return (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Articles" element={<Articles />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blogs />} />
            </Routes>
  )
}