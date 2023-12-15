import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { LogoGAH } from "./LogoGAH";

export function NavbarOwner() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="items-center ml-52" justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarItem isActive>
          <Link as={NavLink} to="/customerBaru">
            Customer Baru
          </Link>
        </NavbarItem>
        <NavbarItem color="foreground" isActive>
          <Link as={NavLink} to="/pendapatanBulanan">
            Pendapatan Bulanan
          </Link>
        </NavbarItem>
        <NavbarBrand>
          <LogoGAH />
        </NavbarBrand>
        <NavbarItem color="foreground" isActive>
          <Link as={NavLink} to="/jumlahTamu">
            Jumlah Tamu
          </Link>
        </NavbarItem>
        <NavbarItem color="foreground" isActive>
          <Link as={NavLink} to="/customerTerbanyak">
            Customer terbanyak
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
