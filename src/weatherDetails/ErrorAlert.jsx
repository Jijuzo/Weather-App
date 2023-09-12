import "./ErrorAlert.css";

const smthWrongText =
  "Something went wrong while downloading weather information. Please check your internet connection and try again.";

export const ErrorAlert = ({ error }) => {
  return error ? <div className="error-alert">{smthWrongText}</div> : null;
};
