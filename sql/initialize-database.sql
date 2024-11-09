USE obeapp;

SET FOREIGN_KEY_CHECKS = 0;

-- Department_Data Table
CREATE TABLE IF NOT EXISTS Department_Data (
    Record_ID INT PRIMARY KEY,
    Department_Code VARCHAR(6) NOT NULL UNIQUE,
    Department_Name VARCHAR(50),
    Department_CustomField1 VARCHAR(20),
    Department_CustomField2 VARCHAR(50),
    Department_CustomField3 VARCHAR(100)
);

-- Insert Default Department Values
INSERT INTO Department_Data (Record_ID, Department_Code, Department_Name, Department_CustomField1, Department_CustomField2, Department_CustomField3)
    VALUES (0, 'CCS', 'College of Computer Studies', NULL, NULL, NULL), 
           (1, 'CTE', 'College of Teacher Education', NULL, NULL, NULL),
           (2, 'CRIM', 'College of Criminology', NULL, NULL, NULL), 
           (3, 'CBA', 'College of Business and Accountancy', NULL, NULL, NULL), 
           (4, 'CTM', 'College of Tourism and Management', NULL, NULL, NULL),
           (5, 'CMT', 'College of Medical Technology', NULL, NULL, NULL), 
           (6, 'CON', 'College of Nursing', NULL, NULL, NULL), 
           (7, 'CHM', 'College of Hospitality and Management', NULL, NULL, NULL),
           (8, 'COE', 'College of Engineering', NULL, NULL, NULL),
           (9, 'LAW', 'School of Law', NULL, NULL, NULL),
           (10, 'COP', 'College of Psychology', NULL, NULL, NULL);

-- User Table
CREATE TABLE IF NOT EXISTS User_Data (
    Record_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID VARCHAR(25) NOT NULL UNIQUE,
    First_Name VARCHAR(25) NOT NULL,
    Last_Name VARCHAR(25) NOT NULL,
    Email_Address VARCHAR(50) NOT NULL,
    Username VARCHAR(25) NOT NULL,
    Password TEXT NOT NULL,
    Department_ID INT NOT NULL,
    FOREIGN KEY (Department_ID) REFERENCES Department_Data (Record_ID)
);

-- Programs Master Data table
CREATE TABLE IF NOT EXISTS Programs_Master_Data (
    Record_ID INT PRIMARY KEY AUTO_INCREMENT,
    Program_Code VARCHAR(10) NOT NULL UNIQUE,
    Program_Title VARCHAR(100),
    Program_Dept VARCHAR(6) NOT NULL,
    Program_Status TINYINT(1) NOT NULL,
    Program_CustomField1 VARCHAR(20),
    Program_CustomField2 VARCHAR(50),
    Program_CustomField3 VARCHAR(100),
    INDEX (Program_Dept),
    FOREIGN KEY (Program_Dept) REFERENCES Department_Data (Department_Code)
);

-- Curriculum Master Data table
CREATE TABLE IF NOT EXISTS Curriculum_Master_Data (
    Record_ID INT PRIMARY KEY AUTO_INCREMENT,
    Program_Code VARCHAR(10) NOT NULL,
    Curr_Year INT(4) NOT NULL,
    Curr_Rev_Code VARCHAR(20) NOT NULL,
    Curr_Status TINYINT(1) NOT NULL,
    Curr_CustomField1 VARCHAR(20),
    Curr_CustomField2 VARCHAR(50),
    Curr_CustomField3 VARCHAR(100),
    INDEX (Program_Code),
    INDEX (Curr_Rev_Code),
    FOREIGN KEY (Program_Code) REFERENCES Programs_Master_Data (Program_Code)
);

-- Curriculum Courses File table
CREATE TABLE IF NOT EXISTS Curriculum_Courses_File (
    Record_ID INT PRIMARY KEY AUTO_INCREMENT,
    Curr_Rev_Code VARCHAR(20) NOT NULL,
    Curr_Course_Code VARCHAR(20) NOT NULL UNIQUE,
    Curr_Course_Desc VARCHAR(100),
    Curr_Year TINYINT(1) NOT NULL,
    Curr_Sem TINYINT(1) NOT NULL,
    Curr_Units INT(2) NOT NULL,
    Curr_LEC_Hrs TINYINT(1) NOT NULL,
    Curr_LAB_Hrs TINYINT(1) NOT NULL,
    Curr_Status TINYINT(1) NOT NULL,
    Curr_CRS_CustomField1 VARCHAR(20),
    Curr_CRS_CustomField2 VARCHAR(50),
    Curr_CRS_CustomField3 VARCHAR(100),
    INDEX (Curr_Rev_Code),
    INDEX (Curr_Course_Code),
    FOREIGN KEY (Curr_Rev_Code) REFERENCES Curriculum_Master_Data (Curr_Rev_Code)
);

