<template>
	<div>
		<h1> Proof Editor! </h1>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ProofEditor',
  props: {
    msg: String
  },
  mounted() {
  	console.log('mounted!!!')
  	    axios
      .get('/api/files')
      .then(response => (console.log (response)))
  }
  
}
</script>