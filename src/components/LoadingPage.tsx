import Sidebar from "./Sidebar";
import LoadingSpinner from "./LoadingSpinner";

const LoadingPage = () => {
  return (
    <Sidebar>
      <div className="grid place-items-center">
        <LoadingSpinner />
      </div>
    </Sidebar>
  );
};
export default LoadingPage;
