interface Props {
  score: string;
}

const COLORS: Record<string, { bg: string; text: string }> = {
  A: { bg: '#008a00', text: '#fff' },
  B: { bg: '#85bb2f', text: '#fff' },
  C: { bg: '#fecc02', text: '#1a1a1a' },
  D: { bg: '#ff6600', text: '#fff' },
  E: { bg: '#ff0000', text: '#fff' },
};

export default function NutriScore({ score }: Props) {
  const grade = score.toUpperCase();
  const color = COLORS[grade] ?? { bg: '#ccc', text: '#1a1a1a' };

  return (
    <div className="nutri-score" aria-label={`Nutri-Score ${grade}`}>
      <div
        className="nutri-score__badge"
        style={{ background: color.bg, color: color.text }}
      >
        {grade}
      </div>
      <div className="nutri-score__text">
        <span className="nutri-score__label">Nutri-Score</span>
        <span className="nutri-score__sublabel">Information</span>
      </div>
    </div>
  );
}
