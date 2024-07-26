document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;
    let timerInterval;
    let time = 30;

    function startQuiz() {
        const userName = document.getElementById('name').value;
        if (userName) {
            document.getElementById('user-form').style.display = 'none';
            document.getElementById('quiz').style.display = 'block';
            startTimer();
        } else {
            alert('Please enter your name to start the quiz.');
        }
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            time--;
            document.getElementById('time').innerHTML = time;
            if (time === 0) {
                alert('Time\'s up!');
                checkAnswers();
            }
        }, 1000);
    }

    function checkAnswers() {
        clearInterval(timerInterval);
        const quizForm = document.getElementById('quiz-form');
        const correctAnswers = {
            q1: 'a',
            q2: 'a',
            // Add more questions and correct answers here
        };

        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        Object.keys(correctAnswers).forEach(question => {
            if (quizForm.elements[question].value === correctAnswers[question]) {
                score++;
            }
        });

        const percentage = (score / totalQuestions) * 100;

        if (percentage >= 80) {
            generateCertificate();
        } else {
            alert(`You scored ${percentage}%. You need at least 80% to pass. Please try again.`);
        }
    }

    function generateCertificate() {
        const certificateTemplate = document.getElementById('certificate-template');
        const certName = document.getElementById('cert-name');
        const certDate = document.getElementById('cert-date');

        const userName = document.getElementById('name').value;
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        certName.textContent = userName;
        certDate.textContent = formattedDate;

        document.getElementById('quiz').style.display = 'none';
        certificateTemplate.style.display = 'block';
        document.getElementById('certificate').style.display = 'block';
    }

    function downloadCertificate() {
        const certificateTemplate = document.getElementById('certificate-template');
        const pdf = new jsPDF();

        html2canvas(certificateTemplate).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save('certificate.pdf');
        });
    }

    window.startQuiz = startQuiz;
    window.checkAnswers = checkAnswers;
    window.downloadCertificate = downloadCertificate;
});
