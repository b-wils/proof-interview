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

          <input v-model="newFileName" placeholder="New File Name" />
          <button v-on:click="createNewFile()"> New </button>

          <button v-on:click="updateFileContent()"> Save </button>
          <textarea v-model="fileContents" placeholder="Enter Text Here"></textarea>
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
        fileContents: "",
        newFileName: ""
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

          if (this.fileSlug) {
            this.setFileContent();
          }
        })
      .catch(error=>{
        console.log(error)
        this.errorMessage = error
      })
  },
  watch: {
    '$route' (to, from) {
      this.setFileContent()
    }
  },
  methods: {
    setFileContent: function() {

      if (this.fileMap[this.fileSlug]) {
        this.fileContents = this.fileMap[this.fileSlug].contents  
      } else {
        this.errorMessage = "Could not find file " + this.fileSlug
      }

      
    },
    updateFileContent: function() {
      axios.put('/api/files/' + this.fileSlug, {contents:this.fileContents}).then(response => {
        // Update our internal state to match
        // TODO vuex would be a nice addition here
        // TODO we should probably update our file list as well
        this.fileMap[this.fileSlug].contents=this.fileContents;
      })
      .catch(function (error) {
        console.log(error);
        this.errorMessage = error;        
      });
    },
    createNewFile: function() {
      axios.post('/api/files', {name:this.newFileName}).then(response => {
        
        // TODO files list is unsorted
        var newFile = response.data;

        this.files.push(newFile);
        this.fileMap[newFile.slug] = newFile;
        this.newFileName = "";
        this.fileContents = "";
        this.$router.push('/' + newFile.slug)
      }) 
      .catch(function (error) {
        console.log(error);
        this.errorMessage = error;        
      });
    }
  }
  
}
</script>