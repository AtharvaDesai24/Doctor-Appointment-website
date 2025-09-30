   const Bookbtn = document.querySelector(".book-btn");
        const availabilityButtons = document.querySelectorAll('.availability-btn');
        let appointDay=document.querySelector("#appointment_day");
        let lastClickedButton = null;
       
        // Store the original color of the button
        const originalColor = "#5cb85c"; // The initial color of the availability button
        const activeColor = "#17d737"; // The color to change when clicked

        // Initially hide the Book Appointment button
        Bookbtn.classList.add("hide");

        // Add event listener for each availability button
        availabilityButtons.forEach(button => {
            
            button.addEventListener("click", function() {
                appointDay.value= this.innerText;
                // If the same button is clicked again, toggle the visibility of the Book Appointment button
                if (lastClickedButton === button) {
                    
                    Bookbtn.classList.toggle("hide");
                    button.style.backgroundColor = originalColor; // Reset to the original color
                } else {
                    // If a different button is clicked, show the Book Appointment button
                    Bookbtn.classList.remove("hide");
                    button.style.backgroundColor = activeColor; // Change to the active color

                    // Reset the background color of all other buttons
                    availabilityButtons.forEach(b => {
                        if (b !== button) {
                            b.style.backgroundColor = originalColor;
                        }
                    });
                }

                // Set the last clicked button to the current one
                lastClickedButton = button;
            });
        });

        //Getting schedule info
     Bookbtn.addEventListener("submit",(e)=>{
        e.preventDefault();
        

     });