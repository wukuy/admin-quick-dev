<template>
    <span
        v-if="text"
        @click="handleLock"
    >{{ text }}</span>
    <i
        v-else
        class="icon-suoping"
        @click="handleLock"
    />
    <el-dialog
        v-model="box"
        title="设置锁屏密码"
        width="30%"
        append-to-body
    >
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
        >
            <el-form-item
                label="锁屏密码"
                prop="passwd"
                :rules="[{ required: true, message: '锁屏密码不能为空'}]"
            >
                <el-input
                    v-model="form.passwd"
                    placeholder="请输入锁屏密码"
                >
                    <template #append>
                        <el-button
                            icon="el-icon-lock"
                            @click="handleSetLock"
                        />
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { validatenull } from 'utils/validate'
import { mapGetters } from 'vuex'
export default {
    name: 'TopLock',
    props: {
        // eslint-disable-next-line vue/require-default-prop
        text: String
    },
    data() {
        return {
            box: false,
            form: {
                passwd: ''
            }
        }
    },
    computed: {
        ...mapGetters(['lockPasswd'])
    },
    created() { },
    mounted() { },
    methods: {
        handleSetLock() {
            this.$refs.form.validate(valid => {
                if(valid) {
                    this.$store.commit('SET_LOCK_PASSWD', this.form.passwd)
                    this.handleLock()
                }
            })
        },
        handleLock() {
            if(validatenull(this.lockPasswd)) {
                this.box = true
                return
            }
            this.$store.commit('SET_LOCK')
            setTimeout(() => {
                this.$router.push({ path: '/lock' })
            }, 100)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
