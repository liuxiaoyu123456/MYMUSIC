import axios from "@/utils/request";

const cookie = "pgv_pvid=2488483604; fqm_pvqid=6ed6b401-4ce7-49c6-af1b-970c713de51d; ts_refer=ADTAGmyqq; ts_uid=2555949221; RK=Ma/05GeK6Q; ptcz=3a795997ce42e4c3ad71824fa9c5ff2b46b6682463bf47a88f0ebde10130ea19; ptui_loginuin=2717617783; fqm_sessionid=2742c740-51d0-4dca-b8eb-1d1b4b665be1; pgv_info=ssid=s7216725040; _qpsvr_localtk=0.7695482862552472; euin=owS57iC57iSFoz**; tmeLoginType=2; music_ignore_pskey=202306271436Hn@vBj; ts_last=y.qq.com/n/ryqq/profile/like/song; login_type=1; uin=2717617783; psrf_qqopenid=E6CE78336CE1BB2EC8D194518E20B38B; qm_keyst=Q_H_L_63k3N0YpYvA_m5V9sJWn6i1dGThPKsLcZw6M9RBCa3js_fZPJwzthk4L90evVxMhmrpkHiVeVriFtOQxxiMh10sQTZN-Ofw; psrf_qqunionid=E804A7CADB28E19AD068190A3FBB4892; wxunionid=; wxopenid=; psrf_qqrefresh_token=C1AF5570DED08279B4A86EA5CF4F5026; qqmusic_key=Q_H_L_63k3N0YpYvA_m5V9sJWn6i1dGThPKsLcZw6M9RBCa3js_fZPJwzthk4L90evVxMhmrpkHiVeVriFtOQxxiMh10sQTZN-Ofw; wxrefresh_token=; psrf_access_token_expiresAt=1758030947; psrf_qqaccess_token=D322F8225EE2A87565C0B9D5E05A73B6; psrf_musickey_createtime=1752846947";

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