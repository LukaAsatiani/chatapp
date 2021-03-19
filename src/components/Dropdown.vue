<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-card
          color="transparent"
          class="fill-height"
          :elevation="0"
          v-bind="attrs"
          v-on="on"
        >
          <c-avatar-panel class="fill-height" :user="dropdown.user"/>
        </v-card>
      </template>
      <v-list dense
        color="primary"
        dark
        min-width="180"
      >
        <v-list-item
          v-for="(item, index) in dropdown.list"
          :key="index"
          :to="item.to ? item.to : null"
          @click="item.callback ? item.callback() : null"
          link
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({}),
    props: ['dropdown']
  }
</script>