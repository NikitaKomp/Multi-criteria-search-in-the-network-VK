<template>
  <div class="card cursor-pointer border-0">
    <div class="card-img-menu position-relative">
      <img class="card-img-top p-2" :class="{'in-compare': group.selected}" :src="group.photo_200">
      <div class="card-raiting position-absolute">{{ group.raiting.toFixed(3) || "*" }}</div>
      <div class="d-flex flex-column justify-content-between w-100 h-100 card-img-menu-list">
        <div class="text-center">
          <a
            class="badge badge-light"
            data-toggle="modal"
            data-target="#modal"
            @click="selectGroup"
          >Карточка</a>
        </div>
        <div v-if="group.is_member" class="text-center">
          <a class="badge badge-light" @click="leaveGroup">Отписаться</a>
        </div>
        <div v-else class="text-center">
          <a class="badge badge-light" @click="joinGroup">Подписаться</a>
        </div>
        <div class="text-center">
          <a class="badge badge-light" @click.prevent="removeGroup">Удалить</a>
        </div>
        <div class="text-center">
          <a
            class="badge badge-light"
            href="#"
            @click.prevent="checkGroup"
          >{{ group.selected ? "Очистить" : "Сравнить" }}</a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title text-center">{{ group.name }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["group"],
  methods: {
    removeGroup() {
      this.$emit("removeGroup", this.group);
    },
    selectGroup() {
      this.$emit("selectGroup", this.group);
    },
    joinGroup() {
      this.$emit("joinGroup", this.group);
    },
    leaveGroup() {
      this.$emit("leaveGroup", this.group);
    },
    checkGroup() {
      this.group.selected = !this.group.selected;
      this.$emit("onGroupNameCheckboxChanged", this.group);
    }
  }
};
</script>

<style lang="sass" scoped>
  .card

    img
      border-radius: 50% !important
      &.in-compare
        box-shadow: inset 0px 0px 100px 1px lightblue
    
    .card-img-menu
      margin: 0 auto
      max-width: 200px

      .card-raiting
        font-size: 1.1rem
        top: 20px
        left: 10px
        color: white
        text-shadow: -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black, 1px 1px 2px black

    &:hover
      & > .card-img-menu
        & > .card-img-top,
        & > .card-raiting
            opacity: 0.1
        & > .card-img-menu-list
            opacity: 1

    .card-img-menu-list
      position: absolute
      top: 0
      left: 0
      padding: 10% 0
      opacity: 0
      .badge
        background-color: transparent
        &:hover
          background-color: lightblue
</style>
