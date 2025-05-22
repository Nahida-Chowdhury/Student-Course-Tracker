document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('course-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const course = {
        studentName: form.studentName.value.trim(),
        courseTitle: form.courseTitle.value.trim(),
        courseCode: form.courseCode.value.trim(),
        instructorName: form.instructorName.value.trim(),
        semester: form.semester.value.trim(),
        status: form.status.value,
        grade: form.grade.value.trim() || null,
      };
      saveCourse(course); 
      alert('Course added successfully!');
      form.reset();
      window.location.href = 'table.html';
    });

    function saveCourse(course) {
      const courses = getCoursesFromStorage();
      courses.push(course);
      localStorage.setItem('courses', JSON.stringify(courses));
    }
  }

  // If on table page, load the courses
  if (document.getElementById('courses-table-body')) {
    loadCourses();
  }
});

function getCoursesFromStorage() {
  return JSON.parse(localStorage.getItem('courses') || '[]');
}

function loadCourses() {
  const tbody = document.getElementById('courses-table-body');
  tbody.innerHTML = '';
  const courses = getCoursesFromStorage();

  if (courses.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="8" class="px-6 py-4 text-center text-gray-500">No courses tracked yet.</td></tr>
    `;
    return;
  }

  courses.forEach((course, index) => {
    const tr = document.createElement('tr');
    tr.setAttribute('data-index', index);
    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">${course.studentName}</td>
      <td class="px-6 py-4 whitespace-nowrap">${course.courseTitle}</td>
      <td class="px-6 py-4 whitespace-nowrap">${course.courseCode}</td>
      <td class="px-6 py-4 whitespace-nowrap">${course.instructorName}</td>
      <td class="px-6 py-4 whitespace-nowrap">${course.semester}</td>
      <td class="px-6 py-4 whitespace-nowrap">${course.status}</td>
      <td class="px-6 py-4 whitespace-nowrap">${course.grade || '-'}</td>
      <td class="px-6 py-4 whitespace-nowrap space-x-2">
        <button onclick="editCourse(${index})" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
        <button onclick="deleteCourse(${index})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function deleteCourse(index) {
  const courses = getCoursesFromStorage();
  if (confirm('Are you sure you want to delete this course?')) {
    courses.splice(index, 1);
    localStorage.setItem('courses', JSON.stringify(courses));
    loadCourses();
  }
}

function editCourse(index) {
  const courses = getCoursesFromStorage();
  const course = courses[index];

  const tr = document.querySelector(`tr[data-index="${index}"]`);
  tr.innerHTML = `
    <td class="px-6 py-2"><input type="text" value="${course.studentName}" class="border p-1 w-full" /></td>
    <td class="px-6 py-2"><input type="text" value="${course.courseTitle}" class="border p-1 w-full" /></td>
    <td class="px-6 py-2"><input type="text" value="${course.courseCode}" class="border p-1 w-full" /></td>
    <td class="px-6 py-2"><input type="text" value="${course.instructorName}" class="border p-1 w-full" /></td>
    <td class="px-6 py-2"><input type="text" value="${course.semester}" class="border p-1 w-full" /></td>
    <td class="px-6 py-2"><input type="text" value="${course.status}" class="border p-1 w-full" /></td>
    <td class="px-6 py-2"><input type="text" value="${course.grade || ''}" class="border p-1 w-full" /></td>
    <td class="px-6 py-2 space-x-2">
      <div class="flex items-center gap-2">
        <button onclick="saveCourseEdit(${index})" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Save</button>
        <button onclick="cancelEdit()" class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">Cancel</button>
      </div>
    </td>
  `;
}

function saveCourseEdit(index) {
  const tr = document.querySelector(`tr[data-index="${index}"]`);
  const inputs = tr.querySelectorAll('input');

  const updatedCourse = {
    studentName: inputs[0].value.trim(),
    courseTitle: inputs[1].value.trim(),
    courseCode: inputs[2].value.trim(),
    instructorName: inputs[3].value.trim(),
    semester: inputs[4].value.trim(),
    status: inputs[5].value.trim(),
    grade: inputs[6].value.trim(),
  };

  const courses = getCoursesFromStorage();
  courses[index] = updatedCourse;
  localStorage.setItem('courses', JSON.stringify(courses));
  loadCourses();
}

function cancelEdit() {
  loadCourses();
}

