import moment from "moment" 

export function dateFormat(date: any) {
    return  moment(date).format("ddd, MMMM Do YYYY")
}
 
export function dateFormatMonthDay(date: any) {
  return  moment(date).format("MMMM Do")
}

export const timeFormat = (isoString: any) =>
  moment(isoString).format("h.mm A")