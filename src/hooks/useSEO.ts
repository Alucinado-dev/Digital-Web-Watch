import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  canonical?: string
}

export function SEOHead({ title, description, canonical }: SEOProps) {
  const fullTitle = `${title} | Digital Web Watch`
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  )
}
