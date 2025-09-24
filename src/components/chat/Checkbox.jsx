const Checkbox = ({ isChecked, setIsChecked }) => {
  return (
    <div className="fixed flex-row  flex top-30 right-50 h-10 items-center rounded-full px-3 justify-center border-1 border-gray-400 text-gray-500 bg-white gap-1  w-fit">
      <h1>Last Hundred Messages?</h1>
      <input
        type="checkbox"
        name=""
        className="w-7 text-gray-500 aspect-square"
        id="checkTrimmedArray"
        checked={isChecked ? true : false}
        onChange={() => setIsChecked((prev) => !prev)}
      />
    </div>
  );
};

export default Checkbox;
