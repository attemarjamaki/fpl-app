import Link from "next/link";

import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 justify-center">
      <Link href={"/"}>
        <p className="btn btn-ghost text-4xl font-semibold">FPL24.com</p>
      </Link>
    </div>
  );
};

export default Navbar;
