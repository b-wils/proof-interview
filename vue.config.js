module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
    } else {
      // mutate for development...
        return {
        	devServer: {
        	proxy: {
	        '/api': {
	            target: 'http://localhost:' + process.env.DEV_API_PORT,
	            secure: false,
	            changeOrigin: true
	        }
	    }
    	}
    }
    }
  }
}