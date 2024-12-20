export const mappingStatus = {
  pending: 0,
  approved: 1,
  rejected: 2
}

export const mappingStatusText = {
  [mappingStatus.pending]: 'Pending',
  [mappingStatus.approved]: 'Approved',
  [mappingStatus.rejected]: 'Rejected'
}

export const mappingStatusColor = {
  [mappingStatus.pending]: 'yellow',
  [mappingStatus.approved]: 'green',
  [mappingStatus.rejected]: 'red'
}