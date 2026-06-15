import React from "react";

const Partners = () => {
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",


    "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg"


  ];

  return (
    <section id="partners" className="bg-slate-50 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Our Hiring Partners
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="overflow-hidden mt-10">
          <div className="flex gap-16 animate-scroll items-center">
            {logos.concat(logos).map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="company"
                className={`object-contain opacity-70 hover:opacity-100 transition ${logo.includes("tanvox") ? "h-20" : logo.includes("Oracle") ? "h-7" : "h-10"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;