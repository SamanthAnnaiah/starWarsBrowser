import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { starcontext } from "./starcontext";

export function StarContexterProvider({ children }) {
  let [itemsPerPage, setitemsPerPage] = useState(12);

  let [peopleList, setpeopleList] = useState({});
  let [filmsList, setfilmsList] = useState({});
  let [planetsList, setplanetsList] = useState({});
  let [speciesList, setspeciesList] = useState({});
  let [starshipsList, setstarshipsList] = useState({});
  let [vehiclesList, setvehiclesList] = useState({});
  return (
    <starcontext.Provider
      value={{
        peopleList,
        setpeopleList,
        itemsPerPage,
        setitemsPerPage,
        filmsList,
        setfilmsList,
        planetsList,
        setplanetsList,
        speciesList,
        setspeciesList,
        starshipsList,
        setstarshipsList,
        vehiclesList,
        setvehiclesList,
      }}
    >
      {children}
    </starcontext.Provider>
  );
}
