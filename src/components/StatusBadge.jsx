import {
  mappingStatusColor,
  mappingStatusText
} from '/src/helper/constant/status'
import { Badge } from './Base/Badge'

export default function StatusBadge({ status }) {
  return (
    <div className="flex">
      <Badge variant={mappingStatusColor[status]}>
        {mappingStatusText[status]}
      </Badge>
    </div>
  )
}
