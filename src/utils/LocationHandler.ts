import cities from "./cities.json";

export class LocationHandler {
  public static getStates = (canBeEmpty: boolean): string[] => {
    const states: string[] = [];
    if (canBeEmpty) states.push("Select State");
    cities.forEach((value) => {
      states.push(value.state);
    });
    return states;
  };
  public static getCities = (
    stateIndex: number,
    canBeEmpty: boolean
  ): string[] => {
    const finalCities: string[] = [];
    if (canBeEmpty) finalCities.push("Select City");
    else stateIndex++;

    if (stateIndex <= 0) return finalCities;
    stateIndex--;

    return [...finalCities, ...cities[stateIndex].cities];
  };
}
