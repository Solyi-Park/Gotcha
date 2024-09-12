import SearchIcon from "./icons/SearchIcon";

export default function SearchBar() {
  return (
    <div className="flex justify-center items-center p-2 rounded-3xl transition-all duration-500 w-10 sm:w-[320px]  sm:border">
      <button className="text-xl ">
        <SearchIcon size="medium" />
      </button>
      <input
        type="text"
        className="outline-none w-full hidden sm:block md:ml-2"
      />
    </div>
  );
}
