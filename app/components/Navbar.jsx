import Link from "next/link";

import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-10">
      <div className="flex-1">
        <Link href={"/"}>
          <p className="btn btn-ghost text-4xl font-bold">
            <span>
              FPL<span className="text-primary">24</span>.com
            </span>
          </p>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <Link href={"/bonus"}>
            <li>
              <p className="text-xl font-semibold">Bonus</p>
            </li>
          </Link>
          <Link href={"/xdata"}>
            <li>
              <p className="text-xl font-semibold">xData</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
