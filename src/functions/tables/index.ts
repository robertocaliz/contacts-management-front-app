export const migrateToPrevPage = (pageLegth: number, currentPage: number) => {
    return pageLegth - 1 === 0 && currentPage > 1;
};
