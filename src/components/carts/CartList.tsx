import { useRecoilValue, useRecoilState } from "recoil";
import { cartListSelector, cartState, addToCart } from "../../store/cart";
import { toCurrencyFormat } from "../../helpers/helpers";
import { Link } from "react-router-dom";

const CartList = (): JSX.Element => {
  const [cart, setCart] = useRecoilState(cartState); // 원본 상태
  const cartList = useRecoilValue(cartListSelector); // ICartItems[] 배열

  const totalPrice = cartList.reduce((acc, item) => Math.floor(acc + item.price * item.count), 0);

  const handleIncrease = (id: string) => {
    setCart(addToCart(cart, id, "increase"));
  };

  const handleDecrease = (id: string) => {
    setCart(addToCart(cart, id, "decrease"));
  };

  console.log("cartList: ", cartList);

  return (
    <div className="lg:flex lg:flex-col gap-6 mt-4 px-2 lg:px-0">
      {cartList.length === 0 ? (
        <div className="text-center py-10 text-lg font-semibold text-gray-500 flex flex-col justify-center items-center gap-2">
          {/* TODO : 담으러가기 버튼 */}
          <span>🛒 장바구니가 비어있습니다.</span>
          <Link to="/">
            <button className="btn btn-md btn-outline btn-secondary">담으러 가기</button>
          </Link>
        </div>
      ) : (
        cartList.map((item) => (
          <div key={item.id} className="flex gap-6 items-center border-b pb-6">
            <img src={item.image} alt={item.title} className="w-28 h-28 object-contain" />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-md mt-1">{toCurrencyFormat(item.price)}원</p>

              <div className="flex items-center gap-2 mt-2">
                <button className="btn btn-sm btn-primary" onClick={() => handleDecrease(item.id.toString())}>
                  -
                </button>
                <span>{item.count}</span>
                <button className="btn btn-sm btn-primary" onClick={() => handleIncrease(item.id.toString())}>
                  +
                </button>
              </div>
            </div>

            {/* 총 가격 & 구매 버튼 */}
            {/* <div className="flex flex-col items-end gap-2">
              <span className="text-md font-semibold">총 {toCurrencyFormat(item.price * item.count)}원</span>
              <button className="btn btn-sm btn-outline btn-secondary">구매하기</button>
            </div> */}
          </div>
        ))
      )}

      {/* 총가격, 구매 버튼 */}
      <div className="flex flex-row justify-end items-center gap-2 mt-6">
        <span className="text-md font-semibold">총 : ${totalPrice}</span>
        <button className="btn btn-md btn-outline btn-secondary">구매하기</button>
      </div>
    </div>
  );
};

export default CartList;
