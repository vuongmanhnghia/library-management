function truncateText(text, length) {
    if (text.length > length) {
        return text.slice(0, length) + '...';
    } else if (text.length < length) {
        text += ' ';
        return text.padEnd(length, '\u00A0');
    }
    return text;
}


export { truncateText };