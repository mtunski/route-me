export const isApiAction = action => /^API_/.test(action.type)

export const isPending = action => action.status === "pending"

export const isSuccess = action => action.status === "success"

export const isError = action => action.status === "error"
