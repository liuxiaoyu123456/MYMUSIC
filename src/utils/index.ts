import type { IPicture } from "music-metadata";
import defaultMusic from "@/assets/music-default.jpg";

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
}