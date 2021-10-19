import React, { useMemo, VFC } from 'react'

export interface IDateTimeProps extends Intl.DateTimeFormatOptions {
  value?: DateLike
}

export const DateTime: VFC<IDateTimeProps> = ({ value, ...rest }) => {
  const date = useMemo(() => isDateLike(value) && new Date(value), [value])
  const formatter = useMemo(() => new Intl.DateTimeFormat('nb', rest), [])
  return date ? <>{formatter.format(date)}</> : null
}

export type DateLike = number | string | Date

export function isDateLike(value?: unknown): value is DateLike {
  return typeof value === 'number' || typeof value === 'string' || value instanceof Date
}
