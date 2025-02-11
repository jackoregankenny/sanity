'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EnvelopeClosedIcon, PhoneIcon } from '@radix-ui/react-icons'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/lib/translations'

export function ProductActions() {
  const { currentLanguage } = useLanguage()
  const t = (key: any) => getTranslation(key, currentLanguage)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('interested_in_product')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          {t('contact_team')}
        </p>
        <div className="space-y-2">
          <Button className="w-full justify-start" variant="outline">
            <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
            {t('email_us')}
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <PhoneIcon className="mr-2 h-4 w-4" />
            {t('call_us')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 