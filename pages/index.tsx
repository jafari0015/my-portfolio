import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { client } from "@/libs/sanity";
import Layout from "@/components/Layout/Layout";
import TitleSection from "@/components/UI/TitleSection";
import GoToBlogButton from "@/components/Blog/GoToBlogButton";
import ProfileCard from "@/components/Hero/ProfileCard";
import Home from "@/components/Hero/Home";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const About = dynamic(() => import("@/components/About/About"), { ssr: false });
const Work = dynamic(() => import("@/components/Work/Work"), { ssr: false });
const Blog = dynamic(() => import("@/components/Blog/Blog"), { ssr: false });
const ContactSection = dynamic(
  () => import("@/components/Contact/ContactSection"),
  { ssr: false }
);

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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 200 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const HomePage: NextPage<HomePageProps> = ({
  socialLinks,
  works,
  blogs,
  iconsPlatform,
}) => {
  return (
    <Layout>
      <motion.main
        id="home"
        className="pt-4 sm:pt-28 2xl:px-20"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="w-full p-6 sm:p-12 block sm:flex items-center md:gap-10 xl:gap-6 justify-around clip-path dark:bg-[#121212] bg-[#d2d3db]">
          <ProfileCard socialLinks={socialLinks} />
          <Home />
        </div>
        <div className="inverted-border dark:bg-[#121212] bg-[#d2d3db] hidden xl:flex">
          <div className="bottom-border hidden xl:flex dark:bg-[#121212] bg-[#d2d3db]"></div>
        </div>
      </motion.main>

      <main className="2xl:px-20">
        <section className="md:px-8 px-4 xl:px-12 py-20 mt-10 rest-para dark:bg-[#121212] bg-[#d2d3db]">
          <div className="inverted-top dark:bg-[#121212] bg-[#d2d3db] hidden xl:flex">
            <div className="top-border dark:bg-[#121212] bg-[#d2d3db] hidden xl:flex"></div>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TitleSection title="About" text="Me" />
            <About />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TitleSection title="My" text="Work" />
            <Work works={works} />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TitleSection title="Latest" text="Blog" />
            <Blog blogs={blogs} />
            <GoToBlogButton />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TitleSection title="Get in" text="Touch" />
            <ContactSection iconsPlatform={iconsPlatform} />
          </motion.div>
        </section>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const socialLinks = await client.fetch<SocialLink[]>(
      `*[_type == "socialLink"]`
    );
    const works = await client.fetch<
      WorkType[]
    >(`*[_type == "work"] | order(_createdAt desc){
      title,
      description,
      "imageUrl": image.asset->url,
      github,
      slug,
      date,
      category,
      techStack
    }`);
    const blogs = await client.fetch<
      BlogType[]
    >(`*[_type == "blog"] | order(date desc){
      _id,
      title,
      "text": description,
      techs,
      slug,
      date
    }`);
    const iconsPlatform = await client.fetch<
      IconType[]
    >(`*[_type == "iconPlatform"]{
      title,
      text,
      icon,
      link,
      target
    }`);

    return {
      props: { socialLinks, works, blogs, iconsPlatform },
      revalidate: 60,
    };
  } catch (err: unknown) {
    console.error(
      "Sanity fetch error:",
      err instanceof Error ? err.message : err
    );
    return {
      props: { socialLinks: [], works: [], blogs: [], iconsPlatform: [] },
    };
  }
};

export default HomePage;
