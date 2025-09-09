interface SocialLink {
  _id: string;
  icon: string;
  url: string;
}
interface IconType {
  title: string;
  icon: string;
  text: string;
  target: string;
  link: string;
}

interface WorkType {
  title: string;
  description: string;
  imageUrl: string;
  github: string;
  slug: { current: string };
  techStack?: string[];
}

interface BlogType {
  _id: string;
  title: string;
  text: string;
  techs?: string[];
  slug: { current: string };
  date: string;
}

interface HomePageProps {
  socialLinks: SocialLink[];
  works: WorkType[];
  blogs: BlogType[];
  iconsPlatform: IconType[];
}

type Work = {
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  github?: string;
  techStack?: string[];
  date: string;
  category: string;
};
type WorkProps = {
  work: Work | null;
};

interface Blog {
  _id: string;
  title: string;
  text: string;
  techs: string[];
  slug: { current: string };
  date: string;
  mainImage?: { asset: { url: string } };
}

interface Props {
  blogs: Blog[];
}
