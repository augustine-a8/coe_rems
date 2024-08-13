import "./error.style.css";

type ErrorProps = {
  errorMessage: string;
};

export default function Error({ errorMessage }: ErrorProps) {
  return (
    <div className="loading-container">
      <div>
        <img src="/error.png" alt="error image" />
      </div>
      <p className="error-msg">{errorMessage}</p>
    </div>
  );
}
