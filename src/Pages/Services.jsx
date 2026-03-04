import React, { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    document.title = "الخدمات - دكتور مصطفي سليم";
  }, []);

  return <h1 className="text-2xl text-center">صفحة الخدمات</h1>;
}