import { ClipLoader } from "react-spinners";
import "./loading.style.css";

type LoadingProps = {
  isLoading: boolean;
};

export default function Loading({ isLoading = true }: LoadingProps) {
  return (
    <div className="loading-container">
      <ClipLoader color="#222426" size={50} loading={isLoading} />
    </div>
  );
}
