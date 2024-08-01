export type PropsType = {
  showlunar: boolean;
  lines: number;
  fromsun: boolean;
}

type ItemType = {
  time: string; // 00:00 - 00:15
  itemName: string;
  ItemType: string;
  itemDescription: string;
}

export type ItemsType = {
  date: string;
  items: Array<ItemType>;
}
