export function getDateByString():string {
    return new Date().toLocaleDateString('ru-RU', {
        day : 'numeric',
        month : 'numeric',
        year : 'numeric'
    }).split(' ').join('.')
}