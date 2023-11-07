import "./ProgressBar.css";

export const ProgressBar = ({ value }) => {
  return (
    <div className="highlight-additional">
      <div className="slider-numbers">
        <p className="slider-number">0</p>
        <p className="slider-number">50</p>
        <p className="slider-number">100</p>
      </div>
      <div className="slider">
        <div className="slider-value" style={{ width: `${value}%` }}></div>
      </div>
      <p className="slider-percent-char">%</p>
    </div>
  );
};
