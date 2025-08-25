import { useCallback, useContext, useEffect, useState } from "react";
import { starcontext } from "../contexts/starcontext";

import { Pagenumbers } from "./Pagenumbers";
import { Objectview } from "../utils/Objectview";
import { useNavigate } from "react-router";

export function Listdisplayer({ slist, pageSource }) {
  let { itemsPerPage } = useContext(starcontext);
  let [totalPages, settotalPages] = useState(0);
  let [startindex, setstartindex] = useState(0);
  let [stopindex, setstopindex] = useState(0);
  useEffect(() => {
    settotalPages(Math.ceil(slist.length / itemsPerPage));
  }, [slist, itemsPerPage]);
  useEffect(() => {
    setstartindex(0);
    setstopindex(itemsPerPage);
  }, [totalPages, itemsPerPage]);
  let navigate = useNavigate();

  const handlePageIndexload = useCallback(
    (e) => {
      let pageitemClicked = parseInt(e.target.dataset.pnum);
      if (!isNaN(pageitemClicked)) {
        setstartindex((pageitemClicked - 1) * itemsPerPage);
        setstopindex(pageitemClicked * itemsPerPage);
      }
    },
    [itemsPerPage]
  );
  const handleCardItemClick = (e) => {
    const cardItem = e.target.closest(".card_1_sub");
    if (cardItem) {
      console.log(cardItem.dataset.sourcetype);
      console.log(cardItem.dataset.source);
      navigate(`${cardItem.dataset.source}`);
    }
  };
  return (
    <>
      <div className="pcount">
        {slist.length} {pageSource}{" "}
      </div>
      <Pagenumbers
        handlePageIndexload={handlePageIndexload}
        totalPages={totalPages}
      />
      <div className="card_1" onClick={handleCardItemClick}>
        {slist.slice(startindex, stopindex).map((item, index) => {
          console.log("current selection:", slist[index].url.split("/").pop());
          return (
            <div
              key={item[0]}
              className="card_1_sub"
              data-sourcetype={pageSource}
              // data-source={slist.indexOf(item) + 1}
              data-source={item.url.split("/").pop()}
            >
              <Objectview item={item} />
              {item.url.split("/").pop()}
            </div>
          );
        })}
      </div>
    </>
  );
}
