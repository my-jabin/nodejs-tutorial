const users = [{
  id: 1,
  name: "Yanbin",
  schoolId: 101
}, {
  id: 2,
  name: "Hu",
  schoolId: 102
}, {
  id: 3,
  name: "Jen",
  schoolId: 101
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 94
}, {
  id: 2,
  schoolId: 102,
  grade: 99
}, {
  id: 3,
  schoolId: 101,
  grade: 90
}]

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id ${id}`);
    }
  });
}

// getUser(33).then((user) => {
//   console.log(user);
// }).catch((e) => {
//   console.log(e);
// })


const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId))
  });
}

// getGrades(101).then(grades => {
//   console.log(grades);
// })


const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then(grades => {
    let average = 0;
    if (grades.length >= 0) {
      average = grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% in the class`;
  })
}

// getStatus(1).then((statue) => {
//   console.log(statue);
// })

// async always returns Promise
const getStatusAlt = async(userId) => {
  //throw new Error('This is an error')  // returna  reject
  //return `Mike`; // return a resolve
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  const average = grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length
  return `${user.name} has a ${average}% in the class`;
}
getStatusAlt(1).then((status) => {
  console.log(status);
}).catch(e => {
  console.log(e);
})
