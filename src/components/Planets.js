import React from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async () => {
  console.log('fetchPlanets...');

  const res = await fetch("https://swapi.dev/api/planets/");
  const data = res.json();

  // Simulate slow network (2 seconds)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fetchPlanets END.');
      resolve(data);
    }, 2000);
  });
};

const Planets = () => {
  const { data, status } = useQuery("planets", fetchPlanets, {
    staleTime: 10 * 1000,
    cacheTime: 300000, // default 5 min.
    onSuccess: () => console.log("data fetched with no problems")
  });
  // console.log(data);

  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" && <div>Loading data</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
