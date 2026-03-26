import { FeaturesSection } from "@/components/home/FeatureSection"
import { CtaSection } from "@/components/home/CtaSection"
import HeroSection from "@/components/home/HeroSection"
import { HowItWorksSection } from "@/components/home/HowItWorks"
import Navbar from "@/components/home/Navbar"


export default function Page() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <FeaturesSection/>
    <HowItWorksSection/>
    <CtaSection/>
    </>
  )
}
