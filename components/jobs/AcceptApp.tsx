"use client";

import { acceptApplication, rejectApplication } from "@/actions/jobManagement";
import { CheckCircle, XCircle } from "lucide-react";

export function AcceptApp({ app }: { app: any }) {
  return (
    <div className="flex flex-col gap-2">
      <form action={acceptApplication.bind(null, app.id)}>
        <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors">
          <CheckCircle className="w-4 h-4" />
          Accept Applicant
        </button>
      </form>

      <form action={rejectApplication.bind(null, app.id)}>
        <button
          disabled={app.status !== "REVIEWED"}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 disabled:opacity-50 transition-colors"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </button>
      </form>
    </div>
  );
}
