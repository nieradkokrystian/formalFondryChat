import { memo } from "react";

const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

const getColorFromName = (name) => {
  // const colors = [
  //   "#f44336",
  //   "#e91e63",
  //   "#9c27b0",
  //   "#673ab7",
  //   "#3f51b5",
  //   "#2196f3",
  //   "#03a9f4",
  //   "#00bcd4",
  //   "#009688",
  //   "#4CAF50",
  //   "#8BC34A",
  //   "#CDDC39",
  //   "#FFC107",
  //   "#FF9800",
  //   "#FF5722",
  //   "#795548",
  //   "#607D8B",
  // ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

const getInitialsMemoized = memoize(getInitials);
const getColorFromNameMemoized = memoize(getColorFromName);

function UserAvatar({ name }) {
  const initials = getInitialsMemoized(name);
  const bgColor = getColorFromNameMemoized(name);

  return (
    <div className="mock-icon" style={{ backgroundColor: bgColor }}>
      {initials}
    </div>
  );
}

export default memo(UserAvatar);
