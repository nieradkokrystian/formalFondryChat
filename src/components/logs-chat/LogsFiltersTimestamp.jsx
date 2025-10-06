import { useDispatch, useSelector } from "react-redux";
import { logActions } from "../../store/features/logSlice";

const LogsFiltersTimestamp = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector((s) => s.log.filters.sortOrder);

  return (
    <ul className="logs-filters-dropdown">
      <li
        className={sortOrder === "desc" ? "active" : ""}
        onClick={() => dispatch(logActions.setSortOrder("desc"))}
      >
        From newest to oldest
      </li>

      <li
        className={sortOrder === "asc" ? "active" : ""}
        onClick={() => dispatch(logActions.setSortOrder("asc"))}
      >
        From oldest to newest
      </li>
    </ul>
  );
};

export default LogsFiltersTimestamp;
