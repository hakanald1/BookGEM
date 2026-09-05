import logoImg from "@/assets/logo.png";

export function Logo({ className }: { className?: string }) {
  return (
    <div className="p-0 m-0 overflow-hidden flex items-center shrink-0">
      <img src={logoImg} alt="BookGEM Logo" className={`h-10 w-auto object-contain ${className || ""}`} />
    </div>
  );
}

export default Logo;
export { Logo as logo };        