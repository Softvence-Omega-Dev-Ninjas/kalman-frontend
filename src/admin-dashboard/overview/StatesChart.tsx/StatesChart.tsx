
import {
  platformPerformance,
  recentActivity,
  systemStatus,
  topCards,
  topServices,
} from "../data/overviewData";
import DashboardCard from "./_components/DashbordCard.tsx/DashboardCard";
import DashboardSection from "./_components/DashboardSection/DashboardSection";
import { Progress } from "@/components/ui/progress";

const StatesChart = () => {
  return (
    <div className="">
      {/* Filters */}
      <div className="flex justify-between items-center mb-6 flex-wrap bg-white py-3 mt-5 px-5 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm">Filters:</span>
          <select className="bg-white border border-gray-300 rounded-lg p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topCards.map((card) => (
          <DashboardCard key={card.id} {...card} />
        ))}
      </div>

      {/* Performance & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <DashboardSection title="Platform Performance">
          {platformPerformance.map((item, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {item.value}%
                </span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </DashboardSection>

        <DashboardSection title="System Status">
          {systemStatus.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between py-2 border-b last:border-b-0"
            >
              <span className="text-sm text-gray-500">{item.label}</span>
              <span className="text-sm font-medium text-gray-700">
                {item.value}
              </span>
            </div>
          ))}
        </DashboardSection>
      </div>

      {/* Recent Activity & Top Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardSection title="Recent Activity">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 py-2 border-b last:border-b-0"
            >
              <span className="flex-shrink-0 text-gray-600">
                {activity.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {activity.text}
                </p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </DashboardSection>

        <DashboardSection title="Top Service Categories">
          {topServices.map((item, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {item.value}%
                </span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </DashboardSection>
      </div>
    </div>
  );
};

export default StatesChart;
