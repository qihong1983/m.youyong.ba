const withOffline = require('next-offline');

module.exports = withOffline({
  exportPathMap: async function(defaultPathMap) {
    return {
      '/': {
        page: '/'
      },
      '/about': {
        page: '/about'
      }
    }
  },
  workboxOpts: {
    runtimeCaching: [{
      urlPattern: /(.*)/,
      handler: 'cacheFirst'
    }, {
      urlPattern: /api/,
      handler: 'networkFirst',
      options: {
        cacheableResponse: {
          statuses: [0, 200],
          headers: {
            'x-test': 'true'
          }
        }
      }
    }]
  }
});

// module.exports = {
//   generateEtags: false
// }