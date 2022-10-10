<template>
    <basic-container>
        <avue-crud
            v-bind="bindVal"
            v-model:page="page"
            v-model="form"
            v-on="onEvent"
        />
    </basic-container>
</template>

<script>
export default window.$crudCommon({}, {
    name: 'crud/index'
})
</script>

<style lang="scss" scoped>
</style>
