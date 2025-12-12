import React from 'react';
import { Shift, ShiftConfig } from '../types';

interface ShiftCardProps {
  shift: Shift;
  config: ShiftConfig;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ shift, config }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
      {/* Header Info */}
      <div className="flex mb-7 relative">
        {/* Times Stack */}
        <div className="flex flex-col justify-between w-[3.5rem] flex-shrink-0 py-1 h-[3.5rem]">
          <span className="text-[15px] font-bold text-gray-900 leading-none">{config.startTime}</span>
          <span className="text-[15px] font-bold text-gray-900 leading-none">{config.endTime}</span>
        </div>
        
        {/* Vertical Header Separator (Blue) */}
        <div className="w-6 flex justify-center flex-shrink-0">
            <div className="w-[3px] bg-[#007AC3] rounded-full h-full min-h-[50px]"></div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center pl-1">
          <span className="font-bold text-lg text-gray-900 leading-tight">{config.code}</span>
          {/* Using a static ID prefix to match screenshot precisely while keeping dynamic location */}
          <span className="text-[11px] text-gray-400 font-medium mt-1 leading-tight">212831 {shift.location}</span>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative">
        {/* Continuous Vertical Gray Line Background */}
        {/* Aligned with the center of the 1.5rem (w-6) separator column. 
            3.5rem (time width) + 0.75rem (half separator width) = 4.25rem left */}
        <div className="absolute left-[4.25rem] -translate-x-1/2 top-2 bottom-2 w-[1px] bg-gray-200"></div>

        <div className="space-y-6">
          <TimelineItem time={config.startTime} label="Werk" />
          <TimelineItem time={config.breakTime} label="Pauze" />
          <TimelineItem time={config.resumeTime} label="Werk" />
          <TimelineItem time={config.endTime} label="Einde dienst" />
        </div>
      </div>
    </div>
  );
};

const TimelineItem: React.FC<{ time: string; label: string }> = ({ time, label }) => (
  <div className="flex items-center h-5 relative z-10">
    {/* Time Column */}
    <div className="w-[3.5rem] flex-shrink-0 text-gray-900 font-bold text-[13px] leading-none">
      {time}
    </div>
    
    {/* Spacer Column (skips the line) */}
    <div className="w-6 flex-shrink-0"></div>
    
    {/* Label Column */}
    <div className="pl-1 text-[15px] font-bold text-gray-800 leading-none">
      {label}
    </div>
  </div>
);

export default ShiftCard;