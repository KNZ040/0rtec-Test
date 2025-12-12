import React from 'react';

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'ROOSTER', label: 'ROOSTER', badge: null },
    { id: 'WORKFLOW', label: 'WORKFLOW', badge: 23 },
    { id: 'MEER', label: 'MEER', badge: null, icon: true },
  ];

  return (
    <div className="flex bg-white border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 relative py-3 text-sm font-bold flex items-center justify-center transition-all
              ${isActive ? 'text-[#C20078] border-b-4 border-[#C20078]' : 'text-gray-500 border-b-4 border-transparent'}`}
          >
            {tab.icon && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
            {tab.label}
            {tab.badge !== null && (
              <span className="absolute top-1 right-2 bg-[#C20078] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TabBar;