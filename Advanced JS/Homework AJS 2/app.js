const mainEl = document.querySelector(".main-container");
const apiUrl =
  "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json";

const fetchUsers = async () => {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data;
  } catch (error) {
    mainEl.innerHTML += `<h1>${error}</h1>`;
    throw new Error(error);
  }
};

const sendUsers = async () => {
  const users = await fetchUsers();
  avgAgeAndGrade(users, mainEl);
  over30And60(users, mainEl);
  listOfStudentsOver30(users, mainEl);
  findStudent(users, mainEl);
  minAndMax(users, mainEl);
  longLast(users, mainEl);
  findTop(users, mainEl);
  prettyDumb(users, mainEl);
};

sendUsers();

const avgAgeAndGrade = (users, element) => {
  const sum = users
    .map((student) => student.age)
    .reduce((acc, num) => {
      return acc + num;
    }, 0);
  console.log(sum);
  let avgGrade = 0;
  users.forEach((user) => (avgGrade += user.averageGrade));

  element.innerHTML += `<div><p>Average age of all students: ${
    sum / users.length
  }</p>
	<p>Average grade of all students: ${avgGrade / users.length}</p></div>`;
};

const over30And60 = (users, element) => {
  let under30 = users.filter((user) => user.age < 30);
  let over60 = users.filter((user) => user.age > 60);
  element.innerHTML += `<div><p>Students under 30 years old: ${under30.length}</p>
	<p>Students over 60 years old: ${over60.length}</p></div>`;
};

const listOfStudentsOver30 = (users, element) => {
  const newDiv = document.createElement("div");
  const newLi = document.createElement("ol");
  element.appendChild(newDiv);
  newDiv.appendChild(newLi);
  const over30 = users
    .filter((user) => user.age > 30 && user.averageGrade >= 4)
    .map((user) => `${user.firstName} ${user.lastName} - ${user.city}`);
  newLi.innerHTML += `<h3>List of all students over 30 and grade above 4</h3>`;
  over30.forEach((user) => (newLi.innerHTML += `<li>${user}</li>`));
};

const findStudent = (users, element) => {
  const findExact = users.find(
    (student) => student.firstName === "Arthur" && student.lastName === "Cadore"
  );
  element.innerHTML += `<div><p>Id: ${findExact.id}</p>
	<p>Full name: ${findExact.firstName} ${findExact.lastName}</p>
	<p>Gender: ${findExact.gender}</p>
	<p>Age: ${findExact.age}</p>
	<p>Average grade: ${findExact.averageGrade}</p>
	<p>City: ${findExact.city}</p>
	<p>Email: ${findExact.email}</p></div>`;
};

const minAndMax = (users, element) => {
  const highest = users.reduce((prev, cur) =>
    prev?.age > cur.age ? prev : cur
  );
  const lowest = users.reduce((prev, cur) => (cur.age < prev.age ? cur : prev));
  element.innerHTML += `<div>
 <h3><u>Oldest person in the list:</u></h3> 
  <p>Id: ${highest.id}</p>
	<p>Full name: ${highest.firstName} ${highest.lastName}</p>
	<p>Gender: ${highest.gender}</p>
	<p>Age: ${highest.age}</p>
	<h3><u>Youngest person in the list:</u></h3> 
  <p>Id: ${lowest.id}</p>
	<p>Full name: ${lowest.firstName} ${lowest.lastName}</p>
	<p>Gender: ${lowest.gender}</p>
	<p>Age: ${lowest.age}</p>
	</div>`;
};

const longLast = (users, element) => {
  const long = users
    .filter((student) => student.lastName.length > 8)
    .map((student) => `${student.firstName} ${student.lastName}`);
  const newDiv = document.createElement("div");
  const newLi = document.createElement("ol");
  element.appendChild(newDiv);
  newDiv.appendChild(newLi);
  newLi.innerHTML += `<h3>List of students with last name longer than 8</h3>`;
  long.forEach((student) => (newLi.innerHTML += `<li>${student}</li>`));
};

const findTop = (users, element) => {
  const usersCopy = users.map((student) => student);
  usersCopy.sort((a, b) =>
    a.averageGrade < b.averageGrade
      ? 1
      : a.averageGrade > b.averageGrade
      ? -1
      : 0
  );
  const newDiv = document.createElement("div");
  const newLi = document.createElement("ol");
  element.appendChild(newDiv);
  newDiv.appendChild(newLi);
  newLi.innerHTML += `<h3>List of top 10 best students by average grade</h3>`;
  usersCopy
    .slice(0, 10)
    .forEach(
      (student) =>
        (newLi.innerHTML += `<li>${student.firstName} ${student.lastName}</li>`)
    );
};

const prettyDumb = (users, element) => {
  const dumbStudents = users.filter((student) => student.averageGrade === 1);
  const adult = users.filter((student) => student.age > 18);
  element.innerHTML += `<div><p>Number of students with average grade 1: ${dumbStudents.length}</p>
	<p>Number of students who are adults: ${adult.length}</p></div>`;
};
