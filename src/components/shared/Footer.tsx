import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const columnLinks = [
    {
        title: 'Homeowners',
        links: ['Post a job','How it works','Find trades','Customer helpdesk','Ask a tradesperson']
    },
    {
        title: 'Tradespeople',
        links: ['Register as tradesperson','Quality Requirements','Reviews policy','Tradespeople helpdesk']
    },
    {
        title: 'Company info',
        links: ['Register as tradesperson','Become a partner','Vacancies','Blogs']
    },
    {
        title: 'Helpful resources',
        links: ['Trades','Services','Projects','Cities','Articles']
    }
]

const Footer: React.FC = () => {
    return (
        <footer className="bg-white text-gray-800">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold mb-6">Stavbar</h3>
                        <div className="flex items-center gap-3 mb-6">
                            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"><FaFacebookF /></button>
                            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"><FaTwitter /></button>
                            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"><FaInstagram /></button>
                        </div>
                    </div>

                    {columnLinks.map((col, idx) => (
                        <div key={idx} className="md:col-span-1">
                            <h4 className="font-semibold mb-4">{col.title}</h4>
                            <ul className="space-y-3 text-sm">
                                {col.links.map((l, i) => (
                                    <li key={i}><a className="text-gray-600 underline" href="#">{l}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <hr className="border-t border-gray-200 my-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-6">
                        <a className="text-gray-600 underline" href="#">Privacy.</a>
                        <a className="text-gray-600 underline" href="#">Terms and conditions</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">© Copyright 2025, All Rights Reserved by Stavbar</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer