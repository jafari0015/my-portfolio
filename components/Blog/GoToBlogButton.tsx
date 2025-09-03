import Link from "next/link";

export default function GoToBlogButton() {
  return (
    <div className="flex items-center justify-center">
      <Link
      href="/blog" 
      className=" mt-10 px-6 py-3 bg-transparent  dark:text-white text-stone-950 border-[1px] dark:border-stone-700 
                  rounded-full font-semibold transition-all duration-300 shadow-md  text-center border-neutral-400 "
    >
     See more articles 
    </Link>
    </div>
  );
}
