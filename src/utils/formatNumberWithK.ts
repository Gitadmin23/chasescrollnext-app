
export const formatNumberWithK = (num: any) => {
    // if(number === 0 || !number) {
    //     return "0"
    // } else {
    //     return number > 999 ? `${Math.trunc(number / 1000)}k` : number
    // }
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
    }
    if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num?.toString();

}

export const numberFormatNaire = (x: any) => {
    return "₦" + Number(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};

export const numberFormatDollar = (x: any) => {
    return "$" + Number(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};

export const numberFormat = (x: any) => {
    return Number(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};