interface QuantityProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

function Quantity({ value, onChange, min = 0, max }: QuantityProps) {
  return (
    <div className="quantity">
      <button
        className="quantity--btn"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Retirer un article"
      >
        -
      </button>
      <span className="quantity--value">{value}</span>
      <button
        className="quantity--btn"
        onClick={() => onChange(value + 1)}
        disabled={max !== undefined && value >= max}
        aria-label="Ajouter un article"
      >
        +
      </button>
    </div>
  );
}

export default Quantity;