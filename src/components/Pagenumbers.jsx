import { memo } from "react";
import { Pills } from "../utils/Pills";

export const Pagenumbers = memo(({ handlePageIndexload, totalPages }) => {
  return (
    <div onClick={handlePageIndexload} className="pagenumber_main">
      {[...Array(totalPages)].map((_, index) => (
        <Pills key={index} pnum={index + 1} />
      ))}
    </div>
  );
});
