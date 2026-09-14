import Home from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";
import RootLayouts from "./components/layouts/Rootlayouts";
import Services from "./components/pages/Services";
import Settings from "./components/pages/Settings";
import About from "./components/pages/About";
// import Error from "./components/pages/Error";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayouts />}>
          <Route index element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Route>
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </>
  );
}

export default App;
