const aws = require('aws-sdk')
const { S3_BUCKET_PIC, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

module.exports = {
    getS3Pic: (req, res) => {
        aws.config = {
            region: 'us-west-1',
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        };
        console.log(req.query)
        const s3 = new aws.S3();
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];
        const s3Params = {
            Bucket: S3_BUCKET_PIC,
            Key: fileName,
            Expires: 300,
            ContentType: fileType,
            ACL: 'public-read',
        };

        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.log(err);
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET_PIC}.s3.amazonaws.com/${fileName}`,
            };
            return res.status(200).send(returnData);
        });
    }
}