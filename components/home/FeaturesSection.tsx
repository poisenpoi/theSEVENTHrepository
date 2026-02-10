import { Waypoints, Briefcase, Users, Award } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-24 text-white bg-eduBlue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Core Features</h2>
          <p className="text-blue-100 text-lg">
            Everything you need to bridge the gap to your dream career.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mx-15 lg:mx-0">
          <div className="group p-6 rounded-2xl bg-white text-slate-900 shadow-lg hover:shadow-xl flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-eduBlue">
              <Waypoints className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold mb-2">Skill-sharing</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Curated learning paths tailored specifically for different job
              roles and industries.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white text-slate-900 shadow-lg hover:shadow-xl flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-4 text-green-600">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold mb-2">Job Listing</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Exclusive access to job openings matched to your completed
              courses and skills.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white text-slate-900 shadow-lg hover:shadow-xl flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4 text-purple-600">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold mb-2">Workshop</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Interactive hands-on sessions with experts to master practical
              skills in real-time.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white text-slate-900 shadow-lg hover:shadow-xl flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-4 text-orange-600">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold mb-2">Certification & CV</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Industry-recognized certificates and professional CV reviews
              to stand out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
