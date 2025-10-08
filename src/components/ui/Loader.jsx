import { BeatLoader, PropagateLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <BeatLoader
        color="var(--violet-10)"
        cssOverride={{}}
        margin={3}
        size={15}
        speedMultiplier={1}
      />
    </div>
  );
};

export const LlmLoader = () => {
  return <PropagateLoader color="#7c3aed" />;
};
