const Drawer = (): JSX.Element => {

  return (
    <div className="drawer-side">
      <label htmlFor="side-menu" className="drawer-overlay"></label>
      <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white dark:bg-base-100">
        {/* 모바일 메뉴를 노출시켜 보세요. */}
      </ul>
    </div>
  );
};

export default Drawer;
