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

export function NavbarFO() {
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
          <Link as={NavLink} to="/displayCustomer">
            Customer
          </Link>
        </NavbarItem>
        <NavbarItem color="foreground" isActive>
          <Link as={NavLink} to="/tambahlayanan">
            Fasilitas Berbayar
          </Link>
        </NavbarItem>
        <NavbarBrand>
          <LogoGAH />
        </NavbarBrand>
        <NavbarItem color="foreground" isActive>
          <Link as={NavLink} to="/">
            Pelunasan
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
