import { Outlet } from "react-router";
import { starcontext } from "../../contexts/starcontext";
import { useContext, useEffect } from "react";
import { Message } from "../../utils/Message";
import { Listdisplayer } from "../../components/Listdisplayer";

export function Planets() {
  let { planetsList, setplanetsList } = useContext(starcontext);
  useEffect(() => {
    fetch("https://swapi.info/api/planets")
      .then((response) => response.json())
      .then((data) => {
        console.log("fetched planets data:");
        setplanetsList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="tdl">PLANETS</div>
      {planetsList.length > 0 ? (
        <Listdisplayer slist={planetsList} pageSource={"planets"} />
      ) : (
        <Message mes={`No People data to be displayed yet`} />
      )}
      <Outlet />
    </>
  );
}
