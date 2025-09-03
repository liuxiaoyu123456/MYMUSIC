# MYMUSIC

> 一款基于Vue3 + ts + vite + Electron的桌面音乐播放器应用，仿qq音乐，目前本地音频部分开发完成

## 开发语言

- 本项目采用Vue3框架 + Typescript语言 + Electron进行开发，支持客户端
- 使用UI组件库为Vuestic
- 使用pinia为全局状态管理工具
- 使用轻量级音频插件Howl
- 使用视频播放插件ArtPlayer.js

## 功能

- [x] 支持音乐暂停和播放，切换上一首和下一首
- [x] 支持随机播放、单曲循环、循环播放
- [x] 支持本地音乐筛选功能
- [x] 支持倍速
- [x] 查看喜欢音乐列表
- [x] 初步实现qq登录功能，目前只能使用QQ号+Cookie方式登录，后续会改进

## 功能界面
> 正在开发中，目前只开发了前端本地音乐部分的完整功能，可以查看喜欢音乐列表，并播放在线音乐
<details>
<summary>登录界面</summary>

![登录页](/src/assets/截图20250609192251.png)

</details>
<details>
<summary>本地音乐主页面</summary>

![主页面](/src/assets/截图20250603025027.png)

</details>

## 后端接口
> 一款基于Node.js的QQ音乐接口，借用的开源项目

[QQMusicApi](https://github.com/jsososo/QQMusicApi)

