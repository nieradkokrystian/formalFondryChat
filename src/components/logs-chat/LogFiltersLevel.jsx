import { useDispatch, useSelector } from "react-redux";
import { logActions } from "../../store/features/logSlice";

const LogFiltersLevel = () => {
  const dispatch = useDispatch();
  const level = useSelector((s) => s.log.filters.level);

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
        value={level || ""}
        onChange={(e) => dispatch(logActions.setLevelFilter(+e.target.value))}
      />
    </div>
  );
};

export default LogFiltersLevel;
