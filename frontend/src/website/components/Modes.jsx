// import React from "react";
// import { School, Video, MonitorSmartphone } from "lucide-react";
// import { motion } from "framer-motion";

// const Modes = () => {
//   const modes = [
//     {
//       title: "Offline Classes",
//       desc: "In-person interaction with structured schedules and hands-on laboratory learning.",
//       icon: <School size={38} />,
//       gradient: "from-sky-400 to-blue-600",
//     },
//     {
//       title: "Online Live Classes",
//       desc: "Flexible remote learning through high-definition digital platforms and live support.",
//       icon: <Video size={38} />,
//       gradient: "from-cyan-400 to-blue-500",
//     },
//     {
//       title: "Hybrid Learning",
//       desc: "The perfect mix of online theoretical flexibility and offline practical mastery.",
//       icon: <MonitorSmartphone size={38} />,
//       gradient: "from-blue-400 to-blue-500",
//     },
//   ];

//   return (
//     <section className="bg-slate-50 py-24">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         <h2 className="text-4xl font-extrabold text-slate-800 mb-3">
//           Modes We Train
//         </h2>
//         <p className="text-slate-500 mb-16 text-lg">
//           Elevate your skills with our flexible learning paths
//         </p>

//         <div className="grid md:grid-cols-3 gap-10">
//           {modes.map((mode, index) => (
//             <motion.div
//               key={index}
//               initial="rest"
//               whileHover="hover"
//               animate="rest"
//               className="relative overflow-hidden bg-white cursor-pointer rounded-[2.5rem] shadow-xl border border-slate-100 p-12 h-[420px] flex flex-col items-center justify-center"
//             >
//               {/* Expanding Circle Background */}
//               <motion.div
//                 variants={{
//                   rest: { scale: 0 },
//                   hover: { scale: 8 },
//                 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//                 className={`absolute w-32 h-32 rounded-full bg-gradient-to-br ${mode.gradient} z-0`}
//                 style={{ top: "70px" }}
//               />

//               {/* Content */}
//               <div className="relative z-10 flex flex-col items-center">
//                 {/* Icon */}
//                 <motion.div
//                   variants={{
//                     rest: {
//                       backgroundColor: "#f0f9ff",
//                       color: "#0ea5e9",
//                       scale: 1,
//                     },
//                     hover: {
//                       backgroundColor: "rgba(255,255,255,0.2)",
//                       color: "#ffffff",
//                       scale: 1.1,
//                     },
//                   }}
//                   className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-inner"
//                 >
//                   {mode.icon}
//                 </motion.div>

//                 {/* Title */}
//                 <motion.h3
//                   variants={{
//                     rest: { color: "#1e293b", y: 0 },
//                     hover: { color: "#ffffff", y: -6 },
//                   }}
//                   className="text-2xl font-bold mb-4"
//                 >
//                   {mode.title}
//                 </motion.h3>

//                 {/* Description */}
//                 <motion.p
//                   variants={{
//                     rest: { color: "#64748b" },
//                     hover: { color: "#ffffff" },
//                   }}
//                   className="text-center leading-relaxed"
//                 >
//                   {mode.desc}
//                 </motion.p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Modes;















import React from "react";
import { School, Video, MonitorSmartphone } from "lucide-react";
import { motion } from "framer-motion";

const Modes = () => {
  const modes = [
    {
      title: "Offline Classes",
      desc: "In-person interaction with structured schedules and hands-on laboratory learning.",
      icon: <School size={38} />,
      gradient: "from-sky-400 to-blue-600",
    },
    {
      title: "Online Live Classes",
      desc: "Flexible remote learning through high-definition digital platforms and live support.",
      icon: <Video size={38} />,
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      title: "Hybrid Learning",
      desc: "The perfect mix of online theoretical flexibility and offline practical mastery.",
      icon: <MonitorSmartphone size={38} />,
      gradient: "from-blue-400 to-blue-500",
    },
  ];

  return (
    <section id="modes" className="bg-slate-50 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Modes We Train
        </h2>
        <p className="text-slate-500 mb-16 text-base md:text-lg">
          Elevate your skills with our flexible learning paths
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {modes.map((mode, index) => (
            <motion.div
              key={index}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative overflow-hidden bg-white cursor-pointer rounded-[2.5rem] shadow-xl border border-slate-100 p-12 h-[420px] flex flex-col items-center justify-center"
            >
              {/* Expanding Circle Background */}
              <motion.div
                variants={{
                  rest: { scale: 0 },
                  hover: { scale: 8 },
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`absolute w-32 h-32 rounded-full bg-gradient-to-br ${mode.gradient} z-0`}
                style={{ top: "70px" }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Icon */}
                <motion.div
                  variants={{
                    rest: {
                      backgroundColor: "#f0f9ff",
                      color: "#0ea5e9",
                      scale: 1,
                    },
                    hover: {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "#ffffff",
                      scale: 1.1,
                    },
                  }}
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-inner"
                >
                  {mode.icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                  variants={{
                    rest: { color: "#1e293b", y: 0 },
                    hover: { color: "#ffffff", y: -6 },
                  }}
                  className="text-2xl font-bold mb-4"
                >
                  {mode.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  variants={{
                    rest: { color: "#64748b" },
                    hover: { color: "#ffffff" },
                  }}
                  className="text-center leading-relaxed"
                >
                  {mode.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modes;