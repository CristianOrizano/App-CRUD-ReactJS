import dayjs from 'dayjs';

export const API_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const API_DATE_FORMAT = 'YYYY-MM-DD';

const dateStringToDate = (dateString: string, format = API_DATE_TIME_FORMAT): Date =>
	dayjs(dateString, format, true).toDate();

const formatDate = (date: string) => {
	return dayjs(date).format(API_DATE_FORMAT); // Formato deseado
};

export { dateStringToDate, formatDate };
