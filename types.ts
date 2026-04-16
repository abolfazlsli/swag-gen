
    export type FetchType<T = any> = {
    success: true;
    data? : T;
} | {
    success: false;
    error: string;
    data? : null

};
