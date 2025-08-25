import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Stats } from "./pages/Stats";
import { People } from "./pages/People/People";
import { Planets } from "./pages/Planets/Planets";
import { Species } from "./pages/Species/Species";
import { Starships } from "./pages/Starships/Starships";
import { Vehicles } from "./pages/Vehicles/Vehicles";
import { Films } from "./pages/Films/Films";
import { Singlepeople } from "./pages/People/Singlepeople";
import { Singlefilms } from "./pages/Films/Singlefilms";
import { Singleplanets } from "./pages/Planets/Singleplanets";
import { Singlespecies } from "./pages/Species/Singlespecies";
import { Singlestarships } from "./pages/Starships/Singlestarships";
import { Singlevehicles } from "./pages/Vehicles/Singlevehicles";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Stats />} />
          <Route path="/films" element={<Films />} />
          <Route path="films/:flm" element={<Singlefilms />} />
          <Route path="/people" element={<People />} />
          <Route path="people/:ppl" element={<Singlepeople />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/planets/:pln" element={<Singleplanets />} />
          <Route path="/species" element={<Species />} />
          <Route path="/species/:spc" element={<Singlespecies />} />
          <Route path="/starships" element={<Starships />} />
          <Route path="/starships/:stp" element={<Singlestarships />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:vhv" element={<Singlevehicles />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
