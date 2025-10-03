import { useDispatch, useSelector } from "react-redux";
import { logActions } from "../../store/features/logSlice";

const LogFiltersTags = () => {
  const dispatch = useDispatch();
  const avTags = useSelector((s) => s.log.avTags);
  const tags = useSelector((s) => s.log.filters.tags);

  return (
    <ul className="logs-filters-tags">
      {!avTags.length && (
        <span className="log-filters-tags-empty">No tags to filter</span>
      )}
      {avTags.map((tag) => (
        <li key={tag} className="logs-filters-tags-item">
          <input
            name={tag}
            id={tag}
            className="logs-filters-tags-checkbox"
            type="checkbox"
            checked={tags.includes(tag)}
            value={tag}
            onChange={(e) => dispatch(logActions.setTagFilter(e.target.value))}
          />
          <label className="logs-filters-tags-label" htmlFor={tag}>
            {tag}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default LogFiltersTags;
