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
  Sparkles,
  TrendingUp,
  ExternalLink,
  Zap,
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
          className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]"
        >
          <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          Login to Apply
        </Link>
      );
    }

    if (user.role !== "EDUCATEE") return null;

    switch (applicationStatus) {
      case "APPLIED":
        return (
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-emerald-500/25">
            <CheckCircle className="w-5 h-5" />
            Applied Successfully
          </div>
        );

      case "REVIEWED":
        return (
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/25 animate-pulse">
            <Clock className="w-5 h-5" />
            Under Review
          </div>
        );

      case "ACCEPTED":
        return (
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-green-500/25">
            <CheckCircle className="w-5 h-5" />
            Congratulations! Accepted
          </div>
        );

      case "REJECTED":
        return (
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-red-500/25">
            Application Rejected
          </div>
        );

      default:
        return (
          <form action={applyJob.bind(null, job.id)}>
            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-20">
      {/* Header with gradient and pattern */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative z-0 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtNHYySDJ2LTJoMzR6bTAtNHYySDJ2LTJoMzR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <BackButton />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-purple-500/30">
                  {job.category.name}
                </span>
                <span className="bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
                  <Zap className="w-3 h-3 inline mr-1" />
                  Active
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: MapPin, text: job.location?.toUpperCase() ?? job.user.profile?.companyAddress?.toUpperCase() ?? "LOCATION" },
                  { icon: Briefcase, text: job.level || "ANY LEVEL" },
                  { icon: Clock, text: job.type.replace("_", " ") },
                  { icon: ArrowUpDown, text: job.workMode },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10 text-sm text-white/90">
                    <item.icon className="w-4 h-4 text-purple-300" />
                    {item.text}
                  </div>
                ))}
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
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-xl shadow-blue-500/20 overflow-hidden hover:shadow-blue-500/30 transition-all hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                    <Users className="w-4 h-4" />
                    Total Applied
                  </div>
                  <span className="block text-5xl font-black text-white">
                    {job.applicators}
                  </span>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-xl shadow-emerald-500/20 overflow-hidden hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-emerald-100 text-sm font-medium mb-2">
                    <TrendingUp className="w-4 h-4" />
                    Got Hired
                  </div>
                  <span className="block text-5xl font-black text-white">
                    {job.hired}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/30">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  Job Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Banknote, label: "Salary", value: formatPaycheck(job.paycheckMin, job.paycheckMax), gradient: "from-green-400 to-emerald-500", shadow: "shadow-green-500/30" },
                    { icon: MapPin, label: "Location", value: job.location ?? job.user.profile?.companyAddress ?? "Job Location", gradient: "from-blue-400 to-indigo-500", shadow: "shadow-blue-500/30" },
                    { icon: Briefcase, label: "Level", value: job.level?.toLowerCase() || "Any", gradient: "from-purple-400 to-violet-500", shadow: "shadow-purple-500/30" },
                    { icon: Clock, label: "Type", value: job.type.replace("_", " ").toLowerCase(), gradient: "from-amber-400 to-orange-500", shadow: "shadow-orange-500/30" },
                    { icon: ArrowUpDown, label: "Work Mode", value: job.workMode.toLowerCase(), gradient: "from-cyan-400 to-teal-500", shadow: "shadow-cyan-500/30" },
                  ].map((item, i) => (
                    <div key={i} className="group p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all">
                      <div className={`inline-flex p-2.5 bg-gradient-to-br ${item.gradient} rounded-xl shadow-lg ${item.shadow} mb-3 group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      <p className="font-bold text-slate-900 capitalize truncate">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview - Job Description */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/30">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
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
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-2xl shadow-slate-900/10 overflow-hidden">
                {/* Gradient Header */}
                <div className="h-24 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTJIMXY0aDM0ek0wIDI4djJoMzZ2LTJIMHptMC04djJoMzZ2LTJIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
                  <div className="absolute -bottom-12 left-6">
                    <div className="w-20 h-20 rounded-2xl border-4 border-white bg-white shadow-xl overflow-hidden">
                      <img
                        src={job.user.profile?.pictureUrl || "/avatars/male.svg"}
                        alt="Company Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-14 p-6 flex flex-col gap-5">
                  {/* Company Info */}
                  <div>
                    <p className="text-xl font-bold text-slate-900">
                      {job.user.profile?.name || "Company Name"}
                    </p>
                    <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {job.user.profile?.companyAddress || "Address"}
                    </p>
                  </div>

                  {/* Company Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200/60 text-center group hover:border-purple-200 hover:from-purple-50 hover:to-violet-50 transition-all">
                      <div className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        {job.user.profile?.totalJobs || 0}
                      </div>
                      <div className="text-xs text-slate-500 font-semibold mt-1">
                        Jobs Posted
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200/60 text-center group hover:border-emerald-200 hover:from-emerald-50 hover:to-teal-50 transition-all">
                      <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        {Math.round(hireRate) || 0}%
                      </div>
                      <div className="text-xs text-slate-500 font-semibold mt-1">
                        Hire Rate
                      </div>
                    </div>
                  </div>

                  {/* About */}
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      About Company
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                      {job.user.profile?.bio || "No company description available."}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    {job.user.profile?.companyWebsite && (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 text-slate-700 py-3 rounded-xl font-semibold text-sm transition-all border border-slate-200"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                    <Clock className="w-3.5 h-3.5" />
                    Updated {new Date(job.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              {/* Application Status / Apply Card */}
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden">
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/30">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900">
                      Apply for this position
                    </h3>
                  </div>

                  {user && user.role === "EDUCATEE" && (
                    <>
                      {!profile ||
                      !profile.name ||
                      !profile.gender ||
                      !profile.dob ? (
                        <div className="text-sm bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-xl border border-red-200 text-center">
                          <p className="text-red-600 font-medium">
                            Complete your profile to apply
                          </p>
                          <Link
                            href="/profile"
                            className="inline-flex items-center gap-1 mt-2 text-purple-600 hover:text-purple-700 font-bold text-sm"
                          >
                            Complete Profile
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      ) : (
                        renderApplyButton()
                      )}
                    </>
                  )}

                  {!user && renderApplyButton()}

                  {user && user.role !== "EDUCATEE" && (
                    <div className="text-sm text-slate-500 bg-slate-100 p-4 rounded-xl text-center font-medium">
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
