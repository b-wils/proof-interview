module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
    } else {
      // mutate for development...
        return {
        	devServer: {
        		port: 8080,
        	proxy: {
	        '/api': {
	            target: 'http://localhost:3000',
	            secure: false,
	            changeOrigin: true
	        }
	    }
    	}
    }
    }
  }
}