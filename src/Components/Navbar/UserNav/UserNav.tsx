import React, { FC } from "react";

import Link from "next/link";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import { User } from "@/utils/types";
import { deleteCookie } from "cookies-next";
import { useAuth } from "@/hooks/useAuth";
import { useAppContext } from "@/utils/state";
import { useRouter } from "next/router";

type Props = {
  user?: User;
};

export const UserNav: FC<Props> = ({ user }) => {
  const { setToken } = useAuth();
  const { setUser } = useAppContext();
  const router = useRouter();

  const closeSession = () => {
    localStorage.removeItem("token");
    deleteCookie("x-token");
    setToken(null);
    setUser(undefined);
    if (router.asPath.includes("/user")) router.replace("/");
  };
  return (
    <>
      {user ? (
        <div className="nav-list-link ">
          <Link
            href={`/user`}
            className="d-none d-sm-block navbar-container__icons__explore user-link"
          >
            <Image
              className="navbar-container__icons__explore__img"
              src={user.avatar!}
              alt="user.name"
              width={60}
              height={60}
            />
          </Link>

          <ul className="dropdown-menu user-dropdown bg-dark">
            <Link href="/user/" className="dropdown-item text-white">
              Ver Perfil
            </Link>
            {user.role === "Author" && (
              <Link href="/user/publicar" className="dropdown-item text-white">
                Publicar
              </Link>
            )}
            <Link href="/user/favoritos" className="dropdown-item text-white">
              Ver Favoritos
            </Link>
            <li
              role="button"
              className="dropdown-item text-white cursor-pointer text-decoration-none"
              onClick={() => {
                closeSession();
              }}
            >
              Cerrar sesion
            </li>
          </ul>
        </div>
      ) : (
        <div className="nav-list-link  d-none d-sm-block">
          <div className="navbar-container__icons__home">
            <FaUserAlt className="navbar-container__icons_home__icon" />
          </div>
          <button
            type="button"
            className="text-decoration-none btn p-0"
            data-bs-toggle="modal"
            data-bs-target="#modal"
          >
            <h2 className="navbar-text-explorer">Login</h2>
          </button>
        </div>
      )}
    </>
  );
};
