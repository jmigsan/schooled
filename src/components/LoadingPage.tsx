import Navbar from "./Navbar";
import LoadingSpinner from "./LoadingSpinner";

const LoadingPage = () => {
  return (
    <Navbar>
      <div className="grid place-items-center">
        <LoadingSpinner />
      </div>
    </Navbar>
  );
};
export default LoadingPage;
