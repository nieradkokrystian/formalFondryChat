export const logsBgColor = (code) => {
  if (code < 0 || code >= 100 || typeof code !== "number") {
    return "bg-gray-100";
  }

  const colors = [
    "bg-green-100", // 0-9
    "bg-yellow-100", // 10-19
    "bg-red-100", // 20-29
    "bg-blue-100", // 30-39
    "bg-violet-100", // 40-49
    "bg-pink-100", // 50-59
    "bg-orange-100", // 60-69
    "bg-cyan-100", // 70-79
    "bg-lime-100", // 80-89
    "bg-amber-100", // 90-99
  ];

  const index = Math.floor(code / 10);
  return colors[index] || "bg-gray-100";
};
