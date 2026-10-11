module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Remove deprecated middleware options
      if (webpackConfig.devServer) {
        delete webpackConfig.devServer.onAfterSetupMiddleware;
        delete webpackConfig.devServer.onBeforeSetupMiddleware;
        
        // Initialize setupMiddlewares if not already present
        if (!webpackConfig.devServer.setupMiddlewares) {
          webpackConfig.devServer.setupMiddlewares = (middlewares, devServer) => {
            return middlewares;
          };
        }
      }
      
      return webpackConfig;
    },
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    // Remove deprecated options at devServer level too
    delete devServerConfig.onAfterSetupMiddleware;
    delete devServerConfig.onBeforeSetupMiddleware;
    
    // Ensure setupMiddlewares is configured
    if (!devServerConfig.setupMiddlewares) {
      devServerConfig.setupMiddlewares = (middlewares, devServer) => {
        return middlewares;
      };
    }
    
    return devServerConfig;
  },
};


