export interface LegalSection {
  sectionNo: string;
  titleEn: string;
  titleBn: string;
  chapter: string;
  actTitle: string;
  summary: string;
  keyPoints: string[];
}

export interface LegalActMeta {
  id: string;
  titleEn: string;
  titleBn: string;
  year: number;
  actNo: string;
  totalSections: number;
  description: string;
  domain: 'Company' | 'Contract' | 'Partnership' | 'Labour';
}

export const LEGAL_ACTS: LegalActMeta[] = [
  {
    id: 'companies-1994',
    titleEn: 'The Companies Act, 1994',
    titleBn: 'কোম্পানি আইন, ১৯৯৪',
    year: 1994,
    actNo: 'Act No. XVIII of 1994',
    totalSections: 400,
    domain: 'Company',
    description: 'Governs corporate formation, management obligations, shareholder protections, director duties, and winding-up procedures in Bangladesh.',
  },
  {
    id: 'contract-1872',
    titleEn: 'The Contract Act, 1872',
    titleBn: 'চুক্তি আইন, ১৮৭২',
    year: 1872,
    actNo: 'Act No. IX of 1872',
    totalSections: 266,
    domain: 'Contract',
    description: 'Foundational statutory framework for legal agreements, consideration, breaches, damages, indemnities, and agency relationships.',
  },
  {
    id: 'partnership-1932',
    titleEn: 'The Partnership Act, 1932',
    titleBn: 'অংশীদারি আইন, ১৯৩২',
    year: 1932,
    actNo: 'Act No. IX of 1932',
    totalSections: 74,
    domain: 'Partnership',
    description: 'Defines mutual rights, fiduciary duties, joint liabilities of partners, firm registration rules, and dissolution mechanisms.',
  },
  {
    id: 'labour-2006',
    titleEn: 'The Bangladesh Labour Act, 2006',
    titleBn: 'বাংলাদেশ শ্রম আইন, ২০০৬',
    year: 2006,
    actNo: 'Act No. XLII of 2006',
    totalSections: 354,
    domain: 'Labour',
    description: 'Comprehensive statute regulating conditions of service, working hours, overtime wages, maternity welfare, termination, and industrial disputes.',
  },
];

export const FEATURED_SECTIONS: LegalSection[] = [
  {
    sectionNo: 'Section 73',
    titleEn: 'Compensation for Loss or Damage Caused by Breach of Contract',
    titleBn: 'চুক্তি ভঙ্গের দরুন ক্ষতি বা লোকসানের জন্য ক্ষতিপূরণ',
    chapter: 'Chapter VI: Consequences of Breach of Contract',
    actTitle: 'The Contract Act, 1872',
    summary: 'When a contract is broken, the party suffering from the breach is entitled to receive compensation from the defaulting party for any direct loss or damage naturally arising in the usual course of things.',
    keyPoints: [
      'Covers natural direct loss arising in usual course',
      'Excludes remote and indirect loss unless contemplated by parties',
      'Party claiming damages must mitigate potential losses',
    ],
  },
  {
    sectionNo: 'Section 74',
    titleEn: 'Compensation for Breach Where Penalty is Stipulated',
    titleBn: 'যেখানে ক্ষতিপূরণ বা জরিমানা পূর্ব-নির্ধারিত থাকে',
    chapter: 'Chapter VI: Consequences of Breach of Contract',
    actTitle: 'The Contract Act, 1872',
    summary: 'Provides that where a specific amount or penalty is named in a contract in case of breach, the aggrieved party is entitled to reasonable compensation not exceeding the named amount.',
    keyPoints: [
      'Applies to liquidated damages and contractual penalties',
      'Court awards reasonable compensation up to the agreed cap',
      'Proof of actual pecuniary loss is not strictly mandatory',
    ],
  },
  {
    sectionNo: 'Section 85',
    titleEn: 'Annual General Meeting (AGM) of Companies',
    titleBn: 'কোম্পানির বার্ষিক সাধারণ সভা',
    chapter: 'Part III: Management and Administration',
    actTitle: 'The Companies Act, 1994',
    summary: 'Mandates that every company shall hold an Annual General Meeting once in each calendar year and not more than 15 months after the previous meeting.',
    keyPoints: [
      'Must be held once in every calendar year',
      'Maximum interval of 15 months between successive AGMs',
      'Default gives jurisdiction to Court or Registrar for convening',
    ],
  },
  {
    sectionNo: 'Section 104',
    titleEn: 'Duties and Liabilities of Directors',
    titleBn: 'পরিচালকদের দায়িত্ব ও দায়বদ্ধতা',
    chapter: 'Part III: Directors and Governance',
    actTitle: 'The Companies Act, 1994',
    summary: 'Establishes fiduciary obligations for corporate directors to act bona fide in the commercial interests of the company and maintain transparent accounting.',
    keyPoints: [
      'Directors hold fiduciary trust on behalf of shareholders',
      'Prohibits undisclosed conflict of interest and secret profit',
      'Civil liability attaches to misfeasance or breach of statutory trust',
    ],
  },
  {
    sectionNo: 'Section 13',
    titleEn: 'Mutual Rights and Liabilities of Partners',
    titleBn: 'অংশীদারগণের পারস্পরিক অধিকার ও দায়',
    chapter: 'Chapter III: Relations of Partners to One Another',
    actTitle: 'The Partnership Act, 1932',
    summary: 'Subject to contractual agreement, every partner is entitled to take part in business management, share equally in profits, and indemnify the firm for wilful neglect.',
    keyPoints: [
      'Equality of profit and loss sharing unless specified otherwise',
      'Indemnity required for fraud or wilful neglect in management',
      'Partners cannot carry on competing business without firm consent',
    ],
  },
  {
    sectionNo: 'Section 108',
    titleEn: 'Extra Wages for Overtime Work',
    titleBn: 'অতিরিক্ত কাজের জন্য অতিরিক্ত মজুরি (ওভারটাইম)',
    chapter: 'Chapter IX: Working Hours and Leave',
    actTitle: 'The Bangladesh Labour Act, 2006',
    summary: 'Where an employee works beyond statutory hours (ordinarily 8 hours daily or 48 hours weekly), overtime wages must be paid at twice the ordinary rate of basic wage and allowances.',
    keyPoints: [
      'Statutory rate is 2x basic wage plus dearness allowances',
      'Maximum working hours cap strictly enforced by inspection',
      'Accurate overtime registers must be kept on premises',
    ],
  },
  {
    sectionNo: 'Section 46',
    titleEn: 'Maternity Benefit Rights and Absences',
    titleBn: 'প্রসূতি কল্যাণ সুবিধার অধিকার',
    chapter: 'Chapter IV: Maternity Welfare',
    actTitle: 'The Bangladesh Labour Act, 2006',
    summary: 'Grants female workers 16 weeks of paid maternity leave (8 weeks preceding and 8 weeks following delivery) subject to minimum service criteria.',
    keyPoints: [
      'Total benefit period is 16 weeks fully paid',
      'Employer cannot terminate female worker during maternity leave',
      'Calculated based on average daily wage earned before delivery',
    ],
  },
];
