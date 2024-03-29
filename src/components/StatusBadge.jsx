import {
  mappingStatusColor,
  mappingStatusText
} from '/src/pages/constant'
import { Badge } from './Badge'

export default function StatusBadge({ status }) {
  return (
    <Badge variant={mappingStatusColor[status]}>
      {mappingStatusText[status]}
    </Badge>
  )
}
