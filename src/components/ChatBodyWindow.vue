<template>
  <v-dialog
    v-if="$vuetify.breakpoint.xsOnly"
    v-model="show"
    fullscreen
    hide-overlay
    class="position-fixed"
    transition="dialog-bottom-transition"
  >
    <v-sheet
      class="primary lighten-2 fill-height pa-0"
      justify="center"
      dark
    >
      <slot/>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>