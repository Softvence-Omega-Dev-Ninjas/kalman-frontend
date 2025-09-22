import Banner from "../components/home/Banner"
import HireAsTradeperson from "../components/home/HireAsTradeperson"
import OurPopularServices from "../components/home/OurPopularServices"
import PopularServicesCategory from "../components/home/PopularServicesCategory"


 

function Home() {
  return (
    <div>
      <Banner />
      <PopularServicesCategory />
      <HireAsTradeperson />
      <OurPopularServices />
    </div>
  )
}

export default Home