import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Why Us", href: "/why-us" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Install App", href: "/install" },
];

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-4 sm:px-6 lg:px-10">
      <FadeIn>
        <div className="surface-raised mx-auto max-w-6xl rounded-3xl p-8 sm:p-12">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <Image
                src="/logo/ninety-nine-logo-full.png"
                alt="Ninety Nine Property Consultants"
                width={168}
                height={76}
                className="brand-logo-invert h-12 w-auto"
              />
              <p
                className="mt-4 max-w-xs text-sm leading-relaxed"
                style={{ color: "var(--color-ink-faint)" }}
              >
                A Kampala-based property consultancy specialising in rental
                property management and the sale of verified land — offering
                landlords a professional, transparent alternative to informal
                caretaker-based management.
              </p>
            </div>

            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "var(--color-ink-faint)" }}
              >
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium"
                      style={{ color: "var(--color-ink-soft)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "var(--color-ink-faint)" }}
              >
                Contact
              </h3>
              <ul className="mt-4 space-y-3">
                <li
                  className="flex items-center gap-2.5 text-sm"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  <Phone size={15} style={{ color: "var(--color-accent)" }} />{" "}
                  <a href="tel:+256785175160" className="hover:underline">
                    +256 785 175160
                  </a>
                </li>
                <li
                  className="flex items-center gap-2.5 text-sm"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  <Mail size={15} style={{ color: "var(--color-accent)" }} />{" "}
                  <a
                    href="mailto:info@ninetyninepropertyconsultants.ug"
                    className="hover:underline"
                  >
                    info@ninetyninepropertyconsultants.ug
                  </a>
                </li>
                <li
                  className="flex items-center gap-2.5 text-sm"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  <MapPin size={15} style={{ color: "var(--color-accent)" }} />{" "}
                  Kampala, Uganda
                </li>
              </ul>
            </div>
          </div>

          <div
            className="mt-10 flex flex-col items-center justify-between gap-3 pt-6 text-xs sm:flex-row"
            style={{
              borderTop: "1px solid var(--color-shadow-dark)",
              color: "var(--color-ink-faint)",
            }}
          >
            <p>
              &copy; {new Date().getFullYear()} Ninety Nine Property Consultants. All rights
              reserved.
            </p>
            <p>
              Kampala, Uganda &mdash;{" "}
              <a
                href="https://raymonjohns.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "var(--color-accent)" }}
              >
                Built with ❤️ by RJ
              </a>
            </p>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
