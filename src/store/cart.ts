import { atom, selector } from "recoil";
import { CART_ITEM } from "../constants/category";
import { productsList } from "./products";

export interface ICartInfo {
  readonly id: number;
  readonly count: number;
}

// ICartInfo + IProduct
export interface ICartItems {
  readonly id: string;
  readonly count: number;

  readonly title: string;
  readonly price: number;
  readonly image: string;
}

export interface ICartState {
  readonly items?: Record<string | number, ICartInfo>;
}

/**
 * 카트의 상태는 localStorage 기준으로 초기화 됩니다.
 * 카트의 상태는 새로고침해도 유지되어야 하기 때문입니다.
 *
 *  1: { id: 1, count: 2 }
 */
export const cartState = atom<ICartState>({
  key: "cart",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      localStorage.getItem(CART_ITEM) && setSelf(JSON.parse(localStorage.getItem(CART_ITEM) as string));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});

/**
 * cartList를 구현 하세요.
 * id, image, count 등을 return합니다.
 *
 * cartState(장바구니상태) + productsList(상품목록) => 조합
 */

// selector<ICartItems[]>
export const cartListSelector = selector<any>({
  key: "cartListSelector",
  get: async ({ get }) => {
    const cart = get(cartState);
    const productList = await get(productsList); // 전체 상품 목록

    if (!cart.items) return [];

    const result = Object.entries(cart.items).map(([id, cartItem]) => {
      const product = productList.find((p) => p.id.toString() === id);
      return {
        id: product?.id ?? "",
        count: cartItem.count,

        title: product?.title ?? "",
        price: product?.price ?? 0,
        image: product?.image ?? "",
      };
    });

    return result;
  },
});

// addToCart는 구현 해보세요.

export const addToCart = (cart: ICartState, id: string, action: string): ICartState => {
  const prevItems = cart.items ?? {};

  // 이미 해당 id가 있으면 수량 증가, 없으면 새로 추가
  const existingItem = prevItems[id];
  let newCount = 1;

  if (existingItem) {
    if (action === "increase") {
      newCount = existingItem.count + 1;
    } else {
      newCount = existingItem.count - 1;
      // if (newCount < 1) newCount = 1; // 최소 1개 유지
    }
  }

  // 0 이하가 되면 해당 아이템 삭제
  if (newCount <= 0) {
    const { [id]: removed, ...restItems } = prevItems; // 해당 id 제거
    return {
      ...cart,
      items: restItems,
    };
  }

  const updatedItems = {
    ...prevItems,
    [id]: {
      id: Number(id),
      count: newCount,
    },
  };
  return {
    ...cart,
    items: updatedItems,
  };
};

// removeFromCart는 참고 하세요.
export const removeFromCart = (cart: ICartState, id: string) => {
  const tempCart = { ...cart };
  if (tempCart[id].count === 1) {
    delete tempCart[id];
    return tempCart;
  } else {
    return { ...tempCart, [id]: { id: id, count: cart[id].count - 1 } };
  }
};

/**
 * 그 외에 화면을 참고하며 필요한 기능들을 구현 하세요.
 */
