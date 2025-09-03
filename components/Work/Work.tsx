// components/Work/Work.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";

const SpotLightCard = dynamic(
  () => import("@/components/Animations/SpotLightCard"),
  { ssr: false }
);

interface WorkType {
  title: string;
  description: string;
  imageUrl: string;
  github: string;
  slug: { current: string };
  techStack?: string[];
}

interface WorkProps {
  works: WorkType[];
  pageSize?: number;
}

const Work: React.FC<WorkProps> = ({ works, pageSize = 6 }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(works.length / pageSize);

  const paginatedWorks = works.slice(0, page * pageSize);

  const loadMore = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <section id="work" className="mt-10 px-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6">
        {paginatedWorks.map((work) => (
          <SpotLightCard key={work.slug.current} className="p-6">
            <div>
              <div className="relative w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[150px] xl:h-[180px]">
                <a href={work.github} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={work.imageUrl}
                    alt={work.title}
                    fill
                    className="rounded-2xl z-50 hover:scale-105 transition-all duration-700 dark:hover:border-[1px] 
                 dark:hover:border-stone-700 hover:border-[1px] hover:border-stone-200 object-cover"
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                  />
                </a>
              </div>

              <h2 className="dark:text-stone-100 text-stone-900 text-2xl font-semibold mt-4">
                {work.title}
              </h2>

              <p className="dark:text-stone-100 text-stone-900 text-medium mt-2 line-clamp-2">
                {work.description.split("\n").map((para, idx) => (
                  <span key={idx}>{para}</span>
                ))}
              </p>

              <div className="flex items-center relative justify-start gap-2 mt-3 dark:text-indigo-50 font-semibold">
                <div className="grid grid-cols-2 gap-1 sm:flex">
                  {(work.techStack ?? []).map((tech, idx) => (
                    <span
                      className="dark:border-stone-700 border-[1px] bg-transparent dark:hover:bg-white dark:hover:text-stone-900 hover:scale-105 transition-all duration-500 cursor-pointer bg-gray-300 hover:bg-stone-900 hover:text-stone-300 dark:text-stone-100 text-xs rounded-2xl px-2 p-1"
                      key={idx}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="absolute -right-3 -bottom-3">
                  <Link href={`/work/${work.slug.current}`}>
                    <button className="px-2 py-1 dark:bg-[#c8f31d] dark:text-stone-950 bg-green-700 text-white rounded-md">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SpotLightCard>
        ))}
      </div>
      {page < totalPages && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Work;
