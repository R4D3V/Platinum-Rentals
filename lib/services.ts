import {
  Users,
  Banknote,
  FileBarChart,
  ClipboardCheck,
  Wrench,
  ScrollText,
  Scale,
  Home,
  type LucideIcon,
} from "lucide-react";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  overview: string[];
  included: string[];
  idealFor: string[];
  faqs: ServiceFaq[];
}

export const SERVICES: Service[] = [
  {
    slug: "tenant-sourcing-screening",
    title: "Tenant Sourcing & Screening",
    icon: Users,
    tagline: "The right tenant, placed properly, the first time.",
    summary:
      "Marketing vacant units, identity verification, income/reference checks, and lease placement.",
    overview: [
      "An empty unit is the single biggest cost a landlord absorbs. We treat vacancy as an emergency, not an inconvenience — listing the property across our channels, coordinating viewings, and shortlisting only applicants who actually meet the criteria you set.",
      "Every applicant we place goes through the same screening path: identity verification, proof of income or employment, and reference checks with a previous landlord where available. We don't just fill a unit — we try to place a tenant who pays on time and stays.",
    ],
    included: [
      "Professional listing with photos, description, and pricing guidance",
      "Enquiry handling and viewing coordination",
      "National ID / passport verification",
      "Income, employment, or business verification",
      "Previous landlord reference checks where available",
      "Signed standard lease agreement before handover of keys",
    ],
    idealFor: [
      "Landlords with a vacant unit who don't have time to vet applicants themselves",
      "Diaspora owners who can't be present for viewings",
      "Owners who've been burned by an unscreened tenant before",
    ],
    faqs: [
      {
        q: "How long does it typically take to place a tenant?",
        a: "It depends on the unit, location, and pricing, but marketing starts within days of onboarding and we keep you updated on enquiry volume and viewing feedback throughout.",
      },
      {
        q: "Do I get to approve the tenant before signing?",
        a: "Yes. We shortlist and screen, but the final decision on who moves into your property is always yours.",
      },
    ],
  },
  {
    slug: "rent-collection",
    title: "Rent Collection",
    icon: Banknote,
    tagline: "Rent collected on time, every time — without you chasing anyone.",
    summary:
      "Monthly collection via mobile money and bank transfer, with automated tenant reminders.",
    overview: [
      "Chasing rent is the part of self-management most landlords dread. We remove it entirely. Tenants pay through mobile money or bank transfer on a fixed schedule, with automated reminders sent ahead of the due date so payment becomes routine rather than a monthly negotiation.",
      "All rent is received into a dedicated client account, kept separate from Platinum Rentals' own operating funds, and remitted to you on the agreed schedule alongside a clear statement of what was collected.",
    ],
    included: [
      "Mobile money and bank transfer collection channels",
      "Automated pre-due-date payment reminders to tenants",
      "Rent held in a ring-fenced client account",
      "Scheduled remittance to the landlord's account",
      "Immediate flagging of any missed or partial payment",
    ],
    idealFor: [
      "Landlords tired of manually following up with tenants every month",
      "Owners who want funds handled through a transparent, separate account",
      "Diaspora landlords who need reliable remittance schedules",
    ],
    faqs: [
      {
        q: "What happens if a tenant misses a payment?",
        a: "It's flagged immediately and moves into our structured arrears follow-up process — see Arrears & Dispute Support for how that works.",
      },
      {
        q: "How quickly is rent remitted to me after collection?",
        a: "On the schedule agreed during onboarding, along with an itemised statement so you can see exactly what was collected and what was deducted.",
      },
    ],
  },
  {
    slug: "owner-reporting",
    title: "Owner Reporting",
    icon: FileBarChart,
    tagline: "Know exactly what's happening with your property, every month.",
    summary:
      "Itemised monthly statements and remittance, with annual summaries for tax purposes.",
    overview: [
      "You shouldn't have to ask what happened with your rent this month. Every landlord receives an itemised statement showing rent collected, any maintenance or vendor costs deducted, and the net amount remitted — sent on the same schedule every time.",
      "At year end, we prepare an annual summary covering the full period, giving you a clean record for tax filing or your own bookkeeping, without having to reconstruct twelve months of activity yourself.",
    ],
    included: [
      "Itemised monthly statement of rent collected and costs deducted",
      "Digital delivery, accessible remotely",
      "Annual summary statement for tax and record-keeping purposes",
      "Notice of any arrears, vacancies, or maintenance issues affecting the month",
    ],
    idealFor: [
      "Diaspora landlords who need remote-friendly, digital reporting",
      "Owners with multiple units who need a consolidated view",
      "Anyone who has previously managed a property through informal, undocumented arrangements",
    ],
    faqs: [
      {
        q: "How do I receive my statements?",
        a: "Digitally, on the schedule agreed at onboarding, so you can review activity wherever you're based.",
      },
      {
        q: "Can statements support a mortgage or visa financial application?",
        a: "Many landlords do use our statements for exactly that. Speak to us about the specific format an institution requires and we'll do our best to accommodate it.",
      },
    ],
  },
  {
    slug: "property-inspections",
    title: "Property Inspections",
    icon: ClipboardCheck,
    tagline: "A documented condition record, from move-in to move-out.",
    summary:
      "Move-in, quarterly, and move-out inspections with photographic condition reports.",
    overview: [
      "Disputes over property condition almost always come down to one thing: no record. We inspect every unit at move-in, on a quarterly basis during the tenancy, and again at move-out, with photographs attached to each report.",
      "This protects both sides — the landlord has evidence of the property's condition and the tenant has a fair, documented basis for the return of their deposit.",
    ],
    included: [
      "Move-in condition inspection with photographic report",
      "Quarterly inspections during the tenancy",
      "Move-out inspection compared against move-in condition",
      "Early flagging of maintenance issues found during inspection",
    ],
    idealFor: [
      "Landlords who've had disputes over deposit deductions in the past",
      "Owners who want early warning of maintenance issues before they escalate",
      "Diaspora landlords who can't inspect the property themselves",
    ],
    faqs: [
      {
        q: "Do I receive a copy of every inspection report?",
        a: "Yes, each report and its photographs are shared with you as part of your ongoing owner reporting.",
      },
      {
        q: "What happens if an inspection finds a problem?",
        a: "It's raised with you and, where it's urgent, routed straight into maintenance coordination so it doesn't sit unresolved.",
      },
    ],
  },
  {
    slug: "maintenance-coordination",
    title: "Maintenance Coordination",
    icon: Wrench,
    tagline: "One call for the tenant, one accountable process for the landlord.",
    summary:
      "A vetted network of plumbers, electricians, and contractors, with cost oversight.",
    overview: [
      "Maintenance is where informal management usually breaks down — no accountability on cost, no urgency on timeline. We coordinate every repair through a pre-vetted network of tradespeople, with cost oversight before work is approved.",
      "Tenants report an issue to us, not to you, and we manage it end to end: diagnosis, quote, approval, and confirmation the work was done properly.",
    ],
    included: [
      "Single point of contact for tenants to report maintenance issues",
      "Vetted network of plumbers, electricians, and general contractors",
      "Cost quotes reviewed before work is approved",
      "Follow-up confirmation that completed work meets standard",
    ],
    idealFor: [
      "Landlords who don't have their own trusted contractor network",
      "Owners who want maintenance costs controlled and itemised, not just billed",
      "Diaspora landlords who need issues resolved without needing to be contacted directly",
    ],
    faqs: [
      {
        q: "Who approves the cost of a repair?",
        a: "For anything beyond routine, low-cost fixes, we confirm with you before work proceeds — you're never surprised by a maintenance bill.",
      },
      {
        q: "Can I use my own contractor instead of the vetted network?",
        a: "This can be arranged and discussed during onboarding if you have an existing relationship you'd like to keep.",
      },
    ],
  },
  {
    slug: "lease-administration",
    title: "Lease Administration",
    icon: ScrollText,
    tagline: "Agreements that are properly drafted and properly enforced.",
    summary:
      "Drafting, renewal, and compliance of tenancy agreements under Ugandan law.",
    overview: [
      "A verbal agreement or a copied template found online leaves a landlord exposed the moment something goes wrong. We draft standard tenancy agreements compliant with Ugandan law, manage renewals before they lapse, and keep every signed copy on file.",
      "This isn't just paperwork — it's the document that protects your position if a dispute ever needs to go further than a conversation.",
    ],
    included: [
      "Standard tenancy agreement drafting for each new tenant",
      "Lease renewal management ahead of expiry",
      "Compliance review against current Ugandan tenancy law",
      "Secure digital record-keeping of all signed agreements",
    ],
    idealFor: [
      "Landlords currently operating without a written lease",
      "Owners who want renewals tracked instead of forgotten",
      "Anyone who's had to rely on a verbal understanding with a tenant before",
    ],
    faqs: [
      {
        q: "Will I receive a copy of every signed lease?",
        a: "Yes, every agreement is shared with you and stored securely for future reference.",
      },
      {
        q: "What happens if a tenant wants to renegotiate terms at renewal?",
        a: "We handle that conversation on your behalf, within parameters you set, and confirm any change with you before it's signed.",
      },
    ],
  },
  {
    slug: "arrears-dispute-support",
    title: "Arrears & Dispute Support",
    icon: Scale,
    tagline: "A structured, lawful path when rent falls behind.",
    summary:
      "Structured follow-up on late rent, and lawful support through the eviction process where needed.",
    overview: [
      "Late rent needs a process, not a personal confrontation between landlord and tenant. When a payment is missed, we begin structured follow-up immediately — reminders, then formal notice — so the situation is addressed early rather than left to accumulate.",
      "Where a resolution can't be reached, we support landlords through the lawful eviction process, keeping every step documented and compliant with Ugandan tenancy regulation.",
    ],
    included: [
      "Immediate flagging and follow-up on missed rent",
      "Formal written notice where informal reminders don't resolve it",
      "Guidance through the lawful eviction process where necessary",
      "Full documentation of the arrears timeline for your records",
    ],
    idealFor: [
      "Landlords who've had to manage a difficult non-paying tenant alone before",
      "Owners who want disputes handled at arm's length, professionally",
      "Diaspora landlords who cannot be present to manage confrontation locally",
    ],
    faqs: [
      {
        q: "At what point does a missed payment become a formal issue?",
        a: "Follow-up begins as soon as a payment is missed. Escalation to formal notice happens if informal reminders don't resolve it within an agreed window.",
      },
      {
        q: "Will you keep me informed throughout the process?",
        a: "Yes — you're updated at every stage and consulted before any formal or legal step is taken.",
      },
    ],
  },
  {
    slug: "short-let-management",
    title: "Short-Let Management",
    icon: Home,
    tagline: "Optional furnished-unit management for owners who want it.",
    summary:
      "Guest screening, turnover cleaning, and listing management for furnished units.",
    overview: [
      "For furnished units suited to shorter stays, we offer optional short-let management alongside standard long-term letting: guest screening, listing management, and turnover cleaning between stays.",
      "This is available as an add-on for owners who want to keep a furnished unit flexible, without taking on the day-to-day guest coordination themselves.",
    ],
    included: [
      "Guest enquiry handling and screening",
      "Listing management across short-let platforms",
      "Turnover cleaning between guest stays",
      "Coordination of check-in and check-out",
    ],
    idealFor: [
      "Owners of fully furnished units in high-demand neighbourhoods",
      "Landlords who want the flexibility of short-let without managing it personally",
      "Diaspora owners keeping a unit available for their own occasional use",
    ],
    faqs: [
      {
        q: "Is short-let management available for every property?",
        a: "It's best suited to fully furnished units in the neighbourhoods we currently serve. We'll advise during your property review whether it's a good fit.",
      },
      {
        q: "Can a unit switch between long-term and short-let?",
        a: "Yes, this is something we can plan for during onboarding depending on your goals for the property.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
