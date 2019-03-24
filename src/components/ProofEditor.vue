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
  data() {
    return {
        files: null
  }
  },
  mounted() {
        axios
      .get('/api/files')
      .then(response => (this.files = response.data))
  }
  
}
</script>