import { useUser } from "@clerk/nextjs";

const CreatePost = () => {
  const { user } = useUser();

  return (
    <div>
      <input
        type="text"
        placeholder="Write here..."
        className="p-2 text-black"
      />
    </div>
  );
};
export default CreatePost;
