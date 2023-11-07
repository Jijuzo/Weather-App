import "./ErrorAlert.css";

const errorAlertText =
  "Something went wrong while downloading weather information. Please check your internet connection and try again.";

export const ErrorAlert = ({ error }) => {
  return error ? <div className="error-alert">{errorAlertText}</div> : null;
};
