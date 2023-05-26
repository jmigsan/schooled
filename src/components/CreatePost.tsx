import { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const CreatePost = () => {
  const ctx = api.useContext();
  const router = useRouter();

  const createPostMutation = api.posts.createPost.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.invalidate();
      toast.success("Post added");
      router.push("/");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(`Error: ${errorMessage[0]}`);
      } else {
        toast.error("Failed to post");
      }
    },
  });

  const [input, setInput] = useState("");

  const SubmitPost = () => {
    createPostMutation.mutate({ content: input });
  };

  return (
    <div className="flex flex-col gap-3">
      <textarea
        placeholder="Write here..."
        className="w-[35vw] rounded-xl p-2 text-black"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={createPostMutation.isLoading}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            SubmitPost();
          }
        }}
      ></textarea>

      <button
        onClick={SubmitPost}
        disabled={createPostMutation.isLoading}
        className="rounded-xl bg-blue-200 p-3"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
