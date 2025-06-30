import React, { useContext } from "react";
import "./Menubar.css";
import { assests } from "../../assets/assests";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useState, useEffect } from "react";

const Menubar = () => {
  const { quantities, token, setToken, setQuantities } =
    useContext(StoreContext);
  const uniqueItemsInCart = Object.values(quantities || {}).filter(
    (qty) => qty > 0
  ).length;
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setQuantities({});
  };

  useEffect(() => {
    console.log("Current token value:", token);
    console.log("LocalStorage token:", localStorage.getItem("token"));
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/">
          <img
            src={assests.logo}
            alt=""
            className="mx-2"
            height={48}
            width={48}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  active === "home" ? "nav-link fw-bold active" : "nav-link"
                }
                to="/"
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "explore" ? "nav-link fw-bold active" : "nav-link"
                }
                to="/explore"
                onClick={() => setActive("explore")}
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "myOrders" ? "nav-link fw-bold active" : "nav-link"
                }
                to="/myorders"
                onClick={() => setActive("myOrders")}
              >
                My Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "contact" ? "nav-link fw-bold active" : "nav-link"
                }
                to="/contact"
                onClick={() => setActive("contact")}
              >
                Contact us
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-4">
            <Link to={`/cart`}>
              <div className="position-relative">
                <img
                  src={assests.cart}
                  alt=""
                  height={26}
                  width={26}
                  className="position-relative"
                />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {uniqueItemsInCart}
                </span>
              </div>
            </Link>
            {!token || token === "" ? (
              <>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <div className="dropdown position-relative">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={assests.profile}
                    width={32}
                    height={32}
                    className="rounded-circle"
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end text-small">
                  <li className="dropdown-item" onClick={logout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
