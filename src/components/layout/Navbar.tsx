
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isMobile?: boolean;
}

const NavLink = ({ to, children, isMobile }: NavLinkProps) => (
  <Link 
    to={to} 
    className={cn(
      "text-study-neutral-50 hover:text-study-green-300 transition-colors",
      isMobile ? "block w-full py-2 text-lg" : "px-3 py-2"
    )}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-study-dark-800 shadow-lg">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/a8c24059-1f08-4d8c-b6d3-dc87e291c180.png" 
            alt="Study Buddy AI Logo" 
            className="h-10 w-auto"
          />
          <span className="font-bold text-xl text-study-neutral-50">Study Buddy AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/qa">Q&A</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          
          {isLoggedIn ? (
            <Button 
              onClick={() => setIsLoggedIn(false)}
              variant="outline"
              className="ml-4 border-study-blue-300 text-study-blue-300 hover:bg-study-blue-300/10"
            >
              Log Out
            </Button>
          ) : (
            <div className="flex items-center space-x-2 ml-4">
              <Button 
                variant="outline"
                onClick={() => setIsLoggedIn(true)}
                className="border-study-blue-300 text-study-blue-300 hover:bg-study-blue-300/10"
              >
                Log In
              </Button>
              <CustomButton 
                variant="gradient"
                onClick={() => setIsLoggedIn(true)}
                className="bg-gradient-to-r from-study-green-500 to-study-blue-400 hover:from-study-green-600 hover:to-study-blue-500"
              >
                Sign Up
              </CustomButton>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-study-neutral-50 hover:bg-study-dark-700">
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden p-4 bg-study-dark-700 border-t border-study-dark-600">
          <div className="flex flex-col space-y-2">
            <NavLink to="/dashboard" isMobile>Dashboard</NavLink>
            <NavLink to="/qa" isMobile>Q&A</NavLink>
            <NavLink to="/profile" isMobile>Profile</NavLink>
            
            {isLoggedIn ? (
              <Button 
                onClick={() => setIsLoggedIn(false)}
                variant="outline"
                className="mt-4 w-full border-study-blue-300 text-study-blue-300 hover:bg-study-blue-300/10"
              >
                Log Out
              </Button>
            ) : (
              <div className="flex flex-col space-y-2 mt-4">
                <Button 
                  variant="outline"
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full border-study-blue-300 text-study-blue-300 hover:bg-study-blue-300/10"
                >
                  Log In
                </Button>
                <CustomButton 
                  variant="gradient"
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-gradient-to-r from-study-green-500 to-study-blue-400 hover:from-study-green-600 hover:to-study-blue-500"
                >
                  Sign Up
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
