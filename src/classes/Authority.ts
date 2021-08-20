import { AuthorityType } from "../utils/Enums";

export class Authority {
  authoritySpecitalId: string = "";
  authorityType: AuthorityType = AuthorityType.CITY;
  stateIndex: number = -1;
  cityIndex: number = -1;

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
