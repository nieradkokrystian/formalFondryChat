import { useDispatch, useSelector } from "react-redux";
import { logActions } from "../../store/features/logSlice";

const LogsFiltersTags = () => {
  const dispatch = useDispatch();
  const avTags = useSelector((s) => s.log.avTags);
  const tags = useSelector((s) => s.log.filters.tags);

  const allSelected = avTags.length > 0 && avTags.length === tags.length;

  const handleToggleAll = () => {
    if (allSelected) {
      tags.forEach((tag) => dispatch(logActions.setTagFilter(tag)));
    } else {
      avTags.forEach((tag) => {
        if (!tags.includes(tag)) {
          dispatch(logActions.setTagFilter(tag));
        }
      });
    }
  };

  return (
    <div className="logs-filters-tags">
      {!avTags.length && (
        <span className="log-filters-tags-empty">No tags to filter</span>
      )}

      {avTags.length > 0 && (
        <>
          <div className="logs-filters-tags-header">
            <button
              className="logs-filters-tags-toggle-all"
              onClick={handleToggleAll}
              type="button"
            >
              {allSelected ? "Unselect All" : "Select All"}
            </button>
          </div>

          <div className="logs-filters-tags-grid">
            {avTags.map((tag) => (
              <div key={tag} className="logs-filters-tags-item">
                <input
                  name={tag}
                  id={tag}
                  className="logs-filters-tags-checkbox"
                  type="checkbox"
                  checked={tags.includes(tag)}
                  value={tag}
                  onChange={(e) =>
                    dispatch(logActions.setTagFilter(e.target.value))
                  }
                />
                <label className="logs-filters-tags-label" htmlFor={tag}>
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LogsFiltersTags;
