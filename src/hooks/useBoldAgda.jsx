export const boldAgda = (text) => {
  const parts = text.split(/(```(?:agda)?\n[\s\S]*?\n```)/g);

  return parts.map((part, i) => {
    const match = part.match(/(```(?:agda)?\n)([\s\S]*?)(\n```)/);
    if (match) {
      const [, startFence, content, endFence] = match;
      return (
        <span key={i}>
          {startFence}
          <strong>{content}</strong>
          {endFence}
        </span>
      );
    }
    return part;
  });
};
