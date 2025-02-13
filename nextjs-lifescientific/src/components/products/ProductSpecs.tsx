import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Specification {
  label: string
  value: string
}

interface ProductSpecsProps {
  sectionTitle: string
  specs: Specification[]
  className?: string
}

export function ProductSpecs({
  sectionTitle,
  specs,
  className
}: ProductSpecsProps) {
  return (
    <section className={cn("py-16 bg-background", className)}>
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
          {sectionTitle}
        </h2>
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Specification</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specs.map((spec, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{spec.label}</TableCell>
                  <TableCell>{spec.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
} 