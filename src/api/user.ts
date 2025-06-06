import axios from "@/utils/request";

const cookie = "pgv_pvid=2488483604; fqm_pvqid=6ed6b401-4ce7-49c6-af1b-970c713de51d; fqm_sessionid=6062f7e6-09ed-4382-ba59-61daa824e2b5; pgv_info=ssid=s5749089000; ts_refer=ADTAGmyqq; ts_uid=2555949221; _qpsvr_localtk=0.24086741843079795; RK=Ma/05GeK6Q; ptcz=3a795997ce42e4c3ad71824fa9c5ff2b46b6682463bf47a88f0ebde10130ea19; login_type=1; psrf_access_token_expiresAt=1754164003; psrf_qqopenid=E6CE78336CE1BB2EC8D194518E20B38B; psrf_qqrefresh_token=C1AF5570DED08279B4A86EA5CF4F5026; psrf_musickey_createtime=1748980003; wxopenid=; euin=owS57iC57iSFoz**; qqmusic_key=Q_H_L_63k3NNNNvByQx7rmAMH6QPtp-dT6CYKMo9cjaix-7G_33l6UiylaYjtHr_Oc8j6XROaBke8SBCJ0gGqUmK1k0G-ZAhY0; psrf_qqunionid=E804A7CADB28E19AD068190A3FBB4892; music_ignore_pskey=202306271436Hn@vBj; qm_keyst=Q_H_L_63k3NNNNvByQx7rmAMH6QPtp-dT6CYKMo9cjaix-7G_33l6UiylaYjtHr_Oc8j6XROaBke8SBCJ0gGqUmK1k0G-ZAhY0; wxrefresh_token=; tmeLoginType=2; psrf_qqaccess_token=D322F8225EE2A87565C0B9D5E05A73B6; wxunionid=; uin=2717617783; ts_last=y.qq.com/n/ryqq/profile/like/song";

export const userRefresh = () => {
    const res = axios({
        method: 'get',
        url: '/user/refresh'
    });
    return res;
};

export const getCookie = (id: string) => {
    const res = axios({
        method: 'get',
        url: '/user/getCookie',
        params: {
            id
        },
    });
    return res;
};

export const setCookie = () => {
    const res = axios({
        url: '/user/setCookie',
        method: 'post',
        data: {
            data: cookie
        },
        headers: {
            "Content-Type": "application/json"
        }
    })

    return res;
};

export const getUserDetail = () => {
    const res = axios({
        method: 'get',
        url: '/user/detail',
        params: {
            id: '2717617783',
        }
    })
    return res;
}