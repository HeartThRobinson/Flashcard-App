import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Home />
        <NotFound />
      </div>
    </>
  );
}

export default Layout;
