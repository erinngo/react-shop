import Slider from "../components/common/Slider";
import ItemList from "../components/products/ItemList";

const Index = (): JSX.Element => {
  return (
    <>
      <Slider />
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto">
        {/* 카테고리 - 패션 */}
        <ItemList category="패션" limit={4} />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        {/* 카테고리 - 악세서리 */}
        <ItemList category="악세서리" limit={4} />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        {/* components products 폴더에 공통으로 사용할 ItemList 컴포넌트를 만들어서 노출 시켜 보세요. */}
        {/* 카테고리 - 디지털 */}
        <ItemList category="디지털" limit={4} />
      </section>
    </>
  );
};

export default Index;
