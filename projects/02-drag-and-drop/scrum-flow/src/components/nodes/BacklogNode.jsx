import { useState } from "react";

export default function BacklogNode({data,}) {

  const [expanded, setExpanded] =
    useState(false);

  const [story, setStory] =
    useState("");

  const [stories, setStories] =
    useState(data.items || []);
  
  const [editingIndex, setEditingIndex] =
    useState(null);

  const [draggedIndex, setDraggedIndex] =
    useState(null);

  const handleAddStory = () => {

    if (!story.trim()) return;

    setStories([
      ...stories,
      story,
    ]);

    setStory("");
  };

  const removeStory = (index) => {
    setStories(
      stories.filter(
        (_, i) => i !== index
      )
    );
  };

  const updateStory = (index,value) => {
    const updated = [...stories];
    updated[index] = value;
    setStories(updated);
  };

  // -------------------------
  // DRAG AND DROP DE HISTORIAS
  // -------------------------

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedIndex === null) return;
    const updated = [...stories];
    const draggedItem =
      updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);
    setStories(updated);
    setDraggedIndex(null);
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

          onKeyDown={(e) => {

            if (e.key === "Enter") {
              handleAddStory();
            }
          }}

          value={story}

          onChange={(e) =>
            setStory(e.target.value)
          }

          placeholder="
            Nueva historia...
          "

          className="
            nodrag
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

                draggable

                onDragStart={() =>
                  handleDragStart(index)
                }

                onDragOver={(e) =>
                  e.preventDefault()
                }

                onDrop={() =>
                  handleDrop(index)
                }

                className="
                  nodrag
                  p-2
                  bg-gray-100
                  rounded
                  text-sm
                  flex
                  items-center
                  justify-between
                  gap-2
                  cursor-move
                "
              >

                {/* IZQUIERDA */}

                <div className="
                  flex
                  items-center
                  gap-2
                  flex-1
                ">

                  <span>
                    ☰
                  </span>

                  {editingIndex === index ? (

                    <input
                      autoFocus

                      onKeyDown={(e) => {

                        if (e.key === "Enter") {
                          setEditingIndex(null);
                        }
                      }}

                      value={item}

                      onChange={(e) =>
                        updateStory(
                          index,
                          e.target.value
                        )
                      }

                      onBlur={() =>
                        setEditingIndex(null)
                      }

                      className="
                        nodrag
                        border
                        rounded
                        px-2
                        py-1
                        w-full
                      "
                    />

                  ) : (

                    <span
                      onClick={() =>
                        setEditingIndex(index)
                      }

                      className="
                        cursor-text
                        flex-1
                      "
                    >
                      {item}
                    </span>
                  )}

                </div>

                {/* DERECHA */}

                <button
                  onClick={() =>
                    removeStory(index)
                  }

                  className="
                    text-red-500
                    hover:text-red-700
                    font-bold
                  "
                >
                  ✕
                </button>

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