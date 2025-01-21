function truncateText(text, lenText) {
    if (!text) {
        return ''; 
    }
    if (text.length > lenText) {
        return text.slice(0, lenText) + '...';
    } else if (text.length < lenText) {
        text += ' ';
        return text.padEnd(lenText, '\u00A0');
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
        const response = await fetch(imagePath); 
        const blob = await response.blob(); 
        const base64String = await getBase64(blob); 
        return base64String; 
    } catch (error) {
        console.error('Lỗi khi chuyển ảnh thành Base64:', error);
        return null;
    }
};

export { truncateText, getBase64, convertImagePathToBase64 };
