import { useState } from 'react';
import { Grid3X3, MessageSquare, Star, CreditCard, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    {
      id: '',
      label: 'Overview',
      icon: Grid3X3,
      active: true
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      active: false,
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: Star,
      active: false
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      active: false
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      active: false
    }
  ];

  return (
    <div className="max-w-5xl mx-auto bg-gray-50 p-3 rounded-lg mt-5 shadow-sm border-1 border-gray-100">
      <nav className="flex flex-wrap gap-y-1.5 justify-between gap-0 sm:gap-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
           <Link to={`/trade-person/${item.id}`}>
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-md transition-all duration-200 whitespace-nowrap mr-5 border-1 border-gray-100
                ${isActive 
                  ? 'bg-orange-500 text-white shadow-sm' 
                  : 'text-orange-500 hover:bg-orange-50 bg-white'
                }
              `}
            >
              <IconComponent 
                size={18} 
                className={`${isActive ? 'text-white' : 'text-orange-500'}`}
              />
              <span className="hidden xs:inline sm:inline">{item.label}</span>
            </button>
           </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default NavigationBar;