<template>
    <div>
        <h1> Proof Editor! </h1>

        <section v-if="errorMessage">
          {{errorMessage}}
        </section>

        <section v-else-if="loading">
          Loading....
        </section>

        <section v-else>
          <ul>
            <li v-for="file in files">
              {{file.name}}
            </li>
          </ul>
          
        </section>
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
        files: null,
        loading: true,
        errorMessage: null
  }
  },
  mounted() {
        axios
      .get('/api/files')
      .then(response => 
        {
          this.files = response.data
          this.loading = false;
        })
      .catch(error=>{
        console.log(error)
        this.errorMessage = error
      })
  }
  
}
</script>