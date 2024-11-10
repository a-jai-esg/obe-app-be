// for Users
const UserIdGenerator = (first_name, last_name, department_name) => {
  return (
    String(department_name).toUpperCase() +
    "-" +
    String(first_name).charAt(0) +
    String(last_name)
  );
};

// for Program Educational Objectives
const PeoIdGenerator = (program_name, database_index_value) => {
  return String(program_name).toUpperCase() + "-PEO-" + database_index_value;
};

// for Program Outcomes
const PoIdGenerator = (program_name, database_index_value) => {
  return String(program_name).toUpperCase() + "-PO-" + database_index_value;
};

// for Course Intended Learning Outcomes
const CilosIdGenerator = (program_name, database_index_value) => {
  return String(program_name).toUpperCase() + "-CILO-" + database_index_value;
};

export default {
  UserIdGenerator,
  PeoIdGenerator,
  PoIdGenerator,
  CilosIdGenerator,
};
