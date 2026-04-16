import { Link } from "react-router";
import type { Category } from "../../services/categoryService";

interface Props {
  category: Category;
  image?: string;
}

export default function RayonCard({ category, image }: Props) {
  return (
    <Link to={`/rayons/${category.id}`} className="rayon-card">
      {image && (
        <div className="rayon-card__image">
          <img src={image} alt={category.name} />
        </div>
      )}
      <div className="rayon-card__body">
        <h3 className="rayon-card__title">{category.name}</h3>
        {category.description && (
          <p className="rayon-card__desc">{category.description}</p>
        )}
      </div>
    </Link>
  );
}
