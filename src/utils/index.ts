import type { IPicture } from "music-metadata";
import defaultMusic from "@/assets/music-default.jpg";
import { getUserDetail } from "@/api/user";
import { usePlayList } from "@/store/play";
import { getPlayUrl } from "@/api/song";
import { useToast } from "vuestic-ui";
import { storeToRefs } from "pinia";
import { getComment } from "@/api/comment";
import moment from 'moment';

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

export const getColors = async(imgUrl: string) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imgUrl;
  await img.decode();

  const canvas = document.createElement('canvas');
  const ctx    = canvas.getContext('2d');

  // 为性能，把大图缩到 ≤ 200*200
  const maxSide = 200;
  const ratio = Math.min(maxSide / img.width, maxSide / img.height);
  canvas.width  = img.width  * ratio;
  canvas.height = img.height * ratio;

  ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

  // 读取像素
  const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;   // Uint8ClampedArray

  let r = 0, g = 0, b = 0, len = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  r = Math.round(r / len);
  g = Math.round(g / len);
  b = Math.round(b / len);

  // 返回 {rgb, hex}
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const resetUrl = (url: string | undefined) => {
  return url? url.slice(0, -1): '';
};