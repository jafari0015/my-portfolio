import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { client } from "@/libs/sanity";
import Layout from "@/pages/Layout/Layout";
import TitleSection from "@/components/UI/TitleSection";
import GoToBlogButton from "@/components/Blog/GoToBlogButton";
import ProfileCard from "@/components/Hero/ProfileCard";
import Home from "@/components/Hero/Home";
import { delay, motion } from "framer-motion";

const About = dynamic(() => import("@/components/About/About"), { ssr: false });
const Work = dynamic(() => import("@/components/Work/Work"), { ssr: false });
const Blog = dynamic(() => import("@/components/Blog/Blog"), { ssr: false });
const ContactSection = dynamic(
  () => import("@/components/Contact/ContactSection"),
  { ssr: false }
);

const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};
const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 1 } },
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
        variants={fadeInUp}
      >
        <div className="clip-path md:dark:bg-[#121212] md:bg-[#d2d3db] md:ml-0 md:mr-0 -mx-6">
          <div className="w-full p-8 sm:p-12 block sm:flex items-center  md:gap-8 xl:gap-6 justify-center ">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <ProfileCard socialLinks={socialLinks} />
            </motion.div>
            <Home />
          </div>
        </div>
        <div className="inverted-border dark:bg-[#121212] bg-[#d2d3db] hidden xl:flex">
          <div className="bottom-border hidden xl:flex dark:bg-[#121212] bg-[#d2d3db]"></div>
        </div>
      </motion.main>

      <main className="2xl:px-20">
        <section className="md:px-8 -ml-4 -mr-4 md:ml-0 md:mr-0 px-4 xl:px-12 py-20 md:mt-10 -mt-10 rest-para md:dark:bg-[#121212] md:bg-[#d2d3db]">
          <div className="inverted-top dark:bg-[#121212] bg-[#d2d3db] hidden xl:flex">
            <div className="top-border dark:bg-[#121212] bg-[#d2d3db] hidden xl:flex"></div>
          </div>
          <div>
            <TitleSection title="About" text="Me" />
            <About />
          </div>

          <div>
            <TitleSection title="My" text="Work" />
            <Work works={works} />
          </div>
          <div>
            <TitleSection title="Latest" text="Blog" />
            <Blog blogs={blogs} />
            <GoToBlogButton />
          </div>
          <div>
            <TitleSection title="Get in" text="Touch" />
            <ContactSection iconsPlatform={iconsPlatform} />
          </div>
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
