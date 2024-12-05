import cloudinary from "../../config/cloudinary.config";

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

export { uploadUserAvatar ,uploadProfessionalAvatar,uploadServiceImage} ;