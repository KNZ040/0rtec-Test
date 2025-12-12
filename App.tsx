import { useState, useMemo } from 'react';
import TabBar from './components/TabBar';
import CalendarStrip from './components/CalendarStrip';
import ShiftCard from './components/ShiftCard';
import EmptyState from './components/EmptyState';
import EditModal from './components/EditModal';
import { CalendarDay, Shift, ShiftType } from './types';
import { INITIAL_SHIFTS, SHIFT_DEFINITIONS } from './constants';

function App() {
  const [activeTab, setActiveTab] = useState('ROOSTER');
  // Start on Wednesday, December 18, 2024
  const [selectedDate, setSelectedDate] = useState<string>('2024-12-18');
  const [shifts, setShifts] = useState<Shift[]>(INITIAL_SHIFTS);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Dynamically generate calendar days around the selected date
  // This allows endless navigation
  const calendarDays = useMemo(() => {
    const days: CalendarDay[] = [];
    const baseDate = new Date(selectedDate);
    
    // Generate range: 7 days before and 7 days after
    const startDate = new Date(baseDate);
    startDate.setDate(baseDate.getDate() - 7);
    
    for (let i = 0; i < 15; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      days.push({
        date: d,
        isoDate: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('nl-NL', { weekday: 'narrow' }), // M, D, W
        dayNumber: d.getDate(),
      });
    }
    return days;
  }, [selectedDate]);

  const currentShift = shifts.find(s => s.date === selectedDate);
  const currentShiftConfig = currentShift ? SHIFT_DEFINITIONS[currentShift.type] : null;

  const handleSaveShift = (type: ShiftType) => {
    setShifts(prev => {
      // Remove existing for this date
      const filtered = prev.filter(s => s.date !== selectedDate);
      // Add new
      return [...filtered, {
        id: Math.random().toString(36).substr(2, 9),
        date: selectedDate,
        type,
        location: 'BW Sommelsdijk'
      }];
    });
  };

  const handleDeleteShift = () => {
    setShifts(prev => prev.filter(s => s.date !== selectedDate));
  };

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F3F4F6] flex flex-col relative pb-20 border-x border-gray-200 shadow-2xl">
      {/* Header */}
      <header className="bg-white pt-12 pb-4 px-4 flex justify-between items-center shadow-sm z-20">
        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="text-[#007AC3] p-1 rounded hover:bg-gray-100"
          title="Instellingen (Rooster aanpassen)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-800">ORTEC Employee Self Service</h1>
        <button className="text-[#007AC3] p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </header>

      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'ROOSTER' ? (
        <div className="flex-1 flex flex-col">
          <CalendarStrip 
            days={calendarDays} 
            selectedDate={selectedDate} 
            onSelectDate={setSelectedDate}
            shifts={shifts}
            onPrevDay={handlePrevDay}
            onNextDay={handleNextDay}
          />
          
          <div className="p-4 flex-1">
            {currentShift && currentShiftConfig ? (
              <ShiftCard shift={currentShift} config={currentShiftConfig} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <p>Placeholder voor {activeTab}</p>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-1/2 translate-x-1/2 md:translate-x-0 md:absolute md:right-6 md:bottom-6 z-30">
        <button className="bg-[#C20078] hover:bg-[#a00063] text-white rounded-full px-6 py-3 font-bold shadow-lg flex items-center">
          <span className="mr-2 text-xl font-light">+</span> AANVRAAG
        </button>
      </div>

      <EditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        date={selectedDate}
        currentShiftType={currentShift?.type}
        onSave={handleSaveShift}
        onDelete={handleDeleteShift}
      />
    </div>
  );
}

export default App;