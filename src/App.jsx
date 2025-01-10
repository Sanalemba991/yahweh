import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./cart";
import Ram from "./Ram"

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Ram />} />
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
