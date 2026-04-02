import { useIntlayer } from 'react-intlayer'

export function Pending() {
  const content = useIntlayer('app')
  return (
    <div className="text-white/50 text-sm flex items-center justify-center mt-8">
      {content.pending}
    </div>
  )
}
