declare global {
  export type NavMenuItem = {
    label: string;
    key: string;
    handle?: (key: any) => void;
    link?: string;
    children?: Omit<NavMenuItem, 'children'>[];
    disabled?: boolean;
  }
}

export { }
