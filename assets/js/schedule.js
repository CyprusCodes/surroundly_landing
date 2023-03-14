const INIT_DATE = [
    {
      date: "2023/03/13" /*Year/Month/Day*/,
      from: "10:30" /*Hour:minute*/,
      duration: "120" /*in minutes*/,
    },
    {
      date: "2023/03/14",
      from: "10:30",
      duration: "50" /*in minutes*/,
    },
    {
      date: "2023/03/15",
      from: "10:30",
      duration: "90" /*in minutes*/,
    },
  ];
  Schedule();
  function Schedule(dates = INIT_DATE) {
    const stringDate = (date) => {
      const month = date.toLocaleDateString("en-US", { month: "long" });
      const year = date.getFullYear().toString();
      const day = date.toLocaleDateString("en-US", { day: "2-digit" });
      const weekDay = date.toLocaleDateString("en-US", { weekday: "long" });
      return { month, year, day, weekDay };
    };
    if (document.querySelector("#counter")) {
      const body = document.querySelector("#counter");
      const d1 = new Date();
  
      const d2 = new Date(d1.getTime() + d1.getTimezoneOffset() * 60 * 1000);
      for (const period of dates) {
        const arrayDate = period.date.split("/");
        arrayDate.splice(1, 1, arrayDate[1] - 1);
        const date = new Date(...arrayDate);
        // date = date.getTime() - date.getTimezoneOffset()*3600*1000;
        // date = new Date(date);
  
        date.setHours(...period.from.split(":"));
        const to = new Date(date.getTime() + period.duration * 60 * 1000);
        if (date.getTime() - d2.getTime() > 0) {
          setInterval(() => {
            const todayDate1 = new Date();
  
            const todayDate2 = new Date(
              todayDate1.getTime() + todayDate1.getTimezoneOffset() * 60 * 1000
            );
              body.querySelector(".seconds h3").innerHTML = countTime(date.getTime() - todayDate2.getTime()).sec;
              body.querySelector(".minutes h3").innerHTML = countTime(date.getTime() - todayDate2.getTime()).min;
              body.querySelector(".hours h3").innerHTML = countTime(date.getTime() - todayDate2.getTime()).hrs;
              body.querySelector(".day h3").innerHTML = countTime(date.getTime() - todayDate2.getTime()).days;
          }, 1000);
  
          break;
        }
      }
    }
    if (document.querySelector("#periods")) {
      const periods = document.querySelector("#periods");
      periods.innerHTML = "";
      for (const period of dates) {
        const arrayDate = period.date.split("/");
        arrayDate.splice(1, 1, arrayDate[1] - 1);
        const date = new Date(...arrayDate);
  
        date.setHours(...period.from.split(":"));
        const to = new Date(date.getTime() + period.duration * 60 * 1000);
        const html = `<li>
              <span>
                  ${stringDate(date).weekDay}
              </span>
              <div>
                <span>
                  ${stringDate(date).day} ${stringDate(date).month},
                  ${stringDate(date).year}
                </span>  
                <span>
                ${period.from} - 
                ${to.getHours()}:${
          to.getMinutes() < 10 ? "0" + to.getMinutes() : to.getMinutes()
        } GMT
                </span>  
              </div>
              </li>`;
        periods.innerHTML += html;
      }
    } else {
      return false;
    }
    function countTime(milSec) {
      const days = Math.trunc(milSec / (86400 * 1000));
      const hrs = Math.trunc((milSec / (86400 * 1000) - days) * 24);
      const min = Math.trunc(((milSec / (86400 * 1000) - days) * 24 - hrs) * 60);
      const sec = Math.trunc(
        (((milSec / (86400 * 1000) - days) * 24 - hrs)*60 - min) * 60
      );
  
      return { days, hrs, min, sec };
    }
  }
  