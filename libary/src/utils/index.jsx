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


export { truncateText, getBase64 };