import { SignIn } from "@clerk/nextjs";
import Navbar from "~/components/Navbar";

const SignInPage = () => {
  return (
    <div>
      <Navbar>
        <div className="grid place-items-center">
          <SignIn />
        </div>
      </Navbar>
    </div>
  );
};
export default SignInPage;
