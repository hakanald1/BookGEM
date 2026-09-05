import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import { AuthCardSkeleton } from "../auth/AuthSkeleton";
import Logo from "../logo";

export function Login() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-background">
      {/* Left Column: Branded Hero Panel */}
      <div className="hidden md:flex bg-black items-center justify-center p-12 text-white relative overflow-hidden">
        {/* Ambient gold radial background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(203,163,40,0.14),transparent_70%)] pointer-events-none" />

        <div className="max-w-md space-y-6 relative z-10 w-full">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-auto" />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-white font-sans">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Sign in to continue exploring your personalized book library and bookmarks.
            </p>
          </div>

          {/* Feature Badge */}
          <div className="pt-4 flex items-center gap-2.5 text-xs tracking-wider uppercase text-[#CBA328] font-semibold">
            <span className="h-2 w-2 rounded-full bg-[#CBA328] animate-ping" />
            <span>AI-Curated Culinary Masterpieces</span>
          </div>
        </div>
      </div>

      {/* Right Column: Sign In Form with Skeleton Loader */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <ClerkLoading>
          <AuthCardSkeleton mode="login" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignIn 
            routing="path" 
            path="/login" 
            signUpUrl="/signup"
            fallbackRedirectUrl="/"
            fallback={<AuthCardSkeleton mode="login" />}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
}

