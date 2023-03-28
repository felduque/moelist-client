import { UserSidebar } from "@/components/User/UserSidebar";
import { useAppContext } from "@/utils/state";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Layout = ({ children }: any) => {
  const { user } = useAppContext();
  const router = useRouter();
  const { action } = router.query;

  return (
    <section className="container-fluid py-5 px-5 p-sm-5 text-white ">
      <div className="row gap">
        <div className="col-12 col-xl-3 ">
          <UserSidebar />
        </div>
        <div className="col-12 col-xl-9 px-4 pt-5 pt-xl-0 ps-xl-5">
          <ul className="nav nav-pills nav-fill nav-user gap-3 gap-sm-4">
            <li className="nav-item bg-dark">
              <Link
                href="/user/configurar"
                className={`nav-link ${action == "configurar" && "active"} `}
                aria-current="page"
              >
                Configurar Perfil
              </Link>
            </li>
            <li className="nav-item bg-dark">
              <Link
                href="/user/favoritos"
                className={`nav-link ${action == "favoritos" && "active"}`}
              >
                Favoritos
              </Link>
            </li>
            {user?.role === "Author" && (
              <li className="nav-item bg-dark">
                <Link
                  href="/user/publicar"
                  className={`nav-link ${action == "publicar" && "active"}`}
                >
                  Publicar
                </Link>
              </li>
            )}
          </ul>
          <div className="py-4">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
