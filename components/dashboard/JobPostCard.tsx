import Link from "next/link";
import { Users, Briefcase } from "lucide-react";

interface JobPostCardProps {
  job: {
    id: string;
    title: string;
    slug: string;
    status: string;
    hired: number;
    _count: {
      applications: number;
    };
  };
}

export function JobPostCard({ job }: JobPostCardProps) {
  return (
    <Link
      href={`/company/jobs/${job.slug}`}
      className="group flex gap-3 p-3 bg-white border border-slate-100 rounded-2xl hover:border-eduBlue/40 hover:shadow-md transition-all duration-200 relative overflow-hidden shrink-0"
    >
      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-eduBlue/10 transition-colors">
        <Briefcase className="w-5 h-5 text-slate-400 group-hover:text-eduBlue transition-colors" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1 group-hover:text-eduBlue transition-colors">
            {job.title}
          </h3>
          {job.status === "DRAFT" && (
            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full shrink-0">
              Draft
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {job._count.applications} applicants
          </span>
          <span className="text-emerald-600 font-medium">
            {job.hired} hired
          </span>
        </div>
      </div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs font-semibold text-eduBlue">Edit →</span>
      </div>
    </Link>
  );
}
