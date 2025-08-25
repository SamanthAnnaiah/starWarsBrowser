import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";

export function Singlespecies() {
  let navigate = useNavigate();
  let [currentSpecies, setcurrentSpecies] = useState({});
  let [moreinfodisplay, setmoreinfodisplay] = useState(false);
  let [peopleData, setPeopleData] = useState([]);
  let [homeworldName, setHomeworldName] = useState("");
  let { spc } = useParams();
  console.log(spc);

  useEffect(() => {
    const fetchsdata = async () => {
      try {
        console.log("selected film", spc);
        const response = await fetch(`https://swapi.info/api/species/${spc}`);
        const data = await response.json();
        setcurrentSpecies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchsdata();
  }, [spc]);

  useEffect(() => {
    if (currentSpecies.people && currentSpecies.people.length > 0) {
      const speciesPeople = currentSpecies.people;

      const fetchPeopleNames = async () => {
        const results = await Promise.allSettled(
          speciesPeople.map((url) => fetch(url).then((res) => res.json()))
        );
        const fulfilledResults = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => {
            return { name: result.value.name, url: result.value.url };
          });
        setPeopleData(fulfilledResults);
      };
      fetchPeopleNames();
    }
  }, [currentSpecies.people]);

  useEffect(() => {
    if (currentSpecies.homeworld) {
      const fetchHomeworld = async () => {
        try {
          const hwRes = await fetch(currentSpecies.homeworld);
          const hwData = await hwRes.json();
          setHomeworldName(hwData.name);
        } catch (error) {
          console.error(error); // Log the error for debugging
          setHomeworldName("Unknown");
        }
      };
      fetchHomeworld();
    } else {
      setHomeworldName("Unknown");
    }
  }, [currentSpecies.homeworld]);

  return (
    <>
      <div className="stats_main bgs3">
        <div className="stats_main_item">
          <h1>SPECIES</h1>
          <div>
            Name: <span className="stats_main_h2">{currentSpecies.name}</span>
          </div>
          <div>
            Classification:{" "}
            <span className="stats_main_h2">
              {currentSpecies.classification}
            </span>
          </div>
          <div>
            Designation:{" "}
            <span className="stats_main_h2">{currentSpecies.designation}</span>
          </div>
          <div>
            Average Height:{" "}
            <span className="stats_main_h2">
              {currentSpecies.average_height}
            </span>
          </div>
          <div>
            Skin Colors:{" "}
            <span className="stats_main_h2">{currentSpecies.skin_colors}</span>
          </div>
          <div>
            Hair Colors:{" "}
            <span className="stats_main_h2">{currentSpecies.hair_colors}</span>
          </div>
          <div>
            Eye Colors:{" "}
            <span className="stats_main_h2">{currentSpecies.eye_colors}</span>
          </div>
          <div>
            Average Lifespan:{" "}
            <span className="stats_main_h2">
              {currentSpecies.average_lifespan}
            </span>
          </div>
          <div>
            Language:{" "}
            <span className="stats_main_h2">{currentSpecies.language}</span>
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
            <span>Homeworld:</span>
            <div className="stats_main_h2">
              {homeworldName ? homeworldName : "Unknown"}
            </div>
            <h3>People:</h3>
            {peopleData.length > 0 ? (
              <ul>
                {peopleData.map((person, index) => (
                  <li
                    key={index}
                    className="morecursor"
                    onClick={() => {
                      console.log("navigate to person");
                      navigate(`/people/${person.url.split("/").pop()}`);
                    }}
                  >
                    {person.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No people found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
