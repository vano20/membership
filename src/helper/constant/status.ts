type StatusType = 'pending' | 'approved' | 'rejected'

export const mappingStatus: Record<StatusType, number> = {
  pending: 0,
  approved: 1,
  rejected: 2
}

export const mappingStatusText: Record<number, string> = {
  [mappingStatus.pending]: 'Pending',
  [mappingStatus.approved]: 'Approved',
  [mappingStatus.rejected]: 'Rejected'
}

export const mappingStatusColor: Record<number, string> = {
  [mappingStatus.pending]: 'yellow',
  [mappingStatus.approved]: 'green',
  [mappingStatus.rejected]: 'red'
}