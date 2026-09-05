import { Sparkles, Shield } from "lucide-react";
import Logo from "../logo";

interface AuthSkeletonProps {
  mode?: "login" | "signup";
  className?: string;
}

/**
 * AuthCardSkeleton mimics Clerk's SignIn/SignUp card dimensions and structure
 * with smooth shimmer animations and BookGEM gold accents.
 */
export function AuthCardSkeleton({ mode = "login", className = "" }: AuthSkeletonProps) {
  const isSignUp = mode === "signup";

  return (
    <div
      className={`w-full max-w-[420px] rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-card dark:bg-[#161719] shadow-xl shadow-black/5 dark:shadow-black/40 p-7 sm:p-9 relative overflow-hidden select-none ${className}`}
      aria-label="Loading authentication form..."
      role="status"
    >
      {/* Subtle top gold accent glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#CBA328] to-transparent opacity-80" />

      {/* Header Section */}
      <div className="flex flex-col items-center text-center">
        {/* Animated Brand Badge */}
        <div className="h-11 w-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mb-3.5 shadow-xs skeleton-shimmer">
          <Sparkles className="h-5 w-5 text-[#CBA328] animate-pulse" />
        </div>

        {/* Title Bar */}
        <div
          className={`rounded-lg bg-neutral-200 dark:bg-neutral-800 skeleton-shimmer ${
            isSignUp ? "h-6 w-48" : "h-6 w-40"
          }`}
        />

        {/* Subtitle Bar */}
        <div
          className={`rounded-md bg-neutral-100 dark:bg-neutral-800/60 mt-2.5 skeleton-shimmer ${
            isSignUp ? "h-3.5 w-60" : "h-3.5 w-52"
          }`}
        />
      </div>

      {/* Social Login Button Placeholder */}
      <div className="h-10 w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 flex items-center justify-center gap-2.5 mt-6 skeleton-shimmer">
        <div className="h-4 w-4 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        <div className="h-3.5 w-32 rounded bg-neutral-300 dark:bg-neutral-700" />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-3 w-6 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Field 1: Email or Username */}
        <div>
          <div className="h-3.5 w-24 rounded bg-neutral-200 dark:bg-neutral-800 mb-1.5 skeleton-shimmer" />
          <div className="h-10 w-full rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 flex items-center px-3.5 skeleton-shimmer">
            <div className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700 animate-pulse" />
          </div>
        </div>

        {/* Field 2: Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="h-3.5 w-18 rounded bg-neutral-200 dark:bg-neutral-800 skeleton-shimmer" />
            {!isSignUp && (
              <div className="h-3 w-24 rounded bg-[#CBA328]/30 skeleton-shimmer" />
            )}
          </div>
          <div className="h-10 w-full rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 flex items-center justify-between px-3.5 skeleton-shimmer">
            <div className="flex items-center gap-1.5 opacity-40">
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            </div>
            <div className="h-3.5 w-3.5 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
          {isSignUp && (
            <div className="h-2.5 w-44 rounded bg-neutral-200/70 dark:bg-neutral-800/70 mt-2 skeleton-shimmer" />
          )}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="h-10 w-full rounded-xl bg-gradient-to-r from-[#CBA328] to-[#b38e1e] opacity-90 mt-6 shadow-md shadow-[#CBA328]/20 flex items-center justify-center relative overflow-hidden skeleton-shimmer">
        <div className="h-3.5 w-20 rounded bg-white/75 animate-pulse" />
      </div>

      {/* Footer Switch Prompt */}
      <div className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800/70">
        <div className="h-3.5 w-36 rounded bg-neutral-200 dark:bg-neutral-800 skeleton-shimmer" />
        <div className="h-3.5 w-16 rounded bg-[#CBA328]/40 skeleton-shimmer" />
      </div>

      {/* Secured by Clerk / BookGEM badge */}
      <div className="flex items-center justify-center gap-1.5 mt-4 opacity-40">
        <Shield className="h-3 w-3 text-muted-foreground" />
        <div className="h-2.5 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}

/**
 * AuthPageSkeleton renders the full 2-column layout (left branded banner + right auth card skeleton)
 * to avoid any layout flash during initial page load and Clerk initialization.
 */
export function AuthPageSkeleton({ mode = "login" }: AuthSkeletonProps) {
  const isSignUp = mode === "signup";

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-background">
      {/* Left Column: Branded Hero Panel */}
      <div className="hidden md:flex bg-black items-center justify-center p-12 text-white relative overflow-hidden">
        {/* Ambient gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(203,163,40,0.14),transparent_70%)] pointer-events-none" />

        <div className="max-w-md space-y-6 relative z-10 w-full">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-auto" />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-white font-sans">
              {isSignUp ? "Welcome to BookGEM" : "Welcome Back"}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              {isSignUp
                ? "Discover, curate, and explore your favorite books and knowledge gems in one place."
                : "Sign in to continue exploring your personalized book library and bookmarks."}
            </p>
          </div>

          {/* Feature Badge */}
          <div className="pt-4 flex items-center gap-2.5 text-xs tracking-wider uppercase text-[#CBA328] font-semibold">
            <span className="h-2 w-2 rounded-full bg-[#CBA328] animate-ping" />
            <span>AI-Curated Culinary Masterpieces</span>
          </div>
        </div>
      </div>

      {/* Right Column: Centered Skeleton Card */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <AuthCardSkeleton mode={mode} />
      </div>
    </div>
  );
}
