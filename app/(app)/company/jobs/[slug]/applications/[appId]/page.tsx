import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ReviewApp } from "@/components/jobs/ReviewApp";
import { AcceptApp } from "@/components/jobs/AcceptApp";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Users,
  Sparkles,
  GraduationCap,
  Briefcase,
  BookOpen,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
} from "lucide-react";

interface PageProps {
  params: {
    slug: string;
    appId: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Applicant Detail | EduTIA",
    description: "Review applicant information and manage application status.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

function getStatusBadge(status: string) {
  switch (status) {
    case "ACCEPTED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
          <CheckCircle className="w-3.5 h-3.5" />
          Accepted
        </span>
      );
    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
          <XCircle className="w-3.5 h-3.5" />
          Rejected
        </span>
      );
    case "REVIEWED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
          <Clock className="w-3.5 h-3.5" />
          Under Review
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
          <Clock className="w-3.5 h-3.5" />
          Pending
        </span>
      );
  }
}

export default async function ApplicantDetailPage({ params }: PageProps) {
  const user = await getCurrentUser();
  if (!user || user.role !== "COMPANY") redirect("/dashboard");

  const { appId, slug } = await params;

  const application = await prisma.jobApplication.findUnique({
    where: { id: appId },
    include: {
      user: {
        include: {
          profile: true,
          skills: true,
          educations: true,
          experiences: true,
          cvs: true,
          workshopSubmissions: {
            include: {
              workshop: true,
            },
          },
        },
      },
      job: true,
    },
  });

  if (!application) redirect("/dashboard");
  if (application.job.userId !== user.id) redirect("/dashboard");

  const applicant = application.user;
  const { profile } = applicant;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <Link
            href={`/company/jobs/${slug}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Applicants</span>
          </Link>

          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-xl font-semibold shrink-0 ring-2 ring-white/10">
                {profile?.pictureUrl ? (
                  <img
                    src={profile.pictureUrl}
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-slate-300">
                    {profile?.name?.[0] ?? applicant.email[0].toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  {profile?.name || applicant.email}
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Applied for <span className="text-white font-medium">{application.job.title}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {getStatusBadge(application.status)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-6">
        {/* Personal Info & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Details Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <User className="w-4 h-4 text-indigo-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Personal Details</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</p>
                    <p className="text-sm font-medium text-slate-900 mt-0.5">{applicant.email}</p>
                  </div>
                </div>

                {profile?.name && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg shrink-0">
                      <User className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Full Name</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">{profile.name}</p>
                    </div>
                  </div>
                )}

                {profile?.dob && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-50 rounded-lg shrink-0">
                      <Calendar className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Date of Birth</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">
                        {new Date(profile.dob).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {profile?.gender && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg shrink-0">
                      <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Gender</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">{profile.gender}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-xl">
                <Briefcase className="w-4 h-4 text-slate-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">Current Status:</span>
                {getStatusBadge(application.status)}
              </div>

              {applicant.cvs.length > 0 && (
                <a
                  href={applicant.cvs[0].fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-eduBlue/40 transition-all"
                >
                  <FileText className="w-4 h-4 text-eduBlue" />
                  View CV
                  <ExternalLink className="w-3.5 h-3.5 ml-auto text-slate-400" />
                </a>
              )}

              {application.status === "APPLIED" && <ReviewApp app={application} />}
              {application.status === "REVIEWED" && <AcceptApp app={application} />}
            </div>
          </div>
        </div>

        {/* Skills */}
        {applicant.skills.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Skills</h2>
              <span className="text-xs text-slate-400 ml-auto">{applicant.skills.length} skills</span>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {applicant.skills.map((s) => (
                  <span
                    key={s.id}
                    className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education */}
        {applicant.educations.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-xl">
                <GraduationCap className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Education</h2>
              <span className="text-xs text-slate-400 ml-auto">{applicant.educations.length} entries</span>
            </div>
            <div className="divide-y divide-slate-100">
              {applicant.educations.map((edu) => (
                <div key={edu.id} className="px-6 py-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">{edu.institution}</p>
                    {(edu.degree || edu.fieldOfStudy) && (
                      <p className="text-sm text-slate-600 mt-0.5">
                        {[edu.degree, edu.fieldOfStudy].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(edu.startDate).getFullYear()} –{" "}
                      {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {applicant.experiences.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <Briefcase className="w-4 h-4 text-emerald-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Experience</h2>
              <span className="text-xs text-slate-400 ml-auto">{applicant.experiences.length} entries</span>
            </div>
            <div className="divide-y divide-slate-100">
              {applicant.experiences.map((exp) => (
                <div key={exp.id} className="px-6 py-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Briefcase className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">{exp.jobTitle}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{exp.companyName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workshop Submissions */}
        {applicant.workshopSubmissions.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-xl">
                <BookOpen className="w-4 h-4 text-amber-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Completed Workshops</h2>
              <span className="text-xs text-slate-400 ml-auto">{applicant.workshopSubmissions.length} completed</span>
            </div>
            <div className="divide-y divide-slate-100">
              {applicant.workshopSubmissions.map((sub) => (
                <div key={sub.id} className="px-6 py-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">{sub.workshop.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-slate-400">
                        Submitted {new Date(sub.submittedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      {sub.score !== null && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Score: {sub.score}
                        </span>
                      )}
                    </div>
                    {sub.feedback && (
                      <p className="text-sm text-slate-500 mt-1.5 italic">
                        &ldquo;{sub.feedback}&rdquo;
                      </p>
                    )}
                  </div>
                  <a
                    href={sub.submissionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-eduBlue bg-blue-50 hover:bg-blue-100 transition-colors shrink-0"
                  >
                    View
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
