import React from "react";
import Link from "next/link";
import { RiHome4Fill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { Search } from "../Search/Search";
import { useAppContext } from "@/utils/state";

export const MobileMenu = () => {
  const { user, mobileMenuCloseRef } = useAppContext();

  return (
    <div
      className="offcanvas offcanvas-start bg-dark"
      id="mobileMenu"
      aria-labelledby="mobileMenu"
    >
      <div className="offcanvas-inner">
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title"
            id="mobileMenuLabel"
            onClick={() => mobileMenuCloseRef?.current?.click()}
          >
            <Link
              href="/"
              className="text-white fw-bold"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              MoeList
            </Link>
          </h5>

          <div
            className="btn p-0 text-white fs-1"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            role="button"
            ref={mobileMenuCloseRef}
          >
            <IoIosClose type="button" />
          </div>
        </div>
        <div className="offcanvas-body">
          <ul className="nav-list-mobile p-0 text-start ">
            <li onClick={() => mobileMenuCloseRef?.current?.click()}>
              <Link href={"/explorador"} className="text-white">
                <RiHome4Fill className="mb-1 " /> Explorar
              </Link>
            </li>

            <li
              className="nav-list-mobile p-0  fw-bold"
              onClick={() => mobileMenuCloseRef?.current?.click()}
            >
              {user ? (
                <Link
                  href={"/user"}
                  type="button"
                  className="btn p-0 fw-bold text-white text-start"
                >
                  <FaUserAlt className="mb-1" /> Cuenta
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn p-0 fw-bold text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#modal"
                >
                  <FaUserAlt className="mb-1" /> Cuenta
                </button>
              )}
            </li>
          </ul>

          <Search />
        </div>
      </div>
    </div>
  );
};
