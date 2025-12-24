import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRightIcon className="h-4 w-4 text-gray-400" />}
            {isLast || !item.href ? (
              <span className={`${isLast ? "font-medium text-gray-900" : "text-gray-500"}`}>{item.label}</span>
            ) : (
              <Link to={item.href} className="text-gray-500 transition-colors hover:text-gray-900">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
