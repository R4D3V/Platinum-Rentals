import { Search, ClipboardList, UserPlus, RefreshCw } from "lucide-react";
import IconPanel from "@/components/IconPanel";
import FadeIn from "@/components/FadeIn";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Property Review",
    detail:
      "We start with a physical inspection of your property — condition, any repairs needed before letting, and realistic rent expectations for the area. From there we agree a management plan, a fee structure, and how often you'll receive reports.",
    duration: "Typically 1–2 site visits",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Onboarding",
    detail:
      "We sign a written management agreement covering scope, fees, and reporting — the document most caretaker arrangements never have. Your property is registered in our system, photographed, and prepared for tenancy marketing.",
    duration: "Signed agreement + registration",
  },
  {
    n: "03",
    icon: UserPlus,
    title: "Tenant Placement",
    detail:
      "We market the unit, coordinate viewings, and screen every applicant — identity, income, and reference checks — before shortlisting candidates for your approval. Once you're happy, we place the tenant on a standard, compliant lease.",
    duration: "Screening + signed lease",
  },
  {
    n: "04",
    icon: RefreshCw,
    title: "Ongoing Management",
    detail:
      "From here it's continuous: rent collection, maintenance coordination, quarterly inspections, and a monthly statement landing in your inbox. You stay fully informed without having to chase anything yourself.",
    duration: "Monthly cycle, ongoing",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const reversed = i % 2 === 1;

          const panel = (
            <div key="panel" className={reversed ? "lg:order-2" : "lg:order-1"}>
              <IconPanel icon={Icon} size="md" />
            </div>
          );

          const text = (
            <div key="text" className={reversed ? "lg:order-1" : "lg:order-2"}>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-extrabold" style={{ color: "var(--color-shadow-dark)" }}>
                  {step.n}
                </span>
                <span className="icon-chip flex h-11 w-11 items-center justify-center rounded-2xl">
                  <Icon size={20} strokeWidth={1.9} style={{ color: "var(--color-accent)" }} />
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold sm:text-2xl">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                {step.detail}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-accent)" }}>
                {step.duration}
              </p>
            </div>
          );

          return (
            <FadeIn key={step.n} delay={i * 120}>
              <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                {panel}
                {text}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
