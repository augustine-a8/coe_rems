import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./iconButton.style.css";

type IconButtonProps = {
  btnTitle: string;
  icon: IconDefinition;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  iconSize?: SizeProp | undefined;
  backgroundColor?: string;
  color?: string;
};

export default function IconButton({
  btnTitle,
  icon,
  onClick,
  iconSize,
  backgroundColor,
  color,
}: IconButtonProps) {
  return (
    <a
      href="#"
      className="icon-btn__container"
      onClick={onClick}
      style={{ backgroundColor }}
    >
      <span className="icon-btn__icon-container">
        <FontAwesomeIcon
          icon={icon}
          className="icon-btn__icon"
          size={iconSize}
          color={color}
        />
      </span>
      <span className="icon-btn__title-container">
        <p className="icon-btn__title" style={{ color }}>
          {btnTitle}
        </p>
      </span>
    </a>
  );
}
