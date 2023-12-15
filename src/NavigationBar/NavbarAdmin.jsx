import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import {LogoGAH} from "./LogoGAH"


export  function NavAdmin() {
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
    <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
        <NavbarItem isActive>
          <Link as={NavLink} to="/room">
            Room
          </Link>
        </NavbarItem>
        
        <NavbarBrand>
          <LogoGAH/>
        </NavbarBrand>
       
    </Navbar>
  );
}
