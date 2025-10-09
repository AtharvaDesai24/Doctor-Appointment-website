   const Bookbtn = document.querySelector(".book-btn");
        const availabilityButtons = document.querySelectorAll('.availability-btn');
        let appointDay=document.querySelector("#appointment_day");
        let lastClickedButton = null;
        let infoWindow;
        let geocoder;
        // Store the original color of the button
        const originalColor = "#5cb85c"; // The initial color of the availability button
        const activeColor = "#17d737"; // The color to change when clicked

        // Initially hide the Book Appointment button
        Bookbtn.classList.add("hide");



        //Edit-Val Setter
       const valSetter=(cliName,add,fee,lon,lat,website,aboutMe)=>{
        document.querySelector(".fees").value=fee;
        document.querySelector(".clinicName").value=cliName;
        document.querySelector(".address").value=add;
          document.querySelector(".lon").value=lon;
            document.querySelector(".lat").value=lat;
              document.querySelector(".website").value=website;
                document.querySelector(".aboutMe").value=aboutMe; 
       }

       
         async function initMap() {
                  infoWindow = new google.maps.InfoWindow();
                  geocoder = new google.maps.Geocoder(); // Initialize geocoder here
            }
       

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


         // ============================================
        // PROFILE EDITING FUNCTIONALITY
        // ============================================

        let locationLink=document.querySelector(".location-link");
        let revSection= document.querySelector(".review-section");
        let editingEnabled = false;

        function toggleEditing() {
            
            if( locationLink.style.display!="none" && revSection.style.display!="none"){
                locationLink.style.display="none";
                revSection.style.display="none";
            }
            else{
                locationLink.style.display="";
                 revSection.style.display="";
            } 

            editingEnabled = !editingEnabled;
            const fields = document.querySelectorAll('[data-editable="true"]');
            const editBtn = document.getElementById('editBtn');

            fields.forEach(field => {
                field.contentEditable = editingEnabled;
            });

            editBtn.innerText = editingEnabled ? "Disable Editing" : "Enable Editing";
            editBtn.style.background = editingEnabled ? "#dc3545" : "#007BFF";
            
            
        }

       async function saveProfile() {
            const fields = document.querySelectorAll('[data-editable="true"]');
            const editform=document.querySelector("#editForm");
            let profileData = [];
            
            fields.forEach(field => {
                profileData.push(field.innerText.trim());
            });

            // Here you would normally send this data to your server
            console.log("Profile data to save:", profileData);


                   // Geocoding 
                  await initMap();   
                  const p = await geocode({ address: "kolhapur Maharashtra" }); 
                  console.log(p); // coordinates


            alert("Profile saved successfully!");                    // lon    ,    lat
             valSetter(profileData[1],profileData[3],profileData[2],p.longitude,p.latitude,profileData[5],profileData[0]);
                editform.submit();

            // Disable editing after save
            if (editingEnabled) {
                toggleEditing();
            }
        }

        // ============================================
        // APPOINTMENT BOOKING FUNCTIONALITY
        // ============================================
        const availabilityBtns = document.querySelectorAll('.availability-btn');
        const appointmentDayInput = document.getElementById('appointment_day');
        const bookBtn = document.getElementById('bookBtn');
        const appointmentForm = document.getElementById('appointmentForm');

        // Handle availability button clicks
        availabilityBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Don't select if in editing mode
                if (editingEnabled) {
                    return;
                }
                
                // Remove selected class from all buttons
                availabilityBtns.forEach(b => b.classList.remove('selected'));
                
                // Add selected class to clicked button
                this.classList.add('selected');
                
                // Get the day from data attribute
                const day = this.getAttribute('data-day');
                const time = this.getAttribute('data-time');
                appointmentDayInput.value = day;
                
                // Enable and update book button
                bookBtn.disabled = false;
                bookBtn.textContent = `Book Appointment for ${day}`;
            });
        });

        // Handle appointment form submission
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!appointmentDayInput.value) {
                alert('Please select a day for your appointment');
                return;
            }
            
            const selectedDay = appointmentDayInput.value;
            
            // Here you would normally send this to your server
            // For now, just show a confirmation
            alert(`Appointment Request Submitted!\n\nDay: ${selectedDay}\n\nYou will receive a confirmation email shortly.`);
            
            // Reset selection
            availabilityBtns.forEach(b => b.classList.remove('selected'));
            appointmentDayInput.value = '';
            bookBtn.disabled = true;
            bookBtn.textContent = 'Select a day to book appointment';
        });

       
        // Prevent appointment selection while editing
        document.addEventListener('click', function(e) {
            if (editingEnabled && e.target.classList.contains('availability-btn')) {
                e.stopPropagation();
            }
        });




async function geocode(request) {
  try {
    const result = await geocoder.geocode(request);
    const { results } = result;

    const latitude = results[0].geometry.location.lat();
    const longitude = results[0].geometry.location.lng();

    const pos = {
      latitude,
      longitude,
    };

    return pos;
  } catch (e) {
    console.log("Geocoding failed: " + e);
    return null;
  }
}

window.initMap = initMap;