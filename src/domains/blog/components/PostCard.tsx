import { format } from "date-fns";
import Link from "next/link";

const titleToSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

type PostCardProps = {
  title: string;
  coverUrl: string;
  description?: string;
  publishedAt?: string;
  id: string;
};
const PostCard = ({ description, title, id, publishedAt }: PostCardProps) => (
  <article className="border-t-[1px] pt-8 pb-2 sm:pb-4 grid sm:grid-cols-[150px,auto] gap-4 sm:gap-8 border-gray-700">
    {publishedAt ? (
      <time className="text-gray-500 dark:text-gray-400 text-sm">
        {format(new Date(`${publishedAt} EDT`), "MMMM dd, yyyy")}
      </time>
    ) : null}
    <div className="content grid gap-2">
      <Link href={`/blog/${titleToSlug(title)}/${id}`}>
        <h3 className="font-medium text-xl text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </Link>
      {description ? (
        <p className="text-gray-510 dark:text-gray-400">{description}</p>
      ) : null}
      <Link
        href={`/blog/${titleToSlug(title)}/${id}`}
        className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
      >
        Read more --{`>`}
      </Link>
    </div>
  </article>
);

export { PostCard };