-- Courses CILOS Data table
CREATE TABLE IF NOT EXISTS Courses_CILOS_Data (
    Record_ID INT PRIMARY KEY AUTO_INCREMENT,
    CILO_Code VARCHAR(20) NOT NULL UNIQUE,
    Curr_Course_Code VARCHAR(20) NOT NULL,
    CILO_Desc VARCHAR(100),
    CILO_Status TINYINT(1) NOT NULL,
    CILO_CustomField1 VARCHAR(20),
    CILO_CustomField2 VARCHAR(50),
    CILO_CustomField3 VARCHAR(100),
    INDEX (Curr_Course_Code),
    FOREIGN KEY (Curr_Course_Code) REFERENCES Curriculum_Courses_File (Curr_Course_Code)
);

-- PO Master Data table
CREATE TABLE IF NOT EXISTS PO_Master_Data (
    Record_ID INT PRIMARY KEY AUTO_INCREMENT,
    Program_Code VARCHAR(10) NOT NULL,
    PO_SeqNumber VARCHAR(20) NOT NULL UNIQUE,
    PO_Desc VARCHAR(200),
    PO_Status TINYINT(1) NOT NULL,
    PO_CustomField1 VARCHAR(20),
    PO_CustomField2 VARCHAR(50),
    PO_CustomField3 VARCHAR(100),
    INDEX (Program_Code),
    INDEX (PO_SeqNumber),
    FOREIGN KEY (Program_Code) REFERENCES Programs_Master_Data (Program_Code)
);

-- PEO Master Data table
CREATE TABLE IF NOT EXISTS PEO_Master_Data (
    Record_ID INT PRIMARY KEY AUTO_INCREMENT,
    Program_Code VARCHAR(10) NOT NULL,
    PEO_SeqNumber VARCHAR(20) NOT NULL,
    PEO_Desc VARCHAR(200),
    PEO_Status TINYINT(1) NOT NULL,
    PEO_CustomField1 VARCHAR(20),
    PEO_CustomField2 VARCHAR(50),
    PEO_CustomField3 VARCHAR(100),
    INDEX (Program_Code),
    INDEX (PEO_SeqNumber),
    FOREIGN KEY (Program_Code) REFERENCES Programs_Master_Data (Program_Code)
);

-- PEO PO Mapping Matrix table
CREATE TABLE IF NOT EXISTS PEO_PO_Mapping_Matrix (
    Record_ID INT PRIMARY KEY AUTO_INCREMENT,
    Program_Code VARCHAR(10) NOT NULL,
    PEO_SeqNumber VARCHAR(20) NOT NULL,
    PO_SeqNumber VARCHAR(20) NOT NULL,
    PEO_PO_Activation_Code VARCHAR(1) NOT NULL,
    PEO_PO_Status TINYINT(1) NOT NULL,
    PEO_PO_CustomField1 VARCHAR(20),
    PEO_PO_CustomField2 VARCHAR(50),
    PEO_PO_CustomField3 VARCHAR(100),
    INDEX (Program_Code),
    INDEX (PEO_SeqNumber),
    INDEX (PO_SeqNumber),
    FOREIGN KEY (Program_Code) REFERENCES Programs_Master_Data (Program_Code),
    FOREIGN KEY (PEO_SeqNumber) REFERENCES PEO_Master_Data (PEO_SeqNumber),
    FOREIGN KEY (PO_SeqNumber) REFERENCES PO_Master_Data (PO_SeqNumber)
);

-- PO CILO Mapping Matrix table
CREATE TABLE IF NOT EXISTS PO_CILO_Mapping_Matrix (
    Record_ID INT PRIMARY KEY AUTO_INCREMENT,
    Program_Code VARCHAR(10) NOT NULL,
    Curr_Course_Code VARCHAR(20) NOT NULL,
    CILO_SeqNumber VARCHAR(20) NOT NULL,
    PO_SeqNumber VARCHAR(20) NOT NULL,
    PO_CILO_Activation_Code VARCHAR(1) NOT NULL,
    PO_CILO_Status TINYINT(1) NOT NULL,
    PO_CILO_CustomField1 VARCHAR(20),
    PO_CILO_CustomField2 VARCHAR(50),
    PO_CILO_CustomField3 VARCHAR(100),
    INDEX (Program_Code),
    INDEX (Curr_Course_Code),
    INDEX (CILO_SeqNumber),
    INDEX (PO_SeqNumber),
    FOREIGN KEY (Program_Code) REFERENCES Programs_Master_Data (Program_Code),
    FOREIGN KEY (Curr_Course_Code) REFERENCES Curriculum_Courses_File (Curr_Course_Code),
    FOREIGN KEY (CILO_SeqNumber) REFERENCES Courses_CILOS_Data (CILO_Code),
    FOREIGN KEY (PO_SeqNumber) REFERENCES PO_Master_Data (PO_SeqNumber)
);

SET FOREIGN_KEY_CHECKS = 1;
