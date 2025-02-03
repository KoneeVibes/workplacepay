import { parse, isValid, format } from 'date-fns';

export const formatDateToDDMMYYYY = (dateString) => {
    const formats = ['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd'];
    for (let formatType of formats) {
        const parsedDate = parse(dateString, formatType, new Date());
        if (isValid(parsedDate)) {
            const formattedDate = format(parsedDate, 'dd/MM/yyyy');
            return formattedDate;
        };
    };
    return dateString;
};
