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

export function NavSM() {
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
      <NavbarContent className="items-center ml-96" justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarItem isActive>
          <Link as={NavLink} to="/DashboardSM">
            Season
          </Link>
        </NavbarItem>
        <NavbarItem color="foreground" isActive>
          <Link as={NavLink} to="/tarif">
            Tarif
          </Link>
        </NavbarItem>
        <NavbarItem color="foreground" isActive>
          <Link as={NavLink} to="/riwayatGroup">
            Riwayat
          </Link>
        </NavbarItem>
        <NavbarBrand>
          <LogoGAH />
        </NavbarBrand>
        <NavbarItem color="foreground" isActive>
          <Link as={NavLink} to="/layanan">
            Layanan
          </Link>
        </NavbarItem>
        <NavbarItem color="foreground" isActive>
          <Link as={NavLink} to="/customer">
            Customer
          </Link>
        </NavbarItem>
        <NavbarItem color="foreground" isActive>
          <Link as={NavLink} to="/availableRoomGroup">
            Reservasi
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
