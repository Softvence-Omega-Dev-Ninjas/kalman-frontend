import ContactForm from "../components/PublicPages/Contact/ContactForm"
import PageHeader from "../components/reuseable/PageHeader"

function Contact() {
  return (
    <div>
      <PageHeader
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />
      <ContactForm/>
    </div>
  )
}

export default Contact