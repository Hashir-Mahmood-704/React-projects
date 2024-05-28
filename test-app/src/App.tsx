import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import About from "./Pages/About.tsx";
import CommonDataLayout from "./Pages/CommonDataLayout.tsx";
import Layout from "./Pages/Layout.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<CommonDataLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
