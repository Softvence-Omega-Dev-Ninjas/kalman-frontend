export default function LearnMoreSection() {
  return (
    <div className="bg-[#F2F4F8] py-18 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-24 h-1 bg-gray-800 mx-auto mb-3"></div>
          <h1 className="text-2xl font-medium text-gray-800">Learn more</h1>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 max-w-2xl">
          {/* How it works */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h2 className="text-xl lg:text-3xl font-bold text-gray-900 leading-tight">
                How it works
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 text-md leading-relaxed">
                We'll help you get Started on your first project.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                Learn more
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[2px] bg-gray-300"></div>

          {/* Help Centre */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h2 className="text-xl lg:text-3xl font-bold text-gray-900 leading-tight">
                Help Centre
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 text-md leading-relaxed">
                Get support, and resolve issues quickly all in one place.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                Learn more
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[2px] bg-gray-300"></div>

          {/* Blogs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h2 className="text-xl lg:text-3xl font-bold text-gray-900 leading-tight">
                Blogs
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 text-md leading-relaxed">
                Read insights to help you hire smarter and grow.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                Learn more
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
          <div className="w-full h-[2px] bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}