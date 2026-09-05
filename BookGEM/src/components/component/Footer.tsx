import { Link } from "react-router-dom";
import Logo from "./logo";

export function Footer() {
  return (
    <footer className="w-full bg-[#f8f5ef] border-t border-[#CBA328]/20 py-16 px-6 text-gray-700 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-10 w-auto" />
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Book<span className="text-[#CBA328]">GEM</span>
            </span>
          </Link>
          <p className="text-xs text-gray-600 leading-relaxed">
            The complete studio for recipe crafting, portion scaling, and professional cookbook formatting.
          </p>
        </div>

        {/* Product Navigation */}
        <div className="space-y-3">
          <h4 className="font-playfair text-sm font-bold uppercase tracking-wider text-gray-900">
            Product
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link to="/dashboard" className="hover:text-[#9b7606] transition-colors">
                Recipe Generator
              </Link>
            </li>
            <li>
              <Link to="/cookbooks" className="hover:text-[#9b7606] transition-colors">
                Cookbook Builder
              </Link>
            </li>
            <li>
              <Link to="/recipes" className="hover:text-[#9b7606] transition-colors">
                Recipe Manager
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h4 className="font-playfair text-sm font-bold uppercase tracking-wider text-gray-900">
            Resources
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <a href="/docs" className="hover:text-[#9b7606] transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="/docs/installation" className="hover:text-[#9b7606] transition-colors">
                KDP Formatting Guide
              </a>
            </li>
            <li>
              <a href="/docs/primitives/typography" className="hover:text-[#9b7606] transition-colors">
                Typography & Printing
              </a>
            </li>
          </ul>
        </div>

        {/* Account Links */}
        <div className="space-y-3">
          <h4 className="font-playfair text-sm font-bold uppercase tracking-wider text-gray-900">
            Account
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link to="/login" className="hover:text-[#9b7606] transition-colors">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-[#9b7606] transition-colors">
                Create Account
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© {new Date().getFullYear()} BookGEM. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-gray-900 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
