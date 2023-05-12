const ProgressBar = ({ value }) => {
  return (
    <div className="highlight-additional">
      <div className="slider-numbers">
        <p style={{ margin: "0" }}>0</p>
        <p style={{ margin: "0" }}>50</p>
        <p style={{ margin: "0" }}>100</p>
      </div>
      <div className="slider">
        <div className="slider-value" style={{ width: `${value}%` }}></div>
      </div>
      <p style={{ width: "70%", margin: "0", textAlign: "right" }}>%</p>
    </div>
  );
};

export default ProgressBar;
