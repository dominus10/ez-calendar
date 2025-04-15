// export const updateCalendar = (monthOffset: number = 0): void {
//       this.calendarGrid.innerHTML = "";

//       let year = parseInt(this.yearSelect.value, 10);
//       let month = parseInt(this.monthSelect.value, 10) + monthOffset;

//       // Adjust the year and month if month goes out of bounds
//       if (month < 0) {
//         month = 11;
//         year -= 1;
//       } else if (month > 11) {
//         month = 0;
//         year += 1;
//       }

//       // Update the select values to reflect the new month and year
//       this.monthSelect.value = month.toString();
//       this.yearSelect.value = year.toString();

//       const firstDayOfMonth = new Date(year, month, 1);
//       const lastDayOfMonth = new Date(year, month + 1, 0);

//       const startDay = firstDayOfMonth.getDay();
//       const totalDays = lastDayOfMonth.getDate();

//       const isMobile = window.innerWidth < 600;
//       const size = isMobile ? "10vw" : "40px";

//       // Fill in previous month's days
//       const prevMonthLastDay = new Date(year, month, 0).getDate();
//       for (let i = startDay - 1; i >= 0; i--) {
//         const dayElem = document.createElement("div");
//         dayElem.textContent = (prevMonthLastDay - i).toString();
//         dayElem.style.color = "#ccc";
//         dayElem.style.pointerEvents = "none";
//         dayElem.style.padding = "0.5rem";
//         dayElem.style.marginLeft = "0.35rem";
//         dayElem.style.width = size;
//         dayElem.style.height = size;
//         this.calendarGrid.appendChild(dayElem);
//       }

//       // Fill in current month's days
//       for (let day = 1; day <= totalDays; day++) {
//         const dayElem = document.createElement("div");
//         dayElem.textContent = day.toString();
//         dayElem.style.padding = "0.5rem";
//         dayElem.style.marginLeft = "0.35rem";
//         dayElem.style.display = "flex";
//         dayElem.style.flexDirection = "column";
//         dayElem.style.justifyContent = "center";
//         dayElem.style.cursor = "pointer";
//         dayElem.style.borderRadius = "50%";
//         dayElem.style.width = size;
//         dayElem.style.height = size;

//         if (
//           this.selectedDay === day &&
//           parseInt(this.monthSelect.value) === this.selectedDate.getMonth() &&
//           parseInt(this.yearSelect.value) === this.selectedDate.getFullYear()
//         ) {
//           dayElem.style.background = "#007bff";
//           dayElem.style.color = "#fff";
//         }

//         dayElem.addEventListener("click", () => {
//           this.selectedDay = day;
//           this.updateCalendar();
//         });

//         this.calendarGrid.appendChild(dayElem);
//       }

//       // Fill in next month's days to complete the grid
//       const remainingDays = 42 - (startDay + totalDays);
//       for (let i = 1; i <= remainingDays; i++) {
//         const dayElem = document.createElement("div");
//         dayElem.textContent = i.toString();
//         dayElem.style.color = "#ccc";
//         dayElem.style.pointerEvents = "none";
//         dayElem.style.padding = "0.5rem";
//         this.calendarGrid.appendChild(dayElem);
//       }
//     }
