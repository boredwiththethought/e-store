import { Link } from "react-router-dom";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

function SmallerBannerts() {
  return (
    <section className="container mx-auto px-4 py-6 sm:py-8 lg:px-0 lg:py-0">
      {/* Mobile: Compact layout (< 640px) */}
      <div className="flex flex-col gap-3 sm:hidden">
        {/* PlayStation - compact */}
        <Link
          to="/category/gaming"
          className="flex items-center gap-4 rounded-2xl bg-black p-4 transition-transform active:scale-[0.98]"
        >
          <img
            src="/home/smaller-banners/left-banners/wide-square/PlayStation.png"
            alt="PlayStation 5"
            className="h-16 w-auto shrink-0"
          />
          <div className="min-w-0">
            <p className="font-inter text-lg font-medium text-white">Playstation 5</p>
            <p className="line-clamp-2 text-[11px] leading-tight text-[#909090]">
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O.
            </p>
          </div>
        </Link>

        {/* 2 squares side by side */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/category/headphones"
            className="aspect-square overflow-hidden rounded-2xl bg-[#EDEDED] transition-transform active:scale-[0.98]"
          >
            <img
              src="/home/smaller-banners/left-banners/squares/apple-airpods-max_responsive.png"
              alt="Apple AirPods Max"
              className="h-full w-full object-cover"
            />
          </Link>
          <Link
            to="/category/computers"
            className="aspect-square overflow-hidden rounded-2xl bg-[#353535] transition-transform active:scale-[0.98]"
          >
            <img
              src="/home/smaller-banners/left-banners/squares/apple-vision-pro_responsive.png"
              alt="Apple Vision Pro"
              className="h-full w-full object-cover"
            />
          </Link>
        </div>

        {/* MacBook Air - compact */}
        <div className="flex items-center gap-4 rounded-2xl bg-[#EDEDED] p-4">
          <div className="min-w-0 flex-1">
            <p className="font-inter text-xl leading-tight font-extralight">
              Macbook <span className="font-medium">Air</span>
            </p>
            <p className="mt-1 line-clamp-2 text-[11px] leading-tight text-[#909090]">
              The new 15‑inch MacBook Air makes room for more of what you love.
            </p>
            <PrimaryButton
              onClick={() => (window.location.href = "/category/computers")}
              className="mt-3 px-4! py-2! text-xs!"
            >
              Shop Now
            </PrimaryButton>
          </div>
          <img
            src="/home/smaller-banners/big-banner/macbook-air-14.png"
            alt="Macbook Air 14"
            className="h-24 w-auto shrink-0"
          />
        </div>
      </div>

      {/* Tablet: Medium layout (640px - 1024px) */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:hidden">
        {/* PlayStation */}
        <Link
          to="/category/gaming"
          className="flex items-center gap-6 rounded-2xl bg-black p-6 transition-transform hover:scale-[1.01]"
        >
          <img
            src="/home/smaller-banners/left-banners/wide-square/PlayStation.png"
            alt="PlayStation 5"
            className="h-24 w-auto"
          />
          <div>
            <p className="font-inter text-2xl font-medium text-white md:text-3xl">Playstation 5</p>
            <p className="mt-2 text-sm text-[#909090]">
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O.
            </p>
          </div>
        </Link>

        {/* MacBook Air */}
        <div className="flex items-center gap-6 rounded-2xl bg-[#EDEDED] p-6">
          <div className="flex-1">
            <p className="font-inter text-3xl font-extralight md:text-4xl">
              Macbook <span className="font-medium">Air</span>
            </p>
            <p className="mt-2 text-sm text-[#909090]">
              The new 15‑inch MacBook Air makes room for more of what you love.
            </p>
            <PrimaryButton onClick={() => (window.location.href = "/category/computers")} className="mt-4">
              Shop Now
            </PrimaryButton>
          </div>
          <img src="/home/smaller-banners/big-banner/macbook-air-14.png" alt="Macbook Air 14" className="h-32 w-auto" />
        </div>

        {/* AirPods & Vision Pro */}
        <Link
          to="/category/headphones"
          className="flex items-center gap-4 rounded-2xl bg-[#EDEDED] p-6 transition-transform hover:scale-[1.01]"
        >
          <img
            src="/home/smaller-banners/left-banners/squares/apple-airpods-max.png"
            alt="Apple AirPods Max"
            className="h-24 w-auto"
          />
          <div>
            <p className="font-inter text-2xl font-light">
              Apple AirPods <span className="font-medium">Max</span>
            </p>
            <p className="mt-1 text-sm text-[#909090]">Computational audio. Listen, it's powerful</p>
          </div>
        </Link>

        <Link
          to="/category/computers"
          className="flex items-center gap-4 rounded-2xl bg-[#353535] p-6 transition-transform hover:scale-[1.01]"
        >
          <img
            src="/home/smaller-banners/left-banners/squares/apple-vision-pro.png"
            alt="Apple Vision Pro"
            className="h-24 w-auto"
          />
          <div>
            <p className="font-inter text-2xl font-extralight text-white">
              Apple Vision <span className="font-medium">Pro</span>
            </p>
            <p className="mt-1 text-sm text-[#909090]">An immersive way to experience entertainment</p>
          </div>
        </Link>
      </div>

      {/* Desktop: Full layout (≥ 1024px) */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-0">
        {/* Left Banners */}
        <div className="left-banners flex flex-col">
          {/* PlayStation Banner */}
          <Link to="/category/gaming" className="wide-square flex bg-black transition-opacity hover:opacity-95">
            <img
              src="/home/smaller-banners/left-banners/wide-square/PlayStation.png"
              alt="PlayStation 5"
              className="h-auto w-auto"
            />
            <div className="flex flex-col justify-center gap-4 pr-8">
              <p className="font-inter text-4xl font-medium text-white xl:text-[49px] xl:leading-tight">
                Playstation 5
              </p>
              <p className="font-inter text-sm font-medium text-[#909090]">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation
                experience.
              </p>
            </div>
          </Link>

          {/* Squares */}
          <div className="squares grid grid-cols-2">
            {/* AirPods Max */}
            <Link
              to="/category/headphones"
              className="airpods-max flex items-center gap-6 bg-[#EDEDED] transition-opacity hover:opacity-95 xl:gap-10"
            >
              <img
                src="/home/smaller-banners/left-banners/squares/apple-airpods-max.png"
                alt="Apple AirPods Max"
                className="h-auto w-28 xl:w-32"
              />
              <div className="flex flex-col gap-2 pr-4">
                <p className="font-inter text-2xl font-light xl:text-[29px] xl:leading-tight">
                  Apple <br /> AirPods <br /> <span className="font-medium">Max</span>
                </p>
                <p className="font-inter text-sm font-medium text-[#909090]">
                  Computational audio. <br /> Listen, it's powerful
                </p>
              </div>
            </Link>

            {/* Vision Pro */}
            <Link
              to="/category/computers"
              className="vision-pro flex items-center gap-6 bg-[#353535] transition-opacity hover:opacity-95"
            >
              <img
                src="/home/smaller-banners/left-banners/squares/apple-vision-pro.png"
                alt="Apple Vision Pro"
                className="h-auto w-28 xl:w-32"
              />
              <div className="flex flex-col gap-2 pr-4 text-white">
                <p className="font-inter text-2xl font-extralight xl:text-[29px] xl:leading-tight">
                  Apple <br /> Vision <span className="font-medium">Pro</span>
                </p>
                <p className="text-sm font-medium text-[#909090]">
                  An immersive way to <br /> experience entertainment
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* MacBook Air Banner */}
        <div className="big-banner flex items-center bg-[#EDEDED] py-12 pl-14">
          <div className="flex flex-col gap-4">
            <p className="macbook-air font-inter text-5xl font-extralight xl:text-[64px] xl:leading-tight">
              Macbook <br /> <span className="font-medium">Air</span>
            </p>
            <p className="font-inter text-sm font-medium text-[#909090]">
              The new 15‑inch MacBook Air makes room for more <br /> of what you love with a spacious Liquid Retina
              display.
            </p>
            <PrimaryButton onClick={() => (window.location.href = "/category/computers")} className="w-fit">
              Shop Now
            </PrimaryButton>
          </div>
          <img
            src="/home/smaller-banners/big-banner/macbook-air-14.png"
            alt="Macbook Air 14"
            className="h-auto w-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default SmallerBannerts;
