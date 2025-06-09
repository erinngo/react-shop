import "./assets/css/tailwind.css"; // tailwind 적용
import { BrowserRouter } from "react-router-dom";
import Drawer from "./components/common/Drawer";
import Nav from "./components/common/Nav";
import Router from "./router/router";
import Footer from "./components/common/Footer";
import { Suspense } from "react";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <input type="checkbox" id="side-menu" className="drawer-toggle" />
      <section className="drawer-content flex flex-col justify-start">
        {/* Nav를 렌더링 하세요 */}
        <Suspense fallback={<div>로딩중...</div>}>
          <Nav />
        </Suspense>
        <section className="main flex-1">
          <Router />
        </section>
        {/* Footer를 렌더링 하세요 */}
        <Footer />
      </section>
      <Drawer />
    </BrowserRouter>
  );
};

export default App;
