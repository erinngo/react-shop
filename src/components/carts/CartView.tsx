import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Suspense } from "react";

import BreadCrumb from "../common/Breadcrumb";
import Confirm from "../common/Confirm";
import CartList from "./CartList";
import { cartListSelector } from "../../store/cart";

const CartView = (): JSX.Element => {
  // const cartList = useRecoilValue(cartListSelector);

  return (
    <>
      <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <BreadCrumb category="홈" crumb="장바구니" />
        {/* <div className="mt-6 md:mt-14 px-2 lg:px-0">
        
        <div>
          <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
          <Link to="/" className="btn btn-primary mt-10">
            담으러 가기
          </Link>
        </div>
       
      </div> */}

        <div className="mt-6 md:mt-14 px-2 lg:px-0">
          <Suspense fallback={<p className="text-center">장바구니 불러오는 중...</p>}>
            <CartList />
          </Suspense>
        </div>
      </section>

      <Confirm />
    </>
  );
};

export default CartView;
