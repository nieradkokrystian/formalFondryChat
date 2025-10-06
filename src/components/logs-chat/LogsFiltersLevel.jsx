import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logActions } from "../../store/features/logSlice";

const LogsFiltersLevel = () => {
  const dispatch = useDispatch();
  const level = useSelector((s) => s.log.filters.level);
  const [localLevel, setLocalLevel] = useState(level || "");

  useEffect(() => {
    setLocalLevel(level || "");
  }, [level]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const numVal = localLevel === "" ? 20 : +localLevel;

      if (numVal !== level) {
        dispatch(logActions.setLevelFilter(numVal));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, localLevel, level]);

  return (
    <div className="log-filters-level">
      <label className="log-filters-level-label" htmlFor="level">
        Level
      </label>
      <input
        name="level"
        id="level"
        className="log-filters-level-input"
        type="number"
        value={localLevel || ""}
        onChange={(e) => setLocalLevel(+e.target.value)}
      />
    </div>
  );
};

export default LogsFiltersLevel;
