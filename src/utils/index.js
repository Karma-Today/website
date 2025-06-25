export const shortAccount = (account) => {
    if (!account || account === '') {
        return ''
    } else if (!account.startsWith('0x')) {
        return account
    }

    return account.substr(0,6)+'...' + account.substr(account.length - 4)
}