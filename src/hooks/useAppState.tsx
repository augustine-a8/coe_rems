import { useContext } from "react";

import { AppContext } from "../context";

export default function useAppState() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppState hook should be called in AppStateProvider");
  }

  return context;
}
