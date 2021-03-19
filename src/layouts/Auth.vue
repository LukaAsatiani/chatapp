<template>
  <v-col>
    <v-card class="elevation-0 mx-auto" max-width="320" dark color="primary">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title
            class="headline font-weight-bold ma-2"
            align="center"
          >
            {{ title }}
          </v-list-item-title>
          <slot></slot>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-col>
</template>

<script>
export default ({
  props: ['title']
})
</script>
