import moment from "moment" 

export function dateFormat(date: any) {
    return  moment(date).format("ddd, MMMM Do YYYY")
}

export const timeFormat = (isoString: any) =>
  moment(isoString).format("h.mm A")