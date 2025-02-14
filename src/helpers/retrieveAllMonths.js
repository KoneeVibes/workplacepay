export const months = [...Array(12)].map((_, index) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2024, index));
});