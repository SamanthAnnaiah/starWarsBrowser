import { franchise_stats } from "../data/franchise";

export function Stats() {
  return (
    <>
      <div className="stats_main">
        <div className="stats_main_item">
          <h2>Revenue Details</h2>
          <p>{franchise_stats.total_revenue.value}</p>
          <span className="stats_main_h1">Sources of Revenue</span>
          <div className=".stats_main_item">
            <p>👖{franchise_stats.total_revenue.source_of_revenue[0]}</p>
            <p>🥡{franchise_stats.total_revenue.source_of_revenue[1]}</p>
            <p>🏠{franchise_stats.total_revenue.source_of_revenue[2]}</p>
            <p>🎮{franchise_stats.total_revenue.source_of_revenue[3]}</p>
            <p>📚{franchise_stats.total_revenue.source_of_revenue[4]}</p>
            <p>📺{franchise_stats.total_revenue.source_of_revenue[5]}</p>
          </div>
        </div>
        <div className="stats_main_item">
          <h2>Merchandise Sales</h2>
          <p>{franchise_stats.merchandise_sales.notes}</p>
          <span className="stats_main_h1">👕over $29 billion</span>
        </div>
        <div className="stats_main_item">
          <h2>Media</h2>
          <p>Owned by Disney🐭</p>
          <span className="stats_main_h1">Types of Media</span>
          <div className=".stats_main_item">
            <p>🍿Movies</p>
            <p>📺Tv Series</p>
            <p>📚Animations</p>
            <p>📖Novels & Books</p>
            <p>🎮Video games</p>
            <p>📔Comics</p>
          </div>
        </div>
      </div>
    </>
  );
}
