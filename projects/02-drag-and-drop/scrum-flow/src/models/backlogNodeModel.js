export const createBacklogNode = (
  position = { x: 0, y: 0 }
) => ({
  id: crypto.randomUUID(),

  type: "backlog",

  position,

  data: {
    title: "Product Backlog",

    items: [],
  },
});