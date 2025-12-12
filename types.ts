export type ShiftType = 'OCHTEND' | 'TUSSEN' | 'AVOND' | 'NACHT';

export interface ShiftConfig {
  label: string;
  code: string; // e.g., L8bg
  startTime: string;
  endTime: string;
  breakTime: string; // Approximate time for break start
  resumeTime: string; // Approximate time for break end
}

export interface Shift {
  id: string;
  date: string; // YYYY-MM-DD
  type: ShiftType;
  location: string;
}

export interface CalendarDay {
  date: Date;
  isoDate: string; // YYYY-MM-DD
  dayName: string; // M, D, W, etc.
  dayNumber: number;
}
