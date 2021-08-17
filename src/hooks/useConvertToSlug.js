export default function useConvertToSlug(slug) {
    return slug
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
}