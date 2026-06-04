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

  const onNodesChange = useCanvasStore(
    (state) => state.onNodesChange
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

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const node = {
        id: crypto.randomUUID(),

        type,

        position,

        data: {
          title: "Product Backlog",
          items: [],
        },
      };

      addNode(node);
    },
    [addNode, screenToFlowPosition]
  );

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default CanvasArea