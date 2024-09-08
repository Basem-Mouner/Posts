
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Layout({ children }: any) {
let pathname: string = usePathname();

    return (
      <>
        <nav className="nav2 ">
          <ul className="">
            <li>
              <Link
                className={pathname === "/" ? "active " : ""}
                href="/content/personal"
              >
                Bersonal
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/business" ? "active" : ""}
                href="/content/business"
              >
                Business
              </Link>
            </li>
          </ul>
        </nav>

        {children}
      </>
    );
    
}