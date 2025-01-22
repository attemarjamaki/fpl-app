import Link from "next/link";

import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 md:px-10">
      <div className="flex-1">
        <Link href={"/"}>
          <p className="btn btn-ghost text-4xl font-bold">
            <span>
              FPL<span className="text-primary">24</span>.com
            </span>
          </p>
        </Link>
      </div>
      <div className="dropdown dropdown-end md:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
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
          {/*
          <Link href={"/captaincy"}>
            <li>
              <p className="text-xl font-semibold">Captaincy</p>
            </li>
          </Link>
          */}
        </ul>
      </div>

      <div className="flex-none hidden md:block">
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
          {/*
          <Link href={"/captaincy"}>
            <li>
              <p className="text-xl font-semibold">Captaincy</p>
            </li>
          </Link>
          */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
