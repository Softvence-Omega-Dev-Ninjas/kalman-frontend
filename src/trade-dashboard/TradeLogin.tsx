
import { useEffect } from "react";
import TradeLogInComponent from "./tradeComponents/TradeLogin/TradeLoginComponent";

const TradeLogin: React.FC = () => {

      useEffect(()=>{
                document.title = `Trade Login | Stavbar`
              }, [])

  return (
    <div className=" bg-white flex items-start">
      <div className="max-w-7xl w-full mx-auto px-6 py-8">

                  <TradeLogInComponent/>
  
      </div>
    </div>
  );
};

export default TradeLogin;
