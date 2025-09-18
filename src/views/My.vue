<template>
    <VaCard color="rgba(44, 130, 224, 0.1)">
        <VaCardContent class="content">
            <img class="headpic" :src="userInfo.headpic"/>
            <div class="detail">
                <div>
                    <span class="nick">{{ userInfo.nick }}</span>
                    <VaButton class="grey" size="small" color="rgba(44, 130, 224, 0.1)">vip</VaButton>
                    <!-- <VaButton type="primary" size="small">vip</VaButton> -->
                </div>
                <div class="introduce">
                    简介：
                    <!-- {{ useUserInfo }} -->
                </div>
            </div>
        </VaCardContent>
    </VaCard>
</template>
<script lang="ts" setup>
import { useUserInfo } from '@/store/user';
import { storeToRefs } from 'pinia';

const { userInfo } = storeToRefs(useUserInfo());
</script>
<style scoped>
.headpic {
    border-radius: 50%;
    height: 140px;
}
.content {
    display: flex;
}
.detail {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.nick {
    font-size: 24px;
    font-weight: bolder;
    margin-right: 10px;
}
.grey {
    background-color: var(--va-shadow) !important;
    color: #fff !important;
}
.introduce {
    margin-top: 15px;
}
</style>