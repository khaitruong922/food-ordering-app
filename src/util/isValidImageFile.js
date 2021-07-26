export default function isValidImageFile(file) {
    const validImageTypes = ['image/jpeg', 'image/png'];
    const maximumFileMbSize = 1
    const { type, size } = file
    if (!validImageTypes.includes(type)) return { valid: false, message: "Please upload a valid image file!" }
    const mbSize = size / 1024 / 1024
    if (mbSize > maximumFileMbSize) return { valid: false, message: "File size must not be larger than 1 MB" }
    return { valid: true, message: '' }
}
