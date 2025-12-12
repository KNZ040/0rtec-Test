import { ShiftConfig, Shift, ShiftType } from './types';

export const SHIFT_DEFINITIONS: Record<ShiftType, ShiftConfig> = {
  OCHTEND: {
    label: 'Ochtenddienst',
    code: 'D7.5',
    startTime: '07:00',
    endTime: '15:30',
    breakTime: '11:00',
    resumeTime: '11:30',
  },
  TUSSEN: {
    label: 'Tussendienst',
    code: 'T8.5',
    startTime: '10:00',
    endTime: '19:30',
    breakTime: '14:00',
    resumeTime: '14:30',
  },
  AVOND: {
    label: 'Avonddienst',
    code: 'L8bg',
    startTime: '15:00',
    endTime: '23:30',
    breakTime: '19:00',
    resumeTime: '19:30',
  },
  NACHT: {
    label: 'Nachtdienst',
    code: 'N8.0',
    startTime: '23:00',
    endTime: '07:30',
    breakTime: '03:00',
    resumeTime: '03:30',
  },
};

export const INITIAL_SHIFTS: Shift[] = [
  // December 2025 Rooster
  // Woensdag 10 december 2025 is de datum van de screenshot.
  
  // Week van 8 december 2025
  { id: '1', date: '2025-12-09', type: 'AVOND', location: 'BW Sommelsdijk' }, // Di
  { id: '2', date: '2025-12-10', type: 'AVOND', location: 'BW Sommelsdijk' }, // Wo (Screenshot datum)
  { id: '3', date: '2025-12-11', type: 'AVOND', location: 'BW Sommelsdijk' }, // Do
  { id: '4', date: '2025-12-12', type: 'AVOND', location: 'BW Sommelsdijk' }, // Vr

  // Weekend
  { id: '5', date: '2025-12-13', type: 'OCHTEND', location: 'BW Sommelsdijk' }, // Za
  { id: '6', date: '2025-12-14', type: 'OCHTEND', location: 'BW Sommelsdijk' }, // Zo

  // Kerst 2025 (Donderdag/Vrijdag)
  { id: '7', date: '2025-12-25', type: 'NACHT', location: 'BW Sommelsdijk' }, // Do (1e Kerstdag)
  { id: '8', date: '2025-12-26', type: 'NACHT', location: 'BW Sommelsdijk' }, // Vr (2e Kerstdag)
];

export const COLORS = {
  primary: '#C20078', 
  secondary: '#007AC3',
  bg: '#F3F4F6',
};