import { AuthorityType } from "../utils/Enums";

export class Authority {
  authoritySpecitalId: string = "";
  authorityType: AuthorityType = AuthorityType.CITY;
  // these indices are 1 based indexed
  stateIndex: number = 0;
  cityIndex: number = 0;

  constructor(
    authoritySpecialId?: string,
    authorityType?: AuthorityType,
    stateIndex?: number,
    cityIndex?: number
  ) {
    if (authoritySpecialId) this.authoritySpecitalId = authoritySpecialId;
    if (authorityType) this.authorityType = authorityType;
    if (stateIndex) this.stateIndex = stateIndex;
    if (cityIndex) this.cityIndex = cityIndex;
  }
}
