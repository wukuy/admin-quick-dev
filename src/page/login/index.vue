<template>
    <div
        class="login-container"
        @keyup.enter="handleLogin"
    >
        <div class="login-time">
            {{ time }}
        </div>
        <div class="login-weaper">
            <div class="login-left animate__animated animate__fadeInLeft">
                <img
                    class="img"
                    src="/img/logo.png"
                    alt=""
                >
                <p class="title">
                    {{ $t('login.info') }}
                </p>
            </div>
            <div class="login-border animate__animated animate__fadeInRight">
                <div class="login-main">
                    <p class="login-title">
                        {{ $t('login.title') }}{{ website.title }}
                        <top-lang />
                    </p>
                    <userLogin v-if="activeName==='user'" />
                    <codeLogin v-else-if="activeName==='code'" />
                    <faceLogin v-else-if="activeName==='face'" />
                    <div class="login-menu">
                        <a
                            href="#"
                            @click.stop="activeName='user'"
                        >{{ $t('login.userLogin') }}</a>
                        <a
                            href="#"
                            @click.stop="activeName='code'"
                        >{{ $t('login.phoneLogin') }}</a>
                        <a
                            href="#"
                            @click.stop="activeName='face'"
                        >{{ $t('login.faceLogin') }}</a>
                    </div>
                    <thirdLogin />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import userLogin from './userlogin.vue'
import codeLogin from './codelogin.vue'
import thirdLogin from './thirdlogin.vue'
import faceLogin from './facelogin.vue'
import { validatenull } from '@/utils/validate'
import topLang from '@/page/index/top/top-lang.vue'
export default {
    name: 'Login',
    components: {
        userLogin,
        codeLogin,
        thirdLogin,
        faceLogin,
        topLang
    },
    props: [],
    data() {
        return {
            time: '',
            activeName: 'user'
        }
    },
    watch: {
        $route() {
            const params = this.$route.query
            this.socialForm = params
            if(!validatenull(this.socialForm.state)) {
                const loading = this.$loading({
                    lock: true,
                    text: `${this.socialForm.state === 'WX' ? '??????' : 'QQ'
                    }?????????,??????????????????`,
                    spinner: 'el-icon-loading'
                })
                setTimeout(() => {
                    loading.close()
                }, 2000)
            }
        }
    },
    created() {
        this.getTime()
        setInterval(() => {
            this.getTime()
        }, 1000)
    },
    mounted() { },
    methods: {
        getTime() {
            this.time = this.$dayjs().format('YYYY???MM???DD??? HH:mm:ss')
        }
    }
}
</script>
