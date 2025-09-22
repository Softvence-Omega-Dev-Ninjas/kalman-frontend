import React from 'react'

type Stat = {
    value: string
    label: string
}

type Props = {
    stats?: Stat[]
    bg?: string
    accent?: string
}

const defaultStats: Stat[] = [
    { value: '123456', label: 'tradespeople' },
    { value: '50+', label: 'trade categories' },
    { value: '123456', label: 'reviews' }
]

const TradeCount: React.FC<Props> = ({ stats = defaultStats, bg = '#FDE6E0', accent = '#FF7346' }) => {
    return (
        <section style={{ backgroundColor: bg }} className="py-6">
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex items-center justify-center gap-8 md:gap-16">
                    {stats.map((s, i) => (
                        <div key={i} className="flex items-center gap-4 md:gap-6">
                            <div style={{ width: 4, height: 48, backgroundColor: accent }} className="hidden md:block" />
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold" style={{ color: accent }}>{s.value}</div>
                                <div className="text-sm text-gray-600 mt-1">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TradeCount