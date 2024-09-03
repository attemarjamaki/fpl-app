import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
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
