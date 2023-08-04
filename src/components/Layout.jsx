import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="text-white h-[calc(100vh-1.5rem)]">
      <main className="h-5/6 py-10">{children}</main>
    </div>
  );
};

export default Layout;
