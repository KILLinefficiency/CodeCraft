<script>
    // @ts-nocheck
  
    import { onMount } from "svelte";
  
    let currentDate = new Date();
    let today = new Date();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let clickedDates = JSON.parse(localStorage.getItem("clickedDates")) || [];
    let streak = parseInt(localStorage.getItem("streak")) || 0;
    let brokenStreakDates =
      JSON.parse(localStorage.getItem("brokenStreakDates")) || [];
    let monthYear = "";
    let days = [];
  
    function renderCalendar(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const lastDay = new Date(year, month + 1, 0).getDate();
      monthYear = `${months[month]} ${year}`;
      days = [];
  
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = firstDay; i > 0; i--) {
        days.push({ day: prevMonthLastDay - i + 1, type: "fade" });
      }
  
      for (let i = 1; i <= lastDay; i++) {
        let currentDayDate = new Date(year, month, i).toDateString();
        days.push({
          day: i,
          type: clickedDates.includes(currentDayDate)
            ? "clicked"
            : brokenStreakDates.includes(currentDayDate)
              ? "broken-streak"
              : i === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear()
                ? "today"
                : "normal",
          date: currentDayDate,
        });
      }
    }
  
    function handleDateClick(date) {
      if (!clickedDates.includes(date)) {
        clickedDates.push(date);
        clickedDates.sort((a, b) => new Date(a) - new Date(b));
        let newStreak = 1;
        for (let i = clickedDates.length - 1; i > 0; i--) {
          const prevDate = new Date(clickedDates[i - 1]);
          const currDate = new Date(clickedDates[i]);
          const diffInDays = Math.floor(
            (currDate - prevDate) / (1000 * 60 * 60 * 24)
          );
          if (diffInDays === 1) {
            newStreak++;
          } else if (diffInDays > 1) {
            brokenStreakDates.push(currDate.toDateString());
            newStreak = 1;
          }
        }
        streak = newStreak;
        localStorage.setItem("clickedDates", JSON.stringify(clickedDates));
        localStorage.setItem("streak", streak.toString());
        localStorage.setItem(
          "brokenStreakDates",
          JSON.stringify(brokenStreakDates)
        );
        renderCalendar(currentDate);
      }
    }
  
    function resetCalendar() {
      localStorage.removeItem("clickedDates");
      localStorage.removeItem("streak");
      localStorage.removeItem("brokenStreakDates");
      location.reload();
    }
  
    function prevMonth() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    }
  
    function nextMonth() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    }
  
    onMount(() => renderCalendar(currentDate));
  </script>
  
  -
  
  <main>
    <div class="calendar">
      <div class="header">
        <div class="btn" on:click={prevMonth}>&lt;</div>
        <div>{monthYear}</div>
        <div class="btn" on:click={nextMonth}>&gt;</div>
      </div>
      <div class="streak-display">
        <strong>Streak:</strong>
        {streak} days <span>{streak > 0 ? "🔥" : "❄️"}</span>
      </div>
      <button class="reset-btn" on:click={resetCalendar}>Reset Calendar</button>
      <div class="weekdays">
        {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as day}
          <div>{day}</div>
        {/each}
      </div>
      <div class="days">
        {#each days as day}
          <div class={day.type} on:click={() => handleDateClick(day.date)}>
            {day.day}
          </div>
        {/each}
      </div>
    </div>
  </main>
  
  <style>
    body {
      font-family: Arial, sans-serif;
      display: grid;
      place-items: center;
      height: 100vh;
      margin: 0;
      background-color: #333;
    }
    .calendar {
      background-color: #111;
      color: white;
      padding: 20px;
      border-radius: 10px;
      width: 300px;
      overflow: auto;
    }
    .header,
    .streak-display,
    .weekdays,
    .days {
      display: flex;
      justify-content: space-between;
    }
    .days div {
      width: 14.28%;
      text-align: center;
      padding: 10px;
      cursor: pointer;
    }
    .today {
      background: orangered;
      color: white;
    }
    .clicked {
      background: green;
      color: white;
    }
    .fade {
      color: #555;
    }
    .broken-streak::after {
      content: "❄️";
      font-size: 12px;
    }
</style>