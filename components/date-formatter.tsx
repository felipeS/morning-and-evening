import { formatPostDate } from '../lib/post-date'

type Props = {
  dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
  return <time dateTime={dateString}>{formatPostDate(dateString, 'LLLL d, yyyy')}</time>
}

export default DateFormatter
