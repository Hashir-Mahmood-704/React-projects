import { Outlet } from "react-router-dom";
const CommonDataLayout = () => {
  return (
    <div>
      <div>Common data layout</div>
      <Outlet />
    </div>
  );
};

export default CommonDataLayout;
