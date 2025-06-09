// 개별상품 상세 UI
import { productsList } from "../../store/products";
import { useParams, useNavigate } from "react-router";

import { useRecoilValue, useRecoilState } from "recoil";

import { cartState, addToCart } from "../../store/cart";

import Rating from "../common/Rating";
import BreadCrumb from "../common/Breadcrumb";

const ProductsView = () => {
  const [cart, setCart] = useRecoilState(cartState);
  console.log("📦 cartState:", cart);
  const navigate = useNavigate();

  const { id } = useParams();
  const products = useRecoilValue(productsList);

  const thisProduct = products.find((item) => item.id === Number(id));

  if (!thisProduct) {
    return <div className="text-center text-gray-500">해당 상품을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <BreadCrumb category={thisProduct.category} crumb={thisProduct.title} />
        <div className="flex flex-col lg:flex-row  bg-base-100 ">
          <figure className="flex-shrink-0 p-6">
            <img src={thisProduct.image} alt={thisProduct.title} className="object-contain w-full h-72" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl font-bold">
              {thisProduct.title}
              <div className="badge badge-success">NEW</div>
            </h2>
            <p className="text-gray-600">{thisProduct.description}</p>

            <div className="flex items-center space-x-2 mt-2">
              <div className="rating rating-sm">
                <input type="radio" className="mask mask-star-2 bg-yellow-400" checked />
                <input type="radio" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" className="mask mask-star-2 bg-yellow-400" />
              </div>
              <span className="text-sm text-gray-500">
                {thisProduct.rating.rate} / {thisProduct.rating.count} 참여
              </span>
            </div>

            <h3 className="text-2xl font-semibold mt-4">${thisProduct.price}</h3>

            <div className="card-actions justify-start mt-4">
              <button className="btn btn-primary" onClick={() => setCart(addToCart(cart, thisProduct.id.toString()))}>
                장바구니에 담기
              </button>
              <button className="btn btn-outline" onClick={() => navigate("/cart")}>
                장바구니로 이동
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsView;
