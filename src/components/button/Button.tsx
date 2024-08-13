import "./button.style.css";

type ButtonProps = {
  btnTitle: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  backgroundColor?: string;
  color?: string;
};

export default function Button({
  btnTitle,
  onClick,
  backgroundColor,
  color,
}: ButtonProps) {
  return (
    <a
      href="#"
      onClick={onClick}
      className="btn__container"
      style={{ backgroundColor }}
    >
      <p className="btn__title" style={{ color }}>
        {btnTitle}
      </p>
    </a>
  );
}
