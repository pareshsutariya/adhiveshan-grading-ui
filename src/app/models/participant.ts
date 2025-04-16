export interface Participant {
  region: string;
  center: string;
  zone: string;
  registration_Status: string;
  mandal: string;
  firstLastName_MISID: string;
  prathmik_mukhpath_status: string;
  skilled_competitions: string;
  aarti: string;
  bhojan_shlok: string;
  manglacharan_shlok: string;
  nitya_puja_mantra: string;
  sabha_shlok: string;
  stuti_shlok: string;
  satsang_mukhpath: string;
  completed_Pushpo: number;
  sampark: string;
  sampark_Category: string;
  speech_Pravachan: string;
  speech_Pravachan_Category: string;
  emcee: string;
  emcee_Category: string;
  skit_Writing_Samvad_Lekhan: string;
  article_Writing: string;
  speech_Writing_Pravachan_Lekhan: string;
  vyaktigat_Kirtan_Gaan: string;
  vyaktigat_Kirtan_Gaan_Category: string;
  gender: string;

  fullName?: string;
  misId?: string;
  completed_Pushpo_Range_Title?: string;
}