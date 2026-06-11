//import {useState} from "react"

import {useCanvasStore} from "../../../store/useCanvasStore";

export function ScrumBackLog ({}){
  const nodes = useCanvasStore(
    (state) => state.nodes
  );

  const addNode = useCanvasStore(
    (state) => state.addNode
  );

  const onDragStart = (event) => {

    event.dataTransfer.setData(
      "application/reactflow",
      "backlog"
    );

    event.dataTransfer.effectAllowed =
      "move";
  };

  const handleClick = () => {

    let position = {
      x: 400,
      y: 200,
    };

    if (nodes.length > 0) {

      const lastNode =
        nodes[nodes.length - 1];

      position = {
        x: lastNode.position.x + 250,
        y: lastNode.position.y,
      };
    }

    addNode({
      id: crypto.randomUUID(),

      type: "backlog",

      position,

      data: {
        title: "Product Backlog",
        items: [],
      },
    });
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={handleClick}

      className="
        p-3
        bg-white
        border
        rounded
        cursor-grab
        hover:bg-gray-100
        transition
      "
    >
      Backlog
    </div>
  );
}