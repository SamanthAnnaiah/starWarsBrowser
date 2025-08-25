import { Outlet } from "react-router";
import { starcontext } from "../../contexts/starcontext";
import { useContext, useEffect } from "react";
import { Message } from "../../utils/Message";
import { Listdisplayer } from "../../components/Listdisplayer";

export function Vehicles() {
  let { vehiclesList, setvehiclesList } = useContext(starcontext);
  useEffect(() => {
    fetch("https://swapi.info/api/vehicles")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setvehiclesList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="tdl">VEHICLES</div>
      {vehiclesList.length > 0 ? (
        <Listdisplayer slist={vehiclesList} pageSource={"vehicles"} />
      ) : (
        <Message mes={`No People data to be displayed yet`} />
      )}
      <Outlet />
    </>
  );
}
