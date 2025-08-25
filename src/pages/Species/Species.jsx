import { Outlet } from "react-router";
import { starcontext } from "../../contexts/starcontext";
import { useContext, useEffect } from "react";
import { Message } from "../../utils/Message";
import { Listdisplayer } from "../../components/Listdisplayer";

export function Species() {
  let { speciesList, setspeciesList } = useContext(starcontext);
  useEffect(() => {
    fetch("https://swapi.info/api/species")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setspeciesList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="tdl">SPECIES</div>
      {speciesList.length > 0 ? (
        <Listdisplayer slist={speciesList} pageSource={"species"} />
      ) : (
        <Message mes={`No People data to be displayed yet`} />
      )}
      <Outlet />
    </>
  );
}
