<template>
    <el-scrollbar class="avue-menu">
        <div
            v-if="menu&&menu.length==0&&!isHorizontal"
            class="avue-sidebar--tip"
        >
            {{ $t('menuTip') }}
        </div>
        <el-menu
            unique-opened
            :default-active="activeMenu"
            :mode="setting.sidebar"
            :collapse="getScreen(isCollapse)"
        >
            <sidebar-item :menu="menu" />
        </el-menu>
    </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import sidebarItem from './sidebarItem.vue'
export default {
    name: 'Sidebar',
    components: { sidebarItem },
    inject: ['index'],
    computed: {
        ...mapGetters(['isHorizontal', 'setting', 'menu', 'tag', 'isCollapse', 'menuId']),
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            if(meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        }
    },
    created() {
        this.index.openMenu()
    }
}
</script>
<style lang="scss" scoped>
</style>
