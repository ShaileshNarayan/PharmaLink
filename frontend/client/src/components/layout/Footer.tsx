import React from 'react';
import { Link } from 'wouter';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ExternalLink
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">
              PharmaLink
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Medicine Database
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Health Articles
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Drug Interactions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Pill Identifier
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">
              For Healthcare Providers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Provider Portal
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Clinical Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Continuing Education
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Become a Verifier
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Research Opportunities
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 bg-gray-800 p-2 rounded-full">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 bg-gray-800 p-2 rounded-full">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 bg-gray-800 p-2 rounded-full">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 bg-gray-800 p-2 rounded-full">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-200 hover:text-primary transition-colors duration-200 bg-gray-800 p-2 rounded-full">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">&copy; 2025 PharmaLink. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="#" className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm">Terms of Service</Link>
              <Link href="#" className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm">Privacy Policy</Link>
              <Link href="#" className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm">Cookie Policy</Link>
              <Link href="#" className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;