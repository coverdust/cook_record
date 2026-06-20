export class HttpError extends Error {
  constructor(status, message, details = undefined) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function assertRequired(value, field) {
  if (value === undefined || value === null || value === "") {
    throw new HttpError(400, `${field} 不能为空`);
  }
}
