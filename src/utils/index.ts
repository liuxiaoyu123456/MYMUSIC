import type { IPicture } from "music-metadata";
import defaultMusic from "@/assets/music-default.jpg";
import { getUserDetail } from "@/api/user";
import { usePlayList } from "@/store/play";
import { getPlayUrl } from "@/api/song";
import { useToast } from "vuestic-ui";
import { storeToRefs } from "pinia";
import { getComment } from "@/api/comment";
import moment from 'moment';
import ColorThief from 'colorthief';

export const getTime = (data: number) => {
    const seconds = parseInt(data as unknown as string);
    const hours = Math.floor(seconds / 3600); // 计算小时数
    const minutes = Math.floor((seconds % 3600) / 60); // 计算分钟数
    const secs = seconds % 60; // 计算剩余秒数

    // 根据音频长度决定显示的格式
    let formattedTime = '';
    if (hours > 0) {
        // 如果有小时数，则显示小时
        formattedTime += `${hours.toString().padStart(2, '0')}:`;
    }
    formattedTime += `${minutes.toString().padStart(2, '0')}:`;
    formattedTime += `${secs.toString().padStart(2, '0')}`;

    return formattedTime;
}

export function formatFileSizeInMB(bytes: number): string {
  if (bytes < 0) {
    throw new Error('File size cannot be negative');
  }
  const megabytes = bytes / 1048576; // 1 MB = 1024 * 1024 bytes
  return megabytes.toFixed(2) + ' M'; // 返回格式化的字符串，保留两位小数
}

export const getImage = (pic: IPicture[])=> {
  let picSrc = defaultMusic;
  if(pic && pic.length > 0) {
    let base64String = "";
    for (let i = 0; i < pic[0].data.length; i++) {
      base64String += String.fromCharCode(pic[0].data[i]);
    }
    picSrc = "data:image/jpeg;base64," + window.btoa(base64String);
  }
  return picSrc;
};

export const isLogin = async() => {
  const { data } = await getUserDetail();
  return data;
};

export const getListen = (num: number) => {
  // 将数字除以10000，并保留一位小数
    const result = `${(num / 10000).toFixed(1)}万`;
    return result;
};

export const getArtist = (arr: any) => {
  const list = arr.map(item=>(item.name));
  return list.join(',');
};

export const getNetworkImage = (mid: string) => {
  let res = defaultMusic;
  if(mid) {
    res = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}_1.jpg`;
  }
  return res;
};

export const transformUrls = (obj: object) => {
  const arr = [];
  for(const item in obj) {
    arr.push(obj[item]);
  }
  return arr;
};

export const getNetWorkUrls = async(i: number) => {
  const store = usePlayList();
  const { selectItem } = store;
  const { playList, playMode } = storeToRefs(store);
  let urls: string[] = [];
  while(urls.length === 0) {
    selectItem(playList.value[i].id);
    const { data } = await getPlayUrl(playList.value[i].id);
    urls = transformUrls(data.data);
    if(urls.length === 0) {
      useToast().init({
        message: "此歌曲需要会员才能播放，自动播放下一首",
        color: 'danger',
        duration: 2000,
      })
      await new Promise(resolve => setTimeout(resolve, 2000));
      if(playMode.value === 'repeat') {
        i = i === playList.value.length - 1? 0:i+1;
      }else if(playMode.value === 'random') {
        i = Math.floor(Math.random() * playList.value.length);
      }else {
        break;
      }
    }
  }
  return urls;
};

export const getComments = async(id: number) => {
  const { data } = await getComment(id);
  const count = data.comment.commenttotal;
  return count;
}

export const formatteTime  = (num: number) => {
  const time = moment(num*1000).format('YYYY-MM-DD HH:mm:ss');
  return time;
};

export const formatteDate = (num: number) => {
  const date = moment(num*1000).format('YYYY-MM-DD');
  return date;
};

export const fuzzySearch = (arr: any, keyword: string, fields: string[] = []) => {
  if (!keyword) return arr;
  const kw = String(keyword).toLowerCase();

  return arr.filter((item: any) =>
    (fields.length ? fields : Object.keys(item)).some(key => {
      const val = item[key];
      return val != null && String(val).toLowerCase().includes(kw);
    })
  );
};

export const getMvSingers = (arr: any): string => {
  return arr.map((item: any) => item.name).join(',');
};

export const getColors = (imgSrc: string) => {
  const colorThief = new ColorThief();
  let color = '#121212'
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imgSrc;
  img.onload = () => {
    const [r, g, b] = colorThief.getColor(img);
    color = `rgb(${r},${g},${b})`;
    console.log(color);
  };
  return color;
};