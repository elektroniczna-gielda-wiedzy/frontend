export interface StandardResponse<T> {
    success: boolean;
    messages: string[];
    result: T[];
}