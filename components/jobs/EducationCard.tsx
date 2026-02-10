import { GraduationCap } from "lucide-react";

interface EducationCardProps {
  educations: {
    id: string;
    institution: string;
    degree: string | null;
    fieldOfStudy: string | null;
    startDate: Date;
    endDate: Date | null;
  }[];
  fullWidth?: boolean;
}

export default function EducationCard({ educations, fullWidth }: EducationCardProps) {
  if (educations.length === 0) return null;

  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden ${fullWidth ? "md:col-span-2" : ""}`}>
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-50 rounded-xl">
            <GraduationCap className="w-5 h-5 text-violet-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Education
          </h2>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {educations.map((edu) => (
          <div
            key={edu.id}
            className="px-6 py-4"
          >
            <h3 className="font-semibold text-slate-900">
              {edu.institution}
            </h3>
            {(edu.degree || edu.fieldOfStudy) && (
              <p className="text-sm text-slate-600 mt-0.5">
                {[edu.degree, edu.fieldOfStudy]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
            <p className="text-xs text-slate-400 mt-1">
              {new Date(edu.startDate).getFullYear()} –{" "}
              {edu.endDate
                ? new Date(edu.endDate).getFullYear()
                : "Present"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
