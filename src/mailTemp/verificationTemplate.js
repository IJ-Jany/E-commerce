export function verificationTemplate(link){
    
    return `<!doctypehtml><html lang=en><meta charset-uft-8><meta content="width-device-width,initial-scale=1"name=viewport><title>Email Verification</title><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;margin:0;padding:0}.container{width:100%;padding:20px}</style><div class=container><h1>Welcome to our site</h1><p>hello,<p>Thank you for registering at Our Site, your ultimate shopping destinational! We're excited to have you on board .<div class=btn-container><a href=${process.env.API_URL}/user/${link} class=btn>Verify Email</a></div></div><p>If the button above does'nt work, copy and paste the following link into your browser:<p><a href=${process.env.API_URL}/user/${link}>"${process.env.API_URL}/user/${link}"</a><p>Once your Email is verified, you will be able to enjoy full access to our platform and all the latest products and deals<p>Thank you for choosing us<p>Best Regards<div class=footer><p>If you have any questions, feel free to <a href=mailto:isratjany87@gmail.com>Contact our support team</a>.<p>© 2024. All Rights Reserved.</div>`
}