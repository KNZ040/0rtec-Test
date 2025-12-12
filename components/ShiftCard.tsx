import React from 'react';
import { Shift, ShiftConfig } from '../types';

interface ShiftCardProps {
  shift: Shift;
  config: ShiftConfig;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ shift, config }) => {
  return (
    <div className="bg-white rounded-sm shadow-sm flex min-h-[320px] relative border border-gray-100">
      {/* Left Blue Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-[#007AC3]"></div>

      <div className="flex-1 pl-7 py-6 pr-4">
        {/* Header Info */}
        <div className="flex items-start mb-8">
          {/* Times Stack */}
          <div className="flex flex-col w-[5.5rem] flex-shrink-0 pt-1">
            <span className="text-3xl font-bold text-gray-900 leading-none tracking-tight">{config.startTime}</span>
            <span className="text-3xl font-bold text-gray-900 leading-none mt-2 tracking-tight">{config.endTime}</span>
          </div>
          
          {/* Vertical Header Separator */}
          <div className="w-[1px] bg-gray-300 h-16 mx-6"></div>

          {/* Details */}
          <div className="flex flex-col justify-center h-16">
            <span className="font-bold text-xl text-gray-900">{config.code}</span>
            <span className="text-sm text-gray-500 mt-1 font-medium">{shift.location}</span>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative mt-2">
          {/* Continuous Vertical Line - No dots/bullets */}
          {/* Positioned exactly between the time column and the text column */}
          <div className="absolute left-[5.5rem] top-2 bottom-2 w-[2px] bg-gray-300"></div>

          <div className="space-y-7">
            <TimelineItem time={config.startTime} label="Werk" />
            <TimelineItem time={config.breakTime} label="Pauze" />
            <TimelineItem time={config.resumeTime} label="Werk" />
            <TimelineItem time={config.endTime} label="Einde dienst" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem: React.FC<{ time: string; label: string }> = ({ time, label }) => (
  <div className="flex items-center h-6">
    {/* Time Column */}
    <div className="w-[5.5rem] pr-6 text-right text-gray-500 font-bold text-lg leading-none">
      {time}
    </div>
    
    {/* Label Column - Placed directly after the line (which is at 5.5rem + gap) */}
    <div className="pl-6 text-xl font-bold text-gray-800 leading-none">
      {label}
    </div>
  </div>
);

export default ShiftCard;