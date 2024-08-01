function formatDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return "Data inválida";
  }

  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}
export default formatDate;
