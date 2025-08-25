import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";

export function Singlevehicles() {
  let navigate = useNavigate();
  let [currentVehicle, setcurrentVehicle] = useState({});
  let [moreinfodisplay, setmoreinfodisplay] = useState(false);
  let [filmsData, setfilmsData] = useState([]);
  let { vhv } = useParams();

  useEffect(() => {
    const fetchsdata = async () => {
      try {
        console.log("selected vehicle", vhv);
        const response = await fetch(`https://swapi.info/api/vehicles/${vhv}`);
        const data = await response.json();
        setcurrentVehicle(data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };
    fetchsdata();
  }, [vhv]);

  useEffect(() => {
    if (currentVehicle.films && currentVehicle.films.length > 0) {
      const vehicleFilms = currentVehicle.films;
      const fetchFilmNames = async () => {
        const results = await Promise.allSettled(
          vehicleFilms.map((url) => fetch(url).then((res) => res.json()))
        );
        const fulfilledResults = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => ({
            title: result.value.title,
            url: result.value.url,
          }));
        setfilmsData(fulfilledResults);
      };
      fetchFilmNames();
    }
  }, [currentVehicle.films]);

  return (
    <>
      <div className="stats_main bgs1">
        <div className="stats_main_item">
          <h1>VEHICLE</h1>
          <div>
            Name: <span className="stats_main_h2">{currentVehicle.name}</span>
          </div>
          <div>
            Model: <span className="stats_main_h2">{currentVehicle.model}</span>
          </div>
          <div>
            Manufacturer:{" "}
            <span className="stats_main_h2">{currentVehicle.manufacturer}</span>
          </div>
          <div>
            Cost in credits:{" "}
            <span className="stats_main_h2">
              {currentVehicle.cost_in_credits}
            </span>
          </div>
          <div>
            Length:{" "}
            <span className="stats_main_h2">{currentVehicle.length}</span>
          </div>
          <div>
            Max atmosphering speed:{" "}
            <span className="stats_main_h2">
              {currentVehicle.max_atmosphering_speed}
            </span>
          </div>
          <div>
            Crew: <span className="stats_main_h2">{currentVehicle.crew}</span>
          </div>
          <div>
            Passengers:{" "}
            <span className="stats_main_h2">{currentVehicle.passengers}</span>
          </div>
          <div>
            Cargo Capacity:{" "}
            <span className="stats_main_h2">
              {currentVehicle.cargo_capacity}
            </span>
          </div>
          <div>
            Consumables:{" "}
            <span className="stats_main_h2">{currentVehicle.consumables}</span>
          </div>
          <div>
            Vehicle Class:{" "}
            <span className="stats_main_h2">
              {currentVehicle.vehicle_class}
            </span>
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
            <h3>Appeared Films:</h3>
            {filmsData.length > 0 ? (
              <ul>
                {filmsData.map((film, index) => (
                  <li
                    key={index}
                    className="morecursor"
                    onClick={() => {
                      console.log("navigate to film");
                      navigate(`/films/${film.url.split("/").pop()}`);
                    }}
                  >
                    {film.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No films found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
