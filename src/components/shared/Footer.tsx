import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'

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
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-6">Stavbar</h3>
            <div className="flex items-center gap-3 mb-6">
              <Link
                to="/facebook"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="/twitter"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"
              >
                <FaTwitter />
              </Link>
              <Link
                to="/instagram"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>

          {columnLinks.map((col, idx) => (
            <div key={idx} className="md:col-span-1">
              <h4 className="font-semibold mb-4">{col.title}</h4>
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

        <hr className="border-t border-gray-200 my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-6">
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

          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              © Copyright 2025, All Rights Reserved by Stavbar
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
