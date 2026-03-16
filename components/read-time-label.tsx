import { formatReadTime } from '../lib/reading-time'

type Props = {
  minutes: number
}

export default function ReadTimeLabel({ minutes }: Props) {
  return <span>{formatReadTime(minutes)}</span>
}
