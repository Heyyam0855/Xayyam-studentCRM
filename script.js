// Student CRM Application Logic
let students = [];

// Load students from localStorage when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadStudentsFromStorage();
    displayStudents();
});

// Handle form submission
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addStudent();
});

// Add a new student
function addStudent() {
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const phone = document.getElementById('studentPhone').value;
    const course = document.getElementById('studentCourse').value;

    const student = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        course: course,
        enrollmentDate: new Date().toLocaleDateString()
    };

    students.push(student);
    saveStudentsToStorage();
    displayStudents();
    
    // Reset form
    document.getElementById('studentForm').reset();
    
    // Show success message
    alert('Student added successfully!');
}

// Display all students
function displayStudents() {
    const studentsList = document.getElementById('studentsList');
    
    if (students.length === 0) {
        studentsList.innerHTML = `
            <div class="empty-state">
                <p>No students added yet. Start by adding your first student!</p>
            </div>
        `;
        return;
    }

    let html = '';
    students.forEach(function(student) {
        html += `
            <div class="student-card">
                <h3>${student.name}</h3>
                <div class="student-info">
                    <div class="info-item">
                        <strong>Email:</strong> ${student.email}
                    </div>
                    <div class="info-item">
                        <strong>Phone:</strong> ${student.phone}
                    </div>
                    <div class="info-item">
                        <strong>Course:</strong> ${student.course}
                    </div>
                    <div class="info-item">
                        <strong>Enrolled:</strong> ${student.enrollmentDate}
                    </div>
                </div>
                <button class="btn-delete" data-student-id="${student.id}">Delete Student</button>
            </div>
        `;
    });

    studentsList.innerHTML = html;
    
    // Add event listeners to delete buttons
    const deleteButtons = studentsList.querySelectorAll('.btn-delete');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const studentId = parseInt(this.getAttribute('data-student-id'));
            deleteStudent(studentId);
        });
    });
}

// Delete a student
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(function(student) {
            return student.id !== id;
        });
        saveStudentsToStorage();
        displayStudents();
    }
}

// Save students to localStorage
function saveStudentsToStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Load students from localStorage
function loadStudentsFromStorage() {
    const stored = localStorage.getItem('students');
    if (stored) {
        students = JSON.parse(stored);
    }
}
