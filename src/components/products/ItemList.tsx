import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsList } from "../../store/products";
import { Category } from "../../constants/category";
import ProductsLoad from "./ProductsLoad";

import type { IProduct } from "../../store/products";

interface Props {
  category: string; // '패션', '액세서리', '디지털'
  limit?: number; // 출력갯수
}

/**
 * products.ts 에서 API 통신
 * --> Recoil 활용 상태 불러오기
 */
//{category} === '패션'|'악세서리'|'디지털'
const ItemList = ({ category, limit }: Props): JSX.Element => {
  const items = useRecoilValue(productsList);
  const [loading, setLoading] = useState(true);
  const [displayedItems, setDisplayedItems] = useState([]);

  // useEffect(() => {
  //   const filteredItems = items.filter((item) => category === Category[item.category]);

  //   const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filteredItems = items.filter((item) => category === Category[item.category]);

      const limitedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

      setDisplayedItems(limitedItems);
      setLoading(false);
    }, 300); // 느린 API 시뮬레이션용 딜레이 (실제 API면 제거해도 됨)

    return () => clearTimeout(timeout);
  }, [items, category, limit]);

  /**
   * 데이터 정리
   * {
        readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly category: string;
    readonly price: number;
    readonly image: string;
    readonly rating: IRating;
        }   
   */

  //카테고리별로 구분해서 보여주기
  return (
    <>
      <h2 className="text-xl font-bold mb-4">{category}</h2>
      {loading ? (
        <ProductsLoad limit={limit || 4} />
      ) : displayedItems.length === 0 ? (
        <p className="text-gray-500 mt-6">!! 아이템이 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4">
          {displayedItems.map((item: IProduct) => (
            <Link to={`/products/${item.id}`}>
              <li key={item.id}>
                <figure className="w-full h-60 overflow-hidden flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full object-contain scale-75 hover:scale-100 transition duration-300 cursor-pointer"
                  />
                </figure>

                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">${Math.floor(item.price)}</div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default ItemList;
