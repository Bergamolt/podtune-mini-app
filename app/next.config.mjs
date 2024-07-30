/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  experimental: {
    ppr: true,
  },
};

console.log("process.env", process.env.SENTRY_AUTH_TOKEN);

export default withSentryConfig(nextConfig, {
  org: "bergamolt-tech",
  project: "podtune",

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: false, // Can be used to suppress logs
});
