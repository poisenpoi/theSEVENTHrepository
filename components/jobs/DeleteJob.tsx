"use client";

import { deleteJob } from "@/actions/jobManagement";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Trash2 } from "lucide-react";

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 hover:border-red-300 transition-all"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>

      <ConfirmDialog
        open={open}
        title="Delete Job Posting"
        description="This action cannot be undone. All applications related to this job will be permanently deleted."
        confirmText="Delete Job"
        onCancel={() => setOpen(false)}
        onConfirm={async () => {
          await deleteJob(jobId);
          setOpen(false);
          router.push("/dashboard");
        }}
      />
    </>
  );
}