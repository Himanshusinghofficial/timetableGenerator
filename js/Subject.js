class Subject {
  constructor(subject, subjectType, subjectName, maxSlots, maxInADay) {
    this.subject = subject;
    this.subjectType = subjectType;
    this.maxSlots = maxSlots;
    this.maxInADay = maxInADay;
    this.usedSlots = 0;
    this.usedInADay = 0;
    this.twiceInADay = false;
    this.subjectName = subjectName;
  }

  isAvailable = () => {
    return this.usedSlots < this.maxSlots && this.usedInADay < this.maxInADay
      ? true
      : false;
  };

  setSlotsPerDay = () => {
    if (this.usedInADay == this.maxInADay) {
      this.maxInADay = 1;
      this.twiceInADay = true;
    }
  };
}

export default Subject;
