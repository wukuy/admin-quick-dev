<template>
    <el-form
        ref="loginForm"
        class="login-form"
        status-icon
        :rules="loginRules"
        :model="loginForm"
        label-width="0"
    >
        <el-form-item prop="phone">
            <el-input
                v-model="loginForm.phone"
                auto-complete="off"
                :placeholder="$t('login.phone')"
                @keyup.enter="handleLogin"
            >
                <template #prefix>
                    <i class="icon-shouji" />
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input
                v-model="loginForm.code"
                auto-complete="off"
                :placeholder="$t('login.code')"
                @keyup.enter="handleLogin"
            >
                <template #prefix>
                    <i class="icon-yanzhengma" />
                </template>

                <template #append>
                    <span
                        class="msg-text"
                        :class="[{display:msgKey}]"
                        @click="handleSend"
                    >{{ msgText }}</span>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                class="login-submit"
                @click.prevent="handleLogin"
            >
                {{ $t('login.submit') }}
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { isvalidatemobile } from 'utils/validate'
import { mapGetters } from 'vuex'
export default {
    name: 'Codelogin',
    data() {
        const validatePhone = (rule, value, callback) => {
            if(isvalidatemobile(value)[0]) {
                callback(new Error(isvalidatemobile(value)[1]))
            }else {
                callback()
            }
        }
        const validateCode = (rule, value, callback) => {
            if(value.length != 4) {
                callback(new Error('?????????4??????????????????'))
            }else {
                callback()
            }
        }
        return {
            msgText: '',
            msgTime: '',
            msgKey: false,
            loginForm: {
                phone: '',
                code: ''
            },
            loginRules: {
                phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
                code: [{ required: true, trigger: 'blur', validator: validateCode }]
            }
        }
    },
    created() {
        this.msgText = this.config.MSGINIT
        this.msgTime = this.config.MSGTIME
    },
    mounted() { },
    computed: {
        ...mapGetters(['tagWel']),
        config() {
            return {
                MSGINIT: this.$t('login.msgText'),
                MSGSCUCCESS: this.$t('login.msgSuccess'),
                MSGTIME: 60
            }
        }
    },
    props: [],
    methods: {
        handleSend() {
            if(this.msgKey) return
            this.msgText = this.msgTime + this.config.MSGSCUCCESS
            this.msgKey = true
            const time = setInterval(() => {
                this.msgTime--
                this.msgText = this.msgTime + this.config.MSGSCUCCESS
                if(this.msgTime == 0) {
                    this.msgTime = this.config.MSGTIME
                    this.msgText = this.config.MSGINIT
                    this.msgKey = false
                    clearInterval(time)
                }
            }, 1000)
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if(valid) {
                    this.$store.dispatch('LoginByPhone', this.loginForm).then(() => {
                        this.$router.push(this.tagWel)
                    })
                }
            })
        }
    }
}
</script>

<style>
.msg-text {
  display: block;
  width: 60px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
}
.msg-text.display {
  color: #ccc;
}
</style>
