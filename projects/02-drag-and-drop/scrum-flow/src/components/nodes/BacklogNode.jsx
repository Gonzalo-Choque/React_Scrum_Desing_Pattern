export default function BacklogNode({ data }) {
  return (
    <div className="bg-white border rounded p-3 min-w-[200px]">

      <h3 className="font-bold">
        {data.title}
      </h3>

      <p>
        Historias: {data.items.length}
      </p>

    </div>
  );
}