export class BreakpointsListener {
  public isExtraExtraLarge: boolean; // > 1250px
  public isExtraLarge: boolean; // <= 1250px
  public isLarge: boolean; // <= 1000px
  public isMedium: boolean; // <= 700 px
  public isSmall: boolean; // <= 600px
  public isExtraSmall: boolean; // <= 450px

  setBreakpoints(width: number) {
    this.isExtraLarge = width <= 1250 ? true : false;
    this.isLarge = width <= 1000 ? true : false;
    this.isMedium = width <= 700 ? true : false;
    this.isSmall = width <= 600 ? true : false;
    this.isExtraSmall = width <= 450 ? true : false;
  }
}
