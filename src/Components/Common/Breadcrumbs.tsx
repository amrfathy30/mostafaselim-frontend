import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-[#3d5a7a] mb-10 text-xl font-expo" dir="rtl">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.path ? (
            <Link 
              to={item.path} 
              className="hover:opacity-100 hover:text-blue-600 transition-all cursor-pointer"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-bold pb-1">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="text-gray-400">›</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;