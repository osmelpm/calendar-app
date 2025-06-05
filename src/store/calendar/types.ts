export type CalendarEvent = {
  id?: string;
  title: string;
  notes?: string | undefined;
  start: Date;
  end: Date;
  user: {
    _id: string;
    name: string;
  };
};

export type CalendarState = {
  events: CalendarEvent[];
  isLoadingEvents: boolean;
  activeEvent: CalendarEvent | null;
};
