import {ScrumBackLog} from './scrum_items/BackLog'
import {Text} from './common_items/Text'
import {SprintPlaning} from './scrum_items/SprintPlaning'

function LeftSidebar() {
  return (
    <div className="w-64 border-r bg-gray-50 p-4">

      <h2 className="font-semibold mb-4">
        Components
      </h2>

      <div className="space-y-2">

        <Text />

        <ScrumBackLog />

        <SprintPlaning />

      </div>

    </div>
  )
}

export default LeftSidebar