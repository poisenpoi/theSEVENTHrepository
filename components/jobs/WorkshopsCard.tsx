import { BookOpen, ExternalLink } from "lucide-react";

interface WorkshopsCardProps {
  workshopSubmissions: {
    id: string;
    submissionUrl: string;
    submittedAt: Date;
    score: number | null;
    feedback: string | null;
    workshop: {
      title: string;
    };
  }[];
  fullWidth?: boolean;
}

export default function WorkshopsCard({ workshopSubmissions, fullWidth }: WorkshopsCardProps) {
  if (workshopSubmissions.length === 0) return null;

  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden ${fullWidth ? "md:col-span-2" : ""}`}>
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 rounded-xl">
            <BookOpen className="w-5 h-5 text-amber-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Completed Workshops
          </h2>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {workshopSubmissions.map((sub) => (
          <div
            key={sub.id}
            className="flex justify-between items-start gap-4 border-b border-slate-100 last:border-none pb-4 last:pb-0"
          >
            <div>
              <h3 className="font-semibold text-slate-900">
                {sub.workshop.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Submitted on{" "}
                {new Date(sub.submittedAt).toLocaleDateString()}
              </p>
              {sub.score !== null && (
                <p className="text-sm text-slate-600 mt-1">
                  Score:{" "}
                  <span className="font-semibold">{sub.score}</span>
                </p>
              )}
              {sub.feedback && (
                <p className="text-sm text-slate-500 mt-1 italic">
                  &ldquo;{sub.feedback}&rdquo;
                </p>
              )}
            </div>
            <a
              href={sub.submissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-eduBlue hover:text-blue-700 transition-colors shrink-0"
            >
              View
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
