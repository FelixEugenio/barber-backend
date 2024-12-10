import cloudinary from "../../config/cloudinary.config";
import Qrcoder from "qrcode";

const uploadUserAvatar = async (file: string) => {

    const result = await cloudinary.uploader.upload(file, {
        folder: "users",
        resource_type: "image",
    });
    return result.secure_url;
};

const uploadProfessionalAvatar = async (file: string) => {

    const result = await cloudinary.uploader.upload(file, {
        folder: "professionals",
        resource_type: "image",
    });
    return result.secure_url;
};

const uploadServiceImage = async (file: string) => {

    const result = await cloudinary.uploader.upload(file, {
        folder: "services",
        resource_type: "image",
    });
    return result.secure_url;
};


const generateAndUploadQrCodeToCloudinary = async (appointmentId:string):Promise<string> => {

    const qrCodeData =  `https://www.qrbarber/appointment/${appointmentId}`;
    const qrCodeImage = await Qrcoder.toDataURL(qrCodeData);

    const result = await cloudinary.uploader.upload(qrCodeImage, {
        folder: "qrcodes",
        resource_type: "image",
        public_id: `qrcode-${appointmentId}`,
    });
    return result.secure_url;

}

export { uploadUserAvatar ,uploadProfessionalAvatar,uploadServiceImage,generateAndUploadQrCodeToCloudinary} ;