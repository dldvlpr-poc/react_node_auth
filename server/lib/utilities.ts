import * as jwt from "jsonwebtoken";
import {IGenerateToken} from "./utilities.spec";

const SECRET_KEY =
    "cYXbaayLL9/r4csPTvFFdNiFXOqae8EeyAkfHgxp5J1Y/KLYSoiNy8cI3HgNmGAUSYw5HFP2xjNdfeOHgiKAIDxJKIhtJHTJ19YvFpxilVddM5f13cW+6t/OclwgsM2aLg7PyEJaU+U7espfSeYw/teQTochjybTeSFkqxstdA+cDN4kqgTDt7kRzdqAcUjVztGLYxPlr/DZN9ZKWAzb/rY+Jv4CjhvRwjHSMH2umDPbZSgxAylR+J41FtMHD406Ptn7vxVeqB0sIvqU6Ebb88gZVBH2HRih4zeCTTZ5Rl+mBTm57pYMCZjb6y03WnXQFVYxKwIWiyWPKH74VqrwyA==";

//fonction permettant de générer un token
export function generateToken(infos: IGenerateToken) {
    return jwt.sign(infos, SECRET_KEY, {expiresIn: "2h"});
}

//Fonction permettant de générer un ID unique
export function create_UUID() {
    let dt = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
}

export function getUser(token: string) {
    let payload = null;
    if (token) {
        try {
            payload = jwt.verify(token, SECRET_KEY);
        } catch (e: any) {
            payload = null;
        }
    }
    return payload;
}