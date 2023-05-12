import { useEffect, useState } from "react";

const UnitButtons = ({ setUnits }) => {
  const [ChildUnits, setChildUnits] = useState("metric");
  const [active, setActive] = useState("button-C");

  useEffect(() => {
    setUnits(ChildUnits);
  }, [ChildUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="unit-buttons">
      <button
        onClick={(e) => {
          setChildUnits("metric");
          setActive(e.target.id);
        }}
        className={`${active === "button-C" ? "active" : ""} top-button`}
        id={`button-C`}
      >
        °C
      </button>
      <button
        onClick={(e) => {
          setChildUnits("imperial");
          setActive(e.target.id);
        }}
        className={`${active === "button-F" ? "active" : ""} top-button`}
        id={`button-F`}
      >
        °F
      </button>
    </div>
  );
};

export default UnitButtons;
