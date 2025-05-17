import "../styles/RankSlide.css";

function RankSlide({ rank }) {
  return (
    <div className="rank-slide-content">
      <div className="rank-name-container">
        <h3 className="rank-name">{rank.name}</h3>
      </div>
      <div className="rank-model-container">
        {rank.modelImage && (
          <img src={rank.modelImage} alt={rank.name} className="rank-model" />
        )}
      </div>
      <div className="rank-lore-container">
        <p className="rank-lore">{rank.lore}</p>
        <p className="rank-stats">
          Достигли: <span className="rank-stats-percentage">0%</span> игроков.
        </p>
      </div>
    </div>
  );
}

export default RankSlide;
