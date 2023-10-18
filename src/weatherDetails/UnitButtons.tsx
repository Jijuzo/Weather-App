import "./UnitButtons.css";

type UnitButtonsProps = {
  currentUnit: string;
  onSetUnits: React.Dispatch<React.SetStateAction<string>>;
  setCurrentUnit: React.Dispatch<React.SetStateAction<string>>;
};

export const UnitButtons = ({
  currentUnit,
  onSetUnits,
  setCurrentUnit,
}: UnitButtonsProps) => {
  const onUnitChange = (activeId: string, units: string) => {
    setCurrentUnit(activeId);
    onSetUnits(units);
  };

  return (
    <div className="unit-buttons">
      {["C", "F"].map((unit) => (
        <button
          key={`button-${unit}`}
          onClick={() =>
            onUnitChange(`button-${unit}`, unit === "C" ? "metric" : "imperial")
          }
          className={`top-button ${
            currentUnit === `button-${unit}` ? "active" : ""
          }`}
          id={`button-${unit}`}
        >{`°${unit}`}</button>
      ))}
    </div>
  );
};
