export interface Participant {
  misId?: number;
  bapsId?: string;
  region: string;
  center: string;
  zone: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  mandal: string;
  category: string;

  registrationStatus: string;
  language_For_Skill_Competitions: string;
  
  speech_Pravachan: string;
  speech_Pravachan_Category: string;
  emcee: string;
  emcee_Category: string;

  // skilled_Competitions: string;
  // prathmik_Mukhpath_Status: string;
  // aarti: string;
  // bhojan_Shlok: string;
  // manglacharan_Shlok: string;
  // nitya_Puja_Mantra: string;
  // sabha_Shlok: string;
  // stuti_Shlok: string;
  // satsang_Mukhpath: string;
  // completed_Pushpo: number;
  // sampark: string;
  // sampark_Category: string;
  // skit_Writing_Samvad_Lekhan: string;
  // article_Writing: string;
  // speech_Writing_Pravachan_Lekhan: string;
  // vyaktigat_Kirtan_Gaan: string;
  // vyaktigat_Kirtan_Gaan_Category: string;
  //completed_Pushpo_Range_Title?: string;

  fullName?: string;
}