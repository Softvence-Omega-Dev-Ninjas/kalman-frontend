import { useEffect } from "react"
import ContactForm from "../components/PublicPages/Contact/ContactForm"
import PageHeader from "../components/reuseable/PageHeader"

function Contact() {

      useEffect(()=>{
        document.title = `Contact | ${import.meta.env.VITE_APP_NAME}`
      }, [])
    

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