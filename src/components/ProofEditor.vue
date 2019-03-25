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
                <router-link :to="'/' + file.slug"> {{file.name}} </router-link>
            </li>
          </ul>
          
          {{fileContents}}
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
        errorMessage: null,
        fileMap: {},
        fileContents: ""
  }
  },
  props: ['fileSlug'],
  mounted() {
        axios
      .get('/api/files')
      .then(response => 
        {
          this.files = response.data
          this.loading = false;


          this.fileMap = this.files.reduce((map, item) => {
            map[item.slug] = item;
            return map;
          }, {})
        })
      .catch(error=>{
        console.log(error)
        this.errorMessage = error
      })
  },
  watch: {
    '$route' (to, from) {
      this.fileContents = this.fileMap[to.params.fileSlug].contents
    }
  }
  
}
</script>