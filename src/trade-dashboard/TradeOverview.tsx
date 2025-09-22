import { useState } from 'react';
import { Clock, TrendingUp, Calendar, MapPin, Clock3, ChevronDown } from 'lucide-react';

const TradeOverview = () => {
  const [selectedMonth, setSelectedMonth] = useState('Month');

  const recentJobs = [
    {
      id: 1,
      title: "Emergency Boiler Repair",
      date: "24/01/2024",
      location: "Select Location",
      urgency: "ASAP"
    },
    {
      id: 2,
      title: "Kitchen Cabinet Installation",
      date: "24/01/2024",
      location: "Select Location",
      urgency: "Flexible"
    },
    {
      id: 3,
      title: "Emergency Boiler Repair",
      date: "24/01/2024",
      location: "Select Location",
      urgency: "ASAP"
    }
  ];

  const shortlistItems = [
    {
      id: 1,
      title: "Emergency Boiler Repair",
      contractor: "Robert Fox",
      avatar: "/api/placeholder/40/40",
      distance: "1.8 miles away",
      date: "24/01/2024",
      time: "Now",
      description: "Certified electrician offering residential and commercial electrical services. Quick resp..."
    },
    {
      id: 2,
      title: "Garden Landscaping Project",
      contractor: "Albert Flores",
      avatar: "/api/placeholder/40/40",
      distance: "1.8 miles away",
      date: "24/01/2024",
      time: "2days ago",
      description: "Complete garden transformation including lawn replacement, flower beds, patio insta..."
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent shortlist - Left Column */}
        <div className="lg:col-span-2">
          <div className=" rounded-lg shadow-sm border border-gray-200 p-3 bg-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Recent shortlist</h2>
            </div>

            <div className="space-y-2">
              {recentJobs.map((job, index) => (
                <div key={job.id} className={`${index !== recentJobs.length - 1 ? ' border-gray-100 pb-4' : ''} mb-2 bg-white p-3 rounded-lg border-gray-200 border-1`}>
                  <h3 className="text-base font-medium text-gray-900 mb-3">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{job.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock3 className="w-4 h-4" />
                      <span>{job.urgency}</span>
                    </div>
                    <div className="ml-auto">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-center">
              <button className="text-gray-600 hover:text-gray-800 font-medium text-sm bg-white p-3 rounded-lg border-gray-200 border-1 w-full">
                View All Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Activity - Right Column */}
        <div className="space-y-6">
          {/* Activity Stats */}
          <div className="border-gray-200 p-3 bg-gray-100 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Activity</h2>
              </div>
            </div>

            <div className="mb-4 bg-white p-3 rounded-lg border-gray-200 border-1">
              <div className="flex items-center justify-between mb-2 ">
                <span className="text-md font-semibold text-gray-600">This Months</span>
                <div className="relative">
                  <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="appearance-none border border-gray-200 rounded-md px-3 py-1 text-sm text-gray-700 pr-8 focus:outline-none focus:border-orange-500 bg-gray-100 font-semibold"
                  >
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600">Shortlisted</div>
                </div>
              </div>
            </div>
          </div>

          {/* MY Shortlist */}
          <div className=" border-gray-200 p-3 bg-gray-100 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">MY Shortlist</h2>

            <div className="space-y-6">
              {shortlistItems.map((item) => (
                <div key={item.id} className='bg-white p-3 rounded-lg border-gray-200 border-1'>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <img 
                      src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format`}
                      alt={item.contractor}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1">{item.contractor}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-orange-500" />
                          <span className="text-orange-500">{item.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-orange-500" />
                          <span className='text-orange-500'>{item.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-center bg-white p-3 rounded-lg border-gray-200 border-1">
              <button className="text-orange-500 hover:text-orange-600 font-medium text-sm">
                View All Shortlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeOverview;