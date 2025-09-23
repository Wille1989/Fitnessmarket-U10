export type ApiResponse< T > = {
    data?: T | null
    message?: string
    error?: unknown
}