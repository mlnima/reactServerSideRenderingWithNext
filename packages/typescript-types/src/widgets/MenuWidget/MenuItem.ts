export interface MenuItem {
    name: string,
    target: string,
    type: string,
    itemId: string,
    itemIndex: number,
    parent?: string
    translations?: {
        [key: string]: {
            name: string
        }
    }
}