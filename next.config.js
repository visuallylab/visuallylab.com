/* eslint-disable */
const withCSS = require('@zeit/next-css');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

require('dotenv').config();

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const GITHUB = process.env.DEPLOY_ENV === 'github';
const PROJ_NAME = process.env.PROJ_NAME;

console.log('Environment:', process.env.NODE_ENV);

module.exports = withCSS(
  withBundleAnalyzer({
    exportPathMap: function() {
      return {
        '/': { page: '/' },
        '/demo/index': { page: '/demo' },
        '/demo/traffic': { page: '/demo/traffic' },
        '/demo/electricity': { page: '/demo/electricity' },
        '/service': { page: '/service' },
      };
    },
    assetPrefix: GITHUB ? `/${PROJ_NAME}/` : '',
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html',
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html',
      },
    },
    webpack: (config, { isServer, buildId, dev }) => {
      config.plugins = config.plugins || [];
      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true,
        }),
      ];

      // react-icons issue @see https://github.com/react-icons/react-icons/issues/154#issuecomment-412774515
      config.resolve.extensions = ['.mjs', ...config.resolve.extensions];

      // disable typeguard
      // @see https://github.com/zeit/next.js/issues/7687#issuecomment-506440999
      config.plugins = config.plugins.filter(plugin => {
        if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin')
          return false;
        return true;
      });
      return config;
    },
  }),
);
