import { Hero } from "@/components/home/hero"
import { StatsSection } from "@/components/home/stats-section"
import { ServicesPreview } from "@/components/home/services-preview"
import { AboutTeaser } from "@/components/home/about-teaser"
import { CtaBanner } from "@/components/home/cta-banner"

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesPreview />
      <AboutTeaser />
      <CtaBanner />
    </>
  )
}
