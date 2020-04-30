<template>
  <!-- App.vue -->

  <v-app app dark>
    <v-navigation-drawer app v-model="drawer">
      <v-list subheader>
        <v-subheader>List of users in the room</v-subheader>

        <v-list-item v-for="u in users" :key="u.id" @click.prevent>
          <v-list-item-content>
            <v-list-item-title>{{u.name}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id === 2 ? 'primary' : 'grey'">mdi-chat</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app right>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-10">Chatroom {{user.room}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" @click="exit">Exit</v-btn>
    </v-app-bar>
    <v-content>
      <div>
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    drawer: false,
    users: [
      { id: 1, name: "User1" },
      { id: 2, name: "User2" }
    ]
  }),
  middleware: ["chat"],
  head() {
    return {
      title: `Room ${this.user.room}`
    };
  },
  computed: mapState(["user"])
};
</script>