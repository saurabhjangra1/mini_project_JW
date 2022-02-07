function openNav() {
    document.getElementById("sideNav").style.width = "240px";
}
function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '667201447939-hg8s64l53eajuko48q07vp9dplrq5a0l.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04ussQ9DjXDBNCgYIARAAGAQSNwF-L9IrSqAsMo6roGab80BAtzRWmN5Ahdf-Sz1I8yeDsNK8TLh0o_wHe0g2YGDHziSFZk_AdTE';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, "images/photo.jpg")

async function uploadFile(){
    try{
        const response = await drive.files.create({
            requestBody: {
                name: 'photo.jpg',
                mimeType: 'image/jpg'
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath)
            }
        });

        console.log(response.data);
    }
    catch(error){
        console.log(error.message)
    }
}

// uploadFile();

async function generatePublicURL(){
    try{
        const fileId = '1EJw5kGRL4npFaaum1j0x4K54Z0KnaFbT';
        await drive.permissions.create({
            fileId: fileId,
            requestBody:{
                role: 'reader',
                type: 'anyone'
            }
        })

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        })
        console.log(result.data)
    }
    catch(error){
        console.log(error.message)
    }
}

generatePublicURL();