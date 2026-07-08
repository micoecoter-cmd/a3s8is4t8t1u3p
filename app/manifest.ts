import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Asisttup Reportes',
    short_name: 'Asisttup',
    description: 'Sistema de Reportes y Cotizaciones Asisttup',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#004d99',
    icons: [
      {
        src: '/asisttup-logo.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/asisttup-logo.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  };
}
