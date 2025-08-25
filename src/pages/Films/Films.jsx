import { Outlet } from "react-router";
import { starcontext } from "../../contexts/starcontext";
import { useContext, useEffect } from "react";
import { Message } from "../../utils/Message";
import { Listdisplayer } from "../../components/Listdisplayer";

export function Films() {
  let { filmsList, setfilmsList } = useContext(starcontext);
  useEffect(() => {
    fetch("https://swapi.info/api/films")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setfilmsList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="tdl">FILMS</div>
      {filmsList.length > 0 ? (
        <Listdisplayer slist={filmsList} pageSource={"films"} />
      ) : (
        <Message mes={`No People data to be displayed yet`} />
      )}
      <Outlet />
    </>
  );
}
