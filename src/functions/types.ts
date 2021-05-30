export type 牌 = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '';
export type 手牌 = 牌[];

export interface 雀頭候補 {
  対子: string;
  残り手牌: 手牌;
}
export interface 面子候補 {
  面子: string;
  残り手牌: 手牌;
  後続?: {
    面子: string;
    残り手牌: 手牌;
    後続?: {
      面子: string;
      残り手牌: 手牌;
    }[];
  }[];
}
export interface 待ちツリー {
  雀頭?: string
  順子優先: 面子候補[]
  刻子優先: 面子候補[]
}[]

export interface 聴牌 {
  雀頭: string
  手牌: string[][]
}

export interface 待ち種別 {
  種別: string
  待ち: string[]
  待ち箇所: string
}