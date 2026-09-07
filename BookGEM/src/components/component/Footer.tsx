import { Link } from "react-router-dom";
import Logo from "./logo";

export function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border py-16 px-6 text-muted-foreground font-sans transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-10 w-auto" />
            <span className="font-bold text-xl tracking-tight text-foreground">
              Book<span className="text-[#CBA328]">GEM</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The complete studio for recipe crafting, portion scaling, and professional cookbook formatting.
          </p>
        </div>

        {/* Product Navigation */}
        <div className="space-y-3">
          <h4 className="font-playfair text-sm font-bold uppercase tracking-wider text-foreground">
            Product
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link to="/dashboard" className="hover:text-[#CBA328] transition-colors">
                Recipe Generator
              </Link>
            </li>
            <li>
              <Link to="/cookbooks" className="hover:text-[#CBA328] transition-colors">
                Cookbook Builder
              </Link>
            </li>
            <li>
              <Link to="/recipes" className="hover:text-[#CBA328] transition-colors">
                Recipe Manager
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h4 className="font-playfair text-sm font-bold uppercase tracking-wider text-foreground">
            Resources
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <a href="/docs" className="hover:text-[#CBA328] transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="/docs/installation" className="hover:text-[#CBA328] transition-colors">
                KDP Formatting Guide
              </a>
            </li>
            <li>
              <a href="/docs/primitives/typography" className="hover:text-[#CBA328] transition-colors">
                Typography & Printing
              </a>
            </li>
          </ul>
        </div>

        {/* Account Links */}
        <div className="space-y-3">
          <h4 className="font-playfair text-sm font-bold uppercase tracking-wider text-foreground">
            Account
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link to="/login" className="hover:text-[#CBA328] transition-colors">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-[#CBA328] transition-colors">
                Create Account
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
        <p>© {new Date().getFullYear()} BookGEM. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
