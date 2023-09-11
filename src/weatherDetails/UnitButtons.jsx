import "./UnitButtons.css";

export const UnitButtons = ({ currentUnit, onSetUnits, setCurrentUnit }) => {
  const onUnitChange = (activeId, units) => {
    setCurrentUnit(activeId);
    onSetUnits(units);
  };

  return (
    <div className="unit-buttons">
      <button
        onClick={(e) => {
          onUnitChange(e.target.id, "metric");
        }}
        className={`${currentUnit === "button-C" ? "active" : ""} top-button`}
        id={`button-C`}
      >
        °C
      </button>
      <button
        onClick={(e) => {
          onUnitChange(e.target.id, "imperial");
        }}
        className={`${currentUnit === "button-F" ? "active" : ""} top-button`}
        id={`button-F`}
      >
        °F
      </button>
    </div>
  );
};
