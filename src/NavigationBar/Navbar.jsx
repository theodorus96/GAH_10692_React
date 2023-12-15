import React from "react";
import {User,Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import {LogoGAH} from "./LogoGAH"
import { useGlobalLogin } from '../Global/Global';

export  function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLogin, setIsLogin } = useGlobalLogin();

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

  const email = localStorage.getItem("email")
  return (
    <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarContent className="hidden lg:inline-flex items-center gap-8 text-sm font-semibold" justify="center">
        <NavbarItem >
          <Link color="foreground" as={NavLink} to="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground"  href="#">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" as={NavLink} to="/riwayat">
            Riwayat
          </Link>
        </NavbarItem>
        <NavbarBrand>
          <LogoGAH/>
        </NavbarBrand>
        <NavbarItem >
          <Link color="foreground" as={NavLink} to="/availableRoom">
            Rooms
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link color="foreground"  href="#">
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground"  as={NavLink} to="/profile">
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden lg:inline-flex items-center gap-8 text-sm font-semibold">
      {isLogin ? (<User   
        name={email}
        description="Customer"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
        }}
      />):(
          <><NavbarItem className="hidden lg:flex">
              <Link as={NavLink} to="/login">Login</Link>
            </NavbarItem><NavbarItem>
                <Button as={NavLink} to="/register" color="primary" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem></>
      )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
