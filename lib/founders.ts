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
    name: "Hussein W",
    role: "CEO & Co-Founder",
    image: "/images/founder-1.png",
    description:
      "With over a decade of experience in property management and real estate development, Hussein leads the company's strategic vision and operations.",
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
