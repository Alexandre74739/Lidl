interface Props {
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export default function AvisCard({ author, date, rating, comment }: Props) {
  return (
    <div className="avis-card">
      <div className="avis-card__header">
        <div className="avis-card__avatar">{author[0].toUpperCase()}</div>
        <div>
          <p className="avis-card__author">{author}</p>
          <p className="avis-card__date">{date}</p>
        </div>
      </div>
      <div className="avis-card__stars" aria-label={`Note : ${rating} sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? "star star--filled" : "star"}>★</span>
        ))}
      </div>
      <p className="avis-card__comment">{comment}</p>
    </div>
  );
}
