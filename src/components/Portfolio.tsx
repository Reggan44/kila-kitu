const projects = [
  {
    name: "DukaPOS",
    description:
      "Mobile-first retail point-of-sale & inventory management system built for fast local checkout.",
    tags: ["React", "Node.js", "M-Pesa", "SQLite"],
    gradient: "from-purple-900/30 to-blue-900/30",
  },
  {
    name: "ShopStack",
    description:
      "Modern, responsive e-commerce storefront engineered for seamless mobile shopping.",
    tags: ["Next.js", "Tailwind", "Stripe", "M-Pesa"],
    gradient: "from-emerald-900/30 to-teal-900/30",
  },
  {
    name: "SchoolLoop",
    description:
      "Complete school administration, student management, and fee tracking platform.",
    tags: ["React", "PostgreSQL", "SMS API", "Daraja"],
    gradient: "from-orange-900/30 to-rose-900/30",
  },
  {
    name: "OOH Media Directory",
    description:
      "Interactive map-based outdoor advertising directory and advertiser lead engine.",
    tags: ["Next.js", "Maps API", "Supabase", "Analytics"],
    gradient: "from-cyan-900/30 to-indigo-900/30",
  },
  {
    name: "MyIbada",
    description:
      "Faith community engagement platform with livestream, giving, and member management.",
    tags: ["React", "Firebase", "M-Pesa", "Streaming"],
    gradient: "from-pink-900/30 to-violet-900/30",
  },
  {
    name: "LawDone",
    description:
      "Legal practice management system with client intake, case tracking, and document automation.",
    tags: ["Next.js", "PostgreSQL", "Auth", "PDF Gen"],
    gradient: "from-amber-900/30 to-green-900/30",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Systems We've Engineered
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real platforms solving real business problems across East Africa.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-[#111113] rounded-2xl overflow-hidden group hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/5 transition-all duration-300"
            >
              {/* Gradient Placeholder */}
              <div
                className={`h-[200px] bg-gradient-to-br ${project.gradient}`}
              />

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href="#"
                  className="text-yellow-500 text-sm font-medium hover:text-yellow-400 transition-colors"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
