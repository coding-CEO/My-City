import cities from "./cities.json";

export class LocationHandler {
  public static getStates = (): string[] => {
    const states: string[] = ["Select State"];
    cities.forEach((value) => {
      states.push(value.state);
    });
    return states;
  };
  public static getCities = (stateIndex: number): string[] => {
    if (stateIndex <= 0) return ["Select City"];
    stateIndex--;
    return ["Select City", ...cities[stateIndex].cities];
  };
}
