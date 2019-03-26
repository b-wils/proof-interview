<template>
  <v-app>
     <v-dialog v-model="newFileDialog" persistent max-width="600px">
       <v-card>
        <v-card-title>
          <span class="headline">Enter new file name:</span>
          <input v-model="newFileName" placeholder="New File Name" />
          <v-card-actions>
            <v-btn @click="createNewFile()"> Save </v-btn>
            <v-btn @click="newFileDialog = false"> Cancel </v-btn>
            
          </v-card-actions>
        </v-card-title>
      </v-card>
     </v-dialog>

     <v-dialog v-model="deleteFileDialog" persistent max-width="600px">
       <v-card>
        <v-card-title>
          <span class="headline">Are you sure you want to delete file?</span>
          <v-card-actions>
            <v-btn @click="deleteFile()" color="error"> Delete </v-btn>
            <v-btn @click="deleteFileDialog = false"> Cancel </v-btn>
            
          </v-card-actions>
        </v-card-title>
      </v-card>
     </v-dialog>

     <v-dialog v-model="errorDialog" persistent max-width="600px">
       <v-card>
        <v-card-title>
          <span class="headline">An Error occured:</span> {{this.errorMessage}}
          <v-card-actions>
            <v-btn @click="errorDialog = false"> Ok </v-btn>
            
          </v-card-actions>
        </v-card-title>
      </v-card>
     </v-dialog>

      <v-navigation-drawer
    v-model="drawer"
    fixed
    app
  >
    <v-list dense>
      <v-list-tile to="/">
        Create New File
      </v-list-tile>
      <v-list-tile v-for="file in files" :key="file.id" :to="file.slug">
        {{file.name}}
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Proof File Editor</v-toolbar-title>
                      <v-btn v-on:click="updateFileContent()" :disabled="!fileChanged"> Save </v-btn>
                      <v-btn v-on:click="deleteFileDialog = true" :disabled="!fileSlug" color="error"> Delete </v-btn>
    </v-toolbar>
    <v-content full-height>

        <textarea style="height: 100%;width: 100%;" v-model="fileContents" placeholder="Empty File" v-on:keyup="onKeyUp"></textarea>
       
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019 - Brandon Wilson</span>
    </v-footer>
  </v-app>
    
</template>

<script>

import axios from 'axios'
import get from 'lodash.get'

export default {
  name: 'ProofEditor',
  data() {
    return {
        files: null,
        loading: true,
        errorMessage: null,
        fileMap: {},
        fileContents: "",
        newFileName: "",
        drawer: null,
        newFileDialog: false,
        deleteFileDialog: false,
        errorDialog: false,
        fileChanged: false
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

          this.setFileContent();
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

      if (this.fileMap[encodeURIComponent(this.fileSlug)]) {
        this.fileContents = this.fileMap[encodeURIComponent(this.fileSlug)].contents
        this.fileChanged = false;
      } else if (!this.fileSlug) {
        this.fileContents = "";
        this.fileChanged = false;
      } else {
        console.log('no file' + this.fileSlug)
        this.errorMessage = "Could not find file " + this.fileSlug
      }

      
    },
    updateFileContent: function() {

      if (!this.fileSlug) {
        this.newFileDialog = true
        return;
      }
      axios.put('/api/files/' + this.fileSlug, {contents:this.fileContents}).then(response => {
        // Update our internal state to match
        // TODO vuex would be a nice addition here
        // TODO we should probably update our file list as well
        this.fileChanged = false;
        this.fileMap[this.fileSlug].contents=this.fileContents;
      })
      .catch((error) => {
        if (error.response.data.message) {
          this.setErrorMessage(error.response.data.message)
        } else {
          console.log(error)
          this.setErrorMessage('Unknown error')
        }
        
      });
    },
    createNewFile: function() {
      this.newFileDialog = false;
      axios.post('/api/files', {name:this.newFileName, contents:this.fileContents}).then(response => {
        
        // TODO files list is unsorted
        var newFile = response.data;

        this.files.push(newFile);
        this.fileMap[newFile.slug] = newFile;

        this.newFileName = "";
        this.fileContents = "";
        this.$router.push('/' + newFile.slug)
        this.fileChanged = false;
      }) 
      .catch((error) => {
        if (get(error, "response.data.message")) {
          this.setErrorMessage(error.response.data.message)
        } else {
          console.log(error)
          this.setErrorMessage('Unknown error')
        }
        
      });
    },
    deleteFile: function() {
      this.deleteFileDialog = false;
      axios.delete('/api/files/' + this.fileSlug).then(response => {
        delete this.fileMap[this.fileSlug];
        this.files = this.files.filter((file) => file.slug !== this.fileSlug)
        this.$router.push('/')
      })
      .catch((error) => {
        if (error.response.data.message) {
          this.setErrorMessage(error.response.data.message)
        } else {
          this.setErrorMessage('Unknown error')
        }
        
      });
    },
    setErrorMessage: function(error) {
      this.errorDialog = true;
      this.errorMessage = error;
    },
    onKeyUp: function() {
      this.fileChanged = true;
    }
  }
  
}
</script>