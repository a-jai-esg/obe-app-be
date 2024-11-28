import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

const getStudentsData = async (coursecode, term) => {
    let connection = await pool.getConnection();
    const sqlQuery = `SELECT IDNUMBER, LASTNAME, FIRSTNAME, MIDNAME, COURSECODE FROM students_data where coursecode = '${coursecode}' and term = '${term}' GROUP BY LASTNAME, FIRSTNAME, MIDNAME`;
    const [rows] = await connection.query(sqlQuery);
    return rows;
  };

const getProgramsData = async () => {
    let connection = await pool.getConnection();
    const sqlQuery = `SELECT * FROM programs_master_data`;
    const [rows] = await connection.query(sqlQuery);
    return rows;
};

const getTermsData = async (coursecode) => {
  let connection = await pool.getConnection();
  const sqlQuery = `SELECT term FROM students_data where coursecode = '${coursecode}' group by term`;
  const [rows] = await connection.query(sqlQuery);
  return rows;
};
const getProgramOutcomesData = async (idnumber, coursecode) => {
  
  let connection = await pool.getConnection();
  var sqlQuery = `SELECT * FROM program_outcomes where coursecode = '${coursecode}'`;
  const[outcome] = await connection.query(sqlQuery);
  sqlQuery = `SELECT * FROM subject_info`;
  const[subjects] = await connection.query(sqlQuery);
  sqlQuery = `SELECT * FROM students_data where IDNUMBER = '${idnumber}' and internal_code in (
    select internal_code from subject_info where coursecode = '${coursecode}'
  )`;
  const[grades] = await connection.query(sqlQuery);
  
  sqlQuery = `SELECT * FROM po_subject_mapping where coursecode = '${coursecode}'`;
  const[cilo_map] = await connection.query(sqlQuery);

  return {outcomes: outcome, subjects: subjects, grades: grades, cilo_map: cilo_map};
};

export { getStudentsData, getProgramsData, getTermsData, getProgramOutcomesData };
