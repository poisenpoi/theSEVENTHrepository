import { Briefcase } from "lucide-react";

interface ExperienceCardProps {
  experiences: {
    id: string;
    jobTitle: string;
    companyName: string;
  }[];
  fullWidth?: boolean;
}

export default function ExperienceCard({ experiences, fullWidth }: ExperienceCardProps) {
  if (experiences.length === 0) return null;

  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden ${fullWidth ? "md:col-span-2" : ""}`}>
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-xl">
            <Briefcase className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Experience
          </h2>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="px-6 py-4"
          >
            <h3 className="font-semibold text-slate-900">
              {exp.jobTitle}
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              {exp.companyName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
