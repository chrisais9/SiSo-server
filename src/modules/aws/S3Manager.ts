/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-21
 * @modify date 2022-01-21
 */

import AWS from "aws-sdk"

AWS.config.loadFromPath('./config/s3-config.json')

class S3Manager {
    private s3 = new AWS.S3()

    async upload(bucket: string, filename: string, file: File | Buffer, ACL: string = "public-read"): Promise<AWS.S3.ManagedUpload.SendData> {
        return await this.s3
            .upload({
                Bucket: bucket,
                Key: filename,
                Body: file,
                ACL
            })
            .promise()
    }
}

export default new S3Manager()
