import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-neutral-700 text-base-content rounded p-10">
      <div>
        <Link href={"/"}>
          <p className="btn btn-ghost text-xl font-bold text-white">
            <span>
              FPL<span className="text-primary">24</span>.com
            </span>
          </p>
        </Link>
      </div>
      <nav className="grid grid-flow-col gap-4 text-neutral-400">
        <Link href="/bonus">Bonus</Link>
        <Link href="/xdata">xData</Link>
        <Link href="/captaincy">Captaincy</Link>
      </nav>
      <aside className="text-neutral-400">
        <p>© {new Date().getFullYear()} FPL24.com | Lappers Digital</p>
        <p>All rights reversed. Just kidding, they're reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;
