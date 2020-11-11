function sendMail(contactForm) {
    emailjs.send("gmail", "template_f2ao8tq", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "location_query": contactForm.message.value
    })
    return false;
}