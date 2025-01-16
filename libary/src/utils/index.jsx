function truncateText(text, length) {
    if (text.length > length) {
        return text.slice(0, length) + '...';
    } else if (text.length < length) {
        text += ' ';
        return text.padEnd(length, '\u00A0');
    }
    return text;
}

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });

const convertImagePathToBase64 = async (imagePath) => {
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });

    try {
        const response = await fetch(imagePath); // Tải ảnh từ đường dẫn
        const blob = await response.blob(); // Chuyển ảnh thành Blob
        const base64String = await getBase64(blob); // Chuyển Blob sang Base64
        return base64String; // Trả về chuỗi Base64
    } catch (error) {
        console.error('Lỗi khi chuyển ảnh thành Base64:', error);
        return null;
    }
};

export { truncateText, getBase64, convertImagePathToBase64 };
