import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <BeatLoader
        color="#620ef3"
        cssOverride={{}}
        margin={3}
        size={15}
        speedMultiplier={1}
      />
    </div>
  );
};

export default Loader;
