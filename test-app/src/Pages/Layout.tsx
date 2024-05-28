import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <div>
        Layout Navbar
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default Layout;
