"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface logoProps {
  className?: string;
}

const Logo = ({ className }: logoProps) => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className={cn(className, "md:block cursor-pointer")}
      height="18"
      width="50"
      src={`/logo.png`}
    />
  );
};

export default Logo;
