"use client";
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Sidenav() {
  const menuList = [
    {
      key: 1,
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      key: 2,
      id: 1,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      key: 3,
      id: 2,
      name: "Expanses",
      icon: ReceiptText,
      path: "/dashboard/expanses",
    },
    {
      key: 4,
      id: 1,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image src={"/logo.svg"} alt="logo" width={50} height={50} />

      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path}>
            <h2
              className={`flex gap-2 items-center
             text-gray-700 font-medium 
             p-6 cursor-pointer rounded-md 
             hover:bg-blue-100"${
               path == menu.path
               // && "text-primary bg-blue-100"
             }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 text-gray-700 font-center">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default Sidenav;
