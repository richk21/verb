export function utcToDmy(date: Date): string {
    return  `${date.getUTCDate()} ${date.toLocaleString('default', {
                  month: 'short',
                })} ${date.getUTCFullYear()}`
}