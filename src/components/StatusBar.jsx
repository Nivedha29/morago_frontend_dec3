/* ------------------------- STATUS BAR ------------------------- */
const StatusBar = () => {
  return (
    <div className="status-bar">
      <span className="status-time">9:41</span>

      <div className="status-icons">
        {/* SIGNAL */}
        <div className="icon-signal">
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* Filled iOS-style WIFI */}
        <div className="icon-wifi-filled" />

        {/* BATTERY */}
        <div className="icon-battery">
          <div className="battery-body">
            <div className="battery-level" />
          </div>
          <div className="battery-cap" />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;