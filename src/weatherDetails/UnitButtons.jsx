import "./UnitButtons.css";

export const UnitButtons = ({ isUnitActive, onSetUnits, setIsUnitActive }) => {
  const onUnitChange = (activeId, units) => {
    setIsUnitActive(activeId);
    onSetUnits(units);
  };

  return (
    <div className="unit-buttons">
      <button
        onClick={(e) => {
          onUnitChange(e.target.id, "metric");
        }}
        className={`${isUnitActive === "button-C" ? "active" : ""} top-button`}
        id={`button-C`}
      >
        °C
      </button>
      <button
        onClick={(e) => {
          onUnitChange(e.target.id, "imperial");
        }}
        className={`${isUnitActive === "button-F" ? "active" : ""} top-button`}
        id={`button-F`}
      >
        °F
      </button>
    </div>
  );
};
