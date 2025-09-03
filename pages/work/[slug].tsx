import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { client } from "@/libs/sanity";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CiCalendarDate } from "react-icons/ci";
import { TbCategoryPlus } from "react-icons/tb";
import { SlSocialGithub } from "react-icons/sl";
import { RxVercelLogo } from "react-icons/rx";

const Navbar = dynamic(() => import("@/components/Navigation/NavPages"), { ssr: false });
const ToggleButton = dynamic(() => import("@/components/Dark-Light/ToggleButton"), { ssr: false });
const Background = dynamic(() => import("../../components/Background/Background"), { ssr: false });
const Footer = dynamic(() => import("../../components/footer/Footer"), { ssr: false });

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

  return (
    <>
      <Background />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8  sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 mb-8">
          <Navbar />
          <span className="hidden sm:flex"> <ToggleButton /></span>
        </div>

        <div className="bg-white dark:bg-[#121212] shadow-lg mt-5 !important rounded-2xl px-4 sm:p-6 md:p-10 lg:px-16 transition-colors duration-500">
          <Image
            src={work.imageUrl}
            alt={work.title}
            width={800}
            height={500}
            className="w-full h-48 sm:h-64 md:h-[400px]  lg:h-[500px] object-cover rounded-xl mt-4 mb-6 shadow-md"
            priority
          />

          <h1 className="text-2xl sm:text-3xl font-bold dark:text-[#c8f31d] text-stone-900 mb-4">
            {work.title}
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <p className="text-gray-700 dark:text-stone-200 whitespace-pre-line mb-6 lg:mb-0 flex-1">
              {work.description}
            </p>

            <div className="grid grid-cols-1 gap-4 mb-6 lg:mb-0 dark:text-stone-100 shadow-xl backImage rounded-xl bg-stone-400 p-4 sm:p-6 lg:p-8 w-full lg:w-1/2 text-stone-950">
              <div className="flex items-center gap-2 sm:gap-3">
                <CiCalendarDate className="text-lg sm:text-xl" />
                <h1 className="font-semibold text-base sm:text-lg">Date :</h1>
                <p className="text-sm dark:hover:text-[#c8f31d] hover:text-green-700">{work.date}</p>
              </div>

              <div className="flex items-center gap-2">
                <TbCategoryPlus className="text-lg sm:text-xl" />
                <h1 className="text-sm sm:text-base font-semibold">Category :</h1>
                <p className="text-sm dark:hover:text-[#c8f31d] hover:text-green-700">{work.category}</p>
              </div>

              {work.github && (
                <div className="flex items-center gap-2">
                  <SlSocialGithub className="text-base sm:text-lg" />
                  <h1 className="font-semibold text-sm sm:text-base">Github :</h1>
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
                  <h1 className="font-semibold text-sm sm:text-base">Vercel :</h1>
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
              <div className="flex flex-wrap gap-2">
                {(work.techStack ?? []).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 border border-stone-700 bg-transparent dark:text-stone-100 text-gray-800 rounded-full text-xs sm:text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WorkDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const works: { slug: { current: string } }[] = await client.fetch(`*[_type == "work"]{ slug }`);
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
