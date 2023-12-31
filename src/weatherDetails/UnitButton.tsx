import { Units } from "../types";
import "./UnitButtons.css";

type UnitButtonProps = {
  label: string;
  onUnitChange: (activeUnit: Units) => void;
  activeUnit: string;
};

export const UnitButton = ({
  label,
  onUnitChange,
  activeUnit,
}: UnitButtonProps) => {
  return (
    <button
      className={`top-button ${activeUnit === label ? "active" : ""}`}
      onClick={() => onUnitChange(label === "C" ? "metric" : "imperial")}
    >{`°${label}`}</button>
  );
};
