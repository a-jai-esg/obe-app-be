const UserIDGenerator = (first_name, last_name, department_name) => {
  return (
    String(department_name).toUpperCase() +
    "-" +
    String(first_name).charAt(0) +
    String(last_name)
  );
};

export default UserIDGenerator;
