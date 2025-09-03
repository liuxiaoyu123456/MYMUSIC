<template>
    <div class="login">
        <VaButton
          round
          icon="keyboard_arrow_left"
          class="return"
          background-opacity="0.8"
          color="backgroundPrimary"
          @click="router.go(-1)"
        />
        <div class="box">
            <VaCard>
                <VaCardContent class="content">
                    <div class="h1">欢迎！</div>
                    <div class="h2">登录</div>
                    <div>海贝音乐</div>
                    <VaForm ref="Login" class="form">
                        <div class="item">
                           <span class="label">QQ号</span>
                           <VaInput
                             class="no-drag"
                             v-model="loginForm.username"
                             placeholder="请输入QQ"
                             :rules="[(value) => (value && value.length > 0) || 'QQ必须填写！']"
                            />
                        </div>
                        <div class="item">
                            <span class="label">Cookie</span>
                            <VaTextarea
                              class="no-drag"
                              v-model="loginForm.cookie"
                              placeholder="请填入cookie值"
                              max-rows="3"
                              min-rows="3"
                              :autosize="true"
                              :rules="[(value) => (value && value.length > 0) || 'Cookie必须填写！']"
                            />
                        </div>
                        <div class="remember">
                            <VaCheckbox
                              class="no-drag"
                              v-model="loginForm.remember"
                              label="记住我"
                            />
                        </div>
                    </VaForm>
                    <VaButton
                      class="submit"
                      @click="login"
                    >登录</VaButton>
                </VaCardContent>
            </VaCard>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vuestic-ui';
import { getCookie, setCookie } from '@/api/user';
import { getUserDetail } from '@/api/user';
import { useRoute, useRouter } from 'vue-router';
import { useUserInfo } from '@/store/user';

const { setQQ, setLogin, changeMyRoute, userInfo, getQQ, setUserInfo } = useUserInfo();

const route = useRoute();

const router = useRouter();

const loginForm = ref({
    username: '',
    cookie: '',
    remember: false,
})

const { validate } = useForm('Login');

const login = async() => {
    if(validate()) {
        setQQ(loginForm.value.username);
        setCookie(loginForm.value.cookie);
        await getCookie(loginForm.value.username);
        setLogin();
        changeMyRoute();
        if(JSON.stringify(userInfo)=='{}'){
            const qq = getQQ();
            const { data } = await getUserDetail(qq);
            setUserInfo(data.data);
        }
        const redirect = route.query.redirect || '/';
        router.replace(redirect as unknown as string);
    }
};
</script>
<style scoped>
.login {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url('@/assets/login.jpg');
    background-size: cover;
    position: relative;
    -webkit-app-region: drag;
}
button {
    -webkit-app-region: no-drag;
}
.box {
    width: 500px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    left: 75px;
}
.content {
    padding: 25px;
}
.form {
    margin-top: 25px;
}
.h1 {
    font-size: 25px;
}
.h2 {
    font-size: 25px;
    font-weight: bolder;
    margin-top: 20px;
    margin-bottom: 10px;
}
.va-input-wrapper {
    width: 100%;
}
.item {
    margin-bottom: 16px;
}
.label {
    margin-bottom: 8px;
    display: inline-block;
}
.submit {
    width: 100% !important;
}
.remember {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.tip {
    text-align: center;
    margin: 50px auto 0px;
}
.return {
    position: absolute;
    top: 20px;
    left: 20px;
}
</style>