import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Projects & Clients",
  description:
    "See the scope of Sterling CCTV Solutions' work — 4,800+ projects including VVIP security for the Prime Minister of India, Election Commission deployments, examination centers, malls, hospitals, and major corporate groups.",
  alternates: { canonical: "/projects-clients" },
};

const PROJECT_CATEGORIES = [
  {
    title: "National Leadership Security",
    body:
      "CCTV security installations for the Prime Minister of India on 15 occasions, along with security cover for the President of India, the Vice President of India, and Central Ministers including the Union Defence Minister.",
  },
  {
    title: "Election Commission of India Deployments",
    body:
      "CCTV installations under Election Commission of India security measures for MLA, MP, and MLC elections, supporting coverage for gatherings of more than 15 lakh people.",
  },
  {
    title: "VVIP & Mega Public Events",
    body:
      "End-to-end CCTV security for over 1,000 major VVIP and public events across Karnataka, including large religious and cultural gatherings such as Valmiki Jayanti, the Someshwara Temple festivities, and the Bengaluru Karaga, where crowds of 10 to 12 lakh people gather.",
  },
  {
    title: "Examination Centers & Public Spaces",
    body:
      "CCTV systems for high-stakes examination centers, including KEA and CET examinations across Karnataka, as well as malls and public forums, ensuring safety and integrity across sensitive environments.",
  },
  {
    title: "Television & Media Production",
    body:
      "On-set CCTV and camera systems for television productions, including Jaya TV's Action Superstar and Sun TV programs such as Swapna Sundari.",
  },
  {
    title: "Corporate, Institutional & Residential Clients",
    body:
      "Installations spanning commercial complexes, hospitals, government offices, defense establishments, multi-storey buildings, hotels, banks, and large corporate groups such as the Adani Group — alongside residential complexes and individual homes.",
  },
];

export default function ProjectsClientsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="Projects & Clients" crumb="Projects & Clients" />

      <section className="max-w-container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
            Trusted by Over 4,800 Clients Across Karnataka
          </h2>
          <p className="text-[15px] leading-relaxed text-ink/80">
            From national leadership security to neighbourhood homes, Sterling CCTV Solutions has delivered
            surveillance and security installations across every scale of project. Here is a look at the range of
            work we have completed over 22 years.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-10">
          {PROJECT_CATEGORIES.map((cat, i) => (
            <div key={cat.title} className="bg-muted rounded-block p-6">
              <h3 className="text-lg font-bold text-black mb-2">
                {i + 1}. {cat.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink/85">{cat.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
