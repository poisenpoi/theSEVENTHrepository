"use client";

import Link from "next/link";
import {
  Briefcase,
  MapPin,
  CheckCircle,
  Send,
  Clock,
  Banknote,
  Globe,
  Building2,
  Users,
  ArrowUpDown,
} from "lucide-react";
import { JobUI } from "@/types/job.ui";
import { ApplicationStatus, User, Profile } from "@prisma/client";
import BackButton from "../BackButton";
import { applyJob } from "@/actions/applyJob";

interface JobDetailsProps {
  job: JobUI;
  applicationStatus: ApplicationStatus | null;
  user: User | null;
  profile: Profile | null;
}

export default function JobDetail({
  job,
  applicationStatus,
  user,
  profile,
}: JobDetailsProps) {
  const renderApplyButton = () => {
    if (!user) {
      return (
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-eduBlue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg py-4 rounded-xl transition-all"
        >
          Login to Apply
        </Link>
      );
    }

    if (user.role !== "EDUCATEE") return null;

    switch (applicationStatus) {
      case "APPLIED":
        return (
          <div className="flex items-center justify-center gap-2 bg-emerald-100 text-emerald-700 py-4 rounded-xl font-semibold border border-emerald-200">
            <CheckCircle className="w-5 h-5" />
            Applied
          </div>
        );

      case "REVIEWED":
        return (
          <div className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-4 rounded-xl font-semibold border border-blue-200">
            <CheckCircle className="w-5 h-5" />
            Under Review
          </div>
        );

      case "ACCEPTED":
        return (
          <div className="flex items-center justify-center gap-2 bg-green-100 text-green-700 py-4 rounded-xl font-semibold border border-green-200">
            <CheckCircle className="w-5 h-5" />
            Accepted
          </div>
        );

      case "REJECTED":
        return (
          <div className="flex items-center justify-center gap-2 bg-red-100 text-red-700 py-4 rounded-xl font-semibold border border-red-200">
            Rejected
          </div>
        );

      default:
        return (
          <form action={applyJob.bind(null, job.id)}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-eduBlue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg py-4 rounded-xl transition-all"
            >
              <Send className="w-5 h-5" />
              Apply Now
            </button>
          </form>
        );
    }
  };

  const formatPaycheck = (min: number | null, max: number | null) => {
    if (!min && !max) return "Undisclosed";

    const format = (num: number) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 1,
        notation: "compact",
      }).format(num);

    if (min && max) return `${format(min)} - ${format(max)}`;
    if (min) return `From ${format(min)}`;
    if (max) return `Up to ${format(max)}`;
    return "";
  };

  const hireRate =
    ((job.user.profile?.totalHired ?? 0) /
      Math.max(job.user.profile?.totalApplicants ?? 1, 1)) *
    100;

  const websiteUrl = job.user.profile?.companyWebsite
    ? job.user.profile.companyWebsite.startsWith("http")
      ? job.user.profile.companyWebsite
      : `https://${job.user.profile.companyWebsite}`
    : "#";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-11.25">
          <BackButton />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <span className="bg-eduBlue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {job.category.name}
                </span>
              </div>

              <h1 className="text-4xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {job.location?.toUpperCase() ??
                    job.user.profile?.companyAddress?.toUpperCase() ??
                    "JOB LOCATION"}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {job.level || "ANY"}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {job.type.replace("_", " ")}
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  {job.workMode}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 hidden lg:block"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Details & Overview */}
          <div className="lg:col-span-2 py-12 space-y-8">
            {/* Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-slate-400" />
                  Job Details
                </h2>
              </div>
              <div className="p-6">
                {/* Applied & Hired Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <span className="block text-3xl font-bold text-slate-900">
                      {job.applicators}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      Applied
                    </span>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center">
                    <span className="block text-3xl font-bold text-emerald-700">
                      {job.hired}
                    </span>
                    <span className="text-sm text-emerald-600 font-medium">
                      Hired
                    </span>
                  </div>
                </div>

                {/* Other Details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                      <Banknote className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase">
                        Salary
                      </p>
                      <p className="font-bold text-slate-900 text-sm">
                        {formatPaycheck(job.paycheckMin, job.paycheckMax)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase">
                        Location
                      </p>
                      <p className="font-bold text-slate-900 text-sm capitalize truncate max-w-[120px]">
                        {job.location ??
                          job.user.profile?.companyAddress ??
                          "Job Location"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase">
                        Level
                      </p>
                      <p className="font-bold text-slate-900 text-sm capitalize">
                        {job.level?.toLowerCase() || "Any"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase">
                        Type
                      </p>
                      <p className="font-bold text-slate-900 text-sm capitalize">
                        {job.type.replace("_", " ").toLowerCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg">
                      <ArrowUpDown className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase">
                        Work Mode
                      </p>
                      <p className="font-bold text-slate-900 text-sm capitalize">
                        {job.workMode.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview - Job Description */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900">
                  Job Overview
                </h2>
              </div>
              <div className="p-6">
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                  {job.description}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sticky Cards */}
          <div className="lg:col-span-1 lg:order-last relative lg:pb-12">
            <div className="relative lg:-mt-48 z-10 lg:sticky top-24 self-start space-y-4">
              {/* Company Profile Card */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-2xl shadow-slate-900/5 overflow-hidden">
                <div className="p-6 flex flex-col gap-6">
                  {/* Company Header */}
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 shrink-0 rounded-xl border border-slate-100 bg-slate-50 p-2 flex items-center justify-center">
                      <img
                        src={job.user.profile?.pictureUrl || "/avatars/male.svg"}
                        alt="Company Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-bold text-slate-900 truncate">
                        {job.user.profile?.name || "Company Name"}
                      </p>
                      <p className="text-slate-500 text-sm flex items-center gap-1.5 truncate">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        {job.user.profile?.companyAddress || "Address"}
                      </p>
                    </div>
                  </div>

                  {/* Company Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                      <div className="text-2xl font-bold text-slate-900">
                        {job.user.profile?.totalJobs || 0}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        Jobs Posted
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                      <div className="text-2xl font-bold text-slate-900">
                        {Math.round(hireRate) || 0}%
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        Hire Rate
                      </div>
                    </div>
                  </div>

                  {/* Company Details */}
                  <div className="pt-4 border-t border-slate-200/60 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      About Company
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                      {job.user.profile?.bio || "No company description available."}
                    </p>

                    {job.user.profile?.companyWebsite && (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-eduBlue hover:text-blue-700 transition-colors text-sm font-medium"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </a>
                    )}
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-200/60">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Last Updated</span>
                    </div>
                    <span className="font-semibold text-slate-900">
                      {new Date(job.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Application Status / Apply Card */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden">
                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    Application
                  </h3>

                  {user && user.role === "EDUCATEE" && (
                    <>
                      {!profile ||
                      !profile.name ||
                      !profile.gender ||
                      !profile.dob ? (
                        <div className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 font-medium text-center">
                          Please complete your profile before applying for this position.
                          <Link
                            href="/profile"
                            className="block mt-2 text-eduBlue hover:text-blue-700 font-semibold"
                          >
                            Complete Profile →
                          </Link>
                        </div>
                      ) : (
                        renderApplyButton()
                      )}
                    </>
                  )}

                  {!user && renderApplyButton()}

                  {user && user.role !== "EDUCATEE" && (
                    <div className="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                      Only job seekers can apply to positions.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
