/**
 * This library class provides an access to the schedule.
 * You can get:
 *   - a timetable for classes in chosen dates interval
 *   - a schedule of rooms at a given time interval
 *   - a timetable filtered by teacher
 */
import baseurl from "../../config/baseurl";

class Schedule {
  static get ApiUrl() {
    return (process.env.NODE_ENV === "production"
            ? baseurl.build
            : baseurl.dev) + "static/data.json";
  }

  constructor() {
    this.data = [];
  }

  /**
   * It fetches the whole time table from a service
   * @return Promise
   */
  fetch() {
    let self = this;

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", (e) => {
        if (e.target.status !== 200) reject(e);

        try {
          self.data = JSON.parse(e.target.responseText);
        } catch (exc) {
          reject(exc);
        }

        resolve();
      });

      xhr.addEventListener("error", (e) => {
        reject(e);
      });

      xhr.open("GET", Schedule.ApiUrl, true);
      xhr.send();
    });
  }

  /**
   * It filters classes according to school.
   *
   * It can take as an argument an array of classes
   * to sort, or use the provided in the object.
   *
   * @param string schoolLink
   * @param array classes
   *
   * @return array
   */
  filterBySchool(schoolLink, classes) {
    let data = classes ? classes : this.data;

    return data.filter((c) => {
      let flag = false;

      c.schools.forEach((school) => {
        if (school.link === schoolLink) {
          flag = true;
          return;
        }
      });

      return flag;
    });
  }

  /**
   * It filters classes according to date period.
   *
   * It can take as an argument an array of classes
   * to sort, or use the provided in the object.
   *
   * @param Date start
   * @param Date end
   * @param array classes
   *
   * @return array
   */
  filterByDate(start, end, classes) {
    let data = classes ? classes : this.data;

    return data.filter((c) => {
      let t = (new Date(c.date + " 00:00:00")).getTime();
      return t >= start.getTime() && t <= end.getTime();
    });
  }

  /**
   * It filters classes by teacher.
   *
   * It can take as an argument an array of classes
   * to sort, or use the provided in the object.
   *
   * @param teacherId teacherId
   * @param array classes
   *
   * @return array
   */
  filterByTeacher(teacherId, classes) {
    let data = classes ? classes : this.data;

    return data.filter((c) => {
      let flag = false;

      c.teachers.forEach((teacher) => {
        if (parseInt(teacher.id) === parseInt(teacherId))
          flag = true;
      });

      return flag;
    });
  }

  /**
   * It returns a class by its ID
   *
   * @param int classId
   * @return array
   */
  getById(classId) {
    return this.data.filter((c) => {
      return parseInt(c.id) === parseInt(classId);
    });
  }
}

export default Schedule;