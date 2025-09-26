import trustedImg from '../../../assets/trusted.png';
import paymentImg from '../../../assets/payment.png';
import timeImg from '../../../assets/time.png';
export default function QualityServiceSection() {
  return (
    <section className="py-16 px-4 bg-white">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Our Commitment to Quality Service
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          We prioritize quality, reliability, and trust to ensure every project is
          completed to your satisfaction.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-[#F2F4F8] p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
          <img
            src={trustedImg}
            alt="Trusted Professionals"
            className="w-12 h-12 mx-auto mb-4"
          />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Trusted Professionals
          </h3>
          <p className="text-gray-600 text-sm md:text-base mt-3">
            Skilled experts vetted for quality and reliability, ready to handle any job efficiently.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F2F4F8] p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
          <img
            src={paymentImg}
            alt="Safe & Secure Payments"
            className="w-12 h-12 mx-auto mb-4"
          />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Safe & Secure Payments
          </h3>
          <p className="text-gray-600 text-sm md:text-base mt-3">
            Work with confidence knowing every payment is protected and transparent.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F2F4F8] p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
          <img
            src={timeImg}
            alt="On Time Service"
            className="w-12 h-12 mx-auto mb-4"
          />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            On Time Service
          </h3>
          <p className="text-gray-600 text-sm md:text-base mt-3">
            Our professionals respect your schedule, ensuring timely completion of every project.
          </p>
        </div>
      </div>
    </section>
  );
}
