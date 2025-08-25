import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { starcontext } from "../../contexts/starcontext";

export function Singleplanets() {
  let navigate = useNavigate();
  let [currentPlanet, setcurrentPlanet] = useState({});
  let [moreinfodisplay, setmoreinfodisplay] = useState(false);
  let [residentsData, setResidentsData] = useState([]);
  let { pln } = useParams();
  console.log(pln);

  useEffect(() => {
    const fetchsdata = async () => {
      try {
        console.log("selected planet", pln);
        const response = await fetch(`https://swapi.info/api/planets/${pln}`);
        const data = await response.json();
        setcurrentPlanet(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchsdata();
  }, []);

  useEffect(() => {
    if (currentPlanet.residents && currentPlanet.residents.length > 0) {
      const planetResidents = currentPlanet.residents;
      let mrd = planetResidents.map((url) => Number(url.split("/").pop()));
      console.log("Array Url ids", mrd);

      const fetchResidentNames = async () => {
        const results = await Promise.allSettled(
          planetResidents.map((url) => fetch(url).then((res) => res.json()))
        );
        const fulfilledResults = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => ({
            name: result.value.name,
            url: result.value.url,
          }));
        setResidentsData(fulfilledResults);
      };
      fetchResidentNames();
    }
  }, [currentPlanet.residents]);

  return (
    <>
      <div className="stats_main bgs2">
        <div className="stats_main_item">
          <h1>PLANET</h1>
          <div>
            Name: <span className="stats_main_h2">{currentPlanet.name}</span>
          </div>
          <div>
            Rotation Period:{" "}
            <span className="stats_main_h2">
              {currentPlanet.rotation_period}
            </span>
          </div>
          <div>
            Orbital Period:{" "}
            <span className="stats_main_h2">
              {currentPlanet.orbital_period}
            </span>
          </div>
          <div>
            Diameter:{" "}
            <span className="stats_main_h2">{currentPlanet.diameter}</span>
          </div>
          <div>
            Climate:{" "}
            <span className="stats_main_h2">{currentPlanet.climate}</span>
          </div>
          <div>
            Gravity:{" "}
            <span className="stats_main_h2">{currentPlanet.gravity}</span>
          </div>
          <div>
            Terrain:{" "}
            <span className="stats_main_h2">{currentPlanet.terrain}</span>
          </div>
          <div>
            Surface Water:{" "}
            <span className="stats_main_h2">{currentPlanet.surface_water}</span>
          </div>
          <div>
            Population:{" "}
            <span className="stats_main_h2">{currentPlanet.population}</span>
          </div>
          <div
            className="pcount morecursor m1"
            onClick={async () => {
              console.log("more info");
              setmoreinfodisplay(true);
            }}
          >
            More Info➡️
          </div>
          <div onClick={() => navigate(-1)} className="card_1">
            <div>Back</div>
          </div>
        </div>

        {moreinfodisplay && (
          <div className="stats_main_item">
            <h3>Residents:</h3>
            {residentsData.length > 0 ? (
              <ul>
                {residentsData.map((resident, index) => (
                  <li
                    key={index}
                    className="morecursor"
                    onClick={() => {
                      console.log("navigate to resident");
                      navigate(`/people/${resident.url.split("/").pop()}`);
                    }}
                  >
                    {resident.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No residents found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
