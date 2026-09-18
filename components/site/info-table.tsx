import { cn } from '@/lib/utils'

export type InfoRow = { label: string; value: string }

export function InfoTable({
  rows,
  caption,
  className,
}: {
  rows: InfoRow[]
  caption?: string
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-border bg-card', className)}>
      {caption && (
        <div className="border-b border-border bg-secondary px-5 py-3.5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary-foreground">{caption}</h3>
        </div>
      )}
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={cn(i % 2 === 1 && 'bg-muted/40')}>
              <th
                scope="row"
                className="w-2/5 border-b border-border px-5 py-3.5 text-left align-top font-medium text-foreground last:border-0"
              >
                {row.label}
              </th>
              <td className="border-b border-border px-5 py-3.5 align-top text-muted-foreground last:border-0">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
