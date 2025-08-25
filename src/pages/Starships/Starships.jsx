import { Outlet } from "react-router";
import { starcontext } from "../../contexts/starcontext";
import { useContext, useEffect } from "react";
import { Message } from "../../utils/Message";
import { Listdisplayer } from "../../components/Listdisplayer";

export function Starships() {
  let { starshipsList, setstarshipsList } = useContext(starcontext);
  useEffect(() => {
    fetch("https://swapi.info/api/starships")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setstarshipsList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="tdl">STARSHIPS</div>
      {starshipsList.length > 0 ? (
        <Listdisplayer slist={starshipsList} pageSource={"starships"} />
      ) : (
        <Message mes={`No People data to be displayed yet`} />
      )}
      <Outlet />
    </>
  );
}
