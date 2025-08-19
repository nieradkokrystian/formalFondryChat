import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Search = () => {
  return (
    <div className="search-container mb-4">
      <div className="search-input flex items-center bg-white border border-gray-300 rounded-md p-2 ">
        <input
          type="text"
          placeholder="Search documentation..."
          className="w-full  p-2 border border-gray-300 rounded"
        />
        <MagnifyingGlassIcon />
      </div>
    </div>
  );
};

export default Search;
