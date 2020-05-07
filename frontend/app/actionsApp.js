export const APP_BUSY = 'APP_BUSY';

export function setBusy(payload) {
    return {
        type: APP_BUSY,
        payload
    }
}
