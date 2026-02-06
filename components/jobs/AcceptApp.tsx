"use client";

import { acceptApplication, rejectApplication } from "@/actions/jobManagement";

export function AcceptApp({ app }: { app: any }) {
  return (
    <div className="flex items-center gap-2">
      <form action={acceptApplication.bind(null, app.id)}>
        <button
          className="px-4 py-2 rounded-full font-semibold text-sm bg-emerald-600 text-white border border-emerald-700 hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Accept
        </button>
      </form>

      <form action={rejectApplication.bind(null, app.id)}>
        <button
          disabled={app.status !== "REVIEWED"}
          className="px-4 py-2 rounded-full font-semibold text-sm bg-red-500 text-white border border-red-600 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reject
        </button>
      </form>
    </div>
  );
}
