import { Routes, Route } from "react-router-dom";
import Header from "./component/header/Header";
import Home from "./component/home/Home";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

    </>
  );
}

export default App;
