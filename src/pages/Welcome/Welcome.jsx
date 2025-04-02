import assets from "../../assets/assets";
import "./Welcome.css";

function Welcome() {
  return (
    <>
      <div className="welcome">
        <h1>DIVI Sleep?</h1>
        <h2>Did we sleep?</h2>
        <div className="welcome-content">
          <img src={assets.Welcome.sleepyWelcome} alt="" />
          <div>
            <p>Track your sleep patterns and improve your health.
            Wake up refreshed every day by understanding your sleep habits. Unlock better rest with insights tailored just for you! 🌙💤</p>
            <a href="/login">
              <button>To get sleep</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
