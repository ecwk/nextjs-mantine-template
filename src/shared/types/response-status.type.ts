// https://github.com/omniti-labs/jsend#so-how-does-it-work
// Response Statuses
// SUCCESS - successful operation
// ERROR - failed operation / server fault
// FAIL - failed operation due to invalid data / client fault

export type ResponseStatus = 'success' | 'error' | 'fail';
