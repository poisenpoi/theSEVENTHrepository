import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Frontend Developer",
    content:
      "EduTia changed the trajectory of my career. The React course was exactly what I needed to land my first dev job.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Data Analyst",
    content:
      "The depth of the Data Science curriculum is unmatched. I went from knowing zero Python to building ML models in weeks.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Jessica Williams",
    role: "Digital Marketer",
    content:
      "Practical, hands-on, and up-to-date. The digital marketing masterclass gave me strategies.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "UX Designer",
    content:
      "The instructor feedback on my portfolio projects was invaluable. It helped me polish my work to professional standards.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Emily Watson",
    role: "Product Manager",
    content:
      "I took the business strategy course to better understand my role. It was a game-changer for my communication.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    name: "James Kim",
    role: "Software Engineer",
    content:
      "The backend bootcamp is brutal but worth it. You really learn how things work under the hood.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 7,
    name: "Amanda Martinez",
    role: "Freelance Designer",
    content:
      "Flexibility is key for me. EduTia allowed me to learn new design tools late at night after my client work was done.",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    id: 8,
    name: "Robert Taylor",
    role: "Cybersecurity Analyst",
    content:
      "Excellent content on network security. The labs were very realistic and prepared me well for my certification.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: 9,
    name: "Lisa Anderson",
    role: "HR Specialist",
    content:
      "We use EduTia for our internal team training. The progress tracking features make my job so much easier.",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    id: 10,
    name: "Thomas Wilson",
    role: "Mobile Developer",
    content:
      "Flutter vs React Native? This platform helped me decide and master the right tool for my startup idea.",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What our students say
          </h2>
          <p className="text-slate-600 text-lg">
            Join thousands of satisfied learners achieving their goals.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10"></div>

        <div className="flex gap-6 animate-scroll hover:pause-scroll w-max px-4">
          {[...testimonials, ...testimonials].map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="w-87.5 shrink-0 bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">
                <Quote className="w-6 h-6 text-blue-300 fill-current" />
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed italic text-sm line-clamp-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-slate-500 text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
