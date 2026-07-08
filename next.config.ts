import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.9', '192.168.1.8', '192.168.1.10'], // Agregamos un par por si el IP de tu celular cambia ligeramente
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb'
    }
  }
};

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default withPWA(nextConfig);
