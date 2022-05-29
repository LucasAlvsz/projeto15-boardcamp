import dayjs from "dayjs"

export const getTodaysDate = () => {
	return dayjs().format("YYYY/MM/DD")
}

export default getTodaysDate
