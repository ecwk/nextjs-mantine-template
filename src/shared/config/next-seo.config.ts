import { DefaultSeoProps } from 'next-seo';

export const SEOConfig: DefaultSeoProps = {
  titleTemplate: '%s | nextjs-mantine-template',
  defaultTitle: 'nextjs-mantine-template',
  description: 'A template for Next.js with Mantine UI',
  canonical: 'https://nextjs-mantine-template.deploy.cnoside.dev',
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    }
  ],
  openGraph: {
    url: 'https://nextjs-mantine-template.deploy.cnoside.dev',
    title: 'nextjs-mantine-template',
    type: 'website',
    site_name: 'nextjs-mantine-template',
    locale: 'en_SG',
    images: [
      {
        url: 'https://dev-cnoside.sgp1.digitaloceanspaces.com/shared/images/nextjs-mantine-template.og-image.jpg',
        alt: 'nextjs-mantine-template og:image',
        width: 1280,
        height: 640
      }
    ]
  }
};
