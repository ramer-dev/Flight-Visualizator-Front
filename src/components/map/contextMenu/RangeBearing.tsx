import React from 'react'

interface Props {
  angle: string,
  distance: string,
}

function RangeBearing({ angle, distance }: Props) {
  return (
    <div>{angle}|{distance}</div>
  )
}

export default RangeBearing