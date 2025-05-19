export class Validate {
  static email(mail: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(mail);
  }

  static password(val: string) {
    return val.length >= 6;
  }
}
