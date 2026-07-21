export interface Founder {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  social: {
    instagram: string;
    whatsapp: string;
    tiktok: string;
  };
}

export const FOUNDERS: Founder[] = [
  {
    id: 1,
    name: "Founder 1",
    role: "CEO & Co-Founder",
    image: "/images/founder-1.png",
    description:
      "With over a decade of experience in property management and real estate development, Founder 1 leads the company's strategic vision and operations.",
    social: {
      instagram: "https://instagram.com/",
      whatsapp: "https://wa.me/256785175160",
      tiktok: "https://tiktok.com/@",
    },
  },
  {
    id: 2,
    name: "Founder 2",
    role: "Operations Director & Co-Founder",
    image: "/images/founder-2.png",
    description:
      "Founder 2 brings deep expertise in tenant relations, property maintenance, and day-to-day portfolio management across Greater Kampala.",
    social: {
      instagram: "https://instagram.com/",
      whatsapp: "https://wa.me/256785175160",
      tiktok: "https://tiktok.com/@",
    },
  },
  {
    id: 3,
    name: "Founder 3",
    role: "Finance & Administration Lead",
    image: "/images/founder-3.png",
    description:
      "A finance professional with a background in accounting and property valuation, Founder 3 oversees rent collection, owner reporting, and compliance.",
    social: {
      instagram: "https://instagram.com/",
      whatsapp: "https://wa.me/256785175160",
      tiktok: "https://tiktok.com/@",
    },
  },
  {
    id: 4,
    name: "Founder 4",
    role: "Business Development Manager",
    image: "/images/founder-4.png",
    description:
      "Founder 4 drives growth and landlord acquisition, building relationships with property owners across the Greater Kampala Metropolitan Area.",
    social: {
      instagram: "https://instagram.com/",
      whatsapp: "https://wa.me/256785175160",
      tiktok: "https://tiktok.com/@",
    },
  },
];

export function getFounder(id: number): Founder | undefined {
  return FOUNDERS.find((f) => f.id === id);
}
