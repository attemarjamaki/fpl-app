import React from "react";

const Footer = () => {
  return (
    <div className="min-w-[600px]">
      <footer className="footer footer-center bg-neutral-700 text-neutral-200 text-md p-6">
        <aside>
          <p>Because FPL never sleeps—neither do we! ⚽🌙</p>
          <p>
            Copyright © {new Date().getFullYear()} - All rights reversed. Just
            kidding, they're reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
