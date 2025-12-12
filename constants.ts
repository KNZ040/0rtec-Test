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
  // December 2024 Roster
  
  // "Deze week avonddiensten di/wo/do" (Assuming week of Dec 16)
  { id: '1', date: '2024-12-17', type: 'AVOND', location: 'BW Sommelsdijk' }, // Di
  { id: '2', date: '2024-12-18', type: 'AVOND', location: 'BW Sommelsdijk' }, // Wo
  { id: '3', date: '2024-12-19', type: 'AVOND', location: 'BW Sommelsdijk' }, // Do

  // "Vrijdag avonddienst" (Based on user description override)
  { id: '4', date: '2024-12-20', type: 'AVOND', location: 'BW Sommelsdijk' }, // Vr

  // "Za/zo ochtenddienst"
  { id: '5', date: '2024-12-21', type: 'OCHTEND', location: 'BW Sommelsdijk' }, // Za
  { id: '6', date: '2024-12-22', type: 'OCHTEND', location: 'BW Sommelsdijk' }, // Zo

  // Next week: "woensdag/donderdag/vrijdag nachtdienst"
  { id: '7', date: '2024-12-25', type: 'NACHT', location: 'BW Sommelsdijk' }, // Wo (Eerste Kerstdag)
  { id: '8', date: '2024-12-26', type: 'NACHT', location: 'BW Sommelsdijk' }, // Do (Tweede Kerstdag)
  { id: '9', date: '2024-12-27', type: 'NACHT', location: 'BW Sommelsdijk' }, // Vr
];

export const COLORS = {
  primary: '#C20078', 
  secondary: '#007AC3',
  bg: '#F3F4F6',
};
