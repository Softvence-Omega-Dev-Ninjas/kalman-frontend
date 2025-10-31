import { useEffect } from "react"
import AskATradePerson from "../components/home/AskATradePerson"
import Banner from "../components/home/Banner"
import CustomerReviews from "../components/home/CustomerReviews"
import HireAsTradeperson from "../components/home/HireAsTradeperson"
import OurPopularServices from "../components/home/OurPopularServices"
import PopularServicesCategory from "../components/home/PopularServicesCategory"
import PopularTradesperson from "../components/home/PopularTradesperson"
import ReadyToHireTradeperson from "../components/home/ReadyToHireTradeperson"
import TradeCount from "../components/home/TradeCount"
import WhyChooseStaybar from "../components/home/WhyChooseStaybar"


 

function Home() {
  useEffect(()=>{
    document.title = `Home | Stavbar`;
  }, [])

  return (
    <div>
      <Banner />
      <PopularServicesCategory />
      <HireAsTradeperson />
      <OurPopularServices />
      <WhyChooseStaybar />
      <TradeCount />
      <ReadyToHireTradeperson />
      <PopularTradesperson />
      <AskATradePerson />
      <CustomerReviews />
    </div>
  )
}

export default Home