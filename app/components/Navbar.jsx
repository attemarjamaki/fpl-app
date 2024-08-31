import Link from "next/link";

import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <Link href={"/"}>
        <p className="btn btn-ghost text-xl">FPL Welho Tool</p>
      </Link>
    </div>
  );
};

export default Navbar;
