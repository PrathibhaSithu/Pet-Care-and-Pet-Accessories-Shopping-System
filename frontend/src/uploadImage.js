import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from './firebase';
import { toast } from 'react-hot-toast';

let loadingToast = null;

const uploadImage = async (file) => {
    const filename = new Date().getTime() + file.name
    const storage = getStorage(app)
    const storageRef = ref(storage, filename)

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                if (!loadingToast) {
                    loadingToast = toast.loading('Image uploading in progress');
                }
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
            toast.error('Image uploading failed');
            console.log(error)
            reject(error);
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                toast.success('Image uploaded successfully')
                toast.dismiss(loadingToast);
                loadingToast = null;
                resolve(downloadURL);
            }).catch((error) => {
                toast.error('Image uploading failed');
                console.log(error)
                reject(error);
            });
        });
    });
}

export default uploadImage
