import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Sidebar from "~/components/Sidebar";
import Feed from "~/components/Feed";
import CreatePost from "~/components/CreatePost";
import LoadingPage from "~/components/LoadingPage";
import AddPostButton from "~/components/AddPostButton";

const Home: NextPage = () => {
  return (
    <>
      <Sidebar>
        <div>
          {/* <CreatePost /> */}
          <Feed />
          <AddPostButton />
        </div>
      </Sidebar>
    </>
  );
};

export default Home;
