"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Shield,
  Users,
  Award,
  Stethoscope,
} from "lucide-react";

const data = [
  {
    title: "Top Reputation",
    description: "Trusted by thousands of students",
    detail: "15 years of experience, over 10,000 students served",
    icon: <Award className="w-6 h-6 text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "Professional Team",
    description: "Experienced doctors and nurses",
    detail: "Always ready to provide dedicated care",
    icon: <Users className="w-6 h-6 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Modern Equipment",
    description: "Cutting-edge medical technology",
    detail: "Quick and accurate responses",
    icon: <Stethoscope className="w-6 h-6 text-white" />,
    color: "bg-purple-500",
  },
  {
    title: "Comprehensive Care",
    description: "From prevention to treatment and counseling",
    detail: "",
    icon: <Heart className="w-6 h-6 text-white" />,
    color: "bg-rose-500",
  },
  {
    title: "Absolute Safety",
    description: "Ensuring a safe and healthy school environment",
    detail: "",
    icon: <Shield className="w-6 h-6 text-white" />,
    color: "bg-orange-500",
  },
];

export default function SimpleCardCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % data.length);
  const prev = () => setIndex((prev) => (prev - 1 + data.length) % data.length);

  // Auto-play every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      next();
    }, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  const current = data[index];

  return (
    <div className="w-full h-80 flex flex-col items-center py-8 bg-[#e8eff2]">
      <h1 className="text-black-500 text-3xl mb-4 mt-4 text-center">
        Comprehensive healthcare services for students
      </h1>

      <div className="relative  bg-gradient-to-br from-[#e0f7fa] via-white to-[#fce4ec] border border-gray-200  hover:shadow-lg p-5 bg-white rounded-2xl shadow-md px-6 py-10 w-full   max-w-2xl text-center transition-all duration-700 ease-in-out">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div
          className={`w-12 h-12 mx-auto flex items-center justify-center rounded-full ${current.color}`}
        >
          {current.icon}
        </div>

        {/* Title + Desc */}
        <h3 className="text-xl font-semibold mt-4">{current.title}</h3>
        <p className="text-gray-600 mt-2">{current.description}</p>
        {current.detail && (
          <p className="text-gray-400 text-sm mt-1">{current.detail}</p>
        )}
      </div>
    </div>
  );
}
