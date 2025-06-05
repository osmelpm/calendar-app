import { parseISO } from "date-fns";
import { EventApiResp } from "../hooks";

export const formatEvents = (events: EventApiResp[]) => {
  return events.map((e) => {
    const start = parseISO(e.start);
    const end = parseISO(e.end);
    return {
      ...e,
      start,
      end,
    };
  });
};
