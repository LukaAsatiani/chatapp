<template>
  <v-card 
    :elevation="0"
  >
    <v-row
      class="fill-height px-3 ma-0"
    >
      <v-col cols="12" class="text-center">
        <div
          class="avatar-container"
        >
          <img :src="imageUrl" class="c-avatar"/>
        </div>
        <div>
          <v-btn label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file' class="link">
            Upload
          </v-btn>
          <v-btn label="Select Image" @click='update' v-model='imageName' prepend-icon='attach_file' class="link">
            Next
          </v-btn>
        </div>
        <input
          type="file"
          ref="image"
          style="display: none"
          accept="image/*"
          @change="onFilePicked"
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  import { mapActions } from 'vuex'
  
  export default {
    data: () => ({
      title: "Image Upload",
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: ''
    }),

    methods: {  
      ...mapActions('user', {
        updateImage: 'IMAGE_UPDATE'
      }),
      pickFile() {
        this.$refs.image.click()
      },
      update(){
        this.updateImage({image: this.imageUrl})
      },
      onFilePicked(e) {
        const files = e.target.files
        if (files[0] !== undefined) {
          this.imageName = files[0].name
          if (this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = files[0]
          })
        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
      }
    }
  }
</script>

<style scoped>
  
  .avatar-container {
    position: relative;
    height: 198px;
    width: 198px;
    margin: 20px auto;
    border-radius: 50%;
    border: 2px solid #2196fc;
    box-shadow: inset 0 0 20px 10px #313131;
    overflow: hidden;
  }
  
  .c-avatar {
    height: 100%;
  }

</style>