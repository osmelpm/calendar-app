import { useDispatch, useSelector } from "react-redux";

import {
  RootState,
  AppDispatch,
  onOpenDateModal,
  onCloseDateModal,
} from "../store";

export const useUiStore = () => {
  const { isDateModalOpen } = useSelector((store: RootState) => store.ui);
  const dispatch = useDispatch<AppDispatch>();

  const openDateModal = () => dispatch(onOpenDateModal());
  const closeDateModal = () => dispatch(onCloseDateModal());

  return {
    //* Properties
    isDateModalOpen,
    //* Methods
    openDateModal,
    closeDateModal,
  };
};
