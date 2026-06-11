import {
  ReactFlow,
  Background,
  Controls,
  useReactFlow,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import BacklogNode from "../nodes/BacklogNode"

import { useCallback } from "react"
import { useCanvasStore } from "../../store/useCanvasStore"

import TrashZone from "./TrashZone";

const nodeTypes = {
  backlog: BacklogNode,
};

function CanvasArea() {
  const { screenToFlowPosition } = useReactFlow();

  const nodes = useCanvasStore(
    (state) => state.nodes
  );

  const addNode = useCanvasStore(
    (state) => state.addNode
  );

  const removeNode = useCanvasStore(
    (state) => state.removeNode
  );

  const onNodesChange = useCanvasStore(
    (state) => state.onNodesChange
  );

  const isDragging = useCanvasStore(
    (state) => state.isDragging
  );

  const setDragging = useCanvasStore(
    (state) => state.setDragging
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event) => {
      event.preventDefault();

      const type =
        event.dataTransfer.getData(
          "application/reactflow"
        );

      if (!type) return;

      const position =
        screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

      addNode({
        id: crypto.randomUUID(),

        type,

        position,

        data: {
          title: "Product Backlog",
          items: [],
        },
      });

    },
    [addNode, screenToFlowPosition]
  );

  return (
    <div className="flex-1 flex flex-col">
      {isDragging && <TrashZone />}
      <div className="flex-1">
        
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeDragStart={() => setDragging(true)}
          onNodeDragStop={(event, node) => {
            setDragging(false);

            const trashZone =
              document.getElementById(
                "trash-zone"
              );

            if (!trashZone) return;

            const rect =
              trashZone.getBoundingClientRect();

            const mouseY = event.clientY;

            if (
              mouseY >= rect.top &&
              mouseY <= rect.bottom
            ) {
              removeNode(node.id);
            }
          }}

        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}

export default CanvasArea