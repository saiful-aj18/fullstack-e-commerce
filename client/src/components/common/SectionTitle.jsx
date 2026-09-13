function SectionTitle({ title, description }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;