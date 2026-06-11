import { useState } from "react";

export default function BacklogNode({data,}) {

  const [expanded, setExpanded] =
    useState(false);

  const [story, setStory] =
    useState("");

  const [stories, setStories] =
    useState(data.items || []);

  const handleAddStory = () => {

    if (!story.trim()) return;

    setStories([
      ...stories,
      story,
    ]);

    setStory("");
  };

  // -------------------------
  // MODO EXPANDIDO
  // -------------------------

  if (expanded) {

    return (
      <div
        className="
          bg-white
          border-2
          border-blue-500
          rounded-lg
          shadow-xl
          p-4
          w-80
        "
      >

        {/* HEADER */}

        <div className="
          flex
          justify-between
          items-center
          mb-3
        ">

          <h2 className="font-bold">
            Product Backlog
          </h2>

          <button
            onClick={() =>
              setExpanded(false)
            }

            className="
              text-red-500
              font-bold
            "
          >
            ✕
          </button>

        </div>

        {/* INPUT */}

        <input
          type="text"

          value={story}

          onChange={(e) =>
            setStory(e.target.value)
          }

          placeholder="
            Nueva historia...
          "

          className="
            w-full
            border
            rounded
            p-2
            mb-2
          "
        />

        {/* BOTON */}

        <button
          onClick={handleAddStory}

          className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            px-3
            py-2
            rounded
            w-full
            mb-3
          "
        >
          Añadir
        </button>

        {/* LISTA */}

        <div className="
          max-h-40
          overflow-auto
          space-y-1
        ">

          {stories.map(
            (item, index) => (

            <div
              key={index}

              className="
                p-2
                bg-gray-100
                rounded
                text-sm
              "
            >
              • {item}
            </div>
          ))}

        </div>

      </div>
    );
  }

  // -------------------------
  // MODO COMPACTO
  // -------------------------

  return (
    <div
      onClick={() =>
        setExpanded(true)
      }

      className="
        bg-white
        border
        rounded-lg
        shadow-md
        p-4
        w-52
        cursor-pointer
        hover:shadow-lg
        transition
      "
    >

      <h2 className="font-bold mb-2">
        Product Backlog
      </h2>

      <p className="text-sm text-gray-600">
        Historias:
        {" "}
        {stories.length}
      </p>

    </div>
  );
}