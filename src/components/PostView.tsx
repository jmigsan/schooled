import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { RouterOutputs, api } from "~/utils/api";

type PostWithAuthor = RouterOutputs["posts"]["getAll"][number];
dayjs.extend(relativeTime);

const PostView = (props: PostWithAuthor) => {
  const { author, post } = props;

  return (
    <div className="rounded-2xl bg-red-400 p-4 text-white">
      <div className="flex items-center gap-3 ">
        <Link href={`/user/${author.id}`}>
          <img
            src={author.profileImageUrl}
            alt={`Profile pic of ${author.username}`}
            className="w-10 rounded-full"
          />
        </Link>
        <Link href={`/user/${author.id}`}>
          <p>
            {author.username} - {dayjs(post.createdAt).fromNow()}
          </p>
        </Link>
      </div>
      <p>{post.content}</p>
    </div>
  );
};

export default PostView;
