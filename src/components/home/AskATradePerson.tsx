import React from 'react'
import { MessageSquare, ChevronRight } from 'lucide-react'
import { IoMdArrowForward } from 'react-icons/io'

type Card = {
    category: string
    title: string
    meta: string
    excerpt: string
    answers: string
}

type Props = {
    title?: string
    subtitle?: string
    cards?: Card[]
    ctaText?: string
    accent?: string
}

const defaultCards: Card[] = [
    {
        category: 'Gardening',
        title: 'Lawn Mowing',
        meta: 'Anonymous user 28 August 2025 3.42 pm',
        excerpt:
            "Hi there, I've just been tn visit a house a 2nd time. I opened the loft hatch and I could see daylight...",
        answers: '10 answer'
    },
    {
        category: 'Home Repairs',
        title: 'Roof Venting',
        meta: 'Anonymous user 28 August 2025 3.42 pm',
        excerpt:
            "Hi there, I've just been to check the attic again. When I opened the loft hatch I could actually see daylight coming through the tiles...",
        answers: '05 answer'
    },
    {
        category: 'Electrical',
        title: 'Wiring Repair',
        meta: 'Anonymous user 28 August 2025 3.42 pm',
        excerpt:
            "Hi, I've got a few sockets in the living room that keep sparking when I plug things in. Not sure if it's dangerous, but I think the wiring might be old. Could you advise?",
        answers: '09 answer'
    }
]

const AskATradePerson: React.FC<Props> = ({
    title = 'Ask a tradesperson',
    subtitle = 'Find questions you can answer and stand out with your expertise.',
    cards = defaultCards,
    ctaText = 'Ask any question',
    accent = '#FF7346'
}) => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-[1200px] mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-semibold text-center text-black">{title}</h2>
                <p className="text-center text-gray-500 mt-3 mb-10 text-lg">{subtitle}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((c, i) => (
                        <article key={i} className="bg-white border border-gray-100 rounded-md shadow-sm relative">
                            <div className="p-6 pb-[15%]">
                                <div className="text-xs text-gray-500 mb-2">{c.category}</div>
                                <div className="flex items-start justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
                                    <IoMdArrowForward className="text-xl text-gray-400" />
                                </div>

                                <div className="text-xs text-gray-400 mt-2">{c.meta}</div>

                                <p className="text-sm text-gray-600 mt-4 leading-relaxed">{c.excerpt}</p>

                                <a className="text-sm text-gray-700 mt-4 inline-block underline" href="#">Read more</a>
                            </div>

                            <div className="absolute bottom-0 w-full border-t border-gray-100 bg-gray-50 px-6 py-3 flex items-center text-sm text-gray-700">
                                <MessageSquare className="w-4 h-4 mr-3 text-gray-900" />
                                <span>{c.answers}</span>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <div className="text-sm font-semibold text-black mb-4">Need expert advice?</div>
                    <button style={{ backgroundColor: accent }} className="text-white px-5 py-2.5 rounded-md shadow-md font-semibold">{ctaText}</button>
                </div>
            </div>
        </section>
    )
}

export default AskATradePerson