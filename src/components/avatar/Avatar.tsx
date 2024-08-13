import "./avatar.style.css";

type AvatarProps = {
  name?: string;
  imgSrc?: string;
};

export default function Avatar({ name, imgSrc }: AvatarProps) {
  return (
    <div className="avatar__container">
      {name ? (
        <p className="avatar__text">
          {name.split(" ").map((name) => name[0].toUpperCase())}
        </p>
      ) : imgSrc ? (
        <img src={imgSrc} alt="avatar image" className="avatar__image" />
      ) : undefined}
    </div>
  );
}
