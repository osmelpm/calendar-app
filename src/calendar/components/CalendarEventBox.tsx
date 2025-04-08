import { EventProps } from "react-big-calendar";

import { CalendarEvent } from "../../store";

export const CalendarEventBox = ({ event }: EventProps<CalendarEvent>) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <span>- {user.name}</span>
    </>
  );
};
