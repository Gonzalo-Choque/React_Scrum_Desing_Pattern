import Topbar from "./Topbar"
import LeftSidebar from "../sidebar/LeftSidebar.jsx"
import RightInspector from "../inspector/RightInspector"
import CanvasArea from "../canvas/CanvasArea"

import {
  ReactFlowProvider
} from "@xyflow/react";

function MainLayout() {
  return (
    <div className="w-full h-full flex flex-col">

      <Topbar />

      <div className="flex flex-1 overflow-hidden">

        <LeftSidebar />
        
        <ReactFlowProvider>
          <CanvasArea />
        </ReactFlowProvider>

        <RightInspector />

      </div>
    </div>
  )
}

export default MainLayout