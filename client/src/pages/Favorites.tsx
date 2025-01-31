import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Favorites.css";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import { useWeather } from "../components/WeatherContext";

export default function Favorites() {
  const [favorites, setFavorites] = useState([] as FavoritesTypes[]);
  const currentUser = localStorage.getItem("currentUser") || "Explorateur";
  const navigate = useNavigate();
  const { setCityData } = useWeather();

  useEffect(() => {
    // Charger les favoris spécifiques à l'utilisateur
    const allUserFavorites = JSON.parse(
      localStorage.getItem("userFavorites") || "{}",
    );
    const userFavorites = allUserFavorites[currentUser] || [];
    setFavorites(userFavorites);
  }, [currentUser]);

  const removeFavorite = (name: string) => {
    const allUserFavorites = JSON.parse(
      localStorage.getItem("userFavorites") || "{}",
    );

    // Filtrer les favoris de l'utilisateur actuel
    allUserFavorites[currentUser] = allUserFavorites[currentUser].filter(
      (fav: FavoritesTypes) => fav.name !== name,
    );

    // Mettre à jour le localStorage
    localStorage.setItem("userFavorites", JSON.stringify(allUserFavorites));

    // Mettre à jour l'état local
    setFavorites(allUserFavorites[currentUser]);
    toast.error(`${name} a été supprimée des favoris !`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  };

  const handleNavigateToWeather = (fav: FavoritesTypes) => {
    setCityData([
      {
        name: fav.name,
        lat: fav.lat,
        lon: fav.lon,
        local_names: { fr: fav.name },
      },
    ]);
    navigate("/Weather", { state: { selectedCity: fav } });
  };

  return (
    <>
      <h1>Mes favoris</h1>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      <section className="favorites-section">
        {favorites.length === 0 ? (
          <p>Vous n'avez pas encore de favoris.</p>
        ) : (
          <div className="favorites-container">
            {favorites.map((fav) => (
              <div key={fav.name} className="favorite-card">
                <h2>{fav.name}</h2>
                <p>Température : {Math.round(fav.main.temp)}°C</p>
                <p>Vent : {Math.round(fav.wind.speed)} km/h</p>
                <p>Humidité : {Math.round(fav.main.humidity)}%</p>
                <div className="btn-container">
                  <button
                    type="button"
                    className="remove-favorite-button"
                    onClick={() => handleNavigateToWeather(fav)}
                  >
                    Voir météo
                  </button>
                  <button
                    type="button"
                    className="remove-favorite-button"
                    onClick={() => removeFavorite(fav.name)}
                  >
                    Supprimer{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
