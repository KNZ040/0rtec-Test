import React, { useState } from 'react';
import { ShiftType } from '../types';
import { SHIFT_DEFINITIONS } from '../constants';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  currentShiftType?: ShiftType;
  onSave: (type: ShiftType) => void;
  onDelete: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, date, currentShiftType, onSave, onDelete }) => {
  const [selectedType, setSelectedType] = useState<ShiftType>(currentShiftType || 'OCHTEND');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-[#C20078] p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-lg">Rooster Aanpassen</h3>
          <button onClick={onClose} className="text-white hover:opacity-80">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-4 text-sm">
            Wijzig dienst voor <span className="font-bold text-gray-800">{date}</span>
          </p>

          <div className="space-y-3">
            {(Object.keys(SHIFT_DEFINITIONS) as ShiftType[]).map((type) => (
              <label 
                key={type}
                className={`flex items-center p-3 rounded border cursor-pointer transition-colors
                  ${selectedType === type ? 'border-[#C20078] bg-pink-50' : 'border-gray-200 hover:bg-gray-50'}
                `}
              >
                <input 
                  type="radio" 
                  name="shiftType" 
                  value={type} 
                  checked={selectedType === type}
                  onChange={() => setSelectedType(type)}
                  className="w-4 h-4 text-[#C20078] focus:ring-[#C20078]"
                />
                <div className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">{SHIFT_DEFINITIONS[type].label}</span>
                  <span className="block text-xs text-gray-500">
                    {SHIFT_DEFINITIONS[type].startTime} - {SHIFT_DEFINITIONS[type].endTime}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="flex-1 px-4 py-2 border border-red-500 text-red-600 rounded text-sm font-medium hover:bg-red-50"
            >
              Verwijder
            </button>
            <button
              onClick={() => {
                onSave(selectedType);
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-[#C20078] text-white rounded text-sm font-medium hover:bg-[#a00063]"
            >
              Opslaan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;