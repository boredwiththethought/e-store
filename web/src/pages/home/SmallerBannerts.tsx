import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

function SmallerBannerts() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-0 lg:py-0">
      {/* Mobile: 2 photos side by side */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        <div className="overflow-hidden rounded-2xl bg-[#EDEDED]">
          <img
            src="/home/smaller-banners/left-banners/squares/apple-airpods-max_responsive.png"
            alt="Apple AirPods Max"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-2xl bg-[#353535]">
          <img
            src="/home/smaller-banners/left-banners/squares/apple-vision-pro_responsive.png"
            alt="Apple Vision Pro"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Tablet/Desktop: Full layout */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-1 lg:grid-cols-2 lg:gap-0">
        {/* Left Banners */}
        <div className="left-banners flex flex-col gap-4 lg:gap-0">
          {/* PlayStation Banner */}
          <div className="wide-square flex flex-col items-center gap-4 rounded-2xl bg-black p-6 sm:flex-row sm:p-8 lg:rounded-none">
            <img
              src="/home/smaller-banners/left-banners/wide-square/PlayStation.png"
              alt="PlayStation 5"
              className="h-auto w-32 sm:w-40 md:w-48 lg:w-auto"
            />
            <div className="title flex flex-col gap-2 text-center sm:gap-4 sm:text-left">
              <p className="font-inter text-2xl font-medium text-white sm:text-3xl md:text-4xl lg:text-[49px] lg:leading-10">
                Playstation 5
              </p>
              <p className="font-inter text-xs font-medium text-[#909090] sm:text-sm">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation
                experience.
              </p>
            </div>
          </div>

          {/* Squares */}
          <div className="squares grid grid-cols-2 gap-4 lg:gap-0">
            {/* AirPods Max */}
            <div className="airpods-max flex flex-col items-center gap-4 rounded-2xl bg-[#EDEDED] p-6 sm:flex-row sm:gap-6 lg:rounded-none lg:p-4 xl:gap-12">
              <img
                src="/home/smaller-banners/left-banners/squares/apple-airpods-max.png"
                alt="Apple AirPods Max"
                className="h-auto w-24 sm:w-28 md:w-32"
              />
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <p className="font-inter text-xl font-light sm:text-2xl lg:text-[29px] lg:leading-10">
                  Apple <br className="hidden sm:block" /> AirPods <br className="hidden sm:block" />{" "}
                  <span className="font-medium">Max</span>
                </p>
                <p className="font-inter text-xs font-medium text-[#909090] sm:text-sm">
                  Computational audio. <br className="hidden sm:block" /> Listen, it's powerful
                </p>
              </div>
            </div>

            {/* Vision Pro */}
            <div className="vision-pro flex flex-col items-center gap-4 rounded-2xl bg-[#353535] p-6 sm:flex-row lg:rounded-none lg:p-4">
              <img
                src="/home/smaller-banners/left-banners/squares/apple-vision-pro.png"
                alt="Apple Vision Pro"
                className="h-auto w-24 sm:w-28 md:w-32"
              />
              <div className="flex flex-col gap-2 text-center text-white sm:text-left">
                <p className="font-inter text-xl font-extralight sm:text-2xl lg:text-[29px] lg:leading-10">
                  Apple <br className="hidden sm:block" /> Vision <span className="font-medium">Pro</span>
                </p>
                <p className="text-xs font-medium text-[#909090] sm:text-sm">
                  An immersive way to experience <br className="hidden sm:block" /> entertainment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MacBook Air Banner */}
        <div className="big-banner flex flex-col items-center gap-6 rounded-2xl bg-[#EDEDED] p-6 sm:flex-row sm:p-8 lg:rounded-none lg:py-12 lg:pl-14">
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <p className="macbook-air font-inter text-3xl font-extralight sm:text-4xl md:text-5xl lg:text-[64px] lg:leading-[1.1]">
              Macbook <br /> <span className="font-medium">Air</span>
            </p>
            <p className="font-inter text-xs font-medium text-[#909090] sm:text-sm">
              The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.
            </p>
            <div className="flex justify-center sm:justify-start">
              <PrimaryButton
                onClick={() => (window.location.href = "/products/macbook-air-14")}
                className="hover:bg-white/10"
              >
                Shop Now
              </PrimaryButton>
            </div>
          </div>
          <img
            src="/home/smaller-banners/big-banner/macbook-air-14.png"
            alt="Macbook Air 14"
            className="h-auto w-48 sm:w-56 md:w-64 lg:w-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default SmallerBannerts;
