import CustomerTestimonials from "../components/PublicPages/About/CustomerTestimonials"
import LearnMoreSection from "../components/PublicPages/About/LearnMoreSection"
import QualityServiceSection from "../components/PublicPages/About/QualityServiceSection"
import ServiceSection from "../components/PublicPages/About/ServiceSection"
import PageHeader from "../components/reuseable/PageHeader"


function About() {
  return (
   <div>
      <PageHeader
        title="About Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />
      <ServiceSection/>
      <QualityServiceSection/>
      <LearnMoreSection/>
      <CustomerTestimonials/>
    </div>
  )
}
// `sada
export default About