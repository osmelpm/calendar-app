export type CalendarEvent = {
  _id?: number;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: {
    _id: string;
    name: string;
  };
};

export type CalendarState = {
  events: CalendarEvent[];
  activeEvent: CalendarEvent | null;
};
