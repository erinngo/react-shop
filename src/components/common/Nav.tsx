import { useState } from "react";
import { Link } from "react-router-dom";
// import styles from "./Nav.module.css";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import Theme from "./Theme";
import { useRecoilValue } from "recoil";
import { cartListSelector } from "../../store/cart";
import SearchBox from "./SearchBox";
import { ShoppingBagIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function Nav(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartList = useRecoilValue(cartListSelector);
  const totalCount = cartList.reduce((acc, item) => acc + item.count, 0);

  return (
    // container -> max-width 지정
    <header className="relative p-4 ">
      <nav className="flex items-center justify-between ">
        {/* 좌측: 햄버거 + 로고 */}
        <div className="flex items-center ">
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            <Bars3Icon className="w-6 h-6" />
          </button>
          <Link to={"/"} className="ml-2 lg:ml-0">
            <h1 className="text-xl font-bold">React Shop</h1>
          </Link>
        </div>

        {/* 중간: 카테고리 (lg 이상일 때만 보이게)  ---- 전체영역차지 : flex-1 */}
        <div className="flex-1">
          <ul className="hidden lg:flex space-x-5 font-semibold pl-6">
            <li>
              <Link to={"/fashion"}>패션</Link>
            </li>
            <li>
              <Link to={"/accessory"}>액세서리</Link>
            </li>
            <li>
              <Link to={"/digital"}>디지털</Link>
            </li>
          </ul>
        </div>

        {/* 우측: 검색바 + 장바구니 ---- 스타일을 위해 하위요소 3개 모두 div로 감쌈 */}
        <div className="flex items-center space-x-4">
          <div>
            <Theme />
          </div>
          {/* //TODO: 검색창 + 드롭다운  */}

          <div>
            <SearchBox />
          </div>

          {/* <input
            className="px-4 py-1 rounded-md hidden sm:block light: bg-gray-300 dark:bg-gray-600"
            placeholder="search..."
          /> */}
          <div>
            <Link to={"/cart"}>
              <div className="relative">
                <ShoppingBagIcon className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 w-5 h-5 flex items-center justify-center rounded-full">
                  {totalCount}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <>
          {/* 뒷배경 */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)} />

          {/* 모바일 메뉴 */}
          <div className="fixed top-0 left-0 h-screen w-64 bg-zinc-900 text-white p-6 z-50 shadow-lg transition-transform duration-300">
            <ul className="space-y-6 text-lg font-semibold">
              <li>
                <Link to="/fashion" onClick={() => setMenuOpen(false)}>
                  패션
                </Link>
              </li>
              <li>
                <Link to="/accessory" onClick={() => setMenuOpen(false)}>
                  액세서리
                </Link>
              </li>
              <li>
                <Link to="/digital" onClick={() => setMenuOpen(false)}>
                  디지털
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}

// const Nav = (): JSX.Element => {
//   return (
//     <nav className={styles.nav}>
//       <h1 className={styles.h1}>
//         <Link to={"/"}>WELCOME REACT</Link>
//       </h1>
//       <div>
//         <Link to={"/fashion"}>패션</Link>
//         <Link to={"/accessory"}>악세서리</Link>
//         <Link to={"/digital"}>디지털</Link>
//       </div>
//       <div>
//         <span>icon</span>
//         <input placeholder="search"></input>
//         <span>cart</span>
//       </div>
//     </nav>
//   );
// };
