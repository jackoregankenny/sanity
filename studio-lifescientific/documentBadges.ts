interface Document {
  _type: string
  language: string
}

export const badges = {
  product: (doc: Document) => getBadges(doc),
  post: (doc: Document) => getBadges(doc)
}

function getBadges(doc: Document) {
  const badges = []

  if (doc.language === 'en') {
    badges.push({
      label: 'Original',
      title: 'Original English Version',
      color: 'success'
    })
  } else {
    badges.push({
      label: `Translation (${doc.language.toUpperCase()})`,
      title: `Translated version in ${doc.language.toUpperCase()}`,
      color: 'primary'
    })
  }

  return badges
} 