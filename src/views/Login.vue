<template>
    <div class="login">
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
                             v-model="loginForm.username"
                             placeholder="请输入QQ"
                             :rules="[(value) => (value && value.length > 0) || 'QQ必须填写！']"
                            /> 
                        </div>
                        <!-- <div class="item">
                            <span class="label">密码</span>
                            <VaInput
                              v-model="loginForm.password"
                              placeholder="请输入密码"
                              type="password"
                              :rules="[(value) => (value && value.length > 0) || '密码必须填写！']"
                            /> 
                        </div> -->
                        <div class="remember">
                            <VaCheckbox
                                v-model="loginForm.remember"
                                label="记住我"
                            />
                            <!-- <VaButton preset="plain">忘记密码？</VaButton> -->
                        </div>
                    </VaForm>
                    <VaButton
                      class="submit"
                      @click="login"
                    >登录</VaButton>
                    <!-- <div class="tip">
                        还没有注册？
                        <VaButton preset="plain">去注册</VaButton>
                    </div> -->
                </VaCardContent>
            </VaCard>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vuestic-ui';
import { getCookie, setCookie } from '@/api/user';
import router from '@/router';

const loginForm = ref({
    username: '',
    remember: false,
})

const { validate } = useForm('Login');

const login = () => {
    if(validate()) {
        setCookie();
        getCookie(loginForm.value.username);
        router.push('/local');
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
</style>