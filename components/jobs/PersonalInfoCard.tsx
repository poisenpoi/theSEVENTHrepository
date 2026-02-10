import { User, Calendar, Users } from "lucide-react";

interface PersonalInfoCardProps {
  profile: {
    name: string | null;
    dob: Date | null;
    gender: string | null;
  };
}

export default function PersonalInfoCard({ profile }: PersonalInfoCardProps) {
  if (!profile.name && !profile.dob && !profile.gender) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 bg-linear-to-r from-slate-50 to-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-xl">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Personal Information
          </h2>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
          {profile.name && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Full Name
                </p>
                <p className="text-base text-slate-900 mt-1">
                  {profile.name}
                </p>
              </div>
            </div>
          )}
          {profile.dob && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Date of Birth
                </p>
                <p className="text-base text-slate-900 mt-1">
                  {new Date(profile.dob).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}
          {profile.gender && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Gender
                </p>
                <p className="text-base text-slate-900 mt-1">
                  {profile.gender.charAt(0) +
                    profile.gender.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
