import type { NextConfig } from 'next'
import { Configuration } from 'webpack'

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
            icon: true,
          },
        },
      ],
    })
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
