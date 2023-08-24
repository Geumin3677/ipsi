/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const nextConfig = {
	reactStrictMode: true,
  output: 'export',
  basePath: "/sting"
};

module.exports = withPlugins(
	[
		[
			withPWA,
			{
				pwa: {
					dest: "public",
          subdomainPrefix: "/sting"
				},
			},
		],
		// 추가 플러그인 작성
	],
	nextConfig
);