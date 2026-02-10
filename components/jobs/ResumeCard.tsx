import { FileText, Download, ExternalLink } from "lucide-react";

interface ResumeCardProps {
  cvs: {
    fileUrl: string;
  }[];
}

export default function ResumeCard({ cvs }: ResumeCardProps) {
  if (cvs.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-50 rounded-xl">
            <FileText className="w-5 h-5 text-rose-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Resume
          </h2>
        </div>
      </div>
      <div className="p-6">
        <a
          href={cvs[0].fileUrl}
          target="_blank"
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium hover:bg-slate-100 hover:border-slate-300 transition-all"
        >
          <Download className="w-4 h-4 text-slate-500" />
          Download CV
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>
    </div>
  );
}
