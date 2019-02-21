


import * as functions from 'firebase-functions';
const path = require("path");

export const resizeThumbnail = functions.storage.object()
    .onFinalize(async (object, context) => {

        const fileFullPath = object.name || '',
             contentType = object.contentType || '',
            fileDir = path.dirname(fileFullPath),
            fileName = path.basename(fileFullPath);

        console.log("Thumbnail generation started: ", fileFullPath , fileDir, fileName);

        if (!contentType.startsWith("image/")) {
            return null;
        }

        return null;

    });
