import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { client } from "@/libs/sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import Background from "@/components/Background/Background";
import Navbar from "@/components/Navigation/NavPages";
import ToggleButton from "@/components/Dark-Light/ToggleButton";
import Footer from "@/components/footer/Footer";
import ImageUrlBuilder from "@sanity/image-url";

const builder = ImageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default function BlogDetail({ blog }: { blog: any }) {
  if (!blog)
    return (
      <p className="min-h-screen flex items-center justify-center text-3xl sm:text-5xl md:text-6xl text-red-700 text-center px-4">
        Not found
      </p>
    );

  const components: PortableTextComponents = {
    types: {
      image: ({ value }: any) => (
        <div className="my-6 flex justify-center">
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt || "Blog image"}
            width={900}
            height={500}
            className="rounded-xl shadow-lg object-cover w-full max-h-[500px]"
          />
        </div>
      ),
      code: ({ value }) => (
        <div className="my-6 overflow-hidden rounded-xl shadow-lg border border-gray-700/20">
          {value.filename && (
            <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono">
              {value.filename}
            </div>
          )}
          <SyntaxHighlighter
            language={value.language || "javascript"}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.85rem",
              overflowX: "auto",
            }}
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      ),
    },
    block: {
      h2: ({ children }) => (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-200">
          {children}
        </h2>
      ),
      normal: ({ children }) => (
        <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 dark:text-gray-300 mb-4">
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-inside space-y-2 my-4 text-gray-700 dark:text-gray-300">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-inside space-y-2 my-4 text-gray-700 dark:text-gray-300">
          {children}
        </ol>
      ),
    },
  };

  return (
    <>
      <Background />
      <div className="flex items-center justify-between gap-4 mb-4 mt-6 px-4 sm:px-6 lg:px-12">
        <Navbar />
        <span className="hidden sm:flex">
          <ToggleButton />
        </span>
      </div>

      <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 py-10 md:py-12 dark:bg-[#121212] bg-[#e3e2e2] rounded-xl max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {blog.techs?.map((tech: any, idx: any) => (
              <span
                key={idx}
                className="text-xs sm:text-sm px-3 py-1 rounded-full border border-gray-400 dark:border-stone-700 bg-transparent dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl text-center mt-6 font-bold tracking-wide leading-snug mb-4 text-gray-900 dark:text-white">
            {blog.title}
          </h1>

          <p className="text-green-800 dark:text-[#c8f31d] tracking-widest text-sm sm:text-base mb-8 mt-6 text-center">
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <span className="block sm:inline sm:ml-2 tracking-widest font-semibold dark:text-stone-200 text-stone-950 text-base sm:text-lg">
              By Admin
            </span>
          </p>
        </div>

        {blog.mainImage?.asset?.url && (
          <div className="mb-8">
            <Image
              src={blog.mainImage.asset.url}
              alt={blog.title}
              width={1200}
              height={700}
              className="rounded-2xl shadow-md object-cover w-full max-h-[500px]"
            />
          </div>
        )}

        <article className="prose prose-base sm:prose-lg dark:prose-invert max-w-none">
          <PortableText value={blog.content} components={components} />
        </article>
      </div>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "blog"]{ slug }`;
  const blogs = await client.fetch(query);

  const paths = blogs.map((b: any) => ({
    params: { slug: b.slug.current },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    date,
    content,
    techs,
    mainImage{ asset->{url} }
  }`;

  const blog = await client.fetch(query, { slug: params?.slug });

  return {
    props: { blog },
    revalidate: 60,
  };
};
