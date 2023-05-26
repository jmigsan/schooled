import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Sidebar from "~/components/Sidebar";
import CreatePost from "~/components/CreatePost";
import LoadingPage from "~/components/LoadingPage";

const AddPost: NextPage = () => {
  const user = useUser();

  if (!user.isLoaded) {
    return <LoadingPage />;
  }

  return (
    <>
      <Sidebar>
        <div className="grid place-items-center">
          <div>
            <h1 className="pb-2 text-2xl font-bold">Add New Post 📚</h1>
            <p className="pb-5">Go educate someone!</p>
            <CreatePost />
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default AddPost;
