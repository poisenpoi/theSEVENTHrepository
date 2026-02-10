import { ListCheck } from "lucide-react";

interface SkillsCardProps {
  skills: {
    id: string;
    name: string;
  }[];
  fullWidth?: boolean;
}

export default function SkillsCard({ skills, fullWidth }: SkillsCardProps) {
  if (skills.length === 0) return null;

  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden ${fullWidth ? "md:col-span-2" : ""}`}>
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl">
            <ListCheck className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Skills
          </h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s.id}
              className="px-3 py-1.5 rounded-full bg-blue-50 text-sm font-medium text-blue-700"
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
