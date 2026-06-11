import { create } from "zustand";
import { applyNodeChanges } from "@xyflow/react";

export const useCanvasStore = create((set) => ({

  nodes: [],

  isDragging: false,

  setDragging: (value) =>
    set({
      isDragging: value,
    }),

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter(
        (n) => n.id !== id
      ),
    })),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(
        changes,
        state.nodes
      ),
    })),
}));