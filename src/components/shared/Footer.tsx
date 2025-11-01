import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import star from "../../assets/logo/Shape.png"
import star2 from "../../assets/logo/Shape (1).png"

const columnLinks = [
  {
    title: 'Homeowners',
    links: [
      { label: 'Post a job', to: '/post-a-job' },
      { label: 'How it works', to: '#' },
      { label: 'Find trades', to: '/services' },
      { label: 'Customer helpdesk', to: '#' },
      { label: 'Ask a tradesperson', to: '#' },
    ],
  },
  {
    title: 'Tradespeople',
    links: [
      { label: 'Register as tradesperson', to: '/trade-signup' },
      { label: 'Quality Requirements', to: '#' },
      { label: 'Reviews policy', to: '#' },
      { label: 'Tradespeople helpdesk', to: '#' },
    ],
  },
  {
    title: 'Company info',
    links: [
      { label: 'Register as tradesperson', to: '/trade-signup' },
      { label: 'Become a partner', to: '#' },
      { label: 'Vacancies', to: '#' },
      { label: 'Blogs', to: '/blog' },
    ],
  },
  {
    title: 'Helpful resources',
    links: [
      { label: 'Trades', to: '/services' },
      { label: 'Services', to: '/services' },
      { label: 'Projects', to: '#' },
      { label: 'Cities', to: '#' },
      { label: 'Articles', to: '/blog' },
    ],
  },
]

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
          <h3 className="text-3xl font-bold sm:col-span-2 md:col-span-3 lg:col-span-4">
            {import.meta.env.VITE_APP_NAME} 
          </h3>

          {columnLinks.map((col, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-lg mb-4">{col.title}</h4>
              <ul className="space-y-3 text-sm">
                {col.links.map((l, i) => (
                  <li key={i}>
                    <Link
                      to={l.to}
                      className="text-gray-600 underline hover:text-primary transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + Rating Section */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          {/* Social icons */}
          <div className="flex justify-center sm:justify-start gap-3">
            <Link
              to="/facebook"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center transition-colors hover:bg-[#1877F2] hover:text-white"
            >
              <FaFacebookF />
            </Link>
            <Link
              to="/twitter"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center transition-colors hover:bg-[#1DA1F2] hover:text-white"
            >
              <FaTwitter />
            </Link>
            <Link
              to="/instagram"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center transition-colors hover:bg-[#E4405F] hover:text-white"
            >
              <FaInstagram />
            </Link>
          </div>

          {/* Rating section */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            <p>Excellent</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <div
                  key={idx}
                  className="p-1 bg-green-600 rounded-xs w-6 h-6 flex justify-center items-center"
                >
                  <img src={star} alt="" />
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <img src={star2} alt="" className="w-5 h-5" />
              <p>Trustpilot</p>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-200 my-8" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <Link
              to="/privacy"
              className="text-gray-600 underline hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-gray-600 underline hover:text-primary transition-colors"
            >
              Terms and conditions
            </Link>
          </div>

          <span className="text-gray-600 text-center sm:text-right">
            © Copyright 2025, All Rights Reserved by <span className=''>{import.meta.env.VITE_APP_NAME} </span>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
