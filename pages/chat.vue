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
      <div class="chat-wrap" style="height: 100%">
        <div class="chat">
          <ul>
            <li v-for="m in messages" :key="m.text">{{m.text}}</li>
          </ul>
        </div>
        <div class="chat-form"></div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    drawer: false,
    users: [
      { id: 1, name: "User1" },
      { id: 2, name: "User2" }
    ]
  }),
  computed: mapState(["user"]),
  methods: {
    ...mapMutations(["clearData"]),
    exit() {
      this.$router.push("/?message=leftChat");
      this.clearData();
    }
  },
  middleware: ["chat"],
  head() {
    return {
      title: `Room ${this.user.room}`
    };
  },
  computed: mapState(["user", "messages"])
};
</script>

<style  scoped>
.chat-wrap {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.chat-form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
  background: #212121;
}
.chat {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
</style>