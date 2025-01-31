import "../styles/CardAlert.css";
import { useWeather } from "../components/WeatherContext";
import SvgIcons from "./SvgIcons";

const icons = [
  {
    warning: {
      width: "30px",
      height: "30px",
      path: "m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z",
    },
  },
];

export default function CardAlert() {
  const { weatherData } = useWeather();

  const alerts = [];

  if (weatherData.main.humidity > 95) {
    alerts.push(
      <p key="humidity">Taux d'humidité présentant un risque de pluie</p>,
    );
  }
  if (weatherData.main.temp > 29) {
    alerts.push(
      <p key="high-temp">
        Température élevée, pensez à vous hydrater et privilégiez le sport après
        les heures chaudes
      </p>,
    );
  }
  if (weatherData.main.temp < 5) {
    alerts.push(<p key="low-temp">Température basse, pensez à vous couvrir</p>);
  }
  if (weatherData.main.temp < 0) {
    alerts.push(
      <p key="negative-temp">Température négative, risque de verglas</p>,
    );
  }
  if (weatherData.wind.speed > 40) {
    alerts.push(<p key="high-wind">Vent fort, soyez prudents</p>);
  }
  if (weatherData.weather[0].description === "orage") {
    alerts.push(<p key="storm">Risque d'orage</p>);
  }
  if (weatherData.weather[0].description === "neige") {
    alerts.push(<p key="snow">Risque de neige</p>);
  }
  if (weatherData.weather[0].description === "pluie") {
    alerts.push(<p key="rain">Risque de pluie, sortez votre parapluie</p>);
  }
  if (weatherData.weather[0].description === "brouillard") {
    alerts.push(
      <p key="fog">Risque de brouillard, visibilité réduite, soyez prudents</p>,
    );
  }
  if (weatherData.weather[0].description === "brume") {
    alerts.push(
      <p key="mist">Risque de brume, visibilité réduite, soyez prudents</p>,
    );
  }

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="card_alert">
      <SvgIcons
        path={icons[0].warning.path}
        height={icons[0].warning.height}
        width={icons[0].warning.width}
      />
      <h2>Avertissements</h2>
      <div>
        <ul>
          {alerts.map((alert) => (
            <li key={alert.key}>{alert}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
