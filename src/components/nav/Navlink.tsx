'use client';

import {NavbarItem} from "@nextui-org/react";
import Link from "next/link";
import {usePathname} from "next/navigation";

type props = {
  href: string;
  label: string;
}

export default function Navlink({href, label}: props) {
  const pathname = usePathname();
  return (
      <NavbarItem isActive={pathname === href} as={Link} href={href}>{label}</NavbarItem>
  );
}