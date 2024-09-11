import Link from "next/link";

import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 justify-center">
      <Link href={"/"}>
        <p className="btn btn-ghost text-4xl font-bold">
          <span>
            FPL<span className="text-primary">24</span>.com
          </span>
        </p>
      </Link>
    </div>
  );
};

export default Navbar;
