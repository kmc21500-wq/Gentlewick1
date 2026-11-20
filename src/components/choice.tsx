export function ChoiceGroup<T extends string>({
  label,
  value,
  onChange,
  options,
  columns = 1,
}: {
  label: string;
  value: T;
  onChange: (id: T) => void;
  options: { id: T; name: string; note: string; extra?: string }[];
  columns?: 1 | 2;
}) {
  return (
    <fieldset>
      <legend className="choice-legend font-serif text-2xl">{label}</legend>
      <div className={columns === 2 ? "mt-3 grid gap-2 sm:grid-cols-2" : "mt-3 grid gap-2"}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="choice"
            aria-pressed={value === option.id}
            onClick={() => onChange(option.id)}
          >
            <span className="min-w-0">
              <span className="block font-medium">{option.name}</span>
              <span className="note">{option.note}</span>
            </span>
            {option.extra ? <span className="shrink-0 text-sm font-medium">{option.extra}</span> : null}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
