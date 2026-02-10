import Link from "next/link";
import { CheckCircle2, User } from "lucide-react";

type HeroSectionProps = {
  isAuthenticated: boolean;
};

export default function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <section className="relative flex items-center">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Learn Skills That{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-eduBlue to-purple-600">
                Matter.
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We help learners build practical skills, gain knowledge, and
              bridge the gap between education and real-world opportunities.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/courses"
                className="px-8 py-4 rounded-xl font-bold text-white text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto bg-eduBlue"
              >
                Explore Courses
              </Link>
              {!isAuthenticated && (
                <Link
                  href="/login"
                  className="px-8 py-4 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200 bg-white">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                alt="Students learning"
                className="w-full h-auto object-cover"
              />

              <div className="absolute top-8 left-8 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">
                    Success Rate
                  </p>
                  <p className="text-slate-900 font-bold">98% Hired</p>
                </div>
              </div>

              <div
                className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce-slow"
                style={{ animationDelay: "1s" }}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-eduBlue" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">
                    Active Learners
                  </p>
                  <p className="text-slate-900 font-bold">120k+ Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
