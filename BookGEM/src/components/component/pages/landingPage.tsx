import { NavigationMenuComponent } from '@/components/component/navbar'
import { NavHook } from '@/components/component/hook'
import { StatsBar } from '@/components/component/StatsBar'
import { HowItWorks } from '@/components/component/HowItWorks'
import { FeatureOne } from '@/components/component/featureOne'
import { FeatureTwo } from '@/components/component/featuretwo'
import { FeatureThree } from '@/components/component/featurethree'
import { FeatureFour } from '@/components/component/featurefour'
import { Testimonials } from '@/components/component/Testimonials'
import { CtaBanner } from '@/components/component/CtaBanner'
import { Footer } from '@/components/component/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans selection:bg-[#CBA328]/30 selection:text-black">
      <NavigationMenuComponent />
      <NavHook />
      <StatsBar />
      <HowItWorks />
      
      {/* Features Showcase Container */}
      <section className="w-full bg-[#fdfbf7] space-y-12">
        <FeatureOne />
        <FeatureTwo />
        <FeatureThree />
        <FeatureFour />
      </section>

      <Testimonials />
      <CtaBanner />
      <Footer />
    </div>
  )
}
export default LandingPage