"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="flex items-center gap-1 text-sm mb-4 cursor-pointer w-fit"
    >
      <ChevronLeft className="w-4 h-4 text-slate-400 shrink-0 translate-y-px" />
      <span className="text-sm text-eduBlue hover:text-eduBlue/80 transition-colors font-medium leading-none">
        Previous page
      </span>
    </div>
  );
}