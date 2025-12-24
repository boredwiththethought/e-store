import { Link } from "react-router-dom";
import {
  PhonesLargeIcon,
  ComputersLargeIcon,
  CamerasLargeIcon,
  HeadphonesLargeIcon,
  GamingLargeIcon,
  SmartWatchesLargeIcon
} from "@/components/icons/48px";

const categories = [
  { id: "phones", name: "Phones", icon: PhonesLargeIcon },
  { id: "smartwatches", name: "Smart Watches", icon: SmartWatchesLargeIcon },
  { id: "cameras", name: "Cameras", icon: CamerasLargeIcon },
  { id: "headphones", name: "Headphones", icon: HeadphonesLargeIcon },
  { id: "computers", name: "Computers", icon: ComputersLargeIcon },
  { id: "gaming", name: "Gaming", icon: GamingLargeIcon }
];

interface BrowseCellProps {
  id: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

function BrowseCell({ id, name, icon: Icon }: BrowseCellProps) {
  return (
    <Link
      to={`/category/${id}`}
      className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-[#EDEDED] px-4 py-4 transition-colors hover:bg-[#E0E0E0] sm:px-6 sm:py-5 md:px-10 md:py-6 lg:px-14"
    >
      <Icon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
      <span className="font-inter text-center text-xs font-medium sm:text-sm md:text-base">{name}</span>
    </Link>
  );
}

function Browse() {
  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-10 sm:gap-8 sm:py-16 md:py-20">
      <p className="font-inter text-lg font-medium sm:text-xl md:text-2xl">Browse By Category</p>
      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-6 md:gap-6 lg:gap-8">
        {categories.map(category => (
          <BrowseCell key={category.id} id={category.id} name={category.name} icon={category.icon} />
        ))}
      </div>
    </div>
  );
}

export default Browse;
