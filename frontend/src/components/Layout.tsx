import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="hover:underline">Tasks</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          <button onClick={auth?.logout} className="mt-4 bg-red-500 p-2 rounded">Logout</button>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;
