var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 加密
 */
var Crypt = (function () {
    function Crypt() {
    }
    Crypt.lrandomkey = function () {
        var tmp = new Array(8);
        var num = 0;
        for (var i = 0; i < 8; i++) {
            num = Math.floor(Math.random() * 256);
            tmp[i] = String.fromCharCode((num & 0xff));
        }
        var str = Crypt.toString(tmp);
        return str;
    };
    Crypt.lb64encode = function (str) {
        return Base64.encode(str);
    };
    Crypt.lb64decode = function (str) {
        return Base64.decode(str);
    };
    Crypt.ltohex = function (str) {
        var hex = Crypt.toCharArray("0123456789abcdef");
        var sz = 0;
        var text = Crypt.toCharArray(str);
        sz = text.length;
        var tmp = new Array(256);
        var buffer = tmp;
        if (sz > 256 / 2) {
            buffer = new Array(sz * 2);
        }
        var i;
        var txtStr = StringConstant.empty;
        for (i = 0; i < sz; i++) {
            txtStr = text[i];
            buffer[i * 2] = hex[txtStr.charCodeAt(0) / Math.pow(2, 4)];
            buffer[i * 2 + 1] = hex[txtStr.charCodeAt(0) & 0xf];
        }
        var result = Crypt.toString(buffer);
        var reg = /\0+$/g;
        result = result.replace(reg, StringConstant.empty);
        // result = Regex.Replace(result, @"\0+$", "");
        return result;
    };
    Crypt.mul_mod_p = function (a, b) {
        var m = new bigInt(0);
        while (b.greater(0)) {
            if ((b.and(1)) > 0) {
                var t = Crypt.P.subtract(a);
                if (m.greaterOrEquals(t)) {
                    m = m.subtract(t);
                }
                else {
                    m = m.add(a);
                }
            }
            if (a.greaterOrEquals(Crypt.P.subtract(a))) {
                a = a.multiply(2).subtract(Crypt.P);
            }
            else {
                a = a.multiply(2);
            }
            b = b.divide(2);
        }
        return m;
    };
    Crypt.pow_mod_p = function (a, b) {
        if (b.equals(1)) {
            return a;
        }
        var t = Crypt.pow_mod_p(a, b.divide(2));
        t = Crypt.mul_mod_p(t, t);
        if (b.mod(2).greater(0)) {
            t = Crypt.mul_mod_p(t, a);
        }
        // console.log(t.valueOf());
        return t;
    };
    // calc a^b % p
    Crypt.powmodp = function (a, b) {
        var bia = new bigInt(a);
        var bigP = new bigInt(Crypt.P);
        if (bia.greater(bigP)) {
            bia = bia.mod(bigP);
        }
        console.log(b.valueOf());
        return Crypt.pow_mod_p(bia, b);
    };
    Crypt.push64 = function (r) {
        // let tmp: Array<bigInt> = new Array<bigInt>();
        // tmp[0] = r.and(255);
        // tmp[1] = r.divide(two8).and(255);
        // tmp[2] = r.divide(two16).and(255);
        // tmp[3] = r.divide(two24).and(255);
        // tmp[4] = r.divide(two32).and(255);
        // tmp[5] = r.divide(two40).and(255);
        // tmp[6] = r.divide(two48).and(255);
        // tmp[7] = r.divide(two56).and(255);
        // let chartmp: Array<string> = new Array<string>(8);
        // for (let i: number = 0; i < tmp.length; i++)
        // {
        // 	chartmp[i] = String.fromCharCode(tmp[i].valueOf());
        // }
        // return Crypt.toString(chartmp);
        return "";
    };
    Crypt.read64 = function (xx, yy, str1, str2) {
        // let x: Array<string> = Crypt.toCharArray(str1);
        // let y: Array<string> = Crypt.toCharArray(str2);
        // if (x.length != 8 || y.length != 8)
        // {
        // 	throw new Error("Invalid uint64 x or y");
        // }
        // let bix0: bigInt = new bigInt(x[0].charCodeAt(0));
        // let bix1: bigInt = new bigInt(x[1].charCodeAt(0));
        // let bix2: bigInt = new bigInt(x[2].charCodeAt(0));
        // let bix3: bigInt = new bigInt(x[3].charCodeAt(0));
        // let bix4: bigInt = new bigInt(x[4].charCodeAt(0));
        // let bix5: bigInt = new bigInt(x[5].charCodeAt(0));
        // let bix6: bigInt = new bigInt(x[6].charCodeAt(0));
        // let bix7: bigInt = new bigInt(x[7].charCodeAt(0));
        // let biy0: bigInt = new bigInt(y[0].charCodeAt(0));
        // let biy1: bigInt = new bigInt(y[1].charCodeAt(0));
        // let biy2: bigInt = new bigInt(y[2].charCodeAt(0));
        // let biy3: bigInt = new bigInt(y[3].charCodeAt(0));
        // let biy4: bigInt = new bigInt(y[4].charCodeAt(0));
        // let biy5: bigInt = new bigInt(y[5].charCodeAt(0));
        // let biy6: bigInt = new bigInt(y[6].charCodeAt(0));
        // let biy7: bigInt = new bigInt(y[7].charCodeAt(0));
        // xx[0] = bix0.or(bix1.multiply(two8)).or(bix2.multiply(two16)).or(bix3.multiply(two24));
        // xx[1] = bix4.or(bix5.multiply(two8)).or(bix6.multiply(two16)).or(bix7.multiply(two24));
        // yy[0] = biy0.or(biy1.multiply(two8)).or(biy2.multiply(two16)).or(biy3.multiply(two24));
        // yy[1] = biy4.or(biy5.multiply(two8)).or(biy6.multiply(two16)).or(biy7.multiply(two24));
        // xx[0] = (x[0].charCodeAt(0) | x[1].charCodeAt(0) << 8 | x[2].charCodeAt(0) << 16 | x[3].charCodeAt(0) << 24) >>> 0;
        // xx[1] = (x[4].charCodeAt(0) | x[5].charCodeAt(0) << 8 | x[6].charCodeAt(0) << 16 | x[7].charCodeAt(0) << 24) >>> 0;
        // yy[0] = (y[0].charCodeAt(0) | y[1].charCodeAt(0) << 8 | y[2].charCodeAt(0) << 16 | y[3].charCodeAt(0) << 24) >>> 0;
        // yy[1] = (y[4].charCodeAt(0) | y[5].charCodeAt(0) << 8 | y[6].charCodeAt(0) << 16 | y[7].charCodeAt(0) << 24) >>> 0;
    };
    Crypt.ldhexchange = function (key) {
        // key = "ënZhuSò";
        // let x: Array<string> = Crypt.toCharArray(key);
        // if (x.length != 8)
        // {
        // 	throw new Error("Invalid dh uint64 key");
        // }
        // let xx: Array<bigInt> = new Array<bigInt>(2);
        // let bix0: bigInt = new bigInt(x[0].charCodeAt(0));
        // let bix1: bigInt = new bigInt(x[1].charCodeAt(0));
        // let bix2: bigInt = new bigInt(x[2].charCodeAt(0));
        // let bix3: bigInt = new bigInt(x[3].charCodeAt(0));
        // let bix4: bigInt = new bigInt(x[4].charCodeAt(0));
        // let bix5: bigInt = new bigInt(x[5].charCodeAt(0));
        // let bix6: bigInt = new bigInt(x[6].charCodeAt(0));
        // let bix7: bigInt = new bigInt(x[7].charCodeAt(0));
        // xx[0] = bix0.or(bix1.multiply(two8)).or(bix2.multiply(two16)).or(bix3.multiply(two24));
        // xx[1] = bix4.or(bix5.multiply(two8)).or(bix6.multiply(two16)).or(bix7.multiply(two24));
        // let r: bigInt = new bigInt(Crypt.P, 10);
        // let mod:bigInt = new bigInt(xx[0].or(xx[1].multiply(two32)), 10);
        // r = r.modPow(5, mod);
        //  Crypt.powmodp(new bigInt(5), xx[0].or(xx[1].multiply(two32)));
        // let result = Crypt.push64(r);
        return StringConstant.empty;
    };
    Crypt.ldhsecret = function (key1, key2) {
        // let x: Array<bigInt> = new Array<bigInt>(2);
        // let y: Array<bigInt> = new Array<bigInt>(2);
        // Crypt.read64(x, y, key1, key2);
        // let r: bigInt = Crypt.powmodp(x[0].or(x[1].multiply(two32)), y[0].or(y[1].multiply(two32)));
        // return Crypt.push64(r);
        return StringConstant.empty;
    };
    Crypt.HmacSha1 = function (key, input) {
        var result = b64_hmac_sha1(key, input);
        return result;
    };
    /// <summary>
    /// AES加密 
    /// </summary>
    /// <param name="toEncrypt"></param>
    /// <param name="key"></param>
    /// <returns></returns>
    Crypt.AESEncrypt = function (toEncrypt, key) {
        var keyArray = aesjs.utils.utf8.toBytes(key);
        var keyFix = new Array(16);
        var len = Math.min(16, keyArray.length);
        for (var i = 0; i < len; i++) {
            keyFix[i] = keyArray[i];
        }
        var toEncryptArray = aesjs.utils.utf8.toBytes(toEncrypt);
        var keyFixTmp = aesjs.padding.pkcs7.pad(keyFix);
        var aesEcb = new aesjs.ModeOfOperation.ecb(keyFix);
        var test1 = aesjs.padding.pkcs7.pad(toEncryptArray);
        var encryptedBytes = aesEcb.encrypt(test1);
        var b64encoded = Base64.btoa(String.fromCharCode.apply(null, encryptedBytes));
        return b64encoded;
    };
    /// <summary>
    /// AES解密
    /// </summary>
    /// <param name="toDecrypt"></param>
    /// <param name="key"></param>
    /// <returns></returns>
    Crypt.AESDecrypt = function (toDecrypt, key) {
        // byte[] keyArray = UTF8Encoding.UTF8.GetBytes(key);
        // let keyArray: Array<number> = aesjs.utils.utf8.toBytes(key);
        // // byte[] keyFix = new byte[16];
        // let keyFix: Array<number> = new Array<number>(16);
        // // Array.ConstrainedCopy(keyArray, 0, keyFix, 0, keyArray.Length > 16 ? 16 : keyArray.Length);
        // let len: number = Math.min(16, keyArray.length);
        // for (let i: number = 0; i < len; i++)
        // {
        // 	keyFix[i] = keyArray[i];
        // }
        // // byte[] toEncryptArray = Convert.FromBase64String(toDecrypt);
        // let aesEcb: aesjs.ModeOfOperation.ecb = new aesjs.ModeOfOperation.ecb(keyFix);
        // let toEncryptArray: Array<number> = aesjs.utils.utf8.toBytes(toDecrypt);
        // let resultArray: aesjs.Float32Array = aesEcb.decrypt(toEncryptArray);
        // // RijndaelManaged rDel = GetRM();
        // // rDel.Key = keyFix;
        // // ICryptoTransform cTransform = rDel.CreateDecryptor();
        // // byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
        // // return UTF8Encoding.UTF8.GetString(resultArray);
        // return aesjs.utils.utf8.fromBytes(resultArray);
        return StringConstant.empty;
    };
    Crypt.toString = function (arrStr) {
        var str = StringConstant.empty;
        for (var i = 0; i < arrStr.length; i++) {
            str += arrStr[i];
        }
        return str;
    };
    Crypt.toCharArray = function (str) {
        var arrStr = new Array();
        if (str) {
            for (var i = 0; i < str.length; i++) {
                arrStr.push(str.charAt(i));
            }
        }
        return arrStr;
    };
    Crypt.P = new bigInt(18446744073709551557);
    return Crypt;
}());
__reflect(Crypt.prototype, "Crypt");
//# sourceMappingURL=Crypt.js.map