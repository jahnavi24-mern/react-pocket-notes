export const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
    const time = new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} • ${time}`;
  };
  