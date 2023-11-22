import "./UnitButtons.css";

type UnitButtonProp = {
  label: string;
  onUnitChange: (activeUnit: string) => void;
  activeUnit: string;
};

export const UnitButton = ({
  label,
  onUnitChange,
  activeUnit,
}: UnitButtonProp) => {
  return (
    <button
      className={`top-button ${activeUnit === label ? "active" : ""}`}
      onClick={() => onUnitChange(label)}
    >{`°${label}`}</button>
  );
};
