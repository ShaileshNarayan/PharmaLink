import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Pill, Menu } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="text-primary font-bold text-xl flex items-center">
                <Pill className="h-5 w-5 mr-2" />
                <span>PharmaLink</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" current={location}>Home</NavLink>
            <NavLink href="/pharmacy-locator" current={location}>Find Pharmacy</NavLink>
            <NavLink href="/doctors" current={location}>Doctors</NavLink>
            <NavLink href="/about" current={location}>About Us</NavLink>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            {/* <Link href="#" className="hidden md:block text-neutral-dark hover:text-primary font-medium">
              Sign In
            </Link>
            <Button className="hidden md:block">
              Create Account
            </Button> */}
            <Button
              variant="ghost"
              className="md:hidden text-neutral-dark"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-4 space-y-1">
            <MobileNavLink href="/" current={location}>Home</MobileNavLink>
            <MobileNavLink href="/pharmacy-locator" current={location}>Find Pharmacy</MobileNavLink>
            <MobileNavLink href="/doctors" current={location}>Doctors</MobileNavLink>
            <MobileNavLink href="/about" current={location}>About Us</MobileNavLink>
            <div className="py-2 px-4">
              <LanguageSwitcher />
            </div>
            <MobileNavLink href="#" current={location}>Sign In</MobileNavLink>
            <Link href="#" className="block py-2 px-4 text-base font-medium bg-primary text-white rounded-md mt-2">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  current: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, current, children }) => {
  const isActive = current === href || (href !== '/' && current.startsWith(href));
  
  return (
    <Link 
      href={href} 
      className={`${isActive ? 'text-primary' : 'text-neutral-dark'} hover:text-primary font-medium`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ href, current, children }) => {
  const isActive = current === href || (href !== '/' && current.startsWith(href));
  
  return (
    <Link 
      href={href} 
      className={`block py-2 px-4 text-base font-medium ${
        isActive 
          ? 'text-primary bg-blue-50' 
          : 'text-neutral-dark hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;