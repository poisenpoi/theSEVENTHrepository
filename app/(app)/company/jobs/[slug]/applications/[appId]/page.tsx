import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { Metadata } from "next";
import ApplicantHeader from "@/components/jobs/ApplicantHeader";
import PersonalInfoCard from "@/components/jobs/PersonalInfoCard";
import EducationCard from "@/components/jobs/EducationCard";
import ExperienceCard from "@/components/jobs/ExperienceCard";
import WorkshopsCard from "@/components/jobs/WorkshopsCard";
import SkillsCard from "@/components/jobs/SkillsCard";
import ResumeCard from "@/components/jobs/ResumeCard";

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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50/30">
      <ApplicantHeader
        application={application}
        profile={profile}
        email={applicant.email}
      />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 space-y-8">
        {profile && <PersonalInfoCard profile={profile} />}

        {(applicant.educations.length > 0 ||
          applicant.experiences.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EducationCard
              educations={applicant.educations}
              fullWidth={applicant.experiences.length === 0}
            />
            <ExperienceCard
              experiences={applicant.experiences}
              fullWidth={applicant.educations.length === 0}
            />
          </div>
        )}

        {(applicant.workshopSubmissions.length > 0 ||
          applicant.skills.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <WorkshopsCard
              workshopSubmissions={applicant.workshopSubmissions}
              fullWidth={applicant.skills.length === 0}
            />
            <SkillsCard
              skills={applicant.skills}
              fullWidth={applicant.workshopSubmissions.length === 0}
            />
          </div>
        )}

        <ResumeCard cvs={applicant.cvs} />
      </div>
    </div>
  );
}
