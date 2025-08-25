import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export function Singlefilms() {
  let navigate = useNavigate();
  let [currentFilm, setcurrentFilm] = useState({});
  let [moreinfodisplay, setmoreinfodisplay] = useState(false);
  let [filmsData, setfilmsData] = useState([]);
  let { flm } = useParams();
  console.log(flm);
  useEffect(() => {
    const fetchsdata = async () => {
      try {
        console.log("selected film", flm);
        const response = await fetch(`https://swapi.info/api/films/${flm}`);
        const data = await response.json();
        setcurrentFilm(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchsdata();
  }, []);

  useEffect(() => {
    if (currentFilm.characters && currentFilm.characters.length > 0) {
      const Filmfilms = currentFilm.characters;

      const fetchCharacterNames = async () => {
        const results = await Promise.allSettled(
          Filmfilms.map((url) => fetch(url).then((res) => res.json()))
        );
        const fulfilledResults = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => ({
            name: result.value.name,
            url: result.value.url,
          }));
        setfilmsData(fulfilledResults);
      };

      fetchCharacterNames();
    }
  }, [currentFilm.characters]);

  return (
    <>
      <div className="stats_main bgs4">
        <div className="stats_main_item">
          <h1>FILM</h1>
          <div>
            Title: <span className="stats_main_h2">{currentFilm.title}</span>
          </div>
          <div>
            director:{" "}
            <span className="stats_main_h2">{currentFilm.director}</span>
          </div>
          <div>
            Producer:{" "}
            <span className="stats_main_h2">{currentFilm.producer}</span>
          </div>
          <div>
            Release date:{" "}
            <span className="stats_main_h2">{currentFilm.release_date}</span>
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
          <>
            <div className="stats_main_item">
              Synopsis: {currentFilm.opening_crawl}
            </div>
            <div className="stats_main_item">
              <h3>Characters:</h3>
              {filmsData.length > 0 ? (
                <ul className="card_1">
                  {filmsData.map((character, index) => {
                    return (
                      <li
                        key={index}
                        className="morecursor"
                        onClick={() => {
                          console.log("navigate to character");
                          console.log("character url:", character.url);
                          navigate(`/people/${character.url.split("/").pop()}`);
                        }}
                      >
                        {character.name}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No characters found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
