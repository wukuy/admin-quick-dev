<template>
    <div class="avue-top">
        <div class="top-bar__left">
            <div
                v-if="setting.collapse&&!isHorizontal"
                class="avue-breadcrumb"
                :class="[{ 'avue-breadcrumb--active': isCollapse }]"
            >
                <i
                    class="icon-navicon"
                    @click="setCollapse"
                />
            </div>
        </div>
        <div class="top-bar__title">
            <top-menu
                v-if="setting.menu"
                ref="topMenu"
            />
            <top-search
                v-if="setting.search"
                class="top-bar__item"
            />
        </div>
        <div class="top-bar__right">
            <div
                v-if="setting.lock"
                class="top-bar__item"
            >
                <top-lock />
            </div>
            <div
                v-if="setting.theme"
                class="top-bar__item"
            >
                <top-theme />
            </div>
            <div class="top-bar__item">
                <top-lang />
            </div>
            <div
                v-if="setting.fullscren"
                class="top-bar__item"
            >
                <top-full />
            </div>
            <div
                v-if="setting.debug"
                class="top-bar__item"
            >
                <top-logs />
            </div>
            <div class="top-user">
                <img
                    class="top-bar__img"
                    :src="userInfo.avatar"
                >
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{ userInfo.username }}
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <router-link to="/">
                                    {{ $t('navbar.dashboard') }}
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link to="/info/index">
                                    {{ $t('navbar.userinfo') }}
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link to="/info/setting">
                                    {{ $t('navbar.setting') }}
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item
                                divided
                                @click="logout"
                            >
                                {{ $t('navbar.logOut') }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <top-setting />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import topLock from './top-lock.vue'
import topMenu from './top-menu.vue'
import topSearch from './top-search.vue'
import topTheme from './top-theme.vue'
import topLogs from './top-logs.vue'
import topLang from './top-lang.vue'
import topFull from './top-full.vue'
import topSetting from '../setting.vue'
export default {
    name: 'Top',
    components: {
        topLock,
        topMenu,
        topSearch,
        topTheme,
        topLogs,
        topLang,
        topFull,
        topSetting
    },
    filters: {},
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            'setting',
            'userInfo',
            'tagWel',
            'tagList',
            'isCollapse',
            'tag',
            'logsLen',
            'logsFlag',
            'isHorizontal'
        ])
    },
    created() { },
    methods: {
        setCollapse() {
            this.$store.commit('SET_COLLAPSE')
        },
        logout() {
            this.$confirm(this.$t('logoutTip'), this.$t('tip'), {
                confirmButtonText: this.$t('submitText'),
                cancelButtonText: this.$t('cancelText'),
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({ path: '/login' })
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
