/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  experimental: {
    ppr: true,
  },
};

export default withSentryConfig(nextConfig, {
  org: "bergamolt-tech",
  project: "podtune",

  // An auth token is required for uploading source maps.
  authToken: '3cff42724da311efaec8ae48b02d9508',

  silent: false, // Can be used to suppress logs
});
