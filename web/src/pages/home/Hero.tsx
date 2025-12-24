import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

function Hero() {
  return (
    <div className="w-full bg-[#211C24]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 py-8 md:flex-row md:py-0">
        {/* Text Content */}
        <div className="flex flex-col gap-4 text-center md:gap-6 md:text-left">
          <p className="font-inter text-base font-semibold text-[#909090] sm:text-lg md:text-[25px] md:leading-8">
            Pro.Beyound
          </p>
          <h4 className="font-inter text-4xl font-thin text-white sm:text-5xl md:text-6xl lg:text-[96px] lg:leading-[1.1]">
            Iphone 14 <span className="font-bold">Pro</span>
          </h4>
          <p className="font-inter text-sm font-medium text-[#909090] sm:text-base md:text-lg">
            Created to change everything for the better. For everyone
          </p>
          <div className="flex justify-center md:justify-start">
            <PrimaryButton
              onClick={() => (window.location.href = "/products/iphone-14-pro")}
              className="cursor-pointer border-white text-white hover:bg-white/10"
            >
              Buy Now
            </PrimaryButton>
          </div>
        </div>
        {/* Hero Image */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <img src="/home/banner/baner.png" alt="iPhone 14 Pro" className="h-auto w-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
