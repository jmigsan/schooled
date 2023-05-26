import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Navbar from "~/components/Navbar";
import Feed from "~/components/Feed";
import CreatePost from "~/components/CreatePost";
import LoadingPage from "~/components/LoadingPage";
import AddPostButton from "~/components/AddPostButton";

const Home: NextPage = () => {
  return (
    <>
      <Navbar>
        <div>
          <Feed />
          <AddPostButton />
        </div>
      </Navbar>
    </>
  );
};

export default Home;
