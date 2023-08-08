import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="text-white justify-center items-center">
      <main className="flex justify-center items-center h-5/6 py-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
