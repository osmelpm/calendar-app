import { useEffect, useMemo, useState } from "react";

import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import { CalendarEvent } from "../../store";
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const initialState: CalendarEvent = {
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    _id: "1",
    name: "John Doe",
  },
};

export const CalendarModal = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValue, setFormValue] = useState(initialState);
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  useEffect(() => {
    if (activeEvent) setFormValue({ ...activeEvent });
  }, [activeEvent]);

  const classLabel = useMemo(() => {
    if (!formSubmitted) return "";

    if (!formValue.title) return "is-invalid";
  }, [formSubmitted, formValue.title]);

  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event: Date | null, field: "start" | "end") => {
    setFormValue({
      ...formValue,
      [field]: event,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValue.end, formValue.start);

    if (isNaN(difference) || difference < 0) {
      Swal.fire("Dates are incorrect!", undefined, "error");
      return;
    }

    if (!formValue.title) return;

    await startSavingEvent(formValue);
    closeDateModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      className="modal"
      overlayClassName="modal-bg"
      closeTimeoutMS={200}
      isOpen={isDateModalOpen}
      onRequestClose={closeDateModal}
      style={customStyles}
    >
      <h1> New Event </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2 d-flex flex-column">
          <label className="mb-1">Start Date</label>
          <DatePicker
            dateFormat="Pp"
            showTimeSelect
            className="form-control"
            selected={formValue.start}
            onChange={(e) => onDateChange(e, "start")}
          />
        </div>

        <div className="form-group mb-2 d-flex flex-column">
          <label className="mb-1">End Date</label>
          <DatePicker
            dateFormat="Pp"
            showTimeSelect
            minDate={formValue.start}
            className="form-control"
            selected={formValue.end}
            onChange={(e) => onDateChange(e, "end")}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Title and notes</label>
          <input
            type="text"
            className={`form-control ${classLabel}`}
            placeholder="Event Title"
            name="title"
            value={formValue.title}
            onChange={onInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Some small description
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notes"
            rows={5}
            name="notes"
            value={formValue.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Additional information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};
