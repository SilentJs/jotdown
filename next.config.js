const withTM = require('next-transpile-modules')(['razorpay']);

// next.config.js
// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` and `net` modules
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
          net: false,
          tls:false
        };
      }
  
      return config;
    },
  };
  
  