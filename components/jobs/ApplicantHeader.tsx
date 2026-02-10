import { ReviewApp } from "@/components/jobs/ReviewApp";
import { AcceptApp } from "@/components/jobs/AcceptApp";
import BackButton from "@/components/BackButton";
import { Mail, CheckCircle, Clock, XCircle } from "lucide-react";

interface ApplicantHeaderProps {
  application: {
    id: string;
    status: string;
    job: {
      title: string;
    };
  };
  profile: {
    name: string | null;
    pictureUrl: string | null;
  } | null;
  email: string;
}

const statusMap: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  APPLIED: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-200",
    label: "Applied",
  },
  REVIEWED: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    label: "Under Review",
  },
  ACCEPTED: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
    label: "Accepted",
  },
  REJECTED: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
    label: "Rejected",
  },
};

export default function ApplicantHeader({
  application,
  profile,
  email,
}: ApplicantHeaderProps) {
  const status = statusMap[application.status] || statusMap.APPLIED;

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <BackButton />

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center text-2xl font-bold text-eduBlue shrink-0">
            {profile?.pictureUrl ? (
              <img
                src={profile.pictureUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>
                {profile?.name?.[0] ?? email[0].toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">
                {profile?.name || email}
              </h1>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold text-xs ${status.bg} ${status.text} border ${status.border}`}
              >
                {application.status === "REVIEWED" && (
                  <Clock className="w-3.5 h-3.5" />
                )}
                {application.status === "ACCEPTED" && (
                  <CheckCircle className="w-3.5 h-3.5" />
                )}
                {application.status === "REJECTED" && (
                  <XCircle className="w-3.5 h-3.5" />
                )}
                {status.label}
              </div>
              {(application.status === "APPLIED" ||
                application.status === "REVIEWED") && (
                <div className="shrink-0 sm:ml-auto">
                  {application.status === "APPLIED" && (
                    <ReviewApp app={application} />
                  )}
                  {application.status === "REVIEWED" && (
                    <AcceptApp app={application} />
                  )}
                </div>
              )}
            </div>
            <p className="mt-1 text-slate-500 text-sm flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {email}
            </p>
            <p className="mt-2 text-slate-600 text-sm">
              Applied for{" "}
              <span className="font-semibold text-slate-900">
                {application.job.title}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
