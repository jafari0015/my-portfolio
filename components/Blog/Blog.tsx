// components/Blog/Blog.tsx
import React, { useState } from 'react';
import { FaCalendar } from "react-icons/fa";
import { RxExternalLink } from "react-icons/rx";
import { CiBellOn } from "react-icons/ci";
import Link from 'next/link';

interface BlogType {
  title: string;
  text: string;
  techs?: string[];
  slug: { current: string };
  date: string;
}

interface BlogProps {
  blogs: BlogType[];
  pageSize?: number; 
}

const Blog: React.FC<BlogProps> = ({ blogs, pageSize = 6 }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(blogs.length / pageSize);

  const paginatedBlogs = blogs.slice(0, page * pageSize);

  const loadMore = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <section id='article'>
      <div className='lg:grid grid-cols-3 gap-6 mt-10'>
        {paginatedBlogs.map((blog) => (
          <div key={blog.slug.current} className='dark:text-stone-100 text-stone-900 border-[1px] md:mt-8 mt-6 border-neutral-400 dark:border-stone-700 lightBackImage backImage dark:backdrop-blur-md rounded-xl p-6'>
            <h2 className='text-[23px]'>{blog.title}</h2>
            <div>
              <span className='flex text-xs mt-2 dark:text-stone-500 text-stone-600 items-center justify-start gap-3'>
                <span className='dark:text-[#c8f31d] text-green-700'><FaCalendar /></span>
                <span>{new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month:"long", day:"numeric" })}</span>
              </span>
            </div>
            <p className='text-[16px] dark:text-slate-500 text-stone-800 mt-4 line-clamp-5'>
              {blog.text}
            </p>
            <div className='grid grid-cols-2 sm:flex text-xs mt-3 items-center justify-start gap-2'>
              {(blog.techs ?? []).map((tech, index) => (
                <span key={index} className='px-2 flex items-center gap-1 py-1 border-[1px] border-neutral-400 dark:border-stone-700 rounded-xl'>
                  <CiBellOn /> {tech}
                </span>
              ))}
            </div>
            <Link href={`/blog/${blog.slug.current}`}>
              <button className='flex font-semibold items-center justify-center gap-3 py-2 w-full group relative overflow-hidden rounded-xl border-[1px] border-neutral-300 dark:border-stone-600 mt-4 dark:hover:bg-stone-800 transition-all duration-700'>
                <span className='relative z-10 flex items-center gap-3 justify-center'>
                  Read the full article <span className='dark:text-[#c8f31d] text-green-800'><RxExternalLink /></span>
                </span>
                <span className='absolute inset-0 bg-neutral-200 dark:bg-stone-700 duration-700 transition-transform 
                               ease-out group-hover:translate-x-0 -translate-x-full'></span>
              </button>
            </Link>
          </div>
        ))}
      </div>

      
      {page < totalPages && (
        <div className='flex justify-center mt-6'>
          <button
            onClick={loadMore}
            className='px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition'
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}

export default Blog;
