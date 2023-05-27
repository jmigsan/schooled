import { SignUp } from "@clerk/nextjs";
import Navbar from "~/components/Navbar";

export default function Page() {
  return (
    <div>
      <Navbar>
        <div className="grid place-items-center">
          <SignUp />
        </div>
      </Navbar>
    </div>
  );
}
