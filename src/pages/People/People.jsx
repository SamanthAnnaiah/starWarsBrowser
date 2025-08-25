import { Outlet } from "react-router";
import { starcontext } from "../../contexts/starcontext";
import { useContext, useEffect } from "react";
import { Message } from "../../utils/Message";
import { Listdisplayer } from "../../components/Listdisplayer";

export function People() {
  let { peopleList, setpeopleList } = useContext(starcontext);
  useEffect(() => {
    fetch("https://swapi.info/api/people")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setpeopleList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="tdl">PEOPLE</div>
      {peopleList.length > 0 ? (
        <Listdisplayer slist={peopleList} pageSource={"people"} />
      ) : (
        <Message mes={`No People data to be displayed yet`} />
      )}
      <Outlet />
    </>
  );
}
