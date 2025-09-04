import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { client } from "@/libs/sanity";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CiCalendarDate } from "react-icons/ci";
import { TbCategoryPlus } from "react-icons/tb";
import { SlSocialGithub } from "react-icons/sl";
import { RxVercelLogo } from "react-icons/rx";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import ScrollProgress from "@/components/UI/ScrollProgress";

const Navbar = dynamic(() => import("@/components/Navigation/NavPages"), {
  ssr: false,
});
const ToggleButton = dynamic(
  () => import("@/components/Dark-Light/ToggleButton"),
  { ssr: false }
);
const Background = dynamic(
  () => import("../../components/Background/Background"),
  { ssr: false }
);
const Footer = dynamic(() => import("../../components/footer/Footer"), {
  ssr: false,
});

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

const WorkDetailPage: React.FC<WorkProps> = ({ work }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;
  if (!work) return <div>Work not found</div>;

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 200 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      <ScrollProgress />
      <Background />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  sm:py-10">
        <div className="flex flex-col mt-8 sm:flex-row items-center justify-between gap-4 sm:gap-5 mb-8">
          <Navbar />
          <span className="hidden sm:flex">
            <ToggleButton />
          </span>
        </div>

        <div className="bg-white dark:bg-[#121212] shadow-lg  rounded-2xl px-4 sm:p-6 md:p-10 lg:px-16 transition-colors duration-500">
          <motion.div
            className="text-center pt-6 pb-10 sm:mt-0"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h1 className="text-2xl sm:text-4xl font-bold text-center mt-10 mb-1 dark:text-stone-50 text-stone-900">
              {work.title}
            </h1>
            <p className="dark:text-[#c8f31d] text-green-700 tracking-[0.3rem]">
              By Admain
            </p>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Image
              src={work.imageUrl}
              alt={work.title}
              width={800}
              height={500}
              className="w-full h-48 sm:h-64 md:h-[400px]  lg:h-[500px] object-cover rounded-xl mt-4 mb-20 shadow-md"
              priority
            />
          </motion.div>

          <div className="flex flex-col xl:flex-row gap-6 lg:gap-12">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="text-gray-700 dark:text-stone-200 whitespace-pre-line mb-6 lg:mb-0 flex-1">
                {work.description}
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 gap-4 mb-6 lg:mb-0 dark:text-stone-100 shadow-xl backImage rounded-xl 
                          lightBackImage p-4 sm:p-6 lg:p-8 w-full  text-stone-950"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <CiCalendarDate className="text-lg sm:text-xl" />
                <h1 className="font-semibold text-base sm:text-lg">Date :</h1>
                <p className="text-sm dark:hover:text-[#c8f31d] hover:text-green-700">
                  {work.date}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <TbCategoryPlus className="text-lg sm:text-xl" />
                <h1 className="text-sm sm:text-base font-semibold">
                  Category :
                </h1>
                <p className="text-sm dark:hover:text-[#c8f31d] hover:text-green-700">
                  {work.category}
                </p>
              </div>

              {work.github && (
                <div className="flex items-center gap-2">
                  <SlSocialGithub className="text-base sm:text-lg" />
                  <h1 className="font-semibold text-sm sm:text-base">
                    Github :
                  </h1>
                  <a
                    href={work.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm dark:hover:text-[#c8f31d] hover:text-green-700 break-all"
                  >
                    www.github.com
                  </a>
                </div>
              )}

              {work.link && (
                <div className="flex items-center gap-2">
                  <RxVercelLogo className="text-base sm:text-lg" />
                  <h1 className="font-semibold text-sm sm:text-base">
                    Vercel :
                  </h1>
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm dark:hover:text-[#c8f31d] hover:text-green-700 break-all"
                  >
                    www.vercel.com
                  </a>
                </div>
              )}

              <h1 className="font-semibold text-sm sm:text-base">Techs :</h1>
              <div className="flex gap-2">
                {(work.techStack ?? []).map((tech, idx) => (
                  <span
                    key={idx}
                    className="flex items-center justify-center px-2 h-10  border-[1px] border-stone-700 bg-transparent dark:text-stone-100 text-gray-800 
                    rounded-lg  
                               text-xs sm:text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WorkDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const works: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "work"]{ slug }`
  );
  const paths = works.map((w) => ({ params: { slug: w.slug.current } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const work: Work | null = await client.fetch(
    `*[_type == "work" && slug.current == $slug][0]{
      title,
      description,
      "imageUrl": image.asset->url,
      link,
      github,
      category,
      date,
      techStack
    }`,
    { slug }
  );

  return { props: { work }, revalidate: 60 };
};
