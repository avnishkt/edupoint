import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../components/assets/images/logo.png"; // Ensure the correct path and extension
import { TfiViewList } from "react-icons/tfi";

export default function Navbar() {

  useEffect(() => {
    // Toggle navbar for mobile
    const navbar = document.querySelector("[data-navbar]");
    const overlay = document.querySelector("[data-overlay]");
    const navTogglers = document.querySelectorAll("[data-nav-toggler]");
    const navLinks = document.querySelectorAll("[data-nav-link]");

    const toggleNavbar = () => {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    };

    const closeNavbar = () => {
      navbar.classList.remove("active");
      overlay.classList.remove("active");
    };

    navTogglers.forEach(toggler => toggler.addEventListener("click", toggleNavbar));
    navLinks.forEach(link => link.addEventListener("click", closeNavbar));

    return () => {
      navTogglers.forEach(toggler => toggler.removeEventListener("click", toggleNavbar));
      navLinks.forEach(link => link.removeEventListener("click", closeNavbar));
    };
  }, []);

  return (
    <div>
      <header className="header" data-header>
        <div className="container">
          <Link to="/" className="logo">
            <img src={logo} width="162" height="50" alt="EduWeb logo" />
          </Link>

          {/* Toggler button for mobile */}
         

          <nav className="navbar" data-navbar>
            <div className="wrapper">
              <Link to="/" className="logo">
                <img src={logo} width="162" height="50" alt="EduWeb logo" />
              </Link>

              <button className="nav-close-btn" aria-label="close menu" data-nav-toggler>
                {/* You can use an icon for close here */}
                <p>🥡</p>
                <span className="close-icon"></span>
              </button>
            </div>

            <ul className="navbar-list">
              <li className="navbar-item">
                <Link to="/" className="navbar-link" data-nav-link>Home</Link>
              </li>
              <li className="navbar-item">
                <Link to="/teachers" className="navbar-link" data-nav-link>Teachers</Link>
              </li>
              <li className="navbar-item">
                <Link to="/courses" className="navbar-link" data-nav-link>Courses</Link>
              </li>
              <li className="navbar-item">
                <Link to="/youtube" className="navbar-link" data-nav-link>Youtube</Link>
              </li>
              <li className="navbar-item">
                <Link to="/about" className="navbar-link" data-nav-link>About</Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="header-action-btn" aria-label="toggle search" title="Search">
              {/* <ion-icon name="search-outline" aria-hidden="true"></ion-icon> */}
              <p>🔍</p>
            </button>

            <button className="header-action-btn" aria-label="cart" title="Cart">
              {/* <ion-icon name="cart-outline" aria-hidden="true"></ion-icon> */}
              <span className="btn-badge">0</span>
            </button>

            <Link to="#" className="btn has-before">
              <span className="span">Try for free</span>
              {/* <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon> */}
              <p>❤️</p>
            </Link>
            <p>{" "}</p>
            <button className="header-action-btn mobile-navi-toggler" aria-label="open menu" data-nav-toggler>
            {/* You can add an icon here like an SVG or an image */}
            <TfiViewList/>
            <span className="hamburger-icon"></span>
          </button>
          </div>

          <div className="overlay" data-nav-toggler data-overlay></div>
        </div>
      </header>
    </div>
  );
}
