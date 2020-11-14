let form = document.getElementById("contactForm");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    emailjs.send("gmail", "template_f2ao8tq", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "location_query": contactForm.message.value 
    })
    .then(
        function(response) {
            console.log("SUCCESS!", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    form.submit();
});
