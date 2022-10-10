<template>
    <div class="third">
        <div class="box">
            <i
                class="iconfont icon-QQ"
                style="color:#53a4d8"
                @click="handleClick('qq')"
            />
            <i
                class="iconfont icon-weixinicon2x"
                style="color:#71c252"
                @click="handleClick('wx')"
            />
            <i
                class="iconfont icon-weibo"
                style="color:#c73420"
                @click="handleClick('wb')"
            />
            <i
                class="iconfont icon-zhifubao"
                style="color:#439fe2"
                @click="handleClick('zfb')"
            />
            <i
                class="iconfont  icon-huaban88"
                style="color:#666"
                @click="handleClick('github')"
            />
        </div>
    </div>
</template>

<script>
import { openWindow } from 'utils/util'

export default {
    name: 'ThirdLogin',
    methods: {
        handleClick(thirdpart) {
            let appid, client_id, redirect_uri, url
            redirect_uri = encodeURIComponent(
                window.location.origin + '/#/authredirect'
            )
            if(thirdpart === 'wx') {
                appid = 'xxxx'
                url =
          'https://open.weixin.qq.com/connect/qrconnect?appid=' +
          appid +
          '&redirect_uri=' +
          redirect_uri +
          '&state=WX&response_type=code&scope=snsapi_login#wechat_redirect'
            }else if(thirdpart === 'qq') {
                client_id = 'xxxx'
                url =
          'https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ&client_id=' +
          client_id +
          '&redirect_uri=' +
          redirect_uri
            }
            openWindow(url, thirdpart, 540, 540)
        }
    }
}
</script>

<style lang="scss" scoped>
.third {
  padding: 10px 0;
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  i {
    font-size: 36px;
    margin: 0 10px;
  }
}
</style>
