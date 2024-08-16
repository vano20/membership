import {
  mappingStatusColor,
  mappingStatusText
} from '/src/pages/constant'
import { Badge } from './Badge'

export default function StatusBadge({ status }) {
  return (
    <div className="flex">
      <Badge variant={mappingStatusColor[status]}>
        {mappingStatusText[status]}
      </Badge>
    </div>
  )
}
