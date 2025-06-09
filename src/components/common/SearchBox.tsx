import { useRecoilValue } from "recoil";
import { productsList } from "../../store/products";
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router";
// import { HiOutlineSearch } from "react-icons/hi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
const SearchBox = () => {
  const [query, setQuery] = useState("");
  const productList = useRecoilValue(productsList);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  //모바일 검색 버튼
  //<HiOutlineSearch />
  const [searchOpen, setSearchOpen] = useState(false);
  //키보드 이벤트
  const [selectedIndex, setSelectedIndex] = useState(-1);

  //필터링 - 전체productList에서 검색한 내용과 일치하는 것만 필터링
  //filteredList

  const filteredList = useMemo(() => {
    return productList.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  //   console.log(filteredList);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // input 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      //외부클릭 + !리스트 클릭
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setQuery(""); // input value 비우기
      }
    };
    document.addEventListener("click", handleClickOutside);
    //이벤트 정리
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  //키보드 이벤트
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredList.length) return;

    //ArrowDown, ArrowUp, Enter, Escape
    const keyType = e.key;
    switch (keyType) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredList.length);

        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev === 0 ? filteredList.length - 1 : prev - 1));
        break;
      case "Enter":
        //해당페이지로 이동, setQuery('')
        navigate(`/products/${filteredList[selectedIndex].id}`);
        setSelectedIndex(-1);
        setQuery("");
        break;
      case "Escape":
        setQuery("");
        setSelectedIndex(-1);
        break;
    }
    console.log(e.key);
  };
  return (
    <>
      {/* 모바일 검색 버튼 */}
      <button className="sm:hidden" onClick={() => setSearchOpen((prev) => !prev)}>
        <MagnifyingGlassIcon className="w-6 h-6" />
      </button>

      {/* pc 검색창 */}
      <div className="relative hidden sm:block w-full" ref={ref}>
        <input
          className="px-4 py-1 rounded-md hidden sm:block light: bg-gray-300 dark:bg-gray-600"
          placeholder="search..."
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />

        {query && (
          <ul className="absolute left-0 top-full w-full z-50 overflow-y-auto bg-base-200 rounded-box shadow mt-1">
            {filteredList.length > 0 ? (
              filteredList.map((list, idx) => (
                <li
                  key={idx}
                  //selectedIndex 일때 - 리스트 style 변경
                  className={`px-4 py-2 cursor-pointer ${
                    idx === selectedIndex ? "bg-base-300 dark:bg-gray-500" : "hover:bg-base-300"
                  }`}
                  onClick={() => {
                    navigate(`/products/${list.id}`);
                    setQuery("");
                  }}
                >
                  <a>{list.title}</a>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">검색 결과가 없습니다.</li>
            )}
          </ul>
        )}
      </div>

      {/* 모바일용 검색창 (Nav 아래로, Input : w-full) */}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-white z-50 p-3 sm:hidden">
          <input
            className="px-4 py-2 w-full rounded-md bg-gray-200 dark:bg-gray-700"
            placeholder="검색어를 입력하세요"
            value={query}
            onChange={handleSearch}
          />
          {query && (
            <ul className="mt-2 w-full bg-base-200 rounded-box shadow max-h-60 overflow-y-auto">
              {filteredList.length > 0 ? (
                filteredList.map((list, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-base-300 cursor-pointer"
                    onClick={() => {
                      navigate(`/products/${list.id}`);
                      setQuery("");
                      setSearchOpen(false);
                    }}
                  >
                    {list.title}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-400">검색 결과가 없습니다.</li>
              )}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBox;
