import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="p-5 flex justify-between items-center border shadow-md">
      <Image src={"./logo.svg"} alt="logo" width={50} height={50} />
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;
