import { create } from "zustand";
import { applyNodeChanges } from "@xyflow/react";

export const useCanvasStore = create((set) => ({
  nodes: [],

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(
        changes,
        state.nodes
      ),
    })),
}));