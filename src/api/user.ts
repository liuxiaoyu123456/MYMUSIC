import axios from "@/utils/request";

const cookie = "pgv_pvid=2488483604; fqm_pvqid=6ed6b401-4ce7-49c6-af1b-970c713de51d; ts_refer=ADTAGmyqq; ts_uid=2555949221; RK=Ma/05GeK6Q; ptcz=3a795997ce42e4c3ad71824fa9c5ff2b46b6682463bf47a88f0ebde10130ea19; fqm_sessionid=7852bbcf-04f3-4d3c-b6fa-6ada2d530bf7; pgv_info=ssid=s9803469797; ts_last=y.qq.com/n/ryqq/playlist/1688453183; _qpsvr_localtk=0.0854274713262011; login_type=1; uin=2717617783; wxrefresh_token=; qm_keyst=Q_H_L_63k3NnaH-ECe0xlnGcKYHXkZjZrBJVL8CoO-Q1pghysOAtvw5JRoU1UpXJ1La_TbX6Tk4gaNgoTqQPHb6vJVpnmMpP4Q; psrf_qqaccess_token=D322F8225EE2A87565C0B9D5E05A73B6; wxunionid=; psrf_access_token_expiresAt=1754456671; euin=owS57iC57iSFoz**; tmeLoginType=2; psrf_musickey_createtime=1749272671; psrf_qqrefresh_token=C1AF5570DED08279B4A86EA5CF4F5026; qqmusic_key=Q_H_L_63k3NnaH-ECe0xlnGcKYHXkZjZrBJVL8CoO-Q1pghysOAtvw5JRoU1UpXJ1La_TbX6Tk4gaNgoTqQPHb6vJVpnmMpP4Q; psrf_qqunionid=E804A7CADB28E19AD068190A3FBB4892; wxopenid=; music_ignore_pskey=202306271436Hn@vBj; psrf_qqopenid=E6CE78336CE1BB2EC8D194518E20B38B";

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