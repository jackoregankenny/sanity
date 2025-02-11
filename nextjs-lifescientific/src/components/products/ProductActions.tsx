import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"

export default function ProductActions() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Interested in this product?</h3>
            <p className="text-sm text-muted-foreground">
              Contact our team for more information about this product, pricing, and availability.
            </p>
          </div>

          <div className="grid gap-4">
            <Button className="w-full" asChild>
              <a href="mailto:info@lifescientific.com" className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href="tel:+35312999000" className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </Button>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Contact Information</p>
              <p className="text-xs text-muted-foreground">Life Scientific Ltd</p>
              <p className="text-xs text-muted-foreground">Block 4, Belfield Office Park</p>
              <p className="text-xs text-muted-foreground">Beech Hill Road, Clonskeagh</p>
              <p className="text-xs text-muted-foreground">Dublin 4, D04 V972</p>
              <p className="text-xs text-muted-foreground">Ireland</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 