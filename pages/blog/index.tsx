import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/libs/sanity";
import Background from "@/components/Background/Background";
import Navbar from "@/components/Navigation/NavPages";
import ToggleButton from "@/components/Dark-Light/ToggleButton";
import Footer from "@/components/footer/Footer";
import { useState } from "react";


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

const PAGE_SIZE = 6; 

export default function BlogPage({ blogs }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(blogs.length / PAGE_SIZE);

  const paginatedBlogs = blogs.slice(0, page * PAGE_SIZE);

  const loadMore = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <>
      <Background />
      <div className="flex items-center justify-between gap-5 mt-5">
        <Navbar />
       <span className="hidden sm:flex"> <ToggleButton /></span>
      </div>

      <div className="px-6 sm:px-10 py-10 bg-gray-100 dark:bg-[#121212] min-h-screen mt-5 rounded-2xl transition-colors duration-500">
        <div className="text-center mb-12">
          <h3 className="text-2xl dark:text-stone-100 tracking-widest text-stone-950">OUR BLOG</h3>
          <h1 className="dark:text-stone-100 text-stone-950 text-2xl sm:text-4xl tracking-widest ">
            <span className="dark:text-[#c8f31d] text-green-700">Articles</span> & Resources
          </h1>
          <div className="flex justify-center mt-10 relative">
            <img
              src="/profile_image/blog.jpg"
              alt="Welcome to your blog"
              className="rounded-md sm:w-full sm:px-24 relative"
            />
            <div className="absolute dark:text-stone-100 text-stone-950 bg-neutral-300 dark:bg-[#1a1a1a] sm:top-[90%] top-[85%] 
                            p-8 w-full rounded-md sm:max-w-2xl max-w-72">
              <h1 className="sm:text-2xl text-xl font-semibold">Welcome to My Blog</h1> <br />
              <p className="text-sm sm:text-base">
                Here, I share insights, tutorials, and experiences from my journey in tech and beyond. Grab a coffee and enjoy the read!
              </p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="dark:text-stone-50 text-stone-950 text-2xl mt-48 sm:mt-40">All POSTS</h1>
        </div>
        <div className="mt-10 dark:bg-[#c8f31d] bg-green-800 text-transparent h-[1px] w-full" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="group lightBackImage backImage rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-stone-700 mt-20"
            >
              {blog.mainImage?.asset?.url && (
                <div className="overflow-hidden relative h-48 w-full">
                  <Image
                    src={blog.mainImage.asset.url}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="transform group-hover:scale-105 transition duration-500"
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                  />
                </div>
              )}

              <div className="p-6">
                <Link href={`/blog/${blog.slug.current}`}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:dark:text-[#c8f31d] group-hover:text-green-700 transition-colors">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-3">
                  {blog.text}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.techs?.map((tech, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 rounded-full border border-gray-300 dark:border-stone-700 bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
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
      </div>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "blog"] | order(date desc){
    _id,
    title,
    "text": description,
    techs,
    slug,
    date,
    mainImage{
      asset->{url}
    }
  }`;

  const blogs = await client.fetch(query);

  return {
    props: { blogs },
    revalidate: 60, // ISR
  };
};
