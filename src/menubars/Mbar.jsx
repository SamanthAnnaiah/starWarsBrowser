import { Link } from "react-router";

function HomeLinks() {
  return (
    <>
      <ol className="mitems">
        <li>
          <Link to="/">
            <img
              className="logoimg"
              src="/src/assets/swarslogo.png"
              alt=""
              width={100}
              height={100}
            />
          </Link>
        </li>
        <li>
          <Link to="/people" className="tdl">
            People
          </Link>
        </li>
        <li>
          <Link to="/planets" className="tdl">
            Planets
          </Link>
        </li>
        <li>
          <Link to="/species" className="tdl">
            Species
          </Link>
        </li>
        <li>
          <Link to="/starships" className="tdl">
            Starships
          </Link>
        </li>
        <li>
          <Link to="/vehicles" className="tdl">
            Vehicles
          </Link>
        </li>
        <li>
          <Link to="/films" className="tdl">
            Films
          </Link>
        </li>
      </ol>
    </>
  );
}

export default HomeLinks;
