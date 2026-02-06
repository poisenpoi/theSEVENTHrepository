"use client";

import { reviewApplication, rejectApplication } from "@/actions/jobManagement";
import { CheckCircle, XCircle } from "lucide-react";

export function ReviewApp({ app }: { app: any }) {
  return (
    <div className="flex gap-3">
      <form action={reviewApplication.bind(null, app.id)} className="flex-1">
        <button
          disabled={app.status !== "APPLIED"}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle className="w-4 h-4" />
          Review
        </button>
      </form>

      <form action={rejectApplication.bind(null, app.id)} className="flex-1">
        <button
          disabled={app.status !== "APPLIED"}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </button>
      </form>
    </div>
  );
}
