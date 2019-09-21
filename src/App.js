import React, { useState, useEffect } from "react";

export default function App() {
  const [respositories, setRespositories] = useState([]);
  const [location, setLocation] = useState([]);

  function newRepoHandler() {
    setRespositories([
      ...respositories,
      { id: Math.random(), name: "Novo repo" }
    ]);
  }

  useEffect(() => {
    async function listarRepositorios() {
      const response = await fetch("http://api.github.com/users/tarcCar/repos");
      const data = await response.json();
      setRespositories(data);
    }
    listarRepositorios();
    const watchId = navigator.geolocation.watchPosition(positionChangeHandler);
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const favoritos = respositories.filter(repo => repo.favorite);
    document.title = `Você tem ${favoritos.length} favoritos`;
  }, [respositories]);

  function handleFavorite(id) {
    const newRepositories = respositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRespositories(newRepositories);
  }
  function positionChangeHandler({ coords }) {
    const { latitude, longitude } = coords;
    setLocation({ latitude, longitude });
  }

  return (
    <>
      <div>
        Latitude: {location.latitude} <br />
        Longitude: {location.longitude}
      </div>
      <br />
      <ul>
        {respositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
      <button onClick={newRepoHandler}>Adicionar repo</button>
    </>
  );
}
// export default function App() {
//   const [respositories, setRespositories] = useState([
//     { id: 1, name: "Repo 1" },
//     { id: 2, name: "Repo 2" },
//     { id: 3, name: "Repo 3" }
//   ]);
//   function newRepoHandler() {
//     setRespositories([
//       ...respositories,
//       { id: Math.random(), name: "Novo repo" }
//     ]);
//   }
//   return (
//     <>
//       <ul>
//         {respositories.map(repo => (
//           <li key={repo.id}>{repo.name}</li>
//         ))}
//       </ul>
//       <button onClick={newRepoHandler}>Adicionar repo</button>
//     </>
//   );
// }
