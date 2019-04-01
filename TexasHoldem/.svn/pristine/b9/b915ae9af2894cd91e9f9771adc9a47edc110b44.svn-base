/**
 * 加密
 */
class Crypt
{
	public static lrandomkey(): string
	{
		let tmp: Array<string> = new Array<string>(8);
		let num: number = 0;
		for (let i: number = 0; i < 8; i++)
		{
			num = Math.floor(Math.random() * 256);
			tmp[i] = String.fromCharCode((num & 0xff));
		}
		let str: string = Crypt.toString(tmp);
		return str;
	}
	public static lb64encode(str: string): string
	{
		return Base64.encode(str);
	}
	public static lb64decode(str: string): string
	{
		return Base64.decode(str);
	}
	private static readonly P: bigInt = new bigInt(18446744073709551557);
	public static ltohex(str: string): string
	{
		let hex: Array<string> = Crypt.toCharArray("0123456789abcdef");
		let sz: number = 0;
		let text: Array<string> = Crypt.toCharArray(str);
		sz = text.length;
		let tmp: Array<string> = new Array<string>(256);
		let buffer: Array<string> = tmp;
		if (sz > 256 / 2)
		{
			buffer = new Array<string>(sz * 2);
		}
		let i: number;
		let txtStr: string = StringConstant.empty;
		for (i = 0; i < sz; i++)
		{
			txtStr = text[i];
			buffer[i * 2] = hex[txtStr.charCodeAt(0) / Math.pow(2, 4)];
			buffer[i * 2 + 1] = hex[txtStr.charCodeAt(0) & 0xf];
		}
		let result: string = Crypt.toString(buffer);
		let reg: RegExp = /\0+$/g;
		result = result.replace(reg, StringConstant.empty);
		// result = Regex.Replace(result, @"\0+$", "");
		return result;
	}
	private static mul_mod_p(a: bigInt, b: bigInt): bigInt
	{
		let m: bigInt = new bigInt(0);
		while (b.greater(0))
		{
			if ((b.and(1)) > 0)
			{
				let t: bigInt = Crypt.P.subtract(a);
				if (m.greaterOrEquals(t))
				{
					m = m.subtract(t);
				}
				else
				{
					m = m.add(a);
				}
			}
			if (a.greaterOrEquals(Crypt.P.subtract(a)))
			{
				a = a.multiply(2).subtract(Crypt.P);
			}
			else
			{
				a = a.multiply(2);
			}
			b = b.divide(2);
		}
		return m;
	}
	private static pow_mod_p(a: bigInt, b: bigInt): bigInt
	{
		if (b.equals(1))
		{
			return a;
		}
		let t: bigInt = Crypt.pow_mod_p(a, b.divide(2));
		t = Crypt.mul_mod_p(t, t);
		if (b.mod(2).greater(0))
		{
			t = Crypt.mul_mod_p(t, a);
		}
		// console.log(t.valueOf());
		return t;
	}
	// calc a^b % p
	private static powmodp(a: bigInt, b: bigInt): bigInt
	{
		let bia: bigInt = new bigInt(a);
		let bigP: bigInt = new bigInt(Crypt.P);
		if (bia.greater(bigP))
		{
			bia = bia.mod(bigP);
		}
		console.log(b.valueOf());
		return Crypt.pow_mod_p(bia, b);
	}

	private static push64(r: bigInt): string
	{
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
	}
	private static read64(xx: Array<bigInt>, yy: Array<bigInt>, str1: string, str2: string)
	{
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
	}

	public static ldhexchange(key: string): string
	{
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
	}
	public static ldhsecret(key1: string, key2: string): string
	{
		// let x: Array<bigInt> = new Array<bigInt>(2);
		// let y: Array<bigInt> = new Array<bigInt>(2);
		// Crypt.read64(x, y, key1, key2);
		// let r: bigInt = Crypt.powmodp(x[0].or(x[1].multiply(two32)), y[0].or(y[1].multiply(two32)));
		// return Crypt.push64(r);
		return StringConstant.empty;
	}
	public static HmacSha1(key: string, input: string): string
	{
		let result: string = b64_hmac_sha1(key, input);
		return result;
	}
	/// <summary>
	/// AES加密 
	/// </summary>
	/// <param name="toEncrypt"></param>
	/// <param name="key"></param>
	/// <returns></returns>
	public static AESEncrypt(toEncrypt: string, key: string): string
	{
		let keyArray: Array<number> = aesjs.utils.utf8.toBytes(key);
		let keyFix: Array<number> = new Array<number>(16);
		let len: number = Math.min(16, keyArray.length);
		for (let i: number = 0; i < len; i++)
		{
			keyFix[i] = keyArray[i];
		}
		let toEncryptArray = aesjs.utils.utf8.toBytes(toEncrypt);
		let keyFixTmp = aesjs.padding.pkcs7.pad(keyFix);
		let aesEcb: aesjs.ModeOfOperation.ecb = new aesjs.ModeOfOperation.ecb(keyFix);
		let test1 = aesjs.padding.pkcs7.pad(toEncryptArray);
		let encryptedBytes: aesjs.Float32Array = aesEcb.encrypt(test1);
		let b64encoded = Base64.btoa(String.fromCharCode.apply(null, encryptedBytes));
		return b64encoded;
	}


	/// <summary>
	/// AES解密
	/// </summary>
	/// <param name="toDecrypt"></param>
	/// <param name="key"></param>
	/// <returns></returns>
	public static AESDecrypt(toDecrypt: string, key: string): string
	{
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
	}
	private static toString(arrStr: Array<string>): string
	{
		let str: string = StringConstant.empty;
		for (let i: number = 0; i < arrStr.length; i++)
		{
			str += arrStr[i]
		}
		return str;
	}
	private static toCharArray(str: string): Array<string>
	{
		let arrStr: Array<string> = new Array<string>();
		if (str)
		{
			for (let i = 0; i < str.length; i++)
			{
				arrStr.push(str.charAt(i));
			}
		}
		return arrStr;
	}
}