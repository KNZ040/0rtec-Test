import React, { useEffect, useRef } from 'react';
import { CalendarDay, Shift } from '../types';

interface CalendarStripProps {
  days: CalendarDay[];
  selectedDate: string;
  onSelectDate: (isoDate: string) => void;
  shifts: Shift[];
  onPrevDay: () => void;
  onNextDay: () => void;
}

const CalendarStrip: React.FC<CalendarStripProps> = ({ 
  days, 
  selectedDate, 
  onSelectDate, 
  shifts,
  onPrevDay,
  onNextDay
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to center/selected item on mount/update
  useEffect(() => {
    if (scrollRef.current) {
      // Find the selected element index
      const selectedIndex = days.findIndex(d => d.isoDate === selectedDate);
      if (selectedIndex !== -1) {
         // Roughly center: 50px item width. 
         // Container width / 2 - (Index * 50 + 25)
         // A simple scrollIntoView is easiest
         const container = scrollRef.current;
         const child = container.children[selectedIndex] as HTMLElement;
         if (child) {
            const containerWidth = container.offsetWidth;
            const childLeft = child.offsetLeft;
            const childWidth = child.offsetWidth;
            
            container.scrollTo({
                left: childLeft - containerWidth / 2 + childWidth / 2,
                behavior: 'smooth'
            });
         }
      }
    }
  }, [selectedDate, days]);

  const hasShift = (isoDate: string) => shifts.some(s => s.date === isoDate);

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm z-10">
      {/* Date Header */}
      <div className="flex justify-between items-center px-4 py-3">
        <button onClick={onPrevDay} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="relative group cursor-pointer">
           {/* Hidden date input covering the text for native picker feeling */}
           <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => onSelectDate(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
           />
           <h2 className="text-gray-700 font-bold uppercase text-sm tracking-wide group-hover:text-[#007AC3] transition-colors flex items-center gap-1">
            {new Date(selectedDate).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
             <svg className="w-4 h-4 text-gray-400 group-hover:text-[#007AC3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
             </svg>
          </h2>
        </div>

        <button onClick={onNextDay} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Scrollable Strip */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar pb-2 px-2 gap-1"
      >
        {days.map((day) => {
          const isSelected = day.isoDate === selectedDate;
          const shiftExists = hasShift(day.isoDate);

          return (
            <div 
              key={day.isoDate} 
              onClick={() => onSelectDate(day.isoDate)}
              className="flex flex-col items-center justify-start min-w-[52px] cursor-pointer flex-shrink-0"
            >
              <div className={`
                flex flex-col items-center justify-center w-[50px] h-[58px] border border-gray-200 rounded-sm
                transition-colors duration-200
                ${isSelected ? 'border-[#007AC3] border-2 bg-[#E6F2F9] shadow-sm z-10' : 'bg-white hover:border-gray-300'}
              `}>
                <span className={`text-[10px] uppercase mb-0.5 font-bold ${isSelected ? 'text-[#007AC3]' : 'text-gray-400'}`}>
                    {day.dayName}
                </span>
                <span className={`text-lg font-bold leading-none ${isSelected ? 'text-[#007AC3]' : 'text-gray-700'}`}>
                    {day.dayNumber}
                </span>
              </div>
              
              {/* Shift Indicator Dot/Bar */}
              <div className="h-3 flex items-center justify-center w-full mt-1">
                 {shiftExists && (
                   <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#007AC3]' : 'bg-gray-300'}`}></div>
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarStrip;