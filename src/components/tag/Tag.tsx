import "./tag.style.css";

type TagProps = {
  text: string;
  isSelected: boolean;
  onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
};

export default function Tag({ text, isSelected, onClick }: TagProps) {
  return (
    <span
      className="tag"
      style={{
        backgroundColor: isSelected ? "#0466c8" : "transparent",
        borderWidth: isSelected ? 0 : "1px",
      }}
      onClick={onClick}
    >
      <p style={{ color: isSelected ? "#fff" : "inherit" }}>{text}</p>
    </span>
  );
}
