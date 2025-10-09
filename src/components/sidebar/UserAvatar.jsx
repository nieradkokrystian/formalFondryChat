import { memo } from "react";

const tailwindColors = [
  "bg-stone-500",
  "bg-slate-500",
  "bg-teal-500",
  "bg-sky-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-yellow-500",
];

const getColorFromName = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % tailwindColors.length;
  return tailwindColors[index];
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

function UserAvatar({ name }) {
  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  return (
    <div
      className={`w-10 h-10 rounded-md flex justify-center items-center text-white text-lg font-bold select-none ${bgColor}`}
    >
      {initials}
    </div>
  );
}

export default memo(UserAvatar);
