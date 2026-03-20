import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextCoreWebVitals,
  {
    ignores: [
      ".next/**",
      "release/**",
      "supabase/.temp/**",
    ],
  },
];

export default config;
