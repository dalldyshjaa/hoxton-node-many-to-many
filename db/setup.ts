import Database from "better-sqlite3";

const db = Database("./db/data.db", { verbose: console.log });

const applicants = [
  {
    name: "Taulant",
    email: "asf@hotmai.com",
  },
  {
    name: "Taulant1",
    email: "asf@hotmai1.com",
  },
  {
    name: "Taulant2",
    email: "asf@hotmai2.com",
  },
  {
    name: "Taulant3",
    email: "asf@hotmai3.com",
  },

  {
    name: "Taulant4",
    email: "asf@hotmai4.com",
  },
  {
    name: "Taulant5",
    email: "asf@hotmai5.com",
  },
];

const interviewers = [
  {
    name: "Salahudin",
    email: "asf@hotmai.com",
  },
  {
    name: "Salahudin1",
    email: "Salahudin1@hotmai.com",
  },
  {
    name: "Salahudin2",
    email: "Salahudin2@hotmail.com.com",
  },
  {
    name: "Salahudin3",
    email: "Salahudin3@hotmail.com.com",
  },
  {
    name: "Salahudin4",
    email: "Salahudin4@hotmai.com",
  },
  {
    name: "Salahudin5",
    email: "Salahudin5@hotmai.com",
  },
];

const interviews = [
  { date: "21/03/2003", score: 120, applicantID: 1, interviewerID: 1 },
  { date: "21/03/1998", score: 80, applicantID: 2, interviewerID: 1 },
  { date: "21/03/2010", score: 10, applicantID: 3, interviewerID: 1 },
  { date: "21/03/2002", score: 120, applicantID: 2, interviewerID: 3 },
  { date: "21/03/2003", score: 80, applicantID: 5, interviewerID: 2 },
  { date: "21/03/2003", score: 98, applicantID: 3, interviewerID: 4 },
  { date: "21/03/2003", score: 120, applicantID: 1, interviewerID: 2 },
  { date: "21/03/2003", score: 30, applicantID: 3, interviewerID: 5 },
];

const dropApplicantsTable = db.prepare(`
DROP TABLE IF EXISTS applicants;
`);
dropApplicantsTable.run();

const dropInterviewersTable = db.prepare(`
DROP TABLE IF EXISTS interviewers;
`);
dropInterviewersTable.run();

const dropInterviewsTable = db.prepare(`
DROP TABLE IF EXISTS interviews;
`);
dropInterviewsTable.run();

const createApplicantTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS applicants (
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        PRIMARY KEY (id)
        );
`);

createApplicantTable.run();

const createApplicant = db.prepare(`
    INSERT INTO applicants (name, email) VALUES (@name, @email);
`);

for (let applicant of applicants) {
  createApplicant.run(applicant);
}

const createInterviewerTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS interviewers (
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        PRIMARY KEY (id)
        );
`);

createInterviewerTable.run();

const createInterviewer = db.prepare(`
    INSERT INTO interviewers (name, email) VALUES (@name, @email);
`);

for (let interviewer of interviewers) {
  createInterviewer.run(interviewer);
}

const createInterviewTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS interviews (
        id INTEGER NOT NULL,
        interviewerID INTEGER NOT NULL,
        applicantID INTEGER NOT NULL,
        date TEXT NOT NULL,
        score INTEGER NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (interviewerID) REFERENCES interviewers(id) ON DELETE CASCADE ,
        FOREIGN KEY (applicantID) REFERENCES applicants(id) ON DELETE CASCADE
        );
`);

createInterviewTable.run();

const createInterview = db.prepare(`
    INSERT INTO interviews (date, score, applicantID, interviewerID) VALUES (@date, @score, @applicantID, @interviewerID);
`);

for (let interview of interviews) {
  createInterview.run(interview);
}
