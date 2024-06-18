import { Database } from './schema'
export type Task = Database['public']['Tables']['tasks']['Row']

// For makinging the type global:
// See for example https://blog.logrocket.com/using-next-js-with-typescript/
