import { IProduct } from "../../store/products";

interface Props {
  items: IProduct[];
  category: string;
}

export default function ProductsList({ items, category }: Props) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">{category}</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 mt-6">!! 아이템이 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4">
          {items.map((item) => (
            <li key={item.id} className="card bg-base-100 shadow-sm p-4">
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
          ))}
        </ul>
      )}
    </>
  );
}
