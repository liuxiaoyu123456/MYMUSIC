import axios from "@/utils/request";

const cookie = "pgv_pvid=2488483604; fqm_pvqid=6ed6b401-4ce7-49c6-af1b-970c713de51d; ts_refer=ADTAGmyqq; ts_uid=2555949221; RK=Ma/05GeK6Q; ptcz=3a795997ce42e4c3ad71824fa9c5ff2b46b6682463bf47a88f0ebde10130ea19; fqm_sessionid=33c85621-42d0-47b0-bc1e-5250f350f3bf; pgv_info=ssid=s2592216627; _qpsvr_localtk=0.8738878517255311; login_type=1; psrf_qqunionid=E804A7CADB28E19AD068190A3FBB4892; tmeLoginType=2; wxopenid=; psrf_access_token_expiresAt=1756970494; euin=owS57iC57iSFoz**; psrf_musickey_createtime=1751786494; wxrefresh_token=; uin=2717617783; qqmusic_key=Q_H_L_63k3NYA62z6j-pmN9XN2JrSUJZN4-QdrWW7UP2li35QNUZPpzG0iOG7YCzdgxotiZ0sB-ShBdw3aXC-RB6XNllefIun2_3g; music_ignore_pskey=202306271436Hn@vBj; psrf_qqopenid=E6CE78336CE1BB2EC8D194518E20B38B; psrf_qqaccess_token=D322F8225EE2A87565C0B9D5E05A73B6; wxunionid=; psrf_qqrefresh_token=C1AF5570DED08279B4A86EA5CF4F5026; qm_keyst=Q_H_L_63k3NYA62z6j-pmN9XN2JrSUJZN4-QdrWW7UP2li35QNUZPpzG0iOG7YCzdgxotiZ0sB-ShBdw3aXC-RB6XNllefIun2_3g; ts_last=y.qq.com/n/ryqq/playlist/7426999757";

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