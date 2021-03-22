<template>
  <v-dialog
    v-model="show"
    max-width="300"
    persistent
    class="position-fixed"
    transition="dialog-transition"
  >
    <slot :close="close" variable="sdfdgdfg"/>
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
  },
  methods: {
    close () {
      console.log("ggg")
      this.$emit('input', false)
    }
  }
}
</script>