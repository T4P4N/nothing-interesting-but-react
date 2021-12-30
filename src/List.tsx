import React from "react";
import { ChevronUp, User, X } from "react-feather";
import { sortBy } from "lodash";

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

const Item = ({ item, onRemoveItem }: ItemProps) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
    console.log("Removed --> " + item.title);
  };

  return (
    <div key={item.objectID} className="posts">
      <h4 className="title">
        <button
          type="button"
          onClick={handleRemoveItem}
          data-testid="remove-btn"
        >
          <X height="15px" width="15px" className="x-btn" />
        </button>
        <a href={item.url}>{item.title}</a>
      </h4>

      <p className="author" data-testid="author">
        <User size={14} /> {item.author}
      </p>
      <p className="points">
        <ChevronUp /> {item.points}
      </p>
    </div>
  );
};

type ListProps = {
  // list: Stories;
  data: Stories;
  onRemoveItem: (item: Story) => void;
};

const List = ({ data, onRemoveItem }: ListProps) => {
  // Sorting
  const [sort, setSort] = React.useState({ sortKey: "NONE", is_rev: false });
  // Sorting
  const SORTS = {
    NONE: (list) => list,
    TITLE: (list) => sortBy(list, "title"),
    AUTHOR: (list) => sortBy(list, "author"),
    COMMENT: (list) => sortBy(list, "num_comments").reverse(),
    POINT: (list) => sortBy(list, "points").reverse()
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.is_rev
    ? sortFunction(data).reverse()
    : sortFunction(data);

  const handleSbt = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.is_rev;
    setSort({ sortKey: sortKey, is_rev: isReverse });
  };

  const handleClear = () => {
    setSort({ sortKey: "NONE" });
  };
  return (
    <>
      {sort.sortKey !== "NONE" ? (
        <button className="rm-btn" onClick={() => handleClear()}>
          Remove Filter
        </button>
      ) : (
        <></>
      )}

      <div className="filters">
        <button
          className={
            !sort.is_rev && sort.sortKey === "TITLE"
              ? "sort-btn-active sort-btn-asc"
              : sort.is_rev && sort.sortKey === "TITLE"
              ? "sort-btn-active sort-btn-des"
              : "sort-btn"
          }
          onClick={() => handleSbt("TITLE")}
        >
          Title
        </button>

        <button
          className={
            !sort.is_rev && sort.sortKey === "AUTHOR"
              ? "sort-btn-active sort-btn-asc"
              : sort.is_rev && sort.sortKey === "AUTHOR"
              ? "sort-btn-active sort-btn-des"
              : "sort-btn"
          }
          onClick={() => handleSbt("AUTHOR")}
        >
          Author
        </button>

        <button
          className={
            !sort.is_rev && sort.sortKey === "POINT"
              ? "sort-btn-active sort-btn-asc"
              : sort.is_rev && sort.sortKey === "POINT"
              ? "sort-btn-active sort-btn-des"
              : "sort-btn"
          }
          onClick={() => handleSbt("POINT")}
        >
          points
        </button>

        <button
          className={
            !sort.is_rev && sort.sortKey === "COMMENT"
              ? "sort-btn-active sort-btn-asc"
              : sort.is_rev && sort.sortKey === "COMMENT"
              ? "sort-btn-active sort-btn-des"
              : "sort-btn"
          }
          onClick={() => handleSbt("COMMENT")}
        >
          comments
        </button>
      </div>

      {sortedList.map((item: object) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </>
  );
};

export default List;
