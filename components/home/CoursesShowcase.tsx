import Link from "next/link";
import CourseCard from "@/components/courses/CourseCard";
import { CourseUI } from "@/types/course.ui";

type CoursesShowcaseProps = {
  topCourses: CourseUI[];
  isAuthenticated: boolean;
};

export default function CoursesShowcase({
  topCourses,
  isAuthenticated,
}: CoursesShowcaseProps) {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Available Courses
          </h2>
          <p className="text-slate-600 text-lg">
            Start your journey with our top-rated programs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mx-15 lg:mx-0">
          {topCourses?.length ? (
            topCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isAuthenticated={isAuthenticated}
              />
            ))
          ) : (
            <p className="text-center text-slate-500">
              No courses available.
            </p>
          )}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/courses"
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/10"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
