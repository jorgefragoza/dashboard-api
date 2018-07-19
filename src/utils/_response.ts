export const _response = (code:number,data:any, error?:any) => {
    return {
        code: code,
        data: data,
        error: error
    };
};