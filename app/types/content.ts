export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface InterestItem {
  icon: string;
  label: string;
  desc: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  description: string;
  skills?: string[];
  current?: boolean;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  field: string;
  icon: string;
  image: string;
}

export interface HomeProjectItem {
  title: string;
  description: string;
  tags: string[];
  icon: string;
}

export type PortfolioProjectCategory = 'Web' | 'Infrastructure';

export interface PortfolioProjectItem {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  category: PortfolioProjectCategory;
  link: string;
  image: string;
}
