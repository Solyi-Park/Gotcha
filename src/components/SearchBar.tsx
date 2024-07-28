import SearchIcon from "./icons/SearchIcon";

export default function SearchBar() {
  return (
    <div className="flex justify-center items-center p-3 rounded-3xl transition-all duration-500 sm:w-10 md:w-[300px] md:border">
      <button className="text-xl ">
        <SearchIcon />
      </button>
      <input
        type="text"
        className="outline-none w-full hidden md:block md:ml-2 transition-all duration-500"
      />
    </div>
  );
}
