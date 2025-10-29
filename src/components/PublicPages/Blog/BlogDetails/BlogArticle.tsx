import blog1 from "../../../../assets/blog/blog-2.png";

const BlogArticle = () => {
  return (
    <div className="w-full">
      <div>
        <p className="text-sm text-secondary leading-relaxed mb-6">
          Walking through the Volvo Cars Pioneers in Safety installation at
          WIRED’s Big Interview event is tantamount to perusing the greatest
          hits of innovation in automotive safety. Starting with inventing the
          three-point safety belt in 1959 and then, in the apex of open-source
          thinking, waiving their patent rights, Volvo Cars has built a legacy
          of safety through engineering and indefatigable data collection. For
          instance, the development of its Whiplash Injury Protection System
          (WHIPS) and Side Impact Protection System (SIPS) were informed by
          Volvo Cars researchers analyzing crash sites to better inform their
          vehicle designs. And since the 1970s, the Volvo Cars safety research
          team has analyzed data from more than 50,000 vehicles involved in
          real-world traffic accidents.
        </p>

        <p className="text-sm text-secondary leading-relaxed mb-6">
          The knowledge gained from this data has led to the development of
          innovations that many drivers now take entirely for granted—from
          rear-facing child seats (1972) and blind spot monitoring (launched in
          2003), to automatic emergency braking (2008) and a myriad of sensors
          meant to make passengers and pedestrians safer. In his conversation
          with WIRED deputy global editorial director Greg Williams, Volvo Cars’
          Chief Engineering and Technology Officer Anders Bell, made it clear
          that, for Volvo Cars, technology isn’t just about bells and
          whistles—it’s about saving lives and elevating quality of life.
        </p>
      </div>
      <section>
        <div className="w-full mt-4 mb-6">
          <img
            src={blog1}
            alt="Car interior with infotainment system"
            className="w-full h-auto object-cover max-h-[404px] rounded-2xl"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4 mb-4 inline-block pb-1">
          Tying It All Together With the EX90 Installation
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-6">
          Following the panel, guests were invited to experience the all-new
          EX90 at the entrance to the event venue. While many EVs hitting the
          market have gone “full futurism” in their design, the Volvo EX90 looks
          like, well, an especially handsome Volvo. The company has always
          imbued their vehicles with a stylish Scandinavian design peppered with
          advanced safety tech, and the EX90 is no different. In this case, the
          only hint to the vehicle’s next-gen safety cred is the subtle
          inclusion of sensors around the car. And for Volvo Cars, that’s the
          future.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-6">
          Recalling a statement from Bell, one of the key areas they are
          exploring for the future is avoidance technology as well as the
          application of AI and advanced sensors that can prevent accidents
          before they occur. “Cars are driven by people currently, and people
          are imperfect by nature. So our approach is not to be in a dash to get
          the first to [autonomy] level X, Y and Z. Our approach is
          really—through safe automation—continuously work towards zero
          collisions." For Volvo Cars, the journey to autonomy is one of
          incremental improvement, something the company has specialized in for
          nearly a hundred years.
        </p>
      </section>
    </div>
  );
};

export default BlogArticle;
