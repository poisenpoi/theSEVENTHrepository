"use client";

import { CourseUI } from "@/types/course.ui";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CoursesShowcase from "./CoursesShowcase";
import TestimonialsSection from "./TestimonialsSection";

type HomepageProps = {
  topCourses: CourseUI[];
  isAuthenticated: boolean;
};

export default function Homepage({
  topCourses,
  isAuthenticated,
}: HomepageProps) {
  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 selection:bg-blue-100 flex flex-col overflow-hidden">
      <main className="grow">
        <HeroSection isAuthenticated={isAuthenticated} />
        <FeaturesSection />
        <CoursesShowcase
          topCourses={topCourses}
          isAuthenticated={isAuthenticated}
        />
        <TestimonialsSection />
      </main>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-350px * 10 - 24px * 10)); }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .hover\\:pause-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
