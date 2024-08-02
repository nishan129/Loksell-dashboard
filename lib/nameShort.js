// nameShort.js
export function nameShortener(name, maxLength) {
    return name.length > maxLength ? name.substring(0, maxLength) + '..' : name;
}
