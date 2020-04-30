<template>
  <v-app app>
    <nuxt />
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    drawer: true,
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
    }
  }
};
</script>