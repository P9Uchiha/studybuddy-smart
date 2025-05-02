
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
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
      "text-study-neutral-500 hover:text-study-purple-300 transition-colors",
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
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="w-8 h-8 text-study-purple-300" />
          <span className="font-bold text-xl text-study-neutral-800">Study Buddy AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/qa">Q&A</NavLink>
          <NavLink to="/flashcards">Flashcards</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          
          {isLoggedIn ? (
            <Button 
              onClick={() => setIsLoggedIn(false)}
              variant="outline"
              className="ml-4"
            >
              Log Out
            </Button>
          ) : (
            <div className="flex items-center space-x-2 ml-4">
              <Button 
                variant="outline"
                onClick={() => setIsLoggedIn(true)}
              >
                Log In
              </Button>
              <CustomButton 
                variant="gradient"
                onClick={() => setIsLoggedIn(true)}
              >
                Sign Up
              </CustomButton>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu}>
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
        <div className="md:hidden p-4 bg-white border-t">
          <div className="flex flex-col space-y-2">
            <NavLink to="/dashboard" isMobile>Dashboard</NavLink>
            <NavLink to="/qa" isMobile>Q&A</NavLink>
            <NavLink to="/flashcards" isMobile>Flashcards</NavLink>
            <NavLink to="/profile" isMobile>Profile</NavLink>
            
            {isLoggedIn ? (
              <Button 
                onClick={() => setIsLoggedIn(false)}
                variant="outline"
                className="mt-4 w-full"
              >
                Log Out
              </Button>
            ) : (
              <div className="flex flex-col space-y-2 mt-4">
                <Button 
                  variant="outline"
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full"
                >
                  Log In
                </Button>
                <CustomButton 
                  variant="gradient"
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full"
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
