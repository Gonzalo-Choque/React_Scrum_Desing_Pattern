//import {useState} from "react"

export function ScrumBackLog ({}){
    const onDragStart = (event) => {
        event.dataTransfer.setData(
            "application/reactflow",
            "backlog"
        );
        event.dataTransfer.effectAllowed = "move";
    };
    return (
        <div
            draggable
            onDragStart={onDragStart}
            className="p-3 bg-white border rounded cursor-grab"
        >
            Backlog
        </div>
    )
}