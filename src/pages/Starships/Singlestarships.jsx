import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";

export function Singlestarships() {
  let navigate = useNavigate();
  let [currentStarship, setcurrentStarship] = useState({});
  let [moreinfodisplay, setmoreinfodisplay] = useState(false);
  let [filmsData, setfilmsData] = useState([]);
  let { stp } = useParams();

  useEffect(() => {
    const fetchsdata = async () => {
      try {
        console.log("selected starship", stp);
        const response = await fetch(`https://swapi.info/api/starships/${stp}`);
        const data = await response.json();
        setcurrentStarship(data);
      } catch (error) {
        console.error("Error fetching starship data:", error);
      }
    };
    fetchsdata();
  }, [stp]);

  useEffect(() => {
    if (currentStarship.films && currentStarship.films.length > 0) {
      const starshipFilms = currentStarship.films;
      const fetchFilmNames = async () => {
        const results = await Promise.allSettled(
          starshipFilms.map((url) => fetch(url).then((res) => res.json()))
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
  }, [currentStarship.films]);

  return (
    <>
      <div className="stats_main bgs1">
        <div className="stats_main_item">
          <h1>STARSHIP</h1>
          <div>
            Name: <span className="stats_main_h2">{currentStarship.name}</span>
          </div>
          <div>
            Model:{" "}
            <span className="stats_main_h2">{currentStarship.model}</span>
          </div>
          <div>
            Manufacturer:{" "}
            <span className="stats_main_h2">
              {currentStarship.manufacturer}
            </span>
          </div>
          <div>
            Cost in credits:{" "}
            <span className="stats_main_h2">
              {currentStarship.cost_in_credits}
            </span>
          </div>
          <div>
            Length:{" "}
            <span className="stats_main_h2">{currentStarship.length}</span>
          </div>
          <div>
            Max atmosphering speed:{" "}
            <span className="stats_main_h2">
              {currentStarship.max_atmosphering_speed}
            </span>
          </div>
          <div>
            Crew: <span className="stats_main_h2">{currentStarship.crew}</span>
          </div>
          <div>
            Passengers:{" "}
            <span className="stats_main_h2">{currentStarship.passengers}</span>
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
