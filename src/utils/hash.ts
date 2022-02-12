import crypto from "crypto";

export const checksum = (str: string) : Promise<string> =>  {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha1');
    hash.update(str);
    resolve(hash.digest('hex'))
  });
}

