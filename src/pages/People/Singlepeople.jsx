import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";

export function Singlepeople() {
  let navigate = useNavigate();
  let [currentPerson, setcurrentPerson] = useState({});
  let [moreinfodisplay, setmoreinfodisplay] = useState(false);
  let [filmsData, setfilmsData] = useState([]);
  let [homeworldName, setHomeworldName] = useState("");
  let { ppl } = useParams();

  useEffect(() => {
    const fetchsdata = async () => {
      try {
        console.log("selected people", ppl);
        const response = await fetch(`https://swapi.info/api/people/${ppl}`);
        const data = await response.json();
        setcurrentPerson(data);
      } catch (error) {
        console.error("Error fetching C-3PO data:", error);
      }
    };
    fetchsdata();
  }, [ppl]);

  useEffect(() => {
    if (currentPerson.films && currentPerson.films.length > 0) {
      const personfilms = currentPerson.films;

      const fetchFilmNames = async () => {
        const results = await Promise.allSettled(
          personfilms.map((url) => fetch(url).then((res) => res.json()))
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
  }, [currentPerson.films]);

  useEffect(() => {
    if (currentPerson.homeworld) {
      const fetchHomeworld = async () => {
        try {
          const hwRes = await fetch(currentPerson.homeworld);
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
  }, [currentPerson.homeworld]);

  return (
    <>
      <div className="stats_main bgs1">
        <div className="stats_main_item">
          <h1>PERSON</h1>
          <div>
            Name: <span className="stats_main_h2">{currentPerson.name}</span>
          </div>
          <div>
            Mass: <span className="stats_main_h2">{currentPerson.mass}</span>
          </div>
          <div>
            Hair Color:{" "}
            <span className="stats_main_h2">{currentPerson.hair_color}</span>
          </div>
          <div>
            Birth year:{" "}
            <span className="stats_main_h2">{currentPerson.birth_year}</span>
          </div>
          <div>
            Gender:{" "}
            <span className="stats_main_h2">{currentPerson.gender}</span>
          </div>
          <div>
            Skin color:{" "}
            <span className="stats_main_h2">{currentPerson.skin_color}</span>
          </div>
          <div>
            Eye color:{" "}
            <span className="stats_main_h2">{currentPerson.eye_color}</span>
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
            <h3>Films:</h3>
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
