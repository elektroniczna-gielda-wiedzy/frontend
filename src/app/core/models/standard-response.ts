export interface StandardResponse<T> {
    success: boolean;
    message: string[];
    result: T[];
}