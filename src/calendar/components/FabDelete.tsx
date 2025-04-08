import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { isDateModalOpen } = useUiStore();
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleClickEvent = () => startDeletingEvent();

  return (
    <button
      className="btn btn-danger fab-danger"
      style={{ display: hasEventSelected && !isDateModalOpen ? "" : "none" }}
      onClick={handleClickEvent}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
