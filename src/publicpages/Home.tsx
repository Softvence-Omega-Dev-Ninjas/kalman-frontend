import Banner from "../components/home/Banner"
import HireAsTradeperson from "../components/home/HireAsTradeperson"
import OurPopularServices from "../components/home/OurPopularServices"
import PopularServicesCategory from "../components/home/PopularServicesCategory"
import ReadyToHireTradeperson from "../components/home/ReadyToHireTradeperson"
import WhyChooseStaybar from "../components/home/WhyChooseStaybar"


 

function Home() {
  return (
    <div>
      <Banner />
      <PopularServicesCategory />
      <HireAsTradeperson />
      <OurPopularServices />
      <WhyChooseStaybar />
      <ReadyToHireTradeperson />
    </div>
  )
}

export default Home