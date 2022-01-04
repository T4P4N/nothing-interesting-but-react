import * as React from "react";

const Shimmer = (idx) => {
  return (
    <div className="shimmer-posts" key={idx}>
      <h4 className="shimmer-title shimmer">111</h4>

      <p className="shimmer-author shimmer" data-testid="author">
        000
      </p>
      <p className="shimmer-points shimmer">000</p>
    </div>
  );
};

export default Shimmer;
