import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  ShieldCheck,
  ListChecks,
  MapPin,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

const EXPLORE = [
  {
    href: "/services",
    icon: Wrench,
    title: "What We Do",
    detail:
      "Eight services covering tenant sourcing through to arrears support — see the full detail for each.",
  },
  {
    href: "/why-us",
    icon: ShieldCheck,
    title: "Why Landlords Choose Us",
    detail:
      "How we compare to informal caretaker management, reason by reason.",
  },
  {
    href: "/how-it-works",
    icon: ListChecks,
    title: "How It Works",
    detail:
      "The four-step process from your first property review to ongoing monthly reporting.",
  },
  // {
  //   href: "/areas",
  //   icon: MapPin,
  //   title: "Areas We Serve",
  //   detail: "Where in Greater Kampala we currently manage properties, with a coverage map.",
  // },
];

export default function HomeExplore() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-10 max-w-xl">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              Explore
            </span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Get to know Platinum Rentals
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXPLORE.map(({ href, icon: Icon, title, detail }, i) => (
            <FadeIn key={href} delay={i * 100}>
              <Link
                href={href}
                className="btn-neu group flex flex-col rounded-2xl p-6"
              >
                <div className="icon-chip mb-5 flex h-12 w-12 items-center justify-center rounded-2xl">
                  <Icon
                    size={22}
                    strokeWidth={1.9}
                    style={{ color: "var(--color-accent)" }}
                  />
                </div>
                <h3 className="text-[15px] font-bold leading-snug">{title}</h3>
                <p
                  className="mt-2 flex-1 text-sm leading-relaxed"
                  style={{ color: "var(--color-ink-faint)" }}
                >
                  {detail}
                </p>
                <span
                  className="mt-4 flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: "var(--color-accent)" }}
                >
                  Explore
                  <ArrowRight
                    size={14}
                    className="transition group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
